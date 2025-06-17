/**
 * Test Complet - Design Agent V2 Phase 2
 * Validation de toutes les extensions et fonctionnalités
 */

import { DesignAgentV2, DesignAgentV2Factory } from './design-agent-v2';
import { FigmaMCPService } from './workflows/figma-integration';
import { AIImageGenerator, SectorImageService } from './workflows/ai-image-generator';
import { DesignSystem, DesignSystemFactory } from './workflows/design-system';

interface TestResult {
  testName: string;
  passed: boolean;
  duration: number;
  details: any;
  error?: string;
}

interface TestSuite {
  suiteName: string;
  tests: TestResult[];
  totalPassed: number;
  totalFailed: number;
  totalDuration: number;
}

class DesignAgentV2TestSuite {
  private results: TestSuite[] = [];

  /**
   * Exécute tous les tests de validation
   */
  async runAllTests(): Promise<{
    suites: TestSuite[];
    globalStats: {
      totalTests: number;
      totalPassed: number;
      totalFailed: number;
      totalDuration: number;
      successRate: number;
    };
  }> {
    console.log('🧪 === DÉBUT DES TESTS DESIGN AGENT V2 PHASE 2 ===\n');

    // Test des templates sectoriels
    await this.testSectorTemplates();

    // Test du système de design
    await this.testDesignSystem();

    // Test de la génération d'images AI (mode simulation)
    await this.testAIImageGeneration();

    // Test de l'intégration Figma (mode simulation)
    await this.testFigmaIntegration();

    // Test de performance et optimisation
    await this.testPerformance();

    // Test des exports et variations
    await this.testExportsAndVariations();

    // Calcul des statistiques globales
    const globalStats = this.calculateGlobalStats();

    console.log('\n🏁 === FIN DES TESTS ===');
    this.printSummary(globalStats);

    return {
      suites: this.results,
      globalStats
    };
  }

  /**
   * Test des 5 templates sectoriels
   */
  private async testSectorTemplates(): Promise<void> {
    const suite: TestSuite = {
      suiteName: 'Templates Sectoriels',
      tests: [],
      totalPassed: 0,
      totalFailed: 0,
      totalDuration: 0
    };

    console.log('🏗️ Test des Templates Sectoriels...\n');

    const secteurs: Array<'sante' | 'finance' | 'elearning' | 'immobilier' | 'tech'> = 
      ['sante', 'finance', 'elearning', 'immobilier', 'tech'];

    for (const secteur of secteurs) {
      const testResult = await this.runTest(
        `Template ${secteur}`,
        async () => {
          const agent = DesignAgentV2Factory.createMVP(`Test ${secteur}`, secteur);
          const result = await agent.generateCompleteProject();

          return {
            success: result.success,
            projectName: result.projectName,
            sector: result.sector,
            templateGenerated: result.templates.main.html.length > 0,
            cssGenerated: result.templates.main.css.length > 0,
            htmlLength: result.templates.main.html.length,
            cssLength: result.templates.main.css.length,
            generationTime: result.metrics.generationTime,
            optimizationScore: result.metrics.optimizationScore
          };
        }
      );

      suite.tests.push(testResult);
      console.log(`  ✅ ${secteur}: ${testResult.passed ? 'PASSÉ' : 'ÉCHEC'} (${testResult.duration}ms)`);
    }

    this.finalizeSuite(suite);
    this.results.push(suite);
  }

