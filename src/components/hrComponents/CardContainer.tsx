import React, { ReactNode } from 'react';

interface CardContainerProps {
  title: string;
  children: ReactNode;
  onViewAll?: () => void;
  className?: string;
  viewAllLink?: string;
  theme?: 'light' | 'dark';
}

const CardContainer: React.FC<CardContainerProps> = ({ 
  title, 
  children, 
  onViewAll, 
  className = '',
  viewAllLink,
  theme = 'light'
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-medium ${
          theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
        }`}>{title}</h2>
        {(onViewAll || viewAllLink) && (
          <button 
            onClick={onViewAll}
            className={`flex items-center gap-1 ${
              theme === 'dark' 
                ? 'text-dark-text hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-xs">View All</span>
            <span className="text-xs">□</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default CardContainer; 