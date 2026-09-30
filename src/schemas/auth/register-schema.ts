import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),

  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),

  lastName: yup
    .string()
    .trim()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;