/**
 * Conflict Resolver - R�solution de conflits inter-agents
 * G�re les conflits de ressources, priorit�s et d�pendances entre agents
 */

import { EventEmitter } from 'events';

export interface Conflict {
  id: string;
  type: 'resource' | 'priority' | 'dependency' | 'timing' | 'data';
  severity: 'low' | 'medium' | 'high' | 'critical';
  participants: string[]; // IDs des agents impliqu�s
  description: string;
  context: ConflictContext;
  timestamp: string;
  status: 'detected' | 'analyzing' | 'resolving' | 'resolved' | 'escalated';
  resolution?: ConflictResolution;
  attempts: ResolutionAttempt[];
}

export interface ConflictContext {
  projectId?: string;
  taskIds: string[];
  resources: string[];
  timeline?: {
    conflictWindow: { start: string; end: string };
    affectedDeadlines: string[];
  };
  data?: any;
}

export interface ConflictResolution {
  strategy: 'priority' | 'resource-sharing' | 'rescheduling' | 'delegation' | 'merge' | 'split';
  actions: ResolutionAction[];
  estimatedImpact: ImpactAssessment;
  approvedBy: string;
  implementedAt: string;
}

export interface ResolutionAction {
  type: 'reassign' | 'reschedule' | 'allocate' | 'merge' | 'pause' | 'escalate';
  target: string; // Agent or task ID
  parameters: any;
  order: number;
}

export interface ImpactAssessment {
  timeDelay: number; // en minutes
  resourceCost: number; // 0-100%
  qualityImpact: number; // -10 to +10
  stakeholderImpact: string[];
}

export interface ResolutionAttempt {
  timestamp: string;
  strategy: string;
  success: boolean;
  notes: string;
}

export interface ResourceAllocation {
  agentId: string;
  resourceType: string;
  allocation: number; // pourcentage
  priority: number;
  timeSlot: { start: string; end: string };
}

export class ConflictResolver extends EventEmitter {
  private conflicts: Map<string, Conflict> = new Map();
  private resolutionStrategies: Map<string, ResolutionStrategy> = new Map();
  private resourceAllocations: Map<string, ResourceAllocation[]> = new Map();
  private resolutionHistory: Conflict[] = [];

  constructor() {
    super();
    this.setupResolutionStrategies();
  }

  /**
   * Configure les strat�gies de r�solution par d�faut
   */
  private setupResolutionStrategies(): void {
    const strategies = [
      {
        type: 'resource',
        strategy: 'resource-sharing',
        priority: 1,
        handler: this.resolveResourceConflict.bind(this)
      },
      {
        type: 'priority',
        strategy: 'priority',
        priority: 2,
        handler: this.resolvePriorityConflict.bind(this)
      },
      {
        type: 'dependency',
        strategy: 'rescheduling',
        priority: 3,
        handler: this.resolveDependencyConflict.bind(this)
      },
      {
        type: 'timing',
        strategy: 'rescheduling',
        priority: 2,
        handler: this.resolveTimingConflict.bind(this)
      },
      {
        type: 'data',
        strategy: 'merge',
        priority: 1,
        handler: this.resolveDataConflict.bind(this)
      }
    ];

    strategies.forEach(strategy => {
      this.resolutionStrategies.set(strategy.type, strategy);
    });

    console.log(`� ${strategies.length} strat�gies de r�solution configur�es`);
  }

