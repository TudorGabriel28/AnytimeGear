using AnytimeGear.Server.Models;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AnytimeGear.Server.Controllers;

public class ProductsController : ApiController
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ISubCategoryRepository _subCategoryRepository;

    public ProductsController(IProductRepository productRepository, ICategoryRepository categoryRepository, ISubCategoryRepository subCategoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
        _subCategoryRepository = subCategoryRepository;
    }

    [HttpGet]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<CustomListResponseDto<ProductResponseDto>>> RetrieveProducts()
    {
        var products = await _productRepository.GetAllAsync();

        var responseDto = new CustomListResponseDto<ProductResponseDto>
        {
            Items = products.Select(e => new ProductResponseDto
            {
                Name = e.Name,
                Brand = e.Name,
                Model = e.Model,
                Description = e.Model,
                ProductPicture = e.ProductPicture,
                Price = e.Price,
                Quantity = e.Quantity,
                ReplacementValue = e.ReplacementValue,
                Category = e.Category,
                SubCategory = e.SubCategory
            }),
            Count = products.Count
        };

        return Ok(responseDto);
    }

    [HttpGet]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductResponseDto>> RetrieveProductById([FromRoute] int id)
    {
        var result = await _productRepository.GetByIdAsync(id);

        if (result is null)
        {
            return NotFound("Product not found.");
        }
        return Ok(result);
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateProduct([FromBody] UpsertProductRequestDto requestDto)
    {
        if (string.IsNullOrEmpty(requestDto.Name))
        {
            return BadRequest("Name is required.");
        }

        Category category = await _categoryRepository.GetAsync(e => e.Name == requestDto.Category);
        if (category == null)
        {
            category = new Category { Name = requestDto.Category };
            await _categoryRepository.AddAsync(category);
            await _categoryRepository.SaveAsync();
        }

        var product = new Product
        {
            Name = requestDto.Name,
            Brand = requestDto.Brand,
            Model = requestDto.Model,
            Category = requestDto.Category,
            SubCategory = requestDto.SubCategory,
            Description = requestDto.Description,
            ProductPicture = requestDto.ProductPicture,
            Price = requestDto.Price,
            Quantity = requestDto.Quantity,
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

        product.Name = requestDto.Name;
        product.Brand = requestDto.Brand;
        product.Model = requestDto.Model;
        product.Category = requestDto.Category;
        product.SubCategory = requestDto.SubCategory;
        product.Description = requestDto.Description;
        product.ProductPicture = requestDto.ProductPicture;
        product.Price = requestDto.Price;
        product.Quantity = requestDto.Quantity;
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
}