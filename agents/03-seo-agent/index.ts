/**
 * SEO Agent - Restaurant Local Optimization
 * Spécialisé dans le référencement technique et stratégique pour restaurants
 */

export interface RestaurantSEOConfig {
  businessName: string;
  address: string;
  city: string;
  phone: string;
  cuisine: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  features: string[];
  keywords: {
    primary: string[];
    secondary: string[];
    local: string[];
  };
}

export class SEOAgent {
  private config: RestaurantSEOConfig;

  constructor(config: RestaurantSEOConfig) {
    this.config = config;
  }

  /**
   * Génère le Schema.org structuré pour restaurant
   */
  generateRestaurantSchema(): string {
    return `{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "${this.config.businessName}",
  "description": "Restaurant gastronomique premium au cSur de ${this.config.city}. Cuisine raffinée par le Chef étoilé Antoine Dubois. Réservation en ligne.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${this.config.address}",
    "addressLocality": "${this.config.city}",
    "addressCountry": "FR",
    "postalCode": "75001"
  },
  "telephone": "${this.config.phone}",
  "url": "https://legourmet-paris.fr",
  "email": "contact@legourmet-paris.fr",
  "servesCuisine": ${JSON.stringify(this.config.cuisine)},
  "priceRange": "${this.config.priceRange}",
  "acceptsReservations": true,
  "hasMenu": "https://legourmet-paris.fr#menu",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "19:00",
      "closes": "23:00"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5"
  },
  "starRating": {
    "@type": "Rating",
    "ratingValue": "1"
  },
  "award": "Étoile Michelin 2020-2024",
  "founder": {
    "@type": "Person",
    "name": "Chef Antoine Dubois"
  },
  "image": [
    "https://legourmet-paris.fr/images/restaurant-hero.jpg",
    "https://legourmet-paris.fr/images/chef-antoine.jpg",
    "https://legourmet-paris.fr/images/interior.jpg"
  ],
  "sameAs": [
    "https://www.facebook.com/legourmetparis",
    "https://www.instagram.com/legourmetparis",
    "https://www.tripadvisor.fr/legourmet"
  ]
}`;
  }

  /**
   * Génère les meta tags optimisés
   */
  generateMetaTags(): Record<string, string> {
    return {
      // Meta tags de base
      'title': 'Le Gourmet - Restaurant Gastronomique Étoilé Paris | Chef Antoine Dubois',
      'description': 'Restaurant gastronomique étoilé Michelin au cSur de Paris. Cuisine française raffinée par le Chef Antoine Dubois. Réservation en ligne. Expérience gastronomique inoubliable.',
      'keywords': 'restaurant gastronomique paris, étoile michelin, chef antoine dubois, cuisine française, restaurant étoilé, réservation restaurant paris, gastronomie française',
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'author': 'Le Gourmet Paris',
      'viewport': 'width=device-width, initial-scale=1.0',
      'canonical': 'https://legourmet-paris.fr',

      // Open Graph (Facebook)
      'og:type': 'restaurant',
      'og:title': 'Le Gourmet - Restaurant Gastronomique Étoilé Paris',
      'og:description': 'Restaurant gastronomique étoilé Michelin au cSur de Paris. Cuisine française raffinée par le Chef Antoine Dubois.',
      'og:url': 'https://legourmet-paris.fr',
      'og:site_name': 'Le Gourmet',
      'og:image': 'https://legourmet-paris.fr/images/og-restaurant.jpg',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'Restaurant Le Gourmet - Intérieur élégant',
      'og:locale': 'fr_FR',

      // Twitter Cards
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Le Gourmet - Restaurant Gastronomique Étoilé Paris',
      'twitter:description': 'Restaurant gastronomique étoilé Michelin au cSur de Paris. Cuisine française raffinée par le Chef Antoine Dubois.',
      'twitter:image': 'https://legourmet-paris.fr/images/twitter-restaurant.jpg',
      'twitter:image:alt': 'Restaurant Le Gourmet - Chef Antoine Dubois',
      'twitter:site': '@legourmetparis',
      'twitter:creator': '@legourmetparis',

      // Géolocalisation
      'geo.region': 'FR-75',
      'geo.placename': 'Paris',
      'geo.position': '48.8566;2.3522',
      'ICBM': '48.8566, 2.3522',

      // Mobile
      'format-detection': 'telephone=yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'theme-color': '#d4af37',

      // Référencement local
      'business:contact_data:street_address': '15 Rue de la Gastronomie',
      'business:contact_data:locality': 'Paris',
      'business:contact_data:postal_code': '75001',
      'business:contact_data:country_name': 'France',
      'business:contact_data:phone_number': '+33142601578',
      'business:contact_data:website': 'https://legourmet-paris.fr'
    };
  }

