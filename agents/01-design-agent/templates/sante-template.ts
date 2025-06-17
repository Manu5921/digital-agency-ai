/**
 * Template Secteur Santé - Phase 2 Design Agent
 * Templates pour cliniques, cabinets médicaux, centres de santé
 */

export interface SanteTemplateConfig {
  businessName: string;
  speciality: string;
  style: 'classique' | 'moderne' | 'minimaliste';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    trust: string; // Couleur confiance
    calm: string;  // Couleur apaisante
  };
  features: string[];
}

export class SanteTemplate {
  private config: SanteTemplateConfig;

  constructor(config: SanteTemplateConfig) {
    this.config = config;
  }

  /**
   * Génère la palette couleurs santé selon le style
   */
  generateHealthColorPalette(): Record<string, string> {
    const palettes = {
      classique: {
        primary: '#2563eb',     // Bleu médical professionnel
        secondary: '#10b981',   // Vert santé
        accent: '#059669',      // Vert foncé
        trust: '#1e40af',       // Bleu confiance
        calm: '#e0f2fe',        // Bleu très clair apaisant
        background: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      moderne: {
        primary: '#0ea5e9',     // Bleu moderne
        secondary: '#06b6d4',   // Cyan
        accent: '#8b5cf6',      // Violet moderne
        trust: '#3b82f6',       // Bleu tech
        calm: '#f0f9ff',        // Bleu ultra clair
        background: '#fafafa',
        text: '#111827',
        muted: '#64748b',
        success: '#22c55e',
        warning: '#eab308',
        danger: '#f87171'
      },
      minimaliste: {
        primary: '#374151',     // Gris anthracite
        secondary: '#059669',   // Vert minimaliste
        accent: '#d1d5db',      // Gris clair
        trust: '#4b5563',       // Gris moyen
        calm: '#f9fafb',        // Gris ultra clair
        background: '#ffffff',
        text: '#1f2937',
        muted: '#9ca3af',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
      }
    };

    return palettes[this.config.style];
  }

  /**
   * Génère le HTML du template santé
   */
  generateHTMLTemplate(): string {
    const colors = this.generateHealthColorPalette();
    
    return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.businessName} - ${this.config.speciality}</title>
    <meta name="description" content="Cabinet médical ${this.config.speciality} - ${this.config.businessName}. Soins de qualité, équipe professionnelle, prise de rendez-vous en ligne.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: ${JSON.stringify(colors)},
                    fontFamily: {
                        'sans': ['Inter', 'sans-serif'],
                        'serif': ['Merriweather', 'serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        .gradient-health {
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
        }
        
        .trust-indicator {
            background: linear-gradient(45deg, ${colors.trust}, ${colors.secondary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body class="font-sans bg-gray-50">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-primary">
                        ${this.config.businessName}
                    </h1>
                    <p class="text-sm text-muted">${this.config.speciality}</p>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#accueil" class="text-gray-700 hover:text-primary transition-colors">Accueil</a>
                    <a href="#services" class="text-gray-700 hover:text-primary transition-colors">Services</a>
                    <a href="#equipe" class="text-gray-700 hover:text-primary transition-colors">Équipe</a>
                    <a href="#contact" class="text-gray-700 hover:text-primary transition-colors">Contact</a>
                    <a href="#rdv" class="bg-primary text-white px-6 py-2 rounded-full hover:bg-trust transition-colors">
                        Prendre RDV
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="accueil" class="pt-16 pb-20 bg-calm">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
                <div>
                    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Votre santé, 
                        <span class="trust-indicator">notre priorité</span>
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                        Cabinet médical moderne spécialisé en ${this.config.speciality}. 
                        Nous vous accompagnons avec expertise et bienveillance.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="#rdv" class="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-trust transition-all transform hover:scale-105">
                            Prendre rendez-vous
                        </a>
                        <a href="#services" class="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all">
                            Nos services
                        </a>
                    </div>
                    
                    <!-- Indicateurs de confiance -->
                    <div class="mt-12 grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-primary">15+</div>
                            <div class="text-sm text-muted">Années d'expérience</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-primary">2000+</div>
                            <div class="text-sm text-muted">Patients satisfaits</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-primary">24h/7j</div>
                            <div class="text-sm text-muted">Urgences</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Cabinet médical moderne" 
                         class="rounded-2xl shadow-2xl">
                    
                    <!-- Badge certification -->
                    <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                                <span class="text-white font-bold">✓</span>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900">Certifié</div>
                                <div class="text-sm text-muted">Ordre des médecins</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Nos <span class="trust-indicator">Services</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Une gamme complète de soins adaptés à vos besoins
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                ${this.generateServiceCards()}
            </div>
        </div>
    </section>

    <!-- Équipe Section -->
    <section id="equipe" class="py-20 bg-calm">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Notre <span class="trust-indicator">Équipe</span>
                </h2>
                <p class="text-xl text-gray-600">Professionnels expérimentés à votre service</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateTeamCards()}
            </div>
        </div>
    </section>

    <!-- Témoignages -->
    <section class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Témoignages <span class="trust-indicator">Patients</span>
                </h2>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateTestimonials()}
            </div>
        </div>
    </section>

    <!-- Contact & RDV -->
    <section id="contact" class="py-20 bg-calm">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Informations -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Informations pratiques</h3>
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <div class="w-6 h-6 text-primary mr-4">📍</div>
                            <div>
                                <p class="font-semibold">Adresse</p>
                                <p class="text-gray-600">123 Avenue de la Santé, 75015 Paris</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="w-6 h-6 text-primary mr-4">📞</div>
                            <div>
                                <p class="font-semibold">Téléphone</p>
                                <p class="text-gray-600">01 45 67 89 12</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="w-6 h-6 text-primary mr-4">⏰</div>
                            <div>
                                <p class="font-semibold">Horaires</p>
                                <p class="text-gray-600">Lun-Ven: 8h-19h, Sam: 9h-17h</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Urgences -->
                    <div class="mt-8 p-6 bg-warning/10 rounded-lg border border-warning/20">
                        <h4 class="font-semibold text-warning mb-2">🚨 Urgences</h4>
                        <p class="text-sm">Pour les urgences médicales, appelez le 15 ou rendez-vous aux urgences.</p>
                    </div>
                </div>

                <!-- Formulaire RDV -->
                <div id="rdv">
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Prendre rendez-vous</h3>
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
                                <label class="block text-sm font-medium text-gray-700 mb-2">Type de consultation</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Consultation générale</option>
                                    <option>Suivi médical</option>
                                    <option>Urgence</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Message (optionnel)</label>
                                <textarea rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Précisez votre demande..."></textarea>
                            </div>
                            <button type="submit" class="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-trust transition-colors">
                                Confirmer le rendez-vous
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">${this.config.businessName}</h3>
                    <p class="text-gray-300">Cabinet médical de confiance depuis 15 ans</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li>Consultation générale</li>
                        <li>Médecine préventive</li>
                        <li>Suivi médical</li>
                        <li>Urgences</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li>123 Avenue de la Santé</li>
                        <li>75015 Paris</li>
                        <li>01 45 67 89 12</li>
                        <li>contact@cabinet-medical.fr</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Urgences</h4>
                    <p class="text-gray-300 mb-4">24h/7j pour les urgences médicales</p>
                    <p class="text-warning font-semibold">SAMU: 15</p>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 ${this.config.businessName}. Tous droits réservés.</p>
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
    </script>
</body>
</html>`;
  }

  /**
   * Génère les cartes de services
   */
  private generateServiceCards(): string {
    const services = [
      {
        title: 'Consultation générale',
        description: 'Examen médical complet et diagnostic',
        icon: '🏥'
      },
      {
        title: 'Médecine préventive',
        description: 'Bilans de santé et dépistage',
        icon: '🔬'
      },
      {
        title: 'Suivi médical',
        description: 'Accompagnement personnalisé',
        icon: '📋'
      },
      {
        title: 'Urgences',
        description: 'Prise en charge rapide 24h/7j',
        icon: '🚨'
      },
      {
        title: 'Téléconsultation',
        description: 'Consultation à distance sécurisée',
        icon: '💻'
      },
      {
        title: 'Analyses médicales',
        description: 'Laboratoire sur place',
        icon: '🧪'
      }
    ];

    return services.map(service => `
      <div class="card-hover bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-4xl mb-4">${service.icon}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">${service.title}</h3>
          <p class="text-gray-600 mb-4">${service.description}</p>
          <a href="#rdv" class="text-primary font-semibold hover:text-trust transition-colors">
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
        name: 'Dr. Sarah Martin',
        role: 'Médecin généraliste',
        experience: '15 ans d\'expérience',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Dr. Pierre Dubois',
        role: 'Spécialiste cardiologie',
        experience: '12 ans d\'expérience',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Marie Léger',
        role: 'Infirmière diplômée',
        experience: '8 ans d\'expérience',
        image: 'https://images.unsplash.com/photo-1594824804732-ca8db4a4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    return team.map(member => `
      <div class="card-hover bg-white p-6 rounded-xl shadow-sm text-center">
          <img src="${member.image}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">${member.name}</h3>
          <p class="text-primary font-medium mb-1">${member.role}</p>
          <p class="text-gray-600 text-sm">${member.experience}</p>
      </div>
    `).join('');
  }

  /**
   * Génère les témoignages
   */
  private generateTestimonials(): string {
    const testimonials = [
      {
        text: 'Excellent accueil et professionnalisme. Je recommande vivement ce cabinet.',
        author: 'Marie L.',
        rating: 5
      },
      {
        text: 'Médecin à l\'écoute, diagnostic précis. Très satisfait du suivi.',
        author: 'Jean P.',
        rating: 5
      },
      {
        text: 'Personnel bienveillant, équipements modernes. Cabinet de confiance.',
        author: 'Sophie M.',
        rating: 5
      }
    ];

    return testimonials.map(testimonial => `
      <div class="card-hover bg-white p-6 rounded-xl shadow-sm">
          <div class="flex text-warning mb-4">
              ${'★'.repeat(testimonial.rating)}
          </div>
          <p class="text-gray-600 mb-4 italic">"${testimonial.text}"</p>
          <p class="font-semibold text-gray-900">${testimonial.author}</p>
      </div>
    `).join('');
  }
}

export default SanteTemplate;