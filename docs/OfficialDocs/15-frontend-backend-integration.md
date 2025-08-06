# 🔗 Integração Frontend-Backend - CaseZero

Este documento detalha a arquitetura, padrões e implementações para integração entre o frontend React e o backend .NET Core da aplicação CaseZero.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura de Comunicação](#arquitetura-de-comunicação)
- [Cliente HTTP](#cliente-http)
- [Gestão de Estado](#gestão-de-estado)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Tratamento de Erros](#tratamento-de-erros)
- [Cache e Performance](#cache-e-performance)
- [WebSockets e Real-time](#websockets-e-real-time)
- [Upload de Arquivos](#upload-de-arquivos)
- [Testes de Integração](#testes-de-integração)

## 🎯 Visão Geral

A integração entre frontend e backend do CaseZero utiliza uma arquitetura REST robusta com comunicação assíncrona, gestão centralizada de estado e tratamento abrangente de erros.

### Fluxo de Comunicação

```text
┌─────────────────────────────────────────────────────────┐
│ 🔗 ARQUITETURA DE INTEGRAÇÃO                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────┐    HTTP/HTTPS    ┌───────────────┐ │
│ │  REACT CLIENT   │◄─────────────────►│ .NET CORE API │ │
│ │                 │     REST API      │               │ │
│ │ ┌─────────────┐ │                   │ ┌───────────┐ │ │
│ │ │   Axios     │ │                   │ │Controllers│ │ │
│ │ │   Client    │ │                   │ │           │ │ │
│ │ └─────────────┘ │                   │ └───────────┘ │ │
│ │ ┌─────────────┐ │                   │ ┌───────────┐ │ │
│ │ │ State Mgmt  │ │                   │ │ Services  │ │ │
│ │ │ (Zustand)   │ │                   │ │           │ │ │
│ │ └─────────────┘ │                   │ └───────────┘ │ │
│ │ ┌─────────────┐ │                   │ ┌───────────┐ │ │
│ │ │React Query  │ │                   │ │Repository │ │ │
│ │ │   Cache     │ │                   │ │  Pattern  │ │ │
│ │ └─────────────┘ │                   │ └───────────┘ │ │
│ └─────────────────┘                   └───────────────┘ │
│                                                         │
│ ┌─────────────────┐    WebSocket     ┌───────────────┐  │
│ │  REACT CLIENT   │◄─────────────────►│ SignalR Hub   │ │
│ │                 │   Real-time       │               │ │
│ │ ┌─────────────┐ │                   │ ┌───────────┐ │ │
│ │ │ SignalR     │ │                   │ │    Hub    │ │ │
│ │ │ Connection  │ │                   │ │  Methods  │ │ │
│ │ └─────────────┘ │                   │ └───────────┘ │ │
│ └─────────────────┘                   └───────────────┘ │
│                                                         │
│ Protocolos:                                             │
│ ├── REST: Operações CRUD principais                    │
│ ├── WebSocket: Notificações em tempo real              │
│ ├── File Upload: Multipart/form-data                   │
│ └── Authentication: JWT Bearer Token                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Padrões de Integração

- **Repository Pattern**: Abstração das chamadas de API
- **Service Layer**: Lógica de negócio no frontend
- **Error Boundary**: Tratamento centralizado de erros
- **Retry Pattern**: Tentativas automáticas em falhas
- **Circuit Breaker**: Proteção contra cascata de falhas
- **Optimistic Updates**: Atualizações otimistas da UI

## 🏗️ Arquitetura de Comunicação

### API Base Configuration

```typescript
// src/config/api.config.ts
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  
  endpoints: {
    auth: '/auth',
    cases: '/cases',
    evidence: '/evidence',
    users: '/users',
    reports: '/reports',
    dashboard: '/dashboard',
    search: '/search'
  },
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Version': '1.0.0'
  }
} as const;

export const WEBSOCKET_CONFIG = {
  url: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:5000/hubs',
  automaticReconnect: true,
  reconnectDelay: 5000,
  maxReconnectAttempts: 10
} as const;
```

### Environment Configuration

```typescript
// src/config/environment.ts
export interface Environment {
  name: string;
  apiBaseUrl: string;
  websocketUrl: string;
  enableDevTools: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  features: {
    realTimeUpdates: boolean;
    fileUpload: boolean;
    analyticsTracking: boolean;
  };
}

export const environments: Record<string, Environment> = {
  development: {
    name: 'development',
    apiBaseUrl: 'http://localhost:5000',
    websocketUrl: 'ws://localhost:5000/hubs',
    enableDevTools: true,
    logLevel: 'debug',
    features: {
      realTimeUpdates: true,
      fileUpload: true,
      analyticsTracking: false
    }
  },
  
  staging: {
    name: 'staging',
    apiBaseUrl: 'https://staging-api.casezero.gov.br',
    websocketUrl: 'wss://staging-api.casezero.gov.br/hubs',
    enableDevTools: true,
    logLevel: 'info',
    features: {
      realTimeUpdates: true,
      fileUpload: true,
      analyticsTracking: true
    }
  },
  
  production: {
    name: 'production',
    apiBaseUrl: 'https://api.casezero.gov.br',
    websocketUrl: 'wss://api.casezero.gov.br/hubs',
    enableDevTools: false,
    logLevel: 'error',
    features: {
      realTimeUpdates: true,
      fileUpload: true,
      analyticsTracking: true
    }
  }
};

export const currentEnvironment: Environment = 
  environments[import.meta.env.VITE_ENVIRONMENT || 'development'];
```

## 🌐 Cliente HTTP

### Axios Instance Configuration

```typescript
// src/services/http/httpClient.ts
import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { AuthStore } from '../../stores/authStore';
import { ErrorHandler } from './errorHandler';
import { RetryHandler } from './retryHandler';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  meta?: Record<string, any>;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any[];
    traceId?: string;
    timestamp: string;
  };
}

class HttpClient {
  private instance: AxiosInstance;
  private authStore: AuthStore;
  private errorHandler: ErrorHandler;
  private retryHandler: RetryHandler;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers
    });

    this.authStore = AuthStore.getInstance();
    this.errorHandler = new ErrorHandler();
    this.retryHandler = new RetryHandler();

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - adicionar token de autenticação
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.authStore.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Adicionar request ID para rastreamento
        config.headers['X-Request-ID'] = this.generateRequestId();
        
        // Log da requisição em desenvolvimento
        if (import.meta.env.DEV) {
          console.log(`🔗 HTTP ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data
          });
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - tratar respostas e erros
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Log da resposta em desenvolvimento
        if (import.meta.env.DEV) {
          console.log(`✅ HTTP ${response.status} ${response.config.url}`, {
            data: response.data
          });
        }
        
        return response;
      },
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as AxiosRequestConfig & { 
          _retry?: boolean;
          _retryCount?: number;
        };

        // Log do erro
        if (import.meta.env.DEV) {
          console.error(`❌ HTTP ${error.response?.status} ${originalRequest?.url}`, {
            error: error.response?.data,
            config: originalRequest
          });
        }

        // Tentar refresh do token em caso de 401
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await this.authStore.refreshToken();
            const newToken = this.authStore.getToken();
            
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            this.authStore.logout();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        // Aplicar estratégia de retry
        if (this.retryHandler.shouldRetry(error, originalRequest._retryCount || 0)) {
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
          
          await this.retryHandler.delay(originalRequest._retryCount);
          return this.instance(originalRequest);
        }

        // Tratar erro através do ErrorHandler
        const handledError = this.errorHandler.handleError(error);
        return Promise.reject(handledError);
      }
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Métodos HTTP públicos
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // Upload de arquivo com progress
  async uploadFile<T>(
    url: string, 
    file: File, 
    additionalData?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, JSON.stringify(additionalData[key]));
      });
    }

    const response = await this.instance.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    });

    return response.data;
  }
}

// Singleton instance
export const httpClient = new HttpClient();
```

### Error Handler

```typescript
// src/services/http/errorHandler.ts
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { ApiError } from './httpClient';

export interface HandledError {
  code: string;
  message: string;
  details?: any[];
  isNetworkError: boolean;
  isServerError: boolean;
  isClientError: boolean;
  originalError: AxiosError<ApiError>;
}

export class ErrorHandler {
  private readonly ERROR_MESSAGES: Record<string, string> = {
    // Network errors
    'NETWORK_ERROR': 'Erro de conexão. Verifique sua internet.',
    'TIMEOUT_ERROR': 'Tempo limite excedido. Tente novamente.',
    'CONNECTION_REFUSED': 'Não foi possível conectar ao servidor.',
    
    // Authentication errors
    'TOKEN_EXPIRED': 'Sua sessão expirou. Faça login novamente.',
    'TOKEN_INVALID': 'Token de acesso inválido.',
    'INSUFFICIENT_PERMISSIONS': 'Você não tem permissão para esta ação.',
    'ACCOUNT_LOCKED': 'Conta bloqueada. Entre em contato com o suporte.',
    
    // Validation errors
    'VALIDATION_ERROR': 'Dados inválidos fornecidos.',
    'REQUIRED_FIELD': 'Campo obrigatório não preenchido.',
    'INVALID_FORMAT': 'Formato de dados inválido.',
    
    // Business logic errors
    'CASE_NOT_FOUND': 'Caso não encontrado.',
    'EVIDENCE_NOT_FOUND': 'Evidência não encontrada.',
    'USER_NOT_FOUND': 'Usuário não encontrado.',
    'OPERATION_NOT_ALLOWED': 'Operação não permitida.',
    
    // Server errors
    'INTERNAL_SERVER_ERROR': 'Erro interno do servidor.',
    'SERVICE_UNAVAILABLE': 'Serviço temporariamente indisponível.',
    'RATE_LIMIT_EXCEEDED': 'Muitas tentativas. Tente novamente em alguns minutos.'
  };

  handleError(error: AxiosError<ApiError>): HandledError {
    const handledError: HandledError = {
      code: 'UNKNOWN_ERROR',
      message: 'Erro desconhecido',
      isNetworkError: false,
      isServerError: false,
      isClientError: false,
      originalError: error
    };

    // Network errors
    if (!error.response) {
      handledError.isNetworkError = true;
      
      if (error.code === 'ECONNABORTED') {
        handledError.code = 'TIMEOUT_ERROR';
        handledError.message = this.ERROR_MESSAGES.TIMEOUT_ERROR;
      } else if (error.code === 'ECONNREFUSED') {
        handledError.code = 'CONNECTION_REFUSED';
        handledError.message = this.ERROR_MESSAGES.CONNECTION_REFUSED;
      } else {
        handledError.code = 'NETWORK_ERROR';
        handledError.message = this.ERROR_MESSAGES.NETWORK_ERROR;
      }
    }
    // Server response errors
    else {
      const status = error.response.status;
      const errorData = error.response.data;

      if (status >= 400 && status < 500) {
        handledError.isClientError = true;
      } else if (status >= 500) {
        handledError.isServerError = true;
      }

      // Usar dados do erro da API se disponível
      if (errorData?.error) {
        handledError.code = errorData.error.code;
        handledError.message = errorData.error.message;
        handledError.details = errorData.error.details;
      } else {
        // Fallback para códigos HTTP padrão
        handledError.code = this.getErrorCodeFromStatus(status);
        handledError.message = this.ERROR_MESSAGES[handledError.code] || 
                              `Erro ${status}: ${error.response.statusText}`;
      }
    }

    // Mostrar notificação de erro (exceto para alguns códigos específicos)
    if (!this.shouldSuppressNotification(handledError.code)) {
      toast.error(handledError.message, {
        duration: 5000,
        position: 'top-right'
      });
    }

    // Log detalhado em desenvolvimento
    if (import.meta.env.DEV) {
      console.group(`🚨 Error Handler: ${handledError.code}`);
      console.error('Handled Error:', handledError);
      console.error('Original Error:', error);
      console.groupEnd();
    }

    return handledError;
  }

  private getErrorCodeFromStatus(status: number): string {
    switch (status) {
      case 400: return 'VALIDATION_ERROR';
      case 401: return 'TOKEN_INVALID';
      case 403: return 'INSUFFICIENT_PERMISSIONS';
      case 404: return 'RESOURCE_NOT_FOUND';
      case 409: return 'CONFLICT_ERROR';
      case 422: return 'VALIDATION_ERROR';
      case 429: return 'RATE_LIMIT_EXCEEDED';
      case 500: return 'INTERNAL_SERVER_ERROR';
      case 503: return 'SERVICE_UNAVAILABLE';
      default: return 'UNKNOWN_ERROR';
    }
  }

  private shouldSuppressNotification(errorCode: string): boolean {
    // Não mostrar notificação para estes erros (serão tratados pela UI)
    const suppressedCodes = [
      'TOKEN_EXPIRED',
      'VALIDATION_ERROR', // Erros de validação são mostrados no formulário
      'RESOURCE_NOT_FOUND' // 404s podem ser tratados pela página
    ];
    
    return suppressedCodes.includes(errorCode);
  }
}
```

### Retry Handler

```typescript
// src/services/http/retryHandler.ts
import { AxiosError } from 'axios';
import { ApiError } from './httpClient';

export class RetryHandler {
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY_BASE = 1000; // 1 segundo
  private readonly RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];
  private readonly RETRYABLE_ERROR_CODES = ['ECONNABORTED', 'ENOTFOUND', 'ECONNREFUSED'];

  shouldRetry(error: AxiosError<ApiError>, retryCount: number): boolean {
    // Não tentar novamente se excedeu o limite
    if (retryCount >= this.MAX_RETRY_ATTEMPTS) {
      return false;
    }

    // Network errors são tentados novamente
    if (!error.response && this.RETRYABLE_ERROR_CODES.includes(error.code || '')) {
      return true;
    }

    // Status codes específicos são tentados novamente
    if (error.response && this.RETRYABLE_STATUS_CODES.includes(error.response.status)) {
      return true;
    }

    return false;
  }

  async delay(retryCount: number): Promise<void> {
    // Exponential backoff com jitter
    const delay = this.RETRY_DELAY_BASE * Math.pow(2, retryCount - 1);
    const jitter = Math.random() * 1000; // Até 1 segundo de jitter
    const totalDelay = delay + jitter;

    if (import.meta.env.DEV) {
      console.log(`⏳ Retrying in ${totalDelay.toFixed(0)}ms (attempt ${retryCount})`);
    }

    return new Promise(resolve => setTimeout(resolve, totalDelay));
  }
}
```

## 🗄️ Gestão de Estado

### Auth Store com Zustand

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { httpClient } from '../services/http/httpClient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  permissions: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => Promise<boolean>;
  
  // Getters
  getToken: () => string | null;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await httpClient.post<{
            user: User;
            tokens: AuthTokens;
          }>('/auth/login', { email, password });

          set({
            user: response.data.user,
            tokens: response.data.tokens,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        const { tokens } = get();
        
        // Invalidar token no servidor
        if (tokens?.refreshToken) {
          httpClient.post('/auth/logout', {
            refreshToken: tokens.refreshToken
          }).catch(() => {
            // Ignorar erros no logout
          });
        }

        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      refreshToken: async () => {
        const { tokens } = get();
        
        if (!tokens?.refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const response = await httpClient.post<{
            tokens: AuthTokens;
          }>('/auth/refresh', {
            refreshToken: tokens.refreshToken
          });

          set({
            tokens: response.data.tokens
          });
        } catch (error) {
          // Se refresh falhar, fazer logout
          get().logout();
          throw error;
        }
      },

      updateUser: (userData: Partial<User>) => {
        set(state => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },

      checkAuth: async () => {
        const { tokens } = get();
        
        if (!tokens) {
          return false;
        }

        // Verificar se o token expirou
        if (Date.now() > tokens.expiresAt) {
          try {
            await get().refreshToken();
            return true;
          } catch {
            return false;
          }
        }

        return true;
      },

      getToken: () => {
        const { tokens } = get();
        return tokens?.accessToken || null;
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        return user?.permissions.includes(permission) || false;
      },

      hasRole: (role: string) => {
        const { user } = get();
        return user?.role === role;
      }
    }),
    {
      name: 'casezero-auth',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Singleton para usar fora do React
export class AuthStore {
  private static instance: AuthStore;
  
  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  getToken(): string | null {
    return useAuthStore.getState().getToken();
  }

  async refreshToken(): Promise<void> {
    return useAuthStore.getState().refreshToken();
  }

  logout(): void {
    useAuthStore.getState().logout();
  }
}
```

### Application Store

```typescript
// src/stores/appStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface AppState {
  // UI State
  isSidebarOpen: boolean;
  isLoading: boolean;
  currentTheme: 'light' | 'dark';
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Global Error State
  globalError: string | null;
  
  // Connection State
  isOnline: boolean;
  connectionQuality: 'good' | 'poor' | 'offline';
  
  // Actions
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  setGlobalError: (error: string | null) => void;
  setConnectionState: (isOnline: boolean, quality: 'good' | 'poor' | 'offline') => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      isSidebarOpen: true,
      isLoading: false,
      currentTheme: 'light',
      notifications: [],
      unreadCount: 0,
      globalError: null,
      isOnline: true,
      connectionQuality: 'good',

      // Actions
      toggleSidebar: () => {
        set(state => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ currentTheme: theme });
        
        // Aplicar tema no documento
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('casezero-theme', theme);
      },

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          read: false
        };

        set(state => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));
      },

      markNotificationAsRead: (id: string) => {
        set(state => ({
          notifications: state.notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }));
      },

      clearNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0
        });
      },

      setGlobalError: (error: string | null) => {
        set({ globalError: error });
      },

      setConnectionState: (isOnline: boolean, quality: 'good' | 'poor' | 'offline') => {
        set({ isOnline, connectionQuality: quality });
      }
    }),
    {
      name: 'casezero-app-store'
    }
  )
);
```

## 🚀 React Query Integration

### Query Client Configuration

```typescript
// src/lib/queryClient.ts
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAppStore } from '../stores/appStore';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Não tentar novamente para erros 4xx
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 1
    }
  },
  
  queryCache: new QueryCache({
    onError: (error: any) => {
      // Log global de erros de query
      console.error('Query Error:', error);
      
      // Mostrar erro global apenas para erros de rede
      if (!error?.response) {
        useAppStore.getState().setGlobalError(
          'Erro de conexão. Verifique sua internet.'
        );
      }
    }
  }),
  
  mutationCache: new MutationCache({
    onError: (error: any) => {
      console.error('Mutation Error:', error);
    },
    
    onSuccess: (data: any, variables: any, context: any, mutation: any) => {
      // Invalidar queries relacionadas após mutations bem-sucedidas
      const mutationKey = mutation.options.mutationKey?.[0];
      
      if (mutationKey === 'createCase' || mutationKey === 'updateCase') {
        queryClient.invalidateQueries({ queryKey: ['cases'] });
      }
      
      if (mutationKey === 'uploadEvidence') {
        queryClient.invalidateQueries({ queryKey: ['evidence'] });
      }
    }
  })
});
```

### API Queries Hooks

```typescript
// src/hooks/api/useCases.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../services/http/httpClient';
import { toast } from 'react-hot-toast';