  /**
   * D�tecte un conflit potentiel
   */
  detectConflict(
    type: Conflict['type'],
    participants: string[],
    context: ConflictContext,
    description: string,
    severity: Conflict['severity'] = 'medium'
  ): string {
    const conflictId = `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const conflict: Conflict = {
      id: conflictId,
      type,
      severity,
      participants,
      description,
      context,
      timestamp: new Date().toISOString(),
      status: 'detected',
      attempts: []
    };

    this.conflicts.set(conflictId, conflict);

    console.log(`� Conflit d�tect�: ${type} entre [${participants.join(', ')}]`);
    this.emit('conflict-detected', conflict);

    // Auto-r�solution pour les conflits non-critiques
    if (severity !== 'critical') {
      setTimeout(() => this.resolveConflict(conflictId), 1000);
    }

    return conflictId;
  }

  /**
   * R�sout un conflit
   */
  async resolveConflict(conflictId: string): Promise<boolean> {
    const conflict = this.conflicts.get(conflictId);
    if (!conflict) {
      console.error(`L Conflit ${conflictId} non trouv�`);
      return false;
    }

    conflict.status = 'analyzing';
    console.log(`= Analyse du conflit ${conflictId}: ${conflict.type}`);

    try {
      // S�lectionner la strat�gie appropri�e
      const strategy = this.resolutionStrategies.get(conflict.type);
      if (!strategy) {
        throw new Error(`Aucune strat�gie pour le type: ${conflict.type}`);
      }

      conflict.status = 'resolving';
      
      // Ex�cuter la strat�gie de r�solution
      const resolution = await strategy.handler(conflict);
      
      if (resolution) {
        conflict.resolution = resolution;
        conflict.status = 'resolved';
        
        // Enregistrer l'historique
        this.resolutionHistory.push({ ...conflict });
        
        // Impl�menter la r�solution
        await this.implementResolution(conflict);
        
        console.log(` Conflit ${conflictId} r�solu avec strat�gie: ${resolution.strategy}`);
        this.emit('conflict-resolved', { conflictId, resolution });
        
        return true;
      } else {
        throw new Error('�chec de la r�solution');
      }

    } catch (error) {
      console.error(`L Erreur r�solution conflit ${conflictId}:`, error);
      
      // Enregistrer la tentative �chou�e
      conflict.attempts.push({
        timestamp: new Date().toISOString(),
        strategy: 'auto',
        success: false,
        notes: error.message
      });

      // Escalader si critique ou trop d'�checs
      if (conflict.severity === 'critical' || conflict.attempts.length >= 3) {
        conflict.status = 'escalated';
        this.emit('conflict-escalated', conflict);
      }

      return false;
    }
  }

  /**
   * R�sout les conflits de ressources
   */
  private async resolveResourceConflict(conflict: Conflict): Promise<ConflictResolution> {
    console.log(`=' R�solution conflit de ressources pour: [${conflict.participants.join(', ')}]`);

    // Analyser l'utilisation actuelle des ressources
    const resourceUsage = this.analyzeResourceUsage(conflict.participants, conflict.context.resources);
    
    // Strat�gie: Partage �quitable des ressources
    const actions: ResolutionAction[] = [];
    
    conflict.participants.forEach((agentId, index) => {
      const allocation = Math.floor(100 / conflict.participants.length);
      actions.push({
        type: 'allocate',
        target: agentId,
        parameters: {
          resources: conflict.context.resources,
          allocation: allocation,
          timeSlot: {
            start: new Date().toISOString(),
            end: new Date(Date.now() + 3600000).toISOString() // 1 heure
          }
        },
        order: index + 1
      });
    });

    return {
      strategy: 'resource-sharing',
      actions,
      estimatedImpact: {
        timeDelay: 15, // 15 minutes de d�lai
        resourceCost: 10, // 10% de co�t suppl�mentaire
        qualityImpact: -1, // L�g�re baisse de qualit�
        stakeholderImpact: ['agents']
      },
      approvedBy: 'orchestrator',
      implementedAt: new Date().toISOString()
    };
  }

  /**
   * R�sout les conflits de priorit�
   */
  private async resolvePriorityConflict(conflict: Conflict): Promise<ConflictResolution> {
    console.log(`=� R�solution conflit de priorit� pour: [${conflict.participants.join(', ')}]`);

    // Analyser les priorit�s actuelles
    const priorities = this.analyzePriorities(conflict.participants, conflict.context.taskIds);
    
    // Strat�gie: R�organisation par priorit� m�tier
    const actions: ResolutionAction[] = [];
    
    // Trier par priorit� (design > dev > seo > marketing > ops)
    const priorityOrder = ['design-agent', 'webdev-agent', 'seo-agent', 'marketing-agent', 'techops-agent', 'automation-agent'];
    
    const sortedParticipants = conflict.participants.sort((a, b) => {
      return priorityOrder.indexOf(a) - priorityOrder.indexOf(b);
    });

    sortedParticipants.forEach((agentId, index) => {
      actions.push({
        type: 'reassign',
        target: agentId,
        parameters: {
          newPriority: index + 1,
          timeSlot: {
            start: new Date(Date.now() + (index * 30 * 60000)).toISOString(), // D�calage de 30min
            end: new Date(Date.now() + ((index + 1) * 30 * 60000)).toISOString()
          }
        },
        order: index + 1
      });
    });

    return {
      strategy: 'priority',
      actions,
      estimatedImpact: {
        timeDelay: 30 * (sortedParticipants.length - 1), // 30min par agent d�cal�
        resourceCost: 5,
        qualityImpact: 0,
        stakeholderImpact: ['project-timeline']
      },
      approvedBy: 'orchestrator',
      implementedAt: new Date().toISOString()
    };
  }

