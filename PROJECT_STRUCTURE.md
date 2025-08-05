# 📁 Estrutura do Projeto Case Zero

## 🗂️ Organização dos Diretórios

```
CaseZero/
├── 📁 backend/                           # ASP.NET Core Web API
│   ├── CaseZero.Api/                    # 🌐 Projeto principal da API
│   │   ├── Controllers/                 # 🎮 Controladores REST
│   │   ├── Models/                      # 📋 DTOs e ViewModels
│   │   ├── Middleware/                  # 🔧 Middlewares personalizados
│   │   ├── Program.cs                   # 🚀 Entry point da aplicação
│   │   ├── appsettings.json            # ⚙️ Configurações
│   │   └── CaseZero.Api.csproj         # 📦 Projeto .NET
│   ├── CaseZero.Core/                   # 🧠 Lógica de negócio
│   │   ├── Entities/                    # 🏗️ Entidades do domínio
│   │   ├── Services/                    # 🔧 Serviços de negócio
│   │   ├── Interfaces/                  # 📝 Contratos e interfaces
│   │   ├── DTOs/                        # 📦 Objetos de transferência
│   │   ├── Enums/                       # 📋 Enumerações
│   │   └── CaseZero.Core.csproj        # 📦 Projeto .NET
│   ├── CaseZero.Infrastructure/         # 🔌 Acesso a dados e serviços externos
│   │   ├── Data/                        # 🗄️ DbContext e configurações EF
│   │   ├── Azure/                       # ☁️ Serviços Azure (Blob, etc)
│   │   ├── Repositories/                # 📚 Implementação de repositórios
│   │   ├── Migrations/                  # 🔄 Migrações do banco
│   │   └── CaseZero.Infrastructure.csproj # 📦 Projeto .NET
│   └── CaseZero.Tests/                  # 🧪 Testes unitários e integração
│       ├── Unit/                        # 🔬 Testes unitários
│       ├── Integration/                 # 🔗 Testes de integração
│       └── CaseZero.Tests.csproj       # 📦 Projeto de testes
├── 📁 frontend/                          # ⚛️ React Application
│   ├── src/                             # 📝 Código fonte
│   │   ├── components/                  # 🧩 Componentes React
│   │   │   ├── common/                  # 🔄 Componentes reutilizáveis
│   │   │   ├── investigation/           # 🔍 Componentes de investigação
│   │   │   ├── evidence/                # 📋 Componentes de evidência
│   │   │   └── ui/                      # 🎨 Componentes de interface
│   │   ├── pages/                       # 📄 Páginas da aplicação
│   │   ├── services/                    # 🌐 Clientes de API
│   │   ├── hooks/                       # 🪝 Custom hooks React
│   │   ├── store/                       # 🗄️ Estado global (Zustand)
│   │   ├── types/                       # 📋 Tipos TypeScript
│   │   ├── utils/                       # 🛠️ Funções utilitárias
│   │   ├── styles/                      # 🎨 Estilos globais
│   │   └── App.tsx                      # 🚀 Componente principal
│   ├── public/                          # 📦 Assets estáticos
│   │   ├── assets/                      # 🖼️ Imagens, ícones, etc
│   │   └── locales/                     # 🌐 Arquivos de tradução
│   │       ├── pt/                      # 🇧🇷 Português
│   │       ├── en/                      # 🇺🇸 Inglês
│   │       ├── fr/                      # 🇫🇷 Francês
│   │       └── es/                      # 🇪🇸 Espanhol
│   ├── tests/                           # 🧪 Testes frontend
│   ├── package.json                     # 📦 Dependências Node.js
│   ├── tsconfig.json                    # ⚙️ Configuração TypeScript
│   └── vite.config.ts                   # ⚙️ Configuração Vite
├── 📁 infrastructure/                    # ☁️ Infraestrutura como código
│   ├── main.bicep                       # 🏗️ Template principal Bicep
│   ├── modules/                         # 📦 Módulos Bicep reutilizáveis
│   │   ├── app-service.bicep           # 🌐 App Service
│   │   ├── storage.bicep               # 💾 Storage Account
│   │   ├── database.bicep              # 🗄️ SQL Database
│   │   └── keyvault.bicep              # 🔐 Key Vault
│   └── parameters/                      # ⚙️ Parâmetros por ambiente
│       ├── dev.json                     # 🧪 Desenvolvimento
│       ├── staging.json                 # 🚀 Homologação
│       └── prod.json                    # 🏭 Produção
├── 📁 cases/                            # 📂 Dados dos casos
│   ├── caso_tutorial/                   # 🎓 Caso de tutorial
│   │   ├── info.json                    # ℹ️ Metadados do caso
│   │   ├── briefing_pt.md              # 📄 Briefing em português
│   │   ├── files/                       # 📁 Arquivos de evidência
│   │   └── analysis/                    # 🧪 Resultados de análises
│   └── caso_001/                        # 📂 Primeiro caso real
│       └── ...                          # (estrutura similar)
├── 📁 scripts/                          # 🔧 Scripts utilitários
│   ├── database/                        # 🗄️ Scripts de banco
│   │   ├── database_schema.sql         # 📋 Schema SQL Server
│   │   └── database_schema_postgresql.sql # 📋 Schema PostgreSQL
│   ├── deployment/                      # 🚀 Scripts de deploy
│   │   ├── deploy-azure.sh             # ☁️ Deploy para Azure
│   │   ├── setup-environment.sh        # ⚙️ Setup do ambiente
│   │   └── docker-compose.yml          # 🐳 Containerização
│   └── development/                     # 💻 Scripts de desenvolvimento
│       ├── seed-database.sql           # 🌱 Dados iniciais
│       ├── backup-cases.sh             # 💾 Backup dos casos
│       └── generate-case.js            # 🎲 Gerador de casos
├── 📁 docs/                             # 📚 Documentação
│   ├── api/                             # 🌐 Documentação da API
│   │   ├── swagger.json                # 📋 Especificação OpenAPI
│   │   └── endpoints.md                # 📝 Guia de endpoints
│   ├── user-guide/                      # 👤 Guia do usuário
│   │   ├── how-to-play.md              # 🎮 Como jogar
│   │   ├── case-creation.md            # ✨ Criação de casos
│   │   └── troubleshooting.md          # 🔧 Solução de problemas
│   ├── development/                     # 💻 Documentação técnica
│   │   ├── ESTRUTURA_AZURE_CSHARP.md   # 🏗️ Arquitetura C# + Azure
│   │   ├── DATABASE_SETUP.md           # 🗄️ Setup do banco
│   │   └── CONTRIBUTING.md             # 🤝 Guia de contribuição
│   ├── GDD.md                          # 🎯 Game Design Document
│   ├── Fluxos e Falhas.md              # 🔄 Fluxos e mecânicas
│   ├── Novos Casos.md                  # ➕ Criação de novos casos
│   └── Resumo Tecnico.md               # 📋 Resumo técnico
├── 📄 README.md                         # 📖 Documentação principal
├── 📄 LICENSE                           # ⚖️ Licença do projeto
├── 📄 .gitignore                        # 🚫 Arquivos ignorados pelo Git
├── 📄 .editorconfig                     # ⚙️ Configuração do editor
└── 📄 CaseZero.sln                      # 🏗️ Solution .NET

```

