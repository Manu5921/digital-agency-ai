/**
 * Content Calendar Intelligent - Phase 2 SEO Agent
 * Planification contenu 12 mois automatique avec adaptation saisonnière
 * Intégration événements et tendances + Workflow validation/publication
 */

import { KeywordData } from './keyword-research';

export interface ContentItem {
  id: string;
  title: string;
  type: 'blog_post' | 'landing_page' | 'product_update' | 'seasonal_content' | 'event_content';
  keywords: KeywordData[];
  publishDate: Date;
  deadline: Date;
  status: 'planned' | 'in_progress' | 'review' | 'approved' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  estimatedTraffic: number;
  seasonality: {
    peak: number; // 1-12 (mois)
    duration: number; // nombre de mois de pertinence
  };
  eventTriggers?: {
    eventType: 'holiday' | 'industry_event' | 'trend' | 'competitor';
    eventName: string;
    relevanceScore: number;
  }[];
  contentMetrics: {
    targetWordCount: number;
    targetReadTime: number; // minutes
    difficultyLevel: 'beginner' | 'intermediate' | 'expert';
  };
  seoTargets: {
    targetPosition: number;
    expectedTraffic: number;
    competitionLevel: 'low' | 'medium' | 'high';
  };
}

export interface ContentCalendarConfig {
  industry: string;
  businessGoals: string[];
  contentTypes: ContentItem['type'][];
  publicationFrequency: {
    blogPosts: number; // par mois
    landingPages: number; // par trimestre
    seasonalContent: number; // par saison
  };
  team: {
    writers: string[];
    editors: string[];
    seoSpecialists: string[];
  };
  holidays: string[]; // pays/région pour événements
  targetAudience: {
    segments: string[];
    buyingCycle: 'awareness' | 'consideration' | 'decision' | 'retention';
  }[];
}

export interface SeasonalTrend {
  keyword: string;
  peakMonths: number[];
  volumeMultiplier: number;
  category: string;
}

export interface ContentCalendar {
  year: number;
  items: ContentItem[];
  monthlyPlan: Record<number, ContentItem[]>;
  seasonalPlan: Record<string, ContentItem[]>;
  eventPlan: Record<string, ContentItem[]>;
  metrics: {
    totalItems: number;
    byType: Record<ContentItem['type'], number>;
    byPriority: Record<ContentItem['priority'], number>;
    estimatedTotalTraffic: number;
  };
  workflowSteps: {
    planning: Date;
    research: Date;
    writing: Date;
    review: Date;
    publication: Date;
  }[];
}

export class ContentCalendarGenerator {
  private industryEvents: Map<string, any[]>;
  private seasonalPatterns: Map<string, SeasonalTrend[]>;
  private holidays: Map<string, Date[]>;

  constructor() {
    this.initializeIndustryData();
    this.initializeSeasonalPatterns();
    this.initializeHolidays();
  }

  /**
   * Génère un calendrier de contenu complet pour 12 mois
   */
  async generateYearlyCalendar(
    config: ContentCalendarConfig,
    keywords: KeywordData[]
  ): Promise<ContentCalendar> {
    const currentYear = new Date().getFullYear();
    const calendar: ContentCalendar = {
      year: currentYear,
      items: [],
      monthlyPlan: {},
      seasonalPlan: {},
      eventPlan: {},
      metrics: {
        totalItems: 0,
        byType: {} as any,
        byPriority: {} as any,
        estimatedTotalTraffic: 0
      },
      workflowSteps: []
    };

    console.log('📅 Génération du calendrier de contenu...');

    // 1. Génération du contenu saisonnier
    const seasonalContent = await this.generateSeasonalContent(config, keywords);
    calendar.items.push(...seasonalContent);

    // 2. Génération du contenu événementiel
    const eventContent = await this.generateEventBasedContent(config, keywords);
    calendar.items.push(...eventContent);

    // 3. Génération du contenu evergreen
    const evergreenContent = await this.generateEvergreenContent(config, keywords);
    calendar.items.push(...evergreenContent);

    // 4. Optimisation de la distribution mensuelle
    await this.optimizeMonthlyDistribution(calendar, config);

    // 5. Génération des workflows
    await this.generateWorkflows(calendar, config);

    // 6. Calcul des métriques
    this.calculateCalendarMetrics(calendar);

    console.log(`✅ Calendrier généré: ${calendar.items.length} contenus planifiés`);
    return calendar;
  }

