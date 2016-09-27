import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import VideoPlayer from '../../components/VideoPlayer';
import { pxToDpi } from '../../helpers/styles';

class WatchContainer extends Component {
  render() {
    throw new Error('Test Crashlytics in production');
    return (
      <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', backgroundColor: 'orange' }}>
        <VideoPlayer />
      </View>

    );
  }
}

export default WatchContainer;
