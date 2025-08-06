# 📚 Documentação da API - CaseZero

Esta documentação abrangente da API REST do CaseZero fornece todas as informações necessárias para integração e desenvolvimento com a plataforma.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Endpoints de Autenticação](#endpoints-de-autenticação)
- [Endpoints de Casos](#endpoints-de-casos)
- [Endpoints de Evidências](#endpoints-de-evidências)
- [Endpoints de Usuários](#endpoints-de-usuários)
- [Endpoints de Relatórios](#endpoints-de-relatórios)
- [Endpoints de Sistema](#endpoints-de-sistema)
- [Códigos de Status](#códigos-de-status)
- [Exemplos de Uso](#exemplos-de-uso)

## 🎯 Visão Geral

A API REST do CaseZero segue os padrões RESTful e utiliza JSON para comunicação. Todas as requisições são autenticadas via JWT tokens.

### Informações Base

```text
┌─────────────────────────────────────────────────────────┐
│ 🌐 INFORMAÇÕES DA API                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔗 Base URL: https://api.casezero.gov.br/v1            │
│ 📄 Formato: JSON                                       │
│ 🔐 Autenticação: Bearer JWT                            │
│ 📝 Charset: UTF-8                                      │
│ 🕐 Timezone: UTC                                       │
│ 📊 Rate Limit: 1000 req/hora (padrão)                 │
│                                                         │
│ 🏷️ VERSIONING                                          │
│ Atual: v1                                              │
│ Suporte: v1 (estável)                                  │
│ Deprecação: Aviso de 6 meses                           │
│                                                         │
│ 📋 CONTENT TYPES SUPORTADOS                            │
│ Request: application/json                               │
│ Response: application/json                              │
│ Upload: multipart/form-data                             │
│ Download: application/octet-stream                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Headers Padrão

```http
# Headers obrigatórios
Authorization: Bearer <jwt-token>
Content-Type: application/json
Accept: application/json
User-Agent: CaseZero-Client/1.0

# Headers recomendados
X-Request-ID: <uuid>
X-Client-Version: 1.2.0
X-Platform: web|mobile|desktop
```

## 🔐 Autenticação

### Processo de Autenticação

```text
┌─────────────────────────────────────────────────────────┐
│ 🔑 FLUXO DE AUTENTICAÇÃO                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 1. 📧 POST /auth/login                                  │
│    ├── Input: { email, password }                      │
│    └── Output: { accessToken, refreshToken, user }     │
│                                                         │
│ 2. 🎫 Usar accessToken nas requisições                 │
│    ├── Header: Authorization: Bearer <token>           │
│    └── Válido por: 15 minutos                          │
│                                                         │
│ 3. 🔄 POST /auth/refresh (quando necessário)           │
│    ├── Input: { refreshToken }                         │
│    └── Output: { accessToken, refreshToken }           │
│                                                         │
│ 4. 🚪 POST /auth/logout                                │
│    ├── Input: JWT no header                            │
│    └── Output: { message: "Logged out" }               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🔑 Endpoints de Autenticação

### POST /auth/login
Autentica um usuário e retorna tokens de acesso.

```http
POST /auth/login
Content-Type: application/json

{
  "email": "detective.silva@policia.gov.br",
  "password": "senhaSegura123!",
  "rememberMe": false
}
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "usr_001",
    "name": "Detective Silva",
    "email": "detective.silva@policia.gov.br",
    "role": "investigator",
    "department": "DHPP",
    "permissions": [
      "cases:read",
      "cases:write",
      "evidence:upload",
      "evidence:analyze"
    ]
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "rt_abc123def456...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  },
  "session": {
    "id": "sess_xyz789",
    "expiresAt": "2024-08-05T15:30:00Z",
    "deviceInfo": {
      "type": "desktop",
      "browser": "Chrome",
      "os": "Windows 11"
    }
  }
}
```

### POST /auth/refresh
Renova o token de acesso usando o refresh token.

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "rt_abc123def456..."
}
```

### POST /auth/logout
Encerra a sessão atual e invalida os tokens.

```http
POST /auth/logout
Authorization: Bearer <access-token>
```

### POST /auth/forgot-password
Inicia o processo de recuperação de senha.

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "detective.silva@policia.gov.br"
}
```

## 📂 Endpoints de Casos

### GET /cases
Lista casos com paginação e filtros.

```http
GET /cases?page=1&limit=20&status=active&department=dhpp&assignedTo=usr_001
Authorization: Bearer <access-token>
```

**Parâmetros de Query:**
- `page` (int): Página (padrão: 1)
- `limit` (int): Itens por página (padrão: 20, máx: 100)
- `status` (string): active|closed|pending
- `department` (string): Filtro por departamento
- `assignedTo` (string): ID do investigador
- `search` (string): Busca em título/descrição
- `dateFrom` (string): Data início (ISO 8601)
- `dateTo` (string): Data fim (ISO 8601)
- `priority` (string): low|medium|high|urgent

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "case_001",
      "number": "CASO-2024-0156",
      "title": "Homicídio na Rua Augusta",
      "description": "Investigação de homicídio ocorrido na madrugada",
      "status": "active",
      "priority": "high",
      "type": "homicide",
      "department": "dhpp",
      "assignedTo": {
        "id": "usr_001",
        "name": "Detective Silva"
      },
      "createdAt": "2024-08-01T10:30:00Z",
      "updatedAt": "2024-08-05T14:20:00Z",
      "incidentDate": "2024-08-01T02:30:00Z",
      "location": {
        "address": "Rua Augusta, 1500",
        "city": "São Paulo",
        "coordinates": {
          "lat": -23.5505,
          "lng": -46.6333
        }
      },
      "evidenceCount": 12,
      "progress": 65
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 147,
    "pages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### GET /cases/{id}
Obtém detalhes completos de um caso específico.

```http
GET /cases/case_001
Authorization: Bearer <access-token>
```

### POST /cases
Cria um novo caso.

```http
POST /cases
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "title": "Roubo em Joalheria - Shopping Center",
  "description": "Investigação de roubo a mão armada em joalheria",
  "type": "robbery",
  "priority": "high",
  "incidentDate": "2024-08-05T14:30:00Z",
  "location": {
    "address": "Shopping Iguatemi, Loja 245",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "04094-050"
  },
  "initialObservations": "Dois suspeitos armados, câmeras de segurança disponíveis"
}
```

### PUT /cases/{id}
Atualiza informações de um caso.

```http
PUT /cases/case_001
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "status": "closed",
  "progress": 100,
  "conclusion": "Caso resolvido com prisão dos suspeitos"
}
```

### DELETE /cases/{id}
Remove um caso (apenas administradores).

```http
DELETE /cases/case_001
Authorization: Bearer <access-token>
```

### POST /cases/{id}/assign
Atribui o caso a um investigador.

```http
POST /cases/case_001/assign
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "investigatorId": "usr_002",
  "notes": "Caso transferido devido à especialização em crimes financeiros"
}
```

## 🧩 Endpoints de Evidências

### GET /cases/{caseId}/evidence
Lista evidências de um caso.

```http
GET /cases/case_001/evidence?type=photo&status=analyzed
Authorization: Bearer <access-token>
```

**Parâmetros de Query:**
- `type` (string): photo|video|audio|document|physical|digital
- `status` (string): pending|analyzing|analyzed|inconclusive
- `page` (int): Página
- `limit` (int): Itens por página

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "evd_001",
      "name": "Foto da cena do crime - Entrada",
      "type": "photo",
      "status": "analyzed",
      "filename": "crime_scene_001.jpg",
      "size": 2457600,
      "mimeType": "image/jpeg",
      "uploadedBy": {
        "id": "usr_001",
        "name": "Detective Silva"
      },
      "uploadedAt": "2024-08-01T11:15:00Z",
      "metadata": {
        "resolution": "1920x1080",
        "camera": "Canon EOS R5",
        "gps": {
          "lat": -23.5505,
          "lng": -46.6333
        }
      },
      "analysis": {
        "status": "completed",
        "results": [
          {
            "type": "fingerprint_detection",
            "confidence": 0.95,
            "details": "3 impressões digitais detectadas"
          }
        ],
        "completedAt": "2024-08-02T09:30:00Z"
      },
      "chainOfCustody": [
        {
          "action": "collected",
          "officer": "Off. Santos",
          "timestamp": "2024-08-01T11:15:00Z",
          "location": "Crime scene"
        },
        {
          "action": "uploaded",
          "officer": "Detective Silva",
          "timestamp": "2024-08-01T11:15:00Z",
          "location": "DHPP Office"
        }
      ]
    }
  ]
}
```

### POST /cases/{caseId}/evidence
Faz upload de nova evidência.

```http
POST /cases/case_001/evidence
Authorization: Bearer <access-token>
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="file"; filename="evidence.jpg"
Content-Type: image/jpeg

[binary data]
--boundary
Content-Disposition: form-data; name="metadata"

{
  "name": "Foto da arma encontrada",
  "type": "photo",
  "description": "Revólver .38 encontrado no local",
  "collectedBy": "Off. Santos",
  "collectedAt": "2024-08-01T11:45:00Z",
  "location": "Cena do crime - Quarto 2"
}
--boundary--
```

### GET /evidence/{id}
Obtém detalhes de uma evidência específica.

```http
GET /evidence/evd_001
Authorization: Bearer <access-token>
```

### GET /evidence/{id}/download
Faz download do arquivo de evidência.

```http
GET /evidence/evd_001/download
Authorization: Bearer <access-token>
```

### POST /evidence/{id}/analyze
Solicita análise laboratorial de evidência.

```http
POST /evidence/evd_001/analyze
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "analysisType": "fingerprint_analysis",
  "priority": "high",
  "notes": "Comparar com banco de dados AFIS",
  "requestedBy": "usr_001"
}
```

### PUT /evidence/{id}/analysis
Atualiza resultados de análise (técnicos de laboratório).

```http
PUT /evidence/evd_001/analysis
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "status": "completed",
  "results": [
    {
      "type": "fingerprint_match",
      "confidence": 0.98,
      "details": "Match encontrado: Suspeito João Silva (ID: 123456)",
      "technician": "Dr. Lab Tech",
      "equipment": "AFIS System v3.2"
    }
  ],
  "conclusion": "Impressão digital positivamente identificada",
  "completedAt": "2024-08-02T15:30:00Z"
}
```

## 👥 Endpoints de Usuários

### GET /users
Lista usuários (administradores e chefes).

```http
GET /users?department=dhpp&role=investigator&status=active
Authorization: Bearer <access-token>
```

### GET /users/{id}
Obtém perfil de usuário específico.

```http
GET /users/usr_001
Authorization: Bearer <access-token>
```

### POST /users
Cria novo usuário (administradores).

```http
POST /users
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "name": "Detective Novo",
  "email": "novo.detective@policia.gov.br",
  "role": "investigator",
  "department": "dhpp",
  "badge": "POL-2024-0299",
  "specializations": ["homicide", "crime_scene"]
}
```

### PUT /users/{id}
Atualiza dados de usuário.

```http
PUT /users/usr_001
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "specializations": ["homicide", "financial_crimes"],
  "status": "active"
}
```

### GET /users/me
Obtém perfil do usuário autenticado.

```http
GET /users/me
Authorization: Bearer <access-token>
```

### PUT /users/me
Atualiza perfil pessoal.

```http
PUT /users/me
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "preferences": {
    "theme": "dark",
    "language": "pt-BR",
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    }
  }
}
```

## 📊 Endpoints de Relatórios

### GET /reports/dashboard
Obtém dados para dashboard.

```http
GET /reports/dashboard?period=30d&department=dhpp
Authorization: Bearer <access-token>
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalCases": 47,
      "activeCases": 23,
      "closedCases": 24,
      "pendingEvidence": 156,
      "completedAnalyses": 89
    },
    "casesByStatus": [
      { "status": "active", "count": 23 },
      { "status": "closed", "count": 24 }
    ],
    "casesByType": [
      { "type": "homicide", "count": 12 },
      { "type": "robbery", "count": 18 },
      { "type": "fraud", "count": 8 },
      { "type": "other", "count": 9 }
    ],
    "evidenceAnalysis": {
      "pending": 67,
      "inProgress": 45,
      "completed": 89,
      "averageTime": "3.5 days"
    },
    "performanceMetrics": {
      "casesSolvedRate": 78.5,
      "averageCaseTime": "45 days",
      "evidenceProcessingTime": "3.2 days"
    }
  }
}
```

### POST /reports/generate
Gera relatório customizado.

```http
POST /reports/generate
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "type": "case_performance",
  "filters": {
    "department": "dhpp",
    "dateRange": {
      "from": "2024-07-01",
      "to": "2024-08-31"
    },
    "includeEvidence": true,
    "includeAnalytics": true
  },
  "format": "pdf",
  "email": true
}
```

### GET /reports/{id}
Obtém relatório gerado.

```http
GET /reports/rpt_001
Authorization: Bearer <access-token>
```

## ⚙️ Endpoints de Sistema

### GET /health
Verifica status da API.

```http
GET /health
```

**Resposta (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2024-08-05T14:30:00Z",
  "version": "1.2.0",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "storage": "healthy",
    "laboratory": "healthy"
  },
  "metrics": {
    "uptime": "99.98%",
    "responseTime": "145ms",
    "activeUsers": 87,
    "requestsPerMinute": 234
  }
}
```

