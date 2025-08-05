using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class TimelineEvent
{
    public int EventId { get; set; }
    
    public int CaseId { get; set; }
    public int? LocationId { get; set; }
    
    public DateTime EventTime { get; set; }
    
    [Required]
    public string EventDescription { get; set; } = string.Empty;
    
    public string? EventDescriptionEn { get; set; }
    
    [MaxLength(500)]
    public string? PeopleInvolved { get; set; }
    
    [MaxLength(500)]
    public string? EvidenceReferences { get; set; }
    
    public bool IsPublic { get; set; } = true;
    public bool IsKeyEvent { get; set; }
    
    [MaxLength(1000)]
    public string? Notes { get; set; }
    
    // Navigation properties
    public virtual Case Case { get; set; } = null!;
    public virtual CaseLocation? Location { get; set; }
}
