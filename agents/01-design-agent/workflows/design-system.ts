/**
 * Design System - Phase 2 Design Agent
 * Système de design tokens centralisé et générateur de palettes automatique
 */

export interface DesignToken {
  name: string;
  value: string;
  type: 'color' | 'typography' | 'spacing' | 'shadow' | 'border';
  category: string;
  description?: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string[];
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  shades: {
    [key: string]: string[];
  };
}

export interface TypographyScale {
  fontFamilies: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSizes: {
    [key: string]: {
      size: string;
      lineHeight: string;
      letterSpacing?: string;
    };
  };
  fontWeights: {
    [key: string]: number;
  };
}

export interface SpacingScale {
  [key: string]: string;
}

export interface ShadowScale {
  [key: string]: string;
}

export interface DesignSystemConfig {
  name: string;
  version: string;
  sector: 'restaurant' | 'sante' | 'finance' | 'elearning' | 'immobilier' | 'tech';
  style: 'classique' | 'moderne' | 'minimaliste';
  baseColor: string;
  brandPersonality: 'professional' | 'creative' | 'minimal' | 'luxury' | 'friendly';
}

export class DesignSystem {
  private config: DesignSystemConfig;
  private tokens: DesignToken[] = [];

  constructor(config: DesignSystemConfig) {
    this.config = config;
  }

  /**
   * Génère une palette de couleurs complète basée sur une couleur de base
   */
  generateColorPalette(baseColor: string): ColorPalette {
    const hsl = this.hexToHsl(baseColor);
    
    // Génération de couleurs complémentaires intelligentes
    const complementaryHue = (hsl.h + 180) % 360;
    const triadicHue1 = (hsl.h + 120) % 360;
    const triadicHue2 = (hsl.h + 240) % 360;
    
    // Ajustement selon le secteur et la personnalité
    const sectorAdjustments = this.getSectorColorAdjustments();
    const personalityAdjustments = this.getPersonalityColorAdjustments();
    
    const primary = baseColor;
    const secondary = this.hslToHex({
      h: complementaryHue,
      s: Math.max(40, hsl.s - 20),
      l: Math.min(60, hsl.l + 10)
    });
    const accent = this.hslToHex({
      h: triadicHue1,
      s: Math.max(50, hsl.s - 10),
      l: Math.min(70, hsl.l + 20)
    });

    // Génération des nuances de gris harmonieuses
    const neutral = this.generateNeutralScale(hsl);
    
    // Couleurs sémantiques adaptées au secteur
    const semantic = this.generateSemanticColors();
    
    // Génération des shades pour chaque couleur principale
    const shades = {
      primary: this.generateColorShades(primary),
      secondary: this.generateColorShades(secondary),
      accent: this.generateColorShades(accent)
    };

    return {
      primary,
      secondary,
      accent,
      neutral,
      semantic,
      shades
    };
  }

  /**
   * Génère une échelle typographique harmonieuse
   */
  generateTypographyScale(): TypographyScale {
    const sectorFonts = this.getSectorFonts();
    const styleFonts = this.getStyleFonts();
    
    // Combinaison intelligente des polices selon le secteur et le style
    const fontFamilies = {
      heading: styleFonts.heading || sectorFonts.heading,
      body: styleFonts.body || sectorFonts.body,
      mono: 'JetBrains Mono, Consolas, Monaco, monospace'
    };

    // Échelle modulaire basée sur le ratio doré (1.618) ou un ratio plus conservateur selon le style
    const ratio = this.config.style === 'minimaliste' ? 1.25 : this.config.style === 'moderne' ? 1.5 : 1.414;
    const baseFontSize = 16;

    const fontSizes = {
      xs: {
        size: `${Math.round(baseFontSize / (ratio * ratio))}px`,
        lineHeight: '1.4'
      },
      sm: {
        size: `${Math.round(baseFontSize / ratio)}px`,
        lineHeight: '1.5'
      },
      base: {
        size: `${baseFontSize}px`,
        lineHeight: '1.6'
      },
      lg: {
        size: `${Math.round(baseFontSize * ratio)}px`,
        lineHeight: '1.5'
      },
      xl: {
        size: `${Math.round(baseFontSize * ratio * ratio)}px`,
        lineHeight: '1.4'
      },
      '2xl': {
        size: `${Math.round(baseFontSize * Math.pow(ratio, 3))}px`,
        lineHeight: '1.3'
      },
      '3xl': {
        size: `${Math.round(baseFontSize * Math.pow(ratio, 4))}px`,
        lineHeight: '1.2'
      },
      '4xl': {
        size: `${Math.round(baseFontSize * Math.pow(ratio, 5))}px`,
        lineHeight: '1.1'
      }
    };

    const fontWeights = {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    };

    return {
      fontFamilies,
      fontSizes,
      fontWeights
    };
  }

