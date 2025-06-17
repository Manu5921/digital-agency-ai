/**
 * Template Secteur E-Learning - Phase 2 Design Agent
 * Templates pour plateformes éducatives, formations en ligne, MOOCs
 */

export interface ELearningTemplateConfig {
  platformName: string;
  targetAudience: 'students' | 'professionals' | 'all' | 'children';
  style: 'classique' | 'moderne' | 'minimaliste';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    learning: string;
  };
  features: string[];
}

export class ELearningTemplate {
  private config: ELearningTemplateConfig;

  constructor(config: ELearningTemplateConfig) {
    this.config = config;
  }

  /**
   * Génère la palette couleurs e-learning selon le style
   */
  generateELearningColorPalette(): Record<string, string> {
    const palettes = {
      classique: {
        primary: '#3b82f6',     // Bleu éducation
        secondary: '#10b981',   // Vert apprentissage
        accent: '#f59e0b',      // Orange motivation
        success: '#22c55e',     // Vert succès
        learning: '#8b5cf6',    // Violet créativité
        background: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#06b6d4'
      },
      moderne: {
        primary: '#6366f1',     // Indigo moderne
        secondary: '#ec4899',   // Rose créatif
        accent: '#14b8a6',      // Teal innovation
        success: '#10b981',     // Vert réussite
        learning: '#8b5cf6',    // Violet apprentissage
        background: '#fafafa',
        text: '#111827',
        muted: '#64748b',
        warning: '#f59e0b',
        danger: '#f87171',
        info: '#0ea5e9'
      },
      minimaliste: {
        primary: '#374151',     // Gris focus
        secondary: '#059669',   // Vert simple
        accent: '#6b7280',      // Gris accent
        success: '#10b981',     // Vert validation
        learning: '#8b5cf6',    // Violet insight
        background: '#ffffff',
        text: '#1f2937',
        muted: '#9ca3af',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#06b6d4'
      }
    };

    return palettes[this.config.style];
  }

  /**
   * Génère le HTML du template e-learning
   */
  generateHTMLTemplate(): string {
    const colors = this.generateELearningColorPalette();
    
    return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.platformName} - Plateforme E-Learning</title>
    <meta name="description" content="${this.config.platformName} - Apprenez à votre rythme avec nos formations en ligne. Cours interactifs, certificats reconnus.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: ${JSON.stringify(colors)},
                    fontFamily: {
                        'sans': ['Inter', 'sans-serif'],
                        'display': ['Space Grotesk', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        .gradient-learning {
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.learning} 100%);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .course-card {
            background: white;
            border: 1px solid #e5e7eb;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .course-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            border-color: ${colors.primary};
        }
        
        .course-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .course-card:hover::before {
            transform: scaleX(1);
        }
        
        .progress-bar {
            background: linear-gradient(90deg, ${colors.success}, ${colors.secondary});
        }
        
        .learning-path {
            background: linear-gradient(45deg, ${colors.learning}20, ${colors.primary}20);
        }
        
        .stats-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 1px solid #e2e8f0;
        }
    </style>
</head>
<body class="font-sans bg-gray-50">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold font-display text-primary">
                        ${this.config.platformName}
                    </h1>
                    <p class="text-xs text-muted">E-Learning Platform</p>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#accueil" class="text-gray-700 hover:text-primary transition-colors font-medium">Accueil</a>
                    <a href="#cours" class="text-gray-700 hover:text-primary transition-colors font-medium">Cours</a>
                    <a href="#parcours" class="text-gray-700 hover:text-primary transition-colors font-medium">Parcours</a>
                    <a href="#instructeurs" class="text-gray-700 hover:text-primary transition-colors font-medium">Instructeurs</a>
                    <a href="#contact" class="text-gray-700 hover:text-primary transition-colors font-medium">Contact</a>
                    <a href="#inscription" class="gradient-learning text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold">
                        Commencer gratuitement
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
                        <span class="text-primary font-semibold text-sm">🎓 ${this.getAudienceLabel()} certifiés</span>
                    </div>
                    
