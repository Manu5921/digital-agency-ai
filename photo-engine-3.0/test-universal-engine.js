/**
 * TEST PHOTO ENGINE 3.0 UNIVERSAL
 * Test avec plusieurs secteurs pour valider l'universalité
 */

import { UniversalPhotoEngine } from './universal-photo-engine.js';

class UniversalPhotoEngineTest {
    constructor() {
        this.engine = new UniversalPhotoEngine();
        this.testCases = this.initTestCases();
    }

    /**
     * CAS DE TEST MULTI-SECTEURS
     */
    initTestCases() {
        return [
            // SERVICES TECHNIQUES
            {
                name: "Plombier Pro Paris",
                sector: "plomberie",
                description: "Plombier professionnel Paris, dépannage urgence, installation sanitaire",
                expectedPhotos: ["pipe repair", "plumber working", "bathroom renovation"],
                expectedColors: ["blue", "orange"],
                expectedMood: "reliable, professional"
            },
            {
                name: "ElectricMax Services",
                sector: "electricite", 
                description: "Électricien certifié, installation électrique, mise aux normes",
                expectedPhotos: ["electrician working", "electrical panel", "safety"],
                expectedColors: ["red", "yellow"],
                expectedMood: "safety-focused, precise"
            },

            // SANTÉ & BIEN-ÊTRE
            {
                name: "Cabinet Virginie Roch",
                sector: "sophrologie",
                description: "Sophrologie, psychothérapie, gestion stress, accompagnement TCC",
                expectedPhotos: ["therapy office", "meditation", "relaxation"],
                expectedColors: ["teal", "beige"],
                expectedMood: "calm, healing"
            },
            {
                name: "Wellness Massage Center",
                sector: "masseur",
                description: "Masseur thérapeutique, détente, bien-être, soins corporels",
                expectedPhotos: ["massage therapy", "spa treatment", "wellness"],
                expectedColors: ["green", "cream"],
                expectedMood: "relaxing, therapeutic"
            },

            // RESTAURATION
            {
                name: "Le Gourmet Français",
                sector: "restaurant",
                description: "Restaurant gastronomique, cuisine française, chef étoilé",
                expectedPhotos: ["chef cooking", "gourmet food", "restaurant"],
                expectedColors: ["red", "gold"],
                expectedMood: "appetizing, sophisticated"
            },
            {
                name: "Boulangerie Artisanale",
                sector: "boulangerie",
                description: "Boulangerie traditionnelle, pain artisanal, pâtisserie fraîche",
                expectedPhotos: ["baker working", "fresh bread", "artisan"],
                expectedColors: ["brown", "golden"],
                expectedMood: "traditional, warm"
            },

            // CONSEIL & EXPERTISE
            {
                name: "Cabinet Juridique Dupont",
                sector: "avocat",
                description: "Avocat droit des affaires, conseil juridique, représentation",
                expectedPhotos: ["lawyer office", "legal consultation", "professional"],
                expectedColors: ["blue", "gray"],
                expectedMood: "authoritative, trustworthy"
            },
            {
                name: "Expertise Comptable Plus",
                sector: "comptable",
                description: "Expert-comptable, fiscalité, gestion entreprise, conseil",
                expectedPhotos: ["accountant", "financial planning", "office"],
                expectedColors: ["green", "gray"],
                expectedMood: "precise, reliable"
            },

            // BEAUTÉ & ESTHÉTIQUE
            {
                name: "Salon Élégance Coiffure",
                sector: "coiffure",
                description: "Salon de coiffure moderne, coloration, coupe tendance",
                expectedPhotos: ["hair salon", "styling", "transformation"],
                expectedColors: ["pink", "gold"],
                expectedMood: "stylish, creative"
            },
            {
                name: "Beauty Center Premium",
                sector: "esthetique",
                description: "Institut de beauté, soins visage, esthétique médicale",
                expectedPhotos: ["beauty treatment", "skincare", "facial"],
                expectedColors: ["purple", "gold"],
                expectedMood: "luxurious, elegant"
            },

            // SECTEUR INCONNU (test classification automatique)
            {
                name: "Services Mystère",
                sector: "dentiste", // Non défini dans la base
                description: "Cabinet dentaire, soins dentaires, orthodontie, implants",
                expectedPhotos: ["dental office", "dentist", "medical"],
                expectedColors: ["blue", "white"],
                expectedMood: "professional, clean"
            }
        ];
    }

