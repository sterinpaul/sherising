import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import type { Article } from '../../types/dashboard';
import { articleAPI } from '../../utils/mockData';

const ArticlesList: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articleAPI.getAll();
      setArticles(data);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await articleAPI.delete(id);
      await loadArticles();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(articles.map(article => article.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-12 bg-gray-200 rounded mb-6" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full mb-4" />
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4D361E]">Articles</h1>
          <p className="text-[#6B3410] text-sm mt-1">
            Manage your blog articles and content
          </p>
        </div>
        
        <motion.button
          onClick={() => navigate('/dashboard/articles/new')}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#C4A173] to-[#4D361E] text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Article
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4A173] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#C4A173] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#C4A173] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Articles Grid */}
      <motion.div variants={itemVariants} className="grid gap-4">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#4D361E] mb-2">No articles found</h3>
            <p className="text-[#6B3410] mb-6">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters to see more articles.'
                : 'Get started by creating your first article.'}
            </p>
            {(!searchTerm && statusFilter === 'all' && categoryFilter === 'all') && (
              <motion.button
                onClick={() => navigate('/dashboard/articles/new')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#C4A173] to-[#4D361E] text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Article
              </motion.button>
            )}
          </div>
        ) : (
          filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-[#4D361E] hover:text-[#391802] cursor-pointer">
                      {article.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      article.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status === 'published' ? (
                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                      ) : (
                        <DocumentIcon className="w-3 h-3 mr-1" />
                      )}
                      {article.status}
                    </span>
                  </div>
                  
                  <p className="text-[#6B3410] mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-[#C4A173] rounded-full mr-2" />
                      {article.category}
                    </span>
                    <span>
                      {format(new Date(article.createdAt), 'MMM d, yyyy')}
                    </span>
                    <span>
                      {article.author.name}
                    </span>
                  </div>

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {article.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[#E8DDD4] text-[#4D361E] text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{article.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    onClick={() => navigate(`/article/${article.id}`)}
                    className="p-2 text-[#6B3410] hover:bg-[#E8DDD4] rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="View"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => navigate(`/dashboard/articles/${article.id}/edit`)}
                    className="p-2 text-[#6B3410] hover:bg-[#E8DDD4] rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Edit"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setDeleteConfirm(article.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-semibold text-[#4D361E] mb-2">Delete Article</h3>
            <p className="text-[#6B3410] mb-6">
              Are you sure you want to delete this article? This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ArticlesList;