# 🎓 Tutoriais Interativos - CaseZero

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tutorial 1: Primeiro Login](#tutorial-1-primeiro-login)
- [Tutorial 2: Navegação Básica](#tutorial-2-navegação-básica)
- [Tutorial 3: Criando seu Primeiro Caso](#tutorial-3-criando-seu-primeiro-caso)
- [Tutorial 4: Upload de Evidências](#tutorial-4-upload-de-evidências)
- [Tutorial 5: Análise Forense](#tutorial-5-análise-forense)
- [Tutorial 6: Interrogatórios](#tutorial-6-interrogatórios)
- [Tutorial 7: Relatórios](#tutorial-7-relatórios)
- [Tutorial 8: Colaboração em Equipe](#tutorial-8-colaboração-em-equipe)
- [Certificações](#certificações)

---

## 🎯 Visão Geral

Os Tutoriais Interativos do CaseZero foram desenvolvidos para oferecer uma experiência de aprendizado passo-a-passo, permitindo que investigadores dominem todas as funcionalidades do sistema de forma prática e progressiva.

### 🌟 Características dos Tutoriais

- **Interatividade**: Cada tutorial inclui exercícios práticos
- **Progressão**: Níveis crescentes de complexidade
- **Avaliação**: Sistema de pontuação e feedback
- **Certificação**: Certificados de conclusão
- **Suporte**: Ajuda contextual em cada etapa

### 📊 Sistema de Progresso

```typescript
interface TutorialProgress {
  userId: string;
  tutorialId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "CERTIFIED";
  currentStep: number;
  totalSteps: number;
  score: number;
  timeSpent: number; // minutos
  startedAt: Date;
  completedAt?: Date;
  attempts: number;
  lastAccessed: Date;
}

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  type: "INSTRUCTION" | "PRACTICE" | "QUIZ" | "SIMULATION";
  content: string;
  expectedActions: Action[];
  hints: string[];
  timeLimit?: number; // minutos
  points: number;
}
```

---

## 🚪 Tutorial 1: Primeiro Login

### 📝 Objetivos de Aprendizado

Ao final deste tutorial, você será capaz de:
- Fazer login no sistema CaseZero
- Navegar pela interface principal
- Configurar seu perfil básico
- Entender os tipos de notificações

### ⏱️ Duração Estimada: 15 minutos

### 🔢 Etapas do Tutorial

#### Etapa 1.1: Acessando o Sistema

**Instrução:**
1. Abra seu navegador web
2. Acesse a URL: `https://casezero.police.gov`
3. Clique no botão "Login"

**Dica:** 💡 Use sempre HTTPS para garantir a segurança da conexão

```typescript
// Simulação da tela de login
const LoginScreen = () => {
  const [credentials, setCredentials] = useState({
    badge: "",
    password: ""
  });

  return (
    <div className="login-container">
      <h1>CaseZero - Sistema Policial</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Número do Badge"
          value={credentials.badge}
          onChange={(e) => setCredentials({
            ...credentials, 
            badge: e.target.value
          })}
        />
        <input 
          type="password" 
          placeholder="Senha"
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials, 
            password: e.target.value
          })}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
```

#### Etapa 1.2: Inserindo Credenciais

**Instrução:**
1. Digite seu número de badge no campo "Badge"
2. Digite sua senha temporária
3. Clique em "Entrar"

**Para este tutorial, use:**
- Badge: `DEMO001`
- Senha: `TutorialDemo2025!`

**Exercício Prático:**
```javascript
// Validação que o sistema fará
const validateCredentials = (badge, password) => {
  const validationRules = {
    badge: /^[A-Z]{2,4}\d{3,4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  };
  
  return {
    badgeValid: validationRules.badge.test(badge),
    passwordValid: validationRules.password.test(password)
  };
};
```

#### Etapa 1.3: Primeiro Login - Configuração

**O que acontece no primeiro login:**

1. **Alteração de Senha**
   ```typescript
   const PasswordChangeModal = () => {
     const [newPassword, setNewPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     
     const passwordStrength = calculatePasswordStrength(newPassword);
     
     return (
       <Modal title="Alterar Senha">
         <p>Por segurança, você deve alterar sua senha temporária</p>
         <PasswordInput 
           value={newPassword}
           onChange={setNewPassword}
           strength={passwordStrength}
         />
         <PasswordInput 
           value={confirmPassword}
           onChange={setConfirmPassword}
           placeholder="Confirme a nova senha"
         />
         <button onClick={handlePasswordChange}>
           Alterar Senha
         </button>
       </Modal>
     );
   };
   ```

2. **Aceite de Termos**
   - Leia os Termos de Uso
   - Aceite a Política de Privacidade
   - Confirme o Código de Conduta

3. **Tour da Interface**
   - Visão geral do dashboard
   - Localização dos menus principais
   - Área de notificações

#### Etapa 1.4: Configurando seu Perfil

**Informações obrigatórias:**
```typescript
interface UserProfile {
  badge: string; // Já preenchido
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  rank: string;
  phone: string;
  profilePhoto?: File;
  preferences: {
    language: "pt-BR" | "en-US";
    timezone: string;
    notifications: NotificationSettings;
  };
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  caseUpdates: boolean;
  systemAlerts: boolean;
  weeklyReports: boolean;
}
```

**Exercício:**
Complete seu perfil com as seguintes informações:
- Nome: [Seu nome]
- Email: [Seu email corporativo]
- Departamento: "Treinamento"
- Cargo: "Investigador Trainee"

### ✅ Checkpoint 1

**Quiz - Primeiro Login:**

1. **Qual é o formato correto de um badge?**
   - a) 123ABC
   - b) ABC123 ✓
   - c) A1B2C3
   - d) 123456

2. **O que acontece no primeiro login?**
   - a) Apenas login normal
   - b) Alteração de senha obrigatória ✓
   - c) Bloqueio da conta
   - d) Logout automático

3. **Onde você encontra as configurações de notificação?**
   - a) Menu principal
   - b) Perfil do usuário ✓
   - c) Dashboard
   - d) Configurações do sistema

