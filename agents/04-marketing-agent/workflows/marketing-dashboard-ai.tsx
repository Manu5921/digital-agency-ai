/**
 * 📊 MARKETING DASHBOARD AI - INTERFACE DE PILOTAGE PRÉDICTIF
 * Phase 3 Advanced Growth Hacking Module
 * 
 * Features:
 * - Dashboard temps réel avec métriques ROAS et LTV
 * - Visualisations prédictives ML avancées
 * - Alertes intelligentes et recommandations IA
 * - Interface de pilotage omnicanal unifiée
 * - Analytics prédictifs avec scenarios planning
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter,
  TreeMap, FunnelChart, Funnel, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Target, Users, DollarSign,
  Brain, Zap, Eye, Settings, Filter, Download, RefreshCw, Calendar
} from 'lucide-react';

// Types pour le dashboard
interface DashboardMetrics {
  roas: {
    current: number;
    predicted: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    confidence: number;
  };
  ltv: {
    average: number;
    predicted: number;
    segments: { [segment: string]: number };
    trend: 'up' | 'down' | 'stable';
    confidence: number;
  };
  churn: {
    rate: number;
    predicted: number;
    prevention: number;
    savings: number;
  };
  attribution: {
    channels: { [channel: string]: number };
    synergies: { [pair: string]: number };
    incrementality: { [channel: string]: number };
  };
  budget: {
    allocated: { [channel: string]: number };
    optimal: { [channel: string]: number };
    efficiency: number;
    waste: number;
  };
  campaigns: {
    active: number;
    performance: CampaignPerformance[];
    predictions: CampaignPrediction[];
  };
  influencers: {
    active: number;
    performance: InfluencerPerformance[];
    fraud: FraudAlert[];
  };
  realtime: {
    visitors: number;
    conversions: number;
    revenue: number;
    personalizations: number;
  };
}

interface CampaignPerformance {
  id: string;
  name: string;
  channel: string;
  spend: number;
  revenue: number;
  roas: number;
  conversions: number;
  trend: 'up' | 'down' | 'stable';
  status: 'active' | 'paused' | 'completed';
}

interface CampaignPrediction {
  campaignId: string;
  predictedROAS: number;
  predictedRevenue: number;
  confidence: number;
  recommendation: string;
  alertLevel: 'low' | 'medium' | 'high';
}

interface InfluencerPerformance {
  id: string;
  name: string;
  platform: string;
  reach: number;
  engagement: number;
  conversions: number;
  roi: number;
  fraudScore: number;
}

interface FraudAlert {
  influencerId: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
}

interface AIInsight {
  type: 'optimization' | 'alert' | 'opportunity' | 'prediction';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: number;
  confidence: number;
  action: string;
  expectedOutcome: string;
}

interface ScenarioData {
  name: string;
  budget: number;
  expectedROAS: number;
  expectedRevenue: number;
  probability: number;
  timeline: string;
}

/**
 * 🎯 COMPOSANT PRINCIPAL DU DASHBOARD
 */
