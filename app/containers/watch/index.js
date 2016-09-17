import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import VideoPlayer from '../../components/VideoPlayer';
import { pxToDpi } from '../../helpers/styles';

class WatchContainer extends Component {
  render() {
    return (
      <View>
        <VideoPlayer />
      </View>

    );
  }
}

export default WatchContainer;