  /**
   * Génère le contenu saisonnier basé sur les tendances
   */
  private async generateSeasonalContent(
    config: ContentCalendarConfig,
    keywords: KeywordData[]
  ): Promise<ContentItem[]> {
    const seasonalContent: ContentItem[] = [];
    const seasonalTrends = this.seasonalPatterns.get(config.industry) || [];

    for (const trend of seasonalTrends) {
      // Trouver les mots-clés correspondants
      const relatedKeywords = keywords.filter(k => 
        k.keyword.toLowerCase().includes(trend.keyword.toLowerCase()) ||
        trend.keyword.toLowerCase().includes(k.keyword.toLowerCase())
      );

      if (relatedKeywords.length === 0) continue;

      for (const peakMonth of trend.peakMonths) {
        const contentItem: ContentItem = {
          id: `seasonal_${trend.keyword}_${peakMonth}`,
          title: this.generateSeasonalTitle(trend, peakMonth, config.industry),
          type: 'seasonal_content',
          keywords: relatedKeywords.slice(0, 3),
          publishDate: new Date(new Date().getFullYear(), peakMonth - 2, 1), // 2 mois avant le pic
          deadline: new Date(new Date().getFullYear(), peakMonth - 2, 15),
          status: 'planned',
          priority: 'medium',
          estimatedTraffic: relatedKeywords.reduce((sum, k) => sum + k.searchVolume, 0) * trend.volumeMultiplier,
          seasonality: {
            peak: peakMonth,
            duration: 3
          },
          contentMetrics: {
            targetWordCount: 1200,
            targetReadTime: 5,
            difficultyLevel: 'intermediate'
          },
          seoTargets: {
            targetPosition: 3,
            expectedTraffic: Math.floor(relatedKeywords[0]?.searchVolume * 0.15 || 100),
            competitionLevel: relatedKeywords[0]?.competition || 'medium'
          }
        };

        seasonalContent.push(contentItem);
      }
    }

    return seasonalContent;
  }

  /**
   * Génère le contenu basé sur les événements
   */
  private async generateEventBasedContent(
    config: ContentCalendarConfig,
    keywords: KeywordData[]
  ): Promise<ContentItem[]> {
    const eventContent: ContentItem[] = [];
    const industryEvents = this.industryEvents.get(config.industry) || [];

    for (const event of industryEvents) {
      const eventKeywords = keywords.filter(k => 
        this.isRelevantToEvent(k.keyword, event)
      );

      if (eventKeywords.length === 0) continue;

      const contentItem: ContentItem = {
        id: `event_${event.name}_${event.month}`,
        title: this.generateEventTitle(event, config.industry),
        type: 'event_content',
        keywords: eventKeywords.slice(0, 2),
        publishDate: new Date(new Date().getFullYear(), event.month - 1, event.prepDays || 14),
        deadline: new Date(new Date().getFullYear(), event.month - 1, (event.prepDays || 14) - 7),
        status: 'planned',
        priority: event.priority || 'medium',
        estimatedTraffic: eventKeywords.reduce((sum, k) => sum + k.searchVolume, 0) * 0.8,
        seasonality: {
          peak: event.month,
          duration: 1
        },
        eventTriggers: [{
          eventType: event.type,
          eventName: event.name,
          relevanceScore: event.relevance || 0.7
        }],
        contentMetrics: {
          targetWordCount: event.type === 'holiday' ? 800 : 1500,
          targetReadTime: event.type === 'holiday' ? 3 : 6,
          difficultyLevel: 'beginner'
        },
        seoTargets: {
          targetPosition: 5,
          expectedTraffic: Math.floor(eventKeywords[0]?.searchVolume * 0.1 || 50),
          competitionLevel: 'high'
        }
      };

      eventContent.push(contentItem);
    }

    return eventContent;
  }

  /**
   * Génère le contenu evergreen (permanent)
   */
  private async generateEvergreenContent(
    config: ContentCalendarConfig,
    keywords: KeywordData[]
  ): Promise<ContentItem[]> {
    const evergreenContent: ContentItem[] = [];
    const monthlyBlogPosts = config.publicationFrequency.blogPosts;
    const totalMonths = 12;

    // Mots-clés evergreen (intent informational, volume stable)
    const evergreenKeywords = keywords.filter(k => 
      k.intent === 'informational' && 
      k.searchVolume > 100 &&
      this.isEvergreenKeyword(k.keyword)
    );

    const keywordsPerMonth = Math.ceil(evergreenKeywords.length / totalMonths);

    for (let month = 1; month <= totalMonths; month++) {
      const monthKeywords = evergreenKeywords.slice(
        (month - 1) * keywordsPerMonth,
        month * keywordsPerMonth
      );

      for (let i = 0; i < monthlyBlogPosts && i < monthKeywords.length; i++) {
        const keyword = monthKeywords[i];
        const publishDay = Math.floor(30 / monthlyBlogPosts) * (i + 1);

        const contentItem: ContentItem = {
          id: `evergreen_${month}_${i}`,
          title: this.generateEvergreenTitle(keyword, config.industry),
          type: 'blog_post',
          keywords: [keyword, ...this.findRelatedKeywords(keyword, keywords)],
          publishDate: new Date(new Date().getFullYear(), month - 1, publishDay),
          deadline: new Date(new Date().getFullYear(), month - 1, publishDay - 7),
          status: 'planned',
          priority: 'medium',
          estimatedTraffic: keyword.searchVolume * 0.12,
          seasonality: {
            peak: 0, // Pas de saisonnalité
            duration: 12
          },
          contentMetrics: {
            targetWordCount: 1500,
            targetReadTime: 6,
            difficultyLevel: this.determineDifficultyLevel(keyword.difficulty)
          },
          seoTargets: {
            targetPosition: Math.max(10 - Math.floor(keyword.difficulty / 15), 1),
            expectedTraffic: Math.floor(keyword.searchVolume * 0.12),
            competitionLevel: keyword.competition
          }
        };

        evergreenContent.push(contentItem);
      }
    }

    return evergreenContent;
  }

  /**
   * Optimise la distribution mensuelle du contenu
   */
  private async optimizeMonthlyDistribution(
    calendar: ContentCalendar,
    config: ContentCalendarConfig
  ): Promise<void> {
    // Regroupement par mois
    for (let month = 1; month <= 12; month++) {
      calendar.monthlyPlan[month] = calendar.items.filter(item => 
        item.publishDate.getMonth() === month - 1
      );
    }

    // Équilibrage de la charge de travail
    const maxItemsPerMonth = Math.max(...Object.values(calendar.monthlyPlan).map(items => items.length));
    const minItemsPerMonth = Math.min(...Object.values(calendar.monthlyPlan).map(items => items.length));

    // Si déséquilibre > 50%, redistribuer
    if (maxItemsPerMonth - minItemsPerMonth > maxItemsPerMonth * 0.5) {
      await this.redistributeContent(calendar);
    }

    // Regroupement saisonnier
    const seasons = {
      'Printemps': [3, 4, 5],
      'Été': [6, 7, 8],
      'Automne': [9, 10, 11],
      'Hiver': [12, 1, 2]
    };

    for (const [season, months] of Object.entries(seasons)) {
      calendar.seasonalPlan[season] = calendar.items.filter(item => 
        months.includes(item.publishDate.getMonth() + 1)
      );
    }

    // Regroupement par événements
    calendar.eventPlan = calendar.items
      .filter(item => item.eventTriggers && item.eventTriggers.length > 0)
      .reduce((plan, item) => {
        const eventName = item.eventTriggers![0].eventName;
        if (!plan[eventName]) plan[eventName] = [];
        plan[eventName].push(item);
        return plan;
      }, {} as Record<string, ContentItem[]>);
  }

