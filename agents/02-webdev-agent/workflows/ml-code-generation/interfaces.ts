/**
 * ML Code Generation Interfaces
 * Interfaces TypeScript complètes pour le système ML de génération de code
 * 
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Types et interfaces pour l'architecture enterprise ML
 */

// ========================================
// CORE INTERFACES
// ========================================

export interface IMLCodeGenerationEngine {
  initialize(): Promise<void>;
  generateProject(request: ICodeGenerationRequest): Promise<ICodeGenerationResult>;
  generateComponent(spec: IComponentSpec): Promise<IGeneratedFile>;
  generatePage(spec: IPageSpec): Promise<IGeneratedFile>;
  generateAPI(spec: IAPISpec): Promise<IGeneratedFile>;
  optimizeCode(file: IGeneratedFile): Promise<IGeneratedFile>;
  runTests(files: IGeneratedFile[]): Promise<ITestResults>;
  deployProject(projectId: string, files: IGeneratedFile[]): Promise<IDeploymentInfo>;
  getHealthStatus(): Promise<IHealthStatus>;
}

export interface IMLModelProvider {
  name: string;
  version: string;
  capabilities: string[];
  isInitialized: boolean;
  initialize(config: any): Promise<void>;
  generateCode(prompt: string, context: any): Promise<string>;
  isHealthy(): Promise<boolean>;
  getMetrics(): Promise<IModelMetrics>;
}

export interface ICodeOptimizer {
  optimizeBundle(files: IGeneratedFile[]): Promise<IGeneratedFile[]>;
  optimizeImages(files: IGeneratedFile[]): Promise<IGeneratedFile[]>;
  optimizePerformance(file: IGeneratedFile): Promise<IGeneratedFile>;
  calculateMetrics(files: IGeneratedFile[]): Promise<IPerformanceMetrics>;
}

export interface ITestGenerator {
  generateUnitTests(file: IGeneratedFile): Promise<IGeneratedFile[]>;
  generateIntegrationTests(files: IGeneratedFile[]): Promise<IGeneratedFile[]>;
  generateE2ETests(projectType: string): Promise<IGeneratedFile[]>;
  runTestSuite(files: IGeneratedFile[]): Promise<ITestResults>;
}

export interface ISecurityValidator {
  scanVulnerabilities(files: IGeneratedFile[]): Promise<ISecurityIssue[]>;
  detectSecrets(files: IGeneratedFile[]): Promise<ISecurityIssue[]>;
  validateOWASP(files: IGeneratedFile[]): Promise<IOWASPReport>;
  generateSecurityReport(files: IGeneratedFile[]): Promise<ISecurityReport>;
}

// ========================================
// CONFIGURATION INTERFACES
// ========================================

export interface IMLConfiguration {
  version: string;
  environment: 'development' | 'staging' | 'production';
  models: {
    githubCopilot: IGitHubCopilotConfig;
    codeT5: ICodeT5Config;
    customModels: ICustomModelsConfig;
  };
  optimization: IOptimizationConfig;
  testing: ITestingConfig;
  security: ISecurityConfig;
  deployment: IDeploymentConfig;
  monitoring: IMonitoringConfig;
  integrations: IIntegrationsConfig;
}

export interface IGitHubCopilotConfig {
  enabled: boolean;
  apiKey: string;
  model: 'gpt-4-turbo' | 'gpt-4' | 'gpt-3.5-turbo';
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  enterpriseFeatures: {
    codeReview: boolean;
    securityScanning: boolean;
    complianceChecks: boolean;
    auditLogs: boolean;
    teamCollaboration: boolean;
  };
  rateLimits: {
    requestsPerHour: number;
    tokensPerMinute: number;
  };
}

export interface ICodeT5Config {
  enabled: boolean;
  models: {
    base: string;
    large: string;
    fineTuned: Record<string, string>;
  };
  inference: {
    maxNewTokens: number;
    temperature: number;
    topP: number;
    topK: number;
    repetitionPenalty: number;
    lengthPenalty: number;
    numBeams: number;
    earlyStopping: boolean;
  };
  fineTuning: {
    enabled: boolean;
    datasets: string[];
    epochs: number;
    learningRate: number;
    batchSize: number;
  };
}

export interface ICustomModelsConfig {
  enabled: boolean;
  models: Record<string, ICustomModel>;
  registry: {
    url: string;
    authentication: any;
  };
}

export interface ICustomModel {
  name: string;
  version: string;
  type: 'transformer' | 'diffusion' | 'gan' | 'lstm';
  endpoint: string;
  authentication: any;
  capabilities: string[];
  metadata: any;
}

export interface IOptimizationConfig {
  enabled: boolean;
  performance: {
    bundleOptimization: boolean;
    codesplitting: boolean;
    treeshaking: boolean;
    minification: boolean;
    compression: boolean;
  };
  images: {
    formats: string[];
    quality: number;
    responsive: boolean;
    lazy: boolean;
    webp: boolean;
    avif: boolean;
  };
  caching: {
    staticAssets: number;
    apiResponses: number;
    cdn: boolean;
    serviceWorker: boolean;
  };
  targets: IPerformanceTargets;
}

