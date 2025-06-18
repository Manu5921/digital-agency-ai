# 📋 Guide d'Utilisation - Template Digital Agency AI

## 🎯 Pour les Agents Digital Agency AI

Ce template est conçu pour être utilisé par notre système multi-agents pour la génération automatique de sites web.

## 📁 Utilisation du Template

### 1. Création d'un Nouveau Projet

```bash
# Copier le template dans un nouveau projet
cp -r templates/nextjs-base/ projects/client-[nom]-[secteur]/

# Exemple
cp -r templates/nextjs-base/ projects/client-plombipro-plomberie/
```

### 2. Configuration par les Agents

#### Design Agent
- [ ] Modifier les couleurs dans `tailwind.config.ts`
- [ ] Remplacer le contenu dans les composants
- [ ] Adapter les images et icônes
- [ ] Personnaliser le design system

#### WebDev Agent  
- [ ] Mettre à jour `package.json` (name, description)
- [ ] Configurer les variables dans `.env.local`
- [ ] Personnaliser les composants React
- [ ] Adapter les APIs si nécessaire

#### SEO Agent
- [ ] Modifier les métadonnées dans `layout.tsx`
- [ ] Adapter le `sitemap.xml`
- [ ] Configurer les mots-clés ciblés
- [ ] Optimiser le contenu pour SEO

#### TechOps Agent
- [ ] Configurer `vercel.json` pour le domaine
- [ ] Déployer sur Vercel
- [ ] Tester les performances
- [ ] Monitorer le site

### 3. Secteurs Supportés

Le template s'adapte facilement à:

#### 🔧 Plomberie
```typescript
// Couleurs
primary: '#1e40af', // Bleu confiance
accent: '#ef4444',  // Rouge urgence

// Services
services: ['Dépannage urgence', 'Installation', 'Rénovation']
```

#### 🍕 Restaurant
```typescript
// Couleurs  
primary: '#dc2626', // Rouge appétit
accent: '#f59e0b',  // Orange chaleur

// Services
services: ['Menu', 'Réservation', 'Livraison', 'Événements']
```

#### 🛒 E-commerce
```typescript
// Couleurs
primary: '#059669', // Vert achat
accent: '#7c3aed',  // Violet premium

// Services
services: ['Catalogue', 'Panier', 'Paiement', 'Livraison']
```

#### 💼 Services B2B
```typescript
// Couleurs
primary: '#1f2937', // Gris corporate
accent: '#3b82f6',  // Bleu professionnel

// Services
services: ['Conseil', 'Formation', 'Support', 'Maintenance']
```

## 🔧 Points de Personnalisation

### Variables CSS Principales

```css
/* Dans globals.css */
:root {
  --color-primary-500: 59 130 246;
  --color-accent-500: 239 68 68;
}
```

### Contenu à Adapter

1. **Header**: Logo, nom entreprise, navigation
2. **Hero**: Titre, description, CTAs  
3. **Services**: Liste des services, icônes, descriptions
4. **About**: Histoire, statistiques, valeurs
5. **Testimonials**: Avis clients, notes
6. **Contact**: Coordonnées, formulaire
7. **Footer**: Liens, mentions légales

### Images à Remplacer

- `hero-image`: Image principale (aspect-square)
- `about-image`: Photo équipe/bureau (aspect-[4/3])
- `service-icons`: Icônes sectorielles
- `testimonials-avatars`: Photos clients
- `logo`: Logo de l'entreprise

## 📊 Validation Qualité

### Checklist Technique

- [ ] Build Next.js sans erreurs
- [ ] TypeScript sans erreurs
- [ ] ESLint validation
- [ ] Tests formulaire de contact
- [ ] Responsive design testé
- [ ] Performance Lighthouse >90

### Checklist Contenu

- [ ] Coordonnées correctes
- [ ] Services adaptés au secteur
- [ ] Témoignages réalistes
- [ ] Call-to-actions optimisés
- [ ] SEO metadata complètes

### Checklist Déploiement

- [ ] Variables d'environnement configurées
- [ ] Domaine Vercel assigné
- [ ] HTTPS fonctionnel
- [ ] Formulaire de contact opérationnel
- [ ] Analytics configuré

## 🚀 Commandes Utiles

```bash
# Développement
npm run dev

# Build production  
npm run build

# Test build local
npm run start

# Validation TypeScript
npm run type-check

# Linting
npm run lint

# Déploiement Vercel
vercel deploy
vercel --prod
```

## 📝 Template Checklist Agent

### Design Agent ✅
- [ ] Palette couleurs adaptée
- [ ] Contenu sectoriel personnalisé
- [ ] Images et icônes sectorielles
- [ ] Design cohérent avec la marque

### WebDev Agent ✅  
- [ ] Composants React fonctionnels
- [ ] TypeScript sans erreurs
- [ ] APIs contact opérationnelles
- [ ] Performance optimisée

### SEO Agent ✅
- [ ] Métadonnées optimisées
- [ ] Structure HTML sémantique
- [ ] Mots-clés intégrés
- [ ] Structured data LocalBusiness

### TechOps Agent ✅
- [ ] Déploiement Vercel réussi
- [ ] Domaine configuré
- [ ] Monitoring actif
- [ ] Sécurité validée

---

**🤖 Digital Agency AI Template System**  
*Version 1.0 - Optimisé pour génération automatique*