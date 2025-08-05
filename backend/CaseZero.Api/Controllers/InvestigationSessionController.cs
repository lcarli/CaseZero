using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaseZero.Infrastructure.Data;
using CaseZero.Core.Entities;
using CaseZero.Core.Enums;
using CaseZero.Api.Attributes;

namespace CaseZero.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Require authentication for all endpoints
public class InvestigationSessionController : ControllerBase
{
    private readonly CaseZeroDbContext _context;
    private readonly ILogger<InvestigationSessionController> _logger;

    public InvestigationSessionController(CaseZeroDbContext context, ILogger<InvestigationSessionController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get all investigation sessions (Admin and Supervisor only)
    /// </summary>
    [HttpGet]
    [SupervisorAndAbove]
    public async Task<ActionResult<IEnumerable<InvestigationSession>>> GetSessions()
    {
        var sessions = await _context.InvestigationSessions
            .Include(s => s.User)
            .Include(s => s.Case)
            .OrderByDescending(s => s.StartedAt)
            .ToListAsync();

        return Ok(sessions);
    }

    /// <summary>
    /// Get investigation session by ID
    /// </summary>
    [HttpGet("{id}")]
    [DetectiveAndAbove]
    public async Task<ActionResult<InvestigationSession>> GetSession(int id)
    {
        var session = await _context.InvestigationSessions
            .Include(s => s.User)
            .Include(s => s.Case)
            .FirstOrDefaultAsync(s => s.SessionId == id);

        if (session == null)
        {
            return NotFound();
        }

        // Users can only view their own sessions, admins can view all
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var currentUserRole = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
        var isAdmin = currentUserRole == UserRole.Administrator.ToString() || currentUserRole == UserRole.Supervisor.ToString();
        
        if (!isAdmin && session.UserId != int.Parse(currentUserIdClaim ?? "0"))
        {
            return Forbid("You can only view your own investigation sessions");
        }

        return Ok(session);
    }

    /// <summary>
    /// Get current user's investigation sessions
    /// </summary>
    [HttpGet("my-sessions")]
    [DetectiveAndAbove]
    public async Task<ActionResult<IEnumerable<InvestigationSession>>> GetMySessions()
    {
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (currentUserIdClaim == null || !int.TryParse(currentUserIdClaim, out var currentUserId))
        {
            return Unauthorized();
        }

        var sessions = await _context.InvestigationSessions
            .Include(s => s.Case)
            .Where(s => s.UserId == currentUserId)
            .OrderByDescending(s => s.StartedAt)
            .ToListAsync();

        return Ok(sessions);
    }

    /// <summary>
    /// Get sessions for a specific case
    /// </summary>
    [HttpGet("case/{caseId}")]
    [SupervisorAndAbove]
    public async Task<ActionResult<IEnumerable<InvestigationSession>>> GetSessionsByCase(int caseId)
    {
        var sessions = await _context.InvestigationSessions
            .Include(s => s.User)
            .Where(s => s.CaseId == caseId)
            .OrderByDescending(s => s.StartedAt)
            .ToListAsync();

        return Ok(sessions);
    }

    /// <summary>
    /// Start new investigation session
    /// </summary>
    [HttpPost("start")]
    [DetectiveAndAbove]
    public async Task<ActionResult<InvestigationSession>> StartSession([FromBody] StartSessionRequest request)
    {
        // Verify case exists and is published
        var @case = await _context.Cases.FindAsync(request.CaseId);
        if (@case == null || !@case.IsPublished)
        {
            return BadRequest("Case not found or not published");
        }

        // Get current user
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (currentUserIdClaim == null || !int.TryParse(currentUserIdClaim, out var currentUserId))
        {
            return Unauthorized();
        }

        // Check if user already has an active session for this case
        var existingSession = await _context.InvestigationSessions
            .FirstOrDefaultAsync(s => s.UserId == currentUserId && s.CaseId == request.CaseId && s.Status == SessionStatus.Active);

        if (existingSession != null)
        {
            return BadRequest("You already have an active session for this case");
        }

        var session = new InvestigationSession
        {
            UserId = currentUserId,
            CaseId = request.CaseId,
            StartedAt = DateTime.UtcNow,
            Status = SessionStatus.Active,
            Score = 0,
            HintsUsed = 0,
            EvidencesViewed = 0,
            AnalysesRequested = 0,
            Notes = request.Notes
        };

        _context.InvestigationSessions.Add(session);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Investigation session {SessionId} started by user {UserId} for case {CaseId}", 
            session.SessionId, session.UserId, session.CaseId);

        return CreatedAtAction(nameof(GetSession), new { id = session.SessionId }, session);
    }

