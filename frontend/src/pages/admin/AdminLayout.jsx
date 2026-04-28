import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, Menu as MenuIcon, Image, MessageSquare, Tag, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Cafe Info', path: '/admin/dashboard/cafe-info', icon: Store },
    { name: 'Menu', path: '/admin/dashboard/menu', icon: MenuIcon },
    { name: 'Gallery', path: '/admin/dashboard/gallery', icon: Image },
    { name: 'Reviews', path: '/admin/dashboard/reviews', icon: MessageSquare },
    { name: 'Offers', path: '/admin/dashboard/offers', icon: Tag },
    { name: 'Settings', path: '/admin/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-serif text-cafe-brown">Cozy Cafe</h2>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cafe-accent/10 text-cafe-accent font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-cafe-brown'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
