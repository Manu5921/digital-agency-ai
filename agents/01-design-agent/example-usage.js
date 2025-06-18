"use strict";
/**
 * Example Usage - Design Agent V2 Phase 2
 * Démonstration des nouvelles fonctionnalités
 */
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
exports.demoInteractive = exports.compareSecteursPerformance = exports.exempleStartupTechVariations = exports.exempleImmobilierEtapes = exports.exempleELearningFigma = exports.exempleFinTechPremium = exports.exempleClinicMVP = void 0;
var design_agent_v2_1 = require("./design-agent-v2");
/**
 * Exemple 1: Création rapide MVP pour une clinique
 */
function exempleClinicMVP() {
    return __awaiter(this, void 0, void 0, function () {
        var designAgent, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🏥 === EXEMPLE 1: Clinique MVP ===');
                    designAgent = design_agent_v2_1.DesignAgentV2Factory.createMVP('Clinique Saint-Martin', 'sante');
                    return [4 /*yield*/, designAgent.generateCompleteProject()];
                case 1:
                    result = _a.sent();
                    console.log('✅ Projet généré:');
                    console.log("- Nom: ".concat(result.projectName));
                    console.log("- Secteur: ".concat(result.sector));
                    console.log("- Style: ".concat(result.style));
                    console.log("- Temps: ".concat(result.metrics.generationTime, "ms"));
                    console.log("- Score: ".concat(result.metrics.optimizationScore, "%"));
                    console.log("- Images: ".concat(result.images.fallbacks.length, " placeholders"));
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.exempleClinicMVP = exempleClinicMVP;
/**
 * Exemple 2: Fintech premium avec IA
 */
function exempleFinTechPremium() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var apiKeys, designAgent, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('🏦 === EXEMPLE 2: FinTech Premium ===');
                    apiKeys = {
                        openai: process.env.OPENAI_API_KEY || 'demo-key',
                        figma: process.env.FIGMA_API_KEY || 'demo-key'
                    };
                    designAgent = design_agent_v2_1.DesignAgentV2Factory.createPremium('NeoBank', 'finance', apiKeys);
                    // Configuration personnalisée
                    designAgent.updateConfig({
                        branding: {
                            businessName: 'NeoBank',
                            primaryColor: '#1e40af',
                            brandPersonality: 'creative'
                        },
                        preferences: {
                            useAIImages: true,
                            figmaIntegration: true,
                            generateVariations: true,
                            exportFormats: ['html', 'css', 'tailwind', 'figma-tokens']
                        }
                    });
                    return [4 /*yield*/, designAgent.generateCompleteProject()];
                case 1:
                    result = _b.sent();
                    console.log('✅ Projet premium généré:');
                    console.log("- Images IA: ".concat(result.images.generated.length));
                    console.log("- Variations: ".concat(((_a = result.templates.variations) === null || _a === void 0 ? void 0 : _a.length) || 0));
                    console.log("- Tokens: ".concat(result.metrics.designTokens));
                    console.log("- Exports: ".concat(Object.keys(result.exports).join(', ')));
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.exempleFinTechPremium = exempleFinTechPremium;
/**
 * Exemple 3: E-learning avec import Figma
 */
function exempleELearningFigma() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var designAgent, figmaUrl, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('🎓 === EXEMPLE 3: E-Learning avec Figma ===');
                    designAgent = new design_agent_v2_1.DesignAgentV2({
                        name: 'LearnTech Platform',
                        sector: 'elearning',
                        style: 'moderne',
                        apiKeys: {
                            figma: process.env.FIGMA_API_KEY || 'demo-key',
                            openai: process.env.OPENAI_API_KEY || 'demo-key'
                        },
                        preferences: {
                            useAIImages: true,
                            figmaIntegration: true,
                            generateVariations: false,
                            exportFormats: ['html', 'css', 'figma-tokens']
                        },
                        branding: {
                            businessName: 'LearnTech',
                            primaryColor: '#8b5cf6',
                            brandPersonality: 'creative'
                        }
                    });
                    figmaUrl = 'https://www.figma.com/file/demo123/education-template';
                    return [4 /*yield*/, designAgent.generateCompleteProject(figmaUrl)];
                case 1:
                    result = _c.sent();
                    console.log('✅ Projet avec Figma:');
                    console.log("- Import Figma: ".concat(((_a = result.figmaImport) === null || _a === void 0 ? void 0 : _a.success) ? 'Succès' : 'Échec'));
                    console.log("- Composants: ".concat(((_b = result.figmaImport) === null || _b === void 0 ? void 0 : _b.components.length) || 0));
                    console.log("- Temps total: ".concat(result.metrics.generationTime, "ms"));
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.exempleELearningFigma = exempleELearningFigma;
/**
 * Exemple 4: Agence immobilière - Génération par étapes
 */
function exempleImmobilierEtapes() {
    return __awaiter(this, void 0, void 0, function () {
        var designAgent, designSystem, images, fullResult, htmlExport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🏘️ === EXEMPLE 4: Immobilier par étapes ===');
                    designAgent = design_agent_v2_1.DesignAgentV2Factory.createForSector('immobilier', 'Prestige Immobilier', {
                        style: 'classique',
                        primaryColor: '#1e3a8a',
                        useAI: true,
                        apiKeys: { openai: process.env.OPENAI_API_KEY || 'demo-key' }
                    });
                    // Étape 1: Génération du système de design uniquement
                    console.log('⚡ Génération design system...');
                    designSystem = designAgent.generateDesignSystemOnly();
                    console.log("- Tokens g\u00E9n\u00E9r\u00E9s: ".concat(designSystem.tokens.length));
                    // Étape 2: Génération des images uniquement
                    console.log('🖼️ Génération images...');
                    return [4 /*yield*/, designAgent.generateImagesOnly()];
                case 1:
                    images = _a.sent();
                    console.log("- Images IA: ".concat(images.generated.length));
                    console.log("- Fallbacks: ".concat(images.fallbacks.length));
                    // Étape 3: Génération complète
                    console.log('🏗️ Génération complète...');
                    return [4 /*yield*/, designAgent.generateCompleteProject()];
                case 2:
                    fullResult = _a.sent();
                    htmlExport = designAgent.exportTemplate(fullResult.templates.main, 'html');
                    console.log("- Export HTML: ".concat(htmlExport.length, " caract\u00E8res"));
                    return [2 /*return*/, fullResult];
            }
        });
    });
}
exports.exempleImmobilierEtapes = exempleImmobilierEtapes;
/**
 * Exemple 5: Startup Tech avec toutes les variations
 */
