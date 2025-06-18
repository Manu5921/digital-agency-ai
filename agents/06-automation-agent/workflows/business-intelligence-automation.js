"use strict";
/**
 * BUSINESS INTELLIGENCE AUTOMATION SYSTEM
 * Report Generation, Dashboard Automation, and KPI Tracking
 * Phase 1 Foundation - Intelligent Business Analytics Platform
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
exports.demoBusinessIntelligenceAutomation = exports.createBusinessIntelligenceAutomation = exports.BusinessIntelligenceAutomation = exports.AlertRuleSchema = exports.DashboardSchema = exports.ReportTemplateSchema = exports.KPIDefinitionSchema = exports.DataSourceSchema = void 0;
var zod_1 = require("zod");
// ============================================================================
// CORE TYPES & SCHEMAS
// ============================================================================
exports.DataSourceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['database', 'api', 'file', 'stream', 'connector']),
    connection: zod_1.z.object({
        host: zod_1.z.string().optional(),
        port: zod_1.z.number().optional(),
        database: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        apiUrl: zod_1.z.string().optional(),
        apiKey: zod_1.z.string().optional(),
        filePath: zod_1.z.string().optional(),
        streamEndpoint: zod_1.z.string().optional(),
        connectorId: zod_1.z.string().optional()
    }),
    schema: zod_1.z.record(zod_1.z.object({
        type: zod_1.z.enum(['string', 'number', 'boolean', 'date', 'array', 'object']),
        nullable: zod_1.z.boolean().default(false),
        primaryKey: zod_1.z.boolean().default(false),
        foreignKey: zod_1.z.string().optional(),
        description: zod_1.z.string().optional()
    })),
    refreshInterval: zod_1.z.number(), // minutes
    lastSync: zod_1.z.string().optional(),
    status: zod_1.z.enum(['active', 'inactive', 'error']),
    metadata: zod_1.z.record(zod_1.z.any()).optional()
});
exports.KPIDefinitionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.string(),
    type: zod_1.z.enum(['metric', 'ratio', 'percentage', 'count', 'average', 'sum', 'trend']),
    calculation: zod_1.z.object({
        formula: zod_1.z.string(),
        dataSourceId: zod_1.z.string(),
        aggregation: zod_1.z.enum(['sum', 'avg', 'count', 'min', 'max', 'median', 'stddev']).optional(),
        groupBy: zod_1.z.array(zod_1.z.string()).optional(),
        filters: zod_1.z.array(zod_1.z.object({
            field: zod_1.z.string(),
            operator: zod_1.z.enum(['equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'between']),
            value: zod_1.z.any()
        })).optional(),
        timeRange: zod_1.z.object({
            type: zod_1.z.enum(['last_hour', 'last_24h', 'last_7d', 'last_30d', 'last_90d', 'custom']),
            startDate: zod_1.z.string().optional(),
            endDate: zod_1.z.string().optional()
        }).optional()
    }),
    targets: zod_1.z.object({
        target: zod_1.z.number().optional(),
        minimum: zod_1.z.number().optional(),
        maximum: zod_1.z.number().optional(),
        benchmark: zod_1.z.number().optional()
    }).optional(),
    alerts: zod_1.z.array(zod_1.z.object({
        condition: zod_1.z.enum(['above', 'below', 'equals', 'change_percent']),
        threshold: zod_1.z.number(),
        severity: zod_1.z.enum(['low', 'medium', 'high', 'critical']),
        recipients: zod_1.z.array(zod_1.z.string()),
        message: zod_1.z.string().optional()
    })).optional(),
    visualisation: zod_1.z.object({
        chartType: zod_1.z.enum(['line', 'bar', 'pie', 'gauge', 'table', 'number']),
        color: zod_1.z.string().optional(),
        format: zod_1.z.string().optional() // number format
    }),
    updateFrequency: zod_1.z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly']),
    status: zod_1.z.enum(['active', 'inactive', 'draft'])
});
exports.ReportTemplateSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.string(),
    type: zod_1.z.enum(['operational', 'executive', 'financial', 'sales', 'marketing', 'custom']),
    layout: zod_1.z.object({
        sections: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            title: zod_1.z.string(),
            type: zod_1.z.enum(['kpi_grid', 'chart', 'table', 'text', 'image']),
            position: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number(), width: zod_1.z.number(), height: zod_1.z.number() }),
            content: zod_1.z.object({
                kpiIds: zod_1.z.array(zod_1.z.string()).optional(),
                chartConfig: zod_1.z.record(zod_1.z.any()).optional(),
                tableConfig: zod_1.z.record(zod_1.z.any()).optional(),
                text: zod_1.z.string().optional(),
                imageUrl: zod_1.z.string().optional()
            })
        })),
        theme: zod_1.z.object({
            primaryColor: zod_1.z.string(),
            secondaryColor: zod_1.z.string(),
            backgroundColor: zod_1.z.string(),
            fontFamily: zod_1.z.string()
        }).optional()
    }),
    schedule: zod_1.z.object({
        enabled: zod_1.z.boolean(),
        frequency: zod_1.z.enum(['hourly', 'daily', 'weekly', 'monthly', 'quarterly']),
        time: zod_1.z.string(), // HH:MM format
        dayOfWeek: zod_1.z.number().optional(), // 0-6
        dayOfMonth: zod_1.z.number().optional(), // 1-31
        recipients: zod_1.z.array(zod_1.z.string()),
        format: zod_1.z.enum(['pdf', 'html', 'excel', 'powerpoint'])
    }).optional(),
    filters: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.enum(['date_range', 'dropdown', 'multi_select', 'text']),
        defaultValue: zod_1.z.any(),
        options: zod_1.z.array(zod_1.z.string()).optional()
    })).optional(),
    permissions: zod_1.z.object({
        viewers: zod_1.z.array(zod_1.z.string()),
        editors: zod_1.z.array(zod_1.z.string()),
        public: zod_1.z.boolean().default(false)
    }),
    status: zod_1.z.enum(['active', 'inactive', 'draft'])
});
exports.DashboardSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.string(),
    layout: zod_1.z.object({
        widgets: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            type: zod_1.z.enum(['kpi_card', 'chart', 'table', 'gauge', 'progress_bar', 'text', 'iframe']),
            position: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number(), width: zod_1.z.number(), height: zod_1.z.number() }),
            title: zod_1.z.string(),
            kpiId: zod_1.z.string().optional(),
            config: zod_1.z.record(zod_1.z.any()).optional(),
            refreshInterval: zod_1.z.number().optional() // seconds
        })),
        columns: zod_1.z.number().default(12),
        rowHeight: zod_1.z.number().default(100)
    }),
    filters: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.enum(['date_range', 'dropdown', 'multi_select']),
        affectedWidgets: zod_1.z.array(zod_1.z.string()),
        defaultValue: zod_1.z.any()
    })).optional(),
    realtime: zod_1.z.boolean().default(false),
    refreshInterval: zod_1.z.number().default(300), // seconds
    permissions: zod_1.z.object({
        viewers: zod_1.z.array(zod_1.z.string()),
        editors: zod_1.z.array(zod_1.z.string()),
        public: zod_1.z.boolean().default(false)
    }),
    status: zod_1.z.enum(['active', 'inactive', 'draft'])
});
exports.AlertRuleSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    kpiId: zod_1.z.string(),
    condition: zod_1.z.object({
        operator: zod_1.z.enum(['greater_than', 'less_than', 'equals', 'not_equals', 'change_percent', 'threshold_breach']),
        value: zod_1.z.number(),
        timeWindow: zod_1.z.number().optional(), // minutes
        consecutiveFailures: zod_1.z.number().default(1)
    }),
    severity: zod_1.z.enum(['low', 'medium', 'high', 'critical']),
    actions: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(['email', 'sms', 'slack', 'webhook', 'auto_action']),
        recipients: zod_1.z.array(zod_1.z.string()).optional(),
        message: zod_1.z.string().optional(),
        webhookUrl: zod_1.z.string().optional(),
        autoAction: zod_1.z.string().optional() // script or workflow ID
    })),
    cooldown: zod_1.z.number().default(60), // minutes
    enabled: zod_1.z.boolean().default(true),
    lastTriggered: zod_1.z.string().optional()
});
// ============================================================================
// BUSINESS INTELLIGENCE AUTOMATION ENGINE
// ============================================================================
var BusinessIntelligenceAutomation = /** @class */ (function () {
    function BusinessIntelligenceAutomation() {
        this.dataSources = new Map();
        this.kpiDefinitions = new Map();
        this.reportTemplates = new Map();
        this.dashboards = new Map();
        this.alertRules = new Map();
        this.kpiCache = new Map();
        this.isRunning = false;
        console.log('📊 Initializing Business Intelligence Automation Engine...');
        this.initializeSampleData();
        this.startAutomationEngine();
    }
    BusinessIntelligenceAutomation.prototype.initializeSampleData = function () {
        console.log('🎯 Loading sample KPIs and templates...');
        // Sample data sources
        this.createSampleDataSources();
        // Sample KPIs
        this.createSampleKPIs();
        // Sample report templates
        this.createSampleReportTemplates();
        // Sample dashboards
        this.createSampleDashboards();
        console.log('✅ Sample data loaded successfully');
    };
    BusinessIntelligenceAutomation.prototype.createSampleDataSources = function () {
        var salesDB = {
            id: 'sales-database',
            name: 'Sales Database',
            type: 'database',
            connection: {
                host: 'localhost',
                port: 5432,
                database: 'sales_db',
                username: 'readonly_user'
            },
            schema: {
                orders: {
                    type: 'object',
                    nullable: false,
                    description: 'Customer orders table'
                },
                customers: {
                    type: 'object',
                    nullable: false,
                    description: 'Customer information table'
                },
                products: {
                    type: 'object',
                    nullable: false,
                    description: 'Product catalog table'
                }
            },
            refreshInterval: 15,
            status: 'active'
        };
        var marketingAPI = {
            id: 'marketing-api',
            name: 'Marketing Analytics API',
            type: 'api',
            connection: {
                apiUrl: 'https://api.marketing.company.com',
                apiKey: 'marketing_api_key_123'
            },
            schema: {
                campaigns: {
                    type: 'object',
                    nullable: false,
                    description: 'Marketing campaigns data'
                },
                leads: {
                    type: 'object',
                    nullable: false,
                    description: 'Lead generation data'
                }
            },
            refreshInterval: 30,
            status: 'active'
        };
        this.dataSources.set(salesDB.id, salesDB);
        this.dataSources.set(marketingAPI.id, marketingAPI);
    };
    BusinessIntelligenceAutomation.prototype.createSampleKPIs = function () {
        var revenueKPI = {
            id: 'monthly-revenue',
            name: 'Monthly Revenue',
            description: 'Total revenue generated in the current month',
            category: 'Financial',
            type: 'sum',
            calculation: {
                formula: 'SUM(order_amount)',
                dataSourceId: 'sales-database',
                aggregation: 'sum',
                groupBy: ['month'],
                filters: [
                    {
                        field: 'status',
                        operator: 'equals',
                        value: 'completed'
                    }
                ],
                timeRange: {
                    type: 'last_30d'
                }
            },
            targets: {
                target: 100000,
                minimum: 80000
            },
            alerts: [
                {
                    condition: 'below',
                    threshold: 80000,
                    severity: 'high',
                    recipients: ['sales@company.com', 'ceo@company.com'],
                    message: 'Monthly revenue below minimum threshold'
                }
            ],
            visualisation: {
                chartType: 'number',
                color: '#4CAF50',
                format: '$0,0'
            },
            updateFrequency: 'hourly',
            status: 'active'
        };
        var conversionRateKPI = {
            id: 'lead-conversion-rate',
            name: 'Lead Conversion Rate',
            description: 'Percentage of leads that convert to customers',
            category: 'Sales',
            type: 'percentage',
            calculation: {
                formula: '(converted_leads / total_leads) * 100',
                dataSourceId: 'marketing-api',
                aggregation: 'avg',
                timeRange: {
                    type: 'last_7d'
                }
            },
            targets: {
                target: 15,
                minimum: 10
            },
            visualisation: {
                chartType: 'gauge',
                color: '#2196F3',
                format: '0.0%'
            },
            updateFrequency: 'daily',
            status: 'active'
        };
        var customerSatisfactionKPI = {
            id: 'customer-satisfaction',
            name: 'Customer Satisfaction Score',
            description: 'Average customer satisfaction rating',
            category: 'Customer',
            type: 'average',
            calculation: {
                formula: 'AVG(satisfaction_rating)',
                dataSourceId: 'sales-database',
                aggregation: 'avg',
                timeRange: {
                    type: 'last_30d'
                }
            },
            targets: {
                target: 4.5,
                minimum: 4.0
            },
            visualisation: {
                chartType: 'gauge',
                color: '#FF9800',
                format: '0.0'
            },
            updateFrequency: 'daily',
            status: 'active'
        };
        this.kpiDefinitions.set(revenueKPI.id, revenueKPI);
        this.kpiDefinitions.set(conversionRateKPI.id, conversionRateKPI);
        this.kpiDefinitions.set(customerSatisfactionKPI.id, customerSatisfactionKPI);
    };
    BusinessIntelligenceAutomation.prototype.createSampleReportTemplates = function () {
        var executiveReport = {
            id: 'executive-dashboard-report',
            name: 'Executive Dashboard Report',
            description: 'High-level business metrics for executive team',
            category: 'Executive',
            type: 'executive',
            layout: {
                sections: [
                    {
                        id: 'header',
                        title: 'Executive Summary',
                        type: 'text',
                        position: { x: 0, y: 0, width: 12, height: 2 },
                        content: {
                            text: 'Monthly Business Performance Summary'
                        }
                    },
                    {
                        id: 'kpi-grid',
                        title: 'Key Performance Indicators',
                        type: 'kpi_grid',
                        position: { x: 0, y: 2, width: 12, height: 6 },
                        content: {
                            kpiIds: ['monthly-revenue', 'lead-conversion-rate', 'customer-satisfaction']
                        }
                    },
                    {
                        id: 'revenue-chart',
                        title: 'Revenue Trend',
                        type: 'chart',
                        position: { x: 0, y: 8, width: 8, height: 4 },
                        content: {
                            chartConfig: {
                                type: 'line',
                                kpiId: 'monthly-revenue',
                                timeRange: 'last_90d'
                            }
                        }
                    }
                ],
                theme: {
                    primaryColor: '#2196F3',
                    secondaryColor: '#FFC107',
                    backgroundColor: '#FAFAFA',
                    fontFamily: 'Arial, sans-serif'
                }
            },
            schedule: {
                enabled: true,
                frequency: 'weekly',
                time: '09:00',
                dayOfWeek: 1, // Monday
                recipients: ['ceo@company.com', 'cfo@company.com'],
                format: 'pdf'
            },
            permissions: {
                viewers: ['executives', 'managers'],
                editors: ['bi-team'],
                public: false
            },
            status: 'active'
        };
        this.reportTemplates.set(executiveReport.id, executiveReport);
    };
    BusinessIntelligenceAutomation.prototype.createSampleDashboards = function () {
        var salesDashboard = {
            id: 'sales-performance-dashboard',
            name: 'Sales Performance Dashboard',
            description: 'Real-time sales metrics and performance indicators',
            category: 'Sales',
            layout: {
                widgets: [
                    {
                        id: 'revenue-card',
                        type: 'kpi_card',
                        position: { x: 0, y: 0, width: 3, height: 2 },
                        title: 'Monthly Revenue',
                        kpiId: 'monthly-revenue',
                        refreshInterval: 300
                    },
                    {
                        id: 'conversion-gauge',
                        type: 'gauge',
                        position: { x: 3, y: 0, width: 3, height: 2 },
                        title: 'Conversion Rate',
                        kpiId: 'lead-conversion-rate',
                        refreshInterval: 600
                    },
                    {
                        id: 'satisfaction-gauge',
                        type: 'gauge',
                        position: { x: 6, y: 0, width: 3, height: 2 },
                        title: 'Customer Satisfaction',
                        kpiId: 'customer-satisfaction',
                        refreshInterval: 600
                    },
                    {
                        id: 'revenue-trend',
                        type: 'chart',
                        position: { x: 0, y: 2, width: 8, height: 4 },
                        title: 'Revenue Trend (90 Days)',
                        config: {
                            chartType: 'line',
                            kpiId: 'monthly-revenue',
                            timeRange: 'last_90d'
                        },
                        refreshInterval: 900
                    }
                ],
                columns: 12,
                rowHeight: 100
            },
            realtime: true,
            refreshInterval: 300,
            permissions: {
                viewers: ['sales-team', 'managers'],
                editors: ['sales-managers', 'bi-team'],
                public: false
            },
            status: 'active'
        };
        this.dashboards.set(salesDashboard.id, salesDashboard);
    };
    // ========================================================================
    // DATA SOURCE MANAGEMENT
    // ========================================================================
    BusinessIntelligenceAutomation.prototype.addDataSource = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDCCA Adding data source: ".concat(dataSource.name));
                        // Validate connection
                        return [4 /*yield*/, this.testDataSourceConnection(dataSource)];
                    case 1:
                        // Validate connection
                        _a.sent();
                        this.dataSources.set(dataSource.id, dataSource);
                        console.log("\u2705 Data source added: ".concat(dataSource.id));
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.updateDataSource = function (dataSourceId, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var dataSource, updatedDataSource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataSource = this.dataSources.get(dataSourceId);
                        if (!dataSource) {
                            throw new Error("Data source not found: ".concat(dataSourceId));
                        }
                        updatedDataSource = __assign(__assign({}, dataSource), updates);
                        return [4 /*yield*/, this.testDataSourceConnection(updatedDataSource)];
                    case 1:
                        _a.sent();
                        this.dataSources.set(dataSourceId, updatedDataSource);
                        console.log("\uD83D\uDD04 Data source updated: ".concat(dataSourceId));
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.removeDataSource = function (dataSourceId) {
        return __awaiter(this, void 0, void 0, function () {
            var dependentKPIs;
            return __generator(this, function (_a) {
                dependentKPIs = Array.from(this.kpiDefinitions.values())
                    .filter(function (kpi) { return kpi.calculation.dataSourceId === dataSourceId; });
                if (dependentKPIs.length > 0) {
                    throw new Error("Cannot remove data source with dependent KPIs: ".concat(dependentKPIs.length, " found"));
                }
                this.dataSources.delete(dataSourceId);
                console.log("\uD83D\uDDD1\uFE0F Data source removed: ".concat(dataSourceId));
                return [2 /*return*/];
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.testDataSourceConnection = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD0C Testing connection for: ".concat(dataSource.name));
                        // Mock connection test - replace with actual implementation
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500 + Math.random() * 1000); })];
                    case 1:
                        // Mock connection test - replace with actual implementation
                        _a.sent();
                        // Simulate success/failure
                        if (Math.random() > 0.9) {
                            throw new Error('Connection test failed');
                        }
                        console.log("\u2705 Connection test successful for: ".concat(dataSource.name));
                        return [2 /*return*/];
                }
            });
        });
    };
    // ========================================================================
    // KPI MANAGEMENT
    // ========================================================================
    BusinessIntelligenceAutomation.prototype.createKPI = function (kpi) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDCC8 Creating KPI: ".concat(kpi.name));
                        // Validate data source exists
                        if (!this.dataSources.has(kpi.calculation.dataSourceId)) {
                            throw new Error("Data source not found: ".concat(kpi.calculation.dataSourceId));
                        }
                        // Validate formula syntax
                        return [4 /*yield*/, this.validateKPIFormula(kpi)];
                    case 1:
                        // Validate formula syntax
                        _a.sent();
                        this.kpiDefinitions.set(kpi.id, kpi);
                        // Calculate initial value
                        return [4 /*yield*/, this.calculateKPIValue(kpi.id)];
                    case 2:
                        // Calculate initial value
                        _a.sent();
                        console.log("\u2705 KPI created: ".concat(kpi.id));
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.updateKPI = function (kpiId, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var kpi, updatedKPI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kpi = this.kpiDefinitions.get(kpiId);
                        if (!kpi) {
                            throw new Error("KPI not found: ".concat(kpiId));
                        }
                        updatedKPI = __assign(__assign({}, kpi), updates);
                        return [4 /*yield*/, this.validateKPIFormula(updatedKPI)];
                    case 1:
                        _a.sent();
                        this.kpiDefinitions.set(kpiId, updatedKPI);
                        // Recalculate value
                        return [4 /*yield*/, this.calculateKPIValue(kpiId)];
                    case 2:
                        // Recalculate value
                        _a.sent();
                        console.log("\uD83D\uDD04 KPI updated: ".concat(kpiId));
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.deleteKPI = function (kpiId) {
        return __awaiter(this, void 0, void 0, function () {
            var reportDependencies;
            return __generator(this, function (_a) {
                reportDependencies = this.findKPIDependencies(kpiId);
                if (reportDependencies.length > 0) {
                    throw new Error("Cannot delete KPI with dependencies: ".concat(reportDependencies.length, " found"));
                }
                this.kpiDefinitions.delete(kpiId);
                this.kpiCache.delete(kpiId);
                console.log("\uD83D\uDDD1\uFE0F KPI deleted: ".concat(kpiId));
                return [2 /*return*/];
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.validateKPIFormula = function (kpi) {
        return __awaiter(this, void 0, void 0, function () {
            var formula, validFunctions, hasValidFunction;
            return __generator(this, function (_a) {
                formula = kpi.calculation.formula;
                if (!formula || formula.trim().length === 0) {
                    throw new Error('KPI formula cannot be empty');
                }
                validFunctions = ['SUM', 'AVG', 'COUNT', 'MIN', 'MAX', 'MEDIAN'];
                hasValidFunction = validFunctions.some(function (func) { return formula.includes(func); });
                if (!hasValidFunction) {
                    console.warn("KPI formula may be invalid: ".concat(formula));
                }
                return [2 /*return*/];
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.findKPIDependencies = function (kpiId) {
        var _a;
        var dependencies = [];
        // Check report templates
        for (var _i = 0, _b = this.reportTemplates.values(); _i < _b.length; _i++) {
            var template = _b[_i];
            for (var _c = 0, _d = template.layout.sections; _c < _d.length; _c++) {
                var section = _d[_c];
                if ((_a = section.content.kpiIds) === null || _a === void 0 ? void 0 : _a.includes(kpiId)) {
                    dependencies.push("Report: ".concat(template.name));
                }
            }
        }
        // Check dashboards
        for (var _e = 0, _f = this.dashboards.values(); _e < _f.length; _e++) {
            var dashboard = _f[_e];
            for (var _g = 0, _h = dashboard.layout.widgets; _g < _h.length; _g++) {
                var widget = _h[_g];
                if (widget.kpiId === kpiId) {
                    dependencies.push("Dashboard: ".concat(dashboard.name));
                }
            }
        }
        return dependencies;
    };
    BusinessIntelligenceAutomation.prototype.calculateKPIValue = function (kpiId) {
        return __awaiter(this, void 0, void 0, function () {
            var kpi, dataSource, data, value, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kpi = this.kpiDefinitions.get(kpiId);
                        if (!kpi) {
                            throw new Error("KPI not found: ".concat(kpiId));
                        }
                        dataSource = this.dataSources.get(kpi.calculation.dataSourceId);
                        if (!dataSource) {
                            throw new Error("Data source not found: ".concat(kpi.calculation.dataSourceId));
                        }
                        console.log("\uD83D\uDD22 Calculating KPI value: ".concat(kpi.name));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fetchDataFromSource(dataSource, kpi.calculation)];
                    case 2:
                        data = _a.sent();
                        value = this.applyAggregation(data, kpi.calculation);
                        // Cache result
                        this.kpiCache.set(kpiId, {
                            value: value,
                            timestamp: new Date().toISOString(),
                            metadata: {
                                dataPoints: data.length,
                                calculationTime: Date.now()
                            }
                        });
                        // Check alerts
                        return [4 /*yield*/, this.checkKPIAlerts(kpi, value)];
                    case 3:
                        // Check alerts
                        _a.sent();
                        return [2 /*return*/, value];
                    case 4:
                        error_1 = _a.sent();
                        console.error("\u274C Failed to calculate KPI ".concat(kpiId, ":"), error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.fetchDataFromSource = function (dataSource, calculation) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mock data fetching - replace with actual implementation
                        console.log("\uD83D\uDCE5 Fetching data from: ".concat(dataSource.name));
                        // Simulate API/DB call delay
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200 + Math.random() * 800); })];
                    case 1:
                        // Simulate API/DB call delay
                        _a.sent();
                        // Return mock data based on data source type
                        switch (dataSource.type) {
                            case 'database':
                                return [2 /*return*/, this.generateMockDatabaseData(calculation)];
                            case 'api':
                                return [2 /*return*/, this.generateMockAPIData(calculation)];
                            case 'file':
                                return [2 /*return*/, this.generateMockFileData(calculation)];
                            default:
                                return [2 /*return*/, []];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.generateMockDatabaseData = function (calculation) {
        // Generate mock data based on calculation requirements
        var baseValue = Math.random() * 100000;
        var dataPoints = 30 + Math.floor(Math.random() * 70);
        return Array.from({ length: dataPoints }, function (_, i) { return ({
            id: i + 1,
            order_amount: baseValue + (Math.random() - 0.5) * 20000,
            satisfaction_rating: 3.5 + Math.random() * 1.5,
            status: Math.random() > 0.1 ? 'completed' : 'pending',
            created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
        }); });
    };
    BusinessIntelligenceAutomation.prototype.generateMockAPIData = function (calculation) {
        // Generate mock API data
        var dataPoints = 50 + Math.floor(Math.random() * 50);
        return Array.from({ length: dataPoints }, function (_, i) { return ({
            campaign_id: i + 1,
            leads_generated: Math.floor(Math.random() * 100),
            conversions: Math.floor(Math.random() * 20),
            conversion_rate: (Math.random() * 0.3).toFixed(3),
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
        }); });
    };
    BusinessIntelligenceAutomation.prototype.generateMockFileData = function (calculation) {
        // Generate mock file data
        return [
            { metric: 'revenue', value: 95000 + Math.random() * 10000 },
            { metric: 'customers', value: 1200 + Math.floor(Math.random() * 300) },
            { metric: 'orders', value: 450 + Math.floor(Math.random() * 100) }
        ];
    };
    BusinessIntelligenceAutomation.prototype.applyAggregation = function (data, calculation) {
        if (data.length === 0)
            return 0;
        var values = data.map(function (item) {
            // Extract numeric value based on formula
            if (calculation.formula.includes('order_amount')) {
                return item.order_amount || 0;
            }
            else if (calculation.formula.includes('satisfaction_rating')) {
                return item.satisfaction_rating || 0;
            }
            else if (calculation.formula.includes('converted_leads')) {
                return item.conversions || 0;
            }
            else if (calculation.formula.includes('total_leads')) {
                return item.leads_generated || 0;
            }
            return 0;
        }).filter(function (v) { return !isNaN(v); });
        switch (calculation.aggregation) {
            case 'sum':
                return values.reduce(function (sum, value) { return sum + value; }, 0);
            case 'avg':
                return values.reduce(function (sum, value) { return sum + value; }, 0) / values.length;
            case 'count':
                return values.length;
            case 'min':
                return Math.min.apply(Math, values);
            case 'max':
                return Math.max.apply(Math, values);
            case 'median':
                var sorted = values.sort(function (a, b) { return a - b; });
                var mid = Math.floor(sorted.length / 2);
                return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
            default:
                return values.reduce(function (sum, value) { return sum + value; }, 0);
        }
    };
    BusinessIntelligenceAutomation.prototype.checkKPIAlerts = function (kpi, currentValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, alert_1, shouldTrigger;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!kpi.alerts || kpi.alerts.length === 0)
                            return [2 /*return*/];
                        _i = 0, _a = kpi.alerts;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        alert_1 = _a[_i];
                        shouldTrigger = this.evaluateAlertCondition(currentValue, alert_1);
                        if (!shouldTrigger) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.triggerAlert(kpi, alert_1, currentValue)];
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
    BusinessIntelligenceAutomation.prototype.evaluateAlertCondition = function (value, alert) {
        switch (alert.condition) {
            case 'above':
                return value > alert.threshold;
            case 'below':
                return value < alert.threshold;
            case 'equals':
                return Math.abs(value - alert.threshold) < 0.01;
            case 'change_percent':
                // Would need historical data to calculate
                return false;
            default:
                return false;
        }
    };
    BusinessIntelligenceAutomation.prototype.triggerAlert = function (kpi, alert, currentValue) {
        return __awaiter(this, void 0, void 0, function () {
            var message, _i, _a, recipient;
            return __generator(this, function (_b) {
                console.log("\uD83D\uDEA8 Alert triggered for KPI ".concat(kpi.name, ": ").concat(alert.condition, " ").concat(alert.threshold));
                message = alert.message ||
                    "KPI Alert: ".concat(kpi.name, " is ").concat(currentValue, " (").concat(alert.condition, " ").concat(alert.threshold, ")");
                // Mock alert sending - replace with actual implementation
                for (_i = 0, _a = alert.recipients; _i < _a.length; _i++) {
                    recipient = _a[_i];
                    console.log("\uD83D\uDCE7 Sending alert to ".concat(recipient, ": ").concat(message));
                }
                return [2 /*return*/];
            });
        });
    };
    // ========================================================================
    // REPORT GENERATION
    // ========================================================================
    BusinessIntelligenceAutomation.prototype.generateReport = function (templateId, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var template, report, _i, _a, section, sectionData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("\uD83D\uDCC4 Generating report from template: ".concat(templateId));
                        template = this.reportTemplates.get(templateId);
                        if (!template) {
                            throw new Error("Report template not found: ".concat(templateId));
                        }
                        report = {
                            id: "report-".concat(Date.now()),
                            templateId: templateId,
                            templateName: template.name,
                            generatedAt: new Date().toISOString(),
                            filters: filters || {},
                            sections: []
                        };
                        _i = 0, _a = template.layout.sections;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        section = _a[_i];
                        return [4 /*yield*/, this.generateReportSection(section, filters)];
                    case 2:
                        sectionData = _b.sent();
                        report.sections.push(sectionData);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("\u2705 Report generated: ".concat(report.id));
                        return [2 /*return*/, report];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.generateReportSection = function (section, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var sectionData, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        sectionData = {
                            id: section.id,
                            title: section.title,
                            type: section.type,
                            content: {}
                        };
                        _a = section.type;
                        switch (_a) {
                            case 'kpi_grid': return [3 /*break*/, 1];
                            case 'chart': return [3 /*break*/, 3];
                            case 'table': return [3 /*break*/, 5];
                            case 'text': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        _b = sectionData;
                        return [4 /*yield*/, this.generateKPIGridData(section.content.kpiIds)];
                    case 2:
                        _b.content = _e.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        _c = sectionData;
                        return [4 /*yield*/, this.generateChartData(section.content.chartConfig)];
                    case 4:
                        _c.content = _e.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        _d = sectionData;
                        return [4 /*yield*/, this.generateTableData(section.content.tableConfig)];
                    case 6:
                        _d.content = _e.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        sectionData.content = { text: section.content.text };
                        return [3 /*break*/, 9];
                    case 8:
                        sectionData.content = section.content;
                        _e.label = 9;
                    case 9: return [2 /*return*/, sectionData];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.generateKPIGridData = function (kpiIds) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var kpiData, _i, kpiIds_1, kpiId, kpi, cachedValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        kpiData = [];
                        _i = 0, kpiIds_1 = kpiIds;
                        _b.label = 1;
                    case 1:
                        if (!(_i < kpiIds_1.length)) return [3 /*break*/, 5];
                        kpiId = kpiIds_1[_i];
                        kpi = this.kpiDefinitions.get(kpiId);
                        if (!kpi)
                            return [3 /*break*/, 4];
                        cachedValue = this.kpiCache.get(kpiId);
                        if (!!cachedValue) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.calculateKPIValue(kpiId)];
                    case 2:
                        _b.sent();
                        cachedValue = this.kpiCache.get(kpiId);
                        _b.label = 3;
                    case 3:
                        kpiData.push({
                            id: kpiId,
                            name: kpi.name,
                            value: (cachedValue === null || cachedValue === void 0 ? void 0 : cachedValue.value) || 0,
                            target: (_a = kpi.targets) === null || _a === void 0 ? void 0 : _a.target,
                            format: kpi.visualisation.format,
                            color: kpi.visualisation.color,
                            lastUpdated: cachedValue === null || cachedValue === void 0 ? void 0 : cachedValue.timestamp
                        });
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, { kpis: kpiData }];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.generateChartData = function (chartConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPoints, baseValue, data;
            return __generator(this, function (_a) {
                dataPoints = 30;
                baseValue = 80000 + Math.random() * 40000;
                data = Array.from({ length: dataPoints }, function (_, i) { return ({
                    date: new Date(Date.now() - (dataPoints - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    value: baseValue + (Math.random() - 0.5) * 20000 + i * 1000
                }); });
                return [2 /*return*/, {
                        type: chartConfig.type,
                        data: data,
                        config: chartConfig
                    }];
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.generateTableData = function (tableConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                rows = Array.from({ length: 10 }, function (_, i) { return ({
                    id: i + 1,
                    customer: "Customer ".concat(i + 1),
                    orders: Math.floor(Math.random() * 20) + 1,
                    revenue: (Math.random() * 10000).toFixed(2),
                    satisfaction: (3.5 + Math.random() * 1.5).toFixed(1)
                }); });
                return [2 /*return*/, {
                        columns: ['Customer', 'Orders', 'Revenue', 'Satisfaction'],
                        rows: rows,
                        config: tableConfig
                    }];
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.scheduleReport = function (templateId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var template;
            return __generator(this, function (_b) {
                template = this.reportTemplates.get(templateId);
                if (!template || !((_a = template.schedule) === null || _a === void 0 ? void 0 : _a.enabled)) {
                    throw new Error('Report template not found or scheduling not enabled');
                }
                console.log("\uD83D\uDCC5 Scheduling report: ".concat(template.name));
                // Mock scheduling - replace with actual scheduler
                console.log("\u23F0 Report scheduled: ".concat(template.schedule.frequency, " at ").concat(template.schedule.time));
                return [2 /*return*/];
            });
        });
    };
    // ========================================================================
    // DASHBOARD MANAGEMENT
    // ========================================================================
    BusinessIntelligenceAutomation.prototype.createDashboard = function (dashboard) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, widget;
            return __generator(this, function (_b) {
                console.log("\uD83D\uDCCA Creating dashboard: ".concat(dashboard.name));
                // Validate KPI references
                for (_i = 0, _a = dashboard.layout.widgets; _i < _a.length; _i++) {
                    widget = _a[_i];
                    if (widget.kpiId && !this.kpiDefinitions.has(widget.kpiId)) {
                        throw new Error("KPI not found: ".concat(widget.kpiId));
                    }
                }
                this.dashboards.set(dashboard.id, dashboard);
                console.log("\u2705 Dashboard created: ".concat(dashboard.id));
                return [2 /*return*/];
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.getDashboardData = function (dashboardId) {
        return __awaiter(this, void 0, void 0, function () {
            var dashboard, dashboardData, _i, _a, widget, widgetData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dashboard = this.dashboards.get(dashboardId);
                        if (!dashboard) {
                            throw new Error("Dashboard not found: ".concat(dashboardId));
                        }
                        dashboardData = {
                            id: dashboardId,
                            name: dashboard.name,
                            description: dashboard.description,
                            layout: dashboard.layout,
                            widgets: []
                        };
                        _i = 0, _a = dashboard.layout.widgets;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        widget = _a[_i];
                        return [4 /*yield*/, this.generateWidgetData(widget)];
                    case 2:
                        widgetData = _b.sent();
                        dashboardData.widgets.push(widgetData);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, dashboardData];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.generateWidgetData = function (widget) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var widgetData, kpi, cachedValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        widgetData = {
                            id: widget.id,
                            type: widget.type,
                            title: widget.title,
                            position: widget.position,
                            data: null,
                            lastUpdated: new Date().toISOString()
                        };
                        if (!widget.kpiId) return [3 /*break*/, 3];
                        kpi = this.kpiDefinitions.get(widget.kpiId);
                        if (!kpi) return [3 /*break*/, 3];
                        cachedValue = this.kpiCache.get(widget.kpiId);
                        if (!!cachedValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.calculateKPIValue(widget.kpiId)];
                    case 1:
                        _b.sent();
                        cachedValue = this.kpiCache.get(widget.kpiId);
                        _b.label = 2;
                    case 2:
                        widgetData.data = {
                            value: (cachedValue === null || cachedValue === void 0 ? void 0 : cachedValue.value) || 0,
                            format: kpi.visualisation.format,
                            color: kpi.visualisation.color,
                            target: (_a = kpi.targets) === null || _a === void 0 ? void 0 : _a.target
                        };
                        _b.label = 3;
                    case 3: return [2 /*return*/, widgetData];
                }
            });
        });
    };
    // ========================================================================
    // AUTOMATION ENGINE
    // ========================================================================
    BusinessIntelligenceAutomation.prototype.startAutomationEngine = function () {
        var _this = this;
        if (this.isRunning)
            return;
        this.isRunning = true;
        console.log('🚀 Starting BI automation engine...');
        // Update KPIs based on their frequency
        setInterval(function () {
            _this.updateKPIs();
        }, 60000); // Check every minute
        // Process scheduled reports
        setInterval(function () {
            _this.processScheduledReports();
        }, 300000); // Check every 5 minutes
        // Refresh data sources
        setInterval(function () {
            _this.refreshDataSources();
        }, 900000); // Check every 15 minutes
    };
    BusinessIntelligenceAutomation.prototype.updateKPIs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, _i, _a, _b, kpiId, kpi, shouldUpdate, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        now = new Date();
                        _i = 0, _a = this.kpiDefinitions.entries();
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        _b = _a[_i], kpiId = _b[0], kpi = _b[1];
                        if (kpi.status !== 'active')
                            return [3 /*break*/, 5];
                        shouldUpdate = this.shouldUpdateKPI(kpi, now);
                        if (!shouldUpdate) return [3 /*break*/, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.calculateKPIValue(kpiId)];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _c.sent();
                        console.error("\u274C Failed to update KPI ".concat(kpiId, ":"), error_2);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.shouldUpdateKPI = function (kpi, now) {
        var cachedValue = this.kpiCache.get(kpi.id);
        if (!cachedValue)
            return true;
        var lastUpdate = new Date(cachedValue.timestamp);
        var diffMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
        switch (kpi.updateFrequency) {
            case 'realtime':
                return diffMinutes >= 1;
            case 'hourly':
                return diffMinutes >= 60;
            case 'daily':
                return diffMinutes >= 1440;
            case 'weekly':
                return diffMinutes >= 10080;
            case 'monthly':
                return diffMinutes >= 43200;
            default:
                return diffMinutes >= 60;
        }
    };
    BusinessIntelligenceAutomation.prototype.processScheduledReports = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var now, _i, _b, template, shouldGenerate, report, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        now = new Date();
                        _i = 0, _b = this.reportTemplates.values();
                        _c.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 7];
                        template = _b[_i];
                        if (!((_a = template.schedule) === null || _a === void 0 ? void 0 : _a.enabled))
                            return [3 /*break*/, 6];
                        shouldGenerate = this.shouldGenerateReport(template, now);
                        if (!shouldGenerate) return [3 /*break*/, 6];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.generateReport(template.id)];
                    case 3:
                        report = _c.sent();
                        return [4 /*yield*/, this.sendReport(report, template.schedule.recipients, template.schedule.format)];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _c.sent();
                        console.error("\u274C Failed to generate scheduled report ".concat(template.id, ":"), error_3);
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.shouldGenerateReport = function (template, now) {
        // Simplified scheduling logic - replace with proper cron evaluation
        var schedule = template.schedule;
        var hour = now.getHours();
        var minute = now.getMinutes();
        var dayOfWeek = now.getDay();
        var dayOfMonth = now.getDate();
        var _a = schedule.time.split(':').map(Number), scheduleHour = _a[0], scheduleMinute = _a[1];
        // Check if it's the right time
        if (hour !== scheduleHour || minute !== scheduleMinute)
            return false;
        switch (schedule.frequency) {
            case 'daily':
                return true;
            case 'weekly':
                return dayOfWeek === (schedule.dayOfWeek || 1);
            case 'monthly':
                return dayOfMonth === (schedule.dayOfMonth || 1);
            default:
                return false;
        }
    };
    BusinessIntelligenceAutomation.prototype.sendReport = function (report, recipients, format) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, recipients_1, recipient;
            return __generator(this, function (_a) {
                console.log("\uD83D\uDCE7 Sending ".concat(format, " report to ").concat(recipients.length, " recipients"));
                for (_i = 0, recipients_1 = recipients; _i < recipients_1.length; _i++) {
                    recipient = recipients_1[_i];
                    console.log("\uD83D\uDCE4 Sending report to: ".concat(recipient));
                    // Mock email sending - replace with actual implementation
                }
                return [2 /*return*/];
            });
        });
    };
    BusinessIntelligenceAutomation.prototype.refreshDataSources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, dataSourceId, dataSource, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = this.dataSources.entries();
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        _b = _a[_i], dataSourceId = _b[0], dataSource = _b[1];
                        if (dataSource.status !== 'active')
                            return [3 /*break*/, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.testDataSourceConnection(dataSource)];
                    case 3:
                        _c.sent();
                        dataSource.lastSync = new Date().toISOString();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _c.sent();
                        console.error("\u274C Data source health check failed for ".concat(dataSourceId, ":"), error_4);
                        dataSource.status = 'error';
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // ========================================================================
    // PUBLIC APIS
    // ========================================================================
    BusinessIntelligenceAutomation.prototype.getKPIValue = function (kpiId) {
        return this.kpiCache.get(kpiId);
    };
    BusinessIntelligenceAutomation.prototype.getKPIs = function () {
        return Array.from(this.kpiDefinitions.values());
    };
    BusinessIntelligenceAutomation.prototype.getDataSources = function () {
        return Array.from(this.dataSources.values());
    };
    BusinessIntelligenceAutomation.prototype.getReportTemplates = function () {
        return Array.from(this.reportTemplates.values());
    };
    BusinessIntelligenceAutomation.prototype.getDashboards = function () {
        return Array.from(this.dashboards.values());
    };
    BusinessIntelligenceAutomation.prototype.getSystemMetrics = function () {
        return {
            overview: {
                dataSources: this.dataSources.size,
                activeKPIs: Array.from(this.kpiDefinitions.values()).filter(function (k) { return k.status === 'active'; }).length,
                reportTemplates: this.reportTemplates.size,
                dashboards: this.dashboards.size,
                cachedKPIs: this.kpiCache.size
            },
            performance: {
                averageKPICalculationTime: 250 + Math.random() * 500,
                cacheHitRate: 0.85 + Math.random() * 0.1,
                dataSourceHealth: Array.from(this.dataSources.values()).filter(function (ds) { return ds.status === 'active'; }).length / this.dataSources.size,
                automationUptime: '99.7%'
            },
            alerts: {
                activeRules: this.alertRules.size,
                triggeredToday: Math.floor(Math.random() * 10),
                averageResponseTime: '2.3 minutes'
            }
        };
    };
    return BusinessIntelligenceAutomation;
}());
exports.BusinessIntelligenceAutomation = BusinessIntelligenceAutomation;
// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================
function createBusinessIntelligenceAutomation() {
    return new BusinessIntelligenceAutomation();
}
exports.createBusinessIntelligenceAutomation = createBusinessIntelligenceAutomation;
// ============================================================================
// DEMO FUNCTION
// ============================================================================
function demoBusinessIntelligenceAutomation() {
    return __awaiter(this, void 0, void 0, function () {
        var biSystem, metrics, kpis, _i, _a, kpi, value, reportTemplates, report, dashboards, dashboardData, dataSources;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('\n📊 BUSINESS INTELLIGENCE AUTOMATION DEMO');
                    console.log('==========================================');
                    biSystem = createBusinessIntelligenceAutomation();
                    // Get system overview
                    console.log('\n📋 System Overview:');
                    metrics = biSystem.getSystemMetrics();
                    console.log('System Metrics:', metrics);
                    // Calculate KPI values
                    console.log('\n📈 Calculating KPI Values...');
                    kpis = biSystem.getKPIs();
                    _i = 0, _a = kpis.slice(0, 2);
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    kpi = _a[_i];
                    return [4 /*yield*/, biSystem.calculateKPIValue(kpi.id)];
                case 2:
                    value = _b.sent();
                    console.log("".concat(kpi.name, ": ").concat(value, " (").concat(kpi.visualisation.format, ")"));
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    // Generate a report
                    console.log('\n📄 Generating Executive Report...');
                    reportTemplates = biSystem.getReportTemplates();
                    if (!(reportTemplates.length > 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, biSystem.generateReport(reportTemplates[0].id)];
                case 5:
                    report = _b.sent();
                    console.log("Report generated: ".concat(report.templateName, " (").concat(report.sections.length, " sections)"));
                    _b.label = 6;
                case 6:
                    // Get dashboard data
                    console.log('\n📊 Loading Dashboard Data...');
                    dashboards = biSystem.getDashboards();
                    if (!(dashboards.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, biSystem.getDashboardData(dashboards[0].id)];
                case 7:
                    dashboardData = _b.sent();
                    console.log("Dashboard loaded: ".concat(dashboardData.name, " (").concat(dashboardData.widgets.length, " widgets)"));
                    _b.label = 8;
                case 8:
                    // Display available data sources
                    console.log('\n🔌 Available Data Sources:');
                    dataSources = biSystem.getDataSources();
                    dataSources.forEach(function (ds) {
                        console.log("- ".concat(ds.name, " (").concat(ds.type, ") - Status: ").concat(ds.status));
                    });
                    console.log('\n✅ Business Intelligence Automation Demo Complete!');
                    return [2 /*return*/];
            }
        });
    });
}
exports.demoBusinessIntelligenceAutomation = demoBusinessIntelligenceAutomation;
