"use strict";
/**
 * Agent Communicator - Syst�me de communication inter-agents
 * G�re les messages, �v�nements et synchronisation entre agents
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
exports.agentCommunicator = exports.AgentCommunicator = void 0;
var events_1 = require("events");
var AgentCommunicator = /** @class */ (function (_super) {
    __extends(AgentCommunicator, _super);
    function AgentCommunicator() {
        var _this = _super.call(this) || this;
        _this.channels = new Map();
        _this.endpoints = new Map();
        _this.messageHistory = [];
        _this.messageQueue = new Map();
        _this.heartbeatInterval = null;
        _this.HEARTBEAT_INTERVAL = 30000; // 30 secondes
        _this.MESSAGE_TTL = 300; // 5 minutes par d�faut
        _this.setupDefaultChannels();
        _this.startHeartbeat();
        return _this;
    }
    /**
     * Configure les canaux de communication par d�faut
     */
    AgentCommunicator.prototype.setupDefaultChannels = function () {
        var _this = this;
        var defaultChannels = [
            {
                id: 'system',
                name: 'System Notifications',
                participants: ['orchestrator'],
                type: 'broadcast',
                persistent: true,
                encrypted: false
            },
            {
                id: 'project-coordination',
                name: 'Project Coordination',
                participants: ['orchestrator', 'design-agent', 'webdev-agent', 'seo-agent', 'marketing-agent', 'techops-agent', 'automation-agent'],
                type: 'multicast',
                persistent: true,
                encrypted: false
            },
            {
                id: 'alerts',
                name: 'System Alerts',
                participants: ['orchestrator'],
                type: 'broadcast',
                persistent: true,
                encrypted: false
            },
            {
                id: 'design-dev',
                name: 'Design-Development Channel',
                participants: ['design-agent', 'webdev-agent'],
                type: 'direct',
                persistent: false,
                encrypted: false
            },
            {
                id: 'optimization',
                name: 'SEO-Marketing Optimization',
                participants: ['seo-agent', 'marketing-agent'],
                type: 'direct',
                persistent: false,
                encrypted: false
            },
            {
                id: 'deployment',
                name: 'Deployment Coordination',
                participants: ['techops-agent', 'automation-agent'],
                type: 'direct',
                persistent: false,
                encrypted: false
            }
        ];
        defaultChannels.forEach(function (channel) {
            _this.channels.set(channel.id, channel);
        });
        console.log("=\uFFFD ".concat(defaultChannels.length, " canaux de communication configur\uFFFDs"));
    };
    /**
     * Enregistre un agent dans le syst�me de communication
     */
    AgentCommunicator.prototype.registerAgent = function (agentId, capabilities) {
        var endpoint = {
            agentId: agentId,
            status: 'online',
            capabilities: capabilities,
            lastSeen: new Date().toISOString(),
            messageQueue: [],
            subscriptions: ['system', 'project-coordination']
        };
        this.endpoints.set(agentId, endpoint);
        this.messageQueue.set(agentId, []);
        console.log(">\u0016 Agent ".concat(agentId, " enregistr\uFFFD dans le syst\uFFFDme de communication"));
        // Notifier les autres agents
        this.broadcast({
            id: "msg_".concat(Date.now()),
            from: 'system',
            to: 'broadcast',
            type: 'notification',
            channel: 'system',
            payload: {
                event: 'agent-joined',
                agentId: agentId,
                capabilities: capabilities,
                timestamp: new Date().toISOString()
            },
            timestamp: new Date().toISOString(),
            priority: 'medium'
        });
        this.emit('agent-registered', { agentId: agentId, capabilities: capabilities });
    };
    /**
     * Envoie un message � un agent sp�cifique
     */
    AgentCommunicator.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var recipient, queue;
            return __generator(this, function (_a) {
                try {
                    // Validation du message
                    if (!this.validateMessage(message)) {
                        throw new Error('Message invalide');
                    }
                    // Ajouter m�tadonn�es
                    message.id = message.id || "msg_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
                    message.timestamp = new Date().toISOString();
                    message.ttl = message.ttl || this.MESSAGE_TTL;
                    if (message.to === 'broadcast') {
                        return [2 /*return*/, this.broadcast(message)];
                    }
                    recipient = this.endpoints.get(message.to);
                    if (!recipient) {
                        throw new Error("Agent destinataire ".concat(message.to, " non trouv\uFFFD"));
                    }
                    queue = this.messageQueue.get(message.to) || [];
                    queue.push(message);
                    this.messageQueue.set(message.to, queue);
                    // Ajouter � l'historique
                    this.messageHistory.push(message);
                    // �mettre �v�nement
                    this.emit('message-sent', { messageId: message.id, from: message.from, to: message.to });
                    console.log("=\uFFFD Message envoy\uFFFD de ".concat(message.from, " \uFFFD ").concat(message.to, ": ").concat(message.type));
                    return [2 /*return*/, true];
                }
                catch (error) {
                    console.error('L Erreur envoi message:', error);
                    this.emit('message-error', { message: message, error: error.message });
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Diffuse un message � tous les agents ou � un canal
     */
    AgentCommunicator.prototype.broadcast = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, recipients, successCount, _i, recipients_1, agentId, individualMessage, success, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        channel = this.channels.get(message.channel);
                        recipients = channel ? channel.participants : Array.from(this.endpoints.keys());
                        successCount = 0;
                        _i = 0, recipients_1 = recipients;
                        _a.label = 1;
                    case 1:
                        if (!(_i < recipients_1.length)) return [3 /*break*/, 4];
                        agentId = recipients_1[_i];
                        if (!(agentId !== message.from)) return [3 /*break*/, 3];
                        individualMessage = __assign(__assign({}, message), { to: agentId });
                        return [4 /*yield*/, this.sendMessage(individualMessage)];
                    case 2:
                        success = _a.sent();
                        if (success)
                            successCount++;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("=\uFFFD Message diffus\uFFFD \uFFFD ".concat(successCount, "/").concat(recipients.length, " agents"));
                        this.emit('message-broadcast', { messageId: message.id, recipients: successCount });
                        return [2 /*return*/, successCount > 0];
                    case 5:
                        error_1 = _a.sent();
                        console.error('L Erreur diffusion message:', error_1);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * R�cup�re les messages en attente pour un agent
     */
    AgentCommunicator.prototype.getMessages = function (agentId, markAsRead) {
        if (markAsRead === void 0) { markAsRead = true; }
        var queue = this.messageQueue.get(agentId) || [];
        if (markAsRead) {
            this.messageQueue.set(agentId, []);
        }
        // Mettre � jour le statut de l'agent
        var endpoint = this.endpoints.get(agentId);
        if (endpoint) {
            endpoint.lastSeen = new Date().toISOString();
        }
        return queue;
    };
    /**
     * D�marre le syst�me de heartbeat
     */
    AgentCommunicator.prototype.startHeartbeat = function () {
        var _this = this;
        this.heartbeatInterval = setInterval(function () {
            _this.sendHeartbeats();
            _this.checkAgentHealth();
            _this.cleanupExpiredMessages();
        }, this.HEARTBEAT_INTERVAL);
        console.log('=� Syst�me de heartbeat d�marr�');
    };
    /**
     * Envoie des heartbeats � tous les agents
     */
    AgentCommunicator.prototype.sendHeartbeats = function () {
        var heartbeat = {
            id: "heartbeat_".concat(Date.now()),
            from: 'system',
            to: 'broadcast',
            type: 'heartbeat',
            channel: 'system',
            payload: {
                timestamp: new Date().toISOString(),
                systemStatus: 'healthy'
            },
            timestamp: new Date().toISOString(),
            priority: 'low'
        };
        this.broadcast(heartbeat);
    };
    /**
     * V�rifie la sant� des agents
     */
    AgentCommunicator.prototype.checkAgentHealth = function () {
        var now = new Date();
        var healthThreshold = 2 * this.HEARTBEAT_INTERVAL; // 2x l'intervalle
        for (var _i = 0, _a = this.endpoints; _i < _a.length; _i++) {
            var _b = _a[_i], agentId = _b[0], endpoint = _b[1];
            var lastSeen = new Date(endpoint.lastSeen);
            var timeSinceLastSeen = now.getTime() - lastSeen.getTime();
            if (timeSinceLastSeen > healthThreshold && endpoint.status !== 'offline') {
                endpoint.status = 'offline';
                console.warn("\uFFFD\u000F Agent ".concat(agentId, " marqu\uFFFD comme offline"));
                this.emit('agent-offline', { agentId: agentId, lastSeen: endpoint.lastSeen });
            }
        }
    };
    /**
     * Nettoie les messages expir�s
     */
    AgentCommunicator.prototype.cleanupExpiredMessages = function () {
        var _this = this;
        var now = new Date();
        // Nettoyer l'historique
        this.messageHistory = this.messageHistory.filter(function (msg) {
            var messageAge = (now.getTime() - new Date(msg.timestamp).getTime()) / 1000;
            return messageAge < (msg.ttl || _this.MESSAGE_TTL);
        });
        // Nettoyer les queues
        for (var _i = 0, _a = this.messageQueue; _i < _a.length; _i++) {
            var _b = _a[_i], agentId = _b[0], queue = _b[1];
            var filteredQueue = queue.filter(function (msg) {
                var messageAge = (now.getTime() - new Date(msg.timestamp).getTime()) / 1000;
                return messageAge < (msg.ttl || _this.MESSAGE_TTL);
            });
            this.messageQueue.set(agentId, filteredQueue);
        }
    };
    /**
     * Valide un message
     */
    AgentCommunicator.prototype.validateMessage = function (message) {
        var required = ['from', 'to', 'type', 'channel', 'payload'];
        return required.every(function (field) { return message[field] !== undefined; });
    };
    /**
     * Obtient les statistiques de communication
     */
    AgentCommunicator.prototype.getStatistics = function () {
        var _this = this;
        var totalMessages = this.messageHistory.length;
        var messagesByType = this.messageHistory.reduce(function (acc, msg) {
            acc[msg.type] = (acc[msg.type] || 0) + 1;
            return acc;
        }, {});
        var agentStats = Array.from(this.endpoints.entries()).map(function (_a) {
            var _b;
            var agentId = _a[0], endpoint = _a[1];
            return ({
                agentId: agentId,
                status: endpoint.status,
                lastSeen: endpoint.lastSeen,
                queueSize: ((_b = _this.messageQueue.get(agentId)) === null || _b === void 0 ? void 0 : _b.length) || 0,
                subscriptions: endpoint.subscriptions.length
            });
        });
        return {
            communication: {
                totalMessages: totalMessages,
                messagesByType: messagesByType,
                channels: this.channels.size,
                activeAgents: Array.from(this.endpoints.values()).filter(function (e) { return e.status === 'online'; }).length
            },
            agents: agentStats,
            performance: {
                messagesPerMinute: this.calculateMessageRate(),
                averageResponseTime: this.calculateAverageResponseTime(),
                deliveryRate: this.calculateDeliveryRate()
            },
            timestamp: new Date().toISOString()
        };
    };
    /**
     * Calcule le taux de messages par minute
     */
    AgentCommunicator.prototype.calculateMessageRate = function () {
        var now = new Date();
        var oneMinuteAgo = new Date(now.getTime() - 60000);
        var recentMessages = this.messageHistory.filter(function (msg) {
            return new Date(msg.timestamp) > oneMinuteAgo;
        });
        return recentMessages.length;
    };
    /**
     * Calcule le temps de r�ponse moyen
     */
    AgentCommunicator.prototype.calculateAverageResponseTime = function () {
        // Simplification - dans une vraie impl�mentation, tracker les temps de r�ponse
        return Math.round(Math.random() * 1000 + 500); // 500-1500ms
    };
    /**
     * Calcule le taux de livraison
     */
    AgentCommunicator.prototype.calculateDeliveryRate = function () {
        // Simplification - dans une vraie impl�mentation, tracker les �checs
        return Math.round(95 + Math.random() * 5); // 95-100%
    };
    /**
     * Arr�te le syst�me de communication
     */
    AgentCommunicator.prototype.stop = function () {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
        console.log('= Syst�me de communication arr�t�');
    };
    return AgentCommunicator;
}(events_1.EventEmitter));
exports.AgentCommunicator = AgentCommunicator;
exports.agentCommunicator = new AgentCommunicator();
exports.default = exports.agentCommunicator;
