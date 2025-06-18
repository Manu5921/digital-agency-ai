import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API Contact Digital Agency',
    endpoints: {
      POST: '/api/contact - Envoyer un message de contact'
    },
    version: '1.0.0'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation des données
    const { name, email, phone, subject, message } = body
    
    if (!name || !email || !subject || !message) {
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
    console.log('📧 Nouveau message de contact reçu:')
    console.log('Nom:', name)
    console.log('Email:', email)
    console.log('Téléphone:', phone || 'Non fourni')
    console.log('Sujet:', subject)
    console.log('Message:', message)
    console.log('Date:', new Date().toISOString())

    // Simulation d'un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Réponse de succès
    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès',
      data: {
        name,
        email,
        subject,
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