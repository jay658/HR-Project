export interface PersonalInfo {
  name: {
    firstName: string;
    lastName: string;
    middleName?: string | '';
    preferredName?: string | '';
  };
  profilePicture?: string;
  email: string;
  SSN: string;
  dob: Date | string;
  gender: 'male' | 'female' | 'noAnswer';
  address: {
    buildingNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: {
    cell: string;
    work: string | undefined;
  };
  employment: {
    residencyStatus: 'citizen' | 'greenCard' | 'nonresident' | null;
    visaType?: 'H1-B' | 'L2' | 'F1-CPT' | 'F1-OPT' | 'H4' | null;
    startDate?: Date | string;
    endDate?: Date | string;
    documents?: string[];
  };
  carInfo?: {
    make?: string;
    model?: string;
    color?: string;
  };
  driversLicense: {
    hasLicense: boolean;
    number?: string;
    expirationDate?: Date;
    document?: string;
  };
  reference?: {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email: string;
    relationship: string;
  };
  emergencyContact: Array<{
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email: string;
    relationship: string;
  }>;
}
