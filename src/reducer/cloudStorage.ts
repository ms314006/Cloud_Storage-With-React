import * as actions from '../action/cloudStorage';
import File from '../class/File';
import IFile from '../interface/IFile';

interface IState {
  fileUploading: boolean;
  files: IFile[];
}

const initState: IState = {
  fileUploading: false,
  files: [],
};

const cloudStorageReducer = (state = initState, action: any) => {
  switch (action.type) {
    case actions.UPLOAD_FILE_ING:
      return {
        ...state,
        fileUploading: true,
      };
    case actions.UPLOAD_FILE:
      return {
        ...state,
        files: [
          ...state.files,
          new File(action.payload.name, action.payload.base64, '')
        ],
        fileUploading: false,
      };
    default:
      return state;
  }
};

export default cloudStorageReducer;
