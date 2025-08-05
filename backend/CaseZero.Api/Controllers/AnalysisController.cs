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
public class AnalysisController : ControllerBase
{
    private readonly CaseZeroDbContext _context;
    private readonly ILogger<AnalysisController> _logger;

    public AnalysisController(CaseZeroDbContext context, ILogger<AnalysisController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get all analyses
    /// </summary>
    [HttpGet]
    [AnalystAndAbove]
    public async Task<ActionResult<IEnumerable<Analysis>>> GetAnalyses()
    {
        var analyses = await _context.Analyses
            .Include(a => a.Evidence)
            .ThenInclude(e => e.Case)
            .Include(a => a.Session)
            .OrderByDescending(a => a.RequestedAt)
            .ToListAsync();

        return Ok(analyses);
    }

    /// <summary>
    /// Get analysis by ID
    /// </summary>
    [HttpGet("{id}")]
    [AnalystAndAbove]
    public async Task<ActionResult<Analysis>> GetAnalysis(int id)
    {
        var analysis = await _context.Analyses
            .Include(a => a.Evidence)
            .ThenInclude(e => e.Case)
            .Include(a => a.Session)
            .FirstOrDefaultAsync(a => a.AnalysisId == id);

        if (analysis == null)
        {
            return NotFound();
        }

        return Ok(analysis);
    }

    /// <summary>
    /// Get analyses for specific evidence
    /// </summary>
    [HttpGet("evidence/{evidenceId}")]
    [DetectiveAndAbove]
    public async Task<ActionResult<IEnumerable<Analysis>>> GetAnalysesByEvidence(int evidenceId)
    {
        var evidence = await _context.Evidences.FindAsync(evidenceId);
        if (evidence == null)
        {
            return NotFound("Evidence not found");
        }

        var analyses = await _context.Analyses
            .Where(a => a.EvidenceId == evidenceId)
            .Include(a => a.Session)
            .OrderByDescending(a => a.RequestedAt)
            .ToListAsync();

        return Ok(analyses);
    }

    /// <summary>
    /// Create new analysis request
    /// </summary>
    [HttpPost]
    [AnalystAndAbove]
    public async Task<ActionResult<Analysis>> CreateAnalysis([FromBody] CreateAnalysisRequest request)
    {
        // Verify evidence exists
        var evidence = await _context.Evidences.FindAsync(request.EvidenceId);
        if (evidence == null)
        {
            return BadRequest("Evidence not found");
        }

        // Verify session exists
        var session = await _context.InvestigationSessions.FindAsync(request.SessionId);
        if (session == null)
        {
            return BadRequest("Investigation session not found");
        }

        // Get current user
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var currentUser = await _context.Users.FindAsync(int.Parse(currentUserIdClaim ?? "0"));

        var analysis = new Analysis
        {
            EvidenceId = request.EvidenceId,
            SessionId = request.SessionId,
            Type = request.Type,
            Status = AnalysisStatus.Pending,
            RequestedAt = DateTime.UtcNow,
            EstimatedTimeMinutes = request.EstimatedTimeMinutes,
            RequestedBy = currentUser?.Username ?? "Unknown",
            Notes = request.Notes
        };

        _context.Analyses.Add(analysis);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Analysis {AnalysisId} requested for evidence {EvidenceId}", analysis.AnalysisId, analysis.EvidenceId);

        return CreatedAtAction(nameof(GetAnalysis), new { id = analysis.AnalysisId }, analysis);
    }

    /// <summary>
    /// Update analysis result
    /// </summary>
    [HttpPut("{id}")]
    [AnalystAndAbove]
    public async Task<IActionResult> UpdateAnalysis(int id, [FromBody] UpdateAnalysisRequest request)
    {
        var analysis = await _context.Analyses.FindAsync(id);
        if (analysis == null)
        {
            return NotFound();
        }

        // Get current user
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var currentUser = await _context.Users.FindAsync(int.Parse(currentUserIdClaim ?? "0"));

        analysis.Status = request.Status;
        analysis.Result = request.Result;
        analysis.ResultEn = request.ResultEn;
        analysis.Notes = request.Notes;

        if (request.Status == AnalysisStatus.Completed)
        {
            analysis.CompletedAt = DateTime.UtcNow;
            analysis.CompletedBy = currentUser?.Username ?? "Unknown";
        }

        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation("Analysis {AnalysisId} updated", analysis.AnalysisId);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Analyses.AnyAsync(a => a.AnalysisId == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    /// <summary>
    /// Delete analysis (Admin only)
    /// </summary>
    [HttpDelete("{id}")]
    [AdminOnly]
    public async Task<IActionResult> DeleteAnalysis(int id)
    {
        var analysis = await _context.Analyses.FindAsync(id);
        if (analysis == null)
        {
            return NotFound();
        }

        _context.Analyses.Remove(analysis);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Analysis {AnalysisId} deleted", analysis.AnalysisId);

        return NoContent();
    }

    /// <summary>
    /// Get pending analyses
    /// </summary>
    [HttpGet("pending")]
    [AnalystAndAbove]
    public async Task<ActionResult<IEnumerable<Analysis>>> GetPendingAnalyses()
    {
        var analyses = await _context.Analyses
            .Include(a => a.Evidence)
            .ThenInclude(e => e.Case)
            .Include(a => a.Session)
            .Where(a => a.Status == AnalysisStatus.Pending)
            .OrderBy(a => a.RequestedAt)
            .ToListAsync();

        return Ok(analyses);
    }

    /// <summary>
    /// Get analyses by status
    /// </summary>
    [HttpGet("status/{status}")]
    [AnalystAndAbove]
    public async Task<ActionResult<IEnumerable<Analysis>>> GetAnalysesByStatus(AnalysisStatus status)
    {
        var analyses = await _context.Analyses
            .Include(a => a.Evidence)
            .ThenInclude(e => e.Case)
            .Include(a => a.Session)
            .Where(a => a.Status == status)
            .OrderByDescending(a => a.RequestedAt)
            .ToListAsync();

        return Ok(analyses);
    }
}

// DTOs for Analysis operations
public class CreateAnalysisRequest
{
    public int EvidenceId { get; set; }
    public int SessionId { get; set; }
    public AnalysisType Type { get; set; }
    public int EstimatedTimeMinutes { get; set; } = 60;
    public string? Notes { get; set; }
}

public class UpdateAnalysisRequest
{
    public AnalysisStatus Status { get; set; }
    public string? Result { get; set; }
    public string? ResultEn { get; set; }
    public string? Notes { get; set; }
}
