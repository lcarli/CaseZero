using CaseZero.Core.Enums;

namespace CaseZero.Core.DTOs
{
    public class AnalysisDto
    {
        public int AnalysisId { get; set; }
        public int EvidenceId { get; set; }
        public int AnalyzedBy { get; set; }
        public DateTime AnalyzedAt { get; set; }
        public AnalysisStatus Status { get; set; }
        public string Results { get; set; } = string.Empty;
        public string ResultsEn { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public string NotesEn { get; set; } = string.Empty;
        public double ConfidenceLevel { get; set; }
        public string Tags { get; set; } = string.Empty;
        
        // Informations de base sans références circulaires
        public string EvidenceName { get; set; } = string.Empty;
        public string AnalyzerName { get; set; } = string.Empty;
    }
}
