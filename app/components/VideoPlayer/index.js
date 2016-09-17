import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import Controls from './Controls';
import styles from './styles';
const { func, number, object, oneOfType } = PropTypes;

class VideoPlayer extends Component {
  static propTypes = {
    onLoadStart: func,
    onLoad: func,
    onProgress: func,
    style: oneOfType([number, object]),
    videoStyle: oneOfType([number, object])
  }

  state = {
    paused: false,
  }

  onPause = () => {
    this.setState({
      paused: true
    });
  }

  onPlay = () => {
    this.setState({
      paused: false
    });
  }

  onProgress = (arg1, arg2, arg3) => {
    console.log('onProgress', arg1, arg2);
  }

  render() {
    return (
      <View style={ this.props.style }>
        <Video
          source={{ uri: 'https://dl.dropboxusercontent.com/u/2930039/screencast%202016-09-16%2001-50-42.mp4' }}
          rate={ 1.0 }
          volume={ 1.0 }
          muted={ false }
          paused={ this.state.paused   }
          resizeMode="contain"
          repeat={ true }
          playInBackGround={ false }
          playWhenInActive={ false }
          onLoadStart={ this.props.onLoadStart }
          onLoad={ this.props.onLoad }
          onProgress={ this.onProgress }
          style={ [styles.video, this.props.videoStyle] }
        />

        <Controls
          forward
          backward
          paused={ this.state.paused }
          onPause={ this.onPause }
          onPlay={ this.onPlay }
          style={ styles.videoPlayerControls }
        />
      </View>
    );
  }
}

export default VideoPlayer;
