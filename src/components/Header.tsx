import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { userData } from '../config/appConfig';

interface HeaderProps {
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ onThemeChange }) => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [activePage, setActivePage] = useState('dashboard');

  // Navigation items for header
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'overview', label: 'Overview' }
  ];

  // Handle theme change
  const handleThemeChange = (theme: 'light' | 'dark') => {
    setActiveTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`text-sm font-medium ${
                  activePage === item.id ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActivePage(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button 
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                activeTheme === 'dark' ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
              onClick={() => handleThemeChange('dark')}
            >
              Dark
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                activeTheme === 'light' ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
              onClick={() => handleThemeChange('light')}
            >
              Light
            </button>
          </div>

          {/* Search */}
          <button className="p-1.5 text-gray-600 hover:text-gray-900">
            <Search className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button className="p-1.5 text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4" />
          </button>

          {/* Notification */}
          <button className="p-1.5 text-gray-600 hover:text-gray-900 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-white text-xs flex items-center justify-center">3</span>
          </button>

          {/* User Avatar */}
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;