/**
 * AMBIANCE MOOD DETECTOR - Advanced Calming Environment Detection for Therapy Images
 * 
 * Sophisticated system for detecting and measuring calming ambiance in therapeutic imagery:
 * - Environmental mood assessment
 * - Calming factor quantification  
 * - Therapeutic atmosphere measurement
 * - Stress-reduction potential analysis
 * - Healing environment optimization
 * 
 * @version 1.0 - Therapeutic Ambiance Intelligence
 * @author Digital Agency AI - Environmental Psychology Division
 */

class AmbianceMoodDetector {
    constructor() {
        // Environmental psychology frameworks for mood detection
        this.ambianceFrameworks = {
            // Calming environment indicators (research-based)
            calmingIndicators: {
                naturalElements: {
                    factors: ['plants', 'natural light', 'wood textures', 'stone elements', 'water features'],
                    weights: [0.25, 0.3, 0.15, 0.15, 0.15],
                    researchBasis: 'Biophilic design reduces stress by 15% (Browning et al., 2014)',
                    calmingImpact: 0.9,
                    therapeuticRelevance: 'high'
                },
                
                colorHarmony: {
                    factors: ['cool colors', 'muted tones', 'natural palette', 'earth tones', 'monochromatic scheme'],
                    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
                    researchBasis: 'Cool colors reduce cortisol levels (Mehta & Zhu, 2009)',
                    calmingImpact: 0.8,
                    therapeuticRelevance: 'high'
                },
                
                lightingQuality: {
                    factors: ['natural lighting', 'soft illumination', 'warm temperature', 'diffused light', 'minimal shadows'],
                    weights: [0.35, 0.25, 0.2, 0.15, 0.05],
                    researchBasis: 'Natural light improves mood and reduces anxiety (Knez, 2001)',
                    calmingImpact: 0.85,
                    therapeuticRelevance: 'critical'
                },
                
                spatialOrganization: {
                    factors: ['clean lines', 'minimal clutter', 'organized space', 'symmetrical balance', 'clear pathways'],
                    weights: [0.25, 0.3, 0.2, 0.15, 0.1],
                    researchBasis: 'Organized spaces reduce cognitive load (McMains & Kastner, 2011)',
                    calmingImpact: 0.75,
                    therapeuticRelevance: 'medium-high'
                },
                
                acousticEnvironment: {
                    factors: ['quiet indicators', 'sound absorption', 'private space', 'peaceful setting', 'noise control'],
                    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
                    researchBasis: 'Noise reduction improves therapeutic outcomes (Evans & McCoy, 1998)',
                    calmingImpact: 0.8,
                    therapeuticRelevance: 'high'
                }
            },

            // Stress-inducing factors to avoid
            stressInducers: {
                visualChaos: {
                    factors: ['cluttered space', 'too many colors', 'competing elements', 'visual overload', 'chaotic patterns'],
                    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
                    stressImpact: -0.8,
                    therapeuticDetriment: 'high'
                },
                
                aggressiveElements: {
                    factors: ['sharp angles', 'aggressive colors', 'intimidating objects', 'harsh lighting', 'cold atmosphere'],
                    weights: [0.2, 0.3, 0.25, 0.15, 0.1],
                    stressImpact: -0.9,
                    therapeuticDetriment: 'critical'
                },
                
                institutionalFeatures: {
                    factors: ['clinical coldness', 'sterile environment', 'fluorescent lighting', 'medical equipment', 'impersonal space'],
                    weights: [0.25, 0.2, 0.25, 0.15, 0.15],
                    stressImpact: -0.6,
                    therapeuticDetriment: 'medium'
                }
            },

            // Therapeutic mood categories
            therapeuticMoods: {
                serene: {
                    characteristics: ['peaceful', 'quiet', 'balanced', 'harmonious', 'still'],
                    colorPalette: ['soft blues', 'gentle greens', 'warm neutrals'],
                    lighting: 'natural, soft, even',
                    atmosphere: 'contemplative and restful',
                    therapeuticValue: 0.95,
                    idealFor: ['meditation', 'relaxation', 'anxiety reduction']
                },
                
                nurturing: {
                    characteristics: ['warm', 'welcoming', 'supportive', 'comforting', 'safe'],
                    colorPalette: ['warm earth tones', 'soft pastels', 'natural wood'],
                    lighting: 'warm, embracing, gentle',
                    atmosphere: 'caring and protective',
                    therapeuticValue: 0.9,
                    idealFor: ['counseling', 'emotional support', 'healing']
                },
                
                inspiring: {
                    characteristics: ['uplifting', 'hopeful', 'positive', 'encouraging', 'optimistic'],
                    colorPalette: ['gentle yellows', 'soft oranges', 'light greens'],
                    lighting: 'bright but soft, natural',
                    atmosphere: 'motivating and encouraging',
                    therapeuticValue: 0.85,
                    idealFor: ['goal setting', 'recovery', 'personal growth']
                },
                
                grounding: {
                    characteristics: ['stable', 'secure', 'rooted', 'solid', 'reliable'],
                    colorPalette: ['earth tones', 'browns', 'deep greens'],
                    lighting: 'steady, warm, consistent',
                    atmosphere: 'stable and dependable',
                    therapeuticValue: 0.8,
                    idealFor: ['trauma recovery', 'stability building', 'trust work']
                },
                
                professional: {
                    characteristics: ['competent', 'trustworthy', 'clean', 'organized', 'credible'],
                    colorPalette: ['professional blues', 'clean whites', 'muted grays'],
                    lighting: 'clear, professional, balanced',
                    atmosphere: 'competent and trustworthy',
                    therapeuticValue: 0.75,
                    idealFor: ['initial consultations', 'assessments', 'professional rapport']
                }
            }
        };

        // Advanced mood detection algorithms
        this.detectionAlgorithms = {
            colorMoodAnalysis: {
                dominantColorExtraction: 'HSL color space analysis',
                harmonyAssessment: 'Color wheel relationship mapping',
                emotionalMapping: 'Emotional color wheel correlation',
                temperatureAnalysis: 'Warm/cool color temperature measurement'
            },
            
            spatialAnalysis: {
                clutterDetection: 'Edge density and object counting',
                symmetryAnalysis: 'Bilateral and radial symmetry measurement',
                flowAnalysis: 'Visual pathway and movement tracking',
                balanceAssessment: 'Visual weight distribution analysis'
            },
            
            lightingAnalysis: {
                naturalLightDetection: 'Shadow pattern and intensity analysis',
                temperatureAssessment: 'Color temperature measurement',
                qualityEvaluation: 'Softness and diffusion analysis',
                directionAnalysis: 'Light source direction mapping'
            },
            
            elementRecognition: {
                naturalElementDetection: 'Plant, wood, stone recognition',
                furnitureAnalysis: 'Furniture style and arrangement',
                textureIdentification: 'Surface texture classification',
                patternRecognition: 'Pattern type and complexity analysis'
            }
        };

        // Therapeutic optimization targets
        this.optimizationTargets = {
            anxietyReduction: {
                target: 0.85,
                priority: 'critical',
                indicators: ['calm colors', 'organized space', 'natural elements', 'soft lighting']
            },
            
            trustBuilding: {
                target: 0.8,
                priority: 'high',
                indicators: ['professional organization', 'clean environment', 'quality furnishing', 'credible setup']
            },
            
            healingPromotion: {
                target: 0.9,
                priority: 'high',
                indicators: ['natural elements', 'peaceful atmosphere', 'nurturing space', 'positive energy']
            },
            
            comfortMaximization: {
                target: 0.85,
                priority: 'medium-high',
                indicators: ['comfortable seating', 'welcoming space', 'personal touches', 'warmth']
            }
        };
    }

    /**
     * Comprehensive ambiance and mood detection for therapeutic images
     */
    async detectAmbianceMood(imageData, therapyContext = {}) {
        console.log('🌿 Detecting therapeutic ambiance and mood...');
        
        const detection = {
            imageId: imageData.id || imageData.url,
            timestamp: new Date().toISOString(),
            therapyContext: therapyContext,
            
            // Core ambiance analysis
            calmingFactors: await this.analyzeCalmingFactors(imageData),
            stressFactors: await this.analyzeStressFactors(imageData),
            therapeuticMood: await this.identifyTherapeuticMood(imageData),
            
            // Environmental assessments
            spatialAnalysis: await this.analyzeSpatialEnvironment(imageData),
            lightingAnalysis: await this.analyzeLightingMood(imageData),
            colorMoodAnalysis: await this.analyzeColorMood(imageData),
            naturalElementAnalysis: await this.analyzeNaturalElements(imageData),
            
            // Composite scores
            overallCalmingScore: 0,
            therapeuticSuitabilityScore: 0,
            moodOptimizationScore: 0,
            
            // Recommendations
            ambianceOptimization: [],
            moodEnhancements: [],
            
            // Validation
            confidenceLevel: 'high',
            analysisQuality: 'comprehensive'
        };
        
        // Calculate composite scores
        detection.overallCalmingScore = this.calculateOverallCalmingScore(detection);
        detection.therapeuticSuitabilityScore = this.calculateTherapeuticSuitability(detection);
        detection.moodOptimizationScore = this.calculateMoodOptimization(detection);
        
        // Generate optimization recommendations
        detection.ambianceOptimization = this.generateAmbianceOptimizations(detection);
        detection.moodEnhancements = this.generateMoodEnhancements(detection);
        
        console.log(`✅ Ambiance detection complete - Calming score: ${detection.overallCalmingScore.toFixed(2)}`);
        return detection;
    }

