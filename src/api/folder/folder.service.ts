import FolderModel, { Folder } from './folder.model';

// Create New Folder Service
export function createFolder(input: Partial<Folder>) {
  return FolderModel.create(input);
}
