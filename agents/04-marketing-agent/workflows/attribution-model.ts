/**
 * Attribution Model - Tracking Avancé Multi-Touch & Customer Journey
 * Système d'attribution intelligent pour mesurer l'impact réel de chaque canal marketing
 */

import { MarketingConfig } from '../index';

export interface TouchPoint {
  id: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  channel: 'organic_search' | 'paid_search' | 'social_media' | 'direct' | 'email' | 'referral' | 'display' | 'video';
  source: string;
  medium: string;
  campaign?: string;
  adGroup?: string;
  keyword?: string;
  content?: string;
  device: 'desktop' | 'mobile' | 'tablet';
  location: {
    country: string;
    city: string;
    coordinates?: [number, number];
  };
  pageViews: Array<{
    url: string;
    title: string;
    timeOnPage: number;
    interactions: number;
  }>;
  events: Array<{
    name: string;
    value?: number;
    parameters: Record<string, any>;
  }>;
  revenue?: number;
  conversionType?: string;
}

export interface CustomerJourney {
  userId: string;
  startDate: Date;
  endDate: Date;
  touchPoints: TouchPoint[];
  conversions: Array<{
    type: 'micro' | 'macro';
    value: number;
    timestamp: Date;
    touchPointId: string;
  }>;
  totalRevenue: number;
  journeyDuration: number; // en heures
  touchPointCount: number;
  channelSequence: string[];
  deviceJourney: string[];
}

export interface AttributionResult {
  touchPointId: string;
  channel: string;
  attributionWeight: number;
  attributedRevenue: number;
  attributedConversions: number;
  influenceScore: number;
  positionWeight: number;
  decayWeight: number;
  timeWeight: number;
}

export interface CrossDeviceMapping {
  userId: string;
  devices: Array<{
    deviceId: string;
    type: 'desktop' | 'mobile' | 'tablet';
    firstSeen: Date;
    lastSeen: Date;
    touchPoints: string[];
  }>;
  identificationMethod: 'deterministic' | 'probabilistic';
  confidence: number;
  unifiedTouchPoints: TouchPoint[];
}

export interface AttributionModel {
  name: string;
  type: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'position_based' | 'data_driven' | 'custom';
  parameters: {
    lookbackWindow: number; // en jours
    decayRate?: number;
    positionWeights?: {
      first: number;
      middle: number;
      last: number;
    };
    channelWeights?: Record<string, number>;
    timeWeights?: Record<string, number>;
  };
  customLogic?: (journey: CustomerJourney) => AttributionResult[];
}

export class AttributionModelEngine {
  private config: MarketingConfig;
  private touchPoints: Map<string, TouchPoint[]> = new Map(); // userId -> touchPoints
  private journeys: Map<string, CustomerJourney> = new Map();
  private crossDeviceData: Map<string, CrossDeviceMapping> = new Map();
  private models: Map<string, AttributionModel> = new Map();

  constructor(config: MarketingConfig) {
    this.config = config;
    this.initializeModels();
  }

  /**
   * Enregistre un nouveau point de contact
   */
  async trackTouchPoint(touchPoint: TouchPoint): Promise<void> {
    const userTouchPoints = this.touchPoints.get(touchPoint.userId) || [];
    userTouchPoints.push(touchPoint);
    this.touchPoints.set(touchPoint.userId, userTouchPoints);

    // Mise à jour du parcours client
    await this.updateCustomerJourney(touchPoint.userId);

    // Cross-device tracking
    await this.updateCrossDeviceMapping(touchPoint);
  }

  /**
   * Calcule l'attribution pour un parcours client
   */
  async calculateAttribution(
    userId: string, 
    modelName: string = 'data_driven'
  ): Promise<{
    attributions: AttributionResult[];
    totalRevenue: number;
    modelAccuracy: number;
    insights: string[];
  }> {
    const journey = this.journeys.get(userId);
    if (!journey) throw new Error('Customer journey not found');

    const model = this.models.get(modelName);
    if (!model) throw new Error('Attribution model not found');

    const attributions = await this.applyAttributionModel(journey, model);
    const insights = this.generateAttributionInsights(attributions, journey);

    return {
      attributions,
      totalRevenue: journey.totalRevenue,
      modelAccuracy: this.calculateModelAccuracy(attributions, journey),
      insights
    };
  }

