import React, { useState } from 'react';
import StatCard from '../../components/hrComponents/StatCard';
import MonthlyFinanceSection from '../../components/managerComponents/MonthlyFinanceSection';
import TaskListSection from '../../components/managerComponents/TaskListSection';
import StatsIllustration from '../../components/managerComponents/StatsIllustration';

interface ManagerDashboardPageProps {
  theme?: 'light' | 'dark';
}

interface TaskItem {
  id: number;
  title: string;
  date: string;
  time: string;
}

const ManagerDashboardPage: React.FC<ManagerDashboardPageProps> = ({ theme = 'light' }) => {
  const [tasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: 'Get Meeting With New Employee',
      date: '12 March 2025',
      time: '12:30 PM'
    },
    {
      id: 2,
      title: 'Respond to emails & internal communications',
      date: '12 March 2025',
      time: '12:30 PM'
    },
    {
      id: 3,
      title: 'Approve the Leave Request',
      date: '12 March 2025',
      time: '12:30 PM'
    }
  ]);

  return (
    <div className="p-4">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className={`text-xl font-bold mb-1 ${
          theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
        }`}>Welcome back, Ali Hamza</h1>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>View a high-level overview of company operations, team performance, and department progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Team Member"
          value="32"
          change="20%"
          changeType="increase"
          bgColor="bg-gradient-to-br from-green-400 to-green-500"
          illustration={<StatsIllustration type="team" />}
          theme={theme}
        />
        <StatCard
          title="Active Project"
          value="5"
          change="20%"
          changeType="decrease"
          bgColor="bg-gradient-to-br from-red-400 to-red-500"
          illustration={<StatsIllustration type="project" />}
          theme={theme}
        />
        <StatCard
          title="Employee Engagement Score"
          value="88%"
          change="20%"
          changeType="increase"
          bgColor="bg-gradient-to-br from-green-400 to-green-500"
          illustration={<StatsIllustration type="engagement" />}
          theme={theme}
        />
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Monthly Finance Section - Now takes full width of first column */}
        <div className='col-span-2'>
          <MonthlyFinanceSection theme={theme} />
        </div>
        
        {/* Task List Section */}
        <TaskListSection tasks={tasks} theme={theme} />
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
