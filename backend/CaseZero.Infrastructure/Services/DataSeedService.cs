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
            
            // Note: No cases are seeded by default anymore
            // Cases will be managed individually through the system
            
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
}
