namespace AnytimeGear.Server.Dtos;

public class RetrieveProductsRequestDto
{
    public int SubcategoryId { get; set; }
    public required string StartDate { get; set; }
    public required string EndDate { get; set; }
    public int Quantity { get; set; }
    public required string SortKey { get; set; }
    public required string SortOrder { get; set; }
    public List<string> CheckedBrandNames { get; set; } = [];
}
