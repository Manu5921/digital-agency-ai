/**
 * Template Secteur Tech - Phase 2 Design Agent
 * Templates pour startups, SaaS, développeurs, agences digitales
 */

export interface TechTemplateConfig {
  companyName: string;
  techType: 'startup' | 'saas' | 'agency' | 'dev' | 'ai' | 'blockchain';
  style: 'classique' | 'moderne' | 'minimaliste';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    innovation: string;
    tech: string;
  };
  features: string[];
}

export class TechTemplate {
  private config: TechTemplateConfig;

  constructor(config: TechTemplateConfig) {
    this.config = config;
  }

  /**
   * Génère la palette couleurs tech selon le style
   */
  generateTechColorPalette(): Record<string, string> {
    const palettes = {
      classique: {
        primary: '#2563eb',     // Bleu tech classique
        secondary: '#7c3aed',   // Violet innovation
        accent: '#10b981',      // Vert succès
        innovation: '#f59e0b',  // Orange créativité
        tech: '#06b6d4',        // Cyan digital
        background: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        dark: '#111827'
      },
      moderne: {
        primary: '#6366f1',     // Indigo moderne
        secondary: '#ec4899',   // Rose créatif
        accent: '#14b8a6',      // Teal innovation
        innovation: '#f97316',  // Orange vif
        tech: '#8b5cf6',        // Violet futuriste
        background: '#fafafa',
        text: '#111827',
        muted: '#64748b',
        success: '#22c55e',
        warning: '#eab308',
        danger: '#f87171',
        dark: '#0f172a'
      },
      minimaliste: {
        primary: '#374151',     // Gris tech
        secondary: '#059669',   // Vert minimal
        accent: '#6b7280',      // Gris accent
        innovation: '#d97706',  // Orange subtil
        tech: '#0ea5e9',        // Bleu simple
        background: '#ffffff',
        text: '#1f2937',
        muted: '#9ca3af',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        dark: '#1f2937'
      }
    };

    return palettes[this.config.style];
  }

  /**
   * Génère le HTML du template tech
   */
  generateHTMLTemplate(): string {
    const colors = this.generateTechColorPalette();
    
    return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.config.companyName} - ${this.getTechTypeLabel()}</title>
    <meta name="description" content="${this.config.companyName} - ${this.getTechTypeDescription()} Innovation technologique et solutions digitales de pointe.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: ${JSON.stringify(colors)},
                    fontFamily: {
                        'sans': ['Inter', 'sans-serif'],
                        'mono': ['JetBrains Mono', 'monospace'],
                        'display': ['Space Grotesk', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        .gradient-tech {
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.tech} 100%);
        }
        
        .gradient-innovation {
            background: linear-gradient(135deg, ${colors.innovation}, ${colors.secondary});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .tech-card {
            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .tech-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.tech});
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .tech-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            border-color: ${colors.primary};
        }
        
        .tech-card:hover::before {
            transform: scaleX(1);
        }
        
        .code-block {
            background: ${colors.dark};
            color: #e5e7eb;
            font-family: 'JetBrains Mono', monospace;
            border-radius: 0.5rem;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
        }
        
        .code-block::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(90deg, #ef4444, #f59e0b, #10b981);
            background-size: 200% 100%;
            animation: colorShift 3s ease-in-out infinite;
        }
        
        @keyframes colorShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .floating-element {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .tech-grid {
            background-image: 
                radial-gradient(circle at 1px 1px, ${colors.primary}20 1px, transparent 0);
            background-size: 20px 20px;
        }
        
        .glow-effect {
            box-shadow: 0 0 20px ${colors.primary}40;
        }
        
        .typing-animation {
            border-right: 2px solid ${colors.primary};
            white-space: nowrap;
            overflow: hidden;
            animation: typing 3s steps(40, end), blink 0.75s step-end infinite;
        }
        
        @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
        }
        
        @keyframes blink {
            from, to { border-color: transparent; }
            50% { border-color: ${colors.primary}; }
        }
    </style>
