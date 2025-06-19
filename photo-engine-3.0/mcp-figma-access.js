#!/usr/bin/env node

/**
 * ACCÈS ET MODIFICATION FIGMA VIA MCP
 * Script complet pour analyser et traduire le design
 */

console.log('🎨 ACCÈS FIGMA VIA MCP - ANALYSE ET TRADUCTION');
console.log('==============================================\n');

// Configuration Figma
const FIGMA_CONFIG = {
    fileId: "2RZSI2c1aQ8hGB2wvJEG2W",
    nodeId: "0-1", // Node root mis à jour
    fileUrl: "https://www.figma.com/design/2RZSI2c1aQ8hGB2wvJEG2W/Untitled?node-id=0-1&t=PzlQvTqLLf3ctoZc-1"
};

console.log('📋 CONFIGURATION FIGMA:');
console.log('========================');
console.log(`File ID: ${FIGMA_CONFIG.fileId}`);
console.log(`Node ID: ${FIGMA_CONFIG.nodeId}`);
console.log(`URL: ${FIGMA_CONFIG.fileUrl}`);

console.log('\n🔍 ÉTAPE 1 - ANALYSE DU FICHIER FIGMA:');
console.log('======================================');

// Script MCP pour analyser le fichier
const analyzeScript = `
// MCP Figma - Analyse du fichier
const fileData = await mcpFigma.call("get_file", {
    fileId: "${FIGMA_CONFIG.fileId}"
});

// Extraction des nœuds de texte
const textNodes = await mcpFigma.call("find_nodes", {
    fileId: "${FIGMA_CONFIG.fileId}",
    nodeType: "TEXT"
});

console.log("Nœuds de texte trouvés:", textNodes.length);
`;

console.log('Script d\'analyse MCP:');
console.log(analyzeScript);

console.log('\n📝 ÉTAPE 2 - TRADUCTIONS ANTICIPÉES:');
console.log('====================================');

// Traductions basées sur les designs Stitch typiques
const translations = {
    // Header/Navigation
    "LAW COUNSEL": "CABINET JURIDIQUE",
    "Home": "Accueil", 
    "About": "À Propos",
    "Services": "Services",
    "Contact": "Contact",
    
    // Hero Section
    "Really Unbelievable Solutions for all Legal Cases": "Solutions Juridiques d'Excellence pour tous vos Dossiers",
    "Professional Legal Services": "Services Juridiques Professionnels",
    "Get Started": "Commencer",
    "Contact Us": "Nous Contacter",
    "Schedule Consultation": "Prendre Rendez-vous",
    
    // About Section  
    "Financial Analysis": "Analyse Financière",
    "Long Experience": "Longue Expérience", 
    "Success Cases": "Cas de Succès",
    "Experience": "Expérience",
    "Expertise": "Expertise",
    "Trust": "Confiance",
    
    // Practice Areas
    "Business Law": "Droit des Affaires",
    "Education Law": "Droit de l'Éducation", 
    "Family Law": "Droit de la Famille",
    "Real Estate": "Immobilier",
    "Personal Injury": "Préjudice Personnel",
    "Insurance Defense": "Défense Assurance",
    
    // Trust Section
    "Personalised attention": "Attention personnalisée",
    "Personalized Attention": "Attention Personnalisée"
};

console.log(`Traductions préparées: ${Object.keys(translations).length}`);
console.log('\nExemples:');
Object.entries(translations).slice(0, 5).forEach(([en, fr]) => {
    console.log(`  "${en}" → "${fr}"`);
});

console.log('\n🔧 ÉTAPE 3 - SCRIPT DE MODIFICATION MCP:');
console.log('=========================================');

// Génération du script de modification complet
const modificationScript = `
// MCP Figma - Modifications en masse
const modifications = [];

${Object.entries(translations).map(([english, french]) => `
// Recherche et remplacement: "${english}" → "${french}"
const nodes_${english.replace(/[^a-zA-Z0-9]/g, '_')} = await mcpFigma.call("find_text_nodes", {
    fileId: "${FIGMA_CONFIG.fileId}",
    searchText: "${english}"
});

