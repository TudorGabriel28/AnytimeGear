using AnytimeGear.Server.Models;
using AnytimeGear.Server.Validators;
using UnitTests.Mocks;

namespace UnitTests;

[TestClass]
public class CreateSubcategoryValidatorTests
{
    [TestMethod]
    public async Task Given_ValidSubcategory_When_ValidateAsync_Returns_IsValid()
    {
        // Arrange
        var validator = new CreateSubcategoryValidator(new SubcategoryRepositoryMock(false));
        var subcategory = new Subcategory { Name = "Test", 
                                            //Category should exist in the database, not tested here
                                            Category = new Category { Name = "Category" } };

        // Act
        var result = await validator.ValidateAsync(subcategory);

        // Assert
        Assert.IsTrue(result.IsValid);
    }

    [TestMethod]
    public async Task Given_SubcategoryNameBlank_When_ValidateAsync_Returns_IsNotValid()
    {
        // Arrange
        var validator = new CreateSubcategoryValidator(new SubcategoryRepositoryMock(false));
        var subcategory = new Subcategory
        {
            Name = "",
            //Category should exist in the database, not tested here
            Category = new Category { Name = "Category" }
        };

        // Act
        var result = await validator.ValidateAsync(subcategory);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 2);
        Assert.AreEqual(result.Errors["Name"][0], "Name is required");
        Assert.AreEqual(result.Errors["Name"][1], "Name must be at least 2 characters");
    }
    
    [TestMethod]
    public async Task Given_DuplicatedSubcategory_When_ValidateAsync_Returns_IsNotValid()
    {
        // Arrange
        var validator = new CreateSubcategoryValidator(new SubcategoryRepositoryMock(true));
        var subcategory = new Subcategory
        {
            Name = "Test",
            //Category should exist in the database, not tested here
            Category = new Category { Name = "Category" }
        };

        // Act
        var result = await validator.ValidateAsync(subcategory);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 1);
        Assert.AreEqual(result.Errors["Name"][0], "Subcategory already exists");
    }

    [TestMethod]
    public async Task Given_SubcategoryNameShorterThanMin_When_ValidateAsync_Returns_IsNotValid()
    {
        // Arrange
        var validator = new CreateSubcategoryValidator(new SubcategoryRepositoryMock(false));
        var subcategory = new Subcategory
        {
            Name = "A",
            //Category should exist in the database, not tested here
            Category = new Category { Name = "Category" }
        };

        // Act
        var result = await validator.ValidateAsync(subcategory);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 1);
        Assert.AreEqual(result.Errors["Name"][0], "Name must be at least 2 characters");
    }

    [TestMethod]
    public async Task Given_SubcategoryNameLongerThanMax_When_ValidateAsync_Returns_IsNotValid()
    {
        // Arrange
        var validator = new CreateSubcategoryValidator(new SubcategoryRepositoryMock(false));
        var subcategory = new Subcategory
        {
            Name = "Abcdefghijklmnopqrstuvwxyz123456789",
            //Category should exist in the database, not tested here
            Category = new Category { Name = "Category" }
        };

        // Act
        var result = await validator.ValidateAsync(subcategory);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 1);
        Assert.AreEqual(result.Errors["Name"][0], "Name must be less than or equal to 32 characters");
    }
}
