"use strict";
/**
 * Template Secteur Finance - Phase 2 Design Agent
 * Templates pour banques, conseillers financiers, assurances, fintech
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceTemplate = void 0;
var FinanceTemplate = /** @class */ (function () {
    function FinanceTemplate(config) {
        this.config = config;
    }
    /**
     * Génère la palette couleurs finance selon le style
     */
    FinanceTemplate.prototype.generateFinanceColorPalette = function () {
        var palettes = {
            classique: {
                primary: '#1e3a8a', // Bleu banque traditionnel
                secondary: '#059669', // Vert monétaire
                accent: '#d97706', // Orange premium
                trust: '#1e40af', // Bleu confiance
                success: '#10b981', // Vert succès
                background: '#ffffff',
                text: '#1f2937',
                muted: '#6b7280',
                warning: '#f59e0b',
                danger: '#ef4444',
                gold: '#fbbf24', // Or premium
                silver: '#9ca3af' // Argent
            },
            moderne: {
                primary: '#3b82f6', // Bleu moderne
                secondary: '#8b5cf6', // Violet fintech
                accent: '#06b6d4', // Cyan tech
                trust: '#1d4ed8', // Bleu digital
                success: '#22c55e', // Vert moderne
                background: '#fafafa',
                text: '#111827',
                muted: '#64748b',
                warning: '#eab308',
                danger: '#f87171',
                gold: '#f59e0b',
                silver: '#94a3b8'
            },
            minimaliste: {
                primary: '#374151', // Gris anthracite
                secondary: '#059669', // Vert simple
                accent: '#6b7280', // Gris accent
                trust: '#4b5563', // Gris foncé
                success: '#10b981', // Vert minimaliste
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
    };
    /**
     * Génère le HTML du template finance
     */
    FinanceTemplate.prototype.generateHTMLTemplate = function () {
        var colors = this.generateFinanceColorPalette();
        return "<!DOCTYPE html>\n<html lang=\"fr\" class=\"scroll-smooth\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(this.config.businessName, " - Services Financiers</title>\n    <meta name=\"description\" content=\"").concat(this.config.businessName, " - Expert en services financiers. Conseil, investissement, \u00E9pargne. Faites confiance \u00E0 notre expertise.\">\n    \n    <!-- Fonts -->\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n    \n    <!-- Tailwind CSS -->\n    <script src=\"https://cdn.tailwindcss.com\"></script>\n    <script>\n        tailwind.config = {\n            theme: {\n                extend: {\n                    colors: ").concat(JSON.stringify(colors), ",\n                    fontFamily: {\n                        'sans': ['Inter', 'sans-serif'],\n                        'serif': ['Playfair Display', 'serif'],\n                    }\n                }\n            }\n        }\n    </script>\n    \n    <style>\n        .gradient-finance {\n            background: linear-gradient(135deg, ").concat(colors.primary, " 0%, ").concat(colors.secondary, " 100%);\n        }\n        \n        .gradient-text {\n            background: linear-gradient(135deg, ").concat(colors.primary, ", ").concat(colors.secondary, ");\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n        \n        .card-premium {\n            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n            border: 1px solid #e2e8f0;\n            transition: all 0.3s ease;\n        }\n        \n        .card-premium:hover {\n            transform: translateY(-8px);\n            box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n            border-color: ").concat(colors.primary, ";\n        }\n        \n        .stats-counter {\n            font-variant-numeric: tabular-nums;\n        }\n        \n        .trust-badge {\n            background: linear-gradient(45deg, ").concat(colors.trust, ", ").concat(colors.success, ");\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n    </style>\n</head>\n<body class=\"font-sans bg-gray-50\">\n    \n    <!-- Navigation -->\n    <nav class=\"fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b border-gray-100\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"flex justify-between items-center h-16\">\n                <div class=\"flex-shrink-0\">\n                    <h1 class=\"text-xl font-bold font-serif text-primary\">\n                        ").concat(this.config.businessName, "\n                    </h1>\n                    <p class=\"text-xs text-muted uppercase tracking-wide\">").concat(this.getServiceTypeLabel(), "</p>\n                </div>\n                <div class=\"hidden md:flex space-x-8\">\n                    <a href=\"#accueil\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Accueil</a>\n                    <a href=\"#services\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Services</a>\n                    <a href=\"#solutions\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Solutions</a>\n                    <a href=\"#expertise\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Expertise</a>\n                    <a href=\"#contact\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Contact</a>\n                    <a href=\"#consultation\" class=\"gradient-finance text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold\">\n                        Consultation gratuite\n                    </a>\n                </div>\n            </div>\n        </div>\n    </nav>\n\n    <!-- Hero Section -->\n    <section id=\"accueil\" class=\"pt-16 pb-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]\">\n                <div>\n                    <div class=\"inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6\">\n                        <span class=\"text-primary font-semibold text-sm\">\uD83C\uDFC6 Certifi\u00E9 AMF & ACPR</span>\n                    </div>\n                    \n                    <h1 class=\"text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight\">\n                        Votre avenir financier\n                        <span class=\"gradient-text block\">commence ici</span>\n                    </h1>\n                    \n                    <p class=\"text-xl text-gray-600 mb-8 leading-relaxed\">\n                        Expertise financi\u00E8re de premier plan. Nous vous accompagnons dans tous vos projets \n                        d'investissement et de gestion patrimoniale avec plus de 15 ans d'exp\u00E9rience.\n                    </p>\n                    \n                    <div class=\"flex flex-col sm:flex-row gap-4 mb-12\">\n                        <a href=\"#consultation\" class=\"gradient-finance text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center\">\n                            Consultation gratuite\n                        </a>\n                        <a href=\"#services\" class=\"border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center\">\n                            D\u00E9couvrir nos services\n                        </a>\n                    </div>\n                    \n                    <!-- Stats financi\u00E8res -->\n                    <div class=\"grid grid-cols-3 gap-6\">\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary stats-counter\">2.5M\u20AC</div>\n                            <div class=\"text-sm text-muted\">Patrimoine g\u00E9r\u00E9</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary stats-counter\">98%</div>\n                            <div class=\"text-sm text-muted\">Clients satisfaits</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary stats-counter\">15+</div>\n                            <div class=\"text-sm text-muted\">Ann\u00E9es d'expertise</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <img src=\"https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" \n                         alt=\"Conseiller financier professionnel\" \n                         class=\"rounded-2xl shadow-2xl\">\n                    \n                    <!-- Badge performance -->\n                    <div class=\"absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl\">\n                        <div class=\"text-center\">\n                            <div class=\"text-2xl font-bold text-success\">+12.5%</div>\n                            <div class=\"text-sm text-muted\">Performance moyenne</div>\n                            <div class=\"text-xs text-success\">\u2197 Ann\u00E9e 2024</div>\n                        </div>\n                    </div>\n                    \n                    <!-- Badge s\u00E9curit\u00E9 -->\n                    <div class=\"absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg\">\n                        <div class=\"flex items-center space-x-2\">\n                            <div class=\"w-8 h-8 bg-success rounded-full flex items-center justify-center\">\n                                <span class=\"text-white text-sm\">\uD83D\uDEE1\uFE0F</span>\n                            </div>\n                            <div>\n                                <div class=\"font-semibold text-xs\">S\u00E9curis\u00E9</div>\n                                <div class=\"text-xs text-muted\">Fonds garantis</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Services Section -->\n    <section id=\"services\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold text-gray-900 mb-4\">\n                    Nos <span class=\"gradient-text\">Services</span> Financiers\n                </h2>\n                <p class=\"text-xl text-gray-600 max-w-3xl mx-auto\">\n                    Solutions sur mesure pour optimiser votre patrimoine et concr\u00E9tiser vos projets\n                </p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateServiceCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Solutions Section -->\n    <section id=\"solutions\" class=\"py-20 bg-gradient-to-br from-blue-50 to-indigo-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold text-gray-900 mb-4\">\n                    Solutions <span class=\"gradient-text\">Personnalis\u00E9es</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Chaque situation est unique, nos solutions aussi</p>\n            </div>\n            \n            <div class=\"grid lg:grid-cols-2 gap-12 items-center\">\n                <div>\n                    <div class=\"space-y-8\">\n                        ").concat(this.generateSolutionFeatures(), "\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <img src=\"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" \n                         alt=\"Analyse financi\u00E8re\" \n                         class=\"rounded-2xl shadow-2xl\">\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Expertise Section -->\n    <section id=\"expertise\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold text-gray-900 mb-4\">\n                    Notre <span class=\"gradient-text\">Expertise</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Une \u00E9quipe de professionnels certifi\u00E9s \u00E0 votre service</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateExpertiseCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- T\u00E9moignages -->\n    <section class=\"py-20 bg-gray-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold text-gray-900 mb-4\">\n                    T\u00E9moignages <span class=\"gradient-text\">Clients</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Ils nous font confiance pour leur avenir financier</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateTestimonials(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Contact & Consultation -->\n    <section id=\"contact\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid lg:grid-cols-2 gap-12\">\n                <!-- Informations -->\n                <div>\n                    <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Prendre contact</h3>\n                    <div class=\"space-y-6\">\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCCD</div>\n                            <div>\n                                <p class=\"font-semibold\">Adresse</p>\n                                <p class=\"text-gray-600\">15 Avenue des Champs-\u00C9lys\u00E9es<br>75008 Paris</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCDE</div>\n                            <div>\n                                <p class=\"font-semibold\">T\u00E9l\u00E9phone</p>\n                                <p class=\"text-gray-600\">01 42 86 15 47</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCE7</div>\n                            <div>\n                                <p class=\"font-semibold\">Email</p>\n                                <p class=\"text-gray-600\">contact@conseil-finance.fr</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\u23F0</div>\n                            <div>\n                                <p class=\"font-semibold\">Horaires</p>\n                                <p class=\"text-gray-600\">Lun-Ven: 9h-18h<br>Sur rendez-vous</p>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <!-- Certifications -->\n                    <div class=\"mt-8 p-6 bg-primary/5 rounded-lg\">\n                        <h4 class=\"font-semibold text-gray-900 mb-4\">\uD83C\uDFC5 Certifications</h4>\n                        <div class=\"grid grid-cols-2 gap-4 text-sm\">\n                            <div>\u2713 AMF (Autorit\u00E9 des March\u00E9s Financiers)</div>\n                            <div>\u2713 ACPR (Contr\u00F4le Prudentiel)</div>\n                            <div>\u2713 CIF (Conseiller en Investissement)</div>\n                            <div>\u2713 CGPI (Conseil Gestion Patrimoine)</div>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Formulaire Consultation -->\n                <div id=\"consultation\">\n                    <div class=\"card-premium p-8 rounded-2xl\">\n                        <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">\n                            Consultation gratuite <span class=\"trust-badge\">\uD83C\uDFAF</span>\n                        </h3>\n                        <form class=\"space-y-6\">\n                            <div class=\"grid grid-cols-2 gap-4\">\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Pr\u00E9nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Email</label>\n                                <input type=\"email\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">T\u00E9l\u00E9phone</label>\n                                <input type=\"tel\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Votre projet</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    <option>Investissement immobilier</option>\n                                    <option>\u00C9pargne et placement</option>\n                                    <option>Assurance vie</option>\n                                    <option>Cr\u00E9dit et financement</option>\n                                    <option>Optimisation fiscale</option>\n                                    <option>Autre projet</option>\n                                </select>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Budget approximatif</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    <option>Moins de 50k\u20AC</option>\n                                    <option>50k\u20AC - 100k\u20AC</option>\n                                    <option>100k\u20AC - 250k\u20AC</option>\n                                    <option>250k\u20AC - 500k\u20AC</option>\n                                    <option>Plus de 500k\u20AC</option>\n                                </select>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Message</label>\n                                <textarea rows=\"3\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\" placeholder=\"D\u00E9crivez votre projet...\"></textarea>\n                            </div>\n                            <button type=\"submit\" class=\"w-full gradient-finance text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity\">\n                                Demander ma consultation gratuite\n                            </button>\n                            <p class=\"text-xs text-gray-500 text-center\">\n                                Consultation sans engagement \u2022 R\u00E9ponse sous 24h \u2022 Donn\u00E9es s\u00E9curis\u00E9es\n                            </p>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->\n    <footer class=\"bg-gray-900 text-white py-12\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid md:grid-cols-4 gap-8\">\n                <div>\n                    <h3 class=\"text-xl font-bold font-serif mb-4\">").concat(this.config.businessName, "</h3>\n                    <p class=\"text-gray-300\">Expert en conseil financier et gestion de patrimoine depuis 15 ans</p>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Services</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Conseil en investissement</li>\n                        <li>Gestion de patrimoine</li>\n                        <li>Assurance vie</li>\n                        <li>Optimisation fiscale</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Contact</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>15 Avenue des Champs-\u00C9lys\u00E9es</li>\n                        <li>75008 Paris</li>\n                        <li>01 42 86 15 47</li>\n                        <li>contact@conseil-finance.fr</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">L\u00E9gal</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Mentions l\u00E9gales</li>\n                        <li>Politique de confidentialit\u00E9</li>\n                        <li>CGV</li>\n                        <li>RGPD</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"border-t border-gray-700 mt-8 pt-8 text-center text-gray-300\">\n                <p>&copy; 2024 ").concat(this.config.businessName, ". Tous droits r\u00E9serv\u00E9s. | Membre AMF & ACPR</p>\n            </div>\n        </div>\n    </footer>\n\n    <script>\n        // Smooth scroll\n        document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {\n            anchor.addEventListener('click', function (e) {\n                e.preventDefault();\n                const target = document.querySelector(this.getAttribute('href'));\n                if (target) {\n                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n                }\n            });\n        });\n\n        // Animation des compteurs\n        const statsCounters = document.querySelectorAll('.stats-counter');\n        const animateCounters = () => {\n            statsCounters.forEach(counter => {\n                const target = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));\n                const increment = target / 100;\n                let current = 0;\n                \n                const updateCounter = () => {\n                    if (current < target) {\n                        current += increment;\n                        const suffix = counter.textContent.replace(/[0-9.]/g, '');\n                        counter.textContent = Math.ceil(current) + suffix;\n                        requestAnimationFrame(updateCounter);\n                    }\n                };\n                updateCounter();\n            });\n        };\n\n        // Observer pour d\u00E9clencher l'animation\n        const observer = new IntersectionObserver((entries) => {\n            entries.forEach(entry => {\n                if (entry.isIntersecting) {\n                    animateCounters();\n                    observer.disconnect();\n                }\n            });\n        });\n\n        observer.observe(document.querySelector('.stats-counter'));\n    </script>\n</body>\n</html>");
    };
    /**
     * Génère les cartes de services
     */
    FinanceTemplate.prototype.generateServiceCards = function () {
        var servicesByType = {
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
        var services = servicesByType[this.config.serviceType] || servicesByType.conseil;
        return services.map(function (service) { return "\n      <div class=\"card-premium p-6 rounded-xl\">\n          <div class=\"text-4xl mb-4\">".concat(service.icon, "</div>\n          <h3 class=\"text-xl font-semibold text-gray-900 mb-3\">").concat(service.title, "</h3>\n          <p class=\"text-gray-600 mb-4\">").concat(service.description, "</p>\n          <a href=\"#consultation\" class=\"text-primary font-semibold hover:text-trust transition-colors\">\n              En savoir plus \u2192\n          </a>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les fonctionnalités de solutions
     */
    FinanceTemplate.prototype.generateSolutionFeatures = function () {
        var features = [
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
        return features.map(function (feature) { return "\n      <div class=\"flex items-start space-x-4\">\n          <div class=\"text-3xl\">".concat(feature.icon, "</div>\n          <div>\n              <h3 class=\"text-xl font-semibold text-gray-900 mb-2\">").concat(feature.title, "</h3>\n              <p class=\"text-gray-600\">").concat(feature.description, "</p>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les cartes d'expertise
     */
    FinanceTemplate.prototype.generateExpertiseCards = function () {
        var experts = [
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
        return experts.map(function (expert) { return "\n      <div class=\"card-premium p-6 rounded-xl text-center\">\n          <img src=\"".concat(expert.image, "\" alt=\"").concat(expert.name, "\" class=\"w-20 h-20 rounded-full mx-auto mb-4 object-cover\">\n          <h3 class=\"text-xl font-semibold text-gray-900 mb-2\">").concat(expert.name, "</h3>\n          <p class=\"text-primary font-medium mb-1\">").concat(expert.role, "</p>\n          <p class=\"text-sm text-muted mb-2\">").concat(expert.certification, "</p>\n          <p class=\"text-xs text-gray-600\">").concat(expert.experience, " d'exp\u00E9rience</p>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les témoignages
     */
    FinanceTemplate.prototype.generateTestimonials = function () {
        var testimonials = [
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
        return testimonials.map(function (testimonial) { return "\n      <div class=\"card-premium p-6 rounded-xl\">\n          <div class=\"flex text-warning mb-4\">\n              ".concat('★'.repeat(testimonial.rating), "\n          </div>\n          <p class=\"text-gray-600 mb-4 italic\">\"").concat(testimonial.text, "\"</p>\n          <div>\n              <p class=\"font-semibold text-gray-900\">").concat(testimonial.author, "</p>\n              <p class=\"text-sm text-muted\">").concat(testimonial.role, "</p>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Utilitaires
     */
    FinanceTemplate.prototype.getServiceTypeLabel = function () {
        var labels = {
            banque: 'Services bancaires',
            conseil: 'Conseil financier',
            assurance: 'Solutions d\'assurance',
            fintech: 'Fintech innovation',
            crypto: 'Cryptomonnaies'
        };
        return labels[this.config.serviceType] || 'Services financiers';
    };
    return FinanceTemplate;
}());
exports.FinanceTemplate = FinanceTemplate;
exports.default = FinanceTemplate;
