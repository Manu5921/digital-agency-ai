"use strict";
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
exports.MarketingDashboardAI = void 0;
var react_1 = require("react");
var recharts_1 = require("recharts");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var progress_1 = require("@/components/ui/progress");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
/**
 * 🎯 COMPOSANT PRINCIPAL DU DASHBOARD
 */
var MarketingDashboardAI = function () {
    var _a = (0, react_1.useState)(null), metrics = _a[0], setMetrics = _a[1];
    var _b = (0, react_1.useState)([]), insights = _b[0], setInsights = _b[1];
    var _c = (0, react_1.useState)([]), scenarios = _c[0], setScenarios = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(false), refreshing = _e[0], setRefreshing = _e[1];
    var _f = (0, react_1.useState)('30d'), selectedTimeRange = _f[0], setSelectedTimeRange = _f[1];
    var _g = (0, react_1.useState)('overview'), selectedTab = _g[0], setSelectedTab = _g[1];
    // Chargement des données initiales
    (0, react_1.useEffect)(function () {
        loadDashboardData();
        var interval = setInterval(loadDashboardData, 30000); // Refresh toutes les 30s
        return function () { return clearInterval(interval); };
    }, [selectedTimeRange]);
    /**
     * 📊 CHARGEMENT DES DONNÉES DU DASHBOARD
     */
    var loadDashboardData = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockMetrics, mockInsights, mockScenarios;
        return __generator(this, function (_a) {
            try {
                setRefreshing(true);
                mockMetrics = {
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
                mockInsights = [
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
                mockScenarios = [
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
            }
            catch (error) {
                console.error('Error loading dashboard data:', error);
            }
            finally {
                setRefreshing(false);
            }
            return [2 /*return*/];
        });
    }); }, [selectedTimeRange]);
    // Métriques calculées
    var calculatedMetrics = (0, react_1.useMemo)(function () {
        if (!metrics)
            return null;
        var totalSpend = Object.values(metrics.budget.allocated).reduce(function (sum, val) { return sum + val; }, 0);
        var totalRevenue = totalSpend * metrics.roas.current;
        var efficiencyScore = metrics.budget.efficiency * 100;
        var predictionAccuracy = (metrics.roas.confidence + metrics.ltv.confidence) / 2 * 100;
        return {
            totalSpend: totalSpend,
            totalRevenue: totalRevenue,
            efficiencyScore: efficiencyScore,
            predictionAccuracy: predictionAccuracy,
            monthlyGrowth: 12.5,
            customerAcquisitionCost: totalSpend / (metrics.realtime.conversions * 30),
            lifetimeValue: metrics.ltv.average
        };
    }, [metrics]);
    if (loading || !metrics || !calculatedMetrics) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading Marketing Dashboard...</span>
      </div>);
    }
    return (<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header avec contrôles */}
      <DashboardHeader onRefresh={loadDashboardData} refreshing={refreshing} timeRange={selectedTimeRange} onTimeRangeChange={setSelectedTimeRange}/>

      {/* Alertes critiques */}
      <CriticalAlerts insights={insights.filter(function (i) { return i.priority === 'critical'; })}/>

      {/* Métriques clés */}
      <KeyMetricsGrid metrics={metrics} calculated={calculatedMetrics}/>

      {/* Tabs principales */}
      <tabs_1.Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <tabs_1.TabsList className="grid w-full grid-cols-6">
          <tabs_1.TabsTrigger value="overview">Vue d'ensemble</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="performance">Performance</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="attribution">Attribution</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="predictions">Prédictions</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="influencers">Influenceurs</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="scenarios">Scénarios</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="overview" className="space-y-6">
          <OverviewTab metrics={metrics} insights={insights}/>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="performance" className="space-y-6">
          <PerformanceTab metrics={metrics}/>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="attribution" className="space-y-6">
          <AttributionTab metrics={metrics}/>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="predictions" className="space-y-6">
          <PredictionsTab metrics={metrics} insights={insights}/>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="influencers" className="space-y-6">
          <InfluencersTab metrics={metrics}/>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="scenarios" className="space-y-6">
          <ScenariosTab scenarios={scenarios}/>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
};
exports.MarketingDashboardAI = MarketingDashboardAI;
/**
 * 🎯 COMPOSANT HEADER DU DASHBOARD
 */
