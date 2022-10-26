import express from 'express';
import validateResource from '../../middleware/validateResource';
import { createSessionHandler } from './auth.controller';
import { createSessionSchema } from './auth.schema';

const router = express.Router();

// CreateSession/Login Route
router.post(
  '/login',
  validateResource(createSessionSchema),
  createSessionHandler
);

export default router;
