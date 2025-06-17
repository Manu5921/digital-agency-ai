/**
 * Middleware d'authentification et de protection des routes
 * NextAuth.js v5 + Route Protection + RBAC
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../workflows/auth-system';
import { PermissionManager, UserRole } from '../workflows/auth-system';

// Configuration des routes protégées
export const PROTECTED_ROUTES = {
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
    '/admin/**': 'MODERATOR' as UserRole,
    '/cms/**': 'EDITOR' as UserRole,
    '/system/**': 'ADMIN' as UserRole,
  },
} as const;

/**
 * Vérifie si une route correspond à un pattern
 */
function matchesPattern(pathname: string, pattern: string): boolean {
  // Conversion du pattern en regex
  const regexPattern = pattern
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*')
    .replace(/\//g, '\\/');
  
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
}

/**
 * Vérifie si une route est publique
 */
function isPublicRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.public.some(pattern => 
    matchesPattern(pathname, pattern)
  );
}

/**
 * Vérifie si une route nécessite une authentification
 */
function requiresAuth(pathname: string): boolean {
  return PROTECTED_ROUTES.authenticated.some(pattern => 
    matchesPattern(pathname, pattern)
  );
}

/**
 * Récupère les permissions requises pour une route
 */
function getRequiredPermissions(pathname: string): string[] {
  for (const [pattern, permissions] of Object.entries(PROTECTED_ROUTES.permissions)) {
    if (matchesPattern(pathname, pattern)) {
      return permissions;
    }
  }
  return [];
}

/**
 * Récupère le rôle requis pour une route
 */
function getRequiredRole(pathname: string): UserRole | null {
  for (const [pattern, role] of Object.entries(PROTECTED_ROUTES.roles)) {
    if (matchesPattern(pathname, pattern)) {
      return role;
    }
  }
  return null;
}

/**
 * Middleware principal d'authentification
 */
export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ignorer les fichiers statiques et les API routes non protégées
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/auth/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Vérifier si la route est publique
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Obtenir la session utilisateur
  const session = await auth();

  // Rediriger vers la page de connexion si non authentifié
  if (!session?.user) {
    if (requiresAuth(pathname) || getRequiredPermissions(pathname).length > 0 || getRequiredRole(pathname)) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  const user = session.user as any;

  // Vérifier les permissions spécifiques
  const requiredPermissions = getRequiredPermissions(pathname);
  if (requiredPermissions.length > 0) {
    const hasPermission = PermissionManager.hasAllPermissions(user, requiredPermissions);
    if (!hasPermission) {
      return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
    }
  }

  // Vérifier le rôle requis
  const requiredRole = getRequiredRole(pathname);
  if (requiredRole) {
    const hasRole = PermissionManager.hasRole(user, requiredRole);
    if (!hasRole) {
      return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
    }
  }

  // Ajouter des headers de sécurité
  const response = NextResponse.next();
  
  // Headers de sécurité
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CSP (Content Security Policy)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://cdn.sanity.io; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.stripe.com https://*.sanity.io; " +
    "frame-src https://js.stripe.com https://hooks.stripe.com;"
  );

  return response;
}

/**
 * Configuration du matcher pour Next.js
 */
export const config = {
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
export class RouteGuard {
  /**
   * Vérifie l'accès à une route côté client
   */
  static canAccess(
    user: any,
    route: string,
    requiredPermissions?: string[],
    requiredRole?: UserRole
  ): boolean {
    if (!user) return false;

    if (requiredPermissions && requiredPermissions.length > 0) {
      return PermissionManager.hasAllPermissions(user, requiredPermissions);
    }

    if (requiredRole) {
      return PermissionManager.hasRole(user, requiredRole);
    }

    return true;
  }

  /**
   * Crée un guard pour les composants React
   */
  static createComponentGuard(
    requiredPermissions?: string[],
    requiredRole?: UserRole,
    fallback?: React.ReactNode
  ) {
    return function ProtectedComponent({ 
      children, 
      user 
    }: { 
      children: React.ReactNode; 
      user: any;
    }) {
      const canAccess = RouteGuard.canAccess(user, '', requiredPermissions, requiredRole);
      
      if (!canAccess) {
        return fallback || (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-semibold">Accès refusé</h3>
            <p className="text-red-600 text-sm mt-1">
              Vous n'avez pas les permissions nécessaires pour accéder à cette section.
            </p>
          </div>
        );
      }

      return <>{children}</>;
    };
  }
}

/**
 * HOC pour protéger les pages
 */
export function withAuth<T extends {}>(
  Component: React.ComponentType<T>,
  options?: {
    requiredPermissions?: string[];
    requiredRole?: UserRole;
    redirectTo?: string;
  }
) {
  return function AuthenticatedComponent(props: T) {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = options?.redirectTo || '/auth/signin';
      }
      return null;
    }

    if (options?.requiredPermissions && !PermissionManager.hasAllPermissions(user, options.requiredPermissions)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h2>
            <p className="text-gray-600">Vous n'avez pas les permissions nécessaires.</p>
          </div>
        </div>
      );
    }

    if (options?.requiredRole && !PermissionManager.hasRole(user, options.requiredRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h2>
            <p className="text-gray-600">Votre rôle ne permet pas d'accéder à cette page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

/**
 * Hook pour vérifier les permissions dans les composants
 */
export function usePermissions() {
  const { user } = useAuth();

  return {
    hasPermission: (permission: string) => 
      PermissionManager.hasPermission(user, permission),
    hasAllPermissions: (permissions: string[]) => 
      PermissionManager.hasAllPermissions(user, permissions),
    hasAnyPermission: (permissions: string[]) => 
      PermissionManager.hasAnyPermission(user, permissions),
    hasRole: (role: UserRole) => 
      PermissionManager.hasRole(user, role),
    canAccess: (route: string, requiredPermissions?: string[], requiredRole?: UserRole) =>
      RouteGuard.canAccess(user, route, requiredPermissions, requiredRole),
  };
}

export default authMiddleware;