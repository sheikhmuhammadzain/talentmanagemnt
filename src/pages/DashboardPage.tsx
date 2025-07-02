import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import StatCard from '../components/StatCard';
import JobCard from '../components/JobCard';
import RecruitmentTable from '../components/RecruitmentTable';
import CardContainer from '../components/CardContainer';
import { 
  getStatData, 
  getJobCardData, 
  getRecruitmentProgress,
  getIconNameForJob,
  StatData,
  JobCardData,
  RecruitmentProgress
} from '../services/dashboardService';
import { dashboardConfig } from '../config/appConfig';

type IconProps = { className?: string };

const DashboardPage: React.FC = () => {
  const [statData, setStatData] = useState<StatData | null>(null);
  const [jobCards, setJobCards] = useState<JobCardData[]>([]);
  const [recruitmentData, setRecruitmentData] = useState<RecruitmentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [stats, jobs, recruitment] = await Promise.all([
          getStatData(),
          getJobCardData(),
          getRecruitmentProgress()
        ]);
        
        setStatData(stats);
        setJobCards(jobs);
        setRecruitmentData(recruitment);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Illustrations for stat cards - these are dynamic components that can be reused
  const EmployeeIllustration = () => (
    <div className="flex items-center gap-1">
      <div className="w-10 h-14 bg-white/20 rounded-lg flex items-center justify-center">
        <LucideIcons.Users className="w-5 h-5 text-white" />
      </div>
      <div className="w-8 h-12 bg-white/15 rounded-lg flex items-center justify-center">
        <LucideIcons.Users className="w-4 h-4 text-white" />
      </div>
    </div>
  );

  const PositionsIllustration = () => (
    <div className="flex items-center gap-1">
      <div className="w-10 h-14 bg-white/20 rounded-lg flex items-center justify-center">
        <LucideIcons.Code className="w-5 h-5 text-white" />
      </div>
      <div className="w-8 h-12 bg-white/15 rounded-lg flex items-center justify-center">
        <LucideIcons.Edit className="w-4 h-4 text-white" />
      </div>
    </div>
  );

  const TimeIllustration = () => (
    <div className="relative">
      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
        <LucideIcons.Clock className="w-7 h-7 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
        <LucideIcons.Calendar className="w-2.5 h-2.5 text-white" />
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  // Dynamic function to get the right icon component for a job
  const getJobIcon = (title: string) => {
    const iconName = getIconNameForJob(title);
    // Safely access the icon using bracket notation with type assertion
    const icons = LucideIcons as unknown as Record<string, React.FC<IconProps>>;
    const IconComponent = icons[iconName];
    
    return IconComponent ? 
      <IconComponent className="w-7 h-7 text-white" /> : 
      <LucideIcons.Briefcase className="w-7 h-7 text-white" />;
  };

  return (
    <div className="p-4">
      {/* Welcome Section */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">{dashboardConfig.welcomeMessage}</h1>
        <p className="text-sm text-gray-600">{dashboardConfig.welcomeSubtext}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value={statData ? statData.totalEmployees.toString() : "0"}
          change={dashboardConfig.stats.totalEmployees.change}
          changeType={"increase" as "increase" | "decrease"}
          bgColor={dashboardConfig.stats.totalEmployees.bgColor}
          illustration={<EmployeeIllustration />}
        />
        <StatCard
          title="Open Positions"
          value={statData ? statData.openPositions.toString() : "0"}
          change={dashboardConfig.stats.openPositions.change}
          changeType={"increase" as "increase" | "decrease"}
          bgColor={dashboardConfig.stats.openPositions.bgColor}
          illustration={<PositionsIllustration />}
        />
        <StatCard
          title="Time to Hire"
          value={statData ? statData.timeToHire : "0 Days"}
          change={dashboardConfig.stats.timeToHire.change}
          changeType={"decrease" as "increase" | "decrease"}
          bgColor={dashboardConfig.stats.timeToHire.bgColor}
          illustration={<TimeIllustration />}
        />
      </div>

      {/* You Need To Hire Section */}
      <CardContainer title="You Need To Hire" onViewAll={() => console.log("View all jobs clicked")}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {jobCards.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              candidates={job.candidates}
              icon={getJobIcon(job.title)}
              bgColor={job.bgColor}
              options={job.options}
            />
          ))}
        </div>
      </CardContainer>

      {/* Recruitment Progress Table */}
      <CardContainer title="Recruitment Progress">
        <RecruitmentTable data={recruitmentData} />
      </CardContainer>
    </div>
  );
};

export default DashboardPage; 