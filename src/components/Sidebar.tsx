import React from 'react';
import * as LucideIcons from 'lucide-react';
import { navigationItems, roleTabs, userData } from '../config/appConfig';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  // Dynamic function to get icon component by name
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <LucideIcons.Circle className="w-5 h-5" />;
  };
  
  const [activeRole, setActiveRole] = React.useState('hr');

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <LucideIcons.ChevronLeft className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* User Role Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {roleTabs.map((role) => (
            <button 
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                activeRole === role.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <LucideIcons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {getIconComponent(item.icon)}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{userData.name}</p>
            <p className="text-xs text-gray-500">{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;