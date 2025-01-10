import mongoose, { InferSchemaType } from 'mongoose'

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
    default: ''
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null
  },
  dob: {
    type: Date,
    default: null
  },
  address: {
    type: String, 
    default: ''
  },
  phone: {
    type: {
      work: {
        type: String,
        default: ''
      },
      cell: {
        type: String,
        default: ''
      }
    }, 
    default: {
      work: '',
      cell: ''
    }
  },
  SSN: {
    type: Number,
    default: null
  },
  carInfo: {
    type: {
      make: {
        type: String,
        default: ''
      },
      model: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      }
    }, 
    default: {
      type: '',
      model: '',
      color: ''
    }
  },
  driversLicense: {
    type: String,
    default: ''
  },
  residency: {
    type: String,
    enum: ['citizen', 'permanent resident', 'nonresident'],
    default: null
  },
  documents: {
    type: [{
      type: String
    }],
    default: []
  },
  reference: {
    type: {
      firstName: String,
      lastName: String,
      middleName: String,
      phone: String,
      email: String,
      relationship: String
    },
    default: null
  },
  emergencyContact: {
    type: {
      firstName: String,
      lastName: String,
      middleName: {
        type: String,
        default: ''
      },
      phone: String,
      email: String,
      relationship: String
    },
    default: null
  },
  profilePicture: {
    type: String,
    default: ''
  }
});

const Onboarding = mongoose.model('Onboarding', OnboardingSchema);

export type OnboardingTypeT = InferSchemaType<typeof OnboardingSchema>
export default Onboarding;