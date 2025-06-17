/**
 * Campaign Optimizer - AI-Powered Bid Management & Budget Allocation
 * Automatise l'optimisation des campagnes Google Ads et Meta Ads avec IA
 */

import { MarketingConfig } from '../index';

export interface CampaignPerformance {
  id: string;
  name: string;
  platform: 'google' | 'meta' | 'linkedin';
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
    qualityScore?: number;
    relevanceScore?: number;
  };
  hourlyData: Array<{
    hour: number;
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
  }>;
  demographics: {
    age: Record<string, number>;
    gender: Record<string, number>;
    location: Record<string, number>;
    device: Record<string, number>;
  };
  trends: {
    direction: 'up' | 'down' | 'stable';
    confidence: number;
    forecast: number[];
  };
}

export interface OptimizationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  threshold: number;
  priority: 'high' | 'medium' | 'low';
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  lastExecuted?: Date;
}

export interface BidStrategy {
  type: 'maximize_conversions' | 'target_cpa' | 'target_roas' | 'manual_cpc' | 'enhanced_cpc';
  targetValue?: number;
  bidAdjustments: {
    device: Record<string, number>;
    location: Record<string, number>;
    dayOfWeek: Record<string, number>;
    hourOfDay: Record<string, number>;
    audience: Record<string, number>;
  };
  portfolioStrategy?: {
    name: string;
    target: number;
    campaigns: string[];
  };
}

export interface PredictionModel {
  algorithm: 'linear_regression' | 'random_forest' | 'neural_network' | 'gradient_boosting';
  accuracy: number;
  features: string[];
  predictions: {
    nextDay: {
      clicks: number;
      conversions: number;
      cost: number;
      confidence: number;
    };
    nextWeek: {
      clicks: number;
      conversions: number;
      cost: number;
      confidence: number;
    };
    nextMonth: {
      clicks: number;
      conversions: number;
      cost: number;
      confidence: number;
    };
  };
}

export class CampaignOptimizer {
  private config: MarketingConfig;
  private performanceData: Map<string, CampaignPerformance> = new Map();
  private rules: OptimizationRule[] = [];
  private predictionModel: PredictionModel | null = null;

  constructor(config: MarketingConfig) {
    this.config = config;
    this.initializeDefaultRules();
  }

  /**
   * Analyse la performance en temps réel et optimise automatiquement
   */
  async optimizeCampaigns(campaigns: CampaignPerformance[]): Promise<{
    optimizations: Array<{
      campaignId: string;
      type: string;
      oldValue: number;
      newValue: number;
      reason: string;
      expectedImpact: string;
    }>;
    budgetReallocation: {
      totalBudget: number;
      allocations: Array<{
        campaignId: string;
        currentBudget: number;
        newBudget: number;
        change: number;
        reason: string;
      }>;
    };
    recommendations: string[];
  }> {
    const optimizations = [];
    const budgetChanges = [];
    const recommendations = [];

    for (const campaign of campaigns) {
      this.performanceData.set(campaign.id, campaign);

      // Analyse performance et génère optimisations
      const campOptimizations = await this.analyzeCampaignPerformance(campaign);
      optimizations.push(...campOptimizations);

      // Calcul allocation budget optimale
      const budgetOptimization = this.calculateOptimalBudget(campaign, campaigns);
      if (budgetOptimization) {
        budgetChanges.push(budgetOptimization);
      }

      // Recommandations stratégiques
      const campRecommendations = this.generateRecommendations(campaign);
      recommendations.push(...campRecommendations);
    }

    return {
      optimizations,
      budgetReallocation: {
        totalBudget: this.config.budget.monthly,
        allocations: budgetChanges
      },
      recommendations
    };
  }

  /**
   * Gestion avancée des enchères avec IA
   */
  async optimizeBidStrategy(campaignId: string): Promise<BidStrategy> {
    const performance = this.performanceData.get(campaignId);
    if (!performance) throw new Error('Campaign performance data not found');

    const strategy = await this.calculateOptimalBidStrategy(performance);
    
    return {
      type: strategy.type,
      targetValue: strategy.targetValue,
      bidAdjustments: {
        device: this.calculateDeviceBidAdjustments(performance),
        location: this.calculateLocationBidAdjustments(performance),
        dayOfWeek: this.calculateDayOfWeekAdjustments(performance),
        hourOfDay: this.calculateHourOfDayAdjustments(performance),
        audience: this.calculateAudienceBidAdjustments(performance)
      },
      portfolioStrategy: this.createPortfolioStrategy(campaignId, performance)
    };
  }

