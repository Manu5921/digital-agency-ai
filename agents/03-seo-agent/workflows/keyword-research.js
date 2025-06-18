"use strict";
/**
 * Keyword Research Automatis� - Phase 2 SEO Agent
 * Int�gration APIs SEMrush/Ahrefs (simulation) + Analyse concurrence
 * Suggestions mots-cl�s longue tra�ne + Difficulty score
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
exports.defaultResearchConfig = exports.KeywordResearchEngine = void 0;
var KeywordResearchEngine = /** @class */ (function () {
    function KeywordResearchEngine(config) {
        this.semrushApiKey = config.semrushApiKey || 'demo_key';
        this.ahrefsApiKey = config.ahrefsApiKey || 'demo_key';
        this.googleTrendsEnabled = config.googleTrendsEnabled || false;
    }
    /**
     * Recherche compl�te de mots-cl�s
     */
    KeywordResearchEngine.prototype.performCompleteResearch = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var seedKeywords, longTailKeywords, localKeywords, _a, competitorAnalysis, seasonalTrends, contentGaps, recommendations, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log.apply(console, __spreadArray(['=,
                            D, marrage, recherche, de, mots - cl, s, compl, te], ');, false));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, this.expandSeedKeywords(config.seedKeywords, config)];
                    case 2:
                        seedKeywords = _b.sent();
                        return [4 /*yield*/, this.generateLongTailKeywords(seedKeywords, config)];
                    case 3:
                        longTailKeywords = _b.sent();
                        if (!(config.businessType === 'local')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.generateLocalKeywords(seedKeywords, config.geoLocation)];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = [];
                        _b.label = 6;
                    case 6:
                        localKeywords = _a;
                        return [4 /*yield*/, this.analyzeCompetitors(config.competitors, config)];
                    case 7:
                        competitorAnalysis = _b.sent();
                        return [4 /*yield*/, this.analyzeSeasonal(seedKeywords)];
                    case 8:
                        seasonalTrends = _b.sent();
                        return [4 /*yield*/, this.identifyContentGaps(seedKeywords, competitorAnalysis)];
                    case 9:
                        contentGaps = _b.sent();
                        recommendations = this.generateRecommendations(seedKeywords, longTailKeywords, competitorAnalysis);
                        return [2 /*return*/, {
                                seedKeywords: seedKeywords,
                                longTailKeywords: longTailKeywords,
                                localKeywords: localKeywords,
                                competitorAnalysis: competitorAnalysis,
                                seasonalTrends: seasonalTrends,
                                contentGaps: contentGaps,
                                recommendations: recommendations
                            }];
                    case 10:
                        error_1 = _b.sent();
                        console.error('Erreur recherche mots-cl�s:', error_1);
                        throw new Error("\uFFFDchec recherche: ".concat(error_1.message));
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Expansion des mots-cl�s seed avec APIs externes
     */
    KeywordResearchEngine.prototype.expandSeedKeywords = function (seedKeywords, config) {
        return __awaiter(this, void 0, void 0, function () {
            var expandedKeywords, _i, seedKeywords_1, keyword, semrushData, ahrefsData, keywordData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expandedKeywords = [];
                        _i = 0, seedKeywords_1 = seedKeywords;
                        _a.label = 1;
                    case 1:
                        if (!(_i < seedKeywords_1.length)) return [3 /*break*/, 7];
                        keyword = seedKeywords_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.fetchSEMrushData(keyword, config)];
                    case 3:
                        semrushData = _a.sent();
                        return [4 /*yield*/, this.fetchAhrefsData(keyword, config)];
                    case 4:
                        ahrefsData = _a.sent();
                        keywordData = {
                            keyword: keyword,
                            searchVolume: semrushData.volume || ahrefsData.volume || this.estimateVolume(keyword),
                            difficulty: this.calculateDifficulty(semrushData, ahrefsData),
                            cpc: semrushData.cpc || this.estimateCPC(keyword, config.industry),
                            competition: this.determineCompetition(semrushData.competition),
                            trend: this.generateTrendData(),
                            relatedKeywords: __spreadArray(__spreadArray([], semrushData.related, true), ahrefsData.related, true),
                            questions: this.generateQuestions(keyword),
                            intent: this.determineIntent(keyword)
                        };
                        expandedKeywords.push(keywordData);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.warn("Erreur expansion mot-cl\uFFFD ".concat(keyword, ":"), error_2);
                        // Fallback avec donn�es estim�es
                        expandedKeywords.push(this.createFallbackKeywordData(keyword, config));
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, expandedKeywords];
                }
            });
        });
    };
    /**
     * G�n�ration de mots-cl�s longue tra�ne
     */
    KeywordResearchEngine.prototype.generateLongTailKeywords = function (seedKeywords, config) {
        return __awaiter(this, void 0, void 0, function () {
            var longTailKeywords, modifiers, questionWords, commercialModifiers, _i, seedKeywords_2, seedKeyword, _a, modifiers_1, modifier, longTailVariations, _b, longTailVariations_1, variation, _c, questionWords_1, question, questionKeyword, _d, commercialModifiers_1, commercial, commercialKeyword;
            return __generator(this, function (_e) {
                longTailKeywords = [];
                modifiers = this.getIndustryModifiers(config.industry);
                questionWords = ['comment', 'pourquoi', 'quand', 'o�', 'que', 'qui', 'combien'];
                commercialModifiers = ['pas cher', 'gratuit', 'meilleur', 'prix', 'acheter', 'r�servation'];
                for (_i = 0, seedKeywords_2 = seedKeywords; _i < seedKeywords_2.length; _i++) {
                    seedKeyword = seedKeywords_2[_i];
                    // Combinaisons avec modifiers
                    for (_a = 0, modifiers_1 = modifiers; _a < modifiers_1.length; _a++) {
                        modifier = modifiers_1[_a];
                        longTailVariations = [
                            "".concat(seedKeyword.keyword, " ").concat(modifier),
                            "".concat(modifier, " ").concat(seedKeyword.keyword),
                            "".concat(seedKeyword.keyword, " ").concat(modifier, " ").concat(config.geoLocation || '').trim()
                        ];
                        for (_b = 0, longTailVariations_1 = longTailVariations; _b < longTailVariations_1.length; _b++) {
                            variation = longTailVariations_1[_b];
                            if (variation.length > 10) { // Filtrer les variations trop courtes
                                longTailKeywords.push({
                                    keyword: variation,
                                    searchVolume: Math.floor(seedKeyword.searchVolume * 0.1), // Volume estim� plus faible
                                    difficulty: Math.max(seedKeyword.difficulty - 20, 10), // Difficult� r�duite
                                    cpc: seedKeyword.cpc * 0.8,
                                    competition: 'low',
                                    trend: this.generateTrendData(),
                                    relatedKeywords: [],
                                    questions: [],
                                    intent: 'informational'
                                });
                            }
                        }
                    }
                    // Questions
                    for (_c = 0, questionWords_1 = questionWords; _c < questionWords_1.length; _c++) {
                        question = questionWords_1[_c];
                        questionKeyword = "".concat(question, " ").concat(seedKeyword.keyword);
                        longTailKeywords.push({
                            keyword: questionKeyword,
                            searchVolume: Math.floor(seedKeyword.searchVolume * 0.05),
                            difficulty: Math.max(seedKeyword.difficulty - 30, 5),
                            cpc: 0.1,
                            competition: 'low',
                            trend: this.generateTrendData(),
                            relatedKeywords: [],
                            questions: [],
                            intent: 'informational'
                        });
                    }
                    // Intentions commerciales
                    for (_d = 0, commercialModifiers_1 = commercialModifiers; _d < commercialModifiers_1.length; _d++) {
                        commercial = commercialModifiers_1[_d];
                        commercialKeyword = "".concat(seedKeyword.keyword, " ").concat(commercial);
                        longTailKeywords.push({
                            keyword: commercialKeyword,
                            searchVolume: Math.floor(seedKeyword.searchVolume * 0.15),
                            difficulty: seedKeyword.difficulty,
                            cpc: seedKeyword.cpc * 1.2,
                            competition: 'medium',
                            trend: this.generateTrendData(),
                            relatedKeywords: [],
                            questions: [],
                            intent: 'commercial'
                        });
                    }
                }
                // Filtrer les doublons et trier par potentiel
                return [2 /*return*/, this.filterAndRankKeywords(longTailKeywords)];
            });
        });
    };
    /**
     * G�n�ration de mots-cl�s locaux
     */
    KeywordResearchEngine.prototype.generateLocalKeywords = function (seedKeywords, location) {
        return __awaiter(this, void 0, void 0, function () {
            var localKeywords, locationVariations, _i, seedKeywords_3, seedKeyword, _a, locationVariations_1, locationVar, localVariations, _b, localVariations_1, variation;
            return __generator(this, function (_c) {
                localKeywords = [];
                locationVariations = this.getLocationVariations(location);
                for (_i = 0, seedKeywords_3 = seedKeywords; _i < seedKeywords_3.length; _i++) {
                    seedKeyword = seedKeywords_3[_i];
                    for (_a = 0, locationVariations_1 = locationVariations; _a < locationVariations_1.length; _a++) {
                        locationVar = locationVariations_1[_a];
                        localVariations = [
                            "".concat(seedKeyword.keyword, " ").concat(locationVar),
                            "".concat(locationVar, " ").concat(seedKeyword.keyword),
                            "".concat(seedKeyword.keyword, " pr\uFFFDs de ").concat(locationVar),
                            "".concat(seedKeyword.keyword, " \uFFFD ").concat(locationVar)
                        ];
                        for (_b = 0, localVariations_1 = localVariations; _b < localVariations_1.length; _b++) {
                            variation = localVariations_1[_b];
                            localKeywords.push({
                                keyword: variation,
                                searchVolume: Math.floor(seedKeyword.searchVolume * 0.2),
                                difficulty: Math.max(seedKeyword.difficulty - 15, 5),
                                cpc: seedKeyword.cpc * 1.1,
                                competition: 'low',
                                trend: this.generateTrendData(),
                                relatedKeywords: [],
                                questions: [],
                                intent: 'navigational'
                            });
                        }
                    }
                }
                return [2 /*return*/, this.filterAndRankKeywords(localKeywords)];
            });
        });
    };
    /**
     * Analyse des concurrents
     */
    KeywordResearchEngine.prototype.analyzeCompetitors = function (competitors, config) {
        return __awaiter(this, void 0, void 0, function () {
            var competitorAnalyses, _i, competitors_1, competitor, analysis, _a, error_3;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        competitorAnalyses = [];
                        _i = 0, competitors_1 = competitors;
                        _c.label = 1;
                    case 1:
                        if (!(_i < competitors_1.length)) return [3 /*break*/, 9];
                        competitor = competitors_1[_i];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, , 8]);
                        _b = {
                            domain: competitor
                        };
                        return [4 /*yield*/, this.getCompetitorOrganicKeywords(competitor)];
                    case 3:
                        _b.organicKeywords = _c.sent();
                        return [4 /*yield*/, this.getCompetitorPaidKeywords(competitor)];
                    case 4:
                        _b.paidKeywords = _c.sent();
                        return [4 /*yield*/, this.getCompetitorTopPages(competitor)];
                    case 5:
                        analysis = (_b.topPages = _c.sent(),
                            _b.gapAnalysis = {
                                missingKeywords: [],
                                weakerPositions: [],
                                opportunities: []
                            },
                            _b);
                        // Analyse des gaps
                        _a = analysis;
                        return [4 /*yield*/, this.performGapAnalysis(analysis, config)];
                    case 6:
                        // Analyse des gaps
                        _a.gapAnalysis = _c.sent();
                        competitorAnalyses.push(analysis);
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _c.sent();
                        console.warn("Erreur analyse concurrent ".concat(competitor, ":"), error_3);
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/, competitorAnalyses];
                }
            });
        });
    };
    /**
     * Analyse des tendances saisonni�res
     */
    KeywordResearchEngine.prototype.analyzeSeasonal = function (keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var seasonalData, _i, keywords_1, keyword;
            return __generator(this, function (_a) {
                seasonalData = {};
                for (_i = 0, keywords_1 = keywords; _i < keywords_1.length; _i++) {
                    keyword = keywords_1[_i];
                    // Simulation des donn�es de tendances (12 mois)
                    seasonalData[keyword.keyword] = this.generateSeasonalTrend(keyword.keyword);
                }
                return [2 /*return*/, seasonalData];
            });
        });
    };
    /**
     * Identification des gaps de contenu
     */
    KeywordResearchEngine.prototype.identifyContentGaps = function (keywords, competitorAnalyses) {
        return __awaiter(this, void 0, void 0, function () {
            var contentGaps, competitorKeywords, uncoveredKeywords, themeGroups, _i, _a, _b, theme, themeKeywords, estimatedTraffic;
            return __generator(this, function (_c) {
                contentGaps = [];
                competitorKeywords = competitorAnalyses.flatMap(function (ca) {
                    return ca.organicKeywords.map(function (k) { return k.keyword; });
                });
                uncoveredKeywords = keywords.filter(function (k) {
                    return !competitorKeywords.includes(k.keyword) && k.searchVolume > 100;
                });
                themeGroups = this.groupKeywordsByTheme(uncoveredKeywords);
                for (_i = 0, _a = Object.entries(themeGroups); _i < _a.length; _i++) {
                    _b = _a[_i], theme = _b[0], themeKeywords = _b[1];
                    estimatedTraffic = themeKeywords.reduce(function (sum, k) { return sum + k.searchVolume; }, 0);
                    contentGaps.push({
                        topic: theme,
                        keywords: themeKeywords,
                        estimatedTraffic: estimatedTraffic
                    });
                }
                return [2 /*return*/, contentGaps.sort(function (a, b) { return b.estimatedTraffic - a.estimatedTraffic; })];
            });
        });
    };
    /**
     * G�n�ration des recommandations
     */
    KeywordResearchEngine.prototype.generateRecommendations = function (seedKeywords, longTailKeywords, competitorAnalyses) {
        // Quick wins: mots-cl�s � faible difficult�, volume d�cent
        var quickWins = __spreadArray(__spreadArray([], seedKeywords, true), longTailKeywords, true).filter(function (k) { return k.difficulty < 30 && k.searchVolume > 50; })
            .sort(function (a, b) { return b.searchVolume - a.searchVolume; })
            .slice(0, 10);
        // Long term targets: mots-cl�s � forte valeur mais haute difficult�
        var longTermTargets = __spreadArray(__spreadArray([], seedKeywords, true), longTailKeywords, true).filter(function (k) { return k.difficulty > 60 && k.searchVolume > 500; })
            .sort(function (a, b) { return b.searchVolume - a.searchVolume; })
            .slice(0, 5);
        // Id�es de contenu bas�es sur les questions
        var contentIdeas = longTailKeywords
            .filter(function (k) { return k.intent === 'informational'; })
            .map(function (k) { return "Article: \"".concat(k.keyword, "\" - Volume: ").concat(k.searchVolume); })
            .slice(0, 20);
        return {
            quickWins: quickWins,
            longTermTargets: longTermTargets,
            contentIdeas: contentIdeas
        };
    };
    // M�thodes utilitaires et simulations API
    /**
     * Simulation API SEMrush
     */
    KeywordResearchEngine.prototype.fetchSEMrushData = function (keyword, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation - En r�alit�, appel API SEMrush
                return [2 /*return*/, {
                        volume: this.estimateVolume(keyword),
                        cpc: this.estimateCPC(keyword, config.industry),
                        competition: Math.random(),
                        related: this.generateRelatedKeywords(keyword)
                    }];
            });
        });
    };
    /**
     * Simulation API Ahrefs
     */
    KeywordResearchEngine.prototype.fetchAhrefsData = function (keyword, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation - En r�alit�, appel API Ahrefs
                return [2 /*return*/, {
                        volume: this.estimateVolume(keyword) * 0.9, // L�g�re variation
                        difficulty: Math.floor(Math.random() * 100),
                        related: this.generateRelatedKeywords(keyword)
                    }];
            });
        });
    };
    /**
     * Estimation du volume de recherche
     */
    KeywordResearchEngine.prototype.estimateVolume = function (keyword) {
        var baseVolume = 1000;
        var wordCount = keyword.split(' ').length;
        var multiplier = Math.max(2 - (wordCount * 0.3), 0.1);
        return Math.floor(baseVolume * multiplier * (0.5 + Math.random()));
    };
    /**
     * Estimation du CPC
     */
    KeywordResearchEngine.prototype.estimateCPC = function (keyword, industry) {
        var industryMultipliers = {
            restaurant: 1.2,
            ecommerce: 0.8,
            saas: 2.5,
            finance: 4.0,
            healthcare: 3.0,
            realestate: 2.8
        };
        var basePrice = 0.5;
        var multiplier = industryMultipliers[industry] || 1.0;
        return parseFloat((basePrice * multiplier * (0.8 + Math.random() * 0.4)).toFixed(2));
    };
    /**
     * Calcul de la difficult�
     */
    KeywordResearchEngine.prototype.calculateDifficulty = function (semrushData, ahrefsData) {
        var semrushDiff = (semrushData.competition || 0.5) * 100;
        var ahrefsDiff = ahrefsData.difficulty || 50;
        return Math.floor((semrushDiff + ahrefsDiff) / 2);
    };
    /**
     * D�termination du niveau de concurrence
     */
    KeywordResearchEngine.prototype.determineCompetition = function (competition) {
        if (competition < 0.3)
            return 'low';
        if (competition < 0.7)
            return 'medium';
        return 'high';
    };
    /**
     * G�n�ration de donn�es de tendance
     */
    KeywordResearchEngine.prototype.generateTrendData = function () {
        return Array.from({ length: 12 }, function () { return Math.floor(Math.random() * 100); });
    };
    /**
     * G�n�ration de mots-cl�s related
     */
    KeywordResearchEngine.prototype.generateRelatedKeywords = function (keyword) {
        var bases = keyword.split(' ');
        var related = [];
        for (var i = 0; i < 3; i++) {
            var variation = bases.map(function (word) {
                return Math.random() > 0.5 ? word : word + 's';
            }).join(' ');
            related.push(variation);
        }
        return related;
    };
    /**
     * G�n�ration de questions
     */
    KeywordResearchEngine.prototype.generateQuestions = function (keyword) {
        var questions = [
            "Comment choisir ".concat(keyword, "?"),
            "Pourquoi ".concat(keyword, " est important?"),
            "O\uFFFD trouver ".concat(keyword, "?"),
            "Combien co\uFFFDte ".concat(keyword, "?")
        ];
        return questions.slice(0, 2);
    };
    /**
     * D�termination de l'intention
     */
    KeywordResearchEngine.prototype.determineIntent = function (keyword) {
        var commercial = ['acheter', 'prix', 'pas cher', 'gratuit', 'offre'];
        var transactional = ['r�server', 'commander', 'livraison', 'contact'];
        var informational = ['comment', 'pourquoi', 'guide', 'conseil'];
        var lowerKeyword = keyword.toLowerCase();
        if (commercial.some(function (word) { return lowerKeyword.includes(word); }))
            return 'commercial';
        if (transactional.some(function (word) { return lowerKeyword.includes(word); }))
            return 'transactional';
        if (informational.some(function (word) { return lowerKeyword.includes(word); }))
            return 'informational';
        return 'navigational';
    };
    /**
     * Cr�ation de donn�es fallback
     */
    KeywordResearchEngine.prototype.createFallbackKeywordData = function (keyword, config) {
        return {
            keyword: keyword,
            searchVolume: this.estimateVolume(keyword),
            difficulty: Math.floor(Math.random() * 100),
            cpc: this.estimateCPC(keyword, config.industry),
            competition: 'medium',
            trend: this.generateTrendData(),
            relatedKeywords: this.generateRelatedKeywords(keyword),
            questions: this.generateQuestions(keyword),
            intent: this.determineIntent(keyword)
        };
    };
    /**
     * Modifiers par industrie
     */
    KeywordResearchEngine.prototype.getIndustryModifiers = function (industry) {
        var modifiers = {
            restaurant: ['menu', 'prix', 'horaires', 'r�servation', 'avis', 'sp�cialit�s', 'carte', 'ouvert'],
            ecommerce: ['prix', 'promo', 'soldes', 'livraison', 'gratuit', 'pas cher', 'avis', 'test'],
            saas: ['gratuit', 'prix', 'demo', 'essai', 'comparaison', 'alternative', 'fonctionnalit�s'],
            healthcare: ['sympt�mes', 'traitement', 'm�decin', 'consultation', 'urgence', 'prevention'],
            finance: ['taux', 'comparaison', 'simulation', 'gratuit', 'en ligne', 'rapide'],
            realestate: ['prix', 'vente', 'location', 'estimation', 'quartier', 'visite', 'annonce']
        };
        return modifiers[industry] || ['prix', 'gratuit', 'meilleur', 'comparaison'];
    };
    /**
     * Variations de localisation
     */
    KeywordResearchEngine.prototype.getLocationVariations = function (location) {
        // Exemple pour Paris
        if (location.toLowerCase().includes('paris')) {
            return [
                'Paris', '75', '�le-de-France', '1er arrondissement', '2�me arrondissement',
                'centre Paris', 'Paris centre', 'm�tro', 'RER'
            ];
        }
        return [location, "".concat(location, " centre"), "r\uFFFDgion ".concat(location)];
    };
    /**
     * G�n�ration de tendance saisonni�re
     */
    KeywordResearchEngine.prototype.generateSeasonalTrend = function (keyword) {
        // Simulation de saisonnalit� bas�e sur le mot-cl�
        var base = 50;
        var seasonal = [];
        for (var i = 0; i < 12; i++) {
            var modifier = 1;
            // Restaurants: pics �t� et f�tes
            if (keyword.includes('restaurant')) {
                if ([5, 6, 7, 11].includes(i))
                    modifier = 1.3;
                if ([1, 2].includes(i))
                    modifier = 0.8;
            }
            seasonal.push(Math.floor(base * modifier * (0.8 + Math.random() * 0.4)));
        }
        return seasonal;
    };
    /**
     * Filtrage et classement des mots-cl�s
     */
    KeywordResearchEngine.prototype.filterAndRankKeywords = function (keywords) {
        var _this = this;
        // Suppression des doublons
        var unique = keywords.filter(function (keyword, index, self) {
            return index === self.findIndex(function (k) { return k.keyword === keyword.keyword; });
        });
        // Calcul du score de potentiel
        var scored = unique.map(function (keyword) { return (__assign(__assign({}, keyword), { potentialScore: _this.calculatePotentialScore(keyword) })); });
        // Tri par score de potentiel
        return scored
            .sort(function (a, b) { return b.potentialScore - a.potentialScore; })
            .slice(0, 50); // Limite � 50 mots-cl�s
    };
    /**
     * Calcul du score de potentiel
     */
    KeywordResearchEngine.prototype.calculatePotentialScore = function (keyword) {
        var volumeScore = Math.min(keyword.searchVolume / 1000, 10);
        var difficultyScore = (100 - keyword.difficulty) / 10;
        var cpcScore = Math.min(keyword.cpc * 2, 10);
        return volumeScore + difficultyScore + cpcScore;
    };
    /**
     * Regroupement par th�me
     */
    KeywordResearchEngine.prototype.groupKeywordsByTheme = function (keywords) {
        var themes = {};
        for (var _i = 0, keywords_2 = keywords; _i < keywords_2.length; _i++) {
            var keyword = keywords_2[_i];
            var theme = this.extractTheme(keyword.keyword);
            if (!themes[theme])
                themes[theme] = [];
            themes[theme].push(keyword);
        }
        return themes;
    };
    /**
     * Extraction du th�me principal
     */
    KeywordResearchEngine.prototype.extractTheme = function (keyword) {
        var words = keyword.toLowerCase().split(' ');
        var themeWords = words.filter(function (word) {
            return word.length > 3 && !['comment', 'pourquoi', 'meilleur'].includes(word);
        });
        return themeWords[0] || 'g�n�ral';
    };
    /**
     * Analyse des mots-cl�s organiques des concurrents (simulation)
     */
    KeywordResearchEngine.prototype.getCompetitorOrganicKeywords = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var mockKeywords, i;
            return __generator(this, function (_a) {
                mockKeywords = [];
                for (i = 0; i < 10; i++) {
                    mockKeywords.push({
                        keyword: "keyword concurrent ".concat(i),
                        searchVolume: Math.floor(Math.random() * 1000),
                        difficulty: Math.floor(Math.random() * 100),
                        cpc: parseFloat((Math.random() * 5).toFixed(2)),
                        competition: 'medium',
                        trend: this.generateTrendData(),
                        relatedKeywords: [],
                        questions: [],
                        intent: 'commercial'
                    });
                }
                return [2 /*return*/, mockKeywords];
            });
        });
    };
    /**
     * Analyse des mots-cl�s payants des concurrents (simulation)
     */
    KeywordResearchEngine.prototype.getCompetitorPaidKeywords = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation similaire aux organiques
                return [2 /*return*/, this.getCompetitorOrganicKeywords(domain)];
            });
        });
    };
    /**
     * Pages principales des concurrents (simulation)
     */
    KeywordResearchEngine.prototype.getCompetitorTopPages = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            url: "https://".concat(domain, "/page1"),
                            keywords: ['keyword1', 'keyword2'],
                            traffic: Math.floor(Math.random() * 10000),
                            position: Math.floor(Math.random() * 10) + 1
                        }
                    ]];
            });
        });
    };
    /**
     * Analyse des gaps concurrentiels
     */
    KeywordResearchEngine.prototype.performGapAnalysis = function (competitor, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        missingKeywords: competitor.organicKeywords.slice(0, 5),
                        weakerPositions: competitor.organicKeywords.slice(5, 10),
                        opportunities: competitor.organicKeywords.slice(10, 15)
                    }];
            });
        });
    };
    return KeywordResearchEngine;
}());
exports.KeywordResearchEngine = KeywordResearchEngine;
// Configuration par d�faut pour restaurant
exports.defaultResearchConfig = {
    industry: 'restaurant',
    geoLocation: 'Paris, France',
    language: 'fr',
    competitors: ['restaurant-concurrent1.fr', 'restaurant-concurrent2.fr'],
    seedKeywords: ['restaurant gastronomique', 'cuisine fran�aise', 'chef �toil�'],
    businessType: 'local',
    targetAudience: ['food lovers', 'couples', 'business diners']
};
// Export instance configur�e
exports.default = new KeywordResearchEngine({
    semrushApiKey: process.env.SEMRUSH_API_KEY,
    ahrefsApiKey: process.env.AHREFS_API_KEY,
    googleTrendsEnabled: true
});
