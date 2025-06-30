import React, { useState } from 'react';
import { MapPin, Clock, ExternalLink, Filter } from 'lucide-react';

const RecruitmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('open-positions');
  const [activeDepartment, setActiveDepartment] = useState('view-all');

  const tabs = [
    { id: 'open-positions', label: 'Open Positions', icon: '📊' },
    { id: 'applied-candidates', label: 'Applied Candidates', icon: '👥' },
    { id: 'interviewed', label: 'Interviewed', icon: '💼' },
    { id: 'hired', label: 'Hired', icon: '👤' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'summary', label: 'Summary', icon: '📈' },
  ];

  const departments = [
    { id: 'view-all', label: 'View all' },
    { id: 'design', label: 'Design' },
    { id: 'software-engineering', label: 'Software Engineering' },
    { id: 'customer-success', label: 'Customer Success' },
  ];

  const jobs = [
    {
      id: 1,
      department: 'Design',
      title: 'Product Designer',
      category: 'Design',
      description: "We're looking for a mid-level product designer to join our team.",
      location: 'Remote',
      type: 'Full-time',
      categoryColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 2,
      department: 'Design',
      title: 'Product Designer',
      category: 'Design',
      description: "We're looking for a mid-level product designer to join our team.",
      location: 'Remote',
      type: 'Full-time',
      categoryColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 3,
      department: 'Software Development',
      title: 'Engineering Manager',
      category: 'Software',
      description: "We're looking for a mid-level product designer to join our team.",
      location: 'Remote',
      type: 'Full-time',
      categoryColor: 'bg-pink-100 text-pink-700'
    }
  ];

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Department Filters */}
      <div className="flex items-center gap-4 mb-8">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setActiveDepartment(dept.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeDepartment === dept.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-purple-600 text-sm font-medium">{job.department}</span>
                  <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm">
                    View job
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.categoryColor}`}>
                    ● {job.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{job.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentPage;