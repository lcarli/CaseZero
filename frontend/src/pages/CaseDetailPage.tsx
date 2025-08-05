import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Case, Evidence, InvestigationSession } from '../types/api';
import { caseService, evidenceService, sessionService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ToastProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { addToast } = useToast();
  
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [sessions, setSessions] = useState<InvestigationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingSession, setStartingSession] = useState(false);

  useEffect(() => {
    const fetchCaseData = async () => {
      if (!caseId) return;
      
      try {
        setLoading(true);
        console.log('CaseDetailPage: Loading case with ID:', caseId);
        
        // Não fazer parseInt - aceitar IDs de string também
        const caseResponse = await caseService.getCase(caseId);
        console.log('CaseDetailPage: Received case data:', caseResponse);
        
        // Para evidences e sessions, só tentar se for um ID numérico
        let evidencesResponse: Evidence[] = [];
        let sessionsResponse: InvestigationSession[] = [];
        
        if (!isNaN(Number(caseId))) {
          // ID numérico - carregar evidences e sessions tradicionais
          const [evidences, sessions] = await Promise.all([
            evidenceService.getEvidenceByCase(parseInt(caseId)),
            sessionService.getSessionsByCase(parseInt(caseId))
          ]);
          evidencesResponse = evidences;
          sessionsResponse = sessions;
        }
        
        setCaseData(caseResponse);
        setEvidences(evidencesResponse);
        setSessions(sessionsResponse);
      } catch (err: any) {
        console.error('CaseDetailPage error:', err);
        setError(err.response?.data?.message || 'Erreur lors du chargement de l\'affaire');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [caseId]);

  const handleStartInvestigation = async () => {
    if (!caseData || !user) return;
    
    try {
      setStartingSession(true);
      
      // Seulement créer une session si c'est un case avec ID numérique
      if (typeof caseData.caseId === 'number') {
        const session = await sessionService.createSession({
          caseId: caseData.caseId,
          userId: user.userId,
          startedAt: new Date().toISOString(),
          status: 1 // En cours
        });
        
        addToast('Enquête démarrée avec succès !', 'success');
        navigate(`/investigation/${session.sessionId}`);
      } else {
        // Pour les cases JSON, naviguer directement vers la page du case
        addToast('Ouverture du cas...', 'success');
        navigate(`/cases/${caseData.caseId}/investigation`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du démarrage de l\'enquête');
      addToast('Erreur lors du démarrage de l\'enquête', 'error');
    } finally {
      setStartingSession(false);
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    const labels = {
      1: 'Tutoriel',
      2: 'Facile', 
      3: 'Moyen',
      4: 'Difficile',
      5: 'Expert'
    };
    return labels[difficulty as keyof typeof labels] || 'Inconnu';
  };

  const getStatusLabel = (status: number) => {
    const labels = {
      1: 'Ouvert',
      2: 'En cours',
      3: 'Résolu',
      4: 'Fermé',
      5: 'Archivé'
    };
    return labels[status as keyof typeof labels] || 'Inconnu';
  };

  const getDifficultyColor = (difficulty: number) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Chargement de l'affaire..." />;
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
              {error || 'Affaire non trouvée'}
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
                to="/dashboard"
                className="mr-4 text-indigo-600 hover:text-indigo-500"
              >
                ← Retour
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Case Zero</h1>
                <p className="text-sm text-gray-600">Détail de l'affaire</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Case Header */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{caseData.title}</h2>
                  <p className="text-sm text-gray-600">Affaire #{caseData.caseNumber}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {caseData.isTutorial && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Tutoriel
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(caseData.difficulty)}`}>
                    {getDifficultyLabel(caseData.difficulty)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Case Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Case Information */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Description de l'affaire</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">{caseData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Localisation:</span>
                      <p className="font-medium">{caseData.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Temps estimé:</span>
                      <p className="font-medium">{caseData.estimatedTimeMinutes} minutes</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Statut:</span>
                      <p className="font-medium">{getStatusLabel(caseData.status)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Date de création:</span>
                      <p className="font-medium">{new Date(caseData.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence Section */}
              <div className="bg-white shadow rounded-lg mt-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Preuves disponibles ({evidences.length})
                  </h3>
                </div>
                <div className="px-6 py-4">
                  {evidences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {evidences.map((evidence) => (
                        <div key={evidence.evidenceId} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900">{evidence.type}</h4>
                          <p className="text-sm text-gray-600 mt-1">{evidence.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Trouvé: {evidence.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucune preuve disponible pour cette affaire.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Investigation Panel */}
            <div>
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Enquête</h3>
                </div>
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    <button
                      onClick={handleStartInvestigation}
                      disabled={startingSession}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {startingSession ? 'Démarrage...' : 'Commencer l\'enquête'}
                    </button>
                    
                    <button
                      onClick={() => navigate(`/cases/${caseId}/investigation`)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-medium"
                    >
                      🔍 Système d'Investigation (Nouveau)
                    </button>
                  </div>
                  
                  {sessions.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Enquêtes précédentes</h4>
                      <div className="space-y-2">
                        {sessions.slice(0, 3).map((session) => (
                          <div key={session.sessionId} className="text-xs bg-gray-50 p-2 rounded">
                            <p className="font-medium">Session #{session.sessionId}</p>
                            <p className="text-gray-600">
                              {new Date(session.startedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDetailPage;
