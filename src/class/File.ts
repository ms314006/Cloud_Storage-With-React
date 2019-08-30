import uuid from 'uuid/v1';
import IFile from '../interface/IFile';

class File implements IFile {
  id: string = uuid();

  name: string;

  base64: string;

  currentFolder: string;

  constructor(
    name: string, base64: string, currentFolder: string
  ) {
    this.name = name;
    this.base64 = base64;
    this.currentFolder = currentFolder;
  }

  getFileType = () => this.name.slice(this.name.lastIndexOf('.') + 1);
}

export default File;
