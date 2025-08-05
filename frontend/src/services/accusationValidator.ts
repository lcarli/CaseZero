import { 
  CaseDefinition, 
  Accusation, 
  AccusationValidation, 
  GameProgress
} from '../types/case';

export class AccusationValidator {
  
  /**
   * Valide une accusation contre la solution du cas
   */
  static validateAccusation(
    accusation: Accusation,
    caseDefinition: CaseDefinition,
    gameProgress: GameProgress
  ): AccusationValidation {
    
    const validation: AccusationValidation = {
      isValid: false,
      isCorrect: false,
      score: 0,
      feedback: '',
      feedbackEn: '',
      correctCulprit: false,
      correctMotive: false,
      correctMethod: false,
      evidenceScore: 0,
      reasoningScore: 0,
      penalties: {
        hintsUsed: 0,
        timeExceeded: 0,
        incorrectAnalyses: 0
      },
      bonuses: {
        speedBonus: 0,
        thoroughness: 0,
        accurateAnalyses: 0
      }
    };

    try {
      // 1. Validation de base
      this.validateBasicRequirements(accusation, caseDefinition, gameProgress);
      
      // 2. Validation du coupable
      this.validateCulprit(accusation, caseDefinition, validation);
      
      // 3. Validation du motif
      this.validateMotive(accusation, caseDefinition, validation);
      
      // 4. Validation de la méthode
      this.validateMethod(accusation, caseDefinition, validation);
      
      // 5. Évaluation des preuves
      this.evaluateEvidence(accusation, caseDefinition, validation);
      
      // 6. Évaluation du raisonnement
      this.evaluateReasoning(accusation, caseDefinition, validation);
      
      // 7. Calcul des bonus et pénalités
      this.calculateBonusesAndPenalties(gameProgress, caseDefinition, validation);
      
      // 8. Calcul du score final
      this.calculateFinalScore(caseDefinition, validation);
      
      // 9. Génération du feedback
      this.generateFeedback(validation, caseDefinition);
      
      validation.isValid = true;
      validation.isCorrect = validation.correctCulprit && validation.correctMotive && validation.correctMethod;
      
    } catch (error) {
      validation.feedback = `Erreur de validation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
      validation.feedbackEn = `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    return validation;
  }

  /**
   * Valide les exigences de base pour faire une accusation
   */
  private static validateBasicRequirements(
    accusation: Accusation,
    caseDefinition: CaseDefinition,
    gameProgress: GameProgress
  ) {
    // Vérifier le minimum de preuves
    if (accusation.supportingEvidence.length < caseDefinition.validation.minimumEvidenceToAccuse) {
      throw new Error(`Au moins ${caseDefinition.validation.minimumEvidenceToAccuse} preuves sont requises pour faire une accusation`);
    }

    // Vérifier les preuves obligatoires
    const requiredEvidence = caseDefinition.validation.requiredEvidence;
    const missingRequired = requiredEvidence.filter(reqId => 
      !gameProgress.evidenceDiscovered.includes(reqId)
    );
    
    if (missingRequired.length > 0) {
      throw new Error(`Preuves obligatoires manquantes: ${missingRequired.join(', ')}`);
    }

    // Vérifier les analyses obligatoires
    const requiredAnalyses = caseDefinition.validation.requiredAnalyses;
    const missingAnalyses = requiredAnalyses.filter(analysis => 
      !gameProgress.analysesCompleted.includes(analysis)
    );
    
    if (missingAnalyses.length > 0) {
      throw new Error(`Analyses obligatoires manquantes: ${missingAnalyses.join(', ')}`);
    }

    // Vérifier le cooldown des accusations
    if (!caseDefinition.validation.allowMultipleAccusations && gameProgress.accusationsMade > 0) {
      throw new Error('Seule une accusation est autorisée pour ce cas');
    }
  }

  /**
   * Valide le coupable accusé
   */
  private static validateCulprit(
    accusation: Accusation,
    caseDefinition: CaseDefinition,
    validation: AccusationValidation
  ) {
    const accusedSuspect = caseDefinition.suspects.find(s => s.suspectId === accusation.suspectId);
    if (!accusedSuspect) {
      throw new Error(`Suspect ID ${accusation.suspectId} introuvable`);
    }

    validation.correctCulprit = accusation.suspectId === caseDefinition.solution.culprit;
  }

  /**
   * Valide le motif
   */
  private static validateMotive(
    accusation: Accusation,
    caseDefinition: CaseDefinition,
    validation: AccusationValidation
  ) {
    const solutionMotive = caseDefinition.solution.motive.toLowerCase();
    const accusedMotive = accusation.motive.toLowerCase();
    
    // Calcul de similarité simple (peut être amélioré avec des algorithmes plus sophistiqués)
    const similarity = this.calculateTextSimilarity(solutionMotive, accusedMotive);
    validation.correctMotive = similarity >= 0.7; // Seuil de 70% de similarité
  }

  /**
   * Valide la méthode du crime
   */
  private static validateMethod(
    accusation: Accusation,
    caseDefinition: CaseDefinition,
    validation: AccusationValidation
  ) {
    const solutionMethod = caseDefinition.solution.methodOfCrime.toLowerCase();
    const accusedMethod = accusation.methodOfCrime.toLowerCase();
    
    const similarity = this.calculateTextSimilarity(solutionMethod, accusedMethod);
    validation.correctMethod = similarity >= 0.7;
  }

  /**
   * Évalue la qualité des preuves présentées
   */
  private static evaluateEvidence(
    accusation: Accusation,
    caseDefinition: CaseDefinition,
    validation: AccusationValidation
  ) {
    const keyEvidence = caseDefinition.solution.keyEvidence;
    const supportingEvidence = accusation.supportingEvidence;
    
    // Points pour les preuves clés incluses
    const keyEvidenceIncluded = supportingEvidence.filter(id => keyEvidence.includes(id));
    const keyEvidenceScore = keyEvidenceIncluded.length * 20;
    
    // Points pour toutes les preuves pertinentes
    const evidenceScore = supportingEvidence.reduce((score, evidenceId) => {
      const evidence = caseDefinition.evidence.find(e => e.evidenceId === evidenceId);
      return score + (evidence?.pointValue || 0);
    }, 0);
    
    // Pénalité pour preuves non pertinentes
    const irrelevantEvidence = supportingEvidence.filter(id => !keyEvidence.includes(id));
    const irrelevantPenalty = irrelevantEvidence.length * 5;
    
    validation.evidenceScore = Math.max(0, keyEvidenceScore + evidenceScore - irrelevantPenalty);
  }

  /**
   * Évalue la qualité du raisonnement
   */
  private static evaluateReasoning(
    accusation: Accusation,
    caseDefinition: CaseDefinition,
    validation: AccusationValidation
  ) {
    const reasoning = accusation.reasoning.toLowerCase();
    const solution = caseDefinition.solution.explanation.toLowerCase();
    
    // Points de base pour avoir fourni un raisonnement
    let reasoningScore = reasoning.length > 50 ? 20 : 10;
    
    // Bonus pour similarité avec la solution
    const similarity = this.calculateTextSimilarity(reasoning, solution);
    reasoningScore += Math.floor(similarity * 30);
    
    // Bonus pour mentionner des preuves clés
    caseDefinition.solution.keyEvidence.forEach(evidenceId => {
      const evidence = caseDefinition.evidence.find(e => e.evidenceId === evidenceId);
      if (evidence && reasoning.includes(evidence.name.toLowerCase())) {
        reasoningScore += 10;
      }
    });
    
    validation.reasoningScore = reasoningScore;
  }

  /**
   * Calcule les bonus et pénalités
   */
  private static calculateBonusesAndPenalties(
    gameProgress: GameProgress,
    caseDefinition: CaseDefinition,
    validation: AccusationValidation
  ) {
    const timeSpent = gameProgress.timeSpentMinutes;
    const estimatedTime = caseDefinition.metadata.estimatedTimeMinutes;
    
    // Bonus de vitesse
    if (timeSpent <= estimatedTime * 0.75) {
      validation.bonuses.speedBonus = caseDefinition.scoring.timeBonus.fastCompletion;
    } else if (timeSpent <= estimatedTime) {
      validation.bonuses.speedBonus = caseDefinition.scoring.timeBonus.mediumCompletion;
    }
    
    // Bonus pour analyses précises
    const correctAnalyses = gameProgress.analysesCompleted.length;
    validation.bonuses.accurateAnalyses = correctAnalyses * caseDefinition.scoring.analysisPoints.correct;
    
    // Bonus de minutie (toutes les preuves importantes découvertes)
    const importantEvidence = caseDefinition.evidence.filter(e => e.importance === 'high' || e.importance === 'critical');
    const discoveredImportant = importantEvidence.filter(e => gameProgress.evidenceDiscovered.includes(e.evidenceId));
    if (discoveredImportant.length === importantEvidence.length) {
      validation.bonuses.thoroughness = 50;
    }
    
    // Pénalités
    validation.penalties.hintsUsed = gameProgress.hintsUsed * caseDefinition.scoring.hintsUsedPenalty;
    
    if (timeSpent > estimatedTime * 1.5) {
      validation.penalties.timeExceeded = 25;
    }
  }

  /**
   * Calcule le score final
   */
  private static calculateFinalScore(
    caseDefinition: CaseDefinition,
    validation: AccusationValidation
  ) {
    let score = 0;
    
    // Points d'accusation
    if (validation.correctCulprit) {
      score += caseDefinition.scoring.accusationPoints.correctCulprit;
    } else {
      score += caseDefinition.scoring.accusationPoints.incorrectAccusation;
    }
    
    if (validation.correctMotive) {
      score += caseDefinition.scoring.accusationPoints.correctMotive;
    }
    
    if (validation.correctMethod) {
      score += caseDefinition.scoring.accusationPoints.correctMethod;
    }
    
    // Ajouter les scores des preuves et du raisonnement
    score += validation.evidenceScore;
    score += validation.reasoningScore;
    
    // Ajouter les bonus
    score += validation.bonuses.speedBonus;
    score += validation.bonuses.thoroughness;
    score += validation.bonuses.accurateAnalyses;
    
    // Soustraire les pénalités
    score -= validation.penalties.hintsUsed;
    score -= validation.penalties.timeExceeded;
    score -= validation.penalties.incorrectAnalyses;
    
    validation.score = Math.max(0, score);
  }

  /**
   * Génère le feedback pour l'utilisateur
   */
  private static generateFeedback(
    validation: AccusationValidation,
    caseDefinition: CaseDefinition
  ) {
    const feedback: string[] = [];
    const feedbackEn: string[] = [];
    
    if (validation.isCorrect) {
      feedback.push('🎉 Félicitations ! Votre accusation est correcte !');
      feedbackEn.push('🎉 Congratulations! Your accusation is correct!');
    } else {
      feedback.push('❌ Votre accusation n\'est pas entièrement correcte.');
      feedbackEn.push('❌ Your accusation is not entirely correct.');
    }
    
    // Feedback spécifique
    if (!validation.correctCulprit) {
      feedback.push('• Le suspect accusé n\'est pas le vrai coupable.');
      feedbackEn.push('• The accused suspect is not the real culprit.');
    }
    
    if (!validation.correctMotive) {
      feedback.push('• Le motif proposé ne correspond pas à la réalité.');
      feedbackEn.push('• The proposed motive does not match reality.');
    }
    
    if (!validation.correctMethod) {
      feedback.push('• La méthode du crime décrite n\'est pas correcte.');
      feedbackEn.push('• The described crime method is not correct.');
    }
    
    // Feedback sur les preuves
    if (validation.evidenceScore < 50) {
      feedback.push('• Votre sélection de preuves pourrait être améliorée.');
      feedbackEn.push('• Your evidence selection could be improved.');
    } else {
      feedback.push('• Bonne sélection de preuves !');
      feedbackEn.push('• Good evidence selection!');
    }
    
    // Feedback sur le raisonnement
    if (validation.reasoningScore < 30) {
      feedback.push('• Votre raisonnement manque de détails ou de précision.');
      feedbackEn.push('• Your reasoning lacks detail or precision.');
    } else {
      feedback.push('• Votre raisonnement est bien structuré !');
      feedbackEn.push('• Your reasoning is well structured!');
    }
    
    // Information sur le score
    feedback.push(`\n📊 Score obtenu: ${validation.score}/${caseDefinition.scoring.maxScore}`);
    feedbackEn.push(`\n📊 Score obtained: ${validation.score}/${caseDefinition.scoring.maxScore}`);
    
    validation.feedback = feedback.join('\n');
    validation.feedbackEn = feedbackEn.join('\n');
  }

  /**
   * Calcule la similarité entre deux textes (méthode simple)
   */
  private static calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = new Set([...words1, ...words2]).size;
    
    return totalWords > 0 ? commonWords.length / totalWords : 0;
  }

