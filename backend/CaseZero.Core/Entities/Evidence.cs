using CaseZero.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class Evidence
{
    public int EvidenceId { get; set; }
    
    public int CaseId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string EvidenceNumber { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(200)]
    public string? NameEn { get; set; }
    
    public string Description { get; set; } = string.Empty;
    public string? DescriptionEn { get; set; }
    
    public EvidenceType Type { get; set; }
    public EvidenceCategory Category { get; set; }
    
    [MaxLength(500)]
    public string? Location { get; set; }
    
    [MaxLength(500)]
    public string? LocationEn { get; set; }
    
    public DateTime CollectedAt { get; set; }
    
    [MaxLength(200)]
    public string? CollectedBy { get; set; }
    
    [MaxLength(200)]
    public string? CollectedByEn { get; set; }
    
    [MaxLength(1000)]
    public string? FilePath { get; set; }
    
    public string? Content { get; set; }
    public string? ContentEn { get; set; }
    
    public bool IsAvailable { get; set; } = true;
    public bool RequiresAnalysis { get; set; }
    
    [MaxLength(1000)]
    public string? Tags { get; set; }
    
    // Navigation properties
    public virtual Case Case { get; set; } = null!;
    public virtual ICollection<Analysis> Analyses { get; set; } = new List<Analysis>();
    public virtual ICollection<EvidenceViewed> EvidenceViews { get; set; } = new List<EvidenceViewed>();
}
