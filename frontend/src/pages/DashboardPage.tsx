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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Case Zero</h1>
              <p className="text-sm text-gray-600">{t('dashboard.subtitle')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.role} - {user?.department}</p>
                <p className="text-xs text-gray-500">{t('dashboard.badge')}: {user?.badge}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
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
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">
                    {t('dashboard.welcome', { firstName: user.firstName, lastName: user.lastName })}
                  </h2>
                  <p className="text-indigo-100">
                    {user.role} | {t('dashboard.badge')} #{user.badge} | {user.department}
                  </p>
                  <p className="text-sm text-indigo-200 mt-1">
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
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.availableCases')}</h2>
            
            {/* Actions rapides */}
            <div className="flex space-x-3">
              <button
                onClick={() => setFilters({ ...filters, isTutorial: true })}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {t('dashboard.tutorials')}
              </button>
              
              <button
                onClick={() => setFilters({ difficulty: null, status: null, isTutorial: null })}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
                {t('dashboard.allCases')}
              </button>
            </div>
          </div>
          
          {loading && <LoadingSpinner text={t('dashboard.loading')} />}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.caseId}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300"
                >
                  {/* Case Header with Status Color */}
                  <div className={`h-2 ${caseItem.status === 1 ? 'bg-green-400' : 
                    caseItem.status === 2 ? 'bg-yellow-400' : 
                    caseItem.status === 3 ? 'bg-blue-400' : 'bg-gray-400'}`}>
                  </div>
                  
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {caseItem.title}
                      </h3>
                      <div className="flex space-x-1">
                        {caseItem.isTutorial && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {t('dashboard.tutorial')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {caseItem.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      {/* Difficulty with visual indicator */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          {t('dashboard.labels.difficulty')}:
                        </span>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{getDifficultyLabel(caseItem.difficulty)}</span>
                          <div className="flex space-x-1">
                            {[1,2,3,4,5].map((star) => (
                              <svg 
                                key={star}
                                className={`w-3 h-3 ${star <= caseItem.difficulty ? 'text-yellow-400' : 'text-gray-300'}`}
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
                        <span className="text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          {t('dashboard.labels.status')}:
                        </span>
                        <span className="font-medium">{getStatusLabel(caseItem.status)}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          {t('dashboard.labels.estimatedTime')}:
                        </span>
                        <span className="font-medium">{caseItem.estimatedTimeMinutes} {t('dashboard.labels.minutes')}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                          {t('dashboard.labels.location')}:
                        </span>
                        <span className="font-medium">{caseItem.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {caseItem.caseNumber}
                      </span>
                      <Link
                        to={`/cases/${caseItem.caseId}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {t('dashboard.investigate')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && !error && filteredCases.length === 0 && cases.length > 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t('dashboard.noCasesFound')}</h3>
              <p className="mt-1 text-sm text-gray-500">{t('dashboard.noCasesFoundMessage')}</p>
            </div>
          )}
          
          {!loading && !error && cases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('dashboard.noCasesAvailable')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
