# 🗄️ Guia de Setup do Banco de Dados - Case Zero

## 📋 Visão Geral

Este documento explica como configurar o banco de dados para o Case Zero, incluindo scripts SQL e configuração do Entity Framework Core.

## 🎯 Opções de Banco de Dados

### 1. Azure SQL Database (Recomendado para produção)
- ✅ Totalmente gerenciado
- ✅ Backup automático
- ✅ Escalabilidade
- ✅ Integração perfeita com Azure

### 2. PostgreSQL (Alternativa open-source)
- ✅ Gratuito
- ✅ JSONB nativo
- ✅ Performance excelente
- ✅ ENUMs nativos

## 🚀 Setup Inicial

### Passo 1: Escolher o Script
```bash
# Para Azure SQL Database / SQL Server
database_schema.sql

# Para PostgreSQL  
database_schema_postgresql.sql
```

### Passo 2: Executar o Script

#### Azure SQL Database:
```bash
# Via Azure CLI
az sql db query --server your-server --database CaseZero --file database_schema.sql

# Via SQL Server Management Studio
# Conecte ao Azure SQL e execute o script diretamente
```

#### PostgreSQL Local:
```bash
# Via psql
psql -U postgres -d casezero -f database_schema_postgresql.sql

# Via pgAdmin
# Conecte e execute o script na query tool
```

## 🏗️ Estrutura das Tabelas

### Tabelas Principais:
1. **`users`** - Jogadores/detetives
2. **`cases`** - Casos investigativos
3. **`evidence`** - Evidências dos casos
4. **`investigation_sessions`** - Sessões de investigação
5. **`analysis_requests`** - Solicitações de análise forense
6. **`timeline_events`** - Eventos da linha do tempo
7. **`accusations`** - Acusações finais
8. **`case_translations`** - Traduções dos casos
9. **`evidence_translations`** - Traduções das evidências
10. **`game_settings`** - Configurações globais

### Views Úteis:
- **`user_stats`** - Estatísticas dos jogadores
- **`case_summary`** - Resumo dos casos

## 📊 Dados de Exemplo

Os scripts já incluem:
- ✅ Usuário admin padrão
- ✅ Caso tutorial básico
- ✅ Configurações padrão do jogo

## 🔗 Connection Strings

### Azure SQL Database:
```csharp
"DefaultConnection": "Server=tcp:your-server.database.windows.net,1433;Initial Catalog=CaseZero;Persist Security Info=False;User ID=your-username;Password=your-password;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
```

### PostgreSQL:
```csharp
"DefaultConnection": "Host=localhost;Database=casezero;Username=postgres;Password=your-password;Port=5432;"
```

## 🛠️ Próximos Passos

1. ✅ Execute o script SQL apropriado
2. ⏭️ Configure o Entity Framework (próximo arquivo)
3. ⏭️ Crie as entidades C#
4. ⏭️ Configure a API ASP.NET Core
5. ⏭️ Configure o Azure Blob Storage para arquivos

## 🔧 Troubleshooting

### Erro de Conexão:
- Verifique se o firewall do Azure SQL permite sua IP
- Confirme usuário e senha
- Teste conectividade com Azure Data Studio

### Erro de Permissões:
- Usuário precisa de permissões CREATE TABLE
- Para Azure SQL: considere usar SQL Admin

### Performance:
- Scripts já incluem índices otimizados
- Para produção: considere particionamento por data
- Monitore query plans para otimizações futuras

## 📈 Monitoramento

### Métricas Importantes:
- Número de sessões ativas
- Tempo médio de resolução por caso
- Taxa de sucesso dos jogadores
- Evidências mais acessadas

### Queries Úteis:
```sql
-- Sessões ativas agora
SELECT COUNT(*) FROM investigation_sessions WHERE session_status = 'Active';

-- Top 10 casos mais populares
SELECT c.title, COUNT(s.id) as attempts 
FROM cases c 
LEFT JOIN investigation_sessions s ON c.id = s.case_id 
GROUP BY c.title 
ORDER BY attempts DESC 
LIMIT 10;

-- Taxa de sucesso geral
SELECT 
    COUNT(CASE WHEN a.is_correct = 1 THEN 1 END) * 100.0 / COUNT(*) as success_rate
FROM accusations a;
```

---

**⏭️ Próximo:** Configuração do Entity Framework Core e entidades C#
