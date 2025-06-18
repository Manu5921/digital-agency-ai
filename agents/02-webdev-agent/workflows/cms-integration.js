"use strict";
/**
 * CMS Headless Integration - Phase 2
 * Intégration Sanity/Contentful avec API typée, preview mode et interface admin
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentUtils = exports.CMSIntegration = exports.sanityWriteClient = exports.sanityClient = exports.sanityConfig = exports.RestaurantInfoSchema = exports.MenuItemSchema = exports.ProductSchema = exports.ArticleSchema = exports.PageSchema = exports.SEOSchema = exports.ImageSchema = void 0;
var zod_1 = require("zod");
var client_1 = require("@sanity/client");
var next_sanity_1 = require("next-sanity");
// Schemas de validation Zod pour le contenu
exports.ImageSchema = zod_1.z.object({
    asset: zod_1.z.object({
        _ref: zod_1.z.string(),
        _type: zod_1.z.literal('reference'),
    }),
    alt: zod_1.z.string().optional(),
    hotspot: zod_1.z.object({
        x: zod_1.z.number(),
        y: zod_1.z.number(),
        height: zod_1.z.number(),
        width: zod_1.z.number(),
    }).optional(),
});
exports.SEOSchema = zod_1.z.object({
    title: zod_1.z.string().max(60),
    description: zod_1.z.string().max(160),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
    ogImage: exports.ImageSchema.optional(),
});
exports.PageSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    _type: zod_1.z.string(),
    _createdAt: zod_1.z.string(),
    _updatedAt: zod_1.z.string(),
    _rev: zod_1.z.string(),
    title: zod_1.z.string(),
    slug: zod_1.z.object({
        current: zod_1.z.string(),
    }),
    content: zod_1.z.array(zod_1.z.any()), // Portable Text
    seo: exports.SEOSchema,
    featured: zod_1.z.boolean().default(false),
    publishedAt: zod_1.z.string().optional(),
    author: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
    }).optional(),
});
exports.ArticleSchema = exports.PageSchema.extend({
    _type: zod_1.z.literal('article'),
    excerpt: zod_1.z.string(),
    featuredImage: exports.ImageSchema,
    category: zod_1.z.object({
        title: zod_1.z.string(),
        slug: zod_1.z.object({
            current: zod_1.z.string(),
        }),
    }),
    tags: zod_1.z.array(zod_1.z.string()),
    readingTime: zod_1.z.number(),
});
exports.ProductSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    _type: zod_1.z.literal('product'),
    title: zod_1.z.string(),
    slug: zod_1.z.object({
        current: zod_1.z.string(),
    }),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    images: zod_1.z.array(exports.ImageSchema),
    category: zod_1.z.object({
        title: zod_1.z.string(),
        slug: zod_1.z.object({
            current: zod_1.z.string(),
        }),
    }),
    variants: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string(),
        price: zod_1.z.number(),
        sku: zod_1.z.string(),
        inventory: zod_1.z.number().int().nonnegative(),
    })).optional(),
    features: zod_1.z.array(zod_1.z.string()),
    inStock: zod_1.z.boolean().default(true),
    featured: zod_1.z.boolean().default(false),
    seo: exports.SEOSchema,
});
exports.MenuItemSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    _type: zod_1.z.literal('menuItem'),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string(),
    image: exports.ImageSchema.optional(),
    allergens: zod_1.z.array(zod_1.z.string()).optional(),
    dietary: zod_1.z.array(zod_1.z.enum(['vegetarian', 'vegan', 'gluten-free', 'dairy-free'])).optional(),
    available: zod_1.z.boolean().default(true),
    featured: zod_1.z.boolean().default(false),
    spicyLevel: zod_1.z.number().int().min(0).max(5).optional(),
});
exports.RestaurantInfoSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    _type: zod_1.z.literal('restaurantInfo'),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        postalCode: zod_1.z.string(),
        country: zod_1.z.string(),
    }),
    contact: zod_1.z.object({
        phone: zod_1.z.string(),
        email: zod_1.z.string().email(),
        website: zod_1.z.string().url().optional(),
    }),
    hours: zod_1.z.array(zod_1.z.object({
        day: zod_1.z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
        open: zod_1.z.string(),
        close: zod_1.z.string(),
        closed: zod_1.z.boolean().default(false),
    })),
    socialMedia: zod_1.z.object({
        facebook: zod_1.z.string().url().optional(),
        instagram: zod_1.z.string().url().optional(),
        twitter: zod_1.z.string().url().optional(),
    }).optional(),
    images: zod_1.z.array(exports.ImageSchema),
});
/**
 * Configuration Sanity
 */
exports.sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
};
/**
 * Client Sanity
 */
exports.sanityClient = (0, client_1.createClient)(exports.sanityConfig);
/**
 * Client Sanity avec token pour les opérations d'écriture
 */
