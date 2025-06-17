/**
 * Figma Integration MCP - Phase 2 Design Agent Extension
 * Import automatique des designs Figma vers HTML/CSS
 */

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  effects?: FigmaEffect[];
  characters?: string;
  style?: FigmaTextStyle;
  children?: FigmaNode[];
  absoluteBoundingBox?: FigmaBoundingBox;
  constraints?: FigmaConstraints;
}

export interface FigmaFill {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'IMAGE';
  color?: FigmaColor;
  gradientStops?: FigmaGradientStop[];
  imageRef?: string;
  opacity?: number;
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaTextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
}

export interface FigmaBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FigmaDesignTokens {
  colors: Record<string, string>;
  typography: Record<string, FigmaTypographyToken>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

export interface FigmaTypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}

export class FigmaIntegrationMCP {
  private apiKey: string;
  private baseUrl = 'https://api.figma.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Récupère un fichier Figma par son ID
   */
  async fetchFigmaFile(fileId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}`, {
      headers: {
        'X-Figma-Token': this.apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur Figma API: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Extrait les design tokens d'un fichier Figma
   */
  extractDesignTokens(figmaData: any): FigmaDesignTokens {
    const tokens: FigmaDesignTokens = {
      colors: {},
      typography: {},
      spacing: {},
      borderRadius: {},
      shadows: {}
    };

    // Extraction des couleurs depuis les styles
    if (figmaData.styles) {
      Object.values(figmaData.styles).forEach((style: any) => {
        if (style.styleType === 'FILL') {
          const colorName = this.sanitizeTokenName(style.name);
          const color = this.extractColorFromStyle(style);
          if (color) {
            tokens.colors[colorName] = color;
          }
        }
      });
    }

    // Extraction des typographies
    this.traverseNodes(figmaData.document, (node: FigmaNode) => {
      if (node.type === 'TEXT' && node.style) {
        const typeName = this.sanitizeTokenName(node.name);
        tokens.typography[typeName] = {
          fontFamily: node.style.fontFamily,
          fontSize: `${node.style.fontSize}px`,
          fontWeight: node.style.fontWeight.toString(),
          lineHeight: `${node.style.lineHeight}px`
        };
      }
    });

    return tokens;
  }

  /**
   * Convertit un composant Figma en HTML/CSS
   */
  convertFigmaComponentToHTML(component: FigmaNode): { html: string; css: string } {
    const html = this.generateHTMLFromNode(component);
    const css = this.generateCSSFromNode(component);

    return { html, css };
  }

  /**
   * Parse un design Figma complet en structure de page
   */
  async parseFigmaDesign(fileId: string, pageId?: string): Promise<{
    html: string;
    css: string;
    tokens: FigmaDesignTokens;
    components: Array<{ name: string; html: string; css: string }>;
  }> {
    const figmaData = await this.fetchFigmaFile(fileId);
    const tokens = this.extractDesignTokens(figmaData);
    
    let targetPage = figmaData.document;
    if (pageId) {
      targetPage = this.findNodeById(figmaData.document, pageId);
    }

    const components: Array<{ name: string; html: string; css: string }> = [];
    const pageHTML: string[] = [];
    const pageCSS: string[] = [];

    // Génération des CSS variables depuis les tokens
    pageCSS.push(this.generateCSSVariables(tokens));

    this.traverseNodes(targetPage, (node: FigmaNode) => {
      if (this.isComponent(node)) {
        const { html, css } = this.convertFigmaComponentToHTML(node);
        components.push({
          name: node.name,
          html,
          css
        });
      }
      
      if (this.isPageElement(node)) {
        const { html, css } = this.convertFigmaComponentToHTML(node);
        pageHTML.push(html);
        pageCSS.push(css);
      }
    });

    return {
      html: this.wrapInHTMLDocument(pageHTML.join('\n')),
      css: pageCSS.join('\n'),
      tokens,
      components
    };
  }

  /**
   * Génère les variables CSS depuis les tokens
   */
  private generateCSSVariables(tokens: FigmaDesignTokens): string {
    const cssVars: string[] = [':root {'];

    // Couleurs
    Object.entries(tokens.colors).forEach(([name, value]) => {
      cssVars.push(`  --color-${name}: ${value};`);
    });

    // Typographies
    Object.entries(tokens.typography).forEach(([name, style]) => {
      cssVars.push(`  --font-${name}-family: ${style.fontFamily};`);
      cssVars.push(`  --font-${name}-size: ${style.fontSize};`);
      cssVars.push(`  --font-${name}-weight: ${style.fontWeight};`);
      cssVars.push(`  --font-${name}-line-height: ${style.lineHeight};`);
    });

    // Espacements
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      cssVars.push(`  --spacing-${name}: ${value};`);
    });

    cssVars.push('}');
    return cssVars.join('\n');
  }

  /**
   * Génère le HTML depuis un nœud Figma
   */
  private generateHTMLFromNode(node: FigmaNode): string {
    switch (node.type) {
      case 'TEXT':
        return `<p class="${this.generateClassName(node.name)}">${node.characters || ''}</p>`;
      
      case 'RECTANGLE':
      case 'FRAME':
        const children = node.children?.map(child => this.generateHTMLFromNode(child)).join('\n') || '';
        return `<div class="${this.generateClassName(node.name)}">${children}</div>`;
      
      case 'IMAGE':
        return `<img class="${this.generateClassName(node.name)}" alt="${node.name}" />`;
      
      default:
        const defaultChildren = node.children?.map(child => this.generateHTMLFromNode(child)).join('\n') || '';
        return `<div class="${this.generateClassName(node.name)}">${defaultChildren}</div>`;
    }
  }

  /**
   * Génère le CSS depuis un nœud Figma
   */
  private generateCSSFromNode(node: FigmaNode): string {
    const className = this.generateClassName(node.name);
    const styles: string[] = [];

    // Position et dimensions
    if (node.absoluteBoundingBox) {
      styles.push(`width: ${node.absoluteBoundingBox.width}px;`);
      styles.push(`height: ${node.absoluteBoundingBox.height}px;`);
    }

    // Couleurs de fond
    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        const color = this.rgbaToHex(fill.color, fill.opacity || 1);
        styles.push(`background-color: ${color};`);
      }
    }

    // Typographie
    if (node.type === 'TEXT' && node.style) {
      styles.push(`font-family: '${node.style.fontFamily}', sans-serif;`);
      styles.push(`font-size: ${node.style.fontSize}px;`);
      styles.push(`font-weight: ${node.style.fontWeight};`);
      styles.push(`line-height: ${node.style.lineHeight}px;`);
      styles.push(`text-align: ${node.style.textAlignHorizontal.toLowerCase()};`);
    }

    return `.${className} {\n  ${styles.join('\n  ')}\n}`;
  }

  /**
   * Génère les prompts d'images automatiques selon le secteur
   */
  generateSectorImagePrompts(sector: string): string[] {
    const prompts: Record<string, string[]> = {
      restaurant: [
        "Restaurant gastronomique élégant avec éclairage tamisé, tables dressées avec vaisselle fine",
        "Chef cuisinier professionnel préparant un plat dans une cuisine moderne",
        "Plat gastronomique artistiquement dressé sur assiette blanche, haute qualité",
        "Salle de restaurant luxueuse avec décoration moderne et ambiance chaleureuse"
      ],
      sante: [
        "Cabinet médical moderne et rassurant avec équipements de pointe",
        "Médecin souriant en consultation avec patient dans environnement professionnel",
        "Équipements médicaux high-tech dans un environnement stérilisé",
        "Salle d'attente médicale moderne, lumineuse et accueillante"
      ],
      finance: [
        "Bureau moderne de conseil financier avec vue sur la ville",
        "Graphiques financiers et données sur écrans multiples, trading floor",
        "Réunion de conseil financier professionnelle dans salle de conférence",
        "Calculatrice et documents financiers sur bureau executive moderne"
      ],
      elearning: [
        "Étudiant suivant cours en ligne sur ordinateur portable dans espace moderne",
        "Plateforme e-learning interactive avec interface utilisateur intuitive",
        "Classe virtuelle avec participants connectés en visioconférence",
        "Bibliothèque numérique avec livres et ressources éducatives digitales"
      ],
      immobilier: [
        "Villa moderne luxueuse avec jardin paysager et piscine",
        "Appartement contemporain avec grandes baies vitrées et décoration design",
        "Agent immobilier présentant propriété à clients potentiels",
        "Quartier résidentiel paisible avec maisons modernes alignées"
      ],
      tech: [
        "Startup tech moderne avec open space et équipements high-tech",
        "Développeurs travaillant sur code dans environnement collaboratif",
        "Serveurs et infrastructure cloud dans datacenter moderne",
        "Interface utilisateur futuriste avec éléments holographiques et IA"
      ]
    };

    return prompts[sector] || prompts.tech;
  }

  /**
   * Utilitaires privés
   */
  private traverseNodes(node: FigmaNode, callback: (node: FigmaNode) => void): void {
    callback(node);
    if (node.children) {
      node.children.forEach(child => this.traverseNodes(child, callback));
    }
  }

  private findNodeById(root: FigmaNode, id: string): FigmaNode | null {
    if (root.id === id) return root;
    if (root.children) {
      for (const child of root.children) {
        const found = this.findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  private isComponent(node: FigmaNode): boolean {
    return node.type === 'COMPONENT' || node.type === 'COMPONENT_SET';
  }

  private isPageElement(node: FigmaNode): boolean {
    return ['FRAME', 'GROUP', 'SECTION'].includes(node.type);
  }

  private sanitizeTokenName(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private generateClassName(name: string): string {
    return this.sanitizeTokenName(name);
  }

  private extractColorFromStyle(style: any): string | null {
    // Logique d'extraction simplifiée
    return '#000000'; // Placeholder
  }

  private rgbaToHex(color: FigmaColor, opacity: number): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    
    if (opacity < 1) {
      const a = Math.round(opacity * 255);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
    }
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private wrapInHTMLDocument(content: string): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Figma Import</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    ${content}
</body>
</html>`;
  }
}

