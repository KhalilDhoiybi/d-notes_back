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
// Get Notes Schema
export const getNotesSchema = object({
  params: object({
    folderId: string(),
  }).refine((data) => IsValid(data.folderId), {
    message: 'Not Valid folder id',
    path: ['folderId'],
  }),
});
// Delete Note Schema
export const deleteNoteSchema = object({
  params: object({
    noteId: string(),
  }).refine((data) => IsValid(data.noteId), {
    message: 'Not Valid folder id',
    path: ['folderId'],
  }),
});
// Update Note Schema
export const updateNoteSchema = object({
  params: object({
    noteId: string(),
  }).refine((data) => IsValid(data.noteId), {
    message: 'Not Valid note id',
    path: ['folderId'],
  }),
  body: object({
    noteTitle: string().optional(),
    noteContent: string().optional(),
  }).refine((data) => data.noteTitle || data.noteContent, {
    message: 'New title or content is required',
    path: ['noteTitle', 'noteContent'],
  }),
});

// Create Note Input Type
export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
// Get Notes Input Type
export type GetNotesInput = TypeOf<typeof getNotesSchema>['params'];
// Delete Note Input Type
export type DeleteNoteInput = TypeOf<typeof deleteNoteSchema>['params'];
// Update Note Input Type
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>;
