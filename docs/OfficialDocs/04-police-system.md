# 🏛️ Sistema Policial - CaseZero

## 📋 Visão Geral

O Sistema Policial é a interface principal do CaseZero, projetada para simular um ambiente realista de investigação criminal. Esta documentação detalha todos os módulos, componentes e funcionalidades disponíveis para investigadores durante suas investigações.

## 🎯 Objetivo do Sistema

O Sistema Policial foi desenvolvido para:

- **Simular** um ambiente policial realista
- **Treinar** habilidades de investigação
- **Gerenciar** casos e evidências de forma organizada
- **Controlar** recursos e tempo de investigação
- **Facilitar** a tomada de decisões investigativas

## 🏗️ Arquitetura da Interface

### 📊 Layout Principal

```text
┌─────────────────────────────────────────────────────────┐
│                    Header Policial                     │
│  👮 Investigador    🕐 Relógio    💰 Orçamento    ⚙️    │
├─────────────────────────────────────────────────────────┤
│ 📋 Menu Navigation                                      │
│  🏠 Dashboard | 📂 Casos | 🔬 Laboratório | 📊 Relatórios │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                  Conteúdo Principal                     │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │    Módulo       │  │    Módulo       │              │
│  │   Principal     │  │   Secundário    │              │
│  └─────────────────┘  └─────────────────┘              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    Status Bar                           │
│  🟢 Online | 📡 Conectado | 💾 Salvo | ⏰ Última Ação   │
└─────────────────────────────────────────────────────────┘
```

## 🧩 Módulos do Sistema

### 🏠 Dashboard Principal

O dashboard é a tela inicial após o login, fornecendo uma visão geral da situação atual do investigador.

#### Componentes do Dashboard

##### Painel de Status

- **Casos Ativos**: Lista dos casos em andamento
- **Análises Pendentes**: Evidências aguardando resultados
- **Orçamento Disponível**: Recursos financeiros restantes
- **Tempo de Investigação**: Cronômetro do caso atual

##### Notificações

- **Resultados Prontos**: Análises concluídas
- **Prazos**: Deadlines próximos
- **Alertas**: Situações que requerem atenção
- **Mensagens**: Comunicações da equipe

##### Acesso Rápido

- **Último Caso**: Continuar investigação anterior
- **Nova Evidência**: Upload rápido de arquivos
- **Relatório Express**: Gerar resumo atual
- **Configurações**: Ajustes pessoais

### 📂 Gerenciador de Casos

Sistema centralizado para visualizar, criar e gerenciar casos de investigação.

#### Interface de Casos

##### Lista de Casos

```text
┌─────────────────────────────────────────────────────────┐
│ 🔍 Filtros: [ Todos ] [ Ativos ] [ Concluídos ] [ ... ] │
├─────────────────────────────────────────────────────────┤
│ 📋 CASO-001 | Vol de Tableau Museu                      │
│ Status: 🟡 Em Andamento | Prioridade: 🔴 Alta          │
│ Criado: 01/08/2025 | Prazo: 15/08/2025               │
│ Investigador: Det. Silva | Orçamento: €5,000           │
│ ───────────────────────────────────────────────────────  │
│ 📋 CASO-002 | Fraude Financeira                        │
│ Status: 🟢 Novo | Prioridade: 🟡 Média                 │
│ Criado: 03/08/2025 | Prazo: 20/08/2025               │
│ Investigador: Det. Costa | Orçamento: €3,000           │
└─────────────────────────────────────────────────────────┘
```

##### Detalhes do Caso

- **Informações Básicas**: Título, descrição, prioridade
- **Timeline**: Cronologia dos eventos
- **Suspeitos**: Lista e perfis dos envolvidos
- **Evidências**: Arquivos e materiais coletados
- **Análises**: Resultados laboratoriais
- **Notas**: Anotações do investigador

### 🔬 Sistema de Laboratório

Interface para gerenciar análises forenses e seus resultados.

#### Módulos de Análise

**Laboratório Digital**
- **Análise de Vídeo**: Processamento de câmeras de segurança
- **Análise de Áudio**: Exame de gravações
- **Recuperação de Dados**: Dispositivos digitais danificados
- **Análise de Metadados**: Informações ocultas em arquivos

