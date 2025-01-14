import Onboarding, { OnboardingTypeT } from "../models/Onboarding";
import { Request, Response } from "express";

import EmployeeUser from "../models/EmployeeUser";

const testOnboardingRouter =  (_req: Request, res: Response) => {
  try{
    res.json('Successfully hit onboarding router');
  }catch(err: unknown){
    console.log(`There was an error in the onboarding test route: ${err}`);
  }
};

const getOnboardingForUser = async(_req: Request, res: Response) => {
  try{
    const user = await EmployeeUser.findOne({username:"not onboarded user"});
    
    if(!user) throw Error('User not found');
    
    let onboarding = await Onboarding.findById(user.onboardingId);

    if(!onboarding){
      onboarding = await Onboarding.create({userId: user._id})
      user.onboardingId = onboarding._id
      await user.save()
    };
    
    res.json(onboarding);
  }catch(err: unknown){
    console.log(`There was an error getting the onboarding information: ${err}`);
  }
};

const updateOnboardingForUser = async(req: Request, res: Response) => {
  try{
    const { updates }: { updates: Partial<OnboardingTypeT> } = req.body;

    //When auth is set up, we will get the user ID from the JWT and can replace this.
    const user = await EmployeeUser.findOne({username:"not onboarded user"});
    if(!user) throw Error('User not found');
    
    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      user.onboardingId,
      {
        ...updates,
        status: 'pending'
      }, 
      { new: true }
    );

    res.send(updatedOnboarding);
  }catch(err: unknown){
    console.log(`There was an error updating the onboarding form: ${err}`);
  }
};

const updateOnboardingStatus = async(req: Request, res: Response) => {
  try{
    // need to check auth of the HR user for this route.
    const { status, id }: { status: string, id: string } = req.body;

    if(status !== 'approved' && status !== 'rejected') throw Error('Invalid status type.');

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(id, { status }, { new: true });
    
    if(!updatedOnboarding) throw Error('The onboarding form was not found.');
    
    if(updatedOnboarding.status === 'approved'){
      // create a new personal info for the user
    };
    
    res.sendStatus(200);
  }catch(err: unknown){
    console.log(`There was an error updating the status of the onboarding: ${err}`);
  }
};

export {
  testOnboardingRouter,
  getOnboardingForUser,
  updateOnboardingForUser,
  updateOnboardingStatus
};