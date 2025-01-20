const extraOnboardingSeed = [
  {
    status: "approved",
    name: { firstName: "Henry", lastName: "Parker" },
    gender: "female",
    dob: new Date("1989-02-10"),
    address: {
      buildingNumber: "466",
      streetName: "Cedar Road",
      city: "Austin",
      state: "NY",
      zipCode: "64820"
    },
    phone: { work: "555-379-1998", cell: "555-171-3305" },
    SSN: "482598068",
    carInfo: { make: "Toyota", model: "Model 3", color: "Silver" },
    driversLicense: {
      hasLicense: true,
      number: "IL666720707",
      expirationDate: new Date("2028-06-06"),
      document: null
    },
    employment: { residencyStatus: "permanent resident" },
    profilePicture: null,
    reference: {
      firstName: "Sophia",
      lastName: "Carter",
      phone: "555-170-9432",
      email: "henry.parker@example.com",
      relationship: "colleague"
    },
    emergencyContact: [
      {
        firstName: "Ethan",
        lastName: "Davis",
        middleName: null,
        phone: "555-666-4790",
        email: "henry.parker@example.com",
        relationship: "brother"
      },
      {
        firstName: "Lucas",
        lastName: "Johnson",
        middleName: null,
        phone: "555-581-7893",
        email: "henry.parker@example.com",
        relationship: "brother"
      }
    ]
  },
  {
    status: "approved",
    name: { firstName: "Emma", lastName: "Miller" },
    gender: "male",
    dob: new Date("1996-11-11"),
    address: {
      buildingNumber: "547",
      streetName: "Oak Avenue",
      city: "New York",
      state: "CA",
      zipCode: "76157"
    },
    phone: { work: "555-427-7092", cell: "555-673-4926" },
    SSN: "337841678",
    carInfo: { make: "Toyota", model: "Civic", color: "White" },
    driversLicense: {
      hasLicense: true,
      number: "NY660599031",
      expirationDate: new Date("2025-01-23"),
      document: null
    },
    employment: { residencyStatus: "permanent resident" },
    profilePicture: null,
    reference: {
      firstName: "Emma",
      lastName: "Williams",
      phone: "555-916-5875",
      email: "emma.miller@example.com",
      relationship: "colleague"
    },
    emergencyContact: [
      {
        firstName: "Ethan",
        lastName: "Brown",
        middleName: null,
        phone: "555-705-7348",
        email: "emma.miller@example.com",
        relationship: "mentor"
      },
      {
        firstName: "Amelia",
        lastName: "Johnson",
        middleName: null,
        phone: "555-959-6625",
        email: "emma.miller@example.com",
        relationship: "brother"
      }
    ]
  },
  {
    status: "pending",
    name: { firstName: "Amelia", lastName: "Johnson" },
    gender: "male",
    dob: new Date("1983-11-03"),
    address: {
      buildingNumber: "637",
      streetName: "Main Street",
      city: "Austin",
      state: "CA",
      zipCode: "85431"
    },
    phone: { work: "555-742-7100", cell: "555-680-6316" },
    SSN: "897519333",
    carInfo: { make: "Tesla", model: "Model 3", color: "Blue" },
    driversLicense: {
      hasLicense: true,
      number: "TX415614983",
      expirationDate: new Date("2029-06-20"),
      document: null
    },
    employment: { residencyStatus: "citizen" },
    profilePicture: null,
    reference: {
      firstName: "Liam",
      lastName: "Parker",
      phone: "555-435-2691",
      email: "amelia.johnson@example.com",
      relationship: "friend"
    },
    emergencyContact: [
      {
        firstName: "Ethan",
        lastName: "Miller",
        middleName: null,
        phone: "555-877-7440",
        email: "amelia.johnson@example.com",
        relationship: "friend"
      },
      {
        firstName: "Ethan",
        lastName: "Williams",
        middleName: null,
        phone: "555-789-8626",
        email: "amelia.johnson@example.com",
        relationship: "spouse"
      }
    ]
  },
  {
    status: "pending",
    name: { firstName: "Ethan", lastName: "Wilson" },
    gender: "female",
    dob: new Date("1982-11-05"),
    address: {
      buildingNumber: "336",
      streetName: "Maple Lane",
      city: "Los Angeles",
      state: "WA",
      zipCode: "59671"
    },
    phone: { work: "555-861-9269", cell: "555-787-7502" },
    SSN: "790701693",
    carInfo: { make: "Chevrolet", model: "Civic", color: "Red" },
    driversLicense: {
      hasLicense: true,
      number: "CA302320452",
      expirationDate: new Date("2030-06-09"),
      document: null
    },
    employment: { residencyStatus: "permanent resident" },
    profilePicture: null,
    reference: {
      firstName: "Lucas",
      lastName: "Williams",
      phone: "555-270-9922",
      email: "ethan.wilson@example.com",
      relationship: "spouse"
    },
    emergencyContact: [
      {
        firstName: "Sophia",
        lastName: "Smith",
        middleName: null,
        phone: "555-418-5708",
        email: "ethan.wilson@example.com",
        relationship: "mentor"
      },
      {
        firstName: "Henry",
        lastName: "Williams",
        middleName: null,
        phone: "555-909-8907",
        email: "ethan.wilson@example.com",
        relationship: "father"
      }
    ]
  },
  {
    status: "approved",
    name: { firstName: "Sophia", lastName: "Williams" },
    gender: "female",
    dob: new Date("1980-08-20"),
    address: {
      buildingNumber: "982",
      streetName: "Pine Boulevard",
      city: "Austin",
      state: "TX",
      zipCode: "70004"
    },
    phone: { work: "555-615-5218", cell: "555-315-6612" },
    SSN: "140278476",
    carInfo: { make: "Ford", model: "Camry", color: "Black" },
    driversLicense: {
      hasLicense: true,
      number: "NY380128561",
      expirationDate: new Date("2029-12-12"),
      document: null
    },
    employment: { residencyStatus: "citizen" },
    profilePicture: null,
    reference: {
      firstName: "Amelia",
      lastName: "Taylor",
      phone: "555-509-1306",
      email: "sophia.williams@example.com",
      relationship: "colleague"
    },
    emergencyContact: [
      {
        firstName: "Ethan",
        lastName: "Miller",
        middleName: null,
        phone: "555-859-1342",
        email: "sophia.williams@example.com",
        relationship: "colleague"
      },
      {
        firstName: "Olivia",
        lastName: "Brown",
        middleName: null,
        phone: "555-634-2491",
        email: "sophia.williams@example.com",
        relationship: "mother"
      }
    ]
  },
  {
    status: "rejected",
    name: { firstName: "Charlotte", lastName: "Parker" },
    gender: "female",
    dob: new Date("1991-07-13"),
    address: {
      buildingNumber: "579",
      streetName: "Elm Street",
      city: "Austin",
      state: "CA",
      zipCode: "58576"
    },
    phone: { work: "555-740-5038", cell: "555-277-6169" },
    SSN: "655747260",
    carInfo: { make: "Honda", model: "Model 3", color: "Black" },
    driversLicense: {
      hasLicense: true,
      number: "IL824029214",
      expirationDate: new Date("2028-03-18"),
      document: null
    },
    employment: { residencyStatus: "permanent resident" },
    profilePicture: null,
    reference: {
      firstName: "Sophia",
      lastName: "Brown",
      phone: "555-698-6572",
      email: "charlotte.parker@example.com",
      relationship: "mother"
    },
    emergencyContact: [
      {
        firstName: "Charlotte",
        lastName: "Davis",
        middleName: null,
        phone: "555-561-4210",
        email: "charlotte.parker@example.com",
        relationship: "mentor"
      },
      {
        firstName: "Sophia",
        lastName: "Johnson",
        middleName: null,
        phone: "555-541-6475",
        email: "charlotte.parker@example.com",
        relationship: "mentor"
      }
    ]
  },
  {
    status: "rejected",
    name: { firstName: "Henry", lastName: "Smith" },
    gender: "female",
    dob: new Date("1984-08-26"),
    address: {
      buildingNumber: "592",
      streetName: "Elm Street",
      city: "Chicago",
      state: "WA",
      zipCode: "82503"
    },
    phone: { work: "555-888-5055", cell: "555-490-2880" },
    SSN: "562208919",
    carInfo: { make: "Toyota", model: "Camry", color: "White" },
    driversLicense: {
      hasLicense: true,
      number: "WA705419876",
      expirationDate: new Date("2028-09-11"),
      document: null
    },
    employment: { residencyStatus: "permanent resident" },
    profilePicture: null,
    reference: {
      firstName: "Amelia",
      lastName: "Carter",
      phone: "555-545-4669",
      email: "henry.smith@example.com",
      relationship: "mother"
    },
    emergencyContact: [
      {
        firstName: "Ethan",
        lastName: "Brown",
        middleName: null,
        phone: "555-131-1176",
        email: "henry.smith@example.com",
        relationship: "friend"
      },
      {
        firstName: "Olivia",
        lastName: "Taylor",
        middleName: null,
        phone: "555-880-9956",
        email: "henry.smith@example.com",
        relationship: "sister"
      }
    ]
  },
  {
    status: "approved",
    name: { firstName: "Henry", lastName: "Brown" },
    gender: "male",
    dob: new Date("1984-08-04"),
    address: {
      buildingNumber: "550",
      streetName: "Pine Boulevard",
      city: "New York",
      state: "IL",
      zipCode: "20988"
    },
    phone: { work: "555-236-5274", cell: "555-599-3643" },
    SSN: "291890589",
    carInfo: { make: "Ford", model: "Model 3", color: "Black" },
    driversLicense: {
      hasLicense: true,
      number: "IL236475428",
      expirationDate: new Date("2029-02-19"),
      document: null
    },
    employment: { residencyStatus: "citizen" },
    profilePicture: null,
    reference: {
      firstName: "Lucas",
      lastName: "Parker",
      phone: "555-506-7869",
      email: "henry.brown@example.com",
      relationship: "friend"
    },
    emergencyContact: [
      {
        firstName: "Amelia",
        lastName: "Johnson",
        middleName: null,
        phone: "555-558-3460",
        email: "henry.brown@example.com",
        relationship: "mentor"
      },
      {
        firstName: "Olivia",
        lastName: "Parker",
        middleName: null,
        phone: "555-879-2172",
        email: "henry.brown@example.com",
        relationship: "colleague"
      }
    ]
  },
  {
    status: "rejected",
    name: { firstName: "Charlotte", lastName: "Parker" },
    gender: "female",
    dob: new Date("1988-03-01"),
    address: {
      buildingNumber: "267",
      streetName: "Elm Street",
      city: "Austin",
      state: "NY",
      zipCode: "40607"
    },
    phone: { work: "555-103-2180", cell: "555-185-5633" },
    SSN: "798504551",
    carInfo: { make: "Chevrolet", model: "Model 3", color: "White" },
    driversLicense: {
      hasLicense: true,
      number: "TX929196514",
      expirationDate: new Date("2026-05-16"),
      document: null
    },
    employment: { residencyStatus: "permanent resident" },
    profilePicture: null,
    reference: {
      firstName: "Amelia",
      lastName: "Taylor",
      phone: "555-851-2435",
      email: "charlotte.parker@example.com",
      relationship: "spouse"
    },
    emergencyContact: [
      {
        firstName: "Liam",
        lastName: "Miller",
        middleName: null,
        phone: "555-286-8109",
        email: "charlotte.parker@example.com",
        relationship: "brother"
      },
      {
        firstName: "Ethan",
        lastName: "Carter",
        middleName: null,
        phone: "555-375-1808",
        email: "charlotte.parker@example.com",
        relationship: "mentor"
      }
    ]
  },
  {
    status: "rejected",
    name: { firstName: "Ethan", lastName: "Brown" },
    gender: "female",
    dob: new Date("1997-08-23"),
    address: {
      buildingNumber: "641",
      streetName: "Elm Street",
      city: "Austin",
      state: "CA",
      zipCode: "46382"
    },
    phone: { work: "555-571-4762", cell: "555-979-4420" },
    SSN: "235113204",
    carInfo: { make: "Toyota", model: "Malibu", color: "Blue" },
    driversLicense: {
      hasLicense: true,
      number: "WA773276611",
      expirationDate: new Date("2025-09-23"),
      document: null
    },
    employment: { residencyStatus: "permanent resident" },
    profilePicture: null,
    reference: {
      firstName: "Olivia",
      lastName: "Carter",
      phone: "555-530-7316",
      email: "ethan.brown@example.com",
      relationship: "friend"
    },
    emergencyContact: [
      {
        firstName: "Liam",
        lastName: "Miller",
        middleName: null,
        phone: "555-462-2558",
        email: "ethan.brown@example.com",
        relationship: "mentor"
      },
      {
        firstName: "Lucas",
        lastName: "Carter",
        middleName: null,
        phone: "555-868-4533",
        email: "ethan.brown@example.com",
        relationship: "brother"
      }
    ]
  }
];

const extraUsersSeed = [
  { username: "henry.parker", password: "hashed_password_146", email: "henry.parker@example.com" },
  { username: "emma.miller", password: "hashed_password_998", email: "emma.miller@example.com" },
  { username: "amelia.johnson", password: "hashed_password_576", email: "amelia.johnson@example.com" },
  { username: "ethan.wilson", password: "hashed_password_473", email: "ethan.wilson@example.com" },
  { username: "sophia.williams", password: "hashed_password_176", email: "sophia.williams@example.com" },
  { username: "charlotte.parker", password: "hashed_password_481", email: "charlotte.parker@example.com" },
  { username: "henry.smith", password: "hashed_password_758", email: "henry.smith@example.com" },
  { username: "henry.brown", password: "hashed_password_126", email: "henry.brown@example.com" },
  { username: "charlotte.parker2", password: "hashed_password_625", email: "charlotte.parker2@example.com" },
  { username: "ethan.brown", password: "hashed_password_947", email: "ethan.brown@example.com" }
];


export {
  extraOnboardingSeed,
  extraUsersSeed
}