import { Request, Response } from 'express';
import { findFolderById } from '../folder/folder.service';
import {
  CreateNoteInput,
  DeleteNoteInput,
  GetNotesInput,
  UpdateNoteContentInput,
  UpdateNoteTitleInput,
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
// Update Note Tile Hnadler
export async function updateNoteTitleHandler(
  req: Request<
    UpdateNoteTitleInput['params'],
    {},
    UpdateNoteTitleInput['body']
  >,
  res: Response
) {
  const { noteId } = req.params;
  const { noteTitle } = req.body;
  const userId = res.locals.user._id;
  const note = await findNoteById(noteId);

  if (!note) {
    return res.status(404).send('Note not found');
  }
  if (userId !== String(note.user)) {
    return res.sendStatus(403);
  }
  try {
    note.noteTitle = noteTitle;
    await note.save();
    return res.send('Note title has been updated');
  } catch (e) {
    return res.status(500).send(e);
  }
}
// Update Note Tile Hnadler
export async function updateNoteContentHandler(
  req: Request<
    UpdateNoteContentInput['params'],
    {},
    UpdateNoteContentInput['body']
  >,
  res: Response
) {
  const { noteId } = req.params;
  const { noteContent } = req.body;
  const userId = res.locals.user._id;
  const note = await findNoteById(noteId);

  if (!note) {
    return res.status(404).send('Note not found');
  }
  if (userId !== String(note.user)) {
    return res.sendStatus(403);
  }
  try {
    note.noteContent = noteContent;
    await note.save();
    return res.send('Note content has been updated');
  } catch (e) {
    return res.status(500).send(e);
  }
}
