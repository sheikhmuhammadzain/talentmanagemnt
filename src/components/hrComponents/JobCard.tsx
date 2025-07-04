import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface JobCardProps {
  title: string;
  candidates: number;
  icon: React.ReactNode;
  bgColor: string;
  options?: string[];
  theme?: 'light' | 'dark';
}

const JobCard: React.FC<JobCardProps> = ({ 
  title, 
  candidates, 
  icon, 
  bgColor, 
  options = ["Description", "Hiring", "Duration", "Schedule"],
  theme = 'light'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Dynamic classes for hover effect
  const cardBg = isHovered 
    ? `${bgColor} text-white` 
    : theme === 'dark' 
      ? 'bg-dark-card text-dark-text' 
      : 'bg-white text-gray-900';
  
  const iconBg = `${bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-3`;
  
  const textClass = isHovered 
    ? 'text-white' 
    : theme === 'dark' 
      ? 'text-dark-text' 
      : 'text-gray-900';
  
  const subTextClass = isHovered 
    ? 'text-white/80' 
    : theme === 'dark' 
      ? 'text-gray-400' 
      : 'text-gray-500';
  
  const dropdownBg = isHovered 
    ? 'bg-white/20 text-white' 
    : theme === 'dark' 
      ? 'bg-dark-hover text-dark-text' 
      : 'bg-white text-gray-600';
  
  const dropdownItem = isHovered 
    ? 'hover:bg-white/30' 
    : theme === 'dark' 
      ? 'hover:bg-dark-background' 
      : 'hover:bg-gray-100';

  const borderClass = theme === 'dark' && !isHovered 
    ? 'border-dark-border' 
    : 'border-gray-100';

  return (
    <div
      ref={cardRef}
      className={`rounded-xl p-5 shadow-sm border transition-all duration-300 ease-in-out relative cursor-pointer overflow-hidden ${cardBg} ${borderClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Fill Background */}
      <div
        className={`absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2 rounded-xl ${bgColor}`}
        style={{
          width: isHovered ? '150%' : '56px',
          height: isHovered ? '200%' : '56px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 0,
          filter: 'blur(0.5px)',
        }}
      />
      {/* AI Icon */}
      <button
        className={`absolute top-3 right-3 p-1 rounded-full text-xs cursor-pointer z-20 transition-colors duration-200
          ${isHovered || showDropdown ? 'hover:bg-white/20' : ''}`}
        onClick={e => { e.stopPropagation(); setShowDropdown((prev) => !prev); }}
        aria-label="AI Options"
        type="button"
      >
        <Sparkles className="w-4 h-4" color={isHovered ? "#fff" : theme === 'dark' ? "#f5f5f6" : "#888"} />
      </button>
      {/* Dropdown */}
      <div
        className={`absolute top-10 right-3 min-w-[90px] z-30
          rounded-lg p-1 shadow-lg text-xs
          ${dropdownBg}
          transition-all duration-300 ease-in-out
          ${showDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <div className="space-y-0.5">
          {options.map((opt, idx) => (
            <div 
              key={idx} 
              className={`text-xs rounded px-2 py-1 font-semibold cursor-pointer ${dropdownItem} transition-colors duration-200 ${
                theme === 'dark' && !isHovered ? 'text-dark-text' : isHovered ? 'text-white' : 'text-black'
              }`}>
              {opt}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center text-center relative z-10">
        <div className={iconBg}>
          {icon}
        </div>
        <h3 className={`font-medium text-sm mb-1 ${textClass} transition-colors duration-300`}>{title}</h3>
        <p className={`text-xs ${subTextClass} transition-colors duration-300`}>{candidates} Candidate{candidates !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

export default JobCard;