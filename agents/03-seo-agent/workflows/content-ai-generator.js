"use strict";
/**
 * Content AI Generator - Phase 2 SEO Agent
 * Génération de contenu optimisé SEO avec GPT-4 + Claude
 * Templates sectoriels et optimisation automatique des mots-clés
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
exports.defaultContentConfig = exports.ContentAIGenerator = void 0;
var openai_1 = require("openai");
var claude_api_service_1 = require("../../../core/services/claude-api.service");
var ContentAIGenerator = /** @class */ (function () {
    function ContentAIGenerator(openaiApiKey, claudeApiKey) {
        this.openai = new openai_1.OpenAI({ apiKey: openaiApiKey });
        this.claude = new claude_api_service_1.ClaudeAPIService(claudeApiKey);
        this.initializeSectorTemplates();
    }
    /**
     * Initialise les templates par secteur d'activité
     */
    ContentAIGenerator.prototype.initializeSectorTemplates = function () {
        this.sectorTemplates = new Map([
            ['restaurant', [
                    {
                        type: 'landing_page',
                        structure: {
                            sections: ['hero', 'menu_highlights', 'chef_story', 'ambiance', 'location', 'reservation'],
                            wordCount: { min: 800, max: 1200 },
                            headingStructure: ['h1', 'h2', 'h2', 'h2', 'h2', 'h2']
                        },
                        seoRequirements: {
                            keywordDensity: 0.02,
                            headingKeywords: true,
                            metaDescription: true,
                            imageAltTexts: true
                        }
                    },
                    {
                        type: 'blog_post',
                        structure: {
                            sections: ['introduction', 'main_content', 'chef_tips', 'seasonal_ingredients', 'conclusion'],
                            wordCount: { min: 1000, max: 1500 },
                            headingStructure: ['h1', 'h2', 'h3', 'h2', 'h2']
                        },
                        seoRequirements: {
                            keywordDensity: 0.015,
                            headingKeywords: true,
                            metaDescription: true,
                            imageAltTexts: true
                        }
                    }
                ]],
            ['ecommerce', [
                    {
                        type: 'product_description',
                        structure: {
                            sections: ['product_overview', 'features', 'benefits', 'specifications', 'usage', 'guarantee'],
                            wordCount: { min: 300, max: 500 },
                            headingStructure: ['h1', 'h2', 'h2', 'h3', 'h2', 'h2']
                        },
                        seoRequirements: {
                            keywordDensity: 0.025,
                            headingKeywords: true,
                            metaDescription: true,
                            imageAltTexts: true
                        }
                    }
                ]],
            ['saas', [
                    {
                        type: 'service_page',
                        structure: {
                            sections: ['value_proposition', 'features', 'use_cases', 'pricing', 'testimonials', 'cta'],
                            wordCount: { min: 800, max: 1200 },
                            headingStructure: ['h1', 'h2', 'h2', 'h2', 'h2', 'h2']
                        },
                        seoRequirements: {
                            keywordDensity: 0.02,
                            headingKeywords: true,
                            metaDescription: true,
                            imageAltTexts: true
                        }
                    }
                ]]
        ]);
    };
    /**
     * Génère du contenu optimisé SEO avec GPT-4
     */
    ContentAIGenerator.prototype.generateContentWithGPT4 = function (template, config, customPrompt) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorContext, keywordString, systemPrompt, userPrompt, response, generatedData, seoAnalysis, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sectorContext = this.getSectorContext(config.sector);
                        keywordString = __spreadArray(__spreadArray([], config.seoParams.primaryKeywords, true), config.seoParams.secondaryKeywords, true).join(', ');
                        systemPrompt = "Tu es un expert en r\u00E9daction SEO sp\u00E9cialis\u00E9 dans le secteur ".concat(config.sector, ".\n    Ton objectif est de cr\u00E9er du contenu optimis\u00E9 qui :\n    - Int\u00E8gre naturellement les mots-cl\u00E9s : ").concat(keywordString, "\n    - Respecte la densit\u00E9 de mots-cl\u00E9s de ").concat(template.seoRequirements.keywordDensity * 100, "%\n    - Adopte un ton ").concat(config.brand.tone, "\n    - Cible l'audience : ").concat(config.targetAudience.join(', '), "\n    - Respecte les valeurs de la marque : ").concat(config.brand.values.join(', '), "\n    \n    Structure requise : ").concat(template.structure.sections.join(' → '), "\n    Nombre de mots : ").concat(template.structure.wordCount.min, "-").concat(template.structure.wordCount.max, "\n    \n    ").concat(sectorContext);
                        userPrompt = customPrompt || "Cr\u00E9e un contenu de type ".concat(template.type, " pour la marque ").concat(config.brand.name, ".\n    \n    Exigences sp\u00E9cifiques :\n    1. Titre principal optimis\u00E9 SEO avec mot-cl\u00E9 principal\n    2. Meta description de 150-160 caract\u00E8res\n    3. Contenu structur\u00E9 avec les sections demand\u00E9es\n    4. Int\u00E9gration naturelle des mots-cl\u00E9s\n    5. Appels \u00E0 l'action appropri\u00E9s\n    6. Suggestions d'images avec alt-texts optimis\u00E9s\n    \n    ").concat(config.seoParams.geoLocation ? "Contexte g\u00E9ographique : ".concat(config.seoParams.geoLocation) : '', "\n    \n    Retourne le r\u00E9sultat au format JSON avec les champs : title, metaDescription, content, headings, imageAlts.");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: 'gpt-4-turbo-preview',
                                messages: [
                                    { role: 'system', content: systemPrompt },
                                    { role: 'user', content: userPrompt }
                                ],
                                temperature: 0.7,
                                max_tokens: 2000,
                                response_format: { type: 'json_object' }
                            })];
                    case 2:
                        response = _a.sent();
                        generatedData = JSON.parse(response.choices[0].message.content);
                        return [4 /*yield*/, this.analyzeSEOContent(generatedData.content, config.seoParams)];
                    case 3:
                        seoAnalysis = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, generatedData), { seoScore: seoAnalysis.score, keywordAnalysis: seoAnalysis.analysis })];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Erreur génération GPT-4:', error_1);
                        throw new Error("\u00C9chec g\u00E9n\u00E9ration contenu GPT-4: ".concat(error_1.message));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Améliore le contenu avec Claude pour la finition SEO
     */
    ContentAIGenerator.prototype.enhanceContentWithClaude = function (baseContent, config) {
        return __awaiter(this, void 0, void 0, function () {
            var enhancementPrompt, enhancedContent, enhancedData, newSeoAnalysis, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enhancementPrompt = "Analyse et am\u00E9liore ce contenu SEO pour maximiser son potentiel de r\u00E9f\u00E9rencement :\n\n    CONTENU ACTUEL :\n    Titre: ".concat(baseContent.title, "\n    Meta: ").concat(baseContent.metaDescription, "\n    Score SEO actuel: ").concat(baseContent.seoScore, "/100\n    \n    CONTENU:\n    ").concat(baseContent.content, "\n    \n    ANALYSE DES MOTS-CL\u00C9S:\n    ").concat(JSON.stringify(baseContent.keywordAnalysis, null, 2), "\n    \n    OBJECTIFS D'AM\u00C9LIORATION :\n    1. Augmenter le score SEO \u00E0 90+\n    2. Am\u00E9liorer la densit\u00E9 des mots-cl\u00E9s sans sur-optimisation\n    3. Optimiser la structure des titres H1-H6\n    4. Enrichir le champ s\u00E9mantique\n    5. Am\u00E9liorer la lisibilit\u00E9 et l'engagement\n    \n    CONTRAINTES :\n    - Maintenir le ton ").concat(config.brand.tone, "\n    - Conserver la longueur actuelle (\u00B110%)\n    - Garder la pertinence pour l'audience cible\n    - Secteur : ").concat(config.sector, "\n    \n    Retourne le contenu am\u00E9lior\u00E9 au format JSON avec tous les champs originaux plus les am\u00E9liorations.");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.claude.generateContent(enhancementPrompt)];
                    case 2:
                        enhancedContent = _a.sent();
                        enhancedData = JSON.parse(enhancedContent);
                        return [4 /*yield*/, this.analyzeSEOContent(enhancedData.content, config.seoParams)];
                    case 3:
                        newSeoAnalysis = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, enhancedData), { seoScore: newSeoAnalysis.score, keywordAnalysis: newSeoAnalysis.analysis })];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Erreur amélioration Claude:', error_2);
                        return [2 /*return*/, baseContent]; // Retourne le contenu original en cas d'erreur
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Pipeline complet de génération de contenu
     */
    ContentAIGenerator.prototype.generateOptimizedContent = function (config, contentType, customPrompt) {
        return __awaiter(this, void 0, void 0, function () {
            var templates, template, baseContent, enhancedContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templates = this.sectorTemplates.get(config.sector);
                        if (!templates) {
                            throw new Error("Templates non trouv\u00E9s pour le secteur: ".concat(config.sector));
                        }
                        template = templates.find(function (t) { return t.type === contentType; });
                        if (!template) {
                            throw new Error("Template non trouv\u00E9 pour le type: ".concat(contentType));
                        }
                        // 2. Génération initiale avec GPT-4
                        console.log('🚀 Génération initiale avec GPT-4...');
                        return [4 /*yield*/, this.generateContentWithGPT4(template, config, customPrompt)];
                    case 1:
                        baseContent = _a.sent();
                        if (!(baseContent.seoScore < 85)) return [3 /*break*/, 3];
                        console.log('🔧 Amélioration avec Claude...');
                        return [4 /*yield*/, this.enhanceContentWithClaude(baseContent, config)];
                    case 2:
                        enhancedContent = _a.sent();
                        return [2 /*return*/, enhancedContent];
                    case 3: return [2 /*return*/, baseContent];
                }
            });
        });
    };
    /**
     * Génération de contenu en lot pour une campagne
     */
    ContentAIGenerator.prototype.generateContentBatch = function (config, contentTypes, batchOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var options, results, promises, resolvedContents, _i, contentTypes_1, type, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = __assign({ parallelProcessing: true, qualityThreshold: 85 }, batchOptions);
                        results = {};
                        if (!options.parallelProcessing) return [3 /*break*/, 2];
                        promises = contentTypes.map(function (type) { return __awaiter(_this, void 0, void 0, function () {
                            var content;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.generateOptimizedContent(config, type)];
                                    case 1:
                                        content = _a.sent();
                                        return [2 /*return*/, { type: type, content: content }];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        resolvedContents = _c.sent();
                        resolvedContents.forEach(function (_a) {
                            var type = _a.type, content = _a.content;
                            results[type] = content;
                        });
                        return [3 /*break*/, 6];
                    case 2:
                        _i = 0, contentTypes_1 = contentTypes;
                        _c.label = 3;
                    case 3:
                        if (!(_i < contentTypes_1.length)) return [3 /*break*/, 6];
                        type = contentTypes_1[_i];
                        console.log("\uD83D\uDCDD G\u00E9n\u00E9ration ".concat(type, "..."));
                        _a = results;
                        _b = type;
                        return [4 /*yield*/, this.generateOptimizedContent(config, type)];
                    case 4:
                        _a[_b] = _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Analyse SEO du contenu généré
     */
    ContentAIGenerator.prototype.analyzeSEOContent = function (content, seoParams) {
        return __awaiter(this, void 0, void 0, function () {
            var words, totalWords, keywordAnalysis, score, avgDensity;
            return __generator(this, function (_a) {
                words = content.toLowerCase().split(/\s+/);
                totalWords = words.length;
                keywordAnalysis = {
                    density: {},
                    placement: {},
                    suggestions: []
                };
                // Analyse de densité des mots-clés
                __spreadArray(__spreadArray([], seoParams.primaryKeywords, true), seoParams.secondaryKeywords, true).forEach(function (keyword) {
                    var keywordCount = content.toLowerCase().split(keyword.toLowerCase()).length - 1;
                    var density = keywordCount / totalWords;
                    keywordAnalysis.density[keyword] = parseFloat((density * 100).toFixed(2));
                    // Placement des mots-clés
                    var placements = [];
                    if (content.toLowerCase().includes(keyword.toLowerCase())) {
                        if (content.substring(0, 200).toLowerCase().includes(keyword.toLowerCase())) {
                            placements.push('introduction');
                        }
                        if (content.substring(content.length - 200).toLowerCase().includes(keyword.toLowerCase())) {
                            placements.push('conclusion');
                        }
                        placements.push('body');
                    }
                    keywordAnalysis.placement[keyword] = placements;
                });
                score = 70;
                avgDensity = Object.values(keywordAnalysis.density).reduce(function (a, b) { return a + b; }, 0) / Object.keys(keywordAnalysis.density).length;
                if (avgDensity >= 1 && avgDensity <= 3)
                    score += 15;
                else if (avgDensity > 0.5 && avgDensity < 4)
                    score += 10;
                // Bonus pour longueur appropriée
                if (totalWords >= 300 && totalWords <= 2000)
                    score += 10;
                // Bonus pour structure (présence de titres H2, H3)
                if (content.includes('##') || content.includes('###'))
                    score += 5;
                return [2 /*return*/, {
                        score: Math.min(score, 100),
                        analysis: keywordAnalysis
                    }];
            });
        });
    };
    /**
     * Contexte spécifique par secteur
     */
    ContentAIGenerator.prototype.getSectorContext = function (sector) {
        var contexts = {
            restaurant: "Context gastronomique :\n        - Mets l'accent sur l'exp\u00E9rience culinaire et l'ambiance\n        - Int\u00E8gre des \u00E9l\u00E9ments sensoriels (go\u00FBt, ar\u00F4me, pr\u00E9sentation)\n        - Mentionne l'expertise du chef et l'origine des produits\n        - Cr\u00E9e un sentiment d'urgence pour les r\u00E9servations",
            ecommerce: "Context e-commerce :\n        - Focus sur les b\u00E9n\u00E9fices produits et la satisfaction client\n        - Int\u00E8gre des \u00E9l\u00E9ments de r\u00E9assurance (garantie, livraison)\n        - Utilise un langage persuasif et orient\u00E9 conversion\n        - Mentionne les avis clients et preuves sociales",
            saas: "Context SaaS :\n        - Met l'accent sur la valeur m\u00E9tier et le ROI\n        - Utilise un langage technique mais accessible\n        - Int\u00E8gre des cas d'usage concrets et m\u00E9triques\n        - Focus sur l'efficacit\u00E9 et la scalabilit\u00E9"
        };
        return contexts[sector] || 'Context général business.';
    };
    /**
     * Templates prédéfinis par secteur
     */
    ContentAIGenerator.prototype.getSectorTemplates = function (sector) {
        return this.sectorTemplates.get(sector) || [];
    };
    /**
     * Génération de meta descriptions optimisées
     */
    ContentAIGenerator.prototype.generateMetaDescriptions = function (titles, keywords, businessName) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt, response, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prompt = "G\u00E9n\u00E8re des meta descriptions optimis\u00E9es SEO (150-160 caract\u00E8res) pour ces titres :\n    \n    Titres : ".concat(titles.join(', '), "\n    Mots-cl\u00E9s \u00E0 int\u00E9grer : ").concat(keywords.join(', '), "\n    Nom de l'entreprise : ").concat(businessName, "\n    \n    Exigences :\n    - 150-160 caract\u00E8res exactement\n    - Inclure un appel \u00E0 l'action\n    - Int\u00E9grer naturellement 1-2 mots-cl\u00E9s\n    - Ton engageant et descriptif\n    \n    Retourne un tableau JSON de meta descriptions.");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: 'gpt-4-turbo-preview',
                                messages: [{ role: 'user', content: prompt }],
                                temperature: 0.7,
                                response_format: { type: 'json_object' }
                            })];
                    case 2:
                        response = _a.sent();
                        result = JSON.parse(response.choices[0].message.content);
                        return [2 /*return*/, result.metaDescriptions || []];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Erreur génération meta descriptions:', error_3);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ContentAIGenerator;
}());
exports.ContentAIGenerator = ContentAIGenerator;
// Configuration par défaut
exports.defaultContentConfig = {
    sector: 'restaurant',
    targetAudience: ['food lovers', 'couples', 'business professionals'],
    brand: {
        name: 'Le Gourmet',
        tone: 'luxury',
        values: ['excellence', 'tradition', 'innovation']
    },
    seoParams: {
        primaryKeywords: ['restaurant gastronomique paris', 'cuisine française étoilée'],
        secondaryKeywords: ['chef étoilé', 'restaurant michelin', 'gastronomie française'],
        targetLanguage: 'fr',
        geoLocation: 'Paris, France'
    }
};
// Export instance configurée
exports.default = new ContentAIGenerator(process.env.OPENAI_API_KEY, process.env.CLAUDE_API_KEY);
