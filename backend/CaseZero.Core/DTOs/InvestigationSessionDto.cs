using CaseZero.Core.Enums;

namespace CaseZero.Core.DTOs
{
    public class InvestigationSessionDto
    {
        public int SessionId { get; set; }
        public int CaseId { get; set; }
        public int UserId { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public SessionStatus Status { get; set; }
        public int ProgressPercentage { get; set; }
        public int CurrentStep { get; set; }
        public int TotalSteps { get; set; }
        public int Score { get; set; }
        public int HintsUsed { get; set; }
        public string Notes { get; set; } = string.Empty;
        public string LastAction { get; set; } = string.Empty;
        public DateTime LastActionAt { get; set; }
        
        // Informations de base sans références circulaires
        public string CaseTitle { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserBadge { get; set; } = string.Empty;
    }
}
