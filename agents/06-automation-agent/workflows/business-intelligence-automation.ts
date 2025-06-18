/**
 * BUSINESS INTELLIGENCE AUTOMATION SYSTEM
 * Report Generation, Dashboard Automation, and KPI Tracking
 * Phase 1 Foundation - Intelligent Business Analytics Platform
 */

import { z } from 'zod';

// ============================================================================
// CORE TYPES & SCHEMAS
// ============================================================================

export const DataSourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['database', 'api', 'file', 'stream', 'connector']),
  connection: z.object({
    host: z.string().optional(),
    port: z.number().optional(),
    database: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    apiUrl: z.string().optional(),
    apiKey: z.string().optional(),
    filePath: z.string().optional(),
    streamEndpoint: z.string().optional(),
    connectorId: z.string().optional()
  }),
  schema: z.record(z.object({
    type: z.enum(['string', 'number', 'boolean', 'date', 'array', 'object']),
    nullable: z.boolean().default(false),
    primaryKey: z.boolean().default(false),
    foreignKey: z.string().optional(),
    description: z.string().optional()
  })),
  refreshInterval: z.number(), // minutes
  lastSync: z.string().optional(),
  status: z.enum(['active', 'inactive', 'error']),
  metadata: z.record(z.any()).optional()
});

export const KPIDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  type: z.enum(['metric', 'ratio', 'percentage', 'count', 'average', 'sum', 'trend']),
  calculation: z.object({
    formula: z.string(),
    dataSourceId: z.string(),
    aggregation: z.enum(['sum', 'avg', 'count', 'min', 'max', 'median', 'stddev']).optional(),
    groupBy: z.array(z.string()).optional(),
    filters: z.array(z.object({
      field: z.string(),
      operator: z.enum(['equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'between']),
      value: z.any()
    })).optional(),
    timeRange: z.object({
      type: z.enum(['last_hour', 'last_24h', 'last_7d', 'last_30d', 'last_90d', 'custom']),
      startDate: z.string().optional(),
      endDate: z.string().optional()
    }).optional()
  }),
  targets: z.object({
    target: z.number().optional(),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
    benchmark: z.number().optional()
  }).optional(),
  alerts: z.array(z.object({
    condition: z.enum(['above', 'below', 'equals', 'change_percent']),
    threshold: z.number(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    recipients: z.array(z.string()),
    message: z.string().optional()
  })).optional(),
  visualisation: z.object({
    chartType: z.enum(['line', 'bar', 'pie', 'gauge', 'table', 'number']),
    color: z.string().optional(),
    format: z.string().optional() // number format
  }),
  updateFrequency: z.enum(['realtime', 'hourly', 'daily', 'weekly', 'monthly']),
  status: z.enum(['active', 'inactive', 'draft'])
});

export const ReportTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  type: z.enum(['operational', 'executive', 'financial', 'sales', 'marketing', 'custom']),
  layout: z.object({
    sections: z.array(z.object({
      id: z.string(),
      title: z.string(),
      type: z.enum(['kpi_grid', 'chart', 'table', 'text', 'image']),
      position: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }),
      content: z.object({
        kpiIds: z.array(z.string()).optional(),
        chartConfig: z.record(z.any()).optional(),
        tableConfig: z.record(z.any()).optional(),
        text: z.string().optional(),
        imageUrl: z.string().optional()
      })
    })),
    theme: z.object({
      primaryColor: z.string(),
      secondaryColor: z.string(),
      backgroundColor: z.string(),
      fontFamily: z.string()
    }).optional()
  }),
  schedule: z.object({
    enabled: z.boolean(),
    frequency: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'quarterly']),
    time: z.string(), // HH:MM format
    dayOfWeek: z.number().optional(), // 0-6
    dayOfMonth: z.number().optional(), // 1-31
    recipients: z.array(z.string()),
    format: z.enum(['pdf', 'html', 'excel', 'powerpoint'])
  }).optional(),
  filters: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['date_range', 'dropdown', 'multi_select', 'text']),
    defaultValue: z.any(),
    options: z.array(z.string()).optional()
  })).optional(),
  permissions: z.object({
    viewers: z.array(z.string()),
    editors: z.array(z.string()),
    public: z.boolean().default(false)
  }),
  status: z.enum(['active', 'inactive', 'draft'])
});

export const DashboardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  layout: z.object({
    widgets: z.array(z.object({
      id: z.string(),
      type: z.enum(['kpi_card', 'chart', 'table', 'gauge', 'progress_bar', 'text', 'iframe']),
      position: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }),
      title: z.string(),
      kpiId: z.string().optional(),
      config: z.record(z.any()).optional(),
      refreshInterval: z.number().optional() // seconds
    })),
    columns: z.number().default(12),
    rowHeight: z.number().default(100)
  }),
  filters: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['date_range', 'dropdown', 'multi_select']),
    affectedWidgets: z.array(z.string()),
    defaultValue: z.any()
  })).optional(),
  realtime: z.boolean().default(false),
  refreshInterval: z.number().default(300), // seconds
  permissions: z.object({
    viewers: z.array(z.string()),
    editors: z.array(z.string()),
    public: z.boolean().default(false)
  }),
  status: z.enum(['active', 'inactive', 'draft'])
});

