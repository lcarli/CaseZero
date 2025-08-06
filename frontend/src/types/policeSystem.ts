export type PoliceModuleType = 
  | 'briefing' 
  | 'evidence' 
  | 'notes' 
  | 'analysis' 
  | 'files' 
  | 'timeline' 
  | 'suspects'
  | 'timesystem';

export interface PoliceSystemModule {
  id: PoliceModuleType;
  label: string;
  icon: JSX.Element;
  badge?: number;
  isActive?: boolean;
}

// Resultado de análise forense
export interface AnalysisResult {
  id: string;
  evidenceId: string;
  analysisType: string;
  findings: string[];
  confidence: number; // 0-1
  technician: string;
  completedAt: number;
  additionalData?: Record<string, any>;
}

// Sistema temporal do jogo
export interface GameTimeSystem {
  // Tempo atual do jogo (timestamp)
  gameTime: number;
  // Velocidade do tempo (multiplicador em relação ao tempo real)
  timeSpeed: number;
  // Se o tempo está pausado
  isPaused: boolean;
  // Timestamp de quando o jogo começou
  gameStartTime: number;
  // Timestamp real de quando iniciou
  realStartTime: number;
}

// Análise pendente com tempo
export interface TimedAnalysis {
  id: string;
  evidenceId: string;
  analysisType: string;
  startTime: number;
  duration: number; // em milissegundos do jogo
  isCompleted: boolean;
  result?: AnalysisResult;
}

// State do sistema policial
export interface PoliceSystemState {
  caseId: string;
  investigatorName: string;
  activeModule: PoliceModuleType;
  systemStatus: {
    database: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
    forensics: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
    network: 'SECURE' | 'UNSECURE' | 'MAINTENANCE';
  };
  examinedEvidences: Set<string>;
  pendingAnalyses: Set<string>;
  investigationNotes: string;
  events: PoliceSystemEvent[];
  // Sistema temporal
  gameTime: GameTimeSystem;
  timedAnalyses: TimedAnalysis[];
}

export interface PoliceEvidence {
  id: string;
  name: string;
  description: string;
  type: string;
  isExamined: boolean;
  requiresAnalysis: boolean;
  analysisType?: string;
}

export interface PoliceAnalysisRequest {
  evidenceId: string;
  analysisType: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedTime: number;
  cost: number;
}

export interface PoliceSystemEvent {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  module: PoliceModuleType;
}

// Ações disponíveis no sistema policial
export interface PoliceSystemActions {
  setActiveModule: (moduleId: PoliceModuleType) => void;
  examineEvidence: (evidenceId: string) => void;
  updateNotes: (notes: string) => void;
  addEvent: (event: Omit<PoliceSystemEvent, 'id' | 'timestamp'>) => void;
  // Ações temporais
  pauseTime: () => void;
  resumeTime: () => void;
  setTimeSpeed: (speed: number) => void;
  startAnalysis: (evidenceId: string, analysisType: string, duration: number) => void;
  checkCompletedAnalyses: () => TimedAnalysis[];
  getCurrentGameTime: () => number;
  formatGameTime: (timestamp?: number) => string;
}
