import React from 'react';

interface BriefingModuleProps {
  caseData: any;
}

export const BriefingModule: React.FC<BriefingModuleProps> = ({ caseData }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
        <h2 className="text-xl font-bold text-green-400 font-mono">MISSION BRIEFING</h2>
      </div>
      
      <div className="space-y-4 text-green-300 font-mono">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-green-400/20 rounded p-3">
            <div className="text-green-400 text-sm mb-1">CASE ID:</div>
            <div className="text-white">{caseData?.caseId || 'UNKNOWN'}</div>
          </div>
          <div className="border border-green-400/20 rounded p-3">
            <div className="text-green-400 text-sm mb-1">PRIORITY:</div>
            <div className="text-red-400">HIGH</div>
          </div>
        </div>

        <div className="border border-green-400/20 rounded p-4">
          <div className="text-green-400 text-sm mb-2">CASE TITLE:</div>
          <div className="text-white text-lg">{caseData?.title || 'Loading...'}</div>
        </div>

        <div className="border border-green-400/20 rounded p-4">
          <div className="text-green-400 text-sm mb-2">DESCRIPTION:</div>
          <div className="text-green-200 leading-relaxed">
            {caseData?.description || 'Case details being retrieved from central database...'}
          </div>
        </div>

        <div className="border border-green-400/20 rounded p-4">
          <div className="text-green-400 text-sm mb-2">BRIEFING:</div>
          <div className="text-green-200 leading-relaxed whitespace-pre-line">
            {caseData?.briefing?.fr || 'Mission briefing loading...'}
          </div>
        </div>

        <div className="border border-orange-400/30 rounded p-4 bg-orange-400/10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-orange-400 rounded mr-2"></div>
            <div className="text-orange-400 font-bold">SYSTEM ALERT</div>
          </div>
          <div className="text-orange-200">
            All evidence must be properly documented. Chain of custody protocols in effect.
          </div>
        </div>
      </div>
    </div>
  );
};
