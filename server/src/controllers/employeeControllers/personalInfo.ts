import { Request, Response } from 'express';

import { AuthRequest } from '../../middleware/authMiddleware';
import EmployeeUser from '../../models/EmployeeUser';
import { IPersonalInfoData } from '../../models/shared/types';
import Onboarding from '../../models/Onboarding';
import PersonalInfo from '../../models/PersonalInfo';

// temp test user, await auth
const currentTestUser = 'user5';

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

    const personalInfo = await PersonalInfo.findById(user.personalInfoId);
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

export { testPersonalInfoRouter, getPersonalInfo, updatePersonalInfo };
