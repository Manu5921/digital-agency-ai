/**
 * Store Zustand pour le panier e-commerce persistant
 * Phase 2 - WebDev Agent
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { z } from 'zod';

// Schemas de validation
export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive().int(),
  image: z.string().optional(),
  variant: z.object({
    id: z.string(),
    name: z.string(),
    options: z.record(z.string()),
  }).optional(),
  metadata: z.record(z.any()).optional(),
});

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  total: z.number().nonnegative(),
  itemCount: z.number().nonnegative().int(),
  currency: z.string().default('EUR'),
  discounts: z.array(z.object({
    code: z.string(),
    type: z.enum(['percentage', 'fixed']),
    value: z.number(),
    description: z.string(),
  })).default([]),
  shipping: z.object({
    method: z.string(),
    cost: z.number().nonnegative(),
    estimatedDays: z.number().int().optional(),
  }).optional(),
  tax: z.object({
    rate: z.number().min(0).max(1),
    amount: z.number().nonnegative(),
  }).optional(),
});

export const WishlistSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string().optional(),
    addedAt: z.string(),
  })),
});

// Types
export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type WishlistItem = z.infer<typeof WishlistSchema>['items'][0];
export type Discount = Cart['discounts'][0];
export type ShippingMethod = Cart['shipping'];

// Interface du store du panier
interface CartStore {
  // État
  items: CartItem[];
  total: number;
  itemCount: number;
  currency: string;
  discounts: Discount[];
  shipping: ShippingMethod | null;
  tax: Cart['tax'] | null;
  isOpen: boolean;

  // Actions du panier
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Actions des remises
  applyDiscount: (discount: Discount) => void;
  removeDiscount: (code: string) => void;
  
  // Actions de livraison
  setShipping: (shipping: ShippingMethod) => void;
  
  // Actions de taxe
  setTax: (tax: Cart['tax']) => void;
  
  // Actions UI
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Utilitaires
  getItemById: (itemId: string) => CartItem | undefined;
  calculateSubtotal: () => number;
  calculateTotalWithTax: () => number;
  calculateDiscount: () => number;
  isItemInCart: (itemId: string) => boolean;
}

// Interface du store de la wishlist
interface WishlistStore {
  items: WishlistItem[];
  
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: string) => boolean;
  moveToCart: (itemId: string, addToCart: (item: Omit<CartItem, 'quantity'>) => void) => void;
}

/**
 * Store principal du panier avec persistance
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // État initial
      items: [],
      total: 0,
      itemCount: 0,
      currency: 'EUR',
      discounts: [],
      shipping: null,
      tax: null,
      isOpen: false,

      // Actions du panier
      addItem: (newItem, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => 
            item.id === newItem.id && 
            JSON.stringify(item.variant) === JSON.stringify(newItem.variant)
          );

          let updatedItems: CartItem[];
          
          if (existingItem) {
            // Mettre à jour la quantité si l'item existe
            updatedItems = state.items.map(item =>
              item.id === existingItem.id && 
              JSON.stringify(item.variant) === JSON.stringify(existingItem.variant)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Ajouter un nouvel item
            const cartItem: CartItem = { ...newItem, quantity };
            updatedItems = [...state.items, cartItem];
          }

          const newItemCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
          const newTotal = get().calculateSubtotal();

          return {
            items: updatedItems,
            itemCount: newItemCount,
            total: newTotal,
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.id !== itemId);
          const newItemCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
          
          return {
            items: updatedItems,
            itemCount: newItemCount,
            total: get().calculateSubtotal(),
          };
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          );
          const newItemCount = updatedItems.reduce((total, item) => total + item.quantity, 0);

          return {
            items: updatedItems,
            itemCount: newItemCount,
            total: get().calculateSubtotal(),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
          discounts: [],
          shipping: null,
          tax: null,
        });
      },

      // Actions des remises
      applyDiscount: (discount) => {
        set((state) => {
          const existingDiscount = state.discounts.find(d => d.code === discount.code);
          if (existingDiscount) return state;

          return {
            discounts: [...state.discounts, discount],
            total: get().calculateSubtotal(),
          };
        });
      },

      removeDiscount: (code) => {
        set((state) => ({
          discounts: state.discounts.filter(d => d.code !== code),
          total: get().calculateSubtotal(),
        }));
      },

      // Actions de livraison
      setShipping: (shipping) => {
        set({ shipping, total: get().calculateSubtotal() });
      },

      // Actions de taxe
      setTax: (tax) => {
        set({ tax, total: get().calculateTotalWithTax() });
      },

      // Actions UI
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Utilitaires
      getItemById: (itemId) => {
        return get().items.find(item => item.id === itemId);
      },

      calculateSubtotal: () => {
        const state = get();
        const itemsTotal = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0
        );
        
        const discountAmount = get().calculateDiscount();
        const shippingCost = state.shipping?.cost || 0;
        
        return Math.max(0, itemsTotal - discountAmount + shippingCost);
      },

      calculateTotalWithTax: () => {
        const state = get();
        const subtotal = get().calculateSubtotal();
        const taxAmount = state.tax ? subtotal * state.tax.rate : 0;
        
        return subtotal + taxAmount;
      },

      calculateDiscount: () => {
        const state = get();
        const itemsTotal = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0
        );

        return state.discounts.reduce((total, discount) => {
          if (discount.type === 'percentage') {
            return total + (itemsTotal * (discount.value / 100));
          } else {
            return total + discount.value;
          }
        }, 0);
      },

      isItemInCart: (itemId) => {
        return get().items.some(item => item.id === itemId);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
        discounts: state.discounts,
        shipping: state.shipping,
        tax: state.tax,
      }),
    }
  )
);

/**
 * Store de la wishlist avec persistance
 */
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        set((state) => {
          const exists = state.items.some(wishlistItem => wishlistItem.id === item.id);
          if (exists) return state;

          const newItem: WishlistItem = {
            ...item,
            addedAt: new Date().toISOString(),
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeFromWishlist: (itemId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== itemId),
        }));
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (itemId) => {
        return get().items.some(item => item.id === itemId);
      },

      moveToCart: (itemId, addToCart) => {
        const state = get();
        const wishlistItem = state.items.find(item => item.id === itemId);
        
        if (wishlistItem) {
          addToCart({
            id: wishlistItem.id,
            name: wishlistItem.name,
            price: wishlistItem.price,
            image: wishlistItem.image,
          });
          
          get().removeFromWishlist(itemId);
        }
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Store pour les commandes récentes
 */
interface RecentOrdersStore {
  orders: Array<{
    id: string;
    total: number;
    status: string;
    createdAt: string;
    items: CartItem[];
  }>;
  
  addOrder: (order: RecentOrdersStore['orders'][0]) => void;
  getOrderById: (orderId: string) => RecentOrdersStore['orders'][0] | undefined;
  clearOrders: () => void;
}

export const useRecentOrdersStore = create<RecentOrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders.slice(0, 9)], // Garder seulement les 10 dernières commandes
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },

      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: 'recent-orders-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Hooks personnalisés pour faciliter l'utilisation
 */