export interface Case {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  };
  evidenceCount: number;
  progress: number;
}

export interface CreateCaseData {
  title: string;
  type: string;
  priority: string;
  description: string;
  location?: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface CasesFilter {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
  priority?: string;
  assignedTo?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Query para listar casos
export const useCases = (filters: CasesFilter = {}) => {
  return useQuery({
    queryKey: ['cases', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      return await httpClient.get<{
        data: Case[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }>(`/cases?${params.toString()}`);
    },
    staleTime: 2 * 60 * 1000, // 2 minutos para lista de casos
  });
};

// Query para caso específico
export const useCase = (caseId: string | undefined) => {
  return useQuery({
    queryKey: ['cases', caseId],
    queryFn: async () => {
      if (!caseId) throw new Error('Case ID is required');
      return await httpClient.get<Case>(`/cases/${caseId}`);
    },
    enabled: !!caseId,
    staleTime: 5 * 60 * 1000, // 5 minutos para caso específico
  });
};

// Mutation para criar caso
export const useCreateCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createCase'],
    mutationFn: async (data: CreateCaseData) => {
      return await httpClient.post<Case>('/cases', data);
    },
    onSuccess: (response) => {
      // Invalidar lista de casos
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      
      // Adicionar o novo caso ao cache
      queryClient.setQueryData(['cases', response.data.id], response);
      
      toast.success('Caso criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao criar caso');
    }
  });
};

