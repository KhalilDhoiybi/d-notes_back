import FolderModel, { Folder } from './folder.model';

// Create New Folder Service
export function createFolder(input: Partial<Folder>) {
  return FolderModel.create(input);
}
// Get Folders Service
export function getFolders(userId: string) {
  return FolderModel.find({ user: userId });
}
