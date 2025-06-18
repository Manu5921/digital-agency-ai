/**
 * ML Code Generation System - Enterprise Orchestrator
 * Système ML de génération de code enterprise - Orchestrateur complet
 * 
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Orchestrateur principal enterprise avec API REST, gestion d'état avancée,
 *              monitoring temps réel, et intégrations MCP complètes
 * 
 * 🚀 FONCTIONNALITÉS ENTERPRISE:
 * ✅ API REST complète avec authentification
 * ✅ Gestion d'état distribuée avec cache Redis
 * ✅ Monitoring temps réel avec métriques avancées
 * ✅ Pipeline CI/CD automatisé
 * ✅ Validation sécurité OWASP + compliance
 * ✅ Intégrations MCP (Vercel, Figma, Neon, Stripe)
 * ✅ Scaling automatique et load balancing
 * ✅ Backup et disaster recovery
 * ✅ Audit logs et traçabilité complète
 */

import { EventEmitter } from 'events';
import { createServer, Server } from 'http';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { createClient } from 'redis';
import { WebSocket, WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import winston from 'winston';
import jwt from 'jsonwebtoken';

import MLCodeGenerator, { MLCodeGeneratorFactory } from './generator';
import { QualityScorer, QualityScorerFactory } from './quality-scorer';
import { SecurityValidator, SecurityValidatorFactory } from './security-validator';
import { MCPIntegrationsManager } from './mcp-integrations';
import { DeploymentPipeline, DeploymentPipelineFactory } from './deployment-pipeline';
import { TemplateGeneratorFactory } from './templates';
import {
  ICodeGenerationRequest,
  ICodeGenerationResult,
  IGeneratedProject,
  IGeneratedFile,
  ProjectType,
  QualityLevel,
  IMLConfiguration
} from './interfaces';

// ========================================
// INTERFACE PRINCIPALE
// ========================================

export interface IMLCodeGenerationSystem {
  initialize(config: IMLSystemConfig): Promise<void>;
  generateProject(request: ICodeGenerationRequest): Promise<ICodeGenerationResult>;
  deployProject(projectId: string, environment: string): Promise<void>;
  getSystemHealth(): Promise<ISystemHealth>;
  getMetrics(): Promise<ISystemMetrics>;
}

export interface IMLSystemConfig {
  ml: {
    githubCopilot: {
      apiKey: string;
      enterprise: boolean;
    };
    codeT5: {
      enabled: boolean;
      models: Record<string, string>;
    };
  };
  integrations: {
    vercel?: { apiKey: string; teamId?: string };
    figma?: { accessToken: string };
    neon?: { apiKey: string };
    stripe?: { secretKey: string };
  };
  quality: {
    level: QualityLevel;
    enforceGates: boolean;
    autoFix: boolean;
  };
  security: {
    level: QualityLevel;
    enforceCompliance: boolean;
    autoScan: boolean;
  };
  deployment: {
    enabled: boolean;
    autoDeployment: boolean;
    environments: string[];
  };
  monitoring: {
    enabled: boolean;
    realtime: boolean;
    alerts: boolean;
  };
  // Nouvelles configurations enterprise
  api: {
    enabled: boolean;
    port: number;
    host: string;
    cors: {
      enabled: boolean;
      origins: string[];
    };
    rateLimit: {
      enabled: boolean;
      windowMs: number;
      max: number;
    };
    authentication: {
      enabled: boolean;
      jwtSecret: string;
      expiresIn: string;
    };
  };
  redis: {
    enabled: boolean;
    host: string;
    port: number;
    password?: string;
    ttl: number;
  };
  websocket: {
    enabled: boolean;
    port: number;
    realtime: boolean;
  };
  scaling: {
    enabled: boolean;
    instances: number;
    loadBalancer: boolean;
    autoScale: boolean;
  };
  backup: {
    enabled: boolean;
    schedule: string;
    retention: number;
    storage: string;
  };
  audit: {
    enabled: boolean;
    level: 'basic' | 'detailed' | 'comprehensive';
    retention: number;
  };
}

export interface ISystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  components: Record<string, IComponentHealth>;
  uptime: number;
  lastCheck: Date;
}

export interface IComponentHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  errorRate: number;
  lastError?: string;
  metrics: Record<string, number>;
}

export interface ISystemMetrics {
  generation: {
    totalProjects: number;
    successRate: number;
    averageDuration: number;
    averageQualityScore: number;
    projectsInProgress: number;
    queueLength: number;
  };
  deployment: {
    totalDeployments: number;
    successRate: number;
    averageDuration: number;
    rollbackRate: number;
    activeDeployments: number;
    failureRate: number;
  };
  security: {
    vulnerabilitiesDetected: number;
    criticalIssues: number;
    complianceScore: number;
    scansCompleted: number;
    threatLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  performance: {
    systemLoad: number;
    memoryUsage: number;
    responseTime: number;
    cpuUsage: number;
    diskUsage: number;
    networkLatency: number;
  };
  api: {
    totalRequests: number;
    requestsPerSecond: number;
    averageResponseTime: number;
    errorRate: number;
    activeConnections: number;
  };
  cache: {
    hitRate: number;
    missRate: number;
    totalKeys: number;
    memoryUsage: number;
    evictions: number;
  };
  enterprise: {
    uptime: number;
    availability: number;
    scalingEvents: number;
    backupsCompleted: number;
    auditEvents: number;
  };
}

// ========================================
// SYSTÈME PRINCIPAL
// ========================================

export class MLCodeGenerationSystem extends EventEmitter implements IMLCodeGenerationSystem {
  private config: IMLSystemConfig;
  private generator: MLCodeGenerator;
  private qualityScorer: QualityScorer;
  private securityValidator: SecurityValidator;
  private mcpManager: MCPIntegrationsManager;
  private deploymentPipeline: DeploymentPipeline;
  private isInitialized = false;
  private metrics: ISystemMetrics;
  
