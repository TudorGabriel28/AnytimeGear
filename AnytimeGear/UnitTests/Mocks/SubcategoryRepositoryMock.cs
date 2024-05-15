using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using System.Linq.Expressions;

namespace UnitTests.Mocks;
internal class SubcategoryRepositoryMock : ISubcategoryRepository
{
    private bool _subcategoryExists;

    public SubcategoryRepositoryMock(bool subcategoryExists) 
    {
        _subcategoryExists = subcategoryExists;
    }
    public Task<bool> ExistsAsync(Expression<Func<Subcategory, bool>> expression)
    {

        return Task.FromResult(_subcategoryExists);
    }
    public Task<Subcategory> AddAsync(Subcategory entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Subcategory entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteRangeAsync(ICollection<Subcategory> entities)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ExistsAsync(Expression<Func<Category, bool>> expression)
    {

        return Task.FromResult(_subcategoryExists);
    }

    public Task<ICollection<Subcategory>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Subcategory>> GetAllAsync(Expression<Func<Subcategory, bool>> expression, params Expression<Func<Subcategory, object>>[]? includes)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Subcategory>> GetAllAsync(params Expression<Func<Subcategory, object>>[] includes)
    {
        throw new NotImplementedException();
    }

    public Task<Subcategory?> GetAsync(Expression<Func<Subcategory, bool>> expression, params Expression<Func<Subcategory, object>>[]? includes)
    {
        throw new NotImplementedException();
    }

    public Task<Subcategory?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<int> SaveAsync()
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Subcategory entity)
    {
        throw new NotImplementedException();
    }
}
