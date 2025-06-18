import { Users, Award, Clock, CheckCircle, Target, Heart } from 'lucide-react'
import { fitcoachContent } from '../../content/fitcoach-content'

export default function AboutSection() {
  return (
    <section id="apropos" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-950 mb-6">
              Sarah Martin - Coach Sportif & Nutritionniste
              <span className="block text-primary-500 text-2xl md:text-3xl mt-2">
                Certifiée STAPS Paris 16ème
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-700 text-lg">
              <p>
                <strong>Coach sportif personnalisé</strong> depuis 8 ans, je vous accompagne dans votre 
                <strong>transformation physique</strong> à Paris 16ème (Passy, Trocadéro, Auteuil).
              </p>
              <p>
                Spécialisée dans le <strong>coaching fitness pour professionnels actifs</strong>, 
                je comprends vos contraintes de temps et d'énergie. Mon approche personnalisée 
                combine <strong>entraînement efficace</strong> et <strong>nutrition équilibrée</strong>.
              </p>
              <p>
                Mes programmes de <strong>perte de poids</strong> et <strong>remise en forme</strong> 
                sont conçus pour des résultats durables et une motivation constante.
              </p>
            </div>

            {/* Certifications SEO */}
            <div className="mt-8">
              <h4 className="font-semibold text-secondary-950 mb-4">Certifications Professional Trainer :</h4>
              <div className="flex flex-wrap gap-3">
                {fitcoachContent.business.coach.certifications.map((cert, index) => (
                  <span 
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Spécialisations SEO */}
            <div className="mt-8">
              <h4 className="font-semibold text-secondary-950 mb-4">Spécialisations Coaching Fitness :</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fitcoachContent.business.coach.specializations.map((specialization, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">{specialization}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistiques et Image */}
          <div className="space-y-8">
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/30">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {fitcoachContent.business.coach.name}
                </h3>
                <p className="text-white/80 font-medium mb-4">
                  {fitcoachContent.business.coach.title}
                </p>
                <div className="text-white/70 text-sm">
                  {fitcoachContent.business.coach.experience}
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-6">
              {fitcoachContent.about.achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="text-3xl font-bold text-primary-500 mb-2 group-hover:scale-110 transition-transform">
                    {achievement.number}
                  </div>
                  <div className="text-sm font-semibold text-secondary-950 mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Zone d'intervention */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-secondary-950 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-500" />
                Secteurs Paris 16ème
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <span className="font-medium">{fitcoachContent.business.location.studio}</span>
                </div>
                {fitcoachContent.business.location.zones.map((zone, index) => (
                  <div key={index} className="flex items-center text-gray-600 text-sm ml-5">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-3"></div>
                    <span>{zone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}