import axios from 'axios';
import { CaseStructure } from '../types/caseStructures';
import { Case } from '../types/api';
import { CaseStructureAdapter } from './caseStructureAdapter';

// Configuration pour l'API directement ici pour éviter les imports circulaires
const apiClient = axios.create({
  baseURL: 'http://localhost:5029/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Service pour gérer les cas basés sur les structures JSON
 */
export class CaseStructureService {
  private static casesCache: CaseStructure[] = [];
  private static lastFetch: number = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Récupère tous les cas disponibles et les convertit en format Case
   */
  static async getCases(): Promise<Case[]> {
    try {
      const structures = await this.getAllCaseStructures();
      return structures.map((structure, index) => 
        CaseStructureAdapter.toCaseFormat(structure, index + 1)
      );
    } catch (error) {
      console.error('Error loading case structures:', error);
      throw new Error('Erreur lors du chargement des cas');
    }
  }

  /**
   * Récupère un cas spécifique par son ID numérique (converti)
   */
  static async getCase(numericId: number): Promise<Case> {
    try {
      const structures = await this.getAllCaseStructures();
      const originalId = CaseStructureAdapter.findOriginalId(structures, numericId);
      
      if (!originalId) {
        throw new Error(`Case with ID ${numericId} not found`);
      }

      const structure = await this.getCaseStructure(originalId);
      return CaseStructureAdapter.toCaseFormat(structure, numericId);
    } catch (error) {
      console.error('Error loading case:', error);
      throw new Error('Cas non trouvé');
    }
  }

  /**
   * Récupère le cas tutorial
   */
  static async getTutorialCase(): Promise<Case> {
    try {
      const structures = await this.getAllCaseStructures();
      const tutorialStructure = structures.find(s => s.tutorial === true);
      
      if (!tutorialStructure) {
        throw new Error('No tutorial case found');
      }

      return CaseStructureAdapter.toCaseFormat(tutorialStructure, 1);
    } catch (error) {
      console.error('Error loading tutorial case:', error);
      throw new Error('Cas tutorial non trouvé');
    }
  }

  /**
   * Récupère tous les cas tutorial
   */
  static async getTutorialCases(): Promise<Case[]> {
    try {
      const structures = await this.getAllCaseStructures();
      const tutorialStructures = structures.filter(s => s.tutorial === true);
      
      return tutorialStructures.map((structure, index) => 
        CaseStructureAdapter.toCaseFormat(structure, index + 1)
      );
    } catch (error) {
      console.error('Error loading tutorial cases:', error);
      throw new Error('Cas tutorial non trouvés');
    }
  }

  /**
   * Récupère la structure JSON originale d'un cas
   */
  static async getCaseStructure(caseId: string): Promise<CaseStructure> {
    try {
      const response = await apiClient.get<CaseStructure>(`/casestructures/${caseId}`);
      return response.data;
    } catch (error) {
      console.error('Error loading case structure:', error);
      throw new Error(`Erreur lors du chargement du cas ${caseId}`);
    }
  }

  /**
   * Récupère la liste des IDs de cas disponibles
   */
  static async getAvailableCaseIds(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>('/casestructures');
      return response.data;
    } catch (error) {
      console.error('Error loading available cases:', error);
      throw new Error('Erreur lors du chargement de la liste des cas');
    }
  }

  /**
   * Récupère toutes les structures de cas avec cache
   */
  private static async getAllCaseStructures(): Promise<CaseStructure[]> {
    const now = Date.now();
    
    // Utiliser le cache si il est encore valide
    if (this.casesCache.length > 0 && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.casesCache;
    }

    try {
      const caseIds = await this.getAvailableCaseIds();
      const structures: CaseStructure[] = [];

      // Charger toutes les structures en parallèle
      const promises = caseIds.map(id => this.getCaseStructure(id));
      const results = await Promise.allSettled(promises);

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          structures.push(result.value);
        } else {
          console.warn(`Failed to load case ${caseIds[index]}:`, result.reason);
        }
      });

      // Mettre à jour le cache
      this.casesCache = structures;
      this.lastFetch = now;

      return structures;
    } catch (error) {
      console.error('Error loading all case structures:', error);
      throw error;
    }
  }

  /**
   * Invalide le cache (utile après modifications)
   */
  static invalidateCache(): void {
    this.casesCache = [];
    this.lastFetch = 0;
  }
}
