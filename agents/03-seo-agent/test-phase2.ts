/**
 * Tests de Validation Agent SEO Phase 2
 * Vérification du bon fonctionnement des 4 modules
 */

import seoAgent from './index';
import { demonstrateAdvancedSEO } from './demo-phase2';

interface TestResult {
  module: string;
  test: string;
  success: boolean;
  duration: number;
  details: any;
  error?: string;
}

class SEOPhase2Tester {
  private results: TestResult[] = [];

  async runAllTests(): Promise<void> {
    console.log('🧪 TESTS DE VALIDATION AGENT SEO PHASE 2');
    console.log('='.repeat(50));

    // Tests des 4 modules principaux
    await this.testContentAIGenerator();
    await this.testKeywordResearch();
    await this.testContentCalendar();
    await this.testSEOMonitoring();
    await this.testOrchestrator();

    // Résumé des résultats
    this.displayResults();
  }

  private async testContentAIGenerator(): Promise<void> {
    console.log('\n🤖 Test Content AI Generator...');
    
    try {
      const startTime = Date.now();
      
      const content = await seoAgent.generateAIContent(
        'restaurant',
        ['blog_post'],
        ['restaurant gastronomique paris', 'cuisine française']
      );
      
      const duration = Date.now() - startTime;
      const blogPost = content['blog_post'];
      
      // Validations
      const validations = {
        contentGenerated: Object.keys(content).length > 0,
        titlePresent: blogPost?.title && blogPost.title.length > 0,
        contentLength: blogPost?.content && blogPost.content.length > 500,
        seoScore: blogPost?.seoScore && blogPost.seoScore > 70,
        metaDescription: blogPost?.metaDescription && blogPost.metaDescription.length > 100,
        keywordIntegration: blogPost?.keywordAnalysis && Object.keys(blogPost.keywordAnalysis.density).length > 0
      };

      const success = Object.values(validations).every(v => v);

      this.results.push({
        module: 'Content AI Generator',
        test: 'Génération contenu optimisé',
        success,
        duration,
        details: {
          contentTypes: Object.keys(content),
          seoScore: blogPost?.seoScore,
          wordCount: blogPost?.content?.split(' ').length,
          validations
        }
      });

      console.log(success ? '✅ Content AI Generator: OK' : '❌ Content AI Generator: FAILED');

    } catch (error) {
      this.results.push({
        module: 'Content AI Generator',
        test: 'Génération contenu optimisé',
        success: false,
        duration: 0,
        details: {},
        error: error.message
      });
      console.log('❌ Content AI Generator: ERROR -', error.message);
    }
  }

  private async testKeywordResearch(): Promise<void> {
    console.log('\n🔍 Test Keyword Research...');
    
    try {
      const startTime = Date.now();
      
      const research = await seoAgent.performAdvancedKeywordResearch(
        ['restaurant gastronomique'],
        ['concurrent1.fr']
      );
      
      const duration = Date.now() - startTime;
      
      // Validations
      const validations = {
        seedKeywords: research.seedKeywords && research.seedKeywords.length > 0,
        longTailKeywords: research.longTailKeywords && research.longTailKeywords.length > 0,
        competitorAnalysis: research.competitorAnalysis && research.competitorAnalysis.length > 0,
        recommendations: research.recommendations && research.recommendations.quickWins.length > 0,
        keywordData: research.seedKeywords[0] && 
          research.seedKeywords[0].searchVolume > 0 && 
          research.seedKeywords[0].difficulty >= 0
      };

      const success = Object.values(validations).every(v => v);

      this.results.push({
        module: 'Keyword Research',
        test: 'Recherche automatisée',
        success,
        duration,
        details: {
          seedCount: research.seedKeywords?.length,
          longTailCount: research.longTailKeywords?.length,
          competitorCount: research.competitorAnalysis?.length,
          quickWinsCount: research.recommendations?.quickWins?.length,
          validations
        }
      });

      console.log(success ? '✅ Keyword Research: OK' : '❌ Keyword Research: FAILED');

    } catch (error) {
      this.results.push({
        module: 'Keyword Research',
        test: 'Recherche automatisée',
        success: false,
        duration: 0,
        details: {},
        error: error.message
      });
      console.log('❌ Keyword Research: ERROR -', error.message);
    }
  }

