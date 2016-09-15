import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Switch } from 'react-native-router-flux';
import styles from './styles';

import LoadContainer from './containers/load';
import AuthContainer from './containers/auth';
import MainContainer from './containers/main';

const LOAD_SCENE = 'load';
const AUTH_SCENE = 'auth';
const MAIN_SCENE = 'main';

const ReduxRouter = connect()(Router);
const rootComponent = connect(state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoaded: state.boot.isLoaded
  };
})(Switch);

const rootSelector = (state) => {
  if (!state.isLoaded) return LOAD_SCENE;
  return state.isAuthenticated ? MAIN_SCENE : AUTH_SCENE;
}

const AppRouter = () => {
  return (
    <ReduxRouter>
      <Scene
        key="root"
        navigationBarStyle={ styles.navBar }
        titleStyle={ styles.navBarTitle }
        component={ rootComponent }
        tabs
        unmountScenes
        selector={ rootSelector }
      >
        <Scene
          key={ LOAD_SCENE }
          component={ LoadContainer }
          sceneStyle={ styles.sceneWithNavBar }
          initial
        />

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