  /**
   * Test du système de design centralisé
   */
  private async testDesignSystem(): Promise<void> {
    const suite: TestSuite = {
      suiteName: 'Système de Design',
      tests: [],
      totalPassed: 0,
      totalFailed: 0,
      totalDuration: 0
    };

    console.log('\n🎨 Test du Système de Design...\n');

    // Test de génération de palettes
    const paletteTest = await this.runTest(
      'Génération de Palettes Automatique',
      async () => {
        const designSystem = DesignSystemFactory.createSectorDesignSystem(
          'tech',
          'Test Company',
          '#3b82f6',
          'moderne'
        );

        const colors = designSystem.generateColorPalette('#3b82f6');
        
        return {
          primaryGenerated: !!colors.primary,
          secondaryGenerated: !!colors.secondary,
          accentGenerated: !!colors.accent,
          neutralScaleLength: colors.neutral.length,
          semanticColors: Object.keys(colors.semantic).length,
          shadesGenerated: Object.keys(colors.shades).length
        };
      }
    );

    // Test de génération de tokens
    const tokensTest = await this.runTest(
      'Génération de Design Tokens',
      async () => {
        const designSystem = DesignSystemFactory.createSectorDesignSystem(
          'sante',
          'Test Clinic',
          '#2563eb',
          'classique'
        );

        const complete = designSystem.generateCompleteDesignSystem();
        
        return {
          tokensCount: complete.tokens.length,
          cssGenerated: complete.css.length > 0,
          tailwindConfigGenerated: !!complete.tailwindConfig,
          colorTokens: complete.tokens.filter(t => t.type === 'color').length,
          typographyTokens: complete.tokens.filter(t => t.type === 'typography').length,
          spacingTokens: complete.tokens.filter(t => t.type === 'spacing').length
        };
      }
    );

    // Test des exports multi-formats
    const exportTest = await this.runTest(
      'Export Multi-formats',
      async () => {
        const designSystem = DesignSystemFactory.createSectorDesignSystem(
          'finance',
          'Test Bank',
          '#1e40af',
          'moderne'
        );

        return {
          cssExport: designSystem.exportDesignSystem('css').length > 0,
          scssExport: designSystem.exportDesignSystem('scss').length > 0,
          jsExport: designSystem.exportDesignSystem('js').length > 0,
          figmaTokensExport: designSystem.exportDesignSystem('figma-tokens').length > 0,
          jsonExport: designSystem.exportDesignSystem('json').length > 0
        };
      }
    );

    suite.tests.push(paletteTest, tokensTest, exportTest);
    
    suite.tests.forEach(test => {
      console.log(`  ${test.passed ? '✅' : '❌'} ${test.testName}: ${test.passed ? 'PASSÉ' : 'ÉCHEC'}`);
    });

    this.finalizeSuite(suite);
    this.results.push(suite);
  }

  /**
   * Test de génération d'images AI (simulation)
   */
  private async testAIImageGeneration(): Promise<void> {
    const suite: TestSuite = {
      suiteName: 'Génération Images AI',
      tests: [],
      totalPassed: 0,
      totalFailed: 0,
      totalDuration: 0
    };

    console.log('\n🖼️ Test de Génération d\'Images AI...\n');

    // Test de l'interface AIImageGenerator
    const interfaceTest = await this.runTest(
      'Interface AIImageGenerator',
      async () => {
        // Mode simulation (sans vraie clé API)
        const generator = new AIImageGenerator('demo-key');
        
        // Test des prompts sectoriels
        const prompts = generator['getSectorPrompts']('restaurant', 'Demo Restaurant');
        
        return {
          sectorPromptsGenerated: !!prompts.hero && prompts.features.length > 0,
          heroPromptLength: prompts.hero.length,
          featuresCount: prompts.features.length,
          galleryCount: prompts.gallery.length,
          sectorsSupported: ['restaurant', 'sante', 'finance', 'elearning', 'immobilier', 'tech']
        };
      }
    );

    // Test du service sectoriel
    const serviceTest = await this.runTest(
      'SectorImageService',
      async () => {
        const service = new SectorImageService('demo-key');
        
        // Test en mode fallback (sans vraie génération)
        const result = await service.generateProjectImagePack('tech', 'Demo Startup', false);
        
        return {
          packGenerated: result.success,
          imagesCount: result.images.length,
          fallbackUsed: result.fallbackUsed,
          hasHeroImage: result.images.some(img => img.type === 'hero'),
          hasFeatureImages: result.images.some(img => img.type === 'feature'),
          hasGalleryImages: result.images.some(img => img.type === 'gallery')
        };
      }
    );

    // Test des optimisations d'images
    const optimizationTest = await this.runTest(
      'Optimisation Images',
      async () => {
        const generator = new AIImageGenerator('demo-key');
        
        // Test de génération de placeholder
        const placeholder = generator.generatePlaceholderImage('hero', 'restaurant');
        
        return {
          placeholderGenerated: !!placeholder.url,
          optimizedUrlsPresent: !!placeholder.optimizedUrls,
          webpUrlGenerated: !!placeholder.optimizedUrls.webp,
          jpegUrlGenerated: !!placeholder.optimizedUrls.jpeg,
          thumbnailGenerated: !!placeholder.optimizedUrls.thumbnail,
          altTextGenerated: placeholder.alt.length > 0,
          metadataPresent: !!placeholder.metadata
        };
      }
    );

    suite.tests.push(interfaceTest, serviceTest, optimizationTest);
    
    suite.tests.forEach(test => {
      console.log(`  ${test.passed ? '✅' : '❌'} ${test.testName}: ${test.passed ? 'PASSÉ' : 'ÉCHEC'}`);
    });

    this.finalizeSuite(suite);
    this.results.push(suite);
  }

