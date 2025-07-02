import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { navigationItems, roleTabs, userData } from '../config/appConfig';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface IconProps {
  className?: string;
}

type LucideIconComponent = React.ComponentType<IconProps>;

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeRole, setActiveRole] = useState('hr');

  // Dynamic function to get icon component by name
  const getIconComponent = (iconName: string) => {
    // Convert to unknown first, then to the specific type
    const icons = LucideIcons as unknown as Record<string, LucideIconComponent>;
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <LucideIcons.Circle className="w-5 h-5" />;
  };
  
  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 relative`}>
      {/* Collapse Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-12 bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-white z-10 transform "
      >
        <MdKeyboardDoubleArrowLeft className={`w-5 h-5 ${collapsed ? 'rotate-180' : ''} transition-transform`} />
      </button>
      
      {/* Header */}
      <div className={`p-4 border-b border-gray-200 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
            {roleTabs.map((role) => (
              <button 
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors ${
                  activeRole === role.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
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
      )}

      {/* Navigation */}
      <nav className={`flex-1 ${collapsed ? 'px-2 py-4' : 'px-4 py-2'}`}>
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex ${collapsed ? 'justify-center' : ''} items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={collapsed ? item.label : ''}
            >
              {getIconComponent(item.icon)}
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={`p-4 border-t border-gray-200 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{userData.name}</p>
              <p className="text-xs text-gray-500">{userData.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;