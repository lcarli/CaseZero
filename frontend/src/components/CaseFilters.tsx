import React from 'react';

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
        <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Effacer les filtres
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulté
          </label>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => handleDifficultyChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Toutes les difficultés</option>
            <option value="1">Tutoriel</option>
            <option value="2">Facile</option>
            <option value="3">Moyen</option>
            <option value="4">Difficile</option>
            <option value="5">Expert</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleStatusChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Tous les statuts</option>
            <option value="1">Ouvert</option>
            <option value="2">En cours</option>
            <option value="3">Résolu</option>
            <option value="4">Fermé</option>
            <option value="5">Archivé</option>
          </select>
        </div>

        {/* Tutorial Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={filters.isTutorial === null ? '' : filters.isTutorial.toString()}
            onChange={(e) => handleTutorialChange(e.target.value === '' ? null : e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Tous les types</option>
            <option value="true">Tutoriels uniquement</option>
            <option value="false">Affaires normales</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <span className="font-medium">{totalCases}</span> affaire{totalCases > 1 ? 's' : ''} trouvée{totalCases > 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default CaseFilters;