</head>
<body class="font-sans bg-gray-50">
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold font-display text-primary">
                        ${this.config.companyName}
                    </h1>
                    <p class="text-xs text-muted font-mono">${this.getTechTypeLabel()}</p>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#accueil" class="text-gray-700 hover:text-primary transition-colors font-medium">Accueil</a>
                    <a href="#solutions" class="text-gray-700 hover:text-primary transition-colors font-medium">Solutions</a>
                    <a href="#technos" class="text-gray-700 hover:text-primary transition-colors font-medium">Technologies</a>
                    <a href="#equipe" class="text-gray-700 hover:text-primary transition-colors font-medium">Équipe</a>
                    <a href="#contact" class="text-gray-700 hover:text-primary transition-colors font-medium">Contact</a>
                    <a href="#demo" class="gradient-tech text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold">
                        Demo gratuite
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="accueil" class="pt-16 pb-20 tech-grid bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <!-- Éléments flottants décoratifs -->
        <div class="absolute top-20 left-10 floating-element">
            <div class="w-16 h-16 bg-primary/10 rounded-lg rotate-12"></div>
        </div>
        <div class="absolute top-40 right-20 floating-element" style="animation-delay: 2s;">
            <div class="w-12 h-12 bg-secondary/10 rounded-full"></div>
        </div>
        <div class="absolute bottom-20 left-1/4 floating-element" style="animation-delay: 4s;">
            <div class="w-8 h-8 bg-tech/10 rounded-lg rotate-45"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
                <div>
                    <div class="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <span class="text-primary font-semibold text-sm">🚀 ${this.getInnovationBadge()}</span>
                    </div>
                    
                    <h1 class="text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6 leading-tight">
                        Innovons
                        <span class="gradient-innovation block">ensemble</span>
                    </h1>
                    
                    <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                        ${this.getTechTypeDescription()} Nous transformons vos idées en solutions 
                        technologiques performantes avec les dernières innovations du marché.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 mb-12">
                        <a href="#demo" class="gradient-tech text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center">
                            Demander une démo
                        </a>
                        <a href="#solutions" class="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center">
                            Voir nos solutions
                        </a>
                    </div>
                    
                    <!-- Stats tech -->
                    <div class="grid grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary font-mono">99.9%</div>
                            <div class="text-sm text-muted">Uptime</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary font-mono">< 100ms</div>
                            <div class="text-sm text-muted">Latence</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary font-mono">24/7</div>
                            <div class="text-sm text-muted">Support</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative">
                    <!-- Code Block Interactif -->
                    <div class="code-block glow-effect">
                        <div class="text-sm mb-4 text-gray-400">// ${this.config.companyName} API</div>
                        <div class="space-y-2 font-mono text-sm">
                            <div><span class="text-blue-400">const</span> <span class="text-white">response</span> = <span class="text-green-400">await</span> <span class="text-yellow-400">fetch</span>(<span class="text-orange-400">'${this.getApiExample()}'</span>);</div>
                            <div><span class="text-blue-400">const</span> <span class="text-white">data</span> = <span class="text-green-400">await</span> <span class="text-white">response</span>.<span class="text-yellow-400">json</span>();</div>
                            <div><span class="text-purple-400">console</span>.<span class="text-yellow-400">log</span>(<span class="text-orange-400">'Success:'</span>, <span class="text-white">data</span>);</div>
                            <div class="mt-4 text-green-400 typing-animation">// ✅ Innovation made simple</div>
                        </div>
                    </div>
                    
                    <!-- Badge performance -->
                    <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-success">⚡ Fast</div>
                            <div class="text-sm text-muted">Performance optimale</div>
                        </div>
                    </div>
                    
                    <!-- Badge sécurité -->
                    <div class="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                                <span class="text-white text-sm">🔒</span>
                            </div>
                            <div>
                                <div class="font-semibold text-xs">Sécurisé</div>
                                <div class="text-xs text-muted">SSL/TLS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Solutions -->
    <section id="solutions" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                    Nos <span class="gradient-innovation">Solutions</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Technologies de pointe pour transformer votre business
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${this.generateSolutionCards()}
            </div>
        </div>
    </section>

    <!-- Technologies -->
    <section id="technos" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                    Stack <span class="gradient-innovation">Technologique</span>
                </h2>
                <p class="text-xl text-gray-600">Technologies modernes et éprouvées</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                ${this.generateTechStack()}
            </div>
            
            <!-- Architecture -->
            <div class="mt-16 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 class="text-2xl font-bold font-display text-gray-900 mb-6">Architecture Scalable</h3>
                    <div class="space-y-6">
                        ${this.generateArchitectureFeatures()}
                    </div>
                </div>
                
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Architecture tech" 
                         class="rounded-2xl shadow-2xl">
                </div>
            </div>
        </div>
    </section>

    <!-- Équipe -->
    <section id="equipe" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
                    Notre <span class="gradient-innovation">Équipe</span>
                </h2>
                <p class="text-xl text-gray-600">Experts passionnés par l'innovation</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${this.generateTeamCards()}
            </div>
        </div>
    </section>

    <!-- Pricing / Demo -->
    <section class="py-20 bg-gray-900 text-white relative overflow-hidden">
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="tech-grid h-full"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold font-display mb-4">
                    Prêt à <span style="color: ${colors.innovation}">innover</span> ?
                </h2>
                <p class="text-xl text-gray-300">Commencez votre transformation digitale dès aujourd'hui</p>
            </div>
            
            <div class="grid lg:grid-cols-3 gap-8">
                ${this.generatePricingCards()}
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Informations -->
                <div>
                    <h3 class="text-2xl font-bold font-display text-gray-900 mb-6">Discutons de votre projet</h3>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📧</div>
                            <div>
                                <p class="font-semibold">Email</p>
                                <p class="text-gray-600">contact@${this.config.companyName.toLowerCase()}.com</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">💬</div>
                            <div>
                                <p class="font-semibold">Chat en direct</p>
                                <p class="text-gray-600">Support 24/7 pour nos clients</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">📱</div>
                            <div>
                                <p class="font-semibold">API Documentation</p>
                                <p class="text-gray-600">docs.${this.config.companyName.toLowerCase()}.com</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-6 h-6 text-primary mr-4 mt-1">🌍</div>
                            <div>
                                <p class="font-semibold">Global</p>
                                <p class="text-gray-600">Servers worldwide • 99.9% uptime</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tech specs -->
                    <div class="mt-8 p-6 bg-primary/5 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-4">⚡ Performance</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm font-mono">
                            <div>📊 < 100ms latency</div>
                            <div>🔄 Auto-scaling</div>
                            <div>🛡️ Enterprise security</div>
                            <div>📈 Real-time analytics</div>
                        </div>
                    </div>
                </div>

                <!-- Formulaire Demo -->
                <div id="demo">
                    <div class="tech-card p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold font-display text-gray-900 mb-6">
                            Demander une démo <span style="color: ${colors.innovation}">🚀</span>
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
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email professionnel</label>
                                <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                                <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Taille d'équipe</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>1-10 employés</option>
                                    <option>11-50 employés</option>
                                    <option>51-200 employés</option>
                                    <option>200+ employés</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Cas d'usage</label>
                                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    ${this.getUseCaseOptions()}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Description du projet</label>
                                <textarea rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Décrivez vos besoins..."></textarea>
                            </div>
                            <button type="submit" class="w-full gradient-tech text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                Planifier ma démo personnalisée
                            </button>
                            <p class="text-xs text-gray-500 text-center">
                                Démo gratuite 30min • Réponse sous 2h • Sans engagement
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
                    <h3 class="text-xl font-bold font-display mb-4">${this.config.companyName}</h3>
                    <p class="text-gray-300">Innovation technologique pour un futur meilleur</p>
                    <div class="mt-4 flex space-x-4">
                        <a href="#" class="text-gray-300 hover:text-primary">GitHub</a>
                        <a href="#" class="text-gray-300 hover:text-primary">LinkedIn</a>
                        <a href="#" class="text-gray-300 hover:text-primary">Twitter</a>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Produits</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>API Platform</li>
                        <li>Cloud Solutions</li>
                        <li>AI Services</li>
                        <li>Mobile SDK</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Développeurs</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Documentation</li>
                        <li>API Reference</li>
                        <li>Tutorials</li>
                        <li>Community</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li>Help Center</li>
                        <li>Status Page</li>
                        <li>Contact</li>
                        <li>Security</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 ${this.config.companyName}. Tous droits réservés. | Made with ❤️ and ☕</p>
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

        // Typing animation restart
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            setInterval(() => {
                typingElement.style.animation = 'none';
                setTimeout(() => {
                    typingElement.style.animation = 'typing 3s steps(40, end), blink 0.75s step-end infinite';
                }, 100);
            }, 6000);
        }

        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const floatingElements = document.querySelectorAll('.floating-element');
            
            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                element.style.transform = \`translateY(\${scrolled * speed}px)\`;
            });
        });
    </script>
</body>
</html>`;
  }

  /**
   * Génère les cartes de solutions
   */
  private generateSolutionCards(): string {
    const solutionsByType = {
      startup: [
        { title: 'MVP Development', description: 'Prototype rapide pour valider votre concept', icon: '🚀' },
        { title: 'Cloud Infrastructure', description: 'Architecture scalable dès le départ', icon: '☁️' },
        { title: 'Mobile First', description: 'Applications natives et cross-platform', icon: '📱' },
        { title: 'Analytics & Metrics', description: 'Tracking et optimisation des performances', icon: '📊' },
        { title: 'API Design', description: 'APIs RESTful et GraphQL modernes', icon: '🔌' },
        { title: 'DevOps & CI/CD', description: 'Déploiement automatisé et sécurisé', icon: '⚙️' }
      ],
      saas: [
        { title: 'Multi-tenant Architecture', description: 'Plateforme SaaS sécurisée et scalable', icon: '🏢' },
        { title: 'Subscription Management', description: 'Gestion complète des abonnements', icon: '💳' },
        { title: 'Real-time Dashboard', description: 'Tableaux de bord interactifs en temps réel', icon: '📈' },
        { title: 'API Management', description: 'Gateway et documentation API complète', icon: '🌐' },
        { title: 'Security & Compliance', description: 'GDPR, SOC2, et sécurité enterprise', icon: '🔒' },
        { title: 'White-label Solutions', description: 'Personnalisation complète de la marque', icon: '🎨' }
      ],
      agency: [
        { title: 'Web Development', description: 'Sites web modernes et performants', icon: '💻' },
        { title: 'E-commerce Solutions', description: 'Plateformes de vente en ligne optimisées', icon: '🛒' },
        { title: 'Digital Marketing', description: 'SEO, SEM et stratégies digitales', icon: '📢' },
        { title: 'UX/UI Design', description: 'Expériences utilisateur exceptionnelles', icon: '🎨' },
        { title: 'CMS & Content', description: 'Gestion de contenu flexible et intuitive', icon: '📝' },
        { title: 'Maintenance & Support', description: 'Support technique 24/7 et mises à jour', icon: '🔧' }
      ],
      dev: [
        { title: 'Custom Software', description: 'Développement sur mesure pour votre métier', icon: '⚡' },
        { title: 'API Integration', description: 'Connexion et synchronisation de systèmes', icon: '🔗' },
        { title: 'Database Design', description: 'Architecture de données optimisée', icon: '🗄️' },
        { title: 'Code Review & Audit', description: 'Analyse et optimisation de code existant', icon: '🔍' },
        { title: 'Testing & QA', description: 'Tests automatisés et assurance qualité', icon: '✅' },
        { title: 'Legacy Modernization', description: 'Migration et modernisation d\'applications', icon: '🔄' }
      ],
      ai: [
        { title: 'Machine Learning', description: 'Modèles prédictifs et algorithmes intelligents', icon: '🤖' },
        { title: 'Natural Language Processing', description: 'Traitement et analyse de texte automatisé', icon: '💬' },
        { title: 'Computer Vision', description: 'Reconnaissance et analyse d\'images', icon: '👁️' },
        { title: 'AI Chatbots', description: 'Assistants conversationnels intelligents', icon: '🤖' },
        { title: 'Predictive Analytics', description: 'Prédictions basées sur vos données', icon: '🔮' },
        { title: 'AI Automation', description: 'Automatisation intelligente des processus', icon: '⚡' }
      ],
      blockchain: [
        { title: 'Smart Contracts', description: 'Contrats automatisés et sécurisés', icon: '📜' },
        { title: 'DeFi Solutions', description: 'Finance décentralisée et protocoles DeFi', icon: '💰' },
        { title: 'NFT Platforms', description: 'Marketplaces et collections NFT', icon: '🎨' },
        { title: 'Crypto Wallets', description: 'Portefeuilles sécurisés multi-devises', icon: '👛' },
        { title: 'Blockchain Audit', description: 'Sécurité et audit de smart contracts', icon: '🔍' },
        { title: 'Web3 Integration', description: 'Intégration d\'applications décentralisées', icon: '🌐' }
      ]
    };

    const solutions = solutionsByType[this.config.techType] || solutionsByType.startup;

    return solutions.map(solution => `
      <div class="tech-card p-6 rounded-xl">
          <div class="text-4xl mb-4">${solution.icon}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">${solution.title}</h3>
          <p class="text-gray-600 mb-4">${solution.description}</p>
          <a href="#demo" class="text-primary font-semibold hover:text-tech transition-colors">
              En savoir plus →
          </a>
      </div>
    `).join('');
  }

  /**
   * Génère la stack technologique
   */
  private generateTechStack(): string {
    const technologies = [
      { name: 'React', icon: '⚛️', category: 'Frontend' },
      { name: 'Node.js', icon: '💚', category: 'Backend' },
      { name: 'Python', icon: '🐍', category: 'AI/ML' },
      { name: 'Docker', icon: '🐳', category: 'DevOps' },
      { name: 'Kubernetes', icon: '☸️', category: 'Orchestration' },
      { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
      { name: 'Redis', icon: '🔴', category: 'Cache' },
      { name: 'AWS', icon: '☁️', category: 'Cloud' },
      { name: 'GraphQL', icon: '🔷', category: 'API' },
      { name: 'TypeScript', icon: '🔷', category: 'Language' },
      { name: 'Terraform', icon: '🏗️', category: 'Infrastructure' },
      { name: 'Git', icon: '🌿', category: 'Version Control' }
    ];

    return technologies.map(tech => `
      <div class="tech-card p-4 rounded-lg text-center">
          <div class="text-3xl mb-2">${tech.icon}</div>
          <h4 class="font-semibold text-gray-900 text-sm">${tech.name}</h4>
          <p class="text-xs text-muted">${tech.category}</p>
      </div>
    `).join('');
  }

  /**
   * Génère les fonctionnalités d'architecture
   */
  private generateArchitectureFeatures(): string {
    const features = [
      {
        title: 'Microservices',
        description: 'Architecture modulaire et indépendante',
        icon: '🧩'
      },
      {
        title: 'Auto-scaling',
        description: 'Adaptation automatique à la charge',
        icon: '📈'
      },
      {
        title: 'High Availability',
        description: '99.9% uptime garanti',
        icon: '🛡️'
      },
      {
        title: 'Real-time Processing',
        description: 'Traitement en temps réel des données',
        icon: '⚡'
      }
    ];

    return features.map(feature => `
      <div class="flex items-start space-x-4">
          <div class="text-3xl">${feature.icon}</div>
          <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">${feature.title}</h4>
              <p class="text-gray-600">${feature.description}</p>
          </div>
      </div>
    `).join('');
  }

  /**
   * Génère les cartes d'équipe
   */
  private generateTeamCards(): string {
    const team = [
      {
        name: 'Alex Chen',
        role: 'CTO & Co-founder',
        speciality: 'Architecture & AI',
        github: 'alexchen',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Sarah Kim',
        role: 'Lead Developer',
        speciality: 'Full-stack & DevOps',
        github: 'sarahkim',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Marcus Johnson',
        role: 'Product Manager',
        speciality: 'Strategy & UX',
        github: 'marcusj',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Emma Davis',
        role: 'UI/UX Designer',
        speciality: 'Design Systems',
        github: 'emmadavis',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    return team.map(member => `
      <div class="tech-card p-6 rounded-xl text-center">
          <img src="${member.image}" alt="${member.name}" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">${member.name}</h3>
          <p class="text-primary font-medium mb-1">${member.role}</p>
          <p class="text-sm text-gray-600 mb-3">${member.speciality}</p>
          <a href="#" class="text-xs text-muted font-mono hover:text-primary">@${member.github}</a>
      </div>
    `).join('');
  }

  /**
   * Génère les cartes de pricing
   */
  private generatePricingCards(): string {
    const plans = [
      {
        name: 'Starter',
        price: 'Gratuit',
        description: 'Parfait pour débuter',
        features: ['API calls: 1,000/mois', 'Support communauté', 'Documentation', 'SDK gratuit'],
        cta: 'Commencer gratuitement',
        popular: false
      },
      {
        name: 'Pro',
        price: '99€/mois',
        description: 'Pour les équipes en croissance',
        features: ['API calls: 100,000/mois', 'Support prioritaire', 'Analytics avancées', 'Intégrations premium'],
        cta: 'Essai gratuit 14 jours',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Sur mesure',
        description: 'Solutions personnalisées',
        features: ['API calls illimitées', 'Support dédié 24/7', 'SLA personnalisé', 'Développement sur mesure'],
        cta: 'Nous contacter',
        popular: false
      }
    ];

    return plans.map(plan => `
      <div class="tech-card p-8 rounded-xl relative ${plan.popular ? 'ring-2 ring-primary' : ''}">
          ${plan.popular ? `
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span class="gradient-tech text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Populaire
                  </span>
              </div>
          ` : ''}
          
          <div class="text-center mb-6">
              <h3 class="text-xl font-bold text-white mb-2">${plan.name}</h3>
              <div class="text-3xl font-bold text-white mb-2">${plan.price}</div>
              <p class="text-gray-300">${plan.description}</p>
          </div>
          
          <ul class="space-y-3 mb-8">
              ${plan.features.map(feature => `
                  <li class="flex items-center text-gray-300">
                      <span class="text-green-400 mr-3">✓</span>
                      ${feature}
                  </li>
              `).join('')}
          </ul>
          
          <button class="w-full ${plan.popular ? 'gradient-tech' : 'border border-gray-600 hover:border-primary'} text-white py-3 px-6 rounded-lg font-semibold transition-all">
              ${plan.cta}
          </button>
      </div>
    `).join('');
  }

  /**
   * Utilitaires
   */
  private getTechTypeLabel(): string {
    const labels = {
      startup: 'Tech Startup',
      saas: 'SaaS Platform',
      agency: 'Digital Agency',
      dev: 'Development Studio',
      ai: 'AI Solutions',
      blockchain: 'Blockchain & Web3'
    };

    return labels[this.config.techType] || 'Tech Company';
  }

  private getTechTypeDescription(): string {
    const descriptions = {
      startup: 'Startup technologique innovante.',
      saas: 'Plateforme SaaS de nouvelle génération.',
      agency: 'Agence digitale spécialisée.',
      dev: 'Studio de développement expert.',
      ai: 'Solutions d\'intelligence artificielle.',
      blockchain: 'Experts blockchain et Web3.'
    };

    return descriptions[this.config.techType] || 'Solutions technologiques avancées.';
  }

  private getInnovationBadge(): string {
    const badges = {
      startup: 'Startup innovante',
      saas: 'SaaS Leader',
      agency: 'Digital Excellence',
      dev: 'Code Experts',
      ai: 'AI Pioneer',
      blockchain: 'Web3 Ready'
    };

    return badges[this.config.techType] || 'Tech Innovation';
  }

  private getApiExample(): string {
    const examples = {
      startup: '/api/v1/products',
      saas: '/api/v2/analytics',
      agency: '/api/v1/projects',
      dev: '/api/v1/deploy',
      ai: '/api/v1/predict',
      blockchain: '/api/v1/contracts'
    };

    return examples[this.config.techType] || '/api/v1/data';
  }

  private getUseCaseOptions(): string {
    const useCasesByType = {
      startup: [
        '<option>MVP Development</option>',
        '<option>Mobile App</option>',
        '<option>Web Platform</option>',
        '<option>API Development</option>'
      ],
      saas: [
        '<option>SaaS Platform</option>',
        '<option>Multi-tenant App</option>',
        '<option>API Gateway</option>',
        '<option>Analytics Dashboard</option>'
      ],
      agency: [
        '<option>Website</option>',
        '<option>E-commerce</option>',
        '<option>Mobile App</option>',
        '<option>Digital Marketing</option>'
      ],
      dev: [
        '<option>Custom Software</option>',
        '<option>System Integration</option>',
        '<option>Legacy Migration</option>',
        '<option>API Development</option>'
      ],
      ai: [
        '<option>Machine Learning</option>',
        '<option>NLP Solution</option>',
        '<option>Computer Vision</option>',
        '<option>AI Chatbot</option>'
      ],
      blockchain: [
        '<option>Smart Contracts</option>',
        '<option>DeFi Protocol</option>',
        '<option>NFT Platform</option>',
        '<option>Web3 App</option>'
      ]
    };

    const options = useCasesByType[this.config.techType] || useCasesByType.startup;
    return options.join('');
  }
}

export default TechTemplate;