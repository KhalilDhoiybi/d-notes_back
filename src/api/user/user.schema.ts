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

// Create New User Input Type
export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
// Verify User Account Input Type
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
