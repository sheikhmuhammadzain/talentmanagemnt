import React, { useState } from 'react';
import Layout from './components/Layout';
import { getRouteComponent } from './routes';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Get the component for the current route
  const CurrentPage = getRouteComponent(activeTab);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <CurrentPage />
    </Layout>
  );
}

export default App;