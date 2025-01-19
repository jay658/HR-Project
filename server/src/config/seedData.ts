const seedEmployeeUsers = [
  {
    username: "john.doe",
    password: "hashed_password_123",
    email: "john.doe@example.com",
  },
  {
    username: "jane.smith",
    password: "hashed_password_456",
    email: "jane.smith@example.com",
  },
  {
    username: "michael.brown",
    password: "hashed_password_789",
    email: "michael.brown@example.com",
  },
  {
    username: "kobe.bryant",
    password: "hashed_password_824",
    email: "kobe.bryant@example.com",
  },
];

const seedHumanResources = [
  {
    username: "john.doe.hr",
    password: "hashed_password_123",
    email: "john.doe.hr@example.com",
  },
  {
    username: "jane.smith.hr",
    password: "hashed_password_456",
    email: "jane.smith.hr@example.com",
  },
  {
    username: "michael.brown.hr",
    password: "hashed_password_789",
    email: "michael.brown.hr@example.com",
  },
  {
    username: "kobe.bryant.hr",
    password: "hashed_password_824",
    email: "kobe.bryant.hr@example.com",
  },
];

const seedApartments = [
  {
    unit: "A101",
    capacity: 4,
    address: "123 Main Street, New York, NY",
  },
  {
    unit: "B202",
    capacity: 2,
    address: "456 Elm Street, San Francisco, CA",
  },
  {
    unit: "C303",
    capacity: 3,
    address: "789 Maple Avenue, Seattle, WA",
  },
];