**Pontuação:** 3/3 corretas = 100 pontos

---

## 🧭 Tutorial 2: Navegação Básica

### 📝 Objetivos de Aprendizado

- Conhecer todos os menus e seções
- Usar a barra de pesquisa eficientemente
- Configurar atalhos personalizados
- Entender o sistema de notificações

### ⏱️ Duração Estimada: 20 minutos

### 🔢 Etapas do Tutorial

#### Etapa 2.1: Interface Principal

**Componentes da Tela Principal:**

```typescript
const MainInterface = () => {
  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      <MainContent />
      <NotificationPanel />
      <Footer />
    </div>
  );
};

// Estrutura do Header
const Header = () => {
  return (
    <header className="main-header">
      <Logo />
      <SearchBar />
      <UserMenu />
      <NotificationBell />
      <SystemClock />
    </header>
  );
};

// Estrutura da Sidebar
const Sidebar = () => {
  const menuItems = [
    { icon: "🏠", label: "Dashboard", path: "/" },
    { icon: "📁", label: "Casos", path: "/cases" },
    { icon: "🔍", label: "Evidências", path: "/evidence" },
    { icon: "👥", label: "Pessoas", path: "/people" },
    { icon: "📊", label: "Relatórios", path: "/reports" },
    { icon: "⚙️", label: "Configurações", path: "/settings" }
  ];

  return (
    <nav className="sidebar">
      {menuItems.map(item => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  );
};
```

#### Etapa 2.2: Usando a Barra de Pesquisa

**Funcionalidades da Pesquisa:**

```typescript
interface SearchResult {
  type: "CASE" | "PERSON" | "EVIDENCE" | "DOCUMENT";
  id: string;
  title: string;
  description: string;
  relevance: number;
  lastModified: Date;
}

const SmartSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState({
    type: "ALL",
    dateRange: null,
    department: null
  });

  const searchExamples = [
    "Caso João Silva",
    "Evidence: fingerprint",
    "Robbery 2025",
    "Badge: ABC123"
  ];

  return (
    <div className="search-container">
      <SearchInput 
        value={query}
        onChange={setQuery}
        placeholder="Pesquisar casos, pessoas, evidências..."
      />
      <SearchFilters 
        filters={filters}
        onChange={setFilters}
      />
      <SearchResults results={results} />
      <SearchTips examples={searchExamples} />
    </div>
  );
};
```

**Exercício Prático:**
1. Digite "Demo" na barra de pesquisa
2. Use o filtro "Casos"
3. Clique no primeiro resultado

#### Etapa 2.3: Sistema de Notificações

