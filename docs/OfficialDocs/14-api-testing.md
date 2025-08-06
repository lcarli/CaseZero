# 🧪 Testes da API - CaseZero

Este documento abrange estratégias, ferramentas e implementações para testes abrangentes da API REST do CaseZero.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estratégia de Testes](#estratégia-de-testes)
- [Ambiente de Testes](#ambiente-de-testes)
- [Testes Unitários](#testes-unitários)
- [Testes de Integração](#testes-de-integração)
- [Testes End-to-End](#testes-end-to-end)
- [Testes de Performance](#testes-de-performance)
- [Testes de Segurança](#testes-de-segurança)
- [Automação e CI/CD](#automação-e-cicd)
- [Arquivos .http](#arquivos-http)

## 🎯 Visão Geral

A estratégia de testes do CaseZero garante qualidade, confiabilidade e segurança da API através de múltiplas camadas de validação.

### Pirâmide de Testes

```text
┌─────────────────────────────────────────────────────────┐
│ 🔺 PIRÂMIDE DE TESTES                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    🎯 E2E                               │
│                 ┌─────────┐                             │
│                 │   5%    │ - Cenários completos        │
│                 │ Manual  │ - Jornada do usuário        │
│                 └─────────┘ - Validação final           │
│                                                         │
│               🔗 INTEGRAÇÃO                             │
│            ┌─────────────────┐                          │
│            │      25%        │ - APIs + Banco           │
│            │   Automatizado  │ - Fluxos de negócio      │
│            └─────────────────┘ - Contratos              │
│                                                         │
│           🧱 UNITÁRIOS                                   │
│      ┌───────────────────────────┐                      │
│      │          70%              │ - Funções isoladas   │
│      │       Automatizado        │ - Lógica de negócio  │
│      └───────────────────────────┘ - Cobertura alta     │
│                                                         │
│ 📊 COBERTURA ESPERADA:                                 │
│ ├── Unitários: 90%+                                    │
│ ├── Integração: 80%+                                   │
│ ├── E2E: Cenários críticos                             │
│ └── Performance: Principais endpoints                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Tipos de Testes Implementados

- **Funcionais**: Validação de requisitos e comportamento
- **Não-funcionais**: Performance, segurança, usabilidade
- **Regressão**: Garantia de funcionalidades existentes
- **Exploratórios**: Descoberta de cenários não mapeados
- **Smoke**: Validação básica após deployments

## 📋 Estratégia de Testes

### Matriz de Cobertura

```text
┌─────────────────────────────────────────────────────────┐
│ 📊 MATRIZ DE COBERTURA DE TESTES                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Camada              │ Unit │ Integ │ E2E │ Perf │ Sec  │
│ ───────────────────┼──────┼───────┼─────┼──────┼──────┤
│ 🔐 Autenticação     │  ✅  │   ✅  │ ✅  │  ✅  │  ✅  │
│ 👤 Autorização      │  ✅  │   ✅  │ ✅  │  ❌  │  ✅  │
│ 📂 Casos            │  ✅  │   ✅  │ ✅  │  ✅  │  ✅  │
│ 🧩 Evidências       │  ✅  │   ✅  │ ✅  │  ✅  │  ✅  │
│ 🔬 Análises         │  ✅  │   ✅  │ ✅  │  ✅  │  ❌  │
│ 📊 Relatórios       │  ✅  │   ✅  │ ✅  │  ✅  │  ❌  │
│ 👥 Usuários         │  ✅  │   ✅  │ ✅  │  ❌  │  ✅  │
│ ⚙️ Sistema          │  ✅  │   ✅  │ ✅  │  ✅  │  ✅  │
│ 🔍 Busca            │  ✅  │   ✅  │ ✅  │  ✅  │  ❌  │
│ 📱 Mobile API       │  ✅  │   ✅  │ ✅  │  ✅  │  ✅  │
│                                                         │
│ Legenda: ✅ Implementado  ❌ Não aplicável              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Critérios de Aceitação

**Para Release de Produção**:
- Cobertura de testes unitários ≥ 90%
- Cobertura de testes de integração ≥ 80%
- Todos os testes E2E críticos passando
- Performance dentro dos SLAs definidos
- Zero vulnerabilidades críticas de segurança
- Documentação de API atualizada

**Para Ambiente de Staging**:
- Todos os testes automatizados passando
- Smoke tests validados
- Testes de regressão executados
- Validação manual de novas funcionalidades

## 🛠️ Ambiente de Testes

### Configuração dos Ambientes

```text
┌─────────────────────────────────────────────────────────┐
│ 🌍 AMBIENTES DE TESTE                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🧪 LOCAL DEVELOPMENT                                   │
│ ├── Base URL: http://localhost:5000                    │
│ ├── Database: PostgreSQL (Docker)                      │
│ ├── Redis: Cache local                                 │
│ ├── Storage: Sistema de arquivos local                 │
│ └── Uso: Desenvolvimento e testes unitários            │
│                                                         │
│ 🔧 TESTING                                             │
│ ├── Base URL: https://test-api.casezero.gov.br         │
│ ├── Database: PostgreSQL (isolado)                     │
│ ├── Redis: Cache dedicado                              │
│ ├── Storage: Azure Blob Storage (test)                 │
│ └── Uso: Testes automatizados e integração             │
│                                                         │
│ 📋 STAGING                                             │
│ ├── Base URL: https://staging-api.casezero.gov.br      │
│ ├── Database: PostgreSQL (réplica produção)            │
│ ├── Redis: Cache produção-like                         │
│ ├── Storage: Azure Blob Storage (staging)              │
│ └── Uso: Testes de aceitação e validação final         │
│                                                         │
│ 🚀 PRODUCTION                                          │
│ ├── Base URL: https://api.casezero.gov.br              │
│ ├── Database: PostgreSQL (cluster HA)                  │
│ ├── Redis: Cache distribuído                           │
│ ├── Storage: Azure Blob Storage (produção)             │
│ └── Uso: Apenas smoke tests e monitoramento            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Dados de Teste

```typescript
// Configuração de dados de teste
export const testData = {
  users: {
    admin: {
      email: 'admin.test@casezero.local',
      password: 'TestAdmin123!',
      role: 'admin'
    },
    investigator: {
      email: 'investigator.test@casezero.local',
      password: 'TestInv123!',
      role: 'investigator'
    },
    labTech: {
      email: 'lab.test@casezero.local',
      password: 'TestLab123!',
      role: 'lab_technician'
    }
  },
  
  cases: {
    active: {
      title: 'Caso de Teste - Ativo',
      type: 'robbery',
      status: 'active',
      priority: 'medium'
    },
    closed: {
      title: 'Caso de Teste - Fechado',
      type: 'fraud',
      status: 'closed',
      priority: 'low'
    }
  },
  
  evidence: {
    photo: {
      filename: 'test_evidence.jpg',
      type: 'photo',
      size: 1024000,
      mimeType: 'image/jpeg'
    },
    document: {
      filename: 'test_document.pdf',
      type: 'document',
      size: 512000,
      mimeType: 'application/pdf'
    }
  }
};
```

## 🧱 Testes Unitários

### Configuração Jest

```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/**/*.module.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};
```

### Exemplo de Teste de Service

```typescript
// tests/services/case.service.test.ts
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaseService } from '../../src/services/case.service';
import { Case } from '../../src/entities/case.entity';
import { Repository } from 'typeorm';

describe('CaseService', () => {
  let service: CaseService;
  let repository: Repository<Case>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CaseService,
        {
          provide: getRepositoryToken(Case),
          useValue: mockRepository
        }
      ]
    }).compile();

    service = module.get<CaseService>(CaseService);
    repository = module.get<Repository<Case>>(getRepositoryToken(Case));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated cases', async () => {
      // Arrange
      const mockCases = [
        { id: '1', title: 'Case 1', status: 'active' },
        { id: '2', title: 'Case 2', status: 'closed' }
      ];
      
      const mockCount = 2;
      mockRepository.find.mockResolvedValue(mockCases);
      jest.spyOn(repository, 'count').mockResolvedValue(mockCount);

      // Act
      const result = await service.findAll({ page: 1, limit: 10 });

      // Assert
      expect(result.data).toEqual(mockCases);
      expect(result.pagination.total).toBe(mockCount);
      expect(mockRepository.find).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: { createdAt: 'DESC' }
      });
    });

    it('should apply filters correctly', async () => {
      // Arrange
      const filters = { status: 'active', department: 'dhpp' };
      
      // Act
      await service.findAll({ page: 1, limit: 10, ...filters });

      // Assert
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: filters,
        skip: 0,
        take: 10,
        order: { createdAt: 'DESC' }
      });
    });
  });

  describe('create', () => {
    it('should create a new case', async () => {
      // Arrange
      const createCaseDto = {
        title: 'New Case',
        type: 'robbery',
        priority: 'high'
      };
      
      const savedCase = { id: '123', ...createCaseDto };
      mockRepository.create.mockReturnValue(createCaseDto);
      mockRepository.save.mockResolvedValue(savedCase);

      // Act
      const result = await service.create(createCaseDto);

      // Assert
      expect(result).toEqual(savedCase);
      expect(mockRepository.create).toHaveBeenCalledWith(createCaseDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw error for invalid data', async () => {
      // Arrange
      const invalidDto = { title: '' }; // título vazio
      mockRepository.save.mockRejectedValue(new Error('Validation failed'));

      // Act & Assert
      await expect(service.create(invalidDto as any)).rejects.toThrow('Validation failed');
    });
  });

  describe('findById', () => {
    it('should return case by id', async () => {
      // Arrange
      const caseId = '123';
      const mockCase = { id: caseId, title: 'Test Case' };
      mockRepository.findOne.mockResolvedValue(mockCase);

      // Act
      const result = await service.findById(caseId);

      // Assert
      expect(result).toEqual(mockCase);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: caseId },
        relations: ['assignedTo', 'evidence']
      });
    });

    it('should throw NotFoundException for non-existent case', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findById('non-existent')).rejects.toThrow('Case not found');
    });
  });
});
```

### Testes de Validação

```typescript
// tests/validation/case.validation.test.ts
import { validate } from 'class-validator';
import { CreateCaseDto } from '../../src/dto/create-case.dto';

