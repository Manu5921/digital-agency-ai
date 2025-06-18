import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette Sophrologie & Psychothérapie - Apaisante et Thérapeutique
        primary: {
          50: '#f0fdf9',   // Vert très clair, apaisant
          100: '#ccfbef',  // Vert menthe doux
          200: '#99f6e4',  // Aqua clair
          300: '#5eead4',  // Turquoise doux
          400: '#2dd4bf',  // Teal moderne
          500: '#14b8a6',  // Teal principal - couleur thérapeutique
          600: '#0d9488',  // Teal plus foncé
          700: '#0f766e',  // Vert-bleu professionnel
          800: '#115e59',  // Vert-bleu sombre
          900: '#134e4a',  // Vert très sombre
          950: '#042f2e',  // Vert-noir
        },
        secondary: {
          50: '#fefefe',   // Blanc quasi pur
          100: '#f8fafc',  // Bleu-gris très clair
          200: '#e2e8f0',  // Gris doux
          300: '#cbd5e1',  // Gris moyen clair
          400: '#94a3b8',  // Gris moyen
          500: '#64748b',  // Gris équilibré
          600: '#475569',  // Gris foncé
          700: '#334155',  // Bleu-gris sombre
          800: '#1e293b',  // Bleu très sombre
          900: '#0f172a',  // Bleu-noir
          950: '#020617',  // Noir-bleu
        },
        accent: {
          50: '#fefaf7',   // Beige très clair
          100: '#fef3e2',  // Beige clair
          200: '#fde4c4',  // Beige doux
          300: '#fbd0a1',  // Sable clair
          400: '#f7b372',  // Sable moyen
          500: '#f3956b',  // Terracotta doux
          600: '#e4753c',  // Terracotta
          700: '#c65d2b',  // Brun terreux
          800: '#9f4a26',  // Brun sombre
          900: '#813e24',  // Brun très sombre
          950: '#451f11',  // Brun-noir
        },
        // Couleurs spécifiques sophrologie
        therapy: {
          calm: '#14b8a6',     // Teal apaisant principal
          warm: '#f3956b',     // Terracotta chaleureux
          sage: '#84cc16',     // Vert sauge
          sand: '#fde4c4',     // Beige sable
          stone: '#64748b',    // Gris pierre
          success: '#10b981',  // Vert succès thérapeutique
          peace: '#06b6d4',    // Cyan paisible
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'], // Plus élégant pour thérapie
        body: ['Source Sans Pro', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config