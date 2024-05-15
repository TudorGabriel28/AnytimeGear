using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Dtos;

public class UpsertProductRequestDto
{
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public string Description { get; set; }
    public string ProductPicture { get; set; }
    public short Price { get; set; }
    public short Capacity { get; set; }
    public short ReplacementValue { get; set; }
    public int SubcategoryId { get; set; }
}