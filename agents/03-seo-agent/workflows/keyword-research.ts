/**
 * Keyword Research Automatis� - Phase 2 SEO Agent
 * Int�gration APIs SEMrush/Ahrefs (simulation) + Analyse concurrence
 * Suggestions mots-cl�s longue tra�ne + Difficulty score
 */

import axios from 'axios';

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number; // 0-100
  cpc: number;
  competition: 'low' | 'medium' | 'high';
  trend: number[]; // 12 derniers mois
  relatedKeywords: string[];
  questions: string[];
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
}

export interface CompetitorAnalysis {
  domain: string;
  organicKeywords: KeywordData[];
  paidKeywords: KeywordData[];
  topPages: {
    url: string;
    keywords: string[];
    traffic: number;
    position: number;
  }[];
  gapAnalysis: {
    missingKeywords: KeywordData[];
    weakerPositions: KeywordData[];
    opportunities: KeywordData[];
  };
}

export interface KeywordResearchResult {
  seedKeywords: KeywordData[];
  longTailKeywords: KeywordData[];
  localKeywords: KeywordData[];
  competitorAnalysis: CompetitorAnalysis[];
  seasonalTrends: Record<string, number[]>;
  contentGaps: {
    topic: string;
    keywords: KeywordData[];
    estimatedTraffic: number;
  }[];
  recommendations: {
    quickWins: KeywordData[];
    longTermTargets: KeywordData[];
    contentIdeas: string[];
  };
}

export interface ResearchConfig {
  industry: string;
  geoLocation?: string;
  language: string;
  competitors: string[];
  seedKeywords: string[];
  businessType: 'local' | 'national' | 'international';
  targetAudience: string[];
}

export class KeywordResearchEngine {
  private semrushApiKey: string;
  private ahrefsApiKey: string;
  private googleTrendsEnabled: boolean;

  constructor(config: {
    semrushApiKey?: string;
    ahrefsApiKey?: string;
    googleTrendsEnabled?: boolean;
  }) {
    this.semrushApiKey = config.semrushApiKey || 'demo_key';
    this.ahrefsApiKey = config.ahrefsApiKey || 'demo_key';
    this.googleTrendsEnabled = config.googleTrendsEnabled || false;
  }

  /**
   * Recherche compl�te de mots-cl�s
   */
  async performCompleteResearch(config: ResearchConfig): Promise<KeywordResearchResult> {
    console.log('= D�marrage recherche de mots-cl�s compl�te...');

    try {
      // �tape 1: Expansion des mots-cl�s seed
      const seedKeywords = await this.expandSeedKeywords(config.seedKeywords, config);

      // �tape 2: G�n�ration mots-cl�s longue tra�ne
      const longTailKeywords = await this.generateLongTailKeywords(seedKeywords, config);

      // �tape 3: Recherche locale (si applicable)
      const localKeywords = config.businessType === 'local' 
        ? await this.generateLocalKeywords(seedKeywords, config.geoLocation!)
        : [];

      // �tape 4: Analyse des concurrents
      const competitorAnalysis = await this.analyzeCompetitors(config.competitors, config);

      // �tape 5: Analyse des tendances saisonni�res
      const seasonalTrends = await this.analyzeSeasonal(seedKeywords);

      // �tape 6: Identification des gaps de contenu
      const contentGaps = await this.identifyContentGaps(seedKeywords, competitorAnalysis);

      // �tape 7: G�n�ration des recommandations
      const recommendations = this.generateRecommendations(
        seedKeywords,
        longTailKeywords,
        competitorAnalysis
      );

      return {
        seedKeywords,
        longTailKeywords,
        localKeywords,
        competitorAnalysis,
        seasonalTrends,
        contentGaps,
        recommendations
      };

    } catch (error) {
      console.error('Erreur recherche mots-cl�s:', error);
      throw new Error(`�chec recherche: ${error.message}`);
    }
  }

