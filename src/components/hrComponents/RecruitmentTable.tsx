import React from 'react';
import { Edit3, ChevronLeft, ChevronRight } from 'lucide-react';
import { RecruitmentProgress } from '../../services/dashboardService';
import StatusBadge from './StatusBadge';

interface RecruitmentTableProps {
  data: RecruitmentProgress[];
  theme?: 'light' | 'dark';
}

const RecruitmentTable: React.FC<RecruitmentTableProps> = ({ data = [], theme = 'light' }) => {
  return (
    <div className={`rounded-xl shadow-sm ${
      theme === 'dark'
        ? 'bg-dark-surface border border-dark-hover'
        : 'bg-white border border-gray-100'
    }`}>
      <div className={`p-4 border-b ${
        theme === 'dark' ? 'border-dark-hover' : 'border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-medium ${
            theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
          }`}>Recruitment Progress</h2>
          <button className={`flex items-center gap-1 ${
            theme === 'dark' 
              ? 'text-dark-text hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}>
            <span className="text-xs">View All</span>
            <div className="w-4 h-4 flex items-center justify-center">
              □
            </div>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${
              theme === 'dark' ? 'border-dark-hover' : 'border-gray-100'
            }`}>
              <th className={`text-left whitespace-nowrap py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Sr.#</th>
              <th className={`text-left whitespace-nowrap py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Name</th>
              <th className={`text-left whitespace-nowrap py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Position</th>
              <th className={`text-left whitespace-nowrap py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>App Date</th>
              <th className={`text-left whitespace-nowrap py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Int Date</th>
              <th className={`text-left whitespace-nowrap py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Interviewer</th>
              <th className={`text-left whitespace-nowrap py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Status</th>
              <th className={`text-left py-3 px-4 text-xs font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className={`border-b ${
                  theme === 'dark' 
                    ? 'border-dark-hover hover:bg-dark-hover/30' 
                    : 'border-gray-50 hover:bg-gray-50/50'
                }`}>
                  <td className={`py-3 px-4 text-xs ${
                    theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                  }`}>{item.id}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                    }`}>{item.name}</span>
                  </td>
                  <td className={`py-3 px-4 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.position}</td>
                  <td className={`py-3 px-4 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.application}</td>
                  <td className={`py-3 px-4 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.interviewDate}</td>
                  <td className={`py-3 px-4 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.interviewer}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={item.status} customColor={item.statusColor} theme={theme} />
                  </td>
                  <td className="py-3 px-4">
                    <button className={`${
                      theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                    }`}>
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className={`py-4 text-center text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={`p-3 border-t ${
        theme === 'dark' ? 'border-dark-hover' : 'border-gray-100'
      }`}>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1">
            <button className={`p-1 rounded-md ${
              theme === 'dark' 
                ? 'border border-dark-hover hover:bg-dark-hover text-dark-text' 
                : 'border border-gray-300 hover:bg-gray-50'
            }`}>
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button className={`p-1 rounded-md ${
              theme === 'dark' 
                ? 'border border-dark-hover hover:bg-dark-hover text-dark-text' 
                : 'border border-gray-300 hover:bg-gray-50'
            }`}>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentTable;