import React from 'react';
import { Clock, X } from 'lucide-react';

interface TaskItem {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface TaskListSectionProps {
  tasks: TaskItem[];
  theme?: 'light' | 'dark';
}

const TaskListSection: React.FC<TaskListSectionProps> = ({ tasks, theme = 'light' }) => {
  return (
    <div className={`rounded-xl p-6  ${
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
  );
};

export default TaskListSection; 