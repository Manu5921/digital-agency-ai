"use strict";
/**
 * Tests de Validation Agent SEO Phase 2
 * Vérification du bon fonctionnement des 4 modules
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
exports.runSEOPhase2Tests = exports.SEOPhase2Tester = void 0;
var index_1 = require("./index");
var SEOPhase2Tester = /** @class */ (function () {
    function SEOPhase2Tester() {
        this.results = [];
    }
    SEOPhase2Tester.prototype.runAllTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🧪 TESTS DE VALIDATION AGENT SEO PHASE 2');
                        console.log('='.repeat(50));
                        // Tests des 4 modules principaux
                        return [4 /*yield*/, this.testContentAIGenerator()];
                    case 1:
                        // Tests des 4 modules principaux
                        _a.sent();
                        return [4 /*yield*/, this.testKeywordResearch()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.testContentCalendar()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.testSEOMonitoring()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.testOrchestrator()];
                    case 5:
                        _a.sent();
                        // Résumé des résultats
                        this.displayResults();
                        return [2 /*return*/];
                }
            });
        });
    };
    SEOPhase2Tester.prototype.testContentAIGenerator = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var startTime, content, duration, blogPost, validations, success, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('\n🤖 Test Content AI Generator...');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        startTime = Date.now();
                        return [4 /*yield*/, index_1.default.generateAIContent('restaurant', ['blog_post'], ['restaurant gastronomique paris', 'cuisine française'])];
                    case 2:
                        content = _b.sent();
                        duration = Date.now() - startTime;
                        blogPost = content['blog_post'];
                        validations = {
                            contentGenerated: Object.keys(content).length > 0,
                            titlePresent: (blogPost === null || blogPost === void 0 ? void 0 : blogPost.title) && blogPost.title.length > 0,
                            contentLength: (blogPost === null || blogPost === void 0 ? void 0 : blogPost.content) && blogPost.content.length > 500,
                            seoScore: (blogPost === null || blogPost === void 0 ? void 0 : blogPost.seoScore) && blogPost.seoScore > 70,
                            metaDescription: (blogPost === null || blogPost === void 0 ? void 0 : blogPost.metaDescription) && blogPost.metaDescription.length > 100,
                            keywordIntegration: (blogPost === null || blogPost === void 0 ? void 0 : blogPost.keywordAnalysis) && Object.keys(blogPost.keywordAnalysis.density).length > 0
                        };
                        success = Object.values(validations).every(function (v) { return v; });
                        this.results.push({
                            module: 'Content AI Generator',
                            test: 'Génération contenu optimisé',
                            success: success,
                            duration: duration,
                            details: {
                                contentTypes: Object.keys(content),
                                seoScore: blogPost === null || blogPost === void 0 ? void 0 : blogPost.seoScore,
                                wordCount: (_a = blogPost === null || blogPost === void 0 ? void 0 : blogPost.content) === null || _a === void 0 ? void 0 : _a.split(' ').length,
                                validations: validations
                            }
                        });
                        console.log(success ? '✅ Content AI Generator: OK' : '❌ Content AI Generator: FAILED');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        this.results.push({
                            module: 'Content AI Generator',
                            test: 'Génération contenu optimisé',
                            success: false,
                            duration: 0,
                            details: {},
                            error: error_1.message
                        });
                        console.log('❌ Content AI Generator: ERROR -', error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SEOPhase2Tester.prototype.testKeywordResearch = function () {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var startTime, research, duration, validations, success, error_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        console.log('\n🔍 Test Keyword Research...');
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        startTime = Date.now();
                        return [4 /*yield*/, index_1.default.performAdvancedKeywordResearch(['restaurant gastronomique'], ['concurrent1.fr'])];
                    case 2:
                        research = _f.sent();
                        duration = Date.now() - startTime;
                        validations = {
                            seedKeywords: research.seedKeywords && research.seedKeywords.length > 0,
                            longTailKeywords: research.longTailKeywords && research.longTailKeywords.length > 0,
                            competitorAnalysis: research.competitorAnalysis && research.competitorAnalysis.length > 0,
                            recommendations: research.recommendations && research.recommendations.quickWins.length > 0,
                            keywordData: research.seedKeywords[0] &&
                                research.seedKeywords[0].searchVolume > 0 &&
                                research.seedKeywords[0].difficulty >= 0
                        };
                        success = Object.values(validations).every(function (v) { return v; });
                        this.results.push({
                            module: 'Keyword Research',
                            test: 'Recherche automatisée',
                            success: success,
                            duration: duration,
                            details: {
                                seedCount: (_a = research.seedKeywords) === null || _a === void 0 ? void 0 : _a.length,
                                longTailCount: (_b = research.longTailKeywords) === null || _b === void 0 ? void 0 : _b.length,
                                competitorCount: (_c = research.competitorAnalysis) === null || _c === void 0 ? void 0 : _c.length,
                                quickWinsCount: (_e = (_d = research.recommendations) === null || _d === void 0 ? void 0 : _d.quickWins) === null || _e === void 0 ? void 0 : _e.length,
                                validations: validations
                            }
                        });
                        console.log(success ? '✅ Keyword Research: OK' : '❌ Keyword Research: FAILED');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _f.sent();
                        this.results.push({
                            module: 'Keyword Research',
                            test: 'Recherche automatisée',
                            success: false,
                            duration: 0,
                            details: {},
                            error: error_2.message
                        });
                        console.log('❌ Keyword Research: ERROR -', error_2.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SEOPhase2Tester.prototype.testContentCalendar = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var startTime, calendar, duration, validations, success, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('\n📅 Test Content Calendar...');
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        startTime = Date.now();
                        return [4 /*yield*/, index_1.default.generateIntelligentContentCalendar(undefined, 3 // 3 articles/mois pour test rapide
                            )];
                    case 2:
                        calendar = _d.sent();
                        duration = Date.now() - startTime;
                        validations = {
                            itemsGenerated: calendar.items && calendar.items.length > 0,
                            monthlyDistribution: calendar.monthlyPlan && Object.keys(calendar.monthlyPlan).length === 12,
                            seasonalPlan: calendar.seasonalPlan && Object.keys(calendar.seasonalPlan).length > 0,
                            metricsCalculated: calendar.metrics && calendar.metrics.totalItems > 0,
                            futureContent: calendar.items.some(function (item) { return item.publishDate > new Date(); }),
                            contentTypes: calendar.items.some(function (item) { return ['blog_post', 'seasonal_content'].includes(item.type); })
                        };
                        success = Object.values(validations).every(function (v) { return v; });
                        this.results.push({
                            module: 'Content Calendar',
                            test: 'Planification 12 mois',
                            success: success,
                            duration: duration,
                            details: {
                                totalItems: (_a = calendar.items) === null || _a === void 0 ? void 0 : _a.length,
                                monthsPlanned: Object.keys(calendar.monthlyPlan || {}).length,
                                estimatedTraffic: (_b = calendar.metrics) === null || _b === void 0 ? void 0 : _b.estimatedTotalTraffic,
                                contentTypes: (_c = calendar.metrics) === null || _c === void 0 ? void 0 : _c.byType,
                                validations: validations
                            }
                        });
                        console.log(success ? '✅ Content Calendar: OK' : '❌ Content Calendar: FAILED');
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _d.sent();
                        this.results.push({
                            module: 'Content Calendar',
                            test: 'Planification 12 mois',
                            success: false,
                            duration: 0,
                            details: {},
                            error: error_3.message
                        });
                        console.log('❌ Content Calendar: ERROR -', error_3.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SEOPhase2Tester.prototype.testSEOMonitoring = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var startTime, dashboard, duration, validations, success, error_4;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('\n📈 Test SEO Monitoring...');
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        startTime = Date.now();
                        return [4 /*yield*/, index_1.default.startAdvancedSEOMonitoring('https://test-restaurant.fr')];
                    case 2:
                        dashboard = _e.sent();
                        duration = Date.now() - startTime;
                        validations = {
                            dashboardGenerated: dashboard && typeof dashboard === 'object',
                            overviewMetrics: dashboard.overview &&
                                typeof dashboard.overview.technicalScore === 'number' &&
                                typeof dashboard.overview.totalTraffic === 'number',
                            trendsData: dashboard.trends &&
                                Array.isArray(dashboard.trends.positionTrend) &&
                                dashboard.trends.positionTrend.length > 0,
                            topMovers: dashboard.topMovers &&
                                Array.isArray(dashboard.topMovers.gainers) &&
                                Array.isArray(dashboard.topMovers.losers),
                            nextActions: dashboard.nextActions &&
                                Array.isArray(dashboard.nextActions) &&
                                dashboard.nextActions.length > 0
                        };
                        success = Object.values(validations).every(function (v) { return v; });
                        this.results.push({
                            module: 'SEO Monitoring',
                            test: 'Dashboard et tracking',
                            success: success,
                            duration: duration,
                            details: {
                                technicalScore: (_a = dashboard.overview) === null || _a === void 0 ? void 0 : _a.technicalScore,
                                totalTraffic: (_b = dashboard.overview) === null || _b === void 0 ? void 0 : _b.totalTraffic,
                                alertsCount: (_c = dashboard.alerts) === null || _c === void 0 ? void 0 : _c.length,
                                actionsCount: (_d = dashboard.nextActions) === null || _d === void 0 ? void 0 : _d.length,
                                validations: validations
                            }
                        });
                        console.log(success ? '✅ SEO Monitoring: OK' : '❌ SEO Monitoring: FAILED');
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _e.sent();
                        this.results.push({
                            module: 'SEO Monitoring',
                            test: 'Dashboard et tracking',
                            success: false,
                            duration: 0,
                            details: {},
                            error: error_4.message
                        });
                        console.log('❌ SEO Monitoring: ERROR -', error_4.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SEOPhase2Tester.prototype.testOrchestrator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, campaign, duration, validations, success, activeCampaigns, campaignStatus, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('\n🎼 Test Orchestrateur SEO...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        startTime = Date.now();
                        return [4 /*yield*/, index_1.default.launchAdvancedSEOCampaign({
                                seoGoals: {
                                    targetTraffic: 5000,
                                    targetKeywords: 20,
                                    timeframe: 3,
                                    priorityPages: ['/test']
                                },
                                contentStrategy: {
                                    publicationFrequency: 2,
                                    contentTypes: ['test-content'],
                                    seasons: ['test-season']
                                }
                            })];
                    case 2:
                        campaign = _a.sent();
                        duration = Date.now() - startTime;
                        validations = {
                            campaignCreated: campaign && campaign.campaignId,
                            componentsGenerated: campaign.components &&
                                campaign.components.keywordResearch &&
                                campaign.components.contentCalendar,
                            metricsCalculated: campaign.metrics &&
                                typeof campaign.metrics.keywordDifficulty === 'number',
                            timelineGenerated: campaign.timeline &&
                                Array.isArray(campaign.timeline) &&
                                campaign.timeline.length > 0,
                            trafficEstimated: campaign.expectedTraffic > 0,
                            keywordsGenerated: campaign.generatedKeywords > 0
                        };
                        success = Object.values(validations).every(function (v) { return v; });
                        activeCampaigns = index_1.default.getActiveCampaigns();
                        return [4 /*yield*/, index_1.default.getCampaignStatus(campaign.campaignId)];
                    case 3:
                        campaignStatus = _a.sent();
                        this.results.push({
                            module: 'SEO Orchestrator',
                            test: 'Campagne complète',
                            success: success && activeCampaigns.includes(campaign.campaignId) && !!campaignStatus,
                            duration: duration,
                            details: {
                                campaignId: campaign.campaignId,
                                generatedKeywords: campaign.generatedKeywords,
                                plannedContent: campaign.plannedContent,
                                expectedTraffic: campaign.expectedTraffic,
                                activeCampaigns: activeCampaigns.length,
                                validations: validations
                            }
                        });
                        console.log(success ? '✅ SEO Orchestrator: OK' : '❌ SEO Orchestrator: FAILED');
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        this.results.push({
                            module: 'SEO Orchestrator',
                            test: 'Campagne complète',
                            success: false,
                            duration: 0,
                            details: {},
                            error: error_5.message
                        });
                        console.log('❌ SEO Orchestrator: ERROR -', error_5.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SEOPhase2Tester.prototype.displayResults = function () {
        console.log('\n' + '='.repeat(50));
        console.log('📊 RÉSULTATS DES TESTS');
        console.log('='.repeat(50));
        var totalTests = this.results.length;
        var passedTests = this.results.filter(function (r) { return r.success; }).length;
        var failedTests = totalTests - passedTests;
        var totalDuration = this.results.reduce(function (sum, r) { return sum + r.duration; }, 0);
        console.log("\n\uD83D\uDCC8 R\u00E9sum\u00E9 Global:");
        console.log("   Tests pass\u00E9s: ".concat(passedTests, "/").concat(totalTests, " (").concat(Math.round(passedTests / totalTests * 100), "%)"));
        console.log("   Tests \u00E9chou\u00E9s: ".concat(failedTests));
        console.log("   Dur\u00E9e totale: ".concat(totalDuration, "ms (").concat(Math.round(totalDuration / 1000), "s)"));
        console.log("\n\uD83D\uDCCB D\u00E9tail par Module:");
        this.results.forEach(function (result) {
            var status = result.success ? '✅' : '❌';
            var duration = "".concat(result.duration, "ms");
            console.log("   ".concat(status, " ").concat(result.module, ": ").concat(result.test, " (").concat(duration, ")"));
            if (!result.success && result.error) {
                console.log("      Erreur: ".concat(result.error));
            }
            if (result.details && Object.keys(result.details).length > 0) {
                var details = JSON.stringify(result.details, null, 2)
                    .split('\n')
                    .map(function (line) { return "      ".concat(line); })
                    .join('\n');
                console.log("      D\u00E9tails: ".concat(details.substring(0, 200), "..."));
            }
        });
        // Recommandations
        console.log("\n\uD83D\uDCA1 Recommandations:");
        if (passedTests === totalTests) {
            console.log('   🎉 Tous les tests passent! Agent SEO Phase 2 prêt pour la production.');
        }
        else {
            console.log("   \u26A0\uFE0F  ".concat(failedTests, " test(s) \u00E0 corriger avant mise en production."));
            var failedModules = this.results
                .filter(function (r) { return !r.success; })
                .map(function (r) { return r.module; });
            console.log("   \uD83D\uDCDD Modules \u00E0 v\u00E9rifier: ".concat(failedModules.join(', ')));
        }
        // Performance
        var avgDuration = totalDuration / totalTests;
        if (avgDuration > 5000) {
            console.log("   \u23F1\uFE0F  Performance: Temps moyen \u00E9lev\u00E9 (".concat(Math.round(avgDuration), "ms). Optimisation recommand\u00E9e."));
        }
        else {
            console.log("   \u26A1 Performance: Temps moyen acceptable (".concat(Math.round(avgDuration), "ms)."));
        }
        console.log('\n🚀 Agent SEO Phase 2 - Tests terminés!');
    };
    // Méthode pour tests unitaires spécifiques
    SEOPhase2Tester.prototype.testSpecificModule = function (moduleName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = moduleName.toLowerCase();
                        switch (_a) {
                            case 'content': return [3 /*break*/, 1];
                            case 'keyword': return [3 /*break*/, 3];
                            case 'calendar': return [3 /*break*/, 5];
                            case 'monitoring': return [3 /*break*/, 7];
                            case 'orchestrator': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 1: return [4 /*yield*/, this.testContentAIGenerator()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 3: return [4 /*yield*/, this.testKeywordResearch()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, this.testContentCalendar()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.testSEOMonitoring()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, this.testOrchestrator()];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        console.log("\u274C Module inconnu: ".concat(moduleName));
                        return [2 /*return*/, null];
                    case 12: return [2 /*return*/, this.results[this.results.length - 1]];
                }
            });
        });
    };
    // Benchmark de performance
    SEOPhase2Tester.prototype.benchmarkPerformance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var iterations, benchmarks, i, startTime, contentTime, keywordStart, keywordTime, avgContentTime, avgKeywordTime, contentThreshold, keywordThreshold;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('\n⚡ BENCHMARK DE PERFORMANCE');
                        console.log('-'.repeat(30));
                        iterations = 3;
                        benchmarks = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < iterations)) return [3 /*break*/, 5];
                        console.log("\nIt\u00E9ration ".concat(i + 1, "/").concat(iterations, "..."));
                        startTime = Date.now();
                        // Test de génération de contenu
                        return [4 /*yield*/, index_1.default.generateAIContent('restaurant', ['blog_post'], ['test keyword'])];
                    case 2:
                        // Test de génération de contenu
                        _a.sent();
                        contentTime = Date.now() - startTime;
                        keywordStart = Date.now();
                        return [4 /*yield*/, index_1.default.performAdvancedKeywordResearch(['test'])];
                    case 3:
                        _a.sent();
                        keywordTime = Date.now() - keywordStart;
                        benchmarks.push({ contentTime: contentTime, keywordTime: keywordTime });
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        avgContentTime = benchmarks.reduce(function (sum, b) { return sum + b.contentTime; }, 0) / iterations;
                        avgKeywordTime = benchmarks.reduce(function (sum, b) { return sum + b.keywordTime; }, 0) / iterations;
                        console.log("\n\uD83D\uDCCA R\u00E9sultats Benchmark:");
                        console.log("   G\u00E9n\u00E9ration contenu: ".concat(Math.round(avgContentTime), "ms (moyenne)"));
                        console.log("   Recherche mots-cl\u00E9s: ".concat(Math.round(avgKeywordTime), "ms (moyenne)"));
                        contentThreshold = 10000;
                        keywordThreshold = 5000;
                        if (avgContentTime > contentThreshold) {
                            console.log("   \u26A0\uFE0F  G\u00E9n\u00E9ration contenu lente (>".concat(contentThreshold, "ms)"));
                        }
                        if (avgKeywordTime > keywordThreshold) {
                            console.log("   \u26A0\uFE0F  Recherche mots-cl\u00E9s lente (>".concat(keywordThreshold, "ms)"));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SEOPhase2Tester;
}());
exports.SEOPhase2Tester = SEOPhase2Tester;
// Fonction principale de test
function runSEOPhase2Tests() {
    return __awaiter(this, void 0, void 0, function () {
        var tester, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tester = new SEOPhase2Tester();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // Tests complets
                    return [4 /*yield*/, tester.runAllTests()];
                case 2:
                    // Tests complets
                    _a.sent();
                    // Benchmark de performance
                    return [4 /*yield*/, tester.benchmarkPerformance()];
                case 3:
                    // Benchmark de performance
                    _a.sent();
                    console.log('\n✅ Validation Phase 2 terminée avec succès!');
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _a.sent();
                    console.error('\n❌ Erreur lors des tests:', error_6);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.runSEOPhase2Tests = runSEOPhase2Tests;
// Exécution automatique si lancé directement
if (require.main === module) {
    runSEOPhase2Tests()
        .then(function () { return process.exit(0); })
        .catch(function (error) {
        console.error('Erreur fatale:', error);
        process.exit(1);
    });
}
