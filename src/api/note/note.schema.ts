import { object, string, TypeOf } from 'zod';
import IsValid from '../../helpers/validateId';

// Create New Note Schema
export const createNoteSchema = object({
  params: object({
    folderId: string(),
  }).refine((data) => IsValid(data.folderId), {
    message: 'Not Valid folder id',
    path: ['folderId'],
  }),
  body: object({
    noteTitle: string({
      required_error: 'Title is required',
    }),
    noteContent: string({
      required_error: 'Content is required',
    }),
  }),
});

// Create Note Input Type
export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
