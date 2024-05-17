using AnytimeGear.Server.Data;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Repositories;
using AnytimeGear.Server.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace UnitTests.Mocks;
public class IProductRepositoryMock
{
    public static IProductRepository GetMock()
    {
        List<Product> lstProduct = GenerateTestData();
        AnytimeGearContext dbContextMock = DbContextMock.GetMock<Product, AnytimeGearContext>(lstProduct, x => x.Products);
        return new ProductRepository(dbContextMock);
    }

    private static List<Product> GenerateTestData()
    {
        List<Product> lstProduct = new();
        Random rand = new Random();

        Category category = new Category
        {
            Id = 1,
            Name = "Category 1"
        };

        Subcategory subcategory = new Subcategory
        {
            Id = 1,
            Name = "Subcategory 1",
            Category = new Category { Id = 1, Name = "Category 1" }
        };

        for (int index = 1; index <= 10; index++)
        {
            lstProduct.Add(new Product
            {
                Id = 1,
                Name = "Product 1",
                Brand = "Brand A",
                Model = "Model A",
                Description = "Description 1",
                Price = 100,
                Capacity = 10,
                ReplacementValue = 500,
                Subcategory = subcategory,
                Rentals = []
            });
        }
        return lstProduct;
    }
}