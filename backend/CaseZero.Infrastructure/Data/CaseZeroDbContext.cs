using Microsoft.EntityFrameworkCore;
using CaseZero.Core.Entities;
using CaseZero.Core.Enums;

namespace CaseZero.Infrastructure.Data;

public class CaseZeroDbContext : DbContext
{
    public CaseZeroDbContext(DbContextOptions<CaseZeroDbContext> options) : base(options)
    {
    }

    // DbSets
    public DbSet<User> Users { get; set; }
    public DbSet<Case> Cases { get; set; }
    public DbSet<Evidence> Evidences { get; set; }
    public DbSet<InvestigationSession> InvestigationSessions { get; set; }
    public DbSet<Accusation> Accusations { get; set; }
    public DbSet<Analysis> Analyses { get; set; }
    public DbSet<CaseLocation> CaseLocations { get; set; }
    public DbSet<TimelineEvent> TimelineEvents { get; set; }
    public DbSet<EvidenceViewed> EvidenceViews { get; set; }
    public DbSet<Achievement> Achievements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure entity relationships and constraints
        ConfigureUserEntity(modelBuilder);
        ConfigureCaseEntity(modelBuilder);
        ConfigureEvidenceEntity(modelBuilder);
        ConfigureInvestigationSessionEntity(modelBuilder);
        ConfigureAccusationEntity(modelBuilder);
        ConfigureAnalysisEntity(modelBuilder);
        ConfigureCaseLocationEntity(modelBuilder);
        ConfigureTimelineEventEntity(modelBuilder);
        ConfigureEvidenceViewedEntity(modelBuilder);
        ConfigureAchievementEntity(modelBuilder);
    }

    private void ConfigureUserEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId);
            entity.Property(e => e.UserId).ValueGeneratedOnAdd();
            
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
            
            entity.Property(e => e.Username).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
            entity.Property(e => e.PasswordHash).HasMaxLength(255).IsRequired();
            entity.Property(e => e.FirstName).HasMaxLength(100).IsRequired();
            entity.Property(e => e.LastName).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Avatar).HasMaxLength(500);
            entity.Property(e => e.Department).HasMaxLength(100);
            entity.Property(e => e.Badge).HasMaxLength(50);
            
            entity.Property(e => e.Role).HasConversion<int>();
            entity.Property(e => e.Status).HasConversion<int>();
            entity.Property(e => e.PreferredLanguage).HasConversion<int>();
            
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });
    }

    private void ConfigureCaseEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Case>(entity =>
        {
            entity.HasKey(e => e.CaseId);
            entity.Property(e => e.CaseId).ValueGeneratedOnAdd();
            
            entity.HasIndex(e => e.CaseNumber).IsUnique();
            
            entity.Property(e => e.Type).HasConversion<int>();
            entity.Property(e => e.Difficulty).HasConversion<int>();
            entity.Property(e => e.Status).HasConversion<int>();
            
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.IsPublished).HasDefaultValue(false);
            entity.Property(e => e.IsTutorial).HasDefaultValue(false);
        });
    }

    private void ConfigureEvidenceEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Evidence>(entity =>
        {
            entity.HasKey(e => e.EvidenceId);
            entity.Property(e => e.EvidenceId).ValueGeneratedOnAdd();
            
            entity.HasIndex(e => new { e.CaseId, e.EvidenceNumber }).IsUnique();
            
            entity.Property(e => e.Type).HasConversion<int>();
            entity.Property(e => e.Category).HasConversion<int>();
            
            entity.Property(e => e.IsAvailable).HasDefaultValue(true);
            entity.Property(e => e.RequiresAnalysis).HasDefaultValue(false);
            
            entity.HasOne(e => e.Case)
                  .WithMany(c => c.Evidences)
                  .HasForeignKey(e => e.CaseId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private void ConfigureInvestigationSessionEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<InvestigationSession>(entity =>
        {
            entity.HasKey(e => e.SessionId);
            entity.Property(e => e.SessionId).ValueGeneratedOnAdd();
            
            entity.Property(e => e.Status).HasConversion<int>();
            entity.Property(e => e.Score).HasDefaultValue(0);
            entity.Property(e => e.HintsUsed).HasDefaultValue(0);
            entity.Property(e => e.EvidencesViewed).HasDefaultValue(0);
            entity.Property(e => e.AnalysesRequested).HasDefaultValue(0);
            
            entity.HasOne(s => s.User)
                  .WithMany(u => u.InvestigationSessions)
                  .HasForeignKey(s => s.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(s => s.Case)
                  .WithMany(c => c.InvestigationSessions)
                  .HasForeignKey(s => s.CaseId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private void ConfigureAccusationEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Accusation>(entity =>
        {
            entity.HasKey(e => e.AccusationId);
            entity.Property(e => e.AccusationId).ValueGeneratedOnAdd();
            
            entity.Property(e => e.Status).HasConversion<int>();
            entity.Property(e => e.IsCorrect).HasDefaultValue(false);
            entity.Property(e => e.PointsEarned).HasDefaultValue(0);
            
            entity.HasOne(a => a.Session)
                  .WithMany(s => s.Accusations)
                  .HasForeignKey(a => a.SessionId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(a => a.User)
                  .WithMany(u => u.Accusations)
                  .HasForeignKey(a => a.UserId)
                  .OnDelete(DeleteBehavior.NoAction);
        });
    }

    private void ConfigureAnalysisEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Analysis>(entity =>
        {
            entity.HasKey(e => e.AnalysisId);
            entity.Property(e => e.AnalysisId).ValueGeneratedOnAdd();
            
            entity.Property(e => e.Type).HasConversion<int>();
            entity.Property(e => e.Status).HasConversion<int>();
            entity.Property(e => e.Cost).HasDefaultValue(0);
            
            entity.HasOne(a => a.Evidence)
                  .WithMany(e => e.Analyses)
                  .HasForeignKey(a => a.EvidenceId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(a => a.Session)
                  .WithMany(s => s.Analyses)
                  .HasForeignKey(a => a.SessionId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private void ConfigureCaseLocationEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CaseLocation>(entity =>
        {
            entity.HasKey(e => e.LocationId);
            entity.Property(e => e.LocationId).ValueGeneratedOnAdd();
            
            entity.HasIndex(e => new { e.CaseId, e.LocationCode }).IsUnique();
            
            entity.Property(e => e.HasCameraAccess).HasDefaultValue(false);
            entity.Property(e => e.Latitude).HasPrecision(10, 7);
            entity.Property(e => e.Longitude).HasPrecision(10, 7);
            
            entity.HasOne(l => l.Case)
                  .WithMany(c => c.CaseLocations)
                  .HasForeignKey(l => l.CaseId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private void ConfigureTimelineEventEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TimelineEvent>(entity =>
        {
            entity.HasKey(e => e.EventId);
            entity.Property(e => e.EventId).ValueGeneratedOnAdd();
            
            entity.Property(e => e.IsPublic).HasDefaultValue(true);
            entity.Property(e => e.IsKeyEvent).HasDefaultValue(false);
            
            entity.HasOne(t => t.Case)
                  .WithMany(c => c.TimelineEvents)
                  .HasForeignKey(t => t.CaseId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(t => t.Location)
                  .WithMany(l => l.TimelineEvents)
                  .HasForeignKey(t => t.LocationId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }

    private void ConfigureEvidenceViewedEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EvidenceViewed>(entity =>
        {
            entity.HasKey(e => e.ViewId);
            entity.Property(e => e.ViewId).ValueGeneratedOnAdd();
            
            entity.Property(e => e.WasAnalyzed).HasDefaultValue(false);
            
            entity.HasOne(ev => ev.Session)
                  .WithMany(s => s.EvidenceViews)
                  .HasForeignKey(ev => ev.SessionId)
                  .OnDelete(DeleteBehavior.Cascade);
                  
            entity.HasOne(ev => ev.Evidence)
                  .WithMany(e => e.EvidenceViews)
                  .HasForeignKey(ev => ev.EvidenceId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private void ConfigureAchievementEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Achievement>(entity =>
        {
            entity.HasKey(e => e.AchievementId);
            entity.Property(e => e.AchievementId).ValueGeneratedOnAdd();
            
            entity.Property(e => e.Points).HasDefaultValue(0);
            
            entity.HasOne(a => a.User)
                  .WithMany(u => u.Achievements)
                  .HasForeignKey(a => a.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
