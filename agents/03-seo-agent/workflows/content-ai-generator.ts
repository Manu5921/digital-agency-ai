/**
 * Content AI Generator - Phase 2 SEO Agent
 * Génération de contenu optimisé SEO avec GPT-4 + Claude
 * Templates sectoriels et optimisation automatique des mots-clés
 */

import { OpenAI } from 'openai';
import { ClaudeAPIService } from '../../../core/services/claude-api.service';

export interface ContentGenerationConfig {
  sector: 'restaurant' | 'ecommerce' | 'saas' | 'healthcare' | 'realestate' | 'finance';
  targetAudience: string[];
  brand: {
    name: string;
    tone: 'professional' | 'casual' | 'luxury' | 'technical' | 'friendly';
    values: string[];
  };
  seoParams: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
    targetLanguage: string;
    geoLocation?: string;
  };
}

export interface ContentTemplate {
  type: 'landing_page' | 'blog_post' | 'product_description' | 'service_page' | 'faq' | 'about_us';
  structure: {
    sections: string[];
    wordCount: { min: number; max: number };
    headingStructure: string[];
  };
  seoRequirements: {
    keywordDensity: number;
    headingKeywords: boolean;
    metaDescription: boolean;
    imageAltTexts: boolean;
  };
}

export interface GeneratedContent {
  title: string;
  metaDescription: string;
  content: string;
  headings: { level: number; text: string; keywords: string[] }[];
  imageAlts: string[];
  seoScore: number;
  keywordAnalysis: {
    density: Record<string, number>;
    placement: Record<string, string[]>;
    suggestions: string[];
  };
}

export class ContentAIGenerator {
  private openai: OpenAI;
  private claude: ClaudeAPIService;
  private sectorTemplates: Map<string, ContentTemplate[]>;

  constructor(
    openaiApiKey: string,
    claudeApiKey: string
  ) {
    this.openai = new OpenAI({ apiKey: openaiApiKey });
    this.claude = new ClaudeAPIService(claudeApiKey);
    this.initializeSectorTemplates();
  }

  /**
   * Initialise les templates par secteur d'activité
   */
  private initializeSectorTemplates(): void {
    this.sectorTemplates = new Map([
      ['restaurant', [
        {
          type: 'landing_page',
          structure: {
            sections: ['hero', 'menu_highlights', 'chef_story', 'ambiance', 'location', 'reservation'],
            wordCount: { min: 800, max: 1200 },
            headingStructure: ['h1', 'h2', 'h2', 'h2', 'h2', 'h2']
          },
          seoRequirements: {
            keywordDensity: 0.02,
            headingKeywords: true,
            metaDescription: true,
            imageAltTexts: true
          }
        },
        {
          type: 'blog_post',
          structure: {
            sections: ['introduction', 'main_content', 'chef_tips', 'seasonal_ingredients', 'conclusion'],
            wordCount: { min: 1000, max: 1500 },
            headingStructure: ['h1', 'h2', 'h3', 'h2', 'h2']
          },
          seoRequirements: {
            keywordDensity: 0.015,
            headingKeywords: true,
            metaDescription: true,
            imageAltTexts: true
          }
        }
      ]],
      ['ecommerce', [
        {
          type: 'product_description',
          structure: {
            sections: ['product_overview', 'features', 'benefits', 'specifications', 'usage', 'guarantee'],
            wordCount: { min: 300, max: 500 },
            headingStructure: ['h1', 'h2', 'h2', 'h3', 'h2', 'h2']
          },
          seoRequirements: {
            keywordDensity: 0.025,
            headingKeywords: true,
            metaDescription: true,
            imageAltTexts: true
          }
        }
      ]],
      ['saas', [
        {
          type: 'service_page',
          structure: {
            sections: ['value_proposition', 'features', 'use_cases', 'pricing', 'testimonials', 'cta'],
            wordCount: { min: 800, max: 1200 },
            headingStructure: ['h1', 'h2', 'h2', 'h2', 'h2', 'h2']
          },
          seoRequirements: {
            keywordDensity: 0.02,
            headingKeywords: true,
            metaDescription: true,
            imageAltTexts: true
          }
        }
      ]]
    ]);
  }

