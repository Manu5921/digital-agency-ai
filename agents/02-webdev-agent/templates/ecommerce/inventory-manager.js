"use strict";
/**
 * Gestionnaire d'inventaire avec intégration Neon DB MCP
 * Phase 2 - WebDev Agent
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryManager = exports.StockMovementSchema = exports.WarehouseSchema = exports.InventoryItemSchema = exports.ProductVariantSchema = void 0;
var zod_1 = require("zod");
var prisma_1 = require("@/lib/prisma");
// Schemas de validation
exports.ProductVariantSchema = zod_1.z.object({
    id: zod_1.z.string(),
    productId: zod_1.z.string(),
    sku: zod_1.z.string(),
    name: zod_1.z.string(),
    attributes: zod_1.z.record(zod_1.z.string()), // couleur, taille, etc.
    price: zod_1.z.number().positive(),
    cost: zod_1.z.number().nonnegative().optional(),
    weight: zod_1.z.number().positive().optional(),
    dimensions: zod_1.z.object({
        length: zod_1.z.number().positive(),
        width: zod_1.z.number().positive(),
        height: zod_1.z.number().positive(),
        unit: zod_1.z.enum(['cm', 'in']).default('cm'),
    }).optional(),
    images: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.InventoryItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    variantId: zod_1.z.string(),
    warehouseId: zod_1.z.string(),
    quantity: zod_1.z.number().int().nonnegative(),
    reserved: zod_1.z.number().int().nonnegative().default(0),
    available: zod_1.z.number().int().nonnegative(),
    reorderPoint: zod_1.z.number().int().nonnegative().default(10),
    reorderQuantity: zod_1.z.number().int().positive().default(50),
    lastRestocked: zod_1.z.date().optional(),
    expiryDate: zod_1.z.date().optional(),
    batchNumber: zod_1.z.string().optional(),
    cost: zod_1.z.number().nonnegative().optional(),
    location: zod_1.z.string().optional(), // Position dans l'entrepôt
});
exports.WarehouseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        postalCode: zod_1.z.string(),
        country: zod_1.z.string(),
    }),
    isActive: zod_1.z.boolean().default(true),
    priority: zod_1.z.number().int().default(1),
});
exports.StockMovementSchema = zod_1.z.object({
    id: zod_1.z.string(),
    variantId: zod_1.z.string(),
    warehouseId: zod_1.z.string(),
    type: zod_1.z.enum(['IN', 'OUT', 'TRANSFER', 'ADJUSTMENT', 'RESERVED', 'UNRESERVED']),
    quantity: zod_1.z.number().int(),
    reason: zod_1.z.string(),
    reference: zod_1.z.string().optional(), // Numéro de commande, etc.
    previousQuantity: zod_1.z.number().int(),
    newQuantity: zod_1.z.number().int(),
    createdAt: zod_1.z.date(),
    createdBy: zod_1.z.string(),
    metadata: zod_1.z.record(zod_1.z.any()).optional(),
});
/**
 * Gestionnaire principal d'inventaire
 */
