import mongoose, { Schema } from 'mongoose';

const FacilityIssueSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'EmployeeUser',
      required: true
    },
    status: {
      type: String,
      enum: ['open', 'inProgress', 'closed'],
      default: 'open'
    },
    comments: [
      {
        description: { type: String, required: true },
        createdBy: {
          type: Schema.Types.ObjectId,
          required: true
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const FacilityIssue = mongoose.model('FacilityIssue', FacilityIssueSchema);

export default FacilityIssue;
