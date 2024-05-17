using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using System.Linq.Expressions;

namespace UnitTests.Mocks;

internal class ProductRepositoryMock : IProductRepository
{
    private ICollection<Product> _products;

    public ProductRepositoryMock(ICollection<Product> products)
    {
        _products = products;
    }

    public Task<ICollection<Product>> GetAllAsync(Expression<Func<Product, bool>> expression, params Expression<Func<Product, object>>[]? includes)
    {
        IEnumerable<Product> en = _products.Where(expression.Compile());
        ICollection<Product> col = en.ToList();
        return Task.FromResult(col);
    }

    public Task<ICollection<Product>> GetAllAsync(Expression<Func<Product, bool>> expression)
    {
        return Task.FromResult((ICollection<Product>)_products.Where(expression.Compile()));
    }

    public Task<Product> AddAsync(Product entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Product entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteRangeAsync(ICollection<Product> entities)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ExistsAsync(Expression<Func<Product, bool>> expression)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<ProductResponseDto>> GetAllAsync(RetrieveProductsRequestDto retrieveProductsRequestDto)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Product>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Product>> GetAllAsync(params Expression<Func<Product, object>>[] includes)
    {
        throw new NotImplementedException();
    }

    public Task<Product?> GetAsync(Expression<Func<Product, bool>> expression, params Expression<Func<Product, object>>[]? includes)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<ProductBrandDto>> GetBrandsAsync(RetrieveProductsRequestDto retrieveProductsRequestDto)
    {
        throw new NotImplementedException();
    }

    public Task<Product?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<int> SaveAsync()
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Product entity)
    {
        throw new NotImplementedException();
    }

    public Task<int> GetProductStockAsync(int productId, DateTime startDate, DateTime endDate)
    {
        throw new NotImplementedException();
    }
}