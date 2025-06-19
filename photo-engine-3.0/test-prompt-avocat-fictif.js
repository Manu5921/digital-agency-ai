#!/usr/bin/env node

/**
 * GÉNÉRATION PROMPT FICTIF - CABINET AVOCAT
 * Pour test direct sur Google Stitch
 */

import { StitchPromptGenerator } from './stitch-prompt-generator.js';

const generator = new StitchPromptGenerator();

// Données fictives mais réalistes pour cabinet avocat
const cabinetFictif = {
    // A. Informations Entreprise
    companyName: "Cabinet Leroux & Associés",
    businessSector: "Avocat spécialisé en droit des sociétés",
    pitch: "Cabinet d'avocats d'affaires reconnu depuis 15 ans, expert en droit des sociétés, fusions-acquisitions et contentieux commercial. Nous accompagnons les dirigeants dans leurs décisions stratégiques.",
    mission: "Sécuriser et optimiser les opérations juridiques de nos clients entreprises",
    vision: "Être le partenaire juridique de référence des PME et ETI en croissance",
    values: ["Excellence", "Réactivité", "Innovation", "Confidentialité", "Résultats"],

    // B. Public Cible
    targetCustomers: "Dirigeants PME/ETI, entrepreneurs, investisseurs, âgés de 30-55 ans, secteurs tech/industrie",
    customerProblem: "Complexité juridique des opérations de croissance et besoin de sécurisation",
    customerMotivation: "Sécuriser les investissements, optimiser la structure juridique, gagner du temps",

    // C. Concurrents & Différenciation
    competitors: "Gide, Freshfields, cabinets parisiens généralistes",
    differentiation: "Expertise pointue en droit des sociétés, approche business, réactivité startup",
    admiredBrands: "Clifford Chance pour son prestige, Linklaters pour son innovation",

    // D. Personnalité
    personalityAdjectives: ["Expert", "Innovant", "Réactif", "Stratégique", "Fiable"],
    customerFeeling: "Confiants dans leurs décisions, sécurisés, soutenus stratégiquement",
    toneOfVoice: "Expert et formel",
    specificTerms: "Expertise juridique, accompagnement stratégique, sécurisation juridique, optimisation",
    avoidWords: "Cheap, basique, standard, généraliste",

    // E. Préférences Visuelles
    preferredColors: "Bleu marine corporate, argent métallique, blanc pur",
    avoidColors: "Rouge, orange, couleurs trop vives",
    imageStyle: ["Sombre et sophistiqué", "Photographies de personnes", "Minimaliste et abstrait"],
    fontStyle: "Modernes et simples (sans-serif)",
    hasLogo: false,

    // F. Objectifs Site
    websiteObjective: "Générer des prospects qualifiés et asseoir la crédibilité"
};

console.log('🏛️ GÉNÉRATION PROMPT FICTIF - CABINET LEROUX & ASSOCIÉS');
console.log('=======================================================\n');

const result = generator.generatePromptSafely(cabinetFictif, true);

if (result.error) {
    console.error('❌ Erreur:', result.error);
} else {
    console.log('📋 PROMPT PRÊT POUR STITCH:');
    console.log('============================');
    console.log(result.prompt);
    console.log('============================\n');
    
    console.log('📊 INFORMATIONS:');
    console.log(`- Longueur: ${result.prompt.length} caractères`);
    console.log(`- Limite Stitch: 2000 caractères`);
    console.log(`- Status: ${result.prompt.length <= 2000 ? '✅ OK' : '⚠️ Trop long'}`);
    
    console.log('\n🎯 INSTRUCTIONS POUR LE TEST:');
    console.log('1. Allez sur https://stitch.withgoogle.com');
    console.log('2. Copiez-collez le prompt ci-dessus');
    console.log('3. Uploadez une photo de cabinet d\'avocat/bureau professionnel');
    console.log('4. Générez le design');
    console.log('5. Vérifiez que le style correspond aux attentes');
    
    console.log('\n📸 SUGGESTIONS PHOTOS À TESTER:');
    console.log('- Bureau d\'avocat moderne avec bibliothèque juridique');
    console.log('- Portrait avocat en costume dans cabinet');
    console.log('- Salle de réunion professionnelle');
    console.log('- Immeuble haussmannien (siège cabinet)');
}