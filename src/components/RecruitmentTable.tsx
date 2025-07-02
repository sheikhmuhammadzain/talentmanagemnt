import React from 'react';
import { Edit3, ChevronLeft, ChevronRight } from 'lucide-react';
import { RecruitmentProgress } from '../services/dashboardService';
import StatusBadge from './StatusBadge';

interface RecruitmentTableProps {
  data: RecruitmentProgress[];
}

const RecruitmentTable: React.FC<RecruitmentTableProps> = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recruitment Progress</h2>
          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
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
            <tr className="border-b border-gray-100">
              <th className="text-left whitespace-nowrap py-3 px-4 text-xs font-medium text-gray-500">Sr.#</th>
              <th className="text-left whitespace-nowrap py-3 px-4 text-xs font-medium text-gray-500">Name</th>
              <th className="text-left whitespace-nowrap py-3 px-4 text-xs font-medium text-gray-500">Position</th>
              <th className="text-left whitespace-nowrap py-3 px-4 text-xs font-medium text-gray-500">App Date</th>
              <th className="text-left whitespace-nowrap py-3 px-4 text-xs font-medium text-gray-500">Int Date</th>
              <th className="text-left whitespace-nowrap py-3 px-4 text-xs font-medium text-gray-500">Interviewer</th>
              <th className="text-left whitespace-nowrap py-3 px-4 text-xs font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4 text-xs text-gray-900">{item.id}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-medium text-gray-900">{item.name}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.position}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.application}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.interviewDate}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{item.interviewer}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={item.status} customColor={item.statusColor} />
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-center text-xs text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-md border border-gray-300 hover:bg-gray-50">
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button className="p-1 rounded-md border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentTable;