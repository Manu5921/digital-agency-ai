/**
 * Template de Design System - Plomberie Française
 * Système spécialisé pour entreprises de plomberie en France
 * Optimisé pour conversion et confiance client
 */

import { DesignSystem, DesignSystemConfig, ColorPalette } from '../workflows/design-system';

export interface PlomberieDesignConfig extends DesignSystemConfig {
  companyName: string;
  specialties: ('reparation' | 'debouchage' | 'renovation' | 'chauffage' | 'sanitaire')[];
  serviceZone: string;
  urgencyLevel: 'standard' | 'urgent' | '24h7j';
  certifications: string[];
}

export class PlomberieDesignSystem extends DesignSystem {
  private plomberieConfig: PlomberieDesignConfig;

  constructor(config: PlomberieDesignConfig) {
    super(config);
    this.plomberieConfig = config;
  }

  /**
   * Génère une palette spécialisée plomberie avec couleurs de confiance
   */
  generatePlomberiePalette(): ColorPalette & {
    plomberieColors: {
      waterBlue: string;
      toolGray: string;
      copperOrange: string;
      safetyYellow: string;
      urgentRed: string;
      trustGreen: string;
    };
  } {
    const basePalette = this.generateColorPalette(this.plomberieConfig.baseColor);
    
    // Couleurs métier spécialisées plomberie
    const plomberieColors = {
      waterBlue: '#1e40af',      // Bleu eau de confiance
      toolGray: '#6b7280',       // Gris outils professionnels
      copperOrange: '#ea580c',   // Orange cuivre/tuyauterie
      safetyYellow: '#fbbf24',   // Jaune sécurité/attention
      urgentRed: '#dc2626',      // Rouge urgence
      trustGreen: '#16a34a'      // Vert confiance/validation
    };

    return {
      ...basePalette,
      plomberieColors
    };
  }

  /**
   * Génère les composants UI spécialisés plomberie
   */
  generatePlomberieComponents(): {
    header: PlomberieHeaderComponent;
    hero: PlomberieHeroComponent;
    services: PlomberieServicesComponent;
    contact: PlomberieContactComponent;
    urgency: PlomberieUrgencyComponent;
    trustBadges: PlomberieTrustComponent;
  } {
    const colors = this.generatePlomberiePalette();
    const typography = this.generateTypographyScale();
    const spacing = this.generateSpacingScale();

    return {
      header: this.createHeaderComponent(colors, typography, spacing),
      hero: this.createHeroComponent(colors, typography, spacing),
      services: this.createServicesComponent(colors, typography, spacing),
      contact: this.createContactComponent(colors, typography, spacing),
      urgency: this.createUrgencyComponent(colors, typography, spacing),
      trustBadges: this.createTrustComponent(colors, typography, spacing)
    };
  }

  /**
   * Crée le composant Header avec CTA urgence
   */
  private createHeaderComponent(colors: any, typography: any, spacing: any): PlomberieHeaderComponent {
    return {
      type: 'header',
      layout: 'sticky-top',
      elements: {
        logo: {
          text: this.plomberieConfig.companyName,
          fontSize: typography.fontSizes.xl.size,
          fontWeight: typography.fontWeights.bold,
          color: colors.primary,
          icon: '🔧' // Icône outil
        },
        navigation: {
          items: [
            { label: 'Accueil', href: '#accueil' },
            { label: 'Services', href: '#services' },
            { label: 'À propos', href: '#apropos' },
            { label: 'Réalisations', href: '#portfolio' },
            { label: 'Contact', href: '#contact' }
          ],
          style: {
            fontSize: typography.fontSizes.base.size,
            fontWeight: typography.fontWeights.medium,
            color: colors.neutral[700]
          }
        },
        ctaUrgence: {
          text: 'URGENCE 24h/7j',
          phone: '01 23 45 67 89',
          style: {
            backgroundColor: colors.plomberieColors.urgentRed,
            color: 'white',
            fontSize: typography.fontSizes.sm.size,
            fontWeight: typography.fontWeights.bold,
            padding: `${spacing[2]} ${spacing[4]}`,
            borderRadius: '6px',
            animation: 'pulse-slow'
          }
        }
      },
      responsive: {
        mobile: {
          layout: 'hamburger-menu',
          ctaUrgence: { position: 'prominent' }
        }
      }
    };
  }

