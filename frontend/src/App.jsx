import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CafeProvider } from './context/CafeContext';
import { AuthProvider } from './context/AuthContext';

import PublicSite from './pages/PublicSite';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import CafeInfoEditor from './pages/admin/editors/CafeInfoEditor';
import MenuEditor from './pages/admin/editors/MenuEditor';
import GalleryEditor from './pages/admin/editors/GalleryEditor';
import ReviewsEditor from './pages/admin/editors/ReviewsEditor';
import OffersEditor from './pages/admin/editors/OffersEditor';
import SettingsEditor from './pages/admin/editors/SettingsEditor';

import './App.css';

// Dashboard placeholders
const DashboardHome = () => <div><h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1><p>Welcome to the Cozy Cafe admin panel.</p></div>;


function App() {
  return (
    <AuthProvider>
      <CafeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicSite />} />
            
            <Route path="/admin" element={<AdminLogin />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="cafe-info" element={<CafeInfoEditor />} />
                <Route path="menu" element={<MenuEditor />} />
                <Route path="gallery" element={<GalleryEditor />} />
                <Route path="reviews" element={<ReviewsEditor />} />
                <Route path="offers" element={<OffersEditor />} />
                <Route path="settings" element={<SettingsEditor />} />
              </Route>
            </Route>
          </Routes>
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </CafeProvider>
    </AuthProvider>
  );
}

export default App;
