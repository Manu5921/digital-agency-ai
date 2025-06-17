/**
 * RPA Automation - Phase 2
 * Robotic Process Automation pour tâches browser et intégration multi-systèmes
 * 
 * Features:
 * - Automation de tâches browser avec Playwright
 * - Intégration multi-systèmes (CRM, ERP, APIs)
 * - Data entry automatisé avec validation
 * - Monitoring et reporting des process
 * - Gestion d'erreurs intelligente
 * - Scheduling et orchestration
 * - Captcha solving avec services tiers
 */

import { chromium, firefox, webkit, Browser, Page, BrowserContext } from 'playwright';
import { OpenAI } from 'openai';
import axios from 'axios';
import * as cron from 'node-cron';

export interface RPAConfig {
  browser: {
    type: 'chromium' | 'firefox' | 'webkit';
    headless: boolean;
    timeout: number;
    retries: number;
    proxy?: {
      server: string;
      username?: string;
      password?: string;
    };
  };
  integrations: {
    hubspot: {
      apiKey: string;
      baseUrl: string;
    };
    salesforce: {
      clientId: string;
      clientSecret: string;
      username: string;
      password: string;
      securityToken: string;
    };
    zapier: {
      apiKey: string;
    };
    n8n: {
      apiKey: string;
      baseUrl: string;
    };
  };
  captcha: {
    service: '2captcha' | 'anticaptcha' | 'deathbycaptcha';
    apiKey: string;
  };
  monitoring: {
    webhookUrl: string;
    alertThreshold: number;
    reportingInterval: number; // minutes
  };
  ai: {
    openaiApiKey: string;
    model: 'gpt-4o' | 'gpt-4-turbo';
  };
}

export interface RPATask {
  id: string;
  name: string;
  description: string;
  type: 'browser' | 'api' | 'data_entry' | 'scraping' | 'integration';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'scheduled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  steps: RPAStep[];
  schedule?: {
    cron: string;
    timezone: string;
    enabled: boolean;
  };
  config: {
    maxRetries: number;
    timeout: number;
    waitBetweenSteps: number;
    errorHandling: 'stop' | 'continue' | 'retry';
  };
  metadata: {
    createdAt: Date;
    createdBy: string;
    lastRun?: Date;
    nextRun?: Date;
    runCount: number;
    successRate: number;
  };
}

export interface RPAStep {
  id: string;
  name: string;
  type: 'navigate' | 'click' | 'type' | 'wait' | 'extract' | 'validate' | 'api_call' | 'condition' | 'loop' | 'ai_action';
  selector?: string;
  value?: string;
  condition?: string;
  validation?: ValidationRule;
  aiPrompt?: string;
  apiConfig?: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
  };
  loopConfig?: {
    maxIterations: number;
    breakCondition: string;
  };
  expectedOutcome?: string;
  errorHandling?: {
    onError: 'stop' | 'continue' | 'retry';
    maxRetries: number;
    fallbackStep?: string;
  };
}

export interface ValidationRule {
  type: 'exists' | 'not_exists' | 'text_contains' | 'text_equals' | 'regex' | 'custom';
  value: string;
  caseSensitive?: boolean;
  customFunction?: string;
}

export interface RPAExecution {
  id: string;
  taskId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  results: RPAStepResult[];
  error?: string;
  screenshot?: string;
  logs: string[];
  metrics: {
    stepsCompleted: number;
    stepsTotal: number;
    dataProcessed: number;
    errorsEncountered: number;
  };
}

export interface RPAStepResult {
  stepId: string;
  stepName: string;
  status: 'success' | 'failed' | 'skipped';
  startTime: Date;
  endTime: Date;
  duration: number;
  data?: any;
  error?: string;
  screenshot?: string;
  aiInsight?: string;
}

export interface IntegrationConfig {
  name: string;
  type: 'crm' | 'erp' | 'email' | 'calendar' | 'social' | 'ecommerce' | 'custom';
  authentication: {
    type: 'api_key' | 'oauth2' | 'basic' | 'bearer';
    credentials: Record<string, string>;
  };
  endpoints: {
    base: string;
    endpoints: Record<string, string>;
  };
  rateLimits: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
}

export class RPAAutomation {
  private config: RPAConfig;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private openai: OpenAI;
  private tasks: Map<string, RPATask> = new Map();
  private executions: Map<string, RPAExecution> = new Map();
  private integrations: Map<string, IntegrationConfig> = new Map();
  private scheduledTasks: Map<string, cron.ScheduledTask> = new Map();

