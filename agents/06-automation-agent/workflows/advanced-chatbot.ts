/**
 * Advanced Chatbot - Phase 2
 * GPT-4 integration avec voice support, context awareness et escalation intelligente
 * 
 * Features:
 * - GPT-4 conversational AI
 * - Speech-to-Text / Text-to-Speech
 * - Context memory avec historique
 * - Escalation intelligente vers humain
 * - Support multilingue (FR/EN)
 * - Sentiment analysis
 */

import { OpenAI } from 'openai';
import { createClient } from '@deepgram/sdk';
import { ElevenLabsAPI } from 'elevenlabs-node';

export interface ChatbotConfig {
  openai: {
    apiKey: string;
    model: 'gpt-4o' | 'gpt-4-turbo' | 'gpt-4';
    temperature: number;
    maxTokens: number;
  };
  voice: {
    deepgram: {
      apiKey: string;
      model: 'nova-2' | 'enhanced';
      language: 'fr' | 'en' | 'auto';
    };
    elevenlabs: {
      apiKey: string;
      voiceId: string;
      model: 'eleven_multilingual_v2';
    };
  };
  context: {
    maxHistoryLength: number;
    sessionTimeout: number; // minutes
    memoryPersistence: boolean;
  };
  escalation: {
    enabled: boolean;
    triggers: string[];
    humanOperatorWebhook: string;
    businessHours: {
      start: string;
      end: string;
      timezone: string;
    };
  };
}

export interface ChatSession {
  sessionId: string;
  userId?: string;
  language: 'fr' | 'en';
  context: ChatMessage[];
  metadata: {
    createdAt: Date;
    lastActivity: Date;
    userInfo?: {
      name?: string;
      email?: string;
      phone?: string;
      customerSegment?: string;
    };
    sentiment: 'positive' | 'neutral' | 'negative';
    escalationScore: number; // 0-100
    businessContext: 'reservation' | 'complaint' | 'info' | 'support' | 'general';
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  metadata?: {
    confidence?: number;
    sentiment?: string;
    intent?: string;
    entities?: Record<string, any>;
  };
}

export interface VoiceTranscription {
  text: string;
  confidence: number;
  language: string;
  duration: number;
}

export interface EscalationTrigger {
  type: 'keyword' | 'sentiment' | 'duration' | 'complexity' | 'request';
  value: any;
  score: number;
  description: string;
}

export class AdvancedChatbot {
  private config: ChatbotConfig;
  private openai: OpenAI;
  private deepgram: any;
  private elevenlabs: ElevenLabsAPI;
  private sessions: Map<string, ChatSession> = new Map();
  private restaurantContext: string;

  constructor(config: ChatbotConfig) {
    this.config = config;
    this.openai = new OpenAI({ apiKey: config.openai.apiKey });
    this.deepgram = createClient(config.voice.deepgram.apiKey);
    this.elevenlabs = new ElevenLabsAPI({ apiKey: config.voice.elevenlabs.apiKey });
    this.setupRestaurantContext();
  }

  /**
   * Configuration du contexte restaurant
   */
  private setupRestaurantContext(): void {
    this.restaurantContext = `
    Tu es l'assistant virtuel du restaurant "Le Gourmet", un établissement gastronomique français haut de gamme situé à Paris.

    INFORMATIONS RESTAURANT:
    - Nom: Le Gourmet Paris
    - Type: Restaurant gastronomique français
    - Localisation: 15 rue Saint-Honoré, 75001 Paris
    - Chef: Chef étoilé Michel Dubois
    - Spécialités: Cuisine française moderne, menu saisonnier
    - Horaires: Mar-Sam 19h-23h, Fermé Dim-Lun
    - Réservation: Obligatoire, jusqu'à 30 jours à l'avance
    - Capacité: 45 couverts
    - Prix moyen: 85-120€ par personne
    - Dress code: Tenue correcte exigée
    - Parking: Valet disponible

    SERVICES:
    - Menu dégustation 7 services
    - Accord mets-vins par notre sommelier
    - Menus végétariens/sans allergènes sur demande
    - Privatisation possible pour événements
    - Service traiteur pour événements externes

    POLITIQUE:
    - Annulation gratuite jusqu'à 24h avant
    - Facturation 50€/personne si annulation tardive
    - Modification de réservation possible selon disponibilité
    - Animaux non admis
    - Enfants bienvenus (menu enfant disponible)

    TON & STYLE:
    - Professionnel mais chaleureux
    - Français ou anglais selon le client
    - Toujours proposer des solutions
    - Escalader vers humain si nécessaire
    - Collecter les informations de réservation complètes
    `;
  }

