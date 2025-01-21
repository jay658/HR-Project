import { Request, Response } from 'express';

import Apartment from '../../models/Apartment';
import EmployeeUser from '../../models/EmployeeUser';
import { IOnboardingData } from "../../models/shared/types";
import Onboarding from '../../models/Onboarding';
import PersonalInfo from '../../models/PersonalInfo';
import { onboardingToPersonalInfo } from '../utils/converters';

// Test Router
const testOnboardingRouter = (_req: Request, res: Response) => {
  try {
    res.json('Successfully hit hr onboarding router');
  } catch (err) {
    console.log(`There was an error in the hr onboarding test route: ${err}`);
  }
};

const getOnboardings = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const filter = status ? { status } : {};

    const onboardings: (Omit<IOnboardingData, 'profilePicture'> & { profilePicture?: { fileUrl: string}})[] = await Onboarding.find(filter).select('+SSN').populate({
      path: "profilePicture",
      select: "fileUrl -_id"
    }).lean<(Omit<IOnboardingData, 'profilePicture'> & { profilePicture?: { fileUrl: string}})[]>()
    
    const updatedOnboardings = onboardings.map(onboarding => ({
      ...onboarding,
      profilePicture: onboarding.profilePicture?.fileUrl
    })) 

    res.json(updatedOnboardings);
  }catch(err){
    console.log(`There was an error getting the onboardings in the hr route: ${err}`);
  }
};

const updateOnboardingStatus = async (req: Request, res: Response) => {
  try {
    // need to check auth of the HR user for this route.
    const { status }: { status: string } = req.body;
    const { onboardingId } = req.params;
    
    if (status !== 'approved' && status !== 'rejected')
      throw Error('Invalid status type.');

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      onboardingId,
      { status },
      { new: true }
    );

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

      const apartments = await Apartment.find()
      
      const randomApartmentId = apartments[Math.floor(Math.random() * apartments.length)]._id

      user.apartmentId = randomApartmentId

      await user.save();

      res.status(200).json({
        message: 'Onboarding approved and personal info created',
        updatedOnboarding
      });
      return
    }

    res.status(200).json({
      message: 'Onboarding rejected.',
      updatedOnboarding
    });
  } catch (err: unknown) {
    console.log(
      `There was an error updating the status of the onboarding status: ${err}`
    );
    res.status(500).json({ message: `${err}` });
  }
};

export { testOnboardingRouter, getOnboardings, updateOnboardingStatus };