const seedOnboarding = [
  {
    status: "approved",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    gender: "male",
    dob: new Date("1985-06-15"),
    address: {
      buildingNumber: "123",
      streetName: "Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    phone: {
      work: "555-123-4567",
      cell: "555-987-6543",
    },
    SSN: "123456789",
    carInfo: {
      make: "Toyota",
      model: "Camry",
      color: "Blue",
    },
    driversLicense: {
      hasLicense: true,
      number: "NY123456789",
      expirationDate: new Date("2025-01-01"),
      document: null,
    },
    employment: {
      residencyStatus: "citizen",
    },
    profilePicture: null,
    reference: {
      firstName: "Jane",
      lastName: "Smith",
      phone: "555-444-5555",
      email: "jane.smith@example.com",
      relationship: "friend",
    },
    emergencyContact: [
      {
        firstName: "Mary",
        lastName: "Doe",
        middleName: null,
        phone: "555-111-2222",
        email: "mary.doe@example.com",
        relationship: "spouse",
      },
      {
        firstName: "James",
        lastName: "Doe",
        middleName: null,
        phone: "555-333-4444",
        email: "james.doe@example.com",
        relationship: "father",
      },
    ],
  },
  {
    status: "pending",
    name: {
      firstName: "Jane",
      lastName: "Smith",
    },
    gender: "female",
    dob: new Date("1990-02-28"),
    address: {
      buildingNumber: "456",
      streetName: "Elm Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94101",
    },
    phone: {
      work: "555-222-3333",
      cell: "555-444-5555",
    },
    SSN: "987654321",
    carInfo: {
      make: "Honda",
      model: "Civic",
      color: "Red",
    },
    driversLicense: {
      hasLicense: true,
      number: "CA987654321",
      expirationDate: new Date("2024-12-31"),
      document: null,
    },
    employment: {
      residencyStatus: "greenCard",
    },
    profilePicture: null,
    emergencyContact: [
      {
        firstName: "Robert",
        lastName: "Smith",
        middleName: null,
        phone: "555-555-6666",
        email: "robert.smith@example.com",
        relationship: "brother",
      },
      {
        firstName: "Margaret",
        lastName: "Wilson",
        middleName: null,
        phone: "555-777-8888",
        email: "margaret.wilson@example.com",
        relationship: "mother",
      },
    ],
  },
  {
    status: "rejected",
    name: {
      firstName: "Michael",
      lastName: "Brown",
      middleName: "Conversion",
      preferredName: "Test",
    },
    gender: "male",
    dob: new Date("1980-12-05"),
    address: {
      buildingNumber: "789",
      streetName: "Maple Avenue",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
    },
    phone: {
      cell: "555-999-0000",
    },
    SSN: "456789123",
    carInfo: {
      make: "Ford",
      model: "Escape",
      color: "White",
    },
    driversLicense: {
      hasLicense: true,
      number: "WA456789123",
      expirationDate: new Date("2025-06-30"),
      document: null,
    },
    employment: {
      residencyStatus: "nonresident",
      visaType: "H1-B",
      startDate: new Date("2023-03-01"),
      endDate: new Date("2024-03-01"),
    },
    profilePicture: null,
    emergencyContact: [
      {
        firstName: "Sarah",
        lastName: "Brown",
        phone: "555-999-0000",
        email: "sarah.brown@example.com",
        relationship: "spouse",
      },
      {
        firstName: "David",
        lastName: "Brown",
        phone: "555-222-3333",
        email: "david.brown@example.com",
        relationship: "father",
      },
    ],
  },
  {
    status: "approved",
    name: {
      firstName: "Kobe",
      lastName: "Bryant",
      middleName: "Bean",
      preferredName: "Black Mamba",
    },
    gender: "male",
    dob: new Date("1978-08-23"),
    address: {
      buildingNumber: "824",
      streetName: "Lakers Drive",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90015",
    },
    phone: {
      work: "555-824-8224",
      cell: "555-824-2424",
    },
    SSN: "824242424",
    carInfo: {
      make: "Ferrari",
      model: "458 Italia",
      color: "Black",
    },
    driversLicense: {
      hasLicense: true,
      number: "CA824242424",
      expirationDate: new Date("2026-08-23"),
      document: null, // This will be set by the seed script
    },
    employment: {
      residencyStatus: "nonresident",
      visaType: "F1(CPT/OPT)",
      startDate: new Date("2024-12-09"),
      endDate: new Date("2025-02-16"),
      documents: [],
    },
    profilePicture: null, // This will be set by the seed script
    reference: {
      firstName: "Phil",
      lastName: "Jackson",
      phone: "555-999-1111",
      email: "phil.jackson@example.com",
      relationship: "former coach",
    },
    emergencyContact: [
      {
        firstName: "Vanessa",
        lastName: "Bryant",
        middleName: null,
        phone: "555-824-0824",
        email: "vanessa.bryant@example.com",
        relationship: "spouse",
      },
      {
        firstName: "Joe",
        lastName: "Bryant",
        middleName: null,
        phone: "555-824-1111",
        email: "joe.bryant@example.com",
        relationship: "father",
      },
    ],
  },
];

const seedVisaApplications: any[] = [
  // empty since none of our seed users are f1
  // if we add f1 users later, we'll add their visa applications here
];

const seedDocuments = [
  // john doe (citizen) documents
  {
    type: "profilePicture",
    status: "approved",
    fileKey: "dummy/john_profile.jpg",
    fileUrl: "http://dummy-s3.com/john_profile.jpg",
  },
  {
    type: "driverLicense",
    status: "approved",
    fileKey: "dummy/john_license.pdf",
    fileUrl: "http://dummy-s3.com/john_license.pdf",
  },

  // jane smith (permanent resident) documents
  {
    type: "profilePicture",
    status: "approved",
    fileKey: "dummy/jane_profile.jpg",
    fileUrl: "http://dummy-s3.com/jane_profile.jpg",
  },
  {
    type: "driverLicense",
    status: "approved",
    fileKey: "dummy/jane_license.pdf",
    fileUrl: "http://dummy-s3.com/jane_license.pdf",
  },

  // michael brown (nonresident/H1B) documents
  {
    type: "profilePicture",
    status: "approved",
    fileKey: "dummy/michael_profile.jpg",
    fileUrl: "http://dummy-s3.com/michael_profile.jpg",
  },
  {
    type: "driverLicense",
    status: "approved",
    fileKey: "dummy/michael_license.pdf",
    fileUrl: "http://dummy-s3.com/michael_license.pdf",
  },

  // kobe bryant documents
  {
    type: "profilePicture",
    status: "approved",
    fileKey: "dummy/kobe_profile.jpg",
    fileUrl: "http://dummy-s3.com/kobe_profile.jpg",
  },
  {
    type: "driverLicense",
    status: "approved",
    fileKey: "dummy/kobe_license.pdf",
    fileUrl: "http://dummy-s3.com/kobe_license.pdf",
  },
];

