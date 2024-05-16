using Microsoft.EntityFrameworkCore;
using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Data;

public class AnytimeGearServerContext : DbContext
{
   
    public AnytimeGearServerContext(DbContextOptions<AnytimeGearServerContext> options)
        : base(options)
    {
    }

    public DbSet<User> User { get; set; } = default!;
    public DbSet<Product> Product { get; set; } = default!;
    public DbSet<Category> Category { get; set; } = default!;
    public DbSet<Subcategory> Subcategory { get; set; } = default!;
    public DbSet<Rental> Rental { get; set; } = default!;
    public DbSet<Address> Address { get; set; } = default!;
}