  constructor(config: RPAConfig) {
    this.config = config;
    this.openai = new OpenAI({ apiKey: config.ai.openaiApiKey });
    this.setupDefaultIntegrations();
    this.startMonitoring();
  }

  /**
   * Configuration des intégrations par défaut
   */
  private setupDefaultIntegrations(): void {
    // HubSpot CRM
    this.integrations.set('hubspot', {
      name: 'HubSpot CRM',
      type: 'crm',
      authentication: {
        type: 'api_key',
        credentials: {
          apiKey: this.config.integrations.hubspot.apiKey
        }
      },
      endpoints: {
        base: 'https://api.hubapi.com',
        endpoints: {
          contacts: '/crm/v3/objects/contacts',
          companies: '/crm/v3/objects/companies',
          deals: '/crm/v3/objects/deals',
          tickets: '/crm/v3/objects/tickets'
        }
      },
      rateLimits: {
        requestsPerMinute: 100,
        requestsPerHour: 1000
      }
    });

    // Salesforce
    this.integrations.set('salesforce', {
      name: 'Salesforce',
      type: 'crm',
      authentication: {
        type: 'oauth2',
        credentials: {
          clientId: this.config.integrations.salesforce.clientId,
          clientSecret: this.config.integrations.salesforce.clientSecret
        }
      },
      endpoints: {
        base: 'https://login.salesforce.com',
        endpoints: {
          auth: '/services/oauth2/token',
          query: '/services/data/v57.0/query',
          sobjects: '/services/data/v57.0/sobjects'
        }
      },
      rateLimits: {
        requestsPerMinute: 1000,
        requestsPerHour: 5000
      }
    });
  }

