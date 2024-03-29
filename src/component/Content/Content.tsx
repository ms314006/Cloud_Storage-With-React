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
import { changeCurrentFolder, chageFilterWord } from '../../action/cloudStorage';
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
  const { files, currentFolder, filterWord, } = useSelector(state => state);
  const { match: { params: { routeType, }, }, } = props;
  const renderHeaderTitle = (route: string, folder: IFolder) => {
    switch (route) {
      case 'starred':
        return '已加星號';
      case 'share-with-me':
        return '與我共享';
      default:
        return folder.getFolderPath().map(
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
        );
    }
  };

  const getRenderFolders = (route: string): IFolder[] => {
    const { folders, starredFolders, sharedFolders } = useSelector(state => state);
    switch (route) {
      case 'starred':
        return starredFolders;
      case 'share-with-me':
        return sharedFolders;
      default:
        return folders;
    }
  };

  const getRenderFiles = (route: string): IFile[] => {
    const { files, starredFiles, sharedFiles } = useSelector(state => state);
    switch (route) {
      case 'starred':
        return starredFiles;
      case 'share-with-me':
        return sharedFiles;
      default:
        return files;
    }
  };

  return (
    <div className={styles.contentBlock}>
      <div className={styles.contentHeader}>
        <div>
          {renderHeaderTitle(routeType, currentFolder)}
        </div>
        <div>
          <TextField
            InputProps={{
              disableUnderline: true,
              placeholder: '搜尋您的檔案',
              value: filterWord,
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
            onChange={(event) => {
              dispatch(chageFilterWord(event.target.value));
            }}
          />
        </div>
      </div>
      <div className={styles.content}>
        資料夾
        <div className={styles.listBlock}>
          {
            getRenderFolders(routeType)
              .filter((folder: IFolder) => (
                filterWord === ''
                || folder.name.indexOf(filterWord) !== -1
              ))
              .map((folder: IFolder) => (
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
            getRenderFiles(routeType)
              .filter((file: IFile) => (
                filterWord === ''
                || file.name.indexOf(filterWord) !== -1
              ))
              .map((file: IFile) => (
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
