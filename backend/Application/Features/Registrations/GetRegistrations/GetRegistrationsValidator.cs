namespace Application.Features.Registrations.GetRegistrations;

using Domain.Enums;
using FluentValidation;

public sealed class GetRegistrationsValidator : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1)
            .WithMessage("Page must be greater than or equal to 1.");

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 50)
            .WithMessage("PageSize must be between 1 and 50.");

        RuleFor(x => x.ParticipantName)
            .MaximumLength(150)
            .When(x => !string.IsNullOrEmpty(x.ParticipantName))
            .WithMessage("Participant name must not exceed 150 characters.");

        RuleFor(x => x.Type)
            .Must(t => string.IsNullOrEmpty(t) || Enum.TryParse<RegistrationType>(t, true, out _))
            .WithMessage("Registration type must be 'Exhibitor', 'Competitor', or 'VIP'.");

        RuleFor(x => x.Status)
            .Must(s => string.IsNullOrEmpty(s) || Enum.TryParse<RegistrationStatus>(s, true, out _))
            .WithMessage("Registration status must be 'Pending', 'Confirmed', 'CheckedIn', or 'Cancelled'.");
    }
}
