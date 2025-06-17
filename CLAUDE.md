# CLAUDE.md - Configuration Claude Code

## 🎯 Projet : Agence IA Digitale Multi-Agents

### Context
Système d'agence digitale autonome avec 6 agents IA spécialisés (5 agents opérationnels + 1 orchestrateur Claude Code) pour livrer des projets web complets de A à Z.

### Architecture Agents
- **Orchestrateur** : Claude Code (coordination globale)
- **Agent 1** : Design (Image/Figma → HTML/CSS)
- **Agent 2** : SEO (Référencement technique)
- **Agent 3** : Automation N8N (Workflows)
- **Agent 4** : WebDev (Next.js full-stack)
- **Agent 5** : TechOps/Validation (Modules + Vercel MCP)

### Cas d'Usage Pilote
**Restaurant Landing Page Premium**
- Timeline : 4-6h MVP complet
- Pipeline : Design → WebDev → SEO → TechOps → Déploiement Vercel

## 🛠 Stack Technique

### Frontend
- Next.js 15.3 (App Router)
- TypeScript 5.x (strict mode)
- Tailwind CSS 4.0 + shadcn/ui
- Zustand + React Query v5

### Backend
- Node.js 22 LTS
- tRPC v11 (type-safe APIs)
- NextAuth.js v5
- Zod validation

### Infrastructure
- Database : Neon DB (PostgreSQL 16) **via MCP**
- ORM : Prisma 5.x + Drizzle
- Cache : Redis (Upstash)
- Hosting : Vercel (via MCP)

### Intégrations MCP
- **Neon MCP** : Base de données PostgreSQL serverless
  - Branching : Dev/staging/prod branches
  - Auto-scaling : 0 to millions of queries
  - Connection pooling : PgBouncer intégré
  - Backups : Point-in-time recovery
- Vercel MCP : Déploiements
- Figma MCP : Import designs  
- Stripe MCP : Paiements
- Docker MCP : Conteneurisation

## 📚 Ressources

### Repositories
- Projet : `/Users/manu/Documents/DEV/digital-agency-ai`
- GitHub : `https://github.com/Manu5921/digital-agency-ai.git`
- N8N Workflows : `https://github.com/Manu5921/N8N-workflow.git`

### Commandes Fréquentes
```bash
# Development
npm run dev
npm run build
npm run lint
npm run typecheck

# Testing
npm test
npm run test:e2e

# Deployment
vercel deploy
vercel --prod
```

## 🔧 Configuration Agents

### Communication Inter-Agents
- Protocol : Event-driven avec message queue Redis
- Format : JSON standardisé avec schema validation
- Latency : <100ms entre agents

### Workflow Principal
```
Design Agent → WebDev Agent → TechOps Agent
     ↓              ↓              ↓
SEO Agent → Automation Agent → Déploiement
```

## 📊 Métriques Cibles

### Performance
- Lighthouse : 90+ tous critères
- Build time : <5min
- Bundle size : Optimisé

### Qualité
- Code quality : 90+
- Test coverage : >80%
- Deploy success : 99%+

## 🚀 Commandes Spécifiques

### Initialization
```bash
/init-project --type mvp --design image --timeline 6h
```

### Agent Control
```bash
/agent-status --name all --metrics
/agent-assign --task design-restaurant --to design --priority high
```

## 💡 Notes Importantes

### Best Practices
- MCP-First approach pour toutes les intégrations
- Design-First workflow obligatoire
- Tests automatisés avant déploiement
- Monitoring continu post-déploiement

### API Keys Required
- Claude API
- OpenAI API
- Figma MCP
- Vercel MCP
- Neon DB
- Stripe (si e-commerce)

---
*Dernière mise à jour : 2025-06-17*