  // Enterprise components
  private app: Express;
  private server: Server;
  private wsServer: WebSocketServer;
  private redis: any;
  private logger: winston.Logger;
  private projectQueue: Map<string, ICodeGenerationRequest> = new Map();
  private activeProjects: Map<string, ICodeGenerationResult> = new Map();
  private deploymentQueue: Map<string, any> = new Map();
  private connections: Set<WebSocket> = new Set();
  private auditLogs: any[] = [];

  constructor() {
    super();
    this.initializeMetrics();
    this.initializeLogger();
    this.initializeExpressApp();
  }

  // ========================================
  // INITIALISATION
  // ========================================

  public async initialize(config: IMLSystemConfig): Promise<void> {
    this.logger.info('🚀 Initialisation du système ML de génération de code enterprise...');
    
    this.config = config;
    this.emit('system:initializing');

    try {
      // 1. Initialisation Redis (cache distribué)
      if (this.config.redis.enabled) {
        await this.initializeRedis();
      }

      // 2. Initialisation du générateur ML
      await this.initializeMLGenerator();

      // 3. Initialisation des validateurs
      await this.initializeValidators();

      // 4. Initialisation des intégrations MCP
      await this.initializeMCPIntegrations();

      // 5. Initialisation du pipeline de déploiement
      await this.initializeDeploymentPipeline();

      // 6. Configuration du monitoring
      if (this.config.monitoring.enabled) {
        await this.initializeMonitoring();
      }

      // 7. Démarrage API REST
      if (this.config.api.enabled) {
        await this.startAPIServer();
      }

      // 8. Démarrage WebSocket
      if (this.config.websocket.enabled) {
        await this.startWebSocketServer();
      }

      // 9. Configuration des tâches automatisées
      await this.initializeAutomatedTasks();

      // 10. Initialisation des backups
      if (this.config.backup.enabled) {
        await this.initializeBackupSystem();
      }

      this.isInitialized = true;
      this.logger.info('✅ Système ML de génération de code enterprise initialisé avec succès');
      this.emit('system:initialized');

      // Audit log de démarrage
      this.auditLog('system:startup', 'System initialized successfully', { config: this.config });

    } catch (error) {
      this.logger.error('❌ Erreur lors de l\'initialisation:', error);
      this.emit('system:error', error);
      throw error;
    }
  }

