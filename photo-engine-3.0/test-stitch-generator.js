#!/usr/bin/env node

/**
 * TEST STITCH PROMPT GENERATOR
 * Test avec les données du Cabinet Dubois
 */

import { StitchPromptGenerator } from './stitch-prompt-generator.js';

console.log('🧪 TEST STITCH PROMPT GENERATOR');
console.log('================================\n');

const generator = new StitchPromptGenerator();

// Données test basées sur notre cabinet avocat
const cabinetDuboisData = {
    // A. Informations Entreprise
    companyName: "Cabinet Maître Dubois",
    businessSector: "Avocat - Droit des affaires et famille",
    pitch: "Cabinet d'avocat expert depuis plus de 20 ans, spécialisé en droit des affaires et droit de la famille. Nous vous accompagnons avec professionnalisme et détermination.",
    mission: "Offrir une expertise juridique de qualité pour résoudre les problèmes complexes de nos clients",
    vision: "Devenir le cabinet de référence à Paris pour l'accompagnement juridique des entreprises et particuliers",
    values: ["Excellence", "Intégrité", "Professionnalisme", "Proximité client", "Résultats"],

    // B. Public Cible
    targetCustomers: "Dirigeants d'entreprises PME et particuliers aisés, 35-60 ans, cherchant expertise juridique de qualité",
    customerProblem: "Complexité juridique et besoin de sécurisation de leurs affaires/projets",
    customerMotivation: "Sécurité juridique, gain de temps, expertise reconnue",

    // C. Concurrents
    competitors: "Autres cabinets parisiens, avocats généralistes",
    differentiation: "20+ années d'expérience, double expertise affaires/famille, taux de réussite 95%",
    admiredBrands: "Gide, Freshfields - pour leur professionnalisme et prestige",

    // D. Personnalité
    personalityAdjectives: ["Professionnel", "Fiable", "Expert", "Déterminé", "Intègre"],
    customerFeeling: "En confiance, rassurés, soutenus",
    toneOfVoice: "Expert et formel",
    specificTerms: "Expertise juridique, accompagnement, sécurisation, conseil stratégique",
    avoidWords: "Bon marché, rapide, simple",

    // E. Préférences Visuelles
    preferredColors: "Bleu marine professionnel, doré pour l'excellence, gris ardoise",
    avoidColors: "Rose, orange vif, couleurs trop flashy",
    imageStyle: ["Sombre et sophistiqué", "Authentique et naturel", "Photographies de personnes"],
    fontStyle: "Classiques et élégantes (serif)",
    hasLogo: true,

    // F. Objectifs Site
    websiteObjective: "Générer des prospects/demandes de devis, Asseoir la notoriété/crédibilité"
};

console.log('📋 Test avec données Cabinet Dubois...\n');

try {
    const result = generator.generatePromptSafely(cabinetDuboisData, true);
    
    if (result.error) {
        console.error('❌ Erreur:', result.error);
        console.log('🔄 Fallback prompt:', result.fallbackPrompt);
    } else {
        console.log('✅ PROMPT GÉNÉRÉ AVEC SUCCÈS');
        console.log('=====================================');
        console.log(result.prompt);
        console.log('=====================================');
        console.log('\n📊 Métadonnées:');
        console.log('- Entreprise:', result.metadata.company);
        console.log('- Secteur:', result.metadata.sector);
        console.log('- Longueur prompt:', result.prompt.length, 'caractères');
        console.log('- Image fournie:', result.metadata.hasImage ? 'Oui' : 'Non');
        console.log('- Timestamp:', result.metadata.timestamp);
    }

} catch (error) {
    console.error('❌ Erreur test:', error.message);
}

console.log('\n🎯 PROCHAINES ÉTAPES:');
console.log('1. Copier ce prompt dans Google Stitch');
console.log('2. Uploader l\'image de référence');
console.log('3. Générer le design UI');
console.log('4. Exporter vers Figma');
console.log('5. Intégrer avec Photo Engine 3.0');
console.log('6. Développer en Next.js');

console.log('\n🔗 Accès Stitch: https://stitch.withgoogle.com');