import mongoose from 'mongoose';
import { object, string, TypeOf } from 'zod';

// IsValid Id func
const IsValid = (id: string) => {
  try {
    const objId = new mongoose.Types.ObjectId(id).toString();
    return objId === id;
  } catch (e) {
    return false;
  }
};
// Create New User Schema
export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    password: string({
      required_error: 'First Name is required',
    }).min(6, 'Password is too short - should be at least 6 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password not match',
    path: ['passwordConfirmation'],
  }),
});
// Verify User Account Schema
export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }).refine((data) => IsValid(data.id), {
    message: 'Not Valid id',
    path: ['id'],
  }),
});
// Forgot Password Request Schema
export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not valid email'),
  }),
});
// Reset User Password Schema
export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordRestCode: string(),
  }).refine((data) => IsValid(data.id), {
    message: 'Not Valid id',
    path: ['id'],
  }),
  body: object({
    password: string({
      required_error: 'First Name is required',
    }).min(6, 'Password is too short - should be at least 6 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password not match',
    path: ['passwordConfirmation'],
  }),
});

// Create New User Input Type
export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
// Verify User Account Input Type
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
// Forgot Password Input Type
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
// Reset Password Input Type
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
