import DocumentModel, { IDocument } from './Document';
import mongoose, { Document, Schema } from 'mongoose';

type OPTStep = 'optReceipt' | 'optEAD' | 'i983' | 'i20' | 'completed';

interface IVisaApplication extends Document {
  userId: mongoose.Types.ObjectId;
  nextStep: OPTStep;
  // utility methods
  getCurrentDocuments(): Promise<(typeof DocumentModel)[]>;
  updateNextStep(): Promise<void>;
  getNextRequiredDocument(): OPTStep;
}

// remove status from VisaApplication because Document Schema already keeps
// track of status, VisaApplication right now is purely for keeping track
// of what document needs to be uploaded, by F1 visa holders
const VisaApplicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'EmployeeUser',
      required: true
    },
    nextStep: {
      type: String,
      enum: ['optReceipt', 'optEAD', 'i983', 'i20', 'completed'],
      default: 'optReceipt'
    }
  },
  {
    timestamps: true
  }
);

// get all opt documents for this application
VisaApplicationSchema.methods.getCurrentDocuments = async function () {
  return await DocumentModel.find({
    userId: this.userId,
    type: { $in: ['optReceipt', 'optEAD', 'i983', 'i20'] }
  }).sort({ createdAt: 1 });
};

// update nextStep based on current document statuses
VisaApplicationSchema.methods.updateNextStep = async function () {
  const documents = await this.getCurrentDocuments();
  const steps: OPTStep[] = ['optReceipt', 'optEAD', 'i983', 'i20', 'completed'];

  for (const step of steps) {
    if (step === 'completed') {
      this.nextStep = 'completed';
      break;
    }

    const doc = documents.find((d: IDocument) => d.type === step);
    if (!doc) {
      this.nextStep = step;
      break;
    }
    if (doc.status === 'rejected') {
      this.nextStep = step;
      break;
    }
    if (doc.status === 'pending') {
      this.nextStep = step;
      break;
    }
  }

  await this.save();
};

// get the next document that needs to be uploaded/approved
VisaApplicationSchema.methods.getNextRequiredDocument = function (): OPTStep {
  return this.nextStep;
};

const VisaApplication = mongoose.model<IVisaApplication>(
  'VisaApplication',
  VisaApplicationSchema
);

export type {IVisaApplication};
export default VisaApplication;
