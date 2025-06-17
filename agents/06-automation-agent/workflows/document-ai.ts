/**
 * Document AI - Phase 2
 * Analyse de contrats automatisée avec extraction d'informations structurées
 * 
 * Features:
 * - OCR avancé avec Google Vision AI
 * - Analyse de contrats avec GPT-4
 * - Extraction d'entités structurées
 * - Classification automatique de documents
 * - Validation juridique automatique
 * - Détection d'anomalies et alertes
 * - Export en formats multiples (JSON, Excel, PDF)
 */

import { GoogleAuth } from 'google-auth-library';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { OpenAI } from 'openai';
import * as XLSX from 'xlsx';
import * as PDFDocument from 'pdfkit';

export interface DocumentAIConfig {
  googleVision: {
    projectId: string;
    keyFilename: string;
    location: string;
  };
  openai: {
    apiKey: string;
    model: 'gpt-4o' | 'gpt-4-turbo';
    temperature: number;
  };
  storage: {
    inputPath: string;
    outputPath: string;
    tempPath: string;
  };
  validation: {
    strictMode: boolean;
    requiredFields: string[];
    alertThresholds: {
      confidenceMin: number;
      anomalyScore: number;
    };
  };
  notifications: {
    webhookUrl: string;
    emailNotifications: boolean;
    slackWebhook: string;
  };
}

export interface DocumentAnalysis {
  documentId: string;
  filename: string;
  type: DocumentType;
  confidence: number;
  extractedData: ExtractedData;
  structuredInfo: StructuredContractInfo;
  validation: ValidationResult;
  anomalies: Anomaly[];
  metadata: DocumentMetadata;
  processingTime: number;
  createdAt: Date;
}

export interface DocumentType {
  category: 'contract' | 'invoice' | 'receipt' | 'legal' | 'agreement' | 'certificate' | 'other';
  subtype: string;
  confidence: number;
  language: 'fr' | 'en' | 'es' | 'de' | 'auto';
}

export interface ExtractedData {
  rawText: string;
  pages: PageData[];
  entities: EntityData[];
  tables: TableData[];
  signatures: SignatureData[];
  stamps: StampData[];
}

export interface PageData {
  pageNumber: number;
  text: string;
  confidence: number;
  boundingBoxes: BoundingBox[];
  layout: LayoutInfo;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  confidence: number;
}

export interface LayoutInfo {
  paragraphs: number;
  tables: number;
  signatures: number;
  headers: string[];
  footers: string[];
}

export interface EntityData {
  type: 'person' | 'organization' | 'date' | 'amount' | 'address' | 'phone' | 'email' | 'custom';
  value: string;
  confidence: number;
  position: BoundingBox;
  context: string;
}

export interface TableData {
  id: string;
  rows: number;
  columns: number;
  headers: string[];
  data: string[][];
  confidence: number;
  position: BoundingBox;
}

export interface SignatureData {
  id: string;
  type: 'handwritten' | 'digital' | 'stamp';
  position: BoundingBox;
  confidence: number;
  verified: boolean;
}

export interface StampData {
  id: string;
  text: string;
  type: 'official' | 'company' | 'notary' | 'court';
  position: BoundingBox;
  confidence: number;
}

export interface StructuredContractInfo {
  parties: ContractParty[];
  contractType: string;
  effectiveDate: Date | null;
  expirationDate: Date | null;
  value: ContractValue | null;
  terms: ContractTerm[];
  obligations: Obligation[];
  penalties: Penalty[];
  terminationConditions: string[];
  governing_law: string | null;
  jurisdiction: string | null;
}

export interface ContractParty {
  role: 'client' | 'provider' | 'contractor' | 'vendor' | 'landlord' | 'tenant' | 'other';
  name: string;
  type: 'individual' | 'company' | 'organization';
  address: string | null;
  contact: {
    email: string | null;
    phone: string | null;
    representative: string | null;
  };
  legalId: string | null; // SIRET, SIREN, etc.
}

