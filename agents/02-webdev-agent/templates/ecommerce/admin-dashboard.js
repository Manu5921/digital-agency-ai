/**
 * Dashboard Admin E-commerce
 * Phase 2 - WebDev Agent
 */
'use client';
"use strict";
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
exports.AdminDashboard = void 0;
var react_1 = require("react");
var recharts_1 = require("recharts");
var lucide_react_1 = require("lucide-react");
var auth_middleware_1 = require("../middleware/auth-middleware");
/**
 * Composant principal du dashboard admin
 */
function AdminDashboard() {
    var user = (0, auth_middleware_1.useAuth)().user;
    var hasPermission = (0, auth_middleware_1.usePermissions)().hasPermission;
    var _a = (0, react_1.useState)('overview'), activeTab = _a[0], setActiveTab = _a[1];
    if (!hasPermission('orders:read')) {
        return (<div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-600">Vous n'avez pas les permissions pour accéder au dashboard admin.</p>
        </div>
      </div>);
    }
    var tabs = [
        { key: 'overview', label: 'Vue d\'ensemble', icon: recharts_1.BarChart },
        { key: 'orders', label: 'Commandes', icon: lucide_react_1.ShoppingCart },
        { key: 'inventory', label: 'Inventaire', icon: lucide_react_1.Package },
        { key: 'analytics', label: 'Analytics', icon: lucide_react_1.TrendingUp },
    ];
    return (<div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Admin
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Connecté en tant que {user === null || user === void 0 ? void 0 : user.name}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8">
            {tabs.map(function (_a) {
            var key = _a.key, label = _a.label, Icon = _a.icon;
            return (<button key={key} onClick={function () { return setActiveTab(key); }} className={"py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ".concat(activeTab === key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')}>
                <Icon className="w-4 h-4"/>
                {label}
              </button>);
        })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'inventory' && <InventoryTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </div>
    </div>);
}
exports.AdminDashboard = AdminDashboard;
/**
 * Onglet Vue d'ensemble
 */
function OverviewTab() {
    var _this = this;
    var _a = (0, react_1.useState)(null), stats = _a[0], setStats = _a[1];
    var _b = (0, react_1.useState)([]), recentOrders = _b[0], setRecentOrders = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        var loadOverviewData = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, statsResponse, ordersResponse, statsData, ordersData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, 5, 6]);
                        return [4 /*yield*/, Promise.all([
                                fetch('/api/admin/stats'),
                                fetch('/api/admin/orders/recent'),
                            ])];
                    case 1:
                        _a = _b.sent(), statsResponse = _a[0], ordersResponse = _a[1];
                        return [4 /*yield*/, statsResponse.json()];
                    case 2:
                        statsData = _b.sent();
                        return [4 /*yield*/, ordersResponse.json()];
                    case 3:
                        ordersData = _b.sent();
                        setStats(statsData);
                        setRecentOrders(ordersData);
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _b.sent();
                        console.error('Erreur chargement données:', error_1);
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        loadOverviewData();
    }, []);
    if (loading) {
        return (<div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>);
    }
    return (<div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Commandes totales" value={(stats === null || stats === void 0 ? void 0 : stats.totalOrders) || 0} icon={lucide_react_1.ShoppingCart} trend="+12%" trendUp={true}/>
        <StatsCard title="Chiffre d'affaires" value={"".concat(((stats === null || stats === void 0 ? void 0 : stats.totalRevenue) || 0).toFixed(2), " \u20AC")} icon={lucide_react_1.Euro} trend="+8%" trendUp={true}/>
        <StatsCard title="Panier moyen" value={"".concat(((stats === null || stats === void 0 ? void 0 : stats.averageOrderValue) || 0).toFixed(2), " \u20AC")} icon={lucide_react_1.TrendingUp} trend="+3%" trendUp={true}/>
        <StatsCard title="Commandes en attente" value={(stats === null || stats === void 0 ? void 0 : stats.pendingOrders) || 0} icon={lucide_react_1.Clock} trend="-5%" trendUp={false}/>
      </div>

      {/* Alerts */}
      {((stats === null || stats === void 0 ? void 0 : stats.lowStockItems) || 0) > 0 && (<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <lucide_react_1.AlertTriangle className="w-5 h-5 text-orange-600"/>
            <div>
              <h3 className="font-semibold text-orange-800">
                Attention: Stock faible
              </h3>
              <p className="text-orange-700 text-sm">
                {stats.lowStockItems} produit(s) ont un stock faible et nécessitent un réapprovisionnement.
              </p>
            </div>
          </div>
        </div>)}

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Commandes récentes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map(function (order) { return (<tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status}/>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {order.total.toFixed(2)} €
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                </tr>); })}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
/**
 * Onglet Commandes
 */