export const MarketingDashboardAI: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedTab, setSelectedTab] = useState('overview');

  // Chargement des données initiales
  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh toutes les 30s
    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  /**
   * 📊 CHARGEMENT DES DONNÉES DU DASHBOARD
   */
  const loadDashboardData = useCallback(async () => {
    try {
      setRefreshing(true);
      
      // Simulation d'appel API (en production, remplacer par vrais appels)
      const mockMetrics: DashboardMetrics = {
        roas: {
          current: 5.2,
          predicted: 6.8,
          target: 6.0,
          trend: 'up',
          confidence: 0.87
        },
        ltv: {
          average: 847,
          predicted: 1024,
          segments: {
            'high_value': 2145,
            'medium_value': 654,
            'low_value': 234
          },
          trend: 'up',
          confidence: 0.92
        },
        churn: {
          rate: 0.08,
          predicted: 0.06,
          prevention: 0.02,
          savings: 45000
        },
        attribution: {
          channels: {
            'google_ads': 0.34,
            'facebook_ads': 0.28,
            'email': 0.15,
            'organic': 0.12,
            'influencers': 0.11
          },
          synergies: {
            'google_ads+facebook_ads': 0.23,
            'email+google_ads': 0.18,
            'influencers+social': 0.15
          },
          incrementality: {
            'google_ads': 0.78,
            'facebook_ads': 0.65,
            'email': 0.92
          }
        },
        budget: {
          allocated: {
            'google_ads': 50000,
            'facebook_ads': 35000,
            'email': 8000,
            'influencers': 15000
          },
          optimal: {
            'google_ads': 58000,
            'facebook_ads': 32000,
            'email': 12000,
            'influencers': 18000
          },
          efficiency: 0.84,
          waste: 12000
        },
        campaigns: {
          active: 12,
          performance: generateMockCampaigns(),
          predictions: generateMockPredictions()
        },
        influencers: {
          active: 8,
          performance: generateMockInfluencers(),
          fraud: generateMockFraudAlerts()
        },
        realtime: {
          visitors: 1247,
          conversions: 43,
          revenue: 12847,
          personalizations: 892
        }
      };

      const mockInsights: AIInsight[] = [
        {
          type: 'optimization',
          priority: 'high',
          title: 'Budget Reallocation Opportunity',
          description: 'Shifting 15% budget from Facebook to Google Ads could increase ROAS by 23%',
          impact: 0.23,
          confidence: 0.89,
          action: 'Reallocate Budget',
          expectedOutcome: '+$18,500 monthly revenue'
        },
        {
          type: 'alert',
          priority: 'critical',
          title: 'Churn Risk Detected',
          description: '127 high-value customers showing churn signals',
          impact: 0.15,
          confidence: 0.94,
          action: 'Launch Retention Campaign',
          expectedOutcome: 'Prevent $89,000 revenue loss'
        },
        {
          type: 'opportunity',
          priority: 'medium',
          title: 'Cross-Channel Synergy',
          description: 'Email + Google Ads combination shows 34% uplift potential',
          impact: 0.34,
          confidence: 0.76,
          action: 'Create Integrated Campaign',
          expectedOutcome: '+$25,000 incremental revenue'
        }
      ];

      const mockScenarios: ScenarioData[] = [
        {
          name: 'Conservative Growth',
          budget: 120000,
          expectedROAS: 4.8,
          expectedRevenue: 576000,
          probability: 0.85,
          timeline: '3 months'
        },
        {
          name: 'Aggressive Expansion',
          budget: 180000,
          expectedROAS: 5.9,
          expectedRevenue: 1062000,
          probability: 0.65,
          timeline: '6 months'
        },
        {
          name: 'AI-Optimized',
          budget: 150000,
          expectedROAS: 6.7,
          expectedRevenue: 1005000,
          probability: 0.78,
          timeline: '4 months'
        }
      ];

      setMetrics(mockMetrics);
      setInsights(mockInsights);
      setScenarios(mockScenarios);
      setLoading(false);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [selectedTimeRange]);

  // Métriques calculées
  const calculatedMetrics = useMemo(() => {
    if (!metrics) return null;

    const totalSpend = Object.values(metrics.budget.allocated).reduce((sum, val) => sum + val, 0);
    const totalRevenue = totalSpend * metrics.roas.current;
    const efficiencyScore = metrics.budget.efficiency * 100;
    const predictionAccuracy = (metrics.roas.confidence + metrics.ltv.confidence) / 2 * 100;

    return {
      totalSpend,
      totalRevenue,
      efficiencyScore,
      predictionAccuracy,
      monthlyGrowth: 12.5,
      customerAcquisitionCost: totalSpend / (metrics.realtime.conversions * 30),
      lifetimeValue: metrics.ltv.average
    };
  }, [metrics]);

  if (loading || !metrics || !calculatedMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading Marketing Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header avec contrôles */}
      <DashboardHeader 
        onRefresh={loadDashboardData}
        refreshing={refreshing}
        timeRange={selectedTimeRange}
        onTimeRangeChange={setSelectedTimeRange}
      />

      {/* Alertes critiques */}
      <CriticalAlerts insights={insights.filter(i => i.priority === 'critical')} />

      {/* Métriques clés */}
      <KeyMetricsGrid metrics={metrics} calculated={calculatedMetrics} />

      {/* Tabs principales */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attribution">Attribution</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions</TabsTrigger>
          <TabsTrigger value="influencers">Influenceurs</TabsTrigger>
          <TabsTrigger value="scenarios">Scénarios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab metrics={metrics} insights={insights} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceTab metrics={metrics} />
        </TabsContent>

        <TabsContent value="attribution" className="space-y-6">
          <AttributionTab metrics={metrics} />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <PredictionsTab metrics={metrics} insights={insights} />
        </TabsContent>

        <TabsContent value="influencers" className="space-y-6">
          <InfluencersTab metrics={metrics} />
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <ScenariosTab scenarios={scenarios} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

/**
 * 🎯 COMPOSANT HEADER DU DASHBOARD
 */
const DashboardHeader: React.FC<{
  onRefresh: () => void;
  refreshing: boolean;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}> = ({ onRefresh, refreshing, timeRange, onTimeRangeChange }) => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Marketing Dashboard AI</h1>
      <p className="text-gray-500">Pilotage prédictif et optimisation temps réel</p>
    </div>
    
    <div className="flex items-center space-x-4">
      <select 
        value={timeRange} 
        onChange={(e) => onTimeRangeChange(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="7d">7 jours</option>
        <option value="30d">30 jours</option>
        <option value="90d">90 jours</option>
        <option value="1y">1 an</option>
      </select>
      
      <Button 
        onClick={onRefresh} 
        disabled={refreshing}
        variant="outline"
        size="sm"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        Actualiser
      </Button>
      
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  </div>
);

/**
 * 🚨 COMPOSANT ALERTES CRITIQUES
 */
const CriticalAlerts: React.FC<{ insights: AIInsight[] }> = ({ insights }) => {
  if (insights.length === 0) return null;

  return (
    <div className="space-y-2">
      {insights.map((insight, index) => (
        <Alert key={index} variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            <div>
              <strong>{insight.title}</strong>: {insight.description}
            </div>
            <Button size="sm" variant="outline">
              {insight.action}
            </Button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

/**
 * 📊 GRILLE DES MÉTRIQUES CLÉS
 */
const KeyMetricsGrid: React.FC<{
  metrics: DashboardMetrics;
  calculated: any;
}> = ({ metrics, calculated }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <MetricCard
      title="ROAS Actuel"
      value={`${metrics.roas.current}:1`}
      predicted={`${metrics.roas.predicted}:1`}
      trend={metrics.roas.trend}
      confidence={metrics.roas.confidence}
      icon={<TrendingUp />}
      color="green"
    />
    
    <MetricCard
      title="LTV Moyenne"
      value={`$${metrics.ltv.average}`}
      predicted={`$${metrics.ltv.predicted}`}
      trend={metrics.ltv.trend}
      confidence={metrics.ltv.confidence}
      icon={<Users />}
      color="blue"
    />
    
    <MetricCard
      title="Churn Rate"
      value={`${(metrics.churn.rate * 100).toFixed(1)}%`}
      predicted={`${(metrics.churn.predicted * 100).toFixed(1)}%`}
      trend={metrics.churn.rate > metrics.churn.predicted ? 'down' : 'up'}
      confidence={0.91}
      icon={<AlertTriangle />}
      color="orange"
    />
    
    <MetricCard
      title="Efficacité Budget"
      value={`${calculated.efficiencyScore.toFixed(0)}%`}
      predicted={`${(calculated.efficiencyScore + 12).toFixed(0)}%`}
      trend="up"
      confidence={0.85}
      icon={<Target />}
      color="purple"
    />
  </div>
);

/**
 * 🎯 COMPOSANT CARTE MÉTRIQUE
 */
const MetricCard: React.FC<{
  title: string;
  value: string;
  predicted: string;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, predicted, trend, confidence, icon, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`text-${color}-600`}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <span>Prédit: {predicted}</span>
        <Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}>
          {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
        </Badge>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Confiance</span>
          <span>{(confidence * 100).toFixed(0)}%</span>
        </div>
        <Progress value={confidence * 100} className="mt-1" />
      </div>
    </CardContent>
  </Card>
);

/**
 * 📈 TAB VUE D'ENSEMBLE
 */
const OverviewTab: React.FC<{
  metrics: DashboardMetrics;
  insights: AIInsight[];
}> = ({ metrics, insights }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Graphique ROAS et revenus */}
    <Card>
      <CardHeader>
        <CardTitle>Performance ROAS & Revenus</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={generateTimeSeriesData('roas')}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="roas" stroke="#8884d8" name="ROAS" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenus" />
            <Line type="monotone" dataKey="predicted" stroke="#ff7300" strokeDasharray="5 5" name="Prédiction" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Attribution des canaux */}
    <Card>
      <CardHeader>
        <CardTitle>Attribution Cross-Canal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={Object.entries(metrics.attribution.channels).map(([channel, value]) => ({
                name: channel,
                value: value * 100
              }))}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {Object.keys(metrics.attribution.channels).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Insights IA */}
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Insights IA & Recommandations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

/**
 * 🎯 COMPOSANT CARTE INSIGHT
 */
const InsightCard: React.FC<{ insight: AIInsight }> = ({ insight }) => (
  <div className="p-4 border rounded-lg space-y-2">
    <div className="flex justify-between items-start">
      <div className="flex items-center space-x-2">
        <Badge variant={insight.priority === 'critical' ? 'destructive' : 'default'}>
          {insight.priority}
        </Badge>
        <h4 className="font-semibold">{insight.title}</h4>
      </div>
      <div className="text-right">
        <div className="text-sm text-green-600 font-medium">
          +{(insight.impact * 100).toFixed(0)}% impact
        </div>
        <div className="text-xs text-gray-500">
          {(insight.confidence * 100).toFixed(0)}% confiance
        </div>
      </div>
    </div>
    
    <p className="text-sm text-gray-600">{insight.description}</p>
    
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-blue-600">{insight.expectedOutcome}</span>
      <Button size="sm">{insight.action}</Button>
    </div>
  </div>
);

/**
 * 📊 TAB PERFORMANCE
 */
const PerformanceTab: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => (
  <div className="space-y-6">
    {/* Performance des campagnes */}
    <Card>
      <CardHeader>
        <CardTitle>Performance des Campagnes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Campagne</th>
                <th className="text-left p-2">Canal</th>
                <th className="text-right p-2">Dépense</th>
                <th className="text-right p-2">Revenus</th>
                <th className="text-right p-2">ROAS</th>
                <th className="text-right p-2">Conversions</th>
                <th className="text-center p-2">Tendance</th>
                <th className="text-center p-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {metrics.campaigns.performance.map((campaign, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-medium">{campaign.name}</td>
                  <td className="p-2">{campaign.channel}</td>
                  <td className="p-2 text-right">${campaign.spend.toLocaleString()}</td>
                  <td className="p-2 text-right">${campaign.revenue.toLocaleString()}</td>
                  <td className="p-2 text-right">{campaign.roas.toFixed(1)}:1</td>
                  <td className="p-2 text-right">{campaign.conversions}</td>
                  <td className="p-2 text-center">
                    {campaign.trend === 'up' ? '↗️' : campaign.trend === 'down' ? '↘️' : '➡️'}
                  </td>
                  <td className="p-2 text-center">
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    {/* Graphique de performance temporelle */}
    <Card>
      <CardHeader>
        <CardTitle>Évolution Performance Multi-Canal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={generateChannelPerformanceData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="google_ads" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="facebook_ads" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="email" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="influencers" stackId="1" stroke="#ff7300" fill="#ff7300" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

/**
 * 🎯 TAB ATTRIBUTION
 */
const AttributionTab: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Attribution par canal */}
    <Card>
      <CardHeader>
        <CardTitle>Attribution par Canal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.entries(metrics.attribution.channels).map(([channel, value]) => ({
            channel,
            attribution: value * 100,
            incrementality: metrics.attribution.incrementality[channel] * 100
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attribution" fill="#8884d8" name="Attribution %" />
            <Bar dataKey="incrementality" fill="#82ca9d" name="Incrementalité %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Synergies cross-canal */}
    <Card>
      <CardHeader>
        <CardTitle>Synergies Cross-Canal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(metrics.attribution.synergies).map(([pair, value]) => (
            <div key={pair} className="flex justify-between items-center">
              <span className="text-sm font-medium">{pair.replace('+', ' + ')}</span>
              <div className="flex items-center space-x-2">
                <Progress value={value * 100} className="w-20" />
                <span className="text-sm text-green-600">+{(value * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Budget optimal vs actuel */}
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Optimisation Budget - Actuel vs Optimal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.keys(metrics.budget.allocated).map(channel => ({
            channel,
            allocated: metrics.budget.allocated[channel],
            optimal: metrics.budget.optimal[channel],
            difference: metrics.budget.optimal[channel] - metrics.budget.allocated[channel]
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="allocated" fill="#8884d8" name="Budget Actuel" />
            <Bar dataKey="optimal" fill="#82ca9d" name="Budget Optimal" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

/**
 * 🔮 TAB PRÉDICTIONS
 */
const PredictionsTab: React.FC<{
  metrics: DashboardMetrics;
  insights: AIInsight[];
}> = ({ metrics, insights }) => (
  <div className="space-y-6">
    {/* Prédictions LTV par segment */}
    <Card>
      <CardHeader>
        <CardTitle>Prédictions LTV par Segment</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.entries(metrics.ltv.segments).map(([segment, value]) => ({
            segment,
            ltv: value,
            predicted: value * 1.2 // Simulation croissance
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ltv" fill="#8884d8" name="LTV Actuelle" />
            <Bar dataKey="predicted" fill="#82ca9d" name="LTV Prédite" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Prédictions de churn */}
    <Card>
      <CardHeader>
        <CardTitle>Analyse Prédictive du Churn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {(metrics.churn.rate * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Taux Actuel</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {(metrics.churn.predicted * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Prédit (optimisé)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${metrics.churn.savings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Économies Potentielles</div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={generateChurnPredictionData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="churn" stroke="#ff7300" name="Taux de Churn %" />
            <Line type="monotone" dataKey="prevented" stroke="#82ca9d" name="Churn Évité %" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Prédictions campagnes */}
    <Card>
      <CardHeader>
        <CardTitle>Prédictions Performance Campagnes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.campaigns.predictions.map((prediction, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Campagne {prediction.campaignId}</span>
                <Badge variant={prediction.alertLevel === 'high' ? 'destructive' : 'default'}>
                  {prediction.alertLevel}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">ROAS Prédit:</span>
                  <div className="font-bold">{prediction.predictedROAS.toFixed(1)}:1</div>
                </div>
                <div>
                  <span className="text-gray-500">Revenus Prédits:</span>
                  <div className="font-bold">${prediction.predictedRevenue.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-500">Confiance:</span>
                  <div className="font-bold">{(prediction.confidence * 100).toFixed(0)}%</div>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                <strong>Recommandation:</strong> {prediction.recommendation}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

/**
 * 🌟 TAB INFLUENCEURS
 */
const InfluencersTab: React.FC<{ metrics: DashboardMetrics }> = ({ metrics }) => (
  <div className="space-y-6">
    {/* Performance des influenceurs */}
    <Card>
      <CardHeader>
        <CardTitle>Performance des Influenceurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Influenceur</th>
                <th className="text-left p-2">Plateforme</th>
                <th className="text-right p-2">Reach</th>
                <th className="text-right p-2">Engagement</th>
                <th className="text-right p-2">Conversions</th>
                <th className="text-right p-2">ROI</th>
                <th className="text-center p-2">Score Fraude</th>
              </tr>
            </thead>
            <tbody>
              {metrics.influencers.performance.map((influencer, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-medium">{influencer.name}</td>
                  <td className="p-2">{influencer.platform}</td>
                  <td className="p-2 text-right">{influencer.reach.toLocaleString()}</td>
                  <td className="p-2 text-right">{influencer.engagement.toLocaleString()}</td>
                  <td className="p-2 text-right">{influencer.conversions}</td>
                  <td className="p-2 text-right">{influencer.roi.toFixed(1)}:1</td>
                  <td className="p-2 text-center">
                    <Badge variant={influencer.fraudScore < 0.3 ? 'default' : influencer.fraudScore < 0.7 ? 'secondary' : 'destructive'}>
                      {(influencer.fraudScore * 100).toFixed(0)}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    {/* Alertes fraude */}
    <Card>
      <CardHeader>
        <CardTitle>Alertes Fraude Détectées</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.influencers.fraud.map((alert, index) => (
            <Alert key={index} variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div>
                    <strong>Influenceur {alert.influencerId}</strong> - {alert.type}
                    <p className="text-sm mt-1">{alert.description}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      <strong>Action:</strong> {alert.recommendation}
                    </p>
                  </div>
                  <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                    {alert.severity}
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Graphique ROI vs Fraud Score */}
    <Card>
      <CardHeader>
        <CardTitle>Analyse ROI vs Score de Fraude</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={metrics.influencers.performance.map(inf => ({
            roi: inf.roi,
            fraudScore: inf.fraudScore * 100,
            name: inf.name
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fraudScore" name="Score Fraude %" />
            <YAxis dataKey="roi" name="ROI" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

/**
 * 🎯 TAB SCÉNARIOS
 */
const ScenariosTab: React.FC<{ scenarios: ScenarioData[] }> = ({ scenarios }) => (
  <div className="space-y-6">
    {/* Comparaison des scénarios */}
    <Card>
      <CardHeader>
        <CardTitle>Scenarios Planning - Comparaison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scenarios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expectedROAS" fill="#8884d8" name="ROAS Attendu" />
            <Bar dataKey="probability" fill="#82ca9d" name="Probabilité %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Détails des scénarios */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scenarios.map((scenario, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{scenario.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Budget:</span>
              <span className="font-bold">${scenario.budget.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">ROAS Attendu:</span>
              <span className="font-bold text-green-600">{scenario.expectedROAS.toFixed(1)}:1</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Revenus Prédits:</span>
              <span className="font-bold">${scenario.expectedRevenue.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Probabilité:</span>
              <span className="font-bold">{(scenario.probability * 100).toFixed(0)}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Timeline:</span>
              <span className="font-bold">{scenario.timeline}</span>
            </div>
            
            <Progress value={scenario.probability * 100} className="mt-4" />
            
            <Button className="w-full mt-4" variant="outline">
              Sélectionner ce Scénario
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Radar chart comparaison */}
    <Card>
      <CardHeader>
        <CardTitle>Comparaison Multi-Critères</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={generateRadarData(scenarios)}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Conservative" dataKey="conservative" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
            <Radar name="Aggressive" dataKey="aggressive" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
            <Radar name="AI-Optimized" dataKey="aiOptimized" stroke="#ffc658" fill="#ffc658" fillOpacity={0.1} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

/**
 * 🛠️ FONCTIONS UTILITAIRES POUR GÉNÉRATION DE DONNÉES MOCK
 */

// Couleurs pour les graphiques
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Génération de données temporelles
const generateTimeSeriesData = (type: string) => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      roas: 4.5 + Math.random() * 2,
      revenue: 10000 + Math.random() * 5000,
      predicted: 5.8 + Math.random() * 0.5
    });
  }
  return data;
};

// Génération de données de performance par canal
const generateChannelPerformanceData = () => {
  const data = [];
  for (let i = 7; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      google_ads: 15000 + Math.random() * 5000,
      facebook_ads: 12000 + Math.random() * 4000,
      email: 3000 + Math.random() * 1000,
      influencers: 5000 + Math.random() * 2000
    });
  }
  return data;
};

// Génération de données de prédiction de churn
const generateChurnPredictionData = () => {
  const data = [];
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'];
  
  months.forEach((month, index) => {
    data.push({
      month,
      churn: 8 - index * 0.5 + Math.random() * 1,
      prevented: 8 - index * 1.2 + Math.random() * 0.5
    });
  });
  
  return data;
};

// Génération de campagnes mock
const generateMockCampaigns = (): CampaignPerformance[] => [
  {
    id: 'camp_1',
    name: 'Summer Sale 2024',
    channel: 'Google Ads',
    spend: 15000,
    revenue: 78000,
    roas: 5.2,
    conversions: 234,
    trend: 'up',
    status: 'active'
  },
  {
    id: 'camp_2',
    name: 'Brand Awareness',
    channel: 'Facebook Ads',
    spend: 12000,
    revenue: 36000,
    roas: 3.0,
    conversions: 156,
    trend: 'stable',
    status: 'active'
  },
  {
    id: 'camp_3',
    name: 'Retargeting Campaign',
    channel: 'Email',
    spend: 2000,
    revenue: 18000,
    roas: 9.0,
    conversions: 89,
    trend: 'up',
    status: 'active'
  }
];

// Génération de prédictions mock
const generateMockPredictions = (): CampaignPrediction[] => [
  {
    campaignId: 'camp_1',
    predictedROAS: 6.1,
    predictedRevenue: 91500,
    confidence: 0.87,
    recommendation: 'Augmenter le budget de 20%',
    alertLevel: 'low'
  },
  {
    campaignId: 'camp_2',
    predictedROAS: 2.1,
    predictedRevenue: 25200,
    confidence: 0.72,
    recommendation: 'Optimiser le ciblage audience',
    alertLevel: 'high'
  }
];

// Génération d'influenceurs mock
const generateMockInfluencers = (): InfluencerPerformance[] => [
  {
    id: 'inf_1',
    name: '@lifestyle_guru',
    platform: 'Instagram',
    reach: 125000,
    engagement: 8500,
    conversions: 34,
    roi: 4.2,
    fraudScore: 0.15
  },
  {
    id: 'inf_2',
    name: '@tech_reviewer',
    platform: 'YouTube',
    reach: 89000,
    engagement: 12000,
    conversions: 67,
    roi: 6.8,
    fraudScore: 0.08
  },
  {
    id: 'inf_3',
    name: '@fashion_trends',
    platform: 'TikTok',
    reach: 245000,
    engagement: 18500,
    conversions: 23,
    roi: 2.1,
    fraudScore: 0.73
  }
];

// Génération d'alertes fraude mock
const generateMockFraudAlerts = (): FraudAlert[] => [
  {
    influencerId: 'inf_3',
    type: 'Fake Followers',
    severity: 'high',
    description: 'Détection de 68% de followers suspects avec patterns inhabituels',
    recommendation: 'Suspendre la collaboration et demander audit'
  },
  {
    influencerId: 'inf_4',
    type: 'Engagement Pods',
    severity: 'medium',
    description: 'Patterns d\'engagement artificiel détectés sur les 30 derniers posts',
    recommendation: 'Monitoring renforcé et réduction du budget'
  }
];

// Génération de données radar pour comparaison scénarios
const generateRadarData = (scenarios: ScenarioData[]) => [
  {
    metric: 'ROI',
    conservative: 70,
    aggressive: 95,
    aiOptimized: 88
  },
  {
    metric: 'Risque',
    conservative: 90,
    aggressive: 40,
    aiOptimized: 75
  },
  {
    metric: 'Rapidité',
    conservative: 60,
    aggressive: 90,
    aiOptimized: 80
  },
  {
    metric: 'Scalabilité',
    conservative: 65,
    aggressive: 85,
    aiOptimized: 92
  },
  {
    metric: 'Predictibilité',
    conservative: 95,
    aggressive: 55,
    aiOptimized: 85
  }
];

export default MarketingDashboardAI;