  /**
   * Génère une échelle d'espacement cohérente
   */
  generateSpacingScale(): SpacingScale {
    const baseUnit = 4; // 4px base unit
    const scale = this.config.style === 'minimaliste' ? 1.5 : 2;
    
    return {
      px: '1px',
      0: '0',
      1: `${baseUnit}px`,
      2: `${baseUnit * 2}px`,
      3: `${baseUnit * 3}px`,
      4: `${baseUnit * 4}px`,
      5: `${baseUnit * 5}px`,
      6: `${baseUnit * 6}px`,
      8: `${baseUnit * 8}px`,
      10: `${baseUnit * 10}px`,
      12: `${baseUnit * 12}px`,
      16: `${baseUnit * 16}px`,
      20: `${baseUnit * 20}px`,
      24: `${baseUnit * 24}px`,
      32: `${baseUnit * 32}px`,
      40: `${baseUnit * 40}px`,
      48: `${baseUnit * 48}px`,
      56: `${baseUnit * 56}px`,
      64: `${baseUnit * 64}px`,
      80: `${baseUnit * 80}px`,
      96: `${baseUnit * 96}px`,
      112: `${baseUnit * 112}px`,
      128: `${baseUnit * 128}px`
    };
  }

  /**
   * Génère une échelle d'ombres cohérente
   */
  generateShadowScale(): ShadowScale {
    const intensity = this.config.style === 'minimaliste' ? 0.05 : 
                     this.config.style === 'moderne' ? 0.1 : 0.15;

    return {
      none: 'none',
      sm: `0 1px 2px 0 rgba(0, 0, 0, ${intensity})`,
      base: `0 1px 3px 0 rgba(0, 0, 0, ${intensity}), 0 1px 2px 0 rgba(0, 0, 0, ${intensity * 0.6})`,
      md: `0 4px 6px -1px rgba(0, 0, 0, ${intensity}), 0 2px 4px -1px rgba(0, 0, 0, ${intensity * 0.6})`,
      lg: `0 10px 15px -3px rgba(0, 0, 0, ${intensity}), 0 4px 6px -2px rgba(0, 0, 0, ${intensity * 0.5})`,
      xl: `0 20px 25px -5px rgba(0, 0, 0, ${intensity}), 0 10px 10px -5px rgba(0, 0, 0, ${intensity * 0.4})`,
      '2xl': `0 25px 50px -12px rgba(0, 0, 0, ${intensity * 1.2})`,
      inner: `inset 0 2px 4px 0 rgba(0, 0, 0, ${intensity * 0.6})`
    };
  }

