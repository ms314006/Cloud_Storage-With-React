import React from 'react';
import styles from './index.scss';

const Folder = (props: any):JSX.Element => {
  const { name, } = props;
  return (
    <div className={styles.folder}>
      {name}
    </div>
  );
};

export default Folder;
