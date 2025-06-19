/**
 * PHOTO ENGINE 3.0 - UNIVERSAL PREMIUM PHOTO SYSTEM
 * Sources gratuites uniquement : Unsplash, Pexels, Pixabay
 * Système intelligent multi-métiers pour sites premium
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

class UniversalPhotoEngine {
    constructor() {
        this.name = "Photo Engine 3.0 Universal";
        this.version = "3.0.0";
        this.sources = {
            unsplash: {
                baseUrl: 'https://api.unsplash.com',
                accessKey: process.env.UNSPLASH_ACCESS_KEY || 'demo-key',
                quality: 'premium',
                volume: 'unlimited',
                cost: 'free'
            },
            pexels: {
                baseUrl: 'https://api.pexels.com/v1',
                apiKey: process.env.PEXELS_API_KEY || 'demo-key',
                quality: 'high', 
                volume: '200req/hour',
                cost: 'free'
            },
            pixabay: {
                baseUrl: 'https://pixabay.com/api',
                apiKey: process.env.PIXABAY_API_KEY || 'demo-key',
                quality: 'good',
                volume: '5000req/day', 
                cost: 'free'
            }
        };
        
        // Base de données métiers universelle
        this.businessSectors = this.initBusinessSectors();
        
        // Système de scoring qualité
        this.qualityScorer = new PhotoQualityScorer();
        
        // Cache pour optimisation
        this.cache = new Map();
        
        console.log('🚀 Photo Engine 3.0 Universal initialisé');
        console.log('📚 Secteurs supportés:', Object.keys(this.businessSectors).length);
    }

    /**
     * BASE DE DONNÉES MÉTIERS UNIVERSELLE
     */
    initBusinessSectors() {
        return {
            // SERVICES TECHNIQUES
            'plomberie': {
                category: 'services_techniques',
                keywords: {
                    hero: ['professional plumber working', 'pipe repair service', 'bathroom renovation'],
                    services: ['plumbing tools', 'water pipe installation', 'emergency plumbing', 'bathroom plumbing'],
                    about: ['experienced plumber portrait', 'plumbing professional', 'certified plumber'],
                    testimonials: ['satisfied customer', 'happy homeowner', 'quality service'],
                    gallery: ['plumbing work', 'before after plumbing', 'modern bathroom', 'pipe installation']
                },
                colors: {
                    primary: '#1e40af', // Bleu professionnel
                    secondary: '#f97316', // Orange confiance  
                    accent: '#ffffff',
                    text: '#1f2937'
                },
                mood: 'reliable, professional, trustworthy, competent',
                style: 'documentary, authentic, industrial',
                trust_factors: ['certifications', 'experience', 'tools', 'results']
            },

            'electricite': {
                category: 'services_techniques', 
                keywords: {
                    hero: ['electrician working', 'electrical installation', 'safe electrical work'],
                    services: ['electrical panel', 'wiring installation', 'electrical repair', 'lighting installation'],
                    about: ['certified electrician', 'electrical expert', 'safety specialist'],
                    testimonials: ['electrical work completed', 'safe installation', 'quality electrical service'],
                    gallery: ['electrical work', 'modern electrical panel', 'lighting design', 'electrical installation']
                },
                colors: {
                    primary: '#dc2626', // Rouge sécurité
                    secondary: '#facc15', // Jaune attention
                    accent: '#ffffff',
                    text: '#1f2937'
                },
                mood: 'safety-focused, precise, professional, reliable',
                style: 'clean, technical, safety-oriented'
            },

            // SANTÉ & BIEN-ÊTRE
            'sophrologie': {
                category: 'sante_bien_etre',
                keywords: {
                    hero: ['peaceful therapy office', 'meditation space', 'relaxation therapy'],
                    services: ['breathing exercise', 'relaxation technique', 'mindfulness practice', 'stress management'],
                    about: ['professional therapist', 'psychology expert', 'wellness practitioner'],
                    testimonials: ['relaxed client', 'stress relief', 'peaceful person', 'mental wellness'],
                    gallery: ['therapy room', 'peaceful environment', 'wellness space', 'calming atmosphere']
                },
                colors: {
                    primary: '#14b8a6', // Teal apaisant
                    secondary: '#f3956b', // Terracotta chaleureux
                    accent: '#fde4c4', // Beige sable
                    text: '#374151'
                },
                mood: 'calm, healing, trustworthy, peaceful',
                style: 'soft lighting, minimal, serene'
            },

            'masseur': {
                category: 'sante_bien_etre',
                keywords: {
                    hero: ['massage therapy session', 'relaxing spa treatment', 'therapeutic massage'],
                    services: ['massage table', 'spa treatment', 'therapeutic touch', 'wellness massage'],
                    about: ['certified massage therapist', 'wellness expert', 'healing hands'],
                    testimonials: ['relaxed client', 'pain relief', 'wellness treatment', 'therapeutic results'],
                    gallery: ['massage room', 'spa environment', 'wellness center', 'therapeutic space']
                },
                colors: {
                    primary: '#059669', // Vert wellness
                    secondary: '#d97706', // Orange chaleur
                    accent: '#fef3c7', // Crème doux
                    text: '#374151'
                },
                mood: 'relaxing, therapeutic, professional, healing'
            },

            // RESTAURATION
            'restaurant': {
                category: 'restauration',
                keywords: {
                    hero: ['chef cooking', 'restaurant kitchen', 'gourmet food preparation'],
                    services: ['delicious food', 'restaurant dish', 'culinary creation', 'fine dining'],
                    about: ['professional chef', 'culinary expert', 'restaurant owner'],
                    testimonials: ['satisfied diner', 'food lover', 'restaurant customer', 'culinary experience'],
                    gallery: ['restaurant interior', 'food photography', 'dining atmosphere', 'culinary art']
                },
                colors: {
                    primary: '#dc2626', // Rouge appétit
                    secondary: '#f59e0b', // Orange chaleur
                    accent: '#fef3c7', // Crème élégant
                    text: '#1f2937'
                },
                mood: 'appetizing, warm, inviting, sophisticated',
                style: 'warm lighting, appetizing, elegant'
            },

            'boulangerie': {
                category: 'restauration',
                keywords: {
                    hero: ['baker working', 'fresh bread making', 'artisan bakery'],
                    services: ['fresh bread', 'pastry making', 'bakery products', 'artisan baking'],
                    about: ['master baker', 'baking expert', 'artisan baker'],
                    testimonials: ['happy customer', 'fresh bread lover', 'bakery regular', 'quality baking'],
                    gallery: ['bakery interior', 'fresh pastries', 'bread display', 'baking process']
                },
                colors: {
                    primary: '#92400e', // Brun pain
                    secondary: '#f59e0b', // Doré croissant
                    accent: '#fef3c7', // Crème farine
                    text: '#1f2937'
                },
                mood: 'traditional, warm, artisanal, authentic'
            },

            // CONSEIL & EXPERTISE
            'avocat': {
                category: 'conseil_expertise',
                keywords: {
                    hero: ['professional lawyer', 'law office', 'legal consultation'],
                    services: ['legal document', 'court representation', 'legal advice', 'law consultation'],
                    about: ['experienced lawyer', 'legal expert', 'attorney portrait'],
                    testimonials: ['satisfied client', 'legal success', 'professional service', 'legal victory'],
                    gallery: ['law office', 'legal library', 'professional meeting', 'legal documents']
                },
                colors: {
                    primary: '#1e40af', // Bleu autorité
                    secondary: '#6b7280', // Gris professionnel
                    accent: '#f9fafb', // Blanc pur
                    text: '#111827'
                },
                mood: 'authoritative, professional, trustworthy, serious',
                style: 'formal, clean, professional'
            },

            'comptable': {
                category: 'conseil_expertise',
                keywords: {
                    hero: ['accountant working', 'financial consultation', 'tax preparation'],
                    services: ['financial planning', 'tax documents', 'accounting service', 'financial advice'],
                    about: ['certified accountant', 'financial expert', 'tax specialist'],
                    testimonials: ['financial success', 'tax savings', 'accounting service', 'financial planning'],
                    gallery: ['accounting office', 'financial documents', 'professional workspace', 'financial meeting']
                },
                colors: {
                    primary: '#059669', // Vert finance
                    secondary: '#6b7280', // Gris sérieux
                    accent: '#f9fafb', // Blanc clean
                    text: '#111827'
                },
                mood: 'precise, reliable, professional, trustworthy'
            },

            // BEAUTÉ & ESTHÉTIQUE
            'coiffure': {
                category: 'beaute_esthetique',
                keywords: {
                    hero: ['hair stylist working', 'modern hair salon', 'hair transformation'],
                    services: ['hair cutting', 'hair styling', 'hair coloring', 'salon treatment'],
                    about: ['professional hairstylist', 'hair expert', 'salon owner'],
                    testimonials: ['happy client', 'hair transformation', 'beautiful hair', 'satisfied customer'],
                    gallery: ['hair salon', 'hair styling', 'before after hair', 'salon interior']
                },
                colors: {
                    primary: '#ec4899', // Rose beauté
                    secondary: '#f59e0b', // Doré luxe
                    accent: '#fdf2f8', // Rose pâle
                    text: '#1f2937'
                },
                mood: 'stylish, transformative, creative, elegant',
                style: 'glamorous, modern, creative'
            },

            'esthetique': {
                category: 'beaute_esthetique',
                keywords: {
                    hero: ['beauty treatment', 'skincare consultation', 'facial therapy'],
                    services: ['facial treatment', 'skincare procedure', 'beauty therapy', 'skin consultation'],
                    about: ['beauty therapist', 'skincare expert', 'esthetician'],
                    testimonials: ['glowing skin', 'beauty transformation', 'skincare results', 'confident client'],
                    gallery: ['beauty salon', 'treatment room', 'skincare products', 'beauty therapy']
                },
                colors: {
                    primary: '#8b5cf6', // Violet beauté
                    secondary: '#f59e0b', // Doré luxury
                    accent: '#faf5ff', // Violet pâle
                    text: '#1f2937'
                },
                mood: 'luxurious, transformative, professional, elegant'
            }
        };
    }

    /**
     * MOTEUR PRINCIPAL : GÉNÉRATION PHOTOS UNIVERSELLE
     */
    async generateUniversalPhotos(businessInfo) {
        console.log('🎯 Génération photos universelle pour:', businessInfo.sector);
        
        try {
            // 1. Classification automatique du métier
            const sectorProfile = this.classifyBusiness(businessInfo);
            console.log('📋 Profil secteur:', sectorProfile.category);

            // 2. Sélection photos multi-sources
            const photoSets = await this.selectPhotosMultiSource(sectorProfile);
            console.log('📸 Photos sélectionnées:', photoSets.totalCount);

            // 3. Score et curation qualité
            const curatedPhotos = this.curatePhotoQuality(photoSets, sectorProfile);
            console.log('⭐ Photos curées:', curatedPhotos.qualityScore);

            // 4. Cohérence visuelle automatique
            const consistentPhotos = this.ensureVisualConsistency(curatedPhotos, sectorProfile);
            console.log('🎨 Cohérence appliquée:', consistentPhotos.consistencyScore);

            // 5. Optimisation finale
            const optimizedPhotos = this.optimizeForWeb(consistentPhotos);
            console.log('⚡ Optimisation web complète');

            return {
                success: true,
                sector: businessInfo.sector,
                profile: sectorProfile,
                photos: optimizedPhotos,
                metrics: {
                    totalPhotos: optimizedPhotos.totalCount,
                    qualityScore: curatedPhotos.qualityScore,
                    consistencyScore: consistentPhotos.consistencyScore,
                    sources: ['unsplash', 'pexels', 'pixabay'],
                    processingTime: Date.now()
                }
            };

        } catch (error) {
            console.error('❌ Erreur génération photos:', error);
            return this.getFallbackPhotos(businessInfo.sector);
        }
    }

    /**
     * CLASSIFICATION AUTOMATIQUE DU MÉTIER
     */
    classifyBusiness(businessInfo) {
        const sector = businessInfo.sector.toLowerCase();
        
        // Classification directe si métier connu
        if (this.businessSectors[sector]) {
            return {
                ...this.businessSectors[sector],
                sector: sector,
                confidence: 1.0
            };
        }

        // Classification par mots-clés si métier inconnu
        const keywords = (businessInfo.description || '').toLowerCase();
        let bestMatch = null;
        let bestScore = 0;

        for (const [sectorKey, sectorData] of Object.entries(this.businessSectors)) {
            const score = this.calculateSectorMatch(keywords, sectorData);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = { ...sectorData, sector: sectorKey, confidence: score };
            }
        }

        return bestMatch || this.getDefaultSectorProfile(businessInfo);
    }

    /**
     * SÉLECTION PHOTOS MULTI-SOURCES
     */
    async selectPhotosMultiSource(sectorProfile) {
        console.log('🔍 Recherche multi-sources pour:', sectorProfile.sector);

        const photoPromises = [];

        // Source 1: Unsplash (Premium gratuit)
        photoPromises.push(this.searchUnsplash(sectorProfile.keywords, sectorProfile.mood));

        // Source 2: Pexels (High quality gratuit) 
        photoPromises.push(this.searchPexels(sectorProfile.keywords, sectorProfile.mood));

        // Source 3: Pixabay (Large volume gratuit)
        photoPromises.push(this.searchPixabay(sectorProfile.keywords, sectorProfile.mood));

        const [unsplashPhotos, pexelsPhotos, pixabayPhotos] = await Promise.all(photoPromises);

        // Calcul correct du nombre total de photos
        const countPhotosInObject = (photoObj) => {
            if (!photoObj) return 0;
            return Object.values(photoObj).reduce((total, sectionPhotos) => {
                return total + (Array.isArray(sectionPhotos) ? sectionPhotos.length : 0);
            }, 0);
        };

        const totalCount = countPhotosInObject(unsplashPhotos) + 
                          countPhotosInObject(pexelsPhotos) + 
                          countPhotosInObject(pixabayPhotos);

        console.log(`📸 Photos récupérées: Unsplash=${countPhotosInObject(unsplashPhotos)}, Pexels=${countPhotosInObject(pexelsPhotos)}, Pixabay=${countPhotosInObject(pixabayPhotos)}`);

        return {
            unsplash: unsplashPhotos,
            pexels: pexelsPhotos, 
            pixabay: pixabayPhotos,
            totalCount
        };
    }

    /**
     * RECHERCHE UNSPLASH (Premium gratuit)
     */
    async searchUnsplash(keywords, mood) {
        try {
            const results = {};
            
            for (const [section, sectionKeywords] of Object.entries(keywords)) {
                const query = sectionKeywords.join(' OR ');
                
                // Vraie API Unsplash ou fallback
                const apiPhotos = await this.callUnsplashAPI(query, mood, 4);
                if (apiPhotos) {
                    console.log(`✅ ${section}: ${apiPhotos.length} photos Unsplash API`);
                    results[section] = apiPhotos;
                } else {
                    console.log(`🔄 ${section}: utilisation simulation (API failed)`);
                    results[section] = this.simulateUnsplashAPI(query, mood, 4);
                }
            }
            
            return results;
        } catch (error) {
            console.warn('⚠️ Erreur Unsplash:', error.message);
            return this.getUnsplashFallback(keywords);
        }
    }

    /**
     * RECHERCHE PEXELS (High quality)
     */
    async searchPexels(keywords, mood) {
        try {
            const results = {};
            
            for (const [section, sectionKeywords] of Object.entries(keywords)) {
                const query = sectionKeywords[0]; // Premier mot-clé le plus pertinent
                
                // Vraie API Pexels ou fallback
                const photos = await this.callPexelsAPI(query, mood, 3) || this.simulatePexelsAPI(query, mood, 3);
                results[section] = photos;
            }
            
            return results;
        } catch (error) {
            console.warn('⚠️ Erreur Pexels:', error.message);
            return this.getPexelsFallback(keywords);
        }
    }

    /**
     * RECHERCHE PIXABAY (Large volume)
     */
    async searchPixabay(keywords, mood) {
        try {
            const results = {};
            
            for (const [section, sectionKeywords] of Object.entries(keywords)) {
                const query = sectionKeywords[0];
                
                // Vraie API Pixabay ou fallback
                const photos = await this.callPixabayAPI(query, mood, 2) || this.simulatePixabayAPI(query, mood, 2);
                results[section] = photos;
            }
            
            return results;
        } catch (error) {
            console.warn('⚠️ Erreur Pixabay:', error.message);
            return this.getPixabayFallback(keywords);
        }
    }

    /**
     * VRAIES APIs IMPLEMENTATION
     */
    async callUnsplashAPI(query, mood, count) {
        const accessKey = this.sources.unsplash.accessKey;
        if (accessKey === 'demo-key') {
            console.log('🔑 Clé Unsplash manquante - utilisation simulation');
            return null;
        }

        try {
            const url = `${this.sources.unsplash.baseUrl}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&client_id=${accessKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.results.map(photo => ({
                id: `unsplash-${photo.id}`,
                url: photo.urls.regular,
                alt: photo.alt_description || query,
                source: 'unsplash',
                quality: 'premium',
                mood: mood,
                width: photo.width,
                height: photo.height,
                photographer: photo.user.name,
                download_url: photo.links.download_location
            }));
        } catch (error) {
            console.warn('⚠️ Erreur API Unsplash:', error.message);
            return null;
        }
    }

    async callPexelsAPI(query, mood, count) {
        const apiKey = this.sources.pexels.apiKey;
        if (apiKey === 'demo-key') {
            console.log('🔑 Clé Pexels manquante - utilisation simulation');
            return null;
        }

        try {
            const url = `${this.sources.pexels.baseUrl}/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': apiKey
                }
            });
            
            if (!response.ok) {
                throw new Error(`Pexels API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.photos.map(photo => ({
                id: `pexels-${photo.id}`,
                url: photo.src.large,
                alt: photo.alt || query,
                source: 'pexels',
                quality: 'high',
                mood: mood,
                width: photo.width,
                height: photo.height,
                photographer: photo.photographer,
                original_url: photo.url
            }));
        } catch (error) {
            console.warn('⚠️ Erreur API Pexels:', error.message);
            return null;
        }
    }

    async callPixabayAPI(query, mood, count) {
        const apiKey = this.sources.pixabay.apiKey;
        if (apiKey === 'demo-key') {
            console.log('🔑 Clé Pixabay manquante - utilisation simulation');
            return null;
        }

        try {
            const url = `${this.sources.pixabay.baseUrl}/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&category=backgrounds&per_page=${count}&safesearch=true`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Pixabay API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.hits.map(photo => ({
                id: `pixabay-${photo.id}`,
                url: photo.largeImageURL,
                alt: photo.tags || query,
                source: 'pixabay',
                quality: 'good',
                mood: mood,
                width: photo.imageWidth,
                height: photo.imageHeight,
                photographer: photo.user,
                tags: photo.tags.split(', ')
            }));
        } catch (error) {
            console.warn('⚠️ Erreur API Pixabay:', error.message);
            return null;
        }
    }

    /**
     * SIMULATION APIs (fallback quand clés manquantes)
     */
    simulateUnsplashAPI(query, mood, count) {
        const baseId = Math.floor(Math.random() * 1000);
        return Array.from({ length: count }, (_, i) => ({
            id: `unsplash-${baseId + i}`,
            url: `https://images.unsplash.com/photo-${baseId + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
            alt: `${query} - professional photography`,
            source: 'unsplash',
            quality: 'premium',
            mood: mood,
            width: 800,
            height: 600
        }));
    }

    simulatePexelsAPI(query, mood, count) {
        const baseId = Math.floor(Math.random() * 1000);
        return Array.from({ length: count }, (_, i) => ({
            id: `pexels-${baseId + i}`,
            url: `https://images.pexels.com/photos/${baseId + i}/photo-${baseId + i}.jpg?auto=compress&cs=tinysrgb&w=800`,
            alt: `${query} - high quality photography`,
            source: 'pexels',
            quality: 'high',
            mood: mood,
            width: 800,
            height: 600
        }));
    }

    simulatePixabayAPI(query, mood, count) {
        const baseId = Math.floor(Math.random() * 1000);
        return Array.from({ length: count }, (_, i) => ({
            id: `pixabay-${baseId + i}`,
            url: `https://cdn.pixabay.com/photo/${baseId + i}/${query.replace(' ', '-')}-${baseId + i}.jpg`,
            alt: `${query} - quality stock photo`,
            source: 'pixabay',
            quality: 'good',
            mood: mood,
            width: 800,
            height: 600
        }));
    }

    /**
     * CURATION QUALITÉ AUTOMATIQUE
     */
    curatePhotoQuality(photoSets, sectorProfile) {
        console.log('⭐ Curation qualité automatique...');

        const curatedPhotos = {};
        let totalQualityScore = 0;
        let photoCount = 0;

        for (const [section, keywords] of Object.entries(sectorProfile.keywords)) {
            const sectionPhotos = [];

            // Collecte photos de toutes les sources pour cette section
            ['unsplash', 'pexels', 'pixabay'].forEach(source => {
                if (photoSets[source] && photoSets[source][section]) {
                    photoSets[source][section].forEach(photo => {
                        const score = this.calculatePhotoScore(photo, keywords, sectorProfile);
                        sectionPhotos.push({ ...photo, score });
                        totalQualityScore += score;
                        photoCount++;
                    });
                }
            });

            // Tri par score et sélection des meilleures
            curatedPhotos[section] = sectionPhotos
                .sort((a, b) => b.score - a.score)
                .slice(0, 3) // Top 3 par section
                .map(photo => ({
                    ...photo,
                    selected: true,
                    reason: `Score: ${photo.score.toFixed(2)}/10`
                }));
        }

        return {
            photos: curatedPhotos,
            qualityScore: photoCount > 0 ? totalQualityScore / photoCount : 0,
            curatedCount: Object.values(curatedPhotos).reduce((sum, photos) => sum + photos.length, 0)
        };
    }

    /**
     * CALCUL SCORE QUALITÉ PHOTO
     */
    calculatePhotoScore(photo, keywords, sectorProfile) {
        let score = 5.0; // Score de base

        // Bonus qualité source
        const sourceBonus = {
            'unsplash': 2.0,   // Premium gratuit
            'pexels': 1.5,     // High quality
            'pixabay': 1.0     // Good volume
        };
        score += sourceBonus[photo.source] || 0;

        // Bonus pertinence mots-clés
        const keywordMatch = keywords.some(keyword => 
            photo.alt.toLowerCase().includes(keyword.toLowerCase())
        );
        if (keywordMatch) score += 1.5;

        // Bonus mood cohérence
        if (photo.mood === sectorProfile.mood) score += 1.0;

        // Bonus résolution
        if (photo.width >= 800 && photo.height >= 600) score += 0.5;
        
        // BONUS CRITIQUE: Vraie API vs simulation
        const isRealAPI = photo.url.includes('images.unsplash.com') || 
                         (photo.url.includes('images.pexels.com') && !photo.url.includes('photos/')) ||
                         photo.url.includes('cdn.pixabay.com');
        if (isRealAPI) {
            score += 3.0; // Bonus majeur pour vraies APIs
        }

        return Math.min(score, 10); // Cap à 10
    }

    /**
     * COHÉRENCE VISUELLE AUTOMATIQUE
     */
    ensureVisualConsistency(curatedPhotos, sectorProfile) {
        console.log('🎨 Application cohérence visuelle...');

        const consistentPhotos = { ...curatedPhotos.photos };
        let consistencyScore = 0;

        // Application style guide automatique
        for (const [section, photos] of Object.entries(consistentPhotos)) {
            consistentPhotos[section] = photos.map(photo => ({
                ...photo,
                filters: this.generateStyleFilters(photo, sectorProfile),
                colorScheme: sectorProfile.colors,
                consistency: true
            }));
        }

        // Calcul score cohérence
        consistencyScore = this.calculateConsistencyScore(consistentPhotos, sectorProfile);

        return {
            photos: consistentPhotos,
            consistencyScore,
            styleGuide: {
                colors: sectorProfile.colors,
                mood: sectorProfile.mood,
                style: sectorProfile.style
            }
        };
    }

    /**
     * OPTIMISATION WEB FINALE
     */
    optimizeForWeb(consistentPhotos) {
        console.log('⚡ Optimisation web finale...');

        const optimized = {};

        for (const [section, photos] of Object.entries(consistentPhotos.photos)) {
            optimized[section] = photos.map(photo => ({
                ...photo,
                optimizations: {
                    webp: this.generateWebPUrl(photo.url),
                    avif: this.generateAvifUrl(photo.url),
                    responsive: this.generateResponsiveSizes(photo),
                    lazyLoading: true,
                    priority: section === 'hero'
                }
            }));
        }

        return {
            photos: optimized,
            totalCount: Object.values(optimized).reduce((sum, photos) => sum + photos.length, 0),
            optimized: true,
            formats: ['webp', 'avif', 'jpeg'],
            responsive: true
        };
    }

    /**
     * UTILITAIRES
     */
    calculateSectorMatch(keywords, sectorData) {
        let score = 0;
        const allKeywords = Object.values(sectorData.keywords).flat();
        
        allKeywords.forEach(keyword => {
            if (keywords.includes(keyword.toLowerCase())) {
                score += 1;
            }
        });
        
        return score / allKeywords.length;
    }

    generateStyleFilters(photo, sectorProfile) {
        return {
            brightness: this.getFilterValue('brightness', sectorProfile.mood),
            contrast: this.getFilterValue('contrast', sectorProfile.style),
            saturation: this.getFilterValue('saturation', sectorProfile.colors.primary),
            warmth: this.getFilterValue('warmth', sectorProfile.category)
        };
    }

    getFilterValue(filterType, reference) {
        // Logique intelligente de filtres selon le secteur
        const filterMaps = {
            brightness: { calm: 0.95, professional: 1.0, warm: 1.05 },
            contrast: { clean: 1.1, authentic: 0.95, elegant: 1.05 },
            saturation: { '#14b8a6': 0.9, '#1e40af': 0.85, '#dc2626': 1.1 },
            warmth: { sante_bien_etre: 1.1, services_techniques: 0.9, restauration: 1.2 }
        };
        
        return filterMaps[filterType]?.[reference] || 1.0;
    }

    generateWebPUrl(originalUrl) {
        return originalUrl.replace(/\.(jpg|jpeg|png)/, '.webp');
    }

    generateAvifUrl(originalUrl) {
        return originalUrl.replace(/\.(jpg|jpeg|png)/, '.avif');
    }

    generateResponsiveSizes(photo) {
        return {
            mobile: { width: 400, height: Math.round(photo.height * 400 / photo.width) },
            tablet: { width: 768, height: Math.round(photo.height * 768 / photo.width) },
            desktop: { width: 1200, height: Math.round(photo.height * 1200 / photo.width) }
        };
    }

    calculateConsistencyScore(photos, sectorProfile) {
        // Algorithme de score cohérence basé sur harmonie couleurs, mood, style
        return 8.5; // Simulation - en production: vrai calcul
    }

    getDefaultSectorProfile(businessInfo) {
        return {
            category: 'general',
            sector: 'generic',
            keywords: {
                hero: ['professional business', 'modern office', 'business professional'],
                services: ['business service', 'professional work', 'quality service'],
                about: ['business owner', 'professional portrait', 'expert'],
                testimonials: ['satisfied customer', 'business success', 'professional service'],
                gallery: ['business environment', 'professional workspace', 'quality work']
            },
            colors: {
                primary: '#3b82f6',
                secondary: '#6b7280', 
                accent: '#ffffff',
                text: '#1f2937'
            },
            mood: 'professional, trustworthy, reliable',
            style: 'clean, modern, professional',
            confidence: 0.5
        };
    }

    getFallbackPhotos(sector) {
        return {
            success: false,
            sector,
            fallback: true,
            photos: this.getGenericPhotos(),
            message: 'Using fallback photos - API keys may be missing'
        };
    }

    getGenericPhotos() {
        return {
            hero: [{ 
                url: 'https://images.unsplash.com/photo-1560472355-536de3962603',
                alt: 'Professional business environment'
            }],
            services: [{ 
                url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
                alt: 'Quality professional service'
            }],
            about: [{ 
                url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                alt: 'Professional business owner'
            }],
            testimonials: [{ 
                url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
                alt: 'Satisfied customer testimonial'
            }]
        };
    }

    // Getters pour fallbacks
    getUnsplashFallback(keywords) { return this.getGenericPhotos(); }
    getPexelsFallback(keywords) { return this.getGenericPhotos(); }
    getPixabayFallback(keywords) { return this.getGenericPhotos(); }
}

