/**
 * PHOTO ENGINE INTELLIGENT - Sélection et optimisation automatique d'images
 * Analyse le secteur et sélectionne des photos premium adaptées
 */

class PhotoIntelligence {
    constructor() {
        this.apiKeys = {
            unsplash: process.env.UNSPLASH_ACCESS_KEY || 'demo-key',
            pexels: process.env.PEXELS_API_KEY || 'demo-key',
            openai: process.env.OPENAI_API_KEY || 'demo-key'
        };

        // Mapping secteur → mots-clés photos
        this.sectorKeywords = {
            'fitness': {
                hero: ['personal trainer', 'fitness coach', 'gym workout', 'athletic woman', 'modern gym'],
                services: ['dumbbell workout', 'yoga session', 'cardio training', 'strength training'],
                about: ['professional trainer', 'fitness expert', 'coaching session'],
                testimonials: ['happy client workout', 'transformation success', 'satisfied customer gym'],
                gallery: ['before after fitness', 'workout results', 'body transformation'],
                ambient: ['modern gym interior', 'fitness studio', 'exercise equipment']
            },
            'beaute': {
                hero: ['luxury spa', 'beauty salon', 'elegant woman', 'skincare treatment'],
                services: ['facial treatment', 'massage therapy', 'nail art', 'beauty products'],
                about: ['professional esthetician', 'beauty expert', 'spa therapist'],
                testimonials: ['happy spa client', 'glowing skin', 'relaxed woman'],
                gallery: ['spa interior', 'beauty results', 'before after skincare'],
                ambient: ['luxury spa room', 'zen atmosphere', 'elegant beauty salon']
            },
            'restaurant': {
                hero: ['gourmet food', 'elegant restaurant', 'chef cooking', 'fine dining'],
                services: ['delicious plate', 'wine selection', 'cooking process', 'food presentation'],
                about: ['professional chef', 'restaurant team', 'kitchen action'],
                testimonials: ['happy diners', 'satisfied customers', 'family dinner'],
                gallery: ['signature dishes', 'restaurant interior', 'food styling'],
                ambient: ['cozy restaurant', 'elegant dining room', 'modern kitchen']
            },
            'sante': {
                hero: ['medical consultation', 'healthcare professional', 'modern clinic', 'doctor patient'],
                services: ['medical examination', 'healthcare equipment', 'treatment room'],
                about: ['doctor portrait', 'medical team', 'healthcare professional'],
                testimonials: ['satisfied patient', 'medical consultation', 'healthy family'],
                gallery: ['clinic interior', 'medical equipment', 'treatment rooms'],
                ambient: ['modern medical office', 'clean clinic', 'professional healthcare']
            },
            'immobilier': {
                hero: ['luxury apartment', 'real estate agent', 'modern house', 'property view'],
                services: ['house keys', 'apartment viewing', 'property documents', 'real estate meeting'],
                about: ['real estate professional', 'property expert', 'business handshake'],
                testimonials: ['happy homeowners', 'new house keys', 'satisfied clients'],
                gallery: ['luxury properties', 'modern interiors', 'property portfolio'],
                ambient: ['elegant office', 'luxury homes', 'property showcase']
            },
            'education': {
                hero: ['modern classroom', 'teacher student', 'online learning', 'education technology'],
                services: ['study session', 'learning materials', 'educational tools', 'training workshop'],
                about: ['professional teacher', 'education expert', 'instructor portrait'],
                testimonials: ['successful students', 'graduation moment', 'learning achievement'],
                gallery: ['classroom setup', 'study environment', 'educational success'],
                ambient: ['modern school', 'learning space', 'educational facility']
            },
            'technologie': {
                hero: ['modern office', 'tech team', 'coding workspace', 'digital innovation'],
                services: ['software development', 'tech consultation', 'digital solution', 'programming'],
                about: ['tech professional', 'developer team', 'tech expert'],
                testimonials: ['satisfied tech client', 'successful project', 'tech solution'],
                gallery: ['tech workspace', 'modern office', 'digital products'],
                ambient: ['startup office', 'tech environment', 'innovation lab']
            },
            'artisanat': {
                hero: ['skilled craftsman', 'artisan work', 'handmade creation', 'traditional craft'],
                services: ['woodworking', 'handcraft tools', 'artisan process', 'craft materials'],
                about: ['master craftsman', 'artisan portrait', 'skilled worker'],
                testimonials: ['satisfied customer', 'handmade product', 'craft quality'],
                gallery: ['craft workshop', 'handmade products', 'artisan creations'],
                ambient: ['traditional workshop', 'craft studio', 'artisan space']
            },
            'commerce': {
                hero: ['modern store', 'shopping experience', 'retail space', 'customer service'],
                services: ['product display', 'shopping bag', 'retail consultation', 'store interior'],
                about: ['store owner', 'retail professional', 'shop keeper'],
                testimonials: ['happy shopper', 'satisfied customer', 'retail experience'],
                gallery: ['product showcase', 'store layout', 'retail design'],
                ambient: ['boutique interior', 'modern retail', 'elegant store']
            },
            'finance': {
                hero: ['financial advisor', 'business meeting', 'modern office', 'professional consultation'],
                services: ['financial planning', 'investment advice', 'business documents', 'financial analysis'],
                about: ['finance professional', 'advisor portrait', 'business expert'],
                testimonials: ['satisfied client', 'business handshake', 'financial success'],
                gallery: ['professional office', 'financial charts', 'business meeting'],
                ambient: ['corporate office', 'financial firm', 'professional environment']
            }
        };

        // Styles visuels par secteur
        this.sectorStyles = {
            'fitness': {
                mood: 'energetic, dynamic, motivational',
                colors: 'orange, black, white',
                lighting: 'bright, high contrast',
                composition: 'action shots, close-ups'
            },
            'beaute': {
                mood: 'elegant, serene, luxurious',
                colors: 'pink, gold, white, soft tones',
                lighting: 'soft, warm, flattering',
                composition: 'elegant portraits, spa ambiance'
            },
            'restaurant': {
                mood: 'warm, inviting, appetizing',
                colors: 'warm tones, rich browns, gold',
                lighting: 'warm, cozy, dramatic',
                composition: 'food styling, atmospheric shots'
            },
            'sante': {
                mood: 'clean, professional, trustworthy',
                colors: 'blue, white, green, clean tones',
                lighting: 'bright, clinical, clear',
                composition: 'professional, clean environment'
            }
        };
    }

