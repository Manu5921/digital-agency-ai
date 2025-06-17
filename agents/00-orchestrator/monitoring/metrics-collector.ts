/**
 * Metrics Collector - Collecte et analyse des métriques système
 * Surveille les performances et la santé de l'écosystème multi-agents
 */

import { EventEmitter } from 'events';

export interface SystemMetrics {
  timestamp: string;
  system: {
    uptime: number;
    memory: MemoryMetrics;
    cpu: CPUMetrics;
    network: NetworkMetrics;
  };
  agents: AgentMetrics[];
  projects: ProjectMetrics[];
  performance: PerformanceMetrics;
  quality: QualityMetrics;
  errors: ErrorMetrics;
}

export interface MemoryMetrics {
  used: number; // MB
  available: number; // MB
  utilization: number; // %
  peak: number; // MB
}

export interface CPUMetrics {
  utilization: number; // %
  cores: number;
  load: number[];
  throttling: boolean;
}

export interface NetworkMetrics {
  bandwidth: number; // Mbps
  latency: number; // ms
  errors: number;
  requests: number;
}

export interface AgentMetrics {
  agentId: string;
  status: string;
  performance: {
    tasksCompleted: number;
    averageResponseTime: number;
    successRate: number;
    errorRate: number;
    throughput: number; // tasks/hour
  };
  resources: {
    memoryUsage: number; // MB
    cpuUsage: number; // %
    activeConnections: number;
  };
  quality: {
    outputQuality: number; // 0-100
    codeComplexity: number;
    testCoverage: number; // %
    maintainabilityIndex: number;
  };
}

export interface ProjectMetrics {
  projectId: string;
  type: string;
  status: string;
  timeline: {
    estimatedDuration: number; // hours
    actualDuration: number; // hours
    variance: number; // %
    milestones: MilestoneMetrics[];
  };
  quality: {
    clientSatisfaction: number; // 0-100
    deliverableQuality: number; // 0-100
    technicalDebt: number; // 0-100
  };
  efficiency: {
    resourceUtilization: number; // %
    costEfficiency: number; // %
    teamProductivity: number; // 0-100
  };
}

export interface MilestoneMetrics {
  name: string;
  planned: string;
  actual?: string;
  variance: number; // days
  status: 'pending' | 'completed' | 'delayed';
}

export interface PerformanceMetrics {
  overall: {
    systemEfficiency: number; // %
    responseTime: number; // ms
    throughput: number; // operations/minute
    availability: number; // %
  };
  bottlenecks: BottleneckInfo[];
  trends: TrendData[];
}

export interface BottleneckInfo {
  component: string;
  severity: 'low' | 'medium' | 'high';
  impact: number; // %
  recommendation: string;
}

export interface TrendData {
  metric: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  change: number; // %
  period: string;
}

export interface QualityMetrics {
  code: {
    complexity: number;
    maintainability: number;
    testCoverage: number;
    bugDensity: number; // bugs per KLOC
  };
  deliverables: {
    completeness: number; // %
    accuracy: number; // %
    clientApproval: number; // %
  };
  process: {
    adherenceToStandards: number; // %
    documentationQuality: number; // %
    reviewCoverage: number; // %
  };
}

export interface ErrorMetrics {
  total: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  byAgent: Record<string, number>;
  resolution: {
    averageTime: number; // minutes
    successRate: number; // %
    escalationRate: number; // %
  };
}

export class MetricsCollector extends EventEmitter {
  private metrics: SystemMetrics[] = [];
  private collectionInterval: NodeJS.Timeout | null = null;
  private alertThresholds: AlertThresholds;
  private readonly COLLECTION_INTERVAL = 60000; // 1 minute
  private readonly RETENTION_PERIOD = 24 * 60 * 60 * 1000; // 24 heures
  private readonly MAX_METRICS_HISTORY = 1440; // 24h * 60min

  constructor() {
    super();
    this.setupAlertThresholds();
    this.startCollection();
  }

  /**
   * Configure les seuils d'alerte
   */
  private setupAlertThresholds(): void {
    this.alertThresholds = {
      system: {
        memoryUtilization: 85, // %
        cpuUtilization: 80, // %
        responseTime: 5000, // ms
        errorRate: 5 // %
      },
      agents: {
        responseTime: 10000, // ms
        errorRate: 10, // %
        successRate: 90 // %
      },
      projects: {
        delayThreshold: 20, // %
        qualityThreshold: 80, // %
        budgetVariance: 15 // %
      }
    };
  }