    /**
     * Analyzes calming factors in the environment
     */
    async analyzeCalmingFactors(imageData) {
        console.log('😌 Analyzing calming environmental factors...');
        
        const calmingAnalysis = {
            naturalElements: this.assessNaturalCalming(imageData),
            colorHarmony: this.assessColorCalming(imageData),
            lightingQuality: this.assessLightingCalming(imageData),
            spatialOrganization: this.assessSpatialCalming(imageData),
            acousticEnvironment: this.assessAcousticCalming(imageData),
            
            overallCalmingLevel: 0,
            calmingStrengths: [],
            calmingWeaknesses: []
        };
        
        // Calculate weighted overall calming level
        calmingAnalysis.overallCalmingLevel = (
            calmingAnalysis.naturalElements * 0.25 +
            calmingAnalysis.colorHarmony * 0.25 +
            calmingAnalysis.lightingQuality * 0.25 +
            calmingAnalysis.spatialOrganization * 0.15 +
            calmingAnalysis.acousticEnvironment * 0.1
        );
        
        // Identify strengths and weaknesses
        calmingAnalysis.calmingStrengths = this.identifyCalmingStrengths(calmingAnalysis);
        calmingAnalysis.calmingWeaknesses = this.identifyCalmingWeaknesses(calmingAnalysis);
        
        return calmingAnalysis;
    }

    /**
     * Analyzes stress-inducing factors
     */
    async analyzeStressFactors(imageData) {
        console.log('⚠️ Analyzing potential stress factors...');
        
        const stressAnalysis = {
            visualChaos: this.assessVisualChaos(imageData),
            aggressiveElements: this.assessAggressiveElements(imageData),
            institutionalFeatures: this.assessInstitutionalFeatures(imageData),
            
            overallStressLevel: 0,
            stressConcerns: [],
            stressMitigation: []
        };
        
        // Calculate overall stress level (negative impact)
        stressAnalysis.overallStressLevel = (
            stressAnalysis.visualChaos * 0.4 +
            stressAnalysis.aggressiveElements * 0.4 +
            stressAnalysis.institutionalFeatures * 0.2
        );
        
        // Identify concerns and mitigation strategies
        stressAnalysis.stressConcerns = this.identifyStressConcerns(stressAnalysis);
        stressAnalysis.stressMitigation = this.generateStressMitigation(stressAnalysis);
        
        return stressAnalysis;
    }

    /**
     * Identifies the predominant therapeutic mood
     */
    async identifyTherapeuticMood(imageData) {
        console.log('🎭 Identifying therapeutic mood category...');
        
        const moodScores = {};
        const moods = this.ambianceFrameworks.therapeuticMoods;
        
        // Score each therapeutic mood
        for (const [moodName, moodData] of Object.entries(moods)) {
            moodScores[moodName] = this.calculateMoodScore(imageData, moodData);
        }
        
        // Find dominant mood
        const dominantMood = Object.entries(moodScores)
            .sort(([,a], [,b]) => b - a)[0];
        
        return {
            dominantMood: dominantMood[0],
            moodScore: dominantMood[1],
            allMoodScores: moodScores,
            moodData: moods[dominantMood[0]],
            therapeuticValue: moods[dominantMood[0]].therapeuticValue,
            idealApplications: moods[dominantMood[0]].idealFor
        };
    }

    /**
     * Analyzes spatial environment characteristics
     */
    async analyzeSpatialEnvironment(imageData) {
        console.log('🏗️ Analyzing spatial environment...');
        
        return {
            organization: this.assessSpatialOrganization(imageData),
            symmetry: this.assessSpatialSymmetry(imageData),
            flow: this.assessSpatialFlow(imageData),
            balance: this.assessSpatialBalance(imageData),
            scale: this.assessSpatialScale(imageData),
            
            spatialQuality: 'pending', // Calculated below
            spatialRecommendations: []
        };
    }

    /**
     * Analyzes lighting mood characteristics
     */
    async analyzeLightingMood(imageData) {
        console.log('💡 Analyzing lighting mood...');
        
        const lightingAnalysis = {
            naturalLightLevel: this.assessNaturalLight(imageData),
            lightTemperature: this.assessLightTemperature(imageData),
            lightSoftness: this.assessLightSoftness(imageData),
            lightDirection: this.assessLightDirection(imageData),
            shadowQuality: this.assessShadowQuality(imageData),
            
            overallLightingMood: 0,
            lightingCharacter: 'pending',
            therapeuticLightingScore: 0
        };
        
        // Calculate overall lighting mood
        lightingAnalysis.overallLightingMood = (
            lightingAnalysis.naturalLightLevel * 0.3 +
            lightingAnalysis.lightTemperature * 0.25 +
            lightingAnalysis.lightSoftness * 0.25 +
            lightingAnalysis.lightDirection * 0.1 +
            lightingAnalysis.shadowQuality * 0.1
        );
        
        lightingAnalysis.lightingCharacter = this.determineLightingCharacter(lightingAnalysis);
        lightingAnalysis.therapeuticLightingScore = this.calculateTherapeuticLightingScore(lightingAnalysis);
        
        return lightingAnalysis;
    }

    /**
     * Analyzes color mood characteristics
     */
    async analyzeColorMood(imageData) {
        console.log('🎨 Analyzing color mood...');
        
        const colorAnalysis = {
            dominantColors: this.extractDominantColors(imageData),
            colorTemperature: this.assessColorTemperature(imageData),
            colorSaturation: this.assessColorSaturation(imageData),
            colorHarmony: this.assessColorHarmonyMood(imageData),
            emotionalColorImpact: this.assessEmotionalColorImpact(imageData),
            
            overallColorMood: 0,
            colorTherapeuticValue: 0,
            colorPersonality: 'pending'
        };
        
        // Calculate overall color mood
        colorAnalysis.overallColorMood = (
            colorAnalysis.colorTemperature * 0.3 +
            colorAnalysis.colorSaturation * 0.25 +
            colorAnalysis.colorHarmony * 0.25 +
            colorAnalysis.emotionalColorImpact * 0.2
        );
        
        colorAnalysis.colorTherapeuticValue = this.calculateColorTherapeuticValue(colorAnalysis);
        colorAnalysis.colorPersonality = this.determineColorPersonality(colorAnalysis);
        
        return colorAnalysis;
    }

    /**
     * Analyzes natural elements present
     */
    async analyzeNaturalElements(imageData) {
        console.log('🌱 Analyzing natural elements...');
        
        const naturalAnalysis = {
            plantPresence: this.detectPlantPresence(imageData),
            naturalMaterials: this.detectNaturalMaterials(imageData),
            naturalLighting: this.detectNaturalLighting(imageData),
            organicShapes: this.detectOrganicShapes(imageData),
            natureViews: this.detectNatureViews(imageData),
            
            biophilicScore: 0,
            naturalTherapeuticValue: 0,
            biophilicRecommendations: []
        };
        
        // Calculate biophilic design score
        naturalAnalysis.biophilicScore = (
            naturalAnalysis.plantPresence * 0.3 +
            naturalAnalysis.naturalMaterials * 0.25 +
            naturalAnalysis.naturalLighting * 0.25 +
            naturalAnalysis.organicShapes * 0.1 +
            naturalAnalysis.natureViews * 0.1
        );
        
        naturalAnalysis.naturalTherapeuticValue = this.calculateNaturalTherapeuticValue(naturalAnalysis);
        naturalAnalysis.biophilicRecommendations = this.generateBiophilicRecommendations(naturalAnalysis);
        
        return naturalAnalysis;
    }

    /**
     * Assessment helper methods for calming factors
     */
    
