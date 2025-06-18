"use strict";
/**
 * Figma Integration MCP - Phase 2 Design Agent Extension
 * Import automatique des designs Figma vers HTML/CSS
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigmaMCPService = exports.FigmaIntegrationMCP = void 0;
var FigmaIntegrationMCP = /** @class */ (function () {
    function FigmaIntegrationMCP(apiKey) {
        this.baseUrl = 'https://api.figma.com/v1';
        this.apiKey = apiKey;
    }
    /**
     * Récupère un fichier Figma par son ID
     */
    FigmaIntegrationMCP.prototype.fetchFigmaFile = function (fileId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl, "/files/").concat(fileId), {
                            headers: {
                                'X-Figma-Token': this.apiKey
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Erreur Figma API: ".concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    /**
     * Extrait les design tokens d'un fichier Figma
     */
    FigmaIntegrationMCP.prototype.extractDesignTokens = function (figmaData) {
        var _this = this;
        var tokens = {
            colors: {},
            typography: {},
            spacing: {},
            borderRadius: {},
            shadows: {}
        };
        // Extraction des couleurs depuis les styles
        if (figmaData.styles) {
            Object.values(figmaData.styles).forEach(function (style) {
                if (style.styleType === 'FILL') {
                    var colorName = _this.sanitizeTokenName(style.name);
                    var color = _this.extractColorFromStyle(style);
                    if (color) {
                        tokens.colors[colorName] = color;
                    }
                }
            });
        }
        // Extraction des typographies
        this.traverseNodes(figmaData.document, function (node) {
            if (node.type === 'TEXT' && node.style) {
                var typeName = _this.sanitizeTokenName(node.name);
                tokens.typography[typeName] = {
                    fontFamily: node.style.fontFamily,
                    fontSize: "".concat(node.style.fontSize, "px"),
                    fontWeight: node.style.fontWeight.toString(),
                    lineHeight: "".concat(node.style.lineHeight, "px")
                };
            }
        });
        return tokens;
    };
    /**
     * Convertit un composant Figma en HTML/CSS
     */
    FigmaIntegrationMCP.prototype.convertFigmaComponentToHTML = function (component) {
        var html = this.generateHTMLFromNode(component);
        var css = this.generateCSSFromNode(component);
        return { html: html, css: css };
    };
    /**
     * Parse un design Figma complet en structure de page
     */
    FigmaIntegrationMCP.prototype.parseFigmaDesign = function (fileId, pageId) {
        return __awaiter(this, void 0, void 0, function () {
            var figmaData, tokens, targetPage, components, pageHTML, pageCSS;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchFigmaFile(fileId)];
                    case 1:
                        figmaData = _a.sent();
                        tokens = this.extractDesignTokens(figmaData);
                        targetPage = figmaData.document;
                        if (pageId) {
                            targetPage = this.findNodeById(figmaData.document, pageId);
                        }
                        components = [];
                        pageHTML = [];
                        pageCSS = [];
                        // Génération des CSS variables depuis les tokens
                        pageCSS.push(this.generateCSSVariables(tokens));
                        this.traverseNodes(targetPage, function (node) {
                            if (_this.isComponent(node)) {
                                var _a = _this.convertFigmaComponentToHTML(node), html = _a.html, css = _a.css;
                                components.push({
                                    name: node.name,
                                    html: html,
                                    css: css
                                });
                            }
                            if (_this.isPageElement(node)) {
                                var _b = _this.convertFigmaComponentToHTML(node), html = _b.html, css = _b.css;
                                pageHTML.push(html);
                                pageCSS.push(css);
                            }
                        });
                        return [2 /*return*/, {
                                html: this.wrapInHTMLDocument(pageHTML.join('\n')),
                                css: pageCSS.join('\n'),
                                tokens: tokens,
                                components: components
                            }];
                }
            });
        });
    };
    /**
     * Génère les variables CSS depuis les tokens
     */
    FigmaIntegrationMCP.prototype.generateCSSVariables = function (tokens) {
        var cssVars = [':root {'];
        // Couleurs
        Object.entries(tokens.colors).forEach(function (_a) {
            var name = _a[0], value = _a[1];
            cssVars.push("  --color-".concat(name, ": ").concat(value, ";"));
        });
        // Typographies
        Object.entries(tokens.typography).forEach(function (_a) {
            var name = _a[0], style = _a[1];
            cssVars.push("  --font-".concat(name, "-family: ").concat(style.fontFamily, ";"));
            cssVars.push("  --font-".concat(name, "-size: ").concat(style.fontSize, ";"));
            cssVars.push("  --font-".concat(name, "-weight: ").concat(style.fontWeight, ";"));
            cssVars.push("  --font-".concat(name, "-line-height: ").concat(style.lineHeight, ";"));
        });
        // Espacements
        Object.entries(tokens.spacing).forEach(function (_a) {
            var name = _a[0], value = _a[1];
            cssVars.push("  --spacing-".concat(name, ": ").concat(value, ";"));
        });
        cssVars.push('}');
        return cssVars.join('\n');
    };
    /**
     * Génère le HTML depuis un nœud Figma
     */
    FigmaIntegrationMCP.prototype.generateHTMLFromNode = function (node) {
        var _this = this;
        var _a, _b;
        switch (node.type) {
            case 'TEXT':
                return "<p class=\"".concat(this.generateClassName(node.name), "\">").concat(node.characters || '', "</p>");
            case 'RECTANGLE':
            case 'FRAME':
                var children = ((_a = node.children) === null || _a === void 0 ? void 0 : _a.map(function (child) { return _this.generateHTMLFromNode(child); }).join('\n')) || '';
                return "<div class=\"".concat(this.generateClassName(node.name), "\">").concat(children, "</div>");
            case 'IMAGE':
                return "<img class=\"".concat(this.generateClassName(node.name), "\" alt=\"").concat(node.name, "\" />");
            default:
                var defaultChildren = ((_b = node.children) === null || _b === void 0 ? void 0 : _b.map(function (child) { return _this.generateHTMLFromNode(child); }).join('\n')) || '';
                return "<div class=\"".concat(this.generateClassName(node.name), "\">").concat(defaultChildren, "</div>");
        }
    };
    /**
     * Génère le CSS depuis un nœud Figma
     */
    FigmaIntegrationMCP.prototype.generateCSSFromNode = function (node) {
        var className = this.generateClassName(node.name);
        var styles = [];
        // Position et dimensions
        if (node.absoluteBoundingBox) {
            styles.push("width: ".concat(node.absoluteBoundingBox.width, "px;"));
            styles.push("height: ".concat(node.absoluteBoundingBox.height, "px;"));
        }
        // Couleurs de fond
        if (node.fills && node.fills.length > 0) {
            var fill = node.fills[0];
            if (fill.type === 'SOLID' && fill.color) {
                var color = this.rgbaToHex(fill.color, fill.opacity || 1);
                styles.push("background-color: ".concat(color, ";"));
            }
        }
        // Typographie
        if (node.type === 'TEXT' && node.style) {
            styles.push("font-family: '".concat(node.style.fontFamily, "', sans-serif;"));
            styles.push("font-size: ".concat(node.style.fontSize, "px;"));
            styles.push("font-weight: ".concat(node.style.fontWeight, ";"));
            styles.push("line-height: ".concat(node.style.lineHeight, "px;"));
            styles.push("text-align: ".concat(node.style.textAlignHorizontal.toLowerCase(), ";"));
        }
        return ".".concat(className, " {\n  ").concat(styles.join('\n  '), "\n}");
    };
    /**
     * Génère les prompts d'images automatiques selon le secteur
     */
    FigmaIntegrationMCP.prototype.generateSectorImagePrompts = function (sector) {
        var prompts = {
            restaurant: [
                "Restaurant gastronomique élégant avec éclairage tamisé, tables dressées avec vaisselle fine",
                "Chef cuisinier professionnel préparant un plat dans une cuisine moderne",
                "Plat gastronomique artistiquement dressé sur assiette blanche, haute qualité",
                "Salle de restaurant luxueuse avec décoration moderne et ambiance chaleureuse"
            ],
            sante: [
                "Cabinet médical moderne et rassurant avec équipements de pointe",
                "Médecin souriant en consultation avec patient dans environnement professionnel",
                "Équipements médicaux high-tech dans un environnement stérilisé",
                "Salle d'attente médicale moderne, lumineuse et accueillante"
            ],
            finance: [
                "Bureau moderne de conseil financier avec vue sur la ville",
                "Graphiques financiers et données sur écrans multiples, trading floor",
                "Réunion de conseil financier professionnelle dans salle de conférence",
                "Calculatrice et documents financiers sur bureau executive moderne"
            ],
            elearning: [
                "Étudiant suivant cours en ligne sur ordinateur portable dans espace moderne",
                "Plateforme e-learning interactive avec interface utilisateur intuitive",
                "Classe virtuelle avec participants connectés en visioconférence",
                "Bibliothèque numérique avec livres et ressources éducatives digitales"
            ],
            immobilier: [
                "Villa moderne luxueuse avec jardin paysager et piscine",
                "Appartement contemporain avec grandes baies vitrées et décoration design",
                "Agent immobilier présentant propriété à clients potentiels",
                "Quartier résidentiel paisible avec maisons modernes alignées"
            ],
            tech: [
                "Startup tech moderne avec open space et équipements high-tech",
                "Développeurs travaillant sur code dans environnement collaboratif",
                "Serveurs et infrastructure cloud dans datacenter moderne",
                "Interface utilisateur futuriste avec éléments holographiques et IA"
            ]
        };
        return prompts[sector] || prompts.tech;
    };
    /**
     * Utilitaires privés
     */
    FigmaIntegrationMCP.prototype.traverseNodes = function (node, callback) {
        var _this = this;
        callback(node);
        if (node.children) {
            node.children.forEach(function (child) { return _this.traverseNodes(child, callback); });
        }
    };
    FigmaIntegrationMCP.prototype.findNodeById = function (root, id) {
        if (root.id === id)
            return root;
        if (root.children) {
            for (var _i = 0, _a = root.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var found = this.findNodeById(child, id);
                if (found)
                    return found;
            }
        }
        return null;
    };
    FigmaIntegrationMCP.prototype.isComponent = function (node) {
        return node.type === 'COMPONENT' || node.type === 'COMPONENT_SET';
    };
    FigmaIntegrationMCP.prototype.isPageElement = function (node) {
        return ['FRAME', 'GROUP', 'SECTION'].includes(node.type);
    };
    FigmaIntegrationMCP.prototype.sanitizeTokenName = function (name) {
        return name.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };
    FigmaIntegrationMCP.prototype.generateClassName = function (name) {
        return this.sanitizeTokenName(name);
    };
    FigmaIntegrationMCP.prototype.extractColorFromStyle = function (style) {
        // Logique d'extraction simplifiée
        return '#000000'; // Placeholder
    };
    FigmaIntegrationMCP.prototype.rgbaToHex = function (color, opacity) {
        var r = Math.round(color.r * 255);
        var g = Math.round(color.g * 255);
        var b = Math.round(color.b * 255);
        if (opacity < 1) {
            var a = Math.round(opacity * 255);
            return "#".concat(r.toString(16).padStart(2, '0')).concat(g.toString(16).padStart(2, '0')).concat(b.toString(16).padStart(2, '0')).concat(a.toString(16).padStart(2, '0'));
        }
        return "#".concat(r.toString(16).padStart(2, '0')).concat(g.toString(16).padStart(2, '0')).concat(b.toString(16).padStart(2, '0'));
    };
    FigmaIntegrationMCP.prototype.wrapInHTMLDocument = function (content) {
        return "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Figma Import</title>\n    <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n    ".concat(content, "\n</body>\n</html>");
    };
    return FigmaIntegrationMCP;
}());
exports.FigmaIntegrationMCP = FigmaIntegrationMCP;
/**
 * Service de connexion MCP Figma
 */
