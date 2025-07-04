import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ChatBot from '../ChatBot';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, theme: themeProp = 'light', onThemeChange }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(themeProp);

  // Sync with prop if changed externally
  useEffect(() => {
    if (themeProp !== theme) {
      setTheme(themeProp);
    }
  }, [themeProp, theme]);

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    // Apply theme changes to the entire app
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.body.style.backgroundColor = '#0c111d';
      document.body.style.color = '#f5f5f6';
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
    
    // Notify parent component if callback provided
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-dark-background' : 'bg-gray-50'}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onThemeChange={handleThemeChange} theme={theme} />
        
        <main className={`flex-1 overflow-y-auto p-6 ${
          theme === 'dark' 
            ? 'bg-dark-background text-dark-text' 
            : 'bg-gray-50 text-gray-900'
        }`}>
          {children}
        </main>
      </div>

      {/* Chat Bot */}
      <ChatBot theme={theme} />
    </div>
  );
};

export default Layout; 