using AnytimeGear.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnytimeGear.Server.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name).HasMaxLength(128).IsRequired();
        builder.Property(p => p.Brand).HasMaxLength(128).IsRequired();
        builder.Property(p => p.Model).HasMaxLength(128).IsRequired();
        builder.Property(p => p.Price).HasColumnType("decimal(5, 2)").IsRequired();
        builder.Property(p => p.ReplacementValue).HasColumnType("decimal(5, 2)").IsRequired();
        builder.Property(p => p.Capacity).IsRequired();
        builder.Property(p => p.Description).HasMaxLength(1024).IsRequired(false);
        builder.Property(p => p.ProductPicture).IsRequired(false);

        builder.HasOne(p => p.Subcategory)
            .WithMany()
            .HasForeignKey(c => c.SubcategoryId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