  /**
   * Expansion des mots-cl�s seed avec APIs externes
   */
  private async expandSeedKeywords(
    seedKeywords: string[],
    config: ResearchConfig
  ): Promise<KeywordData[]> {
    const expandedKeywords: KeywordData[] = [];

    for (const keyword of seedKeywords) {
      try {
        // Simulation API SEMrush
        const semrushData = await this.fetchSEMrushData(keyword, config);
        
        // Simulation API Ahrefs
        const ahrefsData = await this.fetchAhrefsData(keyword, config);
        
        // Fusion des donn�es
        const keywordData: KeywordData = {
          keyword,
          searchVolume: semrushData.volume || ahrefsData.volume || this.estimateVolume(keyword),
          difficulty: this.calculateDifficulty(semrushData, ahrefsData),
          cpc: semrushData.cpc || this.estimateCPC(keyword, config.industry),
          competition: this.determineCompetition(semrushData.competition),
          trend: this.generateTrendData(),
          relatedKeywords: [...semrushData.related, ...ahrefsData.related],
          questions: this.generateQuestions(keyword),
          intent: this.determineIntent(keyword)
        };

        expandedKeywords.push(keywordData);

      } catch (error) {
        console.warn(`Erreur expansion mot-cl� ${keyword}:`, error);
        // Fallback avec donn�es estim�es
        expandedKeywords.push(this.createFallbackKeywordData(keyword, config));
      }
    }

    return expandedKeywords;
  }

  /**
   * G�n�ration de mots-cl�s longue tra�ne
   */
  private async generateLongTailKeywords(
    seedKeywords: KeywordData[],
    config: ResearchConfig
  ): Promise<KeywordData[]> {
    const longTailKeywords: KeywordData[] = [];
    
    // Modifiers courrants par industrie
    const modifiers = this.getIndustryModifiers(config.industry);
    
    // Questions types
    const questionWords = ['comment', 'pourquoi', 'quand', 'o�', 'que', 'qui', 'combien'];
    
    // Intentions commerciales
    const commercialModifiers = ['pas cher', 'gratuit', 'meilleur', 'prix', 'acheter', 'r�servation'];

    for (const seedKeyword of seedKeywords) {
      // Combinaisons avec modifiers
      for (const modifier of modifiers) {
        const longTailVariations = [
          `${seedKeyword.keyword} ${modifier}`,
          `${modifier} ${seedKeyword.keyword}`,
          `${seedKeyword.keyword} ${modifier} ${config.geoLocation || ''}`.trim()
        ];

        for (const variation of longTailVariations) {
          if (variation.length > 10) { // Filtrer les variations trop courtes
            longTailKeywords.push({
              keyword: variation,
              searchVolume: Math.floor(seedKeyword.searchVolume * 0.1), // Volume estim� plus faible
              difficulty: Math.max(seedKeyword.difficulty - 20, 10), // Difficult� r�duite
              cpc: seedKeyword.cpc * 0.8,
              competition: 'low',
              trend: this.generateTrendData(),
              relatedKeywords: [],
              questions: [],
              intent: 'informational'
            });
          }
        }
      }

      // Questions
      for (const question of questionWords) {
        const questionKeyword = `${question} ${seedKeyword.keyword}`;
        longTailKeywords.push({
          keyword: questionKeyword,
          searchVolume: Math.floor(seedKeyword.searchVolume * 0.05),
          difficulty: Math.max(seedKeyword.difficulty - 30, 5),
          cpc: 0.1,
          competition: 'low',
          trend: this.generateTrendData(),
          relatedKeywords: [],
          questions: [],
          intent: 'informational'
        });
      }

      // Intentions commerciales
      for (const commercial of commercialModifiers) {
        const commercialKeyword = `${seedKeyword.keyword} ${commercial}`;
        longTailKeywords.push({
          keyword: commercialKeyword,
          searchVolume: Math.floor(seedKeyword.searchVolume * 0.15),
          difficulty: seedKeyword.difficulty,
          cpc: seedKeyword.cpc * 1.2,
          competition: 'medium',
          trend: this.generateTrendData(),
          relatedKeywords: [],
          questions: [],
          intent: 'commercial'
        });
      }
    }

    // Filtrer les doublons et trier par potentiel
    return this.filterAndRankKeywords(longTailKeywords);
  }

