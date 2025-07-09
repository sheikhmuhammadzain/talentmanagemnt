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

export interface CareerJob extends Job {
  featured?: boolean;
  salary?: string;
  postedDate?: string;
  requirements?: string[];
  responsibilities?: string[];
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

// Career Jobs Mock Data
const careerJobsData: CareerJob[] = [
  {
    id: 1,
    department: 'Software Development',
    title: 'Senior Full Stack Developer',
    category: 'Engineering',
    description: "We are seeking an experienced Full Stack Developer to join our innovative team. The ideal candidate will have strong experience with modern web technologies, excellent problem-solving abilities, and a passion for building exceptional user experiences. You will work closely with our product and design teams to develop and maintain high-quality web applications.",
    location: 'Remote / New York',
    type: 'Full-time',
    categoryColor: 'bg-indigo-100 text-indigo-700',
    featured: true,
    salary: '$100K - $130K',
    postedDate: '3 days ago',
    requirements: [
      'Minimum 5 years experience with JavaScript/TypeScript',
      'Strong knowledge of React, Node.js, and modern web frameworks',
      'Experience with database design and SQL/NoSQL databases',
      'Understanding of CI/CD pipelines and DevOps practices'
    ],
    responsibilities: [
      'Develop and maintain web applications using React and Node.js',
      'Collaborate with UX/UI designers to implement intuitive interfaces',
      'Optimize applications for maximum speed and scalability',
      'Participate in code reviews and mentor junior developers'
    ]
  },
  {
    id: 2,
    department: 'Marketing',
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    description: "Join our marketing team to help drive growth through innovative digital marketing strategies. In this role, you will plan, execute, and optimize our digital marketing campaigns across various channels to increase brand awareness and generate leads. We're looking for someone who is data-driven, creative, and passionate about digital marketing trends.",
    location: 'Hybrid / Chicago',
    type: 'Full-time',
    categoryColor: 'bg-green-100 text-green-700',
    salary: '$70K - $90K',
    postedDate: '1 week ago',
    requirements: [
      "Bachelor\u2019s degree in Marketing, Communications, or related field",
      'Minimum 3 years experience in digital marketing roles',
      'Proficiency with SEO/SEM, social media marketing, and email campaigns',
      'Experience with marketing analytics tools and data analysis'
    ],
    responsibilities: [
      'Develop and manage digital marketing campaigns',
      'Monitor and analyze campaign performance metrics',
      'Optimize content for search engine visibility',
      'Collaborate with content team to create engaging marketing materials'
    ]
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

// Career Jobs Service Functions
export const getAllCareerJobs = (): Promise<CareerJob[]> => {
  return Promise.resolve(careerJobsData);
};

export const getCareerJobsByDepartment = (department: string): Promise<CareerJob[]> => {
  if (department === 'view-all') {
    return getAllCareerJobs();
  }
  
  const filteredJobs = careerJobsData.filter(job => 
    job.department.toLowerCase() === department.toLowerCase());
  return Promise.resolve(filteredJobs);
};

export const getCareerJobById = (id: number): Promise<CareerJob | undefined> => {
  const job = careerJobsData.find(job => job.id === id);
  return Promise.resolve(job);
}; 