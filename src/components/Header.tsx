import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { userData } from '../config/appConfig';

interface HeaderProps {
  onThemeChange?: (theme: 'light' | 'dark') => void;
  theme?: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onThemeChange, theme = 'light' }) => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(theme);
  const [activePage, setActivePage] = useState('dashboard');

  // Sync component state with prop
  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  // Navigation items for header
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'overview', label: 'Overview' }
  ];

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setActiveTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  return (
    <header className={`px-4 py-2 border-b ${
      theme === 'dark' 
        ? 'bg-dark-surface border-dark-hover' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`text-sm font-medium ${
                  activePage === item.id 
                    ? theme === 'dark'
                      ? 'text-dark-accent' 
                      : 'text-purple-600'
                    : theme === 'dark'
                      ? 'text-dark-text hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
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
          <div className={`flex rounded-lg p-0.5 ${
            theme === 'dark' ? 'bg-dark-surface' : 'bg-gray-100'
          }`}>
            <button 
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                activeTheme === 'dark' 
                  ? 'bg-dark-accent text-white' 
                  : theme === 'dark' 
                    ? 'text-dark-text' 
                    : 'text-gray-600'
              }`}
              onClick={() => handleThemeChange('dark')}
            >
              Dark
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                activeTheme === 'light' 
                  ? theme === 'dark' 
                    ? 'bg-dark-accent text-white' 
                    : 'bg-purple-600 text-white' 
                  : theme === 'dark' 
                    ? 'text-dark-text' 
                    : 'text-gray-600'
              }`}
              onClick={() => handleThemeChange('light')}
            >
              Light
            </button>
          </div>

          {/* Search */}
          <button className={`p-1.5 ${
            theme === 'dark' 
              ? 'text-dark-text hover:bg-dark-hover hover:text-white rounded-md' 
              : 'text-gray-600 hover:text-gray-900'
          }`}>
            <Search className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button className={`p-1.5 ${
            theme === 'dark' 
              ? 'text-dark-text hover:bg-dark-hover hover:text-white rounded-md' 
              : 'text-gray-600 hover:text-gray-900'
          }`}>
            <Settings className="w-4 h-4" />
          </button>

          {/* Notification */}
          <button className={`p-1.5 relative ${
            theme === 'dark' 
              ? 'text-dark-text hover:bg-dark-hover hover:text-white rounded-md' 
              : 'text-gray-600 hover:text-gray-900'
          }`}>
            <Bell className="w-4 h-4" />
            <span className={`absolute -top-1 -right-1 w-4 h-4 bg-dark-accent rounded-full text-white text-xs flex items-center justify-center`}>
              3
            </span>
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