/**
 * Système de gestion des commandes e-commerce
 * Phase 2 - WebDev Agent
 */

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { InventoryManager } from './inventory-manager';
import { StripeIntegration } from '../workflows/stripe-integration';

// Schemas de validation
export const AddressSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  company: z.string().optional(),
  street: z.string().min(5),
  street2: z.string().optional(),
  city: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  phone: z.string().optional(),
});

export const OrderItemSchema = z.object({
  variantId: z.string(),
  productName: z.string(),
  variantName: z.string().optional(),
  sku: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  totalPrice: z.number().positive(),
  image: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const OrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerId: z.string().optional(),
  customerEmail: z.string().email(),
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'PROCESSING', 
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED'
  ]),
  paymentStatus: z.enum([
    'PENDING',
    'PAID',
    'FAILED',
    'CANCELLED',
    'REFUNDED'
  ]),
  items: z.array(OrderItemSchema),
  subtotal: z.number().nonnegative(),
  taxAmount: z.number().nonnegative().default(0),
  shippingAmount: z.number().nonnegative().default(0),
  discountAmount: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),
  currency: z.string().default('EUR'),
  billingAddress: AddressSchema,
  shippingAddress: AddressSchema,
  shippingMethod: z.object({
    id: z.string(),
    name: z.string(),
    carrier: z.string(),
    estimatedDays: z.number().int().optional(),
    trackingNumber: z.string().optional(),
  }).optional(),
  paymentMethod: z.object({
    type: z.string(),
    last4: z.string().optional(),
    brand: z.string().optional(),
  }).optional(),
  stripePaymentIntentId: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  processedAt: z.date().optional(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
});

