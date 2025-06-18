'use client'

import { useState } from 'react'
import { Send, Check, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
          placeholder="01 42 00 00 00"
        />
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="subject" className="form-label">
          Type de projet *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Sélectionnez un type de projet</option>
          <option value="site-vitrine">Site vitrine</option>
          <option value="e-commerce">Boutique en ligne</option>
          <option value="application-web">Application web</option>
          <option value="refonte">Refonte de site</option>
          <option value="maintenance">Maintenance</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="form-label">
          Décrivez votre projet *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="form-textarea"
          placeholder="Décrivez votre projet, vos besoins, votre budget approximatif..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <Check className="w-5 h-5" />
          <span>Message envoyé avec succès ! Nous vous recontacterons sous 24h.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>Erreur lors de l&apos;envoi. Veuillez réessayer ou nous appeler.</span>
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
            <span>Envoyer ma demande</span>
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