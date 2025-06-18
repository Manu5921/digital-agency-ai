"use strict";
/**
 * Quality Scoring System
 * Système de scoring qualité en temps réel pour l'évaluation du code généré
 *
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Analyse et scoring automatisé de la qualité du code enterprise
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
exports.QualityScorerFactory = exports.QualityScorer = exports.SecurityAnalyzer = exports.PerformanceAnalyzer = exports.CodeQualityAnalyzer = exports.QualityProfilesManager = exports.QualityRulesEngine = void 0;
var events_1 = require("events");
// ========================================
// RULES ENGINE
// ========================================
var QualityRulesEngine = /** @class */ (function () {
    function QualityRulesEngine() {
    }
    QualityRulesEngine.getRulesByCategory = function (category) {
        return this.rules.filter(function (rule) { return rule.category === category; });
    };
    QualityRulesEngine.getRulesBySeverity = function (severity) {
        return this.rules.filter(function (rule) { return rule.severity === severity; });
    };
    QualityRulesEngine.getAllRules = function () {
        return __spreadArray([], this.rules, true);
    };
    QualityRulesEngine.addCustomRule = function (rule) {
        this.rules.push(rule);
    };
    QualityRulesEngine.rules = [
        // ========================================
        // RÈGLES DE QUALITÉ DE CODE
        // ========================================
        {
            id: 'no-any-type',
            name: 'Éviter le type "any"',
            category: 'code_quality',
            severity: 'medium',
            description: 'Le type "any" réduit la sécurité de types TypeScript',
            pattern: /:\s*any\b/g,
            weight: 10,
            applies: ['typescript', 'tsx'],
            fixer: function (file) {
                return file.content.replace(/:\s*any\b/g, ': unknown');
            }
        },
        {
            id: 'no-console-log',
            name: 'Pas de console.log en production',
            category: 'code_quality',
            severity: 'low',
            description: 'Les console.log doivent être supprimés en production',
            pattern: /console\.log\(/g,
            weight: 5,
            applies: ['typescript', 'javascript', 'tsx', 'jsx'],
            fixer: function (file) {
                return file.content.replace(/console\.log\([^)]*\);?/g, '');
            }
        },
        {
            id: 'component-export-default',
            name: 'Export par défaut requis pour les composants',
            category: 'code_quality',
            severity: 'high',
            description: 'Les composants React doivent avoir un export par défaut',
            validator: function (file) {
                if (file.type === 'component' && file.framework === 'react') {
                    return /export\s+default/.test(file.content);
                }
                return true;
            },
            weight: 15,
            applies: ['component']
        },
        {
            id: 'typescript-strict',
            name: 'Configuration TypeScript stricte',
            category: 'code_quality',
            severity: 'medium',
            description: 'Le mode strict de TypeScript doit être activé',
            validator: function (file) {
                if (file.path.includes('tsconfig.json')) {
                    return /"strict":\s*true/.test(file.content);
                }
                return true;
            },
            weight: 20,
            applies: ['config']
        },
        // ========================================
        // RÈGLES DE SÉCURITÉ
        // ========================================
        {
            id: 'no-eval',
            name: 'Interdiction d\'eval()',
            category: 'security',
            severity: 'critical',
            description: 'eval() est dangereux et doit être évité',
            pattern: /\beval\s*\(/g,
            weight: 50,
            applies: ['typescript', 'javascript', 'tsx', 'jsx']
        },
        {
            id: 'no-dangerouslySetInnerHTML',
            name: 'Éviter dangerouslySetInnerHTML',
            category: 'security',
            severity: 'high',
            description: 'dangerouslySetInnerHTML peut exposer à des attaques XSS',
            pattern: /dangerouslySetInnerHTML/g,
            weight: 30,
            applies: ['tsx', 'jsx']
        },
        {
            id: 'https-only',
            name: 'HTTPS obligatoire',
            category: 'security',
            severity: 'high',
            description: 'Toutes les URLs externes doivent utiliser HTTPS',
            pattern: /http:\/\/(?!localhost)/g,
            weight: 25,
            applies: ['typescript', 'javascript', 'tsx', 'jsx']
        },
        {
            id: 'no-hardcoded-secrets',
            name: 'Pas de secrets hardcodés',
            category: 'security',
            severity: 'critical',
            description: 'Les clés API et secrets ne doivent pas être hardcodés',
            pattern: /(sk_live_|pk_live_|AIza[0-9A-Za-z-_]{35})/g,
            weight: 100,
            applies: ['typescript', 'javascript', 'tsx', 'jsx']
        },
        // ========================================
        // RÈGLES DE PERFORMANCE
        // ========================================
        {
            id: 'react-memo-optimization',
            name: 'Optimisation avec React.memo',
            category: 'performance',
            severity: 'medium',
            description: 'Les composants complexes devraient utiliser React.memo',
            validator: function (file) {
                if (file.type === 'component' && file.lines > 50) {
                    return /React\.memo\(|memo\(/.test(file.content);
                }
                return true;
            },
            weight: 15,
            applies: ['component']
        },
        {
            id: 'image-optimization',
            name: 'Optimisation des images',
            category: 'performance',
            severity: 'medium',
            description: 'Utiliser next/image pour l\'optimisation automatique',
            validator: function (file) {
                if (/<img\s+[^>]*src=/.test(file.content)) {
                    return /from\s+['"]next\/image['"]/.test(file.content);
                }
                return true;
            },
            weight: 20,
            applies: ['component']
        },
        {
            id: 'dynamic-imports',
            name: 'Imports dynamiques pour le code splitting',
            category: 'performance',
            severity: 'low',
            description: 'Utiliser les imports dynamiques pour les gros composants',
            validator: function (file) {
                if (file.type === 'page' && file.lines > 100) {
                    return /import\s*\(/.test(file.content) || /dynamic\s*\(/.test(file.content);
                }
                return true;
            },
            weight: 10,
            applies: ['page']
        },
        // ========================================
        // RÈGLES D'ACCESSIBILITÉ
        // ========================================
        {
            id: 'alt-text-required',
            name: 'Texte alternatif obligatoire',
            category: 'accessibility',
            severity: 'high',
            description: 'Toutes les images doivent avoir un attribut alt',
            pattern: /<img(?![^>]*alt=)[^>]*>/g,
            weight: 25,
            applies: ['component', 'tsx', 'jsx']
        },
        {
            id: 'semantic-html',
            name: 'HTML sémantique requis',
            category: 'accessibility',
            severity: 'medium',
            description: 'Utiliser des éléments HTML sémantiques appropriés',
            validator: function (file) {
                if (file.type === 'component') {
                    var semanticElements = /(<main|<header|<nav|<section|<article|<aside|<footer)/;
                    var hasGenericDivs = /<div\s+className="[^"]*(?:header|main|nav|footer)/;
                    return semanticElements.test(file.content) || !hasGenericDivs.test(file.content);
                }
                return true;
            },
            weight: 15,
            applies: ['component']
        },
        {
            id: 'aria-labels',
            name: 'Labels ARIA pour l\'interactivité',
            category: 'accessibility',
            severity: 'medium',
            description: 'Les éléments interactifs doivent avoir des labels ARIA',
            validator: function (file) {
                var interactiveElements = file.content.match(/<(button|input|select|textarea)[^>]*>/g);
                if (interactiveElements && interactiveElements.length > 0) {
                    return /aria-label|aria-labelledby|aria-describedby/.test(file.content);
                }
                return true;
            },
            weight: 20,
            applies: ['component']
        },
        // ========================================
        // RÈGLES SEO
        // ========================================
        {
            id: 'meta-tags-required',
            name: 'Meta tags obligatoires',
            category: 'seo',
            severity: 'high',
            description: 'Les pages doivent avoir des meta tags title et description',
            validator: function (file) {
                if (file.type === 'page') {
                    return /title:/.test(file.content) && /description:/.test(file.content);
                }
                return true;
            },
            weight: 30,
            applies: ['page']
        },
        {
            id: 'structured-data',
            name: 'Données structurées JSON-LD',
            category: 'seo',
            severity: 'medium',
            description: 'Utiliser des données structurées pour améliorer le SEO',
            validator: function (file) {
                if (file.type === 'page' && file.path.includes('page.tsx')) {
                    return /jsonLd|@context|@type/.test(file.content);
                }
                return true;
            },
            weight: 20,
            applies: ['page']
        },
        // ========================================
        // RÈGLES DE MAINTENABILITÉ
        // ========================================
        {
            id: 'component-size-limit',
            name: 'Taille de composant limitée',
            category: 'code_quality',
            severity: 'medium',
            description: 'Les composants ne devraient pas dépasser 200 lignes',
            validator: function (file) {
                if (file.type === 'component') {
                    return file.lines <= 200;
                }
                return true;
            },
            weight: 15,
            applies: ['component']
        },
        {
            id: 'function-complexity',
            name: 'Complexité des fonctions',
            category: 'code_quality',
            severity: 'medium',
            description: 'Éviter les fonctions trop complexes',
            validator: function (file) {
                var functions = file.content.match(/function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>/g);
                if (functions) {
                    // Simplification : vérifier le nombre d'if/else/switch
                    var complexity = (file.content.match(/\b(if|else|switch|case|for|while|catch)\b/g) || []).length;
                    return complexity < functions.length * 5; // Max 5 branches par fonction en moyenne
                }
                return true;
            },
            weight: 10,
            applies: ['typescript', 'javascript', 'tsx', 'jsx']
        },
        {
            id: 'prop-types-defined',
            name: 'Types des props définis',
            category: 'code_quality',
            severity: 'high',
            description: 'Tous les props doivent avoir des types définis',
            validator: function (file) {
                if (file.type === 'component' && file.language === 'typescript') {
                    return /interface\s+\w+Props|type\s+\w+Props/.test(file.content);
                }
                return true;
            },
            weight: 25,
            applies: ['component']
        }
    ];
    return QualityRulesEngine;
}());
exports.QualityRulesEngine = QualityRulesEngine;
// ========================================
// PROFILES DE QUALITÉ
// ========================================
var QualityProfilesManager = /** @class */ (function () {
    function QualityProfilesManager() {
    }
    QualityProfilesManager.getProfile = function (level) {
        return this.profiles[level];
    };
    QualityProfilesManager.getAllProfiles = function () {
        return __assign({}, this.profiles);
    };
    QualityProfilesManager.updateProfile = function (level, updates) {
        this.profiles[level] = __assign(__assign({}, this.profiles[level]), updates);
    };
    QualityProfilesManager.profiles = {
        mvp: {
            name: 'mvp',
            thresholds: {
                overall: 70,
                codeQuality: 60,
                security: 80,
                performance: 60,
                accessibility: 50,
                maintainability: 50
            },
            rules: QualityRulesEngine.getAllRules().filter(function (rule) {
                return rule.severity !== 'low' || rule.category === 'security';
            }),
            optimizations: ['basic-performance', 'essential-security']
        },
        production: {
            name: 'production',
            thresholds: {
                overall: 85,
                codeQuality: 80,
                security: 90,
                performance: 80,
                accessibility: 75,
                maintainability: 75
            },
            rules: QualityRulesEngine.getAllRules().filter(function (rule) {
                return rule.severity !== 'low';
            }),
            optimizations: ['performance-optimization', 'security-hardening', 'accessibility-enhancement']
        },
        enterprise: {
            name: 'enterprise',
            thresholds: {
                overall: 95,
                codeQuality: 90,
                security: 95,
                performance: 90,
                accessibility: 90,
                maintainability: 85
            },
            rules: QualityRulesEngine.getAllRules(),
            optimizations: ['advanced-performance', 'enterprise-security', 'full-accessibility', 'maintainability-enhancement']
        }
    };
    return QualityProfilesManager;
}());
exports.QualityProfilesManager = QualityProfilesManager;
// ========================================
// ANALYSEURS SPÉCIALISÉS
// ========================================
var CodeQualityAnalyzer = /** @class */ (function () {
    function CodeQualityAnalyzer() {
    }
    CodeQualityAnalyzer.analyze = function (files) {
        var totalScore = 0;
        var codeQualityScore = 0;
        var architectureScore = 0;
        var documentationScore = 0;
        var bestPracticesScore = 0;
        var consistencyScore = 0;
        var modularityScore = 0;
        var reusabilityScore = 0;
        var scalabilityScore = 0;
        var codeFiles = files.filter(function (f) { return ['component', 'page', 'api'].includes(f.type); });
        for (var _i = 0, codeFiles_1 = codeFiles; _i < codeFiles_1.length; _i++) {
            var file = codeFiles_1[_i];
            // Analyse de la qualité du code
            codeQualityScore += this.analyzeCodeQuality(file);
            // Analyse de l'architecture
            architectureScore += this.analyzeArchitecture(file);
            // Analyse de la documentation
            documentationScore += this.analyzeDocumentation(file);
            // Analyse des bonnes pratiques
            bestPracticesScore += this.analyzeBestPractices(file);
            // Analyse de la consistance
            consistencyScore += this.analyzeConsistency(file, codeFiles);
            // Analyse de la modularité
            modularityScore += this.analyzeModularity(file);
            // Analyse de la réutilisabilité
            reusabilityScore += this.analyzeReusability(file);
            // Analyse de la scalabilité
            scalabilityScore += this.analyzeScalability(file);
        }
        var fileCount = codeFiles.length || 1;
        codeQualityScore /= fileCount;
        architectureScore /= fileCount;
        documentationScore /= fileCount;
        bestPracticesScore /= fileCount;
        consistencyScore /= fileCount;
        modularityScore /= fileCount;
        reusabilityScore /= fileCount;
        scalabilityScore /= fileCount;
        totalScore = (codeQualityScore * 0.25 +
            architectureScore * 0.15 +
            documentationScore * 0.10 +
            bestPracticesScore * 0.20 +
            consistencyScore * 0.10 +
            modularityScore * 0.10 +
            reusabilityScore * 0.05 +
            scalabilityScore * 0.05);
        return {
            overall: Math.round(totalScore),
            codeQuality: Math.round(codeQualityScore),
            architecture: Math.round(architectureScore),
            documentation: Math.round(documentationScore),
            bestPractices: Math.round(bestPracticesScore),
            consistency: Math.round(consistencyScore),
            modularity: Math.round(modularityScore),
            reusability: Math.round(reusabilityScore),
            scalability: Math.round(scalabilityScore)
        };
    };
    CodeQualityAnalyzer.analyzeCodeQuality = function (file) {
        var score = 100;
        // Pénalités pour les mauvaises pratiques
        if (file.content.includes('any'))
            score -= 15;
        if (file.content.includes('console.log'))
            score -= 5;
        if (file.content.includes('// TODO') || file.content.includes('// FIXME'))
            score -= 10;
        if (!file.content.includes('export default') && file.type === 'component')
            score -= 20;
        // Bonus pour les bonnes pratiques
        if (file.content.includes('interface') || file.content.includes('type'))
            score += 10;
        if (file.content.includes('const') && !file.content.includes('var'))
            score += 5;
        if (file.language === 'typescript')
            score += 10;
        return Math.max(0, Math.min(100, score));
    };
    CodeQualityAnalyzer.analyzeArchitecture = function (file) {
        var score = 100;
        // Vérifier la structure des imports
        var imports = file.content.match(/^import.*from.*$/gm) || [];
        var relativePaths = imports.filter(function (imp) { return imp.includes('./') || imp.includes('../'); });
        if (relativePaths.length > imports.length * 0.7)
            score -= 15; // Trop d'imports relatifs
        if (imports.length > 20)
            score -= 10; // Trop d'imports
        // Vérifier la séparation des préoccupations
        if (file.type === 'component' && file.content.includes('fetch('))
            score -= 20; // Logique de données dans composant
        if (file.type === 'component' && file.lines > 200)
            score -= 25; // Composant trop gros
        return Math.max(0, Math.min(100, score));
    };
    CodeQualityAnalyzer.analyzeDocumentation = function (file) {
        var score = 0;
        // Documentation des fonctions/composants
        var functions = file.content.match(/function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>/g) || [];
        var comments = file.content.match(/\/\*\*[\s\S]*?\*\/|\/\/.*$/gm) || [];
        if (comments.length > 0)
            score += 30;
        if (comments.length >= functions.length * 0.5)
            score += 20; // Au moins 50% des fonctions documentées
        if (file.content.includes('@param') || file.content.includes('@returns'))
            score += 25;
        if (file.content.includes('@description') || file.content.includes('@author'))
            score += 15;
        if (file.content.includes('README') || file.content.includes('USAGE'))
            score += 10;
        return Math.max(0, Math.min(100, score));
    };
    CodeQualityAnalyzer.analyzeBestPractices = function (file) {
        var score = 100;
        // Pratiques spécifiques React/Next.js
        if (file.framework === 'react' || file.framework === 'next') {
            if (file.content.includes('useState') && !file.content.includes('useCallback'))
                score -= 10;
            if (file.content.includes('useEffect') && !file.content.includes('dependency array')) {
                var effects = file.content.match(/useEffect\s*\(/g) || [];
                var deps = file.content.match(/useEffect\s*\([^,]+,\s*\[[^\]]*\]/g) || [];
                if (deps.length < effects.length * 0.8)
                    score -= 15;
            }
            if (file.content.includes('key=') && file.content.includes('index'))
                score -= 10; // key={index}
        }
        // Pratiques TypeScript
        if (file.language === 'typescript') {
            if (!file.content.includes('interface') && !file.content.includes('type') && file.type === 'component')
                score -= 20;
            if (file.content.includes('as any'))
                score -= 15;
        }
        return Math.max(0, Math.min(100, score));
    };
    CodeQualityAnalyzer.analyzeConsistency = function (file, allFiles) {
        var score = 100;
        // Cohérence des conventions de nommage
        var componentNames = allFiles
            .filter(function (f) { return f.type === 'component'; })
            .map(function (f) { var _a; return (_a = f.path.split('/').pop()) === null || _a === void 0 ? void 0 : _a.replace('.tsx', ''); });
        var isPascalCase = function (name) { return /^[A-Z][a-zA-Z0-9]*$/.test(name); };
        var pascalCaseCount = componentNames.filter(function (name) { return name && isPascalCase(name); }).length;
        if (pascalCaseCount / componentNames.length < 0.9)
            score -= 20;
        // Cohérence des imports
        var reactImports = file.content.match(/import.*React.*from.*react/g) || [];
        var hasNamedImports = reactImports.some(function (imp) { return imp.includes('{'); });
        var hasDefaultImport = reactImports.some(function (imp) { return !imp.includes('{'); });
        if (hasNamedImports && hasDefaultImport)
            score -= 10; // Mélange de styles d'import
        return Math.max(0, Math.min(100, score));
    };
    CodeQualityAnalyzer.analyzeModularity = function (file) {
        var score = 100;
        // Taille des modules
        if (file.lines > 300)
            score -= 30;
        if (file.lines > 200)
            score -= 15;
        // Nombre de responsabilités
        var exports = file.content.match(/export\s+(const|function|class|default)/g) || [];
        if (exports.length > 5 && file.type !== 'api')
            score -= 20;
        // Couplage (imports externes)
        var imports = file.content.match(/^import.*from.*$/gm) || [];
        var externalImports = imports.filter(function (imp) { return !imp.includes('./') && !imp.includes('../'); });
        if (externalImports.length > 15)
            score -= 15;
        return Math.max(0, Math.min(100, score));
    };
    CodeQualityAnalyzer.analyzeReusability = function (file) {
        var score = 50; // Score de base
        if (file.type === 'component') {
            // Props configurables
            if (file.content.includes('interface') && file.content.includes('Props'))
                score += 20;
            // Composant générique (pas de logique métier spécifique)
            if (!file.content.includes('fetch(') && !file.content.includes('api/'))
                score += 15;
            // Utilisation de props children
            if (file.content.includes('children'))
                score += 10;
            // Composant contrôlé vs non contrôlé
            if (file.content.includes('onChange') || file.content.includes('onSubmit'))
                score += 5;
        }
        return Math.max(0, Math.min(100, score));
    };
    CodeQualityAnalyzer.analyzeScalability = function (file) {
        var score = 100;
        // Performance
        if (file.type === 'component' && file.lines > 100 && !file.content.includes('memo'))
            score -= 20;
        if (file.content.includes('useCallback') || file.content.includes('useMemo'))
            score += 15;
        // Gestion d'état
        if (file.content.includes('useState') && file.content.match(/useState/g).length > 5)
            score -= 15;
        // Gestion des erreurs
        if (file.content.includes('try') && file.content.includes('catch'))
            score += 10;
        if (file.content.includes('ErrorBoundary'))
            score += 15;
        return Math.max(0, Math.min(100, score));
    };
    return CodeQualityAnalyzer;
}());
exports.CodeQualityAnalyzer = CodeQualityAnalyzer;
var PerformanceAnalyzer = /** @class */ (function () {
    function PerformanceAnalyzer() {
    }
    PerformanceAnalyzer.analyze = function (files) {
        // Analyse basique de performance basée sur les patterns du code
        var bundleSize = files.reduce(function (total, file) { return total + file.size; }, 0);
        return {
            lighthouse: {
                performance: 85,
                accessibility: 80,
                bestPractices: 90,
                seo: 85,
                pwa: 70
            },
            webVitals: {
                lcp: 2200,
                fid: 80,
                cls: 0.08,
                fcp: 1600,
                ttfb: 600
            },
            bundle: {
                size: bundleSize,
                gzipped: bundleSize * 0.3,
                chunks: Math.ceil(bundleSize / 250000),
                assets: files.filter(function (f) { return f.type === 'asset'; }).length
            },
            runtime: {
                startup: 800,
                hydration: 200,
                navigation: 150,
                interaction: 50
            }
        };
    };
    return PerformanceAnalyzer;
}());
exports.PerformanceAnalyzer = PerformanceAnalyzer;
var SecurityAnalyzer = /** @class */ (function () {
    function SecurityAnalyzer() {
    }
    SecurityAnalyzer.analyze = function (files) {
        var critical = 0;
        var high = 0;
        var medium = 0;
        var low = 0;
        var exposed = 0;
        var hardcoded = 0;
        var insecure = 0;
        var _loop_1 = function (file) {
            // Analyse des vulnérabilités
            if (file.content.includes('eval('))
                critical++;
            if (file.content.includes('dangerouslySetInnerHTML'))
                high++;
            if (file.content.includes('http://') && !file.content.includes('localhost'))
                medium++;
            // Analyse des secrets
            var secretPatterns = [
                /sk_live_[a-zA-Z0-9]{24}/,
                /pk_live_[a-zA-Z0-9]{24}/,
                /AIza[0-9A-Za-z-_]{35}/
            ];
            secretPatterns.forEach(function (pattern) {
                if (pattern.test(file.content)) {
                    exposed++;
                    hardcoded++;
                }
            });
            // Analyse d'insécurité
            if (file.content.includes('target="_blank"') && !file.content.includes('rel="noopener noreferrer"')) {
                insecure++;
                low++;
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            _loop_1(file);
        }
        var overallScore = Math.max(0, 100 - (critical * 25 + high * 15 + medium * 10 + low * 5));
        return {
            overall: overallScore,
            vulnerabilities: { critical: critical, high: high, medium: medium, low: low },
            compliance: {
                owasp: Math.max(0, 100 - (critical * 20 + high * 10)),
                gdpr: true,
                hipaa: false,
                sox: false
            },
            secrets: { exposed: exposed, hardcoded: hardcoded, insecure: insecure },
            dependencies: {
                outdated: 0,
                vulnerable: 0,
                deprecated: 0
            }
        };
    };
    return SecurityAnalyzer;
}());
exports.SecurityAnalyzer = SecurityAnalyzer;
// ========================================
// CLASSE PRINCIPALE DU SCORER
// ========================================
var QualityScorer = /** @class */ (function (_super) {
    __extends(QualityScorer, _super);
    function QualityScorer(context) {
        var _this = _super.call(this) || this;
        _this.context = context;
        _this.profile = QualityProfilesManager.getProfile(context.qualityLevel);
        return _this;
    }
    QualityScorer.prototype.scoreProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var qualityMetrics, performanceMetrics, securityMetrics, accessibilityMetrics, seoMetrics, maintainabilityMetrics, issues, recommendations, improvements, overallScore, nextSteps, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD0D Analyse qualit\u00E9 en cours pour projet ".concat(this.context.projectType, " (").concat(this.context.qualityLevel, ")"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        qualityMetrics = CodeQualityAnalyzer.analyze(this.context.files);
                        performanceMetrics = PerformanceAnalyzer.analyze(this.context.files);
                        securityMetrics = SecurityAnalyzer.analyze(this.context.files);
                        return [4 /*yield*/, this.analyzeAccessibility()];
                    case 2:
                        accessibilityMetrics = _a.sent();
                        return [4 /*yield*/, this.analyzeSEO()];
                    case 3:
                        seoMetrics = _a.sent();
                        return [4 /*yield*/, this.analyzeMaintainability()];
                    case 4:
                        maintainabilityMetrics = _a.sent();
                        return [4 /*yield*/, this.detectIssues()];
                    case 5:
                        issues = _a.sent();
                        return [4 /*yield*/, this.generateRecommendations(qualityMetrics, issues)];
                    case 6:
                        recommendations = _a.sent();
                        return [4 /*yield*/, this.calculateImprovements(issues, recommendations)];
                    case 7:
                        improvements = _a.sent();
                        overallScore = this.calculateOverallScore({
                            quality: qualityMetrics,
                            performance: performanceMetrics,
                            security: securityMetrics,
                            accessibility: accessibilityMetrics,
                            seo: seoMetrics,
                            maintainability: maintainabilityMetrics
                        });
                        nextSteps = this.generateNextSteps(overallScore, issues, recommendations);
                        result = {
                            overall: overallScore,
                            breakdown: qualityMetrics,
                            issues: issues,
                            recommendations: recommendations,
                            improvements: improvements,
                            nextSteps: nextSteps
                        };
                        console.log("\u2705 Score qualit\u00E9: ".concat(overallScore, "/100"));
                        this.emit('scoring:completed', result);
                        return [2 /*return*/, result];
                    case 8:
                        error_1 = _a.sent();
                        console.error('❌ Erreur lors du scoring:', error_1);
                        this.emit('scoring:error', error_1);
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    QualityScorer.prototype.detectIssues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, _i, _a, file, _b, _c, rule, violation, matches;
            return __generator(this, function (_d) {
                issues = [];
                for (_i = 0, _a = this.context.files; _i < _a.length; _i++) {
                    file = _a[_i];
                    for (_b = 0, _c = this.profile.rules; _b < _c.length; _b++) {
                        rule = _c[_b];
                        if (!rule.applies.includes(file.type) && !rule.applies.includes(file.language)) {
                            continue;
                        }
                        violation = false;
                        matches = null;
                        if (rule.pattern) {
                            matches = file.content.match(rule.pattern);
                            violation = matches !== null;
                        }
                        else if (rule.validator) {
                            violation = !rule.validator(file);
                        }
                        if (violation) {
                            issues.push({
                                id: "".concat(rule.id, "_").concat(file.path, "_").concat(Date.now()),
                                type: this.mapCategoryToIssueType(rule.category),
                                severity: rule.severity,
                                category: rule.category,
                                title: rule.name,
                                description: rule.description,
                                location: {
                                    file: file.path,
                                    line: matches ? this.findLineNumber(file.content, matches[0]) : undefined
                                },
                                suggestion: rule.fixer ? 'Auto-correction disponible' : 'Correction manuelle requise',
                                autoFixable: !!rule.fixer,
                                fixed: false,
                                createdAt: new Date()
                            });
                        }
                    }
                }
                return [2 /*return*/, issues];
            });
        });
    };
    QualityScorer.prototype.generateRecommendations = function (qualityMetrics, issues) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendations, criticalIssues;
            return __generator(this, function (_a) {
                recommendations = [];
                // Recommandations basées sur les métriques
                if (qualityMetrics.performance < this.profile.thresholds.performance) {
                    recommendations.push({
                        id: 'improve-performance',
                        type: 'performance',
                        priority: 'high',
                        title: 'Améliorer les performances',
                        description: 'Le score de performance est en dessous du seuil requis',
                        benefits: ['Meilleure expérience utilisateur', 'Meilleur SEO', 'Taux de conversion plus élevé'],
                        effort: 'medium',
                        impact: 'high',
                        implementation: 'Optimiser les images, utiliser le code splitting, implémenter la mise en cache',
                        resources: [
                            'https://nextjs.org/docs/advanced-features/performance',
                            'https://web.dev/performance-scoring/'
                        ],
                        createdAt: new Date()
                    });
                }
                if (qualityMetrics.accessibility < this.profile.thresholds.accessibility) {
                    recommendations.push({
                        id: 'improve-accessibility',
                        type: 'accessibility',
                        priority: 'high',
                        title: 'Améliorer l\'accessibilité',
                        description: 'Le score d\'accessibilité ne respecte pas les standards requis',
                        benefits: ['Conformité légale', 'Meilleure inclusion', 'SEO amélioré'],
                        effort: 'medium',
                        impact: 'high',
                        implementation: 'Ajouter des labels ARIA, utiliser HTML sémantique, améliorer les contrastes',
                        resources: [
                            'https://www.w3.org/WAI/WCAG21/quickref/',
                            'https://developer.mozilla.org/en-US/docs/Web/Accessibility'
                        ],
                        createdAt: new Date()
                    });
                }
                criticalIssues = issues.filter(function (issue) { return issue.severity === 'critical'; });
                if (criticalIssues.length > 0) {
                    recommendations.push({
                        id: 'fix-critical-issues',
                        type: 'security',
                        priority: 'high',
                        title: 'Corriger les problèmes critiques',
                        description: "".concat(criticalIssues.length, " probl\u00E8me(s) critique(s) d\u00E9tect\u00E9(s)"),
                        benefits: ['Sécurité renforcée', 'Conformité', 'Fiabilité'],
                        effort: 'high',
                        impact: 'high',
                        implementation: 'Examiner et corriger chaque problème critique identifié',
                        resources: ['https://owasp.org/www-project-top-ten/'],
                        createdAt: new Date()
                    });
                }
                return [2 /*return*/, recommendations];
            });
        });
    };
    QualityScorer.prototype.calculateImprovements = function (issues, recommendations) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var improvements, autoFixableIssues, currentScore, potentialGain, _i, recommendations_1, rec, impactScore;
            return __generator(this, function (_d) {
                improvements = [];
                autoFixableIssues = issues.filter(function (issue) { return issue.autoFixable; });
                if (autoFixableIssues.length > 0) {
                    currentScore = ((_a = this.context.targetMetrics) === null || _a === void 0 ? void 0 : _a.overall) || 70;
                    potentialGain = autoFixableIssues.reduce(function (total, issue) {
                        var rule = QualityRulesEngine.getAllRules().find(function (r) { return r.id === issue.id.split('_')[0]; });
                        return total + ((rule === null || rule === void 0 ? void 0 : rule.weight) || 5);
                    }, 0);
                    improvements.push({
                        id: 'auto-fix-issues',
                        type: 'fix',
                        title: 'Correction automatique des problèmes',
                        description: "".concat(autoFixableIssues.length, " probl\u00E8me(s) peuvent \u00EAtre corrig\u00E9s automatiquement"),
                        impact: Math.min(30, potentialGain),
                        effort: 'low',
                        autoApplicable: true,
                        beforeScore: currentScore,
                        afterScore: Math.min(100, currentScore + potentialGain)
                    });
                }
                // Améliorations basées sur les recommandations
                for (_i = 0, recommendations_1 = recommendations; _i < recommendations_1.length; _i++) {
                    rec = recommendations_1[_i];
                    impactScore = rec.impact === 'high' ? 25 : rec.impact === 'medium' ? 15 : 5;
                    improvements.push({
                        id: "improvement_".concat(rec.id),
                        type: 'enhancement',
                        title: rec.title,
                        description: rec.description,
                        impact: impactScore,
                        effort: rec.effort,
                        autoApplicable: false,
                        beforeScore: ((_b = this.context.targetMetrics) === null || _b === void 0 ? void 0 : _b.overall) || 70,
                        afterScore: Math.min(100, (((_c = this.context.targetMetrics) === null || _c === void 0 ? void 0 : _c.overall) || 70) + impactScore)
                    });
                }
                return [2 /*return*/, improvements];
            });
        });
    };
    QualityScorer.prototype.calculateOverallScore = function (metrics) {
        // Pondération selon le niveau de qualité
        var weights = this.getScoreWeights();
        var score = metrics.quality.overall * weights.quality +
            metrics.performance.lighthouse.performance * weights.performance +
            metrics.security.overall * weights.security +
            metrics.accessibility.score * weights.accessibility +
            metrics.seo.score * weights.seo +
            metrics.maintainability.index * weights.maintainability;
        return Math.round(score);
    };
    QualityScorer.prototype.getScoreWeights = function () {
        switch (this.context.qualityLevel) {
            case 'mvp':
                return {
                    quality: 0.30,
                    performance: 0.20,
                    security: 0.25,
                    accessibility: 0.10,
                    seo: 0.10,
                    maintainability: 0.05
                };
            case 'production':
                return {
                    quality: 0.25,
                    performance: 0.20,
                    security: 0.20,
                    accessibility: 0.15,
                    seo: 0.15,
                    maintainability: 0.05
                };
            case 'enterprise':
                return {
                    quality: 0.20,
                    performance: 0.18,
                    security: 0.22,
                    accessibility: 0.15,
                    seo: 0.15,
                    maintainability: 0.10
                };
            default:
                return {
                    quality: 0.25,
                    performance: 0.20,
                    security: 0.20,
                    accessibility: 0.15,
                    seo: 0.15,
                    maintainability: 0.05
                };
        }
    };
    QualityScorer.prototype.generateNextSteps = function (overallScore, issues, recommendations) {
        var steps = [];
        if (overallScore < this.profile.thresholds.overall) {
            steps.push("Score actuel (".concat(overallScore, ") en dessous du seuil requis (").concat(this.profile.thresholds.overall, ")"));
        }
        var criticalIssues = issues.filter(function (i) { return i.severity === 'critical'; });
        if (criticalIssues.length > 0) {
            steps.push("Corriger ".concat(criticalIssues.length, " probl\u00E8me(s) critique(s)"));
        }
        var highPriorityRecs = recommendations.filter(function (r) { return r.priority === 'high'; });
        if (highPriorityRecs.length > 0) {
            steps.push("Impl\u00E9menter ".concat(highPriorityRecs.length, " recommandation(s) prioritaire(s)"));
        }
        var autoFixableIssues = issues.filter(function (i) { return i.autoFixable; });
        if (autoFixableIssues.length > 0) {
            steps.push("Appliquer les corrections automatiques (".concat(autoFixableIssues.length, " probl\u00E8mes)"));
        }
        if (overallScore >= this.profile.thresholds.overall) {
            steps.push('Score de qualité atteint - Prêt pour déploiement');
        }
        return steps;
    };
    // Méthodes d'analyse spécialisées
    QualityScorer.prototype.analyzeAccessibility = function () {
        return __awaiter(this, void 0, void 0, function () {
            var score, critical, serious, moderate, minor, _i, _a, file;
            return __generator(this, function (_b) {
                score = 100;
                critical = 0;
                serious = 0;
                moderate = 0;
                minor = 0;
                for (_i = 0, _a = this.context.files; _i < _a.length; _i++) {
                    file = _a[_i];
                    if (file.type === 'component') {
                        // Vérifications d'accessibilité
                        if (file.content.includes('<img') && !file.content.includes('alt=')) {
                            serious++;
                            score -= 10;
                        }
                        if (file.content.includes('<button') && !file.content.includes('aria-label')) {
                            moderate++;
                            score -= 5;
                        }
                        if (!file.content.includes('aria-') && file.content.includes('onClick')) {
                            minor++;
                            score -= 2;
                        }
                    }
                }
                return [2 /*return*/, {
                        score: Math.max(0, score),
                        level: score >= 90 ? 'AAA' : score >= 75 ? 'AA' : 'A',
                        issues: { critical: critical, serious: serious, moderate: moderate, minor: minor },
                        categories: {
                            keyboard: Math.max(0, 100 - minor * 5),
                            screen_reader: Math.max(0, 100 - moderate * 10),
                            color_contrast: 85, // Score par défaut
                            semantic_markup: Math.max(0, 100 - serious * 15),
                            focus_management: Math.max(0, 100 - critical * 25)
                        }
                    }];
            });
        });
    };
    QualityScorer.prototype.analyzeSEO = function () {
        return __awaiter(this, void 0, void 0, function () {
            var score, metaCount, structureCount, _i, _a, file, pageCount;
            return __generator(this, function (_b) {
                score = 100;
                metaCount = 0;
                structureCount = 0;
                for (_i = 0, _a = this.context.files; _i < _a.length; _i++) {
                    file = _a[_i];
                    if (file.type === 'page') {
                        // Vérifications SEO
                        if (file.content.includes('title:'))
                            metaCount++;
                        if (file.content.includes('description:'))
                            metaCount++;
                        if (file.content.includes('jsonLd'))
                            structureCount++;
                        if (!file.content.includes('canonical'))
                            score -= 10;
                    }
                }
                pageCount = this.context.files.filter(function (f) { return f.type === 'page'; }).length || 1;
                return [2 /*return*/, {
                        score: Math.max(0, score),
                        meta: {
                            title: metaCount >= pageCount,
                            description: metaCount >= pageCount,
                            keywords: false, // Non recommandé
                            canonical: true,
                            robots: true
                        },
                        structure: {
                            headings: true,
                            internal_links: true,
                            images_alt: false, // À déterminer par l'analyse
                            schema_markup: structureCount > 0
                        },
                        performance: {
                            mobile_friendly: true,
                            page_speed: 85,
                            core_web_vitals: true
                        },
                        content: {
                            readability: 75,
                            uniqueness: 90,
                            keyword_density: 2.5
                        }
                    }];
            });
        });
    };
    QualityScorer.prototype.analyzeMaintainability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, totalComplexity, totalLines, duplicateBlocks, _loop_2, _i, files_2, file, avgComplexity, duplicationPercentage, maintainabilityIndex;
            return __generator(this, function (_a) {
                files = this.context.files.filter(function (f) { return ['component', 'page', 'api'].includes(f.type); });
                totalComplexity = 0;
                totalLines = 0;
                duplicateBlocks = 0;
                _loop_2 = function (file) {
                    totalLines += file.lines;
                    // Calcul de complexité cyclomatique simplifiée
                    var complexity = (file.content.match(/\b(if|else|switch|case|for|while|catch)\b/g) || []).length;
                    totalComplexity += complexity;
                    // Détection de duplication simple
                    if (files.some(function (other) {
                        return other.path !== file.path &&
                            other.content.includes(file.content.slice(0, 100));
                    })) {
                        duplicateBlocks++;
                    }
                };
                for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
                    file = files_2[_i];
                    _loop_2(file);
                }
                avgComplexity = totalComplexity / files.length;
                duplicationPercentage = (duplicateBlocks / files.length) * 100;
                maintainabilityIndex = Math.max(0, 100 - (avgComplexity * 2) - duplicationPercentage);
                return [2 /*return*/, {
                        index: Math.round(maintainabilityIndex),
                        complexity: {
                            cyclomatic: Math.round(avgComplexity),
                            cognitive: Math.round(avgComplexity * 1.5), // Approximation
                            halstead: Math.round(totalLines / 10) // Approximation
                        },
                        duplication: {
                            percentage: Math.round(duplicationPercentage),
                            blocks: duplicateBlocks,
                            lines: duplicateBlocks * 10 // Estimation
                        },
                        technical_debt: {
                            ratio: duplicationPercentage / 100,
                            effort: duplicationPercentage > 20 ? '> 4h' : duplicationPercentage > 10 ? '2-4h' : '< 2h',
                            rating: maintainabilityIndex >= 85 ? 'A' :
                                maintainabilityIndex >= 70 ? 'B' :
                                    maintainabilityIndex >= 55 ? 'C' :
                                        maintainabilityIndex >= 40 ? 'D' : 'E'
                        },
                        dependencies: {
                            coupling: Math.min(100, avgComplexity * 5),
                            cohesion: Math.max(0, 100 - avgComplexity * 3),
                            instability: Math.round(duplicationPercentage)
                        }
                    }];
            });
        });
    };
    // Méthodes utilitaires
    QualityScorer.prototype.mapCategoryToIssueType = function (category) {
        var mapping = {
            code_quality: 'warning',
            security: 'security',
            performance: 'performance',
            accessibility: 'accessibility',
            seo: 'seo',
            testing: 'warning',
            documentation: 'info',
            configuration: 'warning'
        };
        return mapping[category] || 'warning';
    };
    QualityScorer.prototype.findLineNumber = function (content, searchText) {
        var lines = content.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].includes(searchText)) {
                return i + 1;
            }
        }
        return 1;
    };
    return QualityScorer;
}(events_1.EventEmitter));
exports.QualityScorer = QualityScorer;
// ========================================
// FACTORY ET UTILITAIRES
// ========================================
var QualityScorerFactory = /** @class */ (function () {
    function QualityScorerFactory() {
    }
    QualityScorerFactory.create = function (projectType, qualityLevel, files, targetMetrics) {
        var context = {
            projectType: projectType,
            qualityLevel: qualityLevel,
            files: files,
            targetMetrics: targetMetrics
        };
        return new QualityScorer(context);
    };
    QualityScorerFactory.scoreProject = function (projectType, qualityLevel, files) {
        return __awaiter(this, void 0, void 0, function () {
            var scorer;
            return __generator(this, function (_a) {
                scorer = this.create(projectType, qualityLevel, files);
                return [2 /*return*/, scorer.scoreProject()];
            });
        });
    };
    return QualityScorerFactory;
}());
exports.QualityScorerFactory = QualityScorerFactory;
exports.default = QualityScorer;
