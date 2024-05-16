using AnytimeGear.Server.Controllers;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests;

[TestClass]
public class ProductsControllerTests
{
    [TestMethod]
    public async Task RetrieveProducts_ReturnsExpectedResult()
    {
        // Arrange
        var mockProductRepository = new Mock<IProductRepository>();
        var mockMapper = new Mock<IMapper>();
        var mockRequest = new RetrieveProductsRequestDto
        {
            StartDate = DateTime.Now.ToString(),
            EndDate = DateTime.Now.AddDays(2).ToString(),
            Quantity = 1,
            SubcategoryId = 1,
            SortKey = "price",
            SortOrder = "asc",
        };
        var mockProducts = new List<ProductResponseDto>
        {
            new ProductResponseDto { 
                Name = "Test",
                Brand = "Brand A",
                Model = "Model A",
                Description = "Description 1",
                Price = 100,
                Capacity = 10,
                Subcategory = new Subcategory { Id= 1, Name = "Subcategory 1" , Category = new Category { Name = "Category 1", Id= 2 }, CategoryId=2 },
            },
        };
        var mockProductBrands = new List<ProductBrandDto>
        {
            new ProductBrandDto { Name="Brand 1", Count=1 },
        };

        mockProductRepository.Setup(repo => repo.GetAllAsync(mockRequest)).ReturnsAsync(mockProducts);
        mockProductRepository.Setup(repo => repo.GetBrandsAsync(mockRequest)).ReturnsAsync(mockProductBrands);

        var controller = new ProductsController(mockProductRepository.Object, mockMapper.Object);

        // Act
        var result = await controller.RetrieveProducts(mockRequest);

        var okResult = result.Result as OkObjectResult;
        var response = okResult.Value as ProductListResponseDto;

        // Assert
        Assert.IsInstanceOfType(okResult, typeof(OkObjectResult));
        Assert.IsInstanceOfType(response, typeof(ProductListResponseDto));

        Assert.AreEqual(mockProducts.Count, response.TotalCount);
        Assert.AreEqual(mockProducts.Min(p => p.Price), response.MinPrice);
        Assert.AreEqual(mockProducts.Max(p => p.Price), response.MaxPrice);
        Assert.AreEqual(mockRequest.SortKey, response.SortKey);
        Assert.AreEqual(mockRequest.SortOrder, response.SortOrder);
        Assert.AreEqual(mockRequest.CheckedBrandNames, response.CheckedBrandNames);
    }
}
