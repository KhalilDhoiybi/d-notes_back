import { Request, Response } from 'express';
import { CreateFolderInput, DeleteFolderInput } from './folder.schema';
import { createFolder, findFolderById, getFolders } from './folder.service';

// Create New Folder Handler
export async function createFolderHandler(
  req: Request<{}, {}, CreateFolderInput>,
  res: Response
) {
  const { folderName } = req.body;
  const userId = res.locals.user._id;

  try {
    const folder = await createFolder({ user: userId, folderName });
    res.send(folder);
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Folder already exists');
    }
    return res.status(500).send(e);
  }
}
// Get Folders Handler
export async function getFoldersHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const folders = await getFolders(userId);
    return res.send(folders);
  } catch (e) {
    return res.status(500).send(e);
  }
}
// Delete Folder Handler
export async function deleteFolderHandler(
  req: Request<DeleteFolderInput>,
  res: Response
) {
  const userId = res.locals.user._id;
  const { id } = req.params;
  const folder = await findFolderById(id);

  if (!folder) {
    return res.status(404).send('Folder not found');
  }
  if (userId !== String(folder.user)) {
    return res.sendStatus(403);
  }
  try {
    await folder.remove();
    return res.send('Folder has been removed');
  } catch (e) {
    return res.status(500).send(e);
  }
}