**Laboratório Físico**
- **Impressões Digitais**: Comparação e identificação
- **DNA**: Análise genética de amostras
- **Balística**: Exame de armas e projéteis
- **Toxicologia**: Análise de substâncias

**Interface de Solicitação**
```text
┌─────────────────────────────────────────────────────────┐
│ 🔬 Nova Análise                                         │
├─────────────────────────────────────────────────────────┤
│ Evidência: [📄 camera_evidence_001.mp4         ▼]      │
│ Tipo:      [🎥 Análise de Vídeo                ▼]      │
│ Lab:       [💻 Laboratório Digital              ▼]      │
│ Prioridade:[🟡 Normal                           ▼]      │
│ ───────────────────────────────────────────────────────  │
│ 💰 Custo: €200                                         │
│ ⏱️ Tempo: 2 horas                                       │
│ 👨‍🔬 Técnico: Dr. Martins (Digital)                     │
│ ───────────────────────────────────────────────────────  │
│ 📝 Observações:                                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Analisar movimento entre 14:30-15:00              │ │
│ │ Focar na entrada principal do museu                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [ 🚫 Cancelar ]              [ ✅ Solicitar Análise ] │
└─────────────────────────────────────────────────────────┘
```

### ⏰ Sistema de Tempo

Módulo especializado para controlar o fluxo temporal da investigação.

#### Controles de Tempo

**Relógio Principal**
- **Hora Atual**: Display digital da hora do jogo
- **Data**: Calendário da investigação
- **Velocidade**: Controle de aceleração temporal
- **Pausa**: Pausar o tempo para análise

**Controles de Velocidade**
```text
┌─────────────────────────────────────────┐
│ 🕐 14:30:45 | 📅 05/08/2025           │
├─────────────────────────────────────────┤
│ Velocidade: [1x][2x][4x][8x][16x]      │
│ ⏸️ Pausar | ⏩ Acelerar | ⏪ Normal    │
├─────────────────────────────────────────┤
│ ⏱️ Próximo Evento: Resultado DNA       │
│ 🕒 Em: 1h 30min (Tempo Real: 6min)    │
└─────────────────────────────────────────┘
```

**Eventos Temporais**
- **Análises em Andamento**: Progresso das análises
- **Deadlines**: Prazos importantes
- **Eventos Programados**: Reuniões, entrevistas
- **Notificações**: Alertas baseados em tempo

### 📊 Centro de Relatórios

Sistema para gerar, visualizar e exportar relatórios de investigação.

#### Tipos de Relatórios

**Relatório de Progresso**
- Status atual da investigação
- Evidências coletadas e analisadas
- Suspeitos identificados
- Próximos passos recomendados

**Relatório Financeiro**
- Orçamento inicial vs. gasto
- Custos por categoria (análises, recursos)
- Projeção de gastos futuros
- Aprovações necessárias

**Relatório Técnico**
- Resultados detalhados das análises
- Metodologias utilizadas
- Conclusões técnicas
- Recomendações especializadas

**Relatório Final**
- Resumo completo do caso
- Evidências conclusivas
- Identificação do culpado
- Fundamentação legal

### 🗂️ Gerenciador de Evidências

Sistema especializado para organizar e categorizar evidências.

#### Organização de Evidências

**Categorias**
- **Físicas**: Objetos, amostras, impressões
- **Digitais**: Vídeos, fotos, documentos
- **Testemunhais**: Depoimentos, entrevistas
- **Documentais**: Contratos, registros, certidões

**Interface de Upload**
```text
┌─────────────────────────────────────────────────────────┐
│ 📎 Upload de Evidência                                  │
├─────────────────────────────────────────────────────────┤
│ 📁 Arrastar arquivos aqui ou [ 📎 Selecionar Arquivos ] │
│ ───────────────────────────────────────────────────────  │
│ 🏷️ Etiqueta: [EVID-001                        ]        │
│ 📂 Categoria: [Física                          ▼]      │
│ 🏢 Local: [Museu - Entrada Principal           ▼]      │
│ 📅 Data: [05/08/2025] ⏰ Hora: [14:30]                │
│ 👮 Coletado por: [Det. Silva                   ▼]      │
│ ───────────────────────────────────────────────────────  │
│ 📝 Descrição:                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Pegada encontrada próxima à vitrine quebrada      │ │
│ │ Tamanho aproximado: 42                             │ │
│ │ Tipo de calçado: Tênis esportivo                   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [ 🚫 Cancelar ]                [ ✅ Salvar Evidência ] │
└─────────────────────────────────────────────────────────┘
```

