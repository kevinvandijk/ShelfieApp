import React, { Component, PropTypes } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Orientation from 'react-native-orientation';
import Router from './router';

// Initializers
import i18nInitializer from './initializers/i18n';

// const codePush = (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development'
//   ? require('react-native-code-push')
//   : null
// );

i18nInitializer();

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    Orientation.lockToPortrait();
  }

  // codePushStatusDidChange(status) {
  //   if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
  //     Alert.alert('App was updated');
  //   }
  // }

  render() {
    StatusBar.setHidden(true);


    return (
      <Provider store={ this.props.store }>
        <Router />
      </Provider>
    );
  }
}

// let codePushOptions;
// if (codePush) {
//   codePushOptions = {
//     checkFrequency: __DEV__ ? codePush.CheckFrequency.MANUAL : codePush.CheckFrequency.ON_APP_RESUME
//   };
// }

export default App;
// export default codePush ? codePush(codePushOptions)(App) : App;
