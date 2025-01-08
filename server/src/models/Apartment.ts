import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  tenants: {
    type: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'EmployeeUser' 
    }],
    default: []
  },
  unit: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  }
});

const Apartment = mongoose.model('Apartment', ApartmentSchema);

export default Apartment;