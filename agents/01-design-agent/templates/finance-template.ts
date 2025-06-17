/**
 * Template Secteur Finance - Phase 2 Design Agent
 * Templates pour banques, conseillers financiers, assurances, fintech
 */

export interface FinanceTemplateConfig {
  businessName: string;
  serviceType: 'banque' | 'conseil' | 'assurance' | 'fintech' | 'crypto';
  style: 'classique' | 'moderne' | 'minimaliste';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    trust: string;
    success: string;
  };
  features: string[];
}

export class FinanceTemplate {
  private config: FinanceTemplateConfig;

  constructor(config: FinanceTemplateConfig) {
    this.config = config;
  }

  /**
   * Génère la palette couleurs finance selon le style
   */
  generateFinanceColorPalette(): Record<string, string> {
    const palettes = {
      classique: {
        primary: '#1e3a8a',     // Bleu banque traditionnel
        secondary: '#059669',   // Vert monétaire
        accent: '#d97706',      // Orange premium
        trust: '#1e40af',       // Bleu confiance
        success: '#10b981',     // Vert succès
        background: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280',
        warning: '#f59e0b',
        danger: '#ef4444',
        gold: '#fbbf24',        // Or premium
        silver: '#9ca3af'       // Argent
      },
      moderne: {
        primary: '#3b82f6',     // Bleu moderne
        secondary: '#8b5cf6',   // Violet fintech
        accent: '#06b6d4',      // Cyan tech
        trust: '#1d4ed8',       // Bleu digital
        success: '#22c55e',     // Vert moderne
        background: '#fafafa',
        text: '#111827',
        muted: '#64748b',
        warning: '#eab308',
        danger: '#f87171',
        gold: '#f59e0b',
        silver: '#94a3b8'
      },
      minimaliste: {
        primary: '#374151',     // Gris anthracite
        secondary: '#059669',   // Vert simple
        accent: '#6b7280',      // Gris accent
        trust: '#4b5563',       // Gris foncé
        success: '#10b981',     // Vert minimaliste
        background: '#ffffff',
        text: '#1f2937',
        muted: '#9ca3af',
        warning: '#f59e0b',
        danger: '#ef4444',
        gold: '#d97706',
        silver: '#6b7280'
      }
    };

    return palettes[this.config.style];
  }

