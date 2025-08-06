import React from 'react';

interface PoliceSystemHeaderProps {
  caseId: string;
  investigatorName: string;
  onExit: () => void;
}

export const PoliceSystemHeader: React.FC<PoliceSystemHeaderProps> = ({
  caseId,
  investigatorName,
  onExit
}) => {
  return (
    <div className="bg-black border-b border-green-400/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-green-400 font-mono text-center">
          POLICE INVESTIGATION SYSTEM v2.1.4 - CASE #{caseId.toString().padStart(6, '0')}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm font-mono text-green-400">
          DETECTIVE: {investigatorName} | {new Date().toLocaleString()}
        </div>
        <button
          onClick={onExit}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors font-mono"
        >
          EXIT
        </button>
      </div>
    </div>
  );
};