**Tipos de Notificações:**

```typescript
enum NotificationType {
  CASE_ASSIGNED = "CASE_ASSIGNED",
  EVIDENCE_READY = "EVIDENCE_READY", 
  DEADLINE_APPROACHING = "DEADLINE_APPROACHING",
  SYSTEM_UPDATE = "SYSTEM_UPDATE",
  MESSAGE_RECEIVED = "MESSAGE_RECEIVED"
}

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionLabel?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "HIGH_PRIORITY">("ALL");

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  return (
    <div className="notification-center">
      <NotificationFilters filter={filter} onChange={setFilter} />
      <NotificationList 
        notifications={notifications}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
};
```

### ✅ Checkpoint 2

**Quiz - Navegação:**

1. **Qual ícone representa a seção de Casos?**
   - a) 🏠
   - b) 📁 ✓
   - c) 🔍
   - d) 👥

2. **Como acessar as configurações de notificação?**
   - a) Menu principal → Configurações
   - b) Perfil do usuário → Configurações ✓
   - c) Dashboard → Configurações
   - d) Não é possível configurar

**Pontuação:** 2/2 corretas = 100 pontos

---

## 📁 Tutorial 3: Criando seu Primeiro Caso

### 📝 Objetivos de Aprendizado

- Criar um caso de investigação
- Definir prioridade e categoria
- Adicionar informações básicas
- Atribuir investigadores

### ⏱️ Duração Estimada: 25 minutos

### 🔢 Etapas do Tutorial

#### Etapa 3.1: Acessando a Criação de Casos

**Passos:**
1. Clique em "📁 Casos" no menu lateral
2. Clique no botão "➕ Novo Caso"
3. Selecione "Criar Caso Manualmente"

```typescript
const CreateCaseWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseData, setCaseData] = useState<Partial<Case>>({
    title: "",
    category: "",
    priority: "MEDIUM",
    description: "",
    location: "",
    reportedBy: "",
    assignedTo: []
  });

  const steps = [
    { number: 1, title: "Informações Básicas", component: BasicInfoStep },
    { number: 2, title: "Localização e Contexto", component: LocationStep },
    { number: 3, title: "Atribuições", component: AssignmentStep },
    { number: 4, title: "Revisão", component: ReviewStep }
  ];

  return (
    <div className="case-wizard">
      <WizardProgress steps={steps} currentStep={currentStep} />
      <StepContent 
        step={steps[currentStep - 1]}
        data={caseData}
        onChange={setCaseData}
      />
      <WizardNavigation 
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={() => setCurrentStep(prev => prev + 1)}
        onPrevious={() => setCurrentStep(prev => prev - 1)}
      />
    </div>
  );
};
```

#### Etapa 3.2: Informações Básicas

**Formulário do Caso:**

```typescript
interface CaseBasicInfo {
  title: string;
  caseNumber: string; // Auto-gerado
  category: CaseCategory;
  priority: CasePriority;
  description: string;
  keywords: string[];
  estimatedDuration: number; // horas
}

const BasicInfoStep = ({ data, onChange }) => {
  const categories = [
    { id: "THEFT", name: "Furto/Roubo", icon: "💰" },
    { id: "ASSAULT", name: "Agressão", icon: "👊" },
    { id: "FRAUD", name: "Fraude", icon: "💳" },
    { id: "VANDALISM", name: "Vandalismo", icon: "🔨" },
    { id: "DRUG", name: "Drogas", icon: "💊" },
    { id: "OTHER", name: "Outros", icon: "📋" }
  ];

  return (
    <form className="basic-info-form">
      <FormField label="Título do Caso" required>
        <input 
          type="text"
          value={data.title}
          onChange={(e) => onChange({...data, title: e.target.value})}
          placeholder="Descreva brevemente o caso"
        />
      </FormField>

      <FormField label="Categoria" required>
        <CategorySelector 
          categories={categories}
          selected={data.category}
          onChange={(category) => onChange({...data, category})}
        />
      </FormField>

      <FormField label="Prioridade" required>
        <PrioritySelector 
          value={data.priority}
          onChange={(priority) => onChange({...data, priority})}
        />
      </FormField>

      <FormField label="Descrição Detalhada" required>
        <textarea 
          value={data.description}
          onChange={(e) => onChange({...data, description: e.target.value})}
          placeholder="Descreva os detalhes do caso..."
          rows={4}
        />
      </FormField>
    </form>
  );
};
```

