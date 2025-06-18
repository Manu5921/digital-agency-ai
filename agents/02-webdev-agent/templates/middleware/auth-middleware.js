"use strict";
/**
 * Middleware d'authentification et de protection des routes
 * NextAuth.js v5 + Route Protection + RBAC
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
exports.usePermissions = exports.withAuth = exports.RouteGuard = exports.config = exports.authMiddleware = exports.PROTECTED_ROUTES = void 0;
var server_1 = require("next/server");
var auth_system_1 = require("../workflows/auth-system");
var auth_system_2 = require("../workflows/auth-system");
// Configuration des routes protégées
exports.PROTECTED_ROUTES = {
    // Routes publiques (pas de protection)
    public: [
        '/',
        '/about',
        '/contact',
        '/menu',
        '/auth/signin',
        '/auth/signup',
        '/auth/error',
        '/api/auth/**',
    ],
    // Routes nécessitant une authentification
    authenticated: [
        '/dashboard',
        '/profile',
        '/orders',
        '/favorites',
    ],
    // Routes nécessitant des permissions spécifiques
    permissions: {
        '/admin/**': ['users:read', 'system:settings'],
        '/cms/**': ['content:read'],
        '/cms/edit/**': ['content:write'],
        '/cms/create/**': ['content:write'],
        '/cms/delete/**': ['content:delete'],
        '/analytics/**': ['analytics:read'],
        '/orders/manage/**': ['orders:write'],
        '/products/manage/**': ['products:write'],
        '/users/manage/**': ['users:write'],
    },
    // Routes nécessitant des rôles spécifiques
    roles: {
        '/admin/**': 'MODERATOR',
        '/cms/**': 'EDITOR',
        '/system/**': 'ADMIN',
    },
};
/**
 * Vérifie si une route correspond à un pattern
 */