  /**
   * Attribution multi-touch avec IA
   */
  async calculateDataDrivenAttribution(userId: string): Promise<{
    attributions: AttributionResult[];
    channelContributions: Record<string, {
      revenue: number;
      conversions: number;
      influence: number;
      efficiency: number;
    }>;
    optimizationRecommendations: string[];
  }> {
    const journey = this.journeys.get(userId);
    if (!journey) throw new Error('Customer journey not found');

    // Utilisation d'un modèle ML pour l'attribution data-driven
    const attributions = await this.applyMLAttribution(journey);
    const channelContributions = this.calculateChannelContributions(attributions);
    const recommendations = this.generateOptimizationRecommendations(channelContributions);

    return {
      attributions,
      channelContributions,
      optimizationRecommendations: recommendations
    };
  }

  /**
   * Analyse du parcours client cross-device
   */
  async analyzeCrossDeviceJourney(userId: string): Promise<{
    deviceSequence: Array<{
      device: string;
      touchPoints: number;
      revenue: number;
      timeSpent: number;
    }>;
    conversionDevice: string;
    researchDevices: string[];
    deviceInfluence: Record<string, number>;
    unifiedJourney: CustomerJourney;
  }> {
    const crossDeviceData = this.crossDeviceData.get(userId);
    if (!crossDeviceData) throw new Error('Cross-device data not found');

    const deviceSequence = this.calculateDeviceSequence(crossDeviceData);
    const conversionDevice = this.identifyConversionDevice(crossDeviceData);
    const researchDevices = this.identifyResearchDevices(crossDeviceData);
    const deviceInfluence = this.calculateDeviceInfluence(crossDeviceData);
    const unifiedJourney = this.createUnifiedJourney(crossDeviceData);

    return {
      deviceSequence,
      conversionDevice,
      researchDevices,
      deviceInfluence,
      unifiedJourney
    };
  }

  /**
   * ROI par canal avec attribution
   */
  async calculateChannelROI(): Promise<{
    channels: Array<{
      name: string;
      cost: number;
      attributedRevenue: number;
      attributedConversions: number;
      roi: number;
      roas: number;
      efficiency: number;
      trend: 'up' | 'down' | 'stable';
    }>;
    totalROI: number;
    bestPerformingChannel: string;
    recommendations: string[];
  }> {
    const channelData = await this.aggregateChannelData();
    const channels = [];

    for (const [channelName, data] of channelData) {
      const roi = ((data.revenue - data.cost) / data.cost) * 100;
      const roas = data.revenue / data.cost;
      
      channels.push({
        name: channelName,
        cost: data.cost,
        attributedRevenue: data.revenue,
        attributedConversions: data.conversions,
        roi,
        roas,
        efficiency: data.conversions / data.cost,
        trend: this.calculateChannelTrend(channelName)
      });
    }

    const totalROI = channels.reduce((sum, ch) => sum + ch.roi, 0) / channels.length;
    const bestPerformingChannel = channels.reduce((best, current) => 
      current.roi > best.roi ? current : best
    ).name;

    return {
      channels,
      totalROI,
      bestPerformingChannel,
      recommendations: this.generateROIRecommendations(channels)
    };
  }

