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
  SparklesIcon,
  CheckCircleIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import type { Impact } from '../../types/dashboard';
import { impactAPI } from '../../utils/mockData';

const ImpactsList: React.FC = () => {
  const navigate = useNavigate();
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadImpacts();
  }, []);

  const loadImpacts = async () => {
    try {
      setLoading(true);
      const data = await impactAPI.getAll();
      setImpacts(data);
    } catch (error) {
      console.error('Failed to load impacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await impactAPI.delete(id);
      await loadImpacts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete impact:', error);
    }
  };

  const filteredImpacts = impacts.filter(impact => {
    const matchesSearch = impact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         impact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         impact.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || impact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
          {[...Array(4)].map((_, i) => (
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
          <h1 className="text-2xl font-bold text-[#4D361E]">Impacts</h1>
          <p className="text-[#6B3410] text-sm mt-1">
            Manage your impact stories and events
          </p>
        </div>
        
        <motion.button
          onClick={() => navigate('/dashboard/impacts/new')}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#C4A173] to-[#4D361E] text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Impact
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
              placeholder="Search impacts..."
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
        </div>
      </motion.div>

      {/* Impacts Grid */}
      <motion.div variants={itemVariants}>
        {filteredImpacts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <SparklesIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#4D361E] mb-2">No impacts found</h3>
            <p className="text-[#6B3410] mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters to see more impacts.'
                : 'Get started by creating your first impact story.'}
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <motion.button
                onClick={() => navigate('/dashboard/impacts/new')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#C4A173] to-[#4D361E] text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Impact
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredImpacts.map((impact) => (
              <motion.div
                key={impact.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-[#4D361E] hover:text-[#391802] cursor-pointer">
                        {impact.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        impact.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {impact.status === 'published' ? (
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                        ) : (
                          <SparklesIcon className="w-3 h-3 mr-1" />
                        )}
                        {impact.status}
                      </span>
                    </div>
                    
                    <p className="text-[#6B3410] mb-3 line-clamp-2">
                      {impact.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {format(new Date(impact.date), 'MMM d, yyyy')}
                      </span>
                      
                      {impact.location && (
                        <span className="inline-flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {impact.location}
                        </span>
                      )}
                      
                      {impact.participants && impact.participants > 0 && (
                        <span className="inline-flex items-center">
                          <UsersIcon className="w-4 h-4 mr-1" />
                          {impact.participants} participants
                        </span>
                      )}
                      
                      <span className="text-xs text-gray-400">
                        Created {format(new Date(impact.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <motion.button
                      onClick={() => navigate(`/impact/${impact.id}`)}
                      className="p-2 text-[#6B3410] hover:bg-[#E8DDD4] rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="View"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => navigate(`/dashboard/impacts/${impact.id}/edit`)}
                      className="p-2 text-[#6B3410] hover:bg-[#E8DDD4] rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setDeleteConfirm(impact.id)}
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
            ))}
          </div>
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
            <h3 className="text-lg font-semibold text-[#4D361E] mb-2">Delete Impact</h3>
            <p className="text-[#6B3410] mb-6">
              Are you sure you want to delete this impact story? This action cannot be undone.
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

export default ImpactsList;