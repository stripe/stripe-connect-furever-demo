const paymentDescriptions = [
  "05/03/2023 10:00 AM - HVAC installation service for ",
  "05/02/2023 2:30 PM - Plumbing repair and maintenance for ",
  "05/01/2023 9:00 AM - Lawn care and landscaping services for ",
  "04/28/2023 3:00 PM - Home security system installation at ",
  "04/27/2023 11:00 AM - Pest control services for ",
  "04/26/2023 10:00 AM - Deep cleaning services for ",
  "04/25/2023 1:30 PM - Handyman services for repairs and maintenance at ",
  "04/24/2023 9:00 AM - Home renovation and remodeling services for ",
  "04/22/2023 10:30 AM - HVAC seasonal maintenance at ",
  "05/01/2023 2:00 PM - Residential painting and decorating services for ",
];

const USCustomers = [
  {
    name: "John Rivera",
    phone: "1-123-456-7890",
    email: "jrivera@example.com",
    address: {
      city: "Los Angeles",
      country: "US",
      line1: "123 Main St",
      line2: "",
      postal_code: "90001",
      state: "CA",
    },
  },
  {
    name: "Sofia Garcia",
    phone: "1-234-567-8901",
    email: "sgarcia@example.com",
    address: {
      city: "New York",
      country: "US",
      line1: "456 Oak St",
      line2: "Apartment 512",
      postal_code: "10001",
      state: "NY",
    },
  },
  {
    name: "Abdullah Rahman",
    phone: "1-345-678-9012",
    email: "arahman@example.com",
    address: {
      city: "Chicago",
      country: "US",
      line1: "789 Elm St",
      line2: "",
      postal_code: "60601",
      state: "IL",
    },
  },
  {
    name: "Karla Flores",
    phone: "1-456-789-0123",
    email: "kflores@example.com",
    address: {
      city: "Houston",
      country: "US",
      line1: "321 Maple Ave",
      line2: "",
      postal_code: "77001",
      state: "TX",
    },
  },
  {
    name: "Michael Nguyen",
    phone: "1-567-890-1234",
    email: "mnguyen@example.com",
    address: {
      city: "Phoenix",
      country: "US",
      line1: "654 Pine St",
      line2: "",
      postal_code: "85001",
      state: "AZ",
    },
  },
  {
    name: "Emily Chen",
    phone: "1-678-901-2345",
    email: "echen@example.com",
    address: {
      city: "Philadelphia",
      country: "US",
      line1: "987 Cedar Ln",
      line2: "Apartment 1407",
      postal_code: "19019",
      state: "PA",
    },
  },
  {
    name: "Kevin Jones",
    phone: "1-789-012-3456",
    email: "kjones@example.com",
    address: {
      city: "San Antonio",
      country: "US",
      line1: "543 Birch Dr",
      line2: "",
      postal_code: "78201",
      state: "TX",
    },
  },
  {
    name: "Alexandra Kim",
    phone: "1-890-123-4567",
    email: "akim@example.com",
    address: {
      city: "San Diego",
      country: "US",
      line1: "876 Spruce St",
      line2: "Apartment 2205",
      postal_code: "92101",
      state: "CA",
    },
  },
  {
    name: "James Wilson",
    phone: "1-901-234-5678",
    email: "jwilson@example.com",
    address: {
      city: "Dallas",
      country: "US",
      line1: "234 Oakwood Rd",
      line2: "",
      postal_code: "75201",
      state: "TX",
    },
  },
  {
    name: "Priya Patel",
    phone: "1-012-345-6789",
    email: "ppatel@example.com",
    address: {
      city: "Seattle",
      country: "US",
      line1: "567 Cherry St",
      line2: "Suite 904",
      postal_code: "98104",
      state: "WA",
    },
  },
];

