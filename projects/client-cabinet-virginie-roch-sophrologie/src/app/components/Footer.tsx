import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Développement Web', href: '#services' },
      { name: 'Design UX/UI', href: '#services' },
      { name: 'SEO & Marketing', href: '#services' },
      { name: 'E-commerce', href: '#services' }
    ],
    company: [
      { name: 'À propos', href: '#apropos' },
      { name: 'Nos réalisations', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Carrières', href: '#' }
    ],
    support: [
      { name: 'Contact', href: '#contact' },
      { name: 'Support', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Documentation', href: '#' }
    ],
    legal: [
      { name: 'Mentions légales', href: '#' },
      { name: 'Politique de confidentialité', href: '#' },
      { name: 'CGV', href: '#' },
      { name: 'RGPD', href: '#' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DA</span>
              </div>
              <span className="font-heading font-bold text-xl">
                Digital Agency
              </span>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-md">
              Votre partenaire digital de confiance pour créer des expériences 
              numériques exceptionnelles. Excellence, innovation et service client 
              au cœur de notre mission.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a 
                  href="tel:+33142000000"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  01 42 00 00 00
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a 
                  href="mailto:contact@digitalagency.fr"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contact@digitalagency.fr
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">Paris, Île-de-France</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Digital Agency. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-gray-400 text-sm flex items-center space-x-2">
                <span>Créé avec</span>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors flex items-center space-x-1"
                >
                  <span>Next.js</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="text-gray-400 text-sm">
                🤖 Digital Agency AI System
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}