var DashboardHeader = function (_a) {
    var onRefresh = _a.onRefresh, refreshing = _a.refreshing, timeRange = _a.timeRange, onTimeRangeChange = _a.onTimeRangeChange;
    return (<div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Marketing Dashboard AI</h1>
      <p className="text-gray-500">Pilotage prédictif et optimisation temps réel</p>
    </div>
    
    <div className="flex items-center space-x-4">
      <select value={timeRange} onChange={function (e) { return onTimeRangeChange(e.target.value); }} className="px-3 py-2 border rounded-md">
        <option value="7d">7 jours</option>
        <option value="30d">30 jours</option>
        <option value="90d">90 jours</option>
        <option value="1y">1 an</option>
      </select>
      
      <button_1.Button onClick={onRefresh} disabled={refreshing} variant="outline" size="sm">
        <lucide_react_1.RefreshCw className={"h-4 w-4 ".concat(refreshing ? 'animate-spin' : '')}/>
        Actualiser
      </button_1.Button>
      
      <button_1.Button variant="outline" size="sm">
        <lucide_react_1.Download className="h-4 w-4 mr-2"/>
        Export
      </button_1.Button>
    </div>
  </div>);
};
/**
 * 🚨 COMPOSANT ALERTES CRITIQUES
 */
var CriticalAlerts = function (_a) {
    var insights = _a.insights;
    if (insights.length === 0)
        return null;
    return (<div className="space-y-2">
      {insights.map(function (insight, index) { return (<alert_1.Alert key={index} variant="destructive">
          <lucide_react_1.AlertTriangle className="h-4 w-4"/>
          <alert_1.AlertDescription className="flex justify-between items-center">
            <div>
              <strong>{insight.title}</strong>: {insight.description}
            </div>
            <button_1.Button size="sm" variant="outline">
              {insight.action}
            </button_1.Button>
          </alert_1.AlertDescription>
        </alert_1.Alert>); })}
    </div>);
};
/**
 * 📊 GRILLE DES MÉTRIQUES CLÉS
 */
var KeyMetricsGrid = function (_a) {
    var metrics = _a.metrics, calculated = _a.calculated;
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <MetricCard title="ROAS Actuel" value={"".concat(metrics.roas.current, ":1")} predicted={"".concat(metrics.roas.predicted, ":1")} trend={metrics.roas.trend} confidence={metrics.roas.confidence} icon={<lucide_react_1.TrendingUp />} color="green"/>
    
    <MetricCard title="LTV Moyenne" value={"$".concat(metrics.ltv.average)} predicted={"$".concat(metrics.ltv.predicted)} trend={metrics.ltv.trend} confidence={metrics.ltv.confidence} icon={<lucide_react_1.Users />} color="blue"/>
    
    <MetricCard title="Churn Rate" value={"".concat((metrics.churn.rate * 100).toFixed(1), "%")} predicted={"".concat((metrics.churn.predicted * 100).toFixed(1), "%")} trend={metrics.churn.rate > metrics.churn.predicted ? 'down' : 'up'} confidence={0.91} icon={<lucide_react_1.AlertTriangle />} color="orange"/>
    
    <MetricCard title="Efficacité Budget" value={"".concat(calculated.efficiencyScore.toFixed(0), "%")} predicted={"".concat((calculated.efficiencyScore + 12).toFixed(0), "%")} trend="up" confidence={0.85} icon={<lucide_react_1.Target />} color="purple"/>
  </div>);
};
/**
 * 🎯 COMPOSANT CARTE MÉTRIQUE
 */
var MetricCard = function (_a) {
    var title = _a.title, value = _a.value, predicted = _a.predicted, trend = _a.trend, confidence = _a.confidence, icon = _a.icon, color = _a.color;
    return (<card_1.Card>
    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <card_1.CardTitle className="text-sm font-medium">{title}</card_1.CardTitle>
      <div className={"text-".concat(color, "-600")}>{icon}</div>
    </card_1.CardHeader>
    <card_1.CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <span>Prédit: {predicted}</span>
        <badge_1.Badge variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}>
          {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
        </badge_1.Badge>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Confiance</span>
          <span>{(confidence * 100).toFixed(0)}%</span>
        </div>
        <progress_1.Progress value={confidence * 100} className="mt-1"/>
      </div>
    </card_1.CardContent>
  </card_1.Card>);
};
/**
 * 📈 TAB VUE D'ENSEMBLE
 */
