using AnytimeGear.Server.Data;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;

namespace AnytimeGear.Server.Repositories;

public class RentalRepository : GenericRepository<Rental>, IRentalRepository
{
    public RentalRepository(AnytimeGearContext context) : base(context)
    {
    }
}