  /**
   * Crée le composant Hero avec proposition de valeur
   */
  private createHeroComponent(colors: any, typography: any, spacing: any): PlomberieHeroComponent {
    return {
      type: 'hero',
      layout: 'split-content',
      content: {
        headline: {
          text: `${this.plomberieConfig.companyName} - Plombiers Professionnels`,
          style: {
            fontSize: typography.fontSizes['3xl'].size,
            fontWeight: typography.fontWeights.bold,
            color: colors.neutral[900],
            lineHeight: typography.fontSizes['3xl'].lineHeight
          }
        },
        subheadline: {
          text: 'Intervention rapide 24h/7j • Artisans qualifiés • Devis gratuit',
          style: {
            fontSize: typography.fontSizes.lg.size,
            color: colors.neutral[600],
            marginTop: spacing[4]
          }
        },
        features: [
          '✅ Intervention sous 1h en urgence',
          '✅ Devis gratuit et transparent',
          '✅ Garantie sur tous nos travaux',
          '✅ Artisans certifiés et assurés'
        ],
        ctaGroup: {
          primary: {
            text: 'Appeler maintenant',
            phone: '01 23 45 67 89',
            style: {
              backgroundColor: colors.plomberieColors.urgentRed,
              color: 'white',
              fontSize: typography.fontSizes.lg.size,
              padding: `${spacing[4]} ${spacing[8]}`,
              borderRadius: '8px',
              fontWeight: typography.fontWeights.semibold
            }
          },
          secondary: {
            text: 'Demander un devis',
            style: {
              backgroundColor: 'transparent',
              color: colors.plomberieColors.waterBlue,
              border: `2px solid ${colors.plomberieColors.waterBlue}`,
              fontSize: typography.fontSizes.lg.size,
              padding: `${spacing[4]} ${spacing[8]}`,
              borderRadius: '8px',
              fontWeight: typography.fontWeights.medium
            }
          }
        }
      },
      visual: {
        type: 'image',
        src: '/images/plombier-professionnel.jpg',
        alt: 'Plombier professionnel au travail',
        overlay: {
          trustBadge: {
            text: '+500 interventions réussies',
            icon: '⭐',
            style: {
              backgroundColor: colors.plomberieColors.trustGreen,
              color: 'white',
              position: 'bottom-right'
            }
          }
        }
      }
    };
  }