  /**
   * Mapping des événements de conversion
   */
  async setupConversionTracking(): Promise<{
    events: Array<{
      name: string;
      value: number;
      funnel_stage: string;
      tracking_code: string;
      attribution_window: number;
    }>;
    funnelConfiguration: {
      stages: string[];
      dropOffPoints: string[];
      optimizationOpportunities: string[];
    };
    crossPlatformSetup: {
      googleAnalytics: string;
      googleAds: string;
      metaPixel: string;
      customEvents: Record<string, any>;
    };
  }> {
    const events = [
      {
        name: 'page_view',
        value: 0,
        funnel_stage: 'awareness',
        tracking_code: 'gtag("event", "page_view", { page_title: document.title });',
        attribution_window: 30
      },
      {
        name: 'menu_view',
        value: 5,
        funnel_stage: 'interest',
        tracking_code: 'gtag("event", "menu_view", { menu_section: section });',
        attribution_window: 7
      },
      {
        name: 'reservation_start',
        value: 15,
        funnel_stage: 'consideration',
        tracking_code: 'gtag("event", "begin_checkout", { currency: "EUR", value: 0 });',
        attribution_window: 7
      },
      {
        name: 'reservation_complete',
        value: 50,
        funnel_stage: 'conversion',
        tracking_code: 'gtag("event", "purchase", { transaction_id: id, value: 50, currency: "EUR" });',
        attribution_window: 1
      },
      {
        name: 'phone_click',
        value: 25,
        funnel_stage: 'conversion',
        tracking_code: 'gtag("event", "generate_lead", { method: "phone" });',
        attribution_window: 1
      }
    ];

    const funnelConfiguration = {
      stages: ['awareness', 'interest', 'consideration', 'conversion', 'retention'],
      dropOffPoints: ['menu_to_reservation', 'reservation_start_to_complete'],
      optimizationOpportunities: [
        'Optimiser la page menu pour augmenter les conversions',
        'Simplifier le processus de réservation',
        'Ajouter des incitations sur la page de réservation'
      ]
    };

    const crossPlatformSetup = {
      googleAnalytics: 'G-XXXXXXXXXX',
      googleAds: 'AW-XXXXXXXXX',
      metaPixel: 'XXXXXXXXXXXXXXXXX',
      customEvents: {
        server_side_tracking: true,
        enhanced_conversions: true,
        offline_conversions: true
      }
    };

    return {
      events,
      funnelConfiguration,
      crossPlatformSetup
    };
  }

  /**
   * Analyse des micro-conversions
   */
  async analyzeMicroConversions(): Promise<{
    microConversions: Array<{
      name: string;
      volume: number;
      value: number;
      conversionRate: number;
      channelBreakdown: Record<string, number>;
      predictiveValue: number;
    }>;
    macroConversionCorrelation: Record<string, number>;
    optimizationPriority: string[];
  }> {
    const microConversions = [
      {
        name: 'menu_download',
        volume: 250,
        value: 5,
        conversionRate: 0.15,
        channelBreakdown: {
          'organic_search': 45,
          'paid_search': 30,
          'social_media': 15,
          'direct': 10
        },
        predictiveValue: 0.25 // 25% de probabilité de conversion macro
      },
      {
        name: 'location_view',
        volume: 180,
        value: 3,
        conversionRate: 0.08,
        channelBreakdown: {
          'organic_search': 40,
          'paid_search': 35,
          'social_media': 20,
          'direct': 5
        },
        predictiveValue: 0.12
      },
      {
        name: 'chef_bio_view',
        volume: 120,
        value: 8,
        conversionRate: 0.22,
        channelBreakdown: {
          'organic_search': 35,
          'paid_search': 25,
          'social_media': 30,
          'direct': 10
        },
        predictiveValue: 0.35
      }
    ];

    const macroConversionCorrelation = {
      'menu_download': 0.68,
      'location_view': 0.34,
      'chef_bio_view': 0.78,
      'contact_form_view': 0.56
    };

    const optimizationPriority = [
      'Optimiser la page chef (corrélation élevée)',
      'Améliorer la visibilité du menu téléchargeable',
      'Simplifier l\'accès aux informations de contact'
    ];

    return {
      microConversions,
      macroConversionCorrelation,
      optimizationPriority
    };
  }

  /**
   * Méthodes privées
   */
  private async updateCustomerJourney(userId: string): Promise<void> {
    const touchPoints = this.touchPoints.get(userId) || [];
    if (touchPoints.length === 0) return;

    const firstTouchPoint = touchPoints[0];
    const lastTouchPoint = touchPoints[touchPoints.length - 1];

    const journey: CustomerJourney = {
      userId,
      startDate: firstTouchPoint.timestamp,
      endDate: lastTouchPoint.timestamp,
      touchPoints,
      conversions: this.extractConversions(touchPoints),
      totalRevenue: this.calculateTotalRevenue(touchPoints),
      journeyDuration: this.calculateJourneyDuration(firstTouchPoint.timestamp, lastTouchPoint.timestamp),
      touchPointCount: touchPoints.length,
      channelSequence: this.extractChannelSequence(touchPoints),
      deviceJourney: this.extractDeviceJourney(touchPoints)
    };

    this.journeys.set(userId, journey);
  }

  private async updateCrossDeviceMapping(touchPoint: TouchPoint): Promise<void> {
    let mapping = this.crossDeviceData.get(touchPoint.userId);
    
    if (!mapping) {
      mapping = {
        userId: touchPoint.userId,
        devices: [],
        identificationMethod: 'deterministic',
        confidence: 0.95,
        unifiedTouchPoints: []
      };
    }

    // Mise à jour des données cross-device
    const deviceId = `${touchPoint.device}_${touchPoint.sessionId}`;
    const existingDevice = mapping.devices.find(d => d.deviceId === deviceId);

    if (existingDevice) {
      existingDevice.lastSeen = touchPoint.timestamp;
      existingDevice.touchPoints.push(touchPoint.id);
    } else {
      mapping.devices.push({
        deviceId,
        type: touchPoint.device,
        firstSeen: touchPoint.timestamp,
        lastSeen: touchPoint.timestamp,
        touchPoints: [touchPoint.id]
      });
    }

    mapping.unifiedTouchPoints.push(touchPoint);
    this.crossDeviceData.set(touchPoint.userId, mapping);
  }

  private async applyAttributionModel(journey: CustomerJourney, model: AttributionModel): Promise<AttributionResult[]> {
    const results: AttributionResult[] = [];

    switch (model.type) {
      case 'first_touch':
        return this.applyFirstTouchAttribution(journey);
      case 'last_touch':
        return this.applyLastTouchAttribution(journey);
      case 'linear':
        return this.applyLinearAttribution(journey);
      case 'time_decay':
        return this.applyTimeDecayAttribution(journey, model.parameters.decayRate || 0.7);
      case 'position_based':
        return this.applyPositionBasedAttribution(journey, model.parameters.positionWeights!);
      case 'data_driven':
        return this.applyMLAttribution(journey);
      case 'custom':
        return model.customLogic!(journey);
      default:
        return this.applyLinearAttribution(journey);
    }
  }

  private applyFirstTouchAttribution(journey: CustomerJourney): AttributionResult[] {
    const firstTouchPoint = journey.touchPoints[0];
    return [{
      touchPointId: firstTouchPoint.id,
      channel: firstTouchPoint.channel,
      attributionWeight: 1.0,
      attributedRevenue: journey.totalRevenue,
      attributedConversions: journey.conversions.length,
      influenceScore: 1.0,
      positionWeight: 1.0,
      decayWeight: 1.0,
      timeWeight: 1.0
    }];
  }

  private applyLastTouchAttribution(journey: CustomerJourney): AttributionResult[] {
    const lastTouchPoint = journey.touchPoints[journey.touchPoints.length - 1];
    return [{
      touchPointId: lastTouchPoint.id,
      channel: lastTouchPoint.channel,
      attributionWeight: 1.0,
      attributedRevenue: journey.totalRevenue,
      attributedConversions: journey.conversions.length,
      influenceScore: 1.0,
      positionWeight: 1.0,
      decayWeight: 1.0,
      timeWeight: 1.0
    }];
  }