export const AlertRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  kpiId: z.string(),
  condition: z.object({
    operator: z.enum(['greater_than', 'less_than', 'equals', 'not_equals', 'change_percent', 'threshold_breach']),
    value: z.number(),
    timeWindow: z.number().optional(), // minutes
    consecutiveFailures: z.number().default(1)
  }),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  actions: z.array(z.object({
    type: z.enum(['email', 'sms', 'slack', 'webhook', 'auto_action']),
    recipients: z.array(z.string()).optional(),
    message: z.string().optional(),
    webhookUrl: z.string().optional(),
    autoAction: z.string().optional() // script or workflow ID
  })),
  cooldown: z.number().default(60), // minutes
  enabled: z.boolean().default(true),
  lastTriggered: z.string().optional()
});

export type DataSource = z.infer<typeof DataSourceSchema>;
export type KPIDefinition = z.infer<typeof KPIDefinitionSchema>;
export type ReportTemplate = z.infer<typeof ReportTemplateSchema>;
export type Dashboard = z.infer<typeof DashboardSchema>;
export type AlertRule = z.infer<typeof AlertRuleSchema>;

// ============================================================================
// BUSINESS INTELLIGENCE AUTOMATION ENGINE
// ============================================================================

export class BusinessIntelligenceAutomation {
  private dataSources: Map<string, DataSource> = new Map();
  private kpiDefinitions: Map<string, KPIDefinition> = new Map();
  private reportTemplates: Map<string, ReportTemplate> = new Map();
  private dashboards: Map<string, Dashboard> = new Map();
  private alertRules: Map<string, AlertRule> = new Map();
  private kpiCache: Map<string, { value: any; timestamp: string; metadata?: any }> = new Map();
  private isRunning: boolean = false;

  constructor() {
    console.log('📊 Initializing Business Intelligence Automation Engine...');
    this.initializeSampleData();
    this.startAutomationEngine();
  }

  private initializeSampleData(): void {
    console.log('🎯 Loading sample KPIs and templates...');
    
    // Sample data sources
    this.createSampleDataSources();
    
    // Sample KPIs
    this.createSampleKPIs();
    
    // Sample report templates
    this.createSampleReportTemplates();
    
    // Sample dashboards
    this.createSampleDashboards();
    
    console.log('✅ Sample data loaded successfully');
  }

  private createSampleDataSources(): void {
    const salesDB: DataSource = {
      id: 'sales-database',
      name: 'Sales Database',
      type: 'database',
      connection: {
        host: 'localhost',
        port: 5432,
        database: 'sales_db',
        username: 'readonly_user'
      },
      schema: {
        orders: {
          type: 'object',
          nullable: false,
          description: 'Customer orders table'
        },
        customers: {
          type: 'object',
          nullable: false,
          description: 'Customer information table'
        },
        products: {
          type: 'object',
          nullable: false,
          description: 'Product catalog table'
        }
      },
      refreshInterval: 15,
      status: 'active'
    };

    const marketingAPI: DataSource = {
      id: 'marketing-api',
      name: 'Marketing Analytics API',
      type: 'api',
      connection: {
        apiUrl: 'https://api.marketing.company.com',
        apiKey: 'marketing_api_key_123'
      },
      schema: {
        campaigns: {
          type: 'object',
          nullable: false,
          description: 'Marketing campaigns data'
        },
        leads: {
          type: 'object',
          nullable: false,
          description: 'Lead generation data'
        }
      },
      refreshInterval: 30,
      status: 'active'
    };

    this.dataSources.set(salesDB.id, salesDB);
    this.dataSources.set(marketingAPI.id, marketingAPI);
  }

