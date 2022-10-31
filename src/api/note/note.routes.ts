import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import {
  createNoteHandler,
  deleteNoteHandler,
  getNotesHandler,
  updateNoteHandler,
} from './note.controller';
import {
  createNoteSchema,
  deleteNoteSchema,
  getNotesSchema,
  updateNoteSchema,
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
// Update Note Content Route
router.put(
  '/update/:noteId',
  validateResource(updateNoteSchema),
  requireUser,
  updateNoteHandler
);

export default router;
