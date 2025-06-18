/**
 * FORM PROCESSOR - Intelligence pour traitement des données client
 * Extrait et structure les données pour génération automatique de site
 */

class ClientFormProcessor {
    constructor() {
        this.sectorTemplates = {
            'fitness': {
                template: 'fitness-template',
                colors: ['orange', 'noir', 'rouge'],
                components: ['hero', 'services', 'testimonials', 'transformation-gallery', 'contact', 'schedule'],
                personality: ['dynamique', 'motivant', 'professionnel'],
                content: {
                    heroPattern: 'Transformez votre {businessType} avec {uniqueValue}',
                    servicesPattern: 'coaching-personnel|plans-nutrition|suivi-personnalise',
                    ctaPattern: 'Séance d\'essai gratuite|Bilan fitness offert'
                }
            },
            'restaurant': {
                template: 'restaurant-template',
                colors: ['rouge', 'or', 'marron'],
                components: ['hero', 'menu', 'about', 'reservation', 'gallery', 'contact'],
                personality: ['chaleureux', 'authentique', 'convivial'],
                content: {
                    heroPattern: 'Découvrez {businessType} authentique au cœur de {location}',
                    servicesPattern: 'restaurant|traiteur|evenements-prives',
                    ctaPattern: 'Réserver une table|Voir la carte'
                }
            },
            'sante': {
                template: 'health-template',
                colors: ['bleu', 'vert', 'blanc'],
                components: ['hero', 'services', 'team', 'appointments', 'testimonials', 'contact'],
                personality: ['fiable', 'professionnel', 'rassurant'],
                content: {
                    heroPattern: 'Votre santé, notre priorité - {businessType} de confiance',
                    servicesPattern: 'consultations|soins|prevention',
                    ctaPattern: 'Prendre rendez-vous|Consultation gratuite'
                }
            },
            'beaute': {
                template: 'beauty-template',
                colors: ['rose', 'or', 'blanc'],
                components: ['hero', 'services', 'gallery', 'booking', 'products', 'contact'],
                personality: ['élégant', 'raffiné', 'luxueux'],
                content: {
                    heroPattern: 'Révélez votre beauté naturelle avec {businessType}',
                    servicesPattern: 'soins-visage|massage|onglerie',
                    ctaPattern: 'Réserver un soin|Découvrir nos services'
                }
            },
            'immobilier': {
                template: 'real-estate-template',
                colors: ['bleu', 'gris', 'blanc'],
                components: ['hero', 'properties', 'services', 'team', 'testimonials', 'contact'],
                personality: ['professionnel', 'fiable', 'expert'],
                content: {
                    heroPattern: 'Trouvez le bien immobilier de vos rêves avec {businessType}',
                    servicesPattern: 'vente|achat|location|estimation',
                    ctaPattern: 'Estimation gratuite|Voir nos biens'
                }
            },
            'education': {
                template: 'education-template',
                colors: ['bleu', 'vert', 'orange'],
                components: ['hero', 'courses', 'methodology', 'results', 'testimonials', 'contact'],
                personality: ['pédagogue', 'innovant', 'bienveillant'],
                content: {
                    heroPattern: 'Apprenez et progressez avec {businessType}',
                    servicesPattern: 'cours-particuliers|formations|coaching',
                    ctaPattern: 'Cours d\'essai gratuit|Nos formations'
                }
            },
            'technologie': {
                template: 'tech-template',
                colors: ['bleu', 'violet', 'noir'],
                components: ['hero', 'solutions', 'portfolio', 'team', 'process', 'contact'],
                personality: ['innovant', 'expert', 'moderne'],
                content: {
                    heroPattern: 'Solutions technologiques innovantes pour {targetAudience}',
                    servicesPattern: 'developpement|consulting|maintenance',
                    ctaPattern: 'Devis gratuit|Nos réalisations'
                }
            },
            'artisanat': {
                template: 'craft-template',
                colors: ['marron', 'or', 'vert'],
                components: ['hero', 'services', 'portfolio', 'process', 'testimonials', 'contact'],
                personality: ['authentique', 'artisanal', 'qualité'],
                content: {
                    heroPattern: 'Artisanat de qualité, savoir-faire traditionnel',
                    servicesPattern: 'creation|reparation|sur-mesure',
                    ctaPattern: 'Devis gratuit|Nos réalisations'
                }
            },
            'commerce': {
                template: 'retail-template',
                colors: ['rouge', 'noir', 'blanc'],
                components: ['hero', 'products', 'categories', 'offers', 'store-locator', 'contact'],
                personality: ['dynamique', 'tendance', 'accessible'],
                content: {
                    heroPattern: 'Découvrez nos {businessType} de qualité',
                    servicesPattern: 'vente|conseil|livraison',
                    ctaPattern: 'Voir nos produits|Visiter le magasin'
                }
            },
            'finance': {
                template: 'finance-template',
                colors: ['bleu', 'gris', 'or'],
                components: ['hero', 'services', 'expertise', 'team', 'testimonials', 'contact'],
                personality: ['professionnel', 'fiable', 'expert'],
                content: {
                    heroPattern: 'Conseils financiers sur-mesure pour {targetAudience}',
                    servicesPattern: 'conseil|gestion|investissement',
                    ctaPattern: 'Consultation gratuite|Nos services'
                }
            }
        };
    }

