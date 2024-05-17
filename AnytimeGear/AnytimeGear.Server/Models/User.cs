using Microsoft.AspNetCore.Identity;

namespace AnytimeGear.Server.Models;

public class User : IdentityUser<int>
{
    public User()
    {
        
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? ProfilePicture { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public ICollection<Address> Addresses { get; set; } = [];
    public ICollection<Rental> Rentals { get; set; } = [];
}