                    <h1 class="text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6 leading-tight">
                        Apprenez
                        <span class="gradient-text block">à votre rythme</span>
                    </h1>
                    
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                        Découvrez notre plateforme d'apprentissage interactive avec plus de 1000 cours, 
                        des projets pratiques et un accompagnement personnalisé.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 mb-12">
                        <a href="#inscription" class="gradient-learning text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center">
                            Commencer maintenant
                        </a>
                        <a href="#cours" class="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center">
                            Explorer les cours
                        </a>
                    </div>
                    
                    <!-- Stats d'apprentissage -->
                    <div class="grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary">50k+</div>
                            <div class="text-sm text-muted">Étudiants actifs</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary">1000+</div>
                            <div class="text-sm text-muted">Cours disponibles</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary">95%</div>
                            <div class="text-sm text-muted">Taux de réussite</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Étudiant apprenant en ligne" 
                         class="rounded-2xl shadow-2xl">
                    
                    <!-- Badge certification -->
                    <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                        <div class="text-center">
                            <div class="text-2xl">🏆</div>
                            <div class="text-sm font-semibold">Certifications</div>
                            <div class="text-xs text-muted">reconnues</div>
                        </div>
                    </div>
                    
                    <!-- Badge progression -->
                    <div class="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 relative">
                                <svg class="w-12 h-12 transform -rotate-90">
                                    <circle cx="24" cy="24" r="20" stroke="#e5e7eb" stroke-width="4" fill="transparent"/>
                                    <circle cx="24" cy="24" r="20" stroke="${colors.success}" stroke-width="4" fill="transparent" 
                                            stroke-dasharray="125.6" stroke-dashoffset="31.4"/>
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold">75%</div>
                            </div>
                            <div>
                                <div class="font-semibold text-xs">Progression</div>
                                <div class="text-xs text-muted">En cours</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Cours populaires -->
    <section id="cours" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                    Cours <span class="gradient-text">Populaires</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Découvrez les formations les plus demandées par notre communauté
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateCourseCards()}
            </div>
        </div>
    </section>

    <!-- Parcours d'apprentissage -->
    <section id="parcours" class="py-20 learning-path">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                    Parcours <span class="gradient-text">Guidés</span>
                </h2>
                <p class="text-xl text-gray-600">Progressez étape par étape vers vos objectifs</p>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div class="space-y-8">
                        ${this.generateLearningPathFeatures()}
                    </div>
                </div>
                
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Parcours d'apprentissage" 
                         class="rounded-2xl shadow-2xl">
                </div>
            </div>
        </div>
    </section>

    <!-- Instructeurs -->
    <section id="instructeurs" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                    Nos <span class="gradient-text">Instructeurs</span>
                </h2>
                <p class="text-xl text-gray-600">Experts reconnus dans leur domaine</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${this.generateInstructorCards()}
            </div>
        </div>
    </section>

    <!-- Témoignages -->
    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                    Témoignages <span class="gradient-text">Étudiants</span>
                </h2>
                <p class="text-xl text-gray-600">Ils ont transformé leur carrière grâce à nos formations</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateTestimonials()}
            </div>
        </div>
    </section>

    <!-- Inscription -->
    <section id="inscription" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Avantages -->
                <div>
                    <h3 class="text-2xl font-bold font-display text-gray-900 mb-6">Pourquoi nous choisir ?</h3>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">🎯</div>
                            <div>
                                <p class="font-semibold">Apprentissage personnalisé</p>
                                <p class="text-gray-600">IA qui s'adapte à votre rythme et style d'apprentissage</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">🏆</div>
                            <div>
                                <p class="font-semibold">Certificats reconnus</p>
                                <p class="text-gray-600">Validés par l'industrie et les employeurs</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">👥</div>
                            <div>
                                <p class="font-semibold">Communauté active</p>
                                <p class="text-gray-600">Entraide et networking avec 50k+ étudiants</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📱</div>
                            <div>
                                <p class="font-semibold">Accessible partout</p>
                                <p class="text-gray-600">Application mobile et contenu offline</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Prix -->
                    <div class="mt-8 p-6 bg-primary/5 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">💰 Tarifs transparents</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>✓ Essai gratuit 7 jours</div>
                            <div>✓ Annulation à tout moment</div>
                            <div>✓ Accès vie entière aux cours achetés</div>
                            <div>✓ Garantie satisfait ou remboursé</div>
                        </div>
                    </div>
                </div>

                <!-- Formulaire d'inscription -->
                <div>
                    <div class="course-card p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold font-display text-gray-900 mb-6">
                            Commencez gratuitement 🚀
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
                                <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                                <input type="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Domaine d'intérêt</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Développement web</option>
                                    <option>Data Science</option>
                                    <option>Design UX/UI</option>
                                    <option>Marketing digital</option>
                                    <option>Business</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Niveau actuel</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Débutant</option>
                                    <option>Intermédiaire</option>
                                    <option>Avancé</option>
                                    <option>Expert</option>
                                </select>
                            </div>
                            <button type="submit" class="w-full gradient-learning text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                Créer mon compte gratuit
                            </button>
                            <p class="text-xs text-gray-500 text-center">
                                7 jours gratuits • Annulation à tout moment • Accès immédiat
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
                    <h3 class="text-xl font-bold font-display mb-4">${this.config.platformName}</h3>
                    <p class="text-gray-300">Plateforme d'apprentissage en ligne nouvelle génération</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Catégories</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Développement</li>
                        <li>Design</li>
                        <li>Business</li>
                        <li>Marketing</li>
                        <li>Data Science</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Centre d'aide</li>
                        <li>Contact</li>
                        <li>FAQ</li>
                        <li>Communauté</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Légal</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Conditions d'utilisation</li>
                        <li>Politique de confidentialité</li>
                        <li>Cookies</li>
                        <li>Mentions légales</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 ${this.config.platformName}. Tous droits réservés.</p>
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

        // Progress bar animation
        const progressBars = document.querySelectorAll('.progress-bar');
        const animateProgress = () => {
            progressBars.forEach(bar => {
                const width = bar.dataset.progress;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
        };

        // Observer pour déclencher les animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                }
            });
        });

        if (progressBars.length > 0) {
            observer.observe(progressBars[0]);
        }
    </script>
