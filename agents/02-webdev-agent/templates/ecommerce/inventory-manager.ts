/**
 * Gestionnaire d'inventaire avec intégration Neon DB MCP
 * Phase 2 - WebDev Agent
 */

import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Schemas de validation
export const ProductVariantSchema = z.object({
  id: z.string(),
  productId: z.string(),
  sku: z.string(),
  name: z.string(),
  attributes: z.record(z.string()), // couleur, taille, etc.
  price: z.number().positive(),
  cost: z.number().nonnegative().optional(),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
    unit: z.enum(['cm', 'in']).default('cm'),
  }).optional(),
  images: z.array(z.string()).default([]),
});

export const InventoryItemSchema = z.object({
  id: z.string(),
  variantId: z.string(),
  warehouseId: z.string(),
  quantity: z.number().int().nonnegative(),
  reserved: z.number().int().nonnegative().default(0),
  available: z.number().int().nonnegative(),
  reorderPoint: z.number().int().nonnegative().default(10),
  reorderQuantity: z.number().int().positive().default(50),
  lastRestocked: z.date().optional(),
  expiryDate: z.date().optional(),
  batchNumber: z.string().optional(),
  cost: z.number().nonnegative().optional(),
  location: z.string().optional(), // Position dans l'entrepôt
});

export const WarehouseSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  isActive: z.boolean().default(true),
  priority: z.number().int().default(1),
});

export const StockMovementSchema = z.object({
  id: z.string(),
  variantId: z.string(),
  warehouseId: z.string(),
  type: z.enum(['IN', 'OUT', 'TRANSFER', 'ADJUSTMENT', 'RESERVED', 'UNRESERVED']),
  quantity: z.number().int(),
  reason: z.string(),
  reference: z.string().optional(), // Numéro de commande, etc.
  previousQuantity: z.number().int(),
  newQuantity: z.number().int(),
  createdAt: z.date(),
  createdBy: z.string(),
  metadata: z.record(z.any()).optional(),
});

// Types
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type Warehouse = z.infer<typeof WarehouseSchema>;
export type StockMovement = z.infer<typeof StockMovementSchema>;

/**
 * Gestionnaire principal d'inventaire
 */
export class InventoryManager {
  /**
   * Vérification de la disponibilité d'un produit
   */
  static async checkAvailability(variantId: string, quantity: number, warehouseId?: string): Promise<{
    available: boolean;
    stock: number;
    warehouse?: string;
  }> {
    try {
      const whereClause = warehouseId 
        ? { variantId, warehouseId }
        : { variantId };

      const inventory = await prisma.inventory.findMany({
        where: whereClause,
        include: {
          warehouse: true,
        },
        orderBy: {
          warehouse: {
            priority: 'asc',
          },
        },
      });

      let totalAvailable = 0;
      let selectedWarehouse = '';

      for (const item of inventory) {
        const available = item.quantity - item.reserved;
        totalAvailable += available;

        if (available >= quantity && !selectedWarehouse) {
          selectedWarehouse = item.warehouseId;
        }
      }

      return {
        available: totalAvailable >= quantity,
        stock: totalAvailable,
        warehouse: selectedWarehouse || undefined,
      };
    } catch (error) {
      console.error('Erreur vérification disponibilité:', error);
      throw new Error('Impossible de vérifier la disponibilité');
    }
  }

  /**
   * Réservation de stock pour une commande
   */
  static async reserveStock(items: Array<{
    variantId: string;
    quantity: number;
    orderId: string;
  }>): Promise<{
    success: boolean;
    reservations: Array<{
      variantId: string;
      warehouseId: string;
      quantity: number;
    }>;
    failures: Array<{
      variantId: string;
      reason: string;
    }>;
  }> {
    const reservations: Array<{
      variantId: string;
      warehouseId: string;
      quantity: number;
    }> = [];
    const failures: Array<{
      variantId: string;
      reason: string;
    }> = [];

    try {
      await prisma.$transaction(async (tx) => {
        for (const item of items) {
          const availability = await this.checkAvailability(item.variantId, item.quantity);
          
          if (!availability.available) {
            failures.push({
              variantId: item.variantId,
              reason: `Stock insuffisant (disponible: ${availability.stock}, demandé: ${item.quantity})`,
            });
            continue;
          }

          // Trouver le meilleur entrepôt
          const inventory = await tx.inventory.findFirst({
            where: {
              variantId: item.variantId,
              quantity: {
                gte: item.quantity,
              },
            },
            include: {
              warehouse: true,
            },
            orderBy: {
              warehouse: {
                priority: 'asc',
              },
            },
          });

          if (!inventory) {
            failures.push({
              variantId: item.variantId,
              reason: 'Aucun entrepôt avec stock suffisant',
            });
            continue;
          }

          // Réserver le stock
          await tx.inventory.update({
            where: { id: inventory.id },
            data: {
              reserved: {
                increment: item.quantity,
              },
            },
          });

          // Enregistrer le mouvement de stock
          await tx.stockMovement.create({
            data: {
              variantId: item.variantId,
              warehouseId: inventory.warehouseId,
              type: 'RESERVED',
              quantity: item.quantity,
              reason: `Réservation pour commande ${item.orderId}`,
              reference: item.orderId,
              previousQuantity: inventory.quantity - inventory.reserved,
              newQuantity: inventory.quantity - inventory.reserved - item.quantity,
              createdBy: 'system',
            },
          });

          reservations.push({
            variantId: item.variantId,
            warehouseId: inventory.warehouseId,
            quantity: item.quantity,
          });
        }
      });

      return {
        success: failures.length === 0,
        reservations,
        failures,
      };
    } catch (error) {
      console.error('Erreur réservation stock:', error);
      throw new Error('Impossible de réserver le stock');
    }
  }