  private createSampleKPIs(): void {
    const revenueKPI: KPIDefinition = {
      id: 'monthly-revenue',
      name: 'Monthly Revenue',
      description: 'Total revenue generated in the current month',
      category: 'Financial',
      type: 'sum',
      calculation: {
        formula: 'SUM(order_amount)',
        dataSourceId: 'sales-database',
        aggregation: 'sum',
        groupBy: ['month'],
        filters: [
          {
            field: 'status',
            operator: 'equals',
            value: 'completed'
          }
        ],
        timeRange: {
          type: 'last_30d'
        }
      },
      targets: {
        target: 100000,
        minimum: 80000
      },
      alerts: [
        {
          condition: 'below',
          threshold: 80000,
          severity: 'high',
          recipients: ['sales@company.com', 'ceo@company.com'],
          message: 'Monthly revenue below minimum threshold'
        }
      ],
      visualisation: {
        chartType: 'number',
        color: '#4CAF50',
        format: '$0,0'
      },
      updateFrequency: 'hourly',
      status: 'active'
    };

    const conversionRateKPI: KPIDefinition = {
      id: 'lead-conversion-rate',
      name: 'Lead Conversion Rate',
      description: 'Percentage of leads that convert to customers',
      category: 'Sales',
      type: 'percentage',
      calculation: {
        formula: '(converted_leads / total_leads) * 100',
        dataSourceId: 'marketing-api',
        aggregation: 'avg',
        timeRange: {
          type: 'last_7d'
        }
      },
      targets: {
        target: 15,
        minimum: 10
      },
      visualisation: {
        chartType: 'gauge',
        color: '#2196F3',
        format: '0.0%'
      },
      updateFrequency: 'daily',
      status: 'active'
    };

    const customerSatisfactionKPI: KPIDefinition = {
      id: 'customer-satisfaction',
      name: 'Customer Satisfaction Score',
      description: 'Average customer satisfaction rating',
      category: 'Customer',
      type: 'average',
      calculation: {
        formula: 'AVG(satisfaction_rating)',
        dataSourceId: 'sales-database',
        aggregation: 'avg',
        timeRange: {
          type: 'last_30d'
        }
      },
      targets: {
        target: 4.5,
        minimum: 4.0
      },
      visualisation: {
        chartType: 'gauge',
        color: '#FF9800',
        format: '0.0'
      },
      updateFrequency: 'daily',
      status: 'active'
    };

    this.kpiDefinitions.set(revenueKPI.id, revenueKPI);
    this.kpiDefinitions.set(conversionRateKPI.id, conversionRateKPI);
    this.kpiDefinitions.set(customerSatisfactionKPI.id, customerSatisfactionKPI);
  }

  private createSampleReportTemplates(): void {
    const executiveReport: ReportTemplate = {
      id: 'executive-dashboard-report',
      name: 'Executive Dashboard Report',
      description: 'High-level business metrics for executive team',
      category: 'Executive',
      type: 'executive',
      layout: {
        sections: [
          {
            id: 'header',
            title: 'Executive Summary',
            type: 'text',
            position: { x: 0, y: 0, width: 12, height: 2 },
            content: {
              text: 'Monthly Business Performance Summary'
            }
          },
          {
            id: 'kpi-grid',
            title: 'Key Performance Indicators',
            type: 'kpi_grid',
            position: { x: 0, y: 2, width: 12, height: 6 },
            content: {
              kpiIds: ['monthly-revenue', 'lead-conversion-rate', 'customer-satisfaction']
            }
          },
          {
            id: 'revenue-chart',
            title: 'Revenue Trend',
            type: 'chart',
            position: { x: 0, y: 8, width: 8, height: 4 },
            content: {
              chartConfig: {
                type: 'line',
                kpiId: 'monthly-revenue',
                timeRange: 'last_90d'
              }
            }
          }
        ],
        theme: {
          primaryColor: '#2196F3',
          secondaryColor: '#FFC107',
          backgroundColor: '#FAFAFA',
          fontFamily: 'Arial, sans-serif'
        }
      },
      schedule: {
        enabled: true,
        frequency: 'weekly',
        time: '09:00',
        dayOfWeek: 1, // Monday
        recipients: ['ceo@company.com', 'cfo@company.com'],
        format: 'pdf'
      },
      permissions: {
        viewers: ['executives', 'managers'],
        editors: ['bi-team'],
        public: false
      },
      status: 'active'
    };

    this.reportTemplates.set(executiveReport.id, executiveReport);
  }

  private createSampleDashboards(): void {
    const salesDashboard: Dashboard = {
      id: 'sales-performance-dashboard',
      name: 'Sales Performance Dashboard',
      description: 'Real-time sales metrics and performance indicators',
      category: 'Sales',
      layout: {
        widgets: [
          {
            id: 'revenue-card',
            type: 'kpi_card',
            position: { x: 0, y: 0, width: 3, height: 2 },
            title: 'Monthly Revenue',
            kpiId: 'monthly-revenue',
            refreshInterval: 300
          },
          {
            id: 'conversion-gauge',
            type: 'gauge',
            position: { x: 3, y: 0, width: 3, height: 2 },
            title: 'Conversion Rate',
            kpiId: 'lead-conversion-rate',
            refreshInterval: 600
          },
          {
            id: 'satisfaction-gauge',
            type: 'gauge',
            position: { x: 6, y: 0, width: 3, height: 2 },
            title: 'Customer Satisfaction',
            kpiId: 'customer-satisfaction',
            refreshInterval: 600
          },
          {
            id: 'revenue-trend',
            type: 'chart',
            position: { x: 0, y: 2, width: 8, height: 4 },
            title: 'Revenue Trend (90 Days)',
            config: {
              chartType: 'line',
              kpiId: 'monthly-revenue',
              timeRange: 'last_90d'
            },
            refreshInterval: 900
          }
        ],
        columns: 12,
        rowHeight: 100
      },
      realtime: true,
      refreshInterval: 300,
      permissions: {
        viewers: ['sales-team', 'managers'],
        editors: ['sales-managers', 'bi-team'],
        public: false
      },
      status: 'active'
    };

    this.dashboards.set(salesDashboard.id, salesDashboard);
  }

