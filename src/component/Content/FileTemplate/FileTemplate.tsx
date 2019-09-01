import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { switchImportance, switchShare, dropFile } from '../../../action/cloudStorage';
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
});

const FileTemplate = (props: any) => {
  const classes = useStyles({});
  const { children, file, fileType, } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  window.addEventListener(
    'click', (e) => {
      if (e.target.className.indexOf('menuButton') === -1) {
        setAnchorEl(null);
      }
    }
  );
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
          setAnchorEl(anchorEl ? null : event.currentTarget);
          event.stopPropagation();
        }}
      >
        <i className="fas fa-ellipsis-h" />
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition>
          {({ TransitionProps, }) => (
            <Fade {...TransitionProps} timeout={350}>
              <div className={styles.menuBlock}>
                <Button
                  classes={{ root: classes.listBtn, }}
                  onClick={() => { dispatch(switchShare(file)); }}
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
      </div>
      {children}
    </div>
  );
};

export default FileTemplate;
