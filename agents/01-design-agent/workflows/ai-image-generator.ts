/**
 * AI Image Generator - DALL-E 3 Integration pour Design Agent Phase 2
 * Génération automatique d'images selon secteur d'activité
 */

export interface ImageGenerationConfig {
  model: 'dall-e-3' | 'dall-e-2';
  size: '1024x1024' | '1792x1024' | '1024x1792';
  quality: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
  n?: number;
}

export interface SectorImageSet {
  sector: string;
  hero: string;
  features: string[];
  gallery: string[];
  testimonials: string;
  cta: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  type: 'hero' | 'feature' | 'gallery' | 'testimonial' | 'cta' | 'icon';
  optimizedUrls: {
    webp: string;
    jpeg: string;
    thumbnail: string;
  };
  alt: string;
  metadata: {
    width: number;
    height: number;
    size: number;
    format: string;
  };
}

export class AIImageGenerator {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/images/generations';
  private defaultConfig: ImageGenerationConfig = {
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'hd',
    style: 'natural',
    n: 1
  };

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Génère un set d'images complet pour un secteur
   */
  async generateSectorImageSet(
    sector: string, 
    businessName: string,
    customConfig?: Partial<ImageGenerationConfig>
  ): Promise<SectorImageSet & { images: GeneratedImage[] }> {
    const prompts = this.getSectorPrompts(sector, businessName);
    const config = { ...this.defaultConfig, ...customConfig };
    const images: GeneratedImage[] = [];

    // Génération Hero Image
    const heroImage = await this.generateSingleImage(
      prompts.hero, 
      'hero', 
      { ...config, size: '1792x1024' }
    );
    images.push(heroImage);

    // Génération Images Features (3 images)
    for (let i = 0; i < prompts.features.length && i < 3; i++) {
      const featureImage = await this.generateSingleImage(
        prompts.features[i], 
        'feature', 
        config
      );
      images.push(featureImage);
    }

    // Génération Gallery (4 images)
    for (let i = 0; i < prompts.gallery.length && i < 4; i++) {
      const galleryImage = await this.generateSingleImage(
        prompts.gallery[i], 
        'gallery', 
        config
      );
      images.push(galleryImage);
    }

    // Génération Testimonial background
    const testimonialImage = await this.generateSingleImage(
      prompts.testimonials, 
      'testimonial', 
      config
    );
    images.push(testimonialImage);

    // Génération CTA background
    const ctaImage = await this.generateSingleImage(
      prompts.cta, 
      'cta', 
      { ...config, size: '1792x1024' }
    );
    images.push(ctaImage);

    return {
      ...prompts,
      images
    };
  }

