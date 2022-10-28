import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import { createNoteHandler } from './note.controller';
import { createNoteSchema } from './note.schema';

const router = express.Router();

// Create Note Route
router.post(
  '/create/:folderId',
  validateResource(createNoteSchema),
  requireUser,
  createNoteHandler
);

export default router;
