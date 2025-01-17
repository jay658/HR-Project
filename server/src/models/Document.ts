import mongoose, { Schema } from 'mongoose';

import config from '../utility/configs';

export const DEFAULT_PROFILE_PICTURE_ID = 'default-profile-picture-id';

export interface IDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type:
    | 'profilePicture'
    | 'driverLicense'
    | 'optReceipt'
    | 'optEAD'
    | 'i983'
    | 'i20'
    | 'other';
  status: 'pending' | 'approved' | 'rejected';
  feedback?: {
    comment: string;
    updatedBy: mongoose.Types.ObjectId;
    updatedAt: Date;
  };
  fileKey: string;
  fileUrl: string;
}

// separate document schema for better file upload consistency
const DocumentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'EmployeeUser'
    },
    type: {
      type: String,
      enum: [
        'profilePicture',
        'driverLicense',
        'optReceipt',
        'optEAD',
        'i983',
        'i20',
        // for other visa type
        'other'
      ],
      required: true
    },
    // HR should be able to Approve or Reject the
    // document. If they reject it, they can also give
    // feedback. This feedback should be visible to
    // the employee when they access their visa
    // status management page. (req doc page 7)
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    feedback: {
      comment: String,
      // updatedBy: { type: Schema.Types.ObjectId, ref: 'HR' },
      updatedBy: Schema.Types.ObjectId, // hr user id
      updatedAt: Date
    },
    fileKey: String,
    fileUrl: String
  },
  { timestamps: true }
);

// the default profile picture placeholder will be stored in s3
// and this function is to make sure that it will always be available
export async function initializeDefaultProfilePicture() {
  const Document = mongoose.model('Document', DocumentSchema);

  const exists = await Document.exists({ _id: DEFAULT_PROFILE_PICTURE_ID });
  if (!exists) {
    await Document.create({
      _id: DEFAULT_PROFILE_PICTURE_ID,
      type: 'PROFILE_PICTURE',
      fileKey: 'defaults/profile-placeholder.png',
      fileUrl: `https://${config.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/defaults/profile-placeholder.png`
    });
  }
}

const Document = mongoose.model('Document', DocumentSchema);

export default Document;
