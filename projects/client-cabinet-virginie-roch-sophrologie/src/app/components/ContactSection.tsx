import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from './ContactForm'

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: '01 42 00 00 00',
      link: 'tel:+33142000000'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@digitalagency.fr',
      link: 'mailto:contact@digitalagency.fr'
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: 'Paris, Île-de-France',
      link: '#'
    },
    {
      icon: Clock,
      label: 'Horaires',
      value: 'Lun-Ven 9h-18h',
      link: '#'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="heading-responsive font-bold text-gray-900 mb-6">
            Contactez-nous
            <span className="block text-primary-600">dès maintenant</span>
          </h2>
          <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
            Prêt à démarrer votre projet ? Contactez notre équipe pour discuter 
            de vos besoins et obtenir un devis personnalisé gratuit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Informations de contact */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Parlons de votre projet
            </h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">
                      {info.label}
                    </div>
                    {info.link.startsWith('#') ? (
                      <div className="text-gray-600">{info.value}</div>
                    ) : (
                      <a
                        href={info.link}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {info.value}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Avantages */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h4 className="font-bold text-gray-900 mb-6">
                Pourquoi nous choisir ?
              </h4>
              <ul className="space-y-4">
                {[
                  'Devis gratuit et sans engagement',
                  'Expertise technique reconnue',
                  'Support client 24/7',
                  'Livraison dans les délais',
                  'Garantie satisfaction'
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <div className="card p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Demande de devis gratuit
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-primary-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Besoin d&apos;une réponse immédiate ?
            </h3>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Notre équipe est disponible pour répondre à vos questions 
              et vous accompagner dans votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+33142000000"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appelez maintenant
              </a>
              <a
                href="mailto:contact@digitalagency.fr"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
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