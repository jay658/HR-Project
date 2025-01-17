export interface ContactDetails {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
}

// interface DocumentReference {
//   type: 'profilePicture' | 'driverLicense' | 'optReceipt' | 'optEAD' | 'i983' | 'i20' | 'other';
//   status: 'pending' | 'approved' | 'rejected';
//   fileKey: string;
//   fileUrl: string;
//   documentId: string;
// }

export interface BasicInfo {
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  email?: string;
  gender?: 'male' | 'female' | 'noAnswer' | null;
  dob: Date | string;
  buildingNumber: string;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
  work?: string;
  cell: string;
  SSN: string | null;
  make?: string;
  model?: string;
  color?: string;
  hasLicense: 'yes' | 'no' | null;
  number?: string;
  expirationDate?: Date | string;
  licenseDocument?: string;
  residencyStatus: 'citizen' | 'greenCard' | 'nonresident' | '';
  visaType?: 'H1-B' | 'L2' | 'F1(CPT/OPT)' | 'H4' | 'Other' | '';
  otherVisaTitle?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  employementDocuments?: string[];
  reference?: ContactDetails | null;
  emergencyContact: Array<ContactDetails>;
  profilePicture?: string;
}

export interface Onboarding extends BasicInfo {
  userId: string;
  status: 'approved' | 'rejected' | 'pending' | null;
}

export interface OnboardingResponse {
  _id: string;
  userId: string;
  status: 'approved' | 'rejected' | 'pending' | null;
  name: {
    firstName: string;
    lastName: string;
    middleName: string | null;
    preferredName: string | null;
  };
  address: {
    buildingNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: {
    cell: string;
    work: string | null;
  };
  carInfo: {
    make: string | null;
    model: string | null;
    color: string | null;
  };
  driversLicense: {
    hasLicense: boolean;
    number: string | null;
    expirationDate: string | null;
    document: string | null;
  };
  employment: {
    residencyStatus: string;
    visaType: string | null;
    otherVisaTitle: string | null;
    startDate: string | null;
    endDate: string | null;
    documents: string[] | null;
  };
  gender?: 'male' | 'female' | 'noAnswer' | null;
  dob: string;
  SSN: string | null;
  profilePicture: string | null;
  reference: ContactDetails | null;
  emergencyContact: ContactDetails[];
}

export type PersonalInfo = BasicInfo;

// export interface PersonalInfo {
//   name: {
//     firstName: string;
//     lastName: string;
//     middleName?: string | '';
//     preferredName?: string | '';
//   };
//   profilePicture?: string;
//   email: string;
//   SSN: string;
//   dob: Date | string;
//   gender: 'male' | 'female' | 'noAnswer';
//   address: {
//     buildingNumber: string;
//     streetName: string;
//     city: string;
//     state: string;
//     zipCode: string;
//   };
//   phone: {
//     cell: string;
//     work: string | undefined;
//   };
//   employment: {
//     residencyStatus: 'citizen' | 'greenCard' | 'nonresident' | null;
//     visaType?: 'H1-B' | 'L2' | 'F1-CPT' | 'F1-OPT' | 'H4' | null;
//     startDate?: Date | string;
//     endDate?: Date | string;
//     documents?: string[];
//   };
//   carInfo?: {
//     make?: string;
//     model?: string;
//     color?: string;
//   };
//   driversLicense: {
//     hasLicense: boolean;
//     number?: string;
//     expirationDate?: Date;
//     document?: string;
//   };
//   reference?: {
//     firstName: string;
//     lastName: string;
//     middleName?: string;
//     phone: string;
//     email: string;
//     relationship: string;
//   };
//   emergencyContact: Array<{
//     firstName: string;
//     lastName: string;
//     middleName?: string;
//     phone: string;
//     email: string;
//     relationship: string;
//   }>;
// }