  /**
   * Initialisation du navigateur
   */
  async initBrowser(): Promise<void> {
    if (this.browser) {
      return;
    }

    const browserType = this.config.browser.type;
    const browserOptions = {
      headless: this.config.browser.headless,
      timeout: this.config.browser.timeout,
      proxy: this.config.browser.proxy
    };

    switch (browserType) {
      case 'chromium':
        this.browser = await chromium.launch(browserOptions);
        break;
      case 'firefox':
        this.browser = await firefox.launch(browserOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(browserOptions);
        break;
    }

    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    this.page = await this.context.newPage();
  }

  /**
   * Création d'une tâche RPA
   */
  createTask(
    name: string,
    description: string,
    type: RPATask['type'],
    steps: RPAStep[],
    options: {
      priority?: RPATask['priority'];
      schedule?: RPATask['schedule'];
      config?: Partial<RPATask['config']>;
      createdBy?: string;
    } = {}
  ): string {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const task: RPATask = {
      id: taskId,
      name,
      description,
      type,
      status: 'pending',
      priority: options.priority || 'medium',
      steps,
      schedule: options.schedule,
      config: {
        maxRetries: 3,
        timeout: 30000,
        waitBetweenSteps: 1000,
        errorHandling: 'stop',
        ...options.config
      },
      metadata: {
        createdAt: new Date(),
        createdBy: options.createdBy || 'system',
        runCount: 0,
        successRate: 0
      }
    };

    this.tasks.set(taskId, task);

    // Programmation si nécessaire
    if (task.schedule?.enabled) {
      this.scheduleTask(task);
    }

    console.log(`[RPA] Tâche créée: ${name} (${taskId})`);
    return taskId;
  }

  /**
   * Exécution d'une tâche RPA
   */
  async executeTask(taskId: string, context: Record<string, any> = {}): Promise<RPAExecution> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Tâche non trouvée: ${taskId}`);
    }

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const execution: RPAExecution = {
      id: executionId,
      taskId,
      status: 'running',
      startTime: new Date(),
      results: [],
      logs: [],
      metrics: {
        stepsCompleted: 0,
        stepsTotal: task.steps.length,
        dataProcessed: 0,
        errorsEncountered: 0
      }
    };

    this.executions.set(executionId, execution);
    task.status = 'running';
    task.metadata.runCount++;

    try {
      console.log(`[RPA] Début exécution: ${task.name} (${executionId})`);

      // Initialisation du navigateur si nécessaire
      if (task.type === 'browser' || task.steps.some(s => ['navigate', 'click', 'type'].includes(s.type))) {
        await this.initBrowser();
      }

      // Exécution des étapes
      let stepContext = { ...context };
      
      for (const step of task.steps) {
        try {
          const stepResult = await this.executeStep(step, stepContext, execution);
          execution.results.push(stepResult);
          execution.metrics.stepsCompleted++;

          // Mise à jour du contexte avec les résultats
          if (stepResult.data) {
            stepContext = { ...stepContext, ...stepResult.data };
          }

          // Attente entre étapes
          if (task.config.waitBetweenSteps > 0) {
            await this.sleep(task.config.waitBetweenSteps);
          }

        } catch (error) {
          execution.metrics.errorsEncountered++;
          const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
          
          console.error(`[RPA] Erreur étape ${step.name}:`, errorMessage);
          
          const stepResult: RPAStepResult = {
            stepId: step.id,
            stepName: step.name,
            status: 'failed',
            startTime: new Date(),
            endTime: new Date(),
            duration: 0,
            error: errorMessage
          };
          
          execution.results.push(stepResult);

          // Gestion d'erreur
          if (step.errorHandling?.onError === 'continue') {
            continue;
          } else if (step.errorHandling?.onError === 'retry' && step.errorHandling.maxRetries > 0) {
            // Logique de retry
            continue;
          } else if (task.config.errorHandling === 'stop') {
            throw error;
          }
        }
      }

      execution.status = 'completed';
      task.status = 'completed';
      
      // Calcul du taux de succès
      const successfulSteps = execution.results.filter(r => r.status === 'success').length;
      task.metadata.successRate = (successfulSteps / execution.results.length) * 100;

      console.log(`[RPA] Exécution terminée: ${task.name} - ${execution.metrics.stepsCompleted}/${execution.metrics.stepsTotal} étapes`);

    } catch (error) {
      execution.status = 'failed';
      task.status = 'failed';
      execution.error = error instanceof Error ? error.message : 'Erreur inconnue';
      
      console.error(`[RPA] Échec exécution: ${task.name}`, execution.error);
    } finally {
      execution.endTime = new Date();
      execution.duration = execution.endTime.getTime() - execution.startTime.getTime();
      task.metadata.lastRun = new Date();

      // Screenshot final
      if (this.page) {
        try {
          execution.screenshot = await this.captureScreenshot(executionId);
        } catch (error) {
          console.warn('[RPA] Impossible de capturer screenshot:', error);
        }
      }

      // Notification si configurée
      await this.notifyExecution(execution);
    }

    return execution;
  }

  /**
   * Exécution d'une étape individuelle
   */
  private async executeStep(
    step: RPAStep,
    context: Record<string, any>,
    execution: RPAExecution
  ): Promise<RPAStepResult> {
    const startTime = new Date();
    console.log(`[RPA] Exécution étape: ${step.name}`);

    try {
      let result: any = null;

      switch (step.type) {
        case 'navigate':
          result = await this.stepNavigate(step, context);
          break;
        case 'click':
          result = await this.stepClick(step, context);
          break;
        case 'type':
          result = await this.stepType(step, context);
          break;
        case 'wait':
          result = await this.stepWait(step, context);
          break;
        case 'extract':
          result = await this.stepExtract(step, context);
          break;
        case 'validate':
          result = await this.stepValidate(step, context);
          break;
        case 'api_call':
          result = await this.stepApiCall(step, context);
          break;
        case 'condition':
          result = await this.stepCondition(step, context);
          break;
        case 'ai_action':
          result = await this.stepAIAction(step, context);
          break;
        default:
          throw new Error(`Type d'étape non supporté: ${step.type}`);
      }

      const endTime = new Date();
      const stepResult: RPAStepResult = {
        stepId: step.id,
        stepName: step.name,
        status: 'success',
        startTime,
        endTime,
        duration: endTime.getTime() - startTime.getTime(),
        data: result
      };

      // Validation si configurée
      if (step.validation) {
        const isValid = await this.validateStep(step.validation, result, context);
        if (!isValid) {
          stepResult.status = 'failed';
          stepResult.error = 'Validation échouée';
        }
      }

