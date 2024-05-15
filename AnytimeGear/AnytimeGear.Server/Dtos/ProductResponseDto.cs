using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Dtos;

public class ProductResponseDto
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
    public Subcategory Subcategory { get; set; }
    public int Stock { get; set; }
}