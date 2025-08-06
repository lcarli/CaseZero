# 🛠️ Configuração de Desenvolvimento - CaseZero

## 📋 Visão Geral

Este documento fornece um guia completo para configurar um ambiente de desenvolvimento profissional para o CaseZero. Aqui você encontrará ferramentas recomendadas, configurações avançadas, boas práticas e workflows para contribuir efetivamente com o projeto.

## 🎯 Pré-requisitos

Antes de prosseguir, certifique-se de ter concluído o [Guia de Instalação](./02-installation-guide.md) básico.

## 🔧 Ferramentas de Desenvolvimento

### 📝 Editores e IDEs Recomendados

#### Visual Studio Code (Recomendado para Frontend)

**Extensions essenciais**:

| Extension | Propósito | Publisher |
|-----------|-----------|-----------|
| **TypeScript Importer** | Auto-import TypeScript | pmneo |
| **ES7+ React/Redux/React-Native snippets** | Snippets React | dsznajder |
| **Auto Rename Tag** | Renomear tags HTML automaticamente | Jun Han |
| **Bracket Pair Colorizer 2** | Colorir pares de brackets | CoenraadS |
| **GitLens** | Git avançado integrado | GitKraken |
| **Thunder Client** | Cliente REST integrado | RangaVadhineni |
| **Error Lens** | Mostrar erros inline | Alexander |
| **Prettier** | Formatação de código | Prettier |
| **ESLint** | Linting JavaScript/TypeScript | Microsoft |

**Configuração do VS Code** (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.quoteStyle": "single",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.json": "jsonc"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true
  }
}
```

#### Visual Studio 2022 (Recomendado para Backend)

**Workloads necessárias**:

- ASP.NET and web development
- .NET desktop development
- Data storage and processing

**Extensions recomendadas**:

- **ReSharper** (pago) ou **ReSharper Community**
- **CodeMaid** - Limpeza automática de código
- **SonarLint** - Análise de qualidade de código
- **Productivity Power Tools**

### 🧰 Ferramentas de Linha de Comando

#### Git Configuration

```bash
# Configuração global do Git
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"

# Configurações úteis
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global core.autocrlf input  # Linux/Mac
git config --global core.autocrlf true   # Windows

# Aliases úteis
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

#### Node.js Tools Globais

```bash
# Ferramentas essenciais
npm install -g @typescript-eslint/parser
npm install -g prettier
npm install -g typescript
npm install -g @vitejs/plugin-react
npm install -g concurrently

# Ferramentas de análise
npm install -g dependency-cruiser
npm install -g madge
npm install -g npm-check-updates
```

#### .NET Tools Globais

```bash
# Entity Framework
dotnet tool install --global dotnet-ef

# Ferramentas de desenvolvimento
dotnet tool install --global dotnet-outdated-tool
dotnet tool install --global dotnet-format
dotnet tool install --global dotnet-reportgenerator-globaltool

# Ferramentas de teste
dotnet tool install --global coverlet.console
dotnet tool install --global dotnet-stryker
```

## 📁 Estrutura de Desenvolvimento

### 🗂️ Organização do Workspace

```text
CaseZero/
├── 📁 .vscode/                 # Configurações VS Code
│   ├── 📄 settings.json        # Configurações do projeto
│   ├── 📄 launch.json          # Configurações de debug
│   ├── 📄 tasks.json           # Tasks automatizadas
│   └── 📄 extensions.json      # Extensions recomendadas
│
├── 📁 .github/                 # GitHub Actions e templates
│   ├── 📁 workflows/           # CI/CD pipelines
│   ├── 📄 ISSUE_TEMPLATE.md    # Template para issues
│   └── 📄 PULL_REQUEST_TEMPLATE.md
│
├── 📁 scripts/                 # Scripts de automação
│   ├── 📄 setup-dev.sh         # Setup inicial
│   ├── 📄 run-tests.sh         # Executar todos os testes
│   └── 📄 deploy-local.sh      # Deploy local
│
└── 📄 .editorconfig            # Configuração de editor
```

### ⚙️ Arquivos de Configuração

#### `.editorconfig`

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{cs,csx}]
indent_size = 4

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_size = 2
```

#### Frontend: `.eslintrc.json`

```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "prefer-const": "error",
    "no-var": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

#### Frontend: `.prettierrc`

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

#### Backend: `.editorconfig` específico

