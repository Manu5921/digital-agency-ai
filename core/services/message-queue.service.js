"use strict";
/**
 * Enterprise Message Queue Service with Redis Pub/Sub
 * Real-time communication backbone for agent coordination
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
exports.messageQueue = exports.EnterpriseMessageQueue = void 0;
var ioredis_1 = require("ioredis");
var events_1 = require("events");
var ws_1 = require("ws");
var http_1 = require("http");
var EnterpriseMessageQueue = /** @class */ (function (_super) {
    __extends(EnterpriseMessageQueue, _super);
    function EnterpriseMessageQueue(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.clients = new Map();
        _this.messageBuffer = new Map();
        _this.heartbeatInterval = null;
        _this.isRunning = false;
        // Performance metrics
        _this.metrics = {
            messagesProcessed: 0,
            messagesPerSecond: 0,
            averageLatency: 0,
            errorRate: 0,
            activeConnections: 0,
            lastMetricsReset: Date.now()
        };
        _this.config = {
            redis: __assign({ host: process.env.REDIS_HOST || 'localhost', port: parseInt(process.env.REDIS_PORT || '6379'), password: process.env.REDIS_PASSWORD, db: 0, retryDelayOnFailover: 100, maxRetriesPerRequest: 3 }, config.redis),
            websocket: __assign({ port: parseInt(process.env.WS_PORT || '8080'), heartbeatInterval: 30000, reconnectInterval: 5000 }, config.websocket),
            queue: __assign({ defaultTtl: 300000, maxRetries: 3, deadLetterQueue: true, batchSize: 100 }, config.queue)
        };
        _this.initializeRedis();
        _this.initializeWebSocket();
        return _this;
    }
    /**
     * Initialize Redis connections for pub/sub
     */
    EnterpriseMessageQueue.prototype.initializeRedis = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Main Redis connection
                        this.redis = new ioredis_1.default({
                            host: this.config.redis.host,
                            port: this.config.redis.port,
                            password: this.config.redis.password,
                            db: this.config.redis.db,
                            retryDelayOnFailover: this.config.redis.retryDelayOnFailover,
                            maxRetriesPerRequest: this.config.redis.maxRetriesPerRequest,
                            lazyConnect: true
                        });
                        // Publisher connection
                        this.publisher = new ioredis_1.default({
                            host: this.config.redis.host,
                            port: this.config.redis.port,
                            password: this.config.redis.password,
                            db: this.config.redis.db
                        });
                        // Subscriber connection
                        this.subscriber = new ioredis_1.default({
                            host: this.config.redis.host,
                            port: this.config.redis.port,
                            password: this.config.redis.password,
                            db: this.config.redis.db
                        });
                        // Setup Redis event handlers
                        this.redis.on('connect', function () {
                            console.log(' Redis connected');
                            _this.emit('redis-connected');
                        });
                        this.redis.on('error', function (error) {
                            console.error('L Redis error:', error);
                            _this.emit('redis-error', error);
                        });
                        // Setup subscriber patterns
                        return [4 /*yield*/, this.setupSubscriptions()];
                    case 1:
                        // Setup subscriber patterns
                        _a.sent();
                        console.log('= Redis pub/sub initialized');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('L Failed to initialize Redis:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Setup Redis subscription patterns
     */
    EnterpriseMessageQueue.prototype.setupSubscriptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channels, _i, channels_1, pattern;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channels = [
                            'agent:*',
                            'task:*',
                            'system:*',
                            'orchestrator:*',
                            'metrics:*',
                            'alerts:*'
                        ];
                        _i = 0, channels_1 = channels;
                        _a.label = 1;
                    case 1:
                        if (!(_i < channels_1.length)) return [3 /*break*/, 4];
                        pattern = channels_1[_i];
                        return [4 /*yield*/, this.subscriber.psubscribe(pattern)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.subscriber.on('pmessage', function (pattern, channel, message) {
                            _this.handleRedisMessage(pattern, channel, message);
                        });
                        console.log("=\uFFFD Subscribed to ".concat(channels.length, " channel patterns"));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initialize WebSocket server
     */
    EnterpriseMessageQueue.prototype.initializeWebSocket = function () {
        var _this = this;
        this.httpServer = (0, http_1.createServer)();
        this.wsServer = new ws_1.default.Server({
            server: this.httpServer,
            perMessageDeflate: true,
            maxPayload: 16 * 1024 * 1024 // 16MB
        });
        this.wsServer.on('connection', function (ws, request) {
            _this.handleNewConnection(ws, request);
        });
        this.wsServer.on('error', function (error) {
            console.error('L WebSocket server error:', error);
            _this.emit('websocket-error', error);
        });
        console.log('< WebSocket server initialized');
    };
    /**
     * Handle new WebSocket connection
     */
    EnterpriseMessageQueue.prototype.handleNewConnection = function (ws, request) {
        var _this = this;
        var clientId = this.generateClientId();
        var url = new URL(request.url || '', "http://".concat(request.headers.host));
        var agentId = url.searchParams.get('agentId') || 'unknown';
        var client = {
            id: clientId,
            agentId: agentId,
            ws: ws,
            lastSeen: Date.now(),
            subscriptions: new Set(['system', "agent:".concat(agentId)]),
            status: 'connected',
            metadata: {
                userAgent: request.headers['user-agent'],
                ip: request.connection.remoteAddress,
                connectedAt: Date.now()
            }
        };
        this.clients.set(clientId, client);
        this.metrics.activeConnections++;
        // Setup WebSocket event handlers
        ws.on('message', function (data) {
            _this.handleWebSocketMessage(clientId, data);
        });
        ws.on('close', function () {
            _this.handleClientDisconnect(clientId);
        });
        ws.on('error', function (error) {
            console.error("L WebSocket error for client ".concat(clientId, ":"), error);
            _this.handleClientError(clientId, error);
        });
        // Send welcome message
        this.sendToClient(clientId, {
            id: this.generateMessageId(),
            type: 'system',
            from: 'message-queue',
            to: agentId,
            channel: 'system',
            payload: {
                event: 'connected',
                clientId: clientId,
                timestamp: Date.now()
            },
            timestamp: Date.now(),
            priority: 'medium'
        });
        console.log("=\f Client ".concat(clientId, " (").concat(agentId, ") connected"));
        this.emit('client-connected', { clientId: clientId, agentId: agentId });
    };
    /**
     * Handle WebSocket message from client
     */
    EnterpriseMessageQueue.prototype.handleWebSocketMessage = function (clientId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var client, message, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        client = this.clients.get(clientId);
                        if (!client)
                            return [2 /*return*/];
                        client.lastSeen = Date.now();
                        message = JSON.parse(data.toString());
                        message.timestamp = Date.now();
                        message.id = message.id || this.generateMessageId();
                        // Validate message
                        if (!this.validateMessage(message)) {
                            throw new Error('Invalid message format');
                        }
                        // Process message based on type
                        return [4 /*yield*/, this.processMessage(message, clientId)];
                    case 1:
                        // Process message based on type
                        _a.sent();
                        this.metrics.messagesProcessed++;
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("L Error processing WebSocket message from ".concat(clientId, ":"), error_2);
                        this.handleClientError(clientId, error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Process incoming message
     */
    EnterpriseMessageQueue.prototype.processMessage = function (message, fromClientId) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, _a, latency, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startTime = Date.now();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 15, , 18]);
                        // Add message to Redis for persistence and distribution
                        return [4 /*yield*/, this.publishToRedis(message)];
                    case 2:
                        // Add message to Redis for persistence and distribution
                        _b.sent();
                        _a = message.type;
                        switch (_a) {
                            case 'task': return [3 /*break*/, 3];
                            case 'event': return [3 /*break*/, 5];
                            case 'heartbeat': return [3 /*break*/, 7];
                            case 'system': return [3 /*break*/, 9];
                            case 'alert': return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 13];
                    case 3: return [4 /*yield*/, this.handleTaskMessage(message)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 5: return [4 /*yield*/, this.handleEventMessage(message)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 7: return [4 /*yield*/, this.handleHeartbeat(message, fromClientId)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 9: return [4 /*yield*/, this.handleSystemMessage(message)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 11: return [4 /*yield*/, this.handleAlertMessage(message)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        console.warn("\uFFFD\u000F Unknown message type: ".concat(message.type));
                        _b.label = 14;
                    case 14:
                        latency = Date.now() - startTime;
                        this.updateLatencyMetrics(latency);
                        this.emit('message-processed', { message: message, latency: latency });
                        return [3 /*break*/, 18];
                    case 15:
                        error_3 = _b.sent();
                        console.error('L Error processing message:', error_3);
                        this.metrics.errorRate++;
                        if (!message.correlationId) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.sendErrorResponse(message, error_3.message)];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17: return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Publish message to Redis
     */
    EnterpriseMessageQueue.prototype.publishToRedis = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, serialized, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = "".concat(message.channel, ":").concat(message.to);
                        serialized = JSON.stringify(message);
                        return [4 /*yield*/, this.publisher.publish(channel, serialized)];
                    case 1:
                        _a.sent();
                        if (!message.ttl) return [3 /*break*/, 3];
                        key = "message:".concat(message.id);
                        return [4 /*yield*/, this.redis.setex(key, Math.floor(message.ttl / 1000), serialized)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handle Redis pub/sub messages
     */
    EnterpriseMessageQueue.prototype.handleRedisMessage = function (pattern, channel, message) {
        try {
            var parsedMessage = JSON.parse(message);
            // Route to appropriate WebSocket clients
            this.routeMessageToClients(parsedMessage);
            this.emit('redis-message', { pattern: pattern, channel: channel, message: parsedMessage });
        }
        catch (error) {
            console.error('L Error handling Redis message:', error);
        }
    };
    /**
     * Route message to appropriate WebSocket clients
     */
    EnterpriseMessageQueue.prototype.routeMessageToClients = function (message) {
        var recipients = Array.isArray(message.to) ? message.to : [message.to];
        for (var _i = 0, recipients_1 = recipients; _i < recipients_1.length; _i++) {
            var recipient = recipients_1[_i];
            if (recipient === 'broadcast') {
                // Send to all clients
                this.broadcastToAllClients(message);
            }
            else {
                // Send to specific agent clients
                this.sendToAgentClients(recipient, message);
            }
        }
    };
    /**
     * Send message to all clients
     */
    EnterpriseMessageQueue.prototype.broadcastToAllClients = function (message) {
        var sentCount = 0;
        for (var _i = 0, _a = this.clients.values(); _i < _a.length; _i++) {
            var client = _a[_i];
            if (client.status === 'connected' && client.ws.readyState === ws_1.default.OPEN) {
                try {
                    client.ws.send(JSON.stringify(message));
                    sentCount++;
                }
                catch (error) {
                    console.error("L Error sending to client ".concat(client.id, ":"), error);
                }
            }
        }
        console.log("=\uFFFD Broadcast message sent to ".concat(sentCount, " clients"));
    };
    /**
     * Send message to specific agent clients
     */
    EnterpriseMessageQueue.prototype.sendToAgentClients = function (agentId, message) {
        var agentClients = Array.from(this.clients.values())
            .filter(function (client) { return client.agentId === agentId && client.status === 'connected'; });
        var sentCount = 0;
        for (var _i = 0, agentClients_1 = agentClients; _i < agentClients_1.length; _i++) {
            var client = agentClients_1[_i];
            if (client.ws.readyState === ws_1.default.OPEN) {
                try {
                    client.ws.send(JSON.stringify(message));
                    sentCount++;
                }
                catch (error) {
                    console.error("L Error sending to agent ".concat(agentId, " client ").concat(client.id, ":"), error);
                }
            }
        }
        if (sentCount === 0) {
            // Buffer message for offline agent
            this.bufferMessage(agentId, message);
        }
        console.log("=\uFFFD Message sent to ".concat(sentCount, " clients for agent ").concat(agentId));
    };
    /**
     * Send message to specific client
     */
    EnterpriseMessageQueue.prototype.sendToClient = function (clientId, message) {
        var client = this.clients.get(clientId);
        if (client && client.status === 'connected' && client.ws.readyState === ws_1.default.OPEN) {
            try {
                client.ws.send(JSON.stringify(message));
            }
            catch (error) {
                console.error("L Error sending to client ".concat(clientId, ":"), error);
            }
        }
    };
    /**
     * Buffer message for offline agent
     */
    EnterpriseMessageQueue.prototype.bufferMessage = function (agentId, message) {
        if (!this.messageBuffer.has(agentId)) {
            this.messageBuffer.set(agentId, []);
        }
        var buffer = this.messageBuffer.get(agentId);
        buffer.push(message);
        // Limit buffer size
        if (buffer.length > this.config.queue.batchSize) {
            buffer.shift(); // Remove oldest message
        }
        console.log("=\uFFFD Message buffered for offline agent ".concat(agentId));
    };
    /**
     * Handle task messages
     */
    EnterpriseMessageQueue.prototype.handleTaskMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Route task-related messages to task scheduler
                this.emit('task-message', message);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Handle event messages
     */
    EnterpriseMessageQueue.prototype.handleEventMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Route event messages to event handlers
                this.emit('event-message', message);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Handle heartbeat messages
     */
    EnterpriseMessageQueue.prototype.handleHeartbeat = function (message, fromClientId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, response;
            return __generator(this, function (_a) {
                client = this.clients.get(fromClientId);
                if (client) {
                    client.lastSeen = Date.now();
                    client.status = 'connected';
                }
                response = {
                    id: this.generateMessageId(),
                    type: 'heartbeat',
                    from: 'message-queue',
                    to: message.from,
                    channel: 'system',
                    payload: {
                        event: 'heartbeat-ack',
                        timestamp: Date.now()
                    },
                    timestamp: Date.now(),
                    priority: 'low',
                    correlationId: message.id
                };
                this.sendToClient(fromClientId, response);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Handle system messages
     */
    EnterpriseMessageQueue.prototype.handleSystemMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emit('system-message', message);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Handle alert messages
     */
    EnterpriseMessageQueue.prototype.handleAlertMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // High priority alert handling
                this.emit('alert-message', message);
                // Also log critical alerts
                if (message.priority === 'critical') {
                    console.error('=� CRITICAL ALERT:', message.payload);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Handle client disconnect
     */
    EnterpriseMessageQueue.prototype.handleClientDisconnect = function (clientId) {
        var _this = this;
        var client = this.clients.get(clientId);
        if (client) {
            client.status = 'disconnected';
            this.metrics.activeConnections--;
            // Don't immediately remove - allow for reconnection
            setTimeout(function () {
                var _a;
                if (((_a = _this.clients.get(clientId)) === null || _a === void 0 ? void 0 : _a.status) === 'disconnected') {
                    _this.clients.delete(clientId);
                }
            }, this.config.websocket.reconnectInterval * 2);
            console.log("=\f Client ".concat(clientId, " (").concat(client.agentId, ") disconnected"));
            this.emit('client-disconnected', { clientId: clientId, agentId: client.agentId });
        }
    };
    /**
     * Handle client error
     */
    EnterpriseMessageQueue.prototype.handleClientError = function (clientId, error) {
        var client = this.clients.get(clientId);
        if (client) {
            client.status = 'error';
            console.error("L Client ".concat(clientId, " error:"), error);
            this.emit('client-error', { clientId: clientId, agentId: client.agentId, error: error });
        }
    };
    /**
     * Send error response
     */
    EnterpriseMessageQueue.prototype.sendErrorResponse = function (originalMessage, errorMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var errorResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorResponse = {
                            id: this.generateMessageId(),
                            type: 'system',
                            from: 'message-queue',
                            to: originalMessage.from,
                            channel: 'system',
                            payload: {
                                event: 'error',
                                originalMessageId: originalMessage.id,
                                error: errorMessage,
                                timestamp: Date.now()
                            },
                            timestamp: Date.now(),
                            priority: 'high',
                            correlationId: originalMessage.correlationId
                        };
                        return [4 /*yield*/, this.publishToRedis(errorResponse)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Start heartbeat monitoring
     */
    EnterpriseMessageQueue.prototype.startHeartbeat = function () {
        var _this = this;
        this.heartbeatInterval = setInterval(function () {
            _this.checkClientHealth();
            _this.updateMetrics();
            _this.cleanupExpiredMessages();
        }, this.config.websocket.heartbeatInterval);
        console.log('=� Heartbeat monitoring started');
    };
    /**
     * Check client health
     */
    EnterpriseMessageQueue.prototype.checkClientHealth = function () {
        var now = Date.now();
        var timeout = this.config.websocket.heartbeatInterval * 2;
        for (var _i = 0, _a = this.clients; _i < _a.length; _i++) {
            var _b = _a[_i], clientId = _b[0], client = _b[1];
            if (now - client.lastSeen > timeout && client.status === 'connected') {
                console.warn("\uFFFD\u000F Client ".concat(clientId, " appears unhealthy"));
                client.status = 'error';
                this.emit('client-unhealthy', { clientId: clientId, agentId: client.agentId });
            }
        }
    };
    /**
     * Update performance metrics
     */
    EnterpriseMessageQueue.prototype.updateMetrics = function () {
        var now = Date.now();
        var timeDelta = now - this.metrics.lastMetricsReset;
        if (timeDelta >= 60000) { // Every minute
            this.metrics.messagesPerSecond = Math.round((this.metrics.messagesProcessed * 1000) / timeDelta);
            // Reset counters
            this.metrics.messagesProcessed = 0;
            this.metrics.errorRate = 0;
            this.metrics.lastMetricsReset = now;
            this.emit('metrics-updated', this.metrics);
        }
    };
    /**
     * Update latency metrics
     */
    EnterpriseMessageQueue.prototype.updateLatencyMetrics = function (latency) {
        // Simple moving average
        this.metrics.averageLatency =
            (this.metrics.averageLatency * 0.9) + (latency * 0.1);
    };
    /**
     * Cleanup expired messages
     */
    EnterpriseMessageQueue.prototype.cleanupExpiredMessages = function () {
        var _this = this;
        var now = Date.now();
        for (var _i = 0, _a = this.messageBuffer; _i < _a.length; _i++) {
            var _b = _a[_i], agentId = _b[0], buffer = _b[1];
            var validMessages = buffer.filter(function (msg) {
                var age = now - msg.timestamp;
                var ttl = msg.ttl || _this.config.queue.defaultTtl;
                return age < ttl;
            });
            if (validMessages.length !== buffer.length) {
                this.messageBuffer.set(agentId, validMessages);
                console.log(">\uFFFD Cleaned ".concat(buffer.length - validMessages.length, " expired messages for ").concat(agentId));
            }
        }
    };
    /**
     * Validate message format
     */
    EnterpriseMessageQueue.prototype.validateMessage = function (message) {
        var required = ['type', 'from', 'to', 'channel', 'payload'];
        return required.every(function (field) { return message[field] !== undefined; });
    };
    /**
     * Generate unique client ID
     */
    EnterpriseMessageQueue.prototype.generateClientId = function () {
        return "client_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
    };
    /**
     * Generate unique message ID
     */
    EnterpriseMessageQueue.prototype.generateMessageId = function () {
        return "msg_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
    };
    /**
     * Public API methods
     */
    /**
     * Start the message queue service
     */
    EnterpriseMessageQueue.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isRunning) {
                            console.warn('� Message queue already running');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Connect to Redis
                        return [4 /*yield*/, this.redis.connect()];
                    case 2:
                        // Connect to Redis
                        _a.sent();
                        // Start WebSocket server
                        this.httpServer.listen(this.config.websocket.port, function () {
                            console.log("<\u0010 WebSocket server listening on port ".concat(_this.config.websocket.port));
                        });
                        // Start heartbeat
                        this.startHeartbeat();
                        this.isRunning = true;
                        console.log('=� Enterprise Message Queue started');
                        this.emit('started');
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error('L Failed to start message queue:', error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Stop the message queue service
     */
    EnterpriseMessageQueue.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, client, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isRunning) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        // Stop heartbeat
                        if (this.heartbeatInterval) {
                            clearInterval(this.heartbeatInterval);
                            this.heartbeatInterval = null;
                        }
                        // Close WebSocket connections
                        for (_i = 0, _a = this.clients.values(); _i < _a.length; _i++) {
                            client = _a[_i];
                            if (client.ws.readyState === ws_1.default.OPEN) {
                                client.ws.close();
                            }
                        }
                        // Close WebSocket server
                        this.wsServer.close();
                        this.httpServer.close();
                        // Disconnect Redis
                        return [4 /*yield*/, this.redis.disconnect()];
                    case 2:
                        // Disconnect Redis
                        _b.sent();
                        return [4 /*yield*/, this.publisher.disconnect()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.subscriber.disconnect()];
                    case 4:
                        _b.sent();
                        this.isRunning = false;
                        console.log('� Enterprise Message Queue stopped');
                        this.emit('stopped');
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _b.sent();
                        console.error('L Error stopping message queue:', error_5);
                        throw error_5;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send message through the queue
     */
    EnterpriseMessageQueue.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var fullMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullMessage = __assign({ id: this.generateMessageId(), timestamp: Date.now(), priority: 'medium' }, message);
                        if (!this.validateMessage(fullMessage)) {
                            throw new Error('Invalid message format');
                        }
                        return [4 /*yield*/, this.publishToRedis(fullMessage)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get current metrics
     */
    EnterpriseMessageQueue.prototype.getMetrics = function () {
        return {
            performance: __assign({}, this.metrics),
            clients: {
                total: this.clients.size,
                connected: Array.from(this.clients.values()).filter(function (c) { return c.status === 'connected'; }).length,
                disconnected: Array.from(this.clients.values()).filter(function (c) { return c.status === 'disconnected'; }).length,
                error: Array.from(this.clients.values()).filter(function (c) { return c.status === 'error'; }).length
            },
            buffer: {
                totalBuffered: Array.from(this.messageBuffer.values()).reduce(function (sum, arr) { return sum + arr.length; }, 0),
                agents: this.messageBuffer.size
            },
            system: {
                uptime: Date.now() - (this.metrics.lastMetricsReset - 60000),
                memoryUsage: process.memoryUsage(),
                isRunning: this.isRunning
            },
            timestamp: Date.now()
        };
    };
    /**
     * Get client information
     */
    EnterpriseMessageQueue.prototype.getClients = function () {
        return Array.from(this.clients.values()).map(function (client) { return ({
            id: client.id,
            agentId: client.agentId,
            lastSeen: client.lastSeen,
            subscriptions: client.subscriptions,
            status: client.status,
            metadata: client.metadata
        }); });
    };
    /**
     * Get buffered messages for an agent
     */
    EnterpriseMessageQueue.prototype.getBufferedMessages = function (agentId) {
        return this.messageBuffer.get(agentId) || [];
    };
    /**
     * Clear buffer for an agent
     */
    EnterpriseMessageQueue.prototype.clearBuffer = function (agentId) {
        this.messageBuffer.delete(agentId);
        console.log(">\uFFFD Buffer cleared for agent ".concat(agentId));
    };
    return EnterpriseMessageQueue;
}(events_1.EventEmitter));
exports.EnterpriseMessageQueue = EnterpriseMessageQueue;
// Export singleton instance
exports.messageQueue = new EnterpriseMessageQueue();
exports.default = exports.messageQueue;
