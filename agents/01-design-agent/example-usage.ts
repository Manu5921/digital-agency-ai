/**
 * Example Usage - Design Agent V2 Phase 2
 * Démonstration des nouvelles fonctionnalités
 */

import { DesignAgentV2, DesignAgentV2Factory } from './design-agent-v2';

/**
 * Exemple 1: Création rapide MVP pour une clinique
 */
async function exempleClinicMVP() {
  console.log('🏥 === EXEMPLE 1: Clinique MVP ===');
  
  const designAgent = DesignAgentV2Factory.createMVP('Clinique Saint-Martin', 'sante');
  
  const result = await designAgent.generateCompleteProject();
  
  console.log('✅ Projet généré:');
  console.log(`- Nom: ${result.projectName}`);
  console.log(`- Secteur: ${result.sector}`);
  console.log(`- Style: ${result.style}`);
  console.log(`- Temps: ${result.metrics.generationTime}ms`);
  console.log(`- Score: ${result.metrics.optimizationScore}%`);
  console.log(`- Images: ${result.images.fallbacks.length} placeholders`);
  
  return result;
}

/**
 * Exemple 2: Fintech premium avec IA
 */
async function exempleFinTechPremium() {
  console.log('🏦 === EXEMPLE 2: FinTech Premium ===');
  
  const apiKeys = {
    openai: process.env.OPENAI_API_KEY || 'demo-key',
    figma: process.env.FIGMA_API_KEY || 'demo-key'
  };
  
  const designAgent = DesignAgentV2Factory.createPremium('NeoBank', 'finance', apiKeys);
  
  // Configuration personnalisée
  designAgent.updateConfig({
    branding: {
      businessName: 'NeoBank',
      primaryColor: '#1e40af',
      brandPersonality: 'creative'
    },
    preferences: {
      useAIImages: true,
      figmaIntegration: true,
      generateVariations: true,
      exportFormats: ['html', 'css', 'tailwind', 'figma-tokens']
    }
  });
  
  const result = await designAgent.generateCompleteProject();
  
  console.log('✅ Projet premium généré:');
  console.log(`- Images IA: ${result.images.generated.length}`);
  console.log(`- Variations: ${result.templates.variations?.length || 0}`);
  console.log(`- Tokens: ${result.metrics.designTokens}`);
  console.log(`- Exports: ${Object.keys(result.exports).join(', ')}`);
  
  return result;
}

/**
 * Exemple 3: E-learning avec import Figma
 */
async function exempleELearningFigma() {
  console.log('🎓 === EXEMPLE 3: E-Learning avec Figma ===');
  
  const designAgent = new DesignAgentV2({
    name: 'LearnTech Platform',
    sector: 'elearning',
    style: 'moderne',
    
    apiKeys: {
      figma: process.env.FIGMA_API_KEY || 'demo-key',
      openai: process.env.OPENAI_API_KEY || 'demo-key'
    },
    
    preferences: {
      useAIImages: true,
      figmaIntegration: true,
      generateVariations: false,
      exportFormats: ['html', 'css', 'figma-tokens']
    },
    
    branding: {
      businessName: 'LearnTech',
      primaryColor: '#8b5cf6',
      brandPersonality: 'creative'
    }
  });
  
  const figmaUrl = 'https://www.figma.com/file/demo123/education-template';
  const result = await designAgent.generateCompleteProject(figmaUrl);
  
  console.log('✅ Projet avec Figma:');
  console.log(`- Import Figma: ${result.figmaImport?.success ? 'Succès' : 'Échec'}`);
  console.log(`- Composants: ${result.figmaImport?.components.length || 0}`);
  console.log(`- Temps total: ${result.metrics.generationTime}ms`);
  
  return result;
}

/**
 * Exemple 4: Agence immobilière - Génération par étapes
 */
async function exempleImmobilierEtapes() {
  console.log('🏘️ === EXEMPLE 4: Immobilier par étapes ===');
  
  const designAgent = DesignAgentV2Factory.createForSector('immobilier', 'Prestige Immobilier', {
    style: 'classique',
    primaryColor: '#1e3a8a',
    useAI: true,
    apiKeys: { openai: process.env.OPENAI_API_KEY || 'demo-key' }
  });
  
  // Étape 1: Génération du système de design uniquement
  console.log('⚡ Génération design system...');
  const designSystem = designAgent.generateDesignSystemOnly();
  console.log(`- Tokens générés: ${designSystem.tokens.length}`);
  
  // Étape 2: Génération des images uniquement
  console.log('🖼️ Génération images...');
  const images = await designAgent.generateImagesOnly();
  console.log(`- Images IA: ${images.generated.length}`);
  console.log(`- Fallbacks: ${images.fallbacks.length}`);
  
  // Étape 3: Génération complète
  console.log('🏗️ Génération complète...');
  const fullResult = await designAgent.generateCompleteProject();
  
  // Export en différents formats
  const htmlExport = designAgent.exportTemplate(fullResult.templates.main, 'html');
  console.log(`- Export HTML: ${htmlExport.length} caractères`);
  
  return fullResult;
}

