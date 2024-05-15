namespace AnytimeGear.Server.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public string Description { get; set; }
    public string ProductPicture { get; set; }
    public short Price { get; set; }
    public int Capacity { get; set; }
    public short ReplacementValue { get; set; }
    public DateTime CreatedAt { get; set; }
    public required Subcategory Subcategory { get; set; }
    public List<Rental> Rentals { get; set; } = [];
}
