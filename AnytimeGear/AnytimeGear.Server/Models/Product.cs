namespace AnytimeGear.Server.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public string Description { get; set; }
    public string ProductPicture { get; set; }
    public decimal Price { get; set; }
    public int Capacity { get; set; }
    public decimal ReplacementValue { get; set; }

    public int SubcategoryId { get; set; }
    public Subcategory Subcategory { get; set; }
    public ICollection<Rental> Rentals { get; set; } = [];
}