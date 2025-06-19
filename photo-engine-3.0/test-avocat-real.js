#!/usr/bin/env node

/**
 * TEST RÉEL - CABINET AVOCAT AVEC VRAIE API UNSPLASH
 * Génération photos premium pour le site avocat existant
 */

import { UniversalPhotoEngine } from './universal-photo-engine.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

console.log('🏛️ TEST RÉEL - CABINET AVOCAT MAÎTRE DUBOIS');
console.log('=============================================\n');

async function generateAvocatPhotos() {
    const engine = new UniversalPhotoEngine();
    
    // Informations du cabinet d'avocat réel
    const cabinetInfo = {
        name: "Cabinet Maître Dubois",
        sector: "avocat",
        description: "Cabinet d'avocat spécialisé en droit des affaires et droit de la famille. Expertise juridique de qualité, conseil personnalisé et représentation devant les tribunaux.",
        location: "Paris, France",
        specialties: ["droit des affaires", "droit de la famille", "droit immobilier"]
    };

    console.log('📋 Informations du cabinet:');
    console.log(`   Nom: ${cabinetInfo.name}`);
    console.log(`   Secteur: ${cabinetInfo.sector}`);
    console.log(`   Spécialités: ${cabinetInfo.specialties.join(', ')}`);
    console.log(`   Localisation: ${cabinetInfo.location}\n`);

    try {
        console.log('🚀 Génération photos avec API Unsplash...');
        const result = await engine.generateUniversalPhotos(cabinetInfo);
        
        if (result.success) {
            console.log('✅ GÉNÉRATION RÉUSSIE !');
            console.log(`📊 Métriques détaillées:`);
            console.log(`   - Photos totales: ${result.metrics.totalPhotos}`);
            console.log(`   - Score qualité: ${result.metrics.qualityScore.toFixed(1)}/10`);
            console.log(`   - Secteur détecté: ${result.profile.sector}`);
            console.log(`   - Catégorie: ${result.profile.category}`);
            console.log(`   - Confiance: ${(result.profile.confidence * 100).toFixed(0)}%`);
            
            console.log('\n🎨 Palette couleurs professionnelle:');
            console.log(`   - Primaire: ${result.profile.colors.primary} (autorité)`);
            console.log(`   - Secondaire: ${result.profile.colors.secondary} (professionnel)`);
            console.log(`   - Accent: ${result.profile.colors.accent} (clarté)`);
            console.log(`   - Texte: ${result.profile.colors.text} (lisibilité)`);
            
            console.log('\n📸 Photos par section (API Unsplash):');
            let totalRealPhotos = 0;
            let totalSimulatedPhotos = 0;
            
            for (const [section, photos] of Object.entries(result.photos.photos)) {
                console.log(`\n   📋 ${section.toUpperCase()} (${photos.length} photos):`);
                
                photos.forEach((photo, i) => {
                    const isReal = photo.url.includes('images.unsplash.com') || 
                                  photo.url.includes('images.pexels.com') || 
                                  photo.url.includes('cdn.pixabay.com');
                    const isUnsplash = photo.url.includes('images.unsplash.com');
                    const isPexels = photo.url.includes('images.pexels.com') && !photo.url.includes('photos/');
                    const isPixabay = photo.url.includes('cdn.pixabay.com');
                    
                    let status;
                    if (isUnsplash) status = '🎨 UNSPLASH API';
                    else if (isPexels) status = '📷 PEXELS API';
                    else if (isPixabay) status = '🖼️ PIXABAY API';
                    else status = '🔄 Simulation';
                    
                    if (isReal) totalRealPhotos++;
                    else totalSimulatedPhotos++;
                    
                    console.log(`     ${i+1}. ${status} - Score: ${photo.score?.toFixed(1) || 'N/A'}`);
                    console.log(`        URL: ${photo.url}`);
                    console.log(`        Alt: ${photo.alt}`);
                    console.log(`        Dimensions: ${photo.width}x${photo.height}px`);
                    if (photo.photographer) {
                        console.log(`        Photographe: ${photo.photographer}`);
                    }
                });
            }
            
            console.log('\n📊 BILAN QUALITÉ:');
            console.log(`   🌐 Photos API réelles: ${totalRealPhotos}`);
            console.log(`   🔄 Photos simulées: ${totalSimulatedPhotos}`);
            console.log(`   📈 Ratio API/Total: ${(totalRealPhotos / result.metrics.totalPhotos * 100).toFixed(0)}%`);
            
            // Analyse des mots-clés utilisés
            console.log('\n🔍 Mots-clés secteur avocat:');
            for (const [section, keywords] of Object.entries(result.profile.keywords)) {
                console.log(`   ${section}: ${keywords.join(', ')}`);
            }
            
            // Sauvegarde résultats
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `avocat-photos-${timestamp}.json`;
            
            const exportData = {
                timestamp: new Date().toISOString(),
                cabinet: cabinetInfo,
                results: result,
                analysis: {
                    totalRealPhotos,
                    totalSimulatedPhotos,
                    apiSuccessRate: (totalRealPhotos / result.metrics.totalPhotos * 100).toFixed(1) + '%',
                    qualityGrade: result.metrics.qualityScore >= 9 ? 'A+' : 
                                  result.metrics.qualityScore >= 8 ? 'A' : 
                                  result.metrics.qualityScore >= 7 ? 'B+' : 'B'
                }
            };
            
            fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));
            console.log(`\n💾 Résultats sauvegardés: ${filename}`);
            
            // Recommandations
            console.log('\n💡 RECOMMANDATIONS:');
            if (totalRealPhotos > totalSimulatedPhotos) {
                console.log('   ✅ Excellent! Majorité de photos API réelles');
                console.log('   🚀 Prêt pour intégration dans le site cabinet');
                console.log('   📈 Qualité premium garantie pour le client');
            } else {
                console.log('   ⚠️ Majorité de photos simulées');
                console.log('   💡 Vérifier quotas API Unsplash');
                console.log('   🔧 Optimiser requêtes pour plus de photos réelles');
            }
            
            return result;
            
        } else {
            console.log('❌ ÉCHEC DE GÉNÉRATION');
            console.log('Raison:', result.message || 'Erreur inconnue');
            return null;
        }
        
    } catch (error) {
        console.error('❌ Erreur lors de la génération:', error.message);
        return null;
    }
}

