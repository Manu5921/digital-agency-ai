"use strict";
/**
 * Creative Generator - Génération Automatique d'Ads Visuelles et Copy
 * Crée automatiquement des créatifs publicitaires adaptés par audience et format
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreativeGenerator = void 0;
var CreativeGenerator = /** @class */ (function () {
    function CreativeGenerator(config) {
        this.templates = new Map();
        this.personas = new Map();
        this.videoTemplates = new Map();
        this.config = config;
        this.initializeTemplates();
        this.initializePersonas();
        this.initializeVideoTemplates();
    }
    /**
     * Génère automatiquement des créatifs pour toutes les audiences
     */
    CreativeGenerator.prototype.generateCreativeSet = function (campaignObjective) {
        return __awaiter(this, void 0, void 0, function () {
            var creatives, variations, recommendations, _i, _a, _b, personaId, persona, personaCreatives, personaVariations, personaRecommendations, estimatedPerformance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        creatives = [];
                        variations = [];
                        recommendations = [];
                        _i = 0, _a = this.personas;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        _b = _a[_i], personaId = _b[0], persona = _b[1];
                        return [4 /*yield*/, this.generateForPersona(persona, campaignObjective)];
                    case 2:
                        personaCreatives = _c.sent();
                        creatives.push.apply(creatives, personaCreatives);
                        return [4 /*yield*/, this.generateABVariations(personaCreatives, persona)];
                    case 3:
                        personaVariations = _c.sent();
                        variations.push.apply(variations, personaVariations);
                        personaRecommendations = this.generatePersonaRecommendations(persona);
                        recommendations.push.apply(recommendations, personaRecommendations);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        estimatedPerformance = this.estimateCreativePerformance(creatives);
                        return [2 /*return*/, {
                                creatives: creatives,
                                variations: variations,
                                recommendations: recommendations,
                                estimatedPerformance: estimatedPerformance
                            }];
                }
            });
        });
    };
    /**
     * Génération automatique de copy publicitaire
     */
    CreativeGenerator.prototype.generateAdCopy = function (persona, platform, format, objective) {
        return __awaiter(this, void 0, void 0, function () {
            var headlines, descriptions, callToActions, keywords, emotionalHooks;
            return __generator(this, function (_a) {
                headlines = this.generateHeadlines(persona, objective);
                descriptions = this.generateDescriptions(persona, objective);
                callToActions = this.generateCallToActions(persona, objective);
                keywords = this.extractKeywords(persona);
                emotionalHooks = this.generateEmotionalHooks(persona);
                return [2 /*return*/, {
                        headlines: headlines,
                        descriptions: descriptions,
                        callToActions: callToActions,
                        keywords: keywords,
                        emotionalHooks: emotionalHooks
                    }];
            });
        });
    };
    /**
     * Génération automatique de visuels (templates)
     */
    CreativeGenerator.prototype.generateVisualCreatives = function (persona, format) {
        return __awaiter(this, void 0, void 0, function () {
            var images, videos, layouts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateImageConcepts(persona, format)];
                    case 1:
                        images = _a.sent();
                        return [4 /*yield*/, this.generateVideoTemplates(persona, format)];
                    case 2:
                        videos = _a.sent();
                        layouts = this.generateLayoutTemplates(persona, format);
                        return [2 /*return*/, {
                                images: images,
                                videos: videos,
                                layouts: layouts
                            }];
                }
            });
        });
    };
    /**
     * Adaptation multi-formats automatique
     */
    CreativeGenerator.prototype.adaptToFormats = function (baseCreative) {
        return __awaiter(this, void 0, void 0, function () {
            var formats, googleFormats, metaFormats, linkedinFormats, tiktokFormats, crossPlatformStrategy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formats = [];
                        return [4 /*yield*/, this.adaptToGoogleFormats(baseCreative)];
                    case 1:
                        googleFormats = _a.sent();
                        formats.push.apply(formats, googleFormats);
                        return [4 /*yield*/, this.adaptToMetaFormats(baseCreative)];
                    case 2:
                        metaFormats = _a.sent();
                        formats.push.apply(formats, metaFormats);
                        return [4 /*yield*/, this.adaptToLinkedInFormats(baseCreative)];
                    case 3:
                        linkedinFormats = _a.sent();
                        formats.push.apply(formats, linkedinFormats);
                        return [4 /*yield*/, this.adaptToTikTokFormats(baseCreative)];
                    case 4:
                        tiktokFormats = _a.sent();
                        formats.push.apply(formats, tiktokFormats);
                        crossPlatformStrategy = this.generateCrossPlatformStrategy(baseCreative);
                        return [2 /*return*/, {
                                formats: formats,
                                crossPlatformStrategy: crossPlatformStrategy
                            }];
                }
            });
        });
    };
    /**
     * Optimisation basée sur les performances
     */
    CreativeGenerator.prototype.optimizeCreatives = function (performanceData) {
        return __awaiter(this, void 0, void 0, function () {
            var optimizedCreatives, insights, nextIterations, _i, performanceData_1, data, creative, analysis, variations, alternatives;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optimizedCreatives = [];
                        insights = [];
                        nextIterations = [];
                        _i = 0, performanceData_1 = performanceData;
                        _a.label = 1;
                    case 1:
                        if (!(_i < performanceData_1.length)) return [3 /*break*/, 6];
                        data = performanceData_1[_i];
                        creative = this.templates.get(data.creativeId);
                        if (!creative)
                            return [3 /*break*/, 5];
                        analysis = this.analyzeCreativePerformance(creative, data.metrics);
                        insights.push.apply(insights, analysis.insights);
                        if (!(data.metrics.ctr > 3.0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.generateSimilarVariations(creative)];
                    case 2:
                        variations = _a.sent();
                        nextIterations.push.apply(nextIterations, variations);
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(data.metrics.ctr < 1.5)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.generateAlternativeApproaches(creative)];
                    case 4:
                        alternatives = _a.sent();
                        optimizedCreatives.push.apply(optimizedCreatives, alternatives);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, {
                            optimizedCreatives: optimizedCreatives,
                            insights: insights,
                            nextIterations: nextIterations
                        }];
                }
            });
        });
    };
    /**
     * Méthodes privées de génération
     */
    CreativeGenerator.prototype.generateForPersona = function (persona, objective) {
        return __awaiter(this, void 0, void 0, function () {
            var creatives, searchAd, displayAd, socialAd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        creatives = [];
                        return [4 /*yield*/, this.createSearchAdTemplate(persona, objective)];
                    case 1:
                        searchAd = _a.sent();
                        creatives.push(searchAd);
                        return [4 /*yield*/, this.createDisplayAdTemplate(persona, objective)];
                    case 2:
                        displayAd = _a.sent();
                        creatives.push(displayAd);
                        return [4 /*yield*/, this.createSocialAdTemplate(persona, objective)];
                    case 3:
                        socialAd = _a.sent();
                        creatives.push(socialAd);
                        return [2 /*return*/, creatives];
                }
            });
        });
    };
    CreativeGenerator.prototype.createSearchAdTemplate = function (persona, objective) {
        return __awaiter(this, void 0, void 0, function () {
            var headlines, descriptions, ctas;
            return __generator(this, function (_a) {
                headlines = this.generateHeadlines(persona, objective);
                descriptions = this.generateDescriptions(persona, objective);
                ctas = this.generateCallToActions(persona, objective);
                return [2 /*return*/, {
                        id: "search_".concat(persona.id, "_").concat(Date.now()),
                        name: "Search Ad - ".concat(persona.name),
                        platform: 'google',
                        format: 'search_ad',
                        dimensions: { width: 0, height: 0, aspectRatio: 'text' },
                        elements: {
                            headline: headlines[0],
                            description: descriptions[0],
                            callToAction: ctas[0],
                            colors: {
                                primary: '#1a73e8',
                                secondary: '#34a853',
                                text: '#202124',
                                background: '#ffffff'
                            }
                        },
                        audienceTargeting: [persona.id],
                        performance: {
                            estimatedCTR: this.estimateCTR(persona, 'search'),
                            estimatedCPC: this.estimateCPC(persona, 'search'),
                            qualityScore: 8.5
                        }
                    }];
            });
        });
    };
    CreativeGenerator.prototype.createDisplayAdTemplate = function (persona, objective) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        id: "display_".concat(persona.id, "_").concat(Date.now()),
                        name: "Display Ad - ".concat(persona.name),
                        platform: 'google',
                        format: 'display_banner',
                        dimensions: { width: 728, height: 90, aspectRatio: '728x90' },
                        elements: {
                            headline: this.generateHeadlines(persona, objective)[0],
                            description: this.generateDescriptions(persona, objective)[0],
                            callToAction: this.generateCallToActions(persona, objective)[0],
                            images: ['/images/restaurant-hero.jpg'],
                            colors: {
                                primary: '#d4af37',
                                secondary: '#8b4513',
                                text: '#ffffff',
                                background: '#1a1a1a'
                            }
                        },
                        audienceTargeting: [persona.id],
                        performance: {
                            estimatedCTR: this.estimateCTR(persona, 'display'),
                            estimatedCPC: this.estimateCPC(persona, 'display'),
                            qualityScore: 7.8
                        }
                    }];
            });
        });
    };
    CreativeGenerator.prototype.createSocialAdTemplate = function (persona, objective) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        id: "social_".concat(persona.id, "_").concat(Date.now()),
                        name: "Social Ad - ".concat(persona.name),
                        platform: 'meta',
                        format: 'carousel',
                        dimensions: { width: 1080, height: 1080, aspectRatio: '1:1' },
                        elements: {
                            headline: this.generateHeadlines(persona, objective)[0],
                            description: this.generateDescriptions(persona, objective)[0],
                            callToAction: this.generateCallToActions(persona, objective)[0],
                            images: [
                                '/images/dish-1.jpg',
                                '/images/dish-2.jpg',
                                '/images/restaurant-interior.jpg'
                            ],
                            colors: {
                                primary: '#e74c3c',
                                secondary: '#f39c12',
                                text: '#2c3e50',
                                background: '#ecf0f1'
                            }
                        },
                        audienceTargeting: [persona.id],
                        performance: {
                            estimatedCTR: this.estimateCTR(persona, 'social'),
                            estimatedCPC: this.estimateCPC(persona, 'social'),
                            qualityScore: 8.2
                        }
                    }];
            });
        });
    };
    CreativeGenerator.prototype.generateHeadlines = function (persona, objective) {
        var headlines = [];
        var businessName = this.config.business.name;
        // Headlines basés sur les emotional triggers
        persona.messaging.emotionalTriggers.forEach(function (trigger) {
            switch (trigger) {
                case 'exclusivity':
                    headlines.push("".concat(businessName, " - Exp\u00E9rience Gastronomique Exclusive"));
                    headlines.push("R\u00E9servez Votre Table VIP chez ".concat(businessName));
                    break;
                case 'urgency':
                    headlines.push("Tables Limit\u00E9es - ".concat(businessName, " R\u00E9servez Maintenant"));
                    headlines.push("Derni\u00E8res Places Disponibles - ".concat(businessName));
                    break;
                case 'quality':
                    headlines.push("".concat(businessName, " - Restaurant \u00C9toil\u00E9 Michelin"));
                    headlines.push("Cuisine d'Excellence - ".concat(businessName));
                    break;
            }
        });
        // Headlines basés sur les pain points
        persona.psychographics.painPoints.forEach(function (pain) {
            switch (pain) {
                case 'lack_of_time':
                    headlines.push("R\u00E9servation Express - ".concat(businessName, " en 2 Clics"));
                    break;
                case 'special_occasion':
                    headlines.push("".concat(businessName, " - Parfait pour Vos \u00C9v\u00E9nements Sp\u00E9ciaux"));
                    break;
            }
        });
        return headlines.slice(0, 10); // Limite à 10 headlines
    };
    CreativeGenerator.prototype.generateDescriptions = function (persona, objective) {
        var descriptions = [];
        // Descriptions basées sur les key messages
        persona.messaging.keyMessages.forEach(function (message) {
            descriptions.push("".concat(message, ". D\u00E9couvrez notre menu gastronomique et r\u00E9servez votre table d\u00E8s maintenant."));
        });
        // Descriptions basées sur les valeurs
        persona.psychographics.values.forEach(function (value) {
            switch (value) {
                case 'quality':
                    descriptions.push('Ingrédients premium, chef étoilé, service impeccable. Une expérience culinaire d\'exception vous attend.');
                    break;
                case 'authenticity':
                    descriptions.push('Cuisine française authentique dans un cadre élégant. Redécouvrez les saveurs traditionnelles revisitées.');
                    break;
                case 'innovation':
                    descriptions.push('Fusion créative entre tradition et modernité. Notre chef revisite les classiques avec audace.');
                    break;
            }
        });
        return descriptions.slice(0, 8);
    };
    CreativeGenerator.prototype.generateCallToActions = function (persona, objective) {
        var ctas = [];
        // CTAs basés sur les preferred channels
        persona.behavior.preferredChannels.forEach(function (channel) {
            switch (channel) {
                case 'online_booking':
                    ctas.push('Réserver Maintenant');
                    ctas.push('Réservation en Ligne');
                    break;
                case 'phone':
                    ctas.push('Appelez Maintenant');
                    ctas.push('Contactez-nous');
                    break;
                case 'email':
                    ctas.push('Demander Info');
                    ctas.push('En Savoir Plus');
                    break;
            }
        });
        // CTAs basés sur l'objectif
        switch (objective) {
            case 'awareness':
                ctas.push('Découvrir');
                ctas.push('Voir le Menu');
                break;
            case 'conversion':
                ctas.push('Réserver');
                ctas.push('Commander');
                break;
            case 'engagement':
                ctas.push('Suivre');
                ctas.push('Partager');
                break;
        }
        return __spreadArray([], new Set(ctas), true); // Supprime les doublons
    };
    CreativeGenerator.prototype.generateABVariations = function (creatives, persona) {
        return __awaiter(this, void 0, void 0, function () {
            var variations, _i, creatives_1, creative;
            return __generator(this, function (_a) {
                variations = [];
                for (_i = 0, creatives_1 = creatives; _i < creatives_1.length; _i++) {
                    creative = creatives_1[_i];
                    // Variation 1: Headline différent
                    variations.push({
                        id: "".concat(creative.id, "_var_headline"),
                        baseTemplateId: creative.id,
                        audienceId: persona.id,
                        modifications: {
                            headline: this.generateHeadlines(persona, 'conversion')[1],
                            description: creative.elements.description,
                            callToAction: creative.elements.callToAction
                        },
                        abTestConfig: {
                            trafficSplit: 50,
                            testDuration: 14,
                            successMetrics: ['ctr', 'conversion_rate']
                        }
                    });
                    // Variation 2: CTA différent
                    variations.push({
                        id: "".concat(creative.id, "_var_cta"),
                        baseTemplateId: creative.id,
                        audienceId: persona.id,
                        modifications: {
                            headline: creative.elements.headline,
                            description: creative.elements.description,
                            callToAction: this.generateCallToActions(persona, 'conversion')[1]
                        },
                        abTestConfig: {
                            trafficSplit: 50,
                            testDuration: 14,
                            successMetrics: ['ctr', 'conversion_rate']
                        }
                    });
                }
                return [2 /*return*/, variations];
            });
        });
    };
    CreativeGenerator.prototype.generateImageConcepts = function (persona, format) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            id: 'hero_dish',
                            url: '/images/signature-dish.jpg',
                            alt: 'Plat signature du chef',
                            composition: 'close-up product shot',
                            colors: ['#d4af37', '#8b4513', '#ffffff'],
                            style: 'professional food photography'
                        },
                        {
                            id: 'restaurant_ambiance',
                            url: '/images/restaurant-interior.jpg',
                            alt: 'Ambiance restaurant',
                            composition: 'wide angle lifestyle',
                            colors: ['#2c3e50', '#e74c3c', '#f39c12'],
                            style: 'warm atmospheric lighting'
                        },
                        {
                            id: 'chef_action',
                            url: '/images/chef-cooking.jpg',
                            alt: 'Chef en action',
                            composition: 'behind the scenes',
                            colors: ['#34495e', '#e67e22', '#ffffff'],
                            style: 'documentary photography'
                        }
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.generateVideoTemplates = function (persona, format) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            id: 'restaurant_story',
                            name: 'Restaurant Story - 30s',
                            duration: 30,
                            format: 'horizontal',
                            scenes: [
                                {
                                    duration: 5,
                                    type: 'product_shot',
                                    content: 'Plat signature en gros plan',
                                    animation: 'slow zoom in',
                                    audio: 'ambient kitchen sounds'
                                },
                                {
                                    duration: 8,
                                    type: 'lifestyle',
                                    content: 'Clients satisfaits dans le restaurant',
                                    animation: 'pan left to right',
                                    audio: 'soft background music'
                                },
                                {
                                    duration: 7,
                                    type: 'product_shot',
                                    content: 'Chef préparant le plat',
                                    animation: 'close-up hands',
                                    audio: 'cooking sounds'
                                },
                                {
                                    duration: 8,
                                    type: 'text_overlay',
                                    content: 'Réservez votre table dès maintenant',
                                    animation: 'fade in',
                                    audio: 'music crescendo'
                                },
                                {
                                    duration: 2,
                                    type: 'logo',
                                    content: 'Logo restaurant',
                                    animation: 'fade in',
                                    audio: 'signature sound'
                                }
                            ],
                            soundtrack: {
                                mood: 'professional',
                                genre: 'acoustic',
                                volume: 0.6
                            },
                            captions: {
                                enabled: true,
                                style: 'elegant',
                                color: '#ffffff'
                            }
                        }
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.generateLayoutTemplates = function (persona, format) {
        return [
            {
                id: 'hero_layout',
                name: 'Hero Banner Layout',
                structure: 'image_background_with_text_overlay',
                elements: {
                    background: 'full_image',
                    text_position: 'center_left',
                    cta_position: 'bottom_right',
                    overlay_opacity: 0.4
                }
            },
            {
                id: 'split_layout',
                name: 'Split Screen Layout',
                structure: 'image_text_split',
                elements: {
                    image_side: 'left',
                    text_side: 'right',
                    ratio: '60:40',
                    alignment: 'center'
                }
            }
        ];
    };
    CreativeGenerator.prototype.estimateCTR = function (persona, platform) {
        var baseCTR = 2.0;
        // Ajustements basés sur la persona
        if (persona.demographics.age.includes('25-34'))
            baseCTR += 0.3;
        if (persona.demographics.income.includes('high'))
            baseCTR += 0.2;
        // Ajustements basés sur la plateforme
        switch (platform) {
            case 'search':
                baseCTR += 0.5;
                break;
            case 'social':
                baseCTR += 0.3;
                break;
            case 'display':
                baseCTR -= 0.2;
                break;
        }
        return Math.round(baseCTR * 100) / 100;
    };
    CreativeGenerator.prototype.estimateCPC = function (persona, platform) {
        var baseCPC = 1.50;
        // Ajustements basés sur la persona
        if (persona.demographics.income.includes('high'))
            baseCPC += 0.3;
        if (persona.demographics.location.includes('Paris'))
            baseCPC += 0.2;
        // Ajustements basés sur la plateforme
        switch (platform) {
            case 'search':
                baseCPC += 0.5;
                break;
            case 'social':
                baseCPC += 0.2;
                break;
            case 'display':
                baseCPC -= 0.3;
                break;
        }
        return Math.round(baseCPC * 100) / 100;
    };
    CreativeGenerator.prototype.initializeTemplates = function () {
        // Templates de base seront initialisés ici
    };
    CreativeGenerator.prototype.initializePersonas = function () {
        // Personas par défaut
        this.personas.set('gourmets', {
            id: 'gourmets',
            name: 'Gourmets Parisiens',
            demographics: {
                age: '35-50',
                gender: 'Mixed',
                income: 'High (80K+)',
                location: 'Paris & Suburbs'
            },
            psychographics: {
                interests: ['Fine dining', 'Wine', 'Culinary experiences'],
                values: ['Quality', 'Authenticity', 'Exclusivity'],
                lifestyle: ['Affluent', 'Social', 'Cultured'],
                painPoints: ['Limited time', 'Finding authentic experiences']
            },
            behavior: {
                onlineHabits: ['Restaurant reviews', 'Social media', 'Food blogs'],
                purchaseDrivers: ['Quality', 'Reputation', 'Experience'],
                preferredChannels: ['Online booking', 'Phone', 'Social media'],
                decisionMakers: ['Reviews', 'Recommendations', 'Chef reputation']
            },
            messaging: {
                toneOfVoice: 'Sophisticated but approachable',
                keyMessages: ['Exceptional culinary experience', 'Authentic French cuisine', 'Memorable occasions'],
                emotionalTriggers: ['Exclusivity', 'Quality', 'Prestige'],
                avoidWords: ['Cheap', 'Fast', 'Basic']
            }
        });
        this.personas.set('tourists', {
            id: 'tourists',
            name: 'International Tourists',
            demographics: {
                age: '25-45',
                gender: 'Mixed',
                income: 'Medium-High',
                location: 'International visitors'
            },
            psychographics: {
                interests: ['Travel', 'Culture', 'Local experiences'],
                values: ['Authenticity', 'Discovery', 'Memorable experiences'],
                lifestyle: ['Adventurous', 'Cultural', 'Experience-seekers'],
                painPoints: ['Language barriers', 'Finding authentic local food']
            },
            behavior: {
                onlineHabits: ['Travel apps', 'Reviews', 'Social sharing'],
                purchaseDrivers: ['Authenticity', 'Location', 'Reviews'],
                preferredChannels: ['Online booking', 'Apps', 'Hotel concierge'],
                decisionMakers: ['TripAdvisor', 'Google reviews', 'Recommendations']
            },
            messaging: {
                toneOfVoice: 'Welcoming and informative',
                keyMessages: ['Authentic Parisian dining', 'Tourist-friendly', 'Must-visit destination'],
                emotionalTriggers: ['Discovery', 'Authenticity', 'FOMO'],
                avoidWords: ['Tourist trap', 'Overpriced', 'Fake']
            }
        });
    };
    CreativeGenerator.prototype.initializeVideoTemplates = function () {
        // Templates vidéo seront initialisés ici
    };
    CreativeGenerator.prototype.adaptToGoogleFormats = function (baseCreative) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            platform: 'google',
                            format: 'responsive_display',
                            creative: __assign(__assign({}, baseCreative), { format: 'responsive_display' }),
                            optimizations: ['Auto-fit to any ad space', 'Machine learning optimization']
                        },
                        {
                            platform: 'google',
                            format: 'youtube_ads',
                            creative: __assign(__assign({}, baseCreative), { format: 'video_ad' }),
                            optimizations: ['Skippable format', 'Bumper ad version', 'In-stream placement']
                        }
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.adaptToMetaFormats = function (baseCreative) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            platform: 'meta',
                            format: 'instagram_stories',
                            creative: __assign(__assign({}, baseCreative), { format: 'story_ad', dimensions: { width: 1080, height: 1920, aspectRatio: '9:16' } }),
                            optimizations: ['Full-screen immersion', 'Vertical video format', 'Interactive elements']
                        },
                        {
                            platform: 'meta',
                            format: 'facebook_carousel',
                            creative: __assign(__assign({}, baseCreative), { format: 'carousel' }),
                            optimizations: ['Multiple product showcase', 'Swipe interaction', 'Individual CTAs']
                        }
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.adaptToLinkedInFormats = function (baseCreative) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            platform: 'linkedin',
                            format: 'sponsored_content',
                            creative: __assign(__assign({}, baseCreative), { format: 'display_banner' }),
                            optimizations: ['Professional tone', 'B2B messaging', 'Industry targeting']
                        }
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.adaptToTikTokFormats = function (baseCreative) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            platform: 'tiktok',
                            format: 'in_feed_video',
                            creative: __assign(__assign({}, baseCreative), { format: 'video_ad', dimensions: { width: 1080, height: 1920, aspectRatio: '9:16' } }),
                            optimizations: ['Native video format', 'Trendy music', 'Quick engagement']
                        }
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.generateCrossPlatformStrategy = function (baseCreative) {
        return {
            consistency: [
                'Maintain brand colors across all platforms',
                'Keep core message consistent',
                'Use same logo and visual identity'
            ],
            adaptations: [
                'Adjust tone for platform culture',
                'Optimize dimensions for each format',
                'Adapt interaction patterns'
            ],
            messaging: [
                'Professional tone for LinkedIn',
                'Casual and engaging for TikTok',
                'Visual storytelling for Instagram',
                'Direct and informative for Google'
            ]
        };
    };
    CreativeGenerator.prototype.generatePersonaRecommendations = function (persona) {
        return [
            "Pour ".concat(persona.name, ": Utiliser un ton ").concat(persona.messaging.toneOfVoice),
            "Emphasize ".concat(persona.messaging.emotionalTriggers.join(', '), " dans les cr\u00E9atifs"),
            "Eviter les mots: ".concat(persona.messaging.avoidWords.join(', ')),
            "Cibler principalement: ".concat(persona.behavior.preferredChannels.join(', '))
        ];
    };
    CreativeGenerator.prototype.estimateCreativePerformance = function (creatives) {
        var performances = creatives.map(function (c) { return ({
            id: c.id,
            estimatedCTR: c.performance.estimatedCTR
        }); });
        var bestPerforming = performances.reduce(function (best, current) {
            return current.estimatedCTR > best.estimatedCTR ? current : best;
        });
        return {
            bestPerforming: bestPerforming.id,
            expectedCTR: bestPerforming.estimatedCTR,
            expectedConversions: Math.round(bestPerforming.estimatedCTR * 100)
        };
    };
    CreativeGenerator.prototype.analyzeCreativePerformance = function (creative, metrics) {
        var insights = [];
        if (metrics.ctr > 3.0) {
            insights.push("Cr\u00E9atif ".concat(creative.name, " performe excellemment (CTR: ").concat(metrics.ctr, "%)"));
        }
        if (metrics.cpc > 2.0) {
            insights.push("Cr\u00E9atif ".concat(creative.name, " a un CPC \u00E9lev\u00E9, consid\u00E9rer l'optimisation des ench\u00E8res"));
        }
        return { insights: insights };
    };
    CreativeGenerator.prototype.generateSimilarVariations = function (creative) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            id: "".concat(creative.id, "_similar_1"),
                            baseTemplateId: creative.id,
                            audienceId: creative.audienceTargeting[0],
                            modifications: {
                                headline: creative.elements.headline + ' - Offre Limitée',
                                description: creative.elements.description,
                                callToAction: creative.elements.callToAction
                            },
                            abTestConfig: {
                                trafficSplit: 50,
                                testDuration: 7,
                                successMetrics: ['ctr', 'conversion_rate']
                            }
                        }
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.generateAlternativeApproaches = function (creative) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        __assign(__assign({}, creative), { id: "".concat(creative.id, "_alt"), name: "".concat(creative.name, " - Alternative"), elements: __assign(__assign({}, creative.elements), { headline: 'Nouvelle Approche: ' + creative.elements.headline, colors: __assign(__assign({}, creative.elements.colors), { primary: '#e74c3c' // Couleur différente pour tester
                                 }) }) })
                    ]];
            });
        });
    };
    CreativeGenerator.prototype.extractKeywords = function (persona) {
        var keywords = [];
        // Mots-clés basés sur les interests
        keywords.push.apply(keywords, persona.psychographics.interests);
        // Mots-clés basés sur les purchase drivers
        keywords.push.apply(keywords, persona.behavior.purchaseDrivers);
        // Mots-clés spécifiques au business
        keywords.push(this.config.business.name, this.config.business.industry, this.config.business.location);
        return __spreadArray([], new Set(keywords.map(function (k) { return k.toLowerCase(); })), true);
    };
    CreativeGenerator.prototype.generateEmotionalHooks = function (persona) {
        return persona.messaging.emotionalTriggers.map(function (trigger) {
            switch (trigger) {
                case 'exclusivity':
                    return 'Expérience exclusive réservée aux connaisseurs';
                case 'urgency':
                    return 'Réservez maintenant, places limitées';
                case 'quality':
                    return 'Excellence culinaire garantie';
                case 'discovery':
                    return 'Découvrez des saveurs uniques';
                case 'prestige':
                    return 'Rejoignez une élite gastronomique';
                default:
                    return "Profitez de notre ".concat(trigger);
            }
        });
    };
    return CreativeGenerator;
}());
exports.CreativeGenerator = CreativeGenerator;
exports.default = CreativeGenerator;