  /**
   * Démarre la collecte de métriques
   */
  private startCollection(): void {
    this.collectionInterval = setInterval(() => {
      this.collectMetrics();
    }, this.COLLECTION_INTERVAL);

    console.log('=Ê Collecte de métriques démarrée');
  }

  /**
   * Collecte toutes les métriques
   */
  private async collectMetrics(): Promise<void> {
    try {
      const metrics: SystemMetrics = {
        timestamp: new Date().toISOString(),
        system: await this.collectSystemMetrics(),
        agents: await this.collectAgentMetrics(),
        projects: await this.collectProjectMetrics(),
        performance: await this.collectPerformanceMetrics(),
        quality: await this.collectQualityMetrics(),
        errors: await this.collectErrorMetrics()
      };

      this.metrics.push(metrics);
      this.cleanupOldMetrics();
      
      // Analyser et alerter si nécessaire
      this.analyzeMetrics(metrics);
      
      this.emit('metrics-collected', metrics);
      
    } catch (error) {
      console.error('L Erreur collecte métriques:', error);
      this.emit('collection-error', error);
    }
  }

  /**
   * Collecte les métriques système
   */
  private async collectSystemMetrics(): Promise<SystemMetrics['system']> {
    const memoryUsage = process.memoryUsage();
    
    return {
      uptime: Math.floor(process.uptime()),
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        available: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        utilization: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100),
        peak: Math.round(memoryUsage.heapUsed / 1024 / 1024)
      },
      cpu: {
        utilization: await this.getCPUUtilization(),
        cores: require('os').cpus().length,
        load: require('os').loadavg(),
        throttling: false
      },
      network: {
        bandwidth: 1000, // simulation
        latency: Math.round(Math.random() * 50 + 10),
        errors: Math.floor(Math.random() * 5),
        requests: Math.floor(Math.random() * 1000 + 500)
      }
    };
  }

  /**
   * Collecte les métriques des agents
   */
  private async collectAgentMetrics(): Promise<AgentMetrics[]> {
    const agentIds = ['design-agent', 'webdev-agent', 'seo-agent', 'marketing-agent', 'techops-agent', 'automation-agent'];
    
    return agentIds.map(agentId => ({
      agentId,
      status: this.getAgentStatus(agentId),
      performance: {
        tasksCompleted: Math.floor(Math.random() * 20 + 5),
        averageResponseTime: Math.round(Math.random() * 3000 + 1000),
        successRate: Math.round(Math.random() * 15 + 85),
        errorRate: Math.round(Math.random() * 5),
        throughput: Math.round(Math.random() * 10 + 5)
      },
      resources: {
        memoryUsage: Math.round(Math.random() * 500 + 100),
        cpuUsage: Math.round(Math.random() * 50 + 10),
        activeConnections: Math.floor(Math.random() * 10 + 1)
      },
      quality: {
        outputQuality: Math.round(Math.random() * 20 + 80),
        codeComplexity: Math.round(Math.random() * 30 + 70),
        testCoverage: Math.round(Math.random() * 30 + 70),
        maintainabilityIndex: Math.round(Math.random() * 20 + 80)
      }
    }));
  }

  /**
   * Collecte les métriques des projets
   */
  private async collectProjectMetrics(): Promise<ProjectMetrics[]> {
    // Simulation - dans une vraie implémentation, récupérer depuis la base de données
    const projectTypes = ['restaurant', 'ecommerce', 'saas'];
    
    return projectTypes.map((type, index) => ({
      projectId: `project_${type}_${index}`,
      type,
      status: Math.random() > 0.7 ? 'completed' : 'in-progress',
      timeline: {
        estimatedDuration: Math.round(Math.random() * 20 + 10),
        actualDuration: Math.round(Math.random() * 25 + 8),
        variance: Math.round((Math.random() - 0.5) * 40),
        milestones: this.generateMilestoneMetrics(type)
      },
      quality: {
        clientSatisfaction: Math.round(Math.random() * 20 + 80),
        deliverableQuality: Math.round(Math.random() * 15 + 85),
        technicalDebt: Math.round(Math.random() * 30 + 10)
      },
      efficiency: {
        resourceUtilization: Math.round(Math.random() * 20 + 70),
        costEfficiency: Math.round(Math.random() * 15 + 80),
        teamProductivity: Math.round(Math.random() * 25 + 75)
      }
    }));
  }

  /**
   * Collecte les métriques de performance
   */
  private async collectPerformanceMetrics(): Promise<PerformanceMetrics> {
    return {
      overall: {
        systemEfficiency: Math.round(Math.random() * 15 + 80),
        responseTime: Math.round(Math.random() * 2000 + 500),
        throughput: Math.round(Math.random() * 50 + 100),
        availability: Math.round(Math.random() * 5 + 95)
      },
      bottlenecks: this.identifyBottlenecks(),
      trends: this.calculateTrends()
    };
  }

  /**
   * Collecte les métriques de qualité
   */
  private async collectQualityMetrics(): Promise<QualityMetrics> {
    return {
      code: {
        complexity: Math.round(Math.random() * 30 + 70),
        maintainability: Math.round(Math.random() * 20 + 75),
        testCoverage: Math.round(Math.random() * 25 + 70),
        bugDensity: Math.round(Math.random() * 5 + 1)
      },
      deliverables: {
        completeness: Math.round(Math.random() * 10 + 90),
        accuracy: Math.round(Math.random() * 15 + 80),
        clientApproval: Math.round(Math.random() * 20 + 75)
      },
      process: {
        adherenceToStandards: Math.round(Math.random() * 15 + 80),
        documentationQuality: Math.round(Math.random() * 25 + 70),
        reviewCoverage: Math.round(Math.random() * 20 + 75)
      }
    };
  }

  /**
   * Collecte les métriques d'erreurs
   */
  private async collectErrorMetrics(): Promise<ErrorMetrics> {
    const totalErrors = Math.floor(Math.random() * 20 + 5);
    
    return {
      total: totalErrors,
      byType: {
        'system': Math.floor(totalErrors * 0.3),
        'agent': Math.floor(totalErrors * 0.4),
        'communication': Math.floor(totalErrors * 0.2),
        'user': Math.floor(totalErrors * 0.1)
      },
      bySeverity: {
        'critical': Math.floor(totalErrors * 0.1),
        'high': Math.floor(totalErrors * 0.2),
        'medium': Math.floor(totalErrors * 0.4),
        'low': Math.floor(totalErrors * 0.3)
      },
      byAgent: {
        'design-agent': Math.floor(totalErrors * 0.15),
        'webdev-agent': Math.floor(totalErrors * 0.25),
        'seo-agent': Math.floor(totalErrors * 0.15),
        'marketing-agent': Math.floor(totalErrors * 0.15),
        'techops-agent': Math.floor(totalErrors * 0.20),
        'automation-agent': Math.floor(totalErrors * 0.10)
      },
      resolution: {
        averageTime: Math.round(Math.random() * 30 + 15),
        successRate: Math.round(Math.random() * 10 + 85),
        escalationRate: Math.round(Math.random() * 10 + 5)
      }
    };
  }

  /**
   * Obtient le statut d'un agent
   */
  private getAgentStatus(agentId: string): string {
    const statuses = ['online', 'busy', 'offline'];
    const weights = [0.7, 0.25, 0.05]; // 70% online, 25% busy, 5% offline
    
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < statuses.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return statuses[i];
      }
    }
    
    return 'online';
  }

  /**
   * Génère les métriques de jalons
   */
  private generateMilestoneMetrics(projectType: string): MilestoneMetrics[] {
    const milestones = {
      restaurant: ['Design', 'Development', 'SEO', 'Launch'],
      ecommerce: ['Analysis', 'Catalog', 'Payment', 'Marketing', 'Launch'],
      saas: ['MVP', 'Beta', 'Features', 'Scale', 'Launch']
    };

    return (milestones[projectType as keyof typeof milestones] || milestones.restaurant).map((name, index) => ({
      name,
      planned: new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      actual: Math.random() > 0.3 ? new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000) + (Math.random() - 0.5) * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
      variance: Math.round((Math.random() - 0.5) * 6),
      status: Math.random() > 0.7 ? 'completed' : index === 0 ? 'pending' : 'pending'
    }));
  }

  /**
   * Identifie les goulots d'étranglement
   */
  private identifyBottlenecks(): BottleneckInfo[] {
    const potentialBottlenecks = [
      {
        component: 'webdev-agent',
        severity: 'medium' as const,
        impact: Math.round(Math.random() * 20 + 10),
        recommendation: 'Optimiser le pipeline de développement'
      },
      {
        component: 'database',
        severity: 'low' as const,
        impact: Math.round(Math.random() * 15 + 5),
        recommendation: 'Augmenter les ressources de cache'
      },
      {
        component: 'api-gateway',
        severity: 'high' as const,
        impact: Math.round(Math.random() * 30 + 20),
        recommendation: 'Mise à l\'échelle horizontale requise'
      }
    ];

    // Retourner aléatoirement 0-2 goulots
    const count = Math.floor(Math.random() * 3);
    return potentialBottlenecks.slice(0, count);
  }

  /**
   * Calcule les tendances
   */
  private calculateTrends(): TrendData[] {
    const metrics = ['response-time', 'throughput', 'error-rate', 'efficiency'];
    
    return metrics.map(metric => ({
      metric,
      trend: Math.random() > 0.6 ? 'increasing' : Math.random() > 0.3 ? 'decreasing' : 'stable',
      change: Math.round((Math.random() - 0.5) * 20),
      period: '24h'
    }));
  }

  /**
   * Obtient l'utilisation CPU
   */
  private async getCPUUtilization(): Promise<number> {
    // Simulation - dans une vraie implémentation, utiliser des outils système
    return Math.round(Math.random() * 60 + 20);
  }

  /**
   * Analyse les métriques et génère des alertes
   */
  private analyzeMetrics(metrics: SystemMetrics): void {
    const alerts: Alert[] = [];

    // Analyser les seuils système
    if (metrics.system.memory.utilization > this.alertThresholds.system.memoryUtilization) {
      alerts.push({
        type: 'memory',
        severity: 'high',
        message: `Utilisation mémoire critique: ${metrics.system.memory.utilization}%`,
        threshold: this.alertThresholds.system.memoryUtilization,
        current: metrics.system.memory.utilization
      });
    }

    if (metrics.system.cpu.utilization > this.alertThresholds.system.cpuUtilization) {
      alerts.push({
        type: 'cpu',
        severity: 'high',
        message: `Utilisation CPU élevée: ${metrics.system.cpu.utilization}%`,
        threshold: this.alertThresholds.system.cpuUtilization,
        current: metrics.system.cpu.utilization
      });
    }

    // Analyser les agents
    metrics.agents.forEach(agent => {
      if (agent.performance.errorRate > this.alertThresholds.agents.errorRate) {
        alerts.push({
          type: 'agent-error',
          severity: 'medium',
          message: `Taux d'erreur élevé pour ${agent.agentId}: ${agent.performance.errorRate}%`,
          threshold: this.alertThresholds.agents.errorRate,
          current: agent.performance.errorRate
        });
      }

      if (agent.performance.successRate < this.alertThresholds.agents.successRate) {
        alerts.push({
          type: 'agent-performance',
          severity: 'medium',
          message: `Performance dégradée pour ${agent.agentId}: ${agent.performance.successRate}%`,
          threshold: this.alertThresholds.agents.successRate,
          current: agent.performance.successRate
        });
      }
    });

    // Analyser les projets
    metrics.projects.forEach(project => {
      if (Math.abs(project.timeline.variance) > this.alertThresholds.projects.delayThreshold) {
        alerts.push({
          type: 'project-delay',
          severity: project.timeline.variance > 0 ? 'high' : 'medium',
          message: `Retard projet ${project.projectId}: ${project.timeline.variance}%`,
          threshold: this.alertThresholds.projects.delayThreshold,
          current: Math.abs(project.timeline.variance)
        });
      }
    });

    // Émettre les alertes
    if (alerts.length > 0) {
      this.emit('alerts-generated', alerts);
      console.warn(`  ${alerts.length} alertes générées`);
    }
  }

  /**
   * Nettoie les anciennes métriques
   */
  private cleanupOldMetrics(): void {
    const cutoff = new Date(Date.now() - this.RETENTION_PERIOD);
    
    this.metrics = this.metrics.filter(metric => 
      new Date(metric.timestamp) > cutoff
    );

    // Limiter la taille en mémoire
    if (this.metrics.length > this.MAX_METRICS_HISTORY) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS_HISTORY);
    }
  }

  /**
   * Obtient les métriques récentes
   */
  getRecentMetrics(hours: number = 1): SystemMetrics[] {
    const cutoff = new Date(Date.now() - (hours * 60 * 60 * 1000));
    
    return this.metrics.filter(metric => 
      new Date(metric.timestamp) > cutoff
    );
  }

  /**
   * Obtient les métriques actuelles
   */
  getCurrentMetrics(): SystemMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }

  /**
   * Obtient un rapport de performance
   */
  getPerformanceReport(timeframe: '1h' | '24h' | '7d' = '24h'): PerformanceReport {
    const hours = { '1h': 1, '24h': 24, '7d': 168 }[timeframe];
    const recentMetrics = this.getRecentMetrics(hours);
    
    if (recentMetrics.length === 0) {
      return { error: 'Aucune donnée disponible' } as any;
    }

    const avgSystemEfficiency = this.calculateAverage(recentMetrics, 'performance.overall.systemEfficiency');
    const avgResponseTime = this.calculateAverage(recentMetrics, 'performance.overall.responseTime');
    const totalErrors = recentMetrics.reduce((sum, m) => sum + m.errors.total, 0);

    return {
      timeframe,
      period: {
        start: recentMetrics[0].timestamp,
        end: recentMetrics[recentMetrics.length - 1].timestamp,
        dataPoints: recentMetrics.length
      },
      summary: {
        systemEfficiency: Math.round(avgSystemEfficiency),
        averageResponseTime: Math.round(avgResponseTime),
        totalErrors,
        availability: Math.round(this.calculateAverage(recentMetrics, 'performance.overall.availability'))
      },
      trends: this.calculateDetailedTrends(recentMetrics),
      recommendations: this.generateRecommendations(recentMetrics)
    };
  }

  /**
   * Calcule la moyenne d'une métrique
   */
  private calculateAverage(metrics: SystemMetrics[], path: string): number {
    const values = metrics.map(m => this.getNestedValue(m, path)).filter(v => v !== undefined);
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Obtient une valeur imbriquée
   */
  private getNestedValue(obj: any, path: string): number | undefined {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Calcule les tendances détaillées
   */
  private calculateDetailedTrends(metrics: SystemMetrics[]): any {
    if (metrics.length < 2) return {};

    const first = metrics[0];
    const last = metrics[metrics.length - 1];

    return {
      efficiency: {
        change: last.performance.overall.systemEfficiency - first.performance.overall.systemEfficiency,
        trend: last.performance.overall.systemEfficiency > first.performance.overall.systemEfficiency ? 'improving' : 'declining'
      },
      responseTime: {
        change: last.performance.overall.responseTime - first.performance.overall.responseTime,
        trend: last.performance.overall.responseTime < first.performance.overall.responseTime ? 'improving' : 'declining'
      },
      errors: {
        change: last.errors.total - first.errors.total,
        trend: last.errors.total < first.errors.total ? 'improving' : 'declining'
      }
    };
  }

  /**
   * Génère des recommandations
   */
  private generateRecommendations(metrics: SystemMetrics[]): string[] {
    const recommendations: string[] = [];
    const latest = metrics[metrics.length - 1];

    if (latest.system.memory.utilization > 80) {
      recommendations.push('Considérer l\'augmentation de la mémoire allouée');
    }

    if (latest.performance.overall.responseTime > 3000) {
      recommendations.push('Optimiser les temps de réponse des agents');
    }

    if (latest.errors.total > 10) {
      recommendations.push('Investiguer l\'augmentation du taux d\'erreurs');
    }

    const lowPerformanceAgents = latest.agents.filter(a => a.performance.successRate < 85);
    if (lowPerformanceAgents.length > 0) {
      recommendations.push(`Optimiser les agents: ${lowPerformanceAgents.map(a => a.agentId).join(', ')}`);
    }

    return recommendations;
  }

  /**
   * Arrête la collecte
   */
  stop(): void {
    if (this.collectionInterval) {
      clearInterval(this.collectionInterval);
      this.collectionInterval = null;
    }
    console.log('=Ê Collecte de métriques arrêtée');
  }
}

interface AlertThresholds {
  system: {
    memoryUtilization: number;
    cpuUtilization: number;
    responseTime: number;
    errorRate: number;
  };
  agents: {
    responseTime: number;
    errorRate: number;
    successRate: number;
  };
  projects: {
    delayThreshold: number;
    qualityThreshold: number;
    budgetVariance: number;
  };
}

interface Alert {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  threshold: number;
  current: number;
}

interface PerformanceReport {
  timeframe: string;
  period: {
    start: string;
    end: string;
    dataPoints: number;
  };
  summary: {
    systemEfficiency: number;
    averageResponseTime: number;
    totalErrors: number;
    availability: number;
  };
  trends: any;
  recommendations: string[];
}

export const metricsCollector = new MetricsCollector();
export default metricsCollector;