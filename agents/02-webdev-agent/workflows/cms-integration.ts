/**
 * CMS Headless Integration - Phase 2
 * Intégration Sanity/Contentful avec API typée, preview mode et interface admin
 */

import { z } from 'zod';
import { createClient } from '@sanity/client';
import { groq } from 'next-sanity';

// Schemas de validation Zod pour le contenu
export const ImageSchema = z.object({
  asset: z.object({
    _ref: z.string(),
    _type: z.literal('reference'),
  }),
  alt: z.string().optional(),
  hotspot: z.object({
    x: z.number(),
    y: z.number(),
    height: z.number(),
    width: z.number(),
  }).optional(),
});

export const SEOSchema = z.object({
  title: z.string().max(60),
  description: z.string().max(160),
  keywords: z.array(z.string()).optional(),
  ogImage: ImageSchema.optional(),
});

export const PageSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  content: z.array(z.any()), // Portable Text
  seo: SEOSchema,
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
  author: z.object({
    name: z.string(),
    email: z.string().email(),
  }).optional(),
});

export const ArticleSchema = PageSchema.extend({
  _type: z.literal('article'),
  excerpt: z.string(),
  featuredImage: ImageSchema,
  category: z.object({
    title: z.string(),
    slug: z.object({
      current: z.string(),
    }),
  }),
  tags: z.array(z.string()),
  readingTime: z.number(),
});

export const ProductSchema = z.object({
  _id: z.string(),
  _type: z.literal('product'),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  description: z.string(),
  price: z.number().positive(),
  images: z.array(ImageSchema),
  category: z.object({
    title: z.string(),
    slug: z.object({
      current: z.string(),
    }),
  }),
  variants: z.array(z.object({
    title: z.string(),
    price: z.number(),
    sku: z.string(),
    inventory: z.number().int().nonnegative(),
  })).optional(),
  features: z.array(z.string()),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  seo: SEOSchema,
});

export const MenuItemSchema = z.object({
  _id: z.string(),
  _type: z.literal('menuItem'),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  image: ImageSchema.optional(),
  allergens: z.array(z.string()).optional(),
  dietary: z.array(z.enum(['vegetarian', 'vegan', 'gluten-free', 'dairy-free'])).optional(),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  spicyLevel: z.number().int().min(0).max(5).optional(),
});

export const RestaurantInfoSchema = z.object({
  _id: z.string(),
  _type: z.literal('restaurantInfo'),
  name: z.string(),
  description: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    website: z.string().url().optional(),
  }),
  hours: z.array(z.object({
    day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
    open: z.string(),
    close: z.string(),
    closed: z.boolean().default(false),
  })),
  socialMedia: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }).optional(),
  images: z.array(ImageSchema),
});

/**
 * Configuration Sanity
 */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};

/**
 * Client Sanity
 */
export const sanityClient = createClient(sanityConfig);

/**
 * Client Sanity avec token pour les opérations d'écriture
 */
export const sanityWriteClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

/**
 * Classe principale pour l'intégration CMS
 */
export class CMSIntegration {
  private client: typeof sanityClient;
  private writeClient: typeof sanityWriteClient;

  constructor(isPreview: boolean = false) {
    this.client = isPreview ? sanityWriteClient : sanityClient;
    this.writeClient = sanityWriteClient;
  }

  /**
   * Récupère toutes les pages
   */
  async getPages(limit: number = 10, offset: number = 0) {
    const query = groq`
      *[_type == "page"] | order(publishedAt desc, _createdAt desc) [${offset}...${offset + limit}] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        content,
        seo,
        featured,
        publishedAt,
        author
      }
    `;

    const pages = await this.client.fetch(query);
    return z.array(PageSchema).parse(pages);
  }

  /**
   * Récupère une page par son slug
   */
  async getPageBySlug(slug: string) {
    const query = groq`
      *[_type == "page" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        content,
        seo,
        featured,
        publishedAt,
        author
      }
    `;

    const page = await this.client.fetch(query, { slug });
    return page ? PageSchema.parse(page) : null;
  }