  private applyLinearAttribution(journey: CustomerJourney): AttributionResult[] {
    const weight = 1.0 / journey.touchPoints.length;
    return journey.touchPoints.map(tp => ({
      touchPointId: tp.id,
      channel: tp.channel,
      attributionWeight: weight,
      attributedRevenue: journey.totalRevenue * weight,
      attributedConversions: journey.conversions.length * weight,
      influenceScore: weight,
      positionWeight: weight,
      decayWeight: 1.0,
      timeWeight: 1.0
    }));
  }

  private applyTimeDecayAttribution(journey: CustomerJourney, decayRate: number): AttributionResult[] {
    const results = [];
    const totalTouchPoints = journey.touchPoints.length;

    for (let i = 0; i < totalTouchPoints; i++) {
      const tp = journey.touchPoints[i];
      const daysFromConversion = (journey.endDate.getTime() - tp.timestamp.getTime()) / (1000 * 60 * 60 * 24);
      const decayWeight = Math.pow(decayRate, daysFromConversion);
      
      results.push({
        touchPointId: tp.id,
        channel: tp.channel,
        attributionWeight: decayWeight,
        attributedRevenue: journey.totalRevenue * decayWeight,
        attributedConversions: journey.conversions.length * decayWeight,
        influenceScore: decayWeight,
        positionWeight: 1.0,
        decayWeight,
        timeWeight: 1.0
      });
    }

    // Normalisation des poids
    const totalWeight = results.reduce((sum, r) => sum + r.attributionWeight, 0);
    results.forEach(r => {
      r.attributionWeight /= totalWeight;
      r.attributedRevenue /= totalWeight;
      r.attributedConversions /= totalWeight;
    });

    return results;
  }

  private applyPositionBasedAttribution(journey: CustomerJourney, weights: {first: number, middle: number, last: number}): AttributionResult[] {
    const results = [];
    const totalTouchPoints = journey.touchPoints.length;

    for (let i = 0; i < totalTouchPoints; i++) {
      const tp = journey.touchPoints[i];
      let weight = weights.middle;

      if (i === 0) weight = weights.first;
      else if (i === totalTouchPoints - 1) weight = weights.last;

      results.push({
        touchPointId: tp.id,
        channel: tp.channel,
        attributionWeight: weight,
        attributedRevenue: journey.totalRevenue * weight,
        attributedConversions: journey.conversions.length * weight,
        influenceScore: weight,
        positionWeight: weight,
        decayWeight: 1.0,
        timeWeight: 1.0
      });
    }

    return results;
  }

  private async applyMLAttribution(journey: CustomerJourney): Promise<AttributionResult[]> {
    // Simulation d'un modèle ML pour l'attribution data-driven
    // En production: utiliser TensorFlow.js ou appeler une API ML
    
    const results = [];
    const features = this.extractMLFeatures(journey);
    
    for (let i = 0; i < journey.touchPoints.length; i++) {
      const tp = journey.touchPoints[i];
      
      // Calcul du score d'influence basé sur les features
      const influenceScore = this.calculateInfluenceScore(tp, journey, features);
      
      results.push({
        touchPointId: tp.id,
        channel: tp.channel,
        attributionWeight: influenceScore,
        attributedRevenue: journey.totalRevenue * influenceScore,
        attributedConversions: journey.conversions.length * influenceScore,
        influenceScore,
        positionWeight: this.calculatePositionWeight(i, journey.touchPoints.length),
        decayWeight: this.calculateDecayWeight(tp.timestamp, journey.endDate),
        timeWeight: this.calculateTimeWeight(tp.timestamp, journey)
      });
    }

    // Normalisation
    const totalWeight = results.reduce((sum, r) => sum + r.attributionWeight, 0);
    results.forEach(r => {
      r.attributionWeight /= totalWeight;
      r.attributedRevenue /= totalWeight;
      r.attributedConversions /= totalWeight;
    });

    return results;
  }

