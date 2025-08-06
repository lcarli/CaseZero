# 👨‍💼 Manual do Administrador - CaseZero

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Acesso Administrativo](#acesso-administrativo)
- [Painel de Controle](#painel-de-controle)
- [Gerenciamento de Usuários](#gerenciamento-de-usuários)
- [Gerenciamento de Departamentos](#gerenciamento-de-departamentos)
- [Configurações do Sistema](#configurações-do-sistema)
- [Gerenciamento de Casos](#gerenciamento-de-casos)
- [Monitoramento e Relatórios](#monitoramento-e-relatórios)
- [Backup e Segurança](#backup-e-segurança)
- [Manutenção do Sistema](#manutenção-do-sistema)
- [Solução de Problemas](#solução-de-problemas)

---

## 🎯 Visão Geral

O Manual do Administrador fornece orientações completas para gerenciar o sistema CaseZero, incluindo gestão de usuários, configurações de sistema, monitoramento e manutenção.

### 📋 Responsabilidades do Administrador

- **Gestão de Usuários**: Criar, editar e desativar contas
- **Configuração de Departamentos**: Organizar estrutura organizacional
- **Monitoramento**: Acompanhar uso e performance do sistema
- **Segurança**: Manter integridade e segurança dos dados
- **Manutenção**: Realizar backups e atualizações

---

## 🔐 Acesso Administrativo

### 🚪 Login Administrativo

```typescript
// Tipos de usuário administrativo
enum UserRole {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  DEPARTMENT_ADMIN = "DEPARTMENT_ADMIN",
  CASE_MANAGER = "CASE_MANAGER"
}

// Níveis de acesso
interface AdminAccess {
  canManageUsers: boolean;
  canManageDepartments: boolean;
  canViewAllCases: boolean;
  canConfigureSystem: boolean;
  canAccessReports: boolean;
}
```

### 🛡️ Verificação de Permissões

1. **Acesse o Sistema**
   - URL: `/admin/login`
   - Credenciais administrativas necessárias
   - Autenticação two-factor (se habilitada)

2. **Verificar Nível de Acesso**
   ```bash
   # Verificar permissões via API
   GET /api/auth/permissions
   Authorization: Bearer {admin_token}
   ```

3. **Dashboard Administrativo**
   - Acesso direto: `/admin/dashboard`
   - Visão geral do sistema
   - Alertas e notificações

---

## 🎛️ Painel de Controle

### 📊 Dashboard Principal

```jsx
// Componente Dashboard Administrativo
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <SystemOverview />
      <UserStatistics />
      <CaseStatistics />
      <SystemHealth />
      <RecentActivity />
      <QuickActions />
    </div>
  );
};
```

### 📈 Métricas em Tempo Real

- **Usuários Ativos**: Número de usuários logados
- **Casos em Andamento**: Investigações ativas
- **Performance**: Tempo de resposta, uso de CPU/memória
- **Alertas**: Problemas que requerem atenção
- **Atividade Recente**: Log de ações importantes

### ⚡ Ações Rápidas

```typescript
interface QuickAction {
  id: string;
  title: string;
  description: string;
  action: () => void;
  permission: string;
}

const quickActions: QuickAction[] = [
  {
    id: "create-user",
    title: "Criar Usuário",
    description: "Adicionar novo investigador",
    action: () => navigate("/admin/users/create"),
    permission: "MANAGE_USERS"
  },
  {
    id: "backup-system",
    title: "Backup Manual",
    description: "Iniciar backup do sistema",
    action: () => initiateBackup(),
    permission: "SYSTEM_ADMIN"
  }
];
```

---

## 👥 Gerenciamento de Usuários

### ➕ Criação de Usuários

```typescript
interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  badge: string;
  department: string;
  role: UserRole;
  permissions: string[];
  temporaryPassword: string;
}

// Formulário de criação
const CreateUserForm = () => {
  const [userData, setUserData] = useState<CreateUserRequest>({
    email: "",
    firstName: "",
    lastName: "",
    badge: "",
    department: "",
    role: UserRole.INVESTIGATOR,
    permissions: [],
    temporaryPassword: generateTempPassword()
  });

  const handleSubmit = async () => {
    try {
      await createUser(userData);
      showNotification("Usuário criado com sucesso");
      sendWelcomeEmail(userData.email);
    } catch (error) {
      handleError(error);
    }
  };
};
```

### ✏️ Edição de Usuários

1. **Localizar Usuário**
   - Busca por email, badge ou nome
   - Filtros por departamento e status
   - Ordenação por última atividade

2. **Campos Editáveis**
   ```typescript
   interface EditableUserFields {
     firstName: string;
     lastName: string;
     email: string;
     badge: string;
     department: string;
     role: UserRole;
     isActive: boolean;
     permissions: string[];
     lastPasswordChange: Date;
   }
   ```

3. **Histórico de Alterações**
   ```sql
   -- Auditoria de mudanças
   SELECT 
     u.email,
     ua.action,
     ua.field_changed,
     ua.old_value,
     ua.new_value,
     ua.changed_by,
     ua.changed_at
   FROM user_audit ua
   JOIN users u ON ua.user_id = u.id
   ORDER BY ua.changed_at DESC;
   ```

### 🔒 Desativação de Usuários

```typescript
interface DeactivateUserOptions {
  reason: string;
  transferCasesTo?: string;
  keepDataFor: number; // dias
  notifyUser: boolean;
}

const deactivateUser = async (
  userId: string, 
  options: DeactivateUserOptions
) => {
  // 1. Transferir casos ativos
  if (options.transferCasesTo) {
    await transferUserCases(userId, options.transferCasesTo);
  }

  // 2. Desativar conta
  await updateUser(userId, { 
    isActive: false,
    deactivatedAt: new Date(),
    deactivationReason: options.reason
  });

  // 3. Revogar tokens
  await revokeAllUserTokens(userId);

  // 4. Notificar usuário
  if (options.notifyUser) {
    await sendDeactivationNotification(userId);
  }
};
```

---

## 🏢 Gerenciamento de Departamentos

### 🏗️ Estrutura Organizacional

```typescript
interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  parentDepartment?: string;
  chief: string; // ID do chefe
  location: string;
  budget: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Hierarquia de departamentos
const departmentHierarchy = {
  "POLICE_HEADQUARTERS": {
    name: "Delegacia Central",
    children: {
      "HOMICIDE": {
        name: "Homicídios",
        teams: ["TEAM_A", "TEAM_B"]
      },
      "ROBBERY": {
        name: "Roubos e Furtos",
        teams: ["TEAM_C", "TEAM_D"]
      },
      "NARCOTICS": {
        name: "Narcóticos",
        teams: ["TEAM_E"]
      }
    }
  }
};
```

### ➕ Criar Departamento

```typescript
const CreateDepartmentForm = () => {
  const [department, setDepartment] = useState<Partial<Department>>({
    name: "",
    code: "",
    description: "",
    parentDepartment: null,
    chief: "",
    location: "",
    budget: 0
  });

  const handleSubmit = async () => {
    // Validações
    if (!department.name || !department.code) {
      throw new Error("Nome e código são obrigatórios");
    }

    // Verificar se código já existe
    const existingDept = await getDepartmentByCode(department.code);
    if (existingDept) {
      throw new Error("Código já existe");
    }

    // Criar departamento
    const newDept = await createDepartment(department);
    
    // Notificar chefe designado
    if (department.chief) {
      await notifyNewDepartmentChief(department.chief, newDept.id);
    }
  };
};
```

### 👥 Atribuição de Membros

```typescript
interface DepartmentMember {
  userId: string;
  departmentId: string;
  role: "CHIEF" | "SUPERVISOR" | "INVESTIGATOR" | "ANALYST";
  joinedAt: Date;
  isActive: boolean;
}

const assignUserToDepartment = async (
  userId: string,
  departmentId: string,
  role: string
) => {
  // Verificar se usuário já está no departamento
  const existing = await getDepartmentMember(userId, departmentId);
  if (existing) {
    throw new Error("Usuário já pertence ao departamento");
  }

  // Verificar capacidade do departamento
  const memberCount = await getDepartmentMemberCount(departmentId);
  const department = await getDepartment(departmentId);
  
  if (memberCount >= department.maxMembers) {
    throw new Error("Departamento está no limite de membros");
  }

  // Atribuir usuário
  await createDepartmentMember({
    userId,
    departmentId,
    role,
    joinedAt: new Date(),
    isActive: true
  });

  // Log da ação
  await logAdminAction({
    action: "ASSIGN_USER_TO_DEPARTMENT",
    targetUserId: userId,
    departmentId,
    role
  });
};
```

---

## ⚙️ Configurações do Sistema

### 🔧 Configurações Gerais

```typescript
interface SystemConfig {
  // Configurações de autenticação
  auth: {
    sessionTimeout: number; // minutos
    maxLoginAttempts: number;
    requireTwoFactor: boolean;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expirationDays: number;
    };
  };

  // Configurações de casos
  cases: {
    autoArchiveAfterDays: number;
    maxEvidenceFileSize: number; // MB
    allowedFileTypes: string[];
    requireSupervisorApproval: boolean;
  };

  // Configurações de sistema
  system: {
    maintenanceMode: boolean;
    backupFrequency: string; // cron expression
    logRetentionDays: number;
    maxConcurrentUsers: number;
  };
}
```

### 📧 Configurações de Email

```typescript
interface EmailConfig {
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
  };
  templates: {
    welcome: string;
    passwordReset: string;
    caseAssignment: string;
    systemNotification: string;
  };
  notifications: {
    caseUpdates: boolean;
    systemAlerts: boolean;
    weeklyReports: boolean;
  };
}

// Testar configuração de email
const testEmailConfig = async () => {
  try {
    await sendTestEmail({
      to: "admin@example.com",
      subject: "Teste de Configuração",
      body: "Email de teste do CaseZero"
    });
    return { success: true, message: "Email enviado com sucesso" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### 🏷️ Configurações de Metadados

```typescript
interface SystemMetadata {
  evidenceTypes: {
    id: string;
    name: string;
    description: string;
    category: string;
    analysisTime: number; // horas
    requiredEquipment: string[];
  }[];

  caseCategories: {
    id: string;
    name: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    estimatedTime: number; // horas
    requiredPermissions: string[];
  }[];

  departments: {
    id: string;
    name: string;
    jurisdiction: string[];
    specializations: string[];
  }[];
}
```

---

## 📁 Gerenciamento de Casos

### 📊 Visão Geral de Casos

```typescript
interface CaseOverview {
  total: number;
  byStatus: Record<CaseStatus, number>;
  byDepartment: Record<string, number>;
  byPriority: Record<CasePriority, number>;
  avgResolutionTime: number; // dias
  openCasesOlderThan30Days: number;
}

const CaseManagementDashboard = () => {
  const [overview, setOverview] = useState<CaseOverview>();
  const [filters, setFilters] = useState({
    department: "",
    status: "",
    dateRange: { start: "", end: "" }
  });

  useEffect(() => {
    loadCaseOverview(filters).then(setOverview);
  }, [filters]);

  return (
    <div className="case-management">
      <CaseStatistics overview={overview} />
      <CaseFilters filters={filters} onChange={setFilters} />
      <CaseList filters={filters} />
      <CaseActions />
    </div>
  );
};
```

### 🔄 Transferência de Casos

```typescript
interface CaseTransfer {
  caseId: string;
  fromDepartment: string;
  toDepartment: string;
  reason: string;
  transferredBy: string;
  approvedBy?: string;
  transferDate: Date;
  notes?: string;
}

const transferCase = async (transfer: CaseTransfer) => {
  // 1. Validar permissões
  const canTransfer = await validateTransferPermission(
    transfer.transferredBy,
    transfer.fromDepartment,
    transfer.toDepartment
  );

  if (!canTransfer) {
    throw new Error("Sem permissão para transferir caso");
  }

  // 2. Verificar capacidade do departamento destino
  const targetDeptLoad = await getDepartmentCaseLoad(transfer.toDepartment);
  if (targetDeptLoad > MAX_CASES_PER_DEPARTMENT) {
    throw new Error("Departamento destino está sobrecarregado");
  }

  // 3. Executar transferência
  await updateCase(transfer.caseId, {
    departmentId: transfer.toDepartment,
    status: "TRANSFERRED",
    transferHistory: [transfer]
  });

  // 4. Notificar departamentos
  await notifyDepartmentTransfer(transfer);

  // 5. Log da ação
  await logAdminAction({
    action: "CASE_TRANSFER",
    caseId: transfer.caseId,
    details: transfer
  });
};
```

### 📋 Auditoria de Casos

```sql
-- Relatório de auditoria de casos
SELECT 
  c.case_number,
  c.title,
  c.status,
  c.priority,
  d.name as department,
  u.first_name + ' ' + u.last_name as assigned_to,
  c.created_at,
  c.updated_at,
  ca.action,
  ca.performed_by,
  ca.performed_at
FROM cases c
LEFT JOIN departments d ON c.department_id = d.id
LEFT JOIN users u ON c.assigned_to = u.id
LEFT JOIN case_audit ca ON c.id = ca.case_id
WHERE c.created_at >= @start_date
  AND c.created_at <= @end_date
ORDER BY c.created_at DESC, ca.performed_at DESC;
```

---

## 📈 Monitoramento e Relatórios

### 📊 Relatórios de Performance

```typescript
interface PerformanceReport {
  period: {
    start: Date;
    end: Date;
  };
  userActivity: {
    totalLogins: number;
    averageSessionTime: number;
    mostActiveUsers: UserActivity[];
  };
  caseMetrics: {
    totalCases: number;
    casesResolved: number;
    averageResolutionTime: number;
    casesByDepartment: DepartmentMetrics[];
  };
  systemMetrics: {
    averageResponseTime: number;
    errorRate: number;
    uptimePercentage: number;
    diskUsage: number;
  };
}

const generatePerformanceReport = async (
  startDate: Date,
  endDate: Date
): Promise<PerformanceReport> => {
  const [userActivity, caseMetrics, systemMetrics] = await Promise.all([
    getUserActivityMetrics(startDate, endDate),
    getCaseMetrics(startDate, endDate),
    getSystemMetrics(startDate, endDate)
  ]);

  return {
    period: { start: startDate, end: endDate },
    userActivity,
    caseMetrics,
    systemMetrics
  };
};
```

### 📧 Relatórios Automáticos

```typescript
interface AutoReport {
  id: string;
  name: string;
  type: "DAILY" | "WEEKLY" | "MONTHLY";
  schedule: string; // cron expression
  recipients: string[];
  format: "PDF" | "EXCEL" | "EMAIL";
  isActive: boolean;
}

const scheduleAutomaticReports = () => {
  const reports: AutoReport[] = [
    {
      id: "weekly-summary",
      name: "Resumo Semanal",
      type: "WEEKLY",
      schedule: "0 9 * * MON", // Segundas às 9h
      recipients: ["admin@police.gov", "chief@police.gov"],
      format: "PDF",
      isActive: true
    },
    {
      id: "monthly-performance",
      name: "Performance Mensal",
      type: "MONTHLY",
      schedule: "0 9 1 * *", // Primeiro dia do mês às 9h
      recipients: ["admin@police.gov"],
      format: "EXCEL",
      isActive: true
    }
  ];

  reports.forEach(report => {
    if (report.isActive) {
      scheduleJob(report.schedule, () => {
        generateAndSendReport(report);
      });
    }
  });
};
```

### 🚨 Alertas e Notificações

```typescript
interface SystemAlert {
  id: string;
  type: "ERROR" | "WARNING" | "INFO";
  message: string;
  source: string;
  severity: 1 | 2 | 3 | 4 | 5;
  timestamp: Date;
  isRead: boolean;
  actionRequired: boolean;
}

const alertConditions = [
  {
    name: "High Error Rate",
    condition: () => getErrorRate() > 5, // 5% de erro
    severity: 4,
    action: "Verificar logs do sistema"
  },
  {
    name: "Disk Space Low",
    condition: () => getDiskUsage() > 85, // 85% de uso
    severity: 3,
    action: "Limpar arquivos temporários"
  },
  {
    name: "Too Many Failed Logins",
    condition: () => getFailedLoginsLastHour() > 10,
    severity: 2,
    action: "Verificar tentativas de invasão"
  }
];
```

---

## 💾 Backup e Segurança

### 📥 Configuração de Backup

```typescript
interface BackupConfig {
  schedule: {
    daily: string; // cron expression
    weekly: string;
    monthly: string;
  };
  retention: {
    dailyBackups: number; // dias
    weeklyBackups: number; // semanas
    monthlyBackups: number; // meses
  };
  storage: {
    local: {
      enabled: boolean;
      path: string;
    };
    cloud: {
      enabled: boolean;
      provider: "AZURE" | "AWS" | "GCP";
      credentials: any;
      container: string;
    };
  };
  encryption: {
    enabled: boolean;
    algorithm: string;
    keyRotationDays: number;
  };
}

const performBackup = async (type: "FULL" | "INCREMENTAL") => {
  try {
    // 1. Iniciar backup
    const backupId = generateBackupId();
    await logBackupStart(backupId, type);

    // 2. Backup do banco de dados
    await backupDatabase(backupId);

    // 3. Backup de arquivos
    await backupFiles(backupId);

    // 4. Verificar integridade
    const isValid = await verifyBackupIntegrity(backupId);
    if (!isValid) {
      throw new Error("Backup corrompido");
    }

    // 5. Upload para storage externo
    if (config.storage.cloud.enabled) {
      await uploadToCloud(backupId);
    }

    // 6. Limpar backups antigos
    await cleanupOldBackups();

    await logBackupSuccess(backupId);
  } catch (error) {
    await logBackupError(backupId, error);
    throw error;
  }
};
```

### 🔐 Auditoria de Segurança

```typescript
interface SecurityAudit {
  timestamp: Date;
  checks: {
    passwordPolicies: boolean;
    userPermissions: boolean;
    tokenSecurity: boolean;
    dataEncryption: boolean;
    backupIntegrity: boolean;
    systemUpdates: boolean;
  };
  vulnerabilities: SecurityVulnerability[];
  recommendations: string[];
}

const performSecurityAudit = async (): Promise<SecurityAudit> => {
  const checks = {
    passwordPolicies: await checkPasswordPolicies(),
    userPermissions: await checkUserPermissions(),
    tokenSecurity: await checkTokenSecurity(),
    dataEncryption: await checkDataEncryption(),
    backupIntegrity: await checkBackupIntegrity(),
    systemUpdates: await checkSystemUpdates()
  };

  const vulnerabilities = await scanForVulnerabilities();
  const recommendations = generateSecurityRecommendations(checks, vulnerabilities);

  return {
    timestamp: new Date(),
    checks,
    vulnerabilities,
    recommendations
  };
};
```

---

## 🔧 Manutenção do Sistema

### 🛠️ Manutenção Programada

```typescript
interface MaintenanceWindow {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: "UPDATE" | "BACKUP" | "CLEANUP" | "MIGRATION";
  affectedServices: string[];
  notificationSent: boolean;
  isActive: boolean;
}

const scheduleMaintenanceWindow = async (maintenance: MaintenanceWindow) => {
  // 1. Validar horário
  const isOverlapping = await checkOverlappingMaintenance(
    maintenance.startTime,
    maintenance.endTime
  );

  if (isOverlapping) {
    throw new Error("Janela de manutenção sobrepõe outra existente");
  }

  // 2. Agendar manutenção
  await createMaintenanceWindow(maintenance);

  // 3. Agendar notificações
  await scheduleMaintenanceNotifications(maintenance);

  // 4. Agendar ativação do modo manutenção
  scheduleJob(maintenance.startTime, async () => {
    await enableMaintenanceMode(maintenance.id);
  });

  // 5. Agendar desativação do modo manutenção
  scheduleJob(maintenance.endTime, async () => {
    await disableMaintenanceMode(maintenance.id);
  });
};
```

### 🧹 Limpeza de Dados

```typescript
interface CleanupConfig {
  logs: {
    retentionDays: number;
    compressAfterDays: number;
  };
  tempFiles: {
    maxAgeDays: number;
    location: string;
  };
  auditTrail: {
    retentionMonths: number;
  };
  userSessions: {
    expiredSessionCleanup: boolean;
  };
}

const performSystemCleanup = async () => {
  const startTime = new Date();
  const report = {
    logsDeleted: 0,
    tempFilesDeleted: 0,
    auditRecordsArchived: 0,
    sessionsCleared: 0,
    spaceFreeup: 0 // bytes
  };

  try {
    // 1. Limpar logs antigos
    report.logsDeleted = await cleanupOldLogs();

    // 2. Limpar arquivos temporários
    report.tempFilesDeleted = await cleanupTempFiles();

    // 3. Arquivar auditoria antiga
    report.auditRecordsArchived = await archiveOldAuditRecords();

    // 4. Limpar sessões expiradas
    report.sessionsCleared = await cleanupExpiredSessions();

    // 5. Calcular espaço liberado
    report.spaceFreeup = await calculateSpaceFreed(startTime);

    await logCleanupSuccess(report);
    return report;
  } catch (error) {
    await logCleanupError(error);
    throw error;
  }
};
```

### 📊 Monitoramento de Performance

```typescript
interface PerformanceMetrics {
  cpu: {
    usage: number;
    cores: number;
    temperature?: number;
  };
  memory: {
    used: number;
    total: number;
    usage: number;
  };
  disk: {
    used: number;
    total: number;
    usage: number;
    iops: number;
  };
  network: {
    bytesIn: number;
    bytesOut: number;
    connectionsActive: number;
  };
  database: {
    connections: number;
    queryTime: number;
    lockWaits: number;
  };
}

const monitorSystemPerformance = () => {
  setInterval(async () => {
    const metrics = await collectPerformanceMetrics();
    
    // Verificar thresholds críticos
    if (metrics.cpu.usage > 90) {
      await sendAlert("CPU usage crítico: " + metrics.cpu.usage + "%");
    }
    
    if (metrics.memory.usage > 90) {
      await sendAlert("Memória crítica: " + metrics.memory.usage + "%");
    }
    
    if (metrics.disk.usage > 85) {
      await sendAlert("Disco quase cheio: " + metrics.disk.usage + "%");
    }

    // Salvar métricas para relatórios
    await saveMetrics(metrics);
  }, 60000); // A cada minuto
};
```

---

## 🚨 Solução de Problemas

### 🔍 Diagnóstico Comum

```typescript
interface DiagnosticCheck {
  name: string;
  description: string;
  check: () => Promise<boolean>;
  solution: string;
}

const diagnosticChecks: DiagnosticCheck[] = [
  {
    name: "Database Connectivity",
    description: "Verificar conexão com banco de dados",
    check: async () => {
      try {
        await testDatabaseConnection();
        return true;
      } catch {
        return false;
      }
    },
    solution: "Verificar string de conexão e status do servidor"
  },
  {
    name: "Email Service",
    description: "Verificar serviço de email",
    check: async () => {
      try {
        await testEmailService();
        return true;
      } catch {
        return false;
      }
    },
    solution: "Verificar configurações SMTP"
  },
  {
    name: "File Storage",
    description: "Verificar acesso ao armazenamento",
    check: async () => {
      try {
        await testFileStorage();
        return true;
      } catch {
        return false;
      }
    },
    solution: "Verificar permissões de pasta e espaço em disco"
  }
];

const runSystemDiagnostic = async () => {
  const results = [];
  
  for (const check of diagnosticChecks) {
    try {
      const passed = await check.check();
      results.push({
        name: check.name,
        status: passed ? "PASS" : "FAIL",
        solution: passed ? null : check.solution
      });
    } catch (error) {
      results.push({
        name: check.name,
        status: "ERROR",
        error: error.message,
        solution: check.solution
      });
    }
  }
  
  return results;
};
```

### 🔧 Problemas Frequentes

#### 1. **Sistema Lento**

```bash
# Verificar performance do servidor
top -p $(pgrep -f "CaseZero")

# Verificar conexões do banco
SELECT 
  COUNT(*) as total_connections,
  state,
  wait_event_type
FROM pg_stat_activity 
WHERE datname = 'casezero'
GROUP BY state, wait_event_type;

# Verificar uso de disco
df -h
du -sh /var/logs/casezero/*
```

**Soluções:**
- Limpar logs antigos
- Otimizar queries do banco
- Reiniciar serviços se necessário

#### 2. **Falhas de Login**

```sql
-- Verificar tentativas de login falhadas
SELECT 
  email,
  COUNT(*) as failed_attempts,
  MAX(attempted_at) as last_attempt
FROM login_attempts 
WHERE success = false 
  AND attempted_at > NOW() - INTERVAL '1 hour'
GROUP BY email
HAVING COUNT(*) > 5;
```

**Soluções:**
- Resetar contador de tentativas
- Verificar se conta está bloqueada
- Validar configurações de autenticação

#### 3. **Problemas de Upload**

```typescript
const diagnoseUploadIssues = async (userId: string, caseId: string) => {
  // Verificar permissões do usuário
  const userPermissions = await getUserPermissions(userId);
  if (!userPermissions.includes("UPLOAD_EVIDENCE")) {
    return "Usuário sem permissão para upload";
  }

  // Verificar espaço em disco
  const diskSpace = await getDiskSpace();
  if (diskSpace.usage > 95) {
    return "Espaço em disco insuficiente";
  }

  // Verificar limites do caso
  const caseFiles = await getCaseFileCount(caseId);
  if (caseFiles > MAX_FILES_PER_CASE) {
    return "Limite de arquivos por caso excedido";
  }

  return "Sistema funcionando normalmente";
};
```

### 📞 Suporte e Escalação

```typescript
interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  reportedBy: string;
  assignedTo?: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: Date;
  resolvedAt?: Date;
}

const escalationMatrix = {
  "CRITICAL": {
    initialResponse: 15, // minutos
    resolution: 4, // horas
    notifications: ["admin@police.gov", "it-manager@police.gov"]
  },
  "HIGH": {
    initialResponse: 60, // minutos
    resolution: 24, // horas
    notifications: ["admin@police.gov"]
  },
  "MEDIUM": {
    initialResponse: 240, // minutos
    resolution: 72, // horas
    notifications: []
  },
  "LOW": {
    initialResponse: 1440, // minutos (24h)
    resolution: 168, // horas (7 dias)
    notifications: []
  }
};
```

---

## 📝 Logs e Auditoria

### 📊 Tipos de Logs

```typescript
enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO", 
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL"
}

enum LogCategory {
  AUTHENTICATION = "AUTH",
  CASE_MANAGEMENT = "CASES",
  USER_MANAGEMENT = "USERS",
  SYSTEM = "SYSTEM",
  SECURITY = "SECURITY"
}

interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  category: LogCategory;
  message: string;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}
```

### 🔍 Consulta de Logs

```sql
-- Logs de segurança da última hora
SELECT 
  timestamp,
  level,
  message,
  user_id,
  ip_address
FROM system_logs 
WHERE category = 'SECURITY'
  AND timestamp > NOW() - INTERVAL '1 hour'
ORDER BY timestamp DESC;

-- Ações administrativas do dia
SELECT 
  l.timestamp,
  l.message,
  u.email as admin_user,
  l.metadata
FROM system_logs l
JOIN users u ON l.user_id = u.id
WHERE l.category = 'USERS'
  AND l.level = 'INFO'
  AND l.timestamp::date = CURRENT_DATE
ORDER BY l.timestamp DESC;
```

---

## 🎯 Boas Práticas

### ✅ Do's (Faça)

- **Monitore regularmente** métricas de sistema e usuários
- **Faça backups** antes de mudanças importantes
- **Documente** todas as configurações e mudanças
- **Teste** novos recursos em ambiente de desenvolvimento
- **Mantenha** senhas e tokens seguros
- **Revise** permissões de usuário periodicamente
- **Implemente** rotação de senhas
- **Configure** alertas para problemas críticos

### ❌ Don'ts (Não faça)

- **Não compartilhe** credenciais administrativas
- **Não faça** mudanças em produção sem backup
- **Não ignore** alertas de segurança
- **Não permita** senhas fracas
- **Não acumule** dados desnecessários sem limpeza
- **Não desative** logs de auditoria
- **Não adie** atualizações de segurança
- **Não execute** comandos SQL diretamente em produção

---

## 📞 Contatos de Emergência

```typescript
const emergencyContacts = {
  systemAdmin: {
    name: "Administrador do Sistema",
    email: "admin@police.gov",
    phone: "+55 11 9999-0001",
    availability: "24/7"
  },
  itManager: {
    name: "Gerente de TI",
    email: "it-manager@police.gov", 
    phone: "+55 11 9999-0002",
    availability: "Business hours"
  },
  securityTeam: {
    name: "Equipe de Segurança",
    email: "security@police.gov",
    phone: "+55 11 9999-0003",
    availability: "24/7"
  }
};
```

---

**Última atualização:** Agosto 2025  
**Versão:** 1.0  
**Próxima revisão:** Setembro 2025

[**Retornar ao índice**](./README.md)
