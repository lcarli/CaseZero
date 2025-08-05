// Types pour les nouvelles structures JSON des cas
export interface CaseStructure {
  id: string;
  title: {
    pt: string;
    en: string;
    fr: string;
    es: string;
  };
  description: {
    pt: string;
    en: string;
    fr: string;
    es: string;
  };
  briefing: {
    pt: string;
    en: string;
    fr: string;
    es: string;
  };
  culprit: string | null;
  proof_id: string | string[] | null;
  available_analyses: AnalysisDefinition[];
  files?: CaseFile[];
  created_at?: string;
  difficulty?: number;
  estimated_time_minutes?: number;
  location?: string;
  tags?: string[];
  tutorial?: boolean;
}

export interface AnalysisDefinition {
  item_id: string;
  analysis_type: string;
  cost: number;
  time_hours: number;
  required_lab: string;
  description: {
    pt: string;
    en: string;
    fr: string;
    es: string;
  };
}

export interface CaseFile {
  id: string;
  name: {
    pt: string;
    en: string;
    fr: string;
    es: string;
  };
  type: string;
  path: string;
  requires_analysis?: boolean;
  accessible_from_start?: boolean;
  dependencies?: string[];
}

// Service pour les nouvelles structures JSON
export interface CaseStructureService {
  getCaseStructures(): Promise<string[]>;
  getCaseStructure(caseId: string): Promise<CaseStructure>;
  getCaseFiles(caseId: string): Promise<CaseFile[]>;
}
