"use strict";
/**
 * Design System - Phase 2 Design Agent
 * Système de design tokens centralisé et générateur de palettes automatique
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignSystemFactory = exports.DesignSystem = void 0;
var DesignSystem = /** @class */ (function () {
    function DesignSystem(config) {
        this.tokens = [];
        this.config = config;
    }
    /**
     * Génère une palette de couleurs complète basée sur une couleur de base
     */
    DesignSystem.prototype.generateColorPalette = function (baseColor) {
        var hsl = this.hexToHsl(baseColor);
        // Génération de couleurs complémentaires intelligentes
        var complementaryHue = (hsl.h + 180) % 360;
        var triadicHue1 = (hsl.h + 120) % 360;
        var triadicHue2 = (hsl.h + 240) % 360;
        // Ajustement selon le secteur et la personnalité
        var sectorAdjustments = this.getSectorColorAdjustments();
        var personalityAdjustments = this.getPersonalityColorAdjustments();
        var primary = baseColor;
        var secondary = this.hslToHex({
            h: complementaryHue,
            s: Math.max(40, hsl.s - 20),
            l: Math.min(60, hsl.l + 10)
        });
        var accent = this.hslToHex({
            h: triadicHue1,
            s: Math.max(50, hsl.s - 10),
            l: Math.min(70, hsl.l + 20)
        });
        // Génération des nuances de gris harmonieuses
        var neutral = this.generateNeutralScale(hsl);
        // Couleurs sémantiques adaptées au secteur
        var semantic = this.generateSemanticColors();
        // Génération des shades pour chaque couleur principale
        var shades = {
            primary: this.generateColorShades(primary),
            secondary: this.generateColorShades(secondary),
            accent: this.generateColorShades(accent)
        };
        return {
            primary: primary,
            secondary: secondary,
            accent: accent,
            neutral: neutral,
            semantic: semantic,
            shades: shades
        };
    };
    /**
     * Génère une échelle typographique harmonieuse
     */
    DesignSystem.prototype.generateTypographyScale = function () {
        var sectorFonts = this.getSectorFonts();
        var styleFonts = this.getStyleFonts();
        // Combinaison intelligente des polices selon le secteur et le style
        var fontFamilies = {
            heading: styleFonts.heading || sectorFonts.heading,
            body: styleFonts.body || sectorFonts.body,
            mono: 'JetBrains Mono, Consolas, Monaco, monospace'
        };
        // Échelle modulaire basée sur le ratio doré (1.618) ou un ratio plus conservateur selon le style
        var ratio = this.config.style === 'minimaliste' ? 1.25 : this.config.style === 'moderne' ? 1.5 : 1.414;
        var baseFontSize = 16;
        var fontSizes = {
            xs: {
                size: "".concat(Math.round(baseFontSize / (ratio * ratio)), "px"),
                lineHeight: '1.4'
            },
            sm: {
                size: "".concat(Math.round(baseFontSize / ratio), "px"),
                lineHeight: '1.5'
            },
            base: {
                size: "".concat(baseFontSize, "px"),
                lineHeight: '1.6'
            },
            lg: {
                size: "".concat(Math.round(baseFontSize * ratio), "px"),
                lineHeight: '1.5'
            },
            xl: {
                size: "".concat(Math.round(baseFontSize * ratio * ratio), "px"),
                lineHeight: '1.4'
            },
            '2xl': {
                size: "".concat(Math.round(baseFontSize * Math.pow(ratio, 3)), "px"),
                lineHeight: '1.3'
            },
            '3xl': {
                size: "".concat(Math.round(baseFontSize * Math.pow(ratio, 4)), "px"),
                lineHeight: '1.2'
            },
            '4xl': {
                size: "".concat(Math.round(baseFontSize * Math.pow(ratio, 5)), "px"),
                lineHeight: '1.1'
            }
        };
        var fontWeights = {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800
        };
        return {
            fontFamilies: fontFamilies,
            fontSizes: fontSizes,
            fontWeights: fontWeights
        };
    };
    /**
     * Génère une échelle d'espacement cohérente
     */
    DesignSystem.prototype.generateSpacingScale = function () {
        var baseUnit = 4; // 4px base unit
        var scale = this.config.style === 'minimaliste' ? 1.5 : 2;
        return {
            px: '1px',
            0: '0',
            1: "".concat(baseUnit, "px"),
            2: "".concat(baseUnit * 2, "px"),
            3: "".concat(baseUnit * 3, "px"),
            4: "".concat(baseUnit * 4, "px"),
            5: "".concat(baseUnit * 5, "px"),
            6: "".concat(baseUnit * 6, "px"),
            8: "".concat(baseUnit * 8, "px"),
            10: "".concat(baseUnit * 10, "px"),
            12: "".concat(baseUnit * 12, "px"),
            16: "".concat(baseUnit * 16, "px"),
            20: "".concat(baseUnit * 20, "px"),
            24: "".concat(baseUnit * 24, "px"),
            32: "".concat(baseUnit * 32, "px"),
            40: "".concat(baseUnit * 40, "px"),
            48: "".concat(baseUnit * 48, "px"),
            56: "".concat(baseUnit * 56, "px"),
            64: "".concat(baseUnit * 64, "px"),
            80: "".concat(baseUnit * 80, "px"),
            96: "".concat(baseUnit * 96, "px"),
            112: "".concat(baseUnit * 112, "px"),
            128: "".concat(baseUnit * 128, "px")
        };
    };
    /**
     * Génère une échelle d'ombres cohérente
     */
    DesignSystem.prototype.generateShadowScale = function () {
        var intensity = this.config.style === 'minimaliste' ? 0.05 :
            this.config.style === 'moderne' ? 0.1 : 0.15;
        return {
            none: 'none',
            sm: "0 1px 2px 0 rgba(0, 0, 0, ".concat(intensity, ")"),
            base: "0 1px 3px 0 rgba(0, 0, 0, ".concat(intensity, "), 0 1px 2px 0 rgba(0, 0, 0, ").concat(intensity * 0.6, ")"),
            md: "0 4px 6px -1px rgba(0, 0, 0, ".concat(intensity, "), 0 2px 4px -1px rgba(0, 0, 0, ").concat(intensity * 0.6, ")"),
            lg: "0 10px 15px -3px rgba(0, 0, 0, ".concat(intensity, "), 0 4px 6px -2px rgba(0, 0, 0, ").concat(intensity * 0.5, ")"),
            xl: "0 20px 25px -5px rgba(0, 0, 0, ".concat(intensity, "), 0 10px 10px -5px rgba(0, 0, 0, ").concat(intensity * 0.4, ")"),
            '2xl': "0 25px 50px -12px rgba(0, 0, 0, ".concat(intensity * 1.2, ")"),
            inner: "inset 0 2px 4px 0 rgba(0, 0, 0, ".concat(intensity * 0.6, ")")
        };
    };
    /**
     * Génère le système de design complet
     */
    DesignSystem.prototype.generateCompleteDesignSystem = function () {
        var colors = this.generateColorPalette(this.config.baseColor);
        var typography = this.generateTypographyScale();
        var spacing = this.generateSpacingScale();
        var shadows = this.generateShadowScale();
        // Génération des tokens
        this.generateTokensFromScales(colors, typography, spacing, shadows);
        // Génération du CSS
        var css = this.generateCSS(colors, typography, spacing, shadows);
        // Configuration Tailwind
        var tailwindConfig = this.generateTailwindConfig(colors, typography, spacing, shadows);
        return {
            config: this.config,
            colors: colors,
            typography: typography,
            spacing: spacing,
            shadows: shadows,
            tokens: this.tokens,
            css: css,
            tailwindConfig: tailwindConfig
        };
    };
    /**
     * Génère le CSS custom properties
     */
    DesignSystem.prototype.generateCSS = function (colors, typography, spacing, shadows) {
        var cssVars = [':root {'];
        // Couleurs
        cssVars.push('  /* Colors */');
        cssVars.push("  --color-primary: ".concat(colors.primary, ";"));
        cssVars.push("  --color-secondary: ".concat(colors.secondary, ";"));
        cssVars.push("  --color-accent: ".concat(colors.accent, ";"));
        colors.neutral.forEach(function (color, index) {
            cssVars.push("  --color-neutral-".concat((index + 1) * 100, ": ").concat(color, ";"));
        });
        Object.entries(colors.semantic).forEach(function (_a) {
            var name = _a[0], color = _a[1];
            cssVars.push("  --color-".concat(name, ": ").concat(color, ";"));
        });
        Object.entries(colors.shades).forEach(function (_a) {
            var colorName = _a[0], shades = _a[1];
            shades.forEach(function (shade, index) {
                var weight = (index + 1) * 100;
                cssVars.push("  --color-".concat(colorName, "-").concat(weight, ": ").concat(shade, ";"));
            });
        });
        // Typographie
        cssVars.push('  /* Typography */');
        Object.entries(typography.fontFamilies).forEach(function (_a) {
            var name = _a[0], family = _a[1];
            cssVars.push("  --font-".concat(name, ": ").concat(family, ";"));
        });
        Object.entries(typography.fontSizes).forEach(function (_a) {
            var name = _a[0], size = _a[1];
            cssVars.push("  --font-size-".concat(name, ": ").concat(size.size, ";"));
            cssVars.push("  --line-height-".concat(name, ": ").concat(size.lineHeight, ";"));
            if (size.letterSpacing) {
                cssVars.push("  --letter-spacing-".concat(name, ": ").concat(size.letterSpacing, ";"));
            }
        });
        Object.entries(typography.fontWeights).forEach(function (_a) {
            var name = _a[0], weight = _a[1];
            cssVars.push("  --font-weight-".concat(name, ": ").concat(weight, ";"));
        });
        // Espacement
        cssVars.push('  /* Spacing */');
        Object.entries(spacing).forEach(function (_a) {
            var name = _a[0], value = _a[1];
            cssVars.push("  --spacing-".concat(name, ": ").concat(value, ";"));
        });
        // Ombres
        cssVars.push('  /* Shadows */');
        Object.entries(shadows).forEach(function (_a) {
            var name = _a[0], value = _a[1];
            cssVars.push("  --shadow-".concat(name, ": ").concat(value, ";"));
        });
        cssVars.push('}');
        // Classes utilitaires
        cssVars.push('\n/* Design System Utilities */');
        cssVars.push('.font-heading { font-family: var(--font-heading); }');
        cssVars.push('.font-body { font-family: var(--font-body); }');
        cssVars.push('.font-mono { font-family: var(--font-mono); }');
        return cssVars.join('\n');
    };
    /**
     * Génère la configuration Tailwind CSS
     */
    DesignSystem.prototype.generateTailwindConfig = function (colors, typography, spacing, shadows) {
        var tailwindColors = {
            primary: colors.primary,
            secondary: colors.secondary,
            accent: colors.accent,
            success: colors.semantic.success,
            warning: colors.semantic.warning,
            error: colors.semantic.error,
            info: colors.semantic.info
        };
        // Ajout des shades
        Object.entries(colors.shades).forEach(function (_a) {
            var colorName = _a[0], shades = _a[1];
            tailwindColors[colorName] = {};
            shades.forEach(function (shade, index) {
                var weight = (index + 1) * 100;
                tailwindColors[colorName][weight] = shade;
            });
        });
        // Ajout des neutres
        tailwindColors.neutral = {};
        colors.neutral.forEach(function (color, index) {
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
                    fontSize: Object.fromEntries(Object.entries(typography.fontSizes).map(function (_a) {
                        var name = _a[0], size = _a[1];
                        return [
                            name,
                            [size.size, { lineHeight: size.lineHeight }]
                        ];
                    })),
                    fontWeight: typography.fontWeights,
                    spacing: spacing,
                    boxShadow: shadows
                }
            }
        };
    };
    /**
     * Génère les tokens depuis les échelles
     */
    DesignSystem.prototype.generateTokensFromScales = function (colors, typography, spacing, shadows) {
        var _this = this;
        this.tokens = [];
        // Tokens de couleurs
        this.addToken('color-primary', colors.primary, 'color', 'primary', 'Couleur principale de la marque');
        this.addToken('color-secondary', colors.secondary, 'color', 'primary', 'Couleur secondaire de la marque');
        this.addToken('color-accent', colors.accent, 'color', 'primary', 'Couleur d\'accent');
        Object.entries(colors.semantic).forEach(function (_a) {
            var name = _a[0], color = _a[1];
            _this.addToken("color-".concat(name), color, 'color', 'semantic', "Couleur ".concat(name));
        });
        // Tokens typographiques
        Object.entries(typography.fontFamilies).forEach(function (_a) {
            var name = _a[0], family = _a[1];
            _this.addToken("font-".concat(name), family, 'typography', 'family', "Police ".concat(name));
        });
        Object.entries(typography.fontSizes).forEach(function (_a) {
            var name = _a[0], size = _a[1];
            _this.addToken("font-size-".concat(name), size.size, 'typography', 'size', "Taille ".concat(name));
        });
        // Tokens d'espacement
        Object.entries(spacing).forEach(function (_a) {
            var name = _a[0], value = _a[1];
            _this.addToken("spacing-".concat(name), value, 'spacing', 'scale', "Espacement ".concat(name));
        });
        // Tokens d'ombres
        Object.entries(shadows).forEach(function (_a) {
            var name = _a[0], value = _a[1];
            _this.addToken("shadow-".concat(name), value, 'shadow', 'scale', "Ombre ".concat(name));
        });
    };
    /**
     * Ajoute un token au système
     */
    DesignSystem.prototype.addToken = function (name, value, type, category, description) {
        this.tokens.push({
            name: name,
            value: value,
            type: type,
            category: category,
            description: description
        });
    };
    /**
     * Utilitaires de conversion de couleurs
     */
    DesignSystem.prototype.hexToHsl = function (hex) {
        var r = parseInt(hex.slice(1, 3), 16) / 255;
        var g = parseInt(hex.slice(3, 5), 16) / 255;
        var b = parseInt(hex.slice(5, 7), 16) / 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;
        if (max !== min) {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };
    DesignSystem.prototype.hslToHex = function (hsl) {
        var h = hsl.h / 360;
        var s = hsl.s / 100;
        var l = hsl.l / 100;
        var hue2rgb = function (p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var r, g, b;
        if (s === 0) {
            r = g = b = l;
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        var toHex = function (c) {
            var hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b));
    };
    /**
     * Génère une échelle de nuances pour une couleur
     */
    DesignSystem.prototype.generateColorShades = function (color) {
        var hsl = this.hexToHsl(color);
        var shades = [];
        // Génère 9 nuances (50, 100, 200, ..., 900)
        for (var i = 0; i < 9; i++) {
            var lightness = 95 - (i * 10); // De 95% à 5%
            var saturation = Math.max(10, hsl.s - (i * 5)); // Diminue légèrement la saturation
            shades.push(this.hslToHex({
                h: hsl.h,
                s: saturation,
                l: lightness
            }));
        }
        return shades;
    };
    /**
     * Génère une échelle de neutres harmonieuse
     */
    DesignSystem.prototype.generateNeutralScale = function (baseHsl) {
        var neutrals = [];
        // Utilise une faible saturation de la couleur de base pour des neutres harmonieux
        var neutralSaturation = Math.min(15, baseHsl.s * 0.3);
        for (var i = 0; i < 9; i++) {
            var lightness = 95 - (i * 10);
            neutrals.push(this.hslToHex({
                h: baseHsl.h,
                s: neutralSaturation,
                l: lightness
            }));
        }
        return neutrals;
    };
    /**
     * Génère les couleurs sémantiques adaptées au secteur
     */
    DesignSystem.prototype.generateSemanticColors = function () {
        var sectorSemantics = {
            restaurant: {
                success: '#10b981', // Vert frais
                warning: '#f59e0b', // Orange chaud
                error: '#ef4444', // Rouge discret
                info: '#3b82f6' // Bleu informatif
            },
            sante: {
                success: '#22c55e', // Vert santé
                warning: '#eab308', // Jaune attention
                error: '#dc2626', // Rouge urgence
                info: '#0ea5e9' // Bleu médical
            },
            finance: {
                success: '#16a34a', // Vert profit
                warning: '#ca8a04', // Or attention
                error: '#dc2626', // Rouge perte
                info: '#2563eb' // Bleu financier
            },
            elearning: {
                success: '#059669', // Vert apprentissage
                warning: '#d97706', // Orange motivation
                error: '#dc2626', // Rouge erreur
                info: '#7c3aed' // Violet créatif
            },
            immobilier: {
                success: '#16a34a', // Vert validation
                warning: '#ca8a04', // Or premium
                error: '#dc2626', // Rouge alerte
                info: '#1d4ed8' // Bleu confiance
            },
            tech: {
                success: '#10b981', // Vert tech
                warning: '#f59e0b', // Orange innovation
                error: '#ef4444', // Rouge système
                info: '#06b6d4' // Cyan digital
            }
        };
        return sectorSemantics[this.config.sector] || sectorSemantics.tech;
    };
    /**
     * Récupère les ajustements de couleur par secteur
     */
    DesignSystem.prototype.getSectorColorAdjustments = function () {
        var adjustments = {
            restaurant: { hueShift: 10, saturationMultiplier: 1.1, lightnessShift: 5 },
            sante: { hueShift: -5, saturationMultiplier: 0.9, lightnessShift: 10 },
            finance: { hueShift: -10, saturationMultiplier: 0.8, lightnessShift: -5 },
            elearning: { hueShift: 15, saturationMultiplier: 1.2, lightnessShift: 8 },
            immobilier: { hueShift: 5, saturationMultiplier: 0.95, lightnessShift: 3 },
            tech: { hueShift: 20, saturationMultiplier: 1.1, lightnessShift: 0 }
        };
        return adjustments[this.config.sector] || adjustments.tech;
    };
    /**
     * Récupère les ajustements de couleur par personnalité
     */
    DesignSystem.prototype.getPersonalityColorAdjustments = function () {
        var adjustments = {
            professional: { saturationBoost: 0, contrastLevel: 1.2 },
            creative: { saturationBoost: 20, contrastLevel: 1.1 },
            minimal: { saturationBoost: -15, contrastLevel: 1.3 },
            luxury: { saturationBoost: -10, contrastLevel: 1.4 },
            friendly: { saturationBoost: 10, contrastLevel: 1.0 }
        };
        return adjustments[this.config.brandPersonality] || adjustments.professional;
    };
    /**
     * Récupère les polices par secteur
     */
    DesignSystem.prototype.getSectorFonts = function () {
        var fonts = {
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
    };
    /**
     * Récupère les polices par style
     */
    DesignSystem.prototype.getStyleFonts = function () {
        var fonts = {
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
    };
    /**
     * Exporte le système de design en différents formats
     */
    DesignSystem.prototype.exportDesignSystem = function (format) {
        var designSystem = this.generateCompleteDesignSystem();
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
    };
    /**
     * Convertit en format SCSS
     */
    DesignSystem.prototype.convertToSCSS = function (designSystem) {
        var scss = ['// Design System SCSS Variables\n'];
        // Couleurs
        scss.push('// Colors');
        scss.push("$primary: ".concat(designSystem.colors.primary, ";"));
        scss.push("$secondary: ".concat(designSystem.colors.secondary, ";"));
        scss.push("$accent: ".concat(designSystem.colors.accent, ";"));
        Object.entries(designSystem.colors.semantic).forEach(function (_a) {
            var name = _a[0], color = _a[1];
            scss.push("$".concat(name, ": ").concat(color, ";"));
        });
        return scss.join('\n');
    };
    /**
     * Convertit en format JS/TS
     */
    DesignSystem.prototype.convertToJS = function (designSystem) {
        return "\n// Design System Tokens\nexport const designTokens = ".concat(JSON.stringify(designSystem, null, 2), ";\n\nexport const colors = designTokens.colors;\nexport const typography = designTokens.typography;\nexport const spacing = designTokens.spacing;\nexport const shadows = designTokens.shadows;\n");
    };
    /**
     * Convertit en format Figma Tokens
     */
    DesignSystem.prototype.convertToFigmaTokens = function (designSystem) {
        var figmaTokens = {
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
    };
    return DesignSystem;
}());
exports.DesignSystem = DesignSystem;
/**
 * Factory pour créer des systèmes de design sectoriels
 */
var DesignSystemFactory = /** @class */ (function () {
    function DesignSystemFactory() {
    }
    DesignSystemFactory.createSectorDesignSystem = function (sector, companyName, baseColor, style) {
        if (style === void 0) { style = 'moderne'; }
        var config = {
            name: "".concat(companyName, " Design System"),
            version: '1.0.0',
            sector: sector,
            style: style,
            baseColor: baseColor,
            brandPersonality: this.inferPersonalityFromSector(sector)
        };
        return new DesignSystem(config);
    };
    DesignSystemFactory.inferPersonalityFromSector = function (sector) {
        var mapping = {
            restaurant: 'luxury',
            sante: 'professional',
            finance: 'professional',
            elearning: 'friendly',
            immobilier: 'professional',
            tech: 'creative'
        };
        return mapping[sector] || 'professional';
    };
    return DesignSystemFactory;
}());
exports.DesignSystemFactory = DesignSystemFactory;
exports.default = DesignSystem;