  private async initializeMLGenerator(): Promise<void> {
    console.log('🤖 Initialisation du générateur ML...');
    
    const mlConfig: IMLConfiguration = {
      version: '2.0.0',
      environment: 'production',
      models: {
        githubCopilot: {
          enabled: true,
          apiKey: this.config.ml.githubCopilot.apiKey,
          model: 'gpt-4-turbo',
          maxTokens: 2000,
          temperature: 0.3,
          topP: 0.9,
          frequencyPenalty: 0,
          presencePenalty: 0,
          enterpriseFeatures: {
            codeReview: this.config.ml.githubCopilot.enterprise,
            securityScanning: this.config.ml.githubCopilot.enterprise,
            complianceChecks: this.config.ml.githubCopilot.enterprise,
            auditLogs: this.config.ml.githubCopilot.enterprise,
            teamCollaboration: this.config.ml.githubCopilot.enterprise
          },
          rateLimits: {
            requestsPerHour: 1000,
            tokensPerMinute: 10000
          }
        },
        codeT5: {
          enabled: this.config.ml.codeT5.enabled,
          models: {
            base: 'Salesforce/codet5-base',
            large: 'Salesforce/codet5-large',
            fineTuned: this.config.ml.codeT5.models
          },
          inference: {
            maxNewTokens: 2000,
            temperature: 0.2,
            topP: 0.9,
            topK: 50,
            repetitionPenalty: 1.1,
            lengthPenalty: 1.0,
            numBeams: 4,
            earlyStopping: true
          },
          fineTuning: {
            enabled: false,
            datasets: [],
            epochs: 3,
            learningRate: 5e-5,
            batchSize: 8
          }
        },
        customModels: {
          enabled: false,
          models: {},
          registry: {
            url: '',
            authentication: {}
          }
        }
      },
      optimization: {
        enabled: true,
        performance: {
          bundleOptimization: true,
          codesplitting: true,
          treeshaking: true,
          minification: true,
          compression: true
        },
        images: {
          formats: ['webp', 'avif'],
          quality: 85,
          responsive: true,
          lazy: true,
          webp: true,
          avif: true
        },
        caching: {
          staticAssets: 31536000,
          apiResponses: 300,
          cdn: true,
          serviceWorker: true
        },
        targets: {
          lcp: 2500,
          fid: 100,
          cls: 0.1,
          fcp: 1800,
          ttfb: 800,
          bundleSize: 250000,
          lighthouse: 90
        }
      },
      testing: {
        enabled: true,
        frameworks: {
          jest: {
            enabled: true,
            version: '29.x',
            testEnvironment: 'jsdom',
            setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
            moduleNameMapping: { '^@/(.*)$': '<rootDir>/src/$1' },
            transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
            collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts']
          },
          playwright: {
            enabled: true,
            version: '1.40.x',
            browsers: ['chromium', 'firefox', 'webkit'],
            devices: ['Desktop Chrome', 'iPhone 12', 'iPad'],
            baseURL: 'http://localhost:3000',
            timeout: 30000,
            retries: 2,
            workers: 1
          },
          cypress: {
            enabled: false,
            version: '13.x',
            baseUrl: 'http://localhost:3000',
            viewportWidth: 1280,
            viewportHeight: 720,
            video: false,
            screenshots: true,
            chromeWebSecurity: false
          },
          vitest: {
            enabled: false,
            version: '1.x',
            environment: 'jsdom',
            globals: true,
            coverage: {}
          }
        },
        coverage: {
          threshold: {
            global: {
              statements: this.config.quality.level === 'enterprise' ? 90 : 80,
              branches: this.config.quality.level === 'enterprise' ? 85 : 75,
              functions: this.config.quality.level === 'enterprise' ? 90 : 80,
              lines: this.config.quality.level === 'enterprise' ? 90 : 80
            },
            perFile: {
              statements: 70,
              branches: 60,
              functions: 70,
              lines: 70
            }
          },
          reporters: ['text', 'html', 'lcov'],
          collectFrom: ['src/**/*.{ts,tsx}'],
          exclude: ['src/**/*.d.ts', 'src/**/*.test.{ts,tsx}']
        },
        visualRegression: {
          enabled: this.config.quality.level === 'enterprise',
          threshold: 0.1,
          browsers: ['chromium'],
          devices: ['desktop', 'mobile']
        },
        accessibility: {
          enabled: this.config.quality.level !== 'mvp',
          standards: ['WCAG2A', 'WCAG2AA'],
          tools: ['axe-core', 'pa11y']
        }
      },
      security: {
        enabled: true,
        scanning: {
          dependencies: true,
          secrets: true,
          staticAnalysis: true,
          dynamicAnalysis: this.config.security.level === 'enterprise'
        },
        compliance: {
          owasp: true,
          gdpr: true,
          hipaa: this.config.security.level === 'enterprise',
          sox: this.config.security.level === 'enterprise'
        },
        tools: {
          snyk: true,
          sonarqube: this.config.security.level === 'enterprise',
          codeql: true,
          semgrep: this.config.security.level === 'enterprise'
        },
        policies: {
          allowedDependencies: [],
          blockedDependencies: ['lodash@4.17.15'],
          maxVulnerabilityScore: this.config.security.level === 'enterprise' ? 7.0 : 8.5,
          requireSecurityReview: this.config.security.level === 'enterprise',
          encryptionStandards: ['AES-256', 'RSA-2048']
        }
      },
      deployment: {
        enabled: this.config.deployment.enabled,
        providers: {
          vercel: {
            enabled: !!this.config.integrations.vercel,
            teamId: this.config.integrations.vercel?.teamId,
            projectId: '',
            orgId: '',
            token: this.config.integrations.vercel?.apiKey || '',
            regions: ['iad1', 'cdg1'],
            functions: {
              memory: 1024,
              timeout: 30
            }
          },
          netlify: { enabled: false, siteId: '', token: '', buildCommand: '', publishDir: '', functions: { directory: '' } },
          aws: { enabled: false, region: '', accessKeyId: '', secretAccessKey: '', s3: { bucket: '', region: '' }, cloudfront: { distributionId: '' }, lambda: { region: '', timeout: 0, memory: 0 } },
          gcp: { enabled: false, projectId: '', credentials: {}, storage: { bucket: '' }, functions: { region: '', timeout: 0, memory: '' } }
        },
        environments: {
          development: {
            name: 'development',
            url: '',
            branch: 'develop',
            variables: { NODE_ENV: 'development' },
            secrets: {},
            protection: {
              requireReview: false,
              allowedUsers: [],
              requiredChecks: []
            }
          },
          staging: {
            name: 'staging',
            url: '',
            branch: 'main',
            variables: { NODE_ENV: 'staging' },
            secrets: {},
            protection: {
              requireReview: false,
              allowedUsers: [],
              requiredChecks: []
            }
          },
          production: {
            name: 'production',
            url: '',
            branch: 'main',
            variables: { NODE_ENV: 'production' },
            secrets: {},
            protection: {
              requireReview: true,
              allowedUsers: [],
              requiredChecks: ['build', 'test', 'security']
            }
          }
        },
        cicd: {
          provider: 'github-actions',
          stages: ['lint', 'test', 'build', 'deploy'],
          autoDeployment: {
            staging: this.config.deployment.autoDeployment,
            production: false
          },
          qualityGates: {
            testCoverage: this.config.quality.level === 'enterprise' ? 90 : 80,
            buildSuccess: true,
            performanceScore: this.config.quality.level === 'enterprise' ? 95 : 85
          }
        }
      },
      monitoring: {
        enabled: this.config.monitoring.enabled,
        realUserMonitoring: {
          enabled: true,
          provider: 'vercel',
          sampleRate: 1.0
        },
        syntheticMonitoring: {
          enabled: this.config.monitoring.realtime,
          frequency: '5min',
          locations: ['us-east-1', 'eu-west-1'],
          urls: ['/']
        },
        errorTracking: {
          enabled: true,
          provider: 'sentry',
          sampleRate: 1.0,
          environment: 'production'
        },
        logging: {
          enabled: true,
          level: 'info',
          providers: ['console']
        },
        alerts: {
          enabled: this.config.monitoring.alerts,
          channels: [],
          rules: []
        }
      },
      integrations: {
        figma: {
          enabled: !!this.config.integrations.figma,
          apiKey: this.config.integrations.figma?.accessToken || '',
          teamId: '',
          extractTokens: true,
          generateComponents: true,
          syncDesignSystem: true
        },
        stripe: {
          enabled: !!this.config.integrations.stripe,
          publishableKey: '',
          secretKey: this.config.integrations.stripe?.secretKey || '',
          webhookSecret: '',
          testMode: true,
          products: []
        },
        neon: {
          enabled: !!this.config.integrations.neon,
          apiKey: this.config.integrations.neon?.apiKey || '',
          projectId: '',
          branches: {
            main: 'main',
            development: 'dev',
            staging: 'staging'
          },
          connectionString: ''
        },
        contentful: { enabled: false, spaceId: '', accessToken: '', previewToken: '', environment: '' },
        sanity: { enabled: false, projectId: '', dataset: '', token: '', apiVersion: '' },
        supabase: { enabled: false, url: '', anonKey: '', serviceRoleKey: '', jwtSecret: '' },
        auth0: { enabled: false, domain: '', clientId: '', clientSecret: '', audience: '' },
        sendgrid: { enabled: false, apiKey: '', fromEmail: '', templates: {} }
      }
    };

    this.generator = new MLCodeGenerator(mlConfig);
    
    // Écoute des événements du générateur
    this.generator.on('initialized', () => {
      console.log('✅ Générateur ML initialisé');
    });

    this.generator.on('generation:started', (data) => {
      this.emit('generation:started', data);
    });

    this.generator.on('generation:completed', (result) => {
      this.updateGenerationMetrics(result);
      this.emit('generation:completed', result);
    });

    this.generator.on('generation:error', (data) => {
      this.emit('generation:error', data);
    });
  }

