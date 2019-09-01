import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FileTemplate from './FileTemplate';
import Folder from './Folder';
import File from './File';
import { IFile } from '../../interface/IFile';
import { IFolder } from '../../interface/IFolder';
import { changeCurrentFolder } from '../../action/cloudStorage';
import styles from './index.scss';

const useStyles = makeStyles({
  iCon: {
    color: '#ffffff',
  },
  searchInput: {
    width: '320px',
    color: '#6B6D72',
    border: '1px solid ##2F3136',
    borderRadius: '10px',
    padding: '0px 12px',
    background: '#2F3136',
  },
});

const Content = (props: any): JSX.Element => {
  const {} = props;
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { files, folders, currentFolder, } = useSelector(state => state);

  const getFolderPath = (folder: IFolder) => (
    folder.getFolderPath().map(
      (aFolder: IFolder) => {
        const folderName = aFolder.name === '' ? '我的雲端硬碟' : aFolder.name;
        return (
          <span
            key={aFolder.id}
            onKeyDown={() => {}}
            onClick={() => { dispatch(changeCurrentFolder(aFolder)); }}
            className={
              `${styles.folderPath}
               ${aFolder === currentFolder ? styles.currentFolderSpan : ''}`
            }
          >
            {aFolder.name !== ''
              ? <i className={`fas fa-caret-right ${styles.pathIcon}`} />
              : null}
            {folderName}
          </span>
        );
      }
    )
  );

  return (
    <div className={styles.contentBlock}>
      <div className={styles.contentHeader}>
        <div>
          {getFolderPath(currentFolder)}
        </div>
        <div>
          <TextField
            InputProps={{
              disableUnderline: true,
              placeholder: '搜尋您的檔案',
              classes: {
                root: classes.searchInput,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityIcon
                    classes={{ root: classes.iCon, }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className={styles.content}>
        資料夾
        <div className={styles.listBlock}>
          {
            folders.map((folder: IFolder) => (
              <FileTemplate
                key={folder.id}
                file={folder}
                fileType="folder"
              >
                <Folder folder={folder} />
              </FileTemplate>
            ))
          }
        </div>
      </div>
      <div className={styles.content}>
        檔案
        <div className={styles.listBlock}>
          {
            files.map((file: IFile) => (
              <FileTemplate
                key={file.id}
                file={file}
                fileType="file"
              >
                <File file={file} />
              </FileTemplate>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Content;
