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