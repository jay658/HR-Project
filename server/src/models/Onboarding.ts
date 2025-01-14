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

const OnboardingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'EmployeeUser',
    required: true
  },
  status: {
    type: String,
    enum: ['approved', 'rejected', 'pending'],
    default: 'pending'
  },
  name: { type: nameSchema, required: true },
  profilePicture: profilePictureSchema,
  gender: genderSchema,
  dob: { type: Date, required: true },
  address: { type: addressSchema, required: true },
  phone: { type: phoneSchema, required: true },
  SSN: ssnSchema,
  carInfo: {
    type: carInfoSchema,
    default: { make: null, model: null, color: null }
  },
  driversLicense: driversLicenseSchema,
  employment: { type: employmentSchema, required: true },
  reference: { type: contactSchema, default: null },
  emergencyContact: { type: [contactSchema], required: true }
});

const Onboarding = mongoose.model('Onboarding', OnboardingSchema);

export type OnboardingTypeT = InferSchemaType<typeof OnboardingSchema>;
export default Onboarding;
