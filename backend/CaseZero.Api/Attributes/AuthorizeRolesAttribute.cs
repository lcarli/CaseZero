using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using CaseZero.Core.Enums;

namespace CaseZero.Api.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeRolesAttribute : Attribute, IAuthorizationFilter
{
    private readonly UserRole[] _roles;

    public AuthorizeRolesAttribute(params UserRole[] roles)
    {
        _roles = roles;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // Skip authorization if action is decorated with [AllowAnonymous]
        if (context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any())
        {
            return;
        }

        // Check if user is authenticated
        if (!context.HttpContext.User.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        // Get user role from claims
        var userRoleClaim = context.HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
        
        if (string.IsNullOrEmpty(userRoleClaim) || !Enum.TryParse<UserRole>(userRoleClaim, out var userRole))
        {
            context.Result = new ForbidResult();
            return;
        }

        // Check if user has required role
        if (!_roles.Contains(userRole))
        {
            context.Result = new ForbidResult();
            return;
        }
    }
}

// Helper attributes for common role combinations
public class AdminOnlyAttribute : AuthorizeRolesAttribute
{
    public AdminOnlyAttribute() : base(UserRole.Administrator) { }
}

public class SupervisorAndAboveAttribute : AuthorizeRolesAttribute
{
    public SupervisorAndAboveAttribute() : base(UserRole.Administrator, UserRole.Supervisor) { }
}

public class DetectiveAndAboveAttribute : AuthorizeRolesAttribute
{
    public DetectiveAndAboveAttribute() : base(UserRole.Administrator, UserRole.Supervisor, UserRole.Detective) { }
}
