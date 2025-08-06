import React from 'react';
import { PoliceSystemModule, PoliceModuleType } from '../../types/policeSystem';

interface PoliceSystemSidebarProps {
  modules: PoliceSystemModule[];
  activeModule: PoliceModuleType;
  onModuleSelect: (moduleId: PoliceModuleType) => void;
  systemStatus: {
    database: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
    forensics: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
    network: 'SECURE' | 'UNSECURE' | 'MAINTENANCE';
  };
}

export const PoliceSystemSidebar: React.FC<PoliceSystemSidebarProps> = ({
  modules,
  activeModule,
  onModuleSelect,
  systemStatus
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE':
      case 'SECURE':
        return 'text-green-400';
      case 'OFFLINE':
      case 'UNSECURE':
        return 'text-red-400';
      case 'MAINTENANCE':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-green-400/30 p-4 h-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-green-400 mb-2 font-mono">SYSTEM MODULES</h2>
        <div className="h-px bg-green-400/30"></div>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleSelect(module.id)}
            className={`w-full flex items-center justify-between p-3 rounded transition-colors font-mono ${
              activeModule === module.id
                ? 'bg-green-400/20 text-green-300 border border-green-400/50'
                : 'text-green-400/70 hover:text-green-400 hover:bg-green-400/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              {module.icon}
              <span className="text-sm font-medium">{module.label}</span>
            </div>
            {module.badge !== undefined && module.badge > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {module.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-3 bg-slate-800 rounded border border-green-400/30">
        <h3 className="text-sm font-bold text-green-400 mb-2 font-mono">SYSTEM STATUS</h3>
        <div className="space-y-1 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-green-400/70">DATABASE:</span>
            <span className={getStatusColor(systemStatus.database)}>{systemStatus.database}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-400/70">FORENSICS:</span>
            <span className={getStatusColor(systemStatus.forensics)}>{systemStatus.forensics}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-400/70">NETWORK:</span>
            <span className={getStatusColor(systemStatus.network)}>{systemStatus.network}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
