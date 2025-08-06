import { useState, useEffect, useCallback, useRef } from 'react';
import { PoliceSystemState, PoliceSystemActions, PoliceSystemEvent, TimedAnalysis, PoliceModuleType } from '../types/policeSystem';

export const usePoliceSystem = (caseId: string, investigatorName: string) => {
  const DEFAULT_TIME_SPEED = 6; // 6x mais rápido que o tempo real
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<PoliceSystemState>(() => {
    const now = Date.now();
    // Criar data para hoje às 8:00 AM
    const today = new Date();
    today.setHours(8, 0, 0, 0); // 8:00 AM, 0 min, 0 seg, 0 ms
    const gameStartTime = today.getTime();
    
    return {
      caseId,
      investigatorName,
      activeModule: 'briefing' as PoliceModuleType,
      systemStatus: {
        database: 'ONLINE',
        forensics: 'ONLINE', 
        network: 'SECURE'
      },
      examinedEvidences: new Set(),
      pendingAnalyses: new Set(),
      investigationNotes: '',
      events: [],
      gameTime: {
        gameTime: gameStartTime,
        timeSpeed: DEFAULT_TIME_SPEED,
        isPaused: false,
        gameStartTime: gameStartTime,
        realStartTime: now,
      },
      timedAnalyses: [],
    };
  });

  // Timer principal do jogo
  useEffect(() => {
    if (state.gameTime.isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      
      setState(prevState => {
        const realElapsed = now - prevState.gameTime.realStartTime;
        const gameElapsed = realElapsed * prevState.gameTime.timeSpeed;
        const newGameTime = prevState.gameTime.gameStartTime + gameElapsed;

        // Debug: Log para verificar se está acelerando
        if (Math.floor(now / 1000) % 5 === 0) { // Log a cada 5 segundos
          console.log(`Debug Time - Real elapsed: ${realElapsed}ms, Game elapsed: ${gameElapsed}ms, Speed: ${prevState.gameTime.timeSpeed}x`);
          console.log(`Old time: ${new Date(prevState.gameTime.gameTime).toLocaleTimeString()}, New time: ${new Date(newGameTime).toLocaleTimeString()}`);
        }

        // Verificar análises completadas
        const completedAnalyses = prevState.timedAnalyses.filter(
          analysis => !analysis.isCompleted && (newGameTime >= analysis.startTime + analysis.duration)
        );

        // Marcar análises como completadas
        const updatedAnalyses = prevState.timedAnalyses.map(analysis => {
          if (completedAnalyses.some(completed => completed.id === analysis.id)) {
            return {
              ...analysis,
              isCompleted: true,
              result: {
                id: `result_${analysis.id}`,
                evidenceId: analysis.evidenceId,
                analysisType: analysis.analysisType,
                findings: [`Análise ${analysis.analysisType} concluída`],
                confidence: 0.85,
                technician: 'Dr. Forense',
                completedAt: newGameTime,
              }
            };
          }
          return analysis;
        });

        return {
          ...prevState,
          gameTime: {
            ...prevState.gameTime,
            gameTime: newGameTime,
          },
          timedAnalyses: updatedAnalyses,
        };
      });
    }, 100); // Update a cada 100ms para suavidade

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.gameTime.isPaused]); // Remover timeSpeed das dependências para evitar recriação desnecessária

  const addEvent = useCallback((event: Omit<PoliceSystemEvent, 'id' | 'timestamp'>) => {
    setState(prev => ({
      ...prev,
      events: [
        ...prev.events,
        {
          ...event,
          id: `event_${Date.now()}`,
          timestamp: new Date().toISOString(),
        }
      ]
    }));
  }, []);

  const actions: PoliceSystemActions = {
    setActiveModule: useCallback((moduleId: PoliceModuleType) => {
      setState(prev => ({ ...prev, activeModule: moduleId }));
    }, []),

    examineEvidence: useCallback((evidenceId: string) => {
      setState(prev => ({
        ...prev,
        examinedEvidences: new Set([...prev.examinedEvidences, evidenceId])
      }));
      addEvent({
        action: 'EVIDENCE_EXAMINED',
        details: `Evidência ${evidenceId} examinada`,
        module: 'evidence'
      });
    }, [addEvent]),

    updateNotes: useCallback((notes: string) => {
      setState(prev => ({ ...prev, investigationNotes: notes }));
    }, []),

    addEvent,

    // Ações temporais
    pauseTime: useCallback(() => {
      setState(prev => ({
        ...prev,
        gameTime: { ...prev.gameTime, isPaused: true }
      }));
    }, []),

    resumeTime: useCallback(() => {
      setState(prev => ({
        ...prev,
        gameTime: { 
          ...prev.gameTime, 
          isPaused: false,
          realStartTime: Date.now() - ((prev.gameTime.gameTime - prev.gameTime.gameStartTime) / prev.gameTime.timeSpeed)
        }
      }));
    }, []),

    setTimeSpeed: useCallback((speed: number) => {
      setState(prev => {
        const now = Date.now();
        const currentGameTime = prev.gameTime.gameTime;
        
        return {
          ...prev,
          gameTime: {
            ...prev.gameTime,
            timeSpeed: speed,
            realStartTime: now - ((currentGameTime - prev.gameTime.gameStartTime) / speed)
          }
        };
      });
    }, []),

    startAnalysis: useCallback((evidenceId: string, analysisType: string, duration: number) => {
      const analysisId = `analysis_${Date.now()}`;
      
      setState(prev => {
        const newAnalysis: TimedAnalysis = {
          id: analysisId,
          evidenceId,
          analysisType,
          startTime: prev.gameTime.gameTime,
          duration: duration * 60 * 1000, // converter minutos para milissegundos
          isCompleted: false,
        };

        return {
          ...prev,
          pendingAnalyses: new Set([...prev.pendingAnalyses, analysisId]),
          timedAnalyses: [...prev.timedAnalyses, newAnalysis]
        };
      });

      addEvent({
        action: 'ANALYSIS_STARTED',
        details: `Análise ${analysisType} iniciada para evidência ${evidenceId}`,
        module: 'analysis'
      });
    }, [addEvent]),

    checkCompletedAnalyses: useCallback(() => {
      return state.timedAnalyses.filter(analysis => 
        analysis.isCompleted && !state.pendingAnalyses.has(analysis.id)
      );
    }, [state.timedAnalyses, state.pendingAnalyses]),

    getCurrentGameTime: useCallback(() => {
      return state.gameTime.gameTime;
    }, [state.gameTime.gameTime]),

    formatGameTime: (timestamp?: number) => {
      const time = timestamp || state.gameTime.gameTime;
      const date = new Date(time);
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      });
    },
  };

  return { state, actions };
};
