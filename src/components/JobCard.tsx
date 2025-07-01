import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface JobCardProps {
  title: string;
  candidates: number;
  icon: React.ReactNode;
  bgColor: string;
  options?: string[]; // Dropdown options for AI icon
}

const JobCard: React.FC<JobCardProps> = ({ title, candidates, icon, bgColor, options = ["Description", "Hiring", "Duration", "Schedule"] }) => {
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
  const cardBg = isHovered ? `${bgColor} text-white` : 'bg-white text-gray-900';
  const iconBg = `${bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`;
  const textClass = isHovered ? 'text-white' : 'text-gray-900';
  const subTextClass = isHovered ? 'text-white/80' : 'text-gray-500';
  const dropdownBg = isHovered ? 'bg-white/20 text-white' : 'bg-white text-gray-600';
  const dropdownItem = isHovered ? 'hover:bg-white/30' : 'hover:bg-gray-100';

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ease-in-out relative cursor-pointer overflow-hidden ${cardBg}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Fill Background */}
      <div
        className={`absolute left-1/2 top-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl ${bgColor}`}
        style={{
          width: isHovered ? '150%' : '64px',
          height: isHovered ? '200%' : '64px',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 0,
          filter: 'blur(0.5px)',
        }}
      />
      {/* AI Icon */}
      <button
        className={`absolute top-4 right-4 p-1 rounded-full text-xs cursor-pointer z-20 transition-colors duration-200
          bg-transparent border-none shadow-none
          ${isHovered || showDropdown ? 'hover:bg-white/20' : ''}`}
        style={{ boxShadow: 'none', border: 'none' }}
        onClick={e => { e.stopPropagation(); setShowDropdown((prev) => !prev); }}
        aria-label="AI Options"
        type="button"
      >
        <Sparkles className="w-5 h-5" color="#fff" />
      </button>
      {/* Dropdown */}
      <div
        className={`absolute top-12 right-4 min-w-[100px] z-30
          rounded-lg p-2 shadow-lg text-xs
          ${dropdownBg}
          transition-all duration-300 ease-in-out
          ${showDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        style={{
          willChange: 'opacity, transform',
        }}
      >
        <div className="space-y-1">
          {options.map((opt, idx) => (
            <div key={idx} className={`text-xs rounded px-2 py-1 cursor-pointer ${dropdownItem} transition-colors duration-200`}>{opt}</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center text-center relative z-20">
        <div className={iconBg + ' transition-all duration-300 ease-in-out'}>
          {icon}
        </div>
        <h3 className={`font-semibold mb-1 ${textClass} transition-colors duration-300`}>{title}</h3>
        <p className={`text-sm ${subTextClass} transition-colors duration-300`}>{candidates} Candidate{candidates !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

export default JobCard;