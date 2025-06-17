/**
 * Creative Generator - Génération Automatique d'Ads Visuelles et Copy
 * Crée automatiquement des créatifs publicitaires adaptés par audience et format
 */

import { MarketingConfig } from '../index';

export interface CreativeTemplate {
  id: string;
  name: string;
  platform: 'google' | 'meta' | 'linkedin' | 'tiktok';
  format: 'search_ad' | 'display_banner' | 'video_ad' | 'story_ad' | 'carousel' | 'collection';
  dimensions: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  elements: {
    headline: string;
    description: string;
    callToAction: string;
    images?: string[];
    video?: string;
    logo?: string;
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
  };
  audienceTargeting: string[];
  performance: {
    estimatedCTR: number;
    estimatedCPC: number;
    qualityScore: number;
  };
}

export interface AudiencePersona {
  id: string;
  name: string;
  demographics: {
    age: string;
    gender: string;
    income: string;
    location: string;
  };
  psychographics: {
    interests: string[];
    values: string[];
    lifestyle: string[];
    painPoints: string[];
  };
  behavior: {
    onlineHabits: string[];
    purchaseDrivers: string[];
    preferredChannels: string[];
    decisionMakers: string[];
  };
  messaging: {
    toneOfVoice: string;
    keyMessages: string[];
    emotionalTriggers: string[];
    avoidWords: string[];
  };
}

export interface VideoTemplate {
  id: string;
  name: string;
  duration: number; // en secondes
  format: 'square' | 'vertical' | 'horizontal' | 'story';
  scenes: Array<{
    duration: number;
    type: 'product_shot' | 'lifestyle' | 'text_overlay' | 'logo' | 'cta';
    content: string;
    animation: string;
    audio?: string;
  }>;
  soundtrack: {
    mood: 'energetic' | 'relaxing' | 'professional' | 'emotional';
    genre: string;
    volume: number;
  };
  captions: {
    enabled: boolean;
    style: string;
    color: string;
  };
}

export interface CreativeVariation {
  id: string;
  baseTemplateId: string;
  audienceId: string;
  modifications: {
    headline: string;
    description: string;
    image?: string;
    colors?: Record<string, string>;
    callToAction: string;
  };
  abTestConfig: {
    trafficSplit: number;
    testDuration: number;
    successMetrics: string[];
  };
}

export class CreativeGenerator {
  private config: MarketingConfig;
  private templates: Map<string, CreativeTemplate> = new Map();
  private personas: Map<string, AudiencePersona> = new Map();
  private videoTemplates: Map<string, VideoTemplate> = new Map();

  constructor(config: MarketingConfig) {
    this.config = config;
    this.initializeTemplates();
    this.initializePersonas();
    this.initializeVideoTemplates();
  }

  /**
   * Génère automatiquement des créatifs pour toutes les audiences
   */
  async generateCreativeSet(campaignObjective: string): Promise<{
    creatives: CreativeTemplate[];
    variations: CreativeVariation[];
    recommendations: string[];
    estimatedPerformance: {
      bestPerforming: string;
      expectedCTR: number;
      expectedConversions: number;
    };
  }> {
    const creatives: CreativeTemplate[] = [];
    const variations: CreativeVariation[] = [];
    const recommendations: string[] = [];

    // Génération pour chaque persona
    for (const [personaId, persona] of this.personas) {
      const personaCreatives = await this.generateForPersona(persona, campaignObjective);
      creatives.push(...personaCreatives);

      // Génération de variations A/B
      const personaVariations = await this.generateABVariations(personaCreatives, persona);
      variations.push(...personaVariations);

      // Recommandations spécifiques
      const personaRecommendations = this.generatePersonaRecommendations(persona);
      recommendations.push(...personaRecommendations);
    }

    // Estimation de performance
    const estimatedPerformance = this.estimateCreativePerformance(creatives);

    return {
      creatives,
      variations,
      recommendations,
      estimatedPerformance
    };
  }

  /**
   * Génération automatique de copy publicitaire
   */
  async generateAdCopy(
    persona: AudiencePersona, 
    platform: string, 
    format: string,
    objective: string
  ): Promise<{
    headlines: string[];
    descriptions: string[];
    callToActions: string[];
    keywords: string[];
    emotionalHooks: string[];
  }> {
    const headlines = this.generateHeadlines(persona, objective);
    const descriptions = this.generateDescriptions(persona, objective);
    const callToActions = this.generateCallToActions(persona, objective);
    const keywords = this.extractKeywords(persona);
    const emotionalHooks = this.generateEmotionalHooks(persona);

    return {
      headlines,
      descriptions,
      callToActions,
      keywords,
      emotionalHooks
    };
  }

  /**
   * Génération automatique de visuels (templates)
   */
  async generateVisualCreatives(
    persona: AudiencePersona,
    format: string
  ): Promise<{
    images: Array<{
      id: string;
      url: string;
      alt: string;
      composition: string;
      colors: string[];
      style: string;
    }>;
    videos: VideoTemplate[];
    layouts: Array<{
      id: string;
      name: string;
      structure: string;
      elements: Record<string, any>;
    }>;
  }> {
    const images = await this.generateImageConcepts(persona, format);
    const videos = await this.generateVideoTemplates(persona, format);
    const layouts = this.generateLayoutTemplates(persona, format);

    return {
      images,
      videos,
      layouts
    };
  }

  /**
   * Adaptation multi-formats automatique
   */
  async adaptToFormats(baseCreative: CreativeTemplate): Promise<{
    formats: Array<{
      platform: string;
      format: string;
      creative: CreativeTemplate;
      optimizations: string[];
    }>;
    crossPlatformStrategy: {
      consistency: string[];
      adaptations: string[];
      messaging: string[];
    };
  }> {
    const formats = [];
    
    // Adaptation pour Google Ads
    const googleFormats = await this.adaptToGoogleFormats(baseCreative);
    formats.push(...googleFormats);

    // Adaptation pour Meta (Facebook/Instagram)
    const metaFormats = await this.adaptToMetaFormats(baseCreative);
    formats.push(...metaFormats);

    // Adaptation pour LinkedIn
    const linkedinFormats = await this.adaptToLinkedInFormats(baseCreative);
    formats.push(...linkedinFormats);

    // Adaptation pour TikTok
    const tiktokFormats = await this.adaptToTikTokFormats(baseCreative);
    formats.push(...tiktokFormats);

    const crossPlatformStrategy = this.generateCrossPlatformStrategy(baseCreative);

    return {
      formats,
      crossPlatformStrategy
    };
  }

  /**
   * Optimisation basée sur les performances
   */
  async optimizeCreatives(performanceData: Array<{
    creativeId: string;
    metrics: {
      impressions: number;
      clicks: number;
      conversions: number;
      ctr: number;
      cpc: number;
      cpa: number;
    };
  }>): Promise<{
    optimizedCreatives: CreativeTemplate[];
    insights: string[];
    nextIterations: CreativeVariation[];
  }> {
    const optimizedCreatives = [];
    const insights = [];
    const nextIterations = [];

    for (const data of performanceData) {
      const creative = this.templates.get(data.creativeId);
      if (!creative) continue;

      // Analyse des performances
      const analysis = this.analyzeCreativePerformance(creative, data.metrics);
      insights.push(...analysis.insights);

      // Génération de nouvelles variations
      if (data.metrics.ctr > 3.0) {
        // Créatif performant : générer des variations similaires
        const variations = await this.generateSimilarVariations(creative);
        nextIterations.push(...variations);
      } else if (data.metrics.ctr < 1.5) {
        // Créatif sous-performant : générer des alternatives
        const alternatives = await this.generateAlternativeApproaches(creative);
        optimizedCreatives.push(...alternatives);
      }
    }

    return {
      optimizedCreatives,
      insights,
      nextIterations
    };
  }

  /**
   * Méthodes privées de génération
   */
  private async generateForPersona(persona: AudiencePersona, objective: string): Promise<CreativeTemplate[]> {
    const creatives = [];

    // Créatif principal pour Search Ads
    const searchAd = await this.createSearchAdTemplate(persona, objective);
    creatives.push(searchAd);

    // Créatif pour Display
    const displayAd = await this.createDisplayAdTemplate(persona, objective);
    creatives.push(displayAd);

    // Créatif pour Social Media
    const socialAd = await this.createSocialAdTemplate(persona, objective);
    creatives.push(socialAd);

    return creatives;
  }

  private async createSearchAdTemplate(persona: AudiencePersona, objective: string): Promise<CreativeTemplate> {
    const headlines = this.generateHeadlines(persona, objective);
    const descriptions = this.generateDescriptions(persona, objective);
    const ctas = this.generateCallToActions(persona, objective);

    return {
      id: `search_${persona.id}_${Date.now()}`,
      name: `Search Ad - ${persona.name}`,
      platform: 'google',
      format: 'search_ad',
      dimensions: { width: 0, height: 0, aspectRatio: 'text' },
      elements: {
        headline: headlines[0],
        description: descriptions[0],
        callToAction: ctas[0],
        colors: {
          primary: '#1a73e8',
          secondary: '#34a853',
          text: '#202124',
          background: '#ffffff'
        }
      },
      audienceTargeting: [persona.id],
      performance: {
        estimatedCTR: this.estimateCTR(persona, 'search'),
        estimatedCPC: this.estimateCPC(persona, 'search'),
        qualityScore: 8.5
      }
    };
  }

  private async createDisplayAdTemplate(persona: AudiencePersona, objective: string): Promise<CreativeTemplate> {
    return {
      id: `display_${persona.id}_${Date.now()}`,
      name: `Display Ad - ${persona.name}`,
      platform: 'google',
      format: 'display_banner',
      dimensions: { width: 728, height: 90, aspectRatio: '728x90' },
      elements: {
        headline: this.generateHeadlines(persona, objective)[0],
        description: this.generateDescriptions(persona, objective)[0],
        callToAction: this.generateCallToActions(persona, objective)[0],
        images: ['/images/restaurant-hero.jpg'],
        colors: {
          primary: '#d4af37',
          secondary: '#8b4513',
          text: '#ffffff',
          background: '#1a1a1a'
        }
      },
      audienceTargeting: [persona.id],
      performance: {
        estimatedCTR: this.estimateCTR(persona, 'display'),
        estimatedCPC: this.estimateCPC(persona, 'display'),
        qualityScore: 7.8
      }
    };
  }

  private async createSocialAdTemplate(persona: AudiencePersona, objective: string): Promise<CreativeTemplate> {
    return {
      id: `social_${persona.id}_${Date.now()}`,
      name: `Social Ad - ${persona.name}`,
      platform: 'meta',
      format: 'carousel',
      dimensions: { width: 1080, height: 1080, aspectRatio: '1:1' },
      elements: {
        headline: this.generateHeadlines(persona, objective)[0],
        description: this.generateDescriptions(persona, objective)[0],
        callToAction: this.generateCallToActions(persona, objective)[0],
        images: [
          '/images/dish-1.jpg',
          '/images/dish-2.jpg',
          '/images/restaurant-interior.jpg'
        ],
        colors: {
          primary: '#e74c3c',
          secondary: '#f39c12',
          text: '#2c3e50',
          background: '#ecf0f1'
        }
      },
      audienceTargeting: [persona.id],
      performance: {
        estimatedCTR: this.estimateCTR(persona, 'social'),
        estimatedCPC: this.estimateCPC(persona, 'social'),
        qualityScore: 8.2
      }
    };
  }

  private generateHeadlines(persona: AudiencePersona, objective: string): string[] {
    const headlines = [];
    const businessName = this.config.business.name;
    
    // Headlines basés sur les emotional triggers
    persona.messaging.emotionalTriggers.forEach(trigger => {
      switch (trigger) {
        case 'exclusivity':
          headlines.push(`${businessName} - Expérience Gastronomique Exclusive`);
          headlines.push(`Réservez Votre Table VIP chez ${businessName}`);
          break;
        case 'urgency':
          headlines.push(`Tables Limitées - ${businessName} Réservez Maintenant`);
          headlines.push(`Dernières Places Disponibles - ${businessName}`);
          break;
        case 'quality':
          headlines.push(`${businessName} - Restaurant Étoilé Michelin`);
          headlines.push(`Cuisine d'Excellence - ${businessName}`);
          break;
      }
    });

    // Headlines basés sur les pain points
    persona.psychographics.painPoints.forEach(pain => {
      switch (pain) {
        case 'lack_of_time':
          headlines.push(`Réservation Express - ${businessName} en 2 Clics`);
          break;
        case 'special_occasion':
          headlines.push(`${businessName} - Parfait pour Vos Événements Spéciaux`);
          break;
      }
    });

    return headlines.slice(0, 10); // Limite à 10 headlines
  }

  private generateDescriptions(persona: AudiencePersona, objective: string): string[] {
    const descriptions = [];
    
    // Descriptions basées sur les key messages
    persona.messaging.keyMessages.forEach(message => {
      descriptions.push(`${message}. Découvrez notre menu gastronomique et réservez votre table dès maintenant.`);
    });

    // Descriptions basées sur les valeurs
    persona.psychographics.values.forEach(value => {
      switch (value) {
        case 'quality':
          descriptions.push('Ingrédients premium, chef étoilé, service impeccable. Une expérience culinaire d\'exception vous attend.');
          break;
        case 'authenticity':
          descriptions.push('Cuisine française authentique dans un cadre élégant. Redécouvrez les saveurs traditionnelles revisitées.');
          break;
        case 'innovation':
          descriptions.push('Fusion créative entre tradition et modernité. Notre chef revisite les classiques avec audace.');
          break;
      }
    });

    return descriptions.slice(0, 8);
  }

  private generateCallToActions(persona: AudiencePersona, objective: string): string[] {
    const ctas = [];
    
    // CTAs basés sur les preferred channels
    persona.behavior.preferredChannels.forEach(channel => {
      switch (channel) {
        case 'online_booking':
          ctas.push('Réserver Maintenant');
          ctas.push('Réservation en Ligne');
          break;
        case 'phone':
          ctas.push('Appelez Maintenant');
          ctas.push('Contactez-nous');
          break;
        case 'email':
          ctas.push('Demander Info');
          ctas.push('En Savoir Plus');
          break;
      }
    });

    // CTAs basés sur l'objectif
    switch (objective) {
      case 'awareness':
        ctas.push('Découvrir');
        ctas.push('Voir le Menu');
        break;
      case 'conversion':
        ctas.push('Réserver');
        ctas.push('Commander');
        break;
      case 'engagement':
        ctas.push('Suivre');
        ctas.push('Partager');
        break;
    }

    return [...new Set(ctas)]; // Supprime les doublons
  }

  private async generateABVariations(creatives: CreativeTemplate[], persona: AudiencePersona): Promise<CreativeVariation[]> {
    const variations = [];

    for (const creative of creatives) {
      // Variation 1: Headline différent
      variations.push({
        id: `${creative.id}_var_headline`,
        baseTemplateId: creative.id,
        audienceId: persona.id,
        modifications: {
          headline: this.generateHeadlines(persona, 'conversion')[1],
          description: creative.elements.description,
          callToAction: creative.elements.callToAction
        },
        abTestConfig: {
          trafficSplit: 50,
          testDuration: 14,
          successMetrics: ['ctr', 'conversion_rate']
        }
      });

      // Variation 2: CTA différent
      variations.push({
        id: `${creative.id}_var_cta`,
        baseTemplateId: creative.id,
        audienceId: persona.id,
        modifications: {
          headline: creative.elements.headline,
          description: creative.elements.description,
          callToAction: this.generateCallToActions(persona, 'conversion')[1]
        },
        abTestConfig: {
          trafficSplit: 50,
          testDuration: 14,
          successMetrics: ['ctr', 'conversion_rate']
        }
      });
    }

    return variations;
  }

  private async generateImageConcepts(persona: AudiencePersona, format: string) {
    return [
      {
        id: 'hero_dish',
        url: '/images/signature-dish.jpg',
        alt: 'Plat signature du chef',
        composition: 'close-up product shot',
        colors: ['#d4af37', '#8b4513', '#ffffff'],
        style: 'professional food photography'
      },
      {
        id: 'restaurant_ambiance',
        url: '/images/restaurant-interior.jpg',
        alt: 'Ambiance restaurant',
        composition: 'wide angle lifestyle',
        colors: ['#2c3e50', '#e74c3c', '#f39c12'],
        style: 'warm atmospheric lighting'
      },
      {
        id: 'chef_action',
        url: '/images/chef-cooking.jpg',
        alt: 'Chef en action',
        composition: 'behind the scenes',
        colors: ['#34495e', '#e67e22', '#ffffff'],
        style: 'documentary photography'
      }
    ];
  }

