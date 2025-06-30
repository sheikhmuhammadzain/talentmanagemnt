import React from 'react';
import { Download, Plus, Bell, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Navigation */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <button className="text-purple-600 font-medium">Recruitment</button>
            <button className="text-gray-600 hover:text-gray-900">Overview</button>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className="px-3 py-1 text-sm text-gray-600 rounded-md">Dark</button>
            <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md">Light</button>
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
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;