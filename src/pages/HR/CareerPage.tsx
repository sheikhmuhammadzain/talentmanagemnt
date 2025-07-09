import React, { useState, useEffect } from 'react';
import { Filter, MapPin, Clock, ExternalLink } from 'lucide-react';
import CardContainer from '../../components/hrComponents/CardContainer';
import TabNavigation from '../../components/hrComponents/TabNavigation';
import CareerJobCard from '../../components/hrComponents/CareerJobCard';
import { careerTabs, departments } from '../../config/appConfig';
import { CareerJob, getAllCareerJobs, getCareerJobsByDepartment } from '../../services/recruitmentService';

interface CareerPageProps {
  theme?: 'light' | 'dark';
}

const CareerPage: React.FC<CareerPageProps> = ({ theme = 'light' }) => {
  const [activeTab, setActiveTab] = useState('current-openings');
  const [activeDepartment, setActiveDepartment] = useState('view-all');
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [loading, setLoading] = useState(false);

  // Load jobs based on selected department
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const jobsData = await getCareerJobsByDepartment(activeDepartment);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching career jobs:", error);
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
      {/* Page Header */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold mb-2 ${
          theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
        }`}>Careers</h1>
        <p className={`${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>Explore opportunities to join our team and grow your career</p>
      </div>

      {/* Tab Navigation */}
      <TabNavigation 
        tabs={careerTabs}
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

      {/* Career Jobs List */}
      <div className="space-y-6">
        {loading ? (
          <div className={`text-center py-8 ${
            theme === 'dark' ? 'text-dark-text' : ''
          }`}>Loading career opportunities...</div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <CareerJobCard
              key={job.id}
              id={job.id}
              title={job.title}
              department={job.department}
              category={job.category}
              description={job.description}
              location={job.location}
              type={job.type}
              categoryColor={job.categoryColor}
              featured={job.featured}
              salary={job.salary}
              postedDate={job.postedDate}
              theme={theme}
            />
          ))
        ) : (
          <div className={`text-center py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>No career opportunities found in this department.</div>
        )}
      </div>
    </div>
  );
};

export default CareerPage; 