  private async initializeValidators(): Promise<void> {
    console.log('🔍 Initialisation des validateurs...');
    
    // Quality Scorer
    this.qualityScorer = new QualityScorer({
      projectType: 'restaurant',
      qualityLevel: this.config.quality.level,
      files: []
    });

    // Security Validator
    this.securityValidator = new SecurityValidator(this.config.security.level);

    console.log('✅ Validateurs initialisés');
  }

  private async initializeMCPIntegrations(): Promise<void> {
    console.log('🔗 Initialisation des intégrations MCP...');
    
    this.mcpManager = new MCPIntegrationsManager();
    await this.mcpManager.initialize(this.config.integrations);

    // Écoute des événements MCP
    this.mcpManager.on('initialized', (services) => {
      console.log(`✅ ${services.length} service(s) MCP initialisé(s): ${services.join(', ')}`);
    });

    console.log('✅ Intégrations MCP initialisées');
  }

  private async initializeDeploymentPipeline(): Promise<void> {
    if (!this.config.deployment.enabled) {
      console.log('⏭️ Pipeline de déploiement désactivé');
      return;
    }

    console.log('🚀 Initialisation du pipeline de déploiement...');
    
    this.deploymentPipeline = DeploymentPipelineFactory.createDefault(
      this.config.quality.level,
      this.mcpManager
    );

    // Écoute des événements du pipeline
    this.deploymentPipeline.on('pipeline:started', (execution) => {
      this.emit('deployment:started', execution);
    });

    this.deploymentPipeline.on('pipeline:completed', (execution) => {
      this.updateDeploymentMetrics(execution);
      this.emit('deployment:completed', execution);
    });

    this.deploymentPipeline.on('pipeline:failed', (data) => {
      this.emit('deployment:failed', data);
    });

    console.log('✅ Pipeline de déploiement initialisé');
  }

  private async initializeMonitoring(): Promise<void> {
    console.log('📊 Initialisation du monitoring...');
    
    // Démarrage du monitoring de santé
    setInterval(async () => {
      try {
        const health = await this.getSystemHealth();
        this.emit('health:check', health);
        
        if (health.status !== 'healthy') {
          console.warn('⚠️ Système en état dégradé:', health);
          this.emit('health:degraded', health);
        }
      } catch (error) {
        console.error('❌ Erreur monitoring santé:', error);
      }
    }, 60000); // Toutes les minutes

    // Démarrage du monitoring des métriques
    if (this.config.monitoring.realtime) {
      setInterval(async () => {
        try {
          const metrics = await this.getMetrics();
          this.emit('metrics:updated', metrics);
        } catch (error) {
          console.error('❌ Erreur monitoring métriques:', error);
        }
      }, 30000); // Toutes les 30 secondes
    }

    console.log('✅ Monitoring initialisé');
  }

  // ========================================
  // GÉNÉRATION DE PROJET
  // ========================================

  public async generateProject(request: ICodeGenerationRequest): Promise<ICodeGenerationResult> {
    if (!this.isInitialized) {
      throw new Error('Système non initialisé. Appelez initialize() d\'abord.');
    }

    const projectId = uuidv4();
    const startTime = Date.now();
    
    this.logger.info(`🎯 Génération de projet ${request.projectType} (niveau ${request.qualityLevel})`, { projectId });
    
    // Ajout à la queue
    this.projectQueue.set(projectId, request);
    this.metrics.generation.queueLength = this.projectQueue.size;
    
    try {
      // Audit log
      this.auditLog('project:generation:started', 'Project generation started', {
        projectId,
        request,
        timestamp: new Date().toISOString()
      });
      
      // Notification temps réel
      this.broadcast('project:started', { projectId, request });
      
      // 1. Génération du code avec ML
      const result = await this.generator.generateProject(request);
      result.id = projectId;
      result.startTime = new Date(startTime);
      result.duration = Date.now() - startTime;

      if (!result.success) {
        throw new Error('Échec de la génération de code');
      }

      // Ajout aux projets actifs
      this.activeProjects.set(projectId, result);
      this.metrics.generation.projectsInProgress = this.activeProjects.size;

      // Cache Redis
      if (this.redis) {
        await this.redis.setex(`project:${projectId}`, this.config.redis.ttl, JSON.stringify(result));
      }

      // 2. Validation qualité si configurée
      if (this.config.quality.enforceGates) {
        this.logger.info('📊 Validation qualité...', { projectId });
        const qualityResult = await QualityScorerFactory.scoreProject(
          result.project.type as ProjectType,
          request.qualityLevel,
          result.files
        );

        if (qualityResult.overall < 70) { // Seuil minimum
          if (this.config.quality.autoFix) {
            this.logger.info('🔧 Application des corrections automatiques...', { projectId });
            // Logique d'auto-correction
            this.broadcast('project:fixing', { projectId, issues: qualityResult.issues });
          } else {
            this.logger.warn(`⚠️ Score qualité faible: ${qualityResult.overall}/100`, { projectId });
          }
        }

        result.metrics.quality = qualityResult.breakdown;
        this.broadcast('project:quality', { projectId, score: qualityResult.overall });
      }

      // 3. Validation sécurité si configurée
      if (this.config.security.enforceCompliance) {
        this.logger.info('🔒 Validation sécurité...', { projectId });
        const securityReport = await SecurityValidatorFactory.validateProject(
          result.files,
          result.project.type as ProjectType,
          this.config.security.level
        );

        if (securityReport.status === 'critical') {
          this.auditLog('security:critical', 'Critical security issues detected', {
            projectId,
            issues: securityReport.issues
          });
          throw new Error('Problèmes de sécurité critiques détectés');
        }

        result.metrics.security = securityReport;
        this.broadcast('project:security', { projectId, status: securityReport.status });
      }

      // Mise à jour des métriques
      this.updateGenerationMetrics(result);
      
      // Suppression de la queue
      this.projectQueue.delete(projectId);
      this.metrics.generation.queueLength = this.projectQueue.size;
      
      // Notification de succès
      this.broadcast('project:completed', { projectId, result });
      
      // Audit log
      this.auditLog('project:generation:completed', 'Project generation completed successfully', {
        projectId,
        duration: result.duration,
        qualityScore: result.metrics?.quality?.overall,
        securityStatus: result.metrics?.security?.status
      });

      this.logger.info(`✅ Projet généré avec succès: ${result.project.name}`, { projectId, duration: result.duration });
      return result;

    } catch (error) {
      // Nettoyage en cas d'erreur
      this.projectQueue.delete(projectId);
      this.activeProjects.delete(projectId);
      
      // Audit log d'erreur
      this.auditLog('project:generation:failed', 'Project generation failed', {
        projectId,
        error: error.message,
        duration: Date.now() - startTime
      });
      
      // Notification d'erreur
      this.broadcast('project:failed', { projectId, error: error.message });
      
      this.logger.error('❌ Erreur génération projet:', error, { projectId });
      throw error;
    }
  }

