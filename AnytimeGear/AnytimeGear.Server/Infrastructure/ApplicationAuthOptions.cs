using Microsoft.AspNetCore.Authentication;

namespace AnytimeGear.Server.Infrastructure;


public class ApplicationAuthOptions : AuthenticationSchemeOptions
{
    public string SecretKey { get; set; }
}