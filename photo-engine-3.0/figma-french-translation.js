#!/usr/bin/env node

/**
 * TRADUCTION FIGMA EN FRANÇAIS VIA MCP
 * Modification du design Stitch importé pour version française
 */

console.log('🇫🇷 TRADUCTION FIGMA - CABINET AVOCAT EN FRANÇAIS');
console.log('==================================================\n');

// Éléments textuels typiques à traduire basés sur nos designs Stitch
const englishToFrench = {
    // Navigation
    "Home": "Accueil",
    "Services": "Services", 
    "About": "À Propos",
    "About Us": "À Propos",
    "Team": "Équipe",
    "Contact": "Contact",
    "Contact Us": "Nous Contacter",
    
    // Hero Section
    "Really Unbelievable Solutions for all Legal Cases": "Solutions Juridiques d'Excellence pour tous vos Dossiers",
    "Legal Excellence": "Excellence Juridique",
    "Professional Legal Services": "Services Juridiques Professionnels",
    "Your Trusted Legal Partner": "Votre Partenaire Juridique de Confiance",
    "Get Started": "Commencer",
    "Contact Now": "Nous Contacter",
    "Schedule Consultation": "Prendre Rendez-vous",
    "Get Quote": "Obtenir un Devis",
    
    // About Section
    "About Our Firm": "À Propos de Notre Cabinet",
    "Why Choose Us": "Pourquoi Nous Choisir",
    "Our Expertise": "Notre Expertise",
    "Financial Analysis": "Analyse Financière",
    "Long Experience": "Longue Expérience",
    "Success Cases": "Cas de Succès",
    "Experience": "Expérience",
    "Results": "Résultats",
    "Trust": "Confiance",
    
    // Services
    "Practice Areas": "Domaines d'Expertise",
    "Areas of Practice": "Domaines de Pratique",
    "Our Services": "Nos Services",
    "Business Law": "Droit des Affaires",
    "Corporate Law": "Droit des Sociétés",
    "Family Law": "Droit de la Famille",
    "Real Estate": "Immobilier",
    "Personal Injury": "Préjudice Personnel",
    "Insurance Defense": "Défense Assurance",
    "Education Law": "Droit de l'Éducation",
    "Criminal Defense": "Défense Pénale",
    
    // Trust/Testimonials
    "Personalized Attention": "Attention Personnalisée",
    "Personalised Attention": "Attention Personnalisée",
    "Client Testimonials": "Témoignages Clients",
    "What Our Clients Say": "Ce que Disent nos Clients",
    "Trusted by Clients": "Clients Nous Font Confiance",
    
    // Footer
    "Law Counsel": "Cabinet Juridique",
    "Legal Counsel": "Conseil Juridique",
    "All Rights Reserved": "Tous Droits Réservés",
    "Privacy Policy": "Politique de Confidentialité",
    "Terms of Service": "Conditions d'Utilisation",
    
    // Descriptions courantes
    "We provide comprehensive legal services": "Nous fournissons des services juridiques complets",
    "Expert legal representation": "Représentation juridique experte",
    "Dedicated to your success": "Dédiés à votre succès",
    "Professional legal advice": "Conseils juridiques professionnels",
    "Years of experience": "Années d'expérience",
    "Satisfied clients": "Clients satisfaits",
    "Successful cases": "Affaires réussies"
};

console.log('📋 DICTIONNAIRE DE TRADUCTION:');
console.log('===============================');
console.log(`Nombre de traductions: ${Object.keys(englishToFrench).length}`);

// Afficher quelques exemples
console.log('\nExemples de traductions:');
Object.entries(englishToFrench).slice(0, 8).forEach(([en, fr]) => {
    console.log(`  "${en}" → "${fr}"`);
});

console.log('\n🔧 SCRIPT MCP POUR MODIFICATION FIGMA:');
console.log('======================================');

// Génération du script MCP pour Figma
const figmaModificationScript = {
    fileId: "2RZSI2c1aQ8hGB2wvJEG2W",
    nodeId: "1-162",
    modifications: []
};

