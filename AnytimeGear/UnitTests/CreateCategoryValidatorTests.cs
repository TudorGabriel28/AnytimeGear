using AnytimeGear.Server.Models;
using AnytimeGear.Server.Validators;
using UnitTests.Mocks;

namespace UnitTests;

[TestClass]
public class CreateCategoryValidatorTests
{
    [TestMethod]
    public async Task Given_ValidCategory_When_ValidateAsync_Returns_IsValid()
    {

        // Arrange
        var validator = new CreateCategoryValidator(new CategoryRepositoryMock(false));
        var category = new Category { Name = "Test" };

        // Act
        var result = await validator.ValidateAsync(category);

        // Assert
        Assert.IsTrue(result.IsValid);
    }

    [TestMethod]
    public async Task Given_CategoryNameBlank_When_ValidateAsync_Returns_IsNotValid()
    {

        // Arrange
        var validator = new CreateCategoryValidator(new CategoryRepositoryMock(false));
        var category = new Category { Name = "" };

        // Act
        var result = await validator.ValidateAsync(category);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 2);

        Assert.AreEqual(result.Errors["Name"][0], "Name is required");
        Assert.AreEqual(result.Errors["Name"][1], "Name must be at least 2 characters");
    }
    
    [TestMethod]
    public async Task Given_DuplicatedCategory_When_ValidateAsync_Returns_IsNotValid()
    {

        // Arrange
        var validator = new CreateCategoryValidator(new CategoryRepositoryMock(true));
        var category = new Category { Name = "Test" };

        // Act
        var result = await validator.ValidateAsync(category);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 1);

        Assert.AreEqual(result.Errors["Name"][0], "Category already exists");
    }

    [TestMethod]
    public async Task Given_CategoryNameShorterThanMin_When_ValidateAsync_Returns_IsNotValid()
    {

        // Arrange
        var validator = new CreateCategoryValidator(new CategoryRepositoryMock(false));
        var category = new Category { Name = "A" };

        // Act
        var result = await validator.ValidateAsync(category);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 1);
        
        Assert.AreEqual(result.Errors["Name"][0], "Name must be at least 2 characters");
    }

    [TestMethod]
    public async Task Given_CategoryNameLongerThanMax_When_ValidateAsync_Returns_IsNotValid()
    {

        // Arrange
        var validator = new CreateCategoryValidator(new CategoryRepositoryMock(false));
        var category = new Category { Name = "Abcdefghijklmnopqrstuvwxyz123456789" };

        // Act
        var result = await validator.ValidateAsync(category);

        // Assert
        Assert.IsFalse(result.IsValid);
        Assert.AreEqual(result.Errors["Name"].Count, 1);

        Assert.AreEqual(result.Errors["Name"][0], "Name must be less than or equal to 32 characters");
    }
}