</body>
</html>`;
  }

  /**
   * Génère les cartes de cours
   */
  private generateCourseCards(): string {
    const courses = [
      {
        title: 'Développement Web Complet',
        instructor: 'Sarah Johnson',
        level: 'Débutant',
        duration: '40h',
        students: '2.5k',
        rating: 4.9,
        price: '79€',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Data Science avec Python',
        instructor: 'Dr. Martin Lee',
        level: 'Intermédiaire',
        duration: '60h',
        students: '1.8k',
        rating: 4.8,
        price: '99€',
        progress: 35,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Design UX/UI Moderne',
        instructor: 'Emma Wilson',
        level: 'Débutant',
        duration: '35h',
        students: '3.2k',
        rating: 4.9,
        price: '69€',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Marketing Digital 2024',
        instructor: 'Alex Rodriguez',
        level: 'Tous niveaux',
        duration: '25h',
        students: '4.1k',
        rating: 4.7,
        price: '59€',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Intelligence Artificielle',
        instructor: 'Prof. Chen Wang',
        level: 'Avancé',
        duration: '80h',
        students: '900',
        rating: 4.9,
        price: '149€',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Entrepreneuriat Digital',
        instructor: 'Lisa Thompson',
        level: 'Intermédiaire',
        duration: '45h',
        students: '1.5k',
        rating: 4.8,
        price: '89€',
        progress: 0,
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    return courses.map(course => `
      <div class="course-card rounded-xl overflow-hidden">
          <div class="relative">
              <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover">
              <div class="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold">
                  ${course.level}
              </div>
              ${course.progress > 0 ? `
                  <div class="absolute bottom-0 left-0 right-0 bg-white/90 p-2">
                      <div class="flex justify-between text-xs mb-1">
                          <span>Progression</span>
                          <span>${course.progress}%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="progress-bar h-2 rounded-full" data-progress="${course.progress}"></div>
                      </div>
                  </div>
              ` : ''}
          </div>
          <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">${course.title}</h3>
              <p class="text-sm text-gray-600 mb-3">Par ${course.instructor}</p>
              
              <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>⏱️ ${course.duration}</span>
                  <span>👥 ${course.students}</span>
                  <span>⭐ ${course.rating}</span>
              </div>
              
              <div class="flex items-center justify-between">
                  <span class="text-xl font-bold text-primary">${course.price}</span>
                  <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-learning transition-colors">
                      ${course.progress > 0 ? 'Continuer' : 'S\'inscrire'}
                  </button>
              </div>
          </div>
      </div>
    `).join('');
  }

  /**
   * Génère les fonctionnalités de parcours d'apprentissage
   */
  private generateLearningPathFeatures(): string {
    const features = [
      {
        title: 'Évaluation initiale',
        description: 'Test de niveau pour personnaliser votre parcours',
        icon: '📊'
      },
      {
        title: 'Apprentissage adaptatif',
        description: 'IA qui ajuste la difficulté selon vos progrès',
        icon: '🧠'
      },
      {
        title: 'Projets pratiques',
        description: 'Mise en application immédiate des concepts',
        icon: '🛠️'
      },
      {
        title: 'Certification finale',
        description: 'Validation officielle de vos compétences',
        icon: '🏆'
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
   * Génère les cartes d'instructeurs
   */
  private generateInstructorCards(): string {
    const instructors = [
      {
        name: 'Sarah Johnson',
        speciality: 'Développement Web',
        experience: '8 ans',
        students: '12k+',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Dr. Martin Lee',
        speciality: 'Data Science',
        experience: '15 ans',
        students: '8k+',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Emma Wilson',
        speciality: 'UX/UI Design',
        experience: '6 ans',
        students: '15k+',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Alex Rodriguez',
        speciality: 'Marketing Digital',
        experience: '10 ans',
        students: '20k+',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    return instructors.map(instructor => `
      <div class="course-card p-6 rounded-xl text-center">
          <img src="${instructor.image}" alt="${instructor.name}" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">${instructor.name}</h3>
          <p class="text-primary font-medium mb-2">${instructor.speciality}</p>
          <div class="text-sm text-gray-600 space-y-1">
              <p>${instructor.experience} d'expérience</p>
              <p>${instructor.students} étudiants</p>
              <p>⭐ ${instructor.rating}/5</p>
          </div>
      </div>
    `).join('');
  }

  /**
   * Génère les témoignages
   */
  private generateTestimonials(): string {
    const testimonials = [
      {
        text: 'Excellent contenu, très bien structuré. J\'ai trouvé un emploi en 3 mois !',
        author: 'Julie M.',
        role: 'Développeuse Web',
        course: 'Développement Web',
        rating: 5
      },
      {
        text: 'Instructeurs passionnés et pédagogues. Plateforme très intuitive.',
        author: 'Pierre L.',
        role: 'Data Analyst',
        course: 'Data Science',
        rating: 5
      },
      {
        text: 'Formation complète avec beaucoup de pratique. Je recommande !',
        author: 'Sophie K.',
        role: 'UX Designer',
        course: 'Design UX/UI',
        rating: 5
      }
    ];

    return testimonials.map(testimonial => `
      <div class="course-card p-6 rounded-xl">
          <div class="flex text-warning mb-4">
              ${'★'.repeat(testimonial.rating)}
          </div>
          <p class="text-gray-600 mb-4 italic">"${testimonial.text}"</p>
          <div>
              <p class="font-semibold text-gray-900">${testimonial.author}</p>
              <p class="text-sm text-muted">${testimonial.role}</p>
              <p class="text-xs text-primary mt-1">Cours: ${testimonial.course}</p>
          </div>
      </div>
    `).join('');
  }

  /**
   * Utilitaires
   */
  private getAudienceLabel(): string {
    const labels = {
      students: 'Étudiants',
      professionals: 'Professionnels',
      all: 'Apprenants',
      children: 'Enfants'
    };

    return labels[this.config.targetAudience] || 'Apprenants';
  }
}

export default ELearningTemplate;