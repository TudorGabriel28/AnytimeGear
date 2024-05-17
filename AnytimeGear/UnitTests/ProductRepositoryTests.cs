using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using AnytimeGear.Server.Data;
using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitTests.Mocks;
using AnytimeGear.Server.Repositories.Interfaces;

namespace UnitTests
{
    [TestClass]
    public class ProductRepositoryTests
    {
        private IProductRepository _productRepository;

        [TestInitialize]
        public void Initialize()
        {
            _productRepository = IProductRepositoryMock.GetMock();
        }

        //[TestMethod]
        //public async Task GetAllAsync_ShouldReturnFilteredProducts()
        //{
        //    // Arrange
        //    var requestDto = new RetrieveProductsRequestDto
        //    {
        //        SortKey = "price",
        //        SortOrder = "asc",
        //        CheckedBrandNames = new List<string> { "Brand A" },
        //        StartDate = DateTime.Now.AddDays(-2).ToString(),
        //        EndDate = DateTime.Now.AddDays(2).ToString(),
        //        Quantity = 1,
        //        SubcategoryId = 1
        //    };

        //    // Act
        //    var result = await _productRepository.GetAllAsync(requestDto);

        //    // Assert
        //    Assert.AreEqual(10, result.Count);
        //    Assert.AreEqual("Product 1", result.First().Name);
        //}

        //[TestMethod]
        //public async Task GetBrandsAsync_ShouldReturnBrands()
        //{
        //    // Arrange
        //    var requestDto = new RetrieveProductsRequestDto
        //    {
        //        StartDate = DateTime.Now.AddDays(-2).ToString(),
        //        EndDate = DateTime.Now.AddDays(2).ToString(),
        //        Quantity = 1,
        //        SubcategoryId = 1,
        //        SortKey = "price",
        //        SortOrder = "asc"
        //    };

        //    // Act
        //    var result = await _productRepository.GetBrandsAsync(requestDto);

        //    // Assert
        //    Assert.AreEqual(10, result.Count);
        //    Assert.AreEqual("Brand A", result.First().Name);
        //    Assert.AreEqual(1, result.First().Count);
        //}
    }
}
