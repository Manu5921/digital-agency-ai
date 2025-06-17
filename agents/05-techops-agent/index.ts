/**
 * TechOps Agent - Restaurant Modules & Vercel Deployment
 * Spécialisé dans l'intégration de modules Next.js et déploiement automatisé
 */

export interface ModuleConfig {
  name: string;
  type: 'integration' | 'ui' | 'analytics' | 'payment' | 'communication';
  dependencies: string[];
  envVars: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface DeploymentConfig {
  platform: 'vercel' | 'netlify' | 'aws';
  domain?: string;
  environment: 'development' | 'staging' | 'production';
  buildCommand: string;
  outputDirectory: string;
}

export class TechOpsAgent {
  private moduleConfigs: ModuleConfig[] = [];
  private deploymentConfig: DeploymentConfig;

  constructor(deploymentConfig: DeploymentConfig) {
    this.deploymentConfig = deploymentConfig;
    this.setupRestaurantModules();
  }

  /**
   * Configuration des modules spécifiques restaurant
   */
  private setupRestaurantModules(): void {
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
  }

  /**
   * Génère le package.json avec toutes les dépendances
   */
  generatePackageJSON(): string {
    const allDependencies = this.moduleConfigs
      .flatMap(module => module.dependencies)
      .reduce((acc, dep) => {
        acc[dep] = 'latest';
        return acc;
      }, {} as Record<string, string>);

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
      "dependencies": {
        "next": "15.3.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "tailwindcss": "^3.4.0",
        "typescript": "^5.2.0",
        ...allDependencies
      },
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
  }

  /**
   * Configuration Vercel pour déploiement
   */
  generateVercelConfig(): string {
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
  }

  /**
   * Variables d'environnement pour production
   */
  generateEnvTemplate(): string {
    const envVars = this.moduleConfigs
      .flatMap(module => module.envVars)
      .filter((value, index, self) => self.indexOf(value) === index);

    return `# Restaurant Le Gourmet - Environment Variables Template
# Copy to .env.local for development
# Configure in Vercel dashboard for production

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://legourmet-paris.fr
NEXT_PUBLIC_SITE_NAME="Le Gourmet"

# Communication
${envVars.includes('FORMSPREE_FORM_ID') ? 'FORMSPREE_FORM_ID=your_formspree_id' : ''}
${envVars.includes('RESEND_API_KEY') ? 'RESEND_API_KEY=your_resend_api_key' : ''}

# Maps & Location
${envVars.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY') ? 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key' : ''}

# Analytics
${envVars.includes('NEXT_PUBLIC_POSTHOG_KEY') ? 'NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key' : ''}
${envVars.includes('NEXT_PUBLIC_POSTHOG_HOST') ? 'NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com' : ''}

# Reservations
${envVars.includes('RESERVATION_WEBHOOK_URL') ? 'RESERVATION_WEBHOOK_URL=your_webhook_url' : ''}

# Images & Media
${envVars.includes('CLOUDINARY_URL') ? 'CLOUDINARY_URL=your_cloudinary_url' : ''}

# Security
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://legourmet-paris.fr`;
  }

  /**
   * Composant de formulaire de contact
   */
  generateContactForm(): string {
    return `'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  date: z.string().min(1, 'Veuillez sélectionner une date'),
  guests: z.string().min(1, 'Veuillez sélectionner le nombre de personnes'),
  message: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-heading font-bold text-primary mb-6">Réservation</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
           Votre réservation a été envoyée avec succès. Nous vous contacterons sous 24h.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
          L Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom *
            </label>
            <input
              {...register('firstName')}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Jean"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom *
            </label>
            <input
              {...register('lastName')}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Dupont"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="jean.dupont@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone *
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="06 12 34 56 78"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date souhaitée *
            </label>
            <input
              {...register('date')}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de personnes *
            </label>
            <select
              {...register('guests')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="">Sélectionner</option>
              <option value="2">2 personnes</option>
              <option value="3">3 personnes</option>
              <option value="4">4 personnes</option>
              <option value="5">5 personnes</option>
              <option value="6">6 personnes</option>
              <option value="7+">7+ personnes</option>
            </select>
            {errors.guests && (
              <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message (optionnel)
          </label>
          <textarea
            {...register('message')}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Allergies, occasion spéciale, préférences..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary text-white py-4 px-6 rounded-lg font-semibold hover:bg-accent transition-colors transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '=ä Envoi en cours...' : '( Confirmer la Réservation'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>=Þ Ou appelez-nous directement au <strong>01 42 60 15 78</strong></p>
        <p>ð Mar-Sam: 19h00-23h00 | Fermé Dim-Lun</p>
      </div>
    </div>
  )
}`;
  }

  /**
   * API route pour le formulaire de contact
   */
  generateContactAPI(): string {
    return `import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string().min(1),
  guests: z.string().min(1),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Envoi email via Resend ou Formspree
    const emailData = {
      to: 'contact@legourmet-paris.fr',
      subject: \`Nouvelle réservation - \${validatedData.firstName} \${validatedData.lastName}\`,
      html: \`
        <h2>Nouvelle demande de réservation</h2>
        <p><strong>Nom:</strong> \${validatedData.firstName} \${validatedData.lastName}</p>
        <p><strong>Email:</strong> \${validatedData.email}</p>
        <p><strong>Téléphone:</strong> \${validatedData.phone}</p>
        <p><strong>Date souhaitée:</strong> \${validatedData.date}</p>
        <p><strong>Nombre de personnes:</strong> \${validatedData.guests}</p>
        \${validatedData.message ? \`<p><strong>Message:</strong> \${validatedData.message}</p>\` : ''}
        <hr>
        <p><em>Envoyé depuis le site Le Gourmet</em></p>
      \`
    }

    // Simulation d'envoi (remplacer par vraie intégration)
    console.log('Réservation reçue:', validatedData)
    console.log('Email à envoyer:', emailData)

    // TODO: Intégrer avec Resend, Formspree ou service email
    // await resend.emails.send(emailData)

    return NextResponse.json(
      { message: 'Réservation envoyée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API contact:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}`;
  }

  /**
   * Configuration complète pour déploiement Vercel
   */
  getDeploymentInstructions(): {
    steps: string[];
    commands: string[];
    vercelSettings: Record<string, any>;
  } {
    return {
      steps: [
        '1. Connecter le repo GitHub à Vercel',
        '2. Configurer les variables d\'environnement',
        '3. Définir les domaines personnalisés',
        '4. Configurer les redirections et headers',
        '5. Activer les analytics Vercel',
        '6. Setup des webhooks pour déploiement automatique'
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
  }
}

export default TechOpsAgent;