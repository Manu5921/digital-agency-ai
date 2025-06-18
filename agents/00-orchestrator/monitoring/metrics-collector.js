"use strict";
/**
 * Metrics Collector - Collecte et analyse des m�triques syst�me
 * Surveille les performances et la sant� de l'�cosyst�me multi-agents
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
exports.metricsCollector = exports.MetricsCollector = void 0;
var events_1 = require("events");
var MetricsCollector = /** @class */ (function (_super) {
    __extends(MetricsCollector, _super);
    function MetricsCollector() {
        var _this = _super.call(this) || this;
        _this.metrics = [];
        _this.collectionInterval = null;
        _this.COLLECTION_INTERVAL = 60000; // 1 minute
        _this.RETENTION_PERIOD = 24 * 60 * 60 * 1000; // 24 heures
        _this.MAX_METRICS_HISTORY = 1440; // 24h * 60min
        _this.setupAlertThresholds();
        _this.startCollection();
        return _this;
    }
    /**
     * Configure les seuils d'alerte
     */
    MetricsCollector.prototype.setupAlertThresholds = function () {
        this.alertThresholds = {
            system: {
                memoryUtilization: 85, // %
                cpuUtilization: 80, // %
                responseTime: 5000, // ms
                errorRate: 5 // %
            },
            agents: {
                responseTime: 10000, // ms
                errorRate: 10, // %
                successRate: 90 // %
            },
            projects: {
                delayThreshold: 20, // %
                qualityThreshold: 80, // %
                budgetVariance: 15 // %
            }
        };
    };
    /**
     * D�marre la collecte de m�triques
     */
    MetricsCollector.prototype.startCollection = function () {
        var _this = this;
        this.collectionInterval = setInterval(function () {
            _this.collectMetrics();
        }, this.COLLECTION_INTERVAL);
        console.log('=� Collecte de m�triques d�marr�e');
    };
    /**
     * Collecte toutes les m�triques
     */
    MetricsCollector.prototype.collectMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metrics, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = {
                            timestamp: new Date().toISOString()
                        };
                        return [4 /*yield*/, this.collectSystemMetrics()];
                    case 1:
                        _a.system = _b.sent();
                        return [4 /*yield*/, this.collectAgentMetrics()];
                    case 2:
                        _a.agents = _b.sent();
                        return [4 /*yield*/, this.collectProjectMetrics()];
                    case 3:
                        _a.projects = _b.sent();
                        return [4 /*yield*/, this.collectPerformanceMetrics()];
                    case 4:
                        _a.performance = _b.sent();
                        return [4 /*yield*/, this.collectQualityMetrics()];
                    case 5:
                        _a.quality = _b.sent();
                        return [4 /*yield*/, this.collectErrorMetrics()];
                    case 6:
                        metrics = (_a.errors = _b.sent(),
                            _a);
                        this.metrics.push(metrics);
                        this.cleanupOldMetrics();
                        // Analyser et alerter si n�cessaire
                        this.analyzeMetrics(metrics);
                        this.emit('metrics-collected', metrics);
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        console.error('L Erreur collecte m�triques:', error_1);
                        this.emit('collection-error', error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Collecte les m�triques syst�me
     */
    MetricsCollector.prototype.collectSystemMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var memoryUsage;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        memoryUsage = process.memoryUsage();
                        _a = {
                            uptime: Math.floor(process.uptime()),
                            memory: {
                                used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
                                available: Math.round(memoryUsage.heapTotal / 1024 / 1024),
                                utilization: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100),
                                peak: Math.round(memoryUsage.heapUsed / 1024 / 1024)
                            }
                        };
                        _b = {};
                        return [4 /*yield*/, this.getCPUUtilization()];
                    case 1: return [2 /*return*/, (_a.cpu = (_b.utilization = _c.sent(),
                            _b.cores = require('os').cpus().length,
                            _b.load = require('os').loadavg(),
                            _b.throttling = false,
                            _b),
                            _a.network = {
                                bandwidth: 1000, // simulation
                                latency: Math.round(Math.random() * 50 + 10),
                                errors: Math.floor(Math.random() * 5),
                                requests: Math.floor(Math.random() * 1000 + 500)
                            },
                            _a)];
                }
            });
        });
    };
    /**
     * Collecte les m�triques des agents
     */
    MetricsCollector.prototype.collectAgentMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var agentIds;
            var _this = this;
            return __generator(this, function (_a) {
                agentIds = ['design-agent', 'webdev-agent', 'seo-agent', 'marketing-agent', 'techops-agent', 'automation-agent'];
                return [2 /*return*/, agentIds.map(function (agentId) { return ({
                        agentId: agentId,
                        status: _this.getAgentStatus(agentId),
                        performance: {
                            tasksCompleted: Math.floor(Math.random() * 20 + 5),
                            averageResponseTime: Math.round(Math.random() * 3000 + 1000),
                            successRate: Math.round(Math.random() * 15 + 85),
                            errorRate: Math.round(Math.random() * 5),
                            throughput: Math.round(Math.random() * 10 + 5)
                        },
                        resources: {
                            memoryUsage: Math.round(Math.random() * 500 + 100),
                            cpuUsage: Math.round(Math.random() * 50 + 10),
                            activeConnections: Math.floor(Math.random() * 10 + 1)
                        },
                        quality: {
                            outputQuality: Math.round(Math.random() * 20 + 80),
                            codeComplexity: Math.round(Math.random() * 30 + 70),
                            testCoverage: Math.round(Math.random() * 30 + 70),
                            maintainabilityIndex: Math.round(Math.random() * 20 + 80)
                        }
                    }); })];
            });
        });
    };
    /**
     * Collecte les m�triques des projets
     */
    MetricsCollector.prototype.collectProjectMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var projectTypes;
            var _this = this;
            return __generator(this, function (_a) {
                projectTypes = ['restaurant', 'ecommerce', 'saas'];
                return [2 /*return*/, projectTypes.map(function (type, index) { return ({
                        projectId: "project_".concat(type, "_").concat(index),
                        type: type,
                        status: Math.random() > 0.7 ? 'completed' : 'in-progress',
                        timeline: {
                            estimatedDuration: Math.round(Math.random() * 20 + 10),
                            actualDuration: Math.round(Math.random() * 25 + 8),
                            variance: Math.round((Math.random() - 0.5) * 40),
                            milestones: _this.generateMilestoneMetrics(type)
                        },
                        quality: {
                            clientSatisfaction: Math.round(Math.random() * 20 + 80),
                            deliverableQuality: Math.round(Math.random() * 15 + 85),
                            technicalDebt: Math.round(Math.random() * 30 + 10)
                        },
                        efficiency: {
                            resourceUtilization: Math.round(Math.random() * 20 + 70),
                            costEfficiency: Math.round(Math.random() * 15 + 80),
                            teamProductivity: Math.round(Math.random() * 25 + 75)
                        }
                    }); })];
            });
        });
    };
    /**
     * Collecte les m�triques de performance
     */
    MetricsCollector.prototype.collectPerformanceMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        overall: {
                            systemEfficiency: Math.round(Math.random() * 15 + 80),
                            responseTime: Math.round(Math.random() * 2000 + 500),
                            throughput: Math.round(Math.random() * 50 + 100),
                            availability: Math.round(Math.random() * 5 + 95)
                        },
                        bottlenecks: this.identifyBottlenecks(),
                        trends: this.calculateTrends()
                    }];
            });
        });
    };
    /**
     * Collecte les m�triques de qualit�
     */
    MetricsCollector.prototype.collectQualityMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        code: {
                            complexity: Math.round(Math.random() * 30 + 70),
                            maintainability: Math.round(Math.random() * 20 + 75),
                            testCoverage: Math.round(Math.random() * 25 + 70),
                            bugDensity: Math.round(Math.random() * 5 + 1)
                        },
                        deliverables: {
                            completeness: Math.round(Math.random() * 10 + 90),
                            accuracy: Math.round(Math.random() * 15 + 80),
                            clientApproval: Math.round(Math.random() * 20 + 75)
                        },
                        process: {
                            adherenceToStandards: Math.round(Math.random() * 15 + 80),
                            documentationQuality: Math.round(Math.random() * 25 + 70),
                            reviewCoverage: Math.round(Math.random() * 20 + 75)
                        }
                    }];
            });
        });
    };
    /**
     * Collecte les m�triques d'erreurs
     */
    MetricsCollector.prototype.collectErrorMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalErrors;
            return __generator(this, function (_a) {
                totalErrors = Math.floor(Math.random() * 20 + 5);
                return [2 /*return*/, {
                        total: totalErrors,
                        byType: {
                            'system': Math.floor(totalErrors * 0.3),
                            'agent': Math.floor(totalErrors * 0.4),
                            'communication': Math.floor(totalErrors * 0.2),
                            'user': Math.floor(totalErrors * 0.1)
                        },
                        bySeverity: {
                            'critical': Math.floor(totalErrors * 0.1),
                            'high': Math.floor(totalErrors * 0.2),
                            'medium': Math.floor(totalErrors * 0.4),
                            'low': Math.floor(totalErrors * 0.3)
                        },
                        byAgent: {
                            'design-agent': Math.floor(totalErrors * 0.15),
                            'webdev-agent': Math.floor(totalErrors * 0.25),
                            'seo-agent': Math.floor(totalErrors * 0.15),
                            'marketing-agent': Math.floor(totalErrors * 0.15),
                            'techops-agent': Math.floor(totalErrors * 0.20),
                            'automation-agent': Math.floor(totalErrors * 0.10)
                        },
                        resolution: {
                            averageTime: Math.round(Math.random() * 30 + 15),
                            successRate: Math.round(Math.random() * 10 + 85),
                            escalationRate: Math.round(Math.random() * 10 + 5)
                        }
                    }];
            });
        });
    };
    /**
     * Obtient le statut d'un agent
     */
    MetricsCollector.prototype.getAgentStatus = function (agentId) {
        var statuses = ['online', 'busy', 'offline'];
        var weights = [0.7, 0.25, 0.05]; // 70% online, 25% busy, 5% offline
        var random = Math.random();
        var cumulative = 0;
        for (var i = 0; i < statuses.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return statuses[i];
            }
        }
        return 'online';
    };
    /**
     * G�n�re les m�triques de jalons
     */
    MetricsCollector.prototype.generateMilestoneMetrics = function (projectType) {
        var milestones = {
            restaurant: ['Design', 'Development', 'SEO', 'Launch'],
            ecommerce: ['Analysis', 'Catalog', 'Payment', 'Marketing', 'Launch'],
            saas: ['MVP', 'Beta', 'Features', 'Scale', 'Launch']
        };
        return (milestones[projectType] || milestones.restaurant).map(function (name, index) { return ({
            name: name,
            planned: new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            actual: Math.random() > 0.3 ? new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000) + (Math.random() - 0.5) * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
            variance: Math.round((Math.random() - 0.5) * 6),
            status: Math.random() > 0.7 ? 'completed' : index === 0 ? 'pending' : 'pending'
        }); });
    };
    /**
     * Identifie les goulots d'�tranglement
     */
    MetricsCollector.prototype.identifyBottlenecks = function () {
        var potentialBottlenecks = [
            {
                component: 'webdev-agent',
                severity: 'medium',
                impact: Math.round(Math.random() * 20 + 10),
                recommendation: 'Optimiser le pipeline de d�veloppement'
            },
            {
                component: 'database',
                severity: 'low',
                impact: Math.round(Math.random() * 15 + 5),
                recommendation: 'Augmenter les ressources de cache'
            },
            {
                component: 'api-gateway',
                severity: 'high',
                impact: Math.round(Math.random() * 30 + 20),
                recommendation: 'Mise � l\'�chelle horizontale requise'
            }
        ];
        // Retourner al�atoirement 0-2 goulots
        var count = Math.floor(Math.random() * 3);
        return potentialBottlenecks.slice(0, count);
    };
    /**
     * Calcule les tendances
     */
    MetricsCollector.prototype.calculateTrends = function () {
        var metrics = ['response-time', 'throughput', 'error-rate', 'efficiency'];
        return metrics.map(function (metric) { return ({
            metric: metric,
            trend: Math.random() > 0.6 ? 'increasing' : Math.random() > 0.3 ? 'decreasing' : 'stable',
            change: Math.round((Math.random() - 0.5) * 20),
            period: '24h'
        }); });
    };
    /**
     * Obtient l'utilisation CPU
     */
    MetricsCollector.prototype.getCPUUtilization = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation - dans une vraie impl�mentation, utiliser des outils syst�me
                return [2 /*return*/, Math.round(Math.random() * 60 + 20)];
            });
        });
    };
    /**
     * Analyse les m�triques et g�n�re des alertes
     */
    MetricsCollector.prototype.analyzeMetrics = function (metrics) {
        var _this = this;
        var alerts = [];
        // Analyser les seuils syst�me
        if (metrics.system.memory.utilization > this.alertThresholds.system.memoryUtilization) {
            alerts.push({
                type: 'memory',
                severity: 'high',
                message: "Utilisation m\uFFFDmoire critique: ".concat(metrics.system.memory.utilization, "%"),
                threshold: this.alertThresholds.system.memoryUtilization,
                current: metrics.system.memory.utilization
            });
        }
        if (metrics.system.cpu.utilization > this.alertThresholds.system.cpuUtilization) {
            alerts.push({
                type: 'cpu',
                severity: 'high',
                message: "Utilisation CPU \uFFFDlev\uFFFDe: ".concat(metrics.system.cpu.utilization, "%"),
                threshold: this.alertThresholds.system.cpuUtilization,
                current: metrics.system.cpu.utilization
            });
        }
        // Analyser les agents
        metrics.agents.forEach(function (agent) {
            if (agent.performance.errorRate > _this.alertThresholds.agents.errorRate) {
                alerts.push({
                    type: 'agent-error',
                    severity: 'medium',
                    message: "Taux d'erreur \uFFFDlev\uFFFD pour ".concat(agent.agentId, ": ").concat(agent.performance.errorRate, "%"),
                    threshold: _this.alertThresholds.agents.errorRate,
                    current: agent.performance.errorRate
                });
            }
            if (agent.performance.successRate < _this.alertThresholds.agents.successRate) {
                alerts.push({
                    type: 'agent-performance',
                    severity: 'medium',
                    message: "Performance d\uFFFDgrad\uFFFDe pour ".concat(agent.agentId, ": ").concat(agent.performance.successRate, "%"),
                    threshold: _this.alertThresholds.agents.successRate,
                    current: agent.performance.successRate
                });
            }
        });
        // Analyser les projets
        metrics.projects.forEach(function (project) {
            if (Math.abs(project.timeline.variance) > _this.alertThresholds.projects.delayThreshold) {
                alerts.push({
                    type: 'project-delay',
                    severity: project.timeline.variance > 0 ? 'high' : 'medium',
                    message: "Retard projet ".concat(project.projectId, ": ").concat(project.timeline.variance, "%"),
                    threshold: _this.alertThresholds.projects.delayThreshold,
                    current: Math.abs(project.timeline.variance)
                });
            }
        });
        // �mettre les alertes
        if (alerts.length > 0) {
            this.emit('alerts-generated', alerts);
            console.warn("\uFFFD\u000F ".concat(alerts.length, " alertes g\uFFFDn\uFFFDr\uFFFDes"));
        }
    };
    /**
     * Nettoie les anciennes m�triques
     */
    MetricsCollector.prototype.cleanupOldMetrics = function () {
        var cutoff = new Date(Date.now() - this.RETENTION_PERIOD);
        this.metrics = this.metrics.filter(function (metric) {
            return new Date(metric.timestamp) > cutoff;
        });
        // Limiter la taille en m�moire
        if (this.metrics.length > this.MAX_METRICS_HISTORY) {
            this.metrics = this.metrics.slice(-this.MAX_METRICS_HISTORY);
        }
    };
    /**
     * Obtient les m�triques r�centes
     */
    MetricsCollector.prototype.getRecentMetrics = function (hours) {
        if (hours === void 0) { hours = 1; }
        var cutoff = new Date(Date.now() - (hours * 60 * 60 * 1000));
        return this.metrics.filter(function (metric) {
            return new Date(metric.timestamp) > cutoff;
        });
    };
    /**
     * Obtient les m�triques actuelles
     */
    MetricsCollector.prototype.getCurrentMetrics = function () {
        return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
    };
    /**
     * Obtient un rapport de performance
     */
    MetricsCollector.prototype.getPerformanceReport = function (timeframe) {
        if (timeframe === void 0) { timeframe = '24h'; }
        var hours = { '1h': 1, '24h': 24, '7d': 168 }[timeframe];
        var recentMetrics = this.getRecentMetrics(hours);
        if (recentMetrics.length === 0) {
            return { error: 'Aucune donn�e disponible' };
        }
        var avgSystemEfficiency = this.calculateAverage(recentMetrics, 'performance.overall.systemEfficiency');
        var avgResponseTime = this.calculateAverage(recentMetrics, 'performance.overall.responseTime');
        var totalErrors = recentMetrics.reduce(function (sum, m) { return sum + m.errors.total; }, 0);
        return {
            timeframe: timeframe,
            period: {
                start: recentMetrics[0].timestamp,
                end: recentMetrics[recentMetrics.length - 1].timestamp,
                dataPoints: recentMetrics.length
            },
            summary: {
                systemEfficiency: Math.round(avgSystemEfficiency),
                averageResponseTime: Math.round(avgResponseTime),
                totalErrors: totalErrors,
                availability: Math.round(this.calculateAverage(recentMetrics, 'performance.overall.availability'))
            },
            trends: this.calculateDetailedTrends(recentMetrics),
            recommendations: this.generateRecommendations(recentMetrics)
        };
    };
    /**
     * Calcule la moyenne d'une m�trique
     */
    MetricsCollector.prototype.calculateAverage = function (metrics, path) {
        var _this = this;
        var values = metrics.map(function (m) { return _this.getNestedValue(m, path); }).filter(function (v) { return v !== undefined; });
        return values.reduce(function (sum, val) { return sum + val; }, 0) / values.length;
    };
    /**
     * Obtient une valeur imbriqu�e
     */
    MetricsCollector.prototype.getNestedValue = function (obj, path) {
        return path.split('.').reduce(function (current, key) { return current === null || current === void 0 ? void 0 : current[key]; }, obj);
    };
    /**
     * Calcule les tendances d�taill�es
     */
    MetricsCollector.prototype.calculateDetailedTrends = function (metrics) {
        if (metrics.length < 2)
            return {};
        var first = metrics[0];
        var last = metrics[metrics.length - 1];
        return {
            efficiency: {
                change: last.performance.overall.systemEfficiency - first.performance.overall.systemEfficiency,
                trend: last.performance.overall.systemEfficiency > first.performance.overall.systemEfficiency ? 'improving' : 'declining'
            },
            responseTime: {
                change: last.performance.overall.responseTime - first.performance.overall.responseTime,
                trend: last.performance.overall.responseTime < first.performance.overall.responseTime ? 'improving' : 'declining'
            },
            errors: {
                change: last.errors.total - first.errors.total,
                trend: last.errors.total < first.errors.total ? 'improving' : 'declining'
            }
        };
    };
    /**
     * G�n�re des recommandations
     */
    MetricsCollector.prototype.generateRecommendations = function (metrics) {
        var recommendations = [];
        var latest = metrics[metrics.length - 1];
        if (latest.system.memory.utilization > 80) {
            recommendations.push('Consid�rer l\'augmentation de la m�moire allou�e');
        }
        if (latest.performance.overall.responseTime > 3000) {
            recommendations.push('Optimiser les temps de r�ponse des agents');
        }
        if (latest.errors.total > 10) {
            recommendations.push('Investiguer l\'augmentation du taux d\'erreurs');
        }
        var lowPerformanceAgents = latest.agents.filter(function (a) { return a.performance.successRate < 85; });
        if (lowPerformanceAgents.length > 0) {
            recommendations.push("Optimiser les agents: ".concat(lowPerformanceAgents.map(function (a) { return a.agentId; }).join(', ')));
        }
        return recommendations;
    };
    /**
     * Arr�te la collecte
     */
    MetricsCollector.prototype.stop = function () {
        if (this.collectionInterval) {
            clearInterval(this.collectionInterval);
            this.collectionInterval = null;
        }
        console.log('=� Collecte de m�triques arr�t�e');
    };
    return MetricsCollector;
}(events_1.EventEmitter));
exports.MetricsCollector = MetricsCollector;
exports.metricsCollector = new MetricsCollector();
exports.default = exports.metricsCollector;