    /**
     * Traite les données du formulaire et génère la configuration du site
     */
    processClientData(formData) {
        try {
            // 1. Analyse du secteur et sélection du template
            const templateConfig = this.selectTemplate(formData);
            
            // 2. Extraction des informations clés
            const businessInfo = this.extractBusinessInfo(formData);
            
            // 3. Analyse de la personnalité de marque
            const brandPersonality = this.analyzeBrandPersonality(formData);
            
            // 4. Configuration visuelle
            const visualConfig = this.generateVisualConfig(formData, templateConfig);
            
            // 5. Configuration du contenu
            const contentConfig = this.generateContentConfig(formData, templateConfig);
            
            // 6. Configuration technique
            const technicalConfig = this.generateTechnicalConfig(formData);
            
            // 7. Structuration finale
            const siteConfig = {
                metadata: {
                    projectName: this.generateProjectName(formData),
                    sector: formData.businessSector,
                    template: templateConfig.template,
                    priority: this.determinePriority(formData),
                    timeline: formData.timeline,
                    budget: formData.budget
                },
                business: businessInfo,
                brand: brandPersonality,
                visual: visualConfig,
                content: contentConfig,
                technical: technicalConfig,
                client: {
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    validationProcess: formData.validationProcess || 'final'
                }
            };

            console.log('✅ Configuration générée:', siteConfig);
            return siteConfig;

        } catch (error) {
            console.error('❌ Erreur lors du traitement:', error);
            throw new Error(`Erreur de traitement des données: ${error.message}`);
        }
    }

    /**
     * Sélectionne le template optimal basé sur le secteur et les réponses
     */
    selectTemplate(formData) {
        const sector = formData.businessSector;
        const baseTemplate = this.sectorTemplates[sector] || this.sectorTemplates['commerce'];
        
        // Intelligence pour affiner le template selon les réponses
        const refinedTemplate = { ...baseTemplate };
        
        // Adaptation selon le budget
        if (formData.budget === 'startup') {
            refinedTemplate.components = refinedTemplate.components.filter(c => 
                ['hero', 'services', 'contact'].includes(c)
            );
        } else if (formData.budget === 'large') {
            refinedTemplate.components.push('advanced-features', 'analytics', 'crm-integration');
        }
        
        // Adaptation selon les fonctionnalités demandées
        if (formData.features?.includes('ecommerce')) {
            refinedTemplate.components.push('shop', 'cart', 'checkout');
        }
        if (formData.features?.includes('booking')) {
            refinedTemplate.components.push('calendar', 'booking-system');
        }
        
        return refinedTemplate;
    }

