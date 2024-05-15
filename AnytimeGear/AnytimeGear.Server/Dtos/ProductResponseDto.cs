using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Dtos;

public class ProductResponseDto
{
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public string Description { get; set; }
    public string ProductPicture { get; set; }
    public short Price { get; set; }
    public short Quantity { get; set; }
    public short ReplacementValue { get; set; }
    public string Category { get; set; }
    public string SubCategory { get; set; }
}