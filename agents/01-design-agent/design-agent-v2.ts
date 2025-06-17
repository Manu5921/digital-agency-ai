/**
 * Design Agent V2 - Phase 2 Extensions
 * Orchestrateur principal avec toutes les nouvelles fonctionnalités
 */

import { FigmaMCPService } from './workflows/figma-integration';
import { AIImageGenerator, SectorImageService } from './workflows/ai-image-generator';
import { DesignSystem, DesignSystemFactory } from './workflows/design-system';
import SanteTemplate from './templates/sante-template';
import FinanceTemplate from './templates/finance-template';
import ELearningTemplate from './templates/elearning-template';
import ImmobilierTemplate from './templates/immobilier-template';
import TechTemplate from './templates/tech-template';

export interface DesignAgentV2Config {
  // Configuration existante
  name: string;
  sector: 'restaurant' | 'sante' | 'finance' | 'elearning' | 'immobilier' | 'tech';
  style: 'classique' | 'moderne' | 'minimaliste';
  
  // Nouvelles configurations
  apiKeys: {
    figma?: string;
    openai?: string;
  };
  
  preferences: {
    useAIImages: boolean;
    figmaIntegration: boolean;
    generateVariations: boolean;
    exportFormats: ('html' | 'css' | 'figma-tokens' | 'tailwind')[];
  };
  
  branding: {
    businessName: string;
    primaryColor: string;
    brandPersonality: 'professional' | 'creative' | 'minimal' | 'luxury' | 'friendly';
  };
}

export interface DesignProjectResult {
  success: boolean;
  projectName: string;
  sector: string;
  style: string;
  
  // Assets générés
  templates: {
    main: { html: string; css: string };
    variations?: Array<{ style: string; html: string; css: string }>;
  };
  
  images: {
    generated: Array<{
      type: string;
      url: string;
      alt: string;
      optimized: boolean;
    }>;
    fallbacks: Array<{
      type: string;
      url: string;
      alt: string;
    }>;
  };
  
  designSystem: {
    tokens: any;
    css: string;
    tailwindConfig: any;
    figmaTokens?: string;
  };
  
  figmaImport?: {
    success: boolean;
    components: Array<{ name: string; html: string; css: string }>;
    tokens: any;
  };
  
  // Métriques
  metrics: {
    generationTime: number;
    imageCount: number;
    templateVariations: number;
    designTokens: number;
    optimizationScore: number;
  };
  
  // Export
  exports: {
    [format: string]: string;
  };
}

export class DesignAgentV2 {
  private config: DesignAgentV2Config;
  private figmaService?: FigmaMCPService;
  private imageService?: SectorImageService;
  private designSystem: DesignSystem;
  
  constructor(config: DesignAgentV2Config) {
    this.config = config;
    
    // Initialisation des services selon la configuration
    if (config.preferences.figmaIntegration && config.apiKeys.figma) {
      this.figmaService = new FigmaMCPService(config.apiKeys.figma);
    }
    
    if (config.preferences.useAIImages && config.apiKeys.openai) {
      this.imageService = new SectorImageService(config.apiKeys.openai);
    }
    
    // Initialisation du système de design
    this.designSystem = DesignSystemFactory.createSectorDesignSystem(
      config.sector,
      config.branding.businessName,
      config.branding.primaryColor,
      config.style
    );
  }

