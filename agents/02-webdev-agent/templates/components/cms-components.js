/**
 * Composants CMS pour l'interface admin et l'affichage de contenu
 * Phase 2 - WebDev Agent
 */
'use client';
"use strict";
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
exports.CMSContent = exports.CMSAdmin = void 0;
var react_1 = require("react");
var cms_integration_1 = require("../workflows/cms-integration");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = require("react-hot-toast");
/**
 * Interface principale d'administration CMS
 */
function CMSAdmin(_a) {
    var _this = this;
    var _b = _a.isPreview, isPreview = _b === void 0 ? false : _b;
    var cms = (0, react_1.useState)(function () { return new cms_integration_1.CMSIntegration(isPreview); })[0];
    var _c = (0, react_1.useState)('pages'), activeTab = _c[0], setActiveTab = _c[1];
    var _d = (0, react_1.useState)([]), content = _d[0], setContent = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(''), searchTerm = _f[0], setSearchTerm = _f[1];
    var _g = (0, react_1.useState)(false), showEditor = _g[0], setShowEditor = _g[1];
    var _h = (0, react_1.useState)(null), editingItem = _h[0], setEditingItem = _h[1];
    var loadContent = (0, react_1.useCallback)(function (type) { return __awaiter(_this, void 0, void 0, function () {
        var data, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, 12, 13]);
                    data = [];
                    _a = type;
                    switch (_a) {
                        case 'pages': return [3 /*break*/, 2];
                        case 'articles': return [3 /*break*/, 4];
                        case 'products': return [3 /*break*/, 6];
                        case 'menu': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 10];
                case 2: return [4 /*yield*/, cms.getPages(20)];
                case 3:
                    data = _b.sent();
                    return [3 /*break*/, 10];
                case 4: return [4 /*yield*/, cms.getArticles(20)];
                case 5:
                    data = _b.sent();
                    return [3 /*break*/, 10];
                case 6: return [4 /*yield*/, cms.getProducts(20)];
                case 7:
                    data = _b.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, cms.getMenuItems()];
                case 9:
                    data = _b.sent();
                    return [3 /*break*/, 10];
                case 10:
                    setContent(data);
                    return [3 /*break*/, 13];
                case 11:
                    error_1 = _b.sent();
                    console.error('Erreur chargement contenu:', error_1);
                    react_hot_toast_1.toast.error('Erreur lors du chargement du contenu');
                    return [3 /*break*/, 13];
                case 12:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    }); }, [cms]);
    (0, react_1.useEffect)(function () {
        loadContent(activeTab);
    }, [activeTab, loadContent]);
    var handleSearch = function () { return __awaiter(_this, void 0, void 0, function () {
        var results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!searchTerm.trim()) {
                        loadContent(activeTab);
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, cms.searchContent(searchTerm, [activeTab.slice(0, -1)])];
                case 2:
                    results = _a.sent();
                    setContent(results);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erreur recherche:', error_2);
                    react_hot_toast_1.toast.error('Erreur lors de la recherche');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?'))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cms.deleteContent(id)];
                case 2:
                    _a.sent();
                    react_hot_toast_1.toast.success('Élément supprimé avec succès');
                    loadContent(activeTab);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Erreur suppression:', error_3);
                    react_hot_toast_1.toast.error('Erreur lors de la suppression');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var tabs = [
        { key: 'pages', label: 'Pages', icon: lucide_react_1.FileText },
        { key: 'articles', label: 'Articles', icon: lucide_react_1.FileText },
        { key: 'products', label: 'Produits', icon: lucide_react_1.ShoppingBag },
        { key: 'menu', label: 'Menu', icon: lucide_react_1.Tag },
    ];
    return (<div className="bg-white rounded-lg shadow-lg min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Administration CMS
          </h1>
          <button onClick={function () {
            setEditingItem(null);
            setShowEditor(true);
        }} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2">
            <lucide_react_1.Plus className="w-4 h-4"/>
            Nouveau
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 flex gap-4">
          <div className="flex-1 relative">
            <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
            <input type="text" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} onKeyDown={function (e) { return e.key === 'Enter' && handleSearch(); }} placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
          </div>
          <button onClick={handleSearch} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
            Rechercher
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map(function (_a) {
            var key = _a.key, label = _a.label, Icon = _a.icon;
            return (<button key={key} onClick={function () { return setActiveTab(key); }} className={"py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ".concat(activeTab === key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')}>
              <Icon className="w-4 h-4"/>
              {label}
            </button>);
        })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (<div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>) : (<ContentList items={content} onEdit={function (item) {
                setEditingItem(item);
                setShowEditor(true);
            }} onDelete={handleDelete} type={activeTab}/>)}
      </div>

      {/* Editor Modal */}
      {showEditor && (<ContentEditor item={editingItem} type={activeTab.slice(0, -1)} // Remove 's' from plural
         onClose={function () {
                setShowEditor(false);
                setEditingItem(null);
            }} onSave={function () {
                setShowEditor(false);
                setEditingItem(null);
                loadContent(activeTab);
            }} cms={cms}/>)}
    </div>);
}
exports.CMSAdmin = CMSAdmin;
/**
 * Liste des éléments de contenu
 */
function ContentList(_a) {
    var items = _a.items, onEdit = _a.onEdit, onDelete = _a.onDelete, type = _a.type;
    if (items.length === 0) {
        return (<div className="text-center py-12">
        <lucide_react_1.FileText className="mx-auto h-12 w-12 text-gray-400"/>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun contenu</h3>
        <p className="mt-1 text-sm text-gray-500">
          Commencez par créer votre premier {type.slice(0, -1)}.
        </p>
      </div>);
    }
    return (<div className="space-y-4">
      {items.map(function (item) { return (<div key={item._id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              {item.featured && (<span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  Featured
                </span>)}
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <lucide_react_1.Calendar className="w-3 h-3"/>
                {new Date(item._createdAt).toLocaleDateString('fr-FR')}
              </span>
              
              <span>
                /{item.slug.current}
              </span>
              
              {item.publishedAt && (<span className="text-green-600">
                  Publié
                </span>)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={function () { return window.open("/".concat(item.slug.current), '_blank'); }} className="p-2 text-gray-500 hover:text-gray-700" title="Prévisualiser">
              <lucide_react_1.Eye className="w-4 h-4"/>
            </button>
            
            <button onClick={function () { return onEdit(item); }} className="p-2 text-blue-600 hover:text-blue-800" title="Modifier">
              <lucide_react_1.Edit className="w-4 h-4"/>
            </button>
            
            <button onClick={function () { return onDelete(item._id); }} className="p-2 text-red-600 hover:text-red-800" title="Supprimer">
              <lucide_react_1.Trash2 className="w-4 h-4"/>
            </button>
          </div>
        </div>); })}
    </div>);
}
/**
 * Éditeur de contenu
 */
function ContentEditor(_a) {
    var _this = this;
    var _b;
    var item = _a.item, type = _a.type, onClose = _a.onClose, onSave = _a.onSave, cms = _a.cms;
    var _c = (0, react_1.useState)({
        title: (item === null || item === void 0 ? void 0 : item.title) || '',
        slug: ((_b = item === null || item === void 0 ? void 0 : item.slug) === null || _b === void 0 ? void 0 : _b.current) || '',
        description: '',
        content: '',
        featured: (item === null || item === void 0 ? void 0 : item.featured) || false,
        price: 0,
        category: '',
    }), formData = _c[0], setFormData = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)([]), images = _e[0], setImages = _e[1];
    (0, react_1.useEffect)(function () {
        if (formData.title && !item) {
            setFormData(function (prev) { return (__assign(__assign({}, prev), { slug: cms_integration_1.ContentUtils.generateSlug(prev.title) })); });
        }
    }, [formData.title, item]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var uploadedImages, document_1, error_4;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, Promise.all(images.map(function (file) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cms.uploadImage(file)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 2:
                    uploadedImages = _a.sent();
                    document_1 = __assign(__assign(__assign({ _id: item === null || item === void 0 ? void 0 : item._id, _type: type, title: formData.title, slug: { current: formData.slug }, description: formData.description, content: formData.content ? [
                            {
                                _type: 'block',
                                _key: 'content',
                                style: 'normal',
                                children: [{ _type: 'span', text: formData.content }]
                            }
                        ] : [], featured: formData.featured, publishedAt: new Date().toISOString() }, (type === 'product' && {
                        price: formData.price,
                        category: { title: formData.category },
                        images: uploadedImages,
                        inStock: true,
                    })), (type === 'menuItem' && {
                        price: formData.price,
                        category: formData.category,
                        available: true,
                    })), { seo: {
                            title: formData.title,
                            description: formData.description.substring(0, 160),
                        } });
                    return [4 /*yield*/, cms.createOrUpdateContent(document_1)];
                case 3:
                    _a.sent();
                    react_hot_toast_1.toast.success(item ? 'Contenu mis à jour' : 'Contenu créé');
                    onSave();
                    return [3 /*break*/, 6];
                case 4:
                    error_4 = _a.sent();
                    console.error('Erreur sauvegarde:', error_4);
                    react_hot_toast_1.toast.error('Erreur lors de la sauvegarde');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleImageUpload = function (e) {
        var files = Array.from(e.target.files || []);
        setImages(function (prev) { return __spreadArray(__spreadArray([], prev, true), files, true); });
    };
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {item ? 'Modifier' : 'Créer'} {type}
            </h2>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                Annuler
              </button>
              <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50">
                {loading ? (<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>) : (<lucide_react_1.Save className="w-4 h-4"/>)}
                Sauvegarder
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre *
              </label>
              <input type="text" value={formData.title} onChange={function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { title: e.target.value })); }); }} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input type="text" value={formData.slug} onChange={function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { slug: e.target.value })); }); }} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea value={formData.description} onChange={function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { description: e.target.value })); }); }} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu
              </label>
              <textarea value={formData.content} onChange={function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { content: e.target.value })); }); }} rows={8} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
            </div>

            {/* Price (for products/menu items) */}
            {(type === 'product' || type === 'menuItem') && (<div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€)
                </label>
                <input type="number" step="0.01" value={formData.price} onChange={function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { price: parseFloat(e.target.value) })); }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
              </div>)}

            {/* Category (for products/menu items) */}
            {(type === 'product' || type === 'menuItem') && (<div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <input type="text" value={formData.category} onChange={function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { category: e.target.value })); }); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"/>
              </div>)}

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <lucide_react_1.Image className="mx-auto h-12 w-12 text-gray-400"/>
                <div className="mt-2">
                  <label className="cursor-pointer">
                    <span className="text-primary hover:text-primary/80">
                      Télécharger des images
                    </span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden"/>
                  </label>
                </div>
                {images.length > 0 && (<div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {images.length} image(s) sélectionnée(s)
                    </p>
                  </div>)}
              </div>
            </div>

            {/* Featured */}
            <div>
              <label className="flex items-center">
                <input type="checkbox" checked={formData.featured} onChange={function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { featured: e.target.checked })); }); }} className="rounded border-gray-300 text-primary focus:ring-primary"/>
                <span className="ml-2 text-sm text-gray-700">
                  Contenu mis en avant
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>);
}
/**
 * Composant d'affichage du contenu CMS
 */