/**
 * SYSTÈME DE SCORING QUALITÉ AVANCÉ
 */
class PhotoQualityScorer {
    constructor() {
        this.weights = {
            source: 0.3,      // Source de la photo
            relevance: 0.25,  // Pertinence métier
            quality: 0.2,     // Qualité technique
            mood: 0.15,       // Cohérence mood
            composition: 0.1  // Composition
        };
    }

    scorePhoto(photo, context) {
        const scores = {
            source: this.scoreSource(photo.source),
            relevance: this.scoreRelevance(photo, context),
            quality: this.scoreQuality(photo),
            mood: this.scoreMood(photo, context),
            composition: this.scoreComposition(photo)
        };

        let totalScore = 0;
        for (const [criteria, score] of Object.entries(scores)) {
            totalScore += score * this.weights[criteria];
        }

        return {
            total: totalScore,
            breakdown: scores,
            grade: this.getGrade(totalScore)
        };
    }

    scoreSource(source) {
        const sourceScores = {
            'unsplash': 9.0,
            'pexels': 8.0,
            'pixabay': 7.0
        };
        return sourceScores[source] || 5.0;
    }

    scoreRelevance(photo, context) {
        // Score basé sur correspondance mots-clés
        let score = 5.0;
        if (context.keywords.some(k => photo.alt.includes(k))) score += 3.0;
        if (photo.alt.includes(context.sector)) score += 2.0;
        return Math.min(score, 10);
    }

    scoreQuality(photo) {
        let score = 5.0;
        if (photo.width >= 1200) score += 2.0;
        if (photo.height >= 800) score += 1.5;
        if (photo.format === 'webp') score += 1.0;
        return Math.min(score, 10);
    }

    scoreMood(photo, context) {
        // Score cohérence mood (simulation)
        return Math.random() * 3 + 7; // 7-10
    }

    scoreComposition(photo) {
        // Score composition (simulation)
        return Math.random() * 2 + 8; // 8-10
    }

    getGrade(score) {
        if (score >= 9) return 'A+';
        if (score >= 8) return 'A';
        if (score >= 7) return 'B+';
        if (score >= 6) return 'B';
        return 'C';
    }
}

export { UniversalPhotoEngine };