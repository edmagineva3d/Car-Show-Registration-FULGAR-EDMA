using Api.Features.Registrations;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Common;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Database - SQLite
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=carshow.db";
builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options =>
    options.UseSqlite(connectionString));

// CORS - Allow React dev server (http://localhost:5173) and common dev ports
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure JSON options (serialize enums as strings)
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Validators (FluentValidation from Application assembly)
builder.Services.AddValidatorsFromAssembly(typeof(IAppDbContext).Assembly);

// Handlers
builder.Services.AddScoped<ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>, CreateRegistrationCommandHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>>, GetRegistrationsQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationByIdQuery, Result<GetRegistrationByIdResponse>>, GetRegistrationByIdQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetRegistrationSummaryQuery, Result<GetRegistrationSummaryResponse>>, GetRegistrationSummaryQueryHandler>();

// API Documentation (OpenAPI + Scalar)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, _, _) =>
    {
        document.Info.Title = "Car Show 2027 Registration API";
        document.Info.Description = "REST API for Car Show 2027 Registration Management System (AutoVista Events - Sorsogon City Coliseum)";
        document.Info.Version = "v1";
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Database Seeding & Migration
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DbSeeder.Seed(dbContext);
}

// HTTP request pipeline
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.WithTitle("Car Show 2027 API Reference")
               .WithTheme(ScalarTheme.Purple);
    });
}

// Root endpoint
app.MapGet("/", () => "Welcome to the Car Show 2027 Registration API! Go to /scalar/v1 for API documentation.");

// Map Registration Endpoints
app.MapRegistrationEndpoints();

app.Run();