// Mutation para atualizar caso
export const useUpdateCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['updateCase'],
    mutationFn: async ({ caseId, data }: { caseId: string; data: Partial<CreateCaseData> }) => {
      return await httpClient.put<Case>(`/cases/${caseId}`, data);
    },
    onSuccess: (response, variables) => {
      // Atualizar cache do caso específico
      queryClient.setQueryData(['cases', variables.caseId], response);
      
      // Invalidar lista de casos
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      
      toast.success('Caso atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atualizar caso');
    }
  });
};

// Query para busca de casos
export const useSearchCases = (searchTerm: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['cases', 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return { data: [] };
      
      return await httpClient.get<Case[]>(`/cases/search?q=${encodeURIComponent(searchTerm)}`);
    },
    enabled: enabled && searchTerm.length >= 3,
    staleTime: 30 * 1000, // 30 segundos para busca
    debounce: 300 // Debounce de 300ms
  });
};
```

### Custom Hooks para Otimistic Updates

```typescript
// src/hooks/api/useOptimisticCases.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../services/http/httpClient';
import { Case } from './useCases';

export const useOptimisticUpdateCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ caseId, data }: { caseId: string; data: Partial<Case> }) => {
      return await httpClient.put<Case>(`/cases/${caseId}`, data);
    },
    
    onMutate: async ({ caseId, data }) => {
      // Cancelar queries em andamento
      await queryClient.cancelQueries({ queryKey: ['cases', caseId] });
      
      // Snapshot do valor anterior
      const previousCase = queryClient.getQueryData<{ data: Case }>(['cases', caseId]);
      
      // Atualização otimística
      if (previousCase) {
        queryClient.setQueryData(['cases', caseId], {
          ...previousCase,
          data: { ...previousCase.data, ...data }
        });
      }
      
      // Atualizar também na lista de casos
      queryClient.setQueriesData(
        { queryKey: ['cases'], type: 'active' },
        (old: any) => {
          if (!old?.data?.data) return old;
          
          return {
            ...old,
            data: {
              ...old.data,
              data: old.data.data.map((caseItem: Case) =>
                caseItem.id === caseId ? { ...caseItem, ...data } : caseItem
              )
            }
          };
        }
      );
      
      return { previousCase };
    },
    
    onError: (error, { caseId }, context) => {
      // Reverter em caso de erro
      if (context?.previousCase) {
        queryClient.setQueryData(['cases', caseId], context.previousCase);
      }
      
      // Invalidar para sincronizar com o servidor
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
    
    onSettled: () => {
      // Sempre invalidar após a operação
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    }
  });
};
```

## 🔐 Autenticação e Autorização

### Route Protection

```typescript
// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredRole,
  fallbackPath = '/login'
}) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        const isValid = await checkAuth();
        if (!isValid) {
          setIsChecking(false);
          return;
        }
      }
      setIsChecking(false);
    };

    verifyAuth();
  }, [isAuthenticated, checkAuth]);

  if (isLoading || isChecking) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to={fallbackPath}
        state={{ from: location }}
        replace
      />
    );
  }

  // Verificar permissão específica
  if (requiredPermission && !user.permissions.includes(requiredPermission)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ 
          from: location,
          requiredPermission 
        }}
        replace
      />
    );
  }

  // Verificar role específica
  if (requiredRole && user.role !== requiredRole) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ 
          from: location,
          requiredRole 
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};
```

### Permission Hook

```typescript
// src/hooks/usePermissions.ts
import { useAuthStore } from '../stores/authStore';

