import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function ReviewsEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    author: '', rating: 5, text: '', avatarUrl: '', featured: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/reviews');
      setItems(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({ author: '', rating: 5, text: '', avatarUrl: '', featured: false });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/reviews/${editingId}`, formData);
        toast.success('Review updated');
      } else {
        await api.post('/api/reviews', formData);
        toast.success('Review created');
      }
      handleCloseModal();
      fetchItems();
    } catch (err) {
      toast.error('Failed to save review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await api.delete(`/api/reviews/${id}`);
      toast.success('Review deleted');
      fetchItems();
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reviews Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                {item.avatarUrl ? (
                  <img src={item.avatarUrl} alt={item.author} className="w-10 h-10 rounded-full object-cover mr-3" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-bold">
                    {item.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-800">{item.author}</h3>
                  <div className="flex text-yellow-400 text-sm">
                    {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleOpenModal(item)} className="text-blue-600 hover:text-blue-800">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">"{item.text}"</p>
            {item.featured && (
              <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </div>
            )}
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
          No reviews found.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">{editingId ? 'Edit Review' : 'Add Review'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
                <input type="text" required name="author" value={formData.author || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5) *</label>
                <input type="number" min="1" max="5" required name="rating" value={formData.rating || 5} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Text *</label>
                <textarea required name="text" value={formData.text || ''} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                <input type="text" name="avatarUrl" value={formData.avatarUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="featured" name="featured" checked={formData.featured || false} onChange={handleChange} className="h-4 w-4 text-cafe-accent focus:ring-cafe-accent border-gray-300 rounded" />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Feature on homepage</label>
              </div>

              <div className="flex justify-end pt-4 border-t mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
