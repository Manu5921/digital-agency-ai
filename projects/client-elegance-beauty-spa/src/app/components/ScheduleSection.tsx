import { Clock, Calendar, MapPin, Monitor } from 'lucide-react'

export default function ScheduleSection() {
  const scheduleData = [
    {
      day: 'Lundi',
      studio: '6h00 - 21h00',
      online: '7h00 - 22h00'
    },
    {
      day: 'Mardi',
      studio: '6h00 - 21h00',
      online: '7h00 - 22h00'
    },
    {
      day: 'Mercredi',
      studio: '6h00 - 21h00',
      online: '7h00 - 22h00'
    },
    {
      day: 'Jeudi',
      studio: '6h00 - 21h00',
      online: '7h00 - 22h00'
    },
    {
      day: 'Vendredi',
      studio: '6h00 - 21h00',
      online: '7h00 - 22h00'
    },
    {
      day: 'Samedi',
      studio: '8h00 - 16h00',
      online: '8h00 - 18h00'
    },
    {
      day: 'Dimanche',
      studio: 'Sur RDV',
      online: 'Sur RDV'
    }
  ]

  const popularSlots = [
    {
      time: '7h00 - 9h00',
      type: 'Matinal',
      description: 'Parfait avant le travail',
      icon: '🌅',
      popular: true
    },
    {
      time: '12h00 - 14h00',
      type: 'Déjeuner',
      description: 'Pause déjeuner active',
      icon: '☀️',
      popular: true
    },
    {
      time: '18h00 - 20h00',
      type: 'Soirée',
      description: 'Décompression après le travail',
      icon: '🌆',
      popular: true
    },
    {
      time: 'Weekend',
      type: 'Flexible',
      description: 'Créneaux étendus disponibles',
      icon: '🏃‍♀️',
      popular: false
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="heading-responsive font-bold text-gray-900 mb-6">
            Horaires &
            <span className="block text-orange-600">Disponibilités</span>
          </h2>
          <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
            Des créneaux flexibles adaptés à votre emploi du temps, en studio dans le 16ème 
            ou en coaching online pour toute la France.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Planning détaillé */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Planning Hebdomadaire
                </h3>
                <p className="text-gray-600">Studio Paris 16ème & Online</p>
              </div>
            </div>

            <div className="space-y-4">
              {scheduleData.map((day) => (
                <div key={day.day} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="font-medium text-gray-900 w-20">
                    {day.day}
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-600">{day.studio}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">{day.online}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-orange-800 mb-1">
                    Réservation recommandée
                  </p>
                  <p className="text-orange-700">
                    Réservez vos séances 48h à l'avance pour garantir votre créneau préféré.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Créneaux populaires */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Créneaux Populaires
                </h3>
                <p className="text-gray-600">Les plus demandés par mes clients</p>
              </div>
            </div>

            <div className="space-y-4">
              {popularSlots.map((slot, index) => (
                <div 
                  key={index}
                  className={`relative p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                    slot.popular 
                      ? 'border-orange-200 bg-orange-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {slot.popular && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      POPULAIRE
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{slot.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {slot.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {slot.description}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      slot.popular 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      {slot.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-black rounded-lg text-white">
              <div className="text-center">
                <p className="font-medium mb-2">Coaching Online Disponible</p>
                <p className="text-sm text-gray-300">
                  Pour toute la France • Même qualité de suivi • Horaires étendus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA de réservation */}
        <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Réservez votre créneau idéal
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Première séance découverte offerte ! Choisissez le format qui vous convient : 
            studio dans le 16ème ou coaching online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Réserver ma séance d'essai
            </a>
            <a
              href="tel:+33645789213"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              06 45 78 92 13
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}