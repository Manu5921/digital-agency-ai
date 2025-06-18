/**
 * TEST REAL WORKFLOW - Script de test du workflow complet
 * Simule un client qui remplit le formulaire et lance la génération réelle
 */

const ClientFormProcessor = require('./form-processor.js');
const RealWorkflowConnector = require('./real-workflow-connector.js');

class WorkflowTester {
    constructor() {
        this.processor = new ClientFormProcessor();
        this.connector = new RealWorkflowConnector();
    }

    /**
     * Lance un test complet avec des données d'exemple
     */
    async testCompleteWorkflow(exampleType = 'salon-beaute') {
        console.log('🧪 DÉMARRAGE TEST WORKFLOW COMPLET');
        console.log('Exemple:', exampleType);
        console.log('='.repeat(50));

        try {
            // 1. Données client simulées (comme si quelqu'un avait rempli le formulaire)
            const mockFormData = this.getMockFormData(exampleType);
            console.log('✅ Données formulaire préparées');

            // 2. Traitement des données par le FormProcessor
            console.log('\n📋 Traitement des données client...');
            const clientConfig = this.processor.processClientData(mockFormData);
            console.log('✅ Configuration client générée');
            console.log('Projet:', clientConfig.metadata.projectName);
            console.log('Template:', clientConfig.metadata.template);

            // 3. Exécution du workflow réel
            console.log('\n🚀 Lancement du workflow réel...');
            const result = await this.connector.executeRealWorkflow(clientConfig);

            // 4. Résultat final
            console.log('\n' + '='.repeat(50));
            console.log('🎉 WORKFLOW TERMINÉ AVEC SUCCÈS !');
            console.log('Client:', result.client);
            console.log('Site web:', result.websiteUrl);
            console.log('Projet:', result.projectPath);
            console.log('Durée totale:', this.calculateDuration());
            console.log('='.repeat(50));

            return result;

        } catch (error) {
            console.error('\n❌ ERREUR WORKFLOW:', error.message);
            console.error('Stack:', error.stack);
            throw error;
        }
    }

