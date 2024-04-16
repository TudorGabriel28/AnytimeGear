namespace AnytimeGear.Server.Models;

public class User
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public int Phone { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? ProfilePicture { get; set; }
    public required string Role { get; set; }
    public bool Activated { get; set; }
    public string? ActivationToken { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<Address> Addresses { get; set; } = [];
    public List<Rental> Rentals { get; set; } = [];
}
