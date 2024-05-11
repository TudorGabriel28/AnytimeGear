using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Repositories;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnytimeGear.Server.Controllers;

public class ProductsController : ApiController
{
    private readonly IProductRepository _productRepository;

    public ProductsController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpGet]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<CustomListResponseDto<CategoryResponseDto>>> RetrieveCategories()
    {
        var products = await _productRepository.GetAllAsync();

        var response = products.Select(e => new CategoryResponseDto { Id = e.Id, Name = e.Name });

        return Ok(response);
    }
}
