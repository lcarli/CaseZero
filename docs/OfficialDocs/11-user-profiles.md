# 👤 Perfis de Usuário - CaseZero

O sistema de Perfis de Usuário do CaseZero gerencia diferentes tipos de usuários, suas permissões e organizações departamentais.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tipos de Usuário](#tipos-de-usuário)
- [Estrutura Departamental](#estrutura-departamental)
- [Sistema de Permissões](#sistema-de-permissões)
- [Gerenciamento de Perfis](#gerenciamento-de-perfis)
- [Configurações de Usuário](#configurações-de-usuário)

## 🎯 Visão Geral

O CaseZero implementa um sistema hierárquico de perfis que reflete a estrutura organizacional real das forças policiais, com diferentes níveis de acesso e responsabilidades.

### Características Principais

- **Hierarquia Policial**: Estrutura baseada na organização real
- **Permissões Granulares**: Controle detalhado de acesso
- **Departamentos**: Organização por unidades policiais
- **Especialidades**: Perfis específicos por área de atuação
- **Auditoria**: Rastreamento completo de ações por usuário

## 👮 Tipos de Usuário

### Administrador do Sistema
**Função**: Gerenciamento técnico da plataforma

**Responsabilidades**:
- Configurar sistema e parâmetros globais
- Gerenciar usuários e departamentos
- Monitorar performance e segurança
- Realizar backup e manutenção
- Configurar integrações e APIs

**Permissões Especiais**:
- Acesso total ao sistema
- Configurações de segurança
- Logs de auditoria completos
- Gestão de licenças e recursos

### Chefe de Departamento
**Função**: Liderança e supervisão departamental

**Responsabilidades**:
- Supervisionar equipe do departamento
- Aprovar investigações e recursos
- Distribuir casos entre investigadores
- Monitorar progresso de casos
- Gerar relatórios departamentais

**Permissões Especiais**:
- Visualizar todos os casos do departamento
- Atribuir e reatribuir casos
- Aprovar orçamentos de investigação
- Acessar relatórios de performance
- Gerenciar equipe departamental

### Investigador Sênior
**Função**: Condução de investigações complexas e mentoria

**Responsabilidades**:
- Liderar investigações de alta complexidade
- Orientar investigadores júnior
- Revisar relatórios e evidências
- Coordenar com outras unidades
- Treinar novos investigadores

**Permissões Especiais**:
- Acesso a casos sensíveis
- Aprovar solicitações de análise
- Supervisionar múltiplos casos
- Acessar histórico completo
- Revisar trabalho de equipe

### Investigador
**Função**: Condução de investigações regulares

**Responsabilidades**:
- Gerenciar casos atribuídos
- Coletar e analisar evidências
- Conduzir entrevistas e interrogatórios
- Elaborar relatórios de progresso
- Solicitar análises laboratoriais

**Permissões Especiais**:
- Criar e editar casos próprios
- Upload de evidências
- Solicitar análises forenses
- Gerar relatórios
- Acessar banco de dados

### Técnico de Laboratório
**Função**: Análises forenses especializadas

**Responsabilidades**:
- Executar análises técnicas
- Operar equipamentos especializados
- Elaborar laudos técnicos
- Manter equipamentos calibrados
- Gerenciar amostras e evidências

**Permissões Especiais**:
- Acessar sistema de laboratório
- Executar análises forenses
- Gerar laudos técnicos
- Gerenciar fila de análises
- Acessar base de dados técnica

### Estagiário
**Função**: Aprendizado e suporte supervisionado

**Responsabilidades**:
- Observar procedimentos investigativos
- Auxiliar em tarefas básicas
- Estudar casos históricos
- Participar de treinamentos
- Documentar aprendizados

**Permissões Especiais**:
- Visualizar casos supervisionados
- Acessar materiais de treinamento
- Fazer anotações pessoais
- Participar de simulações
- Acesso limitado e supervisionado

## 🏢 Estrutura Departamental

### Organização Hierárquica

```text
┌─────────────────────────────────────────────────────────┐
│ 🏛️ ESTRUTURA ORGANIZACIONAL                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🚔 DELEGACIA GERAL                                     │
│ └── 👑 Delegado Geral                                  │
│     ├── 📊 Coordenação de Operações                    │
│     ├── 💼 Administração                               │
│     └── 🎓 Treinamento e Desenvolvimento               │
│                                                         │
│ 🏢 DELEGACIAS ESPECIALIZADAS                           │
│ ├── 🔍 Delegacia de Homicídios (DHPP)                  │
│ │   ├── 👮‍♂️ Chefe: Delegado Titular                    │
│ │   ├── 🕵️ Investigadores Sêniores (3)                 │
│ │   ├── 🔎 Investigadores (8)                          │
│ │   └── 📚 Estagiários (2)                             │
│ │                                                       │
│ ├── 💰 Delegacia de Roubos (DR)                        │
│ │   ├── 👮‍♂️ Chefe: Delegado Titular                    │
│ │   ├── 🕵️ Investigadores Sêniores (2)                 │
│ │   ├── 🔎 Investigadores (6)                          │
│ │   └── 📚 Estagiários (1)                             │
│ │                                                       │
│ ├── 💻 Delegacia de Crimes Cibernéticos (DCC)         │
│ │   ├── 👮‍♂️ Chefe: Delegado Titular                    │
│ │   ├── 🕵️ Investigadores Sêniores (2)                 │
│ │   ├── 🔎 Investigadores (4)                          │
│ │   ├── 💻 Especialistas em TI (3)                     │
│ │   └── 📚 Estagiários (2)                             │
│ │                                                       │
│ └── 👥 Delegacia de Pessoas Desaparecidas (DPD)       │
│     ├── 👮‍♂️ Chefe: Delegado Titular                    │
│     ├── 🕵️ Investigadores Sêniores (2)                 │
│     ├── 🔎 Investigadores (5)                          │
│     └── 📚 Estagiários (1)                             │
│                                                         │
│ 🧪 INSTITUTO DE CRIMINALÍSTICA (IC)                    │
│ ├── 🔬 Diretor do Instituto                            │
│ ├── 🧬 Seção de Genética (3 técnicos)                  │
│ ├── 👆 Seção de Papiloscopia (4 técnicos)              │
│ ├── 🔫 Seção de Balística (2 técnicos)                 │
│ ├── 💊 Seção de Química (3 técnicos)                   │
│ └── 📱 Seção de Informática (4 técnicos)               │
│                                                         │
│ 💻 SUPORTE TÉCNICO                                     │
│ ├── 👨‍💻 Administrador de Sistema                        │
│ ├── 🛠️ Analistas de TI (2)                             │
│ └── 🎓 Suporte de Treinamento (1)                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Especialidades por Departamento

**Delegacia de Homicídios (DHPP)**:
- Investigação de homicídios dolosos
- Análise de cena de crime
- Coordenação com IML
- Casos de latrocínio

**Delegacia de Roubos (DR)**:
- Roubos a estabelecimentos comerciais
- Roubo de veículos
- Assaltos a transeuntes
- Organização criminosa

**Delegacia de Crimes Cibernéticos (DCC)**:
- Fraudes eletrônicas
- Invasão de sistemas
- Crimes virtuais
- Perícia digital

**Instituto de Criminalística (IC)**:
- Análises laboratoriais
- Perícias técnicas
- Laudos científicos
- Suporte técnico especializado

## 🔐 Sistema de Permissões

### Matriz de Acesso por Módulo

```text
┌─────────────────────────────────────────────────────────┐
│ 📊 MATRIZ DE PERMISSÕES POR MÓDULO                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Módulo                │ Admin │ Chefe │ Sr.Inv │ Inv │ Téc │ Est │
│ ─────────────────────┼───────┼───────┼────────┼─────┼─────┼─────┤
│ 👥 Gestão Usuários   │   ✅   │   🔧   │   ❌    │  ❌  │  ❌  │  ❌  │
│ 🏢 Departamentos     │   ✅   │   👁️   │   👁️    │  👁️  │  👁️  │  👁️  │
│ 📂 Casos - Criar     │   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 📂 Casos - Visualizar│   ✅   │   ✅   │   ✅    │  ✅  │  🔧  │  🔧  │
│ 📂 Casos - Editar    │   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 📂 Casos - Excluir   │   ✅   │   ✅   │   🔧    │  ❌  │  ❌  │  ❌  │
│ 🧩 Evidências - Upload│   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 🧩 Evidências - View │   ✅   │   ✅   │   ✅    │  ✅  │  ✅  │  🔧  │
│ 🧩 Evidências - Edit │   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 🧩 Evidências - Delete│   ✅   │   ✅   │   🔧    │  🔧  │  ❌  │  ❌  │
│ 🔬 Análises - Request│   ✅   │   ✅   │   ✅    │  ✅  │  ❌  │  ❌  │
│ 🔬 Análises - Execute│   ✅   │   ❌   │   ❌    │  ❌  │  ✅  │  ❌  │
│ 🔬 Análises - Review │   ✅   │   ✅   │   ✅    │  ✅  │  ✅  │  ❌  │
│ 📊 Relatórios - Gerar│   ✅   │   ✅   │   ✅    │  ✅  │  ✅  │  👁️  │
│ 📊 Relatórios - Admin│   ✅   │   ✅   │   👁️    │  👁️  │  👁️  │  ❌  │
│ ⚙️ Configurações     │   ✅   │   🔧   │   ❌    │  ❌  │  ❌  │  ❌  │
│ 📋 Logs de Auditoria │   ✅   │   👁️   │   ❌    │  ❌  │  ❌  │  ❌  │
│ 🎓 Treinamentos      │   ✅   │   ✅   │   ✅    │  ✅  │  ✅  │  ✅  │
│ 📱 Acesso Mobile     │   ✅   │   ✅   │   ✅    │  ✅  │  🔧  │  🔧  │
│ 🔑 Chaves API        │   ✅   │   ❌   │   ❌    │  ❌  │  ❌  │  ❌  │
│                                                         │
│ Legenda:                                                │
│ ✅ Acesso Total    🔧 Acesso Limitado                  │
│ 👁️ Apenas Leitura  ❌ Sem Acesso                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Permissões Especiais por Contexto

**Horários de Acesso**:
- Administradores: 24/7
- Chefes: 24/7 (com notificação)
- Investigadores: 06:00-22:00 (extensível)
- Técnicos: 08:00-18:00 (plantão sob demanda)
- Estagiários: 08:00-17:00 (apenas dias úteis)

**Localização de Acesso**:
- Rede interna: Todos os perfis
- VPN corporativa: Admin, Chefes, Investigadores
- Rede móvel: Apenas emergências (aprovação prévia)
- Redes externas: Bloqueado (exceto Admin)

## 👥 Gerenciamento de Perfis

### Interface de Administração

```text
┌─────────────────────────────────────────────────────────┐
│ 👥 GERENCIAMENTO DE USUÁRIOS                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔍 Buscar: [Maria Silva________________] [🔍 Buscar]    │
│ 🏢 Depto: [Todos ▼] 👤 Perfil: [Todos ▼] 📊 Status: [Ativo ▼] │
│                                                         │
│ ┌─ USUÁRIOS ENCONTRADOS (47) ─────────────────────────┐ │
│ │                                                     │ │
│ │ 👤 Detective Silva, Maria                           │ │
│ │ 📧 maria.silva@policia.gov.br                      │ │
│ │ 🏢 Delegacia de Homicídios (DHPP)                  │ │
│ │ 🎖️ Investigador Sênior | 🟢 Ativo                  │ │
│ │ 🕐 Último acesso: 2 horas atrás                     │ │
│ │ [ ✏️ Editar ] [ 🔐 Resetar Senha ] [ 📊 Relatório ] │ │
│ │                                                     │ │
│ │ ─────────────────────────────────────────────────── │ │
│ │                                                     │ │
│ │ 👤 Santos, João Carlos                              │ │
│ │ 📧 joao.santos@policia.gov.br                      │ │
│ │ 🏢 Instituto de Criminalística (IC)                │ │
│ │ 🎖️ Técnico de Laboratório | 🟢 Ativo               │ │
│ │ 🕐 Último acesso: 15 minutos atrás                  │ │
│ │ [ ✏️ Editar ] [ 🔐 Resetar Senha ] [ 📊 Relatório ] │ │
│ │                                                     │ │
│ │ ─────────────────────────────────────────────────── │ │
│ │                                                     │ │
│ │ 👤 Oliveira, Ana Beatriz                            │ │
│ │ 📧 ana.oliveira@policia.gov.br                     │ │
│ │ 🏢 Delegacia de Roubos (DR)                        │ │
│ │ 🎖️ Chefe de Departamento | 🟡 Licença              │ │
│ │ 🕐 Último acesso: 3 dias atrás                      │ │
│ │ [ ✏️ Editar ] [ 🔐 Resetar Senha ] [ 📊 Relatório ] │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [ ➕ Novo Usuário ] [ 📥 Importar CSV ] [ 📊 Relatório Geral ] │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Formulário de Criação/Edição

```text
┌─────────────────────────────────────────────────────────┐
│ ✏️ EDITAR PERFIL DE USUÁRIO                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📝 INFORMAÇÕES BÁSICAS                                 │
│ Nome Completo: [Maria Silva Santos__________________]   │
│ Email: [maria.silva@policia.gov.br__________________]   │
│ CPF: [123.456.789-00_______________________________]   │
│ Matrícula: [POL-2024-0156_________________________]     │
│                                                         │
│ 🏢 VÍNCULO ORGANIZACIONAL                              │
│ Departamento: [Delegacia de Homicídios (DHPP) ▼]       │
│ Função: [Investigador Sênior ▼]                        │
│ Chefia Imediata: [Delegado Titular - João Pedro ▼]     │
│ Data de Admissão: [15/03/2020_____]                    │
│                                                         │
│ 🔐 CONFIGURAÇÕES DE ACESSO                             │
│ Status: [🟢 Ativo ▼]                                   │
│ Perfil de Permissões: [Investigador Sênior ▼]          │
│ ☑️ Acesso ao sistema mobile                            │
│ ☑️ Notificações por email                              │
│ ☐ Acesso VPN autorizado                               │
│ ☑️ Pode trabalhar fora do horário                      │
│                                                         │
│ 🎯 ESPECIALIZAÇÕES                                     │
│ ☑️ Homicídios e Latrocínios                            │
│ ☑️ Análise de Cena de Crime                            │
│ ☐ Crimes Cibernéticos                                 │
│ ☐ Crimes Financeiros                                  │
│ ☑️ Coordenação de Equipes                              │
│                                                         │
│ 📞 CONTATO                                             │
│ Telefone: [(11) 99999-8888_______]                     │
│ Telefone Corporativo: [(11) 3333-4444_______]          │
│ Endereço: [Rua das Flores, 123_____________________]   │
│ Cidade: [São Paulo - SP________________________]       │
│                                                         │
│ [ 💾 Salvar Alterações ] [ ❌ Cancelar ] [ 🗑️ Excluir Usuário ] │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## ⚙️ Configurações de Usuário

### Painel de Configurações Pessoais

```text
┌─────────────────────────────────────────────────────────┐
│ ⚙️ CONFIGURAÇÕES PESSOAIS                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 👤 Usuário: Detective Maria Silva                       │
│ 📧 maria.silva@policia.gov.br                          │
│                                                         │
│ 🎨 APARÊNCIA                                           │
│ Tema: [🌙 Escuro ▼]                                     │
│ Idioma: [🇧🇷 Português (Brasil) ▼]                      │
│ Fuso Horário: [GMT-3 (Brasília) ▼]                     │
│ Tamanho da Fonte: [📝 Normal ▼]                        │
│                                                         │
│ 🔔 NOTIFICAÇÕES                                        │
│ ☑️ Novos casos atribuídos                              │
│ ☑️ Resultados de análises                              │
│ ☑️ Atualizações de evidências                          │
│ ☑️ Mensagens de supervisores                           │
│ ☐ Lembretes de relatórios                             │
│ ☑️ Alertas de segurança                                │
│                                                         │
│ Email: ☑️ Ativo  SMS: ☐ Inativo  Push: ☑️ Ativo        │
│                                                         │
│ 🔐 SEGURANÇA                                           │
│ Alterar Senha: [ 🔑 Alterar Senha ]                    │
│ Última alteração: 45 dias atrás ⚠️                     │
│                                                         │
│ Autenticação 2FA: ☑️ Ativo                             │
│ Método: Aplicativo (Google Authenticator)              │
│ [ 📱 Reconfigurar 2FA ]                                │
│                                                         │
│ Sessões Ativas: 2 dispositivos                         │
│ [ 👁️ Gerenciar Sessões ]                               │
│                                                         │
│ 📊 DASHBOARD PESSOAL                                   │
│ Layout padrão: [📊 Investigador ▼]                     │
│ ☑️ Mostrar estatísticas pessoais                       │
│ ☑️ Mostrar casos atribuídos                            │
│ ☑️ Mostrar análises pendentes                          │
│ ☐ Mostrar calendário de eventos                       │
│                                                         │
│ 📱 DISPOSITIVOS MÓVEIS                                 │
│ iPhone 13 Pro: 🟢 Autorizado                           │
│ iPad Air: 🟢 Autorizado                                │
│ [ ➕ Autorizar Novo Dispositivo ]                       │
│                                                         │
│ [ 💾 Salvar Configurações ] [ 🔄 Restaurar Padrões ]   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Histórico de Atividades

```text
┌─────────────────────────────────────────────────────────┐
│ 📋 HISTÓRICO DE ATIVIDADES                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 👤 Usuário: Detective Maria Silva                       │
│ 📅 Período: [Últimos 30 dias ▼]                        │
│                                                         │
│ 📊 RESUMO DO PERÍODO                                   │
│ • Total de logins: 47                                  │
│ • Casos trabalhados: 8                                 │
│ • Evidências enviadas: 23                              │
│ • Análises solicitadas: 12                             │
│ • Relatórios gerados: 5                                │
│ • Tempo online: 156h 23min                             │
│                                                         │
│ 🕐 ATIVIDADES RECENTES                                 │
│                                                         │
│ ⏰ Hoje, 09:15 | 🟢 LOGIN_SUCCESS                      │
│ 📱 Dispositivo: iPhone 13 Pro                          │
│ 📍 Local: Delegacia DHPP                               │
│                                                         │
│ ⏰ Hoje, 09:22 | 📂 CASE_ACCESS                        │
│ 📁 Caso: CASO-2024-0089 (Homicídio Bairro Centro)      │
│ 🎯 Ação: Visualização de evidências                    │
│                                                         │
│ ⏰ Hoje, 10:45 | 🧩 EVIDENCE_UPLOAD                    │
│ 📎 Arquivo: depoimento_testemunha_03.mp4 (45MB)        │
│ 📁 Caso: CASO-2024-0089                               │
│                                                         │
│ ⏰ Hoje, 11:30 | 🔬 ANALYSIS_REQUEST                   │
│ 🧪 Análise: Comparação de Impressões Digitais          │
│ 💰 Custo: €150                                         │
│                                                         │
│ ⏰ Ontem, 16:20 | 📊 REPORT_GENERATE                   │
│ 📄 Relatório: Progresso Semanal - Casos Ativos        │
│ 📁 Casos: 3 casos incluídos                            │
│                                                         │
│ ⏰ Ontem, 17:45 | 🔴 LOGOUT                            │
│ 📱 Dispositivo: Desktop - Estação de Trabalho          │
│ ⏱️ Sessão: 8h 25min                                    │
│                                                         │
│ [ 📄 Exportar Histórico ] [ 🔍 Filtros Avançados ]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

**Próximo**: [12-api-security.md](12-api-security.md) - Segurança da API

---


[**Retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
