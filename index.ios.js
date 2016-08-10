import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app';
import configureStore from './app/store/configure-store';

// Handling store here to avoid hot-reloading issues
const store = configureStore();

const ShelfieApp = (props) => <App { ...props } store={ store } />;

AppRegistry.registerComponent('ShelfieApp', () => ShelfieApp);