export const usePermissions = () => {
  const { user, hasPermission, hasRole } = useAuthStore();

  const permissions = {
    // Case permissions
    canCreateCase: () => hasPermission('cases.create'),
    canEditCase: () => hasPermission('cases.edit'),
    canDeleteCase: () => hasPermission('cases.delete'),
    canViewAllCases: () => hasPermission('cases.view_all'),
    canAssignCase: () => hasPermission('cases.assign'),
    
    // Evidence permissions
    canUploadEvidence: () => hasPermission('evidence.upload'),
    canAnalyzeEvidence: () => hasPermission('evidence.analyze'),
    canDeleteEvidence: () => hasPermission('evidence.delete'),
    
    // User permissions
    canManageUsers: () => hasPermission('users.manage'),
    canViewUserProfiles: () => hasPermission('users.view_profiles'),
    
    // Report permissions
    canGenerateReports: () => hasPermission('reports.generate'),
    canViewAnalytics: () => hasPermission('analytics.view'),
    
    // Admin permissions
    canManageSystem: () => hasRole('admin'),
    canViewAuditLogs: () => hasPermission('audit.view'),
    
    // Department specific
    canAccessLabData: () => hasRole('lab_technician') || hasRole('admin'),
    canApproveAnalysis: () => hasRole('supervisor') || hasRole('admin')
  };

  const checkCaseAccess = (caseData: any) => {
    // Admin pode acessar todos os casos
    if (hasRole('admin')) return true;
    
    // Usuário pode acessar casos atribuídos a ele
    if (caseData.assignedTo?.id === user?.id) return true;
    
    // Usuário pode acessar casos do seu departamento se tiver permissão
    if (caseData.department === user?.department && hasPermission('cases.view_department')) {
      return true;
    }
    
    return false;
  };

  return {
    ...permissions,
    checkCaseAccess,
    user,
    hasPermission,
    hasRole
  };
};
```

## ❌ Tratamento de Erros

### Error Boundary

```typescript
// src/components/ErrorBoundary.tsx
import React from 'react';
import { ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log do erro
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Callback personalizado
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Enviar erro para serviço de monitoramento
    if (import.meta.env.PROD) {
      this.reportError(error, errorInfo);
    }
  }

  private reportError(error: Error, errorInfo: ErrorInfo) {
    // Implementar integração com serviço de monitoramento
    // Ex: Sentry, LogRocket, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Enviar para endpoint de logging
    fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(errorReport)
    }).catch(() => {
      // Ignorar erros no logging
    });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Ops! Algo deu errado
            </h1>
            
            <p className="text-gray-600 text-center mb-6">
              Ocorreu um erro inesperado na aplicação. Nossa equipe foi notificada.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-4 p-3 bg-gray-100 rounded text-sm">
                <summary className="cursor-pointer font-medium">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex space-x-3">
              <Button
                onClick={this.handleRetry}
                className="flex-1"
                variant="primary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tentar Novamente
              </Button>
              
              <Button
                onClick={() => window.location.href = '/'}
                className="flex-1"
                variant="secondary"
              >
                Ir para Início
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Global Error Handler

