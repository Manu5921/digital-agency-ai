"use strict";
/**
 * Store Zustand pour le panier e-commerce persistant
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSync = exports.useWishlist = exports.useCart = exports.useRecentOrdersStore = exports.useWishlistStore = exports.useCartStore = exports.WishlistSchema = exports.CartSchema = exports.CartItemSchema = void 0;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var zod_1 = require("zod");
// Schemas de validation
exports.CartItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive().int(),
    image: zod_1.z.string().optional(),
    variant: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        options: zod_1.z.record(zod_1.z.string()),
    }).optional(),
    metadata: zod_1.z.record(zod_1.z.any()).optional(),
});
exports.CartSchema = zod_1.z.object({
    items: zod_1.z.array(exports.CartItemSchema),
    total: zod_1.z.number().nonnegative(),
    itemCount: zod_1.z.number().nonnegative().int(),
    currency: zod_1.z.string().default('EUR'),
    discounts: zod_1.z.array(zod_1.z.object({
        code: zod_1.z.string(),
        type: zod_1.z.enum(['percentage', 'fixed']),
        value: zod_1.z.number(),
        description: zod_1.z.string(),
    })).default([]),
    shipping: zod_1.z.object({
        method: zod_1.z.string(),
        cost: zod_1.z.number().nonnegative(),
        estimatedDays: zod_1.z.number().int().optional(),
    }).optional(),
    tax: zod_1.z.object({
        rate: zod_1.z.number().min(0).max(1),
        amount: zod_1.z.number().nonnegative(),
    }).optional(),
});
exports.WishlistSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        price: zod_1.z.number(),
        image: zod_1.z.string().optional(),
        addedAt: zod_1.z.string(),
    })),
});
/**
 * Store principal du panier avec persistance
 */
exports.useCartStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set, get) { return ({
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
    addItem: function (newItem, quantity) {
        if (quantity === void 0) { quantity = 1; }
        set(function (state) {
            var existingItem = state.items.find(function (item) {
                return item.id === newItem.id &&
                    JSON.stringify(item.variant) === JSON.stringify(newItem.variant);
            });
            var updatedItems;
            if (existingItem) {
                // Mettre à jour la quantité si l'item existe
                updatedItems = state.items.map(function (item) {
                    return item.id === existingItem.id &&
                        JSON.stringify(item.variant) === JSON.stringify(existingItem.variant)
                        ? __assign(__assign({}, item), { quantity: item.quantity + quantity }) : item;
                });
            }
            else {
                // Ajouter un nouvel item
                var cartItem = __assign(__assign({}, newItem), { quantity: quantity });
                updatedItems = __spreadArray(__spreadArray([], state.items, true), [cartItem], false);
            }
            var newItemCount = updatedItems.reduce(function (total, item) { return total + item.quantity; }, 0);
            var newTotal = get().calculateSubtotal();
            return {
                items: updatedItems,
                itemCount: newItemCount,
                total: newTotal,
            };
        });
    },
    removeItem: function (itemId) {
        set(function (state) {
            var updatedItems = state.items.filter(function (item) { return item.id !== itemId; });
            var newItemCount = updatedItems.reduce(function (total, item) { return total + item.quantity; }, 0);
            return {
                items: updatedItems,
                itemCount: newItemCount,
                total: get().calculateSubtotal(),
            };
        });
    },
    updateQuantity: function (itemId, quantity) {
        if (quantity <= 0) {
            get().removeItem(itemId);
            return;
        }
        set(function (state) {
            var updatedItems = state.items.map(function (item) {
                return item.id === itemId ? __assign(__assign({}, item), { quantity: quantity }) : item;
            });
            var newItemCount = updatedItems.reduce(function (total, item) { return total + item.quantity; }, 0);
            return {
                items: updatedItems,
                itemCount: newItemCount,
                total: get().calculateSubtotal(),
            };
        });
    },
    clearCart: function () {
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
    applyDiscount: function (discount) {
        set(function (state) {
            var existingDiscount = state.discounts.find(function (d) { return d.code === discount.code; });
            if (existingDiscount)
                return state;
            return {
                discounts: __spreadArray(__spreadArray([], state.discounts, true), [discount], false),
                total: get().calculateSubtotal(),
            };
        });
    },
    removeDiscount: function (code) {
        set(function (state) { return ({
            discounts: state.discounts.filter(function (d) { return d.code !== code; }),
            total: get().calculateSubtotal(),
        }); });
    },
    // Actions de livraison
    setShipping: function (shipping) {
        set({ shipping: shipping, total: get().calculateSubtotal() });
    },
    // Actions de taxe
    setTax: function (tax) {
        set({ tax: tax, total: get().calculateTotalWithTax() });
    },
    // Actions UI
    toggleCart: function () { return set(function (state) { return ({ isOpen: !state.isOpen }); }); },
    openCart: function () { return set({ isOpen: true }); },
    closeCart: function () { return set({ isOpen: false }); },
    // Utilitaires
    getItemById: function (itemId) {
        return get().items.find(function (item) { return item.id === itemId; });
    },
    calculateSubtotal: function () {
        var _a;
        var state = get();
        var itemsTotal = state.items.reduce(function (total, item) {
            return total + (item.price * item.quantity);
        }, 0);
        var discountAmount = get().calculateDiscount();
        var shippingCost = ((_a = state.shipping) === null || _a === void 0 ? void 0 : _a.cost) || 0;
        return Math.max(0, itemsTotal - discountAmount + shippingCost);
    },
    calculateTotalWithTax: function () {
        var state = get();
        var subtotal = get().calculateSubtotal();
        var taxAmount = state.tax ? subtotal * state.tax.rate : 0;
        return subtotal + taxAmount;
    },
    calculateDiscount: function () {
        var state = get();
        var itemsTotal = state.items.reduce(function (total, item) {
            return total + (item.price * item.quantity);
        }, 0);
        return state.discounts.reduce(function (total, discount) {
            if (discount.type === 'percentage') {
                return total + (itemsTotal * (discount.value / 100));
            }
            else {
                return total + discount.value;
            }
        }, 0);
    },
    isItemInCart: function (itemId) {
        return get().items.some(function (item) { return item.id === itemId; });
    },
}); }, {
    name: 'cart-storage',
    storage: (0, middleware_1.createJSONStorage)(function () { return localStorage; }),
    partialize: function (state) { return ({
        items: state.items,
        currency: state.currency,
        discounts: state.discounts,
        shipping: state.shipping,
        tax: state.tax,
    }); },
}));
/**
 * Store de la wishlist avec persistance
 */
