"use strict";
/**
 * Auth & Permissions System - Phase 2
 * NextAuth.js v5 + RBAC + Middleware + Session Management
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthActions = exports.PermissionManager = exports.signOut = exports.signIn = exports.auth = exports.handlers = exports.authConfig = exports.ROLE_PERMISSIONS = exports.PERMISSIONS = exports.LoginSchema = exports.RegisterSchema = exports.UserSchema = void 0;
var next_auth_1 = require("next-auth");
var google_1 = require("next-auth/providers/google");
var credentials_1 = require("next-auth/providers/credentials");
var prisma_adapter_1 = require("@auth/prisma-adapter");
var zod_1 = require("zod");
var bcryptjs_1 = require("bcryptjs");
var prisma_1 = require("@/lib/prisma");
// Schemas de validation
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    role: zod_1.z.enum(['USER', 'ADMIN', 'MODERATOR', 'EDITOR']).default('USER'),
    permissions: zod_1.z.array(zod_1.z.string()).default([]),
    emailVerified: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    name: zod_1.z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    confirmPassword: zod_1.z.string(),
}).refine(function (data) { return data.password === data.confirmPassword; }, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1, 'Le mot de passe est requis'),
});
// Permissions définies
exports.PERMISSIONS = {
    // Contenu
    'content:read': 'Lire le contenu',
    'content:write': 'Créer/modifier le contenu',
    'content:delete': 'Supprimer le contenu',
    'content:publish': 'Publier le contenu',
    // Commandes
    'orders:read': 'Voir les commandes',
    'orders:write': 'Modifier les commandes',
    'orders:delete': 'Supprimer les commandes',
    // Utilisateurs
    'users:read': 'Voir les utilisateurs',
    'users:write': 'Modifier les utilisateurs',
    'users:delete': 'Supprimer les utilisateurs',
    'users:manage_roles': 'Gérer les rôles',
    // Produits
    'products:read': 'Voir les produits',
    'products:write': 'Créer/modifier les produits',
    'products:delete': 'Supprimer les produits',
    'products:manage_inventory': 'Gérer l\'inventaire',
    // Analytics
    'analytics:read': 'Voir les analytics',
    // Système
    'system:settings': 'Modifier les paramètres système',
    'system:backup': 'Gérer les sauvegardes',
};
// Rôles et leurs permissions
exports.ROLE_PERMISSIONS = {
    USER: [
        'content:read',
        'products:read',
    ],
    EDITOR: [
        'content:read',
        'content:write',
        'products:read',
        'products:write',
        'orders:read',
    ],
    MODERATOR: [
        'content:read',
        'content:write',
        'content:delete',
        'products:read',
        'products:write',
        'products:delete',
        'orders:read',
        'orders:write',
        'users:read',
        'analytics:read',
    ],
    ADMIN: Object.keys(exports.PERMISSIONS), // Toutes les permissions
};
/**
 * Configuration NextAuth
 */
