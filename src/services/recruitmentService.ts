// Types
export interface Job {
  id: number;
  department: string;
  title: string;
  category: string;
  description: string;
  location: string;
  type: string;
  categoryColor: string;
}

// Mock data
const jobsData: Job[] = [
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

// Service functions
export const getAllJobs = (): Promise<Job[]> => {
  return Promise.resolve(jobsData);
};

export const getJobsByDepartment = (department: string): Promise<Job[]> => {
  if (department === 'view-all') {
    return getAllJobs();
  }
  
  const filteredJobs = jobsData.filter(job => 
    job.department.toLowerCase() === department.toLowerCase());
  return Promise.resolve(filteredJobs);
};

export const getJobById = (id: number): Promise<Job | undefined> => {
  const job = jobsData.find(job => job.id === id);
  return Promise.resolve(job);
}; 