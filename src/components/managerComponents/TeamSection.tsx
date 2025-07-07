import React from 'react';

interface TeamRole {
  id: string;
  name: string;
  count: number;
  change: string;
  avatars: string[];
}

interface TeamSectionProps {
  teamRoles: TeamRole[];
  theme?: 'light' | 'dark';
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamRoles, theme = 'light' }) => {
  return (
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
  );
};

export default TeamSection; 