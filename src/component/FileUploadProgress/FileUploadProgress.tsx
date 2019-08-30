import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './index.scss';

const useStyles = makeStyles({
  spinColor: {
    color: '#FFD46E',
  },
});

const FileUploadProgress = (props: any): JSX.Element => {
  const {} = props;
  const classes = useStyles({});
  const { fileUploading, } = useSelector(state => state);
  return (
    <>
      <div
        className={
          `${styles.monsterBlock} 
          ${fileUploading
            ? styles.monsterBlockOpen
            : styles.monsterBlockClose}`
        }
      >
        <img
          alt="雲端怪獸"
          src="./image/cloud-monster.svg"
        />
      </div>
      <div
        className={
          `${styles.fileUploadingTooltip} 
          ${fileUploading
            ? styles.fileUploadingTooltipOpen
            : styles.fileUploadingTooltipClose}`
        }
      >
        檔案上傳
        <CircularProgress
          classes={{
            root: classes.spinColor,
          }}
        />
      </div>
    </>
  );
};

export default FileUploadProgress;
