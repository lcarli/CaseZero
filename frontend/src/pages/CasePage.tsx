import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ToastProvider';
import { caseService, evidenceService } from '../services/api';
import { Case, Evidence as ApiEvidence } from '../types/api';

type PanelType = 'briefing' | 'evidence' | 'notes' | 'analysis' | 'files' | 'timeline' | 'suspects';

interface SidebarItem {
  id: PanelType;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const CasePage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useToast();

  // Case data
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [caseEvidences, setCaseEvidences] = useState<ApiEvidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [activePanel, setActivePanel] = useState<PanelType>('briefing');

  // Investigation state
  const [notes, setNotes] = useState('');
  const [examinedEvidences, setExaminedEvidences] = useState<Set<number>>(new Set());
  const [pendingAnalyses, setPendingAnalyses] = useState<Set<number>>(new Set());

  // Load case data
  useEffect(() => {
    const loadCaseData = async () => {
      if (!caseId) {
        setError('ID do caso não fornecido');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('CasePage: Loading case with ID:', caseId);

        let caseData: Case;
        
        // Get case by ID (peut être string ou number)
        console.log('CasePage: Calling caseService.getCase with:', caseId);
        caseData = await caseService.getCase(caseId);
        console.log('CasePage: Received case data:', caseData);
        
        setCurrentCase(caseData);
        
        // Get case evidences - pour les cases JSON, nous n'avons pas d'evidences séparées
        // Utiliser l'ID du case tel quel
        let evidences: ApiEvidence[] = [];
        try {
          // Essayer de charger les evidences si c'est un case numérique traditionnel
          if (typeof caseData.caseId === 'number') {
            evidences = await evidenceService.getEvidenceByCase(caseData.caseId);
          }
        } catch (evidenceError) {
          // Pas grave si les evidences ne sont pas trouvées pour les cases JSON
          console.log('No traditional evidences found for this case');
        }
        setCaseEvidences(evidences);

      } catch (err: any) {
        console.error('Error loading case data:', err);
        console.error('Error details:', err.response?.data || err.message);
        setError('Erro ao carregar dados do caso');
        addToast('Erro ao carregar caso', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadCaseData();
  }, [caseId, addToast]);

  // Sidebar items configuration
  const sidebarItems: SidebarItem[] = [
    {
      id: 'briefing',
      label: 'Briefing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'evidence',
      label: 'Evidências',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      badge: caseEvidences.length
    },
    {
      id: 'notes',
      label: 'Bloco de Notas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      id: 'analysis',
      label: 'Laboratório',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      badge: pendingAnalyses.size > 0 ? pendingAnalyses.size : undefined
    },
    {
      id: 'files',
      label: 'Arquivos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    },
    {
      id: 'timeline',
      label: 'Linha do Tempo',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'suspects',
      label: 'Suspeitos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'briefing':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <h2 className="text-xl font-bold text-green-400">BRIEFING DO CASO</h2>
            </div>
            {currentCase && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">{currentCase.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{currentCase.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-green-400/20">
                    <h4 className="text-green-400 font-semibold mb-2">CASE ID:</h4>
                    <p className="text-white font-mono">{currentCase.caseId.toString().padStart(6, '0')}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-green-400/20">
                    <h4 className="text-green-400 font-semibold mb-2">STATUS:</h4>
                    <p className="text-yellow-400 font-mono">UNDER INVESTIGATION</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'evidence':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <h2 className="text-xl font-bold text-green-400">EVIDÊNCIAS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseEvidences.map((evidence) => (
                <div
                  key={evidence.evidenceId}
                  className={`bg-slate-700/50 border rounded-lg p-4 transition-all ${
                    examinedEvidences.has(evidence.evidenceId)
                      ? 'border-green-400/50 bg-green-400/10'
                      : 'border-green-400/20 hover:border-green-400/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-green-400 font-semibold">{evidence.name}</h3>
                    {examinedEvidences.has(evidence.evidenceId) && (
                      <span className="text-green-400 text-sm">✓ EXAMINED</span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{evidence.description}</p>
                  <button
                    onClick={() => setExaminedEvidences(prev => new Set([...prev, evidence.evidenceId]))}
                    disabled={examinedEvidences.has(evidence.evidenceId)}
                    className={`w-full py-2 px-4 rounded font-mono text-sm transition-colors ${
                      examinedEvidences.has(evidence.evidenceId)
                        ? 'bg-green-400/20 text-green-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {examinedEvidences.has(evidence.evidenceId) ? 'EXAMINED' : 'EXAMINE'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'notes':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <h2 className="text-xl font-bold text-green-400">BLOCO DE NOTAS</h2>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Digite suas anotações sobre o caso..."
              className="w-full h-96 bg-black border border-green-400/30 rounded text-green-400 p-4 font-mono text-sm resize-none focus:outline-none focus:border-green-400/50"
            />
          </div>
        );
      
      case 'analysis':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <h2 className="text-xl font-bold text-green-400">LABORATÓRIO FORENSE</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseEvidences.filter(e => e.type === 2 || e.type === 3).map((evidence) => (
                <div
                  key={evidence.evidenceId}
                  className={`bg-slate-700/50 border rounded-lg p-4 ${
                    pendingAnalyses.has(evidence.evidenceId)
                      ? 'border-purple-400/50 bg-purple-400/10'
                      : 'border-green-400/20'
                  }`}
                >
                  <h3 className="text-green-400 font-semibold mb-2">{evidence.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{evidence.description}</p>
                  {pendingAnalyses.has(evidence.evidenceId) ? (
                    <div className="text-purple-400 text-sm font-mono">ANALYSIS IN PROGRESS...</div>
                  ) : (
                    <button
                      onClick={() => setPendingAnalyses(prev => new Set([...prev, evidence.evidenceId]))}
                      disabled={!examinedEvidences.has(evidence.evidenceId)}
                      className={`w-full py-2 px-4 rounded font-mono text-sm transition-colors ${
                        !examinedEvidences.has(evidence.evidenceId)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {!examinedEvidences.has(evidence.evidenceId) ? 'EXAMINE FIRST' : 'REQUEST ANALYSIS'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'files':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <h2 className="text-xl font-bold text-green-400">SISTEMA DE ARQUIVOS</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center p-3 bg-slate-700/50 rounded border border-green-400/20">
                <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-green-400 font-mono">case_report.pdf</span>
              </div>
              {caseEvidences.map((evidence) => (
                <div key={evidence.evidenceId} className="flex items-center p-3 bg-slate-700/50 rounded border border-green-400/20">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-green-400 font-mono">{evidence.name.toLowerCase().replace(/\s+/g, '_')}.dat</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'timeline':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
              <h2 className="text-xl font-bold text-green-400">LINHA DO TEMPO</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4"></div>
                <div>
                  <div className="text-green-400 font-mono text-sm">00:00:00</div>
                  <div className="text-gray-300">Case initiated - Investigation begins</div>
                </div>
              </div>
              {caseEvidences.filter(e => examinedEvidences.has(e.evidenceId)).map((evidence, index) => (
                <div key={evidence.evidenceId} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4"></div>
                  <div>
                    <div className="text-green-400 font-mono text-sm">00:{(index + 1).toString().padStart(2, '0')}:00</div>
                    <div className="text-gray-300">Evidence examined: {evidence.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'suspects':
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <h2 className="text-xl font-bold text-green-400">LISTA DE SUSPEITOS</h2>
            </div>
            <div className="text-center py-8">
              <div className="text-yellow-400 font-mono mb-2">SYSTEM MESSAGE:</div>
              <div className="text-gray-300">No suspects identified yet. Continue investigation.</div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-green-400">Painel não encontrado</div>;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-green-400 text-6xl font-mono mb-4">LOADING...</div>
          <div className="text-green-400 font-mono">Accessing police database...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentCase) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl font-mono mb-4">ERROR</div>
          <div className="text-red-400 font-mono mb-4">{error || 'Caso não encontrado'}</div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-red-600 text-white rounded font-mono hover:bg-red-700 transition-colors"
          >
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="bg-slate-900 border-b border-green-400/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-green-400">
              POLICE INVESTIGATION SYSTEM v2.1.4 - CASE #{currentCase.caseId.toString().padStart(6, '0')}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              DETECTIVE: {user?.firstName} {user?.lastName} | {new Date().toLocaleString()}
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              EXIT
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 border-r border-green-400/30 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-green-400 mb-2">SYSTEM MODULES</h2>
            <div className="h-px bg-green-400/30"></div>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded transition-colors ${
                  activePanel === item.id
                    ? 'bg-green-400/20 text-green-300 border border-green-400/50'
                    : 'text-green-400/70 hover:text-green-400 hover:bg-green-400/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* System Status */}
          <div className="mt-8 p-3 bg-slate-800 rounded border border-green-400/30">
            <h3 className="text-sm font-bold text-green-400 mb-2">SYSTEM STATUS</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>DATABASE:</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>FORENSICS:</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>NETWORK:</span>
                <span className="text-green-400">SECURE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderActivePanel()}
        </div>
      </div>
    </div>
  );
};

export default CasePage;
