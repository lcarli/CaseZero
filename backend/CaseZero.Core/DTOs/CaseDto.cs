using CaseZero.Core.Enums;

namespace CaseZero.Core.DTOs
{
    public class CaseDto
    {
        public int CaseId { get; set; }
        public string CaseNumber { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string TitleEn { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DescriptionEn { get; set; } = string.Empty;
        public CaseType Type { get; set; }
        public CaseDifficulty Difficulty { get; set; }
        public CaseStatus Status { get; set; }
        public int EstimatedTimeMinutes { get; set; }
        public bool IsPublished { get; set; }
        public bool IsTutorial { get; set; }
        public string Location { get; set; } = string.Empty;
        public string LocationEn { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? PublishedAt { get; set; }
        public DateTime? LastModifiedAt { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public string Tags { get; set; } = string.Empty;
        public string Solution { get; set; } = string.Empty;
        public string SolutionEn { get; set; } = string.Empty;
        public string? FilePath { get; set; }
    }
}
