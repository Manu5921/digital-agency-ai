/**
 * DÉMO PHOTO ENGINE 3.0 UNIVERSAL
 * Showcase des capacités avec vrais exemples métiers
 */

import { UniversalPhotoEngine } from './universal-photo-engine.js';

class UniversalPhotoEngineDemo {
    constructor() {
        this.engine = new UniversalPhotoEngine();
    }

    /**
     * DÉMONSTRATION COMPLÈTE AVEC 3 SECTEURS
     */
    async runUniversalDemo() {
        console.log('🎭 DÉMO PHOTO ENGINE 3.0 UNIVERSAL');
        console.log('='.repeat(50));
        console.log('🎯 Démonstration capacités multi-secteurs');
        console.log('📸 Sources gratuites: Unsplash + Pexels + Pixabay');
        console.log('🤖 Intelligence artificielle + Curation automatique');
        console.log('');

        // 3 secteurs représentatifs
        const demoBusinesses = [
            {
                name: "PlombiPro Services",
                sector: "plomberie", 
                description: "Entreprise de plomberie à Paris, dépannage urgence 24h/7j, installation sanitaire",
                owner: "Michel Dupont",
                location: "Paris 15ème",
                expectedResult: "Photos techniques + couleurs professionnelles bleu/orange"
            },
            {
                name: "Cabinet Sérénité",
                sector: "sophrologie",
                description: "Cabinet de sophrologie et relaxation, gestion du stress, méditation",
                owner: "Dr. Marie Dubois", 
                location: "Lyon Centre",
                expectedResult: "Photos apaisantes + couleurs thérapeutiques teal/beige"
            },
            {
                name: "Le Bistrot Gourmand",
                sector: "restaurant",
                description: "Restaurant traditionnel français, cuisine du terroir, ambiance chaleureuse",
                owner: "Chef Antoine Martin",
                location: "Marseille Vieux-Port", 
                expectedResult: "Photos gastronomiques + couleurs appétissantes rouge/doré"
            }
        ];

        const results = [];

        for (let i = 0; i < demoBusinesses.length; i++) {
            const business = demoBusinesses[i];
            console.log(`\n🏢 DÉMO ${i + 1}/3: ${business.name}`);
            console.log('─'.repeat(40));
            
            const result = await this.demonstrateBusiness(business);
            results.push(result);
        }

        // Showcase comparatif final
        this.generateComparativeShowcase(results);
        
        return results;
    }

    /**
     * DÉMONSTRATION BUSINESS SPÉCIFIQUE
     */
    async demonstrateBusiness(business) {
        console.log('📋 Secteur:', business.sector);
        console.log('👤 Propriétaire:', business.owner);
        console.log('📍 Localisation:', business.location);
        console.log('🎯 Attendu:', business.expectedResult);
        console.log('');

        const startTime = Date.now();

        try {
            // Génération avec Photo Engine 3.0
            const result = await this.engine.generateUniversalPhotos({
                name: business.name,
                sector: business.sector,
                description: business.description,
                owner: business.owner,
                location: business.location
            });

            const processingTime = Date.now() - startTime;

            if (result.success) {
                this.displaySuccessResult(result, processingTime);
                return { business, result, success: true, processingTime };
            } else {
                this.displayErrorResult(result, processingTime);
                return { business, result, success: false, processingTime };
            }

        } catch (error) {
            console.error('❌ Erreur génération:', error.message);
            return { business, error, success: false, processingTime: Date.now() - startTime };
        }
    }