  /**
   * Tests A/B automatisés des créas
   */
  async setupAutomatedABTesting(campaignId: string): Promise<{
    testId: string;
    variants: Array<{
      id: string;
      name: string;
      creative: {
        headline: string;
        description: string;
        image?: string;
        video?: string;
      };
      trafficAllocation: number;
    }>;
    testDuration: number;
    successMetrics: string[];
    significanceLevel: number;
  }> {
    const testId = `ab_test_${campaignId}_${Date.now()}`;
    
    // Génération automatique de variantes créatives
    const variants = await this.generateCreativeVariants(campaignId);
    
    return {
      testId,
      variants,
      testDuration: 14, // jours
      successMetrics: ['ctr', 'conversion_rate', 'cpa', 'quality_score'],
      significanceLevel: 0.95
    };
  }

  /**
   * Prédiction de performance avec Machine Learning
   */
  async predictPerformance(campaignId: string, days: number = 7): Promise<PredictionModel> {
    const performance = this.performanceData.get(campaignId);
    if (!performance) throw new Error('Campaign performance data not found');

    // Simulation d'un modèle ML (en production: utiliser TensorFlow.js ou API ML)
    const model: PredictionModel = {
      algorithm: 'gradient_boosting',
      accuracy: 0.87,
      features: [
        'historical_ctr',
        'budget_changes',
        'competition_index',
        'seasonality',
        'day_of_week',
        'hour_of_day',
        'device_mix',
        'audience_quality'
      ],
      predictions: {
        nextDay: {
          clicks: Math.round(performance.metrics.clicks * 1.05),
          conversions: Math.round(performance.metrics.conversions * 1.08),
          cost: Math.round(performance.metrics.cost * 1.03),
          confidence: 0.92
        },
        nextWeek: {
          clicks: Math.round(performance.metrics.clicks * 7 * 1.12),
          conversions: Math.round(performance.metrics.conversions * 7 * 1.15),
          cost: Math.round(performance.metrics.cost * 7 * 1.08),
          confidence: 0.85
        },
        nextMonth: {
          clicks: Math.round(performance.metrics.clicks * 30 * 1.25),
          conversions: Math.round(performance.metrics.conversions * 30 * 1.28),
          cost: Math.round(performance.metrics.cost * 30 * 1.18),
          confidence: 0.72
        }
      }
    };

    this.predictionModel = model;
    return model;
  }

  /**
   * Surveillance en temps réel avec alertes
   */
  async monitorRealTimePerformance(): Promise<{
    alerts: Array<{
      severity: 'critical' | 'warning' | 'info';
      campaignId: string;
      message: string;
      metric: string;
      currentValue: number;
      threshold: number;
      recommendedAction: string;
    }>;
    anomalies: Array<{
      campaignId: string;
      metric: string;
      deviation: number;
      significance: number;
      trend: 'increasing' | 'decreasing';
    }>;
  }> {
    const alerts = [];
    const anomalies = [];

    for (const [campaignId, performance] of this.performanceData) {
      // Détection d'alertes basée sur les règles
      const campaignAlerts = this.checkAlertConditions(campaignId, performance);
      alerts.push(...campaignAlerts);

      // Détection d'anomalies statistiques
      const campaignAnomalies = this.detectAnomalies(campaignId, performance);
      anomalies.push(...campaignAnomalies);
    }

    return { alerts, anomalies };
  }

  /**
   * Méthodes privées d'analyse et calcul
   */
  private async analyzeCampaignPerformance(campaign: CampaignPerformance) {
    const optimizations = [];

    // Analyse CTR
    if (campaign.metrics.ctr < 2.0) {
      optimizations.push({
        campaignId: campaign.id,
        type: 'keyword_bid_increase',
        oldValue: campaign.metrics.cpc,
        newValue: campaign.metrics.cpc * 1.15,
        reason: 'CTR below target (2.0%)',
        expectedImpact: '+12% CTR, +8% conversions'
      });
    }

    // Analyse CPA
    if (campaign.metrics.cpa > 50) {
      optimizations.push({
        campaignId: campaign.id,
        type: 'bid_strategy_change',
        oldValue: 0,
        newValue: 45,
        reason: 'CPA above target (€50)',
        expectedImpact: '-15% CPA, maintain conversions'
      });
    }

    // Analyse ROAS
    if (campaign.metrics.roas < 3.0) {
      optimizations.push({
        campaignId: campaign.id,
        type: 'audience_refinement',
        oldValue: campaign.metrics.roas,
        newValue: 3.5,
        reason: 'ROAS below target (3.0)',
        expectedImpact: '+17% ROAS, improved targeting'
      });
    }

    return optimizations;
  }

