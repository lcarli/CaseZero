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
public class EvidenceController : ControllerBase
{
    private readonly CaseZeroDbContext _context;
    private readonly ILogger<EvidenceController> _logger;

    public EvidenceController(CaseZeroDbContext context, ILogger<EvidenceController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get all evidence for a specific case
    /// </summary>
    [HttpGet("case/{caseId}")]
    [DetectiveAndAbove]
    public async Task<ActionResult<IEnumerable<Evidence>>> GetEvidenceByCase(int caseId)
    {
        // Verify case exists and user has access
        var @case = await _context.Cases
            .FirstOrDefaultAsync(c => c.CaseId == caseId && c.IsPublished);

        if (@case == null)
        {
            return NotFound("Case not found or not published");
        }

        var evidence = await _context.Evidences
            .Where(e => e.CaseId == caseId)
            .OrderBy(e => e.EvidenceId)
            .ToListAsync();

        return Ok(evidence);
    }

    /// <summary>
    /// Get specific evidence by ID
    /// </summary>
    [HttpGet("{id}")]
    [DetectiveAndAbove]
    public async Task<ActionResult<Evidence>> GetEvidence(int id)
    {
        var evidence = await _context.Evidences
            .Include(e => e.Case)
            .FirstOrDefaultAsync(e => e.EvidenceId == id);

        if (evidence == null)
        {
            return NotFound();
        }

        // Check if the case is published
        if (!evidence.Case.IsPublished)
        {
            return NotFound("Case not found or not published");
        }

        return Ok(evidence);
    }

    /// <summary>
    /// Create new evidence (Admin and Analyst only)
    /// </summary>
    [HttpPost]
    [AnalystAndAbove]
    public async Task<ActionResult<Evidence>> CreateEvidence([FromBody] CreateEvidenceRequest request)
    {
        // Verify case exists
        var @case = await _context.Cases.FindAsync(request.CaseId);
        if (@case == null)
        {
            return BadRequest("Case not found");
        }

        var evidence = new Evidence
        {
            CaseId = request.CaseId,
            EvidenceNumber = request.EvidenceNumber,
            Name = request.Name,
            NameEn = request.NameEn,
            Description = request.Description,
            DescriptionEn = request.DescriptionEn,
            Type = request.Type,
            Category = request.Category,
            Location = request.Location,
            LocationEn = request.LocationEn,
            CollectedAt = request.CollectedAt ?? DateTime.UtcNow,
            CollectedBy = request.CollectedBy,
            CollectedByEn = request.CollectedByEn,
            FilePath = request.FilePath,
            Content = request.Content,
            ContentEn = request.ContentEn,
            IsAvailable = request.IsAvailable,
            RequiresAnalysis = request.RequiresAnalysis,
            Tags = request.Tags
        };

        _context.Evidences.Add(evidence);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Evidence {EvidenceId} created for case {CaseId}", evidence.EvidenceId, evidence.CaseId);

        return CreatedAtAction(nameof(GetEvidence), new { id = evidence.EvidenceId }, evidence);
    }

    /// <summary>
    /// Update existing evidence (Admin and Analyst only)
    /// </summary>
    [HttpPut("{id}")]
    [AnalystAndAbove]
    public async Task<IActionResult> UpdateEvidence(int id, [FromBody] UpdateEvidenceRequest request)
    {
        var evidence = await _context.Evidences.FindAsync(id);
        if (evidence == null)
        {
            return NotFound();
        }

        evidence.EvidenceNumber = request.EvidenceNumber;
        evidence.Name = request.Name;
        evidence.NameEn = request.NameEn;
        evidence.Description = request.Description;
        evidence.DescriptionEn = request.DescriptionEn;
        evidence.Type = request.Type;
        evidence.Category = request.Category;
        evidence.Location = request.Location;
        evidence.LocationEn = request.LocationEn;
        evidence.CollectedBy = request.CollectedBy;
        evidence.CollectedByEn = request.CollectedByEn;
        evidence.FilePath = request.FilePath;
        evidence.Content = request.Content;
        evidence.ContentEn = request.ContentEn;
        evidence.IsAvailable = request.IsAvailable;
        evidence.RequiresAnalysis = request.RequiresAnalysis;
        evidence.Tags = request.Tags;

        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation("Evidence {EvidenceId} updated", evidence.EvidenceId);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Evidences.AnyAsync(e => e.EvidenceId == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    /// <summary>
    /// Delete evidence (Admin only)
    /// </summary>
    [HttpDelete("{id}")]
    [AdminOnly]
    public async Task<IActionResult> DeleteEvidence(int id)
    {
        var evidence = await _context.Evidences.FindAsync(id);
        if (evidence == null)
        {
            return NotFound();
        }

        _context.Evidences.Remove(evidence);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Evidence {EvidenceId} deleted", evidence.EvidenceId);

        return NoContent();
    }

    /// <summary>
    /// Toggle evidence availability
    /// </summary>
    [HttpPost("{id}/toggle-availability")]
    [AnalystAndAbove]
    public async Task<IActionResult> ToggleAvailability(int id)
    {
        var evidence = await _context.Evidences.FindAsync(id);
        if (evidence == null)
        {
            return NotFound();
        }

        evidence.IsAvailable = !evidence.IsAvailable;
        await _context.SaveChangesAsync();

        _logger.LogInformation("Evidence {EvidenceId} availability toggled to {IsAvailable}", evidence.EvidenceId, evidence.IsAvailable);

        return Ok(new { message = $"Evidence availability updated to {evidence.IsAvailable}", isAvailable = evidence.IsAvailable });
    }

    /// <summary>
    /// Get evidence requiring analysis
    /// </summary>
    [HttpGet("requiring-analysis")]
    [AnalystAndAbove]
    public async Task<ActionResult<IEnumerable<Evidence>>> GetEvidenceRequiringAnalysis()
    {
        var evidence = await _context.Evidences
            .Include(e => e.Case)
            .Where(e => e.RequiresAnalysis && e.IsAvailable)
            .OrderBy(e => e.CollectedAt)
            .ToListAsync();

        return Ok(evidence);
    }
}

// DTOs for Evidence operations
public class CreateEvidenceRequest
{
    public int CaseId { get; set; }
    public string EvidenceNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameEn { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionEn { get; set; }
    public EvidenceType Type { get; set; }
    public EvidenceCategory Category { get; set; }
    public string? Location { get; set; }
    public string? LocationEn { get; set; }
    public DateTime? CollectedAt { get; set; }
    public string? CollectedBy { get; set; }
    public string? CollectedByEn { get; set; }
    public string? FilePath { get; set; }
    public string? Content { get; set; }
    public string? ContentEn { get; set; }
    public bool IsAvailable { get; set; } = true;
    public bool RequiresAnalysis { get; set; } = false;
    public string? Tags { get; set; }
}

public class UpdateEvidenceRequest
{
    public string EvidenceNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameEn { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionEn { get; set; }
    public EvidenceType Type { get; set; }
    public EvidenceCategory Category { get; set; }
    public string? Location { get; set; }
    public string? LocationEn { get; set; }
    public string? CollectedBy { get; set; }
    public string? CollectedByEn { get; set; }
    public string? FilePath { get; set; }
    public string? Content { get; set; }
    public string? ContentEn { get; set; }
    public bool IsAvailable { get; set; }
    public bool RequiresAnalysis { get; set; }
    public string? Tags { get; set; }
}
