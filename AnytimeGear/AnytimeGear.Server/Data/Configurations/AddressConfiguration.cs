using AnytimeGear.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnytimeGear.Server.Data.Configurations;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Street).HasMaxLength(128).IsRequired();
        builder.Property(a => a.ZipCode).HasMaxLength(32).IsRequired();
        builder.Property(a => a.City).HasMaxLength(64).IsRequired();
        builder.Property(a => a.County).HasMaxLength(64).IsRequired();
        builder.Property(a => a.Country).HasMaxLength(64).IsRequired();
    }
}
