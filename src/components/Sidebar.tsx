import React from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  CheckSquare, 
  PieChart, 
  Bot,
  Search,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'recruitment', icon: Users, label: 'Recruitment' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'reporting', icon: PieChart, label: 'Reporting & Analytics' },
    { id: 'chatbots', icon: Bot, label: 'AI Chatbots' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* User Role Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button className="flex-1 px-3 py-2 text-sm text-gray-600 rounded-md">User</button>
          <button className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded-md">HR</button>
          <button className="flex-1 px-3 py-2 text-sm text-gray-600 rounded-md">Manager</button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
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
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop"
            alt="Ali Hamza"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Ali Hamza</p>
            <p className="text-xs text-gray-500">Alihamza@1234.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;