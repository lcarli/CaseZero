-- =====================================================
-- Case Zero Database Schema
-- Criação das tabelas principais do jogo investigativo
-- Database: PostgreSQL/SQL Server compatível
-- =====================================================

-- Primeiro, vamos criar os tipos ENUM (PostgreSQL) ou definir como constraints

-- =====================================================
-- TABELA: Users (Jogadores/Detetives)
-- =====================================================
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Rank NVARCHAR(20) NOT NULL DEFAULT 'Rookie' 
        CHECK (Rank IN ('Rookie', 'Detective', 'Sergeant', 'Lieutenant', 'Captain')),
    CasesSolved INT NOT NULL DEFAULT 0,
    CasesFailed INT NOT NULL DEFAULT 0,
    TotalPlayTime INT NOT NULL DEFAULT 0, -- em minutos
    LastLoginAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IsActive BIT NOT NULL DEFAULT 1
);

-- Índices para Users
CREATE INDEX IX_Users_Username ON Users(Username);
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Users_Rank ON Users(Rank);

-- =====================================================
-- TABELA: Cases (Casos Investigativos)
-- =====================================================
CREATE TABLE Cases (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CaseNumber NVARCHAR(20) NOT NULL UNIQUE, -- ex: "CASE_001"
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    BriefingText NVARCHAR(MAX) NULL, -- Texto do briefing inicial
    Difficulty NVARCHAR(20) NOT NULL DEFAULT 'Easy'
        CHECK (Difficulty IN ('Tutorial', 'Easy', 'Medium', 'Hard', 'Expert')),
    Culprit NVARCHAR(100) NULL, -- Nome do culpado (NULL se inconclusivo)
    ProofFileIds NVARCHAR(MAX) NULL, -- JSON array com IDs dos arquivos de prova
    EstimatedTimeMinutes INT NULL, -- Tempo estimado para resolver
    IsPublished BIT NOT NULL DEFAULT 0,
    PublishedAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedByUserId UNIQUEIDENTIFIER NULL -- Para casos criados por usuários
);

-- Índices para Cases
CREATE INDEX IX_Cases_CaseNumber ON Cases(CaseNumber);
CREATE INDEX IX_Cases_Difficulty ON Cases(Difficulty);
CREATE INDEX IX_Cases_IsPublished ON Cases(IsPublished);

-- =====================================================
-- TABELA: Evidence (Evidências)
-- =====================================================
CREATE TABLE Evidence (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CaseId UNIQUEIDENTIFIER NOT NULL,
    FileName NVARCHAR(255) NOT NULL, -- Nome do arquivo original
    FilePath NVARCHAR(500) NOT NULL, -- Caminho no storage
    FileType NVARCHAR(50) NOT NULL 
        CHECK (FileType IN ('Document', 'Photo', 'Audio', 'Video', 'PhysicalObject')),
    FileSize BIGINT NOT NULL DEFAULT 0, -- Tamanho em bytes
    MimeType NVARCHAR(100) NULL, -- ex: "application/pdf"
    Title NVARCHAR(200) NULL, -- Título para exibição
    Description NVARCHAR(MAX) NULL, -- Descrição da evidência
    IsKeyEvidence BIT NOT NULL DEFAULT 0, -- Se é evidência chave
    IsInitiallyVisible BIT NOT NULL DEFAULT 1, -- Se aparece desde o início
    UnlockConditions NVARCHAR(MAX) NULL, -- JSON com condições para desbloquear
    Metadata NVARCHAR(MAX) NULL, -- JSON com metadados específicos
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    FOREIGN KEY (CaseId) REFERENCES Cases(Id) ON DELETE CASCADE
);

-- Índices para Evidence
CREATE INDEX IX_Evidence_CaseId ON Evidence(CaseId);
CREATE INDEX IX_Evidence_FileType ON Evidence(FileType);
CREATE INDEX IX_Evidence_IsKeyEvidence ON Evidence(IsKeyEvidence);

-- =====================================================
-- TABELA: InvestigationSessions (Sessões de Investigação)
-- =====================================================
CREATE TABLE InvestigationSessions (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    CaseId UNIQUEIDENTIFIER NOT NULL,
    SessionStatus NVARCHAR(20) NOT NULL DEFAULT 'Active'
        CHECK (SessionStatus IN ('Active', 'Completed', 'Abandoned', 'Failed')),
    EvidenceReviewed NVARCHAR(MAX) NULL, -- JSON array com IDs das evidências revisadas
    Notes NVARCHAR(MAX) NULL, -- Anotações do detetive
    CurrentProgress DECIMAL(5,2) DEFAULT 0.00, -- Progresso em % (0-100)
    HintsUsed INT NOT NULL DEFAULT 0,
    StartedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CompletedAt DATETIME2 NULL,
    LastActivityAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    TotalTimeMinutes INT NOT NULL DEFAULT 0,
    
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (CaseId) REFERENCES Cases(Id) ON DELETE CASCADE
);

-- Índices para InvestigationSessions
CREATE INDEX IX_InvestigationSessions_UserId ON InvestigationSessions(UserId);
CREATE INDEX IX_InvestigationSessions_CaseId ON InvestigationSessions(CaseId);
CREATE INDEX IX_InvestigationSessions_Status ON InvestigationSessions(SessionStatus);
CREATE INDEX IX_InvestigationSessions_LastActivity ON InvestigationSessions(LastActivityAt);

-- =====================================================
-- TABELA: AnalysisRequests (Solicitações de Análise Forense)
-- =====================================================
CREATE TABLE AnalysisRequests (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SessionId UNIQUEIDENTIFIER NOT NULL,
    EvidenceId UNIQUEIDENTIFIER NOT NULL,
    AnalysisType NVARCHAR(50) NOT NULL 
        CHECK (AnalysisType IN ('Fingerprint', 'DNA', 'Chemical', 'DigitalForensics', 'Ballistics', 'GpsTriangulation')),
    RequestStatus NVARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (RequestStatus IN ('Pending', 'InProgress', 'Completed', 'Failed')),
    ResultData NVARCHAR(MAX) NULL, -- JSON com resultado da análise
    RequestedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CompletedAt DATETIME2 NULL,
    ProcessingTimeMinutes INT NULL, -- Tempo real de processamento
    Cost DECIMAL(10,2) DEFAULT 0.00, -- Custo da análise (para gamificação)
    
    FOREIGN KEY (SessionId) REFERENCES InvestigationSessions(Id) ON DELETE CASCADE,
    FOREIGN KEY (EvidenceId) REFERENCES Evidence(Id) ON DELETE CASCADE
);

-- Índices para AnalysisRequests
CREATE INDEX IX_AnalysisRequests_SessionId ON AnalysisRequests(SessionId);
CREATE INDEX IX_AnalysisRequests_EvidenceId ON AnalysisRequests(EvidenceId);
CREATE INDEX IX_AnalysisRequests_Type ON AnalysisRequests(AnalysisType);
CREATE INDEX IX_AnalysisRequests_Status ON AnalysisRequests(RequestStatus);

-- =====================================================
-- TABELA: TimelineEvents (Eventos da Linha do Tempo)
-- =====================================================
CREATE TABLE TimelineEvents (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SessionId UNIQUEIDENTIFIER NOT NULL,
    EventDateTime DATETIME2 NOT NULL, -- Data/hora do evento na investigação
    EventType NVARCHAR(50) NOT NULL, -- ex: "Crime", "Witness", "Evidence"
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Location NVARCHAR(200) NULL,
    EvidenceId UNIQUEIDENTIFIER NULL, -- Evidência relacionada (opcional)
    IsConfirmed BIT NOT NULL DEFAULT 0, -- Se foi confirmado pelo detetive
    IsKeyEvent BIT NOT NULL DEFAULT 0, -- Se é evento chave
    Confidence DECIMAL(3,2) DEFAULT 0.50, -- Nível de confiança (0-1)
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    FOREIGN KEY (SessionId) REFERENCES InvestigationSessions(Id) ON DELETE CASCADE,
    FOREIGN KEY (EvidenceId) REFERENCES Evidence(Id) ON DELETE SET NULL
);

-- Índices para TimelineEvents
CREATE INDEX IX_TimelineEvents_SessionId ON TimelineEvents(SessionId);
CREATE INDEX IX_TimelineEvents_EventDateTime ON TimelineEvents(EventDateTime);
CREATE INDEX IX_TimelineEvents_EventType ON TimelineEvents(EventType);

-- =====================================================
-- TABELA: Accusations (Acusações Finais)
-- =====================================================
CREATE TABLE Accusations (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SessionId UNIQUEIDENTIFIER NOT NULL,
    SuspectName NVARCHAR(100) NOT NULL,
    EvidenceId UNIQUEIDENTIFIER NOT NULL, -- Evidência usada como prova
    Reasoning NVARCHAR(MAX) NULL, -- Justificativa do detetive
    IsCorrect BIT NOT NULL DEFAULT 0,
    SubmittedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ValidatedAt DATETIME2 NULL,
    ValidationNotes NVARCHAR(MAX) NULL, -- Feedback do sistema
    
    FOREIGN KEY (SessionId) REFERENCES InvestigationSessions(Id) ON DELETE CASCADE,
    FOREIGN KEY (EvidenceId) REFERENCES Evidence(Id) ON DELETE RESTRICT
);

-- Índices para Accusations
CREATE INDEX IX_Accusations_SessionId ON Accusations(SessionId);
CREATE INDEX IX_Accusations_IsCorrect ON Accusations(IsCorrect);
CREATE INDEX IX_Accusations_SubmittedAt ON Accusations(SubmittedAt);

-- =====================================================
-- TABELA: CaseTranslations (Traduções dos Casos)
-- =====================================================
CREATE TABLE CaseTranslations (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CaseId UNIQUEIDENTIFIER NOT NULL,
    LanguageCode NVARCHAR(5) NOT NULL, -- 'pt', 'en', 'fr', 'es'
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    BriefingText NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    FOREIGN KEY (CaseId) REFERENCES Cases(Id) ON DELETE CASCADE,
    UNIQUE (CaseId, LanguageCode)
);

-- Índices para CaseTranslations
CREATE INDEX IX_CaseTranslations_CaseId ON CaseTranslations(CaseId);
CREATE INDEX IX_CaseTranslations_Language ON CaseTranslations(LanguageCode);

-- =====================================================
-- TABELA: EvidenceTranslations (Traduções das Evidências)
-- =====================================================
CREATE TABLE EvidenceTranslations (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    EvidenceId UNIQUEIDENTIFIER NOT NULL,
    LanguageCode NVARCHAR(5) NOT NULL,
    Title NVARCHAR(200) NULL,
    Description NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    FOREIGN KEY (EvidenceId) REFERENCES Evidence(Id) ON DELETE CASCADE,
    UNIQUE (EvidenceId, LanguageCode)
);

-- Índices para EvidenceTranslations
CREATE INDEX IX_EvidenceTranslations_EvidenceId ON EvidenceTranslations(EvidenceId);
CREATE INDEX IX_EvidenceTranslations_Language ON EvidenceTranslations(LanguageCode);

-- =====================================================
-- TABELA: GameSettings (Configurações do Jogo)
-- =====================================================
CREATE TABLE GameSettings (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SettingKey NVARCHAR(100) NOT NULL UNIQUE,
    SettingValue NVARCHAR(MAX) NOT NULL,
    Description NVARCHAR(500) NULL,
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedByUserId UNIQUEIDENTIFIER NULL
);

-- Inserir configurações padrão
INSERT INTO GameSettings (SettingKey, SettingValue, Description) VALUES
('AnalysisDelayMinutes', '5', 'Tempo padrão para análises forenses (em minutos)'),
('MaxConcurrentAnalyses', '3', 'Máximo de análises simultâneas por usuário'),
('HintCooldownMinutes', '10', 'Tempo entre dicas disponíveis'),
('SessionTimeoutMinutes', '120', 'Timeout de sessão inativa'),
('SupportedLanguages', '["pt", "en", "fr", "es"]', 'Idiomas suportados do jogo');

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View: Estatísticas de usuários
CREATE VIEW UserStats AS
SELECT 
    u.Id,
    u.Username,
    u.Rank,
    u.CasesSolved,
    u.CasesFailed,
    CASE 
        WHEN (u.CasesSolved + u.CasesFailed) = 0 THEN 0 
        ELSE ROUND((u.CasesSolved * 100.0) / (u.CasesSolved + u.CasesFailed), 2) 
    END AS SuccessRate,
    u.TotalPlayTime,
    COUNT(s.Id) AS ActiveSessions,
    u.LastLoginAt,
    u.CreatedAt
FROM Users u
LEFT JOIN InvestigationSessions s ON u.Id = s.UserId AND s.SessionStatus = 'Active'
GROUP BY u.Id, u.Username, u.Rank, u.CasesSolved, u.CasesFailed, u.TotalPlayTime, u.LastLoginAt, u.CreatedAt;

-- View: Resumo de casos
CREATE VIEW CaseSummary AS
SELECT 
    c.Id,
    c.CaseNumber,
    c.Title,
    c.Difficulty,
    c.IsPublished,
    COUNT(DISTINCT s.Id) AS TotalAttempts,
    COUNT(DISTINCT CASE WHEN s.SessionStatus = 'Completed' THEN s.Id END) AS CompletedAttempts,
    COUNT(DISTINCT CASE WHEN a.IsCorrect = 1 THEN s.Id END) AS SuccessfulSolutions,
    CASE 
        WHEN COUNT(DISTINCT s.Id) = 0 THEN 0 
        ELSE ROUND((COUNT(DISTINCT CASE WHEN a.IsCorrect = 1 THEN s.Id END) * 100.0) / COUNT(DISTINCT s.Id), 2) 
    END AS SuccessRate,
    AVG(CASE WHEN s.SessionStatus = 'Completed' THEN s.TotalTimeMinutes END) AS AvgCompletionTime,
    c.CreatedAt
FROM Cases c
LEFT JOIN InvestigationSessions s ON c.Id = s.CaseId
LEFT JOIN Accusations a ON s.Id = a.SessionId
GROUP BY c.Id, c.CaseNumber, c.Title, c.Difficulty, c.IsPublished, c.CreatedAt;

-- =====================================================
-- TRIGGERS PARA AUDITORIA
-- =====================================================

-- Trigger para atualizar UpdatedAt automaticamente em Users
-- (Implementação específica do banco de dados)

-- =====================================================
-- DADOS DE EXEMPLO/SEED
-- =====================================================

-- Usuário admin padrão
INSERT INTO Users (Username, Email, PasswordHash, Rank) VALUES
('admin', 'admin@casezero.com', 'hashed_password_here', 'Captain');

-- Caso tutorial
INSERT INTO Cases (CaseNumber, Title, Description, BriefingText, Difficulty, Culprit, IsPublished, PublishedAt) VALUES
('CASE_TUTORIAL', 'Tutorial: O Roubo do Café', 
'Um caso simples para aprender as mecânicas básicas do jogo.',
'Detetive, alguém roubou o dinheiro do caixa da cafeteria. Sua missão é descobrir quem foi o culpado usando as evidências disponíveis.',
'Tutorial', 'João Silva', 1, GETUTCDATE());

-- =====================================================
-- PROCEDURES ÚTEIS
-- =====================================================

-- Procedure para iniciar uma nova investigação
CREATE PROCEDURE StartNewInvestigation
    @UserId UNIQUEIDENTIFIER,
    @CaseId UNIQUEIDENTIFIER,
    @SessionId UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Verificar se já existe sessão ativa para este usuário/caso
    IF EXISTS (SELECT 1 FROM InvestigationSessions 
               WHERE UserId = @UserId AND CaseId = @CaseId AND SessionStatus = 'Active')
    BEGIN
        RAISERROR('Já existe uma investigação ativa para este caso.', 16, 1);
        RETURN;
    END
    
    -- Criar nova sessão
    SET @SessionId = NEWID();
    INSERT INTO InvestigationSessions (Id, UserId, CaseId, SessionStatus, StartedAt, LastActivityAt)
    VALUES (@SessionId, @UserId, @CaseId, 'Active', GETUTCDATE(), GETUTCDATE());
END;

-- =====================================================
-- COMENTÁRIOS FINAIS
-- =====================================================

-- Este script cria uma estrutura completa para o jogo Case Zero
-- Suporta:
-- - Múltiplos usuários com ranking
-- - Casos multilíngues
-- - Sistema de evidências flexível
-- - Análises forenses com delays realistas
-- - Timeline de eventos
-- - Sistema de acusações
-- - Estatísticas e relatórios
-- - Configurações globais do jogo

-- Para deploy:
-- 1. Execute este script em seu banco Azure SQL
-- 2. Configure as connection strings na aplicação
-- 3. Implemente as migrations no Entity Framework
-- 4. Adicione dados de casos reais

PRINT 'Database schema criado com sucesso!';
PRINT 'Próximos passos:';
PRINT '1. Configure a connection string na aplicação';
PRINT '2. Execute as migrations do Entity Framework';
PRINT '3. Adicione casos e evidências de exemplo';
PRINT '4. Configure o Azure Blob Storage para arquivos';
