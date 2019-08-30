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
