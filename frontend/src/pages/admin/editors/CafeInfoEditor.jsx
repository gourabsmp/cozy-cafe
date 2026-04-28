import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import { Save } from 'lucide-react';

export default function CafeInfoEditor() {
  const [info, setInfo] = useState({
    name: '',
    address: '',
    phone: '',
    concept: '',
    tagline: '',
    heroTitle: '',
    heroSubtitle: '',
    menuDesc: '',
    ambiance: '',
    marketing: '',
    logoUrl: '',
    socialLinks: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const res = await api.get('/api/cafe-info');
      if (res.data.data) {
        setInfo(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load cafe info');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/cafe-info', info);
      toast.success('Cafe info updated successfully');
    } catch (err) {
      toast.error('Failed to update cafe info');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cafe Information</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cafe Name</label>
            <input
              type="text"
              name="name"
              value={info.name || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={info.phone || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={info.address || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Branding & Hero</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={info.tagline || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
              <input
                type="text"
                name="heroTitle"
                value={info.heroTitle || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
              <input
                type="text"
                name="heroSubtitle"
                value={info.heroSubtitle || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Descriptions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concept</label>
              <textarea
                name="concept"
                value={info.concept || ''}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Menu Description</label>
              <textarea
                name="menuDesc"
                value={info.menuDesc || ''}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
