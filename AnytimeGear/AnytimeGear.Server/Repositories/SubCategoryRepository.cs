using AnytimeGear.Server.Data;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;

namespace AnytimeGear.Server.Repositories;

public class SubCategoryRepository : GenericRepository<SubCategory>, ISubCategoryRepository
{
    public SubCategoryRepository(AnytimeGearServerContext context) : base(context)
    {
    }
}
