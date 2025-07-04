import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease';
  bgColor: string;
  illustration: React.ReactNode;
  theme?: 'light' | 'dark';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  bgColor, 
  illustration,
  theme = 'light' // Added for API consistency, but not used visually
}) => {
  return (
    <div className={`${bgColor} rounded-2xl p-6 text-white relative overflow-hidden`}>
      <div className="relative z-10">
        <h3 className="text-lg font-medium mb-2 opacity-90">{title}</h3>
        <div className="text-4xl font-bold mb-4">{value}</div>
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {changeType === 'increase' ? '↑' : '↓'} {change}
          </span>
          <span className="text-sm opacity-75">vs last month</span>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full flex items-center pr-6">
        {illustration}
      </div>
    </div>
  );
};

export default StatCard;