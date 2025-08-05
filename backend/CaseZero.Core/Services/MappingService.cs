using CaseZero.Core.DTOs;
using CaseZero.Core.Entities;

namespace CaseZero.Core.Services
{
    public static class MappingService
    {
        public static UserDto ToDto(User user)
        {
            return new UserDto
            {
                UserId = user.UserId,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role.ToString(),
                Department = user.Department,
                Avatar = user.Avatar,
                Badge = user.Badge
            };
        }

        public static CaseDto ToDto(Case caseEntity)
        {
            return new CaseDto
            {
                CaseId = caseEntity.CaseId,
                CaseNumber = caseEntity.CaseNumber,
                Title = caseEntity.Title,
                TitleEn = caseEntity.TitleEn,
                Description = caseEntity.Description,
                DescriptionEn = caseEntity.DescriptionEn,
                Type = caseEntity.Type,
                Difficulty = caseEntity.Difficulty,
                Status = caseEntity.Status,
                EstimatedTimeMinutes = caseEntity.EstimatedTimeMinutes,
                IsPublished = caseEntity.IsPublished,
                IsTutorial = caseEntity.IsTutorial,
                Location = caseEntity.Location,
                LocationEn = caseEntity.LocationEn,
                CreatedAt = caseEntity.CreatedAt,
                PublishedAt = caseEntity.PublishedAt,
                LastModifiedAt = caseEntity.LastModifiedAt,
                CreatedBy = caseEntity.CreatedBy,
                Tags = caseEntity.Tags,
                Solution = caseEntity.Solution,
                SolutionEn = caseEntity.SolutionEn,
                FilePath = caseEntity.FilePath
            };
        }

        public static EvidenceDto ToDto(Evidence evidence)
        {
            return new EvidenceDto
            {
                EvidenceId = evidence.EvidenceId,
                CaseId = evidence.CaseId,
                EvidenceNumber = evidence.EvidenceNumber,
                Name = evidence.Name,
                NameEn = evidence.NameEn,
                Description = evidence.Description,
                DescriptionEn = evidence.DescriptionEn,
                Type = evidence.Type,
                Category = evidence.Category,
                Location = evidence.Location,
                LocationEn = evidence.LocationEn,
                CollectedAt = evidence.CollectedAt,
                CollectedBy = evidence.CollectedBy,
                CollectedByEn = evidence.CollectedByEn,
                FilePath = evidence.FilePath,
                Content = evidence.Content,
                ContentEn = evidence.ContentEn,
                IsAvailable = evidence.IsAvailable,
                RequiresAnalysis = evidence.RequiresAnalysis,
                Tags = evidence.Tags,
                CaseNumber = evidence.Case?.CaseNumber ?? "",
                CaseTitle = evidence.Case?.Title ?? ""
            };
        }

        public static AnalysisDto ToDto(Analysis analysis)
        {
            return new AnalysisDto
            {
                AnalysisId = analysis.AnalysisId,
                EvidenceId = analysis.EvidenceId,
                AnalyzedBy = analysis.SessionId, // Utilisons SessionId comme AnalyzedBy pour maintenir la compatibilité
                AnalyzedAt = analysis.RequestedAt, // Utilisons RequestedAt comme AnalyzedAt
                Status = analysis.Status,
                Results = analysis.Result ?? "",
                ResultsEn = analysis.ResultEn ?? "",
                Notes = analysis.Notes ?? "",
                NotesEn = "", // Pas disponible dans l'entité
                ConfidenceLevel = 0.0, // Pas disponible dans l'entité
                Tags = "", // Pas disponible dans l'entité
                EvidenceName = analysis.Evidence?.Name ?? "",
                AnalyzerName = "" // Pas de relation directe avec User
            };
        }

        public static InvestigationSessionDto ToDto(InvestigationSession session)
        {
            return new InvestigationSessionDto
            {
                SessionId = session.SessionId,
                CaseId = session.CaseId,
                UserId = session.UserId,
                StartedAt = session.StartedAt,
                CompletedAt = session.EndedAt, // Utilisons EndedAt au lieu de CompletedAt
                Status = session.Status,
                ProgressPercentage = 0, // Pas disponible dans l'entité
                CurrentStep = 0, // Pas disponible dans l'entité  
                TotalSteps = 0, // Pas disponible dans l'entité
                Score = session.Score,
                HintsUsed = session.HintsUsed,
                Notes = session.Notes ?? "",
                LastAction = "", // Pas disponible dans l'entité
                LastActionAt = session.StartedAt, // Utilisons StartedAt par défaut
                CaseTitle = session.Case?.Title ?? "",
                UserName = session.User?.Username ?? "",
                UserBadge = session.User?.Badge ?? ""
            };
        }

        public static Evidence ToEntity(CreateEvidenceDto dto)
        {
            return new Evidence
            {
                CaseId = dto.CaseId,
                EvidenceNumber = dto.EvidenceNumber,
                Name = dto.Name,
                NameEn = dto.NameEn,
                Description = dto.Description,
                DescriptionEn = dto.DescriptionEn,
                Type = dto.Type,
                Category = dto.Category,
                Location = dto.Location,
                LocationEn = dto.LocationEn,
                CollectedAt = dto.CollectedAt,
                CollectedBy = dto.CollectedBy,
                CollectedByEn = dto.CollectedByEn,
                FilePath = dto.FilePath,
                Content = dto.Content,
                ContentEn = dto.ContentEn,
                IsAvailable = dto.IsAvailable,
                RequiresAnalysis = dto.RequiresAnalysis,
                Tags = dto.Tags
            };
        }

        public static void UpdateEntity(Evidence evidence, UpdateEvidenceDto dto)
        {
            evidence.Name = dto.Name;
            evidence.NameEn = dto.NameEn;
            evidence.Description = dto.Description;
            evidence.DescriptionEn = dto.DescriptionEn;
            evidence.Type = dto.Type;
            evidence.Category = dto.Category;
            evidence.Location = dto.Location;
            evidence.LocationEn = dto.LocationEn;
            evidence.CollectedBy = dto.CollectedBy;
            evidence.CollectedByEn = dto.CollectedByEn;
            evidence.FilePath = dto.FilePath;
            evidence.Content = dto.Content;
            evidence.ContentEn = dto.ContentEn;
            evidence.IsAvailable = dto.IsAvailable;
            evidence.RequiresAnalysis = dto.RequiresAnalysis;
            evidence.Tags = dto.Tags;
        }
    }
}
