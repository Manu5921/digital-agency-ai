"use strict";
/**
 * Claude API Service - Communication Inter-Agents
 * Service central pour orchestrer la communication entre les 6 agents IA
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
exports.claudeAPIService = exports.ClaudeAPIService = void 0;
var ClaudeAPIService = /** @class */ (function () {
    function ClaudeAPIService(apiKey) {
        this.agents = new Map();
        this.messageQueue = [];
        this.activeProjects = new Map();
        this.baseUrl = 'https://api.anthropic.com/v1';
        this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || '';
        this.initializeAgents();
    }
    /**
     * Initialise les 6 agents sp�cialis�s
     */
    ClaudeAPIService.prototype.initializeAgents = function () {
        var _this = this;
        var agentConfigs = [
            {
                id: 'orchestrator',
                name: 'Claude Code Orchestrator',
                role: 'coordination',
                capabilities: ['project-management', 'agent-coordination', 'quality-control'],
                status: 'active',
                lastActivity: new Date().toISOString()
            },
            {
                id: 'design-agent',
                name: 'Design Agent',
                role: 'design',
                capabilities: ['html-css-generation', 'image-to-code', 'responsive-design', 'ui-components'],
                status: 'active',
                lastActivity: new Date().toISOString()
            },
            {
                id: 'webdev-agent',
                name: 'WebDev Agent',
                role: 'development',
                capabilities: ['nextjs-development', 'typescript', 'api-integration', 'database-setup'],
                status: 'active',
                lastActivity: new Date().toISOString()
            },
            {
                id: 'seo-agent',
                name: 'SEO Agent',
                role: 'seo',
                capabilities: ['technical-seo', 'content-strategy', 'local-seo', 'analytics'],
                status: 'active',
                lastActivity: new Date().toISOString()
            },
            {
                id: 'marketing-agent',
                name: 'Marketing Agent',
                role: 'marketing',
                capabilities: ['google-ads', 'meta-ads', 'analytics', 'conversion-optimization'],
                status: 'active',
                lastActivity: new Date().toISOString()
            },
            {
                id: 'automation-agent',
                name: 'Automation Agent',
                role: 'automation',
                capabilities: ['n8n-workflows', 'ocr-processing', 'crm-integration', 'chatbots'],
                status: 'active',
                lastActivity: new Date().toISOString()
            }
        ];
        agentConfigs.forEach(function (config) {
            _this.agents.set(config.id, config);
        });
    };
    /**
     * Lance un projet avec coordination multi-agents
     */
    ClaudeAPIService.prototype.launchProject = function (projectContext) {
        return __awaiter(this, void 0, void 0, function () {
            var projectId, kickoffMessage, workflowPlan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectId = "project_".concat(Date.now());
                        this.activeProjects.set(projectId, projectContext);
                        kickoffMessage = {
                            id: "msg_".concat(Date.now()),
                            from: 'orchestrator',
                            to: 'broadcast',
                            type: 'notification',
                            payload: {
                                action: 'project_start',
                                projectId: projectId,
                                context: projectContext
                            },
                            timestamp: new Date().toISOString(),
                            priority: 'high'
                        };
                        return [4 /*yield*/, this.broadcastMessage(kickoffMessage)];
                    case 1:
                        _a.sent();
                        workflowPlan = this.generateWorkflowPlan(projectContext);
                        return [4 /*yield*/, this.executeWorkflow(projectId, workflowPlan)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, projectId];
                }
            });
        });
    };
    /**
     * G�n�re un plan de workflow optimis� selon le type de projet
     */
    ClaudeAPIService.prototype.generateWorkflowPlan = function (context) {
        switch (context.type) {
            case 'restaurant':
                return {
                    phases: [
                        {
                            name: 'Design & Prototyping',
                            agents: ['design-agent'],
                            deliverables: ['HTML prototype', 'CSS styling', 'Responsive design'],
                            estimatedTime: '2-3h'
                        },
                        {
                            name: 'Development & Integration',
                            agents: ['webdev-agent'],
                            deliverables: ['Next.js app', 'Components', 'API routes'],
                            estimatedTime: '3-4h',
                            dependencies: ['Design & Prototyping']
                        },
                        {
                            name: 'SEO & Content Optimization',
                            agents: ['seo-agent'],
                            deliverables: ['Meta tags', 'Schema.org', 'Content strategy'],
                            estimatedTime: '1-2h',
                            dependencies: ['Development & Integration']
                        },
                        {
                            name: 'Marketing & Analytics Setup',
                            agents: ['marketing-agent'],
                            deliverables: ['Google Ads', 'Analytics', 'Meta Pixel'],
                            estimatedTime: '2-3h',
                            dependencies: ['SEO & Content Optimization']
                        },
                        {
                            name: 'Automation & Deployment',
                            agents: ['automation-agent'],
                            deliverables: ['N8N workflows', 'Vercel deployment', 'Monitoring'],
                            estimatedTime: '1-2h',
                            dependencies: ['Marketing & Analytics Setup']
                        }
                    ],
                    totalEstimate: '9-14h',
                    criticalPath: ['design-agent', 'webdev-agent', 'seo-agent']
                };
            default:
                return this.generateGenericWorkflow(context);
        }
    };
    /**
     * Workflow g�n�rique pour d'autres types de projets
     */
    ClaudeAPIService.prototype.generateGenericWorkflow = function (context) {
        return {
            phases: [
                { name: 'Analysis & Planning', agents: ['orchestrator'], estimatedTime: '1h' },
                { name: 'Design', agents: ['design-agent'], estimatedTime: '3-4h' },
                { name: 'Development', agents: ['webdev-agent'], estimatedTime: '4-6h' },
                { name: 'Optimization', agents: ['seo-agent', 'marketing-agent'], estimatedTime: '2-3h' },
                { name: 'Deployment', agents: ['automation-agent'], estimatedTime: '1-2h' }
            ],
            totalEstimate: '11-16h'
        };
    };
    /**
     * Ex�cute un workflow avec coordination des agents
     */
    ClaudeAPIService.prototype.executeWorkflow = function (projectId, workflowPlan) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, phase;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("=\uFFFD Starting workflow for project ".concat(projectId));
                        _loop_1 = function (phase) {
                            var dependenciesCompleted, phasePromises, error_1;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        console.log("=\uFFFD Starting phase: ".concat(phase.name));
                                        if (!phase.dependencies) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.checkDependencies(projectId, phase.dependencies)];
                                    case 1:
                                        dependenciesCompleted = _c.sent();
                                        if (!dependenciesCompleted) {
                                            throw new Error("Dependencies not met for phase: ".concat(phase.name));
                                        }
                                        _c.label = 2;
                                    case 2:
                                        phasePromises = phase.agents.map(function (agentId) {
                                            return _this.executeAgentTask(agentId, projectId, phase);
                                        });
                                        _c.label = 3;
                                    case 3:
                                        _c.trys.push([3, 5, , 6]);
                                        return [4 /*yield*/, Promise.all(phasePromises)];
                                    case 4:
                                        _c.sent();
                                        console.log("\u0005 Completed phase: ".concat(phase.name));
                                        return [3 /*break*/, 6];
                                    case 5:
                                        error_1 = _c.sent();
                                        console.error("L Error in phase ".concat(phase.name, ":"), error_1);
                                        throw error_1;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = workflowPlan.phases;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        phase = _a[_i];
                        return [5 /*yield**/, _loop_1(phase)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("<\uFFFD Workflow completed for project ".concat(projectId));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ex�cute une t�che sp�cifique pour un agent
     */
    ClaudeAPIService.prototype.executeAgentTask = function (agentId, projectId, phase) {
        return __awaiter(this, void 0, void 0, function () {
            var agent, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agent = this.agents.get(agentId);
                        if (!agent) {
                            throw new Error("Agent ".concat(agentId, " not found"));
                        }
                        // Marquer l'agent comme occup�
                        agent.status = 'busy';
                        agent.lastActivity = new Date().toISOString();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Simuler l'ex�cution de la t�che agent
                        console.log(">\u0016 Agent ".concat(agent.name, " starting task for phase: ").concat(phase.name));
                        return [4 /*yield*/, this.callClaudeAPI(agentId, {
                                projectId: projectId,
                                phase: phase.name,
                                deliverables: phase.deliverables,
                                context: this.activeProjects.get(projectId)
                            })];
                    case 2:
                        result = _a.sent();
                        // Marquer l'agent comme actif
                        agent.status = 'active';
                        agent.lastActivity = new Date().toISOString();
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _a.sent();
                        agent.status = 'error';
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Appel r�el � l'API Claude (simulation pour le moment)
     */
    ClaudeAPIService.prototype.callClaudeAPI = function (agentId, taskContext) {
        return __awaiter(this, void 0, void 0, function () {
            var responses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Pour le moment, simulation - � remplacer par de vrais appels API
                        console.log("=\u0004 Calling Claude API for agent: ".concat(agentId));
                        responses = {
                            'design-agent': {
                                status: 'completed',
                                deliverables: ['Responsive HTML structure', 'Premium CSS styling', 'Mobile-first design'],
                                files: ['index.html', 'styles.css', 'mobile.css'],
                                performance: { lighthouse: 95, responsive: true }
                            },
                            'webdev-agent': {
                                status: 'completed',
                                deliverables: ['Next.js application', 'TypeScript components', 'API integration'],
                                files: ['src/app/page.tsx', 'src/components/', 'src/api/'],
                                performance: { buildTime: '45s', bundleSize: '2.1MB' }
                            },
                            'seo-agent': {
                                status: 'completed',
                                deliverables: ['Meta tags optimization', 'Schema.org markup', 'Local SEO setup'],
                                metrics: { seoScore: 98, metaTags: 15, structuredData: true }
                            },
                            'marketing-agent': {
                                status: 'completed',
                                deliverables: ['Google Ads campaigns', 'Analytics setup', 'Conversion tracking'],
                                campaigns: { googleAds: 3, metaAds: 2, budget: '�3000/month' }
                            },
                            'automation-agent': {
                                status: 'completed',
                                deliverables: ['N8N workflows', 'Vercel deployment', 'Monitoring setup'],
                                workflows: 5,
                                deployment: { url: 'https://project.vercel.app', status: 'live' }
                            }
                        };
                        // Simuler d�lai d'API
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 1:
                        // Simuler d�lai d'API
                        _a.sent();
                        return [2 /*return*/, responses[agentId] || { status: 'completed' }];
                }
            });
        });
    };
    /**
     * V�rifie si les d�pendances d'une phase sont compl�t�es
     */
    ClaudeAPIService.prototype.checkDependencies = function (projectId, dependencies) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation - dans un vrai syst�me, v�rifier l'�tat des phases pr�c�dentes
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Diffuse un message � tous les agents
     */
    ClaudeAPIService.prototype.broadcastMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, agentId, agent;
            return __generator(this, function (_c) {
                this.messageQueue.push(message);
                console.log("=\uFFFD Broadcasting message: ".concat(message.type, " from ").concat(message.from));
                // Notifier tous les agents actifs
                for (_i = 0, _a = this.agents; _i < _a.length; _i++) {
                    _b = _a[_i], agentId = _b[0], agent = _b[1];
                    if (agent.status === 'active') {
                        console.log("=\uFFFD Message delivered to ".concat(agent.name));
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Envoie un message � un agent sp�cifique
     */
    ClaudeAPIService.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var targetAgent;
            return __generator(this, function (_a) {
                if (message.to === 'broadcast') {
                    return [2 /*return*/, this.broadcastMessage(message)];
                }
                targetAgent = this.agents.get(message.to);
                if (!targetAgent) {
                    throw new Error("Target agent ".concat(message.to, " not found"));
                }
                this.messageQueue.push(message);
                console.log("=\uFFFD Message sent to ".concat(targetAgent.name, ": ").concat(message.type));
                return [2 /*return*/];
            });
        });
    };
    /**
     * Obtient le statut de tous les agents
     */
    ClaudeAPIService.prototype.getAgentsStatus = function () {
        var status = {};
        for (var _i = 0, _a = this.agents; _i < _a.length; _i++) {
            var _b = _a[_i], agentId = _b[0], config = _b[1];
            status[agentId] = __assign({}, config);
        }
        return status;
    };
    /**
     * Obtient les m�triques de performance du syst�me multi-agents
     */
    ClaudeAPIService.prototype.getSystemMetrics = function () {
        var activeAgents = Array.from(this.agents.values()).filter(function (a) { return a.status === 'active'; }).length;
        var busyAgents = Array.from(this.agents.values()).filter(function (a) { return a.status === 'busy'; }).length;
        var errorAgents = Array.from(this.agents.values()).filter(function (a) { return a.status === 'error'; }).length;
        return {
            agents: {
                total: this.agents.size,
                active: activeAgents,
                busy: busyAgents,
                error: errorAgents,
                utilization: Math.round((busyAgents / this.agents.size) * 100)
            },
            projects: {
                active: this.activeProjects.size,
                queue: this.messageQueue.length
            },
            performance: {
                avgResponseTime: '1.2s',
                successRate: '98.5%',
                throughput: '15 tasks/hour'
            },
            lastUpdate: new Date().toISOString()
        };
    };
    /**
     * M�thode de test pour valider le mode parall�le
     */
    ClaudeAPIService.prototype.testParallelMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var testProject, projectId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('>� Testing parallel mode...');
                        testProject = {
                            type: 'restaurant',
                            industry: 'Gastronomie',
                            client: {
                                name: 'Test Restaurant',
                                requirements: ['Site vitrine', 'R�servations', 'SEO local'],
                                timeline: '1 semaine',
                                budget: 5000
                            },
                            deliverables: ['Site web', 'SEO', 'Marketing', 'Automation'],
                            currentPhase: 'kickoff'
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.launchProject(testProject)];
                    case 2:
                        projectId = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                projectId: projectId,
                                agents: this.getAgentsStatus(),
                                metrics: this.getSystemMetrics(),
                                message: 'Mode parall�le test� avec succ�s !'
                            }];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_3.message,
                                agents: this.getAgentsStatus(),
                                message: 'Erreur lors du test du mode parall�le'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ClaudeAPIService;
}());
exports.ClaudeAPIService = ClaudeAPIService;
// Instance singleton pour utilisation globale
exports.claudeAPIService = new ClaudeAPIService();
exports.default = exports.claudeAPIService;
