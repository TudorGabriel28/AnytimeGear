using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Dtos;

public class SubcategoryResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required Category Category { get; set; }
}
