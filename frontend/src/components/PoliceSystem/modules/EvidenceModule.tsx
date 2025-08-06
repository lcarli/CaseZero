import React from 'react';

interface EvidenceModuleProps {
  evidences: any[];
  examinedEvidences: Set<string>;
  onExamineEvidence: (evidenceId: string) => void;
  onStartAnalysis?: (evidenceId: string, analysisType: string, duration: number) => void;
}

export const EvidenceModule: React.FC<EvidenceModuleProps> = ({
  evidences,
  examinedEvidences,
  onExamineEvidence,
  onStartAnalysis
}) => {
  const analysisTypes = [
    { id: 'fingerprint', name: 'Análise de Impressões Digitais', duration: 45 },
    { id: 'dna', name: 'Análise de DNA', duration: 120 },
    { id: 'toxicology', name: 'Análise Toxicológica', duration: 90 },
    { id: 'ballistics', name: 'Análise Balística', duration: 60 },
    { id: 'trace', name: 'Análise de Vestígios', duration: 75 },
  ];

  const handleStartAnalysis = (evidenceId: string, analysisType: string, duration: number) => {
    if (onStartAnalysis) {
      onStartAnalysis(evidenceId, analysisType, duration);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <h2 className="text-xl font-bold text-green-400 font-mono">EVIDENCE REPOSITORY</h2>
      </div>
      
      <div className="mb-4 text-green-300 font-mono text-sm">
        TOTAL EVIDENCE COUNT: {evidences.length} | EXAMINED: {examinedEvidences.size}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidences.map((evidence) => (
          <div
            key={evidence.evidenceId}
            className={`bg-slate-700/50 border rounded-lg p-4 transition-all ${
              examinedEvidences.has(evidence.evidenceId)
                ? 'border-green-400/50 bg-green-400/10'
                : 'border-green-400/20 hover:border-green-400/40'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-green-400 font-semibold font-mono">
                EVIDENCE #{evidence.evidenceId}
              </h3>
              {examinedEvidences.has(evidence.evidenceId) && (
                <span className="text-green-400 text-sm font-mono">✓ EXAMINED</span>
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-green-400">NAME: </span>
                <span className="text-white">{evidence.name}</span>
              </div>
              <div>
                <span className="text-green-400">TYPE: </span>
                <span className="text-green-200">{evidence.type}</span>
              </div>
              <div>
                <span className="text-green-400">DESC: </span>
                <span className="text-gray-300">{evidence.description}</span>
              </div>
              <div>
                <span className="text-green-400">LOCATION: </span>
                <span className="text-yellow-300">{evidence.location}</span>
              </div>
            </div>

            <button
              onClick={() => onExamineEvidence(evidence.evidenceId)}
              disabled={examinedEvidences.has(evidence.evidenceId)}
              className={`w-full mt-3 py-2 px-4 rounded font-mono text-sm transition-colors ${
                examinedEvidences.has(evidence.evidenceId)
                  ? 'bg-green-400/20 text-green-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {examinedEvidences.has(evidence.evidenceId) ? '[EXAMINED]' : '[EXAMINE]'}
            </button>

            {/* Seção de Análises Forenses */}
            {examinedEvidences.has(evidence.evidenceId) && onStartAnalysis && (
              <div className="mt-4 border-t border-green-400/30 pt-4">
                <div className="text-yellow-400 font-mono text-sm mb-2">FORENSIC ANALYSIS:</div>
                <div className="space-y-1">
                  {analysisTypes.map((analysis) => (
                    <button
                      key={analysis.id}
                      onClick={() => handleStartAnalysis(
                        evidence.evidenceId, 
                        analysis.name, 
                        analysis.duration
                      )}
                      className="w-full text-left p-2 bg-yellow-600/20 border border-yellow-400/30 hover:bg-yellow-600/40 text-yellow-300 font-mono text-xs transition-colors rounded"
                    >
                      <div className="flex justify-between">
                        <span>{analysis.name}</span>
                        <span>~{analysis.duration}min</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {evidences.length === 0 && (
        <div className="text-center py-8">
          <div className="text-yellow-400 font-mono mb-2">SYSTEM MESSAGE:</div>
          <div className="text-gray-300">No evidence available in current case database.</div>
        </div>
      )}
    </div>
  );
};