const FRCustomers = [
  {
    name: "Sophie Dupont",
    phone: "+33 1 23 45 67 89",
    email: "sdupont@example.com",
    address: {
      city: "Paris",
      country: "FR",
      line1: "15 Rue de la Paix",
      line2: "",
      postal_code: "75001",
      state: "Île-de-France",
    },
  },
  {
    name: "Alexandre Moreau",
    phone: "+33 1 23 45 67 90",
    email: "amoreau@example.com",
    address: {
      city: "Lyon",
      country: "FR",
      line1: "7 Rue de la République",
      line2: "Appartement 512",
      postal_code: "69001",
      state: "Auvergne-Rhône-Alpes",
    },
  },
  {
    name: "Lucie Martin",
    phone: "+33 1 23 45 67 91",
    email: "lmartin@example.com",
    address: {
      city: "Marseille",
      country: "FR",
      line1: "25 Rue Sainte",
      line2: "",
      postal_code: "13001",
      state: "Provence-Alpes-Côte d'Azur",
    },
  },
  {
    name: "Antoine Lefebvre",
    phone: "+33 1 23 45 67 92",
    email: "alefebvre@example.com",
    address: {
      city: "Lille",
      country: "FR",
      line1: "6 Rue Nationale",
      line2: "",
      postal_code: "59000",
      state: "Hauts-de-France",
    },
  },
  {
    name: "Marie Laurent",
    phone: "+33 1 23 45 67 93",
    email: "mlaurent@example.com",
    address: {
      city: "Bordeaux",
      country: "FR",
      line1: "12 Rue Sainte-Catherine",
      line2: "",
      postal_code: "33000",
      state: "Nouvelle-Aquitaine",
    },
  },
  {
    name: "Pierre Girard",
    phone: "+33 1 23 45 67 94",
    email: "pgirard@example.com",
    address: {
      city: "Toulouse",
      country: "FR",
      line1: "11 Place du Capitole",
      line2: "",
      postal_code: "31000",
      state: "Occitanie",
    },
  },
  {
    name: "Amélie Dubois",
    phone: "+33 1 23 45 67 95",
    email: "adubois@example.com",
    address: {
      city: "Nice",
      country: "FR",
      line1: "14 Rue de la Buffa",
      line2: "",
      postal_code: "06000",
      state: "Provence-Alpes-Côte d'Azur",
    },
  },
];

const GBCustomers = [
  {
    name: "Emma Smith",
    phone: "+44 20 1234 5678",
    email: "esmith@example.com",
    address: {
      city: "London",
      country: "GB",
      line1: "123 High St",
      line2: "",
      postal_code: "SW1A 1AA",
      state: "",
    },
  },
  {
    name: "William Brown",
    phone: "+44 20 2345 6789",
    email: "wbrown@example.com",
    address: {
      city: "Manchester",
      country: "GB",
      line1: "456 Main St",
      line2: "",
      postal_code: "M1 1AA",
      state: "",
    },
  },
  {
    name: "Sophie Jones",
    phone: "+44 20 3456 7890",
    email: "sjones@example.com",
    address: {
      city: "Birmingham",
      country: "GB",
      line1: "789 Oak Ave",
      line2: "Flat 2",
      postal_code: "B1 1AA",
      state: "",
    },
  },
  {
    name: "James Wilson",
    phone: "+44 20 4567 8901",
    email: "jwilson@example.com",
    address: {
      city: "Liverpool",
      country: "GB",
      line1: "321 Pine Rd",
      line2: "",
      postal_code: "L1 1AA",
      state: "",
    },
  },
  {
    name: "Olivia Taylor",
    phone: "+44 20 5678 9012",
    email: "otaylor@example.com",
    address: {
      city: "Glasgow",
      country: "GB",
      line1: "654 Maple Dr",
      line2: "",
      postal_code: "G1 1AA",
      state: "",
    },
  },
  {
    name: "Ethan Evans",
    phone: "+44 20 6789 0123",
    email: "eevans@example.com",
    address: {
      city: "Edinburgh",
      country: "GB",
      line1: "987 Elm Ln",
      line2: "",
      postal_code: "EH1 1AA",
      state: "",
    },
  },
  {
    name: "Mia Thomas",
    phone: "+44 20 7890 1234",
    email: "mthomas@example.com",
    address: {
      city: "Bristol",
      country: "GB",
      line1: "543 Cherry St",
      line2: "Suite 1001",
      postal_code: "BS1 1AA",
      state: "",
    },
  },
  {
    name: "Noah Roberts",
    phone: "+44 20 8901 2345",
    email: "nroberts@example.com",
    address: {
      city: "Leeds",
      country: "GB",
      line1: "876 Spruce Ave",
      line2: "",
      postal_code: "LS1 1AA",
      state: "",
    },
  },
];

