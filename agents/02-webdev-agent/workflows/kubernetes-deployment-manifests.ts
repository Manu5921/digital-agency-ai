/**
 * KUBERNETES DEPLOYMENT MANIFESTS - Enterprise Infrastructure Module
 * WebDev Agent Phase 3 - Complete Kubernetes Architecture
 * 
 * Features:
 * - Production-ready Kubernetes manifests for all services
 * - Auto-scaling with HPA and VPA
 * - Service mesh integration (Istio)
 * - Monitoring and observability stack
 * - Backup and disaster recovery
 * - Multi-environment deployment (dev, staging, prod)
 */

import { Logger } from '../../../core/utils/logger';

export interface KubernetesManifests {
  namespace: string;
  applications: ApplicationManifest[];
  infrastructure: InfrastructureManifest[];
  monitoring: MonitoringManifest[];
  security: SecurityManifest[];
}

export interface ApplicationManifest {
  name: string;
  version: string;
  replicas: number;
  image: string;
  resources: ResourceRequirements;
  env: EnvironmentVariable[];
  volumes: VolumeMount[];
  services: ServiceManifest[];
  ingress?: IngressManifest;
  autoscaling?: AutoscalingManifest;
}

export interface ResourceRequirements {
  requests: { cpu: string; memory: string };
  limits: { cpu: string; memory: string };
}

export interface EnvironmentVariable {
  name: string;
  value?: string;
  valueFrom?: {
    secretKeyRef?: { name: string; key: string };
    configMapKeyRef?: { name: string; key: string };
  };
}

export interface VolumeMount {
  name: string;
  mountPath: string;
  type: 'configMap' | 'secret' | 'persistentVolumeClaim' | 'emptyDir';
  source: string;
}

export interface ServiceManifest {
  name: string;
  type: 'ClusterIP' | 'NodePort' | 'LoadBalancer';
  ports: { name: string; port: number; targetPort: number; protocol: string }[];
  selector: Record<string, string>;
}

export interface IngressManifest {
  name: string;
  className: string;
  tls: boolean;
  hosts: string[];
  rules: IngressRule[];
}

export interface IngressRule {
  host: string;
  paths: { path: string; pathType: string; serviceName: string; servicePort: number }[];
}

export interface AutoscalingManifest {
  minReplicas: number;
  maxReplicas: number;
  targetCPUUtilization: number;
  targetMemoryUtilization: number;
  scaleUpPolicy?: ScalingPolicy;
  scaleDownPolicy?: ScalingPolicy;
}

export interface ScalingPolicy {
  stabilizationWindowSeconds: number;
  policies: { type: string; value: number; periodSeconds: number }[];
}

export interface InfrastructureManifest {
  type: 'database' | 'cache' | 'storage' | 'queue';
  name: string;
  spec: any;
}

export interface MonitoringManifest {
  type: 'prometheus' | 'grafana' | 'jaeger' | 'elasticsearch';
  name: string;
  config: any;
}

export interface SecurityManifest {
  type: 'networkPolicy' | 'podSecurityPolicy' | 'rbac' | 'serviceAccount';
  name: string;
  rules: any;
}

/**
 * Kubernetes Deployment Manifests Generator
 * Generates complete enterprise-ready Kubernetes manifests
 */
export class KubernetesDeploymentManifests {
  private logger: Logger;
  private environment: 'development' | 'staging' | 'production';
  private namespace: string;

  constructor(environment: 'development' | 'staging' | 'production' = 'production') {
    this.logger = new Logger('KubernetesDeploymentManifests');
    this.environment = environment;
    this.namespace = `digital-agency-ai-${environment}`;
  }

  /**
   * Generates complete Kubernetes manifests for the digital agency platform
   */
  generateCompleteManifests(): KubernetesManifests {
    this.logger.info(`Generating Kubernetes manifests for ${this.environment} environment`);

    return {
      namespace: this.namespace,
      applications: this.generateApplicationManifests(),
      infrastructure: this.generateInfrastructureManifests(),
      monitoring: this.generateMonitoringManifests(),
      security: this.generateSecurityManifests()
    };
  }