  /**
   * R�sout les conflits de d�pendances
   */
  private async resolveDependencyConflict(conflict: Conflict): Promise<ConflictResolution> {
    console.log(`= R�solution conflit de d�pendances pour: [${conflict.participants.join(', ')}]`);

    // Analyser le graphe de d�pendances
    const dependencyGraph = this.analyzeDependencies(conflict.context.taskIds);
    
    // Strat�gie: R�organisation temporelle
    const actions: ResolutionAction[] = [];
    
    // Identifier les t�ches bloquantes et bloqu�es
    const blockingTasks = dependencyGraph.blocking;
    const blockedTasks = dependencyGraph.blocked;

    // Prioriser les t�ches bloquantes
    blockingTasks.forEach((taskId, index) => {
      actions.push({
        type: 'reschedule',
        target: taskId,
        parameters: {
          newStartTime: new Date(Date.now() + (index * 15 * 60000)).toISOString(),
          priority: 'high'
        },
        order: index + 1
      });
    });

    // Reprogrammer les t�ches bloqu�es apr�s
    blockedTasks.forEach((taskId, index) => {
      actions.push({
        type: 'reschedule',
        target: taskId,
        parameters: {
          newStartTime: new Date(Date.now() + ((blockingTasks.length + index) * 15 * 60000)).toISOString(),
          dependencies: blockingTasks
        },
        order: blockingTasks.length + index + 1
      });
    });

    return {
      strategy: 'rescheduling',
      actions,
      estimatedImpact: {
        timeDelay: 45, // 45 minutes de d�lai
        resourceCost: 15,
        qualityImpact: 1, // Am�lioration gr�ce � meilleur s�quen�age
        stakeholderImpact: ['project-timeline', 'agents']
      },
      approvedBy: 'orchestrator',
      implementedAt: new Date().toISOString()
    };
  }

  /**
   * R�sout les conflits de timing
   */
  private async resolveTimingConflict(conflict: Conflict): Promise<ConflictResolution> {
    console.log(`� R�solution conflit de timing pour: [${conflict.participants.join(', ')}]`);

    const actions: ResolutionAction[] = [];
    
    // Strat�gie: D�calage temporel intelligent
    conflict.participants.forEach((agentId, index) => {
      actions.push({
        type: 'reschedule',
        target: agentId,
        parameters: {
          timeShift: index * 20, // D�calage de 20 minutes
          maintainDuration: true,
          respectDependencies: true
        },
        order: index + 1
      });
    });

    return {
      strategy: 'rescheduling',
      actions,
      estimatedImpact: {
        timeDelay: 20 * (conflict.participants.length - 1),
        resourceCost: 5,
        qualityImpact: 0,
        stakeholderImpact: ['agents']
      },
      approvedBy: 'orchestrator',
      implementedAt: new Date().toISOString()
    };
  }

  /**
   * R�sout les conflits de donn�es
   */
  private async resolveDataConflict(conflict: Conflict): Promise<ConflictResolution> {
    console.log(`=� R�solution conflit de donn�es pour: [${conflict.participants.join(', ')}]`);

    const actions: ResolutionAction[] = [
      {
        type: 'merge',
        target: 'data-store',
        parameters: {
          strategy: 'last-write-wins',
          backup: true,
          notifyAgents: conflict.participants
        },
        order: 1
      }
    ];

    return {
      strategy: 'merge',
      actions,
      estimatedImpact: {
        timeDelay: 5,
        resourceCost: 2,
        qualityImpact: 0,
        stakeholderImpact: ['data-consistency']
      },
      approvedBy: 'orchestrator',
      implementedAt: new Date().toISOString()
    };
  }

  /**
   * Impl�mente une r�solution de conflit
   */
  private async implementResolution(conflict: Conflict): Promise<void> {
    if (!conflict.resolution) return;

    console.log(`=( Impl�mentation de la r�solution: ${conflict.resolution.strategy}`);

    for (const action of conflict.resolution.actions) {
      try {
        await this.executeResolutionAction(action);
        console.log(` Action ${action.type} ex�cut�e pour ${action.target}`);
      } catch (error) {
        console.error(`L Erreur ex�cution action ${action.type}:`, error);
        throw error;
      }
    }

    // Notifier les agents concern�s
    this.notifyAgents(conflict.participants, {
      type: 'resolution-implemented',
      conflictId: conflict.id,
      resolution: conflict.resolution
    });
  }

  /**
   * Ex�cute une action de r�solution
   */
  private async executeResolutionAction(action: ResolutionAction): Promise<void> {
    // Simulation d'ex�cution - dans une vraie impl�mentation,
    // ceci interagirait avec les agents r�els
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log(`=' Action ${action.type} simul�e pour ${action.target}`);
  }

  /**
   * Notifie les agents d'une r�solution
   */
  private notifyAgents(agentIds: string[], notification: any): void {
    agentIds.forEach(agentId => {
      console.log(`=� Notification envoy�e � ${agentId}:`, notification.type);
      this.emit('agent-notification', { agentId, notification });
    });
  }

