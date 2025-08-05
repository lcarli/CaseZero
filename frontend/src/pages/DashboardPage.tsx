import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Case } from '../types/api';
import { caseService } from '../services/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsSection from '../components/StatsSection';
import CaseFilters from '../components/CaseFilters';
import SearchBar from '../components/SearchBar';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    difficulty: null as number | null,
    status: null as number | null,
    isTutorial: null as boolean | null,
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les affaires selon les critères sélectionnés
  const filteredCases = useMemo(() => {
    return cases.filter(caseItem => {
      // Filtrage par terme de recherche
      if (searchTerm && !caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !caseItem.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtrage par critères
      if (filters.difficulty !== null && caseItem.difficulty !== filters.difficulty) {
        return false;
      }
      if (filters.status !== null && caseItem.status !== filters.status) {
        return false;
      }
      if (filters.isTutorial !== null && caseItem.isTutorial !== filters.isTutorial) {
        return false;
      }
      return true;
    });
  }, [cases, filters, searchTerm]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const fetchedCases = await caseService.getCases();
        setCases(fetchedCases);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des affaires');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const getDifficultyLabel = (difficulty: number) => {
    const labels = {
      1: t('dashboard.difficulty.tutorial'),
      2: t('dashboard.difficulty.easy'), 
      3: t('dashboard.difficulty.medium'),
      4: t('dashboard.difficulty.hard'),
      5: t('dashboard.difficulty.expert')
    };
    return labels[difficulty as keyof typeof labels] || t('dashboard.difficulty.unknown');
  };

  const getStatusLabel = (status: number) => {
    const labels = {
      1: t('dashboard.status.open'),
      2: t('dashboard.status.inProgress'),
      3: t('dashboard.status.solved'),
      4: t('dashboard.status.closed'),
      5: t('dashboard.status.archived')
    };
    return labels[status as keyof typeof labels] || t('dashboard.status.unknown');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Case Zero
                  </h1>
                  <p className="text-xs text-slate-400">{t('dashboard.subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-400">{user?.role} • {user?.department}</p>
                <p className="text-xs text-indigo-400">{t('dashboard.badge')}: #{user?.badge}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25"
              >
                {t('dashboard.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          {!loading && user && (
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-0 right-0 -mt-4 -mr-16 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-2 ring-white/30">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {t('dashboard.welcome', { firstName: user.firstName, lastName: user.lastName })}
                  </h2>
                  <div className="flex items-center space-x-4 text-indigo-200 mb-3">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      {user.role}
                    </span>
                    <span className="text-sm">
                      {t('dashboard.badge')} #{user.badge}
                    </span>
                    <span className="text-sm">
                      {user.department}
                    </span>
                  </div>
                  <p className="text-indigo-100 text-lg">
                    {t('dashboard.welcomeMessage')}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {!loading && !error && cases.length > 0 && (
            <StatsSection
              totalCases={filteredCases.length}
              tutorialCases={filteredCases.filter(c => c.isTutorial).length}
              averageDifficulty={filteredCases.length > 0 ? filteredCases.reduce((sum, c) => sum + c.difficulty, 0) / filteredCases.length : 0}
            />
          )}
          
          {/* Barre de recherche */}
          {!loading && !error && cases.length > 0 && (
            <div className="mb-6">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder={t('dashboard.searchPlaceholder')}
              />
            </div>
          )}
          
          {/* Filtres */}
          {!loading && !error && cases.length > 0 && (
            <CaseFilters
              totalCases={filteredCases.length}
              filters={filters}
              onFilterChange={setFilters}
            />
          )}
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">{t('dashboard.availableCases')}</h2>
            
            {/* Actions rapides */}
            <div className="flex space-x-3">
              <button
                onClick={() => setFilters({ ...filters, isTutorial: true })}
                className="group inline-flex items-center px-4 py-2 border border-emerald-500/50 text-sm font-medium rounded-xl text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 backdrop-blur-sm transition-all duration-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {t('dashboard.tutorials')}
              </button>
              
              <button
                onClick={() => setFilters({ difficulty: null, status: null, isTutorial: null })}
                className="group inline-flex items-center px-4 py-2 border border-indigo-500/50 text-sm font-medium rounded-xl text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
                {t('dashboard.allCases')}
              </button>
            </div>
          </div>
          
          {loading && <LoadingSpinner text={t('dashboard.loading')} />}
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.caseId}
                  className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                >
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-indigo-500/20 rounded-2xl transition-all duration-300"></div>
                  
                  {/* Status indicator */}
                  <div className={`absolute top-4 right-4 h-3 w-3 rounded-full ${
                    caseItem.status === 1 ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 
                    caseItem.status === 2 ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 
                    caseItem.status === 3 ? 'bg-blue-400 shadow-lg shadow-blue-400/50' : 
                    'bg-slate-400 shadow-lg shadow-slate-400/50'
                  }`}>
                  </div>
                  
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200 line-clamp-2">
                        {caseItem.title}
                      </h3>
                      {caseItem.isTutorial && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 ml-2">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {t('dashboard.tutorial')}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                      {caseItem.description}
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      {/* Difficulty with enhanced visual indicator */}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          {t('dashboard.labels.difficulty')}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-medium">{getDifficultyLabel(caseItem.difficulty)}</span>
                          <div className="flex space-x-1">
                            {[1,2,3,4,5].map((star) => (
                              <svg 
                                key={star}
                                className={`w-4 h-4 transition-colors ${
                                  star <= caseItem.difficulty ? 'text-amber-400' : 'text-slate-600'
                                }`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Status */}
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          {t('dashboard.labels.status')}
                        </span>
                        <span className="text-white font-medium">{getStatusLabel(caseItem.status)}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          {t('dashboard.labels.estimatedTime')}
                        </span>
                        <span className="text-white font-medium">{caseItem.estimatedTimeMinutes} {t('dashboard.labels.minutes')}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                          {t('dashboard.labels.location')}
                        </span>
                        <span className="text-white font-medium truncate ml-2">{caseItem.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-md">
                        {caseItem.caseNumber}
                      </span>
                      <Link
                        to={`/cases/${caseItem.caseId}`}
                        className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
                      >
                        <span>{t('dashboard.investigate')}</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && !error && filteredCases.length === 0 && cases.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-medium text-white mb-2">{t('dashboard.noCasesFound')}</h3>
                <p className="text-slate-400">{t('dashboard.noCasesFoundMessage')}</p>
              </div>
            </div>
          )}
          
          {!loading && !error && cases.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-slate-400 text-lg">{t('dashboard.noCasesAvailable')}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
