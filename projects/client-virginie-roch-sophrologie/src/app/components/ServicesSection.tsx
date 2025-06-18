import { Check, ArrowRight, Heart, Brain } from 'lucide-react'
import { sophrologyContent } from '../../content/sophrologie-content'
import Image from 'next/image'

// Photos premium pour chaque service
const getServiceImage = (index: number) => {
  const serviceImages = [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Sophrologie - meditation
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Psychothérapie - therapy session
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // TCC - professional consultation
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Développement personnel - peaceful nature
  ];
  return serviceImages[index] || serviceImages[0];
}

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête de section SEO */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
            Services de Sophrologie & Psychothérapie
            <span className="block text-therapy-calm">Cabinet Virginie Roch - Paris</span>
          </h2>
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto font-body leading-relaxed">
            <strong>Accompagnement psychologique personnalisé</strong> et <strong>techniques de sophrologie</strong> pour retrouver équilibre intérieur. 
            Gestion du stress, anxiété et développement personnel avec {sophrologyContent.business.practitioner.experience}.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sophrologyContent.services.map((service, index) => (
            <div
              key={service.title}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 ${
                service.popular 
                  ? 'border-therapy-calm transform scale-105 bg-gradient-to-br from-therapy-sand/10 to-white' 
                  : 'border-therapy-sand/30 hover:border-therapy-calm/50'
              } group`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Badge populaire */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-therapy-calm text-white px-4 py-2 rounded-full text-sm font-bold">
                    Le plus demandé
                  </div>
                </div>
              )}

              {/* Icône et titre */}
              <div className="text-center mb-6">
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={getServiceImage(index)}
                    alt={`Service ${service.title} - Cabinet Virginie Roch`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-therapy-calm/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 text-4xl bg-white/90 p-2 rounded-lg">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-secondary-600 mb-4 font-body leading-relaxed">
                  {service.description}
                </p>
                <div className="text-therapy-calm font-bold text-lg">
                  {service.price}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 text-therapy-success mr-3 flex-shrink-0" />
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
                      ? 'bg-therapy-calm hover:bg-primary-600 text-white shadow-lg'
                      : 'bg-therapy-sand/30 hover:bg-therapy-calm text-secondary-700 hover:text-white'
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
        <div className="bg-gradient-to-br from-therapy-sand/20 via-white to-therapy-calm/5 rounded-2xl p-8 lg:p-12 mb-16 border border-therapy-sand/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-secondary-900 mb-4">
              {sophrologyContent.business.practitioner.name} - {sophrologyContent.business.practitioner.title}
            </h3>
            <p className="text-secondary-600 max-w-2xl mx-auto font-body leading-relaxed">
              <strong>{sophrologyContent.business.practitioner.experience}</strong> en psychologie et sophrologie. 
              Spécialiste accompagnement personnalisé et thérapies comportementales (TCC).
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sophrologyContent.business.practitioner.specializations.map((specialization, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-therapy-sand/20">
                <div className="w-12 h-12 bg-therapy-calm/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 ? <Heart className="w-6 h-6 text-therapy-calm" /> : 
                   index === 1 ? <Brain className="w-6 h-6 text-therapy-calm" /> :
                   <Check className="w-6 h-6 text-therapy-calm" />}
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2 text-sm font-body">{specialization}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-therapy-calm to-primary-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
              {sophrologyContent.contact.title}
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto font-body leading-relaxed">
              {sophrologyContent.contact.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-therapy-calm hover:bg-therapy-sand hover:text-secondary-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
              >
                {sophrologyContent.contact.cta.primary}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`tel:${sophrologyContent.business.location.phone}`}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-therapy-calm px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                {sophrologyContent.contact.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}