exports.sanityWriteClient = (0, client_1.createClient)(__assign(__assign({}, exports.sanityConfig), { useCdn: false, token: process.env.SANITY_WRITE_TOKEN }));
/**
 * Classe principale pour l'intégration CMS
 */
var CMSIntegration = /** @class */ (function () {
    function CMSIntegration(isPreview) {
        if (isPreview === void 0) { isPreview = false; }
        this.client = isPreview ? exports.sanityWriteClient : exports.sanityClient;
        this.writeClient = exports.sanityWriteClient;
    }
    /**
     * Récupère toutes les pages
     */
    CMSIntegration.prototype.getPages = function (limit, offset) {
        if (limit === void 0) { limit = 10; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var query, pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = (0, next_sanity_1.groq)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      *[_type == \"page\"] | order(publishedAt desc, _createdAt desc) [", "...", "] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "], ["\n      *[_type == \"page\"] | order(publishedAt desc, _createdAt desc) [", "...", "] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "])), offset, offset + limit);
                        return [4 /*yield*/, this.client.fetch(query)];
                    case 1:
                        pages = _a.sent();
                        return [2 /*return*/, zod_1.z.array(exports.PageSchema).parse(pages)];
                }
            });
        });
    };
    /**
     * Récupère une page par son slug
     */
    CMSIntegration.prototype.getPageBySlug = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var query, page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = (0, next_sanity_1.groq)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      *[_type == \"page\" && slug.current == $slug][0] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "], ["\n      *[_type == \"page\" && slug.current == $slug][0] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "])));
                        return [4 /*yield*/, this.client.fetch(query, { slug: slug })];
                    case 1:
                        page = _a.sent();
                        return [2 /*return*/, page ? exports.PageSchema.parse(page) : null];
                }
            });
        });
    };
    /**
     * Récupère tous les articles
     */
    CMSIntegration.prototype.getArticles = function (limit, offset) {
        if (limit === void 0) { limit = 10; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var query, articles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = (0, next_sanity_1.groq)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      *[_type == \"article\"] | order(publishedAt desc, _createdAt desc) [", "...", "] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        excerpt,\n        featuredImage,\n        category->{\n          title,\n          slug\n        },\n        tags,\n        readingTime,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "], ["\n      *[_type == \"article\"] | order(publishedAt desc, _createdAt desc) [", "...", "] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        excerpt,\n        featuredImage,\n        category->{\n          title,\n          slug\n        },\n        tags,\n        readingTime,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "])), offset, offset + limit);
                        return [4 /*yield*/, this.client.fetch(query)];
                    case 1:
                        articles = _a.sent();
                        return [2 /*return*/, zod_1.z.array(exports.ArticleSchema).parse(articles)];
                }
            });
        });
    };
    /**
     * Récupère un article par son slug
     */
    CMSIntegration.prototype.getArticleBySlug = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var query, article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = (0, next_sanity_1.groq)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      *[_type == \"article\" && slug.current == $slug][0] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        excerpt,\n        featuredImage,\n        category->{\n          title,\n          slug\n        },\n        tags,\n        readingTime,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "], ["\n      *[_type == \"article\" && slug.current == $slug][0] {\n        _id,\n        _type,\n        _createdAt,\n        _updatedAt,\n        _rev,\n        title,\n        slug,\n        content,\n        excerpt,\n        featuredImage,\n        category->{\n          title,\n          slug\n        },\n        tags,\n        readingTime,\n        seo,\n        featured,\n        publishedAt,\n        author\n      }\n    "])));
                        return [4 /*yield*/, this.client.fetch(query, { slug: slug })];
                    case 1:
                        article = _a.sent();
                        return [2 /*return*/, article ? exports.ArticleSchema.parse(article) : null];
                }
            });
        });
    };
    /**
     * Récupère tous les produits
     */
    CMSIntegration.prototype.getProducts = function (limit, offset, category) {
        if (limit === void 0) { limit = 10; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var categoryFilter, query, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryFilter = category ? "&& category->slug.current == $category" : '';
                        query = (0, next_sanity_1.groq)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      *[_type == \"product\" ", "] | order(featured desc, _createdAt desc) [", "...", "] {\n        _id,\n        _type,\n        title,\n        slug,\n        description,\n        price,\n        images,\n        category->{\n          title,\n          slug\n        },\n        variants,\n        features,\n        inStock,\n        featured,\n        seo\n      }\n    "], ["\n      *[_type == \"product\" ", "] | order(featured desc, _createdAt desc) [", "...", "] {\n        _id,\n        _type,\n        title,\n        slug,\n        description,\n        price,\n        images,\n        category->{\n          title,\n          slug\n        },\n        variants,\n        features,\n        inStock,\n        featured,\n        seo\n      }\n    "])), categoryFilter, offset, offset + limit);
                        return [4 /*yield*/, this.client.fetch(query, category ? { category: category } : {})];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, zod_1.z.array(exports.ProductSchema).parse(products)];
                }
            });
        });
    };
    /**
     * Récupère un produit par son slug
     */
    CMSIntegration.prototype.getProductBySlug = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var query, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = (0, next_sanity_1.groq)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n      *[_type == \"product\" && slug.current == $slug][0] {\n        _id,\n        _type,\n        title,\n        slug,\n        description,\n        price,\n        images,\n        category->{\n          title,\n          slug\n        },\n        variants,\n        features,\n        inStock,\n        featured,\n        seo\n      }\n    "], ["\n      *[_type == \"product\" && slug.current == $slug][0] {\n        _id,\n        _type,\n        title,\n        slug,\n        description,\n        price,\n        images,\n        category->{\n          title,\n          slug\n        },\n        variants,\n        features,\n        inStock,\n        featured,\n        seo\n      }\n    "])));
                        return [4 /*yield*/, this.client.fetch(query, { slug: slug })];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, product ? exports.ProductSchema.parse(product) : null];
                }
            });
        });
    };
    /**
     * Récupère les éléments du menu par catégorie
     */
    CMSIntegration.prototype.getMenuItems = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryFilter, query, menuItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryFilter = category ? "&& category == $category" : '';
                        query = (0, next_sanity_1.groq)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      *[_type == \"menuItem\" && available == true ", "] | order(featured desc, name asc) {\n        _id,\n        _type,\n        name,\n        description,\n        price,\n        category,\n        image,\n        allergens,\n        dietary,\n        available,\n        featured,\n        spicyLevel\n      }\n    "], ["\n      *[_type == \"menuItem\" && available == true ", "] | order(featured desc, name asc) {\n        _id,\n        _type,\n        name,\n        description,\n        price,\n        category,\n        image,\n        allergens,\n        dietary,\n        available,\n        featured,\n        spicyLevel\n      }\n    "])), categoryFilter);
                        return [4 /*yield*/, this.client.fetch(query, category ? { category: category } : {})];
                    case 1:
                        menuItems = _a.sent();
                        return [2 /*return*/, zod_1.z.array(exports.MenuItemSchema).parse(menuItems)];
                }
            });
        });
    };
    /**
     * Récupère les informations du restaurant
     */
    CMSIntegration.prototype.getRestaurantInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = (0, next_sanity_1.groq)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      *[_type == \"restaurantInfo\"][0] {\n        _id,\n        _type,\n        name,\n        description,\n        address,\n        contact,\n        hours,\n        socialMedia,\n        images\n      }\n    "], ["\n      *[_type == \"restaurantInfo\"][0] {\n        _id,\n        _type,\n        name,\n        description,\n        address,\n        contact,\n        hours,\n        socialMedia,\n        images\n      }\n    "])));
                        return [4 /*yield*/, this.client.fetch(query)];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, info ? exports.RestaurantInfoSchema.parse(info) : null];
                }
            });
        });
    };
    /**
     * Recherche dans le contenu
     */
    CMSIntegration.prototype.searchContent = function (searchTerm, types) {
        if (types === void 0) { types = ['page', 'article', 'product']; }
        return __awaiter(this, void 0, void 0, function () {
            var typeFilter, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        typeFilter = types.map(function (type) { return "_type == \"".concat(type, "\""); }).join(' || ');
                        query = (0, next_sanity_1.groq)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      *[_type in [", "] && (\n        title match $searchTerm ||\n        description match $searchTerm ||\n        pt::text(content) match $searchTerm\n      )] | order(_score desc) [0...20] {\n        _id,\n        _type,\n        title,\n        slug,\n        description,\n        _score\n      }\n    "], ["\n      *[_type in [", "] && (\n        title match $searchTerm ||\n        description match $searchTerm ||\n        pt::text(content) match $searchTerm\n      )] | order(_score desc) [0...20] {\n        _id,\n        _type,\n        title,\n        slug,\n        description,\n        _score\n      }\n    "])), types.map(function (t) { return "\"".concat(t, "\""); }).join(', '));
                        return [4 /*yield*/, this.client.fetch(query, {
                                searchTerm: "".concat(searchTerm, "*")
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Crée ou met à jour du contenu
     */
    CMSIntegration.prototype.createOrUpdateContent = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.writeClient.createOrReplace(doc)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Erreur création/mise à jour contenu:', error_1);
                        throw new Error('Impossible de sauvegarder le contenu');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Supprime du contenu
     */
    CMSIntegration.prototype.deleteContent = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.writeClient.delete(documentId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Erreur suppression contenu:', error_2);
                        throw new Error('Impossible de supprimer le contenu');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Upload d'image
     */
    CMSIntegration.prototype.uploadImage = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var asset, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.writeClient.assets.upload('image', file, {
                                filename: file.name,
                            })];
                    case 1:
                        asset = _a.sent();
                        return [2 /*return*/, {
                                asset: {
                                    _ref: asset._id,
                                    _type: 'reference',
                                },
                                alt: file.name,
                            }];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Erreur upload image:', error_3);
                        throw new Error('Impossible d\'uploader l\'image');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Génère l'URL d'une image Sanity
     */
    CMSIntegration.prototype.getImageUrl = function (image, width, height) {
        var _a;
        if (!((_a = image === null || image === void 0 ? void 0 : image.asset) === null || _a === void 0 ? void 0 : _a._ref))
            return '';
        var baseUrl = "https://cdn.sanity.io/images/".concat(exports.sanityConfig.projectId, "/").concat(exports.sanityConfig.dataset);
        var imageId = image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png');
        var url = "".concat(baseUrl, "/").concat(imageId);
        if (width || height) {
            var params = new URLSearchParams();
            if (width)
                params.append('w', width.toString());
            if (height)
                params.append('h', height.toString());
            params.append('fit', 'crop');
            params.append('auto', 'format');
            url += "?".concat(params.toString());
        }
        return url;
    };
    /**
     * Convertit le Portable Text en HTML
     */
    CMSIntegration.prototype.portableTextToHtml = function (portableText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Implémentation basique - peut être étendue avec @portabletext/to-html
                return [2 /*return*/, portableText
                        .map(function (block) {
                        if (block._type === 'block') {
                            return "<p>".concat(block.children.map(function (child) { return child.text; }).join(''), "</p>");
                        }
                        return '';
                    })
                        .join('')];
            });
        });
    };
    /**
     * Gestion du preview mode
     */
    CMSIntegration.prototype.getPreviewData = function (token, documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var query, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (token !== process.env.SANITY_PREVIEW_SECRET) {
                            throw new Error('Token de preview invalide');
                        }
                        query = (0, next_sanity_1.groq)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["*[_id == $documentId][0]"], ["*[_id == $documentId][0]"])));
                        return [4 /*yield*/, this.writeClient.fetch(query, { documentId: documentId })];
                    case 1:
                        document = _a.sent();
                        return [2 /*return*/, document];
                }
            });
        });
    };
    /**
     * Valide les webhooks Sanity
     */
    CMSIntegration.prototype.validateWebhook = function (body, signature) {
        var crypto = require('crypto');
        var secret = process.env.SANITY_WEBHOOK_SECRET;
        if (!secret) {
            throw new Error('SANITY_WEBHOOK_SECRET manquant');
        }
        var computedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');
        return signature === "sha256=".concat(computedSignature);
    };
    /**
     * Gère les webhooks de mise à jour de contenu
     */
    CMSIntegration.prototype.handleContentWebhook = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _type, _id, slug, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _type = payload._type, _id = payload._id, slug = payload.slug;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(_type === 'page' || _type === 'article')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch("/api/revalidate?path=/".concat((slug === null || slug === void 0 ? void 0 : slug.current) || _id), {
                                method: 'POST',
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(_type === 'product')) return [3 /*break*/, 5];
                        return [4 /*yield*/, fetch("/api/revalidate?path=/products/".concat((slug === null || slug === void 0 ? void 0 : slug.current) || _id), {
                                method: 'POST',
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        console.error('Erreur revalidation cache:', error_4);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, { success: true }];
                }
            });
        });
    };
    return CMSIntegration;
}());
exports.CMSIntegration = CMSIntegration;
/**
 * Utilitaires pour les types de contenu
 */
exports.ContentUtils = {
    /**
     * Génère un slug à partir d'un titre
     */
    generateSlug: function (title) {
        return title
            .toLowerCase()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    },
    /**
     * Calcule le temps de lecture estimé
     */
    calculateReadingTime: function (content) {
        var wordCount = content
            .filter(function (block) { return block._type === 'block'; })
            .reduce(function (count, block) {
            var _a;
            var text = ((_a = block.children) === null || _a === void 0 ? void 0 : _a.map(function (child) { return child.text; }).join(' ')) || '';
            return count + text.split(/\s+/).length;
        }, 0);
        return Math.max(1, Math.round(wordCount / 200)); // 200 mots par minute
    },
    /**
     * Extrait un extrait du contenu
     */
    extractExcerpt: function (content, maxLength) {
        if (maxLength === void 0) { maxLength = 160; }
        var text = content
            .filter(function (block) { return block._type === 'block'; })
            .map(function (block) { var _a; return (_a = block.children) === null || _a === void 0 ? void 0 : _a.map(function (child) { return child.text; }).join(' '); })
            .join(' ') || '';
        return text.length > maxLength
            ? text.substring(0, maxLength).trim() + '...'
            : text;
    },
};
exports.default = CMSIntegration;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
