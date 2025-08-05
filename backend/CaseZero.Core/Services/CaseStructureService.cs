using System.Text.Json;
using CaseZero.Core.Models;

namespace CaseZero.Core.Services;

/// <summary>
/// Interface para o serviço de casos JSON
/// </summary>
public interface ICaseStructureService
{
    Task<CaseStructure?> LoadCaseAsync(string caseId);
    Task<List<string>> GetAvailableCasesAsync();
    Task<bool> SaveCaseAsync(CaseStructure caseStructure);
    Task<bool> DeleteCaseAsync(string caseId);
    Task<List<CaseFile>> GetAccessibleFilesAsync(string caseId, string sessionId);
    Task<bool> UpdateDependencyStatusAsync(string caseId, string sessionId, string fileId, string dependencyAction, string status);
    Task<CaseStructure?> CreateEmptyCaseAsync(string caseId, string title, string language = "pt");
}

/// <summary>
/// Serviço para gerenciar casos baseados em estrutura JSON
/// </summary>
public class CaseStructureService : ICaseStructureService
{
    private readonly string _casesBasePath;
    private readonly JsonSerializerOptions _jsonOptions;

    public CaseStructureService()
    {
        // Apontando para a pasta cases na raiz do projeto
        var currentDir = Directory.GetCurrentDirectory();
        var rootDir = Directory.GetParent(currentDir)?.Parent?.FullName ?? currentDir;
        _casesBasePath = Path.Combine(rootDir, "cases");
        
        // Configurações do JSON
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
            WriteIndented = true,
            PropertyNameCaseInsensitive = true
        };

        // Garantir que o diretório de casos existe
        Directory.CreateDirectory(_casesBasePath);
    }

    public async Task<CaseStructure?> LoadCaseAsync(string caseId)
    {
        try
        {
            var casePath = Path.Combine(_casesBasePath, caseId);
            var infoPath = Path.Combine(casePath, "info.json");

            if (!File.Exists(infoPath))
                return null;

            var jsonContent = await File.ReadAllTextAsync(infoPath);
            var caseStructure = JsonSerializer.Deserialize<CaseStructure>(jsonContent, _jsonOptions);

            if (caseStructure != null)
            {
                await LoadBriefingFilesAsync(casePath, caseStructure);
            }

            return caseStructure;
        }
        catch
        {
            return null;
        }
    }

    public Task<List<string>> GetAvailableCasesAsync()
    {
        try
        {
            var caseDirectories = Directory.GetDirectories(_casesBasePath)
                .Select(Path.GetFileName)
                .Where(name => !string.IsNullOrEmpty(name))
                .Cast<string>()
                .ToList();

            return Task.FromResult(caseDirectories);
        }
        catch
        {
            return Task.FromResult(new List<string>());
        }
    }

    public async Task<bool> SaveCaseAsync(CaseStructure caseStructure)
    {
        try
        {
            var casePath = Path.Combine(_casesBasePath, caseStructure.Id);
            Directory.CreateDirectory(casePath);
            Directory.CreateDirectory(Path.Combine(casePath, "files"));
            Directory.CreateDirectory(Path.Combine(casePath, "analysis"));
            Directory.CreateDirectory(Path.Combine(casePath, "translations"));

            var infoPath = Path.Combine(casePath, "info.json");
            var jsonContent = JsonSerializer.Serialize(caseStructure, _jsonOptions);
            await File.WriteAllTextAsync(infoPath, jsonContent);

            await SaveBriefingFilesAsync(casePath, caseStructure);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public Task<bool> DeleteCaseAsync(string caseId)
    {
        try
        {
            var casePath = Path.Combine(_casesBasePath, caseId);
            
            if (Directory.Exists(casePath))
            {
                Directory.Delete(casePath, true);
                return Task.FromResult(true);
            }
            
            return Task.FromResult(false);
        }
        catch
        {
            return Task.FromResult(false);
        }
    }

    public async Task<List<CaseFile>> GetAccessibleFilesAsync(string caseId, string sessionId)
    {
        var caseStructure = await LoadCaseAsync(caseId);
        if (caseStructure == null) return new List<CaseFile>();

        var accessibleFiles = new List<CaseFile>();

        foreach (var file in caseStructure.Files)
        {
            if (AreAllDependenciesMet(file.Dependencies))
            {
                accessibleFiles.Add(file);
            }
        }

        return accessibleFiles;
    }

    public Task<bool> UpdateDependencyStatusAsync(string caseId, string sessionId, string fileId, string dependencyAction, string status)
    {
        // TODO: Implementar persistência do estado das dependências por sessão
        return Task.FromResult(true);
    }

    public async Task<CaseStructure?> CreateEmptyCaseAsync(string caseId, string title, string language = "pt")
    {
        var caseStructure = new CaseStructure
        {
            Id = caseId,
            Title = new MultiLanguageText { Pt = title },
            Description = new MultiLanguageText { Pt = "Descrição do caso..." },
            Briefing = new MultiLanguageText { Pt = "Briefing inicial do caso..." },
            Metadata = new CaseMetadata
            {
                Author = "System",
                CreationDate = DateTime.UtcNow,
                Difficulty = 1,
                EstimatedTime = 30
            }
        };

        var saved = await SaveCaseAsync(caseStructure);
        return saved ? caseStructure : null;
    }

    private async Task LoadBriefingFilesAsync(string casePath, CaseStructure caseStructure)
    {
        var briefingFiles = new[]
        {
            ("pt", "briefing_pt.md"),
            ("en", "briefing_en.md"),
            ("fr", "briefing_fr.md"),
            ("es", "briefing_es.md")
        };

        foreach (var (lang, filename) in briefingFiles)
        {
            var briefingPath = Path.Combine(casePath, filename);
            if (File.Exists(briefingPath))
            {
                var content = await File.ReadAllTextAsync(briefingPath);
                switch (lang)
                {
                    case "pt": caseStructure.Briefing.Pt = content; break;
                    case "en": caseStructure.Briefing.En = content; break;
                    case "fr": caseStructure.Briefing.Fr = content; break;
                    case "es": caseStructure.Briefing.Es = content; break;
                }
            }
        }
    }

    private async Task SaveBriefingFilesAsync(string casePath, CaseStructure caseStructure)
    {
        var briefingContents = new[]
        {
            ("briefing_pt.md", caseStructure.Briefing.Pt),
            ("briefing_en.md", caseStructure.Briefing.En),
            ("briefing_fr.md", caseStructure.Briefing.Fr),
            ("briefing_es.md", caseStructure.Briefing.Es)
        };

        foreach (var (filename, content) in briefingContents)
        {
            if (!string.IsNullOrEmpty(content))
            {
                var briefingPath = Path.Combine(casePath, filename);
                await File.WriteAllTextAsync(briefingPath, content);
            }
        }
    }

    private bool AreAllDependenciesMet(List<FileDependency> dependencies)
    {
        return dependencies.Count == 0 || dependencies.All(d => d.Status == "ok");
    }
}
