"use strict";
/**
 * Template de Design System - Plomberie Française
 * Système spécialisé pour entreprises de plomberie en France
 * Optimisé pour conversion et confiance client
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlomberieDesignFactory = exports.PlomberieDesignSystem = void 0;
var design_system_1 = require("../workflows/design-system");
var PlomberieDesignSystem = /** @class */ (function (_super) {
    __extends(PlomberieDesignSystem, _super);
    function PlomberieDesignSystem(config) {
        var _this = _super.call(this, config) || this;
        _this.plomberieConfig = config;
        return _this;
    }
    /**
     * Génère une palette spécialisée plomberie avec couleurs de confiance
     */
    PlomberieDesignSystem.prototype.generatePlomberiePalette = function () {
        var basePalette = this.generateColorPalette(this.plomberieConfig.baseColor);
        // Couleurs métier spécialisées plomberie
        var plomberieColors = {
            waterBlue: '#1e40af', // Bleu eau de confiance
            toolGray: '#6b7280', // Gris outils professionnels
            copperOrange: '#ea580c', // Orange cuivre/tuyauterie
            safetyYellow: '#fbbf24', // Jaune sécurité/attention
            urgentRed: '#dc2626', // Rouge urgence
            trustGreen: '#16a34a' // Vert confiance/validation
        };
        return __assign(__assign({}, basePalette), { plomberieColors: plomberieColors });
    };
    /**
     * Génère les composants UI spécialisés plomberie
     */
    PlomberieDesignSystem.prototype.generatePlomberieComponents = function () {
        var colors = this.generatePlomberiePalette();
        var typography = this.generateTypographyScale();
        var spacing = this.generateSpacingScale();
        return {
            header: this.createHeaderComponent(colors, typography, spacing),
            hero: this.createHeroComponent(colors, typography, spacing),
            services: this.createServicesComponent(colors, typography, spacing),
            contact: this.createContactComponent(colors, typography, spacing),
            urgency: this.createUrgencyComponent(colors, typography, spacing),
            trustBadges: this.createTrustComponent(colors, typography, spacing)
        };
    };
    /**
     * Crée le composant Header avec CTA urgence
     */
    PlomberieDesignSystem.prototype.createHeaderComponent = function (colors, typography, spacing) {
        return {
            type: 'header',
            layout: 'sticky-top',
            elements: {
                logo: {
                    text: this.plomberieConfig.companyName,
                    fontSize: typography.fontSizes.xl.size,
                    fontWeight: typography.fontWeights.bold,
                    color: colors.primary,
                    icon: '🔧' // Icône outil
                },
                navigation: {
                    items: [
                        { label: 'Accueil', href: '#accueil' },
                        { label: 'Services', href: '#services' },
                        { label: 'À propos', href: '#apropos' },
                        { label: 'Réalisations', href: '#portfolio' },
                        { label: 'Contact', href: '#contact' }
                    ],
                    style: {
                        fontSize: typography.fontSizes.base.size,
                        fontWeight: typography.fontWeights.medium,
                        color: colors.neutral[700]
                    }
                },
                ctaUrgence: {
                    text: 'URGENCE 24h/7j',
                    phone: '01 23 45 67 89',
                    style: {
                        backgroundColor: colors.plomberieColors.urgentRed,
                        color: 'white',
                        fontSize: typography.fontSizes.sm.size,
                        fontWeight: typography.fontWeights.bold,
                        padding: "".concat(spacing[2], " ").concat(spacing[4]),
                        borderRadius: '6px',
                        animation: 'pulse-slow'
                    }
                }
            },
            responsive: {
                mobile: {
                    layout: 'hamburger-menu',
                    ctaUrgence: { position: 'prominent' }
                }
            }
        };
    };
    /**
     * Crée le composant Hero avec proposition de valeur
     */
    PlomberieDesignSystem.prototype.createHeroComponent = function (colors, typography, spacing) {
        return {
            type: 'hero',
            layout: 'split-content',
            content: {
                headline: {
                    text: "".concat(this.plomberieConfig.companyName, " - Plombiers Professionnels"),
                    style: {
                        fontSize: typography.fontSizes['3xl'].size,
                        fontWeight: typography.fontWeights.bold,
                        color: colors.neutral[900],
                        lineHeight: typography.fontSizes['3xl'].lineHeight
                    }
                },
                subheadline: {
                    text: 'Intervention rapide 24h/7j • Artisans qualifiés • Devis gratuit',
                    style: {
                        fontSize: typography.fontSizes.lg.size,
                        color: colors.neutral[600],
                        marginTop: spacing[4]
                    }
                },
                features: [
                    '✅ Intervention sous 1h en urgence',
                    '✅ Devis gratuit et transparent',
                    '✅ Garantie sur tous nos travaux',
                    '✅ Artisans certifiés et assurés'
                ],
                ctaGroup: {
                    primary: {
                        text: 'Appeler maintenant',
                        phone: '01 23 45 67 89',
                        style: {
                            backgroundColor: colors.plomberieColors.urgentRed,
                            color: 'white',
                            fontSize: typography.fontSizes.lg.size,
                            padding: "".concat(spacing[4], " ").concat(spacing[8]),
                            borderRadius: '8px',
                            fontWeight: typography.fontWeights.semibold
                        }
                    },
                    secondary: {
                        text: 'Demander un devis',
                        style: {
                            backgroundColor: 'transparent',
                            color: colors.plomberieColors.waterBlue,
                            border: "2px solid ".concat(colors.plomberieColors.waterBlue),
                            fontSize: typography.fontSizes.lg.size,
                            padding: "".concat(spacing[4], " ").concat(spacing[8]),
                            borderRadius: '8px',
                            fontWeight: typography.fontWeights.medium
                        }
                    }
                }
            },
            visual: {
                type: 'image',
                src: '/images/plombier-professionnel.jpg',
                alt: 'Plombier professionnel au travail',
                overlay: {
                    trustBadge: {
                        text: '+500 interventions réussies',
                        icon: '⭐',
                        style: {
                            backgroundColor: colors.plomberieColors.trustGreen,
                            color: 'white',
                            position: 'bottom-right'
                        }
                    }
                }
            }
        };
    };
    /**
     * Crée le composant Services avec iconographie métier
     */
    PlomberieDesignSystem.prototype.createServicesComponent = function (colors, typography, spacing) {
        var _this = this;
        var services = this.generateServicesFromSpecialties();
        return {
            type: 'services',
            layout: 'grid-4-cols',
            title: {
                text: 'Nos Services de Plomberie',
                style: {
                    fontSize: typography.fontSizes['2xl'].size,
                    fontWeight: typography.fontWeights.bold,
                    color: colors.neutral[900],
                    textAlign: 'center',
                    marginBottom: spacing[12]
                }
            },
            services: services.map(function (service) { return ({
                icon: service.icon,
                title: service.title,
                description: service.description,
                features: service.features,
                urgency: service.urgency,
                style: {
                    card: {
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: spacing[6],
                        boxShadow: _this.generateShadowScale().md,
                        border: "1px solid ".concat(colors.neutral[200]),
                        transition: 'all 0.3s ease'
                    },
                    icon: {
                        fontSize: '48px',
                        marginBottom: spacing[4],
                        color: colors.plomberieColors.waterBlue
                    },
                    title: {
                        fontSize: typography.fontSizes.lg.size,
                        fontWeight: typography.fontWeights.bold,
                        color: colors.neutral[900],
                        marginBottom: spacing[2]
                    },
                    description: {
                        fontSize: typography.fontSizes.base.size,
                        color: colors.neutral[600],
                        lineHeight: '1.6'
                    }
                }
            }); })
        };
    };
    /**
     * Crée le composant Contact optimisé conversion
     */
    PlomberieDesignSystem.prototype.createContactComponent = function (colors, typography, spacing) {
        return {
            type: 'contact',
            layout: 'two-column',
            urgencyBanner: {
                text: 'Urgence plomberie ? Appelez maintenant !',
                phone: '01 23 45 67 89',
                availability: '24h/7j - Intervention sous 1h',
                style: {
                    backgroundColor: colors.plomberieColors.urgentRed,
                    color: 'white',
                    padding: spacing[6],
                    textAlign: 'center',
                    fontSize: typography.fontSizes.lg.size,
                    fontWeight: typography.fontWeights.bold
                }
            },
            contactInfo: {
                company: this.plomberieConfig.companyName,
                phone: '01 23 45 67 89',
                email: 'contact@plombipro.fr',
                address: '123 Rue de la République, 75001 Paris',
                hours: {
                    normal: 'Lun-Ven: 8h-18h',
                    urgent: 'Urgence: 24h/7j'
                },
                serviceZone: this.plomberieConfig.serviceZone
            },
            form: {
                title: 'Demande de Devis Gratuit',
                fields: [
                    { name: 'nom', label: 'Nom et Prénom', type: 'text', required: true },
                    { name: 'telephone', label: 'Téléphone', type: 'tel', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: false },
                    { name: 'adresse', label: 'Adresse du chantier', type: 'text', required: true },
                    { name: 'service', label: 'Type d\'intervention', type: 'select', options: [
                            'Réparation fuite',
                            'Débouchage canalisation',
                            'Installation sanitaire',
                            'Rénovation salle de bain',
                            'Dépannage chauffage',
                            'Autre'
                        ], required: true },
                    { name: 'urgence', label: 'Niveau d\'urgence', type: 'radio', options: [
                            'Non urgent - sous 48h',
                            'Urgent - aujourd\'hui',
                            'Très urgent - maintenant'
                        ], required: true },
                    { name: 'description', label: 'Description du problème', type: 'textarea', required: false }
                ],
                submitButton: {
                    text: 'Demander mon devis gratuit',
                    style: {
                        backgroundColor: colors.plomberieColors.trustGreen,
                        color: 'white',
                        fontSize: typography.fontSizes.lg.size,
                        padding: "".concat(spacing[4], " ").concat(spacing[8]),
                        width: '100%',
                        fontWeight: typography.fontWeights.semibold
                    }
                }
            }
        };
    };
    /**
     * Crée le composant Urgence flottant
     */
    PlomberieDesignSystem.prototype.createUrgencyComponent = function (colors, typography, spacing) {
        return {
            type: 'urgency-float',
            position: 'bottom-right',
            content: {
                text: 'URGENCE',
                subtext: '24h/7j',
                phone: '01 23 45 67 89',
                style: {
                    backgroundColor: colors.plomberieColors.urgentRed,
                    color: 'white',
                    borderRadius: '50px',
                    padding: "".concat(spacing[4], " ").concat(spacing[6]),
                    boxShadow: this.generateShadowScale().xl,
                    fontSize: typography.fontSizes.sm.size,
                    fontWeight: typography.fontWeights.bold,
                    animation: 'bounce-slow',
                    zIndex: 1000
                }
            },
            triggers: ['scroll-50%', 'exit-intent', 'time-30s']
        };
    };
    /**
     * Crée les badges de confiance
     */
    PlomberieDesignSystem.prototype.createTrustComponent = function (colors, typography, spacing) {
        return {
            type: 'trust-badges',
            layout: 'horizontal-strip',
            badges: [
                {
                    icon: '🛡️',
                    title: 'Artisans Assurés',
                    subtitle: 'Responsabilité civile pro'
                },
                {
                    icon: '⭐',
                    title: '4.8/5',
                    subtitle: '+150 avis clients'
                },
                {
                    icon: '🚀',
                    title: 'Intervention Rapide',
                    subtitle: 'Sous 1h en urgence'
                },
                {
                    icon: '✅',
                    title: 'Devis Gratuit',
                    subtitle: 'Transparent et détaillé'
                },
                {
                    icon: '🔧',
                    title: 'Qualifiés RGE',
                    subtitle: 'Certifications reconnues'
                }
            ],
            style: {
                backgroundColor: colors.neutral[50],
                padding: "".concat(spacing[8], " 0"),
                borderTop: "1px solid ".concat(colors.neutral[200])
            }
        };
    };
    /**
     * Génère les services basés sur les spécialités
     */
    PlomberieDesignSystem.prototype.generateServicesFromSpecialties = function () {
        var serviceMap = {
            reparation: {
                icon: '🔧',
                title: 'Réparations d\'Urgence',
                description: 'Fuites, robinetterie, canalisations - Intervention rapide 24h/7j',
                features: ['Diagnostic gratuit', 'Réparation immédiate', 'Pièces de qualité'],
                urgency: 'immediate'
            },
            debouchage: {
                icon: '🚿',
                title: 'Débouchage Canalisations',
                description: 'Évier, lavabo, WC, douche - Solutions professionnelles garanties',
                features: ['Haute pression', 'Caméra d\'inspection', 'Garantie résultat'],
                urgency: 'same-day'
            },
            renovation: {
                icon: '🛁',
                title: 'Rénovation Salle de Bain',
                description: 'Installation complète, carrelage, sanitaires - Projet clé en main',
                features: ['Devis détaillé', 'Matériaux inclus', 'Finitions soignées'],
                urgency: 'planned'
            },
            chauffage: {
                icon: '🔥',
                title: 'Chauffage & Chaudière',
                description: 'Installation, entretien, dépannage - Toutes énergies',
                features: ['Certifié RGE', 'Aides disponibles', 'Maintenance incluse'],
                urgency: 'seasonal'
            },
            sanitaire: {
                icon: '🚽',
                title: 'Installation Sanitaire',
                description: 'WC, lavabo, douche, baignoire - Pose professionnelle',
                features: ['Matériel pro', 'Respect des normes', 'Garantie installation'],
                urgency: 'planned'
            }
        };
        return this.plomberieConfig.specialties.map(function (specialty) { return serviceMap[specialty]; });
    };
    /**
     * Génère le HTML/CSS complet de la landing page
     */
    PlomberieDesignSystem.prototype.generateLandingPageHTML = function () {
        var components = this.generatePlomberieComponents();
        var colors = this.generatePlomberiePalette();
        var designSystem = this.generateCompleteDesignSystem();
        return "\n<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(this.plomberieConfig.companyName, " - Plombier Professionnel ").concat(this.plomberieConfig.serviceZone, "</title>\n    <meta name=\"description\" content=\"Plombier professionnel ").concat(this.plomberieConfig.serviceZone, ". Intervention rapide 24h/7j. Devis gratuit. Artisans qualifi\u00E9s et assur\u00E9s.\">\n    \n    <!-- Fonts -->\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap\" rel=\"stylesheet\">\n    <link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">\n    \n    <style>\n").concat(designSystem.css, "\n\n/* Styles sp\u00E9cialis\u00E9s plomberie */\n.plomberie-header {\n    background: white;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n    position: sticky;\n    top: 0;\n    z-index: 100;\n}\n\n.urgence-cta {\n    background: ").concat(colors.plomberieColors.urgentRed, ";\n    color: white;\n    padding: 8px 16px;\n    border-radius: 6px;\n    font-weight: bold;\n    text-decoration: none;\n    animation: pulse 2s infinite;\n}\n\n.hero-section {\n    background: linear-gradient(135deg, ").concat(colors.neutral[50], " 0%, ").concat(colors.neutral[100], " 100%);\n    padding: 80px 20px;\n}\n\n.service-card {\n    background: white;\n    border-radius: 12px;\n    padding: 32px;\n    box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n    transition: transform 0.3s ease, box-shadow 0.3s ease;\n    border: 1px solid ").concat(colors.neutral[200], ";\n}\n\n.service-card:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 8px 25px rgba(0,0,0,0.15);\n}\n\n.trust-badges {\n    background: ").concat(colors.neutral[50], ";\n    border-top: 1px solid ").concat(colors.neutral[200], ";\n    padding: 40px 0;\n}\n\n.urgence-float {\n    position: fixed;\n    bottom: 20px;\n    right: 20px;\n    background: ").concat(colors.plomberieColors.urgentRed, ";\n    color: white;\n    padding: 16px 24px;\n    border-radius: 50px;\n    box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3);\n    z-index: 1000;\n    animation: bounce 3s infinite;\n}\n\n@keyframes pulse {\n    0%, 100% { opacity: 1; }\n    50% { opacity: 0.8; }\n}\n\n@keyframes bounce {\n    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }\n    40%, 43% { transform: translate3d(0, -10px, 0); }\n    70% { transform: translate3d(0, -5px, 0); }\n    90% { transform: translate3d(0, -2px, 0); }\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n    .hero-section { padding: 40px 20px; }\n    .service-grid { grid-template-columns: 1fr; gap: 20px; }\n    .urgence-float { bottom: 10px; right: 10px; padding: 12px 20px; }\n}\n    </style>\n</head>\n<body>\n    <!-- Header avec CTA urgence -->\n    <header class=\"plomberie-header\">\n        <div class=\"container mx-auto px-4 py-4 flex justify-between items-center\">\n            <div class=\"logo flex items-center\">\n                <span class=\"text-2xl\">\uD83D\uDD27</span>\n                <h1 class=\"ml-2 text-xl font-bold text-blue-900\">").concat(this.plomberieConfig.companyName, "</h1>\n            </div>\n            \n            <nav class=\"hidden md:flex space-x-6\">\n                <a href=\"#accueil\" class=\"text-gray-700 hover:text-blue-900\">Accueil</a>\n                <a href=\"#services\" class=\"text-gray-700 hover:text-blue-900\">Services</a>\n                <a href=\"#apropos\" class=\"text-gray-700 hover:text-blue-900\">\u00C0 propos</a>\n                <a href=\"#contact\" class=\"text-gray-700 hover:text-blue-900\">Contact</a>\n            </nav>\n            \n            <a href=\"tel:0123456789\" class=\"urgence-cta\">\n                \uD83D\uDCDE URGENCE 24h/7j<br>\n                <small>01 23 45 67 89</small>\n            </a>\n        </div>\n    </header>\n\n    <!-- Section Hero -->\n    <section id=\"accueil\" class=\"hero-section\">\n        <div class=\"container mx-auto px-4\">\n            <div class=\"grid md:grid-cols-2 gap-12 items-center\">\n                <div>\n                    <h2 class=\"text-4xl md:text-5xl font-bold text-gray-900 mb-6\">\n                        ").concat(this.plomberieConfig.companyName, "<br>\n                        <span class=\"text-blue-900\">Plombiers Professionnels</span>\n                    </h2>\n                    \n                    <p class=\"text-xl text-gray-600 mb-8\">\n                        Intervention rapide 24h/7j \u2022 Artisans qualifi\u00E9s \u2022 Devis gratuit\n                    </p>\n                    \n                    <div class=\"space-y-3 mb-8\">\n                        <div class=\"flex items-center\">\n                            <span class=\"text-green-600 text-lg mr-3\">\u2705</span>\n                            <span>Intervention sous 1h en urgence</span>\n                        </div>\n                        <div class=\"flex items-center\">\n                            <span class=\"text-green-600 text-lg mr-3\">\u2705</span>\n                            <span>Devis gratuit et transparent</span>\n                        </div>\n                        <div class=\"flex items-center\">\n                            <span class=\"text-green-600 text-lg mr-3\">\u2705</span>\n                            <span>Garantie sur tous nos travaux</span>\n                        </div>\n                        <div class=\"flex items-center\">\n                            <span class=\"text-green-600 text-lg mr-3\">\u2705</span>\n                            <span>Artisans certifi\u00E9s et assur\u00E9s</span>\n                        </div>\n                    </div>\n                    \n                    <div class=\"flex flex-col sm:flex-row gap-4\">\n                        <a href=\"tel:0123456789\" class=\"bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold text-center hover:bg-red-700 transition-colors\">\n                            \uD83D\uDCDE Appeler maintenant\n                        </a>\n                        <a href=\"#contact\" class=\"border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-lg text-lg font-medium text-center hover:bg-blue-900 hover:text-white transition-colors\">\n                            Demander un devis\n                        </a>\n                    </div>\n                </div>\n                \n                <div class=\"relative\">\n                    <div class=\"bg-white p-8 rounded-lg shadow-lg\">\n                        <div class=\"text-center\">\n                            <div class=\"text-6xl mb-4\">\uD83D\uDD27\u26A1</div>\n                            <h3 class=\"text-2xl font-bold text-gray-900 mb-2\">Intervention Express</h3>\n                            <p class=\"text-gray-600 mb-4\">Nos plombiers interviennent rapidement partout dans ").concat(this.plomberieConfig.serviceZone, "</p>\n                            <div class=\"bg-green-600 text-white px-4 py-2 rounded-full inline-block\">\n                                <span class=\"font-bold\">+500 interventions r\u00E9ussies \u2B50</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Section Services -->\n    <section id=\"services\" class=\"py-20 bg-white\">\n        <div class=\"container mx-auto px-4\">\n            <h2 class=\"text-3xl font-bold text-center text-gray-900 mb-12\">\n                Nos Services de Plomberie\n            </h2>\n            \n            <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8 service-grid\">\n                ").concat(this.generateServicesHTML(components.services), "\n            </div>\n        </div>\n    </section>\n\n    <!-- Section Contact -->\n    <section id=\"contact\" class=\"py-20 bg-gray-50\">\n        <div class=\"container mx-auto px-4\">\n            <!-- Banner urgence -->\n            <div class=\"bg-red-600 text-white text-center py-6 rounded-lg mb-12\">\n                <h3 class=\"text-2xl font-bold mb-2\">Urgence plomberie ? Appelez maintenant !</h3>\n                <a href=\"tel:0123456789\" class=\"text-3xl font-bold\">\uD83D\uDCDE 01 23 45 67 89</a>\n                <p class=\"mt-2\">24h/7j - Intervention sous 1h</p>\n            </div>\n            \n            <div class=\"grid md:grid-cols-2 gap-12\">\n                <!-- Informations contact -->\n                <div>\n                    <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Contactez-nous</h3>\n                    \n                    <div class=\"space-y-4 mb-8\">\n                        <div class=\"flex items-center\">\n                            <span class=\"text-blue-900 text-xl mr-4\">\uD83D\uDCDE</span>\n                            <div>\n                                <strong>T\u00E9l\u00E9phone</strong><br>\n                                <a href=\"tel:0123456789\" class=\"text-blue-900 font-bold\">01 23 45 67 89</a>\n                            </div>\n                        </div>\n                        \n                        <div class=\"flex items-center\">\n                            <span class=\"text-blue-900 text-xl mr-4\">\uD83D\uDCE7</span>\n                            <div>\n                                <strong>Email</strong><br>\n                                <a href=\"mailto:contact@plombipro.fr\" class=\"text-blue-900\">contact@plombipro.fr</a>\n                            </div>\n                        </div>\n                        \n                        <div class=\"flex items-center\">\n                            <span class=\"text-blue-900 text-xl mr-4\">\uD83D\uDCCD</span>\n                            <div>\n                                <strong>Adresse</strong><br>\n                                123 Rue de la R\u00E9publique<br>\n                                75001 Paris\n                            </div>\n                        </div>\n                        \n                        <div class=\"flex items-center\">\n                            <span class=\"text-blue-900 text-xl mr-4\">\uD83D\uDD52</span>\n                            <div>\n                                <strong>Horaires</strong><br>\n                                Lun-Ven: 8h-18h<br>\n                                <span class=\"text-red-600 font-bold\">Urgence: 24h/7j</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n                <!-- Formulaire de contact -->\n                <div>\n                    <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Demande de Devis Gratuit</h3>\n                    \n                    <form class=\"space-y-4\">\n                        <input type=\"text\" placeholder=\"Nom et Pr\u00E9nom *\" required class=\"w-full p-3 border border-gray-300 rounded-lg\">\n                        <input type=\"tel\" placeholder=\"T\u00E9l\u00E9phone *\" required class=\"w-full p-3 border border-gray-300 rounded-lg\">\n                        <input type=\"email\" placeholder=\"Email\" class=\"w-full p-3 border border-gray-300 rounded-lg\">\n                        <input type=\"text\" placeholder=\"Adresse du chantier *\" required class=\"w-full p-3 border border-gray-300 rounded-lg\">\n                        \n                        <select required class=\"w-full p-3 border border-gray-300 rounded-lg\">\n                            <option value=\"\">Type d'intervention *</option>\n                            <option value=\"reparation\">R\u00E9paration fuite</option>\n                            <option value=\"debouchage\">D\u00E9bouchage canalisation</option>\n                            <option value=\"installation\">Installation sanitaire</option>\n                            <option value=\"renovation\">R\u00E9novation salle de bain</option>\n                            <option value=\"chauffage\">D\u00E9pannage chauffage</option>\n                            <option value=\"autre\">Autre</option>\n                        </select>\n                        \n                        <div>\n                            <p class=\"font-semibold mb-2\">Niveau d'urgence *</p>\n                            <div class=\"space-y-2\">\n                                <label class=\"flex items-center\">\n                                    <input type=\"radio\" name=\"urgence\" value=\"normal\" class=\"mr-2\">\n                                    Non urgent - sous 48h\n                                </label>\n                                <label class=\"flex items-center\">\n                                    <input type=\"radio\" name=\"urgence\" value=\"urgent\" class=\"mr-2\">\n                                    Urgent - aujourd'hui\n                                </label>\n                                <label class=\"flex items-center\">\n                                    <input type=\"radio\" name=\"urgence\" value=\"immediat\" class=\"mr-2\">\n                                    Tr\u00E8s urgent - maintenant\n                                </label>\n                            </div>\n                        </div>\n                        \n                        <textarea placeholder=\"Description du probl\u00E8me\" rows=\"4\" class=\"w-full p-3 border border-gray-300 rounded-lg\"></textarea>\n                        \n                        <button type=\"submit\" class=\"w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors\">\n                            \uD83D\uDE80 Demander mon devis gratuit\n                        </button>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Trust Badges -->\n    <section class=\"trust-badges\">\n        <div class=\"container mx-auto px-4\">\n            <div class=\"grid grid-cols-2 md:grid-cols-5 gap-6 text-center\">\n                <div>\n                    <div class=\"text-3xl mb-2\">\uD83D\uDEE1\uFE0F</div>\n                    <h4 class=\"font-bold\">Artisans Assur\u00E9s</h4>\n                    <p class=\"text-sm text-gray-600\">Responsabilit\u00E9 civile pro</p>\n                </div>\n                <div>\n                    <div class=\"text-3xl mb-2\">\u2B50</div>\n                    <h4 class=\"font-bold\">4.8/5</h4>\n                    <p class=\"text-sm text-gray-600\">+150 avis clients</p>\n                </div>\n                <div>\n                    <div class=\"text-3xl mb-2\">\uD83D\uDE80</div>\n                    <h4 class=\"font-bold\">Intervention Rapide</h4>\n                    <p class=\"text-sm text-gray-600\">Sous 1h en urgence</p>\n                </div>\n                <div>\n                    <div class=\"text-3xl mb-2\">\u2705</div>\n                    <h4 class=\"font-bold\">Devis Gratuit</h4>\n                    <p class=\"text-sm text-gray-600\">Transparent et d\u00E9taill\u00E9</p>\n                </div>\n                <div>\n                    <div class=\"text-3xl mb-2\">\uD83D\uDD27</div>\n                    <h4 class=\"font-bold\">Qualifi\u00E9s RGE</h4>\n                    <p class=\"text-sm text-gray-600\">Certifications reconnues</p>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->\n    <footer class=\"bg-gray-900 text-white py-12\">\n        <div class=\"container mx-auto px-4\">\n            <div class=\"grid md:grid-cols-3 gap-8\">\n                <div>\n                    <h3 class=\"text-xl font-bold mb-4\">\uD83D\uDD27 ").concat(this.plomberieConfig.companyName, "</h3>\n                    <p class=\"text-gray-300 mb-4\">\n                        Votre plombier de confiance ").concat(this.plomberieConfig.serviceZone, ". \n                        Intervention rapide, travail soign\u00E9, prix transparents.\n                    </p>\n                    <div class=\"text-red-400 font-bold\">\n                        \uD83D\uDCDE URGENCE 24h/7j<br>\n                        01 23 45 67 89\n                    </div>\n                </div>\n                \n                <div>\n                    <h3 class=\"text-xl font-bold mb-4\">Nos Services</h3>\n                    <ul class=\"space-y-2 text-gray-300\">\n                        <li>\u2022 R\u00E9parations d'urgence</li>\n                        <li>\u2022 D\u00E9bouchage canalisations</li>\n                        <li>\u2022 R\u00E9novation salle de bain</li>\n                        <li>\u2022 Chauffage et chaudi\u00E8re</li>\n                        <li>\u2022 Installation sanitaire</li>\n                    </ul>\n                </div>\n                \n                <div>\n                    <h3 class=\"text-xl font-bold mb-4\">Zone d'Intervention</h3>\n                    <p class=\"text-gray-300 mb-4\">").concat(this.plomberieConfig.serviceZone, "</p>\n                    <p class=\"text-sm text-gray-400\">\n                        Artisan plombier certifi\u00E9 \u2022 Devis gratuit \u2022 Garantie travaux\n                    </p>\n                </div>\n            </div>\n            \n            <div class=\"border-t border-gray-700 mt-8 pt-8 text-center text-gray-400\">\n                <p>&copy; 2024 ").concat(this.plomberieConfig.companyName, ". Tous droits r\u00E9serv\u00E9s.</p>\n            </div>\n        </div>\n    </footer>\n\n    <!-- Bouton urgence flottant -->\n    <a href=\"tel:0123456789\" class=\"urgence-float\">\n        <div class=\"text-center\">\n            <div class=\"text-lg font-bold\">URGENCE</div>\n            <div class=\"text-sm\">24h/7j</div>\n            <div class=\"text-xs mt-1\">\u260E\uFE0F Cliquez pour appeler</div>\n        </div>\n    </a>\n\n    <!-- Scripts -->\n    <script>\n        // Animation du bouton urgence flottant\n        let urgenceButton = document.querySelector('.urgence-float');\n        let hasShown = false;\n        \n        window.addEventListener('scroll', function() {\n            if (window.scrollY > window.innerHeight * 0.5 && !hasShown) {\n                urgenceButton.style.display = 'block';\n                hasShown = true;\n            }\n        });\n        \n        // Tracking des clics CTA\n        document.querySelectorAll('a[href^=\"tel:\"]').forEach(function(link) {\n            link.addEventListener('click', function() {\n                console.log('CTA Call clicked:', this.href);\n                // Ici on pourrait ajouter Google Analytics, Facebook Pixel, etc.\n            });\n        });\n        \n        // Smooth scroll pour la navigation\n        document.querySelectorAll('a[href^=\"#\"]').forEach(function(link) {\n            link.addEventListener('click', function(e) {\n                e.preventDefault();\n                let target = document.querySelector(this.getAttribute('href'));\n                if (target) {\n                    target.scrollIntoView({ behavior: 'smooth' });\n                }\n            });\n        });\n    </script>\n</body>\n</html>");
    };
    /**
     * Génère le HTML des services
     */
    PlomberieDesignSystem.prototype.generateServicesHTML = function (servicesComponent) {
        return servicesComponent.services.map(function (service) { return "\n      <div class=\"service-card\">\n        <div class=\"text-center mb-6\">\n          <div class=\"text-5xl mb-4\">".concat(service.icon, "</div>\n          <h3 class=\"text-xl font-bold text-gray-900 mb-2\">").concat(service.title, "</h3>\n          <p class=\"text-gray-600\">").concat(service.description, "</p>\n        </div>\n        \n        <div class=\"space-y-2 mb-6\">\n          ").concat(service.features.map(function (feature) { return "\n            <div class=\"flex items-center\">\n              <span class=\"text-green-600 mr-2\">\u2713</span>\n              <span class=\"text-sm\">".concat(feature, "</span>\n            </div>\n          "); }).join(''), "\n        </div>\n        \n        <div class=\"text-center\">\n          <a href=\"tel:0123456789\" class=\"bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors\">\n            Demander un devis\n          </a>\n        </div>\n      </div>\n    "); }).join('');
    };
    /**
     * Génère les métadonnées SEO spécialisées
     */
    PlomberieDesignSystem.prototype.generateSEOMetadata = function () {
        return {
            title: "".concat(this.plomberieConfig.companyName, " - Plombier ").concat(this.plomberieConfig.serviceZone, " | Intervention 24h/7j"),
            description: "Plombier professionnel ".concat(this.plomberieConfig.serviceZone, ". Intervention rapide 24h/7j, devis gratuit. R\u00E9paration fuite, d\u00E9bouchage, r\u00E9novation. Artisans certifi\u00E9s."),
            keywords: [
                'plombier',
                this.plomberieConfig.serviceZone.toLowerCase(),
                'intervention urgence',
                'débouchage canalisation',
                'réparation fuite',
                'devis gratuit plombier',
                'plombier 24h',
                'chauffagiste'
            ],
            localBusiness: {
                name: this.plomberieConfig.companyName,
                address: "123 Rue de la R\u00E9publique, ".concat(this.plomberieConfig.serviceZone),
                phone: '01 23 45 67 89',
                priceRange: '€€',
                rating: 4.8,
                reviewCount: 156,
                serviceArea: this.plomberieConfig.serviceZone,
                services: this.plomberieConfig.specialties
            },
            schema: {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                'name': this.plomberieConfig.companyName,
                'image': '/images/logo-plombier.jpg',
                'telephone': '01-23-45-67-89',
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': '123 Rue de la République',
                    'addressLocality': this.plomberieConfig.serviceZone,
                    'addressCountry': 'FR'
                },
                'geo': {
                    '@type': 'GeoCoordinates',
                    'latitude': 48.8566,
                    'longitude': 2.3522
                },
                'url': 'https://plombipro.fr',
                'priceRange': '€€',
                'openingHours': 'Mo-Fr 08:00-18:00',
                'serviceArea': {
                    '@type': 'City',
                    'name': this.plomberieConfig.serviceZone
                }
            }
        };
    };
    return PlomberieDesignSystem;
}(design_system_1.DesignSystem));
exports.PlomberieDesignSystem = PlomberieDesignSystem;
/**
 * Factory pour créer des systèmes de design plomberie
 */
var PlomberieDesignFactory = /** @class */ (function () {
    function PlomberieDesignFactory() {
    }
    PlomberieDesignFactory.createPlomberieDesignSystem = function (companyName, serviceZone, specialties, baseColor) {
        if (baseColor === void 0) { baseColor = '#1e40af'; }
        var config = {
            companyName: companyName,
            name: "".concat(companyName, " Design System"),
            version: '1.0.0',
            sector: 'tech', // Pas de secteur plomberie dans l'enum original, on utilise tech
            style: 'moderne',
            baseColor: baseColor,
            brandPersonality: 'professional',
            specialties: specialties,
            serviceZone: serviceZone,
            urgencyLevel: '24h7j',
            certifications: ['RGE', 'Qualibat', 'Assurance Pro']
        };
        return new PlomberieDesignSystem(config);
    };
    return PlomberieDesignFactory;
}());
exports.PlomberieDesignFactory = PlomberieDesignFactory;
exports.default = PlomberieDesignSystem;
