# 🗃️ Criação de Novos Casos – Case Zero

## 📁 Estrutura de Pastas para Casos

Cada novo caso deve ser criado em sua própria pasta dentro do diretório `/cases`. A estrutura deve seguir este padrão:

```
/cases/
  /caso_001/
    info.json               ← metadados do caso
    briefing_pt.md          ← briefing em português
    briefing_en.md          ← briefing em inglês
    briefing_fr.md          ← briefing em francês
    briefing_es.md          ← briefing em espanhol
    files/
      relatorio_pm.pdf
      foto_cena_1.jpg
      audio_testemunha.mp3
      video_camera04.mp4
      digital_mochila.jpg
    analysis/
      copo_residuo.json
      triangulacao_suspeitoA.json
    translations/
      files_pt.json
      files_en.json
      files_fr.json
      files_es.json
```

## 📄 info.json

Contém os dados estruturais do caso. O campo `proof_id` pode assumir três formatos distintos:

- **String**: apenas uma prova válida
- **Array de strings**: múltiplas provas possíveis
- **null**: o caso não tem solução conclusiva (inconclusivo)

### ✔️ Exemplo com uma única prova

```json
{
  "id": "caso_001",
  "title": {
    "pt": "O Enigma da Estação",
    "en": "The Station Enigma",
    "fr": "L'Énigme de la Gare",
    "es": "El Enigma de la Estación"
  },
  "culprit": "ricardo_vieira",
  "proof_id": "foto_cena_1.jpg",
  "available_analyses": ["digital_mochila.jpg", "copo_residuo", "triangulacao_suspeitoA"]
}
```

### ✔️ Exemplo com múltiplas provas corretas

```json
{
  "id": "caso_002",
  "title": {
    "pt": "A Testemunha Esquecida",
    "en": "The Forgotten Witness",
    "fr": "Le Témoin Oublié",
    "es": "El Testigo Olvidado"
  },
  "culprit": "joana_machado",
  "proof_id": ["audio_testemunha.mp3", "relatorio_dna.pdf"],
  "available_analyses": ["objeto_encontrado.jpg", "dna_no_copo"]
}
```

### 🟡 Exemplo de caso sem solução (inconclusivo)

```json
{
  "id": "caso_003",
  "title": {
    "pt": "O Lago Silencioso",
    "en": "The Silent Lake",
    "fr": "Le Lac Silencieux",
    "es": "El Lago Silencioso"
  },
  "culprit": null,
  "proof_id": null,
  "available_analyses": []
}
```

---

## 🧩 Passo a Passo para Criar um Novo Caso

1. **Criar a pasta do caso** com nome no formato `/cases/caso_00X`.
2. **Criar o arquivo `info.json`** com ID, título em 4 idiomas, suspeito culpado e ID do arquivo que contém a prova irrefutável.
3. **Escrever o briefing** em `.md` separado por idioma.
4. **Adicionar os arquivos digitais** (PDFs, imagens, áudios, vídeos) na subpasta `/files`.
5. **Criar os relatórios de análise** (se forem usados) e salvá-los em `/analysis` com formato `.json`.
6. **Criar os arquivos de tradução de arquivos** (`files_pt.json`, etc.) que contenham os títulos e descrições dos arquivos para exibição multilíngue.
7. **Testar o caso** no ambiente de desenvolvimento, verificando se o culpado e a prova estão corretamente registrados e se todos os arquivos são acessíveis.

---

> Todos os IDs de arquivos usados em `proof_id` ou `available_analyses` devem existir na pasta `/files` ou `/analysis`.