```typescript
// src/utils/globalErrorHandler.ts
import { toast } from 'react-hot-toast';
import { useAppStore } from '../stores/appStore';

export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  
  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  init() {
    // Capturar erros não tratados
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.addEventListener('error', this.handleError);
    
    // Capturar erros do React (fallback se não houver Error Boundary)
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.handleConsoleError(...args);
      originalConsoleError.apply(console, args);
    };
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    // Mostrar erro amigável para o usuário
    if (this.shouldShowUserError(event.reason)) {
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
    }
    
    // Reportar erro
    this.reportError(event.reason, 'unhandledrejection');
    
    // Prevenir o comportamento padrão
    event.preventDefault();
  };

  private handleError = (event: ErrorEvent) => {
    console.error('Global Error:', event.error || event.message);
    
    // Mostrar erro amigável
    if (this.shouldShowUserError(event.error)) {
      toast.error('Ocorreu um erro na aplicação.');
    }
    
    // Reportar erro
    this.reportError(event.error || new Error(event.message), 'error');
  };

  private handleConsoleError = (...args: any[]) => {
    // Filtrar erros conhecidos do React/Dev tools
    const message = args.join(' ');
    
    if (this.isKnownError(message)) {
      return;
    }
    
    // Reportar apenas em produção
    if (import.meta.env.PROD) {
      this.reportError(new Error(message), 'console');
    }
  };

  private shouldShowUserError(error: any): boolean {
    // Não mostrar erros de rede (já tratados pelo httpClient)
    if (error?.isAxiosError || error?.name === 'AxiosError') {
      return false;
    }
    
    // Não mostrar erros conhecidos
    if (this.isKnownError(error?.message)) {
      return false;
    }
    
    return true;
  }

  private isKnownError(message: string): boolean {
    const knownErrors = [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'Script error',
      'Network request failed',
      'ChunkLoadError'
    ];
    
    return knownErrors.some(known => message?.includes(known));
  }

  private reportError(error: any, context: string) {
    // Não reportar em desenvolvimento
    if (import.meta.env.DEV) return;
    
    try {
      const errorReport = {
        message: error?.message || 'Unknown error',
        stack: error?.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: useAppStore.getState().user?.id
      };

      // Enviar para serviço de logging
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorReport)
      }).catch(() => {
        // Ignorar erros no logging
      });
    } catch {
      // Ignorar erros no error handler
    }
  }

  cleanup() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.removeEventListener('error', this.handleError);
  }
}
```

## 🚀 Cache e Performance

### Query Invalidation Strategy

```typescript
// src/utils/cacheInvalidation.ts
import { QueryClient } from '@tanstack/react-query';

export class CacheInvalidationManager {
  constructor(private queryClient: QueryClient) {}

  // Invalidação relacionada a casos
  invalidateCaseData(caseId?: string) {
    if (caseId) {
      // Invalidar caso específico
      this.queryClient.invalidateQueries({ queryKey: ['cases', caseId] });
      
      // Invalidar evidências do caso
      this.queryClient.invalidateQueries({ queryKey: ['evidence', 'case', caseId] });
      
      // Invalidar análises do caso
      this.queryClient.invalidateQueries({ queryKey: ['analysis', 'case', caseId] });
    }
    
    // Invalidar lista de casos
    this.queryClient.invalidateQueries({ queryKey: ['cases'] });
    
    // Invalidar estatísticas do dashboard
    this.queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
  }

  // Invalidação relacionada a evidências
  invalidateEvidenceData(evidenceId?: string, caseId?: string) {
    if (evidenceId) {
      this.queryClient.invalidateQueries({ queryKey: ['evidence', evidenceId] });
    }
    
    if (caseId) {
      this.queryClient.invalidateQueries({ queryKey: ['evidence', 'case', caseId] });
      this.invalidateCaseData(caseId);
    }
    
    this.queryClient.invalidateQueries({ queryKey: ['evidence'] });
  }

  // Invalidação relacionada a usuários
  invalidateUserData(userId?: string) {
    if (userId) {
      this.queryClient.invalidateQueries({ queryKey: ['users', userId] });
    }
    
    this.queryClient.invalidateQueries({ queryKey: ['users'] });
  }

  // Limpeza completa do cache
  clearAllCache() {
    this.queryClient.clear();
  }

  // Limpeza seletiva por padrão
  clearCacheByPattern(pattern: string[]) {
    this.queryClient.invalidateQueries({ queryKey: pattern });
  }
}

// Hook para usar o cache manager
export const useCacheInvalidation = () => {
  const queryClient = useQueryClient();
  return new CacheInvalidationManager(queryClient);
};
```

### Performance Monitoring

```typescript
// src/utils/performanceMonitor.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Medir tempo de execução de funções
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    this.recordMetric(name, end - start);
    return result;
  }

  // Medir tempo de execução de promises
  async measureAsync<T>(name: string, promise: Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await promise;
    const end = performance.now();
    
    this.recordMetric(name, end - start);
    return result;
  }

  // Registrar métrica
  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Manter apenas os últimos 100 valores
    if (values.length > 100) {
      values.shift();
    }
    
    // Log em desenvolvimento se for muito lento
    if (import.meta.env.DEV && value > 1000) {
      console.warn(`⚠️ Slow operation detected: ${name} took ${value.toFixed(2)}ms`);
    }
  }

  // Obter estatísticas
  getMetrics(name: string) {
    const values = this.metrics.get(name) || [];
    
    if (values.length === 0) {
      return null;
    }
    
    const sorted = [...values].sort((a, b) => a - b);
    
    return {
      count: values.length,
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)]
    };
  }

  // Relatório de performance
  getReport(): Record<string, any> {
    const report: Record<string, any> = {};
    
    for (const [name] of this.metrics) {
      report[name] = this.getMetrics(name);
    }
    
    return report;
  }

  // Limpar métricas
  clear() {
    this.metrics.clear();
  }
}

// Hook para monitoramento de performance
export const usePerformanceMonitor = () => {
  return PerformanceMonitor.getInstance();
};
```

## 🔄 WebSockets e Real-time

### SignalR Connection