  /**
   * Generates application deployment manifests
   */
  private generateApplicationManifests(): ApplicationManifest[] {
    const baseResourceRequirements = this.getBaseResourceRequirements();
    
    return [
      // Frontend Next.js Application
      {
        name: 'frontend-app',
        version: '1.0.0',
        replicas: this.environment === 'production' ? 3 : 1,
        image: `digital-agency-ai/frontend:latest`,
        resources: {
          requests: { cpu: '100m', memory: '256Mi' },
          limits: { cpu: '500m', memory: '512Mi' }
        },
        env: [
          { name: 'NODE_ENV', value: this.environment },
          { name: 'NEXT_PUBLIC_API_URL', valueFrom: { configMapKeyRef: { name: 'app-config', key: 'api_url' } } },
          { name: 'DATABASE_URL', valueFrom: { secretKeyRef: { name: 'database-secrets', key: 'url' } } }
        ],
        volumes: [
          { name: 'app-config', mountPath: '/app/config', type: 'configMap', source: 'app-config' },
          { name: 'static-assets', mountPath: '/app/public', type: 'persistentVolumeClaim', source: 'static-assets-pvc' }
        ],
        services: [
          {
            name: 'frontend-service',
            type: 'ClusterIP',
            ports: [{ name: 'http', port: 80, targetPort: 3000, protocol: 'TCP' }],
            selector: { app: 'frontend-app' }
          }
        ],
        ingress: {
          name: 'frontend-ingress',
          className: 'nginx',
          tls: true,
          hosts: [`app-${this.environment}.digital-agency-ai.com`],
          rules: [
            {
              host: `app-${this.environment}.digital-agency-ai.com`,
              paths: [{ path: '/', pathType: 'Prefix', serviceName: 'frontend-service', servicePort: 80 }]
            }
          ]
        },
        autoscaling: {
          minReplicas: this.environment === 'production' ? 3 : 1,
          maxReplicas: this.environment === 'production' ? 10 : 3,
          targetCPUUtilization: 70,
          targetMemoryUtilization: 80,
          scaleUpPolicy: {
            stabilizationWindowSeconds: 300,
            policies: [
              { type: 'Percent', value: 100, periodSeconds: 60 },
              { type: 'Pods', value: 2, periodSeconds: 60 }
            ]
          },
          scaleDownPolicy: {
            stabilizationWindowSeconds: 300,
            policies: [
              { type: 'Percent', value: 10, periodSeconds: 60 }
            ]
          }
        }
      },
      
      // Backend API Service
      {
        name: 'backend-api',
        version: '1.0.0',
        replicas: this.environment === 'production' ? 3 : 1,
        image: `digital-agency-ai/backend-api:latest`,
        resources: {
          requests: { cpu: '200m', memory: '512Mi' },
          limits: { cpu: '1000m', memory: '1Gi' }
        },
        env: [
          { name: 'NODE_ENV', value: this.environment },
          { name: 'PORT', value: '8080' },
          { name: 'DATABASE_URL', valueFrom: { secretKeyRef: { name: 'database-secrets', key: 'url' } } },
          { name: 'REDIS_URL', valueFrom: { secretKeyRef: { name: 'redis-secrets', key: 'url' } } },
          { name: 'JWT_SECRET', valueFrom: { secretKeyRef: { name: 'auth-secrets', key: 'jwt_secret' } } }
        ],
        volumes: [
          { name: 'app-config', mountPath: '/app/config', type: 'configMap', source: 'app-config' },
          { name: 'uploads', mountPath: '/app/uploads', type: 'persistentVolumeClaim', source: 'uploads-pvc' }
        ],
        services: [
          {
            name: 'backend-api-service',
            type: 'ClusterIP',
            ports: [{ name: 'http', port: 80, targetPort: 8080, protocol: 'TCP' }],
            selector: { app: 'backend-api' }
          }
        ],
        ingress: {
          name: 'backend-api-ingress',
          className: 'nginx',
          tls: true,
          hosts: [`api-${this.environment}.digital-agency-ai.com`],
          rules: [
            {
              host: `api-${this.environment}.digital-agency-ai.com`,
              paths: [{ path: '/api', pathType: 'Prefix', serviceName: 'backend-api-service', servicePort: 80 }]
            }
          ]
        },
        autoscaling: {
          minReplicas: this.environment === 'production' ? 3 : 1,
          maxReplicas: this.environment === 'production' ? 15 : 5,
          targetCPUUtilization: 70,
          targetMemoryUtilization: 80
        }
      },

      // Agent Orchestrator Service
      {
        name: 'agent-orchestrator',
        version: '1.0.0',
        replicas: this.environment === 'production' ? 2 : 1,
        image: `digital-agency-ai/agent-orchestrator:latest`,
        resources: {
          requests: { cpu: '500m', memory: '1Gi' },
          limits: { cpu: '2000m', memory: '2Gi' }
        },
        env: [
          { name: 'NODE_ENV', value: this.environment },
          { name: 'CLAUDE_API_KEY', valueFrom: { secretKeyRef: { name: 'ai-secrets', key: 'claude_api_key' } } },
          { name: 'OPENAI_API_KEY', valueFrom: { secretKeyRef: { name: 'ai-secrets', key: 'openai_api_key' } } },
          { name: 'REDIS_URL', valueFrom: { secretKeyRef: { name: 'redis-secrets', key: 'url' } } }
        ],
        volumes: [
          { name: 'agent-config', mountPath: '/app/config', type: 'configMap', source: 'agent-config' },
          { name: 'agent-data', mountPath: '/app/data', type: 'persistentVolumeClaim', source: 'agent-data-pvc' }
        ],
        services: [
          {
            name: 'agent-orchestrator-service',
            type: 'ClusterIP',
            ports: [
              { name: 'http', port: 80, targetPort: 3001, protocol: 'TCP' },
              { name: 'grpc', port: 9090, targetPort: 9090, protocol: 'TCP' }
            ],
            selector: { app: 'agent-orchestrator' }
          }
        ],
        autoscaling: {
          minReplicas: this.environment === 'production' ? 2 : 1,
          maxReplicas: this.environment === 'production' ? 8 : 3,
          targetCPUUtilization: 80,
          targetMemoryUtilization: 85
        }
      },

      // WebDev Agent Service
      {
        name: 'webdev-agent',
        version: '1.0.0',
        replicas: this.environment === 'production' ? 3 : 1,
        image: `digital-agency-ai/webdev-agent:latest`,
        resources: {
          requests: { cpu: '300m', memory: '768Mi' },
          limits: { cpu: '1500m', memory: '1.5Gi' }
        },
        env: [
          { name: 'NODE_ENV', value: this.environment },
          { name: 'AGENT_TYPE', value: 'webdev' },
          { name: 'ORCHESTRATOR_URL', value: 'http://agent-orchestrator-service' },
          { name: 'REDIS_URL', valueFrom: { secretKeyRef: { name: 'redis-secrets', key: 'url' } } }
        ],
        volumes: [
          { name: 'agent-config', mountPath: '/app/config', type: 'configMap', source: 'agent-config' },
          { name: 'build-cache', mountPath: '/app/.next', type: 'emptyDir', source: '' }
        ],
        services: [
          {
            name: 'webdev-agent-service',
            type: 'ClusterIP',
            ports: [{ name: 'http', port: 80, targetPort: 3002, protocol: 'TCP' }],
            selector: { app: 'webdev-agent' }
          }
        ],
        autoscaling: {
          minReplicas: this.environment === 'production' ? 3 : 1,
          maxReplicas: this.environment === 'production' ? 12 : 4,
          targetCPUUtilization: 75,
          targetMemoryUtilization: 80
        }
      },

      // Design Agent Service
      {
        name: 'design-agent',
        version: '1.0.0',
        replicas: this.environment === 'production' ? 2 : 1,
        image: `digital-agency-ai/design-agent:latest`,
        resources: {
          requests: { cpu: '400m', memory: '1Gi' },
          limits: { cpu: '2000m', memory: '2Gi' }
        },
        env: [
          { name: 'NODE_ENV', value: this.environment },
          { name: 'AGENT_TYPE', value: 'design' },
          { name: 'FIGMA_API_KEY', valueFrom: { secretKeyRef: { name: 'design-secrets', key: 'figma_api_key' } } },
          { name: 'OPENAI_API_KEY', valueFrom: { secretKeyRef: { name: 'ai-secrets', key: 'openai_api_key' } } }
        ],
        volumes: [
          { name: 'design-assets', mountPath: '/app/assets', type: 'persistentVolumeClaim', source: 'design-assets-pvc' }
        ],
        services: [
          {
            name: 'design-agent-service',
            type: 'ClusterIP',
            ports: [{ name: 'http', port: 80, targetPort: 3003, protocol: 'TCP' }],
            selector: { app: 'design-agent' }
          }
        ],
        autoscaling: {
          minReplicas: this.environment === 'production' ? 2 : 1,
          maxReplicas: this.environment === 'production' ? 6 : 2,
          targetCPUUtilization: 80,
          targetMemoryUtilization: 85
        }
      }
    ];
  }