  /**
   * Crée le composant Services avec iconographie métier
   */
  private createServicesComponent(colors: any, typography: any, spacing: any): PlomberieServicesComponent {
    const services = this.generateServicesFromSpecialties();
    
    return {
      type: 'services',
      layout: 'grid-4-cols',
      title: {
        text: 'Nos Services de Plomberie',
        style: {
          fontSize: typography.fontSizes['2xl'].size,
          fontWeight: typography.fontWeights.bold,
          color: colors.neutral[900],
          textAlign: 'center',
          marginBottom: spacing[12]
        }
      },
      services: services.map(service => ({
        icon: service.icon,
        title: service.title,
        description: service.description,
        features: service.features,
        urgency: service.urgency,
        style: {
          card: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: spacing[6],
            boxShadow: this.generateShadowScale().md,
            border: `1px solid ${colors.neutral[200]}`,
            transition: 'all 0.3s ease'
          },
          icon: {
            fontSize: '48px',
            marginBottom: spacing[4],
            color: colors.plomberieColors.waterBlue
          },
          title: {
            fontSize: typography.fontSizes.lg.size,
            fontWeight: typography.fontWeights.bold,
            color: colors.neutral[900],
            marginBottom: spacing[2]
          },
          description: {
            fontSize: typography.fontSizes.base.size,
            color: colors.neutral[600],
            lineHeight: '1.6'
          }
        }
      }))
    };
  }

  /**
   * Crée le composant Contact optimisé conversion
   */
  private createContactComponent(colors: any, typography: any, spacing: any): PlomberieContactComponent {
    return {
      type: 'contact',
      layout: 'two-column',
      urgencyBanner: {
        text: 'Urgence plomberie ? Appelez maintenant !',
        phone: '01 23 45 67 89',
        availability: '24h/7j - Intervention sous 1h',
        style: {
          backgroundColor: colors.plomberieColors.urgentRed,
          color: 'white',
          padding: spacing[6],
          textAlign: 'center',
          fontSize: typography.fontSizes.lg.size,
          fontWeight: typography.fontWeights.bold
        }
      },
      contactInfo: {
        company: this.plomberieConfig.companyName,
        phone: '01 23 45 67 89',
        email: 'contact@plombipro.fr',
        address: '123 Rue de la République, 75001 Paris',
        hours: {
          normal: 'Lun-Ven: 8h-18h',
          urgent: 'Urgence: 24h/7j'
        },
        serviceZone: this.plomberieConfig.serviceZone
      },
      form: {
        title: 'Demande de Devis Gratuit',
        fields: [
          { name: 'nom', label: 'Nom et Prénom', type: 'text', required: true },
          { name: 'telephone', label: 'Téléphone', type: 'tel', required: true },
          { name: 'email', label: 'Email', type: 'email', required: false },
          { name: 'adresse', label: 'Adresse du chantier', type: 'text', required: true },
          { name: 'service', label: 'Type d\'intervention', type: 'select', options: [
            'Réparation fuite',
            'Débouchage canalisation',
            'Installation sanitaire',
            'Rénovation salle de bain',
            'Dépannage chauffage',
            'Autre'
          ], required: true },
          { name: 'urgence', label: 'Niveau d\'urgence', type: 'radio', options: [
            'Non urgent - sous 48h',
            'Urgent - aujourd\'hui',
            'Très urgent - maintenant'
          ], required: true },
          { name: 'description', label: 'Description du problème', type: 'textarea', required: false }
        ],
        submitButton: {
          text: 'Demander mon devis gratuit',
          style: {
            backgroundColor: colors.plomberieColors.trustGreen,
            color: 'white',
            fontSize: typography.fontSizes.lg.size,
            padding: `${spacing[4]} ${spacing[8]}`,
            width: '100%',
            fontWeight: typography.fontWeights.semibold
          }
        }
      }
    };
  }

  /**
   * Crée le composant Urgence flottant
   */
  private createUrgencyComponent(colors: any, typography: any, spacing: any): PlomberieUrgencyComponent {
    return {
      type: 'urgency-float',
      position: 'bottom-right',
      content: {
        text: 'URGENCE',
        subtext: '24h/7j',
        phone: '01 23 45 67 89',
        style: {
          backgroundColor: colors.plomberieColors.urgentRed,
          color: 'white',
          borderRadius: '50px',
          padding: `${spacing[4]} ${spacing[6]}`,
          boxShadow: this.generateShadowScale().xl,
          fontSize: typography.fontSizes.sm.size,
          fontWeight: typography.fontWeights.bold,
          animation: 'bounce-slow',
          zIndex: 1000
        }
      },
      triggers: ['scroll-50%', 'exit-intent', 'time-30s']
    };
  }

  /**
   * Crée les badges de confiance
   */
  private createTrustComponent(colors: any, typography: any, spacing: any): PlomberieTrustComponent {
    return {
      type: 'trust-badges',
      layout: 'horizontal-strip',
      badges: [
        {
          icon: '🛡️',
          title: 'Artisans Assurés',
          subtitle: 'Responsabilité civile pro'
        },
        {
          icon: '⭐',
          title: '4.8/5',
          subtitle: '+150 avis clients'
        },
        {
          icon: '🚀',
          title: 'Intervention Rapide',
          subtitle: 'Sous 1h en urgence'
        },
        {
          icon: '✅',
          title: 'Devis Gratuit',
          subtitle: 'Transparent et détaillé'
        },
        {
          icon: '🔧',
          title: 'Qualifiés RGE',
          subtitle: 'Certifications reconnues'
        }
      ],
      style: {
        backgroundColor: colors.neutral[50],
        padding: `${spacing[8]} 0`,
        borderTop: `1px solid ${colors.neutral[200]}`
      }
    };
  }

  /**
   * Génère les services basés sur les spécialités
   */
  private generateServicesFromSpecialties(): PlomberieService[] {
    const serviceMap: Record<string, PlomberieService> = {
      reparation: {
        icon: '🔧',
        title: 'Réparations d\'Urgence',
        description: 'Fuites, robinetterie, canalisations - Intervention rapide 24h/7j',
        features: ['Diagnostic gratuit', 'Réparation immédiate', 'Pièces de qualité'],
        urgency: 'immediate'
      },
      debouchage: {
        icon: '🚿',
        title: 'Débouchage Canalisations',
        description: 'Évier, lavabo, WC, douche - Solutions professionnelles garanties',
        features: ['Haute pression', 'Caméra d\'inspection', 'Garantie résultat'],
        urgency: 'same-day'
      },
      renovation: {
        icon: '🛁',
        title: 'Rénovation Salle de Bain',
        description: 'Installation complète, carrelage, sanitaires - Projet clé en main',
        features: ['Devis détaillé', 'Matériaux inclus', 'Finitions soignées'],
        urgency: 'planned'
      },
      chauffage: {
        icon: '🔥',
        title: 'Chauffage & Chaudière',
        description: 'Installation, entretien, dépannage - Toutes énergies',
        features: ['Certifié RGE', 'Aides disponibles', 'Maintenance incluse'],
        urgency: 'seasonal'
      },
      sanitaire: {
        icon: '🚽',
        title: 'Installation Sanitaire',
        description: 'WC, lavabo, douche, baignoire - Pose professionnelle',
        features: ['Matériel pro', 'Respect des normes', 'Garantie installation'],
        urgency: 'planned'
      }
    };

    return this.plomberieConfig.specialties.map(specialty => serviceMap[specialty]);
  }

  /**
   * Génère le HTML/CSS complet de la landing page
   */
  generateLandingPageHTML(): string {
    const components = this.generatePlomberieComponents();
    const colors = this.generatePlomberiePalette();
    const designSystem = this.generateCompleteDesignSystem();

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.plomberieConfig.companyName} - Plombier Professionnel ${this.plomberieConfig.serviceZone}</title>
    <meta name="description" content="Plombier professionnel ${this.plomberieConfig.serviceZone}. Intervention rapide 24h/7j. Devis gratuit. Artisans qualifiés et assurés.">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
${designSystem.css}

/* Styles spécialisés plomberie */
.plomberie-header {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.urgence-cta {
    background: ${colors.plomberieColors.urgentRed};
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    text-decoration: none;
    animation: pulse 2s infinite;
}

.hero-section {
    background: linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.neutral[100]} 100%);
    padding: 80px 20px;
}

.service-card {
    background: white;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid ${colors.neutral[200]};
}

.service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.trust-badges {
    background: ${colors.neutral[50]};
    border-top: 1px solid ${colors.neutral[200]};
    padding: 40px 0;
}

.urgence-float {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${colors.plomberieColors.urgentRed};
    color: white;
    padding: 16px 24px;
    border-radius: 50px;
    box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3);
    z-index: 1000;
    animation: bounce 3s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -10px, 0); }
    70% { transform: translate3d(0, -5px, 0); }
    90% { transform: translate3d(0, -2px, 0); }
}

/* Responsive */
@media (max-width: 768px) {
    .hero-section { padding: 40px 20px; }
    .service-grid { grid-template-columns: 1fr; gap: 20px; }
    .urgence-float { bottom: 10px; right: 10px; padding: 12px 20px; }
}
    </style>
</head>
<body>
    <!-- Header avec CTA urgence -->
    <header class="plomberie-header">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="logo flex items-center">
                <span class="text-2xl">🔧</span>
                <h1 class="ml-2 text-xl font-bold text-blue-900">${this.plomberieConfig.companyName}</h1>
            </div>
            
            <nav class="hidden md:flex space-x-6">
                <a href="#accueil" class="text-gray-700 hover:text-blue-900">Accueil</a>
                <a href="#services" class="text-gray-700 hover:text-blue-900">Services</a>
                <a href="#apropos" class="text-gray-700 hover:text-blue-900">À propos</a>
                <a href="#contact" class="text-gray-700 hover:text-blue-900">Contact</a>
            </nav>
            
            <a href="tel:0123456789" class="urgence-cta">
                📞 URGENCE 24h/7j<br>
                <small>01 23 45 67 89</small>
            </a>
        </div>
    </header>

    <!-- Section Hero -->
    <section id="accueil" class="hero-section">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        ${this.plomberieConfig.companyName}<br>
                        <span class="text-blue-900">Plombiers Professionnels</span>
                    </h2>
                    
                    <p class="text-xl text-gray-600 mb-8">
                        Intervention rapide 24h/7j • Artisans qualifiés • Devis gratuit
                    </p>
                    
                    <div class="space-y-3 mb-8">
                        <div class="flex items-center">
                            <span class="text-green-600 text-lg mr-3">✅</span>
                            <span>Intervention sous 1h en urgence</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-green-600 text-lg mr-3">✅</span>
                            <span>Devis gratuit et transparent</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-green-600 text-lg mr-3">✅</span>
                            <span>Garantie sur tous nos travaux</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-green-600 text-lg mr-3">✅</span>
                            <span>Artisans certifiés et assurés</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="tel:0123456789" class="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold text-center hover:bg-red-700 transition-colors">
                            📞 Appeler maintenant
                        </a>
                        <a href="#contact" class="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-lg text-lg font-medium text-center hover:bg-blue-900 hover:text-white transition-colors">
                            Demander un devis
                        </a>
                    </div>
                </div>
                
                <div class="relative">
                    <div class="bg-white p-8 rounded-lg shadow-lg">
                        <div class="text-center">
                            <div class="text-6xl mb-4">🔧⚡</div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Intervention Express</h3>
                            <p class="text-gray-600 mb-4">Nos plombiers interviennent rapidement partout dans ${this.plomberieConfig.serviceZone}</p>
                            <div class="bg-green-600 text-white px-4 py-2 rounded-full inline-block">
                                <span class="font-bold">+500 interventions réussies ⭐</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section Services -->
    <section id="services" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
                Nos Services de Plomberie
            </h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 service-grid">
                ${this.generateServicesHTML(components.services)}
            </div>
        </div>
    </section>

    <!-- Section Contact -->
    <section id="contact" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <!-- Banner urgence -->
            <div class="bg-red-600 text-white text-center py-6 rounded-lg mb-12">
                <h3 class="text-2xl font-bold mb-2">Urgence plomberie ? Appelez maintenant !</h3>
                <a href="tel:0123456789" class="text-3xl font-bold">📞 01 23 45 67 89</a>
                <p class="mt-2">24h/7j - Intervention sous 1h</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Informations contact -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Contactez-nous</h3>
                    
                    <div class="space-y-4 mb-8">
                        <div class="flex items-center">
                            <span class="text-blue-900 text-xl mr-4">📞</span>
                            <div>
                                <strong>Téléphone</strong><br>
                                <a href="tel:0123456789" class="text-blue-900 font-bold">01 23 45 67 89</a>
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <span class="text-blue-900 text-xl mr-4">📧</span>
                            <div>
                                <strong>Email</strong><br>
                                <a href="mailto:contact@plombipro.fr" class="text-blue-900">contact@plombipro.fr</a>
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <span class="text-blue-900 text-xl mr-4">📍</span>
                            <div>
                                <strong>Adresse</strong><br>
                                123 Rue de la République<br>
                                75001 Paris
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <span class="text-blue-900 text-xl mr-4">🕒</span>
                            <div>
                                <strong>Horaires</strong><br>
                                Lun-Ven: 8h-18h<br>
                                <span class="text-red-600 font-bold">Urgence: 24h/7j</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Formulaire de contact -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Demande de Devis Gratuit</h3>
                    
                    <form class="space-y-4">
                        <input type="text" placeholder="Nom et Prénom *" required class="w-full p-3 border border-gray-300 rounded-lg">
                        <input type="tel" placeholder="Téléphone *" required class="w-full p-3 border border-gray-300 rounded-lg">
                        <input type="email" placeholder="Email" class="w-full p-3 border border-gray-300 rounded-lg">
                        <input type="text" placeholder="Adresse du chantier *" required class="w-full p-3 border border-gray-300 rounded-lg">
                        
                        <select required class="w-full p-3 border border-gray-300 rounded-lg">
                            <option value="">Type d'intervention *</option>
                            <option value="reparation">Réparation fuite</option>
                            <option value="debouchage">Débouchage canalisation</option>
                            <option value="installation">Installation sanitaire</option>
                            <option value="renovation">Rénovation salle de bain</option>
                            <option value="chauffage">Dépannage chauffage</option>
                            <option value="autre">Autre</option>
                        </select>
                        
                        <div>
                            <p class="font-semibold mb-2">Niveau d'urgence *</p>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="radio" name="urgence" value="normal" class="mr-2">
                                    Non urgent - sous 48h
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="urgence" value="urgent" class="mr-2">
                                    Urgent - aujourd'hui
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="urgence" value="immediat" class="mr-2">
                                    Très urgent - maintenant
                                </label>
                            </div>
                        </div>
                        
                        <textarea placeholder="Description du problème" rows="4" class="w-full p-3 border border-gray-300 rounded-lg"></textarea>
                        
                        <button type="submit" class="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                            🚀 Demander mon devis gratuit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Trust Badges -->
    <section class="trust-badges">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div>
                    <div class="text-3xl mb-2">🛡️</div>
                    <h4 class="font-bold">Artisans Assurés</h4>
                    <p class="text-sm text-gray-600">Responsabilité civile pro</p>
                </div>
                <div>
                    <div class="text-3xl mb-2">⭐</div>
                    <h4 class="font-bold">4.8/5</h4>
                    <p class="text-sm text-gray-600">+150 avis clients</p>
                </div>
                <div>
                    <div class="text-3xl mb-2">🚀</div>
                    <h4 class="font-bold">Intervention Rapide</h4>
                    <p class="text-sm text-gray-600">Sous 1h en urgence</p>
                </div>
                <div>
                    <div class="text-3xl mb-2">✅</div>
                    <h4 class="font-bold">Devis Gratuit</h4>
                    <p class="text-sm text-gray-600">Transparent et détaillé</p>
                </div>
                <div>
                    <div class="text-3xl mb-2">🔧</div>
                    <h4 class="font-bold">Qualifiés RGE</h4>
                    <p class="text-sm text-gray-600">Certifications reconnues</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">🔧 ${this.plomberieConfig.companyName}</h3>
                    <p class="text-gray-300 mb-4">
                        Votre plombier de confiance ${this.plomberieConfig.serviceZone}. 
                        Intervention rapide, travail soigné, prix transparents.
                    </p>
                    <div class="text-red-400 font-bold">
                        📞 URGENCE 24h/7j<br>
                        01 23 45 67 89
                    </div>
                </div>
                
                <div>
                    <h3 class="text-xl font-bold mb-4">Nos Services</h3>
                    <ul class="space-y-2 text-gray-300">
                        <li>• Réparations d'urgence</li>
                        <li>• Débouchage canalisations</li>
                        <li>• Rénovation salle de bain</li>
                        <li>• Chauffage et chaudière</li>
                        <li>• Installation sanitaire</li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-bold mb-4">Zone d'Intervention</h3>
                    <p class="text-gray-300 mb-4">${this.plomberieConfig.serviceZone}</p>
                    <p class="text-sm text-gray-400">
                        Artisan plombier certifié • Devis gratuit • Garantie travaux
                    </p>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 ${this.plomberieConfig.companyName}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <!-- Bouton urgence flottant -->
    <a href="tel:0123456789" class="urgence-float">
        <div class="text-center">
            <div class="text-lg font-bold">URGENCE</div>
            <div class="text-sm">24h/7j</div>
            <div class="text-xs mt-1">☎️ Cliquez pour appeler</div>
        </div>
    </a>

    <!-- Scripts -->
    <script>
        // Animation du bouton urgence flottant
        let urgenceButton = document.querySelector('.urgence-float');
        let hasShown = false;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight * 0.5 && !hasShown) {
                urgenceButton.style.display = 'block';
                hasShown = true;
            }
        });
        
        // Tracking des clics CTA
        document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('CTA Call clicked:', this.href);
                // Ici on pourrait ajouter Google Analytics, Facebook Pixel, etc.
            });
        });
        
        // Smooth scroll pour la navigation
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                let target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>`;
  }

  /**
   * Génère le HTML des services
   */
  private generateServicesHTML(servicesComponent: PlomberieServicesComponent): string {
    return servicesComponent.services.map(service => `
      <div class="service-card">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">${service.icon}</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">${service.title}</h3>
          <p class="text-gray-600">${service.description}</p>
        </div>
        
        <div class="space-y-2 mb-6">
          ${service.features.map(feature => `
            <div class="flex items-center">
              <span class="text-green-600 mr-2">✓</span>
              <span class="text-sm">${feature}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center">
          <a href="tel:0123456789" class="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
            Demander un devis
          </a>
        </div>
      </div>
    `).join('');
  }

  /**
   * Génère les métadonnées SEO spécialisées
   */
  generateSEOMetadata(): PlomberieSEOMetadata {
    return {
      title: `${this.plomberieConfig.companyName} - Plombier ${this.plomberieConfig.serviceZone} | Intervention 24h/7j`,
      description: `Plombier professionnel ${this.plomberieConfig.serviceZone}. Intervention rapide 24h/7j, devis gratuit. Réparation fuite, débouchage, rénovation. Artisans certifiés.`,
      keywords: [
        'plombier',
        this.plomberieConfig.serviceZone.toLowerCase(),
        'intervention urgence',
        'débouchage canalisation',
        'réparation fuite',
        'devis gratuit plombier',
        'plombier 24h',
        'chauffagiste'
      ],
      localBusiness: {
        name: this.plomberieConfig.companyName,
        address: `123 Rue de la République, ${this.plomberieConfig.serviceZone}`,
        phone: '01 23 45 67 89',
        priceRange: '€€',
        rating: 4.8,
        reviewCount: 156,
        serviceArea: this.plomberieConfig.serviceZone,
        services: this.plomberieConfig.specialties
      },
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': this.plomberieConfig.companyName,
        'image': '/images/logo-plombier.jpg',
        'telephone': '01-23-45-67-89',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '123 Rue de la République',
          'addressLocality': this.plomberieConfig.serviceZone,
          'addressCountry': 'FR'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 48.8566,
          'longitude': 2.3522
        },
        'url': 'https://plombipro.fr',
        'priceRange': '€€',
        'openingHours': 'Mo-Fr 08:00-18:00',
        'serviceArea': {
          '@type': 'City',
          'name': this.plomberieConfig.serviceZone
        }
      }
    };
  }
}

