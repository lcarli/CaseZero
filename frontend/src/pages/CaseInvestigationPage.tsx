import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Evidence, Analysis } from '../types/api';
import EvidenceViewer from '../components/EvidenceViewer';
import InteractiveTimeline from '../components/InteractiveTimeline';
import AnalysisSystem from '../components/AnalysisSystem';
import LoadingSpinner from '../components/LoadingSpinner';

interface CaseData {
  caseId: number;
  title: string;
  description: string;
  status: string;
  difficulty: number;
  evidences: Evidence[];
  analyses: Analysis[];
}

const CaseInvestigationPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'evidence' | 'timeline' | 'analysis'>('evidence');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<number | null>(null);

  useEffect(() => {
    const loadCaseData = async () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const mockData: CaseData = {
          caseId: parseInt(caseId || '1'),
          title: 'L\'Affaire du Laboratoire Abandonné',
          description: 'Un laboratoire clandestin a été découvert dans un entrepôt abandonné.',
          status: 'En cours',
          difficulty: 3,
          evidences: [
            {
              evidenceId: 1,
              caseId: parseInt(caseId || '1'),
              evidenceNumber: 'EV-001',
              name: 'Échantillon chimique suspect',
              nameEn: 'Suspicious chemical sample',
              description: 'Substance blanche trouvée sur la table du laboratoire',
              descriptionEn: 'White substance found on laboratory table',
              type: 5,
              category: 1,
              location: 'Table principale du laboratoire',
              locationEn: 'Main laboratory table',
              collectedAt: '2024-08-01T10:30:00Z',
              collectedBy: 'Agent Smith',
              collectedByEn: 'Agent Smith',
              filePath: null,
              content: null,
              contentEn: null,
              isAvailable: true,
              requiresAnalysis: true,
              tags: 'chemical,white,powder',
              caseNumber: 'CASE-001',
              caseTitle: 'L\'Affaire du Laboratoire Abandonné'
            }
          ],
          analyses: [
            {
              analysisId: 1,
              evidenceId: 1,
              analyzedBy: 1,
              analyzedAt: '2024-08-02T10:30:00Z',
              status: 2,
              results: 'Cocaïne pure à 95%',
              resultsEn: '95% pure cocaine',
              notes: 'Substance hautement pure',
              notesEn: 'Highly pure substance',
              confidenceLevel: 95,
              tags: 'chemical,cocaine,drug',
              evidenceName: 'Échantillon chimique suspect',
              analyzerName: 'Dr. Martin'
            }
          ]
        };

        setCaseData(mockData);
        setIsLoading(false);
      }, 1000);
    };

    loadCaseData();
  }, [caseId]);

  const handleStartAnalysis = (evidenceId: number, analysisType: string) => {
    console.log(`Démarrer analyse ${analysisType} pour l'évidence ${evidenceId}`);
  };

  const handleEvidenceSelect = (evidence: Evidence) => {
    setSelectedEvidenceId(evidence.evidenceId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Affaire non trouvée</h2>
          <p className="text-gray-600">L'affaire demandée n'existe pas ou n'est pas accessible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{caseData.title}</h1>
              <p className="text-gray-600 mt-2">{caseData.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {caseData.status}
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Difficulté: {caseData.difficulty}/5
                </span>
                <span className="text-gray-500 text-sm">
                  {caseData.evidences.length} preuves • {caseData.analyses.length} analyses
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                📋 Résoudre l'affaire
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('evidence')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'evidence'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🔍 Preuves ({caseData.evidences.length})
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'timeline'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📅 Timeline
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'analysis'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🔬 Analyses ({caseData.analyses.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'evidence' && (
              <EvidenceViewer 
                evidences={caseData.evidences}
                onEvidenceSelect={handleEvidenceSelect}
                selectedEvidenceId={selectedEvidenceId}
              />
            )}

            {activeTab === 'timeline' && (
              <InteractiveTimeline 
                evidences={caseData.evidences}
                events={[]}
                onEventSelect={(event) => console.log('Event selected:', event)}
              />
            )}

            {activeTab === 'analysis' && (
              <AnalysisSystem 
                analyses={caseData.analyses}
                onRequestAnalysis={handleStartAnalysis}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseInvestigationPage;