  /**
   * Vérifie si une accusation peut être soumise
   */
  static canSubmitAccusation(
    gameProgress: GameProgress,
    caseDefinition: CaseDefinition
  ): { canSubmit: boolean; reason?: string } {
    
    // Vérifier le nombre d'accusations déjà faites
    if (!caseDefinition.validation.allowMultipleAccusations && gameProgress.accusationsMade > 0) {
      return {
        canSubmit: false,
        reason: 'Vous avez déjà fait une accusation pour ce cas'
      };
    }
    
    // Vérifier les preuves minimum
    if (gameProgress.evidenceDiscovered.length < caseDefinition.validation.minimumEvidenceToAccuse) {
      return {
        canSubmit: false,
        reason: `Vous devez découvrir au moins ${caseDefinition.validation.minimumEvidenceToAccuse} preuves avant de pouvoir accuser`
      };
    }
    
    // Vérifier les preuves obligatoires
    const missingRequired = caseDefinition.validation.requiredEvidence.filter(
      reqId => !gameProgress.evidenceDiscovered.includes(reqId)
    );
    
    if (missingRequired.length > 0) {
      return {
        canSubmit: false,
        reason: 'Certaines preuves importantes n\'ont pas encore été découvertes'
      };
    }
    
    return { canSubmit: true };
  }
}
