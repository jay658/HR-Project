import Onboarding, { OnboardingTypeT } from '../../models/Onboarding';
import { Request, Response } from 'express';

import EmployeeUser from '../../models/EmployeeUser';
import { uploadFileToAWS } from '../../utility/AWS/aws';

const testOnboardingRouter = (_req: Request, res: Response) => {
  try {
    res.json('Successfully hit onboarding router');
  } catch (err: unknown) {
    console.log(`There was an error in the onboarding test route: ${err}`);
  }
};

const getOnboardingForUser = async (req: Request, res: Response) => {
  try {
    const user = await EmployeeUser.findOne({ username: 'not onboarded user' });

    if (!user) throw Error('User not found');

    let onboarding = await Onboarding.findById(user.onboardingId);
    if (!onboarding) throw Error('User has not onboarded yet');

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
    const user = await EmployeeUser.findOne({ username: 'not onboarded user' });
    if (!user) throw Error('User not found');

    let updatedOnboarding;

    if (!user.onboardingId) {
      // create new onboarding record with the initial data
      const newOnboarding = await Onboarding.create({
        userId: user._id,
        ...updates,
        status: 'pending'
      });

      // associate the new onboarding with the user
      user.onboardingId = newOnboarding._id;
      await user.save();

      updatedOnboarding = newOnboarding;
    } else {
      // update existing onboarding record
      updatedOnboarding = await Onboarding.findByIdAndUpdate(
        user.onboardingId,
        {
          ...updates,
          status: 'pending'
        },
        { new: true }
      );
    }

    res.send(updatedOnboarding);
  } catch (err: unknown) {
    console.log(`There was an error updating the onboarding form: ${err}`);
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
  uploadOnboardingFile
};
