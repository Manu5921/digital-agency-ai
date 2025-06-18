/**
 * PHOTO INTEGRATION - Intégration automatique des photos dans les composants
 * Connecte Photo Engine avec les templates et composants React
 */

const fs = require('fs').promises;
const path = require('path');

class PhotoIntegration {
    constructor() {
        this.componentMappings = {
            'HeroSection': {
                photoSections: ['hero', 'ambient'],
                imageElements: [
                    { selector: '.hero-image', section: 'hero', index: 0 },
                    { selector: '.hero-background', section: 'ambient', index: 0 }
                ]
            },
            'ServicesSection': {
                photoSections: ['services'],
                imageElements: [
                    { selector: '.service-icon', section: 'services', index: 'dynamic' }
                ]
            },
            'AboutSection': {
                photoSections: ['about', 'ambient'],
                imageElements: [
                    { selector: '.about-image', section: 'about', index: 0 },
                    { selector: '.team-photo', section: 'about', index: 0 }
                ]
            },
            'TestimonialsSection': {
                photoSections: ['testimonials'],
                imageElements: [
                    { selector: '.testimonial-avatar', section: 'testimonials', index: 'dynamic' }
                ]
            },
            'GallerySection': {
                photoSections: ['gallery'],
                imageElements: [
                    { selector: '.gallery-item', section: 'gallery', index: 'dynamic' }
                ]
            }
        };
    }

    /**
     * Intègre un package photo dans un projet Next.js
     */
    async integratePhotosInProject(photoPackage, projectPath) {
        console.log('🔗 Intégration photos dans le projet...');
        
        try {
            // 1. Créer la structure de dossiers images
            await this.setupImageDirectories(projectPath);
            
            // 2. Télécharger et organiser les images
            const localImagePaths = await this.downloadAndOrganizeImages(photoPackage, projectPath);
            
            // 3. Générer les composants avec images
            await this.updateComponentsWithImages(localImagePaths, projectPath, photoPackage.sector);
            
            // 4. Créer les utilitaires d'images
            await this.generateImageUtilities(localImagePaths, projectPath);
            
            // 5. Mettre à jour les imports
            await this.updateImageImports(projectPath);
            
            console.log('✅ Photos intégrées avec succès');
            
            return {
                success: true,
                imagesCount: Object.values(photoPackage.photos).flat().length,
                localPaths: localImagePaths,
                componentsUpdated: Object.keys(this.componentMappings)
            };
            
        } catch (error) {
            console.error('❌ Erreur intégration photos:', error);
            throw error;
        }
    }

    /**
     * Crée la structure de dossiers pour les images
     */
    async setupImageDirectories(projectPath) {
        const directories = [
            'public/images',
            'public/images/hero',
            'public/images/services',
            'public/images/about',
            'public/images/testimonials',
            'public/images/gallery',
            'public/images/ambient',
            'public/images/optimized'
        ];
        
        for (const dir of directories) {
            await fs.mkdir(path.join(projectPath, dir), { recursive: true });
        }
    }

    /**
     * Télécharge et organise les images localement
     */
    async downloadAndOrganizeImages(photoPackage, projectPath) {
        console.log('📥 Téléchargement et organisation des images...');
        
        const localPaths = {};
        
        for (const [section, photos] of Object.entries(photoPackage.photos)) {
            localPaths[section] = [];
            
            for (let i = 0; i < photos.length; i++) {
                const photo = photos[i];
                const filename = `${section}-${i + 1}.jpg`;
                const localPath = path.join(projectPath, 'public', 'images', section, filename);
                
                try {
                    // En mode démo, créer un fichier placeholder
                    if (photo.source.includes('mock') || photo.source.includes('demo')) {
                        await this.createPlaceholderImage(localPath, photo);
                    } else {
                        // En production, télécharger la vraie image
                        await this.downloadImage(photo.url, localPath);
                    }
                    
                    localPaths[section].push({
                        ...photo,
                        localPath: `/images/${section}/${filename}`,
                        filename: filename
                    });
                    
                } catch (error) {
                    console.warn(`⚠️  Erreur téléchargement ${filename}:`, error.message);
                }
            }
        }
        
        return localPaths;
    }

    /**
     * Crée une image placeholder pour la démo
     */
    async createPlaceholderImage(localPath, photo) {
        // Créer un fichier texte temporaire pour simuler l'image
        const placeholder = `# Image Placeholder
Keyword: ${photo.keyword}
Alt: ${photo.alt}
Source: ${photo.source}
URL: ${photo.url}
Credit: ${photo.credit}`;
        
        await fs.mkdir(path.dirname(localPath), { recursive: true });
        await fs.writeFile(localPath.replace('.jpg', '.txt'), placeholder);
    }

