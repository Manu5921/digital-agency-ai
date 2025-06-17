/**
 * Composants CMS pour l'interface admin et l'affichage de contenu
 * Phase 2 - WebDev Agent
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CMSIntegration, ContentUtils } from '../workflows/cms-integration';
import { z } from 'zod';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
  FileText,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Types
interface ContentItem {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  _createdAt: string;
  _updatedAt: string;
  featured?: boolean;
  publishedAt?: string;
}

interface CMSComponentProps {
  isPreview?: boolean;
  editMode?: boolean;
}

/**
 * Interface principale d'administration CMS
 */
export function CMSAdmin({ isPreview = false }: CMSComponentProps) {
  const [cms] = useState(() => new CMSIntegration(isPreview));
  const [activeTab, setActiveTab] = useState<'pages' | 'articles' | 'products' | 'menu'>('pages');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const loadContent = useCallback(async (type: string) => {
    setLoading(true);
    try {
      let data = [];
      switch (type) {
        case 'pages':
          data = await cms.getPages(20);
          break;
        case 'articles':
          data = await cms.getArticles(20);
          break;
        case 'products':
          data = await cms.getProducts(20);
          break;
        case 'menu':
          data = await cms.getMenuItems();
          break;
      }
      setContent(data);
    } catch (error) {
      console.error('Erreur chargement contenu:', error);
      toast.error('Erreur lors du chargement du contenu');
    } finally {
      setLoading(false);
    }
  }, [cms]);

  useEffect(() => {
    loadContent(activeTab);
  }, [activeTab, loadContent]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadContent(activeTab);
      return;
    }

    setLoading(true);
    try {
      const results = await cms.searchContent(searchTerm, [activeTab.slice(0, -1)]); // Remove 's' from plural
      setContent(results);
    } catch (error) {
      console.error('Erreur recherche:', error);
      toast.error('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

    try {
      await cms.deleteContent(id);
      toast.success('Élément supprimé avec succès');
      loadContent(activeTab);
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const tabs = [
    { key: 'pages', label: 'Pages', icon: FileText },
    { key: 'articles', label: 'Articles', icon: FileText },
    { key: 'products', label: 'Produits', icon: ShoppingBag },
    { key: 'menu', label: 'Menu', icon: Tag },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-lg min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Administration CMS
          </h1>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowEditor(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouveau
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Rechercher
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ContentList
            items={content}
            onEdit={(item) => {
              setEditingItem(item);
              setShowEditor(true);
            }}
            onDelete={handleDelete}
            type={activeTab}
          />
        )}
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <ContentEditor
          item={editingItem}
          type={activeTab.slice(0, -1)} // Remove 's' from plural
          onClose={() => {
            setShowEditor(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowEditor(false);
            setEditingItem(null);
            loadContent(activeTab);
          }}
          cms={cms}
        />
      )}
    </div>
  );
}

/**
 * Liste des éléments de contenu
 */
function ContentList({
  items,
  onEdit,
  onDelete,
  type,
}: {
  items: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
  type: string;
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun contenu</h3>
        <p className="mt-1 text-sm text-gray-500">
          Commencez par créer votre premier {type.slice(0, -1)}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              {item.featured && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(item._createdAt).toLocaleDateString('fr-FR')}
              </span>
              
              <span>
                /{item.slug.current}
              </span>
              
              {item.publishedAt && (
                <span className="text-green-600">
                  Publié
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(`/${item.slug.current}`, '_blank')}
              className="p-2 text-gray-500 hover:text-gray-700"
              title="Prévisualiser"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-blue-600 hover:text-blue-800"
              title="Modifier"
            >
              <Edit className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onDelete(item._id)}
              className="p-2 text-red-600 hover:text-red-800"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Éditeur de contenu
 */
function ContentEditor({
  item,
  type,
  onClose,
  onSave,
  cms,
}: {
  item: ContentItem | null;
  type: string;
  onClose: () => void;
  onSave: () => void;
  cms: CMSIntegration;
}) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    slug: item?.slug?.current || '',
    description: '',
    content: '',
    featured: item?.featured || false,
    price: 0,
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (formData.title && !item) {
      setFormData(prev => ({
        ...prev,
        slug: ContentUtils.generateSlug(prev.title)
      }));
    }
  }, [formData.title, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images if any
      const uploadedImages = await Promise.all(
        images.map(async (file) => await cms.uploadImage(file))
      );

      const document = {
        _id: item?._id,
        _type: type,
        title: formData.title,
        slug: { current: formData.slug },
        description: formData.description,
        content: formData.content ? [
          {
            _type: 'block',
            _key: 'content',
            style: 'normal',
            children: [{ _type: 'span', text: formData.content }]
          }
        ] : [],
        featured: formData.featured,
        publishedAt: new Date().toISOString(),
        ...(type === 'product' && {
          price: formData.price,
          category: { title: formData.category },
          images: uploadedImages,
          inStock: true,
        }),
        ...(type === 'menuItem' && {
          price: formData.price,
          category: formData.category,
          available: true,
        }),
        seo: {
          title: formData.title,
          description: formData.description.substring(0, 160),
        },
      };

      await cms.createOrUpdateContent(document);
      toast.success(item ? 'Contenu mis à jour' : 'Contenu créé');
      onSave();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {item ? 'Modifier' : 'Créer'} {type}
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
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
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Price (for products/menu items) */}
            {(type === 'product' || type === 'menuItem') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            {/* Category (for products/menu items) */}
            {(type === 'product' || type === 'menuItem') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label className="cursor-pointer">
                    <span className="text-primary hover:text-primary/80">
                      Télécharger des images
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {images.length} image(s) sélectionnée(s)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Featured */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Contenu mis en avant
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Composant d'affichage du contenu CMS
 */
export function CMSContent({
  type,
  slug,
  isPreview = false,
}: {
  type: 'page' | 'article' | 'product';
  slug: string;
  isPreview?: boolean;
}) {
  const [cms] = useState(() => new CMSIntegration(isPreview));
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        let data = null;
        switch (type) {
          case 'page':
            data = await cms.getPageBySlug(slug);
            break;
          case 'article':
            data = await cms.getArticleBySlug(slug);
            break;
          case 'product':
            data = await cms.getProductBySlug(slug);
            break;
        }
        setContent(data);
      } catch (error) {
        console.error('Erreur chargement contenu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [cms, type, slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contenu non trouvé
        </h2>
        <p className="text-gray-600">
          Le contenu demandé n'existe pas ou n'est pas publié.
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Preview banner */}
      {isPreview && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg mb-6">
          Mode prévisualisation - Ce contenu n'est pas encore publié
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        
        {content.description && (
          <p className="text-xl text-gray-600 mb-6">
            {content.description}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {content.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(content.publishedAt).toLocaleDateString('fr-FR')}
            </span>
          )}
          
          {content.author && (
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {content.author.name}
            </span>
          )}
          
          {content.readingTime && (
            <span>
              {content.readingTime} min de lecture
            </span>
          )}
        </div>
      </header>

      {/* Featured image */}
      {content.featuredImage && (
        <div className="mb-8">
          <img
            src={cms.getImageUrl(content.featuredImage, 800, 400)}
            alt={content.featuredImage.alt || content.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      {content.content && (
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: content.content.map((block: any) => {
              if (block._type === 'block') {
                return `<p>${block.children.map((child: any) => child.text).join('')}</p>`;
              }
              return '';
            }).join('')
          }} />
        </div>
      )}

      {/* Product specific content */}
      {type === 'product' && (
        <div className="mt-8 border-t pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Caractéristiques</h3>
              {content.features && (
                <ul className="space-y-2">
                  {content.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-4">
                  {content.price?.toFixed(2)} €
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default CMSAdmin;