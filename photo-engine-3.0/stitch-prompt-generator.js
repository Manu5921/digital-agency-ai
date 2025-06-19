/**
 * STITCH PROMPT GENERATOR
 * Transforme le questionnaire de personnalité de marque en prompt optimisé pour Google Stitch
 */

class StitchPromptGenerator {
    constructor() {
        this.name = "Stitch Prompt Generator v1.0";
        this.maxPromptLength = 2000; // Limite Stitch
    }

    /**
     * GÉNÉRATEUR PRINCIPAL
     * Transforme les réponses du formulaire en prompt Stitch optimisé
     */
    generateStitchPrompt(formData, uploadedImage = null) {
        console.log('🎨 Génération prompt Stitch pour:', formData.companyName);

        const prompt = this.buildStructuredPrompt(formData, uploadedImage);
        
        return {
            prompt: this.optimizePromptLength(prompt),
            metadata: {
                company: formData.companyName,
                sector: formData.businessSector,
                timestamp: new Date().toISOString(),
                hasImage: !!uploadedImage
            }
        };
    }

    /**
     * CONSTRUCTION DU PROMPT STRUCTURÉ
     */
    buildStructuredPrompt(data, image) {
        const sections = [];

        // 1. BRIEF PRINCIPAL
        sections.push(this.buildMainBrief(data));

        // 2. STYLE VISUEL
        sections.push(this.buildVisualStyle(data));

        // 3. CONTENU & STRUCTURE
        sections.push(this.buildContentStructure(data));

        // 4. SPÉCIFICATIONS TECHNIQUES
        sections.push(this.buildTechnicalSpecs(data));

        // 5. RÉFÉRENCE IMAGE (si fournie)
        if (image) {
            sections.push(this.buildImageReference(data, image));
        }

        return sections.join('\n\n');
    }

    /**
     * 1. BRIEF PRINCIPAL
     */
    buildMainBrief(data) {
        const personality = this.extractPersonality(data);
        const target = this.extractTargetAudience(data);

        return `CREATE A ${data.websiteObjective?.toUpperCase() || 'PROFESSIONAL'} WEBSITE FOR ${data.companyName?.toUpperCase()}

BUSINESS CONTEXT:
- Sector: ${data.businessSector}
- Mission: ${this.truncate(data.mission, 100)}
- Unique Value: ${this.truncate(data.differentiation, 100)}

BRAND PERSONALITY: ${personality}
TARGET AUDIENCE: ${target}`;
    }

    /**
     * 2. STYLE VISUEL
     */
    buildVisualStyle(data) {
        const colors = this.processColors(data);
        const typography = this.processTypography(data);
        const imageStyle = this.processImageStyle(data);

        return `VISUAL DESIGN:
- Color Palette: ${colors}
- Typography: ${typography}
- Image Style: ${imageStyle}
- Overall Mood: ${this.extractMood(data)}`;
    }

    /**
     * 3. CONTENU & STRUCTURE
     */
    buildContentStructure(data) {
        const sections = this.determineSections(data);
        const tone = this.extractToneOfVoice(data);

        return `CONTENT & STRUCTURE:
- Required Sections: ${sections.join(', ')}
- Tone of Voice: ${tone}
- Key Message: "${this.truncate(data.pitch, 150)}"
- Call-to-Action: ${this.generateCTA(data)}`;
    }

    /**
     * 4. SPÉCIFICATIONS TECHNIQUES
     */
    buildTechnicalSpecs(data) {
        return `TECHNICAL REQUIREMENTS:
- Layout: Modern, responsive design
- Navigation: Intuitive, mobile-first
- Performance: Fast loading, optimized images
- Accessibility: WCAG compliant
- Framework: Clean HTML/CSS/JS ready for Next.js integration`;
    }

    /**
     * 5. RÉFÉRENCE IMAGE
     */
    buildImageReference(data, image) {
        return `IMAGE REFERENCE:
Use the uploaded image as primary visual inspiration. Incorporate its aesthetic elements, color harmony, and style into the overall design while maintaining consistency with the brand personality described above.`;
    }

    /**
     * UTILITAIRES D'EXTRACTION
     */
    extractPersonality(data) {
        const adjectives = data.personalityAdjectives || [];
        const feeling = data.customerFeeling || '';
        
        return `${adjectives.join(', ')}${feeling ? ` - makes customers feel ${feeling}` : ''}`;
    }

    extractTargetAudience(data) {
        const audience = data.targetCustomers || '';
        const problem = data.customerProblem || '';
        
        return `${this.truncate(audience, 80)}${problem ? ` seeking ${this.truncate(problem, 60)}` : ''}`;
    }

    extractMood(data) {
        const tones = {
            'Amical et accessible': 'friendly and approachable',
            'Expert et formel': 'expert and formal',
            'Inspirant et motivant': 'inspiring and motivating',
            'Ludique et décalé': 'playful and creative',
            'Sérieux et factuel': 'serious and factual',
            'Technique et précis': 'technical and precise',
            'Simple et direct': 'simple and direct'
        };

        return tones[data.toneOfVoice] || 'professional and trustworthy';
    }

