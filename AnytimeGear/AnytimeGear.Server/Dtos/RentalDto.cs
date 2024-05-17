using AnytimeGear.Server.Models;

namespace AnytimeGear.Server.Dtos;

public class RentalDto
{
    public int Id { get; set; }
    public string ProductName { get; set; }
    public int Price { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public int Quantity { get; set; }
    public bool Completed { get; set; }
}
