import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Folder from './Folder';
import File from './File';
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
  const folders = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'];
  const files = [
    { name: 'Week1', type: 'jpg', path: 'https://images.unsplash.com/photo-1529288619019-492bd08e0ab9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', },
    { name: 'Week4', type: 'jpg', path: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1496&q=80', },
    { name: 'Week5', type: 'jpg', path: 'https://images.unsplash.com/photo-1520532622976-1bdf3b7a5af9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=754&q=80', },
    { name: 'Week6', type: 'jpg', path: 'https://images.unsplash.com/photo-1513302052104-b818ed7324b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', },
    { name: 'Week7', type: 'jpg', path: 'https://images.unsplash.com/photo-1442328166075-47fe7153c128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', }
  ];
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
            files.map(file => <File key={file.path} {...file} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Content;
