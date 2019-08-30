import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Folder from './Folder';
import File from './File';
import IFile from '../../interface/IFile';
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
  const { files, } = useSelector(state => state);
  const folders = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'];
  return (
    <div className={styles.contentBlock}>
      <div className={styles.contentHeader}>
        <div>我的雲端硬碟</div>
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
            folders.map(name => <Folder key={name} name={name} />)
          }
        </div>
      </div>
      <div className={styles.content}>
        檔案
        <div className={styles.listBlock}>
          {
            files.map((file: IFile) => <File key={file.id} file={file} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Content;
