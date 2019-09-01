import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { switchImportance } from '../../../action/cloudStorage';
import styles from './index.scss';

const FileTemplate = (props: any) => {
  const { children, file, } = props;
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
        onClick={(event) => { setAnchorEl(anchorEl ? null : event.currentTarget); }}
      >
        <i className="fas fa-ellipsis-h" />
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition>
          {({ TransitionProps, }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                asdfasdfsf
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
      {children}
    </div>
  );
};

export default FileTemplate;
