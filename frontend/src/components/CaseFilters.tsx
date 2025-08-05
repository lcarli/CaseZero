import React from 'react';
import { useTranslation } from 'react-i18next';

interface CaseFiltersProps {
  totalCases: number;
  filters: {
    difficulty: number | null;
    status: number | null;
    isTutorial: boolean | null;
  };
  onFilterChange: (filters: any) => void;
}

const CaseFilters: React.FC<CaseFiltersProps> = ({ totalCases, filters, onFilterChange }) => {
  const { t } = useTranslation();
  
  const handleDifficultyChange = (difficulty: number | null) => {
    onFilterChange({ ...filters, difficulty });
  };

  const handleStatusChange = (status: number | null) => {
    onFilterChange({ ...filters, status });
  };

  const handleTutorialChange = (isTutorial: boolean | null) => {
    onFilterChange({ ...filters, isTutorial });
  };

  const clearFilters = () => {
    onFilterChange({ difficulty: null, status: null, isTutorial: null });
  };

  const hasActiveFilters = filters.difficulty !== null || filters.status !== null || filters.isTutorial !== null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{t('filters.title')}</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {t('filters.clearFilters')}
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.difficulty')}
          </label>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => handleDifficultyChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">{t('filters.all')}</option>
            <option value="1">{t('filters.difficulty1')}</option>
            <option value="2">{t('filters.difficulty2')}</option>
            <option value="3">{t('filters.difficulty3')}</option>
            <option value="4">{t('filters.difficulty4')}</option>
            <option value="5">{t('filters.difficulty5')}</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.status')}
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleStatusChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">{t('filters.all')}</option>
            <option value="1">{t('filters.status1')}</option>
            <option value="2">{t('filters.status2')}</option>
            <option value="3">{t('filters.status3')}</option>
            <option value="4">{t('filters.status4')}</option>
          </select>
        </div>

        {/* Tutorial Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.type')}
          </label>
          <select
            value={filters.isTutorial === null ? '' : filters.isTutorial.toString()}
            onChange={(e) => handleTutorialChange(e.target.value === '' ? null : e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">{t('filters.all')}</option>
            <option value="true">{t('filters.tutorial')}</option>
            <option value="false">{t('filters.real')}</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <span className="font-medium">{totalCases}</span> {totalCases === 1 ? t('dashboard.caseFound') : t('dashboard.casesFound')}
      </div>
    </div>
  );
};

export default CaseFilters;
