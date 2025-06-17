/**
 * 🎯 MARKETING MIX MODELING - BUDGET OPTIMIZER ML
 * Phase 3 Advanced Growth Hacking Module
 * 
 * Features:
 * - Attribution ML avec TensorFlow
 * - Optimisation automatique cross-canal
 * - Geo-experiments automatisés
 * - Modèles diminishing returns
 * - Scenario planning avec prédictions ROI
 */

import * as tf from '@tensorflow/tfjs-node';
import { EventEmitter } from 'events';

// Types et interfaces
interface MarketingChannel {
  id: string;
  name: string;
  type: 'paid_search' | 'social_media' | 'display' | 'email' | 'affiliate' | 'tv' | 'radio' | 'outdoor';
  currentBudget: number;
  minBudget: number;
  maxBudget: number;
  constraints: ChannelConstraints;
}

interface ChannelConstraints {
  minBudgetPercentage: number;
  maxBudgetPercentage: number;
  seasonalityFactor: number;
  competitiveIntensity: number;
  saturationPoint: number;
}

interface AttributionData {
  timestamp: Date;
  channel: string;
  touchpoint: number;
  conversion: number;
  revenue: number;
  cost: number;
  impressions: number;
  clicks: number;
  geography: string;
  customerSegment: string;
}

interface MMModelResult {
  channelContributions: { [key: string]: number };
  baselineContribution: number;
  synergisticEffects: { [key: string]: number };
  saturationCurves: { [key: string]: SaturationCurve };
  attributionWeights: { [key: string]: number };
  incrementalityScores: { [key: string]: number };
}

interface SaturationCurve {
  alpha: number; // Shape parameter
  beta: number;  // Saturation point
  gamma: number; // Diminishing returns rate
  maxROI: number;
  currentROI: number;
  optimalSpend: number;
}

interface BudgetOptimization {
  currentAllocation: { [key: string]: number };
  optimizedAllocation: { [key: string]: number };
  expectedROI: number;
  expectedRevenue: number;
  incrementalROI: number;
  confidence: number;
  scenario: string;
}

interface GeoExperiment {
  id: string;
  name: string;
  geoMarkets: string[];
  controlMarkets: string[];
  testChannel: string;
  budgetLift: number;
  duration: number;
  status: 'planned' | 'running' | 'completed' | 'analyzed';
  results?: GeoExperimentResult;
}

interface GeoExperimentResult {
  incrementalConversions: number;
  incrementalRevenue: number;
  statisticalSignificance: number;
  pValue: number;
  confidenceInterval: [number, number];
  causalImpact: number;
}

/**
 * 🧠 MARKETING MIX MODELING ENGINE
 * Attribution causale avec ML avancé
 */
export class MarketingMixModeler extends EventEmitter {
  private model: tf.LayersModel | null = null;
  private channels: MarketingChannel[] = [];
  private historicalData: AttributionData[] = [];
  private geoExperiments: GeoExperiment[] = [];
  private isTraining = false;
  private modelAccuracy = 0;

  constructor() {
    super();
    this.initializeChannels();
  }