  /**
   * G�n�ration de mots-cl�s locaux
   */
  private async generateLocalKeywords(
    seedKeywords: KeywordData[],
    location: string
  ): Promise<KeywordData[]> {
    const localKeywords: KeywordData[] = [];
    const locationVariations = this.getLocationVariations(location);

    for (const seedKeyword of seedKeywords) {
      for (const locationVar of locationVariations) {
        const localVariations = [
          `${seedKeyword.keyword} ${locationVar}`,
          `${locationVar} ${seedKeyword.keyword}`,
          `${seedKeyword.keyword} pr�s de ${locationVar}`,
          `${seedKeyword.keyword} � ${locationVar}`
        ];

        for (const variation of localVariations) {
          localKeywords.push({
            keyword: variation,
            searchVolume: Math.floor(seedKeyword.searchVolume * 0.2),
            difficulty: Math.max(seedKeyword.difficulty - 15, 5),
            cpc: seedKeyword.cpc * 1.1,
            competition: 'low',
            trend: this.generateTrendData(),
            relatedKeywords: [],
            questions: [],
            intent: 'navigational'
          });
        }
      }
    }

    return this.filterAndRankKeywords(localKeywords);
  }

  /**
   * Analyse des concurrents
   */
  private async analyzeCompetitors(
    competitors: string[],
    config: ResearchConfig
  ): Promise<CompetitorAnalysis[]> {
    const competitorAnalyses: CompetitorAnalysis[] = [];

    for (const competitor of competitors) {
      try {
        const analysis: CompetitorAnalysis = {
          domain: competitor,
          organicKeywords: await this.getCompetitorOrganicKeywords(competitor),
          paidKeywords: await this.getCompetitorPaidKeywords(competitor),
          topPages: await this.getCompetitorTopPages(competitor),
          gapAnalysis: {
            missingKeywords: [],
            weakerPositions: [],
            opportunities: []
          }
        };

        // Analyse des gaps
        analysis.gapAnalysis = await this.performGapAnalysis(analysis, config);

        competitorAnalyses.push(analysis);

      } catch (error) {
        console.warn(`Erreur analyse concurrent ${competitor}:`, error);
      }
    }

    return competitorAnalyses;
  }

  /**
   * Analyse des tendances saisonni�res
   */
  private async analyzeSeasonal(keywords: KeywordData[]): Promise<Record<string, number[]>> {
    const seasonalData: Record<string, number[]> = {};

    for (const keyword of keywords) {
      // Simulation des donn�es de tendances (12 mois)
      seasonalData[keyword.keyword] = this.generateSeasonalTrend(keyword.keyword);
    }

    return seasonalData;
  }

  /**
   * Identification des gaps de contenu
   */
  private async identifyContentGaps(
    keywords: KeywordData[],
    competitorAnalyses: CompetitorAnalysis[]
  ): Promise<any[]> {
    const contentGaps = [];

    // Analyse des mots-cl�s non couverts par les concurrents
    const competitorKeywords = competitorAnalyses.flatMap(ca => 
      ca.organicKeywords.map(k => k.keyword)
    );

    const uncoveredKeywords = keywords.filter(k => 
      !competitorKeywords.includes(k.keyword) && k.searchVolume > 100
    );

    // Regroupement par th�me
    const themeGroups = this.groupKeywordsByTheme(uncoveredKeywords);

    for (const [theme, themeKeywords] of Object.entries(themeGroups)) {
      const estimatedTraffic = themeKeywords.reduce((sum, k) => sum + k.searchVolume, 0);
      
      contentGaps.push({
        topic: theme,
        keywords: themeKeywords,
        estimatedTraffic
      });
    }

    return contentGaps.sort((a, b) => b.estimatedTraffic - a.estimatedTraffic);
  }

