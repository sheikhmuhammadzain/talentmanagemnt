import React, { useState } from 'react';
import { Download, Plus, Bell, Settings } from 'lucide-react';
import { userData } from '../config/appConfig';

interface HeaderProps {
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ onThemeChange }) => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [activePage, setActivePage] = useState('recruitment');

  // Navigation items for header
  const navItems = [
    { id: 'recruitment', label: 'Recruitment' },
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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Navigation */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`font-medium ${
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
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTheme === 'dark' ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
              onClick={() => handleThemeChange('dark')}
            >
              Dark
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTheme === 'light' ? 'bg-purple-600 text-white' : 'text-gray-600'
              }`}
              onClick={() => handleThemeChange('light')}
            >
              Light
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Export and Add buttons */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* User Avatar */}
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;