    /**
     * LANCEMENT TESTS COMPLETS
     */
    async runAllTests() {
        console.log('🧪 DÉMARRAGE TESTS PHOTO ENGINE 3.0 UNIVERSAL');
        console.log('='.repeat(60));
        console.log('📊 Cas de test:', this.testCases.length);
        console.log('🎯 Secteurs couverts:', [...new Set(this.testCases.map(t => t.sector))].length);
        console.log('');

        const results = [];

        for (let i = 0; i < this.testCases.length; i++) {
            const testCase = this.testCases[i];
            console.log(`\n🔬 TEST ${i + 1}/${this.testCases.length}: ${testCase.name}`);
            console.log('─'.repeat(40));
            
            try {
                const result = await this.testSingleBusiness(testCase);
                results.push(result);
                this.displayTestResult(result);
            } catch (error) {
                console.error(`❌ Erreur test ${testCase.name}:`, error.message);
                results.push({ success: false, error: error.message, testCase });
            }
        }

        // Rapport final
        this.generateFinalReport(results);
        
        return results;
    }

    /**
     * TEST UNIQUE BUSINESS
     */
    async testSingleBusiness(testCase) {
        const startTime = Date.now();
        
        // Génération photos avec le moteur universel
        const result = await this.engine.generateUniversalPhotos({
            name: testCase.name,
            sector: testCase.sector,
            description: testCase.description
        });

        const processingTime = Date.now() - startTime;

        // Validation résultats
        const validation = this.validateResults(result, testCase);

        return {
            testCase,
            result,
            validation,
            processingTime,
            success: result.success && validation.overall >= 7
        };
    }

    /**
     * VALIDATION RÉSULTATS
     */
    validateResults(result, testCase) {
        const scores = {
            classification: 0,
            photoRelevance: 0,
            colorHarmony: 0,
            moodConsistency: 0,
            technicalQuality: 0
        };

        if (result.success) {
            // Score classification
            if (result.profile.sector === testCase.sector) {
                scores.classification = 10;
            } else if (result.profile.confidence > 0.7) {
                scores.classification = 7;
            } else {
                scores.classification = 5;
            }

            // Score pertinence photos
            scores.photoRelevance = this.scorePhotoRelevance(result.photos, testCase.expectedPhotos);

            // Score harmonie couleurs
            scores.colorHarmony = this.scoreColorHarmony(result.profile.colors, testCase.expectedColors);

            // Score cohérence mood
            scores.moodConsistency = this.scoreMoodConsistency(result.profile.mood, testCase.expectedMood);

            // Score qualité technique
            scores.technicalQuality = result.metrics.qualityScore || 8;
        }

        const overall = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;

        return {
            scores,
            overall: Math.round(overall * 10) / 10,
            grade: this.getValidationGrade(overall)
        };
    }

    /**
     * SCORING SPÉCIALISÉ
     */
    scorePhotoRelevance(photos, expectedKeywords) {
        if (!photos || !photos.photos) return 5;

        let relevanceScore = 0;
        let totalPhotos = 0;

        for (const sectionPhotos of Object.values(photos.photos)) {
            for (const photo of sectionPhotos) {
                totalPhotos++;
                const hasRelevantKeyword = expectedKeywords.some(keyword =>
                    photo.alt.toLowerCase().includes(keyword.toLowerCase()) ||
                    photo.url.toLowerCase().includes(keyword.toLowerCase())
                );
                if (hasRelevantKeyword) relevanceScore += 2;
                else relevanceScore += 1; // Score partiel pour cohérence générale
            }
        }

        return totalPhotos > 0 ? Math.min((relevanceScore / totalPhotos) * 5, 10) : 5;
    }

    scoreColorHarmony(actualColors, expectedColors) {
        if (!actualColors) return 5;

        const actualHex = Object.values(actualColors);
        let harmony = 5;

        // Bonus si couleurs attendues présentes
        expectedColors.forEach(expectedColor => {
            const colorFound = actualHex.some(hex => 
                this.colorMatches(hex, expectedColor)
            );
            if (colorFound) harmony += 1.5;
        });

        return Math.min(harmony, 10);
    }

    scoreMoodConsistency(actualMood, expectedMood) {
        if (!actualMood || !expectedMood) return 5;

        const expectedWords = expectedMood.toLowerCase().split(/[,\s]+/);
        const actualWords = actualMood.toLowerCase().split(/[,\s]+/);

        let matches = 0;
        expectedWords.forEach(word => {
            if (actualWords.includes(word)) matches++;
        });

        const consistencyRatio = matches / expectedWords.length;
        return 5 + (consistencyRatio * 5); // 5-10 scale
    }

    colorMatches(hex, colorName) {
        const colorMap = {
            'blue': ['#1e40af', '#3b82f6', '#2563eb'],
            'red': ['#dc2626', '#ef4444', '#f87171'],
            'green': ['#059669', '#10b981', '#34d399'],
            'orange': ['#f97316', '#fb923c', '#fdba74'],
            'purple': ['#8b5cf6', '#a78bfa', '#c4b5fd'],
            'pink': ['#ec4899', '#f472b6', '#f9a8d4'],
            'yellow': ['#f59e0b', '#fbbf24', '#fcd34d'],
            'teal': ['#14b8a6', '#20d1c1', '#2dd4bf'],
            'gray': ['#6b7280', '#9ca3af', '#d1d5db'],
            'brown': ['#92400e', '#b45309', '#d97706']
        };

        return colorMap[colorName]?.some(c => 
            hex.toLowerCase().includes(c.toLowerCase())
        ) || false;
    }

