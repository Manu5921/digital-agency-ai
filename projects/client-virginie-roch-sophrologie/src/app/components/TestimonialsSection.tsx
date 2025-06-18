import { Star, Quote, ArrowRight, TrendingUp } from 'lucide-react'
import { sophrologyContent } from '../../content/sophrologie-content'
import Image from 'next/image'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête SEO */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
            Témoignages Clients
            <span className="block text-therapy-calm">Accompagnements Réussis</span>
          </h2>
          <p className="text-xl text-secondary-700 max-w-3xl mx-auto font-body leading-relaxed">
            <strong>Gestion du stress</strong>, <strong>équilibre retrouvé</strong> et <strong>développement personnel</strong> : 
            découvrez les transformations de mes patients avec l'<strong>accompagnement sophrologie & psychothérapie</strong> 
            de Virginie Roch, psychologue diplômée.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sophrologyContent.testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-gradient-to-br from-therapy-sand/10 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-therapy-sand/20"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-therapy-calm/60" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-therapy-warm text-therapy-warm" />
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-secondary-700 mb-6 font-body leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Results Badge */}
              <div className="bg-therapy-calm/10 text-therapy-calm px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {testimonial.results}
              </div>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-therapy-sand/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-therapy-calm font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-secondary-900 font-heading">
                    {testimonial.name}
                  </div>
                  <div className="text-secondary-600 text-sm font-body">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Hero */}
        <div className="bg-gradient-to-br from-therapy-calm/5 to-therapy-sand/10 rounded-2xl p-8 lg:p-12 mb-16 border border-therapy-sand/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-secondary-900 mb-4">
              Plus de 15 ans d'accompagnement thérapeutique
            </h3>
            <p className="text-secondary-600 max-w-2xl mx-auto font-body leading-relaxed">
              Virginie Roch, psychologue diplômée d'État spécialisée en TCC
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {sophrologyContent.hero.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-therapy-calm mb-2">{stat.number}</div>
                <div className="text-secondary-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="bg-gradient-to-r from-therapy-calm to-primary-600 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
              {sophrologyContent.contact.socialProof.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {sophrologyContent.contact.socialProof.stats.map((statText, index) => (
                <div key={index} className="flex items-center justify-center text-white/90 font-medium font-body">
                  <div className="w-2 h-2 bg-white/70 rounded-full mr-3"></div>
                  {statText}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-therapy-calm hover:bg-therapy-sand hover:text-secondary-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center group"
              >
                {sophrologyContent.contact.cta.primary}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`tel:${sophrologyContent.business.location.phone}`}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-therapy-calm px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
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