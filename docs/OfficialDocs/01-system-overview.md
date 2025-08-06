# 🏗️ Visão Geral do Sistema - CaseZero

## 📋 Introdução

O CaseZero é um sistema de investigação policial interativo desenvolvido para treinamento e simulação de casos criminais. O projeto foi construído com uma arquitetura moderna e escalável, utilizando as melhores práticas de desenvolvimento para criar uma experiência realista e educativa para investigadores.

## 🎯 Objetivos do Sistema

### 🚀 Principais Funcionalidades

- **Simulação Realista**: Casos criminais complexos com evidências, suspeitos e pistas
- **Análise Forense**: Sistema de laboratórios com tempo e custos realistas
- **Gestão de Tempo**: Relógio do jogo com aceleração controlada
- **Interface Policial**: Dashboard profissional com módulos especializados
- **Autenticação Segura**: Sistema de login com diferentes níveis de acesso

### 🎓 Objetivos Educacionais

- Treinar habilidades de investigação
- Ensinar procedimentos policiais corretos
- Desenvolver pensamento analítico
- Praticar tomada de decisões sob pressão
- Simular trabalho em equipe

## 🏛️ Arquitetura do Sistema

### 📊 Visão Geral da Arquitetura

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Banco de      │
│   (React)       │◄──►│   (.NET Core)   │◄──►│    Dados        │
│                 │    │                 │    │ (SQL Server)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   Autenticação  │              │
         └──────────────►│     (JWT)       │◄─────────────┘
                        └─────────────────┘
```

### 🔧 Componentes Principais

#### Frontend (Cliente)

- **Tecnologia**: React 18 + TypeScript + Vite
- **Responsabilidades**:
  - Interface de usuário responsiva
  - Gerenciamento de estado da aplicação
  - Comunicação com APIs
  - Experiência do usuário (UX/UI)

#### Backend (Servidor)

- **Tecnologia**: .NET Core 8 + Entity Framework
- **Responsabilidades**:
  - Lógica de negócio
  - APIs RESTful
  - Autenticação e autorização
  - Gerenciamento de dados

#### Banco de Dados

- **Tecnologia**: SQL Server (Produção) / PostgreSQL (Desenvolvimento)
- **Responsabilidades**:
  - Armazenamento persistente
  - Integridade dos dados
  - Performance de consultas

## 🛠️ Stack Tecnológico

### 📱 Frontend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.x | Framework principal para UI |
| TypeScript | 5.x | Tipagem estática e melhor DX |
| Vite | 5.x | Build tool e dev server |
| React Router | 6.x | Roteamento SPA |
| Axios | 1.x | Cliente HTTP para APIs |
| Styled Components | 6.x | CSS-in-JS para estilização |
| React Hook Form | 7.x | Gerenciamento de formulários |

### 🖥️ Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| .NET Core | 8.0 | Framework backend principal |
| Entity Framework Core | 8.x | ORM para banco de dados |
| AutoMapper | 12.x | Mapeamento de objetos |
| FluentValidation | 11.x | Validação de dados |
| JWT Bearer | 7.x | Autenticação baseada em tokens |
| Swagger/OpenAPI | 6.x | Documentação da API |
| Serilog | 3.x | Sistema de logging |

### 🗄️ Banco de Dados

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| SQL Server | 2022 | Banco principal (produção) |
| PostgreSQL | 15.x | Banco alternativo (desenvolvimento) |
| Entity Framework Migrations | 8.x | Controle de versão do schema |

### ☁️ Infraestrutura e Deploy

| Tecnologia | Propósito |
|------------|-----------|
| Azure Container Apps | Hospedagem da aplicação |
| Azure SQL Database | Banco de dados gerenciado |
| Azure Key Vault | Gerenciamento de secrets |
| GitHub Actions | CI/CD pipeline |
| Docker | Containerização |

## 📁 Estrutura do Projeto

### 🗂️ Organização dos Diretórios

```text
CaseZero/
├── 📁 frontend/                 # Aplicação React
│   ├── 📁 src/
│   │   ├── 📁 components/       # Componentes reutilizáveis
│   │   ├── 📁 pages/           # Páginas da aplicação
│   │   ├── 📁 hooks/           # Custom hooks
│   │   ├── 📁 services/        # Serviços e APIs
│   │   ├── 📁 types/           # Definições TypeScript
│   │   ├── 📁 utils/           # Utilitários
│   │   └── 📁 styles/          # Estilos globais
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   └── 📄 tsconfig.json
│
├── 📁 backend/                  # API .NET Core
│   ├── 📁 CaseZero.Api/        # Projeto principal da API
│   ├── 📁 CaseZero.Core/       # Lógica de negócio
│   ├── 📁 CaseZero.Data/       # Acesso a dados
│   ├── 📁 CaseZero.Tests/      # Testes unitários
│   └── 📄 CaseZero.sln
│
├── 📁 cases/                    # Casos de investigação
│   ├── 📁 vol_tableau_musee/   # Caso exemplo
│   └── 📄 README.md
│
├── 📁 docs/                     # Documentação
│   ├── 📁 OfficialDocs/        # Documentação oficial
│   ├── 📁 api/                 # Documentação da API
│   └── 📁 user-guide/          # Guia do usuário
│
├── 📁 infrastructure/           # Scripts de infraestrutura
│   ├── 📁 bicep/               # Templates Azure Bicep
│   └── 📁 docker/              # Configurações Docker
│
├── 📄 azure.yaml               # Configuração Azure Developer CLI
├── 📄 docker-compose.yml       # Configuração local
└── 📄 README.md               # Documentação principal
```

## 🔄 Fluxo de Dados

### 📊 Arquitetura de Camadas

```text
┌─────────────────────────────────────────────────────────┐
│                     Camada de Apresentação             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Components  │  │    Pages    │  │   Hooks     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                    Camada de Serviços                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ API Client  │  │ Auth Service│  │ Utils       │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP/HTTPS
┌─────────────────────────────────────────────────────────┐
│                     Camada de API                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Controllers │  │ Middleware  │  │ Auth        │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  Camada de Negócio                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Services   │  │ Validators  │  │   DTOs      │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  Camada de Dados                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Repositories│  │ Entity Framework │ Migrations │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                    Banco de Dados                      │
│              SQL Server / PostgreSQL                   │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Segurança