## 📋 Convenções de Nomenclatura

### 🏗️ Backend (.NET)
- **Namespaces**: `CaseZero.{Camada}.{Funcionalidade}`
- **Classes**: PascalCase (`UserService`, `CaseController`)
- **Métodos**: PascalCase (`GetAllCasesAsync`, `ValidateAccusation`)
- **Propriedades**: PascalCase (`UserId`, `CaseNumber`)
- **Campos privados**: camelCase com underscore (`_userService`, `_logger`)
- **Constantes**: UPPER_CASE (`MAX_CONCURRENT_ANALYSES`)

### ⚛️ Frontend (React/TypeScript)
- **Componentes**: PascalCase (`InvestigationDesktop`, `EvidenceViewer`)
- **Arquivos de componentes**: PascalCase (`InvestigationDesktop.tsx`)
- **Hooks**: camelCase com "use" (`useInvestigation`, `useEvidence`)
- **Utilitários**: camelCase (`formatDateTime`, `validateEmail`)
- **Constantes**: UPPER_CASE (`API_BASE_URL`, `SUPPORTED_LANGUAGES`)

### 🗄️ Banco de Dados
- **Tabelas**: PascalCase (`Users`, `Cases`, `InvestigationSessions`)
- **Colunas**: PascalCase (`UserId`, `CaseNumber`, `CreatedAt`)
- **Índices**: `IX_{Tabela}_{Coluna}` (`IX_Users_Email`)
- **Foreign Keys**: `FK_{TabelaOrigem}_{TabelaDestino}_{Coluna}`

### 📁 Arquivos e Pastas
- **Pastas**: kebab-case (`user-guide`, `case-creation`)
- **Arquivos**: kebab-case para docs, PascalCase para código
- **Componentes React**: PascalCase (`EvidenceViewer.tsx`)
- **Documentação**: UPPERCASE para principais (`README.md`, `LICENSE`)

## 🔄 Fluxo de Desenvolvimento

### 🌿 Git Flow
```
main (produção)
├── develop (desenvolvimento)
│   ├── feature/nova-funcionalidade
│   ├── feature/outro-recurso
│   └── hotfix/correcao-urgente
└── release/v1.0.0
```

### 📦 Versionamento
- **Formato**: Semantic Versioning (x.y.z)
- **Major**: Mudanças breaking
- **Minor**: Novas funcionalidades
- **Patch**: Bug fixes

### 🧪 Testes
- **Unit Tests**: 70%+ de cobertura
- **Integration Tests**: APIs principais
- **E2E Tests**: Fluxos críticos
- **Performance Tests**: Load testing

## 🚀 Deploy Pipeline

### 🔄 CI/CD
1. **Build** → Compilação e testes
2. **Test** → Execução de todos os testes
3. **Security** → Scan de vulnerabilidades
4. **Deploy Dev** → Deploy automático para desenvolvimento
5. **Deploy Staging** → Deploy manual para homologação
6. **Deploy Prod** → Deploy manual para produção

### 📊 Ambientes
- **Development** → Azure App Service (B1)
- **Staging** → Azure App Service (S1)
- **Production** → Azure App Service (P1V2)

---

Esta estrutura garante organização, escalabilidade e facilita a colaboração entre desenvolvedores!
