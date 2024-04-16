namespace AnytimeGear.Server.Dtos;

public class CustomListResponseDto<T> where T : class
{
    public IEnumerable<T> Items { get; set; } = [];
    public int Count { get; set; }
}