exports.useWishlistStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set, get) { return ({
    items: [],
    addToWishlist: function (item) {
        set(function (state) {
            var exists = state.items.some(function (wishlistItem) { return wishlistItem.id === item.id; });
            if (exists)
                return state;
            var newItem = __assign(__assign({}, item), { addedAt: new Date().toISOString() });
            return {
                items: __spreadArray(__spreadArray([], state.items, true), [newItem], false),
            };
        });
    },
    removeFromWishlist: function (itemId) {
        set(function (state) { return ({
            items: state.items.filter(function (item) { return item.id !== itemId; }),
        }); });
    },
    clearWishlist: function () {
        set({ items: [] });
    },
    isInWishlist: function (itemId) {
        return get().items.some(function (item) { return item.id === itemId; });
    },
    moveToCart: function (itemId, addToCart) {
        var state = get();
        var wishlistItem = state.items.find(function (item) { return item.id === itemId; });
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
}); }, {
    name: 'wishlist-storage',
    storage: (0, middleware_1.createJSONStorage)(function () { return localStorage; }),
}));
exports.useRecentOrdersStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set, get) { return ({
    orders: [],
    addOrder: function (order) {
        set(function (state) { return ({
            orders: __spreadArray([order], state.orders.slice(0, 9), true), // Garder seulement les 10 dernières commandes
        }); });
    },
    getOrderById: function (orderId) {
        return get().orders.find(function (order) { return order.id === orderId; });
    },
    clearOrders: function () {
        set({ orders: [] });
    },
}); }, {
    name: 'recent-orders-storage',
    storage: (0, middleware_1.createJSONStorage)(function () { return localStorage; }),
}));
/**
 * Hooks personnalisés pour faciliter l'utilisation
 */
var useCart = function () {
    var store = (0, exports.useCartStore)();
    return __assign(__assign({}, store), { isEmpty: store.items.length === 0, totalItems: store.itemCount, formattedTotal: new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: store.currency,
        }).format(store.total) });
};
exports.useCart = useCart;
var useWishlist = function () {
    var store = (0, exports.useWishlistStore)();
    var addToCart = (0, exports.useCartStore)(function (state) { return state.addItem; });
    return __assign(__assign({}, store), { isEmpty: store.items.length === 0, totalItems: store.items.length, moveToCart: function (itemId) { return store.moveToCart(itemId, addToCart); } });
};
exports.useWishlist = useWishlist;
/**
 * Utilitaires pour la synchronisation avec le serveur
 */
var CartSync = /** @class */ (function () {
    function CartSync() {
    }
    /**
     * Synchronise le panier local avec le serveur
     */
    CartSync.syncWithServer = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var localCart, response, serverCart, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        localCart = exports.useCartStore.getState();
                        return [4 /*yield*/, fetch('/api/cart/sync', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    userId: userId,
                                    cart: {
                                        items: localCart.items,
                                        discounts: localCart.discounts,
                                        shipping: localCart.shipping,
                                    },
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        serverCart = _a.sent();
                        // Mettre à jour le panier local avec les données du serveur
                        exports.useCartStore.setState({
                            items: serverCart.items || [],
                            discounts: serverCart.discounts || [],
                            shipping: serverCart.shipping || null,
                        });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Erreur synchronisation panier:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sauvegarde le panier sur le serveur
     */
    CartSync.saveToServer = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cart = exports.useCartStore.getState();
                        return [4 /*yield*/, fetch('/api/cart/save', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    userId: userId,
                                    cart: {
                                        items: cart.items,
                                        discounts: cart.discounts,
                                        shipping: cart.shipping,
                                        total: cart.total,
                                    },
                                }),
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Erreur sauvegarde panier:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Charge le panier depuis le serveur
     */
    CartSync.loadFromServer = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, serverCart, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetch("/api/cart/load?userId=".concat(userId))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        serverCart = _a.sent();
                        exports.useCartStore.setState({
                            items: serverCart.items || [],
                            discounts: serverCart.discounts || [],
                            shipping: serverCart.shipping || null,
                        });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.error('Erreur chargement panier:', error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CartSync;
}());
exports.CartSync = CartSync;
exports.default = exports.useCartStore;
