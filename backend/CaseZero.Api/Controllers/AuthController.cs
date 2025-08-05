using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CaseZero.Api.Models.Auth;
using CaseZero.Infrastructure.Services;
using CaseZero.Core.Enums;

namespace CaseZero.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IAuthService authService,
        IJwtTokenService jwtTokenService,
        ILogger<AuthController> logger)
    {
        _authService = authService;
        _jwtTokenService = jwtTokenService;
        _logger = logger;
    }

    /// <summary>
    /// Authenticate user and return JWT token
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        try
        {
            var user = await _authService.AuthenticateAsync(request.Email, request.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var accessToken = _jwtTokenService.GenerateAccessToken(user);
            var refreshToken = _jwtTokenService.GenerateRefreshToken();
            var expiresAt = _jwtTokenService.GetTokenExpiration();

            // Update last login
            await _authService.UpdateLastLoginAsync(user.UserId);

            var response = new AuthResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = expiresAt,
                User = new UserProfile
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
                }
            };

            _logger.LogInformation("User {Email} logged in successfully", user.Email);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login for {Email}", request.Email);
            return StatusCode(500, new { message = "An error occurred during login" });
        }
    }

    /// <summary>
    /// Register a new user
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        try
        {
            if (await _authService.UserExistsAsync(request.Email, request.Username))
            {
                return BadRequest(new { message = "User already exists with this email or username" });
            }

            var user = await _authService.RegisterAsync(
                request.Email,
                request.Username,
                request.Password,
                request.FirstName,
                request.LastName,
                request.Department);

            var accessToken = _jwtTokenService.GenerateAccessToken(user);
            var refreshToken = _jwtTokenService.GenerateRefreshToken();
            var expiresAt = _jwtTokenService.GetTokenExpiration();

            var response = new AuthResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = expiresAt,
                User = new UserProfile
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
                }
            };

            _logger.LogInformation("User {Email} registered successfully", user.Email);
            return CreatedAtAction(nameof(GetProfile), new { }, response);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Registration failed for {Email}: {Message}", request.Email, ex.Message);
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during registration for {Email}", request.Email);
            return StatusCode(500, new { message = "An error occurred during registration" });
        }
    }

    /// <summary>
    /// Get current user profile
    /// </summary>
    [HttpGet("profile")]
    [Authorize]
    public async Task<ActionResult<UserProfile>> GetProfile()
    {
        try
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var user = await _authService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
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
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting profile for user");
            return StatusCode(500, new { message = "An error occurred while getting profile" });
        }
    }

    /// <summary>
    /// Refresh JWT token
    /// </summary>
    [HttpPost("refresh")]
    public ActionResult<AuthResponse> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            // In a real application, you would validate the refresh token against a stored version
            // For this example, we'll just validate the structure and generate new tokens
            
            // TODO: Implement refresh token validation with database storage
            _logger.LogWarning("Refresh token endpoint called but not fully implemented");
            
            return BadRequest(new { message = "Refresh token functionality not implemented yet" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during token refresh");
            return StatusCode(500, new { message = "An error occurred during token refresh" });
        }
    }

    /// <summary>
    /// Logout user (for future implementation with token blacklisting)
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    public IActionResult Logout()
    {
        try
        {
            // TODO: Implement token blacklisting
            _logger.LogInformation("User logged out");
            return Ok(new { message = "Logged out successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during logout");
            return StatusCode(500, new { message = "An error occurred during logout" });
        }
    }
}
