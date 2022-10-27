import express from 'express';
import requireUser from '../../middleware/requireUser';
import validateResource from '../../middleware/validateResource';
import { createFolderHandler } from './folder.controller';
import { createFolderSchema } from './folder.schema';

const router = express.Router();

// Post Folder Route
router.post(
  '/',
  validateResource(createFolderSchema),
  requireUser,
  createFolderHandler
);

export default router;
