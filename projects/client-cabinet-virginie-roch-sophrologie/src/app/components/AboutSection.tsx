import { Users, Award, Clock, CheckCircle } from 'lucide-react'

export default function AboutSection() {
  const stats = [
    { icon: Users, label: 'Clients satisfaits', value: '50+' },
    { icon: Award, label: 'Années d\'expérience', value: '5+' },
    { icon: Clock, label: 'Projets livrés', value: '100+' },
    { icon: CheckCircle, label: 'Taux de satisfaction', value: '99%' }
  ]

  const values = [
    {
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet avec des standards de qualité élevés.'
    },
    {
      title: 'Innovation',
      description: 'Nous utilisons les technologies les plus récentes pour créer des solutions modernes.'
    },
    {
      title: 'Transparence',
      description: 'Communication claire et transparente tout au long de votre projet.'
    },
    {
      title: 'Réactivité',
      description: 'Support réactif et disponible pour répondre à vos besoins rapidement.'
    }
  ]

  return (
    <section id="apropos" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu */}
          <div>
            <h2 className="heading-responsive font-bold text-gray-900 mb-6">
              À propos de
              <span className="block text-primary-600">Digital Agency</span>
            </h2>
            
            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                Digital Agency est votre partenaire de confiance pour tous vos projets digitaux. 
                Nous combinons expertise technique, créativité et service client exceptionnel 
                pour livrer des solutions qui dépassent vos attentes.
              </p>
              
              <p>
                Notre équipe d&apos;experts passionnés travaille avec les dernières technologies 
                pour créer des expériences numériques uniques et performantes. Nous croyons 
                que chaque projet mérite une attention particulière et une approche personnalisée.
              </p>

              <p>
                De la conception au déploiement, nous vous accompagnons à chaque étape 
                pour assurer le succès de votre transformation digitale.
              </p>
            </div>

            {/* Valeurs */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques et Image */}
          <div className="space-y-8">
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 font-medium">Photo équipe à ajouter</p>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}