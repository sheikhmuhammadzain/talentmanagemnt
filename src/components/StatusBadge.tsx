import React from 'react';
import { statusColors } from '../config/appConfig';

interface StatusBadgeProps {
  status: string;
  customColor?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  customColor, 
  className = '' 
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
  
  return (
    <span 
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge; 