namespace Infrastructure.Persistence;

using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

public static class DbSeeder
{
    public static void Seed(AppDbContext dbContext)
    {
        // Apply migrations automatically
        dbContext.Database.Migrate();

        // Check if database already has registrations to prevent duplicate seeding
        if (dbContext.Registrations.Any())
        {
            return;
        }

        var baseDate = new DateTime(2027, 2, 10, 8, 30, 0, DateTimeKind.Utc);

        var registrations = new List<Registration>
        {
            // 1. Juan Dela Cruz - Competitor, Confirmed, Partial (from PDF example)
            new()
            {
                Id = Guid.Parse("3f2c9a1e-1111-4000-8000-000000000001"),
                RegistrationNumber = "CS27-0001",
                RegistrationDate = baseDate,
                ParticipantName = "Juan Dela Cruz",
                ContactNumber = "09171234567",
                Email = "juan@example.com",
                Address = "123 Rizal St., Naga City",
                CarMakeModel = "Toyota Supra MK4",
                PlateNumber = "ABC 1234",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 1000.00m
            },

            // 2. Maria Santos - Exhibitor, Pending, Partial
            new()
            {
                Id = Guid.Parse("3f2c9a1e-2222-4000-8000-000000000002"),
                RegistrationNumber = "CS27-0002",
                RegistrationDate = baseDate.AddMinutes(15),
                ParticipantName = "Maria Santos",
                ContactNumber = "09181234567",
                Email = "maria.santos@example.com",
                Address = "45 Magsaysay Ave., Sorsogon City",
                CarMakeModel = "Honda Civic EG",
                PlateNumber = "NGA 5678",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 500.00m
            },

            // 3. Carlo Reyes - VIP, Confirmed, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-3333-4000-8000-000000000003"),
                RegistrationNumber = "CS27-0003",
                RegistrationDate = baseDate.AddHours(1),
                ParticipantName = "Carlo Reyes",
                ContactNumber = "09191234567",
                Email = "carlo.reyes@example.com",
                Address = "88 Quezon St., Legazpi City",
                CarMakeModel = "Nissan Skyline GT-R R34",
                PlateNumber = "SKY 0034",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },

            // 4. Ana Perez - Exhibitor, Pending, Unpaid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-4444-4000-8000-000000000004"),
                RegistrationNumber = "CS27-0004",
                RegistrationDate = baseDate.AddHours(1).AddMinutes(30),
                ParticipantName = "Ana Perez",
                ContactNumber = "09201234567",
                Email = "ana.perez@example.com",
                Address = "12 Burgos St., Daraga, Albay",
                CarMakeModel = "Ford Mustang GT",
                PlateNumber = "FST 5000",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 0.00m
            },