  private extractMLFeatures(journey: CustomerJourney): Record<string, number> {
    return {
      journey_length: journey.touchPointCount,
      journey_duration: journey.journeyDuration,
      total_revenue: journey.totalRevenue,
      conversion_count: journey.conversions.length,
      unique_channels: new Set(journey.channelSequence).size,
      device_switches: this.countDeviceSwitches(journey.deviceJourney),
      weekend_touchpoints: this.countWeekendTouchpoints(journey.touchPoints),
      mobile_ratio: journey.touchPoints.filter(tp => tp.device === 'mobile').length / journey.touchPoints.length
    };
  }

  private calculateInfluenceScore(touchPoint: TouchPoint, journey: CustomerJourney, features: Record<string, number>): number {
    // Simulation d'un score d'influence ML
    let score = 0.1; // Score de base

    // Bonus pour le premier et dernier touchpoint
    const index = journey.touchPoints.indexOf(touchPoint);
    if (index === 0) score += 0.3;
    if (index === journey.touchPoints.length - 1) score += 0.4;

    // Bonus basé sur le canal
    const channelWeights = {
      'paid_search': 0.25,
      'organic_search': 0.20,
      'social_media': 0.15,
      'direct': 0.30,
      'email': 0.25,
      'referral': 0.10,
      'display': 0.05,
      'video': 0.15
    };
    score += channelWeights[touchPoint.channel] || 0.1;

    // Bonus pour les interactions
    const totalInteractions = touchPoint.pageViews.reduce((sum, pv) => sum + pv.interactions, 0);
    score += Math.min(totalInteractions * 0.05, 0.2);

    // Bonus pour la proximité avec la conversion
    const hoursToConversion = (journey.endDate.getTime() - touchPoint.timestamp.getTime()) / (1000 * 60 * 60);
    if (hoursToConversion < 24) score += 0.15;
    else if (hoursToConversion < 72) score += 0.10;

    return Math.min(score, 1.0);
  }

  private calculatePositionWeight(index: number, totalTouchPoints: number): number {
    if (index === 0) return 0.4; // Premier touchpoint
    if (index === totalTouchPoints - 1) return 0.4; // Dernier touchpoint
    return 0.2 / (totalTouchPoints - 2); // Touchpoints intermédiaires
  }

  private calculateDecayWeight(touchPointTime: Date, conversionTime: Date): number {
    const hoursDiff = (conversionTime.getTime() - touchPointTime.getTime()) / (1000 * 60 * 60);
    return Math.exp(-hoursDiff / 168); // Décroissance sur 7 jours
  }

  private calculateTimeWeight(touchPointTime: Date, journey: CustomerJourney): number {
    const journeyDuration = journey.journeyDuration;
    const timeFromStart = (touchPointTime.getTime() - journey.startDate.getTime()) / (1000 * 60 * 60);
    return 1 - (timeFromStart / journeyDuration);
  }

  private countDeviceSwitches(deviceJourney: string[]): number {
    let switches = 0;
    for (let i = 1; i < deviceJourney.length; i++) {
      if (deviceJourney[i] !== deviceJourney[i - 1]) switches++;
    }
    return switches;
  }

  private countWeekendTouchpoints(touchPoints: TouchPoint[]): number {
    return touchPoints.filter(tp => {
      const day = tp.timestamp.getDay();
      return day === 0 || day === 6; // Dimanche ou Samedi
    }).length;
  }

  private extractConversions(touchPoints: TouchPoint[]) {
    const conversions = [];
    
    for (const tp of touchPoints) {
      for (const event of tp.events) {
        if (this.isConversionEvent(event.name)) {
          conversions.push({
            type: this.getConversionType(event.name),
            value: event.value || 0,
            timestamp: tp.timestamp,
            touchPointId: tp.id
          });
        }
      }
    }

    return conversions;
  }

  private calculateTotalRevenue(touchPoints: TouchPoint[]): number {
    return touchPoints.reduce((sum, tp) => sum + (tp.revenue || 0), 0);
  }

  private calculateJourneyDuration(start: Date, end: Date): number {
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // en heures
  }