export interface IPerformanceTargets {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  bundleSize: number;
  lighthouse: number;
}

export interface ITestingConfig {
  enabled: boolean;
  frameworks: {
    jest: IJestConfig;
    playwright: IPlaywrightConfig;
    cypress: ICypressConfig;
    vitest: IVitestConfig;
  };
  coverage: {
    threshold: ICoverageThreshold;
    reporters: string[];
    collectFrom: string[];
    exclude: string[];
  };
  visualRegression: {
    enabled: boolean;
    threshold: number;
    browsers: string[];
    devices: string[];
  };
  accessibility: {
    enabled: boolean;
    standards: string[];
    tools: string[];
  };
}

export interface IJestConfig {
  enabled: boolean;
  version: string;
  testEnvironment: string;
  setupFilesAfterEnv: string[];
  moduleNameMapping: Record<string, string>;
  transform: Record<string, string>;
  collectCoverageFrom: string[];
}

export interface IPlaywrightConfig {
  enabled: boolean;
  version: string;
  browsers: string[];
  devices: string[];
  baseURL: string;
  timeout: number;
  retries: number;
  workers: number;
}

export interface ICypressConfig {
  enabled: boolean;
  version: string;
  baseUrl: string;
  viewportWidth: number;
  viewportHeight: number;
  video: boolean;
  screenshots: boolean;
  chromeWebSecurity: boolean;
}

export interface IVitestConfig {
  enabled: boolean;
  version: string;
  environment: string;
  globals: boolean;
  coverage: any;
}

export interface ICoverageThreshold {
  global: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
  perFile: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
}

export interface ISecurityConfig {
  enabled: boolean;
  scanning: {
    dependencies: boolean;
    secrets: boolean;
    staticAnalysis: boolean;
    dynamicAnalysis: boolean;
  };
  compliance: {
    owasp: boolean;
    gdpr: boolean;
    hipaa: boolean;
    sox: boolean;
  };
  tools: {
    snyk: boolean;
    sonarqube: boolean;
    codeql: boolean;
    semgrep: boolean;
  };
  policies: ISecurityPolicies;
}

export interface ISecurityPolicies {
  allowedDependencies: string[];
  blockedDependencies: string[];
  maxVulnerabilityScore: number;
  requireSecurityReview: boolean;
  encryptionStandards: string[];
}

export interface IDeploymentConfig {
  enabled: boolean;
  providers: {
    vercel: IVercelConfig;
    netlify: INetlifyConfig;
    aws: IAWSConfig;
    gcp: IGCPConfig;
  };
  environments: {
    development: IEnvironmentConfig;
    staging: IEnvironmentConfig;
    production: IEnvironmentConfig;
  };
  cicd: ICICDConfig;
}

export interface IVercelConfig {
  enabled: boolean;
  teamId?: string;
  projectId?: string;
  orgId?: string;
  token: string;
  regions: string[];
  functions: {
    memory: number;
    timeout: number;
  };
}

export interface INetlifyConfig {
  enabled: boolean;
  siteId: string;
  token: string;
  buildCommand: string;
  publishDir: string;
  functions: {
    directory: string;
  };
}

export interface IAWSConfig {
  enabled: boolean;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  s3: {
    bucket: string;
    region: string;
  };
  cloudfront: {
    distributionId: string;
  };
  lambda: {
    region: string;
    timeout: number;
    memory: number;
  };
}

export interface IGCPConfig {
  enabled: boolean;
  projectId: string;
  credentials: any;
  storage: {
    bucket: string;
  };
  functions: {
    region: string;
    timeout: number;
    memory: string;
  };
}

export interface IEnvironmentConfig {
  name: string;
  url: string;
  branch: string;
  variables: Record<string, string>;
  secrets: Record<string, string>;
  protection: {
    requireReview: boolean;
    allowedUsers: string[];
    requiredChecks: string[];
  };
}

export interface IMonitoringConfig {
  enabled: boolean;
  realUserMonitoring: {
    enabled: boolean;
    provider: 'vercel' | 'datadog' | 'newrelic' | 'custom';
    sampleRate: number;
  };
  syntheticMonitoring: {
    enabled: boolean;
    frequency: string;
    locations: string[];
    urls: string[];
  };
  errorTracking: {
    enabled: boolean;
    provider: 'sentry' | 'bugsnag' | 'rollbar' | 'custom';
    sampleRate: number;
    environment: string;
  };
  logging: {
    enabled: boolean;
    level: 'error' | 'warn' | 'info' | 'debug';
    providers: string[];
  };
  alerts: {
    enabled: boolean;
    channels: IAlertChannel[];
    rules: IAlertRule[];
  };
}

export interface IAlertChannel {
  name: string;
  type: 'email' | 'slack' | 'discord' | 'webhook';
  config: any;
}

