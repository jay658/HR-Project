import {
  addressSchema,
  carInfoSchema,
  contactSchema,
  driversLicenseSchema,
  employmentSchema,
  genderSchema,
  nameSchema,
  phoneSchema,
  profilePictureSchema,
  ssnSchema
} from './shared/commonSchemas';
import mongoose, { InferSchemaType, Schema } from 'mongoose';

const PersonalInfoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'EmployeeUser',
    required: true
  },
  name: { type: nameSchema, required: true },
  email: {
    type: String,
    required: true
  },
  gender: genderSchema,
  dob: { type: Date, required: true },
  address: { type: addressSchema, required: true },
  phone: { type: phoneSchema, required: true },
  SSN: ssnSchema,
  employment: { type: employmentSchema, required: true },
  carInfo: {
    type: carInfoSchema,
    default: { make: null, model: null, color: null }
  },
  driversLicense: driversLicenseSchema,
  reference: { type: contactSchema, default: null },
  profilePicture: profilePictureSchema,
  emergencyContact: { type: [contactSchema], required: true }
});

const PersonalInfo = mongoose.model('PersonalInfo', PersonalInfoSchema);

export type PersonalInfoTypeT = InferSchemaType<typeof PersonalInfoSchema>;
export default PersonalInfo;
