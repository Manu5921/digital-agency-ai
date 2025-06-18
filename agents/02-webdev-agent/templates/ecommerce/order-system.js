"use strict";
/**
 * Système de gestion des commandes e-commerce
 * Phase 2 - WebDev Agent
 */
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
exports.OrderManager = exports.ShippingMethodSchema = exports.OrderSchema = exports.OrderItemSchema = exports.AddressSchema = void 0;
var zod_1 = require("zod");
var prisma_1 = require("@/lib/prisma");
var inventory_manager_1 = require("./inventory-manager");
var stripe_integration_1 = require("../workflows/stripe-integration");
// Schemas de validation
exports.AddressSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2),
    lastName: zod_1.z.string().min(2),
    company: zod_1.z.string().optional(),
    street: zod_1.z.string().min(5),
    street2: zod_1.z.string().optional(),
    city: zod_1.z.string().min(2),
    postalCode: zod_1.z.string().min(3),
    country: zod_1.z.string().min(2),
    phone: zod_1.z.string().optional(),
});
exports.OrderItemSchema = zod_1.z.object({
    variantId: zod_1.z.string(),
    productName: zod_1.z.string(),
    variantName: zod_1.z.string().optional(),
    sku: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    unitPrice: zod_1.z.number().positive(),
    totalPrice: zod_1.z.number().positive(),
    image: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.any()).optional(),
});
exports.OrderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    orderNumber: zod_1.z.string(),
    customerId: zod_1.z.string().optional(),
    customerEmail: zod_1.z.string().email(),
    status: zod_1.z.enum([
        'PENDING',
        'CONFIRMED',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'REFUNDED'
    ]),
    paymentStatus: zod_1.z.enum([
        'PENDING',
        'PAID',
        'FAILED',
        'CANCELLED',
        'REFUNDED'
    ]),
    items: zod_1.z.array(exports.OrderItemSchema),
    subtotal: zod_1.z.number().nonnegative(),
    taxAmount: zod_1.z.number().nonnegative().default(0),
    shippingAmount: zod_1.z.number().nonnegative().default(0),
    discountAmount: zod_1.z.number().nonnegative().default(0),
    total: zod_1.z.number().nonnegative(),
    currency: zod_1.z.string().default('EUR'),
    billingAddress: exports.AddressSchema,
    shippingAddress: exports.AddressSchema,
    shippingMethod: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        carrier: zod_1.z.string(),
        estimatedDays: zod_1.z.number().int().optional(),
        trackingNumber: zod_1.z.string().optional(),
    }).optional(),
    paymentMethod: zod_1.z.object({
        type: zod_1.z.string(),
        last4: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }).optional(),
    stripePaymentIntentId: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    processedAt: zod_1.z.date().optional(),
    shippedAt: zod_1.z.date().optional(),
    deliveredAt: zod_1.z.date().optional(),
});
exports.ShippingMethodSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    carrier: zod_1.z.string(),
    cost: zod_1.z.number().nonnegative(),
    estimatedDays: zod_1.z.number().int(),
    maxWeight: zod_1.z.number().positive().optional(),
    countries: zod_1.z.array(zod_1.z.string()).default([]),
    isActive: zod_1.z.boolean().default(true),
});
/**
 * Gestionnaire principal des commandes
 */
