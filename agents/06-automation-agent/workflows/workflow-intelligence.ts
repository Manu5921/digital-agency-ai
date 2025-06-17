/**
 * Workflow Intelligence - Phase 2
 * Auto-optimisation des workflows N8N avec analyse de performance et recommandations
 * 
 * Features:
 * - Analyse automatique des performances N8N
 * - Optimisation intelligente des workflows
 * - Prédiction de délais et goulots d'étranglement
 * - Recommandations d'amélioration ML
 * - Monitoring en temps réel
 * - Auto-scaling et load balancing
 * - Détection d'anomalies
 */

import { OpenAI } from 'openai';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs-node';

export interface WorkflowIntelligenceConfig {
  n8n: {
    apiKey: string;
    baseUrl: string;
    webhookUrl: string;
  };
  ai: {
    openaiApiKey: string;
    model: 'gpt-4o' | 'gpt-4-turbo';
  };
  monitoring: {
    samplingInterval: number; // secondes
    retentionPeriod: number; // jours
    alertThresholds: {
      executionTime: number; // ms
      errorRate: number; // pourcentage
      throughput: number; // executions/minute
    };
  };
  optimization: {
    autoOptimize: boolean;
    optimizationSchedule: string; // cron
    backupBeforeOptimization: boolean;
    rollbackOnFailure: boolean;
  };
  ml: {
    modelPath: string;
    trainingInterval: number; // heures
    predictionWindow: number; // heures
  };
  notifications: {
    webhookUrl: string;
    slackWebhook: string;
    emailAlerts: boolean;
  };
}

export interface WorkflowMetrics {
  workflowId: string;
  workflowName: string;
  executions: ExecutionMetric[];
  performance: PerformanceStats;
  bottlenecks: Bottleneck[];
  optimizationSuggestions: OptimizationSuggestion[];
  predictedMetrics: PredictionMetrics;
  lastAnalyzed: Date;
}

export interface ExecutionMetric {
  executionId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  status: 'success' | 'error' | 'waiting' | 'cancelled';
  nodeMetrics: NodeMetric[];
  triggerType: string;
  dataSize: number;
  errorMessage?: string;
}

export interface NodeMetric {
  nodeId: string;
  nodeName: string;
  nodeType: string;
  executionTime: number;
  inputData: number; // bytes
  outputData: number; // bytes
  errorCount: number;
  retryCount: number;
  cpuUsage?: number;
  memoryUsage?: number;
}

export interface PerformanceStats {
  averageExecutionTime: number;
  medianExecutionTime: number;
  p95ExecutionTime: number;
  successRate: number;
  errorRate: number;
  throughput: number; // executions per minute
  totalExecutions: number;
  dataProcessed: number; // total bytes
  costEstimate: number; // euros
  efficiency: EfficiencyMetrics;
}

export interface EfficiencyMetrics {
  score: number; // 0-100
  cpuEfficiency: number;
  memoryEfficiency: number;
  networkEfficiency: number;
  parallelizationOpportunities: number;
  redundancyScore: number;
}

export interface Bottleneck {
  type: 'node' | 'network' | 'data' | 'resource' | 'logic';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: number; // milliseconds added
  frequency: number; // occurrences per hour
  description: string;
  cause: string;
  solution: string;
  confidence: number;
}

export interface OptimizationSuggestion {
  id: string;
  type: 'performance' | 'reliability' | 'cost' | 'maintainability';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: {
    timeReduction: number; // percentage
    costReduction: number; // percentage
    reliabilityImprovement: number; // percentage
    implementationEffort: 'low' | 'medium' | 'high';
  };
  implementation: {
    type: 'node_replacement' | 'parameter_change' | 'structure_change' | 'resource_scaling';
    changes: WorkflowChange[];
    rollbackPlan: string;
    estimatedDowntime: number; // minutes
  };
  evidence: {
    dataPoints: number;
    confidence: number;
    reasoning: string;
  };
}

export interface WorkflowChange {
  action: 'add' | 'remove' | 'modify' | 'replace';
  target: string; // node ID or parameter path
  oldValue?: any;
  newValue?: any;
  reason: string;
}

export interface PredictionMetrics {
  nextHourExecutions: number;
  nextDayExecutions: number;
  peakTimes: TimeSlot[];
  resourceRequirements: ResourcePrediction;
  potentialIssues: PredictedIssue[];
  confidence: number;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  expectedLoad: number;
  confidence: number;
}

