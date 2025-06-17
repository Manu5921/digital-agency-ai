/**
 * Template Secteur Immobilier - Phase 2 Design Agent
 * Templates pour agences immobilières, promoteurs, agents indépendants
 */

export interface ImmobilierTemplateConfig {
  agencyName: string;
  serviceType: 'vente' | 'location' | 'gestion' | 'promotion' | 'mixte';
  style: 'classique' | 'moderne' | 'minimaliste';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    luxury: string;
    trust: string;
  };
  features: string[];
}

export class ImmobilierTemplate {
  private config: ImmobilierTemplateConfig;

  constructor(config: ImmobilierTemplateConfig) {
    this.config = config;
  }

  /**
   * Génère la palette couleurs immobilier selon le style
   */
  generateRealEstateColorPalette(): Record<string, string> {
    const palettes = {
      classique: {
        primary: '#1e40af',     // Bleu professionnel
        secondary: '#059669',   // Vert confiance
        accent: '#d97706',      // Orange premium
        luxury: '#7c2d12',      // Marron luxe
        trust: '#1e3a8a',       // Bleu trust
        background: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        gold: '#fbbf24'
      },
      moderne: {
        primary: '#3b82f6',     // Bleu moderne
        secondary: '#06b6d4',   // Cyan contemporain
        accent: '#8b5cf6',      // Violet innovation
        luxury: '#ec4899',      // Rose premium
        trust: '#1d4ed8',       // Bleu digital
        background: '#fafafa',
        text: '#111827',
        muted: '#64748b',
        success: '#22c55e',
        warning: '#eab308',
        danger: '#f87171',
        gold: '#f59e0b'
      },
      minimaliste: {
        primary: '#374151',     // Gris sophistiqué
        secondary: '#059669',   // Vert simple
        accent: '#6b7280',      // Gris accent
        luxury: '#4b5563',      // Gris luxe
        trust: '#111827',       // Noir élégant
        background: '#ffffff',
        text: '#1f2937',
        muted: '#9ca3af',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        gold: '#d97706'
      }
    };

    return palettes[this.config.style];
  }

  /**
   * Génère le HTML du template immobilier
   */
  generateHTMLTemplate(): string {
    const colors = this.generateRealEstateColorPalette();
    
    return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.agencyName} - Agence Immobilière</title>
    <meta name="description" content="${this.config.agencyName} - Votre expert immobilier. ${this.getServiceTypeDescription()}. Accompagnement personnalisé et professionnel.">
    
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
        .gradient-realestate {
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        }
        
