/**
 * SEO Monitoring Avancé - Phase 2 SEO Agent
 * Tracking positions temps réel + Alertes changements ranking
 * Audit technique automatisé + Recommandations priorisées
 */

import axios from 'axios';
import { KeywordData } from './keyword-research';

export interface RankingData {
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  positionChange: number;
  url: string;
  searchVolume: number;
  estimatedTraffic: number;
  lastChecked: Date;
  history: {
    date: Date;
    position: number;
    traffic: number;
  }[];
  competitors: {
    domain: string;
    position: number;
    title: string;
    url: string;
  }[];
}

export interface TechnicalAuditResult {
  score: number; // 0-100
  criticalIssues: TechnicalIssue[];
  warnings: TechnicalIssue[];
  recommendations: TechnicalIssue[];
  categories: {
    crawlability: { score: number; issues: TechnicalIssue[] };
    indexability: { score: number; issues: TechnicalIssue[] };
    performance: { score: number; issues: TechnicalIssue[] };
    mobileUsability: { score: number; issues: TechnicalIssue[] };
    structuredData: { score: number; issues: TechnicalIssue[] };
    security: { score: number; issues: TechnicalIssue[] };
  };
  lastAudit: Date;
  nextAudit: Date;
}

export interface TechnicalIssue {
  id: string;
  type: 'critical' | 'warning' | 'recommendation';
  category: 'crawlability' | 'indexability' | 'performance' | 'mobile' | 'structured_data' | 'security';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  priority: number; // 1-10
  affectedPages: string[];
  recommendation: string;
  resources: string[];
  estimatedFixTime: number; // en heures
}

export interface MonitoringAlert {
  id: string;
  type: 'ranking_drop' | 'ranking_gain' | 'technical_issue' | 'competitor_change' | 'traffic_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  trigger: {
    keyword?: string;
    threshold: number;
    actual: number;
  };
  timestamp: Date;
  acknowledged: boolean;
  resolved: boolean;
  actions: string[];
}

export interface MonitoringConfig {
  domain: string;
  trackedKeywords: string[];
  competitors: string[];
  alertThresholds: {
    positionDrop: number;
    trafficDrop: number; // pourcentage
    technicalScore: number;
  };
  auditFrequency: 'daily' | 'weekly' | 'monthly';
  reportRecipients: string[];
  integrations: {
    googleSearchConsole: boolean;
    googleAnalytics: boolean;
    semrush: boolean;
    ahrefs: boolean;
  };
}

export interface SEODashboard {
  overview: {
    totalKeywords: number;
    averagePosition: number;
    totalTraffic: number;
    visibilityScore: number;
    technicalScore: number;
  };
  trends: {
    positionTrend: number[]; // 30 derniers jours
    trafficTrend: number[];
    visibilityTrend: number[];
  };
  topMovers: {
    gainers: RankingData[];
    losers: RankingData[];
  };
  alerts: MonitoringAlert[];
  nextActions: {
    priority: string;
    action: string;
    estimatedImpact: string;
    effort: string;
  }[];
}

export class SEOMonitoringEngine {
  private config: MonitoringConfig;
  private rankingHistory: Map<string, RankingData>;
  private technicalAudits: TechnicalAuditResult[];
  private alerts: MonitoringAlert[];
  private integrations: Map<string, any>;

  constructor(config: MonitoringConfig) {
    this.config = config;
    this.rankingHistory = new Map();
    this.technicalAudits = [];
    this.alerts = [];
    this.integrations = new Map();
    this.initializeIntegrations();
  }