function OrdersTab() {
    var _this = this;
    var _a = (0, react_1.useState)([]), orders = _a[0], setOrders = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)({
        status: '',
        search: '',
        dateFrom: '',
        dateTo: '',
    }), filters = _c[0], setFilters = _c[1];
    var _d = (0, react_1.useState)(null), selectedOrder = _d[0], setSelectedOrder = _d[1];
    (0, react_1.useEffect)(function () {
        loadOrders();
    }, [filters]);
    var loadOrders = function () { return __awaiter(_this, void 0, void 0, function () {
        var params, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    params = new URLSearchParams();
                    if (filters.status)
                        params.append('status', filters.status);
                    if (filters.search)
                        params.append('search', filters.search);
                    if (filters.dateFrom)
                        params.append('dateFrom', filters.dateFrom);
                    if (filters.dateTo)
                        params.append('dateTo', filters.dateTo);
                    return [4 /*yield*/, fetch("/api/admin/orders?".concat(params))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    setOrders(data.orders);
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error('Erreur chargement commandes:', error_2);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var updateOrderStatus = function (orderId, newStatus) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/admin/orders/".concat(orderId, "/status"), {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: newStatus }),
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, loadOrders()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Erreur mise à jour statut:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recherche
            </label>
            <div className="relative">
              <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <input type="text" value={filters.search} onChange={function (e) { return setFilters(function (prev) { return (__assign(__assign({}, prev), { search: e.target.value })); }); }} placeholder="Numéro, email..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select value={filters.status} onChange={function (e) { return setFilters(function (prev) { return (__assign(__assign({}, prev), { status: e.target.value })); }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="CONFIRMED">Confirmée</option>
              <option value="PROCESSING">En traitement</option>
              <option value="SHIPPED">Expédiée</option>
              <option value="DELIVERED">Livrée</option>
              <option value="CANCELLED">Annulée</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date début
            </label>
            <input type="date" value={filters.dateFrom} onChange={function (e) { return setFilters(function (prev) { return (__assign(__assign({}, prev), { dateFrom: e.target.value })); }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date fin
            </label>
            <input type="date" value={filters.dateTo} onChange={function (e) { return setFilters(function (prev) { return (__assign(__assign({}, prev), { dateTo: e.target.value })); }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Commandes ({orders.length})
          </h2>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2">
            <lucide_react_1.Download className="w-4 h-4"/>
            Exporter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (<tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>) : orders.length === 0 ? (<tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucune commande trouvée
                  </td>
                </tr>) : (orders.map(function (order) { return (<tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusSelect currentStatus={order.status} onChange={function (newStatus) { return updateOrderStatus(order.id, newStatus); }}/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PaymentStatusBadge status={order.paymentStatus}/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {order.total.toFixed(2)} €
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={function () { return setSelectedOrder(order); }} className="p-1 text-blue-600 hover:text-blue-800" title="Voir détails">
                          <lucide_react_1.Eye className="w-4 h-4"/>
                        </button>
                      </div>
                    </td>
                  </tr>); }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (<OrderDetailsModal order={selectedOrder} onClose={function () { return setSelectedOrder(null); }}/>)}
    </div>);
}
/**
 * Onglet Inventaire
 */
function InventoryTab() {
    var _this = this;
    var _a = (0, react_1.useState)([]), lowStockItems = _a[0], setLowStockItems = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        var loadInventoryData = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch('/api/admin/inventory/low-stock')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setLowStockItems(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Erreur chargement inventaire:', error_4);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadInventoryData();
    }, []);
    return (<div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Produits à stock faible
        </h2>
        
        {loading ? (<div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>) : lowStockItems.length === 0 ? (<div className="text-center py-8 text-gray-500">
            Aucun produit à stock faible
          </div>) : (<div className="space-y-4">
            {lowStockItems.map(function (item) { return (<div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{item.variant.product.name}</h3>
                  <p className="text-sm text-gray-600">{item.variant.name}</p>
                  <p className="text-sm text-red-600">
                    Stock: {item.quantity} (Seuil: {item.reorderPoint})
                  </p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                  Réapprovisionner
                </button>
              </div>); })}
          </div>)}
      </div>
    </div>);
}
/**
 * Onglet Analytics
 */
function AnalyticsTab() {
    var _this = this;
    var _a = (0, react_1.useState)(null), analytics = _a[0], setAnalytics = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        var loadAnalytics = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch('/api/admin/analytics')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setAnalytics(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_5 = _a.sent();
                        console.error('Erreur chargement analytics:', error_5);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadAnalytics();
    }, []);
    if (loading) {
        return (<div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Évolution du chiffre d'affaires
        </h2>
        <div className="h-80">
          <recharts_1.ResponsiveContainer width="100%" height="100%">
            <recharts_1.LineChart data={(analytics === null || analytics === void 0 ? void 0 : analytics.revenueChart) || []}>
              <recharts_1.CartesianGrid strokeDasharray="3 3"/>
              <recharts_1.XAxis dataKey="date"/>
              <recharts_1.YAxis />
              <recharts_1.Tooltip />
              <recharts_1.Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2}/>
            </recharts_1.LineChart>
          </recharts_1.ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Produits les plus vendus
        </h2>
        <div className="h-80">
          <recharts_1.ResponsiveContainer width="100%" height="100%">
            <recharts_1.BarChart data={(analytics === null || analytics === void 0 ? void 0 : analytics.topProducts) || []}>
              <recharts_1.CartesianGrid strokeDasharray="3 3"/>
              <recharts_1.XAxis dataKey="name"/>
              <recharts_1.YAxis />
              <recharts_1.Tooltip />
              <recharts_1.Bar dataKey="quantity" fill="#d4af37"/>
            </recharts_1.BarChart>
          </recharts_1.ResponsiveContainer>
        </div>
      </div>
    </div>);
}
/**
 * Composants utilitaires
 */
function StatsCard(_a) {
    var title = _a.title, value = _a.value, Icon = _a.icon, trend = _a.trend, trendUp = _a.trendUp;
    return (<div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (<p className={"text-sm ".concat(trendUp ? 'text-green-600' : 'text-red-600')}>
              {trend} vs mois dernier
            </p>)}
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="w-6 h-6 text-primary"/>
        </div>
      </div>
    </div>);
}
function OrderStatusBadge(_a) {
    var status = _a.status;
    var statusConfig = {
        PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
        CONFIRMED: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
        PROCESSING: { label: 'Traitement', color: 'bg-purple-100 text-purple-800' },
        SHIPPED: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800' },
        DELIVERED: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
        CANCELLED: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
        REFUNDED: { label: 'Remboursée', color: 'bg-gray-100 text-gray-800' },
    };
    var config = statusConfig[status];
    return (<span className={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(config.color)}>
      {config.label}
    </span>);
}
function PaymentStatusBadge(_a) {
    var status = _a.status;
    var statusConfig = {
        PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
        PAID: { label: 'Payé', color: 'bg-green-100 text-green-800' },
        FAILED: { label: 'Échoué', color: 'bg-red-100 text-red-800' },
        CANCELLED: { label: 'Annulé', color: 'bg-gray-100 text-gray-800' },
        REFUNDED: { label: 'Remboursé', color: 'bg-orange-100 text-orange-800' },
    };
    var config = statusConfig[status];
    return (<span className={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(config.color)}>
      {config.label}
    </span>);
}
function OrderStatusSelect(_a) {
    var currentStatus = _a.currentStatus, onChange = _a.onChange;
    return (<select value={currentStatus} onChange={function (e) { return onChange(e.target.value); }} className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent">
      <option value="PENDING">En attente</option>
      <option value="CONFIRMED">Confirmée</option>
      <option value="PROCESSING">Traitement</option>
      <option value="SHIPPED">Expédiée</option>
      <option value="DELIVERED">Livrée</option>
      <option value="CANCELLED">Annulée</option>
    </select>);
}
function OrderDetailsModal(_a) {
    var order = _a.order, onClose = _a.onClose;
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Commande {order.orderNumber}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {/* Order Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Informations client</h3>
              <p className="text-gray-600">{order.customerEmail}</p>
              <p className="text-gray-600">{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Statuts</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Commande:</span>
                  <OrderStatusBadge status={order.status}/>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Paiement:</span>
                  <PaymentStatusBadge status={order.paymentStatus}/>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Articles commandés</h3>
            <div className="space-y-2">
              {order.items.map(function (item, index) { return (<div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.totalPrice.toFixed(2)} €</p>
                    <p className="text-sm text-gray-600">{item.unitPrice.toFixed(2)} € / unité</p>
                  </div>
                </div>); })}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>{order.total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
exports.default = AdminDashboard;
