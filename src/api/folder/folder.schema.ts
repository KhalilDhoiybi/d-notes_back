import { object, string, TypeOf } from 'zod';

// Create New Folder Schema
export const createFolderSchema = object({
  body: object({
    folderName: string({
      required_error: 'Folder name is required',
    }),
  }),
});

export type CreateFolderInput = TypeOf<typeof createFolderSchema>['body'];