  /**
   * Surveillance complète en temps réel
   */
  async startRealTimeMonitoring(): Promise<void> {
    console.log('🚀 Démarrage du monitoring SEO temps réel...');

    // Surveillance des positions toutes les heures
    setInterval(async () => {
      await this.checkRankings();
    }, 60 * 60 * 1000); // 1 heure

    // Audit technique quotidien
    setInterval(async () => {
      await this.performTechnicalAudit();
    }, 24 * 60 * 60 * 1000); // 24 heures

    // Analyse des concurrents 2 fois par jour
    setInterval(async () => {
      await this.analyzeCompetitors();
    }, 12 * 60 * 60 * 1000); // 12 heures

    // Génération de rapports hebdomadaires
    setInterval(async () => {
      await this.generateWeeklyReport();
    }, 7 * 24 * 60 * 60 * 1000); // 7 jours

    console.log('✅ Monitoring SEO actif');
  }

  /**
   * Vérification des positions pour tous les mots-clés
   */
  async checkRankings(): Promise<RankingData[]> {
    const rankings: RankingData[] = [];

    for (const keyword of this.config.trackedKeywords) {
      try {
        const rankingData = await this.checkKeywordRanking(keyword);
        rankings.push(rankingData);

        // Vérification des alertes
        await this.checkRankingAlerts(rankingData);

        // Mise à jour de l'historique
        this.updateRankingHistory(rankingData);

      } catch (error) {
        console.error(`Erreur vérification ranking ${keyword}:`, error);
      }
    }

    return rankings;
  }

  /**
   * Vérification de position d'un mot-clé spécifique
   */
  private async checkKeywordRanking(keyword: string): Promise<RankingData> {
    // Simulation d'API de tracking (SEMrush, Ahrefs, etc.)
    const position = await this.fetchKeywordPosition(keyword);
    const previousRanking = this.rankingHistory.get(keyword);
    const previousPosition = previousRanking?.currentPosition || 0;

    const competitors = await this.getCompetitorPositions(keyword);
    const estimatedTraffic = this.calculateEstimatedTraffic(position, 1000); // Volume simulé

    const rankingData: RankingData = {
      keyword,
      currentPosition: position,
      previousPosition,
      positionChange: previousPosition > 0 ? previousPosition - position : 0,
      url: await this.getRankingURL(keyword),
      searchVolume: 1000, // À récupérer depuis l'API
      estimatedTraffic,
      lastChecked: new Date(),
      history: previousRanking?.history || [],
      competitors
    };

    // Ajout à l'historique
    rankingData.history.push({
      date: new Date(),
      position,
      traffic: estimatedTraffic
    });

    // Limite l'historique à 90 jours
    rankingData.history = rankingData.history.slice(-90);

    return rankingData;
  }

  /**
   * Audit technique automatisé
   */
  async performTechnicalAudit(): Promise<TechnicalAuditResult> {
    console.log('🔍 Démarrage audit technique...');

    const auditResult: TechnicalAuditResult = {
      score: 0,
      criticalIssues: [],
      warnings: [],
      recommendations: [],
      categories: {
        crawlability: { score: 0, issues: [] },
        indexability: { score: 0, issues: [] },
        performance: { score: 0, issues: [] },
        mobileUsability: { score: 0, issues: [] },
        structuredData: { score: 0, issues: [] },
        security: { score: 0, issues: [] }
      },
      lastAudit: new Date(),
      nextAudit: new Date(Date.now() + 24 * 60 * 60 * 1000)
    };

    // 1. Audit de crawlabilité
    auditResult.categories.crawlability = await this.auditCrawlability();

    // 2. Audit d'indexabilité
    auditResult.categories.indexability = await this.auditIndexability();

    // 3. Audit de performance
    auditResult.categories.performance = await this.auditPerformance();

    // 4. Audit mobile
    auditResult.categories.mobileUsability = await this.auditMobileUsability();

    // 5. Audit données structurées
    auditResult.categories.structuredData = await this.auditStructuredData();

    // 6. Audit sécurité
    auditResult.categories.security = await this.auditSecurity();

    // Calcul du score global
    const categoryScores = Object.values(auditResult.categories).map(cat => cat.score);
    auditResult.score = Math.round(categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length);

    // Classification des issues
    const allIssues = Object.values(auditResult.categories).flatMap(cat => cat.issues);
    auditResult.criticalIssues = allIssues.filter(issue => issue.type === 'critical');
    auditResult.warnings = allIssues.filter(issue => issue.type === 'warning');
    auditResult.recommendations = allIssues.filter(issue => issue.type === 'recommendation');

    // Génération d'alertes pour les issues critiques
    await this.generateTechnicalAlerts(auditResult.criticalIssues);

    // Sauvegarde de l'audit
    this.technicalAudits.push(auditResult);

    console.log(`✅ Audit terminé - Score: ${auditResult.score}/100`);
    return auditResult;
  }

