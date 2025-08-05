import { CaseDefinition, EvidenceDefinition, SuspectDefinition, CaseSolution } from '../types/case';

export class CaseParser {
  /**
   * Parse un fichier JSON de cas et valide sa structure
   */
  static parseCase(data: any): CaseDefinition {
    // Validation de base
    if (!data || typeof data !== 'object') {
      throw new Error('Données de cas invalides');
    }

    return {
      caseId: this.validateString(data.caseId, 'caseId'),
      metadata: this.parseMetadata(data.metadata),
      evidence: this.parseEvidence(data.evidence),
      suspects: this.parseSuspects(data.suspects),
      solution: this.parseSolution(data.solution),
      scoring: this.parseScoring(data.scoring),
      validation: this.parseValidation(data.validation)
    };
  }

  /**
   * Parse et valide un cas complet
   */

  /**
   * Parse les métadonnées du cas
   */
  private static parseMetadata(metadata: any) {
    const required = ['title', 'description', 'difficulty', 'estimatedTimeMinutes', 'location', 'dateOfCrime', 'type'];
    for (const field of required) {
      if (!(field in metadata)) {
        throw new Error(`Missing metadata field: ${field}`);
      }
    }

    return {
      title: this.validateString(metadata.title, 'metadata.title'),
      titleEn: metadata.titleEn || metadata.title,
      description: this.validateString(metadata.description, 'metadata.description'),
      descriptionEn: metadata.descriptionEn || metadata.description,
      difficulty: this.validateNumberRange(metadata.difficulty, 'metadata.difficulty', 1, 5),
      estimatedTimeMinutes: this.validateNumber(metadata.estimatedTimeMinutes, 'metadata.estimatedTimeMinutes'),
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      location: this.validateString(metadata.location, 'metadata.location'),
      locationEn: metadata.locationEn || metadata.location,
      dateOfCrime: this.validateString(metadata.dateOfCrime, 'metadata.dateOfCrime'),
      type: this.validateCaseType(metadata.type),
      tutorial: Boolean(metadata.tutorial)
    };
  }

  /**
   * Parse les preuves
   */
  private static parseEvidence(evidenceArray: any[]): EvidenceDefinition[] {
    if (!Array.isArray(evidenceArray)) {
      throw new Error('Evidence must be an array');
    }

    return evidenceArray.map((evidence, index) => {
      const required = ['evidenceId', 'name', 'description', 'type', 'category', 'location', 'collectedAt', 'collectedBy'];
      for (const field of required) {
        if (!(field in evidence)) {
          throw new Error(`Missing evidence field at index ${index}: ${field}`);
        }
      }

      return {
        evidenceId: this.validateString(evidence.evidenceId, `evidence[${index}].evidenceId`),
        name: this.validateString(evidence.name, `evidence[${index}].name`),
        nameEn: evidence.nameEn || evidence.name,
        description: this.validateString(evidence.description, `evidence[${index}].description`),
        descriptionEn: evidence.descriptionEn || evidence.description,
        type: this.validateString(evidence.type, `evidence[${index}].type`),
        category: this.validateString(evidence.category, `evidence[${index}].category`),
        location: this.validateString(evidence.location, `evidence[${index}].location`),
        locationEn: evidence.locationEn || evidence.location,
        collectedAt: this.validateString(evidence.collectedAt, `evidence[${index}].collectedAt`),
        collectedBy: this.validateString(evidence.collectedBy, `evidence[${index}].collectedBy`),
        isAvailable: Boolean(evidence.isAvailable !== false),
        requiresAnalysis: Boolean(evidence.requiresAnalysis),
        analysisType: evidence.analysisType,
        filePath: evidence.filePath,
        content: evidence.content,
        contentEn: evidence.contentEn,
        tags: Array.isArray(evidence.tags) ? evidence.tags : [],
        importance: this.validateImportance(evidence.importance || 'medium'),
        pointValue: this.validateNumber(evidence.pointValue || 10, `evidence[${index}].pointValue`),
        hints: Array.isArray(evidence.hints) ? evidence.hints : [],
        hintsEn: Array.isArray(evidence.hintsEn) ? evidence.hintsEn : evidence.hints || []
      };
    });
  }

