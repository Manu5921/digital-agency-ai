'use client'

import { useState } from 'react'
import { Menu, X, Phone, Heart } from 'lucide-react'
import { sophrologyContent } from '../../content/sophrologie-content'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Services', href: '#services' },
    { name: 'À propos', href: '#apropos' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 border-b border-therapy-sand/20">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#accueil" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-therapy-calm rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-secondary-900">
                  {sophrologyContent.business.name}
                </span>
                <span className="text-therapy-calm text-xs font-medium hidden lg:block">
                  Psychologue & Sophrologue
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-secondary-700 hover:text-therapy-calm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA et Menu Mobile */}
          <div className="flex items-center space-x-4">
            {/* CTA Desktop */}
            <a
              href={`tel:${sophrologyContent.business.location.phone}`}
              className="hidden lg:flex items-center space-x-2 bg-therapy-calm hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>{sophrologyContent.business.location.phone}</span>
            </a>

            {/* Menu Mobile Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-therapy-sand/20 transition-colors text-secondary-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-800 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-primary-400 font-medium transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href={`tel:${sophrologyContent.business.location.phone}`}
                className="flex items-center space-x-2 bg-therapy-calm hover:bg-primary-600 text-white mx-4 px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>{sophrologyContent.business.location.phone}</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}