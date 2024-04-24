namespace AnytimeGear.Server.Dtos;

public class UpsertSubcategoryRequestDto
{
    public required string Name { get; set; }
    public int CategoryId { get; set; }
}
