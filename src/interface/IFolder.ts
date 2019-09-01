import { IFile } from '../interface/IFile';

export interface IFolder {
  id: string;
  name: string;
  currentFolder: IFolder | null;
  folders: IFolder[];
  files: IFile[];
  importance: boolean;
  share: boolean;
  addFile: (file: IFile) => void;
  subFile: (file: IFile) => void;
  addFolder: (folder: IFolder) => void;
  subFolder: (folder: IFolder) => void;
  rename: (name: string) => void;
  getFolderPath: () => IFolder[];
  getTagedFolders: (tagType: string) => IFolder[];
  getTagedFiles: (tagType: string) => IFile[];
  switchImportance: () => void;
  switchShare: () => void;
}
