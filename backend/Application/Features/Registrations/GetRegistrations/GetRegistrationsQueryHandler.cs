namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationsQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>>
{
    public async Task<Result<GetRegistrationsResponse>> HandleAsync(
        GetRegistrationsQuery query,
        CancellationToken cancellationToken = default)
    {
        var dbQuery = dbContext.Registrations.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var search = query.ParticipantName.Trim().ToLower();
            dbQuery = dbQuery.Where(r => r.ParticipantName.ToLower().Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(query.Type) &&
            Enum.TryParse<RegistrationType>(query.Type, true, out var parsedType))
        {
            dbQuery = dbQuery.Where(r => r.RegistrationType == parsedType);
        }

        if (!string.IsNullOrWhiteSpace(query.Status) &&
            Enum.TryParse<RegistrationStatus>(query.Status, true, out var parsedStatus))
        {
            dbQuery = dbQuery.Where(r => r.Status == parsedStatus);
        }

        var totalCount = await dbQuery.CountAsync(cancellationToken);

        var totalPages = totalCount == 0 ? 0 : (int)Math.Ceiling((double)totalCount / query.PageSize);

        var items = await dbQuery
            .OrderByDescending(r => r.RegistrationDate)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync(cancellationToken);

        var responseItems = items.Select(r => new RegistrationItemResponse(
            r.Id,
            r.RegistrationNumber,
            r.RegistrationDate,
            r.ParticipantName,
            r.ContactNumber,
            r.Email,
            r.Address,
            r.CarMakeModel,
            r.PlateNumber,
            r.RegistrationType.ToString(),
            r.Status.ToString(),
            r.RegistrationFee,
            r.AmountPaid,
            r.PaymentStatus.ToString()
        )).ToList();

        var response = new GetRegistrationsResponse(
            responseItems,
            query.Page,
            query.PageSize,
            totalCount,
            totalPages
        );

        return Result<GetRegistrationsResponse>.Success(response);
    }
}
