import NoteModel, { Note } from './note.model';

// Create New Note Service
export function createNote(input: Partial<Note>) {
  return NoteModel.create(input);
}