  /**
   * Libération de stock réservé
   */
  static async unreserveStock(orderId: string): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        // Trouver toutes les réservations pour cette commande
        const reservations = await tx.stockMovement.findMany({
          where: {
            type: 'RESERVED',
            reference: orderId,
          },
        });

        for (const reservation of reservations) {
          // Libérer le stock réservé
          await tx.inventory.updateMany({
            where: {
              variantId: reservation.variantId,
              warehouseId: reservation.warehouseId,
            },
            data: {
              reserved: {
                decrement: reservation.quantity,
              },
            },
          });

          // Enregistrer le mouvement
          await tx.stockMovement.create({
            data: {
              variantId: reservation.variantId,
              warehouseId: reservation.warehouseId,
              type: 'UNRESERVED',
              quantity: reservation.quantity,
              reason: `Libération réservation commande ${orderId}`,
              reference: orderId,
              previousQuantity: reservation.newQuantity,
              newQuantity: reservation.previousQuantity,
              createdBy: 'system',
            },
          });
        }
      });
    } catch (error) {
      console.error('Erreur libération stock:', error);
      throw new Error('Impossible de libérer le stock');
    }
  }

  /**
   * Confirmation de sortie de stock (expédition)
   */
  static async confirmShipment(orderId: string): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        // Trouver toutes les réservations pour cette commande
        const reservations = await tx.stockMovement.findMany({
          where: {
            type: 'RESERVED',
            reference: orderId,
          },
        });

        for (const reservation of reservations) {
          // Décrémenter le stock physique et libérer la réservation
          await tx.inventory.updateMany({
            where: {
              variantId: reservation.variantId,
              warehouseId: reservation.warehouseId,
            },
            data: {
              quantity: {
                decrement: reservation.quantity,
              },
              reserved: {
                decrement: reservation.quantity,
              },
            },
          });

          // Enregistrer le mouvement
          await tx.stockMovement.create({
            data: {
              variantId: reservation.variantId,
              warehouseId: reservation.warehouseId,
              type: 'OUT',
              quantity: -reservation.quantity,
              reason: `Expédition commande ${orderId}`,
              reference: orderId,
              previousQuantity: reservation.previousQuantity,
              newQuantity: reservation.previousQuantity - reservation.quantity,
              createdBy: 'system',
            },
          });
        }
      });
    } catch (error) {
      console.error('Erreur confirmation expédition:', error);
      throw new Error('Impossible de confirmer l\'expédition');
    }
  }

  /**
   * Ajout de stock (réception)
   */
  static async addStock(
    variantId: string,
    warehouseId: string,
    quantity: number,
    reason: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        // Trouver ou créer l'entrée d'inventaire
        let inventory = await tx.inventory.findFirst({
          where: {
            variantId,
            warehouseId,
          },
        });

        const previousQuantity = inventory?.quantity || 0;

        if (inventory) {
          await tx.inventory.update({
            where: { id: inventory.id },
            data: {
              quantity: {
                increment: quantity,
              },
              lastRestocked: new Date(),
            },
          });
        } else {
          inventory = await tx.inventory.create({
            data: {
              variantId,
              warehouseId,
              quantity,
              reserved: 0,
              available: quantity,
              lastRestocked: new Date(),
            },
          });
        }

        // Enregistrer le mouvement
        await tx.stockMovement.create({
          data: {
            variantId,
            warehouseId,
            type: 'IN',
            quantity,
            reason,
            previousQuantity,
            newQuantity: previousQuantity + quantity,
            createdBy: 'system',
            metadata,
          },
        });
      });
    } catch (error) {
      console.error('Erreur ajout stock:', error);
      throw new Error('Impossible d\'ajouter le stock');
    }
  }

  /**
   * Ajustement de stock (correction d'inventaire)
   */
  static async adjustStock(
    variantId: string,
    warehouseId: string,
    newQuantity: number,
    reason: string
  ): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        const inventory = await tx.inventory.findFirst({
          where: {
            variantId,
            warehouseId,
          },
        });

        if (!inventory) {
          throw new Error('Article d\'inventaire non trouvé');
        }

        const previousQuantity = inventory.quantity;
        const adjustment = newQuantity - previousQuantity;

        await tx.inventory.update({
          where: { id: inventory.id },
          data: {
            quantity: newQuantity,
          },
        });

        // Enregistrer le mouvement
        await tx.stockMovement.create({
          data: {
            variantId,
            warehouseId,
            type: 'ADJUSTMENT',
            quantity: adjustment,
            reason,
            previousQuantity,
            newQuantity,
            createdBy: 'system',
          },
        });
      });
    } catch (error) {
      console.error('Erreur ajustement stock:', error);
      throw new Error('Impossible d\'ajuster le stock');
    }
  }

  /**
   * Transfert de stock entre entrepôts
   */
  static async transferStock(
    variantId: string,
    fromWarehouseId: string,
    toWarehouseId: string,
    quantity: number,
    reason: string
  ): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        // Vérifier la disponibilité dans l'entrepôt source
        const sourceInventory = await tx.inventory.findFirst({
          where: {
            variantId,
            warehouseId: fromWarehouseId,
          },
        });

        if (!sourceInventory || sourceInventory.quantity < quantity) {
          throw new Error('Stock insuffisant pour le transfert');
        }

        // Décrémenter le stock source
        await tx.inventory.update({
          where: { id: sourceInventory.id },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });

        // Incrémenter le stock destination
        const destinationInventory = await tx.inventory.findFirst({
          where: {
            variantId,
            warehouseId: toWarehouseId,
          },
        });

        if (destinationInventory) {
          await tx.inventory.update({
            where: { id: destinationInventory.id },
            data: {
              quantity: {
                increment: quantity,
              },
            },
          });
        } else {
          await tx.inventory.create({
            data: {
              variantId,
              warehouseId: toWarehouseId,
              quantity,
              reserved: 0,
              available: quantity,
            },
          });
        }

        // Enregistrer les mouvements
        await tx.stockMovement.createMany({
          data: [
            {
              variantId,
              warehouseId: fromWarehouseId,
              type: 'TRANSFER',
              quantity: -quantity,
              reason: `Transfert vers ${toWarehouseId}: ${reason}`,
              previousQuantity: sourceInventory.quantity,
              newQuantity: sourceInventory.quantity - quantity,
              createdBy: 'system',
            },
            {
              variantId,
              warehouseId: toWarehouseId,
              type: 'TRANSFER',
              quantity,
              reason: `Transfert depuis ${fromWarehouseId}: ${reason}`,
              previousQuantity: destinationInventory?.quantity || 0,
              newQuantity: (destinationInventory?.quantity || 0) + quantity,
              createdBy: 'system',
            },
          ],
        });
      });
    } catch (error) {
      console.error('Erreur transfert stock:', error);
      throw new Error('Impossible de transférer le stock');
    }
  }

  /**
   * Rapport de stock faible
   */
  static async getLowStockReport(warehouseId?: string): Promise<Array<{
    variant: ProductVariant;
    inventory: InventoryItem;
    warehouse: Warehouse;
  }>> {
    try {
      const whereClause = warehouseId ? { warehouseId } : {};

      const lowStockItems = await prisma.inventory.findMany({
        where: {
          ...whereClause,
          OR: [
            {
              quantity: {
                lte: prisma.inventory.fields.reorderPoint,
              },
            },
            {
              available: {
                lte: 0,
              },
            },
          ],
        },
        include: {
          variant: true,
          warehouse: true,
        },
      });

      return lowStockItems as any;
    } catch (error) {
      console.error('Erreur rapport stock faible:', error);
      throw new Error('Impossible de générer le rapport de stock faible');
    }
  }

  /**
   * Historique des mouvements de stock
   */
  static async getStockHistory(
    variantId: string,
    warehouseId?: string,
    limit: number = 50
  ): Promise<StockMovement[]> {
    try {
      const whereClause = warehouseId 
        ? { variantId, warehouseId }
        : { variantId };

      const movements = await prisma.stockMovement.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });

      return movements as StockMovement[];
    } catch (error) {
      console.error('Erreur historique stock:', error);
      throw new Error('Impossible de récupérer l\'historique');
    }
  }

  /**
   * Calcul de la valeur du stock
   */
  static async calculateStockValue(warehouseId?: string): Promise<{
    totalValue: number;
    totalItems: number;
    byCategory: Record<string, { value: number; items: number }>;
  }> {
    try {
      const whereClause = warehouseId ? { warehouseId } : {};

      const inventoryWithVariants = await prisma.inventory.findMany({
        where: whereClause,
        include: {
          variant: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      });

      let totalValue = 0;
      let totalItems = 0;
      const byCategory: Record<string, { value: number; items: number }> = {};

      for (const item of inventoryWithVariants) {
        const cost = item.cost || item.variant.cost || item.variant.price;
        const value = cost * item.quantity;
        
        totalValue += value;
        totalItems += item.quantity;

        const categoryName = item.variant.product.category?.name || 'Sans catégorie';
        if (!byCategory[categoryName]) {
          byCategory[categoryName] = { value: 0, items: 0 };
        }
        
        byCategory[categoryName].value += value;
        byCategory[categoryName].items += item.quantity;
      }

      return {
        totalValue,
        totalItems,
        byCategory,
      };
    } catch (error) {
      console.error('Erreur calcul valeur stock:', error);
      throw new Error('Impossible de calculer la valeur du stock');
    }
  }
}

export default InventoryManager;