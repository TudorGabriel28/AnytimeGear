using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using System.Linq.Expressions;

namespace UnitTests.Mocks;
internal class CategoryRepositoryMock : ICategoryRepository
{
    private bool _categoryExists;

    public CategoryRepositoryMock(bool categoryExists) 
    {
        _categoryExists = categoryExists;
    }
    public Task<bool> ExistsAsync(Expression<Func<Category, bool>> expression)
    {

        return Task.FromResult(_categoryExists);
    }

    public Task<Category> AddAsync(Category entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Category entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteRangeAsync(ICollection<Category> entities)
    {
        throw new NotImplementedException();
    }


    public Task<ICollection<Category>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Category>> GetAllAsync(Expression<Func<Category, bool>> expression)
    {
        throw new NotImplementedException();
    }

    public Task<Category?> GetAsync(Expression<Func<Category, bool>> expression)
    {
        throw new NotImplementedException();
    }

    public Task<Category?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<int> SaveAsync()
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Category entity)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Category>> GetAllAsync(Expression<Func<Category, bool>> expression, params Expression<Func<Category, object>>[]? includes)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Category>> GetAllAsync(params Expression<Func<Category, object>>[] includes)
    {
        throw new NotImplementedException();
    }

    public Task<Category?> GetAsync(Expression<Func<Category, bool>> expression, params Expression<Func<Category, object>>[]? includes)
    {
        throw new NotImplementedException();
    }
}
