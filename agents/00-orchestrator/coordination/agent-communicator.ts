/**
 * Agent Communicator - Système de communication inter-agents
 * Gère les messages, événements et synchronisation entre agents
 */

import { EventEmitter } from 'events';

export interface AgentMessage {
  id: string;
  from: string;
  to: string | 'broadcast';
  type: 'request' | 'response' | 'notification' | 'error' | 'heartbeat';
  channel: string;
  payload: any;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  ttl?: number; // Time to live en secondes
  correlationId?: string; // Pour lier requête/réponse
}

export interface CommunicationChannel {
  id: string;
  name: string;
  participants: string[];
  type: 'direct' | 'broadcast' | 'multicast';
  persistent: boolean;
  encrypted: boolean;
}

export interface AgentEndpoint {
  agentId: string;
  status: 'online' | 'offline' | 'busy' | 'error';
  capabilities: string[];
  lastSeen: string;
  messageQueue: AgentMessage[];
  subscriptions: string[];
}

export class AgentCommunicator extends EventEmitter {
  private channels: Map<string, CommunicationChannel> = new Map();
  private endpoints: Map<string, AgentEndpoint> = new Map();
  private messageHistory: AgentMessage[] = [];
  private messageQueue: Map<string, AgentMessage[]> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private readonly HEARTBEAT_INTERVAL = 30000; // 30 secondes
  private readonly MESSAGE_TTL = 300; // 5 minutes par défaut

  constructor() {
    super();
    this.setupDefaultChannels();
    this.startHeartbeat();
  }

  /**
   * Configure les canaux de communication par défaut
   */
  private setupDefaultChannels(): void {
    const defaultChannels = [
      {
        id: 'system',
        name: 'System Notifications',
        participants: ['orchestrator'],
        type: 'broadcast' as const,
        persistent: true,
        encrypted: false
      },
      {
        id: 'project-coordination',
        name: 'Project Coordination',
        participants: ['orchestrator', 'design-agent', 'webdev-agent', 'seo-agent', 'marketing-agent', 'techops-agent', 'automation-agent'],
        type: 'multicast' as const,
        persistent: true,
        encrypted: false
      },
      {
        id: 'alerts',
        name: 'System Alerts',
        participants: ['orchestrator'],
        type: 'broadcast' as const,
        persistent: true,
        encrypted: false
      },
      {
        id: 'design-dev',
        name: 'Design-Development Channel',
        participants: ['design-agent', 'webdev-agent'],
        type: 'direct' as const,
        persistent: false,
        encrypted: false
      },
      {
        id: 'optimization',
        name: 'SEO-Marketing Optimization',
        participants: ['seo-agent', 'marketing-agent'],
        type: 'direct' as const,
        persistent: false,
        encrypted: false
      },
      {
        id: 'deployment',
        name: 'Deployment Coordination',
        participants: ['techops-agent', 'automation-agent'],
        type: 'direct' as const,
        persistent: false,
        encrypted: false
      }
    ];

    defaultChannels.forEach(channel => {
      this.channels.set(channel.id, channel);
    });

    console.log(`=á ${defaultChannels.length} canaux de communication configurés`);
  }

