import React from 'react';

interface JobCardProps {
  title: string;
  candidates: number;
  icon: React.ReactNode;
  bgColor: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, candidates, icon, bgColor }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <div className={`${bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{candidates} Candidate{candidates !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

export default JobCard;