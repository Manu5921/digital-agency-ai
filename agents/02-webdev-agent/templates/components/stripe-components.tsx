/**
 * Composants Stripe pour E-commerce
 * Phase 2 - WebDev Agent
 */

'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useStore } from '@/store/cart-store';
import { toast } from 'react-hot-toast';
import { Loader2, CreditCard, Lock, Shield } from 'lucide-react';

// Initialisation Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface CartSummaryProps {
  items: CartItem[];
  total: number;
}

/**
 * Composant principal du panier
 */
export function ShoppingCart() {
  const { items, total, updateQuantity, removeItem, clearCart } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Panier ({items.length})
        </h2>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Vider le panier
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Votre panier est vide</p>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
            Continuer vos achats
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                {total.toFixed(2)} €
              </span>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Passer la commande
            </button>
          </div>
        </>
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          items={items}
          total={total}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            clearCart();
            setIsCheckoutOpen(false);
            toast.success('Commande passée avec succès !');
          }}
        />
      )}
    </div>
  );
}

/**
 * Composant pour un article du panier
 */
function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
      )}
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-primary font-bold">{item.price.toFixed(2)} €</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-3 py-1 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-3 py-1 font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-800 p-1"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/**
 * Modal de checkout
 */
function CheckoutModal({
  items,
  total,
  onClose,
  onSuccess,
}: {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Créer la session de paiement
    const createPaymentIntent = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
              name: item.name,
            })),
            amount: Math.round(total * 100), // Conversion en centimes
          }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Erreur création PaymentIntent:', error);
        toast.error('Erreur lors de l\'initialisation du paiement');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [items, total]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#d4af37',
      colorBackground: '#ffffff',
      colorText: '#1a1a1a',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Finaliser la commande
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Résumé de la commande */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Résumé</h3>
              <CartSummary items={items} total={total} />
            </div>

            {/* Formulaire de paiement */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Paiement sécurisé
              </h3>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    clientSecret={clientSecret}
                    onSuccess={onSuccess}
                    onError={(error) => {
                      toast.error(error);
                      onClose();
                    }}
                  />
                </Elements>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Erreur d'initialisation du paiement
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Résumé du panier
 */
function CartSummary({ items, total }: CartSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toFixed(2)} €</span>
          </div>
        ))}
      </div>
      
      <div className="border-t mt-3 pt-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Formulaire de checkout Stripe
 */
function CheckoutForm({ clientSecret, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          receipt_email: email,
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Erreur paiement:', error);
        onError(error.message || 'Erreur lors du paiement');
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error('Erreur:', error);
      onError('Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email de confirmation
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Informations de paiement
        </label>
        <div className="border border-gray-300 rounded-lg p-3">
          <PaymentElement />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Traitement...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Payer maintenant
          </>
        )}
      </button>

      <div className="text-xs text-gray-500 text-center">
        <p className="flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Paiement sécurisé par Stripe
        </p>
      </div>
    </form>
  );
}

/**
 * Composant d'abonnement
 */
export function SubscriptionCard({
  title,
  price,
  features,
  priceId,
  popular = false,
}: {
  title: string;
  price: number;
  features: string[];
  priceId: string;
  popular?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Erreur abonnement:', error);
      toast.error('Erreur lors de la création de l\'abonnement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${popular ? 'ring-2 ring-primary' : ''}`}>
      {popular && (
        <div className="bg-primary text-white text-center py-1 px-3 rounded-full text-sm font-semibold mb-4">
          Populaire
        </div>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-primary">{price.toFixed(2)} €</span>
        <span className="text-gray-500">/mois</span>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-green-600">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
          popular
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Chargement...
          </>
        ) : (
          'S\'abonner'
        )}
      </button>
    </div>
  );
}

export default ShoppingCart;