import { Zap, Shield, Target, Headphones, Code, Palette } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Sites web modernes et performants avec les dernières technologies.',
      features: ['React/Next.js', 'TypeScript', 'API REST']
    },
    {
      icon: Palette,
      title: 'Design UX/UI',
      description: 'Designs attractifs et interfaces utilisateur optimisées.',
      features: ['Figma/Adobe', 'Mobile-first', 'Prototypage']
    },
    {
      icon: Target,
      title: 'SEO & Marketing',
      description: 'Optimisation pour les moteurs de recherche et stratégies digitales.',
      features: ['SEO technique', 'Content marketing', 'Analytics']
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Protection et sécurisation de vos données et applications.',
      features: ['HTTPS/SSL', 'Authentification', 'Sauvegardes']
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimisation des performances et vitesse de chargement.',
      features: ['Core Web Vitals', 'CDN', 'Cache']
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Assistance technique et maintenance continue.',
      features: ['Support réactif', 'Maintenance', 'Évolutions']
    }
  ]

  return (
    <section id="services" className="section-padding section-gradient">
      <div className="container-custom">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="heading-responsive font-bold text-gray-900 mb-6">
            Nos Services
            <span className="block text-primary-600">Professionnels</span>
          </h2>
          <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
            Nous proposons une gamme complète de services digitaux pour répondre 
            à tous vos besoins professionnels avec excellence et innovation.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-hover p-8 group"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Icône */}
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <service.icon className="w-8 h-8 text-primary-600" />
              </div>

              {/* Contenu */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a
                  href="#contact"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:underline transition-all"
                >
                  En savoir plus →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 lg:p-12 card-shadow">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Besoin d&apos;un service personnalisé ?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet et obtenir une solution 
              adaptée à vos besoins spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="btn-primary px-8 py-4"
              >
                Devis gratuit
              </a>
              <a
                href="tel:+33142000000"
                className="btn-outline px-8 py-4"
              >
                01 42 00 00 00
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}