  // ========================================================================
  // DATA SOURCE MANAGEMENT
  // ========================================================================

  async addDataSource(dataSource: DataSource): Promise<void> {
    console.log(`📊 Adding data source: ${dataSource.name}`);
    
    // Validate connection
    await this.testDataSourceConnection(dataSource);
    
    this.dataSources.set(dataSource.id, dataSource);
    console.log(`✅ Data source added: ${dataSource.id}`);
  }

  async updateDataSource(dataSourceId: string, updates: Partial<DataSource>): Promise<void> {
    const dataSource = this.dataSources.get(dataSourceId);
    if (!dataSource) {
      throw new Error(`Data source not found: ${dataSourceId}`);
    }

    const updatedDataSource = { ...dataSource, ...updates };
    await this.testDataSourceConnection(updatedDataSource);
    
    this.dataSources.set(dataSourceId, updatedDataSource);
    console.log(`🔄 Data source updated: ${dataSourceId}`);
  }

  async removeDataSource(dataSourceId: string): Promise<void> {
    // Check for dependent KPIs
    const dependentKPIs = Array.from(this.kpiDefinitions.values())
      .filter(kpi => kpi.calculation.dataSourceId === dataSourceId);

    if (dependentKPIs.length > 0) {
      throw new Error(`Cannot remove data source with dependent KPIs: ${dependentKPIs.length} found`);
    }

    this.dataSources.delete(dataSourceId);
    console.log(`🗑️ Data source removed: ${dataSourceId}`);
  }

  private async testDataSourceConnection(dataSource: DataSource): Promise<void> {
    console.log(`🔌 Testing connection for: ${dataSource.name}`);
    
    // Mock connection test - replace with actual implementation
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Simulate success/failure
    if (Math.random() > 0.9) {
      throw new Error('Connection test failed');
    }
    
    console.log(`✅ Connection test successful for: ${dataSource.name}`);
  }

  // ========================================================================
  // KPI MANAGEMENT
  // ========================================================================

  async createKPI(kpi: KPIDefinition): Promise<void> {
    console.log(`📈 Creating KPI: ${kpi.name}`);
    
    // Validate data source exists
    if (!this.dataSources.has(kpi.calculation.dataSourceId)) {
      throw new Error(`Data source not found: ${kpi.calculation.dataSourceId}`);
    }

    // Validate formula syntax
    await this.validateKPIFormula(kpi);
    
    this.kpiDefinitions.set(kpi.id, kpi);
    
    // Calculate initial value
    await this.calculateKPIValue(kpi.id);
    
    console.log(`✅ KPI created: ${kpi.id}`);
  }

  async updateKPI(kpiId: string, updates: Partial<KPIDefinition>): Promise<void> {
    const kpi = this.kpiDefinitions.get(kpiId);
    if (!kpi) {
      throw new Error(`KPI not found: ${kpiId}`);
    }

    const updatedKPI = { ...kpi, ...updates };
    await this.validateKPIFormula(updatedKPI);
    
    this.kpiDefinitions.set(kpiId, updatedKPI);
    
    // Recalculate value
    await this.calculateKPIValue(kpiId);
    
    console.log(`🔄 KPI updated: ${kpiId}`);
  }

  async deleteKPI(kpiId: string): Promise<void> {
    // Check for dependencies in reports and dashboards
    const reportDependencies = this.findKPIDependencies(kpiId);
    if (reportDependencies.length > 0) {
      throw new Error(`Cannot delete KPI with dependencies: ${reportDependencies.length} found`);
    }

    this.kpiDefinitions.delete(kpiId);
    this.kpiCache.delete(kpiId);
    
    console.log(`🗑️ KPI deleted: ${kpiId}`);
  }

  private async validateKPIFormula(kpi: KPIDefinition): Promise<void> {
    // Mock formula validation - replace with actual implementation
    const formula = kpi.calculation.formula;
    
    if (!formula || formula.trim().length === 0) {
      throw new Error('KPI formula cannot be empty');
    }

    // Basic syntax validation
    const validFunctions = ['SUM', 'AVG', 'COUNT', 'MIN', 'MAX', 'MEDIAN'];
    const hasValidFunction = validFunctions.some(func => formula.includes(func));
    
    if (!hasValidFunction) {
      console.warn(`KPI formula may be invalid: ${formula}`);
    }
  }

