import React from 'react';

interface PoliceSystemHeaderProps {
  caseId: string;
  investigatorName: string;
  onExit: () => void;
}

export const PoliceSystemHeader: React.FC<PoliceSystemHeaderProps> = ({
  caseId,
  investigatorName,
  onExit
}) => {
  return (
    <div className="bg-black border-b border-green-400/30 p-4">
      <div className="flex items-center justify-between">
        {/* Sistema de janela (esquerda) */}
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        
        {/* Título do sistema (centro) */}
        <div className="text-green-400 font-mono text-lg font-bold">
          POLICE INVESTIGATION SYSTEM v2.1.4
        </div>
        
        {/* Botão de saída (direita) */}
        <button
          onClick={onExit}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors font-mono"
        >
          EXIT
        </button>
      </div>
      
      {/* Segunda linha com informações do caso e detetive */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-green-400/20">
        <div className="text-sm font-mono text-green-400">
          CASE #{caseId.toString().padStart(6, '0')} | DETECTIVE: {investigatorName}
        </div>
        <div className="text-sm font-mono text-green-400">
          {new Date().toLocaleString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}
        </div>
      </div>
    </div>
  );
};
