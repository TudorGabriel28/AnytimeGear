using AnytimeGear.Server.Models;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AnytimeGear.Server.Validators;


namespace AnytimeGear.Server.Controllers;

public class CategoriesController : ApiController
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly ICreateCategoryValidator _createCategoryValidator; 

    public CategoriesController(ICategoryRepository categoryRepository, ICreateCategoryValidator createCategoryValidator)
    {
        _categoryRepository = categoryRepository;
        _createCategoryValidator = createCategoryValidator;

    }

    [HttpGet]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<CustomListResponseDto<CategoryResponseDto>>> RetrieveCategories()
    {
        var categories = await _categoryRepository.GetAllAsync();

        var response = categories.Select(e => new CategoryResponseDto { Id = e.Id, Name = e.Name });

        return Ok(response);
    }

    [HttpGet]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryResponseDto>> RetrieveCategoryById([FromRoute] int id)
    {
        var result = await _categoryRepository.GetByIdAsync(id);

        if (result is null)
        {
            return NotFound("Category not found.");
        }

        var responseDto = new CategoryResponseDto
        {
            Id = result.Id,
            Name = result.Name
        };

        return Ok(responseDto);
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateCategory([FromBody] UpsertCategoryRequestDto requestDto)
    {
        var category = new Category
        {
            Name = requestDto.Name
        };

        var validationResult = await _createCategoryValidator.ValidateAsync(category);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var result = await _categoryRepository.AddAsync(category);
        await _categoryRepository.SaveAsync();

        var responseDto = new CategoryResponseDto
        {
            Id = result.Id,
            Name = result.Name
        };

        return CreatedAtAction(nameof(RetrieveCategoryById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateCategory([FromRoute] int id, [FromBody] UpsertCategoryRequestDto requestDto)
    {
        if (string.IsNullOrEmpty(requestDto.Name))
        {
            return BadRequest("Name is required.");
            //Preferably, use FluentValidation to validate the requestDto
        }

        var category = await _categoryRepository.GetByIdAsync(id);

        if (category is null)
        {
            return NotFound("Category not found.");
        }

        category.Name = requestDto.Name;

        await _categoryRepository.UpdateAsync(category);
        await _categoryRepository.SaveAsync();

        var responseDto = new CategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name
        };

        return Ok(responseDto);
    }

    [HttpDelete]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> DeleteCategory([FromRoute] int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        if(category is not null)
        {
           await _categoryRepository.DeleteAsync(category);
           await _categoryRepository.SaveAsync();
        }

        return NoContent();
    }
}
