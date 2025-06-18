"use strict";
/**
 * SEO Agent - Phase 2 Advanced SEO Engine
 * Intelligence artificielle SEO complète avec 4 modules intégrés:
 * - Content AI Generator (GPT-4 + Claude)
 * - Keyword Research Automatisé
 * - Content Calendar Intelligent
 * - SEO Monitoring Avancé
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEOAgent = void 0;
var seo_orchestrator_1 = require("./workflows/seo-orchestrator");
var content_ai_generator_1 = require("./workflows/content-ai-generator");
var keyword_research_1 = require("./workflows/keyword-research");
var content_calendar_1 = require("./workflows/content-calendar");
var seo_monitoring_1 = require("./workflows/seo-monitoring");
var SEOAgent = /** @class */ (function () {
    function SEOAgent(config) {
        this.orchestrator = seo_orchestrator_1.default;
        this.config = config;
        this.activeCampaigns = new Map();
    }
    /**
     * PHASE 2 - API Principal: Lance une campagne SEO complète avec IA
     */
    SEOAgent.prototype.launchAdvancedSEOCampaign = function (customConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var campaignConfig, campaign;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🚀 LANCEMENT CAMPAGNE SEO PHASE 2 AVANCÉE');
                        campaignConfig = __assign(__assign(__assign({}, seo_orchestrator_1.defaultCampaignConfig), { businessInfo: {
                                name: this.config.businessName,
                                industry: 'restaurant',
                                location: this.config.city,
                                targetAudience: ['food lovers', 'couples', 'business diners'],
                                competitors: ['restaurant-concurrent1.fr', 'restaurant-concurrent2.fr']
                            } }), customConfig);
                        return [4 /*yield*/, this.orchestrator.launchCompleteSEOCampaign(campaignConfig)];
                    case 1:
                        campaign = _a.sent();
                        this.activeCampaigns.set(campaign.campaignId, campaign);
                        console.log("\u2705 Campagne ".concat(campaign.campaignId, " lanc\u00E9e avec succ\u00E8s!"));
                        console.log("\uD83D\uDCCA R\u00E9sultats: ".concat(campaign.generatedKeywords, " mots-cl\u00E9s, ").concat(campaign.plannedContent, " contenus, ").concat(campaign.expectedTraffic, " trafic estim\u00E9"));
                        return [2 /*return*/, campaign];
                }
            });
        });
    };
    /**
     * PHASE 2 - Génération de contenu IA en masse
     */
    SEOAgent.prototype.generateAIContent = function (sector, contentTypes, keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var config, results, _i, contentTypes_1, contentType, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🤖 Génération de contenu IA en masse...');
                        config = {
                            sector: sector,
                            targetAudience: ['target_audience'],
                            brand: {
                                name: this.config.businessName,
                                tone: 'luxury',
                                values: ['excellence', 'quality', 'tradition']
                            },
                            seoParams: {
                                primaryKeywords: keywords.slice(0, 3),
                                secondaryKeywords: keywords.slice(3),
                                targetLanguage: 'fr',
                                geoLocation: this.config.city
                            }
                        };
                        results = {};
                        _i = 0, contentTypes_1 = contentTypes;
                        _a.label = 1;
                    case 1:
                        if (!(_i < contentTypes_1.length)) return [3 /*break*/, 4];
                        contentType = contentTypes_1[_i];
                        return [4 /*yield*/, content_ai_generator_1.default.generateOptimizedContent(config, contentType)];
                    case 2:
                        content = _a.sent();
                        results[contentType] = content;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("\u2705 ".concat(Object.keys(results).length, " contenus g\u00E9n\u00E9r\u00E9s avec IA"));
                        return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * PHASE 2 - Recherche de mots-clés automatisée avec APIs
     */
    SEOAgent.prototype.performAdvancedKeywordResearch = function (seedKeywords, competitors) {
        return __awaiter(this, void 0, void 0, function () {
            var config, research;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🔍 Recherche de mots-clés avancée avec APIs...');
                        config = {
                            industry: 'restaurant',
                            geoLocation: this.config.city,
                            language: 'fr',
                            competitors: competitors || ['restaurant-concurrent1.fr'],
                            seedKeywords: seedKeywords || this.config.keywords.primary,
                            businessType: 'local',
                            targetAudience: ['food lovers', 'couples']
                        };
                        return [4 /*yield*/, keyword_research_1.default.performCompleteResearch(config)];
                    case 1:
                        research = _a.sent();
                        console.log("\u2705 Recherche termin\u00E9e: ".concat(research.seedKeywords.length, " mots-cl\u00E9s principaux, ").concat(research.longTailKeywords.length, " longue tra\u00EEne"));
                        return [2 /*return*/, research];
                }
            });
        });
    };
    /**
     * PHASE 2 - Calendrier de contenu intelligent 12 mois
     */
    SEOAgent.prototype.generateIntelligentContentCalendar = function (keywords, publicationFrequency) {
        if (publicationFrequency === void 0) { publicationFrequency = 4; }
        return __awaiter(this, void 0, void 0, function () {
            var config, keywordsData, _a, calendar;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('📅 Génération calendrier de contenu intelligent...');
                        config = {
                            industry: 'restaurant',
                            businessGoals: ['increase_visibility', 'drive_reservations'],
                            contentTypes: ['blog_post', 'seasonal_content', 'event_content'],
                            publicationFrequency: {
                                blogPosts: publicationFrequency,
                                landingPages: 1,
                                seasonalContent: 2
                            },
                            team: {
                                writers: ['ai_writer_1', 'ai_writer_2'],
                                editors: ['ai_editor'],
                                seoSpecialists: ['seo_specialist']
                            },
                            holidays: ['FR'],
                            targetAudience: [{
                                    segments: ['food_lovers'],
                                    buyingCycle: 'awareness'
                                }]
                        };
                        _a = keywords;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.performAdvancedKeywordResearch()];
                    case 1:
                        _a = (_b.sent()).seedKeywords;
                        _b.label = 2;
                    case 2:
                        keywordsData = _a;
                        return [4 /*yield*/, content_calendar_1.default.generateYearlyCalendar(config, keywordsData)];
                    case 3:
                        calendar = _b.sent();
                        console.log("\u2705 Calendrier g\u00E9n\u00E9r\u00E9: ".concat(calendar.items.length, " contenus planifi\u00E9s sur 12 mois"));
                        return [2 /*return*/, calendar];
                }
            });
        });
    };
    /**
     * PHASE 2 - Monitoring SEO temps réel avec alertes
     */
    SEOAgent.prototype.startAdvancedSEOMonitoring = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var config, dashboard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('📈 Démarrage monitoring SEO avancé...');
                        config = {
                            domain: domain || "https://".concat(this.config.businessName.toLowerCase().replace(/\s+/g, '-'), ".fr"),
                            trackedKeywords: this.config.keywords.primary,
                            competitors: ['restaurant-concurrent1.fr', 'restaurant-concurrent2.fr'],
                            alertThresholds: {
                                positionDrop: 5,
                                trafficDrop: 20,
                                technicalScore: 70
                            },
                            auditFrequency: 'daily',
                            reportRecipients: ['seo@domain.com'],
                            integrations: {
                                googleSearchConsole: true,
                                googleAnalytics: true,
                                semrush: true,
                                ahrefs: false
                            }
                        };
                        return [4 /*yield*/, seo_monitoring_1.default.startRealTimeMonitoring()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, seo_monitoring_1.default.generateDashboard()];
                    case 2:
                        dashboard = _a.sent();
                        console.log("\u2705 Monitoring actif - Score technique: ".concat(dashboard.overview.technicalScore, "/100"));
                        return [2 /*return*/, dashboard];
                }
            });
        });
    };
    /**
     * PHASE 2 - Rapport de performance complet
     */
    SEOAgent.prototype.generateAdvancedSEOReport = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var dashboard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!campaignId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.orchestrator.generatePerformanceReport(campaignId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, seo_monitoring_1.default.generateDashboard()];
                    case 3:
                        dashboard = _a.sent();
                        return [2 /*return*/, "\n# RAPPORT SEO AVANC\u00C9 - ".concat(this.config.businessName, "\n\n## \uD83D\uDCCA Vue d'ensemble\n- Mots-cl\u00E9s suivis: ").concat(dashboard.overview.totalKeywords, "\n- Position moyenne: ").concat(dashboard.overview.averagePosition, "\n- Trafic estim\u00E9: ").concat(dashboard.overview.totalTraffic, " visites/mois\n- Score de visibilit\u00E9: ").concat(dashboard.overview.visibilityScore, "/100\n- Score technique: ").concat(dashboard.overview.technicalScore, "/100\n\n## \uD83D\uDE80 Top Performers\n").concat(dashboard.topMovers.gainers.map(function (k) { return "- ".concat(k.keyword, ": +").concat(k.positionChange, " positions"); }).join('\n'), "\n\n## \u26A0\uFE0F Points d'attention\n").concat(dashboard.topMovers.losers.map(function (k) { return "- ".concat(k.keyword, ": ").concat(k.positionChange, " positions"); }).join('\n'), "\n\n## \uD83D\uDCCB Actions prioritaires\n").concat(dashboard.nextActions.map(function (a) { return "- ".concat(a.priority, ": ").concat(a.action); }).join('\n'), "\n\n---\nRapport g\u00E9n\u00E9r\u00E9 le ").concat(new Date().toLocaleDateString(), " avec l'Agent SEO Phase 2\n")];
                }
            });
        });
    };
    /**
     * PHASE 2 - API de statut des campagnes
     */
    SEOAgent.prototype.getCampaignStatus = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.activeCampaigns.get(campaignId)];
            });
        });
    };
    /**
     * PHASE 2 - Liste des campagnes actives
     */
    SEOAgent.prototype.getActiveCampaigns = function () {
        return Array.from(this.activeCampaigns.keys());
    };
    // ===============================
    // MÉTHODES LEGACY (PHASE 1)
    // Conservées pour compatibilité
    // ===============================
    /**
     * G�n�re le Schema.org structur� pour restaurant
     */
    SEOAgent.prototype.generateRestaurantSchema = function () {
        return "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Restaurant\",\n  \"name\": \"".concat(this.config.businessName, "\",\n  \"description\": \"Restaurant gastronomique premium au cSur de ").concat(this.config.city, ". Cuisine raffin\uFFFDe par le Chef \uFFFDtoil\uFFFD Antoine Dubois. R\uFFFDservation en ligne.\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"").concat(this.config.address, "\",\n    \"addressLocality\": \"").concat(this.config.city, "\",\n    \"addressCountry\": \"FR\",\n    \"postalCode\": \"75001\"\n  },\n  \"telephone\": \"").concat(this.config.phone, "\",\n  \"url\": \"https://legourmet-paris.fr\",\n  \"email\": \"contact@legourmet-paris.fr\",\n  \"servesCuisine\": ").concat(JSON.stringify(this.config.cuisine), ",\n  \"priceRange\": \"").concat(this.config.priceRange, "\",\n  \"acceptsReservations\": true,\n  \"hasMenu\": \"https://legourmet-paris.fr#menu\",\n  \"openingHoursSpecification\": [\n    {\n      \"@type\": \"OpeningHoursSpecification\",\n      \"dayOfWeek\": [\"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"],\n      \"opens\": \"19:00\",\n      \"closes\": \"23:00\"\n    }\n  ],\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 48.8566,\n    \"longitude\": 2.3522\n  },\n  \"aggregateRating\": {\n    \"@type\": \"AggregateRating\",\n    \"ratingValue\": \"4.8\",\n    \"reviewCount\": \"127\",\n    \"bestRating\": \"5\"\n  },\n  \"starRating\": {\n    \"@type\": \"Rating\",\n    \"ratingValue\": \"1\"\n  },\n  \"award\": \"\uFFFDtoile Michelin 2020-2024\",\n  \"founder\": {\n    \"@type\": \"Person\",\n    \"name\": \"Chef Antoine Dubois\"\n  },\n  \"image\": [\n    \"https://legourmet-paris.fr/images/restaurant-hero.jpg\",\n    \"https://legourmet-paris.fr/images/chef-antoine.jpg\",\n    \"https://legourmet-paris.fr/images/interior.jpg\"\n  ],\n  \"sameAs\": [\n    \"https://www.facebook.com/legourmetparis\",\n    \"https://www.instagram.com/legourmetparis\",\n    \"https://www.tripadvisor.fr/legourmet\"\n  ]\n}");
    };
    /**
     * G�n�re les meta tags optimis�s
     */
    SEOAgent.prototype.generateMetaTags = function () {
        return {
            // Meta tags de base
            'title': 'Le Gourmet - Restaurant Gastronomique �toil� Paris | Chef Antoine Dubois',
            'description': 'Restaurant gastronomique �toil� Michelin au cSur de Paris. Cuisine fran�aise raffin�e par le Chef Antoine Dubois. R�servation en ligne. Exp�rience gastronomique inoubliable.',
            'keywords': 'restaurant gastronomique paris, �toile michelin, chef antoine dubois, cuisine fran�aise, restaurant �toil�, r�servation restaurant paris, gastronomie fran�aise',
            'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'author': 'Le Gourmet Paris',
            'viewport': 'width=device-width, initial-scale=1.0',
            'canonical': 'https://legourmet-paris.fr',
            // Open Graph (Facebook)
            'og:type': 'restaurant',
            'og:title': 'Le Gourmet - Restaurant Gastronomique �toil� Paris',
            'og:description': 'Restaurant gastronomique �toil� Michelin au cSur de Paris. Cuisine fran�aise raffin�e par le Chef Antoine Dubois.',
            'og:url': 'https://legourmet-paris.fr',
            'og:site_name': 'Le Gourmet',
            'og:image': 'https://legourmet-paris.fr/images/og-restaurant.jpg',
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': 'Restaurant Le Gourmet - Int�rieur �l�gant',
            'og:locale': 'fr_FR',
            // Twitter Cards
            'twitter:card': 'summary_large_image',
            'twitter:title': 'Le Gourmet - Restaurant Gastronomique �toil� Paris',
            'twitter:description': 'Restaurant gastronomique �toil� Michelin au cSur de Paris. Cuisine fran�aise raffin�e par le Chef Antoine Dubois.',
            'twitter:image': 'https://legourmet-paris.fr/images/twitter-restaurant.jpg',
            'twitter:image:alt': 'Restaurant Le Gourmet - Chef Antoine Dubois',
            'twitter:site': '@legourmetparis',
            'twitter:creator': '@legourmetparis',
            // G�olocalisation
            'geo.region': 'FR-75',
            'geo.placename': 'Paris',
            'geo.position': '48.8566;2.3522',
            'ICBM': '48.8566, 2.3522',
            // Mobile
            'format-detection': 'telephone=yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black-translucent',
            'theme-color': '#d4af37',
            // R�f�rencement local
            'business:contact_data:street_address': '15 Rue de la Gastronomie',
            'business:contact_data:locality': 'Paris',
            'business:contact_data:postal_code': '75001',
            'business:contact_data:country_name': 'France',
            'business:contact_data:phone_number': '+33142601578',
            'business:contact_data:website': 'https://legourmet-paris.fr'
        };
    };
    /**
     * G�n�re le sitemap XML
     */
    SEOAgent.prototype.generateSitemap = function () {
        var baseUrl = 'https://legourmet-paris.fr';
        var lastmod = new Date().toISOString().split('T')[0];
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url>\n    <loc>".concat(baseUrl, "</loc>\n    <lastmod>").concat(lastmod, "</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>").concat(baseUrl, "#menu</loc>\n    <lastmod>").concat(lastmod, "</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>").concat(baseUrl, "#chef</loc>\n    <lastmod>").concat(lastmod, "</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n  <url>\n    <loc>").concat(baseUrl, "#galerie</loc>\n    <lastmod>").concat(lastmod, "</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n  <url>\n    <loc>").concat(baseUrl, "#contact</loc>\n    <lastmod>").concat(lastmod, "</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n  <url>\n    <loc>").concat(baseUrl, "#reservation</loc>\n    <lastmod>").concat(lastmod, "</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n</urlset>");
    };
    /**
     * Analyse des mots-cl�s restaurant local
     */
    SEOAgent.prototype.getKeywordStrategy = function () {
        return {
            primary: [
                'restaurant gastronomique paris',
                'restaurant �toil� paris',
                'chef �toil� paris',
                'cuisine fran�aise raffin�e'
            ],
            secondary: [
                'restaurant michelin paris',
                'gastronomie fran�aise',
                'restaurant haute cuisine',
                'chef antoine dubois',
                'r�servation restaurant �toil�'
            ],
            longTail: [
                'meilleur restaurant gastronomique paris 1er',
                'restaurant �toile michelin r�servation en ligne',
                'chef �toil� cuisine fran�aise moderne',
                'restaurant romantique paris gastronomique',
                'd�ner gastronomique paris occasion sp�ciale'
            ],
            local: [
                'restaurant gastronomique 1er arrondissement',
                'restaurant �toil� ch�telet',
                'cuisine fran�aise louvre',
                'restaurant romantique centre paris',
                'gastronomie �le de france'
            ]
        };
    };
    /**
     * Optimisation des images
     */
    SEOAgent.prototype.generateImageOptimization = function () {
        return {
            altTexts: {
                'hero': 'Restaurant Le Gourmet - Salle � manger �l�gante avec vue cuisine ouverte',
                'chef': 'Chef Antoine Dubois en tenue de cuisine dans son restaurant �toil�',
                'plat-1': 'Foie gras po�l� compot�e de figues plat signature Le Gourmet',
                'plat-2': 'Saint-Jacques snack�es pur�e topinambour truffe noire',
                'plat-3': 'BSuf de Wagyu l�gumes glac�s jus de viande restaurant gastronomique',
                'interieur': 'Int�rieur restaurant Le Gourmet ambiance feutr�e tables dress�es',
                'cuisine': 'Cuisine professionnelle Le Gourmet chef au travail',
                'dessert': 'Dessert signature p�tisserie fine restaurant �toil� Paris'
            },
            fileNames: [
                'restaurant-le-gourmet-hero-1200x630.webp',
                'chef-antoine-dubois-portrait-800x600.webp',
                'foie-gras-poele-plat-signature-600x400.webp',
                'saint-jacques-snackees-truffe-600x400.webp',
                'boeuf-wagyu-legumes-glaces-600x400.webp',
                'interieur-restaurant-elegant-800x600.webp',
                'cuisine-professionnelle-chef-800x600.webp',
                'dessert-signature-patisserie-600x400.webp'
            ],
            webpSupport: true
        };
    };
    /**
     * Configuration robots.txt
     */
    SEOAgent.prototype.generateRobotsTxt = function () {
        return "User-agent: *\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\nCrawl-delay: 1\n\nUser-agent: Bingbot\nAllow: /\nCrawl-delay: 2\n\n# Sitemap\nSitemap: https://legourmet-paris.fr/sitemap.xml\n\n# Disallow admin areas\nDisallow: /admin/\nDisallow: /api/\nDisallow: /_next/\n\n# Allow images\nAllow: /images/\nAllow: /*.jpg$\nAllow: /*.jpeg$\nAllow: /*.png$\nAllow: /*.webp$";
    };
    /**
     * Audit technique SEO
     */
    SEOAgent.prototype.getTechnicalAudit = function () {
        return {
            coreWebVitals: {
                lcp: { target: '<2.5s', description: 'Largest Contentful Paint' },
                fid: { target: '<100ms', description: 'First Input Delay' },
                cls: { target: '<0.1', description: 'Cumulative Layout Shift' },
                ttfb: { target: '<600ms', description: 'Time to First Byte' }
            },
            recommendations: [
                'Optimiser les images en format WebP avec lazy loading',
                'Impl�menter le cache navigateur pour les ressources statiques',
                'Minifier CSS et JavaScript',
                'Utiliser un CDN pour les images',
                'Optimiser les fonts avec font-display: swap',
                'Impl�menter le preloading pour les ressources critiques',
                'R�duire la taille du DOM (objectif <1500 �l�ments)',
                'Optimiser les animations CSS pour �viter le layout shift'
            ],
            criticalIssues: [
                'Ajouter les meta tags Open Graph manquants',
                'Corriger les erreurs de validation HTML',
                'Impl�menter le Schema.org Restaurant',
                'Optimiser les titres H1-H6 pour la hi�rarchie',
                'Ajouter les attributs alt sur toutes les images',
                'Configurer HTTPS et redirections 301',
                'Cr�er et soumettre le sitemap XML'
            ]
        };
    };
    /**
     * Strat�gie de contenu local
     */
    SEOAgent.prototype.getContentStrategy = function () {
        return {
            topics: [
                'Histoire et tradition de la gastronomie fran�aise',
                'Techniques culinaires du Chef Antoine Dubois',
                'Produits de saison et sourcing local',
                'Accords mets et vins',
                '�v�nements priv�s et occasions sp�ciales',
                'Guide des sp�cialit�s r�gionales fran�aises'
            ],
            calendar: {
                'Janvier': ['Menu hivernal', 'Truffe noire P�rigord', 'Saint-Valentin'],
                'F�vrier': ['Saint-Valentin gastronomique', 'Produits de saison'],
                'Mars': ['Printemps culinaire', 'Asperges nouvelles'],
                'Avril': ['Cuisine de P�ques', 'Agneau de lait'],
                'Mai': ['Terrasse �t�', 'L�gumes primeurs'],
                'Juin': ['Cuisine estivale', 'Produits m�diterran�ens'],
                'Juillet': ['Menu �t�', 'Vacances gourmandes'],
                'Ao�t': ['Saison des fruits', 'Cuisine l�g�re'],
                'Septembre': ['Rentr�e gastronomique', 'Champignons'],
                'Octobre': ['Automne saveurs', 'Gibier de saison'],
                'Novembre': ['Menu automnal', 'Ch�taignes et marrons'],
                'D�cembre': ['F�tes de fin d\'ann�e', 'R�veillons']
            },
            localSEO: [
                'Restaurant gastronomique 1er arrondissement Paris',
                '�toile Michelin Ch�telet Les Halles',
                'Chef �toil� pr�s du Louvre',
                'Cuisine fran�aise �le de la Cit�',
                'Restaurant romantique Marais',
                'Gastronomie Beaubourg Pompidou'
            ]
        };
    };
    return SEOAgent;
}());
exports.SEOAgent = SEOAgent;
// Configuration par d�faut pour Le Gourmet
var restaurantSEOConfig = {
    businessName: 'Le Gourmet',
    address: '15 Rue de la Gastronomie, 75001 Paris',
    city: 'Paris',
    phone: '+33142601578',
    cuisine: ['Cuisine fran�aise', 'Gastronomie', 'Cuisine moderne'],
    priceRange: '$$$',
    features: ['�toile Michelin', 'Chef �toil�', 'R�servation en ligne'],
    keywords: {
        primary: ['restaurant gastronomique paris', 'restaurant �toil�', 'chef �toil�'],
        secondary: ['cuisine fran�aise', 'michelin', 'gastronomie'],
        local: ['restaurant 1er arrondissement', 'ch�telet', 'louvre']
    }
};
exports.default = new SEOAgent(restaurantSEOConfig);