  /**
   * G�n�ration des recommandations
   */
  private generateRecommendations(
    seedKeywords: KeywordData[],
    longTailKeywords: KeywordData[],
    competitorAnalyses: CompetitorAnalysis[]
  ): any {
    // Quick wins: mots-cl�s � faible difficult�, volume d�cent
    const quickWins = [...seedKeywords, ...longTailKeywords]
      .filter(k => k.difficulty < 30 && k.searchVolume > 50)
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 10);

    // Long term targets: mots-cl�s � forte valeur mais haute difficult�
    const longTermTargets = [...seedKeywords, ...longTailKeywords]
      .filter(k => k.difficulty > 60 && k.searchVolume > 500)
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 5);

    // Id�es de contenu bas�es sur les questions
    const contentIdeas = longTailKeywords
      .filter(k => k.intent === 'informational')
      .map(k => `Article: "${k.keyword}" - Volume: ${k.searchVolume}`)
      .slice(0, 20);

    return {
      quickWins,
      longTermTargets,
      contentIdeas
    };
  }

  // M�thodes utilitaires et simulations API

  /**
   * Simulation API SEMrush
   */
  private async fetchSEMrushData(keyword: string, config: ResearchConfig): Promise<any> {
    // Simulation - En r�alit�, appel API SEMrush
    return {
      volume: this.estimateVolume(keyword),
      cpc: this.estimateCPC(keyword, config.industry),
      competition: Math.random(),
      related: this.generateRelatedKeywords(keyword)
    };
  }

  /**
   * Simulation API Ahrefs
   */
  private async fetchAhrefsData(keyword: string, config: ResearchConfig): Promise<any> {
    // Simulation - En r�alit�, appel API Ahrefs
    return {
      volume: this.estimateVolume(keyword) * 0.9, // L�g�re variation
      difficulty: Math.floor(Math.random() * 100),
      related: this.generateRelatedKeywords(keyword)
    };
  }

  /**
   * Estimation du volume de recherche
   */
  private estimateVolume(keyword: string): number {
    const baseVolume = 1000;
    const wordCount = keyword.split(' ').length;
    const multiplier = Math.max(2 - (wordCount * 0.3), 0.1);
    return Math.floor(baseVolume * multiplier * (0.5 + Math.random()));
  }

  /**
   * Estimation du CPC
   */
  private estimateCPC(keyword: string, industry: string): number {
    const industryMultipliers: Record<string, number> = {
      restaurant: 1.2,
      ecommerce: 0.8,
      saas: 2.5,
      finance: 4.0,
      healthcare: 3.0,
      realestate: 2.8
    };

    const basePrice = 0.5;
    const multiplier = industryMultipliers[industry] || 1.0;
    return parseFloat((basePrice * multiplier * (0.8 + Math.random() * 0.4)).toFixed(2));
  }

  /**
   * Calcul de la difficult�
   */
  private calculateDifficulty(semrushData: any, ahrefsData: any): number {
    const semrushDiff = (semrushData.competition || 0.5) * 100;
    const ahrefsDiff = ahrefsData.difficulty || 50;
    return Math.floor((semrushDiff + ahrefsDiff) / 2);
  }

  /**
   * D�termination du niveau de concurrence
   */
  private determineCompetition(competition: number): 'low' | 'medium' | 'high' {
    if (competition < 0.3) return 'low';
    if (competition < 0.7) return 'medium';
    return 'high';
  }

  /**
   * G�n�ration de donn�es de tendance
   */
  private generateTrendData(): number[] {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  }

  /**
   * G�n�ration de mots-cl�s related
   */
  private generateRelatedKeywords(keyword: string): string[] {
    const bases = keyword.split(' ');
    const related = [];
    
    for (let i = 0; i < 3; i++) {
      const variation = bases.map(word => 
        Math.random() > 0.5 ? word : word + 's'
      ).join(' ');
      related.push(variation);
    }
    
    return related;
  }

  /**
   * G�n�ration de questions
   */
  private generateQuestions(keyword: string): string[] {
    const questions = [
      `Comment choisir ${keyword}?`,
      `Pourquoi ${keyword} est important?`,
      `O� trouver ${keyword}?`,
      `Combien co�te ${keyword}?`
    ];
    return questions.slice(0, 2);
  }

  /**
   * D�termination de l'intention
   */
  private determineIntent(keyword: string): KeywordData['intent'] {
    const commercial = ['acheter', 'prix', 'pas cher', 'gratuit', 'offre'];
    const transactional = ['r�server', 'commander', 'livraison', 'contact'];
    const informational = ['comment', 'pourquoi', 'guide', 'conseil'];
    
    const lowerKeyword = keyword.toLowerCase();
    
    if (commercial.some(word => lowerKeyword.includes(word))) return 'commercial';
    if (transactional.some(word => lowerKeyword.includes(word))) return 'transactional';
    if (informational.some(word => lowerKeyword.includes(word))) return 'informational';
    
    return 'navigational';
  }

  /**
   * Cr�ation de donn�es fallback
   */
  private createFallbackKeywordData(keyword: string, config: ResearchConfig): KeywordData {
    return {
      keyword,
      searchVolume: this.estimateVolume(keyword),
      difficulty: Math.floor(Math.random() * 100),
      cpc: this.estimateCPC(keyword, config.industry),
      competition: 'medium',
      trend: this.generateTrendData(),
      relatedKeywords: this.generateRelatedKeywords(keyword),
      questions: this.generateQuestions(keyword),
      intent: this.determineIntent(keyword)
    };
  }

  /**
   * Modifiers par industrie
   */
  private getIndustryModifiers(industry: string): string[] {
    const modifiers: Record<string, string[]> = {
      restaurant: ['menu', 'prix', 'horaires', 'r�servation', 'avis', 'sp�cialit�s', 'carte', 'ouvert'],
      ecommerce: ['prix', 'promo', 'soldes', 'livraison', 'gratuit', 'pas cher', 'avis', 'test'],
      saas: ['gratuit', 'prix', 'demo', 'essai', 'comparaison', 'alternative', 'fonctionnalit�s'],
      healthcare: ['sympt�mes', 'traitement', 'm�decin', 'consultation', 'urgence', 'prevention'],
      finance: ['taux', 'comparaison', 'simulation', 'gratuit', 'en ligne', 'rapide'],
      realestate: ['prix', 'vente', 'location', 'estimation', 'quartier', 'visite', 'annonce']
    };

    return modifiers[industry] || ['prix', 'gratuit', 'meilleur', 'comparaison'];
  }

  /**
   * Variations de localisation
   */
  private getLocationVariations(location: string): string[] {
    // Exemple pour Paris
    if (location.toLowerCase().includes('paris')) {
      return [
        'Paris', '75', '�le-de-France', '1er arrondissement', '2�me arrondissement',
        'centre Paris', 'Paris centre', 'm�tro', 'RER'
      ];
    }
    
    return [location, `${location} centre`, `r�gion ${location}`];
  }

  /**
   * G�n�ration de tendance saisonni�re
   */
  private generateSeasonalTrend(keyword: string): number[] {
    // Simulation de saisonnalit� bas�e sur le mot-cl�
    const base = 50;
    const seasonal = [];
    
    for (let i = 0; i < 12; i++) {
      let modifier = 1;
      
      // Restaurants: pics �t� et f�tes
      if (keyword.includes('restaurant')) {
        if ([5, 6, 7, 11].includes(i)) modifier = 1.3;
        if ([1, 2].includes(i)) modifier = 0.8;
      }
      
      seasonal.push(Math.floor(base * modifier * (0.8 + Math.random() * 0.4)));
    }
    
    return seasonal;
  }

  /**
   * Filtrage et classement des mots-cl�s
   */
  private filterAndRankKeywords(keywords: KeywordData[]): KeywordData[] {
    // Suppression des doublons
    const unique = keywords.filter((keyword, index, self) => 
      index === self.findIndex(k => k.keyword === keyword.keyword)
    );

    // Calcul du score de potentiel
    const scored = unique.map(keyword => ({
      ...keyword,
      potentialScore: this.calculatePotentialScore(keyword)
    }));

    // Tri par score de potentiel
    return scored
      .sort((a, b) => b.potentialScore - a.potentialScore)
      .slice(0, 50); // Limite � 50 mots-cl�s
  }

  /**
   * Calcul du score de potentiel
   */
  private calculatePotentialScore(keyword: KeywordData): number {
    const volumeScore = Math.min(keyword.searchVolume / 1000, 10);
    const difficultyScore = (100 - keyword.difficulty) / 10;
    const cpcScore = Math.min(keyword.cpc * 2, 10);
    
    return volumeScore + difficultyScore + cpcScore;
  }

  /**
   * Regroupement par th�me
   */
  private groupKeywordsByTheme(keywords: KeywordData[]): Record<string, KeywordData[]> {
    const themes: Record<string, KeywordData[]> = {};
    
    for (const keyword of keywords) {
      const theme = this.extractTheme(keyword.keyword);
      if (!themes[theme]) themes[theme] = [];
      themes[theme].push(keyword);
    }
    
    return themes;
  }

  /**
   * Extraction du th�me principal
   */
  private extractTheme(keyword: string): string {
    const words = keyword.toLowerCase().split(' ');
    const themeWords = words.filter(word => 
      word.length > 3 && !['comment', 'pourquoi', 'meilleur'].includes(word)
    );
    
    return themeWords[0] || 'g�n�ral';
  }

  /**
   * Analyse des mots-cl�s organiques des concurrents (simulation)
   */
  private async getCompetitorOrganicKeywords(domain: string): Promise<KeywordData[]> {
    // Simulation - remplacer par vraie API
    const mockKeywords: KeywordData[] = [];
    
    for (let i = 0; i < 10; i++) {
      mockKeywords.push({
        keyword: `keyword concurrent ${i}`,
        searchVolume: Math.floor(Math.random() * 1000),
        difficulty: Math.floor(Math.random() * 100),
        cpc: parseFloat((Math.random() * 5).toFixed(2)),
        competition: 'medium',
        trend: this.generateTrendData(),
        relatedKeywords: [],
        questions: [],
        intent: 'commercial'
      });
    }
    
    return mockKeywords;
  }

  /**
   * Analyse des mots-cl�s payants des concurrents (simulation)
   */
  private async getCompetitorPaidKeywords(domain: string): Promise<KeywordData[]> {
    // Simulation similaire aux organiques
    return this.getCompetitorOrganicKeywords(domain);
  }

  /**
   * Pages principales des concurrents (simulation)
   */
  private async getCompetitorTopPages(domain: string): Promise<any[]> {
    return [
      {
        url: `https://${domain}/page1`,
        keywords: ['keyword1', 'keyword2'],
        traffic: Math.floor(Math.random() * 10000),
        position: Math.floor(Math.random() * 10) + 1
      }
    ];
  }

  /**
   * Analyse des gaps concurrentiels
   */
  private async performGapAnalysis(
    competitor: CompetitorAnalysis,
    config: ResearchConfig
  ): Promise<any> {
    return {
      missingKeywords: competitor.organicKeywords.slice(0, 5),
      weakerPositions: competitor.organicKeywords.slice(5, 10),
      opportunities: competitor.organicKeywords.slice(10, 15)
    };
  }
}

// Configuration par d�faut pour restaurant
export const defaultResearchConfig: ResearchConfig = {
  industry: 'restaurant',
  geoLocation: 'Paris, France',
  language: 'fr',
  competitors: ['restaurant-concurrent1.fr', 'restaurant-concurrent2.fr'],
  seedKeywords: ['restaurant gastronomique', 'cuisine fran�aise', 'chef �toil�'],
  businessType: 'local',
  targetAudience: ['food lovers', 'couples', 'business diners']
};

// Export instance configur�e
export default new KeywordResearchEngine({
  semrushApiKey: process.env.SEMRUSH_API_KEY,
  ahrefsApiKey: process.env.AHREFS_API_KEY,
  googleTrendsEnabled: true
});