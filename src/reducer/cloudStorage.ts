import * as actions from '../action/cloudStorage';
import File from '../class/File';
import Folder from '../class/Folder';
import { IFile } from '../interface/IFile';
import { IFolder } from '../interface/IFolder';

interface IState {
  fileUploading: boolean;
  files: IFile[];
  folders: IFolder[];
  currentFolder: IFolder;
}

const root = new Folder('', null);

const initState: IState = {
  fileUploading: false,
  files: [],
  folders: [],
  currentFolder: root,
};

const cloudStorageReducer = (state = initState, action: any) => {
  const updateCloudStorageState = () => ({
    ...state,
    files: [...state.currentFolder.files],
    folders: [...state.currentFolder.folders],
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
    default:
      return state;
  }
};

export default cloudStorageReducer;
