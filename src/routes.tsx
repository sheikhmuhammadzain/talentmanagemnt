import React from 'react';
import DashboardPage from './pages/HR/DashboardPage';
import RecruitmentPage from './pages/HR/RecruitmentPage';
import CareerPage from './pages/HR/CareerPage';
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
  // Common routes
  {
    id: 'home',
    label: 'Home',
    icon: 'Home',
    component: DashboardPage, // Use a simple home page for all users
    roles: ['user', 'hr', 'manager']
  },
  
  // HR-specific routes
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'BarChart3',
    component: DashboardPage,
    roles: ['hr']
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: 'Users',
    component: RecruitmentPage,
    roles: ['hr']
  },
  {
    id: 'career',
    label: 'Careers',
    icon: 'Briefcase',
    component: CareerPage,
    roles: ['hr']
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: 'CheckSquare',
    component: DashboardPage, // Replace with actual component when created
    roles: ['hr']
  },
  {
    id: 'chatbots',
    label: 'AI Chatbots',
    icon: 'Bot',
    component: DashboardPage, // Replace with actual component when created
    roles: ['hr']
  },
  
  // Manager-specific routes
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'BarChart3',
    component: ManagerDashboardPage,
    roles: ['manager']
  },
  {
    id: 'team-management',
    label: 'Team Management',
    icon: 'Users2',
    component: ManagerDashboardPage, // Replace with actual component when created
    roles: ['manager']
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: 'UserPlus',
    component: ManagerDashboardPage, // Replace with actual component when created
    roles: ['manager']
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'Briefcase',
    component: ManagerDashboardPage, // Replace with actual component when created
    roles: ['manager']
  },
  {
    id: 'attendance',
    label: 'Attendance & Leave',
    icon: 'Clock',
    component: ManagerDashboardPage, // Replace with actual component when created
    roles: ['manager']
  },
  
  // Shared routes (but with different components based on role)
  {
    id: 'reporting',
    label: 'Reporting & Analytics',
    icon: 'PieChart',
    component: DashboardPage, // Replace with actual component when created
    roles: ['hr', 'manager']
  }
];

// Helper function to get component by route ID and role
export const getRouteComponent = (routeId: string, role?: string): PageComponent => {
  // Find routes matching both ID and role
  const matchingRoutes = routes.filter(
    r => r.id === routeId && (!r.roles || (role && r.roles.includes(role)))
  );
  
  // If found, return the component
  if (matchingRoutes.length > 0) {
    return matchingRoutes[0].component;
  }
  
  // Default fallback - return dashboard for the role, or HR dashboard as ultimate fallback
  const defaultRoute = routes.find(r => r.id === 'dashboard' && (!r.roles || (role && r.roles.includes(role))));
  return defaultRoute ? defaultRoute.component : DashboardPage;
};

// Helper function to get routes for a specific role
export const getRoutesForRole = (role: string): Route[] => {
  return routes.filter(route => !route.roles || route.roles.includes(role));
}; 