  /**
   * Génère le système de design complet
   */
  generateCompleteDesignSystem(): {
    config: DesignSystemConfig;
    colors: ColorPalette;
    typography: TypographyScale;
    spacing: SpacingScale;
    shadows: ShadowScale;
    tokens: DesignToken[];
    css: string;
    tailwindConfig: object;
  } {
    const colors = this.generateColorPalette(this.config.baseColor);
    const typography = this.generateTypographyScale();
    const spacing = this.generateSpacingScale();
    const shadows = this.generateShadowScale();

    // Génération des tokens
    this.generateTokensFromScales(colors, typography, spacing, shadows);

    // Génération du CSS
    const css = this.generateCSS(colors, typography, spacing, shadows);

    // Configuration Tailwind
    const tailwindConfig = this.generateTailwindConfig(colors, typography, spacing, shadows);

    return {
      config: this.config,
      colors,
      typography,
      spacing,
      shadows,
      tokens: this.tokens,
      css,
      tailwindConfig
    };
  }

  /**
   * Génère le CSS custom properties
   */
  private generateCSS(
    colors: ColorPalette, 
    typography: TypographyScale, 
    spacing: SpacingScale, 
    shadows: ShadowScale
  ): string {
    const cssVars: string[] = [':root {'];

    // Couleurs
    cssVars.push('  /* Colors */');
    cssVars.push(`  --color-primary: ${colors.primary};`);
    cssVars.push(`  --color-secondary: ${colors.secondary};`);
    cssVars.push(`  --color-accent: ${colors.accent};`);
    
    colors.neutral.forEach((color, index) => {
      cssVars.push(`  --color-neutral-${(index + 1) * 100}: ${color};`);
    });

    Object.entries(colors.semantic).forEach(([name, color]) => {
      cssVars.push(`  --color-${name}: ${color};`);
    });

    Object.entries(colors.shades).forEach(([colorName, shades]) => {
      shades.forEach((shade, index) => {
        const weight = (index + 1) * 100;
        cssVars.push(`  --color-${colorName}-${weight}: ${shade};`);
      });
    });

    // Typographie
    cssVars.push('  /* Typography */');
    Object.entries(typography.fontFamilies).forEach(([name, family]) => {
      cssVars.push(`  --font-${name}: ${family};`);
    });

    Object.entries(typography.fontSizes).forEach(([name, size]) => {
      cssVars.push(`  --font-size-${name}: ${size.size};`);
      cssVars.push(`  --line-height-${name}: ${size.lineHeight};`);
      if (size.letterSpacing) {
        cssVars.push(`  --letter-spacing-${name}: ${size.letterSpacing};`);
      }
    });

    Object.entries(typography.fontWeights).forEach(([name, weight]) => {
      cssVars.push(`  --font-weight-${name}: ${weight};`);
    });

    // Espacement
    cssVars.push('  /* Spacing */');
    Object.entries(spacing).forEach(([name, value]) => {
      cssVars.push(`  --spacing-${name}: ${value};`);
    });

    // Ombres
    cssVars.push('  /* Shadows */');
    Object.entries(shadows).forEach(([name, value]) => {
      cssVars.push(`  --shadow-${name}: ${value};`);
    });

    cssVars.push('}');

    // Classes utilitaires
    cssVars.push('\n/* Design System Utilities */');
    cssVars.push('.font-heading { font-family: var(--font-heading); }');
    cssVars.push('.font-body { font-family: var(--font-body); }');
    cssVars.push('.font-mono { font-family: var(--font-mono); }');

    return cssVars.join('\n');
  }

