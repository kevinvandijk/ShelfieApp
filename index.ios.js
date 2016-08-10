import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import Reactotron from 'reactotron';
import App from './app';
import configureStore from './app/store/configure-store';

// connect with defaults
Reactotron.connect({
  name: 'Shelfie',
  userAgent: Platform.OS,
  enabled: __DEV__ // eslint-disable-line
});

if (__DEV__) { //eslint-disable-line
  console.tron = Reactotron.log; //eslint-disable-line
  console.bench = Reactotron.bench; //eslint-disable-line
} else {
  console.tron = () => null; //eslint-disable-line
  console.bench = () => { //eslint-disable-line
    return {
      step: () => null,
      stop: () => null
    };
  };
}

// Handling store here to avoid hot-reloading issues
const store = configureStore();

const ShelfieApp = (props) => <App { ...props } store={ store } />;

AppRegistry.registerComponent('ShelfieApp', () => ShelfieApp);