  private findKPIDependencies(kpiId: string): string[] {
    const dependencies: string[] = [];
    
    // Check report templates
    for (const template of this.reportTemplates.values()) {
      for (const section of template.layout.sections) {
        if (section.content.kpiIds?.includes(kpiId)) {
          dependencies.push(`Report: ${template.name}`);
        }
      }
    }
    
    // Check dashboards
    for (const dashboard of this.dashboards.values()) {
      for (const widget of dashboard.layout.widgets) {
        if (widget.kpiId === kpiId) {
          dependencies.push(`Dashboard: ${dashboard.name}`);
        }
      }
    }
    
    return dependencies;
  }

  async calculateKPIValue(kpiId: string): Promise<any> {
    const kpi = this.kpiDefinitions.get(kpiId);
    if (!kpi) {
      throw new Error(`KPI not found: ${kpiId}`);
    }

    const dataSource = this.dataSources.get(kpi.calculation.dataSourceId);
    if (!dataSource) {
      throw new Error(`Data source not found: ${kpi.calculation.dataSourceId}`);
    }

    console.log(`🔢 Calculating KPI value: ${kpi.name}`);
    
    try {
      // Fetch data from source
      const data = await this.fetchDataFromSource(dataSource, kpi.calculation);
      
      // Apply aggregation
      const value = this.applyAggregation(data, kpi.calculation);
      
      // Cache result
      this.kpiCache.set(kpiId, {
        value,
        timestamp: new Date().toISOString(),
        metadata: {
          dataPoints: data.length,
          calculationTime: Date.now()
        }
      });

      // Check alerts
      await this.checkKPIAlerts(kpi, value);
      
      return value;
    } catch (error) {
      console.error(`❌ Failed to calculate KPI ${kpiId}:`, error);
      throw error;
    }
  }

  private async fetchDataFromSource(dataSource: DataSource, calculation: any): Promise<any[]> {
    // Mock data fetching - replace with actual implementation
    console.log(`📥 Fetching data from: ${dataSource.name}`);
    
    // Simulate API/DB call delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 800));
    
    // Return mock data based on data source type
    switch (dataSource.type) {
      case 'database':
        return this.generateMockDatabaseData(calculation);
      case 'api':
        return this.generateMockAPIData(calculation);
      case 'file':
        return this.generateMockFileData(calculation);
      default:
        return [];
    }
  }

  private generateMockDatabaseData(calculation: any): any[] {
    // Generate mock data based on calculation requirements
    const baseValue = Math.random() * 100000;
    const dataPoints = 30 + Math.floor(Math.random() * 70);
    
    return Array.from({ length: dataPoints }, (_, i) => ({
      id: i + 1,
      order_amount: baseValue + (Math.random() - 0.5) * 20000,
      satisfaction_rating: 3.5 + Math.random() * 1.5,
      status: Math.random() > 0.1 ? 'completed' : 'pending',
      created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
    }));
  }

  private generateMockAPIData(calculation: any): any[] {
    // Generate mock API data
    const dataPoints = 50 + Math.floor(Math.random() * 50);
    
    return Array.from({ length: dataPoints }, (_, i) => ({
      campaign_id: i + 1,
      leads_generated: Math.floor(Math.random() * 100),
      conversions: Math.floor(Math.random() * 20),
      conversion_rate: (Math.random() * 0.3).toFixed(3),
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
    }));
  }

  private generateMockFileData(calculation: any): any[] {
    // Generate mock file data
    return [
      { metric: 'revenue', value: 95000 + Math.random() * 10000 },
      { metric: 'customers', value: 1200 + Math.floor(Math.random() * 300) },
      { metric: 'orders', value: 450 + Math.floor(Math.random() * 100) }
    ];
  }

  private applyAggregation(data: any[], calculation: any): number {
    if (data.length === 0) return 0;
    
    const values = data.map(item => {
      // Extract numeric value based on formula
      if (calculation.formula.includes('order_amount')) {
        return item.order_amount || 0;
      } else if (calculation.formula.includes('satisfaction_rating')) {
        return item.satisfaction_rating || 0;
      } else if (calculation.formula.includes('converted_leads')) {
        return item.conversions || 0;
      } else if (calculation.formula.includes('total_leads')) {
        return item.leads_generated || 0;
      }
      return 0;
    }).filter(v => !isNaN(v));

    switch (calculation.aggregation) {
      case 'sum':
        return values.reduce((sum, value) => sum + value, 0);
      case 'avg':
        return values.reduce((sum, value) => sum + value, 0) / values.length;
      case 'count':
        return values.length;
      case 'min':
        return Math.min(...values);
      case 'max':
        return Math.max(...values);
      case 'median':
        const sorted = values.sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
      default:
        return values.reduce((sum, value) => sum + value, 0);
    }
  }

