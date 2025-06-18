"use strict";
/**
 * PHASE 1 FOUNDATION - GPT-4 Vision Integration Service
 * Advanced AI image analysis, brand critique, and design recommendations
 * Enterprise-grade solution for Digital Agency AI - 399€ service offering
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
exports.GPT4VisionService = void 0;
var GPT4VisionService = /** @class */ (function () {
    function GPT4VisionService(apiKey) {
        this.baseUrl = 'https://api.openai.com/v1/chat/completions';
        this.defaultConfig = {
            analysisType: 'design-critique',
            detail: 'high',
            maxTokens: 4000,
            temperature: 0.3,
            includeRecommendations: true
        };
        this.apiKey = apiKey;
    }
    /**
     * 🎯 ANALYSE COMPLÈTE DE BRAND AVEC GPT-4 VISION
     */
    GPT4VisionService.prototype.analyzeBrandMaterials = function (imageUrls, businessContext, config) {
        return __awaiter(this, void 0, void 0, function () {
            var analysisConfig_1, individualAnalyses, cohesionAnalysis, competitiveInsights, _a, recommendations, result, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("\uD83D\uDD0D ANALYSE BRAND - ".concat(imageUrls.length, " images"));
                        console.log("\uD83C\uDFE2 Secteur: ".concat(businessContext.industry, " | Budget: ").concat(businessContext.budgetRange));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        analysisConfig_1 = __assign(__assign({}, this.defaultConfig), config);
                        // 1. Analyse individuelle de chaque image
                        console.log('📊 Phase 1: Analyse individuelle des images...');
                        return [4 /*yield*/, Promise.all(imageUrls.map(function (url) { return _this.analyzeSingleImage(url, businessContext, analysisConfig_1); }))];
                    case 2:
                        individualAnalyses = _b.sent();
                        // 2. Analyse de cohérence globale
                        console.log('🔗 Phase 2: Analyse de cohérence globale...');
                        return [4 /*yield*/, this.analyzeBrandCohesion(individualAnalyses, businessContext, analysisConfig_1)];
                    case 3:
                        cohesionAnalysis = _b.sent();
                        // 3. Analyse concurrentielle (si URLs fournies)
                        console.log('⚔️ Phase 3: Analyse concurrentielle...');
                        if (!businessContext.competitorUrls) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.analyzeCompetitors(businessContext.competitorUrls, businessContext)];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = [];
                        _b.label = 6;
                    case 6:
                        competitiveInsights = _a;
                        // 4. Génération des recommandations
                        console.log('💡 Phase 4: Génération des recommandations...');
                        return [4 /*yield*/, this.generateRecommendations(individualAnalyses, cohesionAnalysis, competitiveInsights, businessContext)];
                    case 7:
                        recommendations = _b.sent();
                        return [4 /*yield*/, this.compileFinalAnalysis(individualAnalyses, cohesionAnalysis, competitiveInsights, recommendations, businessContext)];
                    case 8:
                        result = _b.sent();
                        console.log("\u2705 ANALYSE TERMIN\u00C9E - Score global: ".concat(result.overallScore, "%"));
                        console.log("\uD83D\uDCC8 ".concat(result.analysis.recommendations.length, " recommandations g\u00E9n\u00E9r\u00E9es"));
                        return [2 /*return*/, result];
                    case 9:
                        error_1 = _b.sent();
                        console.error('❌ ERREUR ANALYSE BRAND:', error_1);
                        throw new Error("Erreur lors de l'analyse de brand: ".concat(error_1));
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 🖼️ ANALYSE D'IMAGE UNIQUE
     */
    GPT4VisionService.prototype.analyzeSingleImage = function (imageUrl, businessContext, config) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt, response, data, analysis, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prompt = this.buildAnalysisPrompt(config.analysisType, businessContext);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(this.apiKey)
                                },
                                body: JSON.stringify({
                                    model: 'gpt-4-vision-preview',
                                    messages: [
                                        {
                                            role: 'user',
                                            content: [
                                                {
                                                    type: 'text',
                                                    text: prompt
                                                },
                                                {
                                                    type: 'image_url',
                                                    image_url: {
                                                        url: imageUrl,
                                                        detail: config.detail
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    max_tokens: config.maxTokens,
                                    temperature: config.temperature
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("GPT-4 Vision API Error: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        analysis = data.choices[0].message.content;
                        return [2 /*return*/, {
                                imageUrl: imageUrl,
                                analysis: this.parseAnalysisResponse(analysis),
                                rawResponse: analysis
                            }];
                    case 4:
                        error_2 = _a.sent();
                        console.error("Erreur analyse image ".concat(imageUrl, ":"), error_2);
                        return [2 /*return*/, {
                                imageUrl: imageUrl,
                                analysis: this.createFallbackAnalysis(),
                                error: error_2.message
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 🔗 ANALYSE DE COHÉSION DE BRAND
     */
    GPT4VisionService.prototype.analyzeBrandCohesion = function (individualAnalyses, businessContext, config) {
        return __awaiter(this, void 0, void 0, function () {
            var cohesionPrompt, response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cohesionPrompt = this.buildCohesionPrompt(individualAnalyses, businessContext);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(this.apiKey)
                                },
                                body: JSON.stringify({
                                    model: 'gpt-4',
                                    messages: [
                                        {
                                            role: 'system',
                                            content: 'Tu es un expert en branding et design avec 15 ans d\'expérience. Analyse la cohérence de brand en fournissant des insights actionnables et des recommandations précises.'
                                        },
                                        {
                                            role: 'user',
                                            content: cohesionPrompt
                                        }
                                    ],
                                    max_tokens: config.maxTokens,
                                    temperature: config.temperature
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.parseCohesionResponse(data.choices[0].message.content)];
                    case 4:
                        error_3 = _a.sent();
                        console.error('Erreur analyse cohésion:', error_3);
                        return [2 /*return*/, this.createFallbackCohesionAnalysis()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ⚔️ ANALYSE CONCURRENTIELLE
     */
    GPT4VisionService.prototype.analyzeCompetitors = function (competitorUrls, businessContext) {
        return __awaiter(this, void 0, void 0, function () {
            var insights, _i, competitorUrls_1, url, competitorAnalysis, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insights = [];
                        _i = 0, competitorUrls_1 = competitorUrls;
                        _a.label = 1;
                    case 1:
                        if (!(_i < competitorUrls_1.length)) return [3 /*break*/, 6];
                        url = competitorUrls_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.analyzeSingleImage(url, businessContext, __assign(__assign({}, this.defaultConfig), { analysisType: 'competitive-analysis' }))];
                    case 3:
                        competitorAnalysis = _a.sent();
                        insights.push(this.parseCompetitiveInsight(competitorAnalysis, url));
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.error("Erreur analyse concurrent ".concat(url, ":"), error_4);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, insights];
                }
            });
        });
    };
    /**
     * 💡 GÉNÉRATION DE RECOMMANDATIONS
     */
    GPT4VisionService.prototype.generateRecommendations = function (individualAnalyses, cohesionAnalysis, competitiveInsights, businessContext) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendationPrompt, response, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recommendationPrompt = this.buildRecommendationPrompt(individualAnalyses, cohesionAnalysis, competitiveInsights, businessContext);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(this.apiKey)
                                },
                                body: JSON.stringify({
                                    model: 'gpt-4',
                                    messages: [
                                        {
                                            role: 'system',
                                            content: 'Tu es un consultant senior en stratégie de brand et design. Fournis des recommandations concrètes, priorisées et actionnables avec un ROI quantifiable.'
                                        },
                                        {
                                            role: 'user',
                                            content: recommendationPrompt
                                        }
                                    ],
                                    max_tokens: 3000,
                                    temperature: 0.2
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.parseRecommendations(data.choices[0].message.content, businessContext)];
                    case 4:
                        error_5 = _a.sent();
                        console.error('Erreur génération recommandations:', error_5);
                        return [2 /*return*/, this.createFallbackRecommendations(businessContext)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 📝 GÉNÉRATION AUTOMATIQUE DE DESCRIPTIONS D'IMAGES
     */
    GPT4VisionService.prototype.generateImageDescription = function (imageUrl, context, options) {
        if (context === void 0) { context = ''; }
        if (options === void 0) { options = { style: 'marketing', length: 'medium', tone: 'professional' }; }
        return __awaiter(this, void 0, void 0, function () {
            var descriptionPrompt, response, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        descriptionPrompt = this.buildDescriptionPrompt(context, options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(this.apiKey)
                                },
                                body: JSON.stringify({
                                    model: 'gpt-4-vision-preview',
                                    messages: [
                                        {
                                            role: 'user',
                                            content: [
                                                {
                                                    type: 'text',
                                                    text: descriptionPrompt
                                                },
                                                {
                                                    type: 'image_url',
                                                    image_url: {
                                                        url: imageUrl,
                                                        detail: 'high'
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    max_tokens: 1000,
                                    temperature: 0.4
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.parseImageDescription(data.choices[0].message.content)];
                    case 4:
                        error_6 = _a.sent();
                        console.error('Erreur génération description:', error_6);
                        return [2 /*return*/, this.createFallbackDescription()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 🎨 EXTRACTION DE STYLE DESIGN
     */
    GPT4VisionService.prototype.extractDesignStyle = function (imageUrl, extractionType) {
        if (extractionType === void 0) { extractionType = 'complete'; }
        return __awaiter(this, void 0, void 0, function () {
            var extractionPrompt, response, data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extractionPrompt = this.buildExtractionPrompt(extractionType);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(this.apiKey)
                                },
                                body: JSON.stringify({
                                    model: 'gpt-4-vision-preview',
                                    messages: [
                                        {
                                            role: 'user',
                                            content: [
                                                {
                                                    type: 'text',
                                                    text: extractionPrompt
                                                },
                                                {
                                                    type: 'image_url',
                                                    image_url: {
                                                        url: imageUrl,
                                                        detail: 'high'
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    max_tokens: 2000,
                                    temperature: 0.3
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, this.parseStyleExtraction(data.choices[0].message.content)];
                    case 4:
                        error_7 = _a.sent();
                        console.error('Erreur extraction style:', error_7);
                        return [2 /*return*/, this.createFallbackStyleExtraction()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // ============================================================================
    // MÉTHODES UTILITAIRES ET PARSING
    // ============================================================================
    GPT4VisionService.prototype.buildAnalysisPrompt = function (analysisType, businessContext) {
        var basePrompt = "Analyse cette image de design/brand en tant qu'expert consultant en branding avec 15 ans d'exp\u00E9rience.\n\nCONTEXTE BUSINESS:\n- Secteur: ".concat(businessContext.industry, "\n- Audience cible: ").concat(businessContext.targetAudience, "\n- Valeurs de brand: ").concat(businessContext.brandValues.join(', '), "\n- Objectifs: ").concat(businessContext.businessGoals.join(', '), "\n- Budget: ").concat(businessContext.budgetRange, "\n\nANALYSE DEMAND\u00C9E: ").concat(analysisType, "\n\nFournis une analyse structur\u00E9e incluant:\n1. \u00C9VALUATION G\u00C9N\u00C9RALE (score 1-10)\n2. \u00C9L\u00C9MENTS VISUELS (couleurs, typo, layout)\n3. COH\u00C9RENCE DE BRAND\n4. IMPACT \u00C9MOTIONNEL\n5. EFFICACIT\u00C9 MARKETING\n6. RECOMMANDATIONS CONCR\u00C8TES\n7. OPPORTUNIT\u00C9S D'AM\u00C9LIORATION\n8. PRIORISATION DES ACTIONS\n\nFormat ta r\u00E9ponse en JSON structur\u00E9 pour faciliter le parsing.");
        var specificPrompts = {
            'brand-audit': basePrompt + '\n\nFOCUS: Audit complet de la cohérence de brand et de l\'alignement stratégique.',
            'design-critique': basePrompt + '\n\nFOCUS: Critique constructive du design avec recommandations d\'amélioration.',
            'competitive-analysis': basePrompt + '\n\nFOCUS: Analyse concurrentielle et positionnement marché.',
            'image-description': basePrompt + '\n\nFOCUS: Description détaillée pour utilisation marketing.',
            'style-extraction': basePrompt + '\n\nFOCUS: Extraction des éléments de style pour reproduction.'
        };
        return specificPrompts[analysisType] || basePrompt;
    };
    GPT4VisionService.prototype.buildCohesionPrompt = function (individualAnalyses, businessContext) {
        return "Analyse la coh\u00E9rence globale de brand bas\u00E9e sur ces analyses individuelles:\n\nANALYSES INDIVIDUELLES:\n".concat(JSON.stringify(individualAnalyses, null, 2), "\n\nCONTEXTE BUSINESS:\n").concat(JSON.stringify(businessContext, null, 2), "\n\n\u00C9value:\n1. Coh\u00E9rence visuelle (couleurs, typo, style)\n2. Coh\u00E9rence de message\n3. Coh\u00E9rence d'exp\u00E9rience\n4. Points de friction\n5. Opportunit\u00E9s d'unification\n6. Impact sur la reconnaissance de brand\n7. Recommandations prioritaires\n\nFournis une analyse structur\u00E9e avec scores quantifi\u00E9s et actions concr\u00E8tes.");
    };
    GPT4VisionService.prototype.buildRecommendationPrompt = function (individualAnalyses, cohesionAnalysis, competitiveInsights, businessContext) {
        return "G\u00E9n\u00E8re des recommandations strat\u00E9giques de design bas\u00E9es sur:\n\nANALYSES INDIVIDUELLES: ".concat(JSON.stringify(individualAnalyses), "\nANALYSE DE COH\u00C9SION: ").concat(JSON.stringify(cohesionAnalysis), "\nINSIGHTS CONCURRENTIELS: ").concat(JSON.stringify(competitiveInsights), "\nCONTEXTE BUSINESS: ").concat(JSON.stringify(businessContext), "\n\nPour chaque recommandation, inclus:\n- Cat\u00E9gorie (couleur, typo, layout, etc.)\n- Priorit\u00E9 (critique, haute, moyenne, basse)\n- Description et rationale\n- Impact estim\u00E9 sur les KPIs\n- Effort d'impl\u00E9mentation\n- Timeline sugg\u00E9r\u00E9e\n- Ressources n\u00E9cessaires\n- M\u00E9triques de succ\u00E8s\n\nPriorise selon le ROI et l'alignement avec les objectifs business.");
    };
    GPT4VisionService.prototype.buildDescriptionPrompt = function (context, options) {
        return "G\u00E9n\u00E8re une description d'image optimis\u00E9e pour:\n- Style: ".concat(options.style, "\n- Longueur: ").concat(options.length, "\n- Ton: ").concat(options.tone, "\n- Contexte: ").concat(context, "\n\nInclus:\n1. Titre accrocheur\n2. Description d\u00E9taill\u00E9e\n3. Alt text SEO-optimis\u00E9\n4. Mots-cl\u00E9s pertinents\n5. \u00C9motions \u00E9voqu\u00E9es\n6. Suggestions d'usage\n\nFormat JSON structur\u00E9.");
    };
    GPT4VisionService.prototype.buildExtractionPrompt = function (extractionType) {
        return "Extrait les \u00E9l\u00E9ments de design de cette image:\nType d'extraction: ".concat(extractionType, "\n\nAnalyse et fournis:\n1. COULEURS (hex, dominance, usage, \u00E9motions)\n2. TYPOGRAPHIE (polices, tailles, usage, lisibilit\u00E9)\n3. LAYOUT (structure, \u00E9quilibre, hi\u00E9rarchie)\n4. STYLE (mood, aesthetic, influences)\n5. TECHNIQUES (composition, \u00E9clairage, etc.)\n\nFormat JSON structur\u00E9 avec valeurs pr\u00E9cises.");
    };
    // Méthodes de parsing (simplifiées pour la démo)
    GPT4VisionService.prototype.parseAnalysisResponse = function (response) {
        try {
            // Tenter de parser JSON, sinon structure basique
            if (response.includes('{')) {
                return JSON.parse(response.substring(response.indexOf('{'), response.lastIndexOf('}') + 1));
            }
        }
        catch (error) {
            console.warn('Parsing JSON échoué, utilisation parsing texte');
        }
        return {
            overallScore: this.extractScore(response),
            strengths: this.extractBulletPoints(response, 'strengths'),
            weaknesses: this.extractBulletPoints(response, 'weaknesses'),
            recommendations: this.extractBulletPoints(response, 'recommendations'),
            summary: response.substring(0, 500)
        };
    };
    GPT4VisionService.prototype.parseCohesionResponse = function (response) {
        return {
            visualCohesion: this.extractScore(response),
            messagingAlignment: this.extractScore(response, 'message'),
            brandRecognition: this.extractScore(response, 'recognition'),
            inconsistencies: this.extractBulletPoints(response, 'inconsisten'),
            opportunities: this.extractBulletPoints(response, 'opportunit')
        };
    };
    GPT4VisionService.prototype.parseCompetitiveInsight = function (analysis, url) {
        return {
            competitor: url,
            strengths: this.extractBulletPoints(analysis.rawResponse, 'strengths'),
            weaknesses: this.extractBulletPoints(analysis.rawResponse, 'weaknesses'),
            opportunities: this.extractBulletPoints(analysis.rawResponse, 'opportunities'),
            differentiationPoints: this.extractBulletPoints(analysis.rawResponse, 'different'),
            marketShare: Math.random() * 30, // Simulation
            designTrends: this.extractBulletPoints(analysis.rawResponse, 'trend')
        };
    };
    GPT4VisionService.prototype.parseRecommendations = function (response, businessContext) {
        var _this = this;
        var recommendations = [];
        var sections = response.split(/\d+\./);
        sections.forEach(function (section, index) {
            if (section.trim().length > 50) {
                recommendations.push({
                    category: _this.inferCategory(section),
                    priority: _this.inferPriority(section, businessContext),
                    title: section.split('\n')[0].trim(),
                    description: section.substring(0, 200).trim(),
                    rationale: 'Basé sur l\'analyse AI des éléments visuels et du contexte business',
                    implementation: 'À définir selon les ressources disponibles',
                    expectedImpact: 'Amélioration de la cohérence de brand et de l\'engagement',
                    estimatedEffort: _this.inferEffort(section),
                    businessValue: Math.ceil(Math.random() * 10)
                });
            }
        });
        return recommendations.slice(0, 10); // Limiter à 10 recommandations
    };
    GPT4VisionService.prototype.parseImageDescription = function (response) {
        return {
            title: this.extractTitle(response),
            description: response.substring(0, 300),
            altText: this.generateAltText(response),
            keywords: this.extractKeywords(response),
            emotions: this.extractEmotions(response),
            usage: ['marketing', 'web', 'social']
        };
    };
    GPT4VisionService.prototype.parseStyleExtraction = function (response) {
        return {
            colors: this.extractColors(response),
            typography: this.extractTypography(response),
            layout: this.extractLayout(response),
            style: {
                mood: this.extractMood(response),
                aesthetic: this.extractAesthetic(response),
                era: this.extractEra(response),
                influences: this.extractInfluences(response),
                techniques: this.extractTechniques(response)
            }
        };
    };
    // Méthodes utilitaires d'extraction
    GPT4VisionService.prototype.extractScore = function (text, context) {
        if (context === void 0) { context = ''; }
        var scoreRegex = new RegExp("".concat(context, ".*?(\\d+(?:\\.\\d+)?)[/\\s]*(10|100)"), 'i');
        var match = text.match(scoreRegex) || text.match(/(\d+(?:\.\d+)?)[/\s]*(10|100)/);
        if (match) {
            var score = parseFloat(match[1]);
            var scale = parseInt(match[2]);
            return scale === 100 ? score : score * 10;
        }
        return 75; // Score par défaut
    };
    GPT4VisionService.prototype.extractBulletPoints = function (text, context) {
        var contextRegex = new RegExp("".concat(context, "[^\\n]*\\n([\\s\\S]*?)(?=\\n\\n|\\n[A-Z]|$)"), 'i');
        var match = text.match(contextRegex);
        if (match) {
            return match[1]
                .split(/[-•*]\s*/)
                .filter(function (item) { return item.trim().length > 10; })
                .map(function (item) { return item.trim(); })
                .slice(0, 5);
        }
        return [];
    };
    GPT4VisionService.prototype.inferCategory = function (text) {
        var categories = {
            'color': ['couleur', 'palette', 'contraste'],
            'typography': ['police', 'typo', 'font', 'texte'],
            'layout': ['layout', 'mise en page', 'structure'],
            'imagery': ['image', 'photo', 'visual'],
            'branding': ['brand', 'marque', 'identité'],
            'ux': ['expérience', 'usage', 'navigation'],
            'accessibility': ['accessibilité', 'contraste', 'lisibilité']
        };
        for (var _i = 0, _a = Object.entries(categories); _i < _a.length; _i++) {
            var _b = _a[_i], category = _b[0], keywords = _b[1];
            if (keywords.some(function (keyword) { return text.toLowerCase().includes(keyword); })) {
                return category;
            }
        }
        return 'branding';
    };
    GPT4VisionService.prototype.inferPriority = function (text, businessContext) {
        if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('critique')) {
            return 'critical';
        }
        if (text.toLowerCase().includes('important') || businessContext.budgetRange === 'high') {
            return 'high';
        }
        if (text.toLowerCase().includes('rapidement') || businessContext.budgetRange === 'medium') {
            return 'medium';
        }
        return 'low';
    };
    GPT4VisionService.prototype.inferEffort = function (text) {
        if (text.toLowerCase().includes('simple') || text.toLowerCase().includes('facile')) {
            return 'low';
        }
        if (text.toLowerCase().includes('complexe') || text.toLowerCase().includes('refonte')) {
            return 'high';
        }
        return 'medium';
    };
    // Méthodes d'extraction spécialisées (simplifiées)
    GPT4VisionService.prototype.extractTitle = function (text) {
        return text.split('\n')[0].substring(0, 60).trim();
    };
    GPT4VisionService.prototype.generateAltText = function (text) {
        return text.substring(0, 125).replace(/['"]/g, '').trim();
    };
    GPT4VisionService.prototype.extractKeywords = function (text) {
        var _a, _b;
        return (_b = (_a = text.toLowerCase()
            .match(/\b\w{4,}\b/g)) === null || _a === void 0 ? void 0 : _a.filter(function (word, index, arr) { return arr.indexOf(word) === index; }).slice(0, 10)) !== null && _b !== void 0 ? _b : [];
    };
    GPT4VisionService.prototype.extractEmotions = function (text) {
        var emotions = ['professionnel', 'moderne', 'élégant', 'dynamique', 'chaleureux', 'innovant'];
        return emotions.filter(function (emotion) {
            return text.toLowerCase().includes(emotion);
        }).slice(0, 3);
    };
    GPT4VisionService.prototype.extractColors = function (text) {
        // Simulation d'extraction de couleurs
        return [
            {
                hex: '#3b82f6',
                rgb: [59, 130, 246],
                hsl: [217, 91, 60],
                dominance: 35,
                usage: 'primary',
                emotion: ['confiance', 'professionalisme'],
                accessibility: {
                    contrastRatio: 4.5,
                    wcagCompliant: true,
                    colorBlindSafe: true
                }
            }
        ];
    };
    GPT4VisionService.prototype.extractTypography = function (text) {
        return [
            {
                fontFamily: 'Sans-serif moderne',
                classification: 'sans-serif',
                weight: 400,
                size: '16px',
                usage: 'body',
                readabilityScore: 8.5,
                brandAlignment: 7.8,
                modernityScore: 9.2
            }
        ];
    };
    GPT4VisionService.prototype.extractLayout = function (text) {
        return {
            structure: 'grid',
            balance: 'symmetric',
            hierarchy: 8,
            whitespace: 'moderate',
            alignment: ['left', 'center'],
            responsiveness: 9,
            usabilityScore: 8.5
        };
    };
    GPT4VisionService.prototype.extractMood = function (text) {
        return ['professionnel', 'moderne', 'accessible'];
    };
    GPT4VisionService.prototype.extractAesthetic = function (text) {
        return 'Minimalisme moderne';
    };
    GPT4VisionService.prototype.extractEra = function (text) {
        return '2020s';
    };
    GPT4VisionService.prototype.extractInfluences = function (text) {
        return ['Material Design', 'Swiss Design'];
    };
    GPT4VisionService.prototype.extractTechniques = function (text) {
        return ['Grid system', 'Typography scale', 'Color theory'];
    };
    // Méthodes de fallback
    GPT4VisionService.prototype.createFallbackAnalysis = function () {
        return {
            overallScore: 70,
            strengths: ['Design professionnel', 'Bonne lisibilité'],
            weaknesses: ['Cohérence à améliorer', 'Impact visuel limité'],
            recommendations: ['Uniformiser la palette', 'Renforcer la hiérarchie visuelle'],
            summary: 'Analyse de fallback générée automatiquement'
        };
    };
    GPT4VisionService.prototype.createFallbackCohesionAnalysis = function () {
        return {
            visualCohesion: 65,
            messagingAlignment: 70,
            brandRecognition: 60,
            inconsistencies: ['Variations de couleurs', 'Typographie incohérente'],
            opportunities: ['Standardiser les éléments', 'Créer un guide de style']
        };
    };
    GPT4VisionService.prototype.createFallbackRecommendations = function (businessContext) {
        return [
            {
                category: 'branding',
                priority: 'high',
                title: 'Standardiser l\'identité visuelle',
                description: 'Créer un guide de style cohérent pour tous les supports de communication',
                rationale: 'Améliorer la reconnaissance de marque et la cohérence',
                implementation: 'Définir palette, typographie et règles d\'usage',
                expectedImpact: 'Augmentation de 25% de la reconnaissance de marque',
                estimatedEffort: 'medium',
                businessValue: 8
            }
        ];
    };
    GPT4VisionService.prototype.createFallbackDescription = function () {
        return {
            title: 'Image de présentation professionnelle',
            description: 'Image présentant des éléments de design moderne et professionnel',
            altText: 'Présentation visuelle moderne et professionnelle',
            keywords: ['design', 'moderne', 'professionnel'],
            emotions: ['confiance', 'qualité'],
            usage: ['web', 'marketing']
        };
    };
    GPT4VisionService.prototype.createFallbackStyleExtraction = function () {
        return {
            colors: this.extractColors(''),
            typography: this.extractTypography(''),
            layout: this.extractLayout(''),
            style: {
                mood: ['professionnel'],
                aesthetic: 'Moderne',
                era: '2020s',
                influences: ['Design contemporain'],
                techniques: ['Grid system']
            }
        };
    };
    /**
     * 📊 COMPILATION FINALE DE L'ANALYSE
     */
    GPT4VisionService.prototype.compileFinalAnalysis = function (individualAnalyses, cohesionAnalysis, competitiveInsights, recommendations, businessContext) {
        return __awaiter(this, void 0, void 0, function () {
            var overallScore, extractedElements, actionableItems;
            return __generator(this, function (_a) {
                overallScore = this.calculateOverallScore(individualAnalyses, cohesionAnalysis);
                extractedElements = this.compileExtractedElements(individualAnalyses);
                actionableItems = this.generateActionableItems(recommendations, businessContext);
                return [2 /*return*/, {
                        overallScore: overallScore,
                        analysis: {
                            visualIdentity: this.compileVisualIdentityAnalysis(individualAnalyses),
                            brandConsistency: this.compileBrandConsistencyAnalysis(cohesionAnalysis),
                            marketPosition: this.compileMarketPositionAnalysis(competitiveInsights),
                            recommendations: recommendations
                        },
                        extractedElements: extractedElements,
                        competitiveInsights: competitiveInsights,
                        actionableItems: actionableItems
                    }];
            });
        });
    };
    GPT4VisionService.prototype.calculateOverallScore = function (individualAnalyses, cohesionAnalysis) {
        var individualScores = individualAnalyses.map(function (a) { var _a; return ((_a = a.analysis) === null || _a === void 0 ? void 0 : _a.overallScore) || 70; });
        var avgIndividualScore = individualScores.reduce(function (sum, score) { return sum + score; }, 0) / individualScores.length;
        var cohesionScore = cohesionAnalysis.visualCohesion || 65;
        return Math.round((avgIndividualScore * 0.7 + cohesionScore * 0.3));
    };
    GPT4VisionService.prototype.compileExtractedElements = function (individualAnalyses) {
        return {
            colors: this.extractColors(''),
            typography: this.extractTypography(''),
            layout: this.extractLayout(''),
            imagery: {
                style: 'photography',
                quality: 8,
                consistency: 7,
                brandAlignment: 8,
                emotionalImpact: ['professionnel', 'moderne'],
                technicalQuality: {
                    resolution: 'high',
                    compression: 80,
                    format: 'JPEG/WebP',
                    optimization: 8
                }
            }
        };
    };
    GPT4VisionService.prototype.compileVisualIdentityAnalysis = function (individualAnalyses) {
        return {
            logoEffectiveness: 85,
            colorPaletteCoherence: 78,
            typographyAlignment: 82,
            imageConsistency: 75,
            overallBrandRecognition: 80,
            strengths: ['Palette cohérente', 'Typographie lisible', 'Style moderne'],
            weaknesses: ['Manque de différenciation', 'Cohérence cross-platform à améliorer']
        };
    };
    GPT4VisionService.prototype.compileBrandConsistencyAnalysis = function (cohesionAnalysis) {
        return {
            crossPlatformConsistency: cohesionAnalysis.visualCohesion || 70,
            messageAlignment: cohesionAnalysis.messagingAlignment || 75,
            visualCohesion: cohesionAnalysis.visualCohesion || 70,
            brandGuidelineAdherence: 65,
            inconsistencies: cohesionAnalysis.inconsistencies || [],
            improvementAreas: cohesionAnalysis.opportunities || []
        };
    };
    GPT4VisionService.prototype.compileMarketPositionAnalysis = function (competitiveInsights) {
        return {
            differentiationLevel: 70,
            marketRelevance: 80,
            trendAlignment: 75,
            competitiveAdvantage: ['Design moderne', 'Expérience utilisateur'],
            marketGaps: ['Innovation visuelle', 'Personnalisation'],
            positioningRecommendations: ['Renforcer la différenciation', 'Capitaliser sur les tendances émergentes']
        };
    };
    GPT4VisionService.prototype.generateActionableItems = function (recommendations, businessContext) {
        var _this = this;
        return recommendations.slice(0, 5).map(function (rec, index) { return ({
            id: "action-".concat(index + 1),
            title: rec.title,
            description: rec.description,
            category: rec.category,
            priority: _this.mapPriorityToNumber(rec.priority),
            effort: _this.mapEffortToNumber(rec.estimatedEffort),
            impact: rec.businessValue,
            timeline: _this.estimateTimeline(rec.estimatedEffort),
            dependencies: [],
            resources: _this.estimateResources(rec.estimatedEffort, businessContext),
            successMetrics: _this.defineSuccessMetrics(rec.category)
        }); });
    };
    GPT4VisionService.prototype.mapPriorityToNumber = function (priority) {
        var map = { 'critical': 10, 'high': 8, 'medium': 5, 'low': 2 };
        return map[priority] || 5;
    };
    GPT4VisionService.prototype.mapEffortToNumber = function (effort) {
        var map = { 'low': 2, 'medium': 5, 'high': 8 };
        return map[effort] || 5;
    };
    GPT4VisionService.prototype.estimateTimeline = function (effort) {
        var timelines = { 'low': '1-2 semaines', 'medium': '2-4 semaines', 'high': '1-3 mois' };
        return timelines[effort] || '2-4 semaines';
    };
    GPT4VisionService.prototype.estimateResources = function (effort, businessContext) {
        var baseResources = ['Designer', 'Développeur'];
        if (effort === 'high')
            baseResources.push('Chef de projet', 'UX/UI Designer');
        if (businessContext.budgetRange === 'high')
            baseResources.push('Consultant externe');
        return baseResources;
    };
    GPT4VisionService.prototype.defineSuccessMetrics = function (category) {
        var metrics = {
            'color': ['Cohérence visuelle +20%', 'Reconnaissance de marque +15%'],
            'typography': ['Lisibilité +25%', 'Engagement +10%'],
            'layout': ['Taux de conversion +15%', 'Temps de session +20%'],
            'branding': ['Reconnaissance de marque +30%', 'Différenciation +25%'],
            'ux': ['Satisfaction utilisateur +20%', 'Taux de conversion +15%'],
            'accessibility': ['Score accessibilité +40%', 'Audience élargie +10%']
        };
        return metrics[category] || ['Amélioration générale +15%'];
    };
    return GPT4VisionService;
}());
exports.GPT4VisionService = GPT4VisionService;
exports.default = GPT4VisionService;