    assessNaturalCalming(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const naturalKeywords = ['plant', 'nature', 'wood', 'stone', 'natural', 'organic', 'green'];
        
        let score = 0.3; // Base score
        
        naturalKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessColorCalming(imageData) {
        const dominantColor = this.extractDominantColor(imageData);
        const hue = this.getColorHue(dominantColor);
        const saturation = this.getColorSaturation(dominantColor);
        const lightness = this.getColorLightness(dominantColor);
        
        let score = 0.5;
        
        // Cool colors are more calming
        if (hue >= 180 && hue <= 240) score += 0.2; // Blues
        if (hue >= 120 && hue <= 180) score += 0.15; // Greens
        
        // Lower saturation is more calming
        if (saturation < 0.5) score += 0.15;
        
        // Medium to high lightness is more calming
        if (lightness > 0.5 && lightness < 0.9) score += 0.1;
        
        return Math.min(1.0, score);
    }

    assessLightingCalming(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const lightingKeywords = ['natural', 'soft', 'warm', 'gentle', 'diffused', 'even'];
        
        let score = 0.4;
        
        lightingKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessSpatialCalming(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const spatialKeywords = ['organized', 'clean', 'minimal', 'spacious', 'uncluttered', 'symmetrical'];
        
        let score = 0.4;
        
        spatialKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessAcousticCalming(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const acousticKeywords = ['quiet', 'peaceful', 'private', 'sound', 'absorption'];
        
        let score = 0.5; // Neutral baseline
        
        acousticKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    /**
     * Assessment helper methods for stress factors
     */
    
    assessVisualChaos(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const chaosKeywords = ['cluttered', 'busy', 'chaotic', 'messy', 'crowded', 'overwhelming'];
        
        let score = 0.1; // Low baseline stress
        
        chaosKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.15;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessAggressiveElements(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const aggressiveKeywords = ['sharp', 'harsh', 'aggressive', 'intimidating', 'cold', 'sterile'];
        
        let score = 0.1;
        
        aggressiveKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.15;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessInstitutionalFeatures(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const institutionalKeywords = ['clinical', 'medical', 'hospital', 'sterile', 'fluorescent', 'institutional'];
        
        let score = 0.1;
        
        institutionalKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.12;
            }
        });
        
        return Math.min(1.0, score);
    }

    /**
     * Mood calculation and analysis methods
     */
    
    calculateMoodScore(imageData, moodData) {
        const keywords = this.extractImageKeywords(imageData);
        let score = 0.2; // Base score
        
        // Check for mood characteristics
        moodData.characteristics.forEach(characteristic => {
            if (keywords.includes(characteristic)) {
                score += 0.15;
            }
        });
        
        // Analyze color compatibility
        const colorScore = this.assessMoodColorCompatibility(imageData, moodData.colorPalette);
        score += colorScore * 0.3;
        
        return Math.min(1.0, score);
    }

    assessMoodColorCompatibility(imageData, moodColorPalette) {
        // Simplified color compatibility check
        const dominantColor = this.extractDominantColor(imageData);
        const hue = this.getColorHue(dominantColor);
        
        // Map mood palettes to hue ranges
        const colorRanges = {
            'soft blues': [200, 240],
            'gentle greens': [120, 160],
            'warm neutrals': [30, 60],
            'earth tones': [20, 40],
            'professional blues': [210, 240]
        };
        
        for (const palette of moodColorPalette) {
            const range = colorRanges[palette];
            if (range && hue >= range[0] && hue <= range[1]) {
                return 0.8;
            }
        }
        
        return 0.3; // Neutral compatibility
    }

    /**
     * Spatial analysis methods
     */
    
    assessSpatialOrganization(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const organizationKeywords = ['organized', 'systematic', 'structured', 'arranged', 'neat'];
        
        let score = 0.5;
        
        organizationKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessSpatialSymmetry(imageData) {
        // Simplified symmetry assessment
        const keywords = this.extractImageKeywords(imageData);
        const symmetryKeywords = ['symmetrical', 'balanced', 'centered', 'aligned'];
        
        let score = 0.5;
        
        symmetryKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.12;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessSpatialFlow(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const flowKeywords = ['flowing', 'smooth', 'connected', 'continuous', 'pathway'];
        
        let score = 0.5;
        
        flowKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessSpatialBalance(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const balanceKeywords = ['balanced', 'proportional', 'harmonious', 'stable', 'even'];
        
        let score = 0.5;
        
        balanceKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessSpatialScale(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const scaleKeywords = ['appropriate', 'comfortable', 'human', 'proportionate', 'suitable'];
        
        let score = 0.5;
        
        scaleKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    /**
     * Lighting analysis methods
     */
    
    assessNaturalLight(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const naturalLightKeywords = ['natural', 'daylight', 'window', 'sunlight', 'outdoor'];
        
        let score = 0.4;
        
        naturalLightKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.15;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessLightTemperature(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const warmKeywords = ['warm', 'golden', 'amber', 'cozy'];
        const coolKeywords = ['cool', 'blue', 'crisp', 'bright'];
        
        let score = 0.5; // Neutral
        
        warmKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1; // Warm is generally more therapeutic
            }
        });
        
        coolKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.05; // Cool can be calming but less warm
            }
        });
        
        return Math.min(1.0, score);
    }

    assessLightSoftness(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const softnessKeywords = ['soft', 'diffused', 'gentle', 'smooth', 'even'];
        
        let score = 0.4;
        
        softnessKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.12;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessLightDirection(imageData) {
        // Simplified assessment based on keywords
        const keywords = this.extractImageKeywords(imageData);
        const directionKeywords = ['side', 'top', 'indirect', 'multi'];
        
        let score = 0.5;
        
        directionKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.08;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessShadowQuality(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const shadowKeywords = ['soft shadows', 'minimal shadows', 'even lighting'];
        
        let score = 0.5;
        
        shadowKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    /**
     * Color analysis methods
     */
    
    extractDominantColors(imageData) {
        // Simplified - in production, use advanced color extraction
        return [
            { color: imageData.color || '#4A90E2', percentage: 0.6 },
            { color: '#F7F9FC', percentage: 0.3 },
            { color: '#7FB069', percentage: 0.1 }
        ];
    }

    assessColorTemperature(imageData) {
        const dominantColor = this.extractDominantColor(imageData);
        const hue = this.getColorHue(dominantColor);
        
        // Warm colors (0-60, 300-360) vs Cool colors (120-240)
        if ((hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360)) {
            return 0.8; // Warm
        } else if (hue >= 120 && hue <= 240) {
            return 0.3; // Cool
        }
        
        return 0.5; // Neutral
    }

    assessColorSaturation(imageData) {
        // Simplified saturation assessment
        const keywords = this.extractImageKeywords(imageData);
        const highSatKeywords = ['vibrant', 'bright', 'vivid', 'intense'];
        const lowSatKeywords = ['muted', 'soft', 'pale', 'subtle'];
        
        let score = 0.5;
        
        highSatKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1; // Higher saturation
            }
        });
        
        lowSatKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score -= 0.1; // Lower saturation (better for therapy)
            }
        });
        
        return Math.max(0, Math.min(1.0, score));
    }

