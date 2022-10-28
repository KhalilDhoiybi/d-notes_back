import { Request, Response } from 'express';
import { findFolderById } from '../folder/folder.service';
import { CreateNoteInput } from './note.schema';
import { createNote } from './note.service';

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