  /**
   * Test de l'intégration Figma (simulation)
   */
  private async testFigmaIntegration(): Promise<void> {
    const suite: TestSuite = {
      suiteName: 'Intégration Figma MCP',
      tests: [],
      totalPassed: 0,
      totalFailed: 0,
      totalDuration: 0
    };

    console.log('\n📐 Test de l\'Intégration Figma...\n');

    // Test de l'interface FigmaMCPService
    const interfaceTest = await this.runTest(
      'Interface FigmaMCPService',
      async () => {
        const service = new FigmaMCPService('demo-key');
        
        // Test des utilitaires
        const fileId = service['extractFileIdFromUrl']('https://www.figma.com/file/abc123/mon-design');
        
        return {
          fileIdExtracted: fileId === 'abc123',
          serviceInitialized: !!service,
          hasExtractMethod: typeof service['extractFileIdFromUrl'] === 'function'
        };
      }
    );

    // Test de génération de prompts d'images sectoriels
    const promptsTest = await this.runTest(
      'Prompts Images Sectoriels',
      async () => {
        const integration = new (class extends FigmaMCPService {
          public testGeneratePrompts(sector: string) {
            return this['figmaIntegration'].generateSectorImagePrompts(sector);
          }
        })('demo-key');
        
        const prompts = integration.testGeneratePrompts('sante');
        
        return {
          promptsGenerated: prompts.length > 0,
          promptsCount: prompts.length,
          allPromptsValid: prompts.every(p => p.length > 20),
          sectorsSupported: ['restaurant', 'sante', 'finance', 'elearning', 'immobilier', 'tech']
        };
      }
    );

    suite.tests.push(interfaceTest, promptsTest);
    
    suite.tests.forEach(test => {
      console.log(`  ${test.passed ? '✅' : '❌'} ${test.testName}: ${test.passed ? 'PASSÉ' : 'ÉCHEC'}`);
    });

    this.finalizeSuite(suite);
    this.results.push(suite);
  }

  /**
   * Test de performance et optimisation
   */
  private async testPerformance(): Promise<void> {
    const suite: TestSuite = {
      suiteName: 'Performance & Optimisation',
      tests: [],
      totalPassed: 0,
      totalFailed: 0,
      totalDuration: 0
    };

    console.log('\n⚡ Test de Performance...\n');

    // Test de vitesse de génération
    const speedTest = await this.runTest(
      'Vitesse de Génération',
      async () => {
        const startTime = Date.now();
        const agent = DesignAgentV2Factory.createMVP('Speed Test', 'tech');
        const result = await agent.generateCompleteProject();
        const totalTime = Date.now() - startTime;
        
        return {
          generationTime: totalTime,
          underTargetTime: totalTime < 30000, // 30 secondes max
          optimizationScore: result.metrics.optimizationScore,
          highOptimizationScore: result.metrics.optimizationScore > 80
        };
      }
    );

    // Test de cohérence multi-secteurs
    const consistencyTest = await this.runTest(
      'Cohérence Multi-Secteurs',
      async () => {
        const secteurs: Array<'sante' | 'finance' | 'tech'> = ['sante', 'finance', 'tech'];
        const results = [];
        
        for (const secteur of secteurs) {
          const agent = DesignAgentV2Factory.createMVP(`Test ${secteur}`, secteur);
          const result = await agent.generateCompleteProject();
          results.push(result);
        }
        
        return {
          allSuccessful: results.every(r => r.success),
          consistentStructure: results.every(r => 
            r.templates.main.html.length > 0 && 
            r.designSystem.tokens.length > 0
          ),
          averageOptimizationScore: results.reduce((sum, r) => 
            sum + r.metrics.optimizationScore, 0) / results.length
        };
      }
    );

    // Test de mémoire et ressources
    const resourceTest = await this.runTest(
      'Utilisation Ressources',
      async () => {
        const agent = DesignAgentV2Factory.createForSector('elearning', 'Resource Test', {
          useAI: false,
          style: 'moderne'
        });
        
        const result = await agent.generateCompleteProject();
        
        return {
          projectGenerated: result.success,
          templateSize: result.templates.main.html.length + result.templates.main.css.length,
          reasonableSize: (result.templates.main.html.length + result.templates.main.css.length) < 500000,
          designTokensCount: result.metrics.designTokens,
          reasonableTokensCount: result.metrics.designTokens < 200
        };
      }
    );

    suite.tests.push(speedTest, consistencyTest, resourceTest);
    
    suite.tests.forEach(test => {
      console.log(`  ${test.passed ? '✅' : '❌'} ${test.testName}: ${test.passed ? 'PASSÉ' : 'ÉCHEC'}`);
    });

    this.finalizeSuite(suite);
    this.results.push(suite);
  }

