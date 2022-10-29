import { object, string, TypeOf } from 'zod';
import IsValid from '../../helpers/validateId';

// Create New Folder Schema
export const createFolderSchema = object({
  body: object({
    folderName: string({
      required_error: 'Folder name is required',
    }),
  }),
});
// Delete Folder Schema
export const deleteFolderSchema = object({
  params: object({
    folderId: string(),
  }).refine((data) => IsValid(data.folderId), {
    message: 'Not Valid id',
    path: ['id'],
  }),
});
// Update Folder Name
export const updateFolderNameSchema = object({
  params: object({
    folderId: string(),
  }).refine((data) => IsValid(data.folderId), {
    message: 'Not Valid id',
    path: ['id'],
  }),
  body: object({
    folderName: string({
      required_error: 'Folder name is required',
    }),
  }),
});

// Create Folder Input Type
export type CreateFolderInput = TypeOf<typeof createFolderSchema>['body'];
// Delete Folder Input Type
export type DeleteFolderInput = TypeOf<typeof deleteFolderSchema>['params'];
// Update Folder Name Input Type
export type UpdateFolderNameInput = TypeOf<typeof updateFolderNameSchema>;