    /**
     * Extrait et structure les informations business
     */
    extractBusinessInfo(formData) {
        return {
            name: formData.businessName,
            sector: formData.businessSector,
            pitch: formData.businessPitch,
            mission: formData.businessMission,
            vision: formData.businessVision,
            values: this.parseValues(formData.businessValues),
            targetAudience: formData.targetAudience,
            problemSolved: formData.problemSolved,
            uniqueValue: formData.uniqueValue,
            competitors: this.parseCompetitors(formData.competitors),
            location: this.extractLocation(formData.address),
            contact: {
                email: formData.email,
                phone: formData.phone,
                address: formData.address
            }
        };
    }

    /**
     * Analyse la personnalité de marque et le ton
     */
    analyzeBrandPersonality(formData) {
        const personality = Array.isArray(formData.brandPersonality) 
            ? formData.brandPersonality 
            : [formData.brandPersonality];
        
        if (formData.brandPersonalityOther) {
            personality.push(...formData.brandPersonalityOther.split(',').map(p => p.trim()));
        }

        return {
            personality: personality.filter(Boolean),
            toneOfVoice: formData.toneOfVoice,
            specificTerms: formData.specificTerms?.split(',').map(t => t.trim()).filter(Boolean) || [],
            avoidTerms: formData.avoidTerms?.split(',').map(t => t.trim()).filter(Boolean) || [],
            clientMotivation: Array.isArray(formData.clientMotivation) 
                ? formData.clientMotivation 
                : [formData.clientMotivation],
            brandInspiration: formData.brandInspiration
        };
    }

    /**
     * Génère la configuration visuelle
     */
    generateVisualConfig(formData, templateConfig) {
        const colors = Array.isArray(formData.preferredColors) 
            ? formData.preferredColors 
            : [formData.preferredColors];

        // Intelligence couleur : si aucune couleur sélectionnée, utilise celles du template
        const finalColors = colors.length > 0 && colors[0] 
            ? colors 
            : templateConfig.colors;

        return {
            colors: {
                preferred: finalColors,
                avoid: formData.avoidColors?.split(',').map(c => c.trim()).filter(Boolean) || [],
                description: formData.colorDescription
            },
            images: {
                style: formData.imageStyle,
                hasLogo: formData.hasLogo
            },
            typography: {
                style: formData.fontStyle
            },
            theme: this.generateThemeFromColors(finalColors, formData.businessSector)
        };
    }

    /**
     * Génère la configuration du contenu
     */
    generateContentConfig(formData, templateConfig) {
        return {
            hero: {
                title: this.generateHeroTitle(formData, templateConfig),
                subtitle: this.generateHeroSubtitle(formData),
                cta: this.generateCTA(formData, templateConfig)
            },
            services: this.generateServicesContent(formData, templateConfig),
            about: {
                story: formData.businessPitch,
                mission: formData.businessMission,
                values: this.parseValues(formData.businessValues)
            },
            testimonials: this.generateTestimonialsStructure(formData),
            contact: {
                address: formData.address,
                phone: formData.phone,
                email: formData.email
            }
        };
    }

    /**
     * Génère la configuration technique
     */
    generateTechnicalConfig(formData) {
        const features = Array.isArray(formData.features) ? formData.features : [formData.features];
        const languages = Array.isArray(formData.languages) ? formData.languages : [formData.languages];

        return {
            features: features.filter(Boolean),
            languages: languages.filter(Boolean),
            goal: formData.websiteGoal,
            content: formData.existingContent,
            integrations: this.determineIntegrations(features),
            seo: {
                targetKeywords: this.generateSEOKeywords(formData),
                localSEO: !!formData.address
            }
        };
    }

    /**
     * Méthodes utilitaires
     */
    generateProjectName(formData) {
        const businessName = formData.businessName.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        const sector = formData.businessSector;
        return `client-${businessName}-${sector}`;
    }

