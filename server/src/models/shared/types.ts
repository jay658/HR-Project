import mongoose, { Document, Types } from 'mongoose';

export interface IEmployeeUserData {
  username: string;
  password: string;
  email: string;
  onboardingId: mongoose.Types.ObjectId | null;
  personalInfoId: mongoose.Types.ObjectId | null;
  visaApplicationId: mongoose.Types.ObjectId | null;
  apartmentId: mongoose.Types.ObjectId | null;
}

export interface IEmployeeUser extends IEmployeeUserData, Document {
  _id: Types.ObjectId;
}

export interface IName {
  firstName: string;
  lastName: string;
  middleName?: string | null;
  preferredName?: string | null;
}

export interface IPhone {
  cell: string;
  work?: string | null;
}

export interface IEmployment {
  residencyStatus: 'citizen' | 'greenCard' | 'nonresident';
  visaType?: 'H1-B' | 'L2' | 'F1(CPT/OPT)' | 'H4' | 'Other' | null;
  otherVisaTitle?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  documents?: Types.ObjectId[] | null;
}

export interface IAddress {
  buildingNumber: string;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IDriversLicense {
  hasLicense: boolean;
  number?: string | null;
  expirationDate?: Date | null;
  document?: Types.ObjectId | null;
}

export interface ICarInfo {
  make?: string | null;
  model?: string | null;
  color?: string | null;
}

export interface IContact {
  firstName: string;
  lastName: string;
  middleName?: string | null;
  phone: string;
  email: string;
  relationship: string;
}

export interface IBasicInfoData {
  userId: mongoose.Types.ObjectId;
  name: IName;
  profilePicture?: mongoose.Types.ObjectId;
  gender?: 'male' | 'female' | 'noAnswer' | null;
  dob: Date;
  address: IAddress;
  phone: IPhone;
  employment: IEmployment;
  SSN: string;
  carInfo?: ICarInfo;
  driversLicense: IDriversLicense;
  reference?: IContact | null;
  emergencyContact: IContact[];
}

export interface IBasicInfo extends IBasicInfoData, Document {}

export interface IOnboardingData extends IBasicInfoData {
  status: 'approved' | 'rejected' | 'pending';
}

export interface IPersonalInfoData extends IBasicInfoData {
  email: string;
}

export interface IOnboarding extends IOnboardingData, Document {}
export interface IPersonalInfo extends IPersonalInfoData, Document {}