export interface IAlertRule {
  name: string;
  condition: string;
  threshold: number;
  channels: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface IIntegrationsConfig {
  figma: IFigmaIntegration;
  stripe: IStripeIntegration;
  neon: INeonIntegration;
  contentful: IContentfulIntegration;
  sanity: ISanityIntegration;
  supabase: ISupabaseIntegration;
  auth0: IAuth0Integration;
  sendgrid: ISendgridIntegration;
}

export interface IFigmaIntegration {
  enabled: boolean;
  apiKey: string;
  teamId: string;
  extractTokens: boolean;
  generateComponents: boolean;
  syncDesignSystem: boolean;
}

export interface IStripeIntegration {
  enabled: boolean;
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
  testMode: boolean;
  products: string[];
}

export interface INeonIntegration {
  enabled: boolean;
  apiKey: string;
  projectId: string;
  branches: {
    main: string;
    development: string;
    staging: string;
  };
  connectionString: string;
}

export interface IContentfulIntegration {
  enabled: boolean;
  spaceId: string;
  accessToken: string;
  previewToken: string;
  environment: string;
}

export interface ISanityIntegration {
  enabled: boolean;
  projectId: string;
  dataset: string;
  token: string;
  apiVersion: string;
}

export interface ISupabaseIntegration {
  enabled: boolean;
  url: string;
  anonKey: string;
  serviceRoleKey: string;
  jwtSecret: string;
}

export interface IAuth0Integration {
  enabled: boolean;
  domain: string;
  clientId: string;
  clientSecret: string;
  audience: string;
}

export interface ISendgridIntegration {
  enabled: boolean;
  apiKey: string;
  fromEmail: string;
  templates: Record<string, string>;
}

// ========================================
// REQUEST/RESPONSE INTERFACES
// ========================================

export interface ICodeGenerationRequest {
  id: string;
  projectType: ProjectType;
  qualityLevel: QualityLevel;
  timeline: number;
  budget?: number;
  requirements: IProjectRequirements;
  designInputs: IDesignInputs;
  integrations: IRequestedIntegrations;
  customizations: ICustomizations;
  metadata: IRequestMetadata;
}

export type ProjectType = 'restaurant' | 'ecommerce' | 'saas' | 'portfolio' | 'blog' | 'corporate' | 'marketplace' | 'social' | 'educational' | 'healthcare';

export type QualityLevel = 'mvp' | 'production' | 'enterprise' | 'premium';

export interface IProjectRequirements {
  components: string[];
  pages: string[];
  features: string[];
  apis: string[];
  integrations: string[];
  customRequirements: string[];
  accessibility: {
    level: 'A' | 'AA' | 'AAA';
    features: string[];
  };
  seo: {
    enabled: boolean;
    features: string[];
  };
  performance: {
    targets: IPerformanceTargets;
    optimizations: string[];
  };
  responsive: {
    breakpoints: string[];
    devices: string[];
  };
  browser: {
    support: string[];
    polyfills: string[];
  };
}

export interface IDesignInputs {
  figmaUrl?: string;
  imageUrls: string[];
  designSystem?: IDesignSystem;
  brand: IBrandGuidelines;
  wireframes?: string[];
  prototypes?: string[];
}

export interface IDesignSystem {
  colors: {
    primary: string[];
    secondary: string[];
    neutral: string[];
    semantic: Record<string, string>;
  };
  typography: {
    headings: ITypographyScale;
    body: ITypographyScale;
    captions: ITypographyScale;
  };
  spacing: {
    scale: number[];
    unit: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  borders: {
    radius: Record<string, string>;
    width: Record<string, string>;
  };
  animations: {
    durations: Record<string, string>;
    easings: Record<string, string>;
  };
}

export interface ITypographyScale {
  fontFamily: string;
  sizes: Record<string, string>;
  weights: Record<string, number>;
  lineHeights: Record<string, string>;
  letterSpacing: Record<string, string>;
}

export interface IBrandGuidelines {
  name: string;
  logo: {
    primary: string;
    secondary?: string;
    mark?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  fonts: {
    primary: string;
    secondary?: string;
    monospace?: string;
  };
  voice: {
    tone: string;
    personality: string[];
    messaging: string[];
  };
  imagery: {
    style: string;
    mood: string;
    colors: string[];
  };
}

export interface IRequestedIntegrations {
  cms: boolean;
  ecommerce: boolean;
  authentication: boolean;
  analytics: boolean;
  marketing: boolean;
  payments: boolean;
  email: boolean;
  social: boolean;
  search: boolean;
  chat: boolean;
  custom: Record<string, any>;
}

export interface ICustomizations {
  codeStyle: {
    formatter: 'prettier' | 'eslint';
    naming: 'camelCase' | 'kebab-case' | 'snake_case';
    quotes: 'single' | 'double';
    semicolons: boolean;
    tabs: boolean;
    tabSize: number;
  };
  framework: {
    version: string;
    features: string[];
    plugins: string[];
  };
  build: {
    bundler: 'webpack' | 'vite' | 'turbo' | 'rollup';
    target: string[];
    optimizations: string[];
  };
  deployment: {
    strategy: 'static' | 'ssr' | 'ssg' | 'hybrid';
    platform: string;
    domains: string[];
  };
}

export interface IRequestMetadata {
  clientId: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  source: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  notes: string;
}

export interface ICodeGenerationResult {
  id: string;
  requestId: string;
  success: boolean;
  status: GenerationStatus;
  progress: number;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  project: IGeneratedProject;
  files: IGeneratedFile[];
  metrics: IGenerationMetrics;
  issues: IGenerationIssue[];
  recommendations: IRecommendation[];
  nextSteps: string[];
}

export type GenerationStatus = 'pending' | 'initializing' | 'analyzing' | 'generating' | 'optimizing' | 'testing' | 'deploying' | 'completed' | 'failed' | 'cancelled';

export interface IGeneratedProject {
  id: string;
  name: string;
  type: ProjectType;
  structure: IProjectStructure;
  dependencies: IDependencies;
  configuration: IProjectConfiguration;
  documentation: IProjectDocumentation;
  deployment: IDeploymentInfo;
}

export interface IProjectStructure {
  directories: string[];
  files: Record<string, IFileInfo>;
  entryPoints: Record<string, string>;
  assets: Record<string, IAssetInfo>;
}

export interface IFileInfo {
  path: string;
  type: FileType;
  size: number;
  checksum: string;
  dependencies: string[];
  exports: string[];
  imports: string[];
}

export type FileType = 'component' | 'page' | 'api' | 'config' | 'test' | 'style' | 'asset' | 'documentation' | 'script' | 'manifest';

export interface IAssetInfo {
  path: string;
  type: 'image' | 'font' | 'video' | 'audio' | 'document';
  size: number;
  format: string;
  optimized: boolean;
  responsive: boolean;
}

export interface IDependencies {
  production: Record<string, string>;
  development: Record<string, string>;
  peer: Record<string, string>;
  optional: Record<string, string>;
  bundled: string[];
}

export interface IProjectConfiguration {
  nextjs: any;
  typescript: any;
  tailwind: any;
  eslint: any;
  prettier: any;
  jest: any;
  playwright: any;
  vercel: any;
  docker: any;
  env: Record<string, any>;
}

export interface IProjectDocumentation {
  readme: string;
  installation: string;
  usage: string;
  api: string;
  deployment: string;
  contributing: string;
  changelog: string;
  license: string;
}

export interface IGeneratedFile {
  id: string;
  path: string;
  content: string;
  type: FileType;
  framework: Framework;
  language: Language;
  size: number;
  lines: number;
  dependencies: string[];
  exports: string[];
  imports: string[];
  aiGenerated: boolean;
  humanReview: boolean;
  qualityScore: number;
  complexity: number;
  maintainability: number;
  testCoverage: number;
  securityScore: number;
  performanceScore: number;
  metadata: IFileMetadata;
}

export type Framework = 'next' | 'react' | 'vue' | 'angular' | 'svelte' | 'solid' | 'vanilla';
export type Language = 'typescript' | 'javascript' | 'jsx' | 'tsx' | 'css' | 'scss' | 'json' | 'yaml' | 'markdown' | 'html';

export interface IFileMetadata {
  author: string;
  created: Date;
  modified: Date;
  version: string;
  tags: string[];
  description: string;
  notes: string;
  reviewers: string[];
  approvedBy?: string;
  approvedAt?: Date;
}

export interface IGenerationMetrics {
  quality: IQualityMetrics;
  performance: IPerformanceMetrics;
  security: ISecurityMetrics;
  testing: ITestMetrics;
  accessibility: IAccessibilityMetrics;
  seo: ISEOMetrics;
  maintainability: IMaintainabilityMetrics;
  efficiency: IEfficiencyMetrics;
}

export interface IQualityMetrics {
  overall: number;
  codeQuality: number;
  architecture: number;
  documentation: number;
  bestPractices: number;
  consistency: number;
  modularity: number;
  reusability: number;
  scalability: number;
}

export interface IPerformanceMetrics {
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
  };
  webVitals: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
  };
  bundle: {
    size: number;
    gzipped: number;
    chunks: number;
    assets: number;
  };
  runtime: {
    startup: number;
    hydration: number;
    navigation: number;
    interaction: number;
  };
}

export interface ISecurityMetrics {
  overall: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  compliance: {
    owasp: number;
    gdpr: boolean;
    hipaa: boolean;
    sox: boolean;
  };
  secrets: {
    exposed: number;
    hardcoded: number;
    insecure: number;
  };
  dependencies: {
    outdated: number;
    vulnerable: number;
    deprecated: number;
  };
}

export interface ITestMetrics {
  coverage: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
  tests: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
  types: {
    unit: number;
    integration: number;
    e2e: number;
    visual: number;
  };
  performance: {
    duration: number;
    slowest: string;
    fastest: string;
    average: number;
  };
}

export interface IAccessibilityMetrics {
  score: number;
  level: 'A' | 'AA' | 'AAA';
  issues: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
  categories: {
    keyboard: number;
    screen_reader: number;
    color_contrast: number;
    semantic_markup: number;
    focus_management: number;
  };
}

export interface ISEOMetrics {
  score: number;
  meta: {
    title: boolean;
    description: boolean;
    keywords: boolean;
    canonical: boolean;
    robots: boolean;
  };
  structure: {
    headings: boolean;
    internal_links: boolean;
    images_alt: boolean;
    schema_markup: boolean;
  };
  performance: {
    mobile_friendly: boolean;
    page_speed: number;
    core_web_vitals: boolean;
  };
  content: {
    readability: number;
    uniqueness: number;
    keyword_density: number;
  };
}

export interface IMaintainabilityMetrics {
  index: number;
  complexity: {
    cyclomatic: number;
    cognitive: number;
    halstead: number;
  };
  duplication: {
    percentage: number;
    blocks: number;
    lines: number;
  };
  technical_debt: {
    ratio: number;
    effort: string;
    rating: 'A' | 'B' | 'C' | 'D' | 'E';
  };
  dependencies: {
    coupling: number;
    cohesion: number;
    instability: number;
  };
}

export interface IEfficiencyMetrics {
  generation: {
    duration: number;
    iterations: number;
    tokens_used: number;
    api_calls: number;
  };
  optimization: {
    improvements: number;
    time_saved: number;
    size_reduction: number;
    performance_gain: number;
  };
  automation: {
    tasks_automated: number;
    manual_effort_saved: number;
    error_reduction: number;
  };
}

export interface IGenerationIssue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  category: IssueCategory;
  title: string;
  description: string;
  location: IIssueLocation;
  suggestion: string;
  autoFixable: boolean;
  fixed: boolean;
  createdAt: Date;
  resolvedAt?: Date;
}