  private async generateVideoTemplates(persona: AudiencePersona, format: string): Promise<VideoTemplate[]> {
    return [
      {
        id: 'restaurant_story',
        name: 'Restaurant Story - 30s',
        duration: 30,
        format: 'horizontal',
        scenes: [
          {
            duration: 5,
            type: 'product_shot',
            content: 'Plat signature en gros plan',
            animation: 'slow zoom in',
            audio: 'ambient kitchen sounds'
          },
          {
            duration: 8,
            type: 'lifestyle',
            content: 'Clients satisfaits dans le restaurant',
            animation: 'pan left to right',
            audio: 'soft background music'
          },
          {
            duration: 7,
            type: 'product_shot',
            content: 'Chef préparant le plat',
            animation: 'close-up hands',
            audio: 'cooking sounds'
          },
          {
            duration: 8,
            type: 'text_overlay',
            content: 'Réservez votre table dès maintenant',
            animation: 'fade in',
            audio: 'music crescendo'
          },
          {
            duration: 2,
            type: 'logo',
            content: 'Logo restaurant',
            animation: 'fade in',
            audio: 'signature sound'
          }
        ],
        soundtrack: {
          mood: 'professional',
          genre: 'acoustic',
          volume: 0.6
        },
        captions: {
          enabled: true,
          style: 'elegant',
          color: '#ffffff'
        }
      }
    ];
  }

  private generateLayoutTemplates(persona: AudiencePersona, format: string) {
    return [
      {
        id: 'hero_layout',
        name: 'Hero Banner Layout',
        structure: 'image_background_with_text_overlay',
        elements: {
          background: 'full_image',
          text_position: 'center_left',
          cta_position: 'bottom_right',
          overlay_opacity: 0.4
        }
      },
      {
        id: 'split_layout',
        name: 'Split Screen Layout',
        structure: 'image_text_split',
        elements: {
          image_side: 'left',
          text_side: 'right',
          ratio: '60:40',
          alignment: 'center'
        }
      }
    ];
  }

  private estimateCTR(persona: AudiencePersona, platform: string): number {
    let baseCTR = 2.0;
    
    // Ajustements basés sur la persona
    if (persona.demographics.age.includes('25-34')) baseCTR += 0.3;
    if (persona.demographics.income.includes('high')) baseCTR += 0.2;
    
    // Ajustements basés sur la plateforme
    switch (platform) {
      case 'search': baseCTR += 0.5; break;
      case 'social': baseCTR += 0.3; break;
      case 'display': baseCTR -= 0.2; break;
    }

    return Math.round(baseCTR * 100) / 100;
  }

  private estimateCPC(persona: AudiencePersona, platform: string): number {
    let baseCPC = 1.50;
    
    // Ajustements basés sur la persona
    if (persona.demographics.income.includes('high')) baseCPC += 0.3;
    if (persona.demographics.location.includes('Paris')) baseCPC += 0.2;
    
    // Ajustements basés sur la plateforme
    switch (platform) {
      case 'search': baseCPC += 0.5; break;
      case 'social': baseCPC += 0.2; break;
      case 'display': baseCPC -= 0.3; break;
    }

    return Math.round(baseCPC * 100) / 100;
  }

  private initializeTemplates() {
    // Templates de base seront initialisés ici
  }

