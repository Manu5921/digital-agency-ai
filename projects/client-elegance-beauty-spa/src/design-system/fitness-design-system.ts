// FitCoach Pro - Design System Fitness
// Couleurs, Typography & Composants pour le secteur fitness

export const fitnessDesignSystem = {
  // 🎨 Palette Couleurs Fitness Énergique
  colors: {
    // Couleurs principales fitness
    primary: {
      50: '#fef7f0',    // Orange ultra light
      100: '#fdede0',   // Orange light
      200: '#fad8bf',   // Orange soft
      300: '#f7bc94',   // Orange medium
      400: '#f4966b',   // Orange
      500: '#ff6b35',   // Orange fitness (primary)
      600: '#e55529',   // Orange dark
      700: '#cc4a24',   // Orange darker
      800: '#b3411f',   // Orange deep
      900: '#7e2c1c',   // Orange very dark
    },
    
    // Noir puissant pour contraste
    secondary: {
      50: '#f9f9f9',    // Gris ultra light
      100: '#f0f0f0',   // Gris light
      200: '#e0e0e0',   // Gris soft
      300: '#c0c0c0',   // Gris medium
      400: '#9a9a9a',   // Gris
      500: '#6b6b6b',   // Gris dark
      600: '#4a4a4a',   // Gris darker
      700: '#333333',   // Gris deep
      800: '#2a2a2a',   // Noir soft
      900: '#1a1a1a',   // Noir puissant (secondary)
      950: '#1a1a1a',   // Noir maximum
    },
    
    // Couleurs d'accent fitness
    accent: {
      white: '#ffffff',
      success: '#22c55e',    // Vert succès (résultats)
      warning: '#f59e0b',    // Jaune attention
      error: '#ef4444',      // Rouge erreur
      info: '#3b82f6',       // Bleu info
    },
    
    // Couleurs spécifiques fitness
    fitness: {
      energy: '#ff6b35',     // Orange énergique
      dark: '#1a1a1a',       // Noir puissant
      light: '#ffffff',      // Blanc pur
      success: '#22c55e',    // Vert transformation
      muscle: '#8b5cf6',     // Violet force
      cardio: '#f59e0b',     // Jaune endurance
    }
  },

  // 📝 Typography Énergique et Motivante
  typography: {
    // Fonts
    fonts: {
      heading: 'Montserrat, sans-serif',  // Bold, énergique pour titres
      body: 'Inter, sans-serif',          // Clean, lisible pour texte
      accent: 'Poppins, sans-serif',      // Moderne pour éléments spéciaux
    },
    
    // Tailles responsives
    sizes: {
      'xs': '0.75rem',    // 12px
      'sm': '0.875rem',   // 14px
      'base': '1rem',     // 16px
      'lg': '1.125rem',   // 18px
      'xl': '1.25rem',    // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    
    // Weights fitness
    weights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',        // Pour impact fitness
      extrabold: '800',   // Pour super titres
      black: '900',       // Pour maximum impact
    }
  },

  // 🧩 Composants Design System
  components: {
    // Boutons fitness
    buttons: {
      primary: {
        bg: 'bg-primary-500',
        hover: 'hover:bg-primary-600',
        text: 'text-white',
        shadow: 'shadow-lg hover:shadow-xl',
        transform: 'transform hover:scale-105',
        transition: 'transition-all duration-300',
        gradient: 'bg-gradient-to-r from-primary-500 to-primary-600',
      },
      secondary: {
        bg: 'bg-secondary-900',
        hover: 'hover:bg-secondary-800',
        text: 'text-white',
        border: 'border border-secondary-700',
      },
      outline: {
        bg: 'bg-transparent',
        hover: 'hover:bg-primary-500',
        text: 'text-primary-500 hover:text-white',
        border: 'border-2 border-primary-500',
      },
      ghost: {
        bg: 'bg-transparent',
        hover: 'hover:bg-primary-50',
        text: 'text-primary-600',
      }
    },
    
    // Cards fitness
    cards: {
      base: {
        bg: 'bg-white',
        shadow: 'shadow-lg shadow-gray-200/50',
        border: 'border border-gray-100',
        rounded: 'rounded-xl',
      },
      hover: {
        transition: 'transition-all duration-300',
        hover: 'hover:shadow-xl hover:-translate-y-1',
        scale: 'hover:scale-105',
      },
      gradient: {
        bg: 'bg-gradient-to-br from-primary-500 to-primary-600',
        text: 'text-white',
        shadow: 'shadow-2xl',
      }
    },
    
    // Badges fitness
    badges: {
      success: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: 'text-green-600',
      },
      warning: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
      },
      primary: {
        bg: 'bg-primary-100',
        text: 'text-primary-800',
        icon: 'text-primary-600',
      },
      dark: {
        bg: 'bg-secondary-900',
        text: 'text-white',
        icon: 'text-primary-400',
      }
    }
  },

  // 🎭 Effets et Animations Fitness
  effects: {
    // Gradients énergiques
    gradients: {
      primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
      secondary: 'bg-gradient-to-r from-secondary-900 to-secondary-800',
      energetic: 'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600',
      dark: 'bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-950',
      hero: 'bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-950',
      section: 'bg-gradient-to-br from-primary-50 to-white',
    },
    
    // Shadows fitness
    shadows: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg shadow-gray-200/50',
      xl: 'shadow-xl shadow-gray-300/50',
      '2xl': 'shadow-2xl shadow-gray-400/50',
      colored: 'shadow-lg shadow-primary-500/30',
      dark: 'shadow-lg shadow-secondary-900/30',
    },
    
    // Animations motivantes
    animations: {
      fadeIn: 'animate-fade-in',
      slideUp: 'animate-slide-up',
      pulse: 'animate-pulse',
      bounce: 'animate-bounce',
      scale: 'hover:scale-105 transition-transform duration-300',
      lift: 'hover:-translate-y-1 transition-transform duration-300',
    }
  },

  // 📏 Spacing et Layout
  spacing: {
    // Container sizes
    container: {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      custom: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    },
    
    // Section padding
    section: {
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-20',
      xl: 'py-24',
      custom: 'py-16 lg:py-24',
    },
    
    // Grid gaps
    grid: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    }
  },

  // 🎯 Fitness Specific Elements
  fitness: {
    // Icônes par catégorie
    icons: {
      strength: 'Dumbbell',
      cardio: 'Heart',
      nutrition: 'Apple',
      target: 'Target',
      trophy: 'Trophy',
      clock: 'Clock',
      users: 'Users',
      star: 'Star',
      phone: 'Phone',
      mail: 'Mail',
      mapPin: 'MapPin',
      calendar: 'Calendar',
      checkCircle: 'CheckCircle',
      arrowRight: 'ArrowRight',
      zap: 'Zap',
    },
    
    // Couleurs par service
    services: {
      coaching: '#ff6b35',      // Orange primary
      nutrition: '#22c55e',     // Vert
      group: '#8b5cf6',         // Violet
      online: '#3b82f6',        // Bleu
      women: '#ec4899',         // Rose
      recovery: '#06b6d4',      // Cyan
    },
    
    // Métriques visuelles
    metrics: {
      weight: { icon: 'TrendingDown', color: 'text-green-600' },
      muscle: { icon: 'TrendingUp', color: 'text-blue-600' },
      energy: { icon: 'Zap', color: 'text-yellow-600' },
      performance: { icon: 'Target', color: 'text-purple-600' },
    }
  }
};

