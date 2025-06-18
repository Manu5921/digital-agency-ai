import { Users, Award, Clock, CheckCircle, Target, Heart, Brain, Stethoscope } from 'lucide-react'
import { sophrologyContent } from '../../content/sophrologie-content'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="apropos" className="section-padding bg-gradient-to-br from-therapy-sand/10 to-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              {sophrologyContent.about.title}
              <span className="block text-therapy-calm text-2xl md:text-3xl mt-2">
                {sophrologyContent.business.practitioner.experience} - Paris
              </span>
            </h2>
            
            <div className="space-y-6 text-secondary-700 text-lg font-body leading-relaxed">
              {sophrologyContent.about.content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Certifications SEO */}
            <div className="mt-8">
              <h4 className="font-semibold text-secondary-900 mb-4 font-heading">Certifications & Diplômes :</h4>
              <div className="flex flex-wrap gap-3">
                {sophrologyContent.business.practitioner.certifications.map((cert, index) => (
                  <span 
                    key={index}
                    className="bg-therapy-calm/10 text-therapy-calm px-3 py-1 rounded-full text-sm font-medium border border-therapy-calm/20"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Spécialisations SEO */}
            <div className="mt-8">
              <h4 className="font-semibold text-secondary-900 mb-4 font-heading">Spécialisations Thérapeutiques :</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sophrologyContent.business.practitioner.specializations.map((specialization, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {index === 0 ? <Heart className="w-5 h-5 text-therapy-calm flex-shrink-0" /> :
                     index === 1 ? <Brain className="w-5 h-5 text-therapy-calm flex-shrink-0" /> :
                     index === 2 ? <Stethoscope className="w-5 h-5 text-therapy-calm flex-shrink-0" /> :
                     <Target className="w-5 h-5 text-therapy-calm flex-shrink-0" />}
                    <span className="text-secondary-700 font-body">{specialization}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistiques et Image */}
          <div className="space-y-8">
            {/* Image placeholder */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative">
              <Image
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Portrait professionnel Virginie Roch - Psychologue et Sophrologue"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-therapy-calm/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-therapy-sand/30">
                  <h3 className="font-heading font-bold text-secondary-900 text-xl mb-2">
                    {sophrologyContent.business.practitioner.name}
                  </h3>
                  <p className="text-therapy-calm font-medium mb-2">
                    {sophrologyContent.business.practitioner.title}
                  </p>
                  <div className="text-secondary-600 text-sm font-body">
                    {sophrologyContent.business.practitioner.experience}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-6">
              {sophrologyContent.about.achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-therapy-sand/20"
                >
                  <div className="text-3xl font-bold text-therapy-calm mb-2 group-hover:scale-110 transition-transform">
                    {achievement.number}
                  </div>
                  <div className="text-sm font-semibold text-secondary-900 mb-1 font-heading">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-secondary-600 font-body">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Zone d'intervention */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-therapy-sand/20">
              <h4 className="font-semibold text-secondary-900 mb-4 flex items-center font-heading">
                <Users className="w-5 h-5 mr-2 text-therapy-calm" />
                Zones de Consultation
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-secondary-700">
                  <div className="w-2 h-2 bg-therapy-calm rounded-full mr-3"></div>
                  <span className="font-medium font-body">{sophrologyContent.business.location.cabinet}</span>
                </div>
                {sophrologyContent.business.location.zones.map((zone, index) => (
                  <div key={index} className="flex items-center text-secondary-600 text-sm ml-5">
                    <div className="w-1 h-1 bg-therapy-stone rounded-full mr-3"></div>
                    <span className="font-body">{zone}</span>
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