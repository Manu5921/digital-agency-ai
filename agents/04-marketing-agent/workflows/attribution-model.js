"use strict";
/**
 * Attribution Model - Tracking Avancé Multi-Touch & Customer Journey
 * Système d'attribution intelligent pour mesurer l'impact réel de chaque canal marketing
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
exports.AttributionModelEngine = void 0;
var AttributionModelEngine = /** @class */ (function () {
    function AttributionModelEngine(config) {
        this.touchPoints = new Map(); // userId -> touchPoints
        this.journeys = new Map();
        this.crossDeviceData = new Map();
        this.models = new Map();
        this.config = config;
        this.initializeModels();
    }
    /**
     * Enregistre un nouveau point de contact
     */
    AttributionModelEngine.prototype.trackTouchPoint = function (touchPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var userTouchPoints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userTouchPoints = this.touchPoints.get(touchPoint.userId) || [];
                        userTouchPoints.push(touchPoint);
                        this.touchPoints.set(touchPoint.userId, userTouchPoints);
                        // Mise à jour du parcours client
                        return [4 /*yield*/, this.updateCustomerJourney(touchPoint.userId)];
                    case 1:
                        // Mise à jour du parcours client
                        _a.sent();
                        // Cross-device tracking
                        return [4 /*yield*/, this.updateCrossDeviceMapping(touchPoint)];
                    case 2:
                        // Cross-device tracking
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Calcule l'attribution pour un parcours client
     */
    AttributionModelEngine.prototype.calculateAttribution = function (userId, modelName) {
        if (modelName === void 0) { modelName = 'data_driven'; }
        return __awaiter(this, void 0, void 0, function () {
            var journey, model, attributions, insights;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        journey = this.journeys.get(userId);
                        if (!journey)
                            throw new Error('Customer journey not found');
                        model = this.models.get(modelName);
                        if (!model)
                            throw new Error('Attribution model not found');
                        return [4 /*yield*/, this.applyAttributionModel(journey, model)];
                    case 1:
                        attributions = _a.sent();
                        insights = this.generateAttributionInsights(attributions, journey);
                        return [2 /*return*/, {
                                attributions: attributions,
                                totalRevenue: journey.totalRevenue,
                                modelAccuracy: this.calculateModelAccuracy(attributions, journey),
                                insights: insights
                            }];
                }
            });
        });
    };
    /**
     * Attribution multi-touch avec IA
     */
    AttributionModelEngine.prototype.calculateDataDrivenAttribution = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var journey, attributions, channelContributions, recommendations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        journey = this.journeys.get(userId);
                        if (!journey)
                            throw new Error('Customer journey not found');
                        return [4 /*yield*/, this.applyMLAttribution(journey)];
                    case 1:
                        attributions = _a.sent();
                        channelContributions = this.calculateChannelContributions(attributions);
                        recommendations = this.generateOptimizationRecommendations(channelContributions);
                        return [2 /*return*/, {
                                attributions: attributions,
                                channelContributions: channelContributions,
                                optimizationRecommendations: recommendations
                            }];
                }
            });
        });
    };
    /**
     * Analyse du parcours client cross-device
     */
    AttributionModelEngine.prototype.analyzeCrossDeviceJourney = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var crossDeviceData, deviceSequence, conversionDevice, researchDevices, deviceInfluence, unifiedJourney;
            return __generator(this, function (_a) {
                crossDeviceData = this.crossDeviceData.get(userId);
                if (!crossDeviceData)
                    throw new Error('Cross-device data not found');
                deviceSequence = this.calculateDeviceSequence(crossDeviceData);
                conversionDevice = this.identifyConversionDevice(crossDeviceData);
                researchDevices = this.identifyResearchDevices(crossDeviceData);
                deviceInfluence = this.calculateDeviceInfluence(crossDeviceData);
                unifiedJourney = this.createUnifiedJourney(crossDeviceData);
                return [2 /*return*/, {
                        deviceSequence: deviceSequence,
                        conversionDevice: conversionDevice,
                        researchDevices: researchDevices,
                        deviceInfluence: deviceInfluence,
                        unifiedJourney: unifiedJourney
                    }];
            });
        });
    };
    /**
     * ROI par canal avec attribution
     */
    AttributionModelEngine.prototype.calculateChannelROI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channelData, channels, _i, channelData_1, _a, channelName, data, roi, roas, totalROI, bestPerformingChannel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.aggregateChannelData()];
                    case 1:
                        channelData = _b.sent();
                        channels = [];
                        for (_i = 0, channelData_1 = channelData; _i < channelData_1.length; _i++) {
                            _a = channelData_1[_i], channelName = _a[0], data = _a[1];
                            roi = ((data.revenue - data.cost) / data.cost) * 100;
                            roas = data.revenue / data.cost;
                            channels.push({
                                name: channelName,
                                cost: data.cost,
                                attributedRevenue: data.revenue,
                                attributedConversions: data.conversions,
                                roi: roi,
                                roas: roas,
                                efficiency: data.conversions / data.cost,
                                trend: this.calculateChannelTrend(channelName)
                            });
                        }
                        totalROI = channels.reduce(function (sum, ch) { return sum + ch.roi; }, 0) / channels.length;
                        bestPerformingChannel = channels.reduce(function (best, current) {
                            return current.roi > best.roi ? current : best;
                        }).name;
                        return [2 /*return*/, {
                                channels: channels,
                                totalROI: totalROI,
                                bestPerformingChannel: bestPerformingChannel,
                                recommendations: this.generateROIRecommendations(channels)
                            }];
                }
            });
        });
    };
    /**
     * Mapping des événements de conversion
     */
    AttributionModelEngine.prototype.setupConversionTracking = function () {
        return __awaiter(this, void 0, void 0, function () {
            var events, funnelConfiguration, crossPlatformSetup;
            return __generator(this, function (_a) {
                events = [
                    {
                        name: 'page_view',
                        value: 0,
                        funnel_stage: 'awareness',
                        tracking_code: 'gtag("event", "page_view", { page_title: document.title });',
                        attribution_window: 30
                    },
                    {
                        name: 'menu_view',
                        value: 5,
                        funnel_stage: 'interest',
                        tracking_code: 'gtag("event", "menu_view", { menu_section: section });',
                        attribution_window: 7
                    },
                    {
                        name: 'reservation_start',
                        value: 15,
                        funnel_stage: 'consideration',
                        tracking_code: 'gtag("event", "begin_checkout", { currency: "EUR", value: 0 });',
                        attribution_window: 7
                    },
                    {
                        name: 'reservation_complete',
                        value: 50,
                        funnel_stage: 'conversion',
                        tracking_code: 'gtag("event", "purchase", { transaction_id: id, value: 50, currency: "EUR" });',
                        attribution_window: 1
                    },
                    {
                        name: 'phone_click',
                        value: 25,
                        funnel_stage: 'conversion',
                        tracking_code: 'gtag("event", "generate_lead", { method: "phone" });',
                        attribution_window: 1
                    }
                ];
                funnelConfiguration = {
                    stages: ['awareness', 'interest', 'consideration', 'conversion', 'retention'],
                    dropOffPoints: ['menu_to_reservation', 'reservation_start_to_complete'],
                    optimizationOpportunities: [
                        'Optimiser la page menu pour augmenter les conversions',
                        'Simplifier le processus de réservation',
                        'Ajouter des incitations sur la page de réservation'
                    ]
                };
                crossPlatformSetup = {
                    googleAnalytics: 'G-XXXXXXXXXX',
                    googleAds: 'AW-XXXXXXXXX',
                    metaPixel: 'XXXXXXXXXXXXXXXXX',
                    customEvents: {
                        server_side_tracking: true,
                        enhanced_conversions: true,
                        offline_conversions: true
                    }
                };
                return [2 /*return*/, {
                        events: events,
                        funnelConfiguration: funnelConfiguration,
                        crossPlatformSetup: crossPlatformSetup
                    }];
            });
        });
    };
    /**
     * Analyse des micro-conversions
     */
    AttributionModelEngine.prototype.analyzeMicroConversions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var microConversions, macroConversionCorrelation, optimizationPriority;
            return __generator(this, function (_a) {
                microConversions = [
                    {
                        name: 'menu_download',
                        volume: 250,
                        value: 5,
                        conversionRate: 0.15,
                        channelBreakdown: {
                            'organic_search': 45,
                            'paid_search': 30,
                            'social_media': 15,
                            'direct': 10
                        },
                        predictiveValue: 0.25 // 25% de probabilité de conversion macro
                    },
                    {
                        name: 'location_view',
                        volume: 180,
                        value: 3,
                        conversionRate: 0.08,
                        channelBreakdown: {
                            'organic_search': 40,
                            'paid_search': 35,
                            'social_media': 20,
                            'direct': 5
                        },
                        predictiveValue: 0.12
                    },
                    {
                        name: 'chef_bio_view',
                        volume: 120,
                        value: 8,
                        conversionRate: 0.22,
                        channelBreakdown: {
                            'organic_search': 35,
                            'paid_search': 25,
                            'social_media': 30,
                            'direct': 10
                        },
                        predictiveValue: 0.35
                    }
                ];
                macroConversionCorrelation = {
                    'menu_download': 0.68,
                    'location_view': 0.34,
                    'chef_bio_view': 0.78,
                    'contact_form_view': 0.56
                };
                optimizationPriority = [
                    'Optimiser la page chef (corrélation élevée)',
                    'Améliorer la visibilité du menu téléchargeable',
                    'Simplifier l\'accès aux informations de contact'
                ];
                return [2 /*return*/, {
                        microConversions: microConversions,
                        macroConversionCorrelation: macroConversionCorrelation,
                        optimizationPriority: optimizationPriority
                    }];
            });
        });
    };
    /**
     * Méthodes privées
     */
    AttributionModelEngine.prototype.updateCustomerJourney = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var touchPoints, firstTouchPoint, lastTouchPoint, journey;
            return __generator(this, function (_a) {
                touchPoints = this.touchPoints.get(userId) || [];
                if (touchPoints.length === 0)
                    return [2 /*return*/];
                firstTouchPoint = touchPoints[0];
                lastTouchPoint = touchPoints[touchPoints.length - 1];
                journey = {
                    userId: userId,
                    startDate: firstTouchPoint.timestamp,
                    endDate: lastTouchPoint.timestamp,
                    touchPoints: touchPoints,
                    conversions: this.extractConversions(touchPoints),
                    totalRevenue: this.calculateTotalRevenue(touchPoints),
                    journeyDuration: this.calculateJourneyDuration(firstTouchPoint.timestamp, lastTouchPoint.timestamp),
                    touchPointCount: touchPoints.length,
                    channelSequence: this.extractChannelSequence(touchPoints),
                    deviceJourney: this.extractDeviceJourney(touchPoints)
                };
                this.journeys.set(userId, journey);
                return [2 /*return*/];
            });
        });
    };
    AttributionModelEngine.prototype.updateCrossDeviceMapping = function (touchPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var mapping, deviceId, existingDevice;
            return __generator(this, function (_a) {
                mapping = this.crossDeviceData.get(touchPoint.userId);
                if (!mapping) {
                    mapping = {
                        userId: touchPoint.userId,
                        devices: [],
                        identificationMethod: 'deterministic',
                        confidence: 0.95,
                        unifiedTouchPoints: []
                    };
                }
                deviceId = "".concat(touchPoint.device, "_").concat(touchPoint.sessionId);
                existingDevice = mapping.devices.find(function (d) { return d.deviceId === deviceId; });
                if (existingDevice) {
                    existingDevice.lastSeen = touchPoint.timestamp;
                    existingDevice.touchPoints.push(touchPoint.id);
                }
                else {
                    mapping.devices.push({
                        deviceId: deviceId,
                        type: touchPoint.device,
                        firstSeen: touchPoint.timestamp,
                        lastSeen: touchPoint.timestamp,
                        touchPoints: [touchPoint.id]
                    });
                }
                mapping.unifiedTouchPoints.push(touchPoint);
                this.crossDeviceData.set(touchPoint.userId, mapping);
                return [2 /*return*/];
            });
        });
    };
    AttributionModelEngine.prototype.applyAttributionModel = function (journey, model) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                results = [];
                switch (model.type) {
                    case 'first_touch':
                        return [2 /*return*/, this.applyFirstTouchAttribution(journey)];
                    case 'last_touch':
                        return [2 /*return*/, this.applyLastTouchAttribution(journey)];
                    case 'linear':
                        return [2 /*return*/, this.applyLinearAttribution(journey)];
                    case 'time_decay':
                        return [2 /*return*/, this.applyTimeDecayAttribution(journey, model.parameters.decayRate || 0.7)];
                    case 'position_based':
                        return [2 /*return*/, this.applyPositionBasedAttribution(journey, model.parameters.positionWeights)];
                    case 'data_driven':
                        return [2 /*return*/, this.applyMLAttribution(journey)];
                    case 'custom':
                        return [2 /*return*/, model.customLogic(journey)];
                    default:
                        return [2 /*return*/, this.applyLinearAttribution(journey)];
                }
                return [2 /*return*/];
            });
        });
    };
    AttributionModelEngine.prototype.applyFirstTouchAttribution = function (journey) {
        var firstTouchPoint = journey.touchPoints[0];
        return [{
                touchPointId: firstTouchPoint.id,
                channel: firstTouchPoint.channel,
                attributionWeight: 1.0,
                attributedRevenue: journey.totalRevenue,
                attributedConversions: journey.conversions.length,
                influenceScore: 1.0,
                positionWeight: 1.0,
                decayWeight: 1.0,
                timeWeight: 1.0
            }];
    };
    AttributionModelEngine.prototype.applyLastTouchAttribution = function (journey) {
        var lastTouchPoint = journey.touchPoints[journey.touchPoints.length - 1];
        return [{
                touchPointId: lastTouchPoint.id,
                channel: lastTouchPoint.channel,
                attributionWeight: 1.0,
                attributedRevenue: journey.totalRevenue,
                attributedConversions: journey.conversions.length,
                influenceScore: 1.0,
                positionWeight: 1.0,
                decayWeight: 1.0,
                timeWeight: 1.0
            }];
    };
    AttributionModelEngine.prototype.applyLinearAttribution = function (journey) {
        var weight = 1.0 / journey.touchPoints.length;
        return journey.touchPoints.map(function (tp) { return ({
            touchPointId: tp.id,
            channel: tp.channel,
            attributionWeight: weight,
            attributedRevenue: journey.totalRevenue * weight,
            attributedConversions: journey.conversions.length * weight,
            influenceScore: weight,
            positionWeight: weight,
            decayWeight: 1.0,
            timeWeight: 1.0
        }); });
    };
    AttributionModelEngine.prototype.applyTimeDecayAttribution = function (journey, decayRate) {
        var results = [];
        var totalTouchPoints = journey.touchPoints.length;
        for (var i = 0; i < totalTouchPoints; i++) {
            var tp = journey.touchPoints[i];
            var daysFromConversion = (journey.endDate.getTime() - tp.timestamp.getTime()) / (1000 * 60 * 60 * 24);
            var decayWeight = Math.pow(decayRate, daysFromConversion);
            results.push({
                touchPointId: tp.id,
                channel: tp.channel,
                attributionWeight: decayWeight,
                attributedRevenue: journey.totalRevenue * decayWeight,
                attributedConversions: journey.conversions.length * decayWeight,
                influenceScore: decayWeight,
                positionWeight: 1.0,
                decayWeight: decayWeight,
                timeWeight: 1.0
            });
        }
        // Normalisation des poids
        var totalWeight = results.reduce(function (sum, r) { return sum + r.attributionWeight; }, 0);
        results.forEach(function (r) {
            r.attributionWeight /= totalWeight;
            r.attributedRevenue /= totalWeight;
            r.attributedConversions /= totalWeight;
        });
        return results;
    };
    AttributionModelEngine.prototype.applyPositionBasedAttribution = function (journey, weights) {
        var results = [];
        var totalTouchPoints = journey.touchPoints.length;
        for (var i = 0; i < totalTouchPoints; i++) {
            var tp = journey.touchPoints[i];
            var weight = weights.middle;
            if (i === 0)
                weight = weights.first;
            else if (i === totalTouchPoints - 1)
                weight = weights.last;
            results.push({
                touchPointId: tp.id,
                channel: tp.channel,
                attributionWeight: weight,
                attributedRevenue: journey.totalRevenue * weight,
                attributedConversions: journey.conversions.length * weight,
                influenceScore: weight,
                positionWeight: weight,
                decayWeight: 1.0,
                timeWeight: 1.0
            });
        }
        return results;
    };
    AttributionModelEngine.prototype.applyMLAttribution = function (journey) {
        return __awaiter(this, void 0, void 0, function () {
            var results, features, i, tp, influenceScore, totalWeight;
            return __generator(this, function (_a) {
                results = [];
                features = this.extractMLFeatures(journey);
                for (i = 0; i < journey.touchPoints.length; i++) {
                    tp = journey.touchPoints[i];
                    influenceScore = this.calculateInfluenceScore(tp, journey, features);
                    results.push({
                        touchPointId: tp.id,
                        channel: tp.channel,
                        attributionWeight: influenceScore,
                        attributedRevenue: journey.totalRevenue * influenceScore,
                        attributedConversions: journey.conversions.length * influenceScore,
                        influenceScore: influenceScore,
                        positionWeight: this.calculatePositionWeight(i, journey.touchPoints.length),
                        decayWeight: this.calculateDecayWeight(tp.timestamp, journey.endDate),
                        timeWeight: this.calculateTimeWeight(tp.timestamp, journey)
                    });
                }
                totalWeight = results.reduce(function (sum, r) { return sum + r.attributionWeight; }, 0);
                results.forEach(function (r) {
                    r.attributionWeight /= totalWeight;
                    r.attributedRevenue /= totalWeight;
                    r.attributedConversions /= totalWeight;
                });
                return [2 /*return*/, results];
            });
        });
    };
    AttributionModelEngine.prototype.extractMLFeatures = function (journey) {
        return {
            journey_length: journey.touchPointCount,
            journey_duration: journey.journeyDuration,
            total_revenue: journey.totalRevenue,
            conversion_count: journey.conversions.length,
            unique_channels: new Set(journey.channelSequence).size,
            device_switches: this.countDeviceSwitches(journey.deviceJourney),
            weekend_touchpoints: this.countWeekendTouchpoints(journey.touchPoints),
            mobile_ratio: journey.touchPoints.filter(function (tp) { return tp.device === 'mobile'; }).length / journey.touchPoints.length
        };
    };
    AttributionModelEngine.prototype.calculateInfluenceScore = function (touchPoint, journey, features) {
        // Simulation d'un score d'influence ML
        var score = 0.1; // Score de base
        // Bonus pour le premier et dernier touchpoint
        var index = journey.touchPoints.indexOf(touchPoint);
        if (index === 0)
            score += 0.3;
        if (index === journey.touchPoints.length - 1)
            score += 0.4;
        // Bonus basé sur le canal
        var channelWeights = {
            'paid_search': 0.25,
            'organic_search': 0.20,
            'social_media': 0.15,
            'direct': 0.30,
            'email': 0.25,
            'referral': 0.10,
            'display': 0.05,
            'video': 0.15
        };
        score += channelWeights[touchPoint.channel] || 0.1;
        // Bonus pour les interactions
        var totalInteractions = touchPoint.pageViews.reduce(function (sum, pv) { return sum + pv.interactions; }, 0);
        score += Math.min(totalInteractions * 0.05, 0.2);
        // Bonus pour la proximité avec la conversion
        var hoursToConversion = (journey.endDate.getTime() - touchPoint.timestamp.getTime()) / (1000 * 60 * 60);
        if (hoursToConversion < 24)
            score += 0.15;
        else if (hoursToConversion < 72)
            score += 0.10;
        return Math.min(score, 1.0);
    };
    AttributionModelEngine.prototype.calculatePositionWeight = function (index, totalTouchPoints) {
        if (index === 0)
            return 0.4; // Premier touchpoint
        if (index === totalTouchPoints - 1)
            return 0.4; // Dernier touchpoint
        return 0.2 / (totalTouchPoints - 2); // Touchpoints intermédiaires
    };
    AttributionModelEngine.prototype.calculateDecayWeight = function (touchPointTime, conversionTime) {
        var hoursDiff = (conversionTime.getTime() - touchPointTime.getTime()) / (1000 * 60 * 60);
        return Math.exp(-hoursDiff / 168); // Décroissance sur 7 jours
    };
    AttributionModelEngine.prototype.calculateTimeWeight = function (touchPointTime, journey) {
        var journeyDuration = journey.journeyDuration;
        var timeFromStart = (touchPointTime.getTime() - journey.startDate.getTime()) / (1000 * 60 * 60);
        return 1 - (timeFromStart / journeyDuration);
    };
    AttributionModelEngine.prototype.countDeviceSwitches = function (deviceJourney) {
        var switches = 0;
        for (var i = 1; i < deviceJourney.length; i++) {
            if (deviceJourney[i] !== deviceJourney[i - 1])
                switches++;
        }
        return switches;
    };
    AttributionModelEngine.prototype.countWeekendTouchpoints = function (touchPoints) {
        return touchPoints.filter(function (tp) {
            var day = tp.timestamp.getDay();
            return day === 0 || day === 6; // Dimanche ou Samedi
        }).length;
    };
    AttributionModelEngine.prototype.extractConversions = function (touchPoints) {
        var conversions = [];
        for (var _i = 0, touchPoints_1 = touchPoints; _i < touchPoints_1.length; _i++) {
            var tp = touchPoints_1[_i];
            for (var _a = 0, _b = tp.events; _a < _b.length; _a++) {
                var event_1 = _b[_a];
                if (this.isConversionEvent(event_1.name)) {
                    conversions.push({
                        type: this.getConversionType(event_1.name),
                        value: event_1.value || 0,
                        timestamp: tp.timestamp,
                        touchPointId: tp.id
                    });
                }
            }
        }
        return conversions;
    };
    AttributionModelEngine.prototype.calculateTotalRevenue = function (touchPoints) {
        return touchPoints.reduce(function (sum, tp) { return sum + (tp.revenue || 0); }, 0);
    };
    AttributionModelEngine.prototype.calculateJourneyDuration = function (start, end) {
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // en heures
    };
    AttributionModelEngine.prototype.extractChannelSequence = function (touchPoints) {
        return touchPoints.map(function (tp) { return tp.channel; });
    };
    AttributionModelEngine.prototype.extractDeviceJourney = function (touchPoints) {
        return touchPoints.map(function (tp) { return tp.device; });
    };
    AttributionModelEngine.prototype.isConversionEvent = function (eventName) {
        var conversionEvents = ['purchase', 'reservation_complete', 'contact_form_submit', 'phone_click'];
        return conversionEvents.includes(eventName);
    };
    AttributionModelEngine.prototype.getConversionType = function (eventName) {
        var macroEvents = ['purchase', 'reservation_complete'];
        return macroEvents.includes(eventName) ? 'macro' : 'micro';
    };
    AttributionModelEngine.prototype.generateAttributionInsights = function (attributions, journey) {
        var insights = [];
        var topChannel = attributions.reduce(function (top, current) {
            return current.attributedRevenue > top.attributedRevenue ? current : top;
        });
        insights.push("Canal le plus influent: ".concat(topChannel.channel, " (").concat(Math.round(topChannel.attributedRevenue), "\u20AC)"));
        insights.push("Parcours de ".concat(journey.touchPointCount, " touchpoints sur ").concat(Math.round(journey.journeyDuration), " heures"));
        if (journey.deviceJourney.length > 1) {
            var deviceSwitches = this.countDeviceSwitches(journey.deviceJourney);
            insights.push("".concat(deviceSwitches, " changements d'appareil d\u00E9tect\u00E9s"));
        }
        return insights;
    };
    AttributionModelEngine.prototype.calculateModelAccuracy = function (attributions, journey) {
        // Simulation d'un calcul de précision du modèle
        var totalAttributed = attributions.reduce(function (sum, a) { return sum + a.attributedRevenue; }, 0);
        var accuracy = Math.min(totalAttributed / journey.totalRevenue, 1.0);
        return Math.round(accuracy * 100) / 100;
    };
    AttributionModelEngine.prototype.calculateChannelContributions = function (attributions) {
        var contributions = {};
        for (var _i = 0, attributions_1 = attributions; _i < attributions_1.length; _i++) {
            var attr = attributions_1[_i];
            if (!contributions[attr.channel]) {
                contributions[attr.channel] = {
                    revenue: 0,
                    conversions: 0,
                    influence: 0,
                    efficiency: 0
                };
            }
            contributions[attr.channel].revenue += attr.attributedRevenue;
            contributions[attr.channel].conversions += attr.attributedConversions;
            contributions[attr.channel].influence += attr.influenceScore;
        }
        // Calcul de l'efficacité (revenue / influence)
        Object.keys(contributions).forEach(function (channel) {
            contributions[channel].efficiency = contributions[channel].revenue / contributions[channel].influence;
        });
        return contributions;
    };
    AttributionModelEngine.prototype.generateOptimizationRecommendations = function (channelContributions) {
        var recommendations = [];
        var sortedChannels = Object.entries(channelContributions)
            .sort(function (_a, _b) {
            var a = _a[1];
            var b = _b[1];
            return b.efficiency - a.efficiency;
        });
        var topChannel = sortedChannels[0];
        var bottomChannel = sortedChannels[sortedChannels.length - 1];
        recommendations.push("Augmenter l'investissement sur ".concat(topChannel[0], " (efficacit\u00E9: ").concat(Math.round(topChannel[1].efficiency), ")"));
        recommendations.push("Revoir la strat\u00E9gie pour ".concat(bottomChannel[0], " (efficacit\u00E9: ").concat(Math.round(bottomChannel[1].efficiency), ")"));
        return recommendations;
    };
    AttributionModelEngine.prototype.aggregateChannelData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = new Map();
                // Données simulées basées sur la config marketing
                data.set('paid_search', {
                    cost: this.config.budget.distribution.googleAds,
                    revenue: this.config.budget.distribution.googleAds * 3.2, // ROAS simulé
                    conversions: 45
                });
                data.set('social_media', {
                    cost: this.config.budget.distribution.metaAds,
                    revenue: this.config.budget.distribution.metaAds * 2.8,
                    conversions: 38
                });
                return [2 /*return*/, data];
            });
        });
    };
    AttributionModelEngine.prototype.calculateChannelTrend = function (channelName) {
        // Simulation de calcul de tendance
        var trends = ['up', 'down', 'stable'];
        return trends[Math.floor(Math.random() * trends.length)];
    };
    AttributionModelEngine.prototype.generateROIRecommendations = function (channels) {
        var recommendations = [];
        var highROI = channels.filter(function (ch) { return ch.roi > 200; });
        var lowROI = channels.filter(function (ch) { return ch.roi < 100; });
        if (highROI.length > 0) {
            recommendations.push("Augmenter le budget sur les canaux haute performance: ".concat(highROI.map(function (ch) { return ch.name; }).join(', ')));
        }
        if (lowROI.length > 0) {
            recommendations.push("Optimiser ou r\u00E9duire l'investissement sur: ".concat(lowROI.map(function (ch) { return ch.name; }).join(', ')));
        }
        return recommendations;
    };
    AttributionModelEngine.prototype.calculateDeviceSequence = function (crossDeviceData) {
        return crossDeviceData.devices.map(function (device) { return ({
            device: device.type,
            touchPoints: device.touchPoints.length,
            revenue: 0, // À calculer basé sur les touchpoints
            timeSpent: (device.lastSeen.getTime() - device.firstSeen.getTime()) / (1000 * 60) // en minutes
        }); });
    };
    AttributionModelEngine.prototype.identifyConversionDevice = function (crossDeviceData) {
        var _this = this;
        // Identifier l'appareil de conversion
        var conversions = crossDeviceData.unifiedTouchPoints.filter(function (tp) {
            return tp.events.some(function (event) { return _this.isConversionEvent(event.name); });
        });
        if (conversions.length > 0) {
            return conversions[conversions.length - 1].device;
        }
        return 'unknown';
    };
    AttributionModelEngine.prototype.identifyResearchDevices = function (crossDeviceData) {
        // Identifier les appareils utilisés pour la recherche
        return crossDeviceData.devices
            .filter(function (device) { return device.touchPoints.length > 2; })
            .map(function (device) { return device.type; });
    };
    AttributionModelEngine.prototype.calculateDeviceInfluence = function (crossDeviceData) {
        var influence = {};
        crossDeviceData.devices.forEach(function (device) {
            influence[device.type] = device.touchPoints.length / crossDeviceData.unifiedTouchPoints.length;
        });
        return influence;
    };
    AttributionModelEngine.prototype.createUnifiedJourney = function (crossDeviceData) {
        var touchPoints = crossDeviceData.unifiedTouchPoints.sort(function (a, b) {
            return a.timestamp.getTime() - b.timestamp.getTime();
        });
        return {
            userId: crossDeviceData.userId,
            startDate: touchPoints[0].timestamp,
            endDate: touchPoints[touchPoints.length - 1].timestamp,
            touchPoints: touchPoints,
            conversions: this.extractConversions(touchPoints),
            totalRevenue: this.calculateTotalRevenue(touchPoints),
            journeyDuration: this.calculateJourneyDuration(touchPoints[0].timestamp, touchPoints[touchPoints.length - 1].timestamp),
            touchPointCount: touchPoints.length,
            channelSequence: this.extractChannelSequence(touchPoints),
            deviceJourney: this.extractDeviceJourney(touchPoints)
        };
    };
    AttributionModelEngine.prototype.initializeModels = function () {
        // Modèle Data-Driven par défaut
        this.models.set('data_driven', {
            name: 'Data-Driven Attribution',
            type: 'data_driven',
            parameters: {
                lookbackWindow: 30
            }
        });
        // Modèle Position-Based (40% premier, 20% milieu, 40% dernier)
        this.models.set('position_based', {
            name: 'Position-Based Attribution',
            type: 'position_based',
            parameters: {
                lookbackWindow: 30,
                positionWeights: {
                    first: 0.4,
                    middle: 0.2,
                    last: 0.4
                }
            }
        });
        // Modèle Time-Decay
        this.models.set('time_decay', {
            name: 'Time-Decay Attribution',
            type: 'time_decay',
            parameters: {
                lookbackWindow: 30,
                decayRate: 0.7
            }
        });
    };
    return AttributionModelEngine;
}());
exports.AttributionModelEngine = AttributionModelEngine;
exports.default = AttributionModelEngine;