  /**
   * Récupère tous les articles
   */
  async getArticles(limit: number = 10, offset: number = 0) {
    const query = groq`
      *[_type == "article"] | order(publishedAt desc, _createdAt desc) [${offset}...${offset + limit}] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        category->{
          title,
          slug
        },
        tags,
        readingTime,
        seo,
        featured,
        publishedAt,
        author
      }
    `;

    const articles = await this.client.fetch(query);
    return z.array(ArticleSchema).parse(articles);
  }

  /**
   * Récupère un article par son slug
   */
  async getArticleBySlug(slug: string) {
    const query = groq`
      *[_type == "article" && slug.current == $slug][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        category->{
          title,
          slug
        },
        tags,
        readingTime,
        seo,
        featured,
        publishedAt,
        author
      }
    `;

    const article = await this.client.fetch(query, { slug });
    return article ? ArticleSchema.parse(article) : null;
  }

  /**
   * Récupère tous les produits
   */
  async getProducts(limit: number = 10, offset: number = 0, category?: string) {
    const categoryFilter = category ? `&& category->slug.current == $category` : '';
    
    const query = groq`
      *[_type == "product" ${categoryFilter}] | order(featured desc, _createdAt desc) [${offset}...${offset + limit}] {
        _id,
        _type,
        title,
        slug,
        description,
        price,
        images,
        category->{
          title,
          slug
        },
        variants,
        features,
        inStock,
        featured,
        seo
      }
    `;

    const products = await this.client.fetch(query, category ? { category } : {});
    return z.array(ProductSchema).parse(products);
  }

  /**
   * Récupère un produit par son slug
   */
  async getProductBySlug(slug: string) {
    const query = groq`
      *[_type == "product" && slug.current == $slug][0] {
        _id,
        _type,
        title,
        slug,
        description,
        price,
        images,
        category->{
          title,
          slug
        },
        variants,
        features,
        inStock,
        featured,
        seo
      }
    `;

    const product = await this.client.fetch(query, { slug });
    return product ? ProductSchema.parse(product) : null;
  }

  /**
   * Récupère les éléments du menu par catégorie
   */
  async getMenuItems(category?: string) {
    const categoryFilter = category ? `&& category == $category` : '';
    
    const query = groq`
      *[_type == "menuItem" && available == true ${categoryFilter}] | order(featured desc, name asc) {
        _id,
        _type,
        name,
        description,
        price,
        category,
        image,
        allergens,
        dietary,
        available,
        featured,
        spicyLevel
      }
    `;

    const menuItems = await this.client.fetch(query, category ? { category } : {});
    return z.array(MenuItemSchema).parse(menuItems);
  }

  /**
   * Récupère les informations du restaurant
   */
  async getRestaurantInfo() {
    const query = groq`
      *[_type == "restaurantInfo"][0] {
        _id,
        _type,
        name,
        description,
        address,
        contact,
        hours,
        socialMedia,
        images
      }
    `;

    const info = await this.client.fetch(query);
    return info ? RestaurantInfoSchema.parse(info) : null;
  }

  /**
   * Recherche dans le contenu
   */
  async searchContent(searchTerm: string, types: string[] = ['page', 'article', 'product']) {
    const typeFilter = types.map(type => `_type == "${type}"`).join(' || ');
    
    const query = groq`
      *[_type in [${types.map(t => `"${t}"`).join(', ')}] && (
        title match $searchTerm ||
        description match $searchTerm ||
        pt::text(content) match $searchTerm
      )] | order(_score desc) [0...20] {
        _id,
        _type,
        title,
        slug,
        description,
        _score
      }
    `;

    return await this.client.fetch(query, { 
      searchTerm: `${searchTerm}*` 
    });
  }

  /**
   * Crée ou met à jour du contenu
   */
  async createOrUpdateContent(doc: any) {
    try {
      const result = await this.writeClient.createOrReplace(doc);
      return result;
    } catch (error) {
      console.error('Erreur création/mise à jour contenu:', error);
      throw new Error('Impossible de sauvegarder le contenu');
    }
  }

