/**
 * Enterprise Message Queue Service with Redis Pub/Sub
 * Real-time communication backbone for agent coordination
 */

import Redis from 'ioredis';
import { EventEmitter } from 'events';
import WebSocket from 'ws';
import { createServer } from 'http';

export interface QueueMessage {
  id: string;
  type: 'task' | 'event' | 'heartbeat' | 'system' | 'alert';
  from: string;
  to: string | string[];
  channel: string;
  payload: any;
  timestamp: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  ttl?: number;
  retryCount?: number;
  correlationId?: string;
  metadata?: Record<string, any>;
}

export interface QueueConfig {
  redis: {
    host: string;
    port: number;
    password?: string;
    db?: number;
    retryDelayOnFailover?: number;
    maxRetriesPerRequest?: number;
  };
  websocket: {
    port: number;
    heartbeatInterval: number;
    reconnectInterval: number;
  };
  queue: {
    defaultTtl: number;
    maxRetries: number;
    deadLetterQueue: boolean;
    batchSize: number;
  };
}

export interface ClientConnection {
  id: string;
  agentId: string;
  ws: WebSocket;
  lastSeen: number;
  subscriptions: Set<string>;
  status: 'connected' | 'disconnected' | 'error';
  metadata: Record<string, any>;
}

export class EnterpriseMessageQueue extends EventEmitter {
  private redis: Redis;
  private publisher: Redis;
  private subscriber: Redis;
  private wsServer: WebSocket.Server;
  private httpServer: any;
  private clients: Map<string, ClientConnection> = new Map();
  private messageBuffer: Map<string, QueueMessage[]> = new Map();
  private config: QueueConfig;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private metricsCollector: any;
  private isRunning = false;

  // Performance metrics
  private metrics = {
    messagesProcessed: 0,
    messagesPerSecond: 0,
    averageLatency: 0,
    errorRate: 0,
    activeConnections: 0,
    lastMetricsReset: Date.now()
  };

  constructor(config: Partial<QueueConfig> = {}) {
    super();
    
    this.config = {
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        db: 0,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3,
        ...config.redis
      },
      websocket: {
        port: parseInt(process.env.WS_PORT || '8080'),
        heartbeatInterval: 30000,
        reconnectInterval: 5000,
        ...config.websocket
      },
      queue: {
        defaultTtl: 300000, // 5 minutes
        maxRetries: 3,
        deadLetterQueue: true,
        batchSize: 100,
        ...config.queue
      }
    };