**Exercício Prático:**
Complete o formulário com:
- Título: "Furto de Notebook - Tutorial"
- Categoria: "Furto/Roubo"
- Prioridade: "Média"
- Descrição: "Notebook Dell Inspiron furtado da sala de treinamento durante o horário de almoço."

#### Etapa 3.3: Localização e Contexto

```typescript
const LocationStep = ({ data, onChange }) => {
  const [coordinates, setCoordinates] = useState(null);
  
  return (
    <div className="location-step">
      <FormField label="Endereço" required>
        <AddressInput 
          value={data.location?.address}
          onChange={(address) => onChange({
            ...data, 
            location: { ...data.location, address }
          })}
        />
      </FormField>

      <FormField label="Coordenadas GPS">
        <GPSInput 
          coordinates={coordinates}
          onChange={setCoordinates}
        />
        <button type="button" onClick={getCurrentLocation}>
          📍 Usar Localização Atual
        </button>
      </FormField>

      <FormField label="Data e Hora do Incidente" required>
        <DateTimeInput 
          value={data.incidentDateTime}
          onChange={(dateTime) => onChange({...data, incidentDateTime: dateTime})}
        />
      </FormField>

      <FormField label="Testemunhas">
        <WitnessInput 
          witnesses={data.witnesses}
          onChange={(witnesses) => onChange({...data, witnesses})}
        />
      </FormField>
    </div>
  );
};
```

#### Etapa 3.4: Atribuindo Investigadores

```typescript
const AssignmentStep = ({ data, onChange }) => {
  const [availableInvestigators, setAvailableInvestigators] = useState([]);
  
  useEffect(() => {
    loadAvailableInvestigators().then(setAvailableInvestigators);
  }, []);

  const assignInvestigator = (investigator) => {
    const newAssignments = [...(data.assignedTo || []), {
      userId: investigator.id,
      role: "PRIMARY",
      assignedAt: new Date()
    }];
    onChange({...data, assignedTo: newAssignments});
  };

  return (
    <div className="assignment-step">
      <h3>Investigadores Disponíveis</h3>
      <InvestigatorList 
        investigators={availableInvestigators}
        onAssign={assignInvestigator}
      />
      
      <h3>Equipe Atribuída</h3>
      <AssignedTeam 
        assignments={data.assignedTo}
        onChange={(assignedTo) => onChange({...data, assignedTo})}
      />
    </div>
  );
};
```

### ✅ Checkpoint 3

**Simulação Prática:**
1. Crie um caso completo usando as informações fornecidas
2. Atribua pelo menos um investigador
3. Revise todas as informações
4. Clique em "Criar Caso"

**Critérios de Avaliação:**
- Título claro e descritivo ✓
- Categoria apropriada ✓
- Prioridade adequada ✓
- Descrição detalhada ✓
- Localização preenchida ✓
- Investigador atribuído ✓

**Pontuação:** 6/6 critérios = 100 pontos

---

## 📎 Tutorial 4: Upload de Evidências

### 📝 Objetivos
- Fazer upload de diferentes tipos de evidência
- Organizar evidências por categoria
- Adicionar metadados e descrições
- Iniciar análises automáticas

### ⏱️ Duração: 20 minutos

### Etapas Práticas

#### 4.1: Tipos de Evidência Suportados

```typescript
const supportedEvidenceTypes = {
  PHOTO: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif'],
    maxSize: '10MB',
    autoAnalysis: ['facial_recognition', 'object_detection']
  },
  DOCUMENT: {
    extensions: ['.pdf', '.doc', '.docx', '.txt'],
    maxSize: '50MB', 
    autoAnalysis: ['text_extraction', 'handwriting_analysis']
  },
  AUDIO: {
    extensions: ['.mp3', '.wav', '.m4a'],
    maxSize: '100MB',
    autoAnalysis: ['voice_recognition', 'audio_enhancement']
  },
  VIDEO: {
    extensions: ['.mp4', '.avi', '.mov'],
    maxSize: '500MB',
    autoAnalysis: ['motion_detection', 'facial_recognition']
  }
};
```

**Exercício:** Upload de uma foto de evidência simulada

---

## 🔬 Tutorial 5: Análise Forense

