using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaseZero.Infrastructure.Data;
using CaseZero.Infrastructure.Services;
using CaseZero.Core.Entities;
using CaseZero.Api.Attributes;
using CaseZero.Api.Models.Auth;

namespace CaseZero.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly CaseZeroDbContext _context;
    private readonly IAuthService _authService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(
        CaseZeroDbContext context,
        IAuthService authService,
        ILogger<UsersController> logger)
    {
        _context = context;
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Get all users (Admin only)
    /// </summary>
    [HttpGet]
    [AdminOnly]
    public async Task<ActionResult<IEnumerable<UserProfile>>> GetUsers()
    {
        var users = await _context.Users
            .Where(u => u.Status == Core.Enums.UserStatus.Active)
            .Select(u => new UserProfile
            {
                UserId = u.UserId,
                Username = u.Username,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role.ToString(),
                Department = u.Department ?? "",
                Avatar = u.Avatar ?? "",
                Badge = u.Badge ?? ""
            })
            .ToListAsync();

        return Ok(users);
    }

    /// <summary>
    /// Get user by ID (Admin only)
    /// </summary>
    [HttpGet("{id}")]
    [AdminOnly]
    public async Task<ActionResult<UserProfile>> GetUser(int id)
    {
        var user = await _context.Users
            .Where(u => u.UserId == id && u.Status == Core.Enums.UserStatus.Active)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound();
        }

        var profile = new UserProfile
        {
            UserId = user.UserId,
            Username = user.Username,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Role = user.Role.ToString(),
            Department = user.Department ?? "",
            Avatar = user.Avatar ?? "",
            Badge = user.Badge ?? ""
        };

        return Ok(profile);
    }

    /// <summary>
    /// Update user profile (User can update own profile, Admin can update any)
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserRequest request)
    {
        // Get current user ID from token
        var currentUserIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (currentUserIdClaim == null || !int.TryParse(currentUserIdClaim, out var currentUserId))
        {
            return Unauthorized();
        }

        // Check if user is admin or updating own profile
        var currentUserRole = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
        var isAdmin = currentUserRole == Core.Enums.UserRole.Administrator.ToString();
        
        if (!isAdmin && currentUserId != id)
        {
            return Forbid("You can only update your own profile");
        }

        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        // Update allowed fields
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Department = request.Department;
        user.Avatar = request.Avatar;

        // Only admin can update role and status
        if (isAdmin)
        {
            if (Enum.TryParse<Core.Enums.UserRole>(request.Role, out var newRole))
            {
                user.Role = newRole;
            }
        }

        try
        {
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Users.AnyAsync(u => u.UserId == id))
            {
                return NotFound();
            }
            throw;
        }
    }

    /// <summary>
    /// Deactivate user (Admin only)
    /// </summary>
    [HttpDelete("{id}")]
    [AdminOnly]
    public async Task<IActionResult> DeactivateUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        // Don't allow deactivating the last admin
        if (user.Role == Core.Enums.UserRole.Administrator)
        {
            var adminCount = await _context.Users
                .CountAsync(u => u.Role == Core.Enums.UserRole.Administrator && u.Status == Core.Enums.UserStatus.Active);
            
            if (adminCount <= 1)
            {
                return BadRequest(new { message = "Cannot deactivate the last administrator" });
            }
        }

        user.Status = Core.Enums.UserStatus.Inactive;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

// DTO for updating user profile
public class UpdateUserRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Avatar { get; set; }
    public string? Role { get; set; } // Only admin can change this
}
