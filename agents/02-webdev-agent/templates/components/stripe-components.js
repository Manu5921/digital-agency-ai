/**
 * Composants Stripe pour E-commerce
 * Phase 2 - WebDev Agent
 */
'use client';
"use strict";
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
exports.SubscriptionCard = exports.ShoppingCart = void 0;
var react_1 = require("react");
var stripe_js_1 = require("@stripe/stripe-js");
var react_stripe_js_1 = require("@stripe/react-stripe-js");
var cart_store_1 = require("@/store/cart-store");
var react_hot_toast_1 = require("react-hot-toast");
var lucide_react_1 = require("lucide-react");
// Initialisation Stripe
var stripePromise = (0, stripe_js_1.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
/**
 * Composant principal du panier
 */
function ShoppingCart() {
    var _a = (0, cart_store_1.useStore)(), items = _a.items, total = _a.total, updateQuantity = _a.updateQuantity, removeItem = _a.removeItem, clearCart = _a.clearCart;
    var _b = (0, react_1.useState)(false), isCheckoutOpen = _b[0], setIsCheckoutOpen = _b[1];
    return (<div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Panier ({items.length})
        </h2>
        {items.length > 0 && (<button onClick={clearCart} className="text-red-600 hover:text-red-800 text-sm font-medium">
            Vider le panier
          </button>)}
      </div>

      {items.length === 0 ? (<div className="text-center py-8">
          <p className="text-gray-500 mb-4">Votre panier est vide</p>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
            Continuer vos achats
          </button>
        </div>) : (<>
          <div className="space-y-4 mb-6">
            {items.map(function (item) { return (<CartItemComponent key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem}/>); })}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">
                {total.toFixed(2)} €
              </span>
            </div>

            <button onClick={function () { return setIsCheckoutOpen(true); }} className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <lucide_react_1.Lock className="w-4 h-4"/>
              Passer la commande
            </button>
          </div>
        </>)}

      {isCheckoutOpen && (<CheckoutModal items={items} total={total} onClose={function () { return setIsCheckoutOpen(false); }} onSuccess={function () {
                clearCart();
                setIsCheckoutOpen(false);
                react_hot_toast_1.toast.success('Commande passée avec succès !');
            }}/>)}
    </div>);
}
exports.ShoppingCart = ShoppingCart;
/**
 * Composant pour un article du panier
 */
function CartItemComponent(_a) {
    var item = _a.item, onUpdateQuantity = _a.onUpdateQuantity, onRemove = _a.onRemove;
    return (<div className="flex items-center gap-4 p-4 border rounded-lg">
      {item.image && (<img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>)}
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-primary font-bold">{item.price.toFixed(2)} €</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg">
          <button onClick={function () { return onUpdateQuantity(item.id, Math.max(1, item.quantity - 1)); }} className="px-3 py-1 hover:bg-gray-100">
            -
          </button>
          <span className="px-3 py-1 font-semibold">{item.quantity}</span>
          <button onClick={function () { return onUpdateQuantity(item.id, item.quantity + 1); }} className="px-3 py-1 hover:bg-gray-100">
            +
          </button>
        </div>

        <button onClick={function () { return onRemove(item.id); }} className="text-red-600 hover:text-red-800 p-1">
          ×
        </button>
      </div>
    </div>);
}
/**
 * Modal de checkout
 */