### 🛡️ Medidas de Segurança Implementadas

#### Autenticação

- **JWT Tokens**: Tokens seguros com expiração
- **Refresh Tokens**: Renovação automática de sessões
- **Hash de Senhas**: BCrypt para senhas seguras
- **Validação de Token**: Middleware de autenticação

#### Autorização

- **Role-Based Access Control (RBAC)**: Controle baseado em funções
- **Claims-Based Authorization**: Autorização granular
- **API Protection**: Endpoints protegidos por roles

#### Proteção de Dados

- **Validação de Input**: FluentValidation para dados de entrada
- **SQL Injection Protection**: Entity Framework Core ORM
- **XSS Protection**: Sanitização de dados
- **HTTPS Only**: Comunicação criptografada

## 🎮 Módulos Principais

### 🏛️ Sistema Policial

- **Dashboard Principal**: Visão geral dos casos ativos
- **Gerenciamento de Casos**: CRUD completo de investigações
- **Sistema de Tempo**: Relógio acelerado com controles
- **Análise de Evidências**: Interface para laboratórios forenses

### 👤 Gestão de Usuários

- **Autenticação**: Login seguro com JWT
- **Perfis**: Investigadores, Administradores, Supervisores
- **Departamentos**: Organização por especialidades
- **Permissões**: Controle granular de acesso

### 📊 Sistema de Casos

- **Estrutura de Casos**: JSON configurável
- **Evidências**: Upload e categorização
- **Suspeitos**: Perfis e relacionamentos
- **Timeline**: Cronologia dos eventos

### 🔬 Laboratórios Forenses

- **Análise Digital**: Vídeos, áudios, dispositivos
- **Análise Física**: Impressões digitais, DNA, balística
- **Custos e Tempo**: Simulação realista de recursos
- **Resultados**: Relatórios detalhados

## 📈 Performance e Escalabilidade

### ⚡ Otimizações Implementadas

#### Frontend

- **Code Splitting**: Carregamento lazy de componentes
- **Memoização**: React.memo e useMemo para performance
- **Bundle Optimization**: Vite para builds otimizados
- **Caching**: Service Workers para cache inteligente

#### Backend

- **Entity Framework Optimization**: Consultas eficientes
- **Caching**: Redis para dados frequentes
- **Async/Await**: Operações não-bloqueantes
- **Connection Pooling**: Gerenciamento eficiente de conexões

#### Infraestrutura

- **Container Apps**: Auto-scaling baseado em demanda
- **CDN**: Azure CDN para assets estáticos
- **Load Balancing**: Distribuição de carga automática
- **Monitoring**: Application Insights para observabilidade

## 🧪 Testes e Qualidade

### 🔍 Estratégia de Testes

- **Testes Unitários**: Backend com xUnit
- **Testes de Integração**: APIs e banco de dados
- **Testes E2E**: Cypress para frontend
- **Testes de Performance**: Carga e stress testing

### 📏 Métricas de Qualidade

- **Code Coverage**: Mínimo 80% para backend
- **Code Quality**: SonarQube para análise estática
- **Security Scanning**: Verificação de vulnerabilidades
- **Dependency Scanning**: Atualização automática de dependências

## 📚 Próximos Passos

Para entender melhor o sistema, recomendamos a leitura sequencial dos seguintes documentos:

1. [**Guia de Instalação**](./02-installation-guide.md) - Como configurar o ambiente
2. [**Configuração de Desenvolvimento**](./03-development-setup.md) - Setup para desenvolvedores
3. [**Sistema Policial**](./04-police-system.md) - Interface e módulos principais
4. [**Documentação da API**](./13-api-documentation.md) - Endpoints e integração

---


[**Retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
