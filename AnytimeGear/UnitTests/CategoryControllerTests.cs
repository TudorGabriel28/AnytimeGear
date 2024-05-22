using AnytimeGear.Server.Controllers;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using AnytimeGear.Server.Validators.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests;

[TestClass]
public class CategoryControllerTests
{

    [TestMethod]
    public async Task RetrieveCategories_ReturnsAllCategories()
    {
        // Arrange
        var mockCategoryRepository = new Mock<ICategoryRepository>();
        var mockCategories = new List<Category>
        {
            new Category { Id = 1, Name = "Category1" },
            new Category { Id = 2, Name = "Category2" },
        };

        mockCategoryRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(mockCategories);
        Mock<ICreateCategoryValidator> mockCreateCategoryValidator = new Mock<ICreateCategoryValidator>();

        var controller = new CategoriesController(mockCategoryRepository.Object, mockCreateCategoryValidator.Object);

        // Act
        var result = await controller.RetrieveCategories();
        var okResult = result.Result as OkObjectResult;
        var response = okResult.Value as IEnumerable<CategoryResponseDto>;
        // Assert
        Assert.IsInstanceOfType(okResult, typeof(OkObjectResult));
        Assert.IsInstanceOfType(response, typeof(IEnumerable<CategoryResponseDto>));

        Assert.AreEqual(mockCategories.Count, response.Count());
        Assert.AreEqual(mockCategories.First().Id, response.First().Id);
        Assert.AreEqual(mockCategories.First().Name, response.First().Name);
    }
}
