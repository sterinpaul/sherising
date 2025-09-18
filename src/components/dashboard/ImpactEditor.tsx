import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  BookmarkIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import RichTextEditor from './RichTextEditor';
import type { Impact } from '../../types/dashboard';
import { impactAPI } from '../../utils/mockData';

const ImpactEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = id && id !== 'new';
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [impact, setImpact] = useState<Partial<Impact>>({
    title: '',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    status: 'draft',
    location: '',
    participants: 0
  });

  useEffect(() => {
    if (isEditing) {
      loadImpact();
    }
  }, [id, isEditing]);

  const loadImpact = async () => {
    if (!id || id === 'new') return;
    
    try {
      setLoading(true);
      const data = await impactAPI.getById(id);
      if (data) {
        setImpact(data);
      } else {
        navigate('/dashboard/impacts');
      }
    } catch (error) {
      console.error('Failed to load impact:', error);
      navigate('/dashboard/impacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    try {
      setSaving(true);
      
      const impactData = {
        ...impact,
        status
      };

      if (isEditing && id) {
        await impactAPI.update(id, impactData);
      } else {
        await impactAPI.create(impactData as Omit<Impact, 'id' | 'createdAt' | 'updatedAt'>);
      }

      navigate('/dashboard/impacts');
    } catch (error) {
      console.error('Failed to save impact:', error);
    } finally {
      setSaving(false);
    }
  };

  const generateDescription = () => {
    if (impact.content) {
      // Strip HTML tags and get first 200 characters
      const plainText = impact.content.replace(/<[^>]*>/g, '');
      const description = plainText.slice(0, 200) + (plainText.length > 200 ? '...' : '');
      setImpact(prev => ({ ...prev, description }));
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="h-12 bg-gray-200 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
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
            onClick={() => navigate('/dashboard/impacts')}
            className="p-2 text-[#4D361E] hover:bg-[#E8DDD4] rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </motion.button>
          
          <div>
            <h1 className="text-2xl font-bold text-[#4D361E]">
              {isEditing ? 'Edit Impact' : 'New Impact'}
            </h1>
            {isEditing && impact.updatedAt && (
              <p className="text-[#6B3410] text-sm">
                Last updated {format(new Date(impact.updatedAt), 'MMM d, yyyy • h:mm a')}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing && (
            <motion.button
              onClick={() => navigate(`/impact/${id}`)}
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
            disabled={saving || !impact.title || !impact.content}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#C4A173] to-[#4D361E] text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            whileHover={{ scale: (saving || !impact.title || !impact.content) ? 1 : 1.02 }}
            whileTap={{ scale: (saving || !impact.title || !impact.content) ? 1 : 0.98 }}
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
            Impact Title *
          </label>
          <input
            type="text"
            id="title"
            value={impact.title || ''}
            onChange={(e) => setImpact(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter your impact story title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-xl font-semibold text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent placeholder-gray-400"
          />
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-[#4D361E] mb-2">
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Event Date *
            </label>
            <input
              type="date"
              id="date"
              value={impact.date || ''}
              onChange={(e) => setImpact(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-[#4D361E] mb-2">
              <MapPinIcon className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              id="location"
              value={impact.location || ''}
              onChange={(e) => setImpact(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Event location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="participants" className="block text-sm font-medium text-[#4D361E] mb-2">
              <UsersIcon className="w-4 h-4 inline mr-1" />
              Participants
            </label>
            <input
              type="number"
              id="participants"
              value={impact.participants || ''}
              onChange={(e) => setImpact(prev => ({ ...prev, participants: parseInt(e.target.value) || 0 }))}
              placeholder="Number of participants"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-[#4D361E] mb-2">
            Status
          </label>
          <select
            id="status"
            value={impact.status || 'draft'}
            onChange={(e) => setImpact(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="description" className="block text-sm font-medium text-[#4D361E]">
              Description
            </label>
            <button
              type="button"
              onClick={generateDescription}
              className="text-sm text-[#C4A173] hover:text-[#4D361E] transition-colors"
            >
              Generate from content
            </button>
          </div>
          <textarea
            id="description"
            value={impact.description || ''}
            onChange={(e) => setImpact(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of this impact story..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#4D361E] bg-white focus:ring-2 focus:ring-[#C4A173] focus:border-transparent resize-none placeholder-gray-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            {impact.description?.length || 0}/250 characters
          </p>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-[#4D361E] mb-2">
            Content *
          </label>
          <RichTextEditor
            content={impact.content || ''}
            onChange={(content) => setImpact(prev => ({ ...prev, content }))}
            placeholder="Tell your impact story..."
            className="min-h-[400px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ImpactEditor;