  /**
   * Génère le HTML du template finance
   */
  generateHTMLTemplate(): string {
    const colors = this.generateFinanceColorPalette();
    
    return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.businessName} - Services Financiers</title>
    <meta name="description" content="${this.config.businessName} - Expert en services financiers. Conseil, investissement, épargne. Faites confiance à notre expertise.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: ${JSON.stringify(colors)},
                    fontFamily: {
                        'sans': ['Inter', 'sans-serif'],
                        'serif': ['Playfair Display', 'serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        .gradient-finance {
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .card-premium {
            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }
        
        .card-premium:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border-color: ${colors.primary};
        }
        
        .stats-counter {
            font-variant-numeric: tabular-nums;
        }
        
        .trust-badge {
            background: linear-gradient(45deg, ${colors.trust}, ${colors.success});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body class="font-sans bg-gray-50">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold font-serif text-primary">
                        ${this.config.businessName}
                    </h1>
                    <p class="text-xs text-muted uppercase tracking-wide">${this.getServiceTypeLabel()}</p>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#accueil" class="text-gray-700 hover:text-primary transition-colors font-medium">Accueil</a>
                    <a href="#services" class="text-gray-700 hover:text-primary transition-colors font-medium">Services</a>
                    <a href="#solutions" class="text-gray-700 hover:text-primary transition-colors font-medium">Solutions</a>
                    <a href="#expertise" class="text-gray-700 hover:text-primary transition-colors font-medium">Expertise</a>
                    <a href="#contact" class="text-gray-700 hover:text-primary transition-colors font-medium">Contact</a>
                    <a href="#consultation" class="gradient-finance text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold">
                        Consultation gratuite
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="accueil" class="pt-16 pb-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
                <div>
                    <div class="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <span class="text-primary font-semibold text-sm">🏆 Certifié AMF & ACPR</span>
                    </div>
                    
                    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Votre avenir financier
                        <span class="gradient-text block">commence ici</span>
                    </h1>
                    
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                        Expertise financière de premier plan. Nous vous accompagnons dans tous vos projets 
                        d'investissement et de gestion patrimoniale avec plus de 15 ans d'expérience.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 mb-12">
                        <a href="#consultation" class="gradient-finance text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center">
                            Consultation gratuite
                        </a>
                        <a href="#services" class="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center">
                            Découvrir nos services
                        </a>
                    </div>
                    
                    <!-- Stats financières -->
                    <div class="grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary stats-counter">2.5M€</div>
                            <div class="text-sm text-muted">Patrimoine géré</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary stats-counter">98%</div>
                            <div class="text-sm text-muted">Clients satisfaits</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary stats-counter">15+</div>
                            <div class="text-sm text-muted">Années d'expertise</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Conseiller financier professionnel" 
                         class="rounded-2xl shadow-2xl">
                    
                    <!-- Badge performance -->
                    <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-success">+12.5%</div>
                            <div class="text-sm text-muted">Performance moyenne</div>
                            <div class="text-xs text-success">↗ Année 2024</div>
                        </div>
                    </div>
                    
                    <!-- Badge sécurité -->
                    <div class="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                                <span class="text-white text-sm">🛡️</span>
                            </div>
                            <div>
                                <div class="font-semibold text-xs">Sécurisé</div>
                                <div class="text-xs text-muted">Fonds garantis</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Nos <span class="gradient-text">Services</span> Financiers
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Solutions sur mesure pour optimiser votre patrimoine et concrétiser vos projets
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateServiceCards()}
            </div>
        </div>
    </section>

    <!-- Solutions Section -->
    <section id="solutions" class="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Solutions <span class="gradient-text">Personnalisées</span>
                </h2>
                <p class="text-xl text-gray-600">Chaque situation est unique, nos solutions aussi</p>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div class="space-y-8">
                        ${this.generateSolutionFeatures()}
                    </div>
                </div>
                
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Analyse financière" 
                         class="rounded-2xl shadow-2xl">
                </div>
            </div>
        </div>
    </section>

    <!-- Expertise Section -->
    <section id="expertise" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Notre <span class="gradient-text">Expertise</span>
                </h2>
                <p class="text-xl text-gray-600">Une équipe de professionnels certifiés à votre service</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateExpertiseCards()}
            </div>
        </div>
    </section>

    <!-- Témoignages -->
    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Témoignages <span class="gradient-text">Clients</span>
                </h2>
                <p class="text-xl text-gray-600">Ils nous font confiance pour leur avenir financier</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateTestimonials()}
            </div>
        </div>
    </section>

    <!-- Contact & Consultation -->
    <section id="contact" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Informations -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Prendre contact</h3>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📍</div>
                            <div>
                                <p class="font-semibold">Adresse</p>
                                <p class="text-gray-600">15 Avenue des Champs-Élysées<br>75008 Paris</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📞</div>
                            <div>
                                <p class="font-semibold">Téléphone</p>
                                <p class="text-gray-600">01 42 86 15 47</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📧</div>
                            <div>
                                <p class="font-semibold">Email</p>
                                <p class="text-gray-600">contact@conseil-finance.fr</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">⏰</div>
                            <div>
                                <p class="font-semibold">Horaires</p>
                                <p class="text-gray-600">Lun-Ven: 9h-18h<br>Sur rendez-vous</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Certifications -->
                    <div class="mt-8 p-6 bg-primary/5 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">🏅 Certifications</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>✓ AMF (Autorité des Marchés Financiers)</div>
                            <div>✓ ACPR (Contrôle Prudentiel)</div>
                            <div>✓ CIF (Conseiller en Investissement)</div>
                            <div>✓ CGPI (Conseil Gestion Patrimoine)</div>
                        </div>
                    </div>
                </div>

                <!-- Formulaire Consultation -->
                <div id="consultation">
                    <div class="card-premium p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">
                            Consultation gratuite <span class="trust-badge">🎯</span>
                        </h3>
                        <form class="space-y-6">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                <input type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Votre projet</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Investissement immobilier</option>
                                    <option>Épargne et placement</option>
                                    <option>Assurance vie</option>
                                    <option>Crédit et financement</option>
                                    <option>Optimisation fiscale</option>
                                    <option>Autre projet</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Budget approximatif</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Moins de 50k€</option>
                                    <option>50k€ - 100k€</option>
                                    <option>100k€ - 250k€</option>
                                    <option>250k€ - 500k€</option>
                                    <option>Plus de 500k€</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Décrivez votre projet..."></textarea>
                            </div>
                            <button type="submit" class="w-full gradient-finance text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                Demander ma consultation gratuite
                            </button>
                            <p class="text-xs text-gray-500 text-center">
                                Consultation sans engagement • Réponse sous 24h • Données sécurisées
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold font-serif mb-4">${this.config.businessName}</h3>
                    <p class="text-gray-300">Expert en conseil financier et gestion de patrimoine depuis 15 ans</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Conseil en investissement</li>
                        <li>Gestion de patrimoine</li>
                        <li>Assurance vie</li>
                        <li>Optimisation fiscale</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>15 Avenue des Champs-Élysées</li>
                        <li>75008 Paris</li>
                        <li>01 42 86 15 47</li>
                        <li>contact@conseil-finance.fr</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Légal</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Mentions légales</li>
                        <li>Politique de confidentialité</li>
                        <li>CGV</li>
                        <li>RGPD</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 ${this.config.businessName}. Tous droits réservés. | Membre AMF & ACPR</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Animation des compteurs
        const statsCounters = document.querySelectorAll('.stats-counter');
        const animateCounters = () => {
            statsCounters.forEach(counter => {
                const target = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        const suffix = counter.textContent.replace(/[0-9.]/g, '');
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    }
                };
                updateCounter();
            });
        };

        // Observer pour déclencher l'animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            });
        });

        observer.observe(document.querySelector('.stats-counter'));
    </script>