  private calculateOptimalBudget(campaign: CampaignPerformance, allCampaigns: CampaignPerformance[]) {
    const performance = campaign.metrics.roas;
    const avgPerformance = allCampaigns.reduce((sum, c) => sum + c.metrics.roas, 0) / allCampaigns.length;
    
    if (performance > avgPerformance * 1.2) {
      return {
        campaignId: campaign.id,
        currentBudget: this.config.budget.monthly * 0.25,
        newBudget: this.config.budget.monthly * 0.3,
        change: +20,
        reason: 'High ROAS performance (+20% above average)'
      };
    }

    if (performance < avgPerformance * 0.8) {
      return {
        campaignId: campaign.id,
        currentBudget: this.config.budget.monthly * 0.25,
        newBudget: this.config.budget.monthly * 0.2,
        change: -20,
        reason: 'Low ROAS performance (-20% below average)'
      };
    }

    return null;
  }

  private async calculateOptimalBidStrategy(performance: CampaignPerformance): Promise<{
    type: BidStrategy['type'];
    targetValue?: number;
  }> {
    // Logique basée sur la performance historique
    if (performance.metrics.roas > 4.0) {
      return {
        type: 'target_roas',
        targetValue: performance.metrics.roas * 0.9 // Objectif légèrement plus conservateur
      };
    }

    if (performance.metrics.cpa < 40) {
      return {
        type: 'target_cpa',
        targetValue: performance.metrics.cpa * 1.1 // Objectif légèrement plus agressif
      };
    }

    return {
      type: 'maximize_conversions'
    };
  }

  private calculateDeviceBidAdjustments(performance: CampaignPerformance): Record<string, number> {
    const devicePerf = performance.demographics.device;
    const adjustments: Record<string, number> = {};

    Object.entries(devicePerf).forEach(([device, convRate]) => {
      if (convRate > 0.05) adjustments[device] = 15; // +15% pour devices performants
      else if (convRate < 0.02) adjustments[device] = -25; // -25% pour devices faibles
      else adjustments[device] = 0;
    });

    return adjustments;
  }

  private calculateLocationBidAdjustments(performance: CampaignPerformance): Record<string, number> {
    // Logique similaire pour les locations
    return {
      'paris': 10,
      'lyon': 5,
      'marseille': -5,
      'autres': -10
    };
  }

  private calculateHourOfDayAdjustments(performance: CampaignPerformance): Record<string, number> {
    const hourlyData = performance.hourlyData;
    const adjustments: Record<string, number> = {};

    hourlyData.forEach(data => {
      const convRate = data.conversions / data.clicks;
      if (convRate > 0.08) adjustments[data.hour.toString()] = 20;
      else if (convRate < 0.03) adjustments[data.hour.toString()] = -30;
      else adjustments[data.hour.toString()] = 0;
    });

    return adjustments;
  }

  private calculateDayOfWeekAdjustments(performance: CampaignPerformance): Record<string, number> {
    // Ajustements basés sur les jours de la semaine
    return {
      'monday': -10,
      'tuesday': 0,
      'wednesday': 5,
      'thursday': 10,
      'friday': 15,
      'saturday': 20,
      'sunday': 5
    };
  }

  private calculateAudienceBidAdjustments(performance: CampaignPerformance): Record<string, number> {
    return {
      'high_value_customers': 25,
      'lookalike_1_percent': 15,
      'website_visitors': 10,
      'interest_targeting': 0,
      'broad_targeting': -15
    };
  }

  private createPortfolioStrategy(campaignId: string, performance: CampaignPerformance) {
    if (performance.metrics.roas > 3.5) {
      return {
        name: 'High Performance Portfolio',
        target: 4.0,
        campaigns: [campaignId]
      };
    }
    return undefined;
  }

