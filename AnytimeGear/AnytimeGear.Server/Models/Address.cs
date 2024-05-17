namespace AnytimeGear.Server.Models;

public class Address
{
    public int Id { get; set; }
    public required string Street { get; set; }
    public required string ZipCode { get; set; }
    public required string City { get; set; }
    public required string County { get; set; }
    public required string Country { get; set; }

    public int UserId { get; set; }
    public required User User { get; set; }
}