var FigmaMCPService = /** @class */ (function () {
    function FigmaMCPService(apiKey) {
        this.figmaIntegration = new FigmaIntegrationMCP(apiKey);
    }
    /**
     * Import automatique depuis URL Figma
     */
    FigmaMCPService.prototype.importFromFigmaUrl = function (figmaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var fileId, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fileId = this.extractFileIdFromUrl(figmaUrl);
                        if (!fileId) {
                            throw new Error('URL Figma invalide');
                        }
                        return [4 /*yield*/, this.figmaIntegration.parseFigmaDesign(fileId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: result
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_1 instanceof Error ? error_1.message : 'Erreur inconnue'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génération de composants optimisés pour secteur
     */
    FigmaMCPService.prototype.generateSectorOptimizedComponents = function (figmaUrl, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var importResult, imagePrompts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.importFromFigmaUrl(figmaUrl)];
                    case 1:
                        importResult = _a.sent();
                        if (!importResult.success || !importResult.data) {
                            throw new Error('Échec de l\'import Figma');
                        }
                        imagePrompts = this.figmaIntegration.generateSectorImagePrompts(sector);
                        return [2 /*return*/, {
                                components: importResult.data.components,
                                imagePrompts: imagePrompts,
                                tokens: importResult.data.tokens
                            }];
                }
            });
        });
    };
    FigmaMCPService.prototype.extractFileIdFromUrl = function (url) {
        var match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    };
    return FigmaMCPService;
}());
exports.FigmaMCPService = FigmaMCPService;
exports.default = FigmaMCPService;