describe('CreateCaseDto Validation', () => {
  it('should pass validation with valid data', async () => {
    // Arrange
    const dto = new CreateCaseDto();
    dto.title = 'Valid Case Title';
    dto.type = 'robbery';
    dto.priority = 'medium';
    dto.description = 'Valid description';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors).toHaveLength(0);
  });

  it('should fail validation with empty title', async () => {
    // Arrange
    const dto = new CreateCaseDto();
    dto.title = '';
    dto.type = 'robbery';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('title');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with invalid type', async () => {
    // Arrange
    const dto = new CreateCaseDto();
    dto.title = 'Valid Title';
    dto.type = 'invalid_type' as any;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('type');
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });

  it('should fail validation with too long title', async () => {
    // Arrange
    const dto = new CreateCaseDto();
    dto.title = 'x'.repeat(201); // Limite é 200 caracteres
    dto.type = 'robbery';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('title');
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });
});
```

## 🔗 Testes de Integração

### Configuração do Ambiente de Teste

```typescript
// tests/integration/setup.ts
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { getConnection } from 'typeorm';

export class IntegrationTestSetup {
  static app: any;
  static authToken: string;

  static async beforeAll() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.useGlobalPipes(new ValidationPipe({ transform: true }));
    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
    
    await this.app.init();
    await this.setupDatabase();
    await this.authenticate();
  }

  static async afterAll() {
    await this.cleanupDatabase();
    await this.app.close();
  }

  static async setupDatabase() {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.synchronize();
    await this.seedTestData();
  }

  static async cleanupDatabase() {
    const connection = getConnection();
    await connection.dropDatabase();
  }

  static async seedTestData() {
    // Inserir dados de teste
    const userRepository = getConnection().getRepository('User');
    await userRepository.save({
      email: 'test@casezero.local',
      password: '$2b$10$hashedPassword',
      role: 'investigator',
      name: 'Test User'
    });
  }

  static async authenticate() {
    const response = await request(this.app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@casezero.local',
        password: 'password123'
      });
    
    this.authToken = response.body.tokens.accessToken;
  }
}
```

### Exemplo de Teste de Endpoint

```typescript
// tests/integration/cases.integration.test.ts
import * as request from 'supertest';
import { IntegrationTestSetup } from './setup';

