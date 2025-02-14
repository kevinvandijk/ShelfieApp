import React, { PropTypes } from 'react';
import { Platform, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router, Switch, DefaultRenderer, Actions, Modal, NavBar } from 'react-native-router-flux';
import ReactNativeDrawer from 'react-native-drawer';
import Orientation from 'react-native-orientation';

import I18n from './lib/i18n';
import styles from './styles';
import LoadContainer from './containers/load';
import WelcomeContainer from './containers/welcome';
import AuthContainer from './containers/auth';
import TimelineContainer from './containers/timeline';
import WatchContainer from './containers/watch';
import ChangePasswordContainer from './containers/change-password';
import SideMenu from './containers/SideMenu';
import ShelfieWebView from './containers/ShelfieWebView';
import OrientationAwareNavBar from './components/OrientationAwareNavBar';

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
  return state.isAuthenticated ? MAIN_SCENE : UNAUTHENTICATED_SCENE;
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
      // openDrawerOffset={ 0.28 }
      openDrawerOffset={ ({ width }) => width - 250 }
      panCloseMask={ 0.28 }
      panOpenMask={ 0.05 }
      negotiatePan
      tweenDuration={ 200 }
      tweenHandler={ (ratio) => ({
        main: { opacity: Math.max(0.54, 1 - ratio) },
        drawer: { opacity: ratio }
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

// TODO: Fix this hack
// The default style of doing right to left includes fading which makes the red
// background on the auth screens look very stupid. So we're doing it with this custom
// animation function instead

function rightToLeft(props) {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const {
    position,
    scene,
  } = props;

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];

  const translateX = position.interpolate({
    inputRange,
    outputRange: [SCREEN_WIDTH, 0, 0],
  });

  return {
    transform: [
      { translateX },
    ],
  };
}

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
              animationStyle={ rightToLeft }
            />

            <Scene
              key={ AUTH_SCENE }
              component={ AuthContainer }
              navigationBarStyle={ styles.navBarWithBackground }
              sceneStyle={ styles.sceneWithNavBar }
              duration={ 200 }
              animationStyle={ rightToLeft }
              backButtonImage={ require('./assets/images/back-chevron.png') }
              hideBackImage={ Platform.OS === 'android' }
            />
          </Scene>

          <Scene
            key={ MAIN_SCENE }
            navigationBarStyle={ styles.navBar }
            titleStyle={ styles.navBarTitle }
            backButtonImage={ require('./assets/images/back-chevron.png') }
            drawerImage={ require('./assets/images/burger.png') }
          >
            <Scene
              key={ MAIN_SCENE_DRAWER }
              component={ Drawer }
            >
              <Scene
                key="drawerContainer"
                navigationBarStyle={ styles.navBar }
                titleStyle={ styles.navBarTitle }
                backButtonImage={ require('./assets/images/back-chevron.png') }
                drawerImage={ require('./assets/images/burger.png') }
              >
                <Scene
                  key="main-timeline"
                  title={ I18n.t('containers.timeline.title') }
                  component={ TimelineContainer }
                  sceneStyle={ styles.sceneWithNavBar }
                />
              </Scene>
            </Scene>

            <Scene
              key="mainWatch"
              title={ I18n.t('containers.watch.title') }
              component={ WatchContainer }
              hideBackImage={ Platform.OS === 'android' }
              navBar={ OrientationAwareNavBar }
            />

            <Scene
              sceneStyle={ styles.sceneWithNavBar }
              key="privacyPolicy"
              title="Privacy Policy"
              component={ ShelfieWebView }
              uri="https://shelfie.nl/privacy-policy/"
              hideBackImage={ Platform.OS === 'android' }
            />

            <Scene
              sceneStyle={ styles.sceneWithNavBar }
              key="termsAndConditions"
              title="Algemene Voorwaarden"
              component={ ShelfieWebView }
              uri="https://shelfie.nl/algemene-voorwaarden/"
              hideBackImage={ Platform.OS === 'android' }
            />

            <Scene
              sceneStyle={ styles.sceneWithNavBar }
              key="contactForm"
              title="Contact"
              component={ ShelfieWebView }
              uri="https://shelfie.nl/contactmobile/"
              hideBackImage={ Platform.OS === 'android' }
            />
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