  /**
   * Génère la configuration Tailwind CSS
   */
  private generateTailwindConfig(
    colors: ColorPalette, 
    typography: TypographyScale, 
    spacing: SpacingScale, 
    shadows: ShadowScale
  ): object {
    const tailwindColors: any = {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      success: colors.semantic.success,
      warning: colors.semantic.warning,
      error: colors.semantic.error,
      info: colors.semantic.info
    };

    // Ajout des shades
    Object.entries(colors.shades).forEach(([colorName, shades]) => {
      tailwindColors[colorName] = {};
      shades.forEach((shade, index) => {
        const weight = (index + 1) * 100;
        tailwindColors[colorName][weight] = shade;
      });
    });

    // Ajout des neutres
    tailwindColors.neutral = {};
    colors.neutral.forEach((color, index) => {
      tailwindColors.neutral[(index + 1) * 100] = color;
    });

    return {
      theme: {
        extend: {
          colors: tailwindColors,
          fontFamily: {
            heading: typography.fontFamilies.heading.split(','),
            body: typography.fontFamilies.body.split(','),
            mono: typography.fontFamilies.mono.split(',')
          },
          fontSize: Object.fromEntries(
            Object.entries(typography.fontSizes).map(([name, size]) => [
              name,
              [size.size, { lineHeight: size.lineHeight }]
            ])
          ),
          fontWeight: typography.fontWeights,
          spacing: spacing,
          boxShadow: shadows
        }
      }
    };
  }

  /**
   * Génère les tokens depuis les échelles
   */
  private generateTokensFromScales(
    colors: ColorPalette, 
    typography: TypographyScale, 
    spacing: SpacingScale, 
    shadows: ShadowScale
  ): void {
    this.tokens = [];

    // Tokens de couleurs
    this.addToken('color-primary', colors.primary, 'color', 'primary', 'Couleur principale de la marque');
    this.addToken('color-secondary', colors.secondary, 'color', 'primary', 'Couleur secondaire de la marque');
    this.addToken('color-accent', colors.accent, 'color', 'primary', 'Couleur d\'accent');

    Object.entries(colors.semantic).forEach(([name, color]) => {
      this.addToken(`color-${name}`, color, 'color', 'semantic', `Couleur ${name}`);
    });

    // Tokens typographiques
    Object.entries(typography.fontFamilies).forEach(([name, family]) => {
      this.addToken(`font-${name}`, family, 'typography', 'family', `Police ${name}`);
    });

    Object.entries(typography.fontSizes).forEach(([name, size]) => {
      this.addToken(`font-size-${name}`, size.size, 'typography', 'size', `Taille ${name}`);
    });

    // Tokens d'espacement
    Object.entries(spacing).forEach(([name, value]) => {
      this.addToken(`spacing-${name}`, value, 'spacing', 'scale', `Espacement ${name}`);
    });

    // Tokens d'ombres
    Object.entries(shadows).forEach(([name, value]) => {
      this.addToken(`shadow-${name}`, value, 'shadow', 'scale', `Ombre ${name}`);
    });
  }

  /**
   * Ajoute un token au système
   */
  private addToken(name: string, value: string, type: DesignToken['type'], category: string, description?: string): void {
    this.tokens.push({
      name,
      value,
      type,
      category,
      description
    });
  }