  /**
   * Génération du dashboard SEO
   */
  async generateDashboard(): Promise<SEODashboard> {
    const rankings = Array.from(this.rankingHistory.values());
    const lastAudit = this.technicalAudits[this.technicalAudits.length - 1];

    const dashboard: SEODashboard = {
      overview: {
        totalKeywords: rankings.length,
        averagePosition: this.calculateAveragePosition(rankings),
        totalTraffic: rankings.reduce((sum, r) => sum + r.estimatedTraffic, 0),
        visibilityScore: this.calculateVisibilityScore(rankings),
        technicalScore: lastAudit?.score || 0
      },
      trends: {
        positionTrend: this.calculatePositionTrend(rankings),
        trafficTrend: this.calculateTrafficTrend(rankings),
        visibilityTrend: this.calculateVisibilityTrend(rankings)
      },
      topMovers: {
        gainers: rankings.filter(r => r.positionChange > 0).sort((a, b) => b.positionChange - a.positionChange).slice(0, 5),
        losers: rankings.filter(r => r.positionChange < 0).sort((a, b) => a.positionChange - b.positionChange).slice(0, 5)
      },
      alerts: this.alerts.filter(alert => !alert.resolved).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
      nextActions: await this.generateNextActions(lastAudit, rankings)
    };

    return dashboard;
  }

  /**
   * Génération des actions prioritaires
   */
  private async generateNextActions(
    technicalAudit: TechnicalAuditResult,
    rankings: RankingData[]
  ): Promise<any[]> {
    const actions = [];

    // Actions basées sur l'audit technique
    if (technicalAudit) {
      const criticalIssues = technicalAudit.criticalIssues
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 3);

      for (const issue of criticalIssues) {
        actions.push({
          priority: 'Critique',
          action: issue.title,
          estimatedImpact: issue.impact,
          effort: issue.effort
        });
      }
    }

    // Actions basées sur les rankings
    const opportunityKeywords = rankings
      .filter(r => r.currentPosition >= 4 && r.currentPosition <= 10)
      .sort((a, b) => b.searchVolume - a.searchVolume)
      .slice(0, 3);

    for (const keyword of opportunityKeywords) {
      actions.push({
        priority: 'Haute',
        action: `Optimiser "${keyword.keyword}" (position ${keyword.currentPosition})`,
        estimatedImpact: 'High',
        effort: 'Medium'
      });
    }