    extractToneOfVoice(data) {
        const tone = data.toneOfVoice || 'Professional';
        const avoid = data.avoidWords ? ` (avoid: ${data.avoidWords})` : '';
        
        return `${tone}${avoid}`;
    }

    processColors(data) {
        const preferred = data.preferredColors || '';
        const avoid = data.avoidColors || '';
        
        let colorText = preferred;
        if (avoid) colorText += ` (avoid ${avoid})`;
        
        return colorText || 'Brand-appropriate colors';
    }

    processTypography(data) {
        const fontStyle = data.fontStyle || 'Modern and clean';
        return fontStyle;
    }

    processImageStyle(data) {
        const imageStyle = data.imageStyle || 'Professional and authentic';
        return Array.isArray(imageStyle) ? imageStyle.join(', ') : imageStyle;
    }

    determineSections(data) {
        const objectives = data.websiteObjective || '';
        
        // Sections par défaut basées sur l'objectif
        const sectionMap = {
            'prospects': ['Hero', 'Services', 'About', 'Testimonials', 'Contact'],
            'vente': ['Hero', 'Products', 'Features', 'Pricing', 'Checkout'],
            'information': ['Hero', 'About', 'Services', 'Blog', 'Contact'],
            'notoriété': ['Hero', 'About', 'Values', 'Team', 'Awards', 'Contact'],
            'communauté': ['Hero', 'Community', 'Events', 'Forum', 'Contact'],
            'recrutement': ['Hero', 'Company', 'Jobs', 'Culture', 'Benefits', 'Apply']
        };

        // Trouve la section correspondante ou utilise par défaut
        for (const [key, sections] of Object.entries(sectionMap)) {
            if (objectives.toLowerCase().includes(key)) {
                return sections;
            }
        }

        return ['Hero', 'About', 'Services', 'Contact']; // Défaut
    }

    generateCTA(data) {
        const objective = data.websiteObjective || '';
        
        const ctaMap = {
            'prospects': 'Contact Us / Get Quote',
            'vente': 'Shop Now / Add to Cart',
            'information': 'Learn More / Download',
            'notoriété': 'Discover More / Follow Us',
            'communauté': 'Join Community / Sign Up',
            'recrutement': 'Apply Now / View Jobs'
        };

        for (const [key, cta] of Object.entries(ctaMap)) {
            if (objective.toLowerCase().includes(key)) {
                return cta;
            }
        }

        return 'Get Started';
    }

    /**
     * OPTIMISATION LONGUEUR
     */
    optimizePromptLength(prompt) {
        if (prompt.length <= this.maxPromptLength) {
            return prompt;
        }

        console.warn(`⚠️ Prompt trop long (${prompt.length} chars), optimisation...`);
        
        // Techniques d'optimisation
        let optimized = prompt
            .replace(/\n\n+/g, '\n\n') // Supprime lignes vides multiples
            .replace(/\s+/g, ' ') // Normalise espaces
            .trim();

        // Si encore trop long, tronque intelligemment
        if (optimized.length > this.maxPromptLength) {
            optimized = optimized.substring(0, this.maxPromptLength - 50) + '...';
        }

        return optimized;
    }

    /**
     * UTILITAIRES
     */
    truncate(text, maxLength) {
        if (!text || text.length <= maxLength) return text || '';
        return text.substring(0, maxLength - 3) + '...';
    }

    /**
     * VALIDATION DU FORMULAIRE
     */
    validateFormData(data) {
        const required = ['companyName', 'businessSector'];
        const missing = required.filter(field => !data[field]);
        
        if (missing.length > 0) {
            throw new Error(`Champs obligatoires manquants: ${missing.join(', ')}`);
        }

        return true;
    }

    /**
     * GÉNÉRATION AVEC VALIDATION
     */
    generatePromptSafely(formData, uploadedImage = null) {
        try {
            this.validateFormData(formData);
            return this.generateStitchPrompt(formData, uploadedImage);
        } catch (error) {
            console.error('❌ Erreur génération prompt:', error.message);
            return {
                error: error.message,
                fallbackPrompt: this.generateFallbackPrompt(formData)
            };
        }
    }

    generateFallbackPrompt(data) {
        return `Create a professional website for ${data.companyName || 'the business'} in the ${data.businessSector || 'services'} sector. Design should be modern, clean, and user-friendly with appropriate sections for a business website.`;
    }
}

export { StitchPromptGenerator };

/**
 * EXEMPLE D'UTILISATION
 */
/*
const generator = new StitchPromptGenerator();

const formData = {
    companyName: "Cabinet Dubois",
    businessSector: "Avocat",
    mission: "Accompagner nos clients dans tous leurs besoins juridiques",
    pitch: "Cabinet d'avocat expert en droit des affaires et famille",
    personalityAdjectives: ["Professionnel", "Fiable", "Expert"],
    customerFeeling: "En confiance",
    toneOfVoice: "Expert et formel",
    preferredColors: "Bleu marine, doré",
    fontStyle: "Classique et élégant",
    websiteObjective: "Générer des prospects"
};

const result = generator.generatePromptSafely(formData);
console.log(result.prompt);
*/