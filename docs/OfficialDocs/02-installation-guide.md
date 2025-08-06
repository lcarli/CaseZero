# 📦 Guia de Instalação - CaseZero

## 📋 Visão Geral

Este guia fornece instruções detalhadas para instalar e configurar o CaseZero em seu ambiente local. O sistema é composto por um frontend React e um backend .NET Core, com suporte a banco de dados SQL Server ou PostgreSQL.

## 🛠️ Pré-requisitos

Antes de iniciar a instalação, certifique-se de ter os seguintes softwares instalados:

### 📦 Requisitos Obrigatórios

| Software | Versão Mínima | Versão Recomendada | Download |
|----------|---------------|-------------------|----------|
| **Node.js** | 18.0.0 | 20.x LTS | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.0.0 | 10.x | Incluído com Node.js |
| **.NET SDK** | 8.0 | 8.0.x | [dotnet.microsoft.com](https://dotnet.microsoft.com/download) |
| **Git** | 2.30.0 | Mais recente | [git-scm.com](https://git-scm.com/) |

### 🗄️ Banco de Dados (Escolha uma opção)

#### Opção 1: SQL Server (Recomendado para produção)

- **SQL Server Express** 2019 ou superior
- **SQL Server Management Studio** (SSMS) - opcional

#### Opção 2: PostgreSQL (Recomendado para desenvolvimento)

- **PostgreSQL** 15.x ou superior
- **pgAdmin** - opcional

#### Opção 3: Docker (Mais fácil para desenvolvimento)

- **Docker Desktop** 4.0 ou superior

### 🔧 Ferramentas Opcionais

| Ferramenta | Propósito | Download |
|------------|-----------|----------|
| **Visual Studio Code** | Editor recomendado | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Visual Studio 2022** | IDE completa para .NET | [visualstudio.microsoft.com](https://visualstudio.microsoft.com/) |
| **Postman** | Testes de API | [postman.com](https://www.postman.com/) |
| **Azure CLI** | Deploy e gerenciamento | [docs.microsoft.com/cli/azure](https://docs.microsoft.com/cli/azure/) |

## 📥 Clonando o Repositório

### 1. Clone o projeto

```bash
git clone https://github.com/lcarli/CaseZero.git
cd CaseZero
```

### 2. Verifique a estrutura do projeto

```bash
ls -la
```

Você deve ver uma estrutura similar a:

```text
CaseZero/
├── frontend/          # Aplicação React
├── backend/           # API .NET Core
├── cases/            # Casos de investigação
├── docs/             # Documentação
├── infrastructure/   # Scripts de deploy
├── package.json      # Configuração raiz
└── README.md
```

## 🗄️ Configuração do Banco de Dados

### Opção A: PostgreSQL com Docker (Recomendado)

#### 1. Inicie o PostgreSQL com Docker

```bash
# Criar e iniciar container PostgreSQL
docker run --name casezero-postgres \
  -e POSTGRES_PASSWORD=CaseZero123! \
  -e POSTGRES_USER=casezero \
  -e POSTGRES_DB=CaseZeroDb \
  -p 5432:5432 \
  -d postgres:15
```

#### 2. Verifique se o container está rodando

```bash
docker ps
```

#### 3. String de conexão PostgreSQL

```text
Host=localhost;Database=CaseZeroDb;Username=casezero;Password=CaseZero123!
```

### Opção B: SQL Server Local

#### 1. Instale o SQL Server Express

Baixe e instale o SQL Server Express do site oficial da Microsoft.

#### 2. Crie o banco de dados

```sql
CREATE DATABASE CaseZeroDb;
GO

CREATE LOGIN casezero WITH PASSWORD = 'CaseZero123!';
GO

USE CaseZeroDb;
CREATE USER casezero FOR LOGIN casezero;
ALTER ROLE db_owner ADD MEMBER casezero;
GO
```

#### 3. String de conexão SQL Server

```text
Server=(localdb)\\MSSQLLocalDB;Database=CaseZeroDb;Trusted_Connection=true;
```

### Opção C: SQL Server com Docker

#### 1. Inicie o SQL Server com Docker

```bash
# Criar e iniciar container SQL Server
docker run --name casezero-sqlserver \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=CaseZero123!" \
  -p 1433:1433 \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

#### 2. String de conexão SQL Server Docker

```text
Server=localhost,1433;Database=CaseZeroDb;User Id=sa;Password=CaseZero123!;TrustServerCertificate=true;
```

## 🎯 Configuração do Backend

### 1. Navegue para a pasta do backend

```bash
cd backend
```

### 2. Restaure os pacotes NuGet

```bash
dotnet restore
```

### 3. Configure as strings de conexão

Crie ou edite o arquivo `CaseZero.Api/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=CaseZeroDb;Username=casezero;Password=CaseZero123!",
    "SqlServerConnection": "Server=localhost,1433;Database=CaseZeroDb;User Id=sa;Password=CaseZero123!;TrustServerCertificate=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "JwtSettings": {
    "SecretKey": "CaseZero-Super-Secret-Key-For-Development-Only-2025",
    "Issuer": "CaseZero.Api",
    "Audience": "CaseZero.Client",
    "ExpiryInMinutes": 60
  },
  "AllowedHosts": "*",
  "CORS": {
    "AllowedOrigins": [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://localhost:5173"
    ]
  }
}
```

### 4. Execute as migrações do banco de dados

```bash
# Navegue para o projeto principal
cd CaseZero.Api

# Execute as migrações
dotnet ef database update

# Se não tiver o EF Tools instalado globalmente
dotnet tool install --global dotnet-ef
dotnet ef database update
```

### 5. Verifique a configuração

```bash
# Build do projeto
dotnet build

# Execute os testes (opcional)
cd ../CaseZero.Tests
dotnet test
```

## 🎨 Configuração do Frontend

### 1. Navegue para a pasta do frontend

```bash
cd ../../frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `.env.local`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5029
VITE_API_TIMEOUT=30000

# Environment
VITE_NODE_ENV=development

# Debug (opcional)
VITE_DEBUG=true
VITE_LOG_LEVEL=debug

# Features flags (opcional)
VITE_ENABLE_MOCK_DATA=false
VITE_ENABLE_DEV_TOOLS=true
```

### 4. Verifique a configuração

```bash
# Build do projeto
npm run build

# Execute os testes (opcional)
npm run test
```

## 🚀 Executando o Sistema

### 1. Inicie o Backend

```bash
# Em um terminal, navegue para o backend
cd backend/CaseZero.Api

# Execute o servidor de desenvolvimento
dotnet run

# Ou use watch para recarregamento automático
dotnet watch run
```

O backend estará disponível em:

- **API**: `http://localhost:5029`
- **Swagger**: `http://localhost:5029/swagger`

### 2. Inicie o Frontend

```bash
# Em outro terminal, navegue para o frontend
cd frontend

# Execute o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em:

- **Aplicação**: `http://localhost:5173`

### 3. Usando o Docker Compose (Alternativa)

Se preferir usar Docker para tudo:

```bash
# Na raiz do projeto
docker-compose up -d

# Para ver os logs
docker-compose logs -f

# Para parar
docker-compose down
```

## ✅ Verificação da Instalação

### 1. Teste o Backend

#### Verificar saúde da API

```bash
curl http://localhost:5029/health
```

#### Fazer login (usando curl)

```bash
curl -X POST http://localhost:5029/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@casezero.com",
    "password": "CaseZero123!"
  }'
```

### 2. Teste o Frontend

1. Abra `http://localhost:5173` no navegador
2. Você deve ver a tela de login do CaseZero
3. Faça login com:
   - **Email**: `admin@casezero.com`
   - **Senha**: `CaseZero123!`

### 3. Teste a Integração

1. Após o login, você deve ver o dashboard policial
2. Verifique se o relógio do sistema está funcionando
3. Tente acessar a seção de casos

## 🔧 Dados de Exemplo

### 1. Usuários Padrão

O sistema vem com usuários pré-configurados:

| Email | Senha | Role | Departamento |
|-------|--------|------|--------------|
| `admin@casezero.com` | `CaseZero123!` | Administrator | Administration |
| `detective@casezero.com` | `CaseZero123!` | Detective | Investigation |
| `forensics@casezero.com` | `CaseZero123!` | Forensics | Forensics Lab |

### 2. Casos de Exemplo

O sistema inclui casos de exemplo na pasta `cases/`:

- **Vol de Tableau**: Caso introdutório sobre roubo em museu

## 🛠️ Comandos Úteis

### Backend (.NET)

```bash
# Restaurar dependências
dotnet restore

# Build
dotnet build

# Executar
dotnet run

# Executar com watch
dotnet watch run

# Testes
dotnet test

# Migrations
dotnet ef migrations add <NomeMigration>
dotnet ef database update

# Limpar build
dotnet clean
```

### Frontend (React)

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Testes
npm run test

# Lint
npm run lint

# Type check
npm run type-check
```

### Docker

```bash
# Build da imagem
docker build -t casezero .

# Executar container
docker run -p 5173:5173 casezero

# Docker Compose
docker-compose up -d
docker-compose down
docker-compose logs -f
```

## 🔍 Solução de Problemas Comuns

### Problema: Erro de conexão com banco

**Sintomas**: Erro ao executar migrações ou conectar com o banco

**Soluções**:

1. Verifique se o banco está rodando: `docker ps`
2. Teste a conexão: `telnet localhost 5432` (PostgreSQL)
3. Verifique as credenciais no `appsettings.json`
4. Reinicie o container: `docker restart casezero-postgres`

### Problema: Porta já em uso

**Sintomas**: `EADDRINUSE: address already in use :::5173`

**Soluções**:

1. Matar processo: `lsof -ti:5173 | xargs kill -9`
2. Usar porta diferente: `npm run dev -- --port 3000`
3. Verificar processos: `netstat -tulpn | grep :5173`

### Problema: Erro de CORS

**Sintomas**: Erro de CORS no navegador

**Soluções**:

1. Verifique o `appsettings.Development.json`
2. Confirme que o frontend está em `http://localhost:5173`
3. Reinicie o backend após mudanças

### Problema: Pacotes desatualizados

**Sintomas**: Vulnerabilidades ou erros de dependências

**Soluções**:

```bash
# Frontend
npm audit fix
npm update

# Backend
dotnet list package --outdated
dotnet add package <PackageName>
```

## 📚 Próximos Passos

Após a instalação bem-sucedida:

1. [**Configuração de Desenvolvimento**](./03-development-setup.md) - Setup para desenvolvedores
2. [**Sistema Policial**](./04-police-system.md) - Entendendo a interface
3. [**Documentação da API**](./13-api-documentation.md) - Endpoints disponíveis
4. [**Manual do Investigador**](./25-investigator-manual.md) - Como usar o sistema

## 📞 Suporte

Se encontrar problemas durante a instalação:

1. Verifique a [seção de problemas comuns](#-solução-de-problemas-comuns)
2. Consulte o [FAQ](./29-faq.md)
3. Abra uma issue no repositório GitHub
4. Entre em contato com a equipe de desenvolvimento

---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
