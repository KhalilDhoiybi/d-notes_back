import {
  index,
  modelOptions,
  prop,
  Severity,
  pre,
  DocumentType,
  getModelForClass,
} from '@typegoose/typegoose';
import { nanoid } from 'nanoid';
import argon2 from 'argon2';
import log from '../../utils/logger';

// Pre-Save func to crypt password if modified
@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
// Indexing email
@index({ email: 1 })
// Allow mixed types value and timestamps
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
// User Class
export class User {
  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordRestCode: string | null;

  @prop({ default: false })
  verified: boolean;

  // Validate Password Method
  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      log.error(e, 'Could not validate password');
      return;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
