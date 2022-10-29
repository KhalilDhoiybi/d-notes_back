import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import { createNoteHandler, getNotesHandler } from './note.controller';
import { createNoteSchema, getNotesSchema } from './note.schema';

const router = express.Router();

// Create Note Route
router.post(
  '/create/:folderId',
  validateResource(createNoteSchema),
  requireUser,
  createNoteHandler
);
// Get Notes Route
router.get(
  '/all/:folderId',
  validateResource(getNotesSchema),
  requireUser,
  getNotesHandler
);

export default router;
