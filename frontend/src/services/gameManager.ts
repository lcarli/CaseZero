import { CaseParser } from './caseParser';
import { AccusationValidator } from './accusationValidator';
import { ProgressManager } from './progressManager';
import { 
  CaseDefinition, 
  GameProgress, 
  Accusation, 
  AccusationValidation 
} from '../types/case';

export class GameManager {
  private caseDefinition: CaseDefinition | null = null;
  private gameProgress: GameProgress | null = null;

  /**
   * Initialise un nouveau jeu avec un cas
   */
  async initializeGame(caseData: any, caseId?: string): Promise<GameProgress> {
    try {
      // Parser et valider le cas
      this.caseDefinition = CaseParser.parseCase(caseData);
      
      // Utiliser l'ID fourni ou générer un ID unique
      const finalCaseId = caseId || this.caseDefinition.caseId || this.generateCaseId();
      
      // Charger une progression existante ou créer une nouvelle
      let progress = await ProgressManager.loadProgress(finalCaseId);
      
      if (!progress) {
        progress = ProgressManager.initializeGameProgress(finalCaseId);
        await ProgressManager.saveProgress(progress);
      }
      
      this.gameProgress = progress;
      return progress;
      
    } catch (error) {
      throw new Error(`Erreur lors de l'initialisation du jeu: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Charge un jeu existant
   */
  async loadGame(caseId: string, caseData: any): Promise<GameProgress | null> {
    try {
      this.caseDefinition = CaseParser.parseCase(caseData);
      this.gameProgress = await ProgressManager.loadProgress(caseId);
      
      if (this.gameProgress) {
        // Mettre à jour le temps passé
        this.gameProgress = ProgressManager.updateTimeSpent(this.gameProgress);
        await ProgressManager.saveProgress(this.gameProgress);
      }
      
      return this.gameProgress;
    } catch (error) {
      console.error('Erreur lors du chargement du jeu:', error);
      return null;
    }
  }

  /**
   * Découvre une preuve
   */
  async discoverEvidence(evidenceId: string, locationId?: string): Promise<GameProgress> {
    this.ensureGameInitialized();
    
    // Vérifier que la preuve existe
    const evidence = this.caseDefinition!.evidence.find(e => e.evidenceId === evidenceId);
    if (!evidence) {
      throw new Error(`Preuve ${evidenceId} introuvable`);
    }
    
    this.gameProgress = ProgressManager.discoverEvidence(
      this.gameProgress!, 
      evidenceId, 
      locationId
    );
    
    // Mettre à jour le temps et sauvegarder
    this.gameProgress = ProgressManager.updateTimeSpent(this.gameProgress);
    await ProgressManager.saveProgress(this.gameProgress);
    
    return this.gameProgress;
  }

  /**
   * Complète une analyse
   */
  async completeAnalysis(
    analysisType: string, 
    evidenceId: string, 
    result: 'correct' | 'incorrect'
  ): Promise<GameProgress> {
    this.ensureGameInitialized();
    
    this.gameProgress = ProgressManager.completeAnalysis(
      this.gameProgress!,
      analysisType,
      evidenceId,
      result
    );
    
    this.gameProgress = ProgressManager.updateTimeSpent(this.gameProgress);
    await ProgressManager.saveProgress(this.gameProgress);
    
    return this.gameProgress;
  }

  /**
   * Utilise un indice
   */
  async useHint(hintType: string): Promise<GameProgress> {
    this.ensureGameInitialized();
    
    this.gameProgress = ProgressManager.useHint(this.gameProgress!, hintType);
    this.gameProgress = ProgressManager.updateTimeSpent(this.gameProgress);
    await ProgressManager.saveProgress(this.gameProgress);
    
    return this.gameProgress;
  }

  /**
   * Conduit un entretien avec un suspect
   */
  async conductInterview(suspectId: string, questionIds: string[]): Promise<GameProgress> {
    this.ensureGameInitialized();
    
    // Vérifier que le suspect existe
    const suspect = this.caseDefinition!.suspects.find(s => s.suspectId === suspectId);
    if (!suspect) {
      throw new Error(`Suspect ${suspectId} introuvable`);
    }
    
    this.gameProgress = ProgressManager.conductInterview(
      this.gameProgress!,
      suspectId,
      questionIds
    );
    
    this.gameProgress = ProgressManager.updateTimeSpent(this.gameProgress);
    await ProgressManager.saveProgress(this.gameProgress);
    
    return this.gameProgress;
  }

  /**
   * Visite un lieu
   */
  async visitLocation(locationId: string): Promise<GameProgress> {
    this.ensureGameInitialized();
    
    this.gameProgress = ProgressManager.visitLocation(this.gameProgress!, locationId);
    this.gameProgress = ProgressManager.updateTimeSpent(this.gameProgress);
    await ProgressManager.saveProgress(this.gameProgress);
    
    return this.gameProgress;
  }

  /**
   * Vérifie si une accusation peut être soumise
   */
  canSubmitAccusation(): { canSubmit: boolean; reason?: string } {
    this.ensureGameInitialized();
    
    return AccusationValidator.canSubmitAccusation(
      this.gameProgress!,
      this.caseDefinition!
    );
  }

  /**
   * Soumet une accusation
   */
  async submitAccusation(accusation: Omit<Accusation, 'accusationId' | 'caseId' | 'submittedAt'>): Promise<{
    validation: AccusationValidation;
    progress: GameProgress;
  }> {
    this.ensureGameInitialized();
    
    // Vérifier si l'accusation peut être soumise
    const canSubmit = this.canSubmitAccusation();
    if (!canSubmit.canSubmit) {
      throw new Error(canSubmit.reason || 'Accusation non autorisée');
    }
    
    // Créer l'accusation complète
    const fullAccusation: Accusation = {
      ...accusation,
      accusationId: this.generateAccusationId(),
      caseId: this.gameProgress!.caseId,
      submittedAt: new Date()
    };
    
    // Mettre à jour le temps avant validation
    this.gameProgress = ProgressManager.updateTimeSpent(this.gameProgress!);
    
    // Valider l'accusation
    const validation = AccusationValidator.validateAccusation(
      fullAccusation,
      this.caseDefinition!,
      this.gameProgress
    );
    
    // Mettre à jour la progression
    this.gameProgress = ProgressManager.submitAccusation(this.gameProgress, validation);
    await ProgressManager.saveProgress(this.gameProgress);
    
    return { validation, progress: this.gameProgress };
  }

  /**
   * Obtient les statistiques de progression
   */
  getProgressStats() {
    this.ensureGameInitialized();
    
    return ProgressManager.getProgressStats(this.gameProgress!, this.caseDefinition!);
  }

  /**
   * Obtient l'historique des actions
   */
  getActionHistory(actionType?: string, limit?: number) {
    this.ensureGameInitialized();
    
    return ProgressManager.getActionHistory(
      this.gameProgress!,
      actionType as any,
      limit
    );
  }

  /**
   * Vérifie les jalons de progression
   */
  checkProgressMilestones() {
    this.ensureGameInitialized();
    
    return ProgressManager.checkProgressMilestones(
      this.gameProgress!,
      this.caseDefinition!
    );
  }

  /**
   * Obtient les preuves disponibles à un endroit
   */
  getEvidenceAtLocation(locationId: string) {
    this.ensureGameInitialized();
    
    return this.caseDefinition!.evidence.filter(
      evidence => evidence.location === locationId
    );
  }

  /**
   * Obtient les informations d'un suspect
   */
  getSuspectInfo(suspectId: string) {
    this.ensureGameInitialized();
    
    return this.caseDefinition!.suspects.find(s => s.suspectId === suspectId);
  }

  /**
   * Obtient toutes les preuves découvertes
   */
  getDiscoveredEvidence() {
    this.ensureGameInitialized();
    
    return this.caseDefinition!.evidence.filter(
      evidence => this.gameProgress!.evidenceDiscovered.includes(evidence.evidenceId)
    );
  }

  /**
   * Calcule le score actuel
   */
  getCurrentScore(): number {
    this.ensureGameInitialized();
    
    return ProgressManager.calculateCurrentScore(
      this.gameProgress!,
      this.caseDefinition!
    );
  }

  /**
   * Remet à zéro la progression
   */
  async resetProgress(): Promise<GameProgress> {
    this.ensureGameInitialized();
    
    await ProgressManager.clearProgress(this.gameProgress!.caseId);
    this.gameProgress = ProgressManager.initializeGameProgress(this.gameProgress!.caseId);
    await ProgressManager.saveProgress(this.gameProgress);
    
    return this.gameProgress;
  }

  /**
   * Obtient les données du cas actuel
   */
  getCaseDefinition(): CaseDefinition | null {
    return this.caseDefinition;
  }

  /**
   * Obtient la progression actuelle
   */
  getGameProgress(): GameProgress | null {
    return this.gameProgress;
  }

  /**
   * Vérifie que le jeu est initialisé
   */
  private ensureGameInitialized(): void {
    if (!this.caseDefinition || !this.gameProgress) {
      throw new Error('Le jeu n\'est pas initialisé. Appelez initializeGame() d\'abord.');
    }
  }

  /**
   * Génère un ID de cas unique
   */
  private generateCaseId(): string {
    return `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Génère un ID d'accusation unique
   */
  private generateAccusationId(): string {
    return `accusation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