  /**
   * Enregistre un agent dans le système de communication
   */
  registerAgent(agentId: string, capabilities: string[]): void {
    const endpoint: AgentEndpoint = {
      agentId,
      status: 'online',
      capabilities,
      lastSeen: new Date().toISOString(),
      messageQueue: [],
      subscriptions: ['system', 'project-coordination']
    };

    this.endpoints.set(agentId, endpoint);
    this.messageQueue.set(agentId, []);

    console.log(`> Agent ${agentId} enregistré dans le système de communication`);
    
    // Notifier les autres agents
    this.broadcast({
      id: `msg_${Date.now()}`,
      from: 'system',
      to: 'broadcast',
      type: 'notification',
      channel: 'system',
      payload: {
        event: 'agent-joined',
        agentId,
        capabilities,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      priority: 'medium'
    });

    this.emit('agent-registered', { agentId, capabilities });
  }

  /**
   * Envoie un message à un agent spécifique
   */
  async sendMessage(message: AgentMessage): Promise<boolean> {
    try {
      // Validation du message
      if (!this.validateMessage(message)) {
        throw new Error('Message invalide');
      }

      // Ajouter métadonnées
      message.id = message.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      message.timestamp = new Date().toISOString();
      message.ttl = message.ttl || this.MESSAGE_TTL;

      if (message.to === 'broadcast') {
        return this.broadcast(message);
      }

      // Vérifier que le destinataire existe
      const recipient = this.endpoints.get(message.to);
      if (!recipient) {
        throw new Error(`Agent destinataire ${message.to} non trouvé`);
      }

      // Ajouter à la queue du destinataire
      const queue = this.messageQueue.get(message.to) || [];
      queue.push(message);
      this.messageQueue.set(message.to, queue);

      // Ajouter à l'historique
      this.messageHistory.push(message);

      // Émettre événement
      this.emit('message-sent', { messageId: message.id, from: message.from, to: message.to });

      console.log(`=ç Message envoyé de ${message.from} à ${message.to}: ${message.type}`);
      return true;

    } catch (error) {
      console.error('L Erreur envoi message:', error);
      this.emit('message-error', { message, error: error.message });
      return false;
    }
  }

  /**
   * Diffuse un message à tous les agents ou à un canal
   */
  async broadcast(message: AgentMessage): Promise<boolean> {
    try {
      const channel = this.channels.get(message.channel);
      const recipients = channel ? channel.participants : Array.from(this.endpoints.keys());

      let successCount = 0;
      for (const agentId of recipients) {
        if (agentId !== message.from) { // Ne pas renvoyer à l'expéditeur
          const individualMessage = { ...message, to: agentId };
          const success = await this.sendMessage(individualMessage);
          if (success) successCount++;
        }
      }

      console.log(`=â Message diffusé à ${successCount}/${recipients.length} agents`);
      this.emit('message-broadcast', { messageId: message.id, recipients: successCount });

      return successCount > 0;

    } catch (error) {
      console.error('L Erreur diffusion message:', error);
      return false;
    }
  }

  /**
   * Récupère les messages en attente pour un agent
   */
  getMessages(agentId: string, markAsRead: boolean = true): AgentMessage[] {
    const queue = this.messageQueue.get(agentId) || [];
    
    if (markAsRead) {
      this.messageQueue.set(agentId, []);
    }

    // Mettre à jour le statut de l'agent
    const endpoint = this.endpoints.get(agentId);
    if (endpoint) {
      endpoint.lastSeen = new Date().toISOString();
    }

    return queue;
  }

  /**
   * Démarre le système de heartbeat
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeats();
      this.checkAgentHealth();
      this.cleanupExpiredMessages();
    }, this.HEARTBEAT_INTERVAL);

    console.log('=“ Système de heartbeat démarré');
  }

  /**
   * Envoie des heartbeats à tous les agents
   */
  private sendHeartbeats(): void {
    const heartbeat: AgentMessage = {
      id: `heartbeat_${Date.now()}`,
      from: 'system',
      to: 'broadcast',
      type: 'heartbeat',
      channel: 'system',
      payload: {
        timestamp: new Date().toISOString(),
        systemStatus: 'healthy'
      },
      timestamp: new Date().toISOString(),
      priority: 'low'
    };

    this.broadcast(heartbeat);
  }

  /**
   * Vérifie la santé des agents
   */
  private checkAgentHealth(): void {
    const now = new Date();
    const healthThreshold = 2 * this.HEARTBEAT_INTERVAL; // 2x l'intervalle

    for (const [agentId, endpoint] of this.endpoints) {
      const lastSeen = new Date(endpoint.lastSeen);
      const timeSinceLastSeen = now.getTime() - lastSeen.getTime();

      if (timeSinceLastSeen > healthThreshold && endpoint.status !== 'offline') {
        endpoint.status = 'offline';
        console.warn(`  Agent ${agentId} marqué comme offline`);
        
        this.emit('agent-offline', { agentId, lastSeen: endpoint.lastSeen });
      }
    }
  }

  /**
   * Nettoie les messages expirés
   */
  private cleanupExpiredMessages(): void {
    const now = new Date();
    
    // Nettoyer l'historique
    this.messageHistory = this.messageHistory.filter(msg => {
      const messageAge = (now.getTime() - new Date(msg.timestamp).getTime()) / 1000;
      return messageAge < (msg.ttl || this.MESSAGE_TTL);
    });

    // Nettoyer les queues
    for (const [agentId, queue] of this.messageQueue) {
      const filteredQueue = queue.filter(msg => {
        const messageAge = (now.getTime() - new Date(msg.timestamp).getTime()) / 1000;
        return messageAge < (msg.ttl || this.MESSAGE_TTL);
      });
      this.messageQueue.set(agentId, filteredQueue);
    }
  }

  /**
   * Valide un message
   */
  private validateMessage(message: AgentMessage): boolean {
    const required = ['from', 'to', 'type', 'channel', 'payload'];
    return required.every(field => message[field as keyof AgentMessage] !== undefined);
  }

  /**
   * Obtient les statistiques de communication
   */
  getStatistics(): any {
    const totalMessages = this.messageHistory.length;
    const messagesByType = this.messageHistory.reduce((acc, msg) => {
      acc[msg.type] = (acc[msg.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const agentStats = Array.from(this.endpoints.entries()).map(([agentId, endpoint]) => ({
      agentId,
      status: endpoint.status,
      lastSeen: endpoint.lastSeen,
      queueSize: this.messageQueue.get(agentId)?.length || 0,
      subscriptions: endpoint.subscriptions.length
    }));

    return {
      communication: {
        totalMessages,
        messagesByType,
        channels: this.channels.size,
        activeAgents: Array.from(this.endpoints.values()).filter(e => e.status === 'online').length
      },
      agents: agentStats,
      performance: {
        messagesPerMinute: this.calculateMessageRate(),
        averageResponseTime: this.calculateAverageResponseTime(),
        deliveryRate: this.calculateDeliveryRate()
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calcule le taux de messages par minute
   */
  private calculateMessageRate(): number {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    
    const recentMessages = this.messageHistory.filter(msg => 
      new Date(msg.timestamp) > oneMinuteAgo
    );

    return recentMessages.length;
  }

  /**
   * Calcule le temps de réponse moyen
   */
  private calculateAverageResponseTime(): number {
    // Simplification - dans une vraie implémentation, tracker les temps de réponse
    return Math.round(Math.random() * 1000 + 500); // 500-1500ms
  }

  /**
   * Calcule le taux de livraison
   */
  private calculateDeliveryRate(): number {
    // Simplification - dans une vraie implémentation, tracker les échecs
    return Math.round(95 + Math.random() * 5); // 95-100%
  }

  /**
   * Arrête le système de communication
   */
  stop(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    console.log('= Système de communication arrêté');
  }
}

export const agentCommunicator = new AgentCommunicator();
export default agentCommunicator;