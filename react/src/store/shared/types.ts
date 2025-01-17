export interface ContactDetails {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
}

interface BasicInfo {
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
  employementDocuments?: Array<string>;
  reference?: ContactDetails | null;
  emergencyContact: Array<ContactDetails>;
  profilePicture?: string;
}

export interface Onboarding extends BasicInfo {
  userId: string;
  status: 'approved' | 'rejected' | 'pending';
}

export type PersonalInfo = BasicInfo;
