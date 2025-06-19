#!/usr/bin/env node

/**
 * DEBUG MOTEUR - Vérifier le flux des API
 */

import { UniversalPhotoEngine } from './universal-photo-engine.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 DEBUG MOTEUR PHOTO ENGINE');
console.log('=============================\n');

async function debugSearchFlow() {
    const engine = new UniversalPhotoEngine();
    
    const keywords = {
        hero: ['professional lawyer', 'law office', 'legal consultation']
    };
    
    console.log('🔑 Clé Unsplash:', process.env.UNSPLASH_ACCESS_KEY ? 'OK' : 'Manquante');
    console.log('📝 Test avec keywords:', keywords.hero.join(', '));
    
    // Test direct de searchUnsplash
    console.log('\n1️⃣ Test searchUnsplash...');
    const unsplashResult = await engine.searchUnsplash(keywords, 'professional');
    console.log('Résultat Unsplash:', unsplashResult ? 'OK' : 'NULL');
    if (unsplashResult) {
        console.log('Sections:', Object.keys(unsplashResult));
        if (unsplashResult.hero) {
            console.log('Hero photos:', unsplashResult.hero.length);
            console.log('Première photo:', unsplashResult.hero[0]?.url);
        }
    }
    
    // Test direct de callUnsplashAPI
    console.log('\n2️⃣ Test callUnsplashAPI...');
    const apiResult = await engine.callUnsplashAPI('professional lawyer', 'professional', 2);
    console.log('Résultat API directe:', apiResult ? 'OK' : 'NULL');
    if (apiResult) {
        console.log('Nombre photos:', apiResult.length);
        console.log('Première photo API:', apiResult[0]?.url);
    }
    
    return { unsplashResult, apiResult };
}

debugSearchFlow().catch(console.error);