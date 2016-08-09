import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

export default class App extends Component {
  componentWillMount() {
    console.log('App boot');
  }

  render() {
    return (
      <View>
        <StatusBar />
      </View>
    );
  }
}
