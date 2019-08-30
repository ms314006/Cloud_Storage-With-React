import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { uploadFile, upladFileIng } from '../../action/cloudStorage';
import IFile from '../../interface/IFile';
import styles from './index.scss';

const useStyles = makeStyles({
  uploadBtn: {
    width: '220px',
    height: '52px',
    background: '#FFD46E',
    fontSize: '16px',
    color: '#25272C',
    boxShadow: '0px 0px',
    borderRadius: '50px 50px',
    margin: '40px 0px',
    letterSpacing: '1.6px',
    '&:hover': {
      background: '#ffdf94',
    },
  },
  listBtn: {
    color: '#F3F2EF',
    fontSize: '16px',
    letterSpacing: '1.6px',
    padding: '0px 24px',
    '&:hover': {
      background: '#44464a',
    },
  },
});

const SideBar = (): JSX.Element => {
  const classes = useStyles({});
  const disaptch = useDispatch();
  const fileElement = useRef(null);

  const submitFileUpload = (file: IFile) => {
    const fileName = file.name;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      disaptch(upladFileIng());
      setTimeout(() => {
        disaptch(uploadFile(fileName, reader.result));
      }, 2000);
    }, false);
    reader.readAsDataURL(file);
  };

  const [routeList] = useState([
    { id: 'share-with-me', name: '共享資料夾', },
    { id: 'starred', name: '已標記星號', },
    { id: 'trash', name: '垃圾桶', }]);
  return (
    <div className={styles.sideBar}>
      <div>
        <img src="./image/logo.svg" alt="logo" />
      </div>
      <Button
        classes={{ root: classes.uploadBtn, }}
        onClick={() => {
          fileElement.current.click();
        }}
      >
        <i className={`fas fa-file-upload ${styles.uploadFileIcon}`} />
        上傳檔案
      </Button>
      <div className={styles.listBlock}>
        <div className={styles.list}>
          <Button
            classes={{ root: classes.listBtn, }}
            onClick={() => { fileElement.current.click(); }}
          >
            <img
              alt="上傳資料夾"
              src="./image/folder-upload-outline.svg"
              className={styles.listIcon}
            />
            上傳資料夾
          </Button>
        </div>
        <div className={styles.list}>
          <Button
            classes={{ root: classes.listBtn, }}
            onClick={() => { fileElement.current.click(); }}
          >
            <img
              alt="新資料夾"
              src="./image/folder-plus-outline.svg"
              className={styles.listIcon}
            />
            新資料夾
          </Button>
        </div>
        {
          routeList.map(route => (
            <div
              key={route.id}
              className={styles.list}
            >
              <Button classes={{ root: classes.listBtn, }}>
                <img
                  alt={route.name}
                  src={`./image/${route.id}.svg`}
                  className={styles.listIcon}
                />
                {route.name}
              </Button>
            </div>
          ))
        }
      </div>
      <div className={styles.hiddenBlock}>
        <input
          type="file"
          ref={fileElement}
          onChange={(e) => { submitFileUpload(e.target.files[0]); }}
        />
      </div>
    </div>
  );
};

export default SideBar;
