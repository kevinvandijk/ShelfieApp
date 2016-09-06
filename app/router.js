import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Switch } from 'react-native-router-flux';
import styles from './styles';

import AuthContainer from './containers/auth';
import MainContainer from './containers/main';

const ReduxRouter = connect()(Router);

const AppRouter = () => {
  return (
    <ReduxRouter>
      <Scene
        key="root"
        navigationBarStyle={ styles.navBar }
        titleStyle={ styles.navBarTitle }
        component={ connect(state => ({ isAuthenticated: state.auth.isAuthenticated }))(Switch) }
        tabs
        unmountScenes
        selector={ state => (state.isAuthenticated ? 'main': 'auth') }
      >
        <Scene
          key="auth"
          component={ AuthContainer }
          title="Authentication"
          sceneStyle={ styles.sceneWithNavBar }
        />
        <Scene
          key="main" component={ MainContainer }
          title="Main"
          sceneStyle={ styles.sceneWithNavBar }
        />
      </Scene>
    </ReduxRouter>
  );
}

export default AppRouter;
