using Microsoft.AspNetCore.Mvc;
using CaseZero.Core.Models;
using CaseZero.Core.Services;

namespace CaseZero.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CaseStructuresController : ControllerBase
{
    private readonly ICaseStructureService _caseStructureService;

    public CaseStructuresController(ICaseStructureService caseStructureService)
    {
        _caseStructureService = caseStructureService;
    }

    /// <summary>
    /// Obtém todos os casos disponíveis
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<string>>> GetAvailableCases()
    {
        var cases = await _caseStructureService.GetAvailableCasesAsync();
        return Ok(cases);
    }

    /// <summary>
    /// Obtém um caso específico pelo ID
    /// </summary>
    [HttpGet("{caseId}")]
    public async Task<ActionResult<CaseStructure>> GetCase(string caseId)
    {
        var caseStructure = await _caseStructureService.LoadCaseAsync(caseId);
        
        if (caseStructure == null)
        {
            return NotFound($"Case with ID '{caseId}' not found.");
        }

        return Ok(caseStructure);
    }

    /// <summary>
    /// Cria um novo caso
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<CaseStructure>> CreateCase([FromBody] CreateCaseRequest request)
    {
        if (string.IsNullOrEmpty(request.Id) || string.IsNullOrEmpty(request.Title))
        {
            return BadRequest("Case ID and Title are required.");
        }

        // Verificar se o caso já existe
        var existingCase = await _caseStructureService.LoadCaseAsync(request.Id);
        if (existingCase != null)
        {
            return Conflict($"Case with ID '{request.Id}' already exists.");
        }

        var caseStructure = await _caseStructureService.CreateEmptyCaseAsync(request.Id, request.Title, request.Language);
        
        if (caseStructure == null)
        {
            return StatusCode(500, "Failed to create case.");
        }

        return CreatedAtAction(nameof(GetCase), new { caseId = caseStructure.Id }, caseStructure);
    }

    /// <summary>
    /// Atualiza um caso existente
    /// </summary>
    [HttpPut("{caseId}")]
    public async Task<ActionResult<CaseStructure>> UpdateCase(string caseId, [FromBody] CaseStructure caseStructure)
    {
        if (caseId != caseStructure.Id)
        {
            return BadRequest("Case ID in URL does not match Case ID in body.");
        }

        var existingCase = await _caseStructureService.LoadCaseAsync(caseId);
        if (existingCase == null)
        {
            return NotFound($"Case with ID '{caseId}' not found.");
        }

        var saved = await _caseStructureService.SaveCaseAsync(caseStructure);
        
        if (!saved)
        {
            return StatusCode(500, "Failed to update case.");
        }

        return Ok(caseStructure);
    }

    /// <summary>
    /// Deleta um caso
    /// </summary>
    [HttpDelete("{caseId}")]
    public async Task<ActionResult> DeleteCase(string caseId)
    {
        var existingCase = await _caseStructureService.LoadCaseAsync(caseId);
        if (existingCase == null)
        {
            return NotFound($"Case with ID '{caseId}' not found.");
        }

        var deleted = await _caseStructureService.DeleteCaseAsync(caseId);
        
        if (!deleted)
        {
            return StatusCode(500, "Failed to delete case.");
        }

        return NoContent();
    }

    /// <summary>
    /// Obtém arquivos acessíveis para um caso e sessão específicos
    /// </summary>
    [HttpGet("{caseId}/files")]
    public async Task<ActionResult<List<CaseFile>>> GetAccessibleFiles(string caseId, [FromQuery] string sessionId = "default")
    {
        var files = await _caseStructureService.GetAccessibleFilesAsync(caseId, sessionId);
        return Ok(files);
    }

    /// <summary>
    /// Atualiza o status de uma dependência
    /// </summary>
    [HttpPost("{caseId}/dependencies")]
    public async Task<ActionResult> UpdateDependency(
        string caseId, 
        [FromBody] UpdateDependencyRequest request)
    {
        var updated = await _caseStructureService.UpdateDependencyStatusAsync(
            caseId, 
            request.SessionId, 
            request.FileId, 
            request.DependencyAction, 
            request.Status);

        if (!updated)
        {
            return StatusCode(500, "Failed to update dependency.");
        }

        return Ok();
    }
}

/// <summary>
/// Requisição para criar um novo caso
/// </summary>
public class CreateCaseRequest
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Language { get; set; } = "pt";
}

/// <summary>
/// Requisição para atualizar uma dependência
/// </summary>
public class UpdateDependencyRequest
{
    public string SessionId { get; set; } = "default";
    public string FileId { get; set; } = string.Empty;
    public string DependencyAction { get; set; } = string.Empty;
    public string Status { get; set; } = "ok";
}
