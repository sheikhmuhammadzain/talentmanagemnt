import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { navigationItems, roleTabs, userData } from '../config/appConfig';
import TeamSidebarSection from './managerComponents/TeamSidebarSection';
import { getTeamRoles } from '../services/dashboardService';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme?: 'light' | 'dark';
  activeRole?: 'user' | 'hr' | 'manager';
  setActiveRole?: (role: 'user' | 'hr' | 'manager') => void;
}

interface IconProps {
  className?: string;
}

type LucideIconComponent = React.ComponentType<IconProps>;

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  theme = 'light',
  activeRole = 'hr',
  setActiveRole
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Handle role change
  const handleRoleChange = (newRole: 'user' | 'hr' | 'manager') => {
    if (setActiveRole) {
      setActiveRole(newRole);
      // Automatically switch to dashboard when changing roles
      setActiveTab('dashboard');
    }
  };

  // Dynamic function to get icon component by name
  const getIconComponent = (iconName: string) => {
    // Convert to unknown first, then to the specific type
    const icons = LucideIcons as unknown as Record<string, LucideIconComponent>;
    const IconComponent = icons[iconName];
    return IconComponent ? (
      <IconComponent className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-text' : ''}`} />
    ) : (
      <LucideIcons.Circle className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-text' : ''}`} />
    );
  };

  // Get team roles for the sidebar if the active role is manager
  const teamRoles = activeRole === 'manager' ? getTeamRoles() : [];
  
  // Filter navigation items based on active role
  const filteredNavigationItems = navigationItems.filter(
    item => item.roles && item.roles.includes(activeRole)
  );

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} h-screen flex flex-col transition-all duration-300 relative ${
      theme === 'dark' 
        ? 'bg-dark-card border-r border-dark-border' 
        : 'bg-white border-r border-gray-200'
    }`}>
      {/* Collapse Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-12 bg-dark-accent rounded-full w-8 h-8 flex items-center justify-center text-white z-10 transform"
      >
        <MdKeyboardDoubleArrowLeft className={`w-5 h-5 ${collapsed ? 'rotate-180' : ''} transition-transform`} />
      </button>
      
      {/* Top Fixed Section */}
      <div className="flex-shrink-0">
        {/* Header */}
        <div className={`p-4 ${
          theme === 'dark' ? 'border-b border-dark-border' : 'border-b border-gray-200'
        } ${collapsed ? 'flex justify-center' : ''}`}>
          {!collapsed && (
            <div className="flex items-center justify-between mb-2">
              
            </div>
          )}
        </div>

        {/* Role Tabs - Only visible when sidebar is expanded */}
        {!collapsed && (
          <div className="px-3 py-2">
            <div className={`flex rounded-lg p-1 ${
              theme === 'dark' ? 'bg-dark-hover' : 'bg-gray-100'
            }`}>
              {roleTabs.map((role) => (
                <button 
                  key={role.id}
                  onClick={() => handleRoleChange(role.id as 'user' | 'hr' | 'manager')}
                  className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors ${
                    activeRole === role.id
                      ? 'bg-dark-accent text-white'
                      : theme === 'dark'
                        ? 'text-dark-text hover:bg-dark-background'
                        : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        {!collapsed && (
          <div className="p-4">
            <div className="relative">
              <LucideIcons.Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search"
                className={`w-full pl-10 pr-4 py-2 rounded-[20px] text-sm focus:outline-none focus:ring-2 focus:ring-dark-accent focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-dark-hover border border-dark-border text-dark-text placeholder-gray-500'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        {/* Navigation */}
        <nav className={`${collapsed ? 'px-2 py-4 mt-10' : 'px-4 py-2'}`}>
          {filteredNavigationItems.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex ${collapsed ? 'justify-center' : ''} items-center gap-2 px-3 py-3 rounded-lg text-xs font-medium transition-colors mb-1 ${
                  isActive 
                    ? 'bg-dark-accent text-white' 
                    : theme === 'dark'
                      ? 'text-dark-text hover:bg-dark-hover'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={collapsed ? item.label : ''}
              >
                {getIconComponent(item.icon)}
                {!collapsed && item.label}
              </button>
            );
          })}
          
          {/* Team Section for Manager Role - Only visible when sidebar is expanded */}
          {!collapsed && activeRole === 'manager' && teamRoles.length > 0 && (
            <TeamSidebarSection 
              teamRoles={teamRoles} 
              theme={theme} 
              collapsed={collapsed} 
            />
          )}
        </nav>
      </div>

      {/* Fixed Bottom User Profile */}
      <div className={`flex-shrink-0 p-4 ${
        theme === 'dark' ? 'border-t border-dark-border' : 'border-t border-gray-200'
      } ${collapsed ? 'flex justify-center' : ''}`}>
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
              <p className={`text-[12px] font-medium ${
                theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
              }`}>{userData.name}</p>
              <p className={`text-[10px] ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>{userData.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;