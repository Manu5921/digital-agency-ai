"use strict";
/**
 * Design Agent V2 - Phase 2 Extensions
 * Orchestrateur principal avec toutes les nouvelles fonctionnalités
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
exports.DesignAgentV2Factory = exports.DesignAgentV2 = void 0;
var figma_integration_1 = require("./workflows/figma-integration");
var ai_image_generator_1 = require("./workflows/ai-image-generator");
var design_system_1 = require("./workflows/design-system");
var sante_template_1 = require("./templates/sante-template");
var finance_template_1 = require("./templates/finance-template");
var elearning_template_1 = require("./templates/elearning-template");
var immobilier_template_1 = require("./templates/immobilier-template");
var tech_template_1 = require("./templates/tech-template");
var DesignAgentV2 = /** @class */ (function () {
    function DesignAgentV2(config) {
        this.config = config;
        // Initialisation des services selon la configuration
        if (config.preferences.figmaIntegration && config.apiKeys.figma) {
            this.figmaService = new figma_integration_1.FigmaMCPService(config.apiKeys.figma);
        }
        if (config.preferences.useAIImages && config.apiKeys.openai) {
            this.imageService = new ai_image_generator_1.SectorImageService(config.apiKeys.openai);
        }
        // Initialisation du système de design
        this.designSystem = design_system_1.DesignSystemFactory.createSectorDesignSystem(config.sector, config.branding.businessName, config.branding.primaryColor, config.style);
    }
    /**
     * Génère un projet de design complet
     */
    DesignAgentV2.prototype.generateCompleteProject = function (figmaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, figmaImport, templates, images, designSystemResult, exports_1, metrics, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        console.log("\uD83C\uDFA8 Design Agent V2 - D\u00E9marrage du projet ".concat(this.config.branding.businessName));
                        figmaImport = void 0;
                        if (!(this.figmaService && figmaUrl)) return [3 /*break*/, 3];
                        console.log('📐 Import depuis Figma...');
                        return [4 /*yield*/, this.importFromFigma(figmaUrl)];
                    case 2:
                        figmaImport = _a.sent();
                        _a.label = 3;
                    case 3:
                        // 2. Génération des templates
                        console.log('🏗️ Génération des templates...');
                        return [4 /*yield*/, this.generateTemplates()];
                    case 4:
                        templates = _a.sent();
                        // 3. Génération des images
                        console.log('🖼️ Génération des images...');
                        return [4 /*yield*/, this.generateImages()];
                    case 5:
                        images = _a.sent();
                        // 4. Génération du système de design
                        console.log('🎨 Génération du design system...');
                        designSystemResult = this.generateDesignSystem();
                        // 5. Optimisations et exports
                        console.log('⚡ Optimisations et exports...');
                        exports_1 = this.generateExports(templates, designSystemResult);
                        metrics = this.calculateMetrics(templates, images, designSystemResult, startTime);
                        result = {
                            success: true,
                            projectName: this.config.branding.businessName,
                            sector: this.config.sector,
                            style: this.config.style,
                            templates: templates,
                            images: images,
                            designSystem: designSystemResult,
                            figmaImport: figmaImport,
                            metrics: metrics,
                            exports: exports_1
                        };
                        console.log('✅ Projet généré avec succès!');
                        console.log("\u23F1\uFE0F Temps total: ".concat(metrics.generationTime, "ms"));
                        console.log("\uD83D\uDCCA Score d'optimisation: ".concat(metrics.optimizationScore, "%"));
                        return [2 /*return*/, result];
                    case 6:
                        error_1 = _a.sent();
                        console.error('❌ Erreur lors de la génération:', error_1);
                        return [2 /*return*/, {
                                success: false,
                                projectName: this.config.branding.businessName,
                                sector: this.config.sector,
                                style: this.config.style,
                                templates: { main: { html: '', css: '' } },
                                images: { generated: [], fallbacks: [] },
                                designSystem: { tokens: {}, css: '', tailwindConfig: {} },
                                metrics: {
                                    generationTime: Date.now() - startTime,
                                    imageCount: 0,
                                    templateVariations: 0,
                                    designTokens: 0,
                                    optimizationScore: 0
                                },
                                exports: {}
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Import depuis Figma
     */
    DesignAgentV2.prototype.importFromFigma = function (figmaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.figmaService) {
                            throw new Error('Service Figma non configuré');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.figmaService.importFromFigmaUrl(figmaUrl)];
                    case 2:
                        result = _a.sent();
                        if (!result.success || !result.data) {
                            return [2 /*return*/, {
                                    success: false,
                                    components: [],
                                    tokens: {}
                                }];
                        }
                        return [2 /*return*/, {
                                success: true,
                                components: result.data.components,
                                tokens: result.data.tokens
                            }];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Erreur import Figma:', error_2);
                        return [2 /*return*/, {
                                success: false,
                                components: [],
                                tokens: {}
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génère les templates selon le secteur
     */
    DesignAgentV2.prototype.generateTemplates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var templateConfig, mainTemplate, variations, santeTemplate, financeTemplate, elearningTemplate, immobilierTemplate, techTemplate, styles, _i, styles_1, style, variationConfig, variation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templateConfig = this.getTemplateConfig();
                        variations = [];
                        // Génération du template principal
                        switch (this.config.sector) {
                            case 'sante':
                                santeTemplate = new sante_template_1.default(templateConfig);
                                mainTemplate = {
                                    html: santeTemplate.generateHTMLTemplate(),
                                    css: santeTemplate.generateHealthColorPalette().toString()
                                };
                                break;
                            case 'finance':
                                financeTemplate = new finance_template_1.default(templateConfig);
                                mainTemplate = {
                                    html: financeTemplate.generateHTMLTemplate(),
                                    css: financeTemplate.generateFinanceColorPalette().toString()
                                };
                                break;
                            case 'elearning':
                                elearningTemplate = new elearning_template_1.default(templateConfig);
                                mainTemplate = {
                                    html: elearningTemplate.generateHTMLTemplate(),
                                    css: elearningTemplate.generateELearningColorPalette().toString()
                                };
                                break;
                            case 'immobilier':
                                immobilierTemplate = new immobilier_template_1.default(templateConfig);
                                mainTemplate = {
                                    html: immobilierTemplate.generateHTMLTemplate(),
                                    css: immobilierTemplate.generateRealEstateColorPalette().toString()
                                };
                                break;
                            case 'tech':
                                techTemplate = new tech_template_1.default(templateConfig);
                                mainTemplate = {
                                    html: techTemplate.generateHTMLTemplate(),
                                    css: techTemplate.generateTechColorPalette().toString()
                                };
                                break;
                            default:
                                // Fallback vers restaurant template existant
                                mainTemplate = {
                                    html: this.generateFallbackTemplate(),
                                    css: this.generateFallbackCSS()
                                };
                        }
                        if (!this.config.preferences.generateVariations) return [3 /*break*/, 4];
                        styles = ['classique', 'moderne', 'minimaliste'];
                        _i = 0, styles_1 = styles;
                        _a.label = 1;
                    case 1:
                        if (!(_i < styles_1.length)) return [3 /*break*/, 4];
                        style = styles_1[_i];
                        if (!(style !== this.config.style)) return [3 /*break*/, 3];
                        variationConfig = __assign(__assign({}, templateConfig), { style: style });
                        return [4 /*yield*/, this.generateTemplateVariation(variationConfig)];
                    case 2:
                        variation = _a.sent();
                        variations.push({
                            style: style,
                            html: variation.html,
                            css: variation.css
                        });
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, {
                            main: mainTemplate,
                            variations: variations.length > 0 ? variations : undefined
                        }];
                }
            });
        });
    };
    /**
     * Génère les images pour le projet
     */
    DesignAgentV2.prototype.generateImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var images, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        images = {
                            generated: [],
                            fallbacks: []
                        };
                        if (!(this.imageService && this.config.preferences.useAIImages)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.imageService.generateProjectImagePack(this.config.sector, this.config.branding.businessName, true)];
                    case 2:
                        result = _a.sent();
                        if (result.success && !result.fallbackUsed) {
                            images.generated = result.images.map(function (img) { return ({
                                type: img.type,
                                url: img.url,
                                alt: img.alt,
                                optimized: true
                            }); });
                        }
                        else {
                            // Utilise les fallbacks
                            images.fallbacks = result.images.map(function (img) { return ({
                                type: img.type,
                                url: img.optimizedUrls.webp,
                                alt: img.alt
                            }); });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Erreur génération images:', error_3);
                        // Génère des images placeholder
                        images.fallbacks = this.generatePlaceholderImages();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        // Utilise des images placeholder
                        images.fallbacks = this.generatePlaceholderImages();
                        _a.label = 6;
                    case 6: return [2 /*return*/, images];
                }
            });
        });
    };
    /**
     * Génère le système de design
     */
    DesignAgentV2.prototype.generateDesignSystem = function () {
        var designSystemResult = this.designSystem.generateCompleteDesignSystem();
        var result = {
            tokens: designSystemResult.tokens,
            css: designSystemResult.css,
            tailwindConfig: designSystemResult.tailwindConfig
        };
        // Génération des tokens Figma si demandé
        if (this.config.preferences.exportFormats.includes('figma-tokens')) {
            result.figmaTokens = this.designSystem.exportDesignSystem('figma-tokens');
        }
        return result;
    };
    /**
     * Génère les exports dans différents formats
     */
    DesignAgentV2.prototype.generateExports = function (templates, designSystem) {
        var exports = {};
        this.config.preferences.exportFormats.forEach(function (format) {
            switch (format) {
                case 'html':
                    exports[format] = templates.main.html;
                    break;
                case 'css':
                    exports[format] = designSystem.css;
                    break;
                case 'tailwind':
                    exports[format] = JSON.stringify(designSystem.tailwindConfig, null, 2);
                    break;
                case 'figma-tokens':
                    if (designSystem.figmaTokens) {
                        exports[format] = designSystem.figmaTokens;
                    }
                    break;
            }
        });
        return exports;
    };
    /**
     * Calcule les métriques de performance
     */
    DesignAgentV2.prototype.calculateMetrics = function (templates, images, designSystem, startTime) {
        var _a;
        var generationTime = Date.now() - startTime;
        var imageCount = images.generated.length + images.fallbacks.length;
        var templateVariations = (((_a = templates.variations) === null || _a === void 0 ? void 0 : _a.length) || 0) + 1;
        var designTokens = designSystem.tokens.length || 0;
        // Score d'optimisation basé sur plusieurs facteurs
        var optimizationScore = 100;
        // Pénalité si pas d'images optimisées
        if (images.generated.length === 0 && images.fallbacks.length > 0) {
            optimizationScore -= 20;
        }
        // Bonus pour les variations
        if (templateVariations > 1) {
            optimizationScore += 10;
        }
        // Bonus pour un système de design complet
        if (designTokens > 50) {
            optimizationScore += 15;
        }
        // Pénalité si génération trop longue
        if (generationTime > 30000) { // 30 secondes
            optimizationScore -= 10;
        }
        return {
            generationTime: generationTime,
            imageCount: imageCount,
            templateVariations: templateVariations,
            designTokens: designTokens,
            optimizationScore: Math.max(0, Math.min(100, optimizationScore))
        };
    };
    /**
     * Méthodes utilitaires
     */
    DesignAgentV2.prototype.getTemplateConfig = function () {
        var baseConfig = {
            businessName: this.config.branding.businessName,
            style: this.config.style,
            colors: {
                primary: this.config.branding.primaryColor,
                secondary: '',
                accent: '',
                trust: '',
                success: ''
            },
            features: []
        };
        // Adaptation selon le secteur
        switch (this.config.sector) {
            case 'sante':
                return __assign(__assign({}, baseConfig), { speciality: 'Médecine générale' });
            case 'finance':
                return __assign(__assign({}, baseConfig), { serviceType: 'conseil' });
            case 'elearning':
                return __assign(__assign({}, baseConfig), { platformName: this.config.branding.businessName, targetAudience: 'professionals' });
            case 'immobilier':
                return __assign(__assign({}, baseConfig), { agencyName: this.config.branding.businessName, serviceType: 'mixte' });
            case 'tech':
                return __assign(__assign({}, baseConfig), { companyName: this.config.branding.businessName, techType: 'startup' });
            default:
                return baseConfig;
        }
    };
    DesignAgentV2.prototype.generateTemplateVariation = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Génère une variation du template avec un style différent
                // Implémentation simplifiée pour la démo
                return [2 /*return*/, {
                        html: "<!-- Variation ".concat(config.style, " pour ").concat(config.businessName, " -->"),
                        css: "/* CSS pour variation ".concat(config.style, " */")
                    }];
            });
        });
    };
    DesignAgentV2.prototype.generateFallbackTemplate = function () {
        return "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(this.config.branding.businessName, "</title>\n</head>\n<body>\n    <h1>Bienvenue chez ").concat(this.config.branding.businessName, "</h1>\n    <p>Template de fallback pour le secteur ").concat(this.config.sector, "</p>\n</body>\n</html>");
    };
    DesignAgentV2.prototype.generateFallbackCSS = function () {
        return "\nbody {\n    font-family: Inter, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background-color: #fafafa;\n}\n\nh1 {\n    color: ".concat(this.config.branding.primaryColor, ";\n    font-size: 2rem;\n    margin-bottom: 1rem;\n}\n\np {\n    color: #666;\n    line-height: 1.6;\n}\n");
    };
    DesignAgentV2.prototype.generatePlaceholderImages = function () {
        var placeholders = [
            { type: 'hero', url: 'https://via.placeholder.com/1200x600', alt: 'Image hero' },
            { type: 'feature', url: 'https://via.placeholder.com/400x300', alt: 'Image feature' },
            { type: 'gallery', url: 'https://via.placeholder.com/300x200', alt: 'Image galerie' }
        ];
        return placeholders;
    };
    /**
     * Méthodes publiques pour interaction
     */
    /**
     * Met à jour la configuration
     */
    DesignAgentV2.prototype.updateConfig = function (newConfig) {
        var _a, _b, _c, _d;
        this.config = __assign(__assign({}, this.config), newConfig);
        // Réinitialise les services si nécessaire
        if (((_a = newConfig.apiKeys) === null || _a === void 0 ? void 0 : _a.figma) && ((_b = newConfig.preferences) === null || _b === void 0 ? void 0 : _b.figmaIntegration)) {
            this.figmaService = new figma_integration_1.FigmaMCPService(newConfig.apiKeys.figma);
        }
        if (((_c = newConfig.apiKeys) === null || _c === void 0 ? void 0 : _c.openai) && ((_d = newConfig.preferences) === null || _d === void 0 ? void 0 : _d.useAIImages)) {
            this.imageService = new ai_image_generator_1.SectorImageService(newConfig.apiKeys.openai);
        }
    };
    /**
     * Génère uniquement les images
     */
    DesignAgentV2.prototype.generateImagesOnly = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.generateImages()];
            });
        });
    };
    /**
     * Génère uniquement le système de design
     */
    DesignAgentV2.prototype.generateDesignSystemOnly = function () {
        return this.generateDesignSystem();
    };
    /**
     * Exporte un template dans un format spécifique
     */
    DesignAgentV2.prototype.exportTemplate = function (template, format) {
        switch (format) {
            case 'html':
                return template.html;
            case 'zip':
                // Logique de création de ZIP
                return 'data:application/zip;base64,'; // Placeholder
            case 'pdf':
                // Logique de conversion PDF
                return 'data:application/pdf;base64,'; // Placeholder
            default:
                return template.html;
        }
    };
    /**
     * Obtient les statistiques de performance
     */
    DesignAgentV2.prototype.getPerformanceStats = function () {
        // Implémentation basique pour la démo
        return {
            averageGenerationTime: 15000, // 15 secondes
            successRate: 95,
            optimizationScore: 88
        };
    };
    return DesignAgentV2;
}());
exports.DesignAgentV2 = DesignAgentV2;
/**
 * Factory pour créer rapidement un Design Agent V2
 */
