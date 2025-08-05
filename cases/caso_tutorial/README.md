# Configurações do Caso Tutorial

Este arquivo contém as configurações específicas para o caso tutorial "O Roubo do Café".

## Estrutura dos Arquivos

### Arquivos Obrigatórios
- `info.json` - Metadados básicos do caso
- `briefing_pt.md` - Briefing em português 
- `briefing_en.md` - Briefing em inglês
- `evidence.json` - Todas as evidências, timeline e solução

### Arquivos Opcionais
- `config.json` - Configurações específicas (este arquivo)
- `hints.json` - Sistema de dicas
- `assets/` - Pasta para imagens, documentos, etc.

## Configurações Específicas

```json
{
  "tutorial_mode": true,
  "instant_analysis": true,
  "hints_enabled": true,
  "max_hints": 3,
  "difficulty": "easy",
  "estimated_time": "15-30 minutes",
  "required_tools": [
    "evidence_analysis",
    "timeline_reconstruction",
    "statement_comparison"
  ],
  "learning_objectives": [
    "Como navegar pela interface",
    "Como analisar evidências",
    "Como comparar depoimentos",
    "Como construir uma acusação"
  ]
}
```

## Sistema de Dicas

1. **Dica 1:** Compare os horários nos depoimentos
2. **Dica 2:** Preste atenção no comportamento descrito pelos outros
3. **Dica 3:** Quem tinha acesso E oportunidade?

## Critérios de Sucesso

O jogador deve:
1. Identificar corretamente Maria Santos como culpada
2. Apresentar evidência do depoimento de Pedro Costa
3. Explicar método (oportunidade durante rush) e motivo

## Feedback Personalizado

### Se acusar João Silva:
"João pagou com cartão e tem comprovante. Revise a evidência sobre métodos de pagamento."

### Se acusar Pedro Costa:  
"Pedro foi apenas uma testemunha. Observe o que ele relatou sobre o comportamento de outros."

### Se acusar Ana Oliveira:
"Ana foi quem descobriu e reportou o furto. Por que ela faria isso se fosse culpada?"

### Solução Correta:
"Excelente! Maria tinha acesso, oportunidade e seu comportamento nervoso foi observado por Pedro Costa durante o período crítico."
