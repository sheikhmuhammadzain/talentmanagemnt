import React, { useState } from 'react';
import { Clock, MessageSquare, X } from 'lucide-react';
import StatCard from '../../components/hrComponents/StatCard';
import CardContainer from '../../components/hrComponents/CardContainer';

interface ManagerDashboardPageProps {
  theme?: 'light' | 'dark';
}

interface TaskItem {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface TeamRole {
  id: string;
  name: string;
  count: number;
  change: string;
  avatars: string[];
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

  const [teamRoles] = useState<TeamRole[]>([
    {
      id: 'ai-devs',
      name: 'AI Devs',
      count: 10,
      change: '+10',
      avatars: [
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop'
      ]
    },
    {
      id: 'back-end',
      name: 'Back End',
      count: 10,
      change: '+10',
      avatars: [
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop'
      ]
    },
    {
      id: 'designer',
      name: 'Designer',
      count: 5,
      change: '+5',
      avatars: [
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop'
      ]
    },
    {
      id: 'front-end',
      name: 'Front End',
      count: 15,
      change: '+15',
      avatars: [
        'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop'
      ]
    },
    {
      id: 'seo',
      name: 'SEO',
      count: 15,
      change: '+15',
      avatars: [
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
        'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop'
      ]
    }
  ]);

  // Illustrations for stat cards
  const TeamIllustration = () => (
    <div className="flex items-center gap-1">
      <div className="w-10 h-14 bg-white/20 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs font-bold">32</span>
      </div>
      <div className="w-8 h-12 bg-white/15 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs">+</span>
      </div>
    </div>
  );

  const ProjectIllustration = () => (
    <div className="flex items-center gap-1">
      <div className="w-10 h-14 bg-white/20 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs font-bold">5</span>
      </div>
      <div className="w-8 h-12 bg-white/15 rounded-lg flex items-center justify-center">
        <span className="text-white text-xs">📊</span>
      </div>
    </div>
  );

  const EngagementIllustration = () => (
    <div className="relative">
      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">88%</span>
      </div>
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
        <span className="text-white text-xs">📈</span>
      </div>
    </div>
  );

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
          illustration={<TeamIllustration />}
          theme={theme}
        />
        <StatCard
          title="Active Project"
          value="5"
          change="20%"
          changeType="decrease"
          bgColor="bg-gradient-to-br from-red-400 to-red-500"
          illustration={<ProjectIllustration />}
          theme={theme}
        />
        <StatCard
          title="Employee Engagement Score"
          value="88%"
          change="20%"
          changeType="increase"
          bgColor="bg-gradient-to-br from-green-400 to-green-500"
          illustration={<EngagementIllustration />}
          theme={theme}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Section */}
        <div className={`rounded-xl p-6 ${
          theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100'
        }`}>
          <h2 className={`text-lg font-medium mb-6 ${
            theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
          }`}>Team</h2>
          
          <div className="space-y-4">
            {teamRoles.map((role) => (
              <div key={role.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                  }`}>{role.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>{role.change}</span>
                  <div className="flex -space-x-1">
                    {role.avatars.slice(0, 4).map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt={`Team member ${index + 1}`}
                        className="w-6 h-6 rounded-full border-2 border-dark-card object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Finance Section */}
        <div className={`rounded-xl p-6 ${
          theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg font-medium ${
              theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
            }`}>Monthly FInance</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>This month</span>
              </div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Last month</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Project Revenue Chart */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Project Revenue</div>
                    <div className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                    }`}>$5,000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expenses Chart */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="60, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-60"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="10, 100"
                    strokeDashoffset="-85"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="5, 100"
                    strokeDashoffset="-95"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Expenses</div>
                    <div className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                    }`}>$4,725</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Subscriptions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Groceries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Food and dining</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Investing</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            <div className={`font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>$148.40</div>
            <div className={`font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>$642.48</div>
            <div className={`font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>$614.16</div>
            <div className={`font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>$290.00</div>
          </div>
        </div>

        {/* Task List Section */}
        <div className={`rounded-xl p-6 ${
          theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg font-medium ${
              theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
            }`}>Task List</h2>
            <button className={`text-sm ${
              theme === 'dark' ? 'text-dark-text hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}>
              View All
            </button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-dark-background border-dark-border' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                  }`}>{task.title}</h3>
                  <button className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                    Dismiss
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className={`w-3 h-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {task.date}, {task.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