  /**
   * Analyse l'utilisation des ressources
   */
  private analyzeResourceUsage(agentIds: string[], resources: string[]): any {
    // Simulation d'analyse
    return {
      agents: agentIds.map(id => ({
        agentId: id,
        currentUsage: Math.round(Math.random() * 80 + 10), // 10-90%
        requestedResources: resources
      })),
      totalDemand: Math.round(Math.random() * 150 + 100), // 100-250%
      availableCapacity: 100
    };
  }

  /**
   * Analyse les priorit�s
   */
  private analyzePriorities(agentIds: string[], taskIds: string[]): any {
    return {
      tasks: taskIds.map(id => ({
        taskId: id,
        currentPriority: Math.floor(Math.random() * 5) + 1,
        businessValue: Math.floor(Math.random() * 10) + 1
      })),
      conflicts: agentIds.length
    };
  }

  /**
   * Analyse les d�pendances
   */
  private analyzeDependencies(taskIds: string[]): any {
    const midpoint = Math.floor(taskIds.length / 2);
    return {
      blocking: taskIds.slice(0, midpoint),
      blocked: taskIds.slice(midpoint),
      cycles: [],
      criticalPath: taskIds
    };
  }

  /**
   * Obtient les statistiques de r�solution
   */
  getResolutionStatistics(): any {
    const activeConflicts = Array.from(this.conflicts.values());
    const resolvedConflicts = this.resolutionHistory;

    const conflictsByType = [...activeConflicts, ...resolvedConflicts].reduce((acc, conflict) => {
      acc[conflict.type] = (acc[conflict.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const resolutionsByStrategy = resolvedConflicts.reduce((acc, conflict) => {
      if (conflict.resolution) {
        acc[conflict.resolution.strategy] = (acc[conflict.resolution.strategy] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      conflicts: {
        active: activeConflicts.length,
        resolved: resolvedConflicts.length,
        total: activeConflicts.length + resolvedConflicts.length,
        byType: conflictsByType,
        bySeverity: this.groupBySeverity([...activeConflicts, ...resolvedConflicts])
      },
      resolutions: {
        successRate: resolvedConflicts.length / (activeConflicts.length + resolvedConflicts.length) * 100,
        byStrategy: resolutionsByStrategy,
        averageTime: this.calculateAverageResolutionTime(),
        totalImpact: this.calculateTotalImpact()
      },
      performance: {
        detectionAccuracy: 95, // simulation
        resolutionEfficiency: 87, // simulation
        stakeholderSatisfaction: 82 // simulation
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Groupe les conflits par s�v�rit�
   */
  private groupBySeverity(conflicts: Conflict[]): Record<string, number> {
    return conflicts.reduce((acc, conflict) => {
      acc[conflict.severity] = (acc[conflict.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Calcule le temps moyen de r�solution
   */
  private calculateAverageResolutionTime(): number {
    if (this.resolutionHistory.length === 0) return 0;
    
    const totalTime = this.resolutionHistory.reduce((sum, conflict) => {
      if (conflict.resolution) {
        const startTime = new Date(conflict.timestamp);
        const endTime = new Date(conflict.resolution.implementedAt);
        return sum + (endTime.getTime() - startTime.getTime());
      }
      return sum;
    }, 0);

    return Math.round(totalTime / this.resolutionHistory.length / 1000); // en secondes
  }

  /**
   * Calcule l'impact total des r�solutions
   */
  private calculateTotalImpact(): any {
    if (this.resolutionHistory.length === 0) {
      return { timeDelay: 0, resourceCost: 0, qualityImpact: 0 };
    }

    return this.resolutionHistory.reduce((total, conflict) => {
      if (conflict.resolution) {
        const impact = conflict.resolution.estimatedImpact;
        total.timeDelay += impact.timeDelay;
        total.resourceCost += impact.resourceCost;
        total.qualityImpact += impact.qualityImpact;
      }
      return total;
    }, { timeDelay: 0, resourceCost: 0, qualityImpact: 0 });
  }

  /**
   * Nettoie les conflits r�solus anciens
   */
  cleanup(): void {
    const oneHourAgo = new Date(Date.now() - 3600000);
    
    // Supprimer les conflits r�solus de plus d'une heure
    for (const [id, conflict] of this.conflicts) {
      if (conflict.status === 'resolved' && new Date(conflict.timestamp) < oneHourAgo) {
        this.conflicts.delete(id);
      }
    }

    // Limiter l'historique
    if (this.resolutionHistory.length > 1000) {
      this.resolutionHistory = this.resolutionHistory.slice(-500);
    }

    console.log('>� Nettoyage des conflits anciens effectu�');
  }
}

interface ResolutionStrategy {
  type: string;
  strategy: string;
  priority: number;
  handler: (conflict: Conflict) => Promise<ConflictResolution>;
}

export const conflictResolver = new ConflictResolver();
export default conflictResolver;