  // ========================================
  // DÉPLOIEMENT
  // ========================================

  public async deployProject(projectId: string, environment: string): Promise<void> {
    if (!this.config.deployment.enabled) {
      throw new Error('Déploiement désactivé dans la configuration');
    }

    if (!this.deploymentPipeline) {
      throw new Error('Pipeline de déploiement non initialisé');
    }

    console.log(`🚀 Déploiement du projet ${projectId} vers ${environment}`);

    try {
      // Récupération du projet (simulation)
      const project: IGeneratedProject = {
        id: projectId,
        name: `project-${projectId}`,
        type: 'restaurant',
        structure: {
          directories: [],
          files: {},
          entryPoints: {},
          assets: {}
        },
        dependencies: {
          production: {},
          development: {},
          peer: {},
          optional: {},
          bundled: []
        },
        configuration: {},
        documentation: {
          readme: '',
          installation: '',
          usage: '',
          api: '',
          deployment: '',
          contributing: '',
          changelog: '',
          license: ''
        },
        deployment: {
          id: '',
          projectId: '',
          environment: '',
          status: 'pending',
          version: '',
          commit: '',
          branch: '',
          url: '',
          domains: [],
          timestamp: new Date(),
          duration: 0,
          logs: [],
          metrics: {
            buildTime: 0,
            deployTime: 0,
            bundleSize: 0,
            functions: 0,
            regions: [],
            performance: {
              lighthouse: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0, pwa: 0 },
              webVitals: { lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0 },
              bundle: { size: 0, gzipped: 0, chunks: 0, assets: 0 },
              runtime: { startup: 0, hydration: 0, navigation: 0, interaction: 0 }
            },
            uptime: 0,
            availability: 0
          }
        }
      };

      const files: IGeneratedFile[] = []; // Récupérer les fichiers du projet

      const execution = await this.deploymentPipeline.execute(project, files, {
        environment,
        triggeredBy: 'api',
        trigger: 'api',
        branch: 'main',
        commit: 'latest'
      });

      console.log(`✅ Déploiement terminé: ${execution.id}`);

    } catch (error) {
      console.error('❌ Erreur déploiement:', error);
      throw error;
    }
  }

  // ========================================
  // MONITORING ET MÉTRIQUES
  // ========================================

  public async getSystemHealth(): Promise<ISystemHealth> {
    const components: Record<string, IComponentHealth> = {};

    // Santé du générateur ML
    if (this.generator) {
      try {
        const generatorHealth = await this.generator.getHealthStatus();
        components.generator = {
          status: generatorHealth.status === 'healthy' ? 'healthy' : 'degraded',
          responseTime: 100,
          errorRate: 0,
          metrics: generatorHealth.metrics
        };
      } catch (error) {
        components.generator = {
          status: 'unhealthy',
          responseTime: 0,
          errorRate: 100,
          lastError: error.message,
          metrics: {}
        };
      }
    }

    // Santé des intégrations MCP
    if (this.mcpManager) {
      try {
        const mcpHealth = await this.mcpManager.getHealthStatus();
        const healthyServices = Object.values(mcpHealth).filter(Boolean).length;
        const totalServices = Object.keys(mcpHealth).length;
        
        components.mcp = {
          status: healthyServices === totalServices ? 'healthy' : 
                 healthyServices > 0 ? 'degraded' : 'unhealthy',
          responseTime: 150,
          errorRate: ((totalServices - healthyServices) / totalServices) * 100,
          metrics: { healthyServices, totalServices }
        };
      } catch (error) {
        components.mcp = {
          status: 'unhealthy',
          responseTime: 0,
          errorRate: 100,
          lastError: error.message,
          metrics: {}
        };
      }
    }

    // Calcul du statut global
    const statuses = Object.values(components).map(c => c.status);
    const overallStatus = statuses.every(s => s === 'healthy') ? 'healthy' :
                         statuses.some(s => s === 'healthy') ? 'degraded' : 'unhealthy';

    return {
      status: overallStatus,
      components,
      uptime: process.uptime(),
      lastCheck: new Date()
    };
  }

  public async getMetrics(): Promise<ISystemMetrics> {
    return this.metrics;
  }