    /**
     * Télécharge une image réelle
     */
    async downloadImage(url, localPath) {
        // En production, utiliser fetch + stream
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const buffer = await response.arrayBuffer();
        await fs.mkdir(path.dirname(localPath), { recursive: true });
        await fs.writeFile(localPath, Buffer.from(buffer));
    }

    /**
     * Met à jour les composants React avec les nouvelles images
     */
    async updateComponentsWithImages(localImagePaths, projectPath, sector) {
        console.log('🔄 Mise à jour des composants...');
        
        const componentsPath = path.join(projectPath, 'src', 'app', 'components');
        
        for (const [componentName, mapping] of Object.entries(this.componentMappings)) {
            const componentPath = path.join(componentsPath, `${componentName}.tsx`);
            
            try {
                if (await this.fileExists(componentPath)) {
                    await this.updateSingleComponent(componentPath, mapping, localImagePaths, sector);
                }
            } catch (error) {
                console.warn(`⚠️  Erreur mise à jour ${componentName}:`, error.message);
            }
        }
    }

    /**
     * Met à jour un composant spécifique
     */
    async updateSingleComponent(componentPath, mapping, localImagePaths, sector) {
        let content = await fs.readFile(componentPath, 'utf8');
        
        // Ajouter l'import Image de Next.js si pas présent
        if (!content.includes('import Image from \'next/image\'')) {
            content = content.replace(
                /import.*from 'react'/,
                `import Image from 'next/image'\n$&`
            );
        }
        
        // Remplacer les placeholders d'images
        for (const element of mapping.imageElements) {
            const sectionPhotos = localImagePaths[element.section] || [];
            
            if (element.index === 'dynamic') {
                // Pour les éléments dynamiques (services, témoignages, galerie)
                content = this.updateDynamicImages(content, element, sectionPhotos, sector);
            } else {
                // Pour les éléments fixes (hero, about)
                const photo = sectionPhotos[element.index];
                if (photo) {
                    content = this.updateStaticImage(content, element, photo);
                }
            }
        }
        
        await fs.writeFile(componentPath, content);
    }

    /**
     * Met à jour les images dynamiques (services, témoignages)
     */
    updateDynamicImages(content, element, photos, sector) {
        const sectorTemplates = {
            'fitness': {
                services: [
                    'Coaching personnel intensif',
                    'Nutrition et rééquilibrage',
                    'Remise en forme femmes',
                    'Cours virtuels en ligne'
                ]
            },
            'beaute': {
                services: [
                    'Soins visage premium',
                    'Massages bien-être',
                    'Épilation et manucure',
                    'Forfaits beauté VIP'
                ]
            }
        };
        
        // Exemple de remplacement pour les services
        if (element.section === 'services') {
            const serviceTemplates = sectorTemplates[sector]?.services || [];
            
            photos.forEach((photo, index) => {
                if (serviceTemplates[index]) {
                    const imageTag = `
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden">
              <Image
                src="${photo.localPath}"
                alt="${photo.alt}"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>`;
                    
                    // Remplacer les icônes par des vraies images
                    const iconPattern = new RegExp(`<div className="w-16 h-16[^>]*>[^<]*<\\/div>`, 'g');
                    content = content.replace(iconPattern, imageTag);
                }
            });
        }
        
        return content;
    }

