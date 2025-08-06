# 🔐 Sistema de Autenticação - CaseZero

O Sistema de Autenticação do CaseZero fornece controle de acesso seguro e gerenciamento de identidade para todos os usuários da plataforma.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura de Autenticação](#arquitetura-de-autenticação)
- [Processo de Login](#processo-de-login)
- [Tokens JWT](#tokens-jwt)
- [Níveis de Autorização](#níveis-de-autorização)
- [Gerenciamento de Sessões](#gerenciamento-de-sessões)
- [Segurança e Proteção](#segurança-e-proteção)
- [Implementação Técnica](#implementação-técnica)

## 🎯 Visão Geral

O sistema implementa autenticação baseada em JWT (JSON Web Tokens) com múltiplos níveis de autorização, proporcionando acesso seguro e controlado aos recursos da plataforma.

### Características Principais

- **JWT Tokens**: Autenticação stateless e segura
- **Multi-Role**: Diferentes níveis de acesso por função
- **Session Management**: Controle de sessões ativas
- **Password Security**: Políticas robustas de senha
- **Audit Trail**: Log completo de acessos e ações

## 🏗️ Arquitetura de Autenticação

### Fluxo de Autenticação

```text
┌─────────────────────────────────────────────────────────┐
│ 🔄 FLUXO DE AUTENTICAÇÃO                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 👤 Cliente                    🌐 Backend                │
│                                                         │
│ 1. Login Request ─────────────→ Authentication API      │
│    (username/password)                                  │
│                                                         │
│ 2. Validation ←──────────────── Database Check         │
│    (credentials + status)                               │
│                                                         │
│ 3. JWT Generation ←─────────── Token Service            │
│    (access + refresh tokens)                            │
│                                                         │
│ 4. Response ←─────────────────── Secure Headers         │
│    (tokens + user info)                                 │
│                                                         │
│ 5. API Requests ───────────────→ Protected Endpoints    │
│    (Bearer token)                                       │
│                                                         │
│ 6. Token Validation ←────────── Middleware              │
│    (verify + authorize)                                 │
│                                                         │
│ 7. Resource Access ←─────────── Application Logic       │
│    (based on permissions)                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Componentes do Sistema

#### Authentication Service
- **Login/Logout**: Gerenciamento de sessões
- **Token Management**: Criação e validação de JWT
- **Password Reset**: Recuperação de senhas
- **User Validation**: Verificação de credenciais

#### Authorization Service
- **Role-Based Access**: Controle por funções
- **Permission Check**: Verificação de permissões
- **Resource Access**: Controle de acesso a recursos
- **Audit Logging**: Registro de ações

## 🔑 Processo de Login

### Interface de Login

```text
┌───────────────────────────────────────────────────────────┐
│ 🔐 CASEZERO - LOGIN                                       │
├───────────────────────────────────────────────────────────┤
│                                                           │
│                    🚔 CaseZero                            │
│                Sistema de Investigação                    │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ 👤 Usuário:                                         │   │
│ │ [detective.silva@policia.gov.br_______________]     │   │
│ │                                                     │   │
│ │ 🔒 Senha:                                           │   │
│ │ [••••••••••••••••••••••••••••••••••••••••••••••]   │   │
│ │                                                     │   │
│ │ ☑️ Lembrar por 30 dias                              │   │
│ │ ☐ Modo offline (limitado)                          │   │
│ │                                                     │   │
│ │ [ 🔐 Entrar ]                                       │   │
│ │                                                     │   │
│ │ 🔗 Esqueci minha senha                              │   │
│ │ 🆘 Primeiro acesso                                  │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                           │
│ 🔒 Acesso seguro com criptografia SSL/TLS                │
│ 📱 Disponível também via aplicativo móvel                │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Validação de Credenciais

```text
┌───────────────────────────────────────────────────────────┐
│ ⚡ PROCESSO DE VALIDAÇÃO                                  │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📧 Email: detective.silva@policia.gov.br                 │
│ 🔍 Status: ✅ Válido e ativo                             │
│                                                           │
│ 🔒 Verificação de Senha:                                 │
│ ├── ✅ Hash BCrypt válido                                │
│ ├── ✅ Força de senha adequada                           │
│ ├── ✅ Não está na lista de senhas comprometidas         │
│ └── ✅ Última alteração: 15 dias atrás                   │
│                                                           │
│ 👤 Verificação de Usuário:                               │
│ ├── ✅ Conta ativa e não suspensa                        │
│ ├── ✅ Departamento: Delegacia 15º DP                    │
│ ├── ✅ Função: Detective Investigador                    │
│ ├── ✅ Último acesso: 2 horas atrás                      │
│ └── ⚠️  Tentativas de login: 0/5                         │
│                                                           │
│ 🛡️ Verificações de Segurança:                            │
│ ├── ✅ IP dentro da faixa autorizada                     │
│ ├── ✅ Horário dentro do período permitido               │
│ ├── ✅ Dispositivo conhecido (fingerprint)               │
│ └── ✅ Geolocalização compatível                         │
│                                                           │
│ 🎯 Resultado: ✅ AUTENTICAÇÃO APROVADA                   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Resposta de Autenticação

```json
{
  "success": true,
  "user": {
    "id": "usr_001",
    "name": "Detective Silva",
    "email": "detective.silva@policia.gov.br",
    "department": "15º DP",
    "role": "investigator",
    "permissions": [
      "cases:read",
      "cases:write",
      "evidence:upload",
      "evidence:analyze",
      "lab:request",
      "reports:generate"
    ],
    "lastLogin": "2024-08-05T10:30:00Z",
    "profilePicture": "/assets/profiles/silva.jpg"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "rf_tk_abc123def456...",
    "expiresIn": 3600,
    "tokenType": "Bearer"
  },
  "session": {
    "sessionId": "sess_xyz789",
    "expiresAt": "2024-08-05T14:30:00Z",
    "deviceInfo": {
      "type": "desktop",
      "browser": "Chrome 126",
      "os": "Windows 11"
    }
  }
}
```

## 🎫 Tokens JWT

### Estrutura do Token

```text
┌───────────────────────────────────────────────────────────┐
│ 🎫 ESTRUTURA DO JWT TOKEN                                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📋 HEADER:                                               │
│ {                                                         │
│   "alg": "HS256",                                        │
│   "typ": "JWT",                                          │
│   "kid": "key-2024-08"                                   │
│ }                                                         │
│                                                           │
│ 📄 PAYLOAD:                                              │
│ {                                                         │
│   "sub": "usr_001",                    // User ID         │
│   "name": "Detective Silva",           // Full name       │
│   "email": "detective.silva@policia.gov.br",             │
│   "role": "investigator",              // Primary role    │
│   "permissions": [                     // Granted perms   │
│     "cases:read", "cases:write",                          │
│     "evidence:upload", "lab:request"                      │
│   ],                                                      │
│   "department": "15º DP",              // Department      │
│   "session": "sess_xyz789",            // Session ID      │
│   "iat": 1722852600,                   // Issued at       │
│   "exp": 1722856200,                   // Expires at      │
│   "iss": "casezero-auth",              // Issuer          │
│   "aud": "casezero-api"                // Audience        │
│ }                                                         │
│                                                           │
│ 🔒 SIGNATURE:                                            │
│ HMACSHA256(                                              │
│   base64UrlEncode(header) + "." +                        │
│   base64UrlEncode(payload),                              │
│   secret                                                 │
│ )                                                         │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Validação de Token

```text
┌───────────────────────────────────────────────────────────┐
│ ✅ VALIDAÇÃO DE JWT TOKEN                                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 1. 🔍 Verificação de Formato:                            │
│    ├── ✅ Estrutura JWT válida (header.payload.signature) │
│    ├── ✅ Base64 encoding correto                         │
│    └── ✅ JSON parsing bem-sucedido                       │
│                                                           │
│ 2. 🔒 Verificação de Assinatura:                         │
│    ├── ✅ Algoritmo HMAC-SHA256                          │
│    ├── ✅ Chave secreta válida                           │
│    └── ✅ Assinatura corresponde ao payload               │
│                                                           │
│ 3. ⏰ Verificação Temporal:                               │
│    ├── ✅ Token não expirado (exp > now)                 │
│    ├── ✅ Issued At válido (iat <= now)                  │
│    └── ✅ Not Before válido (nbf <= now)                 │
│                                                           │
│ 4. 📋 Verificação de Claims:                             │
│    ├── ✅ Issuer correto (casezero-auth)                 │
│    ├── ✅ Audience válido (casezero-api)                 │
│    ├── ✅ Subject presente (user ID)                     │
│    └── ✅ Session ativa no banco de dados                │
│                                                           │
│ 5. 👤 Verificação de Usuário:                            │
│    ├── ✅ Usuário existe e está ativo                    │
│    ├── ✅ Permissões ainda válidas                       │
│    ├── ✅ Não houve mudança de senha                     │
│    └── ✅ Sessão não foi revogada                        │
│                                                           │
│ 🎯 Resultado: ✅ TOKEN VÁLIDO E AUTORIZADO               │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Refresh Token Flow

```text
┌───────────────────────────────────────────────────────────┐
│ 🔄 FLUXO DE REFRESH TOKEN                                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 👤 Cliente                    🌐 API                      │
│                                                           │
│ 1. API Request ────────────────→ Protected Endpoint       │
│    (expired access token)                                 │
│                                                           │
│ 2. 401 Unauthorized ←────────── Token Validation          │
│    (token expired)                                        │
│                                                           │
│ 3. Refresh Request ────────────→ /auth/refresh            │
│    (refresh token)                                        │
│                                                           │
│ 4. Validation ←───────────────── Token Service            │
│    (verify refresh token)                                 │
│                                                           │
│ 5. New Tokens ←───────────────── Generation               │
│    (new access + refresh)                                 │
│                                                           │
│ 6. Retry Request ─────────────→ Protected Endpoint        │
│    (new access token)                                     │
│                                                           │
│ 7. Success Response ←─────────── Resource Access          │
│    (requested data)                                       │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 👮 Níveis de Autorização

### Hierarquia de Funções

```text
┌───────────────────────────────────────────────────────────┐
│ 🎖️ HIERARQUIA DE FUNÇÕES                                  │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 👑 ADMINISTRADOR SISTEMA                                  │
│ ├── 🔧 Gerenciar usuários e departamentos                 │
│ ├── ⚙️ Configurar sistema e políticas                     │
│ ├── 📊 Acessar todas as estatísticas                      │
│ ├── 🗄️ Backup e restauração de dados                      │
│ └── 🔒 Gerenciar chaves e certificados                    │
│                                                           │
│ 👮‍♂️ CHEFE DE DEPARTAMENTO                                  │
│ ├── 👥 Gerenciar equipe do departamento                   │
│ ├── 📋 Atribuir e supervisionar casos                     │
│ ├── 📊 Relatórios departamentais                          │
│ ├── 💰 Aprovar orçamentos de investigação                 │
│ └── 🎯 Definir prioridades de casos                       │
│                                                           │
│ 🕵️ INVESTIGADOR SÊNIOR                                    │
│ ├── 📂 Gerenciar casos complexos                          │
│ ├── 👨‍🏫 Supervisionar investigadores júnior               │
│ ├── 🔬 Autorizar análises especiais                       │
│ ├── 📝 Revisar e aprovar relatórios                       │
│ └── 🎓 Acessar casos de treinamento avançado              │
│                                                           │
│ 🔍 INVESTIGADOR                                           │
│ ├── 📁 Criar e gerenciar casos                            │
│ ├── 🧩 Upload e análise de evidências                     │
│ ├── 🔬 Solicitar análises laboratoriais                   │
│ ├── 📋 Gerar relatórios de progresso                      │
│ └── 🎮 Participar de treinamentos                         │
│                                                           │
│ 🧪 TÉCNICO LABORATÓRIO                                    │
│ ├── 🔬 Executar análises forenses                         │
│ ├── 📊 Gerar laudos técnicos                              │
│ ├── ⚗️ Gerenciar equipamentos                             │
│ ├── 📈 Relatórios de capacidade                           │
│ └── 🎯 Casos atribuídos apenas                            │
│                                                           │
│ 📚 ESTAGIÁRIO                                             │
│ ├── 👁️ Visualizar casos supervisionados                   │
│ ├── 🎓 Acessar materiais de treinamento                   │
│ ├── 📝 Fazer anotações e observações                      │
│ ├── ❓ Solicitar orientação                               │
│ └── 🚫 Sem acesso a evidências sensíveis                  │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Matriz de Permissões

```text
┌───────────────────────────────────────────────────────────┐
│ 📊 MATRIZ DE PERMISSÕES                                   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ Recurso              │ Admin │ Chefe │ Sr.Inv │ Inv │ Téc │ Est │
│ ─────────────────────┼───────┼───────┼────────┼─────┼─────┼─────┤
│ 👥 Usuários          │   ✅   │   ✅   │   ❌    │  ❌  │  ❌  │  ❌  │
│ 🏢 Departamentos     │   ✅   │   👁️   │   👁️    │  👁️  │  👁️  │  👁️  │
│ 📂 Casos - Criar     │   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 📂 Casos - Editar    │   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  👁️  │
│ 📂 Casos - Deletar   │   ✅   │   ✅   │   ❌    │  ❌  │  ❌  │  ❌  │
│ 🧩 Evidências - Upload│   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 🧩 Evidências - Edit │   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  👁️  │
│ 🔬 Análises - Request│   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 🔬 Análises - Execute│   ✅   │   ❌   │   ❌    │  ❌  │  ✅  │  ❌  │
│ 📊 Relatórios - Gen  │   ✅   │   ✅   │   ✅    │  ✅  │  ✅  │  👁️  │
│ 📊 Relatórios - All  │   ✅   │   ✅   │   👁️    │  👁️  │  👁️  │  ❌  │
│ ⚙️ Configurações     │   ✅   │   🔧   │   ❌    │  ❌  │  ❌  │  ❌  │
│ 📋 Audit Logs       │   ✅   │   👁️   │   ❌    │  ❌  │  ❌  │  ❌  │
│                                                           │
│ Legenda: ✅ Total │ 🔧 Limitado │ 👁️ Só Leitura │ ❌ Negado │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 🖥️ Gerenciamento de Sessões

### Dashboard de Sessões

```text
┌───────────────────────────────────────────────────────────┐
│ 💻 GERENCIAMENTO DE SESSÕES                               │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 👤 Usuário: Detective Silva (detective.silva@policia...)  │
│ 🎯 Status: 🟢 Ativo | 🕐 Online há: 2h 15min             │
│                                                           │
│ 📱 SESSÕES ATIVAS:                                       │
│                                                           │
│ 🟢 ATUAL - Desktop Chrome (Windows 11)                   │
│ 📍 IP: 192.168.1.105 (Delegacia 15º DP)                 │
│ 🕐 Início: 08:15 | 🔄 Última atividade: 10:30           │
│ 🎫 Token: sess_xyz789 | ⏰ Expira: 14:15                │
│ [ 🔄 Renovar ] [ ❌ Esta sessão não pode ser encerrada ]  │
│                                                           │
│ 🟡 Mobile Safari (iPhone 13)                             │
│ 📍 IP: 192.168.43.22 (Rede móvel)                       │
│ 🕐 Início: 07:45 | 🔄 Última atividade: 09:12           │
│ 🎫 Token: sess_abc456 | ⏰ Expira: 13:45                │
│ [ 🔄 Renovar ] [ ❌ Encerrar Sessão ]                    │
│                                                           │
│ 🔴 Desktop Firefox (Ubuntu 22.04) - SUSPEITA            │
│ 📍 IP: 203.145.67.89 (Localização desconhecida)         │
│ 🕐 Início: 23:30 | 🔄 Última atividade: 02:15           │
│ 🎫 Token: sess_def789 | ⏰ Expira: 06:30                │
│ [ ⚠️ Investigar ] [ 🚨 Encerrar Imediatamente ]          │
│                                                           │
│ 📊 ESTATÍSTICAS:                                         │
│ • Total sessões hoje: 3                                  │
│ • Tempo total online: 6h 22min                           │
│ • Dispositivos únicos: 3                                 │
│ • Logins fora do horário: 1 ⚠️                          │
│                                                           │
│ 🔧 CONFIGURAÇÕES:                                        │
│ ☑️ Notificar logins de novos dispositivos                │
│ ☑️ Exigir autenticação 2FA em IPs externos               │
│ ☐ Limitar a 1 sessão ativa simultaneamente               │
│ ☑️ Auto-logout após 4h de inatividade                    │
│                                                           │
│ [ 🚨 Encerrar Todas ] [ 📊 Histórico ] [ ⚙️ Configurações ] │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Configurações de Sessão

```text
┌───────────────────────────────────────────────────────────┐
│ ⚙️ CONFIGURAÇÕES DE SESSÃO                                │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ ⏰ TIMEOUTS:                                              │
│ Access Token TTL: [1 hora____] (Padrão: 1h)              │
│ Refresh Token TTL: [30 dias__] (Padrão: 30d)             │
│ Inatividade Logout: [4 horas__] (Padrão: 4h)             │
│ Sessão Absoluta: [12 horas_] (Padrão: 12h)               │
│                                                           │
│ 🔒 SEGURANÇA:                                             │
│ ☑️ Bind token ao IP de origem                            │
│ ☑️ Bind token ao User-Agent                              │
│ ☑️ Rotação automática de Refresh Token                   │
│ ☑️ Invalidar tokens em mudança de senha                  │
│ ☐ Permitir múltiplas sessões simultâneas                │
│                                                           │
│ 🌐 RESTRIÇÕES DE IP:                                     │
│ ☑️ Permitir apenas IPs da rede interna                   │
│ Lista de IPs autorizados:                                │
│ • 192.168.1.0/24 (Rede da delegacia)                    │
│ • 10.0.0.0/16 (VPN corporativa)                         │
│ • 203.145.67.0/24 (Sede da polícia)                     │
│ [ ➕ Adicionar IP/Range ] [ ✏️ Editar ] [ 🗑️ Remover ]    │
│                                                           │
│ 📅 HORÁRIOS PERMITIDOS:                                  │
│ ☑️ Restringir horários de acesso                         │
│ Segunda a Sexta: [06:00] às [22:00]                      │
│ Sábado e Domingo: [08:00] às [18:00]                     │
│ ☑️ Permitir exceções para investigadores sênior          │
│                                                           │
│ 📱 DISPOSITIVOS:                                          │
│ ☑️ Lembrar dispositivos conhecidos (30 dias)             │
│ ☑️ Notificar login de novos dispositivos                 │
│ ☑️ Exigir aprovação para dispositivos móveis             │
│ ☐ Bloquear dispositivos não corporativos                 │
│                                                           │
│ [ 💾 Salvar Configurações ] [ 🔄 Restaurar Padrões ]     │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 🛡️ Segurança e Proteção

### Políticas de Senha

```text
┌───────────────────────────────────────────────────────────┐
│ 🔐 POLÍTICAS DE SENHA                                     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📏 REQUISITOS MÍNIMOS:                                    │
│ • Comprimento: 12 caracteres                             │
│ • Letras maiúsculas: Pelo menos 1                        │
│ • Letras minúsculas: Pelo menos 2                        │
│ • Números: Pelo menos 2                                  │
│ • Símbolos especiais: Pelo menos 1                       │
│ • Não pode conter nome do usuário                        │
│ • Não pode ser sequencial (123456, abcdef)               │
│                                                           │
│ 🚫 RESTRIÇÕES:                                            │
│ • Não reutilizar últimas 12 senhas                       │
│ • Não usar palavras do dicionário                        │
│ • Não usar informações pessoais                          │
│ • Não usar padrões de teclado (qwerty)                   │
│                                                           │
│ ⏰ TEMPORALIDADE:                                         │
│ • Alteração obrigatória: A cada 90 dias                  │
│ • Aviso de expiração: 14 dias antes                      │
│ • Período de graça: 7 dias após expiração                │
│ • Histórico de senhas: 12 senhas anteriores              │
│                                                           │
│ 🔍 VERIFICAÇÃO EM TEMPO REAL:                            │
│ Nova senha: [****************____]                       │
│                                                           │
│ ✅ Comprimento adequado (16/12 caracteres)               │
│ ✅ Contém maiúsculas                                     │
│ ✅ Contém minúsculas                                     │
│ ✅ Contém números                                        │
│ ✅ Contém símbolos especiais                             │
│ ✅ Não é uma senha conhecida comprometida                │
│ ✅ Não reutiliza senhas anteriores                       │
│                                                           │
│ 💪 Força da Senha: ████████████ MUITO FORTE             │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Detecção de Anomalias

```text
┌───────────────────────────────────────────────────────────┐
│ 🚨 DETECÇÃO DE ANOMALIAS                                  │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 📊 PADRÕES NORMAIS (Últimos 30 dias):                    │
│ • Horário usual: 08:00 - 18:00                           │
│ • Localização: 192.168.1.0/24 (95% do tempo)            │
│ • Dispositivos: Desktop Windows (80%), Mobile iOS (20%)  │
│ • Duração sessão: 6-8 horas                              │
│                                                           │
│ ⚠️ ANOMALIAS DETECTADAS:                                 │
│                                                           │
│ 🔴 ALTA PRIORIDADE:                                      │
│ • Login às 02:30 de IP externo (203.145.67.89)          │
│ • Tentativas de acesso a casos restritos                 │
│ • Download em massa de evidências (15 arquivos)          │
│ • Uso de User-Agent incomum (crawler/bot)                │
│                                                           │
│ 🟡 MÉDIA PRIORIDADE:                                     │
│ • Login de novo dispositivo (Linux/Firefox)              │
│ • Acesso fora do horário normal (22:30)                  │
│ • Velocidade de cliques anormal (possível automação)     │
│                                                           │
│ 🟢 BAIXA PRIORIDADE:                                     │
│ • Duração de sessão acima da média (10 horas)            │
│ • Múltiplas tentativas de senha (3 tentativas)           │
│                                                           │
│ 🤖 AÇÕES AUTOMÁTICAS TOMADAS:                            │
│ • Sessão suspeita encerrada automaticamente              │
│ • 2FA adicional solicitado para IP externo               │
│ • Notificação enviada ao usuário e supervisor            │
│ • Log de segurança registrado                            │
│                                                           │
│ 📋 AÇÕES RECOMENDADAS:                                   │
│ 1. Investigar atividade do IP 203.145.67.89              │
│ 2. Solicitar confirmação de identidade ao usuário        │
│ 3. Revisar permissões de acesso                          │
│ 4. Considerar alteração obrigatória de senha             │
│                                                           │
│ [ 🔍 Investigar ] [ 🚨 Bloquear Usuário ] [ ✅ Falso Positivo ] │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Audit Trail

```text
┌───────────────────────────────────────────────────────────┐
│ 📋 TRILHA DE AUDITORIA                                    │
├───────────────────────────────────────────────────────────┤
│                                                           │
│ 🔍 Filtros: [Hoje ▼] [Todos Usuários ▼] [Todas Ações ▼] │
│ 👤 Usuário: Detective Silva                               │
│                                                           │
│ ⏰ 10:45:22 | 🟢 LOGIN_SUCCESS                           │
│ 📍 IP: 192.168.1.105 | 🖥️ Chrome/Windows                │
│ 📝 Login bem-sucedido da estação de trabalho habitual    │
│                                                           │
│ ⏰ 10:47:15 | 🔍 CASE_ACCESS                             │
│ 📂 Caso: CASO-003 (Roubo Museu Nacional)                 │
│ 📝 Acesso à visualização de caso autorizado               │
│                                                           │
│ ⏰ 10:52:30 | 📤 EVIDENCE_UPLOAD                         │
│ 🧩 Evidência: crime_scene_photo.jpg (2.3MB)              │
│ 📝 Upload de evidência fotográfica autorizado            │
│                                                           │
│ ⏰ 11:15:45 | 🔬 ANALYSIS_REQUEST                        │
│ 🧪 Análise: AFIS - Impressão Digital                     │
│ 💰 Custo: €100 | 📝 Solicitação de análise aprovada      │
│                                                           │
│ ⏰ 11:47:12 | 📊 REPORT_GENERATE                         │
│ 📄 Relatório: Progresso do Caso CASO-003                 │
│ 📝 Geração de relatório de progresso autorizada          │
│                                                           │
│ ⏰ 12:03:18 | ⚠️ UNAUTHORIZED_ACCESS_ATTEMPT             │
│ 📂 Recurso: Caso CASO-007 (Acesso negado)                │
│ 📝 Tentativa de acesso a caso não autorizado             │
│                                                           │
│ ⏰ 02:30:45 | 🚨 ANOMALOUS_LOGIN                         │
│ 📍 IP: 203.145.67.89 | 🖥️ Firefox/Linux                 │
│ 📝 Login de localização suspeita - Investigação iniciada │
│                                                           │
│ 📊 RESUMO DO DIA:                                        │
│ • Total de ações: 47                                     │
│ • Logins: 3 (2 normais, 1 suspeito)                     │
│ • Acessos a casos: 12                                    │
│ • Uploads: 5                                             │
│ • Análises solicitadas: 3                                │
│ • Tentativas não autorizadas: 1                          │
│                                                           │
│ [ 📄 Exportar Log ] [ 🔍 Buscar Eventos ] [ ⚠️ Alertas ] │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 🔧 Implementação Técnica

### Authentication Controller

```typescript
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    const { email, password } = loginDto;
    
    // Rate limiting check
    await this.checkRateLimit(request.ip, email);
    
    // Validate credentials
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Security checks
    await this.performSecurityChecks(user, request);
    
    // Generate tokens
    const tokens = await this.authService.generateTokens(user);
    
    // Create session
    const session = await this.sessionService.createSession(user, request);
    
    // Audit log
    await this.auditService.logEvent('LOGIN_SUCCESS', user.id, request);
    
    return {
      user: this.sanitizeUser(user),
      tokens,
      session: this.sanitizeSession(session)
    };
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    const { refreshToken } = refreshDto;
    
    // Validate refresh token
    const payload = await this.authService.validateRefreshToken(refreshToken);
    
    // Get user and session
    const user = await this.userService.findById(payload.sub);
    const session = await this.sessionService.findById(payload.sessionId);
    
    if (!user || !session || !session.isActive) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    
    // Generate new tokens
    const newTokens = await this.authService.generateTokens(user);
    
    // Update session
    await this.sessionService.updateLastActivity(session.id);
    
    return { tokens: newTokens };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: AuthenticatedRequest) {
    const { user, sessionId } = request;
    
    // Revoke session
    await this.sessionService.revokeSession(sessionId);
    
    // Audit log
    await this.auditService.logEvent('LOGOUT', user.id, request);
    
    return { message: 'Logged out successfully' };
  }

  private async performSecurityChecks(user: User, request: Request) {
    // Check if account is locked
    if (user.isLocked) {
      throw new UnauthorizedException('Account is locked');
    }
    
    // Check IP restrictions
    if (!this.isIpAllowed(request.ip, user.allowedIps)) {
      throw new UnauthorizedException('Access from this IP is not allowed');
    }
    
    // Check time restrictions
    if (!this.isAccessTimeAllowed(user.allowedHours)) {
      throw new UnauthorizedException('Access outside allowed hours');
    }
    
    // Anomaly detection
    await this.anomalyService.checkForAnomalies(user, request);
  }
}
```

### JWT Service

```typescript
@Injectable()
export class JwtAuthService {
  constructor(
    @Inject('JWT_CONFIG') private jwtConfig: JwtConfig,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  async generateTokens(user: User, sessionId?: string): Promise<TokenPair> {
    const session = sessionId || await this.sessionService.createSession(user);
    
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      department: user.department,
      sessionId: session,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.jwtConfig.accessTokenTtl,
      iss: 'casezero-auth',
      aud: 'casezero-api'
    };

    const accessToken = jwt.sign(payload, this.jwtConfig.secret, {
      algorithm: 'HS256'
    });

    const refreshPayload = {
      sub: user.id,
      sessionId: session,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.jwtConfig.refreshTokenTtl
    };

    const refreshToken = jwt.sign(refreshPayload, this.jwtConfig.refreshSecret, {
      algorithm: 'HS256'
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.jwtConfig.accessTokenTtl,
      tokenType: 'Bearer'
    };
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      // Verify signature and decode
      const payload = jwt.verify(token, this.jwtConfig.secret) as JwtPayload;
      
      // Check token expiration
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        throw new UnauthorizedException('Token expired');
      }
      
      // Verify session is still active
      const session = await this.sessionService.findById(payload.sessionId);
      if (!session || !session.isActive) {
        throw new UnauthorizedException('Session is no longer active');
      }
      
      // Verify user is still active
      const user = await this.userService.findById(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('User account is not active');
      }
      
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

### Authorization Guard

```typescript
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required permissions from decorator
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions) {
      return true; // No specific permissions required
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Check if user has required permissions
    const hasPermission = await this.permissionService.hasPermissions(
      user,
      requiredPermissions
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}

// Usage decorator
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

// Controller usage example
@Controller('cases')
@UseGuards(JwtAuthGuard, AuthorizationGuard)
export class CasesController {
  @Get()
  @RequirePermissions('cases:read')
  async findAll() {
    // Implementation
  }

  @Post()
  @RequirePermissions('cases:create')
  async create(@Body() createCaseDto: CreateCaseDto) {
    // Implementation
  }

  @Delete(':id')
  @RequirePermissions('cases:delete')
  async remove(@Param('id') id: string) {
    // Implementation
  }
}
```

## 🎯 Boas Práticas

### Segurança
1. **Tokens Curtos**: Access tokens com TTL baixo (1 hora)
2. **Refresh Seguro**: Refresh tokens com rotação automática
3. **Bind de Sessão**: Vincular tokens ao IP e User-Agent
4. **Audit Completo**: Log de todas as ações sensíveis

### Performance
1. **Cache de Permissões**: Cache Redis para verificações frequentes
2. **Validação Assíncrona**: Verificações de segurança em background
3. **Rate Limiting**: Proteção contra ataques de força bruta
4. **Session Storage**: Armazenamento eficiente de sessões

### Usabilidade
1. **Login Rápido**: Interface responsiva e intuitiva
2. **Lembrar Dispositivos**: Reduzir fricção para usuários regulares
3. **Feedback Claro**: Mensagens de erro específicas e úteis
4. **Recuperação**: Processo simples de reset de senha

---

**Próximo**: [11-user-profiles.md](11-user-profiles.md) - Perfis de Usuário
