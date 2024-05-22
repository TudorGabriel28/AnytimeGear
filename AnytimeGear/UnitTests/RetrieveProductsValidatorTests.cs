using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests;

[TestClass]
public class RetrieveProductsRequestValidatorTests
{
    private RetrieveProductsRequestValidator _validator;

    [TestInitialize]
    public void TestInitialize()
    {
        _validator = new RetrieveProductsRequestValidator();
    }

    [TestMethod]
    public async Task ValidateAsync_ReturnsNoErrors_WhenRequestIsValid()
    {
        // Arrange
        var request = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.AddDays(1).ToString(),
            EndDate = DateTime.Now.AddDays(2).ToString(),
            SortKey = "price",
            SortOrder = "asc",
            Quantity = 1
        };

        // Act
        var result = await _validator.ValidateAsync(request);

        // Assert
        Assert.IsTrue(result.IsValid);
    }

    [TestMethod]
    public async Task ValidateAsync_ReturnsError_WhenStartDateIsInvalid()
    {
        // Arrange
        var request = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.AddDays(-1).ToString(),
            EndDate = DateTime.Now.AddDays(2).ToString(),
            SortKey = "price",
            SortOrder = "asc",
            Quantity = 1
        };

        // Act
        var result = await _validator.ValidateAsync(request);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.IsTrue(result.Errors.ContainsKey("StartDate"));
    }

    [TestMethod]
    public async Task ValidateAsync_ReturnsError_WhenEndDateIsInvalid()
    {
        // Arrange
        var request = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.AddDays(1).ToString(),
            EndDate = DateTime.Now.AddDays(-1).ToString(), 
            SortKey = "price",
            SortOrder = "asc",
            Quantity = 1
        };

        // Act
        var result = await _validator.ValidateAsync(request);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.IsTrue(result.Errors.ContainsKey("EndDate"));
    }

    [TestMethod]
    public async Task ValidateAsync_ReturnsError_WhenEndDateIsBeforeStartDate()
    {
        // Arrange
        var request = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.AddDays(2).ToString(),
            EndDate = DateTime.Now.AddDays(1).ToString(), 
            SortKey = "price",
            SortOrder = "asc",
            Quantity = 1
        };

        // Act
        var result = await _validator.ValidateAsync(request);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.IsTrue(result.Errors.ContainsKey("EndDate"));
    }

    [TestMethod]
    public async Task ValidateAsync_ReturnsError_WhenSortKeyIsInvalid()
    {
        // Arrange
        var request = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.AddDays(1).ToString(),
            EndDate = DateTime.Now.AddDays(2).ToString(),
            SortKey = "inprice", 
            SortOrder = "asc",
            Quantity = 1
        };

        // Act
        var result = await _validator.ValidateAsync(request);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.IsTrue(result.Errors.ContainsKey("SortKey"));
    }

    [TestMethod]
    public async Task ValidateAsync_ReturnsError_WhenSortOrderIsInvalid()
    {
        // Arrange
        var request = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.AddDays(1).ToString(),
            EndDate = DateTime.Now.AddDays(2).ToString(),
            SortKey = "price",
            SortOrder = "inasc", 
            Quantity = 1
        };

        // Act
        var result = await _validator.ValidateAsync(request);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.IsTrue(result.Errors.ContainsKey("SortOrder"));
    }

    [TestMethod]
    public async Task ValidateAsync_ReturnsError_WhenQuantityIsInvalid()
    {
        // Arrange
        var request = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.AddDays(1).ToString(),
            EndDate = DateTime.Now.AddDays(2).ToString(),
            SortKey = "price",
            SortOrder = "asc",
            Quantity = 0 
        };

        // Act
        var result = await _validator.ValidateAsync(request);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.IsTrue(result.Errors.ContainsKey("Quantity"));
    }
}