function matchesPattern(pathname, pattern) {
    // Conversion du pattern en regex
    var regexPattern = pattern
        .replace(/\*\*/g, '.*')
        .replace(/\*/g, '[^/]*')
        .replace(/\//g, '\\/');
    var regex = new RegExp("^".concat(regexPattern, "$"));
    return regex.test(pathname);
}
/**
 * Vérifie si une route est publique
 */
function isPublicRoute(pathname) {
    return exports.PROTECTED_ROUTES.public.some(function (pattern) {
        return matchesPattern(pathname, pattern);
    });
}
/**
 * Vérifie si une route nécessite une authentification
 */
function requiresAuth(pathname) {
    return exports.PROTECTED_ROUTES.authenticated.some(function (pattern) {
        return matchesPattern(pathname, pattern);
    });
}
/**
 * Récupère les permissions requises pour une route
 */
function getRequiredPermissions(pathname) {
    for (var _i = 0, _a = Object.entries(exports.PROTECTED_ROUTES.permissions); _i < _a.length; _i++) {
        var _b = _a[_i], pattern = _b[0], permissions = _b[1];
        if (matchesPattern(pathname, pattern)) {
            return permissions;
        }
    }
    return [];
}
/**
 * Récupère le rôle requis pour une route
 */
function getRequiredRole(pathname) {
    for (var _i = 0, _a = Object.entries(exports.PROTECTED_ROUTES.roles); _i < _a.length; _i++) {
        var _b = _a[_i], pattern = _b[0], role = _b[1];
        if (matchesPattern(pathname, pattern)) {
            return role;
        }
    }
    return null;
}
/**
 * Middleware principal d'authentification
 */
function authMiddleware(request) {
    return __awaiter(this, void 0, void 0, function () {
        var pathname, session, signInUrl, user, requiredPermissions, hasPermission, requiredRole, hasRole, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pathname = request.nextUrl.pathname;
                    // Ignorer les fichiers statiques et les API routes non protégées
                    if (pathname.startsWith('/_next/') ||
                        pathname.startsWith('/api/auth/') ||
                        pathname.includes('.')) {
                        return [2 /*return*/, server_1.NextResponse.next()];
                    }
                    // Vérifier si la route est publique
                    if (isPublicRoute(pathname)) {
                        return [2 /*return*/, server_1.NextResponse.next()];
                    }
                    return [4 /*yield*/, (0, auth_system_1.auth)()];
                case 1:
                    session = _a.sent();
                    // Rediriger vers la page de connexion si non authentifié
                    if (!(session === null || session === void 0 ? void 0 : session.user)) {
                        if (requiresAuth(pathname) || getRequiredPermissions(pathname).length > 0 || getRequiredRole(pathname)) {
                            signInUrl = new URL('/auth/signin', request.url);
                            signInUrl.searchParams.set('callbackUrl', pathname);
                            return [2 /*return*/, server_1.NextResponse.redirect(signInUrl)];
                        }
                        return [2 /*return*/, server_1.NextResponse.next()];
                    }
                    user = session.user;
                    requiredPermissions = getRequiredPermissions(pathname);
                    if (requiredPermissions.length > 0) {
                        hasPermission = auth_system_2.PermissionManager.hasAllPermissions(user, requiredPermissions);
                        if (!hasPermission) {
                            return [2 /*return*/, server_1.NextResponse.redirect(new URL('/auth/unauthorized', request.url))];
                        }
                    }
                    requiredRole = getRequiredRole(pathname);
                    if (requiredRole) {
                        hasRole = auth_system_2.PermissionManager.hasRole(user, requiredRole);
                        if (!hasRole) {
                            return [2 /*return*/, server_1.NextResponse.redirect(new URL('/auth/unauthorized', request.url))];
                        }
                    }
                    response = server_1.NextResponse.next();
                    // Headers de sécurité
                    response.headers.set('X-Content-Type-Options', 'nosniff');
                    response.headers.set('X-Frame-Options', 'DENY');
                    response.headers.set('X-XSS-Protection', '1; mode=block');
                    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
                    // CSP (Content Security Policy)
                    response.headers.set('Content-Security-Policy', "default-src 'self'; " +
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://cdn.sanity.io; " +
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                        "img-src 'self' data: https: blob:; " +
                        "font-src 'self' https://fonts.gstatic.com; " +
                        "connect-src 'self' https://api.stripe.com https://*.sanity.io; " +
                        "frame-src https://js.stripe.com https://hooks.stripe.com;");
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.authMiddleware = authMiddleware;
/**
 * Configuration du matcher pour Next.js
 */
exports.config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
/**
 * Utilitaires pour les composants
 */
var RouteGuard = /** @class */ (function () {
    function RouteGuard() {
    }
    /**
     * Vérifie l'accès à une route côté client
     */
    RouteGuard.canAccess = function (user, route, requiredPermissions, requiredRole) {
        if (!user)
            return false;
        if (requiredPermissions && requiredPermissions.length > 0) {
            return auth_system_2.PermissionManager.hasAllPermissions(user, requiredPermissions);
        }
        if (requiredRole) {
            return auth_system_2.PermissionManager.hasRole(user, requiredRole);
        }
        return true;
    };
    /**
     * Crée un guard pour les composants React
     */
    RouteGuard.createComponentGuard = function (requiredPermissions, requiredRole, fallback) {
        return function ProtectedComponent(_a) {
            var children = _a.children, user = _a.user;
            var canAccess = RouteGuard.canAccess(user, '', requiredPermissions, requiredRole);
            if (!canAccess) {
                return fallback || className;
                "bg-red-50 border border-red-200 rounded-lg p-4" >
                    className;
                "text-red-800 font-semibold" > Accès;
                refusé < /h3>
                    < p;
                className = "text-red-600 text-sm mt-1" >
                    Vous;
                n;
                'avez pas les permissions nécessaires pour accéder à cette section.
                    < /p>
                    < /div>;
                ;
            }
            return { children: children } < />;;
        };
    };
    return RouteGuard;
}());
exports.RouteGuard = RouteGuard;
/**
 * HOC pour protéger les pages
 */
function withAuth(Component, options) {
    return function AuthenticatedComponent(props) {
        var _a = useAuth(), user = _a.user, isLoading = _a.isLoading, isAuthenticated = _a.isAuthenticated;
        if (isLoading) {
            return className = "flex items-center justify-center min-h-screen" >
                className;
            "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" > /div>
                < /div>;
            ;
        }
        if (!isAuthenticated) {
            if (typeof window !== 'undefined') {
                window.location.href = (options === null || options === void 0 ? void 0 : options.redirectTo) || '/auth/signin';
            }
            return null;
        }
        if ((options === null || options === void 0 ? void 0 : options.requiredPermissions) && !auth_system_2.PermissionManager.hasAllPermissions(user, options.requiredPermissions)) {
            return className = "flex items-center justify-center min-h-screen" >
                className;
            "text-center" >
                className;
            "text-2xl font-bold text-gray-900 mb-2" > Accès;
            refusé < /h2>
                < p;
            className = "text-gray-600" > Vous;
            n;
            'avez pas les permissions nécessaires.</p>
                < /div>
                < /div>;
            ;
        }
        if ((options === null || options === void 0 ? void 0 : options.requiredRole) && !auth_system_2.PermissionManager.hasRole(user, options.requiredRole)) {
            return className = "flex items-center justify-center min-h-screen" >
                className;
            "text-center" >
                className;
            "text-2xl font-bold text-gray-900 mb-2" > Accès;
            refusé < /h2>
                < p;
            className = "text-gray-600" > Votre;
            rôle;
            ne;
            permet;
            pas;
            d;
            'accéder à cette page.</p>
                < /div>
                < /div>;
            ;
        }
        return __assign({}, props) /  > ;
    };
}
exports.withAuth = withAuth;
/**
 * Hook pour vérifier les permissions dans les composants
 */
function usePermissions() {
    var user = useAuth().user;
    return {
        hasPermission: function (permission) {
            return auth_system_2.PermissionManager.hasPermission(user, permission);
        },
        hasAllPermissions: function (permissions) {
            return auth_system_2.PermissionManager.hasAllPermissions(user, permissions);
        },
        hasAnyPermission: function (permissions) {
            return auth_system_2.PermissionManager.hasAnyPermission(user, permissions);
        },
        hasRole: function (role) {
            return auth_system_2.PermissionManager.hasRole(user, role);
        },
        canAccess: function (route, requiredPermissions, requiredRole) {
            return RouteGuard.canAccess(user, route, requiredPermissions, requiredRole);
        },
    };
}
exports.usePermissions = usePermissions;
exports.default = authMiddleware;
