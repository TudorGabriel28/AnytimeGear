using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Data
{
    public class AnytimeGearServerContext : DbContext
    {
        public AnytimeGearServerContext(DbContextOptions<AnytimeGearServerContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Product> Products { get; set; } = default!;
        public DbSet<Category> Categories { get; set; } = default!;
        public DbSet<SubCategory> SubCategories { get; set; } = default!;
        public DbSet<Rental> Rentals { get; set; } = default!;
        public DbSet<Address> Addresses { get; set; } = default!;
    }
}
