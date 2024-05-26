using AnytimeGear.Server.Data;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using AnytimeGear.Server.Validators.Interfaces;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace AnytimeGear.Server.Validators;

public class CreateCategoryValidator : ICreateCategoryValidator
{
    private readonly ICategoryRepository _categoryRepository;

    public CreateCategoryValidator(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<ValidationResult> ValidateAsync(Category model)
    {

        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(model.Name))
        {
           errors.Add("Name is required");  
        }

        if(model.Name.Length > 32)
        {
            errors.Add("Name must be less than or equal to 32 characters");
        }

        if (model.Name.Length < 2)
        {
            errors.Add("Name must be at least 2 characters");
        }

        var categoryExists = await _categoryRepository.ExistsAsync(c => c.Name == model.Name);

        if (categoryExists)
        {
            errors.Add("Category already exists");
        }
        
        if(errors.Count > 0)
        {
            var errorMap = new Dictionary<string, List<string>>
            {
                { nameof(Category.Name), errors }
            };  
            return new ValidationResult(errorMap);
        }

        return new ValidationResult();
    }
}