export interface ContractValue {
  amount: number;
  currency: string;
  type: 'fixed' | 'variable' | 'hourly' | 'monthly' | 'annual';
  paymentTerms: string;
  penalties: string | null;
}

export interface ContractTerm {
  id: string;
  category: 'payment' | 'delivery' | 'performance' | 'confidentiality' | 'liability' | 'other';
  title: string;
  description: string;
  mandatory: boolean;
  deadline: Date | null;
}

export interface Obligation {
  party: string;
  description: string;
  deadline: Date | null;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
}

export interface Penalty {
  condition: string;
  amount: number | null;
  percentage: number | null;
  description: string;
}

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0-100
  issues: ValidationIssue[];
  recommendations: string[];
  legalCompliance: ComplianceCheck;
}

export interface ValidationIssue {
  type: 'missing_field' | 'invalid_format' | 'inconsistency' | 'legal_issue' | 'anomaly';
  severity: 'critical' | 'warning' | 'info';
  field: string;
  message: string;
  suggestion: string | null;
}

export interface ComplianceCheck {
  gdpr: boolean;
  commercialLaw: boolean;
  laborLaw: boolean;
  issues: string[];
  recommendations: string[];
}

export interface Anomaly {
  type: 'unusual_amount' | 'date_inconsistency' | 'missing_signature' | 'duplicate_clause' | 'formatting_error';
  severity: 'high' | 'medium' | 'low';
  description: string;
  confidence: number;
  suggestion: string;
}

export interface DocumentMetadata {
  size: number;
  format: string;
  pages: number;
  language: string;
  created: Date;
  modified: Date | null;
  author: string | null;
  title: string | null;
  keywords: string[];
  processingVersion: string;
}

export class DocumentAI {
  private config: DocumentAIConfig;
  private visionClient: ImageAnnotatorClient;
  private openai: OpenAI;
  private documentCache: Map<string, DocumentAnalysis> = new Map();

  constructor(config: DocumentAIConfig) {
    this.config = config;
    this.visionClient = new ImageAnnotatorClient({
      projectId: config.googleVision.projectId,
      keyFilename: config.googleVision.keyFilename
    });
    this.openai = new OpenAI({ apiKey: config.openai.apiKey });
  }

  /**
   * Analyse complète d'un document
   */
  async analyzeDocument(
    filePath: string,
    options: {
      type?: string;
      strictValidation?: boolean;
      extractTables?: boolean;
      detectSignatures?: boolean;
    } = {}
  ): Promise<DocumentAnalysis> {
    const startTime = Date.now();
    const documentId = this.generateDocumentId();

    try {
      console.log(`[DocumentAI] Début d'analyse: ${filePath}`);

      // 1. Extraction OCR avec Google Vision
      const extractedData = await this.performOCR(filePath, options);

      // 2. Classification du document
      const documentType = await this.classifyDocument(extractedData.rawText);

      // 3. Analyse structurée avec GPT-4
      const structuredInfo = await this.analyzeWithGPT4(extractedData, documentType);

      // 4. Validation et vérification
      const validation = await this.validateDocument(structuredInfo, extractedData);

      // 5. Détection d'anomalies
      const anomalies = await this.detectAnomalies(structuredInfo, extractedData);

      // 6. Métadonnées
      const metadata = await this.extractMetadata(filePath);

      const analysis: DocumentAnalysis = {
        documentId,
        filename: filePath.split('/').pop() || 'unknown',
        type: documentType,
        confidence: this.calculateOverallConfidence(extractedData, structuredInfo, validation),
        extractedData,
        structuredInfo,
        validation,
        anomalies,
        metadata,
        processingTime: Date.now() - startTime,
        createdAt: new Date()
      };

      // Cache et sauvegarde
      this.documentCache.set(documentId, analysis);
      await this.saveAnalysis(analysis);

      // Notifications si nécessaire
      await this.handleNotifications(analysis);

      console.log(`[DocumentAI] Analyse terminée: ${analysis.processingTime}ms`);
      return analysis;

    } catch (error) {
      console.error('[DocumentAI] Erreur analyse:', error);
      throw new Error(`Impossible d'analyser le document: ${error.message}`);
    }
  }

