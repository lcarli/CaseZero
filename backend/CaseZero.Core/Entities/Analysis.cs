using CaseZero.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class Analysis
{
    public int AnalysisId { get; set; }
    
    public int EvidenceId { get; set; }
    public int SessionId { get; set; }
    
    public AnalysisType Type { get; set; }
    public AnalysisStatus Status { get; set; }
    
    public DateTime RequestedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    
    public int EstimatedTimeMinutes { get; set; }
    
    public string? Result { get; set; }
    public string? ResultEn { get; set; }
    
    [MaxLength(200)]
    public string? RequestedBy { get; set; }
    
    [MaxLength(200)]
    public string? CompletedBy { get; set; }
    
    public string? Notes { get; set; }
    
    [MaxLength(1000)]
    public string? FilePath { get; set; }
    
    public int Cost { get; set; }
    
    // Navigation properties
    public virtual Evidence Evidence { get; set; } = null!;
    public virtual InvestigationSession Session { get; set; } = null!;
}