  private async testContentCalendar(): Promise<void> {
    console.log('\n📅 Test Content Calendar...');
    
    try {
      const startTime = Date.now();
      
      const calendar = await seoAgent.generateIntelligentContentCalendar(
        undefined,
        3 // 3 articles/mois pour test rapide
      );
      
      const duration = Date.now() - startTime;
      
      // Validations
      const validations = {
        itemsGenerated: calendar.items && calendar.items.length > 0,
        monthlyDistribution: calendar.monthlyPlan && Object.keys(calendar.monthlyPlan).length === 12,
        seasonalPlan: calendar.seasonalPlan && Object.keys(calendar.seasonalPlan).length > 0,
        metricsCalculated: calendar.metrics && calendar.metrics.totalItems > 0,
        futureContent: calendar.items.some(item => item.publishDate > new Date()),
        contentTypes: calendar.items.some(item => ['blog_post', 'seasonal_content'].includes(item.type))
      };

      const success = Object.values(validations).every(v => v);

      this.results.push({
        module: 'Content Calendar',
        test: 'Planification 12 mois',
        success,
        duration,
        details: {
          totalItems: calendar.items?.length,
          monthsPlanned: Object.keys(calendar.monthlyPlan || {}).length,
          estimatedTraffic: calendar.metrics?.estimatedTotalTraffic,
          contentTypes: calendar.metrics?.byType,
          validations
        }
      });

      console.log(success ? '✅ Content Calendar: OK' : '❌ Content Calendar: FAILED');

    } catch (error) {
      this.results.push({
        module: 'Content Calendar',
        test: 'Planification 12 mois',
        success: false,
        duration: 0,
        details: {},
        error: error.message
      });
      console.log('❌ Content Calendar: ERROR -', error.message);
    }
  }

  private async testSEOMonitoring(): Promise<void> {
    console.log('\n📈 Test SEO Monitoring...');
    
    try {
      const startTime = Date.now();
      
      const dashboard = await seoAgent.startAdvancedSEOMonitoring(
        'https://test-restaurant.fr'
      );
      
      const duration = Date.now() - startTime;
      
      // Validations
      const validations = {
        dashboardGenerated: dashboard && typeof dashboard === 'object',
        overviewMetrics: dashboard.overview && 
          typeof dashboard.overview.technicalScore === 'number' &&
          typeof dashboard.overview.totalTraffic === 'number',
        trendsData: dashboard.trends && 
          Array.isArray(dashboard.trends.positionTrend) &&
          dashboard.trends.positionTrend.length > 0,
        topMovers: dashboard.topMovers && 
          Array.isArray(dashboard.topMovers.gainers) &&
          Array.isArray(dashboard.topMovers.losers),
        nextActions: dashboard.nextActions && 
          Array.isArray(dashboard.nextActions) &&
          dashboard.nextActions.length > 0
      };

      const success = Object.values(validations).every(v => v);

      this.results.push({
        module: 'SEO Monitoring',
        test: 'Dashboard et tracking',
        success,
        duration,
        details: {
          technicalScore: dashboard.overview?.technicalScore,
          totalTraffic: dashboard.overview?.totalTraffic,
          alertsCount: dashboard.alerts?.length,
          actionsCount: dashboard.nextActions?.length,
          validations
        }
      });

      console.log(success ? '✅ SEO Monitoring: OK' : '❌ SEO Monitoring: FAILED');

    } catch (error) {
      this.results.push({
        module: 'SEO Monitoring',
        test: 'Dashboard et tracking',
        success: false,
        duration: 0,
        details: {},
        error: error.message
      });
      console.log('❌ SEO Monitoring: ERROR -', error.message);
    }
  }

  private async testOrchestrator(): Promise<void> {
    console.log('\n🎼 Test Orchestrateur SEO...');
    
    try {
      const startTime = Date.now();
      
      const campaign = await seoAgent.launchAdvancedSEOCampaign({
        seoGoals: {
          targetTraffic: 5000,
          targetKeywords: 20,
          timeframe: 3,
          priorityPages: ['/test']
        },
        contentStrategy: {
          publicationFrequency: 2,
          contentTypes: ['test-content'],
          seasons: ['test-season']
        }
      });
      
      const duration = Date.now() - startTime;
      
      // Validations
      const validations = {
        campaignCreated: campaign && campaign.campaignId,
        componentsGenerated: campaign.components && 
          campaign.components.keywordResearch &&
          campaign.components.contentCalendar,
        metricsCalculated: campaign.metrics && 
          typeof campaign.metrics.keywordDifficulty === 'number',
        timelineGenerated: campaign.timeline && 
          Array.isArray(campaign.timeline) &&
          campaign.timeline.length > 0,
        trafficEstimated: campaign.expectedTraffic > 0,
        keywordsGenerated: campaign.generatedKeywords > 0
      };

      const success = Object.values(validations).every(v => v);

      // Test du suivi de campagne
      const activeCampaigns = seoAgent.getActiveCampaigns();
      const campaignStatus = await seoAgent.getCampaignStatus(campaign.campaignId);

      this.results.push({
        module: 'SEO Orchestrator',
        test: 'Campagne complète',
        success: success && activeCampaigns.includes(campaign.campaignId) && !!campaignStatus,
        duration,
        details: {
          campaignId: campaign.campaignId,
          generatedKeywords: campaign.generatedKeywords,
          plannedContent: campaign.plannedContent,
          expectedTraffic: campaign.expectedTraffic,
          activeCampaigns: activeCampaigns.length,
          validations
        }
      });

      console.log(success ? '✅ SEO Orchestrator: OK' : '❌ SEO Orchestrator: FAILED');

    } catch (error) {
      this.results.push({
        module: 'SEO Orchestrator',
        test: 'Campagne complète',
        success: false,
        duration: 0,
        details: {},
        error: error.message
      });
      console.log('❌ SEO Orchestrator: ERROR -', error.message);
    }
  }

