import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Switch } from 'react-native-router-flux';
import styles from './styles';

import LoadContainer from './containers/load';
import AuthContainer from './containers/auth';
import TimelineContainer from './containers/timeline';
import WatchContainer from './containers/watch';

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
};

const AppRouter = () => {
  return (
    <ReduxRouter>
      <Scene
        key="root"
        component={ rootComponent }
        tabs
        unmountScenes
        selector={ rootSelector }
      >
        <Scene
          key={ LOAD_SCENE }
          component={ LoadContainer }
          navigationBarStyle={ styles.navBar }
          titleStyle={ styles.navBarTitle }
          sceneStyle={ styles.sceneWithNavBar }
          initial
        />

        <Scene
          key={ AUTH_SCENE }
          component={ AuthContainer }
          title="Authentication"
          navigationBarStyle={ styles.navBar }
          titleStyle={ styles.navBarTitle }
          sceneStyle={ styles.sceneWithNavBar }
        />
        <Scene
          key={ MAIN_SCENE }
          navigationBarStyle={ styles.navBar }
          titleStyle={ styles.navBarTitle }
        >
          <Scene
            key="main-timeline"
            title="Timeline"
            component={ TimelineContainer }
            sceneStyle={ styles.sceneWithNavBar }
          />

          <Scene
            key="main-watch"
            title="Watch"
            component={ WatchContainer }
            sceneStyle={ styles.sceneWithNavBar }
            initial
          />
        </Scene>
      </Scene>
    </ReduxRouter>
  );
};

export default AppRouter;
