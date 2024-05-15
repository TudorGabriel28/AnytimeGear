using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Dtos;

public class ProductResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Brand { get; set; }
    public required string Model { get; set; }
    public required string Description { get; set; }
    public string ProductPicture { get; set; }
    public short Price { get; set; }
    public int Capacity { get; set; }
    public short ReplacementValue { get; set; }
    public required Subcategory Subcategory { get; set; }
    public int Stock { get; set; }
}
