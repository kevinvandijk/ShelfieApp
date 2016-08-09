import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import HugeButton from './components/HugeButton';

export default class App extends Component {
  componentWillMount() {
    console.log('App boot');
  }

  render() {
    return (
      <View>
        <StatusBar />
        <HugeButton>Starten</HugeButton>
      </View>
    );
  }
}
