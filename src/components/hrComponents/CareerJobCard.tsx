import React, { useState } from 'react';
import { MapPin, Clock, ExternalLink, Briefcase, Calendar, DollarSign } from 'lucide-react';

interface CareerJobCardProps {
  id: number;
  title: string;
  department: string;
  category: string;
  description: string;
  location: string;
  type: string;
  categoryColor: string;
  featured?: boolean;
  salary?: string;
  postedDate?: string;
  theme?: 'light' | 'dark';
}

const CareerJobCard: React.FC<CareerJobCardProps> = ({ 
  id,
  title, 
  department, 
  category, 
  description, 
  location, 
  type,
  categoryColor,
  featured = false,
  salary,
  postedDate,
  theme = 'light'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`rounded-2xl p-6 transition-all duration-300 
        ${isExpanded ? 'transform-none' : 'hover:-translate-y-1'}
        ${theme === 'dark'
          ? 'bg-dark-surface border border-dark-hover hover:shadow-md'
          : 'bg-white border border-gray-100 hover:shadow-lg'
        }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-purple-600 text-sm font-medium">{department}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
              {category}
            </span>
            {featured && (
              <div className={`px-3 py-1 rounded-full text-xs font-medium animate-pulse ${
                theme === 'dark'
                  ? 'bg-blue-800/30 text-blue-300'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                Featured
              </div>
            )}
          </div>
          
          <h3 className={`text-xl font-semibold mb-2 ${
            theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
          }`}>{title}</h3>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className={`flex items-center gap-1 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Clock className="w-4 h-4" />
              {type}
            </div>
            {salary && (
              <div className={`flex items-center gap-1 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <DollarSign className="w-4 h-4" />
                {salary}
              </div>
            )}
            {postedDate && (
              <div className={`flex items-center gap-1 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <Calendar className="w-4 h-4" />
                Posted {postedDate}
              </div>
            )}
          </div>
          
          <div className={`overflow-hidden transition-all duration-300 mb-4 ${
            isExpanded ? 'max-h-96' : 'max-h-20'
          }`}>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{description}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-dark-accent text-white hover:bg-dark-accent/90'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}>
              Apply Now
            </button>
            <button 
              onClick={toggleExpand}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-dark-hover text-dark-text hover:bg-dark-background'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
            <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm">
              View Details
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerJobCard; 