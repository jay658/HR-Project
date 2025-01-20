type Document = {
  userId: string,
  type: 'profilePicture' | 'driverLicense' | 'optReceipt' | 'optEAD' | 'i983' | 'i20' | 'other',
  status: 'pending' | 'approved' | 'rejected',
  feedback?: {
    comment: string,
    updatedBy: string,
    updatedAt: Date
  }
  fileKey: string,
  fileUrl: string
}

type Contact = {
  firstName: string,
  lastName: string,
  middleName?: string,
  phone: string,
  email: string,
  relationship: string
}

type Onboarding = {
  _id: string,
  userId: string
  status: 'approved' | 'rejected' | 'pending',
  name: {
    firstName: string,
    lastName: string,
    middleName?: string,
    preferredName?: string
  },
  profilePicture: string,
  gender?: 'male' | 'female' | 'noAnswer',
  dob: Date,
  address: {
    buildingNumber: string,
    streetName: string,
    city: string,
    state: string,
    zipCode: string
  },
  phone: {
    cell: string,
    work?: string
  },
  SSN: string,
  carInfo?: {
    make?: string,
    model?: string,
    color?: string
  },
  driversLicense:{
    hasLicense: boolean,
    number?: string,
    expirationDate?: Date,
    document?: string
  },
  employment: {
    residencyStatus: 'citizen' | 'greenCard' | 'nonresident',
    visaType?: 'H1B' | 'L2' | 'F1(CPT/OPT)' | 'H4' | 'Other',
    otherVisaTitle?: string,
    startDate?: Date,
    endDate?: Date,
    documents: Document[],
  },
  reference?: Contact,
  emergencyContact: Contact[]
}

export type User = {
  _id: string,
  username: string,
  password: string,
  email: string,
  onboardingId?: string,
  personalInfoId?: string,
  visaApplicationId?: string
}

export type UserWithOnboarding = Omit<User, 'onboardingId'> & { onboardingId : Onboarding }

export {
  Document,
  Onboarding,
  Contact 
}