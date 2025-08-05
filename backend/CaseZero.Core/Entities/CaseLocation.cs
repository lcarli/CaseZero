using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class CaseLocation
{
    public int LocationId { get; set; }
    
    public int CaseId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string LocationCode { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(200)]
    public string? NameEn { get; set; }
    
    public string Description { get; set; } = string.Empty;
    public string? DescriptionEn { get; set; }
    
    public bool HasCameraAccess { get; set; }
    
    [MaxLength(100)]
    public string? AccessLevel { get; set; }
    
    [MaxLength(100)]
    public string? AccessLevelEn { get; set; }
    
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    
    [MaxLength(500)]
    public string? ImagePath { get; set; }
    
    // Navigation properties
    public virtual Case Case { get; set; } = null!;
    public virtual ICollection<TimelineEvent> TimelineEvents { get; set; } = new List<TimelineEvent>();
}
