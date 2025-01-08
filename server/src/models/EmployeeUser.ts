import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const EmployeeUserSchema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  onboardingId: {
    type: Schema.Types.ObjectId, 
    ref: 'Onboarding',
    default: null
  },
  visaApplicationId: {
    type: Schema.Types.ObjectId, 
    ref: 'VisaApplication',
    default: null
  },
  apartmentId: {
    type: Schema.Types.ObjectId, 
    ref: 'Apartment',
    default: null
  }
});

const EmployeeUser = mongoose.model('EmployeeUser', EmployeeUserSchema);

export default EmployeeUser;