var OverviewTab = function (_a) {
    var metrics = _a.metrics, insights = _a.insights;
    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Graphique ROAS et revenus */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Performance ROAS & Revenus</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={300}>
          <recharts_1.LineChart data={generateTimeSeriesData('roas')}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="date"/>
            <recharts_1.YAxis />
            <recharts_1.Tooltip />
            <recharts_1.Legend />
            <recharts_1.Line type="monotone" dataKey="roas" stroke="#8884d8" name="ROAS"/>
            <recharts_1.Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenus"/>
            <recharts_1.Line type="monotone" dataKey="predicted" stroke="#ff7300" strokeDasharray="5 5" name="Prédiction"/>
          </recharts_1.LineChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>

    {/* Attribution des canaux */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Attribution Cross-Canal</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={300}>
          <recharts_1.PieChart>
            <recharts_1.Pie data={Object.entries(metrics.attribution.channels).map(function (_a) {
            var channel = _a[0], value = _a[1];
            return ({
                name: channel,
                value: value * 100
            });
        })} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
              {Object.keys(metrics.attribution.channels).map(function (entry, index) { return (<recharts_1.Cell key={"cell-".concat(index)} fill={COLORS[index % COLORS.length]}/>); })}
            </recharts_1.Pie>
            <recharts_1.Tooltip />
          </recharts_1.PieChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>

    {/* Insights IA */}
    <card_1.Card className="lg:col-span-2">
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center">
          <lucide_react_1.Brain className="h-5 w-5 mr-2"/>
          Insights IA & Recommandations
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="space-y-4">
          {insights.map(function (insight, index) { return (<InsightCard key={index} insight={insight}/>); })}
        </div>
      </card_1.CardContent>
    </card_1.Card>
  </div>);
};
/**
 * 🎯 COMPOSANT CARTE INSIGHT
 */
var InsightCard = function (_a) {
    var insight = _a.insight;
    return (<div className="p-4 border rounded-lg space-y-2">
    <div className="flex justify-between items-start">
      <div className="flex items-center space-x-2">
        <badge_1.Badge variant={insight.priority === 'critical' ? 'destructive' : 'default'}>
          {insight.priority}
        </badge_1.Badge>
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
      <button_1.Button size="sm">{insight.action}</button_1.Button>
    </div>
  </div>);
};
/**
 * 📊 TAB PERFORMANCE
 */
