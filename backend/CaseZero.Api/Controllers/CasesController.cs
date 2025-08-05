using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaseZero.Infrastructure.Data;
using CaseZero.Core.Entities;
using CaseZero.Core.DTOs;
using CaseZero.Core.Services;
using CaseZero.Api.Attributes;

namespace CaseZero.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Require authentication for all endpoints
public class CasesController : ControllerBase
{
    private readonly CaseZeroDbContext _context;

    public CasesController(CaseZeroDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Get all published cases
    /// </summary>
    [HttpGet]
    [DetectiveAndAbove] // All authenticated users can view cases
    public async Task<ActionResult<IEnumerable<CaseDto>>> GetCases()
    {
        var cases = await _context.Cases
            .Where(c => c.IsPublished)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();

        var caseDtos = cases.Select(MappingService.ToDto).ToList();
        return Ok(caseDtos);
    }

    /// <summary>
    /// Get the tutorial case
    /// </summary>
    [HttpGet("tutorial")]
    [DetectiveAndAbove]
    public async Task<ActionResult<CaseDto>> GetTutorialCase()
    {
        var tutorialCase = await _context.Cases
            .FirstOrDefaultAsync(c => c.IsTutorial);

        if (tutorialCase == null)
        {
            return NotFound("No tutorial case found");
        }

        var caseDto = MappingService.ToDto(tutorialCase);
        return Ok(caseDto);
    }

    /// <summary>
    /// Get a specific case by ID
    /// </summary>
    [HttpGet("{id}")]
    [DetectiveAndAbove]
    public async Task<ActionResult<CaseDto>> GetCase(int id)
    {
        var @case = await _context.Cases
            .FirstOrDefaultAsync(c => c.CaseId == id);

        if (@case == null)
        {
            return NotFound();
        }

        var caseDto = MappingService.ToDto(@case);
        return Ok(caseDto);
    }

    /// <summary>
    /// Create a new case (Admin/Supervisor only)
    /// </summary>
    [HttpPost]
    [SupervisorAndAbove] // Only Supervisor and Administrator can create cases
    public async Task<ActionResult<CaseDto>> CreateCase(Case @case)
    {
        @case.CreatedAt = DateTime.UtcNow;
        @case.CaseNumber = $"CASE-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}";
        
        // Set creator from current user
        var username = User.Identity?.Name;
        @case.CreatedBy = username;
        
        _context.Cases.Add(@case);
        await _context.SaveChangesAsync();

        var caseDto = MappingService.ToDto(@case);
        return CreatedAtAction(nameof(GetCase), new { id = @case.CaseId }, caseDto);
    }

    /// <summary>
    /// Update an existing case (Admin/Supervisor only)
    /// </summary>
    [HttpPut("{id}")]
    [SupervisorAndAbove]
    public async Task<IActionResult> UpdateCase(int id, Case @case)
    {
        if (id != @case.CaseId)
        {
            return BadRequest();
        }

        @case.LastModifiedAt = DateTime.UtcNow;
        _context.Entry(@case).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CaseExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    /// <summary>
    /// Delete a case (Admin only)
    /// </summary>
    [HttpDelete("{id}")]
    [AdminOnly] // Only Admin can delete cases
    public async Task<IActionResult> DeleteCase(int id)
    {
        var @case = await _context.Cases.FindAsync(id);
        if (@case == null)
        {
            return NotFound();
        }

        _context.Cases.Remove(@case);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CaseExists(int id)
    {
        return _context.Cases.Any(e => e.CaseId == id);
    }
}
