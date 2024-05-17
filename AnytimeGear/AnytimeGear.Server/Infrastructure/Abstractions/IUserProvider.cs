using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Infrastructure.Abstractions;

public interface IUserProvider
{
    Task<User?> GetCurrentUserAsync();
}
