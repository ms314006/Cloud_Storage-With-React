import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    <Switch>
      <Route path="/:routeType" component={Content} />
      <Redirect from="/" to="/withMyCloud" />
    </Switch>
    <FileUploadProgress />
  </div>
);

export default Main;
