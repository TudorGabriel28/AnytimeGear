using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories;
using AnytimeGear.Server.Repositories.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace AnytimeGear.Server.Controllers;

public class ProductsController : ApiController
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;

    public ProductsController(IProductRepository productRepository, IMapper mapper)
    {
        _productRepository = productRepository;
        _mapper = mapper;
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ProductListResponseDto>> RetrieveProducts(RetrieveProductsRequestDto request)
    {

        ICollection<ProductResponseDto> products = await _productRepository.GetAllAsync(request);
        ICollection<ProductBrandDto> productBrands = await _productRepository.GetBrandsAsync(request);

        var response = new ProductListResponseDto
        {
            Items = products,
            TotalCount = products.Count,
            MinPrice = products.Min(p => p.Price),
            MaxPrice = products.Max(p => p.Price),
            Brands = productBrands,
            SortKey = request.SortKey,
            SortOrder = request.SortOrder,
            CheckedBrandNames = request.CheckedBrandNames
        };

        return Ok(response);
    }
}