    this.initializeRedis();
    this.initializeWebSocket();
  }

  /**
   * Initialize Redis connections for pub/sub
   */
  private async initializeRedis(): Promise<void> {
    try {
      // Main Redis connection
      this.redis = new Redis({
        host: this.config.redis.host,
        port: this.config.redis.port,
        password: this.config.redis.password,
        db: this.config.redis.db,
        retryDelayOnFailover: this.config.redis.retryDelayOnFailover,
        maxRetriesPerRequest: this.config.redis.maxRetriesPerRequest,
        lazyConnect: true
      });

      // Publisher connection
      this.publisher = new Redis({
        host: this.config.redis.host,
        port: this.config.redis.port,
        password: this.config.redis.password,
        db: this.config.redis.db
      });

      // Subscriber connection
      this.subscriber = new Redis({
        host: this.config.redis.host,
        port: this.config.redis.port,
        password: this.config.redis.password,
        db: this.config.redis.db
      });

      // Setup Redis event handlers
      this.redis.on('connect', () => {
        console.log(' Redis connected');
        this.emit('redis-connected');
      });

      this.redis.on('error', (error) => {
        console.error('L Redis error:', error);
        this.emit('redis-error', error);
      });

      // Setup subscriber patterns
      await this.setupSubscriptions();

      console.log('= Redis pub/sub initialized');
    } catch (error) {
      console.error('L Failed to initialize Redis:', error);
      throw error;
    }
  }

  /**
   * Setup Redis subscription patterns
   */
  private async setupSubscriptions(): Promise<void> {
    const channels = [
      'agent:*',
      'task:*',
      'system:*',
      'orchestrator:*',
      'metrics:*',
      'alerts:*'
    ];

    for (const pattern of channels) {
      await this.subscriber.psubscribe(pattern);
    }

    this.subscriber.on('pmessage', (pattern, channel, message) => {
      this.handleRedisMessage(pattern, channel, message);
    });

    console.log(`=á Subscribed to ${channels.length} channel patterns`);
  }

  /**
   * Initialize WebSocket server
   */
  private initializeWebSocket(): void {
    this.httpServer = createServer();
    this.wsServer = new WebSocket.Server({ 
      server: this.httpServer,
      perMessageDeflate: true,
      maxPayload: 16 * 1024 * 1024 // 16MB
    });

    this.wsServer.on('connection', (ws, request) => {
      this.handleNewConnection(ws, request);
    });

    this.wsServer.on('error', (error) => {
      console.error('L WebSocket server error:', error);
      this.emit('websocket-error', error);
    });

    console.log('< WebSocket server initialized');
  }

  /**
   * Handle new WebSocket connection
   */
  private handleNewConnection(ws: WebSocket, request: any): void {
    const clientId = this.generateClientId();
    const url = new URL(request.url || '', `http://${request.headers.host}`);
    const agentId = url.searchParams.get('agentId') || 'unknown';

    const client: ClientConnection = {
      id: clientId,
      agentId,
      ws,
      lastSeen: Date.now(),
      subscriptions: new Set(['system', `agent:${agentId}`]),
      status: 'connected',
      metadata: {
        userAgent: request.headers['user-agent'],
        ip: request.connection.remoteAddress,
        connectedAt: Date.now()
      }
    };

    this.clients.set(clientId, client);
    this.metrics.activeConnections++;

    // Setup WebSocket event handlers
    ws.on('message', (data) => {
      this.handleWebSocketMessage(clientId, data);
    });

    ws.on('close', () => {
      this.handleClientDisconnect(clientId);
    });

    ws.on('error', (error) => {
      console.error(`L WebSocket error for client ${clientId}:`, error);
      this.handleClientError(clientId, error);
    });

    // Send welcome message
    this.sendToClient(clientId, {
      id: this.generateMessageId(),
      type: 'system',
      from: 'message-queue',
      to: agentId,
      channel: 'system',
      payload: {
        event: 'connected',
        clientId,
        timestamp: Date.now()
      },
      timestamp: Date.now(),
      priority: 'medium'
    });

    console.log(`= Client ${clientId} (${agentId}) connected`);
    this.emit('client-connected', { clientId, agentId });
  }

  /**
   * Handle WebSocket message from client
   */
  private async handleWebSocketMessage(clientId: string, data: WebSocket.Data): Promise<void> {
    try {
      const client = this.clients.get(clientId);
      if (!client) return;

      client.lastSeen = Date.now();

      const message = JSON.parse(data.toString()) as QueueMessage;
      message.timestamp = Date.now();
      message.id = message.id || this.generateMessageId();

      // Validate message
      if (!this.validateMessage(message)) {
        throw new Error('Invalid message format');
      }

      // Process message based on type
      await this.processMessage(message, clientId);

      this.metrics.messagesProcessed++;

    } catch (error) {
      console.error(`L Error processing WebSocket message from ${clientId}:`, error);
      this.handleClientError(clientId, error);
    }
  }

  /**
   * Process incoming message
   */
  private async processMessage(message: QueueMessage, fromClientId: string): Promise<void> {
    const startTime = Date.now();

    try {
      // Add message to Redis for persistence and distribution
      await this.publishToRedis(message);

      // Route message to appropriate handlers
      switch (message.type) {
        case 'task':
          await this.handleTaskMessage(message);
          break;
        case 'event':
          await this.handleEventMessage(message);
          break;
        case 'heartbeat':
          await this.handleHeartbeat(message, fromClientId);
          break;
        case 'system':
          await this.handleSystemMessage(message);
          break;
        case 'alert':
          await this.handleAlertMessage(message);
          break;
        default:
          console.warn(`  Unknown message type: ${message.type}`);
      }

      // Update latency metrics
      const latency = Date.now() - startTime;
      this.updateLatencyMetrics(latency);

      this.emit('message-processed', { message, latency });

    } catch (error) {
      console.error('L Error processing message:', error);
      this.metrics.errorRate++;
      
      // Send error response
      if (message.correlationId) {
        await this.sendErrorResponse(message, error.message);
      }
    }
  }

  /**
   * Publish message to Redis
   */
  private async publishToRedis(message: QueueMessage): Promise<void> {
    const channel = `${message.channel}:${message.to}`;
    const serialized = JSON.stringify(message);
    
    await this.publisher.publish(channel, serialized);
    
    // Also store in Redis for persistence if needed
    if (message.ttl) {
      const key = `message:${message.id}`;
      await this.redis.setex(key, Math.floor(message.ttl / 1000), serialized);
    }
  }

  /**
   * Handle Redis pub/sub messages
   */
  private handleRedisMessage(pattern: string, channel: string, message: string): void {
    try {
      const parsedMessage = JSON.parse(message) as QueueMessage;
      
      // Route to appropriate WebSocket clients
      this.routeMessageToClients(parsedMessage);
      
      this.emit('redis-message', { pattern, channel, message: parsedMessage });
    } catch (error) {
      console.error('L Error handling Redis message:', error);
    }
  }

  /**
   * Route message to appropriate WebSocket clients
   */
  private routeMessageToClients(message: QueueMessage): void {
    const recipients = Array.isArray(message.to) ? message.to : [message.to];
    
    for (const recipient of recipients) {
      if (recipient === 'broadcast') {
        // Send to all clients
        this.broadcastToAllClients(message);
      } else {
        // Send to specific agent clients
        this.sendToAgentClients(recipient, message);
      }
    }
  }

  /**
   * Send message to all clients
   */
  private broadcastToAllClients(message: QueueMessage): void {
    let sentCount = 0;
    
    for (const client of this.clients.values()) {
      if (client.status === 'connected' && client.ws.readyState === WebSocket.OPEN) {
        try {
          client.ws.send(JSON.stringify(message));
          sentCount++;
        } catch (error) {
          console.error(`L Error sending to client ${client.id}:`, error);
        }
      }
    }
    
    console.log(`=á Broadcast message sent to ${sentCount} clients`);
  }

  /**
   * Send message to specific agent clients
   */
  private sendToAgentClients(agentId: string, message: QueueMessage): void {
    const agentClients = Array.from(this.clients.values())
      .filter(client => client.agentId === agentId && client.status === 'connected');
    
    let sentCount = 0;
    
    for (const client of agentClients) {
      if (client.ws.readyState === WebSocket.OPEN) {
        try {
          client.ws.send(JSON.stringify(message));
          sentCount++;
        } catch (error) {
          console.error(`L Error sending to agent ${agentId} client ${client.id}:`, error);
        }
      }
    }
    
    if (sentCount === 0) {
      // Buffer message for offline agent
      this.bufferMessage(agentId, message);
    }
    
    console.log(`=ä Message sent to ${sentCount} clients for agent ${agentId}`);
  }

  /**
   * Send message to specific client
   */
  private sendToClient(clientId: string, message: QueueMessage): void {
    const client = this.clients.get(clientId);
    
    if (client && client.status === 'connected' && client.ws.readyState === WebSocket.OPEN) {
      try {
        client.ws.send(JSON.stringify(message));
      } catch (error) {
        console.error(`L Error sending to client ${clientId}:`, error);
      }
    }
  }

  /**
   * Buffer message for offline agent
   */
  private bufferMessage(agentId: string, message: QueueMessage): void {
    if (!this.messageBuffer.has(agentId)) {
      this.messageBuffer.set(agentId, []);
    }
    
    const buffer = this.messageBuffer.get(agentId)!;
    buffer.push(message);
    
    // Limit buffer size
    if (buffer.length > this.config.queue.batchSize) {
      buffer.shift(); // Remove oldest message
    }
    
    console.log(`=æ Message buffered for offline agent ${agentId}`);
  }

  /**
   * Handle task messages
   */
  private async handleTaskMessage(message: QueueMessage): Promise<void> {
    // Route task-related messages to task scheduler
    this.emit('task-message', message);
  }

  /**
   * Handle event messages
   */
  private async handleEventMessage(message: QueueMessage): Promise<void> {
    // Route event messages to event handlers
    this.emit('event-message', message);
  }

  /**
   * Handle heartbeat messages
   */
  private async handleHeartbeat(message: QueueMessage, fromClientId: string): Promise<void> {
    const client = this.clients.get(fromClientId);
    if (client) {
      client.lastSeen = Date.now();
      client.status = 'connected';
    }
    
    // Send heartbeat response
    const response: QueueMessage = {
      id: this.generateMessageId(),
      type: 'heartbeat',
      from: 'message-queue',
      to: message.from,
      channel: 'system',
      payload: {
        event: 'heartbeat-ack',
        timestamp: Date.now()
      },
      timestamp: Date.now(),
      priority: 'low',
      correlationId: message.id
    };
    
    this.sendToClient(fromClientId, response);
  }

  /**
   * Handle system messages
   */
  private async handleSystemMessage(message: QueueMessage): Promise<void> {
    this.emit('system-message', message);
  }

  /**
   * Handle alert messages
   */
  private async handleAlertMessage(message: QueueMessage): Promise<void> {
    // High priority alert handling
    this.emit('alert-message', message);
    
    // Also log critical alerts
    if (message.priority === 'critical') {
      console.error('=¨ CRITICAL ALERT:', message.payload);
    }
  }

  /**
   * Handle client disconnect
   */
  private handleClientDisconnect(clientId: string): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.status = 'disconnected';
      this.metrics.activeConnections--;
      
      // Don't immediately remove - allow for reconnection
      setTimeout(() => {
        if (this.clients.get(clientId)?.status === 'disconnected') {
          this.clients.delete(clientId);
        }
      }, this.config.websocket.reconnectInterval * 2);
      
      console.log(`= Client ${clientId} (${client.agentId}) disconnected`);
      this.emit('client-disconnected', { clientId, agentId: client.agentId });
    }
  }

  /**
   * Handle client error
   */
  private handleClientError(clientId: string, error: any): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.status = 'error';
      console.error(`L Client ${clientId} error:`, error);
      this.emit('client-error', { clientId, agentId: client.agentId, error });
    }
  }

  /**
   * Send error response
   */
  private async sendErrorResponse(originalMessage: QueueMessage, errorMessage: string): Promise<void> {
    const errorResponse: QueueMessage = {
      id: this.generateMessageId(),
      type: 'system',
      from: 'message-queue',
      to: originalMessage.from,
      channel: 'system',
      payload: {
        event: 'error',
        originalMessageId: originalMessage.id,
        error: errorMessage,
        timestamp: Date.now()
      },
      timestamp: Date.now(),
      priority: 'high',
      correlationId: originalMessage.correlationId
    };
    
    await this.publishToRedis(errorResponse);
  }

  /**
   * Start heartbeat monitoring
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.checkClientHealth();
      this.updateMetrics();
      this.cleanupExpiredMessages();
    }, this.config.websocket.heartbeatInterval);
    
    console.log('=“ Heartbeat monitoring started');
  }

  /**
   * Check client health
   */
  private checkClientHealth(): void {
    const now = Date.now();
    const timeout = this.config.websocket.heartbeatInterval * 2;
    
    for (const [clientId, client] of this.clients) {
      if (now - client.lastSeen > timeout && client.status === 'connected') {
        console.warn(`  Client ${clientId} appears unhealthy`);
        client.status = 'error';
        this.emit('client-unhealthy', { clientId, agentId: client.agentId });
      }
    }
  }

  /**
   * Update performance metrics
   */
  private updateMetrics(): void {
    const now = Date.now();
    const timeDelta = now - this.metrics.lastMetricsReset;
    
    if (timeDelta >= 60000) { // Every minute
      this.metrics.messagesPerSecond = Math.round(
        (this.metrics.messagesProcessed * 1000) / timeDelta
      );
      
      // Reset counters
      this.metrics.messagesProcessed = 0;
      this.metrics.errorRate = 0;
      this.metrics.lastMetricsReset = now;
      
      this.emit('metrics-updated', this.metrics);
    }
  }

  /**
   * Update latency metrics
   */
  private updateLatencyMetrics(latency: number): void {
    // Simple moving average
    this.metrics.averageLatency = 
      (this.metrics.averageLatency * 0.9) + (latency * 0.1);
  }

  /**
   * Cleanup expired messages
   */
  private cleanupExpiredMessages(): void {
    const now = Date.now();
    
    for (const [agentId, buffer] of this.messageBuffer) {
      const validMessages = buffer.filter(msg => {
        const age = now - msg.timestamp;
        const ttl = msg.ttl || this.config.queue.defaultTtl;
        return age < ttl;
      });
      
      if (validMessages.length !== buffer.length) {
        this.messageBuffer.set(agentId, validMessages);
        console.log(`>ù Cleaned ${buffer.length - validMessages.length} expired messages for ${agentId}`);
      }
    }
  }

  /**
   * Validate message format
   */
  private validateMessage(message: any): boolean {
    const required = ['type', 'from', 'to', 'channel', 'payload'];
    return required.every(field => message[field] !== undefined);
  }

  /**
   * Generate unique client ID
   */
  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Public API methods
   */

  /**
   * Start the message queue service
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      console.warn('  Message queue already running');
      return;
    }

    try {
      // Connect to Redis
      await this.redis.connect();
      
      // Start WebSocket server
      this.httpServer.listen(this.config.websocket.port, () => {
        console.log(`< WebSocket server listening on port ${this.config.websocket.port}`);
      });
      
      // Start heartbeat
      this.startHeartbeat();
      
      this.isRunning = true;
      console.log('=€ Enterprise Message Queue started');
      this.emit('started');
      
    } catch (error) {
      console.error('L Failed to start message queue:', error);
      throw error;
    }
  }

  /**
   * Stop the message queue service
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      return;
    }

    try {
      // Stop heartbeat
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
      
      // Close WebSocket connections
      for (const client of this.clients.values()) {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.close();
        }
      }
      
      // Close WebSocket server
      this.wsServer.close();
      this.httpServer.close();
      
      // Disconnect Redis
      await this.redis.disconnect();
      await this.publisher.disconnect();
      await this.subscriber.disconnect();
      
      this.isRunning = false;
      console.log('ù Enterprise Message Queue stopped');
      this.emit('stopped');
      
    } catch (error) {
      console.error('L Error stopping message queue:', error);
      throw error;
    }
  }

  /**
   * Send message through the queue
   */
  async sendMessage(message: Partial<QueueMessage>): Promise<void> {
    const fullMessage: QueueMessage = {
      id: this.generateMessageId(),
      timestamp: Date.now(),
      priority: 'medium',
      ...message
    } as QueueMessage;

    if (!this.validateMessage(fullMessage)) {
      throw new Error('Invalid message format');
    }

    await this.publishToRedis(fullMessage);
  }

  /**
   * Get current metrics
   */
  getMetrics(): any {
    return {
      performance: { ...this.metrics },
      clients: {
        total: this.clients.size,
        connected: Array.from(this.clients.values()).filter(c => c.status === 'connected').length,
        disconnected: Array.from(this.clients.values()).filter(c => c.status === 'disconnected').length,
        error: Array.from(this.clients.values()).filter(c => c.status === 'error').length
      },
      buffer: {
        totalBuffered: Array.from(this.messageBuffer.values()).reduce((sum, arr) => sum + arr.length, 0),
        agents: this.messageBuffer.size
      },
      system: {
        uptime: Date.now() - (this.metrics.lastMetricsReset - 60000),
        memoryUsage: process.memoryUsage(),
        isRunning: this.isRunning
      },
      timestamp: Date.now()
    };
  }

  /**
   * Get client information
   */
  getClients(): Array<Omit<ClientConnection, 'ws'>> {
    return Array.from(this.clients.values()).map(client => ({
      id: client.id,
      agentId: client.agentId,
      lastSeen: client.lastSeen,
      subscriptions: client.subscriptions,
      status: client.status,
      metadata: client.metadata
    }));
  }

  /**
   * Get buffered messages for an agent
   */
  getBufferedMessages(agentId: string): QueueMessage[] {
    return this.messageBuffer.get(agentId) || [];
  }

  /**
   * Clear buffer for an agent
   */
  clearBuffer(agentId: string): void {
    this.messageBuffer.delete(agentId);
    console.log(`>ù Buffer cleared for agent ${agentId}`);
  }
}

// Export singleton instance
export const messageQueue = new EnterpriseMessageQueue();
export default messageQueue;