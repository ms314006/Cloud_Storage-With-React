import React from 'react';
import styles from './index.scss';

const FileUploadProgress = (props: any): JSX.Element => {
  const {} = props;
  return (
    <div
      className={
        `${styles.monsterBlock} ${true ? styles.monsterBlockClose : styles.monsterBlockOpen}`
      }
    >
      <img
        alt="雲端怪獸"
        src="./image/cloud-monster.svg"
      />
    </div>
  );
};

export default FileUploadProgress;
