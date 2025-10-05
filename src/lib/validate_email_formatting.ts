/**
 * Validates email format using a comprehensive regex pattern
 * @param email - The email string to validate
 * @returns boolean - true if email format is valid, false otherwise
 */
export const validateEmailFormat = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Comprehensive email regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(email.trim());
};

/**
 * Validates if all required form fields are filled
 * @param fields - Object containing form field values
 * @returns object with isValid boolean and missing fields array
 */
export const validateRequiredFields = (fields: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; missingFields: string[] } => {
  const missingFields: string[] = [];
  
  if (!fields.firstName?.trim()) missingFields.push('First Name');
  if (!fields.lastName?.trim()) missingFields.push('Last Name');
  if (!fields.email?.trim()) missingFields.push('Email');
  if (!fields.subject?.trim()) missingFields.push('Subject');
  if (!fields.message?.trim()) missingFields.push('Message');
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};