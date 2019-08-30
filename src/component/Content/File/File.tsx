import React from 'react';
import styles from './index.scss';

const File = (props: any):JSX.Element => {
  const { name, type, path, } = props;
  const getRenderDomWithType = (fileType: string) => {
    switch (fileType) {
      case 'jpg':
        return (
          <div
            className={styles.imageBlock}
            style={{ backgroundImage: `url(${path})`, }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.file}>
      <div className={styles.fileThumbnail}>
        {getRenderDomWithType(type)}
      </div>
      <div className={styles.fileName}>
        {name}
      </div>
    </div>
  );
};

export default File;
