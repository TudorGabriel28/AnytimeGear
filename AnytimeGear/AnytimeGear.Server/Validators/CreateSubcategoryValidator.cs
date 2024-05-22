using AnytimeGear.Server.Data;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using AnytimeGear.Server.Validators.Interfaces;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace AnytimeGear.Server.Validators;

public class CreateSubcategoryValidator : ICreateSubcategoryValidator
{
    private readonly ISubcategoryRepository _subcategoryRepository;

    public CreateSubcategoryValidator(ISubcategoryRepository subcategoryRepository)
    {
        _subcategoryRepository = subcategoryRepository;
    }

    public async Task<ValidationResult> ValidateAsync(Subcategory model)
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

        var subcategoryExists = await _subcategoryRepository.ExistsAsync(c => c.Name == model.Name);

        if (subcategoryExists)
        {
            errors.Add("Subcategory already exists");
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
