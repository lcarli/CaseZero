using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaseZero.Infrastructure.Data;
using CaseZero.Core.Entities;

namespace CaseZero.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
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
    public async Task<ActionResult<IEnumerable<Case>>> GetCases()
    {
        var cases = await _context.Cases
            .Where(c => c.IsPublished)
            .ToListAsync();
        
        return Ok(cases);
    }

    /// <summary>
    /// Get a specific case by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Case>> GetCase(int id)
    {
        var @case = await _context.Cases
            .Include(c => c.Evidences)
            .Include(c => c.CaseLocations)
            .Include(c => c.TimelineEvents)
            .FirstOrDefaultAsync(c => c.CaseId == id);

        if (@case == null)
        {
            return NotFound();
        }

        return Ok(@case);
    }

    /// <summary>
    /// Create a new case
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Case>> CreateCase(Case @case)
    {
        @case.CreatedAt = DateTime.UtcNow;
        @case.CaseNumber = $"CASE-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}";
        
        _context.Cases.Add(@case);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCase), new { id = @case.CaseId }, @case);
    }

    /// <summary>
    /// Update an existing case
    /// </summary>
    [HttpPut("{id}")]
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
    /// Delete a case
    /// </summary>
    [HttpDelete("{id}")]
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
