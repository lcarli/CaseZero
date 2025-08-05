# Estrutura Técnica Case Zero - Azure + C#

## 🎯 Stack Recomendada (Híbrida)

### Backend: C# + Azure
- **ASP.NET Core 8** - API moderna e performática
- **Azure SQL Database** - Banco relacional gerenciado
- **Azure Blob Storage** - Armazenamento de evidências
- **Azure App Service** - Hospedagem serverless

### Frontend: React + Azure
- **React 18 + TypeScript** - Interface moderna
- **Azure Static Web Apps** - Hospedagem frontend
- **Azure CDN** - Distribuição global

## 🏗️ Arquitetura Azure

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  Azure Static       │    │  Azure App Service  │    │  Azure SQL Database │
│  Web Apps           │◄──►│  (ASP.NET Core API) │◄──►│  (PostgreSQL/SQL)   │
│  (React Frontend)   │    │  + Authentication   │    │  Dados do jogo      │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
         │                           │                           │
         │                  ┌─────────────────────┐              │
         └──────────────────►│ Azure Blob Storage  │◄─────────────┘
                            │ Arquivos/Evidências │
                            └─────────────────────┘
```

## 🗂️ Nova Estrutura de Projeto

```
CaseZero/
├── backend/                           # ASP.NET Core Web API
│   ├── CaseZero.Api/                 # Projeto principal da API
│   │   ├── Controllers/              # Controladores da API
│   │   ├── Models/                   # DTOs e View Models
│   │   ├── Program.cs               # Entry point
│   │   └── appsettings.json         # Configurações
│   ├── CaseZero.Core/               # Lógica de negócio
│   │   ├── Entities/                # Entidades do domínio
│   │   ├── Services/                # Serviços de negócio
│   │   ├── Interfaces/              # Contratos
│   │   └── DTOs/                    # Objetos de transferência
│   ├── CaseZero.Infrastructure/     # Acesso a dados
│   │   ├── Data/                    # DbContext e Repositories
│   │   ├── Azure/                   # Serviços Azure (Blob, etc)
│   │   └── Migrations/              # Migrações do banco
│   └── CaseZero.Tests/              # Testes unitários
├── frontend/                        # React App
│   ├── src/
│   │   ├── components/              # Componentes React
│   │   ├── services/                # Cliente da API
│   │   ├── types/                   # Tipos TypeScript
│   │   └── App.tsx                  # App principal
│   └── package.json
├── infrastructure/                  # Bicep/ARM Templates
│   ├── main.bicep                   # Template principal
│   ├── app-service.bicep           # App Service
│   ├── storage.bicep               # Blob Storage
│   └── database.bicep              # SQL Database
└── cases/                          # Dados dos casos
    ├── caso_001/
    └── caso_002/
```

## 💻 Tecnologias Detalhadas

### Backend (.NET)
```csharp
// Principais NuGet packages
- Microsoft.AspNetCore.OpenApi      // Swagger/OpenAPI
- Microsoft.EntityFrameworkCore     // ORM
- Azure.Storage.Blobs               // Blob Storage
- Microsoft.AspNetCore.Identity     // Autenticação
- AutoMapper                        // Mapeamento de objetos
- FluentValidation                  // Validações
- Serilog                          // Logging
```

### Frontend (React)
```json
// Principais dependências
{
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "@tanstack/react-query": "^5.0.0",  // State management
  "react-router-dom": "^6.0.0",       // Roteamento
  "tailwindcss": "^3.0.0",           // CSS
  "axios": "^1.0.0",                 // HTTP client
  "react-i18next": "^13.0.0"         // Internacionalização
}
```

### Azure Services
- **Azure App Service** (Backend API)
- **Azure Static Web Apps** (Frontend)
- **Azure SQL Database** (Dados estruturados)
- **Azure Blob Storage** (Arquivos/evidências)
- **Azure Key Vault** (Secrets)
- **Azure Application Insights** (Monitoramento)

## 🗄️ Modelo de Dados (C#)

```csharp
// Entidades principais
public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DetectiveRank Rank { get; set; }
    public int CasesSolved { get; set; }
    public int CasesFailed { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation properties
    public List<InvestigationSession> Sessions { get; set; } = new();
}

public class Case
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public CaseDifficulty Difficulty { get; set; }
    public string? Culprit { get; set; }
    public List<string> ProofFiles { get; set; } = new();
    public CaseStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation properties
    public List<Evidence> Evidences { get; set; } = new();
    public List<InvestigationSession> Sessions { get; set; } = new();
}

public class InvestigationSession
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid CaseId { get; set; }
    public SessionStatus Status { get; set; }
    public List<string> EvidenceReviewed { get; set; } = new();
    public string Notes { get; set; } = string.Empty;
    public Accusation? FinalAccusation { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    
    // Navigation properties
    public User User { get; set; } = null!;
    public Case Case { get; set; } = null!;
    public List<AnalysisRequest> AnalysisRequests { get; set; } = new();
    public List<TimelineEvent> TimelineEvents { get; set; } = new();
}

