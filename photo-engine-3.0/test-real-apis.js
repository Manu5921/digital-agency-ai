#!/usr/bin/env node

/**
 * TEST DES VRAIES APIs - PHOTO ENGINE 3.0
 * Script de test pour valider l'intégration des APIs réelles
 */

import { UniversalPhotoEngine } from './universal-photo-engine.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

console.log('🧪 TEST PHOTO ENGINE 3.0 - VRAIES APIs');
console.log('=====================================\n');

// Vérifier la disponibilité des clés
function checkApiKeys() {
    const keys = {
        unsplash: process.env.UNSPLASH_ACCESS_KEY,
        pexels: process.env.PEXELS_API_KEY,
        pixabay: process.env.PIXABAY_API_KEY
    };

    console.log('🔑 Vérification des clés API:');
    for (const [api, key] of Object.entries(keys)) {
        const status = key && key !== 'demo-key' ? '✅ Configurée' : '❌ Manquante';
        console.log(`   ${api}: ${status}`);
    }
    console.log();

    return Object.values(keys).some(key => key && key !== 'demo-key');
}

// Test complet avec secteur avocat
async function testAvocatSector() {
    console.log('🏛️ TEST SECTEUR AVOCAT');
    console.log('----------------------');

    const engine = new UniversalPhotoEngine();
    
    const businessInfo = {
        sector: 'avocat',
        name: 'Cabinet Maître Dubois',
        description: 'Cabinet d\'avocat spécialisé en droit des affaires et droit de la famille'
    };

    try {
        const result = await engine.generateUniversalPhotos(businessInfo);
        
        if (result.success) {
            console.log('✅ Génération réussie !');
            console.log(`📊 Métriques:`);
            console.log(`   - Photos totales: ${result.metrics.totalPhotos}`);
            console.log(`   - Score qualité: ${result.metrics.qualityScore.toFixed(1)}/10`);
            console.log(`   - Sources: ${result.metrics.sources.join(', ')}`);
            
            // Détail par section
            console.log('\n📸 Photos par section:');
            for (const [section, photos] of Object.entries(result.photos.photos)) {
                console.log(`   ${section}: ${photos.length} photos`);
                photos.forEach((photo, i) => {
                    const apiUsed = photo.source === 'unsplash' ? 
                        (process.env.UNSPLASH_ACCESS_KEY !== 'demo-key' ? '🌐 API' : '🔄 Sim') :
                        photo.source === 'pexels' ?
                        (process.env.PEXELS_API_KEY !== 'demo-key' ? '🌐 API' : '🔄 Sim') :
                        (process.env.PIXABAY_API_KEY !== 'demo-key' ? '🌐 API' : '🔄 Sim');
                    
                    console.log(`     ${i+1}. ${photo.source} ${apiUsed} - Score: ${photo.score?.toFixed(1) || 'N/A'}`);
                });
            }
        } else {
            console.log('❌ Échec génération');
            console.log('Raison:', result.message || 'Erreur inconnue');
        }

    } catch (error) {
        console.error('❌ Erreur test:', error.message);
    }

    console.log();
}

// Test rapide API individuelle
async function testIndividualAPIs() {
    console.log('🔍 TEST APIs INDIVIDUELLES');
    console.log('---------------------------');

    const engine = new UniversalPhotoEngine();
    
    // Test mots-clés avocat
    const testKeywords = {
        hero: ['professional lawyer', 'law office'],
        services: ['legal consultation', 'legal advice']
    };

    // Test Unsplash
    if (process.env.UNSPLASH_ACCESS_KEY !== 'demo-key') {
        try {
            console.log('🎨 Test Unsplash API...');
            const unsplashResult = await engine.searchUnsplash(testKeywords, 'professional');
            console.log(`   ✅ Unsplash: ${Object.keys(unsplashResult).length} sections récupérées`);
        } catch (error) {
            console.log(`   ❌ Unsplash: ${error.message}`);
        }
    } else {
        console.log('   ⏭️ Unsplash: Clé manquante, test ignoré');
    }

    // Test Pexels
    if (process.env.PEXELS_API_KEY !== 'demo-key') {
        try {
            console.log('📷 Test Pexels API...');
            const pexelsResult = await engine.searchPexels(testKeywords, 'professional');
            console.log(`   ✅ Pexels: ${Object.keys(pexelsResult).length} sections récupérées`);
        } catch (error) {
            console.log(`   ❌ Pexels: ${error.message}`);
        }
    } else {
        console.log('   ⏭️ Pexels: Clé manquante, test ignoré');
    }

    // Test Pixabay
    if (process.env.PIXABAY_API_KEY !== 'demo-key') {
        try {
            console.log('🖼️ Test Pixabay API...');
            const pixabayResult = await engine.searchPixabay(testKeywords, 'professional');
            console.log(`   ✅ Pixabay: ${Object.keys(pixabayResult).length} sections récupérées`);
        } catch (error) {
            console.log(`   ❌ Pixabay: ${error.message}`);
        }
    } else {
        console.log('   ⏭️ Pixabay: Clé manquante, test ignoré');
    }

    console.log();
}

// Rapport final
function finalReport(hasKeys) {
    console.log('📋 RAPPORT FINAL');
    console.log('================');
    
    if (hasKeys) {
        console.log('✅ Au moins une clé API configurée');
        console.log('🌐 Le moteur utilisera les vraies APIs quand disponibles');
        console.log('🔄 Fallback vers simulation pour APIs manquantes');
    } else {
        console.log('⚠️ Aucune clé API configurée');
        console.log('🔄 Fonctionnement en mode simulation uniquement');
        console.log('💡 Ajoutez vos clés dans .env pour activer les vraies APIs');
    }
    
    console.log('\n🚀 Photo Engine 3.0 prêt à l\'emploi !');
    console.log('📚 Consultez .env.example pour configurer les APIs');
}

// Exécution des tests
async function runTests() {
    const hasApiKeys = checkApiKeys();
    
    await testIndividualAPIs();
    await testAvocatSector();
    
    finalReport(hasApiKeys);
}

// Lancement si script exécuté directement
if (import.meta.url === `file://${process.argv[1]}`) {
    runTests().catch(console.error);
}

export { runTests };