        .gradient-luxury {
            background: linear-gradient(135deg, ${colors.luxury}, ${colors.gold});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .property-card {
            background: white;
            border: 1px solid #e5e7eb;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .property-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            border-color: ${colors.primary};
        }
        
        .property-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: ${colors.gradient || `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`};
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .property-card:hover::before {
            transform: scaleX(1);
        }
        
        .price-tag {
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
        }
        
        .luxury-badge {
            background: linear-gradient(45deg, ${colors.luxury}, ${colors.gold});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .virtual-tour {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .virtual-tour:hover {
            background: rgba(255, 255, 255, 1);
            transform: scale(1.1);
        }
    </style>
</head>
<body class="font-sans bg-gray-50">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold font-serif text-primary">
                        ${this.config.agencyName}
                    </h1>
                    <p class="text-xs text-muted uppercase tracking-wide">${this.getServiceTypeLabel()}</p>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#accueil" class="text-gray-700 hover:text-primary transition-colors font-medium">Accueil</a>
                    <a href="#biens" class="text-gray-700 hover:text-primary transition-colors font-medium">Nos biens</a>
                    <a href="#services" class="text-gray-700 hover:text-primary transition-colors font-medium">Services</a>
                    <a href="#equipe" class="text-gray-700 hover:text-primary transition-colors font-medium">Équipe</a>
                    <a href="#contact" class="text-gray-700 hover:text-primary transition-colors font-medium">Contact</a>
                    <a href="#estimation" class="gradient-realestate text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold">
                        Estimation gratuite
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="accueil" class="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
                <div>
                    <div class="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <span class="text-primary font-semibold text-sm">🏆 N°1 Immobilier Local</span>
                    </div>
                    
                    <h1 class="text-4xl md:text-6xl font-bold font-serif text-gray-900 mb-6 leading-tight">
                        Trouvez votre
                        <span class="gradient-luxury block">bien idéal</span>
                    </h1>
                    
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                        ${this.getServiceTypeDescription()} Expertise locale, accompagnement personnalisé 
                        et plus de 15 ans d'expérience dans l'immobilier.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 mb-12">
                        <a href="#biens" class="gradient-realestate text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center">
                            Découvrir nos biens
                        </a>
                        <a href="#estimation" class="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center">
                            Estimation gratuite
                        </a>
                    </div>
                    
                    <!-- Stats immobilières -->
                    <div class="grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary">500+</div>
                            <div class="text-sm text-muted">Biens vendus</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary">98%</div>
                            <div class="text-sm text-muted">Clients satisfaits</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary">45j</div>
                            <div class="text-sm text-muted">Délai moyen vente</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Propriété immobilière" 
                         class="rounded-2xl shadow-2xl">
                    
                    <!-- Badge prix -->
                    <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-primary">€450k</div>
                            <div class="text-sm text-muted">Prix moyen</div>
                            <div class="text-xs text-success">↗ +5% cette année</div>
                        </div>
                    </div>
                    
                    <!-- Badge visite virtuelle -->
                    <div class="virtual-tour">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <span class="text-white text-sm">🥽</span>
                            </div>
                            <div>
                                <div class="font-semibold text-xs">Visite 360°</div>
                                <div class="text-xs text-muted">Disponible</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Recherche rapide -->
    <section class="py-16 bg-white -mt-10 relative z-10">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-6">Recherche rapide</h3>
                <form class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Appartement</option>
                            <option>Maison</option>
                            <option>Terrain</option>
                            <option>Local commercial</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                        <input type="text" placeholder="Paris, Lyon..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Budget max</label>
                        <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>200k€</option>
                            <option>400k€</option>
                            <option>600k€</option>
                            <option>800k€+</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <button type="submit" class="w-full gradient-realestate text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                            Rechercher
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Biens en vedette -->
    <section id="biens" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
                    Biens <span class="gradient-luxury">d'Exception</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Découvrez notre sélection de propriétés premium
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generatePropertyCards()}
            </div>
        </div>
    </section>

    <!-- Services -->
    <section id="services" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
                    Nos <span class="gradient-luxury">Services</span>
                </h2>
                <p class="text-xl text-gray-600">Accompagnement complet pour tous vos projets immobiliers</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateServiceCards()}
            </div>
        </div>
    </section>

    <!-- Équipe -->
    <section id="equipe" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
                    Notre <span class="gradient-luxury">Équipe</span>
                </h2>
                <p class="text-xl text-gray-600">Experts immobiliers à votre service</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${this.generateTeamCards()}
            </div>
        </div>
    </section>

    <!-- Témoignages -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">
                    Témoignages <span class="gradient-luxury">Clients</span>
                </h2>
                <p class="text-xl text-gray-600">Ils nous ont fait confiance pour leur projet immobilier</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateTestimonials()}
            </div>
        </div>
    </section>

    <!-- Contact & Estimation -->
    <section id="contact" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Informations -->
                <div>
                    <h3 class="text-2xl font-bold font-serif text-gray-900 mb-6">Nous contacter</h3>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📍</div>
                            <div>
                                <p class="font-semibold">Adresse</p>
                                <p class="text-gray-600">15 Avenue Victor Hugo<br>75016 Paris</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📞</div>
                            <div>
                                <p class="font-semibold">Téléphone</p>
                                <p class="text-gray-600">01 42 75 83 92</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📧</div>
                            <div>
                                <p class="font-semibold">Email</p>
                                <p class="text-gray-600">contact@agence-immobilier.fr</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">⏰</div>
                            <div>
                                <p class="font-semibold">Horaires</p>
                                <p class="text-gray-600">Lun-Sam: 9h-19h<br>Dimanche sur RDV</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Certifications -->
                    <div class="mt-8 p-6 bg-primary/5 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">🏅 Certifications</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>✓ Carte professionnelle CCIAA</div>
                            <div>✓ Garantie financière CEGC</div>
                            <div>✓ Assurance RC professionnelle</div>
                            <div>✓ Membre FNAIM</div>
                        </div>
                    </div>
                </div>