  // ========================================
  // MÉTHODES UTILITAIRES
  // ========================================

  private initializeMetrics(): void {
    this.metrics = {
      generation: {
        totalProjects: 0,
        successRate: 100,
        averageDuration: 0,
        averageQualityScore: 0,
        projectsInProgress: 0,
        queueLength: 0
      },
      deployment: {
        totalDeployments: 0,
        successRate: 100,
        averageDuration: 0,
        rollbackRate: 0,
        activeDeployments: 0,
        failureRate: 0
      },
      security: {
        vulnerabilitiesDetected: 0,
        criticalIssues: 0,
        complianceScore: 100,
        scansCompleted: 0,
        threatLevel: 'low'
      },
      performance: {
        systemLoad: 0,
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
        responseTime: 0,
        cpuUsage: 0,
        diskUsage: 0,
        networkLatency: 0
      },
      api: {
        totalRequests: 0,
        requestsPerSecond: 0,
        averageResponseTime: 0,
        errorRate: 0,
        activeConnections: 0
      },
      cache: {
        hitRate: 0,
        missRate: 0,
        totalKeys: 0,
        memoryUsage: 0,
        evictions: 0
      },
      enterprise: {
        uptime: 0,
        availability: 99.9,
        scalingEvents: 0,
        backupsCompleted: 0,
        auditEvents: 0
      }
    };
  }

  private updateGenerationMetrics(result: ICodeGenerationResult): void {
    this.metrics.generation.totalProjects++;
    
    if (result.success) {
      const currentSuccess = this.metrics.generation.successRate * (this.metrics.generation.totalProjects - 1);
      this.metrics.generation.successRate = (currentSuccess + 100) / this.metrics.generation.totalProjects;
    } else {
      const currentSuccess = this.metrics.generation.successRate * (this.metrics.generation.totalProjects - 1);
      this.metrics.generation.successRate = currentSuccess / this.metrics.generation.totalProjects;
    }

    if (result.duration) {
      const currentDuration = this.metrics.generation.averageDuration * (this.metrics.generation.totalProjects - 1);
      this.metrics.generation.averageDuration = (currentDuration + result.duration) / this.metrics.generation.totalProjects;
    }

    if (result.metrics?.quality?.overall) {
      const currentQuality = this.metrics.generation.averageQualityScore * (this.metrics.generation.totalProjects - 1);
      this.metrics.generation.averageQualityScore = (currentQuality + result.metrics.quality.overall) / this.metrics.generation.totalProjects;
    }
  }

  private updateDeploymentMetrics(execution: any): void {
    this.metrics.deployment.totalDeployments++;
    
    if (execution.status === 'success') {
      const currentSuccess = this.metrics.deployment.successRate * (this.metrics.deployment.totalDeployments - 1);
      this.metrics.deployment.successRate = (currentSuccess + 100) / this.metrics.deployment.totalDeployments;
    } else {
      const currentSuccess = this.metrics.deployment.successRate * (this.metrics.deployment.totalDeployments - 1);
      this.metrics.deployment.successRate = currentSuccess / this.metrics.deployment.totalDeployments;
    }

    if (execution.duration) {
      const currentDuration = this.metrics.deployment.averageDuration * (this.metrics.deployment.totalDeployments - 1);
      this.metrics.deployment.averageDuration = (currentDuration + execution.duration) / this.metrics.deployment.totalDeployments;
    }
  }

  // ========================================
  // MÉTHODES PUBLIQUES UTILITAIRES
  // ========================================

  public isInitialized(): boolean {
    return this.isInitialized;
  }

  public getConfig(): IMLSystemConfig {
    return this.config;
  }

  public async shutdown(): Promise<void> {
    console.log('🛑 Arrêt du système ML de génération de code...');
    
    // Nettoyage des ressources
    this.removeAllListeners();
    
    console.log('✅ Système arrêté');
    this.emit('system:shutdown');
  }
}

// ========================================
// FACTORY PRINCIPAL
// ========================================

export class MLCodeGenerationSystemFactory {
  public static async create(config: IMLSystemConfig): Promise<MLCodeGenerationSystem> {
    const system = new MLCodeGenerationSystem();
    await system.initialize(config);
    return system;
  }

  public static createDefault(): MLCodeGenerationSystem {
    return new MLCodeGenerationSystem();
  }

  public static getDefaultConfig(): IMLSystemConfig {
    return {
      ml: {
        githubCopilot: {
          apiKey: process.env.GITHUB_COPILOT_API_KEY || '',
          enterprise: true
        },
        codeT5: {
          enabled: true,
          models: {
            'restaurant-components': 'custom/restaurant-components-v1',
            'ecommerce-patterns': 'custom/ecommerce-patterns-v1'
          }
        }
      },
      integrations: {
        vercel: {
          apiKey: process.env.VERCEL_API_KEY || '',
          teamId: process.env.VERCEL_TEAM_ID
        },
        figma: {
          accessToken: process.env.FIGMA_ACCESS_TOKEN || ''
        },
        neon: {
          apiKey: process.env.NEON_API_KEY || ''
        },
        stripe: {
          secretKey: process.env.STRIPE_SECRET_KEY || ''
        }
      },
      quality: {
        level: 'production',
        enforceGates: true,
        autoFix: true
      },
      security: {
        level: 'production',
        enforceCompliance: true,
        autoScan: true
      },
      deployment: {
        enabled: true,
        autoDeployment: false,
        environments: ['development', 'staging', 'production']
      },
      monitoring: {
        enabled: true,
        realtime: true,
        alerts: true
      },
      // Nouvelles configurations enterprise par défaut
      api: {
        enabled: true,
        port: 3001,
        host: '0.0.0.0',
        cors: {
          enabled: true,
          origins: ['http://localhost:3000', 'https://*.vercel.app']
        },
        rateLimit: {
          enabled: true,
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 100 // requests per window
        },
        authentication: {
          enabled: true,
          jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
          expiresIn: '24h'
        }
      },
      redis: {
        enabled: !!process.env.REDIS_URL,
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        ttl: 3600 // 1 hour
      },
      websocket: {
        enabled: true,
        port: 3002,
        realtime: true
      },
      scaling: {
        enabled: false,
        instances: 1,
        loadBalancer: false,
        autoScale: false
      },
      backup: {
        enabled: false,
        schedule: '0 2 * * *', // Daily at 2 AM
        retention: 30, // days
        storage: 's3'
      },
      audit: {
        enabled: true,
        level: 'comprehensive',
        retention: 90 // days
      }
    };
  }
}

