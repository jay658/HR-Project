import { Onboarding, PersonalInfo } from '../../store/shared/types';
import {
  validateEmail,
  validatePhone,
  validateSSN,
  validateZipCode
} from './validators';

interface ContactErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  relationship?: string;
}

export interface OnboardingValidationErrors {
  [key: string]: string | ContactErrors | ContactErrors[] | undefined;
  firstName?: string;
  lastName?: string;
  email?: string;
  SSN?: string;
  dob?: string;
  cell?: string;
  work?: string;
  streetName?: string;
  buildingNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  residencyStatus?: string;
  visaType?: string;
  otherVisaTitle?: string;
  startDate?: string;
  endDate?: string;
  hasLicense?: string;
  number?: string;
  expirationDate?: string;
  reference?: ContactErrors;
  emergencyContact?: ContactErrors[];
  emergencyContactRequired?: string;
  licenseDocument?: string;
  employementDocuments?: string;
}

export const validateOnboarding = (
  data: Onboarding,
  pendingFiles?: { [key: string]: File | null }
): OnboardingValidationErrors => {
  const errors: OnboardingValidationErrors = {};

  // basic Information
  if (!data.firstName?.trim()) errors.firstName = 'First name is required';
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!data.SSN) {
    errors.SSN = 'SSN is required';
  } else if (!validateSSN(data.SSN.toString())) {
    errors.SSN = 'Invalid SSN format';
  }
  if (!data.dob) {
    errors.dob = 'Date of birth is required';
  } else {
    const birthDate = new Date(data.dob);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    if (birthDate > today) {
      errors.dob = 'Date of birth cannot be in the future';
    } else if (birthDate < minDate) {
      errors.dob = 'Please enter a valid date of birth';
    }
  }

  // contact
  if (!data.cell?.trim()) {
    errors.cell = 'Cell phone is required';
  } else if (!validatePhone(data.cell)) {
    errors.cell = 'Invalid phone format';
  }
  if (data.work?.trim() && !validatePhone(data.work)) {
    errors.work = 'Invalid phone format';
  }

  // address
  if (!data.buildingNumber?.trim())
    errors.buildingNumber = 'Building number is required';
  if (!data.streetName?.trim()) errors.streetName = 'Street name is required';
  if (!data.city?.trim()) errors.city = 'City is required';
  if (!data.state?.trim()) errors.state = 'State is required';
  if (!data.zipCode?.trim()) {
    errors.zipCode = 'ZIP code is required';
  } else if (!validateZipCode(data.zipCode)) {
    errors.zipCode = 'Invalid ZIP code format';
  }

  // reference
  if (data.reference) {
    const referenceErrors: ContactErrors = {};
    if (data.reference.phone && !validatePhone(data.reference.phone)) {
      referenceErrors.phone = 'Invalid phone format';
    }
    if (data.reference.email && !validateEmail(data.reference.email)) {
      referenceErrors.email = 'Invalid email format';
    }
    if (Object.keys(referenceErrors).length) {
      errors.reference = referenceErrors;
    }
  }

  // employment
  if (!data.residencyStatus) {
    errors.residencyStatus = 'Residency status is required';
  } else if (data.residencyStatus === 'nonresident') {
    if (!data.visaType) {
      errors.visaType = 'Visa type is required';
    }
    if (data.visaType === 'Other' && !data.otherVisaTitle?.trim()) {
      errors.otherVisaTitle = 'Please specify visa type';
    }
    if (!data.startDate) errors.startDate = 'Start date is required';
    if (!data.endDate) errors.endDate = 'End date is required';
    if (
      data.startDate &&
      data.endDate &&
      new Date(data.startDate) >= new Date(data.endDate)
    ) {
      errors.startDate = 'Start date must be earlier than end date';
      errors.endDate = 'End date must be later than start date';
    }
    if (data.visaType === 'F1(CPT/OPT)' && !pendingFiles?.optReceipt) {
      errors.employementDocuments = 'OPT Receipt is required';
    }
  }

  // license
  if (!data.hasLicense) {
    errors.hasLicense = 'License status is required';
  } else if (data.hasLicense === 'yes') {
    if (!data.number?.trim()) errors.number = 'License number is required';
    if (!data.expirationDate) errors.expirationDate = 'Expiration date is required';
    if (!pendingFiles?.driverLicense) {
      errors.licenseDocument = 'License document is required';
    }
  }

  // emergency contact
  if (!data.emergencyContact?.length) {
    errors.emergencyContactRequired =
      'At least one emergency contact is required';
  } else {
    const contactErrors = data.emergencyContact
      .map((contact) => {
        const contactError: ContactErrors = {};
        if (!contact.firstName?.trim())
          contactError.firstName = 'First name is required';
        if (!contact.lastName?.trim())
          contactError.lastName = 'Last name is required';
        if (!contact.phone?.trim()) {
          contactError.phone = 'Phone is required';
        } else if (!validatePhone(contact.phone)) {
          contactError.phone = 'Invalid phone format';
        }
        if (!contact.email?.trim()) {
          contactError.email = 'Email is required';
        } else if (!validateEmail(contact.email)) {
          contactError.email = 'Invalid email format';
        }
        if (!contact.relationship?.trim())
          contactError.relationship = 'Relationship is required';
        return Object.keys(contactError).length ? contactError : undefined;
      })
      .filter((error): error is ContactErrors => error !== undefined);

    if (contactErrors.length) errors.emergencyContact = contactErrors;
    if (contactErrors.length === 0) delete errors.emergencyContactRequired;
  }

  return errors;
};

