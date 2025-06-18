'use client'

import { useState } from 'react'
import { Send, Check, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    age: '',
    experience: '',
    objectives: '',
    availability: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          age: '',
          experience: '',
          objectives: '',
          availability: '',
          message: ''
        })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setStatus('error')
    }

    // Reset status after 5 seconds
    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom */}
      <div>
        <label htmlFor="name" className="form-label">
          Nom complet *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Votre nom complet"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="form-label">
          Adresse email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="votre@email.com"
        />
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="form-label">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="06 12 34 56 78"
        />
      </div>

      {/* Objectif principal */}
      <div>
        <label htmlFor="subject" className="form-label">
          Objectif principal *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Sélectionnez votre objectif</option>
          <option value="perte-poids">Perte de poids</option>
          <option value="prise-muscle">Prise de masse musculaire</option>
          <option value="remise-forme">Remise en forme générale</option>
          <option value="preparation-physique">Préparation physique</option>
          <option value="post-grossesse">Remise en forme post-grossesse</option>
          <option value="maintien-forme">Maintien de la forme</option>
          <option value="autre">Autre objectif</option>
        </select>
      </div>

      {/* Âge */}
      <div>
        <label htmlFor="age" className="form-label">
          Âge
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="16"
          max="80"
          className="form-input"
          placeholder="Votre âge"
        />
      </div>

      {/* Expérience sportive */}
      <div>
        <label htmlFor="experience" className="form-label">
          Expérience sportive
        </label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Sélectionnez votre niveau</option>
          <option value="debutant">Débutant (jamais fait de sport)</option>
          <option value="occasionnel">Occasionnel (1-2 fois/semaine)</option>
          <option value="regulier">Régulier (3-4 fois/semaine)</option>
          <option value="avance">Avancé (sport quotidien)</option>
          <option value="competition">Compétition/Haut niveau</option>
        </select>
      </div>

      {/* Disponibilités */}
      <div>
        <label htmlFor="availability" className="form-label">
          Disponibilités préférées
        </label>
        <select
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Sélectionnez vos créneaux</option>
          <option value="matin-semaine">Matin en semaine (6h-9h)</option>
          <option value="dejeuner">Pause déjeuner (12h-14h)</option>
          <option value="soir-semaine">Soir en semaine (18h-21h)</option>
          <option value="weekend">Weekend (flexible)</option>
          <option value="online">Coaching online uniquement</option>
          <option value="flexible">Flexible selon planning</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="form-label">
          Motivations et informations complémentaires
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="form-textarea"
          placeholder="Parlez-moi de vos motivations, contraintes, blessures éventuelles, habitudes alimentaires..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <Check className="w-5 h-5" />
          <span>Demande envoyée avec succès ! Sarah vous recontactera sous 24h pour planifier votre bilan gratuit.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>Erreur lors de l&apos;envoi. Veuillez réessayer ou appeler directement au 06 45 78 92 13.</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn-primary px-6 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Envoi en cours...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Réserver mon bilan gratuit</span>
          </div>
        )}
      </button>

      {/* Note */}
      <p className="text-sm text-gray-600 text-center">
        * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées.
      </p>
    </form>
  )
}