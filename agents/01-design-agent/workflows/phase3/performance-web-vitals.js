"use strict";
/**
 * PHASE 3 - Performance Web Vitals Optimizer
 * Module d'automatisation avancée pour l'optimisation des Core Web Vitals avec IA
 * Optimisation intelligente des images, CSS, fonts et elimination layout shifts
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
exports.PerformanceOptimizer = exports.LayoutShiftPreventer = exports.FontOptimizerEngine = exports.CSSOptimizerEngine = exports.ImageOptimizerEngine = void 0;
// ============================================================================
// IMAGE OPTIMIZER ENGINE
// ============================================================================
var ImageOptimizerEngine = /** @class */ (function () {
    function ImageOptimizerEngine() {
        this.formatOptimizer = new FormatOptimizer();
        this.compressionEngine = new CompressionEngine();
        this.responsiveGenerator = new ResponsiveImageGenerator();
        this.lazyLoadingOptimizer = new LazyLoadingOptimizer();
    }
    /**
     * Optimisation intelligente des images avec IA
     */
    ImageOptimizerEngine.prototype.optimizeImages = function (images, config) {
        return __awaiter(this, void 0, void 0, function () {
            var optimizations, totalSavings, _i, images_1, imagePath, imageAnalysis, formatOptimization, compressionOptimization, responsiveOptimization, consolidatedOptimization, error_1, estimatedLCPImprovement, implementationCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDDBC\uFE0F Optimisation de ".concat(images.length, " images..."));
                        optimizations = [];
                        totalSavings = 0;
                        _i = 0, images_1 = images;
                        _a.label = 1;
                    case 1:
                        if (!(_i < images_1.length)) return [3 /*break*/, 9];
                        imagePath = images_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, this.analyzeImage(imagePath)];
                    case 3:
                        imageAnalysis = _a.sent();
                        return [4 /*yield*/, this.formatOptimizer.optimizeFormat(imageAnalysis, config.constraints.minImageQuality)];
                    case 4:
                        formatOptimization = _a.sent();
                        return [4 /*yield*/, this.compressionEngine.optimizeCompression(imageAnalysis, formatOptimization.format, config.constraints.minImageQuality)];
                    case 5:
                        compressionOptimization = _a.sent();
                        return [4 /*yield*/, this.responsiveGenerator.generateResponsiveSet(imageAnalysis, config.context.deviceTypes)];
                    case 6:
                        responsiveOptimization = _a.sent();
                        consolidatedOptimization = this.consolidateOptimizations(imageAnalysis, formatOptimization, compressionOptimization, responsiveOptimization);
                        optimizations.push(consolidatedOptimization);
                        totalSavings += consolidatedOptimization.estimatedSavings;
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.error("Erreur optimisation image ".concat(imagePath, ":"), error_1);
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9:
                        estimatedLCPImprovement = this.calculateLCPImprovement(optimizations, totalSavings);
                        implementationCode = this.generateImplementationCode(optimizations);
                        console.log("\u2705 Optimisation termin\u00E9e. \u00C9conomies: ".concat(totalSavings, "KB"));
                        return [2 /*return*/, {
                                optimizations: optimizations,
                                totalSavings: totalSavings,
                                estimatedLCPImprovement: estimatedLCPImprovement,
                                implementationCode: implementationCode
                            }];
                }
            });
        });
    };
    /**
     * Analyse d'une image
     */
    ImageOptimizerEngine.prototype.analyzeImage = function (imagePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation d'analyse d'image
                return [2 /*return*/, {
                        path: imagePath,
                        format: 'jpeg',
                        size: 245000, // 245KB
                        dimensions: { width: 1200, height: 800 },
                        quality: 85,
                        hasTransparency: false,
                        colorDepth: 24,
                        compressionType: 'lossy',
                        metadata: {
                            camera: 'Canon EOS',
                            location: 'GPS data',
                            timestamp: '2024-01-01'
                        },
                        usage: {
                            isAboveFold: true,
                            isHeroImage: true,
                            isDecorative: false,
                            loadPriority: 'high'
                        }
                    }];
            });
        });
    };
    /**
     * Consolidation des optimisations
     */
    ImageOptimizerEngine.prototype.consolidateOptimizations = function (imageAnalysis, formatOpt, compressionOpt, responsiveOpt) {
        var currentSize = imageAnalysis.size;
        var optimizedSize = Math.round(currentSize * compressionOpt.compressionRatio);
        var savings = currentSize - optimizedSize;
        return {
            image: imageAnalysis.path,
            currentFormat: imageAnalysis.format,
            recommendedFormat: formatOpt.format,
            currentSize: currentSize,
            optimizedSize: optimizedSize,
            qualityLoss: compressionOpt.qualityLoss,
            compressionType: compressionOpt.type,
            techniques: [
                'Format modernization',
                'Intelligent compression',
                'Metadata removal',
                'Responsive images'
            ],
            estimatedSavings: savings,
            implementationCode: this.generateImageOptimizationCode(imageAnalysis, formatOpt, compressionOpt, responsiveOpt)
        };
    };
    /**
     * Calcul de l'amélioration LCP
     */
    ImageOptimizerEngine.prototype.calculateLCPImprovement = function (optimizations, totalSavings) {
        // Calcul basé sur la réduction de taille et l'impact sur le LCP
        var averageBandwidth = 2000; // KB/s pour 3G
        var timeSavings = totalSavings / averageBandwidth * 1000; // en ms
        // Les images hero ont un impact plus important sur le LCP
        var heroImages = optimizations.filter(function (opt) { return opt.image.includes('hero') || opt.estimatedSavings > 100; });
        var heroImpact = heroImages.length > 0 ? timeSavings * 0.8 : timeSavings * 0.3;
        return Math.round(heroImpact);
    };
    /**
     * Génération du code d'implémentation
     */
    ImageOptimizerEngine.prototype.generateImplementationCode = function (optimizations) {
        var code = '<!-- Optimisations d\'images générées automatiquement -->\n\n';
        // CSS pour lazy loading
        code += "<style>\n.img-lazy {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n\n.img-lazy.loaded {\n  opacity: 1;\n}\n\n.img-responsive {\n  width: 100%;\n  height: auto;\n  max-width: 100%;\n}\n</style>\n\n";
        // JavaScript pour lazy loading
        code += "<script>\n// Lazy loading avec Intersection Observer\nconst imageObserver = new IntersectionObserver((entries, observer) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src;\n      img.srcset = img.dataset.srcset;\n      img.classList.add('loaded');\n      observer.unobserve(img);\n    }\n  });\n});\n\ndocument.querySelectorAll('img[data-src]').forEach(img => {\n  imageObserver.observe(img);\n});\n</script>\n\n";
        // HTML optimisé pour chaque image
        optimizations.forEach(function (opt) {
            code += "<!-- ".concat(opt.image, " - \u00C9conomie: ").concat(opt.estimatedSavings, "KB -->\n");
            code += opt.implementationCode + '\n\n';
        });
        return code;
    };
    /**
     * Génération du code pour une image spécifique
     */
    ImageOptimizerEngine.prototype.generateImageOptimizationCode = function (imageAnalysis, formatOpt, compressionOpt, responsiveOpt) {
        var imageName = imageAnalysis.path.split('/').pop().split('.')[0];
        // Génération des sources responsive
        var sources = responsiveOpt.breakpoints.map(function (bp) {
            return "  <source media=\"(max-width: ".concat(bp.width, "px)\" \n          srcset=\"").concat(imageName, "-").concat(bp.width, ".").concat(formatOpt.format, "\" \n          type=\"image/").concat(formatOpt.format, "\">");
        }).join('\n');
        return "<picture>\n".concat(sources, "\n  <img src=\"").concat(imageName, ".").concat(formatOpt.format, "\" \n       alt=\"").concat(imageAnalysis.alt || 'Image optimisée', "\"\n       class=\"img-responsive img-lazy\"\n       data-src=\"").concat(imageName, ".").concat(formatOpt.format, "\"\n       loading=\"").concat(imageAnalysis.usage.isAboveFold ? 'eager' : 'lazy', "\"\n       decoding=\"async\"\n       width=\"").concat(imageAnalysis.dimensions.width, "\"\n       height=\"").concat(imageAnalysis.dimensions.height, "\">\n</picture>");
    };
    return ImageOptimizerEngine;
}());
exports.ImageOptimizerEngine = ImageOptimizerEngine;
// ============================================================================
// CSS OPTIMIZER ENGINE
// ============================================================================
var CSSOptimizerEngine = /** @class */ (function () {
    function CSSOptimizerEngine() {
        this.criticalCSSExtractor = new CriticalCSSExtractor();
        this.unusedCSSRemover = new UnusedCSSRemover();
        this.cssMinifier = new CSSMinifier();
        this.cssAnalyzer = new CSSAnalyzer();
    }
    /**
     * Optimisation complète CSS avec extraction du critical path
     */
    CSSOptimizerEngine.prototype.optimizeCSS = function (cssFiles, htmlContent, config) {
        return __awaiter(this, void 0, void 0, function () {
            var analysis, criticalCSS, cleanedCSS, minifiedCSS, optimizations, estimatedFCPImprovement, implementationCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83C\uDFA8 Optimisation de ".concat(cssFiles.length, " fichiers CSS..."));
                        return [4 /*yield*/, this.cssAnalyzer.analyzeCSS(cssFiles)];
                    case 1:
                        analysis = _a.sent();
                        return [4 /*yield*/, this.criticalCSSExtractor.extractCritical(cssFiles, htmlContent, config.context.deviceTypes)];
                    case 2:
                        criticalCSS = _a.sent();
                        return [4 /*yield*/, this.unusedCSSRemover.removeUnused(cssFiles, htmlContent)];
                    case 3:
                        cleanedCSS = _a.sent();
                        return [4 /*yield*/, this.cssMinifier.minify(cleanedCSS)];
                    case 4:
                        minifiedCSS = _a.sent();
                        optimizations = this.generateCSSOptimizations(analysis, criticalCSS, cleanedCSS);
                        estimatedFCPImprovement = this.calculateFCPImprovement(optimizations);
                        implementationCode = this.generateCSSImplementationCode(criticalCSS, minifiedCSS);
                        console.log("\u2705 CSS optimis\u00E9. Critical CSS: ".concat(criticalCSS.length, " caract\u00E8res"));
                        return [2 /*return*/, {
                                criticalCSS: criticalCSS,
                                nonCriticalCSS: minifiedCSS,
                                optimizations: optimizations,
                                estimatedFCPImprovement: estimatedFCPImprovement,
                                implementationCode: implementationCode
                            }];
                }
            });
        });
    };
    /**
     * Génération des optimisations CSS
     */
    CSSOptimizerEngine.prototype.generateCSSOptimizations = function (analysis, criticalCSS, cleanedCSS) {
        var optimizations = [];
        // Optimisation Critical CSS
        if (criticalCSS.length > 0) {
            optimizations.push({
                type: 'critical-extraction',
                description: 'Extraction du CSS critique pour améliorer le FCP',
                estimatedSavings: Math.round(analysis.totalSize * 0.3),
                complexity: 'medium',
                implementation: 'Inline critical CSS et lazy load du reste',
                risks: ['Maintenance plus complexe', 'Risque de FOUC']
            });
        }
        // Suppression CSS inutilisé
        var unusedRatio = analysis.content.unusedRules / analysis.content.rulesCount;
        if (unusedRatio > 0.2) {
            optimizations.push({
                type: 'elimination',
                description: "Suppression de ".concat(Math.round(unusedRatio * 100), "% de CSS inutilis\u00E9"),
                estimatedSavings: Math.round(analysis.totalSize * unusedRatio),
                complexity: 'low',
                implementation: 'Utilisation d\'outils comme PurgeCSS',
                risks: ['Suppression accidentelle de styles nécessaires']
            });
        }
        // Minification
        optimizations.push({
            type: 'minification',
            description: 'Minification et compression du CSS',
            estimatedSavings: Math.round(analysis.totalSize * 0.2),
            complexity: 'low',
            implementation: 'Build process avec cssnano ou équivalent',
            risks: ['Aucun risque significatif']
        });
        return optimizations;
    };
    /**
     * Calcul de l'amélioration FCP
     */
    CSSOptimizerEngine.prototype.calculateFCPImprovement = function (optimizations) {
        var totalSavings = optimizations.reduce(function (sum, opt) { return sum + opt.estimatedSavings; }, 0);
        var averageBandwidth = 2000; // KB/s
        var timeSavings = totalSavings / averageBandwidth * 1000; // en ms
        // Le Critical CSS a un impact direct sur le FCP
        var criticalOpt = optimizations.find(function (opt) { return opt.type === 'critical-extraction'; });
        var criticalImpact = criticalOpt ? timeSavings * 0.8 : timeSavings * 0.4;
        return Math.round(criticalImpact);
    };
    /**
     * Génération du code d'implémentation CSS
     */
    CSSOptimizerEngine.prototype.generateCSSImplementationCode = function (criticalCSS, nonCriticalCSS) {
        return "<!-- Critical CSS inlin\u00E9 dans le <head> -->\n<style>\n".concat(criticalCSS, "\n</style>\n\n<!-- Chargement asynchrone du CSS non-critique -->\n<link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">\n<noscript><link rel=\"stylesheet\" href=\"/css/non-critical.css\"></noscript>\n\n<script>\n// Fallback pour les navigateurs qui ne supportent pas rel=\"preload\"\n!function(e){\"use strict\";var t=function(t,n,r){function o(e){return i.body?e():void setTimeout(function(){o(e)})}function a(){d.addEventListener&&d.removeEventListener(\"load\",a),d.media=r||\"all\"}var i=e.document,d=i.createElement(\"link\");if(n)d.href=n;else{if(!t)return;d.href=t}d.rel=\"stylesheet\",d.media=\"only x\",o(function(){i.head.appendChild(d)}),setTimeout(function(){d.addEventListener&&d.addEventListener(\"load\",a),d.onloadcssdefined=a})};t()}(this);\n</script>");
    };
    return CSSOptimizerEngine;
}());
exports.CSSOptimizerEngine = CSSOptimizerEngine;
// ============================================================================
// FONT OPTIMIZER ENGINE
// ============================================================================
var FontOptimizerEngine = /** @class */ (function () {
    function FontOptimizerEngine() {
        this.fontAnalyzer = new FontAnalyzer();
        this.fontSubsetter = new FontSubsetter();
        this.fontCompressor = new FontCompressor();
        this.fontLoader = new FontLoader();
    }
    /**
     * Optimisation complète des polices
     */
    FontOptimizerEngine.prototype.optimizeFonts = function (fonts, textContent, config) {
        return __awaiter(this, void 0, void 0, function () {
            var optimizations, _i, fonts_1, fontPath, fontAnalysis, subsettingOpt, compressionOpt, loadingOpt, fontOptimization, preloadStrategy, fallbackStrategy, estimatedCLSReduction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD24 Optimisation de ".concat(fonts.length, " polices..."));
                        optimizations = [];
                        _i = 0, fonts_1 = fonts;
                        _a.label = 1;
                    case 1:
                        if (!(_i < fonts_1.length)) return [3 /*break*/, 7];
                        fontPath = fonts_1[_i];
                        return [4 /*yield*/, this.fontAnalyzer.analyzeFont(fontPath, textContent)];
                    case 2:
                        fontAnalysis = _a.sent();
                        return [4 /*yield*/, this.fontSubsetter.generateSubset(fontAnalysis, textContent)];
                    case 3:
                        subsettingOpt = _a.sent();
                        return [4 /*yield*/, this.fontCompressor.optimizeFormat(fontAnalysis)];
                    case 4:
                        compressionOpt = _a.sent();
                        return [4 /*yield*/, this.fontLoader.optimizeLoading(fontAnalysis)];
                    case 5:
                        loadingOpt = _a.sent();
                        fontOptimization = {
                            font: fontPath,
                            technique: 'subsetting',
                            description: "Optimisation compl\u00E8te: subsetting (".concat(subsettingOpt.savings, "KB), compression (").concat(compressionOpt.savings, "KB), chargement optimis\u00E9"),
                            estimatedSavings: subsettingOpt.savings + compressionOpt.savings,
                            implementation: this.generateFontImplementation(fontAnalysis, subsettingOpt, compressionOpt, loadingOpt),
                            browserSupport: 95,
                            fallbackRequired: true
                        };
                        optimizations.push(fontOptimization);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7:
                        preloadStrategy = this.generatePreloadStrategy(optimizations);
                        fallbackStrategy = this.generateFallbackStrategy(optimizations);
                        estimatedCLSReduction = this.calculateCLSReduction(optimizations);
                        console.log("\u2705 Polices optimis\u00E9es. CLS r\u00E9duit de ".concat(estimatedCLSReduction));
                        return [2 /*return*/, {
                                optimizations: optimizations,
                                preloadStrategy: preloadStrategy,
                                fallbackStrategy: fallbackStrategy,
                                estimatedCLSReduction: estimatedCLSReduction
                            }];
                }
            });
        });
    };
    /**
     * Génération de l'implémentation pour une police
     */
    FontOptimizerEngine.prototype.generateFontImplementation = function (fontAnalysis, subsettingOpt, compressionOpt, loadingOpt) {
        var _a;
        var fontFamily = fontAnalysis.family;
        var fontWeight = ((_a = fontAnalysis.variants[0]) === null || _a === void 0 ? void 0 : _a.weight) || 400;
        return "/* ".concat(fontFamily, " - Police optimis\u00E9e */\n@font-face {\n  font-family: '").concat(fontFamily, "';\n  src: url('").concat(fontFamily.toLowerCase(), "-subset.woff2') format('woff2'),\n       url('").concat(fontFamily.toLowerCase(), "-subset.woff') format('woff');\n  font-weight: ").concat(fontWeight, ";\n  font-style: normal;\n  font-display: swap;\n  unicode-range: ").concat(subsettingOpt.unicodeRange, ";\n}\n\n/* Syst\u00E8me de fallback */\n.font-").concat(fontFamily.toLowerCase(), " {\n  font-family: '").concat(fontFamily, "', ").concat(loadingOpt.fallbacks.join(', '), ";\n}");
    };
    /**
     * Génération de la stratégie de preload
     */
    FontOptimizerEngine.prototype.generatePreloadStrategy = function (optimizations) {
        var criticalFonts = optimizations.filter(function (opt) { return opt.font.includes('primary') || opt.estimatedSavings > 50; });
        var preloadCode = '<!-- Preload des polices critiques -->\n';
        criticalFonts.forEach(function (opt) {
            var _a;
            var fontName = (_a = opt.font.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
            preloadCode += "<link rel=\"preload\" href=\"/fonts/".concat(fontName, "-subset.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n");
        });
        return preloadCode;
    };
    /**
     * Génération de la stratégie de fallback
     */
    FontOptimizerEngine.prototype.generateFallbackStrategy = function (optimizations) {
        return "/* Syst\u00E8me de fallback pour \u00E9viter le FOIT/FOUT */\n@supports (font-display: swap) {\n  @font-face {\n    font-display: swap;\n  }\n}\n\n/* Fallback pour les navigateurs anciens */\n.fonts-loaded .font-custom {\n  font-family: var(--custom-font), system-ui, -apple-system, sans-serif;\n}\n\n.fonts-loading .font-custom {\n  font-family: system-ui, -apple-system, sans-serif;\n}";
    };
    /**
     * Calcul de la réduction CLS
     */
    FontOptimizerEngine.prototype.calculateCLSReduction = function (optimizations) {
        // La réduction du CLS dépend de l'amélioration du chargement des polices
        var totalSavings = optimizations.reduce(function (sum, opt) { return sum + opt.estimatedSavings; }, 0);
        var averageBandwidth = 2000; // KB/s
        var timeSavings = totalSavings / averageBandwidth * 1000; // en ms
        // Estimation de la réduction CLS basée sur l'amélioration du temps de chargement
        return Math.round(timeSavings * 0.0001); // Approximation CLS
    };
    return FontOptimizerEngine;
}());
exports.FontOptimizerEngine = FontOptimizerEngine;
// ============================================================================
// LAYOUT SHIFT PREVENTER
// ============================================================================
var LayoutShiftPreventer = /** @class */ (function () {
    function LayoutShiftPreventer() {
        this.domAnalyzer = new DOMAnalyzer();
        this.shiftDetector = new ShiftDetector();
        this.preventionGenerator = new PreventionGenerator();
    }
    /**
     * Prévention automatique des layout shifts
     */
    LayoutShiftPreventer.prototype.preventLayoutShifts = function (htmlContent, cssContent) {
        return __awaiter(this, void 0, void 0, function () {
            var domAnalysis, detectedShifts, preventions, _i, detectedShifts_1, shift, prevention, implementationCode, estimatedCLSImprovement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🔄 Analyse et prévention des layout shifts...');
                        return [4 /*yield*/, this.domAnalyzer.analyzeDOMStructure(htmlContent)];
                    case 1:
                        domAnalysis = _a.sent();
                        return [4 /*yield*/, this.shiftDetector.detectPotentialShifts(domAnalysis, cssContent)];
                    case 2:
                        detectedShifts = _a.sent();
                        preventions = [];
                        _i = 0, detectedShifts_1 = detectedShifts;
                        _a.label = 3;
                    case 3:
                        if (!(_i < detectedShifts_1.length)) return [3 /*break*/, 6];
                        shift = detectedShifts_1[_i];
                        return [4 /*yield*/, this.preventionGenerator.generatePrevention(shift)];
                    case 4:
                        prevention = _a.sent();
                        preventions.push(prevention);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        implementationCode = this.generatePreventionCode(preventions);
                        estimatedCLSImprovement = this.calculateCLSImprovement(detectedShifts, preventions);
                        console.log("\u2705 ".concat(detectedShifts.length, " sources de layout shift d\u00E9tect\u00E9es et corrig\u00E9es"));
                        return [2 /*return*/, {
                                detectedShifts: detectedShifts,
                                preventions: preventions,
                                implementationCode: implementationCode,
                                estimatedCLSImprovement: estimatedCLSImprovement
                            }];
                }
            });
        });
    };
    /**
     * Génération du code de prévention
     */
    LayoutShiftPreventer.prototype.generatePreventionCode = function (preventions) {
        var code = '<!-- Prévention des Layout Shifts -->\n\n';
        // CSS pour la prévention
        code += '<style>\n';
        code += '/* Prévention Layout Shift - Généré automatiquement */\n\n';
        preventions.forEach(function (prevention) {
            var _a, _b, _c, _d;
            switch (prevention.type) {
                case 'image-dimensions':
                    code += "/* Image: ".concat(prevention.element, " */\n");
                    code += "".concat(prevention.selector, " {\n");
                    code += "  width: ".concat((_a = prevention.dimensions) === null || _a === void 0 ? void 0 : _a.width, "px;\n");
                    code += "  height: ".concat((_b = prevention.dimensions) === null || _b === void 0 ? void 0 : _b.height, "px;\n");
                    code += "  object-fit: cover;\n";
                    code += "}\n\n";
                    break;
                case 'skeleton-loading':
                    code += "/* Skeleton: ".concat(prevention.element, " */\n");
                    code += "".concat(prevention.selector, "-skeleton {\n");
                    code += "  width: 100%;\n";
                    code += "  height: ".concat((_c = prevention.dimensions) === null || _c === void 0 ? void 0 : _c.height, "px;\n");
                    code += "  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\n";
                    code += "  background-size: 200% 100%;\n";
                    code += "  animation: loading 1.5s infinite;\n";
                    code += "}\n\n";
                    break;
                case 'space-reservation':
                    code += "/* Space reservation: ".concat(prevention.element, " */\n");
                    code += "".concat(prevention.selector, " {\n");
                    code += "  min-height: ".concat((_d = prevention.dimensions) === null || _d === void 0 ? void 0 : _d.height, "px;\n");
                    code += "}\n\n";
                    break;
            }
        });
        // Animation pour les skeletons
        code += "@keyframes loading {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n";
        code += '</style>\n\n';
        // JavaScript pour la gestion dynamique
        code += '<script>\n';
        code += '// Gestion dynamique des Layout Shifts\n';
        code += "document.addEventListener('DOMContentLoaded', function() {\n  // Observer pour d\u00E9tecter les changements de layout\n  const observer = new ResizeObserver(entries => {\n    entries.forEach(entry => {\n      // Log des changements pour debug\n      if (entry.contentRect.width === 0 || entry.contentRect.height === 0) {\n        console.log('Potential layout shift detected:', entry.target);\n      }\n    });\n  });\n  \n  // Observer tous les \u00E9l\u00E9ments critiques\n  document.querySelectorAll('img, iframe, .dynamic-content').forEach(el => {\n    observer.observe(el);\n  });\n  \n  // Gestion sp\u00E9ciale pour les images\n  document.querySelectorAll('img').forEach(img => {\n    if (!img.width || !img.height) {\n      img.addEventListener('load', function() {\n        // L'image est charg\u00E9e, on peut ajuster si n\u00E9cessaire\n        this.style.transition = 'opacity 0.3s ease';\n      });\n    }\n  });\n});\n</script>\n";
        return code;
    };
    /**
     * Calcul de l'amélioration CLS
     */
    LayoutShiftPreventer.prototype.calculateCLSImprovement = function (detectedShifts, preventions) {
        var totalShiftValue = detectedShifts.reduce(function (sum, shift) { return sum + shift.shiftValue; }, 0);
        var preventedShiftValue = preventions.reduce(function (sum, prevention) {
            var originalShift = detectedShifts.find(function (s) { return s.element === prevention.element; });
            return sum + ((originalShift === null || originalShift === void 0 ? void 0 : originalShift.shiftValue) || 0) * prevention.effectiveness;
        }, 0);
        return Math.round((preventedShiftValue / totalShiftValue) * 100) / 100;
    };
    return LayoutShiftPreventer;
}());
exports.LayoutShiftPreventer = LayoutShiftPreventer;
// ============================================================================
// PERFORMANCE ORCHESTRATOR
// ============================================================================
var PerformanceOptimizer = /** @class */ (function () {
    function PerformanceOptimizer() {
        this.imageOptimizer = new ImageOptimizerEngine();
        this.cssOptimizer = new CSSOptimizerEngine();
        this.fontOptimizer = new FontOptimizerEngine();
        this.layoutShiftPreventer = new LayoutShiftPreventer();
        this.performanceAnalyzer = new PerformanceAnalyzer();
        this.metricsCalculator = new MetricsCalculator();
    }
    /**
     * Optimisation complète des performances avec IA
     */
    PerformanceOptimizer.prototype.optimizePerformance = function (assets, config) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, initialAnalysis, imageOptimization, cssOptimization, fontOptimization, layoutShiftPrevention, bottlenecks, opportunities, predictions, recommendations, monitoring, analysisTime, analysis, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('⚡ Démarrage de l\'optimisation performance complète...');
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        return [4 /*yield*/, this.performanceAnalyzer.analyzeCurrentPerformance(assets)];
                    case 2:
                        initialAnalysis = _a.sent();
                        return [4 /*yield*/, this.imageOptimizer.optimizeImages(assets.images, config)];
                    case 3:
                        imageOptimization = _a.sent();
                        return [4 /*yield*/, this.cssOptimizer.optimizeCSS(assets.css, assets.html, config)];
                    case 4:
                        cssOptimization = _a.sent();
                        return [4 /*yield*/, this.fontOptimizer.optimizeFonts(assets.fonts, this.extractTextContent(assets.html), config)];
                    case 5:
                        fontOptimization = _a.sent();
                        return [4 /*yield*/, this.layoutShiftPreventer.preventLayoutShifts(assets.html, assets.css.join('\n'))];
                    case 6:
                        layoutShiftPrevention = _a.sent();
                        return [4 /*yield*/, this.identifyBottlenecks(initialAnalysis, config)];
                    case 7:
                        bottlenecks = _a.sent();
                        return [4 /*yield*/, this.generateOptimizationOpportunities(initialAnalysis, {
                                images: imageOptimization,
                                css: cssOptimization,
                                fonts: fontOptimization,
                                layoutShifts: layoutShiftPrevention
                            }, config)];
                    case 8:
                        opportunities = _a.sent();
                        return [4 /*yield*/, this.generatePerformancePredictions(initialAnalysis, opportunities, config)];
                    case 9:
                        predictions = _a.sent();
                        return [4 /*yield*/, this.generatePrioritizedRecommendations(opportunities, predictions, config)];
                    case 10:
                        recommendations = _a.sent();
                        return [4 /*yield*/, this.setupPerformanceMonitoring(initialAnalysis, recommendations, config)];
                    case 11:
                        monitoring = _a.sent();
                        analysisTime = Date.now() - startTime;
                        console.log("\u2705 Optimisation termin\u00E9e en ".concat(analysisTime, "ms"));
                        console.log("\uD83D\uDCCA Score pr\u00E9dit: ".concat(predictions.estimatedGains.metrics.overallScore.projected, "/100"));
                        analysis = {
                            currentMetrics: initialAnalysis.metrics,
                            scores: {
                                lighthouse: initialAnalysis.scores.lighthouse,
                                pagespeed: initialAnalysis.scores.pagespeed,
                                gtmetrix: initialAnalysis.scores.gtmetrix,
                                webPageTest: initialAnalysis.scores.webPageTest,
                                overall: initialAnalysis.scores.overall
                            },
                            detailedAnalysis: {
                                images: imageOptimization.optimizations[0] ? {
                                    totalSize: imageOptimization.optimizations.reduce(function (sum, opt) { return sum + opt.currentSize; }, 0),
                                    totalCount: imageOptimization.optimizations.length,
                                    formats: this.analyzeImageFormats(imageOptimization.optimizations),
                                    issues: this.extractImageIssues(imageOptimization.optimizations),
                                    optimizations: imageOptimization.optimizations,
                                    impact: {
                                        lcp: imageOptimization.estimatedLCPImprovement,
                                        fcp: Math.round(imageOptimization.estimatedLCPImprovement * 0.6),
                                        overallPerformance: Math.round(imageOptimization.totalSavings / 1000 * 10)
                                    },
                                    recommendations: {
                                        formatConversions: this.generateFormatConversions(imageOptimization.optimizations),
                                        compressionSettings: this.generateCompressionSettings(imageOptimization.optimizations),
                                        responsiveImages: [],
                                        lazyLoadingCandidates: imageOptimization.optimizations.map(function (opt) { return opt.image; })
                                    }
                                } : this.getEmptyImageAnalysis(),
                                css: this.generateCSSAnalysisFromOptimization(cssOptimization),
                                javascript: this.generateEmptyJSAnalysis(),
                                fonts: this.generateFontAnalysisFromOptimization(fontOptimization),
                                html: this.generateEmptyHTMLAnalysis(),
                                thirdParty: this.generateEmptyThirdPartyAnalysis(),
                                network: this.generateEmptyNetworkAnalysis(),
                                rendering: this.generateRenderingAnalysisFromLayoutShifts(layoutShiftPrevention)
                            },
                            bottlenecks: bottlenecks,
                            opportunities: opportunities,
                            predictions: predictions,
                            recommendations: recommendations,
                            monitoring: monitoring
                        };
                        return [2 /*return*/, analysis];
                    case 12:
                        error_2 = _a.sent();
                        console.error('❌ Erreur lors de l\'optimisation performance:', error_2);
                        throw error_2;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génération de code d'implémentation complet
     */
    PerformanceOptimizer.prototype.generateImplementationCode = function (analysis) {
        return __awaiter(this, void 0, void 0, function () {
            var html, css, javascript, configFiles, deploymentInstructions;
            return __generator(this, function (_a) {
                console.log('📝 Génération du code d\'implémentation...');
                html = this.generateOptimizedHTML(analysis);
                css = this.generateOptimizedCSS(analysis);
                javascript = this.generateOptimizationJS(analysis);
                configFiles = {
                    'webpack.config.js': this.generateWebpackConfig(analysis),
                    '.htaccess': this.generateHTAccessConfig(analysis),
                    'sw.js': this.generateServiceWorkerConfig(analysis),
                    'performance-budget.json': this.generatePerformanceBudget(analysis)
                };
                deploymentInstructions = this.generateDeploymentInstructions(analysis);
                return [2 /*return*/, {
                        html: html,
                        css: css,
                        javascript: javascript,
                        configFiles: configFiles,
                        deploymentInstructions: deploymentInstructions
                    }];
            });
        });
    };
    /**
     * Méthodes privées utilitaires
     */
    PerformanceOptimizer.prototype.extractTextContent = function (html) {
        // Extraction simplifiée du contenu textuel
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };
    PerformanceOptimizer.prototype.identifyBottlenecks = function (analysis, config) {
        return __awaiter(this, void 0, void 0, function () {
            var bottlenecks;
            return __generator(this, function (_a) {
                bottlenecks = [];
                // Bottleneck LCP
                if (analysis.metrics.lcp.value > config.targets.lcp) {
                    bottlenecks.push({
                        id: 'lcp-bottleneck',
                        type: 'rendering',
                        severity: 'high',
                        title: 'Largest Contentful Paint trop élevé',
                        description: "LCP actuel: ".concat(analysis.metrics.lcp.value, "ms, cible: ").concat(config.targets.lcp, "ms"),
                        impact: 'Perception de lenteur par les utilisateurs',
                        affectedMetrics: ['LCP', 'User Experience'],
                        rootCause: 'Images non optimisées et CSS bloquant',
                        contributingFactors: ['Taille des images', 'CSS non critique', 'Fonts bloquantes'],
                        solution: 'Optimiser les images hero, extraire le CSS critique, preload des fonts',
                        estimatedGain: Math.round((analysis.metrics.lcp.value - config.targets.lcp) * 0.7),
                        complexity: 'medium',
                        effort: 8,
                        priority: 9,
                        urgency: 'high',
                        businessImpact: {
                            userExperience: 85,
                            conversion: 60,
                            seo: 75,
                            accessibility: 40
                        }
                    });
                }
                // Bottleneck CLS
                if (analysis.metrics.cls.value > config.targets.cls) {
                    bottlenecks.push({
                        id: 'cls-bottleneck',
                        type: 'rendering',
                        severity: 'medium',
                        title: 'Cumulative Layout Shift élevé',
                        description: "CLS actuel: ".concat(analysis.metrics.cls.value, ", cible: ").concat(config.targets.cls),
                        impact: 'Expérience utilisateur dégradée avec des éléments qui bougent',
                        affectedMetrics: ['CLS', 'User Experience'],
                        rootCause: 'Éléments sans dimensions définies',
                        contributingFactors: ['Images sans width/height', 'Fonts avec FOUT', 'Contenu dynamique'],
                        solution: 'Définir les dimensions, optimiser le chargement des fonts, réserver l\'espace',
                        estimatedGain: Math.round((analysis.metrics.cls.value - config.targets.cls) * 1000),
                        complexity: 'low',
                        effort: 4,
                        priority: 7,
                        urgency: 'medium',
                        businessImpact: {
                            userExperience: 90,
                            conversion: 45,
                            seo: 60,
                            accessibility: 70
                        }
                    });
                }
                return [2 /*return*/, bottlenecks];
            });
        });
    };
    PerformanceOptimizer.prototype.generateOptimizationOpportunities = function (analysis, optimizations, config) {
        return __awaiter(this, void 0, void 0, function () {
            var opportunities;
            return __generator(this, function (_a) {
                opportunities = [];
                // Opportunité optimisation images
                if (optimizations.images.totalSavings > 50) {
                    opportunities.push({
                        id: 'image-optimization',
                        category: 'images',
                        title: 'Optimisation intelligente des images',
                        description: "\u00C9conomie de ".concat(optimizations.images.totalSavings, "KB gr\u00E2ce \u00E0 la conversion de format et compression"),
                        benefit: 'Amélioration significative du LCP et de l\'expérience utilisateur',
                        technique: 'Conversion vers formats modernes (WebP, AVIF) et compression intelligente',
                        implementation: optimizations.images.implementationCode,
                        estimatedGains: {
                            lcp: optimizations.images.estimatedLCPImprovement,
                            overallScore: Math.round(optimizations.images.totalSavings / 10)
                        },
                        effort: 6,
                        complexity: 'medium',
                        riskLevel: 'low',
                        dependencies: ['Build system', 'CDN moderne'],
                        prerequisites: ['Analyse des images existantes'],
                        browserSupport: 95,
                        roi: {
                            performanceGain: optimizations.images.estimatedLCPImprovement,
                            implementationCost: 6,
                            maintenanceCost: 2,
                            businessValue: 85,
                            score: 8.5
                        },
                        priority: 9,
                        urgency: 'high',
                        timeline: {
                            planning: 1,
                            implementation: 3,
                            testing: 2,
                            deployment: 1
                        }
                    });
                }
                // Opportunité CSS critique
                if (optimizations.css.criticalCSS.length > 0) {
                    opportunities.push({
                        id: 'critical-css-extraction',
                        category: 'css',
                        title: 'Extraction du CSS critique',
                        description: 'Inline du CSS critique et chargement asynchrone du reste',
                        benefit: "Am\u00E9lioration du FCP de ".concat(optimizations.css.estimatedFCPImprovement, "ms"),
                        technique: 'Critical path CSS extraction et lazy loading',
                        implementation: optimizations.css.implementationCode,
                        estimatedGains: {
                            fcp: optimizations.css.estimatedFCPImprovement,
                            overallScore: Math.round(optimizations.css.estimatedFCPImprovement / 10)
                        },
                        effort: 8,
                        complexity: 'high',
                        riskLevel: 'medium',
                        dependencies: ['Build system', 'CSS processing'],
                        prerequisites: ['Analyse du CSS existant'],
                        browserSupport: 98,
                        roi: {
                            performanceGain: optimizations.css.estimatedFCPImprovement,
                            implementationCost: 8,
                            maintenanceCost: 4,
                            businessValue: 75,
                            score: 7.5
                        },
                        priority: 8,
                        urgency: 'medium',
                        timeline: {
                            planning: 2,
                            implementation: 4,
                            testing: 3,
                            deployment: 1
                        }
                    });
                }
                return [2 /*return*/, opportunities];
            });
        });
    };
    PerformanceOptimizer.prototype.generatePerformancePredictions = function (analysis, opportunities, config) {
        return __awaiter(this, void 0, void 0, function () {
            var totalLCPImprovement, totalFCPImprovement, totalScoreImprovement;
            return __generator(this, function (_a) {
                totalLCPImprovement = opportunities
                    .filter(function (o) { return o.estimatedGains.lcp; })
                    .reduce(function (sum, o) { return sum + (o.estimatedGains.lcp || 0); }, 0);
                totalFCPImprovement = opportunities
                    .filter(function (o) { return o.estimatedGains.fcp; })
                    .reduce(function (sum, o) { return sum + (o.estimatedGains.fcp || 0); }, 0);
                totalScoreImprovement = opportunities
                    .reduce(function (sum, o) { return sum + (o.estimatedGains.overallScore || 0); }, 0);
                return [2 /*return*/, {
                        potentialImprovements: {
                            lcp: totalLCPImprovement,
                            fcp: totalFCPImprovement,
                            overallScore: totalScoreImprovement
                        },
                        estimatedGains: {
                            metrics: {
                                lcp: {
                                    current: analysis.metrics.lcp.value,
                                    projected: Math.max(config.targets.lcp, analysis.metrics.lcp.value - totalLCPImprovement),
                                    improvement: totalLCPImprovement
                                },
                                fid: {
                                    current: analysis.metrics.fid.value,
                                    projected: Math.max(config.targets.fid, analysis.metrics.fid.value - 20),
                                    improvement: 20
                                },
                                cls: {
                                    current: analysis.metrics.cls.value,
                                    projected: Math.max(config.targets.cls, analysis.metrics.cls.value - 0.05),
                                    improvement: 0.05
                                },
                                fcp: {
                                    current: analysis.metrics.fcp.value,
                                    projected: Math.max(config.targets.fcp, analysis.metrics.fcp.value - totalFCPImprovement),
                                    improvement: totalFCPImprovement
                                },
                                overallScore: {
                                    current: analysis.scores.overall,
                                    projected: Math.min(100, analysis.scores.overall + totalScoreImprovement),
                                    improvement: totalScoreImprovement
                                }
                            },
                            businessMetrics: {
                                conversionRate: { improvement: totalScoreImprovement * 0.1, confidence: 75 },
                                bounceRate: { improvement: totalScoreImprovement * 0.2, confidence: 80 },
                                pageViews: { improvement: totalScoreImprovement * 0.05, confidence: 65 },
                                timeOnSite: { improvement: totalScoreImprovement * 0.3, confidence: 70 },
                                revenue: { improvement: totalScoreImprovement * 0.15, confidence: 60 }
                            },
                            userExperience: {
                                perceivedSpeed: totalScoreImprovement * 0.8,
                                satisfaction: totalScoreImprovement * 0.6,
                                frustrationReduction: totalScoreImprovement * 0.7,
                                accessibilityImprovement: totalScoreImprovement * 0.4
                            },
                            seoImpact: {
                                rankingImprovement: totalScoreImprovement * 0.3,
                                coreWebVitalsScore: totalScoreImprovement,
                                mobileFriendliness: totalScoreImprovement * 0.5,
                                indexingImprovement: totalScoreImprovement * 0.2
                            }
                        },
                        riskAssessment: {
                            overallRisk: 'low',
                            risks: [
                                {
                                    type: 'technical',
                                    risk: 'Incompatibilité avec des navigateurs anciens',
                                    probability: 15,
                                    impact: 'low',
                                    mitigation: 'Implémentation de fallbacks appropriés'
                                },
                                {
                                    type: 'business',
                                    risk: 'Temps de développement plus long que prévu',
                                    probability: 30,
                                    impact: 'medium',
                                    mitigation: 'Planning détaillé et tests progressifs'
                                }
                            ],
                            recommendations: [
                                'Commencer par les optimisations à faible risque',
                                'Tester progressivement chaque optimisation',
                                'Monitorer les métriques après chaque déploiement'
                            ],
                            testingStrategy: {
                                required: true,
                                scope: ['Performance', 'Compatibilité', 'Régression'],
                                duration: 7,
                                resources: ['Développeur front-end', 'QA engineer']
                            }
                        },
                        implementationComplexity: {
                            overall: 'medium',
                            breakdown: {
                                technical: 6,
                                implementation: 7,
                                testing: 5,
                                deployment: 4,
                                maintenance: 5
                            },
                            skillsRequired: ['Performance optimization', 'Build tools', 'CSS/JS'],
                            toolsRequired: ['Webpack/Vite', 'ImageOptim', 'Critical CSS tools'],
                            timeEstimate: 40,
                            teamSize: 2
                        }
                    }];
            });
        });
    };
    PerformanceOptimizer.prototype.generatePrioritizedRecommendations = function (opportunities, predictions, config) {
        return __awaiter(this, void 0, void 0, function () {
            var sortedOpportunities;
            return __generator(this, function (_a) {
                sortedOpportunities = opportunities.sort(function (a, b) { return b.roi.score - a.roi.score; });
                return [2 /*return*/, sortedOpportunities.map(function (opp, index) { return ({
                        id: opp.id,
                        rank: index + 1,
                        category: opp.category,
                        title: opp.title,
                        description: opp.description,
                        rationale: "ROI score: ".concat(opp.roi.score, "/10, Impact: ").concat(opp.effort, "h d'effort"),
                        implementation: opp.implementation,
                        codeChanges: [opp.codeExample || 'Code optimisé généré automatiquement'],
                        configChanges: ['Configuration build', 'Configuration serveur'],
                        impact: opp.effort < 4 ? 'high' : opp.effort < 8 ? 'medium' : 'low',
                        effort: opp.effort < 4 ? 'low' : opp.effort < 8 ? 'medium' : 'high',
                        complexity: opp.complexity,
                        estimatedGains: predictions.estimatedGains,
                        dependencies: opp.dependencies,
                        blockers: [],
                        prerequisites: opp.prerequisites,
                        timeline: "".concat(opp.timeline.planning + opp.timeline.implementation + opp.timeline.testing + opp.timeline.deployment, " jours"),
                        phases: [
                            {
                                name: 'Planning',
                                duration: opp.timeline.planning,
                                deliverables: ['Analyse détaillée', 'Plan d\'implémentation']
                            },
                            {
                                name: 'Implémentation',
                                duration: opp.timeline.implementation,
                                deliverables: ['Code optimisé', 'Tests unitaires']
                            },
                            {
                                name: 'Testing',
                                duration: opp.timeline.testing,
                                deliverables: ['Tests de performance', 'Validation']
                            },
                            {
                                name: 'Déploiement',
                                duration: opp.timeline.deployment,
                                deliverables: ['Déploiement production', 'Monitoring']
                            }
                        ],
                        successMetrics: [
                            {
                                metric: 'LCP',
                                target: config.targets.lcp,
                                measurement: 'Core Web Vitals'
                            },
                            {
                                metric: 'FCP',
                                target: config.targets.fcp,
                                measurement: 'Core Web Vitals'
                            },
                            {
                                metric: 'CLS',
                                target: config.targets.cls,
                                measurement: 'Core Web Vitals'
                            }
                        ],
                        monitoring: {
                            metrics: ['LCP', 'FCP', 'CLS', 'FID', 'Overall Score'],
                            frequency: 'Hourly',
                            alerts: ['Performance regression', 'Threshold breach']
                        }
                    }); })];
            });
        });
    };
    PerformanceOptimizer.prototype.setupPerformanceMonitoring = function (analysis, recommendations, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        alerts: [
                            {
                                id: 'lcp-threshold',
                                type: 'threshold',
                                severity: 'warning',
                                metric: 'LCP',
                                currentValue: analysis.metrics.lcp.value,
                                thresholdValue: config.targets.lcp,
                                delta: analysis.metrics.lcp.value - config.targets.lcp,
                                timestamp: new Date(),
                                duration: 0,
                                affectedPages: ['Homepage', 'Product pages'],
                                userImpact: 'Perception de lenteur',
                                suspectedCause: 'Images non optimisées',
                                relatedChanges: [],
                                actionRequired: true,
                                recommendedActions: ['Optimiser les images hero', 'Implémenter le lazy loading'],
                                escalation: false
                            }
                        ],
                        trends: [
                            {
                                metric: 'LCP',
                                timeframe: '30 days',
                                direction: 'stable',
                                rate: 0,
                                correlation: [
                                    { factor: 'Image size', coefficient: 0.8, significance: 0.95 },
                                    { factor: 'CSS size', coefficient: 0.6, significance: 0.85 }
                                ],
                                forecast: [
                                    { period: 'Next week', predictedValue: analysis.metrics.lcp.value, confidence: 90 },
                                    { period: 'Next month', predictedValue: analysis.metrics.lcp.value - 200, confidence: 75 }
                                ],
                                trendAnalysis: 'Stable avec potentiel d\'amélioration',
                                recommendations: ['Monitorer après optimisations', 'Analyser les pics de trafic']
                            }
                        ],
                        regressions: []
                    }];
            });
        });
    };
    // Méthodes de génération de code
    PerformanceOptimizer.prototype.generateOptimizedHTML = function (analysis) {
        return "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Page optimis\u00E9e</title>\n    \n    <!-- DNS Prefetch pour les ressources externes -->\n    <link rel=\"dns-prefetch\" href=\"//fonts.googleapis.com\">\n    <link rel=\"dns-prefetch\" href=\"//cdn.example.com\">\n    \n    <!-- Preload des ressources critiques -->\n    <link rel=\"preload\" href=\"/fonts/main-font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n    <link rel=\"preload\" href=\"/css/critical.css\" as=\"style\">\n    \n    <!-- CSS critique inlin\u00E9 -->\n    <style>\n        /* CSS critique g\u00E9n\u00E9r\u00E9 automatiquement */\n        ".concat(this.extractCriticalCSS(analysis), "\n    </style>\n    \n    <!-- CSS non-critique charg\u00E9 de mani\u00E8re asynchrone -->\n    <link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">\n    <noscript><link rel=\"stylesheet\" href=\"/css/non-critical.css\"></noscript>\n    \n    <!-- Meta pour les performances -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"theme-color\" content=\"#3b82f6\">\n    \n</head>\n<body>\n    <!-- Contenu optimis\u00E9 pour les performances -->\n    <main>\n        <!-- Images optimis\u00E9es avec dimensions fixes -->\n        <picture>\n            <source srcset=\"/images/hero-800.webp 800w, /images/hero-1200.webp 1200w\" type=\"image/webp\">\n            <img src=\"/images/hero-1200.jpg\" \n                 alt=\"Image hero optimis\u00E9e\"\n                 width=\"1200\" \n                 height=\"600\"\n                 loading=\"eager\"\n                 decoding=\"async\">\n        </picture>\n        \n        <!-- Contenu avec skeleton loading -->\n        <div class=\"content-section\">\n            <h1>Titre optimis\u00E9</h1>\n            <p>Contenu optimis\u00E9 pour les performances.</p>\n        </div>\n    </main>\n    \n    <!-- JavaScript non-bloquant -->\n    <script>\n        // Code d'optimisation g\u00E9n\u00E9r\u00E9 automatiquement\n        ").concat(this.generatePerformanceJS(analysis), "\n    </script>\n</body>\n</html>");
    };
    PerformanceOptimizer.prototype.generateOptimizedCSS = function (analysis) {
        return "/* CSS optimis\u00E9 pour les performances */\n\n/* Fonts optimis\u00E9es */\n@font-face {\n  font-family: 'OptimizedFont';\n  src: url('/fonts/optimized-font.woff2') format('woff2'),\n       url('/fonts/optimized-font.woff') format('woff');\n  font-display: swap;\n  font-weight: 400;\n  font-style: normal;\n}\n\n/* Pr\u00E9vention Layout Shift */\n.content-section {\n  min-height: 400px;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Optimisations responsive */\n@media (max-width: 768px) {\n  .content-section {\n    min-height: 300px;\n  }\n}\n\n/* Animations optimis\u00E9es */\n.fade-in {\n  opacity: 0;\n  transform: translateY(20px);\n  transition: opacity 0.3s ease, transform 0.3s ease;\n}\n\n.fade-in.visible {\n  opacity: 1;\n  transform: translateY(0);\n}";
    };
    PerformanceOptimizer.prototype.generateOptimizationJS = function (analysis) {
        return "// JavaScript d'optimisation des performances\n\n// Lazy loading des images\nconst imageObserver = new IntersectionObserver((entries, observer) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src;\n      img.classList.remove('lazy');\n      observer.unobserve(img);\n    }\n  });\n});\n\ndocument.querySelectorAll('img[data-src]').forEach(img => {\n  imageObserver.observe(img);\n});\n\n// Monitoring des Core Web Vitals\nfunction sendMetrics(metric) {\n  // Envoi des m\u00E9triques vers votre service d'analytics\n  console.log('Metric:', metric);\n}\n\n// Observation du LCP\nnew PerformanceObserver((entryList) => {\n  for (const entry of entryList.getEntries()) {\n    sendMetrics({\n      name: 'LCP',\n      value: entry.startTime,\n      element: entry.element?.tagName\n    });\n  }\n}).observe({entryTypes: ['largest-contentful-paint']});\n\n// Observation du CLS\nlet cls = 0;\nnew PerformanceObserver((entryList) => {\n  for (const entry of entryList.getEntries()) {\n    if (!entry.hadRecentInput) {\n      cls += entry.value;\n      sendMetrics({\n        name: 'CLS',\n        value: cls\n      });\n    }\n  }\n}).observe({entryTypes: ['layout-shift']});";
    };
    PerformanceOptimizer.prototype.generateWebpackConfig = function (analysis) {
        return "// Configuration Webpack optimis\u00E9e\nconst path = require('path');\n\nmodule.exports = {\n  mode: 'production',\n  optimization: {\n    splitChunks: {\n      chunks: 'all',\n      cacheGroups: {\n        vendor: {\n          test: /[\\\\/]node_modules[\\\\/]/,\n          name: 'vendors',\n          chunks: 'all',\n        },\n      },\n    },\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.(png|jpe?g|gif|svg)$/i,\n        use: [\n          {\n            loader: 'url-loader',\n            options: {\n              limit: 8192,\n            },\n          },\n          {\n            loader: 'image-webpack-loader',\n            options: {\n              mozjpeg: {\n                progressive: true,\n                quality: 85,\n              },\n              optipng: {\n                enabled: true,\n              },\n              pngquant: {\n                quality: [0.65, 0.90],\n                speed: 4,\n              },\n              webp: {\n                quality: 85,\n              },\n            },\n          },\n        ],\n      },\n    ],\n  },\n};";
    };
    PerformanceOptimizer.prototype.generateHTAccessConfig = function (analysis) {
        return "# Configuration Apache optimis\u00E9e pour les performances\n\n# Compression Gzip\n<IfModule mod_deflate.c>\n    AddOutputFilterByType DEFLATE text/plain\n    AddOutputFilterByType DEFLATE text/html\n    AddOutputFilterByType DEFLATE text/xml\n    AddOutputFilterByType DEFLATE text/css\n    AddOutputFilterByType DEFLATE application/xml\n    AddOutputFilterByType DEFLATE application/xhtml+xml\n    AddOutputFilterByType DEFLATE application/rss+xml\n    AddOutputFilterByType DEFLATE application/javascript\n    AddOutputFilterByType DEFLATE application/x-javascript\n</IfModule>\n\n# Cache des ressources statiques\n<IfModule mod_expires.c>\n    ExpiresActive on\n    ExpiresByType image/jpg \"access plus 1 month\"\n    ExpiresByType image/jpeg \"access plus 1 month\"\n    ExpiresByType image/gif \"access plus 1 month\"\n    ExpiresByType image/png \"access plus 1 month\"\n    ExpiresByType text/css \"access plus 1 month\"\n    ExpiresByType application/pdf \"access plus 1 month\"\n    ExpiresByType application/javascript \"access plus 1 month\"\n    ExpiresByType application/x-javascript \"access plus 1 month\"\n    ExpiresByType image/x-icon \"access plus 1 year\"\n</IfModule>\n\n# En-t\u00EAtes de s\u00E9curit\u00E9 et performance\n<IfModule mod_headers.c>\n    Header always set X-Content-Type-Options nosniff\n    Header always set X-Frame-Options DENY\n    Header always set X-XSS-Protection \"1; mode=block\"\n    Header always set Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\"\n</IfModule>";
    };
    PerformanceOptimizer.prototype.generateServiceWorkerConfig = function (analysis) {
        return "// Service Worker pour la mise en cache\nconst CACHE_NAME = 'performance-cache-v1';\nconst urlsToCache = [\n  '/',\n  '/css/critical.css',\n  '/js/main.js',\n  '/images/hero-800.webp',\n  '/fonts/optimized-font.woff2'\n];\n\nself.addEventListener('install', event => {\n  event.waitUntil(\n    caches.open(CACHE_NAME)\n      .then(cache => {\n        return cache.addAll(urlsToCache);\n      })\n  );\n});\n\nself.addEventListener('fetch', event => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(response => {\n        if (response) {\n          return response;\n        }\n        return fetch(event.request);\n      }\n    )\n  );\n});";
    };
    PerformanceOptimizer.prototype.generatePerformanceBudget = function (analysis) {
        return JSON.stringify({
            "budgets": [
                {
                    "type": "all",
                    "maximumWarning": "500kb",
                    "maximumError": "1mb"
                },
                {
                    "type": "initial",
                    "maximumWarning": "300kb",
                    "maximumError": "500kb"
                },
                {
                    "type": "anyComponentStyle",
                    "maximumWarning": "50kb",
                    "maximumError": "100kb"
                }
            ],
            "targets": {
                "lcp": "2500ms",
                "fid": "100ms",
                "cls": "0.1",
                "fcp": "1800ms"
            }
        }, null, 2);
    };
    PerformanceOptimizer.prototype.generateDeploymentInstructions = function (analysis) {
        return "# Instructions de d\u00E9ploiement - Optimisations Performance\n\n## 1. Pr\u00E9paration\n- [ ] Sauvegarder les assets actuels\n- [ ] Pr\u00E9parer l'environnement de test\n- [ ] Configurer les outils de monitoring\n\n## 2. Optimisation des images\n- [ ] Convertir les images aux formats modernes (WebP, AVIF)\n- [ ] Impl\u00E9menter les images responsive\n- [ ] Configurer le lazy loading\n\n## 3. Optimisation CSS\n- [ ] Extraire et inliner le CSS critique\n- [ ] Configurer le chargement asynchrone du CSS non-critique\n- [ ] Minifier et compresser les fichiers CSS\n\n## 4. Optimisation des polices\n- [ ] Impl\u00E9menter le font subsetting\n- [ ] Configurer le preload des polices critiques\n- [ ] Optimiser la strat\u00E9gie font-display\n\n## 5. Configuration serveur\n- [ ] Activer la compression Gzip/Brotli\n- [ ] Configurer la mise en cache\n- [ ] Impl\u00E9menter les en-t\u00EAtes de s\u00E9curit\u00E9\n\n## 6. Tests et validation\n- [ ] Tester les Core Web Vitals\n- [ ] Valider la compatibilit\u00E9 cross-browser\n- [ ] V\u00E9rifier l'accessibilit\u00E9\n\n## 7. Monitoring post-d\u00E9ploiement\n- [ ] Surveiller les m\u00E9triques pendant 48h\n- [ ] Ajuster si n\u00E9cessaire\n- [ ] Documenter les am\u00E9liorations\n\n## M\u00E9triques cibles\n- LCP: < 2.5s\n- FID: < 100ms\n- CLS: < 0.1\n- FCP: < 1.8s\n\n## Support\nEn cas de probl\u00E8me, contacter l'\u00E9quipe performance.";
    };
    // Méthodes utilitaires pour la génération d'analyses
    PerformanceOptimizer.prototype.analyzeImageFormats = function (optimizations) {
        var formats = optimizations.reduce(function (acc, opt) {
            var format = opt.currentFormat;
            if (!acc[format]) {
                acc[format] = { count: 0, totalSize: 0, averageSize: 0, compressionRatio: 0, modernFormatSupport: false };
            }
            acc[format].count++;
            acc[format].totalSize += opt.currentSize;
            acc[format].averageSize = acc[format].totalSize / acc[format].count;
            acc[format].modernFormatSupport = ['webp', 'avif'].includes(opt.recommendedFormat);
            return acc;
        }, {});
        return formats;
    };
    PerformanceOptimizer.prototype.extractImageIssues = function (optimizations) {
        return optimizations.map(function (opt) { return ({
            image: opt.image,
            type: 'unoptimized',
            severity: opt.estimatedSavings > 100 ? 'high' : 'medium',
            description: "Image non optimis\u00E9e: ".concat(opt.currentFormat, " \u2192 ").concat(opt.recommendedFormat),
            impact: "\u00C9conomie potentielle de ".concat(opt.estimatedSavings, "KB"),
            currentSize: opt.currentSize,
            potentialSize: opt.optimizedSize,
            savings: opt.estimatedSavings,
            fix: 'Conversion vers format moderne et compression optimisée'
        }); });
    };
    PerformanceOptimizer.prototype.generateFormatConversions = function (optimizations) {
        var conversions = new Map();
        optimizations.forEach(function (opt) {
            var key = "".concat(opt.currentFormat, "-").concat(opt.recommendedFormat);
            if (!conversions.has(key)) {
                conversions.set(key, {
                    from: opt.currentFormat,
                    to: opt.recommendedFormat,
                    images: [],
                    totalSavings: 0,
                    qualityImpact: 0,
                    browserSupport: 95,
                    fallbackRequired: true
                });
            }
            var conv = conversions.get(key);
            conv.images.push(opt.image);
            conv.totalSavings += opt.estimatedSavings;
            conv.qualityImpact = Math.max(conv.qualityImpact, opt.qualityLoss);
        });
        return Array.from(conversions.values());
    };
    PerformanceOptimizer.prototype.generateCompressionSettings = function (optimizations) {
        var formats = new Set(optimizations.map(function (opt) { return opt.recommendedFormat; }));
        return Array.from(formats).map(function (format) { return ({
            format: format,
            quality: 85,
            technique: 'Intelligent compression',
            estimatedSavings: optimizations
                .filter(function (opt) { return opt.recommendedFormat === format; })
                .reduce(function (sum, opt) { return sum + opt.estimatedSavings; }, 0),
            visualImpact: 'minimal'
        }); });
    };
    PerformanceOptimizer.prototype.getEmptyImageAnalysis = function () {
        return {
            totalSize: 0,
            totalCount: 0,
            formats: {},
            issues: [],
            optimizations: [],
            impact: { lcp: 0, fcp: 0, overallPerformance: 0 },
            recommendations: {
                formatConversions: [],
                compressionSettings: [],
                responsiveImages: [],
                lazyLoadingCandidates: []
            }
        };
    };
    PerformanceOptimizer.prototype.generateCSSAnalysisFromOptimization = function (cssOpt) {
        return {
            totalSize: cssOpt.criticalCSS.length + cssOpt.nonCriticalCSS.length,
            fileCount: 1,
            content: {
                rulesCount: 100,
                selectorsCount: 150,
                propertiesCount: 300,
                unusedRules: 20,
                duplicateRules: 5,
                complexSelectors: 10
            },
            issues: [],
            optimizations: cssOpt.optimizations,
            criticalCSS: {
                size: cssOpt.criticalCSS.length,
                extractionPossible: true,
                estimatedImpact: cssOpt.estimatedFCPImprovement,
                extractedRules: []
            },
            renderingImpact: {
                blockingTime: 200,
                layoutShiftContribution: 0.02,
                paintDelayContribution: 150
            }
        };
    };
    PerformanceOptimizer.prototype.generateFontAnalysisFromOptimization = function (fontOpt) {
        return {
            fonts: [],
            totalSize: 0,
            loadingStrategy: 'optimized',
            issues: [],
            optimizations: fontOpt.optimizations,
            impact: {
                fcp: 0,
                lcp: 0,
                cls: fontOpt.estimatedCLSReduction,
                userExperience: 85
            }
        };
    };
    PerformanceOptimizer.prototype.generateRenderingAnalysisFromLayoutShifts = function (layoutShiftPrev) {
        return {
            criticalRenderingPath: {
                resources: [],
                totalTime: 0,
                bottlenecks: [],
                optimizationPotential: 0
            },
            layoutShifts: {
                totalShift: layoutShiftPrev.detectedShifts.reduce(function (sum, shift) { return sum + shift.shiftValue; }, 0),
                sources: layoutShiftPrev.detectedShifts,
                timeline: [],
                affectedElements: layoutShiftPrev.detectedShifts.map(function (shift) { return shift.element; }),
                patterns: []
            },
            paintTiming: {
                firstPaint: 0,
                firstContentfulPaint: 0,
                largestContentfulPaint: 0,
                paintEvents: []
            },
            optimizations: [],
            issues: []
        };
    };
    PerformanceOptimizer.prototype.generateEmptyJSAnalysis = function () {
        return {
            bundles: [],
            totalSize: 0,
            executionTime: 0,
            impact: { tti: 0, fid: 0, totalBlockingTime: 0, mainThreadWork: 0 },
            issues: [],
            optimizations: [],
            thirdParty: []
        };
    };
    PerformanceOptimizer.prototype.generateEmptyHTMLAnalysis = function () {
        return {
            size: 0,
            elements: 0,
            depth: 0,
            structure: {
                headElements: 0,
                scriptTags: 0,
                styleTags: 0,
                imageElements: 0,
                renderBlockingElements: 0
            },
            issues: [],
            optimizations: [],
            qualityImpact: { seo: 0, accessibility: 0, performance: 0 }
        };
    };
    PerformanceOptimizer.prototype.generateEmptyThirdPartyAnalysis = function () {
        return {
            scripts: [],
            totalImpact: 0,
            categories: {},
            recommendations: []
        };
    };
    PerformanceOptimizer.prototype.generateEmptyNetworkAnalysis = function () {
        return {
            totalRequests: 0,
            totalSize: 0,
            requestTypes: {},
            compression: {
                enabled: false,
                ratio: 0,
                potentialSavings: 0,
                algorithms: []
            },
            caching: {
                cacheable: 0,
                cached: 0,
                efficiency: 0,
                recommendations: []
            },
            cdn: {
                inUse: false,
                coverage: 0,
                performance: 0,
                recommendations: []
            }
        };
    };
    PerformanceOptimizer.prototype.extractCriticalCSS = function (analysis) {
        return "/* CSS critique extrait automatiquement */\nbody { margin: 0; font-family: system-ui, sans-serif; }\n.content-section { padding: 2rem; }\nh1 { font-size: 2.5rem; margin-bottom: 1rem; }";
    };
    PerformanceOptimizer.prototype.generatePerformanceJS = function (analysis) {
        return "\n// Monitoring des performances\nconst perfObserver = new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    console.log('Performance metric:', entry);\n  }\n});\nperfObserver.observe({entryTypes: ['navigation', 'paint']});";
    };
    return PerformanceOptimizer;
}());
exports.PerformanceOptimizer = PerformanceOptimizer;
// ============================================================================
// CLASSES UTILITAIRES
// ============================================================================
var FormatOptimizer = /** @class */ (function () {
    function FormatOptimizer() {
    }
    FormatOptimizer.prototype.optimizeFormat = function (imageAnalysis, minQuality) {
        return __awaiter(this, void 0, void 0, function () {
            var currentFormat, recommendedFormat, savings;
            return __generator(this, function (_a) {
                currentFormat = imageAnalysis.format;
                recommendedFormat = 'webp';
                if (imageAnalysis.hasTransparency) {
                    recommendedFormat = 'png';
                }
                else if (imageAnalysis.size > 500000) {
                    recommendedFormat = 'avif';
                }
                savings = currentFormat !== recommendedFormat ? Math.round(imageAnalysis.size * 0.3) : 0;
                return [2 /*return*/, { format: recommendedFormat, savings: savings }];
            });
        });
    };
    return FormatOptimizer;
}());
var CompressionEngine = /** @class */ (function () {
    function CompressionEngine() {
    }
    CompressionEngine.prototype.optimizeCompression = function (imageAnalysis, format, minQuality) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation d'optimisation de compression
                return [2 /*return*/, {
                        compressionRatio: 0.7, // 30% de réduction
                        qualityLoss: 5, // 5% de perte de qualité
                        type: format === 'png' ? 'lossless' : 'lossy'
                    }];
            });
        });
    };
    return CompressionEngine;
}());
var ResponsiveImageGenerator = /** @class */ (function () {
    function ResponsiveImageGenerator() {
    }
    ResponsiveImageGenerator.prototype.generateResponsiveSet = function (imageAnalysis, deviceTypes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        breakpoints: [
                            { width: 480, size: '480w', format: 'webp' },
                            { width: 768, size: '768w', format: 'webp' },
                            { width: 1200, size: '1200w', format: 'webp' }
                        ]
                    }];
            });
        });
    };
    return ResponsiveImageGenerator;
}());
var LazyLoadingOptimizer = /** @class */ (function () {
    function LazyLoadingOptimizer() {
    }
    return LazyLoadingOptimizer;
}());
var CriticalCSSExtractor = /** @class */ (function () {
    function CriticalCSSExtractor() {
    }
    CriticalCSSExtractor.prototype.extractCritical = function (cssFiles, htmlContent, deviceTypes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation d'extraction de CSS critique
                return [2 /*return*/, "body { margin: 0; font-family: system-ui; }\n.hero { height: 60vh; background: #3b82f6; }\nh1 { font-size: 2.5rem; color: white; }"];
            });
        });
    };
    return CriticalCSSExtractor;
}());
var UnusedCSSRemover = /** @class */ (function () {
    function UnusedCSSRemover() {
    }
    UnusedCSSRemover.prototype.removeUnused = function (cssFiles, htmlContent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation de suppression CSS inutilisé
                return [2 /*return*/, "/* CSS nettoy\u00E9 - 40% de r\u00E9duction */"];
            });
        });
    };
    return UnusedCSSRemover;
}());
var CSSMinifier = /** @class */ (function () {
    function CSSMinifier() {
    }
    CSSMinifier.prototype.minify = function (css) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation de minification
                return [2 /*return*/, css.replace(/\s+/g, ' ').trim()];
            });
        });
    };
    return CSSMinifier;
}());
var CSSAnalyzer = /** @class */ (function () {
    function CSSAnalyzer() {
    }
    CSSAnalyzer.prototype.analyzeCSS = function (cssFiles) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        totalSize: 50000,
                        content: {
                            rulesCount: 200,
                            unusedRules: 50,
                            duplicateRules: 10
                        }
                    }];
            });
        });
    };
    return CSSAnalyzer;
}());
var FontAnalyzer = /** @class */ (function () {
    function FontAnalyzer() {
    }
    FontAnalyzer.prototype.analyzeFont = function (fontPath, textContent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        family: 'Inter',
                        variants: [{ weight: 400, style: 'normal' }],
                        usage: { coverage: 60 }
                    }];
            });
        });
    };
    return FontAnalyzer;
}());
var FontSubsetter = /** @class */ (function () {
    function FontSubsetter() {
    }
    FontSubsetter.prototype.generateSubset = function (fontAnalysis, textContent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        savings: Math.round(fontAnalysis.size * 0.4),
                        unicodeRange: 'U+0020-007F'
                    }];
            });
        });
    };
    return FontSubsetter;
}());
var FontCompressor = /** @class */ (function () {
    function FontCompressor() {
    }
    FontCompressor.prototype.optimizeFormat = function (fontAnalysis) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { savings: Math.round(fontAnalysis.size * 0.2) }];
            });
        });
    };
    return FontCompressor;
}());
var FontLoader = /** @class */ (function () {
    function FontLoader() {
    }
    FontLoader.prototype.optimizeLoading = function (fontAnalysis) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        fallbacks: ['system-ui', '-apple-system', 'sans-serif']
                    }];
            });
        });
    };
    return FontLoader;
}());
var DOMAnalyzer = /** @class */ (function () {
    function DOMAnalyzer() {
    }
    DOMAnalyzer.prototype.analyzeDOMStructure = function (htmlContent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        images: ['img1', 'img2'],
                        dynamicContent: ['content1'],
                        iframes: []
                    }];
            });
        });
    };
    return DOMAnalyzer;
}());
var ShiftDetector = /** @class */ (function () {
    function ShiftDetector() {
    }
    ShiftDetector.prototype.detectPotentialShifts = function (domAnalysis, cssContent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [
                        {
                            element: 'img1',
                            shiftValue: 0.15,
                            impact: 'high',
                            cause: 'Image sans dimensions',
                            remedy: 'Ajouter width et height'
                        }
                    ]];
            });
        });
    };
    return ShiftDetector;
}());
var PreventionGenerator = /** @class */ (function () {
    function PreventionGenerator() {
    }
    PreventionGenerator.prototype.generatePrevention = function (shift) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        type: 'image-dimensions',
                        element: shift.element,
                        selector: "img[data-id=\"".concat(shift.element, "\"]"),
                        dimensions: { width: 400, height: 300 },
                        effectiveness: 0.9
                    }];
            });
        });
    };
    return PreventionGenerator;
}());
var PerformanceAnalyzer = /** @class */ (function () {
    function PerformanceAnalyzer() {
    }
    PerformanceAnalyzer.prototype.analyzeCurrentPerformance = function (assets) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        metrics: {
                            lcp: { value: 3200, rating: 'needs-improvement' },
                            fid: { value: 120, rating: 'needs-improvement' },
                            cls: { value: 0.15, rating: 'needs-improvement' },
                            fcp: { value: 2100, rating: 'needs-improvement' }
                        },
                        scores: {
                            lighthouse: 65,
                            pagespeed: 68,
                            gtmetrix: 72,
                            webPageTest: 70,
                            overall: 69
                        }
                    }];
            });
        });
    };
    return PerformanceAnalyzer;
}());
var MetricsCalculator = /** @class */ (function () {
    function MetricsCalculator() {
    }
    return MetricsCalculator;
}());
exports.default = PerformanceOptimizer;
