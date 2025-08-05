import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore, initializeAuth } from './store/authStore';
import { ToastProvider } from './components/ToastProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CaseDetailPage from './pages/CaseDetailPage';
import InvestigationPage from './pages/InvestigationPage';
import CaseInvestigationPage from './pages/CaseInvestigationPage';
import GameTester from './components/GameTester';
import './styles/globals.css';

// Configuration de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Initialiser l'authentification au démarrage
    initializeAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
          <div className="App">
            <Routes>
            {/* Routes publiques */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
              } 
            />
            
            {/* Routes protégées */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/cases/:caseId"
              element={
                <ProtectedRoute>
                  <CaseDetailPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/cases/:caseId/investigation"
              element={
                <ProtectedRoute>
                  <CaseInvestigationPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/investigation/:sessionId"
              element={
                <ProtectedRoute>
                  <InvestigationPage />
                </ProtectedRoute>
              }
            />
            
            {/* Route de test pour le système de cas */}
            <Route
              path="/test-game"
              element={<GameTester />}
            />
            
            {/* Page d'accès non autorisé */}
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Accès non autorisé
                    </h1>
                    <p className="text-gray-600 mb-6">
                      Vous n'avez pas les permissions nécessaires pour accéder à cette page.
                    </p>
                    <button
                      onClick={() => window.history.back()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                      Retour
                    </button>
                  </div>
                </div>
              }
            />
            
            {/* Route par défaut */}
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              }
            />
            
            {/* Route 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      Page non trouvée
                    </h1>
                    <p className="text-gray-600 mb-6">
                      La page que vous recherchez n'existe pas.
                    </p>
                    <button
                      onClick={() => window.history.back()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                      Retour
                    </button>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
