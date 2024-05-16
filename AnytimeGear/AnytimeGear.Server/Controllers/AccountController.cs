using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Validators;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AnytimeGear.Server.Controllers;

public class AccountController : ApiController
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    private readonly IRegisterRequestValidator _registerRequestValidator;

    public AccountController(
        UserManager<User> userManager,
        IMapper mapper,
        IRegisterRequestValidator registerRequestValidator)
    {
        _userManager = userManager;
        _mapper = mapper;
        _registerRequestValidator = registerRequestValidator;
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
            return Ok(new { Message = "Registration successful" });
        }

        return BadRequest(new { result.Errors });
    }
}
