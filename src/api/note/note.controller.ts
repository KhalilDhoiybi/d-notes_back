import { Request, Response } from 'express';
import { findFolderById } from '../folder/folder.service';
import { CreateNoteInput, GetNotesInput } from './note.schema';
import { createNote, getNotes } from './note.service';

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
    return res.sendStatus(404);
  }
  if (userId !== String(folder.user)) {
    return res.sendStatus(403);
  }
  try {
    const note = await createNote({
      folder: folder._id,
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
    return res.sendStatus(404);
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