  /**
   * 🎯 INITIALISATION DES CANAUX MARKETING
   */
  private initializeChannels(): void {
    this.channels = [
      {
        id: 'google_ads',
        name: 'Google Ads',
        type: 'paid_search',
        currentBudget: 50000,
        minBudget: 10000,
        maxBudget: 200000,
        constraints: {
          minBudgetPercentage: 0.15,
          maxBudgetPercentage: 0.35,
          seasonalityFactor: 1.2,
          competitiveIntensity: 0.8,
          saturationPoint: 150000
        }
      },
      {
        id: 'facebook_ads',
        name: 'Meta Ads',
        type: 'social_media',
        currentBudget: 35000,
        minBudget: 8000,
        maxBudget: 120000,
        constraints: {
          minBudgetPercentage: 0.10,
          maxBudgetPercentage: 0.30,
          seasonalityFactor: 1.1,
          competitiveIntensity: 0.9,
          saturationPoint: 100000
        }
      },
      {
        id: 'linkedin_ads',
        name: 'LinkedIn Ads',
        type: 'social_media',
        currentBudget: 15000,
        minBudget: 3000,
        maxBudget: 50000,
        constraints: {
          minBudgetPercentage: 0.05,
          maxBudgetPercentage: 0.20,
          seasonalityFactor: 0.9,
          competitiveIntensity: 0.7,
          saturationPoint: 40000
        }
      },
      {
        id: 'display_network',
        name: 'Display Network',
        type: 'display',
        currentBudget: 20000,
        minBudget: 5000,
        maxBudget: 80000,
        constraints: {
          minBudgetPercentage: 0.08,
          maxBudgetPercentage: 0.25,
          seasonalityFactor: 1.0,
          competitiveIntensity: 0.6,
          saturationPoint: 60000
        }
      },
      {
        id: 'email_marketing',
        name: 'Email Marketing',
        type: 'email',
        currentBudget: 8000,
        minBudget: 2000,
        maxBudget: 25000,
        constraints: {
          minBudgetPercentage: 0.03,
          maxBudgetPercentage: 0.15,
          seasonalityFactor: 1.05,
          competitiveIntensity: 0.3,
          saturationPoint: 20000
        }
      }
    ];
  }