```ini
[*.cs]
# Organize usings
dotnet_sort_system_directives_first = true
dotnet_separate_import_directive_groups = false

# Code style rules
dotnet_style_qualification_for_field = false:suggestion
dotnet_style_qualification_for_property = false:suggestion
dotnet_style_qualification_for_method = false:suggestion
dotnet_style_qualification_for_event = false:suggestion

# Naming conventions
dotnet_naming_rule.interface_should_be_prefixed_with_i.severity = warning
dotnet_naming_rule.interface_should_be_prefixed_with_i.symbols = interface
dotnet_naming_rule.interface_should_be_prefixed_with_i.style = prefix_interface_with_i

dotnet_naming_symbols.interface.applicable_kinds = interface
dotnet_naming_style.prefix_interface_with_i.required_prefix = I
dotnet_naming_style.prefix_interface_with_i.capitalization = pascal_case
```

## 🔄 Workflow de Desenvolvimento

### 🌟 Padrão Git Flow

#### Branches principais

- **main**: Código em produção
- **develop**: Desenvolvimento ativo
- **feature/\***: Novas funcionalidades
- **hotfix/\***: Correções urgentes
- **release/\***: Preparação para release

#### Fluxo de trabalho

```bash
# 1. Criar feature branch
git checkout develop
git pull origin develop
git checkout -b feature/nome-da-feature

# 2. Desenvolver e commitar
git add .
git commit -m "feat: adicionar nova funcionalidade"

# 3. Push e criar Pull Request
git push origin feature/nome-da-feature

# 4. Após aprovação, merge para develop
git checkout develop
git pull origin develop
git merge feature/nome-da-feature
git push origin develop

# 5. Limpar branch local
git branch -d feature/nome-da-feature
```

### 📝 Conventional Commits

Padrão para mensagens de commit:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types**:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Formatação (não afeta lógica)
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

**Exemplos**:

```bash
feat(auth): adicionar autenticação JWT
fix(api): corrigir erro de validação no endpoint de casos
docs(readme): atualizar instruções de instalação
style(frontend): formatar componentes com prettier
refactor(backend): extrair lógica de negócio para services
test(api): adicionar testes para controller de evidências
chore(deps): atualizar dependências do projeto
```

## 🧪 Configuração de Testes

### Frontend (React Testing Library + Vitest)

#### `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.ts',
        'dist/',
      ],
    },
  },
});
```

#### `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// Estabelecer API mocking antes de todos os testes
beforeAll(() => server.listen());

// Reset handlers após cada teste
afterEach(() => server.resetHandlers());

// Limpar após todos os testes
afterAll(() => server.close());

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

### Backend (xUnit + FluentAssertions)

#### Estrutura de testes

```text
CaseZero.Tests/
├── 📁 Unit/                    # Testes unitários
│   ├── 📁 Controllers/         # Testes de controllers
│   ├── 📁 Services/            # Testes de services
│   └── 📁 Validators/          # Testes de validators
│
├── 📁 Integration/             # Testes de integração
│   ├── 📁 Api/                 # Testes de endpoints
│   └── 📁 Database/            # Testes de repositórios
│
├── 📁 Fixtures/                # Dados de teste
└── 📁 Helpers/                 # Utilitários de teste
```

#### `CaseZero.Tests.csproj`

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.8.0" />
    <PackageReference Include="xunit" Version="2.6.1" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.5.3" />
    <PackageReference Include="FluentAssertions" Version="6.12.0" />
    <PackageReference Include="Microsoft.AspNetCore.Mvc.Testing" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="8.0.0" />
    <PackageReference Include="AutoFixture" Version="4.18.0" />
    <PackageReference Include="Moq" Version="4.20.69" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\CaseZero.Api\CaseZero.Api.csproj" />
    <ProjectReference Include="..\CaseZero.Core\CaseZero.Core.csproj" />
    <ProjectReference Include="..\CaseZero.Data\CaseZero.Data.csproj" />
  </ItemGroup>
