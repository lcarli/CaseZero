using CaseZero.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class InvestigationSession
{
    public int SessionId { get; set; }
    
    public int UserId { get; set; }
    public int CaseId { get; set; }
    
    public DateTime StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    
    public SessionStatus Status { get; set; }
    
    public int Score { get; set; }
    public int HintsUsed { get; set; }
    public int EvidencesViewed { get; set; }
    public int AnalysesRequested { get; set; }
    
    public TimeSpan? TotalTime { get; set; }
    
    [MaxLength(500)]
    public string? Notes { get; set; }
    
    public string? SessionData { get; set; }
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Case Case { get; set; } = null!;
    public virtual ICollection<Accusation> Accusations { get; set; } = new List<Accusation>();
    public virtual ICollection<EvidenceViewed> EvidenceViews { get; set; } = new List<EvidenceViewed>();
    public virtual ICollection<Analysis> Analyses { get; set; } = new List<Analysis>();
}