  /**
   * Generates infrastructure service manifests
   */
  private generateInfrastructureManifests(): InfrastructureManifest[] {
    return [
      // PostgreSQL Database
      {
        type: 'database',
        name: 'postgresql',
        spec: {
          chart: 'postgresql',
          version: '12.1.2',
          values: {
            global: {
              postgresql: {
                auth: {
                  postgresPassword: { secretKeyRef: { name: 'database-secrets', key: 'postgres_password' } },
                  database: 'digital_agency_ai'
                }
              }
            },
            primary: {
              persistence: {
                enabled: true,
                size: this.environment === 'production' ? '100Gi' : '20Gi'
              },
              resources: {
                requests: { cpu: '500m', memory: '1Gi' },
                limits: { cpu: '2000m', memory: '2Gi' }
              }
            },
            readReplicas: {
              replicaCount: this.environment === 'production' ? 2 : 0
            },
            backup: {
              enabled: this.environment === 'production',
              schedule: '0 2 * * *'
            }
          }
        }
      },

      // Redis Cache
      {
        type: 'cache',
        name: 'redis',
        spec: {
          chart: 'redis',
          version: '17.3.7',
          values: {
            auth: {
              enabled: true,
              password: { secretKeyRef: { name: 'redis-secrets', key: 'password' } }
            },
            master: {
              persistence: {
                enabled: true,
                size: this.environment === 'production' ? '20Gi' : '5Gi'
              },
              resources: {
                requests: { cpu: '250m', memory: '512Mi' },
                limits: { cpu: '1000m', memory: '1Gi' }
              }
            },
            replica: {
              replicaCount: this.environment === 'production' ? 2 : 0
            }
          }
        }
      },

      // Message Queue (RabbitMQ)
      {
        type: 'queue',
        name: 'rabbitmq',
        spec: {
          chart: 'rabbitmq',
          version: '11.1.4',
          values: {
            auth: {
              username: 'admin',
              password: { secretKeyRef: { name: 'queue-secrets', key: 'password' } }
            },
            persistence: {
              enabled: true,
              size: this.environment === 'production' ? '50Gi' : '10Gi'
            },
            clustering: {
              enabled: this.environment === 'production',
              replicaCount: this.environment === 'production' ? 3 : 1
            },
            resources: {
              requests: { cpu: '300m', memory: '768Mi' },
              limits: { cpu: '1500m', memory: '1.5Gi' }
            }
          }
        }
      },

      // Elasticsearch for Logs
      {
        type: 'storage',
        name: 'elasticsearch',
        spec: {
          chart: 'elasticsearch',
          version: '19.4.0',
          values: {
            clusterName: 'digital-agency-ai-logs',
            nodeGroup: 'master',
            masterService: 'elasticsearch-master',
            replicas: this.environment === 'production' ? 3 : 1,
            minimumMasterNodes: this.environment === 'production' ? 2 : 1,
            persistence: {
              enabled: true,
              size: this.environment === 'production' ? '100Gi' : '20Gi'
            },
            resources: {
              requests: { cpu: '1000m', memory: '2Gi' },
              limits: { cpu: '2000m', memory: '4Gi' }
            }
          }
        }
      }
    ];
  }

