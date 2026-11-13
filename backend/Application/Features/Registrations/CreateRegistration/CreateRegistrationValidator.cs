namespace Application.Features.Registrations.CreateRegistration;

using Domain.Entities;
using Domain.Enums;
using FluentValidation;

public sealed class CreateRegistrationValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty().WithMessage("'Participant Name' must not be empty.")
            .MaximumLength(150).WithMessage("Participant Name must not exceed 150 characters.");

        RuleFor(x => x.ContactNumber)
            .NotEmpty().WithMessage("'Contact Number' must not be empty.")
            .Matches(@"^09\d{9}$").WithMessage("Contact number must be an 11-digit Philippine mobile number starting with '09' (format: 09XXXXXXXXX).");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("'Email' must not be empty.")
            .EmailAddress().WithMessage("A valid email address is required.")
            .MaximumLength(200).WithMessage("Email must not exceed 200 characters.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("'Address' must not be empty.")
            .MaximumLength(300).WithMessage("Address must not exceed 300 characters.");

        RuleFor(x => x.CarMakeModel)
            .NotEmpty().WithMessage("'Car Make Model' must not be empty.")
            .MaximumLength(100).WithMessage("Car make/model must not exceed 100 characters.");

        RuleFor(x => x.PlateNumber)
            .NotEmpty().WithMessage("'Plate Number' must not be empty.")
            .MaximumLength(15).WithMessage("Plate number must not exceed 15 characters.");

        RuleFor(x => x.RegistrationType)
            .NotEmpty().WithMessage("'Registration Type' must not be empty.")
            .Must(t => Enum.TryParse<RegistrationType>(t, true, out _))
            .WithMessage("Registration type must be 'Exhibitor', 'Competitor', or 'VIP'.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0).WithMessage("Amount paid must be 0 or more.")
            .Must((cmd, paid) =>
            {
                if (!Enum.TryParse<RegistrationType>(cmd.RegistrationType, true, out var type))
                    return true;

                var fee = Registration.GetFeeForType(type);
                return paid <= fee;
            })
            .WithMessage((cmd, paid) =>
            {
                if (Enum.TryParse<RegistrationType>(cmd.RegistrationType, true, out var type))
                {
                    var fee = Registration.GetFeeForType(type);
                    return $"Amount paid cannot be more than the fee ({fee:N0}).";
                }
                return "Amount paid cannot exceed registration fee.";
            });
    }
}