/**
 * Service de connexion MCP Figma
 */
export class FigmaMCPService {
  private figmaIntegration: FigmaIntegrationMCP;

  constructor(apiKey: string) {
    this.figmaIntegration = new FigmaIntegrationMCP(apiKey);
  }

  /**
   * Import automatique depuis URL Figma
   */
  async importFromFigmaUrl(figmaUrl: string): Promise<{
    success: boolean;
    data?: {
      html: string;
      css: string;
      tokens: FigmaDesignTokens;
      components: Array<{ name: string; html: string; css: string }>;
    };
    error?: string;
  }> {
    try {
      const fileId = this.extractFileIdFromUrl(figmaUrl);
      if (!fileId) {
        throw new Error('URL Figma invalide');
      }

      const result = await this.figmaIntegration.parseFigmaDesign(fileId);
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Génération de composants optimisés pour secteur
   */
  async generateSectorOptimizedComponents(
    figmaUrl: string, 
    sector: string
  ): Promise<{
    components: Array<{ name: string; html: string; css: string }>;
    imagePrompts: string[];
    tokens: FigmaDesignTokens;
  }> {
    const importResult = await this.importFromFigmaUrl(figmaUrl);
    
    if (!importResult.success || !importResult.data) {
      throw new Error('Échec de l\'import Figma');
    }

    const imagePrompts = this.figmaIntegration.generateSectorImagePrompts(sector);

    return {
      components: importResult.data.components,
      imagePrompts,
      tokens: importResult.data.tokens
    };
  }

  private extractFileIdFromUrl(url: string): string | null {
    const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }
}

export default FigmaMCPService;