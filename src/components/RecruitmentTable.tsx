import React from 'react';
import { Edit3, ChevronLeft, ChevronRight } from 'lucide-react';
import { RecruitmentProgress } from '../services/dashboardService';
import StatusBadge from './StatusBadge';

interface RecruitmentTableProps {
  data: RecruitmentProgress[];
}

const RecruitmentTable: React.FC<RecruitmentTableProps> = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recruitment Progress</h2>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <span className="text-sm">View All</span>
            <div className="w-4 h-4 border-2 border-gray-400 rounded-sm flex items-center justify-center">
              <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Sr. #</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Candidate's Name</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Position</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Application Date</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Interview Date</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Interviewer</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 text-sm text-gray-900">{item.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.position}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.application}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.interviewDate}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.interviewer}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={item.status} customColor={item.statusColor} />
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">No recruitment data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentTable;