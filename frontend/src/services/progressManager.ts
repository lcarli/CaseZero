import { 
  GameProgress, 
  CaseDefinition, 
  GameAction, 
  AccusationValidation 
} from '../types/case';

export class ProgressManager {
  
  /**
   * Initialise une nouvelle progression de jeu
   */
  static initializeGameProgress(caseId: string): GameProgress {
    return {
      caseId,
      startTime: new Date(),
      timeSpentMinutes: 0,
      evidenceDiscovered: [],
      analysesCompleted: [],
      hintsUsed: 0,
      suspectInterviews: [],
      locations: [],
      accusationsMade: 0,
      currentScore: 0,
      actions: [],
      isCompleted: false,
      completionTime: null,
      finalScore: null
    };
  }

  /**
   * Met à jour le temps passé en jeu
   */
  static updateTimeSpent(progress: GameProgress): GameProgress {
    const now = new Date();
    const startTime = new Date(progress.startTime);
    const timeSpentMinutes = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
    
    return {
      ...progress,
      timeSpentMinutes
    };
  }

  /**
   * Enregistre la découverte d'une preuve
   */
  static discoverEvidence(
    progress: GameProgress, 
    evidenceId: string, 
    locationId?: string
  ): GameProgress {
    if (progress.evidenceDiscovered.includes(evidenceId)) {
      return progress; // Déjà découverte
    }

    const action: GameAction = {
      actionId: this.generateActionId(),
      type: 'evidence_discovered',
      timestamp: new Date(),
      details: {
        evidenceId,
        locationId
      }
    };

    return {
      ...progress,
      evidenceDiscovered: [...progress.evidenceDiscovered, evidenceId],
      actions: [...progress.actions, action]
    };
  }

  /**
   * Enregistre la complétion d'une analyse
   */
  static completeAnalysis(
    progress: GameProgress, 
    analysisType: string, 
    evidenceId: string,
    result: 'correct' | 'incorrect'
  ): GameProgress {
    const analysisKey = `${analysisType}_${evidenceId}`;
    
    if (progress.analysesCompleted.includes(analysisKey)) {
      return progress; // Déjà complétée
    }

    const action: GameAction = {
      actionId: this.generateActionId(),
      type: 'analysis_completed',
      timestamp: new Date(),
      details: {
        analysisType,
        evidenceId,
        result
      }
    };

    return {
      ...progress,
      analysesCompleted: [...progress.analysesCompleted, analysisKey],
      actions: [...progress.actions, action]
    };
  }

  /**
   * Enregistre l'utilisation d'un indice
   */
  static useHint(progress: GameProgress, hintType: string): GameProgress {
    const action: GameAction = {
      actionId: this.generateActionId(),
      type: 'hint_used',
      timestamp: new Date(),
      details: {
        hintType
      }
    };

    return {
      ...progress,
      hintsUsed: progress.hintsUsed + 1,
      actions: [...progress.actions, action]
    };
  }

  /**
   * Enregistre un entretien avec un suspect
   */
  static conductInterview(
    progress: GameProgress, 
    suspectId: string, 
    questionIds: string[]
  ): GameProgress {
    const existingInterview = progress.suspectInterviews.find(
      interview => interview.suspectId === suspectId
    );

    const action: GameAction = {
      actionId: this.generateActionId(),
      type: 'suspect_interviewed',
      timestamp: new Date(),
      details: {
        suspectId,
        questionIds,
        isFirstInterview: !existingInterview
      }
    };

    if (existingInterview) {
      // Mettre à jour l'entretien existant
      const updatedInterviews = progress.suspectInterviews.map(interview =>
        interview.suspectId === suspectId
          ? {
              ...interview,
              questionsAsked: [...new Set([...interview.questionsAsked, ...questionIds])],
              interviewCount: interview.interviewCount + 1
            }
          : interview
      );

      return {
        ...progress,
        suspectInterviews: updatedInterviews,
        actions: [...progress.actions, action]
      };
    } else {
      // Nouvel entretien
      const newInterview = {
        suspectId,
        questionsAsked: questionIds,
        interviewCount: 1
      };

      return {
        ...progress,
        suspectInterviews: [...progress.suspectInterviews, newInterview],
        actions: [...progress.actions, action]
      };
    }
  }

  /**
   * Enregistre la visite d'un lieu
   */
  static visitLocation(progress: GameProgress, locationId: string): GameProgress {
    if (progress.locations.includes(locationId)) {
      return progress; // Déjà visité
    }

    const action: GameAction = {
      actionId: this.generateActionId(),
      type: 'location_visited',
      timestamp: new Date(),
      details: {
        locationId
      }
    };

    return {
      ...progress,
      locations: [...progress.locations, locationId],
      actions: [...progress.actions, action]
    };
  }

  /**
   * Enregistre une accusation
   */
  static submitAccusation(
    progress: GameProgress,
    validation: AccusationValidation
  ): GameProgress {
    const action: GameAction = {
      actionId: this.generateActionId(),
      type: 'accusation_made',
      timestamp: new Date(),
      details: {
        isCorrect: validation.isCorrect,
        score: validation.score
      }
    };

    const isCompleted = validation.isCorrect;
    
    return {
      ...progress,
      accusationsMade: progress.accusationsMade + 1,
      currentScore: validation.score,
      actions: [...progress.actions, action],
      isCompleted,
      completionTime: isCompleted ? new Date() : null,
      finalScore: isCompleted ? validation.score : null
    };
  }

  /**
   * Calcule le score en temps réel
   */
  static calculateCurrentScore(
    progress: GameProgress,
    caseDefinition: CaseDefinition
  ): number {
    let score = 0;

    // Points pour les preuves découvertes
    progress.evidenceDiscovered.forEach(evidenceId => {
      const evidence = caseDefinition.evidence.find(e => e.evidenceId === evidenceId);
      if (evidence) {
        score += evidence.pointValue;
      }
    });

    // Points pour les analyses correctes
    const correctAnalyses = progress.actions.filter(
      action => action.type === 'analysis_completed' && 
                action.details?.result === 'correct'
    ).length;
    score += correctAnalyses * caseDefinition.scoring.analysisPoints.correct;

    // Pénalité pour les indices utilisés
    score -= progress.hintsUsed * caseDefinition.scoring.hintsUsedPenalty;

    // Pénalité pour le temps (si dépassé)
    const timeLimit = caseDefinition.metadata.estimatedTimeMinutes * 1.5;
    if (progress.timeSpentMinutes > timeLimit) {
      score -= 25;
    }

    return Math.max(0, score);
  }

  /**
   * Obtient les statistiques de progression
   */
  static getProgressStats(
    progress: GameProgress,
    caseDefinition: CaseDefinition
  ) {
    const totalEvidence = caseDefinition.evidence.length;
    const discoveredEvidence = progress.evidenceDiscovered.length;
    const evidencePercentage = Math.round((discoveredEvidence / totalEvidence) * 100);

    const totalSuspects = caseDefinition.suspects.length;
    const interviewedSuspects = progress.suspectInterviews.length;
    const suspectsPercentage = Math.round((interviewedSuspects / totalSuspects) * 100);

    const requiredEvidence = caseDefinition.validation.requiredEvidence;
    const discoveredRequired = requiredEvidence.filter(
      reqId => progress.evidenceDiscovered.includes(reqId)
    ).length;
    const requiredPercentage = Math.round((discoveredRequired / requiredEvidence.length) * 100);

    return {
      evidence: {
        discovered: discoveredEvidence,
        total: totalEvidence,
        percentage: evidencePercentage
      },
      suspects: {
        interviewed: interviewedSuspects,
        total: totalSuspects,
        percentage: suspectsPercentage
      },
      required: {
        completed: discoveredRequired,
        total: requiredEvidence.length,
        percentage: requiredPercentage
      },
      timeSpent: progress.timeSpentMinutes,
      estimatedTime: caseDefinition.metadata.estimatedTimeMinutes,
      currentScore: this.calculateCurrentScore(progress, caseDefinition),
      canAccuse: discoveredRequired === requiredEvidence.length &&
                 discoveredEvidence >= caseDefinition.validation.minimumEvidenceToAccuse
    };
  }

  /**
   * Sauvegarde la progression (à implémenter selon le système de stockage choisi)
   */
  static async saveProgress(progress: GameProgress): Promise<void> {
    // Pour l'instant, utilisons localStorage
    // En production, cela pourrait être une API backend
    try {
      const key = `case_progress_${progress.caseId}`;
      localStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la progression:', error);
      throw new Error('Impossible de sauvegarder la progression');
    }
  }

  /**
   * Charge la progression depuis le stockage
   */
  static async loadProgress(caseId: string): Promise<GameProgress | null> {
    try {
      const key = `case_progress_${caseId}`;
      const stored = localStorage.getItem(key);
      
      if (!stored) {
        return null;
      }

      const progress = JSON.parse(stored) as GameProgress;
      
      // Convertir les dates depuis les chaînes JSON
      progress.startTime = new Date(progress.startTime);
      if (progress.completionTime) {
        progress.completionTime = new Date(progress.completionTime);
      }
      progress.actions = progress.actions.map(action => ({
        ...action,
        timestamp: new Date(action.timestamp)
      }));

      return progress;
    } catch (error) {
      console.error('Erreur lors du chargement de la progression:', error);
      return null;
    }
  }

  /**
   * Supprime la progression sauvegardée
   */
  static async clearProgress(caseId: string): Promise<void> {
    try {
      const key = `case_progress_${caseId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression de la progression:', error);
    }
  }

  /**
   * Génère un ID unique pour les actions
   */
  private static generateActionId(): string {
    return `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Obtient l'historique des actions avec filtrage
   */
  static getActionHistory(
    progress: GameProgress,
    actionType?: GameAction['type'],
    limit?: number
  ): GameAction[] {
    let actions = [...progress.actions];

    if (actionType) {
      actions = actions.filter(action => action.type === actionType);
    }

    // Trier par timestamp décroissant
    actions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (limit) {
      actions = actions.slice(0, limit);
    }

    return actions;
  }

  /**
   * Vérifie si certaines conditions de progression sont remplies
   */
  static checkProgressMilestones(
    progress: GameProgress,
    caseDefinition: CaseDefinition
  ): { 
    firstEvidenceFound: boolean;
    firstSuspectInterviewed: boolean;
    halfEvidenceDiscovered: boolean;
    allSuspectsInterviewed: boolean;
    readyToAccuse: boolean;
  } {
    const stats = this.getProgressStats(progress, caseDefinition);
    
    return {
      firstEvidenceFound: progress.evidenceDiscovered.length > 0,
      firstSuspectInterviewed: progress.suspectInterviews.length > 0,
      halfEvidenceDiscovered: stats.evidence.percentage >= 50,
      allSuspectsInterviewed: stats.suspects.percentage >= 100,
      readyToAccuse: stats.canAccuse
    };
  }
}
