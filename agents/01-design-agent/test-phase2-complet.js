"use strict";
/**
 * Test Complet - Design Agent V2 Phase 2
 * Validation de toutes les extensions et fonctionnalités
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.runCompleteTests = exports.DesignAgentV2TestSuite = void 0;
var design_agent_v2_1 = require("./design-agent-v2");
var figma_integration_1 = require("./workflows/figma-integration");
var ai_image_generator_1 = require("./workflows/ai-image-generator");
var design_system_1 = require("./workflows/design-system");
var DesignAgentV2TestSuite = /** @class */ (function () {
    function DesignAgentV2TestSuite() {
        this.results = [];
    }
    /**
     * Exécute tous les tests de validation
     */
    DesignAgentV2TestSuite.prototype.runAllTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var globalStats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🧪 === DÉBUT DES TESTS DESIGN AGENT V2 PHASE 2 ===\n');
                        // Test des templates sectoriels
                        return [4 /*yield*/, this.testSectorTemplates()];
                    case 1:
                        // Test des templates sectoriels
                        _a.sent();
                        // Test du système de design
                        return [4 /*yield*/, this.testDesignSystem()];
                    case 2:
                        // Test du système de design
                        _a.sent();
                        // Test de la génération d'images AI (mode simulation)
                        return [4 /*yield*/, this.testAIImageGeneration()];
                    case 3:
                        // Test de la génération d'images AI (mode simulation)
                        _a.sent();
                        // Test de l'intégration Figma (mode simulation)
                        return [4 /*yield*/, this.testFigmaIntegration()];
                    case 4:
                        // Test de l'intégration Figma (mode simulation)
                        _a.sent();
                        // Test de performance et optimisation
                        return [4 /*yield*/, this.testPerformance()];
                    case 5:
                        // Test de performance et optimisation
                        _a.sent();
                        // Test des exports et variations
                        return [4 /*yield*/, this.testExportsAndVariations()];
                    case 6:
                        // Test des exports et variations
                        _a.sent();
                        globalStats = this.calculateGlobalStats();
                        console.log('\n🏁 === FIN DES TESTS ===');
                        this.printSummary(globalStats);
                        return [2 /*return*/, {
                                suites: this.results,
                                globalStats: globalStats
                            }];
                }
            });
        });
    };
    /**
     * Test des 5 templates sectoriels
     */
    DesignAgentV2TestSuite.prototype.testSectorTemplates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suite, secteurs, _loop_1, this_1, _i, secteurs_1, secteur;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suite = {
                            suiteName: 'Templates Sectoriels',
                            tests: [],
                            totalPassed: 0,
                            totalFailed: 0,
                            totalDuration: 0
                        };
                        console.log('🏗️ Test des Templates Sectoriels...\n');
                        secteurs = ['sante', 'finance', 'elearning', 'immobilier', 'tech'];
                        _loop_1 = function (secteur) {
                            var testResult;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.runTest("Template ".concat(secteur), function () { return __awaiter(_this, void 0, void 0, function () {
                                            var agent, result;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        agent = design_agent_v2_1.DesignAgentV2Factory.createMVP("Test ".concat(secteur), secteur);
                                                        return [4 /*yield*/, agent.generateCompleteProject()];
                                                    case 1:
                                                        result = _a.sent();
                                                        return [2 /*return*/, {
                                                                success: result.success,
                                                                projectName: result.projectName,
                                                                sector: result.sector,
                                                                templateGenerated: result.templates.main.html.length > 0,
                                                                cssGenerated: result.templates.main.css.length > 0,
                                                                htmlLength: result.templates.main.html.length,
                                                                cssLength: result.templates.main.css.length,
                                                                generationTime: result.metrics.generationTime,
                                                                optimizationScore: result.metrics.optimizationScore
                                                            }];
                                                }
                                            });
                                        }); })];
                                    case 1:
                                        testResult = _b.sent();
                                        suite.tests.push(testResult);
                                        console.log("  \u2705 ".concat(secteur, ": ").concat(testResult.passed ? 'PASSÉ' : 'ÉCHEC', " (").concat(testResult.duration, "ms)"));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, secteurs_1 = secteurs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < secteurs_1.length)) return [3 /*break*/, 4];
                        secteur = secteurs_1[_i];
                        return [5 /*yield**/, _loop_1(secteur)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.finalizeSuite(suite);
                        this.results.push(suite);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test du système de design centralisé
     */
    DesignAgentV2TestSuite.prototype.testDesignSystem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suite, paletteTest, tokensTest, exportTest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suite = {
                            suiteName: 'Système de Design',
                            tests: [],
                            totalPassed: 0,
                            totalFailed: 0,
                            totalDuration: 0
                        };
                        console.log('\n🎨 Test du Système de Design...\n');
                        return [4 /*yield*/, this.runTest('Génération de Palettes Automatique', function () { return __awaiter(_this, void 0, void 0, function () {
                                var designSystem, colors;
                                return __generator(this, function (_a) {
                                    designSystem = design_system_1.DesignSystemFactory.createSectorDesignSystem('tech', 'Test Company', '#3b82f6', 'moderne');
                                    colors = designSystem.generateColorPalette('#3b82f6');
                                    return [2 /*return*/, {
                                            primaryGenerated: !!colors.primary,
                                            secondaryGenerated: !!colors.secondary,
                                            accentGenerated: !!colors.accent,
                                            neutralScaleLength: colors.neutral.length,
                                            semanticColors: Object.keys(colors.semantic).length,
                                            shadesGenerated: Object.keys(colors.shades).length
                                        }];
                                });
                            }); })];
                    case 1:
                        paletteTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Génération de Design Tokens', function () { return __awaiter(_this, void 0, void 0, function () {
                                var designSystem, complete;
                                return __generator(this, function (_a) {
                                    designSystem = design_system_1.DesignSystemFactory.createSectorDesignSystem('sante', 'Test Clinic', '#2563eb', 'classique');
                                    complete = designSystem.generateCompleteDesignSystem();
                                    return [2 /*return*/, {
                                            tokensCount: complete.tokens.length,
                                            cssGenerated: complete.css.length > 0,
                                            tailwindConfigGenerated: !!complete.tailwindConfig,
                                            colorTokens: complete.tokens.filter(function (t) { return t.type === 'color'; }).length,
                                            typographyTokens: complete.tokens.filter(function (t) { return t.type === 'typography'; }).length,
                                            spacingTokens: complete.tokens.filter(function (t) { return t.type === 'spacing'; }).length
                                        }];
                                });
                            }); })];
                    case 2:
                        tokensTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Export Multi-formats', function () { return __awaiter(_this, void 0, void 0, function () {
                                var designSystem;
                                return __generator(this, function (_a) {
                                    designSystem = design_system_1.DesignSystemFactory.createSectorDesignSystem('finance', 'Test Bank', '#1e40af', 'moderne');
                                    return [2 /*return*/, {
                                            cssExport: designSystem.exportDesignSystem('css').length > 0,
                                            scssExport: designSystem.exportDesignSystem('scss').length > 0,
                                            jsExport: designSystem.exportDesignSystem('js').length > 0,
                                            figmaTokensExport: designSystem.exportDesignSystem('figma-tokens').length > 0,
                                            jsonExport: designSystem.exportDesignSystem('json').length > 0
                                        }];
                                });
                            }); })];
                    case 3:
                        exportTest = _a.sent();
                        suite.tests.push(paletteTest, tokensTest, exportTest);
                        suite.tests.forEach(function (test) {
                            console.log("  ".concat(test.passed ? '✅' : '❌', " ").concat(test.testName, ": ").concat(test.passed ? 'PASSÉ' : 'ÉCHEC'));
                        });
                        this.finalizeSuite(suite);
                        this.results.push(suite);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test de génération d'images AI (simulation)
     */
    DesignAgentV2TestSuite.prototype.testAIImageGeneration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suite, interfaceTest, serviceTest, optimizationTest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suite = {
                            suiteName: 'Génération Images AI',
                            tests: [],
                            totalPassed: 0,
                            totalFailed: 0,
                            totalDuration: 0
                        };
                        console.log('\n🖼️ Test de Génération d\'Images AI...\n');
                        return [4 /*yield*/, this.runTest('Interface AIImageGenerator', function () { return __awaiter(_this, void 0, void 0, function () {
                                var generator, prompts;
                                return __generator(this, function (_a) {
                                    generator = new ai_image_generator_1.AIImageGenerator('demo-key');
                                    prompts = generator['getSectorPrompts']('restaurant', 'Demo Restaurant');
                                    return [2 /*return*/, {
                                            sectorPromptsGenerated: !!prompts.hero && prompts.features.length > 0,
                                            heroPromptLength: prompts.hero.length,
                                            featuresCount: prompts.features.length,
                                            galleryCount: prompts.gallery.length,
                                            sectorsSupported: ['restaurant', 'sante', 'finance', 'elearning', 'immobilier', 'tech']
                                        }];
                                });
                            }); })];
                    case 1:
                        interfaceTest = _a.sent();
                        return [4 /*yield*/, this.runTest('SectorImageService', function () { return __awaiter(_this, void 0, void 0, function () {
                                var service, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            service = new ai_image_generator_1.SectorImageService('demo-key');
                                            return [4 /*yield*/, service.generateProjectImagePack('tech', 'Demo Startup', false)];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/, {
                                                    packGenerated: result.success,
                                                    imagesCount: result.images.length,
                                                    fallbackUsed: result.fallbackUsed,
                                                    hasHeroImage: result.images.some(function (img) { return img.type === 'hero'; }),
                                                    hasFeatureImages: result.images.some(function (img) { return img.type === 'feature'; }),
                                                    hasGalleryImages: result.images.some(function (img) { return img.type === 'gallery'; })
                                                }];
                                    }
                                });
                            }); })];
                    case 2:
                        serviceTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Optimisation Images', function () { return __awaiter(_this, void 0, void 0, function () {
                                var generator, placeholder;
                                return __generator(this, function (_a) {
                                    generator = new ai_image_generator_1.AIImageGenerator('demo-key');
                                    placeholder = generator.generatePlaceholderImage('hero', 'restaurant');
                                    return [2 /*return*/, {
                                            placeholderGenerated: !!placeholder.url,
                                            optimizedUrlsPresent: !!placeholder.optimizedUrls,
                                            webpUrlGenerated: !!placeholder.optimizedUrls.webp,
                                            jpegUrlGenerated: !!placeholder.optimizedUrls.jpeg,
                                            thumbnailGenerated: !!placeholder.optimizedUrls.thumbnail,
                                            altTextGenerated: placeholder.alt.length > 0,
                                            metadataPresent: !!placeholder.metadata
                                        }];
                                });
                            }); })];
                    case 3:
                        optimizationTest = _a.sent();
                        suite.tests.push(interfaceTest, serviceTest, optimizationTest);
                        suite.tests.forEach(function (test) {
                            console.log("  ".concat(test.passed ? '✅' : '❌', " ").concat(test.testName, ": ").concat(test.passed ? 'PASSÉ' : 'ÉCHEC'));
                        });
                        this.finalizeSuite(suite);
                        this.results.push(suite);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test de l'intégration Figma (simulation)
     */
    DesignAgentV2TestSuite.prototype.testFigmaIntegration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suite, interfaceTest, promptsTest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suite = {
                            suiteName: 'Intégration Figma MCP',
                            tests: [],
                            totalPassed: 0,
                            totalFailed: 0,
                            totalDuration: 0
                        };
                        console.log('\n📐 Test de l\'Intégration Figma...\n');
                        return [4 /*yield*/, this.runTest('Interface FigmaMCPService', function () { return __awaiter(_this, void 0, void 0, function () {
                                var service, fileId;
                                return __generator(this, function (_a) {
                                    service = new figma_integration_1.FigmaMCPService('demo-key');
                                    fileId = service['extractFileIdFromUrl']('https://www.figma.com/file/abc123/mon-design');
                                    return [2 /*return*/, {
                                            fileIdExtracted: fileId === 'abc123',
                                            serviceInitialized: !!service,
                                            hasExtractMethod: typeof service['extractFileIdFromUrl'] === 'function'
                                        }];
                                });
                            }); })];
                    case 1:
                        interfaceTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Prompts Images Sectoriels', function () { return __awaiter(_this, void 0, void 0, function () {
                                var integration, prompts;
                                return __generator(this, function (_a) {
                                    integration = new (/** @class */ (function (_super) {
                                        __extends(class_1, _super);
                                        function class_1() {
                                            return _super !== null && _super.apply(this, arguments) || this;
                                        }
                                        class_1.prototype.testGeneratePrompts = function (sector) {
                                            return this['figmaIntegration'].generateSectorImagePrompts(sector);
                                        };
                                        return class_1;
                                    }(figma_integration_1.FigmaMCPService)))('demo-key');
                                    prompts = integration.testGeneratePrompts('sante');
                                    return [2 /*return*/, {
                                            promptsGenerated: prompts.length > 0,
                                            promptsCount: prompts.length,
                                            allPromptsValid: prompts.every(function (p) { return p.length > 20; }),
                                            sectorsSupported: ['restaurant', 'sante', 'finance', 'elearning', 'immobilier', 'tech']
                                        }];
                                });
                            }); })];
                    case 2:
                        promptsTest = _a.sent();
                        suite.tests.push(interfaceTest, promptsTest);
                        suite.tests.forEach(function (test) {
                            console.log("  ".concat(test.passed ? '✅' : '❌', " ").concat(test.testName, ": ").concat(test.passed ? 'PASSÉ' : 'ÉCHEC'));
                        });
                        this.finalizeSuite(suite);
                        this.results.push(suite);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test de performance et optimisation
     */
    DesignAgentV2TestSuite.prototype.testPerformance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suite, speedTest, consistencyTest, resourceTest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suite = {
                            suiteName: 'Performance & Optimisation',
                            tests: [],
                            totalPassed: 0,
                            totalFailed: 0,
                            totalDuration: 0
                        };
                        console.log('\n⚡ Test de Performance...\n');
                        return [4 /*yield*/, this.runTest('Vitesse de Génération', function () { return __awaiter(_this, void 0, void 0, function () {
                                var startTime, agent, result, totalTime;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            startTime = Date.now();
                                            agent = design_agent_v2_1.DesignAgentV2Factory.createMVP('Speed Test', 'tech');
                                            return [4 /*yield*/, agent.generateCompleteProject()];
                                        case 1:
                                            result = _a.sent();
                                            totalTime = Date.now() - startTime;
                                            return [2 /*return*/, {
                                                    generationTime: totalTime,
                                                    underTargetTime: totalTime < 30000, // 30 secondes max
                                                    optimizationScore: result.metrics.optimizationScore,
                                                    highOptimizationScore: result.metrics.optimizationScore > 80
                                                }];
                                    }
                                });
                            }); })];
                    case 1:
                        speedTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Cohérence Multi-Secteurs', function () { return __awaiter(_this, void 0, void 0, function () {
                                var secteurs, results, _i, secteurs_2, secteur, agent, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            secteurs = ['sante', 'finance', 'tech'];
                                            results = [];
                                            _i = 0, secteurs_2 = secteurs;
                                            _a.label = 1;
                                        case 1:
                                            if (!(_i < secteurs_2.length)) return [3 /*break*/, 4];
                                            secteur = secteurs_2[_i];
                                            agent = design_agent_v2_1.DesignAgentV2Factory.createMVP("Test ".concat(secteur), secteur);
                                            return [4 /*yield*/, agent.generateCompleteProject()];
                                        case 2:
                                            result = _a.sent();
                                            results.push(result);
                                            _a.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/, {
                                                allSuccessful: results.every(function (r) { return r.success; }),
                                                consistentStructure: results.every(function (r) {
                                                    return r.templates.main.html.length > 0 &&
                                                        r.designSystem.tokens.length > 0;
                                                }),
                                                averageOptimizationScore: results.reduce(function (sum, r) {
                                                    return sum + r.metrics.optimizationScore;
                                                }, 0) / results.length
                                            }];
                                    }
                                });
                            }); })];
                    case 2:
                        consistencyTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Utilisation Ressources', function () { return __awaiter(_this, void 0, void 0, function () {
                                var agent, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            agent = design_agent_v2_1.DesignAgentV2Factory.createForSector('elearning', 'Resource Test', {
                                                useAI: false,
                                                style: 'moderne'
                                            });
                                            return [4 /*yield*/, agent.generateCompleteProject()];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/, {
                                                    projectGenerated: result.success,
                                                    templateSize: result.templates.main.html.length + result.templates.main.css.length,
                                                    reasonableSize: (result.templates.main.html.length + result.templates.main.css.length) < 500000,
                                                    designTokensCount: result.metrics.designTokens,
                                                    reasonableTokensCount: result.metrics.designTokens < 200
                                                }];
                                    }
                                });
                            }); })];
                    case 3:
                        resourceTest = _a.sent();
                        suite.tests.push(speedTest, consistencyTest, resourceTest);
                        suite.tests.forEach(function (test) {
                            console.log("  ".concat(test.passed ? '✅' : '❌', " ").concat(test.testName, ": ").concat(test.passed ? 'PASSÉ' : 'ÉCHEC'));
                        });
                        this.finalizeSuite(suite);
                        this.results.push(suite);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test des exports et variations
     */
    DesignAgentV2TestSuite.prototype.testExportsAndVariations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var suite, variationsTest, exportFormatsTest, exportMethodsTest;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suite = {
                            suiteName: 'Exports & Variations',
                            tests: [],
                            totalPassed: 0,
                            totalFailed: 0,
                            totalDuration: 0
                        };
                        console.log('\n📦 Test des Exports et Variations...\n');
                        return [4 /*yield*/, this.runTest('Génération de Variations', function () { return __awaiter(_this, void 0, void 0, function () {
                                var agent, result;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            agent = new design_agent_v2_1.DesignAgentV2({
                                                name: 'Variations Test',
                                                sector: 'immobilier',
                                                style: 'moderne',
                                                apiKeys: {},
                                                preferences: {
                                                    useAIImages: false,
                                                    figmaIntegration: false,
                                                    generateVariations: true,
                                                    exportFormats: ['html', 'css']
                                                },
                                                branding: {
                                                    businessName: 'Test Immobilier',
                                                    primaryColor: '#3b82f6',
                                                    brandPersonality: 'professional'
                                                }
                                            });
                                            return [4 /*yield*/, agent.generateCompleteProject()];
                                        case 1:
                                            result = _b.sent();
                                            return [2 /*return*/, {
                                                    variationsGenerated: !!result.templates.variations,
                                                    variationsCount: ((_a = result.templates.variations) === null || _a === void 0 ? void 0 : _a.length) || 0,
                                                    expectedVariationsCount: 2, // classique et minimaliste
                                                    mainTemplateGenerated: result.templates.main.html.length > 0
                                                }];
                                    }
                                });
                            }); })];
                    case 1:
                        variationsTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Formats d\'Export', function () { return __awaiter(_this, void 0, void 0, function () {
                                var agent, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            agent = new design_agent_v2_1.DesignAgentV2({
                                                name: 'Export Test',
                                                sector: 'tech',
                                                style: 'moderne',
                                                apiKeys: {},
                                                preferences: {
                                                    useAIImages: false,
                                                    figmaIntegration: false,
                                                    generateVariations: false,
                                                    exportFormats: ['html', 'css', 'tailwind', 'figma-tokens']
                                                },
                                                branding: {
                                                    businessName: 'Export Test',
                                                    primaryColor: '#6366f1',
                                                    brandPersonality: 'creative'
                                                }
                                            });
                                            return [4 /*yield*/, agent.generateCompleteProject()];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/, {
                                                    htmlExportGenerated: !!result.exports.html,
                                                    cssExportGenerated: !!result.exports.css,
                                                    tailwindExportGenerated: !!result.exports.tailwind,
                                                    figmaTokensExportGenerated: !!result.exports['figma-tokens'],
                                                    allRequestedExportsGenerated: Object.keys(result.exports).length === 4
                                                }];
                                    }
                                });
                            }); })];
                    case 2:
                        exportFormatsTest = _a.sent();
                        return [4 /*yield*/, this.runTest('Méthodes d\'Export', function () { return __awaiter(_this, void 0, void 0, function () {
                                var agent, result, htmlExport, stats;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            agent = design_agent_v2_1.DesignAgentV2Factory.createMVP('Export Methods Test', 'finance');
                                            return [4 /*yield*/, agent.generateCompleteProject()];
                                        case 1:
                                            result = _a.sent();
                                            htmlExport = agent.exportTemplate(result.templates.main, 'html');
                                            stats = agent.getPerformanceStats();
                                            return [2 /*return*/, {
                                                    templateExportWorking: htmlExport.length > 0,
                                                    performanceStatsAvailable: !!stats.averageGenerationTime,
                                                    designSystemOnlyGeneration: !!agent.generateDesignSystemOnly(),
                                                    statsStructureValid: stats.averageGenerationTime > 0 &&
                                                        stats.successRate >= 0 &&
                                                        stats.optimizationScore >= 0
                                                }];
                                    }
                                });
                            }); })];
                    case 3:
                        exportMethodsTest = _a.sent();
                        suite.tests.push(variationsTest, exportFormatsTest, exportMethodsTest);
                        suite.tests.forEach(function (test) {
                            console.log("  ".concat(test.passed ? '✅' : '❌', " ").concat(test.testName, ": ").concat(test.passed ? 'PASSÉ' : 'ÉCHEC'));
                        });
                        this.finalizeSuite(suite);
                        this.results.push(suite);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Utilitaires pour les tests
     */
    DesignAgentV2TestSuite.prototype.runTest = function (testName, testFn) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, result, duration, passed, error_1, duration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, testFn()];
                    case 2:
                        result = _a.sent();
                        duration = Date.now() - startTime;
                        passed = this.evaluateTestResult(result);
                        return [2 /*return*/, {
                                testName: testName,
                                passed: passed,
                                duration: duration,
                                details: result
                            }];
                    case 3:
                        error_1 = _a.sent();
                        duration = Date.now() - startTime;
                        return [2 /*return*/, {
                                testName: testName,
                                passed: false,
                                duration: duration,
                                details: null,
                                error: error_1 instanceof Error ? error_1.message : 'Erreur inconnue'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DesignAgentV2TestSuite.prototype.evaluateTestResult = function (result) {
        if (typeof result === 'boolean')
            return result;
        if (typeof result === 'object' && result !== null) {
            // Évalue basé sur les propriétés du résultat
            var keys = Object.keys(result);
            if (keys.length === 0)
                return false;
            // Si au moins 70% des propriétés sont truthy, le test passe
            var truthyCount = keys.filter(function (key) {
                return result[key] === true ||
                    (typeof result[key] === 'number' && result[key] > 0) ||
                    (typeof result[key] === 'string' && result[key].length > 0) ||
                    (Array.isArray(result[key]) && result[key].length > 0);
            }).length;
            return (truthyCount / keys.length) >= 0.7;
        }
        return false;
    };
    DesignAgentV2TestSuite.prototype.finalizeSuite = function (suite) {
        suite.totalPassed = suite.tests.filter(function (t) { return t.passed; }).length;
        suite.totalFailed = suite.tests.filter(function (t) { return !t.passed; }).length;
        suite.totalDuration = suite.tests.reduce(function (sum, t) { return sum + t.duration; }, 0);
    };
    DesignAgentV2TestSuite.prototype.calculateGlobalStats = function () {
        var totalTests = this.results.reduce(function (sum, suite) { return sum + suite.tests.length; }, 0);
        var totalPassed = this.results.reduce(function (sum, suite) { return sum + suite.totalPassed; }, 0);
        var totalFailed = this.results.reduce(function (sum, suite) { return sum + suite.totalFailed; }, 0);
        var totalDuration = this.results.reduce(function (sum, suite) { return sum + suite.totalDuration; }, 0);
        var successRate = totalTests > 0 ? (totalPassed / totalTests) * 100 : 0;
        return {
            totalTests: totalTests,
            totalPassed: totalPassed,
            totalFailed: totalFailed,
            totalDuration: totalDuration,
            successRate: successRate
        };
    };
    DesignAgentV2TestSuite.prototype.printSummary = function (globalStats) {
        console.log('\n📊 === RÉSUMÉ DES TESTS ===');
        console.log("Tests total: ".concat(globalStats.totalTests));
        console.log("Tests r\u00E9ussis: ".concat(globalStats.totalPassed));
        console.log("Tests \u00E9chou\u00E9s: ".concat(globalStats.totalFailed));
        console.log("Taux de succ\u00E8s: ".concat(globalStats.successRate.toFixed(1), "%"));
        console.log("Dur\u00E9e totale: ".concat(globalStats.totalDuration, "ms"));
        console.log('\n📋 Détail par suite:');
        this.results.forEach(function (suite) {
            var successRate = suite.tests.length > 0 ? (suite.totalPassed / suite.tests.length) * 100 : 0;
            console.log("  ".concat(suite.suiteName, ": ").concat(suite.totalPassed, "/").concat(suite.tests.length, " (").concat(successRate.toFixed(1), "%)"));
        });
        if (globalStats.successRate >= 90) {
            console.log('\n🎉 EXCELLENT! Tous les systèmes sont opérationnels.');
        }
        else if (globalStats.successRate >= 75) {
            console.log('\n✅ BON! La plupart des fonctionnalités marchent correctement.');
        }
        else {
            console.log('\n⚠️ ATTENTION! Plusieurs tests ont échoué, révision nécessaire.');
        }
    };
    return DesignAgentV2TestSuite;
}());
exports.DesignAgentV2TestSuite = DesignAgentV2TestSuite;
/**
 * Exécution des tests si ce fichier est lancé directement
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var testSuite, results, resultsJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testSuite = new DesignAgentV2TestSuite();
                    return [4 /*yield*/, testSuite.runAllTests()];
                case 1:
                    results = _a.sent();
                    console.log('\n💾 Sauvegarde des résultats...');
                    resultsJson = JSON.stringify(results, null, 2);
                    console.log('Résultats disponibles pour export vers JSON');
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.runCompleteTests = main;
// Exécution automatique si ce fichier est lancé directement
if (require.main === module) {
    main().catch(console.error);
}