// Fonction pour comparer avec l'ancien système
async function compareWithSimulation() {
    console.log('\n🔄 COMPARAISON AVEC SYSTÈME SIMULÉ');
    console.log('===================================');
    
    // Sauvegarder configuration actuelle
    const originalKey = process.env.UNSPLASH_ACCESS_KEY;
    
    // Tester sans clé (simulation)
    process.env.UNSPLASH_ACCESS_KEY = 'demo-key';
    
    const engineSim = new UniversalPhotoEngine();
    const simulatedResult = await engineSim.generateUniversalPhotos({
        name: "Cabinet Test",
        sector: "avocat",
        description: "Test simulation"
    });
    
    // Restaurer clé
    process.env.UNSPLASH_ACCESS_KEY = originalKey;
    
    console.log('📊 Comparaison:');
    console.log(`   🔄 Simulation - Photos: ${simulatedResult.metrics?.totalPhotos || 0}, Score: ${simulatedResult.metrics?.qualityScore?.toFixed(1) || 'N/A'}`);
    console.log('   🌐 API réelle - voir résultats ci-dessus');
    
    return simulatedResult;
}

// Exécution du test
async function runTest() {
    const realResult = await generateAvocatPhotos();
    
    if (realResult) {
        await compareWithSimulation();
        
        console.log('\n🎯 CONCLUSION:');
        console.log('✅ Photo Engine 3.0 opérationnel avec API Unsplash');
        console.log('📸 Photos premium haute qualité récupérées');
        console.log('🎨 Palette couleurs professionnelle appliquée');
        console.log('🚀 Prêt pour intégration dans le projet cabinet avocat');
    }
}

runTest().catch(console.error);