import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import Reactotron from 'reactotron';
import App from './app';
import configureStore from './app/store/configure-store';
import Raven from 'raven-js';
require('raven-js/plugins/react-native')(Raven);

Raven
  .config('https://3942dddabbac457f8103d4e157c9ef9e@sentry.io/102018', { release: '1' })
  .install();

const error = new Error('SENTRY SOURCE MAP TEST IPHONE');
Raven.captureException(error);

// connect with defaults
Reactotron.connect({
  name: 'Shelfie',
  userAgent: Platform.OS,
  enabled: __DEV__
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