  private extractChannelSequence(touchPoints: TouchPoint[]): string[] {
    return touchPoints.map(tp => tp.channel);
  }

  private extractDeviceJourney(touchPoints: TouchPoint[]): string[] {
    return touchPoints.map(tp => tp.device);
  }

  private isConversionEvent(eventName: string): boolean {
    const conversionEvents = ['purchase', 'reservation_complete', 'contact_form_submit', 'phone_click'];
    return conversionEvents.includes(eventName);
  }

  private getConversionType(eventName: string): 'micro' | 'macro' {
    const macroEvents = ['purchase', 'reservation_complete'];
    return macroEvents.includes(eventName) ? 'macro' : 'micro';
  }

  private generateAttributionInsights(attributions: AttributionResult[], journey: CustomerJourney): string[] {
    const insights = [];
    
    const topChannel = attributions.reduce((top, current) => 
      current.attributedRevenue > top.attributedRevenue ? current : top
    );
    
    insights.push(`Canal le plus influent: ${topChannel.channel} (${Math.round(topChannel.attributedRevenue)}€)`);
    insights.push(`Parcours de ${journey.touchPointCount} touchpoints sur ${Math.round(journey.journeyDuration)} heures`);
    
    if (journey.deviceJourney.length > 1) {
      const deviceSwitches = this.countDeviceSwitches(journey.deviceJourney);
      insights.push(`${deviceSwitches} changements d'appareil détectés`);
    }

    return insights;
  }

  private calculateModelAccuracy(attributions: AttributionResult[], journey: CustomerJourney): number {
    // Simulation d'un calcul de précision du modèle
    const totalAttributed = attributions.reduce((sum, a) => sum + a.attributedRevenue, 0);
    const accuracy = Math.min(totalAttributed / journey.totalRevenue, 1.0);
    return Math.round(accuracy * 100) / 100;
  }

  private calculateChannelContributions(attributions: AttributionResult[]) {
    const contributions: Record<string, any> = {};
    
    for (const attr of attributions) {
      if (!contributions[attr.channel]) {
        contributions[attr.channel] = {
          revenue: 0,
          conversions: 0,
          influence: 0,
          efficiency: 0
        };
      }
      
      contributions[attr.channel].revenue += attr.attributedRevenue;
      contributions[attr.channel].conversions += attr.attributedConversions;
      contributions[attr.channel].influence += attr.influenceScore;
    }

    // Calcul de l'efficacité (revenue / influence)
    Object.keys(contributions).forEach(channel => {
      contributions[channel].efficiency = contributions[channel].revenue / contributions[channel].influence;
    });

    return contributions;
  }

  private generateOptimizationRecommendations(channelContributions: Record<string, any>): string[] {
    const recommendations = [];
    
    const sortedChannels = Object.entries(channelContributions)
      .sort(([,a], [,b]) => b.efficiency - a.efficiency);
    
    const topChannel = sortedChannels[0];
    const bottomChannel = sortedChannels[sortedChannels.length - 1];
    
    recommendations.push(`Augmenter l'investissement sur ${topChannel[0]} (efficacité: ${Math.round(topChannel[1].efficiency)})`);
    recommendations.push(`Revoir la stratégie pour ${bottomChannel[0]} (efficacité: ${Math.round(bottomChannel[1].efficiency)})`);
    
    return recommendations;
  }

  private async aggregateChannelData(): Promise<Map<string, {cost: number, revenue: number, conversions: number}>> {
    // Simulation d'agrégation des données de canaux
    const data = new Map();
    
    // Données simulées basées sur la config marketing
    data.set('paid_search', {
      cost: this.config.budget.distribution.googleAds,
      revenue: this.config.budget.distribution.googleAds * 3.2, // ROAS simulé
      conversions: 45
    });
    
    data.set('social_media', {
      cost: this.config.budget.distribution.metaAds,
      revenue: this.config.budget.distribution.metaAds * 2.8,
      conversions: 38
    });
    
    return data;
  }