  /**
   * Génère un projet de design complet
   */
  async generateCompleteProject(figmaUrl?: string): Promise<DesignProjectResult> {
    const startTime = Date.now();
    
    try {
      console.log(`🎨 Design Agent V2 - Démarrage du projet ${this.config.branding.businessName}`);
      
      // 1. Import Figma (optionnel)
      let figmaImport;
      if (this.figmaService && figmaUrl) {
        console.log('📐 Import depuis Figma...');
        figmaImport = await this.importFromFigma(figmaUrl);
      }
      
      // 2. Génération des templates
      console.log('🏗️ Génération des templates...');
      const templates = await this.generateTemplates();
      
      // 3. Génération des images
      console.log('🖼️ Génération des images...');
      const images = await this.generateImages();
      
      // 4. Génération du système de design
      console.log('🎨 Génération du design system...');
      const designSystemResult = this.generateDesignSystem();
      
      // 5. Optimisations et exports
      console.log('⚡ Optimisations et exports...');
      const exports = this.generateExports(templates, designSystemResult);
      
      // 6. Calcul des métriques
      const metrics = this.calculateMetrics(templates, images, designSystemResult, startTime);
      
      const result: DesignProjectResult = {
        success: true,
        projectName: this.config.branding.businessName,
        sector: this.config.sector,
        style: this.config.style,
        templates,
        images,
        designSystem: designSystemResult,
        figmaImport,
        metrics,
        exports
      };
      
      console.log('✅ Projet généré avec succès!');
      console.log(`⏱️ Temps total: ${metrics.generationTime}ms`);
      console.log(`📊 Score d'optimisation: ${metrics.optimizationScore}%`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Erreur lors de la génération:', error);
      
      return {
        success: false,
        projectName: this.config.branding.businessName,
        sector: this.config.sector,
        style: this.config.style,
        templates: { main: { html: '', css: '' } },
        images: { generated: [], fallbacks: [] },
        designSystem: { tokens: {}, css: '', tailwindConfig: {} },
        metrics: {
          generationTime: Date.now() - startTime,
          imageCount: 0,
          templateVariations: 0,
          designTokens: 0,
          optimizationScore: 0
        },
        exports: {}
      };
    }
  }

  /**
   * Import depuis Figma
   */
  private async importFromFigma(figmaUrl: string): Promise<DesignProjectResult['figmaImport']> {
    if (!this.figmaService) {
      throw new Error('Service Figma non configuré');
    }

    try {
      const result = await this.figmaService.importFromFigmaUrl(figmaUrl);
      
      if (!result.success || !result.data) {
        return {
          success: false,
          components: [],
          tokens: {}
        };
      }

      return {
        success: true,
        components: result.data.components,
        tokens: result.data.tokens
      };
    } catch (error) {
      console.error('Erreur import Figma:', error);
      return {
        success: false,
        components: [],
        tokens: {}
      };
    }
  }

  /**
   * Génère les templates selon le secteur
   */
  private async generateTemplates(): Promise<DesignProjectResult['templates']> {
    const templateConfig = this.getTemplateConfig();
    let mainTemplate: { html: string; css: string };
    const variations: Array<{ style: string; html: string; css: string }> = [];

    // Génération du template principal
    switch (this.config.sector) {
      case 'sante':
        const santeTemplate = new SanteTemplate(templateConfig);
        mainTemplate = {
          html: santeTemplate.generateHTMLTemplate(),
          css: santeTemplate.generateHealthColorPalette().toString()
        };
        break;
        
      case 'finance':
        const financeTemplate = new FinanceTemplate(templateConfig);
        mainTemplate = {
          html: financeTemplate.generateHTMLTemplate(),
          css: financeTemplate.generateFinanceColorPalette().toString()
        };
        break;
        
      case 'elearning':
        const elearningTemplate = new ELearningTemplate(templateConfig);
        mainTemplate = {
          html: elearningTemplate.generateHTMLTemplate(),
          css: elearningTemplate.generateELearningColorPalette().toString()
        };
        break;
        
      case 'immobilier':
        const immobilierTemplate = new ImmobilierTemplate(templateConfig);
        mainTemplate = {
          html: immobilierTemplate.generateHTMLTemplate(),
          css: immobilierTemplate.generateRealEstateColorPalette().toString()
        };
        break;
        
      case 'tech':
        const techTemplate = new TechTemplate(templateConfig);
        mainTemplate = {
          html: techTemplate.generateHTMLTemplate(),
          css: techTemplate.generateTechColorPalette().toString()
        };
        break;
        
      default:
        // Fallback vers restaurant template existant
        mainTemplate = {
          html: this.generateFallbackTemplate(),
          css: this.generateFallbackCSS()
        };
    }

    // Génération des variations si demandées
    if (this.config.preferences.generateVariations) {
      const styles: Array<'classique' | 'moderne' | 'minimaliste'> = ['classique', 'moderne', 'minimaliste'];
      
      for (const style of styles) {
        if (style !== this.config.style) {
          const variationConfig = { ...templateConfig, style };
          const variation = await this.generateTemplateVariation(variationConfig);
          variations.push({
            style,
            html: variation.html,
            css: variation.css
          });
        }
      }
    }

    return {
      main: mainTemplate,
      variations: variations.length > 0 ? variations : undefined
    };
  }

  /**
   * Génère les images pour le projet
   */
  private async generateImages(): Promise<DesignProjectResult['images']> {
    const images = {
      generated: [] as Array<{ type: string; url: string; alt: string; optimized: boolean }>,
      fallbacks: [] as Array<{ type: string; url: string; alt: string }>
    };

    if (this.imageService && this.config.preferences.useAIImages) {
      try {
        const result = await this.imageService.generateProjectImagePack(
          this.config.sector,
          this.config.branding.businessName,
          true
        );

        if (result.success && !result.fallbackUsed) {
          images.generated = result.images.map(img => ({
            type: img.type,
            url: img.url,
            alt: img.alt,
            optimized: true
          }));
        } else {
          // Utilise les fallbacks
          images.fallbacks = result.images.map(img => ({
            type: img.type,
            url: img.optimizedUrls.webp,
            alt: img.alt
          }));
        }
      } catch (error) {
        console.error('Erreur génération images:', error);
        // Génère des images placeholder
        images.fallbacks = this.generatePlaceholderImages();
      }
    } else {
      // Utilise des images placeholder
      images.fallbacks = this.generatePlaceholderImages();
    }

    return images;
  }

  /**
   * Génère le système de design
   */
  private generateDesignSystem(): DesignProjectResult['designSystem'] {
    const designSystemResult = this.designSystem.generateCompleteDesignSystem();
    
    const result: DesignProjectResult['designSystem'] = {
      tokens: designSystemResult.tokens,
      css: designSystemResult.css,
      tailwindConfig: designSystemResult.tailwindConfig
    };

    // Génération des tokens Figma si demandé
    if (this.config.preferences.exportFormats.includes('figma-tokens')) {
      result.figmaTokens = this.designSystem.exportDesignSystem('figma-tokens');
    }

    return result;
  }

  /**
   * Génère les exports dans différents formats
   */
  private generateExports(
    templates: DesignProjectResult['templates'],
    designSystem: DesignProjectResult['designSystem']
  ): DesignProjectResult['exports'] {
    const exports: DesignProjectResult['exports'] = {};

    this.config.preferences.exportFormats.forEach(format => {
      switch (format) {
        case 'html':
          exports[format] = templates.main.html;
          break;
          
        case 'css':
          exports[format] = designSystem.css;
          break;
          
        case 'tailwind':
          exports[format] = JSON.stringify(designSystem.tailwindConfig, null, 2);
          break;
          
        case 'figma-tokens':
          if (designSystem.figmaTokens) {
            exports[format] = designSystem.figmaTokens;
          }
          break;
      }
    });

    return exports;
  }

  /**
   * Calcule les métriques de performance
   */
  private calculateMetrics(
    templates: DesignProjectResult['templates'],
    images: DesignProjectResult['images'],
    designSystem: DesignProjectResult['designSystem'],
    startTime: number
  ): DesignProjectResult['metrics'] {
    const generationTime = Date.now() - startTime;
    const imageCount = images.generated.length + images.fallbacks.length;
    const templateVariations = (templates.variations?.length || 0) + 1;
    const designTokens = designSystem.tokens.length || 0;
    
    // Score d'optimisation basé sur plusieurs facteurs
    let optimizationScore = 100;
    
    // Pénalité si pas d'images optimisées
    if (images.generated.length === 0 && images.fallbacks.length > 0) {
      optimizationScore -= 20;
    }
    
    // Bonus pour les variations
    if (templateVariations > 1) {
      optimizationScore += 10;
    }
    
    // Bonus pour un système de design complet
    if (designTokens > 50) {
      optimizationScore += 15;
    }
    
    // Pénalité si génération trop longue
    if (generationTime > 30000) { // 30 secondes
      optimizationScore -= 10;
    }

    return {
      generationTime,
      imageCount,
      templateVariations,
      designTokens,
      optimizationScore: Math.max(0, Math.min(100, optimizationScore))
    };
  }

  /**
   * Méthodes utilitaires
   */
  private getTemplateConfig(): any {
    const baseConfig = {
      businessName: this.config.branding.businessName,
      style: this.config.style,
      colors: {
        primary: this.config.branding.primaryColor,
        secondary: '',
        accent: '',
        trust: '',
        success: ''
      },
      features: []
    };

    // Adaptation selon le secteur
    switch (this.config.sector) {
      case 'sante':
        return {
          ...baseConfig,
          speciality: 'Médecine générale'
        };
        
      case 'finance':
        return {
          ...baseConfig,
          serviceType: 'conseil'
        };
        
      case 'elearning':
        return {
          ...baseConfig,
          platformName: this.config.branding.businessName,
          targetAudience: 'professionals'
        };
        
      case 'immobilier':
        return {
          ...baseConfig,
          agencyName: this.config.branding.businessName,
          serviceType: 'mixte'
        };
        
      case 'tech':
        return {
          ...baseConfig,
          companyName: this.config.branding.businessName,
          techType: 'startup'
        };
        
      default:
        return baseConfig;
    }
  }

  private async generateTemplateVariation(config: any): Promise<{ html: string; css: string }> {
    // Génère une variation du template avec un style différent
    // Implémentation simplifiée pour la démo
    return {
      html: `<!-- Variation ${config.style} pour ${config.businessName} -->`,
      css: `/* CSS pour variation ${config.style} */`
    };
  }

  private generateFallbackTemplate(): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.branding.businessName}</title>
</head>
<body>
    <h1>Bienvenue chez ${this.config.branding.businessName}</h1>
    <p>Template de fallback pour le secteur ${this.config.sector}</p>
</body>
</html>`;
  }

  private generateFallbackCSS(): string {
    return `
body {
    font-family: Inter, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #fafafa;
}

h1 {
    color: ${this.config.branding.primaryColor};
    font-size: 2rem;
    margin-bottom: 1rem;
}

p {
    color: #666;
    line-height: 1.6;
}
`;
  }

  private generatePlaceholderImages(): Array<{ type: string; url: string; alt: string }> {
    const placeholders = [
      { type: 'hero', url: 'https://via.placeholder.com/1200x600', alt: 'Image hero' },
      { type: 'feature', url: 'https://via.placeholder.com/400x300', alt: 'Image feature' },
      { type: 'gallery', url: 'https://via.placeholder.com/300x200', alt: 'Image galerie' }
    ];

    return placeholders;
  }

  /**
   * Méthodes publiques pour interaction
   */
  
  /**
   * Met à jour la configuration
   */
  updateConfig(newConfig: Partial<DesignAgentV2Config>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Réinitialise les services si nécessaire
    if (newConfig.apiKeys?.figma && newConfig.preferences?.figmaIntegration) {
      this.figmaService = new FigmaMCPService(newConfig.apiKeys.figma);
    }
    
    if (newConfig.apiKeys?.openai && newConfig.preferences?.useAIImages) {
      this.imageService = new SectorImageService(newConfig.apiKeys.openai);
    }
  }

  /**
   * Génère uniquement les images
   */
  async generateImagesOnly(): Promise<DesignProjectResult['images']> {
    return this.generateImages();
  }

  /**
   * Génère uniquement le système de design
   */
  generateDesignSystemOnly(): DesignProjectResult['designSystem'] {
    return this.generateDesignSystem();
  }

  /**
   * Exporte un template dans un format spécifique
   */
  exportTemplate(template: { html: string; css: string }, format: 'html' | 'zip' | 'pdf'): string {
    switch (format) {
      case 'html':
        return template.html;
      case 'zip':
        // Logique de création de ZIP
        return 'data:application/zip;base64,'; // Placeholder
      case 'pdf':
        // Logique de conversion PDF
        return 'data:application/pdf;base64,'; // Placeholder
      default:
        return template.html;
    }
  }

  /**
   * Obtient les statistiques de performance
   */
  getPerformanceStats(): {
    averageGenerationTime: number;
    successRate: number;
    optimizationScore: number;
  } {
    // Implémentation basique pour la démo
    return {
      averageGenerationTime: 15000, // 15 secondes
      successRate: 95,
      optimizationScore: 88
    };
  }
}

/**
 * Factory pour créer rapidement un Design Agent V2
 */
export class DesignAgentV2Factory {
  static createForSector(
    sector: DesignAgentV2Config['sector'],
    businessName: string,
    options: {
      style?: DesignAgentV2Config['style'];
      primaryColor?: string;
      useAI?: boolean;
      apiKeys?: DesignAgentV2Config['apiKeys'];
    } = {}
  ): DesignAgentV2 {
    const config: DesignAgentV2Config = {
      name: `${businessName} Design Project`,
      sector,
      style: options.style || 'moderne',
      
      apiKeys: options.apiKeys || {},
      
      preferences: {
        useAIImages: options.useAI || false,
        figmaIntegration: !!options.apiKeys?.figma,
        generateVariations: true,
        exportFormats: ['html', 'css', 'tailwind']
      },
      
      branding: {
        businessName,
        primaryColor: options.primaryColor || '#3b82f6',
        brandPersonality: 'professional'
      }
    };

    return new DesignAgentV2(config);
  }

  /**
   * Configuration rapide pour MVP
   */
  static createMVP(businessName: string, sector: DesignAgentV2Config['sector']): DesignAgentV2 {
    return this.createForSector(sector, businessName, {
      style: 'moderne',
      primaryColor: '#3b82f6',
      useAI: false
    });
  }

  /**
   * Configuration premium avec toutes les fonctionnalités
   */
  static createPremium(
    businessName: string, 
    sector: DesignAgentV2Config['sector'],
    apiKeys: DesignAgentV2Config['apiKeys']
  ): DesignAgentV2 {
    return this.createForSector(sector, businessName, {
      style: 'moderne',
      primaryColor: '#3b82f6',
      useAI: true,
      apiKeys
    });
  }
}

export default DesignAgentV2;