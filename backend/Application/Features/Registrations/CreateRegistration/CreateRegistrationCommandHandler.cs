namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class CreateRegistrationCommandHandler(IAppDbContext dbContext)
    : ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>
{
    public async Task<Result<CreateRegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        var trimmedPlate = command.PlateNumber?.Trim() ?? string.Empty;

        var plateExists = await dbContext.Registrations
            .AnyAsync(r => r.PlateNumber.ToLower() == trimmedPlate.ToLower(), cancellationToken);

        if (plateExists)
        {
            return Result<CreateRegistrationResponse>.Failure(
                new Error("Registration.Conflict", $"A registration with plate number '{trimmedPlate}' already exists."));
        }

        if (!Enum.TryParse<RegistrationType>(command.RegistrationType, true, out var parsedType))
        {
            return Result<CreateRegistrationResponse>.Failure(
                new Error("Registration.Validation", $"Invalid registration type '{command.RegistrationType}'."));
        }

        var fee = Registration.GetFeeForType(parsedType);

        var existingNumbers = await dbContext.Registrations
            .Select(r => r.RegistrationNumber)
            .ToListAsync(cancellationToken);

        int maxSeq = 0;
        foreach (var num in existingNumbers)
        {
            if (num != null && num.StartsWith("CS27-") && int.TryParse(num[5..], out var seq))
            {
                if (seq > maxSeq) maxSeq = seq;
            }
        }
        var nextRegNumber = $"CS27-{(maxSeq + 1):D4}";

        var registration = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = nextRegNumber,
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName?.Trim() ?? string.Empty,
            ContactNumber = command.ContactNumber?.Trim() ?? string.Empty,
            Email = command.Email?.Trim() ?? string.Empty,
            Address = command.Address?.Trim() ?? string.Empty,
            CarMakeModel = command.CarMakeModel?.Trim() ?? string.Empty,
            PlateNumber = trimmedPlate,
            RegistrationType = parsedType,
            Status = RegistrationStatus.Pending,
            RegistrationFee = fee,
            AmountPaid = command.AmountPaid
        };

        dbContext.Registrations.Add(registration);
        await dbContext.SaveChangesAsync(cancellationToken);

        var response = new CreateRegistrationResponse(
            registration.Id,
            registration.RegistrationNumber,
            registration.RegistrationDate,
            registration.ParticipantName,
            registration.ContactNumber,
            registration.Email,
            registration.Address,
            registration.CarMakeModel,
            registration.PlateNumber,
            registration.RegistrationType.ToString(),
            registration.Status.ToString(),
            registration.RegistrationFee,
            registration.AmountPaid,
            registration.PaymentStatus.ToString()
        );

        return Result<CreateRegistrationResponse>.Success(response);
    }
}