export type IssueType = 'error' | 'warning' | 'info' | 'performance' | 'security' | 'accessibility' | 'seo' | 'best_practice';
export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type IssueCategory = 'code_quality' | 'security' | 'performance' | 'accessibility' | 'seo' | 'testing' | 'documentation' | 'configuration';

export interface IIssueLocation {
  file: string;
  line?: number;
  column?: number;
  function?: string;
  component?: string;
}

export interface IRecommendation {
  id: string;
  type: RecommendationType;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  benefits: string[];
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  implementation: string;
  resources: string[];
  createdAt: Date;
}

export type RecommendationType = 'performance' | 'security' | 'accessibility' | 'seo' | 'user_experience' | 'maintainability' | 'scalability' | 'cost_optimization';

// ========================================
// COMPONENT SPECIFICATIONS
// ========================================

export interface IComponentSpec {
  name: string;
  type: ComponentType;
  purpose: string;
  props: IComponentProp[];
  children: boolean;
  styling: StylingApproach;
  responsive: boolean;
  accessibility: IAccessibilitySpec;
  performance: IPerformanceSpec;
  seo: ISEOSpec;
  testing: ITestingSpec;
  integration: IIntegrationSpec;
  customization: ICustomizationSpec;
}

export type ComponentType = 'layout' | 'navigation' | 'form' | 'display' | 'interactive' | 'media' | 'utility' | 'composite';
export type StylingApproach = 'tailwind' | 'styled-components' | 'emotion' | 'css-modules' | 'vanilla-css' | 'chakra' | 'mantine';

