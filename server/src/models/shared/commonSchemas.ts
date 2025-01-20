import { IDriversLicense, IEmployment } from './types';

import { Schema } from 'mongoose';

export const nameSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, default: null },
    preferredName: { type: String, default: null }
  },
  { _id: false }
);

export const profilePictureSchema = {
  type: Schema.Types.ObjectId,
  ref: 'Document',
  default: null
};

export const ssnSchema = {
  type: String,
  required: true,
  minlength: 9,
  maxlength: 9
};

export const addressSchema = new Schema(
  {
    buildingNumber: { type: String, required: true },
    streetName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  { _id: false }
);

export const phoneSchema = new Schema(
  {
    cell: { type: String, required: true },
    work: { type: String, default: null }
  },
  { _id: false }
);

export const carInfoSchema = new Schema(
  {
    make: { type: String, default: null },
    model: { type: String, default: null },
    color: { type: String, default: null }
  },
  { _id: false }
);

export const genderSchema = {
  type: String,
  enum: ['male', 'female', 'noAnswer', null],
  default: null
};

export const driversLicenseSchema = new Schema(
  {
    hasLicense: { type: Boolean, required: true, default: false },
    number: {
      type: String,
      required: function (this: IDriversLicense) {
        return this.hasLicense;
      },
      default: null
    },
    expirationDate: {
      type: Date,
      required: function (this: IDriversLicense) {
        return this.hasLicense;
      },
      default: null
    },
    document: {
      type: Schema.Types.ObjectId,
      ref: 'Document',
      required: function (this: IDriversLicense) {
        return this.hasLicense;
      },
      default: null
    }
  },
  { _id: false }
);

export const employmentSchema = new Schema(
  {
    residencyStatus: {
      type: String,
      enum: ['citizen', 'greenCard', 'nonresident'],
      required: true
    },
    visaType: {
      type: String,
      enum: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other', null],
      required: function (this: IEmployment) {
        return this.residencyStatus === 'nonresident';
      },
      default: null
    },
    otherVisaTitle: {
      type: String,
      required: function (this: IEmployment) {
        return this.visaType === 'Other';
      },
      default: null
    },
    startDate: {
      type: Date,
      required: function (this: IEmployment) {
        return this.residencyStatus === 'nonresident';
      },
      default: null
    },
    endDate: {
      type: Date,
      required: function (this: IEmployment) {
        return this.residencyStatus === 'nonresident';
      },
      default: null
    },
    documents: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
      required: function (this: IEmployment) {
        return this.visaType === 'F1(CPT/OPT)';
      },
      default: null
    }
  },
  { _id: false }
);

export const contactSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, default: null },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    relationship: { type: String, required: true }
  },
  { _id: false }
);