  /**
   * Initialise une nouvelle session de chat
   */
  async createSession(userId?: string, language: 'fr' | 'en' = 'fr'): Promise<string> {
    const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: ChatSession = {
      sessionId,
      userId,
      language,
      context: [{
        id: 'system_init',
        role: 'system',
        content: this.restaurantContext,
        timestamp: new Date()
      }],
      metadata: {
        createdAt: new Date(),
        lastActivity: new Date(),
        sentiment: 'neutral',
        escalationScore: 0,
        businessContext: 'general'
      }
    };

    this.sessions.set(sessionId, session);
    
    // Auto-cleanup après timeout
    setTimeout(() => {
      if (this.sessions.has(sessionId)) {
        this.sessions.delete(sessionId);
      }
    }, this.config.context.sessionTimeout * 60 * 1000);

    return sessionId;
  }

  /**
   * Traite un message texte
   */
  async processTextMessage(
    sessionId: string, 
    message: string, 
    userInfo?: Partial<ChatSession['metadata']['userInfo']>
  ): Promise<ChatMessage> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session non trouvée');
    }

    // Mise à jour des infos utilisateur
    if (userInfo) {
      session.metadata.userInfo = { ...session.metadata.userInfo, ...userInfo };
    }

    // Ajout du message utilisateur
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
      metadata: {
        intent: await this.detectIntent(message),
        entities: await this.extractEntities(message),
        sentiment: await this.analyzeSentiment(message)
      }
    };

    session.context.push(userMessage);
    session.metadata.lastActivity = new Date();

    // Analyse du contexte business
    session.metadata.businessContext = this.detectBusinessContext(message);
    
    // Calcul du score d'escalation
    session.metadata.escalationScore = await this.calculateEscalationScore(session, message);

    // Vérification des triggers d'escalation
    if (await this.shouldEscalate(session)) {
      return this.handleEscalation(session);
    }

    // Génération de la réponse GPT-4
    const assistantResponse = await this.generateGPTResponse(session);

    // Ajout de la réponse à l'historique
    session.context.push(assistantResponse);

    // Nettoyage de l'historique si trop long
    this.cleanupHistory(session);

    return assistantResponse;
  }

  /**
   * Traite un message vocal (Speech-to-Text puis traitement)
   */
  async processVoiceMessage(
    sessionId: string, 
    audioBuffer: Buffer,
    userInfo?: Partial<ChatSession['metadata']['userInfo']>
  ): Promise<{ transcription: VoiceTranscription; response: ChatMessage; audioResponse?: string }> {
    // Transcription avec Deepgram
    const transcription = await this.transcribeAudio(audioBuffer);
    
    // Traitement du message texte
    const response = await this.processTextMessage(sessionId, transcription.text, userInfo);

    // Génération audio de la réponse (si demandé)
    const audioResponse = await this.generateSpeech(response.content, sessionId);

    return {
      transcription,
      response,
      audioResponse
    };
  }

  /**
   * Transcription audio avec Deepgram
   */
  private async transcribeAudio(audioBuffer: Buffer): Promise<VoiceTranscription> {
    try {
      const response = await this.deepgram.listen.prerecorded.transcribeFile(
        audioBuffer,
        {
          model: this.config.voice.deepgram.model,
          language: this.config.voice.deepgram.language,
          smart_format: true,
          punctuate: true,
          diarize: false
        }
      );

      const result = response.result;
      const transcript = result.channels[0].alternatives[0];

      return {
        text: transcript.transcript,
        confidence: transcript.confidence,
        language: result.metadata.detected_language || 'fr',
        duration: result.metadata.duration
      };
    } catch (error) {
      console.error('Erreur transcription Deepgram:', error);
      throw new Error('Impossible de transcrire l\'audio');
    }
  }

  /**
   * Génération audio avec ElevenLabs
   */
  private async generateSpeech(text: string, sessionId: string): Promise<string> {
    try {
      const session = this.sessions.get(sessionId);
      const language = session?.language || 'fr';

      const audioBuffer = await this.elevenlabs.textToSpeech({
        voiceId: this.config.voice.elevenlabs.voiceId,
        text: text,
        modelId: this.config.voice.elevenlabs.model,
        voiceSettings: {
          stability: 0.8,
          similarityBoost: 0.8,
          style: 0.2,
          useSpeakerBoost: true
        }
      });

      // Sauvegarde temporaire (à adapter selon votre système de stockage)
      const audioUrl = await this.saveAudioFile(audioBuffer, sessionId);
      
      return audioUrl;
    } catch (error) {
      console.error('Erreur génération vocale ElevenLabs:', error);
      throw new Error('Impossible de générer l\'audio');
    }
  }

  /**
   * Génération de réponse GPT-4
   */
  private async generateGPTResponse(session: ChatSession): Promise<ChatMessage> {
    try {
      const messages = session.context
        .slice(-10) // Derniers 10 messages pour limiter les tokens
        .map(msg => ({
          role: msg.role as 'system' | 'user' | 'assistant',
          content: msg.content
        }));

      const completion = await this.openai.chat.completions.create({
        model: this.config.openai.model,
        messages,
        temperature: this.config.openai.temperature,
        max_tokens: this.config.openai.maxTokens,
        functions: [
          {
            name: 'make_reservation',
            description: 'Créer une réservation restaurant',
            parameters: {
              type: 'object',
              properties: {
                date: { type: 'string', description: 'Date de réservation (YYYY-MM-DD)' },
                time: { type: 'string', description: 'Heure (HH:MM)' },
                guests: { type: 'number', description: 'Nombre de personnes' },
                name: { type: 'string', description: 'Nom du client' },
                phone: { type: 'string', description: 'Téléphone' },
                email: { type: 'string', description: 'Email' },
                specialRequests: { type: 'string', description: 'Demandes spéciales' }
              },
              required: ['date', 'time', 'guests', 'name', 'phone']
            }
          },
          {
            name: 'check_availability',
            description: 'Vérifier disponibilité pour une date/heure',
            parameters: {
              type: 'object',
              properties: {
                date: { type: 'string' },
                time: { type: 'string' },
                guests: { type: 'number' }
              },
              required: ['date', 'time', 'guests']
            }
          }
        ],
        function_call: 'auto'
      });

      const choice = completion.choices[0];
      
      // Traitement des function calls
      if (choice.message.function_call) {
        return await this.handleFunctionCall(choice.message.function_call, session);
      }

      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: choice.message.content || 'Désolé, je n\'ai pas pu traiter votre demande.',
        timestamp: new Date(),
        metadata: {
          model: this.config.openai.model,
          tokens: completion.usage?.total_tokens
        }
      };
    } catch (error) {
      console.error('Erreur GPT-4:', error);
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Je rencontre actuellement des difficultés techniques. Un conseiller va vous contacter sous peu.',
        timestamp: new Date()
      };
    }
  }

  /**
   * Traitement des function calls
   */
  private async handleFunctionCall(
    functionCall: any, 
    session: ChatSession
  ): Promise<ChatMessage> {
    const { name, arguments: args } = functionCall;
    const parsedArgs = JSON.parse(args);

    switch (name) {
      case 'make_reservation':
        return this.processReservation(parsedArgs, session);
      
      case 'check_availability':
        return this.checkAvailability(parsedArgs, session);
      
      default:
        return {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: 'Fonction non reconnue. Un conseiller va vous aider.',
          timestamp: new Date()
        };
    }
  }

  /**
   * Traitement des réservations
   */
  private async processReservation(
    reservationData: any, 
    session: ChatSession
  ): Promise<ChatMessage> {
    try {
      // Validation des données
      const isValid = this.validateReservationData(reservationData);
      if (!isValid.valid) {
        return {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: `Il manque quelques informations pour votre réservation : ${isValid.missing.join(', ')}. Pouvez-vous me les fournir ?`,
          timestamp: new Date()
        };
      }

      // Vérification disponibilité
      const available = await this.checkRestaurantAvailability(
        reservationData.date,
        reservationData.time,
        reservationData.guests
      );

      if (!available) {
        return {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: `Malheureusement, nous n'avons plus de disponibilité le ${reservationData.date} à ${reservationData.time} pour ${reservationData.guests} personnes. Puis-je vous proposer d'autres créneaux ?`,
          timestamp: new Date()
        };
      }

      // Création de la réservation via webhook
      const reservationId = await this.createReservationWebhook(reservationData);

      // Mise à jour du contexte session
      session.metadata.userInfo = {
        name: reservationData.name,
        phone: reservationData.phone,
        email: reservationData.email
      };

      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `Parfait ! Votre réservation est confirmée :

📅 **Date :** ${new Date(reservationData.date).toLocaleDateString('fr-FR')}
🕒 **Heure :** ${reservationData.time}
👥 **Nombre de personnes :** ${reservationData.guests}
📧 **Confirmation :** Un email de confirmation a été envoyé à ${reservationData.email}

**Numéro de réservation :** ${reservationId}

Nous avons hâte de vous accueillir au Gourmet ! N'hésitez pas si vous avez des questions ou des demandes particulières.`,
        timestamp: new Date(),
        metadata: {
          reservationId,
          actionCompleted: 'reservation_created'
        }
      };
    } catch (error) {
      console.error('Erreur création réservation:', error);
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Une erreur s\'est produite lors de la création de votre réservation. Un conseiller va vous recontacter rapidement pour finaliser votre demande.',
        timestamp: new Date()
      };
    }
  }

  /**
   * Détection d'intention
   */
  private async detectIntent(message: string): Promise<string> {
    const intents = {
      reservation: ['réserver', 'réservation', 'table', 'booking', 'book'],
      menu: ['menu', 'carte', 'plat', 'spécialité', 'cuisine'],
      hours: ['horaire', 'heure', 'ouvert', 'fermé', 'opening'],
      location: ['adresse', 'où', 'localisation', 'address', 'location'],
      price: ['prix', 'tarif', 'coût', 'combien', 'price'],
      cancel: ['annuler', 'modifier', 'cancel', 'change'],
      complaint: ['problème', 'plainte', 'insatisfait', 'complaint', 'issue']
    };

    const lowerMessage = message.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent;
      }
    }

    return 'general';
  }

  /**
   * Extraction d'entités
   */
  private async extractEntities(message: string): Promise<Record<string, any>> {
    const entities: Record<string, any> = {};

    // Extraction de dates
    const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre))/gi;
    const dateMatch = message.match(dateRegex);
    if (dateMatch) {
      entities.date = dateMatch[0];
    }

    // Extraction d'heures
    const timeRegex = /(\d{1,2}h\d{0,2})|(\d{1,2}:\d{2})/gi;
    const timeMatch = message.match(timeRegex);
    if (timeMatch) {
      entities.time = timeMatch[0];
    }

    // Extraction de nombres (personnes)
    const numberRegex = /(\d+)\s*(?:personne|people|guest|convive)/gi;
    const numberMatch = message.match(numberRegex);
    if (numberMatch) {
      entities.guests = parseInt(numberMatch[0]);
    }

    // Extraction email
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
    const emailMatch = message.match(emailRegex);
    if (emailMatch) {
      entities.email = emailMatch[0];
    }

    // Extraction téléphone
    const phoneRegex = /(?:\+33|0)[1-9](?:[0-9]{8})/gi;
    const phoneMatch = message.match(phoneRegex);
    if (phoneMatch) {
      entities.phone = phoneMatch[0];
    }

    return entities;
  }

  /**
   * Analyse de sentiment
   */
  private async analyzeSentiment(message: string): Promise<string> {
    const positiveWords = ['merci', 'parfait', 'excellent', 'super', 'génial', 'thank', 'great', 'perfect'];
    const negativeWords = ['problème', 'mauvais', 'nul', 'déçu', 'terrible', 'problem', 'bad', 'awful'];

    const lowerMessage = message.toLowerCase();
    
    const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  /**
   * Détection du contexte business
   */
  private detectBusinessContext(message: string): ChatSession['metadata']['businessContext'] {
    const contexts = {
      reservation: ['réserver', 'table', 'booking'],
      complaint: ['problème', 'plainte', 'pas content'],
      info: ['horaire', 'adresse', 'menu'],
      support: ['aide', 'help', 'question']
    };

    const lowerMessage = message.toLowerCase();
    
    for (const [context, keywords] of Object.entries(contexts)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return context as ChatSession['metadata']['businessContext'];
      }
    }

    return 'general';
  }

  /**
   * Calcul du score d'escalation
   */
  private async calculateEscalationScore(session: ChatSession, message: string): Promise<number> {
    let score = session.metadata.escalationScore;

    // Facteurs d'escalation
    const escalationFactors = [
      { condition: message.toLowerCase().includes('directeur'), points: 30 },
      { condition: message.toLowerCase().includes('remboursement'), points: 25 },
      { condition: session.metadata.sentiment === 'negative', points: 15 },
      { condition: session.context.length > 10, points: 10 },
      { condition: message.includes('!!!'), points: 10 },
      { condition: message.toLowerCase().includes('inacceptable'), points: 20 }
    ];

    for (const factor of escalationFactors) {
      if (factor.condition) {
        score += factor.points;
      }
    }

    return Math.min(score, 100);
  }

  /**
   * Vérification si escalation nécessaire
   */
  private async shouldEscalate(session: ChatSession): Promise<boolean> {
    const triggers = this.config.escalation.triggers;
    
    // Score d'escalation élevé
    if (session.metadata.escalationScore >= 70) return true;
    
    // Mots-clés critiques
    const lastMessage = session.context[session.context.length - 1]?.content.toLowerCase();
    const criticalKeywords = ['avocat', 'procès', 'directeur', 'scandale'];
    
    if (criticalKeywords.some(keyword => lastMessage?.includes(keyword))) {
      return true;
    }

    // Durée de conversation trop longue
    if (session.context.length > 15) return true;

    // Sentiment négatif persistant
    const recentMessages = session.context.slice(-3);
    const negativeCount = recentMessages.filter(msg => 
      msg.metadata?.sentiment === 'negative'
    ).length;
    
    if (negativeCount >= 2) return true;

    return false;
  }

  /**
   * Gestion de l'escalation
   */
  private async handleEscalation(session: ChatSession): Promise<ChatMessage> {
    try {
      // Notification webhook vers équipe humaine
      await this.notifyHumanOperator(session);

      // Mise à jour du statut de session
      session.metadata.escalationScore = 100;

      const isBusinessHours = this.isBusinessHours();
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: isBusinessHours 
          ? `Je comprends votre situation et je souhaite vous apporter la meilleure solution possible. Je vais immédiatement vous mettre en relation avec un de nos conseillers qui va pouvoir vous aider personnellement.

Un membre de notre équipe va vous contacter dans les prochaines minutes. Merci de votre patience.`
          : `Je comprends parfaitement votre demande. Nos bureaux sont actuellement fermés, mais votre demande a été transmise en priorité à notre équipe.

Un conseiller vous contactera dès l'ouverture demain matin à 9h. En cas d'urgence, vous pouvez nous joindre au 01 42 60 XX XX.

Merci de votre compréhension.`,
        timestamp: new Date(),
        metadata: {
          escalated: true,
          escalationReason: 'automatic_trigger',
          escalationScore: session.metadata.escalationScore
        }
      };
    } catch (error) {
      console.error('Erreur escalation:', error);
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Je rencontre des difficultés techniques. Pouvez-vous nous contacter directement au 01 42 60 XX XX ? Nos équipes seront ravies de vous aider.', 
        timestamp: new Date()
      };
    }
  }

  /**
   * Vérification des heures d'ouverture
   */
  private isBusinessHours(): boolean {
    const now = new Date();
    const hours = now.getHours();
    const startHour = parseInt(this.config.escalation.businessHours.start.split(':')[0]);
    const endHour = parseInt(this.config.escalation.businessHours.end.split(':')[0]);
    
    return hours >= startHour && hours < endHour;
  }

  /**
   * Notification vers opérateur humain
   */
  private async notifyHumanOperator(session: ChatSession): Promise<void> {
    try {
      const webhook = this.config.escalation.humanOperatorWebhook;
      
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'escalation_required',
          sessionId: session.sessionId,
          userId: session.userId,
          escalationScore: session.metadata.escalationScore,
          businessContext: session.metadata.businessContext,
          userInfo: session.metadata.userInfo,
          lastMessages: session.context.slice(-5),
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Erreur notification escalation:', error);
    }
  }

  /**
   * Nettoyage de l'historique
   */
  private cleanupHistory(session: ChatSession): void {
    if (session.context.length > this.config.context.maxHistoryLength) {
      // Garde le message système + les X derniers messages
      const systemMessage = session.context[0];
      const recentMessages = session.context.slice(-this.config.context.maxHistoryLength + 1);
      session.context = [systemMessage, ...recentMessages];
    }
  }

  /**
   * Validation des données de réservation
   */
  private validateReservationData(data: any): { valid: boolean; missing: string[] } {
    const required = ['date', 'time', 'guests', 'name', 'phone'];
    const missing = required.filter(field => !data[field]);
    
    return {
      valid: missing.length === 0,
      missing
    };
  }

  /**
   * Vérification disponibilité restaurant
   */
  private async checkRestaurantAvailability(
    date: string, 
    time: string, 
    guests: number
  ): Promise<boolean> {
    // Simulation - à remplacer par votre système de réservation
    const reservationDate = new Date(date);
    const now = new Date();
    
    // Vérifications de base
    if (reservationDate <= now) return false;
    if (guests > 8) return false; // Max 8 personnes par table
    
    // Simulation d'API de disponibilité
    return Math.random() > 0.3; // 70% de chance d'être disponible
  }

  /**
   * Création de réservation via webhook
   */
  private async createReservationWebhook(data: any): Promise<string> {
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'chatbot',
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      return result.reservationId || `RES_${Date.now()}`;
    } catch (error) {
      console.error('Erreur création réservation:', error);
      return `RES_${Date.now()}`;
    }
  }

  /**
   * Sauvegarde fichier audio
   */
  private async saveAudioFile(audioBuffer: Buffer, sessionId: string): Promise<string> {
    // Simulation - à adapter selon votre système de stockage
    const filename = `audio_${sessionId}_${Date.now()}.mp3`;
    const url = `/temp/audio/${filename}`;
    
    // Ici, vous implémenteriez la sauvegarde réelle
    // (S3, local storage, etc.)
    
    return url;
  }

  /**
   * Obtenir une session
   */
  getSession(sessionId: string): ChatSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Obtenir les statistiques
   */
  getStats(): {
    activeSessions: number;
    totalSessions: number;
    averageEscalationScore: number;
    businessContextDistribution: Record<string, number>;
  } {
    const sessions = Array.from(this.sessions.values());
    
    return {
      activeSessions: sessions.length,
      totalSessions: sessions.length,
      averageEscalationScore: sessions.reduce((sum, s) => sum + s.metadata.escalationScore, 0) / sessions.length || 0,
      businessContextDistribution: sessions.reduce((acc, session) => {
        acc[session.metadata.businessContext] = (acc[session.metadata.businessContext] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}

// Configuration par défaut
export const defaultChatbotConfig: ChatbotConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 1000
  },
  voice: {
    deepgram: {
      apiKey: process.env.DEEPGRAM_API_KEY || '',
      model: 'nova-2',
      language: 'fr'
    },
    elevenlabs: {
      apiKey: process.env.ELEVENLABS_API_KEY || '',
      voiceId: process.env.ELEVENLABS_VOICE_ID || '',
      model: 'eleven_multilingual_v2'
    }
  },
  context: {
    maxHistoryLength: 20,
    sessionTimeout: 60, // 1 heure
    memoryPersistence: true
  },
  escalation: {
    enabled: true,
    triggers: ['directeur', 'avocat', 'remboursement', 'scandale'],
    humanOperatorWebhook: process.env.ESCALATION_WEBHOOK_URL || '',
    businessHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Europe/Paris'
    }
  }
};

export default AdvancedChatbot;