export interface IComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
  validation?: string;
  examples: any[];
}

export interface IAccessibilitySpec {
  required: boolean;
  level: 'A' | 'AA' | 'AAA';
  features: string[];
  keyboard: boolean;
  screenReader: boolean;
  colorContrast: boolean;
  focus: boolean;
  semantics: boolean;
}

export interface IPerformanceSpec {
  lazy: boolean;
  memoization: boolean;
  virtualization: boolean;
  caching: boolean;
  bundleSplitting: boolean;
  prefetching: boolean;
  critical: boolean;
}

export interface ISEOSpec {
  structured: boolean;
  meta: boolean;
  headings: boolean;
  links: boolean;
  images: boolean;
  schema: string[];
}

export interface ITestingSpec {
  unit: boolean;
  integration: boolean;
  visual: boolean;
  accessibility: boolean;
  performance: boolean;
  scenarios: string[];
}

export interface IIntegrationSpec {
  apis: string[];
  services: string[];
  libraries: string[];
  external: string[];
}

export interface ICustomizationSpec {
  themes: boolean;
  variants: string[];
  sizes: string[];
  colors: string[];
  animations: string[];
  responsive: string[];
}

// ========================================
// PAGE SPECIFICATIONS
// ========================================

export interface IPageSpec {
  name: string;
  route: string;
  type: PageType;
  layout: string;
  components: string[];
  data: IDataSpec;
  meta: IMetaSpec;
  performance: IPagePerformanceSpec;
  accessibility: IAccessibilitySpec;
  seo: IPageSEOSpec;
  analytics: IAnalyticsSpec;
  authentication: IAuthSpec;
  internationalization: II18nSpec;
}

