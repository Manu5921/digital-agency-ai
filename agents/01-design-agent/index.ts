/**
 * Design Agent - Restaurant Premium Landing Page
 * Spécialisé dans la conversion de designs visuels en prototypes HTML/CSS
 */

export interface RestaurantDesignConfig {
  name: string;
  style: 'premium' | 'casual' | 'modern';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  sections: string[];
  features: string[];
}

export class DesignAgent {
  private config: RestaurantDesignConfig;

  constructor(config: RestaurantDesignConfig) {
    this.config = config;
  }

  /**
   * Analyse les tendances design restaurant 2025
   */
  analyzeDesignTrends(): string[] {
    return [
      'Dark mode sophistiqué avec accents dorés',
      'Typography serif élégante pour les titres',
      'Micro-interactions subtiles',
      'Grids asymétriques pour les menus',
      'Images haute qualité avec overlays',
      'Animations CSS fluides',
      'Design mobile-first responsive'
    ];
  }

  /**
   * Génère la palette de couleurs premium
   */
  generateColorPalette(): Record<string, string> {
    return {
      primary: '#1a1a1a',      // Noir profond
      secondary: '#d4af37',    // Or élégant  
      accent: '#8b4513',       // Brun chaleureux
      background: '#fafafa',   // Blanc cassé
      text: '#2d2d2d',         // Gris foncé
      muted: '#6b7280',        // Gris moyen
      success: '#10b981',      // Vert validation
      danger: '#ef4444'        // Rouge alerte
    };
  }

  /**
   * Structure les sections de la landing page
   */
  defineSections(): string[] {
    return [
      'Hero Section - Image restaurant + CTA réservation',
      'Menu Gastronomique - Grid élégant avec prix',
      'Chef & Histoire - Story telling premium',
      'Galerie Photos - Ambiance et plats signature',
      'Réservation - Formulaire + Google Maps',
      'Avis Clients - Témoignages premium',
      'Footer - Informations + Horaires + Social'
    ];
  }

  /**
   * Génère les design tokens
   */
  generateDesignTokens(): string {
    const colors = this.generateColorPalette();
    
    return `
:root {
  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
  --color-muted: ${colors.muted};
  
  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-accent: 'Dancing Script', cursive;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Animations */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
`;
  }

