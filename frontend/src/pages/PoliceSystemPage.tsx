import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ToastProvider';
import { PoliceSystemHeader } from '../components/PoliceSystem/PoliceSystemHeader';
import { PoliceSystemSidebar } from '../components/PoliceSystem/PoliceSystemSidebar';
import { PoliceSystemMainPanel } from '../components/PoliceSystem/PoliceSystemMainPanel';
import { BriefingModule } from '../components/PoliceSystem/modules/BriefingModule';
import { EvidenceModule } from '../components/PoliceSystem/modules/EvidenceModule';
import { NotesModule } from '../components/PoliceSystem/modules/NotesModule';
import { TimeSystemModule } from '../components/PoliceSystem/modules/TimeSystemModule';
import { usePoliceSystem } from '../hooks/usePoliceSystem';
import { PoliceSystemModule } from '../types/policeSystem';
import { caseService, evidenceService } from '../services/api';
import { Case, Evidence as ApiEvidence } from '../types/api';
import { useState, useEffect } from 'react';

const PoliceSystemPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useToast();

  // Case data
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [caseEvidences, setCaseEvidences] = useState<ApiEvidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Police System State
  const investigatorName = `${user?.firstName} ${user?.lastName}`;
  const { state, actions } = usePoliceSystem(caseId || '', investigatorName);

  // Load case data
  useEffect(() => {
    const loadCaseData = async () => {
      if (!caseId) return;
      
      try {
        setLoading(true);
        console.log('PoliceSystemPage: Loading case with ID:', caseId);
        
        const caseData = await caseService.getCase(caseId);
        console.log('PoliceSystemPage: Received case data:', caseData);
        
        setCurrentCase(caseData);
        
        // Get case evidences - para os cases JSON, não temos evidences separadas
        let evidences: ApiEvidence[] = [];
        try {
          if (typeof caseData.caseId === 'number') {
            evidences = await evidenceService.getEvidenceByCase(caseData.caseId);
          }
        } catch (evidenceError) {
          console.log('No traditional evidences found for this case');
        }
        setCaseEvidences(evidences);

      } catch (err: any) {
        console.error('Error loading case data:', err);
        setError('Erro ao carregar dados do caso');
        addToast('Erro ao carregar caso', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadCaseData();
  }, [caseId, addToast]);

  // Sidebar modules configuration
  const sidebarModules: PoliceSystemModule[] = [
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
      label: 'Análise',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      badge: state.pendingAnalyses.size
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
      label: 'Timeline',
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'timesystem',
      label: 'Sistema Temporal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      badge: state.timedAnalyses.filter(a => !a.isCompleted).length
    }
  ];

  const handleExit = () => {
    navigate('/dashboard');
  };

  const renderActiveModule = () => {
    switch (state.activeModule) {
      case 'briefing':
        return <BriefingModule caseData={currentCase} />;
      case 'evidence':
        return (
          <EvidenceModule
            evidences={caseEvidences}
            examinedEvidences={state.examinedEvidences}
            onExamineEvidence={actions.examineEvidence}
            onStartAnalysis={actions.startAnalysis}
          />
        );
      case 'notes':
        return (
          <NotesModule
            notes={state.investigationNotes}
            onUpdateNotes={actions.updateNotes}
          />
        );
      case 'analysis':
        return <div className="text-green-400 font-mono">ANÁLISE MODULE - EM DESENVOLVIMENTO</div>;
      case 'files':
        return <div className="text-green-400 font-mono">FILES MODULE - EM DESENVOLVIMENTO</div>;
      case 'timeline':
        return <div className="text-green-400 font-mono">TIMELINE MODULE - EM DESENVOLVIMENTO</div>;
      case 'suspects':
        return <div className="text-green-400 font-mono">SUSPECTS MODULE - EM DESENVOLVIMENTO</div>;
      case 'timesystem':
        return (
          <TimeSystemModule
            gameTime={state.gameTime}
            timedAnalyses={state.timedAnalyses}
            onPauseTime={actions.pauseTime}
            onResumeTime={actions.resumeTime}
            onSetTimeSpeed={actions.setTimeSpeed}
            getCurrentGameTime={actions.getCurrentGameTime}
            formatGameTime={actions.formatGameTime}
          />
        );
      default:
        return <div className="text-green-400 font-mono">MODULE NOT FOUND</div>;
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
          <div className="text-red-400 text-4xl font-mono mb-4">ACCESS DENIED</div>
          <div className="text-red-400 font-mono mb-4">{error}</div>
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-red-600 text-white rounded font-mono hover:bg-red-700"
          >
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <PoliceSystemHeader
        caseId={state.caseId}
        investigatorName={state.investigatorName}
        onExit={handleExit}
      />
      
      <div className="flex h-screen">
        <PoliceSystemSidebar
          modules={sidebarModules}
          activeModule={state.activeModule}
          onModuleSelect={actions.setActiveModule}
          systemStatus={state.systemStatus}
        />
        
        <PoliceSystemMainPanel activeModule={state.activeModule}>
          {renderActiveModule()}
        </PoliceSystemMainPanel>
      </div>
    </div>
  );
};

export default PoliceSystemPage;
