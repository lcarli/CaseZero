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
                CaseNumber = "CASE-TUTORIAL-001",
                Title = "Vol de Tableau - Cas d'Introduction",
                TitleEn = "Painting Theft - Tutorial Case",
                Description = "Un tableau de valeur a été volé du musée local. Analysez les preuves et résolvez cette enquête d'introduction.",
                DescriptionEn = "A valuable painting has been stolen from the local museum. Analyze the evidence and solve this introductory investigation.",
                Type = CaseType.Theft,
                Difficulty = CaseDifficulty.Tutorial,
                Status = CaseStatus.Open,
                EstimatedTimeMinutes = 30,
                IsPublished = true,
                IsTutorial = true,
                Location = "Musée des Beaux-Arts",
                LocationEn = "Fine Arts Museum",
                CreatedAt = DateTime.UtcNow,
                PublishedAt = DateTime.UtcNow,
                CreatedBy = "System",
                Tags = "tutorial,theft,art,beginner",
                Solution = "Le gardien de nuit était complice. Les indices comprennent ses empreintes sur le cadre et sa présence non autorisée dans la galerie.",
                SolutionEn = "The night guard was an accomplice. Evidence includes his fingerprints on the frame and unauthorized presence in the gallery."
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
                    Name = "Empreintes digitales sur le cadre",
                    NameEn = "Fingerprints on frame",
                    Description = "Empreintes relevées sur le cadre du tableau volé",
                    DescriptionEn = "Fingerprints found on the stolen painting's frame",
                    Type = EvidenceType.Physical,
                    Category = EvidenceCategory.Scene,
                    Location = "Galerie principale",
                    LocationEn = "Main gallery",
                    CollectedAt = DateTime.UtcNow.AddHours(-2),
                    CollectedBy = "Technicien Legrand",
                    CollectedByEn = "Technician Legrand",
                    IsAvailable = true,
                    RequiresAnalysis = true,
                    Tags = "fingerprints,frame,physical"
                },
                new Evidence
                {
                    CaseId = tutorialCase.CaseId,
                    EvidenceNumber = "EV002",
                    Name = "Enregistrement vidéo surveillance",
                    NameEn = "CCTV recording",
                    Description = "Vidéo de surveillance montrant les mouvements dans le musée",
                    DescriptionEn = "Surveillance video showing movements in the museum",
                    Type = EvidenceType.Video,
                    Category = EvidenceCategory.Technical,
                    Location = "Centre de sécurité",
                    LocationEn = "Security center",
                    CollectedAt = DateTime.UtcNow.AddHours(-1),
                    CollectedBy = "Agent Dubois",
                    CollectedByEn = "Officer Dubois",
                    IsAvailable = true,
                    RequiresAnalysis = false,
                    Tags = "video,surveillance,digital"
                }
            };

            _context.Evidences.AddRange(evidences);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Sample tutorial case created with evidence");
        }
    }
}
