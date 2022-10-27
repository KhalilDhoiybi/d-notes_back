import { Request, Response } from 'express';
import { CreateFolderInput } from './folder.schema';
import { createFolder } from './folder.service';

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
