// Sample registration dataset matching the exact C# backend API schema & seed data
export const SAMPLE_REGISTRATIONS = [
  {
    id: "3f2c9a1e-1111-4000-8000-000000000001",
    registrationNumber: "CS27-0001",
    registrationDate: "2027-02-10T08:30:00Z",
    participantName: "Juan Dela Cruz",
    contactNumber: "09171234567",
    email: "juan@example.com",
    address: "123 Rizal St., Naga City",
    carMakeModel: "Toyota Supra MK4",
    plateNumber: "ABC 1234",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 1000.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-2222-4000-8000-000000000002",
    registrationNumber: "CS27-0002",
    registrationDate: "2027-02-10T08:45:00Z",
    participantName: "Maria Santos",
    contactNumber: "09181234567",
    email: "maria.santos@example.com",
    address: "45 Magsaysay Ave., Sorsogon City",
    carMakeModel: "Honda Civic EG",
    plateNumber: "NGA 5678",
    registrationType: "Exhibitor",
    status: "Pending",
    registrationFee: 1500.00,
    amountPaid: 500.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-3333-4000-8000-000000000003",
    registrationNumber: "CS27-0003",
    registrationDate: "2027-02-10T09:30:00Z",
    participantName: "Carlo Reyes",
    contactNumber: "09191234567",
    email: "carlo.reyes@example.com",
    address: "88 Quezon St., Legazpi City",
    carMakeModel: "Nissan Skyline GT-R R34",
    plateNumber: "SKY 0034",
    registrationType: "VIP",
    status: "Confirmed",
    registrationFee: 5000.00,
    amountPaid: 5000.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-4444-4000-8000-000000000004",
    registrationNumber: "CS27-0004",
    registrationDate: "2027-02-10T10:00:00Z",
    participantName: "Ana Perez",
    contactNumber: "09201234567",
    email: "ana.perez@example.com",
    address: "12 Burgos St., Daraga, Albay",
    carMakeModel: "Ford Mustang GT",
    plateNumber: "FST 5000",
    registrationType: "Exhibitor",
    status: "Pending",
    registrationFee: 1500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-5555-4000-8000-000000000005",
    registrationNumber: "CS27-0005",
    registrationDate: "2027-02-10T10:30:00Z",
    participantName: "Mark Anthony Bautista",
    contactNumber: "09211234567",
    email: "mark.bautista@example.com",
    address: "55 Luna St., Sorsogon City",
    carMakeModel: "Mazda RX-7 FD",
    plateNumber: "ROT 1308",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-6666-4000-8000-000000000006",
    registrationNumber: "CS27-0006",
    registrationDate: "2027-02-10T11:15:00Z",
    participantName: "Patricia Nicole Gomez",
    contactNumber: "09221234567",
    email: "patricia.gomez@example.com",
    address: "74 Mabini Blvd., Tabaco City",
    carMakeModel: "Porsche 911 GT3 RS",
    plateNumber: "PRS 0911",
    registrationType: "VIP",
    status: "CheckedIn",
    registrationFee: 5000.00,
    amountPaid: 5000.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-7777-4000-8000-000000000007",
    registrationNumber: "CS27-0007",
    registrationDate: "2027-02-10T11:30:00Z",
    participantName: "Jerome Villanueva",
    contactNumber: "09231234567",
    email: "jerome.v@example.com",
    address: "99 Romualdez St., Casiguran",
    carMakeModel: "Mitsubishi Lancer Evolution IX",
    plateNumber: "EVO 9999",
    registrationType: "Competitor",
    status: "CheckedIn",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-8888-4000-8000-000000000008",
    registrationNumber: "CS27-0008",
    registrationDate: "2027-02-10T12:00:00Z",
    participantName: "Christine Joy Ramos",
    contactNumber: "09241234567",
    email: "christine.ramos@example.com",
    address: "33 Bonifacio St., Gubat",
    carMakeModel: "Toyota GR Yaris",
    plateNumber: "YAR 4400",
    registrationType: "Exhibitor",
    status: "CheckedIn",
    registrationFee: 1500.00,
    amountPaid: 1500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-9999-4000-8000-000000000009",
    registrationNumber: "CS27-0009",
    registrationDate: "2027-02-10T12:30:00Z",
    participantName: "Michael Angelo Tan",
    contactNumber: "09251234567",
    email: "michael.tan@example.com",
    address: "101 Aguinaldo Highway, Naga City",
    carMakeModel: "BMW M4 Competition",
    plateNumber: "BMW 4004",
    registrationType: "VIP",
    status: "CheckedIn",
    registrationFee: 5000.00,
    amountPaid: 5000.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-aaaa-4000-8000-000000000010",
    registrationNumber: "CS27-0010",
    registrationDate: "2027-02-10T12:50:00Z",
    participantName: "Angelica Lopez",
    contactNumber: "09261234567",
    email: "angelica.lopez@example.com",
    address: "21 Taft Ave., Legazpi City",
    carMakeModel: "Subaru WRX STI",
    plateNumber: "STI 2027",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 1500.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-bbbb-4000-8000-000000000011",
    registrationNumber: "CS27-0011",
    registrationDate: "2027-02-10T13:30:00Z",
    participantName: "Richard Fernandez",
    contactNumber: "09271234567",
    email: "richard.f@example.com",
    address: "60 Zamora St., Sorsogon City",
    carMakeModel: "Mazda Miata MX-5 NA",
    plateNumber: "MIA 1990",
    registrationType: "Exhibitor",
    status: "CheckedIn",
    registrationFee: 1500.00,
    amountPaid: 1500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-cccc-4000-8000-000000000012",
    registrationNumber: "CS27-0012",
    registrationDate: "2027-02-10T14:10:00Z",
    participantName: "Stephanie Lim",
    contactNumber: "09281234567",
    email: "stephanie.lim@example.com",
    address: "15 Peñaranda St., Legazpi City",
    carMakeModel: "Audi R8 V10 Plus",
    plateNumber: "AUD 0008",
    registrationType: "VIP",
    status: "Confirmed",
    registrationFee: 5000.00,
    amountPaid: 3000.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-dddd-4000-8000-000000000013",
    registrationNumber: "CS27-0013",
    registrationDate: "2027-02-10T14:30:00Z",
    participantName: "Ryan Joshua Castro",
    contactNumber: "09291234567",
    email: "ryan.castro@example.com",
    address: "88 Lapu-Lapu St., Iriga City",
    carMakeModel: "Honda S2000 AP2",
    plateNumber: "VTC 2000",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-eeee-4000-8000-000000000014",
    registrationNumber: "CS27-0014",
    registrationDate: "2027-02-10T15:00:00Z",
    participantName: "Bea Alonzo Mendoza",
    contactNumber: "09301234567",
    email: "bea.mendoza@example.com",
    address: "44 Roxas Blvd., Sorsogon City",
    carMakeModel: "Volkswagen Beetle Classic",
    plateNumber: "BUG 1968",
    registrationType: "Exhibitor",
    status: "Confirmed",
    registrationFee: 1500.00,
    amountPaid: 1500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-ffff-4000-8000-000000000015",
    registrationNumber: "CS27-0015",
    registrationDate: "2027-02-10T15:30:00Z",
    participantName: "Daniel Padilla Sy",
    contactNumber: "09311234567",
    email: "daniel.sy@example.com",
    address: "72 Albay District, Daraga",
    carMakeModel: "Mercedes-AMG GT",
    plateNumber: "AMG 0063",
    registrationType: "VIP",
    status: "Pending",
    registrationFee: 5000.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0016-4000-8000-000000000016",
    registrationNumber: "CS27-0016",
    registrationDate: "2027-02-10T16:20:00Z",
    participantName: "Kimberly Mae Cruz",
    contactNumber: "09321234567",
    email: "kimberly.cruz@example.com",
    address: "19 Del Rosario St., Bulan",
    carMakeModel: "Nissan 370Z Nismo",
    plateNumber: "NIS 3700",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0017-4000-8000-000000000017",
    registrationNumber: "CS27-0017",
    registrationDate: "2027-02-10T16:30:00Z",
    participantName: "Gabriel Garcia",
    contactNumber: "09331234567",
    email: "gabriel.garcia@example.com",
    address: "67 Vinzons Ave., Daet",
    carMakeModel: "Toyota GR Supra A90",
    plateNumber: "SUP 0090",
    registrationType: "Competitor",
    status: "CheckedIn",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0018-4000-8000-000000000018",
    registrationNumber: "CS27-0018",
    registrationDate: "2027-02-10T17:05:00Z",
    participantName: "Jasmine Flores",
    contactNumber: "09341234567",
    email: "jasmine.flores@example.com",
    address: "31 Balintawak St., Sorsogon City",
    carMakeModel: "Mini Cooper S JCW",
    plateNumber: "MIN 1234",
    registrationType: "Exhibitor",
    status: "Pending",
    registrationFee: 1500.00,
    amountPaid: 500.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0019-4000-8000-000000000019",
    registrationNumber: "CS27-0019",
    registrationDate: "2027-02-10T17:30:00Z",
    participantName: "Christian Dave Navarro",
    contactNumber: "09351234567",
    email: "christian.navarro@example.com",
    address: "50 Peñafrancia Ave., Naga City",
    carMakeModel: "Honda Integra Type R DC2",
    plateNumber: "ITR 1800",
    registrationType: "Competitor",
    status: "Pending",
    registrationFee: 2500.00,
    amountPaid: 1000.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0020-4000-8000-000000000020",
    registrationNumber: "CS27-0020",
    registrationDate: "2027-02-10T18:10:00Z",
    participantName: "Alyssa Valdez Moran",
    contactNumber: "09361234567",
    email: "alyssa.moran@example.com",
    address: "14 San Roque St., Irosin",
    carMakeModel: "Subaru BRZ STI Sport",
    plateNumber: "BRZ 8600",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0021-4000-8000-000000000021",
    registrationNumber: "CS27-0021",
    registrationDate: "2027-02-10T18:30:00Z",
    participantName: "Paolo Enrico Aquino",
    contactNumber: "09371234567",
    email: "paolo.aquino@example.com",
    address: "82 Panganiban Dr., Naga City",
    carMakeModel: "Nissan Silvia S15 Spec-R",
    plateNumber: "S15 2000",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0022-4000-8000-000000000022",
    registrationNumber: "CS27-0022",
    registrationDate: "2027-02-10T19:00:00Z",
    participantName: "John Mark Dela Rosa",
    contactNumber: "09381234567",
    email: "jm.delarosa@example.com",
    address: "29 Diversion Rd., Sorsogon City",
    carMakeModel: "Toyota Celica GT-Four",
    plateNumber: "CEL 2050",
    registrationType: "Competitor",
    status: "Pending",
    registrationFee: 2500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0023-4000-8000-000000000023",
    registrationNumber: "CS27-0023",
    registrationDate: "2027-02-10T19:30:00Z",
    participantName: "Vincent Edward Soriano",
    contactNumber: "09391234567",
    email: "vincent.soriano@example.com",
    address: "41 Rizal Ave., Legazpi City",
    carMakeModel: "Ferrari 458 Italia",
    plateNumber: "ITA 0458",
    registrationType: "VIP",
    status: "Cancelled",
    registrationFee: 5000.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0024-4000-8000-000000000024",
    registrationNumber: "CS27-0024",
    registrationDate: "2027-02-10T19:50:00Z",
    participantName: "Maricel Torres",
    contactNumber: "09401234567",
    email: "maricel.torres@example.com",
    address: "93 Magsaysay St., Castilla",
    carMakeModel: "Honda Civic Type R FK8",
    plateNumber: "FK8 8888",
    registrationType: "Competitor",
    status: "Cancelled",
    registrationFee: 2500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0025-4000-8000-000000000025",
    registrationNumber: "CS27-0025",
    registrationDate: "2027-02-10T20:30:00Z",
    participantName: "Leandro Miguel Pascual",
    contactNumber: "09411234567",
    email: "leandro.pascual@example.com",
    address: "18 San Juan St., Barcelona",
    carMakeModel: "Datsun 240Z Fairlady",
    plateNumber: "DAT 1972",
    registrationType: "Exhibitor",
    status: "Cancelled",
    registrationFee: 1500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  }
];

