import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Switch, DefaultRenderer, Actions } from 'react-native-router-flux';
import styles from './styles';
import ReactNativeDrawer from 'react-native-drawer';
import LoadContainer from './containers/load';
import AuthContainer from './containers/auth';
import TimelineContainer from './containers/timeline';
import WatchContainer from './containers/watch';
import SideMenu from './containers/SideMenu';

const { func, object } = PropTypes;

const MAIN_SCENE_DRAWER = 'drawer';
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
  return state.isAuthenticated ? MAIN_SCENE_DRAWER : AUTH_SCENE;
};

const Drawer = (props) => {
  const state = props.navigationState;
  const children = state.children;

  return (
    <ReactNativeDrawer
      open={ state.open }
      onOpen={ () => Actions.refresh({ key: state.key, open: true }) }
      onClose={ () => Actions.refresh({ key: state.key, open: false }) }
      type="displace"
      content={ <SideMenu /> }
      tapToClose
      openDrawerOffset={ 0.2 }
      panCloseMask={ 0.2 }
      negotiatePan
      tweenHandler={ (ratio) => ({
        main: { opacity: Math.max(0.54, 1 - ratio) }
      }) }
    >
      <DefaultRenderer navigationState={ children[0] } onNavigate={ props.onNavigate } />
    </ReactNativeDrawer>
  );
};

Drawer.propTypes = {
  onNavigate: func.isRequired,
  navigationState: object.isRequired
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
        <Scene key={ MAIN_SCENE_DRAWER } component={ Drawer }>
          <Scene
            key={ MAIN_SCENE }
            navigationBarStyle={ styles.navBar }
            titleStyle={ styles.navBarTitle }
            backButtonImage={ require('./images/back-chevron.png') }
            backButtonTextStyle={ styles.backButtonTextStyle }
            drawerImage={ require('./images/menu-burger.png') }
          >
            <Scene
              key="main-timeline"
              title="Timeline"
              component={ TimelineContainer }
              sceneStyle={ styles.sceneWithNavBar }
              initial
            />

            <Scene
              key="mainWatch"
              title="Watch"
              component={ WatchContainer }
              sceneStyle={ styles.sceneWithNavBar }
              backTitle="Back"
            />
          </Scene>
        </Scene>
      </Scene>
    </ReduxRouter>
  );
};

export default AppRouter;
