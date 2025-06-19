#!/usr/bin/env node

/**
 * GÉNÉRATION PROMPT BASÉ SUR L'IMAGE STITCH FOURNIE
 * Analyse l'image et génère un prompt optimisé pour reproduction
 */

import { ImageDesignAnalyzer } from './image-analyzer.js';

console.log('🎨 ANALYSE IMAGE STITCH ET GÉNÉRATION PROMPT');
console.log('===========================================\n');

const analyzer = new ImageDesignAnalyzer();

// Analyse de l'image fournie
console.log('🔍 ANALYSE DE L\'IMAGE FOURNIE:');
console.log('------------------------------');

const analysis = analyzer.analyzeStitchResult();

console.log('🎨 PALETTE COULEURS DÉTECTÉE:');
Object.entries(analysis.colorPalette).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
});

console.log('\n📝 STYLE TYPOGRAPHIQUE:');
Object.entries(analysis.typography).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
});

console.log('\n🏗️ STRUCTURE LAYOUT:');
console.log(`   Structure: ${analysis.layout.structure}`);
console.log(`   Navigation: ${analysis.layout.navigation}`);
console.log('   Sections détectées:');
analysis.layout.sections.forEach((section, i) => {
    console.log(`     ${i+1}. ${section}`);
});

console.log('\n🎭 STYLE DESIGN:');
Object.entries(analysis.designStyle).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
});

console.log('\n\n📋 PROMPT OPTIMISÉ GÉNÉRÉ:');
console.log('===========================');

const optimizedPrompt = analyzer.generateReproductionPrompt();
console.log(optimizedPrompt);

console.log('\n===========================');
console.log(`📊 Longueur prompt: ${optimizedPrompt.length} caractères`);
console.log(`🎯 Status: ${optimizedPrompt.length <= 2000 ? '✅ OK pour Stitch' : '⚠️ Trop long - à optimiser'}`);

console.log('\n🚀 INSTRUCTIONS POUR TEST:');
console.log('1. Copiez le prompt ci-dessus');
console.log('2. Allez sur https://stitch.withgoogle.com');
console.log('3. Collez le prompt');
console.log('4. Uploadez une photo d\'avocat professionnel');
console.log('5. Comparez le résultat avec l\'image de référence');

console.log('\n💡 AMÉLIORATIONS DÉTECTÉES:');
console.log('- Thème sombre sophistiqué (vs standard)');
console.log('- Accents dorés pour le premium');
console.log('- Portraits professionnels dramatiques');
console.log('- Structure sections alternées');
console.log('- Typography haute lisibilité');

console.log('\n📸 PHOTO ENGINE 3.0 INTEGRATION:');
console.log('✅ Peut extraire: Palette couleurs dominantes');
console.log('✅ Peut analyser: Style photographique'); 
console.log('✅ Peut détecter: Mood et ambiance');
console.log('✅ Peut optimiser: Cohérence visuelle');
console.log('💡 Suggestion: Intégrer analyse automatique image → prompt');