/**
 * Filter, paginate, and return registration items matching the C# API response format
 */
export async function getRegistrations({
  participantName = '',
  type = '',
  status = '',
  page = 1,
  pageSize = 10
} = {}) {
  // Simulate small async network tick
  await new Promise((resolve) => setTimeout(resolve, 80));

  let filtered = [...SAMPLE_REGISTRATIONS];

  if (participantName && participantName.trim()) {
    const q = participantName.trim().toLowerCase();
    filtered = filtered.filter(item => 
      item.participantName.toLowerCase().includes(q)
    );
  }

  if (type && type !== 'All') {
    filtered = filtered.filter(item => 
      item.registrationType.toLowerCase() === type.toLowerCase()
    );
  }

  if (status && status !== 'All') {
    filtered = filtered.filter(item => 
      item.status.toLowerCase() === status.toLowerCase()
    );
  }

  const totalCount = filtered.length;
  const numPage = Number(page) || 1;
  const numPageSize = Number(pageSize) || 10;
  const totalPages = Math.ceil(totalCount / numPageSize) || 1;

  const startIndex = (numPage - 1) * numPageSize;
  const items = filtered.slice(startIndex, startIndex + numPageSize);

  return {
    items,
    page: numPage,
    pageSize: numPageSize,
    totalCount,
    totalPages
  };
}

