import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { InvestigationSession, Case, Evidence } from '../types/api';
import { sessionService, caseService, evidenceService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ToastProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const InvestigationPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { addToast } = useToast();
  
  const [session, setSession] = useState<InvestigationSession | null>(null);
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchInvestigationData = async () => {
      if (!sessionId) return;
      
      try {
        setLoading(true);
        const sessionData = await sessionService.getSession(parseInt(sessionId));
        setSession(sessionData);
        setCurrentStep(sessionData.currentStep);
        setNotes(sessionData.notes);
        
        const [caseResponse, evidencesResponse] = await Promise.all([
          caseService.getCase(sessionData.caseId),
          evidenceService.getEvidenceByCase(sessionData.caseId)
        ]);
        
        setCaseData(caseResponse);
        setEvidences(evidencesResponse);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement de l\'enquête');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestigationData();
  }, [sessionId]);

  const handleSaveProgress = async () => {
    if (!session || !sessionId) return;
    
    try {
      await sessionService.updateSession(parseInt(sessionId), {
        currentStep,
        notes,
        lastAction: 'Sauvegarde des progrès',
        lastActionAt: new Date().toISOString(),
        progressPercentage: Math.round((currentStep / session.totalSteps) * 100)
      });
      
      addToast('Progrès sauvegardés avec succès !', 'success');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
      addToast('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleCompleteInvestigation = async () => {
    if (!session || !sessionId) return;
    
    try {
      await sessionService.updateSession(parseInt(sessionId), {
        status: 3, // Terminé
        completedAt: new Date().toISOString(),
        progressPercentage: 100,
        currentStep: session.totalSteps,
        lastAction: 'Enquête terminée',
        lastActionAt: new Date().toISOString()
      });
      
      addToast('Enquête terminée avec succès !', 'success');
      navigate(`/cases/${session.caseId}?completed=true`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la finalisation');
      addToast('Erreur lors de la finalisation', 'error');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Chargement de l'enquête..." />;
  }

  if (error || !session || !caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
              {error || 'Session d\'enquête non trouvée'}
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link
                to={`/cases/${session.caseId}`}
                className="mr-4 text-indigo-600 hover:text-indigo-500"
              >
                ← Retour à l'affaire
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Case Zero</h1>
                <p className="text-sm text-gray-600">Enquête en cours</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">Session #{session.sessionId}</p>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-gray-900">{caseData.title}</h2>
            <span className="text-sm text-gray-500">
              Étape {currentStep} sur {session.totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / session.totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investigation Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Enquête Active</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-6">{caseData.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Étape actuelle
                      </label>
                      <select
                        value={currentStep}
                        onChange={(e) => setCurrentStep(parseInt(e.target.value))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {Array.from({ length: session.totalSteps }, (_, i) => i + 1).map((step) => (
                          <option key={step} value={step}>
                            Étape {step}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes d'enquête
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={8}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Notez vos observations, découvertes et hypothèses..."
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={handleSaveProgress}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                      >
                        Sauvegarder les progrès
                      </button>
                      <button
                        onClick={handleCompleteInvestigation}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
                      >
                        Terminer l'enquête
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Panel */}
            <div>
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Preuves ({evidences.length})
                  </h3>
                </div>
                <div className="px-6 py-4">
                  {evidences.length > 0 ? (
                    <div className="space-y-4">
                      {evidences.map((evidence) => (
                        <div key={evidence.evidenceId} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 text-sm">{evidence.type}</h4>
                          <p className="text-xs text-gray-600 mt-1">{evidence.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            📍 {evidence.location}
                          </p>
                          {evidence.isAvailable && (
                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                              Disponible
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Aucune preuve disponible.</p>
                  )}
                </div>
              </div>

              {/* Session Info */}
              <div className="bg-white shadow rounded-lg mt-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Informations</h3>
                </div>
                <div className="px-6 py-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Démarré:</span>
                    <span className="font-medium">
                      {new Date(session.startedAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Score:</span>
                    <span className="font-medium">{session.score} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Indices utilisés:</span>
                    <span className="font-medium">{session.hintsUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Progression:</span>
                    <span className="font-medium">{session.progressPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestigationPage;