            // 5. Mark Anthony Bautista - Competitor, Confirmed, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-5555-4000-8000-000000000005"),
                RegistrationNumber = "CS27-0005",
                RegistrationDate = baseDate.AddHours(2),
                ParticipantName = "Mark Anthony Bautista",
                ContactNumber = "09211234567",
                Email = "mark.bautista@example.com",
                Address = "55 Luna St., Sorsogon City",
                CarMakeModel = "Mazda RX-7 FD",
                PlateNumber = "ROT 1308",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },

            // 6. Patricia Nicole Gomez - VIP, CheckedIn, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-6666-4000-8000-000000000006"),
                RegistrationNumber = "CS27-0006",
                RegistrationDate = baseDate.AddHours(2).AddMinutes(45),
                ParticipantName = "Patricia Nicole Gomez",
                ContactNumber = "09221234567",
                Email = "patricia.gomez@example.com",
                Address = "74 Mabini Blvd., Tabaco City",
                CarMakeModel = "Porsche 911 GT3 RS",
                PlateNumber = "PRS 0911",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },

            // 7. Jerome Villanueva - Competitor, CheckedIn, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-7777-4000-8000-000000000007"),
                RegistrationNumber = "CS27-0007",
                RegistrationDate = baseDate.AddHours(3),
                ParticipantName = "Jerome Villanueva",
                ContactNumber = "09231234567",
                Email = "jerome.v@example.com",
                Address = "99 Romualdez St., Casiguran",
                CarMakeModel = "Mitsubishi Lancer Evolution IX",
                PlateNumber = "EVO 9999",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },

            // 8. Christine Joy Ramos - Exhibitor, CheckedIn, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-8888-4000-8000-000000000008"),
                RegistrationNumber = "CS27-0008",
                RegistrationDate = baseDate.AddHours(3).AddMinutes(30),
                ParticipantName = "Christine Joy Ramos",
                ContactNumber = "09241234567",
                Email = "christine.ramos@example.com",
                Address = "33 Bonifacio St., Gubat",
                CarMakeModel = "Toyota GR Yaris",
                PlateNumber = "YAR 4400",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 1500.00m,
                AmountPaid = 1500.00m
            },

            // 9. Michael Angelo Tan - VIP, CheckedIn, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-9999-4000-8000-000000000009"),
                RegistrationNumber = "CS27-0009",
                RegistrationDate = baseDate.AddHours(4),
                ParticipantName = "Michael Angelo Tan",
                ContactNumber = "09251234567",
                Email = "michael.tan@example.com",
                Address = "101 Aguinaldo Highway, Naga City",
                CarMakeModel = "BMW M4 Competition",
                PlateNumber = "BMW 4004",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 5000.00m,
                AmountPaid = 5000.00m
            },

            // 10. Angelica Lopez - Competitor, Confirmed, Partial
            new()
            {
                Id = Guid.Parse("3f2c9a1e-aaaa-4000-8000-000000000010"),
                RegistrationNumber = "CS27-0010",
                RegistrationDate = baseDate.AddHours(4).AddMinutes(20),
                ParticipantName = "Angelica Lopez",
                ContactNumber = "09261234567",
                Email = "angelica.lopez@example.com",
                Address = "21 Taft Ave., Legazpi City",
                CarMakeModel = "Subaru WRX STI",
                PlateNumber = "STI 2027",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 1500.00m
            },

            // 11. Richard Fernandez - Exhibitor, CheckedIn, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-bbbb-4000-8000-000000000011"),
                RegistrationNumber = "CS27-0011",
                RegistrationDate = baseDate.AddHours(5),
                ParticipantName = "Richard Fernandez",
                ContactNumber = "09271234567",
                Email = "richard.f@example.com",
                Address = "60 Zamora St., Sorsogon City",
                CarMakeModel = "Mazda Miata MX-5 NA",
                PlateNumber = "MIA 1990",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 1500.00m,
                AmountPaid = 1500.00m
            },

            // 12. Stephanie Lim - VIP, Confirmed, Partial
            new()
            {
                Id = Guid.Parse("3f2c9a1e-cccc-4000-8000-000000000012"),
                RegistrationNumber = "CS27-0012",
                RegistrationDate = baseDate.AddHours(5).AddMinutes(40),
                ParticipantName = "Stephanie Lim",
                ContactNumber = "09281234567",
                Email = "stephanie.lim@example.com",
                Address = "15 Peñaranda St., Legazpi City",
                CarMakeModel = "Audi R8 V10 Plus",
                PlateNumber = "AUD 0008",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 5000.00m,
                AmountPaid = 3000.00m
            },

            // 13. Ryan Joshua Castro - Competitor, Confirmed, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-dddd-4000-8000-000000000013"),
                RegistrationNumber = "CS27-0013",
                RegistrationDate = baseDate.AddHours(6),
                ParticipantName = "Ryan Joshua Castro",
                ContactNumber = "09291234567",
                Email = "ryan.castro@example.com",
                Address = "88 Lapu-Lapu St., Iriga City",
                CarMakeModel = "Honda S2000 AP2",
                PlateNumber = "VTC 2000",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },

            // 14. Bea Alonzo Mendoza - Exhibitor, Confirmed, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-eeee-4000-8000-000000000014"),
                RegistrationNumber = "CS27-0014",
                RegistrationDate = baseDate.AddHours(6).AddMinutes(30),
                ParticipantName = "Bea Alonzo Mendoza",
                ContactNumber = "09301234567",
                Email = "bea.mendoza@example.com",
                Address = "44 Roxas Blvd., Sorsogon City",
                CarMakeModel = "Volkswagen Beetle Classic",
                PlateNumber = "BUG 1968",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 1500.00m,
                AmountPaid = 1500.00m
            },

            // 15. Daniel Padilla Sy - VIP, Pending, Unpaid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-ffff-4000-8000-000000000015"),
                RegistrationNumber = "CS27-0015",
                RegistrationDate = baseDate.AddHours(7),
                ParticipantName = "Daniel Padilla Sy",
                ContactNumber = "09311234567",
                Email = "daniel.sy@example.com",
                Address = "72 Albay District, Daraga",
                CarMakeModel = "Mercedes-AMG GT",
                PlateNumber = "AMG 0063",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 5000.00m,
                AmountPaid = 0.00m
            },

            // 16. Kimberly Mae Cruz - Competitor, Confirmed, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0016-4000-8000-000000000016"),
                RegistrationNumber = "CS27-0016",
                RegistrationDate = baseDate.AddHours(7).AddMinutes(50),
                ParticipantName = "Kimberly Mae Cruz",
                ContactNumber = "09321234567",
                Email = "kimberly.cruz@example.com",
                Address = "19 Del Rosario St., Bulan",
                CarMakeModel = "Nissan 370Z Nismo",
                PlateNumber = "NIS 3700",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },

            // 17. Gabriel Garcia - Competitor, CheckedIn, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0017-4000-8000-000000000017"),
                RegistrationNumber = "CS27-0017",
                RegistrationDate = baseDate.AddHours(8),
                ParticipantName = "Gabriel Garcia",
                ContactNumber = "09331234567",
                Email = "gabriel.garcia@example.com",
                Address = "67 Vinzons Ave., Daet",
                CarMakeModel = "Toyota GR Supra A90",
                PlateNumber = "SUP 0090",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.CheckedIn,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },

            // 18. Jasmine Flores - Exhibitor, Pending, Partial
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0018-4000-8000-000000000018"),
                RegistrationNumber = "CS27-0018",
                RegistrationDate = baseDate.AddHours(8).AddMinutes(35),
                ParticipantName = "Jasmine Flores",
                ContactNumber = "09341234567",
                Email = "jasmine.flores@example.com",
                Address = "31 Balintawak St., Sorsogon City",
                CarMakeModel = "Mini Cooper S JCW",
                PlateNumber = "MIN 1234",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 1500.00m,
                AmountPaid = 500.00m
            },

            // 19. Christian Dave Navarro - Competitor, Pending, Partial
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0019-4000-8000-000000000019"),
                RegistrationNumber = "CS27-0019",
                RegistrationDate = baseDate.AddHours(9),
                ParticipantName = "Christian Dave Navarro",
                ContactNumber = "09351234567",
                Email = "christian.navarro@example.com",
                Address = "50 Peñafrancia Ave., Naga City",
                CarMakeModel = "Honda Integra Type R DC2",
                PlateNumber = "ITR 1800",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 2500.00m,
                AmountPaid = 1000.00m
            },

            // 20. Alyssa Valdez Moran - Competitor, Confirmed, Paid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0020-4000-8000-000000000020"),
                RegistrationNumber = "CS27-0020",
                RegistrationDate = baseDate.AddHours(9).AddMinutes(40),
                ParticipantName = "Alyssa Valdez Moran",
                ContactNumber = "09361234567",
                Email = "alyssa.moran@example.com",
                Address = "14 San Roque St., Irosin",
                CarMakeModel = "Subaru BRZ STI Sport",
                PlateNumber = "BRZ 8600",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 2500.00m
            },

            // 21. Paolo Enrico Aquino - Competitor, Confirmed, Unpaid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0021-4000-8000-000000000021"),
                RegistrationNumber = "CS27-0021",
                RegistrationDate = baseDate.AddHours(10),
                ParticipantName = "Paolo Enrico Aquino",
                ContactNumber = "09371234567",
                Email = "paolo.aquino@example.com",
                Address = "82 Panganiban Dr., Naga City",
                CarMakeModel = "Nissan Silvia S15 Spec-R",
                PlateNumber = "S15 2000",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Confirmed,
                RegistrationFee = 2500.00m,
                AmountPaid = 0.00m
            },

            // 22. John Mark Dela Rosa - Competitor, Pending, Unpaid
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0022-4000-8000-000000000022"),
                RegistrationNumber = "CS27-0022",
                RegistrationDate = baseDate.AddHours(10).AddMinutes(30),
                ParticipantName = "John Mark Dela Rosa",
                ContactNumber = "09381234567",
                Email = "jm.delarosa@example.com",
                Address = "29 Diversion Rd., Sorsogon City",
                CarMakeModel = "Toyota Celica GT-Four",
                PlateNumber = "CEL 2050",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Pending,
                RegistrationFee = 2500.00m,
                AmountPaid = 0.00m
            },

            // 23. Vincent Edward Soriano - Cancelled VIP (Excluded from money totals)
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0023-4000-8000-000000000023"),
                RegistrationNumber = "CS27-0023",
                RegistrationDate = baseDate.AddHours(11),
                ParticipantName = "Vincent Edward Soriano",
                ContactNumber = "09391234567",
                Email = "vincent.soriano@example.com",
                Address = "41 Rizal Ave., Legazpi City",
                CarMakeModel = "Ferrari 458 Italia",
                PlateNumber = "ITA 0458",
                RegistrationType = RegistrationType.VIP,
                Status = RegistrationStatus.Cancelled,
                RegistrationFee = 5000.00m,
                AmountPaid = 0.00m
            },

            // 24. Maricel Torres - Cancelled Competitor (Excluded from money totals)
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0024-4000-8000-000000000024"),
                RegistrationNumber = "CS27-0024",
                RegistrationDate = baseDate.AddHours(11).AddMinutes(20),
                ParticipantName = "Maricel Torres",
                ContactNumber = "09401234567",
                Email = "maricel.torres@example.com",
                Address = "93 Magsaysay St., Castilla",
                CarMakeModel = "Honda Civic Type R FK8",
                PlateNumber = "FK8 8888",
                RegistrationType = RegistrationType.Competitor,
                Status = RegistrationStatus.Cancelled,
                RegistrationFee = 2500.00m,
                AmountPaid = 0.00m
            },

            // 25. Leandro Miguel Pascual - Cancelled Exhibitor (Excluded from money totals)
            new()
            {
                Id = Guid.Parse("3f2c9a1e-0025-4000-8000-000000000025"),
                RegistrationNumber = "CS27-0025",
                RegistrationDate = baseDate.AddHours(12),
                ParticipantName = "Leandro Miguel Pascual",
                ContactNumber = "09411234567",
                Email = "leandro.pascual@example.com",
                Address = "18 San Juan St., Barcelona",
                CarMakeModel = "Datsun 240Z Fairlady",
                PlateNumber = "DAT 1972",
                RegistrationType = RegistrationType.Exhibitor,
                Status = RegistrationStatus.Cancelled,
                RegistrationFee = 1500.00m,
                AmountPaid = 0.00m
            }
        };

        dbContext.Registrations.AddRange(registrations);
        dbContext.SaveChanges();
    }
}
