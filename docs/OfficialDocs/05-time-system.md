# 🕐 Sistema de Tempo - CaseZero

O Sistema de Tempo é um módulo central que gerencia a passagem temporal no jogo, permitindo acelerar processos de análise e criar uma experiência mais dinâmica para o jogador.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Interface do Usuário](#interface-do-usuário)
- [Controles de Velocidade](#controles-de-velocidade)
- [Integração com Análises](#integração-com-análises)
- [Estados Temporais](#estados-temporais)
- [Implementação Técnica](#implementação-técnica)
- [Configurações](#configurações)

## 🎯 Visão Geral

O Sistema de Tempo permite que os jogadores controlem a velocidade da passagem temporal no jogo, acelerando análises laboratoriais e outros processos que dependem de tempo real.

### Características Principais

- **Múltiplas Velocidades**: 1x, 2x, 4x, 8x
- **Pausa Inteligente**: Pausa automática quando resultados ficam prontos
- **Interface Intuitiva**: Controles simples e visuais claros
- **Sincronização**: Todos os processos respeitam a velocidade escolhida

## ⚙️ Funcionalidades

### Controle de Velocidade

```typescript
// Estados de velocidade disponíveis
const timeMultipliers = [1, 2, 4, 8] as const;
type TimeMultiplier = typeof timeMultipliers[number];
```

### Eventos Temporais

- **Análises em Progresso**: Mostra tempo restante
- **Notificações**: Alertas quando processos terminam
- **Histórico**: Log de eventos temporais importantes

### Pausa Automática

O sistema pausa automaticamente quando:
- Análises são concluídas
- Eventos importantes acontecem
- Orçamento se esgota
- Deadlines são atingidos

## 🖥️ Interface do Usuário

### Relógio Principal

```text
┌─────────────────────────────────────┐
│ 🕐 SISTEMA DE TEMPO                  │
├─────────────────────────────────────┤
│ 📅 Segunda-feira, 15 de Março 2024  │
│ 🕒 14:35:22                         │
│ ⚡ Velocidade: 4x                   │
│ 📊 Status: Analisando...            │
└─────────────────────────────────────┘
```

### Controles de Velocidade

```text
┌─────────────────────────────────────┐
│ ⏯️  CONTROLES                        │
├─────────────────────────────────────┤
│ [ ⏸️ ] [ 1x ] [ 2x ] [ 4x ] [ 8x ]   │
│                    ^^^^              │
│                  Ativo               │
├─────────────────────────────────────┤
│ 🔄 Próxima Análise: 02:15 min       │
│ 📈 Progresso Geral: 67%             │
└─────────────────────────────────────┘
```

### Indicadores Visuais

#### Estado Normal

- **Verde**: Sistema funcionando normalmente
- **Azul**: Análises em progresso
- **Amarelo**: Atenção necessária

#### Estado de Alerta

- **Laranja**: Recursos baixos
- **Vermelho**: Problemas críticos
- **Roxo**: Pausa automática ativada

## 🎮 Controles de Velocidade

### Velocidades Disponíveis

| Multiplicador | Descrição | Uso Recomendado |
|---------------|-----------|-----------------|
| **1x** | Tempo real | Análise detalhada |
| **2x** | Velocidade dupla | Processos médios |
| **4x** | Velocidade quádrupla | Análises longas |
| **8x** | Velocidade máxima | Processos overnight |

### Atalhos de Teclado

- **Espaço**: Pausar/Despausar
- **1, 2, 4, 8**: Velocidades específicas
- **+/-**: Aumentar/diminuir velocidade
- **Esc**: Pausar emergência

## 🔬 Integração com Análises

### Tipos de Análise Temporal

#### Análises Rápidas (1-5 minutos)
- Impressões digitais básicas
- Análise de metadados
- Verificação de documentos

#### Análises Médias (15-30 minutos)
- DNA básico
- Análise de vídeo
- Exame de materiais

#### Análises Longas (1-4 horas)
- DNA complexo
- Balística avançada
- Análise química detalhada

### Fila de Análises

```text
┌─────────────────────────────────────────────────┐
│ 📋 FILA DE ANÁLISES                             │
├─────────────────────────────────────────────────┤
│ 🔬 DNA - Sangue (Evidência #001)               │
│ ⏱️  Tempo Restante: 00:23:15 (4x velocidade)    │
│ 📊 Progresso: ████████░░ 80%                   │
├─────────────────────────────────────────────────┤
│ 🔫 Balística - Projétil (Evidência #003)       │
│ ⏱️  Tempo Restante: 01:45:30 (4x velocidade)    │
│ 📊 Progresso: ███░░░░░░░ 30%                   │
├─────────────────────────────────────────────────┤
│ 📹 Vídeo - Câmera 1 (Evidência #005)           │
│ ⏱️  Aguardando início...                        │
│ 📊 Progresso: ░░░░░░░░░░ 0%                    │
└─────────────────────────────────────────────────┘
```

## 🎭 Estados Temporais

### Estado Ativo

- Relógio funcionando
- Análises progredindo
- Interface responsiva
- Notificações ativas

### Estado Pausado

- Tempo congelado
- Análises suspensas
- Interface destacada
- Motivo da pausa exibido

### Estado de Espera

- Aguardando ação do jogador
- Tempo pode continuar ou pausar
- Alertas visuais ativos
- Opções de ação disponíveis

## 🔧 Implementação Técnica

### Hook Principal: useTimeSystem

```typescript
interface TimeSystemState {
  currentTime: Date;
  multiplier: TimeMultiplier;
  isPaused: boolean;
  isAutoMode: boolean;
  pendingAnalyses: Analysis[];
  completedAnalyses: Analysis[];
}

interface TimeSystemActions {
  setMultiplier: (multiplier: TimeMultiplier) => void;
  pause: () => void;
  resume: () => void;
  toggleAutoMode: () => void;
  processTimeUpdate: (deltaTime: number) => void;
}
```

### Componente TimeSystemModule

```typescript
export const TimeSystemModule: React.FC = () => {
  const {
    currentTime,
    multiplier,
    isPaused,
    pendingAnalyses,
    setMultiplier,
    pause,
    resume
  } = useTimeSystem();

  return (
    <div className="time-system-module">
      <TimeDisplay time={currentTime} />
      <SpeedControls 
        current={multiplier}
        onChange={setMultiplier}
        isPaused={isPaused}
        onPause={pause}
        onResume={resume}
      />
      <AnalysisQueue analyses={pendingAnalyses} />
    </div>
  );
};
```

### Sincronização de Estados

```typescript
// Atualização temporal centralizada
const processTimeUpdate = useCallback((deltaTime: number) => {
  if (isPaused) return;
  
  const adjustedDelta = deltaTime * multiplier;
  
  // Atualizar tempo do jogo
  setCurrentTime(prev => new Date(prev.getTime() + adjustedDelta));
  
  // Processar análises
  updateAnalyses(adjustedDelta);
  
  // Verificar eventos de pausa
  checkAutoPauseConditions();
}, [isPaused, multiplier]);
```

## ⚙️ Configurações

### Configurações do Sistema

```json
{
  "timeSystem": {
    "maxMultiplier": 8,
    "autoPauseOnResults": true,
    "autoPauseOnBudgetLow": true,
    "autoPauseOnDeadline": true,
    "showTimeInTitle": true,
    "playNotificationSounds": true,
    "defaultMultiplier": 1
  }
}
```

### Configurações de Análises

```json
{
  "analysisConfig": {
    "fingerprintAnalysis": { "baseTime": 300000 },  // 5 min
    "dnaAnalysis": { "baseTime": 1800000 },         // 30 min
    "videoAnalysis": { "baseTime": 900000 },        // 15 min
    "ballisticsAnalysis": { "baseTime": 3600000 },  // 60 min
    "chemicalAnalysis": { "baseTime": 7200000 }     // 120 min
  }
}
```

## 🎯 Casos de Uso

### Investigação Rápida

1. Jogar em velocidade normal (1x)
2. Monitorar análises em tempo real
3. Tomar decisões imediatas

### Investigação Overnight

1. Configurar velocidade máxima (8x)
2. Ativar pausa automática
3. Deixar análises longas rodando

### Gerenciamento de Recursos

1. Monitorar orçamento vs. tempo
2. Acelerar quando necessário
3. Pausar para planejamento

## 🔮 Funcionalidades Futuras

- **Agendamento**: Programar análises para horários específicos
- **Histórico Temporal**: Visualizar linha do tempo do caso
- **Simulações**: Testar cenários com diferentes velocidades
- **Relatórios de Tempo**: Análise de eficiência temporal
- **Modo Turbo**: Velocidades ainda maiores para casos específicos

---

**Próximo**: [06-evidence-analysis.md](06-evidence-analysis.md) - Sistema de Análise de Evidências

---


[**retornar ao índice**](./README.md)


---