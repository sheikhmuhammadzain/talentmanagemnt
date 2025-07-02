import React from 'react';
import DashboardPage from './pages/DashboardPage';
import RecruitmentPage from './pages/RecruitmentPage';

// Define all available routes
export interface Route {
  id: string;
  label: string;
  icon: string;
  component: React.ComponentType;
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
export const getRouteComponent = (routeId: string): React.ComponentType => {
  const route = routes.find(r => r.id === routeId);
  return route ? route.component : DashboardPage; // Default to Dashboard
}; 