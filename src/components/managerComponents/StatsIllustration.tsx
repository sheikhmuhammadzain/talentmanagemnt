import React from 'react';

interface StatsIllustrationProps {
  type: 'team' | 'project' | 'engagement';
}

const StatsIllustration: React.FC<StatsIllustrationProps> = ({ type }) => {
  if (type === 'team') {
    return (
      <div className="flex items-center gap-1">
        <div className="w-10 h-14 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">32</span>
        </div>
        <div className="w-8 h-12 bg-white/15 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs">+</span>
        </div>
      </div>
    );
  }

  if (type === 'project') {
    return (
      <div className="flex items-center gap-1">
        <div className="w-10 h-14 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">5</span>
        </div>
        <div className="w-8 h-12 bg-white/15 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs">📊</span>
        </div>
      </div>
    );
  }

  if (type === 'engagement') {
    return (
      <div className="relative">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">88%</span>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">📈</span>
        </div>
      </div>
    );
  }

  return null;
};

export default StatsIllustration; 