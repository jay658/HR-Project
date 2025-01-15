import PersonalInfo, { PersonalInfoTypeT } from "../models/PersonalInfo";
import { Request, Response } from "express";

import EmployeeUser from "../models/EmployeeUser";
import Onboarding from "../models/Onboarding";

// temp test user, await auth
const currentTestUser = 'user5';

const testPersonalInfoRouter = (_req: Request, res: Response) => {
  try {
    res.json('Successfully hit personal info router');
  } catch (error) {
    console.log(
      `There was an error in the personal info test route: ${error}`
    );
  }
}

const getPersonalInfo = async (_req: Request, res: Response) => {
  try {
    const user = await EmployeeUser.findOne({ username: currentTestUser });
    if (!user) throw Error('User not found');

    const onboarding = await Onboarding.findById(user.onboardingId);
    if (!onboarding || onboarding.status !== 'approved') {
      throw Error('User has not onboard yet');
    }

    const personalInfo = await PersonalInfo.findById(user.personalInfoId);
    if (!personalInfo) throw Error('Failed to fetch personal information');

    res.json(personalInfo);
  } catch (error: unknown) {
    console.log(`Error fetching personal information: ${error}`);
  }
}

const updatePersonalInfo = async (req: Request, res: Response) => {
  try {
    const { updates }: { updates: Partial<PersonalInfoTypeT> } = req.body;
    const user = await EmployeeUser.findOne({ username: currentTestUser });
    if (!user) throw Error('User not found');

    const onboarding = await Onboarding.findById(user.onboardingId);
    if (!onboarding || onboarding.status !== 'approved') {
      throw Error('User has not onboard yet');
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
}

export {
  testPersonalInfoRouter,
  getPersonalInfo,
  updatePersonalInfo
}