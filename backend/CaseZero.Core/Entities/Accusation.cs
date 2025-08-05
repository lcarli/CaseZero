using CaseZero.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class Accusation
{
    public int AccusationId { get; set; }
    
    public int SessionId { get; set; }
    public int UserId { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Accused { get; set; } = string.Empty;
    
    public string Justification { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? EvidenceUsed { get; set; }
    
    public AccusationStatus Status { get; set; }
    public bool IsCorrect { get; set; }
    
    public int PointsEarned { get; set; }
    
    public DateTime SubmittedAt { get; set; }
    public DateTime? ReviewedAt { get; set; }
    
    public string? Feedback { get; set; }
    public string? FeedbackEn { get; set; }
    
    // Navigation properties
    public virtual InvestigationSession Session { get; set; } = null!;
    public virtual User User { get; set; } = null!;
}