// 🚀 Export des utilitaires CSS
export const fitnessUtilities = {
  // Classes utilitaires prêtes à l'emploi
  button: {
    primary: `${fitnessDesignSystem.components.buttons.primary.bg} ${fitnessDesignSystem.components.buttons.primary.hover} ${fitnessDesignSystem.components.buttons.primary.text} ${fitnessDesignSystem.components.buttons.primary.shadow} ${fitnessDesignSystem.components.buttons.primary.transform} ${fitnessDesignSystem.components.buttons.primary.transition} px-8 py-4 rounded-lg font-semibold`,
    secondary: `${fitnessDesignSystem.components.buttons.secondary.bg} ${fitnessDesignSystem.components.buttons.secondary.hover} ${fitnessDesignSystem.components.buttons.secondary.text} px-8 py-4 rounded-lg font-semibold transition-colors`,
    outline: `${fitnessDesignSystem.components.buttons.outline.bg} ${fitnessDesignSystem.components.buttons.outline.hover} ${fitnessDesignSystem.components.buttons.outline.text} ${fitnessDesignSystem.components.buttons.outline.border} px-8 py-4 rounded-lg font-semibold transition-all duration-300`,
  },
  
  card: {
    base: `${fitnessDesignSystem.components.cards.base.bg} ${fitnessDesignSystem.components.cards.base.shadow} ${fitnessDesignSystem.components.cards.base.border} ${fitnessDesignSystem.components.cards.base.rounded} p-6`,
    hover: `${fitnessDesignSystem.components.cards.base.bg} ${fitnessDesignSystem.components.cards.base.shadow} ${fitnessDesignSystem.components.cards.base.border} ${fitnessDesignSystem.components.cards.base.rounded} ${fitnessDesignSystem.components.cards.hover.transition} ${fitnessDesignSystem.components.cards.hover.hover} p-6`,
    gradient: `${fitnessDesignSystem.components.cards.gradient.bg} ${fitnessDesignSystem.components.cards.gradient.text} ${fitnessDesignSystem.components.cards.gradient.shadow} rounded-xl p-6`,
  },
  
  section: {
    default: `${fitnessDesignSystem.spacing.section.custom}`,
    container: `${fitnessDesignSystem.spacing.container.custom}`,
    gradient: `${fitnessDesignSystem.effects.gradients.section} ${fitnessDesignSystem.spacing.section.custom}`,
  }
};

export default fitnessDesignSystem;