import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import {
  createFolderHandler,
  deleteFolderHandler,
  getFoldersHandler,
  updateFolderNameHandler,
} from './folder.controller';
import {
  createFolderSchema,
  deleteFolderSchema,
  updateFolderNameSchema,
} from './folder.schema';

const router = express.Router();

// Create Folder Route
router.post(
  '/create',
  validateResource(createFolderSchema),
  requireUser,
  createFolderHandler
);
// Get all User Folders Route
router.get('/all', requireUser, getFoldersHandler);
// Delete Folder Route
router.delete(
  '/remove/:folderId',
  validateResource(deleteFolderSchema),
  requireUser,
  deleteFolderHandler
);
// Update Folder Name Route
router.put(
  '/update/:folderId',
  validateResource(updateFolderNameSchema),
  requireUser,
  updateFolderNameHandler
);

export default router;
