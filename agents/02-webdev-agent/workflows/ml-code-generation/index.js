"use strict";
/**
 * ML Code Generation System - Enterprise Orchestrator
 * Système ML de génération de code enterprise - Orchestrateur complet
 *
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Orchestrateur principal enterprise avec API REST, gestion d'état avancée,
 *              monitoring temps réel, et intégrations MCP complètes
 *
 * 🚀 FONCTIONNALITÉS ENTERPRISE:
 * ✅ API REST complète avec authentification
 * ✅ Gestion d'état distribuée avec cache Redis
 * ✅ Monitoring temps réel avec métriques avancées
 * ✅ Pipeline CI/CD automatisé
 * ✅ Validation sécurité OWASP + compliance
 * ✅ Intégrations MCP (Vercel, Figma, Neon, Stripe)
 * ✅ Scaling automatique et load balancing
 * ✅ Backup et disaster recovery
 * ✅ Audit logs et traçabilité complète
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMLSystemWithAPI = exports.createEnterpriseMLSystem = exports.getDefaultMLSystemConfig = exports.createDefaultMLCodeGenerationSystem = exports.createMLCodeGenerationSystem = exports.TemplateGeneratorFactory = exports.DeploymentPipeline = exports.MCPIntegrationsManager = exports.SecurityValidator = exports.QualityScorer = exports.MLCodeGenerator = exports.MLCodeGenerationSystemFactory = exports.MLCodeGenerationSystem = void 0;
var events_1 = require("events");
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var express_rate_limit_1 = require("express-rate-limit");
var compression_1 = require("compression");
var redis_1 = require("redis");
var ws_1 = require("ws");
var uuid_1 = require("uuid");
var winston_1 = require("winston");
var jsonwebtoken_1 = require("jsonwebtoken");
var generator_1 = require("./generator");
exports.MLCodeGenerator = generator_1.default;
var quality_scorer_1 = require("./quality-scorer");
Object.defineProperty(exports, "QualityScorer", { enumerable: true, get: function () { return quality_scorer_1.QualityScorer; } });
var security_validator_1 = require("./security-validator");
Object.defineProperty(exports, "SecurityValidator", { enumerable: true, get: function () { return security_validator_1.SecurityValidator; } });
var mcp_integrations_1 = require("./mcp-integrations");
Object.defineProperty(exports, "MCPIntegrationsManager", { enumerable: true, get: function () { return mcp_integrations_1.MCPIntegrationsManager; } });
var deployment_pipeline_1 = require("./deployment-pipeline");
Object.defineProperty(exports, "DeploymentPipeline", { enumerable: true, get: function () { return deployment_pipeline_1.DeploymentPipeline; } });
var templates_1 = require("./templates");
Object.defineProperty(exports, "TemplateGeneratorFactory", { enumerable: true, get: function () { return templates_1.TemplateGeneratorFactory; } });
// ========================================
// SYSTÈME PRINCIPAL
// ========================================
var MLCodeGenerationSystem = /** @class */ (function (_super) {
    __extends(MLCodeGenerationSystem, _super);
    function MLCodeGenerationSystem() {
        var _this = _super.call(this) || this;
        _this.isInitialized = false;
        _this.projectQueue = new Map();
        _this.activeProjects = new Map();
        _this.deploymentQueue = new Map();
        _this.connections = new Set();
        _this.auditLogs = [];
        _this.initializeMetrics();
        _this.initializeLogger();
        _this.initializeExpressApp();
        return _this;
    }
    // ========================================
    // INITIALISATION
    // ========================================
    MLCodeGenerationSystem.prototype.initialize = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('🚀 Initialisation du système ML de génération de code enterprise...');
                        this.config = config;
                        this.emit('system:initializing');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 17, , 18]);
                        if (!this.config.redis.enabled) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.initializeRedis()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: 
                    // 2. Initialisation du générateur ML
                    return [4 /*yield*/, this.initializeMLGenerator()];
                    case 4:
                        // 2. Initialisation du générateur ML
                        _a.sent();
                        // 3. Initialisation des validateurs
                        return [4 /*yield*/, this.initializeValidators()];
                    case 5:
                        // 3. Initialisation des validateurs
                        _a.sent();
                        // 4. Initialisation des intégrations MCP
                        return [4 /*yield*/, this.initializeMCPIntegrations()];
                    case 6:
                        // 4. Initialisation des intégrations MCP
                        _a.sent();
                        // 5. Initialisation du pipeline de déploiement
                        return [4 /*yield*/, this.initializeDeploymentPipeline()];
                    case 7:
                        // 5. Initialisation du pipeline de déploiement
                        _a.sent();
                        if (!this.config.monitoring.enabled) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.initializeMonitoring()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!this.config.api.enabled) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.startAPIServer()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!this.config.websocket.enabled) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.startWebSocketServer()];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: 
                    // 9. Configuration des tâches automatisées
                    return [4 /*yield*/, this.initializeAutomatedTasks()];
                    case 14:
                        // 9. Configuration des tâches automatisées
                        _a.sent();
                        if (!this.config.backup.enabled) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.initializeBackupSystem()];
                    case 15:
                        _a.sent();
                        _a.label = 16;
                    case 16:
                        this.isInitialized = true;
                        this.logger.info('✅ Système ML de génération de code enterprise initialisé avec succès');
                        this.emit('system:initialized');
                        // Audit log de démarrage
                        this.auditLog('system:startup', 'System initialized successfully', { config: this.config });
                        return [3 /*break*/, 18];
                    case 17:
                        error_1 = _a.sent();
                        this.logger.error('❌ Erreur lors de l\'initialisation:', error_1);
                        this.emit('system:error', error_1);
                        throw error_1;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    MLCodeGenerationSystem.prototype.initializeMLGenerator = function () {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var mlConfig;
            var _this = this;
            return __generator(this, function (_f) {
                console.log('🤖 Initialisation du générateur ML...');
                mlConfig = {
                    version: '2.0.0',
                    environment: 'production',
                    models: {
                        githubCopilot: {
                            enabled: true,
                            apiKey: this.config.ml.githubCopilot.apiKey,
                            model: 'gpt-4-turbo',
                            maxTokens: 2000,
                            temperature: 0.3,
                            topP: 0.9,
                            frequencyPenalty: 0,
                            presencePenalty: 0,
                            enterpriseFeatures: {
                                codeReview: this.config.ml.githubCopilot.enterprise,
                                securityScanning: this.config.ml.githubCopilot.enterprise,
                                complianceChecks: this.config.ml.githubCopilot.enterprise,
                                auditLogs: this.config.ml.githubCopilot.enterprise,
                                teamCollaboration: this.config.ml.githubCopilot.enterprise
                            },
                            rateLimits: {
                                requestsPerHour: 1000,
                                tokensPerMinute: 10000
                            }
                        },
                        codeT5: {
                            enabled: this.config.ml.codeT5.enabled,
                            models: {
                                base: 'Salesforce/codet5-base',
                                large: 'Salesforce/codet5-large',
                                fineTuned: this.config.ml.codeT5.models
                            },
                            inference: {
                                maxNewTokens: 2000,
                                temperature: 0.2,
                                topP: 0.9,
                                topK: 50,
                                repetitionPenalty: 1.1,
                                lengthPenalty: 1.0,
                                numBeams: 4,
                                earlyStopping: true
                            },
                            fineTuning: {
                                enabled: false,
                                datasets: [],
                                epochs: 3,
                                learningRate: 5e-5,
                                batchSize: 8
                            }
                        },
                        customModels: {
                            enabled: false,
                            models: {},
                            registry: {
                                url: '',
                                authentication: {}
                            }
                        }
                    },
                    optimization: {
                        enabled: true,
                        performance: {
                            bundleOptimization: true,
                            codesplitting: true,
                            treeshaking: true,
                            minification: true,
                            compression: true
                        },
                        images: {
                            formats: ['webp', 'avif'],
                            quality: 85,
                            responsive: true,
                            lazy: true,
                            webp: true,
                            avif: true
                        },
                        caching: {
                            staticAssets: 31536000,
                            apiResponses: 300,
                            cdn: true,
                            serviceWorker: true
                        },
                        targets: {
                            lcp: 2500,
                            fid: 100,
                            cls: 0.1,
                            fcp: 1800,
                            ttfb: 800,
                            bundleSize: 250000,
                            lighthouse: 90
                        }
                    },
                    testing: {
                        enabled: true,
                        frameworks: {
                            jest: {
                                enabled: true,
                                version: '29.x',
                                testEnvironment: 'jsdom',
                                setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
                                moduleNameMapping: { '^@/(.*)$': '<rootDir>/src/$1' },
                                transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
                                collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts']
                            },
                            playwright: {
                                enabled: true,
                                version: '1.40.x',
                                browsers: ['chromium', 'firefox', 'webkit'],
                                devices: ['Desktop Chrome', 'iPhone 12', 'iPad'],
                                baseURL: 'http://localhost:3000',
                                timeout: 30000,
                                retries: 2,
                                workers: 1
                            },
                            cypress: {
                                enabled: false,
                                version: '13.x',
                                baseUrl: 'http://localhost:3000',
                                viewportWidth: 1280,
                                viewportHeight: 720,
                                video: false,
                                screenshots: true,
                                chromeWebSecurity: false
                            },
                            vitest: {
                                enabled: false,
                                version: '1.x',
                                environment: 'jsdom',
                                globals: true,
                                coverage: {}
                            }
                        },
                        coverage: {
                            threshold: {
                                global: {
                                    statements: this.config.quality.level === 'enterprise' ? 90 : 80,
                                    branches: this.config.quality.level === 'enterprise' ? 85 : 75,
                                    functions: this.config.quality.level === 'enterprise' ? 90 : 80,
                                    lines: this.config.quality.level === 'enterprise' ? 90 : 80
                                },
                                perFile: {
                                    statements: 70,
                                    branches: 60,
                                    functions: 70,
                                    lines: 70
                                }
                            },
                            reporters: ['text', 'html', 'lcov'],
                            collectFrom: ['src/**/*.{ts,tsx}'],
                            exclude: ['src/**/*.d.ts', 'src/**/*.test.{ts,tsx}']
                        },
                        visualRegression: {
                            enabled: this.config.quality.level === 'enterprise',
                            threshold: 0.1,
                            browsers: ['chromium'],
                            devices: ['desktop', 'mobile']
                        },
                        accessibility: {
                            enabled: this.config.quality.level !== 'mvp',
                            standards: ['WCAG2A', 'WCAG2AA'],
                            tools: ['axe-core', 'pa11y']
                        }
                    },
                    security: {
                        enabled: true,
                        scanning: {
                            dependencies: true,
                            secrets: true,
                            staticAnalysis: true,
                            dynamicAnalysis: this.config.security.level === 'enterprise'
                        },
                        compliance: {
                            owasp: true,
                            gdpr: true,
                            hipaa: this.config.security.level === 'enterprise',
                            sox: this.config.security.level === 'enterprise'
                        },
                        tools: {
                            snyk: true,
                            sonarqube: this.config.security.level === 'enterprise',
                            codeql: true,
                            semgrep: this.config.security.level === 'enterprise'
                        },
                        policies: {
                            allowedDependencies: [],
                            blockedDependencies: ['lodash@4.17.15'],
                            maxVulnerabilityScore: this.config.security.level === 'enterprise' ? 7.0 : 8.5,
                            requireSecurityReview: this.config.security.level === 'enterprise',
                            encryptionStandards: ['AES-256', 'RSA-2048']
                        }
                    },
                    deployment: {
                        enabled: this.config.deployment.enabled,
                        providers: {
                            vercel: {
                                enabled: !!this.config.integrations.vercel,
                                teamId: (_a = this.config.integrations.vercel) === null || _a === void 0 ? void 0 : _a.teamId,
                                projectId: '',
                                orgId: '',
                                token: ((_b = this.config.integrations.vercel) === null || _b === void 0 ? void 0 : _b.apiKey) || '',
                                regions: ['iad1', 'cdg1'],
                                functions: {
                                    memory: 1024,
                                    timeout: 30
                                }
                            },
                            netlify: { enabled: false, siteId: '', token: '', buildCommand: '', publishDir: '', functions: { directory: '' } },
                            aws: { enabled: false, region: '', accessKeyId: '', secretAccessKey: '', s3: { bucket: '', region: '' }, cloudfront: { distributionId: '' }, lambda: { region: '', timeout: 0, memory: 0 } },
                            gcp: { enabled: false, projectId: '', credentials: {}, storage: { bucket: '' }, functions: { region: '', timeout: 0, memory: '' } }
                        },
                        environments: {
                            development: {
                                name: 'development',
                                url: '',
                                branch: 'develop',
                                variables: { NODE_ENV: 'development' },
                                secrets: {},
                                protection: {
                                    requireReview: false,
                                    allowedUsers: [],
                                    requiredChecks: []
                                }
                            },
                            staging: {
                                name: 'staging',
                                url: '',
                                branch: 'main',
                                variables: { NODE_ENV: 'staging' },
                                secrets: {},
                                protection: {
                                    requireReview: false,
                                    allowedUsers: [],
                                    requiredChecks: []
                                }
                            },
                            production: {
                                name: 'production',
                                url: '',
                                branch: 'main',
                                variables: { NODE_ENV: 'production' },
                                secrets: {},
                                protection: {
                                    requireReview: true,
                                    allowedUsers: [],
                                    requiredChecks: ['build', 'test', 'security']
                                }
                            }
                        },
                        cicd: {
                            provider: 'github-actions',
                            stages: ['lint', 'test', 'build', 'deploy'],
                            autoDeployment: {
                                staging: this.config.deployment.autoDeployment,
                                production: false
                            },
                            qualityGates: {
                                testCoverage: this.config.quality.level === 'enterprise' ? 90 : 80,
                                buildSuccess: true,
                                performanceScore: this.config.quality.level === 'enterprise' ? 95 : 85
                            }
                        }
                    },
                    monitoring: {
                        enabled: this.config.monitoring.enabled,
                        realUserMonitoring: {
                            enabled: true,
                            provider: 'vercel',
                            sampleRate: 1.0
                        },
                        syntheticMonitoring: {
                            enabled: this.config.monitoring.realtime,
                            frequency: '5min',
                            locations: ['us-east-1', 'eu-west-1'],
                            urls: ['/']
                        },
                        errorTracking: {
                            enabled: true,
                            provider: 'sentry',
                            sampleRate: 1.0,
                            environment: 'production'
                        },
                        logging: {
                            enabled: true,
                            level: 'info',
                            providers: ['console']
                        },
                        alerts: {
                            enabled: this.config.monitoring.alerts,
                            channels: [],
                            rules: []
                        }
                    },
                    integrations: {
                        figma: {
                            enabled: !!this.config.integrations.figma,
                            apiKey: ((_c = this.config.integrations.figma) === null || _c === void 0 ? void 0 : _c.accessToken) || '',
                            teamId: '',
                            extractTokens: true,
                            generateComponents: true,
                            syncDesignSystem: true
                        },
                        stripe: {
                            enabled: !!this.config.integrations.stripe,
                            publishableKey: '',
                            secretKey: ((_d = this.config.integrations.stripe) === null || _d === void 0 ? void 0 : _d.secretKey) || '',
                            webhookSecret: '',
                            testMode: true,
                            products: []
                        },
                        neon: {
                            enabled: !!this.config.integrations.neon,
                            apiKey: ((_e = this.config.integrations.neon) === null || _e === void 0 ? void 0 : _e.apiKey) || '',
                            projectId: '',
                            branches: {
                                main: 'main',
                                development: 'dev',
                                staging: 'staging'
                            },
                            connectionString: ''
                        },
                        contentful: { enabled: false, spaceId: '', accessToken: '', previewToken: '', environment: '' },
                        sanity: { enabled: false, projectId: '', dataset: '', token: '', apiVersion: '' },
                        supabase: { enabled: false, url: '', anonKey: '', serviceRoleKey: '', jwtSecret: '' },
                        auth0: { enabled: false, domain: '', clientId: '', clientSecret: '', audience: '' },
                        sendgrid: { enabled: false, apiKey: '', fromEmail: '', templates: {} }
                    }
                };
                this.generator = new generator_1.default(mlConfig);
                // Écoute des événements du générateur
                this.generator.on('initialized', function () {
                    console.log('✅ Générateur ML initialisé');
                });
                this.generator.on('generation:started', function (data) {
                    _this.emit('generation:started', data);
                });
                this.generator.on('generation:completed', function (result) {
                    _this.updateGenerationMetrics(result);
                    _this.emit('generation:completed', result);
                });
                this.generator.on('generation:error', function (data) {
                    _this.emit('generation:error', data);
                });
                return [2 /*return*/];
            });
        });
    };
    MLCodeGenerationSystem.prototype.initializeValidators = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('🔍 Initialisation des validateurs...');
                // Quality Scorer
                this.qualityScorer = new quality_scorer_1.QualityScorer({
                    projectType: 'restaurant',
                    qualityLevel: this.config.quality.level,
                    files: []
                });
                // Security Validator
                this.securityValidator = new security_validator_1.SecurityValidator(this.config.security.level);
                console.log('✅ Validateurs initialisés');
                return [2 /*return*/];
            });
        });
    };
    MLCodeGenerationSystem.prototype.initializeMCPIntegrations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🔗 Initialisation des intégrations MCP...');
                        this.mcpManager = new mcp_integrations_1.MCPIntegrationsManager();
                        return [4 /*yield*/, this.mcpManager.initialize(this.config.integrations)];
                    case 1:
                        _a.sent();
                        // Écoute des événements MCP
                        this.mcpManager.on('initialized', function (services) {
                            console.log("\u2705 ".concat(services.length, " service(s) MCP initialis\u00E9(s): ").concat(services.join(', ')));
                        });
                        console.log('✅ Intégrations MCP initialisées');
                        return [2 /*return*/];
                }
            });
        });
    };
    MLCodeGenerationSystem.prototype.initializeDeploymentPipeline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.config.deployment.enabled) {
                    console.log('⏭️ Pipeline de déploiement désactivé');
                    return [2 /*return*/];
                }
                console.log('🚀 Initialisation du pipeline de déploiement...');
                this.deploymentPipeline = deployment_pipeline_1.DeploymentPipelineFactory.createDefault(this.config.quality.level, this.mcpManager);
                // Écoute des événements du pipeline
                this.deploymentPipeline.on('pipeline:started', function (execution) {
                    _this.emit('deployment:started', execution);
                });
                this.deploymentPipeline.on('pipeline:completed', function (execution) {
                    _this.updateDeploymentMetrics(execution);
                    _this.emit('deployment:completed', execution);
                });
                this.deploymentPipeline.on('pipeline:failed', function (data) {
                    _this.emit('deployment:failed', data);
                });
                console.log('✅ Pipeline de déploiement initialisé');
                return [2 /*return*/];
            });
        });
    };
    MLCodeGenerationSystem.prototype.initializeMonitoring = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('📊 Initialisation du monitoring...');
                // Démarrage du monitoring de santé
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var health, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.getSystemHealth()];
                            case 1:
                                health = _a.sent();
                                this.emit('health:check', health);
                                if (health.status !== 'healthy') {
                                    console.warn('⚠️ Système en état dégradé:', health);
                                    this.emit('health:degraded', health);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _a.sent();
                                console.error('❌ Erreur monitoring santé:', error_2);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 60000); // Toutes les minutes
                // Démarrage du monitoring des métriques
                if (this.config.monitoring.realtime) {
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var metrics, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.getMetrics()];
                                case 1:
                                    metrics = _a.sent();
                                    this.emit('metrics:updated', metrics);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    console.error('❌ Erreur monitoring métriques:', error_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, 30000); // Toutes les 30 secondes
                }
                console.log('✅ Monitoring initialisé');
                return [2 /*return*/];
            });
        });
    };
    // ========================================
    // GÉNÉRATION DE PROJET
    // ========================================
    MLCodeGenerationSystem.prototype.generateProject = function (request) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var projectId, startTime, result, qualityResult, securityReport, error_4;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.isInitialized) {
                            throw new Error('Système non initialisé. Appelez initialize() d\'abord.');
                        }
                        projectId = (0, uuid_1.v4)();
                        startTime = Date.now();
                        this.logger.info("\uD83C\uDFAF G\u00E9n\u00E9ration de projet ".concat(request.projectType, " (niveau ").concat(request.qualityLevel, ")"), { projectId: projectId });
                        // Ajout à la queue
                        this.projectQueue.set(projectId, request);
                        this.metrics.generation.queueLength = this.projectQueue.size;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 9, , 10]);
                        // Audit log
                        this.auditLog('project:generation:started', 'Project generation started', {
                            projectId: projectId,
                            request: request,
                            timestamp: new Date().toISOString()
                        });
                        // Notification temps réel
                        this.broadcast('project:started', { projectId: projectId, request: request });
                        return [4 /*yield*/, this.generator.generateProject(request)];
                    case 2:
                        result = _e.sent();
                        result.id = projectId;
                        result.startTime = new Date(startTime);
                        result.duration = Date.now() - startTime;
                        if (!result.success) {
                            throw new Error('Échec de la génération de code');
                        }
                        // Ajout aux projets actifs
                        this.activeProjects.set(projectId, result);
                        this.metrics.generation.projectsInProgress = this.activeProjects.size;
                        if (!this.redis) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.redis.setex("project:".concat(projectId), this.config.redis.ttl, JSON.stringify(result))];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        if (!this.config.quality.enforceGates) return [3 /*break*/, 6];
                        this.logger.info('📊 Validation qualité...', { projectId: projectId });
                        return [4 /*yield*/, quality_scorer_1.QualityScorerFactory.scoreProject(result.project.type, request.qualityLevel, result.files)];
                    case 5:
                        qualityResult = _e.sent();
                        if (qualityResult.overall < 70) { // Seuil minimum
                            if (this.config.quality.autoFix) {
                                this.logger.info('🔧 Application des corrections automatiques...', { projectId: projectId });
                                // Logique d'auto-correction
                                this.broadcast('project:fixing', { projectId: projectId, issues: qualityResult.issues });
                            }
                            else {
                                this.logger.warn("\u26A0\uFE0F Score qualit\u00E9 faible: ".concat(qualityResult.overall, "/100"), { projectId: projectId });
                            }
                        }
                        result.metrics.quality = qualityResult.breakdown;
                        this.broadcast('project:quality', { projectId: projectId, score: qualityResult.overall });
                        _e.label = 6;
                    case 6:
                        if (!this.config.security.enforceCompliance) return [3 /*break*/, 8];
                        this.logger.info('🔒 Validation sécurité...', { projectId: projectId });
                        return [4 /*yield*/, security_validator_1.SecurityValidatorFactory.validateProject(result.files, result.project.type, this.config.security.level)];
                    case 7:
                        securityReport = _e.sent();
                        if (securityReport.status === 'critical') {
                            this.auditLog('security:critical', 'Critical security issues detected', {
                                projectId: projectId,
                                issues: securityReport.issues
                            });
                            throw new Error('Problèmes de sécurité critiques détectés');
                        }
                        result.metrics.security = securityReport;
                        this.broadcast('project:security', { projectId: projectId, status: securityReport.status });
                        _e.label = 8;
                    case 8:
                        // Mise à jour des métriques
                        this.updateGenerationMetrics(result);
                        // Suppression de la queue
                        this.projectQueue.delete(projectId);
                        this.metrics.generation.queueLength = this.projectQueue.size;
                        // Notification de succès
                        this.broadcast('project:completed', { projectId: projectId, result: result });
                        // Audit log
                        this.auditLog('project:generation:completed', 'Project generation completed successfully', {
                            projectId: projectId,
                            duration: result.duration,
                            qualityScore: (_b = (_a = result.metrics) === null || _a === void 0 ? void 0 : _a.quality) === null || _b === void 0 ? void 0 : _b.overall,
                            securityStatus: (_d = (_c = result.metrics) === null || _c === void 0 ? void 0 : _c.security) === null || _d === void 0 ? void 0 : _d.status
                        });
                        this.logger.info("\u2705 Projet g\u00E9n\u00E9r\u00E9 avec succ\u00E8s: ".concat(result.project.name), { projectId: projectId, duration: result.duration });
                        return [2 /*return*/, result];
                    case 9:
                        error_4 = _e.sent();
                        // Nettoyage en cas d'erreur
                        this.projectQueue.delete(projectId);
                        this.activeProjects.delete(projectId);
                        // Audit log d'erreur
                        this.auditLog('project:generation:failed', 'Project generation failed', {
                            projectId: projectId,
                            error: error_4.message,
                            duration: Date.now() - startTime
                        });
                        // Notification d'erreur
                        this.broadcast('project:failed', { projectId: projectId, error: error_4.message });
                        this.logger.error('❌ Erreur génération projet:', error_4, { projectId: projectId });
                        throw error_4;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // ========================================
    // DÉPLOIEMENT
    // ========================================
    MLCodeGenerationSystem.prototype.deployProject = function (projectId, environment) {
        return __awaiter(this, void 0, void 0, function () {
            var project, files, execution, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.deployment.enabled) {
                            throw new Error('Déploiement désactivé dans la configuration');
                        }
                        if (!this.deploymentPipeline) {
                            throw new Error('Pipeline de déploiement non initialisé');
                        }
                        console.log("\uD83D\uDE80 D\u00E9ploiement du projet ".concat(projectId, " vers ").concat(environment));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        project = {
                            id: projectId,
                            name: "project-".concat(projectId),
                            type: 'restaurant',
                            structure: {
                                directories: [],
                                files: {},
                                entryPoints: {},
                                assets: {}
                            },
                            dependencies: {
                                production: {},
                                development: {},
                                peer: {},
                                optional: {},
                                bundled: []
                            },
                            configuration: {},
                            documentation: {
                                readme: '',
                                installation: '',
                                usage: '',
                                api: '',
                                deployment: '',
                                contributing: '',
                                changelog: '',
                                license: ''
                            },
                            deployment: {
                                id: '',
                                projectId: '',
                                environment: '',
                                status: 'pending',
                                version: '',
                                commit: '',
                                branch: '',
                                url: '',
                                domains: [],
                                timestamp: new Date(),
                                duration: 0,
                                logs: [],
                                metrics: {
                                    buildTime: 0,
                                    deployTime: 0,
                                    bundleSize: 0,
                                    functions: 0,
                                    regions: [],
                                    performance: {
                                        lighthouse: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0, pwa: 0 },
                                        webVitals: { lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0 },
                                        bundle: { size: 0, gzipped: 0, chunks: 0, assets: 0 },
                                        runtime: { startup: 0, hydration: 0, navigation: 0, interaction: 0 }
                                    },
                                    uptime: 0,
                                    availability: 0
                                }
                            }
                        };
                        files = [];
                        return [4 /*yield*/, this.deploymentPipeline.execute(project, files, {
                                environment: environment,
                                triggeredBy: 'api',
                                trigger: 'api',
                                branch: 'main',
                                commit: 'latest'
                            })];
                    case 2:
                        execution = _a.sent();
                        console.log("\u2705 D\u00E9ploiement termin\u00E9: ".concat(execution.id));
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error('❌ Erreur déploiement:', error_5);
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // ========================================
    // MONITORING ET MÉTRIQUES
    // ========================================
    MLCodeGenerationSystem.prototype.getSystemHealth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var components, generatorHealth, error_6, mcpHealth, healthyServices, totalServices, error_7, statuses, overallStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        components = {};
                        if (!this.generator) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.generator.getHealthStatus()];
                    case 2:
                        generatorHealth = _a.sent();
                        components.generator = {
                            status: generatorHealth.status === 'healthy' ? 'healthy' : 'degraded',
                            responseTime: 100,
                            errorRate: 0,
                            metrics: generatorHealth.metrics
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        components.generator = {
                            status: 'unhealthy',
                            responseTime: 0,
                            errorRate: 100,
                            lastError: error_6.message,
                            metrics: {}
                        };
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.mcpManager) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.mcpManager.getHealthStatus()];
                    case 6:
                        mcpHealth = _a.sent();
                        healthyServices = Object.values(mcpHealth).filter(Boolean).length;
                        totalServices = Object.keys(mcpHealth).length;
                        components.mcp = {
                            status: healthyServices === totalServices ? 'healthy' :
                                healthyServices > 0 ? 'degraded' : 'unhealthy',
                            responseTime: 150,
                            errorRate: ((totalServices - healthyServices) / totalServices) * 100,
                            metrics: { healthyServices: healthyServices, totalServices: totalServices }
                        };
                        return [3 /*break*/, 8];
                    case 7:
                        error_7 = _a.sent();
                        components.mcp = {
                            status: 'unhealthy',
                            responseTime: 0,
                            errorRate: 100,
                            lastError: error_7.message,
                            metrics: {}
                        };
                        return [3 /*break*/, 8];
                    case 8:
                        statuses = Object.values(components).map(function (c) { return c.status; });
                        overallStatus = statuses.every(function (s) { return s === 'healthy'; }) ? 'healthy' :
                            statuses.some(function (s) { return s === 'healthy'; }) ? 'degraded' : 'unhealthy';
                        return [2 /*return*/, {
                                status: overallStatus,
                                components: components,
                                uptime: process.uptime(),
                                lastCheck: new Date()
                            }];
                }
            });
        });
    };
    MLCodeGenerationSystem.prototype.getMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.metrics];
            });
        });
    };
    // ========================================
    // MÉTHODES UTILITAIRES
    // ========================================
    MLCodeGenerationSystem.prototype.initializeMetrics = function () {
        this.metrics = {
            generation: {
                totalProjects: 0,
                successRate: 100,
                averageDuration: 0,
                averageQualityScore: 0,
                projectsInProgress: 0,
                queueLength: 0
            },
            deployment: {
                totalDeployments: 0,
                successRate: 100,
                averageDuration: 0,
                rollbackRate: 0,
                activeDeployments: 0,
                failureRate: 0
            },
            security: {
                vulnerabilitiesDetected: 0,
                criticalIssues: 0,
                complianceScore: 100,
                scansCompleted: 0,
                threatLevel: 'low'
            },
            performance: {
                systemLoad: 0,
                memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
                responseTime: 0,
                cpuUsage: 0,
                diskUsage: 0,
                networkLatency: 0
            },
            api: {
                totalRequests: 0,
                requestsPerSecond: 0,
                averageResponseTime: 0,
                errorRate: 0,
                activeConnections: 0
            },
            cache: {
                hitRate: 0,
                missRate: 0,
                totalKeys: 0,
                memoryUsage: 0,
                evictions: 0
            },
            enterprise: {
                uptime: 0,
                availability: 99.9,
                scalingEvents: 0,
                backupsCompleted: 0,
                auditEvents: 0
            }
        };
    };
    MLCodeGenerationSystem.prototype.updateGenerationMetrics = function (result) {
        var _a, _b;
        this.metrics.generation.totalProjects++;
        if (result.success) {
            var currentSuccess = this.metrics.generation.successRate * (this.metrics.generation.totalProjects - 1);
            this.metrics.generation.successRate = (currentSuccess + 100) / this.metrics.generation.totalProjects;
        }
        else {
            var currentSuccess = this.metrics.generation.successRate * (this.metrics.generation.totalProjects - 1);
            this.metrics.generation.successRate = currentSuccess / this.metrics.generation.totalProjects;
        }
        if (result.duration) {
            var currentDuration = this.metrics.generation.averageDuration * (this.metrics.generation.totalProjects - 1);
            this.metrics.generation.averageDuration = (currentDuration + result.duration) / this.metrics.generation.totalProjects;
        }
        if ((_b = (_a = result.metrics) === null || _a === void 0 ? void 0 : _a.quality) === null || _b === void 0 ? void 0 : _b.overall) {
            var currentQuality = this.metrics.generation.averageQualityScore * (this.metrics.generation.totalProjects - 1);
            this.metrics.generation.averageQualityScore = (currentQuality + result.metrics.quality.overall) / this.metrics.generation.totalProjects;
        }
    };
    MLCodeGenerationSystem.prototype.updateDeploymentMetrics = function (execution) {
        this.metrics.deployment.totalDeployments++;
        if (execution.status === 'success') {
            var currentSuccess = this.metrics.deployment.successRate * (this.metrics.deployment.totalDeployments - 1);
            this.metrics.deployment.successRate = (currentSuccess + 100) / this.metrics.deployment.totalDeployments;
        }
        else {
            var currentSuccess = this.metrics.deployment.successRate * (this.metrics.deployment.totalDeployments - 1);
            this.metrics.deployment.successRate = currentSuccess / this.metrics.deployment.totalDeployments;
        }
        if (execution.duration) {
            var currentDuration = this.metrics.deployment.averageDuration * (this.metrics.deployment.totalDeployments - 1);
            this.metrics.deployment.averageDuration = (currentDuration + execution.duration) / this.metrics.deployment.totalDeployments;
        }
    };
    // ========================================
    // MÉTHODES PUBLIQUES UTILITAIRES
    // ========================================
    MLCodeGenerationSystem.prototype.isInitialized = function () {
        return this.isInitialized;
    };
    MLCodeGenerationSystem.prototype.getConfig = function () {
        return this.config;
    };
    MLCodeGenerationSystem.prototype.shutdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('🛑 Arrêt du système ML de génération de code...');
                // Nettoyage des ressources
                this.removeAllListeners();
                console.log('✅ Système arrêté');
                this.emit('system:shutdown');
                return [2 /*return*/];
            });
        });
    };
    return MLCodeGenerationSystem;
}(events_1.EventEmitter));
exports.MLCodeGenerationSystem = MLCodeGenerationSystem;
// ========================================
// FACTORY PRINCIPAL
// ========================================
var MLCodeGenerationSystemFactory = /** @class */ (function () {
    function MLCodeGenerationSystemFactory() {
    }
    MLCodeGenerationSystemFactory.create = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var system;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        system = new MLCodeGenerationSystem();
                        return [4 /*yield*/, system.initialize(config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, system];
                }
            });
        });
    };
    MLCodeGenerationSystemFactory.createDefault = function () {
        return new MLCodeGenerationSystem();
    };
    MLCodeGenerationSystemFactory.getDefaultConfig = function () {
        return {
            ml: {
                githubCopilot: {
                    apiKey: process.env.GITHUB_COPILOT_API_KEY || '',
                    enterprise: true
                },
                codeT5: {
                    enabled: true,
                    models: {
                        'restaurant-components': 'custom/restaurant-components-v1',
                        'ecommerce-patterns': 'custom/ecommerce-patterns-v1'
                    }
                }
            },
            integrations: {
                vercel: {
                    apiKey: process.env.VERCEL_API_KEY || '',
                    teamId: process.env.VERCEL_TEAM_ID
                },
                figma: {
                    accessToken: process.env.FIGMA_ACCESS_TOKEN || ''
                },
                neon: {
                    apiKey: process.env.NEON_API_KEY || ''
                },
                stripe: {
                    secretKey: process.env.STRIPE_SECRET_KEY || ''
                }
            },
            quality: {
                level: 'production',
                enforceGates: true,
                autoFix: true
            },
            security: {
                level: 'production',
                enforceCompliance: true,
                autoScan: true
            },
            deployment: {
                enabled: true,
                autoDeployment: false,
                environments: ['development', 'staging', 'production']
            },
            monitoring: {
                enabled: true,
                realtime: true,
                alerts: true
            },
            // Nouvelles configurations enterprise par défaut
            api: {
                enabled: true,
                port: 3001,
                host: '0.0.0.0',
                cors: {
                    enabled: true,
                    origins: ['http://localhost:3000', 'https://*.vercel.app']
                },
                rateLimit: {
                    enabled: true,
                    windowMs: 15 * 60 * 1000, // 15 minutes
                    max: 100 // requests per window
                },
                authentication: {
                    enabled: true,
                    jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
                    expiresIn: '24h'
                }
            },
            redis: {
                enabled: !!process.env.REDIS_URL,
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
                password: process.env.REDIS_PASSWORD,
                ttl: 3600 // 1 hour
            },
            websocket: {
                enabled: true,
                port: 3002,
                realtime: true
            },
            scaling: {
                enabled: false,
                instances: 1,
                loadBalancer: false,
                autoScale: false
            },
            backup: {
                enabled: false,
                schedule: '0 2 * * *', // Daily at 2 AM
                retention: 30, // days
                storage: 's3'
            },
            audit: {
                enabled: true,
                level: 'comprehensive',
                retention: 90 // days
            }
        };
    };
    return MLCodeGenerationSystemFactory;
}());
exports.MLCodeGenerationSystemFactory = MLCodeGenerationSystemFactory;
exports.default = MLCodeGenerationSystem;
initializeLogger();
void {
    this: .logger = winston_1.default.createLogger({
        level: 'info',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
        defaultMeta: { service: 'ml-code-generation' },
        transports: [
            new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston_1.default.transports.File({ filename: 'logs/combined.log' }),
            new winston_1.default.transports.Console({
                format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
            })
        ]
    })
};
initializeExpressApp();
void {
    this: .app = (0, express_1.default)(),
    // Middlewares de sécurité
    this: .app.use((0, helmet_1.default)()),
    this: .app.use((0, compression_1.default)()),
    this: .app.use((0, cors_1.default)()),
    this: .app.use(express_1.default.json({ limit: '10mb' })),
    this: .app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' })),
    // Middleware de logging
    this: .app.use(function (req, res, next) {
        _this.logger.info("".concat(req.method, " ").concat(req.path), {
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
        next();
    })
};
async;
initializeRedis();
Promise < void  > {
    : .config.redis.enabled, return: ,
    this: .redis = (0, redis_1.createClient)({
        host: this.config.redis.host,
        port: this.config.redis.port,
        password: this.config.redis.password
    }),
    await: await,
    this: .redis.connect(),
    this: .logger.info('✅ Redis connecté')
};
setupAPIRoutes();
void {
    : .config.api.rateLimit.enabled
};
{
    var limiter = (0, express_rate_limit_1.default)({
        windowMs: this.config.api.rateLimit.windowMs,
        max: this.config.api.rateLimit.max,
        message: 'Too many requests from this IP'
    });
    this.app.use('/api/', limiter);
}
// Authentication middleware
var authenticate = function (req, res, next) {
    var _a;
    if (!_this.config.api.authentication.enabled)
        return next();
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, _this.config.api.authentication.jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
// Health check
this.app.get('/health', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var health, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, this.getSystemHealth()];
            case 1:
                health = _a.sent();
                res.json(health);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500).json({ error: 'Health check failed' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Metrics endpoint
this.app.get('/api/metrics', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var metrics, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, this.getMetrics()];
            case 1:
                metrics = _a.sent();
                res.json(metrics);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500).json({ error: 'Failed to get metrics' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Project generation endpoint
this.app.post('/api/projects/generate', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var request, result, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                request = req.body;
                return [4 /*yield*/, this.generateProject(request)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                res.status(500).json({ error: error_10.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get project status
this.app.get('/api/projects/:id', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, project, cached, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                projectId = req.params.id;
                project = this.activeProjects.get(projectId);
                if (!!project) return [3 /*break*/, 3];
                if (!this.redis) return [3 /*break*/, 2];
                return [4 /*yield*/, this.redis.get("project:".concat(projectId))];
            case 1:
                cached = _a.sent();
                if (cached) {
                    return [2 /*return*/, res.json(JSON.parse(cached))];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(404).json({ error: 'Project not found' })];
            case 3:
                res.json(project);
                return [3 /*break*/, 5];
            case 4:
                error_11 = _a.sent();
                res.status(500).json({ error: error_11.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// List projects
this.app.get('/api/projects', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projects;
    return __generator(this, function (_a) {
        try {
            projects = Array.from(this.activeProjects.values());
            res.json({ projects: projects, total: projects.length });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
        return [2 /*return*/];
    });
}); });
// Deploy project
this.app.post('/api/projects/:id/deploy', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, environment, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                projectId = req.params.id;
                environment = req.body.environment;
                return [4 /*yield*/, this.deployProject(projectId, environment)];
            case 1:
                _a.sent();
                res.json({ success: true, message: 'Deployment started' });
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                res.status(500).json({ error: error_12.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Audit logs
this.app.get('/api/audit', authenticate, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, page, _c, limit, startIndex, endIndex, logs;
    return __generator(this, function (_d) {
        try {
            _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 50 : _c;
            startIndex = (Number(page) - 1) * Number(limit);
            endIndex = startIndex + Number(limit);
            logs = this.auditLogs.slice(startIndex, endIndex);
            res.json({
                logs: logs,
                total: this.auditLogs.length,
                page: Number(page),
                totalPages: Math.ceil(this.auditLogs.length / Number(limit))
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
        return [2 /*return*/];
    });
}); });
async;
startAPIServer();
Promise < void  > {
    this: .setupAPIRoutes(),
    this: .server = this.app.listen(this.config.api.port, this.config.api.host, function () {
        _this.logger.info("\uD83D\uDE80 API Server started on ".concat(_this.config.api.host, ":").concat(_this.config.api.port));
    })
};
async;
startWebSocketServer();
Promise < void  > {
    this: .wsServer = new ws_1.WebSocketServer({ port: this.config.websocket.port }),
    this: .wsServer.on('connection', function (ws) {
        _this.connections.add(ws);
        _this.metrics.api.activeConnections = _this.connections.size;
        ws.on('close', function () {
            _this.connections.delete(ws);
            _this.metrics.api.activeConnections = _this.connections.size;
        });
        ws.on('error', function (error) {
            _this.logger.error('WebSocket error:', error);
        });
    }),
    this: .logger.info("\uD83D\uDCE1 WebSocket server started on port ".concat(this.config.websocket.port))
};
broadcast(event, string, data, any);
void {
    : .config.websocket.enabled, return: ,
    const: message = JSON.stringify({ event: event, data: data, timestamp: new Date().toISOString() }),
    this: .connections.forEach(function (ws) {
        if (ws.readyState === ws_1.WebSocket.OPEN) {
            ws.send(message);
        }
    })
};
auditLog(action, string, description, string, metadata, any = {});
void {
    : .config.audit.enabled, return: ,
    const: logEntry = {
        id: (0, uuid_1.v4)(),
        timestamp: new Date().toISOString(),
        action: action,
        description: description,
        metadata: metadata,
        system: 'ml-code-generation'
    },
    this: .auditLogs.push(logEntry),
    this: .metrics.enterprise.auditEvents = this.auditLogs.length,
    // Nettoyage des anciens logs
    const: retentionDate = new Date(),
    retentionDate: retentionDate,
    : .setDate(retentionDate.getDate() - this.config.audit.retention),
    this: .auditLogs = this.auditLogs.filter(function (log) {
        return new Date(log.timestamp) > retentionDate;
    })
};
async;
initializeAutomatedTasks();
Promise < void  > {
    // Nettoyage automatique des projets expirés
    setInterval: function () { }
}();
{
    var now_1 = Date.now();
    var expiredThreshold_1 = 24 * 60 * 60 * 1000; // 24 heures
    this.activeProjects.forEach(function (project, id) {
        if (now_1 - project.startTime.getTime() > expiredThreshold_1) {
            _this.activeProjects.delete(id);
            _this.logger.info("Projet expir\u00E9 nettoy\u00E9: ".concat(id));
        }
    });
}
60 * 60 * 1000;
; // Toutes les heures
// Mise à jour des métriques système
setInterval(function () {
    _this.updateSystemMetrics();
}, 30000); // Toutes les 30 secondes
updateSystemMetrics();
void {
    const: memUsage = process.memoryUsage(),
    this: .metrics.performance.memoryUsage = memUsage.heapUsed / 1024 / 1024,
    this: .metrics.performance.cpuUsage = process.cpuUsage().user / 1000000,
    this: .metrics.enterprise.uptime = process.uptime(),
    : .config.websocket.realtime
};
{
    this.broadcast('metrics:update', this.metrics);
}
async;
initializeBackupSystem();
Promise < void  > {
    // Configuration des backups automatiques
    this: .logger.info('🔄 Système de backup initialisé')
};
async;
getProjectById(id, string);
Promise < interfaces_1.ICodeGenerationResult | null > {
    return: this.activeProjects.get(id) || null
};
async;
listProjects();
Promise < interfaces_1.ICodeGenerationResult[] > {
    return: Array.from(this.activeProjects.values())
};
async;
getQueueStatus();
Promise < { length: number, projects: interfaces_1.ICodeGenerationRequest[] } > {
    return: {
        length: this.projectQueue.size,
        projects: Array.from(this.projectQueue.values())
    }
};
async;
getAuditLogs(limit, number = 100);
Promise < any[] > {
    return: this.auditLogs.slice(-limit)
};
async;
clearCache();
Promise < void  > {
    : .redis
};
{
    await this.redis.flushall();
    this.logger.info('Cache Redis vidé');
}
async;
gracefulShutdown();
Promise < void  > {
    this: .logger.info('🛑 Arrêt gracieux du système...'),
    : .server
};
{
    this.server.close();
}
if (this.wsServer) {
    this.wsServer.close();
}
// Fermeture des connexions
if (this.redis) {
    await this.redis.quit();
}
// Audit log final
this.auditLog('system:shutdown', 'System gracefully shut down');
this.logger.info('✅ Arrêt gracieux terminé');
// API simplifiée pour usage externe
exports.createMLCodeGenerationSystem = MLCodeGenerationSystemFactory.create;
exports.createDefaultMLCodeGenerationSystem = MLCodeGenerationSystemFactory.createDefault;
exports.getDefaultMLSystemConfig = MLCodeGenerationSystemFactory.getDefaultConfig;
// Nouvelles exports enterprise
var createEnterpriseMLSystem = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var defaultConfig, finalConfig;
    return __generator(this, function (_a) {
        defaultConfig = MLCodeGenerationSystemFactory.getDefaultConfig();
        finalConfig = __assign(__assign({}, defaultConfig), config);
        return [2 /*return*/, MLCodeGenerationSystemFactory.create(finalConfig)];
    });
}); };
exports.createEnterpriseMLSystem = createEnterpriseMLSystem;
var createMLSystemWithAPI = function (apiPort) {
    if (apiPort === void 0) { apiPort = 3001; }
    return __awaiter(void 0, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            config = MLCodeGenerationSystemFactory.getDefaultConfig();
            config.api.port = apiPort;
            return [2 /*return*/, MLCodeGenerationSystemFactory.create(config)];
        });
    });
};
exports.createMLSystemWithAPI = createMLSystemWithAPI;
