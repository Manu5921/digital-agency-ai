"use strict";
/**
 * Template Secteur Immobilier - Phase 2 Design Agent
 * Templates pour agences immobilières, promoteurs, agents indépendants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImmobilierTemplate = void 0;
var ImmobilierTemplate = /** @class */ (function () {
    function ImmobilierTemplate(config) {
        this.config = config;
    }
    /**
     * Génère la palette couleurs immobilier selon le style
     */
    ImmobilierTemplate.prototype.generateRealEstateColorPalette = function () {
        var palettes = {
            classique: {
                primary: '#1e40af', // Bleu professionnel
                secondary: '#059669', // Vert confiance
                accent: '#d97706', // Orange premium
                luxury: '#7c2d12', // Marron luxe
                trust: '#1e3a8a', // Bleu trust
                background: '#ffffff',
                text: '#1f2937',
                muted: '#6b7280',
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444',
                gold: '#fbbf24'
            },
            moderne: {
                primary: '#3b82f6', // Bleu moderne
                secondary: '#06b6d4', // Cyan contemporain
                accent: '#8b5cf6', // Violet innovation
                luxury: '#ec4899', // Rose premium
                trust: '#1d4ed8', // Bleu digital
                background: '#fafafa',
                text: '#111827',
                muted: '#64748b',
                success: '#22c55e',
                warning: '#eab308',
                danger: '#f87171',
                gold: '#f59e0b'
            },
            minimaliste: {
                primary: '#374151', // Gris sophistiqué
                secondary: '#059669', // Vert simple
                accent: '#6b7280', // Gris accent
                luxury: '#4b5563', // Gris luxe
                trust: '#111827', // Noir élégant
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
    };
    /**
     * Génère le HTML du template immobilier
     */
    ImmobilierTemplate.prototype.generateHTMLTemplate = function () {
        var colors = this.generateRealEstateColorPalette();
        return "<!DOCTYPE html>\n<html lang=\"fr\" class=\"scroll-smooth\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(this.config.agencyName, " - Agence Immobili\u00E8re</title>\n    <meta name=\"description\" content=\"").concat(this.config.agencyName, " - Votre expert immobilier. ").concat(this.getServiceTypeDescription(), ". Accompagnement personnalis\u00E9 et professionnel.\">\n    \n    <!-- Fonts -->\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n    \n    <!-- Tailwind CSS -->\n    <script src=\"https://cdn.tailwindcss.com\"></script>\n    <script>\n        tailwind.config = {\n            theme: {\n                extend: {\n                    colors: ").concat(JSON.stringify(colors), ",\n                    fontFamily: {\n                        'sans': ['Inter', 'sans-serif'],\n                        'serif': ['Playfair Display', 'serif'],\n                    }\n                }\n            }\n        }\n    </script>\n    \n    <style>\n        .gradient-realestate {\n            background: linear-gradient(135deg, ").concat(colors.primary, " 0%, ").concat(colors.secondary, " 100%);\n        }\n        \n        .gradient-luxury {\n            background: linear-gradient(135deg, ").concat(colors.luxury, ", ").concat(colors.gold, ");\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n        \n        .property-card {\n            background: white;\n            border: 1px solid #e5e7eb;\n            transition: all 0.3s ease;\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .property-card:hover {\n            transform: translateY(-8px);\n            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);\n            border-color: ").concat(colors.primary, ";\n        }\n        \n        .property-card::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 4px;\n            background: ").concat(colors.gradient || "linear-gradient(90deg, ".concat(colors.primary, ", ").concat(colors.secondary, ")"), ";\n            transform: scaleX(0);\n            transition: transform 0.3s ease;\n        }\n        \n        .property-card:hover::before {\n            transform: scaleX(1);\n        }\n        \n        .price-tag {\n            background: linear-gradient(135deg, ").concat(colors.primary, ", ").concat(colors.secondary, ");\n            color: white;\n            padding: 0.5rem 1rem;\n            border-radius: 0.5rem;\n            font-weight: 600;\n        }\n        \n        .luxury-badge {\n            background: linear-gradient(45deg, ").concat(colors.luxury, ", ").concat(colors.gold, ");\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n        \n        .virtual-tour {\n            position: absolute;\n            top: 1rem;\n            right: 1rem;\n            background: rgba(255, 255, 255, 0.9);\n            backdrop-filter: blur(10px);\n            padding: 0.5rem;\n            border-radius: 0.5rem;\n            transition: all 0.3s ease;\n        }\n        \n        .virtual-tour:hover {\n            background: rgba(255, 255, 255, 1);\n            transform: scale(1.1);\n        }\n    </style>\n</head>\n<body class=\"font-sans bg-gray-50\">\n    \n    <!-- Navigation -->\n    <nav class=\"fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"flex justify-between items-center h-16\">\n                <div class=\"flex-shrink-0\">\n                    <h1 class=\"text-xl font-bold font-serif text-primary\">\n                        ").concat(this.config.agencyName, "\n                    </h1>\n                    <p class=\"text-xs text-muted uppercase tracking-wide\">").concat(this.getServiceTypeLabel(), "</p>\n                </div>\n                <div class=\"hidden md:flex space-x-8\">\n                    <a href=\"#accueil\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Accueil</a>\n                    <a href=\"#biens\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Nos biens</a>\n                    <a href=\"#services\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Services</a>\n                    <a href=\"#equipe\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">\u00C9quipe</a>\n                    <a href=\"#contact\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Contact</a>\n                    <a href=\"#estimation\" class=\"gradient-realestate text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold\">\n                        Estimation gratuite\n                    </a>\n                </div>\n            </div>\n        </div>\n    </nav>\n\n    <!-- Hero Section -->\n    <section id=\"accueil\" class=\"pt-16 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]\">\n                <div>\n                    <div class=\"inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6\">\n                        <span class=\"text-primary font-semibold text-sm\">\uD83C\uDFC6 N\u00B01 Immobilier Local</span>\n                    </div>\n                    \n                    <h1 class=\"text-4xl md:text-6xl font-bold font-serif text-gray-900 mb-6 leading-tight\">\n                        Trouvez votre\n                        <span class=\"gradient-luxury block\">bien id\u00E9al</span>\n                    </h1>\n                    \n                    <p class=\"text-xl text-gray-600 mb-8 leading-relaxed\">\n                        ").concat(this.getServiceTypeDescription(), " Expertise locale, accompagnement personnalis\u00E9 \n                        et plus de 15 ans d'exp\u00E9rience dans l'immobilier.\n                    </p>\n                    \n                    <div class=\"flex flex-col sm:flex-row gap-4 mb-12\">\n                        <a href=\"#biens\" class=\"gradient-realestate text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center\">\n                            D\u00E9couvrir nos biens\n                        </a>\n                        <a href=\"#estimation\" class=\"border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center\">\n                            Estimation gratuite\n                        </a>\n                    </div>\n                    \n                    <!-- Stats immobili\u00E8res -->\n                    <div class=\"grid grid-cols-3 gap-6\">\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary\">500+</div>\n                            <div class=\"text-sm text-muted\">Biens vendus</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary\">98%</div>\n                            <div class=\"text-sm text-muted\">Clients satisfaits</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary\">45j</div>\n                            <div class=\"text-sm text-muted\">D\u00E9lai moyen vente</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <img src=\"https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" \n                         alt=\"Propri\u00E9t\u00E9 immobili\u00E8re\" \n                         class=\"rounded-2xl shadow-2xl\">\n                    \n                    <!-- Badge prix -->\n                    <div class=\"absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl\">\n                        <div class=\"text-center\">\n                            <div class=\"text-2xl font-bold text-primary\">\u20AC450k</div>\n                            <div class=\"text-sm text-muted\">Prix moyen</div>\n                            <div class=\"text-xs text-success\">\u2197 +5% cette ann\u00E9e</div>\n                        </div>\n                    </div>\n                    \n                    <!-- Badge visite virtuelle -->\n                    <div class=\"virtual-tour\">\n                        <div class=\"flex items-center space-x-2\">\n                            <div class=\"w-8 h-8 bg-primary rounded-full flex items-center justify-center\">\n                                <span class=\"text-white text-sm\">\uD83E\uDD7D</span>\n                            </div>\n                            <div>\n                                <div class=\"font-semibold text-xs\">Visite 360\u00B0</div>\n                                <div class=\"text-xs text-muted\">Disponible</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Recherche rapide -->\n    <section class=\"py-16 bg-white -mt-10 relative z-10\">\n        <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"bg-white rounded-2xl shadow-2xl p-8 border border-gray-100\">\n                <h3 class=\"text-2xl font-bold text-center text-gray-900 mb-6\">Recherche rapide</h3>\n                <form class=\"grid grid-cols-1 md:grid-cols-4 gap-4\">\n                    <div>\n                        <label class=\"block text-sm font-medium text-gray-700 mb-2\">Type</label>\n                        <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            <option>Appartement</option>\n                            <option>Maison</option>\n                            <option>Terrain</option>\n                            <option>Local commercial</option>\n                        </select>\n                    </div>\n                    <div>\n                        <label class=\"block text-sm font-medium text-gray-700 mb-2\">Ville</label>\n                        <input type=\"text\" placeholder=\"Paris, Lyon...\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                    </div>\n                    <div>\n                        <label class=\"block text-sm font-medium text-gray-700 mb-2\">Budget max</label>\n                        <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            <option>200k\u20AC</option>\n                            <option>400k\u20AC</option>\n                            <option>600k\u20AC</option>\n                            <option>800k\u20AC+</option>\n                        </select>\n                    </div>\n                    <div class=\"flex items-end\">\n                        <button type=\"submit\" class=\"w-full gradient-realestate text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity\">\n                            Rechercher\n                        </button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </section>\n\n    <!-- Biens en vedette -->\n    <section id=\"biens\" class=\"py-20 bg-gray-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4\">\n                    Biens <span class=\"gradient-luxury\">d'Exception</span>\n                </h2>\n                <p class=\"text-xl text-gray-600 max-w-3xl mx-auto\">\n                    D\u00E9couvrez notre s\u00E9lection de propri\u00E9t\u00E9s premium\n                </p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generatePropertyCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Services -->\n    <section id=\"services\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4\">\n                    Nos <span class=\"gradient-luxury\">Services</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Accompagnement complet pour tous vos projets immobiliers</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateServiceCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- \u00C9quipe -->\n    <section id=\"equipe\" class=\"py-20 bg-gray-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4\">\n                    Notre <span class=\"gradient-luxury\">\u00C9quipe</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Experts immobiliers \u00E0 votre service</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-4 gap-8\">\n                ").concat(this.generateTeamCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- T\u00E9moignages -->\n    <section class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4\">\n                    T\u00E9moignages <span class=\"gradient-luxury\">Clients</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Ils nous ont fait confiance pour leur projet immobilier</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateTestimonials(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Contact & Estimation -->\n    <section id=\"contact\" class=\"py-20 bg-gray-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid lg:grid-cols-2 gap-12\">\n                <!-- Informations -->\n                <div>\n                    <h3 class=\"text-2xl font-bold font-serif text-gray-900 mb-6\">Nous contacter</h3>\n                    <div class=\"space-y-6\">\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCCD</div>\n                            <div>\n                                <p class=\"font-semibold\">Adresse</p>\n                                <p class=\"text-gray-600\">15 Avenue Victor Hugo<br>75016 Paris</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCDE</div>\n                            <div>\n                                <p class=\"font-semibold\">T\u00E9l\u00E9phone</p>\n                                <p class=\"text-gray-600\">01 42 75 83 92</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCE7</div>\n                            <div>\n                                <p class=\"font-semibold\">Email</p>\n                                <p class=\"text-gray-600\">contact@agence-immobilier.fr</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\u23F0</div>\n                            <div>\n                                <p class=\"font-semibold\">Horaires</p>\n                                <p class=\"text-gray-600\">Lun-Sam: 9h-19h<br>Dimanche sur RDV</p>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <!-- Certifications -->\n                    <div class=\"mt-8 p-6 bg-primary/5 rounded-lg\">\n                        <h4 class=\"font-semibold text-gray-900 mb-4\">\uD83C\uDFC5 Certifications</h4>\n                        <div class=\"grid grid-cols-2 gap-4 text-sm\">\n                            <div>\u2713 Carte professionnelle CCIAA</div>\n                            <div>\u2713 Garantie financi\u00E8re CEGC</div>\n                            <div>\u2713 Assurance RC professionnelle</div>\n                            <div>\u2713 Membre FNAIM</div>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Formulaire Estimation -->\n                <div id=\"estimation\">\n                    <div class=\"property-card p-8 rounded-2xl\">\n                        <h3 class=\"text-2xl font-bold font-serif text-gray-900 mb-6\">\n                            Estimation gratuite <span class=\"luxury-badge\">\uD83D\uDC8E</span>\n                        </h3>\n                        <form class=\"space-y-6\">\n                            <div class=\"grid grid-cols-2 gap-4\">\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Pr\u00E9nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Email</label>\n                                <input type=\"email\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">T\u00E9l\u00E9phone</label>\n                                <input type=\"tel\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Type de bien</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    <option>Appartement</option>\n                                    <option>Maison</option>\n                                    <option>Terrain</option>\n                                    <option>Local commercial</option>\n                                    <option>Immeuble</option>\n                                </select>\n                            </div>\n                            <div class=\"grid grid-cols-2 gap-4\">\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Surface (m\u00B2)</label>\n                                    <input type=\"number\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Pi\u00E8ces</label>\n                                    <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                        <option>1-2 pi\u00E8ces</option>\n                                        <option>3-4 pi\u00E8ces</option>\n                                        <option>5+ pi\u00E8ces</option>\n                                    </select>\n                                </div>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Adresse du bien</label>\n                                <input type=\"text\" placeholder=\"Rue, ville, code postal\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <button type=\"submit\" class=\"w-full gradient-realestate text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity\">\n                                Obtenir mon estimation gratuite\n                            </button>\n                            <p class=\"text-xs text-gray-500 text-center\">\n                                Estimation sous 24h \u2022 Sans engagement \u2022 Donn\u00E9es confidentielles\n                            </p>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->\n    <footer class=\"bg-gray-900 text-white py-12\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid md:grid-cols-4 gap-8\">\n                <div>\n                    <h3 class=\"text-xl font-bold font-serif mb-4\">").concat(this.config.agencyName, "</h3>\n                    <p class=\"text-gray-300\">Votre expert immobilier de confiance depuis 15 ans</p>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Services</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Vente immobili\u00E8re</li>\n                        <li>Location</li>\n                        <li>Gestion locative</li>\n                        <li>Estimation gratuite</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Contact</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>15 Avenue Victor Hugo</li>\n                        <li>75016 Paris</li>\n                        <li>01 42 75 83 92</li>\n                        <li>contact@agence-immobilier.fr</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">L\u00E9gal</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Mentions l\u00E9gales</li>\n                        <li>CGV</li>\n                        <li>Politique de confidentialit\u00E9</li>\n                        <li>RGPD</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"border-t border-gray-700 mt-8 pt-8 text-center text-gray-300\">\n                <p>&copy; 2024 ").concat(this.config.agencyName, ". Tous droits r\u00E9serv\u00E9s. | Carte professionnelle n\u00B0").concat(Math.random().toString().slice(2, 12), "</p>\n            </div>\n        </div>\n    </footer>\n\n    <script>\n        // Smooth scroll\n        document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {\n            anchor.addEventListener('click', function (e) {\n                e.preventDefault();\n                const target = document.querySelector(this.getAttribute('href'));\n                if (target) {\n                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n                }\n            });\n        });\n\n        // Animation d'apparition des cartes\n        const observerOptions = {\n            threshold: 0.1,\n            rootMargin: '0px 0px -50px 0px'\n        };\n\n        const observer = new IntersectionObserver((entries) => {\n            entries.forEach(entry => {\n                if (entry.isIntersecting) {\n                    entry.target.style.opacity = '1';\n                    entry.target.style.transform = 'translateY(0)';\n                }\n            });\n        }, observerOptions);\n\n        // Observer toutes les cartes de propri\u00E9t\u00E9s\n        document.querySelectorAll('.property-card').forEach(card => {\n            card.style.opacity = '0';\n            card.style.transform = 'translateY(20px)';\n            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';\n            observer.observe(card);\n        });\n    </script>\n</body>\n</html>");
    };
    /**
     * Génère les cartes de propriétés
     */
    ImmobilierTemplate.prototype.generatePropertyCards = function () {
        var properties = [
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
        return properties.map(function (property) { return "\n      <div class=\"property-card rounded-xl overflow-hidden\">\n          <div class=\"relative\">\n              <img src=\"".concat(property.image, "\" alt=\"").concat(property.title, "\" class=\"w-full h-64 object-cover\">\n              <div class=\"absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold\">\n                  ").concat(property.badge, "\n              </div>\n              <div class=\"absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold\">\n                  ").concat(property.type, "\n              </div>\n              <div class=\"virtual-tour\">\n                  <span class=\"text-xs\">\uD83E\uDD7D Visite 360\u00B0</span>\n              </div>\n          </div>\n          <div class=\"p-6\">\n              <h3 class=\"text-xl font-semibold text-gray-900 mb-2\">").concat(property.title, "</h3>\n              <p class=\"text-primary font-medium mb-3\">\uD83D\uDCCD ").concat(property.location, "</p>\n              \n              <div class=\"grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4\">\n                  <div class=\"text-center\">\n                      <div class=\"font-semibold\">").concat(property.surface, "m\u00B2</div>\n                      <div class=\"text-xs\">Surface</div>\n                  </div>\n                  <div class=\"text-center\">\n                      <div class=\"font-semibold\">").concat(property.rooms, "</div>\n                      <div class=\"text-xs\">Pi\u00E8ces</div>\n                  </div>\n                  <div class=\"text-center\">\n                      <div class=\"font-semibold\">").concat(property.floor, "</div>\n                      <div class=\"text-xs\">\u00C9tage</div>\n                  </div>\n              </div>\n              \n              <div class=\"flex flex-wrap gap-2 mb-4\">\n                  ").concat(property.features.map(function (feature) { return "\n                      <span class=\"bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs\">".concat(feature, "</span>\n                  "); }).join(''), "\n              </div>\n              \n              <div class=\"flex items-center justify-between\">\n                  <div class=\"price-tag\">\n                      ").concat(property.price).concat(property.type === 'Location' ? '€/mois' : '€', "\n                  </div>\n                  <button class=\"bg-primary text-white px-4 py-2 rounded-lg hover:bg-trust transition-colors text-sm\">\n                      D\u00E9tails\n                  </button>\n              </div>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les cartes de services
     */
    ImmobilierTemplate.prototype.generateServiceCards = function () {
        var servicesByType = {
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
        var services = servicesByType[this.config.serviceType] || servicesByType.mixte;
        return services.map(function (service) { return "\n      <div class=\"property-card p-6 rounded-xl\">\n          <div class=\"text-4xl mb-4\">".concat(service.icon, "</div>\n          <h3 class=\"text-xl font-semibold text-gray-900 mb-3\">").concat(service.title, "</h3>\n          <p class=\"text-gray-600 mb-4\">").concat(service.description, "</p>\n          <a href=\"#contact\" class=\"text-primary font-semibold hover:text-trust transition-colors\">\n              En savoir plus \u2192\n          </a>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les cartes d'équipe
     */
    ImmobilierTemplate.prototype.generateTeamCards = function () {
        var team = [
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
        return team.map(function (member) { return "\n      <div class=\"property-card p-6 rounded-xl text-center\">\n          <img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" class=\"w-20 h-20 rounded-full mx-auto mb-4 object-cover\">\n          <h3 class=\"text-lg font-semibold text-gray-900 mb-2\">").concat(member.name, "</h3>\n          <p class=\"text-primary font-medium mb-1\">").concat(member.role, "</p>\n          <p class=\"text-sm text-gray-600 mb-2\">").concat(member.speciality, "</p>\n          <p class=\"text-xs text-muted\">").concat(member.experience, " d'exp\u00E9rience</p>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les témoignages
     */
    ImmobilierTemplate.prototype.generateTestimonials = function () {
        var testimonials = [
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
        return testimonials.map(function (testimonial) { return "\n      <div class=\"property-card p-6 rounded-xl\">\n          <div class=\"flex text-warning mb-4\">\n              ".concat('★'.repeat(testimonial.rating), "\n          </div>\n          <p class=\"text-gray-600 mb-4 italic\">\"").concat(testimonial.text, "\"</p>\n          <div>\n              <p class=\"font-semibold text-gray-900\">").concat(testimonial.author, "</p>\n              <p class=\"text-sm text-primary\">").concat(testimonial.transaction, "</p>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Utilitaires
     */
    ImmobilierTemplate.prototype.getServiceTypeLabel = function () {
        var labels = {
            vente: 'Vente immobilière',
            location: 'Location & gestion',
            gestion: 'Gestion locative',
            promotion: 'Promotion immobilière',
            mixte: 'Services complets'
        };
        return labels[this.config.serviceType] || 'Immobilier';
    };
    ImmobilierTemplate.prototype.getServiceTypeDescription = function () {
        var descriptions = {
            vente: 'Spécialistes de la vente immobilière.',
            location: 'Experts en location et gestion locative.',
            gestion: 'Gestionnaires de patrimoine immobilier.',
            promotion: 'Promoteurs immobiliers innovants.',
            mixte: 'Tous services immobiliers.'
        };
        return descriptions[this.config.serviceType] || 'Services immobiliers complets.';
    };
    return ImmobilierTemplate;
}());
exports.ImmobilierTemplate = ImmobilierTemplate;
exports.default = ImmobilierTemplate;