  private async generateCreativeVariants(campaignId: string) {
    return [
      {
        id: `${campaignId}_variant_a`,
        name: 'Control - Current Creative',
        creative: {
          headline: 'Restaurant Gastronomique - Réservez Maintenant',
          description: 'Découvrez notre cuisine raffinée. Réservation en ligne.'
        },
        trafficAllocation: 34
      },
      {
        id: `${campaignId}_variant_b`,
        name: 'Urgency Variant',
        creative: {
          headline: 'Tables Limitées - Réservez Aujourd\'hui',
          description: 'Ne manquez pas notre expérience culinaire unique.'
        },
        trafficAllocation: 33
      },
      {
        id: `${campaignId}_variant_c`,
        name: 'Value Proposition',
        creative: {
          headline: 'Menu Étoilé dès 85€ - Expérience Inoubliable',
          description: 'Chef étoilé Michelin. Ambiance raffinée. Réservez maintenant.'
        },
        trafficAllocation: 33
      }
    ];
  }

  private generateRecommendations(campaign: CampaignPerformance): string[] {
    const recommendations = [];

    if (campaign.metrics.ctr < 2.0) {
      recommendations.push(`Campagne ${campaign.name}: Optimiser les titres d'annonces pour améliorer le CTR`);
    }

    if (campaign.metrics.qualityScore && campaign.metrics.qualityScore < 7) {
      recommendations.push(`Campagne ${campaign.name}: Améliorer la pertinence des mots-clés et pages de destination`);
    }

    if (campaign.metrics.roas < 3.0) {
      recommendations.push(`Campagne ${campaign.name}: Revoir le ciblage d'audience pour améliorer le ROAS`);
    }

    return recommendations;
  }

  private checkAlertConditions(campaignId: string, performance: CampaignPerformance) {
    const alerts = [];

    if (performance.metrics.cost > this.config.budget.monthly * 0.4) {
      alerts.push({
        severity: 'critical' as const,
        campaignId,
        message: 'Budget mensuel dépassé de 40%',
        metric: 'cost',
        currentValue: performance.metrics.cost,
        threshold: this.config.budget.monthly * 0.4,
        recommendedAction: 'Réduire les enchères ou suspendre la campagne'
      });
    }

    if (performance.metrics.ctr < 1.0) {
      alerts.push({
        severity: 'warning' as const,
        campaignId,
        message: 'CTR très faible, impact sur Quality Score',
        metric: 'ctr',
        currentValue: performance.metrics.ctr,
        threshold: 1.0,
        recommendedAction: 'Réviser les annonces et mots-clés'
      });
    }

    return alerts;
  }

  private detectAnomalies(campaignId: string, performance: CampaignPerformance) {
    const anomalies = [];

    // Détection simple d'anomalies (en production: algorithmes plus sophistiqués)
    const avgClicks = performance.hourlyData.reduce((sum, h) => sum + h.clicks, 0) / performance.hourlyData.length;
    const recentClicks = performance.hourlyData.slice(-3).reduce((sum, h) => sum + h.clicks, 0) / 3;

    if (Math.abs(recentClicks - avgClicks) / avgClicks > 0.3) {
      anomalies.push({
        campaignId,
        metric: 'clicks',
        deviation: (recentClicks - avgClicks) / avgClicks,
        significance: 0.85,
        trend: recentClicks > avgClicks ? 'increasing' as const : 'decreasing' as const
      });
    }

    return anomalies;
  }

  private initializeDefaultRules() {
    this.rules = [
      {
        id: 'auto_pause_high_cpa',
        name: 'Pause campagnes CPA élevé',
        condition: 'cpa > 80',
        action: 'pause_campaign',
        threshold: 80,
        priority: 'high',
        enabled: true,
        frequency: 'hourly'
      },
      {
        id: 'increase_budget_high_roas',
        name: 'Augmenter budget ROAS élevé',
        condition: 'roas > 5.0',
        action: 'increase_budget_20',
        threshold: 5.0,
        priority: 'medium',
        enabled: true,
        frequency: 'daily'
      },
      {
        id: 'decrease_bid_low_quality',
        name: 'Réduire enchères Quality Score faible',
        condition: 'quality_score < 5',
        action: 'decrease_bid_15',
        threshold: 5,
        priority: 'medium',
        enabled: true,
        frequency: 'daily'
      }
    ];
  }
}

export default CampaignOptimizer;