  /**
   * Crée le prototype HTML complet
   */
  generateHTMLPrototype(): string {
    return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Gourmet - Restaurant Gastronomique</title>
    <meta name="description" content="Restaurant gastronomique premium au cSur de la ville. Cuisine raffinée par le Chef étoilé. Réservation en ligne.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1a1a1a',
                        secondary: '#d4af37',
                        accent: '#8b4513',
                        background: '#fafafa',
                    },
                    fontFamily: {
                        'heading': ['Playfair Display', 'serif'],
                        'body': ['Inter', 'sans-serif'],
                        'accent': ['Dancing Script', 'cursive'],
                    }
                }
            }
        }
    </script>
    
    <!-- Custom Styles -->
    <style>
        .hero-gradient {
            background: linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(139,69,19,0.8) 100%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #d4af37 0%, #8b4513 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .menu-item {
            border-bottom: 1px dotted #d4af37;
        }
        
        .animate-fade-in {
            animation: fadeIn 0.8s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .parallax {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    </style>
</head>
<body class="font-body text-gray-800 bg-background">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-2xl font-heading font-bold text-primary">
                        Le <span class="text-gradient">Gourmet</span>
                    </h1>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="#accueil" class="text-gray-700 hover:text-secondary transition-colors">Accueil</a>
                        <a href="#menu" class="text-gray-700 hover:text-secondary transition-colors">Menu</a>
                        <a href="#chef" class="text-gray-700 hover:text-secondary transition-colors">Chef</a>
                        <a href="#galerie" class="text-gray-700 hover:text-secondary transition-colors">Galerie</a>
                        <a href="#contact" class="text-gray-700 hover:text-secondary transition-colors">Contact</a>
                        <a href="#reservation" class="bg-secondary text-white px-6 py-2 rounded-full hover:bg-accent transition-colors">
                            Réserver
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="accueil" class="relative h-screen flex items-center justify-center parallax" style="background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');">
        <div class="absolute inset-0 hero-gradient"></div>
        <div class="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
            <h1 class="text-5xl md:text-7xl font-heading font-bold mb-6">
                Une Expérience
                <span class="block text-gradient">Gastronomique</span>
                Inoubliable
            </h1>
            <p class="text-xl md:text-2xl mb-8 font-light">
                Découvrez l'art culinaire français dans un cadre d'exception
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#reservation" class="bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent transition-all transform hover:scale-105">
                    Réserver une Table
                </a>
                <a href="#menu" class="border border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition-all">
                    Découvrir le Menu
                </a>
            </div>
        </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                    Notre <span class="text-gradient">Menu</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Une sélection raffinée de plats créés avec passion par notre Chef étoilé
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Entrées -->
                <div class="card-hover bg-gray-50 p-8 rounded-2xl">
                    <h3 class="text-2xl font-heading font-bold text-primary mb-6 text-center">Entrées</h3>
                    <div class="space-y-6">
                        <div class="menu-item pb-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-lg">Foie Gras Poêlé</h4>
                                    <p class="text-gray-600">Compotée de figues, pain d'épices</p>
                                </div>
                                <span class="text-secondary font-bold text-lg">28¬</span>
                            </div>
                        </div>
                        <div class="menu-item pb-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-lg">Saint-Jacques Snackées</h4>
                                    <p class="text-gray-600">Purée de topinambour, truffe noire</p>
                                </div>
                                <span class="text-secondary font-bold text-lg">32¬</span>
                            </div>
                        </div>
                        <div class="menu-item pb-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-lg">Tartare de Thon Rouge</h4>
                                    <p class="text-gray-600">Avocat, mangue, sauce ponzu</p>
                                </div>
                                <span class="text-secondary font-bold text-lg">26¬</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Plats -->
                <div class="card-hover bg-gray-50 p-8 rounded-2xl">
                    <h3 class="text-2xl font-heading font-bold text-primary mb-6 text-center">Plats</h3>
                    <div class="space-y-6">
                        <div class="menu-item pb-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-lg">BSuf de Wagyu</h4>
                                    <p class="text-gray-600">Légumes glacés, jus de viande</p>
                                </div>
                                <span class="text-secondary font-bold text-lg">65¬</span>
                            </div>
                        </div>
                        <div class="menu-item pb-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-lg">Homard Thermidor</h4>
                                    <p class="text-gray-600">Risotto crémeux, caviar Ossetra</p>
                                </div>
                                <span class="text-secondary font-bold text-lg">48¬</span>
                            </div>
                        </div>
                        <div class="menu-item pb-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-lg">Pigeon Rôti</h4>
                                    <p class="text-gray-600">Purée de marrons, sauce aux cerises</p>
                                </div>
                                <span class="text-secondary font-bold text-lg">42¬</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Chef Section -->
    <section id="chef" class="py-20 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Chef Portrait" 
                         class="rounded-2xl shadow-2xl">
                </div>
                <div>
                    <h2 class="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Chef <span class="text-gradient">Antoine Dubois</span>
                    </h2>
                    <p class="text-xl mb-6 leading-relaxed">
                        Formé dans les plus grands restaurants étoilés de France, le Chef Antoine Dubois 
                        apporte sa vision moderne de la gastronomie française traditionnelle.
                    </p>
                    <p class="text-lg mb-8 text-gray-300 leading-relaxed">
                        Récompensé par une étoile Michelin en 2020, il privilégie les produits locaux 
                        et de saison pour créer des plats d'exception qui racontent une histoire.
                    </p>
                    <div class="flex items-center space-x-4">
                        <div class="text-secondary text-2xl">P</div>
                        <span class="text-lg font-semibold">Étoile Michelin 2020-2024</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Galerie Section -->
    <section id="galerie" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                    Notre <span class="text-gradient">Univers</span>
                </h2>
                <p class="text-xl text-gray-600">Découvrez l'ambiance unique de notre restaurant</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="card-hover">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                         alt="Salle restaurant" class="rounded-lg shadow-lg">
                </div>
                <div class="card-hover">
                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                         alt="Plat signature" class="rounded-lg shadow-lg">
                </div>
                <div class="card-hover">
                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                         alt="Cuisine" class="rounded-lg shadow-lg">
                </div>
                <div class="card-hover">
                    <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                         alt="Dessert" class="rounded-lg shadow-lg">
                </div>
            </div>
        </div>
    </section>

    <!-- Contact & Réservation -->
    <section id="contact" class="py-20 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                    Nous <span class="text-gradient">Contacter</span>
                </h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Informations -->
                <div>
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-heading font-bold text-primary mb-6">Informations</h3>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <div class="text-secondary text-xl mr-4">=Í</div>
                                <div>
                                    <p class="font-semibold">Adresse</p>
                                    <p class="text-gray-600">15 Rue de la Gastronomie, 75001 Paris</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-secondary text-xl mr-4">=Þ</div>
                                <div>
                                    <p class="font-semibold">Téléphone</p>
                                    <p class="text-gray-600">01 42 60 15 78</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-secondary text-xl mr-4">	</div>
                                <div>
                                    <p class="font-semibold">Email</p>
                                    <p class="text-gray-600">contact@legourmet-paris.fr</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="text-secondary text-xl mr-4">=R</div>
                                <div>
                                    <p class="font-semibold">Horaires</p>
                                    <p class="text-gray-600">Mar-Sam: 19h00-23h00</p>
                                    <p class="text-gray-600">Dimanche & Lundi: Fermé</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Formulaire de réservation -->
                <div id="reservation">
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-heading font-bold text-primary mb-6">Réservation</h3>
                        <form class="space-y-6">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                <input type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <input type="date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Personnes</label>
                                    <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent">
                                        <option>2 personnes</option>
                                        <option>3 personnes</option>
                                        <option>4 personnes</option>
                                        <option>5 personnes</option>
                                        <option>6+ personnes</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Message (optionnel)</label>
                                <textarea rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent" placeholder="Allergies, occasion spéciale..."></textarea>
                            </div>
                            <button type="submit" class="w-full bg-secondary text-white py-4 px-6 rounded-lg font-semibold hover:bg-accent transition-colors transform hover:scale-105">
                                Confirmer la Réservation
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-2xl font-heading font-bold mb-4">
                        Le <span class="text-gradient">Gourmet</span>
                    </h3>
                    <p class="text-gray-300">
                        Restaurant gastronomique étoilé au cSur de Paris
                    </p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Navigation</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="#accueil" class="hover:text-secondary transition-colors">Accueil</a></li>
                        <li><a href="#menu" class="hover:text-secondary transition-colors">Menu</a></li>
                        <li><a href="#chef" class="hover:text-secondary transition-colors">Chef</a></li>
                        <li><a href="#galerie" class="hover:text-secondary transition-colors">Galerie</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li>15 Rue de la Gastronomie</li>
                        <li>75001 Paris</li>
                        <li>01 42 60 15 78</li>
                        <li>contact@legourmet-paris.fr</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Suivez-nous</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-300 hover:text-secondary transition-colors">Facebook</a>
                        <a href="#" class="text-gray-300 hover:text-secondary transition-colors">Instagram</a>
                        <a href="#" class="text-gray-300 hover:text-secondary transition-colors">Twitter</a>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 Le Gourmet. Tous droits réservés. | Réalisé par Digital Agency AI</p>
            </div>
        </div>
    </footer>

    <!-- Smooth Scroll Script -->
    <script>
        // Smooth scroll pour les liens de navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec la classe card-hover
        document.querySelectorAll('.card-hover').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>`;
  }
}

// Configuration par défaut pour restaurant premium
const restaurantConfig: RestaurantDesignConfig = {
  name: 'Le Gourmet',
  style: 'premium',
  colors: {
    primary: '#1a1a1a',
    secondary: '#d4af37',
    accent: '#8b4513',
    background: '#fafafa',
    text: '#2d2d2d'
  },
  sections: [
    'hero',
    'menu',
    'chef',
    'galerie',
    'contact',
    'footer'
  ],
  features: [
    'responsive',
    'animations',
    'seo-optimized',
    'performance'
  ]
};

export default new DesignAgent(restaurantConfig);