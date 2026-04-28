import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';

export default function GalleryEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    url: '', caption: '', alt: '', sort_order: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/images/gallery');
      setItems(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load gallery items');
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
      setFormData({ url: '', caption: '', alt: '', sort_order: 0 });
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!file) return formData.url;
    setUploading(true);
    const form = new FormData();
    form.append('image', file);
    form.append('bucket', 'gallery');
    
    try {
      const res = await api.post('/api/images/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.url;
    } catch (err) {
      toast.error('Image upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalUrl = formData.url;
      if (file) {
        finalUrl = await uploadImage();
      }

      if (!finalUrl) {
        return toast.error('Please provide an image URL or upload a file');
      }

      const payload = { ...formData, url: finalUrl };

      if (editingId) {
        await api.put(`/api/images/gallery/${editingId}`, payload);
        toast.success('Gallery item updated');
      } else {
        await api.post('/api/images/gallery', payload);
        toast.success('Gallery item created');
      }
      handleCloseModal();
      fetchItems();
    } catch (err) {
      toast.error('Failed to save gallery item');
    }
  };

  const handleDelete = async (id, url) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await api.delete(`/api/images/gallery/${id}`);
      // Also attempt to delete the file from storage if it belongs to us
      if (url.includes('supabase')) {
         await api.delete('/api/images/delete', { data: { url, bucket: 'gallery' } }).catch(() => {});
      }
      toast.success('Image deleted');
      fetchItems();
    } catch (err) {
      toast.error('Failed to delete image');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div className="relative aspect-square">
              <img src={item.url} alt={item.alt || 'Gallery image'} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button onClick={() => handleOpenModal(item)} className="p-2 bg-white text-blue-600 rounded-full hover:bg-gray-100">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(item.id, item.url)} className="p-2 bg-white text-red-600 rounded-full hover:bg-gray-100">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-800 truncate">{item.caption || 'No caption'}</p>
              <p className="text-xs text-gray-500 mt-1">Order: {item.sort_order || 0}</p>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
          No gallery items found.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">{editingId ? 'Edit Image' : 'Add Image'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
                <div className="space-y-3">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                  />
                  <div className="text-center text-xs text-gray-500">OR</div>
                  <input 
                    type="text" 
                    name="url" 
                    value={formData.url || ''} 
                    onChange={handleChange} 
                    placeholder="https://..." 
                    disabled={!!file}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent disabled:bg-gray-100" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input type="text" name="caption" value={formData.caption || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                  <input type="text" name="alt" value={formData.alt || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" name="sort_order" value={formData.sort_order || 0} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" disabled={uploading} className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90 disabled:opacity-50">
                  {uploading ? <span className="animate-spin mr-2">⟳</span> : <Save className="h-4 w-4 mr-2" />}
                  {uploading ? 'Uploading...' : 'Save Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
