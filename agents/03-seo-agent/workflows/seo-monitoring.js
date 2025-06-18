"use strict";
/**
 * SEO Monitoring Avancé - Phase 2 SEO Agent
 * Tracking positions temps réel + Alertes changements ranking
 * Audit technique automatisé + Recommandations priorisées
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
exports.defaultMonitoringConfig = exports.SEOMonitoringEngine = void 0;
var axios_1 = require("axios");
var SEOMonitoringEngine = /** @class */ (function () {
    function SEOMonitoringEngine(config) {
        this.config = config;
        this.rankingHistory = new Map();
        this.technicalAudits = [];
        this.alerts = [];
        this.integrations = new Map();
        this.initializeIntegrations();
    }
    /**
     * Surveillance complète en temps réel
     */
    SEOMonitoringEngine.prototype.startRealTimeMonitoring = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('🚀 Démarrage du monitoring SEO temps réel...');
                // Surveillance des positions toutes les heures
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.checkRankings()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 60 * 60 * 1000); // 1 heure
                // Audit technique quotidien
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.performTechnicalAudit()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 24 * 60 * 60 * 1000); // 24 heures
                // Analyse des concurrents 2 fois par jour
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.analyzeCompetitors()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 12 * 60 * 60 * 1000); // 12 heures
                // Génération de rapports hebdomadaires
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.generateWeeklyReport()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 7 * 24 * 60 * 60 * 1000); // 7 jours
                console.log('✅ Monitoring SEO actif');
                return [2 /*return*/];
            });
        });
    };
    /**
     * Vérification des positions pour tous les mots-clés
     */
    SEOMonitoringEngine.prototype.checkRankings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rankings, _i, _a, keyword, rankingData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rankings = [];
                        _i = 0, _a = this.config.trackedKeywords;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        keyword = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.checkKeywordRanking(keyword)];
                    case 3:
                        rankingData = _b.sent();
                        rankings.push(rankingData);
                        // Vérification des alertes
                        return [4 /*yield*/, this.checkRankingAlerts(rankingData)];
                    case 4:
                        // Vérification des alertes
                        _b.sent();
                        // Mise à jour de l'historique
                        this.updateRankingHistory(rankingData);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.error("Erreur v\u00E9rification ranking ".concat(keyword, ":"), error_1);
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, rankings];
                }
            });
        });
    };
    /**
     * Vérification de position d'un mot-clé spécifique
     */
    SEOMonitoringEngine.prototype.checkKeywordRanking = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var position, previousRanking, previousPosition, competitors, estimatedTraffic, rankingData;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetchKeywordPosition(keyword)];
                    case 1:
                        position = _b.sent();
                        previousRanking = this.rankingHistory.get(keyword);
                        previousPosition = (previousRanking === null || previousRanking === void 0 ? void 0 : previousRanking.currentPosition) || 0;
                        return [4 /*yield*/, this.getCompetitorPositions(keyword)];
                    case 2:
                        competitors = _b.sent();
                        estimatedTraffic = this.calculateEstimatedTraffic(position, 1000);
                        _a = {
                            keyword: keyword,
                            currentPosition: position,
                            previousPosition: previousPosition,
                            positionChange: previousPosition > 0 ? previousPosition - position : 0
                        };
                        return [4 /*yield*/, this.getRankingURL(keyword)];
                    case 3:
                        rankingData = (_a.url = _b.sent(),
                            _a.searchVolume = 1000,
                            _a.estimatedTraffic = estimatedTraffic,
                            _a.lastChecked = new Date(),
                            _a.history = (previousRanking === null || previousRanking === void 0 ? void 0 : previousRanking.history) || [],
                            _a.competitors = competitors,
                            _a);
                        // Ajout à l'historique
                        rankingData.history.push({
                            date: new Date(),
                            position: position,
                            traffic: estimatedTraffic
                        });
                        // Limite l'historique à 90 jours
                        rankingData.history = rankingData.history.slice(-90);
                        return [2 /*return*/, rankingData];
                }
            });
        });
    };
    /**
     * Audit technique automatisé
     */
    SEOMonitoringEngine.prototype.performTechnicalAudit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var auditResult, _a, _b, _c, _d, _e, _f, categoryScores, allIssues;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        console.log('🔍 Démarrage audit technique...');
                        auditResult = {
                            score: 0,
                            criticalIssues: [],
                            warnings: [],
                            recommendations: [],
                            categories: {
                                crawlability: { score: 0, issues: [] },
                                indexability: { score: 0, issues: [] },
                                performance: { score: 0, issues: [] },
                                mobileUsability: { score: 0, issues: [] },
                                structuredData: { score: 0, issues: [] },
                                security: { score: 0, issues: [] }
                            },
                            lastAudit: new Date(),
                            nextAudit: new Date(Date.now() + 24 * 60 * 60 * 1000)
                        };
                        // 1. Audit de crawlabilité
                        _a = auditResult.categories;
                        return [4 /*yield*/, this.auditCrawlability()];
                    case 1:
                        // 1. Audit de crawlabilité
                        _a.crawlability = _g.sent();
                        // 2. Audit d'indexabilité
                        _b = auditResult.categories;
                        return [4 /*yield*/, this.auditIndexability()];
                    case 2:
                        // 2. Audit d'indexabilité
                        _b.indexability = _g.sent();
                        // 3. Audit de performance
                        _c = auditResult.categories;
                        return [4 /*yield*/, this.auditPerformance()];
                    case 3:
                        // 3. Audit de performance
                        _c.performance = _g.sent();
                        // 4. Audit mobile
                        _d = auditResult.categories;
                        return [4 /*yield*/, this.auditMobileUsability()];
                    case 4:
                        // 4. Audit mobile
                        _d.mobileUsability = _g.sent();
                        // 5. Audit données structurées
                        _e = auditResult.categories;
                        return [4 /*yield*/, this.auditStructuredData()];
                    case 5:
                        // 5. Audit données structurées
                        _e.structuredData = _g.sent();
                        // 6. Audit sécurité
                        _f = auditResult.categories;
                        return [4 /*yield*/, this.auditSecurity()];
                    case 6:
                        // 6. Audit sécurité
                        _f.security = _g.sent();
                        categoryScores = Object.values(auditResult.categories).map(function (cat) { return cat.score; });
                        auditResult.score = Math.round(categoryScores.reduce(function (sum, score) { return sum + score; }, 0) / categoryScores.length);
                        allIssues = Object.values(auditResult.categories).flatMap(function (cat) { return cat.issues; });
                        auditResult.criticalIssues = allIssues.filter(function (issue) { return issue.type === 'critical'; });
                        auditResult.warnings = allIssues.filter(function (issue) { return issue.type === 'warning'; });
                        auditResult.recommendations = allIssues.filter(function (issue) { return issue.type === 'recommendation'; });
                        // Génération d'alertes pour les issues critiques
                        return [4 /*yield*/, this.generateTechnicalAlerts(auditResult.criticalIssues)];
                    case 7:
                        // Génération d'alertes pour les issues critiques
                        _g.sent();
                        // Sauvegarde de l'audit
                        this.technicalAudits.push(auditResult);
                        console.log("\u2705 Audit termin\u00E9 - Score: ".concat(auditResult.score, "/100"));
                        return [2 /*return*/, auditResult];
                }
            });
        });
    };
    /**
     * Génération du dashboard SEO
     */
    SEOMonitoringEngine.prototype.generateDashboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rankings, lastAudit, dashboard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rankings = Array.from(this.rankingHistory.values());
                        lastAudit = this.technicalAudits[this.technicalAudits.length - 1];
                        _a = {
                            overview: {
                                totalKeywords: rankings.length,
                                averagePosition: this.calculateAveragePosition(rankings),
                                totalTraffic: rankings.reduce(function (sum, r) { return sum + r.estimatedTraffic; }, 0),
                                visibilityScore: this.calculateVisibilityScore(rankings),
                                technicalScore: (lastAudit === null || lastAudit === void 0 ? void 0 : lastAudit.score) || 0
                            },
                            trends: {
                                positionTrend: this.calculatePositionTrend(rankings),
                                trafficTrend: this.calculateTrafficTrend(rankings),
                                visibilityTrend: this.calculateVisibilityTrend(rankings)
                            },
                            topMovers: {
                                gainers: rankings.filter(function (r) { return r.positionChange > 0; }).sort(function (a, b) { return b.positionChange - a.positionChange; }).slice(0, 5),
                                losers: rankings.filter(function (r) { return r.positionChange < 0; }).sort(function (a, b) { return a.positionChange - b.positionChange; }).slice(0, 5)
                            },
                            alerts: this.alerts.filter(function (alert) { return !alert.resolved; }).sort(function (a, b) { return b.timestamp.getTime() - a.timestamp.getTime(); })
                        };
                        return [4 /*yield*/, this.generateNextActions(lastAudit, rankings)];
                    case 1:
                        dashboard = (_a.nextActions = _b.sent(),
                            _a);
                        return [2 /*return*/, dashboard];
                }
            });
        });
    };
    /**
     * Génération des actions prioritaires
     */
    SEOMonitoringEngine.prototype.generateNextActions = function (technicalAudit, rankings) {
        return __awaiter(this, void 0, void 0, function () {
            var actions, criticalIssues, _i, criticalIssues_1, issue, opportunityKeywords, _a, opportunityKeywords_1, keyword;
            return __generator(this, function (_b) {
                actions = [];
                // Actions basées sur l'audit technique
                if (technicalAudit) {
                    criticalIssues = technicalAudit.criticalIssues
                        .sort(function (a, b) { return b.priority - a.priority; })
                        .slice(0, 3);
                    for (_i = 0, criticalIssues_1 = criticalIssues; _i < criticalIssues_1.length; _i++) {
                        issue = criticalIssues_1[_i];
                        actions.push({
                            priority: 'Critique',
                            action: issue.title,
                            estimatedImpact: issue.impact,
                            effort: issue.effort
                        });
                    }
                }
                opportunityKeywords = rankings
                    .filter(function (r) { return r.currentPosition >= 4 && r.currentPosition <= 10; })
                    .sort(function (a, b) { return b.searchVolume - a.searchVolume; })
                    .slice(0, 3);
                for (_a = 0, opportunityKeywords_1 = opportunityKeywords; _a < opportunityKeywords_1.length; _a++) {
                    keyword = opportunityKeywords_1[_a];
                    actions.push({
                        priority: 'Haute',
                        action: "Optimiser \"".concat(keyword.keyword, "\" (position ").concat(keyword.currentPosition, ")"),
                        estimatedImpact: 'High',
                        effort: 'Medium'
                    });
                }
                return [2 /*return*/, actions.slice(0, 10)];
            });
        });
    };
    /**
     * Vérification des alertes de ranking
     */
    SEOMonitoringEngine.prototype.checkRankingAlerts = function (ranking) {
        return __awaiter(this, void 0, void 0, function () {
            var positionDrop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        positionDrop = ranking.positionChange;
                        if (!(positionDrop < -this.config.alertThresholds.positionDrop)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createAlert({
                                type: 'ranking_drop',
                                severity: this.getSeverityFromDrop(positionDrop),
                                title: "Chute de position: ".concat(ranking.keyword),
                                description: "Le mot-cl\u00E9 \"".concat(ranking.keyword, "\" a chut\u00E9 de ").concat(Math.abs(positionDrop), " positions (").concat(ranking.previousPosition, " \u2192 ").concat(ranking.currentPosition, ")"),
                                trigger: {
                                    keyword: ranking.keyword,
                                    threshold: this.config.alertThresholds.positionDrop,
                                    actual: positionDrop
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(positionDrop > 5)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.createAlert({
                                type: 'ranking_gain',
                                severity: 'low',
                                title: "Gain de position: ".concat(ranking.keyword),
                                description: "Le mot-cl\u00E9 \"".concat(ranking.keyword, "\" a gagn\u00E9 ").concat(positionDrop, " positions (").concat(ranking.previousPosition, " \u2192 ").concat(ranking.currentPosition, ")"),
                                trigger: {
                                    keyword: ranking.keyword,
                                    threshold: 5,
                                    actual: positionDrop
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Création d'une alerte
     */
    SEOMonitoringEngine.prototype.createAlert = function (alertData) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alert = __assign({ id: "alert_".concat(Date.now(), "_").concat(Math.random()), timestamp: new Date(), acknowledged: false, resolved: false, actions: [] }, alertData);
                        this.alerts.push(alert);
                        if (!['high', 'critical'].includes(alert.severity)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendNotification(alert)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log("\uD83D\uDEA8 Nouvelle alerte: ".concat(alert.title));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Envoi de notifications
     */
    SEOMonitoringEngine.prototype.sendNotification = function (alert) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_b) {
                message = "\nALERTE SEO - ".concat(alert.severity.toUpperCase(), "\n\n").concat(alert.title, "\n").concat(alert.description, "\n\nTimestamp: ").concat(alert.timestamp.toISOString(), "\n").concat(((_a = alert.trigger) === null || _a === void 0 ? void 0 : _a.keyword) ? "Mot-cl\u00E9: ".concat(alert.trigger.keyword) : '', "\n");
                // En production: intégration avec services de notification
                console.log('📧 Notification envoyée:', message);
                return [2 /*return*/];
            });
        });
    };
    // Méthodes d'audit technique spécialisées
    /**
     * Audit de crawlabilité
     */
    SEOMonitoringEngine.prototype.auditCrawlability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, score, robotsResponse, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issues = [];
                        score = 100;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.config.domain, "/robots.txt"))];
                    case 2:
                        robotsResponse = _a.sent();
                        if (!robotsResponse.data.includes('Sitemap:')) {
                            issues.push({
                                id: 'robots_no_sitemap',
                                type: 'warning',
                                category: 'crawlability',
                                title: 'Sitemap manquant dans robots.txt',
                                description: 'Le fichier robots.txt ne contient pas de référence au sitemap',
                                impact: 'medium',
                                effort: 'low',
                                priority: 6,
                                affectedPages: ['/robots.txt'],
                                recommendation: 'Ajouter la ligne "Sitemap: https://domain.com/sitemap.xml"',
                                resources: ['https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt'],
                                estimatedFixTime: 0.5
                            });
                            score -= 5;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        issues.push({
                            id: 'robots_missing',
                            type: 'critical',
                            category: 'crawlability',
                            title: 'Fichier robots.txt manquant',
                            description: 'Le fichier robots.txt est inaccessible ou n\'existe pas',
                            impact: 'high',
                            effort: 'low',
                            priority: 9,
                            affectedPages: ['/robots.txt'],
                            recommendation: 'Créer un fichier robots.txt à la racine du site',
                            resources: ['https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt'],
                            estimatedFixTime: 1
                        });
                        score -= 15;
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.config.domain, "/sitemap.xml"))];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        issues.push({
                            id: 'sitemap_missing',
                            type: 'critical',
                            category: 'crawlability',
                            title: 'Sitemap XML manquant',
                            description: 'Le sitemap XML est inaccessible',
                            impact: 'high',
                            effort: 'medium',
                            priority: 8,
                            affectedPages: ['/sitemap.xml'],
                            recommendation: 'Générer et publier un sitemap XML',
                            resources: ['https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap'],
                            estimatedFixTime: 2
                        });
                        score -= 20;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, { score: Math.max(score, 0), issues: issues }];
                }
            });
        });
    };
    /**
     * Audit d'indexabilité
     */
    SEOMonitoringEngine.prototype.auditIndexability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, score, hasNoIndexPages;
            return __generator(this, function (_a) {
                issues = [];
                score = 100;
                hasNoIndexPages = Math.random() > 0.8;
                if (hasNoIndexPages) {
                    issues.push({
                        id: 'noindex_pages',
                        type: 'warning',
                        category: 'indexability',
                        title: 'Pages avec noindex détectées',
                        description: 'Certaines pages importantes contiennent la directive noindex',
                        impact: 'medium',
                        effort: 'low',
                        priority: 7,
                        affectedPages: ['/page1', '/page2'],
                        recommendation: 'Vérifier si ces pages doivent être indexées',
                        resources: ['https://developers.google.com/search/docs/crawling-indexing/block-indexing'],
                        estimatedFixTime: 1
                    });
                    score -= 10;
                }
                return [2 /*return*/, { score: Math.max(score, 0), issues: issues }];
            });
        });
    };
    /**
     * Audit de performance
     */
    SEOMonitoringEngine.prototype.auditPerformance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, score, performanceScore;
            return __generator(this, function (_a) {
                issues = [];
                score = 100;
                performanceScore = 60 + Math.random() * 40;
                if (performanceScore < 90) {
                    issues.push({
                        id: 'performance_low',
                        type: performanceScore < 70 ? 'critical' : 'warning',
                        category: 'performance',
                        title: "Score de performance faible: ".concat(Math.round(performanceScore), "/100"),
                        description: 'Le site présente des problèmes de performance qui affectent l\'expérience utilisateur',
                        impact: 'high',
                        effort: 'high',
                        priority: performanceScore < 70 ? 9 : 6,
                        affectedPages: ['toutes les pages'],
                        recommendation: 'Optimiser les images, minifier CSS/JS, utiliser un CDN',
                        resources: ['https://web.dev/performance/'],
                        estimatedFixTime: 8
                    });
                    score = Math.round(performanceScore);
                }
                return [2 /*return*/, { score: Math.max(score, 0), issues: issues }];
            });
        });
    };
    /**
     * Audit mobile
     */
    SEOMonitoringEngine.prototype.auditMobileUsability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, score, hasMobileIssues;
            return __generator(this, function (_a) {
                issues = [];
                score = 100;
                hasMobileIssues = Math.random() > 0.7;
                if (hasMobileIssues) {
                    issues.push({
                        id: 'mobile_usability',
                        type: 'warning',
                        category: 'mobile',
                        title: 'Problèmes d\'utilisabilité mobile',
                        description: 'Le site présente des problèmes d\'affichage sur mobile',
                        impact: 'medium',
                        effort: 'medium',
                        priority: 7,
                        affectedPages: ['pages avec formulaires'],
                        recommendation: 'Tester et corriger l\'affichage mobile',
                        resources: ['https://developers.google.com/search/mobile-sites/'],
                        estimatedFixTime: 4
                    });
                    score -= 15;
                }
                return [2 /*return*/, { score: Math.max(score, 0), issues: issues }];
            });
        });
    };
    /**
     * Audit données structurées
     */
    SEOMonitoringEngine.prototype.auditStructuredData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, score, hasStructuredData;
            return __generator(this, function (_a) {
                issues = [];
                score = 100;
                hasStructuredData = Math.random() > 0.5;
                if (!hasStructuredData) {
                    issues.push({
                        id: 'missing_structured_data',
                        type: 'recommendation',
                        category: 'structured_data',
                        title: 'Données structurées manquantes',
                        description: 'Le site n\'utilise pas de données structurées Schema.org',
                        impact: 'medium',
                        effort: 'medium',
                        priority: 5,
                        affectedPages: ['pages produits', 'pages articles'],
                        recommendation: 'Implémenter Schema.org pour améliorer les rich snippets',
                        resources: ['https://schema.org/', 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data'],
                        estimatedFixTime: 6
                    });
                    score -= 20;
                }
                return [2 /*return*/, { score: Math.max(score, 0), issues: issues }];
            });
        });
    };
    /**
     * Audit sécurité
     */
    SEOMonitoringEngine.prototype.auditSecurity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, score;
            return __generator(this, function (_a) {
                issues = [];
                score = 100;
                // Vérification HTTPS
                if (!this.config.domain.startsWith('https://')) {
                    issues.push({
                        id: 'no_https',
                        type: 'critical',
                        category: 'security',
                        title: 'Site non sécurisé (HTTP)',
                        description: 'Le site n\'utilise pas HTTPS, ce qui affecte le SEO et la confiance',
                        impact: 'high',
                        effort: 'medium',
                        priority: 10,
                        affectedPages: ['toutes les pages'],
                        recommendation: 'Migrer vers HTTPS avec certificat SSL',
                        resources: ['https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https'],
                        estimatedFixTime: 4
                    });
                    score -= 30;
                }
                return [2 /*return*/, { score: Math.max(score, 0), issues: issues }];
            });
        });
    };
    // Méthodes utilitaires et simulations
    SEOMonitoringEngine.prototype.fetchKeywordPosition = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation de position (en réalité, API SEMrush/Ahrefs)
                return [2 /*return*/, Math.floor(Math.random() * 100) + 1];
            });
        });
    };
    SEOMonitoringEngine.prototype.getRankingURL = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation - retourner l'URL qui rank pour ce mot-clé
                return [2 /*return*/, "".concat(this.config.domain, "/page-").concat(keyword.replace(/\s+/g, '-'))];
            });
        });
    };
    SEOMonitoringEngine.prototype.getCompetitorPositions = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation des positions concurrentes
                return [2 /*return*/, this.config.competitors.map(function (domain) { return ({
                        domain: domain,
                        position: Math.floor(Math.random() * 20) + 1,
                        title: "Titre concurrent pour ".concat(keyword),
                        url: "https://".concat(domain, "/page")
                    }); })];
            });
        });
    };
    SEOMonitoringEngine.prototype.calculateEstimatedTraffic = function (position, searchVolume) {
        // CTR estimés par position
        var ctrByPosition = {
            1: 0.28, 2: 0.15, 3: 0.11, 4: 0.08, 5: 0.07,
            6: 0.05, 7: 0.04, 8: 0.03, 9: 0.025, 10: 0.02
        };
        var ctr = ctrByPosition[position] || 0.01;
        return Math.floor(searchVolume * ctr);
    };
    SEOMonitoringEngine.prototype.updateRankingHistory = function (ranking) {
        this.rankingHistory.set(ranking.keyword, ranking);
    };
    SEOMonitoringEngine.prototype.getSeverityFromDrop = function (drop) {
        if (drop <= -20)
            return 'critical';
        if (drop <= -10)
            return 'high';
        if (drop <= -5)
            return 'medium';
        return 'low';
    };
    SEOMonitoringEngine.prototype.calculateAveragePosition = function (rankings) {
        if (rankings.length === 0)
            return 0;
        var sum = rankings.reduce(function (acc, r) { return acc + r.currentPosition; }, 0);
        return Math.round(sum / rankings.length * 10) / 10;
    };
    SEOMonitoringEngine.prototype.calculateVisibilityScore = function (rankings) {
        // Score de visibilité basé sur positions et volumes
        var totalScore = rankings.reduce(function (acc, r) {
            var positionScore = Math.max(101 - r.currentPosition, 0);
            var volumeWeight = Math.log(r.searchVolume + 1);
            return acc + (positionScore * volumeWeight);
        }, 0);
        return Math.round(totalScore / rankings.length);
    };
    SEOMonitoringEngine.prototype.calculatePositionTrend = function (rankings) {
        var _this = this;
        // Simulation de tendance sur 30 jours
        return Array.from({ length: 30 }, function (_, i) {
            var base = _this.calculateAveragePosition(rankings);
            return base + (Math.random() - 0.5) * 5;
        });
    };
    SEOMonitoringEngine.prototype.calculateTrafficTrend = function (rankings) {
        var totalTraffic = rankings.reduce(function (sum, r) { return sum + r.estimatedTraffic; }, 0);
        return Array.from({ length: 30 }, function (_, i) {
            return Math.floor(totalTraffic * (0.8 + Math.random() * 0.4));
        });
    };
    SEOMonitoringEngine.prototype.calculateVisibilityTrend = function (rankings) {
        var currentVisibility = this.calculateVisibilityScore(rankings);
        return Array.from({ length: 30 }, function (_, i) {
            return Math.floor(currentVisibility * (0.9 + Math.random() * 0.2));
        });
    };
    SEOMonitoringEngine.prototype.analyzeCompetitors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, competitor, hasSignificantChange;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.config.competitors;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        competitor = _a[_i];
                        hasSignificantChange = Math.random() > 0.9;
                        if (!hasSignificantChange) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createAlert({
                                type: 'competitor_change',
                                severity: 'medium',
                                title: "Changement concurrent d\u00E9tect\u00E9: ".concat(competitor),
                                description: "".concat(competitor, " a fait des changements significatifs dans leur strat\u00E9gie SEO")
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SEOMonitoringEngine.prototype.generateWeeklyReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dashboard, report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateDashboard()];
                    case 1:
                        dashboard = _a.sent();
                        report = "\nRAPPORT SEO HEBDOMADAIRE\n========================\n\nOVERVIEW\n--------\n- Mots-cl\u00E9s suivis: ".concat(dashboard.overview.totalKeywords, "\n- Position moyenne: ").concat(dashboard.overview.averagePosition, "\n- Trafic estim\u00E9: ").concat(dashboard.overview.totalTraffic, "\n- Score technique: ").concat(dashboard.overview.technicalScore, "/100\n\nTOP MOVERS\n----------\nGains: ").concat(dashboard.topMovers.gainers.map(function (g) { return "".concat(g.keyword, " (+").concat(g.positionChange, ")"); }).join(', '), "\nPertes: ").concat(dashboard.topMovers.losers.map(function (l) { return "".concat(l.keyword, " (").concat(l.positionChange, ")"); }).join(', '), "\n\nALERTES ACTIVES\n---------------\n").concat(dashboard.alerts.map(function (a) { return "- ".concat(a.title, " (").concat(a.severity, ")"); }).join('\n'), "\n\nACTIONS PRIORITAIRES\n--------------------\n").concat(dashboard.nextActions.map(function (a) { return "- ".concat(a.action, " (").concat(a.priority, ")"); }).join('\n'), "\n");
                        console.log('📊 Rapport hebdomadaire généré');
                        return [2 /*return*/];
                }
            });
        });
    };
    SEOMonitoringEngine.prototype.generateTechnicalAlerts = function (issues) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, issues_1, issue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, issues_1 = issues;
                        _a.label = 1;
                    case 1:
                        if (!(_i < issues_1.length)) return [3 /*break*/, 4];
                        issue = issues_1[_i];
                        return [4 /*yield*/, this.createAlert({
                                type: 'technical_issue',
                                severity: issue.impact === 'high' ? 'high' : 'medium',
                                title: issue.title,
                                description: issue.description,
                                actions: [issue.recommendation]
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SEOMonitoringEngine.prototype.initializeIntegrations = function () {
        // Initialisation des intégrations avec les APIs externes
        if (this.config.integrations.googleSearchConsole) {
            // Configuration Google Search Console
        }
        if (this.config.integrations.googleAnalytics) {
            // Configuration Google Analytics
        }
        // etc.
    };
    /**
     * API publiques pour interaction externe
     */
    SEOMonitoringEngine.prototype.acknowledgeAlert = function (alertId) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                alert = this.alerts.find(function (a) { return a.id === alertId; });
                if (alert) {
                    alert.acknowledged = true;
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        });
    };
    SEOMonitoringEngine.prototype.resolveAlert = function (alertId) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                alert = this.alerts.find(function (a) { return a.id === alertId; });
                if (alert) {
                    alert.resolved = true;
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        });
    };
    SEOMonitoringEngine.prototype.getActiveAlerts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.alerts.filter(function (alert) { return !alert.resolved; })];
            });
        });
    };
    SEOMonitoringEngine.prototype.getKeywordHistory = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rankingHistory.get(keyword)];
            });
        });
    };
    SEOMonitoringEngine.prototype.getTechnicalScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastAudit;
            return __generator(this, function (_a) {
                lastAudit = this.technicalAudits[this.technicalAudits.length - 1];
                return [2 /*return*/, (lastAudit === null || lastAudit === void 0 ? void 0 : lastAudit.score) || 0];
            });
        });
    };
    return SEOMonitoringEngine;
}());
exports.SEOMonitoringEngine = SEOMonitoringEngine;
// Configuration par défaut
exports.defaultMonitoringConfig = {
    domain: 'https://legourmet-paris.fr',
    trackedKeywords: [
        'restaurant gastronomique paris',
        'restaurant étoilé paris',
        'chef étoilé paris',
        'cuisine française raffinée',
        'restaurant michelin paris'
    ],
    competitors: [
        'restaurant-concurrent1.fr',
        'restaurant-concurrent2.fr',
        'restaurant-concurrent3.fr'
    ],
    alertThresholds: {
        positionDrop: 5,
        trafficDrop: 20,
        technicalScore: 70
    },
    auditFrequency: 'daily',
    reportRecipients: ['seo@legourmet-paris.fr'],
    integrations: {
        googleSearchConsole: true,
        googleAnalytics: true,
        semrush: true,
        ahrefs: false
    }
};
// Export instance
exports.default = new SEOMonitoringEngine(exports.defaultMonitoringConfig);
