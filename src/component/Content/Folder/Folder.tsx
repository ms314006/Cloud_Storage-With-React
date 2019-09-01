import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentFolder } from '../../../action/cloudStorage';
import styles from './index.scss';

const Folder = (props: any):JSX.Element => {
  const { folder, } = props;
  const dispatch = useDispatch();
  return (
    <div
      className={styles.folder}
      onKeyDown={() => {}}
      onClick={() => {
        dispatch(changeCurrentFolder(folder));
      }}
    >
      {folder.name}
    </div>
  );
};

export default Folder;