  /**
   * Génère les workflows de validation et publication
   */
  private async generateWorkflows(
    calendar: ContentCalendar,
    config: ContentCalendarConfig
  ): Promise<void> {
    for (const item of calendar.items) {
      const workflowSteps = {
        planning: new Date(item.publishDate.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 jours avant
        research: new Date(item.publishDate.getTime() - 21 * 24 * 60 * 60 * 1000), // 21 jours avant
        writing: new Date(item.publishDate.getTime() - 14 * 24 * 60 * 60 * 1000),  // 14 jours avant
        review: new Date(item.publishDate.getTime() - 7 * 24 * 60 * 60 * 1000),   // 7 jours avant
        publication: item.publishDate
      };

      calendar.workflowSteps.push(workflowSteps);

      // Attribution automatique des tâches
      if (config.team.writers.length > 0) {
        const writerIndex = calendar.items.indexOf(item) % config.team.writers.length;
        item.assignedTo = config.team.writers[writerIndex];
      }
    }
  }

  /**
   * Calcule les métriques du calendrier
   */
  private calculateCalendarMetrics(calendar: ContentCalendar): void {
    calendar.metrics.totalItems = calendar.items.length;
    
    // Métriques par type
    calendar.metrics.byType = calendar.items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<ContentItem['type'], number>);

    // Métriques par priorité
    calendar.metrics.byPriority = calendar.items.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {} as Record<ContentItem['priority'], number>);

