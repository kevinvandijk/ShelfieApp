import React, { Component, PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Controls from './Controls';
import Progress from './Progress';
import styles from './styles';
const { func, number, object, oneOfType } = PropTypes;

class VideoPlayer extends Component {
  static propTypes = {
    onLoadStart: func,
    onLoad: func,
    onProgress: func,
    getBackwardTime: func.isRequired,
    getForwardTime: func.isRequired,
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

  onLoad = (videoProps) => {
    this.setState({
      duration: videoProps.duration,
      currentTime: videoProps.currentTime
    });
  }

  onProgress = (progress) => {
    this.setState({
      currentTime: progress.currentTime
    });
  }

  getWidth() {
    return Dimensions.get('window').width;
  }

  seekBackward = () => {
    const { currentTime, duration } = this.state;
    const timestamp = this.props.getBackwardTime(currentTime, duration);
    this.refs.video.seek(timestamp);
  }

  seekForward = () => {
    const { currentTime, duration } = this.state;
    const timestamp = this.props.getForwardTime(currentTime, duration);
    this.refs.video.seek(timestamp);
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
          onLoad={ this.onLoad }
          onProgress={ this.onProgress }
          style={ [styles.video, this.props.videoStyle] }
        />

        <Progress
          duration={ this.state.duration }
          currentTime={ this.state.currentTime }
          width={ this.getWidth() }
          easingDuration={ this.state.paused ? 0 : undefined }
        />

        <Controls
          forward
          backward
          paused={ this.state.paused }
          onPause={ this.onPause }
          onPlay={ this.onPlay }
          onBackward={ this.seekBackward }
          onForward={ this.seekForward }
          style={ styles.videoPlayerControls }
        />
      </View>
    );
  }
}

export default VideoPlayer;
