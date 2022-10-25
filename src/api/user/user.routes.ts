import express from 'express';
import validateResource from '../../middleware/validateResource';
import {
  createUserHandler,
  forgotPasswordHandler,
  verifyUserHandler,
} from './user.controller';
import {
  createUserSchema,
  forgotPasswordSchema,
  verifyUserSchema,
} from './user.schema';

const router = express.Router();

// Create New User / Register Route
router.post('/register', validateResource(createUserSchema), createUserHandler);
// Verify User Account Route
router.post(
  '/verify/:id/:verificationCode',
  validateResource(verifyUserSchema),
  verifyUserHandler
);
// Forgot Password Route
router.post(
  '/forgotpassword',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

export default router;
