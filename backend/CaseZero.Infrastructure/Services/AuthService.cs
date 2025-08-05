using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;
using CaseZero.Core.Entities;
using CaseZero.Core.Enums;
using CaseZero.Infrastructure.Data;

namespace CaseZero.Infrastructure.Services;

public interface IAuthService
{
    Task<User?> AuthenticateAsync(string email, string password);
    Task<User> RegisterAsync(string email, string username, string password, string firstName, string lastName, string? department = null);
    Task<bool> UserExistsAsync(string email, string username);
    Task<User?> GetUserByIdAsync(int userId);
    Task<User?> GetUserByEmailAsync(string email);
    Task UpdateLastLoginAsync(int userId);
    string HashPassword(string password);
    bool VerifyPassword(string password, string hash);
}

public class AuthService : IAuthService
{
    private readonly CaseZeroDbContext _context;

    public AuthService(CaseZeroDbContext context)
    {
        _context = context;
    }

    public async Task<User?> AuthenticateAsync(string email, string password)
    {
        var user = await _context.Users
            .Where(u => u.Email == email && u.Status == UserStatus.Active)
            .FirstOrDefaultAsync();

        if (user == null || !VerifyPassword(password, user.PasswordHash))
        {
            return null;
        }

        return user;
    }

    public async Task<User> RegisterAsync(string email, string username, string password, string firstName, string lastName, string? department = null)
    {
        if (await UserExistsAsync(email, username))
        {
            throw new ArgumentException("User already exists with this email or username");
        }

        var user = new User
        {
            Email = email,
            Username = username,
            PasswordHash = HashPassword(password),
            FirstName = firstName,
            LastName = lastName,
            Department = department,
            Role = UserRole.Detective, // Default role
            Status = UserStatus.Active,
            PreferredLanguage = Language.French, // Default language
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<bool> UserExistsAsync(string email, string username)
    {
        return await _context.Users
            .AnyAsync(u => u.Email == email || u.Username == username);
    }

    public async Task<User?> GetUserByIdAsync(int userId)
    {
        return await _context.Users
            .Where(u => u.UserId == userId && u.Status == UserStatus.Active)
            .FirstOrDefaultAsync();
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _context.Users
            .Where(u => u.Email == email && u.Status == UserStatus.Active)
            .FirstOrDefaultAsync();
    }

    public async Task UpdateLastLoginAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user != null)
        {
            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    public string HashPassword(string password)
    {
        return BC.HashPassword(password, BC.GenerateSalt(12));
    }

    public bool VerifyPassword(string password, string hash)
    {
        return BC.Verify(password, hash);
    }
}
