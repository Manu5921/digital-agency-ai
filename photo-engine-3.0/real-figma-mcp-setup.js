#!/usr/bin/env node

/**
 * CONFIGURATION RÉELLE MCP FIGMA
 * Setup pour vraie traduction avec token actuel
 */

console.log('⚙️ CONFIGURATION RÉELLE MCP FIGMA');
console.log('=================================\n');

const REAL_CONFIG = {
    figmaToken: "your-figma-token-here",
    fileId: "2RZSI2c1aQ8hGB2wvJEG2W",
    baseUrl: "https://api.figma.com/v1"
};

console.log('🔑 Configuration actuelle:');
console.log(`   Token: ${REAL_CONFIG.figmaToken}`);
console.log(`   File: ${REAL_CONFIG.fileId}`);

// Traductions basées sur la capture d'écran fournie
const ACTUAL_TRANSLATIONS = {
    navigation: {
        "Home": "Accueil",
        "Services": "Services", 
        "About Us": "À Propos",
        "Portfolio": "Portfolio",
        "Contact": "Contact"
    },
    
    buttons: {
        "Get Quote": "Obtenir Devis",
        "Call Now": "Appeler",
        "Request Service": "Demander Service"
    },
    
    hero: {
        "Keeping your home in top condition": "Gardons votre maison en parfait état"
    },
    
    description: {
        "We are a team of home service experts that believe every home deserves to be well-maintained. Since 1995, we've been helping homeowners with quality repairs, providing virtually any home installation and maintenance service.": "Nous sommes une équipe d'experts en services à domicile qui croit que chaque maison mérite d'être bien entretenue. Depuis 1995, nous aidons les propriétaires avec des réparations de qualité, fournissant pratiquement tout service d'installation et de maintenance."
    },
    
    services: {
        "Our Core Services": "Nos Services Principaux",
        "Plumbing": "Plomberie", 
        "Carpentry": "Menuiserie",
        "Painting": "Peinture",
        "Expert plumbing solutions for leaks, installations, and repairs.": "Solutions de plomberie expertes pour fuites, installations et réparations.",
        "Skilled carpentry for custom builds, repairs, and installations.": "Menuiserie qualifiée pour constructions sur mesure, réparations et installations.",
        "Professional interior and exterior painting services.": "Services de peinture professionnels intérieurs et extérieurs."
    },
    
    about: {
        "OUR INTRODUCTION": "NOTRE PRÉSENTATION",
        "Integrity: We do what is right.": "Intégrité : Nous faisons ce qui est juste.",
        "Partnerships: We work together.": "Partenariats : Nous travaillons ensemble.", 
        "Excellence: We pursue design excellence.": "Excellence : Nous poursuivons l'excellence du design.",
        "Innovation: We embrace ingenuity.": "Innovation : Nous embrassons l'ingéniosité."
    },
    
    commitment: {
        "Committed to Quality": "Engagés pour la Qualité",
        "We Value": "Nous Valorisons"
    }
};

console.log('\n📝 TRADUCTIONS RÉELLES À APPLIQUER:');
console.log('===================================');

let totalTranslations = 0;
Object.entries(ACTUAL_TRANSLATIONS).forEach(([section, items]) => {
    console.log(`\n${section.toUpperCase()}:`);
    Object.entries(items).forEach(([en, fr]) => {
        console.log(`   "${en}" → "${fr}"`);
        totalTranslations++;
    });
});

console.log(`\n📊 Total: ${totalTranslations} traductions identifiées`);

console.log('\n🔧 COMMANDES MCP FIGMA RÉELLES:');
console.log('===============================');

console.log('\n1. TEST CONNEXION:');
console.log('```bash');
console.log('# Installer le serveur MCP Figma');
console.log('npm install -g @figma/mcp-server');
console.log('```');

console.log('\n2. CONFIGURATION ENVIRONNEMENT:');
console.log('```bash');
console.log(`export FIGMA_ACCESS_TOKEN="${REAL_CONFIG.figmaToken}"`);
console.log('```');

console.log('\n3. LANCEMENT SERVEUR MCP:');
console.log('```bash');
console.log('figma-mcp-server --port 3000');
console.log('```');

console.log('\n4. TEST API FIGMA DIRECT:');
console.log('```bash');
console.log(`curl -H "X-Figma-Token: ${REAL_CONFIG.figmaToken}" \\`);
console.log(`     "${REAL_CONFIG.baseUrl}/files/${REAL_CONFIG.fileId}"`);
console.log('```');

console.log('\n🎯 ALTERNATIVE - MODIFICATION MANUELLE GUIDÉE:');
console.log('==============================================');

console.log('\nSi MCP ne fonctionne pas, voici les modifications prioritaires:');

const priorityChanges = [
    { element: "Navigation 'Home'", change: "Accueil" },
    { element: "Navigation 'About Us'", change: "À Propos" },
    { element: "Bouton 'Get Quote'", change: "Obtenir Devis" },
    { element: "Bouton 'Call Now'", change: "Appeler" },
    { element: "Titre principal", change: "Gardons votre maison en parfait état" },
    { element: "'Our Core Services'", change: "Nos Services Principaux" },
    { element: "'Plumbing'", change: "Plomberie" },
    { element: "'Carpentry'", change: "Menuiserie" },
    { element: "'Painting'", change: "Peinture" }
];

priorityChanges.forEach((item, i) => {
    console.log(`${i+1}. ${item.element} → "${item.change}"`);
});

console.log('\n📋 INSTRUCTIONS MANUELLES:');
console.log('==========================');
console.log('1. Ouvrir Figma et sélectionner le design');
console.log('2. Double-cliquer sur chaque texte à modifier');
console.log('3. Remplacer par la traduction française');
console.log('4. Sauvegarder les modifications');

console.log('\n🚀 PROCHAINE ÉTAPE:');
console.log('===================');
console.log('Choix 1: Configurer MCP Figma (technique)');
console.log('Choix 2: Modifications manuelles guidées (rapide)');
console.log('Choix 3: Export HTML → Re-import avec traductions');

export { REAL_CONFIG, ACTUAL_TRANSLATIONS, priorityChanges };