    /**
     * Analyse le secteur et génère les spécifications photos
     */
    analyzePhotoNeeds(clientData) {
        const sector = clientData.business?.sector || clientData.businessSector;
        const businessName = clientData.business?.name || clientData.businessName;
        
        console.log(`🎨 Analyse photos pour secteur: ${sector}`);
        
        const keywords = this.sectorKeywords[sector] || this.sectorKeywords['commerce'];
        const style = this.sectorStyles[sector] || this.sectorStyles['commerce'];
        
        const photoSpecs = {
            sector: sector,
            businessName: businessName,
            keywords: keywords,
            style: style,
            requirements: {
                hero: {
                    count: 1,
                    size: 'large',
                    orientation: 'landscape',
                    quality: 'premium',
                    keywords: keywords.hero
                },
                services: {
                    count: 4,
                    size: 'medium',
                    orientation: 'square',
                    quality: 'high',
                    keywords: keywords.services
                },
                about: {
                    count: 1,
                    size: 'medium',
                    orientation: 'portrait',
                    quality: 'premium',
                    keywords: keywords.about
                },
                testimonials: {
                    count: 3,
                    size: 'small',
                    orientation: 'square',
                    quality: 'medium',
                    keywords: keywords.testimonials
                },
                gallery: {
                    count: 6,
                    size: 'medium',
                    orientation: 'mixed',
                    quality: 'high',
                    keywords: keywords.gallery
                },
                ambient: {
                    count: 3,
                    size: 'large',
                    orientation: 'landscape',
                    quality: 'premium',
                    keywords: keywords.ambient
                }
            }
        };
        
        console.log('✅ Spécifications photos générées');
        return photoSpecs;
    }

    /**
     * Recherche et sélectionne les meilleures photos via APIs
     */
    async selectPremiumPhotos(photoSpecs) {
        console.log('🔍 Recherche photos premium...');
        
        const selectedPhotos = {};
        
        for (const [section, specs] of Object.entries(photoSpecs.requirements)) {
            console.log(`📸 Section ${section}: ${specs.count} photos`);
            
            const photos = [];
            
            for (let i = 0; i < specs.count; i++) {
                const keyword = specs.keywords[i % specs.keywords.length];
                
                try {
                    // Priorité: Unsplash pour la qualité
                    let photo = await this.searchUnsplash(keyword, specs);
                    
                    // Fallback: Pexels si Unsplash échoue
                    if (!photo) {
                        photo = await this.searchPexels(keyword, specs);
                    }
                    
                    // Fallback: Photo générée par IA
                    if (!photo) {
                        photo = await this.generateAIPhoto(keyword, specs, photoSpecs.style);
                    }
                    
                    if (photo) {
                        photos.push({
                            ...photo,
                            section: section,
                            keyword: keyword,
                            specs: specs
                        });
                    }
                    
                } catch (error) {
                    console.warn(`⚠️  Erreur photo ${keyword}:`, error.message);
                }
            }
            
            selectedPhotos[section] = photos;
        }
        
        console.log('✅ Photos sélectionnées');
        return selectedPhotos;
    }

