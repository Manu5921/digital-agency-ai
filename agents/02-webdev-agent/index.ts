/**
 * WebDev Agent - Restaurant Next.js Application
 * Spécialisé dans la conversion de prototypes HTML/CSS en applications Next.js
 */

import { DesignAgent } from '../01-design-agent';

export interface NextJSConfig {
  projectName: string;
  framework: 'nextjs';
  version: string;
  features: string[];
  styling: 'tailwind' | 'styled-components' | 'css-modules';
  typescript: boolean;
  database?: 'prisma' | 'supabase' | 'planetscale';
}

export class WebDevAgent {
  private config: NextJSConfig;
  private designAgent: typeof DesignAgent;

  constructor(config: NextJSConfig, designAgent: typeof DesignAgent) {
    this.config = config;
    this.designAgent = designAgent;
  }

  /**
   * Convertit le prototype HTML/CSS en structure Next.js
   */
  convertToNextJS(): {
    components: string[];
    pages: string[];
    layout: string;
    styles: string;
  } {
    return {
      components: [
        'Header/Navigation',
        'Hero/HeroSection', 
        'Menu/MenuSection',
        'Chef/ChefSection',
        'Gallery/GallerySection',
        'Contact/ContactSection',
        'Footer/Footer'
      ],
      pages: [
        'page.tsx (Home)',
        'layout.tsx (Root Layout)',
        'loading.tsx',
        'error.tsx',
        'not-found.tsx'
      ],
      layout: 'App Router with TypeScript',
      styles: 'Tailwind CSS + Custom Components'
    };
  }

  /**
   * Génère la configuration Tailwind optimisée
   */
  generateTailwindConfig(): string {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#d4af37',
        accent: '#8b4513',
        background: '#fafafa',
        muted: '#6b7280',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}`;
  }

  /**
   * Génère le layout principal
   */
  generateRootLayout(): string {
    return `import type { Metadata } from 'next'
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
  title: 'Le Gourmet - Restaurant Gastronomique',
  description: 'Restaurant gastronomique premium au cSur de Paris. Cuisine raffinée par le Chef étoilé Antoine Dubois. Réservation en ligne.',
  keywords: 'restaurant gastronomique, chef étoilé, cuisine française, Paris, réservation',
  authors: [{ name: 'Digital Agency AI' }],
  openGraph: {
    title: 'Le Gourmet - Restaurant Gastronomique',
    description: 'Restaurant gastronomique premium au cSur de Paris. Cuisine raffinée par le Chef étoilé Antoine Dubois.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Le Gourmet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Gourmet - Restaurant Gastronomique',
    description: 'Restaurant gastronomique premium au cSur de Paris.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={\`scroll-smooth \${inter.variable} \${playfair.variable} \${dancing.variable}\`}>
      <body className="font-body text-gray-800 bg-background antialiased">
        {children}
      </body>
    </html>
  )
}`;
  }

  /**
   * Génère la page principale
   */
  generateHomePage(): string {
    return `import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MenuSection from '@/components/MenuSection'
import ChefSection from '@/components/ChefSection'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MenuSection />
      <ChefSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  )
}`;
  }

  /**
   * Génère le composant Header
   */
  generateHeaderComponent(): string {
    return `'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={\`fixed top-0 w-full z-50 transition-all duration-300 \${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }\`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-heading font-bold text-primary">
              Le <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Gourmet</span>
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="text-gray-700 hover:text-secondary transition-colors"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="text-gray-700 hover:text-secondary transition-colors"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('chef')}
                className="text-gray-700 hover:text-secondary transition-colors"
              >
                Chef
              </button>
              <button 
                onClick={() => scrollToSection('galerie')}
                className="text-gray-700 hover:text-secondary transition-colors"
              >
                Galerie
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-secondary transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => scrollToSection('reservation')}
                className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-accent transition-all transform hover:scale-105"
              >
                Réserver
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-secondary transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('accueil')} className="text-left text-gray-700 hover:text-secondary">Accueil</button>
              <button onClick={() => scrollToSection('menu')} className="text-left text-gray-700 hover:text-secondary">Menu</button>
              <button onClick={() => scrollToSection('chef')} className="text-left text-gray-700 hover:text-secondary">Chef</button>
              <button onClick={() => scrollToSection('galerie')} className="text-left text-gray-700 hover:text-secondary">Galerie</button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-secondary">Contact</button>
              <button onClick={() => scrollToSection('reservation')} className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-accent transition-colors">
                Réserver
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}`;
  }

  /**
   * Génère le composant HeroSection
   */
  generateHeroComponent(): string {
    return `'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToMenu = () => {
    const element = document.getElementById('menu')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Restaurant Le Gourmet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-heading font-bold mb-6"
        >
          Une Expérience
          <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Gastronomique
          </span>
          Inoubliable
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 font-light"
        >
          Découvrez l'art culinaire français dans un cadre d'exception
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={scrollToReservation}
            className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent transition-all transform hover:scale-105 shadow-lg"
          >
            Réserver une Table
          </button>
          <button 
            onClick={scrollToMenu}
            className="border border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition-all shadow-lg"
          >
            Découvrir le Menu
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}`;
  }

  /**
   * Génère le style global CSS
   */
  generateGlobalCSS(): string {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: var(--font-inter), system-ui, sans-serif;
  }
  
  .font-heading {
    font-family: var(--font-playfair), serif;
  }
  
  .font-accent {
    font-family: var(--font-dancing), cursive;
  }
}

@layer components {
  .btn-primary {
    @apply bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-accent transition-all transform hover:scale-105 shadow-lg;
  }
  
  .btn-secondary {
    @apply border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all;
  }
  
  .card-hover {
    @apply transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl;
  }
  
  .text-gradient {
    @apply bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent;
  }
  
  .menu-item {
    @apply border-b border-dotted border-secondary/30 pb-4 last:border-b-0;
  }
}

@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.6s ease-out;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #d4af37;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8b4513;
}`;
  }

  /**
   * Crée le package.json avec les dépendances
   */
  generatePackageJSON(): string {
    return `{
  "name": "restaurant-le-gourmet",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.292.0",
    "@next/font": "^14.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.51.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.0"
  }
}`;
  }
}

export default WebDevAgent;