  /**
   * Génère le sitemap XML
   */
  generateSitemap(): string {
    const baseUrl = 'https://legourmet-paris.fr';
    const lastmod = new Date().toISOString().split('T')[0];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}#menu</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}#chef</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}#galerie</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}#contact</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}#reservation</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  }

  /**
   * Analyse des mots-clés restaurant local
   */
  getKeywordStrategy(): {
    primary: string[];
    secondary: string[];
    longTail: string[];
    local: string[];
  } {
    return {
      primary: [
        'restaurant gastronomique paris',
        'restaurant étoilé paris',
        'chef étoilé paris',
        'cuisine française raffinée'
      ],
      secondary: [
        'restaurant michelin paris',
        'gastronomie française',
        'restaurant haute cuisine',
        'chef antoine dubois',
        'réservation restaurant étoilé'
      ],
      longTail: [
        'meilleur restaurant gastronomique paris 1er',
        'restaurant étoile michelin réservation en ligne',
        'chef étoilé cuisine française moderne',
        'restaurant romantique paris gastronomique',
        'dîner gastronomique paris occasion spéciale'
      ],
      local: [
        'restaurant gastronomique 1er arrondissement',
        'restaurant étoilé châtelet',
        'cuisine française louvre',
        'restaurant romantique centre paris',
        'gastronomie île de france'
      ]
    };
  }

  /**
   * Optimisation des images
   */
  generateImageOptimization(): {
    altTexts: Record<string, string>;
    fileNames: string[];
    webpSupport: boolean;
  } {
    return {
      altTexts: {
        'hero': 'Restaurant Le Gourmet - Salle à manger élégante avec vue cuisine ouverte',
        'chef': 'Chef Antoine Dubois en tenue de cuisine dans son restaurant étoilé',
        'plat-1': 'Foie gras poêlé compotée de figues plat signature Le Gourmet',
        'plat-2': 'Saint-Jacques snackées purée topinambour truffe noire',
        'plat-3': 'BSuf de Wagyu légumes glacés jus de viande restaurant gastronomique',
        'interieur': 'Intérieur restaurant Le Gourmet ambiance feutrée tables dressées',
        'cuisine': 'Cuisine professionnelle Le Gourmet chef au travail',
        'dessert': 'Dessert signature pâtisserie fine restaurant étoilé Paris'
      },
      fileNames: [
        'restaurant-le-gourmet-hero-1200x630.webp',
        'chef-antoine-dubois-portrait-800x600.webp',
        'foie-gras-poele-plat-signature-600x400.webp',
        'saint-jacques-snackees-truffe-600x400.webp',
        'boeuf-wagyu-legumes-glaces-600x400.webp',
        'interieur-restaurant-elegant-800x600.webp',
        'cuisine-professionnelle-chef-800x600.webp',
        'dessert-signature-patisserie-600x400.webp'
      ],
      webpSupport: true
    };
  }