  private initializePersonas() {
    // Personas par défaut
    this.personas.set('gourmets', {
      id: 'gourmets',
      name: 'Gourmets Parisiens',
      demographics: {
        age: '35-50',
        gender: 'Mixed',
        income: 'High (80K+)',
        location: 'Paris & Suburbs'
      },
      psychographics: {
        interests: ['Fine dining', 'Wine', 'Culinary experiences'],
        values: ['Quality', 'Authenticity', 'Exclusivity'],
        lifestyle: ['Affluent', 'Social', 'Cultured'],
        painPoints: ['Limited time', 'Finding authentic experiences']
      },
      behavior: {
        onlineHabits: ['Restaurant reviews', 'Social media', 'Food blogs'],
        purchaseDrivers: ['Quality', 'Reputation', 'Experience'],
        preferredChannels: ['Online booking', 'Phone', 'Social media'],
        decisionMakers: ['Reviews', 'Recommendations', 'Chef reputation']
      },
      messaging: {
        toneOfVoice: 'Sophisticated but approachable',
        keyMessages: ['Exceptional culinary experience', 'Authentic French cuisine', 'Memorable occasions'],
        emotionalTriggers: ['Exclusivity', 'Quality', 'Prestige'],
        avoidWords: ['Cheap', 'Fast', 'Basic']
      }
    });

    this.personas.set('tourists', {
      id: 'tourists',
      name: 'International Tourists',
      demographics: {
        age: '25-45',
        gender: 'Mixed',
        income: 'Medium-High',
        location: 'International visitors'
      },
      psychographics: {
        interests: ['Travel', 'Culture', 'Local experiences'],
        values: ['Authenticity', 'Discovery', 'Memorable experiences'],
        lifestyle: ['Adventurous', 'Cultural', 'Experience-seekers'],
        painPoints: ['Language barriers', 'Finding authentic local food']
      },
      behavior: {
        onlineHabits: ['Travel apps', 'Reviews', 'Social sharing'],
        purchaseDrivers: ['Authenticity', 'Location', 'Reviews'],
        preferredChannels: ['Online booking', 'Apps', 'Hotel concierge'],
        decisionMakers: ['TripAdvisor', 'Google reviews', 'Recommendations']
      },
      messaging: {
        toneOfVoice: 'Welcoming and informative',
        keyMessages: ['Authentic Parisian dining', 'Tourist-friendly', 'Must-visit destination'],
        emotionalTriggers: ['Discovery', 'Authenticity', 'FOMO'],
        avoidWords: ['Tourist trap', 'Overpriced', 'Fake']
      }
    });
  }

  private initializeVideoTemplates() {
    // Templates vidéo seront initialisés ici
  }

  private async adaptToGoogleFormats(baseCreative: CreativeTemplate) {
    return [
      {
        platform: 'google',
        format: 'responsive_display',
        creative: { ...baseCreative, format: 'responsive_display' },
        optimizations: ['Auto-fit to any ad space', 'Machine learning optimization']
      },
      {
        platform: 'google',
        format: 'youtube_ads',
        creative: { ...baseCreative, format: 'video_ad' },
        optimizations: ['Skippable format', 'Bumper ad version', 'In-stream placement']
      }
    ];
  }

  private async adaptToMetaFormats(baseCreative: CreativeTemplate) {
    return [
      {
        platform: 'meta',
        format: 'instagram_stories',
        creative: { ...baseCreative, format: 'story_ad', dimensions: { width: 1080, height: 1920, aspectRatio: '9:16' } },
        optimizations: ['Full-screen immersion', 'Vertical video format', 'Interactive elements']
      },
      {
        platform: 'meta',
        format: 'facebook_carousel',
        creative: { ...baseCreative, format: 'carousel' },
        optimizations: ['Multiple product showcase', 'Swipe interaction', 'Individual CTAs']
      }
    ];
  }

  private async adaptToLinkedInFormats(baseCreative: CreativeTemplate) {
    return [
      {
        platform: 'linkedin',
        format: 'sponsored_content',
        creative: { ...baseCreative, format: 'display_banner' },
        optimizations: ['Professional tone', 'B2B messaging', 'Industry targeting']
      }
    ];
  }

  private async adaptToTikTokFormats(baseCreative: CreativeTemplate) {
    return [
      {
        platform: 'tiktok',
        format: 'in_feed_video',
        creative: { ...baseCreative, format: 'video_ad', dimensions: { width: 1080, height: 1920, aspectRatio: '9:16' } },
        optimizations: ['Native video format', 'Trendy music', 'Quick engagement']
      }
    ];
  }

