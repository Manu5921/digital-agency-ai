"use strict";
/**
 * AI Image Generator - DALL-E 3 Integration pour Design Agent Phase 2
 * Génération automatique d'images selon secteur d'activité
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorImageService = exports.AIImageGenerator = void 0;
var AIImageGenerator = /** @class */ (function () {
    function AIImageGenerator(apiKey) {
        this.baseUrl = 'https://api.openai.com/v1/images/generations';
        this.defaultConfig = {
            model: 'dall-e-3',
            size: '1024x1024',
            quality: 'hd',
            style: 'natural',
            n: 1
        };
        this.apiKey = apiKey;
    }
    /**
     * Génère un set d'images complet pour un secteur
     */
    AIImageGenerator.prototype.generateSectorImageSet = function (sector, businessName, customConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var prompts, config, images, heroImage, i, featureImage, i, galleryImage, testimonialImage, ctaImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prompts = this.getSectorPrompts(sector, businessName);
                        config = __assign(__assign({}, this.defaultConfig), customConfig);
                        images = [];
                        return [4 /*yield*/, this.generateSingleImage(prompts.hero, 'hero', __assign(__assign({}, config), { size: '1792x1024' }))];
                    case 1:
                        heroImage = _a.sent();
                        images.push(heroImage);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < prompts.features.length && i < 3)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.generateSingleImage(prompts.features[i], 'feature', config)];
                    case 3:
                        featureImage = _a.sent();
                        images.push(featureImage);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        i = 0;
                        _a.label = 6;
                    case 6:
                        if (!(i < prompts.gallery.length && i < 4)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.generateSingleImage(prompts.gallery[i], 'gallery', config)];
                    case 7:
                        galleryImage = _a.sent();
                        images.push(galleryImage);
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, this.generateSingleImage(prompts.testimonials, 'testimonial', config)];
                    case 10:
                        testimonialImage = _a.sent();
                        images.push(testimonialImage);
                        return [4 /*yield*/, this.generateSingleImage(prompts.cta, 'cta', __assign(__assign({}, config), { size: '1792x1024' }))];
                    case 11:
                        ctaImage = _a.sent();
                        images.push(ctaImage);
                        return [2 /*return*/, __assign(__assign({}, prompts), { images: images })];
                }
            });
        });
    };
    /**
     * Génère une image unique avec optimisations
     */
    AIImageGenerator.prototype.generateSingleImage = function (prompt, type, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, imageUrl, optimizedUrls, metadata, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch(this.baseUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer ".concat(this.apiKey)
                                },
                                body: JSON.stringify({
                                    model: config.model,
                                    prompt: this.optimizePrompt(prompt, type),
                                    size: config.size,
                                    quality: config.quality,
                                    style: config.style,
                                    n: config.n || 1
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Erreur DALL-E API: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        imageUrl = data.data[0].url;
                        return [4 /*yield*/, this.optimizeImage(imageUrl)];
                    case 3:
                        optimizedUrls = _a.sent();
                        return [4 /*yield*/, this.getImageMetadata(imageUrl)];
                    case 4:
                        metadata = _a.sent();
                        return [2 /*return*/, {
                                url: imageUrl,
                                prompt: this.optimizePrompt(prompt, type),
                                type: type,
                                optimizedUrls: optimizedUrls,
                                alt: this.generateAltText(prompt, type),
                                metadata: metadata
                            }];
                    case 5:
                        error_1 = _a.sent();
                        console.error('Erreur génération image:', error_1);
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Définit les prompts par secteur d'activité
     */
    AIImageGenerator.prototype.getSectorPrompts = function (sector, businessName) {
        var sectorPrompts = {
            restaurant: {
                sector: 'restaurant',
                hero: "Elegant fine dining restaurant interior with warm lighting, beautifully set tables with white tablecloths, modern sophisticated atmosphere, professional photography style, high-end gastronomy setting for ".concat(businessName),
                features: [
                    "Professional chef in modern kitchen preparing gourmet dish, action shot, steam, dynamic cooking scene for ".concat(businessName),
                    "Beautifully plated gourmet dish on white plate, artistic food photography, michelin star presentation style",
                    "Wine cellar with premium bottles, elegant wine tasting room, sophisticated ambiance, warm lighting"
                ],
                gallery: [
                    "Luxury restaurant dining room with elegant decor, soft lighting, intimate atmosphere",
                    "Fresh ingredients artistically arranged, farmers market style, high quality produce",
                    "Happy customers enjoying meal in restaurant, natural candid photography, warm atmosphere",
                    "Outdoor restaurant terrace with city view, elegant furniture, sunset lighting"
                ],
                testimonials: "Happy diverse customers dining in elegant restaurant, natural smiles, comfortable atmosphere, testimonial photography style",
                cta: "Restaurant reservation scene with elegant table setting, invitation atmosphere, call-to-action visual, warm welcoming lighting"
            },
            sante: {
                sector: 'sante',
                hero: "Modern medical facility entrance with clean design, professional healthcare environment, reassuring atmosphere, natural lighting for ".concat(businessName),
                features: [
                    "Advanced medical equipment in modern examination room, high-tech healthcare technology, sterile clean environment",
                    "Friendly doctor consulting with patient, professional medical consultation, trust and care atmosphere",
                    "Digital health records on tablet, modern healthcare technology, data visualization, medical interface"
                ],
                gallery: [
                    "Clean modern waiting room with comfortable seating, natural light, welcoming healthcare environment",
                    "Medical team collaboration, diverse healthcare professionals, teamwork in hospital setting",
                    "Patient receiving care, compassionate healthcare, recovery and wellness focus",
                    "Medical research laboratory with scientists, innovation in healthcare, cutting-edge technology"
                ],
                testimonials: "Satisfied patients testimonials, diverse people showing gratitude, healthcare success stories, professional medical photography",
                cta: "Healthcare appointment booking scene, calendar scheduling, medical consultation invitation, professional trust building"
            },
            finance: {
                sector: 'finance',
                hero: "Modern financial advisory office with city skyline view, professional business environment, sleek design, executive atmosphere for ".concat(businessName),
                features: [
                    "Financial charts and graphs on multiple monitors, trading floor atmosphere, data analytics visualization",
                    "Professional financial advisor meeting with clients, consultation room, trust and expertise demonstration",
                    "Digital banking interface on laptop, modern fintech application, user-friendly financial technology"
                ],
                gallery: [
                    "Business handshake in modern office, partnership and trust in finance, professional relationship building",
                    "Investment portfolio documents and calculator, financial planning materials, wealth management tools",
                    "Team of financial experts in boardroom, strategic planning session, collaborative financial consulting",
                    "Secure vault with gold bars and documents, financial security and wealth protection visualization"
                ],
                testimonials: "Successful business people testimonials, diverse satisfied clients, financial success stories, professional achievement photography",
                cta: "Financial consultation invitation, professional meeting setup, trust-building call-to-action scene, executive office environment"
            },
            elearning: {
                sector: 'elearning',
                hero: "Student using laptop for online learning in modern study space, e-learning platform interface, educational technology for ".concat(businessName),
                features: [
                    "Interactive online classroom with virtual participants, video conferencing education, modern digital learning",
                    "Educational content on tablet screen, e-learning course materials, intuitive learning interface design",
                    "Student taking notes while watching online lecture, focused learning environment, educational success"
                ],
                gallery: [
                    "Diverse students collaborating online, virtual study group, global e-learning community",
                    "Digital library interface with educational resources, online books and materials, knowledge accessibility",
                    "Teacher recording online course, educational content creation, professional e-learning production",
                    "Student celebrating learning achievement, online graduation, educational milestone success"
                ],
                testimonials: "Happy students sharing e-learning success stories, diverse learners testimonials, educational achievement celebration",
                cta: "Course enrollment invitation, start learning call-to-action, educational opportunity presentation, inspiring learning journey"
            },
            immobilier: {
                sector: 'immobilier',
                hero: "Luxury modern house exterior with beautiful landscaping, real estate photography, architectural excellence for ".concat(businessName),
                features: [
                    "Real estate agent showing property to clients, professional property tour, customer service excellence",
                    "Modern apartment interior with designer furniture, stylish home decoration, luxury living space",
                    "Aerial view of residential neighborhood, community planning, real estate development overview"
                ],
                gallery: [
                    "Beautiful kitchen with modern appliances, home interior design, luxury residential space",
                    "Spacious living room with natural light, contemporary home design, comfortable living environment",
                    "Home office setup in modern house, remote work space, residential functionality",
                    "Outdoor pool and garden area, luxury home amenities, lifestyle real estate features"
                ],
                testimonials: "Happy homeowners in front of new house, real estate success stories, satisfied clients testimonials, home ownership joy",
                cta: "Property viewing invitation, real estate consultation call-to-action, home buying opportunity presentation"
            },
            tech: {
                sector: 'tech',
                hero: "Modern tech startup office with open workspace, innovative technology environment, collaborative coding space for ".concat(businessName),
                features: [
                    "Developers coding on multiple monitors, software development team, agile working environment",
                    "Futuristic AI interface with holographic elements, cutting-edge technology visualization, innovation concept",
                    "Cloud server infrastructure, data center technology, modern IT infrastructure visualization"
                ],
                gallery: [
                    "Tech team brainstorming session, innovation workshop, collaborative problem solving in modern office",
                    "Smartphone app interface mockups, mobile technology design, user experience development",
                    "Robotics and AI laboratory, advanced technology research, future tech development",
                    "Cybersecurity visualization with network diagrams, data protection technology, secure systems"
                ],
                testimonials: "Tech entrepreneurs sharing success stories, startup founders testimonials, innovation achievement celebration",
                cta: "Technology consultation invitation, digital transformation call-to-action, tech solution presentation"
            }
        };
        return sectorPrompts[sector] || sectorPrompts.tech;
    };
    /**
     * Optimise le prompt pour DALL-E 3
     */
    AIImageGenerator.prototype.optimizePrompt = function (basePrompt, type) {
        var qualityEnhancers = [
            'professional photography',
            'high resolution',
            'studio lighting',
            'commercial grade',
            'marketing material quality'
        ];
        var typeSpecificEnhancers = {
            hero: ['wide angle', 'cinematic composition', 'dramatic lighting'],
            feature: ['product photography', 'clean background', 'focused composition'],
            gallery: ['lifestyle photography', 'natural lighting', 'authentic moments'],
            testimonial: ['portrait photography', 'genuine expressions', 'professional headshots'],
            cta: ['compelling visual', 'action-oriented', 'engaging composition'],
            icon: ['minimalist design', 'vector style', 'clean graphics']
        };
        var enhancers = __spreadArray(__spreadArray([], qualityEnhancers, true), (typeSpecificEnhancers[type] || []), true);
        var randomEnhancers = enhancers.sort(function () { return 0.5 - Math.random(); }).slice(0, 3);
        return "".concat(basePrompt, ", ").concat(randomEnhancers.join(', '), ", 8K resolution, professional quality");
    };
    /**
     * Optimise l'image générée (conversion WebP, compression)
     */
    AIImageGenerator.prototype.optimizeImage = function (imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation des URLs optimisées (à implémenter avec un service de conversion réel)
                return [2 /*return*/, {
                        webp: imageUrl.replace('.png', '.webp'),
                        jpeg: imageUrl.replace('.png', '.jpg'),
                        thumbnail: imageUrl.replace('.png', '_thumb.jpg')
                    }];
            });
        });
    };
    /**
     * Récupère les métadonnées de l'image
     */
    AIImageGenerator.prototype.getImageMetadata = function (imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Simulation des métadonnées (à implémenter avec une vraie analyse d'image)
                return [2 /*return*/, {
                        width: 1024,
                        height: 1024,
                        size: 256000, // en bytes
                        format: 'PNG'
                    }];
            });
        });
    };
    /**
     * Génère le texte alternatif optimisé SEO
     */
    AIImageGenerator.prototype.generateAltText = function (prompt, type) {
        var typeDescriptions = {
            hero: 'Image principale de présentation',
            feature: 'Illustration de fonctionnalité',
            gallery: 'Image de galerie',
            testimonial: 'Photo de témoignage client',
            cta: 'Image d\'appel à l\'action',
            icon: 'Icône illustrative'
        };
        // Extraction des mots-clés du prompt
        var keywords = prompt
            .split(' ')
            .filter(function (word) { return word.length > 3; })
            .slice(0, 5)
            .join(' ');
        return "".concat(typeDescriptions[type], " - ").concat(keywords);
    };
    /**
     * Génère des images de placeholder en cas d'erreur
     */
    AIImageGenerator.prototype.generatePlaceholderImage = function (type, sector) {
        var placeholderUrls = {
            restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
            sante: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
            finance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
            elearning: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
            immobilier: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
            tech: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176'
        };
        var baseUrl = placeholderUrls[sector] || placeholderUrls.tech;
        return {
            url: "".concat(baseUrl, "?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80"),
            prompt: "Placeholder image for ".concat(sector, " ").concat(type),
            type: type,
            optimizedUrls: {
                webp: "".concat(baseUrl, "?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp"),
                jpeg: "".concat(baseUrl, "?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=jpg"),
                thumbnail: "".concat(baseUrl, "?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80")
            },
            alt: "Image ".concat(type, " pour secteur ").concat(sector),
            metadata: {
                width: 1024,
                height: 1024,
                size: 150000,
                format: 'JPEG'
            }
        };
    };
    return AIImageGenerator;
}());
exports.AIImageGenerator = AIImageGenerator;
/**
 * Service intégré pour génération d'images par secteur
 */
