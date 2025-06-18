import { Check, ArrowRight } from 'lucide-react'
import { fitcoachContent } from '../../content/fitcoach-content'

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête de section SEO */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-950 mb-6">
            Services de Coaching Fitness
            <span className="block text-primary-500">Paris 16ème - Passy & Trocadéro</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <strong>Coach sportif personnalisé</strong> et <strong>plans nutrition</strong> pour professionnels actifs. 
            Perte de poids, remise en forme et transformation physique garanties.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {fitcoachContent.services.map((service, index) => (
            <div
              key={service.title}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 ${
                service.popular 
                  ? 'border-primary-500 transform scale-105' 
                  : 'border-gray-100 hover:border-primary-200'
              } group`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Badge populaire */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Le plus populaire
                  </div>
                </div>
              )}

              {/* Icône et titre */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-secondary-950 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="text-primary-600 font-bold text-lg">
                  {service.price}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 text-fitness-success mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="text-center">
                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 group-hover:scale-105 ${
                    service.popular
                      ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-primary-500 text-gray-700 hover:text-white'
                  }`}
                >
                  Réserver maintenant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Section spécialisations */}
        <div className="bg-secondary-950/5 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-950 mb-4">
              Sarah Martin - Personal Trainer Certifiée STAPS
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              <strong>8 ans d'expérience</strong> en coaching fitness & nutrition. 
              Spécialiste transformation physique femmes et professionnels Paris 16ème.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fitcoachContent.business.coach.specializations.map((specialization, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-secondary-950 mb-2">{specialization}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-secondary-950 to-secondary-800 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              {fitcoachContent.contact.title}
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {fitcoachContent.contact.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
              >
                {fitcoachContent.contact.cta.primary}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`tel:${fitcoachContent.business.location.phone}`}
                className="border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                {fitcoachContent.contact.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}