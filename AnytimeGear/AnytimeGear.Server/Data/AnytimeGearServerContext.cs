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
        public AnytimeGearServerContext (DbContextOptions<AnytimeGearServerContext> options)
            : base(options)
        {
        }

        public DbSet<AnytimeGear.Server.Models.User> User { get; set; } = default!;
    }
}
