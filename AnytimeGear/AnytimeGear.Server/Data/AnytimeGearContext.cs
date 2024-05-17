using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using AnytimeGear.Server.Models;
using System.Reflection;

namespace AnytimeGear.Server.Data;

public class AnytimeGearContext : IdentityDbContext<User, ApplicationRole, int>
{
    public AnytimeGearContext(DbContextOptions<AnytimeGearContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } = default!;
    public DbSet<Category> Categories { get; set; } = default!;
    public DbSet<Subcategory> Subcategories { get; set; } = default!;
    public DbSet<Rental> Rentals { get; set; } = default!;
    public DbSet<Address> Addresses { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());   
    }
}
