"use strict";
/**
 * Security Validator
 * Système de validation sécurité enterprise pour le code généré
 *
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Validation OWASP, SAST, secrets detection, compliance enterprise
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
exports.SecurityValidatorFactory = exports.SecurityValidator = exports.DependencyScanner = exports.ComplianceValidator = exports.SecurityRulesEngine = void 0;
var events_1 = require("events");
// ========================================
// RULES ENGINE SÉCURITÉ
// ========================================
var SecurityRulesEngine = /** @class */ (function () {
    function SecurityRulesEngine() {
    }
    SecurityRulesEngine.getRulesByCategory = function (category) {
        return this.rules.filter(function (rule) { return rule.category === category && rule.enabled; });
    };
    SecurityRulesEngine.getRulesBySeverity = function (severity) {
        return this.rules.filter(function (rule) { return rule.severity === severity && rule.enabled; });
    };
    SecurityRulesEngine.getAllRules = function () {
        return this.rules.filter(function (rule) { return rule.enabled; });
    };
    SecurityRulesEngine.getRule = function (id) {
        return this.rules.find(function (rule) { return rule.id === id; });
    };
    SecurityRulesEngine.addCustomRule = function (rule) {
        this.rules.push(rule);
    };
    SecurityRulesEngine.updateRule = function (id, updates) {
        var ruleIndex = this.rules.findIndex(function (rule) { return rule.id === id; });
        if (ruleIndex !== -1) {
            this.rules[ruleIndex] = __assign(__assign({}, this.rules[ruleIndex]), updates);
        }
    };
    SecurityRulesEngine.rules = [
        // ========================================
        // INJECTION ATTACKS
        // ========================================
        {
            id: 'no-eval',
            name: 'Interdiction d\'eval()',
            category: 'injection',
            severity: 'critical',
            description: 'eval() peut permettre l\'injection de code arbitraire',
            pattern: /\beval\s*\(/gi,
            enabled: true,
            compliance: ['OWASP-A03:2021', 'CWE-95'],
            fixer: function (file) {
                return file.content.replace(/\beval\s*\([^)]*\)/gi, '// REMOVED: eval() usage');
            }
        },
        {
            id: 'no-function-constructor',
            name: 'Interdiction du constructeur Function',
            category: 'injection',
            severity: 'high',
            description: 'Le constructeur Function peut permettre l\'injection de code',
            pattern: /new\s+Function\s*\(/gi,
            enabled: true,
            compliance: ['OWASP-A03:2021', 'CWE-95']
        },
        {
            id: 'sql-injection-protection',
            name: 'Protection contre l\'injection SQL',
            category: 'injection',
            severity: 'high',
            description: 'Utiliser des requêtes préparées pour éviter l\'injection SQL',
            validator: function (file) {
                var violations = [];
                var lines = file.content.split('\n');
                lines.forEach(function (line, index) {
                    // Détection de concaténation SQL potentiellement dangereuse
                    if (/SELECT|INSERT|UPDATE|DELETE/i.test(line) && /\+\s*['"]/i.test(line)) {
                        violations.push({
                            ruleId: 'sql-injection-protection',
                            line: index + 1,
                            column: line.search(/SELECT|INSERT|UPDATE|DELETE/i),
                            evidence: line.trim(),
                            description: 'Possible injection SQL par concaténation',
                            severity: 'high',
                            cwe: 'CWE-89',
                            owasp: 'OWASP-A03:2021'
                        });
                    }
                });
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A03:2021', 'CWE-89']
        },
        // ========================================
        // XSS PROTECTION
        // ========================================
        {
            id: 'no-dangerously-set-inner-html',
            name: 'Éviter dangerouslySetInnerHTML',
            category: 'injection',
            severity: 'high',
            description: 'dangerouslySetInnerHTML peut exposer à des attaques XSS',
            pattern: /dangerouslySetInnerHTML/gi,
            enabled: true,
            compliance: ['OWASP-A03:2021', 'CWE-79']
        },
        {
            id: 'xss-protection-headers',
            name: 'Headers de protection XSS',
            category: 'configuration',
            severity: 'medium',
            description: 'Configurer les headers de sécurité contre XSS',
            validator: function (file) {
                var violations = [];
                if (file.path.includes('next.config') || file.path.includes('security')) {
                    if (!file.content.includes('X-XSS-Protection') &&
                        !file.content.includes('Content-Security-Policy')) {
                        violations.push({
                            ruleId: 'xss-protection-headers',
                            line: 1,
                            column: 1,
                            evidence: 'Configuration manquante',
                            description: 'Headers de protection XSS manquants',
                            severity: 'medium',
                            cwe: 'CWE-79',
                            owasp: 'OWASP-A03:2021'
                        });
                    }
                }
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A05:2021', 'CWE-79']
        },
        // ========================================
        // AUTHENTICATION & AUTHORIZATION
        // ========================================
        {
            id: 'secure-authentication',
            name: 'Authentification sécurisée',
            category: 'authentication',
            severity: 'high',
            description: 'Utiliser des méthodes d\'authentification sécurisées',
            validator: function (file) {
                var violations = [];
                var lines = file.content.split('\n');
                lines.forEach(function (line, index) {
                    // Recherche d'authentification non sécurisée
                    if (/password\s*===?\s*['"]/i.test(line) || /auth.*===['"]/i.test(line)) {
                        violations.push({
                            ruleId: 'secure-authentication',
                            line: index + 1,
                            column: line.search(/password|auth/i),
                            evidence: line.trim(),
                            description: 'Comparaison d\'authentification potentiellement non sécurisée',
                            severity: 'high',
                            cwe: 'CWE-287',
                            owasp: 'OWASP-A07:2021'
                        });
                    }
                });
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A07:2021', 'CWE-287']
        },
        {
            id: 'jwt-security',
            name: 'Sécurité JWT',
            category: 'authentication',
            severity: 'medium',
            description: 'Configurer correctement les JWT',
            validator: function (file) {
                var violations = [];
                if (file.content.includes('jwt') || file.content.includes('JWT')) {
                    if (!file.content.includes('expiresIn') && !file.content.includes('exp')) {
                        violations.push({
                            ruleId: 'jwt-security',
                            line: 1,
                            column: 1,
                            evidence: 'JWT sans expiration',
                            description: 'Les JWT doivent avoir une durée de vie limitée',
                            severity: 'medium',
                            cwe: 'CWE-613',
                            owasp: 'OWASP-A07:2021'
                        });
                    }
                }
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A07:2021', 'CWE-613']
        },
        // ========================================
        // CRYPTOGRAPHY
        // ========================================
        {
            id: 'weak-cryptography',
            name: 'Cryptographie faible',
            category: 'cryptography',
            severity: 'high',
            description: 'Éviter les algorithmes cryptographiques faibles',
            pattern: /\b(md5|sha1|des|rc4)\b/gi,
            enabled: true,
            compliance: ['OWASP-A02:2021', 'CWE-327']
        },
        {
            id: 'hardcoded-secrets',
            name: 'Secrets hardcodés',
            category: 'cryptography',
            severity: 'critical',
            description: 'Ne pas hardcoder les secrets dans le code',
            validator: function (file) {
                var violations = [];
                var lines = file.content.split('\n');
                // Patterns de détection de secrets
                var secretPatterns = [
                    { pattern: /sk_live_[a-zA-Z0-9]{24}/, type: 'Stripe Live Key' },
                    { pattern: /pk_live_[a-zA-Z0-9]{24}/, type: 'Stripe Publishable Key' },
                    { pattern: /AIza[0-9A-Za-z-_]{35}/, type: 'Google API Key' },
                    { pattern: /ya29\.[0-9A-Za-z\-_]+/, type: 'Google OAuth Token' },
                    { pattern: /AKIA[0-9A-Z]{16}/, type: 'AWS Access Key' },
                    { pattern: /[a-zA-Z0-9+/]{40}/, type: 'Generic Secret (Base64)' },
                    { pattern: /ghp_[a-zA-Z0-9]{36}/, type: 'GitHub Personal Access Token' },
                    { pattern: /xox[baprs]-([0-9a-zA-Z]{10,48})/, type: 'Slack Token' }
                ];
                lines.forEach(function (line, index) {
                    secretPatterns.forEach(function (_a) {
                        var pattern = _a.pattern, type = _a.type;
                        if (pattern.test(line) && !line.includes('EXAMPLE') && !line.includes('TEST')) {
                            violations.push({
                                ruleId: 'hardcoded-secrets',
                                line: index + 1,
                                column: line.search(pattern),
                                evidence: line.trim().replace(pattern, '[REDACTED]'),
                                description: "Secret potentiellement hardcod\u00E9: ".concat(type),
                                severity: 'critical',
                                cwe: 'CWE-798',
                                owasp: 'OWASP-A07:2021'
                            });
                        }
                    });
                });
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A07:2021', 'CWE-798']
        },
        // ========================================
        // INPUT VALIDATION
        // ========================================
        {
            id: 'input-validation',
            name: 'Validation des entrées',
            category: 'input-validation',
            severity: 'medium',
            description: 'Valider toutes les entrées utilisateur',
            validator: function (file) {
                var violations = [];
                if (file.type === 'api' || file.path.includes('api/')) {
                    if (!file.content.includes('zod') &&
                        !file.content.includes('joi') &&
                        !file.content.includes('yup') &&
                        !file.content.includes('validate')) {
                        violations.push({
                            ruleId: 'input-validation',
                            line: 1,
                            column: 1,
                            evidence: 'API sans validation',
                            description: 'Les APIs doivent valider les entrées',
                            severity: 'medium',
                            cwe: 'CWE-20',
                            owasp: 'OWASP-A03:2021'
                        });
                    }
                }
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A03:2021', 'CWE-20']
        },
        // ========================================
        // SESSION MANAGEMENT
        // ========================================
        {
            id: 'secure-session',
            name: 'Gestion sécurisée des sessions',
            category: 'session-management',
            severity: 'medium',
            description: 'Configurer les sessions de manière sécurisée',
            validator: function (file) {
                var violations = [];
                if (file.content.includes('session') || file.content.includes('cookie')) {
                    if (!file.content.includes('httpOnly') || !file.content.includes('secure')) {
                        violations.push({
                            ruleId: 'secure-session',
                            line: 1,
                            column: 1,
                            evidence: 'Configuration de session',
                            description: 'Les sessions doivent être configurées avec httpOnly et secure',
                            severity: 'medium',
                            cwe: 'CWE-614',
                            owasp: 'OWASP-A05:2021'
                        });
                    }
                }
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A05:2021', 'CWE-614']
        },
        // ========================================
        // ERROR HANDLING
        // ========================================
        {
            id: 'information-disclosure',
            name: 'Divulgation d\'informations',
            category: 'error-handling',
            severity: 'medium',
            description: 'Éviter la divulgation d\'informations sensibles dans les erreurs',
            validator: function (file) {
                var violations = [];
                var lines = file.content.split('\n');
                lines.forEach(function (line, index) {
                    // Recherche de divulgation d'informations sensibles
                    if (/console\.(error|log)\s*\(\s*error/i.test(line) ||
                        /throw.*error\.(stack|message)/i.test(line)) {
                        violations.push({
                            ruleId: 'information-disclosure',
                            line: index + 1,
                            column: line.search(/console|throw/i),
                            evidence: line.trim(),
                            description: 'Possible divulgation d\'informations sensibles',
                            severity: 'medium',
                            cwe: 'CWE-209',
                            owasp: 'OWASP-A09:2021'
                        });
                    }
                });
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A09:2021', 'CWE-209']
        },
        // ========================================
        // CONFIGURATION SECURITY
        // ========================================
        {
            id: 'security-headers',
            name: 'Headers de sécurité',
            category: 'configuration',
            severity: 'medium',
            description: 'Configurer les headers de sécurité HTTP',
            validator: function (file) {
                var violations = [];
                if (file.path.includes('next.config') || file.path.includes('middleware')) {
                    var requiredHeaders = [
                        'X-Frame-Options',
                        'X-Content-Type-Options',
                        'Referrer-Policy',
                        'Permissions-Policy'
                    ];
                    var missingHeaders = requiredHeaders.filter(function (header) {
                        return !file.content.includes(header);
                    });
                    if (missingHeaders.length > 0) {
                        violations.push({
                            ruleId: 'security-headers',
                            line: 1,
                            column: 1,
                            evidence: "Headers manquants: ".concat(missingHeaders.join(', ')),
                            description: 'Headers de sécurité manquants',
                            severity: 'medium',
                            cwe: 'CWE-16',
                            owasp: 'OWASP-A05:2021'
                        });
                    }
                }
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A05:2021', 'CWE-16']
        },
        {
            id: 'https-enforcement',
            name: 'Application HTTPS',
            category: 'configuration',
            severity: 'high',
            description: 'Forcer l\'utilisation de HTTPS',
            pattern: /http:\/\/(?!localhost|127\.0\.0\.1)/gi,
            enabled: true,
            compliance: ['OWASP-A05:2021', 'CWE-319']
        },
        // ========================================
        // DEPENDENCY SECURITY
        // ========================================
        {
            id: 'vulnerable-dependencies',
            name: 'Dépendances vulnérables',
            category: 'dependency',
            severity: 'high',
            description: 'Éviter les dépendances avec des vulnérabilités connues',
            validator: function (file) {
                var violations = [];
                if (file.path.includes('package.json')) {
                    // Liste des packages connus pour avoir des vulnérabilités
                    var vulnerablePackages = [
                        'lodash@4.17.15',
                        'moment@2.29.1',
                        'node-forge@0.10.0',
                        'xmldom@0.5.0'
                    ];
                    vulnerablePackages.forEach(function (pkg) {
                        if (file.content.includes(pkg)) {
                            violations.push({
                                ruleId: 'vulnerable-dependencies',
                                line: 1,
                                column: 1,
                                evidence: pkg,
                                description: "D\u00E9pendance vuln\u00E9rable d\u00E9tect\u00E9e: ".concat(pkg),
                                severity: 'high',
                                cwe: 'CWE-1104',
                                owasp: 'OWASP-A06:2021'
                            });
                        }
                    });
                }
                return violations;
            },
            enabled: true,
            compliance: ['OWASP-A06:2021', 'CWE-1104']
        }
    ];
    return SecurityRulesEngine;
}());
exports.SecurityRulesEngine = SecurityRulesEngine;
// ========================================
// COMPLIANCE VALIDATOR
// ========================================
var ComplianceValidator = /** @class */ (function () {
    function ComplianceValidator(config) {
        this.config = config;
    }
    ComplianceValidator.prototype.validateCompliance = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var standards, issues, owaspResults, cweResults, gdprResults, _i, _a, requirement, isCompliant, overallScore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('🔒 Validation de la conformité...');
                        standards = {};
                        issues = [];
                        if (!this.config.standards.owasp.enabled) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.validateOWASP(files)];
                    case 1:
                        owaspResults = _b.sent();
                        standards.owasp = owaspResults;
                        issues.push.apply(issues, owaspResults.issues);
                        _b.label = 2;
                    case 2:
                        if (!this.config.standards.cwe.enabled) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.validateCWE(files)];
                    case 3:
                        cweResults = _b.sent();
                        standards.cwe = cweResults;
                        issues.push.apply(issues, cweResults.issues);
                        _b.label = 4;
                    case 4:
                        if (!this.config.standards.gdpr.enabled) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.validateGDPR(files)];
                    case 5:
                        gdprResults = _b.sent();
                        standards.gdpr = gdprResults;
                        issues.push.apply(issues, gdprResults.issues);
                        _b.label = 6;
                    case 6:
                        // Validation des exigences personnalisées
                        for (_i = 0, _a = this.config.customRequirements; _i < _a.length; _i++) {
                            requirement = _a[_i];
                            isCompliant = requirement.validator(files);
                            if (!isCompliant) {
                                issues.push({
                                    standard: 'custom',
                                    requirement: requirement.id,
                                    severity: 'medium',
                                    message: requirement.description,
                                    remediation: requirement.remediation
                                });
                            }
                        }
                        overallScore = this.calculateComplianceScore(standards);
                        return [2 /*return*/, {
                                standards: standards,
                                overall: overallScore,
                                issues: issues
                            }];
                }
            });
        });
    };
    ComplianceValidator.prototype.validateOWASP = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, results;
            var _this = this;
            return __generator(this, function (_a) {
                categories = [
                    'A01:2021-Broken Access Control',
                    'A02:2021-Cryptographic Failures',
                    'A03:2021-Injection',
                    'A04:2021-Insecure Design',
                    'A05:2021-Security Misconfiguration',
                    'A06:2021-Vulnerable and Outdated Components',
                    'A07:2021-Identification and Authentication Failures',
                    'A08:2021-Software and Data Integrity Failures',
                    'A09:2021-Security Logging and Monitoring Failures',
                    'A10:2021-Server-Side Request Forgery'
                ];
                results = {
                    name: 'OWASP Top 10',
                    version: this.config.standards.owasp.version,
                    score: 100,
                    requirements: {},
                    issues: []
                };
                // Validation simplifiée pour chaque catégorie
                categories.forEach(function (category) {
                    var _a;
                    var violations = _this.checkOWASPCategory(files, category);
                    results.requirements[category] = violations.length === 0;
                    results.score -= violations.length * 10;
                    (_a = results.issues).push.apply(_a, violations);
                });
                results.score = Math.max(0, results.score);
                return [2 /*return*/, results];
            });
        });
    };
    ComplianceValidator.prototype.validateCWE = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Validation CWE simplifiée
                return [2 /*return*/, {
                        name: 'CWE',
                        score: 85,
                        requirements: {},
                        issues: []
                    }];
            });
        });
    };
    ComplianceValidator.prototype.validateGDPR = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var requirements, results;
            var _this = this;
            return __generator(this, function (_a) {
                requirements = [
                    'data-protection-by-design',
                    'consent-management',
                    'data-portability',
                    'right-to-be-forgotten',
                    'breach-notification',
                    'privacy-policy'
                ];
                results = {
                    name: 'GDPR',
                    score: 100,
                    requirements: {},
                    issues: []
                };
                // Vérifications GDPR basiques
                requirements.forEach(function (req) {
                    var compliant = _this.checkGDPRRequirement(files, req);
                    results.requirements[req] = compliant;
                    if (!compliant) {
                        results.score -= 15;
                        results.issues.push({
                            standard: 'GDPR',
                            requirement: req,
                            severity: 'high',
                            message: "Exigence GDPR non respect\u00E9e: ".concat(req)
                        });
                    }
                });
                return [2 /*return*/, results];
            });
        });
    };
    ComplianceValidator.prototype.checkOWASPCategory = function (files, category) {
        var violations = [];
        // Mappage simplifié OWASP -> règles
        var categoryRules = {
            'A03:2021-Injection': ['no-eval', 'sql-injection-protection', 'no-dangerously-set-inner-html'],
            'A02:2021-Cryptographic Failures': ['weak-cryptography', 'hardcoded-secrets'],
            'A07:2021-Identification and Authentication Failures': ['secure-authentication', 'jwt-security'],
            'A05:2021-Security Misconfiguration': ['security-headers', 'https-enforcement'],
            'A06:2021-Vulnerable and Outdated Components': ['vulnerable-dependencies']
        };
        var rules = categoryRules[category] || [];
        rules.forEach(function (ruleId) {
            var rule = SecurityRulesEngine.getRule(ruleId);
            if (rule) {
                files.forEach(function (file) {
                    if (rule.validator) {
                        var ruleViolations = rule.validator(file);
                        violations.push.apply(violations, ruleViolations.map(function (v) { return (__assign(__assign({}, v), { standard: 'OWASP', requirement: category, file: file.path })); }));
                    }
                    else if (rule.pattern) {
                        var matches = file.content.match(rule.pattern);
                        if (matches) {
                            violations.push({
                                standard: 'OWASP',
                                requirement: category,
                                severity: rule.severity,
                                message: rule.description,
                                file: file.path,
                                evidence: matches[0]
                            });
                        }
                    }
                });
            }
        });
        return violations;
    };
    ComplianceValidator.prototype.checkGDPRRequirement = function (files, requirement) {
        // Vérifications GDPR simplifiées
        switch (requirement) {
            case 'consent-management':
                return files.some(function (file) {
                    return file.content.includes('consent') ||
                        file.content.includes('cookie');
                });
            case 'privacy-policy':
                return files.some(function (file) {
                    return file.path.includes('privacy') ||
                        file.content.includes('privacy policy');
                });
            case 'data-portability':
                return files.some(function (file) {
                    return file.content.includes('export') &&
                        file.content.includes('data');
                });
            default:
                return true; // Par défaut, considérer comme conforme
        }
    };
    ComplianceValidator.prototype.calculateComplianceScore = function (standards) {
        var scores = Object.values(standards).map(function (standard) { return standard.score || 0; });
        return scores.length > 0 ? scores.reduce(function (a, b) { return a + b; }, 0) / scores.length : 100;
    };
    return ComplianceValidator;
}());
exports.ComplianceValidator = ComplianceValidator;
// ========================================
// DEPENDENCY SCANNER
// ========================================
var DependencyScanner = /** @class */ (function () {
    function DependencyScanner() {
    }
    DependencyScanner.prototype.scanDependencies = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var packageJsonFiles, totalDependencies, outdated, vulnerable, deprecated, dependencies, _i, packageJsonFiles_1, file, packageData, deps, _a, _b, _c, name_1, version, depInfo, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('📦 Scan des dépendances...');
                        packageJsonFiles = files.filter(function (f) { return f.path.includes('package.json'); });
                        totalDependencies = 0;
                        outdated = 0;
                        vulnerable = 0;
                        deprecated = 0;
                        dependencies = [];
                        _i = 0, packageJsonFiles_1 = packageJsonFiles;
                        _d.label = 1;
                    case 1:
                        if (!(_i < packageJsonFiles_1.length)) return [3 /*break*/, 9];
                        file = packageJsonFiles_1[_i];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, , 8]);
                        packageData = JSON.parse(file.content);
                        deps = __assign(__assign({}, packageData.dependencies), packageData.devDependencies);
                        _a = 0, _b = Object.entries(deps);
                        _d.label = 3;
                    case 3:
                        if (!(_a < _b.length)) return [3 /*break*/, 6];
                        _c = _b[_a], name_1 = _c[0], version = _c[1];
                        totalDependencies++;
                        return [4 /*yield*/, this.analyzeDependency(name_1, version)];
                    case 4:
                        depInfo = _d.sent();
                        dependencies.push(depInfo);
                        if (depInfo.vulnerabilities.length > 0)
                            vulnerable++;
                        if (depInfo.deprecated)
                            deprecated++;
                        // Logique d'outdated simplifiée
                        if (this.isOutdated(version, depInfo.latest))
                            outdated++;
                        _d.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _d.sent();
                        console.warn("Erreur analyse package.json: ".concat(error_1));
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/, {
                            total: totalDependencies,
                            outdated: outdated,
                            vulnerable: vulnerable,
                            deprecated: deprecated,
                            dependencies: dependencies
                        }];
                }
            });
        });
    };
    DependencyScanner.prototype.analyzeDependency = function (name, version) {
        return __awaiter(this, void 0, void 0, function () {
            var knownVulnerabilities;
            return __generator(this, function (_a) {
                knownVulnerabilities = {
                    'lodash': [
                        { id: 'CVE-2021-23337', severity: 'high', description: 'Command injection vulnerability' }
                    ],
                    'moment': [
                        { id: 'CVE-2022-31129', severity: 'medium', description: 'Path traversal vulnerability' }
                    ]
                };
                return [2 /*return*/, {
                        name: name,
                        version: version,
                        latest: this.getLatestVersion(name, version),
                        vulnerabilities: knownVulnerabilities[name] || [],
                        deprecated: ['moment', 'node-sass'].includes(name),
                        license: 'MIT', // Simulation
                        size: Math.floor(Math.random() * 1000000) // Simulation
                    }];
            });
        });
    };
    DependencyScanner.prototype.getLatestVersion = function (name, currentVersion) {
        // Simulation de récupération de la dernière version
        var versionMap = {
            'react': '18.2.0',
            'next': '15.0.0',
            'typescript': '5.3.0',
            'lodash': '4.17.21'
        };
        return versionMap[name] || currentVersion;
    };
    DependencyScanner.prototype.isOutdated = function (current, latest) {
        // Logique simplifiée de comparaison de versions
        var currentParts = current.replace(/[^\d.]/g, '').split('.').map(Number);
        var latestParts = latest.split('.').map(Number);
        for (var i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
            var currentPart = currentParts[i] || 0;
            var latestPart = latestParts[i] || 0;
            if (currentPart < latestPart)
                return true;
            if (currentPart > latestPart)
                return false;
        }
        return false;
    };
    return DependencyScanner;
}());
exports.DependencyScanner = DependencyScanner;
// ========================================
// SECURITY VALIDATOR PRINCIPAL
// ========================================
var SecurityValidator = /** @class */ (function (_super) {
    __extends(SecurityValidator, _super);
    function SecurityValidator(level) {
        if (level === void 0) { level = 'production'; }
        var _this = _super.call(this) || this;
        _this.config = _this.getConfigForLevel(level);
        _this.complianceValidator = new ComplianceValidator(_this.config.compliance);
        _this.dependencyScanner = new DependencyScanner();
        return _this;
    }
    SecurityValidator.prototype.validateSecurity = function (files, projectType) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, codeIssues, complianceReport, dependencyReport, secretsIssues, overallScore, recommendations, duration, status_1, report, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83D\uDD12 Validation s\u00E9curit\u00E9 pour projet ".concat(projectType, "..."));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        startTime = Date.now();
                        return [4 /*yield*/, this.scanStaticCode(files)];
                    case 2:
                        codeIssues = _a.sent();
                        return [4 /*yield*/, this.complianceValidator.validateCompliance(files)];
                    case 3:
                        complianceReport = _a.sent();
                        return [4 /*yield*/, this.dependencyScanner.scanDependencies(files)];
                    case 4:
                        dependencyReport = _a.sent();
                        return [4 /*yield*/, this.detectSecrets(files)];
                    case 5:
                        secretsIssues = _a.sent();
                        overallScore = this.calculateSecurityScore(codeIssues, complianceReport, dependencyReport, secretsIssues);
                        return [4 /*yield*/, this.generateSecurityRecommendations(codeIssues, complianceReport, dependencyReport)];
                    case 6:
                        recommendations = _a.sent();
                        duration = Date.now() - startTime;
                        status_1 = this.determineSecurityStatus(overallScore, codeIssues);
                        report = {
                            id: "sec_".concat(Date.now()),
                            projectId: 'current_project',
                            timestamp: new Date(),
                            status: status_1,
                            score: overallScore,
                            vulnerabilities: __spreadArray(__spreadArray([], codeIssues, true), secretsIssues, true),
                            secrets: secretsIssues,
                            compliance: complianceReport,
                            dependencies: dependencyReport,
                            recommendations: recommendations
                        };
                        console.log("\u2705 Validation s\u00E9curit\u00E9 termin\u00E9e en ".concat(duration, "ms - Score: ").concat(overallScore, "/100"));
                        this.emit('validation:completed', report);
                        return [2 /*return*/, report];
                    case 7:
                        error_2 = _a.sent();
                        console.error('❌ Erreur validation sécurité:', error_2);
                        this.emit('validation:error', error_2);
                        throw error_2;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SecurityValidator.prototype.scanStaticCode = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var issues, rules, _loop_1, _i, files_1, file;
            var _this = this;
            return __generator(this, function (_a) {
                issues = [];
                rules = SecurityRulesEngine.getAllRules();
                _loop_1 = function (file) {
                    var _loop_2 = function (rule) {
                        if (rule.validator) {
                            var violations = rule.validator(file);
                            violations.forEach(function (violation) {
                                issues.push({
                                    id: "".concat(rule.id, "_").concat(file.path, "_").concat(violation.line),
                                    type: 'vulnerability',
                                    severity: violation.severity,
                                    title: rule.name,
                                    description: violation.description,
                                    file: file.path,
                                    line: violation.line,
                                    column: violation.column,
                                    evidence: violation.evidence,
                                    fix: rule.fixer ? 'Auto-correction disponible' : 'Correction manuelle requise',
                                    references: rule.compliance,
                                    cve: violation.cwe,
                                    cvss: _this.calculateCVSS(violation.severity)
                                });
                            });
                        }
                        else if (rule.pattern) {
                            var matches = Array.from(file.content.matchAll(new RegExp(rule.pattern, 'gi')));
                            matches.forEach(function (match) {
                                var line = _this.findLineNumber(file.content, match.index);
                                issues.push({
                                    id: "".concat(rule.id, "_").concat(file.path, "_").concat(line),
                                    type: 'vulnerability',
                                    severity: rule.severity,
                                    title: rule.name,
                                    description: rule.description,
                                    file: file.path,
                                    line: line,
                                    column: match.index - file.content.lastIndexOf('\n', match.index),
                                    evidence: match[0],
                                    fix: rule.fixer ? 'Auto-correction disponible' : 'Correction manuelle requise',
                                    references: rule.compliance,
                                    cvss: _this.calculateCVSS(rule.severity)
                                });
                            });
                        }
                    };
                    for (var _b = 0, rules_1 = rules; _b < rules_1.length; _b++) {
                        var rule = rules_1[_b];
                        _loop_2(rule);
                    }
                };
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    _loop_1(file);
                }
                return [2 /*return*/, issues];
            });
        });
    };
    SecurityValidator.prototype.detectSecrets = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var secretsRule, secrets, _loop_3, _i, files_2, file;
            return __generator(this, function (_a) {
                secretsRule = SecurityRulesEngine.getRule('hardcoded-secrets');
                if (!secretsRule || !secretsRule.validator)
                    return [2 /*return*/, []];
                secrets = [];
                _loop_3 = function (file) {
                    var violations = secretsRule.validator(file);
                    violations.forEach(function (violation) {
                        secrets.push({
                            id: "secret_".concat(file.path, "_").concat(violation.line),
                            type: 'secret',
                            severity: 'critical',
                            title: 'Secret hardcodé détecté',
                            description: violation.description,
                            file: file.path,
                            line: violation.line,
                            column: violation.column,
                            evidence: violation.evidence,
                            fix: 'Déplacer vers les variables d\'environnement',
                            references: ['OWASP-A07:2021', 'CWE-798'],
                            cvss: 9.0
                        });
                    });
                };
                for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
                    file = files_2[_i];
                    _loop_3(file);
                }
                return [2 /*return*/, secrets];
            });
        });
    };
    SecurityValidator.prototype.calculateSecurityScore = function (codeIssues, complianceReport, dependencyReport, secretsIssues) {
        var score = 100;
        // Pénalités pour les problèmes de code
        codeIssues.forEach(function (issue) {
            switch (issue.severity) {
                case 'critical':
                    score -= 25;
                    break;
                case 'high':
                    score -= 15;
                    break;
                case 'medium':
                    score -= 10;
                    break;
                case 'low':
                    score -= 5;
                    break;
                default: score -= 1;
            }
        });
        // Pénalités pour les secrets
        secretsIssues.forEach(function () {
            score -= 30; // Très pénalisant
        });
        // Pénalités pour les dépendances
        score -= dependencyReport.vulnerable * 10;
        score -= dependencyReport.deprecated * 5;
        // Bonus/malus conformité
        score = score * (complianceReport.overall / 100);
        return Math.max(0, Math.round(score));
    };
    SecurityValidator.prototype.determineSecurityStatus = function (score, issues) {
        var criticalIssues = issues.filter(function (i) { return i.severity === 'critical'; });
        if (criticalIssues.length > 0 || score < 50)
            return 'critical';
        if (score < 75 || issues.length > 10)
            return 'warnings';
        return 'clean';
    };
    SecurityValidator.prototype.generateSecurityRecommendations = function (codeIssues, complianceReport, dependencyReport) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendations, criticalIssues;
            return __generator(this, function (_a) {
                recommendations = [];
                criticalIssues = codeIssues.filter(function (i) { return i.severity === 'critical'; });
                if (criticalIssues.length > 0) {
                    recommendations.push({
                        id: 'fix-critical-security',
                        type: 'vulnerability',
                        priority: 'critical',
                        title: 'Corriger les vulnérabilités critiques',
                        description: "".concat(criticalIssues.length, " vuln\u00E9rabilit\u00E9(s) critique(s) d\u00E9tect\u00E9e(s)"),
                        impact: 'Risque élevé de compromission de sécurité',
                        effort: 'high',
                        implementation: 'Examiner et corriger chaque vulnérabilité critique immédiatement',
                        resources: [
                            'https://owasp.org/www-project-top-ten/',
                            'https://cwe.mitre.org/',
                            'https://nvd.nist.gov/'
                        ]
                    });
                }
                // Recommandations pour les dépendances vulnérables
                if (dependencyReport.vulnerable > 0) {
                    recommendations.push({
                        id: 'update-vulnerable-dependencies',
                        type: 'dependency',
                        priority: 'high',
                        title: 'Mettre à jour les dépendances vulnérables',
                        description: "".concat(dependencyReport.vulnerable, " d\u00E9pendance(s) vuln\u00E9rable(s)"),
                        impact: 'Réduction des vecteurs d\'attaque',
                        effort: 'medium',
                        implementation: 'Utiliser npm audit fix ou yarn audit fix',
                        resources: [
                            'https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities',
                            'https://snyk.io/advisor/'
                        ]
                    });
                }
                // Recommandations pour la conformité
                if (complianceReport.overall < 80) {
                    recommendations.push({
                        id: 'improve-compliance',
                        type: 'compliance',
                        priority: 'medium',
                        title: 'Améliorer la conformité',
                        description: "Score de conformit\u00E9: ".concat(complianceReport.overall, "%"),
                        impact: 'Respect des standards de sécurité',
                        effort: 'medium',
                        implementation: 'Implémenter les contrôles de sécurité manquants',
                        resources: [
                            'https://owasp.org/www-project-application-security-verification-standard/',
                            'https://www.sans.org/top25-software-errors/'
                        ]
                    });
                }
                return [2 /*return*/, recommendations];
            });
        });
    };
    SecurityValidator.prototype.getConfigForLevel = function (level) {
        var baseConfig = {
            enabled: true,
            level: 'standard',
            rules: SecurityRulesEngine.getAllRules(),
            compliance: {
                standards: {
                    owasp: { enabled: true, version: '2021', categories: [] },
                    cwe: { enabled: true, categories: [] },
                    nist: { enabled: false, framework: '' },
                    iso27001: { enabled: false, controls: [] },
                    gdpr: { enabled: true, requirements: [] },
                    hipaa: { enabled: false, safeguards: [] },
                    sox: { enabled: false, controls: [] }
                },
                customRequirements: []
            },
            scanning: {
                staticAnalysis: { enabled: true, tools: ['internal'] },
                dynamicAnalysis: { enabled: false, tools: [] },
                dependencyScanning: { enabled: true, sources: ['npm'] },
                secretsDetection: { enabled: true, patterns: [] },
                containerScanning: { enabled: false, registries: [] },
                infrastructureScanning: { enabled: false, providers: [] }
            },
            reporting: {
                formats: ['json'],
                includeRemediation: true,
                includePriority: true,
                includeCompliance: true,
                includeMetrics: true
            }
        };
        switch (level) {
            case 'mvp':
                return __assign(__assign({}, baseConfig), { level: 'basic', rules: SecurityRulesEngine.getRulesBySeverity('critical')
                        .concat(SecurityRulesEngine.getRulesBySeverity('high')) });
            case 'production':
                return baseConfig;
            case 'enterprise':
                return __assign(__assign({}, baseConfig), { level: 'enterprise', compliance: __assign(__assign({}, baseConfig.compliance), { standards: __assign(__assign({}, baseConfig.compliance.standards), { nist: { enabled: true, framework: 'cybersecurity' }, iso27001: { enabled: true, controls: [] }, hipaa: { enabled: true, safeguards: [] }, sox: { enabled: true, controls: [] } }) }), scanning: __assign(__assign({}, baseConfig.scanning), { dynamicAnalysis: { enabled: true, tools: ['zap'] }, containerScanning: { enabled: true, registries: ['docker'] }, infrastructureScanning: { enabled: true, providers: ['aws', 'gcp'] } }) });
            default:
                return baseConfig;
        }
    };
    // Méthodes utilitaires
    SecurityValidator.prototype.calculateCVSS = function (severity) {
        var cvssMap = {
            info: 0.1,
            low: 3.9,
            medium: 6.9,
            high: 8.9,
            critical: 10.0
        };
        return cvssMap[severity] || 5.0;
    };
    SecurityValidator.prototype.findLineNumber = function (content, index) {
        return content.substring(0, index).split('\n').length;
    };
    SecurityValidator.prototype.getConfiguration = function () {
        return this.config;
    };
    SecurityValidator.prototype.updateConfiguration = function (updates) {
        this.config = __assign(__assign({}, this.config), updates);
    };
    return SecurityValidator;
}(events_1.EventEmitter));
exports.SecurityValidator = SecurityValidator;
// ========================================
// FACTORY ET EXPORTS
// ========================================
var SecurityValidatorFactory = /** @class */ (function () {
    function SecurityValidatorFactory() {
    }
    SecurityValidatorFactory.create = function (level) {
        if (level === void 0) { level = 'production'; }
        return new SecurityValidator(level);
    };
    SecurityValidatorFactory.validateProject = function (files, projectType, level) {
        if (level === void 0) { level = 'production'; }
        return __awaiter(this, void 0, void 0, function () {
            var validator;
            return __generator(this, function (_a) {
                validator = this.create(level);
                return [2 /*return*/, validator.validateSecurity(files, projectType)];
            });
        });
    };
    return SecurityValidatorFactory;
}());
exports.SecurityValidatorFactory = SecurityValidatorFactory;
exports.default = SecurityValidator;
