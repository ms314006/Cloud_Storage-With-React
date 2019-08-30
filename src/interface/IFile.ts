export interface file {
  id: string;
  name: string;
  base64: string;
  currentFolder: string;
  getFileType: () => string;
}
