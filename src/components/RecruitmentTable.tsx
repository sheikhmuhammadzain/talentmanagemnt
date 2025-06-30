import React from 'react';
import { Edit3, ChevronLeft, ChevronRight } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  avatar: string;
  designation: string;
  department: string;
  status: 'interviewed' | 'hired' | 'qualified';
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Robert Fox',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    designation: 'UI/UX Designer',
    department: 'Design',
    status: 'interviewed'
  },
  {
    id: 2,
    name: 'Marvin McKinney',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    designation: 'Content Creator',
    department: 'SEO',
    status: 'interviewed'
  },
  {
    id: 3,
    name: 'Arlene McCoy',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    designation: 'Android Developer',
    department: 'Devs',
    status: 'hired'
  },
  {
    id: 4,
    name: 'Brooklyn Simmons',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    designation: 'Content Creator',
    department: 'SEO',
    status: 'qualified'
  },
  {
    id: 5,
    name: 'Brooklyn Simmons',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
    designation: 'Content Creator',
    department: 'SEO',
    status: 'qualified'
  }
];

const RecruitmentTable: React.FC = () => {
  const getStatusBadge = (status: string) => {
    const configs = {
      interviewed: { bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500' },
      hired: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
      qualified: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' }
    };
    
    const config = configs[status as keyof typeof configs];
    
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

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
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Candidate's Info</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Designation</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Department</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-4 px-6 text-sm text-gray-900">{candidate.id}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900">{candidate.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">{candidate.designation}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{candidate.department}</td>
                <td className="py-4 px-6">{getStatusBadge(candidate.status)}</td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
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