**Visualização de Evidências**
- **Grid View**: Miniaturas organizadas
- **List View**: Lista detalhada
- **Timeline View**: Organização temporal
- **Map View**: Localização geográfica

### 👥 Gerenciador de Suspeitos

Sistema para catalogar e gerenciar informações sobre suspeitos.

#### Perfil do Suspeito

**Informações Pessoais**
- Nome completo e aliases
- Foto e descrição física
- Documentos e registros
- Histórico criminal

**Relacionamentos**
- Conexões com outros suspeitos
- Relacionamentos familiares
- Associações profissionais
- Histórico de contatos

**Evidências Relacionadas**
- Evidências que implicam o suspeito
- Álibis fornecidos
- Contradições identificadas
- Análises confirmatórias

## 🎮 Funcionalidades Interativas

### 🎯 Sistema de Decisões

**Árvore de Decisões**
- Escolhas que afetam o curso da investigação
- Consequências das decisões tomadas
- Múltiplos caminhos investigativos
- Feedback sobre escolhas

**Exemplo de Decisão**
```text
┌─────────────────────────────────────────────────────────┐
│ 🤔 Decisão Investigativa                                │
├─────────────────────────────────────────────────────────┤
│ Você encontrou DNA em duas evidências diferentes.      │
│ O orçamento só permite analisar uma delas agora.       │
│                                                         │
│ Qual evidência priorizar?                              │
│                                                         │
│ 🧬 [ A ] Cabelo encontrado na cena do crime            │
│     💰 Custo: €150 | ⏱️ Tempo: 4h | 🎯 Precisão: 95%  │
│                                                         │
│ 🧬 [ B ] Sangue na roupa do suspeito                   │
│     💰 Custo: €200 | ⏱️ Tempo: 6h | 🎯 Precisão: 98%  │
│                                                         │
│ 🧬 [ C ] Aguardar mais orçamento                       │
│     💰 Custo: €0 | ⏱️ Tempo: +24h | 🎯 Risco: Alto    │
│                                                         │
│ [ ❌ Cancelar ]           [ ✅ Confirmar Escolha ]      │
└─────────────────────────────────────────────────────────┘
```

### 🎲 Sistema de Aleatoriedade

**Eventos Aleatórios**
- Descobertas inesperadas
- Complicações na investigação
- Oportunidades especiais
- Variações nos resultados

**Fatores de Incerteza**
- Precisão das análises
- Disponibilidade de recursos
- Cooperação de testemunhas
- Pressão temporal

## 🔧 Configurações do Sistema

### ⚙️ Preferências do Usuário

**Interface**
- Tema visual (claro/escuro)
- Densidade de informações
- Idioma da interface
- Atalhos de teclado

**Gameplay**
- Velocidade padrão do tempo
- Nível de dificuldade
- Assistentes automáticos
- Notificações

**Notificações**
- Tipos de alertas
- Frequência de notificações
- Sons e vibrações
- Horários de silêncio

### 📱 Responsividade

**Desktop** (1920x1080+)
- Layout completo com todos os painéis
- Múltiplas janelas simultâneas
- Drag & drop avançado
- Atalhos de teclado

**Tablet** (768x1024)
- Layout adaptado com abas
- Navegação por gestos
- Interface touch otimizada
- Painéis colapsáveis

**Mobile** (375x667)
- Interface simplificada
- Navegação por menu
- Funcionalidades essenciais
- Sincronização com desktop

## 🎨 Design System

### 🎨 Paleta de Cores

**Cores Principais**
- **Azul Policial**: `#1E40AF` - Elementos oficiais
- **Vermelho Urgente**: `#DC2626` - Alertas e prioridades
- **Verde Sucesso**: `#16A34A` - Confirmações e conclusões
- **Amarelo Atenção**: `#D97706` - Avisos e pendências
- **Cinza Neutro**: `#6B7280` - Informações secundárias

**Estados de Interface**
- **Hover**: Escurecimento 10%
- **Active**: Escurecimento 20%
- **Disabled**: Opacidade 50%
- **Focus**: Borda azul com sombra

