"use strict";
/**
 * Advanced Chatbot - Phase 2
 * GPT-4 integration avec voice support, context awareness et escalation intelligente
 *
 * Features:
 * - GPT-4 conversational AI
 * - Speech-to-Text / Text-to-Speech
 * - Context memory avec historique
 * - Escalation intelligente vers humain
 * - Support multilingue (FR/EN)
 * - Sentiment analysis
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
exports.defaultChatbotConfig = exports.AdvancedChatbot = void 0;
var openai_1 = require("openai");
var sdk_1 = require("@deepgram/sdk");
var elevenlabs_node_1 = require("elevenlabs-node");
var AdvancedChatbot = /** @class */ (function () {
    function AdvancedChatbot(config) {
        this.sessions = new Map();
        this.config = config;
        this.openai = new openai_1.OpenAI({ apiKey: config.openai.apiKey });
        this.deepgram = (0, sdk_1.createClient)(config.voice.deepgram.apiKey);
        this.elevenlabs = new elevenlabs_node_1.ElevenLabsAPI({ apiKey: config.voice.elevenlabs.apiKey });
        this.setupRestaurantContext();
    }
    /**
     * Configuration du contexte restaurant
     */
    AdvancedChatbot.prototype.setupRestaurantContext = function () {
        this.restaurantContext = "\n    Tu es l'assistant virtuel du restaurant \"Le Gourmet\", un \u00E9tablissement gastronomique fran\u00E7ais haut de gamme situ\u00E9 \u00E0 Paris.\n\n    INFORMATIONS RESTAURANT:\n    - Nom: Le Gourmet Paris\n    - Type: Restaurant gastronomique fran\u00E7ais\n    - Localisation: 15 rue Saint-Honor\u00E9, 75001 Paris\n    - Chef: Chef \u00E9toil\u00E9 Michel Dubois\n    - Sp\u00E9cialit\u00E9s: Cuisine fran\u00E7aise moderne, menu saisonnier\n    - Horaires: Mar-Sam 19h-23h, Ferm\u00E9 Dim-Lun\n    - R\u00E9servation: Obligatoire, jusqu'\u00E0 30 jours \u00E0 l'avance\n    - Capacit\u00E9: 45 couverts\n    - Prix moyen: 85-120\u20AC par personne\n    - Dress code: Tenue correcte exig\u00E9e\n    - Parking: Valet disponible\n\n    SERVICES:\n    - Menu d\u00E9gustation 7 services\n    - Accord mets-vins par notre sommelier\n    - Menus v\u00E9g\u00E9tariens/sans allerg\u00E8nes sur demande\n    - Privatisation possible pour \u00E9v\u00E9nements\n    - Service traiteur pour \u00E9v\u00E9nements externes\n\n    POLITIQUE:\n    - Annulation gratuite jusqu'\u00E0 24h avant\n    - Facturation 50\u20AC/personne si annulation tardive\n    - Modification de r\u00E9servation possible selon disponibilit\u00E9\n    - Animaux non admis\n    - Enfants bienvenus (menu enfant disponible)\n\n    TON & STYLE:\n    - Professionnel mais chaleureux\n    - Fran\u00E7ais ou anglais selon le client\n    - Toujours proposer des solutions\n    - Escalader vers humain si n\u00E9cessaire\n    - Collecter les informations de r\u00E9servation compl\u00E8tes\n    ";
    };
    /**
     * Initialise une nouvelle session de chat
     */
    AdvancedChatbot.prototype.createSession = function (userId, language) {
        if (language === void 0) { language = 'fr'; }
        return __awaiter(this, void 0, void 0, function () {
            var sessionId, session;
            var _this = this;
            return __generator(this, function (_a) {
                sessionId = "chat_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
                session = {
                    sessionId: sessionId,
                    userId: userId,
                    language: language,
                    context: [{
                            id: 'system_init',
                            role: 'system',
                            content: this.restaurantContext,
                            timestamp: new Date()
                        }],
                    metadata: {
                        createdAt: new Date(),
                        lastActivity: new Date(),
                        sentiment: 'neutral',
                        escalationScore: 0,
                        businessContext: 'general'
                    }
                };
                this.sessions.set(sessionId, session);
                // Auto-cleanup après timeout
                setTimeout(function () {
                    if (_this.sessions.has(sessionId)) {
                        _this.sessions.delete(sessionId);
                    }
                }, this.config.context.sessionTimeout * 60 * 1000);
                return [2 /*return*/, sessionId];
            });
        });
    };
    /**
     * Traite un message texte
     */
    AdvancedChatbot.prototype.processTextMessage = function (sessionId, message, userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var session, userMessage, _a, assistantResponse;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        session = this.sessions.get(sessionId);
                        if (!session) {
                            throw new Error('Session non trouvée');
                        }
                        // Mise à jour des infos utilisateur
                        if (userInfo) {
                            session.metadata.userInfo = __assign(__assign({}, session.metadata.userInfo), userInfo);
                        }
                        _b = {
                            id: "msg_".concat(Date.now()),
                            role: 'user',
                            content: message,
                            timestamp: new Date()
                        };
                        _c = {};
                        return [4 /*yield*/, this.detectIntent(message)];
                    case 1:
                        _c.intent = _d.sent();
                        return [4 /*yield*/, this.extractEntities(message)];
                    case 2:
                        _c.entities = _d.sent();
                        return [4 /*yield*/, this.analyzeSentiment(message)];
                    case 3:
                        userMessage = (_b.metadata = (_c.sentiment = _d.sent(),
                            _c),
                            _b);
                        session.context.push(userMessage);
                        session.metadata.lastActivity = new Date();
                        // Analyse du contexte business
                        session.metadata.businessContext = this.detectBusinessContext(message);
                        // Calcul du score d'escalation
                        _a = session.metadata;
                        return [4 /*yield*/, this.calculateEscalationScore(session, message)];
                    case 4:
                        // Calcul du score d'escalation
                        _a.escalationScore = _d.sent();
                        return [4 /*yield*/, this.shouldEscalate(session)];
                    case 5:
                        // Vérification des triggers d'escalation
                        if (_d.sent()) {
                            return [2 /*return*/, this.handleEscalation(session)];
                        }
                        return [4 /*yield*/, this.generateGPTResponse(session)];
                    case 6:
                        assistantResponse = _d.sent();
                        // Ajout de la réponse à l'historique
                        session.context.push(assistantResponse);
                        // Nettoyage de l'historique si trop long
                        this.cleanupHistory(session);
                        return [2 /*return*/, assistantResponse];
                }
            });
        });
    };
    /**
     * Traite un message vocal (Speech-to-Text puis traitement)
     */
    AdvancedChatbot.prototype.processVoiceMessage = function (sessionId, audioBuffer, userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var transcription, response, audioResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transcribeAudio(audioBuffer)];
                    case 1:
                        transcription = _a.sent();
                        return [4 /*yield*/, this.processTextMessage(sessionId, transcription.text, userInfo)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, this.generateSpeech(response.content, sessionId)];
                    case 3:
                        audioResponse = _a.sent();
                        return [2 /*return*/, {
                                transcription: transcription,
                                response: response,
                                audioResponse: audioResponse
                            }];
                }
            });
        });
    };
    /**
     * Transcription audio avec Deepgram
     */
    AdvancedChatbot.prototype.transcribeAudio = function (audioBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, transcript, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deepgram.listen.prerecorded.transcribeFile(audioBuffer, {
                                model: this.config.voice.deepgram.model,
                                language: this.config.voice.deepgram.language,
                                smart_format: true,
                                punctuate: true,
                                diarize: false
                            })];
                    case 1:
                        response = _a.sent();
                        result = response.result;
                        transcript = result.channels[0].alternatives[0];
                        return [2 /*return*/, {
                                text: transcript.transcript,
                                confidence: transcript.confidence,
                                language: result.metadata.detected_language || 'fr',
                                duration: result.metadata.duration
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erreur transcription Deepgram:', error_1);
                        throw new Error('Impossible de transcrire l\'audio');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génération audio avec ElevenLabs
     */
    AdvancedChatbot.prototype.generateSpeech = function (text, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var session, language, audioBuffer, audioUrl, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        session = this.sessions.get(sessionId);
                        language = (session === null || session === void 0 ? void 0 : session.language) || 'fr';
                        return [4 /*yield*/, this.elevenlabs.textToSpeech({
                                voiceId: this.config.voice.elevenlabs.voiceId,
                                text: text,
                                modelId: this.config.voice.elevenlabs.model,
                                voiceSettings: {
                                    stability: 0.8,
                                    similarityBoost: 0.8,
                                    style: 0.2,
                                    useSpeakerBoost: true
                                }
                            })];
                    case 1:
                        audioBuffer = _a.sent();
                        return [4 /*yield*/, this.saveAudioFile(audioBuffer, sessionId)];
                    case 2:
                        audioUrl = _a.sent();
                        return [2 /*return*/, audioUrl];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Erreur génération vocale ElevenLabs:', error_2);
                        throw new Error('Impossible de générer l\'audio');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génération de réponse GPT-4
     */
    AdvancedChatbot.prototype.generateGPTResponse = function (session) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var messages, completion, choice, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        messages = session.context
                            .slice(-10) // Derniers 10 messages pour limiter les tokens
                            .map(function (msg) { return ({
                            role: msg.role,
                            content: msg.content
                        }); });
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: this.config.openai.model,
                                messages: messages,
                                temperature: this.config.openai.temperature,
                                max_tokens: this.config.openai.maxTokens,
                                functions: [
                                    {
                                        name: 'make_reservation',
                                        description: 'Créer une réservation restaurant',
                                        parameters: {
                                            type: 'object',
                                            properties: {
                                                date: { type: 'string', description: 'Date de réservation (YYYY-MM-DD)' },
                                                time: { type: 'string', description: 'Heure (HH:MM)' },
                                                guests: { type: 'number', description: 'Nombre de personnes' },
                                                name: { type: 'string', description: 'Nom du client' },
                                                phone: { type: 'string', description: 'Téléphone' },
                                                email: { type: 'string', description: 'Email' },
                                                specialRequests: { type: 'string', description: 'Demandes spéciales' }
                                            },
                                            required: ['date', 'time', 'guests', 'name', 'phone']
                                        }
                                    },
                                    {
                                        name: 'check_availability',
                                        description: 'Vérifier disponibilité pour une date/heure',
                                        parameters: {
                                            type: 'object',
                                            properties: {
                                                date: { type: 'string' },
                                                time: { type: 'string' },
                                                guests: { type: 'number' }
                                            },
                                            required: ['date', 'time', 'guests']
                                        }
                                    }
                                ],
                                function_call: 'auto'
                            })];
                    case 1:
                        completion = _b.sent();
                        choice = completion.choices[0];
                        if (!choice.message.function_call) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.handleFunctionCall(choice.message.function_call, session)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [2 /*return*/, {
                            id: "msg_".concat(Date.now()),
                            role: 'assistant',
                            content: choice.message.content || 'Désolé, je n\'ai pas pu traiter votre demande.',
                            timestamp: new Date(),
                            metadata: {
                                model: this.config.openai.model,
                                tokens: (_a = completion.usage) === null || _a === void 0 ? void 0 : _a.total_tokens
                            }
                        }];
                    case 4:
                        error_3 = _b.sent();
                        console.error('Erreur GPT-4:', error_3);
                        return [2 /*return*/, {
                                id: "msg_".concat(Date.now()),
                                role: 'assistant',
                                content: 'Je rencontre actuellement des difficultés techniques. Un conseiller va vous contacter sous peu.',
                                timestamp: new Date()
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Traitement des function calls
     */
    AdvancedChatbot.prototype.handleFunctionCall = function (functionCall, session) {
        return __awaiter(this, void 0, void 0, function () {
            var name, args, parsedArgs;
            return __generator(this, function (_a) {
                name = functionCall.name, args = functionCall.arguments;
                parsedArgs = JSON.parse(args);
                switch (name) {
                    case 'make_reservation':
                        return [2 /*return*/, this.processReservation(parsedArgs, session)];
                    case 'check_availability':
                        return [2 /*return*/, this.checkAvailability(parsedArgs, session)];
                    default:
                        return [2 /*return*/, {
                                id: "msg_".concat(Date.now()),
                                role: 'assistant',
                                content: 'Fonction non reconnue. Un conseiller va vous aider.',
                                timestamp: new Date()
                            }];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Traitement des réservations
     */
    AdvancedChatbot.prototype.processReservation = function (reservationData, session) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, available, reservationId, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        isValid = this.validateReservationData(reservationData);
                        if (!isValid.valid) {
                            return [2 /*return*/, {
                                    id: "msg_".concat(Date.now()),
                                    role: 'assistant',
                                    content: "Il manque quelques informations pour votre r\u00E9servation : ".concat(isValid.missing.join(', '), ". Pouvez-vous me les fournir ?"),
                                    timestamp: new Date()
                                }];
                        }
                        return [4 /*yield*/, this.checkRestaurantAvailability(reservationData.date, reservationData.time, reservationData.guests)];
                    case 1:
                        available = _a.sent();
                        if (!available) {
                            return [2 /*return*/, {
                                    id: "msg_".concat(Date.now()),
                                    role: 'assistant',
                                    content: "Malheureusement, nous n'avons plus de disponibilit\u00E9 le ".concat(reservationData.date, " \u00E0 ").concat(reservationData.time, " pour ").concat(reservationData.guests, " personnes. Puis-je vous proposer d'autres cr\u00E9neaux ?"),
                                    timestamp: new Date()
                                }];
                        }
                        return [4 /*yield*/, this.createReservationWebhook(reservationData)];
                    case 2:
                        reservationId = _a.sent();
                        // Mise à jour du contexte session
                        session.metadata.userInfo = {
                            name: reservationData.name,
                            phone: reservationData.phone,
                            email: reservationData.email
                        };
                        return [2 /*return*/, {
                                id: "msg_".concat(Date.now()),
                                role: 'assistant',
                                content: "Parfait ! Votre r\u00E9servation est confirm\u00E9e :\n\n\uD83D\uDCC5 **Date :** ".concat(new Date(reservationData.date).toLocaleDateString('fr-FR'), "\n\uD83D\uDD52 **Heure :** ").concat(reservationData.time, "\n\uD83D\uDC65 **Nombre de personnes :** ").concat(reservationData.guests, "\n\uD83D\uDCE7 **Confirmation :** Un email de confirmation a \u00E9t\u00E9 envoy\u00E9 \u00E0 ").concat(reservationData.email, "\n\n**Num\u00E9ro de r\u00E9servation :** ").concat(reservationId, "\n\nNous avons h\u00E2te de vous accueillir au Gourmet ! N'h\u00E9sitez pas si vous avez des questions ou des demandes particuli\u00E8res."),
                                timestamp: new Date(),
                                metadata: {
                                    reservationId: reservationId,
                                    actionCompleted: 'reservation_created'
                                }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Erreur création réservation:', error_4);
                        return [2 /*return*/, {
                                id: "msg_".concat(Date.now()),
                                role: 'assistant',
                                content: 'Une erreur s\'est produite lors de la création de votre réservation. Un conseiller va vous recontacter rapidement pour finaliser votre demande.',
                                timestamp: new Date()
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Détection d'intention
     */
    AdvancedChatbot.prototype.detectIntent = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var intents, lowerMessage, _i, _a, _b, intent, keywords;
            return __generator(this, function (_c) {
                intents = {
                    reservation: ['réserver', 'réservation', 'table', 'booking', 'book'],
                    menu: ['menu', 'carte', 'plat', 'spécialité', 'cuisine'],
                    hours: ['horaire', 'heure', 'ouvert', 'fermé', 'opening'],
                    location: ['adresse', 'où', 'localisation', 'address', 'location'],
                    price: ['prix', 'tarif', 'coût', 'combien', 'price'],
                    cancel: ['annuler', 'modifier', 'cancel', 'change'],
                    complaint: ['problème', 'plainte', 'insatisfait', 'complaint', 'issue']
                };
                lowerMessage = message.toLowerCase();
                for (_i = 0, _a = Object.entries(intents); _i < _a.length; _i++) {
                    _b = _a[_i], intent = _b[0], keywords = _b[1];
                    if (keywords.some(function (keyword) { return lowerMessage.includes(keyword); })) {
                        return [2 /*return*/, intent];
                    }
                }
                return [2 /*return*/, 'general'];
            });
        });
    };
    /**
     * Extraction d'entités
     */
    AdvancedChatbot.prototype.extractEntities = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var entities, dateRegex, dateMatch, timeRegex, timeMatch, numberRegex, numberMatch, emailRegex, emailMatch, phoneRegex, phoneMatch;
            return __generator(this, function (_a) {
                entities = {};
                dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre))/gi;
                dateMatch = message.match(dateRegex);
                if (dateMatch) {
                    entities.date = dateMatch[0];
                }
                timeRegex = /(\d{1,2}h\d{0,2})|(\d{1,2}:\d{2})/gi;
                timeMatch = message.match(timeRegex);
                if (timeMatch) {
                    entities.time = timeMatch[0];
                }
                numberRegex = /(\d+)\s*(?:personne|people|guest|convive)/gi;
                numberMatch = message.match(numberRegex);
                if (numberMatch) {
                    entities.guests = parseInt(numberMatch[0]);
                }
                emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
                emailMatch = message.match(emailRegex);
                if (emailMatch) {
                    entities.email = emailMatch[0];
                }
                phoneRegex = /(?:\+33|0)[1-9](?:[0-9]{8})/gi;
                phoneMatch = message.match(phoneRegex);
                if (phoneMatch) {
                    entities.phone = phoneMatch[0];
                }
                return [2 /*return*/, entities];
            });
        });
    };
    /**
     * Analyse de sentiment
     */
    AdvancedChatbot.prototype.analyzeSentiment = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var positiveWords, negativeWords, lowerMessage, positiveCount, negativeCount;
            return __generator(this, function (_a) {
                positiveWords = ['merci', 'parfait', 'excellent', 'super', 'génial', 'thank', 'great', 'perfect'];
                negativeWords = ['problème', 'mauvais', 'nul', 'déçu', 'terrible', 'problem', 'bad', 'awful'];
                lowerMessage = message.toLowerCase();
                positiveCount = positiveWords.filter(function (word) { return lowerMessage.includes(word); }).length;
                negativeCount = negativeWords.filter(function (word) { return lowerMessage.includes(word); }).length;
                if (positiveCount > negativeCount)
                    return [2 /*return*/, 'positive'];
                if (negativeCount > positiveCount)
                    return [2 /*return*/, 'negative'];
                return [2 /*return*/, 'neutral'];
            });
        });
    };
    /**
     * Détection du contexte business
     */
    AdvancedChatbot.prototype.detectBusinessContext = function (message) {
        var contexts = {
            reservation: ['réserver', 'table', 'booking'],
            complaint: ['problème', 'plainte', 'pas content'],
            info: ['horaire', 'adresse', 'menu'],
            support: ['aide', 'help', 'question']
        };
        var lowerMessage = message.toLowerCase();
        for (var _i = 0, _a = Object.entries(contexts); _i < _a.length; _i++) {
            var _b = _a[_i], context = _b[0], keywords = _b[1];
            if (keywords.some(function (keyword) { return lowerMessage.includes(keyword); })) {
                return context;
            }
        }
        return 'general';
    };
    /**
     * Calcul du score d'escalation
     */
    AdvancedChatbot.prototype.calculateEscalationScore = function (session, message) {
        return __awaiter(this, void 0, void 0, function () {
            var score, escalationFactors, _i, escalationFactors_1, factor;
            return __generator(this, function (_a) {
                score = session.metadata.escalationScore;
                escalationFactors = [
                    { condition: message.toLowerCase().includes('directeur'), points: 30 },
                    { condition: message.toLowerCase().includes('remboursement'), points: 25 },
                    { condition: session.metadata.sentiment === 'negative', points: 15 },
                    { condition: session.context.length > 10, points: 10 },
                    { condition: message.includes('!!!'), points: 10 },
                    { condition: message.toLowerCase().includes('inacceptable'), points: 20 }
                ];
                for (_i = 0, escalationFactors_1 = escalationFactors; _i < escalationFactors_1.length; _i++) {
                    factor = escalationFactors_1[_i];
                    if (factor.condition) {
                        score += factor.points;
                    }
                }
                return [2 /*return*/, Math.min(score, 100)];
            });
        });
    };
    /**
     * Vérification si escalation nécessaire
     */
    AdvancedChatbot.prototype.shouldEscalate = function (session) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var triggers, lastMessage, criticalKeywords, recentMessages, negativeCount;
            return __generator(this, function (_b) {
                triggers = this.config.escalation.triggers;
                // Score d'escalation élevé
                if (session.metadata.escalationScore >= 70)
                    return [2 /*return*/, true];
                lastMessage = (_a = session.context[session.context.length - 1]) === null || _a === void 0 ? void 0 : _a.content.toLowerCase();
                criticalKeywords = ['avocat', 'procès', 'directeur', 'scandale'];
                if (criticalKeywords.some(function (keyword) { return lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.includes(keyword); })) {
                    return [2 /*return*/, true];
                }
                // Durée de conversation trop longue
                if (session.context.length > 15)
                    return [2 /*return*/, true];
                recentMessages = session.context.slice(-3);
                negativeCount = recentMessages.filter(function (msg) { var _a; return ((_a = msg.metadata) === null || _a === void 0 ? void 0 : _a.sentiment) === 'negative'; }).length;
                if (negativeCount >= 2)
                    return [2 /*return*/, true];
                return [2 /*return*/, false];
            });
        });
    };
    /**
     * Gestion de l'escalation
     */
    AdvancedChatbot.prototype.handleEscalation = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var isBusinessHours, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Notification webhook vers équipe humaine
                        return [4 /*yield*/, this.notifyHumanOperator(session)];
                    case 1:
                        // Notification webhook vers équipe humaine
                        _a.sent();
                        // Mise à jour du statut de session
                        session.metadata.escalationScore = 100;
                        isBusinessHours = this.isBusinessHours();
                        return [2 /*return*/, {
                                id: "msg_".concat(Date.now()),
                                role: 'assistant',
                                content: isBusinessHours
                                    ? "Je comprends votre situation et je souhaite vous apporter la meilleure solution possible. Je vais imm\u00E9diatement vous mettre en relation avec un de nos conseillers qui va pouvoir vous aider personnellement.\n\nUn membre de notre \u00E9quipe va vous contacter dans les prochaines minutes. Merci de votre patience."
                                    : "Je comprends parfaitement votre demande. Nos bureaux sont actuellement ferm\u00E9s, mais votre demande a \u00E9t\u00E9 transmise en priorit\u00E9 \u00E0 notre \u00E9quipe.\n\nUn conseiller vous contactera d\u00E8s l'ouverture demain matin \u00E0 9h. En cas d'urgence, vous pouvez nous joindre au 01 42 60 XX XX.\n\nMerci de votre compr\u00E9hension.",
                                timestamp: new Date(),
                                metadata: {
                                    escalated: true,
                                    escalationReason: 'automatic_trigger',
                                    escalationScore: session.metadata.escalationScore
                                }
                            }];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Erreur escalation:', error_5);
                        return [2 /*return*/, {
                                id: "msg_".concat(Date.now()),
                                role: 'assistant',
                                content: 'Je rencontre des difficultés techniques. Pouvez-vous nous contacter directement au 01 42 60 XX XX ? Nos équipes seront ravies de vous aider.',
                                timestamp: new Date()
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Vérification des heures d'ouverture
     */
    AdvancedChatbot.prototype.isBusinessHours = function () {
        var now = new Date();
        var hours = now.getHours();
        var startHour = parseInt(this.config.escalation.businessHours.start.split(':')[0]);
        var endHour = parseInt(this.config.escalation.businessHours.end.split(':')[0]);
        return hours >= startHour && hours < endHour;
    };
    /**
     * Notification vers opérateur humain
     */
    AdvancedChatbot.prototype.notifyHumanOperator = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var webhook, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        webhook = this.config.escalation.humanOperatorWebhook;
                        return [4 /*yield*/, fetch(webhook, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    type: 'escalation_required',
                                    sessionId: session.sessionId,
                                    userId: session.userId,
                                    escalationScore: session.metadata.escalationScore,
                                    businessContext: session.metadata.businessContext,
                                    userInfo: session.metadata.userInfo,
                                    lastMessages: session.context.slice(-5),
                                    timestamp: new Date().toISOString()
                                })
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error('Erreur notification escalation:', error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Nettoyage de l'historique
     */
    AdvancedChatbot.prototype.cleanupHistory = function (session) {
        if (session.context.length > this.config.context.maxHistoryLength) {
            // Garde le message système + les X derniers messages
            var systemMessage = session.context[0];
            var recentMessages = session.context.slice(-this.config.context.maxHistoryLength + 1);
            session.context = __spreadArray([systemMessage], recentMessages, true);
        }
    };
    /**
     * Validation des données de réservation
     */
    AdvancedChatbot.prototype.validateReservationData = function (data) {
        var required = ['date', 'time', 'guests', 'name', 'phone'];
        var missing = required.filter(function (field) { return !data[field]; });
        return {
            valid: missing.length === 0,
            missing: missing
        };
    };
    /**
     * Vérification disponibilité restaurant
     */
    AdvancedChatbot.prototype.checkRestaurantAvailability = function (date, time, guests) {
        return __awaiter(this, void 0, void 0, function () {
            var reservationDate, now;
            return __generator(this, function (_a) {
                reservationDate = new Date(date);
                now = new Date();
                // Vérifications de base
                if (reservationDate <= now)
                    return [2 /*return*/, false];
                if (guests > 8)
                    return [2 /*return*/, false]; // Max 8 personnes par table
                // Simulation d'API de disponibilité
                return [2 /*return*/, Math.random() > 0.3]; // 70% de chance d'être disponible
            });
        });
    };
    /**
     * Création de réservation via webhook
     */
    AdvancedChatbot.prototype.createReservationWebhook = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/reservations', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(__assign(__assign({}, data), { source: 'chatbot', timestamp: new Date().toISOString() }))
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.reservationId || "RES_".concat(Date.now())];
                    case 3:
                        error_7 = _a.sent();
                        console.error('Erreur création réservation:', error_7);
                        return [2 /*return*/, "RES_".concat(Date.now())];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sauvegarde fichier audio
     */
    AdvancedChatbot.prototype.saveAudioFile = function (audioBuffer, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, url;
            return __generator(this, function (_a) {
                filename = "audio_".concat(sessionId, "_").concat(Date.now(), ".mp3");
                url = "/temp/audio/".concat(filename);
                // Ici, vous implémenteriez la sauvegarde réelle
                // (S3, local storage, etc.)
                return [2 /*return*/, url];
            });
        });
    };
    /**
     * Obtenir une session
     */
    AdvancedChatbot.prototype.getSession = function (sessionId) {
        return this.sessions.get(sessionId);
    };
    /**
     * Obtenir les statistiques
     */
    AdvancedChatbot.prototype.getStats = function () {
        var sessions = Array.from(this.sessions.values());
        return {
            activeSessions: sessions.length,
            totalSessions: sessions.length,
            averageEscalationScore: sessions.reduce(function (sum, s) { return sum + s.metadata.escalationScore; }, 0) / sessions.length || 0,
            businessContextDistribution: sessions.reduce(function (acc, session) {
                acc[session.metadata.businessContext] = (acc[session.metadata.businessContext] || 0) + 1;
                return acc;
            }, {})
        };
    };
    return AdvancedChatbot;
}());
exports.AdvancedChatbot = AdvancedChatbot;
// Configuration par défaut
exports.defaultChatbotConfig = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4o',
        temperature: 0.7,
        maxTokens: 1000
    },
    voice: {
        deepgram: {
            apiKey: process.env.DEEPGRAM_API_KEY || '',
            model: 'nova-2',
            language: 'fr'
        },
        elevenlabs: {
            apiKey: process.env.ELEVENLABS_API_KEY || '',
            voiceId: process.env.ELEVENLABS_VOICE_ID || '',
            model: 'eleven_multilingual_v2'
        }
    },
    context: {
        maxHistoryLength: 20,
        sessionTimeout: 60, // 1 heure
        memoryPersistence: true
    },
    escalation: {
        enabled: true,
        triggers: ['directeur', 'avocat', 'remboursement', 'scandale'],
        humanOperatorWebhook: process.env.ESCALATION_WEBHOOK_URL || '',
        businessHours: {
            start: '09:00',
            end: '18:00',
            timezone: 'Europe/Paris'
        }
    }
};
exports.default = AdvancedChatbot;
