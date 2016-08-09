import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app';

const ShelfieApp = (props) => <App {...props} />;

AppRegistry.registerComponent('ShelfieApp', () => ShelfieApp);
