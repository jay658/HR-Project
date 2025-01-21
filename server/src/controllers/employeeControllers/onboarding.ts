import Onboarding, { OnboardingTypeT } from '../../models/Onboarding';
import { Request, Response } from 'express';

import { AuthRequest } from '../../middleware/authMiddleware';
import Document from '../../models/Document';
import EmployeeUser from '../../models/EmployeeUser';
import { uploadFileToAWS } from '../../utility/AWS/aws';

const testOnboardingRouter = (_req: Request, res: Response) => {
  try {
    res.json('Successfully hit onboarding router');
  } catch (err: unknown) {
    console.log(`There was an error in the onboarding test route: ${err}`);
  }
};

const getOnboardingForUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw Error('Not authenticated');

    const user = await EmployeeUser.findById(userId);
    if (!user) throw Error('User not found');

    let onboarding = await Onboarding.findById(user.onboardingId)
      .populate('profilePicture', 'fileUrl fileKey type')
      .populate('driversLicense.document', 'fileUrl fileKey type')
      .populate('employment.documents', 'fileUrl fileKey type');
    if (!onboarding) throw Error('User has not onboarded yet');

    res.json(onboarding);
  } catch (err: unknown) {
    console.log(
      `There was an error getting the onboarding information: ${err}`
    );
    res.status(500).json({ message: `${err}` });
  }
};

const updateOnboardingForUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw Error('Not authenticated');

    const user = await EmployeeUser.findById(userId);
    if (!user) throw Error('User not found');

    const { updates }: { updates: Partial<OnboardingTypeT> & {employmentDocuments: string} } = req.body;

    let updatedOnboarding;

    if (!user.onboardingId) {
      console.log('Creating new onboarding record');
      // create new onboarding record with the initial data
      const newOnboarding = await Onboarding.create({
        userId: user._id,
        ...updates,
        employment: {
          ...updates.employment,
          documents: updates.employmentDocuments? [updates.employmentDocuments] : []
        },
        status: 'pending'
      });

      // associate the new onboarding with the user
      user.onboardingId = newOnboarding._id;
      await user.save();

      updatedOnboarding = newOnboarding;
    } else {
      console.log('Updating existing onboarding record');
      // update existing onboarding record
      updatedOnboarding = await Onboarding.findByIdAndUpdate(
        user.onboardingId,
        {
          ...updates,
          employment:{
            ...updates.employment,
            documents:[updates.employmentDocuments]
          }
        },
        { new: true }
      );
    }

    if (!updatedOnboarding) {
      throw new Error('Failed to update onboarding');
    }

    res.json(updatedOnboarding);
  } catch (err: unknown) {
    console.error('Detailed error:', err);
    res.status(500).json({
      message: err instanceof Error ? err.message : 'Unknown error occurred',
      error: err,
      stack: err instanceof Error ? err.stack : undefined
    });
  }
};

const uploadOnboardingFile = async (req: AuthRequest, res: Response) => {
  try {
    const file = req.files?.file;
    const { type } = req.body;
    const userId = req.user?.userId;

    if (!file) throw Error('No file uploaded');
    if (Array.isArray(file)) throw new Error('Only one file at a time');
    if (!type) throw Error('Document type is required');

    const fileUrl = await uploadFileToAWS(file);
    if (!fileUrl) throw Error('Failed to upload file to AWS');

    const document = await Document.create({
      userId,
      type,
      status: 'pending',
      fileKey: file.name,
      fileUrl
    });

    res.json({
      fileUrl,
      documentId: document._id,
      fileKey: file.name
    });
  } catch (err: unknown) {
    console.log(`There was an error uploading the file: ${err}`);
    res.status(500).json({ message: `${err}` });
  }
};

export {
  testOnboardingRouter,
  getOnboardingForUser,
  updateOnboardingForUser,
  uploadOnboardingFile
};
