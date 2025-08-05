import React, { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';

const GameTester: React.FC = () => {
  const {
    caseDefinition,
    gameProgress,
    isLoading,
    error,
    initializeGame,
    discoverEvidence,
    completeAnalysis,
    useHint,
    conductInterview,
    submitAccusation,
    canSubmitAccusation,
    getProgressStats,
    getCurrentScore,
    getDiscoveredEvidence,
    resetProgress
  } = useGame();

  const [accusationForm, setAccusationForm] = useState({
    suspectId: '',
    motive: '',
    methodOfCrime: '',
    supportingEvidence: '',
    reasoning: ''
  });

  // Charger le cas de test
  useEffect(() => {
    const loadTestCase = async () => {
      try {
        const response = await fetch('/cases/case_001.json');
        const caseData = await response.json();
        await initializeGame(caseData);
      } catch (err) {
        console.error('Erreur chargement cas test:', err);
      }
    };

    loadTestCase();
  }, [initializeGame]);

  const handleDiscoverEvidence = async (evidenceId: string) => {
    await discoverEvidence(evidenceId, 'library');
  };

  const handleCompleteAnalysis = async (analysisType: string, evidenceId: string) => {
    await completeAnalysis(analysisType, evidenceId, 'correct');
  };

  const handleUseHint = async (hintType: string) => {
    await useHint(hintType);
  };

  const handleConductInterview = async (suspectId: string) => {
    await conductInterview(suspectId, ['question_1', 'question_2']);
  };

  const handleSubmitAccusation = async () => {
    if (!accusationForm.suspectId || !accusationForm.motive || !accusationForm.methodOfCrime || !accusationForm.reasoning) {
      alert('Veuillez remplir tous les champs de l\'accusation');
      return;
    }

    const accusation = {
      suspectId: accusationForm.suspectId,
      motive: accusationForm.motive,
      methodOfCrime: accusationForm.methodOfCrime,
      supportingEvidence: accusationForm.supportingEvidence.split(',').map(id => id.trim()).filter(id => id),
      reasoning: accusationForm.reasoning
    };

    const validation = await submitAccusation(accusation);
    if (validation) {
      alert(`Accusation soumise !\nCorrect: ${validation.isCorrect}\nScore: ${validation.score}\nFeedback: ${validation.feedback}`);
    }
  };

  const stats = getProgressStats();
  const canAccuse = canSubmitAccusation();

  if (isLoading) {
    return <div className="p-6 text-center">Chargement du jeu...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Erreur: {error}</div>;
  }

  if (!caseDefinition || !gameProgress) {
    return <div className="p-6 text-center">Aucun cas chargé</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Test du Système de Cas - {caseDefinition.metadata.title}
        </h1>
        
        {/* Informations du cas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Informations du Cas</h2>
            <p><strong>Description:</strong> {caseDefinition.metadata.description}</p>
            <p><strong>Difficulté:</strong> {caseDefinition.metadata.difficulty}/5</p>
            <p><strong>Temps estimé:</strong> {caseDefinition.metadata.estimatedTimeMinutes} minutes</p>
            <p><strong>Lieu:</strong> {caseDefinition.metadata.location}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Progression</h2>
            {stats && (
              <>
                <p><strong>Score actuel:</strong> {getCurrentScore()}</p>
                <p><strong>Temps passé:</strong> {gameProgress.timeSpentMinutes} minutes</p>
                <p><strong>Preuves découvertes:</strong> {stats.evidence.discovered}/{stats.evidence.total} ({stats.evidence.percentage}%)</p>
                <p><strong>Suspects interrogés:</strong> {stats.suspects.interviewed}/{stats.suspects.total} ({stats.suspects.percentage}%)</p>
                <p><strong>Indices utilisés:</strong> {gameProgress.hintsUsed}</p>
                <p><strong>Accusations faites:</strong> {gameProgress.accusationsMade}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions de test */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preuves */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Preuves Disponibles</h2>
          <div className="space-y-2">
            {caseDefinition.evidence.map((evidence) => {
              const isDiscovered = gameProgress.evidenceDiscovered.includes(evidence.evidenceId);
              return (
                <div key={evidence.evidenceId} className="flex items-center justify-between p-2 border rounded">
                  <div className={isDiscovered ? 'text-green-600' : 'text-gray-600'}>
                    <strong>{evidence.name}</strong>
                    {isDiscovered && ' ✓'}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDiscoverEvidence(evidence.evidenceId)}
                      disabled={isDiscovered}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm disabled:bg-gray-300"
                    >
                      Découvrir
                    </button>
                    {evidence.requiresAnalysis && isDiscovered && (
                      <button
                        onClick={() => handleCompleteAnalysis(evidence.analysisType!, evidence.evidenceId)}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        Analyser
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suspects */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Suspects</h2>
          <div className="space-y-2">
            {caseDefinition.suspects.map((suspect) => {
              const hasBeenInterviewed = gameProgress.suspectInterviews.some(
                interview => interview.suspectId === suspect.suspectId
              );
              return (
                <div key={suspect.suspectId} className="flex items-center justify-between p-2 border rounded">
                  <div className={hasBeenInterviewed ? 'text-green-600' : 'text-gray-600'}>
                    <strong>{suspect.name}</strong> ({suspect.age} ans)
                    {hasBeenInterviewed && ' ✓'}
                  </div>
                  <button
                    onClick={() => handleConductInterview(suspect.suspectId)}
                    className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
                  >
                    Interroger
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions diverses */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleUseHint('general')}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Utiliser un Indice
          </button>
          
          <button
            onClick={() => resetProgress()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Recommencer
          </button>
        </div>
      </div>

      {/* Preuves découvertes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Preuves Découvertes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getDiscoveredEvidence().map((evidence) => (
            <div key={evidence.evidenceId} className="p-4 border rounded">
              <h3 className="font-semibold">{evidence.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{evidence.description}</p>
              <div className="text-xs text-gray-500">
                <p>Importance: {evidence.importance}</p>
                <p>Points: {evidence.pointValue}</p>
                {evidence.content && <p>Contenu: {evidence.content}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire d'accusation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Faire une Accusation</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Suspect accusé:</label>
            <select
              value={accusationForm.suspectId}
              onChange={(e) => setAccusationForm(prev => ({ ...prev, suspectId: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner un suspect</option>
              {caseDefinition.suspects.map((suspect) => (
                <option key={suspect.suspectId} value={suspect.suspectId}>
                  {suspect.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Motif:</label>
            <input
              type="text"
              value={accusationForm.motive}
              onChange={(e) => setAccusationForm(prev => ({ ...prev, motive: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Quel était le motif du crime ?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Méthode du crime:</label>
            <input
              type="text"
              value={accusationForm.methodOfCrime}
              onChange={(e) => setAccusationForm(prev => ({ ...prev, methodOfCrime: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Comment le crime a-t-il été commis ?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preuves à l'appui (IDs séparés par des virgules):</label>
            <input
              type="text"
              value={accusationForm.supportingEvidence}
              onChange={(e) => setAccusationForm(prev => ({ ...prev, supportingEvidence: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="evidence_001, evidence_002, ..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Raisonnement:</label>
            <textarea
              value={accusationForm.reasoning}
              onChange={(e) => setAccusationForm(prev => ({ ...prev, reasoning: e.target.value }))}
              className="w-full p-2 border rounded h-32"
              placeholder="Expliquez votre raisonnement et comment les preuves soutiennent votre accusation"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              {canAccuse.canSubmit ? (
                <span className="text-green-600">✓ Vous pouvez faire une accusation</span>
              ) : (
                <span className="text-red-600">✗ {canAccuse.reason}</span>
              )}
            </div>
            
            <button
              onClick={handleSubmitAccusation}
              disabled={!canAccuse.canSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded font-semibold disabled:bg-gray-300"
            >
              Soumettre l'Accusation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTester;
