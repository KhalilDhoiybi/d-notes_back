import UserModel, { User } from './user.model';

// Create New User Service
export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}
// Find User By Id
export function findUserById(id: string) {
  return UserModel.findById(id);
}
