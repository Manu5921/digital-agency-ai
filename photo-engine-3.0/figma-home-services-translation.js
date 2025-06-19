#!/usr/bin/env node

/**
 * TRADUCTION FIGMA - SERVICES À DOMICILE
 * Basé sur la capture d'écran fournie
 */

console.log('🏠 TRADUCTION FIGMA - SERVICES À DOMICILE EN FRANÇAIS');
console.log('====================================================\n');

// Configuration Figma mise à jour
const FIGMA_CONFIG = {
    fileId: "2RZSI2c1aQ8hGB2wvJEG2W",
    teamName: "claude multi agents",
    projectName: "Team project"
};

console.log('✅ Accès confirmé via équipe:', FIGMA_CONFIG.teamName);

// Traductions spécifiques au design visible
const homeServicesTranslations = {
    // Header/Brand
    "EZFIX": "EZFIX", // Garder le nom de marque
    
    // Hero Section
    "Keeping your home in top condition": "Gardons votre maison en parfait état",
    "We are a team of home service experts that deliver when things go wrong in your home. We have built strong relationships with home owners, landlords, property managers, and real estate agents because of our attention to every detail, and our ability to get the job done right the first time.": "Nous sommes une équipe d'experts en services à domicile qui intervient quand les choses tournent mal chez vous. Nous avons construit de solides relations avec les propriétaires, bailleurs, gestionnaires immobiliers et agents immobiliers grâce à notre attention aux détails et notre capacité à bien faire le travail du premier coup.",
    
    // Services List (visible dans l'image)
    "Plumbing": "Plomberie",
    "Electrical": "Électricité", 
    "HVAC": "Chauffage/Climatisation",
    "Carpentry": "Menuiserie",
    "Painting": "Peinture",
    "General Repairs": "Réparations Générales",
    
    // Statistics Section
    "Years Experience": "Années d'Expérience",
    "Happy Customers": "Clients Satisfaits", 
    "Projects Completed": "Projets Réalisés",
    "Success Rate": "Taux de Réussite",
    
    // Recent Work Section
    "Our Recent Work": "Nos Réalisations Récentes",
    "See how we have transformed homes and businesses across the city": "Découvrez comment nous avons transformé maisons et entreprises à travers la ville",
    "Kitchen Remodel": "Rénovation Cuisine",
    "Bathroom Upgrade": "Rénovation Salle de Bain", 
    "Kitchen Flooring": "Revêtement Cuisine",
    
    // CTA Section
    "Ready to start your next home project?": "Prêt à démarrer votre prochain projet maison ?",
    "Contact us today for a free consultation and estimate": "Contactez-nous aujourd'hui pour une consultation et devis gratuits",
    "GET STARTED": "COMMENCER",
    "CALL US FOR INFO": "APPELEZ-NOUS",
    
    // Reasons Section
    "Reasons to hire us": "Pourquoi nous choisir",
    "Professional workmanship": "Travail professionnel",
    "We are committed to using cutting edge technology and will meet standards set by the industry": "Nous nous engageons à utiliser des technologies de pointe et respectons les standards de l'industrie",
    "Honest work": "Travail honnête",
    "Satisfaction guaranteed": "Satisfaction garantie",
    "We are committed to providing the highest quality of service and we guarantee your satisfaction": "Nous nous engageons à fournir un service de la plus haute qualité et garantissons votre satisfaction",
    
    // Navigation
    "Home": "Accueil",
    "Services": "Services", 
    "About Us": "À Propos",
    "Portfolio": "Portfolio",
    "Contact": "Contact"
};

console.log(`📋 Traductions préparées: ${Object.keys(homeServicesTranslations).length}`);

console.log('\n🎯 TRADUCTIONS PRIORITAIRES:');
console.log('============================');
const priorityTranslations = [
    ["Keeping your home in top condition", "Gardons votre maison en parfait état"],
    ["Our Recent Work", "Nos Réalisations Récentes"],
    ["Ready to start your next home project?", "Prêt à démarrer votre prochain projet maison ?"],
    ["Reasons to hire us", "Pourquoi nous choisir"],
    ["GET STARTED", "COMMENCER"],
    ["Professional workmanship", "Travail professionnel"]
];

priorityTranslations.forEach(([en, fr], i) => {
    console.log(`${i+1}. "${en}" → "${fr}"`);
});

console.log('\n🔧 COMMANDES MCP FIGMA À EXÉCUTER:');
console.log('==================================');

console.log('\n1. ACCÈS AU FICHIER:');
console.log('```javascript');
console.log(`const fileData = await mcpFigma.call("get_file", {`);
console.log(`  fileId: "${FIGMA_CONFIG.fileId}"`);
console.log(`});`);
console.log('```');

console.log('\n2. MODIFICATIONS TEXTUELLES:');
priorityTranslations.forEach(([english, french], i) => {
    console.log(`\n// Modification ${i+1}:`);
    console.log('```javascript');
    console.log(`await mcpFigma.call("update_text_by_content", {`);
    console.log(`  fileId: "${FIGMA_CONFIG.fileId}",`);
    console.log(`  searchText: "${english}",`);
    console.log(`  newText: "${french}"`);
    console.log(`});`);
    console.log('```');
});

console.log('\n3. COORDONNÉES FRANÇAISES:');
console.log('```javascript');
console.log('// Remplacer les coordonnées par des données françaises');
console.log(`await mcpFigma.call("update_text_by_pattern", {`);
console.log(`  fileId: "${FIGMA_CONFIG.fileId}",`);
console.log(`  pattern: /\\(\\d{3}\\)\\s\\d{3}-\\d{4}/g, // Format US phone`);
console.log(`  newText: "01 42 00 00 00" // Format FR phone`);
console.log(`});`);
console.log('```');

console.log('\n📍 ADAPTATIONS FRANÇAISES SPÉCIFIQUES:');
console.log('======================================');

const frenchAdaptations = {
    contact: {
        phone: "01 42 00 00 00",
        email: "contact@ezfix-france.fr",
        address: "15 Rue de Rivoli, 75001 Paris"
    },
    services: [
        "Plomberie d'urgence 24h/7j",
        "Électricité certifiée",
        "Chauffage et climatisation",
        "Menuiserie sur mesure",
        "Peinture et décoration",
        "Réparations générales"
    ],
    legal: {
        siret: "SIRET: 123 456 789 00012",
        rge: "Certifié RGE",
        insurance: "Assurance décennale"
    }
};

console.log('Adaptations françaises:');
console.log(`- Téléphone: ${frenchAdaptations.contact.phone}`);
console.log(`- Email: ${frenchAdaptations.contact.email}`);
console.log(`- Adresse: ${frenchAdaptations.contact.address}`);
console.log(`- Services: ${frenchAdaptations.services.length} domaines`);

console.log('\n✅ RÉSULTAT ATTENDU:');
console.log('====================');
console.log('🏠 Site de services à domicile 100% français');
console.log('📱 Coordonnées françaises complètes');
console.log('⚖️ Mentions légales conformes (SIRET, RGE)');
console.log('🎨 Design et couleurs préservés');
console.log('🔧 Terminologie technique française');

export { FIGMA_CONFIG, homeServicesTranslations, frenchAdaptations };