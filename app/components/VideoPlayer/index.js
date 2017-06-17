import React, { PropTypes } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
  Platform,
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';
import Raven from 'raven-js';
import Video from 'react-native-video';
import Chromecast from 'react-native-google-cast';
import KeepAwake from 'react-native-keep-awake';
import Immersive from 'react-native-immersive'
import Icon from 'react-native-vector-icons/MaterialIcons';
import VolumeSlider from 'react-native-volume-slider';


import Controls from './Controls';
import Progress from './Progress';
import Title from './Title';
import ControlButton from './ControlButton';
import Overlay from '../Overlay';
import styles from './styles';

const { func, number, object, oneOfType, bool, string } = PropTypes;

class VideoPlayer extends React.Component {
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
    fullscreen: bool,
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
    fullscreen: false,
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
    chromecastPlaying: false,
    fullscreen: false,
    fullscreenAnimation: new Animated.Value(0),
    fullscreenRotate: new Animated.Value(0),
    volumeIcon: 'volume-up',
    volumeBarOpacity: new Animated.Value(0),
    loaded: false
  }

  constructor(props) {
    super(props);

    this.statusbarHeight = Platform.OS === 'ios' ? 64 : 54;
  }

  componentWillMount() {
    this.initializeChromecast();
    this.setState({ paused: !this.props.autoStart });
  }

  componentWillUnmount() {
    Chromecast.stopScan();
  }

  componentWillReceiveProps(nextProps) {
    const { fullscreen, orientation } = nextProps;

    if (!fullscreen) {
      this.animateFullscreen('PORTRAIT');
      if (Platform.OS === 'android') Immersive.setImmersive(false);
    } else if (Platform.OS === 'android' && orientation === 'LANDSCAPE') {
      Immersive.setImmersive(true)
      this.animateFullscreen(orientation);
    } else if (orientation === 'LANDSCAPE-LEFT') {
      this.animateFullscreen(orientation);
    } else if (orientation === 'LANDSCAPE-RIGHT') {
      this.animateFullscreen(orientation);
    }

    const videoPaused = this.state.chromecastConnected || this.state.paused;
    if (fullscreen && videoPaused) {
      this.setState({
        showVideoButtons: true
      });
    }
  }

  onPause = async () => {
    if (this.state.showVideoButtons) this.endOverlayTimer();
    if (this.state.chromecastConnected) return this.chromecastPause();

    await this.setState({
      paused: true
    });

    if (this.state.showVideoButtons && !this.props.fullscreen) this.startOverlayTimer();
  }

  onPlay = async () => {
    if (this.state.showVideoButtons) this.endOverlayTimer();
    if (this.state.chromecastConnected) return this.chromecastPlay();

    const { currentTime, duration } = this.state;

    if (currentTime === duration) {
      this.refs.video.seek(0);
    }

    await this.setState({
      paused: false
    });

    if (this.state.showVideoButtons) this.startOverlayTimer();
  }

  onLoad = (videoProps) => {
    console.log('trigger');
    this.setState({
      duration: videoProps.duration,
      currentTime: videoProps.currentTime,
      loaded: true
    });

    if (this.props.onLoad) this.props.onLoad(videoProps);
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

  animateFullscreen(orientation, duration = 400) {
    let rotateValue = 0;
    if (orientation === 'LANDSCAPE-LEFT') rotateValue = 1;
    if (orientation === 'LANDSCAPE-RIGHT') rotateValue = -1;
    const animationValue = ['LANDSCAPE-LEFT', 'LANDSCAPE-RIGHT', 'LANDSCAPE'].includes(orientation) ? 1 : 0;

    return Animated.parallel([
      Animated.timing(
        this.state.fullscreenRotate,
        {
          toValue: rotateValue,
          duration
        }
      ),
      Animated.timing(
        this.state.fullscreenAnimation,
        {
          toValue: animationValue,
          duration
        }
      )
    ]).start();
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
    Chromecast.castMedia(this.props.url, this.props.title, "https://shelfie.nl/wp-content/uploads/2016/07/shelfie-logo-footer-v4.png", this.state.currentTime);
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
    if (this.state.showVideoButtons) this.endOverlayTimer();

    const { currentTime, duration } = this.state;
    const timestamp = this.props.getBackwardTime(currentTime, duration);
    this.seek(timestamp, false);

    if (this.state.showVideoButtons) this.startOverlayTimer();
  }

  seekForward = () => {
    if (this.state.showVideoButtons) this.endOverlayTimer();

    const { currentTime, duration } = this.state;
    const timestamp = this.props.getForwardTime(currentTime, duration);
    this.seek(timestamp, false);

    if (this.state.showVideoButtons) this.startOverlayTimer();
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
      if (this.props.fullscreen) {
        // StatusBar.setHidden(false, 'fade');
      }
      this.startOverlayTimer();
    } else {
      if (this.props.fullscreen) {
        // StatusBar.setHidden(true, 'fade');
      }
      this.endOverlayTimer();
    }
  }

  startOverlayTimer = () => {
    if (this.props.fullscreen && this.state.paused) return;

    this._overlayTimer = setTimeout(() => {
      // FIXME: Needs to be unified function to hide and unhide overlay
      if (this.props.fullscreen) {
        // StatusBar.setHidden(true, 'fade');
      }
      this.setState({ showVideoButtons: false });
    }, 3500);
  }

  endOverlayTimer = () => {
    if (this._overlayTimer) {
      clearTimeout(this._overlayTimer);
    }
  }

  measureVideo = ({ nativeEvent }) => {
    if (!this.videoWidth || !this.videoHeight) {
      this.videoWidth = nativeEvent.layout.width;
      this.videoHeight = nativeEvent.layout.height;
    }
  }

  measureControls = ({ nativeEvent }) => {
    if (!this.controlsHeight) {
      this.controlsHeight = nativeEvent.layout.height;
    }
  }

  onVolumeChange = (value) => {
    clearTimeout(this._volumeTimer);
    // Temporary hack to prevent it from showing because of double render
    if (!this.state.loaded) {
      return;
    }

    const duration = 250;
    this.setState({
      volumeIcon: value ? 'volume-up' : 'volume-off'
    });

    Animated.timing(
      this.state.volumeBarOpacity,
      {
        toValue: 1,
        duration
      }
    ).start();

    this._volumeTimer = setTimeout(() => {
      Animated.timing(
        this.state.volumeBarOpacity,
        {
          toValue: 0,
          duration
        }
      ).start();
    }, 3500);
  }

  render() {
    const { fullscreen } = this.props;
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

    let fullscreenStyle;
    let fakenavbarStyle;
    let androidFullscreenControls;

    if (this.videoWidth && this.videoHeight && Platform.OS === 'ios') {
      const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
      const rotate = this.state.fullscreenRotate.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-90deg', '0deg', '90deg']
      });

      const heightTranslate = (windowHeight - windowWidth) / 2;
      const translateX = this.state.fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -heightTranslate]
      });

      const widthTranslate = windowHeight - this.videoHeight - heightTranslate - this.statusbarHeight;
      const translateY = this.state.fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, widthTranslate]
      });

      const width = this.state.fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [this.videoWidth, windowHeight]
      });

      const height = this.state.fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [this.videoHeight, windowWidth]
      });

      fullscreenStyle = {
        minWidth: width,
        minHeight: height,
        width,
        height,
        zIndex: 2,
        transform: [
          { translateX },
          { translateY },
          { rotate }
        ]
      };

      const navbarTranslate = this.state.fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.statusbarHeight]
      });

      fakenavbarStyle = {
        transform: [
          { translateY: navbarTranslate }
        ]
      };
    } else if (Platform.OS === 'android' && this.controlsHeight) {
      fakenavbarStyle = {
        height: 0
      };

      const marginBottom = this.state.fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -this.controlsHeight]
      });

      androidFullscreenControls = {
        marginBottom
      };
    }

    return (
      <View style={ [styles.container, this.props.style] }>
        <Animated.View style={ [{ height: this.statusbarHeight, backgroundColor: '#E96A67' }, fakenavbarStyle] } />
        <Animated.View style={ [styles.videoContainer, fullscreenStyle] } ref={ (r) => { this.videoContainer = r; } } onLayout={ this.measureVideo }>
          { Platform.OS === 'ios' &&
            <Animated.View style={ [styles.volumeSliderContainer, { opacity: this.state.volumeBarOpacity }] }>
              <Icon name={ this.state.volumeIcon } color="#fff" size={ 12 } style={{ backgroundColor: 'transparent' }} />
              <VolumeSlider
                style={ styles.volumeSlider }
                thumbSize={{ width: 1, height: 1 }}
                thumbTintColor="rgba(255, 255, 255, 0)"
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="rgba(255,255,255, 0.5)"
                showsRouteButton={ false }
                onValueChange={ this.onVolumeChange }
              />
            </Animated.View>
          }
          <TouchableWithoutFeedback onPress={ this.toggleVideoButtons }>
            <Video
              source={{ uri: this.props.url }}
              resizeMode={ fullscreen ? 'contain' : 'cover' }
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
              style={ [styles.video, this.props.videoStyle, { backgroundColor: 'black' }] }
              ref="video"
            />
          </TouchableWithoutFeedback>

          <Overlay hidden={ !this.state.showVideoButtons }>
            { fullscreen &&
              <Controls
                forward
                backward
                paused={ buttonPaused }
                onPause={ this.onPause }
                onPlay={ this.onPlay }
                onBackward={ this.seekBackward }
                onForward={ this.seekForward }
                style={ [styles.videoPlayerControls, this.props.controlsStyle] }
                color="#fff"
              />
            }
            <View style={ styles.videoButtonsContainer }>
              <View style={ styles.videoProgress }>
                { fullscreen &&
                  <Progress
                    duration={ this.state.duration }
                    currentTime={ this.state.currentTime }
                    onSeek={ this.seek }
                    onSeekComplete={ this.seekComplete }
                    // If paused or currentTime is 0, instantly jump the progress bar to correct position:
                    easingDuration={ this.state.paused || this.state.currentTime === 0 ? 0 : undefined }
                    style={ [this.props.progressStyle, styles.overlayProgressContainer] }
                    // Android switches these:
                    minimumTrackColor={ Platform.OS === 'ios' ? '#E96A67' : '#fff' }
                    maximumTrackColor={ Platform.OS === 'ios' ? '#fff' : '#E96A67' }
                    trackImage={ null }
                    textColor="#fff"
                    onDragStart={ this.endOverlayTimer }
                    onDragEnd={ this.startOverlayTimer }
                  />
                }
              </View>
              <View style={ styles.videoButtons }>
                { this.state.chromecastAvailable &&
                  <ControlButton
                    size={ 24 }
                    name={ this.state.chromecastConnected ? 'cast-connected' : 'cast' }
                    onPress={ this.chromecastToggle }
                  />
                }
                <ControlButton
                  size={ 30 }
                  name={ fullscreen ? 'fullscreen-exit' : 'fullscreen' }
                  iconStyle={{ marginTop: -3 }}
                  onPress={ fullscreen ? this.props.onFullscreenExitPress : this.props.onFullscreenPress }
                />
              </View>
            </View>
          </Overlay>
        </Animated.View>

        <Animated.View style={ androidFullscreenControls } onLayout={ this.measureControls }>
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
        </Animated.View>
      </View>
    );
  }
}

export default VideoPlayer;