const AUCustomers = [
  {
    name: "Liam Wilson",
    phone: "+61 123 456 789",
    email: "lwilson@example.com",
    address: {
      city: "Sydney",
      country: "AU",
      line1: "123 George St",
      line2: "Apartment 456",
      postal_code: "2000",
      state: "NSW",
    },
  },
  {
    name: "Olivia Smith",
    phone: "+61 234 567 890",
    email: "osmith@example.com",
    address: {
      city: "Melbourne",
      country: "AU",
      line1: "456 Collins St",
      line2: "",
      postal_code: "3000",
      state: "VIC",
    },
  },
  {
    name: "Noah Brown",
    phone: "+61 345 678 912",
    email: "nbrown@example.com",
    address: {
      city: "Brisbane",
      country: "AU",
      line1: "789 Queen St",
      line2: "Suite 123",
      postal_code: "4000",
      state: "QLD",
    },
  },
  {
    name: "Ava Taylor",
    phone: "+61 456 789 012",
    email: "ataylor@example.com",
    address: {
      city: "Perth",
      country: "AU",
      line1: "321 King St",
      line2: "",
      postal_code: "6000",
      state: "WA",
    },
  },
  {
    name: "William Lee",
    phone: "+61 567 890 123",
    email: "wlee@example.com",
    address: {
      city: "Adelaide",
      country: "AU",
      line1: "654 Rundle Mall",
      line2: "",
      postal_code: "5000",
      state: "SA",
    },
  },
  {
    name: "Mia Martin",
    phone: "+61 678 901 234",
    email: "mmartin@example.com",
    address: {
      city: "Canberra",
      country: "AU",
      line1: "987 Constitution Ave",
      line2: "Apartment 789",
      postal_code: "2600",
      state: "NSW",
    },
  },
  {
    name: "Lucas Thompson",
    phone: "+61 789 012 345",
    email: "lthompson@example.com",
    address: {
      city: "Gold Coast",
      country: "AU",
      line1: "543 Surfers Paradise Blvd",
      line2: "",
      postal_code: "4217",
      state: "QLD",
    },
  },
  {
    name: "Isabella Clark",
    phone: "+61 890 123 456",
    email: "iclark@example.com",
    address: {
      city: "Hobart",
      country: "AU",
      line1: "876 Collins St",
      line2: "Apartment 234",
      postal_code: "7000",
      state: "TAS",
    },
  },
  {
    name: "Henry Walker",
    phone: "+61 901 234 567",
    email: "hwalker@example.com",
    address: {
      city: "Darwin",
      country: "AU",
      line1: "234 Mitchell St",
      line2: "",
      postal_code: "0800",
      state: "VIC",
    },
  },
];

const SGCustomers = [
  {
    name: "Wei Jie Tan",
    phone: "+65 9123 4567",
    email: "wjtan@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "123 Orchard Rd",
      line2: "Unit 01-234",
      postal_code: "123456",
      state: "",
    },
  },
  {
    name: "Li Ying Lim",
    phone: "+65 8234 5678",
    email: "lylim@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "456 Marina Blvd",
      line2: "Unit 12-345",
      postal_code: "789012",
      state: "",
    },
  },
  {
    name: "Raj Kumar",
    phone: "+65 9456 7890",
    email: "rkumar@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "789 Serangoon Rd",
      line2: "Unit 23-456",
      postal_code: "345678",
      state: "",
    },
  },
  {
    name: "Eun Ji Park",
    phone: "+65 8765 4321",
    email: "ejpark@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "234 Bukit Timah Rd",
      line2: "Unit 34-567",
      postal_code: "567890",
      state: "",
    },
  },
  {
    name: "Muhammad Rahman",
    phone: "+65 9876 5432",
    email: "mrahman@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "567 Balestier Rd",
      line2: "Unit 45-678",
      postal_code: "234567",
      state: "",
    },
  },
  {
    name: "Hui Min Ng",
    phone: "+65 9012 3456",
    email: "hmng@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "890 Geylang Rd",
      line2: "Unit 56-789",
      postal_code: "456789",
      state: "",
    },
  },
  {
    name: "Suresh Menon",
    phone: "+65 7890 1234",
    email: "smenon@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "123 Sentosa Cove",
      line2: "Unit 67-890",
      postal_code: "678901",
      state: "",
    },
  },
  {
    name: "Mei Ling Tan",
    phone: "+65 6789 0123",
    email: "mltan@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "456 Jurong West St",
      line2: "Unit 78-901",
      postal_code: "789012",
      state: "",
    },
  },
  {
    name: "Jae-Hoon Lee",
    phone: "+65 5678 9012",
    email: "jhlee@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "789 Woodlands Ave",
      line2: "Unit 89-012",
      postal_code: "890123",
      state: "",
    },
  },
  {
    name: "Priya Nair",
    phone: "+65 4567 8901",
    email: "pnair@example.com",
    address: {
      city: "Singapore",
      country: "SG",
      line1: "234 Tampines Rd",
      line2: "Unit 90-123",
      postal_code: "901234",
      state: "",
    },
  },
];

const getCustomers = (country) => {
  switch (country) {
    case "AU":
      return AUCustomers;
    case "FR":
      return FRCustomers;
    case "GB":
      return GBCustomers;
    case "SG":
      return SGCustomers;
    default:
      return USCustomers;
  }
};

module.exports = {
  getCustomers,
  paymentDescriptions,
};
