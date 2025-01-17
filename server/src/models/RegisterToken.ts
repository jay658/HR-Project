import mongoose from "mongoose";

const RegistrationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  personName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hours from creation
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  hr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HumanResources',
    required: true
  }
}, {
  timestamps: true
});

const RegistrationToken = mongoose.model('RegistrationToken', RegistrationTokenSchema);

export default RegistrationToken