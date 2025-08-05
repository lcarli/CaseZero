import { useState, useEffect, useCallback } from 'react';
import { GameManager } from '../services/gameManager';
import { 
  CaseDefinition, 
  GameProgress, 
  Accusation, 
  AccusationValidation 
} from '../types/case';

export interface UseGameReturn {
  // État du jeu
  gameManager: GameManager | null;
  caseDefinition: CaseDefinition | null;
  gameProgress: GameProgress | null;
  isLoading: boolean;
  error: string | null;

  // Actions du jeu
  initializeGame: (caseData: any, caseId?: string) => Promise<void>;
  loadGame: (caseId: string, caseData: any) => Promise<void>;
  discoverEvidence: (evidenceId: string, locationId?: string) => Promise<void>;
  completeAnalysis: (analysisType: string, evidenceId: string, result: 'correct' | 'incorrect') => Promise<void>;
  useHint: (hintType: string) => Promise<void>;
  conductInterview: (suspectId: string, questionIds: string[]) => Promise<void>;
  visitLocation: (locationId: string) => Promise<void>;
  submitAccusation: (accusation: Omit<Accusation, 'accusationId' | 'caseId' | 'submittedAt'>) => Promise<AccusationValidation | null>;
  resetProgress: () => Promise<void>;

  // Utilitaires
  canSubmitAccusation: () => { canSubmit: boolean; reason?: string };
  getProgressStats: () => any;
  getActionHistory: (actionType?: string, limit?: number) => any[];
  checkProgressMilestones: () => any;
  getEvidenceAtLocation: (locationId: string) => any[];
  getSuspectInfo: (suspectId: string) => any;
  getDiscoveredEvidence: () => any[];
  getCurrentScore: () => number;
}

export function useGame(): UseGameReturn {
  const [gameManager, setGameManager] = useState<GameManager | null>(null);
  const [caseDefinition, setCaseDefinition] = useState<CaseDefinition | null>(null);
  const [gameProgress, setGameProgress] = useState<GameProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialise un nouveau jeu
  const initializeGame = useCallback(async (caseData: any, caseId?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const manager = new GameManager();
      const progress = await manager.initializeGame(caseData, caseId);
      
      setGameManager(manager);
      setCaseDefinition(manager.getCaseDefinition());
      setGameProgress(progress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'initialisation du jeu';
      setError(errorMessage);
      console.error('Erreur initialisation jeu:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Charge un jeu existant
  const loadGame = useCallback(async (caseId: string, caseData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const manager = new GameManager();
      const progress = await manager.loadGame(caseId, caseData);
      
      setGameManager(manager);
      setCaseDefinition(manager.getCaseDefinition());
      setGameProgress(progress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement du jeu';
      setError(errorMessage);
      console.error('Erreur chargement jeu:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Met à jour la progression locale après une action
  const updateLocalProgress = useCallback((newProgress: GameProgress) => {
    setGameProgress(newProgress);
  }, []);

  // Découvre une preuve
  const discoverEvidence = useCallback(async (evidenceId: string, locationId?: string) => {
    if (!gameManager) return;
    
    try {
      const newProgress = await gameManager.discoverEvidence(evidenceId, locationId);
      updateLocalProgress(newProgress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la découverte de preuve';
      setError(errorMessage);
      console.error('Erreur découverte preuve:', err);
    }
  }, [gameManager, updateLocalProgress]);

  // Complète une analyse
  const completeAnalysis = useCallback(async (
    analysisType: string, 
    evidenceId: string, 
    result: 'correct' | 'incorrect'
  ) => {
    if (!gameManager) return;
    
    try {
      const newProgress = await gameManager.completeAnalysis(analysisType, evidenceId, result);
      updateLocalProgress(newProgress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'analyse';
      setError(errorMessage);
      console.error('Erreur analyse:', err);
    }
  }, [gameManager, updateLocalProgress]);

  // Utilise un indice
  const useHint = useCallback(async (hintType: string) => {
    if (!gameManager) return;
    
    try {
      const newProgress = await gameManager.useHint(hintType);
      updateLocalProgress(newProgress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'utilisation de l\'indice';
      setError(errorMessage);
      console.error('Erreur indice:', err);
    }
  }, [gameManager, updateLocalProgress]);

  // Conduit un entretien
  const conductInterview = useCallback(async (suspectId: string, questionIds: string[]) => {
    if (!gameManager) return;
    
    try {
      const newProgress = await gameManager.conductInterview(suspectId, questionIds);
      updateLocalProgress(newProgress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'entretien';
      setError(errorMessage);
      console.error('Erreur entretien:', err);
    }
  }, [gameManager, updateLocalProgress]);

  // Visite un lieu
  const visitLocation = useCallback(async (locationId: string) => {
    if (!gameManager) return;
    
    try {
      const newProgress = await gameManager.visitLocation(locationId);
      updateLocalProgress(newProgress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la visite du lieu';
      setError(errorMessage);
      console.error('Erreur visite lieu:', err);
    }
  }, [gameManager, updateLocalProgress]);

  // Soumet une accusation
  const submitAccusation = useCallback(async (
    accusation: Omit<Accusation, 'accusationId' | 'caseId' | 'submittedAt'>
  ): Promise<AccusationValidation | null> => {
    if (!gameManager) return null;
    
    try {
      const result = await gameManager.submitAccusation(accusation);
      updateLocalProgress(result.progress);
      return result.validation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'accusation';
      setError(errorMessage);
      console.error('Erreur accusation:', err);
      return null;
    }
  }, [gameManager, updateLocalProgress]);

  // Remet à zéro la progression
  const resetProgress = useCallback(async () => {
    if (!gameManager) return;
    
    try {
      const newProgress = await gameManager.resetProgress();
      updateLocalProgress(newProgress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la remise à zéro';
      setError(errorMessage);
      console.error('Erreur reset:', err);
    }
  }, [gameManager, updateLocalProgress]);

  // Utilitaires
  const canSubmitAccusation = useCallback(() => {
    if (!gameManager) return { canSubmit: false, reason: 'Jeu non initialisé' };
    return gameManager.canSubmitAccusation();
  }, [gameManager]);

  const getProgressStats = useCallback(() => {
    if (!gameManager) return null;
    return gameManager.getProgressStats();
  }, [gameManager]);

  const getActionHistory = useCallback((actionType?: string, limit?: number) => {
    if (!gameManager) return [];
    return gameManager.getActionHistory(actionType, limit);
  }, [gameManager]);

  const checkProgressMilestones = useCallback(() => {
    if (!gameManager) return null;
    return gameManager.checkProgressMilestones();
  }, [gameManager]);

  const getEvidenceAtLocation = useCallback((locationId: string) => {
    if (!gameManager) return [];
    return gameManager.getEvidenceAtLocation(locationId);
  }, [gameManager]);

  const getSuspectInfo = useCallback((suspectId: string) => {
    if (!gameManager) return null;
    return gameManager.getSuspectInfo(suspectId);
  }, [gameManager]);

  const getDiscoveredEvidence = useCallback(() => {
    if (!gameManager) return [];
    return gameManager.getDiscoveredEvidence();
  }, [gameManager]);

  const getCurrentScore = useCallback(() => {
    if (!gameManager) return 0;
    return gameManager.getCurrentScore();
  }, [gameManager]);

  // Effet pour nettoyer les erreurs au bout d'un certain temps
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // Efface l'erreur après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    // État
    gameManager,
    caseDefinition,
    gameProgress,
    isLoading,
    error,

    // Actions
    initializeGame,
    loadGame,
    discoverEvidence,
    completeAnalysis,
    useHint,
    conductInterview,
    visitLocation,
    submitAccusation,
    resetProgress,

    // Utilitaires
    canSubmitAccusation,
    getProgressStats,
    getActionHistory,
    checkProgressMilestones,
    getEvidenceAtLocation,
    getSuspectInfo,
    getDiscoveredEvidence,
    getCurrentScore
  };
}
