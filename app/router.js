import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import styles from './styles';

import AuthContainer from './containers/auth';

const ReduxRouter = connect()(Router);

export default () => (
  <ReduxRouter>
    <Scene
      key="root"
      navigationBarStyle={ styles.navBar }
      titleStyle={ styles.navBarTitle }
    >
      <Scene initial key="auth-login" component={ AuthContainer } title="Authentication" />
    </Scene>
  </ReduxRouter>
);