  private displayResults(): void {
    console.log('\n' + '='.repeat(50));
    console.log('📊 RÉSULTATS DES TESTS');
    console.log('='.repeat(50));

    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);

    console.log(`\n📈 Résumé Global:`);
    console.log(`   Tests passés: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);
    console.log(`   Tests échoués: ${failedTests}`);
    console.log(`   Durée totale: ${totalDuration}ms (${Math.round(totalDuration/1000)}s)`);

    console.log(`\n📋 Détail par Module:`);
    this.results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      const duration = `${result.duration}ms`;
      console.log(`   ${status} ${result.module}: ${result.test} (${duration})`);
      
      if (!result.success && result.error) {
        console.log(`      Erreur: ${result.error}`);
      }
      
      if (result.details && Object.keys(result.details).length > 0) {
        const details = JSON.stringify(result.details, null, 2)
          .split('\n')
          .map(line => `      ${line}`)
          .join('\n');
        console.log(`      Détails: ${details.substring(0, 200)}...`);
      }
    });

    // Recommandations
    console.log(`\n💡 Recommandations:`);
    if (passedTests === totalTests) {
      console.log('   🎉 Tous les tests passent! Agent SEO Phase 2 prêt pour la production.');
    } else {
      console.log(`   ⚠️  ${failedTests} test(s) à corriger avant mise en production.`);
      
      const failedModules = this.results
        .filter(r => !r.success)
        .map(r => r.module);
      
      console.log(`   📝 Modules à vérifier: ${failedModules.join(', ')}`);
    }

    // Performance
    const avgDuration = totalDuration / totalTests;
    if (avgDuration > 5000) {
      console.log(`   ⏱️  Performance: Temps moyen élevé (${Math.round(avgDuration)}ms). Optimisation recommandée.`);
    } else {
      console.log(`   ⚡ Performance: Temps moyen acceptable (${Math.round(avgDuration)}ms).`);
    }

    console.log('\n🚀 Agent SEO Phase 2 - Tests terminés!');
  }

  // Méthode pour tests unitaires spécifiques
  async testSpecificModule(moduleName: string): Promise<TestResult | null> {
    switch (moduleName.toLowerCase()) {
      case 'content':
        await this.testContentAIGenerator();
        break;
      case 'keyword':
        await this.testKeywordResearch();
        break;
      case 'calendar':
        await this.testContentCalendar();
        break;
      case 'monitoring':
        await this.testSEOMonitoring();
        break;
      case 'orchestrator':
        await this.testOrchestrator();
        break;
      default:
        console.log(`❌ Module inconnu: ${moduleName}`);
        return null;
    }
    
    return this.results[this.results.length - 1];
  }

  // Benchmark de performance
  async benchmarkPerformance(): Promise<void> {
    console.log('\n⚡ BENCHMARK DE PERFORMANCE');
    console.log('-'.repeat(30));

    const iterations = 3;
    const benchmarks = [];

    for (let i = 0; i < iterations; i++) {
      console.log(`\nItération ${i + 1}/${iterations}...`);
      
      const startTime = Date.now();
      
      // Test de génération de contenu
      await seoAgent.generateAIContent('restaurant', ['blog_post'], ['test keyword']);
      
      const contentTime = Date.now() - startTime;
      
      // Test de recherche de mots-clés
      const keywordStart = Date.now();
      await seoAgent.performAdvancedKeywordResearch(['test']);
      const keywordTime = Date.now() - keywordStart;
      
      benchmarks.push({ contentTime, keywordTime });
    }

    const avgContentTime = benchmarks.reduce((sum, b) => sum + b.contentTime, 0) / iterations;
    const avgKeywordTime = benchmarks.reduce((sum, b) => sum + b.keywordTime, 0) / iterations;

    console.log(`\n📊 Résultats Benchmark:`);
    console.log(`   Génération contenu: ${Math.round(avgContentTime)}ms (moyenne)`);
    console.log(`   Recherche mots-clés: ${Math.round(avgKeywordTime)}ms (moyenne)`);
    
    // Seuils de performance
    const contentThreshold = 10000; // 10s
    const keywordThreshold = 5000;  // 5s

    if (avgContentTime > contentThreshold) {
      console.log(`   ⚠️  Génération contenu lente (>${contentThreshold}ms)`);
    }
    
    if (avgKeywordTime > keywordThreshold) {
      console.log(`   ⚠️  Recherche mots-clés lente (>${keywordThreshold}ms)`);
    }
  }
}

// Fonction principale de test
async function runSEOPhase2Tests(): Promise<void> {
  const tester = new SEOPhase2Tester();
  
  try {
    // Tests complets
    await tester.runAllTests();
    
    // Benchmark de performance
    await tester.benchmarkPerformance();
    
    console.log('\n✅ Validation Phase 2 terminée avec succès!');
    
  } catch (error) {
    console.error('\n❌ Erreur lors des tests:', error);
    process.exit(1);
  }
}

// Export pour utilisation externe
export { SEOPhase2Tester, runSEOPhase2Tests };

// Exécution automatique si lancé directement
if (require.main === module) {
  runSEOPhase2Tests()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Erreur fatale:', error);
      process.exit(1);
    });
}