                <!-- Formulaire Estimation -->
                <div id="estimation">
                    <div class="property-card p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold font-serif text-gray-900 mb-6">
                            Estimation gratuite <span class="luxury-badge">💎</span>
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
                                <label class="block text-sm font-medium text-gray-700 mb-2">Type de bien</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Appartement</option>
                                    <option>Maison</option>
                                    <option>Terrain</option>
                                    <option>Local commercial</option>
                                    <option>Immeuble</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Surface (m²)</label>
                                    <input type="number" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Pièces</label>
                                    <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option>1-2 pièces</option>
                                        <option>3-4 pièces</option>
                                        <option>5+ pièces</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Adresse du bien</label>
                                <input type="text" placeholder="Rue, ville, code postal" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            </div>
                            <button type="submit" class="w-full gradient-realestate text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                Obtenir mon estimation gratuite
                            </button>
                            <p class="text-xs text-gray-500 text-center">
                                Estimation sous 24h • Sans engagement • Données confidentielles
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
                    <h3 class="text-xl font-bold font-serif mb-4">${this.config.agencyName}</h3>
                    <p class="text-gray-300">Votre expert immobilier de confiance depuis 15 ans</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Vente immobilière</li>
                        <li>Location</li>
                        <li>Gestion locative</li>
                        <li>Estimation gratuite</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>15 Avenue Victor Hugo</li>
                        <li>75016 Paris</li>
                        <li>01 42 75 83 92</li>
                        <li>contact@agence-immobilier.fr</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Légal</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Mentions légales</li>
                        <li>CGV</li>
                        <li>Politique de confidentialité</li>
                        <li>RGPD</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 ${this.config.agencyName}. Tous droits réservés. | Carte professionnelle n°${Math.random().toString().slice(2, 12)}</p>
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