    return actions.slice(0, 10);
  }

  /**
   * Vérification des alertes de ranking
   */
  private async checkRankingAlerts(ranking: RankingData): Promise<void> {
    const positionDrop = ranking.positionChange;

    // Alerte chute de position
    if (positionDrop < -this.config.alertThresholds.positionDrop) {
      await this.createAlert({
        type: 'ranking_drop',
        severity: this.getSeverityFromDrop(positionDrop),
        title: `Chute de position: ${ranking.keyword}`,
        description: `Le mot-clé "${ranking.keyword}" a chuté de ${Math.abs(positionDrop)} positions (${ranking.previousPosition} → ${ranking.currentPosition})`,
        trigger: {
          keyword: ranking.keyword,
          threshold: this.config.alertThresholds.positionDrop,
          actual: positionDrop
        }
      });
    }

    // Alerte gain de position important
    if (positionDrop > 5) {
      await this.createAlert({
        type: 'ranking_gain',
        severity: 'low',
        title: `Gain de position: ${ranking.keyword}`,
        description: `Le mot-clé "${ranking.keyword}" a gagné ${positionDrop} positions (${ranking.previousPosition} → ${ranking.currentPosition})`,
        trigger: {
          keyword: ranking.keyword,
          threshold: 5,
          actual: positionDrop
        }
      });
    }
  }

  /**
   * Création d'une alerte
   */
  private async createAlert(alertData: Partial<MonitoringAlert>): Promise<void> {
    const alert: MonitoringAlert = {
      id: `alert_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
      acknowledged: false,
      resolved: false,
      actions: [],
      ...alertData as MonitoringAlert
    };

    this.alerts.push(alert);

    // Envoi de notification si sévérité élevée
    if (['high', 'critical'].includes(alert.severity)) {
      await this.sendNotification(alert);
    }

    console.log(`🚨 Nouvelle alerte: ${alert.title}`);
  }

  /**
   * Envoi de notifications
   */
  private async sendNotification(alert: MonitoringAlert): Promise<void> {
    // Simulation d'envoi d'email/Slack/etc.
    const message = `
ALERTE SEO - ${alert.severity.toUpperCase()}

${alert.title}
${alert.description}

Timestamp: ${alert.timestamp.toISOString()}
${alert.trigger?.keyword ? `Mot-clé: ${alert.trigger.keyword}` : ''}
`;

    // En production: intégration avec services de notification
    console.log('📧 Notification envoyée:', message);
  }

  // Méthodes d'audit technique spécialisées

  /**
   * Audit de crawlabilité
   */
  private async auditCrawlability(): Promise<{ score: number; issues: TechnicalIssue[] }> {
    const issues: TechnicalIssue[] = [];
    let score = 100;

    // Vérification robots.txt
    try {
      const robotsResponse = await axios.get(`${this.config.domain}/robots.txt`);
      if (!robotsResponse.data.includes('Sitemap:')) {
        issues.push({
          id: 'robots_no_sitemap',
          type: 'warning',
          category: 'crawlability',
          title: 'Sitemap manquant dans robots.txt',
          description: 'Le fichier robots.txt ne contient pas de référence au sitemap',
          impact: 'medium',
          effort: 'low',
          priority: 6,
          affectedPages: ['/robots.txt'],
          recommendation: 'Ajouter la ligne "Sitemap: https://domain.com/sitemap.xml"',
          resources: ['https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt'],
          estimatedFixTime: 0.5
        });
        score -= 5;
      }
    } catch (error) {
      issues.push({
        id: 'robots_missing',
        type: 'critical',
        category: 'crawlability',
        title: 'Fichier robots.txt manquant',
        description: 'Le fichier robots.txt est inaccessible ou n\'existe pas',
        impact: 'high',
        effort: 'low',
        priority: 9,
        affectedPages: ['/robots.txt'],
        recommendation: 'Créer un fichier robots.txt à la racine du site',
        resources: ['https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt'],
        estimatedFixTime: 1
      });
      score -= 15;
    }

    // Vérification sitemap
    try {
      await axios.get(`${this.config.domain}/sitemap.xml`);
    } catch (error) {
      issues.push({
        id: 'sitemap_missing',
        type: 'critical',
        category: 'crawlability',
        title: 'Sitemap XML manquant',
        description: 'Le sitemap XML est inaccessible',
        impact: 'high',
        effort: 'medium',
        priority: 8,
        affectedPages: ['/sitemap.xml'],
        recommendation: 'Générer et publier un sitemap XML',
        resources: ['https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap'],
        estimatedFixTime: 2
      });
      score -= 20;
    }

    return { score: Math.max(score, 0), issues };
  }

  /**
   * Audit d'indexabilité
   */
  private async auditIndexability(): Promise<{ score: number; issues: TechnicalIssue[] }> {
    const issues: TechnicalIssue[] = [];
    let score = 100;

    // Simulation de vérifications d'indexabilité
    // En réalité, utiliser Google Search Console API

    // Vérification meta robots
    const hasNoIndexPages = Math.random() > 0.8; // Simulation
    if (hasNoIndexPages) {
      issues.push({
        id: 'noindex_pages',
        type: 'warning',
        category: 'indexability',
        title: 'Pages avec noindex détectées',
        description: 'Certaines pages importantes contiennent la directive noindex',
        impact: 'medium',
        effort: 'low',
        priority: 7,
        affectedPages: ['/page1', '/page2'],
        recommendation: 'Vérifier si ces pages doivent être indexées',
        resources: ['https://developers.google.com/search/docs/crawling-indexing/block-indexing'],
        estimatedFixTime: 1
      });
      score -= 10;
    }

    return { score: Math.max(score, 0), issues };
  }

  /**
   * Audit de performance
   */
  private async auditPerformance(): Promise<{ score: number; issues: TechnicalIssue[] }> {
    const issues: TechnicalIssue[] = [];
    let score = 100;

    // Simulation audit PageSpeed
    const performanceScore = 60 + Math.random() * 40; // 60-100

    if (performanceScore < 90) {
      issues.push({
        id: 'performance_low',
        type: performanceScore < 70 ? 'critical' : 'warning',
        category: 'performance',
        title: `Score de performance faible: ${Math.round(performanceScore)}/100`,
        description: 'Le site présente des problèmes de performance qui affectent l\'expérience utilisateur',
        impact: 'high',
        effort: 'high',
        priority: performanceScore < 70 ? 9 : 6,
        affectedPages: ['toutes les pages'],
        recommendation: 'Optimiser les images, minifier CSS/JS, utiliser un CDN',
        resources: ['https://web.dev/performance/'],
        estimatedFixTime: 8
      });
      score = Math.round(performanceScore);
    }

    return { score: Math.max(score, 0), issues };
  }

  /**
   * Audit mobile
   */
  private async auditMobileUsability(): Promise<{ score: number; issues: TechnicalIssue[] }> {
    const issues: TechnicalIssue[] = [];
    let score = 100;

    // Simulation de problèmes mobile
    const hasMobileIssues = Math.random() > 0.7;
    if (hasMobileIssues) {
      issues.push({
        id: 'mobile_usability',
        type: 'warning',
        category: 'mobile',
        title: 'Problèmes d\'utilisabilité mobile',
        description: 'Le site présente des problèmes d\'affichage sur mobile',
        impact: 'medium',
        effort: 'medium',
        priority: 7,
        affectedPages: ['pages avec formulaires'],
        recommendation: 'Tester et corriger l\'affichage mobile',
        resources: ['https://developers.google.com/search/mobile-sites/'],
        estimatedFixTime: 4
      });
      score -= 15;
    }

    return { score: Math.max(score, 0), issues };
  }

  /**
   * Audit données structurées
   */
  private async auditStructuredData(): Promise<{ score: number; issues: TechnicalIssue[] }> {
    const issues: TechnicalIssue[] = [];
    let score = 100;

    // Simulation de vérification Schema.org
    const hasStructuredData = Math.random() > 0.5;
    if (!hasStructuredData) {
      issues.push({
        id: 'missing_structured_data',
        type: 'recommendation',
        category: 'structured_data',
        title: 'Données structurées manquantes',
        description: 'Le site n\'utilise pas de données structurées Schema.org',
        impact: 'medium',
        effort: 'medium',
        priority: 5,
        affectedPages: ['pages produits', 'pages articles'],
        recommendation: 'Implémenter Schema.org pour améliorer les rich snippets',
        resources: ['https://schema.org/', 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data'],
        estimatedFixTime: 6
      });
      score -= 20;
    }

    return { score: Math.max(score, 0), issues };
  }

  /**
   * Audit sécurité
   */
  private async auditSecurity(): Promise<{ score: number; issues: TechnicalIssue[] }> {
    const issues: TechnicalIssue[] = [];
    let score = 100;

    // Vérification HTTPS
    if (!this.config.domain.startsWith('https://')) {
      issues.push({
        id: 'no_https',
        type: 'critical',
        category: 'security',
        title: 'Site non sécurisé (HTTP)',
        description: 'Le site n\'utilise pas HTTPS, ce qui affecte le SEO et la confiance',
        impact: 'high',
        effort: 'medium',
        priority: 10,
        affectedPages: ['toutes les pages'],
        recommendation: 'Migrer vers HTTPS avec certificat SSL',
        resources: ['https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https'],
        estimatedFixTime: 4
      });
      score -= 30;
    }

    return { score: Math.max(score, 0), issues };
  }

  // Méthodes utilitaires et simulations

  private async fetchKeywordPosition(keyword: string): Promise<number> {
    // Simulation de position (en réalité, API SEMrush/Ahrefs)
    return Math.floor(Math.random() * 100) + 1;
  }

  private async getRankingURL(keyword: string): Promise<string> {
    // Simulation - retourner l'URL qui rank pour ce mot-clé
    return `${this.config.domain}/page-${keyword.replace(/\s+/g, '-')}`;
  }

  private async getCompetitorPositions(keyword: string): Promise<any[]> {
    // Simulation des positions concurrentes
    return this.config.competitors.map(domain => ({
      domain,
      position: Math.floor(Math.random() * 20) + 1,
      title: `Titre concurrent pour ${keyword}`,
      url: `https://${domain}/page`
    }));
  }

  private calculateEstimatedTraffic(position: number, searchVolume: number): number {
    // CTR estimés par position
    const ctrByPosition = {
      1: 0.28, 2: 0.15, 3: 0.11, 4: 0.08, 5: 0.07,
      6: 0.05, 7: 0.04, 8: 0.03, 9: 0.025, 10: 0.02
    };
    
    const ctr = ctrByPosition[position as keyof typeof ctrByPosition] || 0.01;
    return Math.floor(searchVolume * ctr);
  }

  private updateRankingHistory(ranking: RankingData): void {
    this.rankingHistory.set(ranking.keyword, ranking);
  }

  private getSeverityFromDrop(drop: number): MonitoringAlert['severity'] {
    if (drop <= -20) return 'critical';
    if (drop <= -10) return 'high';
    if (drop <= -5) return 'medium';
    return 'low';
  }

  private calculateAveragePosition(rankings: RankingData[]): number {
    if (rankings.length === 0) return 0;
    const sum = rankings.reduce((acc, r) => acc + r.currentPosition, 0);
    return Math.round(sum / rankings.length * 10) / 10;
  }

  private calculateVisibilityScore(rankings: RankingData[]): number {
    // Score de visibilité basé sur positions et volumes
    const totalScore = rankings.reduce((acc, r) => {
      const positionScore = Math.max(101 - r.currentPosition, 0);
      const volumeWeight = Math.log(r.searchVolume + 1);
      return acc + (positionScore * volumeWeight);
    }, 0);
    
    return Math.round(totalScore / rankings.length);
  }

  private calculatePositionTrend(rankings: RankingData[]): number[] {
    // Simulation de tendance sur 30 jours
    return Array.from({ length: 30 }, (_, i) => {
      const base = this.calculateAveragePosition(rankings);
      return base + (Math.random() - 0.5) * 5;
    });
  }

  private calculateTrafficTrend(rankings: RankingData[]): number[] {
    const totalTraffic = rankings.reduce((sum, r) => sum + r.estimatedTraffic, 0);
    return Array.from({ length: 30 }, (_, i) => {
      return Math.floor(totalTraffic * (0.8 + Math.random() * 0.4));
    });
  }

  private calculateVisibilityTrend(rankings: RankingData[]): number[] {
    const currentVisibility = this.calculateVisibilityScore(rankings);
    return Array.from({ length: 30 }, (_, i) => {
      return Math.floor(currentVisibility * (0.9 + Math.random() * 0.2));
    });
  }

  private async analyzeCompetitors(): Promise<void> {
    // Analyse des changements concurrentiels
    for (const competitor of this.config.competitors) {
      // Simulation d'analyse concurrentielle
      const hasSignificantChange = Math.random() > 0.9;
      if (hasSignificantChange) {
        await this.createAlert({
          type: 'competitor_change',
          severity: 'medium',
          title: `Changement concurrent détecté: ${competitor}`,
          description: `${competitor} a fait des changements significatifs dans leur stratégie SEO`
        });
      }
    }
  }

  private async generateWeeklyReport(): Promise<void> {
    const dashboard = await this.generateDashboard();
    
    // Génération et envoi du rapport hebdomadaire
    const report = `
RAPPORT SEO HEBDOMADAIRE
========================

OVERVIEW
--------
- Mots-clés suivis: ${dashboard.overview.totalKeywords}
- Position moyenne: ${dashboard.overview.averagePosition}
- Trafic estimé: ${dashboard.overview.totalTraffic}
- Score technique: ${dashboard.overview.technicalScore}/100

TOP MOVERS
----------
Gains: ${dashboard.topMovers.gainers.map(g => `${g.keyword} (+${g.positionChange})`).join(', ')}
Pertes: ${dashboard.topMovers.losers.map(l => `${l.keyword} (${l.positionChange})`).join(', ')}

ALERTES ACTIVES
---------------
${dashboard.alerts.map(a => `- ${a.title} (${a.severity})`).join('\n')}

ACTIONS PRIORITAIRES
--------------------
${dashboard.nextActions.map(a => `- ${a.action} (${a.priority})`).join('\n')}
`;

    console.log('📊 Rapport hebdomadaire généré');
    // En production: envoyer par email aux destinataires
  }

  private async generateTechnicalAlerts(issues: TechnicalIssue[]): Promise<void> {
    for (const issue of issues) {
      await this.createAlert({
        type: 'technical_issue',
        severity: issue.impact === 'high' ? 'high' : 'medium',
        title: issue.title,
        description: issue.description,
        actions: [issue.recommendation]
      });
    }
  }

  private initializeIntegrations(): void {
    // Initialisation des intégrations avec les APIs externes
    if (this.config.integrations.googleSearchConsole) {
      // Configuration Google Search Console
    }
    if (this.config.integrations.googleAnalytics) {
      // Configuration Google Analytics
    }
    // etc.
  }

  /**
   * API publiques pour interaction externe
   */
  async acknowledgeAlert(alertId: string): Promise<boolean> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      return true;
    }
    return false;
  }

  async resolveAlert(alertId: string): Promise<boolean> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      return true;
    }
    return false;
  }

  async getActiveAlerts(): Promise<MonitoringAlert[]> {
    return this.alerts.filter(alert => !alert.resolved);
  }

  async getKeywordHistory(keyword: string): Promise<RankingData | undefined> {
    return this.rankingHistory.get(keyword);
  }

  async getTechnicalScore(): Promise<number> {
    const lastAudit = this.technicalAudits[this.technicalAudits.length - 1];
    return lastAudit?.score || 0;
  }
}

// Configuration par défaut
export const defaultMonitoringConfig: MonitoringConfig = {
  domain: 'https://legourmet-paris.fr',
  trackedKeywords: [
    'restaurant gastronomique paris',
    'restaurant étoilé paris',
    'chef étoilé paris',
    'cuisine française raffinée',
    'restaurant michelin paris'
  ],
  competitors: [
    'restaurant-concurrent1.fr',
    'restaurant-concurrent2.fr',
    'restaurant-concurrent3.fr'
  ],
  alertThresholds: {
    positionDrop: 5,
    trafficDrop: 20,
    technicalScore: 70
  },
  auditFrequency: 'daily',
  reportRecipients: ['seo@legourmet-paris.fr'],
  integrations: {
    googleSearchConsole: true,
    googleAnalytics: true,
    semrush: true,
    ahrefs: false
  }
};

// Export instance
export default new SEOMonitoringEngine(defaultMonitoringConfig);