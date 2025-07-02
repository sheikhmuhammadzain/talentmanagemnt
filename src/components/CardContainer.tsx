import React, { ReactNode } from 'react';

interface CardContainerProps {
  title: string;
  children: ReactNode;
  onViewAll?: () => void;
  className?: string;
  viewAllLink?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({ 
  title, 
  children, 
  onViewAll, 
  className = '',
  viewAllLink
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {(onViewAll || viewAllLink) && (
          <button 
            onClick={onViewAll}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <span className="text-sm">View All</span>
            <div className="w-4 h-4 border-2 border-gray-400 rounded-sm flex items-center justify-center">
              <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default CardContainer; 