var PerformanceTab = function (_a) {
    var metrics = _a.metrics;
    return (<div className="space-y-6">
    {/* Performance des campagnes */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Performance des Campagnes</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
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
              {metrics.campaigns.performance.map(function (campaign, index) { return (<tr key={index} className="border-b">
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
                    <badge_1.Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </badge_1.Badge>
                  </td>
                </tr>); })}
            </tbody>
          </table>
        </div>
      </card_1.CardContent>
    </card_1.Card>

    {/* Graphique de performance temporelle */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Évolution Performance Multi-Canal</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={400}>
          <recharts_1.AreaChart data={generateChannelPerformanceData()}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="date"/>
            <recharts_1.YAxis />
            <recharts_1.Tooltip />
            <recharts_1.Legend />
            <recharts_1.Area type="monotone" dataKey="google_ads" stackId="1" stroke="#8884d8" fill="#8884d8"/>
            <recharts_1.Area type="monotone" dataKey="facebook_ads" stackId="1" stroke="#82ca9d" fill="#82ca9d"/>
            <recharts_1.Area type="monotone" dataKey="email" stackId="1" stroke="#ffc658" fill="#ffc658"/>
            <recharts_1.Area type="monotone" dataKey="influencers" stackId="1" stroke="#ff7300" fill="#ff7300"/>
          </recharts_1.AreaChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>
  </div>);
};
/**
 * 🎯 TAB ATTRIBUTION
 */
var AttributionTab = function (_a) {
    var metrics = _a.metrics;
    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Attribution par canal */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Attribution par Canal</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={300}>
          <recharts_1.BarChart data={Object.entries(metrics.attribution.channels).map(function (_a) {
            var channel = _a[0], value = _a[1];
            return ({
                channel: channel,
                attribution: value * 100,
                incrementality: metrics.attribution.incrementality[channel] * 100
            });
        })}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="channel"/>
            <recharts_1.YAxis />
            <recharts_1.Tooltip />
            <recharts_1.Legend />
            <recharts_1.Bar dataKey="attribution" fill="#8884d8" name="Attribution %"/>
            <recharts_1.Bar dataKey="incrementality" fill="#82ca9d" name="Incrementalité %"/>
          </recharts_1.BarChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>

    {/* Synergies cross-canal */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Synergies Cross-Canal</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="space-y-4">
          {Object.entries(metrics.attribution.synergies).map(function (_a) {
            var pair = _a[0], value = _a[1];
            return (<div key={pair} className="flex justify-between items-center">
              <span className="text-sm font-medium">{pair.replace('+', ' + ')}</span>
              <div className="flex items-center space-x-2">
                <progress_1.Progress value={value * 100} className="w-20"/>
                <span className="text-sm text-green-600">+{(value * 100).toFixed(0)}%</span>
              </div>
            </div>);
        })}
        </div>
      </card_1.CardContent>
    </card_1.Card>

    {/* Budget optimal vs actuel */}
    <card_1.Card className="lg:col-span-2">
      <card_1.CardHeader>
        <card_1.CardTitle>Optimisation Budget - Actuel vs Optimal</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={300}>
          <recharts_1.BarChart data={Object.keys(metrics.budget.allocated).map(function (channel) { return ({
            channel: channel,
            allocated: metrics.budget.allocated[channel],
            optimal: metrics.budget.optimal[channel],
            difference: metrics.budget.optimal[channel] - metrics.budget.allocated[channel]
        }); })}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="channel"/>
            <recharts_1.YAxis />
            <recharts_1.Tooltip />
            <recharts_1.Legend />
            <recharts_1.Bar dataKey="allocated" fill="#8884d8" name="Budget Actuel"/>
            <recharts_1.Bar dataKey="optimal" fill="#82ca9d" name="Budget Optimal"/>
          </recharts_1.BarChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>
  </div>);
};
/**
 * 🔮 TAB PRÉDICTIONS
 */
var PredictionsTab = function (_a) {
    var metrics = _a.metrics, insights = _a.insights;
    return (<div className="space-y-6">
    {/* Prédictions LTV par segment */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Prédictions LTV par Segment</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={300}>
          <recharts_1.BarChart data={Object.entries(metrics.ltv.segments).map(function (_a) {
            var segment = _a[0], value = _a[1];
            return ({
                segment: segment,
                ltv: value,
                predicted: value * 1.2 // Simulation croissance
            });
        })}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="segment"/>
            <recharts_1.YAxis />
            <recharts_1.Tooltip />
            <recharts_1.Legend />
            <recharts_1.Bar dataKey="ltv" fill="#8884d8" name="LTV Actuelle"/>
            <recharts_1.Bar dataKey="predicted" fill="#82ca9d" name="LTV Prédite"/>
          </recharts_1.BarChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>

    {/* Prédictions de churn */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Analyse Prédictive du Churn</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
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
        
        <recharts_1.ResponsiveContainer width="100%" height={200}>
          <recharts_1.LineChart data={generateChurnPredictionData()}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="month"/>
            <recharts_1.YAxis />
            <recharts_1.Tooltip />
            <recharts_1.Legend />
            <recharts_1.Line type="monotone" dataKey="churn" stroke="#ff7300" name="Taux de Churn %"/>
            <recharts_1.Line type="monotone" dataKey="prevented" stroke="#82ca9d" name="Churn Évité %" strokeDasharray="5 5"/>
          </recharts_1.LineChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>

    {/* Prédictions campagnes */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Prédictions Performance Campagnes</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="space-y-4">
          {metrics.campaigns.predictions.map(function (prediction, index) { return (<div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Campagne {prediction.campaignId}</span>
                <badge_1.Badge variant={prediction.alertLevel === 'high' ? 'destructive' : 'default'}>
                  {prediction.alertLevel}
                </badge_1.Badge>
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
            </div>); })}
        </div>
      </card_1.CardContent>
    </card_1.Card>
  </div>);
};
/**
 * 🌟 TAB INFLUENCEURS
 */
var InfluencersTab = function (_a) {
    var metrics = _a.metrics;
    return (<div className="space-y-6">
    {/* Performance des influenceurs */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Performance des Influenceurs</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
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
              {metrics.influencers.performance.map(function (influencer, index) { return (<tr key={index} className="border-b">
                  <td className="p-2 font-medium">{influencer.name}</td>
                  <td className="p-2">{influencer.platform}</td>
                  <td className="p-2 text-right">{influencer.reach.toLocaleString()}</td>
                  <td className="p-2 text-right">{influencer.engagement.toLocaleString()}</td>
                  <td className="p-2 text-right">{influencer.conversions}</td>
                  <td className="p-2 text-right">{influencer.roi.toFixed(1)}:1</td>
                  <td className="p-2 text-center">
                    <badge_1.Badge variant={influencer.fraudScore < 0.3 ? 'default' : influencer.fraudScore < 0.7 ? 'secondary' : 'destructive'}>
                      {(influencer.fraudScore * 100).toFixed(0)}%
                    </badge_1.Badge>
                  </td>
                </tr>); })}
            </tbody>
          </table>
        </div>
      </card_1.CardContent>
    </card_1.Card>

    {/* Alertes fraude */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Alertes Fraude Détectées</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="space-y-4">
          {metrics.influencers.fraud.map(function (alert, index) { return (<alert_1.Alert key={index} variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
              <lucide_react_1.AlertTriangle className="h-4 w-4"/>
              <alert_1.AlertDescription>
                <div className="flex justify-between items-start">
                  <div>
                    <strong>Influenceur {alert.influencerId}</strong> - {alert.type}
                    <p className="text-sm mt-1">{alert.description}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      <strong>Action:</strong> {alert.recommendation}
                    </p>
                  </div>
                  <badge_1.Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                    {alert.severity}
                  </badge_1.Badge>
                </div>
              </alert_1.AlertDescription>
            </alert_1.Alert>); })}
        </div>
      </card_1.CardContent>
    </card_1.Card>

    {/* Graphique ROI vs Fraud Score */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Analyse ROI vs Score de Fraude</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={300}>
          <recharts_1.ScatterChart data={metrics.influencers.performance.map(function (inf) { return ({
            roi: inf.roi,
            fraudScore: inf.fraudScore * 100,
            name: inf.name
        }); })}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="fraudScore" name="Score Fraude %"/>
            <recharts_1.YAxis dataKey="roi" name="ROI"/>
            <recharts_1.Tooltip cursor={{ strokeDasharray: '3 3' }}/>
            <recharts_1.Scatter fill="#8884d8"/>
          </recharts_1.ScatterChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>
  </div>);
};
/**
 * 🎯 TAB SCÉNARIOS
 */
var ScenariosTab = function (_a) {
    var scenarios = _a.scenarios;
    return (<div className="space-y-6">
    {/* Comparaison des scénarios */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Scenarios Planning - Comparaison</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={300}>
          <recharts_1.BarChart data={scenarios}>
            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
            <recharts_1.XAxis dataKey="name"/>
            <recharts_1.YAxis />
            <recharts_1.Tooltip />
            <recharts_1.Legend />
            <recharts_1.Bar dataKey="expectedROAS" fill="#8884d8" name="ROAS Attendu"/>
            <recharts_1.Bar dataKey="probability" fill="#82ca9d" name="Probabilité %"/>
          </recharts_1.BarChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>

    {/* Détails des scénarios */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scenarios.map(function (scenario, index) { return (<card_1.Card key={index}>
          <card_1.CardHeader>
            <card_1.CardTitle className="text-lg">{scenario.name}</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
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
            
            <progress_1.Progress value={scenario.probability * 100} className="mt-4"/>
            
            <button_1.Button className="w-full mt-4" variant="outline">
              Sélectionner ce Scénario
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>); })}
    </div>

    {/* Radar chart comparaison */}
    <card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Comparaison Multi-Critères</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={400}>
          <recharts_1.RadarChart data={generateRadarData(scenarios)}>
            <recharts_1.PolarGrid />
            <recharts_1.PolarAngleAxis dataKey="metric"/>
            <recharts_1.PolarRadiusAxis angle={90} domain={[0, 100]}/>
            <recharts_1.Radar name="Conservative" dataKey="conservative" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1}/>
            <recharts_1.Radar name="Aggressive" dataKey="aggressive" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1}/>
            <recharts_1.Radar name="AI-Optimized" dataKey="aiOptimized" stroke="#ffc658" fill="#ffc658" fillOpacity={0.1}/>
            <recharts_1.Legend />
          </recharts_1.RadarChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>
  </div>);
};
/**
 * 🛠️ FONCTIONS UTILITAIRES POUR GÉNÉRATION DE DONNÉES MOCK
 */
// Couleurs pour les graphiques
var COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
// Génération de données temporelles
var generateTimeSeriesData = function (type) {
    var data = [];
    for (var i = 30; i >= 0; i--) {
        var date = new Date();
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
var generateChannelPerformanceData = function () {
    var data = [];
    for (var i = 7; i >= 0; i--) {
        var date = new Date();
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
var generateChurnPredictionData = function () {
    var data = [];
    var months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'];
    months.forEach(function (month, index) {
        data.push({
            month: month,
            churn: 8 - index * 0.5 + Math.random() * 1,
            prevented: 8 - index * 1.2 + Math.random() * 0.5
        });
    });
    return data;
};
// Génération de campagnes mock
var generateMockCampaigns = function () { return [
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
]; };
// Génération de prédictions mock
var generateMockPredictions = function () { return [
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
]; };
// Génération d'influenceurs mock
var generateMockInfluencers = function () { return [
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
]; };
// Génération d'alertes fraude mock
var generateMockFraudAlerts = function () { return [
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
]; };
// Génération de données radar pour comparaison scénarios
var generateRadarData = function (scenarios) { return [
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
]; };
exports.default = exports.MarketingDashboardAI;
