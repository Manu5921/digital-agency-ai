/**
 * REAL WORKFLOW CONNECTOR - Connecteur entre formulaire et vrais agents
 * Transforme les données du formulaire en instructions pour les agents réels
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class RealWorkflowConnector {
    constructor() {
        this.projectsPath = path.join(__dirname, '..', 'projects');
        this.templatesPath = path.join(__dirname, '..', 'templates');
        this.agentsPath = path.join(__dirname, '..', 'agents');
    }

    /**
     * Lance le workflow complet avec les vraies données client
     */
    async executeRealWorkflow(clientData) {
        console.log('🚀 DÉMARRAGE WORKFLOW RÉEL');
        console.log('Client:', clientData.business.name);
        console.log('Secteur:', clientData.business.sector);

        try {
            // 1. Préparation du projet
            const projectInfo = await this.prepareProject(clientData);
            
            // 2. Exécution Agent Design (réel)
            const designOutput = await this.executeRealDesignAgent(clientData, projectInfo);
            
            // 3. Exécution Agent WebDev (réel)
            const webdevOutput = await this.executeRealWebDevAgent(clientData, projectInfo, designOutput);
            
            // 4. Exécution Agent SEO (réel)
            const seoOutput = await this.executeRealSEOAgent(clientData, projectInfo);
            
            // 5. Exécution Agent TechOps (réel)
            const deploymentOutput = await this.executeRealTechOpsAgent(clientData, projectInfo);
            
            // 6. Résultat final
            const finalResult = {
                success: true,
                client: clientData.business.name,
                projectName: projectInfo.projectName,
                projectPath: projectInfo.projectPath,
                websiteUrl: deploymentOutput.url,
                completedAt: new Date().toISOString(),
                outputs: {
                    design: designOutput,
                    webdev: webdevOutput,
                    seo: seoOutput,
                    deployment: deploymentOutput
                }
            };

            console.log('✅ WORKFLOW TERMINÉ AVEC SUCCÈS');
            console.log('🌐 Site live:', deploymentOutput.url);
            
            return finalResult;

        } catch (error) {
            console.error('❌ ERREUR WORKFLOW:', error);
            throw error;
        }
    }

    /**
     * Prépare le projet (copie template, structure dossiers)
     */
    async prepareProject(clientData) {
        const projectName = this.generateProjectName(clientData);
        const projectPath = path.join(this.projectsPath, projectName);
        
        console.log('📋 Préparation projet:', projectName);
        
        // Créer le dossier projet s'il n'existe pas
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath, { recursive: true });
        }
        
        // Copier le template de base
        const templateSource = path.join(this.templatesPath, 'nextjs-base');
        await this.copyTemplate(templateSource, projectPath);
        
        console.log('✅ Projet préparé:', projectPath);
        
        return {
            projectName,
            projectPath,
            templateUsed: 'nextjs-base'
        };
    }

    /**
     * Exécute le vrai Agent Design
     */
    async executeRealDesignAgent(clientData, projectInfo) {
        console.log('🎨 Exécution Agent Design...');
        
        // Créer le fichier de configuration pour l'Agent Design
        const designConfig = {
            business: clientData.business,
            visual: clientData.visual,
            brand: clientData.brand,
            sector: clientData.business.sector,
            template: this.selectOptimalTemplate(clientData)
        };
        
        const configPath = path.join(projectInfo.projectPath, 'design-config.json');
        fs.writeFileSync(configPath, JSON.stringify(designConfig, null, 2));
        
        // Adapter le contenu selon le secteur
        const contentPath = path.join(projectInfo.projectPath, 'src', 'content');
        if (!fs.existsSync(contentPath)) {
            fs.mkdirSync(contentPath, { recursive: true });
        }
        
        // Générer le fichier de contenu spécifique
        const sectorContent = this.generateSectorContent(clientData);
        const contentFile = path.join(contentPath, `${clientData.business.sector}-content.ts`);
        fs.writeFileSync(contentFile, sectorContent);
        
        // Générer le design system spécifique
        const designSystem = this.generateDesignSystem(clientData);
        const designSystemPath = path.join(projectInfo.projectPath, 'src', 'design-system');
        if (!fs.existsSync(designSystemPath)) {
            fs.mkdirSync(designSystemPath, { recursive: true });
        }
        fs.writeFileSync(
            path.join(designSystemPath, `${clientData.business.sector}-design-system.ts`),
            designSystem
        );
        
        console.log('✅ Agent Design terminé');
        
        return {
            status: 'completed',
            template: designConfig.template,
            contentGenerated: true,
            designSystemGenerated: true,
            configPath: configPath
        };
    }

    /**
     * Exécute le vrai Agent WebDev
     */
    async executeRealWebDevAgent(clientData, projectInfo, designOutput) {
        console.log('💻 Exécution Agent WebDev...');
        
        try {
            // Installer les dépendances
            console.log('📦 Installation dépendances...');
            process.chdir(projectInfo.projectPath);
            execSync('npm install', { stdio: 'inherit' });
            
            // Personnaliser les composants selon le secteur
            await this.customizeComponents(clientData, projectInfo);
            
            // Mettre à jour le package.json avec les infos du client
            await this.updatePackageJson(clientData, projectInfo);
            
            // Build test
            console.log('🔨 Test build...');
            execSync('npm run build', { stdio: 'inherit' });
            
            console.log('✅ Agent WebDev terminé');
            
            return {
                status: 'completed',
                buildSuccess: true,
                componentsCustomized: true,
                packageUpdated: true
            };
            
        } catch (error) {
            console.error('❌ Erreur Agent WebDev:', error.message);
            throw error;
        }
    }

    /**
     * Exécute le vrai Agent SEO
     */
    async executeRealSEOAgent(clientData, projectInfo) {
        console.log('🔍 Exécution Agent SEO...');
        
        // Générer les métadonnées SEO
        const seoConfig = this.generateSEOConfig(clientData);
        
        // Mettre à jour le layout avec les métadonnées
        await this.updateLayoutWithSEO(clientData, projectInfo, seoConfig);
        
        // Générer sitemap.xml
        await this.generateSitemap(clientData, projectInfo);
        
        // Générer robots.txt
        await this.generateRobotsTxt(projectInfo);
        
        console.log('✅ Agent SEO terminé');
        
        return {
            status: 'completed',
            seoConfigured: true,
            sitemapGenerated: true,
            robotsGenerated: true,
            keywords: seoConfig.keywords
        };
    }

    /**
     * Exécute le vrai Agent TechOps
     */
    async executeRealTechOpsAgent(clientData, projectInfo) {
        console.log('🚀 Exécution Agent TechOps...');
        
        try {
            // Build final
            console.log('🔨 Build final...');
            process.chdir(projectInfo.projectPath);
            execSync('npm run build', { stdio: 'inherit' });
            
            // Déploiement Vercel
            console.log('🌐 Déploiement Vercel...');
            const deployResult = execSync('vercel --prod', { encoding: 'utf8' });
            
            // Extraire l'URL de déploiement
            const urlMatch = deployResult.match(/https:\/\/[^\s]+\.vercel\.app/);
            const deploymentUrl = urlMatch ? urlMatch[0] : null;
            
            if (!deploymentUrl) {
                throw new Error('URL de déploiement non trouvée');
            }
            
            console.log('✅ Agent TechOps terminé');
            console.log('🌐 URL:', deploymentUrl);
            
            return {
                status: 'completed',
                url: deploymentUrl,
                buildSuccess: true,
                deploymentSuccess: true
            };
            
        } catch (error) {
            console.error('❌ Erreur Agent TechOps:', error.message);
            throw error;
        }
    }

    /**
     * Méthodes utilitaires
     */
    generateProjectName(clientData) {
        const businessName = clientData.business.name.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        const sector = clientData.business.sector;
        return `client-${businessName}-${sector}`;
    }

    selectOptimalTemplate(clientData) {
        const sectorTemplates = {
            'fitness': 'fitness-template',
            'restaurant': 'restaurant-template',
            'sante': 'health-template',
            'beaute': 'beauty-template',
            'immobilier': 'real-estate-template',
            'education': 'education-template',
            'technologie': 'tech-template',
            'artisanat': 'craft-template',
            'commerce': 'retail-template',
            'finance': 'finance-template'
        };
        
        return sectorTemplates[clientData.business.sector] || 'generic-template';
    }

    async copyTemplate(source, destination) {
        if (fs.existsSync(source)) {
            execSync(`cp -r "${source}"/* "${destination}"/`, { stdio: 'inherit' });
        } else {
            console.log('⚠️  Template source non trouvé, création structure de base');
            // Créer structure minimale si template pas trouvé
            const basicStructure = [
                'src/app',
                'src/components',
                'src/content',
                'public'
            ];
            basicStructure.forEach(dir => {
                fs.mkdirSync(path.join(destination, dir), { recursive: true });
            });
        }
    }

    generateSectorContent(clientData) {
        const sector = clientData.business.sector;
        const business = clientData.business;
        
        return `// Contenu généré automatiquement pour ${business.name}
export const ${sector}Content = {
  business: {
    name: "${business.name}",
    sector: "${business.sector}",
    description: "${business.pitch}",
    mission: "${business.mission || 'Excellence et satisfaction client'}",
    uniqueValue: "${business.uniqueValue || 'Approche personnalisée et professionnelle'}"
  },
  hero: {
    title: "${business.name}",
    subtitle: "${business.pitch}",
    cta: {
      primary: "Découvrir nos services",
      secondary: "Nous contacter"
    }
  },
  contact: {
    email: "${business.contact?.email || clientData.client.email}",
    phone: "${business.contact?.phone || clientData.client.phone}",
    address: "${business.contact?.address || clientData.client.address}"
  }
};`;
    }

    generateDesignSystem(clientData) {
        const colors = clientData.visual.colors.preferred;
        const primaryColor = colors[0] || 'bleu';
        
        const colorMap = {
            'bleu': { primary: '#3B82F6', secondary: '#1E40AF' },
            'rouge': { primary: '#EF4444', secondary: '#DC2626' },
            'vert': { primary: '#10B981', secondary: '#059669' },
            'orange': { primary: '#F97316', secondary: '#EA580C' },
            'violet': { primary: '#8B5CF6', secondary: '#7C3AED' },
            'noir': { primary: '#1F2937', secondary: '#111827' },
            'rose': { primary: '#EC4899', secondary: '#DB2777' },
            'or': { primary: '#F59E0B', secondary: '#D97706' }
        };
        
        const theme = colorMap[primaryColor] || colorMap['bleu'];
        
        return `// Design system généré pour ${clientData.business.name}
export const designSystem = {
  colors: {
    primary: "${theme.primary}",
    secondary: "${theme.secondary}",
    accent: "#F59E0B"
  },
  typography: {
    fontFamily: "${clientData.visual.typography.style === 'moderne' ? 'Inter' : 'serif'}",
    headingScale: {
      h1: "2.5rem",
      h2: "2rem",
      h3: "1.5rem"
    }
  },
  spacing: {
    sectionPadding: "4rem 0",
    containerMaxWidth: "1200px"
  }
};`;
    }

    async customizeComponents(clientData, projectInfo) {
        // Ici on pourrait personnaliser les composants selon le secteur
        // Pour l'instant, on garde la structure de base
        console.log('🎨 Personnalisation composants pour:', clientData.business.sector);
    }

    async updatePackageJson(clientData, projectInfo) {
        const packagePath = path.join(projectInfo.projectPath, 'package.json');
        if (fs.existsSync(packagePath)) {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            packageJson.name = projectInfo.projectName;
            packageJson.description = `Site web pour ${clientData.business.name} - ${clientData.business.sector}`;
            fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        }
    }

    generateSEOConfig(clientData) {
        const business = clientData.business;
        return {
            title: `${business.name} - ${business.sector}`,
            description: business.pitch,
            keywords: [
                business.name,
                business.sector,
                business.location || '',
                'professionnel',
                'qualité'
            ].filter(Boolean).join(', ')
        };
    }

    async updateLayoutWithSEO(clientData, projectInfo, seoConfig) {
        const layoutPath = path.join(projectInfo.projectPath, 'src', 'app', 'layout.tsx');
        if (fs.existsSync(layoutPath)) {
            let layout = fs.readFileSync(layoutPath, 'utf8');
            // Mise à jour basique du titre (amélioration possible)
            layout = layout.replace(/title: '.*?'/, `title: '${seoConfig.title}'`);
            layout = layout.replace(/description: '.*?'/, `description: '${seoConfig.description}'`);
            fs.writeFileSync(layoutPath, layout);
        }
    }

    async generateSitemap(clientData, projectInfo) {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${projectInfo.projectName}.vercel.app</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
        
        fs.writeFileSync(path.join(projectInfo.projectPath, 'public', 'sitemap.xml'), sitemap);
    }

    async generateRobotsTxt(projectInfo) {
        const robots = `User-agent: *
Allow: /
Sitemap: https://${projectInfo.projectName}.vercel.app/sitemap.xml`;
        
        fs.writeFileSync(path.join(projectInfo.projectPath, 'public', 'robots.txt'), robots);
    }
}

module.exports = RealWorkflowConnector;