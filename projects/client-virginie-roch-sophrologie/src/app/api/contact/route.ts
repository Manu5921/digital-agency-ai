import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API Contact FitCoach Pro',
    endpoints: {
      POST: '/api/contact - Envoyer une demande de bilan fitness'
    },
    version: '1.0.0'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation des données
    const { name, email, phone, subject, age, experience, objectives, availability, message } = body
    
    if (!name || !email || !subject) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Ici, vous pouvez implémenter l'envoi d'email réel
    // Par exemple avec Resend, SendGrid, ou Nodemailer
    
    // Simulation d'envoi d'email
    console.log('🏋️ Nouvelle demande de bilan fitness reçue:')
    console.log('Nom:', name)
    console.log('Email:', email)
    console.log('Téléphone:', phone || 'Non fourni')
    console.log('Objectif principal:', subject)
    console.log('Âge:', age || 'Non précisé')
    console.log('Expérience sportive:', experience || 'Non précisée')
    console.log('Disponibilités:', availability || 'Non précisées')
    console.log('Message/Motivations:', message || 'Aucun message')
    console.log('Date de demande:', new Date().toISOString())

    // Simulation d'un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Réponse de succès
    return NextResponse.json({
      success: true,
      message: 'Demande de bilan fitness envoyée avec succès. Sarah vous contactera sous 24h.',
      data: {
        name,
        email,
        objective: subject,
        age,
        experience,
        availability,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}