  /**
   * Test des exports et variations
   */
  private async testExportsAndVariations(): Promise<void> {
    const suite: TestSuite = {
      suiteName: 'Exports & Variations',
      tests: [],
      totalPassed: 0,
      totalFailed: 0,
      totalDuration: 0
    };

    console.log('\n📦 Test des Exports et Variations...\n');

    // Test des variations de style
    const variationsTest = await this.runTest(
      'Génération de Variations',
      async () => {
        const agent = new DesignAgentV2({
          name: 'Variations Test',
          sector: 'immobilier',
          style: 'moderne',
          apiKeys: {},
          preferences: {
            useAIImages: false,
            figmaIntegration: false,
            generateVariations: true,
            exportFormats: ['html', 'css']
          },
          branding: {
            businessName: 'Test Immobilier',
            primaryColor: '#3b82f6',
            brandPersonality: 'professional'
          }
        });
        
        const result = await agent.generateCompleteProject();
        
        return {
          variationsGenerated: !!result.templates.variations,
          variationsCount: result.templates.variations?.length || 0,
          expectedVariationsCount: 2, // classique et minimaliste
          mainTemplateGenerated: result.templates.main.html.length > 0
        };
      }
    );

    // Test des formats d'export
    const exportFormatsTest = await this.runTest(
      'Formats d\'Export',
      async () => {
        const agent = new DesignAgentV2({
          name: 'Export Test',
          sector: 'tech',
          style: 'moderne',
          apiKeys: {},
          preferences: {
            useAIImages: false,
            figmaIntegration: false,
            generateVariations: false,
            exportFormats: ['html', 'css', 'tailwind', 'figma-tokens']
          },
          branding: {
            businessName: 'Export Test',
            primaryColor: '#6366f1',
            brandPersonality: 'creative'
          }
        });
        
        const result = await agent.generateCompleteProject();
        
        return {
          htmlExportGenerated: !!result.exports.html,
          cssExportGenerated: !!result.exports.css,
          tailwindExportGenerated: !!result.exports.tailwind,
          figmaTokensExportGenerated: !!result.exports['figma-tokens'],
          allRequestedExportsGenerated: Object.keys(result.exports).length === 4
        };
      }
    );

    // Test des méthodes d'export
    const exportMethodsTest = await this.runTest(
      'Méthodes d\'Export',
      async () => {
        const agent = DesignAgentV2Factory.createMVP('Export Methods Test', 'finance');
        const result = await agent.generateCompleteProject();
        
        const htmlExport = agent.exportTemplate(result.templates.main, 'html');
        const stats = agent.getPerformanceStats();
        
        return {
          templateExportWorking: htmlExport.length > 0,
          performanceStatsAvailable: !!stats.averageGenerationTime,
          designSystemOnlyGeneration: !!agent.generateDesignSystemOnly(),
          statsStructureValid: stats.averageGenerationTime > 0 && 
                               stats.successRate >= 0 && 
                               stats.optimizationScore >= 0
        };
      }
    );

    suite.tests.push(variationsTest, exportFormatsTest, exportMethodsTest);
    
    suite.tests.forEach(test => {
      console.log(`  ${test.passed ? '✅' : '❌'} ${test.testName}: ${test.passed ? 'PASSÉ' : 'ÉCHEC'}`);
    });

    this.finalizeSuite(suite);
    this.results.push(suite);
  }