### GET /version
Obtém informações de versão.

```http
GET /version
```

### GET /config/public
Obtém configurações públicas.

```http
GET /config/public
```

## 📊 Códigos de Status

### Códigos de Sucesso

```text
┌─────────────────────────────────────────────────────────┐
│ ✅ CÓDIGOS DE SUCESSO                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 200 OK                                                  │
│ ├── Descrição: Requisição bem-sucedida                 │
│ ├── Uso: GET, PUT com dados                            │
│ └── Exemplo: Listagem de casos, detalhes de usuário    │
│                                                         │
│ 201 Created                                             │
│ ├── Descrição: Recurso criado com sucesso              │
│ ├── Uso: POST para criar novos recursos                │
│ └── Exemplo: Novo caso, nova evidência, novo usuário   │
│                                                         │
│ 202 Accepted                                            │
│ ├── Descrição: Requisição aceita para processamento    │
│ ├── Uso: Operações assíncronas                         │
│ └── Exemplo: Análise de evidência, geração de relatório│
│                                                         │
│ 204 No Content                                          │
│ ├── Descrição: Operação bem-sucedida, sem conteúdo     │
│ ├── Uso: DELETE, PUT sem retorno                       │
│ └── Exemplo: Exclusão de caso, logout                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Códigos de Erro

```text
┌─────────────────────────────────────────────────────────┐
│ ❌ CÓDIGOS DE ERRO                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 400 Bad Request                                         │
│ ├── Descrição: Dados de entrada inválidos              │
│ ├── Causa: Validação falhou, JSON malformado           │
│ └── Ação: Verificar formato e conteúdo da requisição   │
│                                                         │
│ 401 Unauthorized                                        │
│ ├── Descrição: Autenticação necessária ou inválida     │
│ ├── Causa: Token ausente, expirado ou inválido         │
│ └── Ação: Fazer login ou renovar token                 │
│                                                         │
│ 403 Forbidden                                           │
│ ├── Descrição: Permissão insuficiente                  │
│ ├── Causa: Usuário não tem acesso ao recurso           │
│ └── Ação: Verificar permissões ou contactar admin      │
│                                                         │
│ 404 Not Found                                           │
│ ├── Descrição: Recurso não encontrado                  │
│ ├── Causa: ID inválido ou recurso não existe           │
│ └── Ação: Verificar ID ou se recurso foi removido      │
│                                                         │
│ 409 Conflict                                            │
│ ├── Descrição: Conflito com estado atual               │
│ ├── Causa: Duplicação, dependências                    │
│ └── Ação: Resolver conflito antes de repetir           │
│                                                         │
│ 422 Unprocessable Entity                                │
│ ├── Descrição: Entidade com formato correto mas inválida│
│ ├── Causa: Regras de negócio violadas                  │
│ └── Ação: Corrigir dados conforme regras               │
│                                                         │
│ 429 Too Many Requests                                   │
│ ├── Descrição: Rate limit excedido                     │
│ ├── Causa: Muitas requisições em pouco tempo           │
│ └── Ação: Aguardar tempo especificado em Retry-After   │
│                                                         │
│ 500 Internal Server Error                               │
│ ├── Descrição: Erro interno do servidor                │
│ ├── Causa: Bug, falha de sistema, banco de dados       │
│ └── Ação: Contactar suporte técnico                    │
│                                                         │
│ 503 Service Unavailable                                 │
│ ├── Descrição: Serviço temporariamente indisponível    │
│ ├── Causa: Manutenção, sobrecarga                      │
│ └── Ação: Tentar novamente após tempo especificado     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Formato de Resposta de Erro

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados de entrada inválidos",
    "details": [
      {
        "field": "email",
        "message": "Email deve ter formato válido",
        "value": "email-invalido"
      },
      {
        "field": "password",
        "message": "Senha deve ter pelo menos 8 caracteres",
        "value": null
      }
    ],
    "timestamp": "2024-08-05T14:30:00Z",
    "requestId": "req_12345",
    "documentation": "https://docs.casezero.gov.br/api/errors"
  }
}
```

## 💡 Exemplos de Uso

### Fluxo Completo de Investigação

```javascript
// 1. Autenticação
const loginResponse = await fetch('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'detective.silva@policia.gov.br',
    password: 'senha123'
  })
});