function CMSContent(_a) {
    var _this = this;
    var _b;
    var type = _a.type, slug = _a.slug, _c = _a.isPreview, isPreview = _c === void 0 ? false : _c;
    var cms = (0, react_1.useState)(function () { return new cms_integration_1.CMSIntegration(isPreview); })[0];
    var _d = (0, react_1.useState)(null), content = _d[0], setContent = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    (0, react_1.useEffect)(function () {
        var loadContent = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, _a, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, 9, 10]);
                        data = null;
                        _a = type;
                        switch (_a) {
                            case 'page': return [3 /*break*/, 1];
                            case 'article': return [3 /*break*/, 3];
                            case 'product': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, cms.getPageBySlug(slug)];
                    case 2:
                        data = _b.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, cms.getArticleBySlug(slug)];
                    case 4:
                        data = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, cms.getProductBySlug(slug)];
                    case 6:
                        data = _b.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        setContent(data);
                        return [3 /*break*/, 10];
                    case 8:
                        error_5 = _b.sent();
                        console.error('Erreur chargement contenu:', error_5);
                        return [3 /*break*/, 10];
                    case 9:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        loadContent();
    }, [cms, type, slug]);
    if (loading) {
        return (<div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>);
    }
    if (!content) {
        return (<div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contenu non trouvé
        </h2>
        <p className="text-gray-600">
          Le contenu demandé n'existe pas ou n'est pas publié.
        </p>
      </div>);
    }
    return (<article className="max-w-4xl mx-auto px-4 py-8">
      {/* Preview banner */}
      {isPreview && (<div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg mb-6">
          Mode prévisualisation - Ce contenu n'est pas encore publié
        </div>)}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        
        {content.description && (<p className="text-xl text-gray-600 mb-6">
            {content.description}
          </p>)}

        {/* Meta information */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {content.publishedAt && (<span className="flex items-center gap-1">
              <lucide_react_1.Calendar className="w-4 h-4"/>
              {new Date(content.publishedAt).toLocaleDateString('fr-FR')}
            </span>)}
          
          {content.author && (<span className="flex items-center gap-1">
              <lucide_react_1.User className="w-4 h-4"/>
              {content.author.name}
            </span>)}
          
          {content.readingTime && (<span>
              {content.readingTime} min de lecture
            </span>)}
        </div>
      </header>

      {/* Featured image */}
      {content.featuredImage && (<div className="mb-8">
          <img src={cms.getImageUrl(content.featuredImage, 800, 400)} alt={content.featuredImage.alt || content.title} className="w-full h-64 object-cover rounded-lg"/>
        </div>)}

      {/* Content */}
      {content.content && (<div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{
                __html: content.content.map(function (block) {
                    if (block._type === 'block') {
                        return "<p>".concat(block.children.map(function (child) { return child.text; }).join(''), "</p>");
                    }
                    return '';
                }).join('')
            }}/>
        </div>)}

      {/* Product specific content */}
      {type === 'product' && (<div className="mt-8 border-t pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Caractéristiques</h3>
              {content.features && (<ul className="space-y-2">
                  {content.features.map(function (feature, index) { return (<li key={index} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>); })}
                </ul>)}
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-4">
                  {(_b = content.price) === null || _b === void 0 ? void 0 : _b.toFixed(2)} €
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>)}
    </article>);
}
exports.CMSContent = CMSContent;
exports.default = CMSAdmin;