### 📝 Objetivos
- Solicitar análises especializadas
- Interpretar resultados de laboratório
- Gerenciar prazos de análise
- Documentar conclusões

### ⏱️ Duração: 30 minutos

### Laboratórios Disponíveis

```typescript
const forensicLabs = {
  FINGERPRINT: {
    name: "Laboratório de Papiloscopia",
    analysisTime: 24, // horas
    specializations: ['digital', 'latent', 'comparison']
  },
  DNA: {
    name: "Laboratório de DNA",
    analysisTime: 72, // horas
    specializations: ['paternity', 'identification', 'mixture']
  },
  BALLISTICS: {
    name: "Laboratório de Balística", 
    analysisTime: 48, // horas
    specializations: ['firearms', 'ammunition', 'trajectory']
  }
};
```

---

## 🎤 Tutorial 6: Interrogatórios

### 📝 Objetivos
- Agendar interrogatórios
- Preparar roteiro de perguntas
- Registrar depoimentos
- Analisar inconsistências

### ⏱️ Duração: 35 minutos

### Sistema de Interrogatório

```typescript
interface Interrogation {
  id: string;
  caseId: string;
  subjectId: string;
  interviewerId: string;
  scheduledFor: Date;
  type: 'WITNESS' | 'SUSPECT' | 'VICTIM';
  questions: Question[];
  transcript: string;
  recording?: File;
  notes: string;
}

const InterrogationRoom = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  
  return (
    <div className="interrogation-interface">
      <QuestionPanel 
        question={questions[currentQuestion]}
        onNext={() => setCurrentQuestion(prev => prev + 1)}
      />
      <ResponseCapture 
        onResponse={(response) => setResponses([...responses, response])}
      />
      <NotesPanel />
    </div>
  );
};
```

---

## 📊 Tutorial 7: Relatórios

### 📝 Objetivos
- Gerar relatórios de investigação
- Personalizar templates
- Exportar documentos
- Compartilhar com superiores

### Templates Disponíveis

```typescript
const reportTemplates = {
  INVESTIGATION_SUMMARY: {
    name: "Resumo de Investigação",
    sections: ['case_overview', 'evidence_summary', 'suspects', 'conclusion']
  },
  EVIDENCE_REPORT: {
    name: "Relatório de Evidências",
    sections: ['evidence_list', 'analysis_results', 'chain_of_custody']
  },
  FINAL_REPORT: {
    name: "Relatório Final",
    sections: ['complete_investigation', 'timeline', 'recommendations']
  }
};
```

---

## 👥 Tutorial 8: Colaboração em Equipe

### 📝 Objetivos
- Compartilhar casos com colegas
- Usar chat e comentários
- Atribuir tarefas
- Coordenar investigações

### Sistema de Colaboração

```typescript
interface TeamCollaboration {
  caseId: string;
  teamMembers: TeamMember[];
  sharedResources: Resource[];
  communications: Message[];
  tasks: Task[];
}

const CollaborationHub = () => {
  return (
    <div className="collaboration-hub">
      <TeamChat />
      <TaskAssignment />
      <SharedEvidence />
      <ProgressTracking />
    </div>
  );
};
```

---

## 🏆 Certificações

### 📜 Níveis de Certificação

#### 🥉 Certificação Básica
**Requisitos:**
- Completar Tutoriais 1-4
- Pontuação mínima: 80%
- Tempo máximo: 2 horas

**Habilidades Certificadas:**
- Login e navegação
- Criação básica de casos
- Upload de evidências

#### 🥈 Certificação Intermediária
**Requisitos:**
- Certificação Básica
- Completar Tutoriais 5-6
- Pontuação mínima: 85%
- Caso prático aprovado

**Habilidades Certificadas:**
- Análise forense
- Interrogatórios
- Gestão avançada de casos

#### 🥇 Certificação Avançada
**Requisitos:**
- Certificação Intermediária
- Completar todos os tutoriais
- Pontuação mínima: 90%
- Projeto final aprovado

**Habilidades Certificadas:**
- Investigação completa
- Relatórios profissionais
- Liderança de equipe

### 🎖️ Sistema de Badges

