import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  dob: {
    type: String,
  },
  address: {
    type: String
  },
  phone: {
    type: {
      work: {
        type: String
      },
      cell: {
        type: String
      }
    }
  },
  SSN: {
    type: Number
  },
  carInfo: {
    type: {
      make: {
        type: String
      },
      model: {
        type: String
      },
      color: {
        type: String
      }
    }
  },
  driversLicense: {
    type: String
  },
  residency: {
    type: String,
    enum: ['citizen', 'permanent resident', 'nonresident']
  },
  documents: {
    type: [{
      type: String
    }],
    default: []
  },
  referenceId: {
    type: Schema.Types.ObjectId, 
    ref: 'EmployeeUser',
    default: null
  },
  profilePicture: {
    type: String
  }
});

const Onboarding = mongoose.model('Onboarding', OnboardingSchema);

export default Onboarding;