  private async checkKPIAlerts(kpi: KPIDefinition, currentValue: number): Promise<void> {
    if (!kpi.alerts || kpi.alerts.length === 0) return;
    
    for (const alert of kpi.alerts) {
      const shouldTrigger = this.evaluateAlertCondition(currentValue, alert);
      
      if (shouldTrigger) {
        await this.triggerAlert(kpi, alert, currentValue);
      }
    }
  }

  private evaluateAlertCondition(value: number, alert: any): boolean {
    switch (alert.condition) {
      case 'above':
        return value > alert.threshold;
      case 'below':
        return value < alert.threshold;
      case 'equals':
        return Math.abs(value - alert.threshold) < 0.01;
      case 'change_percent':
        // Would need historical data to calculate
        return false;
      default:
        return false;
    }
  }

  private async triggerAlert(kpi: KPIDefinition, alert: any, currentValue: number): Promise<void> {
    console.log(`🚨 Alert triggered for KPI ${kpi.name}: ${alert.condition} ${alert.threshold}`);
    
    const message = alert.message || 
      `KPI Alert: ${kpi.name} is ${currentValue} (${alert.condition} ${alert.threshold})`;
    
    // Mock alert sending - replace with actual implementation
    for (const recipient of alert.recipients) {
      console.log(`📧 Sending alert to ${recipient}: ${message}`);
    }
  }

  // ========================================================================
  // REPORT GENERATION
  // ========================================================================

  async generateReport(templateId: string, filters?: any): Promise<any> {
    console.log(`📄 Generating report from template: ${templateId}`);
    
    const template = this.reportTemplates.get(templateId);
    if (!template) {
      throw new Error(`Report template not found: ${templateId}`);
    }

    const report = {
      id: `report-${Date.now()}`,
      templateId,
      templateName: template.name,
      generatedAt: new Date().toISOString(),
      filters: filters || {},
      sections: []
    };

    // Generate each section
    for (const section of template.layout.sections) {
      const sectionData = await this.generateReportSection(section, filters);
      report.sections.push(sectionData);
    }

    console.log(`✅ Report generated: ${report.id}`);
    return report;
  }

  private async generateReportSection(section: any, filters?: any): Promise<any> {
    const sectionData = {
      id: section.id,
      title: section.title,
      type: section.type,
      content: {}
    };

    switch (section.type) {
      case 'kpi_grid':
        sectionData.content = await this.generateKPIGridData(section.content.kpiIds);
        break;
      case 'chart':
        sectionData.content = await this.generateChartData(section.content.chartConfig);
        break;
      case 'table':
        sectionData.content = await this.generateTableData(section.content.tableConfig);
        break;
      case 'text':
        sectionData.content = { text: section.content.text };
        break;
      default:
        sectionData.content = section.content;
    }

    return sectionData;
  }

  private async generateKPIGridData(kpiIds: string[]): Promise<any> {
    const kpiData = [];
    
    for (const kpiId of kpiIds) {
      const kpi = this.kpiDefinitions.get(kpiId);
      if (!kpi) continue;
      
      let cachedValue = this.kpiCache.get(kpiId);
      if (!cachedValue) {
        await this.calculateKPIValue(kpiId);
        cachedValue = this.kpiCache.get(kpiId);
      }
      
      kpiData.push({
        id: kpiId,
        name: kpi.name,
        value: cachedValue?.value || 0,
        target: kpi.targets?.target,
        format: kpi.visualisation.format,
        color: kpi.visualisation.color,
        lastUpdated: cachedValue?.timestamp
      });
    }
    
    return { kpis: kpiData };
  }

  private async generateChartData(chartConfig: any): Promise<any> {
    // Mock chart data generation
    const dataPoints = 30;
    const baseValue = 80000 + Math.random() * 40000;
    
    const data = Array.from({ length: dataPoints }, (_, i) => ({
      date: new Date(Date.now() - (dataPoints - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: baseValue + (Math.random() - 0.5) * 20000 + i * 1000
    }));
    
    return {
      type: chartConfig.type,
      data,
      config: chartConfig
    };
  }

  private async generateTableData(tableConfig: any): Promise<any> {
    // Mock table data generation
    const rows = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      customer: `Customer ${i + 1}`,
      orders: Math.floor(Math.random() * 20) + 1,
      revenue: (Math.random() * 10000).toFixed(2),
      satisfaction: (3.5 + Math.random() * 1.5).toFixed(1)
    }));
    