export type PageType = 'landing' | 'product' | 'category' | 'detail' | 'form' | 'dashboard' | 'profile' | 'checkout' | 'error' | 'static';

export interface IDataSpec {
  sources: IDataSource[];
  fetching: 'ssg' | 'ssr' | 'csr' | 'isr';
  caching: ICachingSpec;
  validation: IValidationSpec;
  transformation: ITransformationSpec;
}

export interface IDataSource {
  name: string;
  type: 'api' | 'cms' | 'database' | 'file' | 'external';
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  authentication: any;
  params: Record<string, any>;
  body?: any;
  timeout: number;
  retries: number;
}

export interface ICachingSpec {
  strategy: 'no-cache' | 'cache-first' | 'network-first' | 'stale-while-revalidate';
  ttl: number;
  tags: string[];
  vary: string[];
}

export interface IValidationSpec {
  schema: any;
  sanitization: boolean;
  transformation: boolean;
  errorHandling: string;
}

export interface ITransformationSpec {
  normalize: boolean;
  filter: boolean;
  sort: boolean;
  paginate: boolean;
  aggregate: boolean;
  custom: string[];
}

export interface IMetaSpec {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  robots: string;
  openGraph: IOpenGraphSpec;
  twitter: ITwitterSpec;
  jsonLd: any[];
}

export interface IOpenGraphSpec {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  siteName: string;
  locale: string;
}

export interface ITwitterSpec {
  card: string;
  site: string;
  creator: string;
  title: string;
  description: string;
  image: string;
}

export interface IPagePerformanceSpec {
  priority: 'high' | 'medium' | 'low';
  prefetch: boolean;
  preload: string[];
  critical: boolean;
  streaming: boolean;
  compression: boolean;
  optimization: string[];
}

export interface IPageSEOSpec {
  structured: boolean;
  breadcrumbs: boolean;
  pagination: boolean;
  canonical: boolean;
  alternates: string[];
  sitemap: boolean;
  robots: boolean;
}

export interface IAnalyticsSpec {
  pageView: boolean;
  events: IAnalyticsEvent[];
  conversion: IConversionSpec[];
  audiences: string[];
  experiments: IExperimentSpec[];
}

export interface IAnalyticsEvent {
  name: string;
  trigger: string;
  parameters: Record<string, any>;
  value?: number;
  currency?: string;
}

export interface IConversionSpec {
  name: string;
  goal: string;
  value: number;
  currency: string;
  funnel: string[];
}

export interface IExperimentSpec {
  name: string;
  variants: string[];
  traffic: number;
  metrics: string[];
  duration: number;
}

export interface IAuthSpec {
  required: boolean;
  roles: string[];
  permissions: string[];
  redirect: string;
  fallback: string;
}

export interface II18nSpec {
  enabled: boolean;
  locales: string[];
  defaultLocale: string;
  fallback: string;
  namespaces: string[];
  detection: boolean;
}

// ========================================
// API SPECIFICATIONS
// ========================================

export interface IAPISpec {
  name: string;
  route: string;
  method: HTTPMethod;
  type: APIType;
  authentication: IAPIAuthSpec;
  validation: IAPIValidationSpec;
  processing: IAPIProcessingSpec;
  response: IAPIResponseSpec;
  error: IAPIErrorSpec;
  rate: IRateLimitSpec;
  caching: ICachingSpec;
  monitoring: IAPIMonitoringSpec;
  documentation: IAPIDocumentationSpec;
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
export type APIType = 'rest' | 'graphql' | 'trpc' | 'webhook' | 'sse' | 'websocket';

export interface IAPIAuthSpec {
  required: boolean;
  methods: string[];
  scopes: string[];
  roles: string[];
  rateLimit: boolean;
}

export interface IAPIValidationSpec {
  input: {
    body?: any;
    query?: any;
    params?: any;
    headers?: any;
  };
  sanitization: boolean;
  transformation: boolean;
  strict: boolean;
}

export interface IAPIProcessingSpec {
  database: boolean;
  external: IExternalServiceSpec[];
  background: boolean;
  transaction: boolean;
  idempotent: boolean;
  timeout: number;
}

export interface IExternalServiceSpec {
  name: string;
  type: string;
  endpoint: string;
  authentication: any;
  timeout: number;
  retries: number;
  fallback: boolean;
}

export interface IAPIResponseSpec {
  format: 'json' | 'xml' | 'text' | 'binary' | 'stream';
  structure: any;
  compression: boolean;
  streaming: boolean;
  pagination: boolean;
  headers: Record<string, string>;
}

export interface IAPIErrorSpec {
  codes: Record<number, string>;
  format: any;
  logging: boolean;
  monitoring: boolean;
  recovery: boolean;
}

export interface IRateLimitSpec {
  enabled: boolean;
  requests: number;
  window: number;
  burst: number;
  strategy: 'fixed' | 'sliding' | 'token-bucket';
}

export interface IAPIMonitoringSpec {
  metrics: boolean;
  logging: boolean;
  tracing: boolean;
  alerts: boolean;
  health: boolean;
}

export interface IAPIDocumentationSpec {
  openapi: boolean;
  examples: boolean;
  postman: boolean;
  sdk: boolean;
  changelog: boolean;
}

// ========================================
// TESTING INTERFACES
// ========================================

export interface ITestResults {
  id: string;
  projectId: string;
  timestamp: Date;
  duration: number;
  status: TestStatus;
  summary: ITestSummary;
  suites: ITestSuite[];
  coverage: ITestCoverage;
  performance: ITestPerformance;
  accessibility: ITestAccessibility;
  visual: ITestVisual;
  security: ITestSecurity;
  issues: ITestIssue[];
  artifacts: ITestArtifact[];
}

export type TestStatus = 'pending' | 'running' | 'passed' | 'failed' | 'cancelled' | 'timeout';

export interface ITestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  pending: number;
  duration: number;
  coverage: number;
  successRate: number;
}

