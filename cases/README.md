# 📂 Repositório de Casos - Case Zero

Este diretório contém todos os casos do jogo, organizados de forma estruturada para facilitar o desenvolvimento, teste e manutenção.

## 📁 Estrutura de Diretórios

```
cases/
├── 📖 README.md                    # Este arquivo
├── 📋 TEMPLATE.md                  # Template para novos casos
├── 🎓 caso_tutorial/               # Caso de tutorial
│   ├── info.json                   # Metadados do caso
│   ├── briefing_pt.md             # Briefing em português
│   ├── briefing_en.md             # Briefing em inglês
│   ├── evidence.json              # Evidências, timeline e solução
│   ├── README.md                  # Documentação específica
│   └── assets/                    # Imagens, documentos, etc.
├── 🔍 caso_001/                    # Primeiro caso oficial
│   └── ... (estrutura similar)
├── 🔍 caso_002/                    # Segundo caso oficial
│   └── ... (estrutura similar)
└── 🎲 templates/                   # Templates para diferentes tipos de caso
    ├── basic-theft/               # Template: furto básico
    ├── complex-fraud/             # Template: fraude complexa
    └── murder-investigation/      # Template: investigação de homicídio
```

## 📋 Padrão de Arquivos por Caso

Cada caso deve seguir esta estrutura obrigatória:

### Arquivos Obrigatórios
- `info.json` - Metadados básicos (ID, nome, dificuldade, etc.)
- `briefing_pt.md` - Briefing completo em português
- `briefing_en.md` - Briefing completo em inglês  
- `evidence.json` - Base de dados completa do caso
- `README.md` - Documentação técnica do caso

### Arquivos Opcionais
- `config.json` - Configurações específicas do caso
- `hints.json` - Sistema de dicas
- `assets/` - Pasta para arquivos de mídia
- `validation.json` - Regras de validação customizadas

## 🎯 Tipos de Casos

### 🎓 Tutorial
- **Objetivo:** Ensinar mecânicas básicas
- **Dificuldade:** Muito fácil
- **Duração:** 15-30 minutos
- **Características:** Dicas abundantes, análises instantâneas

### 🟢 Básico
- **Objetivo:** Casos simples para iniciantes
- **Dificuldade:** Fácil
- **Duração:** 30-60 minutos
- **Características:** Poucos suspeitos, evidências claras

### 🟡 Intermediário  
- **Objetivo:** Casos com complexidade moderada
- **Dificuldade:** Médio
- **Duração:** 1-2 horas
- **Características:** Múltiplas teorias, red herrings

### 🔴 Avançado
- **Objetivo:** Casos complexos para experts
- **Dificuldade:** Difícil
- **Duração:** 2-4 horas
- **Características:** Muitas evidências, plots complexos

### ⚫ Expert
- **Objetivo:** Desafio máximo
- **Dificuldade:** Extremo
- **Duração:** 4+ horas
- **Características:** Casos reais adaptados, alta complexidade

## 🔧 Convenções de Nomenclatura

### IDs de Casos
- `TUTORIAL_XXX` - Casos tutoriais
- `BASIC_XXX` - Casos básicos
- `INTER_XXX` - Casos intermediários  
- `ADV_XXX` - Casos avançados
- `EXP_XXX` - Casos expert

### Nomes de Arquivos
- Sempre em minúsculas
- Usar underscores para separar palavras
- Exemplo: `caso_tutorial`, `roubo_banco_central`

### IDs de Evidências
- Formato: `EVID_XXX` onde XXX é sequencial
- Exemplo: `EVID_001`, `EVID_002`

### IDs de Locais
- Formato: `LOC_XXX` onde XXX é sequencial
- Exemplo: `LOC_001`, `LOC_002`

## ✅ Checklist para Novos Casos

Antes de considerar um caso finalizado, verifique:

### 📝 Documentação
- [ ] `info.json` preenchido corretamente
- [ ] Briefing em português e inglês
- [ ] README.md técnico criado
- [ ] Metadados de dificuldade e tempo estimado

### 🔍 Evidências
- [ ] Pelo menos 5 evidências principais
- [ ] Timeline cronológica consistente
- [ ] Locais mapeados corretamente
- [ ] Solução única e lógica

### 🎯 Gameplay  
- [ ] Múltiplos suspeitos plausíveis
- [ ] Red herrings balanceados
- [ ] Dicas progressivas (se aplicável)
- [ ] Feedback personalizado para acusações erradas

### 🌐 Localização
- [ ] Textos em português e inglês
- [ ] Nomes culturalmente apropriados
- [ ] Referências locais compreensíveis

### 🧪 Qualidade
- [ ] Testado por pelo menos 2 pessoas
- [ ] Ortografia e gramática revisadas
- [ ] Lógica de investigação validada
- [ ] Balanceamento de dificuldade

## 🚀 Como Criar um Novo Caso

1. **Copiar template:** Use `templates/basic-theft/` como base
2. **Definir premissa:** Crime, local, personagens principais
3. **Criar timeline:** Sequência lógica dos eventos
4. **Desenvolver evidências:** Pistas, documentos, depoimentos
5. **Testar lógica:** Verificar se a solução é única
6. **Escrever briefing:** Apresentação atrativa do caso
7. **Implementar no sistema:** JSON e validações
8. **Testar com usuários:** Pelo menos 2 pessoas diferentes
9. **Refinar e polir:** Ajustar baseado no feedback
10. **Documentar:** README.md completo

## 📊 Métricas de Casos

Para cada caso, acompanhamos:
- **Taxa de conclusão** - % de jogadores que completam
- **Tempo médio** - Duração real vs estimada  
- **Taxa de acerto** - % que acusa corretamente
- **Uso de dicas** - Quantas dicas são usadas
- **Satisfação** - Rating dos jogadores

---

**💡 Dica:** Comece sempre criando a solução primeiro, depois construa as evidências que levam a ela. Isso garante consistência lógica!