function exempleStartupTechVariations() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var designAgent, result, stats;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('🚀 === EXEMPLE 5: Startup Tech Variations ===');
                    designAgent = new design_agent_v2_1.DesignAgentV2({
                        name: 'AI Startup',
                        sector: 'tech',
                        style: 'moderne',
                        apiKeys: {
                            openai: process.env.OPENAI_API_KEY || 'demo-key'
                        },
                        preferences: {
                            useAIImages: true,
                            figmaIntegration: false,
                            generateVariations: true, // IMPORTANT: génère toutes les variations
                            exportFormats: ['html', 'css', 'tailwind']
                        },
                        branding: {
                            businessName: 'AI Innovate',
                            primaryColor: '#6366f1',
                            brandPersonality: 'creative'
                        }
                    });
                    return [4 /*yield*/, designAgent.generateCompleteProject()];
                case 1:
                    result = _b.sent();
                    console.log('✅ Projet avec variations:');
                    console.log("- Template principal: ".concat(result.style));
                    console.log("- Variations disponibles:");
                    (_a = result.templates.variations) === null || _a === void 0 ? void 0 : _a.forEach(function (variation) {
                        console.log("  \u2022 Style ".concat(variation.style, ": ").concat(variation.html.length, " chars"));
                    });
                    stats = designAgent.getPerformanceStats();
                    console.log('📊 Stats de performance:');
                    console.log("- Temps moyen: ".concat(stats.averageGenerationTime, "ms"));
                    console.log("- Taux de succ\u00E8s: ".concat(stats.successRate, "%"));
                    console.log("- Score optimisation: ".concat(stats.optimizationScore, "%"));
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.exempleStartupTechVariations = exempleStartupTechVariations;
/**
 * Test de comparaison entre secteurs
 */
