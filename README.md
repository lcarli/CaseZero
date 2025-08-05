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

### 3. Configure le backend

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

### 4. Configure le frontend

```bash
cd frontend

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

## 🚀 Scripts de Développement

Para facilitar o desenvolvimento, fornecemos várias opções para rodar frontend e backend simultaneamente:

### Opção 1: NPM Script (Recomendado)

```bash
# Na raiz do projeto
npm install  # Instala concurrently

# Roda frontend e backend juntos
npm run dev

# Outras opções úteis:
npm run install-all  # Instala todas as dependências
npm run build        # Build completo
npm run clean        # Limpa arquivos de build
```

### Opção 2: Script Bash (macOS/Linux)

```bash
# Na raiz do projeto
./scripts/development/start-dev.sh
```

### Opção 3: Makefile

```bash
# Ver comandos disponíveis
make help

# Rodar modo desenvolvimento
make dev

# Instalar dependências
make install
```

### Opção 4: PowerShell (Windows)

```powershell
# Na raiz do projeto
.\scripts\development\start-dev.ps1

# Com instalação de dependências
.\scripts\development\start-dev.ps1 -InstallDeps
```

### URLs de Desenvolvimento

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000  
- **Swagger UI**: http://localhost:5000/swagger
- **Logs**: `logs/backend.log` e `logs/frontend.log`

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

- 📖 [# Case Zero - Simulateur d'Enquête Policière

## 📋 Vue d'ensemble

Case Zero est une application web interactive de simulation d'enquêtes policières développée avec ASP.NET Core et React. Elle permet aux utilisateurs de jouer le rôle de détectives et de résoudre des affaires criminelles virtuelles.

## 🏗️ Architecture

### Backend (ASP.NET Core 8)
- **API REST** avec Entity Framework Core
- **Base de données** SQLite pour le développement
- **Authentification** JWT avec BCrypt pour le hash des mots de passe
- **Architecture en couches** : API, Core (Services/DTOs), Data (Entités/Context)

### Frontend (React 18 + TypeScript)
- **Interface utilisateur** moderne avec Tailwind CSS
- **Gestion d'état** avec Zustand pour l'authentification
- **Routing** avec React Router v6
- **API Client** avec Axios
- **Notifications** avec un système de toast personnalisé

## 🚀 Fonctionnalités

### ✅ Authentification
- Inscription et connexion sécurisées
- Gestion des rôles (Detective, Admin, Investigator)
- Stockage des tokens JWT
- Protection des routes

### ✅ Gestion des Affaires
- Affichage des affaires disponibles avec pagination
- Détails complets des affaires (description, difficulté, localisation)
- Affaires tutoriels pour les débutants
- Système de statuts (Ouvert, En cours, Résolu, Fermé, Archivé)

### ✅ Système d'Enquête
- Création de sessions d'investigation
- Suivi des progrès (étapes, pourcentage)
- Prise de notes pendant l'enquête
- Système de score et d'indices

### ✅ Gestion des Preuves
- Affichage des preuves liées à chaque affaire
- Catégorisation des preuves par type
- Géolocalisation des découvertes
- Statut de disponibilité des preuves

### ✅ Interface Utilisateur
- Design responsive avec Tailwind CSS
- Composants réutilisables (LoadingSpinner, Toast, Stats)
- Navigation intuitive entre les pages
- Feedback visuel pour les actions utilisateur

## 📁 Structure du Projet

```
CaseZero/
├── backend/
│   ├── CaseZero.Api/          # Contrôleurs et configuration API
│   ├── CaseZero.Core/         # Services, DTOs, logique métier
│   └── CaseZero.Data/         # Entités, DbContext, configurations
├── frontend/
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── pages/            # Pages principales de l'application
│   │   ├── services/         # Services API et utilitaires
│   │   ├── store/            # Gestion d'état Zustand
│   │   ├── styles/           # Styles CSS et Tailwind
│   │   └── types/            # Types TypeScript
│   ├── public/               # Assets statiques
│   └── package.json          # Dependencies npm
└── README.md
```

## 🛠️ Technologies Utilisées

### Backend
- **ASP.NET Core 8** - Framework web
- **Entity Framework Core** - ORM
- **SQLite** - Base de données
- **JWT Bearer** - Authentification
- **BCrypt.Net** - Hash des mots de passe
- **Swagger** - Documentation API

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router v6** - Routing côté client
- **Zustand** - Gestion d'état simple
- **Axios** - Client HTTP
- **React Query** - Cache et synchronisation des données

## 🚀 Installation et Configuration

### Prérequis
- .NET 8 SDK
- Node.js 18+
- npm ou yarn

### Backend
```bash
cd backend
dotnet restore
dotnet run --project CaseZero.Api --urls=http://localhost:5030
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5030
- **Swagger UI** : http://localhost:5030/swagger

## 🔧 Configuration

### Variables d'environnement
Le backend utilise les configurations suivantes dans `appsettings.json` :
- **ConnectionString** : Chaîne de connexion SQLite
- **JwtKey** : Clé secrète pour les tokens JWT
- **JwtIssuer** : Émetteur des tokens
- **JwtAudience** : Audience des tokens

### Utilisateur par défaut
Un compte administrateur est créé automatiquement :
- **Email** : admin@casezero.com
- **Mot de passe** : CaseZero123!

## 📋 Fonctionnalités à venir

### En développement
- [ ] Système de chat en temps réel pour les équipes
- [ ] Analyse forensique interactive des preuves
- [ ] Système de classement et leaderboard
- [ ] Mode multijoueur coopératif
- [ ] Intégration d'IA pour des indices dynamiques
- [ ] Système de rapports détaillés
- [ ] Support des langues multiples

### Améliorations prévues
- [ ] Mode hors ligne
- [ ] Application mobile (React Native)
- [ ] Système de notifications push
- [ ] Intégration avec des services externes
- [ ] API GraphQL
- [ ] Tests automatisés complets

## 🧪 Tests

### Tests Backend
```bash
cd backend
dotnet test
```

### Tests Frontend
```bash
cd frontend
npm test
```

## 📝 API Documentation

L'API est documentée avec Swagger et accessible à l'adresse `/swagger` du backend.

### Endpoints principaux
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/register` - Inscription utilisateur
- `GET /api/cases` - Liste des affaires
- `GET /api/cases/{id}` - Détails d'une affaire
- `GET /api/evidence/case/{caseId}` - Preuves d'une affaire
- `POST /api/sessions` - Créer une session d'enquête
- `PUT /api/sessions/{id}` - Mettre à jour une session

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub ou contacter l'équipe de développement.

---

**Case Zero** - Résoudre les mystères, un indice à la fois 🔍](docs/GDD.md)
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