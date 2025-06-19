#!/usr/bin/env node

/**
 * TRADUCTION FIGMA VIA API DIRECTE
 * Utilisation de l'API REST Figma pour modifier les textes
 */

const https = require('https');

const CONFIG = {
    token: "your-figma-token-here",
    fileId: "2RZSI2c1aQ8hGB2wvJEG2W",
    baseUrl: "api.figma.com"
};

// Textes identifiés dans la réponse API à traduire
const TEXT_TRANSLATIONS = {
    "We take pride in our work": "Nous sommes fiers de notre travail",
    "Reliable and professional home maintenance and repair services you can trust.": "Services de maintenance et réparation domiciliaires fiables et professionnels sur lesquels vous pouvez compter.",
    "Request Service": "Demander Service",
    "Our Core Services": "Nos Services Principaux",
    "Plumbing": "Plomberie",
    "Expert plumbing solutions for leaks, installations, and repairs.": "Solutions de plomberie expertes pour fuites, installations et réparations.",
    "Carpentry": "Menuiserie", 
    "Skilled carpentry for custom builds, repairs, and installations.": "Menuiserie qualifiée pour constructions sur mesure, réparations et installations.",
    "Painting": "Peinture",
    "Professional interior and exterior painting services.": "Services de peinture professionnels intérieurs et extérieurs.",
    "OUR INTRODUCTION": "NOTRE PRÉSENTATION",
    "Keeping your home in top condition": "Gardons votre maison en parfait état",
    "We are a team of home service experts that believe every home deserves to be well-maintained. Since 1995, we've been helping homeowners with quality repairs, providing virtually any home repair, installation and maintenance service.": "Nous sommes une équipe d'experts en services à domicile qui croit que chaque maison mérite d'être bien entretenue. Depuis 1995, nous aidons les propriétaires avec des réparations de qualité, fournissant pratiquement tout service de réparation, installation et maintenance domiciliaire.",
    "Integrity: We do what is right.": "Intégrité : Nous faisons ce qui est juste."
};

console.log('🔑 TRADUCTION FIGMA VIA API DIRECTE');
console.log('===================================\n');

console.log(`Token: ${CONFIG.token.substring(0, 20)}...`);
console.log(`File: ${CONFIG.fileId}`);
console.log(`Traductions: ${Object.keys(TEXT_TRANSLATIONS).length}`);

// Fonction pour faire les requêtes HTTPS
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: CONFIG.baseUrl,
            path: path,
            method: method,
            headers: {
                'X-Figma-Token': CONFIG.token,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve(parsed);
                } catch (e) {
                    resolve(responseData);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Fonction récursive pour trouver tous les nœuds de texte
function findTextNodes(node, textNodes = []) {
    if (node.type === 'TEXT') {
        textNodes.push({
            id: node.id,
            characters: node.characters,
            name: node.name
        });
    }
    
    if (node.children) {
        for (const child of node.children) {
            findTextNodes(child, textNodes);
        }
    }
    
    return textNodes;
}

// Fonction principale d'exécution
async function executeTranslation() {
    try {
        console.log('\n🔍 RÉCUPÉRATION DU FICHIER FIGMA...');
        console.log('===================================');
        
        const fileData = await makeRequest('GET', `/v1/files/${CONFIG.fileId}`);
        
        if (fileData.error) {
            throw new Error(`Erreur API: ${fileData.status} - ${fileData.err}`);
        }
        
        console.log('✅ Fichier récupéré avec succès');
        console.log(`📄 Nom: ${fileData.name}`);
        console.log(`📅 Dernière modification: ${fileData.lastModified}`);
        
        console.log('\n📝 RECHERCHE DES NŒUDS DE TEXTE...');
        console.log('==================================');
        
        const textNodes = findTextNodes(fileData.document);
        console.log(`✅ ${textNodes.length} nœuds de texte trouvés`);
        
        console.log('\n🔄 IDENTIFICATION DES TRADUCTIONS...');
        console.log('====================================');
        
        const nodesToUpdate = [];
        
        textNodes.forEach((node, index) => {
            const text = node.characters;
            if (TEXT_TRANSLATIONS[text]) {
                nodesToUpdate.push({
                    nodeId: node.id,
                    originalText: text,
                    frenchText: TEXT_TRANSLATIONS[text],
                    nodeName: node.name
                });
                console.log(`${index + 1}. Trouvé: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
                console.log(`   → "${TEXT_TRANSLATIONS[text].substring(0, 50)}${TEXT_TRANSLATIONS[text].length > 50 ? '...' : ''}"`);
            }
        });
        
        console.log(`\n📊 ${nodesToUpdate.length} textes à traduire identifiés`);
        
        if (nodesToUpdate.length === 0) {
            console.log('⚠️ Aucune traduction à effectuer');
            return;
        }
        
        console.log('\n🚀 APPLICATION DES TRADUCTIONS...');
        console.log('=================================');
        
        // Note: L'API Figma ne permet pas de modifier les textes directement via REST API
        // Il faut utiliser les plugins Figma ou l'API de plugins
        console.log('⚠️ LIMITATION API FIGMA:');
        console.log('L\'API REST Figma est en lecture seule.');
        console.log('Pour modifier les textes, nous devons utiliser:');
        console.log('1. Plugin Figma + API Plugin');
        console.log('2. Figma MCP Server (si disponible)');
        console.log('3. Modifications manuelles guidées');
        
        console.log('\n📋 GUIDE DE MODIFICATION MANUELLE:');
        console.log('==================================');
        
        nodesToUpdate.forEach((node, index) => {
            console.log(`\n${index + 1}. NŒUD: ${node.nodeName}`);
            console.log(`   📍 ID: ${node.nodeId}`);
            console.log(`   🔤 AVANT: "${node.originalText}"`);
            console.log(`   🔤 APRÈS: "${node.frenchText}"`);
            console.log(`   📝 ACTION: Double-cliquer sur le texte dans Figma et remplacer`);
        });
        
        console.log('\n✅ TRADUCTIONS PRÉPARÉES AVEC SUCCÈS');
        console.log('====================================');
        console.log(`📊 ${nodesToUpdate.length} modifications à appliquer manuellement`);
        
        return {
            success: true,
            textNodesFound: textNodes.length,
            translationsReady: nodesToUpdate.length,
            modifications: nodesToUpdate
        };
        
    } catch (error) {
        console.error('\n❌ ERREUR LORS DE LA TRADUCTION:');
        console.error('=================================');
        console.error(error.message);
        
        if (error.message.includes('403')) {
            console.log('\n🔧 SOLUTIONS:');
            console.log('1. Vérifier que le token Figma est valide');
            console.log('2. Confirmer les permissions sur le fichier');
            console.log('3. Vérifier que le fichier existe');
        }
        
        return { success: false, error: error.message };
    }
}

// Lancement du script
console.log('🚀 DÉMARRAGE DE LA TRADUCTION...\n');

executeTranslation()
    .then(result => {
        if (result.success) {
            console.log('\n🎉 SCRIPT TERMINÉ AVEC SUCCÈS !');
            console.log(`📱 Ouvrez Figma: https://www.figma.com/design/${CONFIG.fileId}/`);
            console.log('📝 Suivez le guide ci-dessus pour appliquer les traductions');
        } else {
            console.log('\n❌ Échec du script:', result.error);
        }
    })
    .catch(error => {
        console.error('\n💥 ERREUR CRITIQUE:', error.message);
    });

module.exports = { CONFIG, TEXT_TRANSLATIONS, executeTranslation };