function compareSecteursPerformance() {
    return __awaiter(this, void 0, void 0, function () {
        var secteurs, resultats, _i, secteurs_1, secteur, startTime, agent, result, temps, tempsTotal, scoreMoyen;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('📊 === COMPARAISON SECTEURS ===');
                    secteurs = ['sante', 'finance', 'elearning', 'immobilier', 'tech'];
                    resultats = [];
                    _i = 0, secteurs_1 = secteurs;
                    _a.label = 1;
                case 1:
                    if (!(_i < secteurs_1.length)) return [3 /*break*/, 4];
                    secteur = secteurs_1[_i];
                    startTime = Date.now();
                    agent = design_agent_v2_1.DesignAgentV2Factory.createMVP("Demo ".concat(secteur), secteur);
                    return [4 /*yield*/, agent.generateCompleteProject()];
                case 2:
                    result = _a.sent();
                    temps = Date.now() - startTime;
                    resultats.push({
                        secteur: secteur,
                        temps: temps,
                        score: result.metrics.optimizationScore,
                        tokens: result.metrics.designTokens
                    });
                    console.log("\u2705 ".concat(secteur, ": ").concat(temps, "ms, score ").concat(result.metrics.optimizationScore, "%"));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    tempsTotal = resultats.reduce(function (sum, r) { return sum + r.temps; }, 0);
                    scoreMoyen = resultats.reduce(function (sum, r) { return sum + r.score; }, 0) / resultats.length;
                    console.log('\n📈 Analyse globale:');
                    console.log("- Temps total: ".concat(tempsTotal, "ms"));
                    console.log("- Score moyen: ".concat(scoreMoyen.toFixed(1), "%"));
                    console.log("- Secteur le plus rapide: ".concat(resultats.sort(function (a, b) { return a.temps - b.temps; })[0].secteur));
                    console.log("- Meilleur score: ".concat(resultats.sort(function (a, b) { return b.score - a.score; })[0].secteur));
                    return [2 /*return*/, resultats];
            }
        });
    });
}
exports.compareSecteursPerformance = compareSecteursPerformance;
/**
 * Démo interactive
 */
function demoInteractive() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🎯 === DÉMO INTERACTIVE DESIGN AGENT V2 ===\n');
                    console.log('Fonctionnalités disponibles:');
                    console.log('1. 🏥 Clinique MVP (rapide)');
                    console.log('2. 🏦 FinTech Premium (avec IA)');
                    console.log('3. 🎓 E-Learning (avec Figma)');
                    console.log('4. 🏘️ Immobilier (par étapes)');
                    console.log('5. 🚀 Startup Tech (toutes variations)');
                    console.log('6. 📊 Comparaison secteurs');
                    console.log('7. 🔄 Tous les exemples\n');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    console.log('🚀 Démarrage de tous les exemples...\n');
                    return [4 /*yield*/, exempleClinicMVP()];
                case 2:
                    _a.sent();
                    console.log('\n' + '='.repeat(50) + '\n');
                    return [4 /*yield*/, exempleFinTechPremium()];
                case 3:
                    _a.sent();
                    console.log('\n' + '='.repeat(50) + '\n');
                    return [4 /*yield*/, exempleELearningFigma()];
                case 4:
                    _a.sent();
                    console.log('\n' + '='.repeat(50) + '\n');
                    return [4 /*yield*/, exempleImmobilierEtapes()];
                case 5:
                    _a.sent();
                    console.log('\n' + '='.repeat(50) + '\n');
                    return [4 /*yield*/, exempleStartupTechVariations()];
                case 6:
                    _a.sent();
                    console.log('\n' + '='.repeat(50) + '\n');
                    return [4 /*yield*/, compareSecteursPerformance()];
                case 7:
                    _a.sent();
                    console.log('\n🎉 === DÉMO TERMINÉE ===');
                    console.log('✅ Toutes les fonctionnalités ont été testées avec succès!');
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('❌ Erreur durant la démo:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.demoInteractive = demoInteractive;
// Exécution de la démo si ce fichier est exécuté directement
if (require.main === module) {
    demoInteractive().catch(console.error);
}