    // Trafic estimé total
    calendar.metrics.estimatedTotalTraffic = calendar.items.reduce(
      (sum, item) => sum + item.estimatedTraffic, 0
    );
  }

  /**
   * API pour mettre à jour le statut d'un contenu
   */
  async updateContentStatus(
    calendar: ContentCalendar,
    itemId: string,
    newStatus: ContentItem['status'],
    assignedTo?: string
  ): Promise<boolean> {
    const item = calendar.items.find(item => item.id === itemId);
    if (!item) return false;

    item.status = newStatus;
    if (assignedTo) item.assignedTo = assignedTo;

    // Log du changement
    console.log(`📝 Contenu ${itemId} mis à jour: ${newStatus}`);
    
    return true;
  }

  /**
   * API pour obtenir le planning de la semaine
   */
  getWeeklyPlan(calendar: ContentCalendar, weekStart: Date): ContentItem[] {
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return calendar.items.filter(item => 
      item.publishDate >= weekStart && item.publishDate <= weekEnd
    ).sort((a, b) => a.publishDate.getTime() - b.publishDate.getTime());
  }

  /**
   * API pour obtenir les contenus en retard
   */
  getOverdueContent(calendar: ContentCalendar): ContentItem[] {
    const now = new Date();
    
    return calendar.items.filter(item => 
      item.deadline < now && 
      !['published', 'archived'].includes(item.status)
    );
  }

  /**
   * Génération automatique des briefs de contenu
   */
  async generateContentBrief(item: ContentItem): Promise<string> {
    return `
# Brief de Contenu: ${item.title}

## Informations Générales
- **Type**: ${item.type}
- **Date de Publication**: ${item.publishDate.toLocaleDateString('fr-FR')}
- **Deadline**: ${item.deadline.toLocaleDateString('fr-FR')}
- **Priorité**: ${item.priority}
- **Assigné à**: ${item.assignedTo || 'Non assigné'}

## Objectifs SEO
- **Mots-clés Principaux**: ${item.keywords.map(k => k.keyword).join(', ')}
- **Position Cible**: Top ${item.seoTargets.targetPosition}
- **Trafic Estimé**: ${item.seoTargets.expectedTraffic} visites/mois
- **Niveau de Concurrence**: ${item.seoTargets.competitionLevel}

## Spécifications du Contenu
- **Nombre de Mots**: ${item.contentMetrics.targetWordCount}
- **Temps de Lecture**: ${item.contentMetrics.targetReadTime} minutes
- **Niveau de Difficulté**: ${item.contentMetrics.difficultyLevel}

## Contexte Saisonnier
${item.seasonality.peak ? `- **Pic Saisonnier**: Mois ${item.seasonality.peak}` : '- **Contenu Evergreen**'}
- **Durée de Pertinence**: ${item.seasonality.duration} mois

${item.eventTriggers ? `## Événements Associés
${item.eventTriggers.map(event => `- **${event.eventName}** (${event.eventType}) - Score: ${event.relevanceScore}`).join('\n')}` : ''}

## Recommandations
1. Intégrer naturellement les mots-clés principaux dans le titre et les sous-titres
2. Structurer le contenu avec des H2/H3 optimisés
3. Ajouter des éléments visuels avec alt-texts optimisés
4. Inclure des appels à l'action pertinents
5. Optimiser pour les featured snippets si possible

## Métriques de Succès
- Atteindre la position ${item.seoTargets.targetPosition} dans les 3 mois
- Générer ${item.seoTargets.expectedTraffic} visites organiques mensuelles
- Taux d'engagement > 60% (temps sur page, scroll depth)
`;
  }

  // Méthodes utilitaires privées

  /**
   * Initialise les données d'industrie
   */
  private initializeIndustryData(): void {
    this.industryEvents = new Map([
      ['restaurant', [
        { name: 'Saint-Valentin', month: 2, type: 'holiday', priority: 'high', prepDays: 21, relevance: 0.9 },
        { name: 'Fête des Pères', month: 6, type: 'holiday', priority: 'medium', prepDays: 14, relevance: 0.7 },
        { name: 'Fête des Mères', month: 5, type: 'holiday', priority: 'high', prepDays: 14, relevance: 0.8 },
        { name: 'Rentrée', month: 9, type: 'trend', priority: 'medium', prepDays: 7, relevance: 0.6 },
        { name: 'Fêtes de fin d\'année', month: 12, type: 'holiday', priority: 'high', prepDays: 30, relevance: 0.95 }
      ]],
      ['ecommerce', [
        { name: 'Black Friday', month: 11, type: 'industry_event', priority: 'urgent', prepDays: 45, relevance: 0.95 },
        { name: 'Cyber Monday', month: 11, type: 'industry_event', priority: 'urgent', prepDays: 45, relevance: 0.9 },
        { name: 'Soldes d \'été', month: 6, type: 'industry_event', priority: 'high', prepDays: 30, relevance: 0.8 },
        { name: 'Soldes d\'hiver', month: 1, type: 'industry_event', priority: 'high', prepDays: 30, relevance: 0.8 }
      ]]
    ]);
  }

  /**
   * Initialise les patterns saisonniers
   */
  private initializeSeasonalPatterns(): void {
    this.seasonalPatterns = new Map([
      ['restaurant', [
        { keyword: 'terrasse', peakMonths: [5, 6, 7, 8], volumeMultiplier: 2.0, category: 'saisonnier' },
        { keyword: 'menu hiver', peakMonths: [11, 12, 1, 2], volumeMultiplier: 1.5, category: 'saisonnier' },
        { keyword: 'brunch', peakMonths: [4, 5, 9, 10], volumeMultiplier: 1.3, category: 'saisonnier' },
        { keyword: 'réveillon', peakMonths: [11, 12], volumeMultiplier: 3.0, category: 'événementiel' }
      ]],
      ['ecommerce', [
        { keyword: 'cadeau', peakMonths: [11, 12, 5], volumeMultiplier: 2.5, category: 'saisonnier' },
        { keyword: 'été', peakMonths: [5, 6, 7], volumeMultiplier: 1.8, category: 'saisonnier' },
        { keyword: 'rentrée', peakMonths: [8, 9], volumeMultiplier: 1.6, category: 'saisonnier' }
      ]]
    ]);
  }

  /**
   * Initialise les jours fériés
   */
  private initializeHolidays(): void {
    const currentYear = new Date().getFullYear();
    this.holidays = new Map([
      ['FR', [
        new Date(currentYear, 0, 1),   // Nouvel An
        new Date(currentYear, 1, 14),  // Saint-Valentin
        new Date(currentYear, 4, 1),   // Fête du Travail
        new Date(currentYear, 4, 8),   // Victoire 1945
        new Date(currentYear, 6, 14),  // Fête Nationale
        new Date(currentYear, 10, 1),  // Toussaint
        new Date(currentYear, 10, 11), // Armistice
        new Date(currentYear, 11, 25)  // Noël
      ]]
    ]);
  }

  // Méthodes utilitaires pour la génération de contenu

  private generateSeasonalTitle(trend: SeasonalTrend, month: number, industry: string): string {
    const monthNames = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                       'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    if (industry === 'restaurant') {
      return `${trend.keyword} ${monthNames[month]} : Guide Complet et Conseils`;
    }
    
    return `Tendances ${trend.keyword} ${monthNames[month]} ${new Date().getFullYear()}`;
  }

  private generateEventTitle(event: any, industry: string): string {
    if (industry === 'restaurant') {
      return `${event.name} : Menu Spécial et Réservations`;
    }
    
    return `${event.name} ${new Date().getFullYear()} : Guide Complet`;
  }

  private generateEvergreenTitle(keyword: KeywordData, industry: string): string {
    const templates = [
      `Guide Complet : ${keyword.keyword}`,
      `Tout Savoir sur ${keyword.keyword}`,
      `${keyword.keyword} : Conseils d'Expert`,
      `Comment Choisir ${keyword.keyword} ?`,
      `${keyword.keyword} : Les Meilleures Pratiques`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private isRelevantToEvent(keyword: string, event: any): boolean {
    const eventKeywords = event.name.toLowerCase().split(' ');
    const keywordLower = keyword.toLowerCase();
    
    return eventKeywords.some(eventWord => 
      keywordLower.includes(eventWord) || eventWord.includes(keywordLower)
    );
  }

  private isEvergreenKeyword(keyword: string): boolean {
    const seasonalWords = ['été', 'hiver', 'printemps', 'automne', 'noël', 'pâques', 'vacances'];
    const keywordLower = keyword.toLowerCase();
    
    return !seasonalWords.some(seasonal => keywordLower.includes(seasonal));
  }

  private findRelatedKeywords(mainKeyword: KeywordData, allKeywords: KeywordData[]): KeywordData[] {
    return allKeywords
      .filter(k => 
        k.keyword !== mainKeyword.keyword &&
        (k.keyword.includes(mainKeyword.keyword) || mainKeyword.keyword.includes(k.keyword))
      )
      .slice(0, 2);
  }

  private determineDifficultyLevel(difficulty: number): 'beginner' | 'intermediate' | 'expert' {
    if (difficulty < 30) return 'beginner';
    if (difficulty < 70) return 'intermediate';
    return 'expert';
  }

  private async redistributeContent(calendar: ContentCalendar): Promise<void> {
    // Logique de redistribution pour équilibrer la charge
    const monthlyItems = Object.entries(calendar.monthlyPlan);
    const sortedMonths = monthlyItems.sort((a, b) => b[1].length - a[1].length);
    
    // Déplacer quelques contenus des mois surchargés vers les mois plus légers
    const heaviestMonth = sortedMonths[0];
    const lightestMonth = sortedMonths[sortedMonths.length - 1];
    
    if (heaviestMonth[1].length - lightestMonth[1].length > 2) {
      const itemToMove = heaviestMonth[1].pop()!;
      const newMonth = parseInt(lightestMonth[0]);
      itemToMove.publishDate = new Date(itemToMove.publishDate.getFullYear(), newMonth - 1, 15);
      lightestMonth[1].push(itemToMove);
    }
  }
}

// Configuration par défaut
export const defaultCalendarConfig: ContentCalendarConfig = {
  industry: 'restaurant',
  businessGoals: ['increase_visibility', 'drive_reservations', 'build_authority'],
  contentTypes: ['blog_post', 'seasonal_content', 'event_content'],
  publicationFrequency: {
    blogPosts: 4,
    landingPages: 1,
    seasonalContent: 2
  },
  team: {
    writers: ['writer1', 'writer2'],
    editors: ['editor1'],
    seoSpecialists: ['seo1']
  },
  holidays: ['FR'],
  targetAudience: [
    { segments: ['food_lovers'], buyingCycle: 'awareness' },
    { segments: ['couples'], buyingCycle: 'decision' }
  ]
};

// Export instance
export default new ContentCalendarGenerator();