  /**
   * Configuration robots.txt
   */
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Sitemap
Sitemap: https://legourmet-paris.fr/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

# Allow images
Allow: /images/
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.webp$`;
  }

  /**
   * Audit technique SEO
   */
  getTechnicalAudit(): {
    coreWebVitals: Record<string, any>;
    recommendations: string[];
    criticalIssues: string[];
  } {
    return {
      coreWebVitals: {
        lcp: { target: '<2.5s', description: 'Largest Contentful Paint' },
        fid: { target: '<100ms', description: 'First Input Delay' },
        cls: { target: '<0.1', description: 'Cumulative Layout Shift' },
        ttfb: { target: '<600ms', description: 'Time to First Byte' }
      },
      recommendations: [
        'Optimiser les images en format WebP avec lazy loading',
        'Implémenter le cache navigateur pour les ressources statiques',
        'Minifier CSS et JavaScript',
        'Utiliser un CDN pour les images',
        'Optimiser les fonts avec font-display: swap',
        'Implémenter le preloading pour les ressources critiques',
        'Réduire la taille du DOM (objectif <1500 éléments)',
        'Optimiser les animations CSS pour éviter le layout shift'
      ],
      criticalIssues: [
        'Ajouter les meta tags Open Graph manquants',
        'Corriger les erreurs de validation HTML',
        'Implémenter le Schema.org Restaurant',
        'Optimiser les titres H1-H6 pour la hiérarchie',
        'Ajouter les attributs alt sur toutes les images',
        'Configurer HTTPS et redirections 301',
        'Créer et soumettre le sitemap XML'
      ]
    };
  }

  /**
   * Stratégie de contenu local
   */
  getContentStrategy(): {
    topics: string[];
    calendar: Record<string, string[]>;
    localSEO: string[];
  } {
    return {
      topics: [
        'Histoire et tradition de la gastronomie française',
        'Techniques culinaires du Chef Antoine Dubois',
        'Produits de saison et sourcing local',
        'Accords mets et vins',
        'Événements privés et occasions spéciales',
        'Guide des spécialités régionales françaises'
      ],
      calendar: {
        'Janvier': ['Menu hivernal', 'Truffe noire Périgord', 'Saint-Valentin'],
        'Février': ['Saint-Valentin gastronomique', 'Produits de saison'],
        'Mars': ['Printemps culinaire', 'Asperges nouvelles'],
        'Avril': ['Cuisine de Pâques', 'Agneau de lait'],
        'Mai': ['Terrasse été', 'Légumes primeurs'],
        'Juin': ['Cuisine estivale', 'Produits méditerranéens'],
        'Juillet': ['Menu été', 'Vacances gourmandes'],
        'Août': ['Saison des fruits', 'Cuisine légère'],
        'Septembre': ['Rentrée gastronomique', 'Champignons'],
        'Octobre': ['Automne saveurs', 'Gibier de saison'],
        'Novembre': ['Menu automnal', 'Châtaignes et marrons'],
        'Décembre': ['Fêtes de fin d\'année', 'Réveillons']
      },
      localSEO: [
        'Restaurant gastronomique 1er arrondissement Paris',
        'Étoile Michelin Châtelet Les Halles',
        'Chef étoilé près du Louvre',
        'Cuisine française Île de la Cité',
        'Restaurant romantique Marais',
        'Gastronomie Beaubourg Pompidou'
      ]
    };
  }
}

// Configuration par défaut pour Le Gourmet
const restaurantSEOConfig: RestaurantSEOConfig = {
  businessName: 'Le Gourmet',
  address: '15 Rue de la Gastronomie, 75001 Paris',
  city: 'Paris',
  phone: '+33142601578',
  cuisine: ['Cuisine française', 'Gastronomie', 'Cuisine moderne'],
  priceRange: '$$$',
  features: ['Étoile Michelin', 'Chef étoilé', 'Réservation en ligne'],
  keywords: {
    primary: ['restaurant gastronomique paris', 'restaurant étoilé', 'chef étoilé'],
    secondary: ['cuisine française', 'michelin', 'gastronomie'],
    local: ['restaurant 1er arrondissement', 'châtelet', 'louvre']
  }
};

export default new SEOAgent(restaurantSEOConfig);