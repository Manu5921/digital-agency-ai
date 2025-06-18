"use strict";
/**
 * Template Secteur Santé - Phase 2 Design Agent
 * Templates pour cliniques, cabinets médicaux, centres de santé
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanteTemplate = void 0;
var SanteTemplate = /** @class */ (function () {
    function SanteTemplate(config) {
        this.config = config;
    }
    /**
     * Génère la palette couleurs santé selon le style
     */
    SanteTemplate.prototype.generateHealthColorPalette = function () {
        var palettes = {
            classique: {
                primary: '#2563eb', // Bleu médical professionnel
                secondary: '#10b981', // Vert santé
                accent: '#059669', // Vert foncé
                trust: '#1e40af', // Bleu confiance
                calm: '#e0f2fe', // Bleu très clair apaisant
                background: '#ffffff',
                text: '#1f2937',
                muted: '#6b7280',
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444'
            },
            moderne: {
                primary: '#0ea5e9', // Bleu moderne
                secondary: '#06b6d4', // Cyan
                accent: '#8b5cf6', // Violet moderne
                trust: '#3b82f6', // Bleu tech
                calm: '#f0f9ff', // Bleu ultra clair
                background: '#fafafa',
                text: '#111827',
                muted: '#64748b',
                success: '#22c55e',
                warning: '#eab308',
                danger: '#f87171'
            },
            minimaliste: {
                primary: '#374151', // Gris anthracite
                secondary: '#059669', // Vert minimaliste
                accent: '#d1d5db', // Gris clair
                trust: '#4b5563', // Gris moyen
                calm: '#f9fafb', // Gris ultra clair
                background: '#ffffff',
                text: '#1f2937',
                muted: '#9ca3af',
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444'
            }
        };
        return palettes[this.config.style];
    };
    /**
     * Génère le HTML du template santé
     */
    SanteTemplate.prototype.generateHTMLTemplate = function () {
        var colors = this.generateHealthColorPalette();
        return "<!DOCTYPE html>\n<html lang=\"fr\" class=\"scroll-smooth\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(this.config.businessName, " - ").concat(this.config.speciality, "</title>\n    <meta name=\"description\" content=\"Cabinet m\u00E9dical ").concat(this.config.speciality, " - ").concat(this.config.businessName, ". Soins de qualit\u00E9, \u00E9quipe professionnelle, prise de rendez-vous en ligne.\">\n    \n    <!-- Fonts -->\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&display=swap\" rel=\"stylesheet\">\n    \n    <!-- Tailwind CSS -->\n    <script src=\"https://cdn.tailwindcss.com\"></script>\n    <script>\n        tailwind.config = {\n            theme: {\n                extend: {\n                    colors: ").concat(JSON.stringify(colors), ",\n                    fontFamily: {\n                        'sans': ['Inter', 'sans-serif'],\n                        'serif': ['Merriweather', 'serif'],\n                    }\n                }\n            }\n        }\n    </script>\n    \n    <style>\n        .gradient-health {\n            background: linear-gradient(135deg, ").concat(colors.primary, " 0%, ").concat(colors.secondary, " 100%);\n        }\n        \n        .card-hover {\n            transition: all 0.3s ease;\n        }\n        \n        .card-hover:hover {\n            transform: translateY(-4px);\n            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);\n        }\n        \n        .trust-indicator {\n            background: linear-gradient(45deg, ").concat(colors.trust, ", ").concat(colors.secondary, ");\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n    </style>\n</head>\n<body class=\"font-sans bg-gray-50\">\n    \n    <!-- Navigation -->\n    <nav class=\"fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm\">\n        <div class=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"flex justify-between items-center h-16\">\n                <div class=\"flex-shrink-0\">\n                    <h1 class=\"text-xl font-bold text-primary\">\n                        ").concat(this.config.businessName, "\n                    </h1>\n                    <p class=\"text-sm text-muted\">").concat(this.config.speciality, "</p>\n                </div>\n                <div class=\"hidden md:flex space-x-8\">\n                    <a href=\"#accueil\" class=\"text-gray-700 hover:text-primary transition-colors\">Accueil</a>\n                    <a href=\"#services\" class=\"text-gray-700 hover:text-primary transition-colors\">Services</a>\n                    <a href=\"#equipe\" class=\"text-gray-700 hover:text-primary transition-colors\">\u00C9quipe</a>\n                    <a href=\"#contact\" class=\"text-gray-700 hover:text-primary transition-colors\">Contact</a>\n                    <a href=\"#rdv\" class=\"bg-primary text-white px-6 py-2 rounded-full hover:bg-trust transition-colors\">\n                        Prendre RDV\n                    </a>\n                </div>\n            </div>\n        </div>\n    </nav>\n\n    <!-- Hero Section -->\n    <section id=\"accueil\" class=\"pt-16 pb-20 bg-calm\">\n        <div class=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid md:grid-cols-2 gap-12 items-center min-h-[80vh]\">\n                <div>\n                    <h1 class=\"text-4xl md:text-6xl font-bold text-gray-900 mb-6\">\n                        Votre sant\u00E9, \n                        <span class=\"trust-indicator\">notre priorit\u00E9</span>\n                    </h1>\n                    <p class=\"text-xl text-gray-600 mb-8 leading-relaxed\">\n                        Cabinet m\u00E9dical moderne sp\u00E9cialis\u00E9 en ").concat(this.config.speciality, ". \n                        Nous vous accompagnons avec expertise et bienveillance.\n                    </p>\n                    <div class=\"flex flex-col sm:flex-row gap-4\">\n                        <a href=\"#rdv\" class=\"bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-trust transition-all transform hover:scale-105\">\n                            Prendre rendez-vous\n                        </a>\n                        <a href=\"#services\" class=\"border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all\">\n                            Nos services\n                        </a>\n                    </div>\n                    \n                    <!-- Indicateurs de confiance -->\n                    <div class=\"mt-12 grid grid-cols-3 gap-6\">\n                        <div class=\"text-center\">\n                            <div class=\"text-2xl font-bold text-primary\">15+</div>\n                            <div class=\"text-sm text-muted\">Ann\u00E9es d'exp\u00E9rience</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-2xl font-bold text-primary\">2000+</div>\n                            <div class=\"text-sm text-muted\">Patients satisfaits</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-2xl font-bold text-primary\">24h/7j</div>\n                            <div class=\"text-sm text-muted\">Urgences</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <img src=\"https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" \n                         alt=\"Cabinet m\u00E9dical moderne\" \n                         class=\"rounded-2xl shadow-2xl\">\n                    \n                    <!-- Badge certification -->\n                    <div class=\"absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg\">\n                        <div class=\"flex items-center space-x-3\">\n                            <div class=\"w-12 h-12 bg-success rounded-full flex items-center justify-center\">\n                                <span class=\"text-white font-bold\">\u2713</span>\n                            </div>\n                            <div>\n                                <div class=\"font-semibold text-gray-900\">Certifi\u00E9</div>\n                                <div class=\"text-sm text-muted\">Ordre des m\u00E9decins</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Services Section -->\n    <section id=\"services\" class=\"py-20 bg-white\">\n        <div class=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold text-gray-900 mb-4\">\n                    Nos <span class=\"trust-indicator\">Services</span>\n                </h2>\n                <p class=\"text-xl text-gray-600 max-w-2xl mx-auto\">\n                    Une gamme compl\u00E8te de soins adapt\u00E9s \u00E0 vos besoins\n                </p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-3 gap-8\">\n                ").concat(this.generateServiceCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- \u00C9quipe Section -->\n    <section id=\"equipe\" class=\"py-20 bg-calm\">\n        <div class=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold text-gray-900 mb-4\">\n                    Notre <span class=\"trust-indicator\">\u00C9quipe</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Professionnels exp\u00E9riment\u00E9s \u00E0 votre service</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateTeamCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- T\u00E9moignages -->\n    <section class=\"py-20 bg-white\">\n        <div class=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold text-gray-900 mb-4\">\n                    T\u00E9moignages <span class=\"trust-indicator\">Patients</span>\n                </h2>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateTestimonials(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Contact & RDV -->\n    <section id=\"contact\" class=\"py-20 bg-calm\">\n        <div class=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid md:grid-cols-2 gap-12\">\n                <!-- Informations -->\n                <div>\n                    <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Informations pratiques</h3>\n                    <div class=\"space-y-4\">\n                        <div class=\"flex items-center\">\n                            <div class=\"w-6 h-6 text-primary mr-4\">\uD83D\uDCCD</div>\n                            <div>\n                                <p class=\"font-semibold\">Adresse</p>\n                                <p class=\"text-gray-600\">123 Avenue de la Sant\u00E9, 75015 Paris</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-center\">\n                            <div class=\"w-6 h-6 text-primary mr-4\">\uD83D\uDCDE</div>\n                            <div>\n                                <p class=\"font-semibold\">T\u00E9l\u00E9phone</p>\n                                <p class=\"text-gray-600\">01 45 67 89 12</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-center\">\n                            <div class=\"w-6 h-6 text-primary mr-4\">\u23F0</div>\n                            <div>\n                                <p class=\"font-semibold\">Horaires</p>\n                                <p class=\"text-gray-600\">Lun-Ven: 8h-19h, Sam: 9h-17h</p>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <!-- Urgences -->\n                    <div class=\"mt-8 p-6 bg-warning/10 rounded-lg border border-warning/20\">\n                        <h4 class=\"font-semibold text-warning mb-2\">\uD83D\uDEA8 Urgences</h4>\n                        <p class=\"text-sm\">Pour les urgences m\u00E9dicales, appelez le 15 ou rendez-vous aux urgences.</p>\n                    </div>\n                </div>\n\n                <!-- Formulaire RDV -->\n                <div id=\"rdv\">\n                    <div class=\"bg-white p-8 rounded-2xl shadow-lg\">\n                        <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Prendre rendez-vous</h3>\n                        <form class=\"space-y-6\">\n                            <div class=\"grid grid-cols-2 gap-4\">\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Pr\u00E9nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Email</label>\n                                <input type=\"email\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">T\u00E9l\u00E9phone</label>\n                                <input type=\"tel\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Type de consultation</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    <option>Consultation g\u00E9n\u00E9rale</option>\n                                    <option>Suivi m\u00E9dical</option>\n                                    <option>Urgence</option>\n                                    <option>Autre</option>\n                                </select>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Message (optionnel)</label>\n                                <textarea rows=\"3\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\" placeholder=\"Pr\u00E9cisez votre demande...\"></textarea>\n                            </div>\n                            <button type=\"submit\" class=\"w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-trust transition-colors\">\n                                Confirmer le rendez-vous\n                            </button>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->\n    <footer class=\"bg-gray-900 text-white py-12\">\n        <div class=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid md:grid-cols-4 gap-8\">\n                <div>\n                    <h3 class=\"text-xl font-bold mb-4\">").concat(this.config.businessName, "</h3>\n                    <p class=\"text-gray-300\">Cabinet m\u00E9dical de confiance depuis 15 ans</p>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Services</h4>\n                    <ul class=\"space-y-2 text-gray-300\">\n                        <li>Consultation g\u00E9n\u00E9rale</li>\n                        <li>M\u00E9decine pr\u00E9ventive</li>\n                        <li>Suivi m\u00E9dical</li>\n                        <li>Urgences</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Contact</h4>\n                    <ul class=\"space-y-2 text-gray-300\">\n                        <li>123 Avenue de la Sant\u00E9</li>\n                        <li>75015 Paris</li>\n                        <li>01 45 67 89 12</li>\n                        <li>contact@cabinet-medical.fr</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Urgences</h4>\n                    <p class=\"text-gray-300 mb-4\">24h/7j pour les urgences m\u00E9dicales</p>\n                    <p class=\"text-warning font-semibold\">SAMU: 15</p>\n                </div>\n            </div>\n            <div class=\"border-t border-gray-700 mt-8 pt-8 text-center text-gray-300\">\n                <p>&copy; 2024 ").concat(this.config.businessName, ". Tous droits r\u00E9serv\u00E9s.</p>\n            </div>\n        </div>\n    </footer>\n\n    <script>\n        // Smooth scroll\n        document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {\n            anchor.addEventListener('click', function (e) {\n                e.preventDefault();\n                const target = document.querySelector(this.getAttribute('href'));\n                if (target) {\n                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n                }\n            });\n        });\n    </script>\n</body>\n</html>");
    };
    /**
     * Génère les cartes de services
     */
    SanteTemplate.prototype.generateServiceCards = function () {
        var services = [
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
        return services.map(function (service) { return "\n      <div class=\"card-hover bg-white p-6 rounded-xl shadow-sm border border-gray-100\">\n          <div class=\"text-4xl mb-4\">".concat(service.icon, "</div>\n          <h3 class=\"text-xl font-semibold text-gray-900 mb-3\">").concat(service.title, "</h3>\n          <p class=\"text-gray-600 mb-4\">").concat(service.description, "</p>\n          <a href=\"#rdv\" class=\"text-primary font-semibold hover:text-trust transition-colors\">\n              En savoir plus \u2192\n          </a>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les cartes d'équipe
     */
    SanteTemplate.prototype.generateTeamCards = function () {
        var team = [
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
        return team.map(function (member) { return "\n      <div class=\"card-hover bg-white p-6 rounded-xl shadow-sm text-center\">\n          <img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" class=\"w-24 h-24 rounded-full mx-auto mb-4 object-cover\">\n          <h3 class=\"text-xl font-semibold text-gray-900 mb-2\">").concat(member.name, "</h3>\n          <p class=\"text-primary font-medium mb-1\">").concat(member.role, "</p>\n          <p class=\"text-gray-600 text-sm\">").concat(member.experience, "</p>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les témoignages
     */
    SanteTemplate.prototype.generateTestimonials = function () {
        var testimonials = [
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
        return testimonials.map(function (testimonial) { return "\n      <div class=\"card-hover bg-white p-6 rounded-xl shadow-sm\">\n          <div class=\"flex text-warning mb-4\">\n              ".concat('★'.repeat(testimonial.rating), "\n          </div>\n          <p class=\"text-gray-600 mb-4 italic\">\"").concat(testimonial.text, "\"</p>\n          <p class=\"font-semibold text-gray-900\">").concat(testimonial.author, "</p>\n      </div>\n    "); }).join('');
    };
    return SanteTemplate;
}());
exports.SanteTemplate = SanteTemplate;
exports.default = SanteTemplate;
