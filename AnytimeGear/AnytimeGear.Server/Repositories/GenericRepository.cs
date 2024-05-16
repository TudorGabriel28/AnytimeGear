using AnytimeGear.Server.Data;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Globalization;
using System.Linq.Expressions;

namespace AnytimeGear.Server.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly AnytimeGearServerContext dbContext;
    protected readonly DbSet<T> dbSet;

    public GenericRepository(AnytimeGearServerContext context)
    {
        dbContext = context;
        dbSet = dbContext.Set<T>();
    }

    public virtual async Task<ICollection<T>> GetAllAsync()
    {
        return await dbSet.AsNoTracking().ToListAsync();
    }

    public virtual async Task<ICollection<T>> GetAllAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[]? includes)
    {
        var query = dbSet.Where(expression).AsNoTracking();
        if(includes != null)
        {
            foreach (var includeProperty in includes)
            {
                query = query.Include(includeProperty);
            }
        }
        return await query.ToListAsync();
    }

    public virtual async Task<ICollection<T>> GetAllAsync(params Expression<Func<T, object>>[] includes)
    {
        var query = dbSet.AsNoTracking();

        foreach (var includeProperty in includes)
        {
            query = query.Include(includeProperty);
        }

        return await query.ToListAsync();
    }

    public virtual async Task<T?> GetAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[]? includes)
    {
        var query = dbSet.Where(expression);
        if(includes != null)
        {
            foreach (var includeProperty in includes)
            {
                query = query.Include(includeProperty);
            }
        }
        
        return await query.FirstOrDefaultAsync();
    }

    public virtual async Task<T?> GetAsync(Expression<Func<T, bool>> expression)
    {
        return await dbSet.Where(expression).FirstOrDefaultAsync();
    }

    public virtual async Task<T?> GetByIdAsync(int id)
    {
        return await dbSet.FindAsync(id);
    }

    public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> expression)
    {
        return await dbSet.AnyAsync(expression);
    }

    public async Task<T> AddAsync(T entity)
    {
       var result = await dbContext.AddAsync(entity);
       return result.Entity;
    }
    public Task UpdateAsync(T entity)
    {
        dbContext.Update(entity);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(T entity)
    {
        dbContext.Remove(entity);
        return Task.CompletedTask;    
    }

    public Task DeleteRangeAsync(ICollection<T> entities)
    {
        dbContext.RemoveRange(entities);
        return Task.CompletedTask;
    }

    public Task<int> SaveAsync()
    {
        return dbContext.SaveChangesAsync();
    }
}
