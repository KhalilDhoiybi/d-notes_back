import { Request, Response } from 'express';
import { findFolderById } from '../folder/folder.service';
import {
  CreateNoteInput,
  DeleteNoteInput,
  GetNotesInput,
  UpdateNoteInput,
} from './note.schema';
import { createNote, findNoteById, getNotes } from './note.service';

// Create Note Handler
export async function createNoteHandler(
  req: Request<CreateNoteInput['params'], {}, CreateNoteInput['body']>,
  res: Response
) {
  const { folderId } = req.params;
  const { noteTitle, noteContent } = req.body;
  const userId = res.locals.user._id;
  const folder = await findFolderById(folderId);

  if (!folder) {
    return res.status(404).send('Folder not found');
  }
  if (userId !== String(folder.user)) {
    return res.sendStatus(403);
  }
  try {
    const note = await createNote({
      folder: folder._id,
      user: userId,
      noteTitle,
      noteContent,
    });
    return res.send(note);
  } catch (e) {
    return res.status(500).send(e);
  }
}
// Get Notes Handler
export async function getNotesHandler(
  req: Request<GetNotesInput>,
  res: Response
) {
  const { folderId } = req.params;
  const userId = res.locals.user._id;
  const folder = await findFolderById(folderId);

  if (!folder) {
    return res.status(404).send('Folder not found');
  }
  if (userId !== String(folder.user)) {
    return res.sendStatus(403);
  }

  try {
    const notes = await getNotes(folderId);
    res.send(notes);
  } catch (e) {
    return res.status(500).send(e);
  }
}
// Delete Note Handler
export async function deleteNoteHandler(
  req: Request<DeleteNoteInput>,
  res: Response
) {
  const { noteId } = req.params;
  const note = await findNoteById(noteId);
  const userId = res.locals.user._id;

  if (!note) {
    return res.status(404).send('Note not found');
  }
  if (userId !== String(note.user)) {
    return res.sendStatus(403);
  }
  try {
    await note.remove();
    return res.send('Note has been removed');
  } catch (e) {
    return res.status(500).send(e);
  }
}
// Update Note Handler
export async function updateNoteHandler(
  req: Request<UpdateNoteInput['params'], {}, UpdateNoteInput['body']>,
  res: Response
) {
  const { noteId } = req.params;
  const { noteTitle, noteContent } = req.body;
  const userId = res.locals.user._id;
  const note = await findNoteById(noteId);

  if (!note) {
    return res.status(404).send('Note not found');
  }
  if (userId !== String(note.user)) {
    return res.sendStatus(403);
  }
  try {
    if (noteTitle) {
      note.noteTitle = noteTitle;
    }
    if (noteContent) {
      note.noteContent = noteContent;
    }
    await note.save();
    return res.send('Note has been updated');
  } catch (e) {
    return res.status(500).send(e);
  }
}
