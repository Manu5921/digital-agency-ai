import { Star, Quote, ArrowRight, TrendingUp } from 'lucide-react'
import { fitcoachContent } from '../../content/fitcoach-content'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête SEO */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-950 mb-6">
            Témoignages Clients
            <span className="block text-primary-500">Transformations Réussies Paris 16ème</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <strong>Perte de poids</strong>, <strong>remise en forme</strong> et <strong>transformation physique</strong> : 
            découvrez les résultats concrets de mes clients avec le <strong>coaching fitness personnalisé</strong> 
            de Sarah Martin, coach sportif Paris 16ème.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {fitcoachContent.testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-primary-500 opacity-60" />
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                "{testimonial.content}"
              </blockquote>

              {/* Résultat Badge */}
              <div className="mb-6">
                <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {testimonial.results}
                </div>
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}{testimonial.name.split(' ')[1]?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-950">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-secondary-950 to-secondary-800 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Résultats Coach Sportif Paris 16ème
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              <strong>95% de clients satisfaits</strong> - <strong>200+ transformations</strong> réussies avec 
              Sarah Martin, personal trainer certifiée STAPS
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {fitcoachContent.hero.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-950 mb-4">
              {fitcoachContent.contact.socialProof.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {fitcoachContent.contact.socialProof.stats.map((statText, index) => (
                <div key={index} className="flex items-center justify-center text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  {statText}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center group"
              >
                {fitcoachContent.contact.cta.primary}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`tel:${fitcoachContent.business.location.phone}`}
                className="border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                {fitcoachContent.business.location.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}