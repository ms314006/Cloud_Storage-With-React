import React from 'react';
import styles from './index.scss';

const File = (props: any):JSX.Element => {
  const { file, } = props;
  const getRenderDomWithType = (fileType: string) => {
    switch (fileType) {
      case 'jpg':
        return (
          <div
            className={styles.imageBlock}
            style={{ backgroundImage: `url("${file.base64}")`, }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.file}>
      <div className={styles.fileThumbnail}>
        {getRenderDomWithType(file.getFileType())}
      </div>
      <div className={styles.fileName}>
        {file.name}
      </div>
    </div>
  );
};

export default File;