var SectorImageService = /** @class */ (function () {
    function SectorImageService(openaiApiKey) {
        this.imageGenerator = new AIImageGenerator(openaiApiKey);
    }
    /**
     * Génère un pack d'images complet pour un nouveau projet
     */
    SectorImageService.prototype.generateProjectImagePack = function (sector, businessName, useAI) {
        if (useAI === void 0) { useAI = true; }
        return __awaiter(this, void 0, void 0, function () {
            var result, placeholderImages, error_2, placeholderImages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!useAI) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.imageGenerator.generateSectorImageSet(sector, businessName)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                images: result.images,
                                fallbackUsed: false,
                                totalCost: this.calculateGenerationCost(result.images.length)
                            }];
                    case 2:
                        placeholderImages = this.generatePlaceholderPack(sector);
                        return [2 /*return*/, {
                                success: true,
                                images: placeholderImages,
                                fallbackUsed: true
                            }];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Erreur génération pack images:', error_2);
                        placeholderImages = this.generatePlaceholderPack(sector);
                        return [2 /*return*/, {
                                success: true,
                                images: placeholderImages,
                                fallbackUsed: true
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génère un pack d'images placeholder pour un secteur
     */
    SectorImageService.prototype.generatePlaceholderPack = function (sector) {
        var _this = this;
        var imageTypes = ['hero', 'feature', 'feature', 'feature', 'gallery', 'gallery', 'gallery', 'gallery', 'testimonial', 'cta'];
        return imageTypes.map(function (type) {
            return _this.imageGenerator.generatePlaceholderImage(type, sector);
        });
    };
    /**
     * Calcule le coût de génération DALL-E 3
     */
    SectorImageService.prototype.calculateGenerationCost = function (imageCount) {
        // Prix DALL-E 3: $0.040 per image (1024×1024), $0.080 per image (1792×1024 or 1024×1792)
        var standardImages = imageCount - 2; // Hero et CTA sont en format large
        var largeImages = 2;
        return (standardImages * 0.040) + (largeImages * 0.080);
    };
    return SectorImageService;
}());
exports.SectorImageService = SectorImageService;
exports.default = AIImageGenerator;
