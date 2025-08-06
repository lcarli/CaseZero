# 🔬 Sistema de Análise de Evidências - CaseZero

O Sistema de Análise de Evidências é o núcleo científico do jogo, permitindo que jogadores processem evidências forenses através de diferentes tipos de análises laboratoriais.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tipos de Evidências](#tipos-de-evidências)
- [Tipos de Análises](#tipos-de-análises)
- [Interface do Laboratório](#interface-do-laboratório)
- [Processo de Análise](#processo-de-análise)
- [Resultados e Relatórios](#resultados-e-relatórios)
- [Gestão de Custos](#gestão-de-custos)
- [Implementação Técnica](#implementação-técnica)

## 🎯 Visão Geral

O sistema permite aos investigadores solicitar análises científicas de evidências coletadas, cada uma com custos, tempos e especialidades diferentes.

### Características Principais

- **Múltiplos Laboratórios**: Digital, Físico, Químico
- **Análises Especializadas**: Cada tipo de evidência tem métodos específicos
- **Sistema de Custos**: Orçamento limitado exige escolhas estratégicas
- **Resultados Temporais**: Análises levam tempo real (acelerado)

## 🧪 Tipos de Evidências

### Evidências Digitais

#### Dispositivos Eletrônicos
- **Smartphones**: Dados, GPS, comunicações
- **Computadores**: Arquivos, histórico, metadata
- **Câmeras**: Fotos, vídeos, dados EXIF
- **Pendrives**: Arquivos ocultos, formatação

#### Mídias e Arquivos
- **Vídeos de Segurança**: Análise de movimento, faces
- **Áudios**: Análise de voz, ruído de fundo
- **Imagens**: Metadata, manipulação, origem
- **Documentos**: Autenticidade, alterações

### Evidências Físicas

#### Materiais Biológicos
- **Sangue**: DNA, tipo sanguíneo, origem
- **Saliva**: DNA, identificação pessoal
- **Cabelo**: DNA, características, tratamentos
- **Pele**: DNA, idade, condições

#### Objetos e Materiais
- **Impressões Digitais**: Identificação, qualidade
- **Pegadas**: Tamanho, tipo de calçado, marcha
- **Fibras**: Origem, composição, cor
- **Vidros**: Tipo, origem, força de impacto

### Evidências Químicas

#### Substâncias
- **Drogas**: Tipo, pureza, origem
- **Explosivos**: Composição, origem, potência
- **Venenos**: Tipo, dosagem, tempo de ação
- **Tintas**: Composição, idade, origem

#### Fluidos
- **Combustíveis**: Tipo, origem, adulteração
- **Óleos**: Veicular, industrial, origem
- **Solventes**: Tipo, uso, rastreabilidade
- **Líquidos**: Composição, pH, origem

## 🔬 Tipos de Análises

### Laboratório Digital

#### Análise de Vídeo
```text
┌─────────────────────────────────────────────┐
│ 📹 ANÁLISE DE VÍDEO                         │
├─────────────────────────────────────────────┤
│ Arquivo: camera_01_lobby.mp4               │
│ Duração: 02:15:30                          │
│ Resolução: 1080p                           │
│ ───────────────────────────────────────────  │
│ 🎯 Análises Disponíveis:                   │
│ [ ] Reconhecimento Facial     €150 - 15min │
│ [ ] Análise de Movimento       €80 - 10min │
│ [ ] Melhoria de Qualidade     €120 - 20min │
│ [ ] Extração de Áudio          €50 - 5min  │
│ [ ] Análise de Metadados       €30 - 3min  │
└─────────────────────────────────────────────┘
```

#### Análise de Dados
- **Recuperação de Arquivos**: €200 - 30min
- **Análise de Logs**: €100 - 15min
- **Criptografia Básica**: €300 - 45min
- **Análise de Rede**: €150 - 25min

### Laboratório Físico

#### Análise de DNA
```text
┌─────────────────────────────────────────────┐
│ 🧬 ANÁLISE DE DNA                           │
├─────────────────────────────────────────────┤
│ Amostra: Sangue - Evidência #003           │
│ Quantidade: Suficiente                      │
│ Estado: Bem preservada                      │
│ ───────────────────────────────────────────  │
│ 🎯 Análises Disponíveis:                   │
│ [ ] DNA Básico                €500 - 2h    │
│ [ ] DNA Completo             €1200 - 4h    │
│ [ ] Comparação CODIS          €300 - 1h    │
│ [ ] DNA Mitocondrial          €800 - 3h    │
│ [ ] Análise de Parentesco     €600 - 2.5h  │
└─────────────────────────────────────────────┘
```

#### Impressões Digitais
- **Comparação AFIS**: €100 - 10min
- **Análise Manual**: €200 - 30min
- **Classificação**: €50 - 5min
- **Melhoria de Qualidade**: €150 - 20min

### Laboratório Químico

#### Análise de Substâncias
```text
┌─────────────────────────────────────────────┐
│ ⚗️ ANÁLISE QUÍMICA                          │
├─────────────────────────────────────────────┤
│ Amostra: Pó Branco - Evidência #007        │
│ Peso: 2.3g                                 │
│ Origem: Bolso da vítima                    │
│ ───────────────────────────────────────────  │
│ 🎯 Análises Disponíveis:                   │
│ [ ] Teste Preliminar          €50 - 5min   │
│ [ ] Espectrometria            €400 - 1h    │
│ [ ] Cromatografia             €350 - 45min │
│ [ ] Análise de Pureza         €250 - 30min │
│ [ ] Origem Geográfica         €600 - 2h    │
└─────────────────────────────────────────────┘
```

## 🖥️ Interface do Laboratório

### Painel Principal

```text
┌───────────────────────────────────────────────────────────┐
│ 🔬 LABORATÓRIO FORENSE - CaseZero                         │
├───────────────────────────────────────────────────────────┤
│ 💰 Orçamento: €3,450 / €5,000  📊 67% Usado             │
│ ⏱️  Análises Ativas: 3         🕐 Mais Rápida: 00:23:15  │
├───────────────────────────────────────────────────────────┤
│ 📂 Evidências Pendentes: 8     ✅ Análises Concluídas: 12 │
│ 🚨 Prioridade Alta: 2          📈 Taxa de Sucesso: 94%   │
└───────────────────────────────────────────────────────────┘
```

### Seleção de Evidências

```text
┌─────────────────────────────────────────────────────────┐
│ 📦 EVIDÊNCIAS DISPONÍVEIS                               │
├─────────────────────────────────────────────────────────┤
│ 🔹 [001] Faca Ensanguentada                            │
│   📍 Local: Cozinha | 🧬 DNA, 👤 Impressões           │
│   💰 Custo Est.: €600-1200 | ⏱️ Tempo: 2-4h           │
├─────────────────────────────────────────────────────────┤
│ 🔹 [002] Smartphone da Vítima                          │
│   📍 Local: Quarto | 📱 Dados, 📞 Comunicações        │
│   💰 Custo Est.: €300-800 | ⏱️ Tempo: 1-3h            │
├─────────────────────────────────────────────────────────┤
│ 🔹 [003] Pegada na Lama                                │
│   📍 Local: Jardim | 👟 Análise, 📏 Medidas           │
│   💰 Custo Est.: €200-500 | ⏱️ Tempo: 30min-1h        │
└─────────────────────────────────────────────────────────┘
```

## ⚙️ Processo de Análise

### 1. Seleção da Evidência

- Escolher evidência da lista
- Visualizar detalhes e estado
- Verificar compatibilidade com análises

### 2. Escolha da Análise

- Ver opções disponíveis
- Comparar custos e tempos
- Selecionar prioridade

### 3. Confirmação

```text
┌─────────────────────────────────────────────┐
│ ⚠️  CONFIRMAÇÃO DE ANÁLISE                  │
├─────────────────────────────────────────────┤
│ Evidência: Smartphone da Vítima (#002)     │
│ Análise: Recuperação de Dados Completa     │
│ ───────────────────────────────────────────  │
│ 💰 Custo: €650                             │
│ ⏱️  Tempo: 2h 30min (velocidade atual: 4x) │
│ 🎯 Laboratório: Digital                    │
│ ───────────────────────────────────────────  │
│ ⚡ Orçamento após análise: €2,800          │
│ 📊 Percentual usado: 44%                   │
│ ───────────────────────────────────────────  │
│ [ Cancelar ]              [ Confirmar ]    │
└─────────────────────────────────────────────┘
```

### 4. Acompanhamento

```text
┌─────────────────────────────────────────────┐
│ 🔄 ANÁLISES EM ANDAMENTO                   │
├─────────────────────────────────────────────┤
│ 🧬 DNA - Sangue (#001)                     │
│ ████████░░ 80% | 00:23:15 restante        │
├─────────────────────────────────────────────┤
│ 📱 Dados - Smartphone (#002)               │
│ ███░░░░░░░ 30% | 01:45:30 restante        │
├─────────────────────────────────────────────┤
│ 👤 Impressões - Faca (#001)                │
│ ██████████ 100% | 🎉 Concluída!           │
└─────────────────────────────────────────────┘
```

## 📊 Resultados e Relatórios

### Relatório de Análise

```text
┌─────────────────────────────────────────────────────────┐
│ 📋 RELATÓRIO DE ANÁLISE - DNA #001                     │
├─────────────────────────────────────────────────────────┤
│ 🗓️  Data: 15/03/2024 16:45                            │
│ 👨‍🔬 Analista: Dr. Santos | ⚗️ Lab: Biologia            │
│ 🧬 Tipo: DNA Nuclear Completo                          │
├─────────────────────────────────────────────────────────┤
│ ✅ RESULTADOS POSITIVOS                                │
│                                                         │
│ 🎯 Perfil DNA Encontrado:                              │
│   • Sexo: Masculino                                    │
│   • Origem: Caucasiana                                 │
│   • Marcadores: 20/20 identificados                    │
│                                                         │
│ 🔍 Comparação com Banco de Dados:                      │
│   • CODIS: 1 match encontrado (95.7% certeza)         │
│   • Suspeito: João Silva (ID: 12345)                   │
│   • Criminal Record: Sim (Roubo, 2019)                 │
│                                                         │
│ 📝 Observações:                                         │
│   • Amostra bem preservada                             │
│   • Sem contaminação detectada                         │
│   • Resultado confiável para processo legal            │
└─────────────────────────────────────────────────────────┘
```

### Tipos de Resultado

#### Resultado Positivo
- **Match Encontrado**: Identificação confirmada
- **Dados Úteis**: Informações relevantes descobertas
- **Pistas Novas**: Direções para investigação

#### Resultado Inconclusivo
- **Amostra Degradada**: Qualidade insuficiente
- **Dados Parciais**: Informação limitada
- **Necessário Re-análise**: Com métodos diferentes

#### Resultado Negativo
- **Sem Match**: Não encontrado no banco de dados
- **Sem Dados**: Evidência não contém informação útil
- **Contaminada**: Amostra inviável

## 💰 Gestão de Custos

### Sistema de Orçamento

```text
┌─────────────────────────────────────────────┐
│ 💰 GESTÃO FINANCEIRA                        │
├─────────────────────────────────────────────┤
│ Orçamento Inicial: €5,000                  │
│ Gastos Atuais: €2,150                      │
│ Saldo Disponível: €2,850                   │
│ ───────────────────────────────────────────  │
│ 📊 Distribuição:                           │
│ • DNA: €1,200 (56%)                       │
│ • Digital: €650 (30%)                     │
│ • Impressões: €300 (14%)                  │
│ ───────────────────────────────────────────  │
│ ⚠️  Análises Pendentes: €1,800             │
│ 🚨 Saldo Após Pendentes: €1,050           │
└─────────────────────────────────────────────┘
```

### Estratégias de Economia

#### Análises Básicas Primeiro
- Fazer análises baratas para descartar possibilidades
- Investir em análises caras apenas quando necessário

#### Priorização
- Evidências com maior potencial de resultado
- Análises que podem revelar múltiplas pistas

#### Combinação Inteligente
- Usar resultados de uma análise para guiar a próxima
- Evitar análises redundantes

## 🔧 Implementação Técnica

### Hook Principal: useEvidenceAnalysis

```typescript
interface EvidenceAnalysisState {
  evidence: Evidence[];
  availableAnalyses: AnalysisType[];
  activeAnalyses: ActiveAnalysis[];
  completedAnalyses: CompletedAnalysis[];
  budget: {
    total: number;
    used: number;
    pending: number;
  };
}

interface EvidenceAnalysisActions {
  requestAnalysis: (evidenceId: string, analysisType: string) => void;
  cancelAnalysis: (analysisId: string) => void;
  getAnalysisResults: (analysisId: string) => AnalysisResult;
  calculateCost: (evidenceId: string, analysisType: string) => number;
}
```

### Componente EvidenceModule

```typescript
export const EvidenceModule: React.FC = () => {
  const {
    evidence,
    activeAnalyses,
    completedAnalyses,
    budget,
    requestAnalysis,
    cancelAnalysis
  } = useEvidenceAnalysis();

  return (
    <div className="evidence-module">
      <BudgetDisplay budget={budget} />
      <EvidenceList 
        evidence={evidence}
        onAnalysisRequest={requestAnalysis}
      />
      <ActiveAnalysesList 
        analyses={activeAnalyses}
        onCancel={cancelAnalysis}
      />
      <ResultsList results={completedAnalyses} />
    </div>
  );
};
```

### Sistema de Análises

```typescript
class AnalysisProcessor {
  processAnalysis(evidence: Evidence, analysisType: AnalysisType): Promise<AnalysisResult> {
    const processor = this.getProcessor(analysisType);
    const timeRequired = this.calculateTime(evidence, analysisType);
    const cost = this.calculateCost(evidence, analysisType);
    
    return processor.process(evidence, timeRequired, cost);
  }
  
  private getProcessor(type: AnalysisType): AnalysisEngine {
    switch(type) {
      case 'DNA': return new DNAAnalysisEngine();
      case 'FINGERPRINT': return new FingerprintEngine();
      case 'VIDEO': return new VideoAnalysisEngine();
      default: throw new Error(`Unknown analysis type: ${type}`);
    }
  }
}
```

## 🎯 Casos de Uso

### Investigação Básica

1. **Análises Rápidas**: Impressões digitais, metadados
2. **Custo Baixo**: Priorizar análises baratas
3. **Resultados Imediatos**: Pistas para direcionamento

### Investigação Complexa

1. **Análises Completas**: DNA, análises químicas
2. **Alto Investimento**: Usar maior parte do orçamento
3. **Resultados Definitivos**: Evidências para condenação

### Gestão de Recursos

1. **Análise de Custo-Benefício**: Avaliar cada evidência
2. **Priorização Estratégica**: Evidências mais promissoras
3. **Reserve de Emergência**: Manter orçamento para análises inesperadas

## 🔮 Funcionalidades Futuras

- **Análises Combinadas**: Múltiplas evidências juntas
- **Análises Express**: Resultados mais rápidos por mais dinheiro
- **Sistema de Descontos**: Bulk analysis discounts
- **Análises Avançadas**: Novas tecnologias e métodos
- **Relatórios Automáticos**: Geração automática de documentos

---

**Próximo**: [07-case-management.md](07-case-management.md) - Sistema de Gerenciamento de Casos

---


[**Retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
