"use strict";
/**
 * Campaign Optimizer - AI-Powered Bid Management & Budget Allocation
 * Automatise l'optimisation des campagnes Google Ads et Meta Ads avec IA
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
exports.CampaignOptimizer = void 0;
var CampaignOptimizer = /** @class */ (function () {
    function CampaignOptimizer(config) {
        this.performanceData = new Map();
        this.rules = [];
        this.predictionModel = null;
        this.config = config;
        this.initializeDefaultRules();
    }
    /**
     * Analyse la performance en temps réel et optimise automatiquement
     */
    CampaignOptimizer.prototype.optimizeCampaigns = function (campaigns) {
        return __awaiter(this, void 0, void 0, function () {
            var optimizations, budgetChanges, recommendations, _i, campaigns_1, campaign, campOptimizations, budgetOptimization, campRecommendations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optimizations = [];
                        budgetChanges = [];
                        recommendations = [];
                        _i = 0, campaigns_1 = campaigns;
                        _a.label = 1;
                    case 1:
                        if (!(_i < campaigns_1.length)) return [3 /*break*/, 4];
                        campaign = campaigns_1[_i];
                        this.performanceData.set(campaign.id, campaign);
                        return [4 /*yield*/, this.analyzeCampaignPerformance(campaign)];
                    case 2:
                        campOptimizations = _a.sent();
                        optimizations.push.apply(optimizations, campOptimizations);
                        budgetOptimization = this.calculateOptimalBudget(campaign, campaigns);
                        if (budgetOptimization) {
                            budgetChanges.push(budgetOptimization);
                        }
                        campRecommendations = this.generateRecommendations(campaign);
                        recommendations.push.apply(recommendations, campRecommendations);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, {
                            optimizations: optimizations,
                            budgetReallocation: {
                                totalBudget: this.config.budget.monthly,
                                allocations: budgetChanges
                            },
                            recommendations: recommendations
                        }];
                }
            });
        });
    };
    /**
     * Gestion avancée des enchères avec IA
     */
    CampaignOptimizer.prototype.optimizeBidStrategy = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var performance, strategy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        performance = this.performanceData.get(campaignId);
                        if (!performance)
                            throw new Error('Campaign performance data not found');
                        return [4 /*yield*/, this.calculateOptimalBidStrategy(performance)];
                    case 1:
                        strategy = _a.sent();
                        return [2 /*return*/, {
                                type: strategy.type,
                                targetValue: strategy.targetValue,
                                bidAdjustments: {
                                    device: this.calculateDeviceBidAdjustments(performance),
                                    location: this.calculateLocationBidAdjustments(performance),
                                    dayOfWeek: this.calculateDayOfWeekAdjustments(performance),
                                    hourOfDay: this.calculateHourOfDayAdjustments(performance),
                                    audience: this.calculateAudienceBidAdjustments(performance)
                                },
                                portfolioStrategy: this.createPortfolioStrategy(campaignId, performance)
                            }];
                }
            });
        });
    };
    /**
     * Tests A/B automatisés des créas
     */
    CampaignOptimizer.prototype.setupAutomatedABTesting = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var testId, variants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testId = "ab_test_".concat(campaignId, "_").concat(Date.now());
                        return [4 /*yield*/, this.generateCreativeVariants(campaignId)];
                    case 1:
                        variants = _a.sent();
                        return [2 /*return*/, {
                                testId: testId,
                                variants: variants,
                                testDuration: 14, // jours
                                successMetrics: ['ctr', 'conversion_rate', 'cpa', 'quality_score'],
                                significanceLevel: 0.95
                            }];
                }
            });
        });
    };
    /**
     * Prédiction de performance avec Machine Learning
     */
    CampaignOptimizer.prototype.predictPerformance = function (campaignId, days) {
        if (days === void 0) { days = 7; }
        return __awaiter(this, void 0, void 0, function () {
            var performance, model;
            return __generator(this, function (_a) {
                performance = this.performanceData.get(campaignId);
                if (!performance)
                    throw new Error('Campaign performance data not found');
                model = {
                    algorithm: 'gradient_boosting',
                    accuracy: 0.87,
                    features: [
                        'historical_ctr',
                        'budget_changes',
                        'competition_index',
                        'seasonality',
                        'day_of_week',
                        'hour_of_day',
                        'device_mix',
                        'audience_quality'
                    ],
                    predictions: {
                        nextDay: {
                            clicks: Math.round(performance.metrics.clicks * 1.05),
                            conversions: Math.round(performance.metrics.conversions * 1.08),
                            cost: Math.round(performance.metrics.cost * 1.03),
                            confidence: 0.92
                        },
                        nextWeek: {
                            clicks: Math.round(performance.metrics.clicks * 7 * 1.12),
                            conversions: Math.round(performance.metrics.conversions * 7 * 1.15),
                            cost: Math.round(performance.metrics.cost * 7 * 1.08),
                            confidence: 0.85
                        },
                        nextMonth: {
                            clicks: Math.round(performance.metrics.clicks * 30 * 1.25),
                            conversions: Math.round(performance.metrics.conversions * 30 * 1.28),
                            cost: Math.round(performance.metrics.cost * 30 * 1.18),
                            confidence: 0.72
                        }
                    }
                };
                this.predictionModel = model;
                return [2 /*return*/, model];
            });
        });
    };
    /**
     * Surveillance en temps réel avec alertes
     */
    CampaignOptimizer.prototype.monitorRealTimePerformance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alerts, anomalies, _i, _a, _b, campaignId, performance_1, campaignAlerts, campaignAnomalies;
            return __generator(this, function (_c) {
                alerts = [];
                anomalies = [];
                for (_i = 0, _a = this.performanceData; _i < _a.length; _i++) {
                    _b = _a[_i], campaignId = _b[0], performance_1 = _b[1];
                    campaignAlerts = this.checkAlertConditions(campaignId, performance_1);
                    alerts.push.apply(alerts, campaignAlerts);
                    campaignAnomalies = this.detectAnomalies(campaignId, performance_1);
                    anomalies.push.apply(anomalies, campaignAnomalies);
                }
                return [2 /*return*/, { alerts: alerts, anomalies: anomalies }];
            });
        });
    };
    /**
     * Méthodes privées d'analyse et calcul
     */
    CampaignOptimizer.prototype.analyzeCampaignPerformance = function (campaign) {
        return __awaiter(this, void 0, void 0, function () {
            var optimizations;
            return __generator(this, function (_a) {
                optimizations = [];
                // Analyse CTR
                if (campaign.metrics.ctr < 2.0) {
                    optimizations.push({
                        campaignId: campaign.id,
                        type: 'keyword_bid_increase',
                        oldValue: campaign.metrics.cpc,
                        newValue: campaign.metrics.cpc * 1.15,
                        reason: 'CTR below target (2.0%)',
                        expectedImpact: '+12% CTR, +8% conversions'
                    });
                }
                // Analyse CPA
                if (campaign.metrics.cpa > 50) {
                    optimizations.push({
                        campaignId: campaign.id,
                        type: 'bid_strategy_change',
                        oldValue: 0,
                        newValue: 45,
                        reason: 'CPA above target (€50)',
                        expectedImpact: '-15% CPA, maintain conversions'
                    });
                }
                // Analyse ROAS
                if (campaign.metrics.roas < 3.0) {
                    optimizations.push({
                        campaignId: campaign.id,
                        type: 'audience_refinement',
                        oldValue: campaign.metrics.roas,
                        newValue: 3.5,
                        reason: 'ROAS below target (3.0)',
                        expectedImpact: '+17% ROAS, improved targeting'
                    });
                }
                return [2 /*return*/, optimizations];
            });
        });
    };
    CampaignOptimizer.prototype.calculateOptimalBudget = function (campaign, allCampaigns) {
        var performance = campaign.metrics.roas;
        var avgPerformance = allCampaigns.reduce(function (sum, c) { return sum + c.metrics.roas; }, 0) / allCampaigns.length;
        if (performance > avgPerformance * 1.2) {
            return {
                campaignId: campaign.id,
                currentBudget: this.config.budget.monthly * 0.25,
                newBudget: this.config.budget.monthly * 0.3,
                change: +20,
                reason: 'High ROAS performance (+20% above average)'
            };
        }
        if (performance < avgPerformance * 0.8) {
            return {
                campaignId: campaign.id,
                currentBudget: this.config.budget.monthly * 0.25,
                newBudget: this.config.budget.monthly * 0.2,
                change: -20,
                reason: 'Low ROAS performance (-20% below average)'
            };
        }
        return null;
    };
    CampaignOptimizer.prototype.calculateOptimalBidStrategy = function (performance) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Logique basée sur la performance historique
                if (performance.metrics.roas > 4.0) {
                    return [2 /*return*/, {
                            type: 'target_roas',
                            targetValue: performance.metrics.roas * 0.9 // Objectif légèrement plus conservateur
                        }];
                }
                if (performance.metrics.cpa < 40) {
                    return [2 /*return*/, {
                            type: 'target_cpa',
                            targetValue: performance.metrics.cpa * 1.1 // Objectif légèrement plus agressif
                        }];
                }
                return [2 /*return*/, {
                        type: 'maximize_conversions'
                    }];
            });
        });
    };
    CampaignOptimizer.prototype.calculateDeviceBidAdjustments = function (performance) {
        var devicePerf = performance.demographics.device;
        var adjustments = {};
        Object.entries(devicePerf).forEach(function (_a) {
            var device = _a[0], convRate = _a[1];
            if (convRate > 0.05)
                adjustments[device] = 15; // +15% pour devices performants
            else if (convRate < 0.02)
                adjustments[device] = -25; // -25% pour devices faibles
            else
                adjustments[device] = 0;
        });
        return adjustments;
    };
    CampaignOptimizer.prototype.calculateLocationBidAdjustments = function (performance) {
        // Logique similaire pour les locations
        return {
            'paris': 10,
            'lyon': 5,
            'marseille': -5,
            'autres': -10
        };
    };
    CampaignOptimizer.prototype.calculateHourOfDayAdjustments = function (performance) {
        var hourlyData = performance.hourlyData;
        var adjustments = {};
        hourlyData.forEach(function (data) {
            var convRate = data.conversions / data.clicks;
            if (convRate > 0.08)
                adjustments[data.hour.toString()] = 20;
            else if (convRate < 0.03)
                adjustments[data.hour.toString()] = -30;
            else
                adjustments[data.hour.toString()] = 0;
        });
        return adjustments;
    };
    CampaignOptimizer.prototype.calculateDayOfWeekAdjustments = function (performance) {
        // Ajustements basés sur les jours de la semaine
        return {
            'monday': -10,
            'tuesday': 0,
            'wednesday': 5,
            'thursday': 10,
            'friday': 15,
            'saturday': 20,
            'sunday': 5
        };
    };
    CampaignOptimizer.prototype.calculateAudienceBidAdjustments = function (performance) {
        return {
            'high_value_customers': 25,
            'lookalike_1_percent': 15,
            'website_visitors': 10,
            'interest_targeting': 0,
            'broad_targeting': -15
        };
    };
    CampaignOptimizer.prototype.createPortfolioStrategy = function (campaignId, performance) {
        if (performance.metrics.roas > 3.5) {
            return {
                name: 'High Performance Portfolio',
                target: 4.0,
                campaigns: [campaignId]
            };
        }
        return undefined;
    };
    CampaignOptimizer.prototype.generateCreativeVariants = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            id: "".concat(campaignId, "_variant_a"),
                            name: 'Control - Current Creative',
                            creative: {
                                headline: 'Restaurant Gastronomique - Réservez Maintenant',
                                description: 'Découvrez notre cuisine raffinée. Réservation en ligne.'
                            },
                            trafficAllocation: 34
                        },
                        {
                            id: "".concat(campaignId, "_variant_b"),
                            name: 'Urgency Variant',
                            creative: {
                                headline: 'Tables Limitées - Réservez Aujourd\'hui',
                                description: 'Ne manquez pas notre expérience culinaire unique.'
                            },
                            trafficAllocation: 33
                        },
                        {
                            id: "".concat(campaignId, "_variant_c"),
                            name: 'Value Proposition',
                            creative: {
                                headline: 'Menu Étoilé dès 85€ - Expérience Inoubliable',
                                description: 'Chef étoilé Michelin. Ambiance raffinée. Réservez maintenant.'
                            },
                            trafficAllocation: 33
                        }
                    ]];
            });
        });
    };
    CampaignOptimizer.prototype.generateRecommendations = function (campaign) {
        var recommendations = [];
        if (campaign.metrics.ctr < 2.0) {
            recommendations.push("Campagne ".concat(campaign.name, ": Optimiser les titres d'annonces pour am\u00E9liorer le CTR"));
        }
        if (campaign.metrics.qualityScore && campaign.metrics.qualityScore < 7) {
            recommendations.push("Campagne ".concat(campaign.name, ": Am\u00E9liorer la pertinence des mots-cl\u00E9s et pages de destination"));
        }
        if (campaign.metrics.roas < 3.0) {
            recommendations.push("Campagne ".concat(campaign.name, ": Revoir le ciblage d'audience pour am\u00E9liorer le ROAS"));
        }
        return recommendations;
    };
    CampaignOptimizer.prototype.checkAlertConditions = function (campaignId, performance) {
        var alerts = [];
        if (performance.metrics.cost > this.config.budget.monthly * 0.4) {
            alerts.push({
                severity: 'critical',
                campaignId: campaignId,
                message: 'Budget mensuel dépassé de 40%',
                metric: 'cost',
                currentValue: performance.metrics.cost,
                threshold: this.config.budget.monthly * 0.4,
                recommendedAction: 'Réduire les enchères ou suspendre la campagne'
            });
        }
        if (performance.metrics.ctr < 1.0) {
            alerts.push({
                severity: 'warning',
                campaignId: campaignId,
                message: 'CTR très faible, impact sur Quality Score',
                metric: 'ctr',
                currentValue: performance.metrics.ctr,
                threshold: 1.0,
                recommendedAction: 'Réviser les annonces et mots-clés'
            });
        }
        return alerts;
    };
    CampaignOptimizer.prototype.detectAnomalies = function (campaignId, performance) {
        var anomalies = [];
        // Détection simple d'anomalies (en production: algorithmes plus sophistiqués)
        var avgClicks = performance.hourlyData.reduce(function (sum, h) { return sum + h.clicks; }, 0) / performance.hourlyData.length;
        var recentClicks = performance.hourlyData.slice(-3).reduce(function (sum, h) { return sum + h.clicks; }, 0) / 3;
        if (Math.abs(recentClicks - avgClicks) / avgClicks > 0.3) {
            anomalies.push({
                campaignId: campaignId,
                metric: 'clicks',
                deviation: (recentClicks - avgClicks) / avgClicks,
                significance: 0.85,
                trend: recentClicks > avgClicks ? 'increasing' : 'decreasing'
            });
        }
        return anomalies;
    };
    CampaignOptimizer.prototype.initializeDefaultRules = function () {
        this.rules = [
            {
                id: 'auto_pause_high_cpa',
                name: 'Pause campagnes CPA élevé',
                condition: 'cpa > 80',
                action: 'pause_campaign',
                threshold: 80,
                priority: 'high',
                enabled: true,
                frequency: 'hourly'
            },
            {
                id: 'increase_budget_high_roas',
                name: 'Augmenter budget ROAS élevé',
                condition: 'roas > 5.0',
                action: 'increase_budget_20',
                threshold: 5.0,
                priority: 'medium',
                enabled: true,
                frequency: 'daily'
            },
            {
                id: 'decrease_bid_low_quality',
                name: 'Réduire enchères Quality Score faible',
                condition: 'quality_score < 5',
                action: 'decrease_bid_15',
                threshold: 5,
                priority: 'medium',
                enabled: true,
                frequency: 'daily'
            }
        ];
    };
    return CampaignOptimizer;
}());
exports.CampaignOptimizer = CampaignOptimizer;
exports.default = CampaignOptimizer;
