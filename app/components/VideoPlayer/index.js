import React, { Component, PropTypes } from 'react';
import Raven from 'raven-js';
import { View, TouchableOpacity, Text, TouchableWithoutFeedback, DeviceEventEmitter, Platform } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Chromecast from 'react-native-google-cast';
import KeepAwake from 'react-native-keep-awake';


import { calculateHitSlop } from '../../helpers';
import Controls from './Controls';
import Progress from './Progress';
import Title from './Title';
import styles from './styles';

const { func, number, object, oneOfType, bool, string } = PropTypes;

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
    progressStyle: oneOfType([number, object]),
    title: string,
    url: string.isRequired
  }

  static defaultProps = {
    volume: 1.0,
    rate: 1.0,
    autoStart: false,
    getBackwardTime: (currentTime) => {
      const timestamp = currentTime - 10;
      return timestamp > 0 ? timestamp : 0;
    },

    getForwardTime: (currentTime, duration) => {
      const timestamp = currentTime + 10;
      return timestamp < duration ? timestamp : duration;
    }
  }

  state = {
    paused: false,
    showVideoButtons: false,
    chromecastAvailable: false,
    chromecastConnected: false,
    chromecastPlaying: false
  }

  componentWillMount() {
    this.initializeChromecast();
    this.setState({ paused: !this.props.autoStart });
  }

  componentWillUnmount() {
    Chromecast.stopScan();
  }

  onPause = () => {
    if (this.state.chromecastConnected) return this.chromecastPause();

    this.setState({
      paused: true
    });
  }

  onPlay = () => {
    if (this.state.chromecastConnected) return this.chromecastPlay();

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

  onEnd = () => {
    this.setState({
      currentTime: this.state.duration,
      paused: true
    });
  }

  onError = () => {
    console.error('Error playing video, not handled');
  }

  initializeChromecast() {
    DeviceEventEmitter.addListener(Chromecast.DEVICE_AVAILABLE, (device) => {
      this.setState({
        chromecastAvailable: device.device_available
      });
    });

    DeviceEventEmitter.addListener(Chromecast.DEVICE_CONNECTED, () => {
      this.setState({ chromecastConnected: true, chromecastPlaying: true });
      this.startChromecastListener();
      this.chromecastCastMedia();
    });

    DeviceEventEmitter.addListener(Chromecast.DEVICE_DISCONNECTED, () => {
      this.setState({ chromecastConnected: false, chromecastPlaying: false });
    });

    try {
      Chromecast.startScan();
    } catch (err) {
      Raven.captureException(err);
    }
  }

  chromecastCastMedia = () => {
    Chromecast.castMedia(this.props.url, this.props.title, "https://www.google.nl/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", this.state.currentTime);
  }

  chromecastToggle = async () => {
    if (!this.state.chromecastConnected) {
      const devices = await Chromecast.getDevices();
      if (devices.length === 1) {
        const device = devices[0];
        Chromecast.connectToDevice(device.id);
      }
    } else {
      Chromecast.disconnect();
    }
  }

  startChromecastListener = async () => {
    const position = await Chromecast.getStreamPosition();

    if (this.state.chromecastConnected) {
      this.setState({
        currentTime: position
      });
      setTimeout(this.startChromecastListener, 1000);
    }
  }

  chromecastPlay() {
    if (!this.state.chromecastPlaying) {
      Chromecast.togglePauseCast();
      this.setState({ chromecastPlaying: true });
    }
  }

  chromecastPause() {
    if (this.state.chromecastPlaying) {
      Chromecast.togglePauseCast();
      this.setState({ chromecastPlaying: false })
    }
  }

  seekBackward = () => {
    const { currentTime, duration } = this.state;
    const timestamp = this.props.getBackwardTime(currentTime, duration);
    this.seek(timestamp, false);
  }

  seekForward = () => {
    const { currentTime, duration } = this.state;
    const timestamp = this.props.getForwardTime(currentTime, duration);
    this.seek(timestamp, false);
  }

  enableFullscreen = () => {
    if (this.refs.video) {
      this.refs.video.presentFullscreenPlayer();
    }
  }

  seek = (seconds, pauseOnSeek = true) => {
    if (pauseOnSeek && !this.state.paused) {
      this.setState({
        paused: true,
        pausedForSeeking: true
      });
    }

    if (this.state.chromecastConnected) {
      Chromecast.seekCast(seconds);
    } else {
      this.refs.video.seek(seconds);
    }
  }

  seekComplete = (seconds) => {
    this.seek(seconds);
    if (this.state.pausedForSeeking) {
      this.setState({
        paused: false,
        pausedForSeeking: false
      });
    }
  }

  toggleVideoButtons = () => {
    const newState = !this.state.showVideoButtons;
    this.setState({
      showVideoButtons: newState
    });

    if (newState) {
      setTimeout(() => {
        this.setState({
          showVideoButtons: false
        });
      }, 3000);
    }
  }

  render() {
    const videoPaused = this.state.chromecastConnected || this.state.paused;

    if (videoPaused) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }

    let buttonPaused;
    if (this.state.chromecastConnected) {
      buttonPaused = !this.state.chromecastPlaying;
    } else {
      buttonPaused = this.state.paused;
    }
    return (
      <View style={ [styles.container, this.props.style] }>
        <View style={ styles.videoContainer }>
          <TouchableWithoutFeedback onPress={ this.toggleVideoButtons }>
            <Video
              source={{ uri: this.props.url }}
              resizeMode="cover"
              rate={ this.props.rate }
              volume={ this.props.volume }
              muted={ this.props.muted }
              paused={ videoPaused }
              repeat={ this.props.repeat }
              playInBackGround={ this.props.playInBackground }
              playWhenInActive={ this.props.playWhenInactive }
              onLoadStart={ this.props.onLoadStart }
              onLoad={ this.onLoad }
              onProgress={ this.onProgress }
              onEnd={ this.onEnd }
              onError={ this.onError }
              style={ [styles.video, this.props.videoStyle] }
              ref="video"
            />
          </TouchableWithoutFeedback>

          { this.state.showVideoButtons &&
            <View style={ styles.videoButtons }>
              { this.state.chromecastAvailable &&
                <TouchableOpacity
                  style={ styles.videoButtonTouchable }
                  hitSlop={ calculateHitSlop(32, 44) }
                  onPress={ this.chromecastToggle }
                >
                  <Icon
                    name={ this.state.chromecastConnected ? 'cast-connected' : 'cast' }
                    size={ 24 }
                    style={ styles.videoIcons }
                  />
                </TouchableOpacity>
              }
              { Platform.OS === 'ios' &&
                <TouchableOpacity
                  style={ styles.videoButtonTouchable }
                  hitSlop={ calculateHitSlop(30, 44) }
                  onPress={ this.enableFullscreen }
                >
                  <Icon
                    name="fullscreen"
                    size={ 30 }
                    style={ [styles.videoIcons, { marginTop: -3 }] }
                  />
                </TouchableOpacity>
              }
            </View>
          }
        </View>

        <View style={ styles.metadataContainer }>
          { this.props.title &&
            <Title>{ this.props.title }</Title>
          }
          { this.props.description &&
            <View style={ styles.titleContainer }>
              <Text style={ styles.descriptionText }>{ this.props.description }</Text>
            </View>
          }
        </View>

        <Progress
          duration={ this.state.duration }
          currentTime={ this.state.currentTime }
          onSeek={ this.seek }
          onSeekComplete={ this.seekComplete }
          // If paused or currentTime is 0, instantly jump the progress bar to correct position:
          easingDuration={ this.state.paused || this.state.currentTime === 0 ? 0 : undefined }
          style={ [this.props.progressStyle, styles.progressContainer] }
        />

        <Controls
          forward
          backward
          paused={ buttonPaused }
          onPause={ this.onPause }
          onPlay={ this.onPlay }
          onBackward={ this.seekBackward }
          onForward={ this.seekForward }
          style={ [styles.videoPlayerControls, this.props.controlsStyle] }
          color="#333"
        />
      </View>
    );
  }
}

export default VideoPlayer;
