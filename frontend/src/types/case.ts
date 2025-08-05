// Types pour la logique de cas et validation
export interface CaseDefinition {
  caseId: string;
  metadata: CaseMetadata;
  evidence: EvidenceDefinition[];
  suspects: SuspectDefinition[];
  solution: CaseSolution;
  scoring: ScoringRules;
  validation: ValidationRules;
}

export interface CaseMetadata {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  difficulty: number;
  estimatedTimeMinutes: number;
  tags: string[];
  location: string;
  locationEn: string;
  dateOfCrime: string;
  type: 'homicide' | 'theft' | 'fraud' | 'drug' | 'cybercrime' | 'other';
  tutorial: boolean;
}

export interface EvidenceDefinition {
  evidenceId: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  type: string;
  category: string;
  location: string;
  locationEn: string;
  collectedAt: string;
  collectedBy: string;
  isAvailable: boolean;
  requiresAnalysis: boolean;
  analysisType?: string;
  filePath?: string;
  content?: string;
  contentEn?: string;
  tags: string[];
  importance: 'low' | 'medium' | 'high' | 'critical';
  pointValue: number;
  hints?: string[];
  hintsEn?: string[];
}

export interface SuspectDefinition {
  suspectId: string;
  name: string;
  age: number;
  description: string;
  descriptionEn: string;
  alibi: string;
  alibiEn: string;
  motive?: string;
  motiveEn?: string;
  relationship: string;
  relationshipEn: string;
  photo?: string;
  isGuilty: boolean;
  evidenceConnections: string[];
  backgroundInfo: string;
  backgroundInfoEn: string;
}

export interface CaseSolution {
  culprit: string; // suspectId
  motive: string;
  motiveEn: string;
  methodOfCrime: string;
  methodOfCrimeEn: string;
  keyEvidence: string[];
  timeline: SolutionTimelineEvent[];
  explanation: string;
  explanationEn: string;
}

export interface SolutionTimelineEvent {
  time: string;
  event: string;
  eventEn: string;
  location: string;
  evidenceIds?: string[];
}

export interface ScoringRules {
  maxScore: number;
  evidencePoints: {
    [evidenceId: string]: number;
  };
  analysisPoints: {
    correct: number;
    incorrect: number;
  };
  accusationPoints: {
    correctCulprit: number;
    correctMotive: number;
    correctMethod: number;
    incorrectAccusation: number;
  };
  timeBonus: {
    fastCompletion: number;
    mediumCompletion: number;
  };
  hintsUsedPenalty: number;
}

export interface ValidationRules {
  requiredEvidence: string[];
  requiredAnalyses: string[];
  minimumEvidenceToAccuse: number;
  allowMultipleAccusations: boolean;
  accusationCooldownMinutes: number;
}

// Types pour les accusations et validation
export interface Accusation {
  accusationId: string;
  caseId: string;
  suspectId: string;
  motive: string;
  methodOfCrime: string;
  supportingEvidence: string[];
  reasoning: string;
  submittedAt: Date;
  isCorrect?: boolean;
  score?: number;
  feedback?: string;
  feedbackEn?: string;
}

export interface AccusationValidation {
  isValid: boolean;
  isCorrect: boolean;
  score: number;
  feedback: string;
  feedbackEn: string;
  correctCulprit: boolean;
  correctMotive: boolean;
  correctMethod: boolean;
  evidenceScore: number;
  reasoningScore: number;
  penalties: {
    hintsUsed: number;
    timeExceeded: number;
    incorrectAnalyses: number;
  };
  bonuses: {
    speedBonus: number;
    thoroughness: number;
    accurateAnalyses: number;
  };
}

// Types pour le scoring
export interface ScoreCalculation {
  baseScore: number;
  evidenceScore: number;
  analysisScore: number;
  accusationScore: number;
  timeBonus: number;
  penalties: number;
  finalScore: number;
  maxPossibleScore: number;
  percentage: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
}

export interface GameProgress {
  caseId: string;
  startTime: Date;
  timeSpentMinutes: number;
  evidenceDiscovered: string[];
  analysesCompleted: string[];
  hintsUsed: number;
  suspectInterviews: {
    suspectId: string;
    questionsAsked: string[];
    interviewCount: number;
  }[];
  locations: string[];
  accusationsMade: number;
  currentScore: number;
  actions: GameAction[];
  isCompleted: boolean;
  completionTime: Date | null;
  finalScore: number | null;
}

export interface GameAction {
  actionId: string;
  type: 'evidence_discovered' | 'analysis_completed' | 'hint_used' | 'accusation_made' | 'suspect_interviewed' | 'location_visited';
  timestamp: Date;
  details?: {
    evidenceId?: string;
    locationId?: string;
    analysisType?: string;
    result?: 'correct' | 'incorrect';
    hintType?: string;
    suspectId?: string;
    questionIds?: string[];
    isFirstInterview?: boolean;
    isCorrect?: boolean;
    score?: number;
  };
}
