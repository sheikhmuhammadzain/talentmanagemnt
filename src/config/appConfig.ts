// User data
export const userData = {
  name: 'Ali Hamza',
  email: 'Alihamza@1234.com',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
};

// Dashboard configuration
export const dashboardConfig = {
  welcomeMessage: 'Welcome back, Ali Hamza',
  welcomeSubtext: 'Track, Manage and Forecast Your Employees Onboarding',
  stats: {
    totalEmployees: {
      value: 38,
      change: '12%',
      changeType: 'increase',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    openPositions: {
      value: 5,
      change: '5%',
      changeType: 'increase',
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-500'
    },
    timeToHire: {
      value: '20 Days',
      change: '5%',
      changeType: 'increase',
      bgColor: 'bg-gradient-to-br from-teal-400 to-teal-500'
    }
  }
};

// Navigation items with role access control
export const navigationItems = [
  { id: 'home', label: 'Home', icon: 'Home', roles: ['user', 'hr', 'manager'] },
  { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', roles: ['hr', 'manager'] },
  { id: 'recruitment', label: 'Recruitment', icon: 'Users', roles: ['hr'] },
  { id: 'career', label: 'Careers', icon: 'Briefcase', roles: ['hr'] },
  { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', roles: ['hr'] },
  { id: 'chatbots', label: 'AI Chatbots', icon: 'Bot', roles: ['hr'] },
  { id: 'team-management', label: 'Team Management', icon: 'Users2', roles: ['manager'] },
  { id: 'clients', label: 'Clients', icon: 'UserPlus', roles: ['manager'] },
  { id: 'projects', label: 'Projects', icon: 'Briefcase', roles: ['manager'] },
  { id: 'attendance', label: 'Attendance & Leave', icon: 'Clock', roles: ['manager'] },
  { id: 'reporting', label: 'Reporting & Analytics', icon: 'PieChart', roles: ['hr', 'manager'] },

];

// Role tabs
export const roleTabs = [
  { id: 'user', label: 'User' },
  { id: 'hr', label: 'HR' },
  { id: 'manager', label: 'Manager' }
];

// Recruitment tabs
export const recruitmentTabs = [
  { id: 'open-positions', label: 'Open Positions', icon: '📊' },
  { id: 'applied-candidates', label: 'Applied Candidates', icon: '👥' },
  { id: 'interviewed', label: 'Interviewed', icon: '💼' },
  { id: 'hired', label: 'Hired', icon: '👤' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'summary', label: 'Summary', icon: '📈' }
];

// Career tabs
export const careerTabs = [
  { id: 'current-openings', label: 'Current Openings', icon: '🔍' },
  { id: 'upcoming-positions', label: 'Upcoming Positions', icon: '📅' },
  { id: 'internships', label: 'Internships', icon: '🎓' },
  { id: 'benefits', label: 'Benefits', icon: '✨' },
  { id: 'faq', label: 'FAQ', icon: '❓' }
];

// Departments
export const departments = [
  { id: 'view-all', label: 'View all' },
  { id: 'design', label: 'Design' },
  { id: 'software-development', label: 'Software Engineering' },
  { id: 'customer-success', label: 'Customer Success' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'hr', label: 'HR & Recruiting' }
];

// Icons mapping
export const iconMapping = {
  'PHP Developer': 'Code',
  'Content Writer': 'Edit',
  'iOS Developer': 'Smartphone',
  'UI/UX Designer': 'Palette',
  'Marketing Manager': 'TrendingUp',
  'Engineering Manager': 'Settings'
};

// Status colors
export const statusColors = {
  scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  canceled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' }
}; 