exports.authConfig = {
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prisma_1.prisma),
    providers: [
        (0, google_1.default)({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        (0, credentials_1.default)({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: function (credentials) {
                return __awaiter(this, void 0, void 0, function () {
                    var validatedFields, _a, email, password, user, isPasswordValid, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                validatedFields = exports.LoginSchema.safeParse(credentials);
                                if (!validatedFields.success) {
                                    return [2 /*return*/, null];
                                }
                                _a = validatedFields.data, email = _a.email, password = _a.password;
                                return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                                        where: { email: email },
                                    })];
                            case 1:
                                user = _b.sent();
                                if (!user || !user.password) {
                                    return [2 /*return*/, null];
                                }
                                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                            case 2:
                                isPasswordValid = _b.sent();
                                if (!isPasswordValid) {
                                    return [2 /*return*/, null];
                                }
                                return [2 /*return*/, {
                                        id: user.id,
                                        email: user.email,
                                        name: user.name,
                                        image: user.image,
                                        role: user.role,
                                    }];
                            case 3:
                                error_1 = _b.sent();
                                console.error('Erreur authentification:', error_1);
                                return [2 /*return*/, null];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    },
    callbacks: {
        jwt: function (_a) {
            var token = _a.token, user = _a.user, trigger = _a.trigger, session = _a.session;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    // Mise à jour initiale lors de la connexion
                    if (user) {
                        token.role = user.role;
                        token.permissions = exports.ROLE_PERMISSIONS[user.role];
                    }
                    // Mise à jour du token lors de la mise à jour de session
                    if (trigger === 'update' && session) {
                        token.role = session.user.role;
                        token.permissions = exports.ROLE_PERMISSIONS[session.user.role];
                    }
                    return [2 /*return*/, token];
                });
            });
        },
        session: function (_a) {
            var session = _a.session, token = _a.token;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    if (token && session.user) {
                        session.user.id = token.sub;
                        session.user.role = token.role;
                        session.user.permissions = token.permissions;
                    }
                    return [2 /*return*/, session];
                });
            });
        },
        signIn: function (_a) {
            var user = _a.user, account = _a.account, profile = _a.profile;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    // Vérification de l'email vérifié pour OAuth
                    if ((account === null || account === void 0 ? void 0 : account.provider) === 'google') {
                        if (!(profile === null || profile === void 0 ? void 0 : profile.email_verified)) {
                            return [2 /*return*/, false];
                        }
                    }
                    return [2 /*return*/, true];
                });
            });
        },
    },
    events: {
        signIn: function (_a) {
            var user = _a.user, account = _a.account, isNewUser = _a.isNewUser;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("Connexion: ".concat(user.email, " via ").concat(account === null || account === void 0 ? void 0 : account.provider));
                            if (!isNewUser) return [3 /*break*/, 2];
                            // Actions pour les nouveaux utilisateurs
                            return [4 /*yield*/, prisma_1.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        role: 'USER',
                                        emailVerified: new Date(),
                                    },
                                })];
                        case 1:
                            // Actions pour les nouveaux utilisateurs
                            _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        signOut: function (_a) {
            var token = _a.token;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    console.log("D\u00E9connexion: ".concat(token === null || token === void 0 ? void 0 : token.email));
                    return [2 /*return*/];
                });
            });
        },
    },
    debug: process.env.NODE_ENV === 'development',
};
exports.handlers = (_a = (0, next_auth_1.default)(exports.authConfig), _a.handlers), exports.auth = _a.auth, exports.signIn = _a.signIn, exports.signOut = _a.signOut;
/**
 * Classe pour la gestion des permissions
 */