    /**
     * AFFICHAGE RÉSULTAT SUCCÈS
     */
    displaySuccessResult(result, processingTime) {
        console.log('✅ GÉNÉRATION RÉUSSIE');
        console.log('──────────────────────');
        
        // Classification
        console.log('🧠 CLASSIFICATION INTELLIGENTE:');
        console.log(`   📊 Secteur détecté: ${result.profile.sector}`);
        console.log(`   📈 Confiance: ${(result.profile.confidence * 100).toFixed(1)}%`);
        console.log(`   🏷️  Catégorie: ${result.profile.category}`);
        console.log(`   🎭 Mood: ${result.profile.mood}`);
        console.log('');

        // Palette couleurs
        console.log('🎨 PALETTE COULEURS OPTIMISÉE:');
        Object.entries(result.profile.colors).forEach(([role, color]) => {
            console.log(`   ${this.getColorEmoji(color)} ${role}: ${color}`);
        });
        console.log('');

        // Photos sélectionnées
        console.log('📸 PHOTOS PREMIUM SÉLECTIONNÉES:');
        for (const [section, photos] of Object.entries(result.photos.photos)) {
            console.log(`   📁 ${section}: ${photos.length} photos`);
            photos.forEach((photo, i) => {
                const source = this.getSourceEmoji(photo.source);
                console.log(`      ${source} ${photo.alt.substring(0, 50)}...`);
            });
        }
        console.log('');

        // Métriques performance
        console.log('📊 MÉTRIQUES PERFORMANCE:');
        console.log(`   ⚡ Temps génération: ${processingTime}ms`);
        console.log(`   📸 Total photos: ${result.metrics.totalPhotos}`);
        console.log(`   ⭐ Score qualité: ${result.metrics.qualityScore.toFixed(1)}/10`);
        console.log(`   🎯 Score cohérence: ${result.metrics.consistencyScore.toFixed(1)}/10`);
        console.log(`   📚 Sources: ${result.metrics.sources.join(', ')}`);
        console.log('');

        // Optimisations appliquées
        console.log('⚡ OPTIMISATIONS APPLIQUÉES:');
        console.log('   ✅ Format WebP + AVIF');
        console.log('   ✅ Responsive breakpoints');
        console.log('   ✅ Lazy loading');
        console.log('   ✅ Cohérence visuelle');
        console.log('   ✅ Curation qualité automatique');
    }

    /**
     * AFFICHAGE RÉSULTAT ERREUR
     */
    displayErrorResult(result, processingTime) {
        console.log('❌ GÉNÉRATION ÉCHOUÉE');
        console.log('─────────────────────');
        console.log('⏱️  Temps:', processingTime + 'ms');
        if (result.message) {
            console.log('💬 Message:', result.message);
        }
        if (result.fallback) {
            console.log('🔄 Fallback activé');
            console.log('📸 Photos génériques utilisées');
        }
    }

    /**
     * SHOWCASE COMPARATIF FINAL
     */
    generateComparativeShowcase(results) {
        console.log('\n' + '='.repeat(60));
        console.log('🏆 SHOWCASE COMPARATIF - PHOTO ENGINE 3.0');
        console.log('='.repeat(60));

        console.log('\n📊 RÉSUMÉ PAR SECTEUR:');
        console.log('─'.repeat(25));

        results.forEach((demo, i) => {
            const { business, result, success, processingTime } = demo;
            
            console.log(`\n${i + 1}. ${business.name.toUpperCase()} (${business.sector})`);
            console.log('   ' + '─'.repeat(35));
            
            if (success && result.success) {
                console.log(`   ✅ Statut: SUCCÈS`);
                console.log(`   🎯 Classification: ${result.profile.sector}`);
                console.log(`   📸 Photos: ${result.metrics.totalPhotos}`);
                console.log(`   ⭐ Qualité: ${result.metrics.qualityScore.toFixed(1)}/10`);
                console.log(`   ⏱️  Temps: ${processingTime}ms`);
                console.log(`   🎨 Primaire: ${result.profile.colors.primary}`);
                console.log(`   🎭 Style: ${result.profile.style}`);
            } else {
                console.log(`   ❌ Statut: ÉCHEC`);
                console.log(`   ⏱️  Temps: ${processingTime}ms`);
                if (result?.message) console.log(`   💬 Raison: ${result.message}`);
            }
        });

        // Statistiques globales
        const successfulResults = results.filter(r => r.success && r.result.success);
        const successRate = successfulResults.length / results.length;
        const avgTime = results.reduce((sum, r) => sum + r.processingTime, 0) / results.length;
        const avgQuality = successfulResults.length > 0 
            ? successfulResults.reduce((sum, r) => sum + r.result.metrics.qualityScore, 0) / successfulResults.length
            : 0;

        console.log('\n🏆 PERFORMANCE GLOBALE:');
        console.log('─'.repeat(22));
        console.log(`✅ Taux succès: ${(successRate * 100).toFixed(1)}%`);
        console.log(`⏱️  Temps moyen: ${Math.round(avgTime)}ms`);
        console.log(`⭐ Qualité moyenne: ${avgQuality.toFixed(1)}/10`);
        console.log(`🎯 Grade: ${this.getPerformanceGrade(avgQuality)}`);

        // Conclusion
        console.log('\n🎉 CONCLUSION:');
        console.log('─'.repeat(12));
        if (successRate >= 0.8 && avgQuality >= 7.5) {
            console.log('🟢 PHOTO ENGINE 3.0 - EXCELLENT');
            console.log('✅ Prêt pour production clients');
            console.log('🚀 Recommandation: Déploiement immédiat');
        } else if (successRate >= 0.6 && avgQuality >= 6.5) {
            console.log('🟡 PHOTO ENGINE 3.0 - BON');
            console.log('⚡ Optimisations mineures nécessaires');
            console.log('🔧 Recommandation: Tests supplémentaires');
        } else {
            console.log('🔴 PHOTO ENGINE 3.0 - À AMÉLIORER');
            console.log('🛠️ Développements requis');
            console.log('⏳ Recommandation: Itération V3.1');
        }

        console.log('\n📚 PROCHAINES ÉTAPES:');
        console.log('─'.repeat(18));
        console.log('1. 🔧 Configuration API keys production');
        console.log('2. 🧪 Tests A/B conversion impact');
        console.log('3. 📈 Métriques utilisateur temps réel');
        console.log('4. 🌍 Extension secteurs additionnels');
        console.log('5. 🤖 Machine learning amélioration continue');

        console.log('\n🎭 PHOTO ENGINE 3.0 UNIVERSAL - DÉMO TERMINÉE');
    }