describe('Cases API Integration', () => {
  beforeAll(async () => {
    await IntegrationTestSetup.beforeAll();
  });

  afterAll(async () => {
    await IntegrationTestSetup.afterAll();
  });

  describe('GET /cases', () => {
    it('should return paginated cases', async () => {
      // Act
      const response = await request(IntegrationTestSetup.app.getHttpServer())
        .get('/cases')
        .set('Authorization', `Bearer ${IntegrationTestSetup.authToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200);

      // Assert
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toHaveProperty('page', 1);
      expect(response.body.pagination).toHaveProperty('limit', 10);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter cases by status', async () => {
      // Act
      const response = await request(IntegrationTestSetup.app.getHttpServer())
        .get('/cases')
        .set('Authorization', `Bearer ${IntegrationTestSetup.authToken}`)
        .query({ status: 'active' })
        .expect(200);

      // Assert
      response.body.data.forEach(caseItem => {
        expect(caseItem.status).toBe('active');
      });
    });

    it('should require authentication', async () => {
      // Act & Assert
      await request(IntegrationTestSetup.app.getHttpServer())
        .get('/cases')
        .expect(401);
    });
  });

  describe('POST /cases', () => {
    it('should create a new case', async () => {
      // Arrange
      const newCase = {
        title: 'Integration Test Case',
        type: 'robbery',
        priority: 'medium',
        description: 'Test case created during integration testing'
      };

      // Act
      const response = await request(IntegrationTestSetup.app.getHttpServer())
        .post('/cases')
        .set('Authorization', `Bearer ${IntegrationTestSetup.authToken}`)
        .send(newCase)
        .expect(201);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(newCase.title);
      expect(response.body.data.status).toBe('active'); // status padrão
    });

    it('should validate required fields', async () => {
      // Arrange
      const invalidCase = {
        // title é obrigatório mas não foi fornecido
        type: 'robbery',
        priority: 'medium'
      };

      // Act & Assert
      const response = await request(IntegrationTestSetup.app.getHttpServer())
        .post('/cases')
        .set('Authorization', `Bearer ${IntegrationTestSetup.authToken}`)
        .send(invalidCase)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.details).toContainEqual({
        field: 'title',
        message: expect.stringContaining('should not be empty')
      });
    });
  });

  describe('Evidence Upload Integration', () => {
    let caseId: string;

    beforeEach(async () => {
      // Criar caso para teste
      const caseResponse = await request(IntegrationTestSetup.app.getHttpServer())
        .post('/cases')
        .set('Authorization', `Bearer ${IntegrationTestSetup.authToken}`)
        .send({
          title: 'Case for Evidence Test',
          type: 'robbery',
          priority: 'medium'
        });
      
      caseId = caseResponse.body.data.id;
    });

    it('should upload evidence file', async () => {
      // Arrange
      const testFile = Buffer.from('test file content');

      // Act
      const response = await request(IntegrationTestSetup.app.getHttpServer())
        .post(`/cases/${caseId}/evidence`)
        .set('Authorization', `Bearer ${IntegrationTestSetup.authToken}`)
        .attach('file', testFile, 'test-evidence.txt')
        .field('metadata', JSON.stringify({
          name: 'Test Evidence',
          type: 'document',
          description: 'Evidence uploaded during integration test'
        }))
        .expect(201);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.filename).toBe('test-evidence.txt');
      expect(response.body.data.status).toBe('pending');
    });
  });
});
```

## 🎯 Testes End-to-End

### Configuração Playwright

```typescript
// tests/e2e/playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 2,
  
  use: {
    baseURL: 'https://test-api.casezero.gov.br',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    ignoreHTTPSErrors: true
  },

  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' }
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'Safari',
      use: { browserName: 'webkit' }
    }
  ],

  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/e2e-results.xml' }]
  ]
};

export default config;
```

### Cenário E2E Completo

```typescript
// tests/e2e/investigation-workflow.e2e.test.ts
import { test, expect } from '@playwright/test';

test.describe('Complete Investigation Workflow', () => {
  let authToken: string;
  let caseId: string;
  let evidenceId: string;

  test.beforeAll(async ({ request }) => {
    // Autenticar
    const loginResponse = await request.post('/auth/login', {
      data: {
        email: 'e2e.test@casezero.local',
        password: 'E2ETest123!'
      }
    });
    
    const loginData = await loginResponse.json();
    authToken = loginData.tokens.accessToken;
  });

  test('should complete full investigation workflow', async ({ request }) => {
    // 1. Criar novo caso
    const createCaseResponse = await request.post('/cases', {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        title: 'E2E Test Case - Robbery Investigation',
        type: 'robbery',
        priority: 'high',
        description: 'End-to-end test case for complete workflow',
        location: {
          address: 'Test Street, 123',
          city: 'Test City'
        }
      }
    });

    expect(createCaseResponse.ok()).toBeTruthy();
    const caseData = await createCaseResponse.json();
    caseId = caseData.data.id;

    // 2. Upload de evidência
    const evidenceFile = Buffer.from('Test evidence content');
    const uploadResponse = await request.post(`/cases/${caseId}/evidence`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      multipart: {
        file: {
          name: 'test-evidence.jpg',
          mimeType: 'image/jpeg',
          buffer: evidenceFile
        },
        metadata: JSON.stringify({
          name: 'Crime Scene Photo',
          type: 'photo',
          description: 'Main entrance photo'
        })
      }
    });

    expect(uploadResponse.ok()).toBeTruthy();
    const evidenceData = await uploadResponse.json();
    evidenceId = evidenceData.data.id;

    // 3. Solicitar análise
    const analysisResponse = await request.post(`/evidence/${evidenceId}/analyze`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        analysisType: 'fingerprint_analysis',
        priority: 'high',
        notes: 'Check for fingerprints on evidence'
      }
    });

    expect(analysisResponse.ok()).toBeTruthy();

    // 4. Simular conclusão da análise (seria feita por técnico)
    const updateAnalysisResponse = await request.put(`/evidence/${evidenceId}/analysis`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        status: 'completed',
        results: [
          {
            type: 'fingerprint_match',
            confidence: 0.95,
            details: 'Match found in database'
          }
        ],
        conclusion: 'Positive identification completed'
      }
    });

    expect(updateAnalysisResponse.ok()).toBeTruthy();

    // 5. Atualizar status do caso
    const updateCaseResponse = await request.put(`/cases/${caseId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        status: 'closed',
        progress: 100,
        conclusion: 'Case solved with suspect identification'
      }
    });

    expect(updateCaseResponse.ok()).toBeTruthy();

    // 6. Gerar relatório final
    const reportResponse = await request.post('/reports/generate', {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        type: 'case_completion',
        filters: { caseId: caseId },
        format: 'pdf'
      }
    });

    expect(reportResponse.ok()).toBeTruthy();

    // 7. Verificar estado final do caso
    const finalCaseResponse = await request.get(`/cases/${caseId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const finalCaseData = await finalCaseResponse.json();
    expect(finalCaseData.data.status).toBe('closed');
    expect(finalCaseData.data.progress).toBe(100);
    expect(finalCaseData.data.evidenceCount).toBeGreaterThan(0);
  });

  test('should handle authentication expiration', async ({ request }) => {
    // Usar token expirado
    const expiredToken = 'expired.jwt.token';

    const response = await request.get('/cases', {
      headers: { 'Authorization': `Bearer ${expiredToken}` }
    });

    expect(response.status()).toBe(401);
    
    const errorData = await response.json();
    expect(errorData.success).toBe(false);
    expect(errorData.error.code).toBe('TOKEN_EXPIRED');
  });
});
```

## ⚡ Testes de Performance

### Configuração Artillery

```javascript
// tests/performance/artillery.yml
config:
  target: 'https://test-api.casezero.gov.br'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 300
      arrivalRate: 50
      name: "Load test"
    - duration: 120
      arrivalRate: 100
      name: "Stress test"

scenarios:
  - name: "Authentication Flow"
    weight: 20
    flow:
      - post:
          url: "/auth/login"
          json:
            email: "{{ $randomEmail() }}"
            password: "Test123!"
          capture:
            - json: "$.tokens.accessToken"
              as: "authToken"
      
      - get:
          url: "/cases"
          headers:
            Authorization: "Bearer {{ authToken }}"
          
  - name: "Case Management"
    weight: 50
    flow:
      - post:
          url: "/auth/login"
          json:
            email: "perf.test@casezero.local"
            password: "PerfTest123!"
          capture:
            - json: "$.tokens.accessToken"
              as: "authToken"
      
      - get:
          url: "/cases"
          headers:
            Authorization: "Bearer {{ authToken }}"
          
      - post:
          url: "/cases"
          headers:
            Authorization: "Bearer {{ authToken }}"
          json:
            title: "Performance Test Case {{ $randomInt(1, 10000) }}"
            type: "{{ $randomChoice(['robbery', 'fraud', 'assault']) }}"
            priority: "{{ $randomChoice(['low', 'medium', 'high']) }}"

  - name: "Evidence Upload"
    weight: 30
    flow:
      - post:
          url: "/auth/login"
          json:
            email: "perf.test@casezero.local"
            password: "PerfTest123!"
          capture:
            - json: "$.tokens.accessToken"
              as: "authToken"
      
      - post:
          url: "/cases"
          headers:
            Authorization: "Bearer {{ authToken }}"
          json:
            title: "Evidence Test Case"
            type: "robbery"
          capture:
            - json: "$.data.id"
              as: "caseId"
              
      - post:
          url: "/cases/{{ caseId }}/evidence"
          headers:
            Authorization: "Bearer {{ authToken }}"
          beforeRequest: "generateTestFile"
```

### SLAs e Métricas

```text
┌─────────────────────────────────────────────────────────┐
│ 📊 SLAs DE PERFORMANCE                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Endpoint              │ P95    │ P99    │ RPS  │ Error │
│ ─────────────────────┼────────┼────────┼──────┼───────┤
│ 🔐 /auth/login       │ 200ms  │ 500ms  │ 100  │ <0.1% │
│ 🔑 /auth/refresh     │ 100ms  │ 200ms  │ 200  │ <0.1% │
│ 📂 /cases (GET)      │ 150ms  │ 300ms  │ 500  │ <0.5% │
│ 📂 /cases (POST)     │ 300ms  │ 800ms  │ 50   │ <1.0% │
│ 🧩 /evidence upload  │ 2000ms │ 5000ms │ 20   │ <2.0% │
│ 🔬 /analysis start   │ 500ms  │ 1000ms │ 30   │ <1.0% │
│ 📊 /reports generate │ 5000ms │ 15000ms│ 5    │ <2.0% │
│ 🔍 /search           │ 200ms  │ 500ms  │ 100  │ <0.5% │
│                                                         │
│ Legenda:                                                │
│ - P95/P99: Percentil de tempo de resposta              │
│ - RPS: Requests por segundo                             │
│ - Error: Taxa de erro aceitável                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Script de Monitoramento

```typescript
// tests/performance/monitor.ts
import axios from 'axios';
import { performance } from 'perf_hooks';

interface PerformanceMetrics {
  endpoint: string;
  responseTime: number;
  statusCode: number;
  timestamp: Date;
  success: boolean;
}

export class PerformanceMonitor {
  private baseUrl: string;
  private authToken: string;
  private metrics: PerformanceMetrics[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async authenticate(): Promise<void> {
    const response = await axios.post(`${this.baseUrl}/auth/login`, {
      email: 'monitor@casezero.local',
      password: 'Monitor123!'
    });
    
    this.authToken = response.data.tokens.accessToken;
  }

  async measureEndpoint(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any): Promise<PerformanceMetrics> {
    const startTime = performance.now();
    
    try {
      const config = {
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {},
        data
      };

      const response = await axios(config);
      const endTime = performance.now();

      const metric: PerformanceMetrics = {
        endpoint,
        responseTime: endTime - startTime,
        statusCode: response.status,
        timestamp: new Date(),
        success: response.status < 400
      };

      this.metrics.push(metric);
      return metric;

    } catch (error) {
      const endTime = performance.now();
      
      const metric: PerformanceMetrics = {
        endpoint,
        responseTime: endTime - startTime,
        statusCode: error.response?.status || 0,
        timestamp: new Date(),
        success: false
      };

      this.metrics.push(metric);
      return metric;
    }
  }

  getMetricsSummary(): any {
    const grouped = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.endpoint]) {
        acc[metric.endpoint] = [];
      }
      acc[metric.endpoint].push(metric);
      return acc;
    }, {});

    return Object.keys(grouped).map(endpoint => {
      const endpointMetrics = grouped[endpoint];
      const responseTimes = endpointMetrics.map(m => m.responseTime);
      const successCount = endpointMetrics.filter(m => m.success).length;

      return {
        endpoint,
        totalRequests: endpointMetrics.length,
        successRate: (successCount / endpointMetrics.length) * 100,
        avgResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
        p95ResponseTime: this.percentile(responseTimes, 95),
        p99ResponseTime: this.percentile(responseTimes, 99),
        minResponseTime: Math.min(...responseTimes),
        maxResponseTime: Math.max(...responseTimes)
      };
    });
  }

  private percentile(arr: number[], p: number): number {
    const sorted = arr.sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[index];
  }
}

// Uso do monitor
async function runPerformanceTests() {
  const monitor = new PerformanceMonitor('https://test-api.casezero.gov.br');
  
  await monitor.authenticate();
  
  // Teste de carga nos endpoints críticos
  for (let i = 0; i < 100; i++) {
    await Promise.all([
      monitor.measureEndpoint('/cases'),
      monitor.measureEndpoint('/auth/refresh'),
      monitor.measureEndpoint('/cases', 'POST', {
        title: `Perf Test Case ${i}`,
        type: 'robbery',
        priority: 'medium'
      })
    ]);
    
    // Pequena pausa entre batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const summary = monitor.getMetricsSummary();
  console.log('Performance Test Results:', JSON.stringify(summary, null, 2));
}
```

## 🔒 Testes de Segurança

### OWASP ZAP Integration

```yaml
# tests/security/zap-baseline.yml
version: '3'
services:
  zap:
    image: owasp/zap2docker-stable
    command: zap-baseline.py -t https://test-api.casezero.gov.br -f openapi -J zap-report.json
    volumes:
      - ./security-reports:/zap/wrk:rw
    environment:
      - ZAP_PROXY_PORT=8080
```

### Testes de Autenticação e Autorização

```typescript
// tests/security/auth.security.test.ts
import * as request from 'supertest';
import { SecurityTestSetup } from './setup';

describe('Authentication Security Tests', () => {
  beforeAll(async () => {
    await SecurityTestSetup.beforeAll();
  });

  describe('JWT Token Security', () => {
    it('should reject expired tokens', async () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired.token';
      
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .get('/cases')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body.error.code).toBe('TOKEN_EXPIRED');
    });

    it('should reject malformed tokens', async () => {
      const malformedToken = 'invalid.jwt.format';
      
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .get('/cases')
        .set('Authorization', `Bearer ${malformedToken}`)
        .expect(401);

      expect(response.body.error.code).toBe('TOKEN_INVALID');
    });

    it('should reject tokens with invalid signature', async () => {
      const invalidSignatureToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid_signature';
      
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .get('/cases')
        .set('Authorization', `Bearer ${invalidSignatureToken}`)
        .expect(401);

      expect(response.body.error.code).toBe('TOKEN_INVALID');
    });
  });

  describe('Input Validation Security', () => {
    it('should prevent SQL injection in search', async () => {
      const sqlInjectionPayload = "'; DROP TABLE cases; --";
      
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .get('/cases')
        .set('Authorization', `Bearer ${SecurityTestSetup.authToken}`)
        .query({ search: sqlInjectionPayload })
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_INPUT');
    });

    it('should prevent XSS in case creation', async () => {
      const xssPayload = '<script>alert("xss")</script>';
      
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .post('/cases')
        .set('Authorization', `Bearer ${SecurityTestSetup.authToken}`)
        .send({
          title: xssPayload,
          type: 'robbery',
          priority: 'medium'
        })
        .expect(400);

      expect(response.body.error.details).toContainEqual({
        field: 'title',
        message: expect.stringContaining('contains invalid characters')
      });
    });

    it('should enforce file upload restrictions', async () => {
      const maliciousFile = Buffer.from('<?php system($_GET["cmd"]); ?>');
      
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .post('/cases/test-case-id/evidence')
        .set('Authorization', `Bearer ${SecurityTestSetup.authToken}`)
        .attach('file', maliciousFile, 'malicious.php')
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_FILE_TYPE');
    });
  });

  describe('Rate Limiting Security', () => {
    it('should enforce rate limits on login attempts', async () => {
      // Fazer múltiplas tentativas de login falhadas
      for (let i = 0; i < 6; i++) {
        await request(SecurityTestSetup.app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test@casezero.local',
            password: 'wrong_password'
          });
      }

      // A próxima tentativa deve ser bloqueada
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@casezero.local',
          password: 'wrong_password'
        })
        .expect(429);

      expect(response.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
    });

    it('should enforce general API rate limits', async () => {
      // Fazer muitas requisições rapidamente
      const requests = Array(100).fill(null).map(() =>
        request(SecurityTestSetup.app.getHttpServer())
          .get('/cases')
          .set('Authorization', `Bearer ${SecurityTestSetup.authToken}`)
      );

      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('Authorization Security', () => {
    it('should prevent access to other users data', async () => {
      // Tentar acessar caso de outro usuário
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .get('/cases/other-user-case-id')
        .set('Authorization', `Bearer ${SecurityTestSetup.authToken}`)
        .expect(403);

      expect(response.body.error.code).toBe('INSUFFICIENT_PERMISSIONS');
    });

    it('should enforce role-based access control', async () => {
      // Token de usuário com role limitada
      const limitedToken = await SecurityTestSetup.getLimitedUserToken();
      
      const response = await request(SecurityTestSetup.app.getHttpServer())
        .delete('/cases/test-case-id')
        .set('Authorization', `Bearer ${limitedToken}`)
        .expect(403);

      expect(response.body.error.code).toBe('INSUFFICIENT_ROLE');
    });
  });
});
```

## 🔄 Automação e CI/CD

### Pipeline GitHub Actions

```yaml
# .github/workflows/api-tests.yml
name: API Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: casezero_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:6
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/casezero_test
        REDIS_URL: redis://localhost:6379
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: casezero_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Start application
      run: |
        npm run build
        npm run start:test &
        sleep 30
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/casezero_test
        JWT_SECRET: test_secret_key_for_ci
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run E2E tests
      run: npm run test:e2e

  security-tests:
    runs-on: ubuntu-latest
    needs: integration-tests
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Start application
      run: |
        npm run build
        npm run start:test &
        sleep 30
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/casezero_test
    
    - name: Run OWASP ZAP scan
      uses: zaproxy/action-baseline@v0.7.0
      with:
        target: 'http://localhost:3000'
        rules_file_name: '.zap/rules.tsv'
    
    - name: Run security tests
      run: npm run test:security

  performance-tests:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install Artillery
      run: npm install -g artillery@latest
    
    - name: Run performance tests
      run: artillery run tests/performance/artillery.yml
    
    - name: Upload performance report
      uses: actions/upload-artifact@v3
      with:
        name: performance-report
        path: performance-report.html
```

## 📄 Arquivos .http

### Configuração REST Client

```http
# api-tests.http
### Variáveis de ambiente
@baseUrl = https://test-api.casezero.gov.br
@authToken = {{login.response.body.tokens.accessToken}}
@refreshToken = {{login.response.body.tokens.refreshToken}}
@caseId = {{createCase.response.body.data.id}}
@evidenceId = {{uploadEvidence.response.body.data.id}}

### 1. Login
# @name login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "test@casezero.local",
  "password": "Test123!"
}

### 2. Refresh Token
# @name refresh
POST {{baseUrl}}/auth/refresh
Content-Type: application/json

{
  "refreshToken": "{{refreshToken}}"
}

### 3. Listar casos
# @name listCases
GET {{baseUrl}}/cases?page=1&limit=10
Authorization: Bearer {{authToken}}

### 4. Criar caso
# @name createCase
POST {{baseUrl}}/cases
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "title": "Caso de Teste - {{$datetime 'iso8601'}}",
  "type": "robbery",
  "priority": "medium",
  "description": "Caso criado para testes automatizados",
  "location": {
    "address": "Rua de Teste, 123",
    "city": "Cidade Teste",
    "coordinates": {
      "lat": -23.5505,
      "lng": -46.6333
    }
  }
}

### 5. Obter caso específico
# @name getCase
GET {{baseUrl}}/cases/{{caseId}}
Authorization: Bearer {{authToken}}

### 6. Upload de evidência
# @name uploadEvidence
POST {{baseUrl}}/cases/{{caseId}}/evidence
Authorization: Bearer {{authToken}}
Content-Type: multipart/form-data; boundary=----formdata-boundary

------formdata-boundary
Content-Disposition: form-data; name="metadata"
Content-Type: application/json

{
  "name": "Evidência de Teste",
  "type": "photo",
  "description": "Foto de evidência para teste automatizado"
}
------formdata-boundary
Content-Disposition: form-data; name="file"; filename="test-evidence.jpg"
Content-Type: image/jpeg

< ./test-files/evidence-sample.jpg
------formdata-boundary--

### 7. Solicitar análise
# @name requestAnalysis
POST {{baseUrl}}/evidence/{{evidenceId}}/analyze
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "analysisType": "fingerprint_analysis",
  "priority": "high",
  "notes": "Análise solicitada via teste automatizado"
}

### 8. Buscar casos
# @name searchCases
GET {{baseUrl}}/cases/search?q=teste&type=robbery&status=active
Authorization: Bearer {{authToken}}

### 9. Gerar relatório
# @name generateReport
POST {{baseUrl}}/reports/generate
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "type": "case_summary",
  "filters": {
    "caseId": "{{caseId}}"
  },
  "format": "pdf"
}

### 10. Estatísticas do sistema
# @name getStats
GET {{baseUrl}}/dashboard/stats
Authorization: Bearer {{authToken}}

### 11. Atualizar status do caso
# @name updateCase
PUT {{baseUrl}}/cases/{{caseId}}
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "status": "in_progress",
  "progress": 25,
  "notes": "Caso atualizado via teste automatizado"
}

### 12. Logout
# @name logout
POST {{baseUrl}}/auth/logout
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "refreshToken": "{{refreshToken}}"
}

### 13. Teste de endpoint protegido sem token (deve falhar)
# @name unauthorizedTest
GET {{baseUrl}}/cases
# Sem Authorization header - deve retornar 401

### 14. Teste de rate limiting
# @name rateLimitTest
GET {{baseUrl}}/cases
Authorization: Bearer {{authToken}}
```

### Script de Automação

```bash
#!/bin/bash
# scripts/run-api-tests.sh

set -e

echo "🧪 Iniciando testes automatizados da API..."

# Verificar se a aplicação está rodando
echo "🔍 Verificando se a API está disponível..."
curl -f http://localhost:5000/health || {
  echo "❌ API não está disponível. Iniciando aplicação..."
  npm run start:test &
  sleep 30
}

# Executar testes unitários
echo "🧱 Executando testes unitários..."
npm run test:unit -- --coverage

# Executar testes de integração
echo "🔗 Executando testes de integração..."
npm run test:integration

# Executar testes E2E
echo "🎯 Executando testes E2E..."
npm run test:e2e

# Executar testes de segurança
echo "🔒 Executando testes de segurança..."
npm run test:security

# Executar testes de performance (apenas em staging/prod)
if [[ "$NODE_ENV" == "staging" || "$NODE_ENV" == "production" ]]; then
  echo "⚡ Executando testes de performance..."
  npm run test:performance
fi

# Gerar relatório consolidado
echo "📊 Gerando relatório consolidado..."
npm run test:report

echo "✅ Todos os testes executados com sucesso!"
```

---

**Próximo**: [15-frontend-backend-integration.md](15-frontend-backend-integration.md) - Integração Frontend-Backend

---


[**Retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
