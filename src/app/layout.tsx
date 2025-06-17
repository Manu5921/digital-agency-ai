import type { Metadata } from 'next'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

const dancing = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing'
})

export const metadata: Metadata = {
  title: 'Le Gourmet - Restaurant Gastronomique Étoilé Paris | Chef Antoine Dubois',
  description: 'Restaurant gastronomique étoilé Michelin au cœur de Paris. Cuisine française raffinée par le Chef Antoine Dubois. Réservation en ligne. Expérience gastronomique inoubliable.',
  keywords: 'restaurant gastronomique paris, étoile michelin, chef antoine dubois, cuisine française, restaurant étoilé, réservation restaurant paris, gastronomie française',
  authors: [{ name: 'Digital Agency AI' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Le Gourmet - Restaurant Gastronomique Étoilé Paris',
    description: 'Restaurant gastronomique étoilé Michelin au cœur de Paris. Cuisine française raffinée par le Chef Antoine Dubois.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Gourmet',
    url: 'https://legourmet-paris.fr',
    images: [
      {
        url: 'https://legourmet-paris.fr/images/og-restaurant.jpg',
        width: 1200,
        height: 630,
        alt: 'Restaurant Le Gourmet - Intérieur élégant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Gourmet - Restaurant Gastronomique Étoilé Paris',
    description: 'Restaurant gastronomique étoilé Michelin au cœur de Paris. Cuisine française raffinée par le Chef Antoine Dubois.',
    images: ['https://legourmet-paris.fr/images/twitter-restaurant.jpg'],
    site: '@legourmetparis',
    creator: '@legourmetparis',
  },
  other: {
    'geo.region': 'FR-75',
    'geo.placename': 'Paris',
    'geo.position': '48.8566;2.3522',
    'ICBM': '48.8566, 2.3522',
    'format-detection': 'telephone=yes',
    'theme-color': '#d4af37',
    'business:contact_data:street_address': '15 Rue de la Gastronomie',
    'business:contact_data:locality': 'Paris',
    'business:contact_data:postal_code': '75001',
    'business:contact_data:country_name': 'France',
    'business:contact_data:phone_number': '+33142601578',
    'business:contact_data:website': 'https://legourmet-paris.fr'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Le Gourmet",
    "description": "Restaurant gastronomique premium au cœur de Paris. Cuisine raffinée par le Chef étoilé Antoine Dubois. Réservation en ligne.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "15 Rue de la Gastronomie",
      "addressLocality": "Paris",
      "addressCountry": "FR",
      "postalCode": "75001"
    },
    "telephone": "+33142601578",
    "url": "https://legourmet-paris.fr",
    "email": "contact@legourmet-paris.fr",
    "servesCuisine": ["Cuisine française", "Gastronomie", "Cuisine moderne"],
    "priceRange": "$$$",
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
  };

  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema),
          }}
        />
      </head>
      <body className="font-body text-gray-800 bg-background antialiased">
        {children}
      </body>
    </html>
  )
}