  private generateCrossPlatformStrategy(baseCreative: CreativeTemplate) {
    return {
      consistency: [
        'Maintain brand colors across all platforms',
        'Keep core message consistent',
        'Use same logo and visual identity'
      ],
      adaptations: [
        'Adjust tone for platform culture',
        'Optimize dimensions for each format',
        'Adapt interaction patterns'
      ],
      messaging: [
        'Professional tone for LinkedIn',
        'Casual and engaging for TikTok',
        'Visual storytelling for Instagram',
        'Direct and informative for Google'
      ]
    };
  }

  private generatePersonaRecommendations(persona: AudiencePersona): string[] {
    return [
      `Pour ${persona.name}: Utiliser un ton ${persona.messaging.toneOfVoice}`,
      `Emphasize ${persona.messaging.emotionalTriggers.join(', ')} dans les créatifs`,
      `Eviter les mots: ${persona.messaging.avoidWords.join(', ')}`,
      `Cibler principalement: ${persona.behavior.preferredChannels.join(', ')}`
    ];
  }

  private estimateCreativePerformance(creatives: CreativeTemplate[]) {
    const performances = creatives.map(c => ({
      id: c.id,
      estimatedCTR: c.performance.estimatedCTR
    }));
    
    const bestPerforming = performances.reduce((best, current) => 
      current.estimatedCTR > best.estimatedCTR ? current : best
    );

    return {
      bestPerforming: bestPerforming.id,
      expectedCTR: bestPerforming.estimatedCTR,
      expectedConversions: Math.round(bestPerforming.estimatedCTR * 100)
    };
  }

  private analyzeCreativePerformance(creative: CreativeTemplate, metrics: any) {
    const insights = [];
    
    if (metrics.ctr > 3.0) {
      insights.push(`Créatif ${creative.name} performe excellemment (CTR: ${metrics.ctr}%)`);
    }
    
    if (metrics.cpc > 2.0) {
      insights.push(`Créatif ${creative.name} a un CPC élevé, considérer l'optimisation des enchères`);
    }

    return { insights };
  }

  private async generateSimilarVariations(creative: CreativeTemplate): Promise<CreativeVariation[]> {
    return [
      {
        id: `${creative.id}_similar_1`,
        baseTemplateId: creative.id,
        audienceId: creative.audienceTargeting[0],
        modifications: {
          headline: creative.elements.headline + ' - Offre Limitée',
          description: creative.elements.description,
          callToAction: creative.elements.callToAction
        },
        abTestConfig: {
          trafficSplit: 50,
          testDuration: 7,
          successMetrics: ['ctr', 'conversion_rate']
        }
      }
    ];
  }

  private async generateAlternativeApproaches(creative: CreativeTemplate): Promise<CreativeTemplate[]> {
    return [
      {
        ...creative,
        id: `${creative.id}_alt`,
        name: `${creative.name} - Alternative`,
        elements: {
          ...creative.elements,
          headline: 'Nouvelle Approche: ' + creative.elements.headline,
          colors: {
            ...creative.elements.colors,
            primary: '#e74c3c' // Couleur différente pour tester
          }
        }
      }
    ];
  }

  private extractKeywords(persona: AudiencePersona): string[] {
    const keywords = [];
    
    // Mots-clés basés sur les interests
    keywords.push(...persona.psychographics.interests);
    
    // Mots-clés basés sur les purchase drivers
    keywords.push(...persona.behavior.purchaseDrivers);
    
    // Mots-clés spécifiques au business
    keywords.push(
      this.config.business.name,
      this.config.business.industry,
      this.config.business.location
    );

    return [...new Set(keywords.map(k => k.toLowerCase()))];
  }

  private generateEmotionalHooks(persona: AudiencePersona): string[] {
    return persona.messaging.emotionalTriggers.map(trigger => {
      switch (trigger) {
        case 'exclusivity':
          return 'Expérience exclusive réservée aux connaisseurs';
        case 'urgency':
          return 'Réservez maintenant, places limitées';
        case 'quality':
          return 'Excellence culinaire garantie';
        case 'discovery':
          return 'Découvrez des saveurs uniques';
        case 'prestige':
          return 'Rejoignez une élite gastronomique';
        default:
          return `Profitez de notre ${trigger}`;
      }
    });
  }
}

export default CreativeGenerator;