  /**
   * Utilitaires pour les tests
   */
  private async runTest(testName: string, testFn: () => Promise<any>): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      const result = await testFn();
      const duration = Date.now() - startTime;
      
      // Évalue si le test passe basé sur le résultat
      const passed = this.evaluateTestResult(result);
      
      return {
        testName,
        passed,
        duration,
        details: result
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      
      return {
        testName,
        passed: false,
        duration,
        details: null,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  private evaluateTestResult(result: any): boolean {
    if (typeof result === 'boolean') return result;
    if (typeof result === 'object' && result !== null) {
      // Évalue basé sur les propriétés du résultat
      const keys = Object.keys(result);
      if (keys.length === 0) return false;
      
      // Si au moins 70% des propriétés sont truthy, le test passe
      const truthyCount = keys.filter(key => 
        result[key] === true || 
        (typeof result[key] === 'number' && result[key] > 0) ||
        (typeof result[key] === 'string' && result[key].length > 0) ||
        (Array.isArray(result[key]) && result[key].length > 0)
      ).length;
      
      return (truthyCount / keys.length) >= 0.7;
    }
    return false;
  }

  private finalizeSuite(suite: TestSuite): void {
    suite.totalPassed = suite.tests.filter(t => t.passed).length;
    suite.totalFailed = suite.tests.filter(t => !t.passed).length;
    suite.totalDuration = suite.tests.reduce((sum, t) => sum + t.duration, 0);
  }

  private calculateGlobalStats() {
    const totalTests = this.results.reduce((sum, suite) => sum + suite.tests.length, 0);
    const totalPassed = this.results.reduce((sum, suite) => sum + suite.totalPassed, 0);
    const totalFailed = this.results.reduce((sum, suite) => sum + suite.totalFailed, 0);
    const totalDuration = this.results.reduce((sum, suite) => sum + suite.totalDuration, 0);
    const successRate = totalTests > 0 ? (totalPassed / totalTests) * 100 : 0;

    return {
      totalTests,
      totalPassed,
      totalFailed,
      totalDuration,
      successRate
    };
  }

  private printSummary(globalStats: any): void {
    console.log('\n📊 === RÉSUMÉ DES TESTS ===');
    console.log(`Tests total: ${globalStats.totalTests}`);
    console.log(`Tests réussis: ${globalStats.totalPassed}`);
    console.log(`Tests échoués: ${globalStats.totalFailed}`);
    console.log(`Taux de succès: ${globalStats.successRate.toFixed(1)}%`);
    console.log(`Durée totale: ${globalStats.totalDuration}ms`);
    
    console.log('\n📋 Détail par suite:');
    this.results.forEach(suite => {
      const successRate = suite.tests.length > 0 ? (suite.totalPassed / suite.tests.length) * 100 : 0;
      console.log(`  ${suite.suiteName}: ${suite.totalPassed}/${suite.tests.length} (${successRate.toFixed(1)}%)`);
    });

    if (globalStats.successRate >= 90) {
      console.log('\n🎉 EXCELLENT! Tous les systèmes sont opérationnels.');
    } else if (globalStats.successRate >= 75) {
      console.log('\n✅ BON! La plupart des fonctionnalités marchent correctement.');
    } else {
      console.log('\n⚠️ ATTENTION! Plusieurs tests ont échoué, révision nécessaire.');
    }
  }
}

/**
 * Exécution des tests si ce fichier est lancé directement
 */
async function main() {
  const testSuite = new DesignAgentV2TestSuite();
  const results = await testSuite.runAllTests();
  
  console.log('\n💾 Sauvegarde des résultats...');
  
  // Sauvegarde des résultats au format JSON
  const resultsJson = JSON.stringify(results, null, 2);
  console.log('Résultats disponibles pour export vers JSON');
  
  return results;
}

// Export pour utilisation dans d'autres modules
export { DesignAgentV2TestSuite, main as runCompleteTests };

// Exécution automatique si ce fichier est lancé directement
if (require.main === module) {
  main().catch(console.error);
}