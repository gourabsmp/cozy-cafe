import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function MenuEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', description: '', imageUrl: '', available: true, sort_order: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/menu');
      setItems(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load menu items');
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
      setFormData({ name: '', category: '', price: '', description: '', imageUrl: '', available: true, sort_order: 0 });
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
        await api.put(`/api/menu/${editingId}`, formData);
        toast.success('Menu item updated');
      } else {
        await api.post('/api/menu', formData);
        toast.success('Menu item created');
      }
      handleCloseModal();
      fetchItems();
    } catch (err) {
      toast.error('Failed to save menu item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/api/menu/${id}`);
      toast.success('Item deleted');
      fetchItems();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Item</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Price</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded object-cover mr-3" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-gray-200 mr-3 flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate w-48">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleOpenModal(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No menu items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" required name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <input type="text" required name="category" value={formData.category || ''} onChange={handleChange} placeholder="e.g. Coffee, Pastries" className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input type="text" required name="price" value={formData.price || ''} onChange={handleChange} placeholder="e.g. $4.50" className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input type="number" name="sort_order" value={formData.sort_order || 0} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} placeholder="https://..." className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="available" name="available" checked={formData.available !== false} onChange={handleChange} className="h-4 w-4 text-cafe-accent focus:ring-cafe-accent border-gray-300 rounded" />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-900">Available on menu</label>
              </div>

              <div className="flex justify-end pt-4 border-t mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
