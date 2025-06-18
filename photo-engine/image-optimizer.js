/**
 * IMAGE OPTIMIZER - Optimisation avancée d'images pour le web
 * Compression, formats modernes, responsive, lazy loading
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

class ImageOptimizer {
    constructor() {
        this.formats = ['webp', 'avif', 'jpeg'];
        this.qualities = {
            webp: 85,
            avif: 80,
            jpeg: 90
        };
        
        this.breakpoints = {
            mobile: 400,
            tablet: 800,
            desktop: 1200,
            large: 1600
        };
    }

    /**
     * Optimise une image avec tous les formats et tailles
     */
    async optimizeImage(inputPath, outputDir, filename) {
        console.log(`🖼️  Optimisation: ${filename}`);
        
        try {
            // Créer le dossier de sortie
            await fs.mkdir(outputDir, { recursive: true });
            
            // Charger l'image source
            const image = sharp(inputPath);
            const metadata = await image.metadata();
            
            const results = {
                original: {
                    width: metadata.width,
                    height: metadata.height,
                    format: metadata.format,
                    size: (await fs.stat(inputPath)).size
                },
                optimized: {}
            };
            
            // Générer toutes les variantes
            for (const format of this.formats) {
                results.optimized[format] = {};
                
                for (const [breakpoint, width] of Object.entries(this.breakpoints)) {
                    if (width <= metadata.width) {
                        const outputPath = path.join(outputDir, `${filename}-${breakpoint}.${format}`);
                        
                        await this.createVariant(image, outputPath, format, width);
                        
                        const stats = await fs.stat(outputPath);
                        results.optimized[format][breakpoint] = {
                            path: outputPath,
                            width: width,
                            size: stats.size,
                            compression: Math.round((1 - stats.size / results.original.size) * 100)
                        };
                    }
                }
            }
            
            console.log(`✅ ${filename} optimisé`);
            return results;
            
        } catch (error) {
            console.error(`❌ Erreur optimisation ${filename}:`, error.message);
            throw error;
        }
    }

    /**
     * Crée une variante d'image optimisée
     */
    async createVariant(image, outputPath, format, width) {
        let pipeline = image.clone().resize(width, null, {
            withoutEnlargement: true,
            fastShrinkOnLoad: true
        });
        
        switch (format) {
            case 'webp':
                pipeline = pipeline.webp({ 
                    quality: this.qualities.webp,
                    effort: 4
                });
                break;
                
            case 'avif':
                pipeline = pipeline.avif({ 
                    quality: this.qualities.avif,
                    effort: 4
                });
                break;
                
            case 'jpeg':
                pipeline = pipeline.jpeg({ 
                    quality: this.qualities.jpeg,
                    progressive: true,
                    mozjpeg: true
                });
                break;
        }
        
        await pipeline.toFile(outputPath);
    }

    /**
     * Génère le code HTML responsive pour une image
     */
    generateResponsiveHTML(imageResults, alt, className = '') {
        if (!imageResults.optimized.webp) {
            return `<img src="${imageResults.original.path}" alt="${alt}" class="${className}" loading="lazy">`;
        }
        
        const webpSources = Object.entries(imageResults.optimized.webp)
            .map(([breakpoint, data]) => `${data.path} ${data.width}w`)
            .join(', ');
            
        const jpegSources = Object.entries(imageResults.optimized.jpeg || {})
            .map(([breakpoint, data]) => `${data.path} ${data.width}w`)
            .join(', ');
        
        return `
<picture>
  ${imageResults.optimized.avif ? `
  <source 
    srcset="${Object.entries(imageResults.optimized.avif).map(([bp, data]) => `${data.path} ${data.width}w`).join(', ')}"
    type="image/avif"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">
  ` : ''}
  <source 
    srcset="${webpSources}"
    type="image/webp"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">
  ${jpegSources ? `
  <source 
    srcset="${jpegSources}"
    type="image/jpeg"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">
  ` : ''}
  <img 
    src="${Object.values(imageResults.optimized.webp)[0]?.path || imageResults.original.path}"
    alt="${alt}"
    class="${className}"
    loading="lazy"
    decoding="async">
</picture>`.trim();
    }

    /**
     * Génère le CSS pour les images responsive
     */
    generateResponsiveCSS() {
        return `
/* Images responsive optimisées */
img {
  max-width: 100%;
  height: auto;
}

picture {
  display: block;
}

picture img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Classes utilitaires */
.img-cover {
  object-fit: cover;
}

.img-contain {
  object-fit: contain;
}

.img-rounded {
  border-radius: 0.5rem;
}

.img-circle {
  border-radius: 50%;
}

/* Lazy loading amélioré */
img[loading="lazy"] {
  opacity: 0;
  transition: opacity 0.3s ease;
}

img[loading="lazy"].loaded {
  opacity: 1;
}

/* Placeholder pendant le chargement */
.img-placeholder {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive breakpoints */
@media (max-width: 640px) {
  .hero-image {
    height: 300px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .hero-image {
    height: 400px;
  }
}

@media (min-width: 1025px) {
  .hero-image {
    height: 500px;
  }
}`;
    }

    /**
     * Optimise un lot d'images
     */
    async optimizeBatch(imagePaths, outputDir) {
        console.log(`📸 Optimisation batch: ${imagePaths.length} images`);
        
        const results = {};
        const promises = imagePaths.map(async (imagePath) => {
            const filename = path.basename(imagePath, path.extname(imagePath));
            try {
                results[filename] = await this.optimizeImage(imagePath, outputDir, filename);
            } catch (error) {
                console.error(`❌ Erreur ${filename}:`, error.message);
                results[filename] = { error: error.message };
            }
        });
        
        await Promise.all(promises);
        
        console.log('✅ Batch terminé');
        return results;
    }

    /**
     * Génère un rapport d'optimisation
     */
    generateOptimizationReport(results) {
        const report = {
            summary: {
                totalImages: Object.keys(results).length,
                totalOriginalSize: 0,
                totalOptimizedSize: 0,
                averageCompression: 0,
                formatsGenerated: new Set()
            },
            details: [],
            recommendations: []
        };
        
        for (const [filename, result] of Object.entries(results)) {
            if (result.error) {
                report.details.push({
                    filename,
                    status: 'error',
                    error: result.error
                });
                continue;
            }
            
            const originalSize = result.original.size;
            report.summary.totalOriginalSize += originalSize;
            
            let bestCompression = 0;
            let totalOptimizedSize = 0;
            
            Object.entries(result.optimized).forEach(([format, variants]) => {
                report.summary.formatsGenerated.add(format);
                Object.entries(variants).forEach(([breakpoint, data]) => {
                    totalOptimizedSize += data.size;
                    bestCompression = Math.max(bestCompression, data.compression);
                });
            });
            
            report.summary.totalOptimizedSize += totalOptimizedSize / Object.keys(result.optimized).length;
            
            report.details.push({
                filename,
                status: 'optimized',
                originalSize: originalSize,
                compression: bestCompression,
                formatsGenerated: Object.keys(result.optimized)
            });
        }
        
        report.summary.averageCompression = Math.round(
            (1 - report.summary.totalOptimizedSize / report.summary.totalOriginalSize) * 100
        );
        
        report.summary.formatsGenerated = Array.from(report.summary.formatsGenerated);
        
        // Générer des recommandations
        if (report.summary.averageCompression < 30) {
            report.recommendations.push('Considérer une compression plus agressive pour de meilleures performances');
        }
        
        if (!report.summary.formatsGenerated.includes('webp')) {
            report.recommendations.push('Ajouter le format WebP pour une meilleure compression');
        }
        
        if (!report.summary.formatsGenerated.includes('avif')) {
            report.recommendations.push('Considérer le format AVIF pour une compression optimale');
        }
        
        return report;
    }

    /**
     * Génère le JavaScript pour lazy loading avancé
     */
    generateLazyLoadingScript() {
        return `
// Lazy loading avancé avec Intersection Observer
class AdvancedLazyLoader {
    constructor() {
        this.imageObserver = null;
        this.config = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, this.config);

            this.observeImages();
        } else {
            // Fallback pour les anciens navigateurs
            this.loadAllImages();
        }
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        // Ajouter un placeholder pendant le chargement
        img.classList.add('img-placeholder');
        
        img.addEventListener('load', () => {
            img.classList.remove('img-placeholder');
            img.classList.add('loaded');
        });

        img.addEventListener('error', () => {
            img.classList.remove('img-placeholder');
            console.warn('Erreur chargement image:', img.src);
        });
    }

    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => this.loadImage(img));
    }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedLazyLoader();
});

// Utilitaire pour précharger les images critiques
function preloadCriticalImages() {
    const criticalImages = [
        // Ajouter ici les URLs des images critiques (hero, above fold)
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Lancer le préchargement
preloadCriticalImages();`;
    }
}

module.exports = ImageOptimizer;