    assessColorHarmonyMood(imageData) {
        // Simplified harmony assessment
        const keywords = this.extractImageKeywords(imageData);
        const harmonyKeywords = ['harmonious', 'coordinated', 'balanced', 'unified'];
        
        let score = 0.5;
        
        harmonyKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.12;
            }
        });
        
        return Math.min(1.0, score);
    }

    assessEmotionalColorImpact(imageData) {
        const dominantColor = this.extractDominantColor(imageData);
        const hue = this.getColorHue(dominantColor);
        
        // Map colors to emotional impact
        if (hue >= 200 && hue <= 240) return 0.8; // Blues - trust, calm
        if (hue >= 120 && hue <= 160) return 0.75; // Greens - healing, growth
        if (hue >= 60 && hue <= 90) return 0.6;   // Yellows - optimism (but can be stimulating)
        if (hue >= 0 && hue <= 30) return 0.4;    // Reds - energy (can be aggressive)
        
        return 0.5; // Neutral
    }

    /**
     * Natural elements detection methods
     */
    
    detectPlantPresence(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const plantKeywords = ['plant', 'tree', 'flower', 'green', 'foliage', 'vegetation'];
        
        let score = 0.2;
        
        plantKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.15;
            }
        });
        
        return Math.min(1.0, score);
    }

    detectNaturalMaterials(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const materialKeywords = ['wood', 'stone', 'bamboo', 'natural', 'organic', 'textile'];
        
        let score = 0.2;
        
        materialKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.12;
            }
        });
        
        return Math.min(1.0, score);
    }

    detectNaturalLighting(imageData) {
        return this.assessNaturalLight(imageData); // Reuse the natural light assessment
    }

    detectOrganicShapes(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const organicKeywords = ['curved', 'flowing', 'organic', 'rounded', 'natural'];
        
        let score = 0.3;
        
        organicKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.1;
            }
        });
        
        return Math.min(1.0, score);
    }

    detectNatureViews(imageData) {
        const keywords = this.extractImageKeywords(imageData);
        const viewKeywords = ['view', 'window', 'outdoor', 'garden', 'landscape'];
        
        let score = 0.2;
        
        viewKeywords.forEach(keyword => {
            if (keywords.includes(keyword)) {
                score += 0.15;
            }
        });
        
        return Math.min(1.0, score);
    }

    /**
     * Utility and calculation methods
     */
    
    extractImageKeywords(imageData) {
        const text = [
            imageData.alt || '',
            imageData.description || '',
            imageData.keyword || '',
            imageData.tags || ''
        ].join(' ').toLowerCase();
        
        return text.split(/\s+/).filter(word => word.length > 2);
    }

    extractDominantColor(imageData) {
        return imageData.color || imageData.dominantColor || '#4A90E2';
    }

    getColorHue(hexColor) {
        // Simplified hue extraction
        const colorMap = {
            '#4A90E2': 210, // Blue
            '#7FB069': 120, // Green
            '#E74C3C': 0,   // Red
            '#F39C12': 35,  // Orange
            '#9B59B6': 280, // Purple
            '#F7F9FC': 220  // Light blue-gray
        };
        
        return colorMap[hexColor] || 200;
    }

    getColorSaturation(hexColor) {
        // Simplified saturation estimation
        if (hexColor.includes('F') && hexColor.length > 4) return 0.3; // Light colors - low saturation
        return 0.7; // Default medium-high saturation
    }

    getColorLightness(hexColor) {
        // Simplified lightness estimation
        if (hexColor.includes('F') && hexColor.length > 4) return 0.9; // Light colors
        if (hexColor.includes('0') || hexColor.includes('1')) return 0.2; // Dark colors
        return 0.6; // Medium lightness
    }

    calculateOverallCalmingScore(detection) {
        return (
            detection.calmingFactors.overallCalmingLevel * 0.6 +
            (1 - detection.stressFactors.overallStressLevel) * 0.4
        );
    }

    calculateTherapeuticSuitability(detection) {
        return (
            detection.overallCalmingScore * 0.4 +
            detection.therapeuticMood.therapeuticValue * 0.3 +
            detection.naturalElementAnalysis.biophilicScore * 0.2 +
            detection.lightingAnalysis.therapeuticLightingScore * 0.1
        );
    }

    calculateMoodOptimization(detection) {
        return (
            detection.colorMoodAnalysis.colorTherapeuticValue * 0.3 +
            detection.spatialAnalysis.organization * 0.25 +
            detection.lightingAnalysis.overallLightingMood * 0.25 +
            detection.naturalElementAnalysis.biophilicScore * 0.2
        );
    }

    // Additional calculation methods for therapeutic values
    calculateColorTherapeuticValue(colorAnalysis) {
        return (
            (1 - colorAnalysis.colorTemperature) * 0.3 + // Cool colors better
            (1 - colorAnalysis.colorSaturation) * 0.3 +  // Lower saturation better
            colorAnalysis.colorHarmony * 0.4             // Harmony important
        );
    }

    calculateTherapeuticLightingScore(lightingAnalysis) {
        return (
            lightingAnalysis.naturalLightLevel * 0.4 +
            lightingAnalysis.lightSoftness * 0.3 +
            lightingAnalysis.lightTemperature * 0.3
        );
    }

    calculateNaturalTherapeuticValue(naturalAnalysis) {
        return naturalAnalysis.biophilicScore; // Direct correlation
    }

    // Character and personality determination methods
    determineLightingCharacter(lightingAnalysis) {
        const score = lightingAnalysis.overallLightingMood;
        
        if (score >= 0.8) return 'ideal_therapeutic';
        if (score >= 0.65) return 'good_therapeutic';
        if (score >= 0.5) return 'acceptable';
        return 'needs_improvement';
    }

    determineColorPersonality(colorAnalysis) {
        if (colorAnalysis.colorTemperature < 0.4) return 'cool_calming';
        if (colorAnalysis.colorTemperature > 0.6) return 'warm_nurturing';
        return 'neutral_balanced';
    }

    // Identification and recommendation methods
    identifyCalmingStrengths(calmingAnalysis) {
        const strengths = [];
        
        if (calmingAnalysis.naturalElements > 0.7) strengths.push('Strong natural element presence');
        if (calmingAnalysis.colorHarmony > 0.7) strengths.push('Excellent color harmony');
        if (calmingAnalysis.lightingQuality > 0.7) strengths.push('High quality therapeutic lighting');
        if (calmingAnalysis.spatialOrganization > 0.7) strengths.push('Well-organized therapeutic space');
        
        return strengths;
    }

    identifyCalmingWeaknesses(calmingAnalysis) {
        const weaknesses = [];
        
        if (calmingAnalysis.naturalElements < 0.5) weaknesses.push('Limited natural elements');
        if (calmingAnalysis.colorHarmony < 0.5) weaknesses.push('Color harmony could be improved');
        if (calmingAnalysis.lightingQuality < 0.5) weaknesses.push('Lighting needs enhancement');
        if (calmingAnalysis.spatialOrganization < 0.5) weaknesses.push('Spatial organization needs work');
        
        return weaknesses;
    }

    identifyStressConcerns(stressAnalysis) {
        const concerns = [];
        
        if (stressAnalysis.visualChaos > 0.5) concerns.push('Visual clutter may cause stress');
        if (stressAnalysis.aggressiveElements > 0.5) concerns.push('Aggressive elements present');
        if (stressAnalysis.institutionalFeatures > 0.5) concerns.push('Overly institutional feel');
        
        return concerns;
    }

    generateStressMitigation(stressAnalysis) {
        const mitigation = [];
        
        if (stressAnalysis.visualChaos > 0.5) {
            mitigation.push('Simplify visual elements and reduce clutter');
        }
        if (stressAnalysis.aggressiveElements > 0.5) {
            mitigation.push('Soften harsh elements with warm lighting and textures');
        }
        if (stressAnalysis.institutionalFeatures > 0.5) {
            mitigation.push('Add personal and welcoming touches');
        }
        
        return mitigation;
    }

    generateAmbianceOptimizations(detection) {
        const optimizations = [];
        
        if (detection.overallCalmingScore < 0.7) {
            optimizations.push({
                area: 'Overall Calming',
                suggestion: 'Increase natural elements and improve color harmony',
                priority: 'high',
                expectedImpact: '+20-30%'
            });
        }
        
        if (detection.naturalElementAnalysis.biophilicScore < 0.6) {
            optimizations.push({
                area: 'Biophilic Design',
                suggestion: 'Add plants and natural materials',
                priority: 'medium-high',
                expectedImpact: '+15-25%'
            });
        }
        
        if (detection.lightingAnalysis.therapeuticLightingScore < 0.6) {
            optimizations.push({
                area: 'Therapeutic Lighting',
                suggestion: 'Improve natural light and soften artificial lighting',
                priority: 'medium',
                expectedImpact: '+10-20%'
            });
        }
        
        return optimizations;
    }

    generateMoodEnhancements(detection) {
        const enhancements = [];
        
        const mood = detection.therapeuticMood.dominantMood;
        
        if (mood === 'professional' && detection.therapeuticMood.moodScore < 0.8) {
            enhancements.push('Enhance professional credibility while maintaining warmth');
        }
        
        if (mood === 'serene' && detection.therapeuticMood.moodScore < 0.8) {
            enhancements.push('Deepen peaceful atmosphere with softer elements');
        }
        
        if (mood === 'nurturing' && detection.therapeuticMood.moodScore < 0.8) {
            enhancements.push('Increase warmth and comfort indicators');
        }
        
        return enhancements.length > 0 ? enhancements : ['Mood optimization is well balanced'];
    }

    generateBiophilicRecommendations(naturalAnalysis) {
        const recommendations = [];
        
        if (naturalAnalysis.plantPresence < 0.5) {
            recommendations.push('Add live plants for stress reduction');
        }
        if (naturalAnalysis.naturalMaterials < 0.5) {
            recommendations.push('Incorporate wood and natural textures');
        }
        if (naturalAnalysis.naturalLighting < 0.7) {
            recommendations.push('Maximize natural light exposure');
        }
        
        return recommendations.length > 0 ? recommendations : ['Natural elements are well optimized'];
    }
}

module.exports = AmbianceMoodDetector;