using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Infrastructure.Abstractions;
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
    private readonly IUserProvider _userProvider;

    public RentalsController(IRentalRepository rentalRepository, IProductRepository productRepository, IUserRepository userRepository, IUserProvider userProvider)
    {
        _rentalRepository = rentalRepository;
        _productRepository = productRepository;
        _userRepository = userRepository;
        _userProvider = userProvider;
    }

    [HttpGet]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<RentalDto>>> GetRentals()
    {
        var user = await _userProvider.GetCurrentUserAsync();

        if(user == null)
        {
            return BadRequest("Not authorised");
        }

        var rentals = await _rentalRepository.GetAllAsync(r => r.User.Id == user.Id, r => r.User, r => r.Product);
        
        List<RentalDto> result = [];

        foreach (var rental in rentals)
        {
            result.Add(new RentalDto
            {
                Id = rental.Id,
                ProductName = rental.Product.Name,
                Price = (int)(rental.Product.Price * rental.Quantity * (int)(rental.EndPeriod - rental.StartPeriod).TotalDays),
                StartDate = rental.StartPeriod.ToString("dd-MM-yyyy"),
                EndDate = rental.EndPeriod.ToString("dd-MM-yyyy"),
                Quantity = rental.Quantity,
                Completed = rental.Completed
            });
        }
        return Ok(result);
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

        var user = await _userProvider.GetCurrentUserAsync();

        if (user == null)
        {
            return BadRequest("Not Authorised");
        }

        Rental rental = new()
        {
            Product = product,
            User = user,
            StartPeriod = requestDto.StartDate,
            EndPeriod = requestDto.EndDate,
            Completed = false,
            Quantity = requestDto.Quantity
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