</Project>
```

## 🚀 Scripts de Automação

### 📄 `package.json` (Root Level)

```json
{
  "name": "casezero",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend/CaseZero.Api && dotnet watch run",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && dotnet build",
    "test": "npm run test:frontend && npm run test:backend",
    "test:frontend": "cd frontend && npm run test",
    "test:backend": "cd backend && dotnet test",
    "test:watch": "concurrently \"npm run test:frontend:watch\" \"npm run test:backend:watch\"",
    "test:frontend:watch": "cd frontend && npm run test:watch",
    "test:backend:watch": "cd backend && dotnet watch test",
    "lint": "npm run lint:frontend && npm run lint:backend",
    "lint:frontend": "cd frontend && npm run lint",
    "lint:backend": "cd backend && dotnet format --verify-no-changes",
    "lint:fix": "npm run lint:frontend:fix && npm run lint:backend:fix",
    "lint:frontend:fix": "cd frontend && npm run lint:fix",
    "lint:backend:fix": "cd backend && dotnet format",
    "clean": "npm run clean:frontend && npm run clean:backend",
    "clean:frontend": "cd frontend && rm -rf dist node_modules",
    "clean:backend": "cd backend && dotnet clean",
    "reset": "npm run clean && npm install && cd frontend && npm install"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

### 🔧 Scripts de Shell

#### `scripts/setup-dev.sh`

```bash
#!/bin/bash

echo "🚀 Configurando ambiente de desenvolvimento CaseZero..."

# Verificar pré-requisitos
echo "📋 Verificando pré-requisitos..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK não encontrado. Instale .NET 8+ primeiro."
    exit 1
fi

echo "✅ Pré-requisitos atendidos!"

# Instalar dependências
echo "📦 Instalando dependências..."

# Frontend
echo "📦 Frontend..."
cd frontend
npm install
cd ..

# Backend
echo "📦 Backend..."
cd backend
dotnet restore
dotnet tool restore
cd ..

# Configurar banco de dados
echo "🗄️ Configurando banco de dados..."
cd backend/CaseZero.Api
dotnet ef database update
cd ../..

echo "✅ Ambiente configurado com sucesso!"
echo "🚀 Execute 'npm run dev' para iniciar o desenvolvimento"
```

#### `scripts/run-tests.sh`

```bash
#!/bin/bash

echo "🧪 Executando todos os testes..."

# Frontend tests
echo "🎨 Testes do Frontend..."
cd frontend
npm run test:coverage
cd ..

# Backend tests
echo "🖥️ Testes do Backend..."
cd backend
dotnet test --collect:"XPlat Code Coverage" --results-directory ./TestResults
cd ..

echo "📊 Gerando relatório de cobertura..."
cd backend
reportgenerator -reports:"./TestResults/*/coverage.cobertura.xml" -targetdir:"./TestResults/CoverageReport" -reporttypes:Html
cd ..

echo "✅ Testes concluídos!"
echo "📊 Relatórios disponíveis em:"
echo "   Frontend: frontend/coverage/index.html"
echo "   Backend: backend/TestResults/CoverageReport/index.html"
```

## 🔍 Debugging

### Frontend (VS Code)

#### `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Frontend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/vite",
      "args": ["--mode", "development"],
      "cwd": "${workspaceFolder}/frontend",
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "name": "Debug Frontend Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/vitest",
      "args": ["--run"],
      "cwd": "${workspaceFolder}/frontend",
      "console": "integratedTerminal"
    }
  ]
}
```

### Backend (Visual Studio / VS Code)

#### `.vscode/launch.json` (Backend)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend API",
      "type": "coreclr",
      "request": "launch",
      "program": "${workspaceFolder}/backend/CaseZero.Api/bin/Debug/net8.0/CaseZero.Api.dll",
      "args": [],
      "cwd": "${workspaceFolder}/backend/CaseZero.Api",
      "console": "internalConsole",
      "stopAtEntry": false,
      "env": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "sourceFileMap": {
        "/Views": "${workspaceFolder}/Views"
      }
    },
    {
      "name": "Debug Backend Tests",
      "type": "coreclr",
      "request": "launch",
      "program": "dotnet",
      "args": ["test", "--logger", "console;verbosity=detailed"],
      "cwd": "${workspaceFolder}/backend",
      "console": "internalConsole",
      "stopAtEntry": false
    }
  ]
}
```

## 📊 Métricas e Qualidade

### Ferramentas de Análise

#### SonarQube (Recomendado)

```bash
# Instalar SonarScanner
dotnet tool install --global dotnet-sonarscanner

# Executar análise
dotnet sonarscanner begin /k:"CaseZero" /d:sonar.host.url="http://localhost:9000" /d:sonar.login="your-token"
dotnet build
dotnet test --collect:"XPlat Code Coverage"
dotnet sonarscanner end /d:sonar.login="your-token"
```

#### Code Coverage

