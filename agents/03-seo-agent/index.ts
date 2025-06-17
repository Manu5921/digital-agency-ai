/**
 * SEO Agent - Restaurant Local Optimization
 * Sp�cialis� dans le r�f�rencement technique et strat�gique pour restaurants
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
   * G�n�re le Schema.org structur� pour restaurant
   */
  generateRestaurantSchema(): string {
    return `{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "${this.config.businessName}",
  "description": "Restaurant gastronomique premium au cSur de ${this.config.city}. Cuisine raffin�e par le Chef �toil� Antoine Dubois. R�servation en ligne.",
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
  "award": "�toile Michelin 2020-2024",
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
   * G�n�re les meta tags optimis�s
   */
  generateMetaTags(): Record<string, string> {
    return {
      // Meta tags de base
      'title': 'Le Gourmet - Restaurant Gastronomique �toil� Paris | Chef Antoine Dubois',
      'description': 'Restaurant gastronomique �toil� Michelin au cSur de Paris. Cuisine fran�aise raffin�e par le Chef Antoine Dubois. R�servation en ligne. Exp�rience gastronomique inoubliable.',
      'keywords': 'restaurant gastronomique paris, �toile michelin, chef antoine dubois, cuisine fran�aise, restaurant �toil�, r�servation restaurant paris, gastronomie fran�aise',
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'author': 'Le Gourmet Paris',
      'viewport': 'width=device-width, initial-scale=1.0',
      'canonical': 'https://legourmet-paris.fr',

      // Open Graph (Facebook)
      'og:type': 'restaurant',
      'og:title': 'Le Gourmet - Restaurant Gastronomique �toil� Paris',
      'og:description': 'Restaurant gastronomique �toil� Michelin au cSur de Paris. Cuisine fran�aise raffin�e par le Chef Antoine Dubois.',
      'og:url': 'https://legourmet-paris.fr',
      'og:site_name': 'Le Gourmet',
      'og:image': 'https://legourmet-paris.fr/images/og-restaurant.jpg',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'Restaurant Le Gourmet - Int�rieur �l�gant',
      'og:locale': 'fr_FR',

      // Twitter Cards
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Le Gourmet - Restaurant Gastronomique �toil� Paris',
      'twitter:description': 'Restaurant gastronomique �toil� Michelin au cSur de Paris. Cuisine fran�aise raffin�e par le Chef Antoine Dubois.',
      'twitter:image': 'https://legourmet-paris.fr/images/twitter-restaurant.jpg',
      'twitter:image:alt': 'Restaurant Le Gourmet - Chef Antoine Dubois',
      'twitter:site': '@legourmetparis',
      'twitter:creator': '@legourmetparis',

      // G�olocalisation
      'geo.region': 'FR-75',
      'geo.placename': 'Paris',
      'geo.position': '48.8566;2.3522',
      'ICBM': '48.8566, 2.3522',

      // Mobile
      'format-detection': 'telephone=yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'theme-color': '#d4af37',

      // R�f�rencement local
      'business:contact_data:street_address': '15 Rue de la Gastronomie',
      'business:contact_data:locality': 'Paris',
      'business:contact_data:postal_code': '75001',
      'business:contact_data:country_name': 'France',
      'business:contact_data:phone_number': '+33142601578',
      'business:contact_data:website': 'https://legourmet-paris.fr'
    };
  }

  /**
   * G�n�re le sitemap XML
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
   * Analyse des mots-cl�s restaurant local
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
        'restaurant �toil� paris',
        'chef �toil� paris',
        'cuisine fran�aise raffin�e'
      ],
      secondary: [
        'restaurant michelin paris',
        'gastronomie fran�aise',
        'restaurant haute cuisine',
        'chef antoine dubois',
        'r�servation restaurant �toil�'
      ],
      longTail: [
        'meilleur restaurant gastronomique paris 1er',
        'restaurant �toile michelin r�servation en ligne',
        'chef �toil� cuisine fran�aise moderne',
        'restaurant romantique paris gastronomique',
        'd�ner gastronomique paris occasion sp�ciale'
      ],
      local: [
        'restaurant gastronomique 1er arrondissement',
        'restaurant �toil� ch�telet',
        'cuisine fran�aise louvre',
        'restaurant romantique centre paris',
        'gastronomie �le de france'
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
        'hero': 'Restaurant Le Gourmet - Salle � manger �l�gante avec vue cuisine ouverte',
        'chef': 'Chef Antoine Dubois en tenue de cuisine dans son restaurant �toil�',
        'plat-1': 'Foie gras po�l� compot�e de figues plat signature Le Gourmet',
        'plat-2': 'Saint-Jacques snack�es pur�e topinambour truffe noire',
        'plat-3': 'BSuf de Wagyu l�gumes glac�s jus de viande restaurant gastronomique',
        'interieur': 'Int�rieur restaurant Le Gourmet ambiance feutr�e tables dress�es',
        'cuisine': 'Cuisine professionnelle Le Gourmet chef au travail',
        'dessert': 'Dessert signature p�tisserie fine restaurant �toil� Paris'
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
        'Impl�menter le cache navigateur pour les ressources statiques',
        'Minifier CSS et JavaScript',
        'Utiliser un CDN pour les images',
        'Optimiser les fonts avec font-display: swap',
        'Impl�menter le preloading pour les ressources critiques',
        'R�duire la taille du DOM (objectif <1500 �l�ments)',
        'Optimiser les animations CSS pour �viter le layout shift'
      ],
      criticalIssues: [
        'Ajouter les meta tags Open Graph manquants',
        'Corriger les erreurs de validation HTML',
        'Impl�menter le Schema.org Restaurant',
        'Optimiser les titres H1-H6 pour la hi�rarchie',
        'Ajouter les attributs alt sur toutes les images',
        'Configurer HTTPS et redirections 301',
        'Cr�er et soumettre le sitemap XML'
      ]
    };
  }

  /**
   * Strat�gie de contenu local
   */
  getContentStrategy(): {
    topics: string[];
    calendar: Record<string, string[]>;
    localSEO: string[];
  } {
    return {
      topics: [
        'Histoire et tradition de la gastronomie fran�aise',
        'Techniques culinaires du Chef Antoine Dubois',
        'Produits de saison et sourcing local',
        'Accords mets et vins',
        '�v�nements priv�s et occasions sp�ciales',
        'Guide des sp�cialit�s r�gionales fran�aises'
      ],
      calendar: {
        'Janvier': ['Menu hivernal', 'Truffe noire P�rigord', 'Saint-Valentin'],
        'F�vrier': ['Saint-Valentin gastronomique', 'Produits de saison'],
        'Mars': ['Printemps culinaire', 'Asperges nouvelles'],
        'Avril': ['Cuisine de P�ques', 'Agneau de lait'],
        'Mai': ['Terrasse �t�', 'L�gumes primeurs'],
        'Juin': ['Cuisine estivale', 'Produits m�diterran�ens'],
        'Juillet': ['Menu �t�', 'Vacances gourmandes'],
        'Ao�t': ['Saison des fruits', 'Cuisine l�g�re'],
        'Septembre': ['Rentr�e gastronomique', 'Champignons'],
        'Octobre': ['Automne saveurs', 'Gibier de saison'],
        'Novembre': ['Menu automnal', 'Ch�taignes et marrons'],
        'D�cembre': ['F�tes de fin d\'ann�e', 'R�veillons']
      },
      localSEO: [
        'Restaurant gastronomique 1er arrondissement Paris',
        '�toile Michelin Ch�telet Les Halles',
        'Chef �toil� pr�s du Louvre',
        'Cuisine fran�aise �le de la Cit�',
        'Restaurant romantique Marais',
        'Gastronomie Beaubourg Pompidou'
      ]
    };
  }
}

// Configuration par d�faut pour Le Gourmet
const restaurantSEOConfig: RestaurantSEOConfig = {
  businessName: 'Le Gourmet',
  address: '15 Rue de la Gastronomie, 75001 Paris',
  city: 'Paris',
  phone: '+33142601578',
  cuisine: ['Cuisine fran�aise', 'Gastronomie', 'Cuisine moderne'],
  priceRange: '$$$',
  features: ['�toile Michelin', 'Chef �toil�', 'R�servation en ligne'],
  keywords: {
    primary: ['restaurant gastronomique paris', 'restaurant �toil�', 'chef �toil�'],
    secondary: ['cuisine fran�aise', 'michelin', 'gastronomie'],
    local: ['restaurant 1er arrondissement', 'ch�telet', 'louvre']
  }
};

export default new SEOAgent(restaurantSEOConfig);