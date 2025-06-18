"use strict";
/**
 * Master Orchestrator - Digital Agency AI Central Command
 * Coordinateur central pour tous les agents IA sp�cialis�s
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
exports.masterOrchestrator = exports.MasterOrchestrator = void 0;
var events_1 = require("events");
var MasterOrchestrator = /** @class */ (function (_super) {
    __extends(MasterOrchestrator, _super);
    function MasterOrchestrator(config) {
        var _this = _super.call(this) || this;
        _this.agents = new Map();
        _this.projects = new Map();
        _this.tasks = new Map();
        _this.workflows = new Map();
        _this.isRunning = false;
        _this.taskQueue = [];
        _this.activeExecutions = new Map();
        _this.config = __assign({ maxConcurrentAgents: 6, timeoutMs: 300000, retryAttempts: 3, priorityLevels: ['critical', 'high', 'medium', 'low'], resourceLimits: {
                memory: 8192, // 8GB
                cpu: 80, // 80%
                concurrent: 10,
                apiCallsPerMinute: 60
            } }, config);
        _this.initializeAgents();
        _this.setupWorkflows();
        return _this;
    }
    /**
     * Initialise tous les agents sp�cialis�s
     */
    MasterOrchestrator.prototype.initializeAgents = function () {
        var _this = this;
        var agentDefinitions = [
            {
                id: 'design-agent',
                name: 'Design Specialist',
                capabilities: ['html-css', 'responsive-design', 'ui-components', 'prototyping', 'design-systems']
            },
            {
                id: 'webdev-agent',
                name: 'Web Development Specialist',
                capabilities: ['nextjs', 'typescript', 'react', 'api-development', 'database-integration']
            },
            {
                id: 'seo-agent',
                name: 'SEO Specialist',
                capabilities: ['technical-seo', 'content-strategy', 'local-seo', 'analytics', 'schema-markup']
            },
            {
                id: 'marketing-agent',
                name: 'Marketing Specialist',
                capabilities: ['google-ads', 'meta-ads', 'analytics', 'conversion-optimization', 'email-marketing']
            },
            {
                id: 'techops-agent',
                name: 'TechOps Specialist',
                capabilities: ['deployment', 'vercel', 'monitoring', 'performance', 'security']
            },
            {
                id: 'automation-agent',
                name: 'Automation Specialist',
                capabilities: ['n8n-workflows', 'ocr', 'crm-integration', 'chatbots', 'process-automation']
            }
        ];
        agentDefinitions.forEach(function (def) {
            _this.agents.set(def.id, {
                id: def.id,
                name: def.name,
                status: 'available',
                capabilities: def.capabilities,
                performance: {
                    tasksCompleted: 0,
                    averageTime: 0,
                    successRate: 100,
                    qualityScore: 85,
                    efficiency: 80
                },
                resources: {
                    memory: 0,
                    cpu: 0,
                    apiCalls: 0,
                    concurrent: 0
                },
                lastSeen: new Date().toISOString()
            });
        });
        this.emit('agents-initialized', { count: this.agents.size });
    };
    /**
     * Configure les workflows par type de projet
     */
    MasterOrchestrator.prototype.setupWorkflows = function () {
        // Workflow Restaurant (optimis� pour parall�lisation)
        this.workflows.set('restaurant', {
            id: 'restaurant',
            name: 'Restaurant Digital Package',
            description: 'Workflow complet pour restaurants avec parall�lisation optimis�e',
            phases: [
                {
                    id: 'phase-1',
                    name: 'Analysis & Design',
                    parallel: false,
                    tasks: [
                        { agentId: 'design-agent', type: 'prototype', estimatedHours: 3, priority: 1 }
                    ]
                },
                {
                    id: 'phase-2',
                    name: 'Development & Foundation',
                    parallel: false,
                    dependencies: ['phase-1'],
                    tasks: [
                        { agentId: 'webdev-agent', type: 'nextjs-app', estimatedHours: 4, priority: 1 }
                    ]
                },
                {
                    id: 'phase-3',
                    name: 'Optimization & Marketing',
                    parallel: true, // Parall�lisation ici !
                    dependencies: ['phase-2'],
                    tasks: [
                        { agentId: 'seo-agent', type: 'seo-optimization', estimatedHours: 2, priority: 1 },
                        { agentId: 'marketing-agent', type: 'campaigns-setup', estimatedHours: 2, priority: 1 }
                    ]
                },
                {
                    id: 'phase-4',
                    name: 'Deployment & Automation',
                    parallel: true, // Parall�lisation finale !
                    dependencies: ['phase-3'],
                    tasks: [
                        { agentId: 'techops-agent', type: 'deployment', estimatedHours: 1.5, priority: 1 },
                        { agentId: 'automation-agent', type: 'workflows', estimatedHours: 1.5, priority: 1 }
                    ]
                }
            ],
            estimatedTotal: 10.5, // au lieu de 14h en s�quentiel
            efficiency: 25 // 25% plus rapide
        });
        // Workflow E-commerce
        this.workflows.set('ecommerce', {
            id: 'ecommerce',
            name: 'E-commerce Platform',
            description: 'Boutique en ligne compl�te avec paiements et CRM',
            phases: [
                {
                    id: 'phase-1',
                    name: 'Store Design & Catalog',
                    parallel: false,
                    tasks: [
                        { agentId: 'design-agent', type: 'ecommerce-design', estimatedHours: 5, priority: 1 }
                    ]
                },
                {
                    id: 'phase-2',
                    name: 'Platform Development',
                    parallel: false,
                    dependencies: ['phase-1'],
                    tasks: [
                        { agentId: 'webdev-agent', type: 'ecommerce-app', estimatedHours: 8, priority: 1 }
                    ]
                },
                {
                    id: 'phase-3',
                    name: 'Marketing & SEO',
                    parallel: true,
                    dependencies: ['phase-2'],
                    tasks: [
                        { agentId: 'seo-agent', type: 'ecommerce-seo', estimatedHours: 3, priority: 1 },
                        { agentId: 'marketing-agent', type: 'ecommerce-ads', estimatedHours: 4, priority: 1 }
                    ]
                },
                {
                    id: 'phase-4',
                    name: 'Operations & Automation',
                    parallel: true,
                    dependencies: ['phase-3'],
                    tasks: [
                        { agentId: 'techops-agent', type: 'ecommerce-ops', estimatedHours: 2, priority: 1 },
                        { agentId: 'automation-agent', type: 'ecommerce-automation', estimatedHours: 3, priority: 1 }
                    ]
                }
            ],
            estimatedTotal: 18, // optimis� vs 25h s�quentiel
            efficiency: 28
        });
        this.emit('workflows-configured', { count: this.workflows.size });
    };
    /**
     * Lance un nouveau projet avec orchestration intelligente
     */
    MasterOrchestrator.prototype.launchProject = function (projectSpec) {
        return __awaiter(this, void 0, void 0, function () {
            var projectId, workflow, tasks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectId = projectSpec.id || "project_".concat(Date.now());
                        projectSpec.id = projectId;
                        this.projects.set(projectId, projectSpec);
                        this.emit('project-started', { projectId: projectId, type: projectSpec.type });
                        console.log("=\uFFFD Lancement projet ".concat(projectId, " - Type: ").concat(projectSpec.type));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        workflow = this.selectWorkflow(projectSpec);
                        if (!workflow) {
                            throw new Error("Aucun workflow trouv\uFFFD pour le type: ".concat(projectSpec.type));
                        }
                        return [4 /*yield*/, this.planTasks(projectId, workflow, projectSpec)];
                    case 2:
                        tasks = _a.sent();
                        // Ex�cuter le workflow avec parall�lisation
                        return [4 /*yield*/, this.executeWorkflow(projectId, workflow, tasks)];
                    case 3:
                        // Ex�cuter le workflow avec parall�lisation
                        _a.sent();
                        this.emit('project-completed', { projectId: projectId, duration: 'calculated' });
                        return [2 /*return*/, projectId];
                    case 4:
                        error_1 = _a.sent();
                        this.emit('project-failed', { projectId: projectId, error: error_1.message });
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * S�lectionne le workflow optimal selon le projet
     */
    MasterOrchestrator.prototype.selectWorkflow = function (projectSpec) {
        return this.workflows.get(projectSpec.type) || this.workflows.get('restaurant');
    };
    /**
     * Planifie les t�ches avec optimisation des d�pendances
     */
    MasterOrchestrator.prototype.planTasks = function (projectId, workflow, spec) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks, taskCounter, _i, _a, phase, _b, _c, taskDef, task;
            return __generator(this, function (_d) {
                tasks = [];
                taskCounter = 1;
                for (_i = 0, _a = workflow.phases; _i < _a.length; _i++) {
                    phase = _a[_i];
                    for (_b = 0, _c = phase.tasks; _b < _c.length; _b++) {
                        taskDef = _c[_b];
                        task = {
                            id: "".concat(projectId, "_task_").concat(taskCounter++),
                            agentId: taskDef.agentId,
                            projectId: projectId,
                            phase: phase.id,
                            type: taskDef.type,
                            priority: taskDef.priority,
                            estimatedDuration: taskDef.estimatedHours * 3600, // en secondes
                            dependencies: phase.dependencies || [],
                            inputs: this.prepareTaskInputs(taskDef, spec),
                            status: 'queued',
                            progress: 0,
                            messages: []
                        };
                        tasks.push(task);
                        this.tasks.set(task.id, task);
                    }
                }
                console.log("=\uFFFD ".concat(tasks.length, " t\uFFFDches planifi\uFFFDes pour ").concat(projectId));
                return [2 /*return*/, tasks];
            });
        });
    };
    /**
     * Pr�pare les donn�es d'entr�e pour chaque t�che
     */
    MasterOrchestrator.prototype.prepareTaskInputs = function (taskDef, spec) {
        return {
            client: spec.client,
            scope: spec.scope,
            requirements: spec.requirements.filter(function (r) { return r.assignedAgent === taskDef.agentId; }),
            constraints: spec.constraints,
            timeline: spec.timeline,
            taskType: taskDef.type
        };
    };
    /**
     * Ex�cute le workflow avec gestion de la parall�lisation
     */
    MasterOrchestrator.prototype.executeWorkflow = function (projectId, workflow, tasks) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _b, phase;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("\uFFFD Ex\uFFFDcution workflow ".concat(workflow.name, " pour ").concat(projectId));
                        _loop_1 = function (phase) {
                            var phaseTasks, _d, phaseTasks_1, task;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        console.log("=\uFFFD Phase: ".concat(phase.name, " (Parall\uFFFDle: ").concat(phase.parallel, ")"));
                                        if (!((_a = phase.dependencies) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.waitForDependencies(projectId, phase.dependencies)];
                                    case 1:
                                        _e.sent();
                                        _e.label = 2;
                                    case 2:
                                        phaseTasks = tasks.filter(function (t) { return t.phase === phase.id; });
                                        if (!phase.parallel) return [3 /*break*/, 4];
                                        // Ex�cution en parall�le
                                        console.log("=\u0004 Ex\uFFFDcution parall\uFFFDle de ".concat(phaseTasks.length, " t\uFFFDches"));
                                        return [4 /*yield*/, this_1.executeTasksInParallel(phaseTasks)];
                                    case 3:
                                        _e.sent();
                                        return [3 /*break*/, 8];
                                    case 4:
                                        // Ex�cution s�quentielle
                                        console.log("\uFFFD\u000F Ex\uFFFDcution s\uFFFDquentielle de ".concat(phaseTasks.length, " t\uFFFDches"));
                                        _d = 0, phaseTasks_1 = phaseTasks;
                                        _e.label = 5;
                                    case 5:
                                        if (!(_d < phaseTasks_1.length)) return [3 /*break*/, 8];
                                        task = phaseTasks_1[_d];
                                        return [4 /*yield*/, this_1.executeTask(task)];
                                    case 6:
                                        _e.sent();
                                        _e.label = 7;
                                    case 7:
                                        _d++;
                                        return [3 /*break*/, 5];
                                    case 8:
                                        console.log("\u0005 Phase ".concat(phase.name, " termin\uFFFDe"));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _b = workflow.phases;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        phase = _b[_i];
                        return [5 /*yield**/, _loop_1(phase)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("<\uFFFD Workflow ".concat(workflow.name, " termin\uFFFD pour ").concat(projectId));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ex�cute plusieurs t�ches en parall�le avec gestion des ressources
     */
    MasterOrchestrator.prototype.executeTasksInParallel = function (tasks) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = tasks.map(function (task) { return _this.executeTask(task); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ex�cute une t�che individuelle
     */
    MasterOrchestrator.prototype.executeTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var agent, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        agent = this.agents.get(task.agentId);
                        if (!agent) {
                            throw new Error("Agent ".concat(task.agentId, " non trouv\uFFFD"));
                        }
                        if (!(agent.status !== 'available')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.waitForAgent(task.agentId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Marquer l'agent comme occup�
                        agent.status = 'busy';
                        agent.currentTask = task.id;
                        task.status = 'running';
                        task.startTime = new Date().toISOString();
                        console.log(">\u0016 Agent ".concat(agent.name, " d\uFFFDmarre t\uFFFDche ").concat(task.type));
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.simulateAgentExecution(task, agent)];
                    case 4:
                        result = _a.sent();
                        // Succ�s
                        task.status = 'completed';
                        task.endTime = new Date().toISOString();
                        task.progress = 100;
                        task.outputs = result;
                        // Lib�rer l'agent
                        agent.status = 'available';
                        agent.currentTask = undefined;
                        agent.performance.tasksCompleted++;
                        console.log("\u0005 T\uFFFDche ".concat(task.type, " termin\uFFFDe par ").concat(agent.name));
                        this.emit('task-completed', { taskId: task.id, agentId: agent.id });
                        return [2 /*return*/, result];
                    case 5:
                        error_2 = _a.sent();
                        // �chec
                        task.status = 'failed';
                        task.endTime = new Date().toISOString();
                        agent.status = 'available';
                        agent.currentTask = undefined;
                        console.error("L T\uFFFDche ".concat(task.type, " \uFFFDchou\uFFFDe:"), error_2.message);
                        this.emit('task-failed', { taskId: task.id, agentId: agent.id, error: error_2.message });
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Simulation d'ex�cution agent (� remplacer par vrais appels Claude API)
     */
    MasterOrchestrator.prototype.simulateAgentExecution = function (task, agent) {
        return __awaiter(this, void 0, void 0, function () {
            var baseTime, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseTime = Math.random() * 2000 + 1000;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, baseTime); })];
                    case 1:
                        _a.sent();
                        results = {
                            'design-agent': {
                                files: ['index.html', 'styles.css', 'components.tsx'],
                                metrics: { responsive: true, lighthouse: 95, components: 12 }
                            },
                            'webdev-agent': {
                                files: ['src/app/', 'src/components/', 'src/api/'],
                                metrics: { buildTime: '45s', bundleSize: '2.1MB', tests: 'passing' }
                            },
                            'seo-agent': {
                                optimizations: ['meta-tags', 'schema-org', 'sitemap'],
                                metrics: { seoScore: 98, keywords: 25, performance: 95 }
                            },
                            'marketing-agent': {
                                campaigns: ['google-ads', 'meta-ads', 'analytics'],
                                metrics: { budget: '�3000', reach: '50K', conversion: '3.5%' }
                            },
                            'techops-agent': {
                                deployment: { url: 'https://project.vercel.app', status: 'live' },
                                metrics: { uptime: '99.9%', loadTime: '1.2s' }
                            },
                            'automation-agent': {
                                workflows: ['reservation', 'feedback', 'inventory'],
                                metrics: { automated: 8, efficiency: '+35%' }
                            }
                        };
                        return [2 /*return*/, results[task.agentId] || { status: 'completed' }];
                }
            });
        });
    };
    /**
     * Attend qu'un agent soit disponible
     */
    MasterOrchestrator.prototype.waitForAgent = function (agentId, timeoutMs) {
        if (timeoutMs === void 0) { timeoutMs = 30000; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var timeout = setTimeout(function () {
                            reject(new Error("Timeout waiting for agent ".concat(agentId)));
                        }, timeoutMs);
                        var checkAgent = function () {
                            var agent = _this.agents.get(agentId);
                            if ((agent === null || agent === void 0 ? void 0 : agent.status) === 'available') {
                                clearTimeout(timeout);
                                resolve();
                            }
                            else {
                                setTimeout(checkAgent, 1000);
                            }
                        };
                        checkAgent();
                    })];
            });
        });
    };
    /**
     * Attend que les d�pendances soient termin�es
     */
    MasterOrchestrator.prototype.waitForDependencies = function (projectId, dependencies) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uFFFD Attente des d\uFFFDpendances: ".concat(dependencies.join(', ')));
                        // Dans une vraie impl�mentation, v�rifier l'�tat des phases pr�c�dentes
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        // Dans une vraie impl�mentation, v�rifier l'�tat des phases pr�c�dentes
                        _a.sent();
                        console.log("\u0005 D\uFFFDpendances satisfaites");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Obtient le statut global de l'orchestrator
     */
    MasterOrchestrator.prototype.getSystemStatus = function () {
        var _this = this;
        var agents = Array.from(this.agents.values());
        var tasks = Array.from(this.tasks.values());
        var projects = Array.from(this.projects.values());
        return {
            orchestrator: {
                status: this.isRunning ? 'running' : 'stopped',
                uptime: process.uptime(),
                version: '1.0.0'
            },
            agents: {
                total: agents.length,
                available: agents.filter(function (a) { return a.status === 'available'; }).length,
                busy: agents.filter(function (a) { return a.status === 'busy'; }).length,
                offline: agents.filter(function (a) { return a.status === 'offline'; }).length,
                details: agents
            },
            projects: {
                total: projects.length,
                active: projects.filter(function (p) { return _this.isProjectActive(p.id); }).length,
                completed: projects.filter(function (p) { return _this.isProjectCompleted(p.id); }).length
            },
            tasks: {
                total: tasks.length,
                queued: tasks.filter(function (t) { return t.status === 'queued'; }).length,
                running: tasks.filter(function (t) { return t.status === 'running'; }).length,
                completed: tasks.filter(function (t) { return t.status === 'completed'; }).length,
                failed: tasks.filter(function (t) { return t.status === 'failed'; }).length
            },
            performance: {
                throughput: this.calculateThroughput(),
                efficiency: this.calculateEfficiency(),
                resourceUsage: this.getResourceUsage()
            },
            timestamp: new Date().toISOString()
        };
    };
    /**
     * M�thodes utilitaires pour le statut
     */
    MasterOrchestrator.prototype.isProjectActive = function (projectId) {
        return Array.from(this.tasks.values()).some(function (t) {
            return t.projectId === projectId && ['queued', 'running'].includes(t.status);
        });
    };
    MasterOrchestrator.prototype.isProjectCompleted = function (projectId) {
        var projectTasks = Array.from(this.tasks.values()).filter(function (t) { return t.projectId === projectId; });
        return projectTasks.length > 0 && projectTasks.every(function (t) { return t.status === 'completed'; });
    };
    MasterOrchestrator.prototype.calculateThroughput = function () {
        var completedTasks = Array.from(this.tasks.values()).filter(function (t) { return t.status === 'completed'; });
        return completedTasks.length; // tasks/hour dans une vraie impl�mentation
    };
    MasterOrchestrator.prototype.calculateEfficiency = function () {
        var agents = Array.from(this.agents.values());
        var avgEfficiency = agents.reduce(function (sum, a) { return sum + a.performance.efficiency; }, 0) / agents.length;
        return Math.round(avgEfficiency);
    };
    MasterOrchestrator.prototype.getResourceUsage = function () {
        return {
            memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), // MB
            cpu: Math.round(Math.random() * 30 + 10), // simulation
            concurrent: this.activeExecutions.size
        };
    };
    /**
     * D�marre l'orchestrator
     */
    MasterOrchestrator.prototype.start = function () {
        this.isRunning = true;
        console.log('<� Master Orchestrator d�marr�');
        this.emit('orchestrator-started');
    };
    /**
     * Arr�te l'orchestrator
     */
    MasterOrchestrator.prototype.stop = function () {
        this.isRunning = false;
        console.log('� Master Orchestrator arr�t�');
        this.emit('orchestrator-stopped');
    };
    return MasterOrchestrator;
}(events_1.EventEmitter));
exports.MasterOrchestrator = MasterOrchestrator;
// Instance singleton export�e
exports.masterOrchestrator = new MasterOrchestrator();
exports.default = exports.masterOrchestrator;
