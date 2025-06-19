'use client'

import Image from 'next/image'
import { Briefcase, Home, Building2, Scale, FileText, Gavel } from 'lucide-react'
import { siteContent } from '@/data/siteContent'

export default function ServicesSection() {
  const services = [
    {
      icon: Briefcase,
      title: 'Droit des Affaires',
      description: 'Conseil et accompagnement juridique pour les entreprises : création, contrats commerciaux, restructuration, litiges commerciaux.',
      image: siteContent.services[0].image,
      imageAlt: siteContent.services[0].imageAlt,
      features: siteContent.services[0].features
    },
    {
      icon: Home,
      title: 'Droit de la Famille',
      description: 'Protection de vos intérêts familiaux : divorce, garde d\'enfants, pension alimentaire, succession, adoption.',
      image: siteContent.services[1].image,
      imageAlt: siteContent.services[1].imageAlt,
      features: siteContent.services[1].features
    },
    {
      icon: Building2,
      title: 'Droit Immobilier',
      description: 'Expertise complète en droit immobilier : vente, achat, baux commerciaux, copropriété, litiges immobiliers.',
      image: siteContent.services[2].image,
      imageAlt: siteContent.services[2].imageAlt,
      features: siteContent.services[2].features
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Domaines d&apos;Expertise
            <span className="block text-yellow-600 text-3xl lg:text-4xl mt-2">Juridique</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expertise reconnue dans tous les domaines du droit pour vous offrir 
            des solutions juridiques complètes et personnalisées.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image premium - Photo Engine 3.0 */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Icon overlay */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-slate-800" />
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <Scale className="w-4 h-4 text-yellow-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action */}
                <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Consultation Gratuite
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section expertise supplémentaire */}
        <div className="bg-slate-800 rounded-3xl p-8 lg:p-12 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Une Expertise Juridique d&apos;Excellence
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Plus de 20 ans d&apos;expérience au service de vos droits. 
              Cabinet d&apos;avocat reconnu pour son professionnalisme et ses résultats exceptionnels.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteContent.about.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Prendre Rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}