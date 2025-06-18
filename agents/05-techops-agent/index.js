"use strict";
/**
 * TechOps Agent - Enterprise Infrastructure & Business Intelligence Automation
 * Spécialisé dans l'orchestration enterprise, BI automation et déploiement multi-cloud
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechOpsAgent = exports.ObservabilityPlatform = exports.executeEnterprisePhase3Demo = exports.EnterprisePhase3Demo = exports.EnterpriseTechOpsOrchestrator = exports.executeBIAutomationDemo = exports.BIAutomationDemo = exports.BusinessIntelligenceAutomation = void 0;
// Export Business Intelligence Automation Platform
var business_intelligence_automation_1 = require("./business-intelligence-automation");
Object.defineProperty(exports, "BusinessIntelligenceAutomation", { enumerable: true, get: function () { return business_intelligence_automation_1.default; } });
var bi_automation_demo_1 = require("./bi-automation-demo");
Object.defineProperty(exports, "BIAutomationDemo", { enumerable: true, get: function () { return bi_automation_demo_1.default; } });
Object.defineProperty(exports, "executeBIAutomationDemo", { enumerable: true, get: function () { return bi_automation_demo_1.executeBIAutomationDemo; } });
// Export Enterprise TechOps Orchestrator
var enterprise_techops_orchestrator_1 = require("./workflows/enterprise-techops-orchestrator");
Object.defineProperty(exports, "EnterpriseTechOpsOrchestrator", { enumerable: true, get: function () { return enterprise_techops_orchestrator_1.default; } });
var enterprise_phase3_demo_1 = require("./enterprise-phase3-demo");
Object.defineProperty(exports, "EnterprisePhase3Demo", { enumerable: true, get: function () { return enterprise_phase3_demo_1.default; } });
Object.defineProperty(exports, "executeEnterprisePhase3Demo", { enumerable: true, get: function () { return enterprise_phase3_demo_1.executeEnterprisePhase3Demo; } });
// Export Core Infrastructure Components
var observability_platform_1 = require("./workflows/observability-platform");
Object.defineProperty(exports, "ObservabilityPlatform", { enumerable: true, get: function () { return observability_platform_1.default; } });
var TechOpsAgent = /** @class */ (function () {
    function TechOpsAgent(deploymentConfig) {
        this.moduleConfigs = [];
        this.deploymentConfig = deploymentConfig;
        this.setupRestaurantModules();
    }
    /**
     * Configuration des modules sp�cifiques restaurant
     */
    TechOpsAgent.prototype.setupRestaurantModules = function () {
        this.moduleConfigs = [
            {
                name: 'contact-form',
                type: 'communication',
                dependencies: ['@formspree/react', 'react-hook-form', 'zod'],
                envVars: ['FORMSPREE_FORM_ID', 'RESEND_API_KEY'],
                priority: 'high'
            },
            {
                name: 'google-maps',
                type: 'integration',
                dependencies: ['@googlemaps/react-wrapper'],
                envVars: ['NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'],
                priority: 'high'
            },
            {
                name: 'analytics',
                type: 'analytics',
                dependencies: ['@vercel/analytics', 'posthog-js'],
                envVars: ['NEXT_PUBLIC_POSTHOG_KEY', 'NEXT_PUBLIC_POSTHOG_HOST'],
                priority: 'medium'
            },
            {
                name: 'reservation-system',
                type: 'integration',
                dependencies: ['react-datepicker', 'date-fns'],
                envVars: ['RESERVATION_WEBHOOK_URL'],
                priority: 'high'
            },
            {
                name: 'image-optimization',
                type: 'ui',
                dependencies: ['sharp', 'next-optimized-images'],
                envVars: ['CLOUDINARY_URL'],
                priority: 'medium'
            }
        ];
    };
    /**
     * G�n�re le package.json avec toutes les d�pendances
     */
    TechOpsAgent.prototype.generatePackageJSON = function () {
        var allDependencies = this.moduleConfigs
            .flatMap(function (module) { return module.dependencies; })
            .reduce(function (acc, dep) {
            acc[dep] = 'latest';
            return acc;
        }, {});
        return JSON.stringify({
            "name": "restaurant-le-gourmet",
            "version": "1.0.0",
            "private": true,
            "scripts": {
                "dev": "next dev --turbopack",
                "build": "next build",
                "start": "next start",
                "lint": "next lint",
                "type-check": "tsc --noEmit",
                "deploy": "vercel --prod",
                "deploy:staging": "vercel",
                "analyze": "ANALYZE=true npm run build"
            },
            "dependencies": __assign({ "next": "15.3.0", "react": "^18.2.0", "react-dom": "^18.2.0", "tailwindcss": "^3.4.0", "typescript": "^5.2.0" }, allDependencies),
            "devDependencies": {
                "@types/node": "^20.8.0",
                "@types/react": "^18.2.0",
                "@types/react-dom": "^18.2.0",
                "eslint": "^8.51.0",
                "eslint-config-next": "^14.0.0",
                "autoprefixer": "^10.4.0",
                "postcss": "^8.4.0"
            }
        }, null, 2);
    };
    /**
     * Configuration Vercel pour d�ploiement
     */
    TechOpsAgent.prototype.generateVercelConfig = function () {
        return JSON.stringify({
            "name": "restaurant-le-gourmet",
            "version": 2,
            "framework": "nextjs",
            "buildCommand": "npm run build",
            "outputDirectory": ".next",
            "installCommand": "npm ci",
            "devCommand": "npm run dev",
            "env": {
                "NEXT_PUBLIC_SITE_URL": "https://legourmet-paris.fr",
                "NODE_ENV": "production"
            },
            "regions": ["iad1"],
            "functions": {
                "src/pages/api/**/*.ts": {
                    "runtime": "nodejs18.x"
                }
            },
            "headers": [
                {
                    "source": "/(.*)",
                    "headers": [
                        {
                            "key": "X-Frame-Options",
                            "value": "DENY"
                        },
                        {
                            "key": "X-Content-Type-Options",
                            "value": "nosniff"
                        },
                        {
                            "key": "Referrer-Policy",
                            "value": "strict-origin-when-cross-origin"
                        },
                        {
                            "key": "Permissions-Policy",
                            "value": "camera=(), microphone=(), geolocation=()"
                        }
                    ]
                },
                {
                    "source": "/images/(.*)",
                    "headers": [
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=31536000, immutable"
                        }
                    ]
                }
            ],
            "redirects": [
                {
                    "source": "/home",
                    "destination": "/",
                    "permanent": true
                }
            ],
            "rewrites": [
                {
                    "source": "/sitemap.xml",
                    "destination": "/api/sitemap"
                }
            ]
        }, null, 2);
    };
    /**
     * Variables d'environnement pour production
     */
    TechOpsAgent.prototype.generateEnvTemplate = function () {
        var envVars = this.moduleConfigs
            .flatMap(function (module) { return module.envVars; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
        return "# Restaurant Le Gourmet - Environment Variables Template\n# Copy to .env.local for development\n# Configure in Vercel dashboard for production\n\n# Site Configuration\nNEXT_PUBLIC_SITE_URL=https://legourmet-paris.fr\nNEXT_PUBLIC_SITE_NAME=\"Le Gourmet\"\n\n# Communication\n".concat(envVars.includes('FORMSPREE_FORM_ID') ? 'FORMSPREE_FORM_ID=your_formspree_id' : '', "\n").concat(envVars.includes('RESEND_API_KEY') ? 'RESEND_API_KEY=your_resend_api_key' : '', "\n\n# Maps & Location\n").concat(envVars.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY') ? 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key' : '', "\n\n# Analytics\n").concat(envVars.includes('NEXT_PUBLIC_POSTHOG_KEY') ? 'NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key' : '', "\n").concat(envVars.includes('NEXT_PUBLIC_POSTHOG_HOST') ? 'NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com' : '', "\n\n# Reservations\n").concat(envVars.includes('RESERVATION_WEBHOOK_URL') ? 'RESERVATION_WEBHOOK_URL=your_webhook_url' : '', "\n\n# Images & Media\n").concat(envVars.includes('CLOUDINARY_URL') ? 'CLOUDINARY_URL=your_cloudinary_url' : '', "\n\n# Security\nNEXTAUTH_SECRET=your_nextauth_secret\nNEXTAUTH_URL=https://legourmet-paris.fr");
    };
    /**
     * Composant de formulaire de contact
     */
    TechOpsAgent.prototype.generateContactForm = function () {
        return "'use client'\n\nimport { useState } from 'react'\nimport { useForm } from 'react-hook-form'\nimport { zodResolver } from '@hookform/resolvers/zod'\nimport { z } from 'zod'\n\nconst contactSchema = z.object({\n  firstName: z.string().min(2, 'Le pr\uFFFDnom doit contenir au moins 2 caract\uFFFDres'),\n  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caract\uFFFDres'),\n  email: z.string().email('Adresse email invalide'),\n  phone: z.string().min(10, 'Num\uFFFDro de t\uFFFDl\uFFFDphone invalide'),\n  date: z.string().min(1, 'Veuillez s\uFFFDlectionner une date'),\n  guests: z.string().min(1, 'Veuillez s\uFFFDlectionner le nombre de personnes'),\n  message: z.string().optional(),\n})\n\ntype ContactFormData = z.infer<typeof contactSchema>\n\nexport default function ContactForm() {\n  const [isSubmitting, setIsSubmitting] = useState(false)\n  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')\n\n  const {\n    register,\n    handleSubmit,\n    formState: { errors },\n    reset\n  } = useForm<ContactFormData>({\n    resolver: zodResolver(contactSchema)\n  })\n\n  const onSubmit = async (data: ContactFormData) => {\n    setIsSubmitting(true)\n    setSubmitStatus('idle')\n\n    try {\n      const response = await fetch('/api/contact', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify(data),\n      })\n\n      if (response.ok) {\n        setSubmitStatus('success')\n        reset()\n      } else {\n        setSubmitStatus('error')\n      }\n    } catch (error) {\n      console.error('Erreur lors de l'envoi:', error)\n      setSubmitStatus('error')\n    } finally {\n      setIsSubmitting(false)\n    }\n  }\n\n  return (\n    <div className=\"bg-white p-8 rounded-2xl shadow-lg\">\n      <h3 className=\"text-2xl font-heading font-bold text-primary mb-6\">R\uFFFDservation</h3>\n      \n      {submitStatus === 'success' && (\n        <div className=\"mb-6 p-4 bg-green-100 text-green-800 rounded-lg\">\n          \u0005 Votre r\uFFFDservation a \uFFFDt\uFFFD envoy\uFFFDe avec succ\uFFFDs. Nous vous contacterons sous 24h.\n        </div>\n      )}\n\n      {submitStatus === 'error' && (\n        <div className=\"mb-6 p-4 bg-red-100 text-red-800 rounded-lg\">\n          L Une erreur est survenue. Veuillez r\uFFFDessayer ou nous appeler directement.\n        </div>\n      )}\n\n      <form onSubmit={handleSubmit(onSubmit)} className=\"space-y-6\">\n        <div className=\"grid grid-cols-2 gap-4\">\n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n              Pr\uFFFDnom *\n            </label>\n            <input\n              {...register('firstName')}\n              type=\"text\"\n              className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent\"\n              placeholder=\"Jean\"\n            />\n            {errors.firstName && (\n              <p className=\"mt-1 text-sm text-red-600\">{errors.firstName.message}</p>\n            )}\n          </div>\n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n              Nom *\n            </label>\n            <input\n              {...register('lastName')}\n              type=\"text\"\n              className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent\"\n              placeholder=\"Dupont\"\n            />\n            {errors.lastName && (\n              <p className=\"mt-1 text-sm text-red-600\">{errors.lastName.message}</p>\n            )}\n          </div>\n        </div>\n\n        <div>\n          <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n            Email *\n          </label>\n          <input\n            {...register('email')}\n            type=\"email\"\n            className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent\"\n            placeholder=\"jean.dupont@email.com\"\n          />\n          {errors.email && (\n            <p className=\"mt-1 text-sm text-red-600\">{errors.email.message}</p>\n          )}\n        </div>\n\n        <div>\n          <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n            T\uFFFDl\uFFFDphone *\n          </label>\n          <input\n            {...register('phone')}\n            type=\"tel\"\n            className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent\"\n            placeholder=\"06 12 34 56 78\"\n          />\n          {errors.phone && (\n            <p className=\"mt-1 text-sm text-red-600\">{errors.phone.message}</p>\n          )}\n        </div>\n\n        <div className=\"grid grid-cols-2 gap-4\">\n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n              Date souhait\uFFFDe *\n            </label>\n            <input\n              {...register('date')}\n              type=\"date\"\n              min={new Date().toISOString().split('T')[0]}\n              className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent\"\n            />\n            {errors.date && (\n              <p className=\"mt-1 text-sm text-red-600\">{errors.date.message}</p>\n            )}\n          </div>\n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n              Nombre de personnes *\n            </label>\n            <select\n              {...register('guests')}\n              className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent\"\n            >\n              <option value=\"\">S\uFFFDlectionner</option>\n              <option value=\"2\">2 personnes</option>\n              <option value=\"3\">3 personnes</option>\n              <option value=\"4\">4 personnes</option>\n              <option value=\"5\">5 personnes</option>\n              <option value=\"6\">6 personnes</option>\n              <option value=\"7+\">7+ personnes</option>\n            </select>\n            {errors.guests && (\n              <p className=\"mt-1 text-sm text-red-600\">{errors.guests.message}</p>\n            )}\n          </div>\n        </div>\n\n        <div>\n          <label className=\"block text-sm font-medium text-gray-700 mb-2\">\n            Message (optionnel)\n          </label>\n          <textarea\n            {...register('message')}\n            rows={3}\n            className=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent\"\n            placeholder=\"Allergies, occasion sp\uFFFDciale, pr\uFFFDf\uFFFDrences...\"\n          />\n        </div>\n\n        <button\n          type=\"submit\"\n          disabled={isSubmitting}\n          className=\"w-full bg-secondary text-white py-4 px-6 rounded-lg font-semibold hover:bg-accent transition-colors transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed\"\n        >\n          {isSubmitting ? '=\uFFFD Envoi en cours...' : '( Confirmer la R\uFFFDservation'}\n        </button>\n      </form>\n\n      <div className=\"mt-6 text-center text-sm text-gray-600\">\n        <p>=\uFFFD Ou appelez-nous directement au <strong>01 42 60 15 78</strong></p>\n        <p>\uFFFD Mar-Sam: 19h00-23h00 | Ferm\uFFFD Dim-Lun</p>\n      </div>\n    </div>\n  )\n}";
    };
    /**
     * API route pour le formulaire de contact
     */
    TechOpsAgent.prototype.generateContactAPI = function () {
        return "import { NextRequest, NextResponse } from 'next/server'\nimport { z } from 'zod'\n\nconst contactSchema = z.object({\n  firstName: z.string().min(2),\n  lastName: z.string().min(2),\n  email: z.string().email(),\n  phone: z.string().min(10),\n  date: z.string().min(1),\n  guests: z.string().min(1),\n  message: z.string().optional(),\n})\n\nexport async function POST(request: NextRequest) {\n  try {\n    const body = await request.json()\n    const validatedData = contactSchema.parse(body)\n\n    // Envoi email via Resend ou Formspree\n    const emailData = {\n      to: 'contact@legourmet-paris.fr',\n      subject: `Nouvelle r\uFFFDservation - ${validatedData.firstName} ${validatedData.lastName}`,\n      html: `\n        <h2>Nouvelle demande de r\uFFFDservation</h2>\n        <p><strong>Nom:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>\n        <p><strong>Email:</strong> ${validatedData.email}</p>\n        <p><strong>T\uFFFDl\uFFFDphone:</strong> ${validatedData.phone}</p>\n        <p><strong>Date souhait\uFFFDe:</strong> ${validatedData.date}</p>\n        <p><strong>Nombre de personnes:</strong> ${validatedData.guests}</p>\n        ${validatedData.message ? `<p><strong>Message:</strong> ${validatedData.message}</p>` : ''}\n        <hr>\n        <p><em>Envoy\uFFFD depuis le site Le Gourmet</em></p>\n      `\n    }\n\n    // Simulation d'envoi (remplacer par vraie int\uFFFDgration)\n    console.log('R\uFFFDservation re\uFFFDue:', validatedData)\n    console.log('Email \uFFFD envoyer:', emailData)\n\n    // TODO: Int\uFFFDgrer avec Resend, Formspree ou service email\n    // await resend.emails.send(emailData)\n\n    return NextResponse.json(\n      { message: 'R\uFFFDservation envoy\uFFFDe avec succ\uFFFDs' },\n      { status: 200 }\n    )\n  } catch (error) {\n    console.error('Erreur API contact:', error)\n    \n    if (error instanceof z.ZodError) {\n      return NextResponse.json(\n        { error: 'Donn\uFFFDes invalides', details: error.errors },\n        { status: 400 }\n      )\n    }\n\n    return NextResponse.json(\n      { error: 'Erreur serveur interne' },\n      { status: 500 }\n    )\n  }\n}";
    };
    /**
     * Configuration compl�te pour d�ploiement Vercel
     */
    TechOpsAgent.prototype.getDeploymentInstructions = function () {
        return {
            steps: [
                '1. Connecter le repo GitHub � Vercel',
                '2. Configurer les variables d\'environnement',
                '3. D�finir les domaines personnalis�s',
                '4. Configurer les redirections et headers',
                '5. Activer les analytics Vercel',
                '6. Setup des webhooks pour d�ploiement automatique'
            ],
            commands: [
                'vercel login',
                'vercel link',
                'vercel env add NEXT_PUBLIC_SITE_URL production',
                'vercel --prod',
                'vercel domains add legourmet-paris.fr',
                'vercel alias legourmet-paris.fr'
            ],
            vercelSettings: {
                buildCommand: 'npm run build',
                outputDirectory: '.next',
                installCommand: 'npm ci',
                nodeVersion: '18.x',
                regions: ['iad1', 'fra1'],
                functions: {
                    'src/app/api/**/*.ts': {
                        runtime: 'nodejs18.x',
                        maxDuration: 10
                    }
                }
            }
        };
    };
    return TechOpsAgent;
}());
exports.TechOpsAgent = TechOpsAgent;
exports.default = TechOpsAgent;
