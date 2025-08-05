using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaseZero.Infrastructure.Data;
using CaseZero.Core.Entities;
using CaseZero.Core.Enums;
using CaseZero.Core.DTOs;
using CaseZero.Core.Services;
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
    public async Task<ActionResult<IEnumerable<EvidenceDto>>> GetEvidenceByCase(int caseId)
    {
        // Verify case exists and user has access
        var @case = await _context.Cases
            .FirstOrDefaultAsync(c => c.CaseId == caseId && c.IsPublished);

        if (@case == null)
        {
            return NotFound("Case not found or not published");
        }

        var evidences = await _context.Evidences
            .Include(e => e.Case)
            .Where(e => e.CaseId == caseId)
            .OrderBy(e => e.EvidenceNumber)
            .ToListAsync();

        var evidenceDtos = evidences.Select(MappingService.ToDto).ToList();
        return Ok(evidenceDtos);
    }

    /// <summary>
    /// Get specific evidence by ID
    /// </summary>
    [HttpGet("{id}")]
    [DetectiveAndAbove]
    public async Task<ActionResult<EvidenceDto>> GetEvidence(int id)
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

        var evidenceDto = MappingService.ToDto(evidence);
        return Ok(evidenceDto);
    }

    /// <summary>
    /// Create new evidence (Admin and Analyst only)
    /// </summary>
    [HttpPost]
    [AnalystAndAbove]
    public async Task<ActionResult<EvidenceDto>> CreateEvidence([FromBody] CreateEvidenceDto createEvidenceDto)
    {
        // Verify case exists
        var @case = await _context.Cases.FindAsync(createEvidenceDto.CaseId);
        if (@case == null)
        {
            return BadRequest("Case not found");
        }

        var evidence = MappingService.ToEntity(createEvidenceDto);

        _context.Evidences.Add(evidence);
        await _context.SaveChangesAsync();

        // Load the evidence with case info for DTO conversion
        await _context.Entry(evidence)
            .Reference(e => e.Case)
            .LoadAsync();

        _logger.LogInformation("Evidence {EvidenceId} created for case {CaseId}", evidence.EvidenceId, evidence.CaseId);

        var evidenceDto = MappingService.ToDto(evidence);
        return CreatedAtAction(nameof(GetEvidence), new { id = evidence.EvidenceId }, evidenceDto);
    }

    /// <summary>
    /// Update existing evidence (Admin and Analyst only)
    /// </summary>
    [HttpPut("{id}")]
    [AnalystAndAbove]
    public async Task<IActionResult> UpdateEvidence(int id, [FromBody] UpdateEvidenceDto updateEvidenceDto)
    {
        var evidence = await _context.Evidences.FindAsync(id);
        if (evidence == null)
        {
            return NotFound();
        }

        MappingService.UpdateEntity(evidence, updateEvidenceDto);

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
