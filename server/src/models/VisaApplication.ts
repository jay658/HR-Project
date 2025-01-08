import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const VisaApplicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'EmployeeUser',
    required: true
  },
  status: {
    type: String,
    enum: ['approved', 'rejected', 'pending'],
    default: 'pending'
  }
});

const VisaApplication = mongoose.model('VisaApplication', VisaApplicationSchema);

export default VisaApplication;