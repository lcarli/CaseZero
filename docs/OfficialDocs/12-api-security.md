# 🔒 Segurança da API - CaseZero

O sistema de Segurança da API do CaseZero implementa múltiplas camadas de proteção para garantir a integridade, confidencialidade e disponibilidade dos dados.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura de Segurança](#arquitetura-de-segurança)
- [Autenticação de API](#autenticação-de-api)
- [Autorização e Controle de Acesso](#autorização-e-controle-de-acesso)
- [Proteção de Endpoints](#proteção-de-endpoints)
- [Rate Limiting](#rate-limiting)
- [Validação e Sanitização](#validação-e-sanitização)
- [Criptografia e SSL/TLS](#criptografia-e-ssltls)
- [Monitoramento e Auditoria](#monitoramento-e-auditoria)
- [Proteção contra Ataques](#proteção-contra-ataques)

## 🎯 Visão Geral

A API do CaseZero implementa segurança em profundidade (defense in depth) com múltiplas camadas de proteção, seguindo as melhores práticas de segurança para APIs RESTful.

### Princípios de Segurança

- **Autenticação Forte**: JWT com rotação automática
- **Autorização Granular**: Controle baseado em funções e recursos
- **Criptografia End-to-End**: Proteção de dados em trânsito e repouso
- **Validação Rigorosa**: Sanitização de todas as entradas
- **Monitoramento Contínuo**: Detecção de anomalias em tempo real
- **Zero Trust**: Verificação contínua de confiança

## 🏗️ Arquitetura de Segurança

### Camadas de Proteção

```text
┌─────────────────────────────────────────────────────────┐
│ 🛡️ ARQUITETURA DE SEGURANÇA EM CAMADAS                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🌐 CAMADA DE REDE                                      │
│ ├── 🔥 Firewall de Aplicação (WAF)                     │
│ ├── 🚫 DDoS Protection                                  │
│ ├── 🔍 IDS/IPS (Intrusion Detection/Prevention)        │
│ └── 📍 Geo-blocking de países suspeitos                │
│                                                         │
│ 🔐 CAMADA DE AUTENTICAÇÃO                              │
│ ├── 🎫 JWT Token Validation                            │
│ ├── 🔄 Token Refresh & Rotation                        │
│ ├── 👤 Multi-Factor Authentication                     │
│ └── 🕐 Session Management                              │
│                                                         │
│ 🎯 CAMADA DE AUTORIZAÇÃO                               │
│ ├── 🏷️ Role-Based Access Control (RBAC)               │
│ ├── 📋 Permission-Based Authorization                  │
│ ├── 🏢 Department-Level Isolation                      │
│ └── 📂 Resource-Level Permissions                      │
│                                                         │
│ 🔍 CAMADA DE VALIDAÇÃO                                 │
│ ├── 📝 Input Validation & Sanitization                │
│ ├── 🚫 SQL Injection Prevention                        │
│ ├── 🔒 XSS Protection                                  │
│ └── 📏 Schema Validation                               │
│                                                         │
│ 📊 CAMADA DE MONITORAMENTO                             │
│ ├── 📈 Rate Limiting                                   │
│ ├── 🚨 Anomaly Detection                               │
│ ├── 📋 Audit Logging                                   │
│ └── 🔍 Security Analytics                              │
│                                                         │
│ 🔒 CAMADA DE CRIPTOGRAFIA                              │
│ ├── 🌐 HTTPS/TLS 1.3                                  │
│ ├── 🔐 Data Encryption at Rest                        │
│ ├── 🔑 Key Management (HSM)                           │
│ └── 📧 Encrypted Communication                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Fluxo de Segurança

```text
┌─────────────────────────────────────────────────────────┐
│ 🔄 FLUXO DE SEGURANÇA DA API                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📱 Cliente                    🛡️ Gateway                │
│                                                         │
│ 1. HTTPS Request ──────────────→ WAF Filter             │
│    (TLS 1.3 encrypted)          (Block malicious)      │
│                                                         │
│ 2. Rate Check ←───────────────── Rate Limiter           │
│    (Check limits)                (Per user/IP)          │
│                                                         │
│ 3. Token Validation ────────────→ Auth Service          │
│    (Bearer JWT)                  (Verify signature)     │
│                                                         │
│ 4. Permission Check ─────────────→ Authorization        │
│    (Resource access)             (RBAC validation)      │
│                                                         │
│ 5. Input Validation ─────────────→ API Controller       │
│    (Sanitize data)               (Schema check)         │
│                                                         │
│ 6. Business Logic ──────────────→ Service Layer         │
│    (Process request)             (Apply rules)          │
│                                                         │
│ 7. Data Access ─────────────────→ Database              │
│    (Encrypted queries)           (Encrypted storage)    │
│                                                         │
│ 8. Audit Log ←──────────────────── Security Logger     │
│    (Record activity)             (Real-time analysis)   │
│                                                         │
│ 9. Response ←───────────────────── Encrypted Response   │
│    (HTTPS encrypted)             (Sanitized output)     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🔑 Autenticação de API

### Configuração de JWT

```text
┌─────────────────────────────────────────────────────────┐
│ 🎫 CONFIGURAÇÃO JWT AVANÇADA                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔐 ALGORITMOS SUPORTADOS                               │
│ Primary: HMAC-SHA256 (HS256)                           │
│ Backup: RSA-SHA256 (RS256)                             │
│ Future: ECDSA-SHA256 (ES256)                           │
│                                                         │
│ ⏰ CONFIGURAÇÕES DE TEMPO                               │
│ Access Token TTL: 15 minutos                           │
│ Refresh Token TTL: 7 dias                              │
│ Remember Me TTL: 30 dias                               │
│ Max Session TTL: 12 horas                              │
│                                                         │
│ 🔄 ROTAÇÃO DE CHAVES                                   │
│ Frequência: A cada 24 horas                            │
│ Sobreposição: 2 horas (grace period)                   │
│ Backup Keys: 3 gerações anteriores                     │
│ Emergency Rotation: Manual (< 5 minutos)               │
│                                                         │
│ 🎯 CLAIMS OBRIGATÓRIOS                                 │
│ {                                                       │
│   "iss": "casezero-api",          // Issuer            │
│   "aud": "casezero-client",       // Audience          │
│   "sub": "user-id",               // Subject           │
│   "iat": 1699123456,              // Issued At         │
│   "exp": 1699124356,              // Expires At        │
│   "nbf": 1699123456,              // Not Before        │
│   "jti": "unique-token-id",       // JWT ID            │
│   "role": "investigator",         // User Role         │
│   "dept": "dhpp",                 // Department        │
│   "permissions": [...],           // Granted Perms     │
│   "session_id": "sess-123",       // Session ID        │
│   "device_id": "dev-456",         // Device ID         │
│   "ip_addr": "192.168.1.100"      // Source IP         │
│ }                                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Headers de Segurança

```text
┌─────────────────────────────────────────────────────────┐
│ 📋 HEADERS DE SEGURANÇA OBRIGATÓRIOS                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔐 AUTENTICAÇÃO                                        │
│ Authorization: Bearer <jwt-token>                       │
│ X-API-Key: <api-key> (para integrações)               │
│ X-Client-Version: v2.1.0                              │
│ X-Device-ID: <unique-device-id>                        │
│                                                         │
│ 🛡️ PROTEÇÃO                                            │
│ X-Forwarded-For: <real-client-ip>                     │
│ X-Request-ID: <unique-request-id>                      │
│ X-Timestamp: <iso-8601-timestamp>                      │
│ X-Signature: <hmac-request-signature>                  │
│                                                         │
│ 🔍 RASTREAMENTO                                        │
│ User-Agent: CaseZero-App/2.1.0                        │
│ X-Session-ID: <session-identifier>                     │
│ X-Correlation-ID: <request-correlation>                │
│                                                         │
│ 📱 CONTEXTO                                            │
│ X-Platform: mobile|web|desktop                         │
│ X-App-Version: 2.1.0                                  │
│ X-OS-Version: iOS-16.0|Android-13|Windows-11          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Validação de Token

```typescript
@Injectable()
export class JwtSecurityService {
  async validateToken(token: string, request: Request): Promise<JwtPayload> {
    try {
      // 1. Verificar formato básico
      if (!token || !token.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid token format');
      }

      const jwt = token.substring(7);
      
      // 2. Decodificar header para verificar algoritmo
      const header = jwt.split('.')[0];
      const decodedHeader = JSON.parse(atob(header));
      
      if (!this.isSupportedAlgorithm(decodedHeader.alg)) {
        throw new UnauthorizedException('Unsupported algorithm');
      }

      // 3. Validar assinatura e claims
      const payload = verify(jwt, this.getSigningKey(decodedHeader.kid)) as JwtPayload;

      // 4. Verificações de segurança adicionais
      await this.performSecurityChecks(payload, request);

      // 5. Verificar se o token não foi revogado
      await this.checkTokenRevocation(payload.jti);

      // 6. Atualizar última atividade
      await this.updateLastActivity(payload.session_id);

      return payload;
    } catch (error) {
      await this.logSecurityEvent('TOKEN_VALIDATION_FAILED', {
        error: error.message,
        ip: request.ip,
        userAgent: request.get('User-Agent')
      });
      throw new UnauthorizedException('Token validation failed');
    }
  }

  private async performSecurityChecks(payload: JwtPayload, request: Request) {
    // Verificar IP binding (se habilitado)
    if (this.config.bindToIp && payload.ip_addr !== request.ip) {
      throw new UnauthorizedException('IP address mismatch');
    }

    // Verificar Device ID
    const deviceId = request.get('X-Device-ID');
    if (payload.device_id && payload.device_id !== deviceId) {
      throw new UnauthorizedException('Device ID mismatch');
    }

    // Verificar se a sessão ainda está ativa
    const session = await this.sessionService.findById(payload.session_id);
    if (!session || !session.isActive) {
      throw new UnauthorizedException('Session not active');
    }

    // Verificar horários permitidos
    if (!this.isAccessTimeAllowed(payload.role)) {
      throw new UnauthorizedException('Access outside allowed hours');
    }

    // Detecção de anomalias
    await this.anomalyDetector.checkRequest(payload, request);
  }
}
```

## 🎯 Autorização e Controle de Acesso

### Sistema RBAC (Role-Based Access Control)

```text
┌─────────────────────────────────────────────────────────┐
│ 🏷️ SISTEMA RBAC HIERÁRQUICO                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 👑 SUPER ADMIN                                         │
│ ├── 🔧 system:*                                        │
│ ├── 👥 users:*                                         │
│ ├── 🏢 departments:*                                   │
│ ├── 📊 analytics:*                                     │
│ └── 🔑 keys:*                                          │
│                                                         │
│ 👮‍♂️ DEPARTMENT HEAD                                     │
│ ├── 📂 cases:read,write (department)                   │
│ ├── 👥 users:read,manage (department)                  │
│ ├── 📊 reports:generate (department)                   │
│ ├── 💰 budget:approve                                  │
│ └── 🎯 assignments:manage                              │
│                                                         │
│ 🕵️ SENIOR INVESTIGATOR                                 │
│ ├── 📂 cases:read,write,create                         │
│ ├── 🧩 evidence:upload,analyze                         │
│ ├── 🔬 lab:request,priority                            │
│ ├── 📊 reports:generate                                │
│ └── 👨‍🏫 mentor:junior                                   │
│                                                         │
│ 🔍 INVESTIGATOR                                        │
│ ├── 📂 cases:read,write (assigned)                     │
│ ├── 🧩 evidence:upload,view                            │
│ ├── 🔬 lab:request                                     │
│ ├── 📊 reports:generate (own)                          │
│ └── 🎓 training:access                                 │
│                                                         │
│ 🧪 LAB TECHNICIAN                                      │
│ ├── 🔬 lab:execute,results                             │
│ ├── 📊 reports:technical                               │
│ ├── ⚗️ equipment:manage                                │
│ └── 📋 queue:manage                                    │
│                                                         │
│ 📚 TRAINEE                                             │
│ ├── 📂 cases:read (supervised)                         │
│ ├── 🎓 training:access                                 │
│ ├── 📝 notes:personal                                  │
│ └── 👁️ observe:limited                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Middleware de Autorização

```typescript
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
    private auditService: AuditService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resource = this.extractResource(context);
    const action = this.extractAction(context);

    // Verificar permissão básica
    const hasPermission = await this.checkBasicPermission(user, resource, action);
    if (!hasPermission) {
      await this.auditService.logEvent('ACCESS_DENIED', {
        userId: user.id,
        resource,
        action,
        reason: 'insufficient_permissions'
      });
      throw new ForbiddenException('Insufficient permissions');
    }

    // Verificar contexto departamental
    if (resource.includes('cases') || resource.includes('evidence')) {
      const hasContextualAccess = await this.checkContextualAccess(user, request);
      if (!hasContextualAccess) {
        await this.auditService.logEvent('ACCESS_DENIED', {
          userId: user.id,
          resource,
          action,
          reason: 'department_isolation'
        });
        throw new ForbiddenException('Department access restriction');
      }
    }

    // Verificar restrições temporais
    if (!this.checkTimeRestrictions(user)) {
      throw new ForbiddenException('Access outside allowed hours');
    }

    // Log de acesso autorizado
    await this.auditService.logEvent('ACCESS_GRANTED', {
      userId: user.id,
      resource,
      action,
      timestamp: new Date(),
      ip: request.ip
    });

    return true;
  }

  private async checkContextualAccess(user: User, request: Request): Promise<boolean> {
    // Para casos: verificar se o usuário tem acesso ao caso específico
    const caseId = request.params.caseId || request.body.caseId;
    if (caseId) {
      const caseAccess = await this.permissionService.hasCaseAccess(user, caseId);
      return caseAccess;
    }

    // Para evidências: verificar se a evidência pertence a um caso acessível
    const evidenceId = request.params.evidenceId || request.body.evidenceId;
    if (evidenceId) {
      const evidenceAccess = await this.permissionService.hasEvidenceAccess(user, evidenceId);
      return evidenceAccess;
    }

    return true;
  }
}
```

## 🛡️ Proteção de Endpoints

### Classificação de Segurança

```text
┌─────────────────────────────────────────────────────────┐
│ 🔒 CLASSIFICAÇÃO DE ENDPOINTS POR SENSIBILIDADE        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔴 CRÍTICO (Level 4)                                   │
│ ├── POST /auth/login                                    │
│ ├── POST /users                                         │
│ ├── DELETE /cases/{id}                                  │
│ ├── PUT /users/{id}/permissions                         │
│ ├── GET /audit/logs                                     │
│ └── POST /system/backup                                 │
│                                                         │
│ 🟠 ALTO (Level 3)                                      │
│ ├── POST /cases                                         │
│ ├── PUT /cases/{id}                                     │
│ ├── POST /evidence/{id}/analysis                        │
│ ├── GET /reports/department                             │
│ └── PUT /users/{id}                                     │
│                                                         │
│ 🟡 MÉDIO (Level 2)                                     │
│ ├── GET /cases/{id}                                     │
│ ├── POST /evidence                                      │
│ ├── GET /evidence/{id}                                  │
│ ├── POST /reports                                       │
│ └── GET /users/profile                                  │
│                                                         │
│ 🟢 BAIXO (Level 1)                                     │
│ ├── GET /health                                         │
│ ├── GET /version                                        │
│ ├── GET /training/materials                             │
│ ├── GET /departments                                    │
│ └── POST /feedback                                      │
│                                                         │
│ ⚪ PÚBLICO (Level 0)                                    │
│ ├── GET /api/docs                                       │
│ ├── GET /status                                         │
│ └── OPTIONS /*                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Proteções por Nível

```typescript
// Configuração de segurança por endpoint
const securityConfig = {
  level4: {
    authentication: 'required',
    authorization: 'strict',
    rateLimit: { requests: 5, window: '1m' },
    logging: 'detailed',
    encryption: 'required',
    mfa: 'required',
    ipRestriction: 'enforced',
    timeRestriction: 'enforced'
  },
  level3: {
    authentication: 'required',
    authorization: 'standard',
    rateLimit: { requests: 20, window: '1m' },
    logging: 'standard',
    encryption: 'required',
    mfa: 'conditional',
    ipRestriction: 'optional',
    timeRestriction: 'optional'
  },
  level2: {
    authentication: 'required',
    authorization: 'basic',
    rateLimit: { requests: 60, window: '1m' },
    logging: 'basic',
    encryption: 'required',
    mfa: 'none',
    ipRestriction: 'none',
    timeRestriction: 'none'
  },
  level1: {
    authentication: 'optional',
    authorization: 'none',
    rateLimit: { requests: 100, window: '1m' },
    logging: 'minimal',
    encryption: 'optional',
    mfa: 'none',
    ipRestriction: 'none',
    timeRestriction: 'none'
  },
  level0: {
    authentication: 'none',
    authorization: 'none',
    rateLimit: { requests: 1000, window: '1m' },
    logging: 'none',
    encryption: 'optional',
    mfa: 'none',
    ipRestriction: 'none',
    timeRestriction: 'none'
  }
};
```

## ⚡ Rate Limiting

### Configuração de Limites

```text
┌─────────────────────────────────────────────────────────┐
│ 📈 CONFIGURAÇÃO DE RATE LIMITING                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 👤 POR USUÁRIO                                         │
│ ├── Login: 5 tentativas/5min                           │
│ ├── API Geral: 1000 req/hora                           │
│ ├── Upload: 10 arquivos/min                            │
│ ├── Relatórios: 5 geração/hora                         │
│ └── Busca: 100 consultas/min                           │
│                                                         │
│ 🌐 POR IP                                              │
│ ├── Total: 5000 req/hora                               │
│ ├── Login: 20 tentativas/hora                          │
│ ├── Registro: 3 tentativas/dia                         │
│ └── Reset Senha: 5 tentativas/dia                      │
│                                                         │
│ 🔑 POR API KEY                                         │
│ ├── Standard: 10000 req/dia                            │
│ ├── Premium: 100000 req/dia                            │
│ ├── Enterprise: Ilimitado                              │
│ └── Burst: 2x limite por 1min                          │
│                                                         │
│ 📱 POR ENDPOINT                                        │
│ ├── /auth/login: 5/min                                 │
│ ├── /cases: 100/min                                    │
│ ├── /evidence/upload: 10/min                           │
│ ├── /reports/generate: 5/hora                          │
│ └── /search: 60/min                                    │
│                                                         │
│ 🚨 AÇÕES DE BLOQUEIO                                   │
│ ├── Soft Limit: HTTP 429 + retry-after                │
│ ├── Hard Limit: Bloqueio temporário                    │
│ ├── Abuse: Bloqueio por 24h                            │
│ └── Severe: Bloqueio permanente                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Implementação de Rate Limiting

```typescript
@Injectable()
export class RateLimitService {
  constructor(
    private redis: RedisService,
    private config: ConfigService
  ) {}

  async checkRateLimit(
    key: string, 
    limit: number, 
    window: number,
    context: RateLimitContext
  ): Promise<RateLimitResult> {
    const redisKey = `rate_limit:${key}:${window}`;
    const now = Date.now();
    const windowStart = now - (window * 1000);

    // Usar sliding window com Redis
    const pipeline = this.redis.pipeline();
    
    // Remover entradas antigas
    pipeline.zremrangebyscore(redisKey, 0, windowStart);
    
    // Adicionar request atual
    pipeline.zadd(redisKey, now, `${now}-${Math.random()}`);
    
    // Contar requests na janela
    pipeline.zcard(redisKey);
    
    // Definir expiração
    pipeline.expire(redisKey, window + 1);
    
    const results = await pipeline.exec();
    const currentCount = results[2][1] as number;

    const result: RateLimitResult = {
      allowed: currentCount <= limit,
      count: currentCount,
      limit: limit,
      remaining: Math.max(0, limit - currentCount),
      resetTime: new Date(now + (window * 1000)),
      retryAfter: currentCount > limit ? this.calculateRetryAfter(context) : null
    };

    // Log de violação de rate limit
    if (!result.allowed) {
      await this.logRateLimitViolation(key, context, result);
    }

    return result;
  }

  private async logRateLimitViolation(
    key: string, 
    context: RateLimitContext, 
    result: RateLimitResult
  ) {
    await this.auditService.logEvent('RATE_LIMIT_EXCEEDED', {
      key,
      userAgent: context.userAgent,
      ip: context.ip,
      userId: context.userId,
      endpoint: context.endpoint,
      limit: result.limit,
      actual: result.count,
      timestamp: new Date()
    });

    // Detectar abuso severo
    if (result.count > result.limit * 3) {
      await this.handleSevereAbuse(key, context);
    }
  }

  private async handleSevereAbuse(key: string, context: RateLimitContext) {
    // Bloqueio automático
    await this.redis.setex(`blocked:${key}`, 86400, 'severe_abuse');
    
    // Notificar administradores
    await this.notificationService.sendSecurityAlert({
      type: 'SEVERE_RATE_LIMIT_ABUSE',
      details: context,
      action: 'auto_blocked_24h'
    });
  }
}
```

## 🛡️ Validação e Sanitização

### Validação de Entrada

```typescript
// DTO com validações rigorosas
export class CreateCaseDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 200)
  @Matches(/^[a-zA-Z0-9\s\-.,!?]+$/, {
    message: 'Title contains invalid characters'
  })
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 5000)
  @Transform(({ value }) => this.sanitizeHtml(value))
  description?: string;

  @IsEnum(CaseType)
  type: CaseType;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Matches(/^[a-zA-Z0-9\-_]+$/, { each: true })
  tags?: string[];

  @IsOptional()
  @IsDateString()
  @IsAfter('2020-01-01')
  @IsBefore(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)) // Max 1 year future
  incidentDate?: string;

  private sanitizeHtml(value: string): string {
    // Remove scripts, iframes, etc.
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');
  }
}

// Pipe de validação global
@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    // Sanitização básica para todos os inputs
    if (typeof value === 'string') {
      value = this.sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      value = this.sanitizeObject(value);
    }

    // Validação padrão
    const result = await super.transform(value, metadata);
    
    // Validações customizadas de segurança
    await this.performSecurityValidation(result, metadata);
    
    return result;
  }

  private sanitizeString(str: string): string {
    return str
      .trim()
      .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
      .replace(/\x00/g, '') // Remove null bytes
      .substring(0, 10000); // Limit length
  }

  private sanitizeObject(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }
    
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      const sanitizedKey = this.sanitizeString(key);
      sanitized[sanitizedKey] = typeof value === 'string' 
        ? this.sanitizeString(value)
        : typeof value === 'object' 
        ? this.sanitizeObject(value)
        : value;
    }
    return sanitized;
  }
}
```

## 🔒 Criptografia e SSL/TLS

### Configuração TLS

```text
┌─────────────────────────────────────────────────────────┐
│ 🔐 CONFIGURAÇÃO SSL/TLS                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📋 VERSÕES SUPORTADAS                                  │
│ ✅ TLS 1.3 (preferred)                                 │
│ ✅ TLS 1.2 (fallback)                                  │
│ ❌ TLS 1.1 (deprecated)                                │
│ ❌ TLS 1.0 (deprecated)                                │
│ ❌ SSL 3.0 (disabled)                                  │
│                                                         │
│ 🔑 CIPHER SUITES (ordenados por preferência)           │
│ 1. TLS_AES_256_GCM_SHA384                              │
│ 2. TLS_CHACHA20_POLY1305_SHA256                        │
│ 3. TLS_AES_128_GCM_SHA256                              │
│ 4. ECDHE-RSA-AES256-GCM-SHA384                         │
│ 5. ECDHE-RSA-AES128-GCM-SHA256                         │
│ 6. DHE-RSA-AES256-GCM-SHA384                           │
│                                                         │
│ 📊 CONFIGURAÇÕES AVANÇADAS                             │
│ HSTS: max-age=31536000; includeSubDomains              │
│ OCSP Stapling: Enabled                                 │
│ Perfect Forward Secrecy: Required                      │
│ Certificate Transparency: Enabled                      │
│ Session Resumption: Enabled (secure)                   │
│                                                         │
│ 🔒 HEADERS DE SEGURANÇA                                │
│ Strict-Transport-Security: max-age=31536000            │
│ X-Content-Type-Options: nosniff                        │
│ X-Frame-Options: DENY                                  │
│ X-XSS-Protection: 1; mode=block                        │
│ Content-Security-Policy: default-src 'self'            │
│ Referrer-Policy: strict-origin-when-cross-origin       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Criptografia de Dados

```typescript
@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  private readonly ivLength = 16;
  private readonly tagLength = 16;

  constructor(
    private configService: ConfigService,
    private keyManagement: KeyManagementService
  ) {}

  async encryptSensitiveData(data: string, context: string): Promise<EncryptedData> {
    try {
      // Obter chave específica para o contexto
      const key = await this.keyManagement.getEncryptionKey(context);
      
      // Gerar IV aleatório
      const iv = crypto.randomBytes(this.ivLength);
      
      // Criar cipher
      const cipher = crypto.createCipher(this.algorithm, key);
      cipher.setAAD(Buffer.from(context)); // Additional Authenticated Data
      
      // Criptografar
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Obter tag de autenticação
      const tag = cipher.getAuthTag();
      
      return {
        data: encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex'),
        algorithm: this.algorithm,
        keyVersion: await this.keyManagement.getCurrentKeyVersion(context)
      };
    } catch (error) {
      throw new Error('Encryption failed');
    }
  }

  async decryptSensitiveData(
    encryptedData: EncryptedData, 
    context: string
  ): Promise<string> {
    try {
      // Obter chave pela versão
      const key = await this.keyManagement.getEncryptionKey(
        context, 
        encryptedData.keyVersion
      );
      
      // Preparar decipher
      const decipher = crypto.createDecipher(encryptedData.algorithm, key);
      decipher.setAAD(Buffer.from(context));
      decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
      
      // Descriptografar
      let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error('Decryption failed');
    }
  }

  // Criptografia para evidências
  async encryptEvidence(file: Buffer, metadata: EvidenceMetadata): Promise<EncryptedEvidence> {
    const key = await this.keyManagement.getEvidenceKey(metadata.caseId);
    const iv = crypto.randomBytes(this.ivLength);
    
    const cipher = crypto.createCipher(this.algorithm, key);
    const encrypted = Buffer.concat([
      cipher.update(file),
      cipher.final()
    ]);
    
    const tag = cipher.getAuthTag();
    
    return {
      encryptedData: encrypted,
      iv,
      tag,
      metadata: {
        ...metadata,
        encryptionVersion: await this.keyManagement.getCurrentKeyVersion('evidence'),
        checksum: crypto.createHash('sha256').update(file).digest('hex')
      }
    };
  }
}
```

## 📊 Monitoramento e Auditoria

### Sistema de Logs de Segurança

```text
┌─────────────────────────────────────────────────────────┐
│ 📋 MONITORAMENTO DE SEGURANÇA EM TEMPO REAL            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🚨 ALERTAS CRÍTICOS (Resposta Imediata)               │
│ ├── Multiple failed login attempts                     │
│ ├── Privilege escalation attempts                      │
│ ├── Unusual data access patterns                       │
│ ├── Suspicious file downloads                          │
│ ├── API abuse detected                                 │
│ └── Security token anomalies                           │
│                                                         │
│ ⚠️ ALERTAS DE ATENÇÃO (Análise em 1h)                 │
│ ├── Off-hours access                                   │
│ ├── New device/location login                          │
│ ├── Bulk evidence downloads                            │
│ ├── Repeated search patterns                           │
│ └── Configuration changes                              │
│                                                         │
│ 📊 MÉTRICAS MONITORADAS                               │
│ ├── Request rate per user/endpoint                     │
│ ├── Failed authentication attempts                     │
│ ├── Permission denied events                           │
│ ├── Data access patterns                               │
│ ├── Session duration anomalies                         │
│ └── API response time spikes                           │
│                                                         │
│ 🔍 ANÁLISE COMPORTAMENTAL                              │
│ ├── User activity profiling                            │
│ ├── Geolocation anomalies                             │
│ ├── Device fingerprint changes                         │
│ ├── Access time pattern changes                        │
│ └── Data access pattern analysis                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Dashboard de Segurança

```text
┌─────────────────────────────────────────────────────────┐
│ 🛡️ DASHBOARD DE SEGURANÇA - TEMPO REAL                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ⏰ Última atualização: 14:32:15                        │
│                                                         │
│ 🚨 ALERTAS ATIVOS (3)                                  │
│ ├── 🔴 Tentativas de login suspeitas (IP: 203.45.67.89) │
│ ├── 🟡 Download em massa de evidências (User: silva123) │
│ └── 🟡 Acesso fora do horário (User: investigator_042)  │
│                                                         │
│ 📊 ESTATÍSTICAS HOJE                                   │
│ ├── Total de requests: 47,892                          │
│ ├── Autenticações: 1,247 (98.2% sucesso)              │
│ ├── Rate limits acionados: 23                          │
│ ├── IPs bloqueados: 5                                  │
│ └── Tokens revogados: 2                                │
│                                                         │
│ 🎯 TOP ENDPOINTS ACESSADOS                             │
│ ├── /api/cases (32%)                                   │
│ ├── /api/evidence (28%)                                │
│ ├── /api/auth/refresh (18%)                            │
│ ├── /api/reports (12%)                                 │
│ └── /api/users (10%)                                   │
│                                                         │
│ 🌍 DISTRIBUIÇÃO GEOGRÁFICA                            │
│ ├── São Paulo, SP: 67%                                 │
│ ├── Rio de Janeiro, RJ: 18%                            │
│ ├── Brasília, DF: 12%                                  │
│ ├── Outros Estados: 2%                                 │
│ └── 🚨 IPs Externos: 1% (investigar)                   │
│                                                         │
│ 🔒 STATUS DOS SERVIÇOS                                 │
│ ├── API Gateway: 🟢 Online (99.9% uptime)             │
│ ├── Auth Service: 🟢 Online                            │
│ ├── Rate Limiter: 🟢 Online                            │
│ ├── Audit Logger: 🟢 Online                            │
│ └── Encryption: 🟢 Online                              │
│                                                         │
│ [ 🔍 Ver Logs ] [ ⚙️ Configurar ] [ 📊 Relatórios ]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

**Próximo**: [13-api-documentation.md](13-api-documentation.md) - Documentação da API

---


[**Retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
