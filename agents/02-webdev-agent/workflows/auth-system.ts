/**
 * Auth & Permissions System - Phase 2
 * NextAuth.js v5 + RBAC + Middleware + Session Management
 */

import { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

// Schemas de validation
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.enum(['USER', 'ADMIN', 'MODERATOR', 'EDITOR']).default('USER'),
  permissions: z.array(z.string()).default([]),
  emailVerified: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

// Types
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR' | 'EDITOR';

export interface ExtendedUser extends z.infer<typeof UserSchema> {
  role: UserRole;
  permissions: string[];
}

// Permissions définies
export const PERMISSIONS = {
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
} as const;

// Rôles et leurs permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
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
  ADMIN: Object.keys(PERMISSIONS), // Toutes les permissions
};

/**
 * Configuration NextAuth
 */
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          
          if (!validatedFields.success) {
            return null;
          }

          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role as UserRole,
          };
        } catch (error) {
          console.error('Erreur authentification:', error);
          return null;
        }
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
    async jwt({ token, user, trigger, session }) {
      // Mise à jour initiale lors de la connexion
      if (user) {
        token.role = user.role;
        token.permissions = ROLE_PERMISSIONS[user.role as UserRole];
      }

      // Mise à jour du token lors de la mise à jour de session
      if (trigger === 'update' && session) {
        token.role = session.user.role;
        token.permissions = ROLE_PERMISSIONS[session.user.role as UserRole];
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.permissions = token.permissions as string[];
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Vérification de l'email vérifié pour OAuth
      if (account?.provider === 'google') {
        if (!profile?.email_verified) {
          return false;
        }
      }

      return true;
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log(`Connexion: ${user.email} via ${account?.provider}`);
      
      if (isNewUser) {
        // Actions pour les nouveaux utilisateurs
        await prisma.user.update({
          where: { id: user.id },
          data: {
            role: 'USER',
            emailVerified: new Date(),
          },
        });
      }
    },
    async signOut({ token }) {
      console.log(`Déconnexion: ${token?.email}`);
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

/**
 * Classe pour la gestion des permissions
 */
export class PermissionManager {
  /**
   * Vérifie si un utilisateur a une permission spécifique
   */
  static hasPermission(user: ExtendedUser | null, permission: string): boolean {
    if (!user) return false;
    return user.permissions.includes(permission);
  }

  /**
   * Vérifie si un utilisateur a toutes les permissions requises
   */
  static hasAllPermissions(user: ExtendedUser | null, permissions: string[]): boolean {
    if (!user) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  }

  /**
   * Vérifie si un utilisateur a au moins une des permissions requises
   */
  static hasAnyPermission(user: ExtendedUser | null, permissions: string[]): boolean {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  }

  /**
   * Vérifie si un utilisateur a un rôle spécifique ou supérieur
   */
  static hasRole(user: ExtendedUser | null, role: UserRole): boolean {
    if (!user) return false;
    
    const roleHierarchy: Record<UserRole, number> = {
      USER: 1,
      EDITOR: 2,
      MODERATOR: 3,
      ADMIN: 4,
    };

    return roleHierarchy[user.role] >= roleHierarchy[role];
  }

  /**
   * Met à jour les permissions d'un utilisateur
   */
  static async updateUserPermissions(userId: string, role: UserRole): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { role },
      });
    } catch (error) {
      console.error('Erreur mise à jour permissions:', error);
      throw new Error('Impossible de mettre à jour les permissions');
    }
  }

  /**
   * Récupère les permissions d'un rôle
   */
  static getRolePermissions(role: UserRole): string[] {
    return ROLE_PERMISSIONS[role] || [];
  }
}

/**
 * Actions d'authentification
 */
export class AuthActions {
  /**
   * Inscription d'un nouvel utilisateur
   */
  static async register(data: z.infer<typeof RegisterSchema>) {
    try {
      const validatedData = RegisterSchema.parse(data);
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });

      if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);

      // Créer l'utilisateur
      const user = await prisma.user.create({
        data: {
          email: validatedData.email,
          name: validatedData.name,
          password: hashedPassword,
          role: 'USER',
        },
      });

      return { success: true, userId: user.id };
    } catch (error) {
      console.error('Erreur inscription:', error);
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de l\'inscription');
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  static async login(data: z.infer<typeof LoginSchema>) {
    try {
      const validatedData = LoginSchema.parse(data);
      
      const result = await signIn('credentials', {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
      });

      return result;
    } catch (error) {
      console.error('Erreur connexion:', error);
      throw new Error('Email ou mot de passe incorrect');
    }
  }

  /**
   * Déconnexion
   */
  static async logout() {
    try {
      await signOut({ redirect: false });
      return { success: true };
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  }

  /**
   * Mise à jour du profil utilisateur
   */
  static async updateProfile(userId: string, data: { name?: string; email?: string }) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data,
      });

      return user;
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      throw new Error('Impossible de mettre à jour le profil');
    }
  }

  /**
   * Changement de mot de passe
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || !user.password) {
        throw new Error('Utilisateur non trouvé');
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isCurrentPasswordValid) {
        throw new Error('Mot de passe actuel incorrect');
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return { success: true };
    } catch (error) {
      console.error('Erreur changement mot de passe:', error);
      throw new Error(error instanceof Error ? error.message : 'Erreur lors du changement de mot de passe');
    }
  }

  /**
   * Réinitialisation de mot de passe
   */
  static async resetPassword(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Pour des raisons de sécurité, on ne révèle pas si l'email existe
        return { success: true };
      }

      // Générer un token de réinitialisation
      const resetToken = crypto.randomUUID();
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });

      // Envoyer l'email de réinitialisation
      // TODO: Implémenter l'envoi d'email
      console.log(`Token de réinitialisation pour ${email}: ${resetToken}`);

      return { success: true };
    } catch (error) {
      console.error('Erreur réinitialisation mot de passe:', error);
      throw new Error('Erreur lors de la réinitialisation');
    }
  }

  /**
   * Confirmation de réinitialisation de mot de passe
   */
  static async confirmPasswordReset(token: string, newPassword: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        throw new Error('Token invalide ou expiré');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Erreur confirmation réinitialisation:', error);
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de la confirmation');
    }
  }
}

/**
 * Hooks et utilitaires pour les composants
 */
export const useAuth = () => {
  const session = useSession();
  
  return {
    user: session.data?.user as ExtendedUser | null,
    isLoading: session.status === 'loading',
    isAuthenticated: session.status === 'authenticated',
    hasPermission: (permission: string) => 
      PermissionManager.hasPermission(session.data?.user as ExtendedUser, permission),
    hasRole: (role: UserRole) => 
      PermissionManager.hasRole(session.data?.user as ExtendedUser, role),
  };
};

export default authConfig;