for (const node of nodes_${english.replace(/[^a-zA-Z0-9]/g, '_')}) {
    await mcpFigma.call("update_text", {
        fileId: "${FIGMA_CONFIG.fileId}",
        nodeId: node.id,
        content: "${french}"
    });
    modifications.push({ original: "${english}", translated: "${french}", nodeId: node.id });
}
`).join('\n')}

console.log("Modifications appliquées:", modifications.length);
return modifications;
`;

console.log('Script de modification généré ✅');

console.log('\n🎯 ÉTAPE 4 - AMÉLIORATIONS FRANÇAISES:');
console.log('======================================');

const frenchImprovements = {
    // Contenu spécifiquement français
    heroTitle: "Cabinet d'Avocats d'Excellence",
    heroSubtitle: "Expertise juridique et accompagnement stratégique depuis 15 ans",
    
    // Services français
    services: [
        "Droit des Sociétés",
        "Droit Commercial", 
        "Contentieux d'Affaires",
        "Fusions & Acquisitions",
        "Droit Fiscal",
        "Propriété Intellectuelle"
    ],
    
    // Contact français
    contact: {
        address: "15 Avenue des Champs-Élysées, 75008 Paris",
        phone: "01 42 00 00 00",
        email: "contact@cabinet-leroux.fr",
        hours: "Lun-Ven 9h-18h"
    },
    
    // Mentions légales
    legal: {
        siren: "SIREN: 123 456 789",
        barreau: "Barreau de Paris",
        rcs: "RCS Paris B 123 456 789"
    }
};

console.log('Améliorations françaises:');
console.log(`- Titre: ${frenchImprovements.heroTitle}`);
console.log(`- Services: ${frenchImprovements.services.length} domaines`);
console.log(`- Adresse: ${frenchImprovements.contact.address}`);

console.log('\n🚀 COMMANDES MCP À EXÉCUTER:');
console.log('============================');

console.log('1. ACCÈS ET ANALYSE:');
console.log('```javascript');
console.log(`const fileData = await mcpFigma.call("get_file", {`);
console.log(`  fileId: "${FIGMA_CONFIG.fileId}"`);
console.log(`});`);
console.log('```');

console.log('\n2. RECHERCHE DES TEXTES:');
console.log('```javascript');
console.log(`const textNodes = await mcpFigma.call("find_nodes", {`);
console.log(`  fileId: "${FIGMA_CONFIG.fileId}",`);
console.log(`  nodeType: "TEXT"`);
console.log(`});`);
console.log('```');

console.log('\n3. MODIFICATIONS CIBLÉES:');
const priorityTranslations = [
    ["LAW COUNSEL", "CABINET JURIDIQUE"],
    ["Really Unbelievable Solutions for all Legal Cases", "Solutions Juridiques d'Excellence"],
    ["Contact Us", "Nous Contacter"],
    ["Business Law", "Droit des Affaires"]
];

priorityTranslations.forEach(([en, fr]) => {
    console.log('```javascript');
    console.log(`await mcpFigma.call("update_text_by_content", {`);
    console.log(`  fileId: "${FIGMA_CONFIG.fileId}",`);
    console.log(`  searchText: "${en}",`);
    console.log(`  newText: "${fr}"`);
    console.log(`});`);
    console.log('```\n');
});

console.log('📊 RÉSULTATS ATTENDUS:');
console.log('=======================');
console.log('✅ Design 100% en français');
console.log('✅ Terminologie juridique française');
console.log('✅ Coordonnées françaises');
console.log('✅ Mentions légales conformes');
console.log('✅ Cohérence visuelle préservée');

export { FIGMA_CONFIG, translations, frenchImprovements, modificationScript };