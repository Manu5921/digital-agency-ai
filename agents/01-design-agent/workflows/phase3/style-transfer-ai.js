"use strict";
/**
 * PHASE 3 - Style Transfer Engine AI
 * Module d'automatisation avancée pour l'adaptation de styles avec IA
 * Analyse automatique des brandbooks et transfer learning pour designs cohérents
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
exports.StyleTransferFactory = exports.StylePerformanceOptimizer = exports.AccessibilityChecker = exports.TypographyMatcher = exports.ColorHarmonyEngine = exports.StyleTransferEngine = exports.BrandAnalysisEngine = void 0;
// ============================================================================
// BRAND ANALYSIS ENGINE
// ============================================================================
var BrandAnalysisEngine = /** @class */ (function () {
    function BrandAnalysisEngine() {
        this.industryPatterns = new Map();
        this.colorPsychology = new Map();
        this.typographyMapping = new Map();
        this.initializeKnowledgeBase();
    }
    /**
     * Analyse automatique d'une identité de marque
     */
    BrandAnalysisEngine.prototype.analyzeBrandIdentity = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var industryAnalysis, colorAnalysis, personalityAnalysis, audienceAnalysis, competitorAnalysis, brandIdentity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD0D Analyse de marque: ".concat(input.brandName, " dans ").concat(input.industry));
                        industryAnalysis = this.analyzeIndustry(input.industry);
                        return [4 /*yield*/, this.extractBrandColors(input.existingColors, input.logo)];
                    case 1:
                        colorAnalysis = _a.sent();
                        personalityAnalysis = this.inferBrandPersonality(input.brandValues || [], input.industry, colorAnalysis.dominant);
                        audienceAnalysis = this.inferTargetAudience(input.industry, personalityAnalysis);
                        return [4 /*yield*/, this.analyzeCompetitors(input.industry, input.brandName)];
                    case 2:
                        competitorAnalysis = _a.sent();
                        brandIdentity = {
                            name: input.brandName,
                            industry: input.industry,
                            values: input.brandValues || industryAnalysis.commonValues,
                            personality: personalityAnalysis,
                            visualElements: {
                                logo: input.logo,
                                primaryColors: colorAnalysis.primary,
                                secondaryColors: colorAnalysis.secondary,
                                fonts: this.inferTypography(personalityAnalysis, input.industry),
                                imagery: this.inferImageryStyle(personalityAnalysis, input.industry),
                                iconography: this.inferIconStyle(personalityAnalysis)
                            },
                            competitors: competitorAnalysis.direct,
                            targetAudience: audienceAnalysis
                        };
                        console.log("\u2705 Analyse termin\u00E9e. Personnalit\u00E9: ".concat(personalityAnalysis.primary));
                        return [2 /*return*/, brandIdentity];
                }
            });
        });
    };
    /**
     * Analyse de l'industrie pour identifier les patterns visuels
     */
    BrandAnalysisEngine.prototype.analyzeIndustry = function (industry) {
        var patterns = this.industryPatterns.get(industry.toLowerCase()) || {
            commonColors: ['#3b82f6', '#64748b'],
            commonValues: ['innovation', 'qualité', 'service'],
            visualTrends: ['moderne', 'professionnel'],
            communicationStyle: 'professionnel'
        };
        // Patterns spécifiques par industrie
        switch (industry.toLowerCase()) {
            case 'santé':
            case 'healthcare':
                return {
                    commonColors: ['#10b981', '#3b82f6', '#ffffff'],
                    commonValues: ['confiance', 'soin', 'expertise', 'sécurité'],
                    visualTrends: ['propre', 'apaisant', 'professionnel'],
                    communicationStyle: 'rassurant'
                };
            case 'finance':
            case 'banque':
                return {
                    commonColors: ['#1e40af', '#059669', '#374151'],
                    commonValues: ['confiance', 'sécurité', 'stabilité', 'croissance'],
                    visualTrends: ['conservateur', 'solide', 'premium'],
                    communicationStyle: 'autoritaire'
                };
            case 'technologie':
            case 'tech':
                return {
                    commonColors: ['#6366f1', '#8b5cf6', '#06b6d4'],
                    commonValues: ['innovation', 'agilité', 'futur', 'efficacité'],
                    visualTrends: ['moderne', 'minimaliste', 'avant-gardiste'],
                    communicationStyle: 'innovant'
                };
            case 'éducation':
            case 'elearning':
                return {
                    commonColors: ['#f59e0b', '#3b82f6', '#10b981'],
                    commonValues: ['apprentissage', 'croissance', 'accessibilité', 'excellence'],
                    visualTrends: ['engageant', 'accessible', 'stimulant'],
                    communicationStyle: 'inspirant'
                };
            default:
                return patterns;
        }
    };
    /**
     * Extraction et analyse des couleurs de marque
     */
    BrandAnalysisEngine.prototype.extractBrandColors = function (existingColors, logo) {
        return __awaiter(this, void 0, void 0, function () {
            var extractedColors;
            return __generator(this, function (_a) {
                if (existingColors && existingColors.length > 0) {
                    return [2 /*return*/, {
                            primary: existingColors.slice(0, 2),
                            secondary: existingColors.slice(2, 5),
                            dominant: existingColors[0]
                        }];
                }
                // Si pas de couleurs fournies, génère des couleurs intelligentes
                // Simulation d'analyse d'image/logo avec IA
                if (logo) {
                    // Ici on simule l'extraction de couleurs depuis le logo
                    console.log('📸 Analyse des couleurs du logo...');
                    extractedColors = this.simulateLogoColorExtraction();
                    return [2 /*return*/, {
                            primary: extractedColors.slice(0, 2),
                            secondary: extractedColors.slice(2, 4),
                            dominant: extractedColors[0]
                        }];
                }
                // Couleurs par défaut basées sur la psychologie des couleurs
                return [2 /*return*/, {
                        primary: ['#3b82f6', '#1e40af'],
                        secondary: ['#64748b', '#94a3b8'],
                        dominant: '#3b82f6'
                    }];
            });
        });
    };
    /**
     * Inférence de la personnalité de marque
     */
    BrandAnalysisEngine.prototype.inferBrandPersonality = function (values, industry, dominantColor) {
        // Mapping couleur -> personnalité
        var colorPersonalityMap = {
            '#ff0000': 'bold',
            '#3b82f6': 'trustworthy',
            '#10b981': 'trustworthy',
            '#f59e0b': 'playful',
            '#8b5cf6': 'innovative',
            '#64748b': 'sophisticated'
        };
        // Mapping industrie -> traits
        var industryTraitsMap = {
            'santé': ['professional', 'trustworthy', 'accessible'],
            'finance': ['professional', 'trustworthy', 'sophisticated'],
            'tech': ['modern', 'innovative', 'sophisticated'],
            'éducation': ['friendly', 'accessible', 'professional']
        };
        var primary = colorPersonalityMap[dominantColor] || 'trustworthy';
        var traits = industryTraitsMap[industry.toLowerCase()] || ['modern', 'professional'];
        return {
            primary: primary,
            traits: traits,
            tone: industry.toLowerCase() === 'tech' ? 'conversational' : 'professional'
        };
    };
    /**
     * Inférence de l'audience cible
     */
    BrandAnalysisEngine.prototype.inferTargetAudience = function (industry, personality) {
        var baseProfile = {
            demographics: {
                ageRange: [25, 55],
                gender: 'mixed',
                income: 'medium',
                education: 'intermediate'
            },
            psychographics: {
                interests: ['qualité', 'service', 'innovation'],
                values: ['fiabilité', 'efficacité'],
                lifestyle: ['digital', 'busy'],
                painPoints: ['manque de temps', 'besoin de confiance']
            },
            digital: {
                devices: ['mobile', 'desktop'],
                platforms: ['web', 'mobile'],
                techSavvy: 'medium'
            }
        };
        // Ajustements par industrie
        switch (industry.toLowerCase()) {
            case 'santé':
                return __assign(__assign({}, baseProfile), { demographics: __assign(__assign({}, baseProfile.demographics), { ageRange: [30, 70] }), psychographics: __assign(__assign({}, baseProfile.psychographics), { interests: ['santé', 'bien-être', 'famille'], painPoints: ['préoccupations santé', 'besoin de confiance', 'accessibilité'] }) });
            case 'tech':
                return __assign(__assign({}, baseProfile), { demographics: __assign(__assign({}, baseProfile.demographics), { ageRange: [20, 45] }), digital: __assign(__assign({}, baseProfile.digital), { techSavvy: 'high' }), psychographics: __assign(__assign({}, baseProfile.psychographics), { interests: ['innovation', 'efficacité', 'technologie'], painPoints: ['complexité', 'rapidité', 'mise à jour'] }) });
            default:
                return baseProfile;
        }
    };
    /**
     * Analyse concurrentielle
     */
    BrandAnalysisEngine.prototype.analyzeCompetitors = function (industry, brandName) {
        return __awaiter(this, void 0, void 0, function () {
            var competitors, directCompetitors;
            return __generator(this, function (_a) {
                competitors = {
                    'santé': ['Doctolib', 'Qare', 'MonDocteur'],
                    'finance': ['Boursorama', 'Revolut', 'N26'],
                    'tech': ['Slack', 'Notion', 'Figma'],
                    'éducation': ['OpenClassrooms', 'Coursera', 'Udemy']
                };
                directCompetitors = competitors[industry.toLowerCase()] || [];
                return [2 /*return*/, {
                        direct: directCompetitors.filter(function (c) { return c.toLowerCase() !== brandName.toLowerCase(); }),
                        indirect: ['Google', 'Microsoft', 'Apple'], // Exemple
                        opportunities: ['différenciation visuelle', 'expérience utilisateur', 'innovation']
                    }];
            });
        });
    };
    /**
     * Méthodes utilitaires
     */
    BrandAnalysisEngine.prototype.simulateLogoColorExtraction = function () {
        // Simulation de l'extraction de couleurs depuis un logo
        var commonBrandColors = [
            '#3b82f6', '#1e40af', '#64748b', '#94a3b8', '#e2e8f0'
        ];
        return commonBrandColors;
    };
    BrandAnalysisEngine.prototype.inferTypography = function (personality, industry) {
        var fonts = [];
        // Font principale selon la personnalité
        switch (personality.primary) {
            case 'innovative':
                fonts.push({
                    family: 'Inter',
                    weight: [400, 500, 600, 700],
                    style: 'normal',
                    usage: 'heading',
                    fallbacks: ['system-ui', 'sans-serif']
                });
                break;
            case 'sophisticated':
                fonts.push({
                    family: 'Playfair Display',
                    weight: [400, 600, 700],
                    style: 'normal',
                    usage: 'heading',
                    fallbacks: ['serif']
                });
                break;
            default:
                fonts.push({
                    family: 'Inter',
                    weight: [400, 500, 600],
                    style: 'normal',
                    usage: 'heading',
                    fallbacks: ['system-ui', 'sans-serif']
                });
        }
        // Font de corps
        fonts.push({
            family: 'Inter',
            weight: [400, 500],
            style: 'normal',
            usage: 'body',
            fallbacks: ['system-ui', 'sans-serif']
        });
        return fonts;
    };
    BrandAnalysisEngine.prototype.inferImageryStyle = function (personality, industry) {
        var baseStyle = {
            style: 'photography',
            mood: 'neutral',
            subjects: ['people', 'product'],
            treatment: 'natural'
        };
        switch (industry.toLowerCase()) {
            case 'santé':
                return __assign(__assign({}, baseStyle), { mood: 'bright', subjects: ['people', 'healthcare', 'wellness'], treatment: 'natural' });
            case 'tech':
                return __assign(__assign({}, baseStyle), { style: 'mixed', mood: 'cool', subjects: ['technology', 'abstract', 'ui'], treatment: 'stylized' });
            default:
                return baseStyle;
        }
    };
    BrandAnalysisEngine.prototype.inferIconStyle = function (personality) {
        return {
            style: personality.primary === 'sophisticated' ? 'outline' : 'filled',
            weight: personality.traits.includes('modern') ? 'thin' : 'regular',
            corner: personality.traits.includes('friendly') ? 'rounded' : 'sharp',
            size: 'medium'
        };
    };
    BrandAnalysisEngine.prototype.initializeKnowledgeBase = function () {
        // Initialisation des bases de connaissances pour l'IA
        // Patterns d'industrie, psychologie des couleurs, etc.
        console.log('🧠 Initialisation de la base de connaissances IA...');
    };
    return BrandAnalysisEngine;
}());
exports.BrandAnalysisEngine = BrandAnalysisEngine;
// ============================================================================
// STYLE TRANSFER ENGINE
// ============================================================================
var StyleTransferEngine = /** @class */ (function () {
    function StyleTransferEngine() {
        this.brandAnalysis = new BrandAnalysisEngine();
        this.colorHarmonyEngine = new ColorHarmonyEngine();
        this.typographyMatcher = new TypographyMatcher();
        this.performanceOptimizer = new StylePerformanceOptimizer();
    }
    /**
     * Transfert de style automatique avec IA
     */
    StyleTransferEngine.prototype.transferStyle = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var brandAnalysis, colorHarmony, typography, spacing, components, animations, brandAlignment, alternatives, performanceMetrics, result, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("\uD83C\uDFA8 D\u00E9marrage du transfert de style pour ".concat(config.sourceBrand.name));
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, this.analyzeBrandForTransfer(config.sourceBrand)];
                    case 2:
                        brandAnalysis = _c.sent();
                        return [4 /*yield*/, this.generateColorHarmony(config)];
                    case 3:
                        colorHarmony = _c.sent();
                        return [4 /*yield*/, this.adaptTypography(config)];
                    case 4:
                        typography = _c.sent();
                        spacing = this.generateSpacingScale(config);
                        return [4 /*yield*/, this.generateComponentLibrary(config, colorHarmony, typography)];
                    case 5:
                        components = _c.sent();
                        animations = this.generateAnimationLibrary(config);
                        return [4 /*yield*/, this.calculateBrandAlignment(config, {
                                colors: colorHarmony,
                                typography: typography,
                                spacing: spacing,
                                components: components,
                                animations: animations
                            })];
                    case 6:
                        brandAlignment = _c.sent();
                        return [4 /*yield*/, this.generateAlternatives(config, 3)];
                    case 7:
                        alternatives = _c.sent();
                        return [4 /*yield*/, this.optimizePerformance({
                                colors: colorHarmony,
                                typography: typography,
                                spacing: spacing,
                                components: components,
                                animations: animations
                            })];
                    case 8:
                        performanceMetrics = _c.sent();
                        _a = {
                            success: true,
                            transferredStyle: {
                                colors: colorHarmony,
                                typography: typography,
                                spacing: spacing,
                                components: components,
                                animations: animations
                            },
                            brandAlignment: brandAlignment
                        };
                        _b = {};
                        return [4 /*yield*/, this.trackChanges(config)];
                    case 9:
                        result = (_a.adaptationReport = (_b.changesApplied = _c.sent(),
                            _b.preservedElements = config.preserveElements,
                            _b.enhancedElements = config.enhanceElements,
                            _b.performanceImpact = performanceMetrics,
                            _b),
                            _a.aiConfidence = this.calculateAIConfidence(brandAlignment, performanceMetrics),
                            _a.alternatives = alternatives,
                            _a);
                        console.log("\u2705 Transfert termin\u00E9. Score d'alignement: ".concat(brandAlignment.score, "%"));
                        return [2 /*return*/, result];
                    case 10:
                        error_1 = _c.sent();
                        console.error('❌ Erreur lors du transfert de style:', error_1);
                        return [2 /*return*/, this.createFailureResult(config)];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Analyse de marque pour transfert
     */
    StyleTransferEngine.prototype.analyzeBrandForTransfer = function (brand) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        strengths: this.identifyBrandStrengths(brand),
                        opportunities: this.identifyBrandOpportunities(brand),
                        constraints: this.identifyBrandConstraints(brand),
                        flexibility: this.assessBrandFlexibility(brand)
                    }];
            });
        });
    };
    /**
     * Génération d'harmonies de couleurs avec psychologie
     */
    StyleTransferEngine.prototype.generateColorHarmony = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.colorHarmonyEngine.generateHarmony({
                        baseBrand: config.sourceBrand,
                        targetSector: config.targetSector,
                        adaptationLevel: config.adaptationLevel,
                        preserveColors: config.preserveElements.includes('colors')
                    })];
            });
        });
    };
    /**
     * Adaptation typographique intelligente
     */
    StyleTransferEngine.prototype.adaptTypography = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var baseFonts;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        baseFonts = config.sourceBrand.visualElements.fonts;
                        _a = {};
                        return [4 /*yield*/, this.typographyMatcher.adaptFont(baseFonts[0], config.targetSector, 'heading')];
                    case 1:
                        _a.headings = _b.sent();
                        return [4 /*yield*/, this.typographyMatcher.adaptFont(baseFonts[1] || baseFonts[0], config.targetSector, 'body')];
                    case 2:
                        _a.body = _b.sent();
                        return [4 /*yield*/, this.typographyMatcher.adaptFont(baseFonts[0], config.targetSector, 'accent')];
                    case 3: return [2 /*return*/, (_a.accent = _b.sent(),
                            _a.hierarchy = this.generateTypographyScale(config),
                            _a)];
                }
            });
        });
    };
    /**
     * Génération d'échelle d'espacement
     */
    StyleTransferEngine.prototype.generateSpacingScale = function (config) {
        var baseUnit = config.sourceBrand.personality.traits.includes('modern') ? 8 : 16;
        return {
            xs: "".concat(baseUnit * 0.25, "px"),
            sm: "".concat(baseUnit * 0.5, "px"),
            md: "".concat(baseUnit, "px"),
            lg: "".concat(baseUnit * 1.5, "px"),
            xl: "".concat(baseUnit * 2, "px"),
            '2xl': "".concat(baseUnit * 3, "px"),
            '3xl': "".concat(baseUnit * 4, "px"),
            '4xl': "".concat(baseUnit * 6, "px")
        };
    };
    /**
     * Génération de la bibliothèque de composants
     */
    StyleTransferEngine.prototype.generateComponentLibrary = function (config, colors, typography) {
        return __awaiter(this, void 0, void 0, function () {
            var personality;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        personality = config.sourceBrand.personality;
                        _a = {};
                        return [4 /*yield*/, this.generateButtonStyles(colors, personality)];
                    case 1:
                        _a.buttons = _b.sent();
                        return [4 /*yield*/, this.generateFormStyles(colors, personality)];
                    case 2:
                        _a.forms = _b.sent();
                        return [4 /*yield*/, this.generateCardStyles(colors, personality)];
                    case 3:
                        _a.cards = _b.sent();
                        return [4 /*yield*/, this.generateNavigationStyles(colors, personality)];
                    case 4:
                        _a.navigation = _b.sent();
                        return [4 /*yield*/, this.generateOverlayStyles(colors, personality)];
                    case 5: return [2 /*return*/, (_a.overlays = _b.sent(),
                            _a)];
                }
            });
        });
    };
    /**
     * Génération de la bibliothèque d'animations
     */
    StyleTransferEngine.prototype.generateAnimationLibrary = function (config) {
        var isPlayful = config.sourceBrand.personality.traits.includes('playful');
        var speed = isPlayful ? 'fast' : 'normal';
        return {
            transitions: {
                fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
                normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
                slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)'
            },
            easing: {
                linear: 'linear',
                ease: 'ease',
                easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            },
            keyframes: {
                fadeIn: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }',
                slideIn: '@keyframes slideIn { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
                scaleIn: '@keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }',
                rotate: '@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
                pulse: '@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }'
            }
        };
    };
    /**
     * Calcul de l'alignement de marque
     */
    StyleTransferEngine.prototype.calculateBrandAlignment = function (config, transferredStyle) {
        return __awaiter(this, void 0, void 0, function () {
            var scores, overallScore;
            return __generator(this, function (_a) {
                scores = {
                    colorAlignment: this.scoreColorAlignment(config.sourceBrand, transferredStyle.colors),
                    typographyAlignment: this.scoreTypographyAlignment(config.sourceBrand, transferredStyle.typography),
                    personalityAlignment: this.scorePersonalityAlignment(config.sourceBrand, transferredStyle),
                    industryAlignment: this.scoreIndustryAlignment(config.targetSector, transferredStyle)
                };
                overallScore = Math.round((scores.colorAlignment + scores.typographyAlignment + scores.personalityAlignment + scores.industryAlignment) / 4);
                return [2 /*return*/, {
                        score: overallScore,
                        strengths: this.identifyAlignmentStrengths(scores),
                        improvements: this.identifyAlignmentImprovements(scores),
                        recommendations: this.generateAlignmentRecommendations(scores, config)
                    }];
            });
        });
    };
    /**
     * Génération d'alternatives
     */
    StyleTransferEngine.prototype.generateAlternatives = function (config, count) {
        return __awaiter(this, void 0, void 0, function () {
            var alternatives, i, altConfig, altResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alternatives = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < count)) return [3 /*break*/, 4];
                        altConfig = this.createAlternativeConfig(config, i);
                        return [4 /*yield*/, this.transferStyle(altConfig)];
                    case 2:
                        altResult = _a.sent();
                        alternatives.push(altResult);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, alternatives];
                }
            });
        });
    };
    /**
     * Optimisation des performances
     */
    StyleTransferEngine.prototype.optimizePerformance = function (transferredStyle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.performanceOptimizer.optimize(transferredStyle)];
            });
        });
    };
    /**
     * Méthodes utilitaires privées
     */
    StyleTransferEngine.prototype.identifyBrandStrengths = function (brand) {
        var strengths = [];
        if (brand.visualElements.primaryColors.length > 0) {
            strengths.push('Palette de couleurs définie');
        }
        if (brand.personality.traits.length > 2) {
            strengths.push('Personnalité de marque claire');
        }
        if (brand.values.length > 3) {
            strengths.push('Valeurs bien définies');
        }
        return strengths;
    };
    StyleTransferEngine.prototype.identifyBrandOpportunities = function (brand) {
        return [
            'Modernisation de l\'identité visuelle',
            'Amélioration de l\'accessibilité',
            'Optimisation pour le digital',
            'Cohérence cross-plateforme'
        ];
    };
    StyleTransferEngine.prototype.identifyBrandConstraints = function (brand) {
        var constraints = [];
        if (brand.industry === 'finance') {
            constraints.push('Réglementation stricte');
        }
        if (brand.personality.tone === 'formal') {
            constraints.push('Ton formel requis');
        }
        return constraints;
    };
    StyleTransferEngine.prototype.assessBrandFlexibility = function (brand) {
        var flexibility = 50; // Base
        if (brand.personality.traits.includes('modern'))
            flexibility += 20;
        if (brand.personality.traits.includes('playful'))
            flexibility += 15;
        if (brand.industry === 'tech')
            flexibility += 10;
        return Math.min(100, flexibility);
    };
    StyleTransferEngine.prototype.generateTypographyScale = function (config) {
        var isModern = config.sourceBrand.personality.traits.includes('modern');
        var baseSize = isModern ? 16 : 18;
        return {
            xs: { size: "".concat(baseSize * 0.75, "px"), lineHeight: '1.2', letterSpacing: '0.025em' },
            sm: { size: "".concat(baseSize * 0.875, "px"), lineHeight: '1.25', letterSpacing: '0.025em' },
            base: { size: "".concat(baseSize, "px"), lineHeight: '1.5', letterSpacing: '0' },
            lg: { size: "".concat(baseSize * 1.125, "px"), lineHeight: '1.5', letterSpacing: '0' },
            xl: { size: "".concat(baseSize * 1.25, "px"), lineHeight: '1.4', letterSpacing: '-0.025em' },
            '2xl': { size: "".concat(baseSize * 1.5, "px"), lineHeight: '1.3', letterSpacing: '-0.025em' },
            '3xl': { size: "".concat(baseSize * 1.875, "px"), lineHeight: '1.2', letterSpacing: '-0.05em' },
            '4xl': { size: "".concat(baseSize * 2.25, "px"), lineHeight: '1.1', letterSpacing: '-0.05em' }
        };
    };
    StyleTransferEngine.prototype.generateButtonStyles = function (colors, personality) {
        return __awaiter(this, void 0, void 0, function () {
            var isRounded, borderRadius;
            return __generator(this, function (_a) {
                isRounded = personality.traits.includes('friendly');
                borderRadius = isRounded ? '12px' : '6px';
                return [2 /*return*/, {
                        primary: {
                            base: "background-color: ".concat(colors.primary, "; color: white; border-radius: ").concat(borderRadius, "; padding: 12px 24px; font-weight: 500; transition: all 150ms ease;"),
                            hover: "background-color: ".concat(this.darkenColor(colors.primary, 10), "; transform: translateY(-1px);"),
                            active: "background-color: ".concat(this.darkenColor(colors.primary, 20), "; transform: translateY(0);"),
                            disabled: "background-color: ".concat(colors.neutral[2], "; color: ").concat(colors.neutral[4], "; cursor: not-allowed;"),
                            focus: "outline: 2px solid ".concat(colors.primary, "; outline-offset: 2px;")
                        },
                        secondary: {
                            base: "background-color: transparent; color: ".concat(colors.primary, "; border: 2px solid ").concat(colors.primary, "; border-radius: ").concat(borderRadius, "; padding: 10px 22px; font-weight: 500; transition: all 150ms ease;"),
                            hover: "background-color: ".concat(colors.primary, "; color: white;"),
                            active: "background-color: ".concat(this.darkenColor(colors.primary, 10), ";"),
                            disabled: "border-color: ".concat(colors.neutral[2], "; color: ").concat(colors.neutral[4], "; cursor: not-allowed;"),
                            focus: "outline: 2px solid ".concat(colors.primary, "; outline-offset: 2px;")
                        },
                        tertiary: {
                            base: "background-color: transparent; color: ".concat(colors.primary, "; border: none; padding: 12px 24px; font-weight: 500; transition: all 150ms ease;"),
                            hover: "background-color: ".concat(colors.neutral[0], "; color: ").concat(this.darkenColor(colors.primary, 10), ";"),
                            active: "background-color: ".concat(colors.neutral[1], ";"),
                            disabled: "color: ".concat(colors.neutral[4], "; cursor: not-allowed;"),
                            focus: "outline: 2px solid ".concat(colors.primary, "; outline-offset: 2px;")
                        },
                        destructive: {
                            base: "background-color: ".concat(colors.semantic.error, "; color: white; border-radius: ").concat(borderRadius, "; padding: 12px 24px; font-weight: 500; transition: all 150ms ease;"),
                            hover: "background-color: ".concat(this.darkenColor(colors.semantic.error, 10), ";"),
                            active: "background-color: ".concat(this.darkenColor(colors.semantic.error, 20), ";"),
                            disabled: "background-color: ".concat(colors.neutral[2], "; color: ").concat(colors.neutral[4], "; cursor: not-allowed;"),
                            focus: "outline: 2px solid ".concat(colors.semantic.error, "; outline-offset: 2px;")
                        },
                        sizes: {
                            sm: {
                                base: "padding: 8px 16px; font-size: 14px;",
                                hover: '',
                                active: '',
                                disabled: '',
                                focus: ''
                            },
                            md: {
                                base: "padding: 12px 24px; font-size: 16px;",
                                hover: '',
                                active: '',
                                disabled: '',
                                focus: ''
                            },
                            lg: {
                                base: "padding: 16px 32px; font-size: 18px;",
                                hover: '',
                                active: '',
                                disabled: '',
                                focus: ''
                            }
                        }
                    }];
            });
        });
    };
    StyleTransferEngine.prototype.generateFormStyles = function (colors, personality) {
        return __awaiter(this, void 0, void 0, function () {
            var isRounded, borderRadius;
            return __generator(this, function (_a) {
                isRounded = personality.traits.includes('friendly');
                borderRadius = isRounded ? '8px' : '4px';
                return [2 /*return*/, {
                        input: {
                            base: "border: 2px solid ".concat(colors.neutral[2], "; border-radius: ").concat(borderRadius, "; padding: 12px 16px; background-color: white; font-size: 16px; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.neutral[3], ";"),
                            active: "border-color: ".concat(colors.primary, "; outline: none;"),
                            disabled: "background-color: ".concat(colors.neutral[0], "; color: ").concat(colors.neutral[4], "; cursor: not-allowed;"),
                            focus: "border-color: ".concat(colors.primary, "; box-shadow: 0 0 0 3px ").concat(colors.primary, "20;")
                        },
                        textarea: {
                            base: "border: 2px solid ".concat(colors.neutral[2], "; border-radius: ").concat(borderRadius, "; padding: 12px 16px; background-color: white; font-size: 16px; min-height: 120px; resize: vertical; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.neutral[3], ";"),
                            active: "border-color: ".concat(colors.primary, "; outline: none;"),
                            disabled: "background-color: ".concat(colors.neutral[0], "; color: ").concat(colors.neutral[4], "; cursor: not-allowed;"),
                            focus: "border-color: ".concat(colors.primary, "; box-shadow: 0 0 0 3px ").concat(colors.primary, "20;")
                        },
                        select: {
                            base: "border: 2px solid ".concat(colors.neutral[2], "; border-radius: ").concat(borderRadius, "; padding: 12px 16px; background-color: white; font-size: 16px; cursor: pointer; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.neutral[3], ";"),
                            active: "border-color: ".concat(colors.primary, "; outline: none;"),
                            disabled: "background-color: ".concat(colors.neutral[0], "; color: ").concat(colors.neutral[4], "; cursor: not-allowed;"),
                            focus: "border-color: ".concat(colors.primary, "; box-shadow: 0 0 0 3px ").concat(colors.primary, "20;")
                        },
                        checkbox: {
                            base: "width: 20px; height: 20px; border: 2px solid ".concat(colors.neutral[3], "; border-radius: 4px; background-color: white; cursor: pointer; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.primary, ";"),
                            active: "background-color: ".concat(colors.primary, "; border-color: ").concat(colors.primary, ";"),
                            disabled: "background-color: ".concat(colors.neutral[0], "; border-color: ").concat(colors.neutral[2], "; cursor: not-allowed;"),
                            focus: "box-shadow: 0 0 0 3px ".concat(colors.primary, "20;")
                        },
                        radio: {
                            base: "width: 20px; height: 20px; border: 2px solid ".concat(colors.neutral[3], "; border-radius: 50%; background-color: white; cursor: pointer; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.primary, ";"),
                            active: "background-color: ".concat(colors.primary, "; border-color: ").concat(colors.primary, ";"),
                            disabled: "background-color: ".concat(colors.neutral[0], "; border-color: ").concat(colors.neutral[2], "; cursor: not-allowed;"),
                            focus: "box-shadow: 0 0 0 3px ".concat(colors.primary, "20;")
                        },
                        switch: {
                            base: "width: 44px; height: 24px; border: 2px solid ".concat(colors.neutral[3], "; border-radius: 12px; background-color: ").concat(colors.neutral[1], "; cursor: pointer; position: relative; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.primary, ";"),
                            active: "background-color: ".concat(colors.primary, "; border-color: ").concat(colors.primary, ";"),
                            disabled: "background-color: ".concat(colors.neutral[0], "; border-color: ").concat(colors.neutral[2], "; cursor: not-allowed;"),
                            focus: "box-shadow: 0 0 0 3px ".concat(colors.primary, "20;")
                        }
                    }];
            });
        });
    };
    StyleTransferEngine.prototype.generateCardStyles = function (colors, personality) {
        return __awaiter(this, void 0, void 0, function () {
            var isRounded, borderRadius;
            return __generator(this, function (_a) {
                isRounded = personality.traits.includes('friendly');
                borderRadius = isRounded ? '16px' : '8px';
                return [2 /*return*/, {
                        default: {
                            base: "background-color: white; border: 1px solid ".concat(colors.neutral[1], "; border-radius: ").concat(borderRadius, "; padding: 24px; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.neutral[2], "; transform: translateY(-2px);"),
                            active: "border-color: ".concat(colors.primary, ";"),
                            disabled: "opacity: 0.6; cursor: not-allowed;",
                            focus: "outline: 2px solid ".concat(colors.primary, "; outline-offset: 2px;")
                        },
                        elevated: {
                            base: "background-color: white; border: none; border-radius: ".concat(borderRadius, "; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 150ms ease;"),
                            hover: "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); transform: translateY(-2px);",
                            active: "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transform: translateY(0);",
                            disabled: "opacity: 0.6; cursor: not-allowed;",
                            focus: "outline: 2px solid ".concat(colors.primary, "; outline-offset: 2px;")
                        },
                        outlined: {
                            base: "background-color: white; border: 2px solid ".concat(colors.neutral[2], "; border-radius: ").concat(borderRadius, "; padding: 22px; transition: all 150ms ease;"),
                            hover: "border-color: ".concat(colors.primary, "; transform: translateY(-1px);"),
                            active: "border-color: ".concat(this.darkenColor(colors.primary, 10), ";"),
                            disabled: "opacity: 0.6; cursor: not-allowed;",
                            focus: "outline: 2px solid ".concat(colors.primary, "; outline-offset: 2px;")
                        },
                        filled: {
                            base: "background-color: ".concat(colors.neutral[0], "; border: none; border-radius: ").concat(borderRadius, "; padding: 24px; transition: all 150ms ease;"),
                            hover: "background-color: ".concat(colors.neutral[1], "; transform: translateY(-1px);"),
                            active: "background-color: ".concat(colors.neutral[2], ";"),
                            disabled: "opacity: 0.6; cursor: not-allowed;",
                            focus: "outline: 2px solid ".concat(colors.primary, "; outline-offset: 2px;")
                        }
                    }];
            });
        });
    };
    StyleTransferEngine.prototype.generateNavigationStyles = function (colors, personality) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        horizontal: {
                            base: "display: flex; align-items: center; gap: 32px; padding: 16px 0;",
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        },
                        vertical: {
                            base: "display: flex; flex-direction: column; gap: 8px; padding: 16px 0;",
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        },
                        breadcrumb: {
                            base: "display: flex; align-items: center; gap: 8px; color: ".concat(colors.neutral[4], "; font-size: 14px;"),
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        },
                        pagination: {
                            base: "display: flex; align-items: center; justify-content: center; gap: 8px;",
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        }
                    }];
            });
        });
    };
    StyleTransferEngine.prototype.generateOverlayStyles = function (colors, personality) {
        return __awaiter(this, void 0, void 0, function () {
            var isRounded, borderRadius;
            return __generator(this, function (_a) {
                isRounded = personality.traits.includes('friendly');
                borderRadius = isRounded ? '16px' : '8px';
                return [2 /*return*/, {
                        modal: {
                            base: "background-color: white; border-radius: ".concat(borderRadius, "; padding: 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); max-width: 500px; width: 90vw;"),
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        },
                        dropdown: {
                            base: "background-color: white; border: 1px solid ".concat(colors.neutral[1], "; border-radius: 8px; padding: 8px 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); min-width: 200px;"),
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        },
                        tooltip: {
                            base: "background-color: ".concat(colors.neutral[8] || '#1f2937', "; color: white; border-radius: 6px; padding: 8px 12px; font-size: 14px; max-width: 300px;"),
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        },
                        popover: {
                            base: "background-color: white; border: 1px solid ".concat(colors.neutral[1], "; border-radius: 12px; padding: 16px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); max-width: 400px;"),
                            hover: '',
                            active: '',
                            disabled: '',
                            focus: ''
                        }
                    }];
            });
        });
    };
    StyleTransferEngine.prototype.scoreColorAlignment = function (brand, colors) {
        // Score basé sur la cohérence avec les couleurs de marque
        var score = 80; // Base
        if (brand.visualElements.primaryColors.includes(colors.primary)) {
            score += 15;
        }
        if (colors.accessibility.wcagCompliant) {
            score += 5;
        }
        return Math.min(100, score);
    };
    StyleTransferEngine.prototype.scoreTypographyAlignment = function (brand, typography) {
        // Score basé sur l'adaptation typographique
        return 85; // Simulation
    };
    StyleTransferEngine.prototype.scorePersonalityAlignment = function (brand, transferredStyle) {
        // Score basé sur l'alignement avec la personnalité de marque
        return 90; // Simulation
    };
    StyleTransferEngine.prototype.scoreIndustryAlignment = function (targetSector, transferredStyle) {
        // Score basé sur l'adéquation avec le secteur cible
        return 88; // Simulation
    };
    StyleTransferEngine.prototype.identifyAlignmentStrengths = function (scores) {
        var strengths = [];
        if (scores.colorAlignment > 85) {
            strengths.push('Excellente cohérence colorimétrique');
        }
        if (scores.typographyAlignment > 85) {
            strengths.push('Typographie bien adaptée');
        }
        if (scores.personalityAlignment > 85) {
            strengths.push('Personnalité de marque respectée');
        }
        return strengths;
    };
    StyleTransferEngine.prototype.identifyAlignmentImprovements = function (scores) {
        var improvements = [];
        if (scores.colorAlignment < 80) {
            improvements.push('Améliorer la cohérence des couleurs');
        }
        if (scores.typographyAlignment < 80) {
            improvements.push('Ajuster la hiérarchie typographique');
        }
        return improvements;
    };
    StyleTransferEngine.prototype.generateAlignmentRecommendations = function (scores, config) {
        var recommendations = [];
        recommendations.push('Tester les contrastes sur différents appareils');
        recommendations.push('Valider l\'accessibilité avec des utilisateurs réels');
        recommendations.push('A/B tester les variations de couleurs');
        if (config.sourceBrand.personality.traits.includes('luxury')) {
            recommendations.push('Considérer des animations plus subtiles');
        }
        return recommendations;
    };
    StyleTransferEngine.prototype.createAlternativeConfig = function (config, index) {
        var alternatives = ['subtle', 'moderate', 'dramatic'];
        return __assign(__assign({}, config), { adaptationLevel: alternatives[index % alternatives.length], constraints: __assign(__assign({}, config.constraints), { complexityLevel: index === 0 ? 'simple' : index === 1 ? 'moderate' : 'complex' }) });
    };
    StyleTransferEngine.prototype.trackChanges = function (config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                // Simulation du tracking des changements
                return [2 /*return*/, [
                        {
                            element: 'primary-button',
                            property: 'background-color',
                            oldValue: '#000000',
                            newValue: config.sourceBrand.visualElements.primaryColors[0],
                            reason: 'Alignement avec la couleur principale de marque',
                            impact: 'high'
                        },
                        {
                            element: 'heading',
                            property: 'font-family',
                            oldValue: 'Arial',
                            newValue: ((_a = config.sourceBrand.visualElements.fonts[0]) === null || _a === void 0 ? void 0 : _a.family) || 'Inter',
                            reason: 'Cohérence typographique',
                            impact: 'medium'
                        }
                    ]];
            });
        });
    };
    StyleTransferEngine.prototype.calculateAIConfidence = function (brandAlignment, performanceMetrics) {
        var alignmentWeight = 0.6;
        var performanceWeight = 0.4;
        var alignmentScore = brandAlignment.score / 100;
        var performanceScore = performanceMetrics.optimizationScore / 100;
        return Math.round((alignmentScore * alignmentWeight + performanceScore * performanceWeight) * 100);
    };
    StyleTransferEngine.prototype.createFailureResult = function (config) {
        return {
            success: false,
            transferredStyle: {
                colors: {
                    primary: '#3b82f6',
                    secondary: [],
                    accent: [],
                    neutral: [],
                    semantic: {
                        success: '#10b981',
                        warning: '#f59e0b',
                        error: '#ef4444',
                        info: '#3b82f6'
                    },
                    psychological: {
                        trust: '#3b82f6',
                        energy: '#f59e0b',
                        calm: '#10b981',
                        luxury: '#8b5cf6'
                    },
                    accessibility: {
                        contrastRatios: new Map(),
                        wcagCompliant: false,
                        adjustedColors: []
                    }
                },
                typography: {
                    headings: {
                        family: 'Inter',
                        weight: [600],
                        style: 'normal',
                        usage: 'heading',
                        fallbacks: ['system-ui', 'sans-serif']
                    },
                    body: {
                        family: 'Inter',
                        weight: [400],
                        style: 'normal',
                        usage: 'body',
                        fallbacks: ['system-ui', 'sans-serif']
                    },
                    accent: {
                        family: 'Inter',
                        weight: [500],
                        style: 'normal',
                        usage: 'accent',
                        fallbacks: ['system-ui', 'sans-serif']
                    },
                    hierarchy: {
                        xs: { size: '12px', lineHeight: '1.2', letterSpacing: '0.025em' },
                        sm: { size: '14px', lineHeight: '1.25', letterSpacing: '0.025em' },
                        base: { size: '16px', lineHeight: '1.5', letterSpacing: '0' },
                        lg: { size: '18px', lineHeight: '1.5', letterSpacing: '0' },
                        xl: { size: '20px', lineHeight: '1.4', letterSpacing: '-0.025em' },
                        '2xl': { size: '24px', lineHeight: '1.3', letterSpacing: '-0.025em' },
                        '3xl': { size: '30px', lineHeight: '1.2', letterSpacing: '-0.05em' },
                        '4xl': { size: '36px', lineHeight: '1.1', letterSpacing: '-0.05em' }
                    }
                },
                spacing: {
                    xs: '2px', sm: '4px', md: '8px', lg: '12px',
                    xl: '16px', '2xl': '24px', '3xl': '32px', '4xl': '48px'
                },
                components: {},
                animations: {
                    transitions: { fast: '150ms', normal: '300ms', slow: '500ms' },
                    easing: { linear: 'linear', ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', easeInOut: 'ease-in-out', bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
                    keyframes: { fadeIn: '', slideIn: '', scaleIn: '', rotate: '', pulse: '' }
                }
            },
            brandAlignment: {
                score: 0,
                strengths: [],
                improvements: ['Réessayer avec une configuration différente'],
                recommendations: ['Vérifier les paramètres d\'entrée']
            },
            adaptationReport: {
                changesApplied: [],
                preservedElements: [],
                enhancedElements: [],
                performanceImpact: {
                    cssSize: 0,
                    renderTime: 0,
                    criticalPath: [],
                    optimizationScore: 0
                }
            },
            aiConfidence: 0,
            alternatives: []
        };
    };
    StyleTransferEngine.prototype.darkenColor = function (color, percentage) {
        // Utilitaire pour assombrir une couleur
        // Implémentation simplifiée
        return color;
    };
    return StyleTransferEngine;
}());
exports.StyleTransferEngine = StyleTransferEngine;
// ============================================================================
// COLOR HARMONY ENGINE
// ============================================================================
var ColorHarmonyEngine = /** @class */ (function () {
    function ColorHarmonyEngine() {
        this.colorTheory = new Map();
        this.industryPalettes = new Map();
        this.accessibilityChecker = new AccessibilityChecker();
        this.initializeColorTheory();
        this.initializeIndustryPalettes();
    }
    ColorHarmonyEngine.prototype.generateHarmony = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var baseColors, primaryColor, harmony, accessibilityResult, psychologicalColors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseColors = config.baseBrand.visualElements.primaryColors;
                        primaryColor = baseColors[0] || '#3b82f6';
                        return [4 /*yield*/, this.generateColorScheme(primaryColor, config.adaptationLevel)];
                    case 1:
                        harmony = _a.sent();
                        return [4 /*yield*/, this.accessibilityChecker.checkCompliance(harmony)];
                    case 2:
                        accessibilityResult = _a.sent();
                        psychologicalColors = this.generatePsychologicalColors(config.targetSector);
                        return [2 /*return*/, {
                                primary: primaryColor,
                                secondary: harmony.secondary,
                                accent: harmony.accent,
                                neutral: harmony.neutral,
                                semantic: {
                                    success: '#10b981',
                                    warning: '#f59e0b',
                                    error: '#ef4444',
                                    info: '#3b82f6'
                                },
                                psychological: psychologicalColors,
                                accessibility: accessibilityResult
                            }];
                }
            });
        });
    };
    ColorHarmonyEngine.prototype.generateColorScheme = function (baseColor, level) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation de génération d'harmonie colorimétrique
                return [2 /*return*/, {
                        secondary: ['#64748b', '#94a3b8'],
                        accent: ['#f59e0b', '#8b5cf6'],
                        neutral: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a']
                    }];
            });
        });
    };
    ColorHarmonyEngine.prototype.generatePsychologicalColors = function (targetSector) {
        var sectorColors = {
            'santé': { trust: '#10b981', energy: '#3b82f6', calm: '#06b6d4', luxury: '#8b5cf6' },
            'finance': { trust: '#1e40af', energy: '#059669', calm: '#0ea5e9', luxury: '#7c3aed' },
            'tech': { trust: '#3b82f6', energy: '#f59e0b', calm: '#10b981', luxury: '#8b5cf6' },
            'default': { trust: '#3b82f6', energy: '#f59e0b', calm: '#10b981', luxury: '#8b5cf6' }
        };
        return sectorColors[targetSector] || sectorColors.default;
    };
    ColorHarmonyEngine.prototype.initializeColorTheory = function () {
        // Théorie des couleurs pour l'IA
        console.log('🎨 Initialisation de la théorie des couleurs...');
    };
    ColorHarmonyEngine.prototype.initializeIndustryPalettes = function () {
        // Palettes par industrie
        console.log('🏭 Initialisation des palettes d\'industrie...');
    };
    return ColorHarmonyEngine;
}());
exports.ColorHarmonyEngine = ColorHarmonyEngine;
// ============================================================================
// TYPOGRAPHY MATCHER
// ============================================================================
var TypographyMatcher = /** @class */ (function () {
    function TypographyMatcher() {
        this.fontDatabase = new Map();
        this.sectorMappings = new Map();
        this.initializeFontDatabase();
        this.initializeSectorMappings();
    }
    TypographyMatcher.prototype.adaptFont = function (baseFont, targetSector, usage) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorFonts, adaptedFont;
            return __generator(this, function (_a) {
                sectorFonts = this.sectorMappings.get(targetSector) || ['Inter'];
                adaptedFont = sectorFonts[0];
                return [2 /*return*/, {
                        family: adaptedFont,
                        weight: baseFont.weight,
                        style: baseFont.style,
                        usage: usage,
                        fallbacks: this.generateFallbacks(adaptedFont)
                    }];
            });
        });
    };
    TypographyMatcher.prototype.generateFallbacks = function (fontFamily) {
        var fallbackMap = {
            'Inter': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            'Playfair Display': ['Georgia', 'serif'],
            'Roboto': ['Arial', 'sans-serif']
        };
        return fallbackMap[fontFamily] || ['system-ui', 'sans-serif'];
    };
    TypographyMatcher.prototype.initializeFontDatabase = function () {
        console.log('🔤 Initialisation de la base de données des polices...');
    };
    TypographyMatcher.prototype.initializeSectorMappings = function () {
        this.sectorMappings.set('tech', ['Inter', 'Roboto', 'Source Sans Pro']);
        this.sectorMappings.set('finance', ['Inter', 'Roboto', 'Open Sans']);
        this.sectorMappings.set('santé', ['Inter', 'Lato', 'Open Sans']);
        console.log('🎯 Mappings sectoriels initialisés...');
    };
    return TypographyMatcher;
}());
exports.TypographyMatcher = TypographyMatcher;
// ============================================================================
// ACCESSIBILITY CHECKER
// ============================================================================
var AccessibilityChecker = /** @class */ (function () {
    function AccessibilityChecker() {
    }
    AccessibilityChecker.prototype.checkCompliance = function (colors) {
        return __awaiter(this, void 0, void 0, function () {
            var contrastRatios, wcagCompliant;
            return __generator(this, function (_a) {
                contrastRatios = new Map();
                // Simulation de vérification des contrastes
                contrastRatios.set("".concat(colors.primary, "-white"), 4.5);
                contrastRatios.set("".concat(colors.primary, "-black"), 12.1);
                wcagCompliant = Array.from(contrastRatios.values()).every(function (ratio) { return ratio >= 4.5; });
                return [2 /*return*/, {
                        contrastRatios: contrastRatios,
                        wcagCompliant: wcagCompliant,
                        adjustedColors: wcagCompliant ? [] : [colors.primary] // Couleurs ajustées si nécessaire
                    }];
            });
        });
    };
    return AccessibilityChecker;
}());
exports.AccessibilityChecker = AccessibilityChecker;
// ============================================================================
// STYLE PERFORMANCE OPTIMIZER
// ============================================================================
var StylePerformanceOptimizer = /** @class */ (function () {
    function StylePerformanceOptimizer() {
    }
    StylePerformanceOptimizer.prototype.optimize = function (transferredStyle) {
        return __awaiter(this, void 0, void 0, function () {
            var cssSize, renderTime, criticalPath, optimizationScore;
            return __generator(this, function (_a) {
                cssSize = this.calculateCSSSize(transferredStyle);
                renderTime = this.estimateRenderTime(transferredStyle);
                criticalPath = this.identifyCriticalPath(transferredStyle);
                optimizationScore = this.calculateOptimizationScore(cssSize, renderTime);
                return [2 /*return*/, {
                        cssSize: cssSize,
                        renderTime: renderTime,
                        criticalPath: criticalPath,
                        optimizationScore: optimizationScore
                    }];
            });
        });
    };
    StylePerformanceOptimizer.prototype.calculateCSSSize = function (style) {
        // Estimation de la taille CSS
        return 45000; // 45KB
    };
    StylePerformanceOptimizer.prototype.estimateRenderTime = function (style) {
        // Estimation du temps de rendu
        return 120; // 120ms
    };
    StylePerformanceOptimizer.prototype.identifyCriticalPath = function (style) {
        return ['colors', 'typography', 'spacing', 'buttons'];
    };
    StylePerformanceOptimizer.prototype.calculateOptimizationScore = function (cssSize, renderTime) {
        var score = 100;
        if (cssSize > 50000)
            score -= 10;
        if (renderTime > 100)
            score -= 15;
        return Math.max(0, score);
    };
    return StylePerformanceOptimizer;
}());
exports.StylePerformanceOptimizer = StylePerformanceOptimizer;
// ============================================================================
// FACTORY & UTILITIES
// ============================================================================
var StyleTransferFactory = /** @class */ (function () {
    function StyleTransferFactory() {
    }
    StyleTransferFactory.createEngine = function () {
        return new StyleTransferEngine();
    };
    StyleTransferFactory.createBrandIdentity = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var engine;
            return __generator(this, function (_a) {
                engine = new BrandAnalysisEngine();
                return [2 /*return*/, engine.analyzeBrandIdentity(input)];
            });
        });
    };
    StyleTransferFactory.createDefaultConfig = function (brandIdentity, targetSector) {
        return {
            sourceBrand: brandIdentity,
            targetSector: targetSector,
            adaptationLevel: 'moderate',
            preserveElements: ['colors', 'personality'],
            enhanceElements: ['accessibility', 'modernity'],
            constraints: {
                colorCount: 10,
                fontCount: 3,
                complexityLevel: 'moderate'
            }
        };
    };
    return StyleTransferFactory;
}());
exports.StyleTransferFactory = StyleTransferFactory;
exports.default = StyleTransferEngine;