var PermissionManager = /** @class */ (function () {
    function PermissionManager() {
    }
    /**
     * Vérifie si un utilisateur a une permission spécifique
     */
    PermissionManager.hasPermission = function (user, permission) {
        if (!user)
            return false;
        return user.permissions.includes(permission);
    };
    /**
     * Vérifie si un utilisateur a toutes les permissions requises
     */
    PermissionManager.hasAllPermissions = function (user, permissions) {
        if (!user)
            return false;
        return permissions.every(function (permission) { return user.permissions.includes(permission); });
    };
    /**
     * Vérifie si un utilisateur a au moins une des permissions requises
     */
    PermissionManager.hasAnyPermission = function (user, permissions) {
        if (!user)
            return false;
        return permissions.some(function (permission) { return user.permissions.includes(permission); });
    };
    /**
     * Vérifie si un utilisateur a un rôle spécifique ou supérieur
     */
    PermissionManager.hasRole = function (user, role) {
        if (!user)
            return false;
        var roleHierarchy = {
            USER: 1,
            EDITOR: 2,
            MODERATOR: 3,
            ADMIN: 4,
        };
        return roleHierarchy[user.role] >= roleHierarchy[role];
    };
    /**
     * Met à jour les permissions d'un utilisateur
     */
    PermissionManager.updateUserPermissions = function (userId, role) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.user.update({
                                where: { id: userId },
                                data: { role: role },
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Erreur mise à jour permissions:', error_2);
                        throw new Error('Impossible de mettre à jour les permissions');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Récupère les permissions d'un rôle
     */
    PermissionManager.getRolePermissions = function (role) {
        return exports.ROLE_PERMISSIONS[role] || [];
    };
    return PermissionManager;
}());
exports.PermissionManager = PermissionManager;
/**
 * Actions d'authentification
 */
var AuthActions = /** @class */ (function () {
    function AuthActions() {
    }
    /**
     * Inscription d'un nouvel utilisateur
     */
    AuthActions.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var validatedData, existingUser, hashedPassword, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        validatedData = exports.RegisterSchema.parse(data);
                        return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                                where: { email: validatedData.email },
                            })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new Error('Un utilisateur avec cet email existe déjà');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(validatedData.password, 12)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, prisma_1.prisma.user.create({
                                data: {
                                    email: validatedData.email,
                                    name: validatedData.name,
                                    password: hashedPassword,
                                    role: 'USER',
                                },
                            })];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, { success: true, userId: user.id }];
                    case 4:
                        error_3 = _a.sent();
                        console.error('Erreur inscription:', error_3);
                        throw new Error(error_3 instanceof Error ? error_3.message : 'Erreur lors de l\'inscription');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Connexion d'un utilisateur
     */
    AuthActions.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var validatedData, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        validatedData = exports.LoginSchema.parse(data);
                        return [4 /*yield*/, (0, exports.signIn)('credentials', {
                                email: validatedData.email,
                                password: validatedData.password,
                                redirect: false,
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Erreur connexion:', error_4);
                        throw new Error('Email ou mot de passe incorrect');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Déconnexion
     */
    AuthActions.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, exports.signOut)({ redirect: false })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Erreur déconnexion:', error_5);
                        throw new Error('Erreur lors de la déconnexion');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Mise à jour du profil utilisateur
     */
    AuthActions.updateProfile = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.user.update({
                                where: { id: userId },
                                data: data,
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_6 = _a.sent();
                        console.error('Erreur mise à jour profil:', error_6);
                        throw new Error('Impossible de mettre à jour le profil');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Changement de mot de passe
     */
    AuthActions.changePassword = function (userId, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isCurrentPasswordValid, hashedNewPassword, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                                where: { id: userId },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user || !user.password) {
                            throw new Error('Utilisateur non trouvé');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(currentPassword, user.password)];
                    case 2:
                        isCurrentPasswordValid = _a.sent();
                        if (!isCurrentPasswordValid) {
                            throw new Error('Mot de passe actuel incorrect');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 12)];
                    case 3:
                        hashedNewPassword = _a.sent();
                        return [4 /*yield*/, prisma_1.prisma.user.update({
                                where: { id: userId },
                                data: { password: hashedNewPassword },
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 5:
                        error_7 = _a.sent();
                        console.error('Erreur changement mot de passe:', error_7);
                        throw new Error(error_7 instanceof Error ? error_7.message : 'Erreur lors du changement de mot de passe');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Réinitialisation de mot de passe
     */
    AuthActions.resetPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, resetToken, resetTokenExpiry, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                                where: { email: email },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            // Pour des raisons de sécurité, on ne révèle pas si l'email existe
                            return [2 /*return*/, { success: true }];
                        }
                        resetToken = crypto.randomUUID();
                        resetTokenExpiry = new Date(Date.now() + 3600000);
                        return [4 /*yield*/, prisma_1.prisma.user.update({
                                where: { id: user.id },
                                data: {
                                    resetToken: resetToken,
                                    resetTokenExpiry: resetTokenExpiry,
                                },
                            })];
                    case 2:
                        _a.sent();
                        // Envoyer l'email de réinitialisation
                        // TODO: Implémenter l'envoi d'email
                        console.log("Token de r\u00E9initialisation pour ".concat(email, ": ").concat(resetToken));
                        return [2 /*return*/, { success: true }];
                    case 3:
                        error_8 = _a.sent();
                        console.error('Erreur réinitialisation mot de passe:', error_8);
                        throw new Error('Erreur lors de la réinitialisation');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Confirmation de réinitialisation de mot de passe
     */
    AuthActions.confirmPasswordReset = function (token, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, hashedPassword, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, prisma_1.prisma.user.findFirst({
                                where: {
                                    resetToken: token,
                                    resetTokenExpiry: {
                                        gt: new Date(),
                                    },
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Token invalide ou expiré');
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 12)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, prisma_1.prisma.user.update({
                                where: { id: user.id },
                                data: {
                                    password: hashedPassword,
                                    resetToken: null,
                                    resetTokenExpiry: null,
                                },
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 4:
                        error_9 = _a.sent();
                        console.error('Erreur confirmation réinitialisation:', error_9);
                        throw new Error(error_9 instanceof Error ? error_9.message : 'Erreur lors de la confirmation');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthActions;
}());
exports.AuthActions = AuthActions;
/**
 * Hooks et utilitaires pour les composants
 */
var useAuth = function () {
    var _a;
    var session = useSession();
    return {
        user: (_a = session.data) === null || _a === void 0 ? void 0 : _a.user,
        isLoading: session.status === 'loading',
        isAuthenticated: session.status === 'authenticated',
        hasPermission: function (permission) { var _a; return PermissionManager.hasPermission((_a = session.data) === null || _a === void 0 ? void 0 : _a.user, permission); },
        hasRole: function (role) { var _a; return PermissionManager.hasRole((_a = session.data) === null || _a === void 0 ? void 0 : _a.user, role); },
    };
};
exports.useAuth = useAuth;
exports.default = exports.authConfig;