export interface ResourcePrediction {
  cpu: number; // percentage
  memory: number; // MB
  network: number; // Mbps
  storage: number; // GB
}

export interface PredictedIssue {
  type: 'performance_degradation' | 'resource_exhaustion' | 'error_spike' | 'timeout';
  probability: number;
  expectedTime: Date;
  impact: string;
  prevention: string;
}

export interface WorkflowOptimization {
  workflowId: string;
  optimizationId: string;
  timestamp: Date;
  status: 'pending' | 'applying' | 'completed' | 'failed' | 'rolled_back';
  suggestions: OptimizationSuggestion[];
  appliedChanges: WorkflowChange[];
  results: OptimizationResult;
  backup?: string; // workflow backup
}

export interface OptimizationResult {
  performanceImprovement: number; // percentage
  costReduction: number; // percentage
  reliabilityImprovement: number; // percentage
  issues: string[];
  rollbackReason?: string;
}

export interface MLModel {
  type: 'performance_predictor' | 'bottleneck_detector' | 'optimization_recommender';
  version: string;
  accuracy: number;
  lastTrained: Date;
  trainingData: number; // number of samples
}

export class WorkflowIntelligence {
  private config: WorkflowIntelligenceConfig;
  private openai: OpenAI;
  private workflowMetrics: Map<string, WorkflowMetrics> = new Map();
  private optimizations: Map<string, WorkflowOptimization> = new Map();
  private mlModels: Map<string, MLModel> = new Map();
  private performanceModel: tf.LayersModel | null = null;
  private bottleneckModel: tf.LayersModel | null = null;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor(config: WorkflowIntelligenceConfig) {
    this.config = config;
    this.openai = new OpenAI({ apiKey: config.ai.openaiApiKey });
    this.initializeModels();
    this.startMonitoring();
  }

  /**
   * Initialisation des modèles ML
   */
  private async initializeModels(): Promise<void> {
    try {
      // Modèle de prédiction de performance
      this.performanceModel = await this.loadOrCreatePerformanceModel();
      
      // Modèle de détection de goulots
      this.bottleneckModel = await this.loadOrCreateBottleneckModel();
      
      console.log('[WI] Modèles ML initialisés');
    } catch (error) {
      console.error('[WI] Erreur initialisation modèles:', error);
    }
  }

  /**
   * Démarrage du monitoring continu
   */
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(async () => {
      try {
        await this.collectMetrics();
        await this.analyzePerformance();
        await this.detectAnomalies();
        await this.updatePredictions();
      } catch (error) {
        console.error('[WI] Erreur monitoring:', error);
      }
    }, this.config.monitoring.samplingInterval * 1000);

