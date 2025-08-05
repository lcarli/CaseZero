using CaseZero.Core.Enums;

namespace CaseZero.Core.Entities;

public class User
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public UserStatus Status { get; set; }
    public Language PreferredLanguage { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public string? Avatar { get; set; }
    public string? Department { get; set; }
    public string? Badge { get; set; }
    
    // Navigation properties
    public virtual ICollection<InvestigationSession> InvestigationSessions { get; set; } = new List<InvestigationSession>();
    public virtual ICollection<Accusation> Accusations { get; set; } = new List<Accusation>();
    public virtual ICollection<Achievement> Achievements { get; set; } = new List<Achievement>();
}
