import uuid from 'uuid/v1';
import { IFile } from '../interface/IFile';
import { IFolder } from '../interface/IFolder';

class File implements IFile {
  id: string = uuid();

  name: string;

  base64: string;

  currentFolder: IFolder;

  importance: boolean = false;

  constructor(
    name: string, base64: string, currentFolder: IFolder
  ) {
    this.name = name;
    this.base64 = base64;
    this.currentFolder = currentFolder;
  }

  getFileType = () => this.name.slice(this.name.lastIndexOf('.') + 1);

  rename = (name: string) => { this.name = name; };

  switchImportance = () => { this.importance = !this.importance; };
}

export default File;
