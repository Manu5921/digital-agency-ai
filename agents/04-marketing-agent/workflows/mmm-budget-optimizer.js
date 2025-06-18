"use strict";
/**
 * 🎯 MARKETING MIX MODELING - BUDGET OPTIMIZER ML
 * Phase 3 Advanced Growth Hacking Module
 *
 * Features:
 * - Attribution ML avec TensorFlow
 * - Optimisation automatique cross-canal
 * - Geo-experiments automatisés
 * - Modèles diminishing returns
 * - Scenario planning avec prédictions ROI
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
exports.createMMModeler = exports.MarketingMixModeler = void 0;
var tf = require("@tensorflow/tfjs-node");
var events_1 = require("events");
/**
 * 🧠 MARKETING MIX MODELING ENGINE
 * Attribution causale avec ML avancé
 */
var MarketingMixModeler = /** @class */ (function (_super) {
    __extends(MarketingMixModeler, _super);
    function MarketingMixModeler() {
        var _this = _super.call(this) || this;
        _this.model = null;
        _this.channels = [];
        _this.historicalData = [];
        _this.geoExperiments = [];
        _this.isTraining = false;
        _this.modelAccuracy = 0;
        _this.initializeChannels();
        return _this;
    }
    /**
     * 🎯 INITIALISATION DES CANAUX MARKETING
     */
    MarketingMixModeler.prototype.initializeChannels = function () {
        this.channels = [
            {
                id: 'google_ads',
                name: 'Google Ads',
                type: 'paid_search',
                currentBudget: 50000,
                minBudget: 10000,
                maxBudget: 200000,
                constraints: {
                    minBudgetPercentage: 0.15,
                    maxBudgetPercentage: 0.35,
                    seasonalityFactor: 1.2,
                    competitiveIntensity: 0.8,
                    saturationPoint: 150000
                }
            },
            {
                id: 'facebook_ads',
                name: 'Meta Ads',
                type: 'social_media',
                currentBudget: 35000,
                minBudget: 8000,
                maxBudget: 120000,
                constraints: {
                    minBudgetPercentage: 0.10,
                    maxBudgetPercentage: 0.30,
                    seasonalityFactor: 1.1,
                    competitiveIntensity: 0.9,
                    saturationPoint: 100000
                }
            },
            {
                id: 'linkedin_ads',
                name: 'LinkedIn Ads',
                type: 'social_media',
                currentBudget: 15000,
                minBudget: 3000,
                maxBudget: 50000,
                constraints: {
                    minBudgetPercentage: 0.05,
                    maxBudgetPercentage: 0.20,
                    seasonalityFactor: 0.9,
                    competitiveIntensity: 0.7,
                    saturationPoint: 40000
                }
            },
            {
                id: 'display_network',
                name: 'Display Network',
                type: 'display',
                currentBudget: 20000,
                minBudget: 5000,
                maxBudget: 80000,
                constraints: {
                    minBudgetPercentage: 0.08,
                    maxBudgetPercentage: 0.25,
                    seasonalityFactor: 1.0,
                    competitiveIntensity: 0.6,
                    saturationPoint: 60000
                }
            },
            {
                id: 'email_marketing',
                name: 'Email Marketing',
                type: 'email',
                currentBudget: 8000,
                minBudget: 2000,
                maxBudget: 25000,
                constraints: {
                    minBudgetPercentage: 0.03,
                    maxBudgetPercentage: 0.15,
                    seasonalityFactor: 1.05,
                    competitiveIntensity: 0.3,
                    saturationPoint: 20000
                }
            }
        ];
    };
    /**
     * 🤖 CONSTRUCTION DU MODÈLE ML D'ATTRIBUTION
     */
    MarketingMixModeler.prototype.buildAttributionModel = function () {
        var model = tf.sequential({
            layers: [
                // Couche d'entrée - Features marketing
                tf.layers.dense({
                    inputShape: [20], // 20 features par canal
                    units: 128,
                    activation: 'relu',
                    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
                }),
                // Couches cachées pour capture des interactions
                tf.layers.dropout({ rate: 0.3 }),
                tf.layers.dense({
                    units: 256,
                    activation: 'relu',
                    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
                }),
                // Couche d'attention pour pondération dynamique
                tf.layers.dense({
                    units: 128,
                    activation: 'tanh'
                }),
                // Couche de saturation avec activation personnalisée
                tf.layers.dense({
                    units: 64,
                    activation: 'sigmoid'
                }),
                // Couches de synergies inter-canaux
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({
                    units: 32,
                    activation: 'relu'
                }),
                // Couche de sortie - Attribution scores
                tf.layers.dense({
                    units: this.channels.length + 1, // +1 pour baseline
                    activation: 'softmax'
                })
            ]
        });
        // Compilation avec optimiseur Adam personnalisé
        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy', 'meanSquaredError']
        });
        return model;
    };
    /**
     * 📊 PRÉPARATION DES DONNÉES D'ENTRAÎNEMENT
     */
    MarketingMixModeler.prototype.prepareTrainingData = function () {
        var _this = this;
        var features = [];
        var labels = [];
        // Agrégation des données par fenêtre temporelle
        var timeWindows = this.aggregateDataByTimeWindow(this.historicalData, 7); // 7 jours
        timeWindows.forEach(function (window) {
            // Features par canal
            var channelFeatures = [];
            _this.channels.forEach(function (channel) {
                var channelData = window.filter(function (d) { return d.channel === channel.id; });
                if (channelData.length > 0) {
                    var totalSpend = channelData.reduce(function (sum, d) { return sum + d.cost; }, 0);
                    var totalImpressions = channelData.reduce(function (sum, d) { return sum + d.impressions; }, 0);
                    var totalClicks = channelData.reduce(function (sum, d) { return sum + d.clicks; }, 0);
                    var totalConversions = channelData.reduce(function (sum, d) { return sum + d.conversion; }, 0);
                    // Normalisation des features
                    channelFeatures.push(totalSpend / 100000, // Spend normalisé
                    totalImpressions / 1000000, // Impressions normalisées
                    totalClicks / 10000, // Clicks normalisés
                    totalConversions / 1000, // Conversions normalisées
                    totalClicks / Math.max(totalImpressions, 1));
                }
                else {
                    channelFeatures.push(0, 0, 0, 0, 0);
                }
            });
            // Labels - Attribution réelle
            var totalRevenue = window.reduce(function (sum, d) { return sum + d.revenue; }, 0);
            var channelAttribution = [];
            _this.channels.forEach(function (channel) {
                var channelRevenue = window
                    .filter(function (d) { return d.channel === channel.id; })
                    .reduce(function (sum, d) { return sum + d.revenue; }, 0);
                channelAttribution.push(channelRevenue / Math.max(totalRevenue, 1));
            });
            // Baseline attribution
            var baselineAttribution = Math.max(0, 1 - channelAttribution.reduce(function (sum, a) { return sum + a; }, 0));
            channelAttribution.push(baselineAttribution);
            features.push(channelFeatures);
            labels.push(channelAttribution);
        });
        return {
            features: tf.tensor2d(features),
            labels: tf.tensor2d(labels)
        };
    };
    /**
     * ⏰ AGRÉGATION DES DONNÉES PAR FENÊTRE TEMPORELLE
     */
    MarketingMixModeler.prototype.aggregateDataByTimeWindow = function (data, windowDays) {
        var _a;
        var windows = [];
        var sortedData = data.sort(function (a, b) { return a.timestamp.getTime() - b.timestamp.getTime(); });
        var currentWindow = [];
        var windowStart = (_a = sortedData[0]) === null || _a === void 0 ? void 0 : _a.timestamp;
        sortedData.forEach(function (point) {
            var daysDiff = (point.timestamp.getTime() - windowStart.getTime()) / (1000 * 60 * 60 * 24);
            if (daysDiff < windowDays) {
                currentWindow.push(point);
            }
            else {
                if (currentWindow.length > 0) {
                    windows.push(__spreadArray([], currentWindow, true));
                }
                currentWindow = [point];
                windowStart = point.timestamp;
            }
        });
        if (currentWindow.length > 0) {
            windows.push(currentWindow);
        }
        return windows;
    };
    /**
     * 🚀 ENTRAÎNEMENT DU MODÈLE
     */
    MarketingMixModeler.prototype.trainModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, features, labels, history_1, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isTraining) {
                            throw new Error('Model is already training');
                        }
                        this.isTraining = true;
                        this.emit('training_started');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        // Construction du modèle
                        this.model = this.buildAttributionModel();
                        _a = this.prepareTrainingData(), features = _a.features, labels = _a.labels;
                        return [4 /*yield*/, this.model.fit(features, labels, {
                                epochs: 200,
                                batchSize: 32,
                                validationSplit: 0.2,
                                shuffle: true,
                                callbacks: {
                                    onEpochEnd: function (epoch, logs) {
                                        _this.emit('training_progress', {
                                            epoch: epoch + 1,
                                            loss: logs === null || logs === void 0 ? void 0 : logs.loss,
                                            accuracy: logs === null || logs === void 0 ? void 0 : logs.acc,
                                            valLoss: logs === null || logs === void 0 ? void 0 : logs.val_loss,
                                            valAccuracy: logs === null || logs === void 0 ? void 0 : logs.val_acc
                                        });
                                    }
                                }
                            })];
                    case 2:
                        history_1 = _b.sent();
                        // Calcul de la précision finale
                        this.modelAccuracy = Math.max.apply(Math, history_1.history.val_acc);
                        // Nettoyage des tenseurs
                        features.dispose();
                        labels.dispose();
                        this.emit('training_completed', {
                            accuracy: this.modelAccuracy,
                            finalLoss: history_1.history.loss[history_1.history.loss.length - 1]
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        this.emit('training_error', error_1);
                        throw error_1;
                    case 4:
                        this.isTraining = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 📈 CALCUL DES COURBES DE SATURATION
     */
    MarketingMixModeler.prototype.calculateSaturationCurves = function () {
        var _this = this;
        var curves = {};
        this.channels.forEach(function (channel) {
            // Modèle de saturation Adstock avec diminishing returns
            var channelData = _this.historicalData.filter(function (d) { return d.channel === channel.id; });
            if (channelData.length > 0) {
                // Calcul des paramètres de saturation via régression
                var spendPoints = channelData.map(function (d) { return d.cost; });
                var revenuePoints = channelData.map(function (d) { return d.revenue; });
                var _a = _this.fitSaturationModel(spendPoints, revenuePoints), alpha = _a.alpha, beta = _a.beta, gamma = _a.gamma;
                // Calcul du ROI optimal
                var currentSpend = channel.currentBudget;
                var currentROI = _this.calculateROIAtSpend(currentSpend, alpha, beta, gamma);
                var maxROI = alpha; // ROI maximum théorique
                var optimalSpend = _this.findOptimalSpend(alpha, beta, gamma, channel.maxBudget);
                curves[channel.id] = {
                    alpha: alpha,
                    beta: beta,
                    gamma: gamma,
                    maxROI: maxROI,
                    currentROI: currentROI,
                    optimalSpend: optimalSpend
                };
            }
        });
        return curves;
    };
    /**
     * 🔬 AJUSTEMENT DU MODÈLE DE SATURATION
     */
    MarketingMixModeler.prototype.fitSaturationModel = function (spend, revenue) {
        // Modèle de Hill Transformation pour saturation
        // Revenue = alpha * (spend^gamma) / (beta^gamma + spend^gamma)
        // Estimation initiale des paramètres
        var alpha = Math.max.apply(Math, revenue) * 1.2; // ROI max estimé
        var beta = spend.reduce(function (sum, s) { return sum + s; }, 0) / spend.length; // Point de saturation médian
        var gamma = 0.5; // Forme de la courbe
        // Optimisation par descente de gradient simple
        var learningRate = 0.001;
        var iterations = 1000;
        for (var i = 0; i < iterations; i++) {
            var totalError = 0;
            var alphaGradient = 0;
            var betaGradient = 0;
            var gammaGradient = 0;
            for (var j = 0; j < spend.length; j++) {
                var s = spend[j];
                var actualRevenue = revenue[j];
                // Prédiction avec modèle actuel
                var predicted = alpha * Math.pow(s, gamma) / (Math.pow(beta, gamma) + Math.pow(s, gamma));
                var error = predicted - actualRevenue;
                totalError += error * error;
                // Calcul des gradients
                var denominator = Math.pow(beta, gamma) + Math.pow(s, gamma);
                var numerator = Math.pow(s, gamma);
                alphaGradient += error * (numerator / denominator);
                betaGradient += error * alpha * (-gamma * Math.pow(beta, gamma - 1) * numerator / (denominator * denominator));
                gammaGradient += error * alpha * numerator * (Math.log(s) * denominator - Math.log(beta) * Math.pow(beta, gamma)) / (denominator * denominator);
            }
            // Mise à jour des paramètres
            alpha -= learningRate * alphaGradient;
            beta -= learningRate * betaGradient;
            gamma -= learningRate * gammaGradient;
            // Contraintes
            alpha = Math.max(0, alpha);
            beta = Math.max(1, beta);
            gamma = Math.max(0.1, Math.min(2, gamma));
        }
        return { alpha: alpha, beta: beta, gamma: gamma };
    };
    /**
     * 💰 CALCUL DU ROI À UN NIVEAU DE SPEND
     */
    MarketingMixModeler.prototype.calculateROIAtSpend = function (spend, alpha, beta, gamma) {
        if (spend <= 0)
            return 0;
        var revenue = alpha * Math.pow(spend, gamma) / (Math.pow(beta, gamma) + Math.pow(spend, gamma));
        return revenue / spend;
    };
    /**
     * 🎯 RECHERCHE DU SPEND OPTIMAL
     */
    MarketingMixModeler.prototype.findOptimalSpend = function (alpha, beta, gamma, maxBudget) {
        var optimalSpend = 0;
        var maxROI = 0;
        // Recherche par pas de 1000
        for (var spend = 1000; spend <= maxBudget; spend += 1000) {
            var roi = this.calculateROIAtSpend(spend, alpha, beta, gamma);
            if (roi > maxROI) {
                maxROI = roi;
                optimalSpend = spend;
            }
        }
        return optimalSpend;
    };
    /**
     * 🎯 OPTIMISATION DU BUDGET CROSS-CANAL
     */
    MarketingMixModeler.prototype.optimizeBudgetAllocation = function (totalBudget, constraints, scenario) {
        if (constraints === void 0) { constraints = {}; }
        if (scenario === void 0) { scenario = 'balanced'; }
        return __awaiter(this, void 0, void 0, function () {
            var saturationCurves, channelConstraints, optimizedAllocation, currentAllocation, expectedROI, expectedRevenue, incrementalROI, confidence;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.model) {
                            throw new Error('Model must be trained before optimization');
                        }
                        saturationCurves = this.calculateSaturationCurves();
                        channelConstraints = this.applyBudgetConstraints(totalBudget, constraints);
                        return [4 /*yield*/, this.geneticOptimization(totalBudget, channelConstraints, saturationCurves, scenario)];
                    case 1:
                        optimizedAllocation = _a.sent();
                        currentAllocation = this.getCurrentAllocation();
                        expectedROI = this.calculateExpectedROI(optimizedAllocation, saturationCurves);
                        expectedRevenue = this.calculateExpectedRevenue(optimizedAllocation, saturationCurves);
                        incrementalROI = expectedROI - this.calculateExpectedROI(currentAllocation, saturationCurves);
                        confidence = this.modelAccuracy;
                        return [2 /*return*/, {
                                currentAllocation: currentAllocation,
                                optimizedAllocation: optimizedAllocation,
                                expectedROI: expectedROI,
                                expectedRevenue: expectedRevenue,
                                incrementalROI: incrementalROI,
                                confidence: confidence,
                                scenario: scenario
                            }];
                }
            });
        });
    };
    /**
     * 🧬 OPTIMISATION PAR ALGORITHME GÉNÉTIQUE
     */
    MarketingMixModeler.prototype.geneticOptimization = function (totalBudget, constraints, saturationCurves, scenario) {
        return __awaiter(this, void 0, void 0, function () {
            var populationSize, generations, mutationRate, crossoverRate, population, gen, fitness, selectedIndividuals, newPopulation, finalFitness, bestIndex, bestAllocation, result;
            var _this = this;
            return __generator(this, function (_a) {
                populationSize = 100;
                generations = 200;
                mutationRate = 0.1;
                crossoverRate = 0.8;
                population = this.initializePopulation(populationSize, totalBudget, constraints);
                for (gen = 0; gen < generations; gen++) {
                    fitness = population.map(function (individual) {
                        return _this.evaluateFitness(individual, saturationCurves, scenario);
                    });
                    selectedIndividuals = this.selection(population, fitness);
                    newPopulation = this.crossoverAndMutation(selectedIndividuals, crossoverRate, mutationRate, totalBudget, constraints);
                    population = newPopulation;
                    // Émission du progrès
                    if (gen % 20 === 0) {
                        this.emit('optimization_progress', {
                            generation: gen,
                            bestFitness: Math.max.apply(Math, fitness),
                            averageFitness: fitness.reduce(function (sum, f) { return sum + f; }, 0) / fitness.length
                        });
                    }
                }
                finalFitness = population.map(function (individual) {
                    return _this.evaluateFitness(individual, saturationCurves, scenario);
                });
                bestIndex = finalFitness.indexOf(Math.max.apply(Math, finalFitness));
                bestAllocation = population[bestIndex];
                result = {};
                this.channels.forEach(function (channel, index) {
                    result[channel.id] = bestAllocation[index];
                });
                return [2 /*return*/, result];
            });
        });
    };
    /**
     * 👥 INITIALISATION DE LA POPULATION
     */
    MarketingMixModeler.prototype.initializePopulation = function (size, totalBudget, constraints) {
        var population = [];
        var _loop_1 = function (i) {
            var individual = [];
            var remainingBudget = totalBudget;
            // Attribution aléatoire respectant les contraintes
            this_1.channels.forEach(function (channel, index) {
                var constraint = constraints[channel.id];
                var minBudget = (constraint === null || constraint === void 0 ? void 0 : constraint.min) || channel.minBudget;
                var maxBudget = Math.min((constraint === null || constraint === void 0 ? void 0 : constraint.max) || channel.maxBudget, remainingBudget);
                var budget = minBudget + Math.random() * (maxBudget - minBudget);
                individual.push(budget);
                remainingBudget -= budget;
            });
            // Ajustement pour respecter le budget total
            var totalAllocated = individual.reduce(function (sum, b) { return sum + b; }, 0);
            var adjustmentFactor = totalBudget / totalAllocated;
            for (var j = 0; j < individual.length; j++) {
                individual[j] *= adjustmentFactor;
            }
            population.push(individual);
        };
        var this_1 = this;
        for (var i = 0; i < size; i++) {
            _loop_1(i);
        }
        return population;
    };
    /**
     * 🏆 ÉVALUATION DU FITNESS
     */
    MarketingMixModeler.prototype.evaluateFitness = function (allocation, saturationCurves, scenario) {
        var _this = this;
        var totalROI = 0;
        var totalRevenue = 0;
        var diversificationBonus = 0;
        this.channels.forEach(function (channel, index) {
            var budget = allocation[index];
            var curve = saturationCurves[channel.id];
            if (curve && budget > 0) {
                var roi = _this.calculateROIAtSpend(budget, curve.alpha, curve.beta, curve.gamma);
                var revenue = roi * budget;
                totalROI += roi;
                totalRevenue += revenue;
            }
        });
        // Bonus de diversification
        var activeChannels = allocation.filter(function (b) { return b > 1000; }).length;
        diversificationBonus = activeChannels * 0.1; // 10% bonus par canal actif
        // Ajustement selon le scenario
        var scenarioMultiplier = 1;
        switch (scenario) {
            case 'aggressive_growth':
                scenarioMultiplier = totalRevenue > 1000000 ? 1.5 : 1;
                break;
            case 'roi_focused':
                scenarioMultiplier = totalROI > 3 ? 1.3 : 1;
                break;
            case 'diversified':
                scenarioMultiplier = 1 + diversificationBonus;
                break;
        }
        return (totalROI + diversificationBonus) * scenarioMultiplier;
    };
    /**
     * 🎯 SÉLECTION DES MEILLEURS INDIVIDUS
     */
    MarketingMixModeler.prototype.selection = function (population, fitness) {
        var selected = [];
        var tournamentSize = 5;
        for (var i = 0; i < population.length; i++) {
            // Sélection par tournoi
            var tournament = [];
            for (var j = 0; j < tournamentSize; j++) {
                var randomIndex = Math.floor(Math.random() * population.length);
                tournament.push({
                    individual: population[randomIndex],
                    fitness: fitness[randomIndex]
                });
            }
            // Sélection du meilleur du tournoi
            tournament.sort(function (a, b) { return b.fitness - a.fitness; });
            selected.push(__spreadArray([], tournament[0].individual, true));
        }
        return selected;
    };
    /**
     * 🧬 CROSSOVER ET MUTATION
     */
    MarketingMixModeler.prototype.crossoverAndMutation = function (population, crossoverRate, mutationRate, totalBudget, constraints) {
        var newPopulation = [];
        for (var i = 0; i < population.length; i += 2) {
            var parent1 = population[i];
            var parent2 = population[i + 1] || population[0];
            var child1 = __spreadArray([], parent1, true);
            var child2 = __spreadArray([], parent2, true);
            // Crossover
            if (Math.random() < crossoverRate) {
                var crossoverPoint = Math.floor(Math.random() * parent1.length);
                child1 = __spreadArray(__spreadArray([], parent1.slice(0, crossoverPoint), true), parent2.slice(crossoverPoint), true);
                child2 = __spreadArray(__spreadArray([], parent2.slice(0, crossoverPoint), true), parent1.slice(crossoverPoint), true);
            }
            // Mutation
            if (Math.random() < mutationRate) {
                child1 = this.mutate(child1, totalBudget, constraints);
            }
            if (Math.random() < mutationRate) {
                child2 = this.mutate(child2, totalBudget, constraints);
            }
            newPopulation.push(child1);
            if (newPopulation.length < population.length) {
                newPopulation.push(child2);
            }
        }
        return newPopulation;
    };
    /**
     * 🎲 MUTATION D'UN INDIVIDU
     */
    MarketingMixModeler.prototype.mutate = function (individual, totalBudget, constraints) {
        var _a, _b;
        var mutated = __spreadArray([], individual, true);
        var mutationStrength = 0.1; // 10% de variation
        // Sélection de deux canaux aléatoires pour échange de budget
        var index1 = Math.floor(Math.random() * mutated.length);
        var index2 = Math.floor(Math.random() * mutated.length);
        if (index1 !== index2) {
            var channel1 = this.channels[index1];
            var channel2 = this.channels[index2];
            var maxTransfer = Math.min(mutated[index1] * mutationStrength, (((_a = constraints[channel2.id]) === null || _a === void 0 ? void 0 : _a.max) || channel2.maxBudget) - mutated[index2]);
            var transfer = Math.random() * maxTransfer;
            // Vérification des contraintes minimales
            if (mutated[index1] - transfer >= (((_b = constraints[channel1.id]) === null || _b === void 0 ? void 0 : _b.min) || channel1.minBudget)) {
                mutated[index1] -= transfer;
                mutated[index2] += transfer;
            }
        }
        return mutated;
    };
    /**
     * 📊 UTILITAIRES DE CALCUL
     */
    MarketingMixModeler.prototype.getCurrentAllocation = function () {
        var allocation = {};
        this.channels.forEach(function (channel) {
            allocation[channel.id] = channel.currentBudget;
        });
        return allocation;
    };
    MarketingMixModeler.prototype.calculateExpectedROI = function (allocation, saturationCurves) {
        var _this = this;
        var totalROI = 0;
        var totalSpend = 0;
        Object.keys(allocation).forEach(function (channelId) {
            var spend = allocation[channelId];
            var curve = saturationCurves[channelId];
            if (curve && spend > 0) {
                var roi = _this.calculateROIAtSpend(spend, curve.alpha, curve.beta, curve.gamma);
                totalROI += roi * spend;
                totalSpend += spend;
            }
        });
        return totalSpend > 0 ? totalROI / totalSpend : 0;
    };
    MarketingMixModeler.prototype.calculateExpectedRevenue = function (allocation, saturationCurves) {
        var _this = this;
        var totalRevenue = 0;
        Object.keys(allocation).forEach(function (channelId) {
            var spend = allocation[channelId];
            var curve = saturationCurves[channelId];
            if (curve && spend > 0) {
                var roi = _this.calculateROIAtSpend(spend, curve.alpha, curve.beta, curve.gamma);
                totalRevenue += roi * spend;
            }
        });
        return totalRevenue;
    };
    MarketingMixModeler.prototype.applyBudgetConstraints = function (totalBudget, customConstraints) {
        var constraints = {};
        this.channels.forEach(function (channel) {
            var custom = customConstraints[channel.id];
            var defaultMin = Math.max(channel.minBudget, totalBudget * channel.constraints.minBudgetPercentage);
            var defaultMax = Math.min(channel.maxBudget, totalBudget * channel.constraints.maxBudgetPercentage);
            constraints[channel.id] = {
                min: (custom === null || custom === void 0 ? void 0 : custom.min) || defaultMin,
                max: (custom === null || custom === void 0 ? void 0 : custom.max) || defaultMax
            };
        });
        return constraints;
    };
    /**
     * 🧪 GEO-EXPERIMENTS AUTOMATISÉS
     */
    MarketingMixModeler.prototype.createGeoExperiment = function (name, testChannel, budgetLift, duration, geoMarkets, controlMarkets) {
        return __awaiter(this, void 0, void 0, function () {
            var experiment;
            return __generator(this, function (_a) {
                experiment = {
                    id: "geo_exp_".concat(Date.now()),
                    name: name,
                    geoMarkets: geoMarkets,
                    controlMarkets: controlMarkets,
                    testChannel: testChannel,
                    budgetLift: budgetLift,
                    duration: duration,
                    status: 'planned'
                };
                this.geoExperiments.push(experiment);
                this.emit('geo_experiment_created', {
                    experimentId: experiment.id,
                    name: experiment.name,
                    estimatedLift: this.estimateExperimentLift(experiment)
                });
                return [2 /*return*/, experiment.id];
            });
        });
    };
    MarketingMixModeler.prototype.runGeoExperiment = function (experimentId) {
        return __awaiter(this, void 0, void 0, function () {
            var experiment;
            var _this = this;
            return __generator(this, function (_a) {
                experiment = this.geoExperiments.find(function (exp) { return exp.id === experimentId; });
                if (!experiment) {
                    throw new Error("Experiment ".concat(experimentId, " not found"));
                }
                if (experiment.status !== 'planned') {
                    throw new Error("Experiment ".concat(experimentId, " is not in planned status"));
                }
                // Mise à jour du statut
                experiment.status = 'running';
                this.emit('geo_experiment_started', {
                    experimentId: experiment.id,
                    name: experiment.name,
                    duration: experiment.duration
                });
                // Simulation de l'expérimentation (en production, cela serait connecté aux APIs des plateformes)
                setTimeout(function () {
                    _this.completeGeoExperiment(experimentId);
                }, experiment.duration * 24 * 60 * 60 * 1000); // duration en jours
                return [2 /*return*/];
            });
        });
    };
    MarketingMixModeler.prototype.completeGeoExperiment = function (experimentId) {
        var experiment = this.geoExperiments.find(function (exp) { return exp.id === experimentId; });
        if (!experiment)
            return;
        // Simulation des résultats (en production, analyse des données réelles)
        var results = {
            incrementalConversions: Math.floor(Math.random() * 1000) + 100,
            incrementalRevenue: Math.floor(Math.random() * 50000) + 5000,
            statisticalSignificance: 0.95 + Math.random() * 0.04,
            pValue: Math.random() * 0.05,
            confidenceInterval: [0.8, 1.2],
            causalImpact: 0.15 + Math.random() * 0.3
        };
        experiment.results = results;
        experiment.status = 'completed';
        this.emit('geo_experiment_completed', {
            experimentId: experiment.id,
            results: results,
            isSignificant: results.pValue < 0.05
        });
    };
    MarketingMixModeler.prototype.estimateExperimentLift = function (experiment) {
        // Estimation basée sur les données historiques et les courbes de saturation
        var channel = this.channels.find(function (c) { return c.id === experiment.testChannel; });
        if (!channel)
            return 0;
        var currentROI = this.calculateROIAtSpend(channel.currentBudget, channel.constraints.saturationPoint * 0.5, channel.constraints.saturationPoint, 0.7);
        var liftedBudget = channel.currentBudget * (1 + experiment.budgetLift);
        var liftedROI = this.calculateROIAtSpend(liftedBudget, channel.constraints.saturationPoint * 0.5, channel.constraints.saturationPoint, 0.7);
        return (liftedROI - currentROI) / currentROI;
    };
    /**
     * 📊 SCENARIO PLANNING
     */
    MarketingMixModeler.prototype.generateScenarios = function (totalBudgets, scenarios) {
        if (scenarios === void 0) { scenarios = ['conservative', 'balanced', 'aggressive']; }
        return __awaiter(this, void 0, void 0, function () {
            var results, _i, scenarios_1, scenario, _a, totalBudgets_1, budget, optimization;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        results = {};
                        _i = 0, scenarios_1 = scenarios;
                        _b.label = 1;
                    case 1:
                        if (!(_i < scenarios_1.length)) return [3 /*break*/, 6];
                        scenario = scenarios_1[_i];
                        results[scenario] = [];
                        _a = 0, totalBudgets_1 = totalBudgets;
                        _b.label = 2;
                    case 2:
                        if (!(_a < totalBudgets_1.length)) return [3 /*break*/, 5];
                        budget = totalBudgets_1[_a];
                        return [4 /*yield*/, this.optimizeBudgetAllocation(budget, {}, scenario)];
                    case 3:
                        optimization = _b.sent();
                        results[scenario].push(optimization);
                        _b.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        this.emit('scenario_planning_completed', {
                            scenarios: Object.keys(results),
                            budgetLevels: totalBudgets.length,
                            totalOptimizations: scenarios.length * totalBudgets.length
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * 📈 MÉTRIQUES ET MONITORING
     */
    MarketingMixModeler.prototype.getModelMetrics = function () {
        return {
            accuracy: this.modelAccuracy,
            channels: this.channels.length,
            dataPoints: this.historicalData.length,
            lastTraining: this.model ? new Date() : null,
            experiments: this.geoExperiments.length
        };
    };
    /**
     * 💾 SAUVEGARDE ET CHARGEMENT DU MODÈLE
     */
    MarketingMixModeler.prototype.saveModel = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.model) {
                            throw new Error('No model to save');
                        }
                        return [4 /*yield*/, this.model.save("file://".concat(path))];
                    case 1:
                        _a.sent();
                        this.emit('model_saved', { path: path });
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketingMixModeler.prototype.loadModel = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, tf.loadLayersModel("file://".concat(path))];
                    case 1:
                        _a.model = _b.sent();
                        this.emit('model_loaded', { path: path });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 🔄 AJOUT DE DONNÉES D'ATTRIBUTION
     */
    MarketingMixModeler.prototype.addAttributionData = function (data) {
        var _a;
        (_a = this.historicalData).push.apply(_a, data);
        // Nettoyage des anciennes données (garde les 2 dernières années)
        var twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
        this.historicalData = this.historicalData.filter(function (d) { return d.timestamp >= twoYearsAgo; });
        this.emit('data_updated', {
            totalDataPoints: this.historicalData.length,
            newDataPoints: data.length
        });
    };
    return MarketingMixModeler;
}(events_1.EventEmitter));
exports.MarketingMixModeler = MarketingMixModeler;
/**
 * 🚀 EXPORT DU MODULE
 */
exports.default = MarketingMixModeler;
/**
 * 🎯 EXEMPLE D'UTILISATION
 */
var createMMModeler = function () {
    return new MarketingMixModeler();
};
exports.createMMModeler = createMMModeler;
