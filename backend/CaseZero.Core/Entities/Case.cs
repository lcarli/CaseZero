using CaseZero.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class Case
{
    public int CaseId { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string CaseNumber { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(200)]
    public string? TitleEn { get; set; }
    
    public string Description { get; set; } = string.Empty;
    public string? DescriptionEn { get; set; }
    
    public CaseType Type { get; set; }
    public CaseDifficulty Difficulty { get; set; }
    public CaseStatus Status { get; set; }
    
    public int EstimatedTimeMinutes { get; set; }
    public bool IsPublished { get; set; }
    public bool IsTutorial { get; set; }
    
    [MaxLength(500)]
    public string? Location { get; set; }
    
    [MaxLength(500)]
    public string? LocationEn { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime? PublishedAt { get; set; }
    public DateTime? LastModifiedAt { get; set; }
    
    [MaxLength(200)]
    public string? CreatedBy { get; set; }
    
    [MaxLength(1000)]
    public string? Tags { get; set; }
    
    public string? Solution { get; set; }
    public string? SolutionEn { get; set; }
    
    [MaxLength(500)]
    public string? FilePath { get; set; }
    
    // Navigation properties
    public virtual ICollection<Evidence> Evidences { get; set; } = new List<Evidence>();
    public virtual ICollection<CaseLocation> CaseLocations { get; set; } = new List<CaseLocation>();
    public virtual ICollection<InvestigationSession> InvestigationSessions { get; set; } = new List<InvestigationSession>();
    public virtual ICollection<TimelineEvent> TimelineEvents { get; set; } = new List<TimelineEvent>();
}