    return {
      columns: ['Customer', 'Orders', 'Revenue', 'Satisfaction'],
      rows,
      config: tableConfig
    };
  }

  async scheduleReport(templateId: string): Promise<void> {
    const template = this.reportTemplates.get(templateId);
    if (!template || !template.schedule?.enabled) {
      throw new Error('Report template not found or scheduling not enabled');
    }

    console.log(`📅 Scheduling report: ${template.name}`);
    
    // Mock scheduling - replace with actual scheduler
    console.log(`⏰ Report scheduled: ${template.schedule.frequency} at ${template.schedule.time}`);
  }

  // ========================================================================
  // DASHBOARD MANAGEMENT
  // ========================================================================

  async createDashboard(dashboard: Dashboard): Promise<void> {
    console.log(`📊 Creating dashboard: ${dashboard.name}`);
    
    // Validate KPI references
    for (const widget of dashboard.layout.widgets) {
      if (widget.kpiId && !this.kpiDefinitions.has(widget.kpiId)) {
        throw new Error(`KPI not found: ${widget.kpiId}`);
      }
    }
    
    this.dashboards.set(dashboard.id, dashboard);
    console.log(`✅ Dashboard created: ${dashboard.id}`);
  }

  async getDashboardData(dashboardId: string): Promise<any> {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) {
      throw new Error(`Dashboard not found: ${dashboardId}`);
    }

    const dashboardData = {
      id: dashboardId,
      name: dashboard.name,
      description: dashboard.description,
      layout: dashboard.layout,
      widgets: []
    };

    // Generate data for each widget
    for (const widget of dashboard.layout.widgets) {
      const widgetData = await this.generateWidgetData(widget);
      dashboardData.widgets.push(widgetData);
    }

    return dashboardData;
  }

  private async generateWidgetData(widget: any): Promise<any> {
    const widgetData = {
      id: widget.id,
      type: widget.type,
      title: widget.title,
      position: widget.position,
      data: null,
      lastUpdated: new Date().toISOString()
    };

    if (widget.kpiId) {
      const kpi = this.kpiDefinitions.get(widget.kpiId);
      if (kpi) {
        let cachedValue = this.kpiCache.get(widget.kpiId);
        if (!cachedValue) {
          await this.calculateKPIValue(widget.kpiId);
          cachedValue = this.kpiCache.get(widget.kpiId);
        }
        
        widgetData.data = {
          value: cachedValue?.value || 0,
          format: kpi.visualisation.format,
          color: kpi.visualisation.color,
          target: kpi.targets?.target
        };
      }
    }

    return widgetData;
  }

  // ========================================================================
  // AUTOMATION ENGINE
  // ========================================================================

  private startAutomationEngine(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🚀 Starting BI automation engine...');
    
    // Update KPIs based on their frequency
    setInterval(() => {
      this.updateKPIs();
    }, 60000); // Check every minute

    // Process scheduled reports
    setInterval(() => {
      this.processScheduledReports();
    }, 300000); // Check every 5 minutes

    // Refresh data sources
    setInterval(() => {
      this.refreshDataSources();
    }, 900000); // Check every 15 minutes
  }

  private async updateKPIs(): Promise<void> {
    const now = new Date();
    
    for (const [kpiId, kpi] of this.kpiDefinitions.entries()) {
      if (kpi.status !== 'active') continue;
      
      const shouldUpdate = this.shouldUpdateKPI(kpi, now);
      if (shouldUpdate) {
        try {
          await this.calculateKPIValue(kpiId);
        } catch (error) {
          console.error(`❌ Failed to update KPI ${kpiId}:`, error);
        }
      }
    }
  }

  private shouldUpdateKPI(kpi: KPIDefinition, now: Date): boolean {
    const cachedValue = this.kpiCache.get(kpi.id);
    if (!cachedValue) return true;
    
    const lastUpdate = new Date(cachedValue.timestamp);
    const diffMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
    
    switch (kpi.updateFrequency) {
      case 'realtime':
        return diffMinutes >= 1;
      case 'hourly':
        return diffMinutes >= 60;
      case 'daily':
        return diffMinutes >= 1440;
      case 'weekly':
        return diffMinutes >= 10080;
      case 'monthly':
        return diffMinutes >= 43200;
      default:
        return diffMinutes >= 60;
    }
  }

  private async processScheduledReports(): Promise<void> {
    const now = new Date();
    
    for (const template of this.reportTemplates.values()) {
      if (!template.schedule?.enabled) continue;
      
      const shouldGenerate = this.shouldGenerateReport(template, now);
      if (shouldGenerate) {
        try {
          const report = await this.generateReport(template.id);
          await this.sendReport(report, template.schedule.recipients, template.schedule.format);
        } catch (error) {
          console.error(`❌ Failed to generate scheduled report ${template.id}:`, error);
        }
      }
    }
  }

  private shouldGenerateReport(template: ReportTemplate, now: Date): boolean {
    // Simplified scheduling logic - replace with proper cron evaluation
    const schedule = template.schedule!;
    const hour = now.getHours();
    const minute = now.getMinutes();
    const dayOfWeek = now.getDay();
    const dayOfMonth = now.getDate();
    
    const [scheduleHour, scheduleMinute] = schedule.time.split(':').map(Number);
    
    // Check if it's the right time
    if (hour !== scheduleHour || minute !== scheduleMinute) return false;
    
    switch (schedule.frequency) {
      case 'daily':
        return true;
      case 'weekly':
        return dayOfWeek === (schedule.dayOfWeek || 1);
      case 'monthly':
        return dayOfMonth === (schedule.dayOfMonth || 1);
      default:
        return false;
    }
  }

  private async sendReport(report: any, recipients: string[], format: string): Promise<void> {
    console.log(`📧 Sending ${format} report to ${recipients.length} recipients`);
    
    for (const recipient of recipients) {
      console.log(`📤 Sending report to: ${recipient}`);
      // Mock email sending - replace with actual implementation
    }
  }

  private async refreshDataSources(): Promise<void> {
    for (const [dataSourceId, dataSource] of this.dataSources.entries()) {
      if (dataSource.status !== 'active') continue;
      
      try {
        await this.testDataSourceConnection(dataSource);
        dataSource.lastSync = new Date().toISOString();
      } catch (error) {
        console.error(`❌ Data source health check failed for ${dataSourceId}:`, error);
        dataSource.status = 'error';
      }
    }
  }

  // ========================================================================
  // PUBLIC APIS
  // ========================================================================

  getKPIValue(kpiId: string): any {
    return this.kpiCache.get(kpiId);
  }

  getKPIs(): KPIDefinition[] {
    return Array.from(this.kpiDefinitions.values());
  }

  getDataSources(): DataSource[] {
    return Array.from(this.dataSources.values());
  }

  getReportTemplates(): ReportTemplate[] {
    return Array.from(this.reportTemplates.values());
  }

  getDashboards(): Dashboard[] {
    return Array.from(this.dashboards.values());
  }

  getSystemMetrics(): any {
    return {
      overview: {
        dataSources: this.dataSources.size,
        activeKPIs: Array.from(this.kpiDefinitions.values()).filter(k => k.status === 'active').length,
        reportTemplates: this.reportTemplates.size,
        dashboards: this.dashboards.size,
        cachedKPIs: this.kpiCache.size
      },
      performance: {
        averageKPICalculationTime: 250 + Math.random() * 500,
        cacheHitRate: 0.85 + Math.random() * 0.1,
        dataSourceHealth: Array.from(this.dataSources.values()).filter(ds => ds.status === 'active').length / this.dataSources.size,
        automationUptime: '99.7%'
      },
      alerts: {
        activeRules: this.alertRules.size,
        triggeredToday: Math.floor(Math.random() * 10),
        averageResponseTime: '2.3 minutes'
      }
    };
  }
}

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

