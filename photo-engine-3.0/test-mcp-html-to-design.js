#!/usr/bin/env node

/**
 * TEST MCP SERVER html.to.design
 * Testing import-html and import-url functions
 */

console.log('🔧 TESTING MCP SERVER - html.to.design');
console.log('====================================\n');

// Sample HTML code from Stitch (simplified version for testing)
const sampleStitchCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cabinet Leroux & Associés</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1a1a1a;
            color: white;
        }
        .hero {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 100px 20px;
            text-align: center;
        }
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #ffffff;
        }
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            color: #cccccc;
        }
        .cta-button {
            background: #d4af37;
            color: #000;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .about {
            background: #f5f5f5;
            color: #333;
            padding: 80px 20px;
        }
        .about-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .about-card {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
        }
        .icon {
            width: 60px;
            height: 60px;
            background: #d4af37;
            border-radius: 50%;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Cabinet Leroux & Associés</h1>
        <p>Excellence juridique et accompagnement stratégique depuis 15 ans</p>
        <button class="cta-button">Prendre Rendez-vous</button>
    </section>
    
    <section class="about">
        <div class="about-grid">
            <div class="about-card">
                <div class="icon">⚖️</div>
                <h3>Expertise Reconnue</h3>
                <p>15 ans d'expérience en droit des sociétés</p>
            </div>
            <div class="about-card">
                <div class="icon">🏆</div>
                <h3>Résultats Prouvés</h3>
                <p>Plus de 500 opérations sécurisées</p>
            </div>
            <div class="about-card">
                <div class="icon">⚡</div>
                <h3>Réactivité</h3>
                <p>Réponse sous 24h garantie</p>
            </div>
        </div>
    </section>
</body>
</html>`;

/**
 * TEST 1: Import HTML Code (simulé)
 */
console.log('📋 TEST 1 - IMPORT HTML CODE');
console.log('----------------------------');
console.log('HTML Code Length:', sampleStitchCode.length, 'characters');
console.log('✅ Sample HTML code prepared for MCP import-html function');

/**
 * TEST 2: Import URL (simulé)
 */
console.log('\n🌐 TEST 2 - IMPORT URL');
console.log('---------------------');
const testUrl = 'https://example-stitch-design.com/cabinet-avocat';
console.log('Test URL:', testUrl);
console.log('✅ URL prepared for MCP import-url function');

/**
 * INSTRUCTIONS MCP
 */
console.log('\n🚀 INSTRUCTIONS POUR UTILISATION MCP:');
console.log('=====================================');
console.log('1. Configurer la clé API html.to.design dans le fichier config');
console.log('2. Lancer le serveur MCP avec la configuration fournie');
console.log('3. Utiliser les fonctions disponibles:');
console.log('   - import-html: Importer du code HTML directement');
console.log('   - import-url: Importer depuis une URL live');

console.log('\n📋 CODE D\'EXEMPLE POUR MCP:');
console.log('============================');
console.log('```javascript');
console.log('// Utilisation fonction import-html');
console.log('await mcpClient.call("import-html", {');
console.log('  html: sampleStitchCode,');
console.log('  projectName: "Cabinet Avocat Test",');
console.log('  figmaTeamId: "your-team-id"');
console.log('});');
console.log('```');

console.log('\n🔧 CONFIGURATION REQUISE:');
console.log('==========================');
console.log('- API Key html.to.design (gratuite/payante selon usage)');
console.log('- Figma Team ID pour import direct');
console.log('- NPX installé pour lancer le serveur MCP');

console.log('\n✅ AVANTAGES AUTOMATISATION:');
console.log('=============================');
console.log('- ⚡ Workflow 100% automatisé: Stitch → MCP → Figma');
console.log('- 🚫 Plus d\'étape manuelle html.to.design web');
console.log('- 📊 Intégration possible dans pipeline CI/CD');
console.log('- 🔄 Reproductibilité parfaite du processus');

console.log('\n⚠️  ÉTAPES SUIVANTES:');
console.log('=====================');
console.log('1. Obtenir API key html.to.design');
console.log('2. Configurer MCP server dans Claude Code');
console.log('3. Tester import-html avec le code ci-dessus');
console.log('4. Tester import-url avec une URL Stitch');
console.log('5. Valider import Figma avec design réel');

export { sampleStitchCode };