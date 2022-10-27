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
    id: string(),
  }).refine((data) => IsValid(data.id), {
    message: 'Not Valid id',
    path: ['id'],
  }),
});

// Create Folder Input Type
export type CreateFolderInput = TypeOf<typeof createFolderSchema>['body'];
// Delete Folder Input Type
export type DeleteFolderInput = TypeOf<typeof deleteFolderSchema>['params'];
