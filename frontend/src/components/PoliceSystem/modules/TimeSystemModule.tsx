import React from 'react';
import { GameTimeSystem, TimedAnalysis } from '../../../types/policeSystem';

interface TimeSystemModuleProps {
  gameTime: GameTimeSystem;
  timedAnalyses: TimedAnalysis[];
  onPauseTime: () => void;
  onResumeTime: () => void;
  onSetTimeSpeed: (speed: number) => void;
  getCurrentGameTime: () => number;
  formatGameTime: (timestamp?: number) => string;
}

export const TimeSystemModule: React.FC<TimeSystemModuleProps> = ({
  gameTime,
  timedAnalyses,
  onPauseTime,
  onResumeTime,
  onSetTimeSpeed,
  getCurrentGameTime,
  formatGameTime,
}) => {
  // Usar getCurrentGameTime() para garantir que sempre pegue o tempo mais atual
  const currentTime = formatGameTime(getCurrentGameTime());
  
  // Análises pendentes e completadas
  const pendingAnalyses = timedAnalyses.filter(a => !a.isCompleted);
  const completedAnalyses = timedAnalyses.filter(a => a.isCompleted);

  const timeSpeedOptions = [
    { value: 1, label: '1x (Normal)' },
    { value: 3, label: '3x (Rápido)' },
    { value: 6, label: '6x (Muito Rápido)' },
    { value: 12, label: '12x (Ultra Rápido)' },
    { value: 24, label: '24x (Máximo)' },
  ];

  const formatDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const getAnalysisProgress = (analysis: TimedAnalysis) => {
    const currentTime = getCurrentGameTime();
    const elapsed = currentTime - analysis.startTime;
    const progress = Math.min(100, (elapsed / analysis.duration) * 100);
    return Math.max(0, progress);
  };

  const getTimeRemaining = (analysis: TimedAnalysis) => {
    const currentTime = getCurrentGameTime();
    const elapsed = currentTime - analysis.startTime;
    const remaining = analysis.duration - elapsed;
    return Math.max(0, remaining);
  };

  return (
    <div className="space-y-6">
      {/* Header do Sistema Temporal */}
      <div className="border border-green-500 bg-green-900/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-green-400 font-mono text-xl">SISTEMA TEMPORAL</h2>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 font-mono">STATUS:</span>
            <span className={`font-mono ${gameTime.isPaused ? 'text-yellow-400' : 'text-green-400'}`}>
              {gameTime.isPaused ? 'PAUSADO' : 'ATIVO'}
            </span>
          </div>
        </div>

        {/* Relógio Principal */}
        <div className="text-center mb-6">
          <div className="text-4xl font-mono text-green-400 mb-2">
            {currentTime}
          </div>
          <div className="text-sm text-green-400/70 font-mono">
            Velocidade: {gameTime.timeSpeed}x | 
            {gameTime.isPaused ? ' PAUSADO' : ' ATIVO'}
          </div>
        </div>

        {/* Controles de Tempo */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={gameTime.isPaused ? onResumeTime : onPauseTime}
            className={`p-3 font-mono border transition-colors ${
              gameTime.isPaused 
                ? 'border-green-500 bg-green-600 hover:bg-green-700 text-black'
                : 'border-yellow-500 bg-yellow-600 hover:bg-yellow-700 text-black'
            }`}
          >
            {gameTime.isPaused ? '▶ RESUMIR' : '⏸ PAUSAR'}
          </button>
          
          <select
            value={gameTime.timeSpeed}
            onChange={(e) => onSetTimeSpeed(Number(e.target.value))}
            className="p-3 font-mono bg-black border border-green-500 text-green-400"
          >
            {timeSpeedOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Análises em Andamento */}
      {pendingAnalyses.length > 0 && (
        <div className="border border-blue-500 bg-blue-900/20 p-4">
          <h3 className="text-blue-400 font-mono text-lg mb-4">
            ANÁLISES EM ANDAMENTO ({pendingAnalyses.length})
          </h3>
          
          <div className="space-y-3">
            {pendingAnalyses.map(analysis => {
              const progress = getAnalysisProgress(analysis);
              const remaining = getTimeRemaining(analysis);
              
              return (
                <div key={analysis.id} className="border border-blue-400/30 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-mono text-sm">
                      {analysis.analysisType} - Evidência {analysis.evidenceId}
                    </span>
                    <span className="text-blue-400/70 font-mono text-xs">
                      {formatDuration(remaining)} restantes
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div 
                      className="bg-blue-500 h-2 rounded transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="text-blue-400/70 font-mono text-xs mt-1">
                    {progress.toFixed(1)}% concluído
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Análises Completadas */}
      {completedAnalyses.length > 0 && (
        <div className="border border-green-500 bg-green-900/20 p-4">
          <h3 className="text-green-400 font-mono text-lg mb-4">
            ANÁLISES COMPLETADAS ({completedAnalyses.length})
          </h3>
          
          <div className="space-y-2">
            {completedAnalyses.slice(-5).map(analysis => (
              <div key={analysis.id} className="border border-green-400/30 p-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-mono text-sm">
                    {analysis.analysisType} - Evidência {analysis.evidenceId}
                  </span>
                  <span className="text-green-400/70 font-mono text-xs">
                    ✓ Concluída em {formatGameTime(analysis.result?.completedAt)}
                  </span>
                </div>
                
                {analysis.result && (
                  <div className="text-green-400/70 font-mono text-xs mt-1">
                    Confiança: {(analysis.result.confidence * 100).toFixed(0)}% | 
                    Técnico: {analysis.result.technician}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informações do Sistema */}
      <div className="border border-gray-500 bg-gray-900/20 p-4">
        <h3 className="text-gray-400 font-mono text-lg mb-4">INFORMAÇÕES DO SISTEMA</h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div>
            <span className="text-gray-400">Início da Investigação:</span>
            <div className="text-white">{formatGameTime(gameTime.gameStartTime)}</div>
          </div>
          
          <div>
            <span className="text-gray-400">Tempo Decorrido:</span>
            <div className="text-white">
              {formatDuration(getCurrentGameTime() - gameTime.gameStartTime)}
            </div>
          </div>
          
          <div>
            <span className="text-gray-400">Total de Análises:</span>
            <div className="text-white">{timedAnalyses.length}</div>
          </div>
          
          <div>
            <span className="text-gray-400">Análises Pendentes:</span>
            <div className="text-white">{pendingAnalyses.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