const seedPersonalInfo = [
  {
    // based on john.doe's onboarding data
    userId: null,
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    email: "john.doe@example.com",
    gender: "male",
    dob: new Date("1985-06-15"),
    address: {
      buildingNumber: "123",
      streetName: "Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    phone: {
      work: "555-123-4567",
      cell: "555-987-6543",
    },
    SSN: "123456789",
    carInfo: {
      make: "Toyota",
      model: "Camry",
      color: "Blue",
    },
    driversLicense: {
      hasLicense: true,
      number: "NY123456789",
      expirationDate: new Date("2025-01-01"),
      document: null,
    },
    employment: {
      residencyStatus: "citizen",
    },
    profilePicture: "john_profile.jpg",
    reference: {
      firstName: "Jane",
      lastName: "Smith",
      phone: "555-444-5555",
      email: "jane.smith@example.com",
      relationship: "friend",
    },
    emergencyContact: [
      {
        firstName: "Mary",
        lastName: "Doe",
        middleName: null,
        phone: "555-111-2222",
        email: "mary.doe@example.com",
        relationship: "spouse",
      },
      {
        firstName: "James",
        lastName: "Doe",
        middleName: null,
        phone: "555-333-4444",
        email: "james.doe@example.com",
        relationship: "father",
      },
    ],
  },
  {
    // based on jane.smith's onboarding data
    userId: null,
    name: {
      firstName: "Jane",
      lastName: "Smith",
    },
    email: "jane.smith@example.com",
    gender: "female",
    dob: new Date("1990-02-28"),
    address: {
      buildingNumber: "456",
      streetName: "Elm Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94101",
    },
    phone: {
      work: "555-222-3333",
      cell: "555-444-5555",
    },
    SSN: "987654321",
    carInfo: {
      make: "Honda",
      model: "Civic",
      color: "Red",
    },
    driversLicense: {
      hasLicense: true,
      number: "CA987654321",
      expirationDate: new Date("2024-12-31"),
      document: null,
    },
    employment: {
      residencyStatus: "greenCard",
    },
    profilePicture: "jane_profile.jpg",
    emergencyContact: [
      {
        firstName: "Robert",
        lastName: "Smith",
        middleName: null,
        phone: "555-555-6666",
        email: "robert.smith@example.com",
        relationship: "brother",
      },
      {
        firstName: "Margaret",
        lastName: "Wilson",
        middleName: null,
        phone: "555-777-8888",
        email: "margaret.wilson@example.com",
        relationship: "mother",
      },
    ],
  },
  {
    // based on michael.brown's onboarding data
    userId: null,
    name: {
      firstName: "Michael",
      lastName: "Brown",
    },
    email: "michael.brown@example.com",
    gender: "male",
    dob: new Date("1980-12-05"),
    address: {
      buildingNumber: "789",
      streetName: "Maple Avenue",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
    },
    phone: {
      cell: "555-999-0000",
    },
    SSN: "456789123",
    carInfo: {
      make: "Ford",
      model: "Escape",
      color: "White",
    },
    driversLicense: {
      hasLicense: true,
      number: "WA456789123",
      expirationDate: new Date("2025-06-30"),
      document: null,
    },
    employment: {
      residencyStatus: "nonresident",
      visaType: "H1-B",
      startDate: new Date("2023-03-01"),
      endDate: new Date("2024-03-01"),
    },
    profilePicture: "michael_profile.jpg",
    emergencyContact: [
      {
        firstName: "Sarah",
        lastName: "Brown",
        phone: "555-999-0000",
        email: "sarah.brown@example.com",
        relationship: "spouse",
      },
      {
        firstName: "David",
        lastName: "Brown",
        phone: "555-222-3333",
        email: "david.brown@example.com",
        relationship: "father",
      },
    ],
  },
  {
    userId: null, // This will be set by the seed script
    name: {
      firstName: "Kobe",
      lastName: "Bryant",
      middleName: "Bean",
    },
    email: "kobe.bryant@example.com",
    gender: "male",
    dob: new Date("1978-08-23"),
    address: {
      buildingNumber: "824",
      streetName: "Lakers Drive",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90015",
    },
    phone: {
      work: "555-824-8224",
      cell: "555-824-2424",
    },
    SSN: "824242424",
    carInfo: {
      make: "Ferrari",
      model: "458 Italia",
      color: "Black",
    },
    driversLicense: {
      hasLicense: true,
      number: "CA824242424",
      expirationDate: new Date("2026-08-23"),
      document: null, // This will be set by the seed script
    },
    employment: {
      residencyStatus: "nonresident",
      visaType: "F1(CPT/OPT)",
      startDate: new Date("2024-12-09"),
      endDate: new Date("2025-02-16"),
      documents: [],
    },
    profilePicture: null, // This will be set by the seed script
    reference: {
      firstName: "Phil",
      lastName: "Jackson",
      phone: "555-999-1111",
      email: "phil.jackson@example.com",
      relationship: "former coach",
    },
    emergencyContact: [
      {
        firstName: "Vanessa",
        lastName: "Bryant",
        middleName: null,
        phone: "555-824-0824",
        email: "vanessa.bryant@example.com",
        relationship: "spouse",
      },
      {
        firstName: "Joe",
        lastName: "Bryant",
        middleName: null,
        phone: "555-824-1111",
        email: "joe.bryant@example.com",
        relationship: "father",
      },
    ],
  },
];

