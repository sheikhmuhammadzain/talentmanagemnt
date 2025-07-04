import React, { useState } from 'react';
import Layout from './components/hrComponents/Layout';
import { getRouteComponent } from './routes';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Get the component for the current route
  const CurrentPage = getRouteComponent(activeTab);

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      theme={theme}
      onThemeChange={handleThemeChange}
    >
      <CurrentPage theme={theme} />
    </Layout>
  );
}

export default App;