import { ArrowRight, Star, Heart, UserCheck } from 'lucide-react'
import { sophrologyContent } from '../../content/sophrologie-content'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="accueil" className="pt-20 lg:pt-24 section-padding bg-gradient-to-br from-therapy-calm/5 via-white to-therapy-sand/20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-therapy-calm/10 text-therapy-calm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-therapy-calm/20">
              <Heart className="w-4 h-4" />
              <span>{sophrologyContent.business.practitioner.title}</span>
            </div>

            {/* Titre H1 SEO Optimisé */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-secondary-900 mb-6 leading-tight">
              {sophrologyContent.hero.title}
              <span className="block text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-therapy-calm to-primary-600 bg-clip-text text-transparent mt-2">
                Psychologue & Sophrologue
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl text-therapy-stone mt-2">Paris</span>
            </h1>

            {/* Description SEO Optimisée */}
            <p className="text-xl text-secondary-700 mb-8 max-w-2xl leading-relaxed font-body">
              {sophrologyContent.hero.subtitle}{' '}
              <strong className="text-therapy-calm">{sophrologyContent.business.practitioner.name}</strong>, psychologue diplômée d'État, 
              vous accompagne avec {sophrologyContent.business.practitioner.experience} pour retrouver équilibre et sérénité.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#contact"
                className="bg-therapy-calm hover:bg-primary-600 text-white px-8 py-4 text-lg rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group inline-flex items-center justify-center"
              >
                {sophrologyContent.hero.cta.primary}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="border-2 border-therapy-calm text-therapy-calm hover:bg-therapy-calm hover:text-white px-8 py-4 text-lg rounded-lg font-semibold transition-all duration-300"
              >
                {sophrologyContent.hero.cta.secondary}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {sophrologyContent.hero.stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-therapy-calm mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="animate-slide-up">
            <div className="relative">
              {/* Photo Premium Sophrologie */}
              <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Cabinet de sophrologie paisible et accueillant - Virginie Roch"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-therapy-calm/40 via-transparent to-transparent"></div>
                
                {/* Informations professionnelles */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-therapy-sand/30 shadow-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-therapy-calm rounded-xl flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-secondary-900">
                          {sophrologyContent.business.practitioner.name}
                        </h3>
                        <p className="text-therapy-calm font-medium text-sm">
                          {sophrologyContent.business.practitioner.experience}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-therapy-warm text-therapy-warm" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments décoratifs thérapeutiques */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-therapy-calm/20 rounded-full blur-lg animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-therapy-warm/20 rounded-full blur-lg animate-pulse-slow delay-1000" />
              
              {/* Badge disponibilité */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary-800 px-3 py-2 rounded-lg text-sm font-medium border border-therapy-calm/30 shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-therapy-success rounded-full animate-pulse" />
                  <span>Consultations disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}