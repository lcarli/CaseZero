# 🔍 Case Zero - Simulador de Investigação Digital

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Azure](https://img.shields.io/badge/Azure-Ready-blue)](https://azure.microsoft.com/)
[![.NET 8](https://img.shields.io/badge/.NET-8.0-purple)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)

> Um jogo investigativo realista onde você assume o papel de um detetive digital, resolvendo casos através da análise de evidências e dedução lógica.

## 🎯 Sobre o Projeto

Case Zero é um simulador de investigação policial que oferece uma experiência imersiva baseada em evidências reais. Sem interrogatórios diretos, toda informação é obtida através de arquivos digitais, laudos forenses, análises técnicas e reconstrução temporal dos eventos.

### ✨ Características Principais

- 🔍 **Investigação realista** - Baseada em procedimentos policiais reais
- 📁 **Evidências digitais** - PDFs, áudios, vídeos, fotos, dados GPS
- 🧪 **Análises forenses** - DNA, impressões digitais, química, balística
- ⏱️ **Timeline interativa** - Reconstrução cronológica dos eventos
- 🌐 **Multilíngue** - Suporte a PT, EN, FR, ES
- 📊 **Sistema de ranking** - Progressão de detetive rookie a capitão

## 🏗️ Arquitetura

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  Azure Static       │    │  Azure App Service  │    │  Azure SQL Database │
│  Web Apps           │◄──►│  (ASP.NET Core API) │◄──►│     PostgreSQL      │
│  (React Frontend)   │    │  + Authentication   │    │   Dados do jogo     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
         │                           │                           │
         │                  ┌─────────────────────┐              │
         └──────────────────►│ Azure Blob Storage  │◄─────────────┘
                            │ Arquivos/Evidências │
                            └─────────────────────┘
```

### 🛠️ Stack Tecnológica

**Backend:**
- ASP.NET Core 8 (C#)
- Entity Framework Core
- Azure SQL Database / PostgreSQL
- Azure Blob Storage
- JWT Authentication

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Query
- i18next (Internacionalização)

**DevOps:**
- Azure App Service
- Azure Static Web Apps
- GitHub Actions
- Docker

## 📁 Estrutura do Projeto

```
CaseZero/
├── 📁 backend/                    # ASP.NET Core Web API
│   ├── CaseZero.Api/             # Controllers e configuração
│   ├── CaseZero.Core/            # Lógica de negócio
│   ├── CaseZero.Infrastructure/  # Acesso a dados e Azure
│   └── CaseZero.Tests/           # Testes unitários
├── 📁 frontend/                   # React Application
│   ├── src/                      # Código fonte
│   ├── public/                   # Assets estáticos
│   └── tests/                    # Testes frontend
├── 📁 infrastructure/             # Bicep/ARM Templates
├── 📁 cases/                      # Dados dos casos
├── 📁 scripts/                    # Scripts utilitários
│   ├── database/                 # Scripts SQL
│   ├── deployment/               # Scripts de deploy
│   └── development/              # Scripts de desenvolvimento
├── 📁 docs/                       # Documentação
│   ├── api/                      # Documentação da API
│   ├── user-guide/               # Guia do usuário
│   └── development/              # Documentação técnica
└── 📄 README.md                   # Este arquivo
```

## 🚀 Quick Start

## 🚀 Como Executar

### 🎯 Setup Rápido
```bash
# Clone o repositório
git clone https://github.com/lucashumenhuk/CaseZero.git
cd CaseZero

# Execute o script de configuração
./scripts/development/setup-environment.sh
```

### Pré-requisitos
- .NET 8 SDK
- Node.js 18+
- SQL Server ou PostgreSQL
- Azure CLI (para deploy)
- Azure Developer CLI (azd) - opcional

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/case-zero.git
cd case-zero
```

### 2. Configure o banco de dados

```bash
# Execute o script SQL apropriado
# Para SQL Server/Azure SQL:
sqlcmd -S seu-servidor -d CaseZero -i scripts/database/database_schema.sql

# Para PostgreSQL:
psql -U postgres -d casezero -f scripts/database/database_schema_postgresql.sql
```

### 3. Configure o backend

```bash
cd backend/CaseZero.Api

# Instale as dependências
dotnet restore

# Configure a connection string em appsettings.json
# Execute as migrations
dotnet ef database update

# Execute a API
dotnet run
```

### 4. Configure o frontend

```bash
cd frontend

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### 5. Acesse a aplicação

- **Frontend:** http://localhost:5173
- **API:** http://localhost:5000
- **Swagger:** http://localhost:5000/swagger

## 🎮 Como Jogar

1. **Cadastre-se** ou faça login no sistema
2. **Escolha um caso** da lista disponível
3. **Analise as evidências** iniciais
4. **Solicite análises forenses** quando necessário
5. **Monte a timeline** dos eventos
6. **Faça anotações** e organize suas hipóteses
7. **Acuse o culpado** com a prova irrefutável

## 📚 Documentação

- 📖 [Game Design Document](docs/GDD.md)
- 🏗️ [Estrutura Técnica](docs/development/ESTRUTURA_AZURE_CSHARP.md)
- 🗄️ [Setup do Banco de Dados](docs/development/DATABASE_SETUP.md)
- 🔄 [Fluxos e Mecânicas](docs/Fluxos%20e%20Falhas.md)
- 📝 [Criação de Casos](docs/Novos%20Casos.md)

## 🚀 Deploy

### Azure (Recomendado)

1. **Configure os recursos Azure:**
```bash
# Deploy da infraestrutura
az deployment group create \
  --resource-group rg-casezero \
  --template-file infrastructure/main.bicep
```

2. **Deploy da aplicação:**
```bash
# Backend
cd backend
dotnet publish -c Release
# Deploy via Azure App Service

# Frontend
cd frontend
npm run build
# Deploy via Azure Static Web Apps
```

### Docker (Alternativo)

```bash
# Build e execute com Docker Compose
docker-compose up --build
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### 📝 Criando Novos Casos

Consulte o [Guia de Criação de Casos](docs/Novos%20Casos.md) para instruções detalhadas sobre como criar novos casos investigativos.

## 📊 Roadmap

- [ ] **v1.0** - MVP com caso tutorial
- [ ] **v1.1** - Sistema de ranking e estatísticas
- [ ] **v1.2** - Editor visual de casos
- [ ] **v1.3** - Modo multiplayer cooperativo
- [ ] **v1.4** - IA para gerar casos automaticamente
- [ ] **v2.0** - App mobile nativo

## 🐛 Issues Conhecidas

Consulte as [Issues no GitHub](https://github.com/seu-usuario/case-zero/issues) para bugs conhecidos e melhorias planejadas.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe

- **Desenvolvedor Principal** - [@lucashumenhuk](https://github.com/lucashumenhuk)
- **Consultor Frontend** - Seu amigo React expert 🚀

## 🙏 Agradecimentos

- Microsoft Azure por fornecer créditos para desenvolvimento
- Comunidade .NET e React por recursos e documentação
- Todos os beta testers e contribuidores

---

**⭐ Se você gostou do projeto, dê uma estrela no GitHub!**

Para suporte, abra uma [issue](https://github.com/seu-usuario/case-zero/issues) ou entre em contato via [email](mailto:contato@casezero.com)