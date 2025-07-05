import React from 'react';
import DashboardPage from './pages/HR/DashboardPage';
import RecruitmentPage from './pages/HR/RecruitmentPage';
import ManagerDashboardPage from './pages/Manager/ManagerDashboardPage';

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
  roles?: string[]; // Optional roles that can access this route
}

// Main application routes
export const routes: Route[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    component: DashboardPage,
    roles: ['hr']
  },
  {
    id: 'manager-dashboard',
    label: 'Dashboard',
    icon: '📊',
    component: ManagerDashboardPage,
    roles: ['manager']
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: '👥',
    component: RecruitmentPage,
    roles: ['hr']
  },
];

// Helper function to get component by route ID and role
export const getRouteComponent = (routeId: string, role?: string): PageComponent => {
  // If it's a dashboard request and role is manager, return manager dashboard
  if (routeId === 'dashboard' && role === 'manager') {
    const managerRoute = routes.find(r => r.id === 'manager-dashboard');
    return managerRoute ? managerRoute.component : DashboardPage;
  }
  
  // Otherwise, find the route normally
  const route = routes.find(r => r.id === routeId);
  return route ? route.component : DashboardPage; // Default to Dashboard
};

// Helper function to get routes for a specific role
export const getRoutesForRole = (role: string): Route[] => {
  return routes.filter(route => !route.roles || route.roles.includes(role));
}; 