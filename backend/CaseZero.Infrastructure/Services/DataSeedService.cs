using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CaseZero.Core.Entities;
using CaseZero.Core.Enums;
using CaseZero.Infrastructure.Data;

namespace CaseZero.Infrastructure.Services;

public interface IDataSeedService
{
    Task SeedDefaultDataAsync();
}

public class DataSeedService : IDataSeedService
{
    private readonly CaseZeroDbContext _context;
    private readonly IAuthService _authService;
    private readonly ILogger<DataSeedService> _logger;

    public DataSeedService(
        CaseZeroDbContext context,
        IAuthService authService,
        ILogger<DataSeedService> logger)
    {
        _context = context;
        _authService = authService;
        _logger = logger;
    }

    public async Task SeedDefaultDataAsync()
    {
        try
        {
            // Create default admin user if none exists
            await SeedDefaultAdminUserAsync();
            
            // Seed other default data...
            await SeedDefaultCasesAsync();
            
            _logger.LogInformation("Data seeding completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during data seeding");
            throw;
        }
    }

    private async Task SeedDefaultAdminUserAsync()
    {
        // Check if any admin user exists
        var adminExists = await _context.Users
            .AnyAsync(u => u.Role == UserRole.Administrator);

        if (!adminExists)
        {
            _logger.LogInformation("Creating default admin user");
            
            var adminUser = new User
            {
                Email = "admin@casezero.com",
                Username = "admin",
                PasswordHash = _authService.HashPassword("CaseZero123!"),
                FirstName = "System",
                LastName = "Administrator",
                Role = UserRole.Administrator,
                Status = UserStatus.Active,
                PreferredLanguage = Language.French,
                Department = "Administration",
                Badge = "ADM001",
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Default admin user created: {Email}", adminUser.Email);
        }
    }

    private async Task SeedDefaultCasesAsync()
    {
        // Check if any cases exist
        var casesExist = await _context.Cases.AnyAsync();

        if (!casesExist)
        {
            _logger.LogInformation("Creating sample tutorial case");

            var tutorialCase = new Case
            {
                CaseNumber = "TUTORIAL_001",
                Title = "O Roubo do Café",
                TitleEn = "The Coffee Shop Theft",
                Description = "Um caso simples para aprender as mecânicas básicas do jogo. Alguém roubou R$ 350 do caixa da cafeteria universitária.",
                DescriptionEn = "A simple case to learn the basic game mechanics. Someone stole $350 from the university cafeteria cash register.",
                Type = CaseType.Theft,
                Difficulty = CaseDifficulty.Tutorial,
                Status = CaseStatus.Open,
                EstimatedTimeMinutes = 15,
                IsPublished = true,
                IsTutorial = true,
                Location = "Cafeteria Central - Campus Universitário",
                LocationEn = "Central Cafeteria - University Campus",
                CreatedAt = DateTime.UtcNow,
                PublishedAt = DateTime.UtcNow,
                CreatedBy = "System",
                Tags = "tutorial,theft,university,cafeteria",
                Solution = "Maria Santos roubou R$ 350 do caixa da cafeteria durante o horário de pico. A evidência foi capturada pela câmera de segurança.",
                SolutionEn = "Maria Santos stole $350 from the cafeteria cash register during peak hours. Evidence was captured by security camera."
            };

            _context.Cases.Add(tutorialCase);
            await _context.SaveChangesAsync();

            // Add some evidence for the tutorial case
            var evidences = new List<Evidence>
            {
                new Evidence
                {
                    CaseId = tutorialCase.CaseId,
                    EvidenceNumber = "EV001",
                    Name = "Relatório Inicial do Gerente",
                    NameEn = "Manager's Initial Report",
                    Description = "Relatório da descoberta do roubo feito pela gerente Ana Oliveira",
                    DescriptionEn = "Report of the theft discovery made by manager Ana Oliveira",
                    Type = EvidenceType.Document,
                    Category = EvidenceCategory.Witness,
                    Location = "Cafeteria Central",
                    LocationEn = "Central Cafeteria",
                    CollectedAt = DateTime.UtcNow.AddHours(-2),
                    CollectedBy = "Detective Silva",
                    CollectedByEn = "Detective Silva",
                    IsAvailable = true,
                    RequiresAnalysis = false,
                    Tags = "report,manager,discovery"
                },
                new Evidence
                {
                    CaseId = tutorialCase.CaseId,
                    EvidenceNumber = "EV002",
                    Name = "Gravação de Segurança",
                    NameEn = "Security Camera Recording",
                    Description = "Vídeo da câmera de segurança mostrando atividade no caixa às 14h15",
                    DescriptionEn = "Security camera video showing activity at the cash register at 14:15",
                    Type = EvidenceType.Video,
                    Category = EvidenceCategory.Technical,
                    Location = "Câmera 02 - Área do Caixa",
                    LocationEn = "Camera 02 - Cash Register Area",
                    CollectedAt = DateTime.UtcNow.AddHours(-1),
                    CollectedBy = "Técnico Segurança",
                    CollectedByEn = "Security Technician",
                    IsAvailable = true,
                    RequiresAnalysis = true,
                    Tags = "video,security,cash,register"
                }
            };

            _context.Evidences.AddRange(evidences);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Tutorial case 'O Roubo do Café' created with evidence");
        }
    }
}