    /**
     * Génère des données d'exemple pour différents secteurs
     */
    getMockFormData(exampleType) {
        const examples = {
            'salon-beaute': {
                businessName: "Élégance Beauty Spa",
                businessSector: "beaute",
                businessPitch: "Salon de beauté haut de gamme proposant soins du visage, massages et épilation. Expertise et produits de luxe pour une expérience unique de bien-être.",
                businessMission: "Révéler la beauté naturelle de chaque cliente dans un cadre raffiné et apaisant",
                businessVision: "Devenir la référence beauté et bien-être dans le 16ème arrondissement",
                businessValues: "Excellence, raffinement, bien-être, écoute client, produits naturels",
                targetAudience: "Femmes 25-55 ans, cadres supérieures, revenus élevés, soucieuses de leur apparence, recherchant qualité et service premium",
                problemSolved: "Manque de temps pour prendre soin de soi, difficulté à trouver des soins de qualité, besoin de détente et relaxation",
                clientMotivation: ["health", "expertise", "convenience"],
                clientMotivationOther: "Confiance en soi, détente",
                competitors: "Instituts Clarins, Yves Rocher, salons indépendants du quartier",
                uniqueValue: "Seul salon du 16ème avec cabines privées VIP, produits bio exclusifs, esthéticiennes diplômées d'état avec 10+ ans d'expérience",
                brandInspiration: "La Mer (luxe), Chanel (élégance), Spa Guerlain (raffinement)",
                brandPersonality: ["sophistiquee", "chaleureuse", "professionnelle", "authentique"],
                brandPersonalityOther: "Luxueuse, apaisante",
                toneOfVoice: "expert",
                specificTerms: "soin sur-mesure, beauté naturelle, bien-être holistique, expertise beauté",
                avoidTerms: "pas cher, discount, rapide, standard",
                preferredColors: ["rose", "or", "blanc"],
                colorDescription: "Palette douce et raffinée, tons rosés et dorés, ambiance feutrée et luxueuse",
                avoidColors: "couleurs vives, néon, couleurs criardes",
                imageStyle: "sombre",
                fontStyle: "classique",
                hasLogo: "partial",
                features: ["contact", "booking", "gallery", "testimonials"],
                websiteGoal: "leads",
                existingContent: "partial",
                languages: ["fr"],
                email: "contact@elegance-beauty-spa.fr",
                phone: "01 45 67 89 12",
                address: "28 Avenue Foch, 75116 Paris",
                budget: "medium",
                timeline: "2weeks",
                validationProcess: "each"
            },

            'cabinet-dentaire': {
                businessName: "Cabinet Dentaire Dr. Martin",
                businessSector: "sante",
                businessPitch: "Cabinet dentaire moderne spécialisé dans les soins conservateurs et l'esthétique dentaire. Technologies de pointe et approche bienveillante pour tous les âges.",
                businessMission: "Offrir des soins dentaires de qualité dans un environnement rassurant et moderne",
                businessVision: "Être le cabinet dentaire de référence pour les familles du quartier",
                businessValues: "Professionnalisme, bienveillance, innovation, prévention, écoute",
                targetAudience: "Familles avec enfants, adultes 25-65 ans, patients anxieux, recherchant qualité et modernité",
                problemSolved: "Peur du dentiste, difficultés à trouver un cabinet accueillant, besoin de soins esthétiques",
                clientMotivation: ["health", "expertise", "convenience"],
                competitors: "Cabinets dentaires du 16ème, centres dentaires, orthodontistes",
                uniqueValue: "Seul cabinet avec sédation consciente pour patients anxieux, plateau technique dernière génération, prise en charge globale famille",
                brandPersonality: ["fiable", "professionnelle", "chaleureuse", "moderne"],
                toneOfVoice: "expert",
                specificTerms: "soins dentaires, santé bucco-dentaire, esthétique dentaire, prévention",
                avoidTerms: "douleur, peur, invasif",
                preferredColors: ["bleu", "blanc", "vert"],
                imageStyle: "lumineux",
                fontStyle: "moderne",
                features: ["contact", "booking", "testimonials"],
                websiteGoal: "leads",
                email: "cabinet@dr-martin-dentaire.fr",
                phone: "01 45 67 89 15",
                address: "15 Rue de Passy, 75116 Paris",
                budget: "medium",
                timeline: "week"
            },

            'agence-immobiliere': {
                businessName: "Prestige Immobilier Paris",
                businessSector: "immobilier",
                businessPitch: "Agence immobilière spécialisée dans l'immobilier de prestige dans le 16ème arrondissement. Accompagnement personnalisé pour achats, ventes et locations haut de gamme.",
                businessMission: "Accompagner nos clients dans leurs projets immobiliers les plus exigeants avec expertise et discrétion",
                businessVision: "Devenir la référence de l'immobilier de prestige dans l'ouest parisien",
                businessValues: "Excellence, discrétion, expertise, confiance, service sur-mesure",
                targetAudience: "Acquéreurs et vendeurs haut de gamme, investisseurs, familles aisées, expatriés",
                problemSolved: "Difficulté à trouver des biens d'exception, manque d'accompagnement personnalisé, processus complexes",
                clientMotivation: ["expertise", "convenience", "results"],
                competitors: "Daniel Féau, Barnes, Century 21 Prestige",
                uniqueValue: "Réseau exclusif de biens off-market, négociateur expert 20+ ans d'expérience, service conciergerie inclus",
                brandPersonality: ["professionnelle", "sophistiquee", "fiable", "expert"],
                toneOfVoice: "expert",
                specificTerms: "immobilier de prestige, biens d'exception, investissement immobilier",
                preferredColors: ["bleu", "gris", "or"],
                imageStyle: "sombre",
                fontStyle: "classique",
                features: ["contact", "gallery", "testimonials", "map"],
                websiteGoal: "leads",
                email: "contact@prestige-immobilier-paris.fr",
                phone: "01 45 67 89 20",
                address: "10 Place Victor Hugo, 75116 Paris",
                budget: "large",
                timeline: "month"
            }
        };

        return examples[exampleType] || examples['salon-beaute'];
    }

    calculateDuration() {
        // Placeholder pour calcul du temps
        return "Calcul en cours...";
    }

    /**
     * Lance plusieurs tests en séquence
     */
    async runMultipleTests() {
        const examples = ['salon-beaute', 'cabinet-dentaire', 'agence-immobiliere'];
        const results = [];

        for (const example of examples) {
            console.log(`\n🔄 Test ${example}...`);
            try {
                const result = await this.testCompleteWorkflow(example);
                results.push({ example, success: true, result });
                console.log(`✅ ${example} réussi`);
            } catch (error) {
                results.push({ example, success: false, error: error.message });
                console.log(`❌ ${example} échoué`);
            }
            
            // Pause entre les tests
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        return results;
    }
}

// Exécution du test si appelé directement
if (require.main === module) {
    const tester = new WorkflowTester();
    
    // Récupérer l'argument de type d'exemple
    const exampleType = process.argv[2] || 'salon-beaute';
    
    tester.testCompleteWorkflow(exampleType)
        .then(result => {
            console.log('\n🎯 Test terminé avec succès');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n💥 Test échoué:', error.message);
            process.exit(1);
        });
}

module.exports = WorkflowTester;