export function createBusinessIntelligenceAutomation(): BusinessIntelligenceAutomation {
  return new BusinessIntelligenceAutomation();
}

// ============================================================================
// DEMO FUNCTION
// ============================================================================

export async function demoBusinessIntelligenceAutomation(): Promise<void> {
  console.log('\n📊 BUSINESS INTELLIGENCE AUTOMATION DEMO');
  console.log('==========================================');

  // Initialize BI automation system
  const biSystem = createBusinessIntelligenceAutomation();

  // Get system overview
  console.log('\n📋 System Overview:');
  const metrics = biSystem.getSystemMetrics();
  console.log('System Metrics:', metrics);

  // Calculate KPI values
  console.log('\n📈 Calculating KPI Values...');
  const kpis = biSystem.getKPIs();
  for (const kpi of kpis.slice(0, 2)) { // Calculate first 2 KPIs
    const value = await biSystem.calculateKPIValue(kpi.id);
    console.log(`${kpi.name}: ${value} (${kpi.visualisation.format})`);
  }

  // Generate a report
  console.log('\n📄 Generating Executive Report...');
  const reportTemplates = biSystem.getReportTemplates();
  if (reportTemplates.length > 0) {
    const report = await biSystem.generateReport(reportTemplates[0].id);
    console.log(`Report generated: ${report.templateName} (${report.sections.length} sections)`);
  }

  // Get dashboard data
  console.log('\n📊 Loading Dashboard Data...');
  const dashboards = biSystem.getDashboards();
  if (dashboards.length > 0) {
    const dashboardData = await biSystem.getDashboardData(dashboards[0].id);
    console.log(`Dashboard loaded: ${dashboardData.name} (${dashboardData.widgets.length} widgets)`);
  }

  // Display available data sources
  console.log('\n🔌 Available Data Sources:');
  const dataSources = biSystem.getDataSources();
  dataSources.forEach(ds => {
    console.log(`- ${ds.name} (${ds.type}) - Status: ${ds.status}`);
  });

  console.log('\n✅ Business Intelligence Automation Demo Complete!');
}