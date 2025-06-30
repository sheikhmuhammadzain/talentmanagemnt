import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import JobCard from './components/JobCard';
import RecruitmentTable from './components/RecruitmentTable';
import RecruitmentPage from './components/RecruitmentPage';
import ChatBot from './components/ChatBot';
import { Code, Edit, FileText, Smartphone, Users, Calendar, Clock } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Illustrations for stat cards
  const EmployeeIllustration = () => (
    <div className="flex items-center gap-2">
      <div className="w-12 h-16 bg-white/20 rounded-lg flex items-center justify-center">
        <Users className="w-6 h-6 text-white" />
      </div>
      <div className="w-10 h-14 bg-white/15 rounded-lg flex items-center justify-center">
        <Users className="w-5 h-5 text-white" />
      </div>
      <div className="w-8 h-12 bg-white/10 rounded-lg flex items-center justify-center">
        <Users className="w-4 h-4 text-white" />
      </div>
    </div>
  );

  const PositionsIllustration = () => (
    <div className="flex items-center gap-2">
      <div className="w-12 h-16 bg-white/20 rounded-lg flex items-center justify-center">
        <FileText className="w-6 h-6 text-white" />
      </div>
      <div className="w-10 h-14 bg-white/15 rounded-lg flex items-center justify-center">
        <Edit className="w-5 h-5 text-white" />
      </div>
    </div>
  );

  const TimeIllustration = () => (
    <div className="relative">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
        <Clock className="w-8 h-8 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
        <Calendar className="w-3 h-3 text-white" />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'recruitment':
        return <RecruitmentPage />;
      case 'dashboard':
      default:
        return (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ali Hamza</h1>
              <p className="text-gray-600">Track, Manage anf Forecast Your Employees Onboarding</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Employees"
                value="38"
                change="12%"
                changeType="increase"
                bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
                illustration={<EmployeeIllustration />}
              />
              <StatCard
                title="Open Positions"
                value="5"
                change="5%"
                changeType="increase"
                bgColor="bg-gradient-to-br from-orange-400 to-orange-500"
                illustration={<PositionsIllustration />}
              />
              <StatCard
                title="Time to Hire"
                value="20 Days"
                change="5%"
                changeType="increase"
                bgColor="bg-gradient-to-br from-teal-400 to-teal-500"
                illustration={<TimeIllustration />}
              />
            </div>

            {/* You Need To Hire Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">You Need To Hire</h2>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <span className="text-sm">View All</span>
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <JobCard
                  title="PHP Developer"
                  candidates={1}
                  icon={<Code className="w-8 h-8 text-white" />}
                  bgColor="bg-orange-500"
                />
                <JobCard
                  title="Content Writer"
                  candidates={1}
                  icon={<Edit className="w-8 h-8 text-white" />}
                  bgColor="bg-purple-500"
                />
                <JobCard
                  title="PHP Developer"
                  candidates={1}
                  icon={<Code className="w-8 h-8 text-white" />}
                  bgColor="bg-blue-500"
                />
                <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded-full text-xs">
                    ✨
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">iOS Developer</h3>
                    <p className="text-sm opacity-75">1 Candidate</p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 text-xs text-gray-600">
                    <div className="space-y-1">
                      <div className="text-xs">Description</div>
                      <div className="text-xs">Hiring</div>
                      <div className="text-xs">Duration</div>
                      <div className="text-xs">Schedule</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruitment Progress Table */}
            <RecruitmentTable />
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
}

export default App;