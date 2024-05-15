namespace AnytimeGear.Server.Dtos;

public class ProductListResponseDto
{
    public ICollection<ProductResponseDto> Items { get; set; } = [];
    public int TotalCount { get; set; }
    public int MinPrice { get; set; }
    public int MaxPrice { get; set; }
    public ICollection<ProductBrandDto> Brands { get; set; } = [];
    public required string SortKey { get; set; }
    public required string SortOrder { get; set; }
    public required ICollection<string> CheckedBrandNames { get; set; } = [];
}