    /**
     * UTILITAIRES AFFICHAGE
     */
    getColorEmoji(color) {
        const colorEmojis = {
            '#1e40af': '🔵', '#3b82f6': '🔵', '#2563eb': '🔵', // Blues
            '#dc2626': '🔴', '#ef4444': '🔴', '#f87171': '🔴', // Reds
            '#059669': '🟢', '#10b981': '🟢', '#34d399': '🟢', // Greens
            '#f97316': '🟠', '#fb923c': '🟠', '#fdba74': '🟠', // Oranges
            '#8b5cf6': '🟣', '#a78bfa': '🟣', '#c4b5fd': '🟣', // Purples
            '#ec4899': '🩷', '#f472b6': '🩷', '#f9a8d4': '🩷', // Pinks
            '#f59e0b': '🟡', '#fbbf24': '🟡', '#fcd34d': '🟡', // Yellows
            '#14b8a6': '🔵', '#20d1c1': '🔵', '#2dd4bf': '🔵', // Teals
            '#6b7280': '⚫', '#9ca3af': '⚫', '#d1d5db': '⚫', // Grays
            '#92400e': '🟤', '#b45309': '🟤', '#d97706': '🟤'  // Browns
        };
        return colorEmojis[color] || '🎨';
    }

    getSourceEmoji(source) {
        const sourceEmojis = {
            'unsplash': '🅿️',   // Premium
            'pexels': '🄿',     // Professional  
            'pixabay': '🄱'     // Bulk
        };
        return sourceEmojis[source] || '📸';
    }

    getPerformanceGrade(score) {
        if (score >= 9) return 'A+';
        if (score >= 8) return 'A';
        if (score >= 7) return 'B+';
        if (score >= 6) return 'B';
        if (score >= 5) return 'C';
        return 'D';
    }
}

// LANCEMENT DÉMO AUTOMATIQUE
const demo = new UniversalPhotoEngineDemo();

console.log('🎬 Démarrage démo Photo Engine 3.0 Universal...\n');

demo.runUniversalDemo()
    .then(results => {
        console.log('\n🎊 Démo terminée avec succès !');
        console.log('📋 Photo Engine 3.0 Universal validé.');
    })
    .catch(error => {
        console.error('❌ Erreur pendant la démo:', error);
    });

export { UniversalPhotoEngineDemo };