  /**
   * Utilitaires de conversion de couleurs
   */
  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  private hslToHex(hsl: { h: number; s: number; l: number }): string {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  /**
   * Génère une échelle de nuances pour une couleur
   */
  private generateColorShades(color: string): string[] {
    const hsl = this.hexToHsl(color);
    const shades: string[] = [];

    // Génère 9 nuances (50, 100, 200, ..., 900)
    for (let i = 0; i < 9; i++) {
      const lightness = 95 - (i * 10); // De 95% à 5%
      const saturation = Math.max(10, hsl.s - (i * 5)); // Diminue légèrement la saturation

      shades.push(this.hslToHex({
        h: hsl.h,
        s: saturation,
        l: lightness
      }));
    }

    return shades;
  }

  /**
   * Génère une échelle de neutres harmonieuse
   */
  private generateNeutralScale(baseHsl: { h: number; s: number; l: number }): string[] {
    const neutrals: string[] = [];
    
    // Utilise une faible saturation de la couleur de base pour des neutres harmonieux
    const neutralSaturation = Math.min(15, baseHsl.s * 0.3);

    for (let i = 0; i < 9; i++) {
      const lightness = 95 - (i * 10);
      neutrals.push(this.hslToHex({
        h: baseHsl.h,
        s: neutralSaturation,
        l: lightness
      }));
    }

    return neutrals;
  }

  /**
   * Génère les couleurs sémantiques adaptées au secteur
   */
  private generateSemanticColors(): ColorPalette['semantic'] {
    const sectorSemantics: Record<string, ColorPalette['semantic']> = {
      restaurant: {
        success: '#10b981', // Vert frais
        warning: '#f59e0b', // Orange chaud
        error: '#ef4444',   // Rouge discret
        info: '#3b82f6'     // Bleu informatif
      },
      sante: {
        success: '#22c55e', // Vert santé
        warning: '#eab308', // Jaune attention
        error: '#dc2626',   // Rouge urgence
        info: '#0ea5e9'     // Bleu médical
      },
      finance: {
        success: '#16a34a', // Vert profit
        warning: '#ca8a04', // Or attention
        error: '#dc2626',   // Rouge perte
        info: '#2563eb'     // Bleu financier
      },
      elearning: {
        success: '#059669', // Vert apprentissage
        warning: '#d97706', // Orange motivation
        error: '#dc2626',   // Rouge erreur
        info: '#7c3aed'     // Violet créatif
      },
      immobilier: {
        success: '#16a34a', // Vert validation
        warning: '#ca8a04', // Or premium
        error: '#dc2626',   // Rouge alerte
        info: '#1d4ed8'     // Bleu confiance
      },
      tech: {
        success: '#10b981', // Vert tech
        warning: '#f59e0b', // Orange innovation
        error: '#ef4444',   // Rouge système
        info: '#06b6d4'     // Cyan digital
      }
    };

    return sectorSemantics[this.config.sector] || sectorSemantics.tech;
  }

  /**
   * Récupère les ajustements de couleur par secteur
   */
  private getSectorColorAdjustments(): { hueShift: number; saturationMultiplier: number; lightnessShift: number } {
    const adjustments: Record<string, any> = {
      restaurant: { hueShift: 10, saturationMultiplier: 1.1, lightnessShift: 5 },
      sante: { hueShift: -5, saturationMultiplier: 0.9, lightnessShift: 10 },
      finance: { hueShift: -10, saturationMultiplier: 0.8, lightnessShift: -5 },
      elearning: { hueShift: 15, saturationMultiplier: 1.2, lightnessShift: 8 },
      immobilier: { hueShift: 5, saturationMultiplier: 0.95, lightnessShift: 3 },
      tech: { hueShift: 20, saturationMultiplier: 1.1, lightnessShift: 0 }
    };

    return adjustments[this.config.sector] || adjustments.tech;
  }

  /**
   * Récupère les ajustements de couleur par personnalité
   */
  private getPersonalityColorAdjustments(): { saturationBoost: number; contrastLevel: number } {
    const adjustments: Record<string, any> = {
      professional: { saturationBoost: 0, contrastLevel: 1.2 },
      creative: { saturationBoost: 20, contrastLevel: 1.1 },
      minimal: { saturationBoost: -15, contrastLevel: 1.3 },
      luxury: { saturationBoost: -10, contrastLevel: 1.4 },
      friendly: { saturationBoost: 10, contrastLevel: 1.0 }
    };

    return adjustments[this.config.brandPersonality] || adjustments.professional;
  }

  /**
   * Récupère les polices par secteur
   */
  private getSectorFonts(): { heading: string; body: string } {
    const fonts: Record<string, any> = {
      restaurant: {
        heading: 'Playfair Display, serif',
        body: 'Inter, sans-serif'
      },
      sante: {
        heading: 'Merriweather, serif',
        body: 'Inter, sans-serif'
      },
      finance: {
        heading: 'Playfair Display, serif',
        body: 'Inter, sans-serif'
      },
      elearning: {
        heading: 'Space Grotesk, sans-serif',
        body: 'Inter, sans-serif'
      },
      immobilier: {
        heading: 'Playfair Display, serif',
        body: 'Inter, sans-serif'
      },
      tech: {
        heading: 'Space Grotesk, sans-serif',
        body: 'Inter, sans-serif'
      }
    };

    return fonts[this.config.sector] || fonts.tech;
  }

  /**
   * Récupère les polices par style
   */
  private getStyleFonts(): { heading?: string; body?: string } {
    const fonts: Record<string, any> = {
      classique: {
        heading: 'Playfair Display, serif',
        body: 'Crimson Text, serif'
      },
      moderne: {
        heading: 'Space Grotesk, sans-serif',
        body: 'Inter, sans-serif'
      },
      minimaliste: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      }
    };

    return fonts[this.config.style] || {};
  }