  /**
   * Génère du contenu optimisé SEO avec GPT-4
   */
  async generateContentWithGPT4(
    template: ContentTemplate,
    config: ContentGenerationConfig,
    customPrompt?: string
  ): Promise<GeneratedContent> {
    const sectorContext = this.getSectorContext(config.sector);
    const keywordString = [...config.seoParams.primaryKeywords, ...config.seoParams.secondaryKeywords].join(', ');

    const systemPrompt = `Tu es un expert en rédaction SEO spécialisé dans le secteur ${config.sector}.
    Ton objectif est de créer du contenu optimisé qui :
    - Intègre naturellement les mots-clés : ${keywordString}
    - Respecte la densité de mots-clés de ${template.seoRequirements.keywordDensity * 100}%
    - Adopte un ton ${config.brand.tone}
    - Cible l'audience : ${config.targetAudience.join(', ')}
    - Respecte les valeurs de la marque : ${config.brand.values.join(', ')}
    
    Structure requise : ${template.structure.sections.join(' → ')}
    Nombre de mots : ${template.structure.wordCount.min}-${template.structure.wordCount.max}
    
    ${sectorContext}`;

    const userPrompt = customPrompt || `Crée un contenu de type ${template.type} pour la marque ${config.brand.name}.
    
    Exigences spécifiques :
    1. Titre principal optimisé SEO avec mot-clé principal
    2. Meta description de 150-160 caractères
    3. Contenu structuré avec les sections demandées
    4. Intégration naturelle des mots-clés
    5. Appels à l'action appropriés
    6. Suggestions d'images avec alt-texts optimisés
    
    ${config.seoParams.geoLocation ? `Contexte géographique : ${config.seoParams.geoLocation}` : ''}
    
    Retourne le résultat au format JSON avec les champs : title, metaDescription, content, headings, imageAlts.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      });

      const generatedData = JSON.parse(response.choices[0].message.content!);
      
      // Analyse SEO du contenu généré
      const seoAnalysis = await this.analyzeSEOContent(generatedData.content, config.seoParams);
      
      return {
        ...generatedData,
        seoScore: seoAnalysis.score,
        keywordAnalysis: seoAnalysis.analysis
      };

    } catch (error) {
      console.error('Erreur génération GPT-4:', error);
      throw new Error(`Échec génération contenu GPT-4: ${error.message}`);
    }
  }

  /**
   * Améliore le contenu avec Claude pour la finition SEO
   */
  async enhanceContentWithClaude(
    baseContent: GeneratedContent,
    config: ContentGenerationConfig
  ): Promise<GeneratedContent> {
    const enhancementPrompt = `Analyse et améliore ce contenu SEO pour maximiser son potentiel de référencement :

    CONTENU ACTUEL :
    Titre: ${baseContent.title}
    Meta: ${baseContent.metaDescription}
    Score SEO actuel: ${baseContent.seoScore}/100
    
    CONTENU:
    ${baseContent.content}
    
    ANALYSE DES MOTS-CLÉS:
    ${JSON.stringify(baseContent.keywordAnalysis, null, 2)}
    
    OBJECTIFS D'AMÉLIORATION :
    1. Augmenter le score SEO à 90+
    2. Améliorer la densité des mots-clés sans sur-optimisation
    3. Optimiser la structure des titres H1-H6
    4. Enrichir le champ sémantique
    5. Améliorer la lisibilité et l'engagement
    
    CONTRAINTES :
    - Maintenir le ton ${config.brand.tone}
    - Conserver la longueur actuelle (±10%)
    - Garder la pertinence pour l'audience cible
    - Secteur : ${config.sector}
    
    Retourne le contenu amélioré au format JSON avec tous les champs originaux plus les améliorations.`;

    try {
      const enhancedContent = await this.claude.generateContent(enhancementPrompt);
      const enhancedData = JSON.parse(enhancedContent);
      
      // Nouvelle analyse SEO
      const newSeoAnalysis = await this.analyzeSEOContent(enhancedData.content, config.seoParams);
      
      return {
        ...enhancedData,
        seoScore: newSeoAnalysis.score,
        keywordAnalysis: newSeoAnalysis.analysis
      };

    } catch (error) {
      console.error('Erreur amélioration Claude:', error);
      return baseContent; // Retourne le contenu original en cas d'erreur
    }
  }

  /**
   * Pipeline complet de génération de contenu
   */
  async generateOptimizedContent(
    config: ContentGenerationConfig,
    contentType: ContentTemplate['type'],
    customPrompt?: string
  ): Promise<GeneratedContent> {
    // 1. Récupération du template
    const templates = this.sectorTemplates.get(config.sector);
    if (!templates) {
      throw new Error(`Templates non trouvés pour le secteur: ${config.sector}`);
    }
    
    const template = templates.find(t => t.type === contentType);
    if (!template) {
      throw new Error(`Template non trouvé pour le type: ${contentType}`);
    }

    // 2. Génération initiale avec GPT-4
    console.log('🚀 Génération initiale avec GPT-4...');
    const baseContent = await this.generateContentWithGPT4(template, config, customPrompt);
    
    // 3. Amélioration avec Claude si score < 85
    if (baseContent.seoScore < 85) {
      console.log('🔧 Amélioration avec Claude...');
      const enhancedContent = await this.enhanceContentWithClaude(baseContent, config);
      return enhancedContent;
    }
    
    return baseContent;
  }

  /**
   * Génération de contenu en lot pour une campagne
   */
  async generateContentBatch(
    config: ContentGenerationConfig,
    contentTypes: ContentTemplate['type'][],
    batchOptions?: {
      parallelProcessing?: boolean;
      qualityThreshold?: number;
    }
  ): Promise<Record<string, GeneratedContent>> {
    const options = {
      parallelProcessing: true,
      qualityThreshold: 85,
      ...batchOptions
    };

    const results: Record<string, GeneratedContent> = {};

    if (options.parallelProcessing) {
      // Traitement parallèle
      const promises = contentTypes.map(async (type) => {
        const content = await this.generateOptimizedContent(config, type);
        return { type, content };
      });

      const resolvedContents = await Promise.all(promises);
      resolvedContents.forEach(({ type, content }) => {
        results[type] = content;
      });
    } else {
      // Traitement séquentiel
      for (const type of contentTypes) {
        console.log(`📝 Génération ${type}...`);
        results[type] = await this.generateOptimizedContent(config, type);
      }
    }

    return results;
  }

  /**
   * Analyse SEO du contenu généré
   */
  private async analyzeSEOContent(
    content: string,
    seoParams: ContentGenerationConfig['seoParams']
  ): Promise<{ score: number; analysis: any }> {
    const words = content.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    
    const keywordAnalysis = {
      density: {} as Record<string, number>,
      placement: {} as Record<string, string[]>,
      suggestions: [] as string[]
    };

    // Analyse de densité des mots-clés
    [...seoParams.primaryKeywords, ...seoParams.secondaryKeywords].forEach(keyword => {
      const keywordCount = content.toLowerCase().split(keyword.toLowerCase()).length - 1;
      const density = keywordCount / totalWords;
      keywordAnalysis.density[keyword] = parseFloat((density * 100).toFixed(2));
      
      // Placement des mots-clés
      const placements = [];
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        if (content.substring(0, 200).toLowerCase().includes(keyword.toLowerCase())) {
          placements.push('introduction');
        }
        if (content.substring(content.length - 200).toLowerCase().includes(keyword.toLowerCase())) {
          placements.push('conclusion');
        }
        placements.push('body');
      }
      keywordAnalysis.placement[keyword] = placements;
    });

    // Calcul du score SEO (simplifié)
    let score = 70; // Score de base

    // Bonus pour densité appropriée (1-3%)
    const avgDensity = Object.values(keywordAnalysis.density).reduce((a, b) => a + b, 0) / Object.keys(keywordAnalysis.density).length;
    if (avgDensity >= 1 && avgDensity <= 3) score += 15;
    else if (avgDensity > 0.5 && avgDensity < 4) score += 10;

    // Bonus pour longueur appropriée
    if (totalWords >= 300 && totalWords <= 2000) score += 10;

    // Bonus pour structure (présence de titres H2, H3)
    if (content.includes('##') || content.includes('###')) score += 5;

    return {
      score: Math.min(score, 100),
      analysis: keywordAnalysis
    };
  }

  /**
   * Contexte spécifique par secteur
   */
  private getSectorContext(sector: string): string {
    const contexts = {
      restaurant: `Context gastronomique :
        - Mets l'accent sur l'expérience culinaire et l'ambiance
        - Intègre des éléments sensoriels (goût, arôme, présentation)
        - Mentionne l'expertise du chef et l'origine des produits
        - Crée un sentiment d'urgence pour les réservations`,
      
      ecommerce: `Context e-commerce :
        - Focus sur les bénéfices produits et la satisfaction client
        - Intègre des éléments de réassurance (garantie, livraison)
        - Utilise un langage persuasif et orienté conversion
        - Mentionne les avis clients et preuves sociales`,
      
      saas: `Context SaaS :
        - Met l'accent sur la valeur métier et le ROI
        - Utilise un langage technique mais accessible
        - Intègre des cas d'usage concrets et métriques
        - Focus sur l'efficacité et la scalabilité`
    };

