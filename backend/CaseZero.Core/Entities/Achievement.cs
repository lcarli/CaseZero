using System.ComponentModel.DataAnnotations;

namespace CaseZero.Core.Entities;

public class Achievement
{
    public int AchievementId { get; set; }
    
    public int UserId { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string AchievementType { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(200)]
    public string? TitleEn { get; set; }
    
    public string Description { get; set; } = string.Empty;
    public string? DescriptionEn { get; set; }
    
    public int Points { get; set; }
    
    public DateTime EarnedAt { get; set; }
    
    [MaxLength(200)]
    public string? IconPath { get; set; }
    
    public string? Metadata { get; set; }
    
    // Navigation properties
    public virtual User User { get; set; } = null!;
}
