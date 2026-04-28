import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../lib/api';
import { Save } from 'lucide-react';

export default function SettingsEditor() {
  const [theme, setTheme] = useState({ primaryColor: '', accentColor: '', bgColor: '', textColor: '' });
  const [animation, setAnimation] = useState({ enabled: true, speed: 'normal', heroStyle: 'fade', cardStyle: 'slide' });
  const [social, setSocial] = useState({ instagram: '', facebook: '', twitter: '' });
  
  const [loading, setLoading] = useState(true);
  const [savingTheme, setSavingTheme] = useState(false);
  const [savingAnimation, setSavingAnimation] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const [themeRes, animRes, socialRes] = await Promise.all([
        api.get('/api/settings/theme'),
        api.get('/api/settings/animation'),
        api.get('/api/settings/social')
      ]);
      if (themeRes.data.data) setTheme(themeRes.data.data);
      if (animRes.data.data) setAnimation(animRes.data.data);
      if (socialRes.data.data) setSocial(socialRes.data.data);
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (e) => setTheme(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleAnimChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnimation(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSocialChange = (e) => setSocial(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const saveTheme = async (e) => {
    e.preventDefault();
    setSavingTheme(true);
    try {
      await api.put('/api/settings/theme', theme);
      toast.success('Theme settings saved');
    } catch (err) {
      toast.error('Failed to save theme settings');
    } finally {
      setSavingTheme(false);
    }
  };

  const saveAnimation = async (e) => {
    e.preventDefault();
    setSavingAnimation(true);
    try {
      await api.put('/api/settings/animation', animation);
      toast.success('Animation settings saved');
    } catch (err) {
      toast.error('Failed to save animation settings');
    } finally {
      setSavingAnimation(false);
    }
  };

  const saveSocial = async (e) => {
    e.preventDefault();
    setSavingSocial(true);
    try {
      await api.put('/api/settings/social', social);
      toast.success('Social links saved');
    } catch (err) {
      toast.error('Failed to save social links');
    } finally {
      setSavingSocial(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Website Settings</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Theme Colors</h2>
        <form onSubmit={saveTheme} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color (Hex)</label>
              <input type="text" name="primaryColor" value={theme.primaryColor || ''} onChange={handleThemeChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color (Hex)</label>
              <input type="text" name="accentColor" value={theme.accentColor || ''} onChange={handleThemeChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <input type="text" name="bgColor" value={theme.bgColor || ''} onChange={handleThemeChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <input type="text" name="textColor" value={theme.textColor || ''} onChange={handleThemeChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={savingTheme} className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4 mr-2" />
              {savingTheme ? 'Saving...' : 'Save Theme'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Animations</h2>
        <form onSubmit={saveAnimation} className="space-y-4">
          <div className="flex items-center mb-4">
            <input type="checkbox" id="enabled" name="enabled" checked={animation.enabled !== false} onChange={handleAnimChange} className="h-4 w-4 text-cafe-accent focus:ring-cafe-accent border-gray-300 rounded" />
            <label htmlFor="enabled" className="ml-2 block text-sm font-medium text-gray-900">Enable Animations</label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animation Speed</label>
              <select name="speed" value={animation.speed || 'normal'} onChange={handleAnimChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent">
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Style</label>
              <select name="heroStyle" value={animation.heroStyle || 'fade'} onChange={handleAnimChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent">
                <option value="fade">Fade In</option>
                <option value="slide-up">Slide Up</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Style</label>
              <select name="cardStyle" value={animation.cardStyle || 'slide'} onChange={handleAnimChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent">
                <option value="slide">Slide In</option>
                <option value="pop">Pop Up</option>
                <option value="flip">Flip</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={savingAnimation} className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4 mr-2" />
              {savingAnimation ? 'Saving...' : 'Save Animations'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Social Links</h2>
        <form onSubmit={saveSocial} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="text" name="instagram" value={social.instagram || ''} onChange={handleSocialChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="text" name="facebook" value={social.facebook || ''} onChange={handleSocialChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
              <input type="text" name="twitter" value={social.twitter || ''} onChange={handleSocialChange} className="w-full p-2 border border-gray-300 rounded focus:ring-cafe-accent focus:border-cafe-accent" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={savingSocial} className="flex items-center px-4 py-2 bg-cafe-accent text-white rounded hover:bg-opacity-90 disabled:opacity-50">
              <Save className="h-4 w-4 mr-2" />
              {savingSocial ? 'Saving...' : 'Save Social Links'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