  /**
   * OCR avec Google Vision AI
   */
  private async performOCR(
    filePath: string,
    options: any
  ): Promise<ExtractedData> {
    try {
      // Lecture du fichier
      const [result] = await this.visionClient.documentTextDetection(filePath);
      const fullTextAnnotation = result.fullTextAnnotation;

      if (!fullTextAnnotation) {
        throw new Error('Aucun texte détecté dans le document');
      }

      const pages: PageData[] = [];
      const entities: EntityData[] = [];
      const tables: TableData[] = [];
      const signatures: SignatureData[] = [];
      const stamps: StampData[] = [];

      // Traitement des pages
      if (fullTextAnnotation.pages) {
        for (let i = 0; i < fullTextAnnotation.pages.length; i++) {
          const page = fullTextAnnotation.pages[i];
          const pageData = await this.processPage(page, i + 1);
          pages.push(pageData);
        }
      }

      // Extraction d'entités
      const extractedEntities = await this.extractEntities(fullTextAnnotation.text || '');
      entities.push(...extractedEntities);

      // Détection de tableaux si demandée
      if (options.extractTables) {
        const extractedTables = await this.extractTables(filePath);
        tables.push(...extractedTables);
      }

      // Détection de signatures si demandée
      if (options.detectSignatures) {
        const detectedSignatures = await this.detectSignatures(filePath);
        signatures.push(...detectedSignatures);
      }

      return {
        rawText: fullTextAnnotation.text || '',
        pages,
        entities,
        tables,
        signatures,
        stamps
      };

    } catch (error) {
      console.error('Erreur OCR:', error);
      throw new Error(`Erreur OCR: ${error.message}`);
    }
  }

  /**
   * Traitement d'une page
   */
  private async processPage(page: any, pageNumber: number): Promise<PageData> {
    const blocks = page.blocks || [];
    let pageText = '';
    const boundingBoxes: BoundingBox[] = [];
    
    for (const block of blocks) {
      for (const paragraph of block.paragraphs || []) {
        for (const word of paragraph.words || []) {
          const wordText = word.symbols?.map((s: any) => s.text).join('') || '';
          pageText += wordText + ' ';
          
          if (word.boundingBox) {
            boundingBoxes.push({
              x: word.boundingBox.vertices[0].x || 0,
              y: word.boundingBox.vertices[0].y || 0,
              width: (word.boundingBox.vertices[2].x || 0) - (word.boundingBox.vertices[0].x || 0),
              height: (word.boundingBox.vertices[2].y || 0) - (word.boundingBox.vertices[0].y || 0),
              text: wordText,
              confidence: word.confidence || 0.5
            });
          }
        }
      }
    }

    return {
      pageNumber,
      text: pageText.trim(),
      confidence: page.confidence || 0.5,
      boundingBoxes,
      layout: {
        paragraphs: blocks.length,
        tables: 0, // À calculer
        signatures: 0, // À calculer
        headers: [],
        footers: []
      }
    };
  }

  /**
   * Classification du document avec GPT-4
   */
  private async classifyDocument(text: string): Promise<DocumentType> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.config.openai.model,
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en classification de documents juridiques et commerciaux. 
            Analyse le texte fourni et détermine:
            1. La catégorie principale du document
            2. Le sous-type spécifique
            3. La langue principale
            4. Ton niveau de confiance (0-1)
            
