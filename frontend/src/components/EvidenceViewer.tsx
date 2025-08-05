import React, { useState } from 'react';
import { Evidence } from '../types/api';

interface EvidenceViewerProps {
  evidences: Evidence[];
  onEvidenceSelect?: (evidence: Evidence) => void;
  selectedEvidenceId?: number | null;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ 
  evidences, 
  onEvidenceSelect,
  selectedEvidenceId 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<number | null>(null);

  const getEvidenceTypeLabel = (type: number) => {
    const types = {
      1: 'Document',
      2: 'Photo',
      3: 'Vidéo',
      4: 'Audio',
      5: 'Objet physique',
      6: 'Témoignage',
      7: 'Empreinte',
      8: 'ADN',
      9: 'Numérique',
      10: 'Autre'
    };
    return types[type as keyof typeof types] || 'Inconnu';
  };

  const getEvidenceCategoryLabel = (category: number) => {
    const categories = {
      1: 'Scène de crime',
      2: 'Suspect',
      3: 'Victime',
      4: 'Témoin',
      5: 'Environnement',
      6: 'Technologique',
      7: 'Médico-légal',
      8: 'Autre'
    };
    return categories[category as keyof typeof categories] || 'Inconnu';
  };

  const getEvidenceIcon = (type: number) => {
    switch (type) {
      case 1: // Document
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v1.816a2 2 0 00-2 2v8.184a2 2 0 002 2h16a2 2 0 002-2V8.816a2 2 0 00-2-2V5a2 2 0 00-2-2H4zm2 4v10h12V7H6zm-2 0h2V5h8v2H4v8z"/>
          </svg>
        );
      case 2: // Photo
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
          </svg>
        );
      case 3: // Vidéo
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
        );
      case 4: // Audio
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.764l-4.214-3.247c-.242-.186-.38-.469-.38-.764v-2.506c0-.295.138-.578.38-.764l4.214-3.247A1 1 0 019.383 3.076zM14 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  const filteredEvidences = evidences.filter(evidence => {
    if (filterType !== null && evidence.type !== filterType) return false;
    if (filterCategory !== null && evidence.category !== filterCategory) return false;
    return true;
  });

  const handleEvidenceClick = (evidence: Evidence) => {
    if (onEvidenceSelect) {
      onEvidenceSelect(evidence);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Visualizador de Evidências ({filteredEvidences.length})
        </h3>
        
        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                viewMode === 'grid'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                viewMode === 'list'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par type
          </label>
          <select
            value={filterType || ''}
            onChange={(e) => setFilterType(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Tous les types</option>
            <option value="1">Document</option>
            <option value="2">Photo</option>
            <option value="3">Vidéo</option>
            <option value="4">Audio</option>
            <option value="5">Objet physique</option>
            <option value="6">Témoignage</option>
            <option value="7">Empreinte</option>
            <option value="8">ADN</option>
            <option value="9">Numérique</option>
            <option value="10">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par catégorie
          </label>
          <select
            value={filterCategory || ''}
            onChange={(e) => setFilterCategory(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Toutes les catégories</option>
            <option value="1">Scène de crime</option>
            <option value="2">Suspect</option>
            <option value="3">Victime</option>
            <option value="4">Témoin</option>
            <option value="5">Environnement</option>
            <option value="6">Technologique</option>
            <option value="7">Médico-légal</option>
            <option value="8">Autre</option>
          </select>
        </div>
      </div>

      {/* Evidence display */}
      {filteredEvidences.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune évidence trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">Modifiez vos critères de filtrage.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {filteredEvidences.map((evidence) => (
            <div
              key={evidence.evidenceId}
              onClick={() => handleEvidenceClick(evidence)}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedEvidenceId === evidence.evidenceId
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              } ${!evidence.isAvailable ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 p-2 rounded-lg ${
                  evidence.isAvailable ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {getEvidenceIcon(evidence.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {evidence.name}
                    </h4>
                    {evidence.requiresAnalysis && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Analyse requise
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {evidence.description}
                  </p>
                  
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{getEvidenceTypeLabel(evidence.type)}</span>
                    <span>{getEvidenceCategoryLabel(evidence.category)}</span>
                  </div>
                  
                  <div className="mt-1 text-xs text-gray-500">
                    📍 {evidence.location}
                  </div>
                  
                  <div className="mt-1 text-xs text-gray-500">
                    🕒 {new Date(evidence.collectedAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EvidenceViewer;