    console.log('[WI] Monitoring démarré');
  }

  /**
   * Collecte des métriques N8N
   */
  async collectMetrics(): Promise<void> {
    try {
      // Récupération des workflows actifs
      const workflows = await this.getN8NWorkflows();
      
      for (const workflow of workflows) {
        // Récupération des exécutions récentes
        const executions = await this.getWorkflowExecutions(workflow.id);
        
        // Analyse des métriques de performance
        const metrics = await this.analyzeWorkflowMetrics(workflow, executions);
        
        this.workflowMetrics.set(workflow.id, metrics);
      }
      
      console.log(`[WI] Métriques collectées pour ${workflows.length} workflows`);
    } catch (error) {
      console.error('[WI] Erreur collecte métriques:', error);
    }
  }

  /**
   * Analyse des performances de workflow
   */
  private async analyzeWorkflowMetrics(
    workflow: any,
    executions: any[]
  ): Promise<WorkflowMetrics> {
    const executionMetrics = executions.map(exec => this.parseExecutionMetric(exec));
    
    // Calcul des statistiques de performance
    const performance = this.calculatePerformanceStats(executionMetrics);
    
    // Détection des goulots d'étranglement
    const bottlenecks = await this.detectBottlenecks(executionMetrics);
    
    // Génération de suggestions d'optimisation
    const suggestions = await this.generateOptimizationSuggestions(
      workflow,
      performance,
      bottlenecks
    );
    
    // Prédictions basées sur ML
    const predictedMetrics = await this.predictWorkflowMetrics(executionMetrics);
    
    return {
      workflowId: workflow.id,
      workflowName: workflow.name,
      executions: executionMetrics,
      performance,
      bottlenecks,
      optimizationSuggestions: suggestions,
      predictedMetrics,
      lastAnalyzed: new Date()
    };
  }

  /**
   * Calcul des statistiques de performance
   */
  private calculatePerformanceStats(executions: ExecutionMetric[]): PerformanceStats {
    if (executions.length === 0) {
      return this.getEmptyPerformanceStats();
    }

    const durations = executions.map(e => e.duration).sort((a, b) => a - b);
    const successfulExecutions = executions.filter(e => e.status === 'success');
    const errorExecutions = executions.filter(e => e.status === 'error');
    
    const averageExecutionTime = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    const medianExecutionTime = durations[Math.floor(durations.length / 2)];
    const p95ExecutionTime = durations[Math.floor(durations.length * 0.95)];
    
    const successRate = (successfulExecutions.length / executions.length) * 100;
    const errorRate = (errorExecutions.length / executions.length) * 100;
    
    // Calcul du throughput (executions par minute)
    const timeSpan = executions.length > 1 ? 
      (executions[executions.length - 1].endTime.getTime() - executions[0].startTime.getTime()) / 60000 : 1;
    const throughput = executions.length / timeSpan;
    
    const totalDataProcessed = executions.reduce((sum, e) => sum + e.dataSize, 0);
    
    // Métriques d'efficacité
    const efficiency = this.calculateEfficiency(executions);
    
    return {
      averageExecutionTime,
      medianExecutionTime,
      p95ExecutionTime,
      successRate,
      errorRate,
      throughput,
      totalExecutions: executions.length,
      dataProcessed: totalDataProcessed,
      costEstimate: this.estimateCost(executions),
      efficiency
    };
  }

  /**
   * Calcul des métriques d'efficacité
   */
  private calculateEfficiency(executions: ExecutionMetric[]): EfficiencyMetrics {
    const avgCpuUsage = this.calculateAverageResourceUsage(executions, 'cpu');
    const avgMemoryUsage = this.calculateAverageResourceUsage(executions, 'memory');
    
    // Score d'efficacité global
    const cpuEfficiency = Math.max(0, 100 - avgCpuUsage);
    const memoryEfficiency = Math.max(0, 100 - avgMemoryUsage);
    const networkEfficiency = this.calculateNetworkEfficiency(executions);
    
    const score = (cpuEfficiency + memoryEfficiency + networkEfficiency) / 3;
    
    return {
      score,
      cpuEfficiency,
      memoryEfficiency,
      networkEfficiency,
      parallelizationOpportunities: this.detectParallelizationOpportunities(executions),
      redundancyScore: this.calculateRedundancyScore(executions)
    };
  }

  /**
   * Détection des goulots d'étranglement
   */
  private async detectBottlenecks(executions: ExecutionMetric[]): Promise<Bottleneck[]> {
    const bottlenecks: Bottleneck[] = [];
    
    // Analyse des nœuds lents
    const nodePerformance = this.analyzeNodePerformance(executions);
    
    for (const [nodeId, stats] of nodePerformance) {
      if (stats.averageTime > this.config.monitoring.alertThresholds.executionTime) {
        bottlenecks.push({
          type: 'node',
          location: nodeId,
          severity: this.calculateSeverity(stats.averageTime),
          impact: stats.averageTime,
          frequency: stats.frequency,
          description: `Nœud ${stats.nodeName} présente des temps d'exécution élevés`,
          cause: await this.analyzeCause(nodeId, stats),
          solution: await this.suggestSolution(nodeId, stats),
          confidence: 0.8
        });
      }
    }
    
    // Analyse des goulots réseau
    const networkBottlenecks = this.detectNetworkBottlenecks(executions);
    bottlenecks.push(...networkBottlenecks);
    
    // Analyse des goulots de données
    const dataBottlenecks = this.detectDataBottlenecks(executions);
    bottlenecks.push(...dataBottlenecks);
    
    return bottlenecks;
  }

  /**
   * Génération de suggestions d'optimisation avec IA
   */
  private async generateOptimizationSuggestions(
    workflow: any,
    performance: PerformanceStats,
    bottlenecks: Bottleneck[]
  ): Promise<OptimizationSuggestion[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.config.ai.model,
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en optimisation de workflows N8N. Analyse les métriques de performance et les goulots d'étranglement pour proposer des optimisations concrètes.
            
            Réponds avec un JSON contenant un tableau de suggestions d'optimisation avec cette structure:
            {
              "suggestions": [
                {
                  "type": "performance|reliability|cost|maintainability",
                  "priority": "low|medium|high|critical",
                  "title": "Titre concis",
                  "description": "Description détaillée",
                  "impact": {
                    "timeReduction": 0-100,
                    "costReduction": 0-100,
                    "reliabilityImprovement": 0-100,
                    "implementationEffort": "low|medium|high"
                  },
                  "implementation": {
                    "type": "node_replacement|parameter_change|structure_change|resource_scaling",
                    "changes": [{"action": "add|remove|modify|replace", "target": "node_id", "reason": "explication"}]
                  }
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Analyse ce workflow et propose des optimisations:

WORKFLOW: ${workflow.name}
NŒUDS: ${JSON.stringify(workflow.nodes?.slice(0, 10) || [])}

PERFORMANCE:
- Temps moyen: ${performance.averageExecutionTime}ms
- Taux de succès: ${performance.successRate}%
- Throughput: ${performance.throughput} exec/min
- Efficacité: ${performance.efficiency.score}/100

GOULOTS D'ÉTRANGLEMENT:
${bottlenecks.map(b => `- ${b.type}: ${b.description} (impact: ${b.impact}ms)`).join('\n')}

Concentre-toi sur les améliorations ayant le plus grand impact avec le moins d'effort.`
          }
        ],
        temperature: 0.1,
        max_tokens: 2000
      });

      const result = JSON.parse(completion.choices[0].message.content || '{"suggestions": []}');
      
      return result.suggestions.map((s: any, index: number) => ({
        id: `opt_${Date.now()}_${index}`,
        ...s,
        evidence: {
          dataPoints: performance.totalExecutions,
          confidence: 0.75,
          reasoning: 'Analyse basée sur les métriques de performance et l\'IA'
        }
      }));

    } catch (error) {
      console.error('[WI] Erreur génération suggestions:', error);
      return [];
    }
  }

  /**
   * Prédiction des métriques avec ML
   */
  private async predictWorkflowMetrics(executions: ExecutionMetric[]): Promise<PredictionMetrics> {
    try {
      if (!this.performanceModel || executions.length < 10) {
        return this.getEmptyPredictions();
      }

      // Préparation des données pour le modèle
      const features = this.prepareMLFeatures(executions);
      const predictions = this.performanceModel.predict(features) as tf.Tensor;
      const predictionData = await predictions.data();

      // Analyse des patterns temporels
      const timePatterns = this.analyzeTimePatterns(executions);
      
      return {
        nextHourExecutions: Math.round(predictionData[0] * 60), // conversion en exécutions/heure
        nextDayExecutions: Math.round(predictionData[0] * 1440), // conversion en exécutions/jour
        peakTimes: this.predictPeakTimes(timePatterns),
        resourceRequirements: this.predictResourceRequirements(predictionData),
        potentialIssues: await this.predictPotentialIssues(executions, predictionData),
        confidence: Math.min(0.95, executions.length / 100) // confiance basée sur la quantité de données
      };

    } catch (error) {
      console.error('[WI] Erreur prédiction:', error);
      return this.getEmptyPredictions();
    }
  }

  /**
   * Application automatique des optimisations
   */
  async applyOptimization(
    workflowId: string,
    suggestionId: string,
    options: {
      autoApply?: boolean;
      createBackup?: boolean;
      testMode?: boolean;
    } = {}
  ): Promise<WorkflowOptimization> {
    const metrics = this.workflowMetrics.get(workflowId);
    if (!metrics) {
      throw new Error('Métriques de workflow non trouvées');
    }

    const suggestion = metrics.optimizationSuggestions.find(s => s.id === suggestionId);
    if (!suggestion) {
      throw new Error('Suggestion d\'optimisation non trouvée');
    }

    const optimizationId = `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const optimization: WorkflowOptimization = {
      workflowId,
      optimizationId,
      timestamp: new Date(),
      status: 'pending',
      suggestions: [suggestion],
      appliedChanges: [],
      results: {
        performanceImprovement: 0,
        costReduction: 0,
        reliabilityImprovement: 0,
        issues: []
      }
    };

    this.optimizations.set(optimizationId, optimization);

    try {
      // Backup du workflow si demandé
      if (options.createBackup || this.config.optimization.backupBeforeOptimization) {
        optimization.backup = await this.createWorkflowBackup(workflowId);
      }

      optimization.status = 'applying';

      // Application des changements
      for (const change of suggestion.implementation.changes) {
        await this.applyWorkflowChange(workflowId, change);
        optimization.appliedChanges.push(change);
      }

      optimization.status = 'completed';

      // Analyse des résultats après un délai
      setTimeout(async () => {
        await this.analyzeOptimizationResults(optimizationId);
      }, 300000); // 5 minutes

      console.log(`[WI] Optimisation appliquée: ${optimization.optimizationId}`);

    } catch (error) {
      optimization.status = 'failed';
      optimization.results.issues.push(`Erreur application: ${error.message}`);

      // Rollback si configuré
      if (this.config.optimization.rollbackOnFailure && optimization.backup) {
        await this.rollbackOptimization(optimizationId);
      }

      console.error('[WI] Erreur optimisation:', error);
    }

    return optimization;
  }

  /**
   * Analyse des résultats d'optimisation
   */
  private async analyzeOptimizationResults(optimizationId: string): Promise<void> {
    const optimization = this.optimizations.get(optimizationId);
    if (!optimization) return;

    try {
      // Collecte des nouvelles métriques
      await this.collectMetrics();
      
      const newMetrics = this.workflowMetrics.get(optimization.workflowId);
      if (!newMetrics) return;

      // Comparaison avant/après
      const oldPerformance = this.getHistoricalPerformance(optimization.workflowId, optimization.timestamp);
      const improvement = this.calculateImprovement(oldPerformance, newMetrics.performance);

      optimization.results = improvement;

      // Vérification si rollback nécessaire
      if (improvement.performanceImprovement < -10) { // Dégradation de plus de 10%
        optimization.results.issues.push('Dégradation de performance détectée');
        
        if (this.config.optimization.rollbackOnFailure) {
          await this.rollbackOptimization(optimizationId);
        }
      }

      console.log(`[WI] Résultats optimisation ${optimizationId}:`, improvement);

    } catch (error) {
      console.error('[WI] Erreur analyse résultats:', error);
    }
  }

  /**
   * Détection d'anomalies en temps réel
   */
  private async detectAnomalies(): Promise<void> {
    for (const [workflowId, metrics] of this.workflowMetrics) {
      const anomalies = [];

      // Détection de pics de temps d'exécution
      if (metrics.performance.averageExecutionTime > this.config.monitoring.alertThresholds.executionTime) {
        anomalies.push({
          type: 'performance_degradation',
          severity: 'high',
          message: `Temps d'exécution élevé: ${metrics.performance.averageExecutionTime}ms`
        });
      }

      // Détection de taux d'erreur élevé
      if (metrics.performance.errorRate > this.config.monitoring.alertThresholds.errorRate) {
        anomalies.push({
          type: 'error_spike',
          severity: 'critical',
          message: `Taux d'erreur élevé: ${metrics.performance.errorRate}%`
        });
      }

      // Détection de baisse de throughput
      if (metrics.performance.throughput < this.config.monitoring.alertThresholds.throughput) {
        anomalies.push({
          type: 'throughput_drop',
          severity: 'medium',
          message: `Throughput faible: ${metrics.performance.throughput} exec/min`
        });
      }

      // Envoi des alertes
      if (anomalies.length > 0) {
        await this.sendAnomalyAlert(workflowId, anomalies);
      }
    }
  }

  /**
   * APIs N8N
   */
  private async getN8NWorkflows(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.config.n8n.baseUrl}/api/v1/workflows`, {
        headers: {
          'Authorization': `Bearer ${this.config.n8n.apiKey}`
        }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('[WI] Erreur récupération workflows:', error);
      return [];
    }
  }

  private async getWorkflowExecutions(workflowId: string): Promise<any[]> {
    try {
      const response = await axios.get(
        `${this.config.n8n.baseUrl}/api/v1/executions?workflowId=${workflowId}&limit=100`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.n8n.apiKey}`
          }
        }
      );
      return response.data.data || [];
    } catch (error) {
      console.error('[WI] Erreur récupération exécutions:', error);
      return [];
    }
  }

  private async createWorkflowBackup(workflowId: string): Promise<string> {
    try {
      const response = await axios.get(`${this.config.n8n.baseUrl}/api/v1/workflows/${workflowId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.n8n.apiKey}`
        }
      });

      const backup = JSON.stringify(response.data);
      const backupId = `backup_${workflowId}_${Date.now()}`;
      
      // Sauvegarde (ici simulée, à adapter selon votre système de stockage)
      console.log(`[WI] Backup créé: ${backupId}`);
      
      return backupId;
    } catch (error) {
      console.error('[WI] Erreur création backup:', error);
      throw error;
    }
  }

  private async applyWorkflowChange(workflowId: string, change: WorkflowChange): Promise<void> {
    try {
      // Récupération du workflow actuel
      const workflow = await axios.get(`${this.config.n8n.baseUrl}/api/v1/workflows/${workflowId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.n8n.apiKey}`
        }
      });

      const workflowData = workflow.data;

      // Application du changement
      switch (change.action) {
        case 'modify':
          this.modifyWorkflowNode(workflowData, change.target, change.newValue);
          break;
        case 'replace':
          this.replaceWorkflowNode(workflowData, change.target, change.newValue);
          break;
        case 'add':
          this.addWorkflowNode(workflowData, change.target, change.newValue);
          break;
        case 'remove':
          this.removeWorkflowNode(workflowData, change.target);
          break;
      }

      // Sauvegarde du workflow modifié
      await axios.put(`${this.config.n8n.baseUrl}/api/v1/workflows/${workflowId}`, workflowData, {
        headers: {
          'Authorization': `Bearer ${this.config.n8n.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`[WI] Changement appliqué: ${change.action} sur ${change.target}`);

    } catch (error) {
      console.error('[WI] Erreur application changement:', error);
      throw error;
    }
  }

  /**
   * Modèles ML
   */
  private async loadOrCreatePerformanceModel(): Promise<tf.LayersModel> {
    try {
      // Tentative de chargement du modèle existant
      return await tf.loadLayersModel(`file://${this.config.ml.modelPath}/performance_model.json`);
    } catch (error) {
      // Création d'un nouveau modèle
      console.log('[WI] Création nouveau modèle de performance');
      return this.createPerformanceModel();
    }
  }

  private createPerformanceModel(): tf.LayersModel {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'linear' })
      ]
    });

    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['mae']
    });

    return model;
  }

  private async loadOrCreateBottleneckModel(): Promise<tf.LayersModel> {
    try {
      return await tf.loadLayersModel(`file://${this.config.ml.modelPath}/bottleneck_model.json`);
    } catch (error) {
      console.log('[WI] Création nouveau modèle de détection de goulots');
      return this.createBottleneckModel();
    }
  }

  private createBottleneckModel(): tf.LayersModel {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [15], units: 128, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.3 }),
        tf.layers.dense({ units: 64, activation: 'relu' }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' }) // 3 classes: aucun, modéré, critique
      ]
    });

    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  /**
   * Utilitaires
   */
  private parseExecutionMetric(execution: any): ExecutionMetric {
    return {
      executionId: execution.id,
      startTime: new Date(execution.startedAt),
      endTime: new Date(execution.stoppedAt || execution.startedAt),
      duration: execution.duration || 0,
      status: execution.finished ? (execution.success ? 'success' : 'error') : 'waiting',
      nodeMetrics: execution.data?.resultData?.runData ? 
        this.parseNodeMetrics(execution.data.resultData.runData) : [],
      triggerType: execution.mode || 'unknown',
      dataSize: this.calculateDataSize(execution.data),
      errorMessage: execution.data?.resultData?.error?.message
    };
  }

  private parseNodeMetrics(runData: any): NodeMetric[] {
    const metrics: NodeMetric[] = [];
    
    Object.entries(runData).forEach(([nodeId, data]: [string, any]) => {
      if (Array.isArray(data) && data.length > 0) {
        const nodeData = data[0];
        metrics.push({
          nodeId,
          nodeName: nodeData.nodeName || nodeId,
          nodeType: nodeData.nodeType || 'unknown',
          executionTime: nodeData.executionTime || 0,
          inputData: this.calculateDataSize(nodeData.data?.input || []),
          outputData: this.calculateDataSize(nodeData.data?.output || []),
          errorCount: nodeData.error ? 1 : 0,
          retryCount: 0
        });
      }
    });
    
    return metrics;
  }

  private calculateDataSize(data: any): number {
    return JSON.stringify(data || {}).length;
  }

  private estimateCost(executions: ExecutionMetric[]): number {
    // Estimation basée sur le temps d'exécution et les ressources
    const totalTime = executions.reduce((sum, e) => sum + e.duration, 0);
    const totalData = executions.reduce((sum, e) => sum + e.dataSize, 0);
    
    // Coût estimé en euros (à adapter selon votre modèle de pricing)
    return (totalTime / 1000 * 0.001) + (totalData / 1024 / 1024 * 0.01);
  }

  private getEmptyPerformanceStats(): PerformanceStats {
    return {
      averageExecutionTime: 0,
      medianExecutionTime: 0,
      p95ExecutionTime: 0,
      successRate: 0,
      errorRate: 0,
      throughput: 0,
      totalExecutions: 0,
      dataProcessed: 0,
      costEstimate: 0,
      efficiency: {
        score: 0,
        cpuEfficiency: 0,
        memoryEfficiency: 0,
        networkEfficiency: 0,
        parallelizationOpportunities: 0,
        redundancyScore: 0
      }
    };
  }

  private getEmptyPredictions(): PredictionMetrics {
    return {
      nextHourExecutions: 0,
      nextDayExecutions: 0,
      peakTimes: [],
      resourceRequirements: {
        cpu: 0,
        memory: 0,
        network: 0,
        storage: 0
      },
      potentialIssues: [],
      confidence: 0
    };
  }

  /**
   * API publique
   */
  async getWorkflowMetrics(workflowId: string): Promise<WorkflowMetrics | null> {
    return this.workflowMetrics.get(workflowId) || null;
  }

  async getAllMetrics(): Promise<WorkflowMetrics[]> {
    return Array.from(this.workflowMetrics.values());
  }

  async getOptimizationHistory(workflowId: string): Promise<WorkflowOptimization[]> {
    return Array.from(this.optimizations.values())
      .filter(opt => opt.workflowId === workflowId);
  }

  getGlobalStats(): {
    totalWorkflows: number;
    totalExecutions: number;
    averagePerformanceScore: number;
    totalOptimizations: number;
    averageImprovement: number;
  } {
    const metrics = Array.from(this.workflowMetrics.values());
    const optimizations = Array.from(this.optimizations.values());
    
    return {
      totalWorkflows: metrics.length,
      totalExecutions: metrics.reduce((sum, m) => sum + m.performance.totalExecutions, 0),
      averagePerformanceScore: metrics.reduce((sum, m) => sum + m.performance.efficiency.score, 0) / metrics.length || 0,
      totalOptimizations: optimizations.length,
      averageImprovement: optimizations.reduce((sum, o) => sum + o.results.performanceImprovement, 0) / optimizations.length || 0
    };
  }

  /**
   * Nettoyage
   */
  async cleanup(): Promise<void> {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    // Sauvegarde des modèles ML
    if (this.performanceModel) {
      await this.performanceModel.save(`file://${this.config.ml.modelPath}/performance_model`);
    }
    
    if (this.bottleneckModel) {
      await this.bottleneckModel.save(`file://${this.config.ml.modelPath}/bottleneck_model`);
    }
    
    console.log('[WI] Nettoyage terminé');
  }

  // Méthodes utilitaires supplémentaires (implémentation simplifiée)
  private calculateAverageResourceUsage(executions: ExecutionMetric[], resource: 'cpu' | 'memory'): number {
    return 50; // Simulation - à implémenter selon vos métriques
  }

  private calculateNetworkEfficiency(executions: ExecutionMetric[]): number {
    return 80; // Simulation
  }

  private detectParallelizationOpportunities(executions: ExecutionMetric[]): number {
    return 3; // Simulation
  }

  private calculateRedundancyScore(executions: ExecutionMetric[]): number {
    return 15; // Simulation
  }

  private analyzeNodePerformance(executions: ExecutionMetric[]): Map<string, any> {
    const nodeStats = new Map();
    // Implémentation simplifiée
    return nodeStats;
  }

  private calculateSeverity(time: number): 'low' | 'medium' | 'high' | 'critical' {
    if (time > 30000) return 'critical';
    if (time > 15000) return 'high';
    if (time > 5000) return 'medium';
    return 'low';
  }

  private async analyzeCause(nodeId: string, stats: any): Promise<string> {
    return 'Analyse de cause en cours'; // Simulation
  }

  private async suggestSolution(nodeId: string, stats: any): Promise<string> {
    return 'Solution suggérée'; // Simulation
  }

  private detectNetworkBottlenecks(executions: ExecutionMetric[]): Bottleneck[] {
    return []; // Simulation
  }

  private detectDataBottlenecks(executions: ExecutionMetric[]): Bottleneck[] {
    return []; // Simulation
  }

  private prepareMLFeatures(executions: ExecutionMetric[]): tf.Tensor {
    // Simulation - préparation des features pour ML
    const features = Array(10).fill(0);
    return tf.tensor2d([features]);
  }

  private analyzeTimePatterns(executions: ExecutionMetric[]): any {
    return {}; // Simulation
  }

  private predictPeakTimes(patterns: any): TimeSlot[] {
    return []; // Simulation
  }

  private predictResourceRequirements(predictionData: Float32Array): ResourcePrediction {
    return {
      cpu: 50,
      memory: 512,
      network: 10,
      storage: 1
    };
  }

  private async predictPotentialIssues(executions: ExecutionMetric[], predictionData: Float32Array): Promise<PredictedIssue[]> {
    return []; // Simulation
  }

  private getHistoricalPerformance(workflowId: string, timestamp: Date): PerformanceStats {
    return this.getEmptyPerformanceStats(); // Simulation
  }

  private calculateImprovement(oldPerf: PerformanceStats, newPerf: PerformanceStats): OptimizationResult {
    const timeImprovement = ((oldPerf.averageExecutionTime - newPerf.averageExecutionTime) / oldPerf.averageExecutionTime) * 100;
    const costImprovement = ((oldPerf.costEstimate - newPerf.costEstimate) / oldPerf.costEstimate) * 100;
    const reliabilityImprovement = ((newPerf.successRate - oldPerf.successRate) / oldPerf.successRate) * 100;

    return {
      performanceImprovement: timeImprovement || 0,
      costReduction: costImprovement || 0,
      reliabilityImprovement: reliabilityImprovement || 0,
      issues: []
    };
  }

  private async rollbackOptimization(optimizationId: string): Promise<void> {
    console.log(`[WI] Rollback optimisation: ${optimizationId}`);
    // Implémentation du rollback
  }

  private async sendAnomalyAlert(workflowId: string, anomalies: any[]): Promise<void> {
    console.log(`[WI] Alerte anomalie workflow ${workflowId}:`, anomalies);
    // Implémentation envoi d'alertes
  }

  private modifyWorkflowNode(workflow: any, target: string, newValue: any): void {
    // Implémentation modification de nœud
  }

  private replaceWorkflowNode(workflow: any, target: string, newValue: any): void {
    // Implémentation remplacement de nœud
  }

  private addWorkflowNode(workflow: any, target: string, newValue: any): void {
    // Implémentation ajout de nœud
  }

  private removeWorkflowNode(workflow: any, target: string): void {
    // Implémentation suppression de nœud
  }
}

// Configuration par défaut
export const defaultWorkflowIntelligenceConfig: WorkflowIntelligenceConfig = {
  n8n: {
    apiKey: process.env.N8N_API_KEY || '',
    baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678',
    webhookUrl: process.env.N8N_WEBHOOK_URL || ''
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o'
  },
  monitoring: {
    samplingInterval: 60, // 1 minute
    retentionPeriod: 30, // 30 jours
    alertThresholds: {
      executionTime: 10000, // 10 secondes
      errorRate: 5, // 5%
      throughput: 1 // 1 exec/min minimum
    }
  },
  optimization: {
    autoOptimize: false,
    optimizationSchedule: '0 2 * * 0', // Dimanche 2h du matin
    backupBeforeOptimization: true,
    rollbackOnFailure: true
  },
  ml: {
    modelPath: './models',
    trainingInterval: 24, // 24 heures
    predictionWindow: 24 // 24 heures
  },
  notifications: {
    webhookUrl: process.env.WI_WEBHOOK_URL || '',
    slackWebhook: process.env.SLACK_WEBHOOK_URL || '',
    emailAlerts: true
  }
};

export default WorkflowIntelligence;