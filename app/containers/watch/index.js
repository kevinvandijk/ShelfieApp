import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, Platform } from 'react-native';
import { getVideo, fetchSignedOutputUrl, getSignedUrlForQuality } from '../../modules/videos';
import Orientation from 'react-native-orientation';

import { orientationChanged, isWatchingFullscreen, getOrientation, startWatchingOrientation, stopWatchingOrientation, unlockOrientation, setOrientation } from '../../modules/watch';
import VideoPlayer from '../../components/VideoPlayer';

const { string, shape, func, bool } = PropTypes;

class WatchContainer extends Component {
  static propTypes = {
    fetchSignedOutputUrl: func.isRequired,
    videoId: string.isRequired,
    video: shape({}).isRequired,
    videoUrl: string,
    orientationChanged: func.isRequired,
    fullscreen: bool.isRequired,
    startWatchingOrientation: func.isRequired,
    stopWatchingOrientation: func.isRequired,
    unlockOrientation: func.isRequired,
    setOrientation: func.isRequired
  }

  componentDidMount() {
    this.props.startWatchingOrientation();
    StatusBar.setHidden(this.props.fullscreen);

    this.props.fetchSignedOutputUrl(this.props.videoId, '360p_mp4');
  }

  componentWillUpdate(nextProps) {
    if (nextProps.fullscreen !== this.props.fullscreen) {
      StatusBar.setHidden(!this.props.fullscreen);
    }
  }

  componentWillUnmount() {
    this.props.stopWatchingOrientation();
    if (Platform.OS === 'android') this.props.setOrientation('PORTRAIT', { locked: true });
  }

  onFullscreenPress = () => {
    this.props.setOrientation('LANDSCAPE-LEFT');
    if (Platform.OS === 'android') {
      // Force the screen in landscape mode
      // TODO: Move somewhere better
      Orientation.lockToLandscapeLeft();
      // Unlock again after 5 seconds, if the user didn't rotate the screen then yet it's kinda pointless
      // Best effort kind of thing:
      setTimeout(() => {
        Orientation.unlockAllOrientations();
      }, 5000);
    }
  }

  onFullscreenExitPress = () => {
    this.props.setOrientation('PORTRAIT');
    if (Platform.OS === 'android') {
      // Force the screen back in portrait mode
      // TODO: Move somewhere better
      Orientation.lockToPortrait();
      // Unlock again after 5 seconds, if the user didn't rotate the screen then yet it's kinda pointless
      // Best effort kind of thing:
      setTimeout(() => {
        Orientation.unlockAllOrientations();
      }, 5000);
    }
  }

  androidUnlock = () => {
    if (Platform.OS === 'android') this.props.unlockOrientation();
  }

  render() {
    const { video, orientation } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        { this.props.videoUrl &&
          <VideoPlayer
            title={ video.title }
            url={ this.props.videoUrl }
            fullscreen={ this.props.fullscreen }
            onLoad={ this.androidUnlock }
            onFullscreenPress={ this.onFullscreenPress }
            onFullscreenExitPress={ this.onFullscreenExitPress }
            orientation={ orientation }
          />
        }
      </View>

    );
  }
}

const mapDispatchToProps = {
  fetchSignedOutputUrl,
  orientationChanged,
  startWatchingOrientation,
  stopWatchingOrientation,
  unlockOrientation,
  setOrientation
};

const mapStateToProps = (state, ownProps) => {
  const fullscreen = isWatchingFullscreen(state);

  return {
    fullscreen,
    orientation: getOrientation(state),
    video: getVideo(state, ownProps.videoId),
    videoUrl: getSignedUrlForQuality(state, ownProps.videoId, '360p_mp4')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchContainer);
