import React from 'react';
import { PoliceModuleType } from '../../types/policeSystem';

interface PoliceSystemMainPanelProps {
  activeModule: PoliceModuleType;
  children: React.ReactNode;
}

export const PoliceSystemMainPanel: React.FC<PoliceSystemMainPanelProps> = ({
  activeModule,
  children
}) => {
  return (
    <div className="flex-1 bg-black text-green-400 p-6 overflow-auto">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold font-mono uppercase">
            MODULE: {activeModule.replace('_', ' ')}
          </h1>
        </div>
        <div className="h-px bg-green-400/30 mb-6"></div>
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};