    getValidationGrade(score) {
        if (score >= 9) return 'A+';
        if (score >= 8) return 'A';
        if (score >= 7) return 'B+';
        if (score >= 6) return 'B';
        if (score >= 5) return 'C';
        return 'D';
    }

    /**
     * AFFICHAGE RÉSULTATS
     */
    displayTestResult(result) {
        const { testCase, validation, processingTime } = result;

        console.log('📋 Secteur:', testCase.sector);
        console.log('🎯 Classification:', result.result.profile?.sector || 'N/A');
        console.log('⭐ Score global:', validation.overall + '/10', `(${validation.grade})`);
        console.log('⏱️  Temps:', processingTime + 'ms');
        
        if (result.result.success) {
            console.log('📸 Photos générées:', result.result.metrics.totalPhotos);
            console.log('🎨 Sources utilisées:', result.result.metrics.sources.join(', '));
            console.log('✅ Statut: SUCCÈS');
        } else {
            console.log('❌ Statut: ÉCHEC');
            if (result.result.message) console.log('💬 Message:', result.result.message);
        }

        // Détail scores
        console.log('\n📊 Détail validation:');
        Object.entries(validation.scores).forEach(([criteria, score]) => {
            const emoji = score >= 8 ? '🟢' : score >= 6 ? '🟡' : '🔴';
            console.log(`   ${emoji} ${criteria}: ${score.toFixed(1)}/10`);
        });
    }

    /**
     * RAPPORT FINAL
     */
    generateFinalReport(results) {
        console.log('\n' + '='.repeat(60));
        console.log('📋 RAPPORT FINAL - PHOTO ENGINE 3.0 UNIVERSAL');
        console.log('='.repeat(60));

        const successfulTests = results.filter(r => r.success);
        const averageScore = results.reduce((sum, r) => sum + r.validation.overall, 0) / results.length;
        const averageTime = results.reduce((sum, r) => sum + r.processingTime, 0) / results.length;

        console.log('📊 STATISTIQUES GLOBALES:');
        console.log('─'.repeat(30));
        console.log(`✅ Tests réussis: ${successfulTests.length}/${results.length} (${Math.round(successfulTests.length/results.length*100)}%)`);
        console.log(`⭐ Score moyen: ${averageScore.toFixed(1)}/10`);
        console.log(`⏱️  Temps moyen: ${Math.round(averageTime)}ms`);
        console.log(`🎯 Grade global: ${this.getValidationGrade(averageScore)}`);

        console.log('\n🏆 SECTEURS PAR PERFORMANCE:');
        console.log('─'.repeat(30));
        const sectorPerf = results
            .sort((a, b) => b.validation.overall - a.validation.overall)
            .slice(0, 5);
        
        sectorPerf.forEach((result, i) => {
            const medal = ['🥇', '🥈', '🥉', '🏅', '🏅'][i] || '📍';
            console.log(`${medal} ${result.testCase.sector}: ${result.validation.overall}/10`);
        });

        console.log('\n🔧 RECOMMANDATIONS:');
        console.log('─'.repeat(20));
        if (averageScore >= 8) {
            console.log('🟢 Photo Engine 3.0 EXCELLENT - Prêt production');
        } else if (averageScore >= 7) {
            console.log('🟡 Photo Engine 3.0 BON - Optimisations mineures');
        } else {
            console.log('🔴 Photo Engine 3.0 - Améliorations nécessaires');
        }

        const lowScoringSectors = results
            .filter(r => r.validation.overall < 7)
            .map(r => r.testCase.sector);
        
        if (lowScoringSectors.length > 0) {
            console.log('📈 Secteurs à améliorer:', lowScoringSectors.join(', '));
        }

        console.log('\n🚀 PHOTO ENGINE 3.0 - TEST TERMINÉ');
        
        return {
            totalTests: results.length,
            successRate: successfulTests.length / results.length,
            averageScore,
            averageTime,
            grade: this.getValidationGrade(averageScore),
            readyForProduction: averageScore >= 7.5
        };
    }
}

// LANCEMENT AUTOMATIQUE DES TESTS
const tester = new UniversalPhotoEngineTest();

console.log('🎬 Lancement tests Photo Engine 3.0...\n');

tester.runAllTests()
    .then(results => {
        console.log('\n🎉 Tests terminés avec succès !');
        console.log('📋 Résultats sauvegardés pour analyse.');
    })
    .catch(error => {
        console.error('❌ Erreur pendant les tests:', error);
    });

export { UniversalPhotoEngineTest };