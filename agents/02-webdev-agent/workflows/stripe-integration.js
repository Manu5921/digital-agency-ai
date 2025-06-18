"use strict";
/**
 * Stripe Integration Complete - Phase 2
 * Intégration complète Stripe avec MCP, webhooks, composants et tests
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
exports.StripeIntegration = exports.SubscriptionSchema = exports.CheckoutSessionSchema = exports.CartItemSchema = exports.ProductSchema = void 0;
var stripe_1 = require("stripe");
var server_1 = require("next/server");
var zod_1 = require("zod");
// Schemas de validation Zod
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().positive(),
    currency: zod_1.z.string().default('eur'),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional(),
});
exports.CartItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
    name: zod_1.z.string(),
});
exports.CheckoutSessionSchema = zod_1.z.object({
    items: zod_1.z.array(exports.CartItemSchema),
    successUrl: zod_1.z.string().url(),
    cancelUrl: zod_1.z.string().url(),
    customerId: zod_1.z.string().optional(),
    customerEmail: zod_1.z.string().email().optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional(),
});
exports.SubscriptionSchema = zod_1.z.object({
    customerId: zod_1.z.string(),
    priceId: zod_1.z.string(),
    trialPeriodDays: zod_1.z.number().optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional(),
});
var StripeIntegration = /** @class */ (function () {
    function StripeIntegration() {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is required');
        }
        if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
            throw new Error('STRIPE_WEBHOOK_SECRET_KEY is required');
        }
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-06-20',
            typescript: true,
        });
        this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
    }
    /**
     * Crée une session de checkout Stripe
     */
    StripeIntegration.prototype.createCheckoutSession = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var validatedData, lineItems, sessionParams, session, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        validatedData = exports.CheckoutSessionSchema.parse(data);
                        lineItems = validatedData.items.map(function (item) { return ({
                            price_data: {
                                currency: 'eur',
                                product_data: {
                                    name: item.name,
                                },
                                unit_amount: Math.round(item.price * 100), // Conversion en centimes
                            },
                            quantity: item.quantity,
                        }); });
                        sessionParams = {
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
                        }
                        else if (validatedData.customerEmail) {
                            sessionParams.customer_email = validatedData.customerEmail;
                        }
                        return [4 /*yield*/, this.stripe.checkout.sessions.create(sessionParams)];
                    case 1:
                        session = _a.sent();
                        return [2 /*return*/, {
                                sessionId: session.id,
                                url: session.url,
                                paymentIntent: session.payment_intent,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erreur création session checkout:', error_1);
                        throw new Error(error_1 instanceof Error ? error_1.message : 'Erreur inconnue');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Crée un abonnement Stripe
     */
    StripeIntegration.prototype.createSubscription = function (data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var validatedData, subscription, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        validatedData = exports.SubscriptionSchema.parse(data);
                        return [4 /*yield*/, this.stripe.subscriptions.create({
                                customer: validatedData.customerId,
                                items: [{
                                        price: validatedData.priceId,
                                    }],
                                trial_period_days: validatedData.trialPeriodDays,
                                metadata: validatedData.metadata || {},
                                expand: ['latest_invoice.payment_intent'],
                            })];
                    case 1:
                        subscription = _c.sent();
                        return [2 /*return*/, {
                                subscriptionId: subscription.id,
                                status: subscription.status,
                                clientSecret: (_b = (_a = subscription.latest_invoice) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.client_secret,
                                trialEnd: subscription.trial_end,
                            }];
                    case 2:
                        error_2 = _c.sent();
                        console.error('Erreur création abonnement:', error_2);
                        throw new Error(error_2 instanceof Error ? error_2.message : 'Erreur inconnue');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gère les webhooks Stripe
     */
    StripeIntegration.prototype.handleWebhook = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var body, signature, event_1, _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        return [4 /*yield*/, request.text()];
                    case 1:
                        body = _b.sent();
                        signature = request.headers.get('stripe-signature');
                        if (!signature) {
                            throw new Error('Signature manquante');
                        }
                        event_1 = this.stripe.webhooks.constructEvent(body, signature, this.webhookSecret);
                        _a = event_1.type;
                        switch (_a) {
                            case 'payment_intent.succeeded': return [3 /*break*/, 2];
                            case 'payment_intent.payment_failed': return [3 /*break*/, 4];
                            case 'checkout.session.completed': return [3 /*break*/, 6];
                            case 'invoice.payment_succeeded': return [3 /*break*/, 8];
                            case 'customer.subscription.created': return [3 /*break*/, 10];
                            case 'customer.subscription.updated': return [3 /*break*/, 10];
                            case 'customer.subscription.deleted': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 2: return [4 /*yield*/, this.handlePaymentSuccess(event_1.data.object)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 4: return [4 /*yield*/, this.handlePaymentFailed(event_1.data.object)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 6: return [4 /*yield*/, this.handleCheckoutCompleted(event_1.data.object)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 8: return [4 /*yield*/, this.handleSubscriptionPayment(event_1.data.object)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 10: return [4 /*yield*/, this.handleSubscriptionChange(event_1.data.object)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        console.log("\u00C9v\u00E9nement non trait\u00E9: ".concat(event_1.type));
                        _b.label = 13;
                    case 13: return [2 /*return*/, server_1.NextResponse.json({ received: true })];
                    case 14:
                        error_3 = _b.sent();
                        console.error('Erreur webhook:', error_3);
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Erreur traitement webhook' }, { status: 400 })];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Traite le succès du paiement
     */
    StripeIntegration.prototype.handlePaymentSuccess = function (paymentIntent) {
        return __awaiter(this, void 0, void 0, function () {
            var orderData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Paiement réussi:', paymentIntent.id);
                        orderData = {
                            paymentIntentId: paymentIntent.id,
                            amount: paymentIntent.amount / 100,
                            currency: paymentIntent.currency,
                            status: 'paid',
                            customerEmail: paymentIntent.receipt_email,
                            metadata: paymentIntent.metadata,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/orders/update', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(orderData),
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Erreur mise à jour commande:', error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Traite l'échec du paiement
     */
    StripeIntegration.prototype.handlePaymentFailed = function (paymentIntent) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var failureData, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Paiement échoué:', paymentIntent.id);
                        failureData = {
                            paymentIntentId: paymentIntent.id,
                            failureReason: (_a = paymentIntent.last_payment_error) === null || _a === void 0 ? void 0 : _a.message,
                            customerEmail: paymentIntent.receipt_email,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/payments/handle-failure', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(failureData),
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _b.sent();
                        console.error('Erreur traitement échec:', error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Traite la completion du checkout
     */
    StripeIntegration.prototype.handleCheckoutCompleted = function (session) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fullSession, orderData, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Checkout complété:', session.id);
                        return [4 /*yield*/, this.stripe.checkout.sessions.retrieve(session.id, {
                                expand: ['line_items', 'customer'],
                            })];
                    case 1:
                        fullSession = _b.sent();
                        orderData = {
                            sessionId: session.id,
                            customerId: session.customer,
                            customerEmail: session.customer_email,
                            amount: session.amount_total ? session.amount_total / 100 : 0,
                            currency: session.currency,
                            paymentStatus: session.payment_status,
                            items: ((_a = fullSession.line_items) === null || _a === void 0 ? void 0 : _a.data) || [],
                            metadata: session.metadata,
                        };
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fetch('/api/orders/create', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(orderData),
                            })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _b.sent();
                        console.error('Erreur création commande:', error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Traite les paiements d'abonnement
     */
    StripeIntegration.prototype.handleSubscriptionPayment = function (invoice) {
        return __awaiter(this, void 0, void 0, function () {
            var subscriptionData, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Paiement abonnement:', invoice.id);
                        subscriptionData = {
                            invoiceId: invoice.id,
                            subscriptionId: invoice.subscription,
                            customerId: invoice.customer,
                            amount: invoice.amount_paid / 100,
                            currency: invoice.currency,
                            status: invoice.status,
                            periodStart: invoice.period_start,
                            periodEnd: invoice.period_end,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/subscriptions/update-payment', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(subscriptionData),
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        console.error('Erreur mise à jour abonnement:', error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Traite les changements d'abonnement
     */
    StripeIntegration.prototype.handleSubscriptionChange = function (subscription) {
        return __awaiter(this, void 0, void 0, function () {
            var subscriptionData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Changement abonnement:', subscription.id);
                        subscriptionData = {
                            subscriptionId: subscription.id,
                            customerId: subscription.customer,
                            status: subscription.status,
                            currentPeriodStart: subscription.current_period_start,
                            currentPeriodEnd: subscription.current_period_end,
                            cancelAtPeriodEnd: subscription.cancel_at_period_end,
                            trialEnd: subscription.trial_end,
                            items: subscription.items.data,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/subscriptions/update', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(subscriptionData),
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _a.sent();
                        console.error('Erreur mise à jour abonnement:', error_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Récupère les détails d'un paiement
     */
    StripeIntegration.prototype.getPaymentIntent = function (paymentIntentId) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentIntent, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.paymentIntents.retrieve(paymentIntentId)];
                    case 1:
                        paymentIntent = _a.sent();
                        return [2 /*return*/, {
                                id: paymentIntent.id,
                                amount: paymentIntent.amount / 100,
                                currency: paymentIntent.currency,
                                status: paymentIntent.status,
                                clientSecret: paymentIntent.client_secret,
                                metadata: paymentIntent.metadata,
                            }];
                    case 2:
                        error_9 = _a.sent();
                        console.error('Erreur récupération PaymentIntent:', error_9);
                        throw new Error('PaymentIntent non trouvé');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Crée un client Stripe
     */
    StripeIntegration.prototype.createCustomer = function (email, name, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.customers.create({
                                email: email,
                                name: name,
                                metadata: metadata || {},
                            })];
                    case 1:
                        customer = _a.sent();
                        return [2 /*return*/, {
                                customerId: customer.id,
                                email: customer.email,
                                name: customer.name,
                            }];
                    case 2:
                        error_10 = _a.sent();
                        console.error('Erreur création client:', error_10);
                        throw new Error('Impossible de créer le client');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Récupère les abonnements d'un client
     */
    StripeIntegration.prototype.getCustomerSubscriptions = function (customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var subscriptions, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.subscriptions.list({
                                customer: customerId,
                                status: 'all',
                                expand: ['data.items.data.price.product'],
                            })];
                    case 1:
                        subscriptions = _a.sent();
                        return [2 /*return*/, subscriptions.data.map(function (sub) { return ({
                                id: sub.id,
                                status: sub.status,
                                currentPeriodStart: new Date(sub.current_period_start * 1000),
                                currentPeriodEnd: new Date(sub.current_period_end * 1000),
                                cancelAtPeriodEnd: sub.cancel_at_period_end,
                                trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
                                items: sub.items.data,
                            }); })];
                    case 2:
                        error_11 = _a.sent();
                        console.error('Erreur récupération abonnements:', error_11);
                        throw new Error('Impossible de récupérer les abonnements');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Annule un abonnement
     */
    StripeIntegration.prototype.cancelSubscription = function (subscriptionId, atPeriodEnd) {
        if (atPeriodEnd === void 0) { atPeriodEnd = true; }
        return __awaiter(this, void 0, void 0, function () {
            var subscription, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.subscriptions.update(subscriptionId, {
                                cancel_at_period_end: atPeriodEnd,
                            })];
                    case 1:
                        subscription = _a.sent();
                        return [2 /*return*/, {
                                id: subscription.id,
                                status: subscription.status,
                                cancelAtPeriodEnd: subscription.cancel_at_period_end,
                                canceledAt: subscription.canceled_at,
                            }];
                    case 2:
                        error_12 = _a.sent();
                        console.error('Erreur annulation abonnement:', error_12);
                        throw new Error('Impossible d\'annuler l\'abonnement');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StripeIntegration;
}());
exports.StripeIntegration = StripeIntegration;
exports.default = StripeIntegration;
