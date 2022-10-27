import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import { createFolderHandler, getFoldersHandler } from './folder.controller';
import { createFolderSchema } from './folder.schema';

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

export default router;
