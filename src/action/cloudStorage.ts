import { IFolder } from '../interface/IFolder';
import { IFile } from '../interface/IFile';

export const UPLOAD_FILE_ING = 'UPLOAD_FILE_ING';

export const upladFileIng = () => ({
  type: UPLOAD_FILE_ING,
});

export const UPLOAD_FILE = 'UPLOAD_FILE';

export const uploadFile = (name: string, base64: string) => ({
  type: UPLOAD_FILE,
  payload: {
    name,
    base64,
  },
});

export const CREATE_FOLDER = 'CREATE_FOLDER';

export const createFolder = (name: string) => ({
  type: CREATE_FOLDER,
  payload: {
    name,
  },
});

export const DROP_FILE = 'DROP_FILE';

export const dropFile = (file: IFolder | IFile, fileType: string) => ({
  type: DROP_FILE,
  payload: {
    file,
    fileType,
  },
});

export const CHANGE_CURRENT_FOLDER = 'CHANGE_CURRENT_FOLDER';

export const changeCurrentFolder = (folder: IFolder) => ({
  type: CHANGE_CURRENT_FOLDER,
  payload: {
    folder,
  },
});

export const SWITCH_IMPORTANCE = 'SWITCH_IMPORTANCE';

export const switchImportance = (file: IFolder | IFile) => ({
  type: SWITCH_IMPORTANCE,
  payload: {
    file,
  },
});

export const SWITCH_SHARE = 'SWITCH_SHARE';

export const switchShare = (file: IFolder | IFile) => ({
  type: SWITCH_SHARE,
  payload: {
    file,
  },
});
