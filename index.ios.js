// // Catch errors with Sentry as early as possible
import sentryInitializer from './app/initializers/sentry';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app';
import configureStore from './app/store/configure-store';

// Handling store here to avoid hot-reloading issues
const store = configureStore();

const Shelfie = (props) => <App { ...props } store={ store } />;

AppRegistry.registerComponent('Shelfie', () => Shelfie);
