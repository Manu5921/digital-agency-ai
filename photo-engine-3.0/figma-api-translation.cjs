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
                console.log(`${nodesToUpdate.length}. Trouvé: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
                console.log(`   → "${TEXT_TRANSLATIONS[text].substring(0, 50)}${TEXT_TRANSLATIONS[text].length > 50 ? '...' : ''}"`);
            }
        });
        
        console.log(`\n📊 ${nodesToUpdate.length} textes à traduire identifiés`);
        
        if (nodesToUpdate.length === 0) {
            console.log('⚠️ Aucune traduction à effectuer');
            console.log('\n📝 TEXTES DISPONIBLES DANS LE FICHIER:');
            textNodes.slice(0, 10).forEach((node, i) => {
                console.log(`${i+1}. "${node.characters.substring(0, 60)}${node.characters.length > 60 ? '...' : ''}"`);
            });
            return;
        }
        
        console.log('\n📋 GUIDE DE MODIFICATION MANUELLE:');
        console.log('==================================');
        console.log('L\'API REST Figma est en lecture seule.');
        console.log('Voici les étapes pour modifier manuellement:');
        
        nodesToUpdate.forEach((node, index) => {
            console.log(`\n${index + 1}. TEXTE À MODIFIER:`);
            console.log(`   📝 Rechercher: "${node.originalText}"`);
            console.log(`   ✅ Remplacer par: "${node.frenchText}"`);
            console.log(`   📍 Node ID: ${node.nodeId}`);
        });
        
        console.log('\n🎯 INSTRUCTIONS FIGMA:');
        console.log('======================');
        console.log('1. Ouvrez le fichier Figma');
        console.log('2. Utilisez Ctrl+F (Cmd+F) pour rechercher chaque texte');
        console.log('3. Double-cliquez pour éditer');
        console.log('4. Remplacez par la traduction française');
        console.log('5. Répétez pour tous les textes');
        
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
        
        return { success: false, error: error.message };
    }
}

// Lancement du script
console.log('🚀 DÉMARRAGE DE LA TRADUCTION...\n');

executeTranslation()
    .then(result => {
        if (result.success) {
            console.log('\n🎉 ANALYSE TERMINÉE AVEC SUCCÈS !');
            console.log(`📱 Figma: https://www.figma.com/design/${CONFIG.fileId}/`);
            console.log('📝 Suivez le guide ci-dessus pour appliquer les traductions');
        } else {
            console.log('\n❌ Échec du script:', result.error);
        }
    })
    .catch(error => {
        console.error('\n💥 ERREUR CRITIQUE:', error.message);
    });