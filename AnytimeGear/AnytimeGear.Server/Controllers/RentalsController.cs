using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnytimeGear.Server.Controllers;

[Authorize(AuthenticationSchemes = "CustomScheme")]
public class RentalsController : ApiController
{
    private readonly IRentalRepository _rentalRepository;
    private readonly IProductRepository _productRepository;
    private readonly IUserRepository _userRepository;

    public RentalsController(IRentalRepository rentalRepository, IProductRepository productRepository, IUserRepository userRepository)
    {
        _rentalRepository = rentalRepository;
        _productRepository = productRepository;
        _userRepository = userRepository;
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateRental([FromBody] CreateRentalRequestDto requestDto)
    {
        var product = await _productRepository.GetAsync(p => p.Id == requestDto.ProductId);

        if (product == null)
        {
            return BadRequest("Product not found");
        }

        var user = await _userRepository.GetAsync(u => u.Id == requestDto.UserId);

        if (user == null)
        {
            return BadRequest("User not found");
        }

        Rental rental = new()
        {
            Product = product,
            User = user,
            StartPeriod = requestDto.StartDate,
            EndPeriod = requestDto.EndDate,
            Completed = false
        };

        await _rentalRepository.AddAsync(rental);
        var result = await _rentalRepository.SaveAsync();

        if (result != 1)
        {
            return BadRequest("Failed to create rental");
        }

        return Created();
    }
}
