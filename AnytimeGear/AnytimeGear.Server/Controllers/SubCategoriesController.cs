using AnytimeGear.Server.Models;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AnytimeGear.Server.Controllers;

public class SubCategoriesController : ApiController
{
    private readonly ISubCategoryRepository _subcategoryRepository;
    private readonly ICategoryRepository _categoryRepository;

    public SubCategoriesController(ISubCategoryRepository subcategoryRepository, ICategoryRepository categoryRepository)
    {
        _subcategoryRepository = subcategoryRepository;
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CustomListResponseDto<SubCategoryResponseDto>>> RetrieveSubCategories()
    {
        var subcategories = await _subcategoryRepository.GetAllAsync();

        if(subcategories.Count == 0)
        {
            return NotFound("No SubCategories found.");
        }

        var categories = await _categoryRepository.GetAllAsync();
        IEnumerable<SubCategoryResponseDto> subcategoriesResponseItems = subcategories.Select(e => new SubCategoryResponseDto { Id = e.Id, Name = e.Name, CategoryName = (categories.Where(m => m.Id == e.CategoryId).FirstOrDefault()).Name });
        var responseDto = new CustomListResponseDto<SubCategoryResponseDto>
        {
            Items = subcategoriesResponseItems,
            Count = subcategories.Count
        };

        return Ok(responseDto);
    }

    [HttpGet]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SubCategoryResponseDto>> RetrieveSubCategoryById([FromRoute] int id)
    {
        var result = await _subcategoryRepository.GetByIdAsync(id);

        if (result is null)
        {
            return NotFound("SubCategory not found.");
        }
        var category = await _categoryRepository.GetByIdAsync(result.CategoryId);
        var responseDto = new SubCategoryResponseDto
        {
            Id = result.Id,
            Name = result.Name,
            CategoryName = category.Name
        };

        return Ok(responseDto);
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateSubCategory([FromBody] UpsertSubCategoryRequestDto requestDto)
    {
        var category = await _categoryRepository.GetAsync(e => e.Name == requestDto.CategoryName);

        if (string.IsNullOrEmpty(requestDto.Name) || category is null)
        {
            return BadRequest("Incorrect data.");
            //Preferably, use FluentValidation to validate the requestDto
        }

        var subcategory = new SubCategory
        {
            Name = requestDto.Name,
            CategoryId = category.Id,
            Category = category
        };

        var result = await _subcategoryRepository.AddAsync(subcategory);
        await _subcategoryRepository.SaveAsync();

        var responseDto = new SubCategoryResponseDto
        {
            Id = result.Id,
            Name = result.Name,
            CategoryName = result.Category.Name
        };

        return CreatedAtAction(nameof(RetrieveSubCategoryById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateSubCategory([FromRoute] int id, [FromBody] UpsertSubCategoryRequestDto requestDto)
    {
        var category = await _categoryRepository.GetAsync(e => e.Name == requestDto.CategoryName);

        if (string.IsNullOrEmpty(requestDto.Name) || category is null)
        {
            return BadRequest("Incorrect data.");
            //Preferably, use FluentValidation to validate the requestDto
        }

        var subcategory = await _subcategoryRepository.GetByIdAsync(id);

        if (subcategory is null)
        {
            return NotFound("SubCategory not found.");
        }

        subcategory.Name = requestDto.Name;
        subcategory.CategoryId = category.Id;
        subcategory.Category = category;

        await _subcategoryRepository.UpdateAsync(subcategory);
        await _subcategoryRepository.SaveAsync();

        var responseDto = new SubCategoryResponseDto
        {
            Id = subcategory.Id,
            Name = subcategory.Name,
            CategoryName = subcategory.Category.Name
        };

        return Ok(responseDto);
    }

    [HttpDelete]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> DeleteSubCategory([FromRoute] int id)
    {
        var subcategory = await _subcategoryRepository.GetByIdAsync(id);

        if(subcategory is not null)
        {
           await _subcategoryRepository.DeleteAsync(subcategory);
           await _subcategoryRepository.SaveAsync();
        }

        return NoContent();
    }
}