var OrderManager = /** @class */ (function () {
    function OrderManager() {
        this.stripe = new stripe_integration_1.StripeIntegration();
    }
    /**
     * Crée une nouvelle commande
     */
    OrderManager.prototype.createOrder = function (orderData) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var enrichedItems, subtotal, _i, _a, item, variant, availability, totalPrice, shippingAmount, shippingMethod, shipping, taxRate, taxAmount, total, orderNumber, order, stockReservation, paymentIntent;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            enrichedItems = [];
                                            subtotal = 0;
                                            _i = 0, _a = orderData.items;
                                            _b.label = 1;
                                        case 1:
                                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                                            item = _a[_i];
                                            return [4 /*yield*/, tx.productVariant.findUnique({
                                                    where: { id: item.variantId },
                                                    include: {
                                                        product: true,
                                                    },
                                                })];
                                        case 2:
                                            variant = _b.sent();
                                            if (!variant) {
                                                throw new Error("Variante ".concat(item.variantId, " non trouv\u00E9e"));
                                            }
                                            return [4 /*yield*/, inventory_manager_1.InventoryManager.checkAvailability(item.variantId, item.quantity)];
                                        case 3:
                                            availability = _b.sent();
                                            if (!availability.available) {
                                                throw new Error("Stock insuffisant pour ".concat(variant.product.name, " (disponible: ").concat(availability.stock, ")"));
                                            }
                                            totalPrice = variant.price * item.quantity;
                                            subtotal += totalPrice;
                                            enrichedItems.push({
                                                variantId: variant.id,
                                                productName: variant.product.name,
                                                variantName: variant.name,
                                                sku: variant.sku,
                                                quantity: item.quantity,
                                                unitPrice: variant.price,
                                                totalPrice: totalPrice,
                                                image: variant.images[0],
                                            });
                                            _b.label = 4;
                                        case 4:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 5:
                                            shippingAmount = 0;
                                            shippingMethod = null;
                                            if (!orderData.shippingMethodId) return [3 /*break*/, 7];
                                            return [4 /*yield*/, tx.shippingMethod.findUnique({
                                                    where: { id: orderData.shippingMethodId },
                                                })];
                                        case 6:
                                            shipping = _b.sent();
                                            if (shipping && shipping.isActive) {
                                                shippingAmount = shipping.cost;
                                                shippingMethod = {
                                                    id: shipping.id,
                                                    name: shipping.name,
                                                    carrier: shipping.carrier,
                                                    estimatedDays: shipping.estimatedDays,
                                                };
                                            }
                                            _b.label = 7;
                                        case 7:
                                            taxRate = 0.20;
                                            taxAmount = (subtotal + shippingAmount) * taxRate;
                                            total = subtotal + shippingAmount + taxAmount;
                                            return [4 /*yield*/, this.generateOrderNumber()];
                                        case 8:
                                            orderNumber = _b.sent();
                                            return [4 /*yield*/, tx.order.create({
                                                    data: {
                                                        orderNumber: orderNumber,
                                                        customerId: orderData.customerId,
                                                        customerEmail: orderData.customerEmail,
                                                        status: 'PENDING',
                                                        paymentStatus: 'PENDING',
                                                        subtotal: subtotal,
                                                        taxAmount: taxAmount,
                                                        shippingAmount: shippingAmount,
                                                        discountAmount: 0,
                                                        total: total,
                                                        currency: 'EUR',
                                                        billingAddress: orderData.billingAddress,
                                                        shippingAddress: orderData.shippingAddress,
                                                        shippingMethod: shippingMethod,
                                                        notes: orderData.notes,
                                                        items: {
                                                            create: enrichedItems.map(function (item) { return ({
                                                                variantId: item.variantId,
                                                                productName: item.productName,
                                                                variantName: item.variantName,
                                                                sku: item.sku,
                                                                quantity: item.quantity,
                                                                unitPrice: item.unitPrice,
                                                                totalPrice: item.totalPrice,
                                                                image: item.image,
                                                            }); }),
                                                        },
                                                    },
                                                    include: {
                                                        items: true,
                                                    },
                                                })];
                                        case 9:
                                            order = _b.sent();
                                            return [4 /*yield*/, inventory_manager_1.InventoryManager.reserveStock(orderData.items.map(function (item) { return ({
                                                    variantId: item.variantId,
                                                    quantity: item.quantity,
                                                    orderId: order.id,
                                                }); }))];
                                        case 10:
                                            stockReservation = _b.sent();
                                            if (!stockReservation.success) {
                                                throw new Error("Impossible de r\u00E9server le stock: ".concat(stockReservation.failures.map(function (f) { return f.reason; }).join(', ')));
                                            }
                                            return [4 /*yield*/, this.stripe.createCheckoutSession({
                                                    items: enrichedItems.map(function (item) { return ({
                                                        productId: item.variantId,
                                                        quantity: item.quantity,
                                                        price: item.unitPrice,
                                                        name: item.productName,
                                                    }); }),
                                                    successUrl: "".concat(process.env.NEXT_PUBLIC_URL, "/orders/").concat(order.id, "/success"),
                                                    cancelUrl: "".concat(process.env.NEXT_PUBLIC_URL, "/orders/").concat(order.id, "/cancel"),
                                                    customerEmail: orderData.customerEmail,
                                                    metadata: {
                                                        orderId: order.id,
                                                        orderNumber: order.orderNumber,
                                                    },
                                                })];
                                        case 11:
                                            paymentIntent = _b.sent();
                                            // 9. Mettre à jour la commande avec l'ID Stripe
                                            return [4 /*yield*/, tx.order.update({
                                                    where: { id: order.id },
                                                    data: {
                                                        stripePaymentIntentId: paymentIntent.sessionId,
                                                    },
                                                })];
                                        case 12:
                                            // 9. Mettre à jour la commande avec l'ID Stripe
                                            _b.sent();
                                            return [2 /*return*/, {
                                                    order: order,
                                                    paymentIntent: paymentIntent,
                                                }];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erreur création commande:', error_1);
                        throw new Error(error_1 instanceof Error ? error_1.message : 'Erreur lors de la création de la commande');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Met à jour le statut d'une commande
     */
    OrderManager.prototype.updateOrderStatus = function (orderId, status, notes) {
        return __awaiter(this, void 0, void 0, function () {
            var order, _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, prisma_1.prisma.order.update({
                                where: { id: orderId },
                                data: {
                                    status: status,
                                    notes: notes ? "".concat(notes, "\n---\n").concat(new Date().toISOString()) : undefined,
                                    processedAt: status === 'PROCESSING' ? new Date() : undefined,
                                    shippedAt: status === 'SHIPPED' ? new Date() : undefined,
                                    deliveredAt: status === 'DELIVERED' ? new Date() : undefined,
                                },
                                include: {
                                    items: true,
                                },
                            })];
                    case 1:
                        order = _b.sent();
                        _a = status;
                        switch (_a) {
                            case 'CONFIRMED': return [3 /*break*/, 2];
                            case 'SHIPPED': return [3 /*break*/, 4];
                            case 'CANCELLED': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 2: return [4 /*yield*/, this.handleOrderConfirmation(orderId)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, this.handleOrderShipment(orderId)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.handleOrderCancellation(orderId)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, order];
                    case 9:
                        error_2 = _b.sent();
                        console.error('Erreur mise à jour statut commande:', error_2);
                        throw new Error('Impossible de mettre à jour le statut de la commande');
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Met à jour le statut de paiement
     */
    OrderManager.prototype.updatePaymentStatus = function (orderId, paymentStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var order, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, prisma_1.prisma.order.update({
                                where: { id: orderId },
                                data: {
                                    paymentStatus: paymentStatus,
                                    status: paymentStatus === 'PAID' ? 'CONFIRMED' : undefined,
                                },
                                include: {
                                    items: true,
                                },
                            })];
                    case 1:
                        order = _a.sent();
                        if (!(paymentStatus === 'PAID')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.handlePaymentSuccess(orderId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.handlePaymentFailure(orderId)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, order];
                    case 6:
                        error_3 = _a.sent();
                        console.error('Erreur mise à jour statut paiement:', error_3);
                        throw new Error('Impossible de mettre à jour le statut de paiement');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Récupère une commande par ID
     */
    OrderManager.prototype.getOrderById = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.order.findUnique({
                                where: { id: orderId },
                                include: {
                                    items: true,
                                },
                            })];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, order];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Erreur récupération commande:', error_4);
                        throw new Error('Impossible de récupérer la commande');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Récupère les commandes d'un client
     */
    OrderManager.prototype.getCustomerOrders = function (customerEmail, limit) {
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var orders, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma_1.prisma.order.findMany({
                                where: { customerEmail: customerEmail },
                                include: {
                                    items: true,
                                },
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: limit,
                            })];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, orders];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Erreur récupération commandes client:', error_5);
                        throw new Error('Impossible de récupérer les commandes du client');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Recherche de commandes avec filtres
     */
    OrderManager.prototype.searchOrders = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var where, _a, orders, total, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        where = {};
                        if (filters.status)
                            where.status = filters.status;
                        if (filters.paymentStatus)
                            where.paymentStatus = filters.paymentStatus;
                        if (filters.customerEmail)
                            where.customerEmail = { contains: filters.customerEmail };
                        if (filters.orderNumber)
                            where.orderNumber = { contains: filters.orderNumber };
                        if (filters.dateFrom || filters.dateTo) {
                            where.createdAt = {};
                            if (filters.dateFrom)
                                where.createdAt.gte = filters.dateFrom;
                            if (filters.dateTo)
                                where.createdAt.lte = filters.dateTo;
                        }
                        return [4 /*yield*/, Promise.all([
                                prisma_1.prisma.order.findMany({
                                    where: where,
                                    include: {
                                        items: true,
                                    },
                                    orderBy: {
                                        createdAt: 'desc',
                                    },
                                    take: filters.limit || 20,
                                    skip: filters.offset || 0,
                                }),
                                prisma_1.prisma.order.count({ where: where }),
                            ])];
                    case 1:
                        _a = _b.sent(), orders = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                orders: orders,
                                total: total,
                            }];
                    case 2:
                        error_6 = _b.sent();
                        console.error('Erreur recherche commandes:', error_6);
                        throw new Error('Impossible de rechercher les commandes');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ajoute un numéro de suivi à une commande
     */
    OrderManager.prototype.addTrackingNumber = function (orderId, trackingNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var order, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, prisma_1.prisma.order.update({
                                where: { id: orderId },
                                data: {
                                    shippingMethod: {
                                        update: {
                                            trackingNumber: trackingNumber,
                                        },
                                    },
                                    status: 'SHIPPED',
                                    shippedAt: new Date(),
                                },
                                include: {
                                    items: true,
                                },
                            })];
                    case 1:
                        order = _a.sent();
                        // Envoyer email de notification de suivi
                        return [4 /*yield*/, this.sendTrackingNotification(order.customerEmail, order.orderNumber, trackingNumber)];
                    case 2:
                        // Envoyer email de notification de suivi
                        _a.sent();
                        return [2 /*return*/, order];
                    case 3:
                        error_7 = _a.sent();
                        console.error('Erreur ajout numéro de suivi:', error_7);
                        throw new Error('Impossible d\'ajouter le numéro de suivi');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Calcule les statistiques des commandes
     */
    OrderManager.prototype.getOrderStatistics = function (dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function () {
            var where, _a, orders, orderItems, totalOrders, totalRevenue, averageOrderValue, ordersByStatus, productStats, topProducts, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        where = {};
                        if (dateFrom || dateTo) {
                            where.createdAt = {};
                            if (dateFrom)
                                where.createdAt.gte = dateFrom;
                            if (dateTo)
                                where.createdAt.lte = dateTo;
                        }
                        return [4 /*yield*/, Promise.all([
                                prisma_1.prisma.order.findMany({
                                    where: where,
                                    select: {
                                        status: true,
                                        total: true,
                                    },
                                }),
                                prisma_1.prisma.orderItem.findMany({
                                    where: {
                                        order: where,
                                    },
                                    select: {
                                        productName: true,
                                        quantity: true,
                                        totalPrice: true,
                                    },
                                }),
                            ])];
                    case 1:
                        _a = _b.sent(), orders = _a[0], orderItems = _a[1];
                        totalOrders = orders.length;
                        totalRevenue = orders.reduce(function (sum, order) { return sum + order.total; }, 0);
                        averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
                        ordersByStatus = orders.reduce(function (acc, order) {
                            acc[order.status] = (acc[order.status] || 0) + 1;
                            return acc;
                        }, {});
                        productStats = orderItems.reduce(function (acc, item) {
                            if (!acc[item.productName]) {
                                acc[item.productName] = { quantity: 0, revenue: 0 };
                            }
                            acc[item.productName].quantity += item.quantity;
                            acc[item.productName].revenue += item.totalPrice;
                            return acc;
                        }, {});
                        topProducts = Object.entries(productStats)
                            .map(function (_a) {
                            var productName = _a[0], stats = _a[1];
                            return ({
                                productName: productName,
                                quantity: stats.quantity,
                                revenue: stats.revenue,
                            });
                        })
                            .sort(function (a, b) { return b.revenue - a.revenue; })
                            .slice(0, 10);
                        return [2 /*return*/, {
                                totalOrders: totalOrders,
                                totalRevenue: totalRevenue,
                                averageOrderValue: averageOrderValue,
                                ordersByStatus: ordersByStatus,
                                topProducts: topProducts,
                            }];
                    case 2:
                        error_8 = _b.sent();
                        console.error('Erreur calcul statistiques:', error_8);
                        throw new Error('Impossible de calculer les statistiques');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gestion des actions spécifiques
     */
    OrderManager.prototype.handleOrderConfirmation = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOrderById(orderId)];
                    case 1:
                        order = _a.sent();
                        if (!order) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sendOrderConfirmation(order.customerEmail, order.orderNumber)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderManager.prototype.handleOrderShipment = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Confirmer la sortie de stock
                    return [4 /*yield*/, inventory_manager_1.InventoryManager.confirmShipment(orderId)];
                    case 1:
                        // Confirmer la sortie de stock
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderManager.prototype.handleOrderCancellation = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Libérer le stock réservé
                    return [4 /*yield*/, inventory_manager_1.InventoryManager.unreserveStock(orderId)];
                    case 1:
                        // Libérer le stock réservé
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderManager.prototype.handlePaymentSuccess = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Actions après paiement réussi
                    return [4 /*yield*/, this.updateOrderStatus(orderId, 'CONFIRMED')];
                    case 1:
                        // Actions après paiement réussi
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderManager.prototype.handlePaymentFailure = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Libérer le stock en cas d'échec de paiement
                    return [4 /*yield*/, inventory_manager_1.InventoryManager.unreserveStock(orderId)];
                    case 1:
                        // Libérer le stock en cas d'échec de paiement
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génère un numéro de commande unique
     */
    OrderManager.prototype.generateOrderNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, year, month, day, prefix, lastOrder, sequence, lastSequence;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        year = date.getFullYear().toString().slice(-2);
                        month = (date.getMonth() + 1).toString().padStart(2, '0');
                        day = date.getDate().toString().padStart(2, '0');
                        prefix = "ORD".concat(year).concat(month).concat(day);
                        return [4 /*yield*/, prisma_1.prisma.order.findFirst({
                                where: {
                                    orderNumber: {
                                        startsWith: prefix,
                                    },
                                },
                                orderBy: {
                                    orderNumber: 'desc',
                                },
                            })];
                    case 1:
                        lastOrder = _a.sent();
                        sequence = 1;
                        if (lastOrder) {
                            lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
                            sequence = lastSequence + 1;
                        }
                        return [2 /*return*/, "".concat(prefix).concat(sequence.toString().padStart(4, '0'))];
                }
            });
        });
    };
    /**
     * Notifications par email (à implémenter selon le service utilisé)
     */
    OrderManager.prototype.sendOrderConfirmation = function (email, orderNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO: Implémenter l'envoi d'email
                console.log("Email confirmation commande ".concat(orderNumber, " envoy\u00E9 \u00E0 ").concat(email));
                return [2 /*return*/];
            });
        });
    };
    OrderManager.prototype.sendTrackingNotification = function (email, orderNumber, trackingNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO: Implémenter l'envoi d'email
                console.log("Email suivi commande ".concat(orderNumber, " (").concat(trackingNumber, ") envoy\u00E9 \u00E0 ").concat(email));
                return [2 /*return*/];
            });
        });
    };
    return OrderManager;
}());
exports.OrderManager = OrderManager;
exports.default = OrderManager;
