'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, TrendingDown, TrendingUp, Zap } from 'lucide-react'

export default function TransformationGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const transformations = [
    {
      id: 1,
      name: 'Thomas L.',
      age: 34,
      profession: 'Directeur Marketing',
      duration: '4 mois',
      results: {
        weight: '-12kg',
        muscle: '+5kg',
        waist: '-15cm'
      },
      before: '/images/transformations/thomas-before.jpg', // Placeholder
      after: '/images/transformations/thomas-after.jpg',   // Placeholder
      story: 'Avec un emploi du temps chargé, Thomas a réussi à transformer complètement son physique grâce à un programme adapté à ses contraintes.',
      achievements: [
        'Perte de 12kg de masse grasse',
        'Gain de 5kg de muscle',
        'Tour de taille réduit de 15cm',
        'Énergie décuplée au quotidien'
      ]
    },
    {
      id: 2,
      name: 'Marie C.',
      age: 29,
      profession: 'Avocate',
      duration: '6 mois',
      results: {
        weight: 'Silhouette',
        muscle: 'Abdos',
        waist: 'Confiance'
      },
      before: '/images/transformations/marie-before.jpg',
      after: '/images/transformations/marie-after.jpg',
      story: 'Après sa grossesse, Marie a retrouvé une silhouette encore plus tonique qu\'avant grâce à un programme post-natal personnalisé.',
      achievements: [
        'Récupération complète post-grossesse',
        'Renforcement de la sangle abdominale',
        'Confiance en soi retrouvée',
        'Habitudes saines adoptées'
      ]
    },
    {
      id: 3,
      name: 'Alexandre D.',
      age: 41,
      profession: 'Chef d\'entreprise',
      duration: '5 mois',
      results: {
        weight: '+8kg',
        muscle: 'Force x2',
        waist: 'Performance'
      },
      before: '/images/transformations/alex-before.jpg',
      after: '/images/transformations/alex-after.jpg',
      story: 'En coaching online depuis Lyon, Alexandre a développé une masse musculaire impressionnante tout en gérant son entreprise.',
      achievements: [
        '+8kg de masse musculaire',
        'Force doublée sur tous les mouvements',
        'Meilleure forme physique de sa vie',
        'Programme adapté aux déplacements'
      ]
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length)
  }

  const currentTransformation = transformations[currentIndex]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="heading-responsive font-bold text-gray-900 mb-6">
            Galerie de
            <span className="block text-orange-600">Transformations</span>
          </h2>
          <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
            Découvrez les transformations impressionnantes de mes clients. 
            Des résultats concrets qui parlent d'eux-mêmes.
          </p>
        </div>

        {/* Galerie principale */}
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Images Avant/Après */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {/* Image Avant */}
                  <div className="relative group">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center overflow-hidden">
                      {/* Placeholder pour image avant */}
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Eye className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-600 font-medium">Photo Avant</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      AVANT
                    </div>
                  </div>

                  {/* Image Après */}
                  <div className="relative group">
                    <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center overflow-hidden">
                      {/* Placeholder pour image après */}
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-orange-800 font-medium">Photo Après</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      APRÈS
                    </div>
                  </div>
                </div>

                {/* Badges de résultats */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white shadow-lg rounded-full px-6 py-3 border border-gray-200">
                    <div className="flex items-center space-x-4 text-sm font-semibold">
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingDown className="w-4 h-4" />
                        <span>{currentTransformation.results.weight}</span>
                      </div>
                      <div className="w-1 h-4 bg-gray-300 rounded-full" />
                      <div className="flex items-center space-x-1 text-blue-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{currentTransformation.results.muscle}</span>
                      </div>
                      <div className="w-1 h-4 bg-gray-300 rounded-full" />
                      <div className="text-orange-600">
                        {currentTransformation.results.waist}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails de la transformation */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentTransformation.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <span>{currentTransformation.age} ans</span>
                    <span>•</span>
                    <span>{currentTransformation.profession}</span>
                    <span>•</span>
                    <span className="font-semibold text-orange-600">
                      {currentTransformation.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentTransformation.story}
                  </p>
                </div>

                {/* Réalisations */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-orange-500 mr-2" />
                    Résultats obtenus
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentTransformation.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-orange-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    Vous aussi, vous pouvez obtenir des résultats similaires avec un programme personnalisé.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                  >
                    Commencer ma transformation
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center space-x-2 mt-8">
          {transformations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-orange-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Note légale */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            * Les résultats peuvent varier d'une personne à l'autre selon l'engagement et la régularité. 
            Photos publiées avec l'accord des clients.
          </p>
        </div>
      </div>
    </section>
  )
}