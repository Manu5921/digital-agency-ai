import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { fitcoachContent } from '../../content/fitcoach-content'
import ContactForm from './ContactForm'

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: fitcoachContent.business.location.phone,
      link: `tel:${fitcoachContent.business.location.phone}`
    },
    {
      icon: Mail,
      label: 'Email',
      value: fitcoachContent.business.location.email,
      link: `mailto:${fitcoachContent.business.location.email}`
    },
    {
      icon: MapPin,
      label: 'Studio',
      value: fitcoachContent.business.location.address,
      link: '#'
    },
    {
      icon: Clock,
      label: 'Horaires',
      value: `${fitcoachContent.contact.info.hours.weekdays} (sem) • ${fitcoachContent.contact.info.hours.weekend} (WE)`,
      link: '#'
    }
  ]

  const advantages = [
    'Bilan fitness gratuit et sans engagement',
    'Coach certifiée avec 8 ans d\'expérience',
    'Suivi personnalisé 24/7',
    'Programmes 100% sur mesure',
    'Résultats visibles en 30 jours',
    'Coaching en studio ou en ligne'
  ]

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-950 mb-6">
            {fitcoachContent.contact.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {fitcoachContent.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Informations de contact */}
          <div>
            <h3 className="text-2xl font-bold text-secondary-950 mb-8">
              Parlons de vos objectifs
            </h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-secondary-950 mb-1">
                      {info.label}
                    </div>
                    {info.link.startsWith('#') ? (
                      <div className="text-gray-600">{info.value}</div>
                    ) : (
                      <a
                        href={info.link}
                        className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
                      >
                        {info.value}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Avantages */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <h4 className="font-bold text-secondary-950 mb-6">
                Pourquoi choisir {fitcoachContent.business.name} ?
              </h4>
              <ul className="space-y-4">
                {advantages.map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-fitness-success flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Urgence CTA */}
            <div className="mt-8 bg-secondary-950 rounded-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-semibold">Disponible maintenant</span>
              </div>
              <p className="text-gray-300 mb-4">
                Ne reportez plus votre transformation. Commencez dès aujourd'hui !
              </p>
              <a
                href={`tel:${fitcoachContent.business.location.phone}`}
                className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 group"
              >
                Appeler maintenant
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-secondary-950 mb-6">
                {fitcoachContent.hero.cta.primary}
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-secondary-950 to-secondary-800 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Votre Transformation Commence Aujourd'hui
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Je suis {fitcoachContent.business.coach.name}, votre coach certifiée. 
              Ensemble, nous allons transformer votre corps et votre énergie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${fitcoachContent.business.location.phone}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                {fitcoachContent.contact.cta.secondary}
              </a>
              <a
                href={`mailto:${fitcoachContent.business.location.email}`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-400 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Envoyez un email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}