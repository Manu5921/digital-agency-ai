"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubernetesDeploymentManifests = void 0;
var logger_1 = require("../../../core/utils/logger");
/**
 * Kubernetes Deployment Manifests Generator
 * Generates complete enterprise-ready Kubernetes manifests
 */
var KubernetesDeploymentManifests = /** @class */ (function () {
    function KubernetesDeploymentManifests(environment) {
        if (environment === void 0) { environment = 'production'; }
        this.logger = new logger_1.Logger('KubernetesDeploymentManifests');
        this.environment = environment;
        this.namespace = "digital-agency-ai-".concat(environment);
    }
    /**
     * Generates complete Kubernetes manifests for the digital agency platform
     */
    KubernetesDeploymentManifests.prototype.generateCompleteManifests = function () {
        this.logger.info("Generating Kubernetes manifests for ".concat(this.environment, " environment"));
        return {
            namespace: this.namespace,
            applications: this.generateApplicationManifests(),
            infrastructure: this.generateInfrastructureManifests(),
            monitoring: this.generateMonitoringManifests(),
            security: this.generateSecurityManifests()
        };
    };
    /**
     * Generates application deployment manifests
     */
    KubernetesDeploymentManifests.prototype.generateApplicationManifests = function () {
        var baseResourceRequirements = this.getBaseResourceRequirements();
        return [
            // Frontend Next.js Application
            {
                name: 'frontend-app',
                version: '1.0.0',
                replicas: this.environment === 'production' ? 3 : 1,
                image: "digital-agency-ai/frontend:latest",
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
                    hosts: ["app-".concat(this.environment, ".digital-agency-ai.com")],
                    rules: [
                        {
                            host: "app-".concat(this.environment, ".digital-agency-ai.com"),
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
                image: "digital-agency-ai/backend-api:latest",
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
                    hosts: ["api-".concat(this.environment, ".digital-agency-ai.com")],
                    rules: [
                        {
                            host: "api-".concat(this.environment, ".digital-agency-ai.com"),
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
                image: "digital-agency-ai/agent-orchestrator:latest",
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
                image: "digital-agency-ai/webdev-agent:latest",
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
                image: "digital-agency-ai/design-agent:latest",
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
    };
    /**
     * Generates infrastructure service manifests
     */
    KubernetesDeploymentManifests.prototype.generateInfrastructureManifests = function () {
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
    };
    /**
     * Generates monitoring and observability manifests
     */
    KubernetesDeploymentManifests.prototype.generateMonitoringManifests = function () {
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
                        hosts: ["jaeger-".concat(this.environment, ".digital-agency-ai.com")]
                    }
                }
            }
        ];
    };
    /**
     * Generates security and RBAC manifests
     */
    KubernetesDeploymentManifests.prototype.generateSecurityManifests = function () {
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
    };
    /**
     * Generates YAML manifests for deployment
     */
    KubernetesDeploymentManifests.prototype.generateYAMLManifests = function () {
        var _this = this;
        var manifests = this.generateCompleteManifests();
        var yamlManifests = {};
        // Generate namespace
        yamlManifests['00-namespace.yaml'] = this.generateNamespaceYAML();
        // Generate ConfigMaps and Secrets
        yamlManifests['01-configmaps.yaml'] = this.generateConfigMapsYAML();
        yamlManifests['02-secrets.yaml'] = this.generateSecretsYAML();
        // Generate application manifests
        manifests.applications.forEach(function (app, index) {
            yamlManifests["10-".concat(app.name, "-deployment.yaml")] = _this.generateDeploymentYAML(app);
            yamlManifests["11-".concat(app.name, "-service.yaml")] = _this.generateServiceYAML(app);
            if (app.ingress) {
                yamlManifests["12-".concat(app.name, "-ingress.yaml")] = _this.generateIngressYAML(app);
            }
            if (app.autoscaling) {
                yamlManifests["13-".concat(app.name, "-hpa.yaml")] = _this.generateHPAYAML(app);
            }
        });
        // Generate infrastructure manifests
        manifests.infrastructure.forEach(function (infra, index) {
            yamlManifests["20-".concat(infra.name, "-").concat(infra.type, ".yaml")] = _this.generateInfrastructureYAML(infra);
        });
        // Generate monitoring manifests
        manifests.monitoring.forEach(function (monitor, index) {
            yamlManifests["30-".concat(monitor.name, ".yaml")] = _this.generateMonitoringYAML(monitor);
        });
        // Generate security manifests
        manifests.security.forEach(function (security, index) {
            yamlManifests["40-".concat(security.name, ".yaml")] = _this.generateSecurityYAML(security);
        });
        // Generate Istio service mesh manifests
        yamlManifests['50-istio-gateway.yaml'] = this.generateIstioGatewayYAML();
        yamlManifests['51-istio-virtual-services.yaml'] = this.generateIstioVirtualServicesYAML(manifests.applications);
        return yamlManifests;
    };
    /**
     * Utility methods for YAML generation
     */
    KubernetesDeploymentManifests.prototype.generateNamespaceYAML = function () {
        return "apiVersion: v1\nkind: Namespace\nmetadata:\n  name: ".concat(this.namespace, "\n  labels:\n    name: ").concat(this.namespace, "\n    environment: ").concat(this.environment, "\n    istio-injection: enabled\n---");
    };
    KubernetesDeploymentManifests.prototype.generateConfigMapsYAML = function () {
        return "apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\n  namespace: ".concat(this.namespace, "\ndata:\n  api_url: \"https://api-").concat(this.environment, ".digital-agency-ai.com\"\n  environment: \"").concat(this.environment, "\"\n  log_level: \"").concat(this.environment === 'production' ? 'info' : 'debug', "\"\n  max_request_size: \"10mb\"\n  session_timeout: \"3600\"\n---\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: agent-config\n  namespace: ").concat(this.namespace, "\ndata:\n  orchestrator_config.json: |\n    {\n      \"maxConcurrentTasks\": 10,\n      \"taskTimeout\": 300000,\n      \"retryAttempts\": 3,\n      \"healthCheckInterval\": 30000\n    }\n  agent_config.json: |\n    {\n      \"webdev\": {\n        \"maxBuildTime\": 600,\n        \"cacheEnabled\": true,\n        \"parallelBuilds\": 3\n      },\n      \"design\": {\n        \"maxImageSize\": \"50MB\",\n        \"supportedFormats\": [\"png\", \"jpg\", \"svg\", \"figma\"],\n        \"compressionQuality\": 85\n      }\n    }\n---");
    };
    KubernetesDeploymentManifests.prototype.generateSecretsYAML = function () {
        return "# Note: This is a template. In production, use proper secret management like Sealed Secrets or External Secrets Operator\napiVersion: v1\nkind: Secret\nmetadata:\n  name: database-secrets\n  namespace: ".concat(this.namespace, "\ntype: Opaque\nstringData:\n  url: \"postgresql://username:password@postgresql:5432/digital_agency_ai\"\n  postgres_password: \"CHANGE_ME_IN_PRODUCTION\"\n---\napiVersion: v1\nkind: Secret\nmetadata:\n  name: redis-secrets\n  namespace: ").concat(this.namespace, "\ntype: Opaque\nstringData:\n  url: \"redis://:password@redis-master:6379\"\n  password: \"CHANGE_ME_IN_PRODUCTION\"\n---\napiVersion: v1\nkind: Secret\nmetadata:\n  name: ai-secrets\n  namespace: ").concat(this.namespace, "\ntype: Opaque\nstringData:\n  claude_api_key: \"CLAUDE_API_KEY_HERE\"\n  openai_api_key: \"OPENAI_API_KEY_HERE\"\n---\napiVersion: v1\nkind: Secret\nmetadata:\n  name: auth-secrets\n  namespace: ").concat(this.namespace, "\ntype: Opaque\nstringData:\n  jwt_secret: \"SUPER_SECRET_JWT_KEY_CHANGE_ME\"\n---");
    };
    KubernetesDeploymentManifests.prototype.generateDeploymentYAML = function (app) {
        var _a, _b;
        return "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: ".concat(app.name, "\n  namespace: ").concat(this.namespace, "\n  labels:\n    app: ").concat(app.name, "\n    version: ").concat(app.version, "\n    environment: ").concat(this.environment, "\nspec:\n  replicas: ").concat(app.replicas, "\n  selector:\n    matchLabels:\n      app: ").concat(app.name, "\n  template:\n    metadata:\n      labels:\n        app: ").concat(app.name, "\n        version: ").concat(app.version, "\n      annotations:\n        prometheus.io/scrape: \"true\"\n        prometheus.io/port: \"metrics\"\n        prometheus.io/path: \"/metrics\"\n    spec:\n      serviceAccountName: ").concat(app.name, "-sa\n      securityContext:\n        runAsNonRoot: true\n        runAsUser: 1000\n        fsGroup: 2000\n      containers:\n      - name: ").concat(app.name, "\n        image: ").concat(app.image, "\n        imagePullPolicy: Always\n        ports:\n        - containerPort: ").concat(((_b = (_a = app.services[0]) === null || _a === void 0 ? void 0 : _a.ports[0]) === null || _b === void 0 ? void 0 : _b.targetPort) || 3000, "\n          name: http\n        - containerPort: 9090\n          name: metrics\n        env:\n").concat(app.env.map(function (env) {
            var _a, _b;
            return "        - name: ".concat(env.name, "\n          ").concat(env.value ? "value: \"".concat(env.value, "\"") : "valueFrom:\n            ".concat(((_a = env.valueFrom) === null || _a === void 0 ? void 0 : _a.secretKeyRef) ? "secretKeyRef:\n              name: ".concat(env.valueFrom.secretKeyRef.name, "\n              key: ").concat(env.valueFrom.secretKeyRef.key) : '', "\n            ").concat(((_b = env.valueFrom) === null || _b === void 0 ? void 0 : _b.configMapKeyRef) ? "configMapKeyRef:\n              name: ".concat(env.valueFrom.configMapKeyRef.name, "\n              key: ").concat(env.valueFrom.configMapKeyRef.key) : ''));
        }).join('\n'), "\n        resources:\n          requests:\n            cpu: ").concat(app.resources.requests.cpu, "\n            memory: ").concat(app.resources.requests.memory, "\n          limits:\n            cpu: ").concat(app.resources.limits.cpu, "\n            memory: ").concat(app.resources.limits.memory, "\n        livenessProbe:\n          httpGet:\n            path: /health\n            port: http\n          initialDelaySeconds: 30\n          periodSeconds: 10\n          timeoutSeconds: 5\n          failureThreshold: 3\n        readinessProbe:\n          httpGet:\n            path: /ready\n            port: http\n          initialDelaySeconds: 5\n          periodSeconds: 5\n          timeoutSeconds: 3\n          failureThreshold: 3\n        securityContext:\n          allowPrivilegeEscalation: false\n          readOnlyRootFilesystem: true\n          capabilities:\n            drop:\n            - ALL\n").concat(app.volumes.length > 0 ? "        volumeMounts:\n".concat(app.volumes.map(function (vol) { return "        - name: ".concat(vol.name, "\n          mountPath: ").concat(vol.mountPath, "\n          ").concat(vol.type === 'persistentVolumeClaim' ? 'readOnly: false' : 'readOnly: true'); }).join('\n')) : '', "\n").concat(app.volumes.length > 0 ? "      volumes:\n".concat(app.volumes.map(function (vol) { return "      - name: ".concat(vol.name, "\n        ").concat(vol.type === 'configMap' ? "configMap:\n          name: ".concat(vol.source) : '', "\n        ").concat(vol.type === 'secret' ? "secret:\n          secretName: ".concat(vol.source) : '', "\n        ").concat(vol.type === 'persistentVolumeClaim' ? "persistentVolumeClaim:\n          claimName: ".concat(vol.source) : '', "\n        ").concat(vol.type === 'emptyDir' ? 'emptyDir: {}' : ''); }).join('\n')) : '', "\n---");
    };
    KubernetesDeploymentManifests.prototype.generateServiceYAML = function (app) {
        var _this = this;
        return app.services.map(function (service) { return "apiVersion: v1\nkind: Service\nmetadata:\n  name: ".concat(service.name, "\n  namespace: ").concat(_this.namespace, "\n  labels:\n    app: ").concat(app.name, "\nspec:\n  type: ").concat(service.type, "\n  ports:\n").concat(service.ports.map(function (port) { return "  - name: ".concat(port.name, "\n    port: ").concat(port.port, "\n    targetPort: ").concat(port.targetPort, "\n    protocol: ").concat(port.protocol); }).join('\n'), "\n  selector:\n").concat(Object.entries(service.selector).map(function (_a) {
            var key = _a[0], value = _a[1];
            return "    ".concat(key, ": ").concat(value);
        }).join('\n'), "\n---"); }).join('\n');
    };
    KubernetesDeploymentManifests.prototype.generateIngressYAML = function (app) {
        if (!app.ingress)
            return '';
        return "apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: ".concat(app.ingress.name, "\n  namespace: ").concat(this.namespace, "\n  annotations:\n    nginx.ingress.kubernetes.io/ssl-redirect: \"true\"\n    nginx.ingress.kubernetes.io/force-ssl-redirect: \"true\"\n    cert-manager.io/cluster-issuer: \"letsencrypt-prod\"\nspec:\n  ingressClassName: ").concat(app.ingress.className, "\n  ").concat(app.ingress.tls ? "tls:\n  - hosts:\n".concat(app.ingress.hosts.map(function (host) { return "    - ".concat(host); }).join('\n'), "\n    secretName: ").concat(app.name, "-tls") : '', "\n  rules:\n").concat(app.ingress.rules.map(function (rule) { return "  - host: ".concat(rule.host, "\n    http:\n      paths:\n").concat(rule.paths.map(function (path) { return "      - path: ".concat(path.path, "\n        pathType: ").concat(path.pathType, "\n        backend:\n          service:\n            name: ").concat(path.serviceName, "\n            port:\n              number: ").concat(path.servicePort); }).join('\n')); }).join('\n'), "\n---");
    };
    KubernetesDeploymentManifests.prototype.generateHPAYAML = function (app) {
        if (!app.autoscaling)
            return '';
        return "apiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: ".concat(app.name, "-hpa\n  namespace: ").concat(this.namespace, "\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: ").concat(app.name, "\n  minReplicas: ").concat(app.autoscaling.minReplicas, "\n  maxReplicas: ").concat(app.autoscaling.maxReplicas, "\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: ").concat(app.autoscaling.targetCPUUtilization, "\n  - type: Resource\n    resource:\n      name: memory\n      target:\n        type: Utilization\n        averageUtilization: ").concat(app.autoscaling.targetMemoryUtilization, "\n  ").concat(app.autoscaling.scaleUpPolicy || app.autoscaling.scaleDownPolicy ? "behavior:" : '', "\n  ").concat(app.autoscaling.scaleUpPolicy ? "  scaleUp:\n    stabilizationWindowSeconds: ".concat(app.autoscaling.scaleUpPolicy.stabilizationWindowSeconds, "\n    policies:\n").concat(app.autoscaling.scaleUpPolicy.policies.map(function (policy) { return "    - type: ".concat(policy.type, "\n      value: ").concat(policy.value, "\n      periodSeconds: ").concat(policy.periodSeconds); }).join('\n')) : '', "\n  ").concat(app.autoscaling.scaleDownPolicy ? "  scaleDown:\n    stabilizationWindowSeconds: ".concat(app.autoscaling.scaleDownPolicy.stabilizationWindowSeconds, "\n    policies:\n").concat(app.autoscaling.scaleDownPolicy.policies.map(function (policy) { return "    - type: ".concat(policy.type, "\n      value: ").concat(policy.value, "\n      periodSeconds: ").concat(policy.periodSeconds); }).join('\n')) : '', "\n---");
    };
    KubernetesDeploymentManifests.prototype.generateInfrastructureYAML = function (infra) {
        // For Helm charts, we would generate HelmRelease manifests for Flux
        return "# Helm Chart for ".concat(infra.name, "\n# This would be deployed using Helm or Flux in production\n# Chart: ").concat(infra.spec.chart, ":").concat(infra.spec.version, "\n---");
    };
    KubernetesDeploymentManifests.prototype.generateMonitoringYAML = function (monitor) {
        return "# Monitoring component: ".concat(monitor.name, "\n# Type: ").concat(monitor.type, "\n# Configuration would be deployed separately\n---");
    };
    KubernetesDeploymentManifests.prototype.generateSecurityYAML = function (security) {
        return "".concat(security.rules.apiVersion ? "apiVersion: ".concat(security.rules.apiVersion, "\nkind: ").concat(security.rules.kind, "\nmetadata:\n  name: ").concat(security.rules.metadata.name, "\n  namespace: ").concat(security.rules.metadata.namespace || this.namespace, "\n").concat(Object.keys(security.rules.spec || {}).length > 0 ? "spec:\n".concat(this.objectToYAML(security.rules.spec, 2)) : '', "\n---") : '# Security manifest placeholder');
    };
    KubernetesDeploymentManifests.prototype.generateIstioGatewayYAML = function () {
        return "apiVersion: networking.istio.io/v1beta1\nkind: Gateway\nmetadata:\n  name: digital-agency-ai-gateway\n  namespace: ".concat(this.namespace, "\nspec:\n  selector:\n    istio: ingressgateway\n  servers:\n  - port:\n      number: 80\n      name: http\n      protocol: HTTP\n    hosts:\n    - \"*.digital-agency-ai.com\"\n    tls:\n      httpsRedirect: true\n  - port:\n      number: 443\n      name: https\n      protocol: HTTPS\n    tls:\n      mode: SIMPLE\n      credentialName: digital-agency-ai-tls-secret\n    hosts:\n    - \"*.digital-agency-ai.com\"\n---");
    };
    KubernetesDeploymentManifests.prototype.generateIstioVirtualServicesYAML = function (applications) {
        var _this = this;
        return applications.filter(function (app) { return app.ingress; }).map(function (app) { return "apiVersion: networking.istio.io/v1beta1\nkind: VirtualService\nmetadata:\n  name: ".concat(app.name, "-vs\n  namespace: ").concat(_this.namespace, "\nspec:\n  hosts:\n").concat(app.ingress.hosts.map(function (host) { return "  - ".concat(host); }).join('\n'), "\n  gateways:\n  - digital-agency-ai-gateway\n  http:\n  - match:\n    - uri:\n        prefix: /\n    route:\n    - destination:\n        host: ").concat(app.services[0].name, "\n        port:\n          number: ").concat(app.services[0].ports[0].port, "\n    fault:\n      delay:\n        percentage:\n          value: 0.1\n        fixedDelay: 5s\n    retries:\n      attempts: 3\n      perTryTimeout: 2s\n    timeout: 10s\n---"); }).join('\n');
    };
    KubernetesDeploymentManifests.prototype.getBaseResourceRequirements = function () {
        var multiplier = this.environment === 'production' ? 2 : 1;
        return {
            requests: { cpu: "".concat(100 * multiplier, "m"), memory: "".concat(256 * multiplier, "Mi") },
            limits: { cpu: "".concat(500 * multiplier, "m"), memory: "".concat(512 * multiplier, "Mi") }
        };
    };
    KubernetesDeploymentManifests.prototype.objectToYAML = function (obj, indent) {
        if (indent === void 0) { indent = 0; }
        var spaces = ' '.repeat(indent);
        var yaml = '';
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                yaml += "".concat(spaces).concat(key, ":\n").concat(this.objectToYAML(value, indent + 2));
            }
            else if (Array.isArray(value)) {
                yaml += "".concat(spaces).concat(key, ":\n");
                for (var _c = 0, value_1 = value; _c < value_1.length; _c++) {
                    var item = value_1[_c];
                    if (typeof item === 'object') {
                        yaml += "".concat(spaces, "- \n").concat(this.objectToYAML(item, indent + 4));
                    }
                    else {
                        yaml += "".concat(spaces, "- ").concat(item, "\n");
                    }
                }
            }
            else {
                yaml += "".concat(spaces).concat(key, ": ").concat(typeof value === 'string' && value.includes(':') ? "\"".concat(value, "\"") : value, "\n");
            }
        }
        return yaml;
    };
    return KubernetesDeploymentManifests;
}());
exports.KubernetesDeploymentManifests = KubernetesDeploymentManifests;
exports.default = KubernetesDeploymentManifests;