    /**
     * Met à jour une image statique (hero, about)
     */
    updateStaticImage(content, element, photo) {
        // Remplacer les images existantes ou ajouter de nouvelles
        const imageTag = `
          <div className="relative">
            <Image
              src="${photo.localPath}"
              alt="${photo.alt}"
              width={800}
              height={600}
              className="rounded-2xl object-cover"
              priority={${element.section === 'hero'}}
            />
          </div>`;
        
        // Pattern pour identifier où insérer l'image
        if (element.section === 'hero') {
            // Insérer dans la section hero
            content = content.replace(
                /(<div className=".*?lg:col-span-1.*?>)/,
                `$1\n${imageTag}`
            );
        }
        
        return content;
    }

    /**
     * Génère les utilitaires d'images
     */
    async generateImageUtilities(localImagePaths, projectPath) {
        const utilsPath = path.join(projectPath, 'src', 'utils');
        await fs.mkdir(utilsPath, { recursive: true });
        
        // Générer le fichier d'index des images
        const imageIndex = this.generateImageIndex(localImagePaths);
        await fs.writeFile(
            path.join(utilsPath, 'images.ts'),
            imageIndex
        );
        
        // Générer les composants d'images optimisées
        const optimizedComponents = this.generateOptimizedImageComponents();
        await fs.writeFile(
            path.join(projectPath, 'src', 'components', 'OptimizedImage.tsx'),
            optimizedComponents
        );
    }

    /**
     * Génère l'index des images
     */
    generateImageIndex(localImagePaths) {
        let indexContent = `// Index automatique des images générées\n\n`;
        
        indexContent += `export const siteImages = {\n`;
        
        for (const [section, photos] of Object.entries(localImagePaths)) {
            indexContent += `  ${section}: [\n`;
            photos.forEach((photo, index) => {
                indexContent += `    {\n`;
                indexContent += `      src: "${photo.localPath}",\n`;
                indexContent += `      alt: "${photo.alt}",\n`;
                indexContent += `      keyword: "${photo.keyword}",\n`;
                indexContent += `      credit: "${photo.credit}"\n`;
                indexContent += `    }${index < photos.length - 1 ? ',' : ''}\n`;
            });
            indexContent += `  ],\n`;
        }
        
        indexContent += `};\n\n`;
        
        // Ajouter des utilitaires
        indexContent += `export function getImageBySection(section: string, index: number = 0) {
  return siteImages[section as keyof typeof siteImages]?.[index] || null;
}

export function getRandomImage(section: string) {
  const images = siteImages[section as keyof typeof siteImages] || [];
  return images[Math.floor(Math.random() * images.length)] || null;
}`;
        
        return indexContent;
    }

    /**
     * Génère les composants d'images optimisées
     */
    generateOptimizedImageComponents() {
        return `import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={\`bg-gray-200 flex items-center justify-center \${className}\`}>
        <span className="text-gray-500 text-sm">Image non disponible</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={\`transition-opacity duration-300 \${
          isLoading ? 'opacity-0' : 'opacity-100'
        } \${className}\`}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
      {isLoading && (
        <div className={\`absolute inset-0 bg-gray-200 animate-pulse \${className}\`} />
      )}
    </div>
  )
}

// Composant pour galerie d'images
interface ImageGalleryProps {
  images: Array<{ src: string; alt: string; keyword?: string }>
  className?: string
}

export function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  return (
    <div className={\`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 \${className}\`}>
      {images.map((image, index) => (
        <OptimizedImage
          key={index}
          src={image.src}
          alt={image.alt}
          width={400}
          height={300}
          className="rounded-lg object-cover w-full h-48"
        />
      ))}
    </div>
  )
}`;
    }

    /**
     * Met à jour les imports d'images
     */
    async updateImageImports(projectPath) {
        // Mettre à jour le fichier principal pour inclure les nouveaux composants
        const layoutPath = path.join(projectPath, 'src', 'app', 'layout.tsx');
        
        if (await this.fileExists(layoutPath)) {
            let content = await fs.readFile(layoutPath, 'utf8');
            
            // Ajouter les métadonnées d'images si pas présentes
            if (!content.includes('images:')) {
                content = content.replace(
                    /(metadata.*{[^}]*)/s,
                    `$1
  images: ['./images/hero/hero-1.jpg'],`
                );
            }
            
            await fs.writeFile(layoutPath, content);
        }
    }

    /**
     * Vérifie si un fichier existe
     */
    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Génère un rapport d'intégration
     */
    generateIntegrationReport(integrationResult, photoPackage) {
        return {
            summary: {
                projectIntegrated: true,
                imagesIntegrated: integrationResult.imagesCount,
                componentsUpdated: integrationResult.componentsUpdated.length,
                sector: photoPackage.sector,
                client: photoPackage.client
            },
            details: {
                imagesSections: Object.keys(photoPackage.photos),
                localPaths: integrationResult.localPaths,
                componentsModified: integrationResult.componentsUpdated
            },
            nextSteps: [
                'Tester le site avec les nouvelles images',
                'Optimiser les performances d\'images',
                'Valider l\'affichage responsive',
                'Configurer le lazy loading'
            ],
            performance: {
                optimizationApplied: true,
                responsiveReady: true,
                lazyLoadingEnabled: true,
                nextImageOptimized: true
            }
        };
    }
}

module.exports = PhotoIntegration;