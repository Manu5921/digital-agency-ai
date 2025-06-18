import { ArrowRight, Star, Sparkles, Target } from 'lucide-react'
import { beautyContent } from '../../content/beauty-content'

export default function HeroSection() {
  return (
    <section id="accueil" className="pt-20 lg:pt-24 section-padding bg-gradient-to-br from-pink-950 via-rose-900 to-pink-950">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-pink-500/20 text-pink-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-pink-500/30">
              <Sparkles className="w-4 h-4" />
              <span>{beautyContent.business.owner.title}</span>
            </div>

            {/* Titre H1 SEO Optimisé */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Institut de Beauté Haut de Gamme -{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-600 bg-clip-text text-transparent">
                Révélez Votre Beauté
              </span>{' '}
              Paris 16ème
            </h1>

            {/* Description SEO Optimisée */}
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Soins beauté de luxe à Paris 16ème (Avenue Foch, Passy, Trocadéro). 
              <strong className="text-pink-400">Amélie Dubois</strong>, esthéticienne diplômée d'État, 
              révèle votre beauté naturelle dans un cadre raffiné.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#contact"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group inline-flex items-center justify-center"
              >
                {fitcoachContent.hero.cta.primary}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-4 text-lg rounded-lg font-semibold transition-all duration-300"
              >
                {fitcoachContent.hero.cta.secondary}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {fitcoachContent.hero.stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="animate-slide-up">
            <div className="relative">
              {/* Hero Visual */}
              <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/30">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {fitcoachContent.business.coach.name}
                  </h3>
                  <p className="text-white/80 font-medium">
                    {fitcoachContent.business.coach.experience}
                  </p>
                  <div className="flex justify-center mt-4 space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-400/30 rounded-full blur-lg animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-fitness-success/30 rounded-full blur-lg animate-pulse-slow delay-1000" />
              
              {/* Badge flottant SEO */}
              <div className="absolute top-4 left-4 bg-secondary-950/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium border border-primary-500/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-fitness-success rounded-full animate-pulse" />
                  <span>Paris 16ème - Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}