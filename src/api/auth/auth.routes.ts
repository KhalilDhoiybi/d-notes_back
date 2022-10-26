import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import { createSessionHandler, deleteSessionHandler } from './auth.controller';
import { createSessionSchema } from './auth.schema';

const router = express.Router();

// CreateSession/Login Route
router.post(
  '/login',
  validateResource(createSessionSchema),
  createSessionHandler
);
// DeleteSession/Logout Route
router.delete('/logout', requireUser, deleteSessionHandler);

export default router;
