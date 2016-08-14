import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { saveState, clearStorage, loadState } from '../services/storage';

export default class AuthContainer extends Component {
  save() {
    throw new Error('Testing error reporting on Slack');
    saveState();
  }

  clear() {
    clearStorage();
  }

  load() {
    loadState();
  }

  render() {
    return (
      <View style={{top: 100, flex: 1}}>
        <TouchableHighlight onPress={this.save}>
          <Text>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.load}>
          <Text>Load</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.clear}>
          <Text>Clear</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
