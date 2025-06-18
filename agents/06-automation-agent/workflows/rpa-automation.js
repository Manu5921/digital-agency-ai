"use strict";
/**
 * RPA Automation - Phase 2
 * Robotic Process Automation pour tâches browser et intégration multi-systèmes
 *
 * Features:
 * - Automation de tâches browser avec Playwright
 * - Intégration multi-systèmes (CRM, ERP, APIs)
 * - Data entry automatisé avec validation
 * - Monitoring et reporting des process
 * - Gestion d'erreurs intelligente
 * - Scheduling et orchestration
 * - Captcha solving avec services tiers
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
exports.defaultRPAConfig = exports.RPAAutomation = void 0;
var playwright_1 = require("playwright");
var openai_1 = require("openai");
var axios_1 = require("axios");
var cron = require("node-cron");
var RPAAutomation = /** @class */ (function () {
    function RPAAutomation(config) {
        this.browser = null;
        this.context = null;
        this.page = null;
        this.tasks = new Map();
        this.executions = new Map();
        this.integrations = new Map();
        this.scheduledTasks = new Map();
        this.config = config;
        this.openai = new openai_1.OpenAI({ apiKey: config.ai.openaiApiKey });
        this.setupDefaultIntegrations();
        this.startMonitoring();
    }
    /**
     * Configuration des intégrations par défaut
     */
    RPAAutomation.prototype.setupDefaultIntegrations = function () {
        // HubSpot CRM
        this.integrations.set('hubspot', {
            name: 'HubSpot CRM',
            type: 'crm',
            authentication: {
                type: 'api_key',
                credentials: {
                    apiKey: this.config.integrations.hubspot.apiKey
                }
            },
            endpoints: {
                base: 'https://api.hubapi.com',
                endpoints: {
                    contacts: '/crm/v3/objects/contacts',
                    companies: '/crm/v3/objects/companies',
                    deals: '/crm/v3/objects/deals',
                    tickets: '/crm/v3/objects/tickets'
                }
            },
            rateLimits: {
                requestsPerMinute: 100,
                requestsPerHour: 1000
            }
        });
        // Salesforce
        this.integrations.set('salesforce', {
            name: 'Salesforce',
            type: 'crm',
            authentication: {
                type: 'oauth2',
                credentials: {
                    clientId: this.config.integrations.salesforce.clientId,
                    clientSecret: this.config.integrations.salesforce.clientSecret
                }
            },
            endpoints: {
                base: 'https://login.salesforce.com',
                endpoints: {
                    auth: '/services/oauth2/token',
                    query: '/services/data/v57.0/query',
                    sobjects: '/services/data/v57.0/sobjects'
                }
            },
            rateLimits: {
                requestsPerMinute: 1000,
                requestsPerHour: 5000
            }
        });
    };
    /**
     * Initialisation du navigateur
     */
    RPAAutomation.prototype.initBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browserType, browserOptions, _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (this.browser) {
                            return [2 /*return*/];
                        }
                        browserType = this.config.browser.type;
                        browserOptions = {
                            headless: this.config.browser.headless,
                            timeout: this.config.browser.timeout,
                            proxy: this.config.browser.proxy
                        };
                        _a = browserType;
                        switch (_a) {
                            case 'chromium': return [3 /*break*/, 1];
                            case 'firefox': return [3 /*break*/, 3];
                            case 'webkit': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        _b = this;
                        return [4 /*yield*/, playwright_1.chromium.launch(browserOptions)];
                    case 2:
                        _b.browser = _g.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        _c = this;
                        return [4 /*yield*/, playwright_1.firefox.launch(browserOptions)];
                    case 4:
                        _c.browser = _g.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        _d = this;
                        return [4 /*yield*/, playwright_1.webkit.launch(browserOptions)];
                    case 6:
                        _d.browser = _g.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        _e = this;
                        return [4 /*yield*/, this.browser.newContext({
                                viewport: { width: 1920, height: 1080 },
                                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                            })];
                    case 8:
                        _e.context = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this.context.newPage()];
                    case 9:
                        _f.page = _g.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Création d'une tâche RPA
     */
    RPAAutomation.prototype.createTask = function (name, description, type, steps, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var taskId = "task_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
        var task = {
            id: taskId,
            name: name,
            description: description,
            type: type,
            status: 'pending',
            priority: options.priority || 'medium',
            steps: steps,
            schedule: options.schedule,
            config: __assign({ maxRetries: 3, timeout: 30000, waitBetweenSteps: 1000, errorHandling: 'stop' }, options.config),
            metadata: {
                createdAt: new Date(),
                createdBy: options.createdBy || 'system',
                runCount: 0,
                successRate: 0
            }
        };
        this.tasks.set(taskId, task);
        // Programmation si nécessaire
        if ((_a = task.schedule) === null || _a === void 0 ? void 0 : _a.enabled) {
            this.scheduleTask(task);
        }
        console.log("[RPA] T\u00E2che cr\u00E9\u00E9e: ".concat(name, " (").concat(taskId, ")"));
        return taskId;
    };
    /**
     * Exécution d'une tâche RPA
     */
    RPAAutomation.prototype.executeTask = function (taskId, context) {
        var _a, _b;
        if (context === void 0) { context = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var task, executionId, execution, stepContext, _i, _c, step, stepResult, error_1, errorMessage, stepResult, successfulSteps, error_2, _d, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        task = this.tasks.get(taskId);
                        if (!task) {
                            throw new Error("T\u00E2che non trouv\u00E9e: ".concat(taskId));
                        }
                        executionId = "exec_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
                        execution = {
                            id: executionId,
                            taskId: taskId,
                            status: 'running',
                            startTime: new Date(),
                            results: [],
                            logs: [],
                            metrics: {
                                stepsCompleted: 0,
                                stepsTotal: task.steps.length,
                                dataProcessed: 0,
                                errorsEncountered: 0
                            }
                        };
                        this.executions.set(executionId, execution);
                        task.status = 'running';
                        task.metadata.runCount++;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 12, 13, 19]);
                        console.log("[RPA] D\u00E9but ex\u00E9cution: ".concat(task.name, " (").concat(executionId, ")"));
                        if (!(task.type === 'browser' || task.steps.some(function (s) { return ['navigate', 'click', 'type'].includes(s.type); }))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.initBrowser()];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        stepContext = __assign({}, context);
                        _i = 0, _c = task.steps;
                        _e.label = 4;
                    case 4:
                        if (!(_i < _c.length)) return [3 /*break*/, 11];
                        step = _c[_i];
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, 9, , 10]);
                        return [4 /*yield*/, this.executeStep(step, stepContext, execution)];
                    case 6:
                        stepResult = _e.sent();
                        execution.results.push(stepResult);
                        execution.metrics.stepsCompleted++;
                        // Mise à jour du contexte avec les résultats
                        if (stepResult.data) {
                            stepContext = __assign(__assign({}, stepContext), stepResult.data);
                        }
                        if (!(task.config.waitBetweenSteps > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.sleep(task.config.waitBetweenSteps)];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _e.sent();
                        execution.metrics.errorsEncountered++;
                        errorMessage = error_1 instanceof Error ? error_1.message : 'Erreur inconnue';
                        console.error("[RPA] Erreur \u00E9tape ".concat(step.name, ":"), errorMessage);
                        stepResult = {
                            stepId: step.id,
                            stepName: step.name,
                            status: 'failed',
                            startTime: new Date(),
                            endTime: new Date(),
                            duration: 0,
                            error: errorMessage
                        };
                        execution.results.push(stepResult);
                        // Gestion d'erreur
                        if (((_a = step.errorHandling) === null || _a === void 0 ? void 0 : _a.onError) === 'continue') {
                            return [3 /*break*/, 10];
                        }
                        else if (((_b = step.errorHandling) === null || _b === void 0 ? void 0 : _b.onError) === 'retry' && step.errorHandling.maxRetries > 0) {
                            // Logique de retry
                            return [3 /*break*/, 10];
                        }
                        else if (task.config.errorHandling === 'stop') {
                            throw error_1;
                        }
                        return [3 /*break*/, 10];
                    case 10:
                        _i++;
                        return [3 /*break*/, 4];
                    case 11:
                        execution.status = 'completed';
                        task.status = 'completed';
                        successfulSteps = execution.results.filter(function (r) { return r.status === 'success'; }).length;
                        task.metadata.successRate = (successfulSteps / execution.results.length) * 100;
                        console.log("[RPA] Ex\u00E9cution termin\u00E9e: ".concat(task.name, " - ").concat(execution.metrics.stepsCompleted, "/").concat(execution.metrics.stepsTotal, " \u00E9tapes"));
                        return [3 /*break*/, 19];
                    case 12:
                        error_2 = _e.sent();
                        execution.status = 'failed';
                        task.status = 'failed';
                        execution.error = error_2 instanceof Error ? error_2.message : 'Erreur inconnue';
                        console.error("[RPA] \u00C9chec ex\u00E9cution: ".concat(task.name), execution.error);
                        return [3 /*break*/, 19];
                    case 13:
                        execution.endTime = new Date();
                        execution.duration = execution.endTime.getTime() - execution.startTime.getTime();
                        task.metadata.lastRun = new Date();
                        if (!this.page) return [3 /*break*/, 17];
                        _e.label = 14;
                    case 14:
                        _e.trys.push([14, 16, , 17]);
                        _d = execution;
                        return [4 /*yield*/, this.captureScreenshot(executionId)];
                    case 15:
                        _d.screenshot = _e.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        error_3 = _e.sent();
                        console.warn('[RPA] Impossible de capturer screenshot:', error_3);
                        return [3 /*break*/, 17];
                    case 17: 
                    // Notification si configurée
                    return [4 /*yield*/, this.notifyExecution(execution)];
                    case 18:
                        // Notification si configurée
                        _e.sent();
                        return [7 /*endfinally*/];
                    case 19: return [2 /*return*/, execution];
                }
            });
        });
    };
    /**
     * Exécution d'une étape individuelle
     */
    RPAAutomation.prototype.executeStep = function (step, context, execution) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, result, _a, endTime, stepResult, isValid, error_4, endTime;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startTime = new Date();
                        console.log("[RPA] Ex\u00E9cution \u00E9tape: ".concat(step.name));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 24, , 25]);
                        result = null;
                        _a = step.type;
                        switch (_a) {
                            case 'navigate': return [3 /*break*/, 2];
                            case 'click': return [3 /*break*/, 4];
                            case 'type': return [3 /*break*/, 6];
                            case 'wait': return [3 /*break*/, 8];
                            case 'extract': return [3 /*break*/, 10];
                            case 'validate': return [3 /*break*/, 12];
                            case 'api_call': return [3 /*break*/, 14];
                            case 'condition': return [3 /*break*/, 16];
                            case 'ai_action': return [3 /*break*/, 18];
                        }
                        return [3 /*break*/, 20];
                    case 2: return [4 /*yield*/, this.stepNavigate(step, context)];
                    case 3:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 4: return [4 /*yield*/, this.stepClick(step, context)];
                    case 5:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 6: return [4 /*yield*/, this.stepType(step, context)];
                    case 7:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 8: return [4 /*yield*/, this.stepWait(step, context)];
                    case 9:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 10: return [4 /*yield*/, this.stepExtract(step, context)];
                    case 11:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 12: return [4 /*yield*/, this.stepValidate(step, context)];
                    case 13:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 14: return [4 /*yield*/, this.stepApiCall(step, context)];
                    case 15:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 16: return [4 /*yield*/, this.stepCondition(step, context)];
                    case 17:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 18: return [4 /*yield*/, this.stepAIAction(step, context)];
                    case 19:
                        result = _b.sent();
                        return [3 /*break*/, 21];
                    case 20: throw new Error("Type d'\u00E9tape non support\u00E9: ".concat(step.type));
                    case 21:
                        endTime = new Date();
                        stepResult = {
                            stepId: step.id,
                            stepName: step.name,
                            status: 'success',
                            startTime: startTime,
                            endTime: endTime,
                            duration: endTime.getTime() - startTime.getTime(),
                            data: result
                        };
                        if (!step.validation) return [3 /*break*/, 23];
                        return [4 /*yield*/, this.validateStep(step.validation, result, context)];
                    case 22:
                        isValid = _b.sent();
                        if (!isValid) {
                            stepResult.status = 'failed';
                            stepResult.error = 'Validation échouée';
                        }
                        _b.label = 23;
                    case 23: return [2 /*return*/, stepResult];
                    case 24:
                        error_4 = _b.sent();
                        endTime = new Date();
                        return [2 /*return*/, {
                                stepId: step.id,
                                stepName: step.name,
                                status: 'failed',
                                startTime: startTime,
                                endTime: endTime,
                                duration: endTime.getTime() - startTime.getTime(),
                                error: error_4 instanceof Error ? error_4.message : 'Erreur inconnue'
                            }];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Étapes d'exécution spécialisées
     */
    RPAAutomation.prototype.stepNavigate = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.page)
                            throw new Error('Page non initialisée');
                        url = this.interpolateValue(step.value || '', context);
                        return [4 /*yield*/, this.page.goto(url, { waitUntil: 'networkidle' })];
                    case 1:
                        _b.sent();
                        _a = { url: url };
                        return [4 /*yield*/, this.page.title()];
                    case 2: return [2 /*return*/, (_a.title = _b.sent(), _a)];
                }
            });
        });
    };
    RPAAutomation.prototype.stepClick = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var selector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.page)
                            throw new Error('Page non initialisée');
                        selector = this.interpolateValue(step.selector || '', context);
                        // Attendre que l'élément soit visible
                        return [4 /*yield*/, this.page.waitForSelector(selector, { timeout: 10000 })];
                    case 1:
                        // Attendre que l'élément soit visible
                        _a.sent();
                        // Cliquer
                        return [4 /*yield*/, this.page.click(selector)];
                    case 2:
                        // Cliquer
                        _a.sent();
                        return [2 /*return*/, { clicked: true, selector: selector }];
                }
            });
        });
    };
    RPAAutomation.prototype.stepType = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var selector, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.page)
                            throw new Error('Page non initialisée');
                        selector = this.interpolateValue(step.selector || '', context);
                        value = this.interpolateValue(step.value || '', context);
                        return [4 /*yield*/, this.page.waitForSelector(selector, { timeout: 10000 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.fill(selector, value)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { typed: true, selector: selector, value: value }];
                }
            });
        });
    };
    RPAAutomation.prototype.stepWait = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var waitTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        waitTime = parseInt(step.value || '1000');
                        return [4 /*yield*/, this.sleep(waitTime)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { waited: waitTime }];
                }
            });
        });
    };
    RPAAutomation.prototype.stepExtract = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var selector, element, text, attribute, attributeValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.page)
                            throw new Error('Page non initialisée');
                        selector = this.interpolateValue(step.selector || '', context);
                        return [4 /*yield*/, this.page.waitForSelector(selector, { timeout: 10000 })];
                    case 1:
                        element = _a.sent();
                        return [4 /*yield*/, element.textContent()];
                    case 2:
                        text = _a.sent();
                        attribute = step.value;
                        attributeValue = null;
                        if (!attribute) return [3 /*break*/, 4];
                        return [4 /*yield*/, element.getAttribute(attribute)];
                    case 3:
                        attributeValue = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            text: text === null || text === void 0 ? void 0 : text.trim(),
                            attribute: attributeValue,
                            selector: selector
                        }];
                }
            });
        });
    };
    RPAAutomation.prototype.stepValidate = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!step.validation) {
                            throw new Error('Règle de validation manquante');
                        }
                        return [4 /*yield*/, this.validateStep(step.validation, context, context)];
                    case 1:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw new Error("Validation \u00E9chou\u00E9e: ".concat(step.validation.type, " - ").concat(step.validation.value));
                        }
                        return [2 /*return*/, { validated: true }];
                }
            });
        });
    };
    RPAAutomation.prototype.stepApiCall = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var config, url, headers, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!step.apiConfig) {
                            throw new Error('Configuration API manquante');
                        }
                        config = step.apiConfig;
                        url = this.interpolateValue(config.url, context);
                        headers = config.headers || {};
                        // Interpolation des headers
                        Object.keys(headers).forEach(function (key) {
                            headers[key] = _this.interpolateValue(headers[key], context);
                        });
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: config.method,
                                url: url,
                                headers: headers,
                                data: config.body,
                                timeout: 30000
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                status: response.status,
                                data: response.data,
                                headers: response.headers
                            }];
                }
            });
        });
    };
    RPAAutomation.prototype.stepCondition = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, result;
            return __generator(this, function (_a) {
                if (!step.condition) {
                    throw new Error('Condition manquante');
                }
                condition = this.interpolateValue(step.condition, context);
                result = eval(condition);
                return [2 /*return*/, { condition: condition, result: result }];
            });
        });
    };
    RPAAutomation.prototype.stepAIAction = function (step, context) {
        return __awaiter(this, void 0, void 0, function () {
            var prompt, screenshot, completion, aiResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!step.aiPrompt) {
                            throw new Error('Prompt AI manquant');
                        }
                        prompt = this.interpolateValue(step.aiPrompt, context);
                        screenshot = null;
                        if (!this.page) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.page.screenshot({ encoding: 'base64' })];
                    case 1:
                        screenshot = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.openai.chat.completions.create({
                            model: this.config.ai.model,
                            messages: [
                                {
                                    role: 'system',
                                    content: 'Tu es un assistant RPA qui analyse les pages web et effectue des actions intelligentes.'
                                },
                                {
                                    role: 'user',
                                    content: prompt
                                }
                            ],
                            temperature: 0.1,
                            max_tokens: 500
                        })];
                    case 3:
                        completion = _a.sent();
                        aiResponse = completion.choices[0].message.content || '';
                        return [2 /*return*/, {
                                prompt: prompt,
                                response: aiResponse,
                                hasScreenshot: !!screenshot
                            }];
                }
            });
        });
    };
    /**
     * Validation d'étape
     */
    RPAAutomation.prototype.validateStep = function (validation, data, context) {
        return __awaiter(this, void 0, void 0, function () {
            var value, text, regex;
            return __generator(this, function (_a) {
                value = this.interpolateValue(validation.value, context);
                switch (validation.type) {
                    case 'exists':
                        return [2 /*return*/, data !== null && data !== undefined];
                    case 'not_exists':
                        return [2 /*return*/, data === null || data === undefined];
                    case 'text_contains':
                        text = typeof data === 'string' ? data : JSON.stringify(data);
                        return [2 /*return*/, validation.caseSensitive ?
                                text.includes(value) :
                                text.toLowerCase().includes(value.toLowerCase())];
                    case 'text_equals':
                        return [2 /*return*/, validation.caseSensitive ?
                                data === value :
                                (data === null || data === void 0 ? void 0 : data.toLowerCase()) === value.toLowerCase()];
                    case 'regex':
                        regex = new RegExp(value);
                        return [2 /*return*/, regex.test(String(data))];
                    case 'custom':
                        // Évaluation personnalisée (dangereux)
                        return [2 /*return*/, eval(validation.customFunction || 'false')];
                    default:
                        return [2 /*return*/, true];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Programmation de tâches
     */
    RPAAutomation.prototype.scheduleTask = function (task) {
        var _this = this;
        var _a;
        if (!((_a = task.schedule) === null || _a === void 0 ? void 0 : _a.enabled) || !task.schedule.cron) {
            return;
        }
        var scheduledTask = cron.schedule(task.schedule.cron, function () { return __awaiter(_this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[RPA] Ex\u00E9cution programm\u00E9e: ".concat(task.name));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.executeTask(task.id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error("[RPA] Erreur ex\u00E9cution programm\u00E9e: ".concat(task.name), error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, {
            scheduled: true,
            timezone: task.schedule.timezone || 'Europe/Paris'
        });
        this.scheduledTasks.set(task.id, scheduledTask);
        // Calcul de la prochaine exécution
        task.metadata.nextRun = new Date(Date.now() + 60000); // Approximation
    };
    /**
     * Intégrations CRM
     */
    RPAAutomation.prototype.syncToHubSpot = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var integration, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        integration = this.integrations.get('hubspot');
                        if (!integration) {
                            throw new Error('Intégration HubSpot non configurée');
                        }
                        return [4 /*yield*/, axios_1.default.post("".concat(integration.endpoints.base).concat(integration.endpoints.endpoints.contacts), {
                                properties: data
                            }, {
                                headers: {
                                    'Authorization': "Bearer ".concat(integration.authentication.credentials.apiKey),
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    RPAAutomation.prototype.syncToSalesforce = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var integration, authResponse, accessToken, instanceUrl, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        integration = this.integrations.get('salesforce');
                        if (!integration) {
                            throw new Error('Intégration Salesforce non configurée');
                        }
                        return [4 /*yield*/, axios_1.default.post("".concat(integration.endpoints.base).concat(integration.endpoints.endpoints.auth), new URLSearchParams({
                                grant_type: 'password',
                                client_id: integration.authentication.credentials.clientId,
                                client_secret: integration.authentication.credentials.clientSecret,
                                username: this.config.integrations.salesforce.username,
                                password: this.config.integrations.salesforce.password + this.config.integrations.salesforce.securityToken
                            }))];
                    case 1:
                        authResponse = _a.sent();
                        accessToken = authResponse.data.access_token;
                        instanceUrl = authResponse.data.instance_url;
                        return [4 /*yield*/, axios_1.default.post("".concat(instanceUrl, "/services/data/v57.0/sobjects/Contact/"), data, {
                                headers: {
                                    'Authorization': "Bearer ".concat(accessToken),
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * Gestion des CAPTCHAs
     */
    RPAAutomation.prototype.solveCaptcha = function (captchaType, data) {
        return __awaiter(this, void 0, void 0, function () {
            var service, apiKey, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = this.config.captcha.service;
                        apiKey = this.config.captcha.apiKey;
                        _a = service;
                        switch (_a) {
                            case '2captcha': return [3 /*break*/, 1];
                            case 'anticaptcha': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.solve2Captcha(captchaType, data, apiKey)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.solveAntiCaptcha(captchaType, data, apiKey)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: throw new Error("Service CAPTCHA non support\u00E9: ".concat(service));
                }
            });
        });
    };
    RPAAutomation.prototype.solve2Captcha = function (type, data, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var submitResponse, captchaId, attempts, resultResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post('http://2captcha.com/in.php', {
                            key: apiKey,
                            method: type === 'recaptcha' ? 'userrecaptcha' : 'base64',
                            googlekey: data.siteKey,
                            pageurl: data.pageUrl,
                            body: data.image
                        })];
                    case 1:
                        submitResponse = _a.sent();
                        captchaId = submitResponse.data.split('|')[1];
                        attempts = 0;
                        _a.label = 2;
                    case 2:
                        if (!(attempts < 24)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.sleep(5000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, axios_1.default.get("http://2captcha.com/res.php?key=".concat(apiKey, "&action=get&id=").concat(captchaId))];
                    case 4:
                        resultResponse = _a.sent();
                        if (resultResponse.data.includes('CAPCHA_NOT_READY')) {
                            attempts++;
                            return [3 /*break*/, 2];
                        }
                        if (resultResponse.data.includes('OK|')) {
                            return [2 /*return*/, resultResponse.data.split('|')[1]];
                        }
                        throw new Error('Erreur résolution CAPTCHA');
                    case 5: throw new Error('Timeout résolution CAPTCHA');
                }
            });
        });
    };
    RPAAutomation.prototype.solveAntiCaptcha = function (type, data, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Implémentation AntiCaptcha
                throw new Error('AntiCaptcha non implémenté');
            });
        });
    };
    /**
     * Monitoring et reporting
     */
    RPAAutomation.prototype.startMonitoring = function () {
        var _this = this;
        // Reporting périodique
        setInterval(function () {
            _this.generateReport();
        }, this.config.monitoring.reportingInterval * 60 * 1000);
    };
    RPAAutomation.prototype.generateReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stats, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stats = this.getStats();
                        console.log('[RPA] Rapport périodique:', stats);
                        if (!this.config.monitoring.webhookUrl) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.post(this.config.monitoring.webhookUrl, {
                                type: 'rpa_report',
                                timestamp: new Date().toISOString(),
                                stats: stats
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.error('[RPA] Erreur envoi rapport:', error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RPAAutomation.prototype.notifyExecution = function (execution) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(execution.status === 'failed' && this.config.monitoring.webhookUrl)) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.post(this.config.monitoring.webhookUrl, {
                                type: 'rpa_execution_failed',
                                execution: {
                                    id: execution.id,
                                    taskId: execution.taskId,
                                    error: execution.error,
                                    duration: execution.duration,
                                    metrics: execution.metrics
                                },
                                timestamp: new Date().toISOString()
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Utilitaires
     */
    RPAAutomation.prototype.interpolateValue = function (template, context) {
        return template.replace(/\{\{([^}]+)\}\}/g, function (match, key) {
            var value = context[key.trim()];
            return value !== undefined ? String(value) : match;
        });
    };
    RPAAutomation.prototype.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    RPAAutomation.prototype.captureScreenshot = function (executionId) {
        return __awaiter(this, void 0, void 0, function () {
            var screenshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.page)
                            return [2 /*return*/, ''];
                        return [4 /*yield*/, this.page.screenshot({
                                path: "./screenshots/".concat(executionId, ".png"),
                                fullPage: true
                            })];
                    case 1:
                        screenshot = _a.sent();
                        return [2 /*return*/, "./screenshots/".concat(executionId, ".png")];
                }
            });
        });
    };
    /**
     * API publique
     */
    RPAAutomation.prototype.getTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tasks.get(taskId) || null];
            });
        });
    };
    RPAAutomation.prototype.getExecution = function (executionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.executions.get(executionId) || null];
            });
        });
    };
    RPAAutomation.prototype.listTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.tasks.values())];
            });
        });
    };
    RPAAutomation.prototype.listExecutions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.executions.values())];
            });
        });
    };
    RPAAutomation.prototype.pauseTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var task, scheduledTask;
            return __generator(this, function (_a) {
                task = this.tasks.get(taskId);
                if (task) {
                    task.status = 'pending';
                    scheduledTask = this.scheduledTasks.get(taskId);
                    if (scheduledTask) {
                        scheduledTask.stop();
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    RPAAutomation.prototype.resumeTask = function (taskId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_b) {
                task = this.tasks.get(taskId);
                if (task && ((_a = task.schedule) === null || _a === void 0 ? void 0 : _a.enabled)) {
                    this.scheduleTask(task);
                }
                return [2 /*return*/];
            });
        });
    };
    RPAAutomation.prototype.deleteTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var scheduledTask;
            return __generator(this, function (_a) {
                scheduledTask = this.scheduledTasks.get(taskId);
                if (scheduledTask) {
                    scheduledTask.stop();
                    this.scheduledTasks.delete(taskId);
                }
                this.tasks.delete(taskId);
                return [2 /*return*/];
            });
        });
    };
    RPAAutomation.prototype.getStats = function () {
        var tasks = Array.from(this.tasks.values());
        var executions = Array.from(this.executions.values());
        var successfulExecutions = executions.filter(function (e) { return e.status === 'completed'; });
        var averageTime = executions.reduce(function (sum, e) { return sum + (e.duration || 0); }, 0) / executions.length || 0;
        return {
            totalTasks: tasks.length,
            activeTasks: tasks.filter(function (t) { return t.status === 'running'; }).length,
            totalExecutions: executions.length,
            successRate: successfulExecutions.length / executions.length || 0,
            averageExecutionTime: averageTime,
            taskTypeDistribution: tasks.reduce(function (acc, task) {
                acc[task.type] = (acc[task.type] || 0) + 1;
                return acc;
            }, {}),
            lastExecutions: executions.slice(-5)
        };
    };
    /**
     * Nettoyage
     */
    RPAAutomation.prototype.cleanup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Arrêt des tâches programmées
                        this.scheduledTasks.forEach(function (task) { return task.stop(); });
                        this.scheduledTasks.clear();
                        if (!this.browser) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.browser.close()];
                    case 1:
                        _a.sent();
                        this.browser = null;
                        this.context = null;
                        this.page = null;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return RPAAutomation;
}());
exports.RPAAutomation = RPAAutomation;
// Configuration par défaut
exports.defaultRPAConfig = {
    browser: {
        type: 'chromium',
        headless: true,
        timeout: 30000,
        retries: 3
    },
    integrations: {
        hubspot: {
            apiKey: process.env.HUBSPOT_API_KEY || '',
            baseUrl: 'https://api.hubapi.com'
        },
        salesforce: {
            clientId: process.env.SALESFORCE_CLIENT_ID || '',
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET || '',
            username: process.env.SALESFORCE_USERNAME || '',
            password: process.env.SALESFORCE_PASSWORD || '',
            securityToken: process.env.SALESFORCE_SECURITY_TOKEN || ''
        },
        zapier: {
            apiKey: process.env.ZAPIER_API_KEY || ''
        },
        n8n: {
            apiKey: process.env.N8N_API_KEY || '',
            baseUrl: process.env.N8N_BASE_URL || ''
        }
    },
    captcha: {
        service: '2captcha',
        apiKey: process.env.CAPTCHA_API_KEY || ''
    },
    monitoring: {
        webhookUrl: process.env.RPA_WEBHOOK_URL || '',
        alertThreshold: 80,
        reportingInterval: 60
    },
    ai: {
        openaiApiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4o'
    }
};
exports.default = RPAAutomation;