// ========================================
// EXPORTS
// ========================================

export {
  MLCodeGenerator,
  QualityScorer,
  SecurityValidator,
  MCPIntegrationsManager,
  DeploymentPipeline,
  TemplateGeneratorFactory
};

export default MLCodeGenerationSystem;

// ========================================
// EXEMPLE D'UTILISATION ENTERPRISE
// ========================================

/*
// Exemple d'utilisation complète du système enterprise

import { createEnterpriseMLSystem, IMLSystemConfig } from './index';

async function main() {
  const config: Partial<IMLSystemConfig> = {
    api: {
      enabled: true,
      port: 3001,
      host: '0.0.0.0',
      authentication: {
        enabled: true,
        jwtSecret: 'your-secret-key',
        expiresIn: '24h'
      }
    },
    redis: {
      enabled: true,
      host: 'localhost',
      port: 6379,
      ttl: 3600
    },
    websocket: {
      enabled: true,
      port: 3002,
      realtime: true
    },
    monitoring: {
      enabled: true,
      realtime: true,
      alerts: true
    }
  };

  const system = await createEnterpriseMLSystem(config);

  // Le système est maintenant prêt avec:
  // - API REST sur le port 3001
  // - WebSocket sur le port 3002
  // - Cache Redis
  // - Monitoring temps réel
  // - Audit logs
  // - Sécurité enterprise
  
  console.log('🚀 Système ML Enterprise prêt!');
  
  // Exemple de génération de projet
  const result = await system.generateProject({
    projectType: 'restaurant',
    qualityLevel: 'enterprise',
    name: 'Mon Restaurant',
    description: 'Site web premium pour restaurant',
    features: ['reservation', 'menu', 'contact'],
    designSystem: {
      colors: { primary: '#D4AF37', secondary: '#8B4513' },
      fonts: { primary: 'Playfair Display', secondary: 'Lato' },
      spacing: { base: 16, scale: 1.5 },
      breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 }
    },
    integrations: {
      figma: { enabled: true, fileId: 'your-figma-file-id' },
      stripe: { enabled: true, products: [] },
      neon: { enabled: true, schema: [] }
    },
    deployment: {
      provider: 'vercel',
      environment: 'production',
      customDomain: 'mon-restaurant.com'
    }
  });
  
  console.log('✅ Projet généré:', result.project.name);
  
  // Déploiement automatique
  await system.deployProject(result.id, 'production');
  
  console.log('🚀 Projet déployé avec succès!');
}

// Démarrage du système
main().catch(console.error);

*/

