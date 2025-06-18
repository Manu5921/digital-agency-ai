import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="accueil" className="pt-20 lg:pt-24 section-padding hero-pattern">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="relative lg:col-span-1">
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/hero/therapy-office.jpg"
                alt="Cabinet de sophrologie paisible"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
            </div>
          </div>
          {/* Contenu */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>Service Premium Digital</span>
            </div>

            {/* Titre */}
            <h1 className="heading-responsive font-bold text-gray-900 mb-6">
              Votre{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Solution Digitale
              </span>{' '}
              Professionnelle
            </h1>

            {/* Description */}
            <p className="text-responsive text-gray-600 mb-8 max-w-2xl">
              Découvrez notre expertise pour transformer votre présence en ligne. 
              Solutions personnalisées, technologie de pointe et service client exceptionnel.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#contact"
                className="btn-primary px-8 py-4 text-lg group"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="btn-outline px-8 py-4 text-lg"
              >
                Nos services
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span>+50 clients satisfaits</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5</span>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="animate-slide-up">
            <div className="relative">
              {/* Placeholder pour image hero */}
              <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">DA</span>
                  </div>
                  <p className="text-gray-600 font-medium">Image Hero à personnaliser</p>
                </div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500 rounded-full opacity-20 animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-500 rounded-full opacity-20 animate-pulse-slow delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}