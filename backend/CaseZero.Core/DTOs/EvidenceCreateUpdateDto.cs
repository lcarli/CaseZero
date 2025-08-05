using CaseZero.Core.Enums;

namespace CaseZero.Core.DTOs
{
    public class CreateEvidenceDto
    {
        public int CaseId { get; set; }
        public string EvidenceNumber { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string NameEn { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DescriptionEn { get; set; } = string.Empty;
        public EvidenceType Type { get; set; }
        public EvidenceCategory Category { get; set; }
        public string Location { get; set; } = string.Empty;
        public string LocationEn { get; set; } = string.Empty;
        public DateTime CollectedAt { get; set; }
        public string CollectedBy { get; set; } = string.Empty;
        public string CollectedByEn { get; set; } = string.Empty;
        public string? FilePath { get; set; }
        public string? Content { get; set; }
        public string? ContentEn { get; set; }
        public bool IsAvailable { get; set; } = true;
        public bool RequiresAnalysis { get; set; } = false;
        public string Tags { get; set; } = string.Empty;
    }

    public class UpdateEvidenceDto
    {
        public string Name { get; set; } = string.Empty;
        public string NameEn { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DescriptionEn { get; set; } = string.Empty;
        public EvidenceType Type { get; set; }
        public EvidenceCategory Category { get; set; }
        public string Location { get; set; } = string.Empty;
        public string LocationEn { get; set; } = string.Empty;
        public string CollectedBy { get; set; } = string.Empty;
        public string CollectedByEn { get; set; } = string.Empty;
        public string? FilePath { get; set; }
        public string? Content { get; set; }
        public string? ContentEn { get; set; }
        public bool IsAvailable { get; set; }
        public bool RequiresAnalysis { get; set; }
        public string Tags { get; set; } = string.Empty;
    }
}