```typescript
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: BadgeCriteria;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
}

const availableBadges = [
  {
    id: 'first_case',
    name: 'Primeiro Caso',
    description: 'Criou seu primeiro caso',
    icon: '🔰',
    rarity: 'COMMON'
  },
  {
    id: 'evidence_expert',
    name: 'Especialista em Evidências',
    description: 'Analisou 50 evidências',
    icon: '🔍',
    rarity: 'RARE'
  },
  {
    id: 'case_closer',
    name: 'Solucionador',
    description: 'Resolveu 10 casos',
    icon: '✅',
    rarity: 'EPIC'
  },
  {
    id: 'master_detective',
    name: 'Detetive Master',
    description: 'Alcançou 100% em todos os tutoriais',
    icon: '🕵️',
    rarity: 'LEGENDARY'
  }
];
```

### 📈 Progresso e Estatísticas

```typescript
interface UserProgress {
  userId: string;
  tutorialsCompleted: number;
  totalScore: number;
  averageScore: number;
  timeSpent: number; // minutos
  badges: Badge[];
  certificates: Certificate[];
  weakAreas: string[];
  recommendations: string[];
}

const ProgressDashboard = () => {
  const [progress, setProgress] = useState<UserProgress>();
  
  return (
    <div className="progress-dashboard">
      <ProgressOverview progress={progress} />
      <BadgeCollection badges={progress?.badges} />
      <WeakAreasAnalysis areas={progress?.weakAreas} />
      <NextStepsRecommendation recommendations={progress?.recommendations} />
    </div>
  );
};
```

---

## 🎯 Melhores Práticas para Tutoriais

### ✅ Do's (Faça)

- **Complete os tutoriais sequencialmente** para melhor aprendizado
- **Pratique cada funcionalidade** várias vezes
- **Faça anotações** durante os exercícios
- **Peça ajuda** quando necessário
- **Revise conceitos** antes de prosseguir
- **Use dados realistas** nos exercícios

### ❌ Don'ts (Não faça)

- **Não pule etapas** importantes
- **Não ignore os checkpoints** de avaliação
- **Não use dados reais** nos exercícios
- **Não compartilhe** credenciais de tutorial
- **Não desista** ao primeiro erro
- **Não ignore feedback** do sistema

---

## 🆘 Suporte Durante Tutoriais

### 💬 Canais de Ajuda

```typescript
const supportChannels = {
  CHAT: {
    name: "Chat ao Vivo",
    availability: "24/7",
    responseTime: "< 5 minutos"
  },
  EMAIL: {
    name: "Suporte por Email", 
    email: "tutorial-support@casezero.gov",
    responseTime: "< 2 horas"
  },
  FORUM: {
    name: "Fórum da Comunidade",
    url: "/forum/tutorials",
    responseTime: "< 1 hora"
  }
};
```

### 🔄 Sistema de Feedback

```typescript
interface TutorialFeedback {
  tutorialId: string;
  userId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  difficulty: 'VERY_EASY' | 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD';
  clarity: 1 | 2 | 3 | 4 | 5;
  usefulness: 1 | 2 | 3 | 4 | 5;
  comments: string;
  suggestions: string;
  wouldRecommend: boolean;
}
```

---

## 📱 Tutoriais Móveis

### 📲 App Companion

O CaseZero oferece um aplicativo companion para dispositivos móveis que permite:

- **Acesso offline** aos tutoriais básicos
- **Notificações** de progresso
- **Quick Reference** de comandos
- **Sincronização** com a versão web

```typescript
const MobileTutorial = () => {
  const [offlineMode, setOfflineMode] = useState(false);
  
  return (
    <div className="mobile-tutorial">
      <OfflineIndicator isOffline={offlineMode} />
      <TutorialContent adaptedForMobile />
      <TouchOptimizedControls />
      <ProgressSync />
    </div>
  );
};
```

---

## 🌟 Tutoriais Avançados

### 🚀 Módulos Especializados

Para usuários experientes, oferecemos tutoriais avançados:

#### 🔬 Análise Forense Avançada
- Técnicas especializadas de análise
- Integração com laboratórios externos
- Interpretação de resultados complexos

#### 👥 Gestão de Equipes
- Coordenação de investigações grandes
- Delegação eficiente de tarefas
- Comunicação inter-departamental

#### 📊 Analytics e Intelligence
- Análise de padrões criminais
- Uso de IA para insights
- Relatórios estratégicos

---

**Última atualização:** Agosto 2025  
**Versão:** 1.0  
**Próxima revisão:** Setembro 2025

[**Retornar ao índice**](./README.md)
