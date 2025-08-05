import { Case } from '../types/api';
import { CaseStructure } from '../types/caseStructures';

/**
 * Adaptateur pour convertir les structures JSON en format Case compatible
 */
export class CaseStructureAdapter {
  /**
   * Convertit une CaseStructure en Case pour compatibilité avec l'UI existante
   */
  static toCaseFormat(structure: CaseStructure, index: number = 1): Case {
    // Déterminer la langue à utiliser (priorité: fr, pt, en, es)
    const getLocalizedText = (textObj: any): string => {
      return textObj.fr || textObj.pt || textObj.en || textObj.es || '';
    };

    const getLocalizedTextEn = (textObj: any): string => {
      return textObj.en || textObj.fr || textObj.pt || textObj.es || '';
    };

    // Déterminer la difficulté
    let difficulty = structure.difficulty || 2; // Défaut: facile
    if (structure.tutorial) {
      difficulty = 1; // Tutorial
    }

    // Déterminer le type de cas basé sur les tags ou le culprit
    let caseType = 6; // Autre par défaut
    if (structure.tags) {
      if (structure.tags.includes('theft') || structure.tags.includes('vol')) caseType = 2;
      if (structure.tags.includes('murder') || structure.tags.includes('homicide')) caseType = 1;
      if (structure.tags.includes('fraud') || structure.tags.includes('fraude')) caseType = 3;
      if (structure.tags.includes('drug') || structure.tags.includes('drogue')) caseType = 4;
      if (structure.tags.includes('cyber') || structure.tags.includes('digital')) caseType = 5;
    }

    return {
      caseId: index, // Utiliser un index numérique pour compatibilité
      caseNumber: `CASE-JSON-${structure.id.toUpperCase()}`,
      title: getLocalizedText(structure.title),
      titleEn: getLocalizedTextEn(structure.title),
      description: getLocalizedText(structure.description),
      descriptionEn: getLocalizedTextEn(structure.description),
      type: caseType,
      difficulty: difficulty,
      status: 1, // Ouvert par défaut
      estimatedTimeMinutes: structure.estimated_time_minutes || 60,
      isPublished: true, // Les cas JSON sont considérés comme publiés
      isTutorial: structure.tutorial || false,
      location: structure.location || getLocalizedText(structure.title),
      locationEn: structure.location || getLocalizedTextEn(structure.title),
      createdAt: structure.created_at || new Date().toISOString(),
      publishedAt: structure.created_at || new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      createdBy: 'system',
      tags: structure.tags ? structure.tags.join(', ') : '',
      solution: structure.culprit || '',
      solutionEn: structure.culprit || '',
      filePath: `/cases/${structure.id}/info.json`
    };
  }

  /**
   * Génère un ID numérique à partir d'un string ID
   */
  static generateNumericId(stringId: string): number {
    let hash = 0;
    for (let i = 0; i < stringId.length; i++) {
      const char = stringId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Trouve un cas par son ID string original
   */
  static findOriginalId(cases: CaseStructure[], numericId: number): string | null {
    for (const caseStruct of cases) {
      if (this.generateNumericId(caseStruct.id) === numericId) {
        return caseStruct.id;
      }
    }
    return null;
  }
}
