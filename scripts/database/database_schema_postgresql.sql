-- =====================================================
-- Case Zero Database Schema - PostgreSQL Version
-- Criação das tabelas principais do jogo investigativo
-- Database: PostgreSQL
-- =====================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TIPOS ENUM
-- =====================================================

-- Enum para ranks de detetive
CREATE TYPE detective_rank AS ENUM (
    'Rookie', 'Detective', 'Sergeant', 'Lieutenant', 'Captain'
);

-- Enum para dificuldade de casos
CREATE TYPE case_difficulty AS ENUM (
    'Tutorial', 'Easy', 'Medium', 'Hard', 'Expert'
);

-- Enum para tipos de evidência
CREATE TYPE evidence_type AS ENUM (
    'Document', 'Photo', 'Audio', 'Video', 'PhysicalObject'
);

-- Enum para tipos de análise
CREATE TYPE analysis_type AS ENUM (
    'Fingerprint', 'DNA', 'Chemical', 'DigitalForensics', 'Ballistics', 'GpsTriangulation'
);

-- Enum para status de sessão
CREATE TYPE session_status AS ENUM (
    'Active', 'Completed', 'Abandoned', 'Failed'
);

-- Enum para status de análise
CREATE TYPE analysis_status AS ENUM (
    'Pending', 'InProgress', 'Completed', 'Failed'
);

-- =====================================================
-- TABELA: users (Jogadores/Detetives)
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rank detective_rank NOT NULL DEFAULT 'Rookie',
    cases_solved INTEGER NOT NULL DEFAULT 0,
    cases_failed INTEGER NOT NULL DEFAULT 0,
    total_play_time INTEGER NOT NULL DEFAULT 0, -- em minutos
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Índices para users
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_rank ON users(rank);

-- =====================================================
-- TABELA: cases (Casos Investigativos)
-- =====================================================
CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    briefing_text TEXT,
    difficulty case_difficulty NOT NULL DEFAULT 'Easy',
    culprit VARCHAR(100), -- NULL se inconclusivo
    proof_file_ids JSONB, -- Array JSON com IDs dos arquivos de prova
    estimated_time_minutes INTEGER,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by_user_id UUID -- Para casos criados por usuários
);

-- Índices para cases
CREATE INDEX idx_cases_case_number ON cases(case_number);
CREATE INDEX idx_cases_difficulty ON cases(difficulty);
CREATE INDEX idx_cases_is_published ON cases(is_published);

-- =====================================================
-- TABELA: evidence (Evidências)
-- =====================================================
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type evidence_type NOT NULL,
    file_size BIGINT NOT NULL DEFAULT 0,
    mime_type VARCHAR(100),
    title VARCHAR(200),
    description TEXT,
    is_key_evidence BOOLEAN NOT NULL DEFAULT FALSE,
    is_initially_visible BOOLEAN NOT NULL DEFAULT TRUE,
    unlock_conditions JSONB, -- JSON com condições para desbloquear
    metadata JSONB, -- JSON com metadados específicos
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- Índices para evidence
CREATE INDEX idx_evidence_case_id ON evidence(case_id);
CREATE INDEX idx_evidence_file_type ON evidence(file_type);
CREATE INDEX idx_evidence_is_key_evidence ON evidence(is_key_evidence);

-- =====================================================
-- TABELA: investigation_sessions (Sessões de Investigação)
-- =====================================================
CREATE TABLE investigation_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    case_id UUID NOT NULL,
    session_status session_status NOT NULL DEFAULT 'Active',
    evidence_reviewed JSONB, -- Array JSON com IDs das evidências revisadas
    notes TEXT,
    current_progress DECIMAL(5,2) DEFAULT 0.00, -- Progresso em % (0-100)
    hints_used INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    total_time_minutes INTEGER NOT NULL DEFAULT 0,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- Índices para investigation_sessions
CREATE INDEX idx_investigation_sessions_user_id ON investigation_sessions(user_id);
CREATE INDEX idx_investigation_sessions_case_id ON investigation_sessions(case_id);
CREATE INDEX idx_investigation_sessions_status ON investigation_sessions(session_status);
CREATE INDEX idx_investigation_sessions_last_activity ON investigation_sessions(last_activity_at);

-- =====================================================
-- TABELA: analysis_requests (Solicitações de Análise Forense)
-- =====================================================
CREATE TABLE analysis_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL,
    evidence_id UUID NOT NULL,
    analysis_type analysis_type NOT NULL,
    request_status analysis_status NOT NULL DEFAULT 'Pending',
    result_data JSONB, -- JSON com resultado da análise
    requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    processing_time_minutes INTEGER,
    cost DECIMAL(10,2) DEFAULT 0.00,
    
    FOREIGN KEY (session_id) REFERENCES investigation_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (evidence_id) REFERENCES evidence(id) ON DELETE CASCADE
);

-- Índices para analysis_requests
CREATE INDEX idx_analysis_requests_session_id ON analysis_requests(session_id);
CREATE INDEX idx_analysis_requests_evidence_id ON analysis_requests(evidence_id);
CREATE INDEX idx_analysis_requests_type ON analysis_requests(analysis_type);
CREATE INDEX idx_analysis_requests_status ON analysis_requests(request_status);

-- =====================================================
-- TABELA: timeline_events (Eventos da Linha do Tempo)
-- =====================================================
CREATE TABLE timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL,
    event_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    evidence_id UUID, -- Evidência relacionada (opcional)
    is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    is_key_event BOOLEAN NOT NULL DEFAULT FALSE,
    confidence DECIMAL(3,2) DEFAULT 0.50, -- Nível de confiança (0-1)
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    FOREIGN KEY (session_id) REFERENCES investigation_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (evidence_id) REFERENCES evidence(id) ON DELETE SET NULL
);

-- Índices para timeline_events
CREATE INDEX idx_timeline_events_session_id ON timeline_events(session_id);
CREATE INDEX idx_timeline_events_event_datetime ON timeline_events(event_datetime);
CREATE INDEX idx_timeline_events_event_type ON timeline_events(event_type);

-- =====================================================
-- TABELA: accusations (Acusações Finais)
-- =====================================================
CREATE TABLE accusations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL,
    suspect_name VARCHAR(100) NOT NULL,
    evidence_id UUID NOT NULL,
    reasoning TEXT,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    validated_at TIMESTAMP WITH TIME ZONE,
    validation_notes TEXT,
    
    FOREIGN KEY (session_id) REFERENCES investigation_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (evidence_id) REFERENCES evidence(id) ON DELETE RESTRICT
);

-- Índices para accusations
CREATE INDEX idx_accusations_session_id ON accusations(session_id);
CREATE INDEX idx_accusations_is_correct ON accusations(is_correct);
CREATE INDEX idx_accusations_submitted_at ON accusations(submitted_at);

-- =====================================================
-- TABELA: case_translations (Traduções dos Casos)
-- =====================================================
CREATE TABLE case_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL,
    language_code VARCHAR(5) NOT NULL, -- 'pt', 'en', 'fr', 'es'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    briefing_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
    UNIQUE (case_id, language_code)
);

-- Índices para case_translations
CREATE INDEX idx_case_translations_case_id ON case_translations(case_id);
CREATE INDEX idx_case_translations_language ON case_translations(language_code);

-- =====================================================
-- TABELA: evidence_translations (Traduções das Evidências)
-- =====================================================
CREATE TABLE evidence_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evidence_id UUID NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    title VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    FOREIGN KEY (evidence_id) REFERENCES evidence(id) ON DELETE CASCADE,
    UNIQUE (evidence_id, language_code)
);

-- Índices para evidence_translations
CREATE INDEX idx_evidence_translations_evidence_id ON evidence_translations(evidence_id);
CREATE INDEX idx_evidence_translations_language ON evidence_translations(language_code);

-- =====================================================
-- TABELA: game_settings (Configurações do Jogo)
-- =====================================================
CREATE TABLE game_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description VARCHAR(500),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by_user_id UUID
);

-- Inserir configurações padrão
INSERT INTO game_settings (setting_key, setting_value, description) VALUES
('analysis_delay_minutes', '5', 'Tempo padrão para análises forenses (em minutos)'),
('max_concurrent_analyses', '3', 'Máximo de análises simultâneas por usuário'),
('hint_cooldown_minutes', '10', 'Tempo entre dicas disponíveis'),
('session_timeout_minutes', '120', 'Timeout de sessão inativa'),
('supported_languages', '["pt", "en", "fr", "es"]', 'Idiomas suportados do jogo');

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View: Estatísticas de usuários
CREATE VIEW user_stats AS
SELECT 
    u.id,
    u.username,
    u.rank,
    u.cases_solved,
    u.cases_failed,
    CASE 
        WHEN (u.cases_solved + u.cases_failed) = 0 THEN 0 
        ELSE ROUND((u.cases_solved * 100.0) / (u.cases_solved + u.cases_failed), 2) 
    END AS success_rate,
    u.total_play_time,
    COUNT(s.id) AS active_sessions,
    u.last_login_at,
    u.created_at
FROM users u
LEFT JOIN investigation_sessions s ON u.id = s.user_id AND s.session_status = 'Active'
GROUP BY u.id, u.username, u.rank, u.cases_solved, u.cases_failed, u.total_play_time, u.last_login_at, u.created_at;

-- View: Resumo de casos
CREATE VIEW case_summary AS
SELECT 
    c.id,
    c.case_number,
    c.title,
    c.difficulty,
    c.is_published,
    COUNT(DISTINCT s.id) AS total_attempts,
    COUNT(DISTINCT CASE WHEN s.session_status = 'Completed' THEN s.id END) AS completed_attempts,
    COUNT(DISTINCT CASE WHEN a.is_correct = TRUE THEN s.id END) AS successful_solutions,
    CASE 
        WHEN COUNT(DISTINCT s.id) = 0 THEN 0 
        ELSE ROUND((COUNT(DISTINCT CASE WHEN a.is_correct = TRUE THEN s.id END) * 100.0) / COUNT(DISTINCT s.id), 2) 
    END AS success_rate,
    AVG(CASE WHEN s.session_status = 'Completed' THEN s.total_time_minutes END) AS avg_completion_time,
    c.created_at
FROM cases c
LEFT JOIN investigation_sessions s ON c.id = s.case_id
LEFT JOIN accusations a ON s.id = a.session_id
GROUP BY c.id, c.case_number, c.title, c.difficulty, c.is_published, c.created_at;

-- =====================================================
-- FUNCTIONS ÚTEIS
-- =====================================================

-- Function para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function para iniciar nova investigação
CREATE OR REPLACE FUNCTION start_new_investigation(p_user_id UUID, p_case_id UUID)
RETURNS UUID AS $$
DECLARE
    v_session_id UUID;
BEGIN
    -- Verificar se já existe sessão ativa
    IF EXISTS (
        SELECT 1 FROM investigation_sessions 
        WHERE user_id = p_user_id AND case_id = p_case_id AND session_status = 'Active'
    ) THEN
        RAISE EXCEPTION 'Já existe uma investigação ativa para este caso.';
    END IF;
    
    -- Criar nova sessão
    v_session_id := uuid_generate_v4();
    INSERT INTO investigation_sessions (id, user_id, case_id, session_status, started_at, last_activity_at)
    VALUES (v_session_id, p_user_id, p_case_id, 'Active', NOW(), NOW());
    
    RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- DADOS DE EXEMPLO/SEED
-- =====================================================

-- Usuário admin padrão
INSERT INTO users (username, email, password_hash, rank) VALUES
('admin', 'admin@casezero.com', 'hashed_password_here', 'Captain');

-- Caso tutorial
INSERT INTO cases (case_number, title, description, briefing_text, difficulty, culprit, is_published, published_at) VALUES
('CASE_TUTORIAL', 'Tutorial: O Roubo do Café', 
'Um caso simples para aprender as mecânicas básicas do jogo.',
'Detetive, alguém roubou o dinheiro do caixa da cafeteria. Sua missão é descobrir quem foi o culpado usando as evidências disponíveis.',
'Tutorial', 'João Silva', TRUE, NOW());

-- =====================================================
-- COMENTÁRIOS FINAIS
-- =====================================================

-- Este script cria uma estrutura completa para o jogo Case Zero em PostgreSQL
-- Utiliza as funcionalidades nativas do PostgreSQL:
-- - ENUMs para tipagem forte
-- - JSONB para dados flexíveis
-- - UUIDs para identificadores únicos
-- - Triggers automáticos para auditoria
-- - Views para relatórios
-- - Functions para lógica de negócio

SELECT 'Database schema PostgreSQL criado com sucesso!' as message;
