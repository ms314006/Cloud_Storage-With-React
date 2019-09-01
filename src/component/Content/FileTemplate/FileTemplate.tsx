import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  switchImportance, switchShare, dropFile, renameFile
} from '../../../action/cloudStorage';
import styles from './index.scss';

const useStyles = makeStyles({
  listBtn: {
    background: '#fff',
    fontSize: '12px',
    color: '#2F3136',
    boxShadow: '0px 0px',
    letterSpacing: '1.6px',
    borderBottom: '1px solid #f5f5f5',
    borderRadius: '0px 0px',
    '&:hover': {
      background: '#e7e7e7',
    },
  },
  newFileName: {
    background: '#F3F2EF',
    color: '#2F3136',
    padding: '4px 12px',
    borderRadius: '4px 4px',
    width: '300px',
  },
  renameBtn: {
    background: '#FFD46E',
    padding: '4px 12px',
    borderRadius: '4px 4px',
  },
  cancelRenameBtn: {
    padding: '4px 12px',
    border: '1px solid #6B6D72',
    borderRadius: '4px 4px',
    margin: '0px 8px',
  },
});

const FileTemplate = (props: any) => {
  const classes = useStyles({});
  const { children, file, fileType, } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newFileName, setNewFileName] = useState('');
  const [renameFileWindow, setRenameFileWindow] = useState(false);
  const isClickMenuButton = (event: any) => (
    event.target.className.indexOf('menuButton') !== -1
  );

  const closeRenameWindow = (event: any) => {
    if (!isClickMenuButton(event)) {
      setAnchorEl(null);
    }
  };
  useEffect(() => {
    window.addEventListener('click', closeRenameWindow);
    return () => {
      window.removeEventListener('click', closeRenameWindow);
    };
  }, []);
  const dispatch = useDispatch();
  return (
    <div className={styles.fileTemplateBlock}>
      <div
        className={
          `${styles.iconButton}
           ${styles.importance}
           ${file.importance ? styles.imported : ''}`
        }
        onKeyDown={() => {}}
        onClick={() => { dispatch(switchImportance(file)); }}
      >
        <i className="fas fa-star" />
      </div>
      <div
        className={`menuButton ${styles.iconButton} ${styles.ellipsis}`}
        onKeyDown={() => {}}
        onClick={(event) => {
          if (isClickMenuButton(event)) {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }
          event.stopPropagation();
        }}
      >
        <i className="menuButton fas fa-ellipsis-h" />
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition>
          {({ TransitionProps, }) => (
            <Fade {...TransitionProps} timeout={350}>
              <div className={styles.menuBlock}>
                <Button
                  classes={{ root: classes.listBtn, }}
                  onClick={() => {
                    dispatch(switchShare(file));
                    setAnchorEl(null);
                  }}
                >
                  {file.share ? '取消共享' : '共享'}
                </Button>
                <Button
                  classes={{ root: classes.listBtn, }}
                >
                  下載
                </Button>
                <Button
                  classes={{ root: classes.listBtn, }}
                  onClick={() => {
                    setRenameFileWindow(true);
                    setAnchorEl(null);
                  }}
                >
                  重新命名
                </Button>
                <Button
                  classes={{ root: classes.listBtn, }}
                  onClick={() => { dispatch(dropFile(file, fileType)); }}
                >
                  刪除
                </Button>
              </div>
            </Fade>
          )}
        </Popper>
        <Dialog open={renameFileWindow}>
          <DialogContent>
            <div className={styles.renameFileBlock}>
              <div className={styles.renameFileTitle}>
                命名新名稱
              </div>
              <div>
                <TextField
                  value={newFileName}
                  onChange={(e) => { setNewFileName(e.target.value); }}
                  className={classes.newFileName}
                  InputProps={{
                    disableUnderline: true,
                    placeholder: '新名稱',
                  }}
                />
              </div>
              <div className={styles.renameFileButtonBlock}>
                <Button
                  onClick={() => {
                    setRenameFileWindow(false);
                    setNewFileName('');
                  }}
                  classes={{ root: classes.cancelRenameBtn, }}
                >
                  取消
                </Button>
                <Button
                  onClick={() => {
                    dispatch(renameFile(file, newFileName));
                    setNewFileName('');
                    setRenameFileWindow(false);
                  }}
                  classes={{ root: classes.renameBtn, }}
                >
                  確定
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {children}
    </div>
  );
};

export default FileTemplate;