var InventoryManager = /** @class */ (function () {
    function InventoryManager() {
    }
    /**
     * Vérification de la disponibilité d'un produit
     */
    InventoryManager.checkAvailability = function (variantId, quantity, warehouseId) {
        return __awaiter(this, void 0, void 0, function () {
            var whereClause, inventory, totalAvailable, selectedWarehouse, _i, inventory_1, item, available, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        whereClause = warehouseId
                            ? { variantId: variantId, warehouseId: warehouseId }
                            : { variantId: variantId };
                        return [4 /*yield*/, prisma_1.prisma.inventory.findMany({
                                where: whereClause,
                                include: {
                                    warehouse: true,
                                },
                                orderBy: {
                                    warehouse: {
                                        priority: 'asc',
                                    },
                                },
                            })];
                    case 1:
                        inventory = _a.sent();
                        totalAvailable = 0;
                        selectedWarehouse = '';
                        for (_i = 0, inventory_1 = inventory; _i < inventory_1.length; _i++) {
                            item = inventory_1[_i];
                            available = item.quantity - item.reserved;
                            totalAvailable += available;
                            if (available >= quantity && !selectedWarehouse) {
                                selectedWarehouse = item.warehouseId;
                            }
                        }
                        return [2 /*return*/, {
                                available: totalAvailable >= quantity,
                                stock: totalAvailable,
                                warehouse: selectedWarehouse || undefined,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erreur vérification disponibilité:', error_1);
                        throw new Error('Impossible de vérifier la disponibilité');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Réservation de stock pour une commande
     */
    InventoryManager.reserveStock = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var reservations, failures, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reservations = [];
                        failures = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma_1.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var _i, items_1, item, availability, inventory;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _i = 0, items_1 = items;
                                            _a.label = 1;
                                        case 1:
                                            if (!(_i < items_1.length)) return [3 /*break*/, 7];
                                            item = items_1[_i];
                                            return [4 /*yield*/, this.checkAvailability(item.variantId, item.quantity)];
                                        case 2:
                                            availability = _a.sent();
                                            if (!availability.available) {
                                                failures.push({
                                                    variantId: item.variantId,
                                                    reason: "Stock insuffisant (disponible: ".concat(availability.stock, ", demand\u00E9: ").concat(item.quantity, ")"),
                                                });
                                                return [3 /*break*/, 6];
                                            }
                                            return [4 /*yield*/, tx.inventory.findFirst({
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
                                                })];
                                        case 3:
                                            inventory = _a.sent();
                                            if (!inventory) {
                                                failures.push({
                                                    variantId: item.variantId,
                                                    reason: 'Aucun entrepôt avec stock suffisant',
                                                });
                                                return [3 /*break*/, 6];
                                            }
                                            // Réserver le stock
                                            return [4 /*yield*/, tx.inventory.update({
                                                    where: { id: inventory.id },
                                                    data: {
                                                        reserved: {
                                                            increment: item.quantity,
                                                        },
                                                    },
                                                })];
                                        case 4:
                                            // Réserver le stock
                                            _a.sent();
                                            // Enregistrer le mouvement de stock
                                            return [4 /*yield*/, tx.stockMovement.create({
                                                    data: {
                                                        variantId: item.variantId,
                                                        warehouseId: inventory.warehouseId,
                                                        type: 'RESERVED',
                                                        quantity: item.quantity,
                                                        reason: "R\u00E9servation pour commande ".concat(item.orderId),
                                                        reference: item.orderId,
                                                        previousQuantity: inventory.quantity - inventory.reserved,
                                                        newQuantity: inventory.quantity - inventory.reserved - item.quantity,
                                                        createdBy: 'system',
                                                    },
                                                })];
                                        case 5:
                                            // Enregistrer le mouvement de stock
                                            _a.sent();
                                            reservations.push({
                                                variantId: item.variantId,
                                                warehouseId: inventory.warehouseId,
                                                quantity: item.quantity,
                                            });
                                            _a.label = 6;
                                        case 6:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                success: failures.length === 0,
                                reservations: reservations,
                                failures: failures,
                            }];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Erreur réservation stock:', error_2);
                        throw new Error('Impossible de réserver le stock');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Libération de stock réservé
     */
    InventoryManager.unreserveStock = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var reservations, _i, reservations_1, reservation;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.stockMovement.findMany({
                                                where: {
                                                    type: 'RESERVED',
                                                    reference: orderId,
                                                },
                                            })];
                                        case 1:
                                            reservations = _a.sent();
                                            _i = 0, reservations_1 = reservations;
                                            _a.label = 2;
                                        case 2:
                                            if (!(_i < reservations_1.length)) return [3 /*break*/, 6];
                                            reservation = reservations_1[_i];
                                            // Libérer le stock réservé
                                            return [4 /*yield*/, tx.inventory.updateMany({
                                                    where: {
                                                        variantId: reservation.variantId,
                                                        warehouseId: reservation.warehouseId,
                                                    },
                                                    data: {
                                                        reserved: {
                                                            decrement: reservation.quantity,
                                                        },
                                                    },
                                                })];
                                        case 3:
                                            // Libérer le stock réservé
                                            _a.sent();
                                            // Enregistrer le mouvement
                                            return [4 /*yield*/, tx.stockMovement.create({
                                                    data: {
                                                        variantId: reservation.variantId,
                                                        warehouseId: reservation.warehouseId,
                                                        type: 'UNRESERVED',
                                                        quantity: reservation.quantity,
                                                        reason: "Lib\u00E9ration r\u00E9servation commande ".concat(orderId),
                                                        reference: orderId,
                                                        previousQuantity: reservation.newQuantity,
                                                        newQuantity: reservation.previousQuantity,
                                                        createdBy: 'system',
                                                    },
                                                })];
                                        case 4:
                                            // Enregistrer le mouvement
                                            _a.sent();
                                            _a.label = 5;
                                        case 5:
                                            _i++;
                                            return [3 /*break*/, 2];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Erreur libération stock:', error_3);
                        throw new Error('Impossible de libérer le stock');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Confirmation de sortie de stock (expédition)
     */
    InventoryManager.confirmShipment = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var reservations, _i, reservations_2, reservation;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.stockMovement.findMany({
                                                where: {
                                                    type: 'RESERVED',
                                                    reference: orderId,
                                                },
                                            })];
                                        case 1:
                                            reservations = _a.sent();
                                            _i = 0, reservations_2 = reservations;
                                            _a.label = 2;
                                        case 2:
                                            if (!(_i < reservations_2.length)) return [3 /*break*/, 6];
                                            reservation = reservations_2[_i];
                                            // Décrémenter le stock physique et libérer la réservation
                                            return [4 /*yield*/, tx.inventory.updateMany({
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
                                                })];
                                        case 3:
                                            // Décrémenter le stock physique et libérer la réservation
                                            _a.sent();
                                            // Enregistrer le mouvement
                                            return [4 /*yield*/, tx.stockMovement.create({
                                                    data: {
                                                        variantId: reservation.variantId,
                                                        warehouseId: reservation.warehouseId,
                                                        type: 'OUT',
                                                        quantity: -reservation.quantity,
                                                        reason: "Exp\u00E9dition commande ".concat(orderId),
                                                        reference: orderId,
                                                        previousQuantity: reservation.previousQuantity,
                                                        newQuantity: reservation.previousQuantity - reservation.quantity,
                                                        createdBy: 'system',
                                                    },
                                                })];
                                        case 4:
                                            // Enregistrer le mouvement
                                            _a.sent();
                                            _a.label = 5;
                                        case 5:
                                            _i++;
                                            return [3 /*break*/, 2];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Erreur confirmation expédition:', error_4);
                        throw new Error('Impossible de confirmer l\'expédition');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ajout de stock (réception)
     */
    InventoryManager.addStock = function (variantId, warehouseId, quantity, reason, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var inventory, previousQuantity;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.inventory.findFirst({
                                                where: {
                                                    variantId: variantId,
                                                    warehouseId: warehouseId,
                                                },
                                            })];
                                        case 1:
                                            inventory = _a.sent();
                                            previousQuantity = (inventory === null || inventory === void 0 ? void 0 : inventory.quantity) || 0;
                                            if (!inventory) return [3 /*break*/, 3];
                                            return [4 /*yield*/, tx.inventory.update({
                                                    where: { id: inventory.id },
                                                    data: {
                                                        quantity: {
                                                            increment: quantity,
                                                        },
                                                        lastRestocked: new Date(),
                                                    },
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [3 /*break*/, 5];
                                        case 3: return [4 /*yield*/, tx.inventory.create({
                                                data: {
                                                    variantId: variantId,
                                                    warehouseId: warehouseId,
                                                    quantity: quantity,
                                                    reserved: 0,
                                                    available: quantity,
                                                    lastRestocked: new Date(),
                                                },
                                            })];
                                        case 4:
                                            inventory = _a.sent();
                                            _a.label = 5;
                                        case 5: 
                                        // Enregistrer le mouvement
                                        return [4 /*yield*/, tx.stockMovement.create({
                                                data: {
                                                    variantId: variantId,
                                                    warehouseId: warehouseId,
                                                    type: 'IN',
                                                    quantity: quantity,
                                                    reason: reason,
                                                    previousQuantity: previousQuantity,
                                                    newQuantity: previousQuantity + quantity,
                                                    createdBy: 'system',
                                                    metadata: metadata,
                                                },
                                            })];
                                        case 6:
                                            // Enregistrer le mouvement
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Erreur ajout stock:', error_5);
                        throw new Error('Impossible d\'ajouter le stock');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ajustement de stock (correction d'inventaire)
     */
    InventoryManager.adjustStock = function (variantId, warehouseId, newQuantity, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var inventory, previousQuantity, adjustment;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.inventory.findFirst({
                                                where: {
                                                    variantId: variantId,
                                                    warehouseId: warehouseId,
                                                },
                                            })];
                                        case 1:
                                            inventory = _a.sent();
                                            if (!inventory) {
                                                throw new Error('Article d\'inventaire non trouvé');
                                            }
                                            previousQuantity = inventory.quantity;
                                            adjustment = newQuantity - previousQuantity;
                                            return [4 /*yield*/, tx.inventory.update({
                                                    where: { id: inventory.id },
                                                    data: {
                                                        quantity: newQuantity,
                                                    },
                                                })];
                                        case 2:
                                            _a.sent();
                                            // Enregistrer le mouvement
                                            return [4 /*yield*/, tx.stockMovement.create({
                                                    data: {
                                                        variantId: variantId,
                                                        warehouseId: warehouseId,
                                                        type: 'ADJUSTMENT',
                                                        quantity: adjustment,
                                                        reason: reason,
                                                        previousQuantity: previousQuantity,
                                                        newQuantity: newQuantity,
                                                        createdBy: 'system',
                                                    },
                                                })];
                                        case 3:
                                            // Enregistrer le mouvement
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error('Erreur ajustement stock:', error_6);
                        throw new Error('Impossible d\'ajuster le stock');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Transfert de stock entre entrepôts
     */
    InventoryManager.transferStock = function (variantId, fromWarehouseId, toWarehouseId, quantity, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var sourceInventory, destinationInventory;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.inventory.findFirst({
                                                where: {
                                                    variantId: variantId,
                                                    warehouseId: fromWarehouseId,
                                                },
                                            })];
                                        case 1:
                                            sourceInventory = _a.sent();
                                            if (!sourceInventory || sourceInventory.quantity < quantity) {
                                                throw new Error('Stock insuffisant pour le transfert');
                                            }
                                            // Décrémenter le stock source
                                            return [4 /*yield*/, tx.inventory.update({
                                                    where: { id: sourceInventory.id },
                                                    data: {
                                                        quantity: {
                                                            decrement: quantity,
                                                        },
                                                    },
                                                })];
                                        case 2:
                                            // Décrémenter le stock source
                                            _a.sent();
                                            return [4 /*yield*/, tx.inventory.findFirst({
                                                    where: {
                                                        variantId: variantId,
                                                        warehouseId: toWarehouseId,
                                                    },
                                                })];
                                        case 3:
                                            destinationInventory = _a.sent();
                                            if (!destinationInventory) return [3 /*break*/, 5];
                                            return [4 /*yield*/, tx.inventory.update({
                                                    where: { id: destinationInventory.id },
                                                    data: {
                                                        quantity: {
                                                            increment: quantity,
                                                        },
                                                    },
                                                })];
                                        case 4:
                                            _a.sent();
                                            return [3 /*break*/, 7];
                                        case 5: return [4 /*yield*/, tx.inventory.create({
                                                data: {
                                                    variantId: variantId,
                                                    warehouseId: toWarehouseId,
                                                    quantity: quantity,
                                                    reserved: 0,
                                                    available: quantity,
                                                },
                                            })];
                                        case 6:
                                            _a.sent();
                                            _a.label = 7;
                                        case 7: 
                                        // Enregistrer les mouvements
                                        return [4 /*yield*/, tx.stockMovement.createMany({
                                                data: [
                                                    {
                                                        variantId: variantId,
                                                        warehouseId: fromWarehouseId,
                                                        type: 'TRANSFER',
                                                        quantity: -quantity,
                                                        reason: "Transfert vers ".concat(toWarehouseId, ": ").concat(reason),
                                                        previousQuantity: sourceInventory.quantity,
                                                        newQuantity: sourceInventory.quantity - quantity,
                                                        createdBy: 'system',
                                                    },
                                                    {
                                                        variantId: variantId,
                                                        warehouseId: toWarehouseId,
                                                        type: 'TRANSFER',
                                                        quantity: quantity,
                                                        reason: "Transfert depuis ".concat(fromWarehouseId, ": ").concat(reason),
                                                        previousQuantity: (destinationInventory === null || destinationInventory === void 0 ? void 0 : destinationInventory.quantity) || 0,
                                                        newQuantity: ((destinationInventory === null || destinationInventory === void 0 ? void 0 : destinationInventory.quantity) || 0) + quantity,
                                                        createdBy: 'system',
                                                    },
                                                ],
                                            })];
                                        case 8:
                                            // Enregistrer les mouvements
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.error('Erreur transfert stock:', error_7);
                        throw new Error('Impossible de transférer le stock');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Rapport de stock faible
     */
    InventoryManager.getLowStockReport = function (warehouseId) {
        return __awaiter(this, void 0, void 0, function () {
            var whereClause, lowStockItems, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        whereClause = warehouseId ? { warehouseId: warehouseId } : {};
                        return [4 /*yield*/, prisma_1.prisma.inventory.findMany({
                                where: __assign(__assign({}, whereClause), { OR: [
                                        {
                                            quantity: {
                                                lte: prisma_1.prisma.inventory.fields.reorderPoint,
                                            },
                                        },
                                        {
                                            available: {
                                                lte: 0,
                                            },
                                        },
                                    ] }),
                                include: {
                                    variant: true,
                                    warehouse: true,
                                },
                            })];
                    case 1:
                        lowStockItems = _a.sent();
                        return [2 /*return*/, lowStockItems];
                    case 2:
                        error_8 = _a.sent();
                        console.error('Erreur rapport stock faible:', error_8);
                        throw new Error('Impossible de générer le rapport de stock faible');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Historique des mouvements de stock
     */
    InventoryManager.getStockHistory = function (variantId, warehouseId, limit) {
        if (limit === void 0) { limit = 50; }
        return __awaiter(this, void 0, void 0, function () {
            var whereClause, movements, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        whereClause = warehouseId
                            ? { variantId: variantId, warehouseId: warehouseId }
                            : { variantId: variantId };
                        return [4 /*yield*/, prisma_1.prisma.stockMovement.findMany({
                                where: whereClause,
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: limit,
                            })];
                    case 1:
                        movements = _a.sent();
                        return [2 /*return*/, movements];
                    case 2:
                        error_9 = _a.sent();
                        console.error('Erreur historique stock:', error_9);
                        throw new Error('Impossible de récupérer l\'historique');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Calcul de la valeur du stock
     */
    InventoryManager.calculateStockValue = function (warehouseId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var whereClause, inventoryWithVariants, totalValue, totalItems, byCategory, _i, inventoryWithVariants_1, item, cost, value, categoryName, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        whereClause = warehouseId ? { warehouseId: warehouseId } : {};
                        return [4 /*yield*/, prisma_1.prisma.inventory.findMany({
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
                            })];
                    case 1:
                        inventoryWithVariants = _b.sent();
                        totalValue = 0;
                        totalItems = 0;
                        byCategory = {};
                        for (_i = 0, inventoryWithVariants_1 = inventoryWithVariants; _i < inventoryWithVariants_1.length; _i++) {
                            item = inventoryWithVariants_1[_i];
                            cost = item.cost || item.variant.cost || item.variant.price;
                            value = cost * item.quantity;
                            totalValue += value;
                            totalItems += item.quantity;
                            categoryName = ((_a = item.variant.product.category) === null || _a === void 0 ? void 0 : _a.name) || 'Sans catégorie';
                            if (!byCategory[categoryName]) {
                                byCategory[categoryName] = { value: 0, items: 0 };
                            }
                            byCategory[categoryName].value += value;
                            byCategory[categoryName].items += item.quantity;
                        }
                        return [2 /*return*/, {
                                totalValue: totalValue,
                                totalItems: totalItems,
                                byCategory: byCategory,
                            }];
                    case 2:
                        error_10 = _b.sent();
                        console.error('Erreur calcul valeur stock:', error_10);
                        throw new Error('Impossible de calculer la valeur du stock');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InventoryManager;
}());
exports.InventoryManager = InventoryManager;
exports.default = InventoryManager;
