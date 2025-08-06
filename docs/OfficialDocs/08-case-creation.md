# 📝 Criação de Casos - CaseZero

O sistema de criação de casos permite que administradores e criadores de conteúdo desenvolvam novos cenários de investigação para treinamento policial.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura de um Caso](#estrutura-de-um-caso)
- [Processo de Criação](#processo-de-criação)
- [Editor de Casos](#editor-de-casos)
- [Sistema de Evidências](#sistema-de-evidências)
- [Configuração de Análises](#configuração-de-análises)
- [Testes e Validação](#testes-e-validação)
- [Publicação e Distribuição](#publicação-e-distribuição)

## 🎯 Visão Geral

O sistema de criação de casos é uma ferramenta poderosa que permite criar cenários realistas de investigação criminal, completos com evidências, análises forenses e múltiplas linhas de investigação.

### Características Principais

- **Editor Visual**: Interface intuitiva para criação
- **Templates**: Modelos pré-definidos para diferentes tipos de crime
- **Sistema de Evidências**: Upload e configuração de arquivos forenses
- **Validação**: Verificação automática de consistência
- **Versionamento**: Controle de versões dos casos criados

## 📂 Estrutura de um Caso

### Arquivo Principal: info.json

```json
{
  "id": "caso-001",
  "title": "Roubo no Museu Nacional",
  "description": "Um valioso quadro foi roubado do Museu Nacional durante a noite...",
  "difficulty": "intermediate",
  "estimatedTime": 120,
  "tags": ["roubo", "arte", "museu", "noturno"],
  "version": "1.0.0",
  "author": "Det. Silva",
  "createdAt": "2024-03-15T10:00:00Z",
  "lastModified": "2024-03-15T15:30:00Z",
  
  "gameSettings": {
    "budget": 5000,
    "timeLimit": 2160,
    "currency": "EUR",
    "location": "Lisboa, Portugal"
  },
  
  "briefing": {
    "initialReport": "briefing/initial-report.md",
    "evidence": ["briefing/crime-scene-photos.zip"],
    "witnesses": ["briefing/witness-statements.json"]
  },
  
  "solution": {
    "culprit": "João Silva",
    "motive": "Necessidade financeira",
    "method": "Acesso por janela dos fundos",
    "keyEvidence": ["impressoes-digitais", "video-seguranca"],
    "minimumEvidence": 3
  },
  
  "scoring": {
    "maxPoints": 1000,
    "timeBonus": true,
    "budgetBonus": true,
    "evidencePoints": 50,
    "deductionPerError": 25
  }
}
```

### Estrutura de Diretórios

```text
cases/
└── caso-001-roubo-museu/
    ├── info.json                    # Configuração principal
    ├── briefing/                    # Informações iniciais
    │   ├── initial-report.md
    │   ├── crime-scene-photos.zip
    │   └── witness-statements.json
    ├── evidence/                    # Evidências disponíveis
    │   ├── physical/
    │   │   ├── fingerprints/
    │   │   ├── dna-samples/
    │   │   └── objects/
    │   ├── digital/
    │   │   ├── videos/
    │   │   ├── photos/
    │   │   └── documents/
    │   └── testimonies/
    │       ├── suspects/
    │       └── witnesses/
    ├── analysis-results/            # Resultados das análises
    │   ├── dna-results.json
    │   ├── fingerprint-matches.json
    │   └── video-analysis.json
    └── solution/                    # Solução do caso
        ├── solution-guide.md
        ├── evidence-chain.json
        └── scoring-rubric.json
```

## ⚙️ Processo de Criação

### 1. Planejamento do Caso

#### Definição do Cenário
```text
┌─────────────────────────────────────────────────────────┐
│ 📋 PLANEJAMENTO DO CASO                                 │
├─────────────────────────────────────────────────────────┤
│ 🎯 Tipo de Crime:                                       │
│ [ ] Homicídio        [ ] Roubo/Furto    [ ] Fraude     │
│ [ ] Sequestro        [ ] Tráfico        [ ] Outros     │
├─────────────────────────────────────────────────────────┤
│ 📊 Nível de Dificuldade:                               │
│ ( ) Iniciante - 30-60 min  ( ) Intermediário - 1-2h    │
│ ( ) Avançado - 2-4h        ( ) Expert - 4h+            │
├─────────────────────────────────────────────────────────┤
│ 🎓 Objetivos de Aprendizado:                           │
│ ☑️ Análise de DNA         ☑️ Impressões Digitais       │
│ ☑️ Análise de Vídeo       ☐ Análise Química           │
│ ☐ Balística              ☐ Documentoscopia            │
├─────────────────────────────────────────────────────────┤
│ 📝 Resumo do Cenário:                                  │
│ [_________________________________________________]     │
│ [_________________________________________________]     │
│ [_________________________________________________]     │
└─────────────────────────────────────────────────────────┘
```

#### Criação da Narrativa
- **História Principal**: Sequência de eventos do crime
- **Personagens**: Vítimas, suspeitos, testemunhas
- **Localização**: Ambiente e geografia do crime
- **Timeline**: Cronologia dos eventos importantes

### 2. Desenvolvimento de Evidências

#### Evidências Físicas
```json
{
  "evidenceId": "ev-001",
  "name": "Impressão Digital na Janela",
  "type": "fingerprint",
  "location": "Janela dos fundos - Quadrante superior direito",
  "description": "Impressão digital clara encontrada na moldura da janela",
  "collectible": true,
  "analysisOptions": [
    {
      "type": "afis_comparison",
      "cost": 100,
      "time": 600,
      "success_rate": 0.85,
      "result": "match_joao_silva"
    },
    {
      "type": "manual_analysis",
      "cost": 200,
      "time": 1800,
      "success_rate": 0.95,
      "result": "detailed_match_joao_silva"
    }
  ],
  "hints": [
    "Impressão bem preservada",
    "Formato de polegar masculino",
    "Sem contaminação visível"
  ]
}
```

#### Evidências Digitais
```json
{
  "evidenceId": "ev-002",
  "name": "Vídeo da Câmera de Segurança",
  "type": "video",
  "filename": "security_cam_001_23h45.mp4",
  "duration": 300,
  "quality": "720p",
  "timestamp": "2024-03-14T23:45:00Z",
  "analysisOptions": [
    {
      "type": "face_recognition",
      "cost": 150,
      "time": 900,
      "success_rate": 0.70,
      "result": "partial_face_match"
    },
    {
      "type": "motion_analysis",
      "cost": 80,
      "time": 600,
      "success_rate": 0.90,
      "result": "movement_pattern"
    },
    {
      "type": "enhancement",
      "cost": 120,
      "time": 1200,
      "success_rate": 0.85,
      "result": "enhanced_footage"
    }
  ]
}
```

### 3. Configuração de Análises

#### Resultados das Análises
```json
{
  "analysisResults": {
    "afis_comparison_ev001": {
      "result_type": "positive_match",
      "confidence": 0.957,
      "match_details": {
        "suspect_id": "joao_silva",
        "points_matched": 16,
        "database_record": "Criminal record: Theft (2019)"
      },
      "report": "analysis-results/fingerprint-match-report.pdf"
    },
    "face_recognition_ev002": {
      "result_type": "partial_match",
      "confidence": 0.73,
      "match_details": {
        "visible_features": ["jawline", "ear_shape"],
        "obstructed_features": ["eyes", "nose"],
        "possible_matches": ["joao_silva", "pedro_santos"]
      },
      "recommendations": ["Enhance video quality", "Compare with other footage"]
    }
  }
}
```

## 🖥️ Editor de Casos

### Interface Principal

```text
┌───────────────────────────────────────────────────────────┐
│ ✏️  EDITOR DE CASOS - CaseZero                            │
├───────────────────────────────────────────────────────────┤
│ 📁 Caso: roubo-museu-nacional              💾 [Salvar]   │
│ 📊 Status: 🟡 Em Desenvolvimento           🔍 [Preview]   │
├───────────────────────────────────────────────────────────┤
│ 📋 Navegação:                                             │
│ [ 📝 Info Básica ] [ 🧩 Evidências ] [ 🔬 Análises ]     │
│ [ 👥 Personagens ] [ 📍 Locais ] [ ✅ Validação ]        │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📝 INFORMAÇÕES BÁSICAS                                   │
│                                                           │
│ Título: [Roubo no Museu Nacional____________]             │
│                                                           │
│ Descrição:                                                │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Um valioso quadro do século XVIII foi roubado do   │   │
│ │ Museu Nacional durante a madrugada. A investigação │   │
│ │ deve identificar o ladrão e recuperar a obra...    │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ Dificuldade: [ Intermediário ▼ ]  Tempo: [120] minutos   │
│ Orçamento: [€5,000]  Localização: [Lisboa, PT_______]    │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Editor de Evidências

```text
┌───────────────────────────────────────────────────────────┐
│ 🧩 EDITOR DE EVIDÊNCIAS                                   │
├───────────────────────────────────────────────────────────┤
│ ➕ [ Adicionar Evidência ]    🔍 Buscar: [__________]     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📂 Evidências Físicas (3)                                │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ 🔹 ev-001: Impressão Digital na Janela             │   │
│ │ 📍 Local: Janela dos fundos                         │   │
│ │ 🔬 Análises: AFIS (€100), Manual (€200)           │   │
│ │ [ ✏️ Editar ] [ 🗑️ Remover ] [ 👁️ Preview ]         │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 📂 Evidências Digitais (2)                               │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ 🔹 ev-002: Vídeo Câmera Segurança                  │   │
│ │ 📁 Arquivo: security_cam_001.mp4 (45MB)            │   │
│ │ 🔬 Análises: Reconhecimento (€150), Movimento (€80)│   │
│ │ [ ✏️ Editar ] [ 🗑️ Remover ] [ 👁️ Preview ]         │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 📂 Testemunhos (4)                                       │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ 🔹 Guarda Noturno - José Silva                      │   │
│ │ 💬 "Vi uma sombra perto da janela por volta das..."│   │
│ │ ⏰ Disponível: Imediatamente                        │   │
│ │ [ ✏️ Editar ] [ 🗑️ Remover ] [ 👁️ Preview ]         │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Configuração de Análises

```text
┌───────────────────────────────────────────────────────────┐
│ 🔬 CONFIGURAÇÃO DE ANÁLISES                               │
├───────────────────────────────────────────────────────────┤
│ Evidência: ev-001 - Impressão Digital na Janela          │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📊 Análise AFIS:                                         │
│ Custo: [€100____] Tempo: [10] min  Sucesso: [85]%        │
│                                                           │
│ 📝 Resultado Positivo:                                   │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Match encontrado: João Silva (95.7% certeza)       │   │
│ │ Registro criminal: Roubo (2019)                     │   │
│ │ 16 pontos de correspondência identificados          │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 📝 Resultado Negativo:                                   │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Impressão de baixa qualidade para comparação       │   │
│ │ Recomendado: Análise manual complementar            │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 📝 Resultado Inconclusivo:                               │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Correspondência parcial detectada                   │   │
│ │ Necessária análise adicional para confirmação      │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ [ ➕ Adicionar Resultado ] [ 💾 Salvar ] [ 🔄 Resetar ]   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 🧪 Sistema de Evidências

### Upload de Arquivos

```text
┌───────────────────────────────────────────────────────────┐
│ 📤 UPLOAD DE EVIDÊNCIAS                                   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📁 Selecionar Arquivos:                                  │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Arraste arquivos aqui ou clique para selecionar    │   │
│ │                                                     │   │
│ │           📄 🖼️ 🎥 🎵                               │   │
│ │                                                     │   │
│ │ Tipos aceitos: .jpg, .png, .mp4, .pdf, .docx       │   │
│ │ Tamanho máximo: 100MB por arquivo                  │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 📋 Arquivos Selecionados:                                │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ ✅ crime_scene_photo_1.jpg (2.3MB)                 │   │
│ │ ✅ security_footage.mp4 (45.7MB)                   │   │
│ │ ✅ witness_statement.pdf (856KB)                   │   │
│ │ ⏳ fingerprint_sample.png (1.2MB) - Processando... │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 🏷️ Configuração:                                         │
│ Categoria: [ Evidência Física ▼ ]                        │
│ Localização: [Cena do crime____________]                  │
│ Descrição: [________________________________]             │
│                                                           │
│ [ Cancelar ]                              [ Upload ]     │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Biblioteca de Evidências

```text
┌───────────────────────────────────────────────────────────┐
│ 📚 BIBLIOTECA DE EVIDÊNCIAS                               │
├───────────────────────────────────────────────────────────┤
│ 🔍 Filtros: [Todos▼] [Físicas] [Digitais] [Testemunhos]  │
│ 📊 Ordenar: [Data▼] [Nome] [Tipo] [Tamanho]              │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📁 Templates Disponíveis:                                │
│                                                           │
│ 🔫 Homicídio                                             │
│ ├── 🧬 DNA samples (3 templates)                         │
│ ├── 👤 Fingerprints (5 templates)                       │
│ ├── 🔫 Ballistics (4 templates)                         │
│ └── 📹 Security footage (6 templates)                   │
│                                                           │
│ 💰 Roubo/Furto                                           │
│ ├── 👤 Fingerprints (8 templates)                       │
│ ├── 📹 CCTV footage (12 templates)                      │
│ ├── 🔍 Physical evidence (10 templates)                 │
│ └── 👥 Witness statements (15 templates)                │
│                                                           │
│ 💳 Fraude                                                │
│ ├── 💻 Digital evidence (20 templates)                  │
│ ├── 📄 Documents (18 templates)                         │
│ ├── 📞 Communication logs (8 templates)                 │
│ └── 💰 Financial records (12 templates)                 │
│                                                           │
│ [ ➕ Upload Nova Evidência ] [ 📥 Importar Template ]    │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## ✅ Testes e Validação

### Sistema de Validação

```text
┌───────────────────────────────────────────────────────────┐
│ ✅ VALIDAÇÃO DO CASO                                      │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 🔍 Verificações Automáticas:                             │
│                                                           │
│ ✅ Informações básicas completas                         │
│ ✅ Pelo menos 3 evidências configuradas                  │
│ ✅ Solução definida com evidências chave                 │
│ ✅ Orçamento e tempo configurados                        │
│ ⚠️  Algumas análises sem resultado negativo              │
│ ❌ Arquivo de briefing ausente                           │
│ ❌ Testemunhas sem configuração de timing                │
│                                                           │
│ 📊 Pontuação de Qualidade: 75/100                        │
│                                                           │
│ 🐛 Problemas Encontrados:                                │
│ • briefing/initial-report.md não encontrado              │
│ • Testemunha "José Silva" sem restrição de horário       │
│ • Evidência ev-003 sem análise configurada               │
│                                                           │
│ 💡 Sugestões de Melhoria:                                │
│ • Adicionar resultado inconclusivo para análise DNA      │
│ • Incluir pistas falsas para aumentar complexidade       │
│ • Configurar múltiplas linhas de investigação            │
│                                                           │
│ [ 🔧 Corrigir Problemas ] [ 🎮 Teste Rápido ] [ 📊 Relatório ] │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Teste de Jogabilidade

```text
┌───────────────────────────────────────────────────────────┐
│ 🎮 TESTE DE JOGABILIDADE                                  │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 🏃‍♂️ Simulação Rápida:                                    │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ ⏱️  Tempo: 00:23:45 / 02:00:00                     │   │
│ │ 💰 Orçamento: €2,450 / €5,000 (49%)                │   │
│ │ 🧩 Evidências: 3/7 analisadas                      │   │
│ │ 🎯 Progresso: ████████░░ 78%                       │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 📋 Caminho da Solução:                                   │
│ 1. ✅ Análise impressões digitais → Match João Silva     │
│ 2. ✅ Análise vídeo segurança → Confirmação presença     │
│ 3. ⏳ Interrogatório João Silva → Em andamento           │
│ 4. ⚪ Busca na residência → Pendente                     │
│                                                           │
│ 📊 Métricas de Dificuldade:                              │
│ • Tempo médio de resolução: 87 minutos                   │
│ • Taxa de sucesso estimada: 82%                          │
│ • Ponto de travamento comum: Análise de DNA (opcional)   │
│                                                           │
│ 📝 Feedback da Simulação:                                │
│ • ✅ Caso bem balanceado                                 │
│ • ⚠️  Evidência ev-005 raramente utilizada              │
│ • 💡 Sugestão: Adicionar pista para orientar jogadores   │
│                                                           │
│ [ 🔄 Executar Novamente ] [ 📈 Relatório Detalhado ]     │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 🚀 Publicação e Distribuição

### Preparação para Publicação

```text
┌───────────────────────────────────────────────────────────┐
│ 📦 PREPARAÇÃO PARA PUBLICAÇÃO                             │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📋 Checklist de Publicação:                              │
│                                                           │
│ ✅ Caso validado sem erros críticos                      │
│ ✅ Teste de jogabilidade aprovado                        │
│ ✅ Metadados completos e corretos                        │
│ ✅ Arquivos de evidência otimizados                      │
│ ⚠️  Revisão de conteúdo pendente                         │
│ ❌ Avaliação de dificuldade não realizada                │
│                                                           │
│ 📊 Informações de Release:                               │
│ Versão: [1.0.0_______] Canal: [Beta Testing ▼]          │
│ Tags: [roubo] [museu] [intermediário] [lisboa]           │
│                                                           │
│ 👥 Permissões de Acesso:                                 │
│ ☑️ Instrutores Nivel 2+    ☑️ Beta Testers              │
│ ☐ Todos os Usuários       ☐ Apenas Administradores      │
│                                                           │
│ 📝 Notas da Versão:                                      │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ - Primeiro caso de roubo em museu                   │   │
│ │ - Foco em análise de impressões digitais           │   │
│ │ - Inclui vídeo de segurança realista               │   │
│ │ - Adequado para treinamento básico de investigação │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ [ 📤 Publicar ] [ 👁️ Preview Final ] [ 💾 Salvar Rascunho ] │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Distribuição e Analytics

```text
┌───────────────────────────────────────────────────────────┐
│ 📈 ANALYTICS E DISTRIBUIÇÃO                               │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📊 Estatísticas de Uso (Últimos 30 dias):                │
│                                                           │
│ 👥 Usuários Únicos: 245                                  │
│ 🎮 Tentativas: 398                                       │
│ ✅ Taxa de Conclusão: 73%                                │
│ ⭐ Avaliação Média: 4.2/5.0                              │
│ ⏱️  Tempo Médio: 78 minutos                              │
│                                                           │
│ 📍 Distribuição Geográfica:                              │
│ • Portugal: 45%        • Brasil: 28%                     │
│ • Espanha: 15%         • Outros: 12%                     │
│                                                           │
│ 💬 Feedback dos Usuários:                                │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ "Caso bem estruturado, evidências realistas"       │   │
│ │ "Dificuldade apropriada para iniciantes"           │   │
│ │ "Gostaria de mais opções de interrogatório"        │   │
│ │ "Vídeo de segurança muito bem produzido"           │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 🔄 Atualizações Sugeridas:                               │
│ • Adicionar mais linhas de investigação                  │
│ • Melhorar variedade de testemunhas                      │
│ • Incluir análises químicas opcionais                    │
│                                                           │
│ [ 📊 Relatório Completo ] [ 🔄 Atualizar Caso ]          │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 🛠️ Implementação Técnica

### API de Criação de Casos

```typescript
interface CaseCreationAPI {
  // Criar novo caso
  createCase(caseData: CaseMetadata): Promise<CaseId>;
  
  // Upload de evidências
  uploadEvidence(caseId: CaseId, files: File[]): Promise<EvidenceId[]>;
  
  // Configurar análises
  configureAnalysis(evidenceId: EvidenceId, analysis: AnalysisConfig): Promise<void>;
  
  // Validar caso
  validateCase(caseId: CaseId): Promise<ValidationResult>;
  
  // Publicar caso
  publishCase(caseId: CaseId, publishConfig: PublishConfig): Promise<void>;
}
```

### Estrutura de Dados

```typescript
interface CaseMetadata {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime: number; // minutos
  tags: string[];
  gameSettings: GameSettings;
  briefing: BriefingConfig;
  solution: SolutionConfig;
  scoring: ScoringConfig;
}

interface EvidenceConfig {
  id: string;
  name: string;
  type: EvidenceType;
  location: string;
  description: string;
  files: FileReference[];
  analysisOptions: AnalysisOption[];
  hints: string[];
  collectible: boolean;
}

interface AnalysisOption {
  type: AnalysisType;
  cost: number;
  time: number; // segundos
  successRate: number; // 0-1
  results: AnalysisResult[];
}
```

## 🎯 Boas Práticas

### Design de Casos

1. **Realismo**: Baseie casos em situações reais
2. **Progressão**: Crie dificuldade crescente
3. **Múltiplas Soluções**: Permita diferentes abordagens
4. **Feedback**: Forneça orientação sem spoilers

### Evidências

1. **Variedade**: Use diferentes tipos de evidência
2. **Qualidade**: Arquivos de alta qualidade
3. **Relevância**: Todas as evidências devem ter propósito
4. **Acessibilidade**: Considere limitações técnicas

### Balanceamento

1. **Tempo vs. Orçamento**: Equilibre recursos disponíveis
2. **Dificuldade**: Teste com usuários reais
3. **Alternativas**: Ofereça múltiplos caminhos
4. **Economia**: Evite evidências redundantes

## 🔮 Funcionalidades Futuras

- **IA Assistente**: Sugestões automáticas de evidências
- **Colaboração**: Criação em equipe
- **Versionamento Avançado**: Controle de mudanças
- **Templates Inteligentes**: Geração automática
- **Realidade Virtual**: Evidências imersivas

---

**Próximo**: [09-evidence-management.md](09-evidence-management.md) - Gerenciamento de Evidências
