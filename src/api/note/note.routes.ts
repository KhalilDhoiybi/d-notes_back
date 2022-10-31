import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import {
  createNoteHandler,
  deleteNoteHandler,
  getNotesHandler,
  updateNoteTitleHandler,
} from './note.controller';
import {
  createNoteSchema,
  deleteNoteSchema,
  getNotesSchema,
  updateNoteTitleSchema,
} from './note.schema';

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
// Delete Note Route
router.delete(
  '/remove/:noteId',
  validateResource(deleteNoteSchema),
  requireUser,
  deleteNoteHandler
);
// Update Note Title Route
router.put(
  '/update/title/:noteId',
  validateResource(updateNoteTitleSchema),
  requireUser,
  updateNoteTitleHandler
);

export default router;
