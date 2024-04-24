﻿using AnytimeGear.Server.Models;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AnytimeGear.Server.Controllers;

public class SubcategoriesController : ApiController
{
    private readonly ISubcategoryRepository _subcategoryRepository;
    private readonly ICategoryRepository _categoryRepository;

    public SubcategoriesController(ISubcategoryRepository subcategoryRepository, ICategoryRepository categoryRepository)
    {
        _subcategoryRepository = subcategoryRepository;
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<CustomListResponseDto<SubcategoryResponseDto>>> RetrieveCategories()
    {
        var subcategories = await _subcategoryRepository.GetAllAsync(sc => sc.Category);

        List< SubcategoryResponseDto> subcategoryResponseDtos = new List< SubcategoryResponseDto>();

        foreach ( var subcategory in subcategories )
        {
            subcategoryResponseDtos.Add(new SubcategoryResponseDto() { Id = subcategory.Id, Name = subcategory.Name, Category=subcategory.Category });
        }

        return Ok(subcategoryResponseDtos);
    }

    [HttpGet]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SubcategoryResponseDto>> RetrieveSubcategoryById([FromRoute] int id)
    {
        var result = await _subcategoryRepository.GetAsync(sc => sc.Id == id, sc => sc.Category);

        if (result is null)
        {
            return NotFound("Subcategory not found.");
        }

        var responseDto = new SubcategoryResponseDto
        {
            Id = result.Id,
            Name = result.Name,
            Category = result.Category,
        };

        return Ok(responseDto);
    }

    [HttpPost]
    [Route("")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateSubcategory([FromBody] UpsertSubcategoryRequestDto requestDto)
    {
        if (string.IsNullOrEmpty(requestDto.Name))
        {
            return BadRequest("Name is required.");
            //Preferably, use FluentValidation to validate the requestDto
        }

        Category? category = await _categoryRepository.GetByIdAsync(requestDto.CategoryId);

        if(category is null)
        {
            return BadRequest("Category not found.");
        }

        var subcategory = new Subcategory
        {
            Name = requestDto.Name,
            Category = category
        };

        var result = await _subcategoryRepository.AddAsync(subcategory);
        await _subcategoryRepository.SaveAsync();

        var responseDto = new SubcategoryResponseDto
        {
            Id = result.Id,
            Name = result.Name,
            Category = result.Category,
        };

        return CreatedAtAction(nameof(RetrieveSubcategoryById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateSubcategory([FromRoute] int id, [FromBody] UpsertCategoryRequestDto requestDto)
    {
        if (string.IsNullOrEmpty(requestDto.Name))
        {
            return BadRequest("Name is required.");
            //Preferably, use FluentValidation to validate the requestDto
        }

        var subcategory = await _subcategoryRepository.GetAsync(sc => sc.Id == id, sc => sc.Category);

        if (subcategory is null)
        {
            return NotFound("Subcategory not found.");
        }

        subcategory.Name = requestDto.Name;

        await _subcategoryRepository.UpdateAsync(subcategory);
        await _subcategoryRepository.SaveAsync();

        var responseDto = new SubcategoryResponseDto
        {
            Id = subcategory.Id,
            Name = subcategory.Name,
            Category = subcategory.Category,
        };

        return Ok(responseDto);
    }

    [HttpDelete]
    [Route("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> DeleteSubcategory([FromRoute] int id)
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
