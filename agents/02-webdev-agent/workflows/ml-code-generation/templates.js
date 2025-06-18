"use strict";
/**
 * ML Code Generation Templates
 * Templates intelligents pour la génération de code par type de projet
 *
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Templates enterprise pour restaurant, e-commerce, SaaS, portfolio
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
exports.TemplateGeneratorFactory = exports.PortfolioTemplateGenerator = exports.SaasTemplateGenerator = exports.EcommerceTemplateGenerator = exports.RestaurantTemplateGenerator = exports.BaseTemplateGenerator = void 0;
// ========================================
// TEMPLATE GENERATOR ABSTRAIT
// ========================================
var BaseTemplateGenerator = /** @class */ (function () {
    function BaseTemplateGenerator(projectType, qualityLevel, context) {
        this.projectType = projectType;
        this.qualityLevel = qualityLevel;
        this.context = context;
    }
    BaseTemplateGenerator.prototype.getBaseQualitySpecs = function () {
        var qualitySpecs = {
            mvp: {
                accessibility: { required: true, level: 'A', features: ['keyboard', 'semantics'] },
                performance: { lazy: false, memoization: false, critical: false },
                testing: { unit: true, integration: false, visual: false }
            },
            production: {
                accessibility: { required: true, level: 'AA', features: ['keyboard', 'screenReader', 'semantics'] },
                performance: { lazy: true, memoization: true, critical: true },
                testing: { unit: true, integration: true, visual: false }
            },
            enterprise: {
                accessibility: { required: true, level: 'AAA', features: ['keyboard', 'screenReader', 'colorContrast', 'focus', 'semantics'] },
                performance: { lazy: true, memoization: true, critical: true, virtualization: true, bundleSplitting: true },
                testing: { unit: true, integration: true, visual: true, accessibility: true, performance: true }
            }
        };
        return qualitySpecs[this.qualityLevel];
    };
    BaseTemplateGenerator.prototype.getBaseStyling = function () {
        return 'tailwind';
    };
    BaseTemplateGenerator.prototype.getBaseIntegrations = function () {
        return {
            apis: [],
            services: ['vercel'],
            libraries: ['react', 'next', 'tailwindcss'],
            external: []
        };
    };
    return BaseTemplateGenerator;
}());
exports.BaseTemplateGenerator = BaseTemplateGenerator;
// ========================================
// TEMPLATE RESTAURANT
// ========================================
var RestaurantTemplateGenerator = /** @class */ (function (_super) {
    __extends(RestaurantTemplateGenerator, _super);
    function RestaurantTemplateGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestaurantTemplateGenerator.prototype.generateComponents = function () {
        var qualitySpecs = this.getBaseQualitySpecs();
        return [
            {
                name: 'Header',
                type: 'layout',
                purpose: 'Navigation principale avec logo et menu',
                props: [
                    { name: 'logo', type: 'string', required: true, description: 'URL du logo', examples: ['/logo.png'] },
                    { name: 'menuItems', type: 'MenuItem[]', required: true, description: 'Éléments du menu', examples: [['Accueil', 'Menu', 'Réservation']] },
                    { name: 'sticky', type: 'boolean', required: false, default: true, description: 'Header fixe en scroll', examples: [true, false] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: qualitySpecs.performance,
                seo: {
                    structured: true,
                    meta: false,
                    headings: true,
                    links: true,
                    images: true,
                    schema: ['Organization', 'Restaurant']
                },
                testing: qualitySpecs.testing,
                integration: this.getBaseIntegrations(),
                customization: {
                    themes: true,
                    variants: ['transparent', 'solid', 'gradient'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'accent'],
                    animations: ['fade', 'slide'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'HeroSection',
                type: 'display',
                purpose: 'Section hero avec image et CTA principal',
                props: [
                    { name: 'title', type: 'string', required: true, description: 'Titre principal', examples: ['Bienvenue chez Restaurant X'] },
                    { name: 'subtitle', type: 'string', required: false, description: 'Sous-titre', examples: ['Cuisine authentique depuis 1985'] },
                    { name: 'backgroundImage', type: 'string', required: true, description: 'Image de fond', examples: ['/hero-bg.jpg'] },
                    { name: 'ctaText', type: 'string', required: true, description: 'Texte du bouton CTA', examples: ['Réserver maintenant'] },
                    { name: 'ctaAction', type: '() => void', required: true, description: 'Action du CTA', examples: ['() => router.push("/reservation")'] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: __assign(__assign({}, qualitySpecs.performance), { critical: true }),
                seo: {
                    structured: true,
                    meta: true,
                    headings: true,
                    links: true,
                    images: true,
                    schema: ['Restaurant', 'LocalBusiness']
                },
                testing: qualitySpecs.testing,
                integration: this.getBaseIntegrations(),
                customization: {
                    themes: true,
                    variants: ['fullscreen', 'contained', 'split'],
                    sizes: ['sm', 'md', 'lg', 'xl'],
                    colors: ['primary', 'secondary', 'accent'],
                    animations: ['parallax', 'fade', 'zoom'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'MenuSection',
                type: 'display',
                purpose: 'Affichage du menu avec catégories et prix',
                props: [
                    { name: 'categories', type: 'MenuCategory[]', required: true, description: 'Catégories du menu', examples: [['Entrées', 'Plats', 'Desserts']] },
                    { name: 'items', type: 'MenuItem[]', required: true, description: 'Éléments du menu', examples: [['Salade César', 'Saumon grillé']] },
                    { name: 'currency', type: 'string', required: false, default: '€', description: 'Devise', examples: ['€', '$', '£'] },
                    { name: 'showImages', type: 'boolean', required: false, default: true, description: 'Afficher les images', examples: [true, false] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: qualitySpecs.performance,
                seo: {
                    structured: true,
                    meta: false,
                    headings: true,
                    links: false,
                    images: true,
                    schema: ['Menu', 'FoodEstablishment']
                },
                testing: qualitySpecs.testing,
                integration: this.getBaseIntegrations(),
                customization: {
                    themes: true,
                    variants: ['grid', 'list', 'accordion'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'neutral'],
                    animations: ['slide', 'fade'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'ReservationForm',
                type: 'form',
                purpose: 'Formulaire de réservation avec validation',
                props: [
                    { name: 'onSubmit', type: '(data: ReservationData) => void', required: true, description: 'Callback de soumission', examples: ['handleReservation'] },
                    { name: 'loading', type: 'boolean', required: false, default: false, description: 'État de chargement', examples: [true, false] },
                    { name: 'availability', type: 'AvailabilityData[]', required: false, description: 'Créneaux disponibles', examples: [['19:00', '20:00', '21:00']] },
                    { name: 'minPartySize', type: 'number', required: false, default: 1, description: 'Nombre minimum de personnes', examples: [1, 2] },
                    { name: 'maxPartySize', type: 'number', required: false, default: 12, description: 'Nombre maximum de personnes', examples: [8, 12, 20] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: __assign(__assign({}, qualitySpecs.accessibility), { focus: true }),
                performance: qualitySpecs.performance,
                seo: {
                    structured: false,
                    meta: false,
                    headings: true,
                    links: false,
                    images: false,
                    schema: ['ReservationForm']
                },
                testing: __assign(__assign({}, qualitySpecs.testing), { integration: true }),
                integration: __assign(__assign({}, this.getBaseIntegrations()), { apis: ['reservation-api'] }),
                customization: {
                    themes: true,
                    variants: ['inline', 'modal', 'sidebar'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary'],
                    animations: ['slide', 'fade'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'ChefSection',
                type: 'display',
                purpose: 'Présentation du chef et de l\'équipe',
                props: [
                    { name: 'chef', type: 'ChefData', required: true, description: 'Données du chef', examples: [{ name: 'Jean Dupont', image: '/chef.jpg', bio: 'Chef étoilé...' }] },
                    { name: 'team', type: 'TeamMember[]', required: false, description: 'Équipe', examples: [['Sous-chef', 'Sommelier']] },
                    { name: 'awards', type: 'Award[]', required: false, description: 'Récompenses', examples: [['Michelin', 'Gault & Millau']] },
                    { name: 'philosophy', type: 'string', required: false, description: 'Philosophie culinaire', examples: ['Cuisine du terroir moderne'] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: qualitySpecs.performance,
                seo: {
                    structured: true,
                    meta: false,
                    headings: true,
                    links: false,
                    images: true,
                    schema: ['Person', 'Chef']
                },
                testing: qualitySpecs.testing,
                integration: this.getBaseIntegrations(),
                customization: {
                    themes: true,
                    variants: ['featured', 'team', 'biography'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'neutral'],
                    animations: ['fade', 'slide'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'GallerySection',
                type: 'media',
                purpose: 'Galerie d\'images du restaurant et des plats',
                props: [
                    { name: 'images', type: 'GalleryImage[]', required: true, description: 'Images de la galerie', examples: [['plat1.jpg', 'interieur.jpg']] },
                    { name: 'layout', type: 'masonry | grid | carousel', required: false, default: 'grid', description: 'Type d\'affichage', examples: ['grid', 'masonry', 'carousel'] },
                    { name: 'categories', type: 'string[]', required: false, description: 'Catégories de filtrage', examples: [['Plats', 'Intérieur', 'Événements']] },
                    { name: 'lightbox', type: 'boolean', required: false, default: true, description: 'Lightbox activée', examples: [true, false] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: __assign(__assign({}, qualitySpecs.performance), { lazy: true }),
                seo: {
                    structured: false,
                    meta: false,
                    headings: true,
                    links: false,
                    images: true,
                    schema: ['ImageGallery']
                },
                testing: qualitySpecs.testing,
                integration: this.getBaseIntegrations(),
                customization: {
                    themes: true,
                    variants: ['masonry', 'grid', 'carousel', 'fullscreen'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'neutral'],
                    animations: ['fade', 'zoom', 'slide'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'TestimonialsSection',
                type: 'display',
                purpose: 'Témoignages clients avec notation',
                props: [
                    { name: 'testimonials', type: 'Testimonial[]', required: true, description: 'Liste des témoignages', examples: [['Excellent service', 'Cuisine exceptionnelle']] },
                    { name: 'showRating', type: 'boolean', required: false, default: true, description: 'Afficher les notes', examples: [true, false] },
                    { name: 'autoplay', type: 'boolean', required: false, default: true, description: 'Carrousel automatique', examples: [true, false] },
                    { name: 'sources', type: 'string[]', required: false, description: 'Sources des avis', examples: [['Google', 'TripAdvisor', 'Yelp']] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: qualitySpecs.performance,
                seo: {
                    structured: true,
                    meta: false,
                    headings: true,
                    links: false,
                    images: true,
                    schema: ['Review', 'AggregateRating']
                },
                testing: qualitySpecs.testing,
                integration: this.getBaseIntegrations(),
                customization: {
                    themes: true,
                    variants: ['carousel', 'grid', 'list'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'neutral'],
                    animations: ['slide', 'fade'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'ContactSection',
                type: 'form',
                purpose: 'Informations de contact et formulaire',
                props: [
                    { name: 'contact', type: 'ContactInfo', required: true, description: 'Informations de contact', examples: [{ phone: '+33 1 23 45 67 89', email: 'contact@restaurant.fr' }] },
                    { name: 'showForm', type: 'boolean', required: false, default: true, description: 'Afficher le formulaire', examples: [true, false] },
                    { name: 'showMap', type: 'boolean', required: false, default: true, description: 'Afficher la carte', examples: [true, false] },
                    { name: 'hours', type: 'OpeningHours[]', required: true, description: 'Horaires d\'ouverture', examples: [['Lun-Ven: 12h-14h, 19h-23h']] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: qualitySpecs.performance,
                seo: {
                    structured: true,
                    meta: false,
                    headings: true,
                    links: true,
                    images: false,
                    schema: ['LocalBusiness', 'ContactPoint']
                },
                testing: qualitySpecs.testing,
                integration: __assign(__assign({}, this.getBaseIntegrations()), { apis: ['contact-api'], external: ['google-maps'] }),
                customization: {
                    themes: true,
                    variants: ['split', 'stacked', 'sidebar'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'neutral'],
                    animations: ['fade', 'slide'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'Footer',
                type: 'layout',
                purpose: 'Pied de page avec liens et informations',
                props: [
                    { name: 'links', type: 'FooterLink[]', required: true, description: 'Liens du footer', examples: [['Mentions légales', 'Politique de confidentialité']] },
                    { name: 'social', type: 'SocialLink[]', required: false, description: 'Réseaux sociaux', examples: [['Facebook', 'Instagram', 'Twitter']] },
                    { name: 'newsletter', type: 'boolean', required: false, default: true, description: 'Newsletter', examples: [true, false] },
                    { name: 'copyright', type: 'string', required: true, description: 'Copyright', examples: ['© 2024 Restaurant X. Tous droits réservés.'] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: qualitySpecs.performance,
                seo: {
                    structured: true,
                    meta: false,
                    headings: false,
                    links: true,
                    images: false,
                    schema: ['Organization']
                },
                testing: qualitySpecs.testing,
                integration: this.getBaseIntegrations(),
                customization: {
                    themes: true,
                    variants: ['simple', 'detailed', 'minimal'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'neutral'],
                    animations: ['fade'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            }
        ];
    };
    RestaurantTemplateGenerator.prototype.generatePages = function () {
        return [
            {
                name: 'HomePage',
                route: '/',
                type: 'landing',
                layout: 'default',
                components: ['Header', 'HeroSection', 'MenuSection', 'ChefSection', 'GallerySection', 'TestimonialsSection', 'ContactSection', 'Footer'],
                data: {
                    sources: [
                        {
                            name: 'restaurant-info',
                            type: 'file',
                            endpoint: '/data/restaurant.json',
                            method: 'GET',
                            headers: {},
                            authentication: null,
                            params: {},
                            timeout: 5000,
                            retries: 3
                        }
                    ],
                    fetching: 'ssg',
                    caching: { strategy: 'cache-first', ttl: 3600, tags: ['restaurant'], vary: [] },
                    validation: { schema: null, sanitization: true, transformation: true, errorHandling: 'fallback' },
                    transformation: { normalize: true, filter: false, sort: false, paginate: false, aggregate: false, custom: [] }
                },
                meta: {
                    title: "".concat(this.context.brand.name, " - Restaurant Gastronomique"),
                    description: "D\u00E9couvrez ".concat(this.context.brand.name, ", restaurant gastronomique proposant une cuisine authentique et raffin\u00E9e."),
                    keywords: ['restaurant', 'gastronomie', 'cuisine', this.context.brand.name],
                    canonical: '/',
                    robots: 'index,follow',
                    openGraph: {
                        title: "".concat(this.context.brand.name, " - Restaurant Gastronomique"),
                        description: "D\u00E9couvrez ".concat(this.context.brand.name, ", restaurant gastronomique proposant une cuisine authentique et raffin\u00E9e."),
                        image: '/og-image.jpg',
                        url: '/',
                        type: 'website',
                        siteName: this.context.brand.name,
                        locale: 'fr_FR'
                    },
                    twitter: {
                        card: 'summary_large_image',
                        site: '@restaurant',
                        creator: '@restaurant',
                        title: "".concat(this.context.brand.name, " - Restaurant Gastronomique"),
                        description: "D\u00E9couvrez ".concat(this.context.brand.name, ", restaurant gastronomique proposant une cuisine authentique et raffin\u00E9e."),
                        image: '/twitter-image.jpg'
                    },
                    jsonLd: [
                        {
                            '@context': 'https://schema.org',
                            '@type': 'Restaurant',
                            name: this.context.brand.name,
                            description: "Restaurant gastronomique ".concat(this.context.brand.name),
                            url: '/',
                            telephone: '+33123456789',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: '123 Rue de la Gastronomie',
                                addressLocality: 'Paris',
                                postalCode: '75001',
                                addressCountry: 'FR'
                            }
                        }
                    ]
                },
                performance: {
                    priority: 'high',
                    prefetch: true,
                    preload: ['/hero-bg.jpg', '/chef.jpg'],
                    critical: true,
                    streaming: true,
                    compression: true,
                    optimization: ['images', 'fonts', 'critical-css']
                },
                accessibility: this.getBaseQualitySpecs().accessibility,
                seo: {
                    structured: true,
                    breadcrumbs: false,
                    pagination: false,
                    canonical: true,
                    alternates: [],
                    sitemap: true,
                    robots: true
                },
                analytics: {
                    pageView: true,
                    events: [
                        { name: 'hero_cta_click', trigger: 'click', parameters: { section: 'hero' } },
                        { name: 'reservation_started', trigger: 'form_start', parameters: { form: 'reservation' } },
                        { name: 'menu_view', trigger: 'scroll', parameters: { section: 'menu' } }
                    ],
                    conversion: [
                        { name: 'reservation_completed', goal: 'reservation', value: 50, currency: 'EUR', funnel: ['page_view', 'reservation_started', 'reservation_completed'] }
                    ],
                    audiences: ['restaurant_visitors', 'potential_customers'],
                    experiments: []
                },
                authentication: { required: false, roles: [], permissions: [], redirect: '', fallback: '' },
                internationalization: { enabled: false, locales: ['fr'], defaultLocale: 'fr', fallback: 'fr', namespaces: ['common'], detection: false }
            },
            {
                name: 'MenuPage',
                route: '/menu',
                type: 'category',
                layout: 'default',
                components: ['Header', 'MenuSection', 'Footer'],
                data: {
                    sources: [
                        {
                            name: 'menu-data',
                            type: 'api',
                            endpoint: '/api/menu',
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                            authentication: null,
                            params: {},
                            timeout: 5000,
                            retries: 3
                        }
                    ],
                    fetching: 'ssg',
                    caching: { strategy: 'stale-while-revalidate', ttl: 1800, tags: ['menu'], vary: [] },
                    validation: { schema: null, sanitization: true, transformation: true, errorHandling: 'fallback' },
                    transformation: { normalize: true, filter: true, sort: true, paginate: false, aggregate: true, custom: ['group-by-category'] }
                },
                meta: {
                    title: "Menu - ".concat(this.context.brand.name),
                    description: "D\u00E9couvrez notre menu gastronomique avec nos sp\u00E9cialit\u00E9s et cr\u00E9ations du chef.",
                    keywords: ['menu', 'carte', 'plats', 'gastronomie'],
                    canonical: '/menu',
                    robots: 'index,follow',
                    openGraph: {
                        title: "Menu - ".concat(this.context.brand.name),
                        description: "D\u00E9couvrez notre menu gastronomique avec nos sp\u00E9cialit\u00E9s et cr\u00E9ations du chef.",
                        image: '/menu-og.jpg',
                        url: '/menu',
                        type: 'website',
                        siteName: this.context.brand.name,
                        locale: 'fr_FR'
                    },
                    twitter: {
                        card: 'summary_large_image',
                        site: '@restaurant',
                        creator: '@restaurant',
                        title: "Menu - ".concat(this.context.brand.name),
                        description: "D\u00E9couvrez notre menu gastronomique avec nos sp\u00E9cialit\u00E9s et cr\u00E9ations du chef.",
                        image: '/menu-twitter.jpg'
                    },
                    jsonLd: [
                        {
                            '@context': 'https://schema.org',
                            '@type': 'Menu',
                            name: "Menu ".concat(this.context.brand.name),
                            description: 'Menu gastronomique',
                            hasMenuSection: []
                        }
                    ]
                },
                performance: {
                    priority: 'medium',
                    prefetch: false,
                    preload: [],
                    critical: false,
                    streaming: true,
                    compression: true,
                    optimization: ['images', 'fonts']
                },
                accessibility: this.getBaseQualitySpecs().accessibility,
                seo: {
                    structured: true,
                    breadcrumbs: true,
                    pagination: false,
                    canonical: true,
                    alternates: [],
                    sitemap: true,
                    robots: true
                },
                analytics: {
                    pageView: true,
                    events: [
                        { name: 'menu_category_click', trigger: 'click', parameters: { category: 'dynamic' } },
                        { name: 'menu_item_view', trigger: 'view', parameters: { item: 'dynamic' } }
                    ],
                    conversion: [],
                    audiences: ['menu_browsers'],
                    experiments: []
                },
                authentication: { required: false, roles: [], permissions: [], redirect: '', fallback: '' },
                internationalization: { enabled: false, locales: ['fr'], defaultLocale: 'fr', fallback: 'fr', namespaces: ['common', 'menu'], detection: false }
            },
            {
                name: 'ReservationPage',
                route: '/reservation',
                type: 'form',
                layout: 'default',
                components: ['Header', 'ReservationForm', 'Footer'],
                data: {
                    sources: [
                        {
                            name: 'availability',
                            type: 'api',
                            endpoint: '/api/availability',
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                            authentication: null,
                            params: { date: 'dynamic' },
                            timeout: 10000,
                            retries: 2
                        }
                    ],
                    fetching: 'csr',
                    caching: { strategy: 'no-cache', ttl: 0, tags: [], vary: [] },
                    validation: { schema: null, sanitization: true, transformation: true, errorHandling: 'error' },
                    transformation: { normalize: true, filter: true, sort: true, paginate: false, aggregate: false, custom: [] }
                },
                meta: {
                    title: "R\u00E9servation - ".concat(this.context.brand.name),
                    description: "R\u00E9servez votre table au ".concat(this.context.brand.name, ". R\u00E9servation en ligne simple et rapide."),
                    keywords: ['réservation', 'table', 'booking', 'restaurant'],
                    canonical: '/reservation',
                    robots: 'index,follow',
                    openGraph: {
                        title: "R\u00E9servation - ".concat(this.context.brand.name),
                        description: "R\u00E9servez votre table au ".concat(this.context.brand.name, ". R\u00E9servation en ligne simple et rapide."),
                        image: '/reservation-og.jpg',
                        url: '/reservation',
                        type: 'website',
                        siteName: this.context.brand.name,
                        locale: 'fr_FR'
                    },
                    twitter: {
                        card: 'summary',
                        site: '@restaurant',
                        creator: '@restaurant',
                        title: "R\u00E9servation - ".concat(this.context.brand.name),
                        description: "R\u00E9servez votre table au ".concat(this.context.brand.name, ". R\u00E9servation en ligne simple et rapide."),
                        image: '/reservation-twitter.jpg'
                    },
                    jsonLd: []
                },
                performance: {
                    priority: 'high',
                    prefetch: false,
                    preload: [],
                    critical: true,
                    streaming: false,
                    compression: true,
                    optimization: ['forms', 'validation']
                },
                accessibility: __assign(__assign({}, this.getBaseQualitySpecs().accessibility), { focus: true }),
                seo: {
                    structured: false,
                    breadcrumbs: true,
                    pagination: false,
                    canonical: true,
                    alternates: [],
                    sitemap: true,
                    robots: true
                },
                analytics: {
                    pageView: true,
                    events: [
                        { name: 'reservation_started', trigger: 'form_start', parameters: { form: 'reservation' } },
                        { name: 'reservation_step_completed', trigger: 'form_step', parameters: { step: 'dynamic' } },
                        { name: 'reservation_completed', trigger: 'form_submit', parameters: { form: 'reservation' }, value: 50, currency: 'EUR' }
                    ],
                    conversion: [
                        { name: 'reservation_conversion', goal: 'reservation', value: 50, currency: 'EUR', funnel: ['page_view', 'reservation_started', 'reservation_completed'] }
                    ],
                    audiences: ['reservation_intent'],
                    experiments: []
                },
                authentication: { required: false, roles: [], permissions: [], redirect: '', fallback: '' },
                internationalization: { enabled: false, locales: ['fr'], defaultLocale: 'fr', fallback: 'fr', namespaces: ['common', 'reservation'], detection: false }
            },
            {
                name: 'AboutPage',
                route: '/about',
                type: 'static',
                layout: 'default',
                components: ['Header', 'ChefSection', 'Footer'],
                data: {
                    sources: [
                        {
                            name: 'about-content',
                            type: 'file',
                            endpoint: '/data/about.json',
                            method: 'GET',
                            headers: {},
                            authentication: null,
                            params: {},
                            timeout: 5000,
                            retries: 3
                        }
                    ],
                    fetching: 'ssg',
                    caching: { strategy: 'cache-first', ttl: 86400, tags: ['about'], vary: [] },
                    validation: { schema: null, sanitization: true, transformation: true, errorHandling: 'fallback' },
                    transformation: { normalize: true, filter: false, sort: false, paginate: false, aggregate: false, custom: [] }
                },
                meta: {
                    title: "\u00C0 propos - ".concat(this.context.brand.name),
                    description: "D\u00E9couvrez l'histoire et la philosophie du ".concat(this.context.brand.name, ", notre chef et notre \u00E9quipe."),
                    keywords: ['à propos', 'histoire', 'chef', 'équipe', 'philosophie'],
                    canonical: '/about',
                    robots: 'index,follow',
                    openGraph: {
                        title: "\u00C0 propos - ".concat(this.context.brand.name),
                        description: "D\u00E9couvrez l'histoire et la philosophie du ".concat(this.context.brand.name, ", notre chef et notre \u00E9quipe."),
                        image: '/about-og.jpg',
                        url: '/about',
                        type: 'website',
                        siteName: this.context.brand.name,
                        locale: 'fr_FR'
                    },
                    twitter: {
                        card: 'summary',
                        site: '@restaurant',
                        creator: '@restaurant',
                        title: "\u00C0 propos - ".concat(this.context.brand.name),
                        description: "D\u00E9couvrez l'histoire et la philosophie du ".concat(this.context.brand.name, ", notre chef et notre \u00E9quipe."),
                        image: '/about-twitter.jpg'
                    },
                    jsonLd: []
                },
                performance: {
                    priority: 'low',
                    prefetch: false,
                    preload: [],
                    critical: false,
                    streaming: true,
                    compression: true,
                    optimization: ['images']
                },
                accessibility: this.getBaseQualitySpecs().accessibility,
                seo: {
                    structured: true,
                    breadcrumbs: true,
                    pagination: false,
                    canonical: true,
                    alternates: [],
                    sitemap: true,
                    robots: true
                },
                analytics: {
                    pageView: true,
                    events: [
                        { name: 'about_section_view', trigger: 'view', parameters: { section: 'dynamic' } }
                    ],
                    conversion: [],
                    audiences: ['about_readers'],
                    experiments: []
                },
                authentication: { required: false, roles: [], permissions: [], redirect: '', fallback: '' },
                internationalization: { enabled: false, locales: ['fr'], defaultLocale: 'fr', fallback: 'fr', namespaces: ['common', 'about'], detection: false }
            },
            {
                name: 'ContactPage',
                route: '/contact',
                type: 'form',
                layout: 'default',
                components: ['Header', 'ContactSection', 'Footer'],
                data: {
                    sources: [
                        {
                            name: 'contact-info',
                            type: 'file',
                            endpoint: '/data/contact.json',
                            method: 'GET',
                            headers: {},
                            authentication: null,
                            params: {},
                            timeout: 5000,
                            retries: 3
                        }
                    ],
                    fetching: 'ssg',
                    caching: { strategy: 'cache-first', ttl: 86400, tags: ['contact'], vary: [] },
                    validation: { schema: null, sanitization: true, transformation: true, errorHandling: 'fallback' },
                    transformation: { normalize: true, filter: false, sort: false, paginate: false, aggregate: false, custom: [] }
                },
                meta: {
                    title: "Contact - ".concat(this.context.brand.name),
                    description: "Contactez le ".concat(this.context.brand.name, ". Adresse, t\u00E9l\u00E9phone, horaires et formulaire de contact."),
                    keywords: ['contact', 'adresse', 'téléphone', 'horaires', 'localisation'],
                    canonical: '/contact',
                    robots: 'index,follow',
                    openGraph: {
                        title: "Contact - ".concat(this.context.brand.name),
                        description: "Contactez le ".concat(this.context.brand.name, ". Adresse, t\u00E9l\u00E9phone, horaires et formulaire de contact."),
                        image: '/contact-og.jpg',
                        url: '/contact',
                        type: 'website',
                        siteName: this.context.brand.name,
                        locale: 'fr_FR'
                    },
                    twitter: {
                        card: 'summary',
                        site: '@restaurant',
                        creator: '@restaurant',
                        title: "Contact - ".concat(this.context.brand.name),
                        description: "Contactez le ".concat(this.context.brand.name, ". Adresse, t\u00E9l\u00E9phone, horaires et formulaire de contact."),
                        image: '/contact-twitter.jpg'
                    },
                    jsonLd: []
                },
                performance: {
                    priority: 'medium',
                    prefetch: false,
                    preload: [],
                    critical: false,
                    streaming: true,
                    compression: true,
                    optimization: ['forms', 'maps']
                },
                accessibility: this.getBaseQualitySpecs().accessibility,
                seo: {
                    structured: true,
                    breadcrumbs: true,
                    pagination: false,
                    canonical: true,
                    alternates: [],
                    sitemap: true,
                    robots: true
                },
                analytics: {
                    pageView: true,
                    events: [
                        { name: 'contact_form_started', trigger: 'form_start', parameters: { form: 'contact' } },
                        { name: 'contact_form_submitted', trigger: 'form_submit', parameters: { form: 'contact' } },
                        { name: 'phone_click', trigger: 'click', parameters: { type: 'phone' } },
                        { name: 'directions_click', trigger: 'click', parameters: { type: 'directions' } }
                    ],
                    conversion: [],
                    audiences: ['contact_intent'],
                    experiments: []
                },
                authentication: { required: false, roles: [], permissions: [], redirect: '', fallback: '' },
                internationalization: { enabled: false, locales: ['fr'], defaultLocale: 'fr', fallback: 'fr', namespaces: ['common', 'contact'], detection: false }
            }
        ];
    };
    RestaurantTemplateGenerator.prototype.generateAPIs = function () {
        return [
            {
                name: 'ReservationAPI',
                route: '/api/reservations',
                method: 'POST',
                type: 'rest',
                authentication: {
                    required: false,
                    methods: [],
                    scopes: [],
                    roles: [],
                    rateLimit: true
                },
                validation: {
                    input: {
                        body: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', required: true, minLength: 2, maxLength: 100 },
                                email: { type: 'string', required: true, format: 'email' },
                                phone: { type: 'string', required: true, pattern: '^[+]?[0-9\\s\\-\\(\\)]{10,20}$' },
                                date: { type: 'string', required: true, format: 'date' },
                                time: { type: 'string', required: true, pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' },
                                guests: { type: 'number', required: true, minimum: 1, maximum: 20 },
                                message: { type: 'string', required: false, maxLength: 500 }
                            }
                        }
                    },
                    sanitization: true,
                    transformation: true,
                    strict: true
                },
                processing: {
                    database: true,
                    external: [
                        {
                            name: 'email-service',
                            type: 'email',
                            endpoint: 'https://api.sendgrid.com/v3/mail/send',
                            authentication: { type: 'Bearer', token: 'env:SENDGRID_API_KEY' },
                            timeout: 10000,
                            retries: 3,
                            fallback: true
                        }
                    ],
                    background: true,
                    transaction: true,
                    idempotent: false,
                    timeout: 30000
                },
                response: {
                    format: 'json',
                    structure: {
                        success: { type: 'boolean' },
                        reservationId: { type: 'string' },
                        message: { type: 'string' },
                        confirmationEmail: { type: 'boolean' }
                    },
                    compression: true,
                    streaming: false,
                    pagination: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                },
                error: {
                    codes: {
                        400: 'Données de réservation invalides',
                        409: 'Créneau non disponible',
                        429: 'Trop de tentatives',
                        500: 'Erreur serveur'
                    },
                    format: {
                        success: false,
                        error: { type: 'string' },
                        code: { type: 'string' },
                        details: { type: 'object' }
                    },
                    logging: true,
                    monitoring: true,
                    recovery: true
                },
                rate: {
                    enabled: true,
                    requests: 10,
                    window: 60000,
                    burst: 5,
                    strategy: 'sliding'
                },
                caching: {
                    strategy: 'no-cache',
                    ttl: 0,
                    tags: [],
                    vary: []
                },
                monitoring: {
                    metrics: true,
                    logging: true,
                    tracing: true,
                    alerts: true,
                    health: true
                },
                documentation: {
                    openapi: true,
                    examples: true,
                    postman: true,
                    sdk: false,
                    changelog: true
                }
            },
            {
                name: 'AvailabilityAPI',
                route: '/api/availability',
                method: 'GET',
                type: 'rest',
                authentication: {
                    required: false,
                    methods: [],
                    scopes: [],
                    roles: [],
                    rateLimit: true
                },
                validation: {
                    input: {
                        query: {
                            date: { type: 'string', required: true, format: 'date' },
                            guests: { type: 'number', required: false, minimum: 1, maximum: 20, default: 2 }
                        }
                    },
                    sanitization: true,
                    transformation: true,
                    strict: false
                },
                processing: {
                    database: true,
                    external: [],
                    background: false,
                    transaction: false,
                    idempotent: true,
                    timeout: 10000
                },
                response: {
                    format: 'json',
                    structure: {
                        date: { type: 'string' },
                        available: { type: 'boolean' },
                        slots: {
                            type: 'array',
                            items: {
                                time: { type: 'string' },
                                available: { type: 'boolean' },
                                capacity: { type: 'number' }
                            }
                        }
                    },
                    compression: true,
                    streaming: false,
                    pagination: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'public, max-age=300'
                    }
                },
                error: {
                    codes: {
                        400: 'Paramètres invalides',
                        404: 'Aucune disponibilité trouvée',
                        500: 'Erreur serveur'
                    },
                    format: {
                        success: false,
                        error: { type: 'string' },
                        code: { type: 'string' }
                    },
                    logging: true,
                    monitoring: true,
                    recovery: true
                },
                rate: {
                    enabled: true,
                    requests: 60,
                    window: 60000,
                    burst: 10,
                    strategy: 'fixed'
                },
                caching: {
                    strategy: 'cache-first',
                    ttl: 300,
                    tags: ['availability'],
                    vary: ['date', 'guests']
                },
                monitoring: {
                    metrics: true,
                    logging: true,
                    tracing: true,
                    alerts: true,
                    health: true
                },
                documentation: {
                    openapi: true,
                    examples: true,
                    postman: true,
                    sdk: false,
                    changelog: true
                }
            },
            {
                name: 'MenuAPI',
                route: '/api/menu',
                method: 'GET',
                type: 'rest',
                authentication: {
                    required: false,
                    methods: [],
                    scopes: [],
                    roles: [],
                    rateLimit: false
                },
                validation: {
                    input: {
                        query: {
                            category: { type: 'string', required: false },
                            featured: { type: 'boolean', required: false }
                        }
                    },
                    sanitization: true,
                    transformation: true,
                    strict: false
                },
                processing: {
                    database: true,
                    external: [],
                    background: false,
                    transaction: false,
                    idempotent: true,
                    timeout: 5000
                },
                response: {
                    format: 'json',
                    structure: {
                        categories: {
                            type: 'array',
                            items: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                description: { type: 'string' },
                                items: {
                                    type: 'array',
                                    items: {
                                        id: { type: 'string' },
                                        name: { type: 'string' },
                                        description: { type: 'string' },
                                        price: { type: 'number' },
                                        image: { type: 'string' },
                                        allergens: { type: 'array', items: { type: 'string' } },
                                        featured: { type: 'boolean' }
                                    }
                                }
                            }
                        }
                    },
                    compression: true,
                    streaming: false,
                    pagination: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'public, max-age=3600'
                    }
                },
                error: {
                    codes: {
                        404: 'Menu non trouvé',
                        500: 'Erreur serveur'
                    },
                    format: {
                        success: false,
                        error: { type: 'string' },
                        code: { type: 'string' }
                    },
                    logging: true,
                    monitoring: true,
                    recovery: true
                },
                rate: {
                    enabled: false,
                    requests: 0,
                    window: 0,
                    burst: 0,
                    strategy: 'fixed'
                },
                caching: {
                    strategy: 'stale-while-revalidate',
                    ttl: 3600,
                    tags: ['menu'],
                    vary: ['category', 'featured']
                },
                monitoring: {
                    metrics: true,
                    logging: true,
                    tracing: false,
                    alerts: false,
                    health: true
                },
                documentation: {
                    openapi: true,
                    examples: true,
                    postman: true,
                    sdk: false,
                    changelog: true
                }
            },
            {
                name: 'ContactAPI',
                route: '/api/contact',
                method: 'POST',
                type: 'rest',
                authentication: {
                    required: false,
                    methods: [],
                    scopes: [],
                    roles: [],
                    rateLimit: true
                },
                validation: {
                    input: {
                        body: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', required: true, minLength: 2, maxLength: 100 },
                                email: { type: 'string', required: true, format: 'email' },
                                subject: { type: 'string', required: true, minLength: 5, maxLength: 200 },
                                message: { type: 'string', required: true, minLength: 10, maxLength: 2000 }
                            }
                        }
                    },
                    sanitization: true,
                    transformation: true,
                    strict: true
                },
                processing: {
                    database: true,
                    external: [
                        {
                            name: 'email-service',
                            type: 'email',
                            endpoint: 'https://api.sendgrid.com/v3/mail/send',
                            authentication: { type: 'Bearer', token: 'env:SENDGRID_API_KEY' },
                            timeout: 10000,
                            retries: 3,
                            fallback: true
                        }
                    ],
                    background: true,
                    transaction: true,
                    idempotent: false,
                    timeout: 30000
                },
                response: {
                    format: 'json',
                    structure: {
                        success: { type: 'boolean' },
                        messageId: { type: 'string' },
                        message: { type: 'string' }
                    },
                    compression: true,
                    streaming: false,
                    pagination: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                },
                error: {
                    codes: {
                        400: 'Données du message invalides',
                        429: 'Trop de messages',
                        500: 'Erreur serveur'
                    },
                    format: {
                        success: false,
                        error: { type: 'string' },
                        code: { type: 'string' }
                    },
                    logging: true,
                    monitoring: true,
                    recovery: true
                },
                rate: {
                    enabled: true,
                    requests: 5,
                    window: 60000,
                    burst: 2,
                    strategy: 'sliding'
                },
                caching: {
                    strategy: 'no-cache',
                    ttl: 0,
                    tags: [],
                    vary: []
                },
                monitoring: {
                    metrics: true,
                    logging: true,
                    tracing: true,
                    alerts: true,
                    health: true
                },
                documentation: {
                    openapi: true,
                    examples: true,
                    postman: true,
                    sdk: false,
                    changelog: true
                }
            }
        ];
    };
    RestaurantTemplateGenerator.prototype.getProjectStructure = function () {
        return [
            'src/',
            'src/app/',
            'src/app/(pages)/',
            'src/app/api/',
            'src/components/',
            'src/components/ui/',
            'src/lib/',
            'src/hooks/',
            'src/types/',
            'src/styles/',
            'public/',
            'public/images/',
            'public/images/gallery/',
            'public/images/menu/',
            'public/data/',
            'tests/',
            'tests/components/',
            'tests/pages/',
            'tests/api/',
            'tests/e2e/',
            'docs/',
            '.github/',
            '.github/workflows/'
        ];
    };
    RestaurantTemplateGenerator.prototype.getDependencies = function () {
        var baseDeps = {
            'next': '^15.0.0',
            'react': '^18.0.0',
            'react-dom': '^18.0.0',
            'typescript': '^5.0.0',
            '@types/react': '^18.0.0',
            '@types/react-dom': '^18.0.0',
            'tailwindcss': '^3.4.0',
            'autoprefixer': '^10.4.0',
            'postcss': '^8.4.0',
            'clsx': '^2.1.0',
            'tailwind-merge': '^2.2.0',
            'framer-motion': '^11.0.0',
            'lucide-react': '^0.344.0',
            'react-hook-form': '^7.49.0',
            '@hookform/resolvers': '^3.3.0',
            'zod': '^3.22.0',
            'date-fns': '^3.3.0',
            'react-datepicker': '^4.25.0',
            'react-select': '^5.8.0',
            'react-hot-toast': '^2.4.0',
            'react-intersection-observer': '^9.5.0',
            'swiper': '^11.0.0',
            'lightbox2': '^2.11.0',
            '@radix-ui/react-dialog': '^1.0.0',
            '@radix-ui/react-dropdown-menu': '^2.0.0',
            '@radix-ui/react-accordion': '^1.1.0',
            'eslint': '^8.0.0',
            'eslint-config-next': '^15.0.0',
            'prettier': '^3.2.0',
            'prettier-plugin-tailwindcss': '^0.5.0'
        };
        if (this.qualityLevel === 'enterprise') {
            return __assign(__assign({}, baseDeps), { '@testing-library/react': '^14.0.0', '@testing-library/jest-dom': '^6.0.0', '@testing-library/user-event': '^14.0.0', 'jest': '^29.0.0', 'jest-environment-jsdom': '^29.0.0', '@playwright/test': '^1.40.0', 'cypress': '^13.0.0', 'husky': '^9.0.0', 'lint-staged': '^15.0.0', '@commitlint/cli': '^18.0.0', '@commitlint/config-conventional': '^18.0.0', 'semantic-release': '^22.0.0', '@semantic-release/changelog': '^6.0.0', '@semantic-release/git': '^10.0.0' });
        }
        return baseDeps;
    };
    RestaurantTemplateGenerator.prototype.getConfiguration = function () {
        return {
            'next.config.js': {
                experimental: {
                    appDir: true,
                    serverActions: true,
                    serverComponentsExternalPackages: ['sharp']
                },
                images: {
                    domains: ['localhost'],
                    formats: ['image/webp', 'image/avif'],
                    dangerouslyAllowSVG: true,
                    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
                },
                env: {
                    RESTAURANT_NAME: this.context.brand.name,
                    RESTAURANT_PHONE: '+33123456789',
                    RESTAURANT_EMAIL: 'contact@restaurant.fr'
                },
                compiler: {
                    removeConsole: process.env.NODE_ENV === 'production'
                }
            },
            'tailwind.config.js': {
                content: [
                    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
                ],
                theme: {
                    extend: {
                        colors: {
                            primary: {
                                50: '#fef7f0',
                                500: '#f97316',
                                600: '#ea580c',
                                700: '#c2410c',
                                900: '#9a3412'
                            },
                            secondary: {
                                50: '#f8fafc',
                                500: '#64748b',
                                600: '#475569',
                                700: '#334155',
                                900: '#0f172a'
                            }
                        },
                        fontFamily: {
                            sans: ['Inter', 'system-ui', 'sans-serif'],
                            serif: ['Playfair Display', 'serif']
                        },
                        animation: {
                            'fade-in': 'fadeIn 0.5s ease-in-out',
                            'slide-up': 'slideUp 0.5s ease-out',
                            'bounce-gentle': 'bounceGentle 2s infinite'
                        },
                        keyframes: {
                            fadeIn: {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' }
                            },
                            slideUp: {
                                '0%': { transform: 'translateY(20px)', opacity: '0' },
                                '100%': { transform: 'translateY(0)', opacity: '1' }
                            },
                            bounceGentle: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-5px)' }
                            }
                        }
                    }
                },
                plugins: [
                    require('@tailwindcss/forms'),
                    require('@tailwindcss/typography'),
                    require('@tailwindcss/aspect-ratio')
                ]
            },
            'tsconfig.json': {
                compilerOptions: {
                    target: 'es5',
                    lib: ['dom', 'dom.iterable', 'es6'],
                    allowJs: true,
                    skipLibCheck: true,
                    strict: true,
                    noEmit: true,
                    esModuleInterop: true,
                    module: 'esnext',
                    moduleResolution: 'bundler',
                    resolveJsonModule: true,
                    isolatedModules: true,
                    jsx: 'preserve',
                    incremental: true,
                    plugins: [
                        {
                            name: 'next'
                        }
                    ],
                    baseUrl: '.',
                    paths: {
                        '@/*': ['./src/*'],
                        '@/components/*': ['./src/components/*'],
                        '@/lib/*': ['./src/lib/*'],
                        '@/hooks/*': ['./src/hooks/*'],
                        '@/types/*': ['./src/types/*'],
                        '@/styles/*': ['./src/styles/*']
                    }
                },
                include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
                exclude: ['node_modules']
            },
            'package.json': {
                name: "".concat(this.context.projectName.toLowerCase().replace(/\s+/g, '-')),
                version: '1.0.0',
                private: true,
                scripts: {
                    dev: 'next dev',
                    build: 'next build',
                    start: 'next start',
                    lint: 'next lint',
                    'type-check': 'tsc --noEmit',
                    'format:write': 'prettier --write .',
                    'format:check': 'prettier --check .',
                    test: 'jest',
                    'test:watch': 'jest --watch',
                    'test:coverage': 'jest --coverage',
                    'test:e2e': 'playwright test',
                    'test:e2e:ui': 'playwright test --ui',
                    'test:cypress': 'cypress open'
                },
                dependencies: this.getDependencies(),
                engines: {
                    node: '>=18.0.0',
                    npm: '>=9.0.0'
                }
            }
        };
    };
    return RestaurantTemplateGenerator;
}(BaseTemplateGenerator));
exports.RestaurantTemplateGenerator = RestaurantTemplateGenerator;
// ========================================
// TEMPLATE E-COMMERCE (STRUCTURE SIMILAIRE)
// ========================================
var EcommerceTemplateGenerator = /** @class */ (function (_super) {
    __extends(EcommerceTemplateGenerator, _super);
    function EcommerceTemplateGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EcommerceTemplateGenerator.prototype.generateComponents = function () {
        var qualitySpecs = this.getBaseQualitySpecs();
        return [
            {
                name: 'Header',
                type: 'layout',
                purpose: 'Header e-commerce avec navigation et panier',
                props: [
                    { name: 'logo', type: 'string', required: true, description: 'URL du logo', examples: ['/logo.png'] },
                    { name: 'cartItems', type: 'number', required: false, default: 0, description: 'Nombre d\'articles dans le panier', examples: [0, 3, 10] },
                    { name: 'user', type: 'User | null', required: false, description: 'Utilisateur connecté', examples: [null, { name: 'John Doe' }] },
                    { name: 'categories', type: 'Category[]', required: true, description: 'Catégories de navigation', examples: [['Homme', 'Femme', 'Enfant']] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: qualitySpecs.performance,
                seo: {
                    structured: true,
                    meta: false,
                    headings: true,
                    links: true,
                    images: true,
                    schema: ['Organization', 'OnlineStore']
                },
                testing: qualitySpecs.testing,
                integration: __assign(__assign({}, this.getBaseIntegrations()), { apis: ['cart-api', 'auth-api'] }),
                customization: {
                    themes: true,
                    variants: ['simple', 'mega-menu', 'sidebar'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'accent'],
                    animations: ['fade', 'slide'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'ProductCard',
                type: 'display',
                purpose: 'Carte produit avec image, prix et CTA',
                props: [
                    { name: 'product', type: 'Product', required: true, description: 'Données du produit', examples: [{ id: '1', name: 'T-shirt', price: 29.99 }] },
                    { name: 'onAddToCart', type: '(productId: string) => void', required: true, description: 'Ajouter au panier', examples: ['handleAddToCart'] },
                    { name: 'onQuickView', type: '(productId: string) => void', required: false, description: 'Vue rapide', examples: ['handleQuickView'] },
                    { name: 'wishlist', type: 'boolean', required: false, default: false, description: 'Dans la wishlist', examples: [true, false] },
                    { name: 'discount', type: 'number', required: false, description: 'Pourcentage de réduction', examples: [10, 25, 50] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: qualitySpecs.accessibility,
                performance: __assign(__assign({}, qualitySpecs.performance), { lazy: true }),
                seo: {
                    structured: true,
                    meta: false,
                    headings: true,
                    links: true,
                    images: true,
                    schema: ['Product', 'Offer']
                },
                testing: qualitySpecs.testing,
                integration: __assign(__assign({}, this.getBaseIntegrations()), { apis: ['cart-api', 'wishlist-api'] }),
                customization: {
                    themes: true,
                    variants: ['minimal', 'detailed', 'hover-effects'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary', 'neutral'],
                    animations: ['hover', 'fade', 'scale'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'ShoppingCart',
                type: 'interactive',
                purpose: 'Panier d\'achat avec gestion des articles',
                props: [
                    { name: 'items', type: 'CartItem[]', required: true, description: 'Articles du panier', examples: [['T-shirt', 'Pantalon']] },
                    { name: 'onUpdateQuantity', type: '(itemId: string, quantity: number) => void', required: true, description: 'Mettre à jour la quantité', examples: ['handleUpdateQuantity'] },
                    { name: 'onRemoveItem', type: '(itemId: string) => void', required: true, description: 'Supprimer un article', examples: ['handleRemoveItem'] },
                    { name: 'onCheckout', type: '() => void', required: true, description: 'Aller au checkout', examples: ['handleCheckout'] },
                    { name: 'loading', type: 'boolean', required: false, default: false, description: 'État de chargement', examples: [true, false] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: __assign(__assign({}, qualitySpecs.accessibility), { focus: true }),
                performance: qualitySpecs.performance,
                seo: {
                    structured: false,
                    meta: false,
                    headings: true,
                    links: false,
                    images: true,
                    schema: ['ShoppingCart']
                },
                testing: __assign(__assign({}, qualitySpecs.testing), { integration: true }),
                integration: __assign(__assign({}, this.getBaseIntegrations()), { apis: ['cart-api'] }),
                customization: {
                    themes: true,
                    variants: ['sidebar', 'modal', 'page'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary'],
                    animations: ['slide', 'fade'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            },
            {
                name: 'CheckoutForm',
                type: 'form',
                purpose: 'Formulaire de commande avec paiement',
                props: [
                    { name: 'items', type: 'CartItem[]', required: true, description: 'Articles à commander', examples: [['T-shirt', 'Pantalon']] },
                    { name: 'onSubmit', type: '(data: CheckoutData) => void', required: true, description: 'Traitement de la commande', examples: ['handleCheckout'] },
                    { name: 'paymentMethods', type: 'PaymentMethod[]', required: true, description: 'Méthodes de paiement disponibles', examples: [['Card', 'PayPal', 'Apple Pay']] },
                    { name: 'shippingOptions', type: 'ShippingOption[]', required: true, description: 'Options de livraison', examples: [['Standard', 'Express']] },
                    { name: 'loading', type: 'boolean', required: false, default: false, description: 'Traitement en cours', examples: [true, false] }
                ],
                children: false,
                styling: this.getBaseStyling(),
                responsive: true,
                accessibility: __assign(__assign({}, qualitySpecs.accessibility), { focus: true }),
                performance: qualitySpecs.performance,
                seo: {
                    structured: false,
                    meta: false,
                    headings: true,
                    links: false,
                    images: false,
                    schema: ['CheckoutForm']
                },
                testing: __assign(__assign({}, qualitySpecs.testing), { integration: true }),
                integration: __assign(__assign({}, this.getBaseIntegrations()), { apis: ['checkout-api', 'payment-api'], external: ['stripe'] }),
                customization: {
                    themes: true,
                    variants: ['single-page', 'multi-step', 'express'],
                    sizes: ['sm', 'md', 'lg'],
                    colors: ['primary', 'secondary'],
                    animations: ['slide', 'fade'],
                    responsive: ['mobile', 'tablet', 'desktop']
                }
            }
        ];
    };
    EcommerceTemplateGenerator.prototype.generatePages = function () {
        // Implementation similaire avec les pages e-commerce
        return [
            {
                name: 'HomePage',
                route: '/',
                type: 'landing',
                layout: 'default',
                components: ['Header', 'HeroSection', 'FeaturedProducts', 'Categories', 'Footer'],
                data: {
                    sources: [
                        {
                            name: 'featured-products',
                            type: 'api',
                            endpoint: '/api/products/featured',
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                            authentication: null,
                            params: {},
                            timeout: 5000,
                            retries: 3
                        }
                    ],
                    fetching: 'ssg',
                    caching: { strategy: 'stale-while-revalidate', ttl: 3600, tags: ['products'], vary: [] },
                    validation: { schema: null, sanitization: true, transformation: true, errorHandling: 'fallback' },
                    transformation: { normalize: true, filter: true, sort: true, paginate: false, aggregate: false, custom: [] }
                },
                meta: {
                    title: "".concat(this.context.brand.name, " - Boutique en ligne"),
                    description: "D\u00E9couvrez notre collection ".concat(this.context.brand.name, ". Livraison rapide et service client de qualit\u00E9."),
                    keywords: ['boutique', 'shopping', 'mode', 'vêtements', this.context.brand.name],
                    canonical: '/',
                    robots: 'index,follow',
                    openGraph: {
                        title: "".concat(this.context.brand.name, " - Boutique en ligne"),
                        description: "D\u00E9couvrez notre collection ".concat(this.context.brand.name, ". Livraison rapide et service client de qualit\u00E9."),
                        image: '/og-image.jpg',
                        url: '/',
                        type: 'website',
                        siteName: this.context.brand.name,
                        locale: 'fr_FR'
                    },
                    twitter: {
                        card: 'summary_large_image',
                        site: '@shop',
                        creator: '@shop',
                        title: "".concat(this.context.brand.name, " - Boutique en ligne"),
                        description: "D\u00E9couvrez notre collection ".concat(this.context.brand.name, ". Livraison rapide et service client de qualit\u00E9."),
                        image: '/twitter-image.jpg'
                    },
                    jsonLd: [
                        {
                            '@context': 'https://schema.org',
                            '@type': 'OnlineStore',
                            name: this.context.brand.name,
                            description: "Boutique en ligne ".concat(this.context.brand.name),
                            url: '/'
                        }
                    ]
                },
                performance: {
                    priority: 'high',
                    prefetch: true,
                    preload: ['/hero-bg.jpg'],
                    critical: true,
                    streaming: true,
                    compression: true,
                    optimization: ['images', 'fonts', 'critical-css']
                },
                accessibility: this.getBaseQualitySpecs().accessibility,
                seo: {
                    structured: true,
                    breadcrumbs: false,
                    pagination: false,
                    canonical: true,
                    alternates: [],
                    sitemap: true,
                    robots: true
                },
                analytics: {
                    pageView: true,
                    events: [
                        { name: 'view_item_list', trigger: 'view', parameters: { item_list_name: 'featured_products' } },
                        { name: 'add_to_cart', trigger: 'click', parameters: { currency: 'EUR', value: 0 } }
                    ],
                    conversion: [
                        { name: 'purchase', goal: 'purchase', value: 0, currency: 'EUR', funnel: ['page_view', 'add_to_cart', 'begin_checkout', 'purchase'] }
                    ],
                    audiences: ['shoppers', 'returning_customers'],
                    experiments: []
                },
                authentication: { required: false, roles: [], permissions: [], redirect: '', fallback: '' },
                internationalization: { enabled: false, locales: ['fr'], defaultLocale: 'fr', fallback: 'fr', namespaces: ['common'], detection: false }
            }
            // Autres pages e-commerce...
        ];
    };
    EcommerceTemplateGenerator.prototype.generateAPIs = function () {
        // APIs spécifiques e-commerce
        return [
            {
                name: 'ProductsAPI',
                route: '/api/products',
                method: 'GET',
                type: 'rest',
                authentication: { required: false, methods: [], scopes: [], roles: [], rateLimit: false },
                validation: {
                    input: {
                        query: {
                            category: { type: 'string', required: false },
                            search: { type: 'string', required: false },
                            page: { type: 'number', required: false, minimum: 1, default: 1 },
                            limit: { type: 'number', required: false, minimum: 1, maximum: 100, default: 20 }
                        }
                    },
                    sanitization: true,
                    transformation: true,
                    strict: false
                },
                processing: {
                    database: true,
                    external: [],
                    background: false,
                    transaction: false,
                    idempotent: true,
                    timeout: 10000
                },
                response: {
                    format: 'json',
                    structure: {
                        products: {
                            type: 'array',
                            items: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                description: { type: 'string' },
                                price: { type: 'number' },
                                images: { type: 'array', items: { type: 'string' } },
                                category: { type: 'string' },
                                stock: { type: 'number' },
                                featured: { type: 'boolean' }
                            }
                        },
                        pagination: {
                            page: { type: 'number' },
                            limit: { type: 'number' },
                            total: { type: 'number' },
                            hasNext: { type: 'boolean' },
                            hasPrev: { type: 'boolean' }
                        }
                    },
                    compression: true,
                    streaming: false,
                    pagination: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'public, max-age=1800'
                    }
                },
                error: {
                    codes: {
                        400: 'Paramètres invalides',
                        404: 'Aucun produit trouvé',
                        500: 'Erreur serveur'
                    },
                    format: {
                        success: false,
                        error: { type: 'string' },
                        code: { type: 'string' }
                    },
                    logging: true,
                    monitoring: true,
                    recovery: true
                },
                rate: { enabled: false, requests: 0, window: 0, burst: 0, strategy: 'fixed' },
                caching: {
                    strategy: 'stale-while-revalidate',
                    ttl: 1800,
                    tags: ['products'],
                    vary: ['category', 'search', 'page', 'limit']
                },
                monitoring: {
                    metrics: true,
                    logging: true,
                    tracing: false,
                    alerts: false,
                    health: true
                },
                documentation: {
                    openapi: true,
                    examples: true,
                    postman: true,
                    sdk: false,
                    changelog: true
                }
            }
            // Autres APIs e-commerce...
        ];
    };
    EcommerceTemplateGenerator.prototype.getProjectStructure = function () {
        return [
            'src/',
            'src/app/',
            'src/app/(shop)/',
            'src/app/api/',
            'src/components/',
            'src/components/ui/',
            'src/components/cart/',
            'src/components/checkout/',
            'src/lib/',
            'src/hooks/',
            'src/store/',
            'src/types/',
            'src/styles/',
            'public/',
            'public/images/',
            'public/images/products/',
            'public/data/',
            'tests/',
            'docs/',
            '.github/'
        ];
    };
    EcommerceTemplateGenerator.prototype.getDependencies = function () {
        return __assign(__assign({}, _super.prototype.getDependencies.call(this)), { 'zustand': '^4.4.0', '@stripe/stripe-js': '^2.4.0', 'stripe': '^14.0.0', 'react-query': '^3.39.0', 'axios': '^1.6.0', 'react-image-gallery': '^1.3.0', 'react-rating-stars-component': '^2.2.0' });
    };
    EcommerceTemplateGenerator.prototype.getConfiguration = function () {
        return __assign(__assign({}, _super.prototype.getConfiguration.call(this)), { 'stripe.config.js': {
                publishableKey: 'pk_test_...',
                secretKey: 'sk_test_...',
                webhookSecret: 'whsec_...',
                currency: 'eur',
                successUrl: '/checkout/success',
                cancelUrl: '/checkout/cancel'
            } });
    };
    return EcommerceTemplateGenerator;
}(BaseTemplateGenerator));
exports.EcommerceTemplateGenerator = EcommerceTemplateGenerator;
// ========================================
// TEMPLATE SAAS (STRUCTURE SIMILAIRE, PLUS COMPLEXE)
// ========================================
var SaasTemplateGenerator = /** @class */ (function (_super) {
    __extends(SaasTemplateGenerator, _super);
    function SaasTemplateGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaasTemplateGenerator.prototype.generateComponents = function () {
        // Implementation SaaS avec Dashboard, Billing, Auth, etc.
        return [];
    };
    SaasTemplateGenerator.prototype.generatePages = function () {
        // Pages SaaS: Landing, Pricing, Dashboard, Settings, etc.
        return [];
    };
    SaasTemplateGenerator.prototype.generateAPIs = function () {
        // APIs SaaS: Auth, Billing, Usage, etc.
        return [];
    };
    SaasTemplateGenerator.prototype.getProjectStructure = function () {
        return [];
    };
    SaasTemplateGenerator.prototype.getDependencies = function () {
        return {};
    };
    SaasTemplateGenerator.prototype.getConfiguration = function () {
        return {};
    };
    return SaasTemplateGenerator;
}(BaseTemplateGenerator));
exports.SaasTemplateGenerator = SaasTemplateGenerator;
// ========================================
// TEMPLATE PORTFOLIO (STRUCTURE SIMILAIRE, PLUS SIMPLE)
// ========================================
var PortfolioTemplateGenerator = /** @class */ (function (_super) {
    __extends(PortfolioTemplateGenerator, _super);
    function PortfolioTemplateGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortfolioTemplateGenerator.prototype.generateComponents = function () {
        // Components Portfolio: Hero, Projects, Skills, Contact
        return [];
    };
    PortfolioTemplateGenerator.prototype.generatePages = function () {
        // Pages Portfolio: Home, Projects, About, Contact
        return [];
    };
    PortfolioTemplateGenerator.prototype.generateAPIs = function () {
        // APIs Portfolio: Contact, Projects
        return [];
    };
    PortfolioTemplateGenerator.prototype.getProjectStructure = function () {
        return [];
    };
    PortfolioTemplateGenerator.prototype.getDependencies = function () {
        return {};
    };
    PortfolioTemplateGenerator.prototype.getConfiguration = function () {
        return {};
    };
    return PortfolioTemplateGenerator;
}(BaseTemplateGenerator));
exports.PortfolioTemplateGenerator = PortfolioTemplateGenerator;
// ========================================
// FACTORY POUR TEMPLATES
// ========================================
var TemplateGeneratorFactory = /** @class */ (function () {
    function TemplateGeneratorFactory() {
    }
    TemplateGeneratorFactory.create = function (projectType, qualityLevel, context) {
        switch (projectType) {
            case 'restaurant':
                return new RestaurantTemplateGenerator(projectType, qualityLevel, context);
            case 'ecommerce':
                return new EcommerceTemplateGenerator(projectType, qualityLevel, context);
            case 'saas':
                return new SaasTemplateGenerator(projectType, qualityLevel, context);
            case 'portfolio':
                return new PortfolioTemplateGenerator(projectType, qualityLevel, context);
            default:
                throw new Error("Type de projet non support\u00E9: ".concat(projectType));
        }
    };
    TemplateGeneratorFactory.getAvailableTemplates = function () {
        return ['restaurant', 'ecommerce', 'saas', 'portfolio'];
    };
    TemplateGeneratorFactory.getTemplateInfo = function (projectType) {
        switch (projectType) {
            case 'restaurant':
                return {
                    components: ['Header', 'HeroSection', 'MenuSection', 'ChefSection', 'GallerySection', 'TestimonialsSection', 'ReservationForm', 'ContactSection', 'Footer'],
                    pages: ['HomePage', 'MenuPage', 'AboutPage', 'ContactPage', 'ReservationPage'],
                    features: ['online-reservation', 'menu-display', 'gallery', 'contact-form', 'testimonials'],
                    estimatedTimeline: 4,
                    complexity: 'medium'
                };
            case 'ecommerce':
                return {
                    components: ['Header', 'ProductCard', 'ProductGrid', 'ShoppingCart', 'CheckoutForm', 'PaymentGateway', 'UserAccount', 'OrderHistory', 'ProductSearch', 'CategoryFilter'],
                    pages: ['HomePage', 'ProductsPage', 'ProductDetailPage', 'CartPage', 'CheckoutPage', 'AccountPage', 'OrdersPage'],
                    features: ['product-catalog', 'shopping-cart', 'payment-processing', 'user-accounts', 'order-management', 'inventory-tracking'],
                    estimatedTimeline: 8,
                    complexity: 'high'
                };
            case 'saas':
                return {
                    components: ['Header', 'Dashboard', 'FeatureSection', 'PricingTable', 'AuthForms', 'UserProfile', 'SubscriptionManager', 'AnalyticsDashboard', 'APIDocumentation', 'BillingSection'],
                    pages: ['LandingPage', 'DashboardPage', 'PricingPage', 'LoginPage', 'SignupPage', 'ProfilePage', 'BillingPage', 'SettingsPage', 'DocsPage'],
                    features: ['user-authentication', 'subscription-billing', 'dashboard', 'api-integration', 'analytics', 'user-management', 'role-based-access'],
                    estimatedTimeline: 12,
                    complexity: 'high'
                };
            case 'portfolio':
                return {
                    components: ['Header', 'HeroSection', 'AboutSection', 'ProjectsGrid', 'ProjectCard', 'SkillsSection', 'ContactForm', 'Footer', 'ProjectModal'],
                    pages: ['HomePage', 'AboutPage', 'ProjectsPage', 'ContactPage', 'ProjectDetailPage'],
                    features: ['project-showcase', 'about-section', 'contact-form', 'responsive-design', 'animations', 'blog-integration'],
                    estimatedTimeline: 3,
                    complexity: 'low'
                };
            default:
                throw new Error("Type de projet non support\u00E9: ".concat(projectType));
        }
    };
    return TemplateGeneratorFactory;
}());
exports.TemplateGeneratorFactory = TemplateGeneratorFactory;
exports.default = TemplateGeneratorFactory;
