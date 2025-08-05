import axios, { AxiosInstance, AxiosError } from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, User, Case, Evidence, InvestigationSession } from '../types/api';
import { CaseStructureService } from './caseStructureService';

const API_BASE_URL = 'http://localhost:5029/api';

// Configuration d'Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
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

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
};

// Service des utilisateurs
export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
};

// Service des affaires (maintenant basé sur les structures JSON)
export const caseService = {
  async getCases(): Promise<Case[]> {
    // Utiliser le nouveau service CaseStructure au lieu de l'ancien
    return await CaseStructureService.getCases();
  },

  async getCase(id: number): Promise<Case> {
    // Utiliser le nouveau service CaseStructure au lieu de l'ancien
    return await CaseStructureService.getCase(id);
  },

  async getTutorialCase(): Promise<Case> {
    // Utiliser le nouveau service CaseStructure au lieu de l'ancien
    return await CaseStructureService.getTutorialCase();
  },

  async getTutorialCases(): Promise<Case[]> {
    // Utiliser le nouveau service CaseStructure au lieu de l'ancien
    return await CaseStructureService.getTutorialCases();
  },
};

// Service des preuves
export const evidenceService = {
  async getEvidenceByCase(caseId: number): Promise<Evidence[]> {
    const response = await api.get<Evidence[]>(`/evidence/case/${caseId}`);
    return response.data;
  },

  async getEvidence(id: number): Promise<Evidence> {
    const response = await api.get<Evidence>(`/evidence/${id}`);
    return response.data;
  },
};

// Service des sessions d'enquête
export const sessionService = {
  async getSessionsByCase(caseId: number): Promise<InvestigationSession[]> {
    const response = await api.get<InvestigationSession[]>(`/sessions/case/${caseId}`);
    return response.data;
  },

  async getSession(id: number): Promise<InvestigationSession> {
    const response = await api.get<InvestigationSession>(`/sessions/${id}`);
    return response.data;
  },

  async createSession(sessionData: Partial<InvestigationSession>): Promise<InvestigationSession> {
    const response = await api.post<InvestigationSession>('/sessions', sessionData);
    return response.data;
  },

  async updateSession(id: number, sessionData: Partial<InvestigationSession>): Promise<InvestigationSession> {
    const response = await api.put<InvestigationSession>(`/sessions/${id}`, sessionData);
    return response.data;
  },
};

export { api };
export default api;
