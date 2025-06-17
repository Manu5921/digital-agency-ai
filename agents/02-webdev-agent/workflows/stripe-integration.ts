/**
 * Stripe Integration Complete - Phase 2
 * Intégration complète Stripe avec MCP, webhooks, composants et tests
 */

import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schemas de validation Zod
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  currency: z.string().default('eur'),
  images: z.array(z.string()).optional(),
  metadata: z.record(z.string()).optional(),
});

export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  name: z.string(),
});

export const CheckoutSessionSchema = z.object({
  items: z.array(CartItemSchema),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  customerId: z.string().optional(),
  customerEmail: z.string().email().optional(),
  metadata: z.record(z.string()).optional(),
});

export const SubscriptionSchema = z.object({
  customerId: z.string(),
  priceId: z.string(),
  trialPeriodDays: z.number().optional(),
  metadata: z.record(z.string()).optional(),
});

export class StripeIntegration {
  private stripe: Stripe;
  private webhookSecret: string;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is required');
    }
    if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
      throw new Error('STRIPE_WEBHOOK_SECRET_KEY is required');
    }

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
      typescript: true,
    });
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
  }

  /**
   * Crée une session de checkout Stripe
   */
  async createCheckoutSession(data: z.infer<typeof CheckoutSessionSchema>) {
    try {
      const validatedData = CheckoutSessionSchema.parse(data);

      const lineItems = validatedData.items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Conversion en centimes
        },
        quantity: item.quantity,
      }));

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card', 'sepa_debit'],
        line_items: lineItems,
        mode: 'payment',
        success_url: validatedData.successUrl,
        cancel_url: validatedData.cancelUrl,
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['FR', 'DE', 'ES', 'IT', 'BE', 'NL'],
        },
        metadata: validatedData.metadata || {},
      };

      if (validatedData.customerId) {
        sessionParams.customer = validatedData.customerId;
      } else if (validatedData.customerEmail) {
        sessionParams.customer_email = validatedData.customerEmail;
      }

      const session = await this.stripe.checkout.sessions.create(sessionParams);

      return {
        sessionId: session.id,
        url: session.url,
        paymentIntent: session.payment_intent,
      };
    } catch (error) {
      console.error('Erreur création session checkout:', error);
      throw new Error(error instanceof Error ? error.message : 'Erreur inconnue');
    }
  }

  /**
   * Crée un abonnement Stripe
   */
  async createSubscription(data: z.infer<typeof SubscriptionSchema>) {
    try {
      const validatedData = SubscriptionSchema.parse(data);

      const subscription = await this.stripe.subscriptions.create({
        customer: validatedData.customerId,
        items: [{
          price: validatedData.priceId,
        }],
        trial_period_days: validatedData.trialPeriodDays,
        metadata: validatedData.metadata || {},
        expand: ['latest_invoice.payment_intent'],
      });

      return {
        subscriptionId: subscription.id,
        status: subscription.status,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
        trialEnd: subscription.trial_end,
      };
    } catch (error) {
      console.error('Erreur création abonnement:', error);
      throw new Error(error instanceof Error ? error.message : 'Erreur inconnue');
    }
  }

  /**
   * Gère les webhooks Stripe
   */
  async handleWebhook(request: NextRequest) {
    try {
      const body = await request.text();
      const signature = request.headers.get('stripe-signature');

      if (!signature) {
        throw new Error('Signature manquante');
      }

      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.webhookSecret
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
          break;

        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
          break;

        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
          break;

        case 'invoice.payment_succeeded':
          await this.handleSubscriptionPayment(event.data.object as Stripe.Invoice);
          break;

        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          await this.handleSubscriptionChange(event.data.object as Stripe.Subscription);
          break;

        default:
          console.log(`Événement non traité: ${event.type}`);
      }

      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Erreur webhook:', error);
      return NextResponse.json(
        { error: 'Erreur traitement webhook' },
        { status: 400 }
      );
    }
  }

  /**
   * Traite le succès du paiement
   */
  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    console.log('Paiement réussi:', paymentIntent.id);
    
    // Logique métier : mise à jour commande, envoi email, etc.
    // Intégration avec la base de données via Neon MCP
    const orderData = {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'paid',
      customerEmail: paymentIntent.receipt_email,
      metadata: paymentIntent.metadata,
    };

    // Appel vers l'API interne pour mettre à jour la commande
    try {
      await fetch('/api/orders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error('Erreur mise à jour commande:', error);
    }
  }

  /**
   * Traite l'échec du paiement
   */
  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    console.log('Paiement échoué:', paymentIntent.id);
    
    // Logique d'échec : notification, retry, etc.
    const failureData = {
      paymentIntentId: paymentIntent.id,
      failureReason: paymentIntent.last_payment_error?.message,
      customerEmail: paymentIntent.receipt_email,
    };

    // Notification client et logging
    try {
      await fetch('/api/payments/handle-failure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(failureData),
      });
    } catch (error) {
      console.error('Erreur traitement échec:', error);
    }
  }

  /**
   * Traite la completion du checkout
   */
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    console.log('Checkout complété:', session.id);
    
    // Récupération des détails de la session
    const fullSession = await this.stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'customer'],
    });

    // Traitement de la commande complète
    const orderData = {
      sessionId: session.id,
      customerId: session.customer,
      customerEmail: session.customer_email,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      paymentStatus: session.payment_status,
      items: fullSession.line_items?.data || [],
      metadata: session.metadata,
    };

    try {
      await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error('Erreur création commande:', error);
    }
  }

  /**
   * Traite les paiements d'abonnement
   */
  private async handleSubscriptionPayment(invoice: Stripe.Invoice) {
    console.log('Paiement abonnement:', invoice.id);
    
    const subscriptionData = {
      invoiceId: invoice.id,
      subscriptionId: invoice.subscription,
      customerId: invoice.customer,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      status: invoice.status,
      periodStart: invoice.period_start,
      periodEnd: invoice.period_end,
    };

    try {
      await fetch('/api/subscriptions/update-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData),
      });
    } catch (error) {
      console.error('Erreur mise à jour abonnement:', error);
    }
  }

  /**
   * Traite les changements d'abonnement
   */
  private async handleSubscriptionChange(subscription: Stripe.Subscription) {
    console.log('Changement abonnement:', subscription.id);
    
    const subscriptionData = {
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      status: subscription.status,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      trialEnd: subscription.trial_end,
      items: subscription.items.data,
    };

    try {
      await fetch('/api/subscriptions/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData),
      });
    } catch (error) {
      console.error('Erreur mise à jour abonnement:', error);
    }
  }

  /**
   * Récupère les détails d'un paiement
   */
  async getPaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret,
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      console.error('Erreur récupération PaymentIntent:', error);
      throw new Error('PaymentIntent non trouvé');
    }
  }

  /**
   * Crée un client Stripe
   */
  async createCustomer(email: string, name?: string, metadata?: Record<string, string>) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
        metadata: metadata || {},
      });

      return {
        customerId: customer.id,
        email: customer.email,
        name: customer.name,
      };
    } catch (error) {
      console.error('Erreur création client:', error);
      throw new Error('Impossible de créer le client');
    }
  }

  /**
   * Récupère les abonnements d'un client
   */
  async getCustomerSubscriptions(customerId: string) {
    try {
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        expand: ['data.items.data.price.product'],
      });

      return subscriptions.data.map(sub => ({
        id: sub.id,
        status: sub.status,
        currentPeriodStart: new Date(sub.current_period_start * 1000),
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
        items: sub.items.data,
      }));
    } catch (error) {
      console.error('Erreur récupération abonnements:', error);
      throw new Error('Impossible de récupérer les abonnements');
    }
  }

  /**
   * Annule un abonnement
   */
  async cancelSubscription(subscriptionId: string, atPeriodEnd: boolean = true) {
    try {
      const subscription = await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: atPeriodEnd,
      });

      return {
        id: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at,
      };
    } catch (error) {
      console.error('Erreur annulation abonnement:', error);
      throw new Error('Impossible d\'annuler l\'abonnement');
    }
  }
}

export default StripeIntegration;