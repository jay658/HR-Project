import mongoose, { Document, InferSchemaType, Schema } from 'mongoose';

import { DEFAULT_PROFILE_PICTURE_ID } from './Document';

interface IDriversLicense {
  hasLicense: boolean;
  number?: string;
  expirationDate?: Date;
  document?: mongoose.Types.ObjectId;
}

interface IPersonalInfo extends Document {
  userId: mongoose.Types.ObjectId;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
  };
  email: string;
  gender?: 'male' | 'female' | 'noAnswer';
  dob: Date;
  address: {
    buildingNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: {
    work?: string;
    cell: string;
  };
  employment: {
    residencyStatus: 'citizen' | 'greenCard' | 'nonresident';
    visaType?: 'H1-B' | 'L2' | 'F1-CPT' | 'F1-OPT' | 'H4' | null;
    startDate?: Date;
    endDate?: Date;
    documents: mongoose.Types.ObjectId[];
  };
  SSN: string;
  carInfo?: {
    make?: string;
    model?: string;
    color?: string;
  };
  driversLicense: IDriversLicense;
  residency: 'citizen' | 'greenCard' | 'nonresident';
  reference?: {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email: string;
    relationship: string;
  };
  profilePicture?: mongoose.Types.ObjectId;
  emergencyContacts: Array<{
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email: string;
    relationship: string;
  }>;
}

// type ResidencyStatus = 'citizen' | 'greenCard' | 'nonresident';
// type VisaType = 'H1-B' | 'L2' | 'F1-CPT' | 'F1-OPT' | 'H4' | null;

const PersonalInfoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'EmployeeUser',
    required: true
  },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, default: null },
    preferredName: { type: String, default: null }
  },
  // NOTE: doc says email cannot be changed during onboarding,
  // can it be changed in personal information page?
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'noAnswer'],
    default: null
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    buildingNumber: { type: String, required: true },
    streetName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  phone: {
    work: String,
    cell: { type: String, required: true }
  },
  employment: {
    residencyStatus: {
      type: String,
      enum: ['citizen', 'greenCard', 'nonresident'],
      required: true
    },
    visaType: {
      type: String,
      enum: ['H1-B', 'L2', 'F1-CPT', 'F1-OPT', 'H4', null],
      default: null
    },
    startDate: Date,
    endDate: Date,
    documents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Document'
      }
    ]
  },
  // - select: by default, query will not return ssn,
  // it has to be sepcified that ssn to be part of the
  // response, which prevent accidental exposure
  // - type: String because ssn likely needs to be
  // encrypted, and String makes it easier to work with
  SSN: {
    type: String,
    required: true,
    select: false
  },
  carInfo: {
    make: String,
    model: String,
    color: String
  },
  driversLicense: {
    hasLicense: { type: Boolean, required: true },
    number: {
      type: String,
      required: function (this: IPersonalInfo) {
        return this.driversLicense.hasLicense;
      }
    },
    expirationDate: {
      type: Date,
      required: function (this: IPersonalInfo) {
        return this.driversLicense.hasLicense;
      }
    },
    document: {
      type: Schema.Types.ObjectId,
      ref: 'Document',
      required: function (this: IPersonalInfo) {
        return this.driversLicense.hasLicense;
      }
    }
  },
  // according to Joise in slack, reference can be anyone,
  // not necessarily an employee, there can only be 1
  // reference person
  reference: {
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String, default: null },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      relationship: { type: String, required: true }
    },
    required: false,
    default: null
  },
  profilePicture: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
    default: null
  },
  // a employee can have multiple emergency contacts
  emergencyContacts: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String, default: null },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      relationship: { type: String, required: true }
    }
  ]
});

const PersonalInfo = mongoose.model('PersonalInfo', PersonalInfoSchema);

export type PersonalInfoTypeT = InferSchemaType<typeof PersonalInfoSchema>;
export default PersonalInfo;
