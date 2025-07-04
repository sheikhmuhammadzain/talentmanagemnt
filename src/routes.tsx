import React from 'react';
import DashboardPage from './pages/HR/DashboardPage';
import RecruitmentPage from './pages/HR/RecruitmentPage';

// Props type for page components
export interface PageComponentProps {
  theme?: 'light' | 'dark';
}

// Define component type with theme support
type PageComponent = React.ComponentType<PageComponentProps>;

// Define all available routes
export interface Route {
  id: string;
  label: string;
  icon: string;
  component: PageComponent;
}

// Main application routes
export const routes: Route[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    component: DashboardPage,
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: '👥',
    component: RecruitmentPage,
  },
];

// Helper function to get component by route ID
export const getRouteComponent = (routeId: string): PageComponent => {
  const route = routes.find(r => r.id === routeId);
  return route ? route.component : DashboardPage; // Default to Dashboard
}; 