namespace AnytimeGear.Server.Models;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Brand { get; set; }
    public required string Model { get; set; }
    public required string Description { get; set; }
    public short Price { get; set; }
    public short Quantity { get; set; }
    public short ReplacementValue { get; set; }
    public DateTime CreatedAt { get; set; }
    public required Subcategory Subcategory { get; set; }
    public List<Rental> Rentals { get; set; } = [];
}