```bash
# Frontend
cd frontend
npm run test:coverage

# Backend
cd backend
dotnet test --collect:"XPlat Code Coverage"
reportgenerator -reports:"./TestResults/*/coverage.cobertura.xml" -targetdir:"./CoverageReport" -reporttypes:Html
```

### Metas de Qualidade

| Métrica | Meta | Ferramenta |
|---------|------|-----------|
| **Code Coverage** | > 80% | Coverlet / Vitest |
| **Technical Debt** | < 5% | SonarQube |
| **Bugs** | 0 | SonarQube |
| **Security Hotspots** | 0 | SonarQube |
| **Duplicação** | < 3% | SonarQube |

## 🔒 Segurança no Desenvolvimento

### Secrets Management

#### `.env.example`

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/casezero_dev

# JWT
JWT_SECRET=your-jwt-secret-key-for-development
JWT_EXPIRES_IN=1h

# APIs externas
EXTERNAL_API_KEY=your-api-key

# Debug
DEBUG=true
LOG_LEVEL=debug
```

#### `.gitignore` essencial

```gitignore
# Environment files
.env
.env.local
.env.development
.env.production

# Dependencies
node_modules/
*/node_modules/

# Build outputs
dist/
build/
*/dist/
*/build/

# .NET
bin/
obj/
*.user
*.suo

# IDE
.vscode/settings.json
.vs/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Database
*.db
*.sqlite

# Test coverage
coverage/
TestResults/
```

## 📚 Documentação Durante Desenvolvimento

### JSDoc (Frontend)

```typescript
/**
 * Hook para gerenciar o estado do sistema policial
 * @returns Objeto com estado e funções de controle
 * @example
 * ```typescript
 * const { currentCase, isAnalyzing, startAnalysis } = usePoliceSystem();
 * ```
 */
export const usePoliceSystem = () => {
  // implementação
};
```

### XML Documentation (Backend)

```csharp
/// <summary>
/// Serviço responsável por gerenciar casos de investigação
/// </summary>
/// <example>
/// <code>
/// var caseService = new CaseService(repository, mapper);
/// var newCase = await caseService.CreateCaseAsync(createDto);
/// </code>
/// </example>
public class CaseService : ICaseService
{
    /// <summary>
    /// Cria um novo caso de investigação
    /// </summary>
    /// <param name="createDto">Dados para criação do caso</param>
    /// <returns>Caso criado com ID gerado</returns>
    /// <exception cref="ValidationException">Quando os dados são inválidos</exception>
    public async Task<CaseDto> CreateCaseAsync(CreateCaseDto createDto)
    {
        // implementação
    }
}
```

## 🚀 Performance no Desenvolvimento

### Hot Reload Configuration

#### Frontend (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: false,
    },
  },
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
```

#### Backend (`Properties/launchSettings.json`)

```json
{
  "profiles": {
    "CaseZero.Api": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5029",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "hotReloadEnabled": true
    }
  }
}
```

## 📋 Checklist de Setup

### ✅ Configuração Inicial

- [ ] Node.js 18+ instalado
- [ ] .NET 8 SDK instalado
- [ ] Git configurado
- [ ] Editor/IDE configurado
- [ ] Extensions instaladas

### ✅ Projeto

- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Banco de dados configurado
- [ ] Migrações executadas
- [ ] Testes passando

### ✅ Desenvolvimento

- [ ] Debugging funcionando
- [ ] Hot reload ativo
- [ ] Linting configurado
- [ ] Scripts de automação testados
- [ ] Coverage reports funcionando

### ✅ Qualidade

- [ ] Pre-commit hooks configurados
- [ ] CI/CD pipeline entendido
- [ ] Padrões de código seguidos
- [ ] Documentação atualizada

## 📞 Próximos Passos

Após configurar seu ambiente de desenvolvimento:

1. [**Sistema Policial**](./04-police-system.md) - Entenda a arquitetura da interface
2. [**Documentação da API**](./13-api-documentation.md) - Explore os endpoints disponíveis
3. [**Testes Unitários**](./22-unit-testing.md) - Aprenda sobre estratégias de teste
4. [**Qualidade de Código**](./24-code-quality.md) - Padrões e métricas

## 🆘 Suporte

Se tiver problemas com a configuração:

1. Verifique os [Problemas Comuns](./28-common-issues.md)
2. Consulte o [FAQ](./29-faq.md)
3. Abra uma issue no GitHub
4. Entre em contato com a equipe

---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