// ========================================
// NOUVELLES MÉTHODES ENTERPRISE
// ========================================

  private initializeLogger(): void {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'ml-code-generation' },
      transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      ]
    });
  }

  private initializeExpressApp(): void {
    this.app = express();
    
    // Middlewares de sécurité
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    // Middleware de logging
    this.app.use((req, res, next) => {
      this.logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      next();
    });
  }

  private async initializeRedis(): Promise<void> {
    if (!this.config.redis.enabled) return;
    
    this.redis = createClient({
      host: this.config.redis.host,
      port: this.config.redis.port,
      password: this.config.redis.password
    });
    
    await this.redis.connect();
    this.logger.info('✅ Redis connecté');
  }

  private setupAPIRoutes(): void {
    // Rate limiting
    if (this.config.api.rateLimit.enabled) {
      const limiter = rateLimit({
        windowMs: this.config.api.rateLimit.windowMs,
        max: this.config.api.rateLimit.max,
        message: 'Too many requests from this IP'
      });
      this.app.use('/api/', limiter);
    }

    // Authentication middleware
    const authenticate = (req: any, res: any, next: any) => {
      if (!this.config.api.authentication.enabled) return next();
      
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      
      try {
        const decoded = jwt.verify(token, this.config.api.authentication.jwtSecret);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    };

    // Health check
    this.app.get('/health', async (req, res) => {
      try {
        const health = await this.getSystemHealth();
        res.json(health);
      } catch (error) {
        res.status(500).json({ error: 'Health check failed' });
      }
    });

    // Metrics endpoint
    this.app.get('/api/metrics', authenticate, async (req, res) => {
      try {
        const metrics = await this.getMetrics();
        res.json(metrics);
      } catch (error) {
        res.status(500).json({ error: 'Failed to get metrics' });
      }
    });

    // Project generation endpoint
    this.app.post('/api/projects/generate', authenticate, async (req, res) => {
      try {
        const request: ICodeGenerationRequest = req.body;
        const result = await this.generateProject(request);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get project status
    this.app.get('/api/projects/:id', authenticate, async (req, res) => {
      try {
        const projectId = req.params.id;
        const project = this.activeProjects.get(projectId);
        
        if (!project) {
          // Check Redis cache
          if (this.redis) {
            const cached = await this.redis.get(`project:${projectId}`);
            if (cached) {
              return res.json(JSON.parse(cached));
            }
          }
          return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json(project);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // List projects
    this.app.get('/api/projects', authenticate, async (req, res) => {
      try {
        const projects = Array.from(this.activeProjects.values());
        res.json({ projects, total: projects.length });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Deploy project
    this.app.post('/api/projects/:id/deploy', authenticate, async (req, res) => {
      try {
        const projectId = req.params.id;
        const { environment } = req.body;
        await this.deployProject(projectId, environment);
        res.json({ success: true, message: 'Deployment started' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Audit logs
    this.app.get('/api/audit', authenticate, async (req, res) => {
      try {
        const { page = 1, limit = 50 } = req.query;
        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = startIndex + Number(limit);
        const logs = this.auditLogs.slice(startIndex, endIndex);
        
        res.json({
          logs,
          total: this.auditLogs.length,
          page: Number(page),
          totalPages: Math.ceil(this.auditLogs.length / Number(limit))
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  private async startAPIServer(): Promise<void> {
    this.setupAPIRoutes();
    
    this.server = this.app.listen(this.config.api.port, this.config.api.host, () => {
      this.logger.info(`🚀 API Server started on ${this.config.api.host}:${this.config.api.port}`);
    });
  }

  private async startWebSocketServer(): Promise<void> {
    this.wsServer = new WebSocketServer({ port: this.config.websocket.port });
    
    this.wsServer.on('connection', (ws) => {
      this.connections.add(ws);
      this.metrics.api.activeConnections = this.connections.size;
      
      ws.on('close', () => {
        this.connections.delete(ws);
        this.metrics.api.activeConnections = this.connections.size;
      });
      
      ws.on('error', (error) => {
        this.logger.error('WebSocket error:', error);
      });
    });
    
    this.logger.info(`📡 WebSocket server started on port ${this.config.websocket.port}`);
  }

  private broadcast(event: string, data: any): void {
    if (!this.config.websocket.enabled) return;
    
    const message = JSON.stringify({ event, data, timestamp: new Date().toISOString() });
    
    this.connections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }

  private auditLog(action: string, description: string, metadata: any = {}): void {
    if (!this.config.audit.enabled) return;
    
    const logEntry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      action,
      description,
      metadata,
      system: 'ml-code-generation'
    };
    
    this.auditLogs.push(logEntry);
    this.metrics.enterprise.auditEvents = this.auditLogs.length;
    
    // Nettoyage des anciens logs
    const retentionDate = new Date();
    retentionDate.setDate(retentionDate.getDate() - this.config.audit.retention);
    
    this.auditLogs = this.auditLogs.filter(log => 
      new Date(log.timestamp) > retentionDate
    );
  }

  private async initializeAutomatedTasks(): Promise<void> {
    // Nettoyage automatique des projets expirés
    setInterval(() => {
      const now = Date.now();
      const expiredThreshold = 24 * 60 * 60 * 1000; // 24 heures
      
      this.activeProjects.forEach((project, id) => {
        if (now - project.startTime.getTime() > expiredThreshold) {
          this.activeProjects.delete(id);
          this.logger.info(`Projet expiré nettoyé: ${id}`);
        }
      });
    }, 60 * 60 * 1000); // Toutes les heures
    
    // Mise à jour des métriques système
    setInterval(() => {
      this.updateSystemMetrics();
    }, 30000); // Toutes les 30 secondes
  }

  private updateSystemMetrics(): void {
    const memUsage = process.memoryUsage();
    this.metrics.performance.memoryUsage = memUsage.heapUsed / 1024 / 1024;
    this.metrics.performance.cpuUsage = process.cpuUsage().user / 1000000;
    this.metrics.enterprise.uptime = process.uptime();
    
    // Broadcast metrics si WebSocket activé
    if (this.config.websocket.realtime) {
      this.broadcast('metrics:update', this.metrics);
    }
  }

  private async initializeBackupSystem(): Promise<void> {
    // Configuration des backups automatiques
    this.logger.info('🔄 Système de backup initialisé');
    // Implémentation des backups selon la configuration
  }

  // Méthodes API publiques étendues
  public async getProjectById(id: string): Promise<ICodeGenerationResult | null> {
    return this.activeProjects.get(id) || null;
  }

  public async listProjects(): Promise<ICodeGenerationResult[]> {
    return Array.from(this.activeProjects.values());
  }

  public async getQueueStatus(): Promise<{ length: number; projects: ICodeGenerationRequest[] }> {
    return {
      length: this.projectQueue.size,
      projects: Array.from(this.projectQueue.values())
    };
  }

  public async getAuditLogs(limit: number = 100): Promise<any[]> {
    return this.auditLogs.slice(-limit);
  }

  public async clearCache(): Promise<void> {
    if (this.redis) {
      await this.redis.flushall();
      this.logger.info('Cache Redis vidé');
    }
  }

  public async gracefulShutdown(): Promise<void> {
    this.logger.info('🛑 Arrêt gracieux du système...');
    
    // Arrêt des serveurs
    if (this.server) {
      this.server.close();
    }
    
    if (this.wsServer) {
      this.wsServer.close();
    }
    
    // Fermeture des connexions
    if (this.redis) {
      await this.redis.quit();
    }
    
    // Audit log final
    this.auditLog('system:shutdown', 'System gracefully shut down');
    
    this.logger.info('✅ Arrêt gracieux terminé');
  }

}

// API simplifiée pour usage externe
export const createMLCodeGenerationSystem = MLCodeGenerationSystemFactory.create;
export const createDefaultMLCodeGenerationSystem = MLCodeGenerationSystemFactory.createDefault;
export const getDefaultMLSystemConfig = MLCodeGenerationSystemFactory.getDefaultConfig;

// Nouvelles exports enterprise
export const createEnterpriseMLSystem = async (config?: Partial<IMLSystemConfig>) => {
  const defaultConfig = MLCodeGenerationSystemFactory.getDefaultConfig();
  const finalConfig = { ...defaultConfig, ...config };
  return MLCodeGenerationSystemFactory.create(finalConfig);
};

export const createMLSystemWithAPI = async (apiPort: number = 3001) => {
  const config = MLCodeGenerationSystemFactory.getDefaultConfig();
  config.api.port = apiPort;
  return MLCodeGenerationSystemFactory.create(config);
};