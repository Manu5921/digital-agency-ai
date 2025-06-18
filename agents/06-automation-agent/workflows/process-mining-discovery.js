"use strict";
/**
 * PROCESS MINING ENGINE - Phase 3 Hyperautomation
 * Business process discovery automatique avec IA avancée
 * Agent: Automation Specialist
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
exports.demoProcessMining = exports.createProcessMiningEngine = exports.ProcessMiningEngine = exports.ProcessModelSchema = exports.ProcessEventSchema = void 0;
var zod_1 = require("zod");
var events_1 = require("events");
// 🔍 SCHEMAS & INTERFACES
exports.ProcessEventSchema = zod_1.z.object({
    id: zod_1.z.string(),
    timestamp: zod_1.z.date(),
    activityName: zod_1.z.string(),
    caseId: zod_1.z.string(),
    resource: zod_1.z.string().optional(),
    duration: zod_1.z.number().optional(),
    cost: zod_1.z.number().optional(),
    attributes: zod_1.z.record(zod_1.z.any()).optional()
});
exports.ProcessModelSchema = zod_1.z.object({
    processId: zod_1.z.string(),
    activities: zod_1.z.array(zod_1.z.string()),
    transitions: zod_1.z.array(zod_1.z.object({
        from: zod_1.z.string(),
        to: zod_1.z.string(),
        frequency: zod_1.z.number(),
        avgDuration: zod_1.z.number()
    })),
    bottlenecks: zod_1.z.array(zod_1.z.object({
        activity: zod_1.z.string(),
        severity: zod_1.z.enum(['low', 'medium', 'high', 'critical']),
        impact: zod_1.z.number(),
        recommendation: zod_1.z.string()
    })),
    conformance: zod_1.z.object({
        score: zod_1.z.number(),
        violations: zod_1.z.array(zod_1.z.string()),
        complianceLevel: zod_1.z.enum(['poor', 'fair', 'good', 'excellent'])
    }),
    kpis: zod_1.z.object({
        avgCycleTime: zod_1.z.number(),
        throughput: zod_1.z.number(),
        efficiency: zod_1.z.number(),
        reworkRate: zod_1.z.number(),
        automationPotential: zod_1.z.number()
    })
});
// 🧠 PROCESS MINING ENGINE CORE
var ProcessMiningEngine = /** @class */ (function (_super) {
    __extends(ProcessMiningEngine, _super);
    function ProcessMiningEngine(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.eventLogs = new Map();
        _this.processModels = new Map();
        _this.mlModels = new Map();
        _this.realTimeBuffer = [];
        _this.startRealTimeProcessing();
        return _this;
    }
    // 📊 PROCESS DISCOVERY - Graph Mining Algorithm
    ProcessMiningEngine.prototype.discoverProcess = function (caseId) {
        return __awaiter(this, void 0, void 0, function () {
            var events, activityGraph, bottlenecks, conformance, kpis, recommendations, processModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD0D Discovering process model for case: ".concat(caseId));
                        events = this.eventLogs.get(caseId) || [];
                        if (events.length === 0) {
                            throw new Error("No events found for case ".concat(caseId));
                        }
                        activityGraph = this.buildActivityGraph(events);
                        return [4 /*yield*/, this.detectBottlenecks(events, activityGraph)];
                    case 1:
                        bottlenecks = _a.sent();
                        return [4 /*yield*/, this.checkConformance(events)];
                    case 2:
                        conformance = _a.sent();
                        kpis = this.calculateKPIs(events);
                        return [4 /*yield*/, this.generateOptimizationRecommendations(bottlenecks, conformance, kpis)];
                    case 3:
                        recommendations = _a.sent();
                        processModel = {
                            processId: caseId,
                            activities: __spreadArray([], new Set(events.map(function (e) { return e.activityName; })), true),
                            transitions: activityGraph.transitions,
                            bottlenecks: bottlenecks,
                            conformance: conformance,
                            kpis: kpis
                        };
                        this.processModels.set(caseId, processModel);
                        this.emit('processDiscovered', { caseId: caseId, processModel: processModel, recommendations: recommendations });
                        return [2 /*return*/, processModel];
                }
            });
        });
    };
    // 🏗️ BUILD ACTIVITY GRAPH - Advanced Graph Mining
    ProcessMiningEngine.prototype.buildActivityGraph = function (events) {
        console.log("\uD83D\uDCC8 Building activity graph from ".concat(events.length, " events"));
        var sortedEvents = events.sort(function (a, b) { return a.timestamp.getTime() - b.timestamp.getTime(); });
        var transitions = new Map();
        var nodes = new Set();
        for (var i = 0; i < sortedEvents.length - 1; i++) {
            var current = sortedEvents[i];
            var next = sortedEvents[i + 1];
            nodes.add(current.activityName);
            nodes.add(next.activityName);
            var transitionKey = "".concat(current.activityName, " -> ").concat(next.activityName);
            var duration = next.timestamp.getTime() - current.timestamp.getTime();
            if (!transitions.has(transitionKey)) {
                transitions.set(transitionKey, { count: 0, totalDuration: 0 });
            }
            var transition = transitions.get(transitionKey);
            transition.count++;
            transition.totalDuration += duration;
        }
        var formattedTransitions = Array.from(transitions.entries()).map(function (_a) {
            var key = _a[0], data = _a[1];
            var _b = key.split(' -> '), from = _b[0], to = _b[1];
            return {
                from: from,
                to: to,
                frequency: data.count,
                avgDuration: data.totalDuration / data.count
            };
        });
        return {
            nodes: Array.from(nodes),
            transitions: formattedTransitions
        };
    };
    // 🚨 BOTTLENECK DETECTION - ML Algorithm
    ProcessMiningEngine.prototype.detectBottlenecks = function (events, graph) {
        return __awaiter(this, void 0, void 0, function () {
            var activityStats, bottlenecks;
            return __generator(this, function (_a) {
                console.log('🚨 Detecting bottlenecks using ML analysis');
                activityStats = new Map();
                events.forEach(function (event) {
                    if (!activityStats.has(event.activityName)) {
                        activityStats.set(event.activityName, {
                            totalDuration: 0,
                            count: 0,
                            waitingTime: 0,
                            resourceUtilization: 0
                        });
                    }
                    var stats = activityStats.get(event.activityName);
                    stats.totalDuration += event.duration || 0;
                    stats.count++;
                });
                bottlenecks = Array.from(activityStats.entries()).map(function (_a) {
                    var activity = _a[0], stats = _a[1];
                    var avgDuration = stats.totalDuration / stats.count;
                    var frequency = stats.count;
                    // ML scoring algorithm (simplified)
                    var durationScore = Math.min(avgDuration / 10000, 1); // Normalize to 0-1
                    var frequencyScore = Math.min(frequency / 100, 1);
                    var bottleneckScore = (durationScore * 0.6) + (frequencyScore * 0.4);
                    var severity;
                    var recommendation;
                    if (bottleneckScore > 0.8) {
                        severity = 'critical';
                        recommendation = "URGENT: Parallelize ".concat(activity, " or add more resources. Consider AI automation.");
                    }
                    else if (bottleneckScore > 0.6) {
                        severity = 'high';
                        recommendation = "High impact: Optimize ".concat(activity, " workflow or implement queue management.");
                    }
                    else if (bottleneckScore > 0.4) {
                        severity = 'medium';
                        recommendation = "Medium priority: Review ".concat(activity, " for efficiency improvements.");
                    }
                    else {
                        severity = 'low';
                        recommendation = "Low priority: Monitor ".concat(activity, " performance trends.");
                    }
                    return {
                        activity: activity,
                        severity: severity,
                        impact: bottleneckScore,
                        recommendation: recommendation
                    };
                }).filter(function (b) { return b.impact > 0.3; });
                return [2 /*return*/, bottlenecks.sort(function (a, b) { return b.impact - a.impact; })];
            });
        });
    };
    // ✅ CONFORMANCE CHECKING - Real-time Compliance
    ProcessMiningEngine.prototype.checkConformance = function (events) {
        return __awaiter(this, void 0, void 0, function () {
            var violations, totalChecks, passedChecks, businessRules, score, complianceLevel;
            return __generator(this, function (_a) {
                console.log('✅ Checking process conformance against business rules');
                violations = [];
                totalChecks = 0;
                passedChecks = 0;
                businessRules = [
                    {
                        name: 'Sequential Activities',
                        check: function (events) {
                            // Check if critical activities follow proper sequence
                            var criticalSequence = ['design', 'development', 'testing', 'deployment'];
                            var activities = events.map(function (e) { return e.activityName.toLowerCase(); });
                            for (var i = 0; i < criticalSequence.length - 1; i++) {
                                var currentIndex = activities.indexOf(criticalSequence[i]);
                                var nextIndex = activities.indexOf(criticalSequence[i + 1]);
                                if (currentIndex >= 0 && nextIndex >= 0 && currentIndex > nextIndex) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    },
                    {
                        name: 'Resource Authorization',
                        check: function (events) {
                            // Check if resources are authorized for activities
                            return events.every(function (event) { return event.resource && event.resource.length > 0; });
                        }
                    },
                    {
                        name: 'Duration Limits',
                        check: function (events) {
                            // Check if activities exceed maximum duration limits
                            var maxDurations = {
                                'design': 86400000, // 24h
                                'development': 259200000, // 72h
                                'review': 7200000, // 2h
                            };
                            return events.every(function (event) {
                                var maxDuration = maxDurations[event.activityName.toLowerCase()];
                                return !maxDuration || !event.duration || event.duration <= maxDuration;
                            });
                        }
                    }
                ];
                // Execute conformance checks
                businessRules.forEach(function (rule) {
                    totalChecks++;
                    try {
                        if (rule.check(events)) {
                            passedChecks++;
                        }
                        else {
                            violations.push("Violation: ".concat(rule.name));
                        }
                    }
                    catch (error) {
                        violations.push("Error checking ".concat(rule.name, ": ").concat(error));
                    }
                });
                score = totalChecks > 0 ? (passedChecks / totalChecks) : 1;
                if (score >= 0.9)
                    complianceLevel = 'excellent';
                else if (score >= 0.7)
                    complianceLevel = 'good';
                else if (score >= 0.5)
                    complianceLevel = 'fair';
                else
                    complianceLevel = 'poor';
                return [2 /*return*/, {
                        score: score,
                        violations: violations,
                        complianceLevel: complianceLevel
                    }];
            });
        });
    };
    // 📊 KPI CALCULATION - Advanced Metrics
    ProcessMiningEngine.prototype.calculateKPIs = function (events) {
        console.log('📊 Calculating advanced process KPIs');
        var sortedEvents = events.sort(function (a, b) { return a.timestamp.getTime() - b.timestamp.getTime(); });
        // Average Cycle Time
        var totalTime = sortedEvents.length > 1
            ? sortedEvents[sortedEvents.length - 1].timestamp.getTime() - sortedEvents[0].timestamp.getTime()
            : 0;
        var avgCycleTime = totalTime / (sortedEvents.length || 1);
        // Throughput (events per hour)
        var timeSpanHours = totalTime / (1000 * 60 * 60);
        var throughput = timeSpanHours > 0 ? events.length / timeSpanHours : 0;
        // Efficiency (value-added time / total time)
        var valueAddedActivities = ['design', 'development', 'testing'];
        var valueAddedTime = events
            .filter(function (e) { return valueAddedActivities.some(function (va) { return e.activityName.toLowerCase().includes(va); }); })
            .reduce(function (sum, e) { return sum + (e.duration || 0); }, 0);
        var efficiency = totalTime > 0 ? valueAddedTime / totalTime : 0;
        // Rework Rate
        var reworkActivities = events.filter(function (e) {
            return e.activityName.toLowerCase().includes('rework') ||
                e.activityName.toLowerCase().includes('fix') ||
                e.activityName.toLowerCase().includes('correction');
        });
        var reworkRate = events.length > 0 ? reworkActivities.length / events.length : 0;
        // Automation Potential (ML-based scoring)
        var repetitiveActivities = this.identifyRepetitiveActivities(events);
        var automationPotential = repetitiveActivities.length / (events.length || 1);
        return {
            avgCycleTime: avgCycleTime,
            throughput: throughput,
            efficiency: efficiency,
            reworkRate: reworkRate,
            automationPotential: automationPotential
        };
    };
    // 🔄 IDENTIFY REPETITIVE ACTIVITIES
    ProcessMiningEngine.prototype.identifyRepetitiveActivities = function (events) {
        var activityCounts = new Map();
        events.forEach(function (event) {
            var count = activityCounts.get(event.activityName) || 0;
            activityCounts.set(event.activityName, count + 1);
        });
        // Activities that occur frequently are good automation candidates
        var repetitiveThreshold = Math.max(2, events.length * 0.1);
        return events.filter(function (event) {
            return (activityCounts.get(event.activityName) || 0) >= repetitiveThreshold;
        });
    };
    // 🎯 OPTIMIZATION RECOMMENDATIONS
    ProcessMiningEngine.prototype.generateOptimizationRecommendations = function (bottlenecks, conformance, kpis) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendations;
            return __generator(this, function (_a) {
                recommendations = [];
                // Bottleneck-based recommendations
                bottlenecks.forEach(function (bottleneck) {
                    recommendations.push(bottleneck.recommendation);
                });
                // KPI-based recommendations
                if (kpis.efficiency < 0.6) {
                    recommendations.push('🚀 EFFICIENCY: Implement parallel processing for non-dependent activities');
                }
                if (kpis.reworkRate > 0.15) {
                    recommendations.push('🔧 QUALITY: Add automated quality gates to reduce rework');
                }
                if (kpis.automationPotential > 0.3) {
                    recommendations.push('🤖 AUTOMATION: High automation potential detected - implement RPA for repetitive tasks');
                }
                // Conformance-based recommendations
                if (conformance.complianceLevel === 'poor') {
                    recommendations.push('⚠️ COMPLIANCE: Critical compliance issues - implement automated business rule enforcement');
                }
                return [2 /*return*/, recommendations];
            });
        });
    };
    // ⚡ REAL-TIME PROCESSING
    ProcessMiningEngine.prototype.startRealTimeProcessing = function () {
        var _this = this;
        setInterval(function () {
            if (_this.realTimeBuffer.length > 0) {
                console.log("\u26A1 Processing ".concat(_this.realTimeBuffer.length, " real-time events"));
                // Group events by case
                var caseGroups_1 = new Map();
                _this.realTimeBuffer.forEach(function (event) {
                    if (!caseGroups_1.has(event.caseId)) {
                        caseGroups_1.set(event.caseId, []);
                    }
                    caseGroups_1.get(event.caseId).push(event);
                });
                // Process each case
                caseGroups_1.forEach(function (events, caseId) { return __awaiter(_this, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.processRealTimeEvents(caseId, events)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.error("Error processing real-time events for case ".concat(caseId, ":"), error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                _this.realTimeBuffer = [];
            }
        }, this.config.realTimeWindow);
    };
    // 📤 ADD EVENT TO REAL-TIME BUFFER
    ProcessMiningEngine.prototype.addEvent = function (event) {
        exports.ProcessEventSchema.parse(event); // Validate
        // Add to case log
        if (!this.eventLogs.has(event.caseId)) {
            this.eventLogs.set(event.caseId, []);
        }
        this.eventLogs.get(event.caseId).push(event);
        // Add to real-time buffer
        this.realTimeBuffer.push(event);
        // Emit event
        this.emit('eventReceived', event);
    };
    // ⚡ PROCESS REAL-TIME EVENTS
    ProcessMiningEngine.prototype.processRealTimeEvents = function (caseId, events) {
        return __awaiter(this, void 0, void 0, function () {
            var anomalies, currentModel, updatedModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.anomalyDetection) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.detectRealTimeAnomalies(events)];
                    case 1:
                        anomalies = _a.sent();
                        if (anomalies.length > 0) {
                            this.emit('anomaliesDetected', { caseId: caseId, anomalies: anomalies });
                        }
                        _a.label = 2;
                    case 2:
                        currentModel = this.processModels.get(caseId);
                        if (!currentModel) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.updateProcessModelIncremental(currentModel, events)];
                    case 3:
                        updatedModel = _a.sent();
                        this.processModels.set(caseId, updatedModel);
                        this.emit('processModelUpdated', { caseId: caseId, updatedModel: updatedModel });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 🚨 REAL-TIME ANOMALY DETECTION
    ProcessMiningEngine.prototype.detectRealTimeAnomalies = function (events) {
        return __awaiter(this, void 0, void 0, function () {
            var anomalies;
            return __generator(this, function (_a) {
                anomalies = [];
                events.forEach(function (event) {
                    // Check duration anomalies
                    if (event.duration && event.duration > 3600000) { // > 1 hour
                        anomalies.push("Duration anomaly: ".concat(event.activityName, " took ").concat(event.duration, "ms"));
                    }
                    // Check timestamp anomalies (events in future)
                    if (event.timestamp.getTime() > Date.now() + 300000) { // > 5 minutes in future
                        anomalies.push("Timestamp anomaly: ".concat(event.activityName, " has future timestamp"));
                    }
                });
                return [2 /*return*/, anomalies];
            });
        });
    };
    // 🔄 UPDATE PROCESS MODEL INCREMENTAL
    ProcessMiningEngine.prototype.updateProcessModelIncremental = function (currentModel, newEvents) {
        return __awaiter(this, void 0, void 0, function () {
            var allEvents, updatedKpis;
            return __generator(this, function (_a) {
                allEvents = __spreadArray(__spreadArray([], (this.eventLogs.get(currentModel.processId) || []), true), newEvents, true);
                updatedKpis = this.calculateKPIs(allEvents);
                return [2 /*return*/, __assign(__assign({}, currentModel), { kpis: updatedKpis })];
            });
        });
    };
    // 📊 GET PROCESS INSIGHTS
    ProcessMiningEngine.prototype.getProcessInsights = function (caseId) {
        var model = this.processModels.get(caseId) || null;
        if (!model) {
            return {
                model: null,
                recommendations: ['No process model available - start by adding events'],
                realTimeStatus: 'warning'
            };
        }
        // Determine status based on KPIs
        var realTimeStatus = 'healthy';
        if (model.kpis.efficiency < 0.5 || model.kpis.reworkRate > 0.2) {
            realTimeStatus = 'critical';
        }
        else if (model.kpis.efficiency < 0.7 || model.kpis.reworkRate > 0.1) {
            realTimeStatus = 'warning';
        }
        var recommendations = model.bottlenecks.map(function (b) { return b.recommendation; });
        return {
            model: model,
            recommendations: recommendations,
            realTimeStatus: realTimeStatus
        };
    };
    // 💹 ROI CALCULATION
    ProcessMiningEngine.prototype.calculateROI = function (caseId, implementationCost) {
        var model = this.processModels.get(caseId);
        if (!model) {
            throw new Error("No process model found for case ".concat(caseId));
        }
        // Calculate current operational cost
        var avgHourlyCost = 50; // $50/hour average
        var currentCost = (model.kpis.avgCycleTime / (1000 * 60 * 60)) * avgHourlyCost;
        // Project savings from automation
        var automationSavings = currentCost * model.kpis.automationPotential * 0.8; // 80% efficiency gain
        var bottleneckSavings = currentCost * 0.3; // 30% savings from bottleneck resolution
        var projectedSavings = automationSavings + bottleneckSavings;
        var roi = ((projectedSavings * 12) - implementationCost) / implementationCost; // Annual ROI
        var paybackPeriod = implementationCost / projectedSavings;
        return {
            currentCost: currentCost,
            projectedSavings: projectedSavings,
            roi: roi,
            paybackPeriod: paybackPeriod
        };
    };
    return ProcessMiningEngine;
}(events_1.EventEmitter));
exports.ProcessMiningEngine = ProcessMiningEngine;
// 🚀 USAGE EXAMPLE & EXPORT
var createProcessMiningEngine = function (config) {
    var defaultConfig = {
        maxLogSize: 100000,
        realTimeWindow: 5000, // 5 seconds
        mlThreshold: 0.7,
        anomalyDetection: true
    };
    return new ProcessMiningEngine(__assign(__assign({}, defaultConfig), config));
};
exports.createProcessMiningEngine = createProcessMiningEngine;
// 📋 DEMO FUNCTION
var demoProcessMining = function () { return __awaiter(void 0, void 0, void 0, function () {
    var engine, sampleEvents, processModel, roi;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('🚀 DEMO: Process Mining Engine Phase 3');
                engine = (0, exports.createProcessMiningEngine)();
                sampleEvents = [
                    {
                        id: '1',
                        timestamp: new Date('2024-01-01T09:00:00Z'),
                        activityName: 'Design Review',
                        caseId: 'restaurant-app-001',
                        resource: 'design-agent',
                        duration: 7200000 // 2 hours
                    },
                    {
                        id: '2',
                        timestamp: new Date('2024-01-01T11:30:00Z'),
                        activityName: 'Frontend Development',
                        caseId: 'restaurant-app-001',
                        resource: 'webdev-agent',
                        duration: 14400000 // 4 hours
                    },
                    {
                        id: '3',
                        timestamp: new Date('2024-01-01T16:00:00Z'),
                        activityName: 'Backend API',
                        caseId: 'restaurant-app-001',
                        resource: 'webdev-agent',
                        duration: 10800000 // 3 hours
                    },
                    {
                        id: '4',
                        timestamp: new Date('2024-01-01T19:30:00Z'),
                        activityName: 'Testing',
                        caseId: 'restaurant-app-001',
                        resource: 'techops-agent',
                        duration: 3600000 // 1 hour
                    }
                ];
                // Add events
                sampleEvents.forEach(function (event) { return engine.addEvent(event); });
                return [4 /*yield*/, engine.discoverProcess('restaurant-app-001')];
            case 1:
                processModel = _a.sent();
                roi = engine.calculateROI('restaurant-app-001', 5000);
                console.log('✅ Process Mining Results:', {
                    activities: processModel.activities,
                    bottlenecks: processModel.bottlenecks,
                    kpis: processModel.kpis,
                    roi: roi
                });
                return [2 /*return*/, { processModel: processModel, roi: roi }];
        }
    });
}); };
exports.demoProcessMining = demoProcessMining;
exports.default = ProcessMiningEngine;
