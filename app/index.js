import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import { getDeviceLocale } from 'react-native-device-info';

/* eslint-disable */
import I18n from 'react-native-i18n';
I18n.fallbacks = true;
I18n.locales = {
  en: require('../config/locales/en.json')
};

I18n.defaultLocale = 'en-US';
// There's a bug in react-native-i18n that takes the devices country instead of locales
// so use DeviceInfo instead. More info: https://github.com/AlexanderZaytsev/react-native-i18n/issues/18
I18n.locale = getDeviceLocale();
/* eslint-enable */

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    console.tron('App boot'); //eslint-disable-line
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <Router />
      </Provider>
    );
  }
}
