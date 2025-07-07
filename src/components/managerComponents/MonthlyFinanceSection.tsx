import React from 'react';

interface MonthlyFinanceSectionProps {
  theme?: 'light' | 'dark';
}

const MonthlyFinanceSection: React.FC<MonthlyFinanceSectionProps> = ({ theme = 'light' }) => {
  return (
    <div className={`rounded-xl p-6 h-full flex flex-col ${
      theme === 'dark' ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-medium ${
          theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
        }`}>Monthly Finance</h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>This month</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Last month</span>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly items-center flex-grow mb-8">
        {/* Project Revenue Chart */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
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
                <div className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                }`}>$5,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Chart */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
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
                strokeDasharray="35, 100"
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
                strokeDashoffset="-35"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-pink-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="15, 100"
                strokeDashoffset="-60"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="10, 100"
                strokeDashoffset="-75"
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
                <div className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-dark-text' : 'text-gray-900'
                }`}>$4,725</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend - Updated grid to show all expense categories */}
      <div className="grid grid-cols-2 gap-4 mt-auto text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Subscriptions</span>
          <span className="ml-auto font-medium">$148.40</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Groceries</span>
          <span className="ml-auto font-medium">$642.48</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Food and dining</span>
          <span className="ml-auto font-medium">$614.16</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Investing</span>
          <span className="ml-auto font-medium">$290.00</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Mortgage</span>
          <span className="ml-auto font-medium">$824.28</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Other</span>
          <span className="ml-auto font-medium">$48.44</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyFinanceSection; 