```typescript
// src/services/signalr/signalrClient.ts
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAppStore } from '../../stores/appStore';
import { useAuthStore } from '../../stores/authStore';
import { WEBSOCKET_CONFIG } from '../../config/api.config';

export interface RealTimeEvent {
  type: string;
  data: any;
  timestamp: string;
  userId?: string;
}

export class SignalRClient {
  private connection: HubConnection | null = null;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = WEBSOCKET_CONFIG.maxReconnectAttempts;

  async connect(): Promise<void> {
    if (this.connection?.state === 'Connected') {
      return;
    }

    try {
      const authStore = useAuthStore.getState();
      const token = authStore.getToken();

      if (!token) {
        throw new Error('No authentication token available');
      }

      this.connection = new HubConnectionBuilder()
        .withUrl(`${WEBSOCKET_CONFIG.url}/notifications`, {
          accessTokenFactory: () => token
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.previousRetryCount < 3) {
              return 2000; // 2 segundos para as primeiras 3 tentativas
            } else if (retryContext.previousRetryCount < 6) {
              return 5000; // 5 segundos para as próximas 3
            } else {
              return 10000; // 10 segundos após isso
            }
          }
        })
        .configureLogging(import.meta.env.DEV ? LogLevel.Information : LogLevel.Warning)
        .build();

      // Event handlers
      this.setupEventHandlers();

      await this.connection.start();
      
      console.log('✅ SignalR connected');
      this.reconnectAttempts = 0;
      
      // Atualizar estado da conexão
      useAppStore.getState().setConnectionState(true, 'good');

    } catch (error) {
      console.error('❌ SignalR connection failed:', error);
      this.handleConnectionError(error);
    }
  }

  private setupEventHandlers(): void {
    if (!this.connection) return;

    // Eventos de conexão
    this.connection.onreconnecting(() => {
      console.log('🔄 SignalR reconnecting...');
      useAppStore.getState().setConnectionState(true, 'poor');
    });

    this.connection.onreconnected(() => {
      console.log('✅ SignalR reconnected');
      useAppStore.getState().setConnectionState(true, 'good');
      this.reconnectAttempts = 0;
    });

    this.connection.onclose((error) => {
      console.log('❌ SignalR disconnected:', error);
      useAppStore.getState().setConnectionState(false, 'offline');
      
      if (error) {
        this.handleConnectionError(error);
      }
    });

    // Event listeners para eventos específicos
    this.connection.on('CaseUpdated', (data) => {
      this.emit('case:updated', data);
    });

    this.connection.on('EvidenceUploaded', (data) => {
      this.emit('evidence:uploaded', data);
    });

    this.connection.on('AnalysisCompleted', (data) => {
      this.emit('analysis:completed', data);
    });

    this.connection.on('NotificationReceived', (data) => {
      this.emit('notification:received', data);
    });

    this.connection.on('UserStatusChanged', (data) => {
      this.emit('user:status', data);
    });

    // Evento genérico
    this.connection.on('RealTimeEvent', (event: RealTimeEvent) => {
      this.emit(event.type, event.data);
    });
  }

  private handleConnectionError(error: any): void {
    this.reconnectAttempts++;
    
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('❌ Max reconnection attempts reached');
      useAppStore.getState().addNotification({
        type: 'error',
        title: 'Conexão perdida',
        message: 'Não foi possível reconectar. Recarregue a página.'
      });
    }
  }

  // Adicionar listener para eventos
  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  // Remover listener
  off(event: string, callback: (data: any) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  // Emitir evento para listeners
  private emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Enviar mensagem para o servidor
  async send(method: string, ...args: any[]): Promise<void> {
    if (this.connection?.state === 'Connected') {
      try {
        await this.connection.invoke(method, ...args);
      } catch (error) {
        console.error(`Error sending ${method}:`, error);
        throw error;
      }
    } else {
      throw new Error('SignalR connection is not established');
    }
  }

  // Entrar em grupo
  async joinGroup(groupName: string): Promise<void> {
    await this.send('JoinGroup', groupName);
  }

  // Sair de grupo
  async leaveGroup(groupName: string): Promise<void> {
    await this.send('LeaveGroup', groupName);
  }

  // Desconectar
  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      this.listeners.clear();
    }
  }

  // Verificar status da conexão
  get isConnected(): boolean {
    return this.connection?.state === 'Connected';
  }
}

// Singleton instance
export const signalrClient = new SignalRClient();
```

### Real-time Hooks

```typescript
// src/hooks/useRealTime.ts
import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { signalrClient } from '../services/signalr/signalrClient';
import { useAppStore } from '../stores/appStore';
import { toast } from 'react-hot-toast';

export const useRealTime = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppStore();

  // Conectar quando o hook é montado
  useEffect(() => {
    signalrClient.connect();

    return () => {
      // Não desconectar aqui - manter conexão global
    };
  }, []);

  // Handlers para eventos específicos
  const handleCaseUpdate = useCallback((data: any) => {
    // Invalidar queries relacionadas ao caso
    queryClient.invalidateQueries({ queryKey: ['cases', data.caseId] });
    queryClient.invalidateQueries({ queryKey: ['cases'] });

    // Notificação
    addNotification({
      type: 'info',
      title: 'Caso Atualizado',
      message: `O caso "${data.title}" foi atualizado.`
    });
  }, [queryClient, addNotification]);

  const handleEvidenceUpload = useCallback((data: any) => {
    // Invalidar queries de evidência
    queryClient.invalidateQueries({ queryKey: ['evidence', 'case', data.caseId] });
    queryClient.invalidateQueries({ queryKey: ['cases', data.caseId] });

    addNotification({
      type: 'success',
      title: 'Nova Evidência',
      message: `Evidência "${data.filename}" foi adicionada ao caso.`
    });
  }, [queryClient, addNotification]);

  const handleAnalysisCompleted = useCallback((data: any) => {
    // Invalidar análises
    queryClient.invalidateQueries({ queryKey: ['analysis', data.analysisId] });
    queryClient.invalidateQueries({ queryKey: ['evidence', data.evidenceId] });

    addNotification({
      type: 'success',
      title: 'Análise Concluída',
      message: `A análise de "${data.evidenceName}" foi concluída.`
    });
  }, [queryClient, addNotification]);

  const handleNotification = useCallback((data: any) => {
    addNotification({
      type: data.type || 'info',
      title: data.title,
      message: data.message
    });
  }, [addNotification]);

  // Registrar listeners
  useEffect(() => {
    signalrClient.on('case:updated', handleCaseUpdate);
    signalrClient.on('evidence:uploaded', handleEvidenceUpload);
    signalrClient.on('analysis:completed', handleAnalysisCompleted);
    signalrClient.on('notification:received', handleNotification);

    return () => {
      signalrClient.off('case:updated', handleCaseUpdate);
      signalrClient.off('evidence:uploaded', handleEvidenceUpload);
      signalrClient.off('analysis:completed', handleAnalysisCompleted);
      signalrClient.off('notification:received', handleNotification);
    };
  }, [handleCaseUpdate, handleEvidenceUpload, handleAnalysisCompleted, handleNotification]);

  return {
    isConnected: signalrClient.isConnected,
    joinGroup: signalrClient.joinGroup.bind(signalrClient),
    leaveGroup: signalrClient.leaveGroup.bind(signalrClient),
    send: signalrClient.send.bind(signalrClient)
  };
};

// Hook específico para casos
export const useRealtimeCases = (caseId?: string) => {
  const realtime = useRealTime();

  useEffect(() => {
    if (caseId && realtime.isConnected) {
      // Entrar no grupo do caso para receber atualizações
      realtime.joinGroup(`case_${caseId}`);

      return () => {
        realtime.leaveGroup(`case_${caseId}`);
      };
    }
  }, [caseId, realtime.isConnected]);

  return realtime;
};
```

