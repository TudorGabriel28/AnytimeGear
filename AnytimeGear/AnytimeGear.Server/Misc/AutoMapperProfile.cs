using AnytimeGear.Server.Dtos;
using AnytimeGear.Server.Models;
using AutoMapper;

namespace AnytimeGear.Server.Misc
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductResponseDto>().ReverseMap();
            CreateMap<Subcategory, SubcategoryResponseDto>().ReverseMap();
            CreateMap<Category, CategoryResponseDto>().ReverseMap();
            CreateMap<RegisterRequestDto, User>();
            //CreateMap<ICollection<Product>, ICollection<ProductResponseDto>>().ReverseMap();
            //CreateMap<ICollection<Category>, ICollection<CategoryResponseDto>>().ReverseMap();
            //CreateMap<ICollection<Subcategory>, ICollection<SubcategoryResponseDto>>().ReverseMap();
            //CreateMap<List<Product>, List<ProductResponseDto>>().ReverseMap();
            //CreateMap<List<Category>, List<CategoryResponseDto>>().ReverseMap();
            //CreateMap<List<Subcategory>, List<SubcategoryResponseDto>>().ReverseMap();
        }
    }
}
