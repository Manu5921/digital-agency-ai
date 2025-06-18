"use strict";
/**
 * Document AI - Phase 2
 * Analyse de contrats automatisée avec extraction d'informations structurées
 *
 * Features:
 * - OCR avancé avec Google Vision AI
 * - Analyse de contrats avec GPT-4
 * - Extraction d'entités structurées
 * - Classification automatique de documents
 * - Validation juridique automatique
 * - Détection d'anomalies et alertes
 * - Export en formats multiples (JSON, Excel, PDF)
 */
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
exports.defaultDocumentAIConfig = exports.DocumentAI = void 0;
var vision_1 = require("@google-cloud/vision");
var openai_1 = require("openai");
var XLSX = require("xlsx");
var PDFDocument = require("pdfkit");
var DocumentAI = /** @class */ (function () {
    function DocumentAI(config) {
        this.documentCache = new Map();
        this.config = config;
        this.visionClient = new vision_1.ImageAnnotatorClient({
            projectId: config.googleVision.projectId,
            keyFilename: config.googleVision.keyFilename
        });
        this.openai = new openai_1.OpenAI({ apiKey: config.openai.apiKey });
    }
    /**
     * Analyse complète d'un document
     */
    DocumentAI.prototype.analyzeDocument = function (filePath, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var startTime, documentId, extractedData, documentType, structuredInfo, validation, anomalies, metadata, analysis, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        documentId = this.generateDocumentId();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        console.log("[DocumentAI] D\u00E9but d'analyse: ".concat(filePath));
                        return [4 /*yield*/, this.performOCR(filePath, options)];
                    case 2:
                        extractedData = _a.sent();
                        return [4 /*yield*/, this.classifyDocument(extractedData.rawText)];
                    case 3:
                        documentType = _a.sent();
                        return [4 /*yield*/, this.analyzeWithGPT4(extractedData, documentType)];
                    case 4:
                        structuredInfo = _a.sent();
                        return [4 /*yield*/, this.validateDocument(structuredInfo, extractedData)];
                    case 5:
                        validation = _a.sent();
                        return [4 /*yield*/, this.detectAnomalies(structuredInfo, extractedData)];
                    case 6:
                        anomalies = _a.sent();
                        return [4 /*yield*/, this.extractMetadata(filePath)];
                    case 7:
                        metadata = _a.sent();
                        analysis = {
                            documentId: documentId,
                            filename: filePath.split('/').pop() || 'unknown',
                            type: documentType,
                            confidence: this.calculateOverallConfidence(extractedData, structuredInfo, validation),
                            extractedData: extractedData,
                            structuredInfo: structuredInfo,
                            validation: validation,
                            anomalies: anomalies,
                            metadata: metadata,
                            processingTime: Date.now() - startTime,
                            createdAt: new Date()
                        };
                        // Cache et sauvegarde
                        this.documentCache.set(documentId, analysis);
                        return [4 /*yield*/, this.saveAnalysis(analysis)];
                    case 8:
                        _a.sent();
                        // Notifications si nécessaire
                        return [4 /*yield*/, this.handleNotifications(analysis)];
                    case 9:
                        // Notifications si nécessaire
                        _a.sent();
                        console.log("[DocumentAI] Analyse termin\u00E9e: ".concat(analysis.processingTime, "ms"));
                        return [2 /*return*/, analysis];
                    case 10:
                        error_1 = _a.sent();
                        console.error('[DocumentAI] Erreur analyse:', error_1);
                        throw new Error("Impossible d'analyser le document: ".concat(error_1.message));
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * OCR avec Google Vision AI
     */
    DocumentAI.prototype.performOCR = function (filePath, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, fullTextAnnotation, pages, entities, tables, signatures, stamps, i, page, pageData, extractedEntities, extractedTables, detectedSignatures, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this.visionClient.documentTextDetection(filePath)];
                    case 1:
                        result = (_a.sent())[0];
                        fullTextAnnotation = result.fullTextAnnotation;
                        if (!fullTextAnnotation) {
                            throw new Error('Aucun texte détecté dans le document');
                        }
                        pages = [];
                        entities = [];
                        tables = [];
                        signatures = [];
                        stamps = [];
                        if (!fullTextAnnotation.pages) return [3 /*break*/, 5];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < fullTextAnnotation.pages.length)) return [3 /*break*/, 5];
                        page = fullTextAnnotation.pages[i];
                        return [4 /*yield*/, this.processPage(page, i + 1)];
                    case 3:
                        pageData = _a.sent();
                        pages.push(pageData);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.extractEntities(fullTextAnnotation.text || '')];
                    case 6:
                        extractedEntities = _a.sent();
                        entities.push.apply(entities, extractedEntities);
                        if (!options.extractTables) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.extractTables(filePath)];
                    case 7:
                        extractedTables = _a.sent();
                        tables.push.apply(tables, extractedTables);
                        _a.label = 8;
                    case 8:
                        if (!options.detectSignatures) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.detectSignatures(filePath)];
                    case 9:
                        detectedSignatures = _a.sent();
                        signatures.push.apply(signatures, detectedSignatures);
                        _a.label = 10;
                    case 10: return [2 /*return*/, {
                            rawText: fullTextAnnotation.text || '',
                            pages: pages,
                            entities: entities,
                            tables: tables,
                            signatures: signatures,
                            stamps: stamps
                        }];
                    case 11:
                        error_2 = _a.sent();
                        console.error('Erreur OCR:', error_2);
                        throw new Error("Erreur OCR: ".concat(error_2.message));
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Traitement d'une page
     */
    DocumentAI.prototype.processPage = function (page, pageNumber) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var blocks, pageText, boundingBoxes, _i, blocks_1, block, _b, _c, paragraph, _d, _e, word, wordText;
            return __generator(this, function (_f) {
                blocks = page.blocks || [];
                pageText = '';
                boundingBoxes = [];
                for (_i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
                    block = blocks_1[_i];
                    for (_b = 0, _c = block.paragraphs || []; _b < _c.length; _b++) {
                        paragraph = _c[_b];
                        for (_d = 0, _e = paragraph.words || []; _d < _e.length; _d++) {
                            word = _e[_d];
                            wordText = ((_a = word.symbols) === null || _a === void 0 ? void 0 : _a.map(function (s) { return s.text; }).join('')) || '';
                            pageText += wordText + ' ';
                            if (word.boundingBox) {
                                boundingBoxes.push({
                                    x: word.boundingBox.vertices[0].x || 0,
                                    y: word.boundingBox.vertices[0].y || 0,
                                    width: (word.boundingBox.vertices[2].x || 0) - (word.boundingBox.vertices[0].x || 0),
                                    height: (word.boundingBox.vertices[2].y || 0) - (word.boundingBox.vertices[0].y || 0),
                                    text: wordText,
                                    confidence: word.confidence || 0.5
                                });
                            }
                        }
                    }
                }
                return [2 /*return*/, {
                        pageNumber: pageNumber,
                        text: pageText.trim(),
                        confidence: page.confidence || 0.5,
                        boundingBoxes: boundingBoxes,
                        layout: {
                            paragraphs: blocks.length,
                            tables: 0, // À calculer
                            signatures: 0, // À calculer
                            headers: [],
                            footers: []
                        }
                    }];
            });
        });
    };
    /**
     * Classification du document avec GPT-4
     */
    DocumentAI.prototype.classifyDocument = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: this.config.openai.model,
                                messages: [
                                    {
                                        role: 'system',
                                        content: "Tu es un expert en classification de documents juridiques et commerciaux. \n            Analyse le texte fourni et d\u00E9termine:\n            1. La cat\u00E9gorie principale du document\n            2. Le sous-type sp\u00E9cifique\n            3. La langue principale\n            4. Ton niveau de confiance (0-1)\n            \n            R\u00E9ponds uniquement en JSON avec cette structure:\n            {\n              \"category\": \"contract|invoice|receipt|legal|agreement|certificate|other\",\n              \"subtype\": \"description_specific\",\n              \"language\": \"fr|en|es|de|auto\",\n              \"confidence\": 0.95\n            }"
                                    },
                                    {
                                        role: 'user',
                                        content: "Classe ce document:\n\n".concat(text.substring(0, 2000), "...")
                                    }
                                ],
                                temperature: 0.1,
                                max_tokens: 200
                            })];
                    case 1:
                        completion = _a.sent();
                        result = JSON.parse(completion.choices[0].message.content || '{}');
                        return [2 /*return*/, {
                                category: result.category || 'other',
                                subtype: result.subtype || 'unknown',
                                confidence: result.confidence || 0.5,
                                language: result.language || 'auto'
                            }];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Erreur classification:', error_3);
                        return [2 /*return*/, {
                                category: 'other',
                                subtype: 'unknown',
                                confidence: 0.1,
                                language: 'auto'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Analyse structurée avec GPT-4
     */
    DocumentAI.prototype.analyzeWithGPT4 = function (extractedData, documentType) {
        return __awaiter(this, void 0, void 0, function () {
            var systemPrompt, completion, analysisText, analysis, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        systemPrompt = this.getAnalysisPrompt(documentType.category);
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: this.config.openai.model,
                                messages: [
                                    {
                                        role: 'system',
                                        content: systemPrompt
                                    },
                                    {
                                        role: 'user',
                                        content: "Analyse ce document et extrais les informations structur\u00E9es:\n\nTEXTE DU DOCUMENT:\n".concat(extractedData.rawText, "\n\nENTIT\u00C9S D\u00C9TECT\u00C9ES:\n").concat(extractedData.entities.map(function (e) { return "".concat(e.type, ": ").concat(e.value); }).join('\n'), "\n\nR\u00E9ponds uniquement avec un JSON valide selon le sch\u00E9ma d\u00E9fini.")
                                    }
                                ],
                                temperature: 0.1,
                                max_tokens: 2000
                            })];
                    case 1:
                        completion = _a.sent();
                        analysisText = completion.choices[0].message.content || '{}';
                        analysis = JSON.parse(analysisText);
                        return [2 /*return*/, this.normalizeContractInfo(analysis)];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Erreur analyse GPT-4:', error_4);
                        return [2 /*return*/, this.getEmptyContractInfo()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Prompt d'analyse selon le type de document
     */
    DocumentAI.prototype.getAnalysisPrompt = function (category) {
        var basePrompt = "Tu es un expert en analyse de documents juridiques et commerciaux. \n    Extrais les informations structur\u00E9es du document fourni.";
        var prompts = {
            contract: "".concat(basePrompt, "\n      \n      Pour les CONTRATS, extrais:\n      - Parties contractantes (nom, r\u00F4le, adresse, contact)\n      - Type de contrat\n      - Dates d'effet et d'expiration\n      - Valeur et modalit\u00E9s de paiement\n      - Termes et conditions principales\n      - Obligations de chaque partie\n      - P\u00E9nalit\u00E9s et clauses particuli\u00E8res\n      - Droit applicable et juridiction\n      \n      Structure JSON attendue:\n      {\n        \"parties\": [{\"role\": \"client|provider|other\", \"name\": \"\", \"type\": \"individual|company\", \"address\": \"\", \"contact\": {\"email\": \"\", \"phone\": \"\", \"representative\": \"\"}, \"legalId\": \"\"}],\n        \"contractType\": \"\",\n        \"effectiveDate\": \"YYYY-MM-DD\",\n        \"expirationDate\": \"YYYY-MM-DD\",\n        \"value\": {\"amount\": 0, \"currency\": \"EUR\", \"type\": \"fixed|variable\", \"paymentTerms\": \"\", \"penalties\": \"\"},\n        \"terms\": [{\"id\": \"\", \"category\": \"payment|delivery|performance\", \"title\": \"\", \"description\": \"\", \"mandatory\": true, \"deadline\": \"\"}],\n        \"obligations\": [{\"party\": \"\", \"description\": \"\", \"deadline\": \"\", \"priority\": \"high|medium|low\", \"status\": \"pending\"}],\n        \"penalties\": [{\"condition\": \"\", \"amount\": 0, \"percentage\": 0, \"description\": \"\"}],\n        \"terminationConditions\": [\"\"],\n        \"governing_law\": \"\",\n        \"jurisdiction\": \"\"\n      }"),
            invoice: "".concat(basePrompt, "\n      \n      Pour les FACTURES, extrais:\n      - \u00C9metteur et destinataire\n      - Num\u00E9ro de facture et date\n      - D\u00E9tail des prestations/produits\n      - Montants et taxes\n      - Conditions de paiement\n      - R\u00E9f\u00E9rences commande"),
            legal: "".concat(basePrompt, "\n      \n      Pour les documents JURIDIQUES, extrais:\n      - Nature du document\n      - Parties impliqu\u00E9es\n      - Dates importantes\n      - D\u00E9cisions ou dispositions\n      - R\u00E9f\u00E9rences l\u00E9gales")
        };
        return prompts[category] || prompts.contract;
    };
    /**
     * Extraction d'entités personnalisée
     */
    DocumentAI.prototype.extractEntities = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var entities, patterns;
            var _this = this;
            return __generator(this, function (_a) {
                entities = [];
                patterns = {
                    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
                    phone: /(?:\+33|0)[1-9](?:[0-9]{8})/g,
                    date: /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g,
                    amount: /\d+(?:[,\.]\d{2})?\s*(?:€|EUR|euros?)/g,
                    siret: /\d{14}/g,
                    address: /\d+[,\s]+(?:rue|avenue|boulevard|place|impasse)[^,\n]+/gi
                };
                Object.entries(patterns).forEach(function (_a) {
                    var type = _a[0], regex = _a[1];
                    var match;
                    while ((match = regex.exec(text)) !== null) {
                        entities.push({
                            type: type,
                            value: match[0],
                            confidence: 0.8,
                            position: {
                                x: 0, y: 0, width: 0, height: 0,
                                text: match[0],
                                confidence: 0.8
                            },
                            context: _this.getContext(text, match.index, 50)
                        });
                    }
                });
                return [2 /*return*/, entities];
            });
        });
    };
    /**
     * Extraction de tableaux
     */
    DocumentAI.prototype.extractTables = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var result, tables, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.visionClient.documentTextDetection(filePath)];
                    case 1:
                        result = (_a.sent())[0];
                        tables = [];
                        // Simulation d'extraction de tableaux
                        // Dans un vrai système, vous utiliseriez Document AI ou une autre solution
                        return [2 /*return*/, tables];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Erreur extraction tableaux:', error_5);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Détection de signatures
     */
    DocumentAI.prototype.detectSignatures = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var signatures;
            return __generator(this, function (_a) {
                try {
                    signatures = [];
                    return [2 /*return*/, signatures];
                }
                catch (error) {
                    console.error('Erreur détection signatures:', error);
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Validation du document
     */
    DocumentAI.prototype.validateDocument = function (structuredInfo, extractedData) {
        return __awaiter(this, void 0, void 0, function () {
            var issues, score, legalCompliance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issues = [];
                        score = 100;
                        // Validation des champs obligatoires
                        if (this.config.validation.requiredFields.includes('parties') && structuredInfo.parties.length === 0) {
                            issues.push({
                                type: 'missing_field',
                                severity: 'critical',
                                field: 'parties',
                                message: 'Aucune partie contractante identifiée',
                                suggestion: 'Vérifiez que les noms et rôles des parties sont clairement mentionnés'
                            });
                            score -= 30;
                        }
                        if (this.config.validation.requiredFields.includes('effectiveDate') && !structuredInfo.effectiveDate) {
                            issues.push({
                                type: 'missing_field',
                                severity: 'warning',
                                field: 'effectiveDate',
                                message: 'Date d\'entrée en vigueur manquante',
                                suggestion: 'Ajoutez une date d\'effet claire'
                            });
                            score -= 15;
                        }
                        // Validation de cohérence
                        if (structuredInfo.effectiveDate && structuredInfo.expirationDate) {
                            if (structuredInfo.effectiveDate >= structuredInfo.expirationDate) {
                                issues.push({
                                    type: 'inconsistency',
                                    severity: 'critical',
                                    field: 'dates',
                                    message: 'Date d\'expiration antérieure à la date d\'effet',
                                    suggestion: 'Vérifiez la cohérence des dates'
                                });
                                score -= 25;
                            }
                        }
                        return [4 /*yield*/, this.checkLegalCompliance(structuredInfo)];
                    case 1:
                        legalCompliance = _a.sent();
                        return [2 /*return*/, {
                                isValid: score >= 70,
                                score: Math.max(0, score),
                                issues: issues,
                                recommendations: this.generateRecommendations(issues),
                                legalCompliance: legalCompliance
                            }];
                }
            });
        });
    };
    /**
     * Vérification de conformité légale
     */
    DocumentAI.prototype.checkLegalCompliance = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var issues, recommendations, gdpr, hasPersonalData, commercialLaw;
            return __generator(this, function (_a) {
                issues = [];
                recommendations = [];
                gdpr = true;
                hasPersonalData = info.parties.some(function (p) { return p.contact.email || p.contact.phone; });
                if (hasPersonalData) {
                    // Vérifier mentions RGPD
                    gdpr = false; // Simplification
                    issues.push('Mentions RGPD manquantes pour les données personnelles');
                    recommendations.push('Ajouter les mentions RGPD requises');
                }
                commercialLaw = true;
                if (info.value && info.value.amount > 10000) {
                    // Vérifications pour gros contrats
                    if (!info.terminationConditions.length) {
                        commercialLaw = false;
                        issues.push('Conditions de résiliation manquantes pour contrat > 10k€');
                        recommendations.push('Définir clairement les conditions de résiliation');
                    }
                }
                return [2 /*return*/, {
                        gdpr: gdpr,
                        commercialLaw: commercialLaw,
                        laborLaw: true, // Simplification
                        issues: issues,
                        recommendations: recommendations
                    }];
            });
        });
    };
    /**
     * Détection d'anomalies
     */
    DocumentAI.prototype.detectAnomalies = function (structuredInfo, extractedData) {
        return __awaiter(this, void 0, void 0, function () {
            var anomalies, today;
            return __generator(this, function (_a) {
                anomalies = [];
                // Montant inhabituel
                if (structuredInfo.value && structuredInfo.value.amount > 100000) {
                    anomalies.push({
                        type: 'unusual_amount',
                        severity: 'medium',
                        description: "Montant \u00E9lev\u00E9 d\u00E9tect\u00E9: ".concat(structuredInfo.value.amount, "\u20AC"),
                        confidence: 0.8,
                        suggestion: 'Vérifier la cohérence du montant avec le type de prestation'
                    });
                }
                today = new Date();
                if (structuredInfo.effectiveDate && structuredInfo.effectiveDate < new Date(today.getFullYear() - 5, 0, 1)) {
                    anomalies.push({
                        type: 'date_inconsistency',
                        severity: 'low',
                        description: 'Date d\'effet très ancienne',
                        confidence: 0.6,
                        suggestion: 'Vérifier si le document est encore valide'
                    });
                }
                // Signature manquante
                if (extractedData.signatures.length === 0) {
                    anomalies.push({
                        type: 'missing_signature',
                        severity: 'high',
                        description: 'Aucune signature détectée',
                        confidence: 0.9,
                        suggestion: 'Vérifier que le document est bien signé par toutes les parties'
                    });
                }
                return [2 /*return*/, anomalies];
            });
        });
    };
    /**
     * Export en Excel
     */
    DocumentAI.prototype.exportToExcel = function (documentId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var analysis, workbook, mainData, mainSheet, validationData, validationSheet, filename, filepath;
            return __generator(this, function (_d) {
                analysis = this.documentCache.get(documentId);
                if (!analysis) {
                    throw new Error('Document non trouvé');
                }
                workbook = XLSX.utils.book_new();
                mainData = __spreadArray(__spreadArray([
                    ['Document', analysis.filename],
                    ['Type', "".concat(analysis.type.category, " - ").concat(analysis.type.subtype)],
                    ['Confiance', "".concat(Math.round(analysis.confidence * 100), "%")],
                    ['Pages', analysis.metadata.pages],
                    ['Langue', analysis.type.language],
                    ['', ''],
                    ['PARTIES CONTRACTANTES', '']
                ], analysis.structuredInfo.parties.map(function (p) { return [p.role, p.name, p.address || '']; }), true), [
                    ['', ''],
                    ['INFORMATIONS FINANCIÈRES', ''],
                    ['Montant', ((_a = analysis.structuredInfo.value) === null || _a === void 0 ? void 0 : _a.amount) || 'N/A'],
                    ['Devise', ((_b = analysis.structuredInfo.value) === null || _b === void 0 ? void 0 : _b.currency) || 'N/A'],
                    ['Type', ((_c = analysis.structuredInfo.value) === null || _c === void 0 ? void 0 : _c.type) || 'N/A'],
                ], false);
                mainSheet = XLSX.utils.aoa_to_sheet(mainData);
                XLSX.utils.book_append_sheet(workbook, mainSheet, 'Analyse');
                validationData = __spreadArray([
                    ['Statut', analysis.validation.isValid ? 'Valide' : 'Invalide'],
                    ['Score', "".concat(analysis.validation.score, "/100")],
                    ['', ''],
                    ['PROBLÈMES IDENTIFIÉS', ''],
                    ['Sévérité', 'Champ', 'Message']
                ], analysis.validation.issues.map(function (i) { return [i.severity, i.field, i.message]; }), true);
                validationSheet = XLSX.utils.aoa_to_sheet(validationData);
                XLSX.utils.book_append_sheet(workbook, validationSheet, 'Validation');
                filename = "".concat(analysis.documentId, "_analysis.xlsx");
                filepath = "".concat(this.config.storage.outputPath, "/").concat(filename);
                XLSX.writeFile(workbook, filepath);
                return [2 /*return*/, filepath];
            });
        });
    };
    /**
     * Export en PDF de synthèse
     */
    DocumentAI.prototype.exportToPDF = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var analysis, doc, filename, filepath, y_1;
            return __generator(this, function (_a) {
                analysis = this.documentCache.get(documentId);
                if (!analysis) {
                    throw new Error('Document non trouvé');
                }
                doc = new PDFDocument();
                filename = "".concat(analysis.documentId, "_report.pdf");
                filepath = "".concat(this.config.storage.outputPath, "/").concat(filename);
                doc.pipe(require('fs').createWriteStream(filepath));
                // En-tête
                doc.fontSize(20).text('Rapport d\'Analyse de Document', 50, 50);
                doc.fontSize(12).text("Document: ".concat(analysis.filename), 50, 90);
                doc.text("Analys\u00E9 le: ".concat(analysis.createdAt.toLocaleDateString('fr-FR')), 50, 110);
                // Informations générales
                doc.fontSize(16).text('Informations Générales', 50, 150);
                doc.fontSize(12)
                    .text("Type: ".concat(analysis.type.category, " - ").concat(analysis.type.subtype), 70, 180)
                    .text("Confiance: ".concat(Math.round(analysis.confidence * 100), "%"), 70, 200)
                    .text("Pages: ".concat(analysis.metadata.pages), 70, 220)
                    .text("Langue: ".concat(analysis.type.language), 70, 240);
                // Parties
                if (analysis.structuredInfo.parties.length > 0) {
                    doc.fontSize(16).text('Parties Contractantes', 50, 280);
                    y_1 = 310;
                    analysis.structuredInfo.parties.forEach(function (party) {
                        doc.fontSize(12)
                            .text("\u2022 ".concat(party.role, ": ").concat(party.name), 70, y_1)
                            .text("  ".concat(party.address || 'Adresse non spécifiée'), 70, y_1 + 15);
                        y_1 += 40;
                    });
                }
                // Validation
                doc.fontSize(16).text('Validation', 50, y + 20);
                doc.fontSize(12)
                    .text("Statut: ".concat(analysis.validation.isValid ? 'Valide' : 'Invalide'), 70, y + 50)
                    .text("Score: ".concat(analysis.validation.score, "/100"), 70, y + 70);
                doc.end();
                return [2 /*return*/, filepath];
            });
        });
    };
    /**
     * Utilitaires
     */
    DocumentAI.prototype.generateDocumentId = function () {
        return "doc_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
    };
    DocumentAI.prototype.calculateOverallConfidence = function (extractedData, structuredInfo, validation) {
        var ocrConfidence = extractedData.pages.reduce(function (sum, p) { return sum + p.confidence; }, 0) / extractedData.pages.length;
        var validationScore = validation.score / 100;
        return (ocrConfidence * 0.4) + (validationScore * 0.6);
    };
    DocumentAI.prototype.getContext = function (text, index, length) {
        var start = Math.max(0, index - length);
        var end = Math.min(text.length, index + length);
        return text.substring(start, end);
    };
    DocumentAI.prototype.normalizeContractInfo = function (analysis) {
        return {
            parties: analysis.parties || [],
            contractType: analysis.contractType || 'unknown',
            effectiveDate: analysis.effectiveDate ? new Date(analysis.effectiveDate) : null,
            expirationDate: analysis.expirationDate ? new Date(analysis.expirationDate) : null,
            value: analysis.value || null,
            terms: analysis.terms || [],
            obligations: analysis.obligations || [],
            penalties: analysis.penalties || [],
            terminationConditions: analysis.terminationConditions || [],
            governing_law: analysis.governing_law || null,
            jurisdiction: analysis.jurisdiction || null
        };
    };
    DocumentAI.prototype.getEmptyContractInfo = function () {
        return {
            parties: [],
            contractType: 'unknown',
            effectiveDate: null,
            expirationDate: null,
            value: null,
            terms: [],
            obligations: [],
            penalties: [],
            terminationConditions: [],
            governing_law: null,
            jurisdiction: null
        };
    };
    DocumentAI.prototype.generateRecommendations = function (issues) {
        var recommendations = new Set();
        issues.forEach(function (issue) {
            if (issue.suggestion) {
                recommendations.add(issue.suggestion);
            }
        });
        return Array.from(recommendations);
    };
    DocumentAI.prototype.extractMetadata = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, stats;
            return __generator(this, function (_a) {
                fs = require('fs');
                stats = fs.statSync(filePath);
                return [2 /*return*/, {
                        size: stats.size,
                        format: filePath.split('.').pop() || 'unknown',
                        pages: 1, // À calculer avec PDFtk ou similaire
                        language: 'fr',
                        created: stats.birthtime,
                        modified: stats.mtime,
                        author: null,
                        title: null,
                        keywords: [],
                        processingVersion: '2.0.0'
                    }];
            });
        });
    };
    DocumentAI.prototype.saveAnalysis = function (analysis) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, filepath;
            return __generator(this, function (_a) {
                fs = require('fs');
                filepath = "".concat(this.config.storage.outputPath, "/").concat(analysis.documentId, ".json");
                fs.writeFileSync(filepath, JSON.stringify(analysis, null, 2));
                return [2 /*return*/];
            });
        });
    };
    DocumentAI.prototype.handleNotifications = function (analysis) {
        return __awaiter(this, void 0, void 0, function () {
            var criticalAnomalies, criticalIssues;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criticalAnomalies = analysis.anomalies.filter(function (a) { return a.severity === 'high'; });
                        criticalIssues = analysis.validation.issues.filter(function (i) { return i.severity === 'critical'; });
                        if (!(criticalAnomalies.length > 0 || criticalIssues.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendAlert(analysis, __spreadArray(__spreadArray([], criticalAnomalies, true), criticalIssues, true))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DocumentAI.prototype.sendAlert = function (analysis, alerts) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.config.notifications.webhookUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(this.config.notifications.webhookUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    type: 'document_analysis_alert',
                                    documentId: analysis.documentId,
                                    filename: analysis.filename,
                                    alerts: alerts.map(function (a) { return ({
                                        type: a.type || a.severity,
                                        message: a.description || a.message,
                                        severity: a.severity
                                    }); }),
                                    timestamp: new Date().toISOString()
                                })
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.error('Erreur envoi alerte:', error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * API publique
     */
    DocumentAI.prototype.getAnalysis = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.documentCache.get(documentId) || null];
            });
        });
    };
    DocumentAI.prototype.listAnalyses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.documentCache.values())];
            });
        });
    };
    DocumentAI.prototype.deleteAnalysis = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.documentCache.delete(documentId)];
            });
        });
    };
    DocumentAI.prototype.getStats = function () {
        var analyses = Array.from(this.documentCache.values());
        return {
            totalDocuments: analyses.length,
            averageConfidence: analyses.reduce(function (sum, a) { return sum + a.confidence; }, 0) / analyses.length || 0,
            typeDistribution: analyses.reduce(function (acc, a) {
                acc[a.type.category] = (acc[a.type.category] || 0) + 1;
                return acc;
            }, {}),
            validationRate: analyses.filter(function (a) { return a.validation.isValid; }).length / analyses.length || 0
        };
    };
    return DocumentAI;
}());
exports.DocumentAI = DocumentAI;
// Configuration par défaut
exports.defaultDocumentAIConfig = {
    googleVision: {
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
        keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE || '',
        location: 'europe-west1'
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4o',
        temperature: 0.1
    },
    storage: {
        inputPath: './documents/input',
        outputPath: './documents/output',
        tempPath: './documents/temp'
    },
    validation: {
        strictMode: true,
        requiredFields: ['parties', 'contractType', 'effectiveDate'],
        alertThresholds: {
            confidenceMin: 0.7,
            anomalyScore: 0.8
        }
    },
    notifications: {
        webhookUrl: process.env.DOCUMENT_AI_WEBHOOK_URL || '',
        emailNotifications: true,
        slackWebhook: process.env.SLACK_WEBHOOK_URL || ''
    }
};
exports.default = DocumentAI;
