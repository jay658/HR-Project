import { Document } from 'mongoose';
import { IPersonalInfoData } from '../../models/shared/types';
import { OnboardingTypeT } from '../../models/Onboarding';

export const onboardingToPersonalInfo = (
  onboarding: Document & OnboardingTypeT,
  email: string
): Omit<IPersonalInfoData, '_id' | '__v'> => {
  const { status, _id, __v, ...rest } = onboarding.toObject();

  return {
    ...rest,
    email
  };
};
