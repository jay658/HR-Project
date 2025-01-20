import { Request, Response } from 'express';

import { AuthRequest } from '../../middleware/authMiddleware';
import EmployeeUser from '../../models/EmployeeUser';
import { IPersonalInfoData } from '../../models/shared/types';
import Onboarding from '../../models/Onboarding';
import PersonalInfo from '../../models/PersonalInfo';
import { uploadFileToAWS } from '../../utility/AWS/aws';
import Document from '../../models/Document';

const testPersonalInfoRouter = (_req: Request, res: Response) => {
  try {
    res.json('Successfully hit personal info router');
  } catch (error) {
    console.log(`There was an error in the personal info test route: ${error}`);
  }
};

const getPersonalInfo = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.userId
    const user = await EmployeeUser.findById(id)
    if (!user) throw Error('User not found');

    const onboarding = await Onboarding.findById(user.onboardingId);
    if (!onboarding || onboarding.status !== 'approved') {
      throw Error('User has not onboarded yet');
    }

    const personalInfo = await PersonalInfo.findById(user.personalInfoId)
      .populate('profilePicture', 'fileUrl fileKey type')
      .populate('driversLicense.document', 'fileUrl fileKey type')
      .populate('employment.documents', 'fileUrl fileKey type');
    if (!personalInfo) throw Error('Failed to fetch personal information');

    res.json(personalInfo);
  } catch (error: unknown) {
    console.log(`Error fetching personal information: ${error}`);
  }
};

const updatePersonalInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { updates }: { updates: Partial<IPersonalInfoData> } = req.body;
    const id = req.user?.userId
    const user = await EmployeeUser.findById(id)
    if (!user) throw Error('User not found');

    const onboarding = await Onboarding.findById(user.onboardingId);
    if (!onboarding || onboarding.status !== 'approved') {
      throw Error('User has not onboarded yet');
    }

    const updateInfo = await PersonalInfo.findByIdAndUpdate(
      user.personalInfoId,
      updates,
      { new: true }
    );

    res.json(updateInfo);
  } catch (error: unknown) {
    console.log(`Error updating personal information: ${error}`);
  }
};

const uploadPersonalInfoFile = async (req: AuthRequest, res: Response) => {
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

export { testPersonalInfoRouter, getPersonalInfo, updatePersonalInfo, uploadPersonalInfoFile };