  /**
   * Exporte le système de design en différents formats
   */
  exportDesignSystem(format: 'json' | 'css' | 'scss' | 'js' | 'figma-tokens'): string {
    const designSystem = this.generateCompleteDesignSystem();

    switch (format) {
      case 'json':
        return JSON.stringify(designSystem, null, 2);
      
      case 'css':
        return designSystem.css;
      
      case 'scss':
        return this.convertToSCSS(designSystem);
      
      case 'js':
        return this.convertToJS(designSystem);
      
      case 'figma-tokens':
        return this.convertToFigmaTokens(designSystem);
      
      default:
        return JSON.stringify(designSystem, null, 2);
    }
  }

  /**
   * Convertit en format SCSS
   */
  private convertToSCSS(designSystem: any): string {
    const scss: string[] = ['// Design System SCSS Variables\n'];

    // Couleurs
    scss.push('// Colors');
    scss.push(`$primary: ${designSystem.colors.primary};`);
    scss.push(`$secondary: ${designSystem.colors.secondary};`);
    scss.push(`$accent: ${designSystem.colors.accent};`);

    Object.entries(designSystem.colors.semantic).forEach(([name, color]) => {
      scss.push(`$${name}: ${color};`);
    });

    return scss.join('\n');
  }

  /**
   * Convertit en format JS/TS
   */
  private convertToJS(designSystem: any): string {
    return `
// Design System Tokens
export const designTokens = ${JSON.stringify(designSystem, null, 2)};

export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const shadows = designTokens.shadows;
`;
  }

  /**
   * Convertit en format Figma Tokens
   */
  private convertToFigmaTokens(designSystem: any): string {
    const figmaTokens = {
      global: {
        colors: {
          primary: { value: designSystem.colors.primary, type: 'color' },
          secondary: { value: designSystem.colors.secondary, type: 'color' },
          accent: { value: designSystem.colors.accent, type: 'color' }
        },
        typography: {
          heading: { value: designSystem.typography.fontFamilies.heading, type: 'fontFamily' },
          body: { value: designSystem.typography.fontFamilies.body, type: 'fontFamily' }
        }
      }
    };

    return JSON.stringify(figmaTokens, null, 2);
  }
}

/**
 * Factory pour créer des systèmes de design sectoriels
 */
export class DesignSystemFactory {
  static createSectorDesignSystem(
    sector: DesignSystemConfig['sector'],
    companyName: string,
    baseColor: string,
    style: DesignSystemConfig['style'] = 'moderne'
  ): DesignSystem {
    const config: DesignSystemConfig = {
      name: `${companyName} Design System`,
      version: '1.0.0',
      sector,
      style,
      baseColor,
      brandPersonality: this.inferPersonalityFromSector(sector)
    };

    return new DesignSystem(config);
  }

  private static inferPersonalityFromSector(sector: DesignSystemConfig['sector']): DesignSystemConfig['brandPersonality'] {
    const mapping: Record<string, DesignSystemConfig['brandPersonality']> = {
      restaurant: 'luxury',
      sante: 'professional',
      finance: 'professional',
      elearning: 'friendly',
      immobilier: 'professional',
      tech: 'creative'
    };

    return mapping[sector] || 'professional';
  }
}

export default DesignSystem;