export interface ITestSuite {
  name: string;
  type: TestSuiteType;
  status: TestStatus;
  duration: number;
  tests: ITestCase[];
  setup: string[];
  teardown: string[];
  before: string[];
  after: string[];
}

export type TestSuiteType = 'unit' | 'integration' | 'e2e' | 'visual' | 'performance' | 'accessibility' | 'security' | 'load' | 'smoke';

export interface ITestCase {
  name: string;
  status: TestStatus;
  duration: number;
  error?: ITestError;
  steps: ITestStep[];
  assertions: ITestAssertion[];
  metadata: any;
}

export interface ITestError {
  message: string;
  stack: string;
  type: string;
  expected?: any;
  actual?: any;
  diff?: string;
}

export interface ITestStep {
  name: string;
  status: TestStatus;
  duration: number;
  screenshot?: string;
  video?: string;
  logs: string[];
}

export interface ITestAssertion {
  description: string;
  passed: boolean;
  expected: any;
  actual: any;
  message?: string;
}

export interface ITestCoverage {
  statements: ICoverageData;
  branches: ICoverageData;
  functions: ICoverageData;
  lines: ICoverageData;
  files: Record<string, IFileCoverage>;
}

export interface ICoverageData {
  total: number;
  covered: number;
  skipped: number;
  percentage: number;
}

export interface IFileCoverage {
  path: string;
  statements: ICoverageData;
  branches: ICoverageData;
  functions: ICoverageData;
  lines: ICoverageData;
  uncoveredLines: number[];
}

export interface ITestPerformance {
  lighthouse: any;
  webVitals: any;
  loadTimes: Record<string, number>;
  memoryUsage: number;
  cpuUsage: number;
  networkRequests: number;
  bundleSize: number;
}

export interface ITestAccessibility {
  score: number;
  violations: IAccessibilityViolation[];
  passes: number;
  incomplete: number;
  inapplicable: number;
}

export interface IAccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  tags: string[];
  description: string;
  help: string;
  helpUrl: string;
  nodes: IAccessibilityNode[];
}

export interface IAccessibilityNode {
  html: string;
  target: string[];
  failureSummary: string;
  fixes: string[];
}

export interface ITestVisual {
  comparisons: IVisualComparison[];
  differences: number;
  threshold: number;
  passed: boolean;
}

export interface IVisualComparison {
  name: string;
  baseline: string;
  actual: string;
  diff?: string;
  passed: boolean;
  difference: number;
  threshold: number;
}

export interface ITestSecurity {
  vulnerabilities: ISecurityVulnerability[];
  secrets: ISecuritySecret[];
  compliance: IComplianceCheck[];
  score: number;
}

export interface ISecurityVulnerability {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  title: string;
  description: string;
  file: string;
  line?: number;
  fix?: string;
  references: string[];
}

export interface ISecuritySecret {
  type: string;
  file: string;
  line: number;
  content: string;
  confidence: number;
}

export interface IComplianceCheck {
  standard: string;
  rule: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  file?: string;
  line?: number;
}

export interface ITestIssue {
  id: string;
  type: string;
  severity: string;
  message: string;
  file: string;
  line?: number;
  suggestion?: string;
}

export interface ITestArtifact {
  name: string;
  type: 'screenshot' | 'video' | 'log' | 'report' | 'trace' | 'har';
  path: string;
  size: number;
  contentType: string;
  description?: string;
}

// ========================================
// DEPLOYMENT INTERFACES
// ========================================

export interface IDeploymentInfo {
  id: string;
  projectId: string;
  environment: string;
  status: DeploymentStatus;
  version: string;
  commit: string;
  branch: string;
  url: string;
  domains: string[];
  timestamp: Date;
  duration: number;
  logs: IDeploymentLog[];
  metrics: IDeploymentMetrics;
  rollback?: IDeploymentRollback;
}

export type DeploymentStatus = 'pending' | 'building' | 'deploying' | 'ready' | 'error' | 'cancelled';

export interface IDeploymentLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source: string;
  metadata?: any;
}

