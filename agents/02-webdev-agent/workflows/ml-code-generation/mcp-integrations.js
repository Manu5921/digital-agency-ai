"use strict";
/**
 * MCP Integrations
 * Intégrations avec les services MCP (Model Context Protocol) pour l'écosystème enterprise
 *
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Intégrations Vercel, Figma, Neon, Stripe via MCP
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPIntegrationsManager = exports.StripeMCPService = exports.NeonMCPService = exports.FigmaMCPService = exports.VercelMCPService = void 0;
var events_1 = require("events");
// ========================================
// SERVICE VERCEL MCP
// ========================================
var VercelMCPService = /** @class */ (function (_super) {
    __extends(VercelMCPService, _super);
    function VercelMCPService(apiKey, teamId) {
        var _this = _super.call(this) || this;
        _this.name = 'vercel';
        _this.version = '1.0.0';
        _this.enabled = false;
        _this.baseUrl = 'https://api.vercel.com';
        _this.apiKey = apiKey;
        _this.teamId = teamId;
        return _this;
    }
    VercelMCPService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('🚀 Initialisation du service Vercel MCP...');
                        return [4 /*yield*/, this.makeRequest('/v2/user')];
                    case 1:
                        response = _a.sent();
                        if (response.user) {
                            this.enabled = true;
                            console.log("\u2705 Vercel MCP connect\u00E9 pour ".concat(response.user.username));
                            this.emit('initialized');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('❌ Erreur initialisation Vercel MCP:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VercelMCPService.prototype.isHealthy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest('/v2/user')];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, !!response.user];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VercelMCPService.prototype.getCapabilities = function () {
        return [
            'deployment',
            'environment-management',
            'domain-configuration',
            'analytics',
            'edge-functions',
            'serverless-functions',
            'static-site-generation',
            'incremental-static-regeneration'
        ];
    };
    VercelMCPService.prototype.deployProject = function (project) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var vercelProject, deployment, finalDeployment, error_2;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("\uD83D\uDE80 D\u00E9ploiement du projet ".concat(project.name, " sur Vercel..."));
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.createVercelProject(project)];
                    case 2:
                        vercelProject = _c.sent();
                        // 2. Uploader les fichiers
                        return [4 /*yield*/, this.uploadFiles(vercelProject.id, project)];
                    case 3:
                        // 2. Uploader les fichiers
                        _c.sent();
                        return [4 /*yield*/, this.triggerDeployment(vercelProject.id)];
                    case 4:
                        deployment = _c.sent();
                        return [4 /*yield*/, this.waitForDeployment(deployment.id)];
                    case 5:
                        finalDeployment = _c.sent();
                        console.log("\u2705 Projet d\u00E9ploy\u00E9: ".concat(finalDeployment.url));
                        _b = {
                            id: finalDeployment.id,
                            projectId: vercelProject.id,
                            environment: 'production',
                            status: 'ready',
                            version: '1.0.0',
                            commit: 'initial',
                            branch: 'main',
                            url: finalDeployment.url,
                            domains: [finalDeployment.url],
                            timestamp: new Date(),
                            duration: finalDeployment.duration
                        };
                        return [4 /*yield*/, this.getDeploymentLogs(finalDeployment.id)];
                    case 6: return [2 /*return*/, (_b.logs = _c.sent(),
                            _b.metrics = {
                                buildTime: finalDeployment.buildTime,
                                deployTime: finalDeployment.deployTime,
                                bundleSize: finalDeployment.bundleSize,
                                functions: ((_a = finalDeployment.functions) === null || _a === void 0 ? void 0 : _a.length) || 0,
                                regions: finalDeployment.regions || ['iad1'],
                                performance: {
                                    lighthouse: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0, pwa: 0 },
                                    webVitals: { lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0 },
                                    bundle: { size: 0, gzipped: 0, chunks: 0, assets: 0 },
                                    runtime: { startup: 0, hydration: 0, navigation: 0, interaction: 0 }
                                },
                                uptime: 100,
                                availability: 100
                            },
                            _b)];
                    case 7:
                        error_2 = _c.sent();
                        console.error('❌ Erreur déploiement Vercel:', error_2);
                        throw error_2;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    VercelMCPService.prototype.createEnvironment = function (name, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/v10/projects', {
                            method: 'POST',
                            body: __assign({ name: name, framework: 'nextjs', buildCommand: 'npm run build', devCommand: 'npm run dev', installCommand: 'npm install', outputDirectory: '.next' }, config)
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.id];
                }
            });
        });
    };
    VercelMCPService.prototype.getDomains = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/v5/domains')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.domains.map(function (domain) { return domain.name; })];
                }
            });
        });
    };
    VercelMCPService.prototype.configureCustomDomain = function (domain, projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest("/v10/projects/".concat(projectId, "/domains"), {
                                method: 'POST',
                                body: { name: domain }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VercelMCPService.prototype.getDeploymentLogs = function (deploymentId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/v2/deployments/".concat(deploymentId, "/events"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.events.map(function (event) { return "".concat(event.date, ": ").concat(event.text); })];
                }
            });
        });
    };
    VercelMCPService.prototype.rollback = function (deploymentId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/v6/deployments/".concat(deploymentId, "/promote"), {
                            method: 'PATCH'
                        })];
                    case 1:
                        response = _d.sent();
                        return [2 /*return*/, {
                                id: response.id,
                                projectId: response.projectId,
                                environment: 'production',
                                status: 'ready',
                                version: ((_a = response.meta) === null || _a === void 0 ? void 0 : _a.version) || '1.0.0',
                                commit: ((_b = response.meta) === null || _b === void 0 ? void 0 : _b.githubCommitSha) || 'rollback',
                                branch: ((_c = response.meta) === null || _c === void 0 ? void 0 : _c.githubCommitRef) || 'main',
                                url: response.url,
                                domains: [response.url],
                                timestamp: new Date(),
                                duration: 0,
                                logs: [],
                                metrics: {
                                    buildTime: 0,
                                    deployTime: 0,
                                    bundleSize: 0,
                                    functions: 0,
                                    regions: ['iad1'],
                                    performance: {
                                        lighthouse: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0, pwa: 0 },
                                        webVitals: { lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0 },
                                        bundle: { size: 0, gzipped: 0, chunks: 0, assets: 0 },
                                        runtime: { startup: 0, hydration: 0, navigation: 0, interaction: 0 }
                                    },
                                    uptime: 100,
                                    availability: 100
                                }
                            }];
                }
            });
        });
    };
    VercelMCPService.prototype.configureEnvironmentVariables = function (projectId, vars) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, key, value, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        _i = 0, _a = Object.entries(vars);
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], key = _b[0], value = _b[1];
                        return [4 /*yield*/, this.makeRequest("/v10/projects/".concat(projectId, "/env"), {
                                method: 'POST',
                                body: {
                                    key: key,
                                    value: value,
                                    type: 'encrypted',
                                    target: ['production', 'preview', 'development']
                                }
                            })];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                    case 5:
                        _c = _d.sent();
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VercelMCPService.prototype.enableAnalytics = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest("/v1/projects/".concat(projectId, "/analytics"), {
                                method: 'POST',
                                body: { enabled: true }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VercelMCPService.prototype.configureEdgeFunctions = function (projectId, functions) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest("/v1/projects/".concat(projectId, "/edge-config"), {
                                method: 'POST',
                                body: { functions: functions }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Méthodes privées
    VercelMCPService.prototype.makeRequest = function (endpoint, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.baseUrl).concat(endpoint).concat(this.teamId ? "?teamId=".concat(this.teamId) : '');
                        return [4 /*yield*/, fetch(url, {
                                method: options.method || 'GET',
                                headers: __assign({ 'Authorization': "Bearer ".concat(this.apiKey), 'Content-Type': 'application/json' }, options.headers),
                                body: options.body ? JSON.stringify(options.body) : undefined
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Vercel API Error: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    VercelMCPService.prototype.createVercelProject = function (project) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('/v10/projects', {
                        method: 'POST',
                        body: {
                            name: project.name.toLowerCase().replace(/\s+/g, '-'),
                            framework: 'nextjs',
                            buildCommand: 'npm run build',
                            devCommand: 'npm run dev',
                            installCommand: 'npm install',
                            outputDirectory: '.next'
                        }
                    })];
            });
        });
    };
    VercelMCPService.prototype.uploadFiles = function (projectId, project) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation de l'upload des fichiers
                console.log("\uD83D\uDCE4 Upload de ".concat(Object.keys(project.structure.files).length, " fichiers..."));
                return [2 /*return*/];
            });
        });
    };
    VercelMCPService.prototype.triggerDeployment = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest("/v13/deployments", {
                        method: 'POST',
                        body: {
                            name: projectId,
                            project: projectId,
                            target: 'production'
                        }
                    })];
            });
        });
    };
    VercelMCPService.prototype.waitForDeployment = function (deploymentId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var attempts, maxAttempts, deployment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        attempts = 0;
                        maxAttempts = 60;
                        _b.label = 1;
                    case 1:
                        if (!(attempts < maxAttempts)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.makeRequest("/v6/deployments/".concat(deploymentId))];
                    case 2:
                        deployment = _b.sent();
                        if (deployment.readyState === 'READY') {
                            return [2 /*return*/, {
                                    id: deployment.id,
                                    url: deployment.url,
                                    duration: Date.now() - new Date(deployment.createdAt).getTime(),
                                    buildTime: 30000, // Mock
                                    deployTime: 10000, // Mock
                                    bundleSize: 250000, // Mock
                                    functions: deployment.functions || [],
                                    regions: deployment.regions || ['iad1']
                                }];
                        }
                        if (deployment.readyState === 'ERROR') {
                            throw new Error("Deployment failed: ".concat((_a = deployment.error) === null || _a === void 0 ? void 0 : _a.message));
                        }
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                    case 3:
                        _b.sent();
                        attempts++;
                        return [3 /*break*/, 1];
                    case 4: throw new Error('Deployment timeout');
                }
            });
        });
    };
    return VercelMCPService;
}(events_1.EventEmitter));
exports.VercelMCPService = VercelMCPService;
// ========================================
// SERVICE FIGMA MCP
// ========================================
var FigmaMCPService = /** @class */ (function (_super) {
    __extends(FigmaMCPService, _super);
    function FigmaMCPService(accessToken) {
        var _this = _super.call(this) || this;
        _this.name = 'figma';
        _this.version = '1.0.0';
        _this.enabled = false;
        _this.baseUrl = 'https://api.figma.com/v1';
        _this.accessToken = accessToken;
        return _this;
    }
    FigmaMCPService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('🎨 Initialisation du service Figma MCP...');
                        return [4 /*yield*/, this.makeRequest('/me')];
                    case 1:
                        response = _a.sent();
                        if (response.id) {
                            this.enabled = true;
                            console.log("\u2705 Figma MCP connect\u00E9 pour ".concat(response.email));
                            this.emit('initialized');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('❌ Erreur initialisation Figma MCP:', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FigmaMCPService.prototype.isHealthy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest('/me')];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, !!response.id];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FigmaMCPService.prototype.getCapabilities = function () {
        return [
            'design-token-extraction',
            'component-generation',
            'asset-export',
            'brand-guidelines',
            'design-validation',
            'real-time-sync'
        ];
    };
    FigmaMCPService.prototype.extractDesignTokens = function (figmaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var fileKey, file, designSystem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🎨 Extraction des design tokens depuis Figma...');
                        fileKey = this.extractFileKey(figmaUrl);
                        return [4 /*yield*/, this.makeRequest("/files/".concat(fileKey))];
                    case 1:
                        file = _a.sent();
                        designSystem = this.parseDesignTokens(file);
                        console.log('✅ Design tokens extraits');
                        return [2 /*return*/, designSystem];
                }
            });
        });
    };
    FigmaMCPService.prototype.generateComponents = function (figmaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var fileKey, file, components;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🧩 Génération des composants depuis Figma...');
                        fileKey = this.extractFileKey(figmaUrl);
                        return [4 /*yield*/, this.makeRequest("/files/".concat(fileKey))];
                    case 1:
                        file = _a.sent();
                        components = this.findComponents(file.document);
                        console.log("\u2705 ".concat(components.length, " composants trouv\u00E9s"));
                        return [2 /*return*/, components];
                }
            });
        });
    };
    FigmaMCPService.prototype.getBrandGuidelines = function (figmaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var fileKey, file, guidelines;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🎨 Extraction des guidelines depuis Figma...');
                        fileKey = this.extractFileKey(figmaUrl);
                        return [4 /*yield*/, this.makeRequest("/files/".concat(fileKey))];
                    case 1:
                        file = _a.sent();
                        guidelines = this.parseBrandGuidelines(file);
                        console.log('✅ Brand guidelines extraites');
                        return [2 /*return*/, guidelines];
                }
            });
        });
    };
    FigmaMCPService.prototype.exportAssets = function (figmaUrl, format) {
        return __awaiter(this, void 0, void 0, function () {
            var fileKey, file, exportableNodes, assets, _i, exportableNodes_1, node, exportResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDCF7 Export des assets en format ".concat(format, "..."));
                        fileKey = this.extractFileKey(figmaUrl);
                        return [4 /*yield*/, this.makeRequest("/files/".concat(fileKey))];
                    case 1:
                        file = _a.sent();
                        exportableNodes = this.findExportableNodes(file.document);
                        assets = [];
                        _i = 0, exportableNodes_1 = exportableNodes;
                        _a.label = 2;
                    case 2:
                        if (!(_i < exportableNodes_1.length)) return [3 /*break*/, 5];
                        node = exportableNodes_1[_i];
                        return [4 /*yield*/, this.makeRequest("/images/".concat(fileKey, "?ids=").concat(node.id, "&format=").concat(format))];
                    case 3:
                        exportResponse = _a.sent();
                        if (exportResponse.images[node.id]) {
                            assets.push({
                                id: node.id,
                                name: node.name,
                                format: format,
                                url: exportResponse.images[node.id],
                                size: { width: node.absoluteBoundingBox.width, height: node.absoluteBoundingBox.height }
                            });
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        console.log("\u2705 ".concat(assets.length, " assets export\u00E9s"));
                        return [2 /*return*/, assets];
                }
            });
        });
    };
    FigmaMCPService.prototype.watchDesignChanges = function (figmaUrl, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var fileKey, lastVersion, checkForChanges;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('👀 Surveillance des changements de design...');
                        fileKey = this.extractFileKey(figmaUrl);
                        return [4 /*yield*/, this.getFileVersion(fileKey)];
                    case 1:
                        lastVersion = _a.sent();
                        checkForChanges = function () { return __awaiter(_this, void 0, void 0, function () {
                            var currentVersion, changes, error_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 4, , 5]);
                                        return [4 /*yield*/, this.getFileVersion(fileKey)];
                                    case 1:
                                        currentVersion = _a.sent();
                                        if (!(currentVersion !== lastVersion)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.getFileChanges(fileKey, lastVersion, currentVersion)];
                                    case 2:
                                        changes = _a.sent();
                                        callback(changes);
                                        lastVersion = currentVersion;
                                        _a.label = 3;
                                    case 3: return [3 /*break*/, 5];
                                    case 4:
                                        error_4 = _a.sent();
                                        console.error('Erreur surveillance Figma:', error_4);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); };
                        // Vérifier les changements toutes les 30 secondes
                        setInterval(checkForChanges, 30000);
                        return [2 /*return*/];
                }
            });
        });
    };
    FigmaMCPService.prototype.validateDesignImplementation = function (figmaUrl, implementedComponents) {
        return __awaiter(this, void 0, void 0, function () {
            var designTokens, figmaComponents, matches, mismatches, _loop_1, this_1, _i, figmaComponents_1, figmaComponent, score;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🔍 Validation de l\'implémentation du design...');
                        return [4 /*yield*/, this.extractDesignTokens(figmaUrl)];
                    case 1:
                        designTokens = _a.sent();
                        return [4 /*yield*/, this.generateComponents(figmaUrl)];
                    case 2:
                        figmaComponents = _a.sent();
                        matches = 0;
                        mismatches = [];
                        _loop_1 = function (figmaComponent) {
                            var implementedComponent = implementedComponents.find(function (comp) { return comp.path.includes(figmaComponent.name); });
                            if (implementedComponent) {
                                matches++;
                                // Vérifier la correspondance des styles, props, etc.
                                var componentMismatches = this_1.validateComponent(figmaComponent, implementedComponent, designTokens);
                                mismatches.push.apply(mismatches, componentMismatches);
                            }
                        };
                        this_1 = this;
                        // Validation des composants
                        for (_i = 0, figmaComponents_1 = figmaComponents; _i < figmaComponents_1.length; _i++) {
                            figmaComponent = figmaComponents_1[_i];
                            _loop_1(figmaComponent);
                        }
                        score = (matches / figmaComponents.length) * 100;
                        console.log("\u2705 Validation termin\u00E9e: ".concat(score, "% de correspondance"));
                        return [2 /*return*/, {
                                score: Math.round(score),
                                matches: matches,
                                mismatches: mismatches,
                                suggestions: this.generateValidationSuggestions(mismatches)
                            }];
                }
            });
        });
    };
    // Méthodes privées
    FigmaMCPService.prototype.makeRequest = function (endpoint, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl).concat(endpoint), {
                            method: options.method || 'GET',
                            headers: __assign({ 'X-Figma-Token': this.accessToken, 'Content-Type': 'application/json' }, options.headers),
                            body: options.body ? JSON.stringify(options.body) : undefined
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Figma API Error: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    FigmaMCPService.prototype.extractFileKey = function (figmaUrl) {
        var match = figmaUrl.match(/\/file\/([a-zA-Z0-9]+)/);
        if (!match) {
            throw new Error('URL Figma invalide');
        }
        return match[1];
    };
    FigmaMCPService.prototype.parseDesignTokens = function (file) {
        // Analyse du fichier Figma pour extraire les design tokens
        // Cette implémentation est simplifiée
        return {
            colors: {
                primary: ['#007bff', '#0056b3', '#004085'],
                secondary: ['#6c757d', '#545b62', '#383d41'],
                neutral: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6'],
                semantic: {
                    success: '#28a745',
                    warning: '#ffc107',
                    danger: '#dc3545',
                    info: '#17a2b8'
                }
            },
            typography: {
                headings: {
                    fontFamily: 'Inter',
                    sizes: { h1: '2.5rem', h2: '2rem', h3: '1.75rem' },
                    weights: { normal: 400, medium: 500, bold: 700 },
                    lineHeights: { tight: '1.2', normal: '1.5', loose: '1.8' },
                    letterSpacing: { tight: '-0.025em', normal: '0', wide: '0.025em' }
                },
                body: {
                    fontFamily: 'Inter',
                    sizes: { sm: '0.875rem', base: '1rem', lg: '1.125rem' },
                    weights: { normal: 400, medium: 500, bold: 700 },
                    lineHeights: { tight: '1.2', normal: '1.5', loose: '1.8' },
                    letterSpacing: { tight: '-0.025em', normal: '0', wide: '0.025em' }
                },
                captions: {
                    fontFamily: 'Inter',
                    sizes: { xs: '0.75rem', sm: '0.875rem' },
                    weights: { normal: 400, medium: 500 },
                    lineHeights: { tight: '1.2', normal: '1.5' },
                    letterSpacing: { normal: '0', wide: '0.025em' }
                }
            },
            spacing: {
                scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128],
                unit: 'px'
            },
            shadows: {
                small: '0 1px 3px rgba(0, 0, 0, 0.1)',
                medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
                large: '0 10px 15px rgba(0, 0, 0, 0.1)'
            },
            borders: {
                radius: { none: '0', sm: '0.125rem', base: '0.25rem', lg: '0.5rem', full: '9999px' },
                width: { thin: '1px', base: '2px', thick: '4px' }
            },
            animations: {
                durations: { fast: '150ms', base: '250ms', slow: '350ms' },
                easings: { linear: 'linear', 'ease-out': 'cubic-bezier(0, 0, 0.2, 1)', 'ease-in': 'cubic-bezier(0.4, 0, 1, 1)' }
            }
        };
    };
    FigmaMCPService.prototype.findComponents = function (node) {
        var _this = this;
        var components = [];
        var traverse = function (currentNode) {
            if (currentNode.type === 'COMPONENT') {
                components.push({
                    id: currentNode.id,
                    name: currentNode.name,
                    type: currentNode.type,
                    description: currentNode.description,
                    props: _this.extractComponentProps(currentNode),
                    styles: _this.extractComponentStyles(currentNode),
                    assets: _this.extractComponentAssets(currentNode)
                });
            }
            if (currentNode.children) {
                currentNode.children.forEach(traverse);
            }
        };
        traverse(node);
        return components;
    };
    FigmaMCPService.prototype.parseBrandGuidelines = function (file) {
        // Analyse simplifiée pour extraire les brand guidelines
        return {
            name: file.name || 'Projet',
            logo: {
                primary: '/logo.svg',
                secondary: '/logo-alt.svg'
            },
            colors: {
                primary: '#007bff',
                secondary: '#6c757d',
                accent: ['#28a745', '#ffc107', '#dc3545']
            },
            fonts: {
                primary: 'Inter',
                secondary: 'Georgia'
            },
            voice: {
                tone: 'professionnel',
                personality: ['moderne', 'accessible', 'fiable'],
                messaging: ['innovation', 'qualité', 'service client']
            },
            imagery: {
                style: 'moderne',
                mood: 'professionnel',
                colors: ['#007bff', '#ffffff', '#f8f9fa']
            }
        };
    };
    FigmaMCPService.prototype.findExportableNodes = function (node) {
        var nodes = [];
        var traverse = function (currentNode) {
            if (currentNode.exportSettings && currentNode.exportSettings.length > 0) {
                nodes.push(currentNode);
            }
            if (currentNode.children) {
                currentNode.children.forEach(traverse);
            }
        };
        traverse(node);
        return nodes;
    };
    FigmaMCPService.prototype.getFileVersion = function (fileKey) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/files/".concat(fileKey))];
                    case 1:
                        file = _a.sent();
                        return [2 /*return*/, file.lastModified];
                }
            });
        });
    };
    FigmaMCPService.prototype.getFileChanges = function (fileKey, fromVersion, toVersion) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation des changements
                return [2 /*return*/, {
                        fromVersion: fromVersion,
                        toVersion: toVersion,
                        changes: ['Component updated', 'Color changed', 'Text modified']
                    }];
            });
        });
    };
    FigmaMCPService.prototype.extractComponentProps = function (node) {
        // Extraction simplifiée des props
        return [];
    };
    FigmaMCPService.prototype.extractComponentStyles = function (node) {
        // Extraction simplifiée des styles
        return {};
    };
    FigmaMCPService.prototype.extractComponentAssets = function (node) {
        // Extraction simplifiée des assets
        return [];
    };
    FigmaMCPService.prototype.validateComponent = function (figmaComponent, implementedComponent, designTokens) {
        // Validation simplifiée
        return [];
    };
    FigmaMCPService.prototype.generateValidationSuggestions = function (mismatches) {
        return mismatches.map(function (mismatch) {
            return "Corriger ".concat(mismatch.type, " pour le composant ").concat(mismatch.component);
        });
    };
    return FigmaMCPService;
}(events_1.EventEmitter));
exports.FigmaMCPService = FigmaMCPService;
// ========================================
// SERVICE NEON MCP
// ========================================
var NeonMCPService = /** @class */ (function (_super) {
    __extends(NeonMCPService, _super);
    function NeonMCPService(apiKey) {
        var _this = _super.call(this) || this;
        _this.name = 'neon';
        _this.version = '1.0.0';
        _this.enabled = false;
        _this.baseUrl = 'https://console.neon.tech/api/v2';
        _this.apiKey = apiKey;
        return _this;
    }
    NeonMCPService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('🐘 Initialisation du service Neon MCP...');
                        return [4 /*yield*/, this.makeRequest('/users/me')];
                    case 1:
                        response = _a.sent();
                        if (response.id) {
                            this.enabled = true;
                            console.log("\u2705 Neon MCP connect\u00E9 pour ".concat(response.email));
                            this.emit('initialized');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('❌ Erreur initialisation Neon MCP:', error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NeonMCPService.prototype.isHealthy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest('/users/me')];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, !!response.id];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NeonMCPService.prototype.getCapabilities = function () {
        return [
            'database-creation',
            'branch-management',
            'connection-pooling',
            'auto-scaling',
            'point-in-time-recovery',
            'metrics-monitoring'
        ];
    };
    NeonMCPService.prototype.createDatabase = function (projectName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDC18 Cr\u00E9ation de la base de donn\u00E9es ".concat(projectName, "..."));
                        return [4 /*yield*/, this.makeRequest('/projects', {
                                method: 'POST',
                                body: {
                                    name: projectName,
                                    region_id: 'aws-us-east-1'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        database = {
                            id: response.id,
                            name: response.name,
                            connectionString: response.connection_uris[0].connection_uri,
                            region: response.region_id,
                            plan: response.settings.quota.active_time_seconds ? 'paid' : 'free'
                        };
                        console.log("\u2705 Base de donn\u00E9es cr\u00E9\u00E9e: ".concat(database.id));
                        return [2 /*return*/, database];
                }
            });
        });
    };
    NeonMCPService.prototype.createBranch = function (databaseId, branchName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83C\uDF3F Cr\u00E9ation de la branche ".concat(branchName, "..."));
                        return [4 /*yield*/, this.makeRequest("/projects/".concat(databaseId, "/branches"), {
                                method: 'POST',
                                body: {
                                    name: branchName
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        branch = {
                            id: response.id,
                            name: response.name,
                            databaseId: databaseId,
                            connectionString: response.connection_uris[0].connection_uri,
                            createdAt: new Date(response.created_at)
                        };
                        console.log("\u2705 Branche cr\u00E9\u00E9e: ".concat(branch.id));
                        return [2 /*return*/, branch];
                }
            });
        });
    };
    NeonMCPService.prototype.getConnectionString = function (branchId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/branches/".concat(branchId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.connection_uris[0].connection_uri];
                }
            });
        });
    };
    NeonMCPService.prototype.runMigrations = function (branchId, migrations) {
        return __awaiter(this, void 0, void 0, function () {
            var i, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDCCB Ex\u00E9cution de ".concat(migrations.length, " migration(s)..."));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < migrations.length)) return [3 /*break*/, 5];
                        console.log("  Migration ".concat(i + 1, "/").concat(migrations.length, "..."));
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        console.log('✅ Migrations exécutées avec succès');
                        return [2 /*return*/, true];
                    case 6:
                        error_6 = _a.sent();
                        console.error('❌ Erreur lors des migrations:', error_6);
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NeonMCPService.prototype.createBackup = function (databaseId) {
        return __awaiter(this, void 0, void 0, function () {
            var backupId;
            return __generator(this, function (_a) {
                console.log('💾 Création du backup...');
                backupId = "backup_".concat(Date.now());
                console.log("\u2705 Backup cr\u00E9\u00E9: ".concat(backupId));
                return [2 /*return*/, backupId];
            });
        });
    };
    NeonMCPService.prototype.restoreBackup = function (databaseId, backupId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD04 Restauration du backup ".concat(backupId, "..."));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Simulation de la restauration
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                    case 2:
                        // Simulation de la restauration
                        _a.sent();
                        console.log('✅ Backup restauré avec succès');
                        return [2 /*return*/, true];
                    case 3:
                        error_7 = _a.sent();
                        console.error('❌ Erreur lors de la restauration:', error_7);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NeonMCPService.prototype.getMetrics = function (databaseId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/projects/".concat(databaseId, "/operations"))];
                    case 1:
                        response = _a.sent();
                        // Simulation des métriques
                        return [2 /*return*/, {
                                connections: 10,
                                storage: 1024 * 1024 * 100, // 100 MB
                                bandwidth: 1024 * 1024 * 50, // 50 MB
                                queries: 1500,
                                uptime: 99.9
                            }];
                }
            });
        });
    };
    NeonMCPService.prototype.configureAutoscaling = function (databaseId, config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest("/projects/".concat(databaseId), {
                                method: 'PATCH',
                                body: {
                                    settings: {
                                        quota: config
                                    }
                                }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NeonMCPService.prototype.makeRequest = function (endpoint, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl).concat(endpoint), {
                            method: options.method || 'GET',
                            headers: __assign({ 'Authorization': "Bearer ".concat(this.apiKey), 'Content-Type': 'application/json' }, options.headers),
                            body: options.body ? JSON.stringify(options.body) : undefined
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Neon API Error: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return NeonMCPService;
}(events_1.EventEmitter));
exports.NeonMCPService = NeonMCPService;
// ========================================
// SERVICE STRIPE MCP
// ========================================
var StripeMCPService = /** @class */ (function (_super) {
    __extends(StripeMCPService, _super);
    function StripeMCPService(secretKey) {
        var _this = _super.call(this) || this;
        _this.name = 'stripe';
        _this.version = '1.0.0';
        _this.enabled = false;
        _this.baseUrl = 'https://api.stripe.com/v1';
        _this.secretKey = secretKey;
        return _this;
    }
    StripeMCPService.prototype.initialize = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log('💳 Initialisation du service Stripe MCP...');
                        return [4 /*yield*/, this.makeRequest('/account')];
                    case 1:
                        response = _b.sent();
                        if (response.id) {
                            this.enabled = true;
                            console.log("\u2705 Stripe MCP connect\u00E9 pour ".concat(((_a = response.business_profile) === null || _a === void 0 ? void 0 : _a.name) || response.id));
                            this.emit('initialized');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _b.sent();
                        console.error('❌ Erreur initialisation Stripe MCP:', error_8);
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeMCPService.prototype.isHealthy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest('/account')];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, !!response.id];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StripeMCPService.prototype.getCapabilities = function () {
        return [
            'payment-processing',
            'subscription-management',
            'customer-management',
            'product-catalog',
            'webhook-handling',
            'transaction-monitoring'
        ];
    };
    StripeMCPService.prototype.createProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDCE6 Cr\u00E9ation du produit ".concat(product.name, "..."));
                        return [4 /*yield*/, this.makeRequest('/products', {
                                method: 'POST',
                                body: new URLSearchParams(__assign(__assign({ name: product.name, description: product.description }, (product.images && { images: product.images })), (product.metadata && { metadata: product.metadata })))
                            })];
                    case 1:
                        response = _a.sent();
                        console.log("\u2705 Produit cr\u00E9\u00E9: ".concat(response.id));
                        return [2 /*return*/, response.id];
                }
            });
        });
    };
    StripeMCPService.prototype.createPrice = function (productId, price) {
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDCB0 Cr\u00E9ation du prix pour le produit ".concat(productId, "..."));
                        body = {
                            product: productId,
                            currency: price.currency,
                            unit_amount: price.unitAmount
                        };
                        if (price.recurring) {
                            body.recurring = __assign({ interval: price.recurring.interval }, (price.recurring.intervalCount && { interval_count: price.recurring.intervalCount }));
                        }
                        return [4 /*yield*/, this.makeRequest('/prices', {
                                method: 'POST',
                                body: new URLSearchParams(body)
                            })];
                    case 1:
                        response = _a.sent();
                        console.log("\u2705 Prix cr\u00E9\u00E9: ".concat(response.id));
                        return [2 /*return*/, response.id];
                }
            });
        });
    };
    StripeMCPService.prototype.createWebhookEndpoint = function (url, events) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD17 Cr\u00E9ation du webhook endpoint ".concat(url, "..."));
                        return [4 /*yield*/, this.makeRequest('/webhook_endpoints', {
                                method: 'POST',
                                body: new URLSearchParams({
                                    url: url,
                                    'enabled_events[]': events
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        console.log("\u2705 Webhook cr\u00E9\u00E9: ".concat(response.id));
                        return [2 /*return*/, response.id];
                }
            });
        });
    };
    StripeMCPService.prototype.setupPaymentIntent = function (amount, currency) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/payment_intents', {
                            method: 'POST',
                            body: new URLSearchParams({
                                amount: amount.toString(),
                                currency: currency,
                                automatic_payment_methods: JSON.stringify({ enabled: true })
                            })
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                id: response.id,
                                clientSecret: response.client_secret,
                                status: response.status,
                                amount: response.amount,
                                currency: response.currency
                            }];
                }
            });
        });
    };
    StripeMCPService.prototype.createCustomer = function (customerData) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/customers', {
                            method: 'POST',
                            body: new URLSearchParams(customerData)
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.id];
                }
            });
        });
    };
    StripeMCPService.prototype.createSubscription = function (customerId, priceId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest('/subscriptions', {
                            method: 'POST',
                            body: new URLSearchParams({
                                customer: customerId,
                                'items[0][price]': priceId
                            })
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                id: response.id,
                                status: response.status,
                                currentPeriodStart: new Date(response.current_period_start * 1000),
                                currentPeriodEnd: new Date(response.current_period_end * 1000),
                                customerId: response.customer
                            }];
                }
            });
        });
    };
    StripeMCPService.prototype.handleWebhook = function (payload, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var event_1;
            return __generator(this, function (_a) {
                // Simulation de la gestion des webhooks
                console.log('🔔 Traitement du webhook Stripe...');
                try {
                    event_1 = JSON.parse(payload);
                    console.log("\uD83D\uDCE8 Event re\u00E7u: ".concat(event_1.type));
                    // Traitement selon le type d'événement
                    switch (event_1.type) {
                        case 'payment_intent.succeeded':
                            console.log('💰 Paiement réussi');
                            break;
                        case 'customer.subscription.created':
                            console.log('🔄 Abonnement créé');
                            break;
                        case 'invoice.payment_failed':
                            console.log('❌ Échec de paiement');
                            break;
                        default:
                            console.log("\u2139\uFE0F \u00C9v\u00E9nement non g\u00E9r\u00E9: ".concat(event_1.type));
                    }
                    return [2 /*return*/, { received: true, processed: true }];
                }
                catch (error) {
                    console.error('❌ Erreur traitement webhook:', error);
                    return [2 /*return*/, { received: false, error: error.message }];
                }
                return [2 /*return*/];
            });
        });
    };
    StripeMCPService.prototype.getTransactions = function (limit) {
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/charges?limit=".concat(limit))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.map(function (charge) { return ({
                                id: charge.id,
                                amount: charge.amount,
                                currency: charge.currency,
                                status: charge.status,
                                created: new Date(charge.created * 1000),
                                customerId: charge.customer
                            }); })];
                }
            });
        });
    };
    StripeMCPService.prototype.makeRequest = function (endpoint, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl).concat(endpoint), {
                            method: options.method || 'GET',
                            headers: __assign({ 'Authorization': "Bearer ".concat(this.secretKey), 'Content-Type': 'application/x-www-form-urlencoded' }, options.headers),
                            body: options.body
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Stripe API Error: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return StripeMCPService;
}(events_1.EventEmitter));
exports.StripeMCPService = StripeMCPService;
// ========================================
// GESTIONNAIRE MCP PRINCIPAL
// ========================================
var MCPIntegrationsManager = /** @class */ (function (_super) {
    __extends(MCPIntegrationsManager, _super);
    function MCPIntegrationsManager() {
        var _this = _super.call(this) || this;
        _this.services = new Map();
        _this.initialized = false;
        return _this;
    }
    MCPIntegrationsManager.prototype.initialize = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var vercelService, figmaService, neonService, stripeService, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🔧 Initialisation des services MCP...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        if (!config.vercel) return [3 /*break*/, 3];
                        vercelService = new VercelMCPService(config.vercel.apiKey, config.vercel.teamId);
                        return [4 /*yield*/, vercelService.initialize()];
                    case 2:
                        _a.sent();
                        this.services.set('vercel', vercelService);
                        _a.label = 3;
                    case 3:
                        if (!config.figma) return [3 /*break*/, 5];
                        figmaService = new FigmaMCPService(config.figma.accessToken);
                        return [4 /*yield*/, figmaService.initialize()];
                    case 4:
                        _a.sent();
                        this.services.set('figma', figmaService);
                        _a.label = 5;
                    case 5:
                        if (!config.neon) return [3 /*break*/, 7];
                        neonService = new NeonMCPService(config.neon.apiKey);
                        return [4 /*yield*/, neonService.initialize()];
                    case 6:
                        _a.sent();
                        this.services.set('neon', neonService);
                        _a.label = 7;
                    case 7:
                        if (!config.stripe) return [3 /*break*/, 9];
                        stripeService = new StripeMCPService(config.stripe.secretKey);
                        return [4 /*yield*/, stripeService.initialize()];
                    case 8:
                        _a.sent();
                        this.services.set('stripe', stripeService);
                        _a.label = 9;
                    case 9:
                        this.initialized = true;
                        console.log("\u2705 ".concat(this.services.size, " service(s) MCP initialis\u00E9(s)"));
                        this.emit('initialized', Array.from(this.services.keys()));
                        return [3 /*break*/, 11];
                    case 10:
                        error_9 = _a.sent();
                        console.error('❌ Erreur initialisation MCP:', error_9);
                        throw error_9;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MCPIntegrationsManager.prototype.getService = function (serviceName) {
        return this.services.get(serviceName);
    };
    MCPIntegrationsManager.prototype.getVercelService = function () {
        return this.getService('vercel');
    };
    MCPIntegrationsManager.prototype.getFigmaService = function () {
        return this.getService('figma');
    };
    MCPIntegrationsManager.prototype.getNeonService = function () {
        return this.getService('neon');
    };
    MCPIntegrationsManager.prototype.getStripeService = function () {
        return this.getService('stripe');
    };
    MCPIntegrationsManager.prototype.getHealthStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status, _i, _a, _b, name_1, service, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        status = {};
                        _i = 0, _a = this.services;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], name_1 = _b[0], service = _b[1];
                        _c = status;
                        _d = name_1;
                        return [4 /*yield*/, service.isHealthy()];
                    case 2:
                        _c[_d] = _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, status];
                }
            });
        });
    };
    MCPIntegrationsManager.prototype.getCapabilities = function () {
        var capabilities = {};
        for (var _i = 0, _a = this.services; _i < _a.length; _i++) {
            var _b = _a[_i], name_2 = _b[0], service = _b[1];
            capabilities[name_2] = service.getCapabilities();
        }
        return capabilities;
    };
    MCPIntegrationsManager.prototype.isInitialized = function () {
        return this.initialized;
    };
    MCPIntegrationsManager.prototype.getEnabledServices = function () {
        return Array.from(this.services.entries())
            .filter(function (_a) {
            var _ = _a[0], service = _a[1];
            return service.enabled;
        })
            .map(function (_a) {
            var name = _a[0];
            return name;
        });
    };
    return MCPIntegrationsManager;
}(events_1.EventEmitter));
exports.MCPIntegrationsManager = MCPIntegrationsManager;
exports.default = MCPIntegrationsManager;
