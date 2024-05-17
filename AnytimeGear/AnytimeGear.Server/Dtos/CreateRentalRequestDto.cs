namespace AnytimeGear.Server.Dtos;

public class CreateRentalRequestDto
{
    public int ProductId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Quantity { get; set; }
}