/**
 * Exemple 5: Startup Tech avec toutes les variations
 */
async function exempleStartupTechVariations() {
  console.log('🚀 === EXEMPLE 5: Startup Tech Variations ===');
  
  const designAgent = new DesignAgentV2({
    name: 'AI Startup',
    sector: 'tech',
    style: 'moderne',
    
    apiKeys: {
      openai: process.env.OPENAI_API_KEY || 'demo-key'
    },
    
    preferences: {
      useAIImages: true,
      figmaIntegration: false,
      generateVariations: true, // IMPORTANT: génère toutes les variations
      exportFormats: ['html', 'css', 'tailwind']
    },
    
    branding: {
      businessName: 'AI Innovate',
      primaryColor: '#6366f1',
      brandPersonality: 'creative'
    }
  });
  
  const result = await designAgent.generateCompleteProject();
  
  console.log('✅ Projet avec variations:');
  console.log(`- Template principal: ${result.style}`);
  console.log(`- Variations disponibles:`);
  
  result.templates.variations?.forEach(variation => {
    console.log(`  • Style ${variation.style}: ${variation.html.length} chars`);
  });
  
  // Statistiques de performance
  const stats = designAgent.getPerformanceStats();
  console.log('📊 Stats de performance:');
  console.log(`- Temps moyen: ${stats.averageGenerationTime}ms`);
  console.log(`- Taux de succès: ${stats.successRate}%`);
  console.log(`- Score optimisation: ${stats.optimizationScore}%`);
  
  return result;
}

/**
 * Test de comparaison entre secteurs
 */
async function compareSecteursPerformance() {
  console.log('📊 === COMPARAISON SECTEURS ===');
  
  const secteurs: Array<'sante' | 'finance' | 'elearning' | 'immobilier' | 'tech'> = 
    ['sante', 'finance', 'elearning', 'immobilier', 'tech'];
  
  const resultats = [];
  
  for (const secteur of secteurs) {
    const startTime = Date.now();
    
    const agent = DesignAgentV2Factory.createMVP(`Demo ${secteur}`, secteur);
    const result = await agent.generateCompleteProject();
    
    const temps = Date.now() - startTime;
    
    resultats.push({
      secteur,
      temps,
      score: result.metrics.optimizationScore,
      tokens: result.metrics.designTokens
    });
    
    console.log(`✅ ${secteur}: ${temps}ms, score ${result.metrics.optimizationScore}%`);
  }
  
  // Analyse
  const tempsTotal = resultats.reduce((sum, r) => sum + r.temps, 0);
  const scoreMoyen = resultats.reduce((sum, r) => sum + r.score, 0) / resultats.length;
  
  console.log('\n📈 Analyse globale:');
  console.log(`- Temps total: ${tempsTotal}ms`);
  console.log(`- Score moyen: ${scoreMoyen.toFixed(1)}%`);
  console.log(`- Secteur le plus rapide: ${resultats.sort((a, b) => a.temps - b.temps)[0].secteur}`);
  console.log(`- Meilleur score: ${resultats.sort((a, b) => b.score - a.score)[0].secteur}`);
  
  return resultats;
}

/**
 * Démo interactive
 */
async function demoInteractive() {
  console.log('🎯 === DÉMO INTERACTIVE DESIGN AGENT V2 ===\n');
  
  console.log('Fonctionnalités disponibles:');
  console.log('1. 🏥 Clinique MVP (rapide)');
  console.log('2. 🏦 FinTech Premium (avec IA)');
  console.log('3. 🎓 E-Learning (avec Figma)');
  console.log('4. 🏘️ Immobilier (par étapes)');
  console.log('5. 🚀 Startup Tech (toutes variations)');
  console.log('6. 📊 Comparaison secteurs');
  console.log('7. 🔄 Tous les exemples\n');
  
  // Pour la démo, on exécute tous les exemples
  try {
    console.log('🚀 Démarrage de tous les exemples...\n');
    
    await exempleClinicMVP();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await exempleFinTechPremium();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await exempleELearningFigma();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await exempleImmobilierEtapes();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await exempleStartupTechVariations();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await compareSecteursPerformance();
    
    console.log('\n🎉 === DÉMO TERMINÉE ===');
    console.log('✅ Toutes les fonctionnalités ont été testées avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur durant la démo:', error);
  }
}

// Export pour utilisation
export {
  exempleClinicMVP,
  exempleFinTechPremium,
  exempleELearningFigma,
  exempleImmobilierEtapes,
  exempleStartupTechVariations,
  compareSecteursPerformance,
  demoInteractive
};

// Exécution de la démo si ce fichier est exécuté directement
if (require.main === module) {
  demoInteractive().catch(console.error);
}