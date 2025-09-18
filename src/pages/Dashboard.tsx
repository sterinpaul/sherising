import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  SparklesIcon, 
  PlusCircleIcon, 
  ArrowTrendingUpIcon,
  EyeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import DashboardStats from '../components/dashboard/DashboardStats';
import type { Article, Impact } from '../types/dashboard';
import { articleAPI, impactAPI } from '../utils/mockData';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [recentImpacts, setRecentImpacts] = useState<Impact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentContent();
  }, []);

  const loadRecentContent = async () => {
    try {
      setLoading(true);
      const [articles, impacts] = await Promise.all([
        articleAPI.getAll(),
        impactAPI.getAll()
      ]);
      
      // Get 5 most recent articles
      const sortedArticles = articles
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5);
      
      // Get 5 most recent impacts
      const sortedImpacts = impacts
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5);
      
      setRecentArticles(sortedArticles);
      setRecentImpacts(sortedImpacts);
    } catch (error) {
      console.error('Failed to load recent content:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#C4A173] to-[#4D361E] rounded-xl p-4 md:p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-white/90 text-sm md:text-base">
              Here's what's happening with your content today.
            </p>
          </div>
          <div className="hidden md:block">
            <motion.div
              className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <ArrowTrendingUpIcon className="w-8 h-8" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <DashboardStats />

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-[#4D361E] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            onClick={() => navigate('/dashboard/articles/new')}
            className="flex items-center p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DocumentTextIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-blue-900 text-sm md:text-base">New Article</p>
              <p className="text-blue-600 text-xs md:text-sm">Create a blog post</p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate('/dashboard/impacts/new')}
            className="flex items-center p-3 md:p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SparklesIcon className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-purple-900 text-sm md:text-base">New Impact</p>
              <p className="text-purple-600 text-xs md:text-sm">Share an impact story</p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate('/dashboard/articles')}
            className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg hover:from-green-100 hover:to-green-200 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DocumentTextIcon className="w-8 h-8 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-green-900">Manage Articles</p>
              <p className="text-green-600 text-sm">View all articles</p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate('/dashboard/impacts')}
            className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SparklesIcon className="w-8 h-8 text-orange-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-orange-900">Manage Impacts</p>
              <p className="text-orange-600 text-sm">View all impacts</p>
            </div>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Recent Articles */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#4D361E]">Recent Articles</h2>
            <motion.button
              onClick={() => navigate('/dashboard/articles')}
              className="text-[#C4A173] hover:text-[#4D361E] text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              View All
            </motion.button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : recentArticles.length === 0 ? (
            <div className="text-center py-8">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No articles yet</p>
              <motion.button
                onClick={() => navigate('/dashboard/articles/new')}
                className="inline-flex items-center px-3 py-2 bg-[#C4A173] text-white rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusCircleIcon className="w-4 h-4 mr-1" />
                Create First Article
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <motion.div
                  key={article.id}
                  className="border-l-4 border-[#C4A173] pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/dashboard/articles/${article.id}/edit`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-[#4D361E] mb-1 line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          article.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status}
                        </span>
                        <span className="flex items-center">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {format(new Date(article.updatedAt), 'MMM d')}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/article/${article.id}`);
                      }}
                      className="p-1 text-gray-400 hover:text-[#C4A173] transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Impacts */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#4D361E]">Recent Impacts</h2>
            <motion.button
              onClick={() => navigate('/dashboard/impacts')}
              className="text-[#C4A173] hover:text-[#4D361E] text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              View All
            </motion.button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : recentImpacts.length === 0 ? (
            <div className="text-center py-8">
              <SparklesIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No impact stories yet</p>
              <motion.button
                onClick={() => navigate('/dashboard/impacts/new')}
                className="inline-flex items-center px-3 py-2 bg-[#C4A173] text-white rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusCircleIcon className="w-4 h-4 mr-1" />
                Create First Impact
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentImpacts.map((impact) => (
                <motion.div
                  key={impact.id}
                  className="border-l-4 border-purple-400 pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/dashboard/impacts/${impact.id}/edit`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-[#4D361E] mb-1 line-clamp-1">
                        {impact.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {impact.description}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          impact.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {impact.status}
                        </span>
                        <span className="flex items-center">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {format(new Date(impact.date), 'MMM d')}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/impact/${impact.id}`);
                      }}
                      className="p-1 text-gray-400 hover:text-purple-500 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;