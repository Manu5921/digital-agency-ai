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
        // Palette Fitness Coaching - Moderne et Dynamique
        primary: {
          50: '#fef7f0',
          100: '#feeee0',
          200: '#fdd9b8',
          300: '#fbb988',
          400: '#f8954d',
          500: '#ff6b35', // Orange énergisant principal
          600: '#e55529',
          700: '#c23f1f',
          800: '#9d331d',
          900: '#7e2c1c',
          950: '#44140b',
        },
        secondary: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4a4a4a',
          950: '#1a1a1a', // Noir profond
        },
        accent: {
          50: '#ffffff', // Blanc pur
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#f0f0f0',
          400: '#ebebeb',
          500: '#e5e5e5',
          600: '#d4d4d4',
          700: '#a3a3a3',
          800: '#737373',
          900: '#525252',
          950: '#404040',
        },
        // Couleurs spécifiques fitness
        fitness: {
          energy: '#ff6b35', // Orange énergisant
          dark: '#1a1a1a',   // Noir moderne
          light: '#ffffff',  // Blanc pur
          success: '#22c55e', // Vert succès
          warning: '#f59e0b', // Orange attention
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
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