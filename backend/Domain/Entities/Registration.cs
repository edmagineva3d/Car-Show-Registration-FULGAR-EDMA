namespace Domain.Entities;

using Domain.Common;
using Domain.Enums;

public sealed class Registration : BaseEntity
{
    public string RegistrationNumber { get; set; } = string.Empty;
    public DateTime RegistrationDate { get; set; }
    public string ParticipantName { get; set; } = string.Empty;
    public string ContactNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string CarMakeModel { get; set; } = string.Empty;
    public string PlateNumber { get; set; } = string.Empty;
    public RegistrationType RegistrationType { get; set; }
    public RegistrationStatus Status { get; set; } = RegistrationStatus.Pending;
    public decimal RegistrationFee { get; set; }
    public decimal AmountPaid { get; set; }

    public PaymentStatus PaymentStatus => AmountPaid switch
    {
        <= 0 => PaymentStatus.Unpaid,
        var paid when paid < RegistrationFee => PaymentStatus.Partial,
        _ => PaymentStatus.Paid
    };

    public static decimal GetFeeForType(RegistrationType type) => type switch
    {
        RegistrationType.Exhibitor => 1500.00m,
        RegistrationType.Competitor => 2500.00m,
        RegistrationType.VIP => 5000.00m,
        _ => throw new ArgumentOutOfRangeException(nameof(type), $"Unknown registration type: {type}")
    };
}
