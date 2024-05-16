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
    private readonly ICategoryRepository _categoryRepository;
    private readonly ISubcategoryRepository _subCategoryRepository;
    private readonly IMapper _mapper;

    public ProductsController(IProductRepository productRepository, IMapper mapper, ICategoryRepository categoryRepository, ISubcategoryRepository subcategoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
        _subCategoryRepository = subcategoryRepository;
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

    [HttpPost]
    [Route("/create")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateProduct([FromBody] UpsertProductRequestDto requestDto)
    {
        if (string.IsNullOrEmpty(requestDto.Name))
        {
            return BadRequest("Name is required.");
        }

        Subcategory subcategory = await _subCategoryRepository.GetAsync(e => e.Id == requestDto.SubcategoryId, sc => sc.Category);

        if (subcategory == null)
        {
            return BadRequest("Subcategory not found.");
        }

        var product = new Product
        {
            Name = requestDto.Name,
            Brand = requestDto.Brand,
            Model = requestDto.Model,
            Subcategory = subcategory,
            Description = requestDto.Description,
            ProductPicture = requestDto.ProductPicture,
            Price = requestDto.Price,
            Capacity = requestDto.Capacity,
            ReplacementValue = requestDto.ReplacementValue
        };

        var result = await _productRepository.AddAsync(product);
        await _productRepository.SaveAsync();

        return Created();
    }

    [HttpPut]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateProduct([FromRoute] int id, [FromBody] UpsertProductRequestDto requestDto)
    {
        if (string.IsNullOrEmpty(requestDto.Name))
        {
            return BadRequest("Name is required.");
            //Preferably, use FluentValidation to validate the requestDto
        }

        var product = await _productRepository.GetByIdAsync(id);

        if (product is null)
        {
            return NotFound("Product not found.");
        }

        var subcategory = await _subCategoryRepository.GetAsync(e => e.Id == requestDto.SubcategoryId, sc => sc.Category);

        if (subcategory is null)
        {
            return BadRequest("Subcategory not found.");
        }

        product.Name = requestDto.Name;
        product.Brand = requestDto.Brand;
        product.Model = requestDto.Model;
        product.Subcategory = subcategory;
        product.Description = requestDto.Description;
        product.ProductPicture = requestDto.ProductPicture;
        product.Price = requestDto.Price;
        product.Capacity = requestDto.Capacity;
        product.ReplacementValue = requestDto.ReplacementValue;

        await _productRepository.UpdateAsync(product);
        await _productRepository.SaveAsync();

        return Ok();
    }

    [HttpDelete]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> DeleteProduct([FromRoute] int id)
    {
        var product = await _productRepository.GetByIdAsync(id);

        if (product is not null)
        {
            await _productRepository.DeleteAsync(product);
            await _productRepository.SaveAsync();
        }

        return NoContent();
    }

    [HttpGet]
    [Route("/admin/products")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ICollection<Product>> SearchProductsByName([FromQuery] string name)
    {
        ICollection<Product> products = await _productRepository.GetAllAsync(p => p.Name.Contains(name));

        return products;
    }
}