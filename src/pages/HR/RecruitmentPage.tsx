import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ExternalLink, Filter } from 'lucide-react';
import { Job, getAllJobs, getJobsByDepartment } from '../../services/recruitmentService';
import TabNavigation from '../../components/hrComponents/TabNavigation';
import { recruitmentTabs, departments } from '../../config/appConfig';

interface RecruitmentPageProps {
  theme?: 'light' | 'dark';
}

const RecruitmentPage: React.FC<RecruitmentPageProps> = ({ theme = 'light' }) => {
  const [activeTab, setActiveTab] = useState('open-positions');
  const [activeDepartment, setActiveDepartment] = useState('view-all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // Load jobs based on selected department
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const jobsData = await getJobsByDepartment(activeDepartment);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [activeDepartment]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle department change
  const handleDepartmentChange = (departmentId: string) => {
    setActiveDepartment(departmentId);
  };

  // Filter button component for the right side of tabs
  const FilterButton = () => (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      theme === 'dark' 
        ? 'border border-dark-hover text-dark-text hover:bg-dark-hover' 
        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
    }`}>
      <Filter className="w-4 h-4" />
      Filter
    </button>
  );

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={recruitmentTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        rightContent={<FilterButton />}
        theme={theme}
      />

      {/* Department Filters */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => handleDepartmentChange(dept.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeDepartment === dept.id
                ? 'bg-dark-accent text-white'
                : theme === 'dark'
                  ? 'bg-dark-hover text-dark-text hover:bg-dark-background'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {loading ? (
          <div className={`text-center py-8 ${
            theme === 'dark' ? 'text-dark-text' : ''
          }`}>Loading jobs...</div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className={`rounded-2xl p-6 transition-shadow ${
              theme === 'dark'
                ? 'bg-dark-surface border border-dark-hover hover:shadow-md'
                : 'bg-white border border-gray-100 hover:shadow-md'
            }`}>
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
                    <h3 className={`text-xl font-semibold ${
                      theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                    }`}>{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.categoryColor}`}>
                      ● {job.category}
                    </span>
                  </div>
                  
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{job.description}</p>
                  
                  <div className={`flex items-center gap-4 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
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
          ))
        ) : (
          <div className={`text-center py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>No jobs found in this department.</div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentPage; 