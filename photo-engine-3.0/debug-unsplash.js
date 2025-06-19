#!/usr/bin/env node

/**
 * DEBUG UNSPLASH API - Vérification directe
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 DEBUG UNSPLASH API');
console.log('=====================\n');

async function testUnsplashDirect() {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    
    console.log('🔑 Clé API:', accessKey ? 'Configurée ✅' : 'Manquante ❌');
    console.log('🔑 Longueur clé:', accessKey?.length || 0);
    
    if (!accessKey || accessKey === 'demo-key') {
        console.log('❌ Pas de clé valide');
        return;
    }
    
    try {
        const query = 'professional lawyer';
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape&client_id=${accessKey}`;
        
        console.log('🌐 URL de test:', url.replace(accessKey, 'HIDDEN_KEY'));
        console.log('📡 Envoi requête...\n');
        
        const response = await fetch(url);
        
        console.log('📊 Statut réponse:', response.status);
        console.log('📊 Statut texte:', response.statusText);
        console.log('📊 Headers pertinents:');
        console.log('   - Content-Type:', response.headers.get('content-type'));
        console.log('   - X-Ratelimit-Remaining:', response.headers.get('x-ratelimit-remaining'));
        console.log('   - X-Ratelimit-Limit:', response.headers.get('x-ratelimit-limit'));
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ Erreur API:', errorText);
            return;
        }
        
        const data = await response.json();
        
        console.log('\n✅ SUCCÈS !');
        console.log('📸 Photos trouvées:', data.results?.length || 0);
        console.log('📊 Total disponible:', data.total || 0);
        
        if (data.results && data.results.length > 0) {
            console.log('\n📸 Exemples photos:');
            data.results.slice(0, 2).forEach((photo, i) => {
                console.log(`   ${i+1}. ID: ${photo.id}`);
                console.log(`      URL: ${photo.urls.regular}`);
                console.log(`      Alt: ${photo.alt_description || 'N/A'}`);
                console.log(`      Taille: ${photo.width}x${photo.height}`);
                console.log(`      Photographe: ${photo.user.name}`);
            });
        }
        
        return data;
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

testUnsplashDirect();