# Game Design Document (GDD) – Case Zero

## 1. Informações Gerais

- **Nome do Projeto:** Case Zero
- **Gênero:** Simulador de Investigação Policial Realista
- **Plataforma:** Navegador (Desktop e Mobile)
- **Estilo de Arte:** Minimalista/Realista (foco na interface de sistemas e arquivos reais)
- **Público-Alvo:** Adultos e jovens adultos interessados em mistérios, investigação forense, lógica e storytelling baseado em evidências reais

## 2. Visão Geral do Jogo

O jogador assume o papel de um detetive digital encarregado de investigar casos policiais complexos. A jogabilidade é baseada na coleta, análise e cruzamento de informações — com ênfase em realismo. O objetivo final de cada caso é identificar corretamente o culpado e apresentar uma prova irrefutável, sem precisar descrever toda a narrativa dos fatos.

Não existem interrogatórios diretos: todas as informações são acessadas por meio de arquivos digitais, evidências físicas digitalizadas, laudos, vídeos, áudios, mensagens, sistemas de GPS e análise técnica forense.

## 3. Objetivos do Jogo

- Oferecer uma experiência imersiva de investigação baseada em lógica, intuição e análise de dados reais
- Estimular o raciocínio crítico e a atenção a detalhes
- Permitir a criação e expansão modular de novos casos com facilidade

## 4. Características Distintivas

- Ambiente que simula um "terminal policial" digital
- Provas digitais (vídeos, áudios, GPS, impressões digitais, etc.)
- Relatórios contraditórios, testemunhas mentirosas e pistas falsas
- Progresso não-linear: o jogador escolhe como abordar cada caso
- Final baseado em prova concreta e não em narrativa reconstituída

## 5. Mecânicas de Jogo

### 5.1 Receber o Caso

- O jogador recebe uma ordem do chefe da polícia
- Um briefing inicial apresenta o local, hora e natureza do incidente
- Acesso aos primeiros arquivos, relatórios e evidências

### 5.2 Análise e Investigação

- Navegar por arquivos: PDFs, laudos, fotos, vídeos, e-mails
- Ferramentas de busca e marcação
- Envio de evidências para análise forense (DNA, digitais, toxicológico)
- Ferramentas técnicas: triangulação de celular, GPS, OCR, reconhecimento facial
- Linha do tempo: reconstrução cronológica dos eventos
- Bloco de anotações: para hipóteses e organização das ideias

### 5.3 Acusação Final

- Jogador aponta o suspeito
- Escolhe uma prova concreta que justifique a acusação
- O sistema valida ou rejeita com base na lógica e evidência apresentada

## 6. Tipos de Evidência

| Tipo | Possibilidades de Resposta |
|------|---------------------------|
| Impressão digital | Match, inconclusiva, inexistente |
| DNA | Match, inconclusivo, múltiplos perfis |
| Vídeo | Confirmar presença, mostra arma, irrelevante |
| Áudio | Confissão, ameaça, conversa banal |
| Testemunha | Verídica, mentirosa, omissa |
| GPS / Celular | Confirma presença, contradiz álibi |
| Objeto físico | Evidência real, irrelevante, plantada |

## 7. Ferramentas Disponíveis

- **Leitor de arquivos:** visualização de documentos, anotações
- **Leitor de mídia:** áudio, vídeo com transcrição e zoom
- **Laboratório forense:** envio e retorno de análises
- **Timeline:** interface de reconstrução temporal
- **GPS/Triangulação:** mapa com localização aproximada por torres
- **Sistema de busca:** pesquisa por palavras-chave ou tags

## 8. Interface

A interface simula um sistema investigativo profissional, com janelas flutuantes, ícones funcionais e estética limpa. Tudo gira em torno da manipulação de arquivos e informações reais.

## 9. Personagens

- **Jogador:** Detetive anônimo (sem avatar)
- **Chefe de Polícia:** Fornece casos e orientações por memorandos
- **Suspeitos:** Comportamentos variados (mentem, omitem, colaboram)
- **Testemunhas:** Podem ser úteis, confusas ou enganosas

## 10. Estrutura de Casos

Cada caso é composto por:

- Briefing inicial (ordem oficial)
- Arquivos e materiais iniciais (nem sempre completos)
- Evidências desbloqueáveis com base na investigação
- Um culpado definido e uma prova irrefutável associada
- Possibilidades de erro, conclusões incorretas ou arquivamento

## 11. Progresso e Finais

O jogador pode:

- **Resolver corretamente o caso** (culpado + prova correta)
- **Acusar incorretamente** (recebe feedback negativo ou neutro)
- **Arquivar o caso** (se não conseguir provar nada)

O sistema valoriza não apenas o acerto, mas o processo de dedução.

## 12. Rejogabilidade

- Casos com múltiplos suspeitos
- Várias linhas de investigação possíveis
- Falsas pistas e distrações lógicas
- Possibilidade de adicionar novos casos sem alterar a engine principal

## 13. Roadmap (Simplificado)

| Fase | Descrição |
|------|-----------|
| Definição da lógica | Documentar ações, recursos e mecânicas |
| Protótipo da engine web | Simulação básica com arquivos navegáveis |
| Caso tutorial | Introdução leve com todas as mecânicas |
| Primeiro caso completo | Caso com múltiplos suspeitos e narrativa densa |
| Sistema de submissão e avaliação | Validação lógica com feedback |
| Ferramenta de criação de casos | Interface para novos criadores |

## 14. Considerações Finais

Este projeto é centrado na experiência investigativa realista. A ideia é criar uma base sólida e escalável para desenvolver dezenas de casos únicos, cada um com sua lógica, distrações, reviravoltas e soluções inteligentes. A diversão vem da descoberta e dedução, não da ação.

O sistema deve ser robusto, modular e expansível — tanto para jogadores quanto para criadores de conteúdo narrativo.

---

*Documento de Design do Jogo - Case Zero v1.0*