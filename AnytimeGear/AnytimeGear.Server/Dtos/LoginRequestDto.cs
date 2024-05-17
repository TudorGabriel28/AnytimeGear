using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AnytimeGear.Server.Dtos;

public class LoginRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [PasswordPropertyText]
    public string Password { get; set; }
}
