import { dashboardConfig, iconMapping } from '../config/appConfig';

// Types
export interface StatData {
  totalEmployees: number;
  openPositions: number;
  timeToHire: string;
}

export interface JobCardData {
  id: number;
  title: string;
  candidates: number;
  bgColor: string;
  options?: string[];
}

export interface RecruitmentProgress {
  id: number;
  name: string;
  position: string;
  application: string;
  interviewDate: string;
  interviewer: string;
  status: 'scheduled' | 'completed' | 'canceled' | 'pending';
  statusColor: string;
}

// Mock data - now derived from our central config
const statData: StatData = {
  totalEmployees: dashboardConfig.stats.totalEmployees.value,
  openPositions: dashboardConfig.stats.openPositions.value,
  timeToHire: dashboardConfig.stats.timeToHire.value
};

const jobCardData: JobCardData[] = [
  {
    id: 1,
    title: 'PHP Developer',
    candidates: 1,
    bgColor: 'bg-orange-500'
  },
  {
    id: 2,
    title: 'Content Writer',
    candidates: 1,
    bgColor: 'bg-purple-500'
  },
  {
    id: 3,
    title: 'PHP Developer',
    candidates: 1,
    bgColor: 'bg-blue-500'
  },
  {
    id: 4,
    title: 'iOS Developer',
    candidates: 1,
    bgColor: 'bg-teal-500',
    options: ["Description", "Hiring", "Duration", "Schedule"]
  }
];

const recruitmentProgress: RecruitmentProgress[] = [
  {
    id: 1,
    name: 'Jane Cooper',
    position: 'PHP Developer',
    application: '12 Jan 2023',
    interviewDate: '15 Jan 2023',
    interviewer: 'Alex Morgan',
    status: 'scheduled',
    statusColor: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'John Smith',
    position: 'UI/UX Designer',
    application: '10 Jan 2023',
    interviewDate: '14 Jan 2023',
    interviewer: 'Sarah Johnson',
    status: 'completed',
    statusColor: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Robert Lee',
    position: 'Content Writer',
    application: '8 Jan 2023',
    interviewDate: '13 Jan 2023',
    interviewer: 'David Brown',
    status: 'canceled',
    statusColor: 'bg-red-500'
  }
];

// Service functions
export const getStatData = (): Promise<StatData> => {
  return Promise.resolve(statData);
};

export const getJobCardData = (): Promise<JobCardData[]> => {
  return Promise.resolve(jobCardData);
};

export const getRecruitmentProgress = (): Promise<RecruitmentProgress[]> => {
  return Promise.resolve(recruitmentProgress);
};

// Helper function to get icon name from job title
export const getIconNameForJob = (jobTitle: string): string => {
  return iconMapping[jobTitle as keyof typeof iconMapping] || 'Briefcase';
}; 