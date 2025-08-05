using System.Text.Json.Serialization;

namespace CaseZero.Core.Models;

/// <summary>
/// Estrutura completa de um caso investigativo baseado em arquivo JSON
/// </summary>
public class CaseStructure
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public MultiLanguageText Title { get; set; } = new();

    [JsonPropertyName("description")]
    public MultiLanguageText Description { get; set; } = new();

    [JsonPropertyName("briefing")]
    public MultiLanguageText Briefing { get; set; } = new();

    [JsonPropertyName("culprit")]
    public string? Culprit { get; set; }

    [JsonPropertyName("proof_id")]
    public ProofId? ProofId { get; set; }

    [JsonPropertyName("available_analyses")]
    public List<AvailableAnalysis> AvailableAnalyses { get; set; } = new();

    [JsonPropertyName("files")]
    public List<CaseFile> Files { get; set; } = new();

    [JsonPropertyName("metadata")]
    public CaseMetadata Metadata { get; set; } = new();

    [JsonPropertyName("validation")]
    public CaseValidation? Validation { get; set; }
}

/// <summary>
/// Texto em múltiplos idiomas
/// </summary>
public class MultiLanguageText
{
    [JsonPropertyName("pt")]
    public string Pt { get; set; } = string.Empty;

    [JsonPropertyName("en")]
    public string En { get; set; } = string.Empty;

    [JsonPropertyName("fr")]
    public string Fr { get; set; } = string.Empty;

    [JsonPropertyName("es")]
    public string Es { get; set; } = string.Empty;

    /// <summary>
    /// Obtém o texto no idioma especificado, com fallback para português
    /// </summary>
    public string GetText(string language)
    {
        return language.ToLower() switch
        {
            "en" => !string.IsNullOrEmpty(En) ? En : Pt,
            "fr" => !string.IsNullOrEmpty(Fr) ? Fr : Pt,
            "es" => !string.IsNullOrEmpty(Es) ? Es : Pt,
            _ => Pt
        };
    }
}

/// <summary>
/// ID da prova - pode ser string única ou array de strings
/// </summary>
public class ProofId
{
    [JsonPropertyName("single")]
    public string? Single { get; set; }

    [JsonPropertyName("multiple")]
    public List<string>? Multiple { get; set; }

    public bool IsMultiple => Multiple != null && Multiple.Count > 0;
    public bool HasProof => !string.IsNullOrEmpty(Single) || (Multiple?.Count > 0);
}

/// <summary>
/// Análise disponível para um item
/// </summary>
public class AvailableAnalysis
{
    [JsonPropertyName("item_id")]
    public string ItemId { get; set; } = string.Empty;

    [JsonPropertyName("analysis_type")]
    public string AnalysisType { get; set; } = string.Empty;

    [JsonPropertyName("cost")]
    public int Cost { get; set; }

    [JsonPropertyName("time_hours")]
    public int TimeHours { get; set; }

    [JsonPropertyName("required_lab")]
    public string RequiredLab { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public MultiLanguageText Description { get; set; } = new();
}

/// <summary>
/// Arquivo do caso (documento, imagem, áudio, vídeo)
/// </summary>
public class CaseFile
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty; // document, image, audio, video

    [JsonPropertyName("filename")]
    public string Filename { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public MultiLanguageText Title { get; set; } = new();

    [JsonPropertyName("description")]
    public MultiLanguageText Description { get; set; } = new();

    [JsonPropertyName("content")]
    public MultiLanguageText? Content { get; set; }

    [JsonPropertyName("transcription")]
    public MultiLanguageText? Transcription { get; set; }

    [JsonPropertyName("dependencies")]
    public List<FileDependency> Dependencies { get; set; } = new();

    [JsonPropertyName("is_evidence")]
    public bool IsEvidence { get; set; } = true;

    [JsonPropertyName("tags")]
    public List<string> Tags { get; set; } = new();
}

/// <summary>
/// Dependência de um arquivo
/// </summary>
public class FileDependency
{
    [JsonPropertyName("action")]
    public string Action { get; set; } = string.Empty; // collect, request_analysis, review_report

    [JsonPropertyName("item_id")]
    public string? ItemId { get; set; }

    [JsonPropertyName("analysis_type")]
    public string? AnalysisType { get; set; }

    [JsonPropertyName("status")]
    public string Status { get; set; } = "pending"; // pending, ok

    [JsonPropertyName("description")]
    public MultiLanguageText Description { get; set; } = new();
}

/// <summary>
/// Metadados do caso
/// </summary>
public class CaseMetadata
{
    [JsonPropertyName("difficulty")]
    public int Difficulty { get; set; } = 1; // 1-5

    [JsonPropertyName("estimated_time")]
    public int EstimatedTime { get; set; } = 30; // minutes

    [JsonPropertyName("tags")]
    public List<string> Tags { get; set; } = new();

    [JsonPropertyName("creation_date")]
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("author")]
    public string Author { get; set; } = string.Empty;

    [JsonPropertyName("version")]
    public string Version { get; set; } = "1.0";
}

/// <summary>
/// Validação do caso
/// </summary>
public class CaseValidation
{
    [JsonPropertyName("required_evidence")]
    public List<string> RequiredEvidence { get; set; } = new();

    [JsonPropertyName("optional_evidence")]
    public List<string> OptionalEvidence { get; set; } = new();

    [JsonPropertyName("red_herrings")]
    public List<string> RedHerrings { get; set; } = new();

    [JsonPropertyName("minimum_evidence_count")]
    public int MinimumEvidenceCount { get; set; } = 1;
}