export const useCart = () => {
  const store = useCartStore();
  
  return {
    ...store,
    isEmpty: store.items.length === 0,
    totalItems: store.itemCount,
    formattedTotal: new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: store.currency,
    }).format(store.total),
  };
};

export const useWishlist = () => {
  const store = useWishlistStore();
  const addToCart = useCartStore(state => state.addItem);
  
  return {
    ...store,
    isEmpty: store.items.length === 0,
    totalItems: store.items.length,
    moveToCart: (itemId: string) => store.moveToCart(itemId, addToCart),
  };
};

/**
 * Utilitaires pour la synchronisation avec le serveur
 */
export class CartSync {
  /**
   * Synchronise le panier local avec le serveur
   */
  static async syncWithServer(userId: string) {
    try {
      const localCart = useCartStore.getState();
      
      // Envoyer le panier local au serveur
      const response = await fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          cart: {
            items: localCart.items,
            discounts: localCart.discounts,
            shipping: localCart.shipping,
          },
        }),
      });

      if (response.ok) {
        const serverCart = await response.json();
        
        // Mettre à jour le panier local avec les données du serveur
        useCartStore.setState({
          items: serverCart.items || [],
          discounts: serverCart.discounts || [],
          shipping: serverCart.shipping || null,
        });
      }
    } catch (error) {
      console.error('Erreur synchronisation panier:', error);
    }
  }

  /**
   * Sauvegarde le panier sur le serveur
   */
  static async saveToServer(userId: string) {
    try {
      const cart = useCartStore.getState();
      
      await fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          cart: {
            items: cart.items,
            discounts: cart.discounts,
            shipping: cart.shipping,
            total: cart.total,
          },
        }),
      });
    } catch (error) {
      console.error('Erreur sauvegarde panier:', error);
    }
  }

  /**
   * Charge le panier depuis le serveur
   */
  static async loadFromServer(userId: string) {
    try {
      const response = await fetch(`/api/cart/load?userId=${userId}`);
      
      if (response.ok) {
        const serverCart = await response.json();
        
        useCartStore.setState({
          items: serverCart.items || [],
          discounts: serverCart.discounts || [],
          shipping: serverCart.shipping || null,
        });
      }
    } catch (error) {
      console.error('Erreur chargement panier:', error);
    }
  }
}

export default useCartStore;