// Créer les modifications pour chaque traduction
Object.entries(englishToFrench).forEach(([english, french]) => {
    figmaModificationScript.modifications.push({
        action: "update_text",
        selector: `text[content*="${english}"]`,
        newContent: french,
        preserveFormatting: true
    });
});

console.log('✅ Script de modification généré:');
console.log(`- File ID: ${figmaModificationScript.fileId}`);
console.log(`- Node ID: ${figmaModificationScript.nodeId}`);
console.log(`- Modifications: ${figmaModificationScript.modifications.length}`);

console.log('\n📝 COMMANDES MCP À EXÉCUTER:');
console.log('============================');

console.log('\n1. ACCÈS AU FICHIER FIGMA:');
console.log('```javascript');
console.log('await mcpFigma.call("get_file", {');
console.log(`  fileId: "${figmaModificationScript.fileId}"`);
console.log('});');
console.log('```');

console.log('\n2. MODIFICATION DES TEXTES:');
console.log('```javascript');
// Générer les commandes pour les traductions principales
const mainTranslations = [
    ["Really Unbelievable Solutions for all Legal Cases", "Solutions Juridiques d'Excellence"],
    ["About Our Firm", "À Propos de Notre Cabinet"],
    ["Contact Us", "Nous Contacter"],
    ["Practice Areas", "Domaines d'Expertise"],
    ["Why Choose Us", "Pourquoi Nous Choisir"]
];

mainTranslations.forEach(([en, fr]) => {
    console.log(`await mcpFigma.call("update_text", {`);
    console.log(`  fileId: "${figmaModificationScript.fileId}",`);
    console.log(`  nodeId: "text-node-id",`);
    console.log(`  content: "${fr}"`);
    console.log(`});`);
    console.log('');
});

console.log('```');

console.log('\n🎨 ADAPTATIONS FRANÇAISES RECOMMANDÉES:');
console.log('========================================');
console.log('- 📝 Tous les textes traduits en français professionnel');
console.log('- 🇫🇷 Mentions légales françaises ajoutées');
console.log('- 📍 Adresse française (Paris/Lyon/Marseille)');
console.log('- 📞 Numéros français (01 XX XX XX XX)');
console.log('- ⚖️ Références au droit français');
console.log('- 🏛️ Barreaux français (Paris, Lyon, etc.)');

console.log('\n📋 CONTENU FRANÇAIS SPÉCIFIQUE:');
console.log('===============================');

const frenchLegalContent = {
    heroTitle: "Cabinet d'Avocats d'Excellence",
    heroSubtitle: "Expertise juridique et accompagnement stratégique depuis 15 ans",
    ctaButton: "Prendre Rendez-vous",
    
    aboutTitle: "Notre Expertise",
    aboutDescription: "Cabinet reconnu spécialisé en droit des sociétés, fusions-acquisitions et contentieux commercial",
    
    services: [
        "Droit des Sociétés",
        "Droit Commercial", 
        "Fusions & Acquisitions",
        "Contentieux d'Affaires",
        "Droit Fiscal",
        "Propriété Intellectuelle"
    ],
    
    contact: {
        address: "15 Avenue des Champs-Élysées, 75008 Paris",
        phone: "01 42 00 00 00",
        email: "contact@cabinet-leroux.fr"
    }
};

console.log('Contenu français généré:');
console.log(`- Titre: ${frenchLegalContent.heroTitle}`);
console.log(`- Services: ${frenchLegalContent.services.length} domaines`);
console.log(`- Adresse: ${frenchLegalContent.contact.address}`);

console.log('\n🚀 PROCHAINES ÉTAPES:');
console.log('======================');
console.log('1. ✅ Utiliser MCP Figma pour accéder au fichier');
console.log('2. 🔍 Identifier les nodes de texte à modifier');
console.log('3. 📝 Appliquer les traductions via MCP');
console.log('4. 🎨 Ajuster le layout si nécessaire');
console.log('5. ✅ Valider la cohérence du design français');

export { englishToFrench, figmaModificationScript, frenchLegalContent };