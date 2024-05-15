namespace AnytimeGear.Server.Models;

public class Subcategory
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required int CategoryId { get; set; }
    public required Category Category { get; set; }
}
