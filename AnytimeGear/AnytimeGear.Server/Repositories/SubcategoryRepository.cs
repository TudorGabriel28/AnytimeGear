using AnytimeGear.Server.Data;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;

namespace AnytimeGear.Server.Repositories;

public class SubcategoryRepository : GenericRepository<Subcategory>, ISubcategoryRepository
{
    public SubcategoryRepository(AnytimeGearContext context) : base(context)
    {
    }

}
