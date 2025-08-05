import React, { useState } from 'react';
import { Analysis } from '../types/api';
import LoadingSpinner from './LoadingSpinner';

interface AnalysisSystemProps {
  analyses: Analysis[];
  isLoading?: boolean;
  onRequestAnalysis?: (evidenceId: number, analysisType: string) => void;
}

const AnalysisSystem: React.FC<AnalysisSystemProps> = ({
  analyses,
  isLoading = false,
  onRequestAnalysis
}) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [filterStatus, setFilterStatus] = useState<number | 'all'>('all');

  const filteredAnalyses = analyses.filter(analysis => 
    filterStatus === 'all' || analysis.status === filterStatus
  );

  const getStatusBadge = (status: number) => {
    const statusConfig = {
      0: { color: 'bg-yellow-100 text-yellow-800', text: 'En attente' },
      1: { color: 'bg-blue-100 text-blue-800', text: 'En cours' },
      2: { color: 'bg-green-100 text-green-800', text: 'Terminée' },
      3: { color: 'bg-red-100 text-red-800', text: 'Échec' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { color: 'bg-gray-100 text-gray-800', text: 'Inconnu' };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getConfidenceBadge = (level: number) => {
    if (level >= 80) return { color: 'bg-green-100 text-green-800', text: 'Haute' };
    if (level >= 60) return { color: 'bg-yellow-100 text-yellow-800', text: 'Moyenne' };
    return { color: 'bg-red-100 text-red-800', text: 'Faible' };
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête et filtres */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Système d'Analyses</h2>
        
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value={0}>En attente</option>
            <option value={1}>En cours</option>
            <option value={2}>Terminées</option>
            <option value={3}>Échec</option>
          </select>
        </div>
      </div>

      {/* Liste des analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panneau des analyses */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Analyses ({filteredAnalyses.length})
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAnalyses.map((analysis) => (
              <div
                key={analysis.analysisId}
                onClick={() => setSelectedAnalysis(analysis)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedAnalysis?.analysisId === analysis.analysisId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{analysis.evidenceName}</h4>
                  {getStatusBadge(analysis.status)}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  Analyse de l'évidence #{analysis.evidenceId}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Analyste: {analysis.analyzerName}</span>
                  <span>Confiance: {analysis.confidenceLevel}%</span>
                </div>
                
                {analysis.analyzedAt && (
                  <div className="text-xs text-gray-500 mt-1">
                    Analysée le: {new Date(analysis.analyzedAt).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </div>
            ))}
            
            {filteredAnalyses.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Aucune analyse trouvée
              </div>
            )}
          </div>
        </div>

        {/* Panneau de détails */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Détails de l'Analyse</h3>
          
          {selectedAnalysis ? (
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {selectedAnalysis.evidenceName}
                  </h4>
                  <p className="text-gray-600">
                    Évidence #{selectedAnalysis.evidenceId}
                  </p>
                </div>
                {getStatusBadge(selectedAnalysis.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Analyste:</span>
                  <p>{selectedAnalysis.analyzerName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Analysée le:</span>
                  <p>{new Date(selectedAnalysis.analyzedAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Niveau de confiance:</span>
                  <div className="flex items-center space-x-2">
                    <span>{selectedAnalysis.confidenceLevel}%</span>
                    <span className={`px-2 py-1 rounded text-xs ${getConfidenceBadge(selectedAnalysis.confidenceLevel).color}`}>
                      {getConfidenceBadge(selectedAnalysis.confidenceLevel).text}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Tags:</span>
                  <p>{selectedAnalysis.tags || 'Aucun'}</p>
                </div>
              </div>

              {selectedAnalysis.results && (
                <div>
                  <span className="font-medium text-gray-700">Résultats:</span>
                  <div className="mt-2 p-3 bg-gray-50 rounded border">
                    <p className="text-gray-800">{selectedAnalysis.results}</p>
                  </div>
                </div>
              )}

              {selectedAnalysis.notes && (
                <div>
                  <span className="font-medium text-gray-700">Notes:</span>
                  <div className="mt-2 p-3 bg-gray-50 rounded border">
                    <p className="text-gray-800">{selectedAnalysis.notes}</p>
                  </div>
                </div>
              )}

              {/* Barre de progression de confiance */}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Niveau de confiance</span>
                  <span className="text-sm text-gray-600">{selectedAnalysis.confidenceLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      selectedAnalysis.confidenceLevel >= 80 ? 'bg-green-500' :
                      selectedAnalysis.confidenceLevel >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${selectedAnalysis.confidenceLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-500">
              Sélectionnez une analyse pour voir les détails
            </div>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      {onRequestAnalysis && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => onRequestAnalysis(1, 'chemical')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Demander Analyse Chimique
            </button>
            <button
              onClick={() => onRequestAnalysis(1, 'fingerprint')}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Demander Analyse Dactyloscopique
            </button>
            <button
              onClick={() => onRequestAnalysis(1, 'dna')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Demander Analyse ADN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisSystem;
