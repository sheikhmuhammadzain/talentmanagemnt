import React, { useState } from 'react';
import Layout from './components/hrComponents/Layout';
import { getRouteComponent } from './routes';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeRole, setActiveRole] = useState<'user' | 'hr' | 'manager'>('manager'); // Default to manager

  // Get the component for the current route based on role
  const CurrentPage = getRouteComponent(activeTab, activeRole);

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
      activeRole={activeRole}
      setActiveRole={setActiveRole}
    >
      <CurrentPage theme={theme} />
    </Layout>
  );
}

export default App;