// Interfaces pour les composants plomberie
export interface PlomberieHeaderComponent {
  type: 'header';
  layout: 'sticky-top';
  elements: {
    logo: { text: string; fontSize: string; fontWeight: number; color: string; icon: string };
    navigation: { items: Array<{ label: string; href: string }>; style: any };
    ctaUrgence: { text: string; phone: string; style: any };
  };
  responsive: any;
}

export interface PlomberieHeroComponent {
  type: 'hero';
  layout: 'split-content';
  content: {
    headline: { text: string; style: any };
    subheadline: { text: string; style: any };
    features: string[];
    ctaGroup: {
      primary: { text: string; phone: string; style: any };
      secondary: { text: string; style: any };
    };
  };
  visual: {
    type: 'image';
    src: string;
    alt: string;
    overlay: { trustBadge: { text: string; icon: string; style: any } };
  };
}

export interface PlomberieServicesComponent {
  type: 'services';
  layout: 'grid-4-cols';
  title: { text: string; style: any };
  services: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
    urgency: string;
    style: any;
  }>;
}

export interface PlomberieContactComponent {
  type: 'contact';
  layout: 'two-column';
  urgencyBanner: { text: string; phone: string; availability: string; style: any };
  contactInfo: {
    company: string;
    phone: string;
    email: string;
    address: string;
    hours: { normal: string; urgent: string };
    serviceZone: string;
  };
  form: {
    title: string;
    fields: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
      options?: string[];
    }>;
    submitButton: { text: string; style: any };
  };
}

