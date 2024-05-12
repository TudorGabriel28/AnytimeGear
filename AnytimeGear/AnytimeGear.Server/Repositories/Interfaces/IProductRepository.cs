using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using System.Numerics;

namespace AnytimeGear.Server.Repositories.Interfaces;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<ICollection<ProductResponseDto>> GetAllAsync(RetrieveProductsRequestDto retrieveProductsRequestDto);
    Task<ICollection<ProductBrandDto>> GetBrandsAsync(RetrieveProductsRequestDto retrieveProductsRequestDto);
}