  private calculateChannelTrend(channelName: string): 'up' | 'down' | 'stable' {
    // Simulation de calcul de tendance
    const trends = ['up', 'down', 'stable'];
    return trends[Math.floor(Math.random() * trends.length)] as any;
  }

  private generateROIRecommendations(channels: any[]): string[] {
    const recommendations = [];
    
    const highROI = channels.filter(ch => ch.roi > 200);
    const lowROI = channels.filter(ch => ch.roi < 100);
    
    if (highROI.length > 0) {
      recommendations.push(`Augmenter le budget sur les canaux haute performance: ${highROI.map(ch => ch.name).join(', ')}`);
    }
    
    if (lowROI.length > 0) {
      recommendations.push(`Optimiser ou réduire l'investissement sur: ${lowROI.map(ch => ch.name).join(', ')}`);
    }
    
    return recommendations;
  }

  private calculateDeviceSequence(crossDeviceData: CrossDeviceMapping) {
    return crossDeviceData.devices.map(device => ({
      device: device.type,
      touchPoints: device.touchPoints.length,
      revenue: 0, // À calculer basé sur les touchpoints
      timeSpent: (device.lastSeen.getTime() - device.firstSeen.getTime()) / (1000 * 60) // en minutes
    }));
  }

  private identifyConversionDevice(crossDeviceData: CrossDeviceMapping): string {
    // Identifier l'appareil de conversion
    const conversions = crossDeviceData.unifiedTouchPoints.filter(tp => 
      tp.events.some(event => this.isConversionEvent(event.name))
    );
    
    if (conversions.length > 0) {
      return conversions[conversions.length - 1].device;
    }
    
    return 'unknown';
  }

  private identifyResearchDevices(crossDeviceData: CrossDeviceMapping): string[] {
    // Identifier les appareils utilisés pour la recherche
    return crossDeviceData.devices
      .filter(device => device.touchPoints.length > 2)
      .map(device => device.type);
  }

  private calculateDeviceInfluence(crossDeviceData: CrossDeviceMapping): Record<string, number> {
    const influence: Record<string, number> = {};
    
    crossDeviceData.devices.forEach(device => {
      influence[device.type] = device.touchPoints.length / crossDeviceData.unifiedTouchPoints.length;
    });
    
    return influence;
  }

  private createUnifiedJourney(crossDeviceData: CrossDeviceMapping): CustomerJourney {
    const touchPoints = crossDeviceData.unifiedTouchPoints.sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    return {
      userId: crossDeviceData.userId,
      startDate: touchPoints[0].timestamp,
      endDate: touchPoints[touchPoints.length - 1].timestamp,
      touchPoints,
      conversions: this.extractConversions(touchPoints),
      totalRevenue: this.calculateTotalRevenue(touchPoints),
      journeyDuration: this.calculateJourneyDuration(touchPoints[0].timestamp, touchPoints[touchPoints.length - 1].timestamp),
      touchPointCount: touchPoints.length,
      channelSequence: this.extractChannelSequence(touchPoints),
      deviceJourney: this.extractDeviceJourney(touchPoints)
    };
  }

  private initializeModels(): void {
    // Modèle Data-Driven par défaut
    this.models.set('data_driven', {
      name: 'Data-Driven Attribution',
      type: 'data_driven',
      parameters: {
        lookbackWindow: 30
      }
    });

    // Modèle Position-Based (40% premier, 20% milieu, 40% dernier)
    this.models.set('position_based', {
      name: 'Position-Based Attribution',
      type: 'position_based',
      parameters: {
        lookbackWindow: 30,
        positionWeights: {
          first: 0.4,
          middle: 0.2,
          last: 0.4
        }
      }
    });

    // Modèle Time-Decay
    this.models.set('time_decay', {
      name: 'Time-Decay Attribution',
      type: 'time_decay',
      parameters: {
        lookbackWindow: 30,
        decayRate: 0.7
      }
    });
  }
}

export default AttributionModelEngine;