export interface PlomberieUrgencyComponent {
  type: 'urgency-float';
  position: 'bottom-right';
  content: { text: string; subtext: string; phone: string; style: any };
  triggers: string[];
}

export interface PlomberieTrustComponent {
  type: 'trust-badges';
  layout: 'horizontal-strip';
  badges: Array<{ icon: string; title: string; subtitle: string }>;
  style: any;
}

export interface PlomberieService {
  icon: string;
  title: string;
  description: string;
  features: string[];
  urgency: 'immediate' | 'same-day' | 'planned' | 'seasonal';
}

export interface PlomberieSEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  localBusiness: {
    name: string;
    address: string;
    phone: string;
    priceRange: string;
    rating: number;
    reviewCount: number;
    serviceArea: string;
    services: string[];
  };
  schema: object;
}

/**
 * Factory pour créer des systèmes de design plomberie
 */
export class PlomberieDesignFactory {
  static createPlomberieDesignSystem(
    companyName: string,
    serviceZone: string,
    specialties: PlomberieDesignConfig['specialties'],
    baseColor: string = '#1e40af'
  ): PlomberieDesignSystem {
    const config: PlomberieDesignConfig = {
      companyName,
      name: `${companyName} Design System`,
      version: '1.0.0',
      sector: 'tech', // Pas de secteur plomberie dans l'enum original, on utilise tech
      style: 'moderne',
      baseColor,
      brandPersonality: 'professional',
      specialties,
      serviceZone,
      urgencyLevel: '24h7j',
      certifications: ['RGE', 'Qualibat', 'Assurance Pro']
    };

    return new PlomberieDesignSystem(config);
  }
}

export default PlomberieDesignSystem;