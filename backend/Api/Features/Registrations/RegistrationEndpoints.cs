namespace Api.Features.Registrations;

using Api.Common.Extensions;
using Api.Common.Filters;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Common;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

public static class RegistrationEndpoints
{
    public static void MapRegistrationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrations")
            .WithTags("Registrations");

        // 1. POST /api/registrations
        group.MapPost("/", CreateRegistration)
            .WithName("CreateRegistration")
            .WithSummary("Register a participant for Car Show 2027")
            .AddEndpointFilter<ValidationFilter<CreateRegistrationCommand>>()
            .Produces<CreateRegistrationResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status409Conflict);

        // 2. GET /api/registrations/summary (Mapped before {id:guid} to ensure clean routing)
        group.MapGet("/summary", GetSummary)
            .WithName("GetRegistrationSummary")
            .WithSummary("Retrieve dashboard KPI summary totals")
            .Produces<GetRegistrationSummaryResponse>(StatusCodes.Status200OK);

        // 3. GET /api/registrations (Paged & Filtered)
        group.MapGet("/", GetRegistrations)
            .WithName("GetRegistrations")
            .WithSummary("Show all registrations with filtering and pagination")
            .AddEndpointFilter<ValidationFilter<GetRegistrationsQuery>>()
            .Produces<GetRegistrationsResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        // 4. GET /api/registrations/{id:guid}
        group.MapGet("/{id:guid}", GetRegistrationById)
            .WithName("GetRegistrationById")
            .WithSummary("Find a registration by its unique GUID identifier")
            .Produces<GetRegistrationByIdResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    private static async Task<IResult> CreateRegistration(
        CreateRegistrationCommand command,
        ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? Results.Created($"/api/registrations/{result.Value!.Id}", result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetSummary(
        IQueryHandler<GetRegistrationSummaryQuery, Result<GetRegistrationSummaryResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(new GetRegistrationSummaryQuery(), cancellationToken);
        return result.IsSuccess
            ? Results.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetRegistrations(
        [AsParameters] GetRegistrationsQuery query,
        IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? Results.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetRegistrationById(
        Guid id,
        IQueryHandler<GetRegistrationByIdQuery, Result<GetRegistrationByIdResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(new GetRegistrationByIdQuery(id), cancellationToken);
        return result.IsSuccess
            ? Results.Ok(result.Value)
            : result.ToProblemDetails();
    }
}