  /**
   * Génère une image unique avec optimisations
   */
  async generateSingleImage(
    prompt: string, 
    type: GeneratedImage['type'],
    config: ImageGenerationConfig
  ): Promise<GeneratedImage> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          prompt: this.optimizePrompt(prompt, type),
          size: config.size,
          quality: config.quality,
          style: config.style,
          n: config.n || 1
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur DALL-E API: ${response.statusText}`);
      }

      const data = await response.json();
      const imageUrl = data.data[0].url;

      // Optimisation et conversion d'images
      const optimizedUrls = await this.optimizeImage(imageUrl);
      const metadata = await this.getImageMetadata(imageUrl);

      return {
        url: imageUrl,
        prompt: this.optimizePrompt(prompt, type),
        type,
        optimizedUrls,
        alt: this.generateAltText(prompt, type),
        metadata
      };

    } catch (error) {
      console.error('Erreur génération image:', error);
      throw error;
    }
  }

  /**
   * Définit les prompts par secteur d'activité
   */
  private getSectorPrompts(sector: string, businessName: string): SectorImageSet {
    const sectorPrompts: Record<string, SectorImageSet> = {
      restaurant: {
        sector: 'restaurant',
        hero: `Elegant fine dining restaurant interior with warm lighting, beautifully set tables with white tablecloths, modern sophisticated atmosphere, professional photography style, high-end gastronomy setting for ${businessName}`,
        features: [
          `Professional chef in modern kitchen preparing gourmet dish, action shot, steam, dynamic cooking scene for ${businessName}`,
          `Beautifully plated gourmet dish on white plate, artistic food photography, michelin star presentation style`,
          `Wine cellar with premium bottles, elegant wine tasting room, sophisticated ambiance, warm lighting`
        ],
        gallery: [
          `Luxury restaurant dining room with elegant decor, soft lighting, intimate atmosphere`,
          `Fresh ingredients artistically arranged, farmers market style, high quality produce`,
          `Happy customers enjoying meal in restaurant, natural candid photography, warm atmosphere`,
          `Outdoor restaurant terrace with city view, elegant furniture, sunset lighting`
        ],
        testimonials: `Happy diverse customers dining in elegant restaurant, natural smiles, comfortable atmosphere, testimonial photography style`,
        cta: `Restaurant reservation scene with elegant table setting, invitation atmosphere, call-to-action visual, warm welcoming lighting`
      },

      sante: {
        sector: 'sante',
        hero: `Modern medical facility entrance with clean design, professional healthcare environment, reassuring atmosphere, natural lighting for ${businessName}`,
        features: [
          `Advanced medical equipment in modern examination room, high-tech healthcare technology, sterile clean environment`,
          `Friendly doctor consulting with patient, professional medical consultation, trust and care atmosphere`,
          `Digital health records on tablet, modern healthcare technology, data visualization, medical interface`
        ],
        gallery: [
          `Clean modern waiting room with comfortable seating, natural light, welcoming healthcare environment`,
          `Medical team collaboration, diverse healthcare professionals, teamwork in hospital setting`,
          `Patient receiving care, compassionate healthcare, recovery and wellness focus`,
          `Medical research laboratory with scientists, innovation in healthcare, cutting-edge technology`
        ],
        testimonials: `Satisfied patients testimonials, diverse people showing gratitude, healthcare success stories, professional medical photography`,
        cta: `Healthcare appointment booking scene, calendar scheduling, medical consultation invitation, professional trust building`
      },

      finance: {
        sector: 'finance',
        hero: `Modern financial advisory office with city skyline view, professional business environment, sleek design, executive atmosphere for ${businessName}`,
        features: [
          `Financial charts and graphs on multiple monitors, trading floor atmosphere, data analytics visualization`,
          `Professional financial advisor meeting with clients, consultation room, trust and expertise demonstration`,
          `Digital banking interface on laptop, modern fintech application, user-friendly financial technology`
        ],
        gallery: [
          `Business handshake in modern office, partnership and trust in finance, professional relationship building`,
          `Investment portfolio documents and calculator, financial planning materials, wealth management tools`,
          `Team of financial experts in boardroom, strategic planning session, collaborative financial consulting`,
          `Secure vault with gold bars and documents, financial security and wealth protection visualization`
        ],
        testimonials: `Successful business people testimonials, diverse satisfied clients, financial success stories, professional achievement photography`,
        cta: `Financial consultation invitation, professional meeting setup, trust-building call-to-action scene, executive office environment`
      },

      elearning: {
        sector: 'elearning',
        hero: `Student using laptop for online learning in modern study space, e-learning platform interface, educational technology for ${businessName}`,
        features: [
          `Interactive online classroom with virtual participants, video conferencing education, modern digital learning`,
          `Educational content on tablet screen, e-learning course materials, intuitive learning interface design`,
          `Student taking notes while watching online lecture, focused learning environment, educational success`
        ],
        gallery: [
          `Diverse students collaborating online, virtual study group, global e-learning community`,
          `Digital library interface with educational resources, online books and materials, knowledge accessibility`,
          `Teacher recording online course, educational content creation, professional e-learning production`,
          `Student celebrating learning achievement, online graduation, educational milestone success`
        ],
        testimonials: `Happy students sharing e-learning success stories, diverse learners testimonials, educational achievement celebration`,
        cta: `Course enrollment invitation, start learning call-to-action, educational opportunity presentation, inspiring learning journey`
      },

      immobilier: {
        sector: 'immobilier',
        hero: `Luxury modern house exterior with beautiful landscaping, real estate photography, architectural excellence for ${businessName}`,
        features: [
          `Real estate agent showing property to clients, professional property tour, customer service excellence`,
          `Modern apartment interior with designer furniture, stylish home decoration, luxury living space`,
          `Aerial view of residential neighborhood, community planning, real estate development overview`
        ],
        gallery: [
          `Beautiful kitchen with modern appliances, home interior design, luxury residential space`,
          `Spacious living room with natural light, contemporary home design, comfortable living environment`,
          `Home office setup in modern house, remote work space, residential functionality`,
          `Outdoor pool and garden area, luxury home amenities, lifestyle real estate features`
        ],
        testimonials: `Happy homeowners in front of new house, real estate success stories, satisfied clients testimonials, home ownership joy`,
        cta: `Property viewing invitation, real estate consultation call-to-action, home buying opportunity presentation`
      },

      tech: {
        sector: 'tech',
        hero: `Modern tech startup office with open workspace, innovative technology environment, collaborative coding space for ${businessName}`,
        features: [
          `Developers coding on multiple monitors, software development team, agile working environment`,
          `Futuristic AI interface with holographic elements, cutting-edge technology visualization, innovation concept`,
          `Cloud server infrastructure, data center technology, modern IT infrastructure visualization`
        ],
        gallery: [
          `Tech team brainstorming session, innovation workshop, collaborative problem solving in modern office`,
          `Smartphone app interface mockups, mobile technology design, user experience development`,
          `Robotics and AI laboratory, advanced technology research, future tech development`,
          `Cybersecurity visualization with network diagrams, data protection technology, secure systems`
        ],
        testimonials: `Tech entrepreneurs sharing success stories, startup founders testimonials, innovation achievement celebration`,
        cta: `Technology consultation invitation, digital transformation call-to-action, tech solution presentation`
      }
    };

    return sectorPrompts[sector] || sectorPrompts.tech;
  }

  /**
   * Optimise le prompt pour DALL-E 3
   */
  private optimizePrompt(basePrompt: string, type: GeneratedImage['type']): string {
    const qualityEnhancers = [
      'professional photography',
      'high resolution',
      'studio lighting',
      'commercial grade',
      'marketing material quality'
    ];

    const typeSpecificEnhancers: Record<string, string[]> = {
      hero: ['wide angle', 'cinematic composition', 'dramatic lighting'],
      feature: ['product photography', 'clean background', 'focused composition'],
      gallery: ['lifestyle photography', 'natural lighting', 'authentic moments'],
      testimonial: ['portrait photography', 'genuine expressions', 'professional headshots'],
      cta: ['compelling visual', 'action-oriented', 'engaging composition'],
      icon: ['minimalist design', 'vector style', 'clean graphics']
    };

    const enhancers = [...qualityEnhancers, ...(typeSpecificEnhancers[type] || [])];
    const randomEnhancers = enhancers.sort(() => 0.5 - Math.random()).slice(0, 3);

    return `${basePrompt}, ${randomEnhancers.join(', ')}, 8K resolution, professional quality`;
  }

  /**
   * Optimise l'image générée (conversion WebP, compression)
   */
  private async optimizeImage(imageUrl: string): Promise<GeneratedImage['optimizedUrls']> {
    // Simulation des URLs optimisées (à implémenter avec un service de conversion réel)
    return {
      webp: imageUrl.replace('.png', '.webp'),
      jpeg: imageUrl.replace('.png', '.jpg'),
      thumbnail: imageUrl.replace('.png', '_thumb.jpg')
    };
  }

  /**
   * Récupère les métadonnées de l'image
   */
  private async getImageMetadata(imageUrl: string): Promise<GeneratedImage['metadata']> {
    // Simulation des métadonnées (à implémenter avec une vraie analyse d'image)
    return {
      width: 1024,
      height: 1024,
      size: 256000, // en bytes
      format: 'PNG'
    };
  }

  /**
   * Génère le texte alternatif optimisé SEO
   */
  private generateAltText(prompt: string, type: GeneratedImage['type']): string {
    const typeDescriptions: Record<string, string> = {
      hero: 'Image principale de présentation',
      feature: 'Illustration de fonctionnalité',
      gallery: 'Image de galerie',
      testimonial: 'Photo de témoignage client',
      cta: 'Image d\'appel à l\'action',
      icon: 'Icône illustrative'
    };

    // Extraction des mots-clés du prompt
    const keywords = prompt
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 5)
      .join(' ');

    return `${typeDescriptions[type]} - ${keywords}`;
  }

  /**
   * Génère des images de placeholder en cas d'erreur
   */
  generatePlaceholderImage(type: GeneratedImage['type'], sector: string): GeneratedImage {
    const placeholderUrls = {
      restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
      sante: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
      finance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      elearning: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      immobilier: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      tech: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176'
    };

    const baseUrl = placeholderUrls[sector as keyof typeof placeholderUrls] || placeholderUrls.tech;

    return {
      url: `${baseUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80`,
      prompt: `Placeholder image for ${sector} ${type}`,
      type,
      optimizedUrls: {
        webp: `${baseUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp`,
        jpeg: `${baseUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=jpg`,
        thumbnail: `${baseUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`
      },
      alt: `Image ${type} pour secteur ${sector}`,
      metadata: {
        width: 1024,
        height: 1024,
        size: 150000,
        format: 'JPEG'
      }
    };
  }
}

/**
 * Service intégré pour génération d'images par secteur
 */
export class SectorImageService {
  private imageGenerator: AIImageGenerator;

  constructor(openaiApiKey: string) {
    this.imageGenerator = new AIImageGenerator(openaiApiKey);
  }

  /**
   * Génère un pack d'images complet pour un nouveau projet
   */
  async generateProjectImagePack(
    sector: string,
    businessName: string,
    useAI: boolean = true
  ): Promise<{
    success: boolean;
    images: GeneratedImage[];
    fallbackUsed: boolean;
    totalCost?: number;
  }> {
    try {
      if (useAI) {
        const result = await this.imageGenerator.generateSectorImageSet(sector, businessName);
        return {
          success: true,
          images: result.images,
          fallbackUsed: false,
          totalCost: this.calculateGenerationCost(result.images.length)
        };
      } else {
        // Utilisation d'images placeholder Unsplash
        const placeholderImages = this.generatePlaceholderPack(sector);
        return {
          success: true,
          images: placeholderImages,
          fallbackUsed: true
        };
      }
    } catch (error) {
      console.error('Erreur génération pack images:', error);
      
      // Fallback vers placeholders en cas d'erreur
      const placeholderImages = this.generatePlaceholderPack(sector);
      return {
        success: true,
        images: placeholderImages,
        fallbackUsed: true
      };
    }
  }

  /**
   * Génère un pack d'images placeholder pour un secteur
   */
  private generatePlaceholderPack(sector: string): GeneratedImage[] {
    const imageTypes: GeneratedImage['type'][] = ['hero', 'feature', 'feature', 'feature', 'gallery', 'gallery', 'gallery', 'gallery', 'testimonial', 'cta'];
    
    return imageTypes.map(type => 
      this.imageGenerator.generatePlaceholderImage(type, sector)
    );
  }

  /**
   * Calcule le coût de génération DALL-E 3
   */
  private calculateGenerationCost(imageCount: number): number {
    // Prix DALL-E 3: $0.040 per image (1024×1024), $0.080 per image (1792×1024 or 1024×1792)
    const standardImages = imageCount - 2; // Hero et CTA sont en format large
    const largeImages = 2;
    
    return (standardImages * 0.040) + (largeImages * 0.080);
  }
}

export default AIImageGenerator;