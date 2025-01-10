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
  }
]

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
  }
]

const seedOnboarding = [
  {
    status: "approved",
    name: "John Doe",
    gender: "male",
    dob: "1985-06-15",
    address: "123 Main Street, New York, NY",
    phone: {
      work: "555-123-4567",
      cell: "555-987-6543"
    },
    SSN: 123456789,
    carInfo: {
      make: "Toyota",
      model: "Camry",
      color: "Blue"
    },
    driversLicense: "NY123456789",
    residency: "citizen",
    documents: ["passport.pdf", "SSN_card.jpg"],
    profilePicture: "john_doe_profile.jpg",
    reference: {
      firstName: "Jane",
      lastName: "Smith",
      phone: "555-444-5555",
      email: "jane.smith@example.com",
      relationship: "friend"
    },
    emergencyContact: {
      firstName: "Jane",
      lastName: "Smith",
      phone: "555-444-5555",
      email: "jane.smith@example.com",
      relationship: "friend"
    }
  },
  {
    status: "pending",
    name: "Jane Smith",
    gender: "female",
    dob: "1990-02-28",
    address: "456 Elm Street, San Francisco, CA",
    phone: {
      work: "555-222-3333",
      cell: "555-444-5555"
    },
    SSN: 987654321,
    carInfo: {
      make: "Honda",
      model: "Civic",
      color: "Red"
    },
    driversLicense: "CA987654321",
    residency: "permanent resident",
    documents: ["drivers_license.jpg"],
    profilePicture: "jane_smith_profile.jpg"
  },
  {
    status: "rejected",
    name: "Michael Brown",
    gender: "male",
    dob: "1980-12-05",
    address: "789 Maple Avenue, Seattle, WA",
    phone: {
      work: "555-666-7777",
      cell: "555-888-9999"
    },
    SSN: 456789123,
    carInfo: {
      make: "Ford",
      model: "Escape",
      color: "White"
    },
    driversLicense: "WA456789123",
    residency: "nonresident",
    documents: ["visa.pdf", "passport.jpg"],
    profilePicture: "michael_brown_profile.jpg"
  }
]

const seedVisaApplications = [
  {
    status: 'approved',
  },
  {
    status: 'rejected'
  },
  {
    status: 'pending'
  }
]

export {
  seedEmployeeUsers,
  seedApartments,
  seedOnboarding,
  seedVisaApplications
}
