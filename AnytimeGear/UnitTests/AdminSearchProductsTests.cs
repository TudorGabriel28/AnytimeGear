using AnytimeGear.Server.Controllers;
using AnytimeGear.Server.Infrastructure;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Validators;
using AutoMapper;
using Humanizer.Configuration;
using UnitTests.Mocks;

namespace UnitTests;

[TestClass]
public class AdminSearchProductsTests
{
    [TestMethod]
    public async Task SearchProductsByName_Returns_SearchedProducts()
    {
        // Arrange
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        var products = new List<Product>
        {
            new Product { Name = "Nana1", Brand = "Brand1", Model = "Model1", Description = "Description1", Price = 100, Capacity = 1, ReplacementValue = 1000 },
            new Product { Name = "Test2", Brand = "Brand2", Model = "Model2", Description = "Description2", Price = 200, Capacity = 2, ReplacementValue = 2000 },
            new Product { Name = "Test3", Brand = "Brand3", Model = "Model3", Description = "Description3", Price = 300, Capacity = 3, ReplacementValue = 3000 }
        };

        var controller = new ProductsController(new ProductRepositoryMock(products), new Mapper(mapperConfig), new CategoryRepositoryMock(false), new SubcategoryRepositoryMock(false), new RetrieveProductsRequestValidator());
        var searchString = "Test";

        // Act

        var result = await controller.SearchProductsByName(searchString);

        // Assert

        Assert.AreEqual(result.Count, 2);
        Assert.AreEqual(result.ElementAt(0).Name, "Test2");
        Assert.AreEqual(result.ElementAt(1).Name, "Test3");
    }

    [TestMethod]
    public async Task SearchProductsByName_With_EmptyString_Returns_AllProducts()
    {
        // Arrange
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        var products = new List<Product>
        {
            new Product { Name = "Nana1", Brand = "Brand1", Model = "Model1", Description = "Description1", Price = 100, Capacity = 1, ReplacementValue = 1000 },
            new Product { Name = "Test2", Brand = "Brand2", Model = "Model2", Description = "Description2", Price = 200, Capacity = 2, ReplacementValue = 2000 },
            new Product { Name = "Test3", Brand = "Brand3", Model = "Model3", Description = "Description3", Price = 300, Capacity = 3, ReplacementValue = 3000 }
        };

        var controller = new ProductsController(new ProductRepositoryMock(products), new Mapper(mapperConfig), new CategoryRepositoryMock(false), new SubcategoryRepositoryMock(false));
        var searchString = "";

        // Act

        var result = await controller.SearchProductsByName(searchString);

        // Assert

        Assert.AreEqual(result.Count, 3);
        Assert.AreEqual(result.ElementAt(0).Name, "Nana1");
        Assert.AreEqual(result.ElementAt(1).Name, "Test2");
        Assert.AreEqual(result.ElementAt(2).Name, "Test3");
    }
}