### 🔤 Tipografia

**Hierarquia Textual**
- **H1**: Títulos de página (24px, Bold)
- **H2**: Seções principais (20px, Semi-bold)
- **H3**: Subsections (18px, Medium)
- **Body**: Texto normal (16px, Regular)
- **Caption**: Legendas (14px, Regular)
- **Small**: Texto auxiliar (12px, Regular)

### 🧩 Componentes

**Buttons**
- Primary: Ações principais
- Secondary: Ações secundárias  
- Ghost: Ações sutis
- Danger: Ações destrutivas

**Cards**
- Elevation shadows
- Rounded corners (8px)
- Hover animations
- Loading states

**Forms**
- Validation states
- Helper text
- Required indicators
- Error messages

## 📊 Métricas e Analytics

### 📈 KPIs do Sistema

**Performance do Usuário**
- Taxa de resolução de casos
- Tempo médio de investigação
- Precisão das decisões
- Eficiência de recursos

**Uso do Sistema**
- Módulos mais utilizados
- Tempo por sessão
- Funcionalidades preferidas
- Pontos de abandono

**Qualidade da Experiência**
- Satisfação do usuário
- Facilidade de uso
- Tempo de aprendizado
- Taxa de erros

### 📊 Dashboard de Analytics

```text
┌─────────────────────────────────────────────────────────┐
│ 📊 Analytics do Investigador                            │
├─────────────────────────────────────────────────────────┤
│ 🎯 Taxa de Sucesso: 87% (▲ 5% vs mês anterior)         │
│ ⏱️ Tempo Médio: 4.2h por caso (▼ 0.8h vs média)        │
│ 💰 Eficiência: €850/caso (▼ €150 vs orçamento)         │
│ 🏆 Ranking: #12 de 150 investigadores                  │
├─────────────────────────────────────────────────────────┤
│ 📈 Progresso Semanal:                                  │
│ Cases: ████████░░ 8/10                                 │
│ Quality: ███████░░░ 7/10                               │
│ Speed: ██████████ 10/10                                │
│ Budget: █████░░░░░ 5/10                                │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Segurança e Privacidade

### 🛡️ Controles de Acesso

**Níveis de Permissão**
- **Investigador**: Acesso a casos próprios
- **Supervisor**: Visualização de equipe
- **Administrador**: Controle total
- **Forense**: Acesso a laboratórios

**Auditoria**
- Log de todas as ações
- Rastreamento de alterações
- Histórico de acessos
- Relatórios de segurança

### 🔒 Proteção de Dados

**Criptografia**
- Dados em trânsito (TLS 1.3)
- Dados em repouso (AES-256)
- Senhas hasheadas (BCrypt)
- Tokens seguros (JWT)

**Privacidade**
- Anonimização de dados sensíveis
- Controle de retenção
- Direito ao esquecimento
- Compliance LGPD/GDPR

## 🚀 Performance e Otimização

### ⚡ Otimizações Implementadas

**Frontend**
- Lazy loading de componentes
- Memoização de cálculos pesados
- Virtual scrolling para listas grandes
- Service Worker para cache

**Backend**
- Connection pooling
- Query optimization
- Caching estratégico
- Async processing

### 📱 Compatibilidade

**Navegadores Suportados**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Dispositivos**
- Desktop (Windows, Mac, Linux) ✅
- Tablet (iOS, Android) ✅
- Mobile (iOS, Android) ⚠️ (Limitado)

## 📚 Próximos Passos

Após compreender o Sistema Policial:

1. [**Sistema de Tempo**](./05-time-system.md) - Mecânicas temporais detalhadas
2. [**Análise de Evidências**](./06-evidence-analysis.md) - Sistema forense completo
3. [**Manual do Investigador**](./25-investigator-manual.md) - Guia prático de uso
4. [**Tutoriais Interativos**](./27-interactive-tutorials.md) - Treinamento passo a passo

## 🆘 Suporte

Para dúvidas sobre o Sistema Policial:

1. Consulte o [Manual do Investigador](./25-investigator-manual.md)
2. Verifique os [Problemas Comuns](./28-common-issues.md)
3. Acesse o [FAQ](./29-faq.md)
4. Entre em contato com [Suporte Técnico](./30-technical-support.md)

---


[**Retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
