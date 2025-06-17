/**
 * Dashboard Admin E-commerce
 * Phase 2 - WebDev Agent
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Euro,
  AlertTriangle,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { OrderManager, Order, OrderStatus } from './order-system';
import { InventoryManager } from './inventory-manager';
import { useAuth, usePermissions } from '../middleware/auth-middleware';

// Types
interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
  lowStockItems: number;
  totalCustomers: number;
}

interface ChartData {
  name: string;
  value: number;
  revenue?: number;
}

/**
 * Composant principal du dashboard admin
 */
export function AdminDashboard() {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'analytics'>('overview');

  if (!hasPermission('orders:read')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-600">Vous n'avez pas les permissions pour accéder au dashboard admin.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'overview', label: 'Vue d\'ensemble', icon: BarChart },
    { key: 'orders', label: 'Commandes', icon: ShoppingCart },
    { key: 'inventory', label: 'Inventaire', icon: Package },
    { key: 'analytics', label: 'Analytics', icon: TrendingUp },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Admin
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Connecté en tant que {user?.name}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
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
    </div>
  );
}

/**
 * Onglet Vue d'ensemble
 */
function OverviewTab() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        const [statsResponse, ordersResponse] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/orders/recent'),
        ]);

        const statsData = await statsResponse.json();
        const ordersData = await ordersResponse.json();

        setStats(statsData);
        setRecentOrders(ordersData);
      } catch (error) {
        console.error('Erreur chargement données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Commandes totales"
          value={stats?.totalOrders || 0}
          icon={ShoppingCart}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Chiffre d'affaires"
          value={`${(stats?.totalRevenue || 0).toFixed(2)} €`}
          icon={Euro}
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Panier moyen"
          value={`${(stats?.averageOrderValue || 0).toFixed(2)} €`}
          icon={TrendingUp}
          trend="+3%"
          trendUp={true}
        />
        <StatsCard
          title="Commandes en attente"
          value={stats?.pendingOrders || 0}
          icon={Clock}
          trend="-5%"
          trendUp={false}
        />
      </div>

      {/* Alerts */}
      {(stats?.lowStockItems || 0) > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-800">
                Attention: Stock faible
              </h3>
              <p className="text-orange-700 text-sm">
                {stats.lowStockItems} produit(s) ont un stock faible et nécessitent un réapprovisionnement.
              </p>
            </div>
          </div>
        </div>
      )}

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
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {order.total.toFixed(2)} €
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/**
 * Onglet Commandes
 */
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    dateFrom: '',
    dateTo: '',
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, [filters]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      await loadOrders();
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recherche
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Numéro, email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
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
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date fin
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
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
            <Download className="w-4 h-4" />
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatusSelect
                        currentStatus={order.status}
                        onChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PaymentStatusBadge status={order.paymentStatus} />
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
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

/**
 * Onglet Inventaire
 */
function InventoryTab() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventoryData = async () => {
      try {
        const response = await fetch('/api/admin/inventory/low-stock');
        const data = await response.json();
        setLowStockItems(data);
      } catch (error) {
        console.error('Erreur chargement inventaire:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInventoryData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Produits à stock faible
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : lowStockItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun produit à stock faible
          </div>
        ) : (
          <div className="space-y-4">
            {lowStockItems.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Onglet Analytics
 */
function AnalyticsTab() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Erreur chargement analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Évolution du chiffre d'affaires
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics?.revenueChart || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Produits les plus vendus
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics?.topProducts || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#d4af37" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/**
 * Composants utilitaires
 */
function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend} vs mois dernier
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    CONFIRMED: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
    PROCESSING: { label: 'Traitement', color: 'bg-purple-100 text-purple-800' },
    SHIPPED: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800' },
    DELIVERED: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
    REFUNDED: { label: 'Remboursée', color: 'bg-gray-100 text-gray-800' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    PAID: { label: 'Payé', color: 'bg-green-100 text-green-800' },
    FAILED: { label: 'Échoué', color: 'bg-red-100 text-red-800' },
    CANCELLED: { label: 'Annulé', color: 'bg-gray-100 text-gray-800' },
    REFUNDED: { label: 'Remboursé', color: 'bg-orange-100 text-orange-800' },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

function OrderStatusSelect({
  currentStatus,
  onChange,
}: {
  currentStatus: OrderStatus;
  onChange: (status: OrderStatus) => void;
}) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value as OrderStatus)}
      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      <option value="PENDING">En attente</option>
      <option value="CONFIRMED">Confirmée</option>
      <option value="PROCESSING">Traitement</option>
      <option value="SHIPPED">Expédiée</option>
      <option value="DELIVERED">Livrée</option>
      <option value="CANCELLED">Annulée</option>
    </select>
  );
}

function OrderDetailsModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Commande {order.orderNumber}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
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
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Paiement:</span>
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Articles commandés</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.totalPrice.toFixed(2)} €</p>
                    <p className="text-sm text-gray-600">{item.unitPrice.toFixed(2)} € / unité</p>
                  </div>
                </div>
              ))}
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
    </div>
  );
}

export default AdminDashboard;