  /**
   * Parse les suspects
   */
  private static parseSuspects(suspectsArray: any[]): SuspectDefinition[] {
    if (!Array.isArray(suspectsArray)) {
      throw new Error('Suspects must be an array');
    }

    return suspectsArray.map((suspect, index) => {
      const required = ['suspectId', 'name', 'age', 'description', 'alibi', 'relationship', 'isGuilty'];
      for (const field of required) {
        if (!(field in suspect)) {
          throw new Error(`Missing suspect field at index ${index}: ${field}`);
        }
      }

      return {
        suspectId: this.validateString(suspect.suspectId, `suspect[${index}].suspectId`),
        name: this.validateString(suspect.name, `suspect[${index}].name`),
        age: this.validateNumber(suspect.age, `suspect[${index}].age`),
        description: this.validateString(suspect.description, `suspect[${index}].description`),
        descriptionEn: suspect.descriptionEn || suspect.description,
        alibi: this.validateString(suspect.alibi, `suspect[${index}].alibi`),
        alibiEn: suspect.alibiEn || suspect.alibi,
        motive: suspect.motive,
        motiveEn: suspect.motiveEn || suspect.motive,
        relationship: this.validateString(suspect.relationship, `suspect[${index}].relationship`),
        relationshipEn: suspect.relationshipEn || suspect.relationship,
        photo: suspect.photo,
        isGuilty: Boolean(suspect.isGuilty),
        evidenceConnections: Array.isArray(suspect.evidenceConnections) ? suspect.evidenceConnections : [],
        backgroundInfo: suspect.backgroundInfo || '',
        backgroundInfoEn: suspect.backgroundInfoEn || suspect.backgroundInfo || ''
      };
    });
  }

  /**
   * Parse la solution
   */
  private static parseSolution(solution: any): CaseSolution {
    const required = ['culprit', 'motive', 'methodOfCrime', 'keyEvidence', 'explanation'];
    for (const field of required) {
      if (!(field in solution)) {
        throw new Error(`Missing solution field: ${field}`);
      }
    }

    return {
      culprit: this.validateString(solution.culprit, 'solution.culprit'),
      motive: this.validateString(solution.motive, 'solution.motive'),
      motiveEn: solution.motiveEn || solution.motive,
      methodOfCrime: this.validateString(solution.methodOfCrime, 'solution.methodOfCrime'),
      methodOfCrimeEn: solution.methodOfCrimeEn || solution.methodOfCrime,
      keyEvidence: Array.isArray(solution.keyEvidence) ? solution.keyEvidence : [],
      timeline: Array.isArray(solution.timeline) ? solution.timeline : [],
      explanation: this.validateString(solution.explanation, 'solution.explanation'),
      explanationEn: solution.explanationEn || solution.explanation
    };
  }

  /**
   * Parse les règles de scoring
   */
  private static parseScoring(scoring: any) {
    const required = ['maxScore'];
    for (const field of required) {
      if (!(field in scoring)) {
        throw new Error(`Missing scoring field: ${field}`);
      }
    }

    return {
      maxScore: this.validateNumber(scoring.maxScore, 'scoring.maxScore'),
      evidencePoints: scoring.evidencePoints || {},
      analysisPoints: {
        correct: (scoring.analysisPoints?.correct) || 20,
        incorrect: (scoring.analysisPoints?.incorrect) || -5
      },
      accusationPoints: {
        correctCulprit: (scoring.accusationPoints?.correctCulprit) || 100,
        correctMotive: (scoring.accusationPoints?.correctMotive) || 50,
        correctMethod: (scoring.accusationPoints?.correctMethod) || 50,
        incorrectAccusation: (scoring.accusationPoints?.incorrectAccusation) || -25
      },
      timeBonus: {
        fastCompletion: (scoring.timeBonus?.fastCompletion) || 50,
        mediumCompletion: (scoring.timeBonus?.mediumCompletion) || 25
      },
      hintsUsedPenalty: scoring.hintsUsedPenalty || 10
    };
  }