export interface PersonalInfoValidationErrors {
  [key: string]: string | ContactErrors | ContactErrors[] | undefined;
  firstName?: string;
  lastName?: string;
  email?: string;
  SSN?: string;
  dob?: string;
  cell?: string;
  work?: string;
  streetName?: string;
  buildingNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  residencyStatus?: string;
  visaType?: string;
  otherVisaTitle?: string;
  startDate?: string;
  endDate?: string;
  hasLicense?: string;
  number?: string;
  expirationDate?: string;
  reference?: ContactErrors;
  emergencyContact?: ContactErrors[];
}

export const validatePersonalInfo = (
  data: PersonalInfo
): PersonalInfoValidationErrors => {
  const errors: PersonalInfoValidationErrors = {};

  // basic Information
  if (!data.firstName?.trim()) errors.firstName = 'First name is required';
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (!data.SSN) {
    errors.SSN = 'SSN is required';
  } else if (!validateSSN(data.SSN.toString())) {
    errors.SSN = 'Invalid SSN format';
  }
  if (!data.dob) errors.dob = 'Date of birth is required';

  // contact
  if (!data.cell?.trim()) {
    errors.cell = 'Cell phone is required';
  } else if (!validatePhone(data.cell)) {
    errors.cell = 'Invalid phone format';
  }
  if (data.work?.trim() && !validatePhone(data.work)) {
    errors.work = 'Invalid phone format';
  }

  // address
  if (!data.buildingNumber?.trim())
    errors.buildingNumber = 'Building number is required';
  if (!data.streetName?.trim()) errors.streetName = 'Street name is required';
  if (!data.city?.trim()) errors.city = 'City is required';
  if (!data.state?.trim()) errors.state = 'State is required';
  if (!data.zipCode?.trim()) {
    errors.zipCode = 'ZIP code is required';
  } else if (!validateZipCode(data.zipCode)) {
    errors.zipCode = 'Invalid ZIP code format';
  }

  // employment
  if (!data.residencyStatus) {
    errors.residencyStatus = 'Residency status is required';
  } else if (data.residencyStatus === 'nonresident') {
    if (!data.visaType) {
      errors.visaType = 'Visa type is required';
    }
    if (data.visaType === 'Other' && !data.otherVisaTitle?.trim()) {
      errors.otherVisaTitle = 'Please specify visa type';
    }
    if (!data.startDate) errors.startDate = 'Start date is required';
    if (!data.endDate) errors.endDate = 'End date is required';
    if (
      data.startDate &&
      data.endDate &&
      new Date(data.startDate) >= new Date(data.endDate)
    ) {
      errors.startDate = 'Start date must be earlier than end date';
      errors.endDate = 'End date must be later than start date';
    }
  }

  // license
  if (data.hasLicense === 'yes') {
    if (!data.number?.trim()) errors.number = 'License number is required';
    if (!data.expirationDate)
      errors.expirationDate = 'Expiration date is required';
  }

  // emergency contact
  if (!data.emergencyContact?.length) {
    errors.emergencyContact = [
      { firstName: 'At least one emergency contact is required' }
    ];
  } else {
    const contactErrors = data.emergencyContact
      .map((contact) => {
        const contactError: ContactErrors = {};
        if (!contact.firstName?.trim())
          contactError.firstName = 'First name is required';
        if (!contact.lastName?.trim())
          contactError.lastName = 'Last name is required';
        if (!contact.phone?.trim()) {
          contactError.phone = 'Phone is required';
        } else if (!validatePhone(contact.phone)) {
          contactError.phone = 'Invalid phone format';
        }
        if (!contact.email?.trim()) {
          contactError.email = 'Email is required';
        } else if (!validateEmail(contact.email)) {
          contactError.email = 'Invalid email format';
        }
        if (!contact.relationship?.trim())
          contactError.relationship = 'Relationship is required';
        return Object.keys(contactError).length ? contactError : undefined;
      })
      .filter((error): error is ContactErrors => error !== undefined);

    if (contactErrors.length) errors.emergencyContact = contactErrors;
    if (contactErrors.length === 0) delete errors.emergencyContactRequired;
  }

  return errors;
};
