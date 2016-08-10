import React, { Component, PropTypes } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import HugeButton from './components/HugeButton';

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  componentWillMount() {
    console.log('App boot');
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <View>
          <StatusBar />
          <HugeButton>Start</HugeButton>
        </View>
      </Provider>
    );
  }
}