## 📤 Upload de Arquivos

### File Upload Hook

```typescript
// src/hooks/useFileUpload.ts
import { useState, useCallback } from 'react';
import { httpClient } from '../services/http/httpClient';
import { toast } from 'react-hot-toast';

export interface UploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  result?: any;
  error?: string;
}

export interface UploadOptions {
  maxFileSize?: number; // em bytes
  allowedTypes?: string[];
  maxFiles?: number;
  onProgress?: (progress: UploadProgress) => void;
  onComplete?: (result: any) => void;
  onError?: (error: string) => void;
}

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'video/mp4',
  'video/quicktime',
  'audio/mpeg',
  'audio/wav',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const useFileUpload = (options: UploadOptions = {}) => {
  const [uploads, setUploads] = useState<Map<string, UploadProgress>>(new Map());
  const [isUploading, setIsUploading] = useState(false);

  const {
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    maxFiles = 10,
    onProgress,
    onComplete,
    onError
  } = options;

  const validateFile = useCallback((file: File): string | null => {
    // Verificar tamanho
    if (file.size > maxFileSize) {
      return `Arquivo muito grande. Máximo: ${formatFileSize(maxFileSize)}`;
    }

    // Verificar tipo
    if (!allowedTypes.includes(file.type)) {
      return `Tipo de arquivo não permitido: ${file.type}`;
    }

    return null;
  }, [maxFileSize, allowedTypes]);

  const uploadFile = useCallback(async (
    file: File,
    endpoint: string,
    additionalData?: Record<string, any>
  ): Promise<any> => {
    const fileId = `${file.name}_${Date.now()}`;
    
    // Validar arquivo
    const validationError = validateFile(file);
    if (validationError) {
      const error = new Error(validationError);
      onError?.(validationError);
      throw error;
    }

    // Verificar limite de arquivos
    if (uploads.size >= maxFiles) {
      const error = new Error(`Máximo de ${maxFiles} arquivos permitidos`);
      onError?.(error.message);
      throw error;
    }

    // Inicializar progresso
    const initialProgress: UploadProgress = {
      file,
      progress: 0,
      status: 'pending'
    };

    setUploads(prev => new Map(prev.set(fileId, initialProgress)));
    setIsUploading(true);

    try {
      // Atualizar status para uploading
      setUploads(prev => new Map(prev.set(fileId, {
        ...initialProgress,
        status: 'uploading'
      })));

      const result = await httpClient.uploadFile(
        endpoint,
        file,
        additionalData,
        (progress) => {
          const updatedProgress: UploadProgress = {
            file,
            progress,
            status: 'uploading'
          };
          
          setUploads(prev => new Map(prev.set(fileId, updatedProgress)));
          onProgress?.(updatedProgress);
        }
      );

      // Upload concluído
      const completedProgress: UploadProgress = {
        file,
        progress: 100,
        status: 'completed',
        result: result.data
      };

      setUploads(prev => new Map(prev.set(fileId, completedProgress)));
      onComplete?.(result.data);

      toast.success(`${file.name} enviado com sucesso!`);
      return result.data;

    } catch (error: any) {
      const errorMessage = error.message || 'Erro no upload';
      
      const errorProgress: UploadProgress = {
        file,
        progress: 0,
        status: 'error',
        error: errorMessage
      };

      setUploads(prev => new Map(prev.set(fileId, errorProgress)));
      onError?.(errorMessage);

      toast.error(`Erro ao enviar ${file.name}: ${errorMessage}`);
      throw error;

    } finally {
      // Verificar se ainda há uploads em andamento
      const hasUploading = Array.from(uploads.values()).some(
        upload => upload.status === 'uploading'
      );
      
      if (!hasUploading) {
        setIsUploading(false);
      }
    }
  }, [uploads, validateFile, maxFiles, onProgress, onComplete, onError]);

  const uploadMultiple = useCallback(async (
    files: File[],
    endpoint: string,
    additionalData?: Record<string, any>
  ): Promise<any[]> => {
    const uploadPromises = files.map(file => 
      uploadFile(file, endpoint, additionalData)
    );

    try {
      const results = await Promise.allSettled(uploadPromises);
      
      // Filtrar resultados bem-sucedidos
      const successful = results
        .filter((result): result is PromiseFulfilledResult<any> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value);

      // Log de erros
      const failed = results
        .filter((result): result is PromiseRejectedResult => 
          result.status === 'rejected'
        );

      if (failed.length > 0) {
        console.error('Upload errors:', failed.map(f => f.reason));
      }

      return successful;

    } catch (error) {
      console.error('Multiple upload error:', error);
      throw error;
    }
  }, [uploadFile]);

  const removeUpload = useCallback((fileId: string) => {
    setUploads(prev => {
      const newMap = new Map(prev);
      newMap.delete(fileId);
      return newMap;
    });
  }, []);

  const clearUploads = useCallback(() => {
    setUploads(new Map());
    setIsUploading(false);
  }, []);

  const getUploadById = useCallback((fileId: string) => {
    return uploads.get(fileId);
  }, [uploads]);

  return {
    uploads: Array.from(uploads.entries()).map(([id, progress]) => ({
      id,
      ...progress
    })),
    isUploading,
    uploadFile,
    uploadMultiple,
    removeUpload,
    clearUploads,
    getUploadById,
    totalProgress: uploads.size > 0 
      ? Array.from(uploads.values()).reduce((sum, upload) => sum + upload.progress, 0) / uploads.size
      : 0
  };
};

// Utility function
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
```

### File Upload Component

