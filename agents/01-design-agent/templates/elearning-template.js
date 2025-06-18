"use strict";
/**
 * Template Secteur E-Learning - Phase 2 Design Agent
 * Templates pour plateformes éducatives, formations en ligne, MOOCs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELearningTemplate = void 0;
var ELearningTemplate = /** @class */ (function () {
    function ELearningTemplate(config) {
        this.config = config;
    }
    /**
     * Génère la palette couleurs e-learning selon le style
     */
    ELearningTemplate.prototype.generateELearningColorPalette = function () {
        var palettes = {
            classique: {
                primary: '#3b82f6', // Bleu éducation
                secondary: '#10b981', // Vert apprentissage
                accent: '#f59e0b', // Orange motivation
                success: '#22c55e', // Vert succès
                learning: '#8b5cf6', // Violet créativité
                background: '#ffffff',
                text: '#1f2937',
                muted: '#6b7280',
                warning: '#f59e0b',
                danger: '#ef4444',
                info: '#06b6d4'
            },
            moderne: {
                primary: '#6366f1', // Indigo moderne
                secondary: '#ec4899', // Rose créatif
                accent: '#14b8a6', // Teal innovation
                success: '#10b981', // Vert réussite
                learning: '#8b5cf6', // Violet apprentissage
                background: '#fafafa',
                text: '#111827',
                muted: '#64748b',
                warning: '#f59e0b',
                danger: '#f87171',
                info: '#0ea5e9'
            },
            minimaliste: {
                primary: '#374151', // Gris focus
                secondary: '#059669', // Vert simple
                accent: '#6b7280', // Gris accent
                success: '#10b981', // Vert validation
                learning: '#8b5cf6', // Violet insight
                background: '#ffffff',
                text: '#1f2937',
                muted: '#9ca3af',
                warning: '#f59e0b',
                danger: '#ef4444',
                info: '#06b6d4'
            }
        };
        return palettes[this.config.style];
    };
    /**
     * Génère le HTML du template e-learning
     */
    ELearningTemplate.prototype.generateHTMLTemplate = function () {
        var colors = this.generateELearningColorPalette();
        return "<!DOCTYPE html>\n<html lang=\"fr\" class=\"scroll-smooth\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(this.config.platformName, " - Plateforme E-Learning</title>\n    <meta name=\"description\" content=\"").concat(this.config.platformName, " - Apprenez \u00E0 votre rythme avec nos formations en ligne. Cours interactifs, certificats reconnus.\">\n    \n    <!-- Fonts -->\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n    \n    <!-- Tailwind CSS -->\n    <script src=\"https://cdn.tailwindcss.com\"></script>\n    <script>\n        tailwind.config = {\n            theme: {\n                extend: {\n                    colors: ").concat(JSON.stringify(colors), ",\n                    fontFamily: {\n                        'sans': ['Inter', 'sans-serif'],\n                        'display': ['Space Grotesk', 'sans-serif'],\n                    }\n                }\n            }\n        }\n    </script>\n    \n    <style>\n        .gradient-learning {\n            background: linear-gradient(135deg, ").concat(colors.primary, " 0%, ").concat(colors.learning, " 100%);\n        }\n        \n        .gradient-text {\n            background: linear-gradient(135deg, ").concat(colors.primary, ", ").concat(colors.secondary, ");\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n        \n        .course-card {\n            background: white;\n            border: 1px solid #e5e7eb;\n            transition: all 0.3s ease;\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .course-card:hover {\n            transform: translateY(-8px);\n            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);\n            border-color: ").concat(colors.primary, ";\n        }\n        \n        .course-card::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 4px;\n            background: linear-gradient(90deg, ").concat(colors.primary, ", ").concat(colors.secondary, ");\n            transform: scaleX(0);\n            transition: transform 0.3s ease;\n        }\n        \n        .course-card:hover::before {\n            transform: scaleX(1);\n        }\n        \n        .progress-bar {\n            background: linear-gradient(90deg, ").concat(colors.success, ", ").concat(colors.secondary, ");\n        }\n        \n        .learning-path {\n            background: linear-gradient(45deg, ").concat(colors.learning, "20, ").concat(colors.primary, "20);\n        }\n        \n        .stats-card {\n            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);\n            border: 1px solid #e2e8f0;\n        }\n    </style>\n</head>\n<body class=\"font-sans bg-gray-50\">\n    \n    <!-- Navigation -->\n    <nav class=\"fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"flex justify-between items-center h-16\">\n                <div class=\"flex-shrink-0\">\n                    <h1 class=\"text-xl font-bold font-display text-primary\">\n                        ").concat(this.config.platformName, "\n                    </h1>\n                    <p class=\"text-xs text-muted\">E-Learning Platform</p>\n                </div>\n                <div class=\"hidden md:flex space-x-8\">\n                    <a href=\"#accueil\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Accueil</a>\n                    <a href=\"#cours\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Cours</a>\n                    <a href=\"#parcours\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Parcours</a>\n                    <a href=\"#instructeurs\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Instructeurs</a>\n                    <a href=\"#contact\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Contact</a>\n                    <a href=\"#inscription\" class=\"gradient-learning text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold\">\n                        Commencer gratuitement\n                    </a>\n                </div>\n            </div>\n        </div>\n    </nav>\n\n    <!-- Hero Section -->\n    <section id=\"accueil\" class=\"pt-16 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]\">\n                <div>\n                    <div class=\"inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6\">\n                        <span class=\"text-primary font-semibold text-sm\">\uD83C\uDF93 ").concat(this.getAudienceLabel(), " certifi\u00E9s</span>\n                    </div>\n                    \n                    <h1 class=\"text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6 leading-tight\">\n                        Apprenez\n                        <span class=\"gradient-text block\">\u00E0 votre rythme</span>\n                    </h1>\n                    \n                    <p class=\"text-xl text-gray-600 mb-8 leading-relaxed\">\n                        D\u00E9couvrez notre plateforme d'apprentissage interactive avec plus de 1000 cours, \n                        des projets pratiques et un accompagnement personnalis\u00E9.\n                    </p>\n                    \n                    <div class=\"flex flex-col sm:flex-row gap-4 mb-12\">\n                        <a href=\"#inscription\" class=\"gradient-learning text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center\">\n                            Commencer maintenant\n                        </a>\n                        <a href=\"#cours\" class=\"border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center\">\n                            Explorer les cours\n                        </a>\n                    </div>\n                    \n                    <!-- Stats d'apprentissage -->\n                    <div class=\"grid grid-cols-3 gap-6\">\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary\">50k+</div>\n                            <div class=\"text-sm text-muted\">\u00C9tudiants actifs</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary\">1000+</div>\n                            <div class=\"text-sm text-muted\">Cours disponibles</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary\">95%</div>\n                            <div class=\"text-sm text-muted\">Taux de r\u00E9ussite</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <img src=\"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" \n                         alt=\"\u00C9tudiant apprenant en ligne\" \n                         class=\"rounded-2xl shadow-2xl\">\n                    \n                    <!-- Badge certification -->\n                    <div class=\"absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl\">\n                        <div class=\"text-center\">\n                            <div class=\"text-2xl\">\uD83C\uDFC6</div>\n                            <div class=\"text-sm font-semibold\">Certifications</div>\n                            <div class=\"text-xs text-muted\">reconnues</div>\n                        </div>\n                    </div>\n                    \n                    <!-- Badge progression -->\n                    <div class=\"absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg\">\n                        <div class=\"flex items-center space-x-3\">\n                            <div class=\"w-12 h-12 relative\">\n                                <svg class=\"w-12 h-12 transform -rotate-90\">\n                                    <circle cx=\"24\" cy=\"24\" r=\"20\" stroke=\"#e5e7eb\" stroke-width=\"4\" fill=\"transparent\"/>\n                                    <circle cx=\"24\" cy=\"24\" r=\"20\" stroke=\"").concat(colors.success, "\" stroke-width=\"4\" fill=\"transparent\" \n                                            stroke-dasharray=\"125.6\" stroke-dashoffset=\"31.4\"/>\n                                </svg>\n                                <div class=\"absolute inset-0 flex items-center justify-center text-xs font-bold\">75%</div>\n                            </div>\n                            <div>\n                                <div class=\"font-semibold text-xs\">Progression</div>\n                                <div class=\"text-xs text-muted\">En cours</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Cours populaires -->\n    <section id=\"cours\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4\">\n                    Cours <span class=\"gradient-text\">Populaires</span>\n                </h2>\n                <p class=\"text-xl text-gray-600 max-w-3xl mx-auto\">\n                    D\u00E9couvrez les formations les plus demand\u00E9es par notre communaut\u00E9\n                </p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateCourseCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Parcours d'apprentissage -->\n    <section id=\"parcours\" class=\"py-20 learning-path\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4\">\n                    Parcours <span class=\"gradient-text\">Guid\u00E9s</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Progressez \u00E9tape par \u00E9tape vers vos objectifs</p>\n            </div>\n            \n            <div class=\"grid lg:grid-cols-2 gap-12 items-center\">\n                <div>\n                    <div class=\"space-y-8\">\n                        ").concat(this.generateLearningPathFeatures(), "\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <img src=\"https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" \n                         alt=\"Parcours d'apprentissage\" \n                         class=\"rounded-2xl shadow-2xl\">\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Instructeurs -->\n    <section id=\"instructeurs\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4\">\n                    Nos <span class=\"gradient-text\">Instructeurs</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Experts reconnus dans leur domaine</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-4 gap-8\">\n                ").concat(this.generateInstructorCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- T\u00E9moignages -->\n    <section class=\"py-20 bg-gray-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4\">\n                    T\u00E9moignages <span class=\"gradient-text\">\u00C9tudiants</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Ils ont transform\u00E9 leur carri\u00E8re gr\u00E2ce \u00E0 nos formations</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateTestimonials(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Inscription -->\n    <section id=\"inscription\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid lg:grid-cols-2 gap-12\">\n                <!-- Avantages -->\n                <div>\n                    <h3 class=\"text-2xl font-bold font-display text-gray-900 mb-6\">Pourquoi nous choisir ?</h3>\n                    <div class=\"space-y-6\">\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83C\uDFAF</div>\n                            <div>\n                                <p class=\"font-semibold\">Apprentissage personnalis\u00E9</p>\n                                <p class=\"text-gray-600\">IA qui s'adapte \u00E0 votre rythme et style d'apprentissage</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83C\uDFC6</div>\n                            <div>\n                                <p class=\"font-semibold\">Certificats reconnus</p>\n                                <p class=\"text-gray-600\">Valid\u00E9s par l'industrie et les employeurs</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDC65</div>\n                            <div>\n                                <p class=\"font-semibold\">Communaut\u00E9 active</p>\n                                <p class=\"text-gray-600\">Entraide et networking avec 50k+ \u00E9tudiants</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCF1</div>\n                            <div>\n                                <p class=\"font-semibold\">Accessible partout</p>\n                                <p class=\"text-gray-600\">Application mobile et contenu offline</p>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <!-- Prix -->\n                    <div class=\"mt-8 p-6 bg-primary/5 rounded-lg\">\n                        <h4 class=\"font-semibold text-gray-900 mb-4\">\uD83D\uDCB0 Tarifs transparents</h4>\n                        <div class=\"grid grid-cols-2 gap-4 text-sm\">\n                            <div>\u2713 Essai gratuit 7 jours</div>\n                            <div>\u2713 Annulation \u00E0 tout moment</div>\n                            <div>\u2713 Acc\u00E8s vie enti\u00E8re aux cours achet\u00E9s</div>\n                            <div>\u2713 Garantie satisfait ou rembours\u00E9</div>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Formulaire d'inscription -->\n                <div>\n                    <div class=\"course-card p-8 rounded-2xl\">\n                        <h3 class=\"text-2xl font-bold font-display text-gray-900 mb-6\">\n                            Commencez gratuitement \uD83D\uDE80\n                        </h3>\n                        <form class=\"space-y-6\">\n                            <div class=\"grid grid-cols-2 gap-4\">\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Pr\u00E9nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Email</label>\n                                <input type=\"email\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Mot de passe</label>\n                                <input type=\"password\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Domaine d'int\u00E9r\u00EAt</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    <option>D\u00E9veloppement web</option>\n                                    <option>Data Science</option>\n                                    <option>Design UX/UI</option>\n                                    <option>Marketing digital</option>\n                                    <option>Business</option>\n                                    <option>Autre</option>\n                                </select>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Niveau actuel</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    <option>D\u00E9butant</option>\n                                    <option>Interm\u00E9diaire</option>\n                                    <option>Avanc\u00E9</option>\n                                    <option>Expert</option>\n                                </select>\n                            </div>\n                            <button type=\"submit\" class=\"w-full gradient-learning text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity\">\n                                Cr\u00E9er mon compte gratuit\n                            </button>\n                            <p class=\"text-xs text-gray-500 text-center\">\n                                7 jours gratuits \u2022 Annulation \u00E0 tout moment \u2022 Acc\u00E8s imm\u00E9diat\n                            </p>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->\n    <footer class=\"bg-gray-900 text-white py-12\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid md:grid-cols-4 gap-8\">\n                <div>\n                    <h3 class=\"text-xl font-bold font-display mb-4\">").concat(this.config.platformName, "</h3>\n                    <p class=\"text-gray-300\">Plateforme d'apprentissage en ligne nouvelle g\u00E9n\u00E9ration</p>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Cat\u00E9gories</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>D\u00E9veloppement</li>\n                        <li>Design</li>\n                        <li>Business</li>\n                        <li>Marketing</li>\n                        <li>Data Science</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Support</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Centre d'aide</li>\n                        <li>Contact</li>\n                        <li>FAQ</li>\n                        <li>Communaut\u00E9</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">L\u00E9gal</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Conditions d'utilisation</li>\n                        <li>Politique de confidentialit\u00E9</li>\n                        <li>Cookies</li>\n                        <li>Mentions l\u00E9gales</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"border-t border-gray-700 mt-8 pt-8 text-center text-gray-300\">\n                <p>&copy; 2024 ").concat(this.config.platformName, ". Tous droits r\u00E9serv\u00E9s.</p>\n            </div>\n        </div>\n    </footer>\n\n    <script>\n        // Smooth scroll\n        document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {\n            anchor.addEventListener('click', function (e) {\n                e.preventDefault();\n                const target = document.querySelector(this.getAttribute('href'));\n                if (target) {\n                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n                }\n            });\n        });\n\n        // Progress bar animation\n        const progressBars = document.querySelectorAll('.progress-bar');\n        const animateProgress = () => {\n            progressBars.forEach(bar => {\n                const width = bar.dataset.progress;\n                bar.style.width = '0%';\n                setTimeout(() => {\n                    bar.style.width = width + '%';\n                }, 100);\n            });\n        };\n\n        // Observer pour d\u00E9clencher les animations\n        const observer = new IntersectionObserver((entries) => {\n            entries.forEach(entry => {\n                if (entry.isIntersecting) {\n                    animateProgress();\n                }\n            });\n        });\n\n        if (progressBars.length > 0) {\n            observer.observe(progressBars[0]);\n        }\n    </script>\n</body>\n</html>");
    };
    /**
     * Génère les cartes de cours
     */
    ELearningTemplate.prototype.generateCourseCards = function () {
        var courses = [
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
        return courses.map(function (course) { return "\n      <div class=\"course-card rounded-xl overflow-hidden\">\n          <div class=\"relative\">\n              <img src=\"".concat(course.image, "\" alt=\"").concat(course.title, "\" class=\"w-full h-48 object-cover\">\n              <div class=\"absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold\">\n                  ").concat(course.level, "\n              </div>\n              ").concat(course.progress > 0 ? "\n                  <div class=\"absolute bottom-0 left-0 right-0 bg-white/90 p-2\">\n                      <div class=\"flex justify-between text-xs mb-1\">\n                          <span>Progression</span>\n                          <span>".concat(course.progress, "%</span>\n                      </div>\n                      <div class=\"w-full bg-gray-200 rounded-full h-2\">\n                          <div class=\"progress-bar h-2 rounded-full\" data-progress=\"").concat(course.progress, "\"></div>\n                      </div>\n                  </div>\n              ") : '', "\n          </div>\n          <div class=\"p-6\">\n              <h3 class=\"text-lg font-semibold text-gray-900 mb-2\">").concat(course.title, "</h3>\n              <p class=\"text-sm text-gray-600 mb-3\">Par ").concat(course.instructor, "</p>\n              \n              <div class=\"flex items-center justify-between text-sm text-gray-500 mb-4\">\n                  <span>\u23F1\uFE0F ").concat(course.duration, "</span>\n                  <span>\uD83D\uDC65 ").concat(course.students, "</span>\n                  <span>\u2B50 ").concat(course.rating, "</span>\n              </div>\n              \n              <div class=\"flex items-center justify-between\">\n                  <span class=\"text-xl font-bold text-primary\">").concat(course.price, "</span>\n                  <button class=\"bg-primary text-white px-4 py-2 rounded-lg hover:bg-learning transition-colors\">\n                      ").concat(course.progress > 0 ? 'Continuer' : 'S\'inscrire', "\n                  </button>\n              </div>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les fonctionnalités de parcours d'apprentissage
     */
    ELearningTemplate.prototype.generateLearningPathFeatures = function () {
        var features = [
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
        return features.map(function (feature) { return "\n      <div class=\"flex items-start space-x-4\">\n          <div class=\"text-3xl\">".concat(feature.icon, "</div>\n          <div>\n              <h3 class=\"text-xl font-semibold text-gray-900 mb-2\">").concat(feature.title, "</h3>\n              <p class=\"text-gray-600\">").concat(feature.description, "</p>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les cartes d'instructeurs
     */
    ELearningTemplate.prototype.generateInstructorCards = function () {
        var instructors = [
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
        return instructors.map(function (instructor) { return "\n      <div class=\"course-card p-6 rounded-xl text-center\">\n          <img src=\"".concat(instructor.image, "\" alt=\"").concat(instructor.name, "\" class=\"w-20 h-20 rounded-full mx-auto mb-4 object-cover\">\n          <h3 class=\"text-lg font-semibold text-gray-900 mb-2\">").concat(instructor.name, "</h3>\n          <p class=\"text-primary font-medium mb-2\">").concat(instructor.speciality, "</p>\n          <div class=\"text-sm text-gray-600 space-y-1\">\n              <p>").concat(instructor.experience, " d'exp\u00E9rience</p>\n              <p>").concat(instructor.students, " \u00E9tudiants</p>\n              <p>\u2B50 ").concat(instructor.rating, "/5</p>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les témoignages
     */
    ELearningTemplate.prototype.generateTestimonials = function () {
        var testimonials = [
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
        return testimonials.map(function (testimonial) { return "\n      <div class=\"course-card p-6 rounded-xl\">\n          <div class=\"flex text-warning mb-4\">\n              ".concat('★'.repeat(testimonial.rating), "\n          </div>\n          <p class=\"text-gray-600 mb-4 italic\">\"").concat(testimonial.text, "\"</p>\n          <div>\n              <p class=\"font-semibold text-gray-900\">").concat(testimonial.author, "</p>\n              <p class=\"text-sm text-muted\">").concat(testimonial.role, "</p>\n              <p class=\"text-xs text-primary mt-1\">Cours: ").concat(testimonial.course, "</p>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Utilitaires
     */
    ELearningTemplate.prototype.getAudienceLabel = function () {
        var labels = {
            students: 'Étudiants',
            professionals: 'Professionnels',
            all: 'Apprenants',
            children: 'Enfants'
        };
        return labels[this.config.targetAudience] || 'Apprenants';
    };
    return ELearningTemplate;
}());
exports.ELearningTemplate = ELearningTemplate;
exports.default = ELearningTemplate;
