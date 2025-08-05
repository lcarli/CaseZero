import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ToastProvider';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

interface TutorialStep {
  id: number;
  type: 'briefing' | 'evidence' | 'analysis' | 'solution';
  completed: boolean;
}

interface Evidence {
  id: string;
  name: string;
  description: string;
  examined: boolean;
  requiresAnalysis?: boolean;
  analysisType?: string;
  analysisCompleted?: boolean;
}

interface Suspect {
  id: string;
  name: string;
  role: string;
  description: string;
}

const TutorialPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>([
    { id: 1, type: 'briefing', completed: false },
    { id: 2, type: 'evidence', completed: false },
    { id: 3, type: 'analysis', completed: false },
    { id: 4, type: 'solution', completed: false }
  ]);

  const [evidences, setEvidences] = useState<Evidence[]>([
    {
      id: 'manager-report',
      name: t('tutorial.evidence.managerReport'),
      description: 'Relatório oficial da descoberta do furto às 14h30',
      examined: false
    },
    {
      id: 'cash-photo',
      name: t('tutorial.evidence.cashRegisterPhoto'),
      description: 'Foto do caixa após a descoberta, sem sinais de arrombamento',
      examined: false
    },
    {
      id: 'employee-list',
      name: t('tutorial.evidence.employeeList'),
      description: 'Lista dos funcionários que têm acesso ao caixa',
      examined: false
    },
    {
      id: 'security-footage',
      name: t('tutorial.evidence.securityFootage'),
      description: 'Gravação da câmera de segurança do período 13h00-15h00',
      examined: false,
      requiresAnalysis: true,
      analysisType: 'video',
      analysisCompleted: false
    },
    {
      id: 'fingerprints',
      name: t('tutorial.evidence.fingerprints'),
      description: 'Impressões digitais coletadas da gaveta do caixa',
      examined: false,
      requiresAnalysis: true,
      analysisType: 'fingerprint',
      analysisCompleted: false
    }
  ]);

  const [suspects] = useState<Suspect[]>([
    {
      id: 'joao',
      name: t('tutorial.suspects.joao.name'),
      role: t('tutorial.suspects.joao.role'),
      description: t('tutorial.suspects.joao.description')
    },
    {
      id: 'maria',
      name: t('tutorial.suspects.maria.name'),
      role: t('tutorial.suspects.maria.role'),
      description: t('tutorial.suspects.maria.description')
    },
    {
      id: 'pedro',
      name: t('tutorial.suspects.pedro.name'),
      role: t('tutorial.suspects.pedro.role'),
      description: t('tutorial.suspects.pedro.description')
    }
  ]);

  const [selectedSuspect, setSelectedSuspect] = useState<string>('');
  const [selectedEvidence, setSelectedEvidence] = useState<string>('');
  const [showSolution, setShowSolution] = useState(false);

  const handleEvidenceExamine = (evidenceId: string) => {
    setEvidences(prev => 
      prev.map(evidence => 
        evidence.id === evidenceId 
          ? { ...evidence, examined: true }
          : evidence
      )
    );
    addToast(t('tutorial.messages.evidenceExamined'), 'success');
  };

  const handleAnalysisRequest = (evidenceId: string) => {
    setEvidences(prev => 
      prev.map(evidence => 
        evidence.id === evidenceId 
          ? { ...evidence, analysisCompleted: true }
          : evidence
      )
    );
    addToast(t('tutorial.messages.analysisRequested'), 'success');
  };

  const handleSubmitSolution = () => {
    if (selectedSuspect === 'maria' && selectedEvidence === 'security-footage') {
      setShowSolution(true);
      addToast(t('tutorial.messages.correctAnswer'), 'success');
      // Marcar tutorial como completo
      setTutorialSteps(prev => 
        prev.map(step => ({ ...step, completed: true }))
      );
    } else {
      addToast(t('tutorial.messages.wrongAnswer'), 'error');
      if (!selectedEvidence.includes('security')) {
        addToast(t('tutorial.messages.hint'), 'info');
      }
    }
  };

  const handleFinishTutorial = () => {
    addToast(t('tutorial.messages.success'), 'success');
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      // Marcar step atual como completo
      setTutorialSteps(prev => 
        prev.map(step => 
          step.id === currentStep 
            ? { ...step, completed: true }
            : step
        )
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return true; // Briefing sempre pode avançar
      case 2:
        return evidences.filter(e => e.examined).length >= 3; // Pelo menos 3 evidências examinadas
      case 3:
        return evidences.filter(e => e.requiresAnalysis && e.analysisCompleted).length >= 1; // Pelo menos 1 análise completa
      case 4:
        return showSolution; // Só pode avançar se resolveu corretamente
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('tutorial.briefing.title')}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                {t('tutorial.briefing.content')}
              </p>
              
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-indigo-300 mb-4">
                  {t('tutorial.objectives.title')}
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {t('tutorial.objectives.obj1')}
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {t('tutorial.objectives.obj2')}
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {t('tutorial.objectives.obj3')}
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-indigo-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {t('tutorial.objectives.obj4')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('tutorial.steps.step1.title')}
              </h3>
              <p className="text-slate-300 text-lg mb-8">
                {t('tutorial.steps.step1.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {evidences.map((evidence) => (
                  <div
                    key={evidence.id}
                    className={`group relative bg-slate-700/50 border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                      evidence.examined 
                        ? 'border-emerald-500/50 bg-emerald-500/10' 
                        : 'border-slate-600/50 hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">
                        {evidence.name}
                      </h4>
                      {evidence.examined && (
                        <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    
                    <p className="text-slate-300 mb-4">
                      {evidence.description}
                    </p>

                    {evidence.requiresAnalysis && (
                      <div className="mb-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                          {t('tutorial.analysis.title')}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => handleEvidenceExamine(evidence.id)}
                      disabled={evidence.examined}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        evidence.examined
                          ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {evidence.examined ? '✓ Examinada' : 'Examinar Evidência'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-300 text-sm">
                  <strong>Progresso:</strong> {evidences.filter(e => e.examined).length} de {evidences.length} evidências examinadas
                  {evidences.filter(e => e.examined).length >= 3 && ' ✓ Você pode avançar!'}
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('tutorial.steps.step2.title')}
              </h3>
              <p className="text-slate-300 text-lg mb-8">
                {t('tutorial.steps.step2.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {evidences.filter(e => e.requiresAnalysis).map((evidence) => (
                  <div
                    key={evidence.id}
                    className={`group relative bg-slate-700/50 border rounded-xl p-6 transition-all duration-300 ${
                      evidence.analysisCompleted 
                        ? 'border-emerald-500/50 bg-emerald-500/10' 
                        : 'border-slate-600/50 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">
                        {evidence.name}
                      </h4>
                      {evidence.analysisCompleted && (
                        <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    
                    <p className="text-slate-300 mb-4">
                      Tipo de análise: {evidence.analysisType === 'video' ? t('tutorial.analysis.video') : t('tutorial.analysis.fingerprint')}
                    </p>

                    {evidence.analysisCompleted && (
                      <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <p className="text-emerald-300 text-sm">
                          {evidence.id === 'security-footage' 
                            ? 'Resultado: Maria Santos vista acessando o caixa às 14h15'
                            : 'Resultado: Impressões digitais de Maria Santos encontradas na gaveta'
                          }
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => handleAnalysisRequest(evidence.id)}
                      disabled={evidence.analysisCompleted || !evidence.examined}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        evidence.analysisCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                          : !evidence.examined
                          ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {evidence.analysisCompleted 
                        ? '✓ Análise Completa' 
                        : !evidence.examined
                        ? 'Examine primeiro a evidência'
                        : 'Solicitar Análise'
                      }
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                <p className="text-purple-300 text-sm">
                  <strong>Progresso:</strong> {evidences.filter(e => e.analysisCompleted).length} de {evidences.filter(e => e.requiresAnalysis).length} análises completas
                  {evidences.filter(e => e.analysisCompleted).length >= 1 && ' ✓ Você pode avançar!'}
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('tutorial.steps.step4.title')}
              </h3>
              <p className="text-slate-300 text-lg mb-8">
                {t('tutorial.steps.step4.description')}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Suspects */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">
                    {t('tutorial.suspects.title')}
                  </h4>
                  <div className="space-y-4">
                    {suspects.map((suspect) => (
                      <div
                        key={suspect.id}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          selectedSuspect === suspect.id
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                        onClick={() => setSelectedSuspect(suspect.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-white">{suspect.name}</h5>
                          <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                            {suspect.role}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">{suspect.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence Selection */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Evidência Principal
                  </h4>
                  <div className="space-y-4">
                    {evidences.filter(e => e.examined).map((evidence) => (
                      <div
                        key={evidence.id}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          selectedEvidence === evidence.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                        onClick={() => setSelectedEvidence(evidence.id)}
                      >
                        <h5 className="font-semibold text-white mb-2">{evidence.name}</h5>
                        <p className="text-slate-300 text-sm">{evidence.description}</p>
                        {evidence.analysisCompleted && (
                          <span className="inline-block mt-2 text-xs bg-emerald-600 text-white px-2 py-1 rounded">
                            ✓ Análise Completa
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleSubmitSolution}
                  disabled={!selectedSuspect || !selectedEvidence}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white px-8 py-3 rounded-xl font-medium disabled:cursor-not-allowed transition-all duration-200"
                >
                  Submeter Solução
                </button>
              </div>

              {showSolution && (
                <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-emerald-300 mb-4">
                    🎉 {t('tutorial.solution.title')}
                  </h4>
                  <p className="text-emerald-200 mb-2">
                    <strong>Culpado:</strong> {t('tutorial.solution.culprit')}
                  </p>
                  <p className="text-emerald-200 mb-4">
                    <strong>Evidência chave:</strong> {t('tutorial.solution.evidence')}
                  </p>
                  <p className="text-emerald-100">
                    {t('tutorial.solution.explanation')}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    {t('tutorial.title')}
                  </h1>
                  <p className="text-xs text-slate-400">{t('tutorial.subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-400">{user?.role} • Tutorial</p>
              </div>
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {t('tutorial.navigation.back')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-slate-800/50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-white">
              {t(`tutorial.steps.step${currentStep}.title`)}
            </h2>
            <span className="text-sm text-slate-400">
              {currentStep} de 4
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="inline-flex items-center px-6 py-3 border border-slate-600 text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('tutorial.navigation.previous')}
          </button>

          <div className="flex space-x-2">
            {tutorialSteps.map((step) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  step.id === currentStep
                    ? 'bg-emerald-500'
                    : step.completed
                    ? 'bg-green-500'
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {t('tutorial.navigation.next')}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleFinishTutorial}
              disabled={!showSolution}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {t('tutorial.navigation.finish')}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default TutorialPage;
