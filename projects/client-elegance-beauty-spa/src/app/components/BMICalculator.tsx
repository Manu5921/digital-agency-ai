'use client'

import { useState } from 'react'
import { Calculator, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')

  const calculateBMI = () => {
    const heightInM = parseFloat(height) / 100
    const weightInKg = parseFloat(weight)
    
    if (heightInM > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInM * heightInM)
      setBmi(parseFloat(bmiValue.toFixed(1)))
      
      // Déterminer la catégorie et la couleur
      if (bmiValue < 18.5) {
        setCategory('Insuffisance pondérale')
        setColor('text-blue-600')
      } else if (bmiValue < 25) {
        setCategory('Poids normal')
        setColor('text-green-600')
      } else if (bmiValue < 30) {
        setCategory('Surpoids')
        setColor('text-yellow-600')
      } else {
        setCategory('Obésité')
        setColor('text-red-600')
      }
    }
  }

  const resetCalculator = () => {
    setHeight('')
    setWeight('')
    setBmi(null)
    setCategory('')
    setColor('')
  }

  const getBMIIcon = () => {
    if (!bmi) return <Calculator className="w-8 h-8 text-primary-500" />
    
    if (bmi < 18.5) return <TrendingDown className="w-8 h-8 text-blue-600" />
    if (bmi < 25) return <Calculator className="w-8 h-8 text-green-600" />
    if (bmi < 30) return <TrendingUp className="w-8 h-8 text-yellow-600" />
    return <TrendingUp className="w-8 h-8 text-red-600" />
  }

  const getAdvice = () => {
    if (!bmi) return null
    
    if (bmi < 18.5) {
      return "Un coaching personnalisé peut vous aider à atteindre un poids santé de façon saine et durable."
    } else if (bmi < 25) {
      return "Excellent ! Maintenez votre forme avec un programme d'entraînement adapté."
    } else if (bmi < 30) {
      return "Un programme combinant fitness et nutrition peut vous aider à retrouver votre poids idéal."
    } else {
      return "Je vous accompagne avec un programme complet pour retrouver votre bien-être."
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getBMIIcon()}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Calculateur IMC
        </h3>
        <p className="text-gray-600">
          Évaluez votre Indice de Masse Corporelle en quelques secondes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Taille */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
            Votre taille (cm)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Ex: 170"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Poids */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            Votre poids (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ex: 70"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={calculateBMI}
          disabled={!height || !weight}
          className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Calculator className="w-5 h-5" />
          <span>Calculer mon IMC</span>
        </button>
        
        {bmi && (
          <button
            onClick={resetCalculator}
            className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Minus className="w-5 h-5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Résultats */}
      {bmi && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2 " style={{ color: color.replace('text-', '') }}>
              {bmi}
            </div>
            <div className={`text-lg font-semibold ${color} mb-2`}>
              {category}
            </div>
            <p className="text-gray-600 text-sm">
              {getAdvice()}
            </p>
          </div>

          {/* Échelle IMC */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">Insuffisance pondérale</span>
              <span className="text-blue-600">&lt; 18.5</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Poids normal</span>
              <span className="text-green-600">18.5 - 24.9</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-600">Surpoids</span>
              <span className="text-yellow-600">25 - 29.9</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-600">Obésité</span>
              <span className="text-red-600">≥ 30</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Info className="w-5 h-5" />
              <span>Bilan personnalisé gratuit</span>
            </a>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          * L'IMC est un indicateur général. Seul un professionnel peut évaluer précisément votre condition physique.
        </p>
      </div>
    </div>
  )
}