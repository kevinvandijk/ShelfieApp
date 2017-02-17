import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Switch, DefaultRenderer, Actions, Modal } from 'react-native-router-flux';
import ReactNativeDrawer from 'react-native-drawer';

import I18n from './lib/i18n';
import styles from './styles';
import LoadContainer from './containers/load';
import WelcomeContainer from './containers/welcome';
import AuthContainer from './containers/auth';
import TimelineContainer from './containers/timeline';
import WatchContainer from './containers/watch';
import ChangePasswordContainer from './containers/change-password';
import SideMenu from './containers/SideMenu';

const { func, object } = PropTypes;

export const MAIN_SCENE_DRAWER = 'drawer';
export const LOAD_SCENE = 'load';
export const AUTH_SCENE = 'auth';
export const MAIN_SCENE = 'main';
export const WELCOME_SCENE = 'welcome';
export const UNAUTHENTICATED_SCENE = 'unauthenticated';

const ReduxRouter = connect()(Router);

const rootComponent = connect(state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoaded: state.boot.isLoaded
  };
})(Switch);

const rootSelector = (state) => {
  if (!state.isLoaded) return LOAD_SCENE;
  return state.isAuthenticated ? MAIN_SCENE_DRAWER : UNAUTHENTICATED_SCENE;
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
      openDrawerOffset={ 0.28 }
      panCloseMask={ 0.28 }
      negotiatePan
      tweenDuration={ 200 }
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
      <Scene key="modal" component={ Modal }>
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
            hideNavBar
          />

          <Scene key={ UNAUTHENTICATED_SCENE }>
            <Scene
              key={ WELCOME_SCENE }
              component={ WelcomeContainer }
              navBar={ () => null }
              initial
            />

            <Scene
              key={ AUTH_SCENE }
              component={ AuthContainer }
              navigationBarStyle={ styles.navBarWithBackground }
              sceneStyle={ styles.sceneWithNavBar }
              direction="vertical"
              duration={ 300 }
              backButtonImage={ require('./assets/images/back-chevron.png') }
            />
          </Scene>

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
                title={ I18n.t('containers.timeline.title') }
                component={ TimelineContainer }
                sceneStyle={ styles.sceneWithNavBar }
              />

              <Scene
                key="mainWatch"
                title={ I18n.t('containers.watch.title') }
                component={ WatchContainer }
                sceneStyle={ styles.sceneWithNavBar }
                backTitle={ I18n.t('navigation.back') }
              />
            </Scene>
          </Scene>
        </Scene>
        <Scene
          key="changePassword"
          component={ ChangePasswordContainer }
        />
      </Scene>
    </ReduxRouter>
  );
};

export default AppRouter;
