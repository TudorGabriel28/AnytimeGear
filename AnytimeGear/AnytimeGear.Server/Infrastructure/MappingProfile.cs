﻿using AutoMapper;
using AnytimeGear.Server.Models;
using AnytimeGear.Server.Dtos;

namespace AnytimeGear.Server.Infrastructure;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Category, CategoryResponseDto>().ReverseMap();
        CreateMap<Product, ProductResponseDto>().ReverseMap();
    }
}