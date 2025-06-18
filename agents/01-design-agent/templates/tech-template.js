"use strict";
/**
 * Template Secteur Tech - Phase 2 Design Agent
 * Templates pour startups, SaaS, développeurs, agences digitales
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechTemplate = void 0;
var TechTemplate = /** @class */ (function () {
    function TechTemplate(config) {
        this.config = config;
    }
    /**
     * Génère la palette couleurs tech selon le style
     */
    TechTemplate.prototype.generateTechColorPalette = function () {
        var palettes = {
            classique: {
                primary: '#2563eb', // Bleu tech classique
                secondary: '#7c3aed', // Violet innovation
                accent: '#10b981', // Vert succès
                innovation: '#f59e0b', // Orange créativité
                tech: '#06b6d4', // Cyan digital
                background: '#ffffff',
                text: '#1f2937',
                muted: '#6b7280',
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444',
                dark: '#111827'
            },
            moderne: {
                primary: '#6366f1', // Indigo moderne
                secondary: '#ec4899', // Rose créatif
                accent: '#14b8a6', // Teal innovation
                innovation: '#f97316', // Orange vif
                tech: '#8b5cf6', // Violet futuriste
                background: '#fafafa',
                text: '#111827',
                muted: '#64748b',
                success: '#22c55e',
                warning: '#eab308',
                danger: '#f87171',
                dark: '#0f172a'
            },
            minimaliste: {
                primary: '#374151', // Gris tech
                secondary: '#059669', // Vert minimal
                accent: '#6b7280', // Gris accent
                innovation: '#d97706', // Orange subtil
                tech: '#0ea5e9', // Bleu simple
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
    };
    /**
     * Génère le HTML du template tech
     */
    TechTemplate.prototype.generateHTMLTemplate = function () {
        var colors = this.generateTechColorPalette();
        return "<!DOCTYPE html>\n<html lang=\"fr\" class=\"scroll-smooth\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(this.config.companyName, " - ").concat(this.getTechTypeLabel(), "</title>\n    <meta name=\"description\" content=\"").concat(this.config.companyName, " - ").concat(this.getTechTypeDescription(), " Innovation technologique et solutions digitales de pointe.\">\n    \n    <!-- Fonts -->\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n    \n    <!-- Tailwind CSS -->\n    <script src=\"https://cdn.tailwindcss.com\"></script>\n    <script>\n        tailwind.config = {\n            theme: {\n                extend: {\n                    colors: ").concat(JSON.stringify(colors), ",\n                    fontFamily: {\n                        'sans': ['Inter', 'sans-serif'],\n                        'mono': ['JetBrains Mono', 'monospace'],\n                        'display': ['Space Grotesk', 'sans-serif'],\n                    }\n                }\n            }\n        }\n    </script>\n    \n    <style>\n        .gradient-tech {\n            background: linear-gradient(135deg, ").concat(colors.primary, " 0%, ").concat(colors.tech, " 100%);\n        }\n        \n        .gradient-innovation {\n            background: linear-gradient(135deg, ").concat(colors.innovation, ", ").concat(colors.secondary, ");\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n        \n        .tech-card {\n            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n            border: 1px solid #e2e8f0;\n            transition: all 0.3s ease;\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .tech-card::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 2px;\n            background: linear-gradient(90deg, ").concat(colors.primary, ", ").concat(colors.secondary, ", ").concat(colors.tech, ");\n            transform: scaleX(0);\n            transition: transform 0.3s ease;\n        }\n        \n        .tech-card:hover {\n            transform: translateY(-8px);\n            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);\n            border-color: ").concat(colors.primary, ";\n        }\n        \n        .tech-card:hover::before {\n            transform: scaleX(1);\n        }\n        \n        .code-block {\n            background: ").concat(colors.dark, ";\n            color: #e5e7eb;\n            font-family: 'JetBrains Mono', monospace;\n            border-radius: 0.5rem;\n            padding: 1.5rem;\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .code-block::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            height: 30px;\n            background: linear-gradient(90deg, #ef4444, #f59e0b, #10b981);\n            background-size: 200% 100%;\n            animation: colorShift 3s ease-in-out infinite;\n        }\n        \n        @keyframes colorShift {\n            0%, 100% { background-position: 0% 50%; }\n            50% { background-position: 100% 50%; }\n        }\n        \n        .floating-element {\n            animation: float 6s ease-in-out infinite;\n        }\n        \n        @keyframes float {\n            0%, 100% { transform: translateY(0px); }\n            50% { transform: translateY(-20px); }\n        }\n        \n        .tech-grid {\n            background-image: \n                radial-gradient(circle at 1px 1px, ").concat(colors.primary, "20 1px, transparent 0);\n            background-size: 20px 20px;\n        }\n        \n        .glow-effect {\n            box-shadow: 0 0 20px ").concat(colors.primary, "40;\n        }\n        \n        .typing-animation {\n            border-right: 2px solid ").concat(colors.primary, ";\n            white-space: nowrap;\n            overflow: hidden;\n            animation: typing 3s steps(40, end), blink 0.75s step-end infinite;\n        }\n        \n        @keyframes typing {\n            from { width: 0; }\n            to { width: 100%; }\n        }\n        \n        @keyframes blink {\n            from, to { border-color: transparent; }\n            50% { border-color: ").concat(colors.primary, "; }\n        }\n    </style>\n</head>\n<body class=\"font-sans bg-gray-50\">\n    \n    <!-- Navigation -->\n    <nav class=\"fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b border-gray-100\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"flex justify-between items-center h-16\">\n                <div class=\"flex-shrink-0\">\n                    <h1 class=\"text-xl font-bold font-display text-primary\">\n                        ").concat(this.config.companyName, "\n                    </h1>\n                    <p class=\"text-xs text-muted font-mono\">").concat(this.getTechTypeLabel(), "</p>\n                </div>\n                <div class=\"hidden md:flex space-x-8\">\n                    <a href=\"#accueil\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Accueil</a>\n                    <a href=\"#solutions\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Solutions</a>\n                    <a href=\"#technos\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Technologies</a>\n                    <a href=\"#equipe\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">\u00C9quipe</a>\n                    <a href=\"#contact\" class=\"text-gray-700 hover:text-primary transition-colors font-medium\">Contact</a>\n                    <a href=\"#demo\" class=\"gradient-tech text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold\">\n                        Demo gratuite\n                    </a>\n                </div>\n            </div>\n        </div>\n    </nav>\n\n    <!-- Hero Section -->\n    <section id=\"accueil\" class=\"pt-16 pb-20 tech-grid bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden\">\n        <!-- \u00C9l\u00E9ments flottants d\u00E9coratifs -->\n        <div class=\"absolute top-20 left-10 floating-element\">\n            <div class=\"w-16 h-16 bg-primary/10 rounded-lg rotate-12\"></div>\n        </div>\n        <div class=\"absolute top-40 right-20 floating-element\" style=\"animation-delay: 2s;\">\n            <div class=\"w-12 h-12 bg-secondary/10 rounded-full\"></div>\n        </div>\n        <div class=\"absolute bottom-20 left-1/4 floating-element\" style=\"animation-delay: 4s;\">\n            <div class=\"w-8 h-8 bg-tech/10 rounded-lg rotate-45\"></div>\n        </div>\n        \n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative\">\n            <div class=\"grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]\">\n                <div>\n                    <div class=\"inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6\">\n                        <span class=\"text-primary font-semibold text-sm\">\uD83D\uDE80 ").concat(this.getInnovationBadge(), "</span>\n                    </div>\n                    \n                    <h1 class=\"text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6 leading-tight\">\n                        Innovons\n                        <span class=\"gradient-innovation block\">ensemble</span>\n                    </h1>\n                    \n                    <p class=\"text-xl text-gray-600 mb-8 leading-relaxed\">\n                        ").concat(this.getTechTypeDescription(), " Nous transformons vos id\u00E9es en solutions \n                        technologiques performantes avec les derni\u00E8res innovations du march\u00E9.\n                    </p>\n                    \n                    <div class=\"flex flex-col sm:flex-row gap-4 mb-12\">\n                        <a href=\"#demo\" class=\"gradient-tech text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 text-center\">\n                            Demander une d\u00E9mo\n                        </a>\n                        <a href=\"#solutions\" class=\"border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all text-center\">\n                            Voir nos solutions\n                        </a>\n                    </div>\n                    \n                    <!-- Stats tech -->\n                    <div class=\"grid grid-cols-3 gap-6\">\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary font-mono\">99.9%</div>\n                            <div class=\"text-sm text-muted\">Uptime</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary font-mono\">< 100ms</div>\n                            <div class=\"text-sm text-muted\">Latence</div>\n                        </div>\n                        <div class=\"text-center\">\n                            <div class=\"text-3xl font-bold text-primary font-mono\">24/7</div>\n                            <div class=\"text-sm text-muted\">Support</div>\n                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <!-- Code Block Interactif -->\n                    <div class=\"code-block glow-effect\">\n                        <div class=\"text-sm mb-4 text-gray-400\">// ").concat(this.config.companyName, " API</div>\n                        <div class=\"space-y-2 font-mono text-sm\">\n                            <div><span class=\"text-blue-400\">const</span> <span class=\"text-white\">response</span> = <span class=\"text-green-400\">await</span> <span class=\"text-yellow-400\">fetch</span>(<span class=\"text-orange-400\">'").concat(this.getApiExample(), "'</span>);</div>\n                            <div><span class=\"text-blue-400\">const</span> <span class=\"text-white\">data</span> = <span class=\"text-green-400\">await</span> <span class=\"text-white\">response</span>.<span class=\"text-yellow-400\">json</span>();</div>\n                            <div><span class=\"text-purple-400\">console</span>.<span class=\"text-yellow-400\">log</span>(<span class=\"text-orange-400\">'Success:'</span>, <span class=\"text-white\">data</span>);</div>\n                            <div class=\"mt-4 text-green-400 typing-animation\">// \u2705 Innovation made simple</div>\n                        </div>\n                    </div>\n                    \n                    <!-- Badge performance -->\n                    <div class=\"absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl\">\n                        <div class=\"text-center\">\n                            <div class=\"text-2xl font-bold text-success\">\u26A1 Fast</div>\n                            <div class=\"text-sm text-muted\">Performance optimale</div>\n                        </div>\n                    </div>\n                    \n                    <!-- Badge s\u00E9curit\u00E9 -->\n                    <div class=\"absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg\">\n                        <div class=\"flex items-center space-x-2\">\n                            <div class=\"w-8 h-8 bg-success rounded-full flex items-center justify-center\">\n                                <span class=\"text-white text-sm\">\uD83D\uDD12</span>\n                            </div>\n                            <div>\n                                <div class=\"font-semibold text-xs\">S\u00E9curis\u00E9</div>\n                                <div class=\"text-xs text-muted\">SSL/TLS</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Solutions -->\n    <section id=\"solutions\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4\">\n                    Nos <span class=\"gradient-innovation\">Solutions</span>\n                </h2>\n                <p class=\"text-xl text-gray-600 max-w-3xl mx-auto\">\n                    Technologies de pointe pour transformer votre business\n                </p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n                ").concat(this.generateSolutionCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Technologies -->\n    <section id=\"technos\" class=\"py-20 bg-gray-50\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4\">\n                    Stack <span class=\"gradient-innovation\">Technologique</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Technologies modernes et \u00E9prouv\u00E9es</p>\n            </div>\n            \n            <div class=\"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8\">\n                ").concat(this.generateTechStack(), "\n            </div>\n            \n            <!-- Architecture -->\n            <div class=\"mt-16 grid lg:grid-cols-2 gap-12 items-center\">\n                <div>\n                    <h3 class=\"text-2xl font-bold font-display text-gray-900 mb-6\">Architecture Scalable</h3>\n                    <div class=\"space-y-6\">\n                        ").concat(this.generateArchitectureFeatures(), "\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <img src=\"https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" \n                         alt=\"Architecture tech\" \n                         class=\"rounded-2xl shadow-2xl\">\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- \u00C9quipe -->\n    <section id=\"equipe\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4\">\n                    Notre <span class=\"gradient-innovation\">\u00C9quipe</span>\n                </h2>\n                <p class=\"text-xl text-gray-600\">Experts passionn\u00E9s par l'innovation</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-4 gap-8\">\n                ").concat(this.generateTeamCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Pricing / Demo -->\n    <section class=\"py-20 bg-gray-900 text-white relative overflow-hidden\">\n        <!-- Background pattern -->\n        <div class=\"absolute inset-0 opacity-10\">\n            <div class=\"tech-grid h-full\"></div>\n        </div>\n        \n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative\">\n            <div class=\"text-center mb-16\">\n                <h2 class=\"text-3xl md:text-4xl font-bold font-display mb-4\">\n                    Pr\u00EAt \u00E0 <span style=\"color: ").concat(colors.innovation, "\">innover</span> ?\n                </h2>\n                <p class=\"text-xl text-gray-300\">Commencez votre transformation digitale d\u00E8s aujourd'hui</p>\n            </div>\n            \n            <div class=\"grid lg:grid-cols-3 gap-8\">\n                ").concat(this.generatePricingCards(), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Contact -->\n    <section id=\"contact\" class=\"py-20 bg-white\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid lg:grid-cols-2 gap-12\">\n                <!-- Informations -->\n                <div>\n                    <h3 class=\"text-2xl font-bold font-display text-gray-900 mb-6\">Discutons de votre projet</h3>\n                    <div class=\"space-y-6\">\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCE7</div>\n                            <div>\n                                <p class=\"font-semibold\">Email</p>\n                                <p class=\"text-gray-600\">contact@").concat(this.config.companyName.toLowerCase(), ".com</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCAC</div>\n                            <div>\n                                <p class=\"font-semibold\">Chat en direct</p>\n                                <p class=\"text-gray-600\">Support 24/7 pour nos clients</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83D\uDCF1</div>\n                            <div>\n                                <p class=\"font-semibold\">API Documentation</p>\n                                <p class=\"text-gray-600\">docs.").concat(this.config.companyName.toLowerCase(), ".com</p>\n                            </div>\n                        </div>\n                        <div class=\"flex items-start\">\n                            <div class=\"w-6 h-6 text-primary mr-4 mt-1\">\uD83C\uDF0D</div>\n                            <div>\n                                <p class=\"font-semibold\">Global</p>\n                                <p class=\"text-gray-600\">Servers worldwide \u2022 99.9% uptime</p>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <!-- Tech specs -->\n                    <div class=\"mt-8 p-6 bg-primary/5 rounded-lg\">\n                        <h4 class=\"font-semibold text-gray-900 mb-4\">\u26A1 Performance</h4>\n                        <div class=\"grid grid-cols-2 gap-4 text-sm font-mono\">\n                            <div>\uD83D\uDCCA < 100ms latency</div>\n                            <div>\uD83D\uDD04 Auto-scaling</div>\n                            <div>\uD83D\uDEE1\uFE0F Enterprise security</div>\n                            <div>\uD83D\uDCC8 Real-time analytics</div>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Formulaire Demo -->\n                <div id=\"demo\">\n                    <div class=\"tech-card p-8 rounded-2xl\">\n                        <h3 class=\"text-2xl font-bold font-display text-gray-900 mb-6\">\n                            Demander une d\u00E9mo <span style=\"color: ").concat(colors.innovation, "\">\uD83D\uDE80</span>\n                        </h3>\n                        <form class=\"space-y-6\">\n                            <div class=\"grid grid-cols-2 gap-4\">\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Pr\u00E9nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                                <div>\n                                    <label class=\"block text-sm font-medium text-gray-700 mb-2\">Nom</label>\n                                    <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                </div>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Email professionnel</label>\n                                <input type=\"email\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Entreprise</label>\n                                <input type=\"text\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Taille d'\u00E9quipe</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    <option>1-10 employ\u00E9s</option>\n                                    <option>11-50 employ\u00E9s</option>\n                                    <option>51-200 employ\u00E9s</option>\n                                    <option>200+ employ\u00E9s</option>\n                                </select>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Cas d'usage</label>\n                                <select class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\">\n                                    ").concat(this.getUseCaseOptions(), "\n                                </select>\n                            </div>\n                            <div>\n                                <label class=\"block text-sm font-medium text-gray-700 mb-2\">Description du projet</label>\n                                <textarea rows=\"3\" class=\"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent\" placeholder=\"D\u00E9crivez vos besoins...\"></textarea>\n                            </div>\n                            <button type=\"submit\" class=\"w-full gradient-tech text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity\">\n                                Planifier ma d\u00E9mo personnalis\u00E9e\n                            </button>\n                            <p class=\"text-xs text-gray-500 text-center\">\n                                D\u00E9mo gratuite 30min \u2022 R\u00E9ponse sous 2h \u2022 Sans engagement\n                            </p>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->\n    <footer class=\"bg-gray-900 text-white py-12\">\n        <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n            <div class=\"grid md:grid-cols-4 gap-8\">\n                <div>\n                    <h3 class=\"text-xl font-bold font-display mb-4\">").concat(this.config.companyName, "</h3>\n                    <p class=\"text-gray-300\">Innovation technologique pour un futur meilleur</p>\n                    <div class=\"mt-4 flex space-x-4\">\n                        <a href=\"#\" class=\"text-gray-300 hover:text-primary\">GitHub</a>\n                        <a href=\"#\" class=\"text-gray-300 hover:text-primary\">LinkedIn</a>\n                        <a href=\"#\" class=\"text-gray-300 hover:text-primary\">Twitter</a>\n                    </div>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Produits</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>API Platform</li>\n                        <li>Cloud Solutions</li>\n                        <li>AI Services</li>\n                        <li>Mobile SDK</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">D\u00E9veloppeurs</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Documentation</li>\n                        <li>API Reference</li>\n                        <li>Tutorials</li>\n                        <li>Community</li>\n                    </ul>\n                </div>\n                <div>\n                    <h4 class=\"font-semibold mb-4\">Support</h4>\n                    <ul class=\"space-y-2 text-gray-300 text-sm\">\n                        <li>Help Center</li>\n                        <li>Status Page</li>\n                        <li>Contact</li>\n                        <li>Security</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"border-t border-gray-700 mt-8 pt-8 text-center text-gray-300\">\n                <p>&copy; 2024 ").concat(this.config.companyName, ". Tous droits r\u00E9serv\u00E9s. | Made with \u2764\uFE0F and \u2615</p>\n            </div>\n        </div>\n    </footer>\n\n    <script>\n        // Smooth scroll\n        document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {\n            anchor.addEventListener('click', function (e) {\n                e.preventDefault();\n                const target = document.querySelector(this.getAttribute('href'));\n                if (target) {\n                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n                }\n            });\n        });\n\n        // Typing animation restart\n        const typingElement = document.querySelector('.typing-animation');\n        if (typingElement) {\n            setInterval(() => {\n                typingElement.style.animation = 'none';\n                setTimeout(() => {\n                    typingElement.style.animation = 'typing 3s steps(40, end), blink 0.75s step-end infinite';\n                }, 100);\n            }, 6000);\n        }\n\n        // Parallax effect for floating elements\n        window.addEventListener('scroll', () => {\n            const scrolled = window.pageYOffset;\n            const floatingElements = document.querySelectorAll('.floating-element');\n            \n            floatingElements.forEach((element, index) => {\n                const speed = 0.5 + (index * 0.2);\n                element.style.transform = `translateY(${scrolled * speed}px)`;\n            });\n        });\n    </script>\n</body>\n</html>");
    };
    /**
     * Génère les cartes de solutions
     */
    TechTemplate.prototype.generateSolutionCards = function () {
        var solutionsByType = {
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
        var solutions = solutionsByType[this.config.techType] || solutionsByType.startup;
        return solutions.map(function (solution) { return "\n      <div class=\"tech-card p-6 rounded-xl\">\n          <div class=\"text-4xl mb-4\">".concat(solution.icon, "</div>\n          <h3 class=\"text-xl font-semibold text-gray-900 mb-3\">").concat(solution.title, "</h3>\n          <p class=\"text-gray-600 mb-4\">").concat(solution.description, "</p>\n          <a href=\"#demo\" class=\"text-primary font-semibold hover:text-tech transition-colors\">\n              En savoir plus \u2192\n          </a>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère la stack technologique
     */
    TechTemplate.prototype.generateTechStack = function () {
        var technologies = [
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
        return technologies.map(function (tech) { return "\n      <div class=\"tech-card p-4 rounded-lg text-center\">\n          <div class=\"text-3xl mb-2\">".concat(tech.icon, "</div>\n          <h4 class=\"font-semibold text-gray-900 text-sm\">").concat(tech.name, "</h4>\n          <p class=\"text-xs text-muted\">").concat(tech.category, "</p>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les fonctionnalités d'architecture
     */
    TechTemplate.prototype.generateArchitectureFeatures = function () {
        var features = [
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
        return features.map(function (feature) { return "\n      <div class=\"flex items-start space-x-4\">\n          <div class=\"text-3xl\">".concat(feature.icon, "</div>\n          <div>\n              <h4 class=\"text-lg font-semibold text-gray-900 mb-2\">").concat(feature.title, "</h4>\n              <p class=\"text-gray-600\">").concat(feature.description, "</p>\n          </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les cartes d'équipe
     */
    TechTemplate.prototype.generateTeamCards = function () {
        var team = [
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
        return team.map(function (member) { return "\n      <div class=\"tech-card p-6 rounded-xl text-center\">\n          <img src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\" class=\"w-20 h-20 rounded-full mx-auto mb-4 object-cover\">\n          <h3 class=\"text-lg font-semibold text-gray-900 mb-2\">").concat(member.name, "</h3>\n          <p class=\"text-primary font-medium mb-1\">").concat(member.role, "</p>\n          <p class=\"text-sm text-gray-600 mb-3\">").concat(member.speciality, "</p>\n          <a href=\"#\" class=\"text-xs text-muted font-mono hover:text-primary\">@").concat(member.github, "</a>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les cartes de pricing
     */
    TechTemplate.prototype.generatePricingCards = function () {
        var plans = [
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
        return plans.map(function (plan) { return "\n      <div class=\"tech-card p-8 rounded-xl relative ".concat(plan.popular ? 'ring-2 ring-primary' : '', "\">\n          ").concat(plan.popular ? "\n              <div class=\"absolute -top-4 left-1/2 transform -translate-x-1/2\">\n                  <span class=\"gradient-tech text-white px-4 py-2 rounded-full text-sm font-semibold\">\n                      Populaire\n                  </span>\n              </div>\n          " : '', "\n          \n          <div class=\"text-center mb-6\">\n              <h3 class=\"text-xl font-bold text-white mb-2\">").concat(plan.name, "</h3>\n              <div class=\"text-3xl font-bold text-white mb-2\">").concat(plan.price, "</div>\n              <p class=\"text-gray-300\">").concat(plan.description, "</p>\n          </div>\n          \n          <ul class=\"space-y-3 mb-8\">\n              ").concat(plan.features.map(function (feature) { return "\n                  <li class=\"flex items-center text-gray-300\">\n                      <span class=\"text-green-400 mr-3\">\u2713</span>\n                      ".concat(feature, "\n                  </li>\n              "); }).join(''), "\n          </ul>\n          \n          <button class=\"w-full ").concat(plan.popular ? 'gradient-tech' : 'border border-gray-600 hover:border-primary', " text-white py-3 px-6 rounded-lg font-semibold transition-all\">\n              ").concat(plan.cta, "\n          </button>\n      </div>\n    "); }).join('');
    };
    /**
     * Utilitaires
     */
    TechTemplate.prototype.getTechTypeLabel = function () {
        var labels = {
            startup: 'Tech Startup',
            saas: 'SaaS Platform',
            agency: 'Digital Agency',
            dev: 'Development Studio',
            ai: 'AI Solutions',
            blockchain: 'Blockchain & Web3'
        };
        return labels[this.config.techType] || 'Tech Company';
    };
    TechTemplate.prototype.getTechTypeDescription = function () {
        var descriptions = {
            startup: 'Startup technologique innovante.',
            saas: 'Plateforme SaaS de nouvelle génération.',
            agency: 'Agence digitale spécialisée.',
            dev: 'Studio de développement expert.',
            ai: 'Solutions d\'intelligence artificielle.',
            blockchain: 'Experts blockchain et Web3.'
        };
        return descriptions[this.config.techType] || 'Solutions technologiques avancées.';
    };
    TechTemplate.prototype.getInnovationBadge = function () {
        var badges = {
            startup: 'Startup innovante',
            saas: 'SaaS Leader',
            agency: 'Digital Excellence',
            dev: 'Code Experts',
            ai: 'AI Pioneer',
            blockchain: 'Web3 Ready'
        };
        return badges[this.config.techType] || 'Tech Innovation';
    };
    TechTemplate.prototype.getApiExample = function () {
        var examples = {
            startup: '/api/v1/products',
            saas: '/api/v2/analytics',
            agency: '/api/v1/projects',
            dev: '/api/v1/deploy',
            ai: '/api/v1/predict',
            blockchain: '/api/v1/contracts'
        };
        return examples[this.config.techType] || '/api/v1/data';
    };
    TechTemplate.prototype.getUseCaseOptions = function () {
        var useCasesByType = {
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
        var options = useCasesByType[this.config.techType] || useCasesByType.startup;
        return options.join('');
    };
    return TechTemplate;
}());
exports.TechTemplate = TechTemplate;
exports.default = TechTemplate;
