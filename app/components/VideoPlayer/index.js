import React, { Component, PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Controls from './Controls';
import Progress from './Progress';
import styles from './styles';
const { func, number, object, oneOfType, bool } = PropTypes;

class VideoPlayer extends Component {
  static propTypes = {
    onLoadStart: func,
    onLoad: func,
    onProgress: func,
    getBackwardTime: func.isRequired,
    getForwardTime: func.isRequired,
    style: oneOfType([number, object]),
    videoStyle: oneOfType([number, object]),
    autoStart: bool,
    muted: bool,
    volume: number,
    rate: number,
    playInBackground: bool,
    playWhenInactive: bool,
    repeat: bool,
    controlsStyle: oneOfType([number, object]),
    progressStyle: oneOfType([number, object])
  }

  static defaultProps = {
    volume: 1.0,
    rate: 1.0,
    getBackwardTime: (currentTime) => {
      const timestamp = currentTime - 5;
      return timestamp > 0 ? timestamp : 0;
    },

    getForwardTime: (currentTime, duration) => {
      const timestamp = currentTime + 5;
      return timestamp < duration ? timestamp : duration;
    }
  }

  state = {
    paused: false
  }

  componentWillMount() {
    this.setState({ paused: !this.props.autoStart });
  }

  onPause = () => {
    this.setState({
      paused: true
    });
  }

  onPlay = () => {
    const { currentTime, duration } = this.state;

    if (currentTime === duration) {
      this.refs.video.seek(0);
    }

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
          resizeMode="contain"
          rate={ this.props.rate }
          volume={ this.props.volume }
          muted={ this.props.muted }
          paused={ this.state.paused }
          repeat={ this.props.repeat }
          playInBackGround={ this.props.playInBackground }
          playWhenInActive={ this.props.playWhenInactive }
          onLoadStart={ this.props.onLoadStart }
          onLoad={ this.onLoad }
          onProgress={ this.onProgress }
          style={ [styles.video, this.props.videoStyle] }
          ref="video"
        />

        <Progress
          duration={ this.state.duration }
          currentTime={ this.state.currentTime }
          // If paused or currentTime is 0, instantly jump the progress bar to correct position:
          easingDuration={ this.state.paused || this.state.currentTime === 0 ? 0 : undefined }
          style={ [this.props.progressStyle, { width: this.getWidth() }] }
        />

        <Controls
          forward
          backward
          paused={ this.state.paused }
          onPause={ this.onPause }
          onPlay={ this.onPlay }
          onBackward={ this.seekBackward }
          onForward={ this.seekForward }
          style={ [styles.videoPlayerControls, this.props.controlsStyle] }
        />
      </View>
    );
  }
}

export default VideoPlayer;
