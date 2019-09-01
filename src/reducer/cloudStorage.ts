import * as actions from '../action/cloudStorage';
import File from '../class/File';
import Folder from '../class/Folder';
import { IFile } from '../interface/IFile';
import { IFolder } from '../interface/IFolder';

interface IState {
  fileUploading: boolean;
  files: IFile[];
  folders: IFolder[];
  starredFiles: IFile[];
  starredFolders: IFolder[];
  currentFolder: IFolder;
}

const root = new Folder('', null);

const initState: IState = {
  fileUploading: false,
  files: [],
  folders: [],
  starredFiles: [],
  starredFolders: [],
  sharedFiles: [],
  sharedFolders: [],
  currentFolder: root,
};

const cloudStorageReducer = (state = initState, action: any) => {
  const updateCloudStorageState = () => ({
    ...state,
    files: [...state.currentFolder.files],
    folders: [...state.currentFolder.folders],
    starredFolders: root.getTagedFolders('importance'),
    starredFiles: root.getTagedFiles('importance'),
    sharedFolders: root.getTagedFolders('share'),
    sharedFiles: root.getTagedFiles('share'),
  });
  switch (action.type) {
    case actions.UPLOAD_FILE_ING:
      return {
        ...state,
        fileUploading: true,
      };
    case actions.UPLOAD_FILE:
      state.currentFolder.addFile(new File(
        action.payload.name,
        action.payload.base64,
        state.currentFolder
      ));
      return {
        ...updateCloudStorageState(),
        fileUploading: false,
      };
    case actions.CREATE_FOLDER:
      state.currentFolder.addFolder(
        new Folder(action.payload.name, state.currentFolder)
      );
      return updateCloudStorageState();
    case actions.DROP_FILE:
      if (action.payload.fileType === 'file') {
        state.currentFolder.subFile(action.payload.file);
      } else {
        state.currentFolder.subFolder(action.payload.file);
      }
      return updateCloudStorageState();
    case actions.CHANGE_CURRENT_FOLDER:
      return {
        ...state,
        currentFolder: action.payload.folder,
        files: [...action.payload.folder.files],
        folders: [...action.payload.folder.folders],
      };
    case actions.SWITCH_IMPORTANCE:
      action.payload.file.switchImportance();
      return updateCloudStorageState();
    case actions.SWITCH_SHARE:
      action.payload.file.switchShare();
      return updateCloudStorageState();
    case actions.RENAME_FILE:
      action.payload.file.rename(action.payload.newName);
      return updateCloudStorageState();
    default:
      return state;
  }
};

export default cloudStorageReducer;
