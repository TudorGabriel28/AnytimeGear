using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AnytimeGear.Server.Dtos;

public class RegisterRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [PasswordPropertyText]
    public string Password { get; set; }

    [Required]
    [Phone]
    public string PhoneNumber { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }
}
