"use strict";
/**
 * ML Code Generation Interfaces
 * Interfaces TypeScript complètes pour le système ML de génération de code
 *
 * @version 2.0.0
 * @author Digital Agency AI - WebDev Agent
 * @description Types et interfaces pour l'architecture enterprise ML
 */
Object.defineProperty(exports, "__esModule", { value: true });
// ========================================
// EXPORT ALL INTERFACES
// ========================================
exports.default = {
    // Core
    IMLCodeGenerationEngine: IMLCodeGenerationEngine,
    IMLModelProvider: IMLModelProvider,
    ICodeOptimizer: ICodeOptimizer,
    ITestGenerator: ITestGenerator,
    ISecurityValidator: ISecurityValidator,
    // Configuration
    IMLConfiguration: IMLConfiguration,
    IGitHubCopilotConfig: IGitHubCopilotConfig,
    ICodeT5Config: ICodeT5Config,
    ICustomModelsConfig: ICustomModelsConfig,
    IOptimizationConfig: IOptimizationConfig,
    ITestingConfig: ITestingConfig,
    ISecurityConfig: ISecurityConfig,
    IDeploymentConfig: IDeploymentConfig,
    IMonitoringConfig: IMonitoringConfig,
    IIntegrationsConfig: IIntegrationsConfig,
    // Request/Response
    ICodeGenerationRequest: ICodeGenerationRequest,
    ICodeGenerationResult: ICodeGenerationResult,
    IGeneratedProject: IGeneratedProject,
    IGeneratedFile: IGeneratedFile,
    // Specifications
    IComponentSpec: IComponentSpec,
    IPageSpec: IPageSpec,
    IAPISpec: IAPISpec,
    // Testing
    ITestResults: ITestResults,
    ITestSuite: ITestSuite,
    ITestCase: ITestCase,
    ITestCoverage: ITestCoverage,
    // Deployment
    IDeploymentInfo: IDeploymentInfo,
    // Health & Monitoring
    IHealthStatus: IHealthStatus,
    IModelMetrics: IModelMetrics,
    // Security
    ISecurityReport: ISecurityReport,
    ISecurityIssue: ISecurityIssue,
    IOWASPReport: IOWASPReport,
    // Metrics
    IGenerationMetrics: IGenerationMetrics,
    IQualityMetrics: IQualityMetrics,
    IPerformanceMetrics: IPerformanceMetrics,
    ISecurityMetrics: ISecurityMetrics,
    // Types
    ProjectType: ProjectType,
    QualityLevel: QualityLevel,
    Framework: Framework,
    Language: Language,
    ComponentType: ComponentType,
    PageType: PageType,
    APIType: APIType,
    TestStatus: TestStatus,
    DeploymentStatus: DeploymentStatus,
    HealthStatusType: HealthStatusType
};