  /**
   * Parse les règles de validation
   */
  private static parseValidation(validation: any) {
    return {
      requiredEvidence: Array.isArray(validation.requiredEvidence) ? validation.requiredEvidence : [],
      requiredAnalyses: Array.isArray(validation.requiredAnalyses) ? validation.requiredAnalyses : [],
      minimumEvidenceToAccuse: validation.minimumEvidenceToAccuse || 3,
      allowMultipleAccusations: Boolean(validation.allowMultipleAccusations !== false),
      accusationCooldownMinutes: validation.accusationCooldownMinutes || 5
    };
  }

  // Méthodes de validation utilitaires
  private static validateString(value: any, fieldName: string): string {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`${fieldName} must be a non-empty string`);
    }
    return value.trim();
  }

  private static validateNumber(value: any, fieldName: string): number {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`${fieldName} must be a valid number`);
    }
    return num;
  }

  private static validateNumberRange(value: any, fieldName: string, min: number, max: number): number {
    const num = this.validateNumber(value, fieldName);
    if (num < min || num > max) {
      throw new Error(`${fieldName} must be between ${min} and ${max}`);
    }
    return num;
  }

  private static validateCaseType(value: any): 'homicide' | 'theft' | 'fraud' | 'drug' | 'cybercrime' | 'other' {
    const validTypes = ['homicide', 'theft', 'fraud', 'drug', 'cybercrime', 'other'];
    if (!validTypes.includes(value)) {
      throw new Error(`Invalid case type: ${value}. Must be one of: ${validTypes.join(', ')}`);
    }
    return value;
  }

  private static validateImportance(value: any): 'low' | 'medium' | 'high' | 'critical' {
    const validImportance = ['low', 'medium', 'high', 'critical'];
    if (!validImportance.includes(value)) {
      throw new Error(`Invalid importance: ${value}. Must be one of: ${validImportance.join(', ')}`);
    }
    return value;
  }

  /**
   * Charge un cas depuis une URL ou un fichier local
   */
  static async loadCaseFromFile(filePath: string): Promise<CaseDefinition> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load case file: ${response.statusText}`);
      }
      const jsonData = await response.json();
      return this.parseCase(jsonData);
    } catch (error) {
      console.error('Error loading case file:', error);
      throw error;
    }
  }

  /**
   * Valide qu'un cas est bien formé et complet
   */
  static validateCase(caseData: CaseDefinition): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Vérifier que le coupable existe dans la liste des suspects
    const culpritExists = caseData.suspects.some(s => s.suspectId === caseData.solution.culprit);
    if (!culpritExists) {
      errors.push(`Culprit ID ${caseData.solution.culprit} not found in suspects list`);
    }

    // Vérifier que les preuves clés existent
    caseData.solution.keyEvidence.forEach(evidenceId => {
      const evidenceExists = caseData.evidence.some(e => e.evidenceId === evidenceId);
      if (!evidenceExists) {
        errors.push(`Key evidence ID ${evidenceId} not found in evidence list`);
      }
    });

    // Vérifier qu'il y a au moins un suspect coupable
    const guiltyCount = caseData.suspects.filter(s => s.isGuilty).length;
    if (guiltyCount === 0) {
      errors.push('No guilty suspect found');
    } else if (guiltyCount > 1) {
      errors.push(`Multiple guilty suspects found (${guiltyCount})`);
    }

    // Vérifier que les preuves requises existent
    caseData.validation.requiredEvidence.forEach(evidenceId => {
      const evidenceExists = caseData.evidence.some(e => e.evidenceId === evidenceId);
      if (!evidenceExists) {
        errors.push(`Required evidence ID ${evidenceId} not found in evidence list`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
