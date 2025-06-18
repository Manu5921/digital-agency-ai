import { Mail, Phone, MapPin, Dumbbell, Award, Zap } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const certifications = [
    'BPJEPS AGFF',
    'Nutrition Sportive',
    'Pilates Certifiée'
  ]

  const services = [
    { name: 'Coaching Personnel', href: '#services' },
    { name: 'Nutrition', href: '#services' },
    { name: 'Coaching Online', href: '#services' },
    { name: 'Préparation Physique', href: '#services' }
  ]

  const company = [
    { name: 'À propos de Sarah', href: '#coach' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Témoignages', href: '#transformations' },
    { name: 'Planning', href: '#contact' }
  ]

  const legal = [
    { name: 'Mentions légales', href: '#' },
    { name: 'Politique de confidentialité', href: '#' },
    { name: 'CGV', href: '#' }
  ]

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xl block">
                  FitCoach Pro
                </span>
                <span className="text-orange-400 text-sm">
                  by Sarah Martin
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-md">
              <strong>Coach sportif certifiée</strong> à Paris 16ème (Passy, Trocadéro, Auteuil). 
              <strong>Coaching fitness</strong> et <strong>nutrition personnalisé</strong> pour 
              <strong>perte de poids</strong> et <strong>transformation physique</strong> garanties.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <a 
                  href="tel:+33145678910"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +33 1 45 67 89 10
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <a 
                  href="mailto:contact@fitcoach-pro.fr"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contact@fitcoach-pro.fr
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-gray-300">45 Avenue de la Grande Armée, 75116 Paris</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-orange-400" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <span 
                    key={index}
                    className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm border border-orange-500/30"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">FitCoach Pro</h3>
            <ul className="space-y-3 mb-8">
              {company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Horaires */}
            <div className="mb-8">
              <h4 className="font-semibold mb-3 text-orange-400">Horaires</h4>
              <div className="text-gray-300 text-sm space-y-1">
                <div>Lun-Ven: 6h-21h</div>
                <div>Samedi: 8h-16h</div>
                <div>Dimanche: Sur RDV</div>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                {legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} FitCoach Pro - Sarah Martin. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-gray-400 text-sm flex items-center space-x-2">
                <span>Zones:</span>
                <span className="text-orange-400">
                  Paris 16ème • Passy • Trocadéro • Auteuil
                </span>
              </div>
              
              <div className="text-gray-400 text-sm">
                Powered by Digital Agency AI
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}