export const ShippingMethodSchema = z.object({
  id: z.string(),
  name: z.string(),
  carrier: z.string(),
  cost: z.number().nonnegative(),
  estimatedDays: z.number().int(),
  maxWeight: z.number().positive().optional(),
  countries: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

// Types
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type ShippingMethod = z.infer<typeof ShippingMethodSchema>;
export type OrderStatus = Order['status'];
export type PaymentStatus = Order['paymentStatus'];

/**
 * Gestionnaire principal des commandes
 */
export class OrderManager {
  private stripe: StripeIntegration;

  constructor() {
    this.stripe = new StripeIntegration();
  }

  /**
   * Crée une nouvelle commande
   */
  async createOrder(orderData: {
    items: Array<{
      variantId: string;
      quantity: number;
    }>;
    customerEmail: string;
    customerId?: string;
    billingAddress: Address;
    shippingAddress: Address;
    shippingMethodId?: string;
    notes?: string;
  }): Promise<{ order: Order; paymentIntent: any }> {
    try {
      return await prisma.$transaction(async (tx) => {
        // 1. Valider et enrichir les articles
        const enrichedItems: OrderItem[] = [];
        let subtotal = 0;

        for (const item of orderData.items) {
          const variant = await tx.productVariant.findUnique({
            where: { id: item.variantId },
            include: {
              product: true,
            },
          });

          if (!variant) {
            throw new Error(`Variante ${item.variantId} non trouvée`);
          }

          // Vérifier la disponibilité
          const availability = await InventoryManager.checkAvailability(
            item.variantId,
            item.quantity
          );

          if (!availability.available) {
            throw new Error(
              `Stock insuffisant pour ${variant.product.name} (disponible: ${availability.stock})`
            );
          }

          const totalPrice = variant.price * item.quantity;
          subtotal += totalPrice;

          enrichedItems.push({
            variantId: variant.id,
            productName: variant.product.name,
            variantName: variant.name,
            sku: variant.sku,
            quantity: item.quantity,
            unitPrice: variant.price,
            totalPrice,
            image: variant.images[0],
          });
        }

        // 2. Calculer les frais de livraison
        let shippingAmount = 0;
        let shippingMethod = null;

        if (orderData.shippingMethodId) {
          const shipping = await tx.shippingMethod.findUnique({
            where: { id: orderData.shippingMethodId },
          });

          if (shipping && shipping.isActive) {
            shippingAmount = shipping.cost;
            shippingMethod = {
              id: shipping.id,
              name: shipping.name,
              carrier: shipping.carrier,
              estimatedDays: shipping.estimatedDays,
            };
          }
        }

        // 3. Calculer les taxes (exemple: 20% TVA)
        const taxRate = 0.20;
        const taxAmount = (subtotal + shippingAmount) * taxRate;

        // 4. Calculer le total
        const total = subtotal + shippingAmount + taxAmount;

        // 5. Générer le numéro de commande
        const orderNumber = await this.generateOrderNumber();

        // 6. Créer la commande
        const order = await tx.order.create({
          data: {
            orderNumber,
            customerId: orderData.customerId,
            customerEmail: orderData.customerEmail,
            status: 'PENDING',
            paymentStatus: 'PENDING',
            subtotal,
            taxAmount,
            shippingAmount,
            discountAmount: 0,
            total,
            currency: 'EUR',
            billingAddress: orderData.billingAddress,
            shippingAddress: orderData.shippingAddress,
            shippingMethod,
            notes: orderData.notes,
            items: {
              create: enrichedItems.map(item => ({
                variantId: item.variantId,
                productName: item.productName,
                variantName: item.variantName,
                sku: item.sku,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
                image: item.image,
              })),
            },
          },
          include: {
            items: true,
          },
        });

        // 7. Réserver le stock
        const stockReservation = await InventoryManager.reserveStock(
          orderData.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
            orderId: order.id,
          }))
        );

        if (!stockReservation.success) {
          throw new Error(
            `Impossible de réserver le stock: ${stockReservation.failures.map(f => f.reason).join(', ')}`
          );
        }

        // 8. Créer l'intention de paiement Stripe
        const paymentIntent = await this.stripe.createCheckoutSession({
          items: enrichedItems.map(item => ({
            productId: item.variantId,
            quantity: item.quantity,
            price: item.unitPrice,
            name: item.productName,
          })),
          successUrl: `${process.env.NEXT_PUBLIC_URL}/orders/${order.id}/success`,
          cancelUrl: `${process.env.NEXT_PUBLIC_URL}/orders/${order.id}/cancel`,
          customerEmail: orderData.customerEmail,
          metadata: {
            orderId: order.id,
            orderNumber: order.orderNumber,
          },
        });

        // 9. Mettre à jour la commande avec l'ID Stripe
        await tx.order.update({
          where: { id: order.id },
          data: {
            stripePaymentIntentId: paymentIntent.sessionId,
          },
        });

        return {
          order: order as Order,
          paymentIntent,
        };
      });
    } catch (error) {
      console.error('Erreur création commande:', error);
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de la création de la commande');
    }
  }

  /**
   * Met à jour le statut d'une commande
   */
  async updateOrderStatus(orderId: string, status: OrderStatus, notes?: string): Promise<Order> {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status,
          notes: notes ? `${notes}\n---\n${new Date().toISOString()}` : undefined,
          processedAt: status === 'PROCESSING' ? new Date() : undefined,
          shippedAt: status === 'SHIPPED' ? new Date() : undefined,
          deliveredAt: status === 'DELIVERED' ? new Date() : undefined,
        },
        include: {
          items: true,
        },
      });

      // Actions spécifiques selon le statut
      switch (status) {
        case 'CONFIRMED':
          await this.handleOrderConfirmation(orderId);
          break;
        case 'SHIPPED':
          await this.handleOrderShipment(orderId);
          break;
        case 'CANCELLED':
          await this.handleOrderCancellation(orderId);
          break;
      }

      return order as Order;
    } catch (error) {
      console.error('Erreur mise à jour statut commande:', error);
      throw new Error('Impossible de mettre à jour le statut de la commande');
    }
  }

  /**
   * Met à jour le statut de paiement
   */
  async updatePaymentStatus(orderId: string, paymentStatus: PaymentStatus): Promise<Order> {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus,
          status: paymentStatus === 'PAID' ? 'CONFIRMED' : undefined,
        },
        include: {
          items: true,
        },
      });

      if (paymentStatus === 'PAID') {
        await this.handlePaymentSuccess(orderId);
      } else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
        await this.handlePaymentFailure(orderId);
      }

      return order as Order;
    } catch (error) {
      console.error('Erreur mise à jour statut paiement:', error);
      throw new Error('Impossible de mettre à jour le statut de paiement');
    }
  }

  /**
   * Récupère une commande par ID
   */
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: true,
        },
      });

      return order as Order | null;
    } catch (error) {
      console.error('Erreur récupération commande:', error);
      throw new Error('Impossible de récupérer la commande');
    }
  }

  /**
   * Récupère les commandes d'un client
   */
  async getCustomerOrders(customerEmail: string, limit: number = 10): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: { customerEmail },
        include: {
          items: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });

      return orders as Order[];
    } catch (error) {
      console.error('Erreur récupération commandes client:', error);
      throw new Error('Impossible de récupérer les commandes du client');
    }
  }

  /**
   * Recherche de commandes avec filtres
   */
  async searchOrders(filters: {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    customerEmail?: string;
    orderNumber?: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ orders: Order[]; total: number }> {
    try {
      const where: any = {};

      if (filters.status) where.status = filters.status;
      if (filters.paymentStatus) where.paymentStatus = filters.paymentStatus;
      if (filters.customerEmail) where.customerEmail = { contains: filters.customerEmail };
      if (filters.orderNumber) where.orderNumber = { contains: filters.orderNumber };
      if (filters.dateFrom || filters.dateTo) {
        where.createdAt = {};
        if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
        if (filters.dateTo) where.createdAt.lte = filters.dateTo;
      }

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          include: {
            items: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: filters.limit || 20,
          skip: filters.offset || 0,
        }),
        prisma.order.count({ where }),
      ]);

      return {
        orders: orders as Order[],
        total,
      };
    } catch (error) {
      console.error('Erreur recherche commandes:', error);
      throw new Error('Impossible de rechercher les commandes');
    }
  }

  /**
   * Ajoute un numéro de suivi à une commande
   */
  async addTrackingNumber(orderId: string, trackingNumber: string): Promise<Order> {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          shippingMethod: {
            update: {
              trackingNumber,
            },
          },
          status: 'SHIPPED',
          shippedAt: new Date(),
        },
        include: {
          items: true,
        },
      });

      // Envoyer email de notification de suivi
      await this.sendTrackingNotification(order.customerEmail, order.orderNumber, trackingNumber);

      return order as Order;
    } catch (error) {
      console.error('Erreur ajout numéro de suivi:', error);
      throw new Error('Impossible d\'ajouter le numéro de suivi');
    }
  }

  /**
   * Calcule les statistiques des commandes
   */
  async getOrderStatistics(dateFrom?: Date, dateTo?: Date): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<OrderStatus, number>;
    topProducts: Array<{
      productName: string;
      quantity: number;
      revenue: number;
    }>;
  }> {
    try {
      const where: any = {};
      if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) where.createdAt.gte = dateFrom;
        if (dateTo) where.createdAt.lte = dateTo;
      }

      const [orders, orderItems] = await Promise.all([
        prisma.order.findMany({
          where,
          select: {
            status: true,
            total: true,
          },
        }),
        prisma.orderItem.findMany({
          where: {
            order: where,
          },
          select: {
            productName: true,
            quantity: true,
            totalPrice: true,
          },
        }),
      ]);

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const ordersByStatus = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<OrderStatus, number>);

      const productStats = orderItems.reduce((acc, item) => {
        if (!acc[item.productName]) {
          acc[item.productName] = { quantity: 0, revenue: 0 };
        }
        acc[item.productName].quantity += item.quantity;
        acc[item.productName].revenue += item.totalPrice;
        return acc;
      }, {} as Record<string, { quantity: number; revenue: number }>);

      const topProducts = Object.entries(productStats)
        .map(([productName, stats]) => ({
          productName,
          quantity: stats.quantity,
          revenue: stats.revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

      return {
        totalOrders,
        totalRevenue,
        averageOrderValue,
        ordersByStatus,
        topProducts,
      };
    } catch (error) {
      console.error('Erreur calcul statistiques:', error);
      throw new Error('Impossible de calculer les statistiques');
    }
  }

  /**
   * Gestion des actions spécifiques
   */
  private async handleOrderConfirmation(orderId: string): Promise<void> {
    // Envoyer email de confirmation
    const order = await this.getOrderById(orderId);
    if (order) {
      await this.sendOrderConfirmation(order.customerEmail, order.orderNumber);
    }
  }

  private async handleOrderShipment(orderId: string): Promise<void> {
    // Confirmer la sortie de stock
    await InventoryManager.confirmShipment(orderId);
  }

  private async handleOrderCancellation(orderId: string): Promise<void> {
    // Libérer le stock réservé
    await InventoryManager.unreserveStock(orderId);
  }

  private async handlePaymentSuccess(orderId: string): Promise<void> {
    // Actions après paiement réussi
    await this.updateOrderStatus(orderId, 'CONFIRMED');
  }

  private async handlePaymentFailure(orderId: string): Promise<void> {
    // Libérer le stock en cas d'échec de paiement
    await InventoryManager.unreserveStock(orderId);
  }

  /**
   * Génère un numéro de commande unique
   */
  private async generateOrderNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    const prefix = `ORD${year}${month}${day}`;
    
    // Trouver le dernier numéro du jour
    const lastOrder = await prisma.order.findFirst({
      where: {
        orderNumber: {
          startsWith: prefix,
        },
      },
      orderBy: {
        orderNumber: 'desc',
      },
    });

    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${sequence.toString().padStart(4, '0')}`;
  }

  /**
   * Notifications par email (à implémenter selon le service utilisé)
   */
  private async sendOrderConfirmation(email: string, orderNumber: string): Promise<void> {
    // TODO: Implémenter l'envoi d'email
    console.log(`Email confirmation commande ${orderNumber} envoyé à ${email}`);
  }

  private async sendTrackingNotification(email: string, orderNumber: string, trackingNumber: string): Promise<void> {
    // TODO: Implémenter l'envoi d'email
    console.log(`Email suivi commande ${orderNumber} (${trackingNumber}) envoyé à ${email}`);
  }
}

export default OrderManager;