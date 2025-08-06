# 📁 Sistema de Gerenciamento de Casos - CaseZero

O Sistema de Gerenciamento de Casos é o centro organizacional do jogo, permitindo que jogadores criem, organizem e acompanhem investigações de forma eficiente.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura de Casos](#estrutura-de-casos)
- [Ciclo de Vida](#ciclo-de-vida)
- [Interface de Gerenciamento](#interface-de-gerenciamento)
- [Organização e Filtros](#organização-e-filtros)
- [Templates e Modelos](#templates-e-modelos)
- [Relatórios e Estatísticas](#relatórios-e-estatísticas)
- [Implementação Técnica](#implementação-técnica)

## 🎯 Visão Geral

O sistema oferece ferramentas completas para gerenciar investigações desde a criação inicial até o fechamento final, incluindo organização, acompanhamento e análise de progresso.

### Características Principais

- **Casos Estruturados**: Organização clara e hierárquica
- **Estados Dinâmicos**: Acompanhamento automático de progresso
- **Templates**: Modelos pré-definidos para diferentes tipos de crime
- **Filtros Avançados**: Busca e organização inteligente

## 📂 Estrutura de Casos

### Informações Básicas

```json
{
  "id": "CASO-001",
  "titulo": "Roubo no Museu Nacional",
  "tipo": "Furto/Roubo",
  "prioridade": "Alta",
  "status": "Em Andamento",
  "investigadorPrincipal": "Det. Silva",
  "dataCreacao": "2024-03-15T08:30:00Z",
  "deadline": "2024-03-30T23:59:59Z",
  "orcamento": {
    "total": 5000,
    "usado": 2150,
    "disponivel": 2850
  }
}
```

### Detalhes Expandidos

#### Descrição e Contexto
- **Resumo Executivo**: Descrição concisa do caso
- **Contexto**: Circunstâncias e background
- **Objetivos**: Metas específicas da investigação
- **Hipóteses**: Teorias iniciais e linhas de investigação

#### Cronologia
- **Timeline de Eventos**: Sequência temporal
- **Marcos Importantes**: Descobertas chave
- **Ações Tomadas**: Histórico de investigação
- **Próximos Passos**: Planejamento futuro

#### Envolvidos
- **Vítimas**: Pessoas afetadas pelo crime
- **Suspeitos**: Possíveis perpetradores
- **Testemunhas**: Pessoas com informações relevantes
- **Especialistas**: Consultores e peritos

## 🔄 Ciclo de Vida

### Estados do Caso

```text
┌─────────────────────────────────────────────────────────┐
│ 🔄 CICLO DE VIDA DOS CASOS                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🆕 Novo      →   🔍 Em Andamento   →   ⏸️ Suspenso     │
│    ↓                    ↓                    ↓          │
│  📋 Planejado →   🔬 Análise       →   ✅ Resolvido     │
│                        ↓                    ↓          │
│                  📊 Avaliação      →   ❌ Arquivado     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Descrição dos Estados

#### 🆕 Novo
- Caso recém-criado
- Aguardando atribuição de investigador
- Informações básicas preenchidas

#### 📋 Planejado
- Investigador atribuído
- Plano de investigação definido
- Recursos alocados

#### 🔍 Em Andamento
- Investigação ativa
- Evidências sendo coletadas
- Análises em progresso

#### 🔬 Análise
- Evidências sendo analisadas
- Resultados sendo interpretados
- Relatórios sendo gerados

#### 📊 Avaliação
- Revisão dos resultados
- Preparação de conclusões
- Validação de evidências

#### ⏸️ Suspenso
- Investigação temporariamente parada
- Aguardando recursos ou informações
- Pode retornar a "Em Andamento"

#### ✅ Resolvido
- Caso concluído com sucesso
- Culpados identificados
- Relatório final gerado

#### ❌ Arquivado
- Caso fechado sem resolução
- Evidências insuficientes
- Pode ser reaberto posteriormente

## 🖥️ Interface de Gerenciamento

### Dashboard Principal

```text
┌───────────────────────────────────────────────────────────┐
│ 📊 DASHBOARD DE CASOS - CaseZero                          │
├───────────────────────────────────────────────────────────┤
│ 📈 Estatísticas Gerais:                                   │
│ • Total de Casos: 15    • Resolvidos: 8 (53%)            │
│ • Em Andamento: 5       • Arquivados: 2 (13%)            │
│ • Taxa de Sucesso: 80%  • Tempo Médio: 12 dias           │
├───────────────────────────────────────────────────────────┤
│ 🔥 Casos Prioritários:                                    │
│ • CASO-003: Homicídio Centro (⚠️ Deadline: 2 dias)       │
│ • CASO-007: Sequestro Zona Sul (💰 Orçamento: 15%)       │
│ • CASO-012: Fraude Bancária (🔬 Análises pendentes: 4)   │
└───────────────────────────────────────────────────────────┘
```

### Lista de Casos

```text
┌─────────────────────────────────────────────────────────────┐
│ 📋 LISTA DE CASOS                                           │
├─────────────────────────────────────────────────────────────┤
│ 🔍 Filtros: [Todos▼] [Alta Prioridade] [Meus Casos]        │
│ 🔎 Busca: [________________] 📅 Período: [Último mês▼]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 🔴 CASO-003 | Homicídio no Centro                          │
│ 👤 Det. Silva | 🕐 Criado: 13/03 | ⏰ Deadline: 17/03      │
│ 💰 €3,200/€5,000 (64%) | 🔬 Análises: 2 ativas            │
│ ▸ 📍 Local: Rua XV, Centro | 👥 Suspeitos: 3               │
│                                                             │
│ 🟡 CASO-007 | Sequestro na Zona Sul                        │
│ 👤 Det. Costa | 🕐 Criado: 14/03 | ⏰ Deadline: 25/03      │
│ 💰 €750/€5,000 (15%) | 🔬 Análises: 1 pendente            │
│ ▸ 📍 Local: Bairro Jardins | 👥 Suspeitos: 1               │
│                                                             │
│ 🟢 CASO-012 | Fraude Bancária                              │
│ 👤 Det. Santos | 🕐 Criado: 15/03 | ⏰ Deadline: 30/03     │
│ 💰 €1,200/€8,000 (15%) | 🔬 Análises: 4 pendentes         │
│ ▸ 📍 Local: Múltiplos | 👥 Suspeitos: 2                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Visualização Detalhada

```text
┌─────────────────────────────────────────────────────────────┐
│ 📄 CASO-003: Homicídio no Centro                           │
├─────────────────────────────────────────────────────────────┤
│ 📋 Informações Básicas                                      │
│ • Status: 🔍 Em Andamento          • Prioridade: 🔴 Alta   │
│ • Investigador: 👤 Det. Silva      • Criado: 13/03/2024   │
│ • Deadline: ⏰ 17/03/2024          • Dias restantes: 2     │
├─────────────────────────────────────────────────────────────┤
│ 💰 Orçamento                                               │
│ • Total: €5,000          • Usado: €3,200 (64%)            │
│ • Disponível: €1,800     • Comprometido: €500             │
├─────────────────────────────────────────────────────────────┤
│ 📊 Progresso                                               │
│ • Evidências Coletadas: 12/15     • Analisadas: 8/12      │
│ • Suspeitos Entrevistados: 2/3    • Relatórios: 3         │
│ • Progresso Geral: ████████░░ 78%                         │
├─────────────────────────────────────────────────────────────┤
│ 🔬 Análises Ativas                                         │
│ • DNA Sangue (Evidência #003): 00:45:30 restante          │
│ • Impressões Digitais (#007): 00:12:15 restante           │
├─────────────────────────────────────────────────────────────┤
│ [ 📝 Editar ] [ 📊 Relatórios ] [ 🔬 Laboratório ] [ ⏸️ Suspender ] │
└─────────────────────────────────────────────────────────────┘
```

## 🔍 Organização e Filtros

### Filtros Disponíveis

#### Por Status
- **Ativos**: Em Andamento, Análise
- **Pendentes**: Novo, Planejado, Suspenso
- **Finalizados**: Resolvido, Arquivado

#### Por Prioridade
- **🔴 Alta**: Casos urgentes
- **🟡 Média**: Casos normais
- **🟢 Baixa**: Casos não urgentes

#### Por Investigador
- **Meus Casos**: Casos atribuídos ao usuário
- **Equipe**: Casos da equipe
- **Todos**: Todos os casos visíveis

#### Por Tipo de Crime
- **Homicídio**: Crimes contra a vida
- **Roubo/Furto**: Crimes contra o patrimônio
- **Fraude**: Crimes financeiros
- **Sequestro**: Crimes contra a liberdade

### Busca Avançada

```text
┌─────────────────────────────────────────────────────────┐
│ 🔍 BUSCA AVANÇADA                                       │
├─────────────────────────────────────────────────────────┤
│ 📝 Texto: [_________________________]                  │
│           (busca em título, descrição, notas)          │
├─────────────────────────────────────────────────────────┤
│ 📅 Período:                                            │
│ De: [01/03/2024] Até: [31/03/2024]                    │
├─────────────────────────────────────────────────────────┤
│ 🏷️  Filtros:                                           │
│ Status: [Em Andamento ▼]    Prioridade: [Alta ▼]      │
│ Tipo: [Todos ▼]            Investigador: [Silva ▼]    │
├─────────────────────────────────────────────────────────┤
│ 💰 Orçamento:                                          │
│ Mín: [€1,000] Máx: [€10,000]                         │
│ ☑️ Apenas com orçamento baixo (<20%)                  │
├─────────────────────────────────────────────────────────┤
│ [ Limpar ] [ Aplicar Filtros ] [ Salvar Busca ]       │
└─────────────────────────────────────────────────────────┘
```

## 📋 Templates e Modelos

### Templates Disponíveis

#### Template: Homicídio
```json
{
  "tipo": "Homicídio",
  "prioridade": "Alta",
  "orcamento": 8000,
  "deadline": "+21 dias",
  "checklistPadrao": [
    "Examinar cena do crime",
    "Coletar evidências físicas",
    "Entrevistar testemunhas",
    "Análise de DNA",
    "Análise balística",
    "Autópsia completa"
  ],
  "evidenciasTipicas": [
    "Arma do crime",
    "Impressões digitais",
    "Amostras de DNA",
    "Roupas da vítima",
    "Fotografias da cena"
  ]
}
```

#### Template: Fraude Financeira
```json
{
  "tipo": "Fraude",
  "prioridade": "Média",
  "orcamento": 5000,
  "deadline": "+30 dias",
  "checklistPadrao": [
    "Analisar registros financeiros",
    "Rastrear transações",
    "Examinar dispositivos digitais",
    "Entrevistar vítimas",
    "Contactar instituições financeiras"
  ],
  "evidenciasTipicas": [
    "Extratos bancários",
    "Computadores",
    "Documentos falsificados",
    "Comunicações digitais"
  ]
}
```

### Criação de Casos com Template

```text
┌─────────────────────────────────────────────────────────┐
│ ➕ NOVO CASO                                           │
├─────────────────────────────────────────────────────────┤
│ 📋 Escolha um Template:                                │
│                                                         │
│ 🔫 [ Homicídio ]           🏦 [ Fraude Financeira ]    │
│    • Orçamento: €8,000         • Orçamento: €5,000    │
│    • Prazo: 21 dias            • Prazo: 30 dias       │
│    • Análises: DNA, Balística  • Análises: Digital    │
│                                                         │
│ 🚗 [ Roubo de Veículo ]    👥 [ Sequestro ]           │
│    • Orçamento: €3,000         • Orçamento: €10,000   │
│    • Prazo: 14 dias            • Prazo: 7 dias        │
│    • Análises: Impressões      • Análises: Múltiplas  │
│                                                         │
│ ⚙️  [ Personalizado ]      📄 [ Importar Template ]    │
│    • Configuração manual       • De arquivo externo    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ [ Cancelar ]                          [ Continuar → ]  │
└─────────────────────────────────────────────────────────┘
```

## 📊 Relatórios e Estatísticas

### Relatório de Progresso

```text
┌─────────────────────────────────────────────────────────┐
│ 📈 RELATÓRIO DE PROGRESSO - Março 2024                 │
├─────────────────────────────────────────────────────────┤
│ 📊 Estatísticas Gerais:                                │
│ • Casos Iniciados: 8        • Taxa de Resolução: 75%  │
│ • Casos Resolvidos: 6       • Tempo Médio: 14.5 dias  │
│ • Casos Arquivados: 2       • Orçamento Médio: €4,200 │
├─────────────────────────────────────────────────────────┤
│ 🎯 Performance por Investigador:                       │
│ • Det. Silva: 4 casos (3 resolvidos)   - 75%          │
│ • Det. Costa: 3 casos (2 resolvidos)   - 67%          │
│ • Det. Santos: 1 caso (1 resolvido)    - 100%         │
├─────────────────────────────────────────────────────────┤
│ 💰 Análise Financeira:                                 │
│ • Orçamento Total Usado: €33,600                       │
│ • Custo por Caso Resolvido: €5,600                     │
│ • Eficiência Orçamentária: 82%                         │
├─────────────────────────────────────────────────────────┤
│ 🔬 Análises Laboratoriais:                             │
│ • Total de Análises: 47     • Taxa de Sucesso: 89%    │
│ • DNA: 12 (95% sucesso)     • Digital: 18 (85%)       │
│ • Impressões: 17 (92%)      • Químicas: 5 (80%)       │
└─────────────────────────────────────────────────────────┘
```

### Relatório Individual

```text
┌─────────────────────────────────────────────────────────┐
│ 📄 RELATÓRIO FINAL - CASO-003                          │
├─────────────────────────────────────────────────────────┤
│ ✅ Status: RESOLVIDO                                   │
│ 📅 Período: 13/03/2024 - 16/03/2024 (4 dias)          │
│ 👤 Investigador Principal: Det. Silva                  │
├─────────────────────────────────────────────────────────┤
│ 📋 Resumo Executivo:                                   │
│ Homicídio resolvido através de análise de DNA e        │
│ impressões digitais. Suspeito identificado e preso     │
│ em menos de 96 horas. Evidências sólidas coletadas.    │
├─────────────────────────────────────────────────────────┤
│ 🔬 Evidências Chave:                                   │
│ • DNA do suspeito na arma do crime                     │
│ • Impressões digitais no local                         │
│ • Vídeo de segurança confirmando presença              │
│ • Álibi falso desmascarado                             │
├─────────────────────────────────────────────────────────┤
│ 💰 Análise Financeira:                                 │
│ • Orçamento Utilizado: €3,650 / €5,000 (73%)          │
│ • Principal Gasto: Análises de DNA (€1,500)           │
│ • Eficiência: Caso resolvido dentro do prazo e         │
│   orçamento                                             │
├─────────────────────────────────────────────────────────┤
│ 🎯 Resultado:                                          │
│ CULPADO IDENTIFICADO: João Silva (ID: 12345)           │
│ Evidências suficientes para processo criminal          │
│ Recomendação: Encaminhar ao Ministério Público         │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Implementação Técnica

### Hook Principal: useCaseManagement

```typescript
interface CaseManagementState {
  cases: Case[];
  activeCases: Case[];
  filters: CaseFilters;
  sortBy: CaseSortOptions;
  searchQuery: string;
  selectedCase?: Case;
}

interface CaseManagementActions {
  createCase: (caseData: CreateCaseRequest) => Promise<Case>;
  updateCase: (caseId: string, updates: CaseUpdate) => Promise<Case>;
  deleteCase: (caseId: string) => Promise<void>;
  changeStatus: (caseId: string, newStatus: CaseStatus) => Promise<Case>;
  applyFilters: (filters: CaseFilters) => void;
  searchCases: (query: string) => void;
  generateReport: (caseId: string) => Promise<CaseReport>;
}
```

### Componente CaseManagement

```typescript
export const CaseManagement: React.FC = () => {
  const {
    cases,
    filters,
    selectedCase,
    createCase,
    updateCase,
    applyFilters,
    generateReport
  } = useCaseManagement();

  return (
    <div className="case-management">
      <CaseDashboard cases={cases} />
      <CaseFilters 
        filters={filters}
        onChange={applyFilters}
      />
      <CaseList 
        cases={cases}
        onSelect={setSelectedCase}
        onCreate={createCase}
      />
      {selectedCase && (
        <CaseDetails 
          case={selectedCase}
          onUpdate={updateCase}
          onGenerateReport={generateReport}
        />
      )}
    </div>
  );
};
```

### Sistema de Estados

```typescript
enum CaseStatus {
  NEW = 'novo',
  PLANNED = 'planejado',
  IN_PROGRESS = 'em_andamento',
  ANALYSIS = 'analise',
  EVALUATION = 'avaliacao',
  SUSPENDED = 'suspenso',
  RESOLVED = 'resolvido',
  ARCHIVED = 'arquivado'
}

interface Case {
  id: string;
  title: string;
  type: CaseType;
  status: CaseStatus;
  priority: Priority;
  investigator: string;
  createdAt: Date;
  deadline: Date;
  budget: Budget;
  evidence: Evidence[];
  analyses: Analysis[];
  notes: Note[];
  progress: CaseProgress;
}
```

## 🎯 Casos de Uso

### Criação de Novo Caso

1. **Escolher Template**: Selecionar tipo de crime
2. **Preencher Detalhes**: Informações específicas
3. **Alocar Recursos**: Orçamento e prazo
4. **Atribuir Investigador**: Responsabilidade

### Acompanhamento Diário

1. **Dashboard**: Visão geral de todos os casos
2. **Priorização**: Focar nos casos mais urgentes
3. **Progresso**: Acompanhar análises e evidências
4. **Relatórios**: Gerar updates para supervisores

### Fechamento de Caso

1. **Revisão**: Verificar evidências e resultados
2. **Relatório Final**: Documentar conclusões
3. **Mudança de Status**: Marcar como resolvido/arquivado
4. **Arquivo**: Organizar documentação

## 🔮 Funcionalidades Futuras

- **Integração IA**: Sugestões automáticas de próximos passos
- **Colaboração**: Múltiplos investigadores por caso
- **Timeline Visual**: Linha do tempo interativa
- **Análise Preditiva**: Estimativas de resolução
- **Templates Dinâmicos**: Modelos que aprendem com casos anteriores

---

**Próximo**: [08-user-interface.md](08-user-interface.md) - Interface do Usuário e UX
