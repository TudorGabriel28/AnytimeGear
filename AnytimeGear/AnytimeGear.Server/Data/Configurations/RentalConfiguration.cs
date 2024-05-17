using AnytimeGear.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnytimeGear.Server.Data.Configurations;

public class RentalConfiguration : IEntityTypeConfiguration<Rental>
{
    public void Configure(EntityTypeBuilder<Rental> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Completed).IsRequired();
        builder.Property(u => u.StartPeriod).IsRequired();
        builder.Property(u => u.EndPeriod).IsRequired();
       
        builder.HasOne(r => r.Product)
            .WithMany(p => p.Rentals)
            .HasForeignKey(r => r.ProductId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
