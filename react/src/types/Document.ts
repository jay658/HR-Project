// mirroring document modle from the backend
// not directly importing because backend models
// uses types like mongoose.Document that may cause
// problems on the frontend
export type DocumentType =
  | 'profilePicture'
  | 'driverLicense'
  | 'optReceipt'
  | 'optEAD'
  | 'i983'
  | 'i20'
  | 'other';

export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export type DocumentPreview = {
  _id: string;
  type: DocumentType;
  status: DocumentStatus;
  fileUrl?: string;
  fileName?: string;
};
