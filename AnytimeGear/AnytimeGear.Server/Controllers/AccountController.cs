using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Validators;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AnytimeGear.Server.Controllers;

public class AccountController : ApiController
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IRegisterRequestValidator _registerRequestValidator;

    public AccountController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        IMapper mapper,
        IRegisterRequestValidator registerRequestValidator,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
        _registerRequestValidator = registerRequestValidator;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto requestDto)
    {
        var validationResult = await _registerRequestValidator.ValidateAsync(requestDto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var user = _mapper.Map<User>(requestDto);

        var result = await _userManager.CreateAsync(user, requestDto.Password);

        if (result.Succeeded)
        {
            return Ok(new { Succeeded = true, Message = "Registration successful", Errors = Enumerable.Empty<IdentityError>() });
        }

        return BadRequest(new { Succeeded = false, Message = "Registration failed", Errors = result.Errors }); ;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto requestDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _signInManager.PasswordSignInAsync(requestDto.Email, requestDto.Password, false, false);

        if (!result.Succeeded)
        {
            return BadRequest("Username or password is not correct.");
        }

        var user = await _userManager.FindByEmailAsync(requestDto.Email);

        if(user is null)
        {
            return BadRequest("Username or password is not correct.");
        }

        var token = GenerateJwtToken(user);

        return Ok(new { AccessToken = token, ExpiresIn = 3600 });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new Claim[]
        {
            new (JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (ClaimTypes.NameIdentifier, user.Id.ToString()),
            new (ClaimTypes.Name, user.UserName),
            new (ClaimTypes.Email, user.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
