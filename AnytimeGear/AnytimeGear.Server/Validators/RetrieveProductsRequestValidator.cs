using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Misc;
using AnytimeGear.Server.Validators.Interfaces;
using System.Globalization;

namespace AnytimeGear.Server.Validators;

public class RetrieveProductsRequestValidator : IRetrieveProductsRequestValidator
{
    public Task<ValidationResult> ValidateAsync(RetrieveProductsRequestDto request)
    {
        var errorMap = new Dictionary<string, List<string>>();

        if (!IsValidStartDate(request.StartDate))
        {
            errorMap.Add("StartDate", new List<string> { "Invalid start date" });
        }

        if (!IsValidEndDate(request.EndDate, request.StartDate))
        {
            errorMap.Add("EndDate", new List<string> { "Invalid end date" });
        }

        if (!IsValidSortKey(request.SortKey))
        {
            errorMap.Add("SortKey", new List<string> { "Invalid sort key" });
        }

        if (!IsValidSortOrder(request.SortOrder))
        {
            errorMap.Add("SortOrder", new List<string> { "Invalid sort order" });
        }

        if (!IsValidQuantity(request.Quantity))
        {
            errorMap.Add("Quantity", new List<string> { "Invalid quantity" });
        }

        if (errorMap.Count > 0)
        {
            return Task.FromResult(new ValidationResult(errorMap));
        }

        return Task.FromResult(new ValidationResult());
    }

    private bool IsValidStartDate(string startDate)
    {
        if (string.IsNullOrWhiteSpace(startDate))
        {
            return false;
        }

        if (!DateTime.TryParse(startDate, out _))
        {
            return false;
        }

        if (DateTime.Parse(startDate) < DateTime.Now)
        {
            return false;
        }

        return true;
    }

    private bool IsValidEndDate(string endDate, string startDate)
    {
        if (string.IsNullOrWhiteSpace(endDate))
        {
            return false;
        }

        if (!DateTime.TryParse(endDate, out _))
        {
            return false;
        }

        if (DateTime.Parse(endDate) < DateTime.Parse(startDate))
        {
            return false;
        }

        return true;
    }

    private bool IsValidSortKey(string sortKey)
    {
        if (string.IsNullOrWhiteSpace(sortKey))
        {
            return false;
        }

        if (!Constants.SortKeys.Contains(sortKey))
        {
            return false;
        }

        return true;
    }

    private bool IsValidSortOrder(string sortOrder)
    {
        if (string.IsNullOrWhiteSpace(sortOrder))
        {
            return false;
        }

        if (!Constants.SortOrders.Contains(sortOrder))
        {
            return false;
        }

        return true;
    }

    private bool IsValidQuantity(int quantity)
    {
        if (quantity <= 0)
        {
            return false;
        }

        return true;
    }
}
