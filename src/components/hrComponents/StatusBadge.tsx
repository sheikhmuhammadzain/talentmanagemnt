import React from 'react';
import { statusColors } from '../../config/appConfig';

interface StatusBadgeProps {
  status: string;
  customColor?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  customColor, 
  className = '',
  theme = 'light'
}) => {
  // Ensure status is always lowercase for consistent lookup
  const statusKey = status.toLowerCase() as keyof typeof statusColors;
  
  // Get colors from config or use defaults
  const colors = statusColors[statusKey] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500'
  };
  
  // Use custom color if provided
  const dotColor = customColor || colors.dot;

  // Apply darker background for dark theme
  const bgColor = theme === 'dark' 
    ? statusKey === 'completed' 
      ? 'bg-green-900/30' 
      : statusKey === 'scheduled' 
        ? 'bg-blue-900/30' 
        : statusKey === 'canceled' 
          ? 'bg-red-900/30' 
          : statusKey === 'pending' 
            ? 'bg-yellow-900/30' 
            : 'bg-gray-800'
    : colors.bg;
  
  // Ensure text is visible in dark theme
  const textColor = theme === 'dark' ? 'text-dark-text' : colors.text;
  
  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge; 