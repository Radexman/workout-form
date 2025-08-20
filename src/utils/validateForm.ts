import type { FormData } from '../types';

export const validateForm = (formData: FormData) => {
  const errors: { [key: string]: string } = {};

  if (!formData.firstName) {
    errors.firstName = 'First name required';
  }

  if (!formData.lastName) {
    errors.lastName = 'Last name required';
  }

  if (!formData.email) {
    errors.email = 'Email required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please use correct formatting';
    }
  }

  if (!formData.age || formData.age < 8 || formData.age > 100) {
    errors.age = 'Age must be between 8 and 100';
  }

  if (!formData.photo) {
    errors.photo = 'Photo required';
  }

  return errors;
};
