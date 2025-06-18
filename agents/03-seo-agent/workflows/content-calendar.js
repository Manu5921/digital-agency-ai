"use strict";
/**
 * Content Calendar Intelligent - Phase 2 SEO Agent
 * Planification contenu 12 mois automatique avec adaptation saisonnière
 * Intégration événements et tendances + Workflow validation/publication
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
exports.defaultCalendarConfig = exports.ContentCalendarGenerator = void 0;
var ContentCalendarGenerator = /** @class */ (function () {
    function ContentCalendarGenerator() {
        this.initializeIndustryData();
        this.initializeSeasonalPatterns();
        this.initializeHolidays();
    }
    /**
     * Génère un calendrier de contenu complet pour 12 mois
     */
    ContentCalendarGenerator.prototype.generateYearlyCalendar = function (config, keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var currentYear, calendar, seasonalContent, eventContent, evergreenContent;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        currentYear = new Date().getFullYear();
                        calendar = {
                            year: currentYear,
                            items: [],
                            monthlyPlan: {},
                            seasonalPlan: {},
                            eventPlan: {},
                            metrics: {
                                totalItems: 0,
                                byType: {},
                                byPriority: {},
                                estimatedTotalTraffic: 0
                            },
                            workflowSteps: []
                        };
                        console.log('📅 Génération du calendrier de contenu...');
                        return [4 /*yield*/, this.generateSeasonalContent(config, keywords)];
                    case 1:
                        seasonalContent = _d.sent();
                        (_a = calendar.items).push.apply(_a, seasonalContent);
                        return [4 /*yield*/, this.generateEventBasedContent(config, keywords)];
                    case 2:
                        eventContent = _d.sent();
                        (_b = calendar.items).push.apply(_b, eventContent);
                        return [4 /*yield*/, this.generateEvergreenContent(config, keywords)];
                    case 3:
                        evergreenContent = _d.sent();
                        (_c = calendar.items).push.apply(_c, evergreenContent);
                        // 4. Optimisation de la distribution mensuelle
                        return [4 /*yield*/, this.optimizeMonthlyDistribution(calendar, config)];
                    case 4:
                        // 4. Optimisation de la distribution mensuelle
                        _d.sent();
                        // 5. Génération des workflows
                        return [4 /*yield*/, this.generateWorkflows(calendar, config)];
                    case 5:
                        // 5. Génération des workflows
                        _d.sent();
                        // 6. Calcul des métriques
                        this.calculateCalendarMetrics(calendar);
                        console.log("\u2705 Calendrier g\u00E9n\u00E9r\u00E9: ".concat(calendar.items.length, " contenus planifi\u00E9s"));
                        return [2 /*return*/, calendar];
                }
            });
        });
    };
    /**
     * Génère le contenu saisonnier basé sur les tendances
     */
    ContentCalendarGenerator.prototype.generateSeasonalContent = function (config, keywords) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var seasonalContent, seasonalTrends, _loop_1, this_1, _i, seasonalTrends_1, trend;
            return __generator(this, function (_c) {
                seasonalContent = [];
                seasonalTrends = this.seasonalPatterns.get(config.industry) || [];
                _loop_1 = function (trend) {
                    // Trouver les mots-clés correspondants
                    var relatedKeywords = keywords.filter(function (k) {
                        return k.keyword.toLowerCase().includes(trend.keyword.toLowerCase()) ||
                            trend.keyword.toLowerCase().includes(k.keyword.toLowerCase());
                    });
                    if (relatedKeywords.length === 0)
                        return "continue";
                    for (var _d = 0, _e = trend.peakMonths; _d < _e.length; _d++) {
                        var peakMonth = _e[_d];
                        var contentItem = {
                            id: "seasonal_".concat(trend.keyword, "_").concat(peakMonth),
                            title: this_1.generateSeasonalTitle(trend, peakMonth, config.industry),
                            type: 'seasonal_content',
                            keywords: relatedKeywords.slice(0, 3),
                            publishDate: new Date(new Date().getFullYear(), peakMonth - 2, 1), // 2 mois avant le pic
                            deadline: new Date(new Date().getFullYear(), peakMonth - 2, 15),
                            status: 'planned',
                            priority: 'medium',
                            estimatedTraffic: relatedKeywords.reduce(function (sum, k) { return sum + k.searchVolume; }, 0) * trend.volumeMultiplier,
                            seasonality: {
                                peak: peakMonth,
                                duration: 3
                            },
                            contentMetrics: {
                                targetWordCount: 1200,
                                targetReadTime: 5,
                                difficultyLevel: 'intermediate'
                            },
                            seoTargets: {
                                targetPosition: 3,
                                expectedTraffic: Math.floor(((_a = relatedKeywords[0]) === null || _a === void 0 ? void 0 : _a.searchVolume) * 0.15 || 100),
                                competitionLevel: ((_b = relatedKeywords[0]) === null || _b === void 0 ? void 0 : _b.competition) || 'medium'
                            }
                        };
                        seasonalContent.push(contentItem);
                    }
                };
                this_1 = this;
                for (_i = 0, seasonalTrends_1 = seasonalTrends; _i < seasonalTrends_1.length; _i++) {
                    trend = seasonalTrends_1[_i];
                    _loop_1(trend);
                }
                return [2 /*return*/, seasonalContent];
            });
        });
    };
    /**
     * Génère le contenu basé sur les événements
     */
    ContentCalendarGenerator.prototype.generateEventBasedContent = function (config, keywords) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var eventContent, industryEvents, _loop_2, this_2, _i, industryEvents_1, event_1;
            var _this = this;
            return __generator(this, function (_b) {
                eventContent = [];
                industryEvents = this.industryEvents.get(config.industry) || [];
                _loop_2 = function (event_1) {
                    var eventKeywords = keywords.filter(function (k) {
                        return _this.isRelevantToEvent(k.keyword, event_1);
                    });
                    if (eventKeywords.length === 0)
                        return "continue";
                    var contentItem = {
                        id: "event_".concat(event_1.name, "_").concat(event_1.month),
                        title: this_2.generateEventTitle(event_1, config.industry),
                        type: 'event_content',
                        keywords: eventKeywords.slice(0, 2),
                        publishDate: new Date(new Date().getFullYear(), event_1.month - 1, event_1.prepDays || 14),
                        deadline: new Date(new Date().getFullYear(), event_1.month - 1, (event_1.prepDays || 14) - 7),
                        status: 'planned',
                        priority: event_1.priority || 'medium',
                        estimatedTraffic: eventKeywords.reduce(function (sum, k) { return sum + k.searchVolume; }, 0) * 0.8,
                        seasonality: {
                            peak: event_1.month,
                            duration: 1
                        },
                        eventTriggers: [{
                                eventType: event_1.type,
                                eventName: event_1.name,
                                relevanceScore: event_1.relevance || 0.7
                            }],
                        contentMetrics: {
                            targetWordCount: event_1.type === 'holiday' ? 800 : 1500,
                            targetReadTime: event_1.type === 'holiday' ? 3 : 6,
                            difficultyLevel: 'beginner'
                        },
                        seoTargets: {
                            targetPosition: 5,
                            expectedTraffic: Math.floor(((_a = eventKeywords[0]) === null || _a === void 0 ? void 0 : _a.searchVolume) * 0.1 || 50),
                            competitionLevel: 'high'
                        }
                    };
                    eventContent.push(contentItem);
                };
                this_2 = this;
                for (_i = 0, industryEvents_1 = industryEvents; _i < industryEvents_1.length; _i++) {
                    event_1 = industryEvents_1[_i];
                    _loop_2(event_1);
                }
                return [2 /*return*/, eventContent];
            });
        });
    };
    /**
     * Génère le contenu evergreen (permanent)
     */
    ContentCalendarGenerator.prototype.generateEvergreenContent = function (config, keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var evergreenContent, monthlyBlogPosts, totalMonths, evergreenKeywords, keywordsPerMonth, month, monthKeywords, i, keyword, publishDay, contentItem;
            var _this = this;
            return __generator(this, function (_a) {
                evergreenContent = [];
                monthlyBlogPosts = config.publicationFrequency.blogPosts;
                totalMonths = 12;
                evergreenKeywords = keywords.filter(function (k) {
                    return k.intent === 'informational' &&
                        k.searchVolume > 100 &&
                        _this.isEvergreenKeyword(k.keyword);
                });
                keywordsPerMonth = Math.ceil(evergreenKeywords.length / totalMonths);
                for (month = 1; month <= totalMonths; month++) {
                    monthKeywords = evergreenKeywords.slice((month - 1) * keywordsPerMonth, month * keywordsPerMonth);
                    for (i = 0; i < monthlyBlogPosts && i < monthKeywords.length; i++) {
                        keyword = monthKeywords[i];
                        publishDay = Math.floor(30 / monthlyBlogPosts) * (i + 1);
                        contentItem = {
                            id: "evergreen_".concat(month, "_").concat(i),
                            title: this.generateEvergreenTitle(keyword, config.industry),
                            type: 'blog_post',
                            keywords: __spreadArray([keyword], this.findRelatedKeywords(keyword, keywords), true),
                            publishDate: new Date(new Date().getFullYear(), month - 1, publishDay),
                            deadline: new Date(new Date().getFullYear(), month - 1, publishDay - 7),
                            status: 'planned',
                            priority: 'medium',
                            estimatedTraffic: keyword.searchVolume * 0.12,
                            seasonality: {
                                peak: 0, // Pas de saisonnalité
                                duration: 12
                            },
                            contentMetrics: {
                                targetWordCount: 1500,
                                targetReadTime: 6,
                                difficultyLevel: this.determineDifficultyLevel(keyword.difficulty)
                            },
                            seoTargets: {
                                targetPosition: Math.max(10 - Math.floor(keyword.difficulty / 15), 1),
                                expectedTraffic: Math.floor(keyword.searchVolume * 0.12),
                                competitionLevel: keyword.competition
                            }
                        };
                        evergreenContent.push(contentItem);
                    }
                }
                return [2 /*return*/, evergreenContent];
            });
        });
    };
    /**
     * Optimise la distribution mensuelle du contenu
     */
    ContentCalendarGenerator.prototype.optimizeMonthlyDistribution = function (calendar, config) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_3, month, maxItemsPerMonth, minItemsPerMonth, seasons, _loop_4, _i, _a, _b, season, months;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _loop_3 = function (month) {
                            calendar.monthlyPlan[month] = calendar.items.filter(function (item) {
                                return item.publishDate.getMonth() === month - 1;
                            });
                        };
                        // Regroupement par mois
                        for (month = 1; month <= 12; month++) {
                            _loop_3(month);
                        }
                        maxItemsPerMonth = Math.max.apply(Math, Object.values(calendar.monthlyPlan).map(function (items) { return items.length; }));
                        minItemsPerMonth = Math.min.apply(Math, Object.values(calendar.monthlyPlan).map(function (items) { return items.length; }));
                        if (!(maxItemsPerMonth - minItemsPerMonth > maxItemsPerMonth * 0.5)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.redistributeContent(calendar)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        seasons = {
                            'Printemps': [3, 4, 5],
                            'Été': [6, 7, 8],
                            'Automne': [9, 10, 11],
                            'Hiver': [12, 1, 2]
                        };
                        _loop_4 = function (season, months) {
                            calendar.seasonalPlan[season] = calendar.items.filter(function (item) {
                                return months.includes(item.publishDate.getMonth() + 1);
                            });
                        };
                        for (_i = 0, _a = Object.entries(seasons); _i < _a.length; _i++) {
                            _b = _a[_i], season = _b[0], months = _b[1];
                            _loop_4(season, months);
                        }
                        // Regroupement par événements
                        calendar.eventPlan = calendar.items
                            .filter(function (item) { return item.eventTriggers && item.eventTriggers.length > 0; })
                            .reduce(function (plan, item) {
                            var eventName = item.eventTriggers[0].eventName;
                            if (!plan[eventName])
                                plan[eventName] = [];
                            plan[eventName].push(item);
                            return plan;
                        }, {});
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génère les workflows de validation et publication
     */
    ContentCalendarGenerator.prototype.generateWorkflows = function (calendar, config) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, item, workflowSteps, writerIndex;
            return __generator(this, function (_b) {
                for (_i = 0, _a = calendar.items; _i < _a.length; _i++) {
                    item = _a[_i];
                    workflowSteps = {
                        planning: new Date(item.publishDate.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 jours avant
                        research: new Date(item.publishDate.getTime() - 21 * 24 * 60 * 60 * 1000), // 21 jours avant
                        writing: new Date(item.publishDate.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 jours avant
                        review: new Date(item.publishDate.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 jours avant
                        publication: item.publishDate
                    };
                    calendar.workflowSteps.push(workflowSteps);
                    // Attribution automatique des tâches
                    if (config.team.writers.length > 0) {
                        writerIndex = calendar.items.indexOf(item) % config.team.writers.length;
                        item.assignedTo = config.team.writers[writerIndex];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Calcule les métriques du calendrier
     */
    ContentCalendarGenerator.prototype.calculateCalendarMetrics = function (calendar) {
        calendar.metrics.totalItems = calendar.items.length;
        // Métriques par type
        calendar.metrics.byType = calendar.items.reduce(function (acc, item) {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
        }, {});
        // Métriques par priorité
        calendar.metrics.byPriority = calendar.items.reduce(function (acc, item) {
            acc[item.priority] = (acc[item.priority] || 0) + 1;
            return acc;
        }, {});
        // Trafic estimé total
        calendar.metrics.estimatedTotalTraffic = calendar.items.reduce(function (sum, item) { return sum + item.estimatedTraffic; }, 0);
    };
    /**
     * API pour mettre à jour le statut d'un contenu
     */
    ContentCalendarGenerator.prototype.updateContentStatus = function (calendar, itemId, newStatus, assignedTo) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                item = calendar.items.find(function (item) { return item.id === itemId; });
                if (!item)
                    return [2 /*return*/, false];
                item.status = newStatus;
                if (assignedTo)
                    item.assignedTo = assignedTo;
                // Log du changement
                console.log("\uD83D\uDCDD Contenu ".concat(itemId, " mis \u00E0 jour: ").concat(newStatus));
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * API pour obtenir le planning de la semaine
     */
    ContentCalendarGenerator.prototype.getWeeklyPlan = function (calendar, weekStart) {
        var weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
        return calendar.items.filter(function (item) {
            return item.publishDate >= weekStart && item.publishDate <= weekEnd;
        }).sort(function (a, b) { return a.publishDate.getTime() - b.publishDate.getTime(); });
    };
    /**
     * API pour obtenir les contenus en retard
     */
    ContentCalendarGenerator.prototype.getOverdueContent = function (calendar) {
        var now = new Date();
        return calendar.items.filter(function (item) {
            return item.deadline < now &&
                !['published', 'archived'].includes(item.status);
        });
    };
    /**
     * Génération automatique des briefs de contenu
     */
    ContentCalendarGenerator.prototype.generateContentBrief = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "\n# Brief de Contenu: ".concat(item.title, "\n\n## Informations G\u00E9n\u00E9rales\n- **Type**: ").concat(item.type, "\n- **Date de Publication**: ").concat(item.publishDate.toLocaleDateString('fr-FR'), "\n- **Deadline**: ").concat(item.deadline.toLocaleDateString('fr-FR'), "\n- **Priorit\u00E9**: ").concat(item.priority, "\n- **Assign\u00E9 \u00E0**: ").concat(item.assignedTo || 'Non assigné', "\n\n## Objectifs SEO\n- **Mots-cl\u00E9s Principaux**: ").concat(item.keywords.map(function (k) { return k.keyword; }).join(', '), "\n- **Position Cible**: Top ").concat(item.seoTargets.targetPosition, "\n- **Trafic Estim\u00E9**: ").concat(item.seoTargets.expectedTraffic, " visites/mois\n- **Niveau de Concurrence**: ").concat(item.seoTargets.competitionLevel, "\n\n## Sp\u00E9cifications du Contenu\n- **Nombre de Mots**: ").concat(item.contentMetrics.targetWordCount, "\n- **Temps de Lecture**: ").concat(item.contentMetrics.targetReadTime, " minutes\n- **Niveau de Difficult\u00E9**: ").concat(item.contentMetrics.difficultyLevel, "\n\n## Contexte Saisonnier\n").concat(item.seasonality.peak ? "- **Pic Saisonnier**: Mois ".concat(item.seasonality.peak) : '- **Contenu Evergreen**', "\n- **Dur\u00E9e de Pertinence**: ").concat(item.seasonality.duration, " mois\n\n").concat(item.eventTriggers ? "## \u00C9v\u00E9nements Associ\u00E9s\n".concat(item.eventTriggers.map(function (event) { return "- **".concat(event.eventName, "** (").concat(event.eventType, ") - Score: ").concat(event.relevanceScore); }).join('\n')) : '', "\n\n## Recommandations\n1. Int\u00E9grer naturellement les mots-cl\u00E9s principaux dans le titre et les sous-titres\n2. Structurer le contenu avec des H2/H3 optimis\u00E9s\n3. Ajouter des \u00E9l\u00E9ments visuels avec alt-texts optimis\u00E9s\n4. Inclure des appels \u00E0 l'action pertinents\n5. Optimiser pour les featured snippets si possible\n\n## M\u00E9triques de Succ\u00E8s\n- Atteindre la position ").concat(item.seoTargets.targetPosition, " dans les 3 mois\n- G\u00E9n\u00E9rer ").concat(item.seoTargets.expectedTraffic, " visites organiques mensuelles\n- Taux d'engagement > 60% (temps sur page, scroll depth)\n")];
            });
        });
    };
    // Méthodes utilitaires privées
    /**
     * Initialise les données d'industrie
     */
    ContentCalendarGenerator.prototype.initializeIndustryData = function () {
        this.industryEvents = new Map([
            ['restaurant', [
                    { name: 'Saint-Valentin', month: 2, type: 'holiday', priority: 'high', prepDays: 21, relevance: 0.9 },
                    { name: 'Fête des Pères', month: 6, type: 'holiday', priority: 'medium', prepDays: 14, relevance: 0.7 },
                    { name: 'Fête des Mères', month: 5, type: 'holiday', priority: 'high', prepDays: 14, relevance: 0.8 },
                    { name: 'Rentrée', month: 9, type: 'trend', priority: 'medium', prepDays: 7, relevance: 0.6 },
                    { name: 'Fêtes de fin d\'année', month: 12, type: 'holiday', priority: 'high', prepDays: 30, relevance: 0.95 }
                ]],
            ['ecommerce', [
                    { name: 'Black Friday', month: 11, type: 'industry_event', priority: 'urgent', prepDays: 45, relevance: 0.95 },
                    { name: 'Cyber Monday', month: 11, type: 'industry_event', priority: 'urgent', prepDays: 45, relevance: 0.9 },
                    { name: 'Soldes d \'été', month: 6, type: 'industry_event', priority: 'high', prepDays: 30, relevance: 0.8 },
                    { name: 'Soldes d\'hiver', month: 1, type: 'industry_event', priority: 'high', prepDays: 30, relevance: 0.8 }
                ]]
        ]);
    };
    /**
     * Initialise les patterns saisonniers
     */
    ContentCalendarGenerator.prototype.initializeSeasonalPatterns = function () {
        this.seasonalPatterns = new Map([
            ['restaurant', [
                    { keyword: 'terrasse', peakMonths: [5, 6, 7, 8], volumeMultiplier: 2.0, category: 'saisonnier' },
                    { keyword: 'menu hiver', peakMonths: [11, 12, 1, 2], volumeMultiplier: 1.5, category: 'saisonnier' },
                    { keyword: 'brunch', peakMonths: [4, 5, 9, 10], volumeMultiplier: 1.3, category: 'saisonnier' },
                    { keyword: 'réveillon', peakMonths: [11, 12], volumeMultiplier: 3.0, category: 'événementiel' }
                ]],
            ['ecommerce', [
                    { keyword: 'cadeau', peakMonths: [11, 12, 5], volumeMultiplier: 2.5, category: 'saisonnier' },
                    { keyword: 'été', peakMonths: [5, 6, 7], volumeMultiplier: 1.8, category: 'saisonnier' },
                    { keyword: 'rentrée', peakMonths: [8, 9], volumeMultiplier: 1.6, category: 'saisonnier' }
                ]]
        ]);
    };
    /**
     * Initialise les jours fériés
     */
    ContentCalendarGenerator.prototype.initializeHolidays = function () {
        var currentYear = new Date().getFullYear();
        this.holidays = new Map([
            ['FR', [
                    new Date(currentYear, 0, 1), // Nouvel An
                    new Date(currentYear, 1, 14), // Saint-Valentin
                    new Date(currentYear, 4, 1), // Fête du Travail
                    new Date(currentYear, 4, 8), // Victoire 1945
                    new Date(currentYear, 6, 14), // Fête Nationale
                    new Date(currentYear, 10, 1), // Toussaint
                    new Date(currentYear, 10, 11), // Armistice
                    new Date(currentYear, 11, 25) // Noël
                ]]
        ]);
    };
    // Méthodes utilitaires pour la génération de contenu
    ContentCalendarGenerator.prototype.generateSeasonalTitle = function (trend, month, industry) {
        var monthNames = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        if (industry === 'restaurant') {
            return "".concat(trend.keyword, " ").concat(monthNames[month], " : Guide Complet et Conseils");
        }
        return "Tendances ".concat(trend.keyword, " ").concat(monthNames[month], " ").concat(new Date().getFullYear());
    };
    ContentCalendarGenerator.prototype.generateEventTitle = function (event, industry) {
        if (industry === 'restaurant') {
            return "".concat(event.name, " : Menu Sp\u00E9cial et R\u00E9servations");
        }
        return "".concat(event.name, " ").concat(new Date().getFullYear(), " : Guide Complet");
    };
    ContentCalendarGenerator.prototype.generateEvergreenTitle = function (keyword, industry) {
        var templates = [
            "Guide Complet : ".concat(keyword.keyword),
            "Tout Savoir sur ".concat(keyword.keyword),
            "".concat(keyword.keyword, " : Conseils d'Expert"),
            "Comment Choisir ".concat(keyword.keyword, " ?"),
            "".concat(keyword.keyword, " : Les Meilleures Pratiques")
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    };
    ContentCalendarGenerator.prototype.isRelevantToEvent = function (keyword, event) {
        var eventKeywords = event.name.toLowerCase().split(' ');
        var keywordLower = keyword.toLowerCase();
        return eventKeywords.some(function (eventWord) {
            return keywordLower.includes(eventWord) || eventWord.includes(keywordLower);
        });
    };
    ContentCalendarGenerator.prototype.isEvergreenKeyword = function (keyword) {
        var seasonalWords = ['été', 'hiver', 'printemps', 'automne', 'noël', 'pâques', 'vacances'];
        var keywordLower = keyword.toLowerCase();
        return !seasonalWords.some(function (seasonal) { return keywordLower.includes(seasonal); });
    };
    ContentCalendarGenerator.prototype.findRelatedKeywords = function (mainKeyword, allKeywords) {
        return allKeywords
            .filter(function (k) {
            return k.keyword !== mainKeyword.keyword &&
                (k.keyword.includes(mainKeyword.keyword) || mainKeyword.keyword.includes(k.keyword));
        })
            .slice(0, 2);
    };
    ContentCalendarGenerator.prototype.determineDifficultyLevel = function (difficulty) {
        if (difficulty < 30)
            return 'beginner';
        if (difficulty < 70)
            return 'intermediate';
        return 'expert';
    };
    ContentCalendarGenerator.prototype.redistributeContent = function (calendar) {
        return __awaiter(this, void 0, void 0, function () {
            var monthlyItems, sortedMonths, heaviestMonth, lightestMonth, itemToMove, newMonth;
            return __generator(this, function (_a) {
                monthlyItems = Object.entries(calendar.monthlyPlan);
                sortedMonths = monthlyItems.sort(function (a, b) { return b[1].length - a[1].length; });
                heaviestMonth = sortedMonths[0];
                lightestMonth = sortedMonths[sortedMonths.length - 1];
                if (heaviestMonth[1].length - lightestMonth[1].length > 2) {
                    itemToMove = heaviestMonth[1].pop();
                    newMonth = parseInt(lightestMonth[0]);
                    itemToMove.publishDate = new Date(itemToMove.publishDate.getFullYear(), newMonth - 1, 15);
                    lightestMonth[1].push(itemToMove);
                }
                return [2 /*return*/];
            });
        });
    };
    return ContentCalendarGenerator;
}());
exports.ContentCalendarGenerator = ContentCalendarGenerator;
// Configuration par défaut
exports.defaultCalendarConfig = {
    industry: 'restaurant',
    businessGoals: ['increase_visibility', 'drive_reservations', 'build_authority'],
    contentTypes: ['blog_post', 'seasonal_content', 'event_content'],
    publicationFrequency: {
        blogPosts: 4,
        landingPages: 1,
        seasonalContent: 2
    },
    team: {
        writers: ['writer1', 'writer2'],
        editors: ['editor1'],
        seoSpecialists: ['seo1']
    },
    holidays: ['FR'],
    targetAudience: [
        { segments: ['food_lovers'], buyingCycle: 'awareness' },
        { segments: ['couples'], buyingCycle: 'decision' }
    ]
};
// Export instance
exports.default = new ContentCalendarGenerator();