/**
 * Calculate and return dashboard KPI summary totals matching the C# API response format
 */
export async function getSummary() {
  await new Promise((resolve) => setTimeout(resolve, 60));

  // Note: Following business logic from C# API, cancelled registrations are excluded from financial totals
  const totalRegistrations = SAMPLE_REGISTRATIONS.length;
  const confirmed = SAMPLE_REGISTRATIONS.filter(r => r.status === 'Confirmed').length;
  const checkedIn = SAMPLE_REGISTRATIONS.filter(r => r.status === 'CheckedIn').length;
  const pending = SAMPLE_REGISTRATIONS.filter(r => r.status === 'Pending').length;
  const cancelled = SAMPLE_REGISTRATIONS.filter(r => r.status === 'Cancelled').length;

  const activeRegistrations = SAMPLE_REGISTRATIONS.filter(r => r.status !== 'Cancelled');
  const totalFees = activeRegistrations.reduce((sum, r) => sum + r.registrationFee, 0);
  const totalPayments = activeRegistrations.reduce((sum, r) => sum + r.amountPaid, 0);
  const uncollectedPayments = totalFees - totalPayments;

  return {
    totalRegistrations,
    confirmed,
    checkedIn,
    pending,
    cancelled,
    totalFees,
    totalPayments,
    uncollectedPayments
  };
}

/**
 * Fetch a single registration by its GUID
 */
export async function getRegistrationById(id) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const found = SAMPLE_REGISTRATIONS.find(r => r.id === id);
  if (!found) {
    const error = new Error('Registration not found');
    error.status = 404;
    throw error;
  }
  return found;
}