const seedFacilityIssue = [
  {
    title: "Broken AC Unit",
    description: "The AC unit in apartment A101 is not cooling properly",
    createdBy: null, // will be set to john.doe's ID
    status: "open",
    comments: [
      {
        description: "The temperature is getting worse",
        createdBy: null, // will be set in seed.ts
      },
    ],
  },
  {
    title: "Leaking Faucet",
    description: "Kitchen sink faucet in B202 is constantly dripping",
    createdBy: null, // will be set to jane.smith's ID
    status: "inProgress",
    comments: [
      {
        description: "Water is now dripping faster",
        createdBy: null, // will be set in seed.ts
      },
    ],
  },
  {
    title: "Broken Window Lock",
    description: "Living room window lock in C303 is broken",
    createdBy: null, // will be set to michael.brown's ID
    status: "closed",
    comments: [
      {
        description: "Window cannot be properly secured",
        createdBy: null, // will be set in seed.ts
      },
    ],
  },
];

const notOnboardedUserOnboarding = {
  name: {
    firstName: "Jamie - not onboarded",
    lastName: "Fox",
    middleName: "",
    preferredName: "",
  },
  gender: "male",
  dob: new Date("1980-12-05"),
  address: {
    buildingNumber: "789",
    streetName: "Maple Avenue",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
  },
  phone: {
    cell: "555-999-0000",
  },
  SSN: "456789123",
  driversLicense: {
    hasLicense: true,
    number: "WA456789123",
    expirationDate: new Date("2025-06-30"),
    document: null,
  },
  employment: {
    residencyStatus: "nonresident",
    visaType: "H1-B",
    startDate: new Date("2023-03-01"),
    endDate: new Date("2024-03-01"),
  },
  profilePicture: null,
  emergencyContact: [
    {
      firstName: "Sarah",
      lastName: "Brown",
      phone: "555-999-0000",
      email: "sarah.brown@example.com",
      relationship: "spouse",
    },
  ],
};

export {
  seedEmployeeUsers,
  seedApartments,
  seedOnboarding,
  seedVisaApplications,
  seedPersonalInfo,
  seedFacilityIssue,
  seedDocuments,
  seedHumanResources,
};
