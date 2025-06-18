import { Star, Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'Directrice Marketing',
      company: 'TechStart',
      content: 'Une équipe exceptionnelle qui a transformé notre présence en ligne. Le site web livré dépasse nos attentes en termes de design et de performance.',
      rating: 5,
      avatar: 'MD'
    },
    {
      id: 2,
      name: 'Pierre Martin',
      role: 'CEO',
      company: 'InnovaCorp',
      content: 'Professionnalisme, réactivité et expertise technique au rendez-vous. Je recommande vivement Digital Agency pour tous vos projets digitaux.',
      rating: 5,
      avatar: 'PM'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      role: 'Responsable E-commerce',
      company: 'FashionPlus',
      content: 'Grâce à leur expertise, notre boutique en ligne a vu ses ventes augmenter de 200%. Un investissement qui s\'est révélé très rentable.',
      rating: 5,
      avatar: 'SB'
    },
    {
      id: 4,
      name: 'Thomas Leroy',
      role: 'Fondateur',
      company: 'GreenTech',
      content: 'Service client irréprochable et livraison dans les délais. Leur approche personnalisée fait vraiment la différence.',
      rating: 5,
      avatar: 'TL'
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="heading-responsive font-bold text-gray-900 mb-6">
            Ce que disent
            <span className="block text-primary-600">nos clients</span>
          </h2>
          <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui nous font confiance 
            pour leurs projets digitaux.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card p-8 hover:shadow-xl transition-all duration-300"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-primary-600 opacity-50" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 card-shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Note moyenne clients</div>
              <div className="flex justify-center space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">99%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">24h</div>
              <div className="text-gray-600">Temps de réponse moyen</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Rejoignez nos clients satisfaits
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Commencez votre projet dès aujourd&apos;hui et découvrez pourquoi 
            nos clients nous recommandent.
          </p>
          <a
            href="#contact"
            className="btn-primary px-8 py-4 text-lg"
          >
            Démarrer mon projet
          </a>
        </div>
      </div>
    </section>
  )
}