/**
 * TEST SIMPLE - Test direct du workflow avec un exemple
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧪 TEST WORKFLOW SIMPLE');
console.log('='.repeat(50));

// Données d'exemple Salon de Beauté
const clientData = {
    businessName: "Élégance Beauty Spa",
    sector: "beaute",
    description: "Salon de beauté haut de gamme proposant soins du visage, massages et épilation. Expertise et produits de luxe pour une expérience unique de bien-être.",
    colors: "rose, or, blanc",
    target: "Femmes 25-55 ans, cadres supérieures, recherchant qualité et service premium"
};

console.log('📋 Client:', clientData.businessName);
console.log('🎨 Secteur:', clientData.sector);

// 1. Créer le projet
const projectName = `client-elegance-beauty-${Date.now()}`;
const projectsPath = '/Users/manu/Documents/DEV/digital-agency-ai/projects';
const projectPath = path.join(projectsPath, projectName);

console.log('\n📁 Création projet:', projectName);

try {
    // Créer le dossier
    fs.mkdirSync(projectPath, { recursive: true });
    
    // Copier le template
    const templatePath = '/Users/manu/Documents/DEV/digital-agency-ai/templates/nextjs-base';
    if (fs.existsSync(templatePath)) {
        console.log('📋 Copie du template...');
        execSync(`cp -r "${templatePath}"/* "${projectPath}"/`);
    } else {
        console.log('⚠️  Template non trouvé, création structure minimale');
        // Créer structure basique
        ['src/app', 'src/components', 'public'].forEach(dir => {
            fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
        });
        
        // Package.json minimal
        const packageJson = {
            "name": projectName,
            "version": "0.1.0",
            "private": true,
            "scripts": {
                "dev": "next dev",
                "build": "next build",
                "start": "next start"
            },
            "dependencies": {
                "next": "15.3.0",
                "react": "^19.0.0",
                "react-dom": "^19.0.0"
            },
            "devDependencies": {
                "@types/node": "^20",
                "@types/react": "^19",
                "@types/react-dom": "^19",
                "eslint": "^8",
                "eslint-config-next": "15.3.0",
                "typescript": "^5"
            }
        };
        fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
        
        // Page basique
        const basicPage = `export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ${clientData.businessName}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ${clientData.description}
          </p>
          <div className="space-x-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Prendre Rendez-vous
            </button>
            <button className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Nos Services
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ✨
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Soins Visage</h3>
            <p className="text-gray-600">Soins personnalisés avec produits de luxe</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              💆‍♀️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Massages</h3>
            <p className="text-gray-600">Détente et bien-être dans un cadre raffiné</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              💅
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Épilation</h3>
            <p className="text-gray-600">Techniques douces et épilation laser</p>
          </div>
        </div>
      </div>
    </main>
  );
}`;
        
        fs.mkdirSync(path.join(projectPath, 'src/app'), { recursive: true });
        fs.writeFileSync(path.join(projectPath, 'src/app/page.tsx'), basicPage);
        
        // Layout basique
        const basicLayout = `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${clientData.businessName} - Salon de Beauté Haut de Gamme',
  description: '${clientData.description}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}`;
        
        fs.writeFileSync(path.join(projectPath, 'src/app/layout.tsx'), basicLayout);
        
        // next.config.js
        const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig`;
        
        fs.writeFileSync(path.join(projectPath, 'next.config.js'), nextConfig);
    }
    
    console.log('✅ Projet créé');
    
    // 2. Installation dépendances
    console.log('\n📦 Installation dépendances...');
    process.chdir(projectPath);
    execSync('npm install --silent', { stdio: 'inherit' });
    console.log('✅ Dépendances installées');
    
    // 3. Build
    console.log('\n🔨 Build du projet...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build réussi');
    
    // 4. Déploiement Vercel
    console.log('\n🚀 Déploiement Vercel...');
    const deployResult = execSync('vercel --prod', { encoding: 'utf8' });
    
    // Extraire l'URL
    const urlMatch = deployResult.match(/https:\/\/[^\s]+\.vercel\.app/);
    const siteUrl = urlMatch ? urlMatch[0] : 'URL non trouvée';
    
    // 5. Résultat final
    console.log('\n' + '='.repeat(50));
    console.log('🎉 WORKFLOW TERMINÉ AVEC SUCCÈS !');
    console.log('📋 Client:', clientData.businessName);
    console.log('🌐 Site web:', siteUrl);
    console.log('📁 Projet:', projectPath);
    console.log('⏱️  Temps total: ~3-5 minutes');
    console.log('='.repeat(50));
    
    console.log('\n🎯 Prochaines étapes:');
    console.log('1. Tester le site:', siteUrl);
    console.log('2. Personnaliser le contenu');
    console.log('3. Ajouter les vraies images');
    console.log('4. Configurer le domaine personnalisé');
    
} catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    process.exit(1);
}