import React from 'react';

interface TeamRole {
  id: string;
  name: string;
  count: number;
  change: string;
  avatars: string[];
}

interface TeamSidebarSectionProps {
  teamRoles: TeamRole[];
  theme?: 'light' | 'dark';
  collapsed?: boolean;
}

const TeamSidebarSection: React.FC<TeamSidebarSectionProps> = ({ teamRoles, theme = 'light', collapsed = false }) => {
  return (
    <div className={`mt-4 ${collapsed ? '' : ''}`}>
      {!collapsed && (
        <h3 className={`text-md font-medium mb-2 ml-3 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Teams
        </h3>
      )}
      <div className="space-y-1 w-full">
        {teamRoles.map((role) => (
          <div 
            key={role.id} 
            className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} py-2 px-3 rounded-lg cursor-pointer ${
              theme === 'dark'
                ? 'hover:bg-dark-hover text-dark-text'
                : 'hover:bg-gray-100 text-gray-600'
            } transition-colors w-full`}
            title={collapsed ? role.name : ''}
          >
            {!collapsed ? (
              <>
                <div className="flex items-center gap-1 min-w-0">
                  <span className={`text-xs font-medium truncate`}>{role.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs ${
                    role.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {role.change}
                  </span>
                  <div className="flex -space-x-1">
                    {role.avatars.slice(0, collapsed ? 1 : 2).map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt={`Team member ${index + 1}`}
                        className="w-5 h-5 rounded-full border-2 border-dark-card object-cover"
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex -space-x-1">
                {role.avatars.slice(0, 1).map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={role.name}
                    className="w-6 h-6 rounded-full border-2 border-dark-card object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSidebarSection; 