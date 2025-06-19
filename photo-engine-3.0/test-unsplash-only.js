#!/usr/bin/env node

/**
 * TEST SPÉCIFIQUE UNSPLASH API
 */

import { UniversalPhotoEngine } from './universal-photo-engine.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🎨 TEST SPÉCIFIQUE UNSPLASH API');
console.log('===============================\n');

async function testUnsplashOnly() {
    const engine = new UniversalPhotoEngine();
    
    console.log('🔑 Clé Unsplash:', process.env.UNSPLASH_ACCESS_KEY ? 'Configurée ✅' : 'Manquante ❌');
    
    try {
        // Test direct API Unsplash
        const keywords = {
            hero: ['professional lawyer', 'law office'],
            services: ['legal consultation']
        };
        
        console.log('🔍 Test recherche Unsplash...');
        const result = await engine.searchUnsplash(keywords, 'professional');
        
        console.log('📊 Résultats:');
        for (const [section, photos] of Object.entries(result)) {
            console.log(`   ${section}: ${photos?.length || 0} photos`);
            if (photos && photos.length > 0) {
                photos.forEach((photo, i) => {
                    console.log(`     ${i+1}. ${photo.source} - ${photo.url}`);
                    console.log(`        Alt: ${photo.alt}`);
                    console.log(`        Taille: ${photo.width}x${photo.height}`);
                });
            }
        }
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
    }
}

testUnsplashOnly();