    generateHeroTitle(formData, templateConfig) {
        const pattern = templateConfig.content.heroPattern;
        return pattern
            .replace('{businessType}', formData.businessName)
            .replace('{uniqueValue}', formData.uniqueValue || 'excellence')
            .replace('{location}', this.extractLocation(formData.address));
    }

    generateHeroSubtitle(formData) {
        return formData.businessPitch;
    }

    generateCTA(formData, templateConfig) {
        const patterns = templateConfig.content.ctaPattern.split('|');
        return {
            primary: patterns[0] || 'Contactez-nous',
            secondary: patterns[1] || 'En savoir plus'
        };
    }

    generateThemeFromColors(colors, sector) {
        const colorMap = {
            'bleu': { primary: '#3B82F6', secondary: '#1E40AF' },
            'rouge': { primary: '#EF4444', secondary: '#DC2626' },
            'vert': { primary: '#10B981', secondary: '#059669' },
            'orange': { primary: '#F97316', secondary: '#EA580C' },
            'violet': { primary: '#8B5CF6', secondary: '#7C3AED' },
            'noir': { primary: '#1F2937', secondary: '#111827' },
            'rose': { primary: '#EC4899', secondary: '#DB2777' },
            'or': { primary: '#F59E0B', secondary: '#D97706' }
        };

        const primaryColor = colors[0] || 'bleu';
        return colorMap[primaryColor] || colorMap['bleu'];
    }

    generateSEOKeywords(formData) {
        const base = [
            formData.businessName,
            formData.businessSector,
            this.extractLocation(formData.address)
        ].filter(Boolean);

        const services = formData.businessPitch?.match(/\b\w+(?:s?)\b/g)?.slice(0, 5) || [];
        
        return [...base, ...services].join(', ');
    }

    parseValues(valuesString) {
        if (!valuesString) return [];
        return valuesString.split(/[,\n]/).map(v => v.trim()).filter(Boolean);
    }

    parseCompetitors(competitorsString) {
        if (!competitorsString) return [];
        return competitorsString.split(/[,\n]/).map(c => c.trim()).filter(Boolean);
    }

    extractLocation(address) {
        if (!address) return '';
        const cityMatch = address.match(/(\d{5})\s+([^,\n]+)/);
        return cityMatch ? cityMatch[2] : '';
    }

    determinePriority(formData) {
        const urgentTimelines = ['urgent', 'week'];
        const highBudgets = ['medium', 'large'];
        
        if (urgentTimelines.includes(formData.timeline)) return 'high';
        if (highBudgets.includes(formData.budget)) return 'high';
        return 'medium';
    }

    determineIntegrations(features) {
        const integrations = [];
        
        if (features.includes('ecommerce')) integrations.push('stripe', 'inventory');
        if (features.includes('booking')) integrations.push('calendar', 'payments');
        if (features.includes('map')) integrations.push('google-maps');
        if (features.includes('chat')) integrations.push('chat-widget');
        if (features.includes('newsletter')) integrations.push('mailchimp');
        
        return integrations;
    }

    generateServicesContent(formData, templateConfig) {
        const servicePattern = templateConfig.content.servicesPattern;
        const services = servicePattern.split('|');
        
        return services.map(service => ({
            name: service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: `Service ${service} adapté à vos besoins`,
            features: ['Personnalisé', 'Qualité', 'Suivi']
        }));
    }

    generateTestimonialsStructure(formData) {
        const sector = formData.businessSector;
        const templates = {
            'fitness': [
                { role: 'Cadre', result: 'Transformation physique' },
                { role: 'Entrepreneur', result: 'Énergie retrouvée' }
            ],
            'restaurant': [
                { role: 'Client régulier', result: 'Expérience culinaire' },
                { role: 'Famille', result: 'Moment convivial' }
            ]
        };
        
        return templates[sector] || [
            { role: 'Client satisfait', result: 'Service excellent' }
        ];
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClientFormProcessor;
} else {
    window.ClientFormProcessor = ClientFormProcessor;
}