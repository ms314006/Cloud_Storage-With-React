import React from 'react';
import Content from '../Content';
import SideBar from '../SideBar';
import FileUploadProgress from '../FileUploadProgress';
import styles from './index.scss';

const Main = (): JSX.Element => (
  <div
    data-testid="main_block"
    className={styles.mainBlock}
  >
    <SideBar />
    <Content />
    <FileUploadProgress />
  </div>
);

export default Main;
