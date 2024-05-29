using AnytimeGear.Server.Data;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AnytimeGear.Server.Repositories;

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
    public ProductRepository(AnytimeGearContext dbContext) : base(dbContext)
    {
    }

    public async Task<ICollection<ProductResponseDto>> GetAllAsync(RetrieveProductsRequestDto retrieveProductsRequestDto)
    {
        string sortKey = retrieveProductsRequestDto.SortKey;
        string sortOrder = retrieveProductsRequestDto.SortOrder;
        List<string> brands = retrieveProductsRequestDto.CheckedBrandNames;
        DateTime startDate = DateTime.Parse(retrieveProductsRequestDto.StartDate);
        DateTime endDate = DateTime.Parse(retrieveProductsRequestDto.EndDate);
        int quantity = retrieveProductsRequestDto.Quantity;
        int subcategoryId = retrieveProductsRequestDto.SubcategoryId;

        IQueryable<Product> query = dbSet.Include(p => p.Subcategory.Category)
            .Include(p => p.Rentals)
            .Where(p => p.Subcategory.Id == subcategoryId)
            .Where(p => p.Capacity >= quantity + p.Rentals.Where(r => r.StartPeriod <= endDate && r.EndPeriod >= startDate).Sum(r => r.Quantity))
            .AsNoTracking();

        switch (sortKey)
        {
            case "price":
                if (sortOrder == "asc")
                    query = query.OrderBy(x => x.Price);
                else
                    query = query.OrderByDescending(x => x.Price);
                break;
            //case "createdAt":
            //    query = query.OrderBy(x => x.CreatedAt);
            //    break;
            default:
                break;
        }

        if (brands != null && brands.Count > 0)
        {
            query = query.Where(x => brands.Contains(x.Brand));
        }

        return await query.Select(p => new ProductResponseDto
        {
            Id = p.Id,
            Name = p.Name,
            Brand = p.Brand,
            Model = p.Model,
            Description = p.Description,
            Price = p.Price,
            Capacity = p.Capacity,
            ReplacementValue = p.ReplacementValue,
            Subcategory = p.Subcategory,
            ProductPicture = p.ProductPicture,
            Stock = p.Capacity - p.Rentals.Where(r => r.StartPeriod <= endDate && r.EndPeriod >= startDate).Sum(r => r.Quantity)
        }).ToListAsync();
    }

    public async Task<ICollection<ProductBrandDto>> GetBrandsAsync(RetrieveProductsRequestDto retrieveProductsRequestDto)
    {
        DateTime startDate = DateTime.Parse(retrieveProductsRequestDto.StartDate);
        DateTime endDate = DateTime.Parse(retrieveProductsRequestDto.EndDate);
        int quantity = retrieveProductsRequestDto.Quantity;
        int subcategoryId = retrieveProductsRequestDto.SubcategoryId;

        return await dbSet.Include(p => p.Subcategory.Category)
            .Include(p => p.Rentals)
            .Where(p => p.Subcategory.Id == subcategoryId)
            .Where(p => p.Capacity >= quantity + p.Rentals.Count(r => r.StartPeriod >= startDate && r.EndPeriod <= endDate))
            .GroupBy(p => p.Brand)
            .Select(g => new ProductBrandDto
            {
                Name = g.Key,
                Count = g.Count()
            }).AsNoTracking().ToListAsync();
    }

    public async Task<int> GetProductStockAsync(int productId, DateTime startDate, DateTime endDate)
    {
        return await dbSet.Where(p => p.Id == productId)
            .Select(p => p.Capacity - p.Rentals.Where(r => r.StartPeriod <= endDate && r.EndPeriod >= startDate).Sum(r => r.Quantity)).FirstOrDefaultAsync();
    }
}