export interface IDeploymentMetrics {
  buildTime: number;
  deployTime: number;
  bundleSize: number;
  functions: number;
  regions: string[];
  performance: IPerformanceMetrics;
  uptime: number;
  availability: number;
}

export interface IDeploymentRollback {
  enabled: boolean;
  previousVersion: string;
  reason: string;
  timestamp: Date;
  automatic: boolean;
}

// ========================================
// HEALTH AND MONITORING INTERFACES
// ========================================

export interface IHealthStatus {
  status: HealthStatusType;
  timestamp: Date;
  uptime: number;
  version: string;
  services: Record<string, IServiceHealth>;
  metrics: ISystemMetrics;
  dependencies: Record<string, IDependencyHealth>;
}

export type HealthStatusType = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

export interface IServiceHealth {
  status: HealthStatusType;
  responseTime: number;
  errorRate: number;
  lastCheck: Date;
  message?: string;
  details?: any;
}

export interface ISystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  requests: number;
  errors: number;
  latency: number;
}

export interface IDependencyHealth {
  name: string;
  type: string;
  status: HealthStatusType;
  responseTime: number;
  lastCheck: Date;
  url?: string;
  version?: string;
}

export interface IModelMetrics {
  name: string;
  version: string;
  requests: number;
  errors: number;
  latency: number;
  tokens: number;
  cost: number;
  accuracy?: number;
  throughput: number;
  uptime: number;
}

// ========================================
// SECURITY INTERFACES
// ========================================

export interface ISecurityReport {
  id: string;
  projectId: string;
  timestamp: Date;
  status: 'clean' | 'warnings' | 'critical';
  score: number;
  vulnerabilities: ISecurityVulnerability[];
  secrets: ISecuritySecret[];
  compliance: IComplianceReport;
  dependencies: IDependencyReport;
  recommendations: ISecurityRecommendation[];
}

export interface IComplianceReport {
  standards: Record<string, IComplianceStandard>;
  overall: number;
  issues: IComplianceIssue[];
}

export interface IComplianceStandard {
  name: string;
  version: string;
  score: number;
  requirements: Record<string, boolean>;
  issues: IComplianceIssue[];
}

export interface IComplianceIssue {
  standard: string;
  requirement: string;
  severity: string;
  message: string;
  file?: string;
  line?: number;
  fix?: string;
}

export interface IDependencyReport {
  total: number;
  outdated: number;
  vulnerable: number;
  deprecated: number;
  dependencies: IDependencyInfo[];
}

export interface IDependencyInfo {
  name: string;
  version: string;
  latest: string;
  vulnerabilities: ISecurityVulnerability[];
  deprecated: boolean;
  license: string;
  size: number;
}

export interface ISecurityRecommendation {
  id: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  effort: string;
  implementation: string;
  resources: string[];
}

export interface ISecurityIssue {
  id: string;
  type: 'vulnerability' | 'secret' | 'compliance' | 'dependency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  file: string;
  line?: number;
  column?: number;
  evidence: string;
  fix?: string;
  references: string[];
  cve?: string;
  cvss?: number;
}

export interface IOWASPReport {
  version: string;
  categories: Record<string, IOWASPCategory>;
  score: number;
  issues: IOWASPIssue[];
}

export interface IOWASPCategory {
  name: string;
  rank: number;
  score: number;
  issues: IOWASPIssue[];
  description: string;
  prevention: string[];
}

export interface IOWASPIssue {
  category: string;
  type: string;
  severity: string;
  description: string;
  location: IIssueLocation;
  fix: string;
  references: string[];
}

// ========================================
// EXPORT ALL INTERFACES
// ========================================

export default {
  // Core
  IMLCodeGenerationEngine,
  IMLModelProvider,
  ICodeOptimizer,
  ITestGenerator,
  ISecurityValidator,
  
  // Configuration
  IMLConfiguration,
  IGitHubCopilotConfig,
  ICodeT5Config,
  ICustomModelsConfig,
  IOptimizationConfig,
  ITestingConfig,
  ISecurityConfig,
  IDeploymentConfig,
  IMonitoringConfig,
  IIntegrationsConfig,
  
  // Request/Response
  ICodeGenerationRequest,
  ICodeGenerationResult,
  IGeneratedProject,
  IGeneratedFile,
  
  // Specifications
  IComponentSpec,
  IPageSpec,
  IAPISpec,
  
  // Testing
  ITestResults,
  ITestSuite,
  ITestCase,
  ITestCoverage,
  
  // Deployment
  IDeploymentInfo,
  
  // Health & Monitoring
  IHealthStatus,
  IModelMetrics,
  
  // Security
  ISecurityReport,
  ISecurityIssue,
  IOWASPReport,
  
  // Metrics
  IGenerationMetrics,
  IQualityMetrics,
  IPerformanceMetrics,
  ISecurityMetrics,
  
  // Types
  ProjectType,
  QualityLevel,
  Framework,
  Language,
  ComponentType,
  PageType,
  APIType,
  TestStatus,
  DeploymentStatus,
  HealthStatusType
};