/* eslint-disable import/first */
// // Catch errors with Sentry as early as possible
if (!__DEV__) require('./app/initializers/sentry');

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/index';
import configureStore from './app/store/configure-store';

// Handling store here to avoid hot-reloading issues
const store = configureStore();

const Shelfie = (props) => <App { ...props } store={ store } />;

AppRegistry.registerComponent('Shelfie', () => Shelfie);

export default Shelfie;
