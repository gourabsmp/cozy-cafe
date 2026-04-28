import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function OffersEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', badge: '', imageUrl: '', active: true
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/offers');
      setItems(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load offers');
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
      setFormData({ title: '', description: '', badge: '', imageUrl: '', active: true });
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
        await api.put(`/api/offers/${editingId}`, formData);
        toast.success('Offer updated');
      } else {
        await api.post('/api/offers', formData);
        toast.success('Offer created');
      }
      handleCloseModal();
      fetchItems();
    } catch (err) {
      toast.error('Failed to save offer');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      await api.delete(`/api/offers/${id}`);
      toast.success('Offer deleted');
      fetchItems();
    } catch (err) {
      toast.error('Failed to delete offer');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Offers Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {item.imageUrl && (
              <div className="md:w-1/3">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover min-h-[150px]" />
              </div>
            )}
            <div className="p-5 flex-1 relative">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                <div className="flex space-x-2">
                  <button onClick={() => handleOpenModal(item)} className="text-blue-600 hover:text-blue-800">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              
              <div className="flex justify-between items-center mt-auto">
                {item.badge && (
                  <span className="bg-cafe-accent/10 text-cafe-accent text-xs px-2 py-1 rounded font-medium">
                    {item.badge}
                  </span>
                )}
                <span className={`px-2 py-1 text-xs rounded-full ${item.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
          No offers found.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">{editingId ? 'Edit Offer' : 'Add Offer'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input type="text" required name="title" value={formData.title || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                <input type="text" name="badge" value={formData.badge || ''} onChange={handleChange} placeholder="e.g. 'Limited Time'" className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="active" name="active" checked={formData.active !== false} onChange={handleChange} className="h-4 w-4 text-cafe-accent focus:ring-cafe-accent border-gray-300 rounded" />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">Active Offer</label>
              </div>

              <div className="flex justify-end pt-4 border-t mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