    return contexts[sector] || 'Context général business.';
  }

  /**
   * Templates prédéfinis par secteur
   */
  getSectorTemplates(sector: string): ContentTemplate[] {
    return this.sectorTemplates.get(sector) || [];
  }

  /**
   * Génération de meta descriptions optimisées
   */
  async generateMetaDescriptions(
    titles: string[],
    keywords: string[],
    businessName: string
  ): Promise<string[]> {
    const prompt = `Génère des meta descriptions optimisées SEO (150-160 caractères) pour ces titres :
    
    Titres : ${titles.join(', ')}
    Mots-clés à intégrer : ${keywords.join(', ')}
    Nom de l'entreprise : ${businessName}
    
    Exigences :
    - 150-160 caractères exactement
    - Inclure un appel à l'action
    - Intégrer naturellement 1-2 mots-clés
    - Ton engageant et descriptif
    
    Retourne un tableau JSON de meta descriptions.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content!);
      return result.metaDescriptions || [];
    } catch (error) {
      console.error('Erreur génération meta descriptions:', error);
      return [];
    }
  }
}

// Configuration par défaut
export const defaultContentConfig: ContentGenerationConfig = {
  sector: 'restaurant',
  targetAudience: ['food lovers', 'couples', 'business professionals'],
  brand: {
    name: 'Le Gourmet',
    tone: 'luxury',
    values: ['excellence', 'tradition', 'innovation']
  },
  seoParams: {
    primaryKeywords: ['restaurant gastronomique paris', 'cuisine française étoilée'],
    secondaryKeywords: ['chef étoilé', 'restaurant michelin', 'gastronomie française'],
    targetLanguage: 'fr',
    geoLocation: 'Paris, France'
  }
};

// Export instance configurée
export default new ContentAIGenerator(
  process.env.OPENAI_API_KEY!,
  process.env.CLAUDE_API_KEY!
);