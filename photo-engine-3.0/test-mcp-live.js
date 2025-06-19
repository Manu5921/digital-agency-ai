#!/usr/bin/env node

/**
 * TEST MCP LIVE avec vraie API KEY
 * Test des fonctions import-html et import-url
 */

console.log('🔑 TEST MCP LIVE - html.to.design avec API KEY');
console.log('==============================================\n');

// Configuration avec vraie API key
const CONFIG = {
    apiKey: "your-html-to-design-key-here",
    mcpServer: "@html-to-design/mcp-server"
};

console.log('✅ Configuration API:');
console.log(`- API Key: ${CONFIG.apiKey.substring(0, 20)}...`);
console.log(`- MCP Server: ${CONFIG.mcpServer}`);

// HTML de test réaliste basé sur nos designs Stitch précédents
const testHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cabinet Leroux & Associés - Test MCP</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background: #1a1a1a;
            color: #ffffff;
        }
        
        .header {
            background: #000000;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #d4af37;
        }
        
        .nav {
            display: flex;
            gap: 2rem;
        }
        
        .nav a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
        }
        
        .hero {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 120px 2rem;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #ffffff;
        }
        
        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2.5rem;
            color: #cccccc;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-button {
            background: #d4af37;
            color: #000000;
            padding: 18px 40px;
            border: none;
            border-radius: 8px;
            font-size: 1.2rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }
        
        .about {
            background: #f5f5f5;
            padding: 100px 2rem;
            color: #333333;
        }
        
        .about-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .about-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
            margin-top: 3rem;
        }
        
        .about-card {
            background: #ffffff;
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .about-card:hover {
            transform: translateY(-5px);
        }
        
        .icon {
            width: 80px;
            height: 80px;
            background: #d4af37;
            border-radius: 50%;
            margin: 0 auto 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }
        
        .about-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #1a1a1a;
        }
        
        .about-card p {
            color: #666666;
            line-height: 1.8;
        }
        
        .footer {
            background: #000000;
            color: #ffffff;
            padding: 3rem 2rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">CABINET LEROUX & ASSOCIÉS</div>
        <nav class="nav">
            <a href="#accueil">Accueil</a>
            <a href="#services">Services</a>
            <a href="#equipe">Équipe</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <section class="hero">
        <h1>Excellence Juridique depuis 15 ans</h1>
        <p>Cabinet d'avocats d'affaires reconnu, expert en droit des sociétés, fusions-acquisitions et contentieux commercial. Nous accompagnons les dirigeants dans leurs décisions stratégiques.</p>
        <button class="cta-button">Prendre Rendez-vous</button>
    </section>
    
    <section class="about">
        <div class="about-container">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem;">Notre Expertise</h2>
            <p style="text-align: center; font-size: 1.2rem; color: #666;">Sécuriser et optimiser les opérations juridiques de nos clients entreprises</p>
            
            <div class="about-grid">
                <div class="about-card">
                    <div class="icon">⚖️</div>
                    <h3>Droit des Sociétés</h3>
                    <p>Expertise pointue en création, restructuration et gouvernance d'entreprise. Accompagnement juridique complet pour tous vos projets de développement.</p>
                </div>
                
                <div class="about-card">
                    <div class="icon">🏆</div>
                    <h3>Fusions & Acquisitions</h3>
                    <p>Plus de 500 opérations sécurisées. Due diligence, négociation et structuration juridique de vos projets de croissance externe.</p>
                </div>
                
                <div class="about-card">
                    <div class="icon">⚡</div>
                    <h3>Réactivité Premium</h3>
                    <p>Réponse sous 24h garantie. Équipe dédiée disponible pour vos urgences juridiques et décisions stratégiques.</p>
                </div>
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <p>&copy; 2024 Cabinet Leroux & Associés - Tous droits réservés</p>
        <p>15 Avenue des Champs-Élysées, 75008 Paris | Tel: 01 42 00 00 00</p>
    </footer>
</body>
</html>`;

console.log('\n📋 HTML DE TEST PRÉPARÉ:');
console.log('========================');
console.log(`- Taille: ${testHtml.length} caractères`);
console.log('- Contenu: Cabinet avocat premium avec thème sombre');
console.log('- Style: Cohérent avec designs Stitch précédents');

console.log('\n🔧 PARAMÈTRES POUR MCP:');
console.log('=======================');

const mcpParams = {
    html: testHtml,
    projectName: "Cabinet Leroux Test MCP Live",
    options: {
        createNewFile: true,
        preserveStructure: true,
        optimizeForFigma: true,
        extractColors: true,
        generateComponents: true
    }
};

console.log(`✅ Project Name: ${mcpParams.projectName}`);
console.log(`✅ HTML Size: ${mcpParams.html.length} chars`);
console.log('✅ Options configurées pour optimisation Figma');

console.log('\n📊 DÉTAILS DESIGN À IMPORTER:');
console.log('==============================');
console.log('🎨 Palette couleurs:');
console.log('   - Primary: #1a1a1a (dark)');
console.log('   - Accent: #d4af37 (gold)');
console.log('   - Background: #f5f5f5 (light sections)');
console.log('   - Text: #ffffff / #333333');

console.log('\n🏗️ Structure attendue dans Figma:');
console.log('   - Header avec navigation');
console.log('   - Hero section avec CTA');
console.log('   - About section avec 3 cards');
console.log('   - Footer informationnel');

console.log('\n🚨 COMMANDE MCP À EXÉCUTER:');
console.log('============================');
console.log('Avec la configuration MCP active, exécuter:');
console.log('```');
console.log('mcp-client.call("import-html", {');
console.log('  html: testHtml,');
console.log('  projectName: "Cabinet Leroux Test MCP Live",');
console.log('  options: { optimizeForFigma: true }');
console.log('});');
console.log('```');

console.log('\n✅ VALIDATION ATTENDUE:');
console.log('========================');
console.log('- 🎯 Import réussi dans Figma');
console.log('- 📐 Structure des calques organisée');
console.log('- 🎨 Couleurs préservées correctement');
console.log('- 🔤 Typographies respectées');
console.log('- 📱 Responsive breakpoints détectés');

console.log('\n🔍 FICHIERS GÉNÉRÉS:');
console.log('====================');
console.log('- mcp-server-config.json (avec API key)');
console.log('- test-mcp-live.js (ce fichier)');
console.log('- HTML test ready pour import');

export { testHtml, mcpParams, CONFIG };