```typescript
// src/components/FileUpload/FileUploadZone.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle, File } from 'lucide-react';
import { useFileUpload, UploadOptions } from '../../hooks/useFileUpload';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';

interface FileUploadZoneProps {
  endpoint: string;
  additionalData?: Record<string, any>;
  uploadOptions?: UploadOptions;
  onUploadComplete?: (results: any[]) => void;
  className?: string;
  children?: React.ReactNode;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  endpoint,
  additionalData,
  uploadOptions = {},
  onUploadComplete,
  className = '',
  children
}) => {
  const [dragActive, setDragActive] = useState(false);
  
  const {
    uploads,
    isUploading,
    uploadMultiple,
    removeUpload,
    clearUploads,
    totalProgress
  } = useFileUpload({
    ...uploadOptions,
    onComplete: (result) => {
      uploadOptions.onComplete?.(result);
      
      // Verificar se todos os uploads foram concluídos
      const allCompleted = uploads.every(upload => 
        upload.status === 'completed' || upload.status === 'error'
      );
      
      if (allCompleted) {
        const successful = uploads
          .filter(upload => upload.status === 'completed')
          .map(upload => upload.result);
        
        onUploadComplete?.(successful);
      }
    }
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      try {
        await uploadMultiple(acceptedFiles, endpoint, additionalData);
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
    setDragActive(false);
  }, [uploadMultiple, endpoint, additionalData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    multiple: true,
    disabled: isUploading
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'uploading':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive || dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {children || (
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Tipos suportados: PDF, imagens, vídeos, documentos
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress Overview */}
      {uploads.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {uploads.length} arquivo(s) • {Math.round(totalProgress)}% concluído
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={clearUploads}
              disabled={isUploading}
            >
              Limpar
            </Button>
          </div>
          
          <Progress value={totalProgress} className="mb-3" />

          {/* File List */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uploads.map((upload) => (
              <div key={upload.id} className="flex items-center space-x-3">
                {getStatusIcon(upload.status)}
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {upload.file.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${getStatusColor(upload.status)}`}>
                      {upload.status === 'uploading' ? `${upload.progress}%` : upload.status}
                    </span>
                    {upload.error && (
                      <span className="text-xs text-red-500">
                        {upload.error}
                      </span>
                    )}
                  </div>
                </div>

                {upload.status !== 'uploading' && (
                  <button
                    onClick={() => removeUpload(upload.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

## 🧪 Testes de Integração

### Integration Test Setup

```typescript
// src/tests/integration/setup.ts
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { ReactElement } from 'react';

// Mock do SignalR
jest.mock('../services/signalr/signalrClient', () => ({
  signalrClient: {
    connect: jest.fn(),
    disconnect: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    send: jest.fn(),
    joinGroup: jest.fn(),
    leaveGroup: jest.fn(),
    isConnected: true
  }
}));

// Mock do httpClient
jest.mock('../services/http/httpClient', () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    uploadFile: jest.fn()
  }
}));

// Provider wrapper para testes
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Não tentar novamente em testes
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Integration Test Example

```typescript
// src/tests/integration/CaseManagement.integration.test.tsx
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from './setup';
import { CaseManagement } from '../../components/CaseManagement/CaseManagement';
import { httpClient } from '../../services/http/httpClient';

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

describe('Case Management Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and display cases', async () => {
    // Arrange
    const mockCases = {
      success: true,
      data: {
        data: [
          {
            id: '1',
            title: 'Test Case 1',
            type: 'robbery',
            status: 'active',
            priority: 'high',
            createdAt: '2023-01-01T10:00:00Z',
            evidenceCount: 2,
            progress: 50
          },
          {
            id: '2',
            title: 'Test Case 2',
            type: 'fraud',
            status: 'closed',
            priority: 'medium',
            createdAt: '2023-01-02T10:00:00Z',
            evidenceCount: 5,
            progress: 100
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          pages: 1
        }
      }
    };

    mockHttpClient.get.mockResolvedValueOnce(mockCases);

    // Act
    render(<CaseManagement />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Test Case 1')).toBeInTheDocument();
      expect(screen.getByText('Test Case 2')).toBeInTheDocument();
    });

    expect(mockHttpClient.get).toHaveBeenCalledWith('/cases?page=1&limit=10');
  });

  it('should create new case', async () => {
    // Arrange
    const newCase = {
      title: 'New Test Case',
      type: 'assault',
      priority: 'high',
      description: 'Test case description'
    };

    const mockCreateResponse = {
      success: true,
      data: {
        id: '3',
        ...newCase,
        status: 'active',
        createdAt: '2023-01-03T10:00:00Z',
        evidenceCount: 0,
        progress: 0
      }
    };

    // Mock para listar casos (chamada inicial)
    mockHttpClient.get.mockResolvedValueOnce({
      success: true,
      data: { data: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } }
    });

    // Mock para criar caso
    mockHttpClient.post.mockResolvedValueOnce(mockCreateResponse);

    // Mock para recarregar lista após criação
    mockHttpClient.get.mockResolvedValueOnce({
      success: true,
      data: {
        data: [mockCreateResponse.data],
        pagination: { page: 1, limit: 10, total: 1, pages: 1 }
      }
    });

    render(<CaseManagement />);

    // Act
    const createButton = await screen.findByText('Novo Caso');
    fireEvent.click(createButton);

    // Preencher formulário
    const titleInput = screen.getByLabelText(/título/i);
    const typeSelect = screen.getByLabelText(/tipo/i);
    const prioritySelect = screen.getByLabelText(/prioridade/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);

    fireEvent.change(titleInput, { target: { value: newCase.title } });
    fireEvent.change(typeSelect, { target: { value: newCase.type } });
    fireEvent.change(prioritySelect, { target: { value: newCase.priority } });
    fireEvent.change(descriptionInput, { target: { value: newCase.description } });

    const submitButton = screen.getByText('Criar Caso');
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockHttpClient.post).toHaveBeenCalledWith('/cases', newCase);
    });

    await waitFor(() => {
      expect(screen.getByText('New Test Case')).toBeInTheDocument();
    });
  });

  it('should handle error when loading cases fails', async () => {
    // Arrange
    const errorMessage = 'Network error';
    mockHttpClient.get.mockRejectedValueOnce(new Error(errorMessage));

    // Act
    render(<CaseManagement />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar casos/i)).toBeInTheDocument();
    });
  });

  it('should filter cases by status', async () => {
    // Arrange
    const mockActiveCases = {
      success: true,
      data: {
        data: [
          {
            id: '1',
            title: 'Active Case',
            type: 'robbery',
            status: 'active',
            priority: 'high',
            createdAt: '2023-01-01T10:00:00Z',
            evidenceCount: 2,
            progress: 50
          }
        ],
        pagination: { page: 1, limit: 10, total: 1, pages: 1 }
      }
    };

    // Mock inicial
    mockHttpClient.get.mockResolvedValueOnce({
      success: true,
      data: { data: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } }
    });

    // Mock para filtro
    mockHttpClient.get.mockResolvedValueOnce(mockActiveCases);

    render(<CaseManagement />);

    // Act
    const statusFilter = await screen.findByLabelText(/status/i);
    fireEvent.change(statusFilter, { target: { value: 'active' } });

    // Assert
    await waitFor(() => {
      expect(mockHttpClient.get).toHaveBeenLastCalledWith('/cases?page=1&limit=10&status=active');
    });

    await waitFor(() => {
      expect(screen.getByText('Active Case')).toBeInTheDocument();
    });
  });
});
```

---

**Conclusão**: Este documento apresenta uma arquitetura robusta para integração frontend-backend, incluindo comunicação HTTP, gestão de estado, real-time com WebSockets, upload de arquivos e estratégias de teste abrangentes.

**Próximo**: [16-design-system.md](16-design-system.md) - Design System

---


[**retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
