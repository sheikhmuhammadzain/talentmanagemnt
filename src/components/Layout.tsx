import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    // You could apply theme changes to the entire app here
    // For example, add/remove classes to the body element
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onThemeChange={handleThemeChange} />
        
        <main className={`flex-1 overflow-y-auto p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
          {children}
        </main>
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default Layout; 