  /**
   * Supprime du contenu
   */
  async deleteContent(documentId: string) {
    try {
      const result = await this.writeClient.delete(documentId);
      return result;
    } catch (error) {
      console.error('Erreur suppression contenu:', error);
      throw new Error('Impossible de supprimer le contenu');
    }
  }

  /**
   * Upload d'image
   */
  async uploadImage(file: File) {
    try {
      const asset = await this.writeClient.assets.upload('image', file, {
        filename: file.name,
      });
      
      return {
        asset: {
          _ref: asset._id,
          _type: 'reference',
        },
        alt: file.name,
      };
    } catch (error) {
      console.error('Erreur upload image:', error);
      throw new Error('Impossible d\'uploader l\'image');
    }
  }

  /**
   * Génère l'URL d'une image Sanity
   */
  getImageUrl(image: z.infer<typeof ImageSchema>, width?: number, height?: number) {
    if (!image?.asset?._ref) return '';

    const baseUrl = `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}`;
    const imageId = image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png');
    
    let url = `${baseUrl}/${imageId}`;
    
    if (width || height) {
      const params = new URLSearchParams();
      if (width) params.append('w', width.toString());
      if (height) params.append('h', height.toString());
      params.append('fit', 'crop');
      params.append('auto', 'format');
      
      url += `?${params.toString()}`;
    }
    
    return url;
  }

  /**
   * Convertit le Portable Text en HTML
   */
  async portableTextToHtml(portableText: any[]) {
    // Implémentation basique - peut être étendue avec @portabletext/to-html
    return portableText
      .map(block => {
        if (block._type === 'block') {
          return `<p>${block.children.map((child: any) => child.text).join('')}</p>`;
        }
        return '';
      })
      .join('');
  }

  /**
   * Gestion du preview mode
   */
  async getPreviewData(token: string, documentId: string) {
    if (token !== process.env.SANITY_PREVIEW_SECRET) {
      throw new Error('Token de preview invalide');
    }

    const query = groq`*[_id == $documentId][0]`;
    const document = await this.writeClient.fetch(query, { documentId });
    
    return document;
  }

  /**
   * Valide les webhooks Sanity
   */
  validateWebhook(body: string, signature: string) {
    const crypto = require('crypto');
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    
    if (!secret) {
      throw new Error('SANITY_WEBHOOK_SECRET manquant');
    }

    const computedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    return signature === `sha256=${computedSignature}`;
  }

  /**
   * Gère les webhooks de mise à jour de contenu
   */
  async handleContentWebhook(payload: any) {
    const { _type, _id, slug } = payload;

    // Invalider le cache Next.js pour les pages concernées
    try {
      if (_type === 'page' || _type === 'article') {
        await fetch(`/api/revalidate?path=/${slug?.current || _id}`, {
          method: 'POST',
        });
      } else if (_type === 'product') {
        await fetch(`/api/revalidate?path=/products/${slug?.current || _id}`, {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Erreur revalidation cache:', error);
    }

    return { success: true };
  }
}

/**
 * Utilitaires pour les types de contenu
 */
export const ContentUtils = {
  /**
   * Génère un slug à partir d'un titre
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  /**
   * Calcule le temps de lecture estimé
   */
  calculateReadingTime(content: any[]): number {
    const wordCount = content
      .filter(block => block._type === 'block')
      .reduce((count, block) => {
        const text = block.children?.map((child: any) => child.text).join(' ') || '';
        return count + text.split(/\s+/).length;
      }, 0);

    return Math.max(1, Math.round(wordCount / 200)); // 200 mots par minute
  },

  /**
   * Extrait un extrait du contenu
   */
  extractExcerpt(content: any[], maxLength: number = 160): string {
    const text = content
      .filter(block => block._type === 'block')
      .map(block => block.children?.map((child: any) => child.text).join(' '))
      .join(' ') || '';

    return text.length > maxLength 
      ? text.substring(0, maxLength).trim() + '...'
      : text;
  },
};

export default CMSIntegration;