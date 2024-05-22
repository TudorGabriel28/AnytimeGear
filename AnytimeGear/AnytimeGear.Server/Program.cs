using Microsoft.EntityFrameworkCore;
using AnytimeGear.Server.Data;
using AnytimeGear.Server.Repositories.Interfaces;
using AnytimeGear.Server.Repositories;
using AnytimeGear.Server.Infrastructure;
using AutoMapper;
using AnytimeGear.Server.Misc;
using AnytimeGear.Server.Validators;
using AnytimeGear.Server.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using AnytimeGear.Server.Infrastructure.Abstractions;
using AnytimeGear.Server.Validators.Interfaces;

var CORSCustomAllowedOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
var key = Encoding.UTF8.GetBytes(builder?.Configuration["Jwt:Key"]);

builder.Services.AddDbContext<AnytimeGearContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AnytimeGearContext") ?? throw new InvalidOperationException("Connection string 'AnytimeGearServerContext' not found.")));


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CORSCustomAllowedOrigins,
                      policy =>
                      {
                          policy
                          .AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

// Add services to the container.
builder.Services.AddScoped<IAddressRepository, AddressRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IRentalRepository, RentalRepository>();
builder.Services.AddScoped<ISubcategoryRepository, SubcategoryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICreateCategoryValidator, CreateCategoryValidator>();
builder.Services.AddScoped<ICreateSubcategoryValidator, CreateSubcategoryValidator>();
builder.Services.AddScoped<IRegisterRequestValidator, RegisterRequestValidator>();
builder.Services.AddScoped<IRetrieveProductsRequestValidator, RetrieveProductsRequestValidator>();
builder.Services.AddScoped<IUserProvider, UserProvider>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});
IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddControllers();

builder.Services.AddAuthentication("CustomScheme")
.AddScheme<ApplicationAuthOptions, ApplicationAuthHandler>("CustomScheme", options =>
{
    options.SecretKey = builder.Configuration["Jwt:Key"];
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        LogValidationExceptions = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});
builder.Services.AddAuthorization();

builder.Services.AddIdentity<User, ApplicationRole>(opt =>
{
    opt.Password.RequiredLength = 8;
    opt.Password.RequireDigit = true;
    opt.Password.RequireLowercase = true;
    opt.Password.RequireNonAlphanumeric = true;
    opt.Password.RequireUppercase = true;
    opt.User.RequireUniqueEmail = true;
    opt.SignIn.RequireConfirmedPhoneNumber = false;
    opt.SignIn.RequireConfirmedEmail = false;
}).AddEntityFrameworkStores<AnytimeGearContext>()
  .AddDefaultTokenProviders();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(CORSCustomAllowedOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();