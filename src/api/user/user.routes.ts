import express from 'express';
import validateResource from '../../middleware/validateResource';
import { createUserHandler } from './user.controller';
import { createUserSchema } from './user.schema';

const router = express.Router();

// Create New User / Register Route
router.post('/register', validateResource(createUserSchema), createUserHandler);

export default router;