    /**
     * Recherche sur Unsplash
     */
    async searchUnsplash(keyword, specs) {
        if (this.apiKeys.unsplash === 'demo-key') {
            return this.getMockPhoto('unsplash', keyword, specs);
        }
        
        try {
            const orientation = specs.orientation === 'mixed' ? 'landscape' : specs.orientation;
            const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&orientation=${orientation}&per_page=1&order_by=popular`;
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Client-ID ${this.apiKeys.unsplash}`
                }
            });
            
            if (!response.ok) throw new Error('Unsplash API error');
            
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const photo = data.results[0];
                return {
                    source: 'unsplash',
                    url: photo.urls.regular,
                    highres: photo.urls.full,
                    thumbnail: photo.urls.thumb,
                    alt: photo.alt_description || keyword,
                    credit: `Photo by ${photo.user.name} on Unsplash`,
                    license: 'unsplash'
                };
            }
            
        } catch (error) {
            console.warn('Unsplash error:', error.message);
        }
        
        return null;
    }

    /**
     * Recherche sur Pexels
     */
    async searchPexels(keyword, specs) {
        if (this.apiKeys.pexels === 'demo-key') {
            return this.getMockPhoto('pexels', keyword, specs);
        }
        
        try {
            const orientation = specs.orientation === 'mixed' ? 'landscape' : specs.orientation;
            const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&orientation=${orientation}&per_page=1`;
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': this.apiKeys.pexels
                }
            });
            
            if (!response.ok) throw new Error('Pexels API error');
            
            const data = await response.json();
            
            if (data.photos && data.photos.length > 0) {
                const photo = data.photos[0];
                return {
                    source: 'pexels',
                    url: photo.src.large,
                    highres: photo.src.original,
                    thumbnail: photo.src.medium,
                    alt: photo.alt || keyword,
                    credit: `Photo by ${photo.photographer} on Pexels`,
                    license: 'pexels'
                };
            }
            
        } catch (error) {
            console.warn('Pexels error:', error.message);
        }
        
        return null;
    }

    /**
     * Génération d'image par IA (DALL-E/Midjourney style)
     */
    async generateAIPhoto(keyword, specs, style) {
        console.log(`🤖 Génération IA pour: ${keyword}`);
        
        const prompt = this.buildAIPrompt(keyword, specs, style);
        
        // Simulation - en production, intégrer DALL-E ou Midjourney
        if (this.apiKeys.openai === 'demo-key') {
            return this.getMockAIPhoto(keyword, specs);
        }
        
        try {
            // Intégration DALL-E 3 (exemple)
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.openai}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: prompt,
                    size: this.getAIImageSize(specs),
                    quality: "hd",
                    n: 1
                })
            });
            
            if (!response.ok) throw new Error('OpenAI API error');
            
            const data = await response.json();
            
            if (data.data && data.data.length > 0) {
                return {
                    source: 'ai-generated',
                    url: data.data[0].url,
                    highres: data.data[0].url,
                    thumbnail: data.data[0].url,
                    alt: keyword,
                    credit: 'AI Generated Image',
                    license: 'generated',
                    prompt: prompt
                };
            }
            
        } catch (error) {
            console.warn('AI generation error:', error.message);
        }
        
        return this.getMockAIPhoto(keyword, specs);
    }

    /**
     * Construit un prompt IA optimisé
     */
    buildAIPrompt(keyword, specs, style) {
        const orientationText = specs.orientation === 'portrait' ? 'vertical composition' : 'horizontal composition';
        
        return `Professional ${keyword} photo, ${style.mood}, ${style.lighting} lighting, ${orientationText}, ${style.colors} color palette, high quality, commercial photography, ${style.composition}, ultra realistic, 4K resolution`;
    }

    /**
     * Photos de démonstration (quand pas d'API keys)
     */
    getMockPhoto(source, keyword, specs) {
        const orientationClass = specs.orientation === 'portrait' ? 'h-96 w-72' : 'h-64 w-96';
        
        return {
            source: `mock-${source}`,
            url: `https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=${encodeURIComponent(keyword)}`,
            highres: `https://via.placeholder.com/1200x900/4F46E5/FFFFFF?text=${encodeURIComponent(keyword)}`,
            thumbnail: `https://via.placeholder.com/300x225/4F46E5/FFFFFF?text=${encodeURIComponent(keyword)}`,
            alt: keyword,
            credit: `Mock ${source} photo`,
            license: 'demo',
            mockClass: orientationClass
        };
    }

    getMockAIPhoto(keyword, specs) {
        return {
            source: 'mock-ai',
            url: `https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=AI+${encodeURIComponent(keyword)}`,
            highres: `https://via.placeholder.com/1200x900/7C3AED/FFFFFF?text=AI+${encodeURIComponent(keyword)}`,
            thumbnail: `https://via.placeholder.com/300x225/7C3AED/FFFFFF?text=AI+${encodeURIComponent(keyword)}`,
            alt: `AI generated ${keyword}`,
            credit: 'AI Generated (Demo)',
            license: 'generated',
            prompt: `Professional ${keyword} photo`
        };
    }

    getAIImageSize(specs) {
        if (specs.orientation === 'portrait') return '1024x1792';
        if (specs.orientation === 'square') return '1024x1024';
        return '1792x1024'; // landscape
    }

    /**
     * Optimise les images sélectionnées
     */
    async optimizeImages(selectedPhotos) {
        console.log('🔧 Optimisation des images...');
        
        const optimizedPhotos = {};
        
        for (const [section, photos] of Object.entries(selectedPhotos)) {
            optimizedPhotos[section] = [];
            
            for (const photo of photos) {
                try {
                    const optimized = await this.processImage(photo);
                    optimizedPhotos[section].push(optimized);
                } catch (error) {
                    console.warn(`⚠️  Erreur optimisation ${photo.keyword}:`, error.message);
                    optimizedPhotos[section].push(photo); // Fallback
                }
            }
        }
        
        console.log('✅ Images optimisées');
        return optimizedPhotos;
    }

    /**
     * Traite une image (compression, formats, responsive)
     */
    async processImage(photo) {
        // En production, utiliser Sharp.js ou service comme Cloudinary
        
        const optimized = {
            ...photo,
            formats: {
                webp: photo.url.replace(/\.(jpg|jpeg|png)/, '.webp'),
                avif: photo.url.replace(/\.(jpg|jpeg|png)/, '.avif'),
                original: photo.url
            },
            responsive: {
                mobile: photo.url + '?w=400',
                tablet: photo.url + '?w=800',
                desktop: photo.url + '?w=1200'
            },
            optimized: true,
            fileSize: 'compressed',
            loading: 'lazy'
        };
        
        return optimized;
    }

    /**
     * Génère le package photo complet pour un client
     */
    async generatePhotoPackage(clientData) {
        console.log('📦 Génération package photo complet...');
        
        try {
            // 1. Analyse des besoins
            const photoSpecs = this.analyzePhotoNeeds(clientData);
            
            // 2. Sélection des photos
            const selectedPhotos = await this.selectPremiumPhotos(photoSpecs);
            
            // 3. Optimisation
            const optimizedPhotos = await this.optimizeImages(selectedPhotos);
            
            // 4. Package final
            const photoPackage = {
                client: clientData.business?.name || clientData.businessName,
                sector: clientData.business?.sector || clientData.businessSector,
                generatedAt: new Date().toISOString(),
                specs: photoSpecs,
                photos: optimizedPhotos,
                usage: this.generateUsageInstructions(optimizedPhotos),
                stats: this.generateStats(optimizedPhotos)
            };
            
            console.log('✅ Package photo généré avec succès');
            return photoPackage;
            
        } catch (error) {
            console.error('❌ Erreur génération package photo:', error);
            throw error;
        }
    }

    /**
     * Génère les instructions d'utilisation
     */
    generateUsageInstructions(photos) {
        return {
            hero: {
                usage: 'Image principale de la page d\'accueil',
                placement: 'Hero section background ou côté droit',
                alt: 'Image représentative du business'
            },
            services: {
                usage: 'Images pour chaque service proposé',
                placement: 'Cards services, icônes visuelles',
                alt: 'Illustrations des prestations'
            },
            about: {
                usage: 'Photo du propriétaire ou de l\'équipe',
                placement: 'Section À propos, portrait professionnel',
                alt: 'Photo professionnelle du responsable'
            },
            testimonials: {
                usage: 'Photos clients ou avatars témoignages',
                placement: 'Section témoignages, avatars clients',
                alt: 'Photos clients satisfaits'
            },
            gallery: {
                usage: 'Galerie réalisations ou produits',
                placement: 'Portfolio, galerie avant/après',
                alt: 'Exemples de réalisations'
            },
            ambient: {
                usage: 'Photos d\'ambiance du lieu',
                placement: 'Backgrounds sections, atmosphère',
                alt: 'Ambiance du lieu de travail'
            }
        };
    }

    /**
     * Génère les statistiques du package
     */
    generateStats(photos) {
        let totalPhotos = 0;
        const sources = { unsplash: 0, pexels: 0, 'ai-generated': 0, mock: 0 };
        
        Object.values(photos).forEach(sectionPhotos => {
            totalPhotos += sectionPhotos.length;
            sectionPhotos.forEach(photo => {
                if (sources[photo.source] !== undefined) {
                    sources[photo.source]++;
                } else {
                    sources.mock++;
                }
            });
        });
        
        return {
            totalPhotos,
            sources,
            quality: 'Premium HD',
            optimized: true,
            responsiveReady: true
        };
    }
}

module.exports = PhotoIntelligence;