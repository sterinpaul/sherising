import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import RichTextEditor from './RichTextEditor';
import type { Article } from '../../types/dashboard';
import { articleAPI } from '../../utils/mockData';
import { authUtils } from '../../utils/auth';

const ArticleEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = id && id !== 'new';
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    status: 'draft',
    tags: [],
    author: {
      id: authUtils.getCurrentUser()?.id || '1',
      name: authUtils.getCurrentUser()?.name || 'Admin User'
    }
  });

  const categories = ['Education', 'Health', 'STEM', 'Community', 'Mental Health', 'Technology', 'Media', 'Sustainability', 'Digital', 'Feminism', 'Environment', 'Policy', 'Activism', 'Culture', 'Economics', 'Academic', 'Global'];

  useEffect(() => {
    if (isEditing) {
      loadArticle();
    }
  }, [id, isEditing]);

  const loadArticle = async () => {
    if (!id || id === 'new') return;
    
    try {
      setLoading(true);
      const data = await articleAPI.getById(id);
      if (data) {
        setArticle(data);
      } else {
        navigate('/dashboard/articles');
      }
    } catch (error) {
      console.error('Failed to load article:', error);
      navigate('/dashboard/articles');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    try {
      setSaving(true);
      
      const articleData = {
        ...article,
        status,
        ...(status === 'published' && !article.publishedAt && { publishedAt: new Date().toISOString() })
      };
console.log('..........articleData........',articleData);

      if (isEditing && id) {
        await articleAPI.update(id, articleData);
      } else {
        await articleAPI.create(articleData as Omit<Article, 'id' | 'createdAt' | 'updatedAt'>);
      }

      navigate('/dashboard/articles');
    } catch (error) {
      console.error('Failed to save article:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !article.tags?.includes(value)) {
        setArticle(prev => ({
          ...prev,
          tags: [...(prev.tags || []), value]
        }));
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const generateExcerpt = () => {
    if (article.content) {
      // Strip HTML tags and get first 160 characters
      const plainText = article.content.replace(/<[^>]*>/g, '');
      const excerpt = plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
      setArticle(prev => ({ ...prev, excerpt }));
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => navigate('/dashboard/articles')}
            className="p-2 text-[#4D361E] hover:bg-[#E8DDD4] rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </motion.button>
          
          <div>
            <h1 className="text-2xl font-bold text-[#4D361E]">
              {isEditing ? 'Edit Article' : 'New Article'}
            </h1>
            {isEditing && article.updatedAt && (
              <p className="text-[#6B3410] text-sm">
                Last updated {format(new Date(article.updatedAt), 'MMM d, yyyy • h:mm a')}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing && (
            <motion.button
              onClick={() => navigate(`/article/${id}`)}
              className="inline-flex items-center px-4 py-2 border border-[#C4A173] text-[#C4A173] rounded-lg hover:bg-[#C4A173] hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              Preview
            </motion.button>
          )}
          
          <motion.button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
          >
            <BookmarkIcon className="w-4 h-4 mr-2" />
            Save Draft
          </motion.button>
          
          <motion.button
            onClick={() => handleSave('published')}
            disabled={saving || !article.title || !article.content}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#C4A173] to-[#4D361E] text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            whileHover={{ scale: (saving || !article.title || !article.content) ? 1 : 1.02 }}
            whileTap={{ scale: (saving || !article.title || !article.content) ? 1 : 0.98 }}
          >
            <CheckIcon className="w-4 h-4 mr-2" />
            {saving ? 'Publishing...' : 'Publish'}
          </motion.button>
        </div>
      </div>

      {/* Editor Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#4D361E] mb-2">
            Article Title *
          </label>
          <input
            type="text"
            id="title"
            value={article.title || ''}
            onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter your article title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-xl font-semibold text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent placeholder-gray-400"
          />
        </div>

        {/* Category and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#4D361E] mb-2">
              Category *
            </label>
            <select
              id="category"
              value={article.category || ''}
              onChange={(e) => setArticle(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-[#4D361E] mb-2">
              Status
            </label>
            <select
              id="status"
              value={article.status || 'draft'}
              onChange={(e) => setArticle(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="excerpt" className="block text-sm font-medium text-[#4D361E]">
              Excerpt
            </label>
            <button
              type="button"
              onClick={generateExcerpt}
              className="text-sm text-[#C4A173] hover:text-[#4D361E] transition-colors"
            >
              Generate from content
            </button>
          </div>
          <textarea
            id="excerpt"
            value={article.excerpt || ''}
            onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief description of your article..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent resize-none placeholder-gray-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            {article.excerpt?.length || 0}/200 characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-[#4D361E] mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.tags?.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-[#E8DDD4] text-[#4D361E] text-sm rounded-full"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-[#6B3410] hover:text-[#4D361E]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a tag and press Enter or comma..."
            onKeyDown={handleTagInput}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent placeholder-gray-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            Press Enter or comma to add tags
          </p>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-[#4D361E] mb-2">
            Content *
          </label>
          <RichTextEditor
            content={article.content || ''}
            onChange={(content) => setArticle(prev => ({ ...prev, content }))}
            placeholder="Start writing your article..."
            className="min-h-[400px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleEditor;