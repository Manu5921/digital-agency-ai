import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { fitcoachContent } from '../content/fitcoach-content'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: fitcoachContent.seo.title,
  description: fitcoachContent.seo.description,
  metadataBase: new URL('https://fitcoach-pro.vercel.app'),
  keywords: fitcoachContent.seo.keywords,
  authors: [{ name: fitcoachContent.business.coach.name }],
  creator: fitcoachContent.business.name,
  publisher: fitcoachContent.business.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://fitcoach-pro.vercel.app',
    title: fitcoachContent.seo.title,
    description: fitcoachContent.seo.description,
    siteName: fitcoachContent.business.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: fitcoachContent.seo.title,
    description: fitcoachContent.seo.description,
    creator: '@fitcoachpro',
  },
  verification: {
    google: 'verification-code-here',
  },
}

// Schema.org Structured Data pour FitCoach Pro
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HealthAndFitnessService", "GymAndFitnessClub"],
      "@id": "https://fitcoach-pro.vercel.app/#business",
      "name": fitcoachContent.business.name,
      "alternateName": "FitCoach Pro Paris 16",
      "description": fitcoachContent.seo.description,
      "url": "https://fitcoach-pro.vercel.app",
      "telephone": "+33145678910",
      "email": "contact@fitcoach-pro.fr",
      "priceRange": "€€€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "45 Avenue de la Grande Armée",
        "addressLocality": "Paris",
        "postalCode": "75116",
        "addressCountry": "FR",
        "addressRegion": "Île-de-France"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.8738,
        "longitude": 2.2834
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "06:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Paris 16ème"
        },
        {
          "@type": "Neighborhood",
          "name": "Passy"
        },
        {
          "@type": "Neighborhood",
          "name": "Trocadéro"
        },
        {
          "@type": "Neighborhood",
          "name": "Auteuil"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services FitCoach Pro",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Coaching Personnel 1-1",
              "description": "Séances individuelles adaptées à vos objectifs"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Plans Nutrition Pro",
              "description": "Rééquilibrage alimentaire pour professionnels actifs"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Coaching Femmes 35+",
              "description": "Programme spécialisé pour les femmes actives"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "87",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Marie Dubois"
          },
          "reviewBody": "Sarah a complètement transformé ma relation au sport. En 6 mois, j'ai perdu 12kg et retrouvé une énergie incroyable."
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://fitcoach-pro.vercel.app/#person",
      "name": "Sarah Martin",
      "jobTitle": "Coach Sportif & Nutritionniste Certifiée",
      "description": "Coach fitness & nutrition spécialisée pour professionnels actifs. 8 ans d'expérience, certifications STAPS.",
      "url": "https://fitcoach-pro.vercel.app",
      "email": "contact@fitcoach-pro.fr",
      "telephone": "+33145678910",
      "worksFor": {
        "@id": "https://fitcoach-pro.vercel.app/#business"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "BPJEPS AGFF",
          "credentialCategory": "Certification Professionnelle"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Nutrition Sportive",
          "credentialCategory": "Spécialisation"
        }
      ],
      "knowsAbout": [
        "Coaching Fitness",
        "Nutrition Sportive",
        "Transformation Physique",
        "Coaching Femmes",
        "Préparation Physique"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}