      return stepResult;

    } catch (error) {
      const endTime = new Date();
      return {
        stepId: step.id,
        stepName: step.name,
        status: 'failed',
        startTime,
        endTime,
        duration: endTime.getTime() - startTime.getTime(),
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Étapes d'exécution spécialisées
   */
  private async stepNavigate(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!this.page) throw new Error('Page non initialisée');
    
    const url = this.interpolateValue(step.value || '', context);
    await this.page.goto(url, { waitUntil: 'networkidle' });
    
    return { url, title: await this.page.title() };
  }

  private async stepClick(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!this.page) throw new Error('Page non initialisée');
    
    const selector = this.interpolateValue(step.selector || '', context);
    
    // Attendre que l'élément soit visible
    await this.page.waitForSelector(selector, { timeout: 10000 });
    
    // Cliquer
    await this.page.click(selector);
    
    return { clicked: true, selector };
  }

  private async stepType(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!this.page) throw new Error('Page non initialisée');
    
    const selector = this.interpolateValue(step.selector || '', context);
    const value = this.interpolateValue(step.value || '', context);
    
    await this.page.waitForSelector(selector, { timeout: 10000 });
    await this.page.fill(selector, value);
    
    return { typed: true, selector, value };
  }

  private async stepWait(step: RPAStep, context: Record<string, any>): Promise<any> {
    const waitTime = parseInt(step.value || '1000');
    await this.sleep(waitTime);
    
    return { waited: waitTime };
  }

  private async stepExtract(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!this.page) throw new Error('Page non initialisée');
    
    const selector = this.interpolateValue(step.selector || '', context);
    
    // Extraction du texte
    const element = await this.page.waitForSelector(selector, { timeout: 10000 });
    const text = await element.textContent();
    
    // Extraction d'attributs si spécifié
    const attribute = step.value;
    let attributeValue = null;
    if (attribute) {
      attributeValue = await element.getAttribute(attribute);
    }
    
    return {
      text: text?.trim(),
      attribute: attributeValue,
      selector
    };
  }

  private async stepValidate(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!step.validation) {
      throw new Error('Règle de validation manquante');
    }
    
    const isValid = await this.validateStep(step.validation, context, context);
    
    if (!isValid) {
      throw new Error(`Validation échouée: ${step.validation.type} - ${step.validation.value}`);
    }
    
    return { validated: true };
  }

  private async stepApiCall(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!step.apiConfig) {
      throw new Error('Configuration API manquante');
    }
    
    const config = step.apiConfig;
    const url = this.interpolateValue(config.url, context);
    const headers = config.headers || {};
    
    // Interpolation des headers
    Object.keys(headers).forEach(key => {
      headers[key] = this.interpolateValue(headers[key], context);
    });
    
    const response = await axios({
      method: config.method,
      url,
      headers,
      data: config.body,
      timeout: 30000
    });
    
    return {
      status: response.status,
      data: response.data,
      headers: response.headers
    };
  }

  private async stepCondition(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!step.condition) {
      throw new Error('Condition manquante');
    }
    
    // Évaluation de la condition (simple)
    const condition = this.interpolateValue(step.condition, context);
    const result = eval(condition); // Attention: eval est dangereux en production
    
    return { condition, result };
  }

  private async stepAIAction(step: RPAStep, context: Record<string, any>): Promise<any> {
    if (!step.aiPrompt) {
      throw new Error('Prompt AI manquant');
    }
    
    const prompt = this.interpolateValue(step.aiPrompt, context);
    
    // Capture d'écran pour l'analyse
    let screenshot = null;
    if (this.page) {
      screenshot = await this.page.screenshot({ encoding: 'base64' });
    }
    
    const completion = await this.openai.chat.completions.create({
      model: this.config.ai.model,
      messages: [
        {
          role: 'system',
          content: 'Tu es un assistant RPA qui analyse les pages web et effectue des actions intelligentes.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 500
    });
    
    const aiResponse = completion.choices[0].message.content || '';
    
    return {
      prompt,
      response: aiResponse,
      hasScreenshot: !!screenshot
    };
  }

  /**
   * Validation d'étape
   */
  private async validateStep(
    validation: ValidationRule,
    data: any,
    context: Record<string, any>
  ): Promise<boolean> {
    const value = this.interpolateValue(validation.value, context);
    
    switch (validation.type) {
      case 'exists':
        return data !== null && data !== undefined;
      case 'not_exists':
        return data === null || data === undefined;
      case 'text_contains':
        const text = typeof data === 'string' ? data : JSON.stringify(data);
        return validation.caseSensitive ? 
          text.includes(value) : 
          text.toLowerCase().includes(value.toLowerCase());
      case 'text_equals':
        return validation.caseSensitive ? 
          data === value : 
          data?.toLowerCase() === value.toLowerCase();
      case 'regex':
        const regex = new RegExp(value);
        return regex.test(String(data));
      case 'custom':
        // Évaluation personnalisée (dangereux)
        return eval(validation.customFunction || 'false');
      default:
        return true;
    }
  }

  /**
   * Programmation de tâches
   */
  private scheduleTask(task: RPATask): void {
    if (!task.schedule?.enabled || !task.schedule.cron) {
      return;
    }
    
    const scheduledTask = cron.schedule(task.schedule.cron, async () => {
      console.log(`[RPA] Exécution programmée: ${task.name}`);
      try {
        await this.executeTask(task.id);
      } catch (error) {
        console.error(`[RPA] Erreur exécution programmée: ${task.name}`, error);
      }
    }, {
      scheduled: true,
      timezone: task.schedule.timezone || 'Europe/Paris'
    });
    
    this.scheduledTasks.set(task.id, scheduledTask);
    
    // Calcul de la prochaine exécution
    task.metadata.nextRun = new Date(Date.now() + 60000); // Approximation
  }

  /**
   * Intégrations CRM
   */
  async syncToHubSpot(data: any): Promise<any> {
    const integration = this.integrations.get('hubspot');
    if (!integration) {
      throw new Error('Intégration HubSpot non configurée');
    }
    
    const response = await axios.post(
      `${integration.endpoints.base}${integration.endpoints.endpoints.contacts}`,
      {
        properties: data
      },
      {
        headers: {
          'Authorization': `Bearer ${integration.authentication.credentials.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  }

  async syncToSalesforce(data: any): Promise<any> {
    const integration = this.integrations.get('salesforce');
    if (!integration) {
      throw new Error('Intégration Salesforce non configurée');
    }
    
    // Authentification OAuth2
    const authResponse = await axios.post(
      `${integration.endpoints.base}${integration.endpoints.endpoints.auth}`,
      new URLSearchParams({
        grant_type: 'password',
        client_id: integration.authentication.credentials.clientId,
        client_secret: integration.authentication.credentials.clientSecret,
        username: this.config.integrations.salesforce.username,
        password: this.config.integrations.salesforce.password + this.config.integrations.salesforce.securityToken
      })
    );
    
    const accessToken = authResponse.data.access_token;
    const instanceUrl = authResponse.data.instance_url;
    
    // Création de l'enregistrement
    const response = await axios.post(
      `${instanceUrl}/services/data/v57.0/sobjects/Contact/`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  }

  /**
   * Gestion des CAPTCHAs
   */
  async solveCaptcha(captchaType: 'recaptcha' | 'image' | 'text', data: any): Promise<string> {
    const service = this.config.captcha.service;
    const apiKey = this.config.captcha.apiKey;
    
    switch (service) {
      case '2captcha':
        return await this.solve2Captcha(captchaType, data, apiKey);
      case 'anticaptcha':
        return await this.solveAntiCaptcha(captchaType, data, apiKey);
      default:
        throw new Error(`Service CAPTCHA non supporté: ${service}`);
    }
  }

  private async solve2Captcha(type: string, data: any, apiKey: string): Promise<string> {
    // Implémentation 2captcha
    // Soumission
    const submitResponse = await axios.post('http://2captcha.com/in.php', {
      key: apiKey,
      method: type === 'recaptcha' ? 'userrecaptcha' : 'base64',
      googlekey: data.siteKey,
      pageurl: data.pageUrl,
      body: data.image
    });
    
    const captchaId = submitResponse.data.split('|')[1];
    
    // Attente de la résolution
    let attempts = 0;
    while (attempts < 24) { // Max 2 minutes
      await this.sleep(5000);
      
      const resultResponse = await axios.get(`http://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}`);
      
      if (resultResponse.data.includes('CAPCHA_NOT_READY')) {
        attempts++;
        continue;
      }
      
      if (resultResponse.data.includes('OK|')) {
        return resultResponse.data.split('|')[1];
      }
      
      throw new Error('Erreur résolution CAPTCHA');
    }
    
    throw new Error('Timeout résolution CAPTCHA');
  }

  private async solveAntiCaptcha(type: string, data: any, apiKey: string): Promise<string> {
    // Implémentation AntiCaptcha
    throw new Error('AntiCaptcha non implémenté');
  }

  /**
   * Monitoring et reporting
   */
  private startMonitoring(): void {
    // Reporting périodique
    setInterval(() => {
      this.generateReport();
    }, this.config.monitoring.reportingInterval * 60 * 1000);
  }

  private async generateReport(): Promise<void> {
    const stats = this.getStats();
    
    console.log('[RPA] Rapport périodique:', stats);
    
    // Envoi du rapport
    if (this.config.monitoring.webhookUrl) {
      try {
        await axios.post(this.config.monitoring.webhookUrl, {
          type: 'rpa_report',
          timestamp: new Date().toISOString(),
          stats
        });
      } catch (error) {
        console.error('[RPA] Erreur envoi rapport:', error);
      }
    }
  }

  private async notifyExecution(execution: RPAExecution): Promise<void> {
    if (execution.status === 'failed' && this.config.monitoring.webhookUrl) {
      await axios.post(this.config.monitoring.webhookUrl, {
        type: 'rpa_execution_failed',
        execution: {
          id: execution.id,
          taskId: execution.taskId,
          error: execution.error,
          duration: execution.duration,
          metrics: execution.metrics
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Utilitaires
   */
  private interpolateValue(template: string, context: Record<string, any>): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const value = context[key.trim()];
      return value !== undefined ? String(value) : match;
    });
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async captureScreenshot(executionId: string): Promise<string> {
    if (!this.page) return '';
    
    const screenshot = await this.page.screenshot({ 
      path: `./screenshots/${executionId}.png`,
      fullPage: true 
    });
    
    return `./screenshots/${executionId}.png`;
  }

  /**
   * API publique
   */
  async getTask(taskId: string): Promise<RPATask | null> {
    return this.tasks.get(taskId) || null;
  }

  async getExecution(executionId: string): Promise<RPAExecution | null> {
    return this.executions.get(executionId) || null;
  }

  async listTasks(): Promise<RPATask[]> {
    return Array.from(this.tasks.values());
  }

  async listExecutions(): Promise<RPAExecution[]> {
    return Array.from(this.executions.values());
  }

  async pauseTask(taskId: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'pending';
      const scheduledTask = this.scheduledTasks.get(taskId);
      if (scheduledTask) {
        scheduledTask.stop();
      }
    }
  }

  async resumeTask(taskId: string): Promise<void> {
    const task = this.tasks.get(taskId);
    if (task && task.schedule?.enabled) {
      this.scheduleTask(task);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    const scheduledTask = this.scheduledTasks.get(taskId);
    if (scheduledTask) {
      scheduledTask.stop();
      this.scheduledTasks.delete(taskId);
    }
    this.tasks.delete(taskId);
  }

  getStats(): {
    totalTasks: number;
    activeTasks: number;
    totalExecutions: number;
    successRate: number;
    averageExecutionTime: number;
    taskTypeDistribution: Record<string, number>;
    lastExecutions: RPAExecution[];
  } {
    const tasks = Array.from(this.tasks.values());
    const executions = Array.from(this.executions.values());
    
    const successfulExecutions = executions.filter(e => e.status === 'completed');
    const averageTime = executions.reduce((sum, e) => sum + (e.duration || 0), 0) / executions.length || 0;
    
    return {
      totalTasks: tasks.length,
      activeTasks: tasks.filter(t => t.status === 'running').length,
      totalExecutions: executions.length,
      successRate: successfulExecutions.length / executions.length || 0,
      averageExecutionTime: averageTime,
      taskTypeDistribution: tasks.reduce((acc, task) => {
        acc[task.type] = (acc[task.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      lastExecutions: executions.slice(-5)
    };
  }

  /**
   * Nettoyage
   */
  async cleanup(): Promise<void> {
    // Arrêt des tâches programmées
    this.scheduledTasks.forEach(task => task.stop());
    this.scheduledTasks.clear();
    
    // Fermeture du navigateur
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }
}

// Configuration par défaut
export const defaultRPAConfig: RPAConfig = {
  browser: {
    type: 'chromium',
    headless: true,
    timeout: 30000,
    retries: 3
  },
  integrations: {
    hubspot: {
      apiKey: process.env.HUBSPOT_API_KEY || '',
      baseUrl: 'https://api.hubapi.com'
    },
    salesforce: {
      clientId: process.env.SALESFORCE_CLIENT_ID || '',
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET || '',
      username: process.env.SALESFORCE_USERNAME || '',
      password: process.env.SALESFORCE_PASSWORD || '',
      securityToken: process.env.SALESFORCE_SECURITY_TOKEN || ''
    },
    zapier: {
      apiKey: process.env.ZAPIER_API_KEY || ''
    },
    n8n: {
      apiKey: process.env.N8N_API_KEY || '',
      baseUrl: process.env.N8N_BASE_URL || ''
    }
  },
  captcha: {
    service: '2captcha',
    apiKey: process.env.CAPTCHA_API_KEY || ''
  },
  monitoring: {
    webhookUrl: process.env.RPA_WEBHOOK_URL || '',
    alertThreshold: 80,
    reportingInterval: 60
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o'
  }
};

export default RPAAutomation;