import { PersonalInfo } from '../types/PersonalInfo';

interface EmergencyContactErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  relationship?: string;
}

export interface ValidationErrors {
  name?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
  SSN?: string;
  dob?: string;
  phone?: {
    cell?: string;
    work?: string;
  };
  address?: {
    streetName?: string;
    buildingNumber?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  employment?: {
    residencyStatus?: string;
    visaType?: string;
    startDate?: string;
    endDate?: string;
  };
  driversLicense?: {
    hasLicense?: string;
    number?: string;
    expirationDate?: string;
  };
  emergencyContacts?: (EmergencyContactErrors | undefined)[];
}

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
};

export const validateSSN = (ssn: string): boolean => {
  return /^\d{9}$/.test(ssn.replace(/\D/g, ''));
};

export const validateZipCode = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

export const validatePersonalInfo = (data: PersonalInfo): ValidationErrors => {
  const errors: ValidationErrors = {};

  // name validations
  if (!data.name.firstName?.trim()) {
    errors.name = { ...errors.name, firstName: 'First name is required' };
  }
  if (!data.name.lastName?.trim()) {
    errors.name = { ...errors.name, lastName: 'Last name is required' };
  }

  // email validation
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  // SSN validation
  if (!data.SSN?.trim()) {
    errors.SSN = 'SSN is required';
  } else if (!validateSSN(data.SSN)) {
    errors.SSN = 'Invalid SSN format (9 digits required)';
  }

  // dob validation
  if (!data.dob) {
    errors.dob = 'Date of birth is required';
  }

  // cell phone validation
  if (!data.phone.cell?.trim()) {
    errors.phone = { ...errors.phone, cell: 'Cell phone is required' };
  } else if (!validatePhone(data.phone.cell)) {
    errors.phone = {
      ...errors.phone,
      cell: 'Invalid phone format (10 digits required)'
    };
  }

  // work phone validation
  if (data.phone.work?.trim()) {
    if (!validatePhone(data.phone.work)) {
      errors.phone = {
        ...errors.phone,
        work: 'Invalid phone format (10 digits required)'
      };
    }
  }

  // address validation
  if (!data.address.streetName?.trim()) {
    errors.address = {
      ...errors.address,
      streetName: 'Street name is required'
    };
  }
  if (!data.address.buildingNumber?.trim()) {
    errors.address = {
      ...errors.address,
      buildingNumber: 'Building/Apt number is required'
    };
  }
  if (!data.address.city?.trim()) {
    errors.address = { ...errors.address, city: 'City is required' };
  }
  if (!data.address.state?.trim()) {
    errors.address = { ...errors.address, state: 'State is required' };
  }
  if (!data.address.zipCode?.trim()) {
    errors.address = { ...errors.address, zipCode: 'ZIP code is required' };
  } else if (!validateZipCode(data.address.zipCode)) {
    errors.address = { ...errors.address, zipCode: 'Invalid ZIP code format' };
  }

  // employment validation
  if (!data.employment?.residencyStatus) {
    errors.employment = {
      ...errors.employment,
      residencyStatus: 'Residency status is required'
    };
  }

  // if non-resident, visa type validation
  if (data.employment?.residencyStatus === 'nonresident') {
    if (!data.employment.visaType) {
      errors.employment = {
        ...errors.employment,
        visaType: 'Visa type is required for non-residents'
      };
    }
    if (!data.employment.startDate || !data.employment.endDate) {
      errors.employment = {
        ...errors.employment,
        startDate: !data.employment.startDate
          ? 'Start date is required'
          : undefined,
        endDate: !data.employment.endDate ? 'End date is required' : undefined
      };
    }
    if (data.employment.startDate && data.employment.endDate) {
      const startDate = new Date(data.employment.startDate);
      const endDate = new Date(data.employment.endDate);
      
      if (startDate >= endDate) {
        errors.employment = {
          ...errors.employment,
          startDate: 'Start date must be earlier than end date',
          endDate: 'End date must be later than start date'
        };
      }
    }
  }

  // drivers license validation
  if (data.driversLicense?.hasLicense) {
    if (!data.driversLicense.number?.trim()) {
      errors.driversLicense = {
        ...errors.driversLicense,
        number: 'License number is required'
      };
    }
    if (!data.driversLicense.expirationDate) {
      errors.driversLicense = {
        ...errors.driversLicense,
        expirationDate: 'License expiration date is required'
      };
    }
  }

  // emergency contacts validation
  if (data.emergencyContacts.length === 0) {
    errors.emergencyContacts = [
      { firstName: 'At least one emergency contact is required' }
    ];
  } else {
    errors.emergencyContacts = data.emergencyContacts.map((contact) => {
      const contactErrors: EmergencyContactErrors = {};
      if (!contact.firstName?.trim())
        contactErrors.firstName = 'First name is required';
      if (!contact.phone?.trim()) {
        contactErrors.phone = 'Phone is required';
      } else if (!validatePhone(contact.phone)) {
        contactErrors.phone = 'Invalid phone format';
      }
      if (!contact.relationship?.trim())
        contactErrors.relationship = 'Relationship is required';
      return Object.keys(contactErrors).length ? contactErrors : undefined;
    });
    if (errors.emergencyContacts.every((e) => e === undefined)) {
      delete errors.emergencyContacts;
    }
  }

  return errors;
};