    /// <summary>
    /// End investigation session
    /// </summary>
    [HttpPost("{id}/end")]
    [DetectiveAndAbove]
    public async Task<IActionResult> EndSession(int id, [FromBody] EndSessionRequest request)
    {
        var session = await _context.InvestigationSessions.FindAsync(id);
        if (session == null)
        {
            return NotFound();
        }

        // Check ownership
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var currentUserRole = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
        var isAdmin = currentUserRole == UserRole.Administrator.ToString() || currentUserRole == UserRole.Supervisor.ToString();
        
        if (!isAdmin && session.UserId != int.Parse(currentUserIdClaim ?? "0"))
        {
            return Forbid("You can only end your own investigation sessions");
        }

        if (session.Status != SessionStatus.Active)
        {
            return BadRequest("Session is not in progress");
        }

        session.EndedAt = DateTime.UtcNow;
        session.Status = SessionStatus.Completed;
        session.TotalTime = session.EndedAt - session.StartedAt;
        session.Score = request.Score;
        session.Notes = request.Notes ?? session.Notes;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Investigation session {SessionId} ended by user {UserId}", session.SessionId, session.UserId);

        return Ok(new { message = "Session ended successfully", session });
    }

    /// <summary>
    /// Update session progress
    /// </summary>
    [HttpPut("{id}/progress")]
    [DetectiveAndAbove]
    public async Task<IActionResult> UpdateProgress(int id, [FromBody] UpdateProgressRequest request)
    {
        var session = await _context.InvestigationSessions.FindAsync(id);
        if (session == null)
        {
            return NotFound();
        }

        // Check ownership
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (session.UserId != int.Parse(currentUserIdClaim ?? "0"))
        {
            return Forbid("You can only update your own investigation sessions");
        }

        if (session.Status != SessionStatus.Active)
        {
            return BadRequest("Session is not in progress");
        }

        session.HintsUsed = request.HintsUsed;
        session.EvidencesViewed = request.EvidencesViewed;
        session.AnalysesRequested = request.AnalysesRequested;
        session.SessionData = request.SessionData;
        session.Notes = request.Notes ?? session.Notes;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Get session statistics
    /// </summary>
    [HttpGet("statistics")]
    [SupervisorAndAbove]
    public async Task<ActionResult> GetStatistics()
    {
        var stats = await _context.InvestigationSessions
            .GroupBy(s => s.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        var totalSessions = await _context.InvestigationSessions.CountAsync();
        var averageScore = await _context.InvestigationSessions
            .Where(s => s.Status == SessionStatus.Completed)
            .AverageAsync(s => (double?)s.Score) ?? 0;

        var result = new
        {
            TotalSessions = totalSessions,
            AverageScore = Math.Round(averageScore, 2),
            StatusBreakdown = stats
        };

        return Ok(result);
    }
}

// DTOs for Investigation Session operations
public class StartSessionRequest
{
    public int CaseId { get; set; }
    public string? Notes { get; set; }
}

public class EndSessionRequest
{
    public int Score { get; set; }
    public string? Notes { get; set; }
}

public class UpdateProgressRequest
{
    public int HintsUsed { get; set; }
    public int EvidencesViewed { get; set; }
    public int AnalysesRequested { get; set; }
    public string? SessionData { get; set; }
    public string? Notes { get; set; }
}
