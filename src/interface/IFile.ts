import { IFolder } from './IFolder';

export interface file {
  id: string;
  name: string;
  base64: string;
  currentFolder: IFolder;
  importance: boolean;
  share: boolean;
  getFileType: () => string;
  rename: () => void;
  switchImportance: () => void;
  switchShare: () => void;
}