  /**
   * 🤖 CONSTRUCTION DU MODÈLE ML D'ATTRIBUTION
   */
  private buildAttributionModel(): tf.LayersModel {
    const model = tf.sequential({
      layers: [
        // Couche d'entrée - Features marketing
        tf.layers.dense({
          inputShape: [20], // 20 features par canal
          units: 128,
          activation: 'relu',
          kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
        }),
        
        // Couches cachées pour capture des interactions
        tf.layers.dropout({ rate: 0.3 }),
        tf.layers.dense({
          units: 256,
          activation: 'relu',
          kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
        }),
        
        // Couche d'attention pour pondération dynamique
        tf.layers.dense({
          units: 128,
          activation: 'tanh'
        }),
        
        // Couche de saturation avec activation personnalisée
        tf.layers.dense({
          units: 64,
          activation: 'sigmoid'
        }),
        
        // Couches de synergies inter-canaux
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({
          units: 32,
          activation: 'relu'
        }),
        
        // Couche de sortie - Attribution scores
        tf.layers.dense({
          units: this.channels.length + 1, // +1 pour baseline
          activation: 'softmax'
        })
      ]
    });

    // Compilation avec optimiseur Adam personnalisé
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy', 'meanSquaredError']
    });

    return model;
  }

  /**
   * 📊 PRÉPARATION DES DONNÉES D'ENTRAÎNEMENT
   */
  private prepareTrainingData(): { features: tf.Tensor, labels: tf.Tensor } {
    const features: number[][] = [];
    const labels: number[][] = [];

    // Agrégation des données par fenêtre temporelle
    const timeWindows = this.aggregateDataByTimeWindow(this.historicalData, 7); // 7 jours

    timeWindows.forEach(window => {
      // Features par canal
      const channelFeatures: number[] = [];
      
      this.channels.forEach(channel => {
        const channelData = window.filter(d => d.channel === channel.id);
        
        if (channelData.length > 0) {
          const totalSpend = channelData.reduce((sum, d) => sum + d.cost, 0);
          const totalImpressions = channelData.reduce((sum, d) => sum + d.impressions, 0);
          const totalClicks = channelData.reduce((sum, d) => sum + d.clicks, 0);
          const totalConversions = channelData.reduce((sum, d) => sum + d.conversion, 0);
          
          // Normalisation des features
          channelFeatures.push(
            totalSpend / 100000,        // Spend normalisé
            totalImpressions / 1000000, // Impressions normalisées
            totalClicks / 10000,        // Clicks normalisés
            totalConversions / 1000,    // Conversions normalisées
            totalClicks / Math.max(totalImpressions, 1), // CTR
          );
        } else {
          channelFeatures.push(0, 0, 0, 0, 0);
        }
      });

      // Labels - Attribution réelle
      const totalRevenue = window.reduce((sum, d) => sum + d.revenue, 0);
      const channelAttribution: number[] = [];
      
      this.channels.forEach(channel => {
        const channelRevenue = window
          .filter(d => d.channel === channel.id)
          .reduce((sum, d) => sum + d.revenue, 0);
        
        channelAttribution.push(channelRevenue / Math.max(totalRevenue, 1));
      });
      
      // Baseline attribution
      const baselineAttribution = Math.max(0, 1 - channelAttribution.reduce((sum, a) => sum + a, 0));
      channelAttribution.push(baselineAttribution);

      features.push(channelFeatures);
      labels.push(channelAttribution);
    });

    return {
      features: tf.tensor2d(features),
      labels: tf.tensor2d(labels)
    };
  }

  /**
   * ⏰ AGRÉGATION DES DONNÉES PAR FENÊTRE TEMPORELLE
   */
  private aggregateDataByTimeWindow(data: AttributionData[], windowDays: number): AttributionData[][] {
    const windows: AttributionData[][] = [];
    const sortedData = data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    let currentWindow: AttributionData[] = [];
    let windowStart = sortedData[0]?.timestamp;
    
    sortedData.forEach(point => {
      const daysDiff = (point.timestamp.getTime() - windowStart.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysDiff < windowDays) {
        currentWindow.push(point);
      } else {
        if (currentWindow.length > 0) {
          windows.push([...currentWindow]);
        }
        currentWindow = [point];
        windowStart = point.timestamp;
      }
    });
    
    if (currentWindow.length > 0) {
      windows.push(currentWindow);
    }
    
    return windows;
  }

  /**
   * 🚀 ENTRAÎNEMENT DU MODÈLE
   */
  async trainModel(): Promise<void> {
    if (this.isTraining) {
      throw new Error('Model is already training');
    }

    this.isTraining = true;
    this.emit('training_started');

    try {
      // Construction du modèle
      this.model = this.buildAttributionModel();
      
      // Préparation des données
      const { features, labels } = this.prepareTrainingData();
      
      // Configuration de l'entraînement
      const history = await this.model.fit(features, labels, {
        epochs: 200,
        batchSize: 32,
        validationSplit: 0.2,
        shuffle: true,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            this.emit('training_progress', {
              epoch: epoch + 1,
              loss: logs?.loss,
              accuracy: logs?.acc,
              valLoss: logs?.val_loss,
              valAccuracy: logs?.val_acc
            });
          }
        }
      });

      // Calcul de la précision finale
      this.modelAccuracy = Math.max(...history.history.val_acc as number[]);
      
      // Nettoyage des tenseurs
      features.dispose();
      labels.dispose();

      this.emit('training_completed', {
        accuracy: this.modelAccuracy,
        finalLoss: history.history.loss[history.history.loss.length - 1]
      });

    } catch (error) {
      this.emit('training_error', error);
      throw error;
    } finally {
      this.isTraining = false;
    }
  }

  /**
   * 📈 CALCUL DES COURBES DE SATURATION
   */
  private calculateSaturationCurves(): { [key: string]: SaturationCurve } {
    const curves: { [key: string]: SaturationCurve } = {};

    this.channels.forEach(channel => {
      // Modèle de saturation Adstock avec diminishing returns
      const channelData = this.historicalData.filter(d => d.channel === channel.id);
      
      if (channelData.length > 0) {
        // Calcul des paramètres de saturation via régression
        const spendPoints = channelData.map(d => d.cost);
        const revenuePoints = channelData.map(d => d.revenue);
        
        const { alpha, beta, gamma } = this.fitSaturationModel(spendPoints, revenuePoints);
        
        // Calcul du ROI optimal
        const currentSpend = channel.currentBudget;
        const currentROI = this.calculateROIAtSpend(currentSpend, alpha, beta, gamma);
        const maxROI = alpha; // ROI maximum théorique
        const optimalSpend = this.findOptimalSpend(alpha, beta, gamma, channel.maxBudget);

        curves[channel.id] = {
          alpha,
          beta,
          gamma,
          maxROI,
          currentROI,
          optimalSpend
        };
      }
    });

    return curves;
  }

  /**
   * 🔬 AJUSTEMENT DU MODÈLE DE SATURATION
   */
  private fitSaturationModel(spend: number[], revenue: number[]): { alpha: number, beta: number, gamma: number } {
    // Modèle de Hill Transformation pour saturation
    // Revenue = alpha * (spend^gamma) / (beta^gamma + spend^gamma)
    
    // Estimation initiale des paramètres
    let alpha = Math.max(...revenue) * 1.2; // ROI max estimé
    let beta = spend.reduce((sum, s) => sum + s, 0) / spend.length; // Point de saturation médian
    let gamma = 0.5; // Forme de la courbe
    
    // Optimisation par descente de gradient simple
    const learningRate = 0.001;
    const iterations = 1000;
    
    for (let i = 0; i < iterations; i++) {
      let totalError = 0;
      let alphaGradient = 0;
      let betaGradient = 0;
      let gammaGradient = 0;
      
      for (let j = 0; j < spend.length; j++) {
        const s = spend[j];
        const actualRevenue = revenue[j];
        
        // Prédiction avec modèle actuel
        const predicted = alpha * Math.pow(s, gamma) / (Math.pow(beta, gamma) + Math.pow(s, gamma));
        const error = predicted - actualRevenue;
        
        totalError += error * error;
        
        // Calcul des gradients
        const denominator = Math.pow(beta, gamma) + Math.pow(s, gamma);
        const numerator = Math.pow(s, gamma);
        
        alphaGradient += error * (numerator / denominator);
        betaGradient += error * alpha * (-gamma * Math.pow(beta, gamma - 1) * numerator / (denominator * denominator));
        gammaGradient += error * alpha * numerator * (Math.log(s) * denominator - Math.log(beta) * Math.pow(beta, gamma)) / (denominator * denominator);
      }
      
      // Mise à jour des paramètres
      alpha -= learningRate * alphaGradient;
      beta -= learningRate * betaGradient;
      gamma -= learningRate * gammaGradient;
      
      // Contraintes
      alpha = Math.max(0, alpha);
      beta = Math.max(1, beta);
      gamma = Math.max(0.1, Math.min(2, gamma));
    }
    
    return { alpha, beta, gamma };
  }

  /**
   * 💰 CALCUL DU ROI À UN NIVEAU DE SPEND
   */
  private calculateROIAtSpend(spend: number, alpha: number, beta: number, gamma: number): number {
    if (spend <= 0) return 0;
    
    const revenue = alpha * Math.pow(spend, gamma) / (Math.pow(beta, gamma) + Math.pow(spend, gamma));
    return revenue / spend;
  }

  /**
   * 🎯 RECHERCHE DU SPEND OPTIMAL
   */
  private findOptimalSpend(alpha: number, beta: number, gamma: number, maxBudget: number): number {
    let optimalSpend = 0;
    let maxROI = 0;
    
    // Recherche par pas de 1000
    for (let spend = 1000; spend <= maxBudget; spend += 1000) {
      const roi = this.calculateROIAtSpend(spend, alpha, beta, gamma);
      
      if (roi > maxROI) {
        maxROI = roi;
        optimalSpend = spend;
      }
    }
    
    return optimalSpend;
  }

  /**
   * 🎯 OPTIMISATION DU BUDGET CROSS-CANAL
   */
  async optimizeBudgetAllocation(
    totalBudget: number,
    constraints: { [channelId: string]: { min: number, max: number } } = {},
    scenario: string = 'balanced'
  ): Promise<BudgetOptimization> {
    if (!this.model) {
      throw new Error('Model must be trained before optimization');
    }

    // Calcul des courbes de saturation
    const saturationCurves = this.calculateSaturationCurves();
    
    // Configuration des contraintes
    const channelConstraints = this.applyBudgetConstraints(totalBudget, constraints);
    
    // Optimisation par algorithme génétique
    const optimizedAllocation = await this.geneticOptimization(
      totalBudget,
      channelConstraints,
      saturationCurves,
      scenario
    );
    
    // Calcul des métriques de performance
    const currentAllocation = this.getCurrentAllocation();
    const expectedROI = this.calculateExpectedROI(optimizedAllocation, saturationCurves);
    const expectedRevenue = this.calculateExpectedRevenue(optimizedAllocation, saturationCurves);
    const incrementalROI = expectedROI - this.calculateExpectedROI(currentAllocation, saturationCurves);
    const confidence = this.modelAccuracy;

    return {
      currentAllocation,
      optimizedAllocation,
      expectedROI,
      expectedRevenue,
      incrementalROI,
      confidence,
      scenario
    };
  }

  /**
   * 🧬 OPTIMISATION PAR ALGORITHME GÉNÉTIQUE
   */
  private async geneticOptimization(
    totalBudget: number,
    constraints: { [channelId: string]: { min: number, max: number } },
    saturationCurves: { [key: string]: SaturationCurve },
    scenario: string
  ): Promise<{ [key: string]: number }> {
    const populationSize = 100;
    const generations = 200;
    const mutationRate = 0.1;
    const crossoverRate = 0.8;

    // Initialisation de la population
    let population = this.initializePopulation(populationSize, totalBudget, constraints);
    
    for (let gen = 0; gen < generations; gen++) {
      // Évaluation du fitness
      const fitness = population.map(individual => 
        this.evaluateFitness(individual, saturationCurves, scenario)
      );
      
      // Sélection des meilleurs individus
      const selectedIndividuals = this.selection(population, fitness);
      
      // Crossover et mutation
      const newPopulation = this.crossoverAndMutation(
        selectedIndividuals,
        crossoverRate,
        mutationRate,
        totalBudget,
        constraints
      );
      
      population = newPopulation;
      
      // Émission du progrès
      if (gen % 20 === 0) {
        this.emit('optimization_progress', {
          generation: gen,
          bestFitness: Math.max(...fitness),
          averageFitness: fitness.reduce((sum, f) => sum + f, 0) / fitness.length
        });
      }
    }
    
    // Sélection du meilleur individu
    const finalFitness = population.map(individual => 
      this.evaluateFitness(individual, saturationCurves, scenario)
    );
    
    const bestIndex = finalFitness.indexOf(Math.max(...finalFitness));
    const bestAllocation = population[bestIndex];
    
    // Conversion en format de retour
    const result: { [key: string]: number } = {};
    this.channels.forEach((channel, index) => {
      result[channel.id] = bestAllocation[index];
    });
    
    return result;
  }

  /**
   * 👥 INITIALISATION DE LA POPULATION
   */
  private initializePopulation(
    size: number,
    totalBudget: number,
    constraints: { [channelId: string]: { min: number, max: number } }
  ): number[][] {
    const population: number[][] = [];
    
    for (let i = 0; i < size; i++) {
      const individual: number[] = [];
      let remainingBudget = totalBudget;
      
      // Attribution aléatoire respectant les contraintes
      this.channels.forEach((channel, index) => {
        const constraint = constraints[channel.id];
        const minBudget = constraint?.min || channel.minBudget;
        const maxBudget = Math.min(constraint?.max || channel.maxBudget, remainingBudget);
        
        const budget = minBudget + Math.random() * (maxBudget - minBudget);
        individual.push(budget);
        remainingBudget -= budget;
      });
      
      // Ajustement pour respecter le budget total
      const totalAllocated = individual.reduce((sum, b) => sum + b, 0);
      const adjustmentFactor = totalBudget / totalAllocated;
      
      for (let j = 0; j < individual.length; j++) {
        individual[j] *= adjustmentFactor;
      }
      
      population.push(individual);
    }
    
    return population;
  }

  /**
   * 🏆 ÉVALUATION DU FITNESS
   */
  private evaluateFitness(
    allocation: number[],
    saturationCurves: { [key: string]: SaturationCurve },
    scenario: string
  ): number {
    let totalROI = 0;
    let totalRevenue = 0;
    let diversificationBonus = 0;
    
    this.channels.forEach((channel, index) => {
      const budget = allocation[index];
      const curve = saturationCurves[channel.id];
      
      if (curve && budget > 0) {
        const roi = this.calculateROIAtSpend(budget, curve.alpha, curve.beta, curve.gamma);
        const revenue = roi * budget;
        
        totalROI += roi;
        totalRevenue += revenue;
      }
    });
    
    // Bonus de diversification
    const activeChannels = allocation.filter(b => b > 1000).length;
    diversificationBonus = activeChannels * 0.1; // 10% bonus par canal actif
    
    // Ajustement selon le scenario
    let scenarioMultiplier = 1;
    switch (scenario) {
      case 'aggressive_growth':
        scenarioMultiplier = totalRevenue > 1000000 ? 1.5 : 1;
        break;
      case 'roi_focused':
        scenarioMultiplier = totalROI > 3 ? 1.3 : 1;
        break;
      case 'diversified':
        scenarioMultiplier = 1 + diversificationBonus;
        break;
    }
    
    return (totalROI + diversificationBonus) * scenarioMultiplier;
  }

  /**
   * 🎯 SÉLECTION DES MEILLEURS INDIVIDUS
   */
  private selection(population: number[][], fitness: number[]): number[][] {
    const selected: number[][] = [];
    const tournamentSize = 5;
    
    for (let i = 0; i < population.length; i++) {
      // Sélection par tournoi
      const tournament: { individual: number[], fitness: number }[] = [];
      
      for (let j = 0; j < tournamentSize; j++) {
        const randomIndex = Math.floor(Math.random() * population.length);
        tournament.push({
          individual: population[randomIndex],
          fitness: fitness[randomIndex]
        });
      }
      
      // Sélection du meilleur du tournoi
      tournament.sort((a, b) => b.fitness - a.fitness);
      selected.push([...tournament[0].individual]);
    }
    
    return selected;
  }

  /**
   * 🧬 CROSSOVER ET MUTATION
   */
  private crossoverAndMutation(
    population: number[][],
    crossoverRate: number,
    mutationRate: number,
    totalBudget: number,
    constraints: { [channelId: string]: { min: number, max: number } }
  ): number[][] {
    const newPopulation: number[][] = [];
    
    for (let i = 0; i < population.length; i += 2) {
      let parent1 = population[i];
      let parent2 = population[i + 1] || population[0];
      
      let child1 = [...parent1];
      let child2 = [...parent2];
      
      // Crossover
      if (Math.random() < crossoverRate) {
        const crossoverPoint = Math.floor(Math.random() * parent1.length);
        
        child1 = [
          ...parent1.slice(0, crossoverPoint),
          ...parent2.slice(crossoverPoint)
        ];
        
        child2 = [
          ...parent2.slice(0, crossoverPoint),
          ...parent1.slice(crossoverPoint)
        ];
      }
      
      // Mutation
      if (Math.random() < mutationRate) {
        child1 = this.mutate(child1, totalBudget, constraints);
      }
      
      if (Math.random() < mutationRate) {
        child2 = this.mutate(child2, totalBudget, constraints);
      }
      
      newPopulation.push(child1);
      if (newPopulation.length < population.length) {
        newPopulation.push(child2);
      }
    }
    
    return newPopulation;
  }

  /**
   * 🎲 MUTATION D'UN INDIVIDU
   */
  private mutate(
    individual: number[],
    totalBudget: number,
    constraints: { [channelId: string]: { min: number, max: number } }
  ): number[] {
    const mutated = [...individual];
    const mutationStrength = 0.1; // 10% de variation
    
    // Sélection de deux canaux aléatoires pour échange de budget
    const index1 = Math.floor(Math.random() * mutated.length);
    const index2 = Math.floor(Math.random() * mutated.length);
    
    if (index1 !== index2) {
      const channel1 = this.channels[index1];
      const channel2 = this.channels[index2];
      
      const maxTransfer = Math.min(
        mutated[index1] * mutationStrength,
        (constraints[channel2.id]?.max || channel2.maxBudget) - mutated[index2]
      );
      
      const transfer = Math.random() * maxTransfer;
      
      // Vérification des contraintes minimales
      if (mutated[index1] - transfer >= (constraints[channel1.id]?.min || channel1.minBudget)) {
        mutated[index1] -= transfer;
        mutated[index2] += transfer;
      }
    }
    
    return mutated;
  }

  /**
   * 📊 UTILITAIRES DE CALCUL
   */
  private getCurrentAllocation(): { [key: string]: number } {
    const allocation: { [key: string]: number } = {};
    this.channels.forEach(channel => {
      allocation[channel.id] = channel.currentBudget;
    });
    return allocation;
  }

  private calculateExpectedROI(
    allocation: { [key: string]: number },
    saturationCurves: { [key: string]: SaturationCurve }
  ): number {
    let totalROI = 0;
    let totalSpend = 0;
    
    Object.keys(allocation).forEach(channelId => {
      const spend = allocation[channelId];
      const curve = saturationCurves[channelId];
      
      if (curve && spend > 0) {
        const roi = this.calculateROIAtSpend(spend, curve.alpha, curve.beta, curve.gamma);
        totalROI += roi * spend;
        totalSpend += spend;
      }
    });
    
    return totalSpend > 0 ? totalROI / totalSpend : 0;
  }

  private calculateExpectedRevenue(
    allocation: { [key: string]: number },
    saturationCurves: { [key: string]: SaturationCurve }
  ): number {
    let totalRevenue = 0;
    
    Object.keys(allocation).forEach(channelId => {
      const spend = allocation[channelId];
      const curve = saturationCurves[channelId];
      
      if (curve && spend > 0) {
        const roi = this.calculateROIAtSpend(spend, curve.alpha, curve.beta, curve.gamma);
        totalRevenue += roi * spend;
      }
    });
    
    return totalRevenue;
  }

  private applyBudgetConstraints(
    totalBudget: number,
    customConstraints: { [channelId: string]: { min: number, max: number } }
  ): { [channelId: string]: { min: number, max: number } } {
    const constraints: { [channelId: string]: { min: number, max: number } } = {};
    
    this.channels.forEach(channel => {
      const custom = customConstraints[channel.id];
      const defaultMin = Math.max(
        channel.minBudget,
        totalBudget * channel.constraints.minBudgetPercentage
      );
      const defaultMax = Math.min(
        channel.maxBudget,
        totalBudget * channel.constraints.maxBudgetPercentage
      );
      
      constraints[channel.id] = {
        min: custom?.min || defaultMin,
        max: custom?.max || defaultMax
      };
    });
    
    return constraints;
  }

  /**
   * 🧪 GEO-EXPERIMENTS AUTOMATISÉS
   */
  async createGeoExperiment(
    name: string,
    testChannel: string,
    budgetLift: number,
    duration: number,
    geoMarkets: string[],
    controlMarkets: string[]
  ): Promise<string> {
    const experiment: GeoExperiment = {
      id: `geo_exp_${Date.now()}`,
      name,
      geoMarkets,
      controlMarkets,
      testChannel,
      budgetLift,
      duration,
      status: 'planned'
    };
    
    this.geoExperiments.push(experiment);
    
    this.emit('geo_experiment_created', {
      experimentId: experiment.id,
      name: experiment.name,
      estimatedLift: this.estimateExperimentLift(experiment)
    });
    
    return experiment.id;
  }

  async runGeoExperiment(experimentId: string): Promise<void> {
    const experiment = this.geoExperiments.find(exp => exp.id === experimentId);
    
    if (!experiment) {
      throw new Error(`Experiment ${experimentId} not found`);
    }
    
    if (experiment.status !== 'planned') {
      throw new Error(`Experiment ${experimentId} is not in planned status`);
    }
    
    // Mise à jour du statut
    experiment.status = 'running';
    
    this.emit('geo_experiment_started', {
      experimentId: experiment.id,
      name: experiment.name,
      duration: experiment.duration
    });
    
    // Simulation de l'expérimentation (en production, cela serait connecté aux APIs des plateformes)
    setTimeout(() => {
      this.completeGeoExperiment(experimentId);
    }, experiment.duration * 24 * 60 * 60 * 1000); // duration en jours
  }

  private completeGeoExperiment(experimentId: string): void {
    const experiment = this.geoExperiments.find(exp => exp.id === experimentId);
    
    if (!experiment) return;
    
    // Simulation des résultats (en production, analyse des données réelles)
    const results: GeoExperimentResult = {
      incrementalConversions: Math.floor(Math.random() * 1000) + 100,
      incrementalRevenue: Math.floor(Math.random() * 50000) + 5000,
      statisticalSignificance: 0.95 + Math.random() * 0.04,
      pValue: Math.random() * 0.05,
      confidenceInterval: [0.8, 1.2],
      causalImpact: 0.15 + Math.random() * 0.3
    };
    
    experiment.results = results;
    experiment.status = 'completed';
    
    this.emit('geo_experiment_completed', {
      experimentId: experiment.id,
      results: results,
      isSignificant: results.pValue < 0.05
    });
  }

  private estimateExperimentLift(experiment: GeoExperiment): number {
    // Estimation basée sur les données historiques et les courbes de saturation
    const channel = this.channels.find(c => c.id === experiment.testChannel);
    
    if (!channel) return 0;
    
    const currentROI = this.calculateROIAtSpend(
      channel.currentBudget,
      channel.constraints.saturationPoint * 0.5,
      channel.constraints.saturationPoint,
      0.7
    );
    
    const liftedBudget = channel.currentBudget * (1 + experiment.budgetLift);
    const liftedROI = this.calculateROIAtSpend(
      liftedBudget,
      channel.constraints.saturationPoint * 0.5,
      channel.constraints.saturationPoint,
      0.7
    );
    
    return (liftedROI - currentROI) / currentROI;
  }

  /**
   * 📊 SCENARIO PLANNING
   */
  async generateScenarios(
    totalBudgets: number[],
    scenarios: string[] = ['conservative', 'balanced', 'aggressive']
  ): Promise<{ [scenario: string]: BudgetOptimization[] }> {
    const results: { [scenario: string]: BudgetOptimization[] } = {};
    
    for (const scenario of scenarios) {
      results[scenario] = [];
      
      for (const budget of totalBudgets) {
        const optimization = await this.optimizeBudgetAllocation(budget, {}, scenario);
        results[scenario].push(optimization);
      }
    }
    
    this.emit('scenario_planning_completed', {
      scenarios: Object.keys(results),
      budgetLevels: totalBudgets.length,
      totalOptimizations: scenarios.length * totalBudgets.length
    });
    
    return results;
  }

  /**
   * 📈 MÉTRIQUES ET MONITORING
   */
  getModelMetrics(): {
    accuracy: number;
    channels: number;
    dataPoints: number;
    lastTraining: Date | null;
    experiments: number;
  } {
    return {
      accuracy: this.modelAccuracy,
      channels: this.channels.length,
      dataPoints: this.historicalData.length,
      lastTraining: this.model ? new Date() : null,
      experiments: this.geoExperiments.length
    };
  }

  /**
   * 💾 SAUVEGARDE ET CHARGEMENT DU MODÈLE
   */
  async saveModel(path: string): Promise<void> {
    if (!this.model) {
      throw new Error('No model to save');
    }
    
    await this.model.save(`file://${path}`);
    
    this.emit('model_saved', { path });
  }

  async loadModel(path: string): Promise<void> {
    this.model = await tf.loadLayersModel(`file://${path}`);
    this.emit('model_loaded', { path });
  }

  /**
   * 🔄 AJOUT DE DONNÉES D'ATTRIBUTION
   */
  addAttributionData(data: AttributionData[]): void {
    this.historicalData.push(...data);
    
    // Nettoyage des anciennes données (garde les 2 dernières années)
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    this.historicalData = this.historicalData.filter(
      d => d.timestamp >= twoYearsAgo
    );
    
    this.emit('data_updated', {
      totalDataPoints: this.historicalData.length,
      newDataPoints: data.length
    });
  }
}

/**
 * 🚀 EXPORT DU MODULE
 */
export default MarketingMixModeler;

/**
 * 🎯 EXEMPLE D'UTILISATION
 */
export const createMMModeler = (): MarketingMixModeler => {
  return new MarketingMixModeler();
};

// Types exports
export type {
  MarketingChannel,
  AttributionData,
  MMModelResult,
  BudgetOptimization,
  GeoExperiment,
  SaturationCurve
};