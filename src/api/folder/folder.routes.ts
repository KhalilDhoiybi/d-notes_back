import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import {
  createFolderHandler,
  deleteFolderHandler,
  getFoldersHandler,
} from './folder.controller';
import { createFolderSchema, deleteFolderSchema } from './folder.schema';

const router = express.Router();

// Create Folder Route
router.post(
  '/',
  validateResource(createFolderSchema),
  requireUser,
  createFolderHandler
);
// Get all User Folders
router.get('/', requireUser, getFoldersHandler);
// Delete Folder Route
router.delete(
  '/:id',
  validateResource(deleteFolderSchema),
  requireUser,
  deleteFolderHandler
);

export default router;
