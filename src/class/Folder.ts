import uuid from 'uuid/v1';
import { IFolder } from '../interface/IFolder';
import { IFile } from '../interface/IFile';

class Folder implements IFolder {
    id: string = uuid();

    name: string;

    currentFolder: IFolder | null;

    folders: IFolder[] = [];

    files: IFile[] = [];

    importance: boolean = false;

    share: boolean = false;

    constructor(name: string, folder: IFolder | null) {
      this.name = name;
      this.currentFolder = folder || null;
    }

    addFile = (file: IFile) => {
      this.files.push(file);
    }

    subFile = (file: IFile) => {
      this.files.splice(this.files.indexOf(file), 1);
    }

    addFolder = (folder: IFolder) => {
      this.folders.push(folder);
    }

    subFolder = (folder: IFolder) => {
      this.folders.splice(this.folders.indexOf(folder), 1);
    }

    rename = (name: string) => {
      this.name = name;
    }

    getFolderPath = () => {
      const result: IFolder[] = [this];
      let parentFolder = this.currentFolder;
      while (parentFolder !== null) {
        result.push(parentFolder);
        parentFolder = parentFolder.currentFolder;
      }
      return result.reverse();
    }

    getTagedFolders = (tagType: string) => {
      const result: IFolder[] = [];
      const findStarredWithFolder = (folder: IFolder) => {
        folder.folders.forEach((aFolder: IFolder) => {
          if (aFolder[tagType]) {
            result.push(aFolder);
          }
          if (aFolder.folders.length > 0) {
            findStarredWithFolder(aFolder);
          }
        });
      };
      findStarredWithFolder(this);
      return result;
    }

    getTagedFiles= (tagType: string) => {
      const result: IFile[] = [];
      const findStarredWithFile = (folder: IFolder) => {
        folder.files.forEach((aFile: IFolder) => {
          if (aFile[tagType]) {
            result.push(aFile);
          }
        });
        folder.folders.forEach((aFolder: IFolder) => {
          findStarredWithFile(aFolder);
        });
      };
      findStarredWithFile(this);
      return result;
    }

    switchImportance = () => { this.importance = !this.importance; };

    switchShare = () => { this.share = !this.share; };
}

export default Folder;