</body>
</html>`;
  }

  /**
   * Génère les cartes de services
   */
  private generateServiceCards(): string {
    const servicesByType = {
      banque: [
        { title: 'Comptes et cartes', description: 'Solutions bancaires complètes', icon: '💳' },
        { title: 'Crédits immobiliers', description: 'Financement de vos projets', icon: '🏠' },
        { title: 'Épargne et livrets', description: 'Placements sécurisés', icon: '💰' },
        { title: 'Assurances', description: 'Protection personnalisée', icon: '🛡️' },
        { title: 'Banque privée', description: 'Service haut de gamme', icon: '👑' },
        { title: 'Investissements', description: 'Portefeuilles diversifiés', icon: '📈' }
      ],
      conseil: [
        { title: 'Audit patrimonial', description: 'Analyse complète de votre situation', icon: '🔍' },
        { title: 'Stratégie d\'investissement', description: 'Plan personnalisé selon vos objectifs', icon: '🎯' },
        { title: 'Optimisation fiscale', description: 'Réduction légale des impôts', icon: '📊' },
        { title: 'Transmission patrimoine', description: 'Préparation de la succession', icon: '🏛️' },
        { title: 'Retraite', description: 'Préparation et optimisation', icon: '🎭' },
        { title: 'Immobilier', description: 'Conseil en investissement locatif', icon: '🏘️' }
      ],
      assurance: [
        { title: 'Assurance vie', description: 'Épargne et transmission', icon: '🌟' },
        { title: 'Prévoyance', description: 'Protection de votre famille', icon: '👨‍👩‍👧‍👦' },
        { title: 'Santé et mutuelle', description: 'Complémentaire santé optimale', icon: '🏥' },
        { title: 'Habitation', description: 'Protection de votre logement', icon: '🏡' },
        { title: 'Auto et moto', description: 'Assurance véhicules', icon: '🚗' },
        { title: 'Professionnelle', description: 'Protection de votre activité', icon: '💼' }
      ],
      fintech: [
        { title: 'App mobile', description: 'Gestion depuis votre smartphone', icon: '📱' },
        { title: 'Robo-advisor', description: 'IA pour vos investissements', icon: '🤖' },
        { title: 'Payments digitaux', description: 'Solutions de paiement modernes', icon: '💸' },
        { title: 'Blockchain', description: 'Technologie décentralisée', icon: '⛓️' },
        { title: 'API Banking', description: 'Intégration bancaire', icon: '🔗' },
        { title: 'Analytics', description: 'Données financières avancées', icon: '📊' }
      ],
      crypto: [
        { title: 'Trading crypto', description: 'Plateforme d\'échange sécurisée', icon: '₿' },
        { title: 'Wallet sécurisé', description: 'Stockage de cryptomonnaies', icon: '🔐' },
        { title: 'DeFi', description: 'Finance décentralisée', icon: '🌐' },
        { title: 'NFT', description: 'Tokens non fongibles', icon: '🎨' },
        { title: 'Staking', description: 'Revenus passifs crypto', icon: '⚡' },
        { title: 'Conseil crypto', description: 'Expertise en cryptomonnaies', icon: '💎' }
      ]
    };

    const services = servicesByType[this.config.serviceType] || servicesByType.conseil;

    return services.map(service => `
      <div class="card-premium p-6 rounded-xl">
          <div class="text-4xl mb-4">${service.icon}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">${service.title}</h3>
          <p class="text-gray-600 mb-4">${service.description}</p>
          <a href="#consultation" class="text-primary font-semibold hover:text-trust transition-colors">
              En savoir plus →
          </a>
      </div>
    `).join('');
  }

  /**
   * Génère les fonctionnalités de solutions
   */
  private generateSolutionFeatures(): string {
    const features = [
      {
        title: 'Analyse personnalisée',
        description: 'Audit complet de votre situation financière actuelle',
        icon: '🔍'
      },
      {
        title: 'Stratégie sur mesure',
        description: 'Plan d\'action adapté à vos objectifs et votre profil',
        icon: '🎯'
      },
      {
        title: 'Suivi régulier',
        description: 'Accompagnement continu et ajustements si nécessaire',
        icon: '📈'
      },
      {
        title: 'Optimisation fiscale',
        description: 'Réduction légale de votre fiscalité',
        icon: '💰'
      }
    ];

    return features.map(feature => `
      <div class="flex items-start space-x-4">
          <div class="text-3xl">${feature.icon}</div>
          <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">${feature.title}</h3>
              <p class="text-gray-600">${feature.description}</p>
          </div>
      </div>
    `).join('');
  }

  /**
   * Génère les cartes d'expertise
   */
  private generateExpertiseCards(): string {
    const experts = [
      {
        name: 'Marie Dubois',
        role: 'Directrice Conseil',
        certification: 'CIF • CGPI',
        experience: '15 ans',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Jean Martin',
        role: 'Expert Immobilier',
        certification: 'FNAIM • CPI',
        experience: '12 ans',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Sophie Leroux',
        role: 'Spécialiste Fiscalité',
        certification: 'Expert-comptable',
        experience: '10 ans',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    return experts.map(expert => `
      <div class="card-premium p-6 rounded-xl text-center">
          <img src="${expert.image}" alt="${expert.name}" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">${expert.name}</h3>
          <p class="text-primary font-medium mb-1">${expert.role}</p>
          <p class="text-sm text-muted mb-2">${expert.certification}</p>
          <p class="text-xs text-gray-600">${expert.experience} d'expérience</p>
      </div>
    `).join('');
  }

  /**
   * Génère les témoignages
   */
  private generateTestimonials(): string {
    const testimonials = [
      {
        text: 'Excellent conseil, très professionnel. Mes investissements ont progressé de 15% cette année.',
        author: 'Pierre L.',
        role: 'Entrepreneur',
        rating: 5
      },
      {
        text: 'Équipe compétente et à l\'écoute. Optimisation fiscale remarquable.',
        author: 'Marie D.',
        role: 'Cadre supérieur',
        rating: 5
      },
      {
        text: 'Service personnalisé exceptionnel. Je recommande vivement.',
        author: 'Jean-Paul M.',
        role: 'Retraité',
        rating: 5
      }
    ];

    return testimonials.map(testimonial => `
      <div class="card-premium p-6 rounded-xl">
          <div class="flex text-warning mb-4">
              ${'★'.repeat(testimonial.rating)}
          </div>
          <p class="text-gray-600 mb-4 italic">"${testimonial.text}"</p>
          <div>
              <p class="font-semibold text-gray-900">${testimonial.author}</p>
              <p class="text-sm text-muted">${testimonial.role}</p>
          </div>
      </div>
    `).join('');
  }

  /**
   * Utilitaires
   */
  private getServiceTypeLabel(): string {
    const labels = {
      banque: 'Services bancaires',
      conseil: 'Conseil financier',
      assurance: 'Solutions d\'assurance',
      fintech: 'Fintech innovation',
      crypto: 'Cryptomonnaies'
    };

    return labels[this.config.serviceType] || 'Services financiers';
  }
}

export default FinanceTemplate;