var DesignAgentV2Factory = /** @class */ (function () {
    function DesignAgentV2Factory() {
    }
    DesignAgentV2Factory.createForSector = function (sector, businessName, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var config = {
            name: "".concat(businessName, " Design Project"),
            sector: sector,
            style: options.style || 'moderne',
            apiKeys: options.apiKeys || {},
            preferences: {
                useAIImages: options.useAI || false,
                figmaIntegration: !!((_a = options.apiKeys) === null || _a === void 0 ? void 0 : _a.figma),
                generateVariations: true,
                exportFormats: ['html', 'css', 'tailwind']
            },
            branding: {
                businessName: businessName,
                primaryColor: options.primaryColor || '#3b82f6',
                brandPersonality: 'professional'
            }
        };
        return new DesignAgentV2(config);
    };
    /**
     * Configuration rapide pour MVP
     */
    DesignAgentV2Factory.createMVP = function (businessName, sector) {
        return this.createForSector(sector, businessName, {
            style: 'moderne',
            primaryColor: '#3b82f6',
            useAI: false
        });
    };
    /**
     * Configuration premium avec toutes les fonctionnalités
     */
    DesignAgentV2Factory.createPremium = function (businessName, sector, apiKeys) {
        return this.createForSector(sector, businessName, {
            style: 'moderne',
            primaryColor: '#3b82f6',
            useAI: true,
            apiKeys: apiKeys
        });
    };
    return DesignAgentV2Factory;
}());
exports.DesignAgentV2Factory = DesignAgentV2Factory;
exports.default = DesignAgentV2;
