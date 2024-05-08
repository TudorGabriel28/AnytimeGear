using System.Linq.Expressions;

namespace AnytimeGear.Server.Repositories.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<ICollection<T>> GetAllAsync();

    Task<ICollection<T>> GetAllAsync(Expression<Func<T, bool>> expression);

    Task<T?> GetAsync(Expression<Func<T, bool>> expression);

    Task<T?> GetByIdAsync(int id);

    Task<T> AddAsync(T entity);

    Task UpdateAsync(T entity);

    Task DeleteAsync(T entity);

    Task DeleteRangeAsync(ICollection<T> entities);

    Task<int> SaveAsync();
}