            Réponds uniquement en JSON avec cette structure:
            {
              "category": "contract|invoice|receipt|legal|agreement|certificate|other",
              "subtype": "description_specific",
              "language": "fr|en|es|de|auto",
              "confidence": 0.95
            }`
          },
          {
            role: 'user',
            content: `Classe ce document:\n\n${text.substring(0, 2000)}...`
          }
        ],
        temperature: 0.1,
        max_tokens: 200
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return {
        category: result.category || 'other',
        subtype: result.subtype || 'unknown',
        confidence: result.confidence || 0.5,
        language: result.language || 'auto'
      };

    } catch (error) {
      console.error('Erreur classification:', error);
      return {
        category: 'other',
        subtype: 'unknown',
        confidence: 0.1,
        language: 'auto'
      };
    }
  }

  /**
   * Analyse structurée avec GPT-4
   */
  private async analyzeWithGPT4(
    extractedData: ExtractedData,
    documentType: DocumentType
  ): Promise<StructuredContractInfo> {
    try {
      const systemPrompt = this.getAnalysisPrompt(documentType.category);
      
      const completion = await this.openai.chat.completions.create({
        model: this.config.openai.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Analyse ce document et extrais les informations structurées:

TEXTE DU DOCUMENT:
${extractedData.rawText}

ENTITÉS DÉTECTÉES:
${extractedData.entities.map(e => `${e.type}: ${e.value}`).join('\n')}

Réponds uniquement avec un JSON valide selon le schéma défini.`
          }
        ],
        temperature: 0.1,
        max_tokens: 2000
      });

      const analysisText = completion.choices[0].message.content || '{}';
      const analysis = JSON.parse(analysisText);

      return this.normalizeContractInfo(analysis);

    } catch (error) {
      console.error('Erreur analyse GPT-4:', error);
      return this.getEmptyContractInfo();
    }
  }

  /**
   * Prompt d'analyse selon le type de document
   */
  private getAnalysisPrompt(category: string): string {
    const basePrompt = `Tu es un expert en analyse de documents juridiques et commerciaux. 
    Extrais les informations structurées du document fourni.`;

    const prompts = {
      contract: `${basePrompt}
      
      Pour les CONTRATS, extrais:
      - Parties contractantes (nom, rôle, adresse, contact)
      - Type de contrat
      - Dates d'effet et d'expiration
      - Valeur et modalités de paiement
      - Termes et conditions principales
      - Obligations de chaque partie
      - Pénalités et clauses particulières
      - Droit applicable et juridiction
      
      Structure JSON attendue:
      {
        "parties": [{"role": "client|provider|other", "name": "", "type": "individual|company", "address": "", "contact": {"email": "", "phone": "", "representative": ""}, "legalId": ""}],
        "contractType": "",
        "effectiveDate": "YYYY-MM-DD",
        "expirationDate": "YYYY-MM-DD",
        "value": {"amount": 0, "currency": "EUR", "type": "fixed|variable", "paymentTerms": "", "penalties": ""},
        "terms": [{"id": "", "category": "payment|delivery|performance", "title": "", "description": "", "mandatory": true, "deadline": ""}],
        "obligations": [{"party": "", "description": "", "deadline": "", "priority": "high|medium|low", "status": "pending"}],
        "penalties": [{"condition": "", "amount": 0, "percentage": 0, "description": ""}],
        "terminationConditions": [""],
        "governing_law": "",
        "jurisdiction": ""
      }`,
      
      invoice: `${basePrompt}
      
      Pour les FACTURES, extrais:
      - Émetteur et destinataire
      - Numéro de facture et date
      - Détail des prestations/produits
      - Montants et taxes
      - Conditions de paiement
      - Références commande`,
      
      legal: `${basePrompt}
      
      Pour les documents JURIDIQUES, extrais:
      - Nature du document
      - Parties impliquées
      - Dates importantes
      - Décisions ou dispositions
      - Références légales`
    };

    return prompts[category] || prompts.contract;
  }

  /**
   * Extraction d'entités personnalisée
   */
  private async extractEntities(text: string): Promise<EntityData[]> {
    const entities: EntityData[] = [];

    // Patterns de reconnaissance
    const patterns = {
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      phone: /(?:\+33|0)[1-9](?:[0-9]{8})/g,
      date: /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g,
      amount: /\d+(?:[,\.]\d{2})?\s*(?:€|EUR|euros?)/g,
      siret: /\d{14}/g,
      address: /\d+[,\s]+(?:rue|avenue|boulevard|place|impasse)[^,\n]+/gi
    };

    Object.entries(patterns).forEach(([type, regex]) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type: type as any,
          value: match[0],
          confidence: 0.8,
          position: {
            x: 0, y: 0, width: 0, height: 0,
            text: match[0],
            confidence: 0.8
          },
          context: this.getContext(text, match.index, 50)
        });
      }
    });

    return entities;
  }

  /**
   * Extraction de tableaux
   */
  private async extractTables(filePath: string): Promise<TableData[]> {
    try {
      // Utilisation de l'API Document AI pour les tableaux
      const [result] = await this.visionClient.documentTextDetection(filePath);
      const tables: TableData[] = [];

      // Simulation d'extraction de tableaux
      // Dans un vrai système, vous utiliseriez Document AI ou une autre solution
      
      return tables;
    } catch (error) {
      console.error('Erreur extraction tableaux:', error);
      return [];
    }
  }

  /**
   * Détection de signatures
   */
  private async detectSignatures(filePath: string): Promise<SignatureData[]> {
    try {
      // Détection de signatures manuscrites
      // Ceci nécessiterait un modèle ML spécialisé
      const signatures: SignatureData[] = [];
      
      return signatures;
    } catch (error) {
      console.error('Erreur détection signatures:', error);
      return [];
    }
  }

  /**
   * Validation du document
   */
  private async validateDocument(
    structuredInfo: StructuredContractInfo,
    extractedData: ExtractedData
  ): Promise<ValidationResult> {
    const issues: ValidationIssue[] = [];
    let score = 100;

    // Validation des champs obligatoires
    if (this.config.validation.requiredFields.includes('parties') && structuredInfo.parties.length === 0) {
      issues.push({
        type: 'missing_field',
        severity: 'critical',
        field: 'parties',
        message: 'Aucune partie contractante identifiée',
        suggestion: 'Vérifiez que les noms et rôles des parties sont clairement mentionnés'
      });
      score -= 30;
    }

    if (this.config.validation.requiredFields.includes('effectiveDate') && !structuredInfo.effectiveDate) {
      issues.push({
        type: 'missing_field',
        severity: 'warning',
        field: 'effectiveDate',
        message: 'Date d\'entrée en vigueur manquante',
        suggestion: 'Ajoutez une date d\'effet claire'
      });
      score -= 15;
    }

    // Validation de cohérence
    if (structuredInfo.effectiveDate && structuredInfo.expirationDate) {
      if (structuredInfo.effectiveDate >= structuredInfo.expirationDate) {
        issues.push({
          type: 'inconsistency',
          severity: 'critical',
          field: 'dates',
          message: 'Date d\'expiration antérieure à la date d\'effet',
          suggestion: 'Vérifiez la cohérence des dates'
        });
        score -= 25;
      }
    }

    // Compliance check
    const legalCompliance = await this.checkLegalCompliance(structuredInfo);

    return {
      isValid: score >= 70,
      score: Math.max(0, score),
      issues,
      recommendations: this.generateRecommendations(issues),
      legalCompliance
    };
  }

  /**
   * Vérification de conformité légale
   */
  private async checkLegalCompliance(info: StructuredContractInfo): Promise<ComplianceCheck> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Vérifications RGPD
    let gdpr = true;
    const hasPersonalData = info.parties.some(p => p.contact.email || p.contact.phone);
    if (hasPersonalData) {
      // Vérifier mentions RGPD
      gdpr = false; // Simplification
      issues.push('Mentions RGPD manquantes pour les données personnelles');
      recommendations.push('Ajouter les mentions RGPD requises');
    }

    // Vérifications droit commercial
    let commercialLaw = true;
    if (info.value && info.value.amount > 10000) {
      // Vérifications pour gros contrats
      if (!info.terminationConditions.length) {
        commercialLaw = false;
        issues.push('Conditions de résiliation manquantes pour contrat > 10k€');
        recommendations.push('Définir clairement les conditions de résiliation');
      }
    }

    return {
      gdpr,
      commercialLaw,
      laborLaw: true, // Simplification
      issues,
      recommendations
    };
  }

  /**
   * Détection d'anomalies
   */
  private async detectAnomalies(
    structuredInfo: StructuredContractInfo,
    extractedData: ExtractedData
  ): Promise<Anomaly[]> {
    const anomalies: Anomaly[] = [];

    // Montant inhabituel
    if (structuredInfo.value && structuredInfo.value.amount > 100000) {
      anomalies.push({
        type: 'unusual_amount',
        severity: 'medium',
        description: `Montant élevé détecté: ${structuredInfo.value.amount}€`,
        confidence: 0.8,
        suggestion: 'Vérifier la cohérence du montant avec le type de prestation'
      });
    }

    // Incohérence de dates
    const today = new Date();
    if (structuredInfo.effectiveDate && structuredInfo.effectiveDate < new Date(today.getFullYear() - 5, 0, 1)) {
      anomalies.push({
        type: 'date_inconsistency',
        severity: 'low',
        description: 'Date d\'effet très ancienne',
        confidence: 0.6,
        suggestion: 'Vérifier si le document est encore valide'
      });
    }

    // Signature manquante
    if (extractedData.signatures.length === 0) {
      anomalies.push({
        type: 'missing_signature',
        severity: 'high',
        description: 'Aucune signature détectée',
        confidence: 0.9,
        suggestion: 'Vérifier que le document est bien signé par toutes les parties'
      });
    }

    return anomalies;
  }

  /**
   * Export en Excel
   */
  async exportToExcel(documentId: string): Promise<string> {
    const analysis = this.documentCache.get(documentId);
    if (!analysis) {
      throw new Error('Document non trouvé');
    }

    const workbook = XLSX.utils.book_new();
    
    // Feuille principale
    const mainData = [
      ['Document', analysis.filename],
      ['Type', `${analysis.type.category} - ${analysis.type.subtype}`],
      ['Confiance', `${Math.round(analysis.confidence * 100)}%`],
      ['Pages', analysis.metadata.pages],
      ['Langue', analysis.type.language],
      ['', ''],
      ['PARTIES CONTRACTANTES', ''],
      ...analysis.structuredInfo.parties.map(p => [p.role, p.name, p.address || '']),
      ['', ''],
      ['INFORMATIONS FINANCIÈRES', ''],
      ['Montant', analysis.structuredInfo.value?.amount || 'N/A'],
      ['Devise', analysis.structuredInfo.value?.currency || 'N/A'],
      ['Type', analysis.structuredInfo.value?.type || 'N/A'],
    ];

    const mainSheet = XLSX.utils.aoa_to_sheet(mainData);
    XLSX.utils.book_append_sheet(workbook, mainSheet, 'Analyse');

    // Feuille validation
    const validationData = [
      ['Statut', analysis.validation.isValid ? 'Valide' : 'Invalide'],
      ['Score', `${analysis.validation.score}/100`],
      ['', ''],
      ['PROBLÈMES IDENTIFIÉS', ''],
      ['Sévérité', 'Champ', 'Message'],
      ...analysis.validation.issues.map(i => [i.severity, i.field, i.message])
    ];

    const validationSheet = XLSX.utils.aoa_to_sheet(validationData);
    XLSX.utils.book_append_sheet(workbook, validationSheet, 'Validation');

    const filename = `${analysis.documentId}_analysis.xlsx`;
    const filepath = `${this.config.storage.outputPath}/${filename}`;
    
    XLSX.writeFile(workbook, filepath);
    return filepath;
  }

  /**
   * Export en PDF de synthèse
   */
  async exportToPDF(documentId: string): Promise<string> {
    const analysis = this.documentCache.get(documentId);
    if (!analysis) {
      throw new Error('Document non trouvé');
    }

    const doc = new PDFDocument();
    const filename = `${analysis.documentId}_report.pdf`;
    const filepath = `${this.config.storage.outputPath}/${filename}`;
    
    doc.pipe(require('fs').createWriteStream(filepath));

    // En-tête
    doc.fontSize(20).text('Rapport d\'Analyse de Document', 50, 50);
    doc.fontSize(12).text(`Document: ${analysis.filename}`, 50, 90);
    doc.text(`Analysé le: ${analysis.createdAt.toLocaleDateString('fr-FR')}`, 50, 110);

    // Informations générales
    doc.fontSize(16).text('Informations Générales', 50, 150);
    doc.fontSize(12)
       .text(`Type: ${analysis.type.category} - ${analysis.type.subtype}`, 70, 180)
       .text(`Confiance: ${Math.round(analysis.confidence * 100)}%`, 70, 200)
       .text(`Pages: ${analysis.metadata.pages}`, 70, 220)
       .text(`Langue: ${analysis.type.language}`, 70, 240);

    // Parties
    if (analysis.structuredInfo.parties.length > 0) {
      doc.fontSize(16).text('Parties Contractantes', 50, 280);
      let y = 310;
      analysis.structuredInfo.parties.forEach(party => {
        doc.fontSize(12)
           .text(`• ${party.role}: ${party.name}`, 70, y)
           .text(`  ${party.address || 'Adresse non spécifiée'}`, 70, y + 15);
        y += 40;
      });
    }

    // Validation
    doc.fontSize(16).text('Validation', 50, y + 20);
    doc.fontSize(12)
       .text(`Statut: ${analysis.validation.isValid ? 'Valide' : 'Invalide'}`, 70, y + 50)
       .text(`Score: ${analysis.validation.score}/100`, 70, y + 70);

    doc.end();
    return filepath;
  }

  /**
   * Utilitaires
   */
  private generateDocumentId(): string {
    return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateOverallConfidence(
    extractedData: ExtractedData,
    structuredInfo: StructuredContractInfo,
    validation: ValidationResult
  ): number {
    const ocrConfidence = extractedData.pages.reduce((sum, p) => sum + p.confidence, 0) / extractedData.pages.length;
    const validationScore = validation.score / 100;
    
    return (ocrConfidence * 0.4) + (validationScore * 0.6);
  }

  private getContext(text: string, index: number, length: number): string {
    const start = Math.max(0, index - length);
    const end = Math.min(text.length, index + length);
    return text.substring(start, end);
  }

  private normalizeContractInfo(analysis: any): StructuredContractInfo {
    return {
      parties: analysis.parties || [],
      contractType: analysis.contractType || 'unknown',
      effectiveDate: analysis.effectiveDate ? new Date(analysis.effectiveDate) : null,
      expirationDate: analysis.expirationDate ? new Date(analysis.expirationDate) : null,
      value: analysis.value || null,
      terms: analysis.terms || [],
      obligations: analysis.obligations || [],
      penalties: analysis.penalties || [],
      terminationConditions: analysis.terminationConditions || [],
      governing_law: analysis.governing_law || null,
      jurisdiction: analysis.jurisdiction || null
    };
  }

  private getEmptyContractInfo(): StructuredContractInfo {
    return {
      parties: [],
      contractType: 'unknown',
      effectiveDate: null,
      expirationDate: null,
      value: null,
      terms: [],
      obligations: [],
      penalties: [],
      terminationConditions: [],
      governing_law: null,
      jurisdiction: null
    };
  }

  private generateRecommendations(issues: ValidationIssue[]): string[] {
    const recommendations = new Set<string>();
    
    issues.forEach(issue => {
      if (issue.suggestion) {
        recommendations.add(issue.suggestion);
      }
    });

    return Array.from(recommendations);
  }

  private async extractMetadata(filePath: string): Promise<DocumentMetadata> {
    const fs = require('fs');
    const stats = fs.statSync(filePath);
    
    return {
      size: stats.size,
      format: filePath.split('.').pop() || 'unknown',
      pages: 1, // À calculer avec PDFtk ou similaire
      language: 'fr',
      created: stats.birthtime,
      modified: stats.mtime,
      author: null,
      title: null,
      keywords: [],
      processingVersion: '2.0.0'
    };
  }

  private async saveAnalysis(analysis: DocumentAnalysis): Promise<void> {
    const fs = require('fs');
    const filepath = `${this.config.storage.outputPath}/${analysis.documentId}.json`;
    
    fs.writeFileSync(filepath, JSON.stringify(analysis, null, 2));
  }

  private async handleNotifications(analysis: DocumentAnalysis): Promise<void> {
    // Alertes pour anomalies critiques
    const criticalAnomalies = analysis.anomalies.filter(a => a.severity === 'high');
    const criticalIssues = analysis.validation.issues.filter(i => i.severity === 'critical');

    if (criticalAnomalies.length > 0 || criticalIssues.length > 0) {
      await this.sendAlert(analysis, [...criticalAnomalies, ...criticalIssues]);
    }
  }

  private async sendAlert(analysis: DocumentAnalysis, alerts: any[]): Promise<void> {
    try {
      if (this.config.notifications.webhookUrl) {
        await fetch(this.config.notifications.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'document_analysis_alert',
            documentId: analysis.documentId,
            filename: analysis.filename,
            alerts: alerts.map(a => ({
              type: a.type || a.severity,
              message: a.description || a.message,
              severity: a.severity
            })),
            timestamp: new Date().toISOString()
          })
        });
      }
    } catch (error) {
      console.error('Erreur envoi alerte:', error);
    }
  }

  /**
   * API publique
   */
  async getAnalysis(documentId: string): Promise<DocumentAnalysis | null> {
    return this.documentCache.get(documentId) || null;
  }

  async listAnalyses(): Promise<DocumentAnalysis[]> {
    return Array.from(this.documentCache.values());
  }

  async deleteAnalysis(documentId: string): Promise<boolean> {
    return this.documentCache.delete(documentId);
  }

  getStats(): {
    totalDocuments: number;
    averageConfidence: number;
    typeDistribution: Record<string, number>;
    validationRate: number;
  } {
    const analyses = Array.from(this.documentCache.values());
    
    return {
      totalDocuments: analyses.length,
      averageConfidence: analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length || 0,
      typeDistribution: analyses.reduce((acc, a) => {
        acc[a.type.category] = (acc[a.type.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      validationRate: analyses.filter(a => a.validation.isValid).length / analyses.length || 0
    };
  }
}

// Configuration par défaut
export const defaultDocumentAIConfig: DocumentAIConfig = {
  googleVision: {
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE || '',
    location: 'europe-west1'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o',
    temperature: 0.1
  },
  storage: {
    inputPath: './documents/input',
    outputPath: './documents/output',
    tempPath: './documents/temp'
  },
  validation: {
    strictMode: true,
    requiredFields: ['parties', 'contractType', 'effectiveDate'],
    alertThresholds: {
      confidenceMin: 0.7,
      anomalyScore: 0.8
    }
  },
  notifications: {
    webhookUrl: process.env.DOCUMENT_AI_WEBHOOK_URL || '',
    emailNotifications: true,
    slackWebhook: process.env.SLACK_WEBHOOK_URL || ''
  }
};

export default DocumentAI;