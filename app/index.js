import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import Router from './router';

// Initializers
import i18nInitializer from './initializers/i18n';

i18nInitializer();

@codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
})
export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  codePushStatusDidChange(status) {
    if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
      Alert.alert('App was updated');
    }
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <Router />
      </Provider>
    );
  }
}
