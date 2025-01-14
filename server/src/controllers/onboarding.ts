import Onboarding, { OnboardingTypeT } from '../models/Onboarding';
import { Request, Response } from 'express';

import EmployeeUser from '../models/EmployeeUser';
import PersonalInfo from '../models/PersonalInfo';
import { onboardingToPersonalInfo } from './utils/converters';
import { uploadFileToAWS } from '../utility/AWS/aws';

const testOnboardingRouter = (_req: Request, res: Response) => {
  try {
    res.json('Successfully hit onboarding router');
  } catch (err: unknown) {
    console.log(`There was an error in the onboarding test route: ${err}`);
  }
};

const getOnboardingForUser = async (_req: Request, res: Response) => {
  try {
    const user = await EmployeeUser.findOne({ username: 'not onboarded user' });

    if (!user) throw Error('User not found');

    let onboarding = await Onboarding.findById(user.onboardingId);

    if (!onboarding) {
      onboarding = await Onboarding.create({ userId: user._id });
      user.onboardingId = onboarding._id;
      await user.save();
    }

    res.json(onboarding);
  } catch (err: unknown) {
    console.log(
      `There was an error getting the onboarding information: ${err}`
    );
    res.status(500).json({ message: `${err}` });
  }
};

const updateOnboardingForUser = async (req: Request, res: Response) => {
  try {
    const { updates }: { updates: Partial<OnboardingTypeT> } = req.body;

    //When auth is set up, we will get the user ID from the JWT and can replace this.
    const user = await EmployeeUser.findOne({ username: 'michael.brown' });
    if (!user) throw Error('User not found');

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      user.onboardingId,
      {
        ...updates,
        status: 'pending'
      },
      { new: true }
    );

    res.send(updatedOnboarding);
  } catch (err: unknown) {
    console.log(`There was an error updating the onboarding form: ${err}`);
  }
};

const updateOnboardingStatus = async (req: Request, res: Response) => {
  try {
    // need to check auth of the HR user for this route.
    const { status, id }: { status: string; id: string } = req.body;

    if (status !== 'approved' && status !== 'rejected')
      throw Error('Invalid status type.');

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select('+SSN');

    if (!updatedOnboarding) throw Error('The onboarding form was not found.');

    if (updatedOnboarding.status === 'approved') {
      const user = await EmployeeUser.findById(updatedOnboarding.userId);
      if (!user) throw Error('User not found');
      if (user.personalInfoId) {
        throw Error('User already has a personal info record');
      }

      const personalInfoData = onboardingToPersonalInfo(
        updatedOnboarding,
        user.email
      );
      const personalInfo = await PersonalInfo.create(personalInfoData);

      user.personalInfoId = personalInfo._id;
      await user.save();

      res.status(200).json({
        message: 'Onboarding approved and personal info created'
      });
    }
  } catch (err: unknown) {
    console.log(
      `There was an error updating the status of the onboarding status: ${err}`
    );
    res.status(500).json({ message: `${err}` });
  }
};

const uploadOnboardingFile = async (req: Request, res: Response) => {
  try {
    const file = req.files?.file;

    // When onboarding model is updated, we can check if the document type is okay and then save the url on the user's onboarding.
    // const { type } = req.body
    // const user = EmployeeUser.findOne({ username: 'john.doe'})

    if (!file) throw Error('No file uploaded');
    if (Array.isArray(file)) throw new Error('Only one file at a time');

    const url = await uploadFileToAWS(file);

    res.json(url);
  } catch (err: unknown) {
    console.log(`There was an error uploading the file: ${err}`);
  }
};

export {
  testOnboardingRouter,
  getOnboardingForUser,
  updateOnboardingForUser,
  updateOnboardingStatus,
  uploadOnboardingFile
};