        // Animation d'apparition des cartes
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observer toutes les cartes de propriétés
        document.querySelectorAll('.property-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    </script>
</body>
</html>`;
  }

  /**
   * Génère les cartes de propriétés
   */
  private generatePropertyCards(): string {
    const properties = [
      {
        title: 'Appartement Haussmannien',
        location: 'Paris 16ème',
        price: '850 000',
        type: 'Vente',
        surface: '95',
        rooms: '4',
        floor: '3ème',
        features: ['Balcon', 'Cave', 'Gardien'],
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        badge: 'Exclusivité'
      },
      {
        title: 'Villa Contemporaine',
        location: 'Neuilly-sur-Seine',
        price: '1 250 000',
        type: 'Vente',
        surface: '180',
        rooms: '6',
        floor: 'RDC',
        features: ['Jardin', 'Piscine', 'Garage'],
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        badge: 'Coup de cœur'
      },
      {
        title: 'Loft Design',
        location: 'Paris 11ème',
        price: '2 200',
        type: 'Location',
        surface: '75',
        rooms: '2',
        floor: '1er',
        features: ['Terrasse', 'Parking', 'Meublé'],
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        badge: 'Nouveau'
      },
      {
        title: 'Maison Familiale',
        location: 'Boulogne-Billancourt',
        price: '980 000',
        type: 'Vente',
        surface: '140',
        rooms: '5',
        floor: 'R+1',
        features: ['Jardin', 'Garage', 'Combles'],
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        badge: 'Prix révisé'
      },
      {
        title: 'Studio Moderne',
        location: 'Paris 5ème',
        price: '1 450',
        type: 'Location',
        surface: '28',
        rooms: '1',
        floor: '4ème',
        features: ['Meublé', 'Ascenseur', 'Calme'],
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        badge: 'Disponible'
      },
      {
        title: 'Penthouse Luxe',
        location: 'Paris 8ème',
        price: '2 800 000',
        type: 'Vente',
        surface: '220',
        rooms: '7',
        floor: 'Dernier',
        features: ['Terrasse 50m²', 'Concierge', 'Cave'],
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        badge: 'Prestige'
      }
    ];

    return properties.map(property => `
      <div class="property-card rounded-xl overflow-hidden">
          <div class="relative">
              <img src="${property.image}" alt="${property.title}" class="w-full h-64 object-cover">
              <div class="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ${property.badge}
              </div>
              <div class="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold">
                  ${property.type}
              </div>
              <div class="virtual-tour">
                  <span class="text-xs">🥽 Visite 360°</span>
              </div>
          </div>
          <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">${property.title}</h3>
              <p class="text-primary font-medium mb-3">📍 ${property.location}</p>
              
              <div class="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                  <div class="text-center">
                      <div class="font-semibold">${property.surface}m²</div>
                      <div class="text-xs">Surface</div>
                  </div>
                  <div class="text-center">
                      <div class="font-semibold">${property.rooms}</div>
                      <div class="text-xs">Pièces</div>
                  </div>
                  <div class="text-center">
                      <div class="font-semibold">${property.floor}</div>
                      <div class="text-xs">Étage</div>
                  </div>
              </div>
              
              <div class="flex flex-wrap gap-2 mb-4">
                  ${property.features.map(feature => `
                      <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">${feature}</span>
                  `).join('')}
              </div>
              
              <div class="flex items-center justify-between">
                  <div class="price-tag">
                      ${property.price}${property.type === 'Location' ? '€/mois' : '€'}
                  </div>
                  <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-trust transition-colors text-sm">
                      Détails
                  </button>
              </div>
          </div>
      </div>
    `).join('');
  }

  /**
   * Génère les cartes de services
   */
  private generateServiceCards(): string {
    const servicesByType = {
      vente: [
        { title: 'Estimation gratuite', description: 'Évaluation précise de votre bien', icon: '📊' },
        { title: 'Marketing immobilier', description: 'Promotion optimale de votre propriété', icon: '📱' },
        { title: 'Négociation', description: 'Accompagnement jusqu\'à la signature', icon: '🤝' },
        { title: 'Suivi juridique', description: 'Sécurisation de la transaction', icon: '⚖️' },
        { title: 'Home staging', description: 'Valorisation de votre bien', icon: '🏡' },
        { title: 'Visites virtuelles', description: 'Technologie 360° immersive', icon: '🥽' }
      ],
      location: [
        { title: 'Recherche locataire', description: 'Sélection rigoureuse des candidats', icon: '🔍' },
        { title: 'État des lieux', description: 'Expertise complète d\'entrée/sortie', icon: '📋' },
        { title: 'Rédaction bail', description: 'Contrats conformes et sécurisés', icon: '📄' },
        { title: 'Gestion locative', description: 'Administration complète', icon: '🏢' },
        { title: 'Assurance loyers', description: 'Protection contre impayés', icon: '🛡️' },
        { title: 'Maintenance', description: 'Suivi des réparations', icon: '🔧' }
      ],
      gestion: [
        { title: 'Gestion administrative', description: 'Toutes les démarches', icon: '📁' },
        { title: 'Comptabilité', description: 'Suivi financier détaillé', icon: '💰' },
        { title: 'Charges copropriété', description: 'Optimisation des coûts', icon: '🏘️' },
        { title: 'Travaux', description: 'Supervision et devis', icon: '🔨' },
        { title: 'Assurances', description: 'Couverture optimale', icon: '☂️' },
        { title: 'Déclarations fiscales', description: 'Optimisation fiscale', icon: '📊' }
      ],
      mixte: [
        { title: 'Expertise complète', description: 'Tous types de transactions', icon: '🎯' },
        { title: 'Conseil patrimonial', description: 'Stratégie d\'investissement', icon: '💡' },
        { title: 'Financement', description: 'Partenaires bancaires', icon: '🏦' },
        { title: 'Défiscalisation', description: 'Optimisation fiscale', icon: '📈' },
        { title: 'Syndic copropriété', description: 'Gestion d\'immeubles', icon: '🏬' },
        { title: 'Commercial', description: 'Locaux professionnels', icon: '🏪' }
      ]
    };

    const services = servicesByType[this.config.serviceType] || servicesByType.mixte;

    return services.map(service => `
      <div class="property-card p-6 rounded-xl">
          <div class="text-4xl mb-4">${service.icon}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">${service.title}</h3>
          <p class="text-gray-600 mb-4">${service.description}</p>
          <a href="#contact" class="text-primary font-semibold hover:text-trust transition-colors">
              En savoir plus →
          </a>
      </div>
    `).join('');
  }

  /**
   * Génère les cartes d'équipe
   */
  private generateTeamCards(): string {
    const team = [
      {
        name: 'Marie Dupont',
        role: 'Directrice Agence',
        speciality: 'Immobilier de prestige',
        experience: '15 ans',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Pierre Martin',
        role: 'Négociateur Senior',
        speciality: 'Vente résidentielle',
        experience: '10 ans',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Sophie Leroux',
        role: 'Gestionnaire Locatif',
        speciality: 'Gestion de patrimoine',
        experience: '8 ans',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Thomas Bernard',
        role: 'Commercial',
        speciality: 'Primo-accédants',
        experience: '5 ans',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    return team.map(member => `
      <div class="property-card p-6 rounded-xl text-center">
          <img src="${member.image}" alt="${member.name}" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">${member.name}</h3>
          <p class="text-primary font-medium mb-1">${member.role}</p>
          <p class="text-sm text-gray-600 mb-2">${member.speciality}</p>
          <p class="text-xs text-muted">${member.experience} d'expérience</p>
      </div>
    `).join('');
  }

  /**
   * Génère les témoignages
   */
  private generateTestimonials(): string {
    const testimonials = [
      {
        text: 'Excellent accompagnement, vente réalisée en 3 semaines au prix demandé !',
        author: 'Jean-Pierre M.',
        transaction: 'Vente appartement',
        rating: 5
      },
      {
        text: 'Équipe professionnelle et réactive. Je recommande vivement.',
        author: 'Claire L.',
        transaction: 'Achat maison',
        rating: 5
      },
      {
        text: 'Gestion locative impeccable, aucun souci en 3 ans.',
        author: 'Michel D.',
        transaction: 'Gestion locative',
        rating: 5
      }
    ];

    return testimonials.map(testimonial => `
      <div class="property-card p-6 rounded-xl">
          <div class="flex text-warning mb-4">
              ${'★'.repeat(testimonial.rating)}
          </div>
          <p class="text-gray-600 mb-4 italic">"${testimonial.text}"</p>
          <div>
              <p class="font-semibold text-gray-900">${testimonial.author}</p>
              <p class="text-sm text-primary">${testimonial.transaction}</p>
          </div>
      </div>
    `).join('');
  }

  /**
   * Utilitaires
   */
  private getServiceTypeLabel(): string {
    const labels = {
      vente: 'Vente immobilière',
      location: 'Location & gestion',
      gestion: 'Gestion locative',
      promotion: 'Promotion immobilière',
      mixte: 'Services complets'
    };

    return labels[this.config.serviceType] || 'Immobilier';
  }

  private getServiceTypeDescription(): string {
    const descriptions = {
      vente: 'Spécialistes de la vente immobilière.',
      location: 'Experts en location et gestion locative.',
      gestion: 'Gestionnaires de patrimoine immobilier.',
      promotion: 'Promoteurs immobiliers innovants.',
      mixte: 'Tous services immobiliers.'
    };

    return descriptions[this.config.serviceType] || 'Services immobiliers complets.';
  }
}

export default ImmobilierTemplate;