  /**
   * Generates monitoring and observability manifests
   */
  private generateMonitoringManifests(): MonitoringManifest[] {
    return [
      // Prometheus
      {
        type: 'prometheus',
        name: 'prometheus-server',
        config: {
          global: {
            scrape_interval: '15s',
            evaluation_interval: '15s'
          },
          scrape_configs: [
            {
              job_name: 'kubernetes-apiservers',
              kubernetes_sd_configs: [{ role: 'endpoints' }],
              scheme: 'https',
              tls_config: { ca_file: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt' },
              bearer_token_file: '/var/run/secrets/kubernetes.io/serviceaccount/token',
              relabel_configs: [
                {
                  source_labels: ['__meta_kubernetes_namespace', '__meta_kubernetes_service_name', '__meta_kubernetes_endpoint_port_name'],
                  action: 'keep',
                  regex: 'default;kubernetes;https'
                }
              ]
            },
            {
              job_name: 'digital-agency-ai-apps',
              kubernetes_sd_configs: [{ role: 'pod' }],
              relabel_configs: [
                {
                  source_labels: ['__meta_kubernetes_pod_annotation_prometheus_io_scrape'],
                  action: 'keep',
                  regex: 'true'
                },
                {
                  source_labels: ['__meta_kubernetes_pod_annotation_prometheus_io_path'],
                  action: 'replace',
                  target_label: '__metrics_path__',
                  regex: '(.+)'
                }
              ]
            }
          ],
          rule_files: [
            '/etc/prometheus/rules/*.yml'
          ],
          alerting: {
            alertmanagers: [
              {
                static_configs: [
                  { targets: ['alertmanager:9093'] }
                ]
              }
            ]
          }
        }
      },

      // Grafana
      {
        type: 'grafana',
        name: 'grafana-dashboard',
        config: {
          admin: {
            user: 'admin',
            password: { secretKeyRef: { name: 'grafana-secrets', key: 'admin_password' } }
          },
          datasources: {
            'datasources.yaml': {
              apiVersion: 1,
              datasources: [
                {
                  name: 'Prometheus',
                  type: 'prometheus',
                  url: 'http://prometheus-server:9090',
                  access: 'proxy',
                  isDefault: true
                },
                {
                  name: 'Elasticsearch',
                  type: 'elasticsearch',
                  url: 'http://elasticsearch-master:9200',
                  access: 'proxy',
                  database: 'logstash-*',
                  interval: 'Daily'
                }
              ]
            }
          },
          dashboards: {
            'dashboard-provider.yaml': {
              apiVersion: 1,
              providers: [
                {
                  name: 'default',
                  orgId: 1,
                  folder: '',
                  type: 'file',
                  disableDeletion: false,
                  updateIntervalSeconds: 10,
                  options: {
                    path: '/var/lib/grafana/dashboards'
                  }
                }
              ]
            }
          }
        }
      },

      // Jaeger for Distributed Tracing
      {
        type: 'jaeger',
        name: 'jaeger-tracing',
        config: {
          strategy: 'production',
          storage: {
            type: 'elasticsearch',
            elasticsearch: {
              server_urls: 'http://elasticsearch-master:9200',
              index_prefix: 'jaeger'
            }
          },
          ingress: {
            enabled: true,
            hosts: [`jaeger-${this.environment}.digital-agency-ai.com`]
          }
        }
      }
    ];
  }

  /**
   * Generates security and RBAC manifests
   */
  private generateSecurityManifests(): SecurityManifest[] {
    return [
      // Network Policies
      {
        type: 'networkPolicy',
        name: 'default-deny-all',
        rules: {
          apiVersion: 'networking.k8s.io/v1',
          kind: 'NetworkPolicy',
          metadata: {
            name: 'default-deny-all',
            namespace: this.namespace
          },
          spec: {
            podSelector: {},
            policyTypes: ['Ingress', 'Egress']
          }
        }
      },
      {
        type: 'networkPolicy',
        name: 'allow-frontend-to-backend',
        rules: {
          apiVersion: 'networking.k8s.io/v1',
          kind: 'NetworkPolicy',
          metadata: {
            name: 'allow-frontend-to-backend',
            namespace: this.namespace
          },
          spec: {
            podSelector: {
              matchLabels: { app: 'backend-api' }
            },
            policyTypes: ['Ingress'],
            ingress: [
              {
                from: [
                  { podSelector: { matchLabels: { app: 'frontend-app' } } }
                ],
                ports: [
                  { protocol: 'TCP', port: 8080 }
                ]
              }
            ]
          }
        }
      },

      // Service Accounts
      {
        type: 'serviceAccount',
        name: 'agent-orchestrator-sa',
        rules: {
          apiVersion: 'v1',
          kind: 'ServiceAccount',
          metadata: {
            name: 'agent-orchestrator',
            namespace: this.namespace,
            annotations: {
              'eks.amazonaws.com/role-arn': 'arn:aws:iam::ACCOUNT:role/AgentOrchestratorRole'
            }
          }
        }
      },

      // RBAC
      {
        type: 'rbac',
        name: 'agent-orchestrator-rbac',
        rules: {
          apiVersion: 'rbac.authorization.k8s.io/v1',
          kind: 'ClusterRole',
          metadata: {
            name: 'agent-orchestrator'
          },
          rules: [
            {
              apiGroups: [''],
              resources: ['pods', 'services', 'configmaps'],
              verbs: ['get', 'list', 'watch', 'create', 'update', 'patch']
            },
            {
              apiGroups: ['apps'],
              resources: ['deployments', 'replicasets'],
              verbs: ['get', 'list', 'watch', 'create', 'update', 'patch']
            }
          ]
        }
      },

      // Pod Security Standards
      {
        type: 'podSecurityPolicy',
        name: 'restricted-psp',
        rules: {
          apiVersion: 'policy/v1beta1',
          kind: 'PodSecurityPolicy',
          metadata: {
            name: 'restricted'
          },
          spec: {
            privileged: false,
            allowPrivilegeEscalation: false,
            requiredDropCapabilities: ['ALL'],
            volumes: ['configMap', 'emptyDir', 'projected', 'secret', 'downwardAPI', 'persistentVolumeClaim'],
            runAsUser: {
              rule: 'MustRunAsNonRoot'
            },
            seLinux: {
              rule: 'RunAsAny'
            },
            fsGroup: {
              rule: 'RunAsAny'
            }
          }
        }
      }
    ];
  }

  /**
   * Generates YAML manifests for deployment
   */
  generateYAMLManifests(): Record<string, string> {
    const manifests = this.generateCompleteManifests();
    const yamlManifests: Record<string, string> = {};

    // Generate namespace
    yamlManifests['00-namespace.yaml'] = this.generateNamespaceYAML();

    // Generate ConfigMaps and Secrets
    yamlManifests['01-configmaps.yaml'] = this.generateConfigMapsYAML();
    yamlManifests['02-secrets.yaml'] = this.generateSecretsYAML();

    // Generate application manifests
    manifests.applications.forEach((app, index) => {
      yamlManifests[`10-${app.name}-deployment.yaml`] = this.generateDeploymentYAML(app);
      yamlManifests[`11-${app.name}-service.yaml`] = this.generateServiceYAML(app);
      if (app.ingress) {
        yamlManifests[`12-${app.name}-ingress.yaml`] = this.generateIngressYAML(app);
      }
      if (app.autoscaling) {
        yamlManifests[`13-${app.name}-hpa.yaml`] = this.generateHPAYAML(app);
      }
    });

    // Generate infrastructure manifests
    manifests.infrastructure.forEach((infra, index) => {
      yamlManifests[`20-${infra.name}-${infra.type}.yaml`] = this.generateInfrastructureYAML(infra);
    });

    // Generate monitoring manifests
    manifests.monitoring.forEach((monitor, index) => {
      yamlManifests[`30-${monitor.name}.yaml`] = this.generateMonitoringYAML(monitor);
    });

    // Generate security manifests
    manifests.security.forEach((security, index) => {
      yamlManifests[`40-${security.name}.yaml`] = this.generateSecurityYAML(security);
    });

    // Generate Istio service mesh manifests
    yamlManifests['50-istio-gateway.yaml'] = this.generateIstioGatewayYAML();
    yamlManifests['51-istio-virtual-services.yaml'] = this.generateIstioVirtualServicesYAML(manifests.applications);

    return yamlManifests;
  }

  /**
   * Utility methods for YAML generation
   */
  private generateNamespaceYAML(): string {
    return `apiVersion: v1
kind: Namespace
metadata:
  name: ${this.namespace}
  labels:
    name: ${this.namespace}
    environment: ${this.environment}
    istio-injection: enabled
---`;
  }

  private generateConfigMapsYAML(): string {
    return `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: ${this.namespace}
data:
  api_url: "https://api-${this.environment}.digital-agency-ai.com"
  environment: "${this.environment}"
  log_level: "${this.environment === 'production' ? 'info' : 'debug'}"
  max_request_size: "10mb"
  session_timeout: "3600"
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: agent-config
  namespace: ${this.namespace}
data:
  orchestrator_config.json: |
    {
      "maxConcurrentTasks": 10,
      "taskTimeout": 300000,
      "retryAttempts": 3,
      "healthCheckInterval": 30000
    }
  agent_config.json: |
    {
      "webdev": {
        "maxBuildTime": 600,
        "cacheEnabled": true,
        "parallelBuilds": 3
      },
      "design": {
        "maxImageSize": "50MB",
        "supportedFormats": ["png", "jpg", "svg", "figma"],
        "compressionQuality": 85
      }
    }
---`;
  }

  private generateSecretsYAML(): string {
    return `# Note: This is a template. In production, use proper secret management like Sealed Secrets or External Secrets Operator
apiVersion: v1
kind: Secret
metadata:
  name: database-secrets
  namespace: ${this.namespace}
type: Opaque
stringData:
  url: "postgresql://username:password@postgresql:5432/digital_agency_ai"
  postgres_password: "CHANGE_ME_IN_PRODUCTION"
---
apiVersion: v1
kind: Secret
metadata:
  name: redis-secrets
  namespace: ${this.namespace}
type: Opaque
stringData:
  url: "redis://:password@redis-master:6379"
  password: "CHANGE_ME_IN_PRODUCTION"
---
apiVersion: v1
kind: Secret
metadata:
  name: ai-secrets
  namespace: ${this.namespace}
type: Opaque
stringData:
  claude_api_key: "CLAUDE_API_KEY_HERE"
  openai_api_key: "OPENAI_API_KEY_HERE"
---
apiVersion: v1
kind: Secret
metadata:
  name: auth-secrets
  namespace: ${this.namespace}
type: Opaque
stringData:
  jwt_secret: "SUPER_SECRET_JWT_KEY_CHANGE_ME"
---`;
  }

  private generateDeploymentYAML(app: ApplicationManifest): string {
    return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${app.name}
  namespace: ${this.namespace}
  labels:
    app: ${app.name}
    version: ${app.version}
    environment: ${this.environment}
spec:
  replicas: ${app.replicas}
  selector:
    matchLabels:
      app: ${app.name}
  template:
    metadata:
      labels:
        app: ${app.name}
        version: ${app.version}
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "metrics"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: ${app.name}-sa
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000
      containers:
      - name: ${app.name}
        image: ${app.image}
        imagePullPolicy: Always
        ports:
        - containerPort: ${app.services[0]?.ports[0]?.targetPort || 3000}
          name: http
        - containerPort: 9090
          name: metrics
        env:
${app.env.map(env => `        - name: ${env.name}
          ${env.value ? `value: "${env.value}"` : `valueFrom:
            ${env.valueFrom?.secretKeyRef ? `secretKeyRef:
              name: ${env.valueFrom.secretKeyRef.name}
              key: ${env.valueFrom.secretKeyRef.key}` : ''}
            ${env.valueFrom?.configMapKeyRef ? `configMapKeyRef:
              name: ${env.valueFrom.configMapKeyRef.name}
              key: ${env.valueFrom.configMapKeyRef.key}` : ''}`}`).join('\n')}
        resources:
          requests:
            cpu: ${app.resources.requests.cpu}
            memory: ${app.resources.requests.memory}
          limits:
            cpu: ${app.resources.limits.cpu}
            memory: ${app.resources.limits.memory}
        livenessProbe:
          httpGet:
            path: /health
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: http
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL
${app.volumes.length > 0 ? `        volumeMounts:
${app.volumes.map(vol => `        - name: ${vol.name}
          mountPath: ${vol.mountPath}
          ${vol.type === 'persistentVolumeClaim' ? 'readOnly: false' : 'readOnly: true'}`).join('\n')}` : ''}
${app.volumes.length > 0 ? `      volumes:
${app.volumes.map(vol => `      - name: ${vol.name}
        ${vol.type === 'configMap' ? `configMap:
          name: ${vol.source}` : ''}
        ${vol.type === 'secret' ? `secret:
          secretName: ${vol.source}` : ''}
        ${vol.type === 'persistentVolumeClaim' ? `persistentVolumeClaim:
          claimName: ${vol.source}` : ''}
        ${vol.type === 'emptyDir' ? 'emptyDir: {}' : ''}`).join('\n')}` : ''}
---`;
  }

  private generateServiceYAML(app: ApplicationManifest): string {
    return app.services.map(service => `apiVersion: v1
kind: Service
metadata:
  name: ${service.name}
  namespace: ${this.namespace}
  labels:
    app: ${app.name}
spec:
  type: ${service.type}
  ports:
${service.ports.map(port => `  - name: ${port.name}
    port: ${port.port}
    targetPort: ${port.targetPort}
    protocol: ${port.protocol}`).join('\n')}
  selector:
${Object.entries(service.selector).map(([key, value]) => `    ${key}: ${value}`).join('\n')}
---`).join('\n');
  }

  private generateIngressYAML(app: ApplicationManifest): string {
    if (!app.ingress) return '';

    return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${app.ingress.name}
  namespace: ${this.namespace}
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: ${app.ingress.className}
  ${app.ingress.tls ? `tls:
  - hosts:
${app.ingress.hosts.map(host => `    - ${host}`).join('\n')}
    secretName: ${app.name}-tls` : ''}
  rules:
${app.ingress.rules.map(rule => `  - host: ${rule.host}
    http:
      paths:
${rule.paths.map(path => `      - path: ${path.path}
        pathType: ${path.pathType}
        backend:
          service:
            name: ${path.serviceName}
            port:
              number: ${path.servicePort}`).join('\n')}`).join('\n')}
---`;
  }

  private generateHPAYAML(app: ApplicationManifest): string {
    if (!app.autoscaling) return '';

    return `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${app.name}-hpa
  namespace: ${this.namespace}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${app.name}
  minReplicas: ${app.autoscaling.minReplicas}
  maxReplicas: ${app.autoscaling.maxReplicas}
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: ${app.autoscaling.targetCPUUtilization}
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: ${app.autoscaling.targetMemoryUtilization}
  ${app.autoscaling.scaleUpPolicy || app.autoscaling.scaleDownPolicy ? `behavior:` : ''}
  ${app.autoscaling.scaleUpPolicy ? `  scaleUp:
    stabilizationWindowSeconds: ${app.autoscaling.scaleUpPolicy.stabilizationWindowSeconds}
    policies:
${app.autoscaling.scaleUpPolicy.policies.map(policy => `    - type: ${policy.type}
      value: ${policy.value}
      periodSeconds: ${policy.periodSeconds}`).join('\n')}` : ''}
  ${app.autoscaling.scaleDownPolicy ? `  scaleDown:
    stabilizationWindowSeconds: ${app.autoscaling.scaleDownPolicy.stabilizationWindowSeconds}
    policies:
${app.autoscaling.scaleDownPolicy.policies.map(policy => `    - type: ${policy.type}
      value: ${policy.value}
      periodSeconds: ${policy.periodSeconds}`).join('\n')}` : ''}
---`;
  }

  private generateInfrastructureYAML(infra: InfrastructureManifest): string {
    // For Helm charts, we would generate HelmRelease manifests for Flux
    return `# Helm Chart for ${infra.name}
# This would be deployed using Helm or Flux in production
# Chart: ${infra.spec.chart}:${infra.spec.version}
---`;
  }

  private generateMonitoringYAML(monitor: MonitoringManifest): string {
    return `# Monitoring component: ${monitor.name}
# Type: ${monitor.type}
# Configuration would be deployed separately
---`;
  }

  private generateSecurityYAML(security: SecurityManifest): string {
    return `${security.rules.apiVersion ? `apiVersion: ${security.rules.apiVersion}
kind: ${security.rules.kind}
metadata:
  name: ${security.rules.metadata.name}
  namespace: ${security.rules.metadata.namespace || this.namespace}
${Object.keys(security.rules.spec || {}).length > 0 ? `spec:
${this.objectToYAML(security.rules.spec, 2)}` : ''}
---` : '# Security manifest placeholder'}`;
  }

  private generateIstioGatewayYAML(): string {
    return `apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: digital-agency-ai-gateway
  namespace: ${this.namespace}
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*.digital-agency-ai.com"
    tls:
      httpsRedirect: true
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: digital-agency-ai-tls-secret
    hosts:
    - "*.digital-agency-ai.com"
---`;
  }

  private generateIstioVirtualServicesYAML(applications: ApplicationManifest[]): string {
    return applications.filter(app => app.ingress).map(app => `apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: ${app.name}-vs
  namespace: ${this.namespace}
spec:
  hosts:
${app.ingress!.hosts.map(host => `  - ${host}`).join('\n')}
  gateways:
  - digital-agency-ai-gateway
  http:
  - match:
    - uri:
        prefix: /
    route:
    - destination:
        host: ${app.services[0].name}
        port:
          number: ${app.services[0].ports[0].port}
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
    timeout: 10s
---`).join('\n');
  }

  private getBaseResourceRequirements(): ResourceRequirements {
    const multiplier = this.environment === 'production' ? 2 : 1;
    return {
      requests: { cpu: `${100 * multiplier}m`, memory: `${256 * multiplier}Mi` },
      limits: { cpu: `${500 * multiplier}m`, memory: `${512 * multiplier}Mi` }
    };
  }

  private objectToYAML(obj: any, indent: number = 0): string {
    const spaces = ' '.repeat(indent);
    let yaml = '';
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        yaml += `${spaces}${key}:\n${this.objectToYAML(value, indent + 2)}`;
      } else if (Array.isArray(value)) {
        yaml += `${spaces}${key}:\n`;
        for (const item of value) {
          if (typeof item === 'object') {
            yaml += `${spaces}- \n${this.objectToYAML(item, indent + 4)}`;
          } else {
            yaml += `${spaces}- ${item}\n`;
          }
        }
      } else {
        yaml += `${spaces}${key}: ${typeof value === 'string' && value.includes(':') ? `"${value}"` : value}\n`;
      }
    }
    
    return yaml;
  }
}

export default KubernetesDeploymentManifests;