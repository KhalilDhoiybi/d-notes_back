import NoteModel, { Note } from './note.model';

// Create New Note Service
export function createNote(input: Partial<Note>) {
  return NoteModel.create(input);
}
// Get Notes Service
export function getNotes(folder: string) {
  return NoteModel.find({ folder });
}