const { tokens, user } = await loginResponse.json();
const authHeaders = {
  'Authorization': `Bearer ${tokens.accessToken}`,
  'Content-Type': 'application/json'
};

// 2. Criar novo caso
const caseResponse = await fetch('/cases', {
  method: 'POST',
  headers: authHeaders,
  body: JSON.stringify({
    title: 'Roubo em Banco - Agência Central',
    description: 'Investigação de assalto a banco com reféns',
    type: 'robbery',
    priority: 'urgent',
    incidentDate: '2024-08-05T09:30:00Z',
    location: {
      address: 'Av. Paulista, 1000',
      city: 'São Paulo'
    }
  })
});

const newCase = await caseResponse.json();
const caseId = newCase.data.id;

// 3. Upload de evidência
const formData = new FormData();
formData.append('file', evidenceFile);
formData.append('metadata', JSON.stringify({
  name: 'Gravação das câmeras de segurança',
  type: 'video',
  description: 'Vídeo mostrando entrada dos suspeitos'
}));

const evidenceResponse = await fetch(`/cases/${caseId}/evidence`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${tokens.accessToken}` },
  body: formData
});

const evidence = await evidenceResponse.json();

// 4. Solicitar análise
const analysisResponse = await fetch(`/evidence/${evidence.data.id}/analyze`, {
  method: 'POST',
  headers: authHeaders,
  body: JSON.stringify({
    analysisType: 'facial_recognition',
    priority: 'high',
    notes: 'Identificar suspeitos nas imagens'
  })
});

// 5. Gerar relatório
const reportResponse = await fetch('/reports/generate', {
  method: 'POST',
  headers: authHeaders,
  body: JSON.stringify({
    type: 'case_progress',
    filters: { caseId: caseId },
    format: 'pdf'
  })
});
```

### Tratamento de Erros

```javascript
async function apiCall(url, options) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      
      switch (response.status) {
        case 401:
          // Token expirado - tentar renovar
          await refreshToken();
          return apiCall(url, options); // Retry
          
        case 403:
          throw new Error('Acesso negado: permissões insuficientes');
          
        case 404:
          throw new Error('Recurso não encontrado');
          
        case 429:
          // Rate limit - aguardar e tentar novamente
          const retryAfter = response.headers.get('Retry-After');
          await delay(parseInt(retryAfter) * 1000);
          return apiCall(url, options); // Retry
          
        case 422:
          throw new ValidationError(errorData.error.details);
          
        default:
          throw new Error(errorData.error.message);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

### Paginação e Filtros

```javascript
// Listar casos com paginação
async function getCases(page = 1, filters = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '20',
    ...filters
  });
  
  const response = await fetch(`/cases?${params}`, {
    headers: authHeaders
  });
  
  const data = await response.json();
  
  return {
    cases: data.data,
    pagination: data.pagination,
    hasMore: data.pagination.hasNext
  };
}

// Usar com filtros
const activeCases = await getCases(1, {
  status: 'active',
  department: 'dhpp',
  priority: 'high'
});
```

### Upload com Progress

```javascript
function uploadEvidence(caseId, file, metadata) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    // Progress tracking
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        console.log(`Upload progress: ${progress.toFixed(2)}%`);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status === 201) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    });
    
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });
    
    xhr.open('POST', `/cases/${caseId}/evidence`);
    xhr.setRequestHeader('Authorization', `Bearer ${tokens.accessToken}`);
    xhr.send(formData);
  });
}
```

### Monitoramento de Análises

```javascript
// Polling para verificar status de análise
async function waitForAnalysis(evidenceId, timeout = 300000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const response = await fetch(`/evidence/${evidenceId}`, {
      headers: authHeaders
    });
    
    const evidence = await response.json();
    const status = evidence.data.analysis.status;
    
    if (status === 'completed') {
      return evidence.data.analysis.results;
    } else if (status === 'failed') {
      throw new Error('Analysis failed');
    }
    
    // Aguardar 30 segundos antes de verificar novamente
    await delay(30000);
  }
  
  throw new Error('Analysis timeout');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

**Próximo**: [14-api-testing.md](14-api-testing.md) - Testes da API

---


[**retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