// Enums
public enum DetectiveRank
{
    Rookie,
    Detective,
    Sergeant,
    Lieutenant,
    Captain
}

public enum CaseDifficulty
{
    Tutorial,
    Easy,
    Medium,
    Hard,
    Expert
}
```

## 🔌 APIs (.NET Controllers)

```csharp
[ApiController]
[Route("api/[controller]")]
public class CasesController : ControllerBase
{
    private readonly ICaseService _caseService;

    [HttpGet]
    public async Task<ActionResult<List<CaseDto>>> GetAllCases()
    {
        var cases = await _caseService.GetAllCasesAsync();
        return Ok(cases);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CaseDetailDto>> GetCase(Guid id)
    {
        var caseDetail = await _caseService.GetCaseByIdAsync(id);
        return Ok(caseDetail);
    }

    [HttpPost("{id:guid}/start")]
    [Authorize]
    public async Task<ActionResult<InvestigationSessionDto>> StartInvestigation(Guid id)
    {
        var userId = User.GetUserId();
        var session = await _caseService.StartInvestigationAsync(userId, id);
        return Ok(session);
    }
}

[ApiController]
[Route("api/[controller]")]
public class InvestigationController : ControllerBase
{
    private readonly IInvestigationService _investigationService;

    [HttpGet("{sessionId:guid}")]
    [Authorize]
    public async Task<ActionResult<InvestigationSessionDto>> GetInvestigation(Guid sessionId)
    {
        var session = await _investigationService.GetSessionAsync(sessionId);
        return Ok(session);
    }

    [HttpPost("{sessionId:guid}/accuse")]
    [Authorize]
    public async Task<ActionResult<AccusationResultDto>> MakeAccusation(
        Guid sessionId, 
        [FromBody] AccusationDto accusation)
    {
        var result = await _investigationService.SubmitAccusationAsync(sessionId, accusation);
        return Ok(result);
    }
}
```

## 🚀 Deploy Azure com Bicep

```bicep
// main.bicep
@minLength(1)
@maxLength(64)
@description('Nome do ambiente (dev, staging, prod)')
param environmentName string = 'dev'

@minLength(1)
@description('Localização dos recursos')
param location string = resourceGroup().location

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'plan-casezero-${environmentName}'
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  properties: {
    reserved: false
  }
}

// App Service (API)
resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: 'api-casezero-${environmentName}'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      netFrameworkVersion: 'v8.0'
      metadata: [
        {
          name: 'CURRENT_STACK'
          value: 'dotnet'
        }
      ]
    }
  }
}

// SQL Database
resource sqlServer 'Microsoft.Sql/servers@2022-05-01-preview' = {
  name: 'sql-casezero-${environmentName}'
  location: location
  properties: {
    administratorLogin: 'casezero'
    administratorLoginPassword: 'ComplexPassword123!'
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2022-05-01-preview' = {
  parent: sqlServer
  name: 'CaseZero'
  location: location
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
}

// Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'stcasezero${environmentName}'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    publicNetworkAccess: 'Enabled'
  }
}
```

## 🎨 Sobre o Design

Para o **design/UI**, recomendo manter o **React no frontend** porque:

### ✅ Vantagens React para UI:
- **Ecossistema maduro** para componentes visuais
- **Tailwind CSS** - fácil de criar interfaces modernas
- **React DnD** - perfeito para janelas flutuantes
- **Bibliotecas especializadas** - players de vídeo, viewers de PDF
- **Seu amigo pode ajudar** - suporte garantido

### 🎨 Alternativas de Design:
1. **Template pronto** - Usar um admin template e customizar
2. **Figma + Tailwind** - Design profissional
3. **Component Library** - Headless UI, Radix UI

## 📋 Cronograma Sugerido

### Fase 1: Backend C# (Sua zona de conforto)
1. Setup Azure + ASP.NET Core
2. Autenticação + Banco de dados
3. APIs básicas (casos, evidências)
4. Deploy inicial

### Fase 2: Frontend React (Com ajuda do amigo)
1. Setup React + chamadas API
2. Interface básica de investigação
3. Sistema de janelas flutuantes
4. Integração completa

### Fase 3: Polimento
1. Casos de exemplo
2. Análises forenses
3. Testes e otimização

## 💰 Estimativa de Custos Azure (Mensal)

- **App Service Basic B1**: ~$13/mês
- **Azure SQL Basic**: ~$5/mês  
- **Storage Account**: ~$1/mês
- **Static Web Apps**: Grátis
- **Total**: ~$19/mês (facilmente coberto pelos créditos)

## 🎯 Conclusão

**Recomendo fortemente a Stack Híbrida:**
- Use C# onde você é forte (backend/lógica)
- Use React onde precisa de flexibilidade (UI)
- Aproveite 100% dos créditos Azure
- Tenha suporte do amigo no frontend

Quer que eu crie os primeiros arquivos dessa estrutura C# + Azure?
