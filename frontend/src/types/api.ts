// Types pour l'authentification
export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  avatar: string | null;
  badge: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
}

// Types pour les affaires
export interface Case {
  caseId: number;
  caseNumber: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: number;
  difficulty: number;
  status: number;
  estimatedTimeMinutes: number;
  isPublished: boolean;
  isTutorial: boolean;
  location: string;
  locationEn: string;
  createdAt: string;
  publishedAt: string | null;
  lastModifiedAt: string | null;
  createdBy: string;
  tags: string;
  solution: string;
  solutionEn: string;
  filePath: string | null;
}

// Types pour les preuves
export interface Evidence {
  evidenceId: number;
  caseId: number;
  evidenceNumber: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  type: number;
  category: number;
  location: string;
  locationEn: string;
  collectedAt: string;
  collectedBy: string;
  collectedByEn: string;
  filePath: string | null;
  content: string | null;
  contentEn: string | null;
  isAvailable: boolean;
  requiresAnalysis: boolean;
  tags: string;
  caseNumber: string;
  caseTitle: string;
}

// Types pour les analyses
export interface Analysis {
  analysisId: number;
  evidenceId: number;
  analyzedBy: number;
  analyzedAt: string;
  status: number;
  results: string;
  resultsEn: string;
  notes: string;
  notesEn: string;
  confidenceLevel: number;
  tags: string;
  evidenceName: string;
  analyzerName: string;
}

// Types pour les sessions d'investigation
export interface InvestigationSession {
  sessionId: number;
  caseId: number;
  userId: number;
  startedAt: string;
  completedAt: string | null;
  status: number;
  progressPercentage: number;
  currentStep: number;
  totalSteps: number;
  score: number;
  hintsUsed: number;
  notes: string;
  lastAction: string;
  lastActionAt: string;
  caseTitle: string;
  userName: string;
  userBadge: string;
}

// Types pour les erreurs API
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
