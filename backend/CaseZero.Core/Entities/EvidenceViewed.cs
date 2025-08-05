using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class EvidenceViewed
{
    public int ViewId { get; set; }
    
    public int SessionId { get; set; }
    public int EvidenceId { get; set; }
    
    public DateTime ViewedAt { get; set; }
    public TimeSpan TimeSpent { get; set; }
    
    [MaxLength(500)]
    public string? Notes { get; set; }
    
    public bool WasAnalyzed { get; set; }
    
    // Navigation properties
    public virtual InvestigationSession Session { get; set; } = null!;
    public virtual Evidence Evidence { get; set; } = null!;
}