function CheckoutModal(_a) {
    var _this = this;
    var items = _a.items, total = _a.total, onClose = _a.onClose, onSuccess = _a.onSuccess;
    var _b = (0, react_1.useState)(''), clientSecret = _b[0], setClientSecret = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        // Créer la session de paiement
        var createPaymentIntent = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch('/api/stripe/create-payment-intent', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    items: items.map(function (item) { return ({
                                        productId: item.id,
                                        quantity: item.quantity,
                                        price: item.price,
                                        name: item.name,
                                    }); }),
                                    amount: Math.round(total * 100), // Conversion en centimes
                                }),
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        setClientSecret(data.clientSecret);
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Erreur création PaymentIntent:', error_1);
                        react_hot_toast_1.toast.error('Erreur lors de l\'initialisation du paiement');
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        createPaymentIntent();
    }, [items, total]);
    var appearance = {
        theme: 'stripe',
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
    var options = {
        clientSecret: clientSecret,
        appearance: appearance,
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Finaliser la commande
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Résumé de la commande */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Résumé</h3>
              <CartSummary items={items} total={total}/>
            </div>

            {/* Formulaire de paiement */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <lucide_react_1.Shield className="w-5 h-5 text-green-600"/>
                Paiement sécurisé
              </h3>
              
              {loading ? (<div className="flex items-center justify-center py-8">
                  <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-primary"/>
                </div>) : clientSecret ? (<react_stripe_js_1.Elements stripe={stripePromise} options={options}>
                  <CheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} onError={function (error) {
                react_hot_toast_1.toast.error(error);
                onClose();
            }}/>
                </react_stripe_js_1.Elements>) : (<div className="text-center py-8 text-gray-500">
                  Erreur d'initialisation du paiement
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
/**
 * Résumé du panier
 */
function CartSummary(_a) {
    var items = _a.items, total = _a.total;
    return (<div className="bg-gray-50 rounded-lg p-4">
      <div className="space-y-3">
        {items.map(function (item) { return (<div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toFixed(2)} €</span>
          </div>); })}
      </div>
      
      <div className="border-t mt-3 pt-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>);
}
/**
 * Formulaire de checkout Stripe
 */
function CheckoutForm(_a) {
    var _this = this;
    var clientSecret = _a.clientSecret, onSuccess = _a.onSuccess, onError = _a.onError;
    var stripe = (0, react_stripe_js_1.useStripe)();
    var elements = (0, react_stripe_js_1.useElements)();
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(''), email = _c[0], setEmail = _c[1];
    var handleSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var error, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!stripe || !elements) {
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, stripe.confirmPayment({
                            elements: elements,
                            confirmParams: {
                                return_url: "".concat(window.location.origin, "/success"),
                                receipt_email: email,
                            },
                            redirect: 'if_required',
                        })];
                case 2:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error('Erreur paiement:', error);
                        onError(error.message || 'Erreur lors du paiement');
                    }
                    else {
                        onSuccess();
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erreur:', error_2);
                    onError('Une erreur inattendue s\'est produite');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email de confirmation
        </label>
        <input type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="votre@email.com"/>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Informations de paiement
        </label>
        <div className="border border-gray-300 rounded-lg p-3">
          <react_stripe_js_1.PaymentElement />
        </div>
      </div>

      <button type="submit" disabled={!stripe || loading} className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? (<>
            <lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/>
            Traitement...
          </>) : (<>
            <lucide_react_1.CreditCard className="w-4 h-4"/>
            Payer maintenant
          </>)}
      </button>

      <div className="text-xs text-gray-500 text-center">
        <p className="flex items-center justify-center gap-1">
          <lucide_react_1.Lock className="w-3 h-3"/>
          Paiement sécurisé par Stripe
        </p>
      </div>
    </form>);
}
/**
 * Composant d'abonnement
 */
function SubscriptionCard(_a) {
    var _this = this;
    var title = _a.title, price = _a.price, features = _a.features, priceId = _a.priceId, _b = _a.popular, popular = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var handleSubscribe = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/stripe/create-subscription', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ priceId: priceId }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.url) {
                        window.location.href = data.url;
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_3 = _a.sent();
                    console.error('Erreur abonnement:', error_3);
                    react_hot_toast_1.toast.error('Erreur lors de la création de l\'abonnement');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<div className={"bg-white rounded-lg shadow-lg p-6 ".concat(popular ? 'ring-2 ring-primary' : '')}>
      {popular && (<div className="bg-primary text-white text-center py-1 px-3 rounded-full text-sm font-semibold mb-4">
          Populaire
        </div>)}
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-primary">{price.toFixed(2)} €</span>
        <span className="text-gray-500">/mois</span>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map(function (feature, index) { return (<li key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-green-600">✓</span>
            {feature}
          </li>); })}
      </ul>
      
      <button onClick={handleSubscribe} disabled={loading} className={"w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ".concat(popular
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200', " disabled:opacity-50 disabled:cursor-not-allowed")}>
        {loading ? (<>
            <lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/>
            Chargement...
          </>) : ('S\'abonner')}
      </button